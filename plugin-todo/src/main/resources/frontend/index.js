import { ref as Ie, computed as Ye, defineComponent as Kr, openBlock as Y, createElementBlock as Q, normalizeClass as hr, createElementVNode as X, withModifiers as kt, toDisplayString as _e, normalizeStyle as Da, createCommentVNode as De, Fragment as Ne, renderList as Ze, createTextVNode as Ce, unref as le, reactive as bs, watch as Ba, nextTick as ti, createBlock as Lt, withCtx as ge, createVNode as ve, withKeys as ba, onMounted as s0, h as Us } from "vue";
import { ElDialog as vn, ElForm as ri, ElFormItem as ur, ElInput as Wt, ElDatePicker as Oa, ElSelect as l0, ElOption as f0, ElButton as We, ElSwitch as Ws, ElRadioGroup as $s, ElRadio as o0, ElMessageBox as c0, ElMessage as Ta } from "element-plus";
const or = {
  tasks: "todo_tasks",
  projects: "todo_projects",
  memory: "todo_stakeholder_memory",
  groups: "todo_stakeholder_groups"
};
function nt() {
  const e = /* @__PURE__ */ new Date();
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function Ft() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
function Vr() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}
function Nn(e, r) {
  try {
    const t = localStorage.getItem(e);
    return t ? JSON.parse(t) : r;
  } catch {
    return r;
  }
}
function Pn(e, r) {
  localStorage.setItem(e, JSON.stringify(r));
}
function u0(e) {
  const r = /* @__PURE__ */ new Date();
  return r.setDate(r.getDate() + e), `${r.getFullYear()}-${String(r.getMonth() + 1).padStart(2, "0")}-${String(r.getDate()).padStart(2, "0")}`;
}
function Ia(e) {
  if (!e) return "";
  const [r, t, n] = e.split("-");
  return `${parseInt(t)}/${parseInt(n)}`;
}
function h0(e, r) {
  return Math.round((new Date(e).getTime() - new Date(r).getTime()) / 864e5);
}
function d0(e) {
  const r = new Date(e), t = r.getDay() || 7;
  return r.setDate(r.getDate() - t + 1), `${r.getFullYear()}-${String(r.getMonth() + 1).padStart(2, "0")}-${String(r.getDate()).padStart(2, "0")}`;
}
function Ra(e) {
  const r = new Date(e);
  return r.setDate(r.getDate() + 6), `${r.getFullYear()}-${String(r.getMonth() + 1).padStart(2, "0")}-${String(r.getDate()).padStart(2, "0")}`;
}
function Vs() {
  const e = Ie(Nn(or.tasks, [])), r = Ie(Nn(or.projects, [])), t = Ie(Nn(or.memory, [])), n = Ie(Nn(or.groups, []));
  function a() {
    Pn(or.tasks, e.value);
  }
  function i() {
    Pn(or.projects, r.value);
  }
  function s() {
    Pn(or.memory, t.value);
  }
  function l() {
    Pn(or.groups, n.value);
  }
  function f(H, m) {
    const k = { id: Vr(), name: H, members: m, createdAt: Ft() };
    return n.value.push(k), l(), k;
  }
  function o(H, m, k) {
    const A = n.value.find((F) => F.id === H);
    A && (A.name = m, A.members = k, l());
  }
  function c(H) {
    n.value = n.value.filter((m) => m.id !== H), l();
  }
  function x() {
    const H = nt();
    let m = !1;
    const k = Ft();
    e.value.filter((A) => A.status === "todo" && !A.parentId && A.targetDate < H).forEach((A) => {
      A.targetDate = H, A.rolloverCount += 1, A.updatedAt = k, m = !0, A.isSplit && e.value.filter((F) => F.parentId === A.id && F.status === "todo").forEach((F) => {
        F.targetDate = H, F.updatedAt = k;
      });
    }), m && a();
  }
  function p(H) {
    const m = nt(), k = Ft(), A = {
      id: Vr(),
      title: H.title,
      description: H.description,
      parentId: H.parentId,
      status: "todo",
      isSplit: !1,
      startDate: H.startDate,
      targetDate: H.targetDate ?? m,
      project: H.project,
      stakeholders: H.stakeholders ?? [],
      createdAt: k,
      updatedAt: k,
      originalTargetDate: H.targetDate ?? m,
      rolloverCount: 0,
      sortIndex: H.sortIndex ?? Date.now()
    };
    return e.value.push(A), a(), A;
  }
  function v(H, m) {
    const k = e.value.find((A) => A.id === H);
    k && (Object.assign(k, m, { updatedAt: Ft() }), a());
  }
  function T(H) {
    const m = /* @__PURE__ */ new Set([H, ...e.value.filter((A) => A.parentId === H).map((A) => A.id)]);
    e.value = e.value.filter((A) => !m.has(A.id));
    const k = e.value.find((A) => {
      var F;
      return A.id === ((F = e.value.find((B) => B.id === H)) == null ? void 0 : F.parentId);
    });
    k && D(k.id), a();
  }
  function u(H) {
    const m = e.value.find((A) => A.id === H);
    if (!m) return;
    const k = Ft();
    m.isSplit && e.value.filter((A) => A.parentId === H).forEach((A) => {
      A.status === "todo" && (A.status = "completed", A.completedAt = k, A.updatedAt = k);
    }), m.status = "completed", m.completedAt = k, m.updatedAt = k, a();
  }
  function h(H) {
    const m = e.value.find((F) => F.id === H);
    if (!m) return;
    const k = nt(), A = Ft();
    if (m.status = "todo", m.completedAt = void 0, m.updatedAt = A, m.targetDate < k && (m.targetDate = k), m.parentId) {
      const F = e.value.find((B) => B.id === m.parentId);
      F && F.status === "completed" && (F.status = "todo", F.completedAt = void 0, F.updatedAt = A, F.targetDate < k && (F.targetDate = k));
    }
    a();
  }
  function y(H) {
    const m = e.value.find((A) => A.id === H);
    if (!m) return;
    const k = Ft();
    m.status = "completed", m.completedAt = k, m.updatedAt = k, m.parentId && D(m.parentId), a();
  }
  function C(H) {
    h(H);
  }
  function D(H) {
    const m = e.value.find((B) => B.id === H);
    if (!m) return;
    const k = e.value.filter((B) => B.parentId === H);
    if (k.length === 0) return;
    const A = Ft(), F = k.every((B) => B.status === "completed");
    F && m.status === "todo" ? (m.status = "completed", m.completedAt = A, m.updatedAt = A) : !F && m.status === "completed" && (m.status = "todo", m.completedAt = void 0, m.updatedAt = A);
  }
  function L(H, m) {
    const k = e.value.find((F) => F.id === H);
    if (!k || k.parentId) return;
    const A = Ft();
    m.filter((F) => F.trim()).forEach((F, B) => {
      const ie = {
        id: Vr(),
        title: F.trim(),
        parentId: H,
        status: "todo",
        isSplit: !1,
        targetDate: k.targetDate,
        project: k.project,
        stakeholders: k.stakeholders ? JSON.parse(JSON.stringify(k.stakeholders)) : [],
        createdAt: A,
        updatedAt: A,
        originalTargetDate: k.targetDate,
        rolloverCount: 0,
        sortIndex: Date.now() + B
      };
      e.value.push(ie);
    }), k.isSplit = !0, k.updatedAt = A, a();
  }
  function q(H) {
    const m = e.value.find((F) => F.id === H);
    if (!m) return;
    const k = e.value.filter((F) => F.parentId === H), A = Ft();
    k.forEach((F) => {
      F.parentId = void 0, F.updatedAt = A;
    }), m.isSplit = !1, m.updatedAt = A, a();
  }
  function se(H, m = "#4A90D9") {
    const k = r.value.find((F) => F.name === H);
    if (k) return k;
    const A = {
      id: Vr(),
      name: H,
      color: m,
      sortIndex: r.value.length,
      createdAt: Ft()
    };
    return r.value.push(A), i(), A;
  }
  function O(H) {
    r.value = r.value.filter((m) => m.id !== H), i();
  }
  const V = Ye(() => {
    const H = e.value.map((k) => k.project).filter(Boolean), m = r.value.map((k) => k.name);
    return [.../* @__PURE__ */ new Set([...m, ...H])].sort();
  });
  function M(H, m) {
    const k = t.value.find((A) => A.name === H);
    k ? (k.lastRole = m, k.usedCount += 1) : t.value.push({ name: H, lastRole: m, usedCount: 1 }), s();
  }
  function G(H) {
    return !!H.startDate && H.startDate > nt();
  }
  function z(H) {
    return e.value.filter((m) => !m.parentId && m.targetDate === H && !G(m)).sort((m, k) => m.status !== k.status ? m.status === "todo" ? -1 : 1 : m.sortIndex - k.sortIndex);
  }
  function K(H) {
    const m = e.value.filter((F) => !F.parentId && F.targetDate === H), k = e.value.filter(
      (F) => {
        var B;
        return !F.parentId && F.status === "completed" && ((B = F.completedAt) == null ? void 0 : B.startsWith(H)) && F.targetDate !== H;
      }
    );
    return [.../* @__PURE__ */ new Set([...m, ...k])].sort((F, B) => F.status !== B.status ? F.status === "todo" ? -1 : 1 : F.sortIndex - B.sortIndex);
  }
  function fe(H) {
    return e.value.filter((m) => m.parentId === H).sort((m, k) => m.sortIndex - k.sortIndex);
  }
  function pe() {
    return e.value.filter((H) => !H.parentId && H.status === "todo" && !G(H)).sort((H, m) => H.targetDate < m.targetDate ? -1 : H.targetDate > m.targetDate ? 1 : H.sortIndex - m.sortIndex);
  }
  function Ee() {
    return e.value.filter((H) => !H.parentId && H.status === "todo" && G(H)).sort((H, m) => H.startDate < m.startDate ? -1 : H.startDate > m.startDate ? 1 : H.sortIndex - m.sortIndex);
  }
  function Ge(H) {
    if (!H.trim()) return [];
    const m = H.toLowerCase();
    return e.value.filter(
      (k) => {
        var A;
        return k.title.toLowerCase().includes(m) || ((A = k.description) == null ? void 0 : A.toLowerCase().includes(m));
      }
    ).sort((k, A) => A.createdAt.localeCompare(k.createdAt));
  }
  function Le(H) {
    return e.value.filter((m) => !m.parentId && m.project === H).sort((m, k) => m.status !== k.status ? m.status === "todo" ? -1 : 1 : m.targetDate.localeCompare(k.targetDate));
  }
  function lt(H) {
    const m = Ra(H), k = Ft(), A = e.value.filter(
      (me) => !me.parentId && me.createdAt >= H && me.createdAt <= m + "T23:59:59"
    ), F = e.value.filter(
      (me) => !me.parentId && me.status === "completed" && me.completedAt && me.completedAt >= H && me.completedAt <= m + "T23:59:59"
    ), B = e.value.filter(
      (me) => !me.parentId && me.rolloverCount > 0 && me.originalTargetDate >= H && me.originalTargetDate <= m
    ), ie = nt(), xe = e.value.filter(
      (me) => !me.parentId && me.status === "todo" && me.targetDate < ie
    ), de = A.length > 0 ? Math.round(F.filter((me) => A.some((Te) => Te.id === me.id)).length / A.length * 1e3) / 10 : 0, ne = [];
    for (let me = 0; me < 7; me++) {
      const Te = new Date(H);
      Te.setDate(Te.getDate() + me);
      const ze = `${Te.getFullYear()}-${String(Te.getMonth() + 1).padStart(2, "0")}-${String(Te.getDate()).padStart(2, "0")}`;
      ne.push({
        date: ze,
        created: e.value.filter((ke) => !ke.parentId && ke.createdAt.startsWith(ze)).length,
        completed: e.value.filter((ke) => {
          var ue;
          return !ke.parentId && ke.status === "completed" && ((ue = ke.completedAt) == null ? void 0 : ue.startsWith(ze));
        }).length,
        rollover: e.value.filter((ke) => !ke.parentId && ke.status === "todo" && ke.originalTargetDate === ze && ke.rolloverCount > 0).length
      });
    }
    const Fe = /* @__PURE__ */ new Map();
    A.forEach((me) => {
      const Te = me.project || "未分类", ze = Fe.get(Te) ?? { created: 0, completed: 0 };
      ze.created++, Fe.set(Te, ze);
    }), F.forEach((me) => {
      const Te = me.project || "未分类", ze = Fe.get(Te) ?? { created: 0, completed: 0 };
      ze.completed++, Fe.set(Te, ze);
    });
    const Se = [...Fe.entries()].map(([me, Te]) => ({ name: me, ...Te }));
    return {
      weekStart: H,
      weekEnd: m,
      generatedAt: k,
      totalCreated: A.length,
      totalCompleted: F.length,
      totalRollover: B.length,
      totalOverdue: xe.length,
      completionRate: de,
      dailyStats: ne,
      overdueTasks: xe,
      projectStats: Se
    };
  }
  function Ve() {
    return JSON.stringify({
      exportVersion: "3.0",
      exportedAt: Ft(),
      tasks: e.value,
      projects: r.value
    }, null, 2);
  }
  function rt(H, m) {
    const k = JSON.parse(H);
    if (!k.tasks || !Array.isArray(k.tasks)) throw new Error("无效的备份文件：缺少 tasks 数组");
    for (const B of k.tasks) {
      if (!B.id || !B.title || !B.targetDate) throw new Error(`任务数据不完整: ${JSON.stringify(B).slice(0, 100)}`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(B.targetDate)) throw new Error(`日期格式错误: ${B.targetDate}`);
    }
    let A = 0, F = 0;
    if (m === "overwrite")
      e.value = k.tasks, r.value = k.projects ?? [], A = k.tasks.length;
    else {
      const B = new Set(e.value.map((ie) => ie.id));
      for (const ie of k.tasks) {
        if (B.has(ie.id)) {
          F++;
          continue;
        }
        e.value.push(ie), A++;
      }
      for (const ie of k.projects ?? [])
        r.value.find((xe) => xe.id === ie.id) || r.value.push(ie);
    }
    return a(), i(), { imported: A, skipped: F };
  }
  return {
    tasks: e,
    projects: r,
    memory: t,
    groups: n,
    allProjectNames: V,
    addGroup: f,
    updateGroup: o,
    deleteGroup: c,
    checkRollover: x,
    createTask: p,
    updateTask: v,
    deleteTask: T,
    completeTask: u,
    uncompleteTask: h,
    completeSubTask: y,
    uncompleteSubTask: C,
    splitTask: L,
    unsplitTask: q,
    addProject: se,
    deleteProject: O,
    rememberStakeholder: M,
    getTasksForDate: z,
    getTasksForDateWithCompleted: K,
    getChildren: fe,
    getAllPending: pe,
    getPendingActivation: Ee,
    searchTasks: Ge,
    getTasksByProject: Le,
    generateWeeklyReport: lt,
    exportJson: Ve,
    importJson: rt
  };
}
const Hs = { class: "task-item__main" }, Gs = {
  key: 0,
  viewBox: "0 0 16 16",
  class: "check-icon check-icon--done"
}, js = {
  key: 1,
  viewBox: "0 0 16 16",
  class: "check-icon"
}, Xs = { class: "task-item__meta" }, zs = {
  key: 0,
  class: "task-item__inactive-badge"
}, Ys = {
  key: 2,
  class: "task-item__completed-badge"
}, Ks = { class: "task-item__actions" }, Js = {
  key: 0,
  class: "task-item__sh-list"
}, Zs = { key: 0 }, qs = {
  key: 1,
  class: "task-item__sh-remark"
}, Qs = {
  key: 1,
  class: "task-item__sh-list"
}, el = { key: 0 }, tl = {
  key: 1,
  class: "task-item__sh-remark"
}, rl = {
  key: 2,
  class: "task-item__children"
}, nl = { class: "child-connector" }, al = ["onClick"], il = {
  key: 0,
  viewBox: "0 0 16 16",
  class: "check-icon check-icon--done check-icon--sm"
}, sl = {
  key: 1,
  viewBox: "0 0 16 16",
  class: "check-icon check-icon--sm"
}, ll = {
  key: 0,
  class: "task-item__completed-badge",
  style: { "font-size": "12px" }
}, fl = {
  class: "task-item__actions",
  style: { opacity: "0.6" }
}, ol = ["onClick"], cl = ["onClick"], ul = {
  key: 3,
  class: "task-item__rollover"
}, hl = /* @__PURE__ */ Kr({
  __name: "TaskItem",
  props: {
    task: {},
    children: {},
    projectColors: {},
    readonly: { type: Boolean }
  },
  emits: ["toggle", "toggleChild", "edit", "split", "unsplit", "delete"],
  setup(e, { emit: r }) {
    const t = e, n = r, a = Ie(!1), i = Ye(() => t.task.stakeholders ?? []), s = nt(), l = Ye(
      () => !!t.task.startDate && t.task.startDate > s
    ), f = Ye(
      () => t.task.status === "todo" && t.task.targetDate < s && !l.value
    ), o = Ye(() => {
      if (t.task.status !== "todo") return !1;
      const u = h0(t.task.targetDate, s);
      return u >= 0 && u <= 2;
    }), c = Ye(() => {
      if (!t.task.targetDate) return "";
      const u = Ia(t.task.targetDate), h = h0(t.task.targetDate, s);
      return t.task.targetDate === s ? `${u} 今日` : h < 0 ? `${u} 逾期${-h}天` : h === 1 ? `${u} 明天` : `${u} 剩${h}天`;
    }), x = Ye(() => f.value ? "date-badge--overdue" : o.value ? "date-badge--warning" : ""), p = Ye(() => t.projectColors[t.task.project ?? ""] ?? "#e8f0fe");
    function v() {
      n("toggle", t.task);
    }
    function T(u) {
      n("toggleChild", u);
    }
    return (u, h) => (Y(), Q("div", {
      class: hr(["task-item", [`task-item--${e.task.status}`, { "task-item--overdue": f.value, "task-item--warning": o.value, "task-item--inactive": l.value }]])
    }, [
      X("div", Hs, [
        X("span", {
          class: "task-item__check",
          onClick: kt(v, ["stop"])
        }, [
          e.task.status === "completed" ? (Y(), Q("svg", Gs, [...h[6] || (h[6] = [
            X("path", {
              d: "M13 3L6 11L3 8",
              stroke: "currentColor",
              "stroke-width": "2",
              fill: "none",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }, null, -1)
          ])])) : (Y(), Q("svg", js, [...h[7] || (h[7] = [
            X("rect", {
              x: "2",
              y: "2",
              width: "12",
              height: "12",
              rx: "3",
              stroke: "currentColor",
              "stroke-width": "1.5",
              fill: "none"
            }, null, -1)
          ])]))
        ]),
        X("span", {
          class: "task-item__title",
          onDblclick: h[0] || (h[0] = (y) => u.$emit("edit", e.task))
        }, _e(e.task.title), 33),
        X("div", Xs, [
          l.value ? (Y(), Q("span", zs, "⏳ 待生效 " + _e(e.task.startDate), 1)) : e.task.status === "todo" ? (Y(), Q("span", {
            key: 1,
            class: hr(["task-item__date", x.value])
          }, " 📅 " + _e(c.value), 3)) : (Y(), Q("span", Ys, "✅")),
          e.task.project ? (Y(), Q("span", {
            key: 3,
            class: "task-item__project",
            style: Da({ background: p.value })
          }, _e(e.task.project), 5)) : De("", !0),
          i.value.length >= 3 ? (Y(), Q("span", {
            key: 4,
            class: "task-item__stakeholders",
            onClick: h[1] || (h[1] = kt((y) => a.value = !a.value, ["stop"]))
          }, " 👤 " + _e(i.value.length) + "人 ", 1)) : De("", !0),
          X("span", Ks, [
            X("button", {
              class: "task-btn",
              onClick: h[2] || (h[2] = kt((y) => u.$emit("edit", e.task), ["stop"])),
              title: "编辑"
            }, "✏️"),
            !e.task.parentId && !e.task.isSplit && e.readonly === !1 ? (Y(), Q("button", {
              key: 0,
              class: "task-btn",
              onClick: h[3] || (h[3] = kt((y) => u.$emit("split", e.task), ["stop"])),
              title: "拆分"
            }, "✂️")) : De("", !0),
            e.task.isSplit && e.readonly === !1 ? (Y(), Q("button", {
              key: 1,
              class: "task-btn",
              onClick: h[4] || (h[4] = kt((y) => u.$emit("unsplit", e.task), ["stop"])),
              title: "取消拆分"
            }, "🔀")) : De("", !0),
            X("button", {
              class: "task-btn",
              onClick: h[5] || (h[5] = kt((y) => u.$emit("delete", e.task), ["stop"])),
              title: "删除"
            }, "🗑️")
          ])
        ])
      ]),
      i.value.length > 0 && i.value.length <= 2 ? (Y(), Q("div", Js, [
        (Y(!0), Q(Ne, null, Ze(i.value, (y) => (Y(), Q("div", {
          key: y.id,
          class: "task-item__sh"
        }, [
          Ce(" 👤 " + _e(y.name), 1),
          y.role ? (Y(), Q("span", Zs, "（" + _e(y.role) + "）", 1)) : De("", !0),
          y.remark ? (Y(), Q("span", qs, _e(y.remark), 1)) : De("", !0)
        ]))), 128))
      ])) : De("", !0),
      i.value.length >= 3 && a.value ? (Y(), Q("div", Qs, [
        (Y(!0), Q(Ne, null, Ze(i.value, (y) => (Y(), Q("div", {
          key: y.id,
          class: "task-item__sh"
        }, [
          Ce(" 👤 " + _e(y.name), 1),
          y.role ? (Y(), Q("span", el, "（" + _e(y.role) + "）", 1)) : De("", !0),
          y.remark ? (Y(), Q("span", tl, _e(y.remark), 1)) : De("", !0)
        ]))), 128))
      ])) : De("", !0),
      e.task.isSplit && e.children.length > 0 ? (Y(), Q("div", rl, [
        (Y(!0), Q(Ne, null, Ze(e.children, (y, C) => (Y(), Q("div", {
          key: y.id,
          class: hr(["task-item__child", { "task-item__child--done": y.status === "completed" }])
        }, [
          X("span", nl, _e(C === e.children.length - 1 ? "└" : "├"), 1),
          X("span", {
            class: "task-item__check task-item__check--sm",
            onClick: kt((D) => T(y), ["stop"])
          }, [
            y.status === "completed" ? (Y(), Q("svg", il, [...h[8] || (h[8] = [
              X("path", {
                d: "M13 3L6 11L3 8",
                stroke: "currentColor",
                "stroke-width": "2",
                fill: "none",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              }, null, -1)
            ])])) : (Y(), Q("svg", sl, [...h[9] || (h[9] = [
              X("rect", {
                x: "2",
                y: "2",
                width: "12",
                height: "12",
                rx: "3",
                stroke: "currentColor",
                "stroke-width": "1.5",
                fill: "none"
              }, null, -1)
            ])]))
          ], 8, al),
          X("span", {
            class: hr(["child-title", { "child-title--done": y.status === "completed" }])
          }, _e(y.title), 3),
          y.status === "completed" ? (Y(), Q("span", ll, "✅")) : De("", !0),
          X("span", fl, [
            X("button", {
              class: "task-btn",
              onClick: kt((D) => u.$emit("edit", y), ["stop"]),
              title: "编辑子任务"
            }, "✏️", 8, ol),
            X("button", {
              class: "task-btn",
              onClick: kt((D) => u.$emit("delete", y), ["stop"]),
              title: "删除子任务"
            }, "🗑️", 8, cl)
          ])
        ], 2))), 128))
      ])) : De("", !0),
      e.task.rolloverCount > 0 && e.task.status === "todo" ? (Y(), Q("div", ul, " 原定" + _e(le(Ia)(e.task.originalTargetDate)) + "，已顺延" + _e(e.task.rolloverCount) + "次 ", 1)) : De("", !0)
    ], 2));
  }
}), Sn = (e, r) => {
  const t = e.__vccOpts || e;
  for (const [n, a] of r)
    t[n] = a;
  return t;
}, x0 = /* @__PURE__ */ Sn(hl, [["__scopeId", "data-v-254c497b"]]), dl = { style: { display: "flex", gap: "12px" } }, xl = { style: { width: "100%" } }, vl = {
  key: 0,
  class: "group-quick-add"
}, pl = ["onClick"], ml = {
  key: 0,
  class: "sh-role"
}, gl = {
  key: 1,
  class: "sh-remark"
}, _l = /* @__PURE__ */ Kr({
  __name: "TaskEditDialog",
  props: {
    visible: { type: Boolean },
    task: {},
    defaultDate: {},
    allProjects: {},
    groups: {}
  },
  emits: ["save", "cancel", "delete"],
  setup(e, { emit: r }) {
    const t = e, n = r, a = Ie(), i = Ie(!0), s = Ie(-1), l = ["需求方", "开发", "测试", "审批人", "协作人", "知会人", "其他"], f = bs({
      title: "",
      description: "",
      startDate: "",
      targetDate: nt(),
      project: "",
      stakeholders: []
    });
    Ba(() => t.visible, async (T) => {
      var u;
      T && (s.value = -1, t.task ? (i.value = !1, f.title = t.task.title, f.description = t.task.description ?? "", f.startDate = t.task.startDate ?? "", f.targetDate = t.task.targetDate, f.project = t.task.project ?? "", f.stakeholders = t.task.stakeholders ? JSON.parse(JSON.stringify(t.task.stakeholders)) : []) : (i.value = !0, f.title = "", f.description = "", f.startDate = "", f.targetDate = t.defaultDate ?? nt(), f.project = "", f.stakeholders = []), await ti(), (u = a.value) == null || u.focus());
    });
    function o() {
      s.value >= 0 && c(s.value), f.stakeholders.push({ id: Vr(), name: "", role: "", remark: "", addedAt: (/* @__PURE__ */ new Date()).toISOString() }), s.value = f.stakeholders.length - 1;
    }
    function c(T) {
      f.stakeholders[T].name.trim() || f.stakeholders.splice(T, 1), s.value = -1;
    }
    function x(T) {
      f.stakeholders.splice(T, 1), s.value >= f.stakeholders.length && (s.value = -1);
    }
    function p(T) {
      const u = new Set(f.stakeholders.map((h) => h.name));
      for (const h of T.members)
        h.name && !u.has(h.name) && (f.stakeholders.push({ id: Vr(), name: h.name, role: h.role ?? "", remark: h.remark ?? "", addedAt: (/* @__PURE__ */ new Date()).toISOString() }), u.add(h.name));
    }
    function v() {
      f.title.trim() && n("save", {
        title: f.title.trim(),
        description: f.description.trim() || void 0,
        startDate: f.startDate || void 0,
        targetDate: f.targetDate,
        project: f.project || void 0,
        stakeholders: f.stakeholders.filter((T) => T.name.trim())
      });
    }
    return (T, u) => (Y(), Lt(le(vn), {
      "model-value": e.visible,
      title: i.value ? "新建任务" : "编辑任务",
      width: "600px",
      onClose: u[7] || (u[7] = (h) => T.$emit("cancel")),
      "append-to-body": "",
      "close-on-click-modal": !1
    }, {
      footer: ge(() => [
        ve(le(We), {
          onClick: u[5] || (u[5] = (h) => T.$emit("cancel"))
        }, {
          default: ge(() => [...u[12] || (u[12] = [
            Ce("取消", -1)
          ])]),
          _: 1
        }),
        i.value ? De("", !0) : (Y(), Lt(le(We), {
          key: 0,
          type: "danger",
          plain: "",
          onClick: u[6] || (u[6] = (h) => T.$emit("delete", e.task))
        }, {
          default: ge(() => [...u[13] || (u[13] = [
            Ce("删除", -1)
          ])]),
          _: 1
        })),
        ve(le(We), {
          type: "primary",
          onClick: v,
          disabled: !f.title.trim()
        }, {
          default: ge(() => [...u[14] || (u[14] = [
            Ce("保存", -1)
          ])]),
          _: 1
        }, 8, ["disabled"])
      ]),
      default: ge(() => [
        ve(le(ri), {
          model: f,
          "label-position": "top",
          size: "default"
        }, {
          default: ge(() => [
            ve(le(ur), {
              label: "标题",
              required: ""
            }, {
              default: ge(() => [
                ve(le(Wt), {
                  modelValue: f.title,
                  "onUpdate:modelValue": u[0] || (u[0] = (h) => f.title = h),
                  placeholder: "任务标题（可用 📅5/15 #项目 语法）",
                  clearable: "",
                  ref_key: "titleRef",
                  ref: a,
                  onKeydown: ba(kt(v, ["prevent"]), ["enter"])
                }, null, 8, ["modelValue", "onKeydown"])
              ]),
              _: 1
            }),
            ve(le(ur), { label: "描述" }, {
              default: ge(() => [
                ve(le(Wt), {
                  modelValue: f.description,
                  "onUpdate:modelValue": u[1] || (u[1] = (h) => f.description = h),
                  type: "textarea",
                  rows: 4,
                  placeholder: "补充说明（选填）"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            X("div", dl, [
              ve(le(ur), {
                label: "起始日期",
                style: { flex: "1" }
              }, {
                default: ge(() => [
                  ve(le(Oa), {
                    modelValue: f.startDate,
                    "onUpdate:modelValue": u[2] || (u[2] = (h) => f.startDate = h),
                    type: "date",
                    "value-format": "YYYY-MM-DD",
                    format: "YYYY年M月D日",
                    placeholder: "不限（立即生效）",
                    clearable: "",
                    style: { width: "100%" }
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              ve(le(ur), {
                label: "截止日期",
                style: { flex: "1" }
              }, {
                default: ge(() => [
                  ve(le(Oa), {
                    modelValue: f.targetDate,
                    "onUpdate:modelValue": u[3] || (u[3] = (h) => f.targetDate = h),
                    type: "date",
                    "value-format": "YYYY-MM-DD",
                    format: "YYYY年M月D日",
                    style: { width: "100%" }
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              })
            ]),
            ve(le(ur), { label: "所属项目" }, {
              default: ge(() => [
                ve(le(l0), {
                  modelValue: f.project,
                  "onUpdate:modelValue": u[4] || (u[4] = (h) => f.project = h),
                  clearable: "",
                  filterable: "",
                  "allow-create": "",
                  placeholder: "选择或新建项目",
                  style: { width: "100%" }
                }, {
                  default: ge(() => [
                    (Y(!0), Q(Ne, null, Ze(e.allProjects, (h) => (Y(), Lt(le(f0), {
                      key: h,
                      label: h,
                      value: h
                    }, null, 8, ["label", "value"]))), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            }),
            ve(le(ur), { label: "干系人" }, {
              default: ge(() => [
                X("div", xl, [
                  e.groups && e.groups.length > 0 ? (Y(), Q("div", vl, [
                    u[8] || (u[8] = X("span", { class: "group-quick-add__label" }, "从群组添加：", -1)),
                    (Y(!0), Q(Ne, null, Ze(e.groups, (h) => (Y(), Lt(le(We), {
                      key: h.id,
                      size: "small",
                      onClick: (y) => p(h)
                    }, {
                      default: ge(() => [
                        Ce(_e(h.name) + "（" + _e(h.members.length) + "人）", 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]))), 128))
                  ])) : De("", !0),
                  (Y(!0), Q(Ne, null, Ze(f.stakeholders, (h, y) => (Y(), Q("div", {
                    key: h.id,
                    class: "sh-row"
                  }, [
                    s.value === y ? (Y(), Q(Ne, { key: 0 }, [
                      ve(le(Wt), {
                        modelValue: h.name,
                        "onUpdate:modelValue": (C) => h.name = C,
                        placeholder: "姓名",
                        style: { width: "100px" },
                        size: "small"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      ve(le(l0), {
                        modelValue: h.role,
                        "onUpdate:modelValue": (C) => h.role = C,
                        placeholder: "角色",
                        style: { width: "100px" },
                        size: "small",
                        clearable: "",
                        filterable: "",
                        "allow-create": ""
                      }, {
                        default: ge(() => [
                          (Y(), Q(Ne, null, Ze(l, (C) => ve(le(f0), {
                            key: C,
                            label: C,
                            value: C
                          }, null, 8, ["label", "value"])), 64))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      ve(le(Wt), {
                        modelValue: h.remark,
                        "onUpdate:modelValue": (C) => h.remark = C,
                        placeholder: "备注（选填）",
                        style: { flex: "1" },
                        size: "small"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      ve(le(We), {
                        size: "small",
                        onClick: (C) => c(y)
                      }, {
                        default: ge(() => [...u[9] || (u[9] = [
                          Ce("✓", -1)
                        ])]),
                        _: 1
                      }, 8, ["onClick"])
                    ], 64)) : (Y(), Q(Ne, { key: 1 }, [
                      X("span", {
                        class: "sh-name",
                        onClick: (C) => s.value = y
                      }, "👤 " + _e(h.name), 9, pl),
                      h.role ? (Y(), Q("span", ml, _e(h.role), 1)) : De("", !0),
                      h.remark ? (Y(), Q("span", gl, _e(h.remark), 1)) : De("", !0),
                      ve(le(We), {
                        size: "small",
                        type: "danger",
                        text: "",
                        onClick: (C) => x(y)
                      }, {
                        default: ge(() => [...u[10] || (u[10] = [
                          Ce("×", -1)
                        ])]),
                        _: 1
                      }, 8, ["onClick"])
                    ], 64))
                  ]))), 128)),
                  ve(le(We), {
                    size: "small",
                    onClick: o,
                    style: { "margin-top": "4px" }
                  }, {
                    default: ge(() => [...u[11] || (u[11] = [
                      Ce(" + 添加干系人 ", -1)
                    ])]),
                    _: 1
                  })
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["model"])
      ]),
      _: 1
    }, 8, ["model-value", "title"]));
  }
}), Tl = /* @__PURE__ */ Sn(_l, [["__scopeId", "data-v-83698906"]]), El = { key: 0 }, wl = { class: "split-parent" }, Sl = { class: "split-children" }, Al = { class: "split-index" }, yl = /* @__PURE__ */ Kr({
  __name: "SplitDialog",
  props: {
    visible: { type: Boolean },
    task: {}
  },
  emits: ["confirm", "cancel"],
  setup(e, { emit: r }) {
    const t = e, n = r, a = Ie(["", ""]);
    Ba(() => t.visible, (c) => {
      c && (a.value = ["", ""]);
    });
    const i = Ye(() => a.value.filter((c) => c.trim()));
    function s() {
      a.value.push("");
    }
    function l(c) {
      a.value.splice(c, 1);
    }
    function f(c) {
    }
    function o() {
      !t.task || i.value.length === 0 || n("confirm", t.task.id, a.value);
    }
    return (c, x) => (Y(), Lt(le(vn), {
      "model-value": e.visible,
      title: "拆分任务",
      width: "480px",
      onClose: x[1] || (x[1] = (p) => c.$emit("cancel")),
      "append-to-body": ""
    }, {
      footer: ge(() => [
        ve(le(We), {
          onClick: x[0] || (x[0] = (p) => c.$emit("cancel"))
        }, {
          default: ge(() => [...x[4] || (x[4] = [
            Ce("取消", -1)
          ])]),
          _: 1
        }),
        ve(le(We), {
          type: "primary",
          onClick: o,
          disabled: i.value.length === 0
        }, {
          default: ge(() => [...x[5] || (x[5] = [
            Ce("确认拆分", -1)
          ])]),
          _: 1
        }, 8, ["disabled"])
      ]),
      default: ge(() => [
        e.task ? (Y(), Q("div", El, [
          X("div", wl, "原任务：" + _e(e.task.title), 1),
          X("div", Sl, [
            (Y(!0), Q(Ne, null, Ze(a.value, (p, v) => (Y(), Q("div", {
              key: v,
              class: "split-child-row"
            }, [
              X("span", Al, _e(v + 1), 1),
              ve(le(Wt), {
                modelValue: a.value[v],
                "onUpdate:modelValue": (T) => a.value[v] = T,
                placeholder: "子任务标题",
                size: "small",
                onKeydown: ba(kt((T) => v === a.value.length - 1 ? s() : void 0, ["prevent"]), ["enter"])
              }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown"]),
              a.value.length > 1 ? (Y(), Lt(le(We), {
                key: 0,
                type: "danger",
                text: "",
                size: "small",
                onClick: (T) => l(v)
              }, {
                default: ge(() => [...x[2] || (x[2] = [
                  Ce("×", -1)
                ])]),
                _: 1
              }, 8, ["onClick"])) : De("", !0)
            ]))), 128))
          ]),
          ve(le(We), {
            size: "small",
            onClick: s,
            style: { "margin-top": "8px" }
          }, {
            default: ge(() => [...x[3] || (x[3] = [
              Ce("+ 添加子任务", -1)
            ])]),
            _: 1
          })
        ])) : De("", !0)
      ]),
      _: 1
    }, 8, ["model-value"]));
  }
}), Fl = /* @__PURE__ */ Sn(yl, [["__scopeId", "data-v-70869c50"]]);
/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var Hn = {};
Hn.version = "0.18.5";
var ni = 1252, kl = [874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1e4], ai = function(e) {
  kl.indexOf(e) != -1 && (ni = e);
};
function Cl() {
  ai(1252);
}
var pn = function(e) {
  ai(e);
};
function Dl() {
  pn(1200), Cl();
}
var Ln = function(r) {
  return String.fromCharCode(r);
}, v0 = function(r) {
  return String.fromCharCode(r);
}, Gn, dr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function mn(e) {
  for (var r = "", t = 0, n = 0, a = 0, i = 0, s = 0, l = 0, f = 0, o = 0; o < e.length; )
    t = e.charCodeAt(o++), i = t >> 2, n = e.charCodeAt(o++), s = (t & 3) << 4 | n >> 4, a = e.charCodeAt(o++), l = (n & 15) << 2 | a >> 6, f = a & 63, isNaN(n) ? l = f = 64 : isNaN(a) && (f = 64), r += dr.charAt(i) + dr.charAt(s) + dr.charAt(l) + dr.charAt(f);
  return r;
}
function rr(e) {
  var r = "", t = 0, n = 0, a = 0, i = 0, s = 0, l = 0, f = 0;
  e = e.replace(/[^\w\+\/\=]/g, "");
  for (var o = 0; o < e.length; )
    i = dr.indexOf(e.charAt(o++)), s = dr.indexOf(e.charAt(o++)), t = i << 2 | s >> 4, r += String.fromCharCode(t), l = dr.indexOf(e.charAt(o++)), n = (s & 15) << 4 | l >> 2, l !== 64 && (r += String.fromCharCode(n)), f = dr.indexOf(e.charAt(o++)), a = (l & 3) << 6 | f, f !== 64 && (r += String.fromCharCode(a));
  return r;
}
var Pe = /* @__PURE__ */ function() {
  return typeof Buffer < "u" && typeof process < "u" && typeof process.versions < "u" && !!process.versions.node;
}(), ar = /* @__PURE__ */ function() {
  if (typeof Buffer < "u") {
    var e = !Buffer.from;
    if (!e) try {
      Buffer.from("foo", "utf8");
    } catch {
      e = !0;
    }
    return e ? function(r, t) {
      return t ? new Buffer(r, t) : new Buffer(r);
    } : Buffer.from.bind(Buffer);
  }
  return function() {
  };
}();
function kr(e) {
  return Pe ? Buffer.alloc ? Buffer.alloc(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
function p0(e) {
  return Pe ? Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
var $t = function(r) {
  return Pe ? ar(r, "binary") : r.split("").map(function(t) {
    return t.charCodeAt(0) & 255;
  });
};
function aa(e) {
  if (typeof ArrayBuffer > "u") return $t(e);
  for (var r = new ArrayBuffer(e.length), t = new Uint8Array(r), n = 0; n != e.length; ++n) t[n] = e.charCodeAt(n) & 255;
  return r;
}
function An(e) {
  if (Array.isArray(e)) return e.map(function(n) {
    return String.fromCharCode(n);
  }).join("");
  for (var r = [], t = 0; t < e.length; ++t) r[t] = String.fromCharCode(e[t]);
  return r.join("");
}
function Ol(e) {
  if (typeof Uint8Array > "u") throw new Error("Unsupported");
  return new Uint8Array(e);
}
var ct = Pe ? function(e) {
  return Buffer.concat(e.map(function(r) {
    return Buffer.isBuffer(r) ? r : ar(r);
  }));
} : function(e) {
  if (typeof Uint8Array < "u") {
    var r = 0, t = 0;
    for (r = 0; r < e.length; ++r) t += e[r].length;
    var n = new Uint8Array(t), a = 0;
    for (r = 0, t = 0; r < e.length; t += a, ++r)
      if (a = e[r].length, e[r] instanceof Uint8Array) n.set(e[r], t);
      else {
        if (typeof e[r] == "string")
          throw "wtf";
        n.set(new Uint8Array(e[r]), t);
      }
    return n;
  }
  return [].concat.apply([], e.map(function(i) {
    return Array.isArray(i) ? i : [].slice.call(i);
  }));
};
function Il(e) {
  for (var r = [], t = 0, n = e.length + 250, a = kr(e.length + 255), i = 0; i < e.length; ++i) {
    var s = e.charCodeAt(i);
    if (s < 128) a[t++] = s;
    else if (s < 2048)
      a[t++] = 192 | s >> 6 & 31, a[t++] = 128 | s & 63;
    else if (s >= 55296 && s < 57344) {
      s = (s & 1023) + 64;
      var l = e.charCodeAt(++i) & 1023;
      a[t++] = 240 | s >> 8 & 7, a[t++] = 128 | s >> 2 & 63, a[t++] = 128 | l >> 6 & 15 | (s & 3) << 4, a[t++] = 128 | l & 63;
    } else
      a[t++] = 224 | s >> 12 & 15, a[t++] = 128 | s >> 6 & 63, a[t++] = 128 | s & 63;
    t > n && (r.push(a.slice(0, t)), t = 0, a = kr(65535), n = 65530);
  }
  return r.push(a.slice(0, t)), ct(r);
}
var on = /\u0000/g, Mn = /[\u0001-\u0006]/g;
function Gr(e) {
  for (var r = "", t = e.length - 1; t >= 0; ) r += e.charAt(t--);
  return r;
}
function Vt(e, r) {
  var t = "" + e;
  return t.length >= r ? t : Ke("0", r - t.length) + t;
}
function Ua(e, r) {
  var t = "" + e;
  return t.length >= r ? t : Ke(" ", r - t.length) + t;
}
function jn(e, r) {
  var t = "" + e;
  return t.length >= r ? t : t + Ke(" ", r - t.length);
}
function Rl(e, r) {
  var t = "" + Math.round(e);
  return t.length >= r ? t : Ke("0", r - t.length) + t;
}
function Nl(e, r) {
  var t = "" + e;
  return t.length >= r ? t : Ke("0", r - t.length) + t;
}
var m0 = /* @__PURE__ */ Math.pow(2, 32);
function br(e, r) {
  if (e > m0 || e < -m0) return Rl(e, r);
  var t = Math.round(e);
  return Nl(t, r);
}
function Xn(e, r) {
  return r = r || 0, e.length >= 7 + r && (e.charCodeAt(r) | 32) === 103 && (e.charCodeAt(r + 1) | 32) === 101 && (e.charCodeAt(r + 2) | 32) === 110 && (e.charCodeAt(r + 3) | 32) === 101 && (e.charCodeAt(r + 4) | 32) === 114 && (e.charCodeAt(r + 5) | 32) === 97 && (e.charCodeAt(r + 6) | 32) === 108;
}
var g0 = [
  ["Sun", "Sunday"],
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"]
], Ea = [
  ["J", "Jan", "January"],
  ["F", "Feb", "February"],
  ["M", "Mar", "March"],
  ["A", "Apr", "April"],
  ["M", "May", "May"],
  ["J", "Jun", "June"],
  ["J", "Jul", "July"],
  ["A", "Aug", "August"],
  ["S", "Sep", "September"],
  ["O", "Oct", "October"],
  ["N", "Nov", "November"],
  ["D", "Dec", "December"]
];
function Pl(e) {
  return e || (e = {}), e[0] = "General", e[1] = "0", e[2] = "0.00", e[3] = "#,##0", e[4] = "#,##0.00", e[9] = "0%", e[10] = "0.00%", e[11] = "0.00E+00", e[12] = "# ?/?", e[13] = "# ??/??", e[14] = "m/d/yy", e[15] = "d-mmm-yy", e[16] = "d-mmm", e[17] = "mmm-yy", e[18] = "h:mm AM/PM", e[19] = "h:mm:ss AM/PM", e[20] = "h:mm", e[21] = "h:mm:ss", e[22] = "m/d/yy h:mm", e[37] = "#,##0 ;(#,##0)", e[38] = "#,##0 ;[Red](#,##0)", e[39] = "#,##0.00;(#,##0.00)", e[40] = "#,##0.00;[Red](#,##0.00)", e[45] = "mm:ss", e[46] = "[h]:mm:ss", e[47] = "mmss.0", e[48] = "##0.0E+0", e[49] = "@", e[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "', e;
}
var Je = {
  0: "General",
  1: "0",
  2: "0.00",
  3: "#,##0",
  4: "#,##0.00",
  9: "0%",
  10: "0.00%",
  11: "0.00E+00",
  12: "# ?/?",
  13: "# ??/??",
  14: "m/d/yy",
  15: "d-mmm-yy",
  16: "d-mmm",
  17: "mmm-yy",
  18: "h:mm AM/PM",
  19: "h:mm:ss AM/PM",
  20: "h:mm",
  21: "h:mm:ss",
  22: "m/d/yy h:mm",
  37: "#,##0 ;(#,##0)",
  38: "#,##0 ;[Red](#,##0)",
  39: "#,##0.00;(#,##0.00)",
  40: "#,##0.00;[Red](#,##0.00)",
  45: "mm:ss",
  46: "[h]:mm:ss",
  47: "mmss.0",
  48: "##0.0E+0",
  49: "@",
  56: '"上午/下午 "hh"時"mm"分"ss"秒 "'
}, _0 = {
  5: 37,
  6: 38,
  7: 39,
  8: 40,
  //  5 -> 37 ...  8 -> 40
  23: 0,
  24: 0,
  25: 0,
  26: 0,
  // 23 ->  0 ... 26 ->  0
  27: 14,
  28: 14,
  29: 14,
  30: 14,
  31: 14,
  // 27 -> 14 ... 31 -> 14
  50: 14,
  51: 14,
  52: 14,
  53: 14,
  54: 14,
  // 50 -> 14 ... 58 -> 14
  55: 14,
  56: 14,
  57: 14,
  58: 14,
  59: 1,
  60: 2,
  61: 3,
  62: 4,
  // 59 ->  1 ... 62 ->  4
  67: 9,
  68: 10,
  // 67 ->  9 ... 68 -> 10
  69: 12,
  70: 13,
  71: 14,
  // 69 -> 12 ... 71 -> 14
  72: 14,
  73: 15,
  74: 16,
  75: 17,
  // 72 -> 14 ... 75 -> 17
  76: 20,
  77: 21,
  78: 22,
  // 76 -> 20 ... 78 -> 22
  79: 45,
  80: 46,
  81: 47,
  // 79 -> 45 ... 81 -> 47
  82: 0
  // 82 ->  0 ... 65536 -> 0 (omitted)
}, Ll = {
  //  5 -- Currency,   0 decimal, black negative
  5: '"$"#,##0_);\\("$"#,##0\\)',
  63: '"$"#,##0_);\\("$"#,##0\\)',
  //  6 -- Currency,   0 decimal, red   negative
  6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  //  7 -- Currency,   2 decimal, black negative
  7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  //  8 -- Currency,   2 decimal, red   negative
  8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  // 41 -- Accounting, 0 decimal, No Symbol
  41: '_(* #,##0_);_(* \\(#,##0\\);_(* "-"_);_(@_)',
  // 42 -- Accounting, 0 decimal, $  Symbol
  42: '_("$"* #,##0_);_("$"* \\(#,##0\\);_("$"* "-"_);_(@_)',
  // 43 -- Accounting, 2 decimal, No Symbol
  43: '_(* #,##0.00_);_(* \\(#,##0.00\\);_(* "-"??_);_(@_)',
  // 44 -- Accounting, 2 decimal, $  Symbol
  44: '_("$"* #,##0.00_);_("$"* \\(#,##0.00\\);_("$"* "-"??_);_(@_)'
};
function zn(e, r, t) {
  for (var n = e < 0 ? -1 : 1, a = e * n, i = 0, s = 1, l = 0, f = 1, o = 0, c = 0, x = Math.floor(a); o < r && (x = Math.floor(a), l = x * s + i, c = x * o + f, !(a - x < 5e-8)); )
    a = 1 / (a - x), i = s, s = l, f = o, o = c;
  if (c > r && (o > r ? (c = f, l = i) : (c = o, l = s)), !t) return [0, n * l, c];
  var p = Math.floor(n * l / c);
  return [p, n * l - p * c, c];
}
function Bn(e, r, t) {
  if (e > 2958465 || e < 0) return null;
  var n = e | 0, a = Math.floor(86400 * (e - n)), i = 0, s = [], l = { D: n, T: a, u: 86400 * (e - n) - a, y: 0, m: 0, d: 0, H: 0, M: 0, S: 0, q: 0 };
  if (Math.abs(l.u) < 1e-6 && (l.u = 0), r && r.date1904 && (n += 1462), l.u > 0.9999 && (l.u = 0, ++a == 86400 && (l.T = a = 0, ++n, ++l.D)), n === 60)
    s = t ? [1317, 10, 29] : [1900, 2, 29], i = 3;
  else if (n === 0)
    s = t ? [1317, 8, 29] : [1900, 1, 0], i = 6;
  else {
    n > 60 && --n;
    var f = new Date(1900, 0, 1);
    f.setDate(f.getDate() + n - 1), s = [f.getFullYear(), f.getMonth() + 1, f.getDate()], i = f.getDay(), n < 60 && (i = (i + 6) % 7), t && (i = Vl(f, s));
  }
  return l.y = s[0], l.m = s[1], l.d = s[2], l.S = a % 60, a = Math.floor(a / 60), l.M = a % 60, a = Math.floor(a / 60), l.H = a, l.q = i, l;
}
var ii = /* @__PURE__ */ new Date(1899, 11, 31, 0, 0, 0), Ml = /* @__PURE__ */ ii.getTime(), Bl = /* @__PURE__ */ new Date(1900, 2, 1, 0, 0, 0);
function si(e, r) {
  var t = /* @__PURE__ */ e.getTime();
  return r ? t -= 1461 * 24 * 60 * 60 * 1e3 : e >= Bl && (t += 24 * 60 * 60 * 1e3), (t - (Ml + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ ii.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3);
}
function Wa(e) {
  return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1");
}
function bl(e) {
  return e.indexOf("E") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/, "$10$2");
}
function Ul(e) {
  var r = e < 0 ? 12 : 11, t = Wa(e.toFixed(12));
  return t.length <= r || (t = e.toPrecision(10), t.length <= r) ? t : e.toExponential(5);
}
function Wl(e) {
  var r = Wa(e.toFixed(11));
  return r.length > (e < 0 ? 12 : 11) || r === "0" || r === "-0" ? e.toPrecision(6) : r;
}
function $l(e) {
  var r = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E), t;
  return r >= -4 && r <= -1 ? t = e.toPrecision(10 + r) : Math.abs(r) <= 9 ? t = Ul(e) : r === 10 ? t = e.toFixed(10).substr(0, 12) : t = Wl(e), Wa(bl(t.toUpperCase()));
}
function Na(e, r) {
  switch (typeof e) {
    case "string":
      return e;
    case "boolean":
      return e ? "TRUE" : "FALSE";
    case "number":
      return (e | 0) === e ? e.toString(10) : $l(e);
    case "undefined":
      return "";
    case "object":
      if (e == null) return "";
      if (e instanceof Date) return vr(14, si(e, r && r.date1904), r);
  }
  throw new Error("unsupported value in General format: " + e);
}
function Vl(e, r) {
  r[0] -= 581;
  var t = e.getDay();
  return e < 60 && (t = (t + 6) % 7), t;
}
function Hl(e, r, t, n) {
  var a = "", i = 0, s = 0, l = t.y, f, o = 0;
  switch (e) {
    case 98:
      l = t.y + 543;
    case 121:
      switch (r.length) {
        case 1:
        case 2:
          f = l % 100, o = 2;
          break;
        default:
          f = l % 1e4, o = 4;
          break;
      }
      break;
    case 109:
      switch (r.length) {
        case 1:
        case 2:
          f = t.m, o = r.length;
          break;
        case 3:
          return Ea[t.m - 1][1];
        case 5:
          return Ea[t.m - 1][0];
        default:
          return Ea[t.m - 1][2];
      }
      break;
    case 100:
      switch (r.length) {
        case 1:
        case 2:
          f = t.d, o = r.length;
          break;
        case 3:
          return g0[t.q][0];
        default:
          return g0[t.q][1];
      }
      break;
    case 104:
      switch (r.length) {
        case 1:
        case 2:
          f = 1 + (t.H + 11) % 12, o = r.length;
          break;
        default:
          throw "bad hour format: " + r;
      }
      break;
    case 72:
      switch (r.length) {
        case 1:
        case 2:
          f = t.H, o = r.length;
          break;
        default:
          throw "bad hour format: " + r;
      }
      break;
    case 77:
      switch (r.length) {
        case 1:
        case 2:
          f = t.M, o = r.length;
          break;
        default:
          throw "bad minute format: " + r;
      }
      break;
    case 115:
      if (r != "s" && r != "ss" && r != ".0" && r != ".00" && r != ".000") throw "bad second format: " + r;
      return t.u === 0 && (r == "s" || r == "ss") ? Vt(t.S, r.length) : (n >= 2 ? s = n === 3 ? 1e3 : 100 : s = n === 1 ? 10 : 1, i = Math.round(s * (t.S + t.u)), i >= 60 * s && (i = 0), r === "s" ? i === 0 ? "0" : "" + i / s : (a = Vt(i, 2 + n), r === "ss" ? a.substr(0, 2) : "." + a.substr(2, r.length - 1)));
    case 90:
      switch (r) {
        case "[h]":
        case "[hh]":
          f = t.D * 24 + t.H;
          break;
        case "[m]":
        case "[mm]":
          f = (t.D * 24 + t.H) * 60 + t.M;
          break;
        case "[s]":
        case "[ss]":
          f = ((t.D * 24 + t.H) * 60 + t.M) * 60 + Math.round(t.S + t.u);
          break;
        default:
          throw "bad abstime format: " + r;
      }
      o = r.length === 3 ? 1 : 2;
      break;
    case 101:
      f = l, o = 1;
      break;
  }
  var c = o > 0 ? Vt(f, o) : "";
  return c;
}
function xr(e) {
  var r = 3;
  if (e.length <= r) return e;
  for (var t = e.length % r, n = e.substr(0, t); t != e.length; t += r) n += (n.length > 0 ? "," : "") + e.substr(t, r);
  return n;
}
var li = /%/g;
function Gl(e, r, t) {
  var n = r.replace(li, ""), a = r.length - n.length;
  return Qt(e, n, t * Math.pow(10, 2 * a)) + Ke("%", a);
}
function jl(e, r, t) {
  for (var n = r.length - 1; r.charCodeAt(n - 1) === 44; ) --n;
  return Qt(e, r.substr(0, n), t / Math.pow(10, 3 * (r.length - n)));
}
function fi(e, r) {
  var t, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (r == 0) return "0.0E+0";
    if (r < 0) return "-" + fi(e, -r);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(r) * Math.LOG10E) % a;
    if (i < 0 && (i += a), t = (r / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a), t.indexOf("e") === -1) {
      var s = Math.floor(Math.log(r) * Math.LOG10E);
      for (t.indexOf(".") === -1 ? t = t.charAt(0) + "." + t.substr(1) + "E+" + (s - t.length + i) : t += "E+" + (s - i); t.substr(0, 2) === "0."; )
        t = t.charAt(0) + t.substr(2, a) + "." + t.substr(2 + a), t = t.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.");
      t = t.replace(/\+-/, "-");
    }
    t = t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(l, f, o, c) {
      return f + o + c.substr(0, (a + i) % a) + "." + c.substr(i) + "E";
    });
  } else t = r.toExponential(n);
  return e.match(/E\+00$/) && t.match(/e[+-]\d$/) && (t = t.substr(0, t.length - 1) + "0" + t.charAt(t.length - 1)), e.match(/E\-/) && t.match(/e\+/) && (t = t.replace(/e\+/, "e")), t.replace("e", "E");
}
var oi = /# (\?+)( ?)\/( ?)(\d+)/;
function Xl(e, r, t) {
  var n = parseInt(e[4], 10), a = Math.round(r * n), i = Math.floor(a / n), s = a - i * n, l = n;
  return t + (i === 0 ? "" : "" + i) + " " + (s === 0 ? Ke(" ", e[1].length + 1 + e[4].length) : Ua(s, e[1].length) + e[2] + "/" + e[3] + Vt(l, e[4].length));
}
function zl(e, r, t) {
  return t + (r === 0 ? "" : "" + r) + Ke(" ", e[1].length + 2 + e[4].length);
}
var ci = /^#*0*\.([0#]+)/, ui = /\).*[0#]/, hi = /\(###\) ###\\?-####/;
function gt(e) {
  for (var r = "", t, n = 0; n != e.length; ++n) switch (t = e.charCodeAt(n)) {
    case 35:
      break;
    case 63:
      r += " ";
      break;
    case 48:
      r += "0";
      break;
    default:
      r += String.fromCharCode(t);
  }
  return r;
}
function T0(e, r) {
  var t = Math.pow(10, r);
  return "" + Math.round(e * t) / t;
}
function E0(e, r) {
  var t = e - Math.floor(e), n = Math.pow(10, r);
  return r < ("" + Math.round(t * n)).length ? 0 : Math.round(t * n);
}
function Yl(e, r) {
  return r < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, r))).length ? 1 : 0;
}
function Kl(e) {
  return e < 2147483647 && e > -2147483648 ? "" + (e >= 0 ? e | 0 : e - 1 | 0) : "" + Math.floor(e);
}
function Nt(e, r, t) {
  if (e.charCodeAt(0) === 40 && !r.match(ui)) {
    var n = r.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return t >= 0 ? Nt("n", n, t) : "(" + Nt("n", n, -t) + ")";
  }
  if (r.charCodeAt(r.length - 1) === 44) return jl(e, r, t);
  if (r.indexOf("%") !== -1) return Gl(e, r, t);
  if (r.indexOf("E") !== -1) return fi(r, t);
  if (r.charCodeAt(0) === 36) return "$" + Nt(e, r.substr(r.charAt(1) == " " ? 2 : 1), t);
  var a, i, s, l, f = Math.abs(t), o = t < 0 ? "-" : "";
  if (r.match(/^00+$/)) return o + br(f, r.length);
  if (r.match(/^[#?]+$/))
    return a = br(t, 0), a === "0" && (a = ""), a.length > r.length ? a : gt(r.substr(0, r.length - a.length)) + a;
  if (i = r.match(oi)) return Xl(i, f, o);
  if (r.match(/^#+0+$/)) return o + br(f, r.length - r.indexOf("0"));
  if (i = r.match(ci))
    return a = T0(t, i[1].length).replace(/^([^\.]+)$/, "$1." + gt(i[1])).replace(/\.$/, "." + gt(i[1])).replace(/\.(\d*)$/, function(T, u) {
      return "." + u + Ke("0", gt(
        /*::(*/
        i[1]
      ).length - u.length);
    }), r.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (r = r.replace(/^#+([0.])/, "$1"), i = r.match(/^(0*)\.(#*)$/))
    return o + T0(f, i[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = r.match(/^#{1,3},##0(\.?)$/)) return o + xr(br(f, 0));
  if (i = r.match(/^#,##0\.([#0]*0)$/))
    return t < 0 ? "-" + Nt(e, r, -t) : xr("" + (Math.floor(t) + Yl(t, i[1].length))) + "." + Vt(E0(t, i[1].length), i[1].length);
  if (i = r.match(/^#,#*,#0/)) return Nt(e, r.replace(/^#,#*,/, ""), t);
  if (i = r.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = Gr(Nt(e, r.replace(/[\\-]/g, ""), t)), s = 0, Gr(Gr(r.replace(/\\/g, "")).replace(/[0#]/g, function(T) {
      return s < a.length ? a.charAt(s++) : T === "0" ? "0" : "";
    }));
  if (r.match(hi))
    return a = Nt(e, "##########", t), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var c = "";
  if (i = r.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), l = zn(f, Math.pow(10, s) - 1, !1), a = "" + o, c = Qt(
      "n",
      /*::String(*/
      i[1],
      l[1]
    ), c.charAt(c.length - 1) == " " && (c = c.substr(0, c.length - 1) + "0"), a += c + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], c = jn(l[2], s), c.length < i[4].length && (c = gt(i[4].substr(i[4].length - c.length)) + c), a += c, a;
  if (i = r.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), l = zn(f, Math.pow(10, s) - 1, !0), o + (l[0] || (l[1] ? "" : "0")) + " " + (l[1] ? Ua(l[1], s) + i[2] + "/" + i[3] + jn(l[2], s) : Ke(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = r.match(/^[#0?]+$/))
    return a = br(t, 0), r.length <= a.length ? a : gt(r.substr(0, r.length - a.length)) + a;
  if (i = r.match(/^([#0?]+)\.([#0]+)$/)) {
    a = "" + t.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var x = r.indexOf(".") - s, p = r.length - a.length - x;
    return gt(r.substr(0, x) + a + r.substr(r.length - p));
  }
  if (i = r.match(/^00,000\.([#0]*0)$/))
    return s = E0(t, i[1].length), t < 0 ? "-" + Nt(e, r, -t) : xr(Kl(t)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(T) {
      return "00," + (T.length < 3 ? Vt(0, 3 - T.length) : "") + T;
    }) + "." + Vt(s, i[1].length);
  switch (r) {
    case "###,##0.00":
      return Nt(e, "#,##0.00", t);
    case "###,###":
    case "##,###":
    case "#,###":
      var v = xr(br(f, 0));
      return v !== "0" ? o + v : "";
    case "###,###.00":
      return Nt(e, "###,##0.00", t).replace(/^0\./, ".");
    case "#,###.00":
      return Nt(e, "#,##0.00", t).replace(/^0\./, ".");
  }
  throw new Error("unsupported format |" + r + "|");
}
function Jl(e, r, t) {
  for (var n = r.length - 1; r.charCodeAt(n - 1) === 44; ) --n;
  return Qt(e, r.substr(0, n), t / Math.pow(10, 3 * (r.length - n)));
}
function Zl(e, r, t) {
  var n = r.replace(li, ""), a = r.length - n.length;
  return Qt(e, n, t * Math.pow(10, 2 * a)) + Ke("%", a);
}
function di(e, r) {
  var t, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (r == 0) return "0.0E+0";
    if (r < 0) return "-" + di(e, -r);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(r) * Math.LOG10E) % a;
    if (i < 0 && (i += a), t = (r / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a), !t.match(/[Ee]/)) {
      var s = Math.floor(Math.log(r) * Math.LOG10E);
      t.indexOf(".") === -1 ? t = t.charAt(0) + "." + t.substr(1) + "E+" + (s - t.length + i) : t += "E+" + (s - i), t = t.replace(/\+-/, "-");
    }
    t = t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(l, f, o, c) {
      return f + o + c.substr(0, (a + i) % a) + "." + c.substr(i) + "E";
    });
  } else t = r.toExponential(n);
  return e.match(/E\+00$/) && t.match(/e[+-]\d$/) && (t = t.substr(0, t.length - 1) + "0" + t.charAt(t.length - 1)), e.match(/E\-/) && t.match(/e\+/) && (t = t.replace(/e\+/, "e")), t.replace("e", "E");
}
function Xt(e, r, t) {
  if (e.charCodeAt(0) === 40 && !r.match(ui)) {
    var n = r.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return t >= 0 ? Xt("n", n, t) : "(" + Xt("n", n, -t) + ")";
  }
  if (r.charCodeAt(r.length - 1) === 44) return Jl(e, r, t);
  if (r.indexOf("%") !== -1) return Zl(e, r, t);
  if (r.indexOf("E") !== -1) return di(r, t);
  if (r.charCodeAt(0) === 36) return "$" + Xt(e, r.substr(r.charAt(1) == " " ? 2 : 1), t);
  var a, i, s, l, f = Math.abs(t), o = t < 0 ? "-" : "";
  if (r.match(/^00+$/)) return o + Vt(f, r.length);
  if (r.match(/^[#?]+$/))
    return a = "" + t, t === 0 && (a = ""), a.length > r.length ? a : gt(r.substr(0, r.length - a.length)) + a;
  if (i = r.match(oi)) return zl(i, f, o);
  if (r.match(/^#+0+$/)) return o + Vt(f, r.length - r.indexOf("0"));
  if (i = r.match(ci))
    return a = ("" + t).replace(/^([^\.]+)$/, "$1." + gt(i[1])).replace(/\.$/, "." + gt(i[1])), a = a.replace(/\.(\d*)$/, function(T, u) {
      return "." + u + Ke("0", gt(i[1]).length - u.length);
    }), r.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (r = r.replace(/^#+([0.])/, "$1"), i = r.match(/^(0*)\.(#*)$/))
    return o + ("" + f).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = r.match(/^#{1,3},##0(\.?)$/)) return o + xr("" + f);
  if (i = r.match(/^#,##0\.([#0]*0)$/))
    return t < 0 ? "-" + Xt(e, r, -t) : xr("" + t) + "." + Ke("0", i[1].length);
  if (i = r.match(/^#,#*,#0/)) return Xt(e, r.replace(/^#,#*,/, ""), t);
  if (i = r.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = Gr(Xt(e, r.replace(/[\\-]/g, ""), t)), s = 0, Gr(Gr(r.replace(/\\/g, "")).replace(/[0#]/g, function(T) {
      return s < a.length ? a.charAt(s++) : T === "0" ? "0" : "";
    }));
  if (r.match(hi))
    return a = Xt(e, "##########", t), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var c = "";
  if (i = r.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), l = zn(f, Math.pow(10, s) - 1, !1), a = "" + o, c = Qt(
      "n",
      /*::String(*/
      i[1],
      l[1]
    ), c.charAt(c.length - 1) == " " && (c = c.substr(0, c.length - 1) + "0"), a += c + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], c = jn(l[2], s), c.length < i[4].length && (c = gt(i[4].substr(i[4].length - c.length)) + c), a += c, a;
  if (i = r.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), l = zn(f, Math.pow(10, s) - 1, !0), o + (l[0] || (l[1] ? "" : "0")) + " " + (l[1] ? Ua(l[1], s) + i[2] + "/" + i[3] + jn(l[2], s) : Ke(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = r.match(/^[#0?]+$/))
    return a = "" + t, r.length <= a.length ? a : gt(r.substr(0, r.length - a.length)) + a;
  if (i = r.match(/^([#0]+)\.([#0]+)$/)) {
    a = "" + t.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var x = r.indexOf(".") - s, p = r.length - a.length - x;
    return gt(r.substr(0, x) + a + r.substr(r.length - p));
  }
  if (i = r.match(/^00,000\.([#0]*0)$/))
    return t < 0 ? "-" + Xt(e, r, -t) : xr("" + t).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(T) {
      return "00," + (T.length < 3 ? Vt(0, 3 - T.length) : "") + T;
    }) + "." + Vt(0, i[1].length);
  switch (r) {
    case "###,###":
    case "##,###":
    case "#,###":
      var v = xr("" + f);
      return v !== "0" ? o + v : "";
    default:
      if (r.match(/\.[0#?]*$/)) return Xt(e, r.slice(0, r.lastIndexOf(".")), t) + gt(r.slice(r.lastIndexOf(".")));
  }
  throw new Error("unsupported format |" + r + "|");
}
function Qt(e, r, t) {
  return (t | 0) === t ? Xt(e, r, t) : Nt(e, r, t);
}
function ql(e) {
  for (var r = [], t = !1, n = 0, a = 0; n < e.length; ++n) switch (
    /*cc=*/
    e.charCodeAt(n)
  ) {
    case 34:
      t = !t;
      break;
    case 95:
    case 42:
    case 92:
      ++n;
      break;
    case 59:
      r[r.length] = e.substr(a, n - a), a = n + 1;
  }
  if (r[r.length] = e.substr(a), t === !0) throw new Error("Format |" + e + "| unterminated string ");
  return r;
}
var xi = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
function vi(e) {
  for (var r = 0, t = "", n = ""; r < e.length; )
    switch (t = e.charAt(r)) {
      case "G":
        Xn(e, r) && (r += 6), r++;
        break;
      case '"':
        for (
          ;
          /*cc=*/
          e.charCodeAt(++r) !== 34 && r < e.length;
        )
          ;
        ++r;
        break;
      case "\\":
        r += 2;
        break;
      case "_":
        r += 2;
        break;
      case "@":
        ++r;
        break;
      case "B":
      case "b":
        if (e.charAt(r + 1) === "1" || e.charAt(r + 1) === "2") return !0;
      case "M":
      case "D":
      case "Y":
      case "H":
      case "S":
      case "E":
      case "m":
      case "d":
      case "y":
      case "h":
      case "s":
      case "e":
      case "g":
        return !0;
      case "A":
      case "a":
      case "上":
        if (e.substr(r, 3).toUpperCase() === "A/P" || e.substr(r, 5).toUpperCase() === "AM/PM" || e.substr(r, 5).toUpperCase() === "上午/下午") return !0;
        ++r;
        break;
      case "[":
        for (n = t; e.charAt(r++) !== "]" && r < e.length; ) n += e.charAt(r);
        if (n.match(xi)) return !0;
        break;
      case ".":
      case "0":
      case "#":
        for (; r < e.length && ("0#?.,E+-%".indexOf(t = e.charAt(++r)) > -1 || t == "\\" && e.charAt(r + 1) == "-" && "0#".indexOf(e.charAt(r + 2)) > -1); )
          ;
        break;
      case "?":
        for (; e.charAt(++r) === t; )
          ;
        break;
      case "*":
        ++r, (e.charAt(r) == " " || e.charAt(r) == "*") && ++r;
        break;
      case "(":
      case ")":
        ++r;
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        for (; r < e.length && "0123456789".indexOf(e.charAt(++r)) > -1; )
          ;
        break;
      case " ":
        ++r;
        break;
      default:
        ++r;
        break;
    }
  return !1;
}
function Ql(e, r, t, n) {
  for (var a = [], i = "", s = 0, l = "", f = "t", o, c, x, p = "H"; s < e.length; )
    switch (l = e.charAt(s)) {
      case "G":
        if (!Xn(e, s)) throw new Error("unrecognized character " + l + " in " + e);
        a[a.length] = { t: "G", v: "General" }, s += 7;
        break;
      case '"':
        for (i = ""; (x = e.charCodeAt(++s)) !== 34 && s < e.length; ) i += String.fromCharCode(x);
        a[a.length] = { t: "t", v: i }, ++s;
        break;
      case "\\":
        var v = e.charAt(++s), T = v === "(" || v === ")" ? v : "t";
        a[a.length] = { t: T, v }, ++s;
        break;
      case "_":
        a[a.length] = { t: "t", v: " " }, s += 2;
        break;
      case "@":
        a[a.length] = { t: "T", v: r }, ++s;
        break;
      case "B":
      case "b":
        if (e.charAt(s + 1) === "1" || e.charAt(s + 1) === "2") {
          if (o == null && (o = Bn(r, t, e.charAt(s + 1) === "2"), o == null))
            return "";
          a[a.length] = { t: "X", v: e.substr(s, 2) }, f = l, s += 2;
          break;
        }
      case "M":
      case "D":
      case "Y":
      case "H":
      case "S":
      case "E":
        l = l.toLowerCase();
      case "m":
      case "d":
      case "y":
      case "h":
      case "s":
      case "e":
      case "g":
        if (r < 0 || o == null && (o = Bn(r, t), o == null))
          return "";
        for (i = l; ++s < e.length && e.charAt(s).toLowerCase() === l; ) i += l;
        l === "m" && f.toLowerCase() === "h" && (l = "M"), l === "h" && (l = p), a[a.length] = { t: l, v: i }, f = l;
        break;
      case "A":
      case "a":
      case "上":
        var u = { t: l, v: l };
        if (o == null && (o = Bn(r, t)), e.substr(s, 3).toUpperCase() === "A/P" ? (o != null && (u.v = o.H >= 12 ? "P" : "A"), u.t = "T", p = "h", s += 3) : e.substr(s, 5).toUpperCase() === "AM/PM" ? (o != null && (u.v = o.H >= 12 ? "PM" : "AM"), u.t = "T", s += 5, p = "h") : e.substr(s, 5).toUpperCase() === "上午/下午" ? (o != null && (u.v = o.H >= 12 ? "下午" : "上午"), u.t = "T", s += 5, p = "h") : (u.t = "t", ++s), o == null && u.t === "T") return "";
        a[a.length] = u, f = l;
        break;
      case "[":
        for (i = l; e.charAt(s++) !== "]" && s < e.length; ) i += e.charAt(s);
        if (i.slice(-1) !== "]") throw 'unterminated "[" block: |' + i + "|";
        if (i.match(xi)) {
          if (o == null && (o = Bn(r, t), o == null))
            return "";
          a[a.length] = { t: "Z", v: i.toLowerCase() }, f = i.charAt(1);
        } else i.indexOf("$") > -1 && (i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$", vi(e) || (a[a.length] = { t: "t", v: i }));
        break;
      case ".":
        if (o != null) {
          for (i = l; ++s < e.length && (l = e.charAt(s)) === "0"; ) i += l;
          a[a.length] = { t: "s", v: i };
          break;
        }
      case "0":
      case "#":
        for (i = l; ++s < e.length && "0#?.,E+-%".indexOf(l = e.charAt(s)) > -1; ) i += l;
        a[a.length] = { t: "n", v: i };
        break;
      case "?":
        for (i = l; e.charAt(++s) === l; ) i += l;
        a[a.length] = { t: l, v: i }, f = l;
        break;
      case "*":
        ++s, (e.charAt(s) == " " || e.charAt(s) == "*") && ++s;
        break;
      case "(":
      case ")":
        a[a.length] = { t: n === 1 ? "t" : l, v: l }, ++s;
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        for (i = l; s < e.length && "0123456789".indexOf(e.charAt(++s)) > -1; ) i += e.charAt(s);
        a[a.length] = { t: "D", v: i };
        break;
      case " ":
        a[a.length] = { t: l, v: l }, ++s;
        break;
      case "$":
        a[a.length] = { t: "t", v: "$" }, ++s;
        break;
      default:
        if (",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(l) === -1) throw new Error("unrecognized character " + l + " in " + e);
        a[a.length] = { t: "t", v: l }, ++s;
        break;
    }
  var h = 0, y = 0, C;
  for (s = a.length - 1, f = "t"; s >= 0; --s)
    switch (a[s].t) {
      case "h":
      case "H":
        a[s].t = p, f = "h", h < 1 && (h = 1);
        break;
      case "s":
        (C = a[s].v.match(/\.0+$/)) && (y = Math.max(y, C[0].length - 1)), h < 3 && (h = 3);
      case "d":
      case "y":
      case "M":
      case "e":
        f = a[s].t;
        break;
      case "m":
        f === "s" && (a[s].t = "M", h < 2 && (h = 2));
        break;
      case "X":
        break;
      case "Z":
        h < 1 && a[s].v.match(/[Hh]/) && (h = 1), h < 2 && a[s].v.match(/[Mm]/) && (h = 2), h < 3 && a[s].v.match(/[Ss]/) && (h = 3);
    }
  switch (h) {
    case 0:
      break;
    case 1:
      o.u >= 0.5 && (o.u = 0, ++o.S), o.S >= 60 && (o.S = 0, ++o.M), o.M >= 60 && (o.M = 0, ++o.H);
      break;
    case 2:
      o.u >= 0.5 && (o.u = 0, ++o.S), o.S >= 60 && (o.S = 0, ++o.M);
      break;
  }
  var D = "", L;
  for (s = 0; s < a.length; ++s)
    switch (a[s].t) {
      case "t":
      case "T":
      case " ":
      case "D":
        break;
      case "X":
        a[s].v = "", a[s].t = ";";
        break;
      case "d":
      case "m":
      case "y":
      case "h":
      case "H":
      case "M":
      case "s":
      case "e":
      case "b":
      case "Z":
        a[s].v = Hl(a[s].t.charCodeAt(0), a[s].v, o, y), a[s].t = "t";
        break;
      case "n":
      case "?":
        for (L = s + 1; a[L] != null && ((l = a[L].t) === "?" || l === "D" || (l === " " || l === "t") && a[L + 1] != null && (a[L + 1].t === "?" || a[L + 1].t === "t" && a[L + 1].v === "/") || a[s].t === "(" && (l === " " || l === "n" || l === ")") || l === "t" && (a[L].v === "/" || a[L].v === " " && a[L + 1] != null && a[L + 1].t == "?")); )
          a[s].v += a[L].v, a[L] = { v: "", t: ";" }, ++L;
        D += a[s].v, s = L - 1;
        break;
      case "G":
        a[s].t = "t", a[s].v = Na(r, t);
        break;
    }
  var q = "", se, O;
  if (D.length > 0) {
    D.charCodeAt(0) == 40 ? (se = r < 0 && D.charCodeAt(0) === 45 ? -r : r, O = Qt("n", D, se)) : (se = r < 0 && n > 1 ? -r : r, O = Qt("n", D, se), se < 0 && a[0] && a[0].t == "t" && (O = O.substr(1), a[0].v = "-" + a[0].v)), L = O.length - 1;
    var V = a.length;
    for (s = 0; s < a.length; ++s) if (a[s] != null && a[s].t != "t" && a[s].v.indexOf(".") > -1) {
      V = s;
      break;
    }
    var M = a.length;
    if (V === a.length && O.indexOf("E") === -1) {
      for (s = a.length - 1; s >= 0; --s)
        a[s] == null || "n?".indexOf(a[s].t) === -1 || (L >= a[s].v.length - 1 ? (L -= a[s].v.length, a[s].v = O.substr(L + 1, a[s].v.length)) : L < 0 ? a[s].v = "" : (a[s].v = O.substr(0, L + 1), L = -1), a[s].t = "t", M = s);
      L >= 0 && M < a.length && (a[M].v = O.substr(0, L + 1) + a[M].v);
    } else if (V !== a.length && O.indexOf("E") === -1) {
      for (L = O.indexOf(".") - 1, s = V; s >= 0; --s)
        if (!(a[s] == null || "n?".indexOf(a[s].t) === -1)) {
          for (c = a[s].v.indexOf(".") > -1 && s === V ? a[s].v.indexOf(".") - 1 : a[s].v.length - 1, q = a[s].v.substr(c + 1); c >= 0; --c)
            L >= 0 && (a[s].v.charAt(c) === "0" || a[s].v.charAt(c) === "#") && (q = O.charAt(L--) + q);
          a[s].v = q, a[s].t = "t", M = s;
        }
      for (L >= 0 && M < a.length && (a[M].v = O.substr(0, L + 1) + a[M].v), L = O.indexOf(".") + 1, s = V; s < a.length; ++s)
        if (!(a[s] == null || "n?(".indexOf(a[s].t) === -1 && s !== V)) {
          for (c = a[s].v.indexOf(".") > -1 && s === V ? a[s].v.indexOf(".") + 1 : 0, q = a[s].v.substr(0, c); c < a[s].v.length; ++c)
            L < O.length && (q += O.charAt(L++));
          a[s].v = q, a[s].t = "t", M = s;
        }
    }
  }
  for (s = 0; s < a.length; ++s) a[s] != null && "n?".indexOf(a[s].t) > -1 && (se = n > 1 && r < 0 && s > 0 && a[s - 1].v === "-" ? -r : r, a[s].v = Qt(a[s].t, a[s].v, se), a[s].t = "t");
  var G = "";
  for (s = 0; s !== a.length; ++s) a[s] != null && (G += a[s].v);
  return G;
}
var w0 = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
function S0(e, r) {
  if (r == null) return !1;
  var t = parseFloat(r[2]);
  switch (r[1]) {
    case "=":
      if (e == t) return !0;
      break;
    case ">":
      if (e > t) return !0;
      break;
    case "<":
      if (e < t) return !0;
      break;
    case "<>":
      if (e != t) return !0;
      break;
    case ">=":
      if (e >= t) return !0;
      break;
    case "<=":
      if (e <= t) return !0;
      break;
  }
  return !1;
}
function ef(e, r) {
  var t = ql(e), n = t.length, a = t[n - 1].indexOf("@");
  if (n < 4 && a > -1 && --n, t.length > 4) throw new Error("cannot find right format for |" + t.join("|") + "|");
  if (typeof r != "number") return [4, t.length === 4 || a > -1 ? t[t.length - 1] : "@"];
  switch (t.length) {
    case 1:
      t = a > -1 ? ["General", "General", "General", t[0]] : [t[0], t[0], t[0], "@"];
      break;
    case 2:
      t = a > -1 ? [t[0], t[0], t[0], t[1]] : [t[0], t[1], t[0], "@"];
      break;
    case 3:
      t = a > -1 ? [t[0], t[1], t[0], t[2]] : [t[0], t[1], t[2], "@"];
      break;
  }
  var i = r > 0 ? t[0] : r < 0 ? t[1] : t[2];
  if (t[0].indexOf("[") === -1 && t[1].indexOf("[") === -1) return [n, i];
  if (t[0].match(/\[[=<>]/) != null || t[1].match(/\[[=<>]/) != null) {
    var s = t[0].match(w0), l = t[1].match(w0);
    return S0(r, s) ? [n, t[0]] : S0(r, l) ? [n, t[1]] : [n, t[s != null && l != null ? 2 : 1]];
  }
  return [n, i];
}
function vr(e, r, t) {
  t == null && (t = {});
  var n = "";
  switch (typeof e) {
    case "string":
      e == "m/d/yy" && t.dateNF ? n = t.dateNF : n = e;
      break;
    case "number":
      e == 14 && t.dateNF ? n = t.dateNF : n = (t.table != null ? t.table : Je)[e], n == null && (n = t.table && t.table[_0[e]] || Je[_0[e]]), n == null && (n = Ll[e] || "General");
      break;
  }
  if (Xn(n, 0)) return Na(r, t);
  r instanceof Date && (r = si(r, t.date1904));
  var a = ef(n, r);
  if (Xn(a[1])) return Na(r, t);
  if (r === !0) r = "TRUE";
  else if (r === !1) r = "FALSE";
  else if (r === "" || r == null) return "";
  return Ql(a[1], r, t, a[0]);
}
function pi(e, r) {
  if (typeof r != "number") {
    r = +r || -1;
    for (var t = 0; t < 392; ++t) {
      if (Je[t] == null) {
        r < 0 && (r = t);
        continue;
      }
      if (Je[t] == e) {
        r = t;
        break;
      }
    }
    r < 0 && (r = 391);
  }
  return Je[r] = e, r;
}
function ia(e) {
  for (var r = 0; r != 392; ++r)
    e[r] !== void 0 && pi(e[r], r);
}
function sa() {
  Je = Pl();
}
var mi = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
function tf(e) {
  var r = typeof e == "number" ? Je[e] : e;
  return r = r.replace(mi, "(\\d+)"), new RegExp("^" + r + "$");
}
function rf(e, r, t) {
  var n = -1, a = -1, i = -1, s = -1, l = -1, f = -1;
  (r.match(mi) || []).forEach(function(x, p) {
    var v = parseInt(t[p + 1], 10);
    switch (x.toLowerCase().charAt(0)) {
      case "y":
        n = v;
        break;
      case "d":
        i = v;
        break;
      case "h":
        s = v;
        break;
      case "s":
        f = v;
        break;
      case "m":
        s >= 0 ? l = v : a = v;
        break;
    }
  }), f >= 0 && l == -1 && a >= 0 && (l = a, a = -1);
  var o = ("" + (n >= 0 ? n : (/* @__PURE__ */ new Date()).getFullYear())).slice(-4) + "-" + ("00" + (a >= 1 ? a : 1)).slice(-2) + "-" + ("00" + (i >= 1 ? i : 1)).slice(-2);
  o.length == 7 && (o = "0" + o), o.length == 8 && (o = "20" + o);
  var c = ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + ("00" + (l >= 0 ? l : 0)).slice(-2) + ":" + ("00" + (f >= 0 ? f : 0)).slice(-2);
  return s == -1 && l == -1 && f == -1 ? o : n == -1 && a == -1 && i == -1 ? c : o + "T" + c;
}
var nf = /* @__PURE__ */ function() {
  var e = {};
  e.version = "1.2.0";
  function r() {
    for (var O = 0, V = new Array(256), M = 0; M != 256; ++M)
      O = M, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, V[M] = O;
    return typeof Int32Array < "u" ? new Int32Array(V) : V;
  }
  var t = r();
  function n(O) {
    var V = 0, M = 0, G = 0, z = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
    for (G = 0; G != 256; ++G) z[G] = O[G];
    for (G = 0; G != 256; ++G)
      for (M = O[G], V = 256 + G; V < 4096; V += 256) M = z[V] = M >>> 8 ^ O[M & 255];
    var K = [];
    for (G = 1; G != 16; ++G) K[G - 1] = typeof Int32Array < "u" ? z.subarray(G * 256, G * 256 + 256) : z.slice(G * 256, G * 256 + 256);
    return K;
  }
  var a = n(t), i = a[0], s = a[1], l = a[2], f = a[3], o = a[4], c = a[5], x = a[6], p = a[7], v = a[8], T = a[9], u = a[10], h = a[11], y = a[12], C = a[13], D = a[14];
  function L(O, V) {
    for (var M = V ^ -1, G = 0, z = O.length; G < z; ) M = M >>> 8 ^ t[(M ^ O.charCodeAt(G++)) & 255];
    return ~M;
  }
  function q(O, V) {
    for (var M = V ^ -1, G = O.length - 15, z = 0; z < G; ) M = D[O[z++] ^ M & 255] ^ C[O[z++] ^ M >> 8 & 255] ^ y[O[z++] ^ M >> 16 & 255] ^ h[O[z++] ^ M >>> 24] ^ u[O[z++]] ^ T[O[z++]] ^ v[O[z++]] ^ p[O[z++]] ^ x[O[z++]] ^ c[O[z++]] ^ o[O[z++]] ^ f[O[z++]] ^ l[O[z++]] ^ s[O[z++]] ^ i[O[z++]] ^ t[O[z++]];
    for (G += 15; z < G; ) M = M >>> 8 ^ t[(M ^ O[z++]) & 255];
    return ~M;
  }
  function se(O, V) {
    for (var M = V ^ -1, G = 0, z = O.length, K = 0, fe = 0; G < z; )
      K = O.charCodeAt(G++), K < 128 ? M = M >>> 8 ^ t[(M ^ K) & 255] : K < 2048 ? (M = M >>> 8 ^ t[(M ^ (192 | K >> 6 & 31)) & 255], M = M >>> 8 ^ t[(M ^ (128 | K & 63)) & 255]) : K >= 55296 && K < 57344 ? (K = (K & 1023) + 64, fe = O.charCodeAt(G++) & 1023, M = M >>> 8 ^ t[(M ^ (240 | K >> 8 & 7)) & 255], M = M >>> 8 ^ t[(M ^ (128 | K >> 2 & 63)) & 255], M = M >>> 8 ^ t[(M ^ (128 | fe >> 6 & 15 | (K & 3) << 4)) & 255], M = M >>> 8 ^ t[(M ^ (128 | fe & 63)) & 255]) : (M = M >>> 8 ^ t[(M ^ (224 | K >> 12 & 15)) & 255], M = M >>> 8 ^ t[(M ^ (128 | K >> 6 & 63)) & 255], M = M >>> 8 ^ t[(M ^ (128 | K & 63)) & 255]);
    return ~M;
  }
  return e.table = t, e.bstr = L, e.buf = q, e.str = se, e;
}(), $e = /* @__PURE__ */ function() {
  var r = {};
  r.version = "1.2.1";
  function t(d, E) {
    for (var g = d.split("/"), _ = E.split("/"), w = 0, S = 0, R = Math.min(g.length, _.length); w < R; ++w) {
      if (S = g[w].length - _[w].length) return S;
      if (g[w] != _[w]) return g[w] < _[w] ? -1 : 1;
    }
    return g.length - _.length;
  }
  function n(d) {
    if (d.charAt(d.length - 1) == "/") return d.slice(0, -1).indexOf("/") === -1 ? d : n(d.slice(0, -1));
    var E = d.lastIndexOf("/");
    return E === -1 ? d : d.slice(0, E + 1);
  }
  function a(d) {
    if (d.charAt(d.length - 1) == "/") return a(d.slice(0, -1));
    var E = d.lastIndexOf("/");
    return E === -1 ? d : d.slice(E + 1);
  }
  function i(d, E) {
    typeof E == "string" && (E = new Date(E));
    var g = E.getHours();
    g = g << 6 | E.getMinutes(), g = g << 5 | E.getSeconds() >>> 1, d.write_shift(2, g);
    var _ = E.getFullYear() - 1980;
    _ = _ << 4 | E.getMonth() + 1, _ = _ << 5 | E.getDate(), d.write_shift(2, _);
  }
  function s(d) {
    var E = d.read_shift(2) & 65535, g = d.read_shift(2) & 65535, _ = /* @__PURE__ */ new Date(), w = g & 31;
    g >>>= 5;
    var S = g & 15;
    g >>>= 4, _.setMilliseconds(0), _.setFullYear(g + 1980), _.setMonth(S - 1), _.setDate(w);
    var R = E & 31;
    E >>>= 5;
    var W = E & 63;
    return E >>>= 6, _.setHours(E), _.setMinutes(W), _.setSeconds(R << 1), _;
  }
  function l(d) {
    Dt(d, 0);
    for (var E = (
      /*::(*/
      {}
    ), g = 0; d.l <= d.length - 4; ) {
      var _ = d.read_shift(2), w = d.read_shift(2), S = d.l + w, R = {};
      switch (_) {
        case 21589:
          g = d.read_shift(1), g & 1 && (R.mtime = d.read_shift(4)), w > 5 && (g & 2 && (R.atime = d.read_shift(4)), g & 4 && (R.ctime = d.read_shift(4))), R.mtime && (R.mt = new Date(R.mtime * 1e3));
          break;
      }
      d.l = S, E[_] = R;
    }
    return E;
  }
  var f;
  function o() {
    return f || (f = {});
  }
  function c(d, E) {
    if (d[0] == 80 && d[1] == 75) return In(d, E);
    if ((d[0] | 32) == 109 && (d[1] | 32) == 105) return ma(d, E);
    if (d.length < 512) throw new Error("CFB file size " + d.length + " < 512");
    var g = 3, _ = 512, w = 0, S = 0, R = 0, W = 0, I = 0, N = [], P = (
      /*::(*/
      d.slice(0, 512)
    );
    Dt(P, 0);
    var Z = x(P);
    switch (g = Z[0], g) {
      case 3:
        _ = 512;
        break;
      case 4:
        _ = 4096;
        break;
      case 0:
        if (Z[1] == 0) return In(d, E);
      default:
        throw new Error("Major Version: Expected 3 or 4 saw " + g);
    }
    _ !== 512 && (P = /*::(*/
    d.slice(0, _), Dt(
      P,
      28
      /* blob.l */
    ));
    var ae = d.slice(0, _);
    p(P, g);
    var he = P.read_shift(4, "i");
    if (g === 3 && he !== 0) throw new Error("# Directory Sectors: Expected 0 saw " + he);
    P.l += 4, R = P.read_shift(4, "i"), P.l += 4, P.chk("00100000", "Mini Stream Cutoff Size: "), W = P.read_shift(4, "i"), w = P.read_shift(4, "i"), I = P.read_shift(4, "i"), S = P.read_shift(4, "i");
    for (var ee = -1, oe = 0; oe < 109 && (ee = P.read_shift(4, "i"), !(ee < 0)); ++oe)
      N[oe] = ee;
    var we = v(d, _);
    h(I, S, we, _, N);
    var je = C(we, R, N, _);
    je[R].name = "!Directory", w > 0 && W !== fe && (je[W].name = "!MiniFAT"), je[N[0]].name = "!FAT", je.fat_addrs = N, je.ssz = _;
    var Xe = {}, xt = [], nn = [], an = [];
    D(R, je, we, xt, w, Xe, nn, W), T(nn, an, xt), xt.shift();
    var sn = {
      FileIndex: nn,
      FullPaths: an
    };
    return E && E.raw && (sn.raw = { header: ae, sectors: we }), sn;
  }
  function x(d) {
    if (d[d.l] == 80 && d[d.l + 1] == 75) return [0, 0];
    d.chk(pe, "Header Signature: "), d.l += 16;
    var E = d.read_shift(2, "u");
    return [d.read_shift(2, "u"), E];
  }
  function p(d, E) {
    var g = 9;
    switch (d.l += 2, g = d.read_shift(2)) {
      case 9:
        if (E != 3) throw new Error("Sector Shift: Expected 9 saw " + g);
        break;
      case 12:
        if (E != 4) throw new Error("Sector Shift: Expected 12 saw " + g);
        break;
      default:
        throw new Error("Sector Shift: Expected 9 or 12 saw " + g);
    }
    d.chk("0600", "Mini Sector Shift: "), d.chk("000000000000", "Reserved: ");
  }
  function v(d, E) {
    for (var g = Math.ceil(d.length / E) - 1, _ = [], w = 1; w < g; ++w) _[w - 1] = d.slice(w * E, (w + 1) * E);
    return _[g - 1] = d.slice(g * E), _;
  }
  function T(d, E, g) {
    for (var _ = 0, w = 0, S = 0, R = 0, W = 0, I = g.length, N = [], P = []; _ < I; ++_)
      N[_] = P[_] = _, E[_] = g[_];
    for (; W < P.length; ++W)
      _ = P[W], w = d[_].L, S = d[_].R, R = d[_].C, N[_] === _ && (w !== -1 && N[w] !== w && (N[_] = N[w]), S !== -1 && N[S] !== S && (N[_] = N[S])), R !== -1 && (N[R] = _), w !== -1 && _ != N[_] && (N[w] = N[_], P.lastIndexOf(w) < W && P.push(w)), S !== -1 && _ != N[_] && (N[S] = N[_], P.lastIndexOf(S) < W && P.push(S));
    for (_ = 1; _ < I; ++_) N[_] === _ && (S !== -1 && N[S] !== S ? N[_] = N[S] : w !== -1 && N[w] !== w && (N[_] = N[w]));
    for (_ = 1; _ < I; ++_)
      if (d[_].type !== 0) {
        if (W = _, W != N[W]) do
          W = N[W], E[_] = E[W] + "/" + E[_];
        while (W !== 0 && N[W] !== -1 && W != N[W]);
        N[_] = -1;
      }
    for (E[0] += "/", _ = 1; _ < I; ++_)
      d[_].type !== 2 && (E[_] += "/");
  }
  function u(d, E, g) {
    for (var _ = d.start, w = d.size, S = [], R = _; g && w > 0 && R >= 0; )
      S.push(E.slice(R * K, R * K + K)), w -= K, R = yr(g, R * 4);
    return S.length === 0 ? U(0) : ct(S).slice(0, d.size);
  }
  function h(d, E, g, _, w) {
    var S = fe;
    if (d === fe) {
      if (E !== 0) throw new Error("DIFAT chain shorter than expected");
    } else if (d !== -1) {
      var R = g[d], W = (_ >>> 2) - 1;
      if (!R) return;
      for (var I = 0; I < W && (S = yr(R, I * 4)) !== fe; ++I)
        w.push(S);
      h(yr(R, _ - 4), E - 1, g, _, w);
    }
  }
  function y(d, E, g, _, w) {
    var S = [], R = [];
    w || (w = []);
    var W = _ - 1, I = 0, N = 0;
    for (I = E; I >= 0; ) {
      w[I] = !0, S[S.length] = I, R.push(d[I]);
      var P = g[Math.floor(I * 4 / _)];
      if (N = I * 4 & W, _ < 4 + N) throw new Error("FAT boundary crossed: " + I + " 4 " + _);
      if (!d[P]) break;
      I = yr(d[P], N);
    }
    return { nodes: S, data: I0([R]) };
  }
  function C(d, E, g, _) {
    var w = d.length, S = [], R = [], W = [], I = [], N = _ - 1, P = 0, Z = 0, ae = 0, he = 0;
    for (P = 0; P < w; ++P)
      if (W = [], ae = P + E, ae >= w && (ae -= w), !R[ae]) {
        I = [];
        var ee = [];
        for (Z = ae; Z >= 0; ) {
          ee[Z] = !0, R[Z] = !0, W[W.length] = Z, I.push(d[Z]);
          var oe = g[Math.floor(Z * 4 / _)];
          if (he = Z * 4 & N, _ < 4 + he) throw new Error("FAT boundary crossed: " + Z + " 4 " + _);
          if (!d[oe] || (Z = yr(d[oe], he), ee[Z])) break;
        }
        S[ae] = { nodes: W, data: I0([I]) };
      }
    return S;
  }
  function D(d, E, g, _, w, S, R, W) {
    for (var I = 0, N = _.length ? 2 : 0, P = E[d].data, Z = 0, ae = 0, he; Z < P.length; Z += 128) {
      var ee = (
        /*::(*/
        P.slice(Z, Z + 128)
      );
      Dt(ee, 64), ae = ee.read_shift(2), he = ja(ee, 0, ae - N), _.push(he);
      var oe = {
        name: he,
        type: ee.read_shift(1),
        color: ee.read_shift(1),
        L: ee.read_shift(4, "i"),
        R: ee.read_shift(4, "i"),
        C: ee.read_shift(4, "i"),
        clsid: ee.read_shift(16),
        state: ee.read_shift(4, "i"),
        start: 0,
        size: 0
      }, we = ee.read_shift(2) + ee.read_shift(2) + ee.read_shift(2) + ee.read_shift(2);
      we !== 0 && (oe.ct = L(ee, ee.l - 8));
      var je = ee.read_shift(2) + ee.read_shift(2) + ee.read_shift(2) + ee.read_shift(2);
      je !== 0 && (oe.mt = L(ee, ee.l - 8)), oe.start = ee.read_shift(4, "i"), oe.size = ee.read_shift(4, "i"), oe.size < 0 && oe.start < 0 && (oe.size = oe.type = 0, oe.start = fe, oe.name = ""), oe.type === 5 ? (I = oe.start, w > 0 && I !== fe && (E[I].name = "!StreamData")) : oe.size >= 4096 ? (oe.storage = "fat", E[oe.start] === void 0 && (E[oe.start] = y(g, oe.start, E.fat_addrs, E.ssz)), E[oe.start].name = oe.name, oe.content = E[oe.start].data.slice(0, oe.size)) : (oe.storage = "minifat", oe.size < 0 ? oe.size = 0 : I !== fe && oe.start !== fe && E[I] && (oe.content = u(oe, E[I].data, (E[W] || {}).data))), oe.content && Dt(oe.content, 0), S[he] = oe, R.push(oe);
    }
  }
  function L(d, E) {
    return new Date((It(d, E + 4) / 1e7 * Math.pow(2, 32) + It(d, E) / 1e7 - 11644473600) * 1e3);
  }
  function q(d, E) {
    return o(), c(f.readFileSync(d), E);
  }
  function se(d, E) {
    var g = E && E.type;
    switch (g || Pe && Buffer.isBuffer(d) && (g = "buffer"), g || "base64") {
      case "file":
        return q(d, E);
      case "base64":
        return c($t(rr(d)), E);
      case "binary":
        return c($t(d), E);
    }
    return c(
      /*::typeof blob == 'string' ? new Buffer(blob, 'utf-8') : */
      d,
      E
    );
  }
  function O(d, E) {
    var g = E || {}, _ = g.root || "Root Entry";
    if (d.FullPaths || (d.FullPaths = []), d.FileIndex || (d.FileIndex = []), d.FullPaths.length !== d.FileIndex.length) throw new Error("inconsistent CFB structure");
    d.FullPaths.length === 0 && (d.FullPaths[0] = _ + "/", d.FileIndex[0] = { name: _, type: 5 }), g.CLSID && (d.FileIndex[0].clsid = g.CLSID), V(d);
  }
  function V(d) {
    var E = "Sh33tJ5";
    if (!$e.find(d, "/" + E)) {
      var g = U(4);
      g[0] = 55, g[1] = g[3] = 50, g[2] = 54, d.FileIndex.push({ name: E, type: 2, content: g, size: 4, L: 69, R: 69, C: 69 }), d.FullPaths.push(d.FullPaths[0] + E), M(d);
    }
  }
  function M(d, E) {
    O(d);
    for (var g = !1, _ = !1, w = d.FullPaths.length - 1; w >= 0; --w) {
      var S = d.FileIndex[w];
      switch (S.type) {
        case 0:
          _ ? g = !0 : (d.FileIndex.pop(), d.FullPaths.pop());
          break;
        case 1:
        case 2:
        case 5:
          _ = !0, isNaN(S.R * S.L * S.C) && (g = !0), S.R > -1 && S.L > -1 && S.R == S.L && (g = !0);
          break;
        default:
          g = !0;
          break;
      }
    }
    if (!(!g && !E)) {
      var R = new Date(1987, 1, 19), W = 0, I = Object.create ? /* @__PURE__ */ Object.create(null) : {}, N = [];
      for (w = 0; w < d.FullPaths.length; ++w)
        I[d.FullPaths[w]] = !0, d.FileIndex[w].type !== 0 && N.push([d.FullPaths[w], d.FileIndex[w]]);
      for (w = 0; w < N.length; ++w) {
        var P = n(N[w][0]);
        _ = I[P], _ || (N.push([P, {
          name: a(P).replace("/", ""),
          type: 1,
          clsid: Ge,
          ct: R,
          mt: R,
          content: null
        }]), I[P] = !0);
      }
      for (N.sort(function(he, ee) {
        return t(he[0], ee[0]);
      }), d.FullPaths = [], d.FileIndex = [], w = 0; w < N.length; ++w)
        d.FullPaths[w] = N[w][0], d.FileIndex[w] = N[w][1];
      for (w = 0; w < N.length; ++w) {
        var Z = d.FileIndex[w], ae = d.FullPaths[w];
        if (Z.name = a(ae).replace("/", ""), Z.L = Z.R = Z.C = -(Z.color = 1), Z.size = Z.content ? Z.content.length : 0, Z.start = 0, Z.clsid = Z.clsid || Ge, w === 0)
          Z.C = N.length > 1 ? 1 : -1, Z.size = 0, Z.type = 5;
        else if (ae.slice(-1) == "/") {
          for (W = w + 1; W < N.length && n(d.FullPaths[W]) != ae; ++W) ;
          for (Z.C = W >= N.length ? -1 : W, W = w + 1; W < N.length && n(d.FullPaths[W]) != n(ae); ++W) ;
          Z.R = W >= N.length ? -1 : W, Z.type = 1;
        } else
          n(d.FullPaths[w + 1] || "") == n(ae) && (Z.R = w + 1), Z.type = 2;
      }
    }
  }
  function G(d, E) {
    var g = E || {};
    if (g.fileType == "mad") return ga(d, g);
    switch (M(d), g.fileType) {
      case "zip":
        return xa(d, g);
    }
    var _ = function(he) {
      for (var ee = 0, oe = 0, we = 0; we < he.FileIndex.length; ++we) {
        var je = he.FileIndex[we];
        if (je.content) {
          var Xe = je.content.length;
          Xe > 0 && (Xe < 4096 ? ee += Xe + 63 >> 6 : oe += Xe + 511 >> 9);
        }
      }
      for (var xt = he.FullPaths.length + 3 >> 2, nn = ee + 7 >> 3, an = ee + 127 >> 7, sn = nn + oe + xt + an, Ar = sn + 127 >> 7, _a = Ar <= 109 ? 0 : Math.ceil((Ar - 109) / 127); sn + Ar + _a + 127 >> 7 > Ar; ) _a = ++Ar <= 109 ? 0 : Math.ceil((Ar - 109) / 127);
      var qt = [1, _a, Ar, an, xt, oe, ee, 0];
      return he.FileIndex[0].size = ee << 6, qt[7] = (he.FileIndex[0].start = qt[0] + qt[1] + qt[2] + qt[3] + qt[4] + qt[5]) + (qt[6] + 7 >> 3), qt;
    }(d), w = U(_[7] << 9), S = 0, R = 0;
    {
      for (S = 0; S < 8; ++S) w.write_shift(1, Ee[S]);
      for (S = 0; S < 8; ++S) w.write_shift(2, 0);
      for (w.write_shift(2, 62), w.write_shift(2, 3), w.write_shift(2, 65534), w.write_shift(2, 9), w.write_shift(2, 6), S = 0; S < 3; ++S) w.write_shift(2, 0);
      for (w.write_shift(4, 0), w.write_shift(4, _[2]), w.write_shift(4, _[0] + _[1] + _[2] + _[3] - 1), w.write_shift(4, 0), w.write_shift(4, 4096), w.write_shift(4, _[3] ? _[0] + _[1] + _[2] - 1 : fe), w.write_shift(4, _[3]), w.write_shift(-4, _[1] ? _[0] - 1 : fe), w.write_shift(4, _[1]), S = 0; S < 109; ++S) w.write_shift(-4, S < _[2] ? _[1] + S : -1);
    }
    if (_[1])
      for (R = 0; R < _[1]; ++R) {
        for (; S < 236 + R * 127; ++S) w.write_shift(-4, S < _[2] ? _[1] + S : -1);
        w.write_shift(-4, R === _[1] - 1 ? fe : R + 1);
      }
    var W = function(he) {
      for (R += he; S < R - 1; ++S) w.write_shift(-4, S + 1);
      he && (++S, w.write_shift(-4, fe));
    };
    for (R = S = 0, R += _[1]; S < R; ++S) w.write_shift(-4, Le.DIFSECT);
    for (R += _[2]; S < R; ++S) w.write_shift(-4, Le.FATSECT);
    W(_[3]), W(_[4]);
    for (var I = 0, N = 0, P = d.FileIndex[0]; I < d.FileIndex.length; ++I)
      P = d.FileIndex[I], P.content && (N = P.content.length, !(N < 4096) && (P.start = R, W(N + 511 >> 9)));
    for (W(_[6] + 7 >> 3); w.l & 511; ) w.write_shift(-4, Le.ENDOFCHAIN);
    for (R = S = 0, I = 0; I < d.FileIndex.length; ++I)
      P = d.FileIndex[I], P.content && (N = P.content.length, !(!N || N >= 4096) && (P.start = R, W(N + 63 >> 6)));
    for (; w.l & 511; ) w.write_shift(-4, Le.ENDOFCHAIN);
    for (S = 0; S < _[4] << 2; ++S) {
      var Z = d.FullPaths[S];
      if (!Z || Z.length === 0) {
        for (I = 0; I < 17; ++I) w.write_shift(4, 0);
        for (I = 0; I < 3; ++I) w.write_shift(4, -1);
        for (I = 0; I < 12; ++I) w.write_shift(4, 0);
        continue;
      }
      P = d.FileIndex[S], S === 0 && (P.start = P.size ? P.start - 1 : fe);
      var ae = S === 0 && g.root || P.name;
      if (N = 2 * (ae.length + 1), w.write_shift(64, ae, "utf16le"), w.write_shift(2, N), w.write_shift(1, P.type), w.write_shift(1, P.color), w.write_shift(-4, P.L), w.write_shift(-4, P.R), w.write_shift(-4, P.C), P.clsid) w.write_shift(16, P.clsid, "hex");
      else for (I = 0; I < 4; ++I) w.write_shift(4, 0);
      w.write_shift(4, P.state || 0), w.write_shift(4, 0), w.write_shift(4, 0), w.write_shift(4, 0), w.write_shift(4, 0), w.write_shift(4, P.start), w.write_shift(4, P.size), w.write_shift(4, 0);
    }
    for (S = 1; S < d.FileIndex.length; ++S)
      if (P = d.FileIndex[S], P.size >= 4096)
        if (w.l = P.start + 1 << 9, Pe && Buffer.isBuffer(P.content))
          P.content.copy(w, w.l, 0, P.size), w.l += P.size + 511 & -512;
        else {
          for (I = 0; I < P.size; ++I) w.write_shift(1, P.content[I]);
          for (; I & 511; ++I) w.write_shift(1, 0);
        }
    for (S = 1; S < d.FileIndex.length; ++S)
      if (P = d.FileIndex[S], P.size > 0 && P.size < 4096)
        if (Pe && Buffer.isBuffer(P.content))
          P.content.copy(w, w.l, 0, P.size), w.l += P.size + 63 & -64;
        else {
          for (I = 0; I < P.size; ++I) w.write_shift(1, P.content[I]);
          for (; I & 63; ++I) w.write_shift(1, 0);
        }
    if (Pe)
      w.l = w.length;
    else
      for (; w.l < w.length; ) w.write_shift(1, 0);
    return w;
  }
  function z(d, E) {
    var g = d.FullPaths.map(function(I) {
      return I.toUpperCase();
    }), _ = g.map(function(I) {
      var N = I.split("/");
      return N[N.length - (I.slice(-1) == "/" ? 2 : 1)];
    }), w = !1;
    E.charCodeAt(0) === 47 ? (w = !0, E = g[0].slice(0, -1) + E) : w = E.indexOf("/") !== -1;
    var S = E.toUpperCase(), R = w === !0 ? g.indexOf(S) : _.indexOf(S);
    if (R !== -1) return d.FileIndex[R];
    var W = !S.match(Mn);
    for (S = S.replace(on, ""), W && (S = S.replace(Mn, "!")), R = 0; R < g.length; ++R)
      if ((W ? g[R].replace(Mn, "!") : g[R]).replace(on, "") == S || (W ? _[R].replace(Mn, "!") : _[R]).replace(on, "") == S) return d.FileIndex[R];
    return null;
  }
  var K = 64, fe = -2, pe = "d0cf11e0a1b11ae1", Ee = [208, 207, 17, 224, 161, 177, 26, 225], Ge = "00000000000000000000000000000000", Le = {
    /* 2.1 Compund File Sector Numbers and Types */
    MAXREGSECT: -6,
    DIFSECT: -4,
    FATSECT: -3,
    ENDOFCHAIN: fe,
    FREESECT: -1,
    /* 2.2 Compound File Header */
    HEADER_SIGNATURE: pe,
    HEADER_MINOR_VERSION: "3e00",
    MAXREGSID: -6,
    NOSTREAM: -1,
    HEADER_CLSID: Ge,
    /* 2.6.1 Compound File Directory Entry */
    EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
  };
  function lt(d, E, g) {
    o();
    var _ = G(d, g);
    f.writeFileSync(E, _);
  }
  function Ve(d) {
    for (var E = new Array(d.length), g = 0; g < d.length; ++g) E[g] = String.fromCharCode(d[g]);
    return E.join("");
  }
  function rt(d, E) {
    var g = G(d, E);
    switch (E && E.type || "buffer") {
      case "file":
        return o(), f.writeFileSync(E.filename, g), g;
      case "binary":
        return typeof g == "string" ? g : Ve(g);
      case "base64":
        return mn(typeof g == "string" ? g : Ve(g));
      case "buffer":
        if (Pe) return Buffer.isBuffer(g) ? g : ar(g);
      case "array":
        return typeof g == "string" ? $t(g) : g;
    }
    return g;
  }
  var H;
  function m(d) {
    try {
      var E = d.InflateRaw, g = new E();
      if (g._processChunk(new Uint8Array([3, 0]), g._finishFlushFlag), g.bytesRead) H = d;
      else throw new Error("zlib does not expose bytesRead");
    } catch (_) {
      console.error("cannot use native zlib: " + (_.message || _));
    }
  }
  function k(d, E) {
    if (!H) return wr(d, E);
    var g = H.InflateRaw, _ = new g(), w = _._processChunk(d.slice(d.l), _._finishFlushFlag);
    return d.l += _.bytesRead, w;
  }
  function A(d) {
    return H ? H.deflateRawSync(d) : en(d);
  }
  var F = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], B = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], ie = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
  function xe(d) {
    var E = (d << 1 | d << 11) & 139536 | (d << 5 | d << 15) & 558144;
    return (E >> 16 | E >> 8 | E) & 255;
  }
  for (var de = typeof Uint8Array < "u", ne = de ? new Uint8Array(256) : [], Fe = 0; Fe < 256; ++Fe) ne[Fe] = xe(Fe);
  function Se(d, E) {
    var g = ne[d & 255];
    return E <= 8 ? g >>> 8 - E : (g = g << 8 | ne[d >> 8 & 255], E <= 16 ? g >>> 16 - E : (g = g << 8 | ne[d >> 16 & 255], g >>> 24 - E));
  }
  function me(d, E) {
    var g = E & 7, _ = E >>> 3;
    return (d[_] | (g <= 6 ? 0 : d[_ + 1] << 8)) >>> g & 3;
  }
  function Te(d, E) {
    var g = E & 7, _ = E >>> 3;
    return (d[_] | (g <= 5 ? 0 : d[_ + 1] << 8)) >>> g & 7;
  }
  function ze(d, E) {
    var g = E & 7, _ = E >>> 3;
    return (d[_] | (g <= 4 ? 0 : d[_ + 1] << 8)) >>> g & 15;
  }
  function ke(d, E) {
    var g = E & 7, _ = E >>> 3;
    return (d[_] | (g <= 3 ? 0 : d[_ + 1] << 8)) >>> g & 31;
  }
  function ue(d, E) {
    var g = E & 7, _ = E >>> 3;
    return (d[_] | (g <= 1 ? 0 : d[_ + 1] << 8)) >>> g & 127;
  }
  function mt(d, E, g) {
    var _ = E & 7, w = E >>> 3, S = (1 << g) - 1, R = d[w] >>> _;
    return g < 8 - _ || (R |= d[w + 1] << 8 - _, g < 16 - _) || (R |= d[w + 2] << 16 - _, g < 24 - _) || (R |= d[w + 3] << 24 - _), R & S;
  }
  function Et(d, E, g) {
    var _ = E & 7, w = E >>> 3;
    return _ <= 5 ? d[w] |= (g & 7) << _ : (d[w] |= g << _ & 255, d[w + 1] = (g & 7) >> 8 - _), E + 3;
  }
  function Bt(d, E, g) {
    var _ = E & 7, w = E >>> 3;
    return g = (g & 1) << _, d[w] |= g, E + 1;
  }
  function Jt(d, E, g) {
    var _ = E & 7, w = E >>> 3;
    return g <<= _, d[w] |= g & 255, g >>>= 8, d[w + 1] = g, E + 8;
  }
  function On(d, E, g) {
    var _ = E & 7, w = E >>> 3;
    return g <<= _, d[w] |= g & 255, g >>>= 8, d[w + 1] = g & 255, d[w + 2] = g >>> 8, E + 16;
  }
  function Lr(d, E) {
    var g = d.length, _ = 2 * g > E ? 2 * g : E + 5, w = 0;
    if (g >= E) return d;
    if (Pe) {
      var S = p0(_);
      if (d.copy) d.copy(S);
      else for (; w < d.length; ++w) S[w] = d[w];
      return S;
    } else if (de) {
      var R = new Uint8Array(_);
      if (R.set) R.set(d);
      else for (; w < g; ++w) R[w] = d[w];
      return R;
    }
    return d.length = _, d;
  }
  function wt(d) {
    for (var E = new Array(d), g = 0; g < d; ++g) E[g] = 0;
    return E;
  }
  function Gt(d, E, g) {
    var _ = 1, w = 0, S = 0, R = 0, W = 0, I = d.length, N = de ? new Uint16Array(32) : wt(32);
    for (S = 0; S < 32; ++S) N[S] = 0;
    for (S = I; S < g; ++S) d[S] = 0;
    I = d.length;
    var P = de ? new Uint16Array(I) : wt(I);
    for (S = 0; S < I; ++S)
      N[w = d[S]]++, _ < w && (_ = w), P[S] = 0;
    for (N[0] = 0, S = 1; S <= _; ++S) N[S + 16] = W = W + N[S - 1] << 1;
    for (S = 0; S < I; ++S)
      W = d[S], W != 0 && (P[S] = N[W + 16]++);
    var Z = 0;
    for (S = 0; S < I; ++S)
      if (Z = d[S], Z != 0)
        for (W = Se(P[S], _) >> _ - Z, R = (1 << _ + 4 - Z) - 1; R >= 0; --R)
          E[W | R << Z] = Z & 15 | S << 4;
    return _;
  }
  var jt = de ? new Uint16Array(512) : wt(512), ir = de ? new Uint16Array(32) : wt(32);
  if (!de) {
    for (var Zt = 0; Zt < 512; ++Zt) jt[Zt] = 0;
    for (Zt = 0; Zt < 32; ++Zt) ir[Zt] = 0;
  }
  (function() {
    for (var d = [], E = 0; E < 32; E++) d.push(5);
    Gt(d, ir, 32);
    var g = [];
    for (E = 0; E <= 143; E++) g.push(8);
    for (; E <= 255; E++) g.push(9);
    for (; E <= 279; E++) g.push(7);
    for (; E <= 287; E++) g.push(8);
    Gt(g, jt, 288);
  })();
  var ha = /* @__PURE__ */ function() {
    for (var E = de ? new Uint8Array(32768) : [], g = 0, _ = 0; g < ie.length - 1; ++g)
      for (; _ < ie[g + 1]; ++_) E[_] = g;
    for (; _ < 32768; ++_) E[_] = 29;
    var w = de ? new Uint8Array(259) : [];
    for (g = 0, _ = 0; g < B.length - 1; ++g)
      for (; _ < B[g + 1]; ++_) w[_] = g;
    function S(W, I) {
      for (var N = 0; N < W.length; ) {
        var P = Math.min(65535, W.length - N), Z = N + P == W.length;
        for (I.write_shift(1, +Z), I.write_shift(2, P), I.write_shift(2, ~P & 65535); P-- > 0; ) I[I.l++] = W[N++];
      }
      return I.l;
    }
    function R(W, I) {
      for (var N = 0, P = 0, Z = de ? new Uint16Array(32768) : []; P < W.length; ) {
        var ae = (
          /* data.length - boff; */
          Math.min(65535, W.length - P)
        );
        if (ae < 10) {
          for (N = Et(I, N, +(P + ae == W.length)), N & 7 && (N += 8 - (N & 7)), I.l = N / 8 | 0, I.write_shift(2, ae), I.write_shift(2, ~ae & 65535); ae-- > 0; ) I[I.l++] = W[P++];
          N = I.l * 8;
          continue;
        }
        N = Et(I, N, +(P + ae == W.length) + 2);
        for (var he = 0; ae-- > 0; ) {
          var ee = W[P];
          he = (he << 5 ^ ee) & 32767;
          var oe = -1, we = 0;
          if ((oe = Z[he]) && (oe |= P & -32768, oe > P && (oe -= 32768), oe < P))
            for (; W[oe + we] == W[P + we] && we < 250; ) ++we;
          if (we > 2) {
            ee = w[we], ee <= 22 ? N = Jt(I, N, ne[ee + 1] >> 1) - 1 : (Jt(I, N, 3), N += 5, Jt(I, N, ne[ee - 23] >> 5), N += 3);
            var je = ee < 8 ? 0 : ee - 4 >> 2;
            je > 0 && (On(I, N, we - B[ee]), N += je), ee = E[P - oe], N = Jt(I, N, ne[ee] >> 3), N -= 3;
            var Xe = ee < 4 ? 0 : ee - 2 >> 1;
            Xe > 0 && (On(I, N, P - oe - ie[ee]), N += Xe);
            for (var xt = 0; xt < we; ++xt)
              Z[he] = P & 32767, he = (he << 5 ^ W[P]) & 32767, ++P;
            ae -= we - 1;
          } else
            ee <= 143 ? ee = ee + 48 : N = Bt(I, N, 1), N = Jt(I, N, ne[ee]), Z[he] = P & 32767, ++P;
        }
        N = Jt(I, N, 0) - 1;
      }
      return I.l = (N + 7) / 8 | 0, I.l;
    }
    return function(I, N) {
      return I.length < 8 ? S(I, N) : R(I, N);
    };
  }();
  function en(d) {
    var E = U(50 + Math.floor(d.length * 1.1)), g = ha(d, E);
    return E.slice(0, g);
  }
  var Mr = de ? new Uint16Array(32768) : wt(32768), _r = de ? new Uint16Array(32768) : wt(32768), sr = de ? new Uint16Array(128) : wt(128), lr = 1, Tr = 1;
  function Br(d, E) {
    var g = ke(d, E) + 257;
    E += 5;
    var _ = ke(d, E) + 1;
    E += 5;
    var w = ze(d, E) + 4;
    E += 4;
    for (var S = 0, R = de ? new Uint8Array(19) : wt(19), W = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], I = 1, N = de ? new Uint8Array(8) : wt(8), P = de ? new Uint8Array(8) : wt(8), Z = R.length, ae = 0; ae < w; ++ae)
      R[F[ae]] = S = Te(d, E), I < S && (I = S), N[S]++, E += 3;
    var he = 0;
    for (N[0] = 0, ae = 1; ae <= I; ++ae) P[ae] = he = he + N[ae - 1] << 1;
    for (ae = 0; ae < Z; ++ae) (he = R[ae]) != 0 && (W[ae] = P[he]++);
    var ee = 0;
    for (ae = 0; ae < Z; ++ae)
      if (ee = R[ae], ee != 0) {
        he = ne[W[ae]] >> 8 - ee;
        for (var oe = (1 << 7 - ee) - 1; oe >= 0; --oe) sr[he | oe << ee] = ee & 7 | ae << 3;
      }
    var we = [];
    for (I = 1; we.length < g + _; )
      switch (he = sr[ue(d, E)], E += he & 7, he >>>= 3) {
        case 16:
          for (S = 3 + me(d, E), E += 2, he = we[we.length - 1]; S-- > 0; ) we.push(he);
          break;
        case 17:
          for (S = 3 + Te(d, E), E += 3; S-- > 0; ) we.push(0);
          break;
        case 18:
          for (S = 11 + ue(d, E), E += 7; S-- > 0; ) we.push(0);
          break;
        default:
          we.push(he), I < he && (I = he);
          break;
      }
    var je = we.slice(0, g), Xe = we.slice(g);
    for (ae = g; ae < 286; ++ae) je[ae] = 0;
    for (ae = _; ae < 30; ++ae) Xe[ae] = 0;
    return lr = Gt(je, Mr, 286), Tr = Gt(Xe, _r, 30), E;
  }
  function Er(d, E) {
    if (d[0] == 3 && !(d[1] & 3))
      return [kr(E), 2];
    for (var g = 0, _ = 0, w = p0(E || 1 << 18), S = 0, R = w.length >>> 0, W = 0, I = 0; !(_ & 1); ) {
      if (_ = Te(d, g), g += 3, _ >>> 1)
        _ >> 1 == 1 ? (W = 9, I = 5) : (g = Br(d, g), W = lr, I = Tr);
      else {
        g & 7 && (g += 8 - (g & 7));
        var N = d[g >>> 3] | d[(g >>> 3) + 1] << 8;
        if (g += 32, N > 0)
          for (!E && R < S + N && (w = Lr(w, S + N), R = w.length); N-- > 0; )
            w[S++] = d[g >>> 3], g += 8;
        continue;
      }
      for (; ; ) {
        !E && R < S + 32767 && (w = Lr(w, S + 32767), R = w.length);
        var P = mt(d, g, W), Z = _ >>> 1 == 1 ? jt[P] : Mr[P];
        if (g += Z & 15, Z >>>= 4, !(Z >>> 8 & 255)) w[S++] = Z;
        else {
          if (Z == 256) break;
          Z -= 257;
          var ae = Z < 8 ? 0 : Z - 4 >> 2;
          ae > 5 && (ae = 0);
          var he = S + B[Z];
          ae > 0 && (he += mt(d, g, ae), g += ae), P = mt(d, g, I), Z = _ >>> 1 == 1 ? ir[P] : _r[P], g += Z & 15, Z >>>= 4;
          var ee = Z < 4 ? 0 : Z - 2 >> 1, oe = ie[Z];
          for (ee > 0 && (oe += mt(d, g, ee), g += ee), !E && R < he && (w = Lr(w, he + 100), R = w.length); S < he; )
            w[S] = w[S - oe], ++S;
        }
      }
    }
    return E ? [w, g + 7 >>> 3] : [w.slice(0, S), g + 7 >>> 3];
  }
  function wr(d, E) {
    var g = d.slice(d.l || 0), _ = Er(g, E);
    return d.l += _[1], _[0];
  }
  function tn(d, E) {
    if (d)
      typeof console < "u" && console.error(E);
    else throw new Error(E);
  }
  function In(d, E) {
    var g = (
      /*::(*/
      d
    );
    Dt(g, 0);
    var _ = [], w = [], S = {
      FileIndex: _,
      FullPaths: w
    };
    O(S, { root: E.root });
    for (var R = g.length - 4; (g[R] != 80 || g[R + 1] != 75 || g[R + 2] != 5 || g[R + 3] != 6) && R >= 0; ) --R;
    g.l = R + 4, g.l += 4;
    var W = g.read_shift(2);
    g.l += 6;
    var I = g.read_shift(4);
    for (g.l = I, R = 0; R < W; ++R) {
      g.l += 20;
      var N = g.read_shift(4), P = g.read_shift(4), Z = g.read_shift(2), ae = g.read_shift(2), he = g.read_shift(2);
      g.l += 8;
      var ee = g.read_shift(4), oe = l(
        /*::(*/
        g.slice(g.l + Z, g.l + Z + ae)
        /*:: :any)*/
      );
      g.l += Z + ae + he;
      var we = g.l;
      g.l = ee + 4, da(g, N, P, S, oe), g.l = we;
    }
    return S;
  }
  function da(d, E, g, _, w) {
    d.l += 2;
    var S = d.read_shift(2), R = d.read_shift(2), W = s(d);
    if (S & 8257) throw new Error("Unsupported ZIP encryption");
    for (var I = d.read_shift(4), N = d.read_shift(4), P = d.read_shift(4), Z = d.read_shift(2), ae = d.read_shift(2), he = "", ee = 0; ee < Z; ++ee) he += String.fromCharCode(d[d.l++]);
    if (ae) {
      var oe = l(
        /*::(*/
        d.slice(d.l, d.l + ae)
        /*:: :any)*/
      );
      (oe[21589] || {}).mt && (W = oe[21589].mt), ((w || {})[21589] || {}).mt && (W = w[21589].mt);
    }
    d.l += ae;
    var we = d.slice(d.l, d.l + N);
    switch (R) {
      case 8:
        we = k(d, P);
        break;
      case 0:
        break;
      default:
        throw new Error("Unsupported ZIP Compression method " + R);
    }
    var je = !1;
    S & 8 && (I = d.read_shift(4), I == 134695760 && (I = d.read_shift(4), je = !0), N = d.read_shift(4), P = d.read_shift(4)), N != E && tn(je, "Bad compressed size: " + E + " != " + N), P != g && tn(je, "Bad uncompressed size: " + g + " != " + P), b(_, he, we, { unsafe: !0, mt: W });
  }
  function xa(d, E) {
    var g = E || {}, _ = [], w = [], S = U(1), R = g.compression ? 8 : 0, W = 0, I = 0, N = 0, P = 0, Z = 0, ae = d.FullPaths[0], he = ae, ee = d.FileIndex[0], oe = [], we = 0;
    for (I = 1; I < d.FullPaths.length; ++I)
      if (he = d.FullPaths[I].slice(ae.length), ee = d.FileIndex[I], !(!ee.size || !ee.content || he == "Sh33tJ5")) {
        var je = P, Xe = U(he.length);
        for (N = 0; N < he.length; ++N) Xe.write_shift(1, he.charCodeAt(N) & 127);
        Xe = Xe.slice(0, Xe.l), oe[Z] = nf.buf(
          /*::((*/
          ee.content,
          0
        );
        var xt = ee.content;
        R == 8 && (xt = A(xt)), S = U(30), S.write_shift(4, 67324752), S.write_shift(2, 20), S.write_shift(2, W), S.write_shift(2, R), ee.mt ? i(S, ee.mt) : S.write_shift(4, 0), S.write_shift(-4, oe[Z]), S.write_shift(4, xt.length), S.write_shift(
          4,
          /*::(*/
          ee.content.length
        ), S.write_shift(2, Xe.length), S.write_shift(2, 0), P += S.length, _.push(S), P += Xe.length, _.push(Xe), P += xt.length, _.push(xt), S = U(46), S.write_shift(4, 33639248), S.write_shift(2, 0), S.write_shift(2, 20), S.write_shift(2, W), S.write_shift(2, R), S.write_shift(4, 0), S.write_shift(-4, oe[Z]), S.write_shift(4, xt.length), S.write_shift(
          4,
          /*::(*/
          ee.content.length
        ), S.write_shift(2, Xe.length), S.write_shift(2, 0), S.write_shift(2, 0), S.write_shift(2, 0), S.write_shift(2, 0), S.write_shift(4, 0), S.write_shift(4, je), we += S.l, w.push(S), we += Xe.length, w.push(Xe), ++Z;
      }
    return S = U(22), S.write_shift(4, 101010256), S.write_shift(2, 0), S.write_shift(2, 0), S.write_shift(2, Z), S.write_shift(2, Z), S.write_shift(4, we), S.write_shift(4, P), S.write_shift(2, 0), ct([ct(_), ct(w), S]);
  }
  var fr = {
    htm: "text/html",
    xml: "text/xml",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    mso: "application/x-mso",
    thmx: "application/vnd.ms-officetheme",
    sh33tj5: "application/octet-stream"
  };
  function Sr(d, E) {
    if (d.ctype) return d.ctype;
    var g = d.name || "", _ = g.match(/\.([^\.]+)$/);
    return _ && fr[_[1]] || E && (_ = (g = E).match(/[\.\\]([^\.\\])+$/), _ && fr[_[1]]) ? fr[_[1]] : "application/octet-stream";
  }
  function rn(d) {
    for (var E = mn(d), g = [], _ = 0; _ < E.length; _ += 76) g.push(E.slice(_, _ + 76));
    return g.join(`\r
`) + `\r
`;
  }
  function Rn(d) {
    var E = d.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function(N) {
      var P = N.charCodeAt(0).toString(16).toUpperCase();
      return "=" + (P.length == 1 ? "0" + P : P);
    });
    E = E.replace(/ $/mg, "=20").replace(/\t$/mg, "=09"), E.charAt(0) == `
` && (E = "=0D" + E.slice(1)), E = E.replace(/\r(?!\n)/mg, "=0D").replace(/\n\n/mg, `
=0A`).replace(/([^\r\n])\n/mg, "$1=0A");
    for (var g = [], _ = E.split(`\r
`), w = 0; w < _.length; ++w) {
      var S = _[w];
      if (S.length == 0) {
        g.push("");
        continue;
      }
      for (var R = 0; R < S.length; ) {
        var W = 76, I = S.slice(R, R + W);
        I.charAt(W - 1) == "=" ? W-- : I.charAt(W - 2) == "=" ? W -= 2 : I.charAt(W - 3) == "=" && (W -= 3), I = S.slice(R, R + W), R += W, R < S.length && (I += "="), g.push(I);
      }
    }
    return g.join(`\r
`);
  }
  function va(d) {
    for (var E = [], g = 0; g < d.length; ++g) {
      for (var _ = d[g]; g <= d.length && _.charAt(_.length - 1) == "="; ) _ = _.slice(0, _.length - 1) + d[++g];
      E.push(_);
    }
    for (var w = 0; w < E.length; ++w) E[w] = E[w].replace(/[=][0-9A-Fa-f]{2}/g, function(S) {
      return String.fromCharCode(parseInt(S.slice(1), 16));
    });
    return $t(E.join(`\r
`));
  }
  function pa(d, E, g) {
    for (var _ = "", w = "", S = "", R, W = 0; W < 10; ++W) {
      var I = E[W];
      if (!I || I.match(/^\s*$/)) break;
      var N = I.match(/^(.*?):\s*([^\s].*)$/);
      if (N) switch (N[1].toLowerCase()) {
        case "content-location":
          _ = N[2].trim();
          break;
        case "content-type":
          S = N[2].trim();
          break;
        case "content-transfer-encoding":
          w = N[2].trim();
          break;
      }
    }
    switch (++W, w.toLowerCase()) {
      case "base64":
        R = $t(rr(E.slice(W).join("")));
        break;
      case "quoted-printable":
        R = va(E.slice(W));
        break;
      default:
        throw new Error("Unsupported Content-Transfer-Encoding " + w);
    }
    var P = b(d, _.slice(g.length), R, { unsafe: !0 });
    S && (P.ctype = S);
  }
  function ma(d, E) {
    if (Ve(d.slice(0, 13)).toLowerCase() != "mime-version:") throw new Error("Unsupported MAD header");
    var g = E && E.root || "", _ = (Pe && Buffer.isBuffer(d) ? d.toString("binary") : Ve(d)).split(`\r
`), w = 0, S = "";
    for (w = 0; w < _.length; ++w)
      if (S = _[w], !!/^Content-Location:/i.test(S) && (S = S.slice(S.indexOf("file")), g || (g = S.slice(0, S.lastIndexOf("/") + 1)), S.slice(0, g.length) != g))
        for (; g.length > 0 && (g = g.slice(0, g.length - 1), g = g.slice(0, g.lastIndexOf("/") + 1), S.slice(0, g.length) != g); )
          ;
    var R = (_[1] || "").match(/boundary="(.*?)"/);
    if (!R) throw new Error("MAD cannot find boundary");
    var W = "--" + (R[1] || ""), I = [], N = [], P = {
      FileIndex: I,
      FullPaths: N
    };
    O(P);
    var Z, ae = 0;
    for (w = 0; w < _.length; ++w) {
      var he = _[w];
      he !== W && he !== W + "--" || (ae++ && pa(P, _.slice(Z, w), g), Z = w);
    }
    return P;
  }
  function ga(d, E) {
    var g = E || {}, _ = g.boundary || "SheetJS";
    _ = "------=" + _;
    for (var w = [
      "MIME-Version: 1.0",
      'Content-Type: multipart/related; boundary="' + _.slice(2) + '"',
      "",
      "",
      ""
    ], S = d.FullPaths[0], R = S, W = d.FileIndex[0], I = 1; I < d.FullPaths.length; ++I)
      if (R = d.FullPaths[I].slice(S.length), W = d.FileIndex[I], !(!W.size || !W.content || R == "Sh33tJ5")) {
        R = R.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function(we) {
          return "_x" + we.charCodeAt(0).toString(16) + "_";
        }).replace(/[\u0080-\uFFFF]/g, function(we) {
          return "_u" + we.charCodeAt(0).toString(16) + "_";
        });
        for (var N = W.content, P = Pe && Buffer.isBuffer(N) ? N.toString("binary") : Ve(N), Z = 0, ae = Math.min(1024, P.length), he = 0, ee = 0; ee <= ae; ++ee) (he = P.charCodeAt(ee)) >= 32 && he < 128 && ++Z;
        var oe = Z >= ae * 4 / 5;
        w.push(_), w.push("Content-Location: " + (g.root || "file:///C:/SheetJS/") + R), w.push("Content-Transfer-Encoding: " + (oe ? "quoted-printable" : "base64")), w.push("Content-Type: " + Sr(W, R)), w.push(""), w.push(oe ? Rn(P) : rn(P));
      }
    return w.push(_ + `--\r
`), w.join(`\r
`);
  }
  function ce(d) {
    var E = {};
    return O(E, d), E;
  }
  function b(d, E, g, _) {
    var w = _ && _.unsafe;
    w || O(d);
    var S = !w && $e.find(d, E);
    if (!S) {
      var R = d.FullPaths[0];
      E.slice(0, R.length) == R ? R = E : (R.slice(-1) != "/" && (R += "/"), R = (R + E).replace("//", "/")), S = { name: a(E), type: 2 }, d.FileIndex.push(S), d.FullPaths.push(R), w || $e.utils.cfb_gc(d);
    }
    return S.content = g, S.size = g ? g.length : 0, _ && (_.CLSID && (S.clsid = _.CLSID), _.mt && (S.mt = _.mt), _.ct && (S.ct = _.ct)), S;
  }
  function J(d, E) {
    O(d);
    var g = $e.find(d, E);
    if (g) {
      for (var _ = 0; _ < d.FileIndex.length; ++_) if (d.FileIndex[_] == g)
        return d.FileIndex.splice(_, 1), d.FullPaths.splice(_, 1), !0;
    }
    return !1;
  }
  function Oe(d, E, g) {
    O(d);
    var _ = $e.find(d, E);
    if (_) {
      for (var w = 0; w < d.FileIndex.length; ++w) if (d.FileIndex[w] == _)
        return d.FileIndex[w].name = a(g), d.FullPaths[w] = g, !0;
    }
    return !1;
  }
  function ye(d) {
    M(d, !0);
  }
  return r.find = z, r.read = se, r.parse = c, r.write = rt, r.writeFile = lt, r.utils = {
    cfb_new: ce,
    cfb_add: b,
    cfb_del: J,
    cfb_mov: Oe,
    cfb_gc: ye,
    ReadShift: un,
    CheckField: Li,
    prep_blob: Dt,
    bconcat: ct,
    use_zlib: m,
    _deflateRaw: en,
    _inflateRaw: wr,
    consts: Le
  }, r;
}();
function af(e) {
  return typeof e == "string" ? aa(e) : Array.isArray(e) ? Ol(e) : e;
}
function yn(e, r, t) {
  if (typeof Deno < "u") {
    if (t && typeof r == "string") switch (t) {
      case "utf8":
        r = new TextEncoder(t).encode(r);
        break;
      case "binary":
        r = aa(r);
        break;
      default:
        throw new Error("Unsupported encoding " + t);
    }
    return Deno.writeFileSync(e, r);
  }
  var n = t == "utf8" ? _n(r) : r;
  if (typeof IE_SaveFile < "u") return IE_SaveFile(n, e);
  if (typeof Blob < "u") {
    var a = new Blob([af(n)], { type: "application/octet-stream" });
    if (typeof navigator < "u" && navigator.msSaveBlob) return navigator.msSaveBlob(a, e);
    if (typeof saveAs < "u") return saveAs(a, e);
    if (typeof URL < "u" && typeof document < "u" && document.createElement && URL.createObjectURL) {
      var i = URL.createObjectURL(a);
      if (typeof chrome == "object" && typeof (chrome.downloads || {}).download == "function")
        return URL.revokeObjectURL && typeof setTimeout < "u" && setTimeout(function() {
          URL.revokeObjectURL(i);
        }, 6e4), chrome.downloads.download({ url: i, filename: e, saveAs: !0 });
      var s = document.createElement("a");
      if (s.download != null)
        return s.download = e, s.href = i, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL && typeof setTimeout < "u" && setTimeout(function() {
          URL.revokeObjectURL(i);
        }, 6e4), i;
    }
  }
  if (typeof $ < "u" && typeof File < "u" && typeof Folder < "u") try {
    var l = File(e);
    return l.open("w"), l.encoding = "binary", Array.isArray(r) && (r = An(r)), l.write(r), l.close(), r;
  } catch (f) {
    if (!f.message || !f.message.match(/onstruct/)) throw f;
  }
  throw new Error("cannot save file " + e);
}
function dt(e) {
  for (var r = Object.keys(e), t = [], n = 0; n < r.length; ++n) Object.prototype.hasOwnProperty.call(e, r[n]) && t.push(r[n]);
  return t;
}
function A0(e, r) {
  for (var t = [], n = dt(e), a = 0; a !== n.length; ++a) t[e[n[a]][r]] == null && (t[e[n[a]][r]] = n[a]);
  return t;
}
function $a(e) {
  for (var r = [], t = dt(e), n = 0; n !== t.length; ++n) r[e[t[n]]] = t[n];
  return r;
}
function la(e) {
  for (var r = [], t = dt(e), n = 0; n !== t.length; ++n) r[e[t[n]]] = parseInt(t[n], 10);
  return r;
}
function sf(e) {
  for (var r = [], t = dt(e), n = 0; n !== t.length; ++n)
    r[e[t[n]]] == null && (r[e[t[n]]] = []), r[e[t[n]]].push(t[n]);
  return r;
}
var Yn = /* @__PURE__ */ new Date(1899, 11, 30, 0, 0, 0);
function At(e, r) {
  var t = /* @__PURE__ */ e.getTime(), n = /* @__PURE__ */ Yn.getTime() + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ Yn.getTimezoneOffset()) * 6e4;
  return (t - n) / (24 * 60 * 60 * 1e3);
}
var gi = /* @__PURE__ */ new Date(), lf = /* @__PURE__ */ Yn.getTime() + (/* @__PURE__ */ gi.getTimezoneOffset() - /* @__PURE__ */ Yn.getTimezoneOffset()) * 6e4, y0 = /* @__PURE__ */ gi.getTimezoneOffset();
function _i(e) {
  var r = /* @__PURE__ */ new Date();
  return r.setTime(e * 24 * 60 * 60 * 1e3 + lf), r.getTimezoneOffset() !== y0 && r.setTime(r.getTime() + (r.getTimezoneOffset() - y0) * 6e4), r;
}
var F0 = /* @__PURE__ */ new Date("2017-02-19T19:06:09.000Z"), Ti = /* @__PURE__ */ isNaN(/* @__PURE__ */ F0.getFullYear()) ? /* @__PURE__ */ new Date("2/19/17") : F0, ff = /* @__PURE__ */ Ti.getFullYear() == 2017;
function Tt(e, r) {
  var t = new Date(e);
  if (ff)
    return r > 0 ? t.setTime(t.getTime() + t.getTimezoneOffset() * 60 * 1e3) : r < 0 && t.setTime(t.getTime() - t.getTimezoneOffset() * 60 * 1e3), t;
  if (e instanceof Date) return e;
  if (Ti.getFullYear() == 1917 && !isNaN(t.getFullYear())) {
    var n = t.getFullYear();
    return e.indexOf("" + n) > -1 || t.setFullYear(t.getFullYear() + 100), t;
  }
  var a = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"], i = new Date(+a[0], +a[1] - 1, +a[2], +a[3] || 0, +a[4] || 0, +a[5] || 0);
  return e.indexOf("Z") > -1 && (i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3)), i;
}
function fa(e, r) {
  if (Pe && Buffer.isBuffer(e))
    return e.toString("binary");
  if (typeof TextDecoder < "u") try {
    var t = {
      "€": "",
      "‚": "",
      ƒ: "",
      "„": "",
      "…": "",
      "†": "",
      "‡": "",
      "ˆ": "",
      "‰": "",
      Š: "",
      "‹": "",
      Œ: "",
      Ž: "",
      "‘": "",
      "’": "",
      "“": "",
      "”": "",
      "•": "",
      "–": "",
      "—": "",
      "˜": "",
      "™": "",
      š: "",
      "›": "",
      œ: "",
      ž: "",
      Ÿ: ""
    };
    return Array.isArray(e) && (e = new Uint8Array(e)), new TextDecoder("latin1").decode(e).replace(/[€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ]/g, function(i) {
      return t[i] || i;
    });
  } catch {
  }
  for (var n = [], a = 0; a != e.length; ++a) n.push(String.fromCharCode(e[a]));
  return n.join("");
}
function yt(e) {
  if (typeof JSON < "u" && !Array.isArray(e)) return JSON.parse(JSON.stringify(e));
  if (typeof e != "object" || e == null) return e;
  if (e instanceof Date) return new Date(e.getTime());
  var r = {};
  for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = yt(e[t]));
  return r;
}
function Ke(e, r) {
  for (var t = ""; t.length < r; ) t += e;
  return t;
}
function er(e) {
  var r = Number(e);
  if (!isNaN(r)) return isFinite(r) ? r : NaN;
  if (!/\d/.test(e)) return r;
  var t = 1, n = e.replace(/([\d]),([\d])/g, "$1$2").replace(/[$]/g, "").replace(/[%]/g, function() {
    return t *= 100, "";
  });
  return !isNaN(r = Number(n)) || (n = n.replace(/[(](.*)[)]/, function(a, i) {
    return t = -t, i;
  }), !isNaN(r = Number(n))) ? r / t : r;
}
var of = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
function gn(e) {
  var r = new Date(e), t = /* @__PURE__ */ new Date(NaN), n = r.getYear(), a = r.getMonth(), i = r.getDate();
  if (isNaN(i)) return t;
  var s = e.toLowerCase();
  if (s.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
    if (s = s.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, ""), s.length > 3 && of.indexOf(s) == -1) return t;
  } else if (s.match(/[a-z]/)) return t;
  return n < 0 || n > 8099 ? t : (a > 0 || i > 1) && n != 101 ? r : e.match(/[^-0-9:,\/\\]/) ? t : r;
}
function Ae(e, r, t) {
  if (e.FullPaths) {
    if (typeof t == "string") {
      var n;
      return Pe ? n = ar(t) : n = Il(t), $e.utils.cfb_add(e, r, n);
    }
    $e.utils.cfb_add(e, r, t);
  } else e.file(r, t);
}
function Va() {
  return $e.utils.cfb_new();
}
var et = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`, cf = {
  "&quot;": '"',
  "&apos;": "'",
  "&gt;": ">",
  "&lt;": "<",
  "&amp;": "&"
}, Ha = /* @__PURE__ */ $a(cf), Ga = /[&<>'"]/g, uf = /[\u0000-\u0008\u000b-\u001f]/g;
function be(e) {
  var r = e + "";
  return r.replace(Ga, function(t) {
    return Ha[t];
  }).replace(uf, function(t) {
    return "_x" + ("000" + t.charCodeAt(0).toString(16)).slice(-4) + "_";
  });
}
function k0(e) {
  return be(e).replace(/ /g, "_x0020_");
}
var Ei = /[\u0000-\u001f]/g;
function hf(e) {
  var r = e + "";
  return r.replace(Ga, function(t) {
    return Ha[t];
  }).replace(/\n/g, "<br/>").replace(Ei, function(t) {
    return "&#x" + ("000" + t.charCodeAt(0).toString(16)).slice(-4) + ";";
  });
}
function df(e) {
  var r = e + "";
  return r.replace(Ga, function(t) {
    return Ha[t];
  }).replace(Ei, function(t) {
    return "&#x" + t.charCodeAt(0).toString(16).toUpperCase() + ";";
  });
}
function xf(e) {
  return e.replace(/(\r\n|[\r\n])/g, "&#10;");
}
function vf(e) {
  switch (e) {
    case 1:
    case !0:
    case "1":
    case "true":
    case "TRUE":
      return !0;
    default:
      return !1;
  }
}
function wa(e) {
  for (var r = "", t = 0, n = 0, a = 0, i = 0, s = 0, l = 0; t < e.length; ) {
    if (n = e.charCodeAt(t++), n < 128) {
      r += String.fromCharCode(n);
      continue;
    }
    if (a = e.charCodeAt(t++), n > 191 && n < 224) {
      s = (n & 31) << 6, s |= a & 63, r += String.fromCharCode(s);
      continue;
    }
    if (i = e.charCodeAt(t++), n < 240) {
      r += String.fromCharCode((n & 15) << 12 | (a & 63) << 6 | i & 63);
      continue;
    }
    s = e.charCodeAt(t++), l = ((n & 7) << 18 | (a & 63) << 12 | (i & 63) << 6 | s & 63) - 65536, r += String.fromCharCode(55296 + (l >>> 10 & 1023)), r += String.fromCharCode(56320 + (l & 1023));
  }
  return r;
}
function C0(e) {
  var r = kr(2 * e.length), t, n, a = 1, i = 0, s = 0, l;
  for (n = 0; n < e.length; n += a)
    a = 1, (l = e.charCodeAt(n)) < 128 ? t = l : l < 224 ? (t = (l & 31) * 64 + (e.charCodeAt(n + 1) & 63), a = 2) : l < 240 ? (t = (l & 15) * 4096 + (e.charCodeAt(n + 1) & 63) * 64 + (e.charCodeAt(n + 2) & 63), a = 3) : (a = 4, t = (l & 7) * 262144 + (e.charCodeAt(n + 1) & 63) * 4096 + (e.charCodeAt(n + 2) & 63) * 64 + (e.charCodeAt(n + 3) & 63), t -= 65536, s = 55296 + (t >>> 10 & 1023), t = 56320 + (t & 1023)), s !== 0 && (r[i++] = s & 255, r[i++] = s >>> 8, s = 0), r[i++] = t % 256, r[i++] = t >>> 8;
  return r.slice(0, i).toString("ucs2");
}
function D0(e) {
  return ar(e, "binary").toString("utf8");
}
var bn = "foo bar bazâð£", cn = Pe && (/* @__PURE__ */ D0(bn) == /* @__PURE__ */ wa(bn) && D0 || /* @__PURE__ */ C0(bn) == /* @__PURE__ */ wa(bn) && C0) || wa, _n = Pe ? function(e) {
  return ar(e, "utf8").toString("binary");
} : function(e) {
  for (var r = [], t = 0, n = 0, a = 0; t < e.length; )
    switch (n = e.charCodeAt(t++), !0) {
      case n < 128:
        r.push(String.fromCharCode(n));
        break;
      case n < 2048:
        r.push(String.fromCharCode(192 + (n >> 6))), r.push(String.fromCharCode(128 + (n & 63)));
        break;
      case (n >= 55296 && n < 57344):
        n -= 55296, a = e.charCodeAt(t++) - 56320 + (n << 10), r.push(String.fromCharCode(240 + (a >> 18 & 7))), r.push(String.fromCharCode(144 + (a >> 12 & 63))), r.push(String.fromCharCode(128 + (a >> 6 & 63))), r.push(String.fromCharCode(128 + (a & 63)));
        break;
      default:
        r.push(String.fromCharCode(224 + (n >> 12))), r.push(String.fromCharCode(128 + (n >> 6 & 63))), r.push(String.fromCharCode(128 + (n & 63)));
    }
  return r.join("");
}, pf = /* @__PURE__ */ function() {
  var e = [
    ["nbsp", " "],
    ["middot", "·"],
    ["quot", '"'],
    ["apos", "'"],
    ["gt", ">"],
    ["lt", "<"],
    ["amp", "&"]
  ].map(function(r) {
    return [new RegExp("&" + r[0] + ";", "ig"), r[1]];
  });
  return function(t) {
    for (var n = t.replace(/^[\t\n\r ]+/, "").replace(/[\t\n\r ]+$/, "").replace(/>\s+/g, ">").replace(/\s+</g, "<").replace(/[\t\n\r ]+/g, " ").replace(/<\s*[bB][rR]\s*\/?>/g, `
`).replace(/<[^>]*>/g, ""), a = 0; a < e.length; ++a) n = n.replace(e[a][0], e[a][1]);
    return n;
  };
}(), wi = /(^\s|\s$|\n)/;
function ut(e, r) {
  return "<" + e + (r.match(wi) ? ' xml:space="preserve"' : "") + ">" + r + "</" + e + ">";
}
function Tn(e) {
  return dt(e).map(function(r) {
    return " " + r + '="' + e[r] + '"';
  }).join("");
}
function te(e, r, t) {
  return "<" + e + (t != null ? Tn(t) : "") + (r != null ? (r.match(wi) ? ' xml:space="preserve"' : "") + ">" + r + "</" + e : "/") + ">";
}
function Pa(e, r) {
  try {
    return e.toISOString().replace(/\.\d*/, "");
  } catch (t) {
    if (r) throw t;
  }
  return "";
}
function mf(e, r) {
  switch (typeof e) {
    case "string":
      var t = te("vt:lpwstr", be(e));
      return t = t.replace(/&quot;/g, "_x0022_"), t;
    case "number":
      return te((e | 0) == e ? "vt:i4" : "vt:r8", be(String(e)));
    case "boolean":
      return te("vt:bool", e ? "true" : "false");
  }
  if (e instanceof Date) return te("vt:filetime", Pa(e));
  throw new Error("Unable to serialize " + e);
}
var at = {
  CORE_PROPS: "http://schemas.openxmlformats.org/package/2006/metadata/core-properties",
  CUST_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
  EXT_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
  CT: "http://schemas.openxmlformats.org/package/2006/content-types",
  RELS: "http://schemas.openxmlformats.org/package/2006/relationships",
  TCMNT: "http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments",
  dc: "http://purl.org/dc/elements/1.1/",
  dcterms: "http://purl.org/dc/terms/",
  dcmitype: "http://purl.org/dc/dcmitype/",
  r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
  vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
  xsi: "http://www.w3.org/2001/XMLSchema-instance",
  xsd: "http://www.w3.org/2001/XMLSchema"
}, Jr = [
  "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  "http://purl.oclc.org/ooxml/spreadsheetml/main",
  "http://schemas.microsoft.com/office/excel/2006/main",
  "http://schemas.microsoft.com/office/excel/2006/2"
], Ot = {
  o: "urn:schemas-microsoft-com:office:office",
  x: "urn:schemas-microsoft-com:office:excel",
  ss: "urn:schemas-microsoft-com:office:spreadsheet",
  dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
  mv: "http://macVmlSchemaUri",
  v: "urn:schemas-microsoft-com:vml",
  html: "http://www.w3.org/TR/REC-html40"
};
function gf(e, r) {
  for (var t = 1 - 2 * (e[r + 7] >>> 7), n = ((e[r + 7] & 127) << 4) + (e[r + 6] >>> 4 & 15), a = e[r + 6] & 15, i = 5; i >= 0; --i) a = a * 256 + e[r + i];
  return n == 2047 ? a == 0 ? t * (1 / 0) : NaN : (n == 0 ? n = -1022 : (n -= 1023, a += Math.pow(2, 52)), t * Math.pow(2, n - 52) * a);
}
function _f(e, r, t) {
  var n = (r < 0 || 1 / r == -1 / 0 ? 1 : 0) << 7, a = 0, i = 0, s = n ? -r : r;
  isFinite(s) ? s == 0 ? a = i = 0 : (a = Math.floor(Math.log(s) / Math.LN2), i = s * Math.pow(2, 52 - a), a <= -1023 && (!isFinite(i) || i < Math.pow(2, 52)) ? a = -1022 : (i -= Math.pow(2, 52), a += 1023)) : (a = 2047, i = isNaN(r) ? 26985 : 0);
  for (var l = 0; l <= 5; ++l, i /= 256) e[t + l] = i & 255;
  e[t + 6] = (a & 15) << 4 | i & 15, e[t + 7] = a >> 4 | n;
}
var O0 = function(e) {
  for (var r = [], t = 10240, n = 0; n < e[0].length; ++n) if (e[0][n]) for (var a = 0, i = e[0][n].length; a < i; a += t) r.push.apply(r, e[0][n].slice(a, a + t));
  return r;
}, I0 = Pe ? function(e) {
  return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0].map(function(r) {
    return Buffer.isBuffer(r) ? r : ar(r);
  })) : O0(e);
} : O0, R0 = function(e, r, t) {
  for (var n = [], a = r; a < t; a += 2) n.push(String.fromCharCode(fn(e, a)));
  return n.join("").replace(on, "");
}, ja = Pe ? function(e, r, t) {
  return Buffer.isBuffer(e) ? e.toString("utf16le", r, t).replace(on, "") : R0(e, r, t);
} : R0, N0 = function(e, r, t) {
  for (var n = [], a = r; a < r + t; ++a) n.push(("0" + e[a].toString(16)).slice(-2));
  return n.join("");
}, Si = Pe ? function(e, r, t) {
  return Buffer.isBuffer(e) ? e.toString("hex", r, r + t) : N0(e, r, t);
} : N0, P0 = function(e, r, t) {
  for (var n = [], a = r; a < t; a++) n.push(String.fromCharCode($r(e, a)));
  return n.join("");
}, Fn = Pe ? function(r, t, n) {
  return Buffer.isBuffer(r) ? r.toString("utf8", t, n) : P0(r, t, n);
} : P0, Ai = function(e, r) {
  var t = It(e, r);
  return t > 0 ? Fn(e, r + 4, r + 4 + t - 1) : "";
}, yi = Ai, Fi = function(e, r) {
  var t = It(e, r);
  return t > 0 ? Fn(e, r + 4, r + 4 + t - 1) : "";
}, ki = Fi, Ci = function(e, r) {
  var t = 2 * It(e, r);
  return t > 0 ? Fn(e, r + 4, r + 4 + t - 1) : "";
}, Di = Ci, Oi = function(r, t) {
  var n = It(r, t);
  return n > 0 ? ja(r, t + 4, t + 4 + n) : "";
}, Ii = Oi, Ri = function(e, r) {
  var t = It(e, r);
  return t > 0 ? Fn(e, r + 4, r + 4 + t) : "";
}, Ni = Ri, Pi = function(e, r) {
  return gf(e, r);
}, Kn = Pi, Xa = function(r) {
  return Array.isArray(r) || typeof Uint8Array < "u" && r instanceof Uint8Array;
};
Pe && (yi = function(r, t) {
  if (!Buffer.isBuffer(r)) return Ai(r, t);
  var n = r.readUInt32LE(t);
  return n > 0 ? r.toString("utf8", t + 4, t + 4 + n - 1) : "";
}, ki = function(r, t) {
  if (!Buffer.isBuffer(r)) return Fi(r, t);
  var n = r.readUInt32LE(t);
  return n > 0 ? r.toString("utf8", t + 4, t + 4 + n - 1) : "";
}, Di = function(r, t) {
  if (!Buffer.isBuffer(r)) return Ci(r, t);
  var n = 2 * r.readUInt32LE(t);
  return r.toString("utf16le", t + 4, t + 4 + n - 1);
}, Ii = function(r, t) {
  if (!Buffer.isBuffer(r)) return Oi(r, t);
  var n = r.readUInt32LE(t);
  return r.toString("utf16le", t + 4, t + 4 + n);
}, Ni = function(r, t) {
  if (!Buffer.isBuffer(r)) return Ri(r, t);
  var n = r.readUInt32LE(t);
  return r.toString("utf8", t + 4, t + 4 + n);
}, Kn = function(r, t) {
  return Buffer.isBuffer(r) ? r.readDoubleLE(t) : Pi(r, t);
}, Xa = function(r) {
  return Buffer.isBuffer(r) || Array.isArray(r) || typeof Uint8Array < "u" && r instanceof Uint8Array;
});
var $r = function(e, r) {
  return e[r];
}, fn = function(e, r) {
  return e[r + 1] * 256 + e[r];
}, Tf = function(e, r) {
  var t = e[r + 1] * 256 + e[r];
  return t < 32768 ? t : (65535 - t + 1) * -1;
}, It = function(e, r) {
  return e[r + 3] * (1 << 24) + (e[r + 2] << 16) + (e[r + 1] << 8) + e[r];
}, yr = function(e, r) {
  return e[r + 3] << 24 | e[r + 2] << 16 | e[r + 1] << 8 | e[r];
}, Ef = function(e, r) {
  return e[r] << 24 | e[r + 1] << 16 | e[r + 2] << 8 | e[r + 3];
};
function un(e, r) {
  var t = "", n, a, i = [], s, l, f, o;
  switch (r) {
    case "dbcs":
      if (o = this.l, Pe && Buffer.isBuffer(this)) t = this.slice(this.l, this.l + 2 * e).toString("utf16le");
      else for (f = 0; f < e; ++f)
        t += String.fromCharCode(fn(this, o)), o += 2;
      e *= 2;
      break;
    case "utf8":
      t = Fn(this, this.l, this.l + e);
      break;
    case "utf16le":
      e *= 2, t = ja(this, this.l, this.l + e);
      break;
    case "wstr":
      return un.call(this, e, "dbcs");
    case "lpstr-ansi":
      t = yi(this, this.l), e = 4 + It(this, this.l);
      break;
    case "lpstr-cp":
      t = ki(this, this.l), e = 4 + It(this, this.l);
      break;
    case "lpwstr":
      t = Di(this, this.l), e = 4 + 2 * It(this, this.l);
      break;
    case "lpp4":
      e = 4 + It(this, this.l), t = Ii(this, this.l), e & 2 && (e += 2);
      break;
    case "8lpp4":
      e = 4 + It(this, this.l), t = Ni(this, this.l), e & 3 && (e += 4 - (e & 3));
      break;
    case "cstr":
      for (e = 0, t = ""; (s = $r(this, this.l + e++)) !== 0; ) i.push(Ln(s));
      t = i.join("");
      break;
    case "_wstr":
      for (e = 0, t = ""; (s = fn(this, this.l + e)) !== 0; )
        i.push(Ln(s)), e += 2;
      e += 2, t = i.join("");
      break;
    case "dbcs-cont":
      for (t = "", o = this.l, f = 0; f < e; ++f) {
        if (this.lens && this.lens.indexOf(o) !== -1)
          return s = $r(this, o), this.l = o + 1, l = un.call(this, e - f, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + l;
        i.push(Ln(fn(this, o))), o += 2;
      }
      t = i.join(""), e *= 2;
      break;
    case "cpstr":
    case "sbcs-cont":
      for (t = "", o = this.l, f = 0; f != e; ++f) {
        if (this.lens && this.lens.indexOf(o) !== -1)
          return s = $r(this, o), this.l = o + 1, l = un.call(this, e - f, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + l;
        i.push(Ln($r(this, o))), o += 1;
      }
      t = i.join("");
      break;
    default:
      switch (e) {
        case 1:
          return n = $r(this, this.l), this.l++, n;
        case 2:
          return n = (r === "i" ? Tf : fn)(this, this.l), this.l += 2, n;
        case 4:
        case -4:
          return r === "i" || !(this[this.l + 3] & 128) ? (n = (e > 0 ? yr : Ef)(this, this.l), this.l += 4, n) : (a = It(this, this.l), this.l += 4, a);
        case 8:
        case -8:
          if (r === "f")
            return e == 8 ? a = Kn(this, this.l) : a = Kn([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0), this.l += 8, a;
          e = 8;
        case 16:
          t = Si(this, this.l, e);
          break;
      }
  }
  return this.l += e, t;
}
var wf = function(e, r, t) {
  e[t] = r & 255, e[t + 1] = r >>> 8 & 255, e[t + 2] = r >>> 16 & 255, e[t + 3] = r >>> 24 & 255;
}, Sf = function(e, r, t) {
  e[t] = r & 255, e[t + 1] = r >> 8 & 255, e[t + 2] = r >> 16 & 255, e[t + 3] = r >> 24 & 255;
}, Af = function(e, r, t) {
  e[t] = r & 255, e[t + 1] = r >>> 8 & 255;
};
function yf(e, r, t) {
  var n = 0, a = 0;
  if (t === "dbcs") {
    for (a = 0; a != r.length; ++a) Af(this, r.charCodeAt(a), this.l + 2 * a);
    n = 2 * r.length;
  } else if (t === "sbcs") {
    for (r = r.replace(/[^\x00-\x7F]/g, "_"), a = 0; a != r.length; ++a) this[this.l + a] = r.charCodeAt(a) & 255;
    n = r.length;
  } else if (t === "hex") {
    for (; a < e; ++a)
      this[this.l++] = parseInt(r.slice(2 * a, 2 * a + 2), 16) || 0;
    return this;
  } else if (t === "utf16le") {
    var i = Math.min(this.l + e, this.length);
    for (a = 0; a < Math.min(r.length, e); ++a) {
      var s = r.charCodeAt(a);
      this[this.l++] = s & 255, this[this.l++] = s >> 8;
    }
    for (; this.l < i; ) this[this.l++] = 0;
    return this;
  } else switch (e) {
    case 1:
      n = 1, this[this.l] = r & 255;
      break;
    case 2:
      n = 2, this[this.l] = r & 255, r >>>= 8, this[this.l + 1] = r & 255;
      break;
    case 3:
      n = 3, this[this.l] = r & 255, r >>>= 8, this[this.l + 1] = r & 255, r >>>= 8, this[this.l + 2] = r & 255;
      break;
    case 4:
      n = 4, wf(this, r, this.l);
      break;
    case 8:
      if (n = 8, t === "f") {
        _f(this, r, this.l);
        break;
      }
    case 16:
      break;
    case -4:
      n = 4, Sf(this, r, this.l);
      break;
  }
  return this.l += n, this;
}
function Li(e, r) {
  var t = Si(this, this.l, e.length >> 1);
  if (t !== e) throw new Error(r + "Expected " + e + " saw " + t);
  this.l += e.length >> 1;
}
function Dt(e, r) {
  e.l = r, e.read_shift = /*::(*/
  un, e.chk = Li, e.write_shift = yf;
}
function Kt(e, r) {
  e.l += r;
}
function U(e) {
  var r = kr(e);
  return Dt(r, 0), r;
}
function St() {
  var e = [], r = Pe ? 256 : 2048, t = function(o) {
    var c = U(o);
    return Dt(c, 0), c;
  }, n = t(r), a = function() {
    n && (n.length > n.l && (n = n.slice(0, n.l), n.l = n.length), n.length > 0 && e.push(n), n = null);
  }, i = function(o) {
    return n && o < n.length - n.l ? n : (a(), n = t(Math.max(o + 1, r)));
  }, s = function() {
    return a(), ct(e);
  }, l = function(o) {
    a(), n = o, n.l == null && (n.l = n.length), i(r);
  };
  return { next: i, push: l, end: s, _bufs: e };
}
function j(e, r, t, n) {
  var a = +r, i;
  if (!isNaN(a)) {
    n || (n = _d[a].p || (t || []).length || 0), i = 1 + (a >= 128 ? 1 : 0) + 1, n >= 128 && ++i, n >= 16384 && ++i, n >= 2097152 && ++i;
    var s = e.next(i);
    a <= 127 ? s.write_shift(1, a) : (s.write_shift(1, (a & 127) + 128), s.write_shift(1, a >> 7));
    for (var l = 0; l != 4; ++l)
      if (n >= 128)
        s.write_shift(1, (n & 127) + 128), n >>= 7;
      else {
        s.write_shift(1, n);
        break;
      }
    /*:: length != null &&*/
    n > 0 && Xa(t) && e.push(t);
  }
}
function hn(e, r, t) {
  var n = yt(e);
  if (r.s ? (n.cRel && (n.c += r.s.c), n.rRel && (n.r += r.s.r)) : (n.cRel && (n.c += r.c), n.rRel && (n.r += r.r)), !t || t.biff < 12) {
    for (; n.c >= 256; ) n.c -= 256;
    for (; n.r >= 65536; ) n.r -= 65536;
  }
  return n;
}
function L0(e, r, t) {
  var n = yt(e);
  return n.s = hn(n.s, r.s, t), n.e = hn(n.e, r.s, t), n;
}
function dn(e, r) {
  if (e.cRel && e.c < 0)
    for (e = yt(e); e.c < 0; ) e.c += r > 8 ? 16384 : 256;
  if (e.rRel && e.r < 0)
    for (e = yt(e); e.r < 0; ) e.r += r > 8 ? 1048576 : r > 5 ? 65536 : 16384;
  var t = Ue(e);
  return !e.cRel && e.cRel != null && (t = Cf(t)), !e.rRel && e.rRel != null && (t = Ff(t)), t;
}
function Sa(e, r) {
  return e.s.r == 0 && !e.s.rRel && e.e.r == (r.biff >= 12 ? 1048575 : r.biff >= 8 ? 65536 : 16384) && !e.e.rRel ? (e.s.cRel ? "" : "$") + vt(e.s.c) + ":" + (e.e.cRel ? "" : "$") + vt(e.e.c) : e.s.c == 0 && !e.s.cRel && e.e.c == (r.biff >= 12 ? 16383 : 255) && !e.e.cRel ? (e.s.rRel ? "" : "$") + ht(e.s.r) + ":" + (e.e.rRel ? "" : "$") + ht(e.e.r) : dn(e.s, r.biff) + ":" + dn(e.e, r.biff);
}
function za(e) {
  return parseInt(kf(e), 10) - 1;
}
function ht(e) {
  return "" + (e + 1);
}
function Ff(e) {
  return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2");
}
function kf(e) {
  return e.replace(/\$(\d+)$/, "$1");
}
function Ya(e) {
  for (var r = Df(e), t = 0, n = 0; n !== r.length; ++n) t = 26 * t + r.charCodeAt(n) - 64;
  return t - 1;
}
function vt(e) {
  if (e < 0) throw new Error("invalid column " + e);
  var r = "";
  for (++e; e; e = Math.floor((e - 1) / 26)) r = String.fromCharCode((e - 1) % 26 + 65) + r;
  return r;
}
function Cf(e) {
  return e.replace(/^([A-Z])/, "$$$1");
}
function Df(e) {
  return e.replace(/^\$([A-Z])/, "$1");
}
function Of(e) {
  return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",");
}
function it(e) {
  for (var r = 0, t = 0, n = 0; n < e.length; ++n) {
    var a = e.charCodeAt(n);
    a >= 48 && a <= 57 ? r = 10 * r + (a - 48) : a >= 65 && a <= 90 && (t = 26 * t + (a - 64));
  }
  return { c: t - 1, r: r - 1 };
}
function Ue(e) {
  for (var r = e.c + 1, t = ""; r; r = (r - 1) / 26 | 0) t = String.fromCharCode((r - 1) % 26 + 65) + t;
  return t + (e.r + 1);
}
function Rt(e) {
  var r = e.indexOf(":");
  return r == -1 ? { s: it(e), e: it(e) } : { s: it(e.slice(0, r)), e: it(e.slice(r + 1)) };
}
function Qe(e, r) {
  return typeof r > "u" || typeof r == "number" ? Qe(e.s, e.e) : (typeof e != "string" && (e = Ue(e)), typeof r != "string" && (r = Ue(r)), e == r ? e : e + ":" + r);
}
function He(e) {
  var r = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } }, t = 0, n = 0, a = 0, i = e.length;
  for (t = 0; n < i && !((a = e.charCodeAt(n) - 64) < 1 || a > 26); ++n)
    t = 26 * t + a;
  for (r.s.c = --t, t = 0; n < i && !((a = e.charCodeAt(n) - 48) < 0 || a > 9); ++n)
    t = 10 * t + a;
  if (r.s.r = --t, n === i || a != 10)
    return r.e.c = r.s.c, r.e.r = r.s.r, r;
  for (++n, t = 0; n != i && !((a = e.charCodeAt(n) - 64) < 1 || a > 26); ++n)
    t = 26 * t + a;
  for (r.e.c = --t, t = 0; n != i && !((a = e.charCodeAt(n) - 48) < 0 || a > 9); ++n)
    t = 10 * t + a;
  return r.e.r = --t, r;
}
function M0(e, r) {
  var t = e.t == "d" && r instanceof Date;
  if (e.z != null) try {
    return e.w = vr(e.z, t ? At(r) : r);
  } catch {
  }
  try {
    return e.w = vr((e.XF || {}).numFmtId || (t ? 14 : 0), t ? At(r) : r);
  } catch {
    return "" + r;
  }
}
function nr(e, r, t) {
  return e == null || e.t == null || e.t == "z" ? "" : e.w !== void 0 ? e.w : (e.t == "d" && !e.z && t && t.dateNF && (e.z = t.dateNF), e.t == "e" ? kn[e.v] || e.v : r == null ? M0(e, e.v) : M0(e, r));
}
function Or(e, r) {
  var t = r && r.sheet ? r.sheet : "Sheet1", n = {};
  return n[t] = e, { SheetNames: [t], Sheets: n };
}
function Mi(e, r, t) {
  var n = t || {}, a = e ? Array.isArray(e) : n.dense, i = e || (a ? [] : {}), s = 0, l = 0;
  if (i && n.origin != null) {
    if (typeof n.origin == "number") s = n.origin;
    else {
      var f = typeof n.origin == "string" ? it(n.origin) : n.origin;
      s = f.r, l = f.c;
    }
    i["!ref"] || (i["!ref"] = "A1:A1");
  }
  var o = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } };
  if (i["!ref"]) {
    var c = He(i["!ref"]);
    o.s.c = c.s.c, o.s.r = c.s.r, o.e.c = Math.max(o.e.c, c.e.c), o.e.r = Math.max(o.e.r, c.e.r), s == -1 && (o.e.r = s = c.e.r + 1);
  }
  for (var x = 0; x != r.length; ++x)
    if (r[x]) {
      if (!Array.isArray(r[x])) throw new Error("aoa_to_sheet expects an array of arrays");
      for (var p = 0; p != r[x].length; ++p)
        if (!(typeof r[x][p] > "u")) {
          var v = { v: r[x][p] }, T = s + x, u = l + p;
          if (o.s.r > T && (o.s.r = T), o.s.c > u && (o.s.c = u), o.e.r < T && (o.e.r = T), o.e.c < u && (o.e.c = u), r[x][p] && typeof r[x][p] == "object" && !Array.isArray(r[x][p]) && !(r[x][p] instanceof Date)) v = r[x][p];
          else if (Array.isArray(v.v) && (v.f = r[x][p][1], v.v = v.v[0]), v.v === null)
            if (v.f) v.t = "n";
            else if (n.nullError)
              v.t = "e", v.v = 0;
            else if (n.sheetStubs) v.t = "z";
            else continue;
          else typeof v.v == "number" ? v.t = "n" : typeof v.v == "boolean" ? v.t = "b" : v.v instanceof Date ? (v.z = n.dateNF || Je[14], n.cellDates ? (v.t = "d", v.w = vr(v.z, At(v.v))) : (v.t = "n", v.v = At(v.v), v.w = vr(v.z, v.v))) : v.t = "s";
          if (a)
            i[T] || (i[T] = []), i[T][u] && i[T][u].z && (v.z = i[T][u].z), i[T][u] = v;
          else {
            var h = Ue({ c: u, r: T });
            i[h] && i[h].z && (v.z = i[h].z), i[h] = v;
          }
        }
    }
  return o.s.c < 1e7 && (i["!ref"] = Qe(o)), i;
}
function Zr(e, r) {
  return Mi(null, e, r);
}
function If(e) {
  return e.read_shift(4, "i");
}
function Ht(e, r) {
  return r || (r = U(4)), r.write_shift(4, e), r;
}
function pt(e) {
  var r = e.read_shift(4);
  return r === 0 ? "" : e.read_shift(r, "dbcs");
}
function st(e, r) {
  var t = !1;
  return r == null && (t = !0, r = U(4 + 2 * e.length)), r.write_shift(4, e.length), e.length > 0 && r.write_shift(0, e, "dbcs"), t ? r.slice(0, r.l) : r;
}
function Rf(e) {
  return { ich: e.read_shift(2), ifnt: e.read_shift(2) };
}
function Nf(e, r) {
  return r || (r = U(4)), r.write_shift(2, 0), r.write_shift(2, 0), r;
}
function Ka(e, r) {
  var t = e.l, n = e.read_shift(1), a = pt(e), i = [], s = { t: a, h: a };
  if (n & 1) {
    for (var l = e.read_shift(4), f = 0; f != l; ++f) i.push(Rf(e));
    s.r = i;
  } else s.r = [{ ich: 0, ifnt: 0 }];
  return e.l = t + r, s;
}
function Pf(e, r) {
  var t = !1;
  return r == null && (t = !0, r = U(15 + 4 * e.t.length)), r.write_shift(1, 0), st(e.t, r), t ? r.slice(0, r.l) : r;
}
var Lf = Ka;
function Mf(e, r) {
  var t = !1;
  return r == null && (t = !0, r = U(23 + 4 * e.t.length)), r.write_shift(1, 1), st(e.t, r), r.write_shift(4, 1), Nf({}, r), t ? r.slice(0, r.l) : r;
}
function Mt(e) {
  var r = e.read_shift(4), t = e.read_shift(2);
  return t += e.read_shift(1) << 16, e.l++, { c: r, iStyleRef: t };
}
function Ir(e, r) {
  return r == null && (r = U(8)), r.write_shift(-4, e.c), r.write_shift(3, e.iStyleRef || e.s), r.write_shift(1, 0), r;
}
function Rr(e) {
  var r = e.read_shift(2);
  return r += e.read_shift(1) << 16, e.l++, { c: -1, iStyleRef: r };
}
function Nr(e, r) {
  return r == null && (r = U(4)), r.write_shift(3, e.iStyleRef || e.s), r.write_shift(1, 0), r;
}
var Bf = pt, Bi = st;
function Ja(e) {
  var r = e.read_shift(4);
  return r === 0 || r === 4294967295 ? "" : e.read_shift(r, "dbcs");
}
function Jn(e, r) {
  var t = !1;
  return r == null && (t = !0, r = U(127)), r.write_shift(4, e.length > 0 ? e.length : 4294967295), e.length > 0 && r.write_shift(0, e, "dbcs"), t ? r.slice(0, r.l) : r;
}
var bf = pt, La = Ja, Za = Jn;
function bi(e) {
  var r = e.slice(e.l, e.l + 4), t = r[0] & 1, n = r[0] & 2;
  e.l += 4;
  var a = n === 0 ? Kn([0, 0, 0, 0, r[0] & 252, r[1], r[2], r[3]], 0) : yr(r, 0) >> 2;
  return t ? a / 100 : a;
}
function Ui(e, r) {
  r == null && (r = U(4));
  var t = 0, n = 0, a = e * 100;
  if (e == (e | 0) && e >= -536870912 && e < 1 << 29 ? n = 1 : a == (a | 0) && a >= -536870912 && a < 1 << 29 && (n = 1, t = 1), n) r.write_shift(-4, ((t ? a : e) << 2) + (t + 2));
  else throw new Error("unsupported RkNumber " + e);
}
function Wi(e) {
  var r = { s: {}, e: {} };
  return r.s.r = e.read_shift(4), r.e.r = e.read_shift(4), r.s.c = e.read_shift(4), r.e.c = e.read_shift(4), r;
}
function Uf(e, r) {
  return r || (r = U(16)), r.write_shift(4, e.s.r), r.write_shift(4, e.e.r), r.write_shift(4, e.s.c), r.write_shift(4, e.e.c), r;
}
var Pr = Wi, qr = Uf;
function Qr(e) {
  if (e.length - e.l < 8) throw "XLS Xnum Buffer underflow";
  return e.read_shift(8, "f");
}
function Cr(e, r) {
  return (r || U(8)).write_shift(8, e, "f");
}
function Wf(e) {
  var r = {}, t = e.read_shift(1), n = t >>> 1, a = e.read_shift(1), i = e.read_shift(2, "i"), s = e.read_shift(1), l = e.read_shift(1), f = e.read_shift(1);
  switch (e.l++, n) {
    case 0:
      r.auto = 1;
      break;
    case 1:
      r.index = a;
      var o = Kf[a];
      o && (r.rgb = z0(o));
      break;
    case 2:
      r.rgb = z0([s, l, f]);
      break;
    case 3:
      r.theme = a;
      break;
  }
  return i != 0 && (r.tint = i > 0 ? i / 32767 : i / 32768), r;
}
function Zn(e, r) {
  if (r || (r = U(8)), !e || e.auto)
    return r.write_shift(4, 0), r.write_shift(4, 0), r;
  e.index != null ? (r.write_shift(1, 2), r.write_shift(1, e.index)) : e.theme != null ? (r.write_shift(1, 6), r.write_shift(1, e.theme)) : (r.write_shift(1, 5), r.write_shift(1, 0));
  var t = e.tint || 0;
  if (t > 0 ? t *= 32767 : t < 0 && (t *= 32768), r.write_shift(2, t), !e.rgb || e.theme != null)
    r.write_shift(2, 0), r.write_shift(1, 0), r.write_shift(1, 0);
  else {
    var n = e.rgb || "FFFFFF";
    typeof n == "number" && (n = ("000000" + n.toString(16)).slice(-6)), r.write_shift(1, parseInt(n.slice(0, 2), 16)), r.write_shift(1, parseInt(n.slice(2, 4), 16)), r.write_shift(1, parseInt(n.slice(4, 6), 16)), r.write_shift(1, 255);
  }
  return r;
}
function $f(e) {
  var r = e.read_shift(1);
  e.l++;
  var t = {
    fBold: r & 1,
    fItalic: r & 2,
    fUnderline: r & 4,
    fStrikeout: r & 8,
    fOutline: r & 16,
    fShadow: r & 32,
    fCondense: r & 64,
    fExtend: r & 128
  };
  return t;
}
function Vf(e, r) {
  r || (r = U(2));
  var t = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 : 0);
  return r.write_shift(1, t), r.write_shift(1, 0), r;
}
var $i = 2, Ct = 3, Un = 11, qn = 19, Wn = 64, Hf = 65, Gf = 71, jf = 4108, Xf = 4126, ot = 80, B0 = {
  /*::[*/
  1: { n: "CodePage", t: $i },
  /*::[*/
  2: { n: "Category", t: ot },
  /*::[*/
  3: { n: "PresentationFormat", t: ot },
  /*::[*/
  4: { n: "ByteCount", t: Ct },
  /*::[*/
  5: { n: "LineCount", t: Ct },
  /*::[*/
  6: { n: "ParagraphCount", t: Ct },
  /*::[*/
  7: { n: "SlideCount", t: Ct },
  /*::[*/
  8: { n: "NoteCount", t: Ct },
  /*::[*/
  9: { n: "HiddenCount", t: Ct },
  /*::[*/
  10: { n: "MultimediaClipCount", t: Ct },
  /*::[*/
  11: { n: "ScaleCrop", t: Un },
  /*::[*/
  12: {
    n: "HeadingPairs",
    t: jf
    /* VT_VECTOR | VT_VARIANT */
  },
  /*::[*/
  13: {
    n: "TitlesOfParts",
    t: Xf
    /* VT_VECTOR | VT_LPSTR */
  },
  /*::[*/
  14: { n: "Manager", t: ot },
  /*::[*/
  15: { n: "Company", t: ot },
  /*::[*/
  16: { n: "LinksUpToDate", t: Un },
  /*::[*/
  17: { n: "CharacterCount", t: Ct },
  /*::[*/
  19: { n: "SharedDoc", t: Un },
  /*::[*/
  22: { n: "HyperlinksChanged", t: Un },
  /*::[*/
  23: { n: "AppVersion", t: Ct, p: "version" },
  /*::[*/
  24: { n: "DigSig", t: Hf },
  /*::[*/
  26: { n: "ContentType", t: ot },
  /*::[*/
  27: { n: "ContentStatus", t: ot },
  /*::[*/
  28: { n: "Language", t: ot },
  /*::[*/
  29: { n: "Version", t: ot },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: qn },
  /*::[*/
  2147483651: { n: "Behavior", t: qn },
  /*::[*/
  1919054434: {}
}, b0 = {
  /*::[*/
  1: { n: "CodePage", t: $i },
  /*::[*/
  2: { n: "Title", t: ot },
  /*::[*/
  3: { n: "Subject", t: ot },
  /*::[*/
  4: { n: "Author", t: ot },
  /*::[*/
  5: { n: "Keywords", t: ot },
  /*::[*/
  6: { n: "Comments", t: ot },
  /*::[*/
  7: { n: "Template", t: ot },
  /*::[*/
  8: { n: "LastAuthor", t: ot },
  /*::[*/
  9: { n: "RevNumber", t: ot },
  /*::[*/
  10: { n: "EditTime", t: Wn },
  /*::[*/
  11: { n: "LastPrinted", t: Wn },
  /*::[*/
  12: { n: "CreatedDate", t: Wn },
  /*::[*/
  13: { n: "ModifiedDate", t: Wn },
  /*::[*/
  14: { n: "PageCount", t: Ct },
  /*::[*/
  15: { n: "WordCount", t: Ct },
  /*::[*/
  16: { n: "CharCount", t: Ct },
  /*::[*/
  17: { n: "Thumbnail", t: Gf },
  /*::[*/
  18: { n: "Application", t: ot },
  /*::[*/
  19: { n: "DocSecurity", t: Ct },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: qn },
  /*::[*/
  2147483651: { n: "Behavior", t: qn },
  /*::[*/
  1919054434: {}
};
function zf(e) {
  return e.map(function(r) {
    return [r >> 16 & 255, r >> 8 & 255, r & 255];
  });
}
var Yf = /* @__PURE__ */ zf([
  /* Color Constants */
  0,
  16777215,
  16711680,
  65280,
  255,
  16776960,
  16711935,
  65535,
  /* Overridable Defaults */
  0,
  16777215,
  16711680,
  65280,
  255,
  16776960,
  16711935,
  65535,
  8388608,
  32768,
  128,
  8421376,
  8388736,
  32896,
  12632256,
  8421504,
  10066431,
  10040166,
  16777164,
  13434879,
  6684774,
  16744576,
  26316,
  13421823,
  128,
  16711935,
  16776960,
  65535,
  8388736,
  8388608,
  32896,
  255,
  52479,
  13434879,
  13434828,
  16777113,
  10079487,
  16751052,
  13408767,
  16764057,
  3368703,
  3394764,
  10079232,
  16763904,
  16750848,
  16737792,
  6710937,
  9868950,
  13158,
  3381606,
  13056,
  3355392,
  10040064,
  10040166,
  3355545,
  3355443,
  /* Other entries to appease BIFF8/12 */
  16777215,
  /* 0x40 icvForeground ?? */
  0,
  /* 0x41 icvBackground ?? */
  0,
  /* 0x42 icvFrame ?? */
  0,
  /* 0x43 icv3D ?? */
  0,
  /* 0x44 icv3DText ?? */
  0,
  /* 0x45 icv3DHilite ?? */
  0,
  /* 0x46 icv3DShadow ?? */
  0,
  /* 0x47 icvHilite ?? */
  0,
  /* 0x48 icvCtlText ?? */
  0,
  /* 0x49 icvCtlScrl ?? */
  0,
  /* 0x4A icvCtlInv ?? */
  0,
  /* 0x4B icvCtlBody ?? */
  0,
  /* 0x4C icvCtlFrame ?? */
  0,
  /* 0x4D icvCtlFore ?? */
  0,
  /* 0x4E icvCtlBack ?? */
  0,
  /* 0x4F icvCtlNeutral */
  0,
  /* 0x50 icvInfoBk ?? */
  0
  /* 0x51 icvInfoText ?? */
]), Kf = /* @__PURE__ */ yt(Yf), kn = {
  /*::[*/
  0: "#NULL!",
  /*::[*/
  7: "#DIV/0!",
  /*::[*/
  15: "#VALUE!",
  /*::[*/
  23: "#REF!",
  /*::[*/
  29: "#NAME?",
  /*::[*/
  36: "#NUM!",
  /*::[*/
  42: "#N/A",
  /*::[*/
  43: "#GETTING_DATA",
  /*::[*/
  255: "#WTF?"
}, Jf = {
  /* Workbook */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": "workbooks",
  "application/vnd.ms-excel.sheet.macroEnabled.main+xml": "workbooks",
  "application/vnd.ms-excel.sheet.binary.macroEnabled.main": "workbooks",
  "application/vnd.ms-excel.addin.macroEnabled.main+xml": "workbooks",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": "workbooks",
  /* Worksheet */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": "sheets",
  "application/vnd.ms-excel.worksheet": "sheets",
  "application/vnd.ms-excel.binIndexWs": "TODO",
  /* Binary Index */
  /* Chartsheet */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": "charts",
  "application/vnd.ms-excel.chartsheet": "charts",
  /* Macrosheet */
  "application/vnd.ms-excel.macrosheet+xml": "macros",
  "application/vnd.ms-excel.macrosheet": "macros",
  "application/vnd.ms-excel.intlmacrosheet": "TODO",
  "application/vnd.ms-excel.binIndexMs": "TODO",
  /* Binary Index */
  /* Dialogsheet */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": "dialogs",
  "application/vnd.ms-excel.dialogsheet": "dialogs",
  /* Shared Strings */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml": "strs",
  "application/vnd.ms-excel.sharedStrings": "strs",
  /* Styles */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": "styles",
  "application/vnd.ms-excel.styles": "styles",
  /* File Properties */
  "application/vnd.openxmlformats-package.core-properties+xml": "coreprops",
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": "custprops",
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": "extprops",
  /* Custom Data Properties */
  "application/vnd.openxmlformats-officedocument.customXmlProperties+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty": "TODO",
  /* Comments */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": "comments",
  "application/vnd.ms-excel.comments": "comments",
  "application/vnd.ms-excel.threadedcomments+xml": "threadedcomments",
  "application/vnd.ms-excel.person+xml": "people",
  /* Metadata (Stock/Geography and Dynamic Array) */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml": "metadata",
  "application/vnd.ms-excel.sheetMetadata": "metadata",
  /* PivotTable */
  "application/vnd.ms-excel.pivotTable": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml": "TODO",
  /* Chart Objects */
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": "TODO",
  /* Chart Colors */
  "application/vnd.ms-office.chartcolorstyle+xml": "TODO",
  /* Chart Style */
  "application/vnd.ms-office.chartstyle+xml": "TODO",
  /* Chart Advanced */
  "application/vnd.ms-office.chartex+xml": "TODO",
  /* Calculation Chain */
  "application/vnd.ms-excel.calcChain": "calcchains",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml": "calcchains",
  /* Printer Settings */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings": "TODO",
  /* ActiveX */
  "application/vnd.ms-office.activeX": "TODO",
  "application/vnd.ms-office.activeX+xml": "TODO",
  /* Custom Toolbars */
  "application/vnd.ms-excel.attachedToolbars": "TODO",
  /* External Data Connections */
  "application/vnd.ms-excel.connections": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": "TODO",
  /* External Links */
  "application/vnd.ms-excel.externalLink": "links",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml": "links",
  /* PivotCache */
  "application/vnd.ms-excel.pivotCacheDefinition": "TODO",
  "application/vnd.ms-excel.pivotCacheRecords": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml": "TODO",
  /* Query Table */
  "application/vnd.ms-excel.queryTable": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml": "TODO",
  /* Shared Workbook */
  "application/vnd.ms-excel.userNames": "TODO",
  "application/vnd.ms-excel.revisionHeaders": "TODO",
  "application/vnd.ms-excel.revisionLog": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml": "TODO",
  /* Single Cell Table */
  "application/vnd.ms-excel.tableSingleCells": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml": "TODO",
  /* Slicer */
  "application/vnd.ms-excel.slicer": "TODO",
  "application/vnd.ms-excel.slicerCache": "TODO",
  "application/vnd.ms-excel.slicer+xml": "TODO",
  "application/vnd.ms-excel.slicerCache+xml": "TODO",
  /* Sort Map */
  "application/vnd.ms-excel.wsSortMap": "TODO",
  /* Table */
  "application/vnd.ms-excel.table": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": "TODO",
  /* Themes */
  "application/vnd.openxmlformats-officedocument.theme+xml": "themes",
  /* Theme Override */
  "application/vnd.openxmlformats-officedocument.themeOverride+xml": "TODO",
  /* Timeline */
  "application/vnd.ms-excel.Timeline+xml": "TODO",
  /* verify */
  "application/vnd.ms-excel.TimelineCache+xml": "TODO",
  /* verify */
  /* VBA */
  "application/vnd.ms-office.vbaProject": "vba",
  "application/vnd.ms-office.vbaProjectSignature": "TODO",
  /* Volatile Dependencies */
  "application/vnd.ms-office.volatileDependencies": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml": "TODO",
  /* Control Properties */
  "application/vnd.ms-excel.controlproperties+xml": "TODO",
  /* Data Model */
  "application/vnd.openxmlformats-officedocument.model+data": "TODO",
  /* Survey */
  "application/vnd.ms-excel.Survey+xml": "TODO",
  /* Drawing */
  "application/vnd.openxmlformats-officedocument.drawing+xml": "drawings",
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml": "TODO",
  /* VML */
  "application/vnd.openxmlformats-officedocument.vmlDrawing": "TODO",
  "application/vnd.openxmlformats-package.relationships+xml": "rels",
  "application/vnd.openxmlformats-officedocument.oleObject": "TODO",
  /* Image */
  "image/png": "TODO",
  sheet: "js"
}, $n = {
  workbooks: {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
    xlsm: "application/vnd.ms-excel.sheet.macroEnabled.main+xml",
    xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.main",
    xlam: "application/vnd.ms-excel.addin.macroEnabled.main+xml",
    xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml"
  },
  strs: {
    /* Shared Strings */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",
    xlsb: "application/vnd.ms-excel.sharedStrings"
  },
  comments: {
    /* Comments */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml",
    xlsb: "application/vnd.ms-excel.comments"
  },
  sheets: {
    /* Worksheet */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
    xlsb: "application/vnd.ms-excel.worksheet"
  },
  charts: {
    /* Chartsheet */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml",
    xlsb: "application/vnd.ms-excel.chartsheet"
  },
  dialogs: {
    /* Dialogsheet */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml",
    xlsb: "application/vnd.ms-excel.dialogsheet"
  },
  macros: {
    /* Macrosheet (Excel 4.0 Macros) */
    xlsx: "application/vnd.ms-excel.macrosheet+xml",
    xlsb: "application/vnd.ms-excel.macrosheet"
  },
  metadata: {
    /* Metadata (Stock/Geography and Dynamic Array) */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml",
    xlsb: "application/vnd.ms-excel.sheetMetadata"
  },
  styles: {
    /* Styles */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",
    xlsb: "application/vnd.ms-excel.styles"
  }
};
function Vi() {
  return {
    workbooks: [],
    sheets: [],
    charts: [],
    dialogs: [],
    macros: [],
    rels: [],
    strs: [],
    comments: [],
    threadedcomments: [],
    links: [],
    coreprops: [],
    extprops: [],
    custprops: [],
    themes: [],
    styles: [],
    calcchains: [],
    vba: [],
    drawings: [],
    metadata: [],
    people: [],
    TODO: [],
    xmlns: ""
  };
}
function Hi(e, r) {
  var t = sf(Jf), n = [], a;
  n[n.length] = et, n[n.length] = te("Types", null, {
    xmlns: at.CT,
    "xmlns:xsd": at.xsd,
    "xmlns:xsi": at.xsi
  }), n = n.concat([
    ["xml", "application/xml"],
    ["bin", "application/vnd.ms-excel.sheet.binary.macroEnabled.main"],
    ["vml", "application/vnd.openxmlformats-officedocument.vmlDrawing"],
    ["data", "application/vnd.openxmlformats-officedocument.model+data"],
    /* from test files */
    ["bmp", "image/bmp"],
    ["png", "image/png"],
    ["gif", "image/gif"],
    ["emf", "image/x-emf"],
    ["wmf", "image/x-wmf"],
    ["jpg", "image/jpeg"],
    ["jpeg", "image/jpeg"],
    ["tif", "image/tiff"],
    ["tiff", "image/tiff"],
    ["pdf", "application/pdf"],
    ["rels", "application/vnd.openxmlformats-package.relationships+xml"]
  ].map(function(f) {
    return te("Default", null, { Extension: f[0], ContentType: f[1] });
  }));
  var i = function(f) {
    e[f] && e[f].length > 0 && (a = e[f][0], n[n.length] = te("Override", null, {
      PartName: (a[0] == "/" ? "" : "/") + a,
      ContentType: $n[f][r.bookType] || $n[f].xlsx
    }));
  }, s = function(f) {
    (e[f] || []).forEach(function(o) {
      n[n.length] = te("Override", null, {
        PartName: (o[0] == "/" ? "" : "/") + o,
        ContentType: $n[f][r.bookType] || $n[f].xlsx
      });
    });
  }, l = function(f) {
    (e[f] || []).forEach(function(o) {
      n[n.length] = te("Override", null, {
        PartName: (o[0] == "/" ? "" : "/") + o,
        ContentType: t[f][0]
      });
    });
  };
  return i("workbooks"), s("sheets"), s("charts"), l("themes"), ["strs", "styles"].forEach(i), ["coreprops", "extprops", "custprops"].forEach(l), l("vba"), l("comments"), l("threadedcomments"), l("drawings"), s("metadata"), l("people"), n.length > 2 && (n[n.length] = "</Types>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var Re = {
  WB: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
  HLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
  VML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing",
  XPATH: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLinkPath",
  XMISS: "http://schemas.microsoft.com/office/2006/relationships/xlExternalLinkPath/xlPathMissing",
  CMNT: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments",
  CORE_PROPS: "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties",
  EXT_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties",
  CUST_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties",
  SST: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",
  STY: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
  THEME: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme",
  WS: [
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
    "http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet"
  ],
  DRAW: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing",
  XLMETA: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sheetMetadata",
  TCMNT: "http://schemas.microsoft.com/office/2017/10/relationships/threadedComment",
  PEOPLE: "http://schemas.microsoft.com/office/2017/10/relationships/person",
  VBA: "http://schemas.microsoft.com/office/2006/relationships/vbaProject"
};
function Gi(e) {
  var r = e.lastIndexOf("/");
  return e.slice(0, r + 1) + "_rels/" + e.slice(r + 1) + ".rels";
}
function jr(e) {
  var r = [et, te("Relationships", null, {
    //'xmlns:ns0': XMLNS.RELS,
    xmlns: at.RELS
  })];
  return dt(e["!id"]).forEach(function(t) {
    r[r.length] = te("Relationship", null, e["!id"][t]);
  }), r.length > 2 && (r[r.length] = "</Relationships>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Be(e, r, t, n, a, i) {
  if (a || (a = {}), e["!id"] || (e["!id"] = {}), e["!idx"] || (e["!idx"] = 1), r < 0) for (r = e["!idx"]; e["!id"]["rId" + r]; ++r)
    ;
  if (e["!idx"] = r + 1, a.Id = "rId" + r, a.Type = n, a.Target = t, [Re.HLINK, Re.XPATH, Re.XMISS].indexOf(a.Type) > -1 && (a.TargetMode = "External"), e["!id"][a.Id]) throw new Error("Cannot rewrite rId " + r);
  return e["!id"][a.Id] = a, e[("/" + a.Target).replace("//", "/")] = a, r;
}
function Zf(e) {
  var r = [et];
  r.push(`<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
`), r.push(`  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
`);
  for (var t = 0; t < e.length; ++t) r.push('  <manifest:file-entry manifest:full-path="' + e[t][0] + '" manifest:media-type="' + e[t][1] + `"/>
`);
  return r.push("</manifest:manifest>"), r.join("");
}
function U0(e, r, t) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (t || "odf") + "#" + r + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function qf(e, r) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + r + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function Qf(e) {
  var r = [et];
  r.push(`<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
`);
  for (var t = 0; t != e.length; ++t)
    r.push(U0(e[t][0], e[t][1])), r.push(qf("", e[t][0]));
  return r.push(U0("", "Document", "pkg")), r.push("</rdf:RDF>"), r.join("");
}
function ji() {
  return '<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS ' + Hn.version + "</meta:generator></office:meta></office:document-meta>";
}
var Fr = [
  ["cp:category", "Category"],
  ["cp:contentStatus", "ContentStatus"],
  ["cp:keywords", "Keywords"],
  ["cp:lastModifiedBy", "LastAuthor"],
  ["cp:lastPrinted", "LastPrinted"],
  ["cp:revision", "RevNumber"],
  ["cp:version", "Version"],
  ["dc:creator", "Author"],
  ["dc:description", "Comments"],
  ["dc:identifier", "Identifier"],
  ["dc:language", "Language"],
  ["dc:subject", "Subject"],
  ["dc:title", "Title"],
  ["dcterms:created", "CreatedDate", "date"],
  ["dcterms:modified", "ModifiedDate", "date"]
];
function Aa(e, r, t, n, a) {
  a[e] != null || r == null || r === "" || (a[e] = r, r = be(r), n[n.length] = t ? te(e, r, t) : ut(e, r));
}
function Xi(e, r) {
  var t = r || {}, n = [et, te("cp:coreProperties", null, {
    //'xmlns': XMLNS.CORE_PROPS,
    "xmlns:cp": at.CORE_PROPS,
    "xmlns:dc": at.dc,
    "xmlns:dcterms": at.dcterms,
    "xmlns:dcmitype": at.dcmitype,
    "xmlns:xsi": at.xsi
  })], a = {};
  if (!e && !t.Props) return n.join("");
  e && (e.CreatedDate != null && Aa("dcterms:created", typeof e.CreatedDate == "string" ? e.CreatedDate : Pa(e.CreatedDate, t.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a), e.ModifiedDate != null && Aa("dcterms:modified", typeof e.ModifiedDate == "string" ? e.ModifiedDate : Pa(e.ModifiedDate, t.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a));
  for (var i = 0; i != Fr.length; ++i) {
    var s = Fr[i], l = t.Props && t.Props[s[1]] != null ? t.Props[s[1]] : e ? e[s[1]] : null;
    l === !0 ? l = "1" : l === !1 ? l = "0" : typeof l == "number" && (l = String(l)), l != null && Aa(s[0], l, null, n, a);
  }
  return n.length > 2 && (n[n.length] = "</cp:coreProperties>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var Xr = [
  ["Application", "Application", "string"],
  ["AppVersion", "AppVersion", "string"],
  ["Company", "Company", "string"],
  ["DocSecurity", "DocSecurity", "string"],
  ["Manager", "Manager", "string"],
  ["HyperlinksChanged", "HyperlinksChanged", "bool"],
  ["SharedDoc", "SharedDoc", "bool"],
  ["LinksUpToDate", "LinksUpToDate", "bool"],
  ["ScaleCrop", "ScaleCrop", "bool"],
  ["HeadingPairs", "HeadingPairs", "raw"],
  ["TitlesOfParts", "TitlesOfParts", "raw"]
], zi = [
  "Worksheets",
  "SheetNames",
  "NamedRanges",
  "DefinedNames",
  "Chartsheets",
  "ChartNames"
];
function Yi(e) {
  var r = [], t = te;
  return e || (e = {}), e.Application = "SheetJS", r[r.length] = et, r[r.length] = te("Properties", null, {
    xmlns: at.EXT_PROPS,
    "xmlns:vt": at.vt
  }), Xr.forEach(function(n) {
    if (e[n[1]] !== void 0) {
      var a;
      switch (n[2]) {
        case "string":
          a = be(String(e[n[1]]));
          break;
        case "bool":
          a = e[n[1]] ? "true" : "false";
          break;
      }
      a !== void 0 && (r[r.length] = t(n[0], a));
    }
  }), r[r.length] = t("HeadingPairs", t("vt:vector", t("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + t("vt:variant", t("vt:i4", String(e.Worksheets))), { size: 2, baseType: "variant" })), r[r.length] = t("TitlesOfParts", t("vt:vector", e.SheetNames.map(function(n) {
    return "<vt:lpstr>" + be(n) + "</vt:lpstr>";
  }).join(""), { size: e.Worksheets, baseType: "lpstr" })), r.length > 2 && (r[r.length] = "</Properties>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Ki(e) {
  var r = [et, te("Properties", null, {
    xmlns: at.CUST_PROPS,
    "xmlns:vt": at.vt
  })];
  if (!e) return r.join("");
  var t = 1;
  return dt(e).forEach(function(a) {
    ++t, r[r.length] = te("property", mf(e[a]), {
      fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: t,
      name: be(a)
    });
  }), r.length > 2 && (r[r.length] = "</Properties>", r[1] = r[1].replace("/>", ">")), r.join("");
}
var W0 = {
  Title: "Title",
  Subject: "Subject",
  Author: "Author",
  Keywords: "Keywords",
  Comments: "Description",
  LastAuthor: "LastAuthor",
  RevNumber: "Revision",
  Application: "AppName",
  /* TotalTime: 'TotalTime', */
  LastPrinted: "LastPrinted",
  CreatedDate: "Created",
  ModifiedDate: "LastSaved",
  /* Pages */
  /* Words */
  /* Characters */
  Category: "Category",
  /* PresentationFormat */
  Manager: "Manager",
  Company: "Company",
  /* Guid */
  /* HyperlinkBase */
  /* Bytes */
  /* Lines */
  /* Paragraphs */
  /* CharactersWithSpaces */
  AppVersion: "Version",
  ContentStatus: "ContentStatus",
  /* NOTE: missing from schema */
  Identifier: "Identifier",
  /* NOTE: missing from schema */
  Language: "Language"
  /* NOTE: missing from schema */
};
function eo(e, r) {
  var t = [];
  return dt(W0).map(function(n) {
    for (var a = 0; a < Fr.length; ++a) if (Fr[a][1] == n) return Fr[a];
    for (a = 0; a < Xr.length; ++a) if (Xr[a][1] == n) return Xr[a];
    throw n;
  }).forEach(function(n) {
    if (e[n[1]] != null) {
      var a = r && r.Props && r.Props[n[1]] != null ? r.Props[n[1]] : e[n[1]];
      switch (n[2]) {
        case "date":
          a = new Date(a).toISOString().replace(/\.\d*Z/, "Z");
          break;
      }
      typeof a == "number" ? a = String(a) : a === !0 || a === !1 ? a = a ? "1" : "0" : a instanceof Date && (a = new Date(a).toISOString().replace(/\.\d*Z/, "")), t.push(ut(W0[n[1]] || n[1], a));
    }
  }), te("DocumentProperties", t.join(""), { xmlns: Ot.o });
}
function to(e, r) {
  var t = ["Worksheets", "SheetNames"], n = "CustomDocumentProperties", a = [];
  return e && dt(e).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(e, i)) {
      for (var s = 0; s < Fr.length; ++s) if (i == Fr[s][1]) return;
      for (s = 0; s < Xr.length; ++s) if (i == Xr[s][1]) return;
      for (s = 0; s < t.length; ++s) if (i == t[s]) return;
      var l = e[i], f = "string";
      typeof l == "number" ? (f = "float", l = String(l)) : l === !0 || l === !1 ? (f = "boolean", l = l ? "1" : "0") : l = String(l), a.push(te(k0(i), l, { "dt:dt": f }));
    }
  }), r && dt(r).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(r, i) && !(e && Object.prototype.hasOwnProperty.call(e, i))) {
      var s = r[i], l = "string";
      typeof s == "number" ? (l = "float", s = String(s)) : s === !0 || s === !1 ? (l = "boolean", s = s ? "1" : "0") : s instanceof Date ? (l = "dateTime.tz", s = s.toISOString()) : s = String(s), a.push(te(k0(i), s, { "dt:dt": l }));
    }
  }), "<" + n + ' xmlns="' + Ot.o + '">' + a.join("") + "</" + n + ">";
}
function ro(e) {
  var r = typeof e == "string" ? new Date(Date.parse(e)) : e, t = r.getTime() / 1e3 + 11644473600, n = t % Math.pow(2, 32), a = (t - n) / Math.pow(2, 32);
  n *= 1e7, a *= 1e7;
  var i = n / Math.pow(2, 32) | 0;
  i > 0 && (n = n % Math.pow(2, 32), a += i);
  var s = U(8);
  return s.write_shift(4, n), s.write_shift(4, a), s;
}
function $0(e, r) {
  var t = U(4), n = U(4);
  switch (t.write_shift(4, e == 80 ? 31 : e), e) {
    case 3:
      n.write_shift(-4, r);
      break;
    case 5:
      n = U(8), n.write_shift(8, r, "f");
      break;
    case 11:
      n.write_shift(4, r ? 1 : 0);
      break;
    case 64:
      n = ro(r);
      break;
    case 31:
    case 80:
      for (n = U(4 + 2 * (r.length + 1) + (r.length % 2 ? 0 : 2)), n.write_shift(4, r.length + 1), n.write_shift(0, r, "dbcs"); n.l != n.length; ) n.write_shift(1, 0);
      break;
    default:
      throw new Error("TypedPropertyValue unrecognized type " + e + " " + r);
  }
  return ct([t, n]);
}
var Ji = ["CodePage", "Thumbnail", "_PID_LINKBASE", "_PID_HLINKS", "SystemIdentifier", "FMTID"];
function no(e) {
  switch (typeof e) {
    case "boolean":
      return 11;
    case "number":
      return (e | 0) == e ? 3 : 5;
    case "string":
      return 31;
    case "object":
      if (e instanceof Date) return 64;
      break;
  }
  return -1;
}
function V0(e, r, t) {
  var n = U(8), a = [], i = [], s = 8, l = 0, f = U(8), o = U(8);
  if (f.write_shift(4, 2), f.write_shift(4, 1200), o.write_shift(4, 1), i.push(f), a.push(o), s += 8 + f.length, !r) {
    o = U(8), o.write_shift(4, 0), a.unshift(o);
    var c = [U(4)];
    for (c[0].write_shift(4, e.length), l = 0; l < e.length; ++l) {
      var x = e[l][0];
      for (f = U(8 + 2 * (x.length + 1) + (x.length % 2 ? 0 : 2)), f.write_shift(4, l + 2), f.write_shift(4, x.length + 1), f.write_shift(0, x, "dbcs"); f.l != f.length; ) f.write_shift(1, 0);
      c.push(f);
    }
    f = ct(c), i.unshift(f), s += 8 + f.length;
  }
  for (l = 0; l < e.length; ++l)
    if (!(r && !r[e[l][0]]) && !(Ji.indexOf(e[l][0]) > -1 || zi.indexOf(e[l][0]) > -1) && e[l][1] != null) {
      var p = e[l][1], v = 0;
      if (r) {
        v = +r[e[l][0]];
        var T = t[v];
        if (T.p == "version" && typeof p == "string") {
          var u = p.split(".");
          p = (+u[0] << 16) + (+u[1] || 0);
        }
        f = $0(T.t, p);
      } else {
        var h = no(p);
        h == -1 && (h = 31, p = String(p)), f = $0(h, p);
      }
      i.push(f), o = U(8), o.write_shift(4, r ? v : 2 + l), a.push(o), s += 8 + f.length;
    }
  var y = 8 * (i.length + 1);
  for (l = 0; l < i.length; ++l)
    a[l].write_shift(4, y), y += i[l].length;
  return n.write_shift(4, s), n.write_shift(4, i.length), ct([n].concat(a).concat(i));
}
function H0(e, r, t, n, a, i) {
  var s = U(a ? 68 : 48), l = [s];
  s.write_shift(2, 65534), s.write_shift(2, 0), s.write_shift(4, 842412599), s.write_shift(16, $e.utils.consts.HEADER_CLSID, "hex"), s.write_shift(4, a ? 2 : 1), s.write_shift(16, r, "hex"), s.write_shift(4, a ? 68 : 48);
  var f = V0(e, t, n);
  if (l.push(f), a) {
    var o = V0(a, null, null);
    s.write_shift(16, i, "hex"), s.write_shift(4, 68 + f.length), l.push(o);
  }
  return ct(l);
}
function ao(e, r) {
  r || (r = U(e));
  for (var t = 0; t < e; ++t) r.write_shift(1, 0);
  return r;
}
function io(e, r) {
  return e.read_shift(r) === 1;
}
function _t(e, r) {
  return r || (r = U(2)), r.write_shift(2, +!!e), r;
}
function Zi(e) {
  return e.read_shift(2, "u");
}
function Pt(e, r) {
  return r || (r = U(2)), r.write_shift(2, e), r;
}
function qi(e, r, t) {
  return t || (t = U(2)), t.write_shift(1, r == "e" ? +e : +!!e), t.write_shift(1, r == "e" ? 1 : 0), t;
}
function Qi(e, r, t) {
  var n = e.read_shift(t && t.biff >= 12 ? 2 : 1), a = "sbcs-cont";
  if (t && t.biff >= 8, !t || t.biff == 8) {
    var i = e.read_shift(1);
    i && (a = "dbcs-cont");
  } else t.biff == 12 && (a = "wstr");
  t.biff >= 2 && t.biff <= 5 && (a = "cpstr");
  var s = n ? e.read_shift(n, a) : "";
  return s;
}
function so(e) {
  var r = e.t || "", t = U(3);
  t.write_shift(2, r.length), t.write_shift(1, 1);
  var n = U(2 * r.length);
  n.write_shift(2 * r.length, r, "utf16le");
  var a = [t, n];
  return ct(a);
}
function lo(e, r, t) {
  var n;
  if (t) {
    if (t.biff >= 2 && t.biff <= 5) return e.read_shift(r, "cpstr");
    if (t.biff >= 12) return e.read_shift(r, "dbcs-cont");
  }
  var a = e.read_shift(1);
  return a === 0 ? n = e.read_shift(r, "sbcs-cont") : n = e.read_shift(r, "dbcs-cont"), n;
}
function fo(e, r, t) {
  var n = e.read_shift(t && t.biff == 2 ? 1 : 2);
  return n === 0 ? (e.l++, "") : lo(e, n, t);
}
function oo(e, r, t) {
  if (t.biff > 5) return fo(e, r, t);
  var n = e.read_shift(1);
  return n === 0 ? (e.l++, "") : e.read_shift(n, t.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont");
}
function es(e, r, t) {
  return t || (t = U(3 + 2 * e.length)), t.write_shift(2, e.length), t.write_shift(1, 1), t.write_shift(31, e, "utf16le"), t;
}
function G0(e, r) {
  r || (r = U(6 + e.length * 2)), r.write_shift(4, 1 + e.length);
  for (var t = 0; t < e.length; ++t) r.write_shift(2, e.charCodeAt(t));
  return r.write_shift(2, 0), r;
}
function co(e) {
  var r = U(512), t = 0, n = e.Target;
  n.slice(0, 7) == "file://" && (n = n.slice(7));
  var a = n.indexOf("#"), i = a > -1 ? 31 : 23;
  switch (n.charAt(0)) {
    case "#":
      i = 28;
      break;
    case ".":
      i &= -3;
      break;
  }
  r.write_shift(4, 2), r.write_shift(4, i);
  var s = [8, 6815827, 6619237, 4849780, 83];
  for (t = 0; t < s.length; ++t) r.write_shift(4, s[t]);
  if (i == 28)
    n = n.slice(1), G0(n, r);
  else if (i & 2) {
    for (s = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), t = 0; t < s.length; ++t) r.write_shift(1, parseInt(s[t], 16));
    var l = a > -1 ? n.slice(0, a) : n;
    for (r.write_shift(4, 2 * (l.length + 1)), t = 0; t < l.length; ++t) r.write_shift(2, l.charCodeAt(t));
    r.write_shift(2, 0), i & 8 && G0(a > -1 ? n.slice(a + 1) : "", r);
  } else {
    for (s = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" "), t = 0; t < s.length; ++t) r.write_shift(1, parseInt(s[t], 16));
    for (var f = 0; n.slice(f * 3, f * 3 + 3) == "../" || n.slice(f * 3, f * 3 + 3) == "..\\"; ) ++f;
    for (r.write_shift(2, f), r.write_shift(4, n.length - 3 * f + 1), t = 0; t < n.length - 3 * f; ++t) r.write_shift(1, n.charCodeAt(t + 3 * f) & 255);
    for (r.write_shift(1, 0), r.write_shift(2, 65535), r.write_shift(2, 57005), t = 0; t < 6; ++t) r.write_shift(4, 0);
  }
  return r.slice(0, r.l);
}
function Dr(e, r, t, n) {
  return n || (n = U(6)), n.write_shift(2, e), n.write_shift(2, r), n.write_shift(2, t || 0), n;
}
function uo(e, r, t) {
  var n = t.biff > 8 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n, "i"), s = e.read_shift(n, "i");
  return [a, i, s];
}
function ho(e) {
  var r = e.read_shift(2), t = e.read_shift(2), n = e.read_shift(2), a = e.read_shift(2);
  return { s: { c: n, r }, e: { c: a, r: t } };
}
function ts(e, r) {
  return r || (r = U(8)), r.write_shift(2, e.s.r), r.write_shift(2, e.e.r), r.write_shift(2, e.s.c), r.write_shift(2, e.e.c), r;
}
function qa(e, r, t) {
  var n = 1536, a = 16;
  switch (t.bookType) {
    case "biff8":
      break;
    case "biff5":
      n = 1280, a = 8;
      break;
    case "biff4":
      n = 4, a = 6;
      break;
    case "biff3":
      n = 3, a = 6;
      break;
    case "biff2":
      n = 2, a = 4;
      break;
    case "xla":
      break;
    default:
      throw new Error("unsupported BIFF version");
  }
  var i = U(a);
  return i.write_shift(2, n), i.write_shift(2, r), a > 4 && i.write_shift(2, 29282), a > 6 && i.write_shift(2, 1997), a > 8 && (i.write_shift(2, 49161), i.write_shift(2, 1), i.write_shift(2, 1798), i.write_shift(2, 0)), i;
}
function xo(e, r) {
  var t = !r || r.biff == 8, n = U(t ? 112 : 54);
  for (n.write_shift(r.biff == 8 ? 2 : 1, 7), t && n.write_shift(1, 0), n.write_shift(4, 859007059), n.write_shift(4, 5458548 | (t ? 0 : 536870912)); n.l < n.length; ) n.write_shift(1, t ? 0 : 32);
  return n;
}
function vo(e, r) {
  var t = !r || r.biff >= 8 ? 2 : 1, n = U(8 + t * e.name.length);
  n.write_shift(4, e.pos), n.write_shift(1, e.hs || 0), n.write_shift(1, e.dt), n.write_shift(1, e.name.length), r.biff >= 8 && n.write_shift(1, 1), n.write_shift(t * e.name.length, e.name, r.biff < 8 ? "sbcs" : "utf16le");
  var a = n.slice(0, n.l);
  return a.l = n.l, a;
}
function po(e, r) {
  var t = U(8);
  t.write_shift(4, e.Count), t.write_shift(4, e.Unique);
  for (var n = [], a = 0; a < e.length; ++a) n[a] = so(e[a]);
  var i = ct([t].concat(n));
  return i.parts = [t.length].concat(n.map(function(s) {
    return s.length;
  })), i;
}
function mo() {
  var e = U(18);
  return e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 29280), e.write_shift(2, 17600), e.write_shift(2, 56), e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 1), e.write_shift(2, 500), e;
}
function go(e) {
  var r = U(18), t = 1718;
  return e && e.RTL && (t |= 64), r.write_shift(2, t), r.write_shift(4, 0), r.write_shift(4, 64), r.write_shift(4, 0), r.write_shift(4, 0), r;
}
function _o(e, r) {
  var t = e.name || "Arial", n = r && r.biff == 5, a = n ? 15 + t.length : 16 + 2 * t.length, i = U(a);
  return i.write_shift(2, e.sz * 20), i.write_shift(4, 0), i.write_shift(2, 400), i.write_shift(4, 0), i.write_shift(2, 0), i.write_shift(1, t.length), n || i.write_shift(1, 1), i.write_shift((n ? 1 : 2) * t.length, t, n ? "sbcs" : "utf16le"), i;
}
function To(e, r, t, n) {
  var a = U(10);
  return Dr(e, r, n, a), a.write_shift(4, t), a;
}
function Eo(e, r, t, n, a) {
  var i = !a || a.biff == 8, s = U(8 + +i + (1 + i) * t.length);
  return Dr(e, r, n, s), s.write_shift(2, t.length), i && s.write_shift(1, 1), s.write_shift((1 + i) * t.length, t, i ? "utf16le" : "sbcs"), s;
}
function wo(e, r, t, n) {
  var a = t && t.biff == 5;
  n || (n = U(a ? 3 + r.length : 5 + 2 * r.length)), n.write_shift(2, e), n.write_shift(a ? 1 : 2, r.length), a || n.write_shift(1, 1), n.write_shift((a ? 1 : 2) * r.length, r, a ? "sbcs" : "utf16le");
  var i = n.length > n.l ? n.slice(0, n.l) : n;
  return i.l == null && (i.l = i.length), i;
}
function So(e, r) {
  var t = r.biff == 8 || !r.biff ? 4 : 2, n = U(2 * t + 6);
  return n.write_shift(t, e.s.r), n.write_shift(t, e.e.r + 1), n.write_shift(2, e.s.c), n.write_shift(2, e.e.c + 1), n.write_shift(2, 0), n;
}
function j0(e, r, t, n) {
  var a = t && t.biff == 5;
  n || (n = U(a ? 16 : 20)), n.write_shift(2, 0), e.style ? (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, 65524)) : (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, r << 4));
  var i = 0;
  return e.numFmtId > 0 && a && (i |= 1024), n.write_shift(4, i), n.write_shift(4, 0), a || n.write_shift(4, 0), n.write_shift(2, 0), n;
}
function Ao(e) {
  var r = U(8);
  return r.write_shift(4, 0), r.write_shift(2, 0), r.write_shift(2, 0), r;
}
function yo(e, r, t, n, a, i) {
  var s = U(8);
  return Dr(e, r, n, s), qi(t, i, s), s;
}
function Fo(e, r, t, n) {
  var a = U(14);
  return Dr(e, r, n, a), Cr(t, a), a;
}
function ko(e, r, t) {
  if (t.biff < 8) return Co(e, r, t);
  for (var n = [], a = e.l + r, i = e.read_shift(t.biff > 8 ? 4 : 2); i-- !== 0; ) n.push(uo(e, t.biff > 8 ? 12 : 6, t));
  if (e.l != a) throw new Error("Bad ExternSheet: " + e.l + " != " + a);
  return n;
}
function Co(e, r, t) {
  e[e.l + 1] == 3 && e[e.l]++;
  var n = Qi(e, r, t);
  return n.charCodeAt(0) == 3 ? n.slice(1) : n;
}
function Do(e) {
  var r = U(2 + e.length * 8);
  r.write_shift(2, e.length);
  for (var t = 0; t < e.length; ++t) ts(e[t], r);
  return r;
}
function Oo(e) {
  var r = U(24), t = it(e[0]);
  r.write_shift(2, t.r), r.write_shift(2, t.r), r.write_shift(2, t.c), r.write_shift(2, t.c);
  for (var n = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), a = 0; a < 16; ++a) r.write_shift(1, parseInt(n[a], 16));
  return ct([r, co(e[1])]);
}
function Io(e) {
  var r = e[1].Tooltip, t = U(10 + 2 * (r.length + 1));
  t.write_shift(2, 2048);
  var n = it(e[0]);
  t.write_shift(2, n.r), t.write_shift(2, n.r), t.write_shift(2, n.c), t.write_shift(2, n.c);
  for (var a = 0; a < r.length; ++a) t.write_shift(2, r.charCodeAt(a));
  return t.write_shift(2, 0), t;
}
function Ro(e) {
  return e || (e = U(4)), e.write_shift(2, 1), e.write_shift(2, 1), e;
}
function No(e, r, t) {
  if (!t.cellStyles) return Kt(e, r);
  var n = t && t.biff >= 12 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n), s = e.read_shift(n), l = e.read_shift(n), f = e.read_shift(2);
  n == 2 && (e.l += 2);
  var o = { s: a, e: i, w: s, ixfe: l, flags: f };
  return (t.biff >= 5 || !t.biff) && (o.level = f >> 8 & 7), o;
}
function Po(e, r) {
  var t = U(12);
  t.write_shift(2, r), t.write_shift(2, r), t.write_shift(2, e.width * 256), t.write_shift(2, 0);
  var n = 0;
  return e.hidden && (n |= 1), t.write_shift(1, n), n = e.level || 0, t.write_shift(1, n), t.write_shift(2, 0), t;
}
function Lo(e) {
  for (var r = U(2 * e), t = 0; t < e; ++t) r.write_shift(2, t + 1);
  return r;
}
function Mo(e, r, t) {
  var n = U(15);
  return Dn(n, e, r), n.write_shift(8, t, "f"), n;
}
function Bo(e, r, t) {
  var n = U(9);
  return Dn(n, e, r), n.write_shift(2, t), n;
}
var bo = /* @__PURE__ */ function() {
  var e = {
    /* Code Pages Supported by Visual FoxPro */
    /*::[*/
    1: 437,
    /*::[*/
    2: 850,
    /*::[*/
    3: 1252,
    /*::[*/
    4: 1e4,
    /*::[*/
    100: 852,
    /*::[*/
    101: 866,
    /*::[*/
    102: 865,
    /*::[*/
    103: 861,
    /*::[*/
    104: 895,
    /*::[*/
    105: 620,
    /*::[*/
    106: 737,
    /*::[*/
    107: 857,
    /*::[*/
    120: 950,
    /*::[*/
    121: 949,
    /*::[*/
    122: 936,
    /*::[*/
    123: 932,
    /*::[*/
    124: 874,
    /*::[*/
    125: 1255,
    /*::[*/
    126: 1256,
    /*::[*/
    150: 10007,
    /*::[*/
    151: 10029,
    /*::[*/
    152: 10006,
    /*::[*/
    200: 1250,
    /*::[*/
    201: 1251,
    /*::[*/
    202: 1254,
    /*::[*/
    203: 1253,
    /* shapefile DBF extension */
    /*::[*/
    0: 20127,
    /*::[*/
    8: 865,
    /*::[*/
    9: 437,
    /*::[*/
    10: 850,
    /*::[*/
    11: 437,
    /*::[*/
    13: 437,
    /*::[*/
    14: 850,
    /*::[*/
    15: 437,
    /*::[*/
    16: 850,
    /*::[*/
    17: 437,
    /*::[*/
    18: 850,
    /*::[*/
    19: 932,
    /*::[*/
    20: 850,
    /*::[*/
    21: 437,
    /*::[*/
    22: 850,
    /*::[*/
    23: 865,
    /*::[*/
    24: 437,
    /*::[*/
    25: 437,
    /*::[*/
    26: 850,
    /*::[*/
    27: 437,
    /*::[*/
    28: 863,
    /*::[*/
    29: 850,
    /*::[*/
    31: 852,
    /*::[*/
    34: 852,
    /*::[*/
    35: 852,
    /*::[*/
    36: 860,
    /*::[*/
    37: 850,
    /*::[*/
    38: 866,
    /*::[*/
    55: 850,
    /*::[*/
    64: 852,
    /*::[*/
    77: 936,
    /*::[*/
    78: 949,
    /*::[*/
    79: 950,
    /*::[*/
    80: 874,
    /*::[*/
    87: 1252,
    /*::[*/
    88: 1252,
    /*::[*/
    89: 1252,
    /*::[*/
    108: 863,
    /*::[*/
    134: 737,
    /*::[*/
    135: 852,
    /*::[*/
    136: 857,
    /*::[*/
    204: 1257,
    /*::[*/
    255: 16969
  }, r = $a({
    /*::[*/
    1: 437,
    /*::[*/
    2: 850,
    /*::[*/
    3: 1252,
    /*::[*/
    4: 1e4,
    /*::[*/
    100: 852,
    /*::[*/
    101: 866,
    /*::[*/
    102: 865,
    /*::[*/
    103: 861,
    /*::[*/
    104: 895,
    /*::[*/
    105: 620,
    /*::[*/
    106: 737,
    /*::[*/
    107: 857,
    /*::[*/
    120: 950,
    /*::[*/
    121: 949,
    /*::[*/
    122: 936,
    /*::[*/
    123: 932,
    /*::[*/
    124: 874,
    /*::[*/
    125: 1255,
    /*::[*/
    126: 1256,
    /*::[*/
    150: 10007,
    /*::[*/
    151: 10029,
    /*::[*/
    152: 10006,
    /*::[*/
    200: 1250,
    /*::[*/
    201: 1251,
    /*::[*/
    202: 1254,
    /*::[*/
    203: 1253,
    /*::[*/
    0: 20127
  });
  function t(l, f) {
    var o = [], c = kr(1);
    switch (f.type) {
      case "base64":
        c = $t(rr(l));
        break;
      case "binary":
        c = $t(l);
        break;
      case "buffer":
      case "array":
        c = l;
        break;
    }
    Dt(c, 0);
    var x = c.read_shift(1), p = !!(x & 136), v = !1, T = !1;
    switch (x) {
      case 2:
        break;
      case 3:
        break;
      case 48:
        v = !0, p = !0;
        break;
      case 49:
        v = !0, p = !0;
        break;
      case 131:
        break;
      case 139:
        break;
      case 140:
        T = !0;
        break;
      case 245:
        break;
      default:
        throw new Error("DBF Unsupported Version: " + x.toString(16));
    }
    var u = 0, h = 521;
    x == 2 && (u = c.read_shift(2)), c.l += 3, x != 2 && (u = c.read_shift(4)), u > 1048576 && (u = 1e6), x != 2 && (h = c.read_shift(2));
    var y = c.read_shift(2), C = f.codepage || 1252;
    x != 2 && (c.l += 16, c.read_shift(1), c[c.l] !== 0 && (C = e[c[c.l]]), c.l += 1, c.l += 2), T && (c.l += 36);
    for (var D = [], L = {}, q = Math.min(c.length, x == 2 ? 521 : h - 10 - (v ? 264 : 0)), se = T ? 32 : 11; c.l < q && c[c.l] != 13; )
      switch (L = {}, L.name = Gn.utils.decode(C, c.slice(c.l, c.l + se)).replace(/[\u0000\r\n].*$/g, ""), c.l += se, L.type = String.fromCharCode(c.read_shift(1)), x != 2 && !T && (L.offset = c.read_shift(4)), L.len = c.read_shift(1), x == 2 && (L.offset = c.read_shift(2)), L.dec = c.read_shift(1), L.name.length && D.push(L), x != 2 && (c.l += T ? 13 : 14), L.type) {
        case "B":
          (!v || L.len != 8) && f.WTF && console.log("Skipping " + L.name + ":" + L.type);
          break;
        case "G":
        case "P":
          f.WTF && console.log("Skipping " + L.name + ":" + L.type);
          break;
        case "+":
        case "0":
        case "@":
        case "C":
        case "D":
        case "F":
        case "I":
        case "L":
        case "M":
        case "N":
        case "O":
        case "T":
        case "Y":
          break;
        default:
          throw new Error("Unknown Field Type: " + L.type);
      }
    if (c[c.l] !== 13 && (c.l = h - 1), c.read_shift(1) !== 13) throw new Error("DBF Terminator not found " + c.l + " " + c[c.l]);
    c.l = h;
    var O = 0, V = 0;
    for (o[0] = [], V = 0; V != D.length; ++V) o[0][V] = D[V].name;
    for (; u-- > 0; ) {
      if (c[c.l] === 42) {
        c.l += y;
        continue;
      }
      for (++c.l, o[++O] = [], V = 0, V = 0; V != D.length; ++V) {
        var M = c.slice(c.l, c.l + D[V].len);
        c.l += D[V].len, Dt(M, 0);
        var G = Gn.utils.decode(C, M);
        switch (D[V].type) {
          case "C":
            G.trim().length && (o[O][V] = G.replace(/\s+$/, ""));
            break;
          case "D":
            G.length === 8 ? o[O][V] = new Date(+G.slice(0, 4), +G.slice(4, 6) - 1, +G.slice(6, 8)) : o[O][V] = G;
            break;
          case "F":
            o[O][V] = parseFloat(G.trim());
            break;
          case "+":
          case "I":
            o[O][V] = T ? M.read_shift(-4, "i") ^ 2147483648 : M.read_shift(4, "i");
            break;
          case "L":
            switch (G.trim().toUpperCase()) {
              case "Y":
              case "T":
                o[O][V] = !0;
                break;
              case "N":
              case "F":
                o[O][V] = !1;
                break;
              case "":
              case "?":
                break;
              default:
                throw new Error("DBF Unrecognized L:|" + G + "|");
            }
            break;
          case "M":
            if (!p) throw new Error("DBF Unexpected MEMO for type " + x.toString(16));
            o[O][V] = "##MEMO##" + (T ? parseInt(G.trim(), 10) : M.read_shift(4));
            break;
          case "N":
            G = G.replace(/\u0000/g, "").trim(), G && G != "." && (o[O][V] = +G || 0);
            break;
          case "@":
            o[O][V] = new Date(M.read_shift(-8, "f") - 621356832e5);
            break;
          case "T":
            o[O][V] = new Date((M.read_shift(4) - 2440588) * 864e5 + M.read_shift(4));
            break;
          case "Y":
            o[O][V] = M.read_shift(4, "i") / 1e4 + M.read_shift(4, "i") / 1e4 * Math.pow(2, 32);
            break;
          case "O":
            o[O][V] = -M.read_shift(-8, "f");
            break;
          case "B":
            if (v && D[V].len == 8) {
              o[O][V] = M.read_shift(8, "f");
              break;
            }
          case "G":
          case "P":
            M.l += D[V].len;
            break;
          case "0":
            if (D[V].name === "_NullFlags") break;
          default:
            throw new Error("DBF Unsupported data type " + D[V].type);
        }
      }
    }
    if (x != 2 && c.l < c.length && c[c.l++] != 26) throw new Error("DBF EOF Marker missing " + (c.l - 1) + " of " + c.length + " " + c[c.l - 1].toString(16));
    return f && f.sheetRows && (o = o.slice(0, f.sheetRows)), f.DBF = D, o;
  }
  function n(l, f) {
    var o = f || {};
    o.dateNF || (o.dateNF = "yyyymmdd");
    var c = Zr(t(l, o), o);
    return c["!cols"] = o.DBF.map(function(x) {
      return {
        wch: x.len,
        DBF: x
      };
    }), delete o.DBF, c;
  }
  function a(l, f) {
    try {
      return Or(n(l, f), f);
    } catch (o) {
      if (f && f.WTF) throw o;
    }
    return { SheetNames: [], Sheets: {} };
  }
  var i = { B: 8, C: 250, L: 1, D: 8, "?": 0, "": 0 };
  function s(l, f) {
    var o = f || {};
    if (+o.codepage >= 0 && pn(+o.codepage), o.type == "string") throw new Error("Cannot write DBF to JS string");
    var c = St(), x = na(l, { header: 1, raw: !0, cellDates: !0 }), p = x[0], v = x.slice(1), T = l["!cols"] || [], u = 0, h = 0, y = 0, C = 1;
    for (u = 0; u < p.length; ++u) {
      if (((T[u] || {}).DBF || {}).name) {
        p[u] = T[u].DBF.name, ++y;
        continue;
      }
      if (p[u] != null) {
        if (++y, typeof p[u] == "number" && (p[u] = p[u].toString(10)), typeof p[u] != "string") throw new Error("DBF Invalid column name " + p[u] + " |" + typeof p[u] + "|");
        if (p.indexOf(p[u]) !== u) {
          for (h = 0; h < 1024; ++h)
            if (p.indexOf(p[u] + "_" + h) == -1) {
              p[u] += "_" + h;
              break;
            }
        }
      }
    }
    var D = He(l["!ref"]), L = [], q = [], se = [];
    for (u = 0; u <= D.e.c - D.s.c; ++u) {
      var O = "", V = "", M = 0, G = [];
      for (h = 0; h < v.length; ++h)
        v[h][u] != null && G.push(v[h][u]);
      if (G.length == 0 || p[u] == null) {
        L[u] = "?";
        continue;
      }
      for (h = 0; h < G.length; ++h) {
        switch (typeof G[h]) {
          case "number":
            V = "B";
            break;
          case "string":
            V = "C";
            break;
          case "boolean":
            V = "L";
            break;
          case "object":
            V = G[h] instanceof Date ? "D" : "C";
            break;
          default:
            V = "C";
        }
        M = Math.max(M, String(G[h]).length), O = O && O != V ? "C" : V;
      }
      M > 250 && (M = 250), V = ((T[u] || {}).DBF || {}).type, V == "C" && T[u].DBF.len > M && (M = T[u].DBF.len), O == "B" && V == "N" && (O = "N", se[u] = T[u].DBF.dec, M = T[u].DBF.len), q[u] = O == "C" || V == "N" ? M : i[O] || 0, C += q[u], L[u] = O;
    }
    var z = c.next(32);
    for (z.write_shift(4, 318902576), z.write_shift(4, v.length), z.write_shift(2, 296 + 32 * y), z.write_shift(2, C), u = 0; u < 4; ++u) z.write_shift(4, 0);
    for (z.write_shift(4, 0 | (+r[
      /*::String(*/
      ni
      /*::)*/
    ] || 3) << 8), u = 0, h = 0; u < p.length; ++u)
      if (p[u] != null) {
        var K = c.next(32), fe = (p[u].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
        K.write_shift(1, fe, "sbcs"), K.write_shift(1, L[u] == "?" ? "C" : L[u], "sbcs"), K.write_shift(4, h), K.write_shift(1, q[u] || i[L[u]] || 0), K.write_shift(1, se[u] || 0), K.write_shift(1, 2), K.write_shift(4, 0), K.write_shift(1, 0), K.write_shift(4, 0), K.write_shift(4, 0), h += q[u] || i[L[u]] || 0;
      }
    var pe = c.next(264);
    for (pe.write_shift(4, 13), u = 0; u < 65; ++u) pe.write_shift(4, 0);
    for (u = 0; u < v.length; ++u) {
      var Ee = c.next(C);
      for (Ee.write_shift(1, 0), h = 0; h < p.length; ++h)
        if (p[h] != null)
          switch (L[h]) {
            case "L":
              Ee.write_shift(1, v[u][h] == null ? 63 : v[u][h] ? 84 : 70);
              break;
            case "B":
              Ee.write_shift(8, v[u][h] || 0, "f");
              break;
            case "N":
              var Ge = "0";
              for (typeof v[u][h] == "number" && (Ge = v[u][h].toFixed(se[h] || 0)), y = 0; y < q[h] - Ge.length; ++y) Ee.write_shift(1, 32);
              Ee.write_shift(1, Ge, "sbcs");
              break;
            case "D":
              v[u][h] ? (Ee.write_shift(4, ("0000" + v[u][h].getFullYear()).slice(-4), "sbcs"), Ee.write_shift(2, ("00" + (v[u][h].getMonth() + 1)).slice(-2), "sbcs"), Ee.write_shift(2, ("00" + v[u][h].getDate()).slice(-2), "sbcs")) : Ee.write_shift(8, "00000000", "sbcs");
              break;
            case "C":
              var Le = String(v[u][h] != null ? v[u][h] : "").slice(0, q[h]);
              for (Ee.write_shift(1, Le, "sbcs"), y = 0; y < q[h] - Le.length; ++y) Ee.write_shift(1, 32);
              break;
          }
    }
    return c.next(1).write_shift(1, 26), c.end();
  }
  return {
    to_workbook: a,
    to_sheet: n,
    from_sheet: s
  };
}(), Uo = /* @__PURE__ */ function() {
  var e = {
    AA: "À",
    BA: "Á",
    CA: "Â",
    DA: 195,
    HA: "Ä",
    JA: 197,
    AE: "È",
    BE: "É",
    CE: "Ê",
    HE: "Ë",
    AI: "Ì",
    BI: "Í",
    CI: "Î",
    HI: "Ï",
    AO: "Ò",
    BO: "Ó",
    CO: "Ô",
    DO: 213,
    HO: "Ö",
    AU: "Ù",
    BU: "Ú",
    CU: "Û",
    HU: "Ü",
    Aa: "à",
    Ba: "á",
    Ca: "â",
    Da: 227,
    Ha: "ä",
    Ja: 229,
    Ae: "è",
    Be: "é",
    Ce: "ê",
    He: "ë",
    Ai: "ì",
    Bi: "í",
    Ci: "î",
    Hi: "ï",
    Ao: "ò",
    Bo: "ó",
    Co: "ô",
    Do: 245,
    Ho: "ö",
    Au: "ù",
    Bu: "ú",
    Cu: "û",
    Hu: "ü",
    KC: "Ç",
    Kc: "ç",
    q: "æ",
    z: "œ",
    a: "Æ",
    j: "Œ",
    DN: 209,
    Dn: 241,
    Hy: 255,
    S: 169,
    c: 170,
    R: 174,
    "B ": 180,
    /*::[*/
    0: 176,
    /*::[*/
    1: 177,
    /*::[*/
    2: 178,
    /*::[*/
    3: 179,
    /*::[*/
    5: 181,
    /*::[*/
    6: 182,
    /*::[*/
    7: 183,
    Q: 185,
    k: 186,
    b: 208,
    i: 216,
    l: 222,
    s: 240,
    y: 248,
    "!": 161,
    '"': 162,
    "#": 163,
    "(": 164,
    "%": 165,
    "'": 167,
    "H ": 168,
    "+": 171,
    ";": 187,
    "<": 188,
    "=": 189,
    ">": 190,
    "?": 191,
    "{": 223
  }, r = new RegExp("\x1BN(" + dt(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm"), t = function(p, v) {
    var T = e[v];
    return typeof T == "number" ? v0(T) : T;
  }, n = function(p, v, T) {
    var u = v.charCodeAt(0) - 32 << 4 | T.charCodeAt(0) - 48;
    return u == 59 ? p : v0(u);
  };
  e["|"] = 254;
  function a(p, v) {
    switch (v.type) {
      case "base64":
        return i(rr(p), v);
      case "binary":
        return i(p, v);
      case "buffer":
        return i(Pe && Buffer.isBuffer(p) ? p.toString("binary") : An(p), v);
      case "array":
        return i(fa(p), v);
    }
    throw new Error("Unrecognized type " + v.type);
  }
  function i(p, v) {
    var T = p.split(/[\n\r]+/), u = -1, h = -1, y = 0, C = 0, D = [], L = [], q = null, se = {}, O = [], V = [], M = [], G = 0, z;
    for (+v.codepage >= 0 && pn(+v.codepage); y !== T.length; ++y) {
      G = 0;
      var K = T[y].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, n).replace(r, t), fe = K.replace(/;;/g, "\0").split(";").map(function(F) {
        return F.replace(/\u0000/g, ";");
      }), pe = fe[0], Ee;
      if (K.length > 0) switch (pe) {
        case "ID":
          break;
        case "E":
          break;
        case "B":
          break;
        case "O":
          break;
        case "W":
          break;
        case "P":
          fe[1].charAt(0) == "P" && L.push(K.slice(3).replace(/;;/g, ";"));
          break;
        case "C":
          var Ge = !1, Le = !1, lt = !1, Ve = !1, rt = -1, H = -1;
          for (C = 1; C < fe.length; ++C) switch (fe[C].charAt(0)) {
            case "A":
              break;
            case "X":
              h = parseInt(fe[C].slice(1)) - 1, Le = !0;
              break;
            case "Y":
              for (u = parseInt(fe[C].slice(1)) - 1, Le || (h = 0), z = D.length; z <= u; ++z) D[z] = [];
              break;
            case "K":
              Ee = fe[C].slice(1), Ee.charAt(0) === '"' ? Ee = Ee.slice(1, Ee.length - 1) : Ee === "TRUE" ? Ee = !0 : Ee === "FALSE" ? Ee = !1 : isNaN(er(Ee)) ? isNaN(gn(Ee).getDate()) || (Ee = Tt(Ee)) : (Ee = er(Ee), q !== null && vi(q) && (Ee = _i(Ee))), Ge = !0;
              break;
            case "E":
              Ve = !0;
              var m = Bc(fe[C].slice(1), { r: u, c: h });
              D[u][h] = [D[u][h], m];
              break;
            case "S":
              lt = !0, D[u][h] = [D[u][h], "S5S"];
              break;
            case "G":
              break;
            case "R":
              rt = parseInt(fe[C].slice(1)) - 1;
              break;
            case "C":
              H = parseInt(fe[C].slice(1)) - 1;
              break;
            default:
              if (v && v.WTF) throw new Error("SYLK bad record " + K);
          }
          if (Ge && (D[u][h] && D[u][h].length == 2 ? D[u][h][0] = Ee : D[u][h] = Ee, q = null), lt) {
            if (Ve) throw new Error("SYLK shared formula cannot have own formula");
            var k = rt > -1 && D[rt][H];
            if (!k || !k[1]) throw new Error("SYLK shared formula cannot find base");
            D[u][h][1] = bc(k[1], { r: u - rt, c: h - H });
          }
          break;
        case "F":
          var A = 0;
          for (C = 1; C < fe.length; ++C) switch (fe[C].charAt(0)) {
            case "X":
              h = parseInt(fe[C].slice(1)) - 1, ++A;
              break;
            case "Y":
              for (u = parseInt(fe[C].slice(1)) - 1, z = D.length; z <= u; ++z) D[z] = [];
              break;
            case "M":
              G = parseInt(fe[C].slice(1)) / 20;
              break;
            case "F":
              break;
            case "G":
              break;
            case "P":
              q = L[parseInt(fe[C].slice(1))];
              break;
            case "S":
              break;
            case "D":
              break;
            case "N":
              break;
            case "W":
              for (M = fe[C].slice(1).split(" "), z = parseInt(M[0], 10); z <= parseInt(M[1], 10); ++z)
                G = parseInt(M[2], 10), V[z - 1] = G === 0 ? { hidden: !0 } : { wch: G }, Qa(V[z - 1]);
              break;
            case "C":
              h = parseInt(fe[C].slice(1)) - 1, V[h] || (V[h] = {});
              break;
            case "R":
              u = parseInt(fe[C].slice(1)) - 1, O[u] || (O[u] = {}), G > 0 ? (O[u].hpt = G, O[u].hpx = ss(G)) : G === 0 && (O[u].hidden = !0);
              break;
            default:
              if (v && v.WTF) throw new Error("SYLK bad record " + K);
          }
          A < 1 && (q = null);
          break;
        default:
          if (v && v.WTF) throw new Error("SYLK bad record " + K);
      }
    }
    return O.length > 0 && (se["!rows"] = O), V.length > 0 && (se["!cols"] = V), v && v.sheetRows && (D = D.slice(0, v.sheetRows)), [D, se];
  }
  function s(p, v) {
    var T = a(p, v), u = T[0], h = T[1], y = Zr(u, v);
    return dt(h).forEach(function(C) {
      y[C] = h[C];
    }), y;
  }
  function l(p, v) {
    return Or(s(p, v), v);
  }
  function f(p, v, T, u) {
    var h = "C;Y" + (T + 1) + ";X" + (u + 1) + ";K";
    switch (p.t) {
      case "n":
        h += p.v || 0, p.f && !p.F && (h += ";E" + t0(p.f, { r: T, c: u }));
        break;
      case "b":
        h += p.v ? "TRUE" : "FALSE";
        break;
      case "e":
        h += p.w || p.v;
        break;
      case "d":
        h += '"' + (p.w || p.v) + '"';
        break;
      case "s":
        h += '"' + p.v.replace(/"/g, "").replace(/;/g, ";;") + '"';
        break;
    }
    return h;
  }
  function o(p, v) {
    v.forEach(function(T, u) {
      var h = "F;W" + (u + 1) + " " + (u + 1) + " ";
      T.hidden ? h += "0" : (typeof T.width == "number" && !T.wpx && (T.wpx = Qn(T.width)), typeof T.wpx == "number" && !T.wch && (T.wch = ea(T.wpx)), typeof T.wch == "number" && (h += Math.round(T.wch))), h.charAt(h.length - 1) != " " && p.push(h);
    });
  }
  function c(p, v) {
    v.forEach(function(T, u) {
      var h = "F;";
      T.hidden ? h += "M0;" : T.hpt ? h += "M" + 20 * T.hpt + ";" : T.hpx && (h += "M" + 20 * ta(T.hpx) + ";"), h.length > 2 && p.push(h + "R" + (u + 1));
    });
  }
  function x(p, v) {
    var T = ["ID;PWXL;N;E"], u = [], h = He(p["!ref"]), y, C = Array.isArray(p), D = `\r
`;
    T.push("P;PGeneral"), T.push("F;P0;DG0G8;M255"), p["!cols"] && o(T, p["!cols"]), p["!rows"] && c(T, p["!rows"]), T.push("B;Y" + (h.e.r - h.s.r + 1) + ";X" + (h.e.c - h.s.c + 1) + ";D" + [h.s.c, h.s.r, h.e.c, h.e.r].join(" "));
    for (var L = h.s.r; L <= h.e.r; ++L)
      for (var q = h.s.c; q <= h.e.c; ++q) {
        var se = Ue({ r: L, c: q });
        y = C ? (p[L] || [])[q] : p[se], !(!y || y.v == null && (!y.f || y.F)) && u.push(f(y, p, L, q));
      }
    return T.join(D) + D + u.join(D) + D + "E" + D;
  }
  return {
    to_workbook: l,
    to_sheet: s,
    from_sheet: x
  };
}(), Wo = /* @__PURE__ */ function() {
  function e(i, s) {
    switch (s.type) {
      case "base64":
        return r(rr(i), s);
      case "binary":
        return r(i, s);
      case "buffer":
        return r(Pe && Buffer.isBuffer(i) ? i.toString("binary") : An(i), s);
      case "array":
        return r(fa(i), s);
    }
    throw new Error("Unrecognized type " + s.type);
  }
  function r(i, s) {
    for (var l = i.split(`
`), f = -1, o = -1, c = 0, x = []; c !== l.length; ++c) {
      if (l[c].trim() === "BOT") {
        x[++f] = [], o = 0;
        continue;
      }
      if (!(f < 0)) {
        var p = l[c].trim().split(","), v = p[0], T = p[1];
        ++c;
        for (var u = l[c] || ""; (u.match(/["]/g) || []).length & 1 && c < l.length - 1; ) u += `
` + l[++c];
        switch (u = u.trim(), +v) {
          case -1:
            if (u === "BOT") {
              x[++f] = [], o = 0;
              continue;
            } else if (u !== "EOD") throw new Error("Unrecognized DIF special command " + u);
            break;
          case 0:
            u === "TRUE" ? x[f][o] = !0 : u === "FALSE" ? x[f][o] = !1 : isNaN(er(T)) ? isNaN(gn(T).getDate()) ? x[f][o] = T : x[f][o] = Tt(T) : x[f][o] = er(T), ++o;
            break;
          case 1:
            u = u.slice(1, u.length - 1), u = u.replace(/""/g, '"'), u && u.match(/^=".*"$/) && (u = u.slice(2, -1)), x[f][o++] = u !== "" ? u : null;
            break;
        }
        if (u === "EOD") break;
      }
    }
    return s && s.sheetRows && (x = x.slice(0, s.sheetRows)), x;
  }
  function t(i, s) {
    return Zr(e(i, s), s);
  }
  function n(i, s) {
    return Or(t(i, s), s);
  }
  var a = /* @__PURE__ */ function() {
    var i = function(f, o, c, x, p) {
      f.push(o), f.push(c + "," + x), f.push('"' + p.replace(/"/g, '""') + '"');
    }, s = function(f, o, c, x) {
      f.push(o + "," + c), f.push(o == 1 ? '"' + x.replace(/"/g, '""') + '"' : x);
    };
    return function(f) {
      var o = [], c = He(f["!ref"]), x, p = Array.isArray(f);
      i(o, "TABLE", 0, 1, "sheetjs"), i(o, "VECTORS", 0, c.e.r - c.s.r + 1, ""), i(o, "TUPLES", 0, c.e.c - c.s.c + 1, ""), i(o, "DATA", 0, 0, "");
      for (var v = c.s.r; v <= c.e.r; ++v) {
        s(o, -1, 0, "BOT");
        for (var T = c.s.c; T <= c.e.c; ++T) {
          var u = Ue({ r: v, c: T });
          if (x = p ? (f[v] || [])[T] : f[u], !x) {
            s(o, 1, 0, "");
            continue;
          }
          switch (x.t) {
            case "n":
              var h = x.w;
              !h && x.v != null && (h = x.v), h == null ? x.f && !x.F ? s(o, 1, 0, "=" + x.f) : s(o, 1, 0, "") : s(o, 0, h, "V");
              break;
            case "b":
              s(o, 0, x.v ? 1 : 0, x.v ? "TRUE" : "FALSE");
              break;
            case "s":
              s(o, 1, 0, isNaN(x.v) ? x.v : '="' + x.v + '"');
              break;
            case "d":
              x.w || (x.w = vr(x.z || Je[14], At(Tt(x.v)))), s(o, 0, x.w, "V");
              break;
            default:
              s(o, 1, 0, "");
          }
        }
      }
      s(o, -1, 0, "EOD");
      var y = `\r
`, C = o.join(y);
      return C;
    };
  }();
  return {
    to_workbook: n,
    to_sheet: t,
    from_sheet: a
  };
}(), rs = /* @__PURE__ */ function() {
  function e(x) {
    return x.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, `
`);
  }
  function r(x) {
    return x.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n");
  }
  function t(x, p) {
    for (var v = x.split(`
`), T = -1, u = -1, h = 0, y = []; h !== v.length; ++h) {
      var C = v[h].trim().split(":");
      if (C[0] === "cell") {
        var D = it(C[1]);
        if (y.length <= D.r) for (T = y.length; T <= D.r; ++T) y[T] || (y[T] = []);
        switch (T = D.r, u = D.c, C[2]) {
          case "t":
            y[T][u] = e(C[3]);
            break;
          case "v":
            y[T][u] = +C[3];
            break;
          case "vtf":
            var L = C[C.length - 1];
          case "vtc":
            switch (C[3]) {
              case "nl":
                y[T][u] = !!+C[4];
                break;
              default:
                y[T][u] = +C[4];
                break;
            }
            C[2] == "vtf" && (y[T][u] = [y[T][u], L]);
        }
      }
    }
    return p && p.sheetRows && (y = y.slice(0, p.sheetRows)), y;
  }
  function n(x, p) {
    return Zr(t(x, p), p);
  }
  function a(x, p) {
    return Or(n(x, p), p);
  }
  var i = [
    "socialcalc:version:1.5",
    "MIME-Version: 1.0",
    "Content-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave"
  ].join(`
`), s = [
    "--SocialCalcSpreadsheetControlSave",
    "Content-type: text/plain; charset=UTF-8"
  ].join(`
`) + `
`, l = [
    "# SocialCalc Spreadsheet Control Save",
    "part:sheet"
  ].join(`
`), f = "--SocialCalcSpreadsheetControlSave--";
  function o(x) {
    if (!x || !x["!ref"]) return "";
    for (var p = [], v = [], T, u = "", h = Rt(x["!ref"]), y = Array.isArray(x), C = h.s.r; C <= h.e.r; ++C)
      for (var D = h.s.c; D <= h.e.c; ++D)
        if (u = Ue({ r: C, c: D }), T = y ? (x[C] || [])[D] : x[u], !(!T || T.v == null || T.t === "z")) {
          switch (v = ["cell", u, "t"], T.t) {
            case "s":
            case "str":
              v.push(r(T.v));
              break;
            case "n":
              T.f ? (v[2] = "vtf", v[3] = "n", v[4] = T.v, v[5] = r(T.f)) : (v[2] = "v", v[3] = T.v);
              break;
            case "b":
              v[2] = "vt" + (T.f ? "f" : "c"), v[3] = "nl", v[4] = T.v ? "1" : "0", v[5] = r(T.f || (T.v ? "TRUE" : "FALSE"));
              break;
            case "d":
              var L = At(Tt(T.v));
              v[2] = "vtc", v[3] = "nd", v[4] = "" + L, v[5] = T.w || vr(T.z || Je[14], L);
              break;
            case "e":
              continue;
          }
          p.push(v.join(":"));
        }
    return p.push("sheet:c:" + (h.e.c - h.s.c + 1) + ":r:" + (h.e.r - h.s.r + 1) + ":tvf:1"), p.push("valueformat:1:text-wiki"), p.join(`
`);
  }
  function c(x) {
    return [i, s, l, s, o(x), f].join(`
`);
  }
  return {
    to_workbook: a,
    to_sheet: n,
    from_sheet: c
  };
}(), $o = /* @__PURE__ */ function() {
  function e(c, x, p, v, T) {
    T.raw ? x[p][v] = c : c === "" || (c === "TRUE" ? x[p][v] = !0 : c === "FALSE" ? x[p][v] = !1 : isNaN(er(c)) ? isNaN(gn(c).getDate()) ? x[p][v] = c : x[p][v] = Tt(c) : x[p][v] = er(c));
  }
  function r(c, x) {
    var p = x || {}, v = [];
    if (!c || c.length === 0) return v;
    for (var T = c.split(/[\r\n]/), u = T.length - 1; u >= 0 && T[u].length === 0; ) --u;
    for (var h = 10, y = 0, C = 0; C <= u; ++C)
      y = T[C].indexOf(" "), y == -1 ? y = T[C].length : y++, h = Math.max(h, y);
    for (C = 0; C <= u; ++C) {
      v[C] = [];
      var D = 0;
      for (e(T[C].slice(0, h).trim(), v, C, D, p), D = 1; D <= (T[C].length - h) / 10 + 1; ++D)
        e(T[C].slice(h + (D - 1) * 10, h + D * 10).trim(), v, C, D, p);
    }
    return p.sheetRows && (v = v.slice(0, p.sheetRows)), v;
  }
  var t = {
    /*::[*/
    44: ",",
    /*::[*/
    9: "	",
    /*::[*/
    59: ";",
    /*::[*/
    124: "|"
  }, n = {
    /*::[*/
    44: 3,
    /*::[*/
    9: 2,
    /*::[*/
    59: 1,
    /*::[*/
    124: 0
  };
  function a(c) {
    for (var x = {}, p = !1, v = 0, T = 0; v < c.length; ++v)
      (T = c.charCodeAt(v)) == 34 ? p = !p : !p && T in t && (x[T] = (x[T] || 0) + 1);
    T = [];
    for (v in x) Object.prototype.hasOwnProperty.call(x, v) && T.push([x[v], v]);
    if (!T.length) {
      x = n;
      for (v in x) Object.prototype.hasOwnProperty.call(x, v) && T.push([x[v], v]);
    }
    return T.sort(function(u, h) {
      return u[0] - h[0] || n[u[1]] - n[h[1]];
    }), t[T.pop()[1]] || 44;
  }
  function i(c, x) {
    var p = x || {}, v = "", T = p.dense ? [] : {}, u = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    c.slice(0, 4) == "sep=" ? c.charCodeAt(5) == 13 && c.charCodeAt(6) == 10 ? (v = c.charAt(4), c = c.slice(7)) : c.charCodeAt(5) == 13 || c.charCodeAt(5) == 10 ? (v = c.charAt(4), c = c.slice(6)) : v = a(c.slice(0, 1024)) : p && p.FS ? v = p.FS : v = a(c.slice(0, 1024));
    var h = 0, y = 0, C = 0, D = 0, L = 0, q = v.charCodeAt(0), se = !1, O = 0, V = c.charCodeAt(0);
    c = c.replace(/\r\n/mg, `
`);
    var M = p.dateNF != null ? tf(p.dateNF) : null;
    function G() {
      var z = c.slice(D, L), K = {};
      if (z.charAt(0) == '"' && z.charAt(z.length - 1) == '"' && (z = z.slice(1, -1).replace(/""/g, '"')), z.length === 0) K.t = "z";
      else if (p.raw)
        K.t = "s", K.v = z;
      else if (z.trim().length === 0)
        K.t = "s", K.v = z;
      else if (z.charCodeAt(0) == 61)
        z.charCodeAt(1) == 34 && z.charCodeAt(z.length - 1) == 34 ? (K.t = "s", K.v = z.slice(2, -1).replace(/""/g, '"')) : Uc(z) ? (K.t = "n", K.f = z.slice(1)) : (K.t = "s", K.v = z);
      else if (z == "TRUE")
        K.t = "b", K.v = !0;
      else if (z == "FALSE")
        K.t = "b", K.v = !1;
      else if (!isNaN(C = er(z)))
        K.t = "n", p.cellText !== !1 && (K.w = z), K.v = C;
      else if (!isNaN(gn(z).getDate()) || M && z.match(M)) {
        K.z = p.dateNF || Je[14];
        var fe = 0;
        M && z.match(M) && (z = rf(z, p.dateNF, z.match(M) || []), fe = 1), p.cellDates ? (K.t = "d", K.v = Tt(z, fe)) : (K.t = "n", K.v = At(Tt(z, fe))), p.cellText !== !1 && (K.w = vr(K.z, K.v instanceof Date ? At(K.v) : K.v)), p.cellNF || delete K.z;
      } else
        K.t = "s", K.v = z;
      if (K.t == "z" || (p.dense ? (T[h] || (T[h] = []), T[h][y] = K) : T[Ue({ c: y, r: h })] = K), D = L + 1, V = c.charCodeAt(D), u.e.c < y && (u.e.c = y), u.e.r < h && (u.e.r = h), O == q) ++y;
      else if (y = 0, ++h, p.sheetRows && p.sheetRows <= h) return !0;
    }
    e: for (; L < c.length; ++L) switch (O = c.charCodeAt(L)) {
      case 34:
        V === 34 && (se = !se);
        break;
      case q:
      case 10:
      case 13:
        if (!se && G()) break e;
        break;
    }
    return L - D > 0 && G(), T["!ref"] = Qe(u), T;
  }
  function s(c, x) {
    return !(x && x.PRN) || x.FS || c.slice(0, 4) == "sep=" || c.indexOf("	") >= 0 || c.indexOf(",") >= 0 || c.indexOf(";") >= 0 ? i(c, x) : Zr(r(c, x), x);
  }
  function l(c, x) {
    var p = "", v = x.type == "string" ? [0, 0, 0, 0] : Qd(c, x);
    switch (x.type) {
      case "base64":
        p = rr(c);
        break;
      case "binary":
        p = c;
        break;
      case "buffer":
        x.codepage == 65001 ? p = c.toString("utf8") : x.codepage && typeof Gn < "u" || (p = Pe && Buffer.isBuffer(c) ? c.toString("binary") : An(c));
        break;
      case "array":
        p = fa(c);
        break;
      case "string":
        p = c;
        break;
      default:
        throw new Error("Unrecognized type " + x.type);
    }
    return v[0] == 239 && v[1] == 187 && v[2] == 191 ? p = cn(p.slice(3)) : x.type != "string" && x.type != "buffer" && x.codepage == 65001 ? p = cn(p) : x.type == "binary" && typeof Gn < "u", p.slice(0, 19) == "socialcalc:version:" ? rs.to_sheet(x.type == "string" ? p : cn(p), x) : s(p, x);
  }
  function f(c, x) {
    return Or(l(c, x), x);
  }
  function o(c) {
    for (var x = [], p = He(c["!ref"]), v, T = Array.isArray(c), u = p.s.r; u <= p.e.r; ++u) {
      for (var h = [], y = p.s.c; y <= p.e.c; ++y) {
        var C = Ue({ r: u, c: y });
        if (v = T ? (c[u] || [])[y] : c[C], !v || v.v == null) {
          h.push("          ");
          continue;
        }
        for (var D = (v.w || (nr(v), v.w) || "").slice(0, 10); D.length < 10; ) D += " ";
        h.push(D + (y === 0 ? " " : ""));
      }
      x.push(h.join(""));
    }
    return x.join(`
`);
  }
  return {
    to_workbook: f,
    to_sheet: l,
    from_sheet: o
  };
}(), X0 = /* @__PURE__ */ function() {
  function e(m, k, A) {
    if (m) {
      Dt(m, m.l || 0);
      for (var F = A.Enum || rt; m.l < m.length; ) {
        var B = m.read_shift(2), ie = F[B] || F[65535], xe = m.read_shift(2), de = m.l + xe, ne = ie.f && ie.f(m, xe, A);
        if (m.l = de, k(ne, ie, B)) return;
      }
    }
  }
  function r(m, k) {
    switch (k.type) {
      case "base64":
        return t($t(rr(m)), k);
      case "binary":
        return t($t(m), k);
      case "buffer":
      case "array":
        return t(m, k);
    }
    throw "Unsupported type " + k.type;
  }
  function t(m, k) {
    if (!m) return m;
    var A = k || {}, F = A.dense ? [] : {}, B = "Sheet1", ie = "", xe = 0, de = {}, ne = [], Fe = [], Se = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, me = A.sheetRows || 0;
    if (m[2] == 0 && (m[3] == 8 || m[3] == 9) && m.length >= 16 && m[14] == 5 && m[15] === 108)
      throw new Error("Unsupported Works 3 for Mac file");
    if (m[2] == 2)
      A.Enum = rt, e(m, function(ue, mt, Et) {
        switch (Et) {
          case 0:
            A.vers = ue, ue >= 4096 && (A.qpro = !0);
            break;
          case 6:
            Se = ue;
            break;
          case 204:
            ue && (ie = ue);
            break;
          case 222:
            ie = ue;
            break;
          case 15:
          case 51:
            A.qpro || (ue[1].v = ue[1].v.slice(1));
          case 13:
          case 14:
          case 16:
            Et == 14 && (ue[2] & 112) == 112 && (ue[2] & 15) > 1 && (ue[2] & 15) < 15 && (ue[1].z = A.dateNF || Je[14], A.cellDates && (ue[1].t = "d", ue[1].v = _i(ue[1].v))), A.qpro && ue[3] > xe && (F["!ref"] = Qe(Se), de[B] = F, ne.push(B), F = A.dense ? [] : {}, Se = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, xe = ue[3], B = ie || "Sheet" + (xe + 1), ie = "");
            var Bt = A.dense ? (F[ue[0].r] || [])[ue[0].c] : F[Ue(ue[0])];
            if (Bt) {
              Bt.t = ue[1].t, Bt.v = ue[1].v, ue[1].z != null && (Bt.z = ue[1].z), ue[1].f != null && (Bt.f = ue[1].f);
              break;
            }
            A.dense ? (F[ue[0].r] || (F[ue[0].r] = []), F[ue[0].r][ue[0].c] = ue[1]) : F[Ue(ue[0])] = ue[1];
            break;
        }
      }, A);
    else if (m[2] == 26 || m[2] == 14)
      A.Enum = H, m[2] == 14 && (A.qpro = !0, m.l = 0), e(m, function(ue, mt, Et) {
        switch (Et) {
          case 204:
            B = ue;
            break;
          case 22:
            ue[1].v = ue[1].v.slice(1);
          case 23:
          case 24:
          case 25:
          case 37:
          case 39:
          case 40:
            if (ue[3] > xe && (F["!ref"] = Qe(Se), de[B] = F, ne.push(B), F = A.dense ? [] : {}, Se = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, xe = ue[3], B = "Sheet" + (xe + 1)), me > 0 && ue[0].r >= me) break;
            A.dense ? (F[ue[0].r] || (F[ue[0].r] = []), F[ue[0].r][ue[0].c] = ue[1]) : F[Ue(ue[0])] = ue[1], Se.e.c < ue[0].c && (Se.e.c = ue[0].c), Se.e.r < ue[0].r && (Se.e.r = ue[0].r);
            break;
          case 27:
            ue[14e3] && (Fe[ue[14e3][0]] = ue[14e3][1]);
            break;
          case 1537:
            Fe[ue[0]] = ue[1], ue[0] == xe && (B = ue[1]);
            break;
        }
      }, A);
    else throw new Error("Unrecognized LOTUS BOF " + m[2]);
    if (F["!ref"] = Qe(Se), de[ie || B] = F, ne.push(ie || B), !Fe.length) return { SheetNames: ne, Sheets: de };
    for (var Te = {}, ze = [], ke = 0; ke < Fe.length; ++ke) de[ne[ke]] ? (ze.push(Fe[ke] || ne[ke]), Te[Fe[ke]] = de[Fe[ke]] || de[ne[ke]]) : (ze.push(Fe[ke]), Te[Fe[ke]] = { "!ref": "A1" });
    return { SheetNames: ze, Sheets: Te };
  }
  function n(m, k) {
    var A = k || {};
    if (+A.codepage >= 0 && pn(+A.codepage), A.type == "string") throw new Error("Cannot write WK1 to JS string");
    var F = St(), B = He(m["!ref"]), ie = Array.isArray(m), xe = [];
    re(F, 0, i(1030)), re(F, 6, f(B));
    for (var de = Math.min(B.e.r, 8191), ne = B.s.r; ne <= de; ++ne)
      for (var Fe = ht(ne), Se = B.s.c; Se <= B.e.c; ++Se) {
        ne === B.s.r && (xe[Se] = vt(Se));
        var me = xe[Se] + Fe, Te = ie ? (m[ne] || [])[Se] : m[me];
        if (!(!Te || Te.t == "z"))
          if (Te.t == "n")
            (Te.v | 0) == Te.v && Te.v >= -32768 && Te.v <= 32767 ? re(F, 13, v(ne, Se, Te.v)) : re(F, 14, u(ne, Se, Te.v));
          else {
            var ze = nr(Te);
            re(F, 15, x(ne, Se, ze.slice(0, 239)));
          }
      }
    return re(F, 1), F.end();
  }
  function a(m, k) {
    var A = k || {};
    if (+A.codepage >= 0 && pn(+A.codepage), A.type == "string") throw new Error("Cannot write WK3 to JS string");
    var F = St();
    re(F, 0, s(m));
    for (var B = 0, ie = 0; B < m.SheetNames.length; ++B) (m.Sheets[m.SheetNames[B]] || {})["!ref"] && re(F, 27, Ve(m.SheetNames[B], ie++));
    var xe = 0;
    for (B = 0; B < m.SheetNames.length; ++B) {
      var de = m.Sheets[m.SheetNames[B]];
      if (!(!de || !de["!ref"])) {
        for (var ne = He(de["!ref"]), Fe = Array.isArray(de), Se = [], me = Math.min(ne.e.r, 8191), Te = ne.s.r; Te <= me; ++Te)
          for (var ze = ht(Te), ke = ne.s.c; ke <= ne.e.c; ++ke) {
            Te === ne.s.r && (Se[ke] = vt(ke));
            var ue = Se[ke] + ze, mt = Fe ? (de[Te] || [])[ke] : de[ue];
            if (!(!mt || mt.t == "z"))
              if (mt.t == "n")
                re(F, 23, G(Te, ke, xe, mt.v));
              else {
                var Et = nr(mt);
                re(F, 22, O(Te, ke, xe, Et.slice(0, 239)));
              }
          }
        ++xe;
      }
    }
    return re(F, 1), F.end();
  }
  function i(m) {
    var k = U(2);
    return k.write_shift(2, m), k;
  }
  function s(m) {
    var k = U(26);
    k.write_shift(2, 4096), k.write_shift(2, 4), k.write_shift(4, 0);
    for (var A = 0, F = 0, B = 0, ie = 0; ie < m.SheetNames.length; ++ie) {
      var xe = m.SheetNames[ie], de = m.Sheets[xe];
      if (!(!de || !de["!ref"])) {
        ++B;
        var ne = Rt(de["!ref"]);
        A < ne.e.r && (A = ne.e.r), F < ne.e.c && (F = ne.e.c);
      }
    }
    return A > 8191 && (A = 8191), k.write_shift(2, A), k.write_shift(1, B), k.write_shift(1, F), k.write_shift(2, 0), k.write_shift(2, 0), k.write_shift(1, 1), k.write_shift(1, 2), k.write_shift(4, 0), k.write_shift(4, 0), k;
  }
  function l(m, k, A) {
    var F = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    return k == 8 && A.qpro ? (F.s.c = m.read_shift(1), m.l++, F.s.r = m.read_shift(2), F.e.c = m.read_shift(1), m.l++, F.e.r = m.read_shift(2), F) : (F.s.c = m.read_shift(2), F.s.r = m.read_shift(2), k == 12 && A.qpro && (m.l += 2), F.e.c = m.read_shift(2), F.e.r = m.read_shift(2), k == 12 && A.qpro && (m.l += 2), F.s.c == 65535 && (F.s.c = F.e.c = F.s.r = F.e.r = 0), F);
  }
  function f(m) {
    var k = U(8);
    return k.write_shift(2, m.s.c), k.write_shift(2, m.s.r), k.write_shift(2, m.e.c), k.write_shift(2, m.e.r), k;
  }
  function o(m, k, A) {
    var F = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0, 0];
    return A.qpro && A.vers != 20768 ? (F[0].c = m.read_shift(1), F[3] = m.read_shift(1), F[0].r = m.read_shift(2), m.l += 2) : (F[2] = m.read_shift(1), F[0].c = m.read_shift(2), F[0].r = m.read_shift(2)), F;
  }
  function c(m, k, A) {
    var F = m.l + k, B = o(m, k, A);
    if (B[1].t = "s", A.vers == 20768) {
      m.l++;
      var ie = m.read_shift(1);
      return B[1].v = m.read_shift(ie, "utf8"), B;
    }
    return A.qpro && m.l++, B[1].v = m.read_shift(F - m.l, "cstr"), B;
  }
  function x(m, k, A) {
    var F = U(7 + A.length);
    F.write_shift(1, 255), F.write_shift(2, k), F.write_shift(2, m), F.write_shift(1, 39);
    for (var B = 0; B < F.length; ++B) {
      var ie = A.charCodeAt(B);
      F.write_shift(1, ie >= 128 ? 95 : ie);
    }
    return F.write_shift(1, 0), F;
  }
  function p(m, k, A) {
    var F = o(m, k, A);
    return F[1].v = m.read_shift(2, "i"), F;
  }
  function v(m, k, A) {
    var F = U(7);
    return F.write_shift(1, 255), F.write_shift(2, k), F.write_shift(2, m), F.write_shift(2, A, "i"), F;
  }
  function T(m, k, A) {
    var F = o(m, k, A);
    return F[1].v = m.read_shift(8, "f"), F;
  }
  function u(m, k, A) {
    var F = U(13);
    return F.write_shift(1, 255), F.write_shift(2, k), F.write_shift(2, m), F.write_shift(8, A, "f"), F;
  }
  function h(m, k, A) {
    var F = m.l + k, B = o(m, k, A);
    if (B[1].v = m.read_shift(8, "f"), A.qpro) m.l = F;
    else {
      var ie = m.read_shift(2);
      L(m.slice(m.l, m.l + ie), B), m.l += ie;
    }
    return B;
  }
  function y(m, k, A) {
    var F = k & 32768;
    return k &= -32769, k = (F ? m : 0) + (k >= 8192 ? k - 16384 : k), (F ? "" : "$") + (A ? vt(k) : ht(k));
  }
  var C = {
    51: ["FALSE", 0],
    52: ["TRUE", 0],
    70: ["LEN", 1],
    80: ["SUM", 69],
    81: ["AVERAGEA", 69],
    82: ["COUNTA", 69],
    83: ["MINA", 69],
    84: ["MAXA", 69],
    111: ["T", 1]
  }, D = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    // eslint-disable-line no-mixed-spaces-and-tabs
    "",
    "+",
    "-",
    "*",
    "/",
    "^",
    "=",
    "<>",
    // eslint-disable-line no-mixed-spaces-and-tabs
    "<=",
    ">=",
    "<",
    ">",
    "",
    "",
    "",
    "",
    // eslint-disable-line no-mixed-spaces-and-tabs
    "&",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
    // eslint-disable-line no-mixed-spaces-and-tabs
  ];
  function L(m, k) {
    Dt(m, 0);
    for (var A = [], F = 0, B = "", ie = "", xe = "", de = ""; m.l < m.length; ) {
      var ne = m[m.l++];
      switch (ne) {
        case 0:
          A.push(m.read_shift(8, "f"));
          break;
        case 1:
          ie = y(k[0].c, m.read_shift(2), !0), B = y(k[0].r, m.read_shift(2), !1), A.push(ie + B);
          break;
        case 2:
          {
            var Fe = y(k[0].c, m.read_shift(2), !0), Se = y(k[0].r, m.read_shift(2), !1);
            ie = y(k[0].c, m.read_shift(2), !0), B = y(k[0].r, m.read_shift(2), !1), A.push(Fe + Se + ":" + ie + B);
          }
          break;
        case 3:
          if (m.l < m.length) {
            console.error("WK1 premature formula end");
            return;
          }
          break;
        case 4:
          A.push("(" + A.pop() + ")");
          break;
        case 5:
          A.push(m.read_shift(2));
          break;
        case 6:
          {
            for (var me = ""; ne = m[m.l++]; ) me += String.fromCharCode(ne);
            A.push('"' + me.replace(/"/g, '""') + '"');
          }
          break;
        case 8:
          A.push("-" + A.pop());
          break;
        case 23:
          A.push("+" + A.pop());
          break;
        case 22:
          A.push("NOT(" + A.pop() + ")");
          break;
        case 20:
        case 21:
          de = A.pop(), xe = A.pop(), A.push(["AND", "OR"][ne - 20] + "(" + xe + "," + de + ")");
          break;
        default:
          if (ne < 32 && D[ne])
            de = A.pop(), xe = A.pop(), A.push(xe + D[ne] + de);
          else if (C[ne]) {
            if (F = C[ne][1], F == 69 && (F = m[m.l++]), F > A.length) {
              console.error("WK1 bad formula parse 0x" + ne.toString(16) + ":|" + A.join("|") + "|");
              return;
            }
            var Te = A.slice(-F);
            A.length -= F, A.push(C[ne][0] + "(" + Te.join(",") + ")");
          } else return ne <= 7 ? console.error("WK1 invalid opcode " + ne.toString(16)) : ne <= 24 ? console.error("WK1 unsupported op " + ne.toString(16)) : ne <= 30 ? console.error("WK1 invalid opcode " + ne.toString(16)) : ne <= 115 ? console.error("WK1 unsupported function opcode " + ne.toString(16)) : console.error("WK1 unrecognized opcode " + ne.toString(16));
      }
    }
    A.length == 1 ? k[1].f = "" + A[0] : console.error("WK1 bad formula parse |" + A.join("|") + "|");
  }
  function q(m) {
    var k = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0];
    return k[0].r = m.read_shift(2), k[3] = m[m.l++], k[0].c = m[m.l++], k;
  }
  function se(m, k) {
    var A = q(m);
    return A[1].t = "s", A[1].v = m.read_shift(k - 4, "cstr"), A;
  }
  function O(m, k, A, F) {
    var B = U(6 + F.length);
    B.write_shift(2, m), B.write_shift(1, A), B.write_shift(1, k), B.write_shift(1, 39);
    for (var ie = 0; ie < F.length; ++ie) {
      var xe = F.charCodeAt(ie);
      B.write_shift(1, xe >= 128 ? 95 : xe);
    }
    return B.write_shift(1, 0), B;
  }
  function V(m, k) {
    var A = q(m);
    A[1].v = m.read_shift(2);
    var F = A[1].v >> 1;
    if (A[1].v & 1)
      switch (F & 7) {
        case 0:
          F = (F >> 3) * 5e3;
          break;
        case 1:
          F = (F >> 3) * 500;
          break;
        case 2:
          F = (F >> 3) / 20;
          break;
        case 3:
          F = (F >> 3) / 200;
          break;
        case 4:
          F = (F >> 3) / 2e3;
          break;
        case 5:
          F = (F >> 3) / 2e4;
          break;
        case 6:
          F = (F >> 3) / 16;
          break;
        case 7:
          F = (F >> 3) / 64;
          break;
      }
    return A[1].v = F, A;
  }
  function M(m, k) {
    var A = q(m), F = m.read_shift(4), B = m.read_shift(4), ie = m.read_shift(2);
    if (ie == 65535)
      return F === 0 && B === 3221225472 ? (A[1].t = "e", A[1].v = 15) : F === 0 && B === 3489660928 ? (A[1].t = "e", A[1].v = 42) : A[1].v = 0, A;
    var xe = ie & 32768;
    return ie = (ie & 32767) - 16446, A[1].v = (1 - xe * 2) * (B * Math.pow(2, ie + 32) + F * Math.pow(2, ie)), A;
  }
  function G(m, k, A, F) {
    var B = U(14);
    if (B.write_shift(2, m), B.write_shift(1, A), B.write_shift(1, k), F == 0)
      return B.write_shift(4, 0), B.write_shift(4, 0), B.write_shift(2, 65535), B;
    var ie = 0, xe = 0, de = 0, ne = 0;
    return F < 0 && (ie = 1, F = -F), xe = Math.log2(F) | 0, F /= Math.pow(2, xe - 31), ne = F >>> 0, ne & 2147483648 || (F /= 2, ++xe, ne = F >>> 0), F -= ne, ne |= 2147483648, ne >>>= 0, F *= Math.pow(2, 32), de = F >>> 0, B.write_shift(4, de), B.write_shift(4, ne), xe += 16383 + (ie ? 32768 : 0), B.write_shift(2, xe), B;
  }
  function z(m, k) {
    var A = M(m);
    return m.l += k - 14, A;
  }
  function K(m, k) {
    var A = q(m), F = m.read_shift(4);
    return A[1].v = F >> 6, A;
  }
  function fe(m, k) {
    var A = q(m), F = m.read_shift(8, "f");
    return A[1].v = F, A;
  }
  function pe(m, k) {
    var A = fe(m);
    return m.l += k - 10, A;
  }
  function Ee(m, k) {
    return m[m.l + k - 1] == 0 ? m.read_shift(k, "cstr") : "";
  }
  function Ge(m, k) {
    var A = m[m.l++];
    A > k - 1 && (A = k - 1);
    for (var F = ""; F.length < A; ) F += String.fromCharCode(m[m.l++]);
    return F;
  }
  function Le(m, k, A) {
    if (!(!A.qpro || k < 21)) {
      var F = m.read_shift(1);
      m.l += 17, m.l += 1, m.l += 2;
      var B = m.read_shift(k - 21, "cstr");
      return [F, B];
    }
  }
  function lt(m, k) {
    for (var A = {}, F = m.l + k; m.l < F; ) {
      var B = m.read_shift(2);
      if (B == 14e3) {
        for (A[B] = [0, ""], A[B][0] = m.read_shift(2); m[m.l]; )
          A[B][1] += String.fromCharCode(m[m.l]), m.l++;
        m.l++;
      }
    }
    return A;
  }
  function Ve(m, k) {
    var A = U(5 + m.length);
    A.write_shift(2, 14e3), A.write_shift(2, k);
    for (var F = 0; F < m.length; ++F) {
      var B = m.charCodeAt(F);
      A[A.l++] = B > 127 ? 95 : B;
    }
    return A[A.l++] = 0, A;
  }
  var rt = {
    /*::[*/
    0: { n: "BOF", f: Zi },
    /*::[*/
    1: { n: "EOF" },
    /*::[*/
    2: { n: "CALCMODE" },
    /*::[*/
    3: { n: "CALCORDER" },
    /*::[*/
    4: { n: "SPLIT" },
    /*::[*/
    5: { n: "SYNC" },
    /*::[*/
    6: { n: "RANGE", f: l },
    /*::[*/
    7: { n: "WINDOW1" },
    /*::[*/
    8: { n: "COLW1" },
    /*::[*/
    9: { n: "WINTWO" },
    /*::[*/
    10: { n: "COLW2" },
    /*::[*/
    11: { n: "NAME" },
    /*::[*/
    12: { n: "BLANK" },
    /*::[*/
    13: { n: "INTEGER", f: p },
    /*::[*/
    14: { n: "NUMBER", f: T },
    /*::[*/
    15: { n: "LABEL", f: c },
    /*::[*/
    16: { n: "FORMULA", f: h },
    /*::[*/
    24: { n: "TABLE" },
    /*::[*/
    25: { n: "ORANGE" },
    /*::[*/
    26: { n: "PRANGE" },
    /*::[*/
    27: { n: "SRANGE" },
    /*::[*/
    28: { n: "FRANGE" },
    /*::[*/
    29: { n: "KRANGE1" },
    /*::[*/
    32: { n: "HRANGE" },
    /*::[*/
    35: { n: "KRANGE2" },
    /*::[*/
    36: { n: "PROTEC" },
    /*::[*/
    37: { n: "FOOTER" },
    /*::[*/
    38: { n: "HEADER" },
    /*::[*/
    39: { n: "SETUP" },
    /*::[*/
    40: { n: "MARGINS" },
    /*::[*/
    41: { n: "LABELFMT" },
    /*::[*/
    42: { n: "TITLES" },
    /*::[*/
    43: { n: "SHEETJS" },
    /*::[*/
    45: { n: "GRAPH" },
    /*::[*/
    46: { n: "NGRAPH" },
    /*::[*/
    47: { n: "CALCCOUNT" },
    /*::[*/
    48: { n: "UNFORMATTED" },
    /*::[*/
    49: { n: "CURSORW12" },
    /*::[*/
    50: { n: "WINDOW" },
    /*::[*/
    51: { n: "STRING", f: c },
    /*::[*/
    55: { n: "PASSWORD" },
    /*::[*/
    56: { n: "LOCKED" },
    /*::[*/
    60: { n: "QUERY" },
    /*::[*/
    61: { n: "QUERYNAME" },
    /*::[*/
    62: { n: "PRINT" },
    /*::[*/
    63: { n: "PRINTNAME" },
    /*::[*/
    64: { n: "GRAPH2" },
    /*::[*/
    65: { n: "GRAPHNAME" },
    /*::[*/
    66: { n: "ZOOM" },
    /*::[*/
    67: { n: "SYMSPLIT" },
    /*::[*/
    68: { n: "NSROWS" },
    /*::[*/
    69: { n: "NSCOLS" },
    /*::[*/
    70: { n: "RULER" },
    /*::[*/
    71: { n: "NNAME" },
    /*::[*/
    72: { n: "ACOMM" },
    /*::[*/
    73: { n: "AMACRO" },
    /*::[*/
    74: { n: "PARSE" },
    /*::[*/
    102: { n: "PRANGES??" },
    /*::[*/
    103: { n: "RRANGES??" },
    /*::[*/
    104: { n: "FNAME??" },
    /*::[*/
    105: { n: "MRANGES??" },
    /*::[*/
    204: { n: "SHEETNAMECS", f: Ee },
    /*::[*/
    222: { n: "SHEETNAMELP", f: Ge },
    /*::[*/
    65535: { n: "" }
  }, H = {
    /*::[*/
    0: { n: "BOF" },
    /*::[*/
    1: { n: "EOF" },
    /*::[*/
    2: { n: "PASSWORD" },
    /*::[*/
    3: { n: "CALCSET" },
    /*::[*/
    4: { n: "WINDOWSET" },
    /*::[*/
    5: { n: "SHEETCELLPTR" },
    /*::[*/
    6: { n: "SHEETLAYOUT" },
    /*::[*/
    7: { n: "COLUMNWIDTH" },
    /*::[*/
    8: { n: "HIDDENCOLUMN" },
    /*::[*/
    9: { n: "USERRANGE" },
    /*::[*/
    10: { n: "SYSTEMRANGE" },
    /*::[*/
    11: { n: "ZEROFORCE" },
    /*::[*/
    12: { n: "SORTKEYDIR" },
    /*::[*/
    13: { n: "FILESEAL" },
    /*::[*/
    14: { n: "DATAFILLNUMS" },
    /*::[*/
    15: { n: "PRINTMAIN" },
    /*::[*/
    16: { n: "PRINTSTRING" },
    /*::[*/
    17: { n: "GRAPHMAIN" },
    /*::[*/
    18: { n: "GRAPHSTRING" },
    /*::[*/
    19: { n: "??" },
    /*::[*/
    20: { n: "ERRCELL" },
    /*::[*/
    21: { n: "NACELL" },
    /*::[*/
    22: { n: "LABEL16", f: se },
    /*::[*/
    23: { n: "NUMBER17", f: M },
    /*::[*/
    24: { n: "NUMBER18", f: V },
    /*::[*/
    25: { n: "FORMULA19", f: z },
    /*::[*/
    26: { n: "FORMULA1A" },
    /*::[*/
    27: { n: "XFORMAT", f: lt },
    /*::[*/
    28: { n: "DTLABELMISC" },
    /*::[*/
    29: { n: "DTLABELCELL" },
    /*::[*/
    30: { n: "GRAPHWINDOW" },
    /*::[*/
    31: { n: "CPA" },
    /*::[*/
    32: { n: "LPLAUTO" },
    /*::[*/
    33: { n: "QUERY" },
    /*::[*/
    34: { n: "HIDDENSHEET" },
    /*::[*/
    35: { n: "??" },
    /*::[*/
    37: { n: "NUMBER25", f: K },
    /*::[*/
    38: { n: "??" },
    /*::[*/
    39: { n: "NUMBER27", f: fe },
    /*::[*/
    40: { n: "FORMULA28", f: pe },
    /*::[*/
    142: { n: "??" },
    /*::[*/
    147: { n: "??" },
    /*::[*/
    150: { n: "??" },
    /*::[*/
    151: { n: "??" },
    /*::[*/
    152: { n: "??" },
    /*::[*/
    153: { n: "??" },
    /*::[*/
    154: { n: "??" },
    /*::[*/
    155: { n: "??" },
    /*::[*/
    156: { n: "??" },
    /*::[*/
    163: { n: "??" },
    /*::[*/
    174: { n: "??" },
    /*::[*/
    175: { n: "??" },
    /*::[*/
    176: { n: "??" },
    /*::[*/
    177: { n: "??" },
    /*::[*/
    184: { n: "??" },
    /*::[*/
    185: { n: "??" },
    /*::[*/
    186: { n: "??" },
    /*::[*/
    187: { n: "??" },
    /*::[*/
    188: { n: "??" },
    /*::[*/
    195: { n: "??" },
    /*::[*/
    201: { n: "??" },
    /*::[*/
    204: { n: "SHEETNAMECS", f: Ee },
    /*::[*/
    205: { n: "??" },
    /*::[*/
    206: { n: "??" },
    /*::[*/
    207: { n: "??" },
    /*::[*/
    208: { n: "??" },
    /*::[*/
    256: { n: "??" },
    /*::[*/
    259: { n: "??" },
    /*::[*/
    260: { n: "??" },
    /*::[*/
    261: { n: "??" },
    /*::[*/
    262: { n: "??" },
    /*::[*/
    263: { n: "??" },
    /*::[*/
    265: { n: "??" },
    /*::[*/
    266: { n: "??" },
    /*::[*/
    267: { n: "??" },
    /*::[*/
    268: { n: "??" },
    /*::[*/
    270: { n: "??" },
    /*::[*/
    271: { n: "??" },
    /*::[*/
    384: { n: "??" },
    /*::[*/
    389: { n: "??" },
    /*::[*/
    390: { n: "??" },
    /*::[*/
    393: { n: "??" },
    /*::[*/
    396: { n: "??" },
    /*::[*/
    512: { n: "??" },
    /*::[*/
    514: { n: "??" },
    /*::[*/
    513: { n: "??" },
    /*::[*/
    516: { n: "??" },
    /*::[*/
    517: { n: "??" },
    /*::[*/
    640: { n: "??" },
    /*::[*/
    641: { n: "??" },
    /*::[*/
    642: { n: "??" },
    /*::[*/
    643: { n: "??" },
    /*::[*/
    644: { n: "??" },
    /*::[*/
    645: { n: "??" },
    /*::[*/
    646: { n: "??" },
    /*::[*/
    647: { n: "??" },
    /*::[*/
    648: { n: "??" },
    /*::[*/
    658: { n: "??" },
    /*::[*/
    659: { n: "??" },
    /*::[*/
    660: { n: "??" },
    /*::[*/
    661: { n: "??" },
    /*::[*/
    662: { n: "??" },
    /*::[*/
    665: { n: "??" },
    /*::[*/
    666: { n: "??" },
    /*::[*/
    768: { n: "??" },
    /*::[*/
    772: { n: "??" },
    /*::[*/
    1537: { n: "SHEETINFOQP", f: Le },
    /*::[*/
    1600: { n: "??" },
    /*::[*/
    1602: { n: "??" },
    /*::[*/
    1793: { n: "??" },
    /*::[*/
    1794: { n: "??" },
    /*::[*/
    1795: { n: "??" },
    /*::[*/
    1796: { n: "??" },
    /*::[*/
    1920: { n: "??" },
    /*::[*/
    2048: { n: "??" },
    /*::[*/
    2049: { n: "??" },
    /*::[*/
    2052: { n: "??" },
    /*::[*/
    2688: { n: "??" },
    /*::[*/
    10998: { n: "??" },
    /*::[*/
    12849: { n: "??" },
    /*::[*/
    28233: { n: "??" },
    /*::[*/
    28484: { n: "??" },
    /*::[*/
    65535: { n: "" }
  };
  return {
    sheet_to_wk1: n,
    book_to_wk3: a,
    to_workbook: r
  };
}(), Vo = /^\s|\s$|[\t\n\r]/;
function ns(e, r) {
  if (!r.bookSST) return "";
  var t = [et];
  t[t.length] = te("sst", null, {
    xmlns: Jr[0],
    count: e.Count,
    uniqueCount: e.Unique
  });
  for (var n = 0; n != e.length; ++n)
    if (e[n] != null) {
      var a = e[n], i = "<si>";
      a.r ? i += a.r : (i += "<t", a.t || (a.t = ""), a.t.match(Vo) && (i += ' xml:space="preserve"'), i += ">" + be(a.t) + "</t>"), i += "</si>", t[t.length] = i;
    }
  return t.length > 2 && (t[t.length] = "</sst>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function Ho(e) {
  return [e.read_shift(4), e.read_shift(4)];
}
function Go(e, r) {
  return r || (r = U(8)), r.write_shift(4, e.Count), r.write_shift(4, e.Unique), r;
}
var jo = Pf;
function Xo(e) {
  var r = St();
  j(r, 159, Go(e));
  for (var t = 0; t < e.length; ++t) j(r, 19, jo(e[t]));
  return j(
    r,
    160
    /* BrtEndSst */
  ), r.end();
}
function zo(e) {
  for (var r = [], t = e.split(""), n = 0; n < t.length; ++n) r[n] = t[n].charCodeAt(0);
  return r;
}
function as(e) {
  var r = 0, t, n = zo(e), a = n.length + 1, i, s, l, f, o;
  for (t = kr(a), t[0] = n.length, i = 1; i != a; ++i) t[i] = n[i - 1];
  for (i = a - 1; i >= 0; --i)
    s = t[i], l = r & 16384 ? 1 : 0, f = r << 1 & 32767, o = l | f, r = o ^ s;
  return r ^ 52811;
}
var Yo = /* @__PURE__ */ function() {
  function e(a, i) {
    switch (i.type) {
      case "base64":
        return r(rr(a), i);
      case "binary":
        return r(a, i);
      case "buffer":
        return r(Pe && Buffer.isBuffer(a) ? a.toString("binary") : An(a), i);
      case "array":
        return r(fa(a), i);
    }
    throw new Error("Unrecognized type " + i.type);
  }
  function r(a, i) {
    var s = i || {}, l = s.dense ? [] : {}, f = a.match(/\\trowd.*?\\row\b/g);
    if (!f.length) throw new Error("RTF missing table");
    var o = { s: { c: 0, r: 0 }, e: { c: 0, r: f.length - 1 } };
    return f.forEach(function(c, x) {
      Array.isArray(l) && (l[x] = []);
      for (var p = /\\\w+\b/g, v = 0, T, u = -1; T = p.exec(c); ) {
        switch (T[0]) {
          case "\\cell":
            var h = c.slice(v, p.lastIndex - T[0].length);
            if (h[0] == " " && (h = h.slice(1)), ++u, h.length) {
              var y = { v: h, t: "s" };
              Array.isArray(l) ? l[x][u] = y : l[Ue({ r: x, c: u })] = y;
            }
            break;
        }
        v = p.lastIndex;
      }
      u > o.e.c && (o.e.c = u);
    }), l["!ref"] = Qe(o), l;
  }
  function t(a, i) {
    return Or(e(a, i), i);
  }
  function n(a) {
    for (var i = ["{\\rtf1\\ansi"], s = He(a["!ref"]), l, f = Array.isArray(a), o = s.s.r; o <= s.e.r; ++o) {
      i.push("\\trowd\\trautofit1");
      for (var c = s.s.c; c <= s.e.c; ++c) i.push("\\cellx" + (c + 1));
      for (i.push("\\pard\\intbl"), c = s.s.c; c <= s.e.c; ++c) {
        var x = Ue({ r: o, c });
        l = f ? (a[o] || [])[c] : a[x], !(!l || l.v == null && (!l.f || l.F)) && (i.push(" " + (l.w || (nr(l), l.w))), i.push("\\cell"));
      }
      i.push("\\pard\\intbl\\row");
    }
    return i.join("") + "}";
  }
  return {
    to_workbook: t,
    to_sheet: e,
    from_sheet: n
  };
}();
function z0(e) {
  for (var r = 0, t = 1; r != 3; ++r) t = t * 256 + (e[r] > 255 ? 255 : e[r] < 0 ? 0 : e[r]);
  return t.toString(16).toUpperCase().slice(1);
}
var Ko = 6, tr = Ko;
function Qn(e) {
  return Math.floor((e + Math.round(128 / tr) / 256) * tr);
}
function ea(e) {
  return Math.floor((e - 5) / tr * 100 + 0.5) / 100;
}
function Ma(e) {
  return Math.round((e * tr + 5) / tr * 256) / 256;
}
function Qa(e) {
  e.width ? (e.wpx = Qn(e.width), e.wch = ea(e.wpx), e.MDW = tr) : e.wpx ? (e.wch = ea(e.wpx), e.width = Ma(e.wch), e.MDW = tr) : typeof e.wch == "number" && (e.width = Ma(e.wch), e.wpx = Qn(e.width), e.MDW = tr), e.customWidth && delete e.customWidth;
}
var Jo = 96, is = Jo;
function ta(e) {
  return e * 96 / is;
}
function ss(e) {
  return e * is / 96;
}
function Zo(e) {
  var r = ["<numFmts>"];
  return [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(t) {
    for (var n = t[0]; n <= t[1]; ++n) e[n] != null && (r[r.length] = te("numFmt", null, { numFmtId: n, formatCode: be(e[n]) }));
  }), r.length === 1 ? "" : (r[r.length] = "</numFmts>", r[0] = te("numFmts", null, { count: r.length - 2 }).replace("/>", ">"), r.join(""));
}
function qo(e) {
  var r = [];
  return r[r.length] = te("cellXfs", null), e.forEach(function(t) {
    r[r.length] = te("xf", null, t);
  }), r[r.length] = "</cellXfs>", r.length === 2 ? "" : (r[0] = te("cellXfs", null, { count: r.length - 2 }).replace("/>", ">"), r.join(""));
}
function ls(e, r) {
  var t = [et, te("styleSheet", null, {
    xmlns: Jr[0],
    "xmlns:vt": at.vt
  })], n;
  return e.SSF && (n = Zo(e.SSF)) != null && (t[t.length] = n), t[t.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>', t[t.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>', t[t.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>', t[t.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>', (n = qo(r.cellXfs)) && (t[t.length] = n), t[t.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>', t[t.length] = '<dxfs count="0"/>', t[t.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>', t.length > 2 && (t[t.length] = "</styleSheet>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function Qo(e, r) {
  var t = e.read_shift(2), n = pt(e);
  return [t, n];
}
function ec(e, r, t) {
  t || (t = U(6 + 4 * r.length)), t.write_shift(2, e), st(r, t);
  var n = t.length > t.l ? t.slice(0, t.l) : t;
  return t.l == null && (t.l = t.length), n;
}
function tc(e, r, t) {
  var n = {};
  n.sz = e.read_shift(2) / 20;
  var a = $f(e);
  a.fItalic && (n.italic = 1), a.fCondense && (n.condense = 1), a.fExtend && (n.extend = 1), a.fShadow && (n.shadow = 1), a.fOutline && (n.outline = 1), a.fStrikeout && (n.strike = 1);
  var i = e.read_shift(2);
  switch (i === 700 && (n.bold = 1), e.read_shift(2)) {
    case 1:
      n.vertAlign = "superscript";
      break;
    case 2:
      n.vertAlign = "subscript";
      break;
  }
  var s = e.read_shift(1);
  s != 0 && (n.underline = s);
  var l = e.read_shift(1);
  l > 0 && (n.family = l);
  var f = e.read_shift(1);
  switch (f > 0 && (n.charset = f), e.l++, n.color = Wf(e), e.read_shift(1)) {
    case 1:
      n.scheme = "major";
      break;
    case 2:
      n.scheme = "minor";
      break;
  }
  return n.name = pt(e), n;
}
function rc(e, r) {
  r || (r = U(25 + 4 * 32)), r.write_shift(2, e.sz * 20), Vf(e, r), r.write_shift(2, e.bold ? 700 : 400);
  var t = 0;
  e.vertAlign == "superscript" ? t = 1 : e.vertAlign == "subscript" && (t = 2), r.write_shift(2, t), r.write_shift(1, e.underline || 0), r.write_shift(1, e.family || 0), r.write_shift(1, e.charset || 0), r.write_shift(1, 0), Zn(e.color, r);
  var n = 0;
  return n = 2, r.write_shift(1, n), st(e.name, r), r.length > r.l ? r.slice(0, r.l) : r;
}
var nc = [
  "none",
  "solid",
  "mediumGray",
  "darkGray",
  "lightGray",
  "darkHorizontal",
  "darkVertical",
  "darkDown",
  "darkUp",
  "darkGrid",
  "darkTrellis",
  "lightHorizontal",
  "lightVertical",
  "lightDown",
  "lightUp",
  "lightGrid",
  "lightTrellis",
  "gray125",
  "gray0625"
], ya, ac = Kt;
function Y0(e, r) {
  r || (r = U(4 * 3 + 8 * 7 + 16 * 1)), ya || (ya = $a(nc));
  var t = ya[e.patternType];
  t == null && (t = 40), r.write_shift(4, t);
  var n = 0;
  if (t != 40)
    for (Zn({ auto: 1 }, r), Zn({ auto: 1 }, r); n < 12; ++n) r.write_shift(4, 0);
  else {
    for (; n < 4; ++n) r.write_shift(4, 0);
    for (; n < 12; ++n) r.write_shift(4, 0);
  }
  return r.length > r.l ? r.slice(0, r.l) : r;
}
function ic(e, r) {
  var t = e.l + r, n = e.read_shift(2), a = e.read_shift(2);
  return e.l = t, { ixfe: n, numFmtId: a };
}
function fs(e, r, t) {
  t || (t = U(16)), t.write_shift(2, r || 0), t.write_shift(2, e.numFmtId || 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(1, 0), t.write_shift(1, 0);
  var n = 0;
  return t.write_shift(1, n), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(1, 0), t;
}
function ln(e, r) {
  return r || (r = U(10)), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(4, 0), r.write_shift(4, 0), r;
}
var sc = Kt;
function lc(e, r) {
  return r || (r = U(51)), r.write_shift(1, 0), ln(null, r), ln(null, r), ln(null, r), ln(null, r), ln(null, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function fc(e, r) {
  return r || (r = U(12 + 4 * 10)), r.write_shift(4, e.xfId), r.write_shift(2, 1), r.write_shift(1, 0), r.write_shift(1, 0), Jn(e.name || "", r), r.length > r.l ? r.slice(0, r.l) : r;
}
function oc(e, r, t) {
  var n = U(2052);
  return n.write_shift(4, e), Jn(r, n), Jn(t, n), n.length > n.l ? n.slice(0, n.l) : n;
}
function cc(e, r) {
  if (r) {
    var t = 0;
    [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a) r[a] != null && ++t;
    }), t != 0 && (j(e, 615, Ht(t)), [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a) r[a] != null && j(e, 44, ec(a, r[a]));
    }), j(
      e,
      616
      /* BrtEndFmts */
    ));
  }
}
function uc(e) {
  var r = 1;
  j(e, 611, Ht(r)), j(e, 43, rc({
    sz: 12,
    color: { theme: 1 },
    name: "Calibri",
    family: 2
  })), j(
    e,
    612
    /* BrtEndFonts */
  );
}
function hc(e) {
  var r = 2;
  j(e, 603, Ht(r)), j(e, 45, Y0({ patternType: "none" })), j(e, 45, Y0({ patternType: "gray125" })), j(
    e,
    604
    /* BrtEndFills */
  );
}
function dc(e) {
  var r = 1;
  j(e, 613, Ht(r)), j(e, 46, lc()), j(
    e,
    614
    /* BrtEndBorders */
  );
}
function xc(e) {
  var r = 1;
  j(e, 626, Ht(r)), j(e, 47, fs({
    numFmtId: 0
  }, 65535)), j(
    e,
    627
    /* BrtEndCellStyleXFs */
  );
}
function vc(e, r) {
  j(e, 617, Ht(r.length)), r.forEach(function(t) {
    j(e, 47, fs(t, 0));
  }), j(
    e,
    618
    /* BrtEndCellXFs */
  );
}
function pc(e) {
  var r = 1;
  j(e, 619, Ht(r)), j(e, 48, fc({
    xfId: 0,
    name: "Normal"
  })), j(
    e,
    620
    /* BrtEndStyles */
  );
}
function mc(e) {
  var r = 0;
  j(e, 505, Ht(r)), j(
    e,
    506
    /* BrtEndDXFs */
  );
}
function gc(e) {
  var r = 0;
  j(e, 508, oc(r, "TableStyleMedium9", "PivotStyleMedium4")), j(
    e,
    509
    /* BrtEndTableStyles */
  );
}
function _c(e, r) {
  var t = St();
  return j(
    t,
    278
    /* BrtBeginStyleSheet */
  ), cc(t, e.SSF), uc(t), hc(t), dc(t), xc(t), vc(t, r.cellXfs), pc(t), mc(t), gc(t), j(
    t,
    279
    /* BrtEndStyleSheet */
  ), t.end();
}
function os(e, r) {
  if (r && r.themeXLSX) return r.themeXLSX;
  if (e && typeof e.raw == "string") return e.raw;
  var t = [et];
  return t[t.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">', t[t.length] = "<a:themeElements>", t[t.length] = '<a:clrScheme name="Office">', t[t.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>', t[t.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>', t[t.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>', t[t.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>', t[t.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>', t[t.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>', t[t.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>', t[t.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>', t[t.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>', t[t.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>', t[t.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>', t[t.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>', t[t.length] = "</a:clrScheme>", t[t.length] = '<a:fontScheme name="Office">', t[t.length] = "<a:majorFont>", t[t.length] = '<a:latin typeface="Cambria"/>', t[t.length] = '<a:ea typeface=""/>', t[t.length] = '<a:cs typeface=""/>', t[t.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', t[t.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', t[t.length] = '<a:font script="Hans" typeface="宋体"/>', t[t.length] = '<a:font script="Hant" typeface="新細明體"/>', t[t.length] = '<a:font script="Arab" typeface="Times New Roman"/>', t[t.length] = '<a:font script="Hebr" typeface="Times New Roman"/>', t[t.length] = '<a:font script="Thai" typeface="Tahoma"/>', t[t.length] = '<a:font script="Ethi" typeface="Nyala"/>', t[t.length] = '<a:font script="Beng" typeface="Vrinda"/>', t[t.length] = '<a:font script="Gujr" typeface="Shruti"/>', t[t.length] = '<a:font script="Khmr" typeface="MoolBoran"/>', t[t.length] = '<a:font script="Knda" typeface="Tunga"/>', t[t.length] = '<a:font script="Guru" typeface="Raavi"/>', t[t.length] = '<a:font script="Cans" typeface="Euphemia"/>', t[t.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', t[t.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', t[t.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', t[t.length] = '<a:font script="Thaa" typeface="MV Boli"/>', t[t.length] = '<a:font script="Deva" typeface="Mangal"/>', t[t.length] = '<a:font script="Telu" typeface="Gautami"/>', t[t.length] = '<a:font script="Taml" typeface="Latha"/>', t[t.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', t[t.length] = '<a:font script="Orya" typeface="Kalinga"/>', t[t.length] = '<a:font script="Mlym" typeface="Kartika"/>', t[t.length] = '<a:font script="Laoo" typeface="DokChampa"/>', t[t.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', t[t.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', t[t.length] = '<a:font script="Viet" typeface="Times New Roman"/>', t[t.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', t[t.length] = '<a:font script="Geor" typeface="Sylfaen"/>', t[t.length] = "</a:majorFont>", t[t.length] = "<a:minorFont>", t[t.length] = '<a:latin typeface="Calibri"/>', t[t.length] = '<a:ea typeface=""/>', t[t.length] = '<a:cs typeface=""/>', t[t.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', t[t.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', t[t.length] = '<a:font script="Hans" typeface="宋体"/>', t[t.length] = '<a:font script="Hant" typeface="新細明體"/>', t[t.length] = '<a:font script="Arab" typeface="Arial"/>', t[t.length] = '<a:font script="Hebr" typeface="Arial"/>', t[t.length] = '<a:font script="Thai" typeface="Tahoma"/>', t[t.length] = '<a:font script="Ethi" typeface="Nyala"/>', t[t.length] = '<a:font script="Beng" typeface="Vrinda"/>', t[t.length] = '<a:font script="Gujr" typeface="Shruti"/>', t[t.length] = '<a:font script="Khmr" typeface="DaunPenh"/>', t[t.length] = '<a:font script="Knda" typeface="Tunga"/>', t[t.length] = '<a:font script="Guru" typeface="Raavi"/>', t[t.length] = '<a:font script="Cans" typeface="Euphemia"/>', t[t.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', t[t.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', t[t.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', t[t.length] = '<a:font script="Thaa" typeface="MV Boli"/>', t[t.length] = '<a:font script="Deva" typeface="Mangal"/>', t[t.length] = '<a:font script="Telu" typeface="Gautami"/>', t[t.length] = '<a:font script="Taml" typeface="Latha"/>', t[t.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', t[t.length] = '<a:font script="Orya" typeface="Kalinga"/>', t[t.length] = '<a:font script="Mlym" typeface="Kartika"/>', t[t.length] = '<a:font script="Laoo" typeface="DokChampa"/>', t[t.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', t[t.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', t[t.length] = '<a:font script="Viet" typeface="Arial"/>', t[t.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', t[t.length] = '<a:font script="Geor" typeface="Sylfaen"/>', t[t.length] = "</a:minorFont>", t[t.length] = "</a:fontScheme>", t[t.length] = '<a:fmtScheme name="Office">', t[t.length] = "<a:fillStyleLst>", t[t.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', t[t.length] = '<a:gradFill rotWithShape="1">', t[t.length] = "<a:gsLst>", t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', t[t.length] = "</a:gsLst>", t[t.length] = '<a:lin ang="16200000" scaled="1"/>', t[t.length] = "</a:gradFill>", t[t.length] = '<a:gradFill rotWithShape="1">', t[t.length] = "<a:gsLst>", t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', t[t.length] = "</a:gsLst>", t[t.length] = '<a:lin ang="16200000" scaled="0"/>', t[t.length] = "</a:gradFill>", t[t.length] = "</a:fillStyleLst>", t[t.length] = "<a:lnStyleLst>", t[t.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>', t[t.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', t[t.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', t[t.length] = "</a:lnStyleLst>", t[t.length] = "<a:effectStyleLst>", t[t.length] = "<a:effectStyle>", t[t.length] = "<a:effectLst>", t[t.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>', t[t.length] = "</a:effectLst>", t[t.length] = "</a:effectStyle>", t[t.length] = "<a:effectStyle>", t[t.length] = "<a:effectLst>", t[t.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', t[t.length] = "</a:effectLst>", t[t.length] = "</a:effectStyle>", t[t.length] = "<a:effectStyle>", t[t.length] = "<a:effectLst>", t[t.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', t[t.length] = "</a:effectLst>", t[t.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>', t[t.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>', t[t.length] = "</a:effectStyle>", t[t.length] = "</a:effectStyleLst>", t[t.length] = "<a:bgFillStyleLst>", t[t.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', t[t.length] = '<a:gradFill rotWithShape="1">', t[t.length] = "<a:gsLst>", t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>', t[t.length] = "</a:gsLst>", t[t.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>', t[t.length] = "</a:gradFill>", t[t.length] = '<a:gradFill rotWithShape="1">', t[t.length] = "<a:gsLst>", t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>', t[t.length] = "</a:gsLst>", t[t.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>', t[t.length] = "</a:gradFill>", t[t.length] = "</a:bgFillStyleLst>", t[t.length] = "</a:fmtScheme>", t[t.length] = "</a:themeElements>", t[t.length] = "<a:objectDefaults>", t[t.length] = "<a:spDef>", t[t.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>', t[t.length] = "</a:spDef>", t[t.length] = "<a:lnDef>", t[t.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>', t[t.length] = "</a:lnDef>", t[t.length] = "</a:objectDefaults>", t[t.length] = "<a:extraClrSchemeLst/>", t[t.length] = "</a:theme>", t.join("");
}
function Tc(e, r) {
  return {
    flags: e.read_shift(4),
    version: e.read_shift(4),
    name: pt(e)
  };
}
function Ec(e) {
  var r = U(12 + 2 * e.name.length);
  return r.write_shift(4, e.flags), r.write_shift(4, e.version), st(e.name, r), r.slice(0, r.l);
}
function wc(e) {
  for (var r = [], t = e.read_shift(4); t-- > 0; )
    r.push([e.read_shift(4), e.read_shift(4)]);
  return r;
}
function Sc(e) {
  var r = U(4 + 8 * e.length);
  r.write_shift(4, e.length);
  for (var t = 0; t < e.length; ++t)
    r.write_shift(4, e[t][0]), r.write_shift(4, e[t][1]);
  return r;
}
function Ac(e, r) {
  var t = U(8 + 2 * r.length);
  return t.write_shift(4, e), st(r, t), t.slice(0, t.l);
}
function yc(e) {
  return e.l += 4, e.read_shift(4) != 0;
}
function Fc(e, r) {
  var t = U(8);
  return t.write_shift(4, e), t.write_shift(4, 1), t;
}
function kc() {
  var e = St();
  return j(e, 332), j(e, 334, Ht(1)), j(e, 335, Ec({
    name: "XLDAPR",
    version: 12e4,
    flags: 3496657072
  })), j(e, 336), j(e, 339, Ac(1, "XLDAPR")), j(e, 52), j(e, 35, Ht(514)), j(e, 4096, Ht(0)), j(e, 4097, Pt(1)), j(e, 36), j(e, 53), j(e, 340), j(e, 337, Fc(1)), j(e, 51, Sc([[1, 0]])), j(e, 338), j(e, 333), e.end();
}
function cs() {
  var e = [et];
  return e.push(`<metadata xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:xlrd="http://schemas.microsoft.com/office/spreadsheetml/2017/richdata" xmlns:xda="http://schemas.microsoft.com/office/spreadsheetml/2017/dynamicarray">
  <metadataTypes count="1">
    <metadataType name="XLDAPR" minSupportedVersion="120000" copy="1" pasteAll="1" pasteValues="1" merge="1" splitFirst="1" rowColShift="1" clearFormats="1" clearComments="1" assign="1" coerce="1" cellMeta="1"/>
  </metadataTypes>
  <futureMetadata name="XLDAPR" count="1">
    <bk>
      <extLst>
        <ext uri="{bdbb8cdc-fa1e-496e-a857-3c3f30c029c3}">
          <xda:dynamicArrayProperties fDynamic="1" fCollapsed="0"/>
        </ext>
      </extLst>
    </bk>
  </futureMetadata>
  <cellMetadata count="1">
    <bk>
      <rc t="1" v="0"/>
    </bk>
  </cellMetadata>
</metadata>`), e.join("");
}
function Cc(e) {
  var r = {};
  r.i = e.read_shift(4);
  var t = {};
  t.r = e.read_shift(4), t.c = e.read_shift(4), r.r = Ue(t);
  var n = e.read_shift(1);
  return n & 2 && (r.l = "1"), n & 8 && (r.a = "1"), r;
}
var Hr = 1024;
function us(e, r) {
  for (var t = [21600, 21600], n = ["m0,0l0", t[1], t[0], t[1], t[0], "0xe"].join(","), a = [
    te("xml", null, { "xmlns:v": Ot.v, "xmlns:o": Ot.o, "xmlns:x": Ot.x, "xmlns:mv": Ot.mv }).replace(/\/>/, ">"),
    te("o:shapelayout", te("o:idmap", null, { "v:ext": "edit", data: e }), { "v:ext": "edit" }),
    te("v:shapetype", [
      te("v:stroke", null, { joinstyle: "miter" }),
      te("v:path", null, { gradientshapeok: "t", "o:connecttype": "rect" })
    ].join(""), { id: "_x0000_t202", "o:spt": 202, coordsize: t.join(","), path: n })
  ]; Hr < e * 1e3; ) Hr += 1e3;
  return r.forEach(function(i) {
    var s = it(i[0]), l = (
      /*::(*/
      { color2: "#BEFF82", type: "gradient" }
    );
    l.type == "gradient" && (l.angle = "-180");
    var f = l.type == "gradient" ? te("o:fill", null, { type: "gradientUnscaled", "v:ext": "view" }) : null, o = te("v:fill", f, l), c = { on: "t", obscured: "t" };
    ++Hr, a = a.concat([
      "<v:shape" + Tn({
        id: "_x0000_s" + Hr,
        type: "#_x0000_t202",
        style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" + (i[1].hidden ? ";visibility:hidden" : ""),
        fillcolor: "#ECFAD4",
        strokecolor: "#edeaa1"
      }) + ">",
      o,
      te("v:shadow", null, c),
      te("v:path", null, { "o:connecttype": "none" }),
      '<v:textbox><div style="text-align:left"></div></v:textbox>',
      '<x:ClientData ObjectType="Note">',
      "<x:MoveWithCells/>",
      "<x:SizeWithCells/>",
      /* Part 4 19.4.2.3 Anchor (Anchor) */
      ut("x:Anchor", [s.c + 1, 0, s.r + 1, 0, s.c + 3, 20, s.r + 5, 20].join(",")),
      ut("x:AutoFill", "False"),
      ut("x:Row", String(s.r)),
      ut("x:Column", String(s.c)),
      i[1].hidden ? "" : "<x:Visible/>",
      "</x:ClientData>",
      "</v:shape>"
    ]);
  }), a.push("</xml>"), a.join("");
}
function hs(e) {
  var r = [et, te("comments", null, { xmlns: Jr[0] })], t = [];
  return r.push("<authors>"), e.forEach(function(n) {
    n[1].forEach(function(a) {
      var i = be(a.a);
      t.indexOf(i) == -1 && (t.push(i), r.push("<author>" + i + "</author>")), a.T && a.ID && t.indexOf("tc=" + a.ID) == -1 && (t.push("tc=" + a.ID), r.push("<author>tc=" + a.ID + "</author>"));
    });
  }), t.length == 0 && (t.push("SheetJ5"), r.push("<author>SheetJ5</author>")), r.push("</authors>"), r.push("<commentList>"), e.forEach(function(n) {
    var a = 0, i = [];
    if (n[1][0] && n[1][0].T && n[1][0].ID ? a = t.indexOf("tc=" + n[1][0].ID) : n[1].forEach(function(f) {
      f.a && (a = t.indexOf(be(f.a))), i.push(f.t || "");
    }), r.push('<comment ref="' + n[0] + '" authorId="' + a + '"><text>'), i.length <= 1) r.push(ut("t", be(i[0] || "")));
    else {
      for (var s = `Comment:
    ` + i[0] + `
`, l = 1; l < i.length; ++l) s += `Reply:
    ` + i[l] + `
`;
      r.push(ut("t", be(s)));
    }
    r.push("</text></comment>");
  }), r.push("</commentList>"), r.length > 2 && (r[r.length] = "</comments>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Dc(e, r, t) {
  var n = [et, te("ThreadedComments", null, { xmlns: at.TCMNT }).replace(/[\/]>/, ">")];
  return e.forEach(function(a) {
    var i = "";
    (a[1] || []).forEach(function(s, l) {
      if (!s.T) {
        delete s.ID;
        return;
      }
      s.a && r.indexOf(s.a) == -1 && r.push(s.a);
      var f = {
        ref: a[0],
        id: "{54EE7951-7262-4200-6969-" + ("000000000000" + t.tcid++).slice(-12) + "}"
      };
      l == 0 ? i = f.id : f.parentId = i, s.ID = f.id, s.a && (f.personId = "{54EE7950-7262-4200-6969-" + ("000000000000" + r.indexOf(s.a)).slice(-12) + "}"), n.push(te("threadedComment", ut("text", s.t || ""), f));
    });
  }), n.push("</ThreadedComments>"), n.join("");
}
function Oc(e) {
  var r = [et, te("personList", null, {
    xmlns: at.TCMNT,
    "xmlns:x": Jr[0]
  }).replace(/[\/]>/, ">")];
  return e.forEach(function(t, n) {
    r.push(te("person", null, {
      displayName: t,
      id: "{54EE7950-7262-4200-6969-" + ("000000000000" + n).slice(-12) + "}",
      userId: t,
      providerId: "None"
    }));
  }), r.push("</personList>"), r.join("");
}
function Ic(e) {
  var r = {};
  r.iauthor = e.read_shift(4);
  var t = Pr(e);
  return r.rfx = t.s, r.ref = Ue(t.s), e.l += 16, r;
}
function Rc(e, r) {
  return r == null && (r = U(36)), r.write_shift(4, e[1].iauthor), qr(e[0], r), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(4, 0), r;
}
var Nc = pt;
function Pc(e) {
  return st(e.slice(0, 54));
}
function Lc(e) {
  var r = St(), t = [];
  return j(
    r,
    628
    /* BrtBeginComments */
  ), j(
    r,
    630
    /* BrtBeginCommentAuthors */
  ), e.forEach(function(n) {
    n[1].forEach(function(a) {
      t.indexOf(a.a) > -1 || (t.push(a.a.slice(0, 54)), j(r, 632, Pc(a.a)));
    });
  }), j(
    r,
    631
    /* BrtEndCommentAuthors */
  ), j(
    r,
    633
    /* BrtBeginCommentList */
  ), e.forEach(function(n) {
    n[1].forEach(function(a) {
      a.iauthor = t.indexOf(a.a);
      var i = { s: it(n[0]), e: it(n[0]) };
      j(r, 635, Rc([i, a])), a.t && a.t.length > 0 && j(r, 637, Mf(a)), j(
        r,
        636
        /* BrtEndComment */
      ), delete a.iauthor;
    });
  }), j(
    r,
    634
    /* BrtEndCommentList */
  ), j(
    r,
    629
    /* BrtEndComments */
  ), r.end();
}
function Mc(e, r) {
  r.FullPaths.forEach(function(t, n) {
    if (n != 0) {
      var a = t.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
      a.slice(-1) !== "/" && $e.utils.cfb_add(e, a, r.FileIndex[n].content);
    }
  });
}
var ds = ["xlsb", "xlsm", "xlam", "biff8", "xla"], Bc = /* @__PURE__ */ function() {
  var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g, r = { r: 0, c: 0 };
  function t(n, a, i, s) {
    var l = !1, f = !1;
    i.length == 0 ? f = !0 : i.charAt(0) == "[" && (f = !0, i = i.slice(1, -1)), s.length == 0 ? l = !0 : s.charAt(0) == "[" && (l = !0, s = s.slice(1, -1));
    var o = i.length > 0 ? parseInt(i, 10) | 0 : 0, c = s.length > 0 ? parseInt(s, 10) | 0 : 0;
    return l ? c += r.c : --c, f ? o += r.r : --o, a + (l ? "" : "$") + vt(c) + (f ? "" : "$") + ht(o);
  }
  return function(a, i) {
    return r = i, a.replace(e, t);
  };
}(), e0 = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g, t0 = /* @__PURE__ */ function() {
  return function(r, t) {
    return r.replace(e0, function(n, a, i, s, l, f) {
      var o = Ya(s) - (i ? 0 : t.c), c = za(f) - (l ? 0 : t.r), x = c == 0 ? "" : l ? c + 1 : "[" + c + "]", p = o == 0 ? "" : i ? o + 1 : "[" + o + "]";
      return a + "R" + x + "C" + p;
    });
  };
}();
function bc(e, r) {
  return e.replace(e0, function(t, n, a, i, s, l) {
    return n + (a == "$" ? a + i : vt(Ya(i) + r.c)) + (s == "$" ? s + l : ht(za(l) + r.r));
  });
}
function Uc(e) {
  return e.length != 1;
}
function qe(e) {
  e.l += 1;
}
function pr(e, r) {
  var t = e.read_shift(2);
  return [t & 16383, t >> 14 & 1, t >> 15 & 1];
}
function xs(e, r, t) {
  var n = 2;
  if (t) {
    if (t.biff >= 2 && t.biff <= 5) return vs(e);
    t.biff == 12 && (n = 4);
  }
  var a = e.read_shift(n), i = e.read_shift(n), s = pr(e), l = pr(e);
  return { s: { r: a, c: s[0], cRel: s[1], rRel: s[2] }, e: { r: i, c: l[0], cRel: l[1], rRel: l[2] } };
}
function vs(e) {
  var r = pr(e), t = pr(e), n = e.read_shift(1), a = e.read_shift(1);
  return { s: { r: r[0], c: n, cRel: r[1], rRel: r[2] }, e: { r: t[0], c: a, cRel: t[1], rRel: t[2] } };
}
function Wc(e, r, t) {
  if (t.biff < 8) return vs(e);
  var n = e.read_shift(t.biff == 12 ? 4 : 2), a = e.read_shift(t.biff == 12 ? 4 : 2), i = pr(e), s = pr(e);
  return { s: { r: n, c: i[0], cRel: i[1], rRel: i[2] }, e: { r: a, c: s[0], cRel: s[1], rRel: s[2] } };
}
function ps(e, r, t) {
  if (t && t.biff >= 2 && t.biff <= 5) return $c(e);
  var n = e.read_shift(t && t.biff == 12 ? 4 : 2), a = pr(e);
  return { r: n, c: a[0], cRel: a[1], rRel: a[2] };
}
function $c(e) {
  var r = pr(e), t = e.read_shift(1);
  return { r: r[0], c: t, cRel: r[1], rRel: r[2] };
}
function Vc(e) {
  var r = e.read_shift(2), t = e.read_shift(2);
  return { r, c: t & 255, fQuoted: !!(t & 16384), cRel: t >> 15, rRel: t >> 15 };
}
function Hc(e, r, t) {
  var n = t && t.biff ? t.biff : 8;
  if (n >= 2 && n <= 5) return Gc(e);
  var a = e.read_shift(n >= 12 ? 4 : 2), i = e.read_shift(2), s = (i & 16384) >> 14, l = (i & 32768) >> 15;
  if (i &= 16383, l == 1) for (; a > 524287; ) a -= 1048576;
  if (s == 1) for (; i > 8191; ) i = i - 16384;
  return { r: a, c: i, cRel: s, rRel: l };
}
function Gc(e) {
  var r = e.read_shift(2), t = e.read_shift(1), n = (r & 32768) >> 15, a = (r & 16384) >> 14;
  return r &= 16383, n == 1 && r >= 8192 && (r = r - 16384), a == 1 && t >= 128 && (t = t - 256), { r, c: t, cRel: a, rRel: n };
}
function jc(e, r, t) {
  var n = (e[e.l++] & 96) >> 5, a = xs(e, t.biff >= 2 && t.biff <= 5 ? 6 : 8, t);
  return [n, a];
}
function Xc(e, r, t) {
  var n = (e[e.l++] & 96) >> 5, a = e.read_shift(2, "i"), i = 8;
  if (t) switch (t.biff) {
    case 5:
      e.l += 12, i = 6;
      break;
    case 12:
      i = 12;
      break;
  }
  var s = xs(e, i, t);
  return [n, a, s];
}
function zc(e, r, t) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += t && t.biff > 8 ? 12 : t.biff < 8 ? 6 : 8, [n];
}
function Yc(e, r, t) {
  var n = (e[e.l++] & 96) >> 5, a = e.read_shift(2), i = 8;
  if (t) switch (t.biff) {
    case 5:
      e.l += 12, i = 6;
      break;
    case 12:
      i = 12;
      break;
  }
  return e.l += i, [n, a];
}
function Kc(e, r, t) {
  var n = (e[e.l++] & 96) >> 5, a = Wc(e, r - 1, t);
  return [n, a];
}
function Jc(e, r, t) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += t.biff == 2 ? 6 : t.biff == 12 ? 14 : 7, [n];
}
function K0(e) {
  var r = e[e.l + 1] & 1, t = 1;
  return e.l += 4, [r, t];
}
function Zc(e, r, t) {
  e.l += 2;
  for (var n = e.read_shift(t && t.biff == 2 ? 1 : 2), a = [], i = 0; i <= n; ++i) a.push(e.read_shift(t && t.biff == 2 ? 1 : 2));
  return a;
}
function qc(e, r, t) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(t && t.biff == 2 ? 1 : 2)];
}
function Qc(e, r, t) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(t && t.biff == 2 ? 1 : 2)];
}
function eu(e) {
  var r = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [r, e.read_shift(2)];
}
function tu(e, r, t) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += t && t.biff == 2 ? 3 : 4, [n];
}
function ms(e) {
  var r = e.read_shift(1), t = e.read_shift(1);
  return [r, t];
}
function ru(e) {
  return e.read_shift(2), ms(e);
}
function nu(e) {
  return e.read_shift(2), ms(e);
}
function au(e, r, t) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = ps(e, 0, t);
  return [n, a];
}
function iu(e, r, t) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = Hc(e, 0, t);
  return [n, a];
}
function su(e, r, t) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(2);
  t && t.biff == 5 && (e.l += 12);
  var i = ps(e, 0, t);
  return [n, a, i];
}
function lu(e, r, t) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(t && t.biff <= 3 ? 1 : 2);
  return [l1[a], Ts[a], n];
}
function fu(e, r, t) {
  var n = e[e.l++], a = e.read_shift(1), i = t && t.biff <= 3 ? [n == 88 ? -1 : 0, e.read_shift(1)] : ou(e);
  return [a, (i[0] === 0 ? Ts : s1)[i[1]]];
}
function ou(e) {
  return [e[e.l + 1] >> 7, e.read_shift(2) & 32767];
}
function cu(e, r, t) {
  e.l += t && t.biff == 2 ? 3 : 4;
}
function uu(e, r, t) {
  if (e.l++, t && t.biff == 12) return [e.read_shift(4, "i"), 0];
  var n = e.read_shift(2), a = e.read_shift(t && t.biff == 2 ? 1 : 2);
  return [n, a];
}
function hu(e) {
  return e.l++, kn[e.read_shift(1)];
}
function du(e) {
  return e.l++, e.read_shift(2);
}
function xu(e) {
  return e.l++, e.read_shift(1) !== 0;
}
function vu(e) {
  return e.l++, Qr(e);
}
function pu(e, r, t) {
  return e.l++, Qi(e, r - 1, t);
}
function mu(e, r) {
  var t = [e.read_shift(1)];
  if (r == 12) switch (t[0]) {
    case 2:
      t[0] = 4;
      break;
    case 4:
      t[0] = 16;
      break;
    case 0:
      t[0] = 1;
      break;
    case 1:
      t[0] = 2;
      break;
  }
  switch (t[0]) {
    case 4:
      t[1] = io(e, 1) ? "TRUE" : "FALSE", r != 12 && (e.l += 7);
      break;
    case 37:
    case 16:
      t[1] = kn[e[e.l]], e.l += r == 12 ? 4 : 8;
      break;
    case 0:
      e.l += 8;
      break;
    case 1:
      t[1] = Qr(e);
      break;
    case 2:
      t[1] = oo(e, 0, { biff: r > 0 && r < 8 ? 2 : r });
      break;
    default:
      throw new Error("Bad SerAr: " + t[0]);
  }
  return t;
}
function gu(e, r, t) {
  for (var n = e.read_shift(t.biff == 12 ? 4 : 2), a = [], i = 0; i != n; ++i) a.push((t.biff == 12 ? Pr : ho)(e));
  return a;
}
function _u(e, r, t) {
  var n = 0, a = 0;
  t.biff == 12 ? (n = e.read_shift(4), a = e.read_shift(4)) : (a = 1 + e.read_shift(1), n = 1 + e.read_shift(2)), t.biff >= 2 && t.biff < 8 && (--n, --a == 0 && (a = 256));
  for (var i = 0, s = []; i != n && (s[i] = []); ++i)
    for (var l = 0; l != a; ++l) s[i][l] = mu(e, t.biff);
  return s;
}
function Tu(e, r, t) {
  var n = e.read_shift(1) >>> 5 & 3, a = !t || t.biff >= 8 ? 4 : 2, i = e.read_shift(a);
  switch (t.biff) {
    case 2:
      e.l += 5;
      break;
    case 3:
    case 4:
      e.l += 8;
      break;
    case 5:
      e.l += 12;
      break;
  }
  return [n, 0, i];
}
function Eu(e, r, t) {
  if (t.biff == 5) return wu(e);
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(2), i = e.read_shift(4);
  return [n, a, i];
}
function wu(e) {
  var r = e.read_shift(1) >>> 5 & 3, t = e.read_shift(2, "i");
  e.l += 8;
  var n = e.read_shift(2);
  return e.l += 12, [r, t, n];
}
function Su(e, r, t) {
  var n = e.read_shift(1) >>> 5 & 3;
  e.l += t && t.biff == 2 ? 3 : 4;
  var a = e.read_shift(t && t.biff == 2 ? 1 : 2);
  return [n, a];
}
function Au(e, r, t) {
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(t && t.biff == 2 ? 1 : 2);
  return [n, a];
}
function yu(e, r, t) {
  var n = e.read_shift(1) >>> 5 & 3;
  return e.l += 4, t.biff < 8 && e.l--, t.biff == 12 && (e.l += 2), [n];
}
function Fu(e, r, t) {
  var n = (e[e.l++] & 96) >> 5, a = e.read_shift(2), i = 4;
  if (t) switch (t.biff) {
    case 5:
      i = 15;
      break;
    case 12:
      i = 6;
      break;
  }
  return e.l += i, [n, a];
}
var ku = Kt, Cu = Kt, Du = Kt;
function Cn(e, r, t) {
  return e.l += 2, [Vc(e)];
}
function r0(e) {
  return e.l += 6, [];
}
var Ou = Cn, Iu = r0, Ru = r0, Nu = Cn;
function gs(e) {
  return e.l += 2, [Zi(e), e.read_shift(2) & 1];
}
var Pu = Cn, Lu = gs, Mu = r0, Bu = Cn, bu = Cn, Uu = [
  "Data",
  "All",
  "Headers",
  "??",
  "?Data2",
  "??",
  "?DataHeaders",
  "??",
  "Totals",
  "??",
  "??",
  "??",
  "?DataTotals",
  "??",
  "??",
  "??",
  "?Current"
];
function Wu(e) {
  e.l += 2;
  var r = e.read_shift(2), t = e.read_shift(2), n = e.read_shift(4), a = e.read_shift(2), i = e.read_shift(2), s = Uu[t >> 2 & 31];
  return { ixti: r, coltype: t & 3, rt: s, idx: n, c: a, C: i };
}
function $u(e) {
  return e.l += 2, [e.read_shift(4)];
}
function Vu(e, r, t) {
  return e.l += 5, e.l += 2, e.l += t.biff == 2 ? 1 : 4, ["PTGSHEET"];
}
function Hu(e, r, t) {
  return e.l += t.biff == 2 ? 4 : 5, ["PTGENDSHEET"];
}
function Gu(e) {
  var r = e.read_shift(1) >>> 5 & 3, t = e.read_shift(2);
  return [r, t];
}
function ju(e) {
  var r = e.read_shift(1) >>> 5 & 3, t = e.read_shift(2);
  return [r, t];
}
function Xu(e) {
  return e.l += 4, [0, 0];
}
var J0 = {
  /*::[*/
  1: { n: "PtgExp", f: uu },
  /*::[*/
  2: { n: "PtgTbl", f: Du },
  /*::[*/
  3: { n: "PtgAdd", f: qe },
  /*::[*/
  4: { n: "PtgSub", f: qe },
  /*::[*/
  5: { n: "PtgMul", f: qe },
  /*::[*/
  6: { n: "PtgDiv", f: qe },
  /*::[*/
  7: { n: "PtgPower", f: qe },
  /*::[*/
  8: { n: "PtgConcat", f: qe },
  /*::[*/
  9: { n: "PtgLt", f: qe },
  /*::[*/
  10: { n: "PtgLe", f: qe },
  /*::[*/
  11: { n: "PtgEq", f: qe },
  /*::[*/
  12: { n: "PtgGe", f: qe },
  /*::[*/
  13: { n: "PtgGt", f: qe },
  /*::[*/
  14: { n: "PtgNe", f: qe },
  /*::[*/
  15: { n: "PtgIsect", f: qe },
  /*::[*/
  16: { n: "PtgUnion", f: qe },
  /*::[*/
  17: { n: "PtgRange", f: qe },
  /*::[*/
  18: { n: "PtgUplus", f: qe },
  /*::[*/
  19: { n: "PtgUminus", f: qe },
  /*::[*/
  20: { n: "PtgPercent", f: qe },
  /*::[*/
  21: { n: "PtgParen", f: qe },
  /*::[*/
  22: { n: "PtgMissArg", f: qe },
  /*::[*/
  23: { n: "PtgStr", f: pu },
  /*::[*/
  26: { n: "PtgSheet", f: Vu },
  /*::[*/
  27: { n: "PtgEndSheet", f: Hu },
  /*::[*/
  28: { n: "PtgErr", f: hu },
  /*::[*/
  29: { n: "PtgBool", f: xu },
  /*::[*/
  30: { n: "PtgInt", f: du },
  /*::[*/
  31: { n: "PtgNum", f: vu },
  /*::[*/
  32: { n: "PtgArray", f: Jc },
  /*::[*/
  33: { n: "PtgFunc", f: lu },
  /*::[*/
  34: { n: "PtgFuncVar", f: fu },
  /*::[*/
  35: { n: "PtgName", f: Tu },
  /*::[*/
  36: { n: "PtgRef", f: au },
  /*::[*/
  37: { n: "PtgArea", f: jc },
  /*::[*/
  38: { n: "PtgMemArea", f: Su },
  /*::[*/
  39: { n: "PtgMemErr", f: ku },
  /*::[*/
  40: { n: "PtgMemNoMem", f: Cu },
  /*::[*/
  41: { n: "PtgMemFunc", f: Au },
  /*::[*/
  42: { n: "PtgRefErr", f: yu },
  /*::[*/
  43: { n: "PtgAreaErr", f: zc },
  /*::[*/
  44: { n: "PtgRefN", f: iu },
  /*::[*/
  45: { n: "PtgAreaN", f: Kc },
  /*::[*/
  46: { n: "PtgMemAreaN", f: Gu },
  /*::[*/
  47: { n: "PtgMemNoMemN", f: ju },
  /*::[*/
  57: { n: "PtgNameX", f: Eu },
  /*::[*/
  58: { n: "PtgRef3d", f: su },
  /*::[*/
  59: { n: "PtgArea3d", f: Xc },
  /*::[*/
  60: { n: "PtgRefErr3d", f: Fu },
  /*::[*/
  61: { n: "PtgAreaErr3d", f: Yc },
  /*::[*/
  255: {}
}, zu = {
  /*::[*/
  64: 32,
  /*::[*/
  96: 32,
  /*::[*/
  65: 33,
  /*::[*/
  97: 33,
  /*::[*/
  66: 34,
  /*::[*/
  98: 34,
  /*::[*/
  67: 35,
  /*::[*/
  99: 35,
  /*::[*/
  68: 36,
  /*::[*/
  100: 36,
  /*::[*/
  69: 37,
  /*::[*/
  101: 37,
  /*::[*/
  70: 38,
  /*::[*/
  102: 38,
  /*::[*/
  71: 39,
  /*::[*/
  103: 39,
  /*::[*/
  72: 40,
  /*::[*/
  104: 40,
  /*::[*/
  73: 41,
  /*::[*/
  105: 41,
  /*::[*/
  74: 42,
  /*::[*/
  106: 42,
  /*::[*/
  75: 43,
  /*::[*/
  107: 43,
  /*::[*/
  76: 44,
  /*::[*/
  108: 44,
  /*::[*/
  77: 45,
  /*::[*/
  109: 45,
  /*::[*/
  78: 46,
  /*::[*/
  110: 46,
  /*::[*/
  79: 47,
  /*::[*/
  111: 47,
  /*::[*/
  88: 34,
  /*::[*/
  120: 34,
  /*::[*/
  89: 57,
  /*::[*/
  121: 57,
  /*::[*/
  90: 58,
  /*::[*/
  122: 58,
  /*::[*/
  91: 59,
  /*::[*/
  123: 59,
  /*::[*/
  92: 60,
  /*::[*/
  124: 60,
  /*::[*/
  93: 61,
  /*::[*/
  125: 61
}, Yu = {
  /*::[*/
  1: { n: "PtgElfLel", f: gs },
  /*::[*/
  2: { n: "PtgElfRw", f: Bu },
  /*::[*/
  3: { n: "PtgElfCol", f: Ou },
  /*::[*/
  6: { n: "PtgElfRwV", f: bu },
  /*::[*/
  7: { n: "PtgElfColV", f: Nu },
  /*::[*/
  10: { n: "PtgElfRadical", f: Pu },
  /*::[*/
  11: { n: "PtgElfRadicalS", f: Mu },
  /*::[*/
  13: { n: "PtgElfColS", f: Iu },
  /*::[*/
  15: { n: "PtgElfColSV", f: Ru },
  /*::[*/
  16: { n: "PtgElfRadicalLel", f: Lu },
  /*::[*/
  25: { n: "PtgList", f: Wu },
  /*::[*/
  29: { n: "PtgSxName", f: $u },
  /*::[*/
  255: {}
}, Ku = {
  /*::[*/
  0: { n: "PtgAttrNoop", f: Xu },
  /*::[*/
  1: { n: "PtgAttrSemi", f: tu },
  /*::[*/
  2: { n: "PtgAttrIf", f: Qc },
  /*::[*/
  4: { n: "PtgAttrChoose", f: Zc },
  /*::[*/
  8: { n: "PtgAttrGoto", f: qc },
  /*::[*/
  16: { n: "PtgAttrSum", f: cu },
  /*::[*/
  32: { n: "PtgAttrBaxcel", f: K0 },
  /*::[*/
  33: { n: "PtgAttrBaxcel", f: K0 },
  /*::[*/
  64: { n: "PtgAttrSpace", f: ru },
  /*::[*/
  65: { n: "PtgAttrSpaceSemi", f: nu },
  /*::[*/
  128: { n: "PtgAttrIfError", f: eu },
  /*::[*/
  255: {}
};
function Ju(e, r, t, n) {
  if (n.biff < 8) return Kt(e, r);
  for (var a = e.l + r, i = [], s = 0; s !== t.length; ++s)
    switch (t[s][0]) {
      case "PtgArray":
        t[s][1] = _u(e, 0, n), i.push(t[s][1]);
        break;
      case "PtgMemArea":
        t[s][2] = gu(e, t[s][1], n), i.push(t[s][2]);
        break;
      case "PtgExp":
        n && n.biff == 12 && (t[s][1][1] = e.read_shift(4), i.push(t[s][1]));
        break;
      case "PtgList":
      case "PtgElfRadicalS":
      case "PtgElfColS":
      case "PtgElfColSV":
        throw "Unsupported " + t[s][0];
    }
  return r = a - e.l, r !== 0 && i.push(Kt(e, r)), i;
}
function Zu(e, r, t) {
  for (var n = e.l + r, a, i, s = []; n != e.l; )
    r = n - e.l, i = e[e.l], a = J0[i] || J0[zu[i]], (i === 24 || i === 25) && (a = (i === 24 ? Yu : Ku)[e[e.l + 1]]), !a || !a.f ? Kt(e, r) : s.push([a.n, a.f(e, r, t)]);
  return s;
}
function qu(e) {
  for (var r = [], t = 0; t < e.length; ++t) {
    for (var n = e[t], a = [], i = 0; i < n.length; ++i) {
      var s = n[i];
      if (s) switch (s[0]) {
        case 2:
          a.push('"' + s[1].replace(/"/g, '""') + '"');
          break;
        default:
          a.push(s[1]);
      }
      else a.push("");
    }
    r.push(a.join(","));
  }
  return r.join(";");
}
var Qu = {
  PtgAdd: "+",
  PtgConcat: "&",
  PtgDiv: "/",
  PtgEq: "=",
  PtgGe: ">=",
  PtgGt: ">",
  PtgLe: "<=",
  PtgLt: "<",
  PtgMul: "*",
  PtgNe: "<>",
  PtgPower: "^",
  PtgSub: "-"
};
function e1(e, r) {
  if (!e && !(r && r.biff <= 5 && r.biff >= 2)) throw new Error("empty sheet name");
  return /[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e) ? "'" + e + "'" : e;
}
function _s(e, r, t) {
  if (!e) return "SH33TJSERR0";
  if (t.biff > 8 && (!e.XTI || !e.XTI[r])) return e.SheetNames[r];
  if (!e.XTI) return "SH33TJSERR6";
  var n = e.XTI[r];
  if (t.biff < 8)
    return r > 1e4 && (r -= 65536), r < 0 && (r = -r), r == 0 ? "" : e.XTI[r - 1];
  if (!n) return "SH33TJSERR1";
  var a = "";
  if (t.biff > 8) switch (e[n[0]][0]) {
    case 357:
      return a = n[1] == -1 ? "#REF" : e.SheetNames[n[1]], n[1] == n[2] ? a : a + ":" + e.SheetNames[n[2]];
    case 358:
      return t.SID != null ? e.SheetNames[t.SID] : "SH33TJSSAME" + e[n[0]][0];
    case 355:
    default:
      return "SH33TJSSRC" + e[n[0]][0];
  }
  switch (e[n[0]][0][0]) {
    case 1025:
      return a = n[1] == -1 ? "#REF" : e.SheetNames[n[1]] || "SH33TJSERR3", n[1] == n[2] ? a : a + ":" + e.SheetNames[n[2]];
    case 14849:
      return e[n[0]].slice(1).map(function(i) {
        return i.Name;
      }).join(";;");
    default:
      return e[n[0]][0][3] ? (a = n[1] == -1 ? "#REF" : e[n[0]][0][3][n[1]] || "SH33TJSERR4", n[1] == n[2] ? a : a + ":" + e[n[0]][0][3][n[2]]) : "SH33TJSERR2";
  }
}
function Z0(e, r, t) {
  var n = _s(e, r, t);
  return n == "#REF" ? n : e1(n, t);
}
function Yr(e, r, t, n, a) {
  var i = a && a.biff || 8, s = (
    /*range != null ? range :*/
    { s: { c: 0, r: 0 } }
  ), l = [], f, o, c, x = 0, p = 0, v, T = "";
  if (!e[0] || !e[0][0]) return "";
  for (var u = -1, h = "", y = 0, C = e[0].length; y < C; ++y) {
    var D = e[0][y];
    switch (D[0]) {
      case "PtgUminus":
        l.push("-" + l.pop());
        break;
      case "PtgUplus":
        l.push("+" + l.pop());
        break;
      case "PtgPercent":
        l.push(l.pop() + "%");
        break;
      case "PtgAdd":
      case "PtgConcat":
      case "PtgDiv":
      case "PtgEq":
      case "PtgGe":
      case "PtgGt":
      case "PtgLe":
      case "PtgLt":
      case "PtgMul":
      case "PtgNe":
      case "PtgPower":
      case "PtgSub":
        if (f = l.pop(), o = l.pop(), u >= 0) {
          switch (e[0][u][1][0]) {
            case 0:
              h = Ke(" ", e[0][u][1][1]);
              break;
            case 1:
              h = Ke("\r", e[0][u][1][1]);
              break;
            default:
              if (h = "", a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][u][1][0]);
          }
          o = o + h, u = -1;
        }
        l.push(o + Qu[D[0]] + f);
        break;
      case "PtgIsect":
        f = l.pop(), o = l.pop(), l.push(o + " " + f);
        break;
      case "PtgUnion":
        f = l.pop(), o = l.pop(), l.push(o + "," + f);
        break;
      case "PtgRange":
        f = l.pop(), o = l.pop(), l.push(o + ":" + f);
        break;
      case "PtgAttrChoose":
        break;
      case "PtgAttrGoto":
        break;
      case "PtgAttrIf":
        break;
      case "PtgAttrIfError":
        break;
      case "PtgRef":
        c = hn(D[1][1], s, a), l.push(dn(c, i));
        break;
      case "PtgRefN":
        c = t ? hn(D[1][1], t, a) : D[1][1], l.push(dn(c, i));
        break;
      case "PtgRef3d":
        x = /*::Number(*/
        D[1][1], c = hn(D[1][2], s, a), T = Z0(n, x, a), l.push(T + "!" + dn(c, i));
        break;
      case "PtgFunc":
      case "PtgFuncVar":
        var L = D[1][0], q = D[1][1];
        L || (L = 0), L &= 127;
        var se = L == 0 ? [] : l.slice(-L);
        l.length -= L, q === "User" && (q = se.shift()), l.push(q + "(" + se.join(",") + ")");
        break;
      case "PtgBool":
        l.push(D[1] ? "TRUE" : "FALSE");
        break;
      case "PtgInt":
        l.push(
          /*::String(*/
          D[1]
          /*::)*/
        );
        break;
      case "PtgNum":
        l.push(String(D[1]));
        break;
      case "PtgStr":
        l.push('"' + D[1].replace(/"/g, '""') + '"');
        break;
      case "PtgErr":
        l.push(
          /*::String(*/
          D[1]
          /*::)*/
        );
        break;
      case "PtgAreaN":
        v = L0(D[1][1], t ? { s: t } : s, a), l.push(Sa(v, a));
        break;
      case "PtgArea":
        v = L0(D[1][1], s, a), l.push(Sa(v, a));
        break;
      case "PtgArea3d":
        x = /*::Number(*/
        D[1][1], v = D[1][2], T = Z0(n, x, a), l.push(T + "!" + Sa(v, a));
        break;
      case "PtgAttrSum":
        l.push("SUM(" + l.pop() + ")");
        break;
      case "PtgAttrBaxcel":
      case "PtgAttrSemi":
        break;
      case "PtgName":
        p = D[1][2];
        var O = (n.names || [])[p - 1] || (n[0] || [])[p], V = O ? O.Name : "SH33TJSNAME" + String(p);
        V && V.slice(0, 6) == "_xlfn." && !a.xlfn && (V = V.slice(6)), l.push(V);
        break;
      case "PtgNameX":
        var M = D[1][1];
        p = D[1][2];
        var G;
        if (a.biff <= 5)
          M < 0 && (M = -M), n[M] && (G = n[M][p]);
        else {
          var z = "";
          if (((n[M] || [])[0] || [])[0] == 14849 || (((n[M] || [])[0] || [])[0] == 1025 ? n[M][p] && n[M][p].itab > 0 && (z = n.SheetNames[n[M][p].itab - 1] + "!") : z = n.SheetNames[p - 1] + "!"), n[M] && n[M][p]) z += n[M][p].Name;
          else if (n[0] && n[0][p]) z += n[0][p].Name;
          else {
            var K = (_s(n, M, a) || "").split(";;");
            K[p - 1] ? z = K[p - 1] : z += "SH33TJSERRX";
          }
          l.push(z);
          break;
        }
        G || (G = { Name: "SH33TJSERRY" }), l.push(G.Name);
        break;
      case "PtgParen":
        var fe = "(", pe = ")";
        if (u >= 0) {
          switch (h = "", e[0][u][1][0]) {
            case 2:
              fe = Ke(" ", e[0][u][1][1]) + fe;
              break;
            case 3:
              fe = Ke("\r", e[0][u][1][1]) + fe;
              break;
            case 4:
              pe = Ke(" ", e[0][u][1][1]) + pe;
              break;
            case 5:
              pe = Ke("\r", e[0][u][1][1]) + pe;
              break;
            default:
              if (a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][u][1][0]);
          }
          u = -1;
        }
        l.push(fe + l.pop() + pe);
        break;
      case "PtgRefErr":
        l.push("#REF!");
        break;
      case "PtgRefErr3d":
        l.push("#REF!");
        break;
      case "PtgExp":
        c = { c: D[1][1], r: D[1][0] };
        var Ee = { c: t.c, r: t.r };
        if (n.sharedf[Ue(c)]) {
          var Ge = n.sharedf[Ue(c)];
          l.push(Yr(Ge, s, Ee, n, a));
        } else {
          var Le = !1;
          for (f = 0; f != n.arrayf.length; ++f)
            if (o = n.arrayf[f], !(c.c < o[0].s.c || c.c > o[0].e.c) && !(c.r < o[0].s.r || c.r > o[0].e.r)) {
              l.push(Yr(o[1], s, Ee, n, a)), Le = !0;
              break;
            }
          Le || l.push(
            /*::String(*/
            D[1]
            /*::)*/
          );
        }
        break;
      case "PtgArray":
        l.push("{" + qu(
          /*::(*/
          D[1]
          /*:: :any)*/
        ) + "}");
        break;
      case "PtgMemArea":
        break;
      case "PtgAttrSpace":
      case "PtgAttrSpaceSemi":
        u = y;
        break;
      case "PtgTbl":
        break;
      case "PtgMemErr":
        break;
      case "PtgMissArg":
        l.push("");
        break;
      case "PtgAreaErr":
        l.push("#REF!");
        break;
      case "PtgAreaErr3d":
        l.push("#REF!");
        break;
      case "PtgList":
        l.push("Table" + D[1].idx + "[#" + D[1].rt + "]");
        break;
      case "PtgMemAreaN":
      case "PtgMemNoMemN":
      case "PtgAttrNoop":
      case "PtgSheet":
      case "PtgEndSheet":
        break;
      case "PtgMemFunc":
        break;
      case "PtgMemNoMem":
        break;
      case "PtgElfCol":
      case "PtgElfColS":
      case "PtgElfColSV":
      case "PtgElfColV":
      case "PtgElfLel":
      case "PtgElfRadical":
      case "PtgElfRadicalLel":
      case "PtgElfRadicalS":
      case "PtgElfRw":
      case "PtgElfRwV":
        throw new Error("Unsupported ELFs");
      case "PtgSxName":
        throw new Error("Unrecognized Formula Token: " + String(D));
      default:
        throw new Error("Unrecognized Formula Token: " + String(D));
    }
    var lt = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
    if (a.biff != 3 && u >= 0 && lt.indexOf(e[0][y][0]) == -1) {
      D = e[0][u];
      var Ve = !0;
      switch (D[1][0]) {
        case 4:
          Ve = !1;
        case 0:
          h = Ke(" ", D[1][1]);
          break;
        case 5:
          Ve = !1;
        case 1:
          h = Ke("\r", D[1][1]);
          break;
        default:
          if (h = "", a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + D[1][0]);
      }
      l.push((Ve ? h : "") + l.pop() + (Ve ? "" : h)), u = -1;
    }
  }
  if (l.length > 1 && a.WTF) throw new Error("bad formula stack");
  return l[0];
}
function t1(e) {
  if (e == null) {
    var r = U(8);
    return r.write_shift(1, 3), r.write_shift(1, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 65535), r;
  } else if (typeof e == "number") return Cr(e);
  return Cr(0);
}
function r1(e, r, t, n, a) {
  var i = Dr(r, t, a), s = t1(e.v), l = U(6), f = 33;
  l.write_shift(2, f), l.write_shift(4, 0);
  for (var o = U(e.bf.length), c = 0; c < e.bf.length; ++c) o[c] = e.bf[c];
  var x = ct([i, s, l, o]);
  return x;
}
function oa(e, r, t) {
  var n = e.read_shift(4), a = Zu(e, n, t), i = e.read_shift(4), s = i > 0 ? Ju(e, i, a, t) : null;
  return [a, s];
}
var n1 = oa, ca = oa, a1 = oa, i1 = oa, s1 = {
  0: "BEEP",
  1: "OPEN",
  2: "OPEN.LINKS",
  3: "CLOSE.ALL",
  4: "SAVE",
  5: "SAVE.AS",
  6: "FILE.DELETE",
  7: "PAGE.SETUP",
  8: "PRINT",
  9: "PRINTER.SETUP",
  10: "QUIT",
  11: "NEW.WINDOW",
  12: "ARRANGE.ALL",
  13: "WINDOW.SIZE",
  14: "WINDOW.MOVE",
  15: "FULL",
  16: "CLOSE",
  17: "RUN",
  22: "SET.PRINT.AREA",
  23: "SET.PRINT.TITLES",
  24: "SET.PAGE.BREAK",
  25: "REMOVE.PAGE.BREAK",
  26: "FONT",
  27: "DISPLAY",
  28: "PROTECT.DOCUMENT",
  29: "PRECISION",
  30: "A1.R1C1",
  31: "CALCULATE.NOW",
  32: "CALCULATION",
  34: "DATA.FIND",
  35: "EXTRACT",
  36: "DATA.DELETE",
  37: "SET.DATABASE",
  38: "SET.CRITERIA",
  39: "SORT",
  40: "DATA.SERIES",
  41: "TABLE",
  42: "FORMAT.NUMBER",
  43: "ALIGNMENT",
  44: "STYLE",
  45: "BORDER",
  46: "CELL.PROTECTION",
  47: "COLUMN.WIDTH",
  48: "UNDO",
  49: "CUT",
  50: "COPY",
  51: "PASTE",
  52: "CLEAR",
  53: "PASTE.SPECIAL",
  54: "EDIT.DELETE",
  55: "INSERT",
  56: "FILL.RIGHT",
  57: "FILL.DOWN",
  61: "DEFINE.NAME",
  62: "CREATE.NAMES",
  63: "FORMULA.GOTO",
  64: "FORMULA.FIND",
  65: "SELECT.LAST.CELL",
  66: "SHOW.ACTIVE.CELL",
  67: "GALLERY.AREA",
  68: "GALLERY.BAR",
  69: "GALLERY.COLUMN",
  70: "GALLERY.LINE",
  71: "GALLERY.PIE",
  72: "GALLERY.SCATTER",
  73: "COMBINATION",
  74: "PREFERRED",
  75: "ADD.OVERLAY",
  76: "GRIDLINES",
  77: "SET.PREFERRED",
  78: "AXES",
  79: "LEGEND",
  80: "ATTACH.TEXT",
  81: "ADD.ARROW",
  82: "SELECT.CHART",
  83: "SELECT.PLOT.AREA",
  84: "PATTERNS",
  85: "MAIN.CHART",
  86: "OVERLAY",
  87: "SCALE",
  88: "FORMAT.LEGEND",
  89: "FORMAT.TEXT",
  90: "EDIT.REPEAT",
  91: "PARSE",
  92: "JUSTIFY",
  93: "HIDE",
  94: "UNHIDE",
  95: "WORKSPACE",
  96: "FORMULA",
  97: "FORMULA.FILL",
  98: "FORMULA.ARRAY",
  99: "DATA.FIND.NEXT",
  100: "DATA.FIND.PREV",
  101: "FORMULA.FIND.NEXT",
  102: "FORMULA.FIND.PREV",
  103: "ACTIVATE",
  104: "ACTIVATE.NEXT",
  105: "ACTIVATE.PREV",
  106: "UNLOCKED.NEXT",
  107: "UNLOCKED.PREV",
  108: "COPY.PICTURE",
  109: "SELECT",
  110: "DELETE.NAME",
  111: "DELETE.FORMAT",
  112: "VLINE",
  113: "HLINE",
  114: "VPAGE",
  115: "HPAGE",
  116: "VSCROLL",
  117: "HSCROLL",
  118: "ALERT",
  119: "NEW",
  120: "CANCEL.COPY",
  121: "SHOW.CLIPBOARD",
  122: "MESSAGE",
  124: "PASTE.LINK",
  125: "APP.ACTIVATE",
  126: "DELETE.ARROW",
  127: "ROW.HEIGHT",
  128: "FORMAT.MOVE",
  129: "FORMAT.SIZE",
  130: "FORMULA.REPLACE",
  131: "SEND.KEYS",
  132: "SELECT.SPECIAL",
  133: "APPLY.NAMES",
  134: "REPLACE.FONT",
  135: "FREEZE.PANES",
  136: "SHOW.INFO",
  137: "SPLIT",
  138: "ON.WINDOW",
  139: "ON.DATA",
  140: "DISABLE.INPUT",
  142: "OUTLINE",
  143: "LIST.NAMES",
  144: "FILE.CLOSE",
  145: "SAVE.WORKBOOK",
  146: "DATA.FORM",
  147: "COPY.CHART",
  148: "ON.TIME",
  149: "WAIT",
  150: "FORMAT.FONT",
  151: "FILL.UP",
  152: "FILL.LEFT",
  153: "DELETE.OVERLAY",
  155: "SHORT.MENUS",
  159: "SET.UPDATE.STATUS",
  161: "COLOR.PALETTE",
  162: "DELETE.STYLE",
  163: "WINDOW.RESTORE",
  164: "WINDOW.MAXIMIZE",
  166: "CHANGE.LINK",
  167: "CALCULATE.DOCUMENT",
  168: "ON.KEY",
  169: "APP.RESTORE",
  170: "APP.MOVE",
  171: "APP.SIZE",
  172: "APP.MINIMIZE",
  173: "APP.MAXIMIZE",
  174: "BRING.TO.FRONT",
  175: "SEND.TO.BACK",
  185: "MAIN.CHART.TYPE",
  186: "OVERLAY.CHART.TYPE",
  187: "SELECT.END",
  188: "OPEN.MAIL",
  189: "SEND.MAIL",
  190: "STANDARD.FONT",
  191: "CONSOLIDATE",
  192: "SORT.SPECIAL",
  193: "GALLERY.3D.AREA",
  194: "GALLERY.3D.COLUMN",
  195: "GALLERY.3D.LINE",
  196: "GALLERY.3D.PIE",
  197: "VIEW.3D",
  198: "GOAL.SEEK",
  199: "WORKGROUP",
  200: "FILL.GROUP",
  201: "UPDATE.LINK",
  202: "PROMOTE",
  203: "DEMOTE",
  204: "SHOW.DETAIL",
  206: "UNGROUP",
  207: "OBJECT.PROPERTIES",
  208: "SAVE.NEW.OBJECT",
  209: "SHARE",
  210: "SHARE.NAME",
  211: "DUPLICATE",
  212: "APPLY.STYLE",
  213: "ASSIGN.TO.OBJECT",
  214: "OBJECT.PROTECTION",
  215: "HIDE.OBJECT",
  216: "SET.EXTRACT",
  217: "CREATE.PUBLISHER",
  218: "SUBSCRIBE.TO",
  219: "ATTRIBUTES",
  220: "SHOW.TOOLBAR",
  222: "PRINT.PREVIEW",
  223: "EDIT.COLOR",
  224: "SHOW.LEVELS",
  225: "FORMAT.MAIN",
  226: "FORMAT.OVERLAY",
  227: "ON.RECALC",
  228: "EDIT.SERIES",
  229: "DEFINE.STYLE",
  240: "LINE.PRINT",
  243: "ENTER.DATA",
  249: "GALLERY.RADAR",
  250: "MERGE.STYLES",
  251: "EDITION.OPTIONS",
  252: "PASTE.PICTURE",
  253: "PASTE.PICTURE.LINK",
  254: "SPELLING",
  256: "ZOOM",
  259: "INSERT.OBJECT",
  260: "WINDOW.MINIMIZE",
  265: "SOUND.NOTE",
  266: "SOUND.PLAY",
  267: "FORMAT.SHAPE",
  268: "EXTEND.POLYGON",
  269: "FORMAT.AUTO",
  272: "GALLERY.3D.BAR",
  273: "GALLERY.3D.SURFACE",
  274: "FILL.AUTO",
  276: "CUSTOMIZE.TOOLBAR",
  277: "ADD.TOOL",
  278: "EDIT.OBJECT",
  279: "ON.DOUBLECLICK",
  280: "ON.ENTRY",
  281: "WORKBOOK.ADD",
  282: "WORKBOOK.MOVE",
  283: "WORKBOOK.COPY",
  284: "WORKBOOK.OPTIONS",
  285: "SAVE.WORKSPACE",
  288: "CHART.WIZARD",
  289: "DELETE.TOOL",
  290: "MOVE.TOOL",
  291: "WORKBOOK.SELECT",
  292: "WORKBOOK.ACTIVATE",
  293: "ASSIGN.TO.TOOL",
  295: "COPY.TOOL",
  296: "RESET.TOOL",
  297: "CONSTRAIN.NUMERIC",
  298: "PASTE.TOOL",
  302: "WORKBOOK.NEW",
  305: "SCENARIO.CELLS",
  306: "SCENARIO.DELETE",
  307: "SCENARIO.ADD",
  308: "SCENARIO.EDIT",
  309: "SCENARIO.SHOW",
  310: "SCENARIO.SHOW.NEXT",
  311: "SCENARIO.SUMMARY",
  312: "PIVOT.TABLE.WIZARD",
  313: "PIVOT.FIELD.PROPERTIES",
  314: "PIVOT.FIELD",
  315: "PIVOT.ITEM",
  316: "PIVOT.ADD.FIELDS",
  318: "OPTIONS.CALCULATION",
  319: "OPTIONS.EDIT",
  320: "OPTIONS.VIEW",
  321: "ADDIN.MANAGER",
  322: "MENU.EDITOR",
  323: "ATTACH.TOOLBARS",
  324: "VBAActivate",
  325: "OPTIONS.CHART",
  328: "VBA.INSERT.FILE",
  330: "VBA.PROCEDURE.DEFINITION",
  336: "ROUTING.SLIP",
  338: "ROUTE.DOCUMENT",
  339: "MAIL.LOGON",
  342: "INSERT.PICTURE",
  343: "EDIT.TOOL",
  344: "GALLERY.DOUGHNUT",
  350: "CHART.TREND",
  352: "PIVOT.ITEM.PROPERTIES",
  354: "WORKBOOK.INSERT",
  355: "OPTIONS.TRANSITION",
  356: "OPTIONS.GENERAL",
  370: "FILTER.ADVANCED",
  373: "MAIL.ADD.MAILER",
  374: "MAIL.DELETE.MAILER",
  375: "MAIL.REPLY",
  376: "MAIL.REPLY.ALL",
  377: "MAIL.FORWARD",
  378: "MAIL.NEXT.LETTER",
  379: "DATA.LABEL",
  380: "INSERT.TITLE",
  381: "FONT.PROPERTIES",
  382: "MACRO.OPTIONS",
  383: "WORKBOOK.HIDE",
  384: "WORKBOOK.UNHIDE",
  385: "WORKBOOK.DELETE",
  386: "WORKBOOK.NAME",
  388: "GALLERY.CUSTOM",
  390: "ADD.CHART.AUTOFORMAT",
  391: "DELETE.CHART.AUTOFORMAT",
  392: "CHART.ADD.DATA",
  393: "AUTO.OUTLINE",
  394: "TAB.ORDER",
  395: "SHOW.DIALOG",
  396: "SELECT.ALL",
  397: "UNGROUP.SHEETS",
  398: "SUBTOTAL.CREATE",
  399: "SUBTOTAL.REMOVE",
  400: "RENAME.OBJECT",
  412: "WORKBOOK.SCROLL",
  413: "WORKBOOK.NEXT",
  414: "WORKBOOK.PREV",
  415: "WORKBOOK.TAB.SPLIT",
  416: "FULL.SCREEN",
  417: "WORKBOOK.PROTECT",
  420: "SCROLLBAR.PROPERTIES",
  421: "PIVOT.SHOW.PAGES",
  422: "TEXT.TO.COLUMNS",
  423: "FORMAT.CHARTTYPE",
  424: "LINK.FORMAT",
  425: "TRACER.DISPLAY",
  430: "TRACER.NAVIGATE",
  431: "TRACER.CLEAR",
  432: "TRACER.ERROR",
  433: "PIVOT.FIELD.GROUP",
  434: "PIVOT.FIELD.UNGROUP",
  435: "CHECKBOX.PROPERTIES",
  436: "LABEL.PROPERTIES",
  437: "LISTBOX.PROPERTIES",
  438: "EDITBOX.PROPERTIES",
  439: "PIVOT.REFRESH",
  440: "LINK.COMBO",
  441: "OPEN.TEXT",
  442: "HIDE.DIALOG",
  443: "SET.DIALOG.FOCUS",
  444: "ENABLE.OBJECT",
  445: "PUSHBUTTON.PROPERTIES",
  446: "SET.DIALOG.DEFAULT",
  447: "FILTER",
  448: "FILTER.SHOW.ALL",
  449: "CLEAR.OUTLINE",
  450: "FUNCTION.WIZARD",
  451: "ADD.LIST.ITEM",
  452: "SET.LIST.ITEM",
  453: "REMOVE.LIST.ITEM",
  454: "SELECT.LIST.ITEM",
  455: "SET.CONTROL.VALUE",
  456: "SAVE.COPY.AS",
  458: "OPTIONS.LISTS.ADD",
  459: "OPTIONS.LISTS.DELETE",
  460: "SERIES.AXES",
  461: "SERIES.X",
  462: "SERIES.Y",
  463: "ERRORBAR.X",
  464: "ERRORBAR.Y",
  465: "FORMAT.CHART",
  466: "SERIES.ORDER",
  467: "MAIL.LOGOFF",
  468: "CLEAR.ROUTING.SLIP",
  469: "APP.ACTIVATE.MICROSOFT",
  470: "MAIL.EDIT.MAILER",
  471: "ON.SHEET",
  472: "STANDARD.WIDTH",
  473: "SCENARIO.MERGE",
  474: "SUMMARY.INFO",
  475: "FIND.FILE",
  476: "ACTIVE.CELL.FONT",
  477: "ENABLE.TIPWIZARD",
  478: "VBA.MAKE.ADDIN",
  480: "INSERTDATATABLE",
  481: "WORKGROUP.OPTIONS",
  482: "MAIL.SEND.MAILER",
  485: "AUTOCORRECT",
  489: "POST.DOCUMENT",
  491: "PICKLIST",
  493: "VIEW.SHOW",
  494: "VIEW.DEFINE",
  495: "VIEW.DELETE",
  509: "SHEET.BACKGROUND",
  510: "INSERT.MAP.OBJECT",
  511: "OPTIONS.MENONO",
  517: "MSOCHECKS",
  518: "NORMAL",
  519: "LAYOUT",
  520: "RM.PRINT.AREA",
  521: "CLEAR.PRINT.AREA",
  522: "ADD.PRINT.AREA",
  523: "MOVE.BRK",
  545: "HIDECURR.NOTE",
  546: "HIDEALL.NOTES",
  547: "DELETE.NOTE",
  548: "TRAVERSE.NOTES",
  549: "ACTIVATE.NOTES",
  620: "PROTECT.REVISIONS",
  621: "UNPROTECT.REVISIONS",
  647: "OPTIONS.ME",
  653: "WEB.PUBLISH",
  667: "NEWWEBQUERY",
  673: "PIVOT.TABLE.CHART",
  753: "OPTIONS.SAVE",
  755: "OPTIONS.SPELL",
  808: "HIDEALL.INKANNOTS"
}, Ts = {
  0: "COUNT",
  1: "IF",
  2: "ISNA",
  3: "ISERROR",
  4: "SUM",
  5: "AVERAGE",
  6: "MIN",
  7: "MAX",
  8: "ROW",
  9: "COLUMN",
  10: "NA",
  11: "NPV",
  12: "STDEV",
  13: "DOLLAR",
  14: "FIXED",
  15: "SIN",
  16: "COS",
  17: "TAN",
  18: "ATAN",
  19: "PI",
  20: "SQRT",
  21: "EXP",
  22: "LN",
  23: "LOG10",
  24: "ABS",
  25: "INT",
  26: "SIGN",
  27: "ROUND",
  28: "LOOKUP",
  29: "INDEX",
  30: "REPT",
  31: "MID",
  32: "LEN",
  33: "VALUE",
  34: "TRUE",
  35: "FALSE",
  36: "AND",
  37: "OR",
  38: "NOT",
  39: "MOD",
  40: "DCOUNT",
  41: "DSUM",
  42: "DAVERAGE",
  43: "DMIN",
  44: "DMAX",
  45: "DSTDEV",
  46: "VAR",
  47: "DVAR",
  48: "TEXT",
  49: "LINEST",
  50: "TREND",
  51: "LOGEST",
  52: "GROWTH",
  53: "GOTO",
  54: "HALT",
  55: "RETURN",
  56: "PV",
  57: "FV",
  58: "NPER",
  59: "PMT",
  60: "RATE",
  61: "MIRR",
  62: "IRR",
  63: "RAND",
  64: "MATCH",
  65: "DATE",
  66: "TIME",
  67: "DAY",
  68: "MONTH",
  69: "YEAR",
  70: "WEEKDAY",
  71: "HOUR",
  72: "MINUTE",
  73: "SECOND",
  74: "NOW",
  75: "AREAS",
  76: "ROWS",
  77: "COLUMNS",
  78: "OFFSET",
  79: "ABSREF",
  80: "RELREF",
  81: "ARGUMENT",
  82: "SEARCH",
  83: "TRANSPOSE",
  84: "ERROR",
  85: "STEP",
  86: "TYPE",
  87: "ECHO",
  88: "SET.NAME",
  89: "CALLER",
  90: "DEREF",
  91: "WINDOWS",
  92: "SERIES",
  93: "DOCUMENTS",
  94: "ACTIVE.CELL",
  95: "SELECTION",
  96: "RESULT",
  97: "ATAN2",
  98: "ASIN",
  99: "ACOS",
  100: "CHOOSE",
  101: "HLOOKUP",
  102: "VLOOKUP",
  103: "LINKS",
  104: "INPUT",
  105: "ISREF",
  106: "GET.FORMULA",
  107: "GET.NAME",
  108: "SET.VALUE",
  109: "LOG",
  110: "EXEC",
  111: "CHAR",
  112: "LOWER",
  113: "UPPER",
  114: "PROPER",
  115: "LEFT",
  116: "RIGHT",
  117: "EXACT",
  118: "TRIM",
  119: "REPLACE",
  120: "SUBSTITUTE",
  121: "CODE",
  122: "NAMES",
  123: "DIRECTORY",
  124: "FIND",
  125: "CELL",
  126: "ISERR",
  127: "ISTEXT",
  128: "ISNUMBER",
  129: "ISBLANK",
  130: "T",
  131: "N",
  132: "FOPEN",
  133: "FCLOSE",
  134: "FSIZE",
  135: "FREADLN",
  136: "FREAD",
  137: "FWRITELN",
  138: "FWRITE",
  139: "FPOS",
  140: "DATEVALUE",
  141: "TIMEVALUE",
  142: "SLN",
  143: "SYD",
  144: "DDB",
  145: "GET.DEF",
  146: "REFTEXT",
  147: "TEXTREF",
  148: "INDIRECT",
  149: "REGISTER",
  150: "CALL",
  151: "ADD.BAR",
  152: "ADD.MENU",
  153: "ADD.COMMAND",
  154: "ENABLE.COMMAND",
  155: "CHECK.COMMAND",
  156: "RENAME.COMMAND",
  157: "SHOW.BAR",
  158: "DELETE.MENU",
  159: "DELETE.COMMAND",
  160: "GET.CHART.ITEM",
  161: "DIALOG.BOX",
  162: "CLEAN",
  163: "MDETERM",
  164: "MINVERSE",
  165: "MMULT",
  166: "FILES",
  167: "IPMT",
  168: "PPMT",
  169: "COUNTA",
  170: "CANCEL.KEY",
  171: "FOR",
  172: "WHILE",
  173: "BREAK",
  174: "NEXT",
  175: "INITIATE",
  176: "REQUEST",
  177: "POKE",
  178: "EXECUTE",
  179: "TERMINATE",
  180: "RESTART",
  181: "HELP",
  182: "GET.BAR",
  183: "PRODUCT",
  184: "FACT",
  185: "GET.CELL",
  186: "GET.WORKSPACE",
  187: "GET.WINDOW",
  188: "GET.DOCUMENT",
  189: "DPRODUCT",
  190: "ISNONTEXT",
  191: "GET.NOTE",
  192: "NOTE",
  193: "STDEVP",
  194: "VARP",
  195: "DSTDEVP",
  196: "DVARP",
  197: "TRUNC",
  198: "ISLOGICAL",
  199: "DCOUNTA",
  200: "DELETE.BAR",
  201: "UNREGISTER",
  204: "USDOLLAR",
  205: "FINDB",
  206: "SEARCHB",
  207: "REPLACEB",
  208: "LEFTB",
  209: "RIGHTB",
  210: "MIDB",
  211: "LENB",
  212: "ROUNDUP",
  213: "ROUNDDOWN",
  214: "ASC",
  215: "DBCS",
  216: "RANK",
  219: "ADDRESS",
  220: "DAYS360",
  221: "TODAY",
  222: "VDB",
  223: "ELSE",
  224: "ELSE.IF",
  225: "END.IF",
  226: "FOR.CELL",
  227: "MEDIAN",
  228: "SUMPRODUCT",
  229: "SINH",
  230: "COSH",
  231: "TANH",
  232: "ASINH",
  233: "ACOSH",
  234: "ATANH",
  235: "DGET",
  236: "CREATE.OBJECT",
  237: "VOLATILE",
  238: "LAST.ERROR",
  239: "CUSTOM.UNDO",
  240: "CUSTOM.REPEAT",
  241: "FORMULA.CONVERT",
  242: "GET.LINK.INFO",
  243: "TEXT.BOX",
  244: "INFO",
  245: "GROUP",
  246: "GET.OBJECT",
  247: "DB",
  248: "PAUSE",
  251: "RESUME",
  252: "FREQUENCY",
  253: "ADD.TOOLBAR",
  254: "DELETE.TOOLBAR",
  255: "User",
  256: "RESET.TOOLBAR",
  257: "EVALUATE",
  258: "GET.TOOLBAR",
  259: "GET.TOOL",
  260: "SPELLING.CHECK",
  261: "ERROR.TYPE",
  262: "APP.TITLE",
  263: "WINDOW.TITLE",
  264: "SAVE.TOOLBAR",
  265: "ENABLE.TOOL",
  266: "PRESS.TOOL",
  267: "REGISTER.ID",
  268: "GET.WORKBOOK",
  269: "AVEDEV",
  270: "BETADIST",
  271: "GAMMALN",
  272: "BETAINV",
  273: "BINOMDIST",
  274: "CHIDIST",
  275: "CHIINV",
  276: "COMBIN",
  277: "CONFIDENCE",
  278: "CRITBINOM",
  279: "EVEN",
  280: "EXPONDIST",
  281: "FDIST",
  282: "FINV",
  283: "FISHER",
  284: "FISHERINV",
  285: "FLOOR",
  286: "GAMMADIST",
  287: "GAMMAINV",
  288: "CEILING",
  289: "HYPGEOMDIST",
  290: "LOGNORMDIST",
  291: "LOGINV",
  292: "NEGBINOMDIST",
  293: "NORMDIST",
  294: "NORMSDIST",
  295: "NORMINV",
  296: "NORMSINV",
  297: "STANDARDIZE",
  298: "ODD",
  299: "PERMUT",
  300: "POISSON",
  301: "TDIST",
  302: "WEIBULL",
  303: "SUMXMY2",
  304: "SUMX2MY2",
  305: "SUMX2PY2",
  306: "CHITEST",
  307: "CORREL",
  308: "COVAR",
  309: "FORECAST",
  310: "FTEST",
  311: "INTERCEPT",
  312: "PEARSON",
  313: "RSQ",
  314: "STEYX",
  315: "SLOPE",
  316: "TTEST",
  317: "PROB",
  318: "DEVSQ",
  319: "GEOMEAN",
  320: "HARMEAN",
  321: "SUMSQ",
  322: "KURT",
  323: "SKEW",
  324: "ZTEST",
  325: "LARGE",
  326: "SMALL",
  327: "QUARTILE",
  328: "PERCENTILE",
  329: "PERCENTRANK",
  330: "MODE",
  331: "TRIMMEAN",
  332: "TINV",
  334: "MOVIE.COMMAND",
  335: "GET.MOVIE",
  336: "CONCATENATE",
  337: "POWER",
  338: "PIVOT.ADD.DATA",
  339: "GET.PIVOT.TABLE",
  340: "GET.PIVOT.FIELD",
  341: "GET.PIVOT.ITEM",
  342: "RADIANS",
  343: "DEGREES",
  344: "SUBTOTAL",
  345: "SUMIF",
  346: "COUNTIF",
  347: "COUNTBLANK",
  348: "SCENARIO.GET",
  349: "OPTIONS.LISTS.GET",
  350: "ISPMT",
  351: "DATEDIF",
  352: "DATESTRING",
  353: "NUMBERSTRING",
  354: "ROMAN",
  355: "OPEN.DIALOG",
  356: "SAVE.DIALOG",
  357: "VIEW.GET",
  358: "GETPIVOTDATA",
  359: "HYPERLINK",
  360: "PHONETIC",
  361: "AVERAGEA",
  362: "MAXA",
  363: "MINA",
  364: "STDEVPA",
  365: "VARPA",
  366: "STDEVA",
  367: "VARA",
  368: "BAHTTEXT",
  369: "THAIDAYOFWEEK",
  370: "THAIDIGIT",
  371: "THAIMONTHOFYEAR",
  372: "THAINUMSOUND",
  373: "THAINUMSTRING",
  374: "THAISTRINGLENGTH",
  375: "ISTHAIDIGIT",
  376: "ROUNDBAHTDOWN",
  377: "ROUNDBAHTUP",
  378: "THAIYEAR",
  379: "RTD",
  380: "CUBEVALUE",
  381: "CUBEMEMBER",
  382: "CUBEMEMBERPROPERTY",
  383: "CUBERANKEDMEMBER",
  384: "HEX2BIN",
  385: "HEX2DEC",
  386: "HEX2OCT",
  387: "DEC2BIN",
  388: "DEC2HEX",
  389: "DEC2OCT",
  390: "OCT2BIN",
  391: "OCT2HEX",
  392: "OCT2DEC",
  393: "BIN2DEC",
  394: "BIN2OCT",
  395: "BIN2HEX",
  396: "IMSUB",
  397: "IMDIV",
  398: "IMPOWER",
  399: "IMABS",
  400: "IMSQRT",
  401: "IMLN",
  402: "IMLOG2",
  403: "IMLOG10",
  404: "IMSIN",
  405: "IMCOS",
  406: "IMEXP",
  407: "IMARGUMENT",
  408: "IMCONJUGATE",
  409: "IMAGINARY",
  410: "IMREAL",
  411: "COMPLEX",
  412: "IMSUM",
  413: "IMPRODUCT",
  414: "SERIESSUM",
  415: "FACTDOUBLE",
  416: "SQRTPI",
  417: "QUOTIENT",
  418: "DELTA",
  419: "GESTEP",
  420: "ISEVEN",
  421: "ISODD",
  422: "MROUND",
  423: "ERF",
  424: "ERFC",
  425: "BESSELJ",
  426: "BESSELK",
  427: "BESSELY",
  428: "BESSELI",
  429: "XIRR",
  430: "XNPV",
  431: "PRICEMAT",
  432: "YIELDMAT",
  433: "INTRATE",
  434: "RECEIVED",
  435: "DISC",
  436: "PRICEDISC",
  437: "YIELDDISC",
  438: "TBILLEQ",
  439: "TBILLPRICE",
  440: "TBILLYIELD",
  441: "PRICE",
  442: "YIELD",
  443: "DOLLARDE",
  444: "DOLLARFR",
  445: "NOMINAL",
  446: "EFFECT",
  447: "CUMPRINC",
  448: "CUMIPMT",
  449: "EDATE",
  450: "EOMONTH",
  451: "YEARFRAC",
  452: "COUPDAYBS",
  453: "COUPDAYS",
  454: "COUPDAYSNC",
  455: "COUPNCD",
  456: "COUPNUM",
  457: "COUPPCD",
  458: "DURATION",
  459: "MDURATION",
  460: "ODDLPRICE",
  461: "ODDLYIELD",
  462: "ODDFPRICE",
  463: "ODDFYIELD",
  464: "RANDBETWEEN",
  465: "WEEKNUM",
  466: "AMORDEGRC",
  467: "AMORLINC",
  468: "CONVERT",
  724: "SHEETJS",
  469: "ACCRINT",
  470: "ACCRINTM",
  471: "WORKDAY",
  472: "NETWORKDAYS",
  473: "GCD",
  474: "MULTINOMIAL",
  475: "LCM",
  476: "FVSCHEDULE",
  477: "CUBEKPIMEMBER",
  478: "CUBESET",
  479: "CUBESETCOUNT",
  480: "IFERROR",
  481: "COUNTIFS",
  482: "SUMIFS",
  483: "AVERAGEIF",
  484: "AVERAGEIFS"
}, l1 = {
  2: 1,
  3: 1,
  10: 0,
  15: 1,
  16: 1,
  17: 1,
  18: 1,
  19: 0,
  20: 1,
  21: 1,
  22: 1,
  23: 1,
  24: 1,
  25: 1,
  26: 1,
  27: 2,
  30: 2,
  31: 3,
  32: 1,
  33: 1,
  34: 0,
  35: 0,
  38: 1,
  39: 2,
  40: 3,
  41: 3,
  42: 3,
  43: 3,
  44: 3,
  45: 3,
  47: 3,
  48: 2,
  53: 1,
  61: 3,
  63: 0,
  65: 3,
  66: 3,
  67: 1,
  68: 1,
  69: 1,
  70: 1,
  71: 1,
  72: 1,
  73: 1,
  74: 0,
  75: 1,
  76: 1,
  77: 1,
  79: 2,
  80: 2,
  83: 1,
  85: 0,
  86: 1,
  89: 0,
  90: 1,
  94: 0,
  95: 0,
  97: 2,
  98: 1,
  99: 1,
  101: 3,
  102: 3,
  105: 1,
  106: 1,
  108: 2,
  111: 1,
  112: 1,
  113: 1,
  114: 1,
  117: 2,
  118: 1,
  119: 4,
  121: 1,
  126: 1,
  127: 1,
  128: 1,
  129: 1,
  130: 1,
  131: 1,
  133: 1,
  134: 1,
  135: 1,
  136: 2,
  137: 2,
  138: 2,
  140: 1,
  141: 1,
  142: 3,
  143: 4,
  144: 4,
  161: 1,
  162: 1,
  163: 1,
  164: 1,
  165: 2,
  172: 1,
  175: 2,
  176: 2,
  177: 3,
  178: 2,
  179: 1,
  184: 1,
  186: 1,
  189: 3,
  190: 1,
  195: 3,
  196: 3,
  197: 1,
  198: 1,
  199: 3,
  201: 1,
  207: 4,
  210: 3,
  211: 1,
  212: 2,
  213: 2,
  214: 1,
  215: 1,
  225: 0,
  229: 1,
  230: 1,
  231: 1,
  232: 1,
  233: 1,
  234: 1,
  235: 3,
  244: 1,
  247: 4,
  252: 2,
  257: 1,
  261: 1,
  271: 1,
  273: 4,
  274: 2,
  275: 2,
  276: 2,
  277: 3,
  278: 3,
  279: 1,
  280: 3,
  281: 3,
  282: 3,
  283: 1,
  284: 1,
  285: 2,
  286: 4,
  287: 3,
  288: 2,
  289: 4,
  290: 3,
  291: 3,
  292: 3,
  293: 4,
  294: 1,
  295: 3,
  296: 1,
  297: 3,
  298: 1,
  299: 2,
  300: 3,
  301: 3,
  302: 4,
  303: 2,
  304: 2,
  305: 2,
  306: 2,
  307: 2,
  308: 2,
  309: 3,
  310: 2,
  311: 2,
  312: 2,
  313: 2,
  314: 2,
  315: 2,
  316: 4,
  325: 2,
  326: 2,
  327: 2,
  328: 2,
  331: 2,
  332: 2,
  337: 2,
  342: 1,
  343: 1,
  346: 2,
  347: 1,
  350: 4,
  351: 3,
  352: 1,
  353: 2,
  360: 1,
  368: 1,
  369: 1,
  370: 1,
  371: 1,
  372: 1,
  373: 1,
  374: 1,
  375: 1,
  376: 1,
  377: 1,
  378: 1,
  382: 3,
  385: 1,
  392: 1,
  393: 1,
  396: 2,
  397: 2,
  398: 2,
  399: 1,
  400: 1,
  401: 1,
  402: 1,
  403: 1,
  404: 1,
  405: 1,
  406: 1,
  407: 1,
  408: 1,
  409: 1,
  410: 1,
  414: 4,
  415: 1,
  416: 1,
  417: 2,
  420: 1,
  421: 1,
  422: 2,
  424: 1,
  425: 2,
  426: 2,
  427: 2,
  428: 2,
  430: 3,
  438: 3,
  439: 3,
  440: 3,
  443: 2,
  444: 2,
  445: 2,
  446: 2,
  447: 6,
  448: 6,
  449: 2,
  450: 2,
  464: 2,
  468: 3,
  476: 2,
  479: 1,
  480: 2,
  65535: 0
};
function f1(e) {
  var r = "of:=" + e.replace(e0, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
  return r.replace(/;/g, "|").replace(/,/g, ";");
}
function o1(e) {
  return e.replace(/\./, "!");
}
var xn = typeof Map < "u";
function n0(e, r, t) {
  var n = 0, a = e.length;
  if (t) {
    if (xn ? t.has(r) : Object.prototype.hasOwnProperty.call(t, r)) {
      for (var i = xn ? t.get(r) : t[r]; n < i.length; ++n)
        if (e[i[n]].t === r)
          return e.Count++, i[n];
    }
  } else for (; n < a; ++n)
    if (e[n].t === r)
      return e.Count++, n;
  return e[a] = { t: r }, e.Count++, e.Unique++, t && (xn ? (t.has(r) || t.set(r, []), t.get(r).push(a)) : (Object.prototype.hasOwnProperty.call(t, r) || (t[r] = []), t[r].push(a))), a;
}
function ua(e, r) {
  var t = { min: e + 1, max: e + 1 }, n = -1;
  return r.MDW && (tr = r.MDW), r.width != null ? t.customWidth = 1 : r.wpx != null ? n = ea(r.wpx) : r.wch != null && (n = r.wch), n > -1 ? (t.width = Ma(n), t.customWidth = 1) : r.width != null && (t.width = r.width), r.hidden && (t.hidden = !0), r.level != null && (t.outlineLevel = t.level = r.level), t;
}
function Es(e, r) {
  if (e) {
    var t = [0.7, 0.7, 0.75, 0.75, 0.3, 0.3];
    e.left == null && (e.left = t[0]), e.right == null && (e.right = t[1]), e.top == null && (e.top = t[2]), e.bottom == null && (e.bottom = t[3]), e.header == null && (e.header = t[4]), e.footer == null && (e.footer = t[5]);
  }
}
function gr(e, r, t) {
  var n = t.revssf[r.z != null ? r.z : "General"], a = 60, i = e.length;
  if (n == null && t.ssf) {
    for (; a < 392; ++a) if (t.ssf[a] == null) {
      pi(r.z, a), t.ssf[a] = r.z, t.revssf[r.z] = n = a;
      break;
    }
  }
  for (a = 0; a != i; ++a) if (e[a].numFmtId === n) return a;
  return e[i] = {
    numFmtId: n,
    fontId: 0,
    fillId: 0,
    borderId: 0,
    xfId: 0,
    applyNumberFormat: 1
  }, i;
}
function c1(e, r, t) {
  if (e && e["!ref"]) {
    var n = He(e["!ref"]);
    if (n.e.c < n.s.c || n.e.r < n.s.r) throw new Error("Bad range (" + t + "): " + e["!ref"]);
  }
}
function u1(e) {
  if (e.length === 0) return "";
  for (var r = '<mergeCells count="' + e.length + '">', t = 0; t != e.length; ++t) r += '<mergeCell ref="' + Qe(e[t]) + '"/>';
  return r + "</mergeCells>";
}
function h1(e, r, t, n, a) {
  var i = !1, s = {}, l = null;
  if (n.bookType !== "xlsx" && r.vbaraw) {
    var f = r.SheetNames[t];
    try {
      r.Workbook && (f = r.Workbook.Sheets[t].CodeName || f);
    } catch {
    }
    i = !0, s.codeName = _n(be(f));
  }
  if (e && e["!outline"]) {
    var o = { summaryBelow: 1, summaryRight: 1 };
    e["!outline"].above && (o.summaryBelow = 0), e["!outline"].left && (o.summaryRight = 0), l = (l || "") + te("outlinePr", null, o);
  }
  !i && !l || (a[a.length] = te("sheetPr", l, s));
}
var d1 = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"], x1 = [
  "formatColumns",
  "formatRows",
  "formatCells",
  "insertColumns",
  "insertRows",
  "insertHyperlinks",
  "deleteColumns",
  "deleteRows",
  "sort",
  "autoFilter",
  "pivotTables"
];
function v1(e) {
  var r = { sheet: 1 };
  return d1.forEach(function(t) {
    e[t] != null && e[t] && (r[t] = "1");
  }), x1.forEach(function(t) {
    e[t] != null && !e[t] && (r[t] = "0");
  }), e.password && (r.password = as(e.password).toString(16).toUpperCase()), te("sheetProtection", null, r);
}
function p1(e) {
  return Es(e), te("pageMargins", null, e);
}
function m1(e, r) {
  for (var t = ["<cols>"], n, a = 0; a != r.length; ++a)
    (n = r[a]) && (t[t.length] = te("col", null, ua(a, n)));
  return t[t.length] = "</cols>", t.join("");
}
function g1(e, r, t, n) {
  var a = typeof e.ref == "string" ? e.ref : Qe(e.ref);
  t.Workbook || (t.Workbook = { Sheets: [] }), t.Workbook.Names || (t.Workbook.Names = []);
  var i = t.Workbook.Names, s = Rt(a);
  s.s.r == s.e.r && (s.e.r = Rt(r["!ref"]).e.r, a = Qe(s));
  for (var l = 0; l < i.length; ++l) {
    var f = i[l];
    if (f.Name == "_xlnm._FilterDatabase" && f.Sheet == n) {
      f.Ref = "'" + t.SheetNames[n] + "'!" + a;
      break;
    }
  }
  return l == i.length && i.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + t.SheetNames[n] + "'!" + a }), te("autoFilter", null, { ref: a });
}
function _1(e, r, t, n) {
  var a = { workbookViewId: "0" };
  return (((n || {}).Workbook || {}).Views || [])[0] && (a.rightToLeft = n.Workbook.Views[0].RTL ? "1" : "0"), te("sheetViews", te("sheetView", null, a), {});
}
function T1(e, r, t, n) {
  if (e.c && t["!comments"].push([r, e.c]), e.v === void 0 && typeof e.f != "string" || e.t === "z" && !e.f) return "";
  var a = "", i = e.t, s = e.v;
  if (e.t !== "z") switch (e.t) {
    case "b":
      a = e.v ? "1" : "0";
      break;
    case "n":
      a = "" + e.v;
      break;
    case "e":
      a = kn[e.v];
      break;
    case "d":
      n && n.cellDates ? a = Tt(e.v, -1).toISOString() : (e = yt(e), e.t = "n", a = "" + (e.v = At(Tt(e.v)))), typeof e.z > "u" && (e.z = Je[14]);
      break;
    default:
      a = e.v;
      break;
  }
  var l = ut("v", be(a)), f = { r }, o = gr(n.cellXfs, e, n);
  switch (o !== 0 && (f.s = o), e.t) {
    case "n":
      break;
    case "d":
      f.t = "d";
      break;
    case "b":
      f.t = "b";
      break;
    case "e":
      f.t = "e";
      break;
    case "z":
      break;
    default:
      if (e.v == null) {
        delete e.t;
        break;
      }
      if (e.v.length > 32767) throw new Error("Text length must not exceed 32767 characters");
      if (n && n.bookSST) {
        l = ut("v", "" + n0(n.Strings, e.v, n.revStrings)), f.t = "s";
        break;
      }
      f.t = "str";
      break;
  }
  if (e.t != i && (e.t = i, e.v = s), typeof e.f == "string" && e.f) {
    var c = e.F && e.F.slice(0, r.length) == r ? { t: "array", ref: e.F } : null;
    l = te("f", be(e.f), c) + (e.v != null ? l : "");
  }
  return e.l && t["!links"].push([r, e.l]), e.D && (f.cm = 1), te("c", l, f);
}
function E1(e, r, t, n) {
  var a = [], i = [], s = He(e["!ref"]), l = "", f, o = "", c = [], x = 0, p = 0, v = e["!rows"], T = Array.isArray(e), u = { r: o }, h, y = -1;
  for (p = s.s.c; p <= s.e.c; ++p) c[p] = vt(p);
  for (x = s.s.r; x <= s.e.r; ++x) {
    for (i = [], o = ht(x), p = s.s.c; p <= s.e.c; ++p) {
      f = c[p] + o;
      var C = T ? (e[x] || [])[p] : e[f];
      C !== void 0 && (l = T1(C, f, e, r)) != null && i.push(l);
    }
    (i.length > 0 || v && v[x]) && (u = { r: o }, v && v[x] && (h = v[x], h.hidden && (u.hidden = 1), y = -1, h.hpx ? y = ta(h.hpx) : h.hpt && (y = h.hpt), y > -1 && (u.ht = y, u.customHeight = 1), h.level && (u.outlineLevel = h.level)), a[a.length] = te("row", i.join(""), u));
  }
  if (v) for (; x < v.length; ++x)
    v && v[x] && (u = { r: x + 1 }, h = v[x], h.hidden && (u.hidden = 1), y = -1, h.hpx ? y = ta(h.hpx) : h.hpt && (y = h.hpt), y > -1 && (u.ht = y, u.customHeight = 1), h.level && (u.outlineLevel = h.level), a[a.length] = te("row", "", u));
  return a.join("");
}
function ws(e, r, t, n) {
  var a = [et, te("worksheet", null, {
    xmlns: Jr[0],
    "xmlns:r": at.r
  })], i = t.SheetNames[e], s = 0, l = "", f = t.Sheets[i];
  f == null && (f = {});
  var o = f["!ref"] || "A1", c = He(o);
  if (c.e.c > 16383 || c.e.r > 1048575) {
    if (r.WTF) throw new Error("Range " + o + " exceeds format limit A1:XFD1048576");
    c.e.c = Math.min(c.e.c, 16383), c.e.r = Math.min(c.e.c, 1048575), o = Qe(c);
  }
  n || (n = {}), f["!comments"] = [];
  var x = [];
  h1(f, t, e, r, a), a[a.length] = te("dimension", null, { ref: o }), a[a.length] = _1(f, r, e, t), r.sheetFormat && (a[a.length] = te("sheetFormatPr", null, {
    defaultRowHeight: r.sheetFormat.defaultRowHeight || "16",
    baseColWidth: r.sheetFormat.baseColWidth || "10",
    outlineLevelRow: r.sheetFormat.outlineLevelRow || "7"
  })), f["!cols"] != null && f["!cols"].length > 0 && (a[a.length] = m1(f, f["!cols"])), a[s = a.length] = "<sheetData/>", f["!links"] = [], f["!ref"] != null && (l = E1(f, r), l.length > 0 && (a[a.length] = l)), a.length > s + 1 && (a[a.length] = "</sheetData>", a[s] = a[s].replace("/>", ">")), f["!protect"] && (a[a.length] = v1(f["!protect"])), f["!autofilter"] != null && (a[a.length] = g1(f["!autofilter"], f, t, e)), f["!merges"] != null && f["!merges"].length > 0 && (a[a.length] = u1(f["!merges"]));
  var p = -1, v, T = -1;
  return (
    /*::(*/
    f["!links"].length > 0 && (a[a.length] = "<hyperlinks>", f["!links"].forEach(function(u) {
      u[1].Target && (v = { ref: u[0] }, u[1].Target.charAt(0) != "#" && (T = Be(n, -1, be(u[1].Target).replace(/#.*$/, ""), Re.HLINK), v["r:id"] = "rId" + T), (p = u[1].Target.indexOf("#")) > -1 && (v.location = be(u[1].Target.slice(p + 1))), u[1].Tooltip && (v.tooltip = be(u[1].Tooltip)), a[a.length] = te("hyperlink", null, v));
    }), a[a.length] = "</hyperlinks>"), delete f["!links"], f["!margins"] != null && (a[a.length] = p1(f["!margins"])), (!r || r.ignoreEC || r.ignoreEC == null) && (a[a.length] = ut("ignoredErrors", te("ignoredError", null, { numberStoredAsText: 1, sqref: o }))), x.length > 0 && (T = Be(n, -1, "../drawings/drawing" + (e + 1) + ".xml", Re.DRAW), a[a.length] = te("drawing", null, { "r:id": "rId" + T }), f["!drawing"] = x), f["!comments"].length > 0 && (T = Be(n, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", Re.VML), a[a.length] = te("legacyDrawing", null, { "r:id": "rId" + T }), f["!legacy"] = T), a.length > 1 && (a[a.length] = "</worksheet>", a[1] = a[1].replace("/>", ">")), a.join("")
  );
}
function w1(e, r) {
  var t = {}, n = e.l + r;
  t.r = e.read_shift(4), e.l += 4;
  var a = e.read_shift(2);
  e.l += 1;
  var i = e.read_shift(1);
  return e.l = n, i & 7 && (t.level = i & 7), i & 16 && (t.hidden = !0), i & 32 && (t.hpt = a / 20), t;
}
function S1(e, r, t) {
  var n = U(145), a = (t["!rows"] || [])[e] || {};
  n.write_shift(4, e), n.write_shift(4, 0);
  var i = 320;
  a.hpx ? i = ta(a.hpx) * 20 : a.hpt && (i = a.hpt * 20), n.write_shift(2, i), n.write_shift(1, 0);
  var s = 0;
  a.level && (s |= a.level), a.hidden && (s |= 16), (a.hpx || a.hpt) && (s |= 32), n.write_shift(1, s), n.write_shift(1, 0);
  var l = 0, f = n.l;
  n.l += 4;
  for (var o = { r: e, c: 0 }, c = 0; c < 16; ++c)
    if (!(r.s.c > c + 1 << 10 || r.e.c < c << 10)) {
      for (var x = -1, p = -1, v = c << 10; v < c + 1 << 10; ++v) {
        o.c = v;
        var T = Array.isArray(t) ? (t[o.r] || [])[o.c] : t[Ue(o)];
        T && (x < 0 && (x = v), p = v);
      }
      x < 0 || (++l, n.write_shift(4, x), n.write_shift(4, p));
    }
  var u = n.l;
  return n.l = f, n.write_shift(4, l), n.l = u, n.length > n.l ? n.slice(0, n.l) : n;
}
function A1(e, r, t, n) {
  var a = S1(n, t, r);
  (a.length > 17 || (r["!rows"] || [])[n]) && j(e, 0, a);
}
var y1 = Pr, F1 = qr;
function k1() {
}
function C1(e, r) {
  var t = {}, n = e[e.l];
  return ++e.l, t.above = !(n & 64), t.left = !(n & 128), e.l += 18, t.name = Bf(e), t;
}
function D1(e, r, t) {
  t == null && (t = U(84 + 4 * e.length));
  var n = 192;
  r && (r.above && (n &= -65), r.left && (n &= -129)), t.write_shift(1, n);
  for (var a = 1; a < 3; ++a) t.write_shift(1, 0);
  return Zn({ auto: 1 }, t), t.write_shift(-4, -1), t.write_shift(-4, -1), Bi(e, t), t.slice(0, t.l);
}
function O1(e) {
  var r = Mt(e);
  return [r];
}
function I1(e, r, t) {
  return t == null && (t = U(8)), Ir(r, t);
}
function R1(e) {
  var r = Rr(e);
  return [r];
}
function N1(e, r, t) {
  return t == null && (t = U(4)), Nr(r, t);
}
function P1(e) {
  var r = Mt(e), t = e.read_shift(1);
  return [r, t, "b"];
}
function L1(e, r, t) {
  return t == null && (t = U(9)), Ir(r, t), t.write_shift(1, e.v ? 1 : 0), t;
}
function M1(e) {
  var r = Rr(e), t = e.read_shift(1);
  return [r, t, "b"];
}
function B1(e, r, t) {
  return t == null && (t = U(5)), Nr(r, t), t.write_shift(1, e.v ? 1 : 0), t;
}
function b1(e) {
  var r = Mt(e), t = e.read_shift(1);
  return [r, t, "e"];
}
function U1(e, r, t) {
  return t == null && (t = U(9)), Ir(r, t), t.write_shift(1, e.v), t;
}
function W1(e) {
  var r = Rr(e), t = e.read_shift(1);
  return [r, t, "e"];
}
function $1(e, r, t) {
  return t == null && (t = U(8)), Nr(r, t), t.write_shift(1, e.v), t.write_shift(2, 0), t.write_shift(1, 0), t;
}
function V1(e) {
  var r = Mt(e), t = e.read_shift(4);
  return [r, t, "s"];
}
function H1(e, r, t) {
  return t == null && (t = U(12)), Ir(r, t), t.write_shift(4, r.v), t;
}
function G1(e) {
  var r = Rr(e), t = e.read_shift(4);
  return [r, t, "s"];
}
function j1(e, r, t) {
  return t == null && (t = U(8)), Nr(r, t), t.write_shift(4, r.v), t;
}
function X1(e) {
  var r = Mt(e), t = Qr(e);
  return [r, t, "n"];
}
function z1(e, r, t) {
  return t == null && (t = U(16)), Ir(r, t), Cr(e.v, t), t;
}
function Y1(e) {
  var r = Rr(e), t = Qr(e);
  return [r, t, "n"];
}
function K1(e, r, t) {
  return t == null && (t = U(12)), Nr(r, t), Cr(e.v, t), t;
}
function J1(e) {
  var r = Mt(e), t = bi(e);
  return [r, t, "n"];
}
function Z1(e, r, t) {
  return t == null && (t = U(12)), Ir(r, t), Ui(e.v, t), t;
}
function q1(e) {
  var r = Rr(e), t = bi(e);
  return [r, t, "n"];
}
function Q1(e, r, t) {
  return t == null && (t = U(8)), Nr(r, t), Ui(e.v, t), t;
}
function eh(e) {
  var r = Mt(e), t = Ka(e);
  return [r, t, "is"];
}
function th(e) {
  var r = Mt(e), t = pt(e);
  return [r, t, "str"];
}
function rh(e, r, t) {
  return t == null && (t = U(12 + 4 * e.v.length)), Ir(r, t), st(e.v, t), t.length > t.l ? t.slice(0, t.l) : t;
}
function nh(e) {
  var r = Rr(e), t = pt(e);
  return [r, t, "str"];
}
function ah(e, r, t) {
  return t == null && (t = U(8 + 4 * e.v.length)), Nr(r, t), st(e.v, t), t.length > t.l ? t.slice(0, t.l) : t;
}
function ih(e, r, t) {
  var n = e.l + r, a = Mt(e);
  a.r = t["!row"];
  var i = e.read_shift(1), s = [a, i, "b"];
  if (t.cellFormula) {
    e.l += 2;
    var l = ca(e, n - e.l, t);
    s[3] = Yr(l, null, a, t.supbooks, t);
  } else e.l = n;
  return s;
}
function sh(e, r, t) {
  var n = e.l + r, a = Mt(e);
  a.r = t["!row"];
  var i = e.read_shift(1), s = [a, i, "e"];
  if (t.cellFormula) {
    e.l += 2;
    var l = ca(e, n - e.l, t);
    s[3] = Yr(l, null, a, t.supbooks, t);
  } else e.l = n;
  return s;
}
function lh(e, r, t) {
  var n = e.l + r, a = Mt(e);
  a.r = t["!row"];
  var i = Qr(e), s = [a, i, "n"];
  if (t.cellFormula) {
    e.l += 2;
    var l = ca(e, n - e.l, t);
    s[3] = Yr(l, null, a, t.supbooks, t);
  } else e.l = n;
  return s;
}
function fh(e, r, t) {
  var n = e.l + r, a = Mt(e);
  a.r = t["!row"];
  var i = pt(e), s = [a, i, "str"];
  if (t.cellFormula) {
    e.l += 2;
    var l = ca(e, n - e.l, t);
    s[3] = Yr(l, null, a, t.supbooks, t);
  } else e.l = n;
  return s;
}
var oh = Pr, ch = qr;
function uh(e, r) {
  return r == null && (r = U(4)), r.write_shift(4, e), r;
}
function hh(e, r) {
  var t = e.l + r, n = Pr(e), a = Ja(e), i = pt(e), s = pt(e), l = pt(e);
  e.l = t;
  var f = { rfx: n, relId: a, loc: i, display: l };
  return s && (f.Tooltip = s), f;
}
function dh(e, r) {
  var t = U(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
  qr({ s: it(e[0]), e: it(e[0]) }, t), Za("rId" + r, t);
  var n = e[1].Target.indexOf("#"), a = n == -1 ? "" : e[1].Target.slice(n + 1);
  return st(a || "", t), st(e[1].Tooltip || "", t), st("", t), t.slice(0, t.l);
}
function xh() {
}
function vh(e, r, t) {
  var n = e.l + r, a = Wi(e), i = e.read_shift(1), s = [a];
  if (s[2] = i, t.cellFormula) {
    var l = n1(e, n - e.l, t);
    s[1] = l;
  } else e.l = n;
  return s;
}
function ph(e, r, t) {
  var n = e.l + r, a = Pr(e), i = [a];
  if (t.cellFormula) {
    var s = i1(e, n - e.l, t);
    i[1] = s, e.l = n;
  } else e.l = n;
  return i;
}
function mh(e, r, t) {
  t == null && (t = U(18));
  var n = ua(e, r);
  t.write_shift(-4, e), t.write_shift(-4, e), t.write_shift(4, (n.width || 10) * 256), t.write_shift(
    4,
    0
    /*ixfe*/
  );
  var a = 0;
  return r.hidden && (a |= 1), typeof n.width == "number" && (a |= 2), r.level && (a |= r.level << 8), t.write_shift(2, a), t;
}
var Ss = ["left", "right", "top", "bottom", "header", "footer"];
function gh(e) {
  var r = {};
  return Ss.forEach(function(t) {
    r[t] = Qr(e);
  }), r;
}
function _h(e, r) {
  return r == null && (r = U(6 * 8)), Es(e), Ss.forEach(function(t) {
    Cr(e[t], r);
  }), r;
}
function Th(e) {
  var r = e.read_shift(2);
  return e.l += 28, { RTL: r & 32 };
}
function Eh(e, r, t) {
  t == null && (t = U(30));
  var n = 924;
  return (((r || {}).Views || [])[0] || {}).RTL && (n |= 32), t.write_shift(2, n), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(2, 0), t.write_shift(2, 100), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(4, 0), t;
}
function wh(e) {
  var r = U(24);
  return r.write_shift(4, 4), r.write_shift(4, 1), qr(e, r), r;
}
function Sh(e, r) {
  return r == null && (r = U(16 * 4 + 2)), r.write_shift(2, e.password ? as(e.password) : 0), r.write_shift(4, 1), [
    ["objects", !1],
    // fObjects
    ["scenarios", !1],
    // fScenarios
    ["formatCells", !0],
    // fFormatCells
    ["formatColumns", !0],
    // fFormatColumns
    ["formatRows", !0],
    // fFormatRows
    ["insertColumns", !0],
    // fInsertColumns
    ["insertRows", !0],
    // fInsertRows
    ["insertHyperlinks", !0],
    // fInsertHyperlinks
    ["deleteColumns", !0],
    // fDeleteColumns
    ["deleteRows", !0],
    // fDeleteRows
    ["selectLockedCells", !1],
    // fSelLockedCells
    ["sort", !0],
    // fSort
    ["autoFilter", !0],
    // fAutoFilter
    ["pivotTables", !0],
    // fPivotTables
    ["selectUnlockedCells", !1]
    // fSelUnlockedCells
  ].forEach(function(t) {
    t[1] ? r.write_shift(4, e[t[0]] != null && !e[t[0]] ? 1 : 0) : r.write_shift(4, e[t[0]] != null && e[t[0]] ? 0 : 1);
  }), r;
}
function Ah() {
}
function yh() {
}
function Fh(e, r, t, n, a, i, s) {
  if (r.v === void 0) return !1;
  var l = "";
  switch (r.t) {
    case "b":
      l = r.v ? "1" : "0";
      break;
    case "d":
      r = yt(r), r.z = r.z || Je[14], r.v = At(Tt(r.v)), r.t = "n";
      break;
    case "n":
    case "e":
      l = "" + r.v;
      break;
    default:
      l = r.v;
      break;
  }
  var f = { r: t, c: n };
  switch (f.s = gr(a.cellXfs, r, a), r.l && i["!links"].push([Ue(f), r.l]), r.c && i["!comments"].push([Ue(f), r.c]), r.t) {
    case "s":
    case "str":
      return a.bookSST ? (l = n0(a.Strings, r.v, a.revStrings), f.t = "s", f.v = l, s ? j(e, 18, j1(r, f)) : j(e, 7, H1(r, f))) : (f.t = "str", s ? j(e, 17, ah(r, f)) : j(e, 6, rh(r, f))), !0;
    case "n":
      return r.v == (r.v | 0) && r.v > -1e3 && r.v < 1e3 ? s ? j(e, 13, Q1(r, f)) : j(e, 2, Z1(r, f)) : s ? j(e, 16, K1(r, f)) : j(e, 5, z1(r, f)), !0;
    case "b":
      return f.t = "b", s ? j(e, 15, B1(r, f)) : j(e, 4, L1(r, f)), !0;
    case "e":
      return f.t = "e", s ? j(e, 14, $1(r, f)) : j(e, 3, U1(r, f)), !0;
  }
  return s ? j(e, 12, N1(r, f)) : j(e, 1, I1(r, f)), !0;
}
function kh(e, r, t, n) {
  var a = He(r["!ref"] || "A1"), i, s = "", l = [];
  j(
    e,
    145
    /* BrtBeginSheetData */
  );
  var f = Array.isArray(r), o = a.e.r;
  r["!rows"] && (o = Math.max(a.e.r, r["!rows"].length - 1));
  for (var c = a.s.r; c <= o; ++c) {
    s = ht(c), A1(e, r, a, c);
    var x = !1;
    if (c <= a.e.r) for (var p = a.s.c; p <= a.e.c; ++p) {
      c === a.s.r && (l[p] = vt(p)), i = l[p] + s;
      var v = f ? (r[c] || [])[p] : r[i];
      if (!v) {
        x = !1;
        continue;
      }
      x = Fh(e, v, c, p, n, r, x);
    }
  }
  j(
    e,
    146
    /* BrtEndSheetData */
  );
}
function Ch(e, r) {
  !r || !r["!merges"] || (j(e, 177, uh(r["!merges"].length)), r["!merges"].forEach(function(t) {
    j(e, 176, ch(t));
  }), j(
    e,
    178
    /* BrtEndMergeCells */
  ));
}
function Dh(e, r) {
  !r || !r["!cols"] || (j(
    e,
    390
    /* BrtBeginColInfos */
  ), r["!cols"].forEach(function(t, n) {
    t && j(e, 60, mh(n, t));
  }), j(
    e,
    391
    /* BrtEndColInfos */
  ));
}
function Oh(e, r) {
  !r || !r["!ref"] || (j(
    e,
    648
    /* BrtBeginCellIgnoreECs */
  ), j(e, 649, wh(He(r["!ref"]))), j(
    e,
    650
    /* BrtEndCellIgnoreECs */
  ));
}
function Ih(e, r, t) {
  r["!links"].forEach(function(n) {
    if (n[1].Target) {
      var a = Be(t, -1, n[1].Target.replace(/#.*$/, ""), Re.HLINK);
      j(e, 494, dh(n, a));
    }
  }), delete r["!links"];
}
function Rh(e, r, t, n) {
  if (r["!comments"].length > 0) {
    var a = Be(n, -1, "../drawings/vmlDrawing" + (t + 1) + ".vml", Re.VML);
    j(e, 551, Za("rId" + a)), r["!legacy"] = a;
  }
}
function Nh(e, r, t, n) {
  if (r["!autofilter"]) {
    var a = r["!autofilter"], i = typeof a.ref == "string" ? a.ref : Qe(a.ref);
    t.Workbook || (t.Workbook = { Sheets: [] }), t.Workbook.Names || (t.Workbook.Names = []);
    var s = t.Workbook.Names, l = Rt(i);
    l.s.r == l.e.r && (l.e.r = Rt(r["!ref"]).e.r, i = Qe(l));
    for (var f = 0; f < s.length; ++f) {
      var o = s[f];
      if (o.Name == "_xlnm._FilterDatabase" && o.Sheet == n) {
        o.Ref = "'" + t.SheetNames[n] + "'!" + i;
        break;
      }
    }
    f == s.length && s.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + t.SheetNames[n] + "'!" + i }), j(e, 161, qr(He(i))), j(
      e,
      162
      /* BrtEndAFilter */
    );
  }
}
function Ph(e, r, t) {
  j(
    e,
    133
    /* BrtBeginWsViews */
  ), j(e, 137, Eh(r, t)), j(
    e,
    138
    /* BrtEndWsView */
  ), j(
    e,
    134
    /* BrtEndWsViews */
  );
}
function Lh(e, r) {
  r["!protect"] && j(e, 535, Sh(r["!protect"]));
}
function Mh(e, r, t, n) {
  var a = St(), i = t.SheetNames[e], s = t.Sheets[i] || {}, l = i;
  try {
    t && t.Workbook && (l = t.Workbook.Sheets[e].CodeName || l);
  } catch {
  }
  var f = He(s["!ref"] || "A1");
  if (f.e.c > 16383 || f.e.r > 1048575) {
    if (r.WTF) throw new Error("Range " + (s["!ref"] || "A1") + " exceeds format limit A1:XFD1048576");
    f.e.c = Math.min(f.e.c, 16383), f.e.r = Math.min(f.e.c, 1048575);
  }
  return s["!links"] = [], s["!comments"] = [], j(
    a,
    129
    /* BrtBeginSheet */
  ), (t.vbaraw || s["!outline"]) && j(a, 147, D1(l, s["!outline"])), j(a, 148, F1(f)), Ph(a, s, t.Workbook), Dh(a, s), kh(a, s, e, r), Lh(a, s), Nh(a, s, t, e), Ch(a, s), Ih(a, s, n), s["!margins"] && j(a, 476, _h(s["!margins"])), (!r || r.ignoreEC || r.ignoreEC == null) && Oh(a, s), Rh(a, s, e, n), j(
    a,
    130
    /* BrtEndSheet */
  ), a.end();
}
function Bh(e, r) {
  e.l += 10;
  var t = pt(e);
  return { name: t };
}
var bh = [
  ["allowRefreshQuery", !1, "bool"],
  ["autoCompressPictures", !0, "bool"],
  ["backupFile", !1, "bool"],
  ["checkCompatibility", !1, "bool"],
  ["CodeName", ""],
  ["date1904", !1, "bool"],
  ["defaultThemeVersion", 0, "int"],
  ["filterPrivacy", !1, "bool"],
  ["hidePivotFieldList", !1, "bool"],
  ["promptedSolutions", !1, "bool"],
  ["publishItems", !1, "bool"],
  ["refreshAllConnections", !1, "bool"],
  ["saveExternalLinkValues", !0, "bool"],
  ["showBorderUnselectedTables", !0, "bool"],
  ["showInkAnnotation", !0, "bool"],
  ["showObjects", "all"],
  ["showPivotChartFilter", !1, "bool"],
  ["updateLinks", "userSet"]
];
function Uh(e) {
  return !e.Workbook || !e.Workbook.WBProps ? "false" : vf(e.Workbook.WBProps.date1904) ? "true" : "false";
}
var Wh = /* @__PURE__ */ "][*?/\\".split("");
function As(e, r) {
  if (e.length > 31)
    throw new Error("Sheet names cannot exceed 31 chars");
  var t = !0;
  return Wh.forEach(function(n) {
    if (e.indexOf(n) != -1)
      throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
  }), t;
}
function $h(e, r, t) {
  e.forEach(function(n, a) {
    As(n);
    for (var i = 0; i < a; ++i) if (n == e[i]) throw new Error("Duplicate Sheet Name: " + n);
    if (t) {
      var s = r && r[a] && r[a].CodeName || n;
      if (s.charCodeAt(0) == 95 && s.length > 22) throw new Error("Bad Code Name: Worksheet" + s);
    }
  });
}
function Vh(e) {
  if (!e || !e.SheetNames || !e.Sheets) throw new Error("Invalid Workbook");
  if (!e.SheetNames.length) throw new Error("Workbook is empty");
  var r = e.Workbook && e.Workbook.Sheets || [];
  $h(e.SheetNames, r, !!e.vbaraw);
  for (var t = 0; t < e.SheetNames.length; ++t) c1(e.Sheets[e.SheetNames[t]], e.SheetNames[t], t);
}
function ys(e) {
  var r = [et];
  r[r.length] = te("workbook", null, {
    xmlns: Jr[0],
    //'xmlns:mx': XMLNS.mx,
    //'xmlns:s': XMLNS_main[0],
    "xmlns:r": at.r
  });
  var t = e.Workbook && (e.Workbook.Names || []).length > 0, n = { codeName: "ThisWorkbook" };
  e.Workbook && e.Workbook.WBProps && (bh.forEach(function(l) {
    e.Workbook.WBProps[l[0]] != null && e.Workbook.WBProps[l[0]] != l[1] && (n[l[0]] = e.Workbook.WBProps[l[0]]);
  }), e.Workbook.WBProps.CodeName && (n.codeName = e.Workbook.WBProps.CodeName, delete n.CodeName)), r[r.length] = te("workbookPr", null, n);
  var a = e.Workbook && e.Workbook.Sheets || [], i = 0;
  if (a && a[0] && a[0].Hidden) {
    for (r[r.length] = "<bookViews>", i = 0; i != e.SheetNames.length && !(!a[i] || !a[i].Hidden); ++i)
      ;
    i == e.SheetNames.length && (i = 0), r[r.length] = '<workbookView firstSheet="' + i + '" activeTab="' + i + '"/>', r[r.length] = "</bookViews>";
  }
  for (r[r.length] = "<sheets>", i = 0; i != e.SheetNames.length; ++i) {
    var s = { name: be(e.SheetNames[i].slice(0, 31)) };
    if (s.sheetId = "" + (i + 1), s["r:id"] = "rId" + (i + 1), a[i]) switch (a[i].Hidden) {
      case 1:
        s.state = "hidden";
        break;
      case 2:
        s.state = "veryHidden";
        break;
    }
    r[r.length] = te("sheet", null, s);
  }
  return r[r.length] = "</sheets>", t && (r[r.length] = "<definedNames>", e.Workbook && e.Workbook.Names && e.Workbook.Names.forEach(function(l) {
    var f = { name: l.Name };
    l.Comment && (f.comment = l.Comment), l.Sheet != null && (f.localSheetId = "" + l.Sheet), l.Hidden && (f.hidden = "1"), l.Ref && (r[r.length] = te("definedName", be(l.Ref), f));
  }), r[r.length] = "</definedNames>"), r.length > 2 && (r[r.length] = "</workbook>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Hh(e, r) {
  var t = {};
  return t.Hidden = e.read_shift(4), t.iTabID = e.read_shift(4), t.strRelID = La(e), t.name = pt(e), t;
}
function Gh(e, r) {
  return r || (r = U(127)), r.write_shift(4, e.Hidden), r.write_shift(4, e.iTabID), Za(e.strRelID, r), st(e.name.slice(0, 31), r), r.length > r.l ? r.slice(0, r.l) : r;
}
function jh(e, r) {
  var t = {}, n = e.read_shift(4);
  t.defaultThemeVersion = e.read_shift(4);
  var a = r > 8 ? pt(e) : "";
  return a.length > 0 && (t.CodeName = a), t.autoCompressPictures = !!(n & 65536), t.backupFile = !!(n & 64), t.checkCompatibility = !!(n & 4096), t.date1904 = !!(n & 1), t.filterPrivacy = !!(n & 8), t.hidePivotFieldList = !!(n & 1024), t.promptedSolutions = !!(n & 16), t.publishItems = !!(n & 2048), t.refreshAllConnections = !!(n & 262144), t.saveExternalLinkValues = !!(n & 128), t.showBorderUnselectedTables = !!(n & 4), t.showInkAnnotation = !!(n & 32), t.showObjects = ["all", "placeholders", "none"][n >> 13 & 3], t.showPivotChartFilter = !!(n & 32768), t.updateLinks = ["userSet", "never", "always"][n >> 8 & 3], t;
}
function Xh(e, r) {
  r || (r = U(72));
  var t = 0;
  return e && e.filterPrivacy && (t |= 8), r.write_shift(4, t), r.write_shift(4, 0), Bi(e && e.CodeName || "ThisWorkbook", r), r.slice(0, r.l);
}
function zh(e, r, t) {
  var n = e.l + r;
  e.l += 4, e.l += 1;
  var a = e.read_shift(4), i = bf(e), s = a1(e, 0, t), l = Ja(e);
  e.l = n;
  var f = { Name: i, Ptg: s };
  return a < 268435455 && (f.Sheet = a), l && (f.Comment = l), f;
}
function Yh(e, r) {
  j(
    e,
    143
    /* BrtBeginBundleShs */
  );
  for (var t = 0; t != r.SheetNames.length; ++t) {
    var n = r.Workbook && r.Workbook.Sheets && r.Workbook.Sheets[t] && r.Workbook.Sheets[t].Hidden || 0, a = { Hidden: n, iTabID: t + 1, strRelID: "rId" + (t + 1), name: r.SheetNames[t] };
    j(e, 156, Gh(a));
  }
  j(
    e,
    144
    /* BrtEndBundleShs */
  );
}
function Kh(e, r) {
  r || (r = U(127));
  for (var t = 0; t != 4; ++t) r.write_shift(4, 0);
  return st("SheetJS", r), st(Hn.version, r), st(Hn.version, r), st("7262", r), r.length > r.l ? r.slice(0, r.l) : r;
}
function Jh(e, r) {
  r || (r = U(29)), r.write_shift(-4, 0), r.write_shift(-4, 460), r.write_shift(4, 28800), r.write_shift(4, 17600), r.write_shift(4, 500), r.write_shift(4, e), r.write_shift(4, e);
  var t = 120;
  return r.write_shift(1, t), r.length > r.l ? r.slice(0, r.l) : r;
}
function Zh(e, r) {
  if (!(!r.Workbook || !r.Workbook.Sheets)) {
    for (var t = r.Workbook.Sheets, n = 0, a = -1, i = -1; n < t.length; ++n)
      !t[n] || !t[n].Hidden && a == -1 ? a = n : t[n].Hidden == 1 && i == -1 && (i = n);
    i > a || (j(
      e,
      135
      /* BrtBeginBookViews */
    ), j(e, 158, Jh(a)), j(
      e,
      136
      /* BrtEndBookViews */
    ));
  }
}
function qh(e, r) {
  var t = St();
  return j(
    t,
    131
    /* BrtBeginBook */
  ), j(t, 128, Kh()), j(t, 153, Xh(e.Workbook && e.Workbook.WBProps || null)), Zh(t, e), Yh(t, e), j(
    t,
    132
    /* BrtEndBook */
  ), t.end();
}
function Qh(e, r, t) {
  return (r.slice(-4) === ".bin" ? qh : ys)(e);
}
function ed(e, r, t, n, a) {
  return (r.slice(-4) === ".bin" ? Mh : ws)(e, t, n, a);
}
function td(e, r, t) {
  return (r.slice(-4) === ".bin" ? _c : ls)(e, t);
}
function rd(e, r, t) {
  return (r.slice(-4) === ".bin" ? Xo : ns)(e, t);
}
function nd(e, r, t) {
  return (r.slice(-4) === ".bin" ? Lc : hs)(e);
}
function ad(e) {
  return (e.slice(-4) === ".bin" ? kc : cs)();
}
function id(e, r) {
  var t = [];
  return e.Props && t.push(eo(e.Props, r)), e.Custprops && t.push(to(e.Props, e.Custprops)), t.join("");
}
function sd() {
  return "";
}
function ld(e, r) {
  var t = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
  return r.cellXfs.forEach(function(n, a) {
    var i = [];
    i.push(te("NumberFormat", null, { "ss:Format": be(Je[n.numFmtId]) }));
    var s = (
      /*::(*/
      { "ss:ID": "s" + (21 + a) }
    );
    t.push(te("Style", i.join(""), s));
  }), te("Styles", t.join(""));
}
function Fs(e) {
  return te("NamedRange", null, { "ss:Name": e.Name, "ss:RefersTo": "=" + t0(e.Ref, { r: 0, c: 0 }) });
}
function fd(e) {
  if (!((e || {}).Workbook || {}).Names) return "";
  for (var r = e.Workbook.Names, t = [], n = 0; n < r.length; ++n) {
    var a = r[n];
    a.Sheet == null && (a.Name.match(/^_xlfn\./) || t.push(Fs(a)));
  }
  return te("Names", t.join(""));
}
function od(e, r, t, n) {
  if (!e || !((n || {}).Workbook || {}).Names) return "";
  for (var a = n.Workbook.Names, i = [], s = 0; s < a.length; ++s) {
    var l = a[s];
    l.Sheet == t && (l.Name.match(/^_xlfn\./) || i.push(Fs(l)));
  }
  return i.join("");
}
function cd(e, r, t, n) {
  if (!e) return "";
  var a = [];
  if (e["!margins"] && (a.push("<PageSetup>"), e["!margins"].header && a.push(te("Header", null, { "x:Margin": e["!margins"].header })), e["!margins"].footer && a.push(te("Footer", null, { "x:Margin": e["!margins"].footer })), a.push(te("PageMargins", null, {
    "x:Bottom": e["!margins"].bottom || "0.75",
    "x:Left": e["!margins"].left || "0.7",
    "x:Right": e["!margins"].right || "0.7",
    "x:Top": e["!margins"].top || "0.75"
  })), a.push("</PageSetup>")), n && n.Workbook && n.Workbook.Sheets && n.Workbook.Sheets[t])
    if (n.Workbook.Sheets[t].Hidden) a.push(te("Visible", n.Workbook.Sheets[t].Hidden == 1 ? "SheetHidden" : "SheetVeryHidden", {}));
    else {
      for (var i = 0; i < t && !(n.Workbook.Sheets[i] && !n.Workbook.Sheets[i].Hidden); ++i) ;
      i == t && a.push("<Selected/>");
    }
  return ((((n || {}).Workbook || {}).Views || [])[0] || {}).RTL && a.push("<DisplayRightToLeft/>"), e["!protect"] && (a.push(ut("ProtectContents", "True")), e["!protect"].objects && a.push(ut("ProtectObjects", "True")), e["!protect"].scenarios && a.push(ut("ProtectScenarios", "True")), e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells ? a.push(ut("EnableSelection", "NoSelection")) : e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells && a.push(ut("EnableSelection", "UnlockedCells")), [
    ["formatCells", "AllowFormatCells"],
    ["formatColumns", "AllowSizeCols"],
    ["formatRows", "AllowSizeRows"],
    ["insertColumns", "AllowInsertCols"],
    ["insertRows", "AllowInsertRows"],
    ["insertHyperlinks", "AllowInsertHyperlinks"],
    ["deleteColumns", "AllowDeleteCols"],
    ["deleteRows", "AllowDeleteRows"],
    ["sort", "AllowSort"],
    ["autoFilter", "AllowFilter"],
    ["pivotTables", "AllowUsePivotTables"]
  ].forEach(function(s) {
    e["!protect"][s[0]] && a.push("<" + s[1] + "/>");
  })), a.length == 0 ? "" : te("WorksheetOptions", a.join(""), { xmlns: Ot.x });
}
function ud(e) {
  return e.map(function(r) {
    var t = xf(r.t || ""), n = te("ss:Data", t, { xmlns: "http://www.w3.org/TR/REC-html40" });
    return te("Comment", n, { "ss:Author": r.a });
  }).join("");
}
function hd(e, r, t, n, a, i, s) {
  if (!e || e.v == null && e.f == null) return "";
  var l = {};
  if (e.f && (l["ss:Formula"] = "=" + be(t0(e.f, s))), e.F && e.F.slice(0, r.length) == r) {
    var f = it(e.F.slice(r.length + 1));
    l["ss:ArrayRange"] = "RC:R" + (f.r == s.r ? "" : "[" + (f.r - s.r) + "]") + "C" + (f.c == s.c ? "" : "[" + (f.c - s.c) + "]");
  }
  if (e.l && e.l.Target && (l["ss:HRef"] = be(e.l.Target), e.l.Tooltip && (l["x:HRefScreenTip"] = be(e.l.Tooltip))), t["!merges"])
    for (var o = t["!merges"], c = 0; c != o.length; ++c)
      o[c].s.c != s.c || o[c].s.r != s.r || (o[c].e.c > o[c].s.c && (l["ss:MergeAcross"] = o[c].e.c - o[c].s.c), o[c].e.r > o[c].s.r && (l["ss:MergeDown"] = o[c].e.r - o[c].s.r));
  var x = "", p = "";
  switch (e.t) {
    case "z":
      if (!n.sheetStubs) return "";
      break;
    case "n":
      x = "Number", p = String(e.v);
      break;
    case "b":
      x = "Boolean", p = e.v ? "1" : "0";
      break;
    case "e":
      x = "Error", p = kn[e.v];
      break;
    case "d":
      x = "DateTime", p = new Date(e.v).toISOString(), e.z == null && (e.z = e.z || Je[14]);
      break;
    case "s":
      x = "String", p = df(e.v || "");
      break;
  }
  var v = gr(n.cellXfs, e, n);
  l["ss:StyleID"] = "s" + (21 + v), l["ss:Index"] = s.c + 1;
  var T = e.v != null ? p : "", u = e.t == "z" ? "" : '<Data ss:Type="' + x + '">' + T + "</Data>";
  return (e.c || []).length > 0 && (u += ud(e.c)), te("Cell", u, l);
}
function dd(e, r) {
  var t = '<Row ss:Index="' + (e + 1) + '"';
  return r && (r.hpt && !r.hpx && (r.hpx = ss(r.hpt)), r.hpx && (t += ' ss:AutoFitHeight="0" ss:Height="' + r.hpx + '"'), r.hidden && (t += ' ss:Hidden="1"')), t + ">";
}
function xd(e, r, t, n) {
  if (!e["!ref"]) return "";
  var a = He(e["!ref"]), i = e["!merges"] || [], s = 0, l = [];
  e["!cols"] && e["!cols"].forEach(function(h, y) {
    Qa(h);
    var C = !!h.width, D = ua(y, h), L = { "ss:Index": y + 1 };
    C && (L["ss:Width"] = Qn(D.width)), h.hidden && (L["ss:Hidden"] = "1"), l.push(te("Column", null, L));
  });
  for (var f = Array.isArray(e), o = a.s.r; o <= a.e.r; ++o) {
    for (var c = [dd(o, (e["!rows"] || [])[o])], x = a.s.c; x <= a.e.c; ++x) {
      var p = !1;
      for (s = 0; s != i.length; ++s)
        if (!(i[s].s.c > x) && !(i[s].s.r > o) && !(i[s].e.c < x) && !(i[s].e.r < o)) {
          (i[s].s.c != x || i[s].s.r != o) && (p = !0);
          break;
        }
      if (!p) {
        var v = { r: o, c: x }, T = Ue(v), u = f ? (e[o] || [])[x] : e[T];
        c.push(hd(u, T, e, r, t, n, v));
      }
    }
    c.push("</Row>"), c.length > 2 && l.push(c.join(""));
  }
  return l.join("");
}
function vd(e, r, t) {
  var n = [], a = t.SheetNames[e], i = t.Sheets[a], s = i ? od(i, r, e, t) : "";
  return s.length > 0 && n.push("<Names>" + s + "</Names>"), s = i ? xd(i, r, e, t) : "", s.length > 0 && n.push("<Table>" + s + "</Table>"), n.push(cd(i, r, e, t)), n.join("");
}
function pd(e, r) {
  r || (r = {}), e.SSF || (e.SSF = yt(Je)), e.SSF && (sa(), ia(e.SSF), r.revssf = la(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF, r.cellXfs = [], gr(r.cellXfs, {}, { revssf: { General: 0 } }));
  var t = [];
  t.push(id(e, r)), t.push(sd()), t.push(""), t.push("");
  for (var n = 0; n < e.SheetNames.length; ++n)
    t.push(te("Worksheet", vd(n, r, e), { "ss:Name": be(e.SheetNames[n]) }));
  return t[2] = ld(e, r), t[3] = fd(e), et + te("Workbook", t.join(""), {
    xmlns: Ot.ss,
    "xmlns:o": Ot.o,
    "xmlns:x": Ot.x,
    "xmlns:ss": Ot.ss,
    "xmlns:dt": Ot.dt,
    "xmlns:html": Ot.html
  });
}
var Fa = {
  SI: "e0859ff2f94f6810ab9108002b27b3d9",
  DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
  UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
};
function md(e, r) {
  var t = [], n = [], a = [], i = 0, s, l = A0(B0, "n"), f = A0(b0, "n");
  if (e.Props)
    for (s = dt(e.Props), i = 0; i < s.length; ++i) (Object.prototype.hasOwnProperty.call(l, s[i]) ? t : Object.prototype.hasOwnProperty.call(f, s[i]) ? n : a).push([s[i], e.Props[s[i]]]);
  if (e.Custprops)
    for (s = dt(e.Custprops), i = 0; i < s.length; ++i) Object.prototype.hasOwnProperty.call(e.Props || {}, s[i]) || (Object.prototype.hasOwnProperty.call(l, s[i]) ? t : Object.prototype.hasOwnProperty.call(f, s[i]) ? n : a).push([s[i], e.Custprops[s[i]]]);
  var o = [];
  for (i = 0; i < a.length; ++i)
    Ji.indexOf(a[i][0]) > -1 || zi.indexOf(a[i][0]) > -1 || a[i][1] != null && o.push(a[i]);
  n.length && $e.utils.cfb_add(r, "/SummaryInformation", H0(n, Fa.SI, f, b0)), (t.length || o.length) && $e.utils.cfb_add(r, "/DocumentSummaryInformation", H0(t, Fa.DSI, l, B0, o.length ? o : null, Fa.UDI));
}
function gd(e, r) {
  var t = r || {}, n = $e.utils.cfb_new({ root: "R" }), a = "/Workbook";
  switch (t.bookType || "xls") {
    case "xls":
      t.bookType = "biff8";
    case "xla":
      t.bookType || (t.bookType = "xla");
    case "biff8":
      a = "/Workbook", t.biff = 8;
      break;
    case "biff5":
      a = "/Book", t.biff = 5;
      break;
    default:
      throw new Error("invalid type " + t.bookType + " for XLS CFB");
  }
  return $e.utils.cfb_add(n, a, ks(e, t)), t.biff == 8 && (e.Props || e.Custprops) && md(e, n), t.biff == 8 && e.vbaraw && Mc(n, $e.read(e.vbaraw, { type: typeof e.vbaraw == "string" ? "binary" : "buffer" })), n;
}
var _d = {
  /*::[*/
  0: {
    /* n:"BrtRowHdr", */
    f: w1
  },
  /*::[*/
  1: {
    /* n:"BrtCellBlank", */
    f: O1
  },
  /*::[*/
  2: {
    /* n:"BrtCellRk", */
    f: J1
  },
  /*::[*/
  3: {
    /* n:"BrtCellError", */
    f: b1
  },
  /*::[*/
  4: {
    /* n:"BrtCellBool", */
    f: P1
  },
  /*::[*/
  5: {
    /* n:"BrtCellReal", */
    f: X1
  },
  /*::[*/
  6: {
    /* n:"BrtCellSt", */
    f: th
  },
  /*::[*/
  7: {
    /* n:"BrtCellIsst", */
    f: V1
  },
  /*::[*/
  8: {
    /* n:"BrtFmlaString", */
    f: fh
  },
  /*::[*/
  9: {
    /* n:"BrtFmlaNum", */
    f: lh
  },
  /*::[*/
  10: {
    /* n:"BrtFmlaBool", */
    f: ih
  },
  /*::[*/
  11: {
    /* n:"BrtFmlaError", */
    f: sh
  },
  /*::[*/
  12: {
    /* n:"BrtShortBlank", */
    f: R1
  },
  /*::[*/
  13: {
    /* n:"BrtShortRk", */
    f: q1
  },
  /*::[*/
  14: {
    /* n:"BrtShortError", */
    f: W1
  },
  /*::[*/
  15: {
    /* n:"BrtShortBool", */
    f: M1
  },
  /*::[*/
  16: {
    /* n:"BrtShortReal", */
    f: Y1
  },
  /*::[*/
  17: {
    /* n:"BrtShortSt", */
    f: nh
  },
  /*::[*/
  18: {
    /* n:"BrtShortIsst", */
    f: G1
  },
  /*::[*/
  19: {
    /* n:"BrtSSTItem", */
    f: Ka
  },
  /*::[*/
  20: {
    /* n:"BrtPCDIMissing" */
  },
  /*::[*/
  21: {
    /* n:"BrtPCDINumber" */
  },
  /*::[*/
  22: {
    /* n:"BrtPCDIBoolean" */
  },
  /*::[*/
  23: {
    /* n:"BrtPCDIError" */
  },
  /*::[*/
  24: {
    /* n:"BrtPCDIString" */
  },
  /*::[*/
  25: {
    /* n:"BrtPCDIDatetime" */
  },
  /*::[*/
  26: {
    /* n:"BrtPCDIIndex" */
  },
  /*::[*/
  27: {
    /* n:"BrtPCDIAMissing" */
  },
  /*::[*/
  28: {
    /* n:"BrtPCDIANumber" */
  },
  /*::[*/
  29: {
    /* n:"BrtPCDIABoolean" */
  },
  /*::[*/
  30: {
    /* n:"BrtPCDIAError" */
  },
  /*::[*/
  31: {
    /* n:"BrtPCDIAString" */
  },
  /*::[*/
  32: {
    /* n:"BrtPCDIADatetime" */
  },
  /*::[*/
  33: {
    /* n:"BrtPCRRecord" */
  },
  /*::[*/
  34: {
    /* n:"BrtPCRRecordDt" */
  },
  /*::[*/
  35: {
    /* n:"BrtFRTBegin", */
    T: 1
  },
  /*::[*/
  36: {
    /* n:"BrtFRTEnd", */
    T: -1
  },
  /*::[*/
  37: {
    /* n:"BrtACBegin", */
    T: 1
  },
  /*::[*/
  38: {
    /* n:"BrtACEnd", */
    T: -1
  },
  /*::[*/
  39: {
    /* n:"BrtName", */
    f: zh
  },
  /*::[*/
  40: {
    /* n:"BrtIndexRowBlock" */
  },
  /*::[*/
  42: {
    /* n:"BrtIndexBlock" */
  },
  /*::[*/
  43: {
    /* n:"BrtFont", */
    f: tc
  },
  /*::[*/
  44: {
    /* n:"BrtFmt", */
    f: Qo
  },
  /*::[*/
  45: {
    /* n:"BrtFill", */
    f: ac
  },
  /*::[*/
  46: {
    /* n:"BrtBorder", */
    f: sc
  },
  /*::[*/
  47: {
    /* n:"BrtXF", */
    f: ic
  },
  /*::[*/
  48: {
    /* n:"BrtStyle" */
  },
  /*::[*/
  49: {
    /* n:"BrtCellMeta", */
    f: If
  },
  /*::[*/
  50: {
    /* n:"BrtValueMeta" */
  },
  /*::[*/
  51: {
    /* n:"BrtMdb" */
    f: wc
  },
  /*::[*/
  52: {
    /* n:"BrtBeginFmd", */
    T: 1
  },
  /*::[*/
  53: {
    /* n:"BrtEndFmd", */
    T: -1
  },
  /*::[*/
  54: {
    /* n:"BrtBeginMdx", */
    T: 1
  },
  /*::[*/
  55: {
    /* n:"BrtEndMdx", */
    T: -1
  },
  /*::[*/
  56: {
    /* n:"BrtBeginMdxTuple", */
    T: 1
  },
  /*::[*/
  57: {
    /* n:"BrtEndMdxTuple", */
    T: -1
  },
  /*::[*/
  58: {
    /* n:"BrtMdxMbrIstr" */
  },
  /*::[*/
  59: {
    /* n:"BrtStr" */
  },
  /*::[*/
  60: {
    /* n:"BrtColInfo", */
    f: No
  },
  /*::[*/
  62: {
    /* n:"BrtCellRString", */
    f: eh
  },
  /*::[*/
  63: {
    /* n:"BrtCalcChainItem$", */
    f: Cc
  },
  /*::[*/
  64: {
    /* n:"BrtDVal", */
    f: Ah
  },
  /*::[*/
  65: {
    /* n:"BrtSxvcellNum" */
  },
  /*::[*/
  66: {
    /* n:"BrtSxvcellStr" */
  },
  /*::[*/
  67: {
    /* n:"BrtSxvcellBool" */
  },
  /*::[*/
  68: {
    /* n:"BrtSxvcellErr" */
  },
  /*::[*/
  69: {
    /* n:"BrtSxvcellDate" */
  },
  /*::[*/
  70: {
    /* n:"BrtSxvcellNil" */
  },
  /*::[*/
  128: {
    /* n:"BrtFileVersion" */
  },
  /*::[*/
  129: {
    /* n:"BrtBeginSheet", */
    T: 1
  },
  /*::[*/
  130: {
    /* n:"BrtEndSheet", */
    T: -1
  },
  /*::[*/
  131: {
    /* n:"BrtBeginBook", */
    T: 1,
    f: Kt,
    p: 0
  },
  /*::[*/
  132: {
    /* n:"BrtEndBook", */
    T: -1
  },
  /*::[*/
  133: {
    /* n:"BrtBeginWsViews", */
    T: 1
  },
  /*::[*/
  134: {
    /* n:"BrtEndWsViews", */
    T: -1
  },
  /*::[*/
  135: {
    /* n:"BrtBeginBookViews", */
    T: 1
  },
  /*::[*/
  136: {
    /* n:"BrtEndBookViews", */
    T: -1
  },
  /*::[*/
  137: {
    /* n:"BrtBeginWsView", */
    T: 1,
    f: Th
  },
  /*::[*/
  138: {
    /* n:"BrtEndWsView", */
    T: -1
  },
  /*::[*/
  139: {
    /* n:"BrtBeginCsViews", */
    T: 1
  },
  /*::[*/
  140: {
    /* n:"BrtEndCsViews", */
    T: -1
  },
  /*::[*/
  141: {
    /* n:"BrtBeginCsView", */
    T: 1
  },
  /*::[*/
  142: {
    /* n:"BrtEndCsView", */
    T: -1
  },
  /*::[*/
  143: {
    /* n:"BrtBeginBundleShs", */
    T: 1
  },
  /*::[*/
  144: {
    /* n:"BrtEndBundleShs", */
    T: -1
  },
  /*::[*/
  145: {
    /* n:"BrtBeginSheetData", */
    T: 1
  },
  /*::[*/
  146: {
    /* n:"BrtEndSheetData", */
    T: -1
  },
  /*::[*/
  147: {
    /* n:"BrtWsProp", */
    f: C1
  },
  /*::[*/
  148: {
    /* n:"BrtWsDim", */
    f: y1,
    p: 16
  },
  /*::[*/
  151: {
    /* n:"BrtPane", */
    f: xh
  },
  /*::[*/
  152: {
    /* n:"BrtSel" */
  },
  /*::[*/
  153: {
    /* n:"BrtWbProp", */
    f: jh
  },
  /*::[*/
  154: {
    /* n:"BrtWbFactoid" */
  },
  /*::[*/
  155: {
    /* n:"BrtFileRecover" */
  },
  /*::[*/
  156: {
    /* n:"BrtBundleSh", */
    f: Hh
  },
  /*::[*/
  157: {
    /* n:"BrtCalcProp" */
  },
  /*::[*/
  158: {
    /* n:"BrtBookView" */
  },
  /*::[*/
  159: {
    /* n:"BrtBeginSst", */
    T: 1,
    f: Ho
  },
  /*::[*/
  160: {
    /* n:"BrtEndSst", */
    T: -1
  },
  /*::[*/
  161: {
    /* n:"BrtBeginAFilter", */
    T: 1,
    f: Pr
  },
  /*::[*/
  162: {
    /* n:"BrtEndAFilter", */
    T: -1
  },
  /*::[*/
  163: {
    /* n:"BrtBeginFilterColumn", */
    T: 1
  },
  /*::[*/
  164: {
    /* n:"BrtEndFilterColumn", */
    T: -1
  },
  /*::[*/
  165: {
    /* n:"BrtBeginFilters", */
    T: 1
  },
  /*::[*/
  166: {
    /* n:"BrtEndFilters", */
    T: -1
  },
  /*::[*/
  167: {
    /* n:"BrtFilter" */
  },
  /*::[*/
  168: {
    /* n:"BrtColorFilter" */
  },
  /*::[*/
  169: {
    /* n:"BrtIconFilter" */
  },
  /*::[*/
  170: {
    /* n:"BrtTop10Filter" */
  },
  /*::[*/
  171: {
    /* n:"BrtDynamicFilter" */
  },
  /*::[*/
  172: {
    /* n:"BrtBeginCustomFilters", */
    T: 1
  },
  /*::[*/
  173: {
    /* n:"BrtEndCustomFilters", */
    T: -1
  },
  /*::[*/
  174: {
    /* n:"BrtCustomFilter" */
  },
  /*::[*/
  175: {
    /* n:"BrtAFilterDateGroupItem" */
  },
  /*::[*/
  176: {
    /* n:"BrtMergeCell", */
    f: oh
  },
  /*::[*/
  177: {
    /* n:"BrtBeginMergeCells", */
    T: 1
  },
  /*::[*/
  178: {
    /* n:"BrtEndMergeCells", */
    T: -1
  },
  /*::[*/
  179: {
    /* n:"BrtBeginPivotCacheDef", */
    T: 1
  },
  /*::[*/
  180: {
    /* n:"BrtEndPivotCacheDef", */
    T: -1
  },
  /*::[*/
  181: {
    /* n:"BrtBeginPCDFields", */
    T: 1
  },
  /*::[*/
  182: {
    /* n:"BrtEndPCDFields", */
    T: -1
  },
  /*::[*/
  183: {
    /* n:"BrtBeginPCDField", */
    T: 1
  },
  /*::[*/
  184: {
    /* n:"BrtEndPCDField", */
    T: -1
  },
  /*::[*/
  185: {
    /* n:"BrtBeginPCDSource", */
    T: 1
  },
  /*::[*/
  186: {
    /* n:"BrtEndPCDSource", */
    T: -1
  },
  /*::[*/
  187: {
    /* n:"BrtBeginPCDSRange", */
    T: 1
  },
  /*::[*/
  188: {
    /* n:"BrtEndPCDSRange", */
    T: -1
  },
  /*::[*/
  189: {
    /* n:"BrtBeginPCDFAtbl", */
    T: 1
  },
  /*::[*/
  190: {
    /* n:"BrtEndPCDFAtbl", */
    T: -1
  },
  /*::[*/
  191: {
    /* n:"BrtBeginPCDIRun", */
    T: 1
  },
  /*::[*/
  192: {
    /* n:"BrtEndPCDIRun", */
    T: -1
  },
  /*::[*/
  193: {
    /* n:"BrtBeginPivotCacheRecords", */
    T: 1
  },
  /*::[*/
  194: {
    /* n:"BrtEndPivotCacheRecords", */
    T: -1
  },
  /*::[*/
  195: {
    /* n:"BrtBeginPCDHierarchies", */
    T: 1
  },
  /*::[*/
  196: {
    /* n:"BrtEndPCDHierarchies", */
    T: -1
  },
  /*::[*/
  197: {
    /* n:"BrtBeginPCDHierarchy", */
    T: 1
  },
  /*::[*/
  198: {
    /* n:"BrtEndPCDHierarchy", */
    T: -1
  },
  /*::[*/
  199: {
    /* n:"BrtBeginPCDHFieldsUsage", */
    T: 1
  },
  /*::[*/
  200: {
    /* n:"BrtEndPCDHFieldsUsage", */
    T: -1
  },
  /*::[*/
  201: {
    /* n:"BrtBeginExtConnection", */
    T: 1
  },
  /*::[*/
  202: {
    /* n:"BrtEndExtConnection", */
    T: -1
  },
  /*::[*/
  203: {
    /* n:"BrtBeginECDbProps", */
    T: 1
  },
  /*::[*/
  204: {
    /* n:"BrtEndECDbProps", */
    T: -1
  },
  /*::[*/
  205: {
    /* n:"BrtBeginECOlapProps", */
    T: 1
  },
  /*::[*/
  206: {
    /* n:"BrtEndECOlapProps", */
    T: -1
  },
  /*::[*/
  207: {
    /* n:"BrtBeginPCDSConsol", */
    T: 1
  },
  /*::[*/
  208: {
    /* n:"BrtEndPCDSConsol", */
    T: -1
  },
  /*::[*/
  209: {
    /* n:"BrtBeginPCDSCPages", */
    T: 1
  },
  /*::[*/
  210: {
    /* n:"BrtEndPCDSCPages", */
    T: -1
  },
  /*::[*/
  211: {
    /* n:"BrtBeginPCDSCPage", */
    T: 1
  },
  /*::[*/
  212: {
    /* n:"BrtEndPCDSCPage", */
    T: -1
  },
  /*::[*/
  213: {
    /* n:"BrtBeginPCDSCPItem", */
    T: 1
  },
  /*::[*/
  214: {
    /* n:"BrtEndPCDSCPItem", */
    T: -1
  },
  /*::[*/
  215: {
    /* n:"BrtBeginPCDSCSets", */
    T: 1
  },
  /*::[*/
  216: {
    /* n:"BrtEndPCDSCSets", */
    T: -1
  },
  /*::[*/
  217: {
    /* n:"BrtBeginPCDSCSet", */
    T: 1
  },
  /*::[*/
  218: {
    /* n:"BrtEndPCDSCSet", */
    T: -1
  },
  /*::[*/
  219: {
    /* n:"BrtBeginPCDFGroup", */
    T: 1
  },
  /*::[*/
  220: {
    /* n:"BrtEndPCDFGroup", */
    T: -1
  },
  /*::[*/
  221: {
    /* n:"BrtBeginPCDFGItems", */
    T: 1
  },
  /*::[*/
  222: {
    /* n:"BrtEndPCDFGItems", */
    T: -1
  },
  /*::[*/
  223: {
    /* n:"BrtBeginPCDFGRange", */
    T: 1
  },
  /*::[*/
  224: {
    /* n:"BrtEndPCDFGRange", */
    T: -1
  },
  /*::[*/
  225: {
    /* n:"BrtBeginPCDFGDiscrete", */
    T: 1
  },
  /*::[*/
  226: {
    /* n:"BrtEndPCDFGDiscrete", */
    T: -1
  },
  /*::[*/
  227: {
    /* n:"BrtBeginPCDSDTupleCache", */
    T: 1
  },
  /*::[*/
  228: {
    /* n:"BrtEndPCDSDTupleCache", */
    T: -1
  },
  /*::[*/
  229: {
    /* n:"BrtBeginPCDSDTCEntries", */
    T: 1
  },
  /*::[*/
  230: {
    /* n:"BrtEndPCDSDTCEntries", */
    T: -1
  },
  /*::[*/
  231: {
    /* n:"BrtBeginPCDSDTCEMembers", */
    T: 1
  },
  /*::[*/
  232: {
    /* n:"BrtEndPCDSDTCEMembers", */
    T: -1
  },
  /*::[*/
  233: {
    /* n:"BrtBeginPCDSDTCEMember", */
    T: 1
  },
  /*::[*/
  234: {
    /* n:"BrtEndPCDSDTCEMember", */
    T: -1
  },
  /*::[*/
  235: {
    /* n:"BrtBeginPCDSDTCQueries", */
    T: 1
  },
  /*::[*/
  236: {
    /* n:"BrtEndPCDSDTCQueries", */
    T: -1
  },
  /*::[*/
  237: {
    /* n:"BrtBeginPCDSDTCQuery", */
    T: 1
  },
  /*::[*/
  238: {
    /* n:"BrtEndPCDSDTCQuery", */
    T: -1
  },
  /*::[*/
  239: {
    /* n:"BrtBeginPCDSDTCSets", */
    T: 1
  },
  /*::[*/
  240: {
    /* n:"BrtEndPCDSDTCSets", */
    T: -1
  },
  /*::[*/
  241: {
    /* n:"BrtBeginPCDSDTCSet", */
    T: 1
  },
  /*::[*/
  242: {
    /* n:"BrtEndPCDSDTCSet", */
    T: -1
  },
  /*::[*/
  243: {
    /* n:"BrtBeginPCDCalcItems", */
    T: 1
  },
  /*::[*/
  244: {
    /* n:"BrtEndPCDCalcItems", */
    T: -1
  },
  /*::[*/
  245: {
    /* n:"BrtBeginPCDCalcItem", */
    T: 1
  },
  /*::[*/
  246: {
    /* n:"BrtEndPCDCalcItem", */
    T: -1
  },
  /*::[*/
  247: {
    /* n:"BrtBeginPRule", */
    T: 1
  },
  /*::[*/
  248: {
    /* n:"BrtEndPRule", */
    T: -1
  },
  /*::[*/
  249: {
    /* n:"BrtBeginPRFilters", */
    T: 1
  },
  /*::[*/
  250: {
    /* n:"BrtEndPRFilters", */
    T: -1
  },
  /*::[*/
  251: {
    /* n:"BrtBeginPRFilter", */
    T: 1
  },
  /*::[*/
  252: {
    /* n:"BrtEndPRFilter", */
    T: -1
  },
  /*::[*/
  253: {
    /* n:"BrtBeginPNames", */
    T: 1
  },
  /*::[*/
  254: {
    /* n:"BrtEndPNames", */
    T: -1
  },
  /*::[*/
  255: {
    /* n:"BrtBeginPName", */
    T: 1
  },
  /*::[*/
  256: {
    /* n:"BrtEndPName", */
    T: -1
  },
  /*::[*/
  257: {
    /* n:"BrtBeginPNPairs", */
    T: 1
  },
  /*::[*/
  258: {
    /* n:"BrtEndPNPairs", */
    T: -1
  },
  /*::[*/
  259: {
    /* n:"BrtBeginPNPair", */
    T: 1
  },
  /*::[*/
  260: {
    /* n:"BrtEndPNPair", */
    T: -1
  },
  /*::[*/
  261: {
    /* n:"BrtBeginECWebProps", */
    T: 1
  },
  /*::[*/
  262: {
    /* n:"BrtEndECWebProps", */
    T: -1
  },
  /*::[*/
  263: {
    /* n:"BrtBeginEcWpTables", */
    T: 1
  },
  /*::[*/
  264: {
    /* n:"BrtEndECWPTables", */
    T: -1
  },
  /*::[*/
  265: {
    /* n:"BrtBeginECParams", */
    T: 1
  },
  /*::[*/
  266: {
    /* n:"BrtEndECParams", */
    T: -1
  },
  /*::[*/
  267: {
    /* n:"BrtBeginECParam", */
    T: 1
  },
  /*::[*/
  268: {
    /* n:"BrtEndECParam", */
    T: -1
  },
  /*::[*/
  269: {
    /* n:"BrtBeginPCDKPIs", */
    T: 1
  },
  /*::[*/
  270: {
    /* n:"BrtEndPCDKPIs", */
    T: -1
  },
  /*::[*/
  271: {
    /* n:"BrtBeginPCDKPI", */
    T: 1
  },
  /*::[*/
  272: {
    /* n:"BrtEndPCDKPI", */
    T: -1
  },
  /*::[*/
  273: {
    /* n:"BrtBeginDims", */
    T: 1
  },
  /*::[*/
  274: {
    /* n:"BrtEndDims", */
    T: -1
  },
  /*::[*/
  275: {
    /* n:"BrtBeginDim", */
    T: 1
  },
  /*::[*/
  276: {
    /* n:"BrtEndDim", */
    T: -1
  },
  /*::[*/
  277: {
    /* n:"BrtIndexPartEnd" */
  },
  /*::[*/
  278: {
    /* n:"BrtBeginStyleSheet", */
    T: 1
  },
  /*::[*/
  279: {
    /* n:"BrtEndStyleSheet", */
    T: -1
  },
  /*::[*/
  280: {
    /* n:"BrtBeginSXView", */
    T: 1
  },
  /*::[*/
  281: {
    /* n:"BrtEndSXVI", */
    T: -1
  },
  /*::[*/
  282: {
    /* n:"BrtBeginSXVI", */
    T: 1
  },
  /*::[*/
  283: {
    /* n:"BrtBeginSXVIs", */
    T: 1
  },
  /*::[*/
  284: {
    /* n:"BrtEndSXVIs", */
    T: -1
  },
  /*::[*/
  285: {
    /* n:"BrtBeginSXVD", */
    T: 1
  },
  /*::[*/
  286: {
    /* n:"BrtEndSXVD", */
    T: -1
  },
  /*::[*/
  287: {
    /* n:"BrtBeginSXVDs", */
    T: 1
  },
  /*::[*/
  288: {
    /* n:"BrtEndSXVDs", */
    T: -1
  },
  /*::[*/
  289: {
    /* n:"BrtBeginSXPI", */
    T: 1
  },
  /*::[*/
  290: {
    /* n:"BrtEndSXPI", */
    T: -1
  },
  /*::[*/
  291: {
    /* n:"BrtBeginSXPIs", */
    T: 1
  },
  /*::[*/
  292: {
    /* n:"BrtEndSXPIs", */
    T: -1
  },
  /*::[*/
  293: {
    /* n:"BrtBeginSXDI", */
    T: 1
  },
  /*::[*/
  294: {
    /* n:"BrtEndSXDI", */
    T: -1
  },
  /*::[*/
  295: {
    /* n:"BrtBeginSXDIs", */
    T: 1
  },
  /*::[*/
  296: {
    /* n:"BrtEndSXDIs", */
    T: -1
  },
  /*::[*/
  297: {
    /* n:"BrtBeginSXLI", */
    T: 1
  },
  /*::[*/
  298: {
    /* n:"BrtEndSXLI", */
    T: -1
  },
  /*::[*/
  299: {
    /* n:"BrtBeginSXLIRws", */
    T: 1
  },
  /*::[*/
  300: {
    /* n:"BrtEndSXLIRws", */
    T: -1
  },
  /*::[*/
  301: {
    /* n:"BrtBeginSXLICols", */
    T: 1
  },
  /*::[*/
  302: {
    /* n:"BrtEndSXLICols", */
    T: -1
  },
  /*::[*/
  303: {
    /* n:"BrtBeginSXFormat", */
    T: 1
  },
  /*::[*/
  304: {
    /* n:"BrtEndSXFormat", */
    T: -1
  },
  /*::[*/
  305: {
    /* n:"BrtBeginSXFormats", */
    T: 1
  },
  /*::[*/
  306: {
    /* n:"BrtEndSxFormats", */
    T: -1
  },
  /*::[*/
  307: {
    /* n:"BrtBeginSxSelect", */
    T: 1
  },
  /*::[*/
  308: {
    /* n:"BrtEndSxSelect", */
    T: -1
  },
  /*::[*/
  309: {
    /* n:"BrtBeginISXVDRws", */
    T: 1
  },
  /*::[*/
  310: {
    /* n:"BrtEndISXVDRws", */
    T: -1
  },
  /*::[*/
  311: {
    /* n:"BrtBeginISXVDCols", */
    T: 1
  },
  /*::[*/
  312: {
    /* n:"BrtEndISXVDCols", */
    T: -1
  },
  /*::[*/
  313: {
    /* n:"BrtEndSXLocation", */
    T: -1
  },
  /*::[*/
  314: {
    /* n:"BrtBeginSXLocation", */
    T: 1
  },
  /*::[*/
  315: {
    /* n:"BrtEndSXView", */
    T: -1
  },
  /*::[*/
  316: {
    /* n:"BrtBeginSXTHs", */
    T: 1
  },
  /*::[*/
  317: {
    /* n:"BrtEndSXTHs", */
    T: -1
  },
  /*::[*/
  318: {
    /* n:"BrtBeginSXTH", */
    T: 1
  },
  /*::[*/
  319: {
    /* n:"BrtEndSXTH", */
    T: -1
  },
  /*::[*/
  320: {
    /* n:"BrtBeginISXTHRws", */
    T: 1
  },
  /*::[*/
  321: {
    /* n:"BrtEndISXTHRws", */
    T: -1
  },
  /*::[*/
  322: {
    /* n:"BrtBeginISXTHCols", */
    T: 1
  },
  /*::[*/
  323: {
    /* n:"BrtEndISXTHCols", */
    T: -1
  },
  /*::[*/
  324: {
    /* n:"BrtBeginSXTDMPS", */
    T: 1
  },
  /*::[*/
  325: {
    /* n:"BrtEndSXTDMPs", */
    T: -1
  },
  /*::[*/
  326: {
    /* n:"BrtBeginSXTDMP", */
    T: 1
  },
  /*::[*/
  327: {
    /* n:"BrtEndSXTDMP", */
    T: -1
  },
  /*::[*/
  328: {
    /* n:"BrtBeginSXTHItems", */
    T: 1
  },
  /*::[*/
  329: {
    /* n:"BrtEndSXTHItems", */
    T: -1
  },
  /*::[*/
  330: {
    /* n:"BrtBeginSXTHItem", */
    T: 1
  },
  /*::[*/
  331: {
    /* n:"BrtEndSXTHItem", */
    T: -1
  },
  /*::[*/
  332: {
    /* n:"BrtBeginMetadata", */
    T: 1
  },
  /*::[*/
  333: {
    /* n:"BrtEndMetadata", */
    T: -1
  },
  /*::[*/
  334: {
    /* n:"BrtBeginEsmdtinfo", */
    T: 1
  },
  /*::[*/
  335: {
    /* n:"BrtMdtinfo", */
    f: Tc
  },
  /*::[*/
  336: {
    /* n:"BrtEndEsmdtinfo", */
    T: -1
  },
  /*::[*/
  337: {
    /* n:"BrtBeginEsmdb", */
    f: yc,
    T: 1
  },
  /*::[*/
  338: {
    /* n:"BrtEndEsmdb", */
    T: -1
  },
  /*::[*/
  339: {
    /* n:"BrtBeginEsfmd", */
    T: 1
  },
  /*::[*/
  340: {
    /* n:"BrtEndEsfmd", */
    T: -1
  },
  /*::[*/
  341: {
    /* n:"BrtBeginSingleCells", */
    T: 1
  },
  /*::[*/
  342: {
    /* n:"BrtEndSingleCells", */
    T: -1
  },
  /*::[*/
  343: {
    /* n:"BrtBeginList", */
    T: 1
  },
  /*::[*/
  344: {
    /* n:"BrtEndList", */
    T: -1
  },
  /*::[*/
  345: {
    /* n:"BrtBeginListCols", */
    T: 1
  },
  /*::[*/
  346: {
    /* n:"BrtEndListCols", */
    T: -1
  },
  /*::[*/
  347: {
    /* n:"BrtBeginListCol", */
    T: 1
  },
  /*::[*/
  348: {
    /* n:"BrtEndListCol", */
    T: -1
  },
  /*::[*/
  349: {
    /* n:"BrtBeginListXmlCPr", */
    T: 1
  },
  /*::[*/
  350: {
    /* n:"BrtEndListXmlCPr", */
    T: -1
  },
  /*::[*/
  351: {
    /* n:"BrtListCCFmla" */
  },
  /*::[*/
  352: {
    /* n:"BrtListTrFmla" */
  },
  /*::[*/
  353: {
    /* n:"BrtBeginExternals", */
    T: 1
  },
  /*::[*/
  354: {
    /* n:"BrtEndExternals", */
    T: -1
  },
  /*::[*/
  355: {
    /* n:"BrtSupBookSrc", */
    f: La
  },
  /*::[*/
  357: {
    /* n:"BrtSupSelf" */
  },
  /*::[*/
  358: {
    /* n:"BrtSupSame" */
  },
  /*::[*/
  359: {
    /* n:"BrtSupTabs" */
  },
  /*::[*/
  360: {
    /* n:"BrtBeginSupBook", */
    T: 1
  },
  /*::[*/
  361: {
    /* n:"BrtPlaceholderName" */
  },
  /*::[*/
  362: {
    /* n:"BrtExternSheet", */
    f: ko
  },
  /*::[*/
  363: {
    /* n:"BrtExternTableStart" */
  },
  /*::[*/
  364: {
    /* n:"BrtExternTableEnd" */
  },
  /*::[*/
  366: {
    /* n:"BrtExternRowHdr" */
  },
  /*::[*/
  367: {
    /* n:"BrtExternCellBlank" */
  },
  /*::[*/
  368: {
    /* n:"BrtExternCellReal" */
  },
  /*::[*/
  369: {
    /* n:"BrtExternCellBool" */
  },
  /*::[*/
  370: {
    /* n:"BrtExternCellError" */
  },
  /*::[*/
  371: {
    /* n:"BrtExternCellString" */
  },
  /*::[*/
  372: {
    /* n:"BrtBeginEsmdx", */
    T: 1
  },
  /*::[*/
  373: {
    /* n:"BrtEndEsmdx", */
    T: -1
  },
  /*::[*/
  374: {
    /* n:"BrtBeginMdxSet", */
    T: 1
  },
  /*::[*/
  375: {
    /* n:"BrtEndMdxSet", */
    T: -1
  },
  /*::[*/
  376: {
    /* n:"BrtBeginMdxMbrProp", */
    T: 1
  },
  /*::[*/
  377: {
    /* n:"BrtEndMdxMbrProp", */
    T: -1
  },
  /*::[*/
  378: {
    /* n:"BrtBeginMdxKPI", */
    T: 1
  },
  /*::[*/
  379: {
    /* n:"BrtEndMdxKPI", */
    T: -1
  },
  /*::[*/
  380: {
    /* n:"BrtBeginEsstr", */
    T: 1
  },
  /*::[*/
  381: {
    /* n:"BrtEndEsstr", */
    T: -1
  },
  /*::[*/
  382: {
    /* n:"BrtBeginPRFItem", */
    T: 1
  },
  /*::[*/
  383: {
    /* n:"BrtEndPRFItem", */
    T: -1
  },
  /*::[*/
  384: {
    /* n:"BrtBeginPivotCacheIDs", */
    T: 1
  },
  /*::[*/
  385: {
    /* n:"BrtEndPivotCacheIDs", */
    T: -1
  },
  /*::[*/
  386: {
    /* n:"BrtBeginPivotCacheID", */
    T: 1
  },
  /*::[*/
  387: {
    /* n:"BrtEndPivotCacheID", */
    T: -1
  },
  /*::[*/
  388: {
    /* n:"BrtBeginISXVIs", */
    T: 1
  },
  /*::[*/
  389: {
    /* n:"BrtEndISXVIs", */
    T: -1
  },
  /*::[*/
  390: {
    /* n:"BrtBeginColInfos", */
    T: 1
  },
  /*::[*/
  391: {
    /* n:"BrtEndColInfos", */
    T: -1
  },
  /*::[*/
  392: {
    /* n:"BrtBeginRwBrk", */
    T: 1
  },
  /*::[*/
  393: {
    /* n:"BrtEndRwBrk", */
    T: -1
  },
  /*::[*/
  394: {
    /* n:"BrtBeginColBrk", */
    T: 1
  },
  /*::[*/
  395: {
    /* n:"BrtEndColBrk", */
    T: -1
  },
  /*::[*/
  396: {
    /* n:"BrtBrk" */
  },
  /*::[*/
  397: {
    /* n:"BrtUserBookView" */
  },
  /*::[*/
  398: {
    /* n:"BrtInfo" */
  },
  /*::[*/
  399: {
    /* n:"BrtCUsr" */
  },
  /*::[*/
  400: {
    /* n:"BrtUsr" */
  },
  /*::[*/
  401: {
    /* n:"BrtBeginUsers", */
    T: 1
  },
  /*::[*/
  403: {
    /* n:"BrtEOF" */
  },
  /*::[*/
  404: {
    /* n:"BrtUCR" */
  },
  /*::[*/
  405: {
    /* n:"BrtRRInsDel" */
  },
  /*::[*/
  406: {
    /* n:"BrtRREndInsDel" */
  },
  /*::[*/
  407: {
    /* n:"BrtRRMove" */
  },
  /*::[*/
  408: {
    /* n:"BrtRREndMove" */
  },
  /*::[*/
  409: {
    /* n:"BrtRRChgCell" */
  },
  /*::[*/
  410: {
    /* n:"BrtRREndChgCell" */
  },
  /*::[*/
  411: {
    /* n:"BrtRRHeader" */
  },
  /*::[*/
  412: {
    /* n:"BrtRRUserView" */
  },
  /*::[*/
  413: {
    /* n:"BrtRRRenSheet" */
  },
  /*::[*/
  414: {
    /* n:"BrtRRInsertSh" */
  },
  /*::[*/
  415: {
    /* n:"BrtRRDefName" */
  },
  /*::[*/
  416: {
    /* n:"BrtRRNote" */
  },
  /*::[*/
  417: {
    /* n:"BrtRRConflict" */
  },
  /*::[*/
  418: {
    /* n:"BrtRRTQSIF" */
  },
  /*::[*/
  419: {
    /* n:"BrtRRFormat" */
  },
  /*::[*/
  420: {
    /* n:"BrtRREndFormat" */
  },
  /*::[*/
  421: {
    /* n:"BrtRRAutoFmt" */
  },
  /*::[*/
  422: {
    /* n:"BrtBeginUserShViews", */
    T: 1
  },
  /*::[*/
  423: {
    /* n:"BrtBeginUserShView", */
    T: 1
  },
  /*::[*/
  424: {
    /* n:"BrtEndUserShView", */
    T: -1
  },
  /*::[*/
  425: {
    /* n:"BrtEndUserShViews", */
    T: -1
  },
  /*::[*/
  426: {
    /* n:"BrtArrFmla", */
    f: vh
  },
  /*::[*/
  427: {
    /* n:"BrtShrFmla", */
    f: ph
  },
  /*::[*/
  428: {
    /* n:"BrtTable" */
  },
  /*::[*/
  429: {
    /* n:"BrtBeginExtConnections", */
    T: 1
  },
  /*::[*/
  430: {
    /* n:"BrtEndExtConnections", */
    T: -1
  },
  /*::[*/
  431: {
    /* n:"BrtBeginPCDCalcMems", */
    T: 1
  },
  /*::[*/
  432: {
    /* n:"BrtEndPCDCalcMems", */
    T: -1
  },
  /*::[*/
  433: {
    /* n:"BrtBeginPCDCalcMem", */
    T: 1
  },
  /*::[*/
  434: {
    /* n:"BrtEndPCDCalcMem", */
    T: -1
  },
  /*::[*/
  435: {
    /* n:"BrtBeginPCDHGLevels", */
    T: 1
  },
  /*::[*/
  436: {
    /* n:"BrtEndPCDHGLevels", */
    T: -1
  },
  /*::[*/
  437: {
    /* n:"BrtBeginPCDHGLevel", */
    T: 1
  },
  /*::[*/
  438: {
    /* n:"BrtEndPCDHGLevel", */
    T: -1
  },
  /*::[*/
  439: {
    /* n:"BrtBeginPCDHGLGroups", */
    T: 1
  },
  /*::[*/
  440: {
    /* n:"BrtEndPCDHGLGroups", */
    T: -1
  },
  /*::[*/
  441: {
    /* n:"BrtBeginPCDHGLGroup", */
    T: 1
  },
  /*::[*/
  442: {
    /* n:"BrtEndPCDHGLGroup", */
    T: -1
  },
  /*::[*/
  443: {
    /* n:"BrtBeginPCDHGLGMembers", */
    T: 1
  },
  /*::[*/
  444: {
    /* n:"BrtEndPCDHGLGMembers", */
    T: -1
  },
  /*::[*/
  445: {
    /* n:"BrtBeginPCDHGLGMember", */
    T: 1
  },
  /*::[*/
  446: {
    /* n:"BrtEndPCDHGLGMember", */
    T: -1
  },
  /*::[*/
  447: {
    /* n:"BrtBeginQSI", */
    T: 1
  },
  /*::[*/
  448: {
    /* n:"BrtEndQSI", */
    T: -1
  },
  /*::[*/
  449: {
    /* n:"BrtBeginQSIR", */
    T: 1
  },
  /*::[*/
  450: {
    /* n:"BrtEndQSIR", */
    T: -1
  },
  /*::[*/
  451: {
    /* n:"BrtBeginDeletedNames", */
    T: 1
  },
  /*::[*/
  452: {
    /* n:"BrtEndDeletedNames", */
    T: -1
  },
  /*::[*/
  453: {
    /* n:"BrtBeginDeletedName", */
    T: 1
  },
  /*::[*/
  454: {
    /* n:"BrtEndDeletedName", */
    T: -1
  },
  /*::[*/
  455: {
    /* n:"BrtBeginQSIFs", */
    T: 1
  },
  /*::[*/
  456: {
    /* n:"BrtEndQSIFs", */
    T: -1
  },
  /*::[*/
  457: {
    /* n:"BrtBeginQSIF", */
    T: 1
  },
  /*::[*/
  458: {
    /* n:"BrtEndQSIF", */
    T: -1
  },
  /*::[*/
  459: {
    /* n:"BrtBeginAutoSortScope", */
    T: 1
  },
  /*::[*/
  460: {
    /* n:"BrtEndAutoSortScope", */
    T: -1
  },
  /*::[*/
  461: {
    /* n:"BrtBeginConditionalFormatting", */
    T: 1
  },
  /*::[*/
  462: {
    /* n:"BrtEndConditionalFormatting", */
    T: -1
  },
  /*::[*/
  463: {
    /* n:"BrtBeginCFRule", */
    T: 1
  },
  /*::[*/
  464: {
    /* n:"BrtEndCFRule", */
    T: -1
  },
  /*::[*/
  465: {
    /* n:"BrtBeginIconSet", */
    T: 1
  },
  /*::[*/
  466: {
    /* n:"BrtEndIconSet", */
    T: -1
  },
  /*::[*/
  467: {
    /* n:"BrtBeginDatabar", */
    T: 1
  },
  /*::[*/
  468: {
    /* n:"BrtEndDatabar", */
    T: -1
  },
  /*::[*/
  469: {
    /* n:"BrtBeginColorScale", */
    T: 1
  },
  /*::[*/
  470: {
    /* n:"BrtEndColorScale", */
    T: -1
  },
  /*::[*/
  471: {
    /* n:"BrtCFVO" */
  },
  /*::[*/
  472: {
    /* n:"BrtExternValueMeta" */
  },
  /*::[*/
  473: {
    /* n:"BrtBeginColorPalette", */
    T: 1
  },
  /*::[*/
  474: {
    /* n:"BrtEndColorPalette", */
    T: -1
  },
  /*::[*/
  475: {
    /* n:"BrtIndexedColor" */
  },
  /*::[*/
  476: {
    /* n:"BrtMargins", */
    f: gh
  },
  /*::[*/
  477: {
    /* n:"BrtPrintOptions" */
  },
  /*::[*/
  478: {
    /* n:"BrtPageSetup" */
  },
  /*::[*/
  479: {
    /* n:"BrtBeginHeaderFooter", */
    T: 1
  },
  /*::[*/
  480: {
    /* n:"BrtEndHeaderFooter", */
    T: -1
  },
  /*::[*/
  481: {
    /* n:"BrtBeginSXCrtFormat", */
    T: 1
  },
  /*::[*/
  482: {
    /* n:"BrtEndSXCrtFormat", */
    T: -1
  },
  /*::[*/
  483: {
    /* n:"BrtBeginSXCrtFormats", */
    T: 1
  },
  /*::[*/
  484: {
    /* n:"BrtEndSXCrtFormats", */
    T: -1
  },
  /*::[*/
  485: {
    /* n:"BrtWsFmtInfo", */
    f: k1
  },
  /*::[*/
  486: {
    /* n:"BrtBeginMgs", */
    T: 1
  },
  /*::[*/
  487: {
    /* n:"BrtEndMGs", */
    T: -1
  },
  /*::[*/
  488: {
    /* n:"BrtBeginMGMaps", */
    T: 1
  },
  /*::[*/
  489: {
    /* n:"BrtEndMGMaps", */
    T: -1
  },
  /*::[*/
  490: {
    /* n:"BrtBeginMG", */
    T: 1
  },
  /*::[*/
  491: {
    /* n:"BrtEndMG", */
    T: -1
  },
  /*::[*/
  492: {
    /* n:"BrtBeginMap", */
    T: 1
  },
  /*::[*/
  493: {
    /* n:"BrtEndMap", */
    T: -1
  },
  /*::[*/
  494: {
    /* n:"BrtHLink", */
    f: hh
  },
  /*::[*/
  495: {
    /* n:"BrtBeginDCon", */
    T: 1
  },
  /*::[*/
  496: {
    /* n:"BrtEndDCon", */
    T: -1
  },
  /*::[*/
  497: {
    /* n:"BrtBeginDRefs", */
    T: 1
  },
  /*::[*/
  498: {
    /* n:"BrtEndDRefs", */
    T: -1
  },
  /*::[*/
  499: {
    /* n:"BrtDRef" */
  },
  /*::[*/
  500: {
    /* n:"BrtBeginScenMan", */
    T: 1
  },
  /*::[*/
  501: {
    /* n:"BrtEndScenMan", */
    T: -1
  },
  /*::[*/
  502: {
    /* n:"BrtBeginSct", */
    T: 1
  },
  /*::[*/
  503: {
    /* n:"BrtEndSct", */
    T: -1
  },
  /*::[*/
  504: {
    /* n:"BrtSlc" */
  },
  /*::[*/
  505: {
    /* n:"BrtBeginDXFs", */
    T: 1
  },
  /*::[*/
  506: {
    /* n:"BrtEndDXFs", */
    T: -1
  },
  /*::[*/
  507: {
    /* n:"BrtDXF" */
  },
  /*::[*/
  508: {
    /* n:"BrtBeginTableStyles", */
    T: 1
  },
  /*::[*/
  509: {
    /* n:"BrtEndTableStyles", */
    T: -1
  },
  /*::[*/
  510: {
    /* n:"BrtBeginTableStyle", */
    T: 1
  },
  /*::[*/
  511: {
    /* n:"BrtEndTableStyle", */
    T: -1
  },
  /*::[*/
  512: {
    /* n:"BrtTableStyleElement" */
  },
  /*::[*/
  513: {
    /* n:"BrtTableStyleClient" */
  },
  /*::[*/
  514: {
    /* n:"BrtBeginVolDeps", */
    T: 1
  },
  /*::[*/
  515: {
    /* n:"BrtEndVolDeps", */
    T: -1
  },
  /*::[*/
  516: {
    /* n:"BrtBeginVolType", */
    T: 1
  },
  /*::[*/
  517: {
    /* n:"BrtEndVolType", */
    T: -1
  },
  /*::[*/
  518: {
    /* n:"BrtBeginVolMain", */
    T: 1
  },
  /*::[*/
  519: {
    /* n:"BrtEndVolMain", */
    T: -1
  },
  /*::[*/
  520: {
    /* n:"BrtBeginVolTopic", */
    T: 1
  },
  /*::[*/
  521: {
    /* n:"BrtEndVolTopic", */
    T: -1
  },
  /*::[*/
  522: {
    /* n:"BrtVolSubtopic" */
  },
  /*::[*/
  523: {
    /* n:"BrtVolRef" */
  },
  /*::[*/
  524: {
    /* n:"BrtVolNum" */
  },
  /*::[*/
  525: {
    /* n:"BrtVolErr" */
  },
  /*::[*/
  526: {
    /* n:"BrtVolStr" */
  },
  /*::[*/
  527: {
    /* n:"BrtVolBool" */
  },
  /*::[*/
  528: {
    /* n:"BrtBeginCalcChain$", */
    T: 1
  },
  /*::[*/
  529: {
    /* n:"BrtEndCalcChain$", */
    T: -1
  },
  /*::[*/
  530: {
    /* n:"BrtBeginSortState", */
    T: 1
  },
  /*::[*/
  531: {
    /* n:"BrtEndSortState", */
    T: -1
  },
  /*::[*/
  532: {
    /* n:"BrtBeginSortCond", */
    T: 1
  },
  /*::[*/
  533: {
    /* n:"BrtEndSortCond", */
    T: -1
  },
  /*::[*/
  534: {
    /* n:"BrtBookProtection" */
  },
  /*::[*/
  535: {
    /* n:"BrtSheetProtection" */
  },
  /*::[*/
  536: {
    /* n:"BrtRangeProtection" */
  },
  /*::[*/
  537: {
    /* n:"BrtPhoneticInfo" */
  },
  /*::[*/
  538: {
    /* n:"BrtBeginECTxtWiz", */
    T: 1
  },
  /*::[*/
  539: {
    /* n:"BrtEndECTxtWiz", */
    T: -1
  },
  /*::[*/
  540: {
    /* n:"BrtBeginECTWFldInfoLst", */
    T: 1
  },
  /*::[*/
  541: {
    /* n:"BrtEndECTWFldInfoLst", */
    T: -1
  },
  /*::[*/
  542: {
    /* n:"BrtBeginECTwFldInfo", */
    T: 1
  },
  /*::[*/
  548: {
    /* n:"BrtFileSharing" */
  },
  /*::[*/
  549: {
    /* n:"BrtOleSize" */
  },
  /*::[*/
  550: {
    /* n:"BrtDrawing", */
    f: La
  },
  /*::[*/
  551: {
    /* n:"BrtLegacyDrawing" */
  },
  /*::[*/
  552: {
    /* n:"BrtLegacyDrawingHF" */
  },
  /*::[*/
  553: {
    /* n:"BrtWebOpt" */
  },
  /*::[*/
  554: {
    /* n:"BrtBeginWebPubItems", */
    T: 1
  },
  /*::[*/
  555: {
    /* n:"BrtEndWebPubItems", */
    T: -1
  },
  /*::[*/
  556: {
    /* n:"BrtBeginWebPubItem", */
    T: 1
  },
  /*::[*/
  557: {
    /* n:"BrtEndWebPubItem", */
    T: -1
  },
  /*::[*/
  558: {
    /* n:"BrtBeginSXCondFmt", */
    T: 1
  },
  /*::[*/
  559: {
    /* n:"BrtEndSXCondFmt", */
    T: -1
  },
  /*::[*/
  560: {
    /* n:"BrtBeginSXCondFmts", */
    T: 1
  },
  /*::[*/
  561: {
    /* n:"BrtEndSXCondFmts", */
    T: -1
  },
  /*::[*/
  562: {
    /* n:"BrtBkHim" */
  },
  /*::[*/
  564: {
    /* n:"BrtColor" */
  },
  /*::[*/
  565: {
    /* n:"BrtBeginIndexedColors", */
    T: 1
  },
  /*::[*/
  566: {
    /* n:"BrtEndIndexedColors", */
    T: -1
  },
  /*::[*/
  569: {
    /* n:"BrtBeginMRUColors", */
    T: 1
  },
  /*::[*/
  570: {
    /* n:"BrtEndMRUColors", */
    T: -1
  },
  /*::[*/
  572: {
    /* n:"BrtMRUColor" */
  },
  /*::[*/
  573: {
    /* n:"BrtBeginDVals", */
    T: 1
  },
  /*::[*/
  574: {
    /* n:"BrtEndDVals", */
    T: -1
  },
  /*::[*/
  577: {
    /* n:"BrtSupNameStart" */
  },
  /*::[*/
  578: {
    /* n:"BrtSupNameValueStart" */
  },
  /*::[*/
  579: {
    /* n:"BrtSupNameValueEnd" */
  },
  /*::[*/
  580: {
    /* n:"BrtSupNameNum" */
  },
  /*::[*/
  581: {
    /* n:"BrtSupNameErr" */
  },
  /*::[*/
  582: {
    /* n:"BrtSupNameSt" */
  },
  /*::[*/
  583: {
    /* n:"BrtSupNameNil" */
  },
  /*::[*/
  584: {
    /* n:"BrtSupNameBool" */
  },
  /*::[*/
  585: {
    /* n:"BrtSupNameFmla" */
  },
  /*::[*/
  586: {
    /* n:"BrtSupNameBits" */
  },
  /*::[*/
  587: {
    /* n:"BrtSupNameEnd" */
  },
  /*::[*/
  588: {
    /* n:"BrtEndSupBook", */
    T: -1
  },
  /*::[*/
  589: {
    /* n:"BrtCellSmartTagProperty" */
  },
  /*::[*/
  590: {
    /* n:"BrtBeginCellSmartTag", */
    T: 1
  },
  /*::[*/
  591: {
    /* n:"BrtEndCellSmartTag", */
    T: -1
  },
  /*::[*/
  592: {
    /* n:"BrtBeginCellSmartTags", */
    T: 1
  },
  /*::[*/
  593: {
    /* n:"BrtEndCellSmartTags", */
    T: -1
  },
  /*::[*/
  594: {
    /* n:"BrtBeginSmartTags", */
    T: 1
  },
  /*::[*/
  595: {
    /* n:"BrtEndSmartTags", */
    T: -1
  },
  /*::[*/
  596: {
    /* n:"BrtSmartTagType" */
  },
  /*::[*/
  597: {
    /* n:"BrtBeginSmartTagTypes", */
    T: 1
  },
  /*::[*/
  598: {
    /* n:"BrtEndSmartTagTypes", */
    T: -1
  },
  /*::[*/
  599: {
    /* n:"BrtBeginSXFilters", */
    T: 1
  },
  /*::[*/
  600: {
    /* n:"BrtEndSXFilters", */
    T: -1
  },
  /*::[*/
  601: {
    /* n:"BrtBeginSXFILTER", */
    T: 1
  },
  /*::[*/
  602: {
    /* n:"BrtEndSXFilter", */
    T: -1
  },
  /*::[*/
  603: {
    /* n:"BrtBeginFills", */
    T: 1
  },
  /*::[*/
  604: {
    /* n:"BrtEndFills", */
    T: -1
  },
  /*::[*/
  605: {
    /* n:"BrtBeginCellWatches", */
    T: 1
  },
  /*::[*/
  606: {
    /* n:"BrtEndCellWatches", */
    T: -1
  },
  /*::[*/
  607: {
    /* n:"BrtCellWatch" */
  },
  /*::[*/
  608: {
    /* n:"BrtBeginCRErrs", */
    T: 1
  },
  /*::[*/
  609: {
    /* n:"BrtEndCRErrs", */
    T: -1
  },
  /*::[*/
  610: {
    /* n:"BrtCrashRecErr" */
  },
  /*::[*/
  611: {
    /* n:"BrtBeginFonts", */
    T: 1
  },
  /*::[*/
  612: {
    /* n:"BrtEndFonts", */
    T: -1
  },
  /*::[*/
  613: {
    /* n:"BrtBeginBorders", */
    T: 1
  },
  /*::[*/
  614: {
    /* n:"BrtEndBorders", */
    T: -1
  },
  /*::[*/
  615: {
    /* n:"BrtBeginFmts", */
    T: 1
  },
  /*::[*/
  616: {
    /* n:"BrtEndFmts", */
    T: -1
  },
  /*::[*/
  617: {
    /* n:"BrtBeginCellXFs", */
    T: 1
  },
  /*::[*/
  618: {
    /* n:"BrtEndCellXFs", */
    T: -1
  },
  /*::[*/
  619: {
    /* n:"BrtBeginStyles", */
    T: 1
  },
  /*::[*/
  620: {
    /* n:"BrtEndStyles", */
    T: -1
  },
  /*::[*/
  625: {
    /* n:"BrtBigName" */
  },
  /*::[*/
  626: {
    /* n:"BrtBeginCellStyleXFs", */
    T: 1
  },
  /*::[*/
  627: {
    /* n:"BrtEndCellStyleXFs", */
    T: -1
  },
  /*::[*/
  628: {
    /* n:"BrtBeginComments", */
    T: 1
  },
  /*::[*/
  629: {
    /* n:"BrtEndComments", */
    T: -1
  },
  /*::[*/
  630: {
    /* n:"BrtBeginCommentAuthors", */
    T: 1
  },
  /*::[*/
  631: {
    /* n:"BrtEndCommentAuthors", */
    T: -1
  },
  /*::[*/
  632: {
    /* n:"BrtCommentAuthor", */
    f: Nc
  },
  /*::[*/
  633: {
    /* n:"BrtBeginCommentList", */
    T: 1
  },
  /*::[*/
  634: {
    /* n:"BrtEndCommentList", */
    T: -1
  },
  /*::[*/
  635: {
    /* n:"BrtBeginComment", */
    T: 1,
    f: Ic
  },
  /*::[*/
  636: {
    /* n:"BrtEndComment", */
    T: -1
  },
  /*::[*/
  637: {
    /* n:"BrtCommentText", */
    f: Lf
  },
  /*::[*/
  638: {
    /* n:"BrtBeginOleObjects", */
    T: 1
  },
  /*::[*/
  639: {
    /* n:"BrtOleObject" */
  },
  /*::[*/
  640: {
    /* n:"BrtEndOleObjects", */
    T: -1
  },
  /*::[*/
  641: {
    /* n:"BrtBeginSxrules", */
    T: 1
  },
  /*::[*/
  642: {
    /* n:"BrtEndSxRules", */
    T: -1
  },
  /*::[*/
  643: {
    /* n:"BrtBeginActiveXControls", */
    T: 1
  },
  /*::[*/
  644: {
    /* n:"BrtActiveX" */
  },
  /*::[*/
  645: {
    /* n:"BrtEndActiveXControls", */
    T: -1
  },
  /*::[*/
  646: {
    /* n:"BrtBeginPCDSDTCEMembersSortBy", */
    T: 1
  },
  /*::[*/
  648: {
    /* n:"BrtBeginCellIgnoreECs", */
    T: 1
  },
  /*::[*/
  649: {
    /* n:"BrtCellIgnoreEC" */
  },
  /*::[*/
  650: {
    /* n:"BrtEndCellIgnoreECs", */
    T: -1
  },
  /*::[*/
  651: {
    /* n:"BrtCsProp", */
    f: Bh
  },
  /*::[*/
  652: {
    /* n:"BrtCsPageSetup" */
  },
  /*::[*/
  653: {
    /* n:"BrtBeginUserCsViews", */
    T: 1
  },
  /*::[*/
  654: {
    /* n:"BrtEndUserCsViews", */
    T: -1
  },
  /*::[*/
  655: {
    /* n:"BrtBeginUserCsView", */
    T: 1
  },
  /*::[*/
  656: {
    /* n:"BrtEndUserCsView", */
    T: -1
  },
  /*::[*/
  657: {
    /* n:"BrtBeginPcdSFCIEntries", */
    T: 1
  },
  /*::[*/
  658: {
    /* n:"BrtEndPCDSFCIEntries", */
    T: -1
  },
  /*::[*/
  659: {
    /* n:"BrtPCDSFCIEntry" */
  },
  /*::[*/
  660: {
    /* n:"BrtBeginListParts", */
    T: 1
  },
  /*::[*/
  661: {
    /* n:"BrtListPart" */
  },
  /*::[*/
  662: {
    /* n:"BrtEndListParts", */
    T: -1
  },
  /*::[*/
  663: {
    /* n:"BrtSheetCalcProp" */
  },
  /*::[*/
  664: {
    /* n:"BrtBeginFnGroup", */
    T: 1
  },
  /*::[*/
  665: {
    /* n:"BrtFnGroup" */
  },
  /*::[*/
  666: {
    /* n:"BrtEndFnGroup", */
    T: -1
  },
  /*::[*/
  667: {
    /* n:"BrtSupAddin" */
  },
  /*::[*/
  668: {
    /* n:"BrtSXTDMPOrder" */
  },
  /*::[*/
  669: {
    /* n:"BrtCsProtection" */
  },
  /*::[*/
  671: {
    /* n:"BrtBeginWsSortMap", */
    T: 1
  },
  /*::[*/
  672: {
    /* n:"BrtEndWsSortMap", */
    T: -1
  },
  /*::[*/
  673: {
    /* n:"BrtBeginRRSort", */
    T: 1
  },
  /*::[*/
  674: {
    /* n:"BrtEndRRSort", */
    T: -1
  },
  /*::[*/
  675: {
    /* n:"BrtRRSortItem" */
  },
  /*::[*/
  676: {
    /* n:"BrtFileSharingIso" */
  },
  /*::[*/
  677: {
    /* n:"BrtBookProtectionIso" */
  },
  /*::[*/
  678: {
    /* n:"BrtSheetProtectionIso" */
  },
  /*::[*/
  679: {
    /* n:"BrtCsProtectionIso" */
  },
  /*::[*/
  680: {
    /* n:"BrtRangeProtectionIso" */
  },
  /*::[*/
  681: {
    /* n:"BrtDValList" */
  },
  /*::[*/
  1024: {
    /* n:"BrtRwDescent" */
  },
  /*::[*/
  1025: {
    /* n:"BrtKnownFonts" */
  },
  /*::[*/
  1026: {
    /* n:"BrtBeginSXTupleSet", */
    T: 1
  },
  /*::[*/
  1027: {
    /* n:"BrtEndSXTupleSet", */
    T: -1
  },
  /*::[*/
  1028: {
    /* n:"BrtBeginSXTupleSetHeader", */
    T: 1
  },
  /*::[*/
  1029: {
    /* n:"BrtEndSXTupleSetHeader", */
    T: -1
  },
  /*::[*/
  1030: {
    /* n:"BrtSXTupleSetHeaderItem" */
  },
  /*::[*/
  1031: {
    /* n:"BrtBeginSXTupleSetData", */
    T: 1
  },
  /*::[*/
  1032: {
    /* n:"BrtEndSXTupleSetData", */
    T: -1
  },
  /*::[*/
  1033: {
    /* n:"BrtBeginSXTupleSetRow", */
    T: 1
  },
  /*::[*/
  1034: {
    /* n:"BrtEndSXTupleSetRow", */
    T: -1
  },
  /*::[*/
  1035: {
    /* n:"BrtSXTupleSetRowItem" */
  },
  /*::[*/
  1036: {
    /* n:"BrtNameExt" */
  },
  /*::[*/
  1037: {
    /* n:"BrtPCDH14" */
  },
  /*::[*/
  1038: {
    /* n:"BrtBeginPCDCalcMem14", */
    T: 1
  },
  /*::[*/
  1039: {
    /* n:"BrtEndPCDCalcMem14", */
    T: -1
  },
  /*::[*/
  1040: {
    /* n:"BrtSXTH14" */
  },
  /*::[*/
  1041: {
    /* n:"BrtBeginSparklineGroup", */
    T: 1
  },
  /*::[*/
  1042: {
    /* n:"BrtEndSparklineGroup", */
    T: -1
  },
  /*::[*/
  1043: {
    /* n:"BrtSparkline" */
  },
  /*::[*/
  1044: {
    /* n:"BrtSXDI14" */
  },
  /*::[*/
  1045: {
    /* n:"BrtWsFmtInfoEx14" */
  },
  /*::[*/
  1046: {
    /* n:"BrtBeginConditionalFormatting14", */
    T: 1
  },
  /*::[*/
  1047: {
    /* n:"BrtEndConditionalFormatting14", */
    T: -1
  },
  /*::[*/
  1048: {
    /* n:"BrtBeginCFRule14", */
    T: 1
  },
  /*::[*/
  1049: {
    /* n:"BrtEndCFRule14", */
    T: -1
  },
  /*::[*/
  1050: {
    /* n:"BrtCFVO14" */
  },
  /*::[*/
  1051: {
    /* n:"BrtBeginDatabar14", */
    T: 1
  },
  /*::[*/
  1052: {
    /* n:"BrtBeginIconSet14", */
    T: 1
  },
  /*::[*/
  1053: {
    /* n:"BrtDVal14", */
    f: yh
  },
  /*::[*/
  1054: {
    /* n:"BrtBeginDVals14", */
    T: 1
  },
  /*::[*/
  1055: {
    /* n:"BrtColor14" */
  },
  /*::[*/
  1056: {
    /* n:"BrtBeginSparklines", */
    T: 1
  },
  /*::[*/
  1057: {
    /* n:"BrtEndSparklines", */
    T: -1
  },
  /*::[*/
  1058: {
    /* n:"BrtBeginSparklineGroups", */
    T: 1
  },
  /*::[*/
  1059: {
    /* n:"BrtEndSparklineGroups", */
    T: -1
  },
  /*::[*/
  1061: {
    /* n:"BrtSXVD14" */
  },
  /*::[*/
  1062: {
    /* n:"BrtBeginSXView14", */
    T: 1
  },
  /*::[*/
  1063: {
    /* n:"BrtEndSXView14", */
    T: -1
  },
  /*::[*/
  1064: {
    /* n:"BrtBeginSXView16", */
    T: 1
  },
  /*::[*/
  1065: {
    /* n:"BrtEndSXView16", */
    T: -1
  },
  /*::[*/
  1066: {
    /* n:"BrtBeginPCD14", */
    T: 1
  },
  /*::[*/
  1067: {
    /* n:"BrtEndPCD14", */
    T: -1
  },
  /*::[*/
  1068: {
    /* n:"BrtBeginExtConn14", */
    T: 1
  },
  /*::[*/
  1069: {
    /* n:"BrtEndExtConn14", */
    T: -1
  },
  /*::[*/
  1070: {
    /* n:"BrtBeginSlicerCacheIDs", */
    T: 1
  },
  /*::[*/
  1071: {
    /* n:"BrtEndSlicerCacheIDs", */
    T: -1
  },
  /*::[*/
  1072: {
    /* n:"BrtBeginSlicerCacheID", */
    T: 1
  },
  /*::[*/
  1073: {
    /* n:"BrtEndSlicerCacheID", */
    T: -1
  },
  /*::[*/
  1075: {
    /* n:"BrtBeginSlicerCache", */
    T: 1
  },
  /*::[*/
  1076: {
    /* n:"BrtEndSlicerCache", */
    T: -1
  },
  /*::[*/
  1077: {
    /* n:"BrtBeginSlicerCacheDef", */
    T: 1
  },
  /*::[*/
  1078: {
    /* n:"BrtEndSlicerCacheDef", */
    T: -1
  },
  /*::[*/
  1079: {
    /* n:"BrtBeginSlicersEx", */
    T: 1
  },
  /*::[*/
  1080: {
    /* n:"BrtEndSlicersEx", */
    T: -1
  },
  /*::[*/
  1081: {
    /* n:"BrtBeginSlicerEx", */
    T: 1
  },
  /*::[*/
  1082: {
    /* n:"BrtEndSlicerEx", */
    T: -1
  },
  /*::[*/
  1083: {
    /* n:"BrtBeginSlicer", */
    T: 1
  },
  /*::[*/
  1084: {
    /* n:"BrtEndSlicer", */
    T: -1
  },
  /*::[*/
  1085: {
    /* n:"BrtSlicerCachePivotTables" */
  },
  /*::[*/
  1086: {
    /* n:"BrtBeginSlicerCacheOlapImpl", */
    T: 1
  },
  /*::[*/
  1087: {
    /* n:"BrtEndSlicerCacheOlapImpl", */
    T: -1
  },
  /*::[*/
  1088: {
    /* n:"BrtBeginSlicerCacheLevelsData", */
    T: 1
  },
  /*::[*/
  1089: {
    /* n:"BrtEndSlicerCacheLevelsData", */
    T: -1
  },
  /*::[*/
  1090: {
    /* n:"BrtBeginSlicerCacheLevelData", */
    T: 1
  },
  /*::[*/
  1091: {
    /* n:"BrtEndSlicerCacheLevelData", */
    T: -1
  },
  /*::[*/
  1092: {
    /* n:"BrtBeginSlicerCacheSiRanges", */
    T: 1
  },
  /*::[*/
  1093: {
    /* n:"BrtEndSlicerCacheSiRanges", */
    T: -1
  },
  /*::[*/
  1094: {
    /* n:"BrtBeginSlicerCacheSiRange", */
    T: 1
  },
  /*::[*/
  1095: {
    /* n:"BrtEndSlicerCacheSiRange", */
    T: -1
  },
  /*::[*/
  1096: {
    /* n:"BrtSlicerCacheOlapItem" */
  },
  /*::[*/
  1097: {
    /* n:"BrtBeginSlicerCacheSelections", */
    T: 1
  },
  /*::[*/
  1098: {
    /* n:"BrtSlicerCacheSelection" */
  },
  /*::[*/
  1099: {
    /* n:"BrtEndSlicerCacheSelections", */
    T: -1
  },
  /*::[*/
  1100: {
    /* n:"BrtBeginSlicerCacheNative", */
    T: 1
  },
  /*::[*/
  1101: {
    /* n:"BrtEndSlicerCacheNative", */
    T: -1
  },
  /*::[*/
  1102: {
    /* n:"BrtSlicerCacheNativeItem" */
  },
  /*::[*/
  1103: {
    /* n:"BrtRangeProtection14" */
  },
  /*::[*/
  1104: {
    /* n:"BrtRangeProtectionIso14" */
  },
  /*::[*/
  1105: {
    /* n:"BrtCellIgnoreEC14" */
  },
  /*::[*/
  1111: {
    /* n:"BrtList14" */
  },
  /*::[*/
  1112: {
    /* n:"BrtCFIcon" */
  },
  /*::[*/
  1113: {
    /* n:"BrtBeginSlicerCachesPivotCacheIDs", */
    T: 1
  },
  /*::[*/
  1114: {
    /* n:"BrtEndSlicerCachesPivotCacheIDs", */
    T: -1
  },
  /*::[*/
  1115: {
    /* n:"BrtBeginSlicers", */
    T: 1
  },
  /*::[*/
  1116: {
    /* n:"BrtEndSlicers", */
    T: -1
  },
  /*::[*/
  1117: {
    /* n:"BrtWbProp14" */
  },
  /*::[*/
  1118: {
    /* n:"BrtBeginSXEdit", */
    T: 1
  },
  /*::[*/
  1119: {
    /* n:"BrtEndSXEdit", */
    T: -1
  },
  /*::[*/
  1120: {
    /* n:"BrtBeginSXEdits", */
    T: 1
  },
  /*::[*/
  1121: {
    /* n:"BrtEndSXEdits", */
    T: -1
  },
  /*::[*/
  1122: {
    /* n:"BrtBeginSXChange", */
    T: 1
  },
  /*::[*/
  1123: {
    /* n:"BrtEndSXChange", */
    T: -1
  },
  /*::[*/
  1124: {
    /* n:"BrtBeginSXChanges", */
    T: 1
  },
  /*::[*/
  1125: {
    /* n:"BrtEndSXChanges", */
    T: -1
  },
  /*::[*/
  1126: {
    /* n:"BrtSXTupleItems" */
  },
  /*::[*/
  1128: {
    /* n:"BrtBeginSlicerStyle", */
    T: 1
  },
  /*::[*/
  1129: {
    /* n:"BrtEndSlicerStyle", */
    T: -1
  },
  /*::[*/
  1130: {
    /* n:"BrtSlicerStyleElement" */
  },
  /*::[*/
  1131: {
    /* n:"BrtBeginStyleSheetExt14", */
    T: 1
  },
  /*::[*/
  1132: {
    /* n:"BrtEndStyleSheetExt14", */
    T: -1
  },
  /*::[*/
  1133: {
    /* n:"BrtBeginSlicerCachesPivotCacheID", */
    T: 1
  },
  /*::[*/
  1134: {
    /* n:"BrtEndSlicerCachesPivotCacheID", */
    T: -1
  },
  /*::[*/
  1135: {
    /* n:"BrtBeginConditionalFormattings", */
    T: 1
  },
  /*::[*/
  1136: {
    /* n:"BrtEndConditionalFormattings", */
    T: -1
  },
  /*::[*/
  1137: {
    /* n:"BrtBeginPCDCalcMemExt", */
    T: 1
  },
  /*::[*/
  1138: {
    /* n:"BrtEndPCDCalcMemExt", */
    T: -1
  },
  /*::[*/
  1139: {
    /* n:"BrtBeginPCDCalcMemsExt", */
    T: 1
  },
  /*::[*/
  1140: {
    /* n:"BrtEndPCDCalcMemsExt", */
    T: -1
  },
  /*::[*/
  1141: {
    /* n:"BrtPCDField14" */
  },
  /*::[*/
  1142: {
    /* n:"BrtBeginSlicerStyles", */
    T: 1
  },
  /*::[*/
  1143: {
    /* n:"BrtEndSlicerStyles", */
    T: -1
  },
  /*::[*/
  1144: {
    /* n:"BrtBeginSlicerStyleElements", */
    T: 1
  },
  /*::[*/
  1145: {
    /* n:"BrtEndSlicerStyleElements", */
    T: -1
  },
  /*::[*/
  1146: {
    /* n:"BrtCFRuleExt" */
  },
  /*::[*/
  1147: {
    /* n:"BrtBeginSXCondFmt14", */
    T: 1
  },
  /*::[*/
  1148: {
    /* n:"BrtEndSXCondFmt14", */
    T: -1
  },
  /*::[*/
  1149: {
    /* n:"BrtBeginSXCondFmts14", */
    T: 1
  },
  /*::[*/
  1150: {
    /* n:"BrtEndSXCondFmts14", */
    T: -1
  },
  /*::[*/
  1152: {
    /* n:"BrtBeginSortCond14", */
    T: 1
  },
  /*::[*/
  1153: {
    /* n:"BrtEndSortCond14", */
    T: -1
  },
  /*::[*/
  1154: {
    /* n:"BrtEndDVals14", */
    T: -1
  },
  /*::[*/
  1155: {
    /* n:"BrtEndIconSet14", */
    T: -1
  },
  /*::[*/
  1156: {
    /* n:"BrtEndDatabar14", */
    T: -1
  },
  /*::[*/
  1157: {
    /* n:"BrtBeginColorScale14", */
    T: 1
  },
  /*::[*/
  1158: {
    /* n:"BrtEndColorScale14", */
    T: -1
  },
  /*::[*/
  1159: {
    /* n:"BrtBeginSxrules14", */
    T: 1
  },
  /*::[*/
  1160: {
    /* n:"BrtEndSxrules14", */
    T: -1
  },
  /*::[*/
  1161: {
    /* n:"BrtBeginPRule14", */
    T: 1
  },
  /*::[*/
  1162: {
    /* n:"BrtEndPRule14", */
    T: -1
  },
  /*::[*/
  1163: {
    /* n:"BrtBeginPRFilters14", */
    T: 1
  },
  /*::[*/
  1164: {
    /* n:"BrtEndPRFilters14", */
    T: -1
  },
  /*::[*/
  1165: {
    /* n:"BrtBeginPRFilter14", */
    T: 1
  },
  /*::[*/
  1166: {
    /* n:"BrtEndPRFilter14", */
    T: -1
  },
  /*::[*/
  1167: {
    /* n:"BrtBeginPRFItem14", */
    T: 1
  },
  /*::[*/
  1168: {
    /* n:"BrtEndPRFItem14", */
    T: -1
  },
  /*::[*/
  1169: {
    /* n:"BrtBeginCellIgnoreECs14", */
    T: 1
  },
  /*::[*/
  1170: {
    /* n:"BrtEndCellIgnoreECs14", */
    T: -1
  },
  /*::[*/
  1171: {
    /* n:"BrtDxf14" */
  },
  /*::[*/
  1172: {
    /* n:"BrtBeginDxF14s", */
    T: 1
  },
  /*::[*/
  1173: {
    /* n:"BrtEndDxf14s", */
    T: -1
  },
  /*::[*/
  1177: {
    /* n:"BrtFilter14" */
  },
  /*::[*/
  1178: {
    /* n:"BrtBeginCustomFilters14", */
    T: 1
  },
  /*::[*/
  1180: {
    /* n:"BrtCustomFilter14" */
  },
  /*::[*/
  1181: {
    /* n:"BrtIconFilter14" */
  },
  /*::[*/
  1182: {
    /* n:"BrtPivotCacheConnectionName" */
  },
  /*::[*/
  2048: {
    /* n:"BrtBeginDecoupledPivotCacheIDs", */
    T: 1
  },
  /*::[*/
  2049: {
    /* n:"BrtEndDecoupledPivotCacheIDs", */
    T: -1
  },
  /*::[*/
  2050: {
    /* n:"BrtDecoupledPivotCacheID" */
  },
  /*::[*/
  2051: {
    /* n:"BrtBeginPivotTableRefs", */
    T: 1
  },
  /*::[*/
  2052: {
    /* n:"BrtEndPivotTableRefs", */
    T: -1
  },
  /*::[*/
  2053: {
    /* n:"BrtPivotTableRef" */
  },
  /*::[*/
  2054: {
    /* n:"BrtSlicerCacheBookPivotTables" */
  },
  /*::[*/
  2055: {
    /* n:"BrtBeginSxvcells", */
    T: 1
  },
  /*::[*/
  2056: {
    /* n:"BrtEndSxvcells", */
    T: -1
  },
  /*::[*/
  2057: {
    /* n:"BrtBeginSxRow", */
    T: 1
  },
  /*::[*/
  2058: {
    /* n:"BrtEndSxRow", */
    T: -1
  },
  /*::[*/
  2060: {
    /* n:"BrtPcdCalcMem15" */
  },
  /*::[*/
  2067: {
    /* n:"BrtQsi15" */
  },
  /*::[*/
  2068: {
    /* n:"BrtBeginWebExtensions", */
    T: 1
  },
  /*::[*/
  2069: {
    /* n:"BrtEndWebExtensions", */
    T: -1
  },
  /*::[*/
  2070: {
    /* n:"BrtWebExtension" */
  },
  /*::[*/
  2071: {
    /* n:"BrtAbsPath15" */
  },
  /*::[*/
  2072: {
    /* n:"BrtBeginPivotTableUISettings", */
    T: 1
  },
  /*::[*/
  2073: {
    /* n:"BrtEndPivotTableUISettings", */
    T: -1
  },
  /*::[*/
  2075: {
    /* n:"BrtTableSlicerCacheIDs" */
  },
  /*::[*/
  2076: {
    /* n:"BrtTableSlicerCacheID" */
  },
  /*::[*/
  2077: {
    /* n:"BrtBeginTableSlicerCache", */
    T: 1
  },
  /*::[*/
  2078: {
    /* n:"BrtEndTableSlicerCache", */
    T: -1
  },
  /*::[*/
  2079: {
    /* n:"BrtSxFilter15" */
  },
  /*::[*/
  2080: {
    /* n:"BrtBeginTimelineCachePivotCacheIDs", */
    T: 1
  },
  /*::[*/
  2081: {
    /* n:"BrtEndTimelineCachePivotCacheIDs", */
    T: -1
  },
  /*::[*/
  2082: {
    /* n:"BrtTimelineCachePivotCacheID" */
  },
  /*::[*/
  2083: {
    /* n:"BrtBeginTimelineCacheIDs", */
    T: 1
  },
  /*::[*/
  2084: {
    /* n:"BrtEndTimelineCacheIDs", */
    T: -1
  },
  /*::[*/
  2085: {
    /* n:"BrtBeginTimelineCacheID", */
    T: 1
  },
  /*::[*/
  2086: {
    /* n:"BrtEndTimelineCacheID", */
    T: -1
  },
  /*::[*/
  2087: {
    /* n:"BrtBeginTimelinesEx", */
    T: 1
  },
  /*::[*/
  2088: {
    /* n:"BrtEndTimelinesEx", */
    T: -1
  },
  /*::[*/
  2089: {
    /* n:"BrtBeginTimelineEx", */
    T: 1
  },
  /*::[*/
  2090: {
    /* n:"BrtEndTimelineEx", */
    T: -1
  },
  /*::[*/
  2091: {
    /* n:"BrtWorkBookPr15" */
  },
  /*::[*/
  2092: {
    /* n:"BrtPCDH15" */
  },
  /*::[*/
  2093: {
    /* n:"BrtBeginTimelineStyle", */
    T: 1
  },
  /*::[*/
  2094: {
    /* n:"BrtEndTimelineStyle", */
    T: -1
  },
  /*::[*/
  2095: {
    /* n:"BrtTimelineStyleElement" */
  },
  /*::[*/
  2096: {
    /* n:"BrtBeginTimelineStylesheetExt15", */
    T: 1
  },
  /*::[*/
  2097: {
    /* n:"BrtEndTimelineStylesheetExt15", */
    T: -1
  },
  /*::[*/
  2098: {
    /* n:"BrtBeginTimelineStyles", */
    T: 1
  },
  /*::[*/
  2099: {
    /* n:"BrtEndTimelineStyles", */
    T: -1
  },
  /*::[*/
  2100: {
    /* n:"BrtBeginTimelineStyleElements", */
    T: 1
  },
  /*::[*/
  2101: {
    /* n:"BrtEndTimelineStyleElements", */
    T: -1
  },
  /*::[*/
  2102: {
    /* n:"BrtDxf15" */
  },
  /*::[*/
  2103: {
    /* n:"BrtBeginDxfs15", */
    T: 1
  },
  /*::[*/
  2104: {
    /* n:"BrtEndDxfs15", */
    T: -1
  },
  /*::[*/
  2105: {
    /* n:"BrtSlicerCacheHideItemsWithNoData" */
  },
  /*::[*/
  2106: {
    /* n:"BrtBeginItemUniqueNames", */
    T: 1
  },
  /*::[*/
  2107: {
    /* n:"BrtEndItemUniqueNames", */
    T: -1
  },
  /*::[*/
  2108: {
    /* n:"BrtItemUniqueName" */
  },
  /*::[*/
  2109: {
    /* n:"BrtBeginExtConn15", */
    T: 1
  },
  /*::[*/
  2110: {
    /* n:"BrtEndExtConn15", */
    T: -1
  },
  /*::[*/
  2111: {
    /* n:"BrtBeginOledbPr15", */
    T: 1
  },
  /*::[*/
  2112: {
    /* n:"BrtEndOledbPr15", */
    T: -1
  },
  /*::[*/
  2113: {
    /* n:"BrtBeginDataFeedPr15", */
    T: 1
  },
  /*::[*/
  2114: {
    /* n:"BrtEndDataFeedPr15", */
    T: -1
  },
  /*::[*/
  2115: {
    /* n:"BrtTextPr15" */
  },
  /*::[*/
  2116: {
    /* n:"BrtRangePr15" */
  },
  /*::[*/
  2117: {
    /* n:"BrtDbCommand15" */
  },
  /*::[*/
  2118: {
    /* n:"BrtBeginDbTables15", */
    T: 1
  },
  /*::[*/
  2119: {
    /* n:"BrtEndDbTables15", */
    T: -1
  },
  /*::[*/
  2120: {
    /* n:"BrtDbTable15" */
  },
  /*::[*/
  2121: {
    /* n:"BrtBeginDataModel", */
    T: 1
  },
  /*::[*/
  2122: {
    /* n:"BrtEndDataModel", */
    T: -1
  },
  /*::[*/
  2123: {
    /* n:"BrtBeginModelTables", */
    T: 1
  },
  /*::[*/
  2124: {
    /* n:"BrtEndModelTables", */
    T: -1
  },
  /*::[*/
  2125: {
    /* n:"BrtModelTable" */
  },
  /*::[*/
  2126: {
    /* n:"BrtBeginModelRelationships", */
    T: 1
  },
  /*::[*/
  2127: {
    /* n:"BrtEndModelRelationships", */
    T: -1
  },
  /*::[*/
  2128: {
    /* n:"BrtModelRelationship" */
  },
  /*::[*/
  2129: {
    /* n:"BrtBeginECTxtWiz15", */
    T: 1
  },
  /*::[*/
  2130: {
    /* n:"BrtEndECTxtWiz15", */
    T: -1
  },
  /*::[*/
  2131: {
    /* n:"BrtBeginECTWFldInfoLst15", */
    T: 1
  },
  /*::[*/
  2132: {
    /* n:"BrtEndECTWFldInfoLst15", */
    T: -1
  },
  /*::[*/
  2133: {
    /* n:"BrtBeginECTWFldInfo15", */
    T: 1
  },
  /*::[*/
  2134: {
    /* n:"BrtFieldListActiveItem" */
  },
  /*::[*/
  2135: {
    /* n:"BrtPivotCacheIdVersion" */
  },
  /*::[*/
  2136: {
    /* n:"BrtSXDI15" */
  },
  /*::[*/
  2137: {
    /* n:"BrtBeginModelTimeGroupings", */
    T: 1
  },
  /*::[*/
  2138: {
    /* n:"BrtEndModelTimeGroupings", */
    T: -1
  },
  /*::[*/
  2139: {
    /* n:"BrtBeginModelTimeGrouping", */
    T: 1
  },
  /*::[*/
  2140: {
    /* n:"BrtEndModelTimeGrouping", */
    T: -1
  },
  /*::[*/
  2141: {
    /* n:"BrtModelTimeGroupingCalcCol" */
  },
  /*::[*/
  3072: {
    /* n:"BrtUid" */
  },
  /*::[*/
  3073: {
    /* n:"BrtRevisionPtr" */
  },
  /*::[*/
  4096: {
    /* n:"BrtBeginDynamicArrayPr", */
    T: 1
  },
  /*::[*/
  4097: {
    /* n:"BrtEndDynamicArrayPr", */
    T: -1
  },
  /*::[*/
  5002: {
    /* n:"BrtBeginRichValueBlock", */
    T: 1
  },
  /*::[*/
  5003: {
    /* n:"BrtEndRichValueBlock", */
    T: -1
  },
  /*::[*/
  5081: {
    /* n:"BrtBeginRichFilters", */
    T: 1
  },
  /*::[*/
  5082: {
    /* n:"BrtEndRichFilters", */
    T: -1
  },
  /*::[*/
  5083: {
    /* n:"BrtRichFilter" */
  },
  /*::[*/
  5084: {
    /* n:"BrtBeginRichFilterColumn", */
    T: 1
  },
  /*::[*/
  5085: {
    /* n:"BrtEndRichFilterColumn", */
    T: -1
  },
  /*::[*/
  5086: {
    /* n:"BrtBeginCustomRichFilters", */
    T: 1
  },
  /*::[*/
  5087: {
    /* n:"BrtEndCustomRichFilters", */
    T: -1
  },
  /*::[*/
  5088: {
    /* n:"BrtCustomRichFilter" */
  },
  /*::[*/
  5089: {
    /* n:"BrtTop10RichFilter" */
  },
  /*::[*/
  5090: {
    /* n:"BrtDynamicRichFilter" */
  },
  /*::[*/
  5092: {
    /* n:"BrtBeginRichSortCondition", */
    T: 1
  },
  /*::[*/
  5093: {
    /* n:"BrtEndRichSortCondition", */
    T: -1
  },
  /*::[*/
  5094: {
    /* n:"BrtRichFilterDateGroupItem" */
  },
  /*::[*/
  5095: {
    /* n:"BrtBeginCalcFeatures", */
    T: 1
  },
  /*::[*/
  5096: {
    /* n:"BrtEndCalcFeatures", */
    T: -1
  },
  /*::[*/
  5097: {
    /* n:"BrtCalcFeature" */
  },
  /*::[*/
  5099: {
    /* n:"BrtExternalLinksPr" */
  },
  /*::[*/
  65535: { n: "" }
};
function re(e, r, t, n) {
  var a = r;
  if (!isNaN(a)) {
    var i = n || (t || []).length || 0, s = e.next(4);
    s.write_shift(2, a), s.write_shift(2, i), /*:: len != null &&*/
    i > 0 && Xa(t) && e.push(t);
  }
}
function Td(e, r, t, n) {
  var a = (t || []).length || 0;
  if (a <= 8224) return re(e, r, t, a);
  var i = r;
  if (!isNaN(i)) {
    for (var s = t.parts || [], l = 0, f = 0, o = 0; o + (s[l] || 8224) <= 8224; )
      o += s[l] || 8224, l++;
    var c = e.next(4);
    for (c.write_shift(2, i), c.write_shift(2, o), e.push(t.slice(f, f + o)), f += o; f < a; ) {
      for (c = e.next(4), c.write_shift(2, 60), o = 0; o + (s[l] || 8224) <= 8224; )
        o += s[l] || 8224, l++;
      c.write_shift(2, o), e.push(t.slice(f, f + o)), f += o;
    }
  }
}
function Dn(e, r, t) {
  return e || (e = U(7)), e.write_shift(2, r), e.write_shift(2, t), e.write_shift(2, 0), e.write_shift(1, 0), e;
}
function Ed(e, r, t, n) {
  var a = U(9);
  return Dn(a, e, r), qi(t, n || "b", a), a;
}
function wd(e, r, t) {
  var n = U(8 + 2 * t.length);
  return Dn(n, e, r), n.write_shift(1, t.length), n.write_shift(t.length, t, "sbcs"), n.l < n.length ? n.slice(0, n.l) : n;
}
function Sd(e, r, t, n) {
  if (r.v != null) switch (r.t) {
    case "d":
    case "n":
      var a = r.t == "d" ? At(Tt(r.v)) : r.v;
      a == (a | 0) && a >= 0 && a < 65536 ? re(e, 2, Bo(t, n, a)) : re(e, 3, Mo(t, n, a));
      return;
    case "b":
    case "e":
      re(e, 5, Ed(t, n, r.v, r.t));
      return;
    case "s":
    case "str":
      re(e, 4, wd(t, n, (r.v || "").slice(0, 255)));
      return;
  }
  re(e, 1, Dn(null, t, n));
}
function Ad(e, r, t, n) {
  var a = Array.isArray(r), i = He(r["!ref"] || "A1"), s, l = "", f = [];
  if (i.e.c > 255 || i.e.r > 16383) {
    if (n.WTF) throw new Error("Range " + (r["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    i.e.c = Math.min(i.e.c, 255), i.e.r = Math.min(i.e.c, 16383), s = Qe(i);
  }
  for (var o = i.s.r; o <= i.e.r; ++o) {
    l = ht(o);
    for (var c = i.s.c; c <= i.e.c; ++c) {
      o === i.s.r && (f[c] = vt(c)), s = f[c] + l;
      var x = a ? (r[o] || [])[c] : r[s];
      x && Sd(e, x, o, c);
    }
  }
}
function yd(e, r) {
  for (var t = r || {}, n = St(), a = 0, i = 0; i < e.SheetNames.length; ++i) e.SheetNames[i] == t.sheet && (a = i);
  if (a == 0 && t.sheet && e.SheetNames[0] != t.sheet) throw new Error("Sheet not found: " + t.sheet);
  return re(n, t.biff == 4 ? 1033 : t.biff == 3 ? 521 : 9, qa(e, 16, t)), Ad(n, e.Sheets[e.SheetNames[a]], a, t), re(n, 10), n.end();
}
function Fd(e, r, t) {
  re(e, 49, _o({
    sz: 12,
    name: "Arial"
  }, t));
}
function kd(e, r, t) {
  r && [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(n) {
    for (var a = n[0]; a <= n[1]; ++a) r[a] != null && re(e, 1054, wo(a, r[a], t));
  });
}
function Cd(e, r) {
  var t = U(19);
  t.write_shift(4, 2151), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(2, 3), t.write_shift(1, 1), t.write_shift(4, 0), re(e, 2151, t), t = U(39), t.write_shift(4, 2152), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(2, 3), t.write_shift(1, 0), t.write_shift(4, 0), t.write_shift(2, 1), t.write_shift(4, 4), t.write_shift(2, 0), ts(He(r["!ref"] || "A1"), t), t.write_shift(4, 4), re(e, 2152, t);
}
function Dd(e, r) {
  for (var t = 0; t < 16; ++t) re(e, 224, j0({ numFmtId: 0, style: !0 }, 0, r));
  r.cellXfs.forEach(function(n) {
    re(e, 224, j0(n, 0, r));
  });
}
function Od(e, r) {
  for (var t = 0; t < r["!links"].length; ++t) {
    var n = r["!links"][t];
    re(e, 440, Oo(n)), n[1].Tooltip && re(e, 2048, Io(n));
  }
  delete r["!links"];
}
function Id(e, r) {
  if (r) {
    var t = 0;
    r.forEach(function(n, a) {
      ++t <= 256 && n && re(e, 125, Po(ua(a, n), a));
    });
  }
}
function Rd(e, r, t, n, a) {
  var i = 16 + gr(a.cellXfs, r, a);
  if (r.v == null && !r.bf) {
    re(e, 513, Dr(t, n, i));
    return;
  }
  if (r.bf) re(e, 6, r1(r, t, n, a, i));
  else switch (r.t) {
    case "d":
    case "n":
      var s = r.t == "d" ? At(Tt(r.v)) : r.v;
      re(e, 515, Fo(t, n, s, i));
      break;
    case "b":
    case "e":
      re(e, 517, yo(t, n, r.v, i, a, r.t));
      break;
    case "s":
    case "str":
      if (a.bookSST) {
        var l = n0(a.Strings, r.v, a.revStrings);
        re(e, 253, To(t, n, l, i));
      } else re(e, 516, Eo(t, n, (r.v || "").slice(0, 255), i, a));
      break;
    default:
      re(e, 513, Dr(t, n, i));
  }
}
function Nd(e, r, t) {
  var n = St(), a = t.SheetNames[e], i = t.Sheets[a] || {}, s = (t || {}).Workbook || {}, l = (s.Sheets || [])[e] || {}, f = Array.isArray(i), o = r.biff == 8, c, x = "", p = [], v = He(i["!ref"] || "A1"), T = o ? 65536 : 16384;
  if (v.e.c > 255 || v.e.r >= T) {
    if (r.WTF) throw new Error("Range " + (i["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    v.e.c = Math.min(v.e.c, 255), v.e.r = Math.min(v.e.c, T - 1);
  }
  re(n, 2057, qa(t, 16, r)), re(n, 13, Pt(1)), re(n, 12, Pt(100)), re(n, 15, _t(!0)), re(n, 17, _t(!1)), re(n, 16, Cr(1e-3)), re(n, 95, _t(!0)), re(n, 42, _t(!1)), re(n, 43, _t(!1)), re(n, 130, Pt(1)), re(n, 128, Ao()), re(n, 131, _t(!1)), re(n, 132, _t(!1)), o && Id(n, i["!cols"]), re(n, 512, So(v, r)), o && (i["!links"] = []);
  for (var u = v.s.r; u <= v.e.r; ++u) {
    x = ht(u);
    for (var h = v.s.c; h <= v.e.c; ++h) {
      u === v.s.r && (p[h] = vt(h)), c = p[h] + x;
      var y = f ? (i[u] || [])[h] : i[c];
      y && (Rd(n, y, u, h, r), o && y.l && i["!links"].push([c, y.l]));
    }
  }
  var C = l.CodeName || l.name || a;
  return o && re(n, 574, go((s.Views || [])[0])), o && (i["!merges"] || []).length && re(n, 229, Do(i["!merges"])), o && Od(n, i), re(n, 442, es(C)), o && Cd(n, i), re(
    n,
    10
    /* EOF */
  ), n.end();
}
function Pd(e, r, t) {
  var n = St(), a = (e || {}).Workbook || {}, i = a.Sheets || [], s = (
    /*::((*/
    a.WBProps || {
      /*::CodeName:"ThisWorkbook"*/
    }
  ), l = t.biff == 8, f = t.biff == 5;
  if (re(n, 2057, qa(e, 5, t)), t.bookType == "xla" && re(
    n,
    135
    /* Addin */
  ), re(n, 225, l ? Pt(1200) : null), re(n, 193, ao(2)), f && re(
    n,
    191
    /* ToolbarHdr */
  ), f && re(
    n,
    192
    /* ToolbarEnd */
  ), re(
    n,
    226
    /* InterfaceEnd */
  ), re(n, 92, xo("SheetJS", t)), re(n, 66, Pt(l ? 1200 : 1252)), l && re(n, 353, Pt(0)), l && re(
    n,
    448
    /* Excel9File */
  ), re(n, 317, Lo(e.SheetNames.length)), l && e.vbaraw && re(
    n,
    211
    /* ObProj */
  ), l && e.vbaraw) {
    var o = s.CodeName || "ThisWorkbook";
    re(n, 442, es(o));
  }
  re(n, 156, Pt(17)), re(n, 25, _t(!1)), re(n, 18, _t(!1)), re(n, 19, Pt(0)), l && re(n, 431, _t(!1)), l && re(n, 444, Pt(0)), re(n, 61, mo()), re(n, 64, _t(!1)), re(n, 141, Pt(0)), re(n, 34, _t(Uh(e) == "true")), re(n, 14, _t(!0)), l && re(n, 439, _t(!1)), re(n, 218, Pt(0)), Fd(n, e, t), kd(n, e.SSF, t), Dd(n, t), l && re(n, 352, _t(!1));
  var c = n.end(), x = St();
  l && re(x, 140, Ro()), l && t.Strings && Td(x, 252, po(t.Strings)), re(
    x,
    10
    /* EOF */
  );
  var p = x.end(), v = St(), T = 0, u = 0;
  for (u = 0; u < e.SheetNames.length; ++u) T += (l ? 12 : 11) + (l ? 2 : 1) * e.SheetNames[u].length;
  var h = c.length + T + p.length;
  for (u = 0; u < e.SheetNames.length; ++u) {
    var y = i[u] || {};
    re(v, 133, vo({ pos: h, hs: y.Hidden || 0, dt: 0, name: e.SheetNames[u] }, t)), h += r[u].length;
  }
  var C = v.end();
  if (T != C.length) throw new Error("BS8 " + T + " != " + C.length);
  var D = [];
  return c.length && D.push(c), C.length && D.push(C), p.length && D.push(p), ct(D);
}
function Ld(e, r) {
  var t = r || {}, n = [];
  e && !e.SSF && (e.SSF = yt(Je)), e && e.SSF && (sa(), ia(e.SSF), t.revssf = la(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, a0(t), t.cellXfs = [], gr(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {});
  for (var a = 0; a < e.SheetNames.length; ++a) n[n.length] = Nd(a, t, e);
  return n.unshift(Pd(e, n, t)), ct(n);
}
function ks(e, r) {
  for (var t = 0; t <= e.SheetNames.length; ++t) {
    var n = e.Sheets[e.SheetNames[t]];
    if (!(!n || !n["!ref"])) {
      var a = Rt(n["!ref"]);
      a.e.c > 255 && typeof console < "u" && console.error && console.error("Worksheet '" + e.SheetNames[t] + "' extends beyond column IV (255).  Data may be lost.");
    }
  }
  var i = r || {};
  switch (i.biff || 2) {
    case 8:
    case 5:
      return Ld(e, r);
    case 4:
    case 3:
    case 2:
      return yd(e, r);
  }
  throw new Error("invalid type " + i.bookType + " for BIFF");
}
function Md(e, r, t, n) {
  for (var a = e["!merges"] || [], i = [], s = r.s.c; s <= r.e.c; ++s) {
    for (var l = 0, f = 0, o = 0; o < a.length; ++o)
      if (!(a[o].s.r > t || a[o].s.c > s) && !(a[o].e.r < t || a[o].e.c < s)) {
        if (a[o].s.r < t || a[o].s.c < s) {
          l = -1;
          break;
        }
        l = a[o].e.r - a[o].s.r + 1, f = a[o].e.c - a[o].s.c + 1;
        break;
      }
    if (!(l < 0)) {
      var c = Ue({ r: t, c: s }), x = n.dense ? (e[t] || [])[s] : e[c], p = x && x.v != null && (x.h || hf(x.w || (nr(x), x.w) || "")) || "", v = {};
      l > 1 && (v.rowspan = l), f > 1 && (v.colspan = f), n.editable ? p = '<span contenteditable="true">' + p + "</span>" : x && (v["data-t"] = x && x.t || "z", x.v != null && (v["data-v"] = x.v), x.z != null && (v["data-z"] = x.z), x.l && (x.l.Target || "#").charAt(0) != "#" && (p = '<a href="' + x.l.Target + '">' + p + "</a>")), v.id = (n.id || "sjs") + "-" + c, i.push(te("td", p, v));
    }
  }
  var T = "<tr>";
  return T + i.join("") + "</tr>";
}
var Bd = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>', bd = "</body></html>";
function Ud(e, r, t) {
  var n = [];
  return n.join("") + "<table" + (t && t.id ? ' id="' + t.id + '"' : "") + ">";
}
function Cs(e, r) {
  var t = r || {}, n = t.header != null ? t.header : Bd, a = t.footer != null ? t.footer : bd, i = [n], s = Rt(e["!ref"]);
  t.dense = Array.isArray(e), i.push(Ud(e, s, t));
  for (var l = s.s.r; l <= s.e.r; ++l) i.push(Md(e, s, l, t));
  return i.push("</table>" + a), i.join("");
}
function Ds(e, r, t) {
  var n = t || {}, a = 0, i = 0;
  if (n.origin != null)
    if (typeof n.origin == "number") a = n.origin;
    else {
      var s = typeof n.origin == "string" ? it(n.origin) : n.origin;
      a = s.r, i = s.c;
    }
  var l = r.getElementsByTagName("tr"), f = Math.min(n.sheetRows || 1e7, l.length), o = { s: { r: 0, c: 0 }, e: { r: a, c: i } };
  if (e["!ref"]) {
    var c = Rt(e["!ref"]);
    o.s.r = Math.min(o.s.r, c.s.r), o.s.c = Math.min(o.s.c, c.s.c), o.e.r = Math.max(o.e.r, c.e.r), o.e.c = Math.max(o.e.c, c.e.c), a == -1 && (o.e.r = a = c.e.r + 1);
  }
  var x = [], p = 0, v = e["!rows"] || (e["!rows"] = []), T = 0, u = 0, h = 0, y = 0, C = 0, D = 0;
  for (e["!cols"] || (e["!cols"] = []); T < l.length && u < f; ++T) {
    var L = l[T];
    if (q0(L)) {
      if (n.display) continue;
      v[u] = { hidden: !0 };
    }
    var q = L.children;
    for (h = y = 0; h < q.length; ++h) {
      var se = q[h];
      if (!(n.display && q0(se))) {
        var O = se.hasAttribute("data-v") ? se.getAttribute("data-v") : se.hasAttribute("v") ? se.getAttribute("v") : pf(se.innerHTML), V = se.getAttribute("data-z") || se.getAttribute("z");
        for (p = 0; p < x.length; ++p) {
          var M = x[p];
          M.s.c == y + i && M.s.r < u + a && u + a <= M.e.r && (y = M.e.c + 1 - i, p = -1);
        }
        D = +se.getAttribute("colspan") || 1, ((C = +se.getAttribute("rowspan") || 1) > 1 || D > 1) && x.push({ s: { r: u + a, c: y + i }, e: { r: u + a + (C || 1) - 1, c: y + i + (D || 1) - 1 } });
        var G = { t: "s", v: O }, z = se.getAttribute("data-t") || se.getAttribute("t") || "";
        O != null && (O.length == 0 ? G.t = z || "z" : n.raw || O.trim().length == 0 || z == "s" || (O === "TRUE" ? G = { t: "b", v: !0 } : O === "FALSE" ? G = { t: "b", v: !1 } : isNaN(er(O)) ? isNaN(gn(O).getDate()) || (G = { t: "d", v: Tt(O) }, n.cellDates || (G = { t: "n", v: At(G.v) }), G.z = n.dateNF || Je[14]) : G = { t: "n", v: er(O) })), G.z === void 0 && V != null && (G.z = V);
        var K = "", fe = se.getElementsByTagName("A");
        if (fe && fe.length) for (var pe = 0; pe < fe.length && !(fe[pe].hasAttribute("href") && (K = fe[pe].getAttribute("href"), K.charAt(0) != "#")); ++pe) ;
        K && K.charAt(0) != "#" && (G.l = { Target: K }), n.dense ? (e[u + a] || (e[u + a] = []), e[u + a][y + i] = G) : e[Ue({ c: y + i, r: u + a })] = G, o.e.c < y + i && (o.e.c = y + i), y += D;
      }
    }
    ++u;
  }
  return x.length && (e["!merges"] = (e["!merges"] || []).concat(x)), o.e.r = Math.max(o.e.r, u - 1 + a), e["!ref"] = Qe(o), u >= f && (e["!fullref"] = Qe((o.e.r = l.length - T + u - 1 + a, o))), e;
}
function Os(e, r) {
  var t = r || {}, n = t.dense ? [] : {};
  return Ds(n, e, r);
}
function Wd(e, r) {
  return Or(Os(e, r), r);
}
function q0(e) {
  var r = "", t = $d(e);
  return t && (r = t(e).getPropertyValue("display")), r || (r = e.style && e.style.display), r === "none";
}
function $d(e) {
  return e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle == "function" ? e.ownerDocument.defaultView.getComputedStyle : typeof getComputedStyle == "function" ? getComputedStyle : null;
}
var Vd = /* @__PURE__ */ function() {
  var e = [
    "<office:master-styles>",
    '<style:master-page style:name="mp1" style:page-layout-name="mp1">',
    "<style:header/>",
    '<style:header-left style:display="false"/>',
    "<style:footer/>",
    '<style:footer-left style:display="false"/>',
    "</style:master-page>",
    "</office:master-styles>"
  ].join(""), r = "<office:document-styles " + Tn({
    "xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
    "xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
    "xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
    "xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
    "xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
    "xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    "xmlns:dc": "http://purl.org/dc/elements/1.1/",
    "xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
    "xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
    "xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
    "office:version": "1.2"
  }) + ">" + e + "</office:document-styles>";
  return function() {
    return et + r;
  };
}(), Q0 = /* @__PURE__ */ function() {
  var e = function(i) {
    return be(i).replace(/  +/g, function(s) {
      return '<text:s text:c="' + s.length + '"/>';
    }).replace(/\t/g, "<text:tab/>").replace(/\n/g, "</text:p><text:p>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>");
  }, r = `          <table:table-cell />
`, t = `          <table:covered-table-cell/>
`, n = function(i, s, l) {
    var f = [];
    f.push('      <table:table table:name="' + be(s.SheetNames[l]) + `" table:style-name="ta1">
`);
    var o = 0, c = 0, x = Rt(i["!ref"] || "A1"), p = i["!merges"] || [], v = 0, T = Array.isArray(i);
    if (i["!cols"])
      for (c = 0; c <= x.e.c; ++c) f.push("        <table:table-column" + (i["!cols"][c] ? ' table:style-name="co' + i["!cols"][c].ods + '"' : "") + `></table:table-column>
`);
    var u = "", h = i["!rows"] || [];
    for (o = 0; o < x.s.r; ++o)
      u = h[o] ? ' table:style-name="ro' + h[o].ods + '"' : "", f.push("        <table:table-row" + u + `></table:table-row>
`);
    for (; o <= x.e.r; ++o) {
      for (u = h[o] ? ' table:style-name="ro' + h[o].ods + '"' : "", f.push("        <table:table-row" + u + `>
`), c = 0; c < x.s.c; ++c) f.push(r);
      for (; c <= x.e.c; ++c) {
        var y = !1, C = {}, D = "";
        for (v = 0; v != p.length; ++v)
          if (!(p[v].s.c > c) && !(p[v].s.r > o) && !(p[v].e.c < c) && !(p[v].e.r < o)) {
            (p[v].s.c != c || p[v].s.r != o) && (y = !0), C["table:number-columns-spanned"] = p[v].e.c - p[v].s.c + 1, C["table:number-rows-spanned"] = p[v].e.r - p[v].s.r + 1;
            break;
          }
        if (y) {
          f.push(t);
          continue;
        }
        var L = Ue({ r: o, c }), q = T ? (i[o] || [])[c] : i[L];
        if (q && q.f && (C["table:formula"] = be(f1(q.f)), q.F && q.F.slice(0, L.length) == L)) {
          var se = Rt(q.F);
          C["table:number-matrix-columns-spanned"] = se.e.c - se.s.c + 1, C["table:number-matrix-rows-spanned"] = se.e.r - se.s.r + 1;
        }
        if (!q) {
          f.push(r);
          continue;
        }
        switch (q.t) {
          case "b":
            D = q.v ? "TRUE" : "FALSE", C["office:value-type"] = "boolean", C["office:boolean-value"] = q.v ? "true" : "false";
            break;
          case "n":
            D = q.w || String(q.v || 0), C["office:value-type"] = "float", C["office:value"] = q.v || 0;
            break;
          case "s":
          case "str":
            D = q.v == null ? "" : q.v, C["office:value-type"] = "string";
            break;
          case "d":
            D = q.w || Tt(q.v).toISOString(), C["office:value-type"] = "date", C["office:date-value"] = Tt(q.v).toISOString(), C["table:style-name"] = "ce1";
            break;
          default:
            f.push(r);
            continue;
        }
        var O = e(D);
        if (q.l && q.l.Target) {
          var V = q.l.Target;
          V = V.charAt(0) == "#" ? "#" + o1(V.slice(1)) : V, V.charAt(0) != "#" && !V.match(/^\w+:/) && (V = "../" + V), O = te("text:a", O, { "xlink:href": V.replace(/&/g, "&amp;") });
        }
        f.push("          " + te("table:table-cell", te("text:p", O, {}), C) + `
`);
      }
      f.push(`        </table:table-row>
`);
    }
    return f.push(`      </table:table>
`), f.join("");
  }, a = function(i, s) {
    i.push(` <office:automatic-styles>
`), i.push(`  <number:date-style style:name="N37" number:automatic-order="true">
`), i.push(`   <number:month number:style="long"/>
`), i.push(`   <number:text>/</number:text>
`), i.push(`   <number:day number:style="long"/>
`), i.push(`   <number:text>/</number:text>
`), i.push(`   <number:year/>
`), i.push(`  </number:date-style>
`);
    var l = 0;
    s.SheetNames.map(function(o) {
      return s.Sheets[o];
    }).forEach(function(o) {
      if (o && o["!cols"]) {
        for (var c = 0; c < o["!cols"].length; ++c) if (o["!cols"][c]) {
          var x = o["!cols"][c];
          if (x.width == null && x.wpx == null && x.wch == null) continue;
          Qa(x), x.ods = l;
          var p = o["!cols"][c].wpx + "px";
          i.push('  <style:style style:name="co' + l + `" style:family="table-column">
`), i.push('   <style:table-column-properties fo:break-before="auto" style:column-width="' + p + `"/>
`), i.push(`  </style:style>
`), ++l;
        }
      }
    });
    var f = 0;
    s.SheetNames.map(function(o) {
      return s.Sheets[o];
    }).forEach(function(o) {
      if (o && o["!rows"]) {
        for (var c = 0; c < o["!rows"].length; ++c) if (o["!rows"][c]) {
          o["!rows"][c].ods = f;
          var x = o["!rows"][c].hpx + "px";
          i.push('  <style:style style:name="ro' + f + `" style:family="table-row">
`), i.push('   <style:table-row-properties fo:break-before="auto" style:row-height="' + x + `"/>
`), i.push(`  </style:style>
`), ++f;
        }
      }
    }), i.push(`  <style:style style:name="ta1" style:family="table" style:master-page-name="mp1">
`), i.push(`   <style:table-properties table:display="true" style:writing-mode="lr-tb"/>
`), i.push(`  </style:style>
`), i.push(`  <style:style style:name="ce1" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="N37"/>
`), i.push(` </office:automatic-styles>
`);
  };
  return function(s, l) {
    var f = [et], o = Tn({
      "xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
      "xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
      "xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
      "xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
      "xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
      "xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "xmlns:dc": "http://purl.org/dc/elements/1.1/",
      "xmlns:meta": "urn:oasis:names:tc:opendocument:xmlns:meta:1.0",
      "xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
      "xmlns:presentation": "urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",
      "xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
      "xmlns:chart": "urn:oasis:names:tc:opendocument:xmlns:chart:1.0",
      "xmlns:dr3d": "urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",
      "xmlns:math": "http://www.w3.org/1998/Math/MathML",
      "xmlns:form": "urn:oasis:names:tc:opendocument:xmlns:form:1.0",
      "xmlns:script": "urn:oasis:names:tc:opendocument:xmlns:script:1.0",
      "xmlns:ooo": "http://openoffice.org/2004/office",
      "xmlns:ooow": "http://openoffice.org/2004/writer",
      "xmlns:oooc": "http://openoffice.org/2004/calc",
      "xmlns:dom": "http://www.w3.org/2001/xml-events",
      "xmlns:xforms": "http://www.w3.org/2002/xforms",
      "xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
      "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "xmlns:sheet": "urn:oasis:names:tc:opendocument:sh33tjs:1.0",
      "xmlns:rpt": "http://openoffice.org/2005/report",
      "xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
      "xmlns:xhtml": "http://www.w3.org/1999/xhtml",
      "xmlns:grddl": "http://www.w3.org/2003/g/data-view#",
      "xmlns:tableooo": "http://openoffice.org/2009/table",
      "xmlns:drawooo": "http://openoffice.org/2010/draw",
      "xmlns:calcext": "urn:org:documentfoundation:names:experimental:calc:xmlns:calcext:1.0",
      "xmlns:loext": "urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0",
      "xmlns:field": "urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0",
      "xmlns:formx": "urn:openoffice:names:experimental:ooxml-odf-interop:xmlns:form:1.0",
      "xmlns:css3t": "http://www.w3.org/TR/css3-text/",
      "office:version": "1.2"
    }), c = Tn({
      "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
      "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
    });
    l.bookType == "fods" ? (f.push("<office:document" + o + c + `>
`), f.push(ji().replace(/office:document-meta/g, "office:meta"))) : f.push("<office:document-content" + o + `>
`), a(f, s), f.push(`  <office:body>
`), f.push(`    <office:spreadsheet>
`);
    for (var x = 0; x != s.SheetNames.length; ++x) f.push(n(s.Sheets[s.SheetNames[x]], s, x));
    return f.push(`    </office:spreadsheet>
`), f.push(`  </office:body>
`), l.bookType == "fods" ? f.push("</office:document>") : f.push("</office:document-content>"), f.join("");
  };
}();
function Is(e, r) {
  if (r.bookType == "fods") return Q0(e, r);
  var t = Va(), n = "", a = [], i = [];
  return n = "mimetype", Ae(t, n, "application/vnd.oasis.opendocument.spreadsheet"), n = "content.xml", Ae(t, n, Q0(e, r)), a.push([n, "text/xml"]), i.push([n, "ContentFile"]), n = "styles.xml", Ae(t, n, Vd(e, r)), a.push([n, "text/xml"]), i.push([n, "StylesFile"]), n = "meta.xml", Ae(t, n, et + ji(
    /*::wb, opts*/
  )), a.push([n, "text/xml"]), i.push([n, "MetadataFile"]), n = "manifest.rdf", Ae(t, n, Qf(
    i
    /*, opts*/
  )), a.push([n, "application/rdf+xml"]), n = "META-INF/manifest.xml", Ae(t, n, Zf(
    a
    /*, opts*/
  )), t;
}
/*! sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
function ra(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function Hd(e) {
  return typeof TextEncoder < "u" ? new TextEncoder().encode(e) : $t(_n(e));
}
function Gd(e, r) {
  e:
    for (var t = 0; t <= e.length - r.length; ++t) {
      for (var n = 0; n < r.length; ++n)
        if (e[t + n] != r[n])
          continue e;
      return !0;
    }
  return !1;
}
function mr(e) {
  var r = e.reduce(function(a, i) {
    return a + i.length;
  }, 0), t = new Uint8Array(r), n = 0;
  return e.forEach(function(a) {
    t.set(a, n), n += a.length;
  }), t;
}
function jd(e, r, t) {
  var n = Math.floor(t == 0 ? 0 : Math.LOG10E * Math.log(Math.abs(t))) + 6176 - 20, a = t / Math.pow(10, n - 6176);
  e[r + 15] |= n >> 7, e[r + 14] |= (n & 127) << 1;
  for (var i = 0; a >= 1; ++i, a /= 256)
    e[r + i] = a & 255;
  e[r + 15] |= t >= 0 ? 0 : 128;
}
function En(e, r) {
  var t = r ? r[0] : 0, n = e[t] & 127;
  e:
    if (e[t++] >= 128 && (n |= (e[t] & 127) << 7, e[t++] < 128 || (n |= (e[t] & 127) << 14, e[t++] < 128) || (n |= (e[t] & 127) << 21, e[t++] < 128) || (n += (e[t] & 127) * Math.pow(2, 28), ++t, e[t++] < 128) || (n += (e[t] & 127) * Math.pow(2, 35), ++t, e[t++] < 128) || (n += (e[t] & 127) * Math.pow(2, 42), ++t, e[t++] < 128)))
      break e;
  return r && (r[0] = t), n;
}
function Me(e) {
  var r = new Uint8Array(7);
  r[0] = e & 127;
  var t = 1;
  e:
    if (e > 127) {
      if (r[t - 1] |= 128, r[t] = e >> 7 & 127, ++t, e <= 16383 || (r[t - 1] |= 128, r[t] = e >> 14 & 127, ++t, e <= 2097151) || (r[t - 1] |= 128, r[t] = e >> 21 & 127, ++t, e <= 268435455) || (r[t - 1] |= 128, r[t] = e / 256 >>> 21 & 127, ++t, e <= 34359738367) || (r[t - 1] |= 128, r[t] = e / 65536 >>> 21 & 127, ++t, e <= 4398046511103))
        break e;
      r[t - 1] |= 128, r[t] = e / 16777216 >>> 21 & 127, ++t;
    }
  return r.slice(0, t);
}
function zr(e) {
  var r = 0, t = e[r] & 127;
  e:
    if (e[r++] >= 128) {
      if (t |= (e[r] & 127) << 7, e[r++] < 128 || (t |= (e[r] & 127) << 14, e[r++] < 128) || (t |= (e[r] & 127) << 21, e[r++] < 128))
        break e;
      t |= (e[r] & 127) << 28;
    }
  return t;
}
function tt(e) {
  for (var r = [], t = [0]; t[0] < e.length; ) {
    var n = t[0], a = En(e, t), i = a & 7;
    a = Math.floor(a / 8);
    var s = 0, l;
    if (a == 0)
      break;
    switch (i) {
      case 0:
        {
          for (var f = t[0]; e[t[0]++] >= 128; )
            ;
          l = e.slice(f, t[0]);
        }
        break;
      case 5:
        s = 4, l = e.slice(t[0], t[0] + s), t[0] += s;
        break;
      case 1:
        s = 8, l = e.slice(t[0], t[0] + s), t[0] += s;
        break;
      case 2:
        s = En(e, t), l = e.slice(t[0], t[0] + s), t[0] += s;
        break;
      case 3:
      case 4:
      default:
        throw new Error("PB Type ".concat(i, " for Field ").concat(a, " at offset ").concat(n));
    }
    var o = { data: l, type: i };
    r[a] == null ? r[a] = [o] : r[a].push(o);
  }
  return r;
}
function ft(e) {
  var r = [];
  return e.forEach(function(t, n) {
    t.forEach(function(a) {
      a.data && (r.push(Me(n * 8 + a.type)), a.type == 2 && r.push(Me(a.data.length)), r.push(a.data));
    });
  }), mr(r);
}
function bt(e) {
  for (var r, t = [], n = [0]; n[0] < e.length; ) {
    var a = En(e, n), i = tt(e.slice(n[0], n[0] + a));
    n[0] += a;
    var s = {
      id: zr(i[1][0].data),
      messages: []
    };
    i[2].forEach(function(l) {
      var f = tt(l.data), o = zr(f[3][0].data);
      s.messages.push({
        meta: f,
        data: e.slice(n[0], n[0] + o)
      }), n[0] += o;
    }), (r = i[3]) != null && r[0] && (s.merge = zr(i[3][0].data) >>> 0 > 0), t.push(s);
  }
  return t;
}
function Ur(e) {
  var r = [];
  return e.forEach(function(t) {
    var n = [];
    n[1] = [{ data: Me(t.id), type: 0 }], n[2] = [], t.merge != null && (n[3] = [{ data: Me(+!!t.merge), type: 0 }]);
    var a = [];
    t.messages.forEach(function(s) {
      a.push(s.data), s.meta[3] = [{ type: 0, data: Me(s.data.length) }], n[2].push({ data: ft(s.meta), type: 2 });
    });
    var i = ft(n);
    r.push(Me(i.length)), r.push(i), a.forEach(function(s) {
      return r.push(s);
    });
  }), mr(r);
}
function Xd(e, r) {
  if (e != 0)
    throw new Error("Unexpected Snappy chunk type ".concat(e));
  for (var t = [0], n = En(r, t), a = []; t[0] < r.length; ) {
    var i = r[t[0]] & 3;
    if (i == 0) {
      var s = r[t[0]++] >> 2;
      if (s < 60)
        ++s;
      else {
        var l = s - 59;
        s = r[t[0]], l > 1 && (s |= r[t[0] + 1] << 8), l > 2 && (s |= r[t[0] + 2] << 16), l > 3 && (s |= r[t[0] + 3] << 24), s >>>= 0, s++, t[0] += l;
      }
      a.push(r.slice(t[0], t[0] + s)), t[0] += s;
      continue;
    } else {
      var f = 0, o = 0;
      if (i == 1 ? (o = (r[t[0]] >> 2 & 7) + 4, f = (r[t[0]++] & 224) << 3, f |= r[t[0]++]) : (o = (r[t[0]++] >> 2) + 1, i == 2 ? (f = r[t[0]] | r[t[0] + 1] << 8, t[0] += 2) : (f = (r[t[0]] | r[t[0] + 1] << 8 | r[t[0] + 2] << 16 | r[t[0] + 3] << 24) >>> 0, t[0] += 4)), a = [mr(a)], f == 0)
        throw new Error("Invalid offset 0");
      if (f > a[0].length)
        throw new Error("Invalid offset beyond length");
      if (o >= f)
        for (a.push(a[0].slice(-f)), o -= f; o >= a[a.length - 1].length; )
          a.push(a[a.length - 1]), o -= a[a.length - 1].length;
      a.push(a[0].slice(-f, -f + o));
    }
  }
  var c = mr(a);
  if (c.length != n)
    throw new Error("Unexpected length: ".concat(c.length, " != ").concat(n));
  return c;
}
function Ut(e) {
  for (var r = [], t = 0; t < e.length; ) {
    var n = e[t++], a = e[t] | e[t + 1] << 8 | e[t + 2] << 16;
    t += 3, r.push(Xd(n, e.slice(t, t + a))), t += a;
  }
  if (t !== e.length)
    throw new Error("data is not a valid framed stream!");
  return mr(r);
}
function Wr(e) {
  for (var r = [], t = 0; t < e.length; ) {
    var n = Math.min(e.length - t, 268435455), a = new Uint8Array(4);
    r.push(a);
    var i = Me(n), s = i.length;
    r.push(i), n <= 60 ? (s++, r.push(new Uint8Array([n - 1 << 2]))) : n <= 256 ? (s += 2, r.push(new Uint8Array([240, n - 1 & 255]))) : n <= 65536 ? (s += 3, r.push(new Uint8Array([244, n - 1 & 255, n - 1 >> 8 & 255]))) : n <= 16777216 ? (s += 4, r.push(new Uint8Array([248, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255]))) : n <= 4294967296 && (s += 5, r.push(new Uint8Array([252, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255, n - 1 >>> 24 & 255]))), r.push(e.slice(t, t + n)), s += n, a[0] = 0, a[1] = s & 255, a[2] = s >> 8 & 255, a[3] = s >> 16 & 255, t += n;
  }
  return mr(r);
}
function ka(e, r) {
  var t = new Uint8Array(32), n = ra(t), a = 12, i = 0;
  switch (t[0] = 5, e.t) {
    case "n":
      t[1] = 2, jd(t, a, e.v), i |= 1, a += 16;
      break;
    case "b":
      t[1] = 6, n.setFloat64(a, e.v ? 1 : 0, !0), i |= 2, a += 8;
      break;
    case "s":
      if (r.indexOf(e.v) == -1)
        throw new Error("Value ".concat(e.v, " missing from SST!"));
      t[1] = 3, n.setUint32(a, r.indexOf(e.v), !0), i |= 8, a += 4;
      break;
    default:
      throw "unsupported cell type " + e.t;
  }
  return n.setUint32(8, i, !0), t.slice(0, a);
}
function Ca(e, r) {
  var t = new Uint8Array(32), n = ra(t), a = 12, i = 0;
  switch (t[0] = 3, e.t) {
    case "n":
      t[2] = 2, n.setFloat64(a, e.v, !0), i |= 32, a += 8;
      break;
    case "b":
      t[2] = 6, n.setFloat64(a, e.v ? 1 : 0, !0), i |= 32, a += 8;
      break;
    case "s":
      if (r.indexOf(e.v) == -1)
        throw new Error("Value ".concat(e.v, " missing from SST!"));
      t[2] = 3, n.setUint32(a, r.indexOf(e.v), !0), i |= 16, a += 4;
      break;
    default:
      throw "unsupported cell type " + e.t;
  }
  return n.setUint32(4, i, !0), t.slice(0, a);
}
function cr(e) {
  var r = tt(e);
  return En(r[1][0].data);
}
function zd(e, r, t) {
  var n, a, i, s;
  if (!((n = e[6]) != null && n[0]) || !((a = e[7]) != null && a[0]))
    throw "Mutation only works on post-BNC storages!";
  var l = ((s = (i = e[8]) == null ? void 0 : i[0]) == null ? void 0 : s.data) && zr(e[8][0].data) > 0 || !1;
  if (l)
    throw "Math only works with normal offsets";
  for (var f = 0, o = ra(e[7][0].data), c = 0, x = [], p = ra(e[4][0].data), v = 0, T = [], u = 0; u < r.length; ++u) {
    if (r[u] == null) {
      o.setUint16(u * 2, 65535, !0), p.setUint16(u * 2, 65535);
      continue;
    }
    o.setUint16(u * 2, c, !0), p.setUint16(u * 2, v, !0);
    var h, y;
    switch (typeof r[u]) {
      case "string":
        h = ka({ t: "s", v: r[u] }, t), y = Ca({ t: "s", v: r[u] }, t);
        break;
      case "number":
        h = ka({ t: "n", v: r[u] }, t), y = Ca({ t: "n", v: r[u] }, t);
        break;
      case "boolean":
        h = ka({ t: "b", v: r[u] }, t), y = Ca({ t: "b", v: r[u] }, t);
        break;
      default:
        throw new Error("Unsupported value " + r[u]);
    }
    x.push(h), c += h.length, T.push(y), v += y.length, ++f;
  }
  for (e[2][0].data = Me(f); u < e[7][0].data.length / 2; ++u)
    o.setUint16(u * 2, 65535, !0), p.setUint16(u * 2, 65535, !0);
  return e[6][0].data = mr(x), e[3][0].data = mr(T), f;
}
function Yd(e, r) {
  if (!r || !r.numbers)
    throw new Error("Must pass a `numbers` option -- check the README");
  var t = e.Sheets[e.SheetNames[0]];
  e.SheetNames.length > 1 && console.error("The Numbers writer currently writes only the first table");
  var n = Rt(t["!ref"]);
  n.s.r = n.s.c = 0;
  var a = !1;
  n.e.c > 9 && (a = !0, n.e.c = 9), n.e.r > 49 && (a = !0, n.e.r = 49), a && console.error("The Numbers writer is currently limited to ".concat(Qe(n)));
  var i = na(t, { range: n, header: 1 }), s = ["~Sh33tJ5~"];
  i.forEach(function(k) {
    return k.forEach(function(A) {
      typeof A == "string" && s.push(A);
    });
  });
  var l = {}, f = [], o = $e.read(r.numbers, { type: "base64" });
  o.FileIndex.map(function(k, A) {
    return [k, o.FullPaths[A]];
  }).forEach(function(k) {
    var A = k[0], F = k[1];
    if (A.type == 2 && A.name.match(/\.iwa/)) {
      var B = A.content, ie = Ut(B), xe = bt(ie);
      xe.forEach(function(de) {
        f.push(de.id), l[de.id] = { deps: [], location: F, type: zr(de.messages[0].meta[1][0].data) };
      });
    }
  }), f.sort(function(k, A) {
    return k - A;
  });
  var c = f.filter(function(k) {
    return k > 1;
  }).map(function(k) {
    return [k, Me(k)];
  });
  o.FileIndex.map(function(k, A) {
    return [k, o.FullPaths[A]];
  }).forEach(function(k) {
    var A = k[0];
    if (k[1], !!A.name.match(/\.iwa/)) {
      var F = bt(Ut(A.content));
      F.forEach(function(B) {
        B.messages.forEach(function(ie) {
          c.forEach(function(xe) {
            B.messages.some(function(de) {
              return zr(de.meta[1][0].data) != 11006 && Gd(de.data, xe[1]);
            }) && l[xe[0]].deps.push(B.id);
          });
        });
      });
    }
  });
  for (var x = $e.find(o, l[1].location), p = bt(Ut(x.content)), v, T = 0; T < p.length; ++T) {
    var u = p[T];
    u.id == 1 && (v = u);
  }
  var h = cr(tt(v.messages[0].data)[1][0].data);
  for (x = $e.find(o, l[h].location), p = bt(Ut(x.content)), T = 0; T < p.length; ++T)
    u = p[T], u.id == h && (v = u);
  for (h = cr(tt(v.messages[0].data)[2][0].data), x = $e.find(o, l[h].location), p = bt(Ut(x.content)), T = 0; T < p.length; ++T)
    u = p[T], u.id == h && (v = u);
  for (h = cr(tt(v.messages[0].data)[2][0].data), x = $e.find(o, l[h].location), p = bt(Ut(x.content)), T = 0; T < p.length; ++T)
    u = p[T], u.id == h && (v = u);
  var y = tt(v.messages[0].data);
  {
    y[6][0].data = Me(n.e.r + 1), y[7][0].data = Me(n.e.c + 1);
    var C = cr(y[46][0].data), D = $e.find(o, l[C].location), L = bt(Ut(D.content));
    {
      for (var q = 0; q < L.length && L[q].id != C; ++q)
        ;
      if (L[q].id != C)
        throw "Bad ColumnRowUIDMapArchive";
      var se = tt(L[q].messages[0].data);
      se[1] = [], se[2] = [], se[3] = [];
      for (var O = 0; O <= n.e.c; ++O) {
        var V = [];
        V[1] = V[2] = [{ type: 0, data: Me(O + 420690) }], se[1].push({ type: 2, data: ft(V) }), se[2].push({ type: 0, data: Me(O) }), se[3].push({ type: 0, data: Me(O) });
      }
      se[4] = [], se[5] = [], se[6] = [];
      for (var M = 0; M <= n.e.r; ++M)
        V = [], V[1] = V[2] = [{ type: 0, data: Me(M + 726270) }], se[4].push({ type: 2, data: ft(V) }), se[5].push({ type: 0, data: Me(M) }), se[6].push({ type: 0, data: Me(M) });
      L[q].messages[0].data = ft(se);
    }
    D.content = Wr(Ur(L)), D.size = D.content.length, delete y[46];
    var G = tt(y[4][0].data);
    {
      G[7][0].data = Me(n.e.r + 1);
      var z = tt(G[1][0].data), K = cr(z[2][0].data);
      D = $e.find(o, l[K].location), L = bt(Ut(D.content));
      {
        if (L[0].id != K)
          throw "Bad HeaderStorageBucket";
        var fe = tt(L[0].messages[0].data);
        for (M = 0; M < i.length; ++M) {
          var pe = tt(fe[2][0].data);
          pe[1][0].data = Me(M), pe[4][0].data = Me(i[M].length), fe[2][M] = { type: fe[2][0].type, data: ft(pe) };
        }
        L[0].messages[0].data = ft(fe);
      }
      D.content = Wr(Ur(L)), D.size = D.content.length;
      var Ee = cr(G[2][0].data);
      D = $e.find(o, l[Ee].location), L = bt(Ut(D.content));
      {
        if (L[0].id != Ee)
          throw "Bad HeaderStorageBucket";
        for (fe = tt(L[0].messages[0].data), O = 0; O <= n.e.c; ++O)
          pe = tt(fe[2][0].data), pe[1][0].data = Me(O), pe[4][0].data = Me(n.e.r + 1), fe[2][O] = { type: fe[2][0].type, data: ft(pe) };
        L[0].messages[0].data = ft(fe);
      }
      D.content = Wr(Ur(L)), D.size = D.content.length;
      var Ge = cr(G[4][0].data);
      (function() {
        for (var k = $e.find(o, l[Ge].location), A = bt(Ut(k.content)), F, B = 0; B < A.length; ++B) {
          var ie = A[B];
          ie.id == Ge && (F = ie);
        }
        var xe = tt(F.messages[0].data);
        {
          xe[3] = [];
          var de = [];
          s.forEach(function(Se, me) {
            de[1] = [{ type: 0, data: Me(me) }], de[2] = [{ type: 0, data: Me(1) }], de[3] = [{ type: 2, data: Hd(Se) }], xe[3].push({ type: 2, data: ft(de) });
          });
        }
        F.messages[0].data = ft(xe);
        var ne = Ur(A), Fe = Wr(ne);
        k.content = Fe, k.size = k.content.length;
      })();
      var Le = tt(G[3][0].data);
      {
        var lt = Le[1][0];
        delete Le[2];
        var Ve = tt(lt.data);
        {
          var rt = cr(Ve[2][0].data);
          (function() {
            for (var k = $e.find(o, l[rt].location), A = bt(Ut(k.content)), F, B = 0; B < A.length; ++B) {
              var ie = A[B];
              ie.id == rt && (F = ie);
            }
            var xe = tt(F.messages[0].data);
            {
              delete xe[6], delete Le[7];
              var de = new Uint8Array(xe[5][0].data);
              xe[5] = [];
              for (var ne = 0, Fe = 0; Fe <= n.e.r; ++Fe) {
                var Se = tt(de);
                ne += zd(Se, i[Fe], s), Se[1][0].data = Me(Fe), xe[5].push({ data: ft(Se), type: 2 });
              }
              xe[1] = [{ type: 0, data: Me(n.e.c + 1) }], xe[2] = [{ type: 0, data: Me(n.e.r + 1) }], xe[3] = [{ type: 0, data: Me(ne) }], xe[4] = [{ type: 0, data: Me(n.e.r + 1) }];
            }
            F.messages[0].data = ft(xe);
            var me = Ur(A), Te = Wr(me);
            k.content = Te, k.size = k.content.length;
          })();
        }
        lt.data = ft(Ve);
      }
      G[3][0].data = ft(Le);
    }
    y[4][0].data = ft(G);
  }
  v.messages[0].data = ft(y);
  var H = Ur(p), m = Wr(H);
  return x.content = m, x.size = x.content.length, o;
}
function Kd(e) {
  return function(t) {
    for (var n = 0; n != e.length; ++n) {
      var a = e[n];
      t[a[0]] === void 0 && (t[a[0]] = a[1]), a[2] === "n" && (t[a[0]] = Number(t[a[0]]));
    }
  };
}
function a0(e) {
  Kd([
    ["cellDates", !1],
    /* write date cells with type `d` */
    ["bookSST", !1],
    /* Generate Shared String Table */
    ["bookType", "xlsx"],
    /* Type of workbook (xlsx/m/b) */
    ["compression", !1],
    /* Use file compression */
    ["WTF", !1]
    /* WTF mode (throws errors) */
  ])(e);
}
function Jd(e, r) {
  return r.bookType == "ods" ? Is(e, r) : r.bookType == "numbers" ? Yd(e, r) : r.bookType == "xlsb" ? Zd(e, r) : qd(e, r);
}
function Zd(e, r) {
  Hr = 1024, e && !e.SSF && (e.SSF = yt(Je)), e && e.SSF && (sa(), ia(e.SSF), r.revssf = la(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF), r.rels = {}, r.wbrels = {}, r.Strings = /*::((*/
  [], r.Strings.Count = 0, r.Strings.Unique = 0, xn ? r.revStrings = /* @__PURE__ */ new Map() : (r.revStrings = {}, r.revStrings.foo = [], delete r.revStrings.foo);
  var t = r.bookType == "xlsb" ? "bin" : "xml", n = ds.indexOf(r.bookType) > -1, a = Vi();
  a0(r = r || {});
  var i = Va(), s = "", l = 0;
  if (r.cellXfs = [], gr(r.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", Ae(i, s, Xi(e.Props, r)), a.coreprops.push(s), Be(r.rels, 2, s, Re.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var f = [], o = 0; o < e.SheetNames.length; ++o)
      (e.Workbook.Sheets[o] || {}).Hidden != 2 && f.push(e.SheetNames[o]);
    e.Props.SheetNames = f;
  }
  for (e.Props.Worksheets = e.Props.SheetNames.length, Ae(i, s, Yi(e.Props)), a.extprops.push(s), Be(r.rels, 3, s, Re.EXT_PROPS), e.Custprops !== e.Props && dt(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", Ae(i, s, Ki(e.Custprops)), a.custprops.push(s), Be(r.rels, 4, s, Re.CUST_PROPS)), l = 1; l <= e.SheetNames.length; ++l) {
    var c = { "!id": {} }, x = e.Sheets[e.SheetNames[l - 1]], p = (x || {})["!type"] || "sheet";
    switch (p) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + l + "." + t, Ae(i, s, ed(l - 1, s, r, e, c)), a.sheets.push(s), Be(r.wbrels, -1, "worksheets/sheet" + l + "." + t, Re.WS[0]);
    }
    if (x) {
      var v = x["!comments"], T = !1, u = "";
      v && v.length > 0 && (u = "xl/comments" + l + "." + t, Ae(i, u, nd(v, u)), a.comments.push(u), Be(c, -1, "../comments" + l + "." + t, Re.CMNT), T = !0), x["!legacy"] && T && Ae(i, "xl/drawings/vmlDrawing" + l + ".vml", us(l, x["!comments"])), delete x["!comments"], delete x["!legacy"];
    }
    c["!id"].rId1 && Ae(i, Gi(s), jr(c));
  }
  return r.Strings != null && r.Strings.length > 0 && (s = "xl/sharedStrings." + t, Ae(i, s, rd(r.Strings, s, r)), a.strs.push(s), Be(r.wbrels, -1, "sharedStrings." + t, Re.SST)), s = "xl/workbook." + t, Ae(i, s, Qh(e, s)), a.workbooks.push(s), Be(r.rels, 1, s, Re.WB), s = "xl/theme/theme1.xml", Ae(i, s, os(e.Themes, r)), a.themes.push(s), Be(r.wbrels, -1, "theme/theme1.xml", Re.THEME), s = "xl/styles." + t, Ae(i, s, td(e, s, r)), a.styles.push(s), Be(r.wbrels, -1, "styles." + t, Re.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", Ae(i, s, e.vbaraw), a.vba.push(s), Be(r.wbrels, -1, "vbaProject.bin", Re.VBA)), s = "xl/metadata." + t, Ae(i, s, ad(s)), a.metadata.push(s), Be(r.wbrels, -1, "metadata." + t, Re.XLMETA), Ae(i, "[Content_Types].xml", Hi(a, r)), Ae(i, "_rels/.rels", jr(r.rels)), Ae(i, "xl/_rels/workbook." + t + ".rels", jr(r.wbrels)), delete r.revssf, delete r.ssf, i;
}
function qd(e, r) {
  Hr = 1024, e && !e.SSF && (e.SSF = yt(Je)), e && e.SSF && (sa(), ia(e.SSF), r.revssf = la(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF), r.rels = {}, r.wbrels = {}, r.Strings = /*::((*/
  [], r.Strings.Count = 0, r.Strings.Unique = 0, xn ? r.revStrings = /* @__PURE__ */ new Map() : (r.revStrings = {}, r.revStrings.foo = [], delete r.revStrings.foo);
  var t = "xml", n = ds.indexOf(r.bookType) > -1, a = Vi();
  a0(r = r || {});
  var i = Va(), s = "", l = 0;
  if (r.cellXfs = [], gr(r.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", Ae(i, s, Xi(e.Props, r)), a.coreprops.push(s), Be(r.rels, 2, s, Re.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var f = [], o = 0; o < e.SheetNames.length; ++o)
      (e.Workbook.Sheets[o] || {}).Hidden != 2 && f.push(e.SheetNames[o]);
    e.Props.SheetNames = f;
  }
  e.Props.Worksheets = e.Props.SheetNames.length, Ae(i, s, Yi(e.Props)), a.extprops.push(s), Be(r.rels, 3, s, Re.EXT_PROPS), e.Custprops !== e.Props && dt(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", Ae(i, s, Ki(e.Custprops)), a.custprops.push(s), Be(r.rels, 4, s, Re.CUST_PROPS));
  var c = ["SheetJ5"];
  for (r.tcid = 0, l = 1; l <= e.SheetNames.length; ++l) {
    var x = { "!id": {} }, p = e.Sheets[e.SheetNames[l - 1]], v = (p || {})["!type"] || "sheet";
    switch (v) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + l + "." + t, Ae(i, s, ws(l - 1, r, e, x)), a.sheets.push(s), Be(r.wbrels, -1, "worksheets/sheet" + l + "." + t, Re.WS[0]);
    }
    if (p) {
      var T = p["!comments"], u = !1, h = "";
      if (T && T.length > 0) {
        var y = !1;
        T.forEach(function(C) {
          C[1].forEach(function(D) {
            D.T == !0 && (y = !0);
          });
        }), y && (h = "xl/threadedComments/threadedComment" + l + "." + t, Ae(i, h, Dc(T, c, r)), a.threadedcomments.push(h), Be(x, -1, "../threadedComments/threadedComment" + l + "." + t, Re.TCMNT)), h = "xl/comments" + l + "." + t, Ae(i, h, hs(T)), a.comments.push(h), Be(x, -1, "../comments" + l + "." + t, Re.CMNT), u = !0;
      }
      p["!legacy"] && u && Ae(i, "xl/drawings/vmlDrawing" + l + ".vml", us(l, p["!comments"])), delete p["!comments"], delete p["!legacy"];
    }
    x["!id"].rId1 && Ae(i, Gi(s), jr(x));
  }
  return r.Strings != null && r.Strings.length > 0 && (s = "xl/sharedStrings." + t, Ae(i, s, ns(r.Strings, r)), a.strs.push(s), Be(r.wbrels, -1, "sharedStrings." + t, Re.SST)), s = "xl/workbook." + t, Ae(i, s, ys(e)), a.workbooks.push(s), Be(r.rels, 1, s, Re.WB), s = "xl/theme/theme1.xml", Ae(i, s, os(e.Themes, r)), a.themes.push(s), Be(r.wbrels, -1, "theme/theme1.xml", Re.THEME), s = "xl/styles." + t, Ae(i, s, ls(e, r)), a.styles.push(s), Be(r.wbrels, -1, "styles." + t, Re.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", Ae(i, s, e.vbaraw), a.vba.push(s), Be(r.wbrels, -1, "vbaProject.bin", Re.VBA)), s = "xl/metadata." + t, Ae(i, s, cs()), a.metadata.push(s), Be(r.wbrels, -1, "metadata." + t, Re.XLMETA), c.length > 1 && (s = "xl/persons/person.xml", Ae(i, s, Oc(c)), a.people.push(s), Be(r.wbrels, -1, "persons/person.xml", Re.PEOPLE)), Ae(i, "[Content_Types].xml", Hi(a, r)), Ae(i, "_rels/.rels", jr(r.rels)), Ae(i, "xl/_rels/workbook." + t + ".rels", jr(r.wbrels)), delete r.revssf, delete r.ssf, i;
}
function Qd(e, r) {
  var t = "";
  switch ((r || {}).type || "base64") {
    case "buffer":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    case "base64":
      t = rr(e.slice(0, 12));
      break;
    case "binary":
      t = e;
      break;
    case "array":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    default:
      throw new Error("Unrecognized type " + (r && r.type || "undefined"));
  }
  return [t.charCodeAt(0), t.charCodeAt(1), t.charCodeAt(2), t.charCodeAt(3), t.charCodeAt(4), t.charCodeAt(5), t.charCodeAt(6), t.charCodeAt(7)];
}
function Rs(e, r) {
  switch (r.type) {
    case "base64":
    case "binary":
      break;
    case "buffer":
    case "array":
      r.type = "";
      break;
    case "file":
      return yn(r.file, $e.write(e, { type: Pe ? "buffer" : "" }));
    case "string":
      throw new Error("'string' output type invalid for '" + r.bookType + "' files");
    default:
      throw new Error("Unrecognized type " + r.type);
  }
  return $e.write(e, r);
}
function ex(e, r) {
  var t = yt(r || {}), n = Jd(e, t);
  return tx(n, t);
}
function tx(e, r) {
  var t = {}, n = Pe ? "nodebuffer" : typeof Uint8Array < "u" ? "array" : "string";
  if (r.compression && (t.compression = "DEFLATE"), r.password) t.type = n;
  else switch (r.type) {
    case "base64":
      t.type = "base64";
      break;
    case "binary":
      t.type = "string";
      break;
    case "string":
      throw new Error("'string' output type invalid for '" + r.bookType + "' files");
    case "buffer":
    case "file":
      t.type = n;
      break;
    default:
      throw new Error("Unrecognized type " + r.type);
  }
  var a = e.FullPaths ? $e.write(e, { fileType: "zip", type: (
    /*::(*/
    { nodebuffer: "buffer", string: "binary" }[t.type] || t.type
  ), compression: !!r.compression }) : e.generate(t);
  if (typeof Deno < "u" && typeof a == "string") {
    if (r.type == "binary" || r.type == "base64") return a;
    a = new Uint8Array(aa(a));
  }
  return r.password && typeof encrypt_agile < "u" ? Rs(encrypt_agile(a, r.password), r) : r.type === "file" ? yn(r.file, a) : r.type == "string" ? cn(
    /*::(*/
    a
    /*:: :any)*/
  ) : a;
}
function rx(e, r) {
  var t = r || {}, n = gd(e, t);
  return Rs(n, t);
}
function zt(e, r, t) {
  t || (t = "");
  var n = t + e;
  switch (r.type) {
    case "base64":
      return mn(_n(n));
    case "binary":
      return _n(n);
    case "string":
      return e;
    case "file":
      return yn(r.file, n, "utf8");
    case "buffer":
      return Pe ? ar(n, "utf8") : typeof TextEncoder < "u" ? new TextEncoder().encode(n) : zt(n, { type: "binary" }).split("").map(function(a) {
        return a.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + r.type);
}
function nx(e, r) {
  switch (r.type) {
    case "base64":
      return mn(e);
    case "binary":
      return e;
    case "string":
      return e;
    case "file":
      return yn(r.file, e, "binary");
    case "buffer":
      return Pe ? ar(e, "binary") : e.split("").map(function(t) {
        return t.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + r.type);
}
function Vn(e, r) {
  switch (r.type) {
    case "string":
    case "base64":
    case "binary":
      for (var t = "", n = 0; n < e.length; ++n) t += String.fromCharCode(e[n]);
      return r.type == "base64" ? mn(t) : r.type == "string" ? cn(t) : t;
    case "file":
      return yn(r.file, e);
    case "buffer":
      return e;
    default:
      throw new Error("Unrecognized type " + r.type);
  }
}
function Ns(e, r) {
  Dl(), Vh(e);
  var t = yt(r || {});
  if (t.cellStyles && (t.cellNF = !0, t.sheetStubs = !0), t.type == "array") {
    t.type = "binary";
    var n = Ns(e, t);
    return t.type = "array", aa(n);
  }
  var a = 0;
  if (t.sheet && (typeof t.sheet == "number" ? a = t.sheet : a = e.SheetNames.indexOf(t.sheet), !e.SheetNames[a]))
    throw new Error("Sheet not found: " + t.sheet + " : " + typeof t.sheet);
  switch (t.bookType || "xlsb") {
    case "xml":
    case "xlml":
      return zt(pd(e, t), t);
    case "slk":
    case "sylk":
      return zt(Uo.from_sheet(e.Sheets[e.SheetNames[a]], t), t);
    case "htm":
    case "html":
      return zt(Cs(e.Sheets[e.SheetNames[a]], t), t);
    case "txt":
      return nx(Ls(e.Sheets[e.SheetNames[a]], t), t);
    case "csv":
      return zt(i0(e.Sheets[e.SheetNames[a]], t), t, "\uFEFF");
    case "dif":
      return zt(Wo.from_sheet(e.Sheets[e.SheetNames[a]], t), t);
    case "dbf":
      return Vn(bo.from_sheet(e.Sheets[e.SheetNames[a]], t), t);
    case "prn":
      return zt($o.from_sheet(e.Sheets[e.SheetNames[a]], t), t);
    case "rtf":
      return zt(Yo.from_sheet(e.Sheets[e.SheetNames[a]], t), t);
    case "eth":
      return zt(rs.from_sheet(e.Sheets[e.SheetNames[a]], t), t);
    case "fods":
      return zt(Is(e, t), t);
    case "wk1":
      return Vn(X0.sheet_to_wk1(e.Sheets[e.SheetNames[a]], t), t);
    case "wk3":
      return Vn(X0.book_to_wk3(e, t), t);
    case "biff2":
      t.biff || (t.biff = 2);
    case "biff3":
      t.biff || (t.biff = 3);
    case "biff4":
      return t.biff || (t.biff = 4), Vn(ks(e, t), t);
    case "biff5":
      t.biff || (t.biff = 5);
    case "biff8":
    case "xla":
    case "xls":
      return t.biff || (t.biff = 8), rx(e, t);
    case "xlsx":
    case "xlsm":
    case "xlam":
    case "xlsb":
    case "numbers":
    case "ods":
      return ex(e, t);
    default:
      throw new Error("Unrecognized bookType |" + t.bookType + "|");
  }
}
function ax(e) {
  if (!e.bookType) {
    var r = {
      xls: "biff8",
      htm: "html",
      slk: "sylk",
      socialcalc: "eth",
      Sh33tJS: "WTF"
    }, t = e.file.slice(e.file.lastIndexOf(".")).toLowerCase();
    t.match(/^\.[a-z]+$/) && (e.bookType = t.slice(1)), e.bookType = r[e.bookType] || e.bookType;
  }
}
function Ps(e, r, t) {
  var n = {};
  return n.type = "file", n.file = r, ax(n), Ns(e, n);
}
function ix(e, r, t, n, a, i, s, l) {
  var f = ht(t), o = l.defval, c = l.raw || !Object.prototype.hasOwnProperty.call(l, "raw"), x = !0, p = a === 1 ? [] : {};
  if (a !== 1)
    if (Object.defineProperty) try {
      Object.defineProperty(p, "__rowNum__", { value: t, enumerable: !1 });
    } catch {
      p.__rowNum__ = t;
    }
    else p.__rowNum__ = t;
  if (!s || e[t]) for (var v = r.s.c; v <= r.e.c; ++v) {
    var T = s ? e[t][v] : e[n[v] + f];
    if (T === void 0 || T.t === void 0) {
      if (o === void 0) continue;
      i[v] != null && (p[i[v]] = o);
      continue;
    }
    var u = T.v;
    switch (T.t) {
      case "z":
        if (u == null) break;
        continue;
      case "e":
        u = u == 0 ? null : void 0;
        break;
      case "s":
      case "d":
      case "b":
      case "n":
        break;
      default:
        throw new Error("unrecognized type " + T.t);
    }
    if (i[v] != null) {
      if (u == null)
        if (T.t == "e" && u === null) p[i[v]] = null;
        else if (o !== void 0) p[i[v]] = o;
        else if (c && u === null) p[i[v]] = null;
        else continue;
      else
        p[i[v]] = c && (T.t !== "n" || T.t === "n" && l.rawNumbers !== !1) ? u : nr(T, u, l);
      u != null && (x = !1);
    }
  }
  return { row: p, isempty: x };
}
function na(e, r) {
  if (e == null || e["!ref"] == null) return [];
  var t = { t: "n", v: 0 }, n = 0, a = 1, i = [], s = 0, l = "", f = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, o = r || {}, c = o.range != null ? o.range : e["!ref"];
  switch (o.header === 1 ? n = 1 : o.header === "A" ? n = 2 : Array.isArray(o.header) ? n = 3 : o.header == null && (n = 0), typeof c) {
    case "string":
      f = He(c);
      break;
    case "number":
      f = He(e["!ref"]), f.s.r = c;
      break;
    default:
      f = c;
  }
  n > 0 && (a = 0);
  var x = ht(f.s.r), p = [], v = [], T = 0, u = 0, h = Array.isArray(e), y = f.s.r, C = 0, D = {};
  h && !e[y] && (e[y] = []);
  var L = o.skipHidden && e["!cols"] || [], q = o.skipHidden && e["!rows"] || [];
  for (C = f.s.c; C <= f.e.c; ++C)
    if (!(L[C] || {}).hidden)
      switch (p[C] = vt(C), t = h ? e[y][C] : e[p[C] + x], n) {
        case 1:
          i[C] = C - f.s.c;
          break;
        case 2:
          i[C] = p[C];
          break;
        case 3:
          i[C] = o.header[C - f.s.c];
          break;
        default:
          if (t == null && (t = { w: "__EMPTY", t: "s" }), l = s = nr(t, null, o), u = D[s] || 0, !u) D[s] = 1;
          else {
            do
              l = s + "_" + u++;
            while (D[l]);
            D[s] = u, D[l] = 1;
          }
          i[C] = l;
      }
  for (y = f.s.r + a; y <= f.e.r; ++y)
    if (!(q[y] || {}).hidden) {
      var se = ix(e, f, y, p, n, i, h, o);
      (se.isempty === !1 || (n === 1 ? o.blankrows !== !1 : o.blankrows)) && (v[T++] = se.row);
    }
  return v.length = T, v;
}
var ei = /"/g;
function sx(e, r, t, n, a, i, s, l) {
  for (var f = !0, o = [], c = "", x = ht(t), p = r.s.c; p <= r.e.c; ++p)
    if (n[p]) {
      var v = l.dense ? (e[t] || [])[p] : e[n[p] + x];
      if (v == null) c = "";
      else if (v.v != null) {
        f = !1, c = "" + (l.rawNumbers && v.t == "n" ? v.v : nr(v, null, l));
        for (var T = 0, u = 0; T !== c.length; ++T) if ((u = c.charCodeAt(T)) === a || u === i || u === 34 || l.forceQuotes) {
          c = '"' + c.replace(ei, '""') + '"';
          break;
        }
        c == "ID" && (c = '"ID"');
      } else v.f != null && !v.F ? (f = !1, c = "=" + v.f, c.indexOf(",") >= 0 && (c = '"' + c.replace(ei, '""') + '"')) : c = "";
      o.push(c);
    }
  return l.blankrows === !1 && f ? null : o.join(s);
}
function i0(e, r) {
  var t = [], n = r ?? {};
  if (e == null || e["!ref"] == null) return "";
  var a = He(e["!ref"]), i = n.FS !== void 0 ? n.FS : ",", s = i.charCodeAt(0), l = n.RS !== void 0 ? n.RS : `
`, f = l.charCodeAt(0), o = new RegExp((i == "|" ? "\\|" : i) + "+$"), c = "", x = [];
  n.dense = Array.isArray(e);
  for (var p = n.skipHidden && e["!cols"] || [], v = n.skipHidden && e["!rows"] || [], T = a.s.c; T <= a.e.c; ++T) (p[T] || {}).hidden || (x[T] = vt(T));
  for (var u = 0, h = a.s.r; h <= a.e.r; ++h)
    (v[h] || {}).hidden || (c = sx(e, a, h, x, s, f, i, n), c != null && (n.strip && (c = c.replace(o, "")), (c || n.blankrows !== !1) && t.push((u++ ? l : "") + c)));
  return delete n.dense, t.join("");
}
function Ls(e, r) {
  r || (r = {}), r.FS = "	", r.RS = `
`;
  var t = i0(e, r);
  return t;
}
function lx(e) {
  var r = "", t, n = "";
  if (e == null || e["!ref"] == null) return [];
  var a = He(e["!ref"]), i = "", s = [], l, f = [], o = Array.isArray(e);
  for (l = a.s.c; l <= a.e.c; ++l) s[l] = vt(l);
  for (var c = a.s.r; c <= a.e.r; ++c)
    for (i = ht(c), l = a.s.c; l <= a.e.c; ++l)
      if (r = s[l] + i, t = o ? (e[c] || [])[l] : e[r], n = "", t !== void 0) {
        if (t.F != null) {
          if (r = t.F, !t.f) continue;
          n = t.f, r.indexOf(":") == -1 && (r = r + ":" + r);
        }
        if (t.f != null) n = t.f;
        else {
          if (t.t == "z") continue;
          if (t.t == "n" && t.v != null) n = "" + t.v;
          else if (t.t == "b") n = t.v ? "TRUE" : "FALSE";
          else if (t.w !== void 0) n = "'" + t.w;
          else {
            if (t.v === void 0) continue;
            t.t == "s" ? n = "'" + t.v : n = "" + t.v;
          }
        }
        f[f.length] = r + "=" + n;
      }
  return f;
}
function Ms(e, r, t) {
  var n = t || {}, a = +!n.skipHeader, i = e || {}, s = 0, l = 0;
  if (i && n.origin != null)
    if (typeof n.origin == "number") s = n.origin;
    else {
      var f = typeof n.origin == "string" ? it(n.origin) : n.origin;
      s = f.r, l = f.c;
    }
  var o, c = { s: { c: 0, r: 0 }, e: { c: l, r: s + r.length - 1 + a } };
  if (i["!ref"]) {
    var x = He(i["!ref"]);
    c.e.c = Math.max(c.e.c, x.e.c), c.e.r = Math.max(c.e.r, x.e.r), s == -1 && (s = x.e.r + 1, c.e.r = s + r.length - 1 + a);
  } else
    s == -1 && (s = 0, c.e.r = r.length - 1 + a);
  var p = n.header || [], v = 0;
  r.forEach(function(u, h) {
    dt(u).forEach(function(y) {
      (v = p.indexOf(y)) == -1 && (p[v = p.length] = y);
      var C = u[y], D = "z", L = "", q = Ue({ c: l + v, r: s + h + a });
      o = wn(i, q), C && typeof C == "object" && !(C instanceof Date) ? i[q] = C : (typeof C == "number" ? D = "n" : typeof C == "boolean" ? D = "b" : typeof C == "string" ? D = "s" : C instanceof Date ? (D = "d", n.cellDates || (D = "n", C = At(C)), L = n.dateNF || Je[14]) : C === null && n.nullError && (D = "e", C = 0), o ? (o.t = D, o.v = C, delete o.w, delete o.R, L && (o.z = L)) : i[q] = o = { t: D, v: C }, L && (o.z = L));
    });
  }), c.e.c = Math.max(c.e.c, l + p.length - 1);
  var T = ht(s);
  if (a) for (v = 0; v < p.length; ++v) i[vt(v + l) + T] = { t: "s", v: p[v] };
  return i["!ref"] = Qe(c), i;
}
function fx(e, r) {
  return Ms(null, e, r);
}
function wn(e, r, t) {
  if (typeof r == "string") {
    if (Array.isArray(e)) {
      var n = it(r);
      return e[n.r] || (e[n.r] = []), e[n.r][n.c] || (e[n.r][n.c] = { t: "z" });
    }
    return e[r] || (e[r] = { t: "z" });
  }
  return typeof r != "number" ? wn(e, Ue(r)) : wn(e, Ue({ r, c: t || 0 }));
}
function ox(e, r) {
  if (typeof r == "number") {
    if (r >= 0 && e.SheetNames.length > r) return r;
    throw new Error("Cannot find sheet # " + r);
  } else if (typeof r == "string") {
    var t = e.SheetNames.indexOf(r);
    if (t > -1) return t;
    throw new Error("Cannot find sheet name |" + r + "|");
  } else throw new Error("Cannot find sheet |" + r + "|");
}
function cx() {
  return { SheetNames: [], Sheets: {} };
}
function ux(e, r, t, n) {
  var a = 1;
  if (!t) for (; a <= 65535 && e.SheetNames.indexOf(t = "Sheet" + a) != -1; ++a, t = void 0) ;
  if (!t || e.SheetNames.length >= 65535) throw new Error("Too many worksheets");
  if (n && e.SheetNames.indexOf(t) >= 0) {
    var i = t.match(/(^.*?)(\d+)$/);
    a = i && +i[2] || 0;
    var s = i && i[1] || t;
    for (++a; a <= 65535 && e.SheetNames.indexOf(t = s + a) != -1; ++a) ;
  }
  if (As(t), e.SheetNames.indexOf(t) >= 0) throw new Error("Worksheet with name |" + t + "| already exists!");
  return e.SheetNames.push(t), e.Sheets[t] = r, t;
}
function hx(e, r, t) {
  e.Workbook || (e.Workbook = {}), e.Workbook.Sheets || (e.Workbook.Sheets = []);
  var n = ox(e, r);
  switch (e.Workbook.Sheets[n] || (e.Workbook.Sheets[n] = {}), t) {
    case 0:
    case 1:
    case 2:
      break;
    default:
      throw new Error("Bad sheet visibility setting " + t);
  }
  e.Workbook.Sheets[n].Hidden = t;
}
function dx(e, r) {
  return e.z = r, e;
}
function Bs(e, r, t) {
  return r ? (e.l = { Target: r }, t && (e.l.Tooltip = t)) : delete e.l, e;
}
function xx(e, r, t) {
  return Bs(e, "#" + r, t);
}
function vx(e, r, t) {
  e.c || (e.c = []), e.c.push({ t: r, a: t || "SheetJS" });
}
function px(e, r, t, n) {
  for (var a = typeof r != "string" ? r : He(r), i = typeof r == "string" ? r : Qe(r), s = a.s.r; s <= a.e.r; ++s) for (var l = a.s.c; l <= a.e.c; ++l) {
    var f = wn(e, s, l);
    f.t = "n", f.F = i, delete f.v, s == a.s.r && l == a.s.c && (f.f = t, n && (f.D = !0));
  }
  return e;
}
var Yt = {
  encode_col: vt,
  encode_row: ht,
  encode_cell: Ue,
  encode_range: Qe,
  decode_col: Ya,
  decode_row: za,
  split_cell: Of,
  decode_cell: it,
  decode_range: Rt,
  format_cell: nr,
  sheet_add_aoa: Mi,
  sheet_add_json: Ms,
  sheet_add_dom: Ds,
  aoa_to_sheet: Zr,
  json_to_sheet: fx,
  table_to_sheet: Os,
  table_to_book: Wd,
  sheet_to_csv: i0,
  sheet_to_txt: Ls,
  sheet_to_json: na,
  sheet_to_html: Cs,
  sheet_to_formulae: lx,
  sheet_to_row_object_array: na,
  sheet_get_cell: wn,
  book_new: cx,
  book_append_sheet: ux,
  book_set_sheet_visibility: hx,
  cell_set_number_format: dx,
  cell_set_hyperlink: Bs,
  cell_set_internal_link: xx,
  cell_add_comment: vx,
  sheet_set_array_formula: px,
  consts: {
    SHEET_VISIBLE: 0,
    SHEET_HIDDEN: 1,
    SHEET_VERY_HIDDEN: 2
  }
};
const mx = { class: "wr-header" }, gx = { class: "wr-week-label" }, _x = {
  key: 0,
  class: "wr-body"
}, Tx = { class: "wr-stats" }, Ex = { class: "wr-stat" }, wx = { class: "wr-stat__num" }, Sx = { class: "wr-stat wr-stat--green" }, Ax = { class: "wr-stat__num" }, yx = { class: "wr-stat wr-stat--orange" }, Fx = { class: "wr-stat__num" }, kx = { class: "wr-stat__num" }, Cx = { class: "wr-section" }, Dx = { class: "wr-table" }, Ox = {
  key: 0,
  class: "wr-section"
}, Ix = { class: "wr-table" }, Rx = { class: "td-green" }, Nx = {
  key: 1,
  class: "wr-section"
}, Px = { class: "wr-overdue-list" }, Lx = {
  key: 0,
  class: "wr-proj"
}, Mx = { class: "wr-summary" }, Bx = /* @__PURE__ */ Kr({
  __name: "WeeklyReportDialog",
  props: {
    visible: { type: Boolean },
    generateReport: { type: Function }
  },
  emits: ["close"],
  setup(e, { emit: r }) {
    const t = e, n = Ie(d0(nt()));
    Ba(() => t.visible, (u) => {
      u && (n.value = d0(nt()));
    });
    const a = Ye(() => t.generateReport(n.value)), i = Ye(() => {
      const u = n.value, h = Ra(u), [y, C, D] = u.split("-").map(Number), [, L, q] = h.split("-").map(Number), se = o(u);
      return `${y}年${C}月${D}日 — ${L}月${q}日（第${se}周）`;
    }), s = Ye(() => Ra(n.value) < nt());
    function l() {
      const u = new Date(n.value);
      u.setDate(u.getDate() - 7), n.value = `${u.getFullYear()}-${String(u.getMonth() + 1).padStart(2, "0")}-${String(u.getDate()).padStart(2, "0")}`;
    }
    function f() {
      if (!s.value) return;
      const u = new Date(n.value);
      u.setDate(u.getDate() + 7), n.value = `${u.getFullYear()}-${String(u.getMonth() + 1).padStart(2, "0")}-${String(u.getDate()).padStart(2, "0")}`;
    }
    function o(u) {
      const h = new Date(u), y = new Date(h.getFullYear(), 0, 1), C = h.getTime() - y.getTime();
      return Math.ceil((C / 864e5 + y.getDay() + 1) / 7);
    }
    function c(u) {
      const [, h, y] = u.split("-").map(Number);
      return `${h}/${y}`;
    }
    const x = Ye(() => {
      var h;
      const u = ((h = a.value) == null ? void 0 : h.completionRate) ?? 0;
      return u >= 80 ? "wr-stat--green" : u >= 50 ? "wr-stat--orange" : "wr-stat--red";
    }), p = Ye(() => {
      if (!a.value) return [];
      const u = a.value, h = [];
      u.completionRate >= 80 ? h.push("本周完成度很高，继续保持！") : u.completionRate >= 50 ? h.push("本周完成了大部分任务，还有提升空间。") : u.totalCreated > 0 ? h.push("本周完成度偏低，建议精简任务优先级。") : h.push("本周暂无任务记录。");
      const y = u.overdueTasks.filter((C) => C.rolloverCount >= 3);
      return y.length > 0 && h.push(`有${y.length}个任务反复顺延超过3次，建议评估是否需要调整优先级。`), u.projectStats.forEach((C) => {
        C.created > 0 && C.completed / C.created < 0.3 && h.push(`「${C.name}」任务完成度较低，建议关注进度。`);
      }), h;
    });
    function v() {
      if (!a.value) return;
      const u = JSON.stringify(a.value, null, 2), h = new Blob([u], { type: "application/json" }), y = URL.createObjectURL(h), C = document.createElement("a");
      C.href = y, C.download = `weekly-report-${n.value}.json`, C.click(), URL.revokeObjectURL(y);
    }
    function T() {
      if (!a.value) return;
      const u = a.value, h = Yt.book_new(), y = [
        ["周期", `${u.weekStart} ~ ${u.weekEnd}`],
        ["新建任务", u.totalCreated],
        ["完成任务", u.totalCompleted],
        ["顺延任务", u.totalRollover],
        ["逾期任务", u.totalOverdue],
        ["完成率", `${u.completionRate.toFixed(1)}%`]
      ];
      Yt.book_append_sheet(h, Yt.aoa_to_sheet(y), "周报概览");
      const C = [["日期", "新建", "完成", "顺延"], ...u.dailyStats.map((L) => [L.date, L.created, L.completed, L.rollover])];
      Yt.book_append_sheet(h, Yt.aoa_to_sheet(C), "每日明细");
      const D = [
        ["任务标题", "所属项目", "原定日期", "顺延次数"],
        ...u.overdueTasks.map((L) => [L.title, L.project ?? "", L.originalTargetDate, L.rolloverCount])
      ];
      Yt.book_append_sheet(h, Yt.aoa_to_sheet(D), "逾期任务"), Ps(h, `weekly-report-${u.weekStart}.xlsx`);
    }
    return (u, h) => (Y(), Lt(le(vn), {
      "model-value": e.visible,
      title: "每周复盘",
      width: "680px",
      onClose: h[0] || (h[0] = (y) => u.$emit("close")),
      "append-to-body": ""
    }, {
      footer: ge(() => [
        ve(le(We), { onClick: v }, {
          default: ge(() => [...h[16] || (h[16] = [
            Ce("导出 JSON", -1)
          ])]),
          _: 1
        }),
        ve(le(We), {
          type: "primary",
          onClick: T
        }, {
          default: ge(() => [...h[17] || (h[17] = [
            Ce("导出 Excel", -1)
          ])]),
          _: 1
        })
      ]),
      default: ge(() => [
        X("div", mx, [
          ve(le(We), {
            size: "small",
            onClick: l
          }, {
            default: ge(() => [...h[1] || (h[1] = [
              Ce("‹ 上周", -1)
            ])]),
            _: 1
          }),
          X("span", gx, _e(i.value), 1),
          ve(le(We), {
            size: "small",
            onClick: f,
            disabled: !s.value
          }, {
            default: ge(() => [...h[2] || (h[2] = [
              Ce("下周 ›", -1)
            ])]),
            _: 1
          }, 8, ["disabled"])
        ]),
        a.value ? (Y(), Q("div", _x, [
          X("div", Tx, [
            X("div", Ex, [
              X("div", wx, _e(a.value.totalCreated), 1),
              h[3] || (h[3] = X("div", { class: "wr-stat__label" }, "新建任务", -1))
            ]),
            X("div", Sx, [
              X("div", Ax, _e(a.value.totalCompleted), 1),
              h[4] || (h[4] = X("div", { class: "wr-stat__label" }, "完成任务", -1))
            ]),
            X("div", yx, [
              X("div", Fx, _e(a.value.totalRollover), 1),
              h[5] || (h[5] = X("div", { class: "wr-stat__label" }, "顺延任务", -1))
            ]),
            X("div", {
              class: hr(["wr-stat", x.value])
            }, [
              X("div", kx, _e(a.value.completionRate.toFixed(1)) + "%", 1),
              h[6] || (h[6] = X("div", { class: "wr-stat__label" }, "完成率", -1))
            ], 2)
          ]),
          X("div", Cx, [
            h[11] || (h[11] = X("div", { class: "wr-section__title" }, "📈 每日趋势", -1)),
            X("table", Dx, [
              X("thead", null, [
                X("tr", null, [
                  h[7] || (h[7] = X("th", null, "日期", -1)),
                  (Y(!0), Q(Ne, null, Ze(a.value.dailyStats, (y) => (Y(), Q("th", {
                    key: y.date
                  }, _e(c(y.date)), 1))), 128))
                ])
              ]),
              X("tbody", null, [
                X("tr", null, [
                  h[8] || (h[8] = X("td", null, "新建", -1)),
                  (Y(!0), Q(Ne, null, Ze(a.value.dailyStats, (y) => (Y(), Q("td", {
                    key: y.date
                  }, _e(y.created || "-"), 1))), 128))
                ]),
                X("tr", null, [
                  h[9] || (h[9] = X("td", null, "完成", -1)),
                  (Y(!0), Q(Ne, null, Ze(a.value.dailyStats, (y) => (Y(), Q("td", {
                    key: y.date,
                    class: "td-green"
                  }, _e(y.completed || "-"), 1))), 128))
                ]),
                X("tr", null, [
                  h[10] || (h[10] = X("td", null, "顺延", -1)),
                  (Y(!0), Q(Ne, null, Ze(a.value.dailyStats, (y) => (Y(), Q("td", {
                    key: y.date,
                    class: "td-orange"
                  }, _e(y.rollover || "-"), 1))), 128))
                ])
              ])
            ])
          ]),
          a.value.projectStats.length > 0 ? (Y(), Q("div", Ox, [
            h[13] || (h[13] = X("div", { class: "wr-section__title" }, "📊 按项目统计", -1)),
            X("table", Ix, [
              h[12] || (h[12] = X("thead", null, [
                X("tr", null, [
                  X("th", null, "项目"),
                  X("th", null, "新建"),
                  X("th", null, "完成"),
                  X("th", null, "完成率")
                ])
              ], -1)),
              X("tbody", null, [
                (Y(!0), Q(Ne, null, Ze(a.value.projectStats, (y) => (Y(), Q("tr", {
                  key: y.name
                }, [
                  X("td", null, _e(y.name), 1),
                  X("td", null, _e(y.created), 1),
                  X("td", Rx, _e(y.completed), 1),
                  X("td", null, _e(y.created > 0 ? Math.round(y.completed / y.created * 100) : 0) + "%", 1)
                ]))), 128))
              ])
            ])
          ])) : De("", !0),
          a.value.overdueTasks.length > 0 ? (Y(), Q("div", Nx, [
            h[14] || (h[14] = X("div", { class: "wr-section__title" }, "⚠️ 当前逾期未完成", -1)),
            X("div", Px, [
              (Y(!0), Q(Ne, null, Ze(a.value.overdueTasks, (y) => (Y(), Q("div", {
                key: y.id,
                class: "wr-overdue-item"
              }, [
                Ce(" · " + _e(y.title) + "（原定" + _e(le(Ia)(y.originalTargetDate)) + "，已顺延" + _e(y.rolloverCount) + "次） ", 1),
                y.project ? (Y(), Q("span", Lx, _e(y.project), 1)) : De("", !0)
              ]))), 128))
            ])
          ])) : De("", !0),
          X("div", Mx, [
            h[15] || (h[15] = X("div", { class: "wr-section__title" }, "💡 本周小结", -1)),
            (Y(!0), Q(Ne, null, Ze(p.value, (y, C) => (Y(), Q("p", {
              key: C,
              class: "wr-summary-line"
            }, _e(y), 1))), 128))
          ])
        ])) : De("", !0)
      ]),
      _: 1
    }, 8, ["model-value"]));
  }
}), bx = /* @__PURE__ */ Sn(Bx, [["__scopeId", "data-v-5fd6dd57"]]), Ux = { class: "todo-root" }, Wx = { class: "todo-header" }, $x = { class: "todo-header__actions" }, Vx = { class: "todo-layout" }, Hx = { class: "todo-sidebar" }, Gx = ["onClick"], jx = { class: "nav-icon" }, Xx = { class: "nav-label" }, zx = {
  key: 0,
  class: "nav-badge"
}, Yx = ["onClick"], Kx = { class: "nav-label" }, Jx = {
  key: 0,
  class: "nav-badge"
}, Zx = { class: "nav-section-title" }, qx = {
  key: 0,
  class: "group-mgr-panel"
}, Qx = { style: { display: "flex", gap: "4px", "margin-top": "4px" } }, ev = { class: "group-mgr-item__header" }, tv = { class: "group-mgr-item__name" }, rv = { class: "group-mgr-item__count" }, nv = { class: "group-mgr-item__actions" }, av = ["onClick"], iv = ["onClick"], sv = { class: "group-mgr-item__members" }, lv = {
  key: 0,
  class: "group-mgr-item"
}, fv = { style: { display: "flex", gap: "4px", "margin-top": "4px" } }, ov = { class: "todo-main" }, cv = {
  key: 0,
  class: "todo-content-header"
}, uv = { class: "todo-content-header__left" }, hv = { class: "view-title" }, dv = {
  key: 1,
  class: "view-title"
}, xv = {
  key: 2,
  class: "view-title"
}, vv = {
  key: 3,
  class: "view-title"
}, pv = {
  key: 1,
  class: "search-view"
}, mv = { class: "task-list" }, gv = {
  key: 0,
  class: "empty-hint"
}, _v = {
  key: 1,
  class: "empty-hint"
}, Tv = {
  key: 0,
  class: "empty-hint"
}, Ev = { class: "ie-section" }, wv = { class: "ie-section" }, Sv = { style: { "margin-top": "8px" } }, Av = { class: "color-picker" }, yv = ["onClick"], Fv = /* @__PURE__ */ Kr({
  __name: "TodoView",
  props: {
    api: {},
    toolId: {}
  },
  setup(e) {
    const r = Vs(), {
      allProjectNames: t,
      checkRollover: n,
      createTask: a,
      updateTask: i,
      deleteTask: s,
      completeTask: l,
      uncompleteTask: f,
      completeSubTask: o,
      uncompleteSubTask: c,
      splitTask: x,
      unsplitTask: p,
      addProject: v,
      getTasksForDate: T,
      getTasksForDateWithCompleted: u,
      getChildren: h,
      getAllPending: y,
      getPendingActivation: C,
      searchTasks: D,
      getTasksByProject: L,
      generateWeeklyReport: q,
      exportJson: se,
      importJson: O,
      tasks: V,
      projects: M,
      groups: G,
      addGroup: z,
      updateGroup: K,
      deleteGroup: fe
    } = r;
    s0(() => {
      n();
    });
    const pe = Ie("today"), Ee = [
      { key: "today", icon: "📅", label: "今天" },
      { key: "yesterday", icon: "📅", label: "昨天" },
      { key: "dayBefore", icon: "📅", label: "前天" },
      { key: "divider1", divider: !0, icon: "", label: "" },
      { key: "all", icon: "📋", label: "全部待办" },
      { key: "pending", icon: "⏳", label: "待生效" },
      { key: "search", icon: "🔍", label: "搜索" },
      { key: "divider2", divider: !0, icon: "", label: "" },
      { key: "history", icon: "🗓️", label: "历史日期" }
    ];
    function Ge(ce) {
      pe.value = ce, ce === "search" && ti(() => {
        var b;
        return (b = de.value) == null ? void 0 : b.focus();
      });
    }
    const Le = Ye(() => {
      const ce = nt(), b = V.value.filter((ye) => ye.status === "todo" && !ye.parentId && !(ye.startDate && ye.startDate > ce)), J = V.value.filter((ye) => ye.status === "todo" && !ye.parentId && ye.startDate && ye.startDate > ce), Oe = {
        today: b.filter((ye) => ye.targetDate === ce).length,
        all: b.length,
        pending: J.length
      };
      for (const ye of t.value)
        Oe[`project:${ye}`] = b.filter((d) => d.project === ye).length;
      return Oe;
    }), lt = Ie(nt()), Ve = Ye(() => pe.value === "today" ? nt() : pe.value === "yesterday" ? u0(-1) : pe.value === "dayBefore" ? u0(-2) : pe.value === "history" ? lt.value : nt()), rt = Ye(
      () => ["today", "yesterday", "dayBefore", "history"].includes(pe.value)
    ), H = Ye(
      () => ["yesterday", "dayBefore", "history"].includes(pe.value)
    ), m = Ye(
      () => H.value
    ), k = Ie(!0), A = Ye(() => {
      const ce = Ve.value, b = nt(), [J, Oe, ye] = ce.split("-").map(Number), d = ["日", "一", "二", "三", "四", "五", "六"], E = new Date(ce), g = d[E.getDay()], _ = `${J}年${Oe}月${ye}日 周${g}`;
      return ce === b ? `📅 ${_} (今天)` : pe.value === "yesterday" ? `📅 ${_} (昨天)` : pe.value === "dayBefore" ? `📅 ${_} (前天)` : `📅 ${_}`;
    });
    function F() {
    }
    const B = Ye(() => pe.value === "all" ? y() : pe.value === "pending" ? C() : pe.value.startsWith("project:") ? L(pe.value.slice(8)) : rt.value ? H.value && k.value ? u(Ve.value) : T(Ve.value) : []), ie = Ie(""), xe = Ie([]), de = Ie();
    function ne() {
      xe.value = D(ie.value);
    }
    function Fe() {
      me.value = null, Se.value = !0;
    }
    const Se = Ie(!1), me = Ie(null);
    function Te(ce) {
      me.value = ce, Se.value = !0;
    }
    function ze(ce) {
      var b;
      me.value ? (i(me.value.id, ce), (b = ce.stakeholders) == null || b.forEach((J) => {
        J.name && r.rememberStakeholder(J.name, J.role ?? "");
      })) : ce.title && a({ title: ce.title, targetDate: ce.targetDate ?? Ve.value, ...ce }), Se.value = !1, me.value = null;
    }
    function ke(ce) {
      Se.value = !1, wt(ce);
    }
    function ue(ce) {
      ce.status === "completed" ? f(ce.id) : l(ce.id);
    }
    function mt(ce) {
      ce.status === "completed" ? c(ce.id) : o(ce.id);
    }
    const Et = Ie(!1), Bt = Ie(null);
    function Jt(ce) {
      Bt.value = ce, Et.value = !0;
    }
    function On(ce, b) {
      x(ce, b), Et.value = !1, Bt.value = null;
    }
    function Lr(ce) {
      c0.confirm("取消拆分后，子任务将变为独立任务。确认？", "取消拆分", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => p(ce.id)).catch(() => {
      });
    }
    function wt(ce) {
      const b = ce.isSplit ? `删除「${ce.title}」及其所有子任务？` : `删除「${ce.title}」？`;
      c0.confirm(b, "删除任务", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        s(ce.id), Ta.success("已删除");
      }).catch(() => {
      });
    }
    const Gt = Ie(!1), jt = Ie(""), ir = Ie("#4A90D9"), Zt = ["#4A90D9", "#67c23a", "#e6a23c", "#f56c6c", "#909399", "#409eff", "#7b5ea7", "#00bcd4"];
    function ha(ce) {
      var b;
      return ((b = M.value.find((J) => J.name === ce)) == null ? void 0 : b.color) ?? "#909399";
    }
    const en = Ye(() => {
      const ce = {};
      return M.value.forEach((b) => {
        ce[b.name] = b.color;
      }), ce;
    });
    function Mr() {
      jt.value.trim() && (v(jt.value.trim(), ir.value), jt.value = "", ir.value = "#4A90D9", Gt.value = !1);
    }
    const _r = Ie(!1), sr = Ie(!1), lr = Ie(""), Tr = Ie(""), Br = Ie(""), Er = Ie(""), wr = Ie("");
    function tn(ce) {
      return ce.split(/[,，]/).map((b) => b.trim()).filter(Boolean).map((b) => {
        const [J, Oe] = b.split(/[/／]/).map((ye) => ye.trim());
        return { name: J, role: Oe ?? "" };
      });
    }
    function In() {
      lr.value.trim() && (z(lr.value.trim(), tn(Tr.value)), lr.value = "", Tr.value = "", sr.value = !1);
    }
    function da(ce) {
      Br.value = ce.id, Er.value = ce.name, wr.value = ce.members.map((b) => b.role ? `${b.name}/${b.role}` : b.name).join("，");
    }
    function xa(ce) {
      Er.value.trim() && (K(ce, Er.value.trim(), tn(wr.value)), Br.value = "");
    }
    const fr = Ie(!1), Sr = Ie(!1), rn = Ie("merge"), Rn = Ie();
    function va() {
      const ce = se(), b = new Blob([ce], { type: "application/json" }), J = URL.createObjectURL(b), Oe = document.createElement("a");
      Oe.href = J, Oe.download = `todo-backup-${nt()}.json`, Oe.click(), URL.revokeObjectURL(J);
    }
    function pa() {
      const b = V.value.filter((ye) => !ye.parentId).map((ye, d) => {
        const E = ye.parentId ? V.value.find((_) => _.id === ye.parentId) : null, g = ye.stakeholders ?? [];
        return [
          d + 1,
          ye.title,
          (E == null ? void 0 : E.title) ?? "",
          ye.status === "completed" ? "已完成" : "待办",
          ye.project ?? "",
          ye.targetDate,
          ye.originalTargetDate,
          ye.rolloverCount,
          g.map((_) => `${_.name}${_.role ? `(${_.role})` : ""}`).join("; "),
          g.map((_) => _.remark ?? "").join("; "),
          ye.createdAt,
          ye.completedAt ?? "",
          ye.description ?? ""
        ];
      }), J = Yt.aoa_to_sheet([
        ["序号", "任务标题", "父任务", "状态", "所属项目", "目标日期", "原始日期", "顺延次数", "干系人", "干系人备注", "创建时间", "完成时间", "描述"],
        ...b
      ]), Oe = Yt.book_new();
      Yt.book_append_sheet(Oe, J, "任务明细"), Ps(Oe, `todo-export-${nt()}.xlsx`);
    }
    function ma(ce) {
      var Oe;
      const b = (Oe = ce.target.files) == null ? void 0 : Oe[0];
      if (!b) return;
      const J = new FileReader();
      J.onload = (ye) => {
        var d;
        try {
          const E = O((d = ye.target) == null ? void 0 : d.result, rn.value);
          Ta.success(`导入完成：新增 ${E.imported} 条，跳过 ${E.skipped} 条`), Sr.value = !1;
        } catch (E) {
          Ta.error("导入失败：" + E.message);
        }
        ce.target.value = "";
      }, J.readAsText(b, "UTF-8");
    }
    function ga(ce) {
      const b = ce.target.tagName;
      b === "INPUT" || b === "TEXTAREA" || ((ce.key === "n" || ce.key === "N") && pe.value !== "search" && Fe(), (ce.ctrlKey || ce.metaKey) && ce.key === "f" && (ce.preventDefault(), Ge("search")));
    }
    return s0(() => {
      document.addEventListener("keydown", ga);
    }), (ce, b) => (Y(), Q("div", Ux, [
      X("div", Wx, [
        b[26] || (b[26] = X("span", { class: "todo-header__title" }, "✅ 待办任务", -1)),
        X("div", $x, [
          ve(le(We), {
            size: "small",
            onClick: b[0] || (b[0] = (J) => Sr.value = !0)
          }, {
            default: ge(() => [...b[24] || (b[24] = [
              Ce("导出/导入", -1)
            ])]),
            _: 1
          }),
          ve(le(We), {
            size: "small",
            onClick: b[1] || (b[1] = (J) => fr.value = !0)
          }, {
            default: ge(() => [...b[25] || (b[25] = [
              Ce("📊 复盘", -1)
            ])]),
            _: 1
          })
        ])
      ]),
      X("div", Vx, [
        X("div", Hx, [
          (Y(), Q(Ne, null, Ze(Ee, (J) => X("div", {
            key: J.key,
            class: hr(["nav-item", { "nav-item--active": pe.value === J.key, "nav-divider": J.divider }]),
            onClick: (Oe) => J.divider ? null : Ge(J.key)
          }, [
            J.divider ? De("", !0) : (Y(), Q(Ne, { key: 0 }, [
              X("span", jx, _e(J.icon), 1),
              X("span", Xx, _e(J.label), 1),
              Le.value[J.key] ? (Y(), Q("span", zx, _e(Le.value[J.key] > 99 ? "99+" : Le.value[J.key]), 1)) : De("", !0)
            ], 64))
          ], 10, Gx)), 64)),
          b[32] || (b[32] = X("div", { class: "nav-section-title" }, "📁 项目", -1)),
          (Y(!0), Q(Ne, null, Ze(le(t), (J) => (Y(), Q("div", {
            key: J,
            class: hr(["nav-item nav-item--sub", { "nav-item--active": pe.value === "project:" + J }]),
            onClick: (Oe) => Ge("project:" + J)
          }, [
            X("span", {
              class: "nav-dot",
              style: Da({ background: ha(J) })
            }, null, 4),
            X("span", Kx, _e(J), 1),
            Le.value["project:" + J] ? (Y(), Q("span", Jx, _e(Le.value["project:" + J] > 99 ? "99+" : Le.value["project:" + J]), 1)) : De("", !0)
          ], 10, Yx))), 128)),
          X("div", {
            class: "nav-item nav-item--sub nav-item--add-project",
            onClick: b[2] || (b[2] = (J) => Gt.value = !0)
          }, " + 新建项目 "),
          X("div", Zx, [
            b[27] || (b[27] = Ce(" 👥 干系人群组 ", -1)),
            X("span", {
              class: "nav-section-action",
              onClick: b[3] || (b[3] = (J) => _r.value = !_r.value)
            }, _e(_r.value ? "收起" : "管理"), 1)
          ]),
          _r.value ? (Y(), Q("div", qx, [
            (Y(!0), Q(Ne, null, Ze(le(G), (J) => (Y(), Q("div", {
              key: J.id,
              class: "group-mgr-item"
            }, [
              Br.value === J.id ? (Y(), Q(Ne, { key: 0 }, [
                ve(le(Wt), {
                  modelValue: Er.value,
                  "onUpdate:modelValue": b[4] || (b[4] = (Oe) => Er.value = Oe),
                  placeholder: "群组名",
                  size: "small",
                  style: { width: "100%" }
                }, null, 8, ["modelValue"]),
                ve(le(Wt), {
                  modelValue: wr.value,
                  "onUpdate:modelValue": b[5] || (b[5] = (Oe) => wr.value = Oe),
                  placeholder: "成员（逗号分隔，姓名/角色）",
                  size: "small",
                  style: { width: "100%", "margin-top": "4px" },
                  type: "textarea",
                  rows: 2
                }, null, 8, ["modelValue"]),
                X("div", Qx, [
                  ve(le(We), {
                    size: "small",
                    type: "primary",
                    onClick: (Oe) => xa(J.id)
                  }, {
                    default: ge(() => [...b[28] || (b[28] = [
                      Ce("保存", -1)
                    ])]),
                    _: 1
                  }, 8, ["onClick"]),
                  ve(le(We), {
                    size: "small",
                    onClick: b[6] || (b[6] = (Oe) => Br.value = "")
                  }, {
                    default: ge(() => [...b[29] || (b[29] = [
                      Ce("取消", -1)
                    ])]),
                    _: 1
                  })
                ])
              ], 64)) : (Y(), Q(Ne, { key: 1 }, [
                X("div", ev, [
                  X("span", tv, _e(J.name), 1),
                  X("span", rv, _e(J.members.length) + "人", 1),
                  X("span", nv, [
                    X("span", {
                      class: "group-action-btn",
                      onClick: (Oe) => da(J)
                    }, "✏️", 8, av),
                    X("span", {
                      class: "group-action-btn",
                      onClick: (Oe) => le(fe)(J.id)
                    }, "🗑️", 8, iv)
                  ])
                ]),
                X("div", sv, _e(J.members.map((Oe) => Oe.name).join("、")), 1)
              ], 64))
            ]))), 128)),
            sr.value ? (Y(), Q("div", lv, [
              ve(le(Wt), {
                modelValue: lr.value,
                "onUpdate:modelValue": b[7] || (b[7] = (J) => lr.value = J),
                placeholder: "群组名",
                size: "small",
                style: { width: "100%" }
              }, null, 8, ["modelValue"]),
              ve(le(Wt), {
                modelValue: Tr.value,
                "onUpdate:modelValue": b[8] || (b[8] = (J) => Tr.value = J),
                placeholder: "成员（逗号分隔，姓名/角色）",
                size: "small",
                style: { width: "100%", "margin-top": "4px" },
                type: "textarea",
                rows: 2
              }, null, 8, ["modelValue"]),
              X("div", fv, [
                ve(le(We), {
                  size: "small",
                  type: "primary",
                  onClick: In
                }, {
                  default: ge(() => [...b[30] || (b[30] = [
                    Ce("保存", -1)
                  ])]),
                  _: 1
                }),
                ve(le(We), {
                  size: "small",
                  onClick: b[9] || (b[9] = (J) => sr.value = !1)
                }, {
                  default: ge(() => [...b[31] || (b[31] = [
                    Ce("取消", -1)
                  ])]),
                  _: 1
                })
              ])
            ])) : De("", !0),
            sr.value ? De("", !0) : (Y(), Q("div", {
              key: 1,
              class: "nav-item nav-item--sub nav-item--add-project",
              onClick: b[10] || (b[10] = (J) => sr.value = !0)
            }, " + 新建群组 "))
          ])) : De("", !0)
        ]),
        X("div", ov, [
          rt.value || pe.value === "all" || pe.value === "pending" || pe.value.startsWith("project:") ? (Y(), Q("div", cv, [
            X("div", uv, [
              rt.value ? (Y(), Q(Ne, { key: 0 }, [
                X("span", hv, _e(A.value), 1),
                pe.value === "history" ? (Y(), Lt(le(Oa), {
                  key: 0,
                  modelValue: lt.value,
                  "onUpdate:modelValue": b[11] || (b[11] = (J) => lt.value = J),
                  type: "date",
                  "value-format": "YYYY-MM-DD",
                  size: "small",
                  style: { width: "160px", "margin-left": "8px" },
                  onChange: F
                }, null, 8, ["modelValue"])) : De("", !0),
                H.value ? (Y(), Lt(le(Ws), {
                  key: 1,
                  modelValue: k.value,
                  "onUpdate:modelValue": b[12] || (b[12] = (J) => k.value = J),
                  style: { "margin-left": "12px" },
                  "active-text": "显示已完成",
                  "inactive-text": "隐藏已完成",
                  size: "small"
                }, null, 8, ["modelValue"])) : De("", !0)
              ], 64)) : pe.value === "all" ? (Y(), Q("span", dv, "📋 全部待办")) : pe.value === "pending" ? (Y(), Q("span", xv, "⏳ 待生效")) : pe.value.startsWith("project:") ? (Y(), Q("span", vv, "📁 " + _e(pe.value.slice(8)), 1)) : De("", !0)
            ]),
            m.value ? De("", !0) : (Y(), Lt(le(We), {
              key: 0,
              type: "primary",
              size: "small",
              onClick: Fe
            }, {
              default: ge(() => [...b[33] || (b[33] = [
                Ce(" + 新任务 ", -1)
              ])]),
              _: 1
            }))
          ])) : pe.value === "search" ? (Y(), Q("div", pv, [
            ve(le(Wt), {
              modelValue: ie.value,
              "onUpdate:modelValue": b[13] || (b[13] = (J) => ie.value = J),
              placeholder: "搜索任务标题或描述...",
              clearable: "",
              "prefix-icon": "Search",
              ref_key: "searchInputRef",
              ref: de,
              onInput: ne
            }, null, 8, ["modelValue"])
          ])) : De("", !0),
          X("div", mv, [
            pe.value === "search" ? (Y(), Q(Ne, { key: 0 }, [
              ie.value ? xe.value.length === 0 ? (Y(), Q("div", _v, "未找到匹配的任务")) : De("", !0) : (Y(), Q("div", gv, "输入关键词搜索任务")),
              (Y(!0), Q(Ne, null, Ze(xe.value, (J) => (Y(), Lt(x0, {
                key: J.id,
                task: J,
                children: le(h)(J.id),
                "project-colors": en.value,
                readonly: !1,
                onToggle: ue,
                onToggleChild: mt,
                onEdit: Te,
                onSplit: Jt,
                onUnsplit: Lr,
                onDelete: wt
              }, null, 8, ["task", "children", "project-colors"]))), 128))
            ], 64)) : (Y(), Q(Ne, { key: 1 }, [
              B.value.length === 0 ? (Y(), Q("div", Tv, [
                m.value ? (Y(), Q(Ne, { key: 0 }, [
                  Ce("当天无任务记录")
                ], 64)) : (Y(), Q(Ne, { key: 1 }, [
                  Ce("暂无任务，点击「+ 新任务」开始")
                ], 64))
              ])) : De("", !0),
              (Y(!0), Q(Ne, null, Ze(B.value, (J) => (Y(), Lt(x0, {
                key: J.id,
                task: J,
                children: le(h)(J.id),
                "project-colors": en.value,
                readonly: m.value,
                onToggle: ue,
                onToggleChild: mt,
                onEdit: Te,
                onSplit: Jt,
                onUnsplit: Lr,
                onDelete: wt
              }, null, 8, ["task", "children", "project-colors", "readonly"]))), 128))
            ], 64))
          ])
        ])
      ]),
      ve(Tl, {
        visible: Se.value,
        task: me.value,
        "default-date": Ve.value,
        "all-projects": le(t),
        groups: le(G),
        onSave: ze,
        onCancel: b[14] || (b[14] = (J) => Se.value = !1),
        onDelete: ke
      }, null, 8, ["visible", "task", "default-date", "all-projects", "groups"]),
      ve(Fl, {
        visible: Et.value,
        task: Bt.value,
        onConfirm: On,
        onCancel: b[15] || (b[15] = (J) => Et.value = !1)
      }, null, 8, ["visible", "task"]),
      ve(bx, {
        visible: fr.value,
        "generate-report": le(q),
        onClose: b[16] || (b[16] = (J) => fr.value = !1)
      }, null, 8, ["visible", "generate-report"]),
      ve(le(vn), {
        modelValue: Sr.value,
        "onUpdate:modelValue": b[20] || (b[20] = (J) => Sr.value = J),
        title: "导出 / 导入",
        width: "440px",
        "append-to-body": ""
      }, {
        footer: ge(() => [
          ve(le(We), {
            onClick: b[19] || (b[19] = (J) => Sr.value = !1)
          }, {
            default: ge(() => [...b[41] || (b[41] = [
              Ce("关闭", -1)
            ])]),
            _: 1
          })
        ]),
        default: ge(() => [
          X("div", Ev, [
            b[36] || (b[36] = X("div", { class: "ie-title" }, "导出", -1)),
            ve(le(We), { onClick: va }, {
              default: ge(() => [...b[34] || (b[34] = [
                Ce("📄 导出 JSON", -1)
              ])]),
              _: 1
            }),
            ve(le(We), {
              onClick: pa,
              style: { "margin-left": "8px" }
            }, {
              default: ge(() => [...b[35] || (b[35] = [
                Ce("📊 导出 Excel", -1)
              ])]),
              _: 1
            })
          ]),
          X("div", wv, [
            b[40] || (b[40] = X("div", { class: "ie-title" }, "导入 JSON", -1)),
            ve(le($s), {
              modelValue: rn.value,
              "onUpdate:modelValue": b[17] || (b[17] = (J) => rn.value = J),
              size: "small"
            }, {
              default: ge(() => [
                ve(le(o0), { value: "merge" }, {
                  default: ge(() => [...b[37] || (b[37] = [
                    Ce("合并模式（保留现有数据）", -1)
                  ])]),
                  _: 1
                }),
                ve(le(o0), { value: "overwrite" }, {
                  default: ge(() => [...b[38] || (b[38] = [
                    Ce("覆盖模式（清空现有数据）", -1)
                  ])]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue"]),
            X("div", Sv, [
              X("input", {
                type: "file",
                accept: ".json",
                ref_key: "importFileRef",
                ref: Rn,
                onChange: ma,
                style: { display: "none" }
              }, null, 544),
              ve(le(We), {
                onClick: b[18] || (b[18] = (J) => {
                  var Oe;
                  return (Oe = Rn.value) == null ? void 0 : Oe.click();
                })
              }, {
                default: ge(() => [...b[39] || (b[39] = [
                  Ce("选择 JSON 文件", -1)
                ])]),
                _: 1
              })
            ])
          ])
        ]),
        _: 1
      }, 8, ["modelValue"]),
      ve(le(vn), {
        modelValue: Gt.value,
        "onUpdate:modelValue": b[23] || (b[23] = (J) => Gt.value = J),
        title: "新建项目",
        width: "360px",
        "append-to-body": ""
      }, {
        footer: ge(() => [
          ve(le(We), {
            onClick: b[22] || (b[22] = (J) => Gt.value = !1)
          }, {
            default: ge(() => [...b[42] || (b[42] = [
              Ce("取消", -1)
            ])]),
            _: 1
          }),
          ve(le(We), {
            type: "primary",
            onClick: Mr,
            disabled: !jt.value.trim()
          }, {
            default: ge(() => [...b[43] || (b[43] = [
              Ce("确认", -1)
            ])]),
            _: 1
          }, 8, ["disabled"])
        ]),
        default: ge(() => [
          ve(le(ri), {
            onSubmit: kt(Mr, ["prevent"])
          }, {
            default: ge(() => [
              ve(le(ur), { label: "项目名称" }, {
                default: ge(() => [
                  ve(le(Wt), {
                    modelValue: jt.value,
                    "onUpdate:modelValue": b[21] || (b[21] = (J) => jt.value = J),
                    placeholder: "项目名称",
                    onKeydown: ba(kt(Mr, ["prevent"]), ["enter"])
                  }, null, 8, ["modelValue", "onKeydown"])
                ]),
                _: 1
              }),
              ve(le(ur), { label: "颜色" }, {
                default: ge(() => [
                  X("div", Av, [
                    (Y(), Q(Ne, null, Ze(Zt, (J) => X("span", {
                      key: J,
                      class: hr(["color-dot", { "color-dot--selected": ir.value === J }]),
                      style: Da({ background: J }),
                      onClick: (Oe) => ir.value = J
                    }, null, 14, yv)), 64))
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"])
    ]));
  }
}), kv = /* @__PURE__ */ Sn(Fv, [["__scopeId", "data-v-cd170c8a"]]);
function Ov(e, r) {
  return Kr({
    render() {
      return Us(kv, { api: e, toolId: r });
    }
  });
}
export {
  Ov as createView
};
