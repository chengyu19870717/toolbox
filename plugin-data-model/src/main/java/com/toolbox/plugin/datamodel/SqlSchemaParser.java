package com.toolbox.plugin.datamodel;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 容错式 CREATE TABLE 解析器。
 *
 * <p>不依赖第三方 SQL 解析库：目标 SQL 里含大量 OceanBase / MySQL 方言
 * （REPLICA_NUM、BLOCK_SIZE ... LOCAL、COMPRESSION、partition by range(...) 等），
 * 通用解析器遇到这些私有语法会直接失败。这里采用「括号配平 + 顶层逗号切分」的扫描策略，
 * 只认识列定义、主键、索引、外键，其余一律跳过。
 */
public final class SqlSchemaParser {

    // ── 解析结果模型 ──────────────────────────────────────────────────────────
    public static class Column {
        public String name = "";
        public String type = "";
        public Integer length;
        public Integer scale;
        public boolean nullable = true;
        public boolean primaryKey;
        public String defaultValue = "";
        public String comment = "";
        public int ordinal;
    }

    public static class ForeignKey {
        public String column = "";
        public String refTable = "";
        public String refColumn = "";
    }

    public static class Table {
        public String name = "";
        public String comment = "";
        public final List<Column> columns = new ArrayList<>();
        public final List<ForeignKey> foreignKeys = new ArrayList<>();
    }

    private SqlSchemaParser() {}

    private static final Pattern CREATE_TABLE = Pattern.compile(
            "CREATE\\s+(?:OR\\s+REPLACE\\s+)?(?:TEMPORARY\\s+)?TABLE\\s+(?:IF\\s+NOT\\s+EXISTS\\s+)?([`\"\\[]?[\\w$.]+[`\"\\]]?)\\s*\\(",
            Pattern.CASE_INSENSITIVE);

    private static final Pattern COLUMN_HEAD = Pattern.compile(
            "^([`\"\\[]?[\\w$]+[`\"\\]]?)\\s+([A-Za-z][A-Za-z0-9_ ]*?)\\s*(?:\\(\\s*(\\d+)\\s*(?:,\\s*(\\d+)\\s*)?\\))?(?=\\s|$)");

    private static final Pattern PK_INLINE = Pattern.compile(
            "\\bPRIMARY\\s+KEY\\s*\\(([^)]*)\\)", Pattern.CASE_INSENSITIVE);

    private static final Pattern FK_CLAUSE = Pattern.compile(
            "\\bFOREIGN\\s+KEY\\s*\\(([^)]*)\\)\\s*REFERENCES\\s+([`\"\\[]?[\\w$.]+[`\"\\]]?)\\s*\\(([^)]*)\\)",
            Pattern.CASE_INSENSITIVE);

    private static final Pattern COMMENT_CLAUSE = Pattern.compile(
            "\\bCOMMENT\\s*=?\\s*'((?:[^']|'')*)'", Pattern.CASE_INSENSITIVE);

    private static final Pattern DEFAULT_CLAUSE = Pattern.compile(
            "\\bDEFAULT\\s+('(?:[^']|'')*'|[\\w.+-]+(?:\\([^)]*\\))?)", Pattern.CASE_INSENSITIVE);

    /** 以 KEY/INDEX/CONSTRAINT 等开头的约束项，不是列定义。 */
    private static final Pattern CONSTRAINT_HEAD = Pattern.compile(
            "^(PRIMARY\\s+KEY|UNIQUE|KEY|INDEX|FULLTEXT|SPATIAL|CONSTRAINT|FOREIGN\\s+KEY|CHECK|PERIOD)\\b",
            Pattern.CASE_INSENSITIVE);

    /** 解析整个 SQL 脚本，返回其中所有 CREATE TABLE 对应的表结构。 */
    public static List<Table> parse(String sql) {
        String clean = stripComments(sql);
        List<Table> tables = new ArrayList<>();
        Matcher m = CREATE_TABLE.matcher(clean);
        while (m.find()) {
            int bodyStart = m.end();                       // 左括号之后
            int bodyEnd = matchParen(clean, bodyStart);    // 对应右括号位置
            if (bodyEnd < 0) continue;                     // 括号不配平，跳过这段

            Table t = new Table();
            t.name = unquote(m.group(1));
            parseBody(clean.substring(bodyStart, bodyEnd), t);

            // 表注释在表体之后的表选项里：COMMENT = '...'，取到语句结束（下一个分号）为止
            int tail = clean.indexOf(';', bodyEnd);
            String options = clean.substring(bodyEnd, tail < 0 ? clean.length() : tail);
            Matcher cm = COMMENT_CLAUSE.matcher(options);
            if (cm.find()) t.comment = unescape(cm.group(1));

            if (!t.columns.isEmpty()) tables.add(t);
        }
        return tables;
    }

    // ── 表体解析 ──────────────────────────────────────────────────────────────
    private static void parseBody(String body, Table t) {
        Set<String> pkColumns = new LinkedHashSet<>();
        int ordinal = 0;

        for (String rawItem : splitTopLevel(body)) {
            String item = rawItem.trim();
            if (item.isEmpty()) continue;

            if (CONSTRAINT_HEAD.matcher(item).find()) {
                Matcher pk = PK_INLINE.matcher(item);
                if (pk.find()) {
                    for (String c : pk.group(1).split(",")) pkColumns.add(unquote(c.trim()).toLowerCase());
                }
                Matcher fk = FK_CLAUSE.matcher(item);
                while (fk.find()) {
                    String[] locals = fk.group(1).split(",");
                    String[] refs   = fk.group(3).split(",");
                    for (int i = 0; i < locals.length; i++) {
                        ForeignKey f = new ForeignKey();
                        f.column    = unquote(locals[i].trim());
                        f.refTable  = unquote(fk.group(2));
                        f.refColumn = unquote(refs[Math.min(i, refs.length - 1)].trim());
                        t.foreignKeys.add(f);
                    }
                }
                continue;
            }

            Column col = parseColumn(item);
            if (col == null) continue;
            col.ordinal = ++ordinal;
            t.columns.add(col);
        }

        for (Column c : t.columns) {
            if (pkColumns.contains(c.name.toLowerCase())) {
                c.primaryKey = true;
                c.nullable = false;
            }
        }
    }

