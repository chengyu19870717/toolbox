package com.toolbox.plugin.datamodel;

import java.io.ByteArrayOutputStream;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Set;

/**
 * 从 RTF 富文本中抽取纯文本。
 *
 * <p>存在的理由：用户手里的 .sql 文件常常是从聊天工具/邮件里另存的，扩展名是 .sql、
 * 内容却是 RTF（开头 {@code {\rtf1\ansi\ansicpg936...}）。这类文件直接喂给
 * {@link SqlSchemaParser} 会一张表都解析不出来，而报错信息（"未解析到 CREATE TABLE"）
 * 完全指不到真正的原因，用户只会觉得工具坏了。
 *
 * <p>只实现导入场景够用的子集：忽略排版，保留文字、换行和制表符。
 * 处理 {@code \'xx} 代码页字节（按 {@code \ansicpgNNNN} 解码，中文 RTF 通常是 936/GBK）、
 * Unicode 转义（反斜杠 u 加码点）及其回退字符跳过（反斜杠 uc）、
 * <p>注意：本文件的注释里不能出现「反斜杠 + u」的字面组合——javac 在词法阶段
 * 就会把它当成 Unicode 转义处理，即使它在注释中，会直接编译报错。
 * 以及 {@code {\*\...}} 与字体表/颜色表/样式表等不可见目标组。
 */
public final class RtfTextExtractor {

    private RtfTextExtractor() {}

    /** 这些目标组里装的是排版元数据，不是正文，整组跳过。 */
    private static final Set<String> SKIP_DESTINATIONS = Set.of(
            "fonttbl", "colortbl", "expandedcolortbl", "stylesheet", "listtable",
            "listoverridetable", "rsidtbl", "generator", "info", "pict", "object",
            "themedata", "datastore", "latentstyles", "xmlnstbl", "filetbl", "pgptbl",
            "shppict", "nonshppict", "fldinst", "colorschememapping", "mmathPr");

    /** 内容是否为 RTF（允许前置 BOM 和空白）。 */
    public static boolean isRtf(String content) {
        if (content == null) return false;
        int i = 0, n = Math.min(content.length(), 16);
        while (i < n && (Character.isWhitespace(content.charAt(i)) || content.charAt(i) == '﻿')) i++;
        return content.startsWith("{\\rtf", i);
    }

