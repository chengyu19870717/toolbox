import { defineComponent as S, openBlock as p, createElementBlock as _, createElementVNode as o, ref as r, computed as xe, onMounted as ye, onBeforeUnmount as Ce, resolveComponent as d, resolveDirective as Ve, createVNode as t, withCtx as n, unref as k, Fragment as ze, renderList as be, toDisplayString as C, withModifiers as ke, createCommentVNode as L, createTextVNode as F, createBlock as G, withDirectives as Se, normalizeClass as Me, h as De } from "vue";
import { ElMessage as h, ElMessageBox as Te } from "element-plus";
/*! Element Plus Icons Vue v2.3.2 */
var Be = /* @__PURE__ */ S({
  name: "Delete",
  __name: "delete",
  setup(m) {
    return (i, v) => (p(), _("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      o("path", {
        fill: "currentColor",
        d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32"
      })
    ]));
  }
}), He = Be, Ee = /* @__PURE__ */ S({
  name: "FolderOpened",
  __name: "folder-opened",
  setup(m) {
    return (i, v) => (p(), _("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      o("path", {
        fill: "currentColor",
        d: "M878.08 448H241.92l-96 384h636.16zM832 384v-64H485.76L357.504 192H128v448l57.92-231.744A32 32 0 0 1 216.96 384zm-24.96 512H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h287.872l128.384 128H864a32 32 0 0 1 32 32v96h23.04a32 32 0 0 1 31.04 39.744l-112 448A32 32 0 0 1 807.04 896"
      })
    ]));
  }
}), te = Ee, Fe = /* @__PURE__ */ S({
  name: "Folder",
  __name: "folder",
  setup(m) {
    return (i, v) => (p(), _("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      o("path", {
        fill: "currentColor",
        d: "M128 192v640h768V320H485.76L357.504 192zm-32-64h287.872l128.384 128H928a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32"
      })
    ]));
  }
}), Pe = Fe, $e = /* @__PURE__ */ S({
  name: "Plus",
  __name: "plus",
  setup(m) {
    return (i, v) => (p(), _("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      o("path", {
        fill: "currentColor",
        d: "M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64z"
      })
    ]));
  }
}), Ie = $e, Le = /* @__PURE__ */ S({
  name: "Refresh",
  __name: "refresh",
  setup(m) {
    return (i, v) => (p(), _("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      o("path", {
        fill: "currentColor",
        d: "M771.776 794.88A384 384 0 0 1 128 512h64a320 320 0 0 0 555.712 216.448H654.72a32 32 0 1 1 0-64h149.056a32 32 0 0 1 32 32v148.928a32 32 0 1 1-64 0v-50.56zM276.288 295.616h92.992a32 32 0 0 1 0 64H220.16a32 32 0 0 1-32-32V178.56a32 32 0 0 1 64 0v50.56A384 384 0 0 1 896.128 512h-64a320 320 0 0 0-555.776-216.384z"
      })
    ]));
  }
}), Ae = Le, Ne = /* @__PURE__ */ S({
  name: "Search",
  __name: "search",
  setup(m) {
    return (i, v) => (p(), _("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      o("path", {
        fill: "currentColor",
        d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704"
      })
    ]));
  }
}), le = Ne;
const We = { class: "fs-root" }, Ke = { class: "fs-sidebar" }, Oe = { class: "sidebar-header" }, Re = { class: "dir-list" }, Ue = { class: "dir-info" }, qe = ["title"], Ze = { class: "dir-meta" }, je = {
  key: 0,
  class: "dir-empty"
}, Ge = {
  key: 0,
  class: "sidebar-footer"
}, Je = { class: "fs-main" }, Qe = { class: "search-bar" }, Xe = {
  key: 0,
  class: "scan-panel"
}, Ye = { class: "scan-panel__main" }, et = { class: "scan-panel__text" }, tt = { class: "path-text" }, lt = { class: "pagination-bar" }, at = /* @__PURE__ */ S({
  __name: "FileSearchView",
  props: {
    api: {},
    toolId: {}
  },
  setup(m) {
    const i = m, v = r([]), T = r(null), P = r(""), V = r(""), z = r(0), B = r(""), A = r(""), N = r(""), W = r(""), J = r([]), Q = r(0), b = r(1), q = r(50), K = r(!1), X = r(!1), $ = r(!1), Z = r(!1), x = r({ path: "", name: "" });
    let I = null, u = null;
    const ae = xe(() => X.value ? v.value.length === 0 ? "请先点击左侧 + 添加检索目录" : N.value || W.value ? "未找到匹配文件" : "暂无已索引文件，请点击目录右侧刷新按钮更新索引" : "正在加载…");
    ye(async () => {
      await Promise.all([O(), R()]), await y(), X.value = !0;
    }), Ce(() => {
      I && clearTimeout(I), u == null || u();
    });
    async function O() {
      try {
        const l = await H("listDirs", {});
        v.value = l.dirs ?? [];
      } catch {
      }
    }
    async function R() {
      try {
        T.value = await H("stats", {});
      } catch {
      }
    }
    async function ne() {
      if (!x.value.path.trim()) {
        h.warning("请输入目录路径");
        return;
      }
      Z.value = !0;
      try {
        const l = await H("addDir", { path: x.value.path, name: x.value.name });
        $.value = !1, x.value = { path: "", name: "" }, await O(), await R(), l.warn ? A.value = l.warn : h.success("目录已添加，请点击目录右侧刷新按钮更新索引");
      } catch {
      } finally {
        Z.value = !1;
      }
    }
    async function oe(l) {
      try {
        await Te.confirm(
          `确认删除目录"${l.name}"及其文件索引？此操作不可撤销。`,
          "删除确认",
          { type: "warning", confirmButtonText: "删除", cancelButtonText: "取消" }
        );
      } catch {
        return;
      }
      try {
        await H("removeDir", { id: l.id }), await O(), await R(), y(), h.success("已删除");
      } catch {
      }
    }
    async function se(l) {
      P.value = l.id, V.value = `正在扫描"${l.name}"，请稍候…`, z.value = 0, B.value = "";
      try {
        const e = await i.api.task.submit({
          taskType: "file-search-scan",
          name: "扫描目录：" + l.name,
          payload: { id: l.id }
        });
        B.value = e.taskId, await re(e.taskId), V.value = "", await O(), await R(), y();
      } catch {
      } finally {
        P.value = "", V.value = "", z.value = 0, B.value = "", u == null || u(), u = null;
      }
    }
    async function re(l) {
      return new Promise((e, g) => {
        let M = !1, E = null, D = null;
        const f = () => {
          u == null || u(), u = null, E && clearInterval(E), D && clearTimeout(D);
        }, w = (s, c) => {
          M || (M = !0, f(), s ? e() : g(c ?? new Error("扫描失败")));
        }, j = (s) => {
          var c;
          s.progressPercent != null && (z.value = Math.max(0, Math.min(100, s.progressPercent)), V.value = s.progressMessage || `正在扫描（${z.value}%）…`), s.status === "SUCCESS" ? (h.success(`扫描完成，共发现 ${((c = s.summary) == null ? void 0 : c.count) ?? 0} 个文件`), w(!0)) : s.status === "FAILED" ? (h.error("扫描失败：" + (s.errorMessage || "未知错误")), w(!1, new Error(s.errorMessage || "扫描失败"))) : s.status === "CANCELLED" && (h.warning("扫描已取消"), w(!1, new Error("扫描已取消")));
        };
        u == null || u(), u = i.api.task.subscribe(l, {
          onProgress: (s) => {
            z.value = Math.max(0, Math.min(100, s.percent ?? 0)), V.value = s.message || `正在扫描（${z.value}%）…`;
          },
          onCompleted: (s, c) => {
            z.value = 100, h.success(`扫描完成，共发现 ${(c == null ? void 0 : c.count) ?? 0} 个文件`), w(!0);
          },
          onFailed: (s) => {
            h.error("扫描失败：" + (s || "未知错误")), w(!1, new Error(s || "扫描失败"));
          },
          onCancelled: () => {
            h.warning("扫描已取消"), w(!1, new Error("扫描已取消"));
          }
        });
        const U = async () => {
          try {
            j(await i.api.task.get(l));
          } catch {
          }
        };
        U(), E = setInterval(U, 3e3), D = setTimeout(() => {
          h.warning("扫描超时，请稍后手动刷新"), w(!1, new Error("扫描超时"));
        }, 5 * 60 * 1e3);
      });
    }
    async function ie() {
      B.value && (await i.api.task.cancel(B.value), V.value = "正在取消扫描…");
    }
    function ue() {
      I && clearTimeout(I), I = setTimeout(() => {
        b.value = 1, y();
      }, 300);
    }
    async function y() {
      K.value = !0;
      try {
        const l = await H("search", {
          keyword: N.value,
          ext: W.value,
          page: b.value,
          pageSize: q.value
        });
        J.value = l.list ?? [], Q.value = l.total ?? 0;
      } catch {
      } finally {
        K.value = !1;
      }
    }
    async function ce(l) {
      try {
        await H("openFile", { path: l.fullPath });
      } catch {
      }
    }
    function H(l, e) {
      return i.api.plugin.callSync(l, e);
    }
    function de(l) {
      return l ? l < 1024 ? l + " B" : l < 1024 * 1024 ? (l / 1024).toFixed(1) + " KB" : (l / 1024 / 1024).toFixed(1) + " MB" : "-";
    }
    function pe(l) {
      return l ? l.replace("T", " ").replace(/\.\d+Z$/, "").substring(0, 16) : "-";
    }
    function ve(l) {
      return l ? l.substring(0, 16) : "";
    }
    function me(l) {
      const e = (l || "").toLowerCase();
      return [".doc", ".docx", ".wps"].includes(e) ? "ext-word" : [".xls", ".xlsx", ".et"].includes(e) ? "ext-excel" : [".ppt", ".pptx", ".dps"].includes(e) ? "ext-ppt" : "ext-other";
    }
    return (l, e) => {
      const g = d("el-button"), M = d("el-tooltip"), E = d("el-icon"), D = d("el-input"), f = d("el-option"), w = d("el-option-group"), j = d("el-select"), U = d("el-progress"), s = d("el-alert"), c = d("el-table-column"), fe = d("el-table"), _e = d("el-pagination"), Y = d("el-form-item"), we = d("el-form"), ge = d("el-dialog"), he = Ve("loading");
      return p(), _("div", We, [
        o("div", Ke, [
          o("div", Oe, [
            e[15] || (e[15] = o("span", { class: "sidebar-title" }, "检索目录", -1)),
            t(M, {
              content: "添加目录",
              placement: "right"
            }, {
              default: n(() => [
                t(g, {
                  type: "primary",
                  size: "small",
                  icon: k(Ie),
                  onClick: e[0] || (e[0] = (a) => $.value = !0)
                }, null, 8, ["icon"])
              ]),
              _: 1
            })
          ]),
          o("div", Re, [
            (p(!0), _(ze, null, be(v.value, (a) => (p(), _("div", {
              key: a.id,
              class: "dir-item"
            }, [
              t(E, { class: "dir-icon" }, {
                default: n(() => [
                  t(k(Pe))
                ]),
                _: 1
              }),
              o("div", Ue, [
                o("div", {
                  class: "dir-name",
                  title: a.path
                }, C(a.name), 9, qe),
                o("div", Ze, C(a.lastScan ? "已扫描 " + ve(a.lastScan) : "尚未扫描"), 1)
              ]),
              o("div", {
                class: "dir-actions",
                onClick: e[1] || (e[1] = ke(() => {
                }, ["stop"]))
              }, [
                t(M, {
                  content: "更新索引",
                  placement: "top"
                }, {
                  default: n(() => [
                    t(g, {
                      size: "small",
                      text: "",
                      type: "primary",
                      icon: k(Ae),
                      loading: P.value === a.id,
                      onClick: (ee) => se(a)
                    }, null, 8, ["icon", "loading", "onClick"])
                  ]),
                  _: 2
                }, 1024),
                t(M, {
                  content: "删除目录",
                  placement: "top"
                }, {
                  default: n(() => [
                    t(g, {
                      size: "small",
                      text: "",
                      type: "danger",
                      icon: k(He),
                      onClick: (ee) => oe(a)
                    }, null, 8, ["icon", "onClick"])
                  ]),
                  _: 2
                }, 1024)
              ])
            ]))), 128)),
            v.value.length === 0 ? (p(), _("div", je, [
              t(E, null, {
                default: n(() => [
                  t(k(te))
                ]),
                _: 1
              }),
              e[16] || (e[16] = o("p", null, "点击 + 添加检索目录", -1))
            ])) : L("", !0)
          ]),
          T.value ? (p(), _("div", Ge, C(T.value.totalDirs) + " 个目录 · " + C(T.value.totalFiles) + " 个文件 ", 1)) : L("", !0)
        ]),
        o("div", Je, [
          o("div", Qe, [
            t(D, {
              modelValue: N.value,
              "onUpdate:modelValue": e[2] || (e[2] = (a) => N.value = a),
              placeholder: "输入文件名关键字模糊搜索，为空则显示全部",
              clearable: "",
              size: "large",
              "prefix-icon": k(le),
              onInput: ue,
              onClear: e[3] || (e[3] = () => {
                b.value = 1, y();
              })
            }, null, 8, ["modelValue", "prefix-icon"]),
            t(j, {
              modelValue: W.value,
              "onUpdate:modelValue": e[4] || (e[4] = (a) => W.value = a),
              placeholder: "全部类型",
              clearable: "",
              style: { width: "150px" },
              onChange: e[5] || (e[5] = () => {
                b.value = 1, y();
              })
            }, {
              default: n(() => [
                t(f, {
                  label: "全部类型",
                  value: ""
                }),
                t(w, { label: "Word" }, {
                  default: n(() => [
                    t(f, {
                      label: ".docx",
                      value: ".docx"
                    }),
                    t(f, {
                      label: ".doc",
                      value: ".doc"
                    }),
                    t(f, {
                      label: ".wps",
                      value: ".wps"
                    })
                  ]),
                  _: 1
                }),
                t(w, { label: "Excel" }, {
                  default: n(() => [
                    t(f, {
                      label: ".xlsx",
                      value: ".xlsx"
                    }),
                    t(f, {
                      label: ".xls",
                      value: ".xls"
                    }),
                    t(f, {
                      label: ".et",
                      value: ".et"
                    })
                  ]),
                  _: 1
                }),
                t(w, { label: "PPT" }, {
                  default: n(() => [
                    t(f, {
                      label: ".pptx",
                      value: ".pptx"
                    }),
                    t(f, {
                      label: ".ppt",
                      value: ".ppt"
                    }),
                    t(f, {
                      label: ".dps",
                      value: ".dps"
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue"]),
            t(g, {
              type: "primary",
              icon: k(le),
              loading: K.value,
              onClick: e[6] || (e[6] = () => {
                b.value = 1, y();
              })
            }, {
              default: n(() => [...e[17] || (e[17] = [
                F(" 搜索 ", -1)
              ])]),
              _: 1
            }, 8, ["icon", "loading"])
          ]),
          V.value ? (p(), _("div", Xe, [
            o("div", Ye, [
              o("div", et, C(V.value), 1),
              t(U, {
                percentage: z.value,
                "stroke-width": 8
              }, null, 8, ["percentage"])
            ]),
            B.value ? (p(), G(g, {
              key: 0,
              size: "small",
              type: "warning",
              onClick: ie
            }, {
              default: n(() => [...e[18] || (e[18] = [
                F(" 取消扫描 ", -1)
              ])]),
              _: 1
            })) : L("", !0)
          ])) : L("", !0),
          A.value ? (p(), G(s, {
            key: 1,
            title: A.value,
            type: "warning",
            "show-icon": "",
            closable: !0,
            onClose: e[7] || (e[7] = (a) => A.value = ""),
            style: { "margin-bottom": "0" }
          }, null, 8, ["title"])) : L("", !0),
          Se((p(), G(fe, {
            data: J.value,
            stripe: "",
            border: "",
            style: { width: "100%", flex: "1", "min-height": "0" },
            "empty-text": ae.value
          }, {
            default: n(() => [
              t(c, {
                label: "类型",
                width: "64",
                align: "center"
              }, {
                default: n(({ row: a }) => [
                  o("span", {
                    class: Me([me(a.ext), "ext-badge"])
                  }, C(a.ext), 3)
                ]),
                _: 1
              }),
              t(c, {
                prop: "name",
                label: "文件名",
                "min-width": "220",
                "show-overflow-tooltip": ""
              }),
              t(c, {
                prop: "fullPath",
                label: "文件路径",
                "min-width": "340",
                "show-overflow-tooltip": ""
              }, {
                default: n(({ row: a }) => [
                  o("span", tt, C(a.fullPath), 1)
                ]),
                _: 1
              }),
              t(c, {
                label: "大小",
                width: "90",
                align: "right"
              }, {
                default: n(({ row: a }) => [
                  F(C(de(a.fileSize)), 1)
                ]),
                _: 1
              }),
              t(c, {
                label: "修改时间",
                width: "160",
                "show-overflow-tooltip": ""
              }, {
                default: n(({ row: a }) => [
                  F(C(pe(a.modified)), 1)
                ]),
                _: 1
              }),
              t(c, {
                label: "操作",
                width: "80",
                align: "center",
                fixed: "right"
              }, {
                default: n(({ row: a }) => [
                  t(M, {
                    content: "在文件管理器中定位",
                    placement: "top"
                  }, {
                    default: n(() => [
                      t(g, {
                        size: "small",
                        text: "",
                        type: "primary",
                        icon: k(te),
                        onClick: (ee) => ce(a)
                      }, null, 8, ["icon", "onClick"])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data", "empty-text"])), [
            [he, K.value]
          ]),
          o("div", lt, [
            t(_e, {
              "current-page": b.value,
              "onUpdate:currentPage": e[8] || (e[8] = (a) => b.value = a),
              "page-size": q.value,
              "onUpdate:pageSize": e[9] || (e[9] = (a) => q.value = a),
              total: Q.value,
              "page-sizes": [20, 50, 100],
              layout: "total, sizes, prev, pager, next",
              onCurrentChange: y,
              onSizeChange: e[10] || (e[10] = () => {
                b.value = 1, y();
              })
            }, null, 8, ["current-page", "page-size", "total"])
          ])
        ]),
        t(ge, {
          modelValue: $.value,
          "onUpdate:modelValue": e[14] || (e[14] = (a) => $.value = a),
          title: "添加检索目录",
          width: "500px",
          "close-on-click-modal": !1
        }, {
          footer: n(() => [
            t(g, {
              onClick: e[13] || (e[13] = (a) => $.value = !1)
            }, {
              default: n(() => [...e[19] || (e[19] = [
                F("取消", -1)
              ])]),
              _: 1
            }),
            t(g, {
              type: "primary",
              loading: Z.value,
              onClick: ne
            }, {
              default: n(() => [...e[20] || (e[20] = [
                F("添加", -1)
              ])]),
              _: 1
            }, 8, ["loading"])
          ]),
          default: n(() => [
            t(we, {
              model: x.value,
              "label-width": "80px"
            }, {
              default: n(() => [
                t(Y, {
                  label: "目录路径",
                  required: ""
                }, {
                  default: n(() => [
                    t(D, {
                      modelValue: x.value.path,
                      "onUpdate:modelValue": e[11] || (e[11] = (a) => x.value.path = a),
                      placeholder: "Windows 示例：D:\\工作文档\\项目资料"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                t(Y, { label: "显示名称" }, {
                  default: n(() => [
                    t(D, {
                      modelValue: x.value.name,
                      "onUpdate:modelValue": e[12] || (e[12] = (a) => x.value.name = a),
                      placeholder: "留空则使用路径作为名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
}), nt = (m, i) => {
  const v = m.__vccOpts || m;
  for (const [T, P] of i)
    v[T] = P;
  return v;
}, ot = /* @__PURE__ */ nt(at, [["__scopeId", "data-v-6094ecfa"]]);
function it(m, i) {
  return S({
    render() {
      return De(ot, { api: m, toolId: i });
    }
  });
}
export {
  it as createView
};