    private static Column parseColumn(String def) {
        Matcher head = COLUMN_HEAD.matcher(def);
        if (!head.find()) return null;

        Column c = new Column();
        c.name = unquote(head.group(1));
        c.type = head.group(2).trim().toLowerCase().replaceAll("\\s+", " ");
        if (head.group(3) != null) c.length = Integer.parseInt(head.group(3));
        if (head.group(4) != null) c.scale  = Integer.parseInt(head.group(4));

        String rest = def.substring(head.end());
        // 先摘注释，避免注释文本里的 "NOT NULL""DEFAULT" 等字样污染后续判断
        Matcher cm = COMMENT_CLAUSE.matcher(rest);
        if (cm.find()) {
            c.comment = unescape(cm.group(1));
            rest = rest.substring(0, cm.start()) + " " + rest.substring(cm.end());
        }

        c.nullable = !Pattern.compile("\\bNOT\\s+NULL\\b", Pattern.CASE_INSENSITIVE).matcher(rest).find();
        if (Pattern.compile("\\bPRIMARY\\s+KEY\\b", Pattern.CASE_INSENSITIVE).matcher(rest).find()) {
            c.primaryKey = true;
            c.nullable = false;
        }
        Matcher dm = DEFAULT_CLAUSE.matcher(rest);
        if (dm.find()) {
            String v = dm.group(1);
            if (v.startsWith("'")) v = unescape(v.substring(1, v.length() - 1));
            if (!"NULL".equalsIgnoreCase(v)) c.defaultValue = v;
        }
        return c;
    }

    // ── 扫描辅助 ──────────────────────────────────────────────────────────────

    /** 去掉 -- 行注释、# 行注释和 C 风格块注释，字符串字面量内的同名字符保持不变。 */
    static String stripComments(String sql) {
        StringBuilder out = new StringBuilder(sql.length());
        int i = 0, n = sql.length();
        while (i < n) {
            char ch = sql.charAt(i);
            if (ch == '\'' || ch == '"' || ch == '`') {
                int end = skipQuoted(sql, i);
                out.append(sql, i, end);
                i = end;
            } else if (ch == '-' && i + 1 < n && sql.charAt(i + 1) == '-') {
                while (i < n && sql.charAt(i) != '\n') i++;
            } else if (ch == '#') {
                while (i < n && sql.charAt(i) != '\n') i++;
            } else if (ch == '/' && i + 1 < n && sql.charAt(i + 1) == '*') {
                int end = sql.indexOf("*/", i + 2);
                i = end < 0 ? n : end + 2;
                out.append(' ');
            } else {
                out.append(ch);
                i++;
            }
        }
        return out.toString();
    }

    /** 从左括号后的位置出发，返回配对右括号的下标；找不到返回 -1。 */
    private static int matchParen(String s, int from) {
        int depth = 1, i = from, n = s.length();
        while (i < n) {
            char ch = s.charAt(i);
            if (ch == '\'' || ch == '"' || ch == '`') { i = skipQuoted(s, i); continue; }
            if (ch == '(') depth++;
            else if (ch == ')' && --depth == 0) return i;
            i++;
        }
        return -1;
    }

    /** 按顶层逗号切分表体（忽略括号内与字符串内的逗号）。 */
    private static List<String> splitTopLevel(String body) {
        List<String> parts = new ArrayList<>();
        int depth = 0, start = 0, i = 0, n = body.length();
        while (i < n) {
            char ch = body.charAt(i);
            if (ch == '\'' || ch == '"' || ch == '`') { i = skipQuoted(body, i); continue; }
            if (ch == '(') depth++;
            else if (ch == ')') depth--;
            else if (ch == ',' && depth == 0) {
                parts.add(body.substring(start, i));
                start = i + 1;
            }
            i++;
        }
        parts.add(body.substring(start));
        return parts;
    }

    /** 返回引号字面量结束后的下标（含结束引号），支持 '' 与 \' 转义。 */
    private static int skipQuoted(String s, int start) {
        char q = s.charAt(start);
        int i = start + 1, n = s.length();
        while (i < n) {
            char ch = s.charAt(i);
            if (ch == '\\' && q != '`') { i += 2; continue; }
            if (ch == q) {
                if (i + 1 < n && s.charAt(i + 1) == q) { i += 2; continue; }  // '' 转义
                return i + 1;
            }
            i++;
        }
        return n;
    }

    private static String unquote(String s) {
        String v = s.trim();
        if (v.length() >= 2) {
            char a = v.charAt(0), b = v.charAt(v.length() - 1);
            if ((a == '`' && b == '`') || (a == '"' && b == '"') || (a == '[' && b == ']')) {
                v = v.substring(1, v.length() - 1);
            }
        }
        int dot = v.lastIndexOf('.');
        return dot >= 0 ? v.substring(dot + 1) : v;
    }

    private static String unescape(String s) {
        return s.replace("''", "'");
    }
}