    /** RTF → 纯文本；传入非 RTF 内容时原样返回。 */
    public static String toPlainText(String rtf) {
        if (!isRtf(rtf)) return rtf;

        StringBuilder out = new StringBuilder(rtf.length() / 2);
        ByteArrayOutputStream buf = new ByteArrayOutputStream();  // 待解码的代码页字节
        Charset[] charset = { Charset.forName("windows-1252") };  // 数组以便内部方法改写

        Deque<Integer> ucStack = new ArrayDeque<>();
        int uc = 1;            // Unicode 转义后需要跳过的回退字符数
        int skipChars = 0;     // 当前还要跳过几个回退字符
        int depth = 0;
        int skipDepth = -1;    // >=0 表示正在跳过某个目标组，直到退出该层

        int i = 0, n = rtf.length();
        while (i < n) {
            char c = rtf.charAt(i);

            if (c == '{') {
                flush(buf, charset[0], out);
                ucStack.push(uc);
                depth++;
                i++;
            } else if (c == '}') {
                flush(buf, charset[0], out);
                if (!ucStack.isEmpty()) uc = ucStack.pop();
                depth--;
                if (skipDepth >= 0 && depth < skipDepth) skipDepth = -1;
                skipChars = 0;
                i++;
            } else if (c == '\\') {
                i++;
                if (i >= n) break;
                char ctl = rtf.charAt(i);

                if (ctl == '\'') {                       // \'xx 代码页字节
                    if (i + 2 < n) {
                        int b = hex(rtf.charAt(i + 1)) * 16 + hex(rtf.charAt(i + 2));
                        if (b >= 0) {
                            if (skipChars > 0)            skipChars--;
                            else if (skipDepth < 0)       buf.write(b);
                        }
                        i += 3;
                    } else {
                        i = n;
                    }
                } else if (!isLetter(ctl)) {             // 控制符号
                    i++;
                    switch (ctl) {
                        case '\\', '{', '}' -> { if (skipDepth < 0) buf.write(ctl); }
                        case '~'            -> { if (skipDepth < 0) buf.write(' '); }
                        case '\n', '\r'     -> { flush(buf, charset[0], out); if (skipDepth < 0) out.append('\n'); }
                        // {\*\xxx ...} 整组不可见：从当前层开始跳过
                        case '*'            -> { if (skipDepth < 0) skipDepth = depth; }
                        default             -> { /* \- 可选连字符、\_ 不换行连字符等，忽略 */ }
                    }
                } else {                                  // 控制字
                    int ws = i;
                    while (ws < n && isLetter(rtf.charAt(ws))) ws++;
                    String word = rtf.substring(i, ws);
                    int p = ws;
                    boolean neg = p < n && rtf.charAt(p) == '-';
                    if (neg) p++;
                    int ds = p;
                    while (p < n && Character.isDigit(rtf.charAt(p))) p++;
                    Integer param = p > ds ? Integer.parseInt(rtf.substring(ds, p)) : null;
                    if (neg && param != null) param = -param;
                    if (p < n && rtf.charAt(p) == ' ') p++;   // 控制字后的单个空格是分隔符，不是正文
                    i = p;

                    if (SKIP_DESTINATIONS.contains(word)) {
                        if (skipDepth < 0) skipDepth = depth;
                        continue;
                    }
                    if (skipDepth >= 0) continue;

                    switch (word) {
                        case "par", "line", "sect", "row" -> { flush(buf, charset[0], out); out.append('\n'); skipChars = 0; }
                        case "cell", "tab"                -> { flush(buf, charset[0], out); out.append('\t'); }
                        case "uc"                         -> { if (param != null) uc = Math.max(0, param); }
                        case "u" -> {
                            if (param != null) {
                                flush(buf, charset[0], out);
                                int cp = param < 0 ? param + 65536 : param;
                                out.append((char) cp);
                                skipChars = uc;
                            }
                        }
                        case "ansicpg" -> { if (param != null) charset[0] = codePage(param); }
                        default -> { /* 排版控制字，忽略 */ }
                    }
                }
            } else if (c == '\r' || c == '\n') {
                i++;                                      // RTF 源码里的换行是排版空白，不是正文
            } else {
                if (skipChars > 0)      skipChars--;
                else if (skipDepth < 0) buf.write(c);     // 正文里的非转义字符必为 ASCII
                i++;
            }
        }
        flush(buf, charset[0], out);
        return out.toString();
    }

    private static void flush(ByteArrayOutputStream buf, Charset cs, StringBuilder out) {
        if (buf.size() == 0) return;
        out.append(new String(buf.toByteArray(), cs));
        buf.reset();
    }

    private static Charset codePage(int cp) {
        try {
            return switch (cp) {
                case 65001 -> StandardCharsets.UTF_8;
                case 936, 20936 -> Charset.forName("GBK");
                case 950 -> Charset.forName("Big5");
                case 932 -> Charset.forName("Shift_JIS");
                case 949 -> Charset.forName("EUC-KR");
                case 1252, 0 -> Charset.forName("windows-1252");
                default -> Charset.forName("windows-" + cp);
            };
        } catch (Exception e) {
            return Charset.forName("windows-1252");
        }
    }

    private static boolean isLetter(char c) {
        return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
    }

    private static int hex(char c) {
        if (c >= '0' && c <= '9') return c - '0';
        if (c >= 'a' && c <= 'f') return c - 'a' + 10;
        if (c >= 'A' && c <= 'F') return c - 'A' + 10;
        return -1;
    }
}
