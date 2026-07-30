import { defineComponent as Cl, ref as m, computed as ol, onMounted as Nl, resolveComponent as y, resolveDirective as Ql, openBlock as v, createElementBlock as k, createElementVNode as r, createVNode as a, withCtx as o, createTextVNode as n, Fragment as S, renderList as z, normalizeClass as gl, toDisplayString as _, createCommentVNode as kl, withDirectives as H, createBlock as R, vShow as wl, h as Al } from "vue";
import { ElMessage as b, ElMessageBox as J } from "element-plus";
const Il = { class: "dm-root" }, jl = { class: "dm-side" }, Kl = { class: "dm-side-head" }, Gl = { class: "dm-table-list" }, Hl = ["onClick"], Jl = { class: "dm-table-name" }, Wl = { class: "dm-table-cmt" }, Xl = { class: "dm-table-meta" }, Yl = {
  key: 0,
  class: "dm-empty"
}, Zl = { class: "dm-main" }, hl = { class: "dm-toolbar" }, le = { class: "dm-title" }, ee = { class: "dm-subtitle" }, ae = {
  key: 1,
  class: "dm-subtitle"
}, te = { class: "dm-toolbar-right" }, oe = { class: "dm-tab-bar" }, ne = ["onClick"], ue = { class: "dm-panel" }, ie = { class: "dm-panel-head" }, se = { class: "dm-panel" }, de = { class: "dm-panel-head" }, me = {
  class: "dm-panel-head",
  style: { padding: "0 0 8px" }
}, re = /* @__PURE__ */ Cl({
  __name: "DataModelView",
  props: {
    api: {},
    toolId: {}
  },
  setup(L) {
    const p = L, A = [
      { key: "columns", label: "字段结构" },
      { key: "relations", label: "关联关系" }
    ], W = ["varchar", "char", "int", "bigint", "decimal", "datetime", "timestamp", "date", "text", "longtext", "blob"], X = ["一对一", "一对多", "多对一", "多对多"], U = m(!1), w = m(!1), I = m("columns"), C = m([]), E = m([]), nl = m([]), c = m(null), Y = m(""), j = m(""), Z = m(!1), P = ol(() => C.value.find((t) => t.id === c.value) || null), ul = ol(() => {
      const t = Y.value.trim().toLowerCase();
      return t ? C.value.filter((l) => String(l.table_name || "").toLowerCase().includes(t) || String(l.table_comment || "").toLowerCase().includes(t)) : C.value;
    }), $l = ol(() => {
      const t = j.value.trim().toLowerCase();
      return t ? E.value.filter((l) => String(l.col_name || "").toLowerCase().includes(t) || String(l.col_comment || "").toLowerCase().includes(t)) : E.value;
    });
    function xl(t) {
      return t.col_type ? t.col_length == null ? t.col_type : t.col_scale != null ? `${t.col_type}(${t.col_length},${t.col_scale})` : `${t.col_type}(${t.col_length})` : "—";
    }
    const il = (t) => t.table_comment ? `${t.table_name} — ${t.table_comment}` : t.table_name, sl = (t) => t.col_comment ? `${t.col_name} — ${t.col_comment}` : t.col_name, Sl = (t) => ({ "sql-fk": "外键", infer: "推断", manual: "手工" })[t] || "手工", Ul = (t) => ({ "sql-fk": "success", infer: "info", manual: "" })[t] || "";
    async function $(t = !0) {
      const l = await p.api.plugin.callSync("listTables", {});
      C.value = l.tables || [], (!t || !C.value.some((d) => d.id === c.value)) && (c.value = C.value.length ? C.value[0].id : null), await dl();
    }
    async function dl() {
      await Promise.all([h(), q()]);
    }
    async function h() {
      if (!c.value) {
        E.value = [];
        return;
      }
      const t = await p.api.plugin.callSync("listColumns", { table_id: c.value });
      E.value = t.columns || [];
    }
    async function q() {
      const t = Z.value || !c.value ? {} : { table_id: c.value }, l = await p.api.plugin.callSync("listRelations", t);
      nl.value = l.relations || [];
    }
    async function Tl(t) {
      c.value = t, j.value = "", U.value = !0;
      try {
        await dl();
      } finally {
        U.value = !1;
      }
    }
    Nl(async () => {
      U.value = !0;
      try {
        await $(!1);
      } finally {
        U.value = !1;
      }
    });
    const B = m(!1), V = m({});
    function ml(t) {
      V.value = t ? { ...t } : { id: "", table_name: "", table_comment: "", module: "", remark: "" }, B.value = !0;
    }
    async function zl() {
      if (!String(V.value.table_name || "").trim()) {
        b.warning("表名不能为空");
        return;
      }
      w.value = !0;
      try {
        const t = await p.api.plugin.callSync("saveTable", V.value);
        B.value = !1, b.success("保存成功"), c.value = t.id || c.value, await $();
      } catch {
      } finally {
        w.value = !1;
      }
    }
    async function Rl(t) {
      try {
        await J.confirm(
          `删除表 ${t.table_name} 会同时删除它的全部字段和关联关系，确认？`,
          "删除确认",
          { type: "warning" }
        );
      } catch {
        return;
      }
      await p.api.plugin.callSync("deleteTable", { id: t.id }), b.success("已删除"), await $(!1);
    }
    const O = m(!1), u = m({});
    function rl(t) {
      if (!c.value) {
        b.warning("请先选择一张表");
        return;
      }
      u.value = t ? { ...t, is_pk: !!t.is_pk, nullable: !!t.nullable } : {
        id: "",
        table_id: c.value,
        col_name: "",
        col_type: "varchar",
        col_length: "",
        col_scale: "",
        default_value: "",
        col_comment: "",
        ordinal: E.value.length + 1,
        is_pk: !1,
        nullable: !0
      }, O.value = !0;
    }
    async function Ll() {
      if (!String(u.value.col_name || "").trim()) {
        b.warning("字段名不能为空");
        return;
      }
      w.value = !0;
      try {
        await p.api.plugin.callSync("saveColumn", {
          ...u.value,
          table_id: c.value,
          is_pk: u.value.is_pk ? 1 : 0,
          nullable: u.value.nullable ? 1 : 0
        }), O.value = !1, b.success("保存成功"), await Promise.all([h(), $()]);
      } catch {
      } finally {
        w.value = !1;
      }
    }
    async function ql(t) {
      try {
        await J.confirm(
          `删除字段 ${t.col_name}？涉及该字段的关联关系会一并删除。`,
          "删除确认",
          { type: "warning" }
        );
      } catch {
        return;
      }
      await p.api.plugin.callSync("deleteColumn", { id: t.id }), b.success("已删除"), await Promise.all([h(), q(), $()]);
    }
    const N = m(!1), s = m({}), ll = m([]), el = m([]);
    async function K(t) {
      return t ? (await p.api.plugin.callSync("listColumns", { table_id: t })).columns || [] : [];
    }
    async function vl(t) {
      t === "from" ? (s.value.from_col_id = "", ll.value = await K(s.value.from_table_id)) : (s.value.to_col_id = "", el.value = await K(s.value.to_table_id));
    }
    async function fl(t) {
      s.value = t ? { ...t } : {
        id: "",
        from_table_id: c.value || "",
        from_col_id: "",
        to_table_id: "",
        to_col_id: "",
        rel_type: "多对一",
        remark: ""
      };
      const [l, d] = await Promise.all([
        K(s.value.from_table_id),
        K(s.value.to_table_id)
      ]);
      ll.value = l, el.value = d, N.value = !0;
    }
    async function Dl() {
      if (!s.value.from_col_id || !s.value.to_col_id) {
        b.warning("来源字段和目标字段都必须选择");
        return;
      }
      w.value = !0;
      try {
        await p.api.plugin.callSync("saveRelation", s.value), N.value = !1, b.success("保存成功"), await Promise.all([q(), $()]);
      } catch {
      } finally {
        w.value = !1;
      }
    }
    async function Ml(t) {
      try {
        await J.confirm(
          `删除关联 ${t.from_table}.${t.from_column} → ${t.to_table}.${t.to_column}？`,
          "删除确认",
          { type: "warning" }
        );
      } catch {
        return;
      }
      await p.api.plugin.callSync("deleteRelation", { id: t.id }), b.success("已删除"), await Promise.all([q(), $()]);
    }
    async function Fl() {
      try {
        await J.confirm(
          "将按「本表普通字段 ↔ 他表同名主键字段」自动补充关联关系，已有关联不会被覆盖。继续？",
          "推断关联",
          { type: "info" }
        );
      } catch {
        return;
      }
      U.value = !0;
      try {
        const t = await p.api.plugin.callSync("inferRelations", {});
        b.success(`推断完成，新增 ${t.added} 条关联`), await Promise.all([q(), $()]);
      } finally {
        U.value = !1;
      }
    }
    const Q = m(!1), D = m(""), al = m(!0), pl = m();
    async function El(t) {
      var d;
      const l = (d = t.target.files) == null ? void 0 : d[0];
      l && (D.value = await l.text(), t.target.value = "", b.success(`已读取 ${l.name}`));
    }
    async function Pl() {
      if (!D.value.trim()) {
        b.warning("请先粘贴或选择 SQL 内容");
        return;
      }
      w.value = !0;
      try {
        const t = await p.api.plugin.callSync("importSql", {
          sql: D.value,
          overwrite: al.value
        });
        Q.value = !1, D.value = "", b.success(
          (t.fromRtf ? "已识别为 RTF 富文本并自动转换。" : "") + `导入完成：新增 ${t.created} 张表，覆盖 ${t.updated} 张，跳过 ${t.skipped} 张，共 ${t.columns} 个字段、${t.relations} 条外键关联`
        ), await $(!1);
      } catch {
      } finally {
        w.value = !1;
      }
    }
    async function Bl() {
      const t = await p.api.plugin.callSync("exportDdl", {}), l = new Blob([t.ddl || ""], { type: "text/plain;charset=utf-8" }), d = URL.createObjectURL(l), i = document.createElement("a");
      i.href = d, i.download = `data-model-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.sql`, i.click(), URL.revokeObjectURL(d), b.success("已导出 DDL");
    }
    return (t, l) => {
      const d = y("el-input"), i = y("el-button"), g = y("el-table-column"), cl = y("el-tag"), _l = y("el-table"), bl = y("el-checkbox"), f = y("el-form-item"), tl = y("el-form"), G = y("el-dialog"), x = y("el-col"), M = y("el-option"), F = y("el-select"), yl = y("el-switch"), Ol = y("el-row"), Vl = Ql("loading");
      return v(), k("div", Il, [
        r("aside", jl, [
          r("div", Kl, [
            a(d, {
              modelValue: Y.value,
              "onUpdate:modelValue": l[0] || (l[0] = (e) => Y.value = e),
              placeholder: "搜索表名/表说明...",
              clearable: "",
              size: "small"
            }, null, 8, ["modelValue"]),
            a(i, {
              type: "primary",
              size: "small",
              style: { width: "100%", "margin-top": "8px" },
              onClick: l[1] || (l[1] = (e) => ml(null))
            }, {
              default: o(() => [...l[41] || (l[41] = [
                n("+ 新增表", -1)
              ])]),
              _: 1
            })
          ]),
          r("div", Gl, [
            (v(!0), k(S, null, z(ul.value, (e) => (v(), k("div", {
              key: e.id,
              class: gl(["dm-table-item", { active: c.value === e.id }]),
              onClick: (T) => Tl(e.id)
            }, [
              r("div", Jl, _(e.table_name), 1),
              r("div", Wl, _(e.table_comment || "—"), 1),
              r("div", Xl, _(e.column_count) + " 字段 · " + _(e.relation_count) + " 关联", 1)
            ], 10, Hl))), 128)),
            ul.value.length ? kl("", !0) : (v(), k("div", Yl, "暂无表，先导入 SQL 或新增一张表"))
          ])
        ]),
        r("section", Zl, [
          r("div", hl, [
            P.value ? (v(), k(S, { key: 0 }, [
              r("strong", le, _(P.value.table_name), 1),
              r("span", ee, _(P.value.table_comment), 1),
              a(i, {
                size: "small",
                onClick: l[2] || (l[2] = (e) => ml(P.value))
              }, {
                default: o(() => [...l[42] || (l[42] = [
                  n("编辑表", -1)
                ])]),
                _: 1
              }),
              a(i, {
                size: "small",
                type: "danger",
                plain: "",
                onClick: l[3] || (l[3] = (e) => Rl(P.value))
              }, {
                default: o(() => [...l[43] || (l[43] = [
                  n("删除表", -1)
                ])]),
                _: 1
              })
            ], 64)) : (v(), k("span", ae, "请从左侧选择一张表")),
            r("div", te, [
              a(i, {
                size: "small",
                onClick: l[4] || (l[4] = (e) => Q.value = !0)
              }, {
                default: o(() => [...l[44] || (l[44] = [
                  n("导入 SQL", -1)
                ])]),
                _: 1
              }),
              a(i, {
                size: "small",
                onClick: Fl
              }, {
                default: o(() => [...l[45] || (l[45] = [
                  n("推断关联", -1)
                ])]),
                _: 1
              }),
              a(i, {
                size: "small",
                onClick: Bl
              }, {
                default: o(() => [...l[46] || (l[46] = [
                  n("导出 DDL", -1)
                ])]),
                _: 1
              })
            ])
          ]),
          r("div", oe, [
            (v(), k(S, null, z(A, (e) => r("div", {
              key: e.key,
              class: gl(["dm-tab-item", { active: I.value === e.key }]),
              onClick: (T) => I.value = e.key
            }, _(e.label), 11, ne)), 64))
          ]),
          H(r("div", ue, [
            r("div", ie, [
              a(d, {
                modelValue: j.value,
                "onUpdate:modelValue": l[5] || (l[5] = (e) => j.value = e),
                placeholder: "搜索字段名/注释...",
                clearable: "",
                size: "small",
                style: { width: "240px" }
              }, null, 8, ["modelValue"]),
              a(i, {
                size: "small",
                type: "primary",
                disabled: !c.value,
                onClick: l[6] || (l[6] = (e) => rl(null))
              }, {
                default: o(() => [...l[47] || (l[47] = [
                  n("+ 新增字段", -1)
                ])]),
                _: 1
              }, 8, ["disabled"])
            ]),
            H((v(), R(_l, {
              data: $l.value,
              border: "",
              stripe: "",
              size: "small",
              height: "100%"
            }, {
              default: o(() => [
                a(g, {
                  type: "index",
                  label: "#",
                  width: "48"
                }),
                a(g, {
                  prop: "col_name",
                  label: "字段名",
                  "min-width": "180"
                }, {
                  default: o(({ row: e }) => [
                    r("strong", null, _(e.col_name), 1),
                    e.is_pk ? (v(), R(cl, {
                      key: 0,
                      size: "small",
                      type: "warning",
                      style: { "margin-left": "6px" }
                    }, {
                      default: o(() => [...l[48] || (l[48] = [
                        n("PK", -1)
                      ])]),
                      _: 1
                    })) : kl("", !0)
                  ]),
                  _: 1
                }),
                a(g, {
                  label: "类型",
                  width: "140"
                }, {
                  default: o(({ row: e }) => [
                    n(_(xl(e)), 1)
                  ]),
                  _: 1
                }),
                a(g, {
                  label: "必填",
                  width: "64",
                  align: "center"
                }, {
                  default: o(({ row: e }) => [
                    n(_(e.nullable ? "" : "✔"), 1)
                  ]),
                  _: 1
                }),
                a(g, {
                  prop: "default_value",
                  label: "默认值",
                  width: "100",
                  "show-overflow-tooltip": ""
                }),
                a(g, {
                  prop: "col_comment",
                  label: "注释",
                  "min-width": "200",
                  "show-overflow-tooltip": ""
                }),
                a(g, {
                  label: "操作",
                  width: "130",
                  fixed: "right"
                }, {
                  default: o(({ row: e }) => [
                    a(i, {
                      size: "small",
                      onClick: (T) => rl(e)
                    }, {
                      default: o(() => [...l[49] || (l[49] = [
                        n("编辑", -1)
                      ])]),
                      _: 1
                    }, 8, ["onClick"]),
                    a(i, {
                      size: "small",
                      type: "danger",
                      onClick: (T) => ql(e)
                    }, {
                      default: o(() => [...l[50] || (l[50] = [
                        n("删除", -1)
                      ])]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["data"])), [
              [Vl, U.value]
            ])
          ], 512), [
            [wl, I.value === "columns"]
          ]),
          H(r("div", se, [
            r("div", de, [
              a(bl, {
                modelValue: Z.value,
                "onUpdate:modelValue": l[7] || (l[7] = (e) => Z.value = e),
                onChange: q
              }, {
                default: o(() => [...l[51] || (l[51] = [
                  n("显示全部表的关联", -1)
                ])]),
                _: 1
              }, 8, ["modelValue"]),
              a(i, {
                size: "small",
                type: "primary",
                onClick: l[8] || (l[8] = (e) => fl(null))
              }, {
                default: o(() => [...l[52] || (l[52] = [
                  n("+ 新增关联", -1)
                ])]),
                _: 1
              })
            ]),
            H((v(), R(_l, {
              data: nl.value,
              border: "",
              stripe: "",
              size: "small",
              height: "100%"
            }, {
              default: o(() => [
                a(g, {
                  label: "来源",
                  "min-width": "220"
                }, {
                  default: o(({ row: e }) => [
                    n(_(e.from_table) + ".", 1),
                    r("strong", null, _(e.from_column), 1)
                  ]),
                  _: 1
                }),
                a(g, {
                  prop: "rel_type",
                  label: "关系",
                  width: "90",
                  align: "center"
                }),
                a(g, {
                  label: "目标",
                  "min-width": "220"
                }, {
                  default: o(({ row: e }) => [
                    n(_(e.to_table) + ".", 1),
                    r("strong", null, _(e.to_column), 1)
                  ]),
                  _: 1
                }),
                a(g, {
                  label: "来源方式",
                  width: "90",
                  align: "center"
                }, {
                  default: o(({ row: e }) => [
                    a(cl, {
                      size: "small",
                      type: Ul(e.source)
                    }, {
                      default: o(() => [
                        n(_(Sl(e.source)), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])
                  ]),
                  _: 1
                }),
                a(g, {
                  prop: "remark",
                  label: "备注",
                  "min-width": "160",
                  "show-overflow-tooltip": ""
                }),
                a(g, {
                  label: "操作",
                  width: "130",
                  fixed: "right"
                }, {
                  default: o(({ row: e }) => [
                    a(i, {
                      size: "small",
                      onClick: (T) => fl(e)
                    }, {
                      default: o(() => [...l[53] || (l[53] = [
                        n("编辑", -1)
                      ])]),
                      _: 1
                    }, 8, ["onClick"]),
                    a(i, {
                      size: "small",
                      type: "danger",
                      onClick: (T) => Ml(e)
                    }, {
                      default: o(() => [...l[54] || (l[54] = [
                        n("删除", -1)
                      ])]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["data"])), [
              [Vl, U.value]
            ])
          ], 512), [
            [wl, I.value === "relations"]
          ])
        ]),
        a(G, {
          modelValue: B.value,
          "onUpdate:modelValue": l[14] || (l[14] = (e) => B.value = e),
          title: V.value.id ? "编辑表" : "新增表",
          width: "560px",
          "close-on-click-modal": !1,
          "destroy-on-close": ""
        }, {
          footer: o(() => [
            a(i, {
              onClick: l[13] || (l[13] = (e) => B.value = !1)
            }, {
              default: o(() => [...l[55] || (l[55] = [
                n("取消", -1)
              ])]),
              _: 1
            }),
            a(i, {
              type: "primary",
              loading: w.value,
              onClick: zl
            }, {
              default: o(() => [...l[56] || (l[56] = [
                n("保存", -1)
              ])]),
              _: 1
            }, 8, ["loading"])
          ]),
          default: o(() => [
            a(tl, {
              model: V.value,
              "label-width": "80px",
              size: "small"
            }, {
              default: o(() => [
                a(f, { label: "表名 *" }, {
                  default: o(() => [
                    a(d, {
                      modelValue: V.value.table_name,
                      "onUpdate:modelValue": l[9] || (l[9] = (e) => V.value.table_name = e),
                      placeholder: "如 admin_sm_user"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                a(f, { label: "表说明" }, {
                  default: o(() => [
                    a(d, {
                      modelValue: V.value.table_comment,
                      "onUpdate:modelValue": l[10] || (l[10] = (e) => V.value.table_comment = e)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                a(f, { label: "所属模块" }, {
                  default: o(() => [
                    a(d, {
                      modelValue: V.value.module,
                      "onUpdate:modelValue": l[11] || (l[11] = (e) => V.value.module = e),
                      placeholder: "如 权限管理"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                a(f, { label: "备注" }, {
                  default: o(() => [
                    a(d, {
                      modelValue: V.value.remark,
                      "onUpdate:modelValue": l[12] || (l[12] = (e) => V.value.remark = e),
                      type: "textarea",
                      rows: 2
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        a(G, {
          modelValue: O.value,
          "onUpdate:modelValue": l[25] || (l[25] = (e) => O.value = e),
          title: u.value.id ? "编辑字段" : "新增字段",
          width: "620px",
          "close-on-click-modal": !1,
          "destroy-on-close": ""
        }, {
          footer: o(() => [
            a(i, {
              onClick: l[24] || (l[24] = (e) => O.value = !1)
            }, {
              default: o(() => [...l[57] || (l[57] = [
                n("取消", -1)
              ])]),
              _: 1
            }),
            a(i, {
              type: "primary",
              loading: w.value,
              onClick: Ll
            }, {
              default: o(() => [...l[58] || (l[58] = [
                n("保存", -1)
              ])]),
              _: 1
            }, 8, ["loading"])
          ]),
          default: o(() => [
            a(tl, {
              model: u.value,
              "label-width": "80px",
              size: "small"
            }, {
              default: o(() => [
                a(Ol, { gutter: 16 }, {
                  default: o(() => [
                    a(x, { span: 12 }, {
                      default: o(() => [
                        a(f, { label: "字段名 *" }, {
                          default: o(() => [
                            a(d, {
                              modelValue: u.value.col_name,
                              "onUpdate:modelValue": l[15] || (l[15] = (e) => u.value.col_name = e)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    a(x, { span: 12 }, {
                      default: o(() => [
                        a(f, { label: "类型" }, {
                          default: o(() => [
                            a(F, {
                              modelValue: u.value.col_type,
                              "onUpdate:modelValue": l[16] || (l[16] = (e) => u.value.col_type = e),
                              filterable: "",
                              "allow-create": "",
                              "default-first-option": "",
                              style: { width: "100%" }
                            }, {
                              default: o(() => [
                                (v(), k(S, null, z(W, (e) => a(M, {
                                  key: e,
                                  label: e,
                                  value: e
                                }, null, 8, ["label", "value"])), 64))
                              ]),
                              _: 1
                            }, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    a(x, { span: 12 }, {
                      default: o(() => [
                        a(f, { label: "长度" }, {
                          default: o(() => [
                            a(d, {
                              modelValue: u.value.col_length,
                              "onUpdate:modelValue": l[17] || (l[17] = (e) => u.value.col_length = e),
                              type: "number"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    a(x, { span: 12 }, {
                      default: o(() => [
                        a(f, { label: "小数位" }, {
                          default: o(() => [
                            a(d, {
                              modelValue: u.value.col_scale,
                              "onUpdate:modelValue": l[18] || (l[18] = (e) => u.value.col_scale = e),
                              type: "number"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    a(x, { span: 12 }, {
                      default: o(() => [
                        a(f, { label: "默认值" }, {
                          default: o(() => [
                            a(d, {
                              modelValue: u.value.default_value,
                              "onUpdate:modelValue": l[19] || (l[19] = (e) => u.value.default_value = e)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    a(x, { span: 12 }, {
                      default: o(() => [
                        a(f, { label: "排序号" }, {
                          default: o(() => [
                            a(d, {
                              modelValue: u.value.ordinal,
                              "onUpdate:modelValue": l[20] || (l[20] = (e) => u.value.ordinal = e),
                              type: "number"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    a(x, { span: 12 }, {
                      default: o(() => [
                        a(f, { label: "主键" }, {
                          default: o(() => [
                            a(yl, {
                              modelValue: u.value.is_pk,
                              "onUpdate:modelValue": l[21] || (l[21] = (e) => u.value.is_pk = e)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    a(x, { span: 12 }, {
                      default: o(() => [
                        a(f, { label: "允许空" }, {
                          default: o(() => [
                            a(yl, {
                              modelValue: u.value.nullable,
                              "onUpdate:modelValue": l[22] || (l[22] = (e) => u.value.nullable = e)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    a(x, { span: 24 }, {
                      default: o(() => [
                        a(f, { label: "注释" }, {
                          default: o(() => [
                            a(d, {
                              modelValue: u.value.col_comment,
                              "onUpdate:modelValue": l[23] || (l[23] = (e) => u.value.col_comment = e)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        a(G, {
          modelValue: N.value,
          "onUpdate:modelValue": l[35] || (l[35] = (e) => N.value = e),
          title: s.value.id ? "编辑关联" : "新增关联",
          width: "620px",
          "close-on-click-modal": !1,
          "destroy-on-close": ""
        }, {
          footer: o(() => [
            a(i, {
              onClick: l[34] || (l[34] = (e) => N.value = !1)
            }, {
              default: o(() => [...l[59] || (l[59] = [
                n("取消", -1)
              ])]),
              _: 1
            }),
            a(i, {
              type: "primary",
              loading: w.value,
              onClick: Dl
            }, {
              default: o(() => [...l[60] || (l[60] = [
                n("保存", -1)
              ])]),
              _: 1
            }, 8, ["loading"])
          ]),
          default: o(() => [
            a(tl, {
              model: s.value,
              "label-width": "90px",
              size: "small"
            }, {
              default: o(() => [
                a(f, { label: "来源表" }, {
                  default: o(() => [
                    a(F, {
                      modelValue: s.value.from_table_id,
                      "onUpdate:modelValue": l[26] || (l[26] = (e) => s.value.from_table_id = e),
                      filterable: "",
                      style: { width: "100%" },
                      onChange: l[27] || (l[27] = (e) => vl("from"))
                    }, {
                      default: o(() => [
                        (v(!0), k(S, null, z(C.value, (e) => (v(), R(M, {
                          key: e.id,
                          label: il(e),
                          value: e.id
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                a(f, { label: "来源字段 *" }, {
                  default: o(() => [
                    a(F, {
                      modelValue: s.value.from_col_id,
                      "onUpdate:modelValue": l[28] || (l[28] = (e) => s.value.from_col_id = e),
                      filterable: "",
                      style: { width: "100%" }
                    }, {
                      default: o(() => [
                        (v(!0), k(S, null, z(ll.value, (e) => (v(), R(M, {
                          key: e.id,
                          label: sl(e),
                          value: e.id
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                a(f, { label: "关系类型" }, {
                  default: o(() => [
                    a(F, {
                      modelValue: s.value.rel_type,
                      "onUpdate:modelValue": l[29] || (l[29] = (e) => s.value.rel_type = e),
                      style: { width: "100%" }
                    }, {
                      default: o(() => [
                        (v(), k(S, null, z(X, (e) => a(M, {
                          key: e,
                          label: e,
                          value: e
                        }, null, 8, ["label", "value"])), 64))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                a(f, { label: "目标表" }, {
                  default: o(() => [
                    a(F, {
                      modelValue: s.value.to_table_id,
                      "onUpdate:modelValue": l[30] || (l[30] = (e) => s.value.to_table_id = e),
                      filterable: "",
                      style: { width: "100%" },
                      onChange: l[31] || (l[31] = (e) => vl("to"))
                    }, {
                      default: o(() => [
                        (v(!0), k(S, null, z(C.value, (e) => (v(), R(M, {
                          key: e.id,
                          label: il(e),
                          value: e.id
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                a(f, { label: "目标字段 *" }, {
                  default: o(() => [
                    a(F, {
                      modelValue: s.value.to_col_id,
                      "onUpdate:modelValue": l[32] || (l[32] = (e) => s.value.to_col_id = e),
                      filterable: "",
                      style: { width: "100%" }
                    }, {
                      default: o(() => [
                        (v(!0), k(S, null, z(el.value, (e) => (v(), R(M, {
                          key: e.id,
                          label: sl(e),
                          value: e.id
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                a(f, { label: "备注" }, {
                  default: o(() => [
                    a(d, {
                      modelValue: s.value.remark,
                      "onUpdate:modelValue": l[33] || (l[33] = (e) => s.value.remark = e),
                      type: "textarea",
                      rows: 2
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        a(G, {
          modelValue: Q.value,
          "onUpdate:modelValue": l[40] || (l[40] = (e) => Q.value = e),
          title: "导入 SQL 建表语句",
          width: "760px",
          "close-on-click-modal": !1,
          "destroy-on-close": ""
        }, {
          footer: o(() => [
            a(i, {
              onClick: l[39] || (l[39] = (e) => Q.value = !1)
            }, {
              default: o(() => [...l[63] || (l[63] = [
                n("取消", -1)
              ])]),
              _: 1
            }),
            a(i, {
              type: "primary",
              loading: w.value,
              onClick: Pl
            }, {
              default: o(() => [...l[64] || (l[64] = [
                n("开始解析导入", -1)
              ])]),
              _: 1
            }, 8, ["loading"])
          ]),
          default: o(() => [
            r("div", me, [
              a(i, {
                size: "small",
                onClick: l[36] || (l[36] = (e) => {
                  var T;
                  return (T = pl.value) == null ? void 0 : T.click();
                })
              }, {
                default: o(() => [...l[61] || (l[61] = [
                  n("选择 .sql 文件", -1)
                ])]),
                _: 1
              }),
              r("input", {
                ref_key: "sqlFileRef",
                ref: pl,
                type: "file",
                accept: ".sql,.txt",
                style: { display: "none" },
                onChange: El
              }, null, 544),
              a(bl, {
                modelValue: al.value,
                "onUpdate:modelValue": l[37] || (l[37] = (e) => al.value = e)
              }, {
                default: o(() => [...l[62] || (l[62] = [
                  n("覆盖同名表（取消勾选则跳过已存在的表）", -1)
                ])]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            a(d, {
              modelValue: D.value,
              "onUpdate:modelValue": l[38] || (l[38] = (e) => D.value = e),
              type: "textarea",
              rows: 16,
              spellcheck: "false",
              placeholder: "粘贴 CREATE TABLE 语句，或选择 .sql 文件（RTF 富文本会自动转换）"
            }, null, 8, ["modelValue"])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
}), ve = (L, p) => {
  const A = L.__vccOpts || L;
  for (const [W, X] of p)
    A[W] = X;
  return A;
}, fe = /* @__PURE__ */ ve(re, [["__scopeId", "data-v-1d7dd5c7"]]);
function _e(L, p) {
  return Cl({
    render() {
      return Al(fe, { api: L, toolId: p });
    }
  });
}
export {
  _e as createView
};
