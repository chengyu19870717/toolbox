import { ref as Pe, computed as Ze, defineComponent as zr, openBlock as ee, createElementBlock as le, normalizeClass as ur, createElementVNode as q, withModifiers as mt, toDisplayString as we, normalizeStyle as ya, createCommentVNode as ke, Fragment as Ue, renderList as rt, createTextVNode as Re, unref as ge, reactive as bs, watch as Na, nextTick as Fa, createBlock as $t, withCtx as Ee, createVNode as Te, withKeys as sn, onMounted as t0, h as Us } from "vue";
import { ElDialog as dn, ElForm as K0, ElFormItem as Tr, ElInput as hr, ElDatePicker as J0, ElSelect as r0, ElOption as n0, ElButton as je, ElSwitch as Ws, ElRadioGroup as $s, ElRadio as a0, ElMessageBox as i0, ElMessage as xa } from "element-plus";
const Mr = {
  tasks: "todo_tasks",
  projects: "todo_projects",
  memory: "todo_stakeholder_memory"
};
function nt() {
  const e = /* @__PURE__ */ new Date();
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function Nt() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
function Un() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}
function va(e, r) {
  try {
    const t = localStorage.getItem(e);
    return t ? JSON.parse(t) : r;
  } catch {
    return r;
  }
}
function pa(e, r) {
  localStorage.setItem(e, JSON.stringify(r));
}
function cr(e) {
  const r = /* @__PURE__ */ new Date();
  return r.setDate(r.getDate() + e), `${r.getFullYear()}-${String(r.getMonth() + 1).padStart(2, "0")}-${String(r.getDate()).padStart(2, "0")}`;
}
function ka(e) {
  if (!e) return "";
  const [r, t, n] = e.split("-");
  return `${parseInt(t)}/${parseInt(n)}`;
}
function s0(e, r) {
  return Math.round((new Date(e).getTime() - new Date(r).getTime()) / 864e5);
}
function f0(e) {
  const r = new Date(e), t = r.getDay() || 7;
  return r.setDate(r.getDate() - t + 1), `${r.getFullYear()}-${String(r.getMonth() + 1).padStart(2, "0")}-${String(r.getDate()).padStart(2, "0")}`;
}
function Ca(e) {
  const r = new Date(e);
  return r.setDate(r.getDate() + 6), `${r.getFullYear()}-${String(r.getMonth() + 1).padStart(2, "0")}-${String(r.getDate()).padStart(2, "0")}`;
}
function Hs(e, r) {
  let t = e.trim(), n = r, a = "";
  const i = t.match(/#(\S+)/);
  i && (a = i[1], t = t.replace(i[0], "").trim());
  const s = t.match(/📅([^\s#]+)/);
  if (s) {
    const f = s[1];
    t = t.replace(s[0], "").trim();
    const l = /* @__PURE__ */ new Date(), o = l.getFullYear();
    if (/^\d{1,2}\/\d{1,2}$/.test(f) || /^\d{1,2}-\d{1,2}$/.test(f)) {
      const [c, p] = f.split(/[\/\-]/).map(Number);
      n = `${o}-${String(c).padStart(2, "0")}-${String(p).padStart(2, "0")}`;
    } else if (/^\+\d+$/.test(f))
      n = cr(parseInt(f.slice(1)));
    else if (/^-\d+$/.test(f))
      n = cr(-parseInt(f.slice(1)));
    else if (f === "今天")
      n = nt();
    else if (f === "明天")
      n = cr(1);
    else if (f === "后天")
      n = cr(2);
    else if (/^周[一二三四五六日天]$/.test(f)) {
      const p = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 日: 0, 天: 0 }[f[1]], v = l.getDay();
      let h = p - v;
      h <= 0 && (h += 7), n = cr(h);
    } else if (/^下周[一二三四五六日天]$/.test(f)) {
      const p = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 日: 0, 天: 0 }[f[2]], v = l.getDay();
      let h = p - v + 7;
      h <= 7 && (h += 7), n = cr(h);
    }
  }
  return { title: t, targetDate: n, project: a };
}
function Vs() {
  const e = Pe(va(Mr.tasks, [])), r = Pe(va(Mr.projects, [])), t = Pe(va(Mr.memory, []));
  function n() {
    pa(Mr.tasks, e.value);
  }
  function a() {
    pa(Mr.projects, r.value);
  }
  function i() {
    pa(Mr.memory, t.value);
  }
  function s() {
    const V = nt();
    let b = !1;
    const K = Nt();
    e.value.filter((J) => J.status === "todo" && !J.parentId && J.targetDate < V).forEach((J) => {
      J.targetDate = V, J.rolloverCount += 1, J.updatedAt = K, b = !0, J.isSplit && e.value.filter((he) => he.parentId === J.id && he.status === "todo").forEach((he) => {
        he.targetDate = V, he.updatedAt = K;
      });
    }), b && n();
  }
  function f(V) {
    const b = nt(), K = Nt(), J = {
      id: Un(),
      title: V.title,
      description: V.description,
      parentId: V.parentId,
      status: "todo",
      isSplit: !1,
      targetDate: V.targetDate ?? b,
      project: V.project,
      stakeholders: V.stakeholders ?? [],
      createdAt: K,
      updatedAt: K,
      originalTargetDate: V.targetDate ?? b,
      rolloverCount: 0,
      sortIndex: V.sortIndex ?? Date.now()
    };
    return e.value.push(J), n(), J;
  }
  function l(V, b) {
    const K = e.value.find((J) => J.id === V);
    K && (Object.assign(K, b, { updatedAt: Nt() }), n());
  }
  function o(V) {
    const b = /* @__PURE__ */ new Set([V, ...e.value.filter((J) => J.parentId === V).map((J) => J.id)]);
    e.value = e.value.filter((J) => !b.has(J.id));
    const K = e.value.find((J) => {
      var he;
      return J.id === ((he = e.value.find((_e) => _e.id === V)) == null ? void 0 : he.parentId);
    });
    K && m(K.id), n();
  }
  function c(V) {
    const b = e.value.find((J) => J.id === V);
    if (!b) return;
    const K = Nt();
    b.isSplit && e.value.filter((J) => J.parentId === V).forEach((J) => {
      J.status === "todo" && (J.status = "completed", J.completedAt = K, J.updatedAt = K);
    }), b.status = "completed", b.completedAt = K, b.updatedAt = K, n();
  }
  function p(V) {
    const b = e.value.find((he) => he.id === V);
    if (!b) return;
    const K = nt(), J = Nt();
    if (b.status = "todo", b.completedAt = void 0, b.updatedAt = J, b.targetDate < K && (b.targetDate = K), b.parentId) {
      const he = e.value.find((_e) => _e.id === b.parentId);
      he && he.status === "completed" && (he.status = "todo", he.completedAt = void 0, he.updatedAt = J, he.targetDate < K && (he.targetDate = K));
    }
    n();
  }
  function v(V) {
    const b = e.value.find((J) => J.id === V);
    if (!b) return;
    const K = Nt();
    b.status = "completed", b.completedAt = K, b.updatedAt = K, b.parentId && m(b.parentId), n();
  }
  function h(V) {
    p(V);
  }
  function m(V) {
    const b = e.value.find((_e) => _e.id === V);
    if (!b) return;
    const K = e.value.filter((_e) => _e.parentId === V);
    if (K.length === 0) return;
    const J = Nt(), he = K.every((_e) => _e.status === "completed");
    he && b.status === "todo" ? (b.status = "completed", b.completedAt = J, b.updatedAt = J) : !he && b.status === "completed" && (b.status = "todo", b.completedAt = void 0, b.updatedAt = J);
  }
  function u(V, b) {
    const K = e.value.find((he) => he.id === V);
    if (!K || K.parentId) return;
    const J = Nt();
    b.filter((he) => he.trim()).forEach((he, _e) => {
      const We = {
        id: Un(),
        title: he.trim(),
        parentId: V,
        status: "todo",
        isSplit: !1,
        targetDate: K.targetDate,
        project: K.project,
        stakeholders: K.stakeholders ? JSON.parse(JSON.stringify(K.stakeholders)) : [],
        createdAt: J,
        updatedAt: J,
        originalTargetDate: K.targetDate,
        rolloverCount: 0,
        sortIndex: Date.now() + _e
      };
      e.value.push(We);
    }), K.isSplit = !0, K.updatedAt = J, n();
  }
  function d(V) {
    const b = e.value.find((he) => he.id === V);
    if (!b) return;
    const K = e.value.filter((he) => he.parentId === V), J = Nt();
    K.forEach((he) => {
      he.parentId = void 0, he.updatedAt = J;
    }), b.isSplit = !1, b.updatedAt = J, n();
  }
  function A(V, b = "#4A90D9") {
    const K = r.value.find((he) => he.name === V);
    if (K) return K;
    const J = {
      id: Un(),
      name: V,
      color: b,
      sortIndex: r.value.length,
      createdAt: Nt()
    };
    return r.value.push(J), a(), J;
  }
  function k(V) {
    r.value = r.value.filter((b) => b.id !== V), a();
  }
  const C = Ze(() => {
    const V = e.value.map((K) => K.project).filter(Boolean), b = r.value.map((K) => K.name);
    return [.../* @__PURE__ */ new Set([...b, ...V])].sort();
  });
  function M(V, b) {
    const K = t.value.find((J) => J.name === V);
    K ? (K.lastRole = b, K.usedCount += 1) : t.value.push({ name: V, lastRole: b, usedCount: 1 }), i();
  }
  function Q(V) {
    return e.value.filter((b) => !b.parentId && b.targetDate === V).sort((b, K) => b.status !== K.status ? b.status === "todo" ? -1 : 1 : b.sortIndex - K.sortIndex);
  }
  function ce(V) {
    const b = e.value.filter((he) => !he.parentId && he.targetDate === V), K = e.value.filter(
      (he) => {
        var _e;
        return !he.parentId && he.status === "completed" && ((_e = he.completedAt) == null ? void 0 : _e.startsWith(V)) && he.targetDate !== V;
      }
    );
    return [.../* @__PURE__ */ new Set([...b, ...K])].sort((he, _e) => he.status !== _e.status ? he.status === "todo" ? -1 : 1 : he.sortIndex - _e.sortIndex);
  }
  function O(V) {
    return e.value.filter((b) => b.parentId === V).sort((b, K) => b.sortIndex - K.sortIndex);
  }
  function H() {
    return e.value.filter((V) => !V.parentId && V.status === "todo").sort((V, b) => V.targetDate < b.targetDate ? -1 : V.targetDate > b.targetDate ? 1 : V.sortIndex - b.sortIndex);
  }
  function D(V) {
    if (!V.trim()) return [];
    const b = V.toLowerCase();
    return e.value.filter(
      (K) => {
        var J;
        return K.title.toLowerCase().includes(b) || ((J = K.description) == null ? void 0 : J.toLowerCase().includes(b));
      }
    ).sort((K, J) => J.createdAt.localeCompare(K.createdAt));
  }
  function j(V) {
    return e.value.filter((b) => !b.parentId && b.project === V).sort((b, K) => b.status !== K.status ? b.status === "todo" ? -1 : 1 : b.targetDate.localeCompare(K.targetDate));
  }
  function X(V) {
    const b = Ca(V), K = Nt(), J = e.value.filter(
      (B) => !B.parentId && B.createdAt >= V && B.createdAt <= b + "T23:59:59"
    ), he = e.value.filter(
      (B) => !B.parentId && B.status === "completed" && B.completedAt && B.completedAt >= V && B.completedAt <= b + "T23:59:59"
    ), _e = e.value.filter(
      (B) => !B.parentId && B.rolloverCount > 0 && B.originalTargetDate >= V && B.originalTargetDate <= b
    ), We = nt(), Ke = e.value.filter(
      (B) => !B.parentId && B.status === "todo" && B.targetDate < We
    ), S = J.length > 0 ? Math.round(he.filter((B) => J.some((ae) => ae.id === B.id)).length / J.length * 1e3) / 10 : 0, P = [];
    for (let B = 0; B < 7; B++) {
      const ae = new Date(V);
      ae.setDate(ae.getDate() + B);
      const xe = `${ae.getFullYear()}-${String(ae.getMonth() + 1).padStart(2, "0")}-${String(ae.getDate()).padStart(2, "0")}`;
      P.push({
        date: xe,
        created: e.value.filter((oe) => !oe.parentId && oe.createdAt.startsWith(xe)).length,
        completed: e.value.filter((oe) => {
          var se;
          return !oe.parentId && oe.status === "completed" && ((se = oe.completedAt) == null ? void 0 : se.startsWith(xe));
        }).length,
        rollover: e.value.filter((oe) => !oe.parentId && oe.status === "todo" && oe.originalTargetDate === xe && oe.rolloverCount > 0).length
      });
    }
    const F = /* @__PURE__ */ new Map();
    J.forEach((B) => {
      const ae = B.project || "未分类", xe = F.get(ae) ?? { created: 0, completed: 0 };
      xe.created++, F.set(ae, xe);
    }), he.forEach((B) => {
      const ae = B.project || "未分类", xe = F.get(ae) ?? { created: 0, completed: 0 };
      xe.completed++, F.set(ae, xe);
    });
    const y = [...F.entries()].map(([B, ae]) => ({ name: B, ...ae }));
    return {
      weekStart: V,
      weekEnd: b,
      generatedAt: K,
      totalCreated: J.length,
      totalCompleted: he.length,
      totalRollover: _e.length,
      totalOverdue: Ke.length,
      completionRate: S,
      dailyStats: P,
      overdueTasks: Ke,
      projectStats: y
    };
  }
  function Y() {
    return JSON.stringify({
      exportVersion: "3.0",
      exportedAt: Nt(),
      tasks: e.value,
      projects: r.value
    }, null, 2);
  }
  function ue(V, b) {
    const K = JSON.parse(V);
    if (!K.tasks || !Array.isArray(K.tasks)) throw new Error("无效的备份文件：缺少 tasks 数组");
    for (const _e of K.tasks) {
      if (!_e.id || !_e.title || !_e.targetDate) throw new Error(`任务数据不完整: ${JSON.stringify(_e).slice(0, 100)}`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(_e.targetDate)) throw new Error(`日期格式错误: ${_e.targetDate}`);
    }
    let J = 0, he = 0;
    if (b === "overwrite")
      e.value = K.tasks, r.value = K.projects ?? [], J = K.tasks.length;
    else {
      const _e = new Set(e.value.map((We) => We.id));
      for (const We of K.tasks) {
        if (_e.has(We.id)) {
          he++;
          continue;
        }
        e.value.push(We), J++;
      }
      for (const We of K.projects ?? [])
        r.value.find((Ke) => Ke.id === We.id) || r.value.push(We);
    }
    return n(), a(), { imported: J, skipped: he };
  }
  return {
    tasks: e,
    projects: r,
    memory: t,
    allProjectNames: C,
    checkRollover: s,
    createTask: f,
    updateTask: l,
    deleteTask: o,
    completeTask: c,
    uncompleteTask: p,
    completeSubTask: v,
    uncompleteSubTask: h,
    splitTask: u,
    unsplitTask: d,
    addProject: A,
    deleteProject: k,
    rememberStakeholder: M,
    getTasksForDate: Q,
    getTasksForDateWithCompleted: ce,
    getChildren: O,
    getAllPending: H,
    searchTasks: D,
    getTasksByProject: j,
    generateWeeklyReport: X,
    exportJson: Y,
    importJson: ue
  };
}
const Gs = { class: "task-item__main" }, js = {
  key: 0,
  viewBox: "0 0 16 16",
  class: "check-icon check-icon--done"
}, Xs = {
  key: 1,
  viewBox: "0 0 16 16",
  class: "check-icon"
}, zs = { class: "task-item__meta" }, Ys = {
  key: 1,
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
}, ef = { key: 0 }, tf = {
  key: 1,
  class: "task-item__sh-remark"
}, rf = {
  key: 2,
  class: "task-item__children"
}, nf = { class: "child-connector" }, af = ["onClick"], sf = {
  key: 0,
  viewBox: "0 0 16 16",
  class: "check-icon check-icon--done check-icon--sm"
}, ff = {
  key: 1,
  viewBox: "0 0 16 16",
  class: "check-icon check-icon--sm"
}, lf = {
  key: 0,
  class: "task-item__completed-badge",
  style: { "font-size": "12px" }
}, of = {
  class: "task-item__actions",
  style: { opacity: "0.6" }
}, cf = ["onClick"], uf = ["onClick"], hf = {
  key: 3,
  class: "task-item__rollover"
}, df = /* @__PURE__ */ zr({
  __name: "TaskItem",
  props: {
    task: {},
    children: {},
    projectColors: {},
    readonly: { type: Boolean }
  },
  emits: ["toggle", "toggleChild", "edit", "split", "unsplit", "delete"],
  setup(e, { emit: r }) {
    const t = e, n = r, a = Pe(!1), i = Ze(() => t.task.stakeholders ?? []), s = nt(), f = Ze(
      () => t.task.status === "todo" && t.task.targetDate < s
    ), l = Ze(() => {
      if (t.task.status !== "todo") return !1;
      const m = s0(t.task.targetDate, s);
      return m >= 0 && m <= 2;
    }), o = Ze(() => {
      if (!t.task.targetDate) return "";
      const m = ka(t.task.targetDate), u = s0(t.task.targetDate, s);
      return t.task.targetDate === s ? `${m} 今日` : u < 0 ? `${m} 逾期${-u}天` : u === 1 ? `${m} 明天` : `${m} 剩${u}天`;
    }), c = Ze(() => f.value ? "date-badge--overdue" : l.value ? "date-badge--warning" : ""), p = Ze(() => t.projectColors[t.task.project ?? ""] ?? "#e8f0fe");
    function v() {
      n("toggle", t.task);
    }
    function h(m) {
      n("toggleChild", m);
    }
    return (m, u) => (ee(), le("div", {
      class: ur(["task-item", [`task-item--${e.task.status}`, { "task-item--overdue": f.value, "task-item--warning": l.value }]])
    }, [
      q("div", Gs, [
        q("span", {
          class: "task-item__check",
          onClick: mt(v, ["stop"])
        }, [
          e.task.status === "completed" ? (ee(), le("svg", js, [...u[6] || (u[6] = [
            q("path", {
              d: "M13 3L6 11L3 8",
              stroke: "currentColor",
              "stroke-width": "2",
              fill: "none",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }, null, -1)
          ])])) : (ee(), le("svg", Xs, [...u[7] || (u[7] = [
            q("rect", {
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
        q("span", {
          class: "task-item__title",
          onDblclick: u[0] || (u[0] = (d) => m.$emit("edit", e.task))
        }, we(e.task.title), 33),
        q("div", zs, [
          e.task.status === "todo" ? (ee(), le("span", {
            key: 0,
            class: ur(["task-item__date", c.value])
          }, " 📅 " + we(o.value), 3)) : (ee(), le("span", Ys, "✅")),
          e.task.project ? (ee(), le("span", {
            key: 2,
            class: "task-item__project",
            style: ya({ background: p.value })
          }, we(e.task.project), 5)) : ke("", !0),
          i.value.length >= 3 ? (ee(), le("span", {
            key: 3,
            class: "task-item__stakeholders",
            onClick: u[1] || (u[1] = mt((d) => a.value = !a.value, ["stop"]))
          }, " 👤 " + we(i.value.length) + "人 ", 1)) : ke("", !0),
          q("span", Ks, [
            q("button", {
              class: "task-btn",
              onClick: u[2] || (u[2] = mt((d) => m.$emit("edit", e.task), ["stop"])),
              title: "编辑"
            }, "✏️"),
            !e.task.parentId && !e.task.isSplit && e.readonly === !1 ? (ee(), le("button", {
              key: 0,
              class: "task-btn",
              onClick: u[3] || (u[3] = mt((d) => m.$emit("split", e.task), ["stop"])),
              title: "拆分"
            }, "✂️")) : ke("", !0),
            e.task.isSplit && e.readonly === !1 ? (ee(), le("button", {
              key: 1,
              class: "task-btn",
              onClick: u[4] || (u[4] = mt((d) => m.$emit("unsplit", e.task), ["stop"])),
              title: "取消拆分"
            }, "🔀")) : ke("", !0),
            q("button", {
              class: "task-btn",
              onClick: u[5] || (u[5] = mt((d) => m.$emit("delete", e.task), ["stop"])),
              title: "删除"
            }, "🗑️")
          ])
        ])
      ]),
      i.value.length > 0 && i.value.length <= 2 ? (ee(), le("div", Js, [
        (ee(!0), le(Ue, null, rt(i.value, (d) => (ee(), le("div", {
          key: d.id,
          class: "task-item__sh"
        }, [
          Re(" 👤 " + we(d.name), 1),
          d.role ? (ee(), le("span", Zs, "（" + we(d.role) + "）", 1)) : ke("", !0),
          d.remark ? (ee(), le("span", qs, we(d.remark), 1)) : ke("", !0)
        ]))), 128))
      ])) : ke("", !0),
      i.value.length >= 3 && a.value ? (ee(), le("div", Qs, [
        (ee(!0), le(Ue, null, rt(i.value, (d) => (ee(), le("div", {
          key: d.id,
          class: "task-item__sh"
        }, [
          Re(" 👤 " + we(d.name), 1),
          d.role ? (ee(), le("span", ef, "（" + we(d.role) + "）", 1)) : ke("", !0),
          d.remark ? (ee(), le("span", tf, we(d.remark), 1)) : ke("", !0)
        ]))), 128))
      ])) : ke("", !0),
      e.task.isSplit && e.children.length > 0 ? (ee(), le("div", rf, [
        (ee(!0), le(Ue, null, rt(e.children, (d, A) => (ee(), le("div", {
          key: d.id,
          class: ur(["task-item__child", { "task-item__child--done": d.status === "completed" }])
        }, [
          q("span", nf, we(A === e.children.length - 1 ? "└" : "├"), 1),
          q("span", {
            class: "task-item__check task-item__check--sm",
            onClick: mt((k) => h(d), ["stop"])
          }, [
            d.status === "completed" ? (ee(), le("svg", sf, [...u[8] || (u[8] = [
              q("path", {
                d: "M13 3L6 11L3 8",
                stroke: "currentColor",
                "stroke-width": "2",
                fill: "none",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              }, null, -1)
            ])])) : (ee(), le("svg", ff, [...u[9] || (u[9] = [
              q("rect", {
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
          ], 8, af),
          q("span", {
            class: ur(["child-title", { "child-title--done": d.status === "completed" }])
          }, we(d.title), 3),
          d.status === "completed" ? (ee(), le("span", lf, "✅")) : ke("", !0),
          q("span", of, [
            q("button", {
              class: "task-btn",
              onClick: mt((k) => m.$emit("edit", d), ["stop"]),
              title: "编辑子任务"
            }, "✏️", 8, cf),
            q("button", {
              class: "task-btn",
              onClick: mt((k) => m.$emit("delete", d), ["stop"]),
              title: "删除子任务"
            }, "🗑️", 8, uf)
          ])
        ], 2))), 128))
      ])) : ke("", !0),
      e.task.rolloverCount > 0 && e.task.status === "todo" ? (ee(), le("div", hf, " 原定" + we(ge(ka)(e.task.originalTargetDate)) + "，已顺延" + we(e.task.rolloverCount) + "次 ", 1)) : ke("", !0)
    ], 2));
  }
}), En = (e, r) => {
  const t = e.__vccOpts || e;
  for (const [n, a] of r)
    t[n] = a;
  return t;
}, l0 = /* @__PURE__ */ En(df, [["__scopeId", "data-v-e640083a"]]), xf = { style: { display: "flex", gap: "12px" } }, vf = { style: { width: "100%" } }, pf = ["onClick"], mf = {
  key: 0,
  class: "sh-role"
}, gf = {
  key: 1,
  class: "sh-remark"
}, _f = /* @__PURE__ */ zr({
  __name: "TaskEditDialog",
  props: {
    visible: { type: Boolean },
    task: {},
    defaultDate: {},
    allProjects: {}
  },
  emits: ["save", "cancel", "delete"],
  setup(e, { emit: r }) {
    const t = e, n = r, a = Pe(), i = Pe(!0), s = Pe(-1), f = ["需求方", "开发", "测试", "审批人", "协作人", "知会人", "其他"], l = bs({
      title: "",
      description: "",
      targetDate: nt(),
      project: "",
      stakeholders: []
    });
    Na(() => t.visible, async (v) => {
      var h;
      v && (s.value = -1, t.task ? (i.value = !1, l.title = t.task.title, l.description = t.task.description ?? "", l.targetDate = t.task.targetDate, l.project = t.task.project ?? "", l.stakeholders = t.task.stakeholders ? JSON.parse(JSON.stringify(t.task.stakeholders)) : []) : (i.value = !0, l.title = "", l.description = "", l.targetDate = t.defaultDate ?? nt(), l.project = "", l.stakeholders = []), await Fa(), (h = a.value) == null || h.focus());
    });
    function o() {
      l.stakeholders.push({ id: Un(), name: "", role: "", remark: "", addedAt: (/* @__PURE__ */ new Date()).toISOString() }), s.value = l.stakeholders.length - 1;
    }
    function c(v) {
      l.stakeholders.splice(v, 1), s.value >= l.stakeholders.length && (s.value = -1);
    }
    function p() {
      l.title.trim() && n("save", {
        title: l.title.trim(),
        description: l.description.trim() || void 0,
        targetDate: l.targetDate,
        project: l.project || void 0,
        stakeholders: l.stakeholders.filter((v) => v.name.trim())
      });
    }
    return (v, h) => (ee(), $t(ge(dn), {
      "model-value": e.visible,
      title: i.value ? "新建任务" : "编辑任务",
      width: "540px",
      onClose: h[7] || (h[7] = (m) => v.$emit("cancel")),
      "append-to-body": ""
    }, {
      footer: Ee(() => [
        Te(ge(je), {
          onClick: h[5] || (h[5] = (m) => v.$emit("cancel"))
        }, {
          default: Ee(() => [...h[11] || (h[11] = [
            Re("取消", -1)
          ])]),
          _: 1
        }),
        i.value ? ke("", !0) : (ee(), $t(ge(je), {
          key: 0,
          type: "danger",
          plain: "",
          onClick: h[6] || (h[6] = (m) => v.$emit("delete", e.task))
        }, {
          default: Ee(() => [...h[12] || (h[12] = [
            Re("删除", -1)
          ])]),
          _: 1
        })),
        Te(ge(je), {
          type: "primary",
          onClick: p,
          disabled: !l.title.trim()
        }, {
          default: Ee(() => [...h[13] || (h[13] = [
            Re("保存", -1)
          ])]),
          _: 1
        }, 8, ["disabled"])
      ]),
      default: Ee(() => [
        Te(ge(K0), {
          model: l,
          "label-position": "top",
          size: "default"
        }, {
          default: Ee(() => [
            Te(ge(Tr), {
              label: "标题",
              required: ""
            }, {
              default: Ee(() => [
                Te(ge(hr), {
                  modelValue: l.title,
                  "onUpdate:modelValue": h[0] || (h[0] = (m) => l.title = m),
                  placeholder: "任务标题（可用 📅5/15 #项目 语法）",
                  clearable: "",
                  ref_key: "titleRef",
                  ref: a,
                  onKeydown: sn(mt(p, ["prevent"]), ["enter"])
                }, null, 8, ["modelValue", "onKeydown"])
              ]),
              _: 1
            }),
            Te(ge(Tr), { label: "描述" }, {
              default: Ee(() => [
                Te(ge(hr), {
                  modelValue: l.description,
                  "onUpdate:modelValue": h[1] || (h[1] = (m) => l.description = m),
                  type: "textarea",
                  rows: 2,
                  placeholder: "补充说明（选填）"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            q("div", xf, [
              Te(ge(Tr), {
                label: "截止日期",
                style: { flex: "1" }
              }, {
                default: Ee(() => [
                  Te(ge(J0), {
                    modelValue: l.targetDate,
                    "onUpdate:modelValue": h[2] || (h[2] = (m) => l.targetDate = m),
                    type: "date",
                    "value-format": "YYYY-MM-DD",
                    format: "YYYY年M月D日",
                    style: { width: "100%" }
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              Te(ge(Tr), {
                label: "所属项目",
                style: { flex: "1" }
              }, {
                default: Ee(() => [
                  Te(ge(r0), {
                    modelValue: l.project,
                    "onUpdate:modelValue": h[3] || (h[3] = (m) => l.project = m),
                    clearable: "",
                    filterable: "",
                    "allow-create": "",
                    placeholder: "选择或新建项目",
                    style: { width: "100%" }
                  }, {
                    default: Ee(() => [
                      (ee(!0), le(Ue, null, rt(e.allProjects, (m) => (ee(), $t(ge(n0), {
                        key: m,
                        label: m,
                        value: m
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              })
            ]),
            Te(ge(Tr), { label: "干系人" }, {
              default: Ee(() => [
                q("div", vf, [
                  (ee(!0), le(Ue, null, rt(l.stakeholders, (m, u) => (ee(), le("div", {
                    key: m.id,
                    class: "sh-row"
                  }, [
                    s.value === u ? (ee(), le(Ue, { key: 0 }, [
                      Te(ge(hr), {
                        modelValue: m.name,
                        "onUpdate:modelValue": (d) => m.name = d,
                        placeholder: "姓名",
                        style: { width: "100px" },
                        size: "small"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      Te(ge(r0), {
                        modelValue: m.role,
                        "onUpdate:modelValue": (d) => m.role = d,
                        placeholder: "角色",
                        style: { width: "100px" },
                        size: "small",
                        clearable: "",
                        filterable: "",
                        "allow-create": ""
                      }, {
                        default: Ee(() => [
                          (ee(), le(Ue, null, rt(f, (d) => Te(ge(n0), {
                            key: d,
                            label: d,
                            value: d
                          }, null, 8, ["label", "value"])), 64))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      Te(ge(hr), {
                        modelValue: m.remark,
                        "onUpdate:modelValue": (d) => m.remark = d,
                        placeholder: "备注（选填）",
                        style: { flex: "1" },
                        size: "small"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      Te(ge(je), {
                        size: "small",
                        onClick: h[4] || (h[4] = (d) => s.value = -1)
                      }, {
                        default: Ee(() => [...h[8] || (h[8] = [
                          Re("✓", -1)
                        ])]),
                        _: 1
                      })
                    ], 64)) : (ee(), le(Ue, { key: 1 }, [
                      q("span", {
                        class: "sh-name",
                        onClick: (d) => s.value = u
                      }, "👤 " + we(m.name), 9, pf),
                      m.role ? (ee(), le("span", mf, we(m.role), 1)) : ke("", !0),
                      m.remark ? (ee(), le("span", gf, we(m.remark), 1)) : ke("", !0),
                      Te(ge(je), {
                        size: "small",
                        type: "danger",
                        text: "",
                        onClick: (d) => c(u)
                      }, {
                        default: Ee(() => [...h[9] || (h[9] = [
                          Re("×", -1)
                        ])]),
                        _: 1
                      }, 8, ["onClick"])
                    ], 64))
                  ]))), 128)),
                  Te(ge(je), {
                    size: "small",
                    onClick: o,
                    style: { "margin-top": "4px" }
                  }, {
                    default: Ee(() => [...h[10] || (h[10] = [
                      Re(" + 添加干系人 ", -1)
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
}), Tf = /* @__PURE__ */ En(_f, [["__scopeId", "data-v-84f89d87"]]), Ef = { key: 0 }, wf = { class: "split-parent" }, Sf = { class: "split-children" }, Af = { class: "split-index" }, yf = /* @__PURE__ */ zr({
  __name: "SplitDialog",
  props: {
    visible: { type: Boolean },
    task: {}
  },
  emits: ["confirm", "cancel"],
  setup(e, { emit: r }) {
    const t = e, n = r, a = Pe(["", ""]);
    Na(() => t.visible, (c) => {
      c && (a.value = ["", ""]);
    });
    const i = Ze(() => a.value.filter((c) => c.trim()));
    function s() {
      a.value.push("");
    }
    function f(c) {
      a.value.splice(c, 1);
    }
    function l(c) {
    }
    function o() {
      !t.task || i.value.length === 0 || n("confirm", t.task.id, a.value);
    }
    return (c, p) => (ee(), $t(ge(dn), {
      "model-value": e.visible,
      title: "拆分任务",
      width: "480px",
      onClose: p[1] || (p[1] = (v) => c.$emit("cancel")),
      "append-to-body": ""
    }, {
      footer: Ee(() => [
        Te(ge(je), {
          onClick: p[0] || (p[0] = (v) => c.$emit("cancel"))
        }, {
          default: Ee(() => [...p[4] || (p[4] = [
            Re("取消", -1)
          ])]),
          _: 1
        }),
        Te(ge(je), {
          type: "primary",
          onClick: o,
          disabled: i.value.length === 0
        }, {
          default: Ee(() => [...p[5] || (p[5] = [
            Re("确认拆分", -1)
          ])]),
          _: 1
        }, 8, ["disabled"])
      ]),
      default: Ee(() => [
        e.task ? (ee(), le("div", Ef, [
          q("div", wf, "原任务：" + we(e.task.title), 1),
          q("div", Sf, [
            (ee(!0), le(Ue, null, rt(a.value, (v, h) => (ee(), le("div", {
              key: h,
              class: "split-child-row"
            }, [
              q("span", Af, we(h + 1), 1),
              Te(ge(hr), {
                modelValue: a.value[h],
                "onUpdate:modelValue": (m) => a.value[h] = m,
                placeholder: "子任务标题",
                size: "small",
                onKeydown: sn(mt((m) => h === a.value.length - 1 ? s() : void 0, ["prevent"]), ["enter"])
              }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown"]),
              a.value.length > 1 ? (ee(), $t(ge(je), {
                key: 0,
                type: "danger",
                text: "",
                size: "small",
                onClick: (m) => f(h)
              }, {
                default: Ee(() => [...p[2] || (p[2] = [
                  Re("×", -1)
                ])]),
                _: 1
              }, 8, ["onClick"])) : ke("", !0)
            ]))), 128))
          ]),
          Te(ge(je), {
            size: "small",
            onClick: s,
            style: { "margin-top": "8px" }
          }, {
            default: Ee(() => [...p[3] || (p[3] = [
              Re("+ 添加子任务", -1)
            ])]),
            _: 1
          })
        ])) : ke("", !0)
      ]),
      _: 1
    }, 8, ["model-value"]));
  }
}), Ff = /* @__PURE__ */ En(yf, [["__scopeId", "data-v-70869c50"]]);
/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var Wn = {};
Wn.version = "0.18.5";
var Z0 = 1252, kf = [874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1e4], q0 = function(e) {
  kf.indexOf(e) != -1 && (Z0 = e);
};
function Cf() {
  q0(1252);
}
var xn = function(e) {
  q0(e);
};
function Df() {
  xn(1200), Cf();
}
var In = function(r) {
  return String.fromCharCode(r);
}, o0 = function(r) {
  return String.fromCharCode(r);
}, $n, dr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function vn(e) {
  for (var r = "", t = 0, n = 0, a = 0, i = 0, s = 0, f = 0, l = 0, o = 0; o < e.length; )
    t = e.charCodeAt(o++), i = t >> 2, n = e.charCodeAt(o++), s = (t & 3) << 4 | n >> 4, a = e.charCodeAt(o++), f = (n & 15) << 2 | a >> 6, l = a & 63, isNaN(n) ? f = l = 64 : isNaN(a) && (l = 64), r += dr.charAt(i) + dr.charAt(s) + dr.charAt(f) + dr.charAt(l);
  return r;
}
function nr(e) {
  var r = "", t = 0, n = 0, a = 0, i = 0, s = 0, f = 0, l = 0;
  e = e.replace(/[^\w\+\/\=]/g, "");
  for (var o = 0; o < e.length; )
    i = dr.indexOf(e.charAt(o++)), s = dr.indexOf(e.charAt(o++)), t = i << 2 | s >> 4, r += String.fromCharCode(t), f = dr.indexOf(e.charAt(o++)), n = (s & 15) << 4 | f >> 2, f !== 64 && (r += String.fromCharCode(n)), l = dr.indexOf(e.charAt(o++)), a = (f & 3) << 6 | l, l !== 64 && (r += String.fromCharCode(a));
  return r;
}
var Ie = /* @__PURE__ */ function() {
  return typeof Buffer < "u" && typeof process < "u" && typeof process.versions < "u" && !!process.versions.node;
}(), ir = /* @__PURE__ */ function() {
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
function Sr(e) {
  return Ie ? Buffer.alloc ? Buffer.alloc(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
function c0(e) {
  return Ie ? Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
var Ht = function(r) {
  return Ie ? ir(r, "binary") : r.split("").map(function(t) {
    return t.charCodeAt(0) & 255;
  });
};
function ta(e) {
  if (typeof ArrayBuffer > "u") return Ht(e);
  for (var r = new ArrayBuffer(e.length), t = new Uint8Array(r), n = 0; n != e.length; ++n) t[n] = e.charCodeAt(n) & 255;
  return r;
}
function wn(e) {
  if (Array.isArray(e)) return e.map(function(n) {
    return String.fromCharCode(n);
  }).join("");
  for (var r = [], t = 0; t < e.length; ++t) r[t] = String.fromCharCode(e[t]);
  return r.join("");
}
function Of(e) {
  if (typeof Uint8Array > "u") throw new Error("Unsupported");
  return new Uint8Array(e);
}
var ot = Ie ? function(e) {
  return Buffer.concat(e.map(function(r) {
    return Buffer.isBuffer(r) ? r : ir(r);
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
function If(e) {
  for (var r = [], t = 0, n = e.length + 250, a = Sr(e.length + 255), i = 0; i < e.length; ++i) {
    var s = e.charCodeAt(i);
    if (s < 128) a[t++] = s;
    else if (s < 2048)
      a[t++] = 192 | s >> 6 & 31, a[t++] = 128 | s & 63;
    else if (s >= 55296 && s < 57344) {
      s = (s & 1023) + 64;
      var f = e.charCodeAt(++i) & 1023;
      a[t++] = 240 | s >> 8 & 7, a[t++] = 128 | s >> 2 & 63, a[t++] = 128 | f >> 6 & 15 | (s & 3) << 4, a[t++] = 128 | f & 63;
    } else
      a[t++] = 224 | s >> 12 & 15, a[t++] = 128 | s >> 6 & 63, a[t++] = 128 | s & 63;
    t > n && (r.push(a.slice(0, t)), t = 0, a = Sr(65535), n = 65530);
  }
  return r.push(a.slice(0, t)), ot(r);
}
var fn = /\u0000/g, Rn = /[\u0001-\u0006]/g;
function Hr(e) {
  for (var r = "", t = e.length - 1; t >= 0; ) r += e.charAt(t--);
  return r;
}
function Vt(e, r) {
  var t = "" + e;
  return t.length >= r ? t : ze("0", r - t.length) + t;
}
function Pa(e, r) {
  var t = "" + e;
  return t.length >= r ? t : ze(" ", r - t.length) + t;
}
function Hn(e, r) {
  var t = "" + e;
  return t.length >= r ? t : t + ze(" ", r - t.length);
}
function Rf(e, r) {
  var t = "" + Math.round(e);
  return t.length >= r ? t : ze("0", r - t.length) + t;
}
function Nf(e, r) {
  var t = "" + e;
  return t.length >= r ? t : ze("0", r - t.length) + t;
}
var u0 = /* @__PURE__ */ Math.pow(2, 32);
function Br(e, r) {
  if (e > u0 || e < -u0) return Rf(e, r);
  var t = Math.round(e);
  return Nf(t, r);
}
function Vn(e, r) {
  return r = r || 0, e.length >= 7 + r && (e.charCodeAt(r) | 32) === 103 && (e.charCodeAt(r + 1) | 32) === 101 && (e.charCodeAt(r + 2) | 32) === 110 && (e.charCodeAt(r + 3) | 32) === 101 && (e.charCodeAt(r + 4) | 32) === 114 && (e.charCodeAt(r + 5) | 32) === 97 && (e.charCodeAt(r + 6) | 32) === 108;
}
var h0 = [
  ["Sun", "Sunday"],
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"]
], ma = [
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
function Pf(e) {
  return e || (e = {}), e[0] = "General", e[1] = "0", e[2] = "0.00", e[3] = "#,##0", e[4] = "#,##0.00", e[9] = "0%", e[10] = "0.00%", e[11] = "0.00E+00", e[12] = "# ?/?", e[13] = "# ??/??", e[14] = "m/d/yy", e[15] = "d-mmm-yy", e[16] = "d-mmm", e[17] = "mmm-yy", e[18] = "h:mm AM/PM", e[19] = "h:mm:ss AM/PM", e[20] = "h:mm", e[21] = "h:mm:ss", e[22] = "m/d/yy h:mm", e[37] = "#,##0 ;(#,##0)", e[38] = "#,##0 ;[Red](#,##0)", e[39] = "#,##0.00;(#,##0.00)", e[40] = "#,##0.00;[Red](#,##0.00)", e[45] = "mm:ss", e[46] = "[h]:mm:ss", e[47] = "mmss.0", e[48] = "##0.0E+0", e[49] = "@", e[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "', e;
}
var Ye = {
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
}, d0 = {
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
}, Lf = {
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
function Gn(e, r, t) {
  for (var n = e < 0 ? -1 : 1, a = e * n, i = 0, s = 1, f = 0, l = 1, o = 0, c = 0, p = Math.floor(a); o < r && (p = Math.floor(a), f = p * s + i, c = p * o + l, !(a - p < 5e-8)); )
    a = 1 / (a - p), i = s, s = f, l = o, o = c;
  if (c > r && (o > r ? (c = l, f = i) : (c = o, f = s)), !t) return [0, n * f, c];
  var v = Math.floor(n * f / c);
  return [v, n * f - v * c, c];
}
function Nn(e, r, t) {
  if (e > 2958465 || e < 0) return null;
  var n = e | 0, a = Math.floor(86400 * (e - n)), i = 0, s = [], f = { D: n, T: a, u: 86400 * (e - n) - a, y: 0, m: 0, d: 0, H: 0, M: 0, S: 0, q: 0 };
  if (Math.abs(f.u) < 1e-6 && (f.u = 0), r && r.date1904 && (n += 1462), f.u > 0.9999 && (f.u = 0, ++a == 86400 && (f.T = a = 0, ++n, ++f.D)), n === 60)
    s = t ? [1317, 10, 29] : [1900, 2, 29], i = 3;
  else if (n === 0)
    s = t ? [1317, 8, 29] : [1900, 1, 0], i = 6;
  else {
    n > 60 && --n;
    var l = new Date(1900, 0, 1);
    l.setDate(l.getDate() + n - 1), s = [l.getFullYear(), l.getMonth() + 1, l.getDate()], i = l.getDay(), n < 60 && (i = (i + 6) % 7), t && (i = Hf(l, s));
  }
  return f.y = s[0], f.m = s[1], f.d = s[2], f.S = a % 60, a = Math.floor(a / 60), f.M = a % 60, a = Math.floor(a / 60), f.H = a, f.q = i, f;
}
var Q0 = /* @__PURE__ */ new Date(1899, 11, 31, 0, 0, 0), Mf = /* @__PURE__ */ Q0.getTime(), Bf = /* @__PURE__ */ new Date(1900, 2, 1, 0, 0, 0);
function ei(e, r) {
  var t = /* @__PURE__ */ e.getTime();
  return r ? t -= 1461 * 24 * 60 * 60 * 1e3 : e >= Bf && (t += 24 * 60 * 60 * 1e3), (t - (Mf + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ Q0.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3);
}
function La(e) {
  return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1");
}
function bf(e) {
  return e.indexOf("E") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/, "$10$2");
}
function Uf(e) {
  var r = e < 0 ? 12 : 11, t = La(e.toFixed(12));
  return t.length <= r || (t = e.toPrecision(10), t.length <= r) ? t : e.toExponential(5);
}
function Wf(e) {
  var r = La(e.toFixed(11));
  return r.length > (e < 0 ? 12 : 11) || r === "0" || r === "-0" ? e.toPrecision(6) : r;
}
function $f(e) {
  var r = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E), t;
  return r >= -4 && r <= -1 ? t = e.toPrecision(10 + r) : Math.abs(r) <= 9 ? t = Uf(e) : r === 10 ? t = e.toFixed(10).substr(0, 12) : t = Wf(e), La(bf(t.toUpperCase()));
}
function Da(e, r) {
  switch (typeof e) {
    case "string":
      return e;
    case "boolean":
      return e ? "TRUE" : "FALSE";
    case "number":
      return (e | 0) === e ? e.toString(10) : $f(e);
    case "undefined":
      return "";
    case "object":
      if (e == null) return "";
      if (e instanceof Date) return vr(14, ei(e, r && r.date1904), r);
  }
  throw new Error("unsupported value in General format: " + e);
}
function Hf(e, r) {
  r[0] -= 581;
  var t = e.getDay();
  return e < 60 && (t = (t + 6) % 7), t;
}
function Vf(e, r, t, n) {
  var a = "", i = 0, s = 0, f = t.y, l, o = 0;
  switch (e) {
    case 98:
      f = t.y + 543;
    case 121:
      switch (r.length) {
        case 1:
        case 2:
          l = f % 100, o = 2;
          break;
        default:
          l = f % 1e4, o = 4;
          break;
      }
      break;
    case 109:
      switch (r.length) {
        case 1:
        case 2:
          l = t.m, o = r.length;
          break;
        case 3:
          return ma[t.m - 1][1];
        case 5:
          return ma[t.m - 1][0];
        default:
          return ma[t.m - 1][2];
      }
      break;
    case 100:
      switch (r.length) {
        case 1:
        case 2:
          l = t.d, o = r.length;
          break;
        case 3:
          return h0[t.q][0];
        default:
          return h0[t.q][1];
      }
      break;
    case 104:
      switch (r.length) {
        case 1:
        case 2:
          l = 1 + (t.H + 11) % 12, o = r.length;
          break;
        default:
          throw "bad hour format: " + r;
      }
      break;
    case 72:
      switch (r.length) {
        case 1:
        case 2:
          l = t.H, o = r.length;
          break;
        default:
          throw "bad hour format: " + r;
      }
      break;
    case 77:
      switch (r.length) {
        case 1:
        case 2:
          l = t.M, o = r.length;
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
          l = t.D * 24 + t.H;
          break;
        case "[m]":
        case "[mm]":
          l = (t.D * 24 + t.H) * 60 + t.M;
          break;
        case "[s]":
        case "[ss]":
          l = ((t.D * 24 + t.H) * 60 + t.M) * 60 + Math.round(t.S + t.u);
          break;
        default:
          throw "bad abstime format: " + r;
      }
      o = r.length === 3 ? 1 : 2;
      break;
    case 101:
      l = f, o = 1;
      break;
  }
  var c = o > 0 ? Vt(l, o) : "";
  return c;
}
function xr(e) {
  var r = 3;
  if (e.length <= r) return e;
  for (var t = e.length % r, n = e.substr(0, t); t != e.length; t += r) n += (n.length > 0 ? "," : "") + e.substr(t, r);
  return n;
}
var ti = /%/g;
function Gf(e, r, t) {
  var n = r.replace(ti, ""), a = r.length - n.length;
  return er(e, n, t * Math.pow(10, 2 * a)) + ze("%", a);
}
function jf(e, r, t) {
  for (var n = r.length - 1; r.charCodeAt(n - 1) === 44; ) --n;
  return er(e, r.substr(0, n), t / Math.pow(10, 3 * (r.length - n)));
}
function ri(e, r) {
  var t, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (r == 0) return "0.0E+0";
    if (r < 0) return "-" + ri(e, -r);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(r) * Math.LOG10E) % a;
    if (i < 0 && (i += a), t = (r / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a), t.indexOf("e") === -1) {
      var s = Math.floor(Math.log(r) * Math.LOG10E);
      for (t.indexOf(".") === -1 ? t = t.charAt(0) + "." + t.substr(1) + "E+" + (s - t.length + i) : t += "E+" + (s - i); t.substr(0, 2) === "0."; )
        t = t.charAt(0) + t.substr(2, a) + "." + t.substr(2 + a), t = t.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.");
      t = t.replace(/\+-/, "-");
    }
    t = t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(f, l, o, c) {
      return l + o + c.substr(0, (a + i) % a) + "." + c.substr(i) + "E";
    });
  } else t = r.toExponential(n);
  return e.match(/E\+00$/) && t.match(/e[+-]\d$/) && (t = t.substr(0, t.length - 1) + "0" + t.charAt(t.length - 1)), e.match(/E\-/) && t.match(/e\+/) && (t = t.replace(/e\+/, "e")), t.replace("e", "E");
}
var ni = /# (\?+)( ?)\/( ?)(\d+)/;
function Xf(e, r, t) {
  var n = parseInt(e[4], 10), a = Math.round(r * n), i = Math.floor(a / n), s = a - i * n, f = n;
  return t + (i === 0 ? "" : "" + i) + " " + (s === 0 ? ze(" ", e[1].length + 1 + e[4].length) : Pa(s, e[1].length) + e[2] + "/" + e[3] + Vt(f, e[4].length));
}
function zf(e, r, t) {
  return t + (r === 0 ? "" : "" + r) + ze(" ", e[1].length + 2 + e[4].length);
}
var ai = /^#*0*\.([0#]+)/, ii = /\).*[0#]/, si = /\(###\) ###\\?-####/;
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
function x0(e, r) {
  var t = Math.pow(10, r);
  return "" + Math.round(e * t) / t;
}
function v0(e, r) {
  var t = e - Math.floor(e), n = Math.pow(10, r);
  return r < ("" + Math.round(t * n)).length ? 0 : Math.round(t * n);
}
function Yf(e, r) {
  return r < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, r))).length ? 1 : 0;
}
function Kf(e) {
  return e < 2147483647 && e > -2147483648 ? "" + (e >= 0 ? e | 0 : e - 1 | 0) : "" + Math.floor(e);
}
function Pt(e, r, t) {
  if (e.charCodeAt(0) === 40 && !r.match(ii)) {
    var n = r.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return t >= 0 ? Pt("n", n, t) : "(" + Pt("n", n, -t) + ")";
  }
  if (r.charCodeAt(r.length - 1) === 44) return jf(e, r, t);
  if (r.indexOf("%") !== -1) return Gf(e, r, t);
  if (r.indexOf("E") !== -1) return ri(r, t);
  if (r.charCodeAt(0) === 36) return "$" + Pt(e, r.substr(r.charAt(1) == " " ? 2 : 1), t);
  var a, i, s, f, l = Math.abs(t), o = t < 0 ? "-" : "";
  if (r.match(/^00+$/)) return o + Br(l, r.length);
  if (r.match(/^[#?]+$/))
    return a = Br(t, 0), a === "0" && (a = ""), a.length > r.length ? a : gt(r.substr(0, r.length - a.length)) + a;
  if (i = r.match(ni)) return Xf(i, l, o);
  if (r.match(/^#+0+$/)) return o + Br(l, r.length - r.indexOf("0"));
  if (i = r.match(ai))
    return a = x0(t, i[1].length).replace(/^([^\.]+)$/, "$1." + gt(i[1])).replace(/\.$/, "." + gt(i[1])).replace(/\.(\d*)$/, function(m, u) {
      return "." + u + ze("0", gt(
        /*::(*/
        i[1]
      ).length - u.length);
    }), r.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (r = r.replace(/^#+([0.])/, "$1"), i = r.match(/^(0*)\.(#*)$/))
    return o + x0(l, i[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = r.match(/^#{1,3},##0(\.?)$/)) return o + xr(Br(l, 0));
  if (i = r.match(/^#,##0\.([#0]*0)$/))
    return t < 0 ? "-" + Pt(e, r, -t) : xr("" + (Math.floor(t) + Yf(t, i[1].length))) + "." + Vt(v0(t, i[1].length), i[1].length);
  if (i = r.match(/^#,#*,#0/)) return Pt(e, r.replace(/^#,#*,/, ""), t);
  if (i = r.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = Hr(Pt(e, r.replace(/[\\-]/g, ""), t)), s = 0, Hr(Hr(r.replace(/\\/g, "")).replace(/[0#]/g, function(m) {
      return s < a.length ? a.charAt(s++) : m === "0" ? "0" : "";
    }));
  if (r.match(si))
    return a = Pt(e, "##########", t), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var c = "";
  if (i = r.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), f = Gn(l, Math.pow(10, s) - 1, !1), a = "" + o, c = er(
      "n",
      /*::String(*/
      i[1],
      f[1]
    ), c.charAt(c.length - 1) == " " && (c = c.substr(0, c.length - 1) + "0"), a += c + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], c = Hn(f[2], s), c.length < i[4].length && (c = gt(i[4].substr(i[4].length - c.length)) + c), a += c, a;
  if (i = r.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = Gn(l, Math.pow(10, s) - 1, !0), o + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? Pa(f[1], s) + i[2] + "/" + i[3] + Hn(f[2], s) : ze(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = r.match(/^[#0?]+$/))
    return a = Br(t, 0), r.length <= a.length ? a : gt(r.substr(0, r.length - a.length)) + a;
  if (i = r.match(/^([#0?]+)\.([#0]+)$/)) {
    a = "" + t.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var p = r.indexOf(".") - s, v = r.length - a.length - p;
    return gt(r.substr(0, p) + a + r.substr(r.length - v));
  }
  if (i = r.match(/^00,000\.([#0]*0)$/))
    return s = v0(t, i[1].length), t < 0 ? "-" + Pt(e, r, -t) : xr(Kf(t)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(m) {
      return "00," + (m.length < 3 ? Vt(0, 3 - m.length) : "") + m;
    }) + "." + Vt(s, i[1].length);
  switch (r) {
    case "###,##0.00":
      return Pt(e, "#,##0.00", t);
    case "###,###":
    case "##,###":
    case "#,###":
      var h = xr(Br(l, 0));
      return h !== "0" ? o + h : "";
    case "###,###.00":
      return Pt(e, "###,##0.00", t).replace(/^0\./, ".");
    case "#,###.00":
      return Pt(e, "#,##0.00", t).replace(/^0\./, ".");
  }
  throw new Error("unsupported format |" + r + "|");
}
function Jf(e, r, t) {
  for (var n = r.length - 1; r.charCodeAt(n - 1) === 44; ) --n;
  return er(e, r.substr(0, n), t / Math.pow(10, 3 * (r.length - n)));
}
function Zf(e, r, t) {
  var n = r.replace(ti, ""), a = r.length - n.length;
  return er(e, n, t * Math.pow(10, 2 * a)) + ze("%", a);
}
function fi(e, r) {
  var t, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (r == 0) return "0.0E+0";
    if (r < 0) return "-" + fi(e, -r);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(r) * Math.LOG10E) % a;
    if (i < 0 && (i += a), t = (r / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a), !t.match(/[Ee]/)) {
      var s = Math.floor(Math.log(r) * Math.LOG10E);
      t.indexOf(".") === -1 ? t = t.charAt(0) + "." + t.substr(1) + "E+" + (s - t.length + i) : t += "E+" + (s - i), t = t.replace(/\+-/, "-");
    }
    t = t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(f, l, o, c) {
      return l + o + c.substr(0, (a + i) % a) + "." + c.substr(i) + "E";
    });
  } else t = r.toExponential(n);
  return e.match(/E\+00$/) && t.match(/e[+-]\d$/) && (t = t.substr(0, t.length - 1) + "0" + t.charAt(t.length - 1)), e.match(/E\-/) && t.match(/e\+/) && (t = t.replace(/e\+/, "e")), t.replace("e", "E");
}
function zt(e, r, t) {
  if (e.charCodeAt(0) === 40 && !r.match(ii)) {
    var n = r.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return t >= 0 ? zt("n", n, t) : "(" + zt("n", n, -t) + ")";
  }
  if (r.charCodeAt(r.length - 1) === 44) return Jf(e, r, t);
  if (r.indexOf("%") !== -1) return Zf(e, r, t);
  if (r.indexOf("E") !== -1) return fi(r, t);
  if (r.charCodeAt(0) === 36) return "$" + zt(e, r.substr(r.charAt(1) == " " ? 2 : 1), t);
  var a, i, s, f, l = Math.abs(t), o = t < 0 ? "-" : "";
  if (r.match(/^00+$/)) return o + Vt(l, r.length);
  if (r.match(/^[#?]+$/))
    return a = "" + t, t === 0 && (a = ""), a.length > r.length ? a : gt(r.substr(0, r.length - a.length)) + a;
  if (i = r.match(ni)) return zf(i, l, o);
  if (r.match(/^#+0+$/)) return o + Vt(l, r.length - r.indexOf("0"));
  if (i = r.match(ai))
    return a = ("" + t).replace(/^([^\.]+)$/, "$1." + gt(i[1])).replace(/\.$/, "." + gt(i[1])), a = a.replace(/\.(\d*)$/, function(m, u) {
      return "." + u + ze("0", gt(i[1]).length - u.length);
    }), r.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (r = r.replace(/^#+([0.])/, "$1"), i = r.match(/^(0*)\.(#*)$/))
    return o + ("" + l).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = r.match(/^#{1,3},##0(\.?)$/)) return o + xr("" + l);
  if (i = r.match(/^#,##0\.([#0]*0)$/))
    return t < 0 ? "-" + zt(e, r, -t) : xr("" + t) + "." + ze("0", i[1].length);
  if (i = r.match(/^#,#*,#0/)) return zt(e, r.replace(/^#,#*,/, ""), t);
  if (i = r.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = Hr(zt(e, r.replace(/[\\-]/g, ""), t)), s = 0, Hr(Hr(r.replace(/\\/g, "")).replace(/[0#]/g, function(m) {
      return s < a.length ? a.charAt(s++) : m === "0" ? "0" : "";
    }));
  if (r.match(si))
    return a = zt(e, "##########", t), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var c = "";
  if (i = r.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), f = Gn(l, Math.pow(10, s) - 1, !1), a = "" + o, c = er(
      "n",
      /*::String(*/
      i[1],
      f[1]
    ), c.charAt(c.length - 1) == " " && (c = c.substr(0, c.length - 1) + "0"), a += c + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], c = Hn(f[2], s), c.length < i[4].length && (c = gt(i[4].substr(i[4].length - c.length)) + c), a += c, a;
  if (i = r.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = Gn(l, Math.pow(10, s) - 1, !0), o + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? Pa(f[1], s) + i[2] + "/" + i[3] + Hn(f[2], s) : ze(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = r.match(/^[#0?]+$/))
    return a = "" + t, r.length <= a.length ? a : gt(r.substr(0, r.length - a.length)) + a;
  if (i = r.match(/^([#0]+)\.([#0]+)$/)) {
    a = "" + t.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var p = r.indexOf(".") - s, v = r.length - a.length - p;
    return gt(r.substr(0, p) + a + r.substr(r.length - v));
  }
  if (i = r.match(/^00,000\.([#0]*0)$/))
    return t < 0 ? "-" + zt(e, r, -t) : xr("" + t).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(m) {
      return "00," + (m.length < 3 ? Vt(0, 3 - m.length) : "") + m;
    }) + "." + Vt(0, i[1].length);
  switch (r) {
    case "###,###":
    case "##,###":
    case "#,###":
      var h = xr("" + l);
      return h !== "0" ? o + h : "";
    default:
      if (r.match(/\.[0#?]*$/)) return zt(e, r.slice(0, r.lastIndexOf(".")), t) + gt(r.slice(r.lastIndexOf(".")));
  }
  throw new Error("unsupported format |" + r + "|");
}
function er(e, r, t) {
  return (t | 0) === t ? zt(e, r, t) : Pt(e, r, t);
}
function qf(e) {
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
var li = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
function oi(e) {
  for (var r = 0, t = "", n = ""; r < e.length; )
    switch (t = e.charAt(r)) {
      case "G":
        Vn(e, r) && (r += 6), r++;
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
        if (n.match(li)) return !0;
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
function Qf(e, r, t, n) {
  for (var a = [], i = "", s = 0, f = "", l = "t", o, c, p, v = "H"; s < e.length; )
    switch (f = e.charAt(s)) {
      case "G":
        if (!Vn(e, s)) throw new Error("unrecognized character " + f + " in " + e);
        a[a.length] = { t: "G", v: "General" }, s += 7;
        break;
      case '"':
        for (i = ""; (p = e.charCodeAt(++s)) !== 34 && s < e.length; ) i += String.fromCharCode(p);
        a[a.length] = { t: "t", v: i }, ++s;
        break;
      case "\\":
        var h = e.charAt(++s), m = h === "(" || h === ")" ? h : "t";
        a[a.length] = { t: m, v: h }, ++s;
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
          if (o == null && (o = Nn(r, t, e.charAt(s + 1) === "2"), o == null))
            return "";
          a[a.length] = { t: "X", v: e.substr(s, 2) }, l = f, s += 2;
          break;
        }
      case "M":
      case "D":
      case "Y":
      case "H":
      case "S":
      case "E":
        f = f.toLowerCase();
      case "m":
      case "d":
      case "y":
      case "h":
      case "s":
      case "e":
      case "g":
        if (r < 0 || o == null && (o = Nn(r, t), o == null))
          return "";
        for (i = f; ++s < e.length && e.charAt(s).toLowerCase() === f; ) i += f;
        f === "m" && l.toLowerCase() === "h" && (f = "M"), f === "h" && (f = v), a[a.length] = { t: f, v: i }, l = f;
        break;
      case "A":
      case "a":
      case "上":
        var u = { t: f, v: f };
        if (o == null && (o = Nn(r, t)), e.substr(s, 3).toUpperCase() === "A/P" ? (o != null && (u.v = o.H >= 12 ? "P" : "A"), u.t = "T", v = "h", s += 3) : e.substr(s, 5).toUpperCase() === "AM/PM" ? (o != null && (u.v = o.H >= 12 ? "PM" : "AM"), u.t = "T", s += 5, v = "h") : e.substr(s, 5).toUpperCase() === "上午/下午" ? (o != null && (u.v = o.H >= 12 ? "下午" : "上午"), u.t = "T", s += 5, v = "h") : (u.t = "t", ++s), o == null && u.t === "T") return "";
        a[a.length] = u, l = f;
        break;
      case "[":
        for (i = f; e.charAt(s++) !== "]" && s < e.length; ) i += e.charAt(s);
        if (i.slice(-1) !== "]") throw 'unterminated "[" block: |' + i + "|";
        if (i.match(li)) {
          if (o == null && (o = Nn(r, t), o == null))
            return "";
          a[a.length] = { t: "Z", v: i.toLowerCase() }, l = i.charAt(1);
        } else i.indexOf("$") > -1 && (i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$", oi(e) || (a[a.length] = { t: "t", v: i }));
        break;
      case ".":
        if (o != null) {
          for (i = f; ++s < e.length && (f = e.charAt(s)) === "0"; ) i += f;
          a[a.length] = { t: "s", v: i };
          break;
        }
      case "0":
      case "#":
        for (i = f; ++s < e.length && "0#?.,E+-%".indexOf(f = e.charAt(s)) > -1; ) i += f;
        a[a.length] = { t: "n", v: i };
        break;
      case "?":
        for (i = f; e.charAt(++s) === f; ) i += f;
        a[a.length] = { t: f, v: i }, l = f;
        break;
      case "*":
        ++s, (e.charAt(s) == " " || e.charAt(s) == "*") && ++s;
        break;
      case "(":
      case ")":
        a[a.length] = { t: n === 1 ? "t" : f, v: f }, ++s;
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
        for (i = f; s < e.length && "0123456789".indexOf(e.charAt(++s)) > -1; ) i += e.charAt(s);
        a[a.length] = { t: "D", v: i };
        break;
      case " ":
        a[a.length] = { t: f, v: f }, ++s;
        break;
      case "$":
        a[a.length] = { t: "t", v: "$" }, ++s;
        break;
      default:
        if (",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(f) === -1) throw new Error("unrecognized character " + f + " in " + e);
        a[a.length] = { t: "t", v: f }, ++s;
        break;
    }
  var d = 0, A = 0, k;
  for (s = a.length - 1, l = "t"; s >= 0; --s)
    switch (a[s].t) {
      case "h":
      case "H":
        a[s].t = v, l = "h", d < 1 && (d = 1);
        break;
      case "s":
        (k = a[s].v.match(/\.0+$/)) && (A = Math.max(A, k[0].length - 1)), d < 3 && (d = 3);
      case "d":
      case "y":
      case "M":
      case "e":
        l = a[s].t;
        break;
      case "m":
        l === "s" && (a[s].t = "M", d < 2 && (d = 2));
        break;
      case "X":
        break;
      case "Z":
        d < 1 && a[s].v.match(/[Hh]/) && (d = 1), d < 2 && a[s].v.match(/[Mm]/) && (d = 2), d < 3 && a[s].v.match(/[Ss]/) && (d = 3);
    }
  switch (d) {
    case 0:
      break;
    case 1:
      o.u >= 0.5 && (o.u = 0, ++o.S), o.S >= 60 && (o.S = 0, ++o.M), o.M >= 60 && (o.M = 0, ++o.H);
      break;
    case 2:
      o.u >= 0.5 && (o.u = 0, ++o.S), o.S >= 60 && (o.S = 0, ++o.M);
      break;
  }
  var C = "", M;
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
        a[s].v = Vf(a[s].t.charCodeAt(0), a[s].v, o, A), a[s].t = "t";
        break;
      case "n":
      case "?":
        for (M = s + 1; a[M] != null && ((f = a[M].t) === "?" || f === "D" || (f === " " || f === "t") && a[M + 1] != null && (a[M + 1].t === "?" || a[M + 1].t === "t" && a[M + 1].v === "/") || a[s].t === "(" && (f === " " || f === "n" || f === ")") || f === "t" && (a[M].v === "/" || a[M].v === " " && a[M + 1] != null && a[M + 1].t == "?")); )
          a[s].v += a[M].v, a[M] = { v: "", t: ";" }, ++M;
        C += a[s].v, s = M - 1;
        break;
      case "G":
        a[s].t = "t", a[s].v = Da(r, t);
        break;
    }
  var Q = "", ce, O;
  if (C.length > 0) {
    C.charCodeAt(0) == 40 ? (ce = r < 0 && C.charCodeAt(0) === 45 ? -r : r, O = er("n", C, ce)) : (ce = r < 0 && n > 1 ? -r : r, O = er("n", C, ce), ce < 0 && a[0] && a[0].t == "t" && (O = O.substr(1), a[0].v = "-" + a[0].v)), M = O.length - 1;
    var H = a.length;
    for (s = 0; s < a.length; ++s) if (a[s] != null && a[s].t != "t" && a[s].v.indexOf(".") > -1) {
      H = s;
      break;
    }
    var D = a.length;
    if (H === a.length && O.indexOf("E") === -1) {
      for (s = a.length - 1; s >= 0; --s)
        a[s] == null || "n?".indexOf(a[s].t) === -1 || (M >= a[s].v.length - 1 ? (M -= a[s].v.length, a[s].v = O.substr(M + 1, a[s].v.length)) : M < 0 ? a[s].v = "" : (a[s].v = O.substr(0, M + 1), M = -1), a[s].t = "t", D = s);
      M >= 0 && D < a.length && (a[D].v = O.substr(0, M + 1) + a[D].v);
    } else if (H !== a.length && O.indexOf("E") === -1) {
      for (M = O.indexOf(".") - 1, s = H; s >= 0; --s)
        if (!(a[s] == null || "n?".indexOf(a[s].t) === -1)) {
          for (c = a[s].v.indexOf(".") > -1 && s === H ? a[s].v.indexOf(".") - 1 : a[s].v.length - 1, Q = a[s].v.substr(c + 1); c >= 0; --c)
            M >= 0 && (a[s].v.charAt(c) === "0" || a[s].v.charAt(c) === "#") && (Q = O.charAt(M--) + Q);
          a[s].v = Q, a[s].t = "t", D = s;
        }
      for (M >= 0 && D < a.length && (a[D].v = O.substr(0, M + 1) + a[D].v), M = O.indexOf(".") + 1, s = H; s < a.length; ++s)
        if (!(a[s] == null || "n?(".indexOf(a[s].t) === -1 && s !== H)) {
          for (c = a[s].v.indexOf(".") > -1 && s === H ? a[s].v.indexOf(".") + 1 : 0, Q = a[s].v.substr(0, c); c < a[s].v.length; ++c)
            M < O.length && (Q += O.charAt(M++));
          a[s].v = Q, a[s].t = "t", D = s;
        }
    }
  }
  for (s = 0; s < a.length; ++s) a[s] != null && "n?".indexOf(a[s].t) > -1 && (ce = n > 1 && r < 0 && s > 0 && a[s - 1].v === "-" ? -r : r, a[s].v = er(a[s].t, a[s].v, ce), a[s].t = "t");
  var j = "";
  for (s = 0; s !== a.length; ++s) a[s] != null && (j += a[s].v);
  return j;
}
var p0 = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
function m0(e, r) {
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
function el(e, r) {
  var t = qf(e), n = t.length, a = t[n - 1].indexOf("@");
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
    var s = t[0].match(p0), f = t[1].match(p0);
    return m0(r, s) ? [n, t[0]] : m0(r, f) ? [n, t[1]] : [n, t[s != null && f != null ? 2 : 1]];
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
      e == 14 && t.dateNF ? n = t.dateNF : n = (t.table != null ? t.table : Ye)[e], n == null && (n = t.table && t.table[d0[e]] || Ye[d0[e]]), n == null && (n = Lf[e] || "General");
      break;
  }
  if (Vn(n, 0)) return Da(r, t);
  r instanceof Date && (r = ei(r, t.date1904));
  var a = el(n, r);
  if (Vn(a[1])) return Da(r, t);
  if (r === !0) r = "TRUE";
  else if (r === !1) r = "FALSE";
  else if (r === "" || r == null) return "";
  return Qf(a[1], r, t, a[0]);
}
function ci(e, r) {
  if (typeof r != "number") {
    r = +r || -1;
    for (var t = 0; t < 392; ++t) {
      if (Ye[t] == null) {
        r < 0 && (r = t);
        continue;
      }
      if (Ye[t] == e) {
        r = t;
        break;
      }
    }
    r < 0 && (r = 391);
  }
  return Ye[r] = e, r;
}
function ra(e) {
  for (var r = 0; r != 392; ++r)
    e[r] !== void 0 && ci(e[r], r);
}
function na() {
  Ye = Pf();
}
var ui = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
function tl(e) {
  var r = typeof e == "number" ? Ye[e] : e;
  return r = r.replace(ui, "(\\d+)"), new RegExp("^" + r + "$");
}
function rl(e, r, t) {
  var n = -1, a = -1, i = -1, s = -1, f = -1, l = -1;
  (r.match(ui) || []).forEach(function(p, v) {
    var h = parseInt(t[v + 1], 10);
    switch (p.toLowerCase().charAt(0)) {
      case "y":
        n = h;
        break;
      case "d":
        i = h;
        break;
      case "h":
        s = h;
        break;
      case "s":
        l = h;
        break;
      case "m":
        s >= 0 ? f = h : a = h;
        break;
    }
  }), l >= 0 && f == -1 && a >= 0 && (f = a, a = -1);
  var o = ("" + (n >= 0 ? n : (/* @__PURE__ */ new Date()).getFullYear())).slice(-4) + "-" + ("00" + (a >= 1 ? a : 1)).slice(-2) + "-" + ("00" + (i >= 1 ? i : 1)).slice(-2);
  o.length == 7 && (o = "0" + o), o.length == 8 && (o = "20" + o);
  var c = ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + ("00" + (f >= 0 ? f : 0)).slice(-2) + ":" + ("00" + (l >= 0 ? l : 0)).slice(-2);
  return s == -1 && f == -1 && l == -1 ? o : n == -1 && a == -1 && i == -1 ? c : o + "T" + c;
}
var nl = /* @__PURE__ */ function() {
  var e = {};
  e.version = "1.2.0";
  function r() {
    for (var O = 0, H = new Array(256), D = 0; D != 256; ++D)
      O = D, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, H[D] = O;
    return typeof Int32Array < "u" ? new Int32Array(H) : H;
  }
  var t = r();
  function n(O) {
    var H = 0, D = 0, j = 0, X = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
    for (j = 0; j != 256; ++j) X[j] = O[j];
    for (j = 0; j != 256; ++j)
      for (D = O[j], H = 256 + j; H < 4096; H += 256) D = X[H] = D >>> 8 ^ O[D & 255];
    var Y = [];
    for (j = 1; j != 16; ++j) Y[j - 1] = typeof Int32Array < "u" ? X.subarray(j * 256, j * 256 + 256) : X.slice(j * 256, j * 256 + 256);
    return Y;
  }
  var a = n(t), i = a[0], s = a[1], f = a[2], l = a[3], o = a[4], c = a[5], p = a[6], v = a[7], h = a[8], m = a[9], u = a[10], d = a[11], A = a[12], k = a[13], C = a[14];
  function M(O, H) {
    for (var D = H ^ -1, j = 0, X = O.length; j < X; ) D = D >>> 8 ^ t[(D ^ O.charCodeAt(j++)) & 255];
    return ~D;
  }
  function Q(O, H) {
    for (var D = H ^ -1, j = O.length - 15, X = 0; X < j; ) D = C[O[X++] ^ D & 255] ^ k[O[X++] ^ D >> 8 & 255] ^ A[O[X++] ^ D >> 16 & 255] ^ d[O[X++] ^ D >>> 24] ^ u[O[X++]] ^ m[O[X++]] ^ h[O[X++]] ^ v[O[X++]] ^ p[O[X++]] ^ c[O[X++]] ^ o[O[X++]] ^ l[O[X++]] ^ f[O[X++]] ^ s[O[X++]] ^ i[O[X++]] ^ t[O[X++]];
    for (j += 15; X < j; ) D = D >>> 8 ^ t[(D ^ O[X++]) & 255];
    return ~D;
  }
  function ce(O, H) {
    for (var D = H ^ -1, j = 0, X = O.length, Y = 0, ue = 0; j < X; )
      Y = O.charCodeAt(j++), Y < 128 ? D = D >>> 8 ^ t[(D ^ Y) & 255] : Y < 2048 ? (D = D >>> 8 ^ t[(D ^ (192 | Y >> 6 & 31)) & 255], D = D >>> 8 ^ t[(D ^ (128 | Y & 63)) & 255]) : Y >= 55296 && Y < 57344 ? (Y = (Y & 1023) + 64, ue = O.charCodeAt(j++) & 1023, D = D >>> 8 ^ t[(D ^ (240 | Y >> 8 & 7)) & 255], D = D >>> 8 ^ t[(D ^ (128 | Y >> 2 & 63)) & 255], D = D >>> 8 ^ t[(D ^ (128 | ue >> 6 & 15 | (Y & 3) << 4)) & 255], D = D >>> 8 ^ t[(D ^ (128 | ue & 63)) & 255]) : (D = D >>> 8 ^ t[(D ^ (224 | Y >> 12 & 15)) & 255], D = D >>> 8 ^ t[(D ^ (128 | Y >> 6 & 63)) & 255], D = D >>> 8 ^ t[(D ^ (128 | Y & 63)) & 255]);
    return ~D;
  }
  return e.table = t, e.bstr = M, e.buf = Q, e.str = ce, e;
}(), be = /* @__PURE__ */ function() {
  var r = {};
  r.version = "1.2.1";
  function t(x, T) {
    for (var g = x.split("/"), _ = T.split("/"), E = 0, w = 0, R = Math.min(g.length, _.length); E < R; ++E) {
      if (w = g[E].length - _[E].length) return w;
      if (g[E] != _[E]) return g[E] < _[E] ? -1 : 1;
    }
    return g.length - _.length;
  }
  function n(x) {
    if (x.charAt(x.length - 1) == "/") return x.slice(0, -1).indexOf("/") === -1 ? x : n(x.slice(0, -1));
    var T = x.lastIndexOf("/");
    return T === -1 ? x : x.slice(0, T + 1);
  }
  function a(x) {
    if (x.charAt(x.length - 1) == "/") return a(x.slice(0, -1));
    var T = x.lastIndexOf("/");
    return T === -1 ? x : x.slice(T + 1);
  }
  function i(x, T) {
    typeof T == "string" && (T = new Date(T));
    var g = T.getHours();
    g = g << 6 | T.getMinutes(), g = g << 5 | T.getSeconds() >>> 1, x.write_shift(2, g);
    var _ = T.getFullYear() - 1980;
    _ = _ << 4 | T.getMonth() + 1, _ = _ << 5 | T.getDate(), x.write_shift(2, _);
  }
  function s(x) {
    var T = x.read_shift(2) & 65535, g = x.read_shift(2) & 65535, _ = /* @__PURE__ */ new Date(), E = g & 31;
    g >>>= 5;
    var w = g & 15;
    g >>>= 4, _.setMilliseconds(0), _.setFullYear(g + 1980), _.setMonth(w - 1), _.setDate(E);
    var R = T & 31;
    T >>>= 5;
    var W = T & 63;
    return T >>>= 6, _.setHours(T), _.setMinutes(W), _.setSeconds(R << 1), _;
  }
  function f(x) {
    Ct(x, 0);
    for (var T = (
      /*::(*/
      {}
    ), g = 0; x.l <= x.length - 4; ) {
      var _ = x.read_shift(2), E = x.read_shift(2), w = x.l + E, R = {};
      switch (_) {
        case 21589:
          g = x.read_shift(1), g & 1 && (R.mtime = x.read_shift(4)), E > 5 && (g & 2 && (R.atime = x.read_shift(4)), g & 4 && (R.ctime = x.read_shift(4))), R.mtime && (R.mt = new Date(R.mtime * 1e3));
          break;
      }
      x.l = w, T[_] = R;
    }
    return T;
  }
  var l;
  function o() {
    return l || (l = {});
  }
  function c(x, T) {
    if (x[0] == 80 && x[1] == 75) return me(x, T);
    if ((x[0] | 32) == 109 && (x[1] | 32) == 105) return Rs(x, T);
    if (x.length < 512) throw new Error("CFB file size " + x.length + " < 512");
    var g = 3, _ = 512, E = 0, w = 0, R = 0, W = 0, I = 0, N = [], L = (
      /*::(*/
      x.slice(0, 512)
    );
    Ct(L, 0);
    var Z = p(L);
    switch (g = Z[0], g) {
      case 3:
        _ = 512;
        break;
      case 4:
        _ = 4096;
        break;
      case 0:
        if (Z[1] == 0) return me(x, T);
      default:
        throw new Error("Major Version: Expected 3 or 4 saw " + g);
    }
    _ !== 512 && (L = /*::(*/
    x.slice(0, _), Ct(
      L,
      28
      /* blob.l */
    ));
    var fe = x.slice(0, _);
    v(L, g);
    var ve = L.read_shift(4, "i");
    if (g === 3 && ve !== 0) throw new Error("# Directory Sectors: Expected 0 saw " + ve);
    L.l += 4, R = L.read_shift(4, "i"), L.l += 4, L.chk("00100000", "Mini Stream Cutoff Size: "), W = L.read_shift(4, "i"), E = L.read_shift(4, "i"), I = L.read_shift(4, "i"), w = L.read_shift(4, "i");
    for (var te = -1, de = 0; de < 109 && (te = L.read_shift(4, "i"), !(te < 0)); ++de)
      N[de] = te;
    var Se = h(x, _);
    d(I, w, Se, _, N);
    var Ve = k(Se, R, N, _);
    Ve[R].name = "!Directory", E > 0 && W !== ue && (Ve[W].name = "!MiniFAT"), Ve[N[0]].name = "!FAT", Ve.fat_addrs = N, Ve.ssz = _;
    var Ge = {}, dt = [], en = [], tn = [];
    C(R, Ve, Se, dt, E, Ge, en, W), m(en, tn, dt), dt.shift();
    var rn = {
      FileIndex: en,
      FullPaths: tn
    };
    return T && T.raw && (rn.raw = { header: fe, sectors: Se }), rn;
  }
  function p(x) {
    if (x[x.l] == 80 && x[x.l + 1] == 75) return [0, 0];
    x.chk(V, "Header Signature: "), x.l += 16;
    var T = x.read_shift(2, "u");
    return [x.read_shift(2, "u"), T];
  }
  function v(x, T) {
    var g = 9;
    switch (x.l += 2, g = x.read_shift(2)) {
      case 9:
        if (T != 3) throw new Error("Sector Shift: Expected 9 saw " + g);
        break;
      case 12:
        if (T != 4) throw new Error("Sector Shift: Expected 12 saw " + g);
        break;
      default:
        throw new Error("Sector Shift: Expected 9 or 12 saw " + g);
    }
    x.chk("0600", "Mini Sector Shift: "), x.chk("000000000000", "Reserved: ");
  }
  function h(x, T) {
    for (var g = Math.ceil(x.length / T) - 1, _ = [], E = 1; E < g; ++E) _[E - 1] = x.slice(E * T, (E + 1) * T);
    return _[g - 1] = x.slice(g * T), _;
  }
  function m(x, T, g) {
    for (var _ = 0, E = 0, w = 0, R = 0, W = 0, I = g.length, N = [], L = []; _ < I; ++_)
      N[_] = L[_] = _, T[_] = g[_];
    for (; W < L.length; ++W)
      _ = L[W], E = x[_].L, w = x[_].R, R = x[_].C, N[_] === _ && (E !== -1 && N[E] !== E && (N[_] = N[E]), w !== -1 && N[w] !== w && (N[_] = N[w])), R !== -1 && (N[R] = _), E !== -1 && _ != N[_] && (N[E] = N[_], L.lastIndexOf(E) < W && L.push(E)), w !== -1 && _ != N[_] && (N[w] = N[_], L.lastIndexOf(w) < W && L.push(w));
    for (_ = 1; _ < I; ++_) N[_] === _ && (w !== -1 && N[w] !== w ? N[_] = N[w] : E !== -1 && N[E] !== E && (N[_] = N[E]));
    for (_ = 1; _ < I; ++_)
      if (x[_].type !== 0) {
        if (W = _, W != N[W]) do
          W = N[W], T[_] = T[W] + "/" + T[_];
        while (W !== 0 && N[W] !== -1 && W != N[W]);
        N[_] = -1;
      }
    for (T[0] += "/", _ = 1; _ < I; ++_)
      x[_].type !== 2 && (T[_] += "/");
  }
  function u(x, T, g) {
    for (var _ = x.start, E = x.size, w = [], R = _; g && E > 0 && R >= 0; )
      w.push(T.slice(R * Y, R * Y + Y)), E -= Y, R = Er(g, R * 4);
    return w.length === 0 ? U(0) : ot(w).slice(0, x.size);
  }
  function d(x, T, g, _, E) {
    var w = ue;
    if (x === ue) {
      if (T !== 0) throw new Error("DIFAT chain shorter than expected");
    } else if (x !== -1) {
      var R = g[x], W = (_ >>> 2) - 1;
      if (!R) return;
      for (var I = 0; I < W && (w = Er(R, I * 4)) !== ue; ++I)
        E.push(w);
      d(Er(R, _ - 4), T - 1, g, _, E);
    }
  }
  function A(x, T, g, _, E) {
    var w = [], R = [];
    E || (E = []);
    var W = _ - 1, I = 0, N = 0;
    for (I = T; I >= 0; ) {
      E[I] = !0, w[w.length] = I, R.push(x[I]);
      var L = g[Math.floor(I * 4 / _)];
      if (N = I * 4 & W, _ < 4 + N) throw new Error("FAT boundary crossed: " + I + " 4 " + _);
      if (!x[L]) break;
      I = Er(x[L], N);
    }
    return { nodes: w, data: y0([R]) };
  }
  function k(x, T, g, _) {
    var E = x.length, w = [], R = [], W = [], I = [], N = _ - 1, L = 0, Z = 0, fe = 0, ve = 0;
    for (L = 0; L < E; ++L)
      if (W = [], fe = L + T, fe >= E && (fe -= E), !R[fe]) {
        I = [];
        var te = [];
        for (Z = fe; Z >= 0; ) {
          te[Z] = !0, R[Z] = !0, W[W.length] = Z, I.push(x[Z]);
          var de = g[Math.floor(Z * 4 / _)];
          if (ve = Z * 4 & N, _ < 4 + ve) throw new Error("FAT boundary crossed: " + Z + " 4 " + _);
          if (!x[de] || (Z = Er(x[de], ve), te[Z])) break;
        }
        w[fe] = { nodes: W, data: y0([I]) };
      }
    return w;
  }
  function C(x, T, g, _, E, w, R, W) {
    for (var I = 0, N = _.length ? 2 : 0, L = T[x].data, Z = 0, fe = 0, ve; Z < L.length; Z += 128) {
      var te = (
        /*::(*/
        L.slice(Z, Z + 128)
      );
      Ct(te, 64), fe = te.read_shift(2), ve = Wa(te, 0, fe - N), _.push(ve);
      var de = {
        name: ve,
        type: te.read_shift(1),
        color: te.read_shift(1),
        L: te.read_shift(4, "i"),
        R: te.read_shift(4, "i"),
        C: te.read_shift(4, "i"),
        clsid: te.read_shift(16),
        state: te.read_shift(4, "i"),
        start: 0,
        size: 0
      }, Se = te.read_shift(2) + te.read_shift(2) + te.read_shift(2) + te.read_shift(2);
      Se !== 0 && (de.ct = M(te, te.l - 8));
      var Ve = te.read_shift(2) + te.read_shift(2) + te.read_shift(2) + te.read_shift(2);
      Ve !== 0 && (de.mt = M(te, te.l - 8)), de.start = te.read_shift(4, "i"), de.size = te.read_shift(4, "i"), de.size < 0 && de.start < 0 && (de.size = de.type = 0, de.start = ue, de.name = ""), de.type === 5 ? (I = de.start, E > 0 && I !== ue && (T[I].name = "!StreamData")) : de.size >= 4096 ? (de.storage = "fat", T[de.start] === void 0 && (T[de.start] = A(g, de.start, T.fat_addrs, T.ssz)), T[de.start].name = de.name, de.content = T[de.start].data.slice(0, de.size)) : (de.storage = "minifat", de.size < 0 ? de.size = 0 : I !== ue && de.start !== ue && T[I] && (de.content = u(de, T[I].data, (T[W] || {}).data))), de.content && Ct(de.content, 0), w[ve] = de, R.push(de);
    }
  }
  function M(x, T) {
    return new Date((Ot(x, T + 4) / 1e7 * Math.pow(2, 32) + Ot(x, T) / 1e7 - 11644473600) * 1e3);
  }
  function Q(x, T) {
    return o(), c(l.readFileSync(x), T);
  }
  function ce(x, T) {
    var g = T && T.type;
    switch (g || Ie && Buffer.isBuffer(x) && (g = "buffer"), g || "base64") {
      case "file":
        return Q(x, T);
      case "base64":
        return c(Ht(nr(x)), T);
      case "binary":
        return c(Ht(x), T);
    }
    return c(
      /*::typeof blob == 'string' ? new Buffer(blob, 'utf-8') : */
      x,
      T
    );
  }
  function O(x, T) {
    var g = T || {}, _ = g.root || "Root Entry";
    if (x.FullPaths || (x.FullPaths = []), x.FileIndex || (x.FileIndex = []), x.FullPaths.length !== x.FileIndex.length) throw new Error("inconsistent CFB structure");
    x.FullPaths.length === 0 && (x.FullPaths[0] = _ + "/", x.FileIndex[0] = { name: _, type: 5 }), g.CLSID && (x.FileIndex[0].clsid = g.CLSID), H(x);
  }
  function H(x) {
    var T = "Sh33tJ5";
    if (!be.find(x, "/" + T)) {
      var g = U(4);
      g[0] = 55, g[1] = g[3] = 50, g[2] = 54, x.FileIndex.push({ name: T, type: 2, content: g, size: 4, L: 69, R: 69, C: 69 }), x.FullPaths.push(x.FullPaths[0] + T), D(x);
    }
  }
  function D(x, T) {
    O(x);
    for (var g = !1, _ = !1, E = x.FullPaths.length - 1; E >= 0; --E) {
      var w = x.FileIndex[E];
      switch (w.type) {
        case 0:
          _ ? g = !0 : (x.FileIndex.pop(), x.FullPaths.pop());
          break;
        case 1:
        case 2:
        case 5:
          _ = !0, isNaN(w.R * w.L * w.C) && (g = !0), w.R > -1 && w.L > -1 && w.R == w.L && (g = !0);
          break;
        default:
          g = !0;
          break;
      }
    }
    if (!(!g && !T)) {
      var R = new Date(1987, 1, 19), W = 0, I = Object.create ? /* @__PURE__ */ Object.create(null) : {}, N = [];
      for (E = 0; E < x.FullPaths.length; ++E)
        I[x.FullPaths[E]] = !0, x.FileIndex[E].type !== 0 && N.push([x.FullPaths[E], x.FileIndex[E]]);
      for (E = 0; E < N.length; ++E) {
        var L = n(N[E][0]);
        _ = I[L], _ || (N.push([L, {
          name: a(L).replace("/", ""),
          type: 1,
          clsid: K,
          ct: R,
          mt: R,
          content: null
        }]), I[L] = !0);
      }
      for (N.sort(function(ve, te) {
        return t(ve[0], te[0]);
      }), x.FullPaths = [], x.FileIndex = [], E = 0; E < N.length; ++E)
        x.FullPaths[E] = N[E][0], x.FileIndex[E] = N[E][1];
      for (E = 0; E < N.length; ++E) {
        var Z = x.FileIndex[E], fe = x.FullPaths[E];
        if (Z.name = a(fe).replace("/", ""), Z.L = Z.R = Z.C = -(Z.color = 1), Z.size = Z.content ? Z.content.length : 0, Z.start = 0, Z.clsid = Z.clsid || K, E === 0)
          Z.C = N.length > 1 ? 1 : -1, Z.size = 0, Z.type = 5;
        else if (fe.slice(-1) == "/") {
          for (W = E + 1; W < N.length && n(x.FullPaths[W]) != fe; ++W) ;
          for (Z.C = W >= N.length ? -1 : W, W = E + 1; W < N.length && n(x.FullPaths[W]) != n(fe); ++W) ;
          Z.R = W >= N.length ? -1 : W, Z.type = 1;
        } else
          n(x.FullPaths[E + 1] || "") == n(fe) && (Z.R = E + 1), Z.type = 2;
      }
    }
  }
  function j(x, T) {
    var g = T || {};
    if (g.fileType == "mad") return Ns(x, g);
    switch (D(x), g.fileType) {
      case "zip":
        return ie(x, g);
    }
    var _ = function(ve) {
      for (var te = 0, de = 0, Se = 0; Se < ve.FileIndex.length; ++Se) {
        var Ve = ve.FileIndex[Se];
        if (Ve.content) {
          var Ge = Ve.content.length;
          Ge > 0 && (Ge < 4096 ? te += Ge + 63 >> 6 : de += Ge + 511 >> 9);
        }
      }
      for (var dt = ve.FullPaths.length + 3 >> 2, en = te + 7 >> 3, tn = te + 127 >> 7, rn = en + de + dt + tn, _r = rn + 127 >> 7, da = _r <= 109 ? 0 : Math.ceil((_r - 109) / 127); rn + _r + da + 127 >> 7 > _r; ) da = ++_r <= 109 ? 0 : Math.ceil((_r - 109) / 127);
      var Qt = [1, da, _r, tn, dt, de, te, 0];
      return ve.FileIndex[0].size = te << 6, Qt[7] = (ve.FileIndex[0].start = Qt[0] + Qt[1] + Qt[2] + Qt[3] + Qt[4] + Qt[5]) + (Qt[6] + 7 >> 3), Qt;
    }(x), E = U(_[7] << 9), w = 0, R = 0;
    {
      for (w = 0; w < 8; ++w) E.write_shift(1, b[w]);
      for (w = 0; w < 8; ++w) E.write_shift(2, 0);
      for (E.write_shift(2, 62), E.write_shift(2, 3), E.write_shift(2, 65534), E.write_shift(2, 9), E.write_shift(2, 6), w = 0; w < 3; ++w) E.write_shift(2, 0);
      for (E.write_shift(4, 0), E.write_shift(4, _[2]), E.write_shift(4, _[0] + _[1] + _[2] + _[3] - 1), E.write_shift(4, 0), E.write_shift(4, 4096), E.write_shift(4, _[3] ? _[0] + _[1] + _[2] - 1 : ue), E.write_shift(4, _[3]), E.write_shift(-4, _[1] ? _[0] - 1 : ue), E.write_shift(4, _[1]), w = 0; w < 109; ++w) E.write_shift(-4, w < _[2] ? _[1] + w : -1);
    }
    if (_[1])
      for (R = 0; R < _[1]; ++R) {
        for (; w < 236 + R * 127; ++w) E.write_shift(-4, w < _[2] ? _[1] + w : -1);
        E.write_shift(-4, R === _[1] - 1 ? ue : R + 1);
      }
    var W = function(ve) {
      for (R += ve; w < R - 1; ++w) E.write_shift(-4, w + 1);
      ve && (++w, E.write_shift(-4, ue));
    };
    for (R = w = 0, R += _[1]; w < R; ++w) E.write_shift(-4, J.DIFSECT);
    for (R += _[2]; w < R; ++w) E.write_shift(-4, J.FATSECT);
    W(_[3]), W(_[4]);
    for (var I = 0, N = 0, L = x.FileIndex[0]; I < x.FileIndex.length; ++I)
      L = x.FileIndex[I], L.content && (N = L.content.length, !(N < 4096) && (L.start = R, W(N + 511 >> 9)));
    for (W(_[6] + 7 >> 3); E.l & 511; ) E.write_shift(-4, J.ENDOFCHAIN);
    for (R = w = 0, I = 0; I < x.FileIndex.length; ++I)
      L = x.FileIndex[I], L.content && (N = L.content.length, !(!N || N >= 4096) && (L.start = R, W(N + 63 >> 6)));
    for (; E.l & 511; ) E.write_shift(-4, J.ENDOFCHAIN);
    for (w = 0; w < _[4] << 2; ++w) {
      var Z = x.FullPaths[w];
      if (!Z || Z.length === 0) {
        for (I = 0; I < 17; ++I) E.write_shift(4, 0);
        for (I = 0; I < 3; ++I) E.write_shift(4, -1);
        for (I = 0; I < 12; ++I) E.write_shift(4, 0);
        continue;
      }
      L = x.FileIndex[w], w === 0 && (L.start = L.size ? L.start - 1 : ue);
      var fe = w === 0 && g.root || L.name;
      if (N = 2 * (fe.length + 1), E.write_shift(64, fe, "utf16le"), E.write_shift(2, N), E.write_shift(1, L.type), E.write_shift(1, L.color), E.write_shift(-4, L.L), E.write_shift(-4, L.R), E.write_shift(-4, L.C), L.clsid) E.write_shift(16, L.clsid, "hex");
      else for (I = 0; I < 4; ++I) E.write_shift(4, 0);
      E.write_shift(4, L.state || 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, L.start), E.write_shift(4, L.size), E.write_shift(4, 0);
    }
    for (w = 1; w < x.FileIndex.length; ++w)
      if (L = x.FileIndex[w], L.size >= 4096)
        if (E.l = L.start + 1 << 9, Ie && Buffer.isBuffer(L.content))
          L.content.copy(E, E.l, 0, L.size), E.l += L.size + 511 & -512;
        else {
          for (I = 0; I < L.size; ++I) E.write_shift(1, L.content[I]);
          for (; I & 511; ++I) E.write_shift(1, 0);
        }
    for (w = 1; w < x.FileIndex.length; ++w)
      if (L = x.FileIndex[w], L.size > 0 && L.size < 4096)
        if (Ie && Buffer.isBuffer(L.content))
          L.content.copy(E, E.l, 0, L.size), E.l += L.size + 63 & -64;
        else {
          for (I = 0; I < L.size; ++I) E.write_shift(1, L.content[I]);
          for (; I & 63; ++I) E.write_shift(1, 0);
        }
    if (Ie)
      E.l = E.length;
    else
      for (; E.l < E.length; ) E.write_shift(1, 0);
    return E;
  }
  function X(x, T) {
    var g = x.FullPaths.map(function(I) {
      return I.toUpperCase();
    }), _ = g.map(function(I) {
      var N = I.split("/");
      return N[N.length - (I.slice(-1) == "/" ? 2 : 1)];
    }), E = !1;
    T.charCodeAt(0) === 47 ? (E = !0, T = g[0].slice(0, -1) + T) : E = T.indexOf("/") !== -1;
    var w = T.toUpperCase(), R = E === !0 ? g.indexOf(w) : _.indexOf(w);
    if (R !== -1) return x.FileIndex[R];
    var W = !w.match(Rn);
    for (w = w.replace(fn, ""), W && (w = w.replace(Rn, "!")), R = 0; R < g.length; ++R)
      if ((W ? g[R].replace(Rn, "!") : g[R]).replace(fn, "") == w || (W ? _[R].replace(Rn, "!") : _[R]).replace(fn, "") == w) return x.FileIndex[R];
    return null;
  }
  var Y = 64, ue = -2, V = "d0cf11e0a1b11ae1", b = [208, 207, 17, 224, 161, 177, 26, 225], K = "00000000000000000000000000000000", J = {
    /* 2.1 Compund File Sector Numbers and Types */
    MAXREGSECT: -6,
    DIFSECT: -4,
    FATSECT: -3,
    ENDOFCHAIN: ue,
    FREESECT: -1,
    /* 2.2 Compound File Header */
    HEADER_SIGNATURE: V,
    HEADER_MINOR_VERSION: "3e00",
    MAXREGSID: -6,
    NOSTREAM: -1,
    HEADER_CLSID: K,
    /* 2.6.1 Compound File Directory Entry */
    EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
  };
  function he(x, T, g) {
    o();
    var _ = j(x, g);
    l.writeFileSync(T, _);
  }
  function _e(x) {
    for (var T = new Array(x.length), g = 0; g < x.length; ++g) T[g] = String.fromCharCode(x[g]);
    return T.join("");
  }
  function We(x, T) {
    var g = j(x, T);
    switch (T && T.type || "buffer") {
      case "file":
        return o(), l.writeFileSync(T.filename, g), g;
      case "binary":
        return typeof g == "string" ? g : _e(g);
      case "base64":
        return vn(typeof g == "string" ? g : _e(g));
      case "buffer":
        if (Ie) return Buffer.isBuffer(g) ? g : ir(g);
      case "array":
        return typeof g == "string" ? Ht(g) : g;
    }
    return g;
  }
  var Ke;
  function S(x) {
    try {
      var T = x.InflateRaw, g = new T();
      if (g._processChunk(new Uint8Array([3, 0]), g._finishFlushFlag), g.bytesRead) Ke = x;
      else throw new Error("zlib does not expose bytesRead");
    } catch (_) {
      console.error("cannot use native zlib: " + (_.message || _));
    }
  }
  function P(x, T) {
    if (!Ke) return Dn(x, T);
    var g = Ke.InflateRaw, _ = new g(), E = _._processChunk(x.slice(x.l), _._finishFlushFlag);
    return x.l += _.bytesRead, E;
  }
  function F(x) {
    return Ke ? Ke.deflateRawSync(x) : qr(x);
  }
  var y = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], B = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], ae = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
  function xe(x) {
    var T = (x << 1 | x << 11) & 139536 | (x << 5 | x << 15) & 558144;
    return (T >> 16 | T >> 8 | T) & 255;
  }
  for (var oe = typeof Uint8Array < "u", se = oe ? new Uint8Array(256) : [], Ce = 0; Ce < 256; ++Ce) se[Ce] = xe(Ce);
  function ye(x, T) {
    var g = se[x & 255];
    return T <= 8 ? g >>> 8 - T : (g = g << 8 | se[x >> 8 & 255], T <= 16 ? g >>> 16 - T : (g = g << 8 | se[x >> 16 & 255], g >>> 24 - T));
  }
  function Je(x, T) {
    var g = T & 7, _ = T >>> 3;
    return (x[_] | (g <= 6 ? 0 : x[_ + 1] << 8)) >>> g & 3;
  }
  function Fe(x, T) {
    var g = T & 7, _ = T >>> 3;
    return (x[_] | (g <= 5 ? 0 : x[_ + 1] << 8)) >>> g & 7;
  }
  function Bt(x, T) {
    var g = T & 7, _ = T >>> 3;
    return (x[_] | (g <= 4 ? 0 : x[_ + 1] << 8)) >>> g & 15;
  }
  function He(x, T) {
    var g = T & 7, _ = T >>> 3;
    return (x[_] | (g <= 3 ? 0 : x[_ + 1] << 8)) >>> g & 31;
  }
  function pe(x, T) {
    var g = T & 7, _ = T >>> 3;
    return (x[_] | (g <= 1 ? 0 : x[_ + 1] << 8)) >>> g & 127;
  }
  function pt(x, T, g) {
    var _ = T & 7, E = T >>> 3, w = (1 << g) - 1, R = x[E] >>> _;
    return g < 8 - _ || (R |= x[E + 1] << 8 - _, g < 16 - _) || (R |= x[E + 2] << 16 - _, g < 24 - _) || (R |= x[E + 3] << 24 - _), R & w;
  }
  function Et(x, T, g) {
    var _ = T & 7, E = T >>> 3;
    return _ <= 5 ? x[E] |= (g & 7) << _ : (x[E] |= g << _ & 255, x[E + 1] = (g & 7) >> 8 - _), T + 3;
  }
  function bt(x, T, g) {
    var _ = T & 7, E = T >>> 3;
    return g = (g & 1) << _, x[E] |= g, T + 1;
  }
  function Zt(x, T, g) {
    var _ = T & 7, E = T >>> 3;
    return g <<= _, x[E] |= g & 255, g >>>= 8, x[E + 1] = g, T + 8;
  }
  function Cn(x, T, g) {
    var _ = T & 7, E = T >>> 3;
    return g <<= _, x[E] |= g & 255, g >>>= 8, x[E + 1] = g & 255, x[E + 2] = g >>> 8, T + 16;
  }
  function Ir(x, T) {
    var g = x.length, _ = 2 * g > T ? 2 * g : T + 5, E = 0;
    if (g >= T) return x;
    if (Ie) {
      var w = c0(_);
      if (x.copy) x.copy(w);
      else for (; E < x.length; ++E) w[E] = x[E];
      return w;
    } else if (oe) {
      var R = new Uint8Array(_);
      if (R.set) R.set(x);
      else for (; E < g; ++E) R[E] = x[E];
      return R;
    }
    return x.length = _, x;
  }
  function wt(x) {
    for (var T = new Array(x), g = 0; g < x; ++g) T[g] = 0;
    return T;
  }
  function jt(x, T, g) {
    var _ = 1, E = 0, w = 0, R = 0, W = 0, I = x.length, N = oe ? new Uint16Array(32) : wt(32);
    for (w = 0; w < 32; ++w) N[w] = 0;
    for (w = I; w < g; ++w) x[w] = 0;
    I = x.length;
    var L = oe ? new Uint16Array(I) : wt(I);
    for (w = 0; w < I; ++w)
      N[E = x[w]]++, _ < E && (_ = E), L[w] = 0;
    for (N[0] = 0, w = 1; w <= _; ++w) N[w + 16] = W = W + N[w - 1] << 1;
    for (w = 0; w < I; ++w)
      W = x[w], W != 0 && (L[w] = N[W + 16]++);
    var Z = 0;
    for (w = 0; w < I; ++w)
      if (Z = x[w], Z != 0)
        for (W = ye(L[w], _) >> _ - Z, R = (1 << _ + 4 - Z) - 1; R >= 0; --R)
          T[W | R << Z] = Z & 15 | w << 4;
    return _;
  }
  var Xt = oe ? new Uint16Array(512) : wt(512), sr = oe ? new Uint16Array(32) : wt(32);
  if (!oe) {
    for (var qt = 0; qt < 512; ++qt) Xt[qt] = 0;
    for (qt = 0; qt < 32; ++qt) sr[qt] = 0;
  }
  (function() {
    for (var x = [], T = 0; T < 32; T++) x.push(5);
    jt(x, sr, 32);
    var g = [];
    for (T = 0; T <= 143; T++) g.push(8);
    for (; T <= 255; T++) g.push(9);
    for (; T <= 279; T++) g.push(7);
    for (; T <= 287; T++) g.push(8);
    jt(g, Xt, 288);
  })();
  var oa = /* @__PURE__ */ function() {
    for (var T = oe ? new Uint8Array(32768) : [], g = 0, _ = 0; g < ae.length - 1; ++g)
      for (; _ < ae[g + 1]; ++_) T[_] = g;
    for (; _ < 32768; ++_) T[_] = 29;
    var E = oe ? new Uint8Array(259) : [];
    for (g = 0, _ = 0; g < B.length - 1; ++g)
      for (; _ < B[g + 1]; ++_) E[_] = g;
    function w(W, I) {
      for (var N = 0; N < W.length; ) {
        var L = Math.min(65535, W.length - N), Z = N + L == W.length;
        for (I.write_shift(1, +Z), I.write_shift(2, L), I.write_shift(2, ~L & 65535); L-- > 0; ) I[I.l++] = W[N++];
      }
      return I.l;
    }
    function R(W, I) {
      for (var N = 0, L = 0, Z = oe ? new Uint16Array(32768) : []; L < W.length; ) {
        var fe = (
          /* data.length - boff; */
          Math.min(65535, W.length - L)
        );
        if (fe < 10) {
          for (N = Et(I, N, +(L + fe == W.length)), N & 7 && (N += 8 - (N & 7)), I.l = N / 8 | 0, I.write_shift(2, fe), I.write_shift(2, ~fe & 65535); fe-- > 0; ) I[I.l++] = W[L++];
          N = I.l * 8;
          continue;
        }
        N = Et(I, N, +(L + fe == W.length) + 2);
        for (var ve = 0; fe-- > 0; ) {
          var te = W[L];
          ve = (ve << 5 ^ te) & 32767;
          var de = -1, Se = 0;
          if ((de = Z[ve]) && (de |= L & -32768, de > L && (de -= 32768), de < L))
            for (; W[de + Se] == W[L + Se] && Se < 250; ) ++Se;
          if (Se > 2) {
            te = E[Se], te <= 22 ? N = Zt(I, N, se[te + 1] >> 1) - 1 : (Zt(I, N, 3), N += 5, Zt(I, N, se[te - 23] >> 5), N += 3);
            var Ve = te < 8 ? 0 : te - 4 >> 2;
            Ve > 0 && (Cn(I, N, Se - B[te]), N += Ve), te = T[L - de], N = Zt(I, N, se[te] >> 3), N -= 3;
            var Ge = te < 4 ? 0 : te - 2 >> 1;
            Ge > 0 && (Cn(I, N, L - de - ae[te]), N += Ge);
            for (var dt = 0; dt < Se; ++dt)
              Z[ve] = L & 32767, ve = (ve << 5 ^ W[L]) & 32767, ++L;
            fe -= Se - 1;
          } else
            te <= 143 ? te = te + 48 : N = bt(I, N, 1), N = Zt(I, N, se[te]), Z[ve] = L & 32767, ++L;
        }
        N = Zt(I, N, 0) - 1;
      }
      return I.l = (N + 7) / 8 | 0, I.l;
    }
    return function(I, N) {
      return I.length < 8 ? w(I, N) : R(I, N);
    };
  }();
  function qr(x) {
    var T = U(50 + Math.floor(x.length * 1.1)), g = oa(x, T);
    return T.slice(0, g);
  }
  var Rr = oe ? new Uint16Array(32768) : wt(32768), Nr = oe ? new Uint16Array(32768) : wt(32768), fr = oe ? new Uint16Array(128) : wt(128), Pr = 1, Qr = 1;
  function ca(x, T) {
    var g = He(x, T) + 257;
    T += 5;
    var _ = He(x, T) + 1;
    T += 5;
    var E = Bt(x, T) + 4;
    T += 4;
    for (var w = 0, R = oe ? new Uint8Array(19) : wt(19), W = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], I = 1, N = oe ? new Uint8Array(8) : wt(8), L = oe ? new Uint8Array(8) : wt(8), Z = R.length, fe = 0; fe < E; ++fe)
      R[y[fe]] = w = Fe(x, T), I < w && (I = w), N[w]++, T += 3;
    var ve = 0;
    for (N[0] = 0, fe = 1; fe <= I; ++fe) L[fe] = ve = ve + N[fe - 1] << 1;
    for (fe = 0; fe < Z; ++fe) (ve = R[fe]) != 0 && (W[fe] = L[ve]++);
    var te = 0;
    for (fe = 0; fe < Z; ++fe)
      if (te = R[fe], te != 0) {
        ve = se[W[fe]] >> 8 - te;
        for (var de = (1 << 7 - te) - 1; de >= 0; --de) fr[ve | de << te] = te & 7 | fe << 3;
      }
    var Se = [];
    for (I = 1; Se.length < g + _; )
      switch (ve = fr[pe(x, T)], T += ve & 7, ve >>>= 3) {
        case 16:
          for (w = 3 + Je(x, T), T += 2, ve = Se[Se.length - 1]; w-- > 0; ) Se.push(ve);
          break;
        case 17:
          for (w = 3 + Fe(x, T), T += 3; w-- > 0; ) Se.push(0);
          break;
        case 18:
          for (w = 11 + pe(x, T), T += 7; w-- > 0; ) Se.push(0);
          break;
        default:
          Se.push(ve), I < ve && (I = ve);
          break;
      }
    var Ve = Se.slice(0, g), Ge = Se.slice(g);
    for (fe = g; fe < 286; ++fe) Ve[fe] = 0;
    for (fe = _; fe < 30; ++fe) Ge[fe] = 0;
    return Pr = jt(Ve, Rr, 286), Qr = jt(Ge, Nr, 30), T;
  }
  function ua(x, T) {
    if (x[0] == 3 && !(x[1] & 3))
      return [Sr(T), 2];
    for (var g = 0, _ = 0, E = c0(T || 1 << 18), w = 0, R = E.length >>> 0, W = 0, I = 0; !(_ & 1); ) {
      if (_ = Fe(x, g), g += 3, _ >>> 1)
        _ >> 1 == 1 ? (W = 9, I = 5) : (g = ca(x, g), W = Pr, I = Qr);
      else {
        g & 7 && (g += 8 - (g & 7));
        var N = x[g >>> 3] | x[(g >>> 3) + 1] << 8;
        if (g += 32, N > 0)
          for (!T && R < w + N && (E = Ir(E, w + N), R = E.length); N-- > 0; )
            E[w++] = x[g >>> 3], g += 8;
        continue;
      }
      for (; ; ) {
        !T && R < w + 32767 && (E = Ir(E, w + 32767), R = E.length);
        var L = pt(x, g, W), Z = _ >>> 1 == 1 ? Xt[L] : Rr[L];
        if (g += Z & 15, Z >>>= 4, !(Z >>> 8 & 255)) E[w++] = Z;
        else {
          if (Z == 256) break;
          Z -= 257;
          var fe = Z < 8 ? 0 : Z - 4 >> 2;
          fe > 5 && (fe = 0);
          var ve = w + B[Z];
          fe > 0 && (ve += pt(x, g, fe), g += fe), L = pt(x, g, I), Z = _ >>> 1 == 1 ? sr[L] : Nr[L], g += Z & 15, Z >>>= 4;
          var te = Z < 4 ? 0 : Z - 2 >> 1, de = ae[Z];
          for (te > 0 && (de += pt(x, g, te), g += te), !T && R < ve && (E = Ir(E, ve + 100), R = E.length); w < ve; )
            E[w] = E[w - de], ++w;
        }
      }
    }
    return T ? [E, g + 7 >>> 3] : [E.slice(0, w), g + 7 >>> 3];
  }
  function Dn(x, T) {
    var g = x.slice(x.l || 0), _ = ua(g, T);
    return x.l += _[1], _[0];
  }
  function On(x, T) {
    if (x)
      typeof console < "u" && console.error(T);
    else throw new Error(T);
  }
  function me(x, T) {
    var g = (
      /*::(*/
      x
    );
    Ct(g, 0);
    var _ = [], E = [], w = {
      FileIndex: _,
      FullPaths: E
    };
    O(w, { root: T.root });
    for (var R = g.length - 4; (g[R] != 80 || g[R + 1] != 75 || g[R + 2] != 5 || g[R + 3] != 6) && R >= 0; ) --R;
    g.l = R + 4, g.l += 4;
    var W = g.read_shift(2);
    g.l += 6;
    var I = g.read_shift(4);
    for (g.l = I, R = 0; R < W; ++R) {
      g.l += 20;
      var N = g.read_shift(4), L = g.read_shift(4), Z = g.read_shift(2), fe = g.read_shift(2), ve = g.read_shift(2);
      g.l += 8;
      var te = g.read_shift(4), de = f(
        /*::(*/
        g.slice(g.l + Z, g.l + Z + fe)
        /*:: :any)*/
      );
      g.l += Z + fe + ve;
      var Se = g.l;
      g.l = te + 4, z(g, N, L, w, de), g.l = Se;
    }
    return w;
  }
  function z(x, T, g, _, E) {
    x.l += 2;
    var w = x.read_shift(2), R = x.read_shift(2), W = s(x);
    if (w & 8257) throw new Error("Unsupported ZIP encryption");
    for (var I = x.read_shift(4), N = x.read_shift(4), L = x.read_shift(4), Z = x.read_shift(2), fe = x.read_shift(2), ve = "", te = 0; te < Z; ++te) ve += String.fromCharCode(x[x.l++]);
    if (fe) {
      var de = f(
        /*::(*/
        x.slice(x.l, x.l + fe)
        /*:: :any)*/
      );
      (de[21589] || {}).mt && (W = de[21589].mt), ((E || {})[21589] || {}).mt && (W = E[21589].mt);
    }
    x.l += fe;
    var Se = x.slice(x.l, x.l + N);
    switch (R) {
      case 8:
        Se = P(x, L);
        break;
      case 0:
        break;
      default:
        throw new Error("Unsupported ZIP Compression method " + R);
    }
    var Ve = !1;
    w & 8 && (I = x.read_shift(4), I == 134695760 && (I = x.read_shift(4), Ve = !0), N = x.read_shift(4), L = x.read_shift(4)), N != T && On(Ve, "Bad compressed size: " + T + " != " + N), L != g && On(Ve, "Bad uncompressed size: " + g + " != " + L), ha(_, ve, Se, { unsafe: !0, mt: W });
  }
  function ie(x, T) {
    var g = T || {}, _ = [], E = [], w = U(1), R = g.compression ? 8 : 0, W = 0, I = 0, N = 0, L = 0, Z = 0, fe = x.FullPaths[0], ve = fe, te = x.FileIndex[0], de = [], Se = 0;
    for (I = 1; I < x.FullPaths.length; ++I)
      if (ve = x.FullPaths[I].slice(fe.length), te = x.FileIndex[I], !(!te.size || !te.content || ve == "Sh33tJ5")) {
        var Ve = L, Ge = U(ve.length);
        for (N = 0; N < ve.length; ++N) Ge.write_shift(1, ve.charCodeAt(N) & 127);
        Ge = Ge.slice(0, Ge.l), de[Z] = nl.buf(
          /*::((*/
          te.content,
          0
        );
        var dt = te.content;
        R == 8 && (dt = F(dt)), w = U(30), w.write_shift(4, 67324752), w.write_shift(2, 20), w.write_shift(2, W), w.write_shift(2, R), te.mt ? i(w, te.mt) : w.write_shift(4, 0), w.write_shift(-4, de[Z]), w.write_shift(4, dt.length), w.write_shift(
          4,
          /*::(*/
          te.content.length
        ), w.write_shift(2, Ge.length), w.write_shift(2, 0), L += w.length, _.push(w), L += Ge.length, _.push(Ge), L += dt.length, _.push(dt), w = U(46), w.write_shift(4, 33639248), w.write_shift(2, 0), w.write_shift(2, 20), w.write_shift(2, W), w.write_shift(2, R), w.write_shift(4, 0), w.write_shift(-4, de[Z]), w.write_shift(4, dt.length), w.write_shift(
          4,
          /*::(*/
          te.content.length
        ), w.write_shift(2, Ge.length), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(4, 0), w.write_shift(4, Ve), Se += w.l, E.push(w), Se += Ge.length, E.push(Ge), ++Z;
      }
    return w = U(22), w.write_shift(4, 101010256), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(2, Z), w.write_shift(2, Z), w.write_shift(4, Se), w.write_shift(4, L), w.write_shift(2, 0), ot([ot(_), ot(E), w]);
  }
  var De = {
    htm: "text/html",
    xml: "text/xml",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    mso: "application/x-mso",
    thmx: "application/vnd.ms-officetheme",
    sh33tj5: "application/octet-stream"
  };
  function Xe(x, T) {
    if (x.ctype) return x.ctype;
    var g = x.name || "", _ = g.match(/\.([^\.]+)$/);
    return _ && De[_[1]] || T && (_ = (g = T).match(/[\.\\]([^\.\\])+$/), _ && De[_[1]]) ? De[_[1]] : "application/octet-stream";
  }
  function lr(x) {
    for (var T = vn(x), g = [], _ = 0; _ < T.length; _ += 76) g.push(T.slice(_, _ + 76));
    return g.join(`\r
`) + `\r
`;
  }
  function Rt(x) {
    var T = x.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function(N) {
      var L = N.charCodeAt(0).toString(16).toUpperCase();
      return "=" + (L.length == 1 ? "0" + L : L);
    });
    T = T.replace(/ $/mg, "=20").replace(/\t$/mg, "=09"), T.charAt(0) == `
` && (T = "=0D" + T.slice(1)), T = T.replace(/\r(?!\n)/mg, "=0D").replace(/\n\n/mg, `
=0A`).replace(/([^\r\n])\n/mg, "$1=0A");
    for (var g = [], _ = T.split(`\r
`), E = 0; E < _.length; ++E) {
      var w = _[E];
      if (w.length == 0) {
        g.push("");
        continue;
      }
      for (var R = 0; R < w.length; ) {
        var W = 76, I = w.slice(R, R + W);
        I.charAt(W - 1) == "=" ? W-- : I.charAt(W - 2) == "=" ? W -= 2 : I.charAt(W - 3) == "=" && (W -= 3), I = w.slice(R, R + W), R += W, R < w.length && (I += "="), g.push(I);
      }
    }
    return g.join(`\r
`);
  }
  function Lr(x) {
    for (var T = [], g = 0; g < x.length; ++g) {
      for (var _ = x[g]; g <= x.length && _.charAt(_.length - 1) == "="; ) _ = _.slice(0, _.length - 1) + x[++g];
      T.push(_);
    }
    for (var E = 0; E < T.length; ++E) T[E] = T[E].replace(/[=][0-9A-Fa-f]{2}/g, function(w) {
      return String.fromCharCode(parseInt(w.slice(1), 16));
    });
    return Ht(T.join(`\r
`));
  }
  function St(x, T, g) {
    for (var _ = "", E = "", w = "", R, W = 0; W < 10; ++W) {
      var I = T[W];
      if (!I || I.match(/^\s*$/)) break;
      var N = I.match(/^(.*?):\s*([^\s].*)$/);
      if (N) switch (N[1].toLowerCase()) {
        case "content-location":
          _ = N[2].trim();
          break;
        case "content-type":
          w = N[2].trim();
          break;
        case "content-transfer-encoding":
          E = N[2].trim();
          break;
      }
    }
    switch (++W, E.toLowerCase()) {
      case "base64":
        R = Ht(nr(T.slice(W).join("")));
        break;
      case "quoted-printable":
        R = Lr(T.slice(W));
        break;
      default:
        throw new Error("Unsupported Content-Transfer-Encoding " + E);
    }
    var L = ha(x, _.slice(g.length), R, { unsafe: !0 });
    w && (L.ctype = w);
  }
  function Rs(x, T) {
    if (_e(x.slice(0, 13)).toLowerCase() != "mime-version:") throw new Error("Unsupported MAD header");
    var g = T && T.root || "", _ = (Ie && Buffer.isBuffer(x) ? x.toString("binary") : _e(x)).split(`\r
`), E = 0, w = "";
    for (E = 0; E < _.length; ++E)
      if (w = _[E], !!/^Content-Location:/i.test(w) && (w = w.slice(w.indexOf("file")), g || (g = w.slice(0, w.lastIndexOf("/") + 1)), w.slice(0, g.length) != g))
        for (; g.length > 0 && (g = g.slice(0, g.length - 1), g = g.slice(0, g.lastIndexOf("/") + 1), w.slice(0, g.length) != g); )
          ;
    var R = (_[1] || "").match(/boundary="(.*?)"/);
    if (!R) throw new Error("MAD cannot find boundary");
    var W = "--" + (R[1] || ""), I = [], N = [], L = {
      FileIndex: I,
      FullPaths: N
    };
    O(L);
    var Z, fe = 0;
    for (E = 0; E < _.length; ++E) {
      var ve = _[E];
      ve !== W && ve !== W + "--" || (fe++ && St(L, _.slice(Z, E), g), Z = E);
    }
    return L;
  }
  function Ns(x, T) {
    var g = T || {}, _ = g.boundary || "SheetJS";
    _ = "------=" + _;
    for (var E = [
      "MIME-Version: 1.0",
      'Content-Type: multipart/related; boundary="' + _.slice(2) + '"',
      "",
      "",
      ""
    ], w = x.FullPaths[0], R = w, W = x.FileIndex[0], I = 1; I < x.FullPaths.length; ++I)
      if (R = x.FullPaths[I].slice(w.length), W = x.FileIndex[I], !(!W.size || !W.content || R == "Sh33tJ5")) {
        R = R.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function(Se) {
          return "_x" + Se.charCodeAt(0).toString(16) + "_";
        }).replace(/[\u0080-\uFFFF]/g, function(Se) {
          return "_u" + Se.charCodeAt(0).toString(16) + "_";
        });
        for (var N = W.content, L = Ie && Buffer.isBuffer(N) ? N.toString("binary") : _e(N), Z = 0, fe = Math.min(1024, L.length), ve = 0, te = 0; te <= fe; ++te) (ve = L.charCodeAt(te)) >= 32 && ve < 128 && ++Z;
        var de = Z >= fe * 4 / 5;
        E.push(_), E.push("Content-Location: " + (g.root || "file:///C:/SheetJS/") + R), E.push("Content-Transfer-Encoding: " + (de ? "quoted-printable" : "base64")), E.push("Content-Type: " + Xe(W, R)), E.push(""), E.push(de ? Rt(L) : lr(L));
      }
    return E.push(_ + `--\r
`), E.join(`\r
`);
  }
  function Ps(x) {
    var T = {};
    return O(T, x), T;
  }
  function ha(x, T, g, _) {
    var E = _ && _.unsafe;
    E || O(x);
    var w = !E && be.find(x, T);
    if (!w) {
      var R = x.FullPaths[0];
      T.slice(0, R.length) == R ? R = T : (R.slice(-1) != "/" && (R += "/"), R = (R + T).replace("//", "/")), w = { name: a(T), type: 2 }, x.FileIndex.push(w), x.FullPaths.push(R), E || be.utils.cfb_gc(x);
    }
    return w.content = g, w.size = g ? g.length : 0, _ && (_.CLSID && (w.clsid = _.CLSID), _.mt && (w.mt = _.mt), _.ct && (w.ct = _.ct)), w;
  }
  function Ls(x, T) {
    O(x);
    var g = be.find(x, T);
    if (g) {
      for (var _ = 0; _ < x.FileIndex.length; ++_) if (x.FileIndex[_] == g)
        return x.FileIndex.splice(_, 1), x.FullPaths.splice(_, 1), !0;
    }
    return !1;
  }
  function Ms(x, T, g) {
    O(x);
    var _ = be.find(x, T);
    if (_) {
      for (var E = 0; E < x.FileIndex.length; ++E) if (x.FileIndex[E] == _)
        return x.FileIndex[E].name = a(g), x.FullPaths[E] = g, !0;
    }
    return !1;
  }
  function Bs(x) {
    D(x, !0);
  }
  return r.find = X, r.read = ce, r.parse = c, r.write = We, r.writeFile = he, r.utils = {
    cfb_new: Ps,
    cfb_add: ha,
    cfb_del: Ls,
    cfb_mov: Ms,
    cfb_gc: Bs,
    ReadShift: on,
    CheckField: Di,
    prep_blob: Ct,
    bconcat: ot,
    use_zlib: S,
    _deflateRaw: qr,
    _inflateRaw: Dn,
    consts: J
  }, r;
}();
function al(e) {
  return typeof e == "string" ? ta(e) : Array.isArray(e) ? Of(e) : e;
}
function Sn(e, r, t) {
  if (typeof Deno < "u") {
    if (t && typeof r == "string") switch (t) {
      case "utf8":
        r = new TextEncoder(t).encode(r);
        break;
      case "binary":
        r = ta(r);
        break;
      default:
        throw new Error("Unsupported encoding " + t);
    }
    return Deno.writeFileSync(e, r);
  }
  var n = t == "utf8" ? mn(r) : r;
  if (typeof IE_SaveFile < "u") return IE_SaveFile(n, e);
  if (typeof Blob < "u") {
    var a = new Blob([al(n)], { type: "application/octet-stream" });
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
    var f = File(e);
    return f.open("w"), f.encoding = "binary", Array.isArray(r) && (r = wn(r)), f.write(r), f.close(), r;
  } catch (l) {
    if (!l.message || !l.message.match(/onstruct/)) throw l;
  }
  throw new Error("cannot save file " + e);
}
function ht(e) {
  for (var r = Object.keys(e), t = [], n = 0; n < r.length; ++n) Object.prototype.hasOwnProperty.call(e, r[n]) && t.push(r[n]);
  return t;
}
function g0(e, r) {
  for (var t = [], n = ht(e), a = 0; a !== n.length; ++a) t[e[n[a]][r]] == null && (t[e[n[a]][r]] = n[a]);
  return t;
}
function Ma(e) {
  for (var r = [], t = ht(e), n = 0; n !== t.length; ++n) r[e[t[n]]] = t[n];
  return r;
}
function aa(e) {
  for (var r = [], t = ht(e), n = 0; n !== t.length; ++n) r[e[t[n]]] = parseInt(t[n], 10);
  return r;
}
function il(e) {
  for (var r = [], t = ht(e), n = 0; n !== t.length; ++n)
    r[e[t[n]]] == null && (r[e[t[n]]] = []), r[e[t[n]]].push(t[n]);
  return r;
}
var jn = /* @__PURE__ */ new Date(1899, 11, 30, 0, 0, 0);
function yt(e, r) {
  var t = /* @__PURE__ */ e.getTime(), n = /* @__PURE__ */ jn.getTime() + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ jn.getTimezoneOffset()) * 6e4;
  return (t - n) / (24 * 60 * 60 * 1e3);
}
var hi = /* @__PURE__ */ new Date(), sl = /* @__PURE__ */ jn.getTime() + (/* @__PURE__ */ hi.getTimezoneOffset() - /* @__PURE__ */ jn.getTimezoneOffset()) * 6e4, _0 = /* @__PURE__ */ hi.getTimezoneOffset();
function di(e) {
  var r = /* @__PURE__ */ new Date();
  return r.setTime(e * 24 * 60 * 60 * 1e3 + sl), r.getTimezoneOffset() !== _0 && r.setTime(r.getTime() + (r.getTimezoneOffset() - _0) * 6e4), r;
}
var T0 = /* @__PURE__ */ new Date("2017-02-19T19:06:09.000Z"), xi = /* @__PURE__ */ isNaN(/* @__PURE__ */ T0.getFullYear()) ? /* @__PURE__ */ new Date("2/19/17") : T0, fl = /* @__PURE__ */ xi.getFullYear() == 2017;
function Tt(e, r) {
  var t = new Date(e);
  if (fl)
    return r > 0 ? t.setTime(t.getTime() + t.getTimezoneOffset() * 60 * 1e3) : r < 0 && t.setTime(t.getTime() - t.getTimezoneOffset() * 60 * 1e3), t;
  if (e instanceof Date) return e;
  if (xi.getFullYear() == 1917 && !isNaN(t.getFullYear())) {
    var n = t.getFullYear();
    return e.indexOf("" + n) > -1 || t.setFullYear(t.getFullYear() + 100), t;
  }
  var a = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"], i = new Date(+a[0], +a[1] - 1, +a[2], +a[3] || 0, +a[4] || 0, +a[5] || 0);
  return e.indexOf("Z") > -1 && (i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3)), i;
}
function ia(e, r) {
  if (Ie && Buffer.isBuffer(e))
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
function Ft(e) {
  if (typeof JSON < "u" && !Array.isArray(e)) return JSON.parse(JSON.stringify(e));
  if (typeof e != "object" || e == null) return e;
  if (e instanceof Date) return new Date(e.getTime());
  var r = {};
  for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = Ft(e[t]));
  return r;
}
function ze(e, r) {
  for (var t = ""; t.length < r; ) t += e;
  return t;
}
function tr(e) {
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
var ll = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
function pn(e) {
  var r = new Date(e), t = /* @__PURE__ */ new Date(NaN), n = r.getYear(), a = r.getMonth(), i = r.getDate();
  if (isNaN(i)) return t;
  var s = e.toLowerCase();
  if (s.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
    if (s = s.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, ""), s.length > 3 && ll.indexOf(s) == -1) return t;
  } else if (s.match(/[a-z]/)) return t;
  return n < 0 || n > 8099 ? t : (a > 0 || i > 1) && n != 101 ? r : e.match(/[^-0-9:,\/\\]/) ? t : r;
}
function Ae(e, r, t) {
  if (e.FullPaths) {
    if (typeof t == "string") {
      var n;
      return Ie ? n = ir(t) : n = If(t), be.utils.cfb_add(e, r, n);
    }
    be.utils.cfb_add(e, r, t);
  } else e.file(r, t);
}
function Ba() {
  return be.utils.cfb_new();
}
var et = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`, ol = {
  "&quot;": '"',
  "&apos;": "'",
  "&gt;": ">",
  "&lt;": "<",
  "&amp;": "&"
}, ba = /* @__PURE__ */ Ma(ol), Ua = /[&<>'"]/g, cl = /[\u0000-\u0008\u000b-\u001f]/g;
function Me(e) {
  var r = e + "";
  return r.replace(Ua, function(t) {
    return ba[t];
  }).replace(cl, function(t) {
    return "_x" + ("000" + t.charCodeAt(0).toString(16)).slice(-4) + "_";
  });
}
function E0(e) {
  return Me(e).replace(/ /g, "_x0020_");
}
var vi = /[\u0000-\u001f]/g;
function ul(e) {
  var r = e + "";
  return r.replace(Ua, function(t) {
    return ba[t];
  }).replace(/\n/g, "<br/>").replace(vi, function(t) {
    return "&#x" + ("000" + t.charCodeAt(0).toString(16)).slice(-4) + ";";
  });
}
function hl(e) {
  var r = e + "";
  return r.replace(Ua, function(t) {
    return ba[t];
  }).replace(vi, function(t) {
    return "&#x" + t.charCodeAt(0).toString(16).toUpperCase() + ";";
  });
}
function dl(e) {
  return e.replace(/(\r\n|[\r\n])/g, "&#10;");
}
function xl(e) {
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
function ga(e) {
  for (var r = "", t = 0, n = 0, a = 0, i = 0, s = 0, f = 0; t < e.length; ) {
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
    s = e.charCodeAt(t++), f = ((n & 7) << 18 | (a & 63) << 12 | (i & 63) << 6 | s & 63) - 65536, r += String.fromCharCode(55296 + (f >>> 10 & 1023)), r += String.fromCharCode(56320 + (f & 1023));
  }
  return r;
}
function w0(e) {
  var r = Sr(2 * e.length), t, n, a = 1, i = 0, s = 0, f;
  for (n = 0; n < e.length; n += a)
    a = 1, (f = e.charCodeAt(n)) < 128 ? t = f : f < 224 ? (t = (f & 31) * 64 + (e.charCodeAt(n + 1) & 63), a = 2) : f < 240 ? (t = (f & 15) * 4096 + (e.charCodeAt(n + 1) & 63) * 64 + (e.charCodeAt(n + 2) & 63), a = 3) : (a = 4, t = (f & 7) * 262144 + (e.charCodeAt(n + 1) & 63) * 4096 + (e.charCodeAt(n + 2) & 63) * 64 + (e.charCodeAt(n + 3) & 63), t -= 65536, s = 55296 + (t >>> 10 & 1023), t = 56320 + (t & 1023)), s !== 0 && (r[i++] = s & 255, r[i++] = s >>> 8, s = 0), r[i++] = t % 256, r[i++] = t >>> 8;
  return r.slice(0, i).toString("ucs2");
}
function S0(e) {
  return ir(e, "binary").toString("utf8");
}
var Pn = "foo bar bazâð£", ln = Ie && (/* @__PURE__ */ S0(Pn) == /* @__PURE__ */ ga(Pn) && S0 || /* @__PURE__ */ w0(Pn) == /* @__PURE__ */ ga(Pn) && w0) || ga, mn = Ie ? function(e) {
  return ir(e, "utf8").toString("binary");
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
}, vl = /* @__PURE__ */ function() {
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
}(), pi = /(^\s|\s$|\n)/;
function ct(e, r) {
  return "<" + e + (r.match(pi) ? ' xml:space="preserve"' : "") + ">" + r + "</" + e + ">";
}
function gn(e) {
  return ht(e).map(function(r) {
    return " " + r + '="' + e[r] + '"';
  }).join("");
}
function re(e, r, t) {
  return "<" + e + (t != null ? gn(t) : "") + (r != null ? (r.match(pi) ? ' xml:space="preserve"' : "") + ">" + r + "</" + e : "/") + ">";
}
function Oa(e, r) {
  try {
    return e.toISOString().replace(/\.\d*/, "");
  } catch (t) {
    if (r) throw t;
  }
  return "";
}
function pl(e, r) {
  switch (typeof e) {
    case "string":
      var t = re("vt:lpwstr", Me(e));
      return t = t.replace(/&quot;/g, "_x0022_"), t;
    case "number":
      return re((e | 0) == e ? "vt:i4" : "vt:r8", Me(String(e)));
    case "boolean":
      return re("vt:bool", e ? "true" : "false");
  }
  if (e instanceof Date) return re("vt:filetime", Oa(e));
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
}, Yr = [
  "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  "http://purl.oclc.org/ooxml/spreadsheetml/main",
  "http://schemas.microsoft.com/office/excel/2006/main",
  "http://schemas.microsoft.com/office/excel/2006/2"
], Dt = {
  o: "urn:schemas-microsoft-com:office:office",
  x: "urn:schemas-microsoft-com:office:excel",
  ss: "urn:schemas-microsoft-com:office:spreadsheet",
  dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
  mv: "http://macVmlSchemaUri",
  v: "urn:schemas-microsoft-com:vml",
  html: "http://www.w3.org/TR/REC-html40"
};
function ml(e, r) {
  for (var t = 1 - 2 * (e[r + 7] >>> 7), n = ((e[r + 7] & 127) << 4) + (e[r + 6] >>> 4 & 15), a = e[r + 6] & 15, i = 5; i >= 0; --i) a = a * 256 + e[r + i];
  return n == 2047 ? a == 0 ? t * (1 / 0) : NaN : (n == 0 ? n = -1022 : (n -= 1023, a += Math.pow(2, 52)), t * Math.pow(2, n - 52) * a);
}
function gl(e, r, t) {
  var n = (r < 0 || 1 / r == -1 / 0 ? 1 : 0) << 7, a = 0, i = 0, s = n ? -r : r;
  isFinite(s) ? s == 0 ? a = i = 0 : (a = Math.floor(Math.log(s) / Math.LN2), i = s * Math.pow(2, 52 - a), a <= -1023 && (!isFinite(i) || i < Math.pow(2, 52)) ? a = -1022 : (i -= Math.pow(2, 52), a += 1023)) : (a = 2047, i = isNaN(r) ? 26985 : 0);
  for (var f = 0; f <= 5; ++f, i /= 256) e[t + f] = i & 255;
  e[t + 6] = (a & 15) << 4 | i & 15, e[t + 7] = a >> 4 | n;
}
var A0 = function(e) {
  for (var r = [], t = 10240, n = 0; n < e[0].length; ++n) if (e[0][n]) for (var a = 0, i = e[0][n].length; a < i; a += t) r.push.apply(r, e[0][n].slice(a, a + t));
  return r;
}, y0 = Ie ? function(e) {
  return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0].map(function(r) {
    return Buffer.isBuffer(r) ? r : ir(r);
  })) : A0(e);
} : A0, F0 = function(e, r, t) {
  for (var n = [], a = r; a < t; a += 2) n.push(String.fromCharCode(an(e, a)));
  return n.join("").replace(fn, "");
}, Wa = Ie ? function(e, r, t) {
  return Buffer.isBuffer(e) ? e.toString("utf16le", r, t).replace(fn, "") : F0(e, r, t);
} : F0, k0 = function(e, r, t) {
  for (var n = [], a = r; a < r + t; ++a) n.push(("0" + e[a].toString(16)).slice(-2));
  return n.join("");
}, mi = Ie ? function(e, r, t) {
  return Buffer.isBuffer(e) ? e.toString("hex", r, r + t) : k0(e, r, t);
} : k0, C0 = function(e, r, t) {
  for (var n = [], a = r; a < t; a++) n.push(String.fromCharCode(Wr(e, a)));
  return n.join("");
}, An = Ie ? function(r, t, n) {
  return Buffer.isBuffer(r) ? r.toString("utf8", t, n) : C0(r, t, n);
} : C0, gi = function(e, r) {
  var t = Ot(e, r);
  return t > 0 ? An(e, r + 4, r + 4 + t - 1) : "";
}, _i = gi, Ti = function(e, r) {
  var t = Ot(e, r);
  return t > 0 ? An(e, r + 4, r + 4 + t - 1) : "";
}, Ei = Ti, wi = function(e, r) {
  var t = 2 * Ot(e, r);
  return t > 0 ? An(e, r + 4, r + 4 + t - 1) : "";
}, Si = wi, Ai = function(r, t) {
  var n = Ot(r, t);
  return n > 0 ? Wa(r, t + 4, t + 4 + n) : "";
}, yi = Ai, Fi = function(e, r) {
  var t = Ot(e, r);
  return t > 0 ? An(e, r + 4, r + 4 + t) : "";
}, ki = Fi, Ci = function(e, r) {
  return ml(e, r);
}, Xn = Ci, $a = function(r) {
  return Array.isArray(r) || typeof Uint8Array < "u" && r instanceof Uint8Array;
};
Ie && (_i = function(r, t) {
  if (!Buffer.isBuffer(r)) return gi(r, t);
  var n = r.readUInt32LE(t);
  return n > 0 ? r.toString("utf8", t + 4, t + 4 + n - 1) : "";
}, Ei = function(r, t) {
  if (!Buffer.isBuffer(r)) return Ti(r, t);
  var n = r.readUInt32LE(t);
  return n > 0 ? r.toString("utf8", t + 4, t + 4 + n - 1) : "";
}, Si = function(r, t) {
  if (!Buffer.isBuffer(r)) return wi(r, t);
  var n = 2 * r.readUInt32LE(t);
  return r.toString("utf16le", t + 4, t + 4 + n - 1);
}, yi = function(r, t) {
  if (!Buffer.isBuffer(r)) return Ai(r, t);
  var n = r.readUInt32LE(t);
  return r.toString("utf16le", t + 4, t + 4 + n);
}, ki = function(r, t) {
  if (!Buffer.isBuffer(r)) return Fi(r, t);
  var n = r.readUInt32LE(t);
  return r.toString("utf8", t + 4, t + 4 + n);
}, Xn = function(r, t) {
  return Buffer.isBuffer(r) ? r.readDoubleLE(t) : Ci(r, t);
}, $a = function(r) {
  return Buffer.isBuffer(r) || Array.isArray(r) || typeof Uint8Array < "u" && r instanceof Uint8Array;
});
var Wr = function(e, r) {
  return e[r];
}, an = function(e, r) {
  return e[r + 1] * 256 + e[r];
}, _l = function(e, r) {
  var t = e[r + 1] * 256 + e[r];
  return t < 32768 ? t : (65535 - t + 1) * -1;
}, Ot = function(e, r) {
  return e[r + 3] * (1 << 24) + (e[r + 2] << 16) + (e[r + 1] << 8) + e[r];
}, Er = function(e, r) {
  return e[r + 3] << 24 | e[r + 2] << 16 | e[r + 1] << 8 | e[r];
}, Tl = function(e, r) {
  return e[r] << 24 | e[r + 1] << 16 | e[r + 2] << 8 | e[r + 3];
};
function on(e, r) {
  var t = "", n, a, i = [], s, f, l, o;
  switch (r) {
    case "dbcs":
      if (o = this.l, Ie && Buffer.isBuffer(this)) t = this.slice(this.l, this.l + 2 * e).toString("utf16le");
      else for (l = 0; l < e; ++l)
        t += String.fromCharCode(an(this, o)), o += 2;
      e *= 2;
      break;
    case "utf8":
      t = An(this, this.l, this.l + e);
      break;
    case "utf16le":
      e *= 2, t = Wa(this, this.l, this.l + e);
      break;
    case "wstr":
      return on.call(this, e, "dbcs");
    case "lpstr-ansi":
      t = _i(this, this.l), e = 4 + Ot(this, this.l);
      break;
    case "lpstr-cp":
      t = Ei(this, this.l), e = 4 + Ot(this, this.l);
      break;
    case "lpwstr":
      t = Si(this, this.l), e = 4 + 2 * Ot(this, this.l);
      break;
    case "lpp4":
      e = 4 + Ot(this, this.l), t = yi(this, this.l), e & 2 && (e += 2);
      break;
    case "8lpp4":
      e = 4 + Ot(this, this.l), t = ki(this, this.l), e & 3 && (e += 4 - (e & 3));
      break;
    case "cstr":
      for (e = 0, t = ""; (s = Wr(this, this.l + e++)) !== 0; ) i.push(In(s));
      t = i.join("");
      break;
    case "_wstr":
      for (e = 0, t = ""; (s = an(this, this.l + e)) !== 0; )
        i.push(In(s)), e += 2;
      e += 2, t = i.join("");
      break;
    case "dbcs-cont":
      for (t = "", o = this.l, l = 0; l < e; ++l) {
        if (this.lens && this.lens.indexOf(o) !== -1)
          return s = Wr(this, o), this.l = o + 1, f = on.call(this, e - l, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(In(an(this, o))), o += 2;
      }
      t = i.join(""), e *= 2;
      break;
    case "cpstr":
    case "sbcs-cont":
      for (t = "", o = this.l, l = 0; l != e; ++l) {
        if (this.lens && this.lens.indexOf(o) !== -1)
          return s = Wr(this, o), this.l = o + 1, f = on.call(this, e - l, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(In(Wr(this, o))), o += 1;
      }
      t = i.join("");
      break;
    default:
      switch (e) {
        case 1:
          return n = Wr(this, this.l), this.l++, n;
        case 2:
          return n = (r === "i" ? _l : an)(this, this.l), this.l += 2, n;
        case 4:
        case -4:
          return r === "i" || !(this[this.l + 3] & 128) ? (n = (e > 0 ? Er : Tl)(this, this.l), this.l += 4, n) : (a = Ot(this, this.l), this.l += 4, a);
        case 8:
        case -8:
          if (r === "f")
            return e == 8 ? a = Xn(this, this.l) : a = Xn([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0), this.l += 8, a;
          e = 8;
        case 16:
          t = mi(this, this.l, e);
          break;
      }
  }
  return this.l += e, t;
}
var El = function(e, r, t) {
  e[t] = r & 255, e[t + 1] = r >>> 8 & 255, e[t + 2] = r >>> 16 & 255, e[t + 3] = r >>> 24 & 255;
}, wl = function(e, r, t) {
  e[t] = r & 255, e[t + 1] = r >> 8 & 255, e[t + 2] = r >> 16 & 255, e[t + 3] = r >> 24 & 255;
}, Sl = function(e, r, t) {
  e[t] = r & 255, e[t + 1] = r >>> 8 & 255;
};
function Al(e, r, t) {
  var n = 0, a = 0;
  if (t === "dbcs") {
    for (a = 0; a != r.length; ++a) Sl(this, r.charCodeAt(a), this.l + 2 * a);
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
      n = 4, El(this, r, this.l);
      break;
    case 8:
      if (n = 8, t === "f") {
        gl(this, r, this.l);
        break;
      }
    case 16:
      break;
    case -4:
      n = 4, wl(this, r, this.l);
      break;
  }
  return this.l += n, this;
}
function Di(e, r) {
  var t = mi(this, this.l, e.length >> 1);
  if (t !== e) throw new Error(r + "Expected " + e + " saw " + t);
  this.l += e.length >> 1;
}
function Ct(e, r) {
  e.l = r, e.read_shift = /*::(*/
  on, e.chk = Di, e.write_shift = Al;
}
function Jt(e, r) {
  e.l += r;
}
function U(e) {
  var r = Sr(e);
  return Ct(r, 0), r;
}
function At() {
  var e = [], r = Ie ? 256 : 2048, t = function(o) {
    var c = U(o);
    return Ct(c, 0), c;
  }, n = t(r), a = function() {
    n && (n.length > n.l && (n = n.slice(0, n.l), n.l = n.length), n.length > 0 && e.push(n), n = null);
  }, i = function(o) {
    return n && o < n.length - n.l ? n : (a(), n = t(Math.max(o + 1, r)));
  }, s = function() {
    return a(), ot(e);
  }, f = function(o) {
    a(), n = o, n.l == null && (n.l = n.length), i(r);
  };
  return { next: i, push: f, end: s, _bufs: e };
}
function G(e, r, t, n) {
  var a = +r, i;
  if (!isNaN(a)) {
    n || (n = gd[a].p || (t || []).length || 0), i = 1 + (a >= 128 ? 1 : 0) + 1, n >= 128 && ++i, n >= 16384 && ++i, n >= 2097152 && ++i;
    var s = e.next(i);
    a <= 127 ? s.write_shift(1, a) : (s.write_shift(1, (a & 127) + 128), s.write_shift(1, a >> 7));
    for (var f = 0; f != 4; ++f)
      if (n >= 128)
        s.write_shift(1, (n & 127) + 128), n >>= 7;
      else {
        s.write_shift(1, n);
        break;
      }
    /*:: length != null &&*/
    n > 0 && $a(t) && e.push(t);
  }
}
function cn(e, r, t) {
  var n = Ft(e);
  if (r.s ? (n.cRel && (n.c += r.s.c), n.rRel && (n.r += r.s.r)) : (n.cRel && (n.c += r.c), n.rRel && (n.r += r.r)), !t || t.biff < 12) {
    for (; n.c >= 256; ) n.c -= 256;
    for (; n.r >= 65536; ) n.r -= 65536;
  }
  return n;
}
function D0(e, r, t) {
  var n = Ft(e);
  return n.s = cn(n.s, r.s, t), n.e = cn(n.e, r.s, t), n;
}
function un(e, r) {
  if (e.cRel && e.c < 0)
    for (e = Ft(e); e.c < 0; ) e.c += r > 8 ? 16384 : 256;
  if (e.rRel && e.r < 0)
    for (e = Ft(e); e.r < 0; ) e.r += r > 8 ? 1048576 : r > 5 ? 65536 : 16384;
  var t = Be(e);
  return !e.cRel && e.cRel != null && (t = kl(t)), !e.rRel && e.rRel != null && (t = yl(t)), t;
}
function _a(e, r) {
  return e.s.r == 0 && !e.s.rRel && e.e.r == (r.biff >= 12 ? 1048575 : r.biff >= 8 ? 65536 : 16384) && !e.e.rRel ? (e.s.cRel ? "" : "$") + xt(e.s.c) + ":" + (e.e.cRel ? "" : "$") + xt(e.e.c) : e.s.c == 0 && !e.s.cRel && e.e.c == (r.biff >= 12 ? 16383 : 255) && !e.e.cRel ? (e.s.rRel ? "" : "$") + ut(e.s.r) + ":" + (e.e.rRel ? "" : "$") + ut(e.e.r) : un(e.s, r.biff) + ":" + un(e.e, r.biff);
}
function Ha(e) {
  return parseInt(Fl(e), 10) - 1;
}
function ut(e) {
  return "" + (e + 1);
}
function yl(e) {
  return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2");
}
function Fl(e) {
  return e.replace(/\$(\d+)$/, "$1");
}
function Va(e) {
  for (var r = Cl(e), t = 0, n = 0; n !== r.length; ++n) t = 26 * t + r.charCodeAt(n) - 64;
  return t - 1;
}
function xt(e) {
  if (e < 0) throw new Error("invalid column " + e);
  var r = "";
  for (++e; e; e = Math.floor((e - 1) / 26)) r = String.fromCharCode((e - 1) % 26 + 65) + r;
  return r;
}
function kl(e) {
  return e.replace(/^([A-Z])/, "$$$1");
}
function Cl(e) {
  return e.replace(/^\$([A-Z])/, "$1");
}
function Dl(e) {
  return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",");
}
function it(e) {
  for (var r = 0, t = 0, n = 0; n < e.length; ++n) {
    var a = e.charCodeAt(n);
    a >= 48 && a <= 57 ? r = 10 * r + (a - 48) : a >= 65 && a <= 90 && (t = 26 * t + (a - 64));
  }
  return { c: t - 1, r: r - 1 };
}
function Be(e) {
  for (var r = e.c + 1, t = ""; r; r = (r - 1) / 26 | 0) t = String.fromCharCode((r - 1) % 26 + 65) + t;
  return t + (e.r + 1);
}
function It(e) {
  var r = e.indexOf(":");
  return r == -1 ? { s: it(e), e: it(e) } : { s: it(e.slice(0, r)), e: it(e.slice(r + 1)) };
}
function Qe(e, r) {
  return typeof r > "u" || typeof r == "number" ? Qe(e.s, e.e) : (typeof e != "string" && (e = Be(e)), typeof r != "string" && (r = Be(r)), e == r ? e : e + ":" + r);
}
function $e(e) {
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
function O0(e, r) {
  var t = e.t == "d" && r instanceof Date;
  if (e.z != null) try {
    return e.w = vr(e.z, t ? yt(r) : r);
  } catch {
  }
  try {
    return e.w = vr((e.XF || {}).numFmtId || (t ? 14 : 0), t ? yt(r) : r);
  } catch {
    return "" + r;
  }
}
function ar(e, r, t) {
  return e == null || e.t == null || e.t == "z" ? "" : e.w !== void 0 ? e.w : (e.t == "d" && !e.z && t && t.dateNF && (e.z = t.dateNF), e.t == "e" ? yn[e.v] || e.v : r == null ? O0(e, e.v) : O0(e, r));
}
function Fr(e, r) {
  var t = r && r.sheet ? r.sheet : "Sheet1", n = {};
  return n[t] = e, { SheetNames: [t], Sheets: n };
}
function Oi(e, r, t) {
  var n = t || {}, a = e ? Array.isArray(e) : n.dense, i = e || (a ? [] : {}), s = 0, f = 0;
  if (i && n.origin != null) {
    if (typeof n.origin == "number") s = n.origin;
    else {
      var l = typeof n.origin == "string" ? it(n.origin) : n.origin;
      s = l.r, f = l.c;
    }
    i["!ref"] || (i["!ref"] = "A1:A1");
  }
  var o = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } };
  if (i["!ref"]) {
    var c = $e(i["!ref"]);
    o.s.c = c.s.c, o.s.r = c.s.r, o.e.c = Math.max(o.e.c, c.e.c), o.e.r = Math.max(o.e.r, c.e.r), s == -1 && (o.e.r = s = c.e.r + 1);
  }
  for (var p = 0; p != r.length; ++p)
    if (r[p]) {
      if (!Array.isArray(r[p])) throw new Error("aoa_to_sheet expects an array of arrays");
      for (var v = 0; v != r[p].length; ++v)
        if (!(typeof r[p][v] > "u")) {
          var h = { v: r[p][v] }, m = s + p, u = f + v;
          if (o.s.r > m && (o.s.r = m), o.s.c > u && (o.s.c = u), o.e.r < m && (o.e.r = m), o.e.c < u && (o.e.c = u), r[p][v] && typeof r[p][v] == "object" && !Array.isArray(r[p][v]) && !(r[p][v] instanceof Date)) h = r[p][v];
          else if (Array.isArray(h.v) && (h.f = r[p][v][1], h.v = h.v[0]), h.v === null)
            if (h.f) h.t = "n";
            else if (n.nullError)
              h.t = "e", h.v = 0;
            else if (n.sheetStubs) h.t = "z";
            else continue;
          else typeof h.v == "number" ? h.t = "n" : typeof h.v == "boolean" ? h.t = "b" : h.v instanceof Date ? (h.z = n.dateNF || Ye[14], n.cellDates ? (h.t = "d", h.w = vr(h.z, yt(h.v))) : (h.t = "n", h.v = yt(h.v), h.w = vr(h.z, h.v))) : h.t = "s";
          if (a)
            i[m] || (i[m] = []), i[m][u] && i[m][u].z && (h.z = i[m][u].z), i[m][u] = h;
          else {
            var d = Be({ c: u, r: m });
            i[d] && i[d].z && (h.z = i[d].z), i[d] = h;
          }
        }
    }
  return o.s.c < 1e7 && (i["!ref"] = Qe(o)), i;
}
function Kr(e, r) {
  return Oi(null, e, r);
}
function Ol(e) {
  return e.read_shift(4, "i");
}
function Gt(e, r) {
  return r || (r = U(4)), r.write_shift(4, e), r;
}
function vt(e) {
  var r = e.read_shift(4);
  return r === 0 ? "" : e.read_shift(r, "dbcs");
}
function st(e, r) {
  var t = !1;
  return r == null && (t = !0, r = U(4 + 2 * e.length)), r.write_shift(4, e.length), e.length > 0 && r.write_shift(0, e, "dbcs"), t ? r.slice(0, r.l) : r;
}
function Il(e) {
  return { ich: e.read_shift(2), ifnt: e.read_shift(2) };
}
function Rl(e, r) {
  return r || (r = U(4)), r.write_shift(2, 0), r.write_shift(2, 0), r;
}
function Ga(e, r) {
  var t = e.l, n = e.read_shift(1), a = vt(e), i = [], s = { t: a, h: a };
  if (n & 1) {
    for (var f = e.read_shift(4), l = 0; l != f; ++l) i.push(Il(e));
    s.r = i;
  } else s.r = [{ ich: 0, ifnt: 0 }];
  return e.l = t + r, s;
}
function Nl(e, r) {
  var t = !1;
  return r == null && (t = !0, r = U(15 + 4 * e.t.length)), r.write_shift(1, 0), st(e.t, r), t ? r.slice(0, r.l) : r;
}
var Pl = Ga;
function Ll(e, r) {
  var t = !1;
  return r == null && (t = !0, r = U(23 + 4 * e.t.length)), r.write_shift(1, 1), st(e.t, r), r.write_shift(4, 1), Rl({}, r), t ? r.slice(0, r.l) : r;
}
function Mt(e) {
  var r = e.read_shift(4), t = e.read_shift(2);
  return t += e.read_shift(1) << 16, e.l++, { c: r, iStyleRef: t };
}
function kr(e, r) {
  return r == null && (r = U(8)), r.write_shift(-4, e.c), r.write_shift(3, e.iStyleRef || e.s), r.write_shift(1, 0), r;
}
function Cr(e) {
  var r = e.read_shift(2);
  return r += e.read_shift(1) << 16, e.l++, { c: -1, iStyleRef: r };
}
function Dr(e, r) {
  return r == null && (r = U(4)), r.write_shift(3, e.iStyleRef || e.s), r.write_shift(1, 0), r;
}
var Ml = vt, Ii = st;
function ja(e) {
  var r = e.read_shift(4);
  return r === 0 || r === 4294967295 ? "" : e.read_shift(r, "dbcs");
}
function zn(e, r) {
  var t = !1;
  return r == null && (t = !0, r = U(127)), r.write_shift(4, e.length > 0 ? e.length : 4294967295), e.length > 0 && r.write_shift(0, e, "dbcs"), t ? r.slice(0, r.l) : r;
}
var Bl = vt, Ia = ja, Xa = zn;
function Ri(e) {
  var r = e.slice(e.l, e.l + 4), t = r[0] & 1, n = r[0] & 2;
  e.l += 4;
  var a = n === 0 ? Xn([0, 0, 0, 0, r[0] & 252, r[1], r[2], r[3]], 0) : Er(r, 0) >> 2;
  return t ? a / 100 : a;
}
function Ni(e, r) {
  r == null && (r = U(4));
  var t = 0, n = 0, a = e * 100;
  if (e == (e | 0) && e >= -536870912 && e < 1 << 29 ? n = 1 : a == (a | 0) && a >= -536870912 && a < 1 << 29 && (n = 1, t = 1), n) r.write_shift(-4, ((t ? a : e) << 2) + (t + 2));
  else throw new Error("unsupported RkNumber " + e);
}
function Pi(e) {
  var r = { s: {}, e: {} };
  return r.s.r = e.read_shift(4), r.e.r = e.read_shift(4), r.s.c = e.read_shift(4), r.e.c = e.read_shift(4), r;
}
function bl(e, r) {
  return r || (r = U(16)), r.write_shift(4, e.s.r), r.write_shift(4, e.e.r), r.write_shift(4, e.s.c), r.write_shift(4, e.e.c), r;
}
var Or = Pi, Jr = bl;
function Zr(e) {
  if (e.length - e.l < 8) throw "XLS Xnum Buffer underflow";
  return e.read_shift(8, "f");
}
function Ar(e, r) {
  return (r || U(8)).write_shift(8, e, "f");
}
function Ul(e) {
  var r = {}, t = e.read_shift(1), n = t >>> 1, a = e.read_shift(1), i = e.read_shift(2, "i"), s = e.read_shift(1), f = e.read_shift(1), l = e.read_shift(1);
  switch (e.l++, n) {
    case 0:
      r.auto = 1;
      break;
    case 1:
      r.index = a;
      var o = Yl[a];
      o && (r.rgb = $0(o));
      break;
    case 2:
      r.rgb = $0([s, f, l]);
      break;
    case 3:
      r.theme = a;
      break;
  }
  return i != 0 && (r.tint = i > 0 ? i / 32767 : i / 32768), r;
}
function Yn(e, r) {
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
function Wl(e) {
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
function $l(e, r) {
  r || (r = U(2));
  var t = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 : 0);
  return r.write_shift(1, t), r.write_shift(1, 0), r;
}
var Li = 2, kt = 3, Ln = 11, Kn = 19, Mn = 64, Hl = 65, Vl = 71, Gl = 4108, jl = 4126, lt = 80, I0 = {
  /*::[*/
  1: { n: "CodePage", t: Li },
  /*::[*/
  2: { n: "Category", t: lt },
  /*::[*/
  3: { n: "PresentationFormat", t: lt },
  /*::[*/
  4: { n: "ByteCount", t: kt },
  /*::[*/
  5: { n: "LineCount", t: kt },
  /*::[*/
  6: { n: "ParagraphCount", t: kt },
  /*::[*/
  7: { n: "SlideCount", t: kt },
  /*::[*/
  8: { n: "NoteCount", t: kt },
  /*::[*/
  9: { n: "HiddenCount", t: kt },
  /*::[*/
  10: { n: "MultimediaClipCount", t: kt },
  /*::[*/
  11: { n: "ScaleCrop", t: Ln },
  /*::[*/
  12: {
    n: "HeadingPairs",
    t: Gl
    /* VT_VECTOR | VT_VARIANT */
  },
  /*::[*/
  13: {
    n: "TitlesOfParts",
    t: jl
    /* VT_VECTOR | VT_LPSTR */
  },
  /*::[*/
  14: { n: "Manager", t: lt },
  /*::[*/
  15: { n: "Company", t: lt },
  /*::[*/
  16: { n: "LinksUpToDate", t: Ln },
  /*::[*/
  17: { n: "CharacterCount", t: kt },
  /*::[*/
  19: { n: "SharedDoc", t: Ln },
  /*::[*/
  22: { n: "HyperlinksChanged", t: Ln },
  /*::[*/
  23: { n: "AppVersion", t: kt, p: "version" },
  /*::[*/
  24: { n: "DigSig", t: Hl },
  /*::[*/
  26: { n: "ContentType", t: lt },
  /*::[*/
  27: { n: "ContentStatus", t: lt },
  /*::[*/
  28: { n: "Language", t: lt },
  /*::[*/
  29: { n: "Version", t: lt },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: Kn },
  /*::[*/
  2147483651: { n: "Behavior", t: Kn },
  /*::[*/
  1919054434: {}
}, R0 = {
  /*::[*/
  1: { n: "CodePage", t: Li },
  /*::[*/
  2: { n: "Title", t: lt },
  /*::[*/
  3: { n: "Subject", t: lt },
  /*::[*/
  4: { n: "Author", t: lt },
  /*::[*/
  5: { n: "Keywords", t: lt },
  /*::[*/
  6: { n: "Comments", t: lt },
  /*::[*/
  7: { n: "Template", t: lt },
  /*::[*/
  8: { n: "LastAuthor", t: lt },
  /*::[*/
  9: { n: "RevNumber", t: lt },
  /*::[*/
  10: { n: "EditTime", t: Mn },
  /*::[*/
  11: { n: "LastPrinted", t: Mn },
  /*::[*/
  12: { n: "CreatedDate", t: Mn },
  /*::[*/
  13: { n: "ModifiedDate", t: Mn },
  /*::[*/
  14: { n: "PageCount", t: kt },
  /*::[*/
  15: { n: "WordCount", t: kt },
  /*::[*/
  16: { n: "CharCount", t: kt },
  /*::[*/
  17: { n: "Thumbnail", t: Vl },
  /*::[*/
  18: { n: "Application", t: lt },
  /*::[*/
  19: { n: "DocSecurity", t: kt },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: Kn },
  /*::[*/
  2147483651: { n: "Behavior", t: Kn },
  /*::[*/
  1919054434: {}
};
function Xl(e) {
  return e.map(function(r) {
    return [r >> 16 & 255, r >> 8 & 255, r & 255];
  });
}
var zl = /* @__PURE__ */ Xl([
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
]), Yl = /* @__PURE__ */ Ft(zl), yn = {
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
}, Kl = {
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
}, Bn = {
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
function Mi() {
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
function Bi(e, r) {
  var t = il(Kl), n = [], a;
  n[n.length] = et, n[n.length] = re("Types", null, {
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
  ].map(function(l) {
    return re("Default", null, { Extension: l[0], ContentType: l[1] });
  }));
  var i = function(l) {
    e[l] && e[l].length > 0 && (a = e[l][0], n[n.length] = re("Override", null, {
      PartName: (a[0] == "/" ? "" : "/") + a,
      ContentType: Bn[l][r.bookType] || Bn[l].xlsx
    }));
  }, s = function(l) {
    (e[l] || []).forEach(function(o) {
      n[n.length] = re("Override", null, {
        PartName: (o[0] == "/" ? "" : "/") + o,
        ContentType: Bn[l][r.bookType] || Bn[l].xlsx
      });
    });
  }, f = function(l) {
    (e[l] || []).forEach(function(o) {
      n[n.length] = re("Override", null, {
        PartName: (o[0] == "/" ? "" : "/") + o,
        ContentType: t[l][0]
      });
    });
  };
  return i("workbooks"), s("sheets"), s("charts"), f("themes"), ["strs", "styles"].forEach(i), ["coreprops", "extprops", "custprops"].forEach(f), f("vba"), f("comments"), f("threadedcomments"), f("drawings"), s("metadata"), f("people"), n.length > 2 && (n[n.length] = "</Types>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var Oe = {
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
function bi(e) {
  var r = e.lastIndexOf("/");
  return e.slice(0, r + 1) + "_rels/" + e.slice(r + 1) + ".rels";
}
function Vr(e) {
  var r = [et, re("Relationships", null, {
    //'xmlns:ns0': XMLNS.RELS,
    xmlns: at.RELS
  })];
  return ht(e["!id"]).forEach(function(t) {
    r[r.length] = re("Relationship", null, e["!id"][t]);
  }), r.length > 2 && (r[r.length] = "</Relationships>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Le(e, r, t, n, a, i) {
  if (a || (a = {}), e["!id"] || (e["!id"] = {}), e["!idx"] || (e["!idx"] = 1), r < 0) for (r = e["!idx"]; e["!id"]["rId" + r]; ++r)
    ;
  if (e["!idx"] = r + 1, a.Id = "rId" + r, a.Type = n, a.Target = t, [Oe.HLINK, Oe.XPATH, Oe.XMISS].indexOf(a.Type) > -1 && (a.TargetMode = "External"), e["!id"][a.Id]) throw new Error("Cannot rewrite rId " + r);
  return e["!id"][a.Id] = a, e[("/" + a.Target).replace("//", "/")] = a, r;
}
function Jl(e) {
  var r = [et];
  r.push(`<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
`), r.push(`  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
`);
  for (var t = 0; t < e.length; ++t) r.push('  <manifest:file-entry manifest:full-path="' + e[t][0] + '" manifest:media-type="' + e[t][1] + `"/>
`);
  return r.push("</manifest:manifest>"), r.join("");
}
function N0(e, r, t) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (t || "odf") + "#" + r + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function Zl(e, r) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + r + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function ql(e) {
  var r = [et];
  r.push(`<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
`);
  for (var t = 0; t != e.length; ++t)
    r.push(N0(e[t][0], e[t][1])), r.push(Zl("", e[t][0]));
  return r.push(N0("", "Document", "pkg")), r.push("</rdf:RDF>"), r.join("");
}
function Ui() {
  return '<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS ' + Wn.version + "</meta:generator></office:meta></office:document-meta>";
}
var wr = [
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
function Ta(e, r, t, n, a) {
  a[e] != null || r == null || r === "" || (a[e] = r, r = Me(r), n[n.length] = t ? re(e, r, t) : ct(e, r));
}
function Wi(e, r) {
  var t = r || {}, n = [et, re("cp:coreProperties", null, {
    //'xmlns': XMLNS.CORE_PROPS,
    "xmlns:cp": at.CORE_PROPS,
    "xmlns:dc": at.dc,
    "xmlns:dcterms": at.dcterms,
    "xmlns:dcmitype": at.dcmitype,
    "xmlns:xsi": at.xsi
  })], a = {};
  if (!e && !t.Props) return n.join("");
  e && (e.CreatedDate != null && Ta("dcterms:created", typeof e.CreatedDate == "string" ? e.CreatedDate : Oa(e.CreatedDate, t.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a), e.ModifiedDate != null && Ta("dcterms:modified", typeof e.ModifiedDate == "string" ? e.ModifiedDate : Oa(e.ModifiedDate, t.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a));
  for (var i = 0; i != wr.length; ++i) {
    var s = wr[i], f = t.Props && t.Props[s[1]] != null ? t.Props[s[1]] : e ? e[s[1]] : null;
    f === !0 ? f = "1" : f === !1 ? f = "0" : typeof f == "number" && (f = String(f)), f != null && Ta(s[0], f, null, n, a);
  }
  return n.length > 2 && (n[n.length] = "</cp:coreProperties>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var Gr = [
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
], $i = [
  "Worksheets",
  "SheetNames",
  "NamedRanges",
  "DefinedNames",
  "Chartsheets",
  "ChartNames"
];
function Hi(e) {
  var r = [], t = re;
  return e || (e = {}), e.Application = "SheetJS", r[r.length] = et, r[r.length] = re("Properties", null, {
    xmlns: at.EXT_PROPS,
    "xmlns:vt": at.vt
  }), Gr.forEach(function(n) {
    if (e[n[1]] !== void 0) {
      var a;
      switch (n[2]) {
        case "string":
          a = Me(String(e[n[1]]));
          break;
        case "bool":
          a = e[n[1]] ? "true" : "false";
          break;
      }
      a !== void 0 && (r[r.length] = t(n[0], a));
    }
  }), r[r.length] = t("HeadingPairs", t("vt:vector", t("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + t("vt:variant", t("vt:i4", String(e.Worksheets))), { size: 2, baseType: "variant" })), r[r.length] = t("TitlesOfParts", t("vt:vector", e.SheetNames.map(function(n) {
    return "<vt:lpstr>" + Me(n) + "</vt:lpstr>";
  }).join(""), { size: e.Worksheets, baseType: "lpstr" })), r.length > 2 && (r[r.length] = "</Properties>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Vi(e) {
  var r = [et, re("Properties", null, {
    xmlns: at.CUST_PROPS,
    "xmlns:vt": at.vt
  })];
  if (!e) return r.join("");
  var t = 1;
  return ht(e).forEach(function(a) {
    ++t, r[r.length] = re("property", pl(e[a]), {
      fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: t,
      name: Me(a)
    });
  }), r.length > 2 && (r[r.length] = "</Properties>", r[1] = r[1].replace("/>", ">")), r.join("");
}
var P0 = {
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
function Ql(e, r) {
  var t = [];
  return ht(P0).map(function(n) {
    for (var a = 0; a < wr.length; ++a) if (wr[a][1] == n) return wr[a];
    for (a = 0; a < Gr.length; ++a) if (Gr[a][1] == n) return Gr[a];
    throw n;
  }).forEach(function(n) {
    if (e[n[1]] != null) {
      var a = r && r.Props && r.Props[n[1]] != null ? r.Props[n[1]] : e[n[1]];
      switch (n[2]) {
        case "date":
          a = new Date(a).toISOString().replace(/\.\d*Z/, "Z");
          break;
      }
      typeof a == "number" ? a = String(a) : a === !0 || a === !1 ? a = a ? "1" : "0" : a instanceof Date && (a = new Date(a).toISOString().replace(/\.\d*Z/, "")), t.push(ct(P0[n[1]] || n[1], a));
    }
  }), re("DocumentProperties", t.join(""), { xmlns: Dt.o });
}
function eo(e, r) {
  var t = ["Worksheets", "SheetNames"], n = "CustomDocumentProperties", a = [];
  return e && ht(e).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(e, i)) {
      for (var s = 0; s < wr.length; ++s) if (i == wr[s][1]) return;
      for (s = 0; s < Gr.length; ++s) if (i == Gr[s][1]) return;
      for (s = 0; s < t.length; ++s) if (i == t[s]) return;
      var f = e[i], l = "string";
      typeof f == "number" ? (l = "float", f = String(f)) : f === !0 || f === !1 ? (l = "boolean", f = f ? "1" : "0") : f = String(f), a.push(re(E0(i), f, { "dt:dt": l }));
    }
  }), r && ht(r).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(r, i) && !(e && Object.prototype.hasOwnProperty.call(e, i))) {
      var s = r[i], f = "string";
      typeof s == "number" ? (f = "float", s = String(s)) : s === !0 || s === !1 ? (f = "boolean", s = s ? "1" : "0") : s instanceof Date ? (f = "dateTime.tz", s = s.toISOString()) : s = String(s), a.push(re(E0(i), s, { "dt:dt": f }));
    }
  }), "<" + n + ' xmlns="' + Dt.o + '">' + a.join("") + "</" + n + ">";
}
function to(e) {
  var r = typeof e == "string" ? new Date(Date.parse(e)) : e, t = r.getTime() / 1e3 + 11644473600, n = t % Math.pow(2, 32), a = (t - n) / Math.pow(2, 32);
  n *= 1e7, a *= 1e7;
  var i = n / Math.pow(2, 32) | 0;
  i > 0 && (n = n % Math.pow(2, 32), a += i);
  var s = U(8);
  return s.write_shift(4, n), s.write_shift(4, a), s;
}
function L0(e, r) {
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
      n = to(r);
      break;
    case 31:
    case 80:
      for (n = U(4 + 2 * (r.length + 1) + (r.length % 2 ? 0 : 2)), n.write_shift(4, r.length + 1), n.write_shift(0, r, "dbcs"); n.l != n.length; ) n.write_shift(1, 0);
      break;
    default:
      throw new Error("TypedPropertyValue unrecognized type " + e + " " + r);
  }
  return ot([t, n]);
}
var Gi = ["CodePage", "Thumbnail", "_PID_LINKBASE", "_PID_HLINKS", "SystemIdentifier", "FMTID"];
function ro(e) {
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
function M0(e, r, t) {
  var n = U(8), a = [], i = [], s = 8, f = 0, l = U(8), o = U(8);
  if (l.write_shift(4, 2), l.write_shift(4, 1200), o.write_shift(4, 1), i.push(l), a.push(o), s += 8 + l.length, !r) {
    o = U(8), o.write_shift(4, 0), a.unshift(o);
    var c = [U(4)];
    for (c[0].write_shift(4, e.length), f = 0; f < e.length; ++f) {
      var p = e[f][0];
      for (l = U(8 + 2 * (p.length + 1) + (p.length % 2 ? 0 : 2)), l.write_shift(4, f + 2), l.write_shift(4, p.length + 1), l.write_shift(0, p, "dbcs"); l.l != l.length; ) l.write_shift(1, 0);
      c.push(l);
    }
    l = ot(c), i.unshift(l), s += 8 + l.length;
  }
  for (f = 0; f < e.length; ++f)
    if (!(r && !r[e[f][0]]) && !(Gi.indexOf(e[f][0]) > -1 || $i.indexOf(e[f][0]) > -1) && e[f][1] != null) {
      var v = e[f][1], h = 0;
      if (r) {
        h = +r[e[f][0]];
        var m = t[h];
        if (m.p == "version" && typeof v == "string") {
          var u = v.split(".");
          v = (+u[0] << 16) + (+u[1] || 0);
        }
        l = L0(m.t, v);
      } else {
        var d = ro(v);
        d == -1 && (d = 31, v = String(v)), l = L0(d, v);
      }
      i.push(l), o = U(8), o.write_shift(4, r ? h : 2 + f), a.push(o), s += 8 + l.length;
    }
  var A = 8 * (i.length + 1);
  for (f = 0; f < i.length; ++f)
    a[f].write_shift(4, A), A += i[f].length;
  return n.write_shift(4, s), n.write_shift(4, i.length), ot([n].concat(a).concat(i));
}
function B0(e, r, t, n, a, i) {
  var s = U(a ? 68 : 48), f = [s];
  s.write_shift(2, 65534), s.write_shift(2, 0), s.write_shift(4, 842412599), s.write_shift(16, be.utils.consts.HEADER_CLSID, "hex"), s.write_shift(4, a ? 2 : 1), s.write_shift(16, r, "hex"), s.write_shift(4, a ? 68 : 48);
  var l = M0(e, t, n);
  if (f.push(l), a) {
    var o = M0(a, null, null);
    s.write_shift(16, i, "hex"), s.write_shift(4, 68 + l.length), f.push(o);
  }
  return ot(f);
}
function no(e, r) {
  r || (r = U(e));
  for (var t = 0; t < e; ++t) r.write_shift(1, 0);
  return r;
}
function ao(e, r) {
  return e.read_shift(r) === 1;
}
function _t(e, r) {
  return r || (r = U(2)), r.write_shift(2, +!!e), r;
}
function ji(e) {
  return e.read_shift(2, "u");
}
function Lt(e, r) {
  return r || (r = U(2)), r.write_shift(2, e), r;
}
function Xi(e, r, t) {
  return t || (t = U(2)), t.write_shift(1, r == "e" ? +e : +!!e), t.write_shift(1, r == "e" ? 1 : 0), t;
}
function zi(e, r, t) {
  var n = e.read_shift(t && t.biff >= 12 ? 2 : 1), a = "sbcs-cont";
  if (t && t.biff >= 8, !t || t.biff == 8) {
    var i = e.read_shift(1);
    i && (a = "dbcs-cont");
  } else t.biff == 12 && (a = "wstr");
  t.biff >= 2 && t.biff <= 5 && (a = "cpstr");
  var s = n ? e.read_shift(n, a) : "";
  return s;
}
function io(e) {
  var r = e.t || "", t = U(3);
  t.write_shift(2, r.length), t.write_shift(1, 1);
  var n = U(2 * r.length);
  n.write_shift(2 * r.length, r, "utf16le");
  var a = [t, n];
  return ot(a);
}
function so(e, r, t) {
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
  return n === 0 ? (e.l++, "") : so(e, n, t);
}
function lo(e, r, t) {
  if (t.biff > 5) return fo(e, r, t);
  var n = e.read_shift(1);
  return n === 0 ? (e.l++, "") : e.read_shift(n, t.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont");
}
function Yi(e, r, t) {
  return t || (t = U(3 + 2 * e.length)), t.write_shift(2, e.length), t.write_shift(1, 1), t.write_shift(31, e, "utf16le"), t;
}
function b0(e, r) {
  r || (r = U(6 + e.length * 2)), r.write_shift(4, 1 + e.length);
  for (var t = 0; t < e.length; ++t) r.write_shift(2, e.charCodeAt(t));
  return r.write_shift(2, 0), r;
}
function oo(e) {
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
    n = n.slice(1), b0(n, r);
  else if (i & 2) {
    for (s = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), t = 0; t < s.length; ++t) r.write_shift(1, parseInt(s[t], 16));
    var f = a > -1 ? n.slice(0, a) : n;
    for (r.write_shift(4, 2 * (f.length + 1)), t = 0; t < f.length; ++t) r.write_shift(2, f.charCodeAt(t));
    r.write_shift(2, 0), i & 8 && b0(a > -1 ? n.slice(a + 1) : "", r);
  } else {
    for (s = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" "), t = 0; t < s.length; ++t) r.write_shift(1, parseInt(s[t], 16));
    for (var l = 0; n.slice(l * 3, l * 3 + 3) == "../" || n.slice(l * 3, l * 3 + 3) == "..\\"; ) ++l;
    for (r.write_shift(2, l), r.write_shift(4, n.length - 3 * l + 1), t = 0; t < n.length - 3 * l; ++t) r.write_shift(1, n.charCodeAt(t + 3 * l) & 255);
    for (r.write_shift(1, 0), r.write_shift(2, 65535), r.write_shift(2, 57005), t = 0; t < 6; ++t) r.write_shift(4, 0);
  }
  return r.slice(0, r.l);
}
function yr(e, r, t, n) {
  return n || (n = U(6)), n.write_shift(2, e), n.write_shift(2, r), n.write_shift(2, t || 0), n;
}
function co(e, r, t) {
  var n = t.biff > 8 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n, "i"), s = e.read_shift(n, "i");
  return [a, i, s];
}
function uo(e) {
  var r = e.read_shift(2), t = e.read_shift(2), n = e.read_shift(2), a = e.read_shift(2);
  return { s: { c: n, r }, e: { c: a, r: t } };
}
function Ki(e, r) {
  return r || (r = U(8)), r.write_shift(2, e.s.r), r.write_shift(2, e.e.r), r.write_shift(2, e.s.c), r.write_shift(2, e.e.c), r;
}
function za(e, r, t) {
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
function ho(e, r) {
  var t = !r || r.biff == 8, n = U(t ? 112 : 54);
  for (n.write_shift(r.biff == 8 ? 2 : 1, 7), t && n.write_shift(1, 0), n.write_shift(4, 859007059), n.write_shift(4, 5458548 | (t ? 0 : 536870912)); n.l < n.length; ) n.write_shift(1, t ? 0 : 32);
  return n;
}
function xo(e, r) {
  var t = !r || r.biff >= 8 ? 2 : 1, n = U(8 + t * e.name.length);
  n.write_shift(4, e.pos), n.write_shift(1, e.hs || 0), n.write_shift(1, e.dt), n.write_shift(1, e.name.length), r.biff >= 8 && n.write_shift(1, 1), n.write_shift(t * e.name.length, e.name, r.biff < 8 ? "sbcs" : "utf16le");
  var a = n.slice(0, n.l);
  return a.l = n.l, a;
}
function vo(e, r) {
  var t = U(8);
  t.write_shift(4, e.Count), t.write_shift(4, e.Unique);
  for (var n = [], a = 0; a < e.length; ++a) n[a] = io(e[a]);
  var i = ot([t].concat(n));
  return i.parts = [t.length].concat(n.map(function(s) {
    return s.length;
  })), i;
}
function po() {
  var e = U(18);
  return e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 29280), e.write_shift(2, 17600), e.write_shift(2, 56), e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 1), e.write_shift(2, 500), e;
}
function mo(e) {
  var r = U(18), t = 1718;
  return e && e.RTL && (t |= 64), r.write_shift(2, t), r.write_shift(4, 0), r.write_shift(4, 64), r.write_shift(4, 0), r.write_shift(4, 0), r;
}
function go(e, r) {
  var t = e.name || "Arial", n = r && r.biff == 5, a = n ? 15 + t.length : 16 + 2 * t.length, i = U(a);
  return i.write_shift(2, e.sz * 20), i.write_shift(4, 0), i.write_shift(2, 400), i.write_shift(4, 0), i.write_shift(2, 0), i.write_shift(1, t.length), n || i.write_shift(1, 1), i.write_shift((n ? 1 : 2) * t.length, t, n ? "sbcs" : "utf16le"), i;
}
function _o(e, r, t, n) {
  var a = U(10);
  return yr(e, r, n, a), a.write_shift(4, t), a;
}
function To(e, r, t, n, a) {
  var i = !a || a.biff == 8, s = U(8 + +i + (1 + i) * t.length);
  return yr(e, r, n, s), s.write_shift(2, t.length), i && s.write_shift(1, 1), s.write_shift((1 + i) * t.length, t, i ? "utf16le" : "sbcs"), s;
}
function Eo(e, r, t, n) {
  var a = t && t.biff == 5;
  n || (n = U(a ? 3 + r.length : 5 + 2 * r.length)), n.write_shift(2, e), n.write_shift(a ? 1 : 2, r.length), a || n.write_shift(1, 1), n.write_shift((a ? 1 : 2) * r.length, r, a ? "sbcs" : "utf16le");
  var i = n.length > n.l ? n.slice(0, n.l) : n;
  return i.l == null && (i.l = i.length), i;
}
function wo(e, r) {
  var t = r.biff == 8 || !r.biff ? 4 : 2, n = U(2 * t + 6);
  return n.write_shift(t, e.s.r), n.write_shift(t, e.e.r + 1), n.write_shift(2, e.s.c), n.write_shift(2, e.e.c + 1), n.write_shift(2, 0), n;
}
function U0(e, r, t, n) {
  var a = t && t.biff == 5;
  n || (n = U(a ? 16 : 20)), n.write_shift(2, 0), e.style ? (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, 65524)) : (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, r << 4));
  var i = 0;
  return e.numFmtId > 0 && a && (i |= 1024), n.write_shift(4, i), n.write_shift(4, 0), a || n.write_shift(4, 0), n.write_shift(2, 0), n;
}
function So(e) {
  var r = U(8);
  return r.write_shift(4, 0), r.write_shift(2, 0), r.write_shift(2, 0), r;
}
function Ao(e, r, t, n, a, i) {
  var s = U(8);
  return yr(e, r, n, s), Xi(t, i, s), s;
}
function yo(e, r, t, n) {
  var a = U(14);
  return yr(e, r, n, a), Ar(t, a), a;
}
function Fo(e, r, t) {
  if (t.biff < 8) return ko(e, r, t);
  for (var n = [], a = e.l + r, i = e.read_shift(t.biff > 8 ? 4 : 2); i-- !== 0; ) n.push(co(e, t.biff > 8 ? 12 : 6, t));
  if (e.l != a) throw new Error("Bad ExternSheet: " + e.l + " != " + a);
  return n;
}
function ko(e, r, t) {
  e[e.l + 1] == 3 && e[e.l]++;
  var n = zi(e, r, t);
  return n.charCodeAt(0) == 3 ? n.slice(1) : n;
}
function Co(e) {
  var r = U(2 + e.length * 8);
  r.write_shift(2, e.length);
  for (var t = 0; t < e.length; ++t) Ki(e[t], r);
  return r;
}
function Do(e) {
  var r = U(24), t = it(e[0]);
  r.write_shift(2, t.r), r.write_shift(2, t.r), r.write_shift(2, t.c), r.write_shift(2, t.c);
  for (var n = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), a = 0; a < 16; ++a) r.write_shift(1, parseInt(n[a], 16));
  return ot([r, oo(e[1])]);
}
function Oo(e) {
  var r = e[1].Tooltip, t = U(10 + 2 * (r.length + 1));
  t.write_shift(2, 2048);
  var n = it(e[0]);
  t.write_shift(2, n.r), t.write_shift(2, n.r), t.write_shift(2, n.c), t.write_shift(2, n.c);
  for (var a = 0; a < r.length; ++a) t.write_shift(2, r.charCodeAt(a));
  return t.write_shift(2, 0), t;
}
function Io(e) {
  return e || (e = U(4)), e.write_shift(2, 1), e.write_shift(2, 1), e;
}
function Ro(e, r, t) {
  if (!t.cellStyles) return Jt(e, r);
  var n = t && t.biff >= 12 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n), s = e.read_shift(n), f = e.read_shift(n), l = e.read_shift(2);
  n == 2 && (e.l += 2);
  var o = { s: a, e: i, w: s, ixfe: f, flags: l };
  return (t.biff >= 5 || !t.biff) && (o.level = l >> 8 & 7), o;
}
function No(e, r) {
  var t = U(12);
  t.write_shift(2, r), t.write_shift(2, r), t.write_shift(2, e.width * 256), t.write_shift(2, 0);
  var n = 0;
  return e.hidden && (n |= 1), t.write_shift(1, n), n = e.level || 0, t.write_shift(1, n), t.write_shift(2, 0), t;
}
function Po(e) {
  for (var r = U(2 * e), t = 0; t < e; ++t) r.write_shift(2, t + 1);
  return r;
}
function Lo(e, r, t) {
  var n = U(15);
  return kn(n, e, r), n.write_shift(8, t, "f"), n;
}
function Mo(e, r, t) {
  var n = U(9);
  return kn(n, e, r), n.write_shift(2, t), n;
}
var Bo = /* @__PURE__ */ function() {
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
  }, r = Ma({
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
  function t(f, l) {
    var o = [], c = Sr(1);
    switch (l.type) {
      case "base64":
        c = Ht(nr(f));
        break;
      case "binary":
        c = Ht(f);
        break;
      case "buffer":
      case "array":
        c = f;
        break;
    }
    Ct(c, 0);
    var p = c.read_shift(1), v = !!(p & 136), h = !1, m = !1;
    switch (p) {
      case 2:
        break;
      case 3:
        break;
      case 48:
        h = !0, v = !0;
        break;
      case 49:
        h = !0, v = !0;
        break;
      case 131:
        break;
      case 139:
        break;
      case 140:
        m = !0;
        break;
      case 245:
        break;
      default:
        throw new Error("DBF Unsupported Version: " + p.toString(16));
    }
    var u = 0, d = 521;
    p == 2 && (u = c.read_shift(2)), c.l += 3, p != 2 && (u = c.read_shift(4)), u > 1048576 && (u = 1e6), p != 2 && (d = c.read_shift(2));
    var A = c.read_shift(2), k = l.codepage || 1252;
    p != 2 && (c.l += 16, c.read_shift(1), c[c.l] !== 0 && (k = e[c[c.l]]), c.l += 1, c.l += 2), m && (c.l += 36);
    for (var C = [], M = {}, Q = Math.min(c.length, p == 2 ? 521 : d - 10 - (h ? 264 : 0)), ce = m ? 32 : 11; c.l < Q && c[c.l] != 13; )
      switch (M = {}, M.name = $n.utils.decode(k, c.slice(c.l, c.l + ce)).replace(/[\u0000\r\n].*$/g, ""), c.l += ce, M.type = String.fromCharCode(c.read_shift(1)), p != 2 && !m && (M.offset = c.read_shift(4)), M.len = c.read_shift(1), p == 2 && (M.offset = c.read_shift(2)), M.dec = c.read_shift(1), M.name.length && C.push(M), p != 2 && (c.l += m ? 13 : 14), M.type) {
        case "B":
          (!h || M.len != 8) && l.WTF && console.log("Skipping " + M.name + ":" + M.type);
          break;
        case "G":
        case "P":
          l.WTF && console.log("Skipping " + M.name + ":" + M.type);
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
          throw new Error("Unknown Field Type: " + M.type);
      }
    if (c[c.l] !== 13 && (c.l = d - 1), c.read_shift(1) !== 13) throw new Error("DBF Terminator not found " + c.l + " " + c[c.l]);
    c.l = d;
    var O = 0, H = 0;
    for (o[0] = [], H = 0; H != C.length; ++H) o[0][H] = C[H].name;
    for (; u-- > 0; ) {
      if (c[c.l] === 42) {
        c.l += A;
        continue;
      }
      for (++c.l, o[++O] = [], H = 0, H = 0; H != C.length; ++H) {
        var D = c.slice(c.l, c.l + C[H].len);
        c.l += C[H].len, Ct(D, 0);
        var j = $n.utils.decode(k, D);
        switch (C[H].type) {
          case "C":
            j.trim().length && (o[O][H] = j.replace(/\s+$/, ""));
            break;
          case "D":
            j.length === 8 ? o[O][H] = new Date(+j.slice(0, 4), +j.slice(4, 6) - 1, +j.slice(6, 8)) : o[O][H] = j;
            break;
          case "F":
            o[O][H] = parseFloat(j.trim());
            break;
          case "+":
          case "I":
            o[O][H] = m ? D.read_shift(-4, "i") ^ 2147483648 : D.read_shift(4, "i");
            break;
          case "L":
            switch (j.trim().toUpperCase()) {
              case "Y":
              case "T":
                o[O][H] = !0;
                break;
              case "N":
              case "F":
                o[O][H] = !1;
                break;
              case "":
              case "?":
                break;
              default:
                throw new Error("DBF Unrecognized L:|" + j + "|");
            }
            break;
          case "M":
            if (!v) throw new Error("DBF Unexpected MEMO for type " + p.toString(16));
            o[O][H] = "##MEMO##" + (m ? parseInt(j.trim(), 10) : D.read_shift(4));
            break;
          case "N":
            j = j.replace(/\u0000/g, "").trim(), j && j != "." && (o[O][H] = +j || 0);
            break;
          case "@":
            o[O][H] = new Date(D.read_shift(-8, "f") - 621356832e5);
            break;
          case "T":
            o[O][H] = new Date((D.read_shift(4) - 2440588) * 864e5 + D.read_shift(4));
            break;
          case "Y":
            o[O][H] = D.read_shift(4, "i") / 1e4 + D.read_shift(4, "i") / 1e4 * Math.pow(2, 32);
            break;
          case "O":
            o[O][H] = -D.read_shift(-8, "f");
            break;
          case "B":
            if (h && C[H].len == 8) {
              o[O][H] = D.read_shift(8, "f");
              break;
            }
          case "G":
          case "P":
            D.l += C[H].len;
            break;
          case "0":
            if (C[H].name === "_NullFlags") break;
          default:
            throw new Error("DBF Unsupported data type " + C[H].type);
        }
      }
    }
    if (p != 2 && c.l < c.length && c[c.l++] != 26) throw new Error("DBF EOF Marker missing " + (c.l - 1) + " of " + c.length + " " + c[c.l - 1].toString(16));
    return l && l.sheetRows && (o = o.slice(0, l.sheetRows)), l.DBF = C, o;
  }
  function n(f, l) {
    var o = l || {};
    o.dateNF || (o.dateNF = "yyyymmdd");
    var c = Kr(t(f, o), o);
    return c["!cols"] = o.DBF.map(function(p) {
      return {
        wch: p.len,
        DBF: p
      };
    }), delete o.DBF, c;
  }
  function a(f, l) {
    try {
      return Fr(n(f, l), l);
    } catch (o) {
      if (l && l.WTF) throw o;
    }
    return { SheetNames: [], Sheets: {} };
  }
  var i = { B: 8, C: 250, L: 1, D: 8, "?": 0, "": 0 };
  function s(f, l) {
    var o = l || {};
    if (+o.codepage >= 0 && xn(+o.codepage), o.type == "string") throw new Error("Cannot write DBF to JS string");
    var c = At(), p = ea(f, { header: 1, raw: !0, cellDates: !0 }), v = p[0], h = p.slice(1), m = f["!cols"] || [], u = 0, d = 0, A = 0, k = 1;
    for (u = 0; u < v.length; ++u) {
      if (((m[u] || {}).DBF || {}).name) {
        v[u] = m[u].DBF.name, ++A;
        continue;
      }
      if (v[u] != null) {
        if (++A, typeof v[u] == "number" && (v[u] = v[u].toString(10)), typeof v[u] != "string") throw new Error("DBF Invalid column name " + v[u] + " |" + typeof v[u] + "|");
        if (v.indexOf(v[u]) !== u) {
          for (d = 0; d < 1024; ++d)
            if (v.indexOf(v[u] + "_" + d) == -1) {
              v[u] += "_" + d;
              break;
            }
        }
      }
    }
    var C = $e(f["!ref"]), M = [], Q = [], ce = [];
    for (u = 0; u <= C.e.c - C.s.c; ++u) {
      var O = "", H = "", D = 0, j = [];
      for (d = 0; d < h.length; ++d)
        h[d][u] != null && j.push(h[d][u]);
      if (j.length == 0 || v[u] == null) {
        M[u] = "?";
        continue;
      }
      for (d = 0; d < j.length; ++d) {
        switch (typeof j[d]) {
          case "number":
            H = "B";
            break;
          case "string":
            H = "C";
            break;
          case "boolean":
            H = "L";
            break;
          case "object":
            H = j[d] instanceof Date ? "D" : "C";
            break;
          default:
            H = "C";
        }
        D = Math.max(D, String(j[d]).length), O = O && O != H ? "C" : H;
      }
      D > 250 && (D = 250), H = ((m[u] || {}).DBF || {}).type, H == "C" && m[u].DBF.len > D && (D = m[u].DBF.len), O == "B" && H == "N" && (O = "N", ce[u] = m[u].DBF.dec, D = m[u].DBF.len), Q[u] = O == "C" || H == "N" ? D : i[O] || 0, k += Q[u], M[u] = O;
    }
    var X = c.next(32);
    for (X.write_shift(4, 318902576), X.write_shift(4, h.length), X.write_shift(2, 296 + 32 * A), X.write_shift(2, k), u = 0; u < 4; ++u) X.write_shift(4, 0);
    for (X.write_shift(4, 0 | (+r[
      /*::String(*/
      Z0
      /*::)*/
    ] || 3) << 8), u = 0, d = 0; u < v.length; ++u)
      if (v[u] != null) {
        var Y = c.next(32), ue = (v[u].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
        Y.write_shift(1, ue, "sbcs"), Y.write_shift(1, M[u] == "?" ? "C" : M[u], "sbcs"), Y.write_shift(4, d), Y.write_shift(1, Q[u] || i[M[u]] || 0), Y.write_shift(1, ce[u] || 0), Y.write_shift(1, 2), Y.write_shift(4, 0), Y.write_shift(1, 0), Y.write_shift(4, 0), Y.write_shift(4, 0), d += Q[u] || i[M[u]] || 0;
      }
    var V = c.next(264);
    for (V.write_shift(4, 13), u = 0; u < 65; ++u) V.write_shift(4, 0);
    for (u = 0; u < h.length; ++u) {
      var b = c.next(k);
      for (b.write_shift(1, 0), d = 0; d < v.length; ++d)
        if (v[d] != null)
          switch (M[d]) {
            case "L":
              b.write_shift(1, h[u][d] == null ? 63 : h[u][d] ? 84 : 70);
              break;
            case "B":
              b.write_shift(8, h[u][d] || 0, "f");
              break;
            case "N":
              var K = "0";
              for (typeof h[u][d] == "number" && (K = h[u][d].toFixed(ce[d] || 0)), A = 0; A < Q[d] - K.length; ++A) b.write_shift(1, 32);
              b.write_shift(1, K, "sbcs");
              break;
            case "D":
              h[u][d] ? (b.write_shift(4, ("0000" + h[u][d].getFullYear()).slice(-4), "sbcs"), b.write_shift(2, ("00" + (h[u][d].getMonth() + 1)).slice(-2), "sbcs"), b.write_shift(2, ("00" + h[u][d].getDate()).slice(-2), "sbcs")) : b.write_shift(8, "00000000", "sbcs");
              break;
            case "C":
              var J = String(h[u][d] != null ? h[u][d] : "").slice(0, Q[d]);
              for (b.write_shift(1, J, "sbcs"), A = 0; A < Q[d] - J.length; ++A) b.write_shift(1, 32);
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
}(), bo = /* @__PURE__ */ function() {
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
  }, r = new RegExp("\x1BN(" + ht(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm"), t = function(v, h) {
    var m = e[h];
    return typeof m == "number" ? o0(m) : m;
  }, n = function(v, h, m) {
    var u = h.charCodeAt(0) - 32 << 4 | m.charCodeAt(0) - 48;
    return u == 59 ? v : o0(u);
  };
  e["|"] = 254;
  function a(v, h) {
    switch (h.type) {
      case "base64":
        return i(nr(v), h);
      case "binary":
        return i(v, h);
      case "buffer":
        return i(Ie && Buffer.isBuffer(v) ? v.toString("binary") : wn(v), h);
      case "array":
        return i(ia(v), h);
    }
    throw new Error("Unrecognized type " + h.type);
  }
  function i(v, h) {
    var m = v.split(/[\n\r]+/), u = -1, d = -1, A = 0, k = 0, C = [], M = [], Q = null, ce = {}, O = [], H = [], D = [], j = 0, X;
    for (+h.codepage >= 0 && xn(+h.codepage); A !== m.length; ++A) {
      j = 0;
      var Y = m[A].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, n).replace(r, t), ue = Y.replace(/;;/g, "\0").split(";").map(function(y) {
        return y.replace(/\u0000/g, ";");
      }), V = ue[0], b;
      if (Y.length > 0) switch (V) {
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
          ue[1].charAt(0) == "P" && M.push(Y.slice(3).replace(/;;/g, ";"));
          break;
        case "C":
          var K = !1, J = !1, he = !1, _e = !1, We = -1, Ke = -1;
          for (k = 1; k < ue.length; ++k) switch (ue[k].charAt(0)) {
            case "A":
              break;
            case "X":
              d = parseInt(ue[k].slice(1)) - 1, J = !0;
              break;
            case "Y":
              for (u = parseInt(ue[k].slice(1)) - 1, J || (d = 0), X = C.length; X <= u; ++X) C[X] = [];
              break;
            case "K":
              b = ue[k].slice(1), b.charAt(0) === '"' ? b = b.slice(1, b.length - 1) : b === "TRUE" ? b = !0 : b === "FALSE" ? b = !1 : isNaN(tr(b)) ? isNaN(pn(b).getDate()) || (b = Tt(b)) : (b = tr(b), Q !== null && oi(Q) && (b = di(b))), K = !0;
              break;
            case "E":
              _e = !0;
              var S = Mc(ue[k].slice(1), { r: u, c: d });
              C[u][d] = [C[u][d], S];
              break;
            case "S":
              he = !0, C[u][d] = [C[u][d], "S5S"];
              break;
            case "G":
              break;
            case "R":
              We = parseInt(ue[k].slice(1)) - 1;
              break;
            case "C":
              Ke = parseInt(ue[k].slice(1)) - 1;
              break;
            default:
              if (h && h.WTF) throw new Error("SYLK bad record " + Y);
          }
          if (K && (C[u][d] && C[u][d].length == 2 ? C[u][d][0] = b : C[u][d] = b, Q = null), he) {
            if (_e) throw new Error("SYLK shared formula cannot have own formula");
            var P = We > -1 && C[We][Ke];
            if (!P || !P[1]) throw new Error("SYLK shared formula cannot find base");
            C[u][d][1] = Bc(P[1], { r: u - We, c: d - Ke });
          }
          break;
        case "F":
          var F = 0;
          for (k = 1; k < ue.length; ++k) switch (ue[k].charAt(0)) {
            case "X":
              d = parseInt(ue[k].slice(1)) - 1, ++F;
              break;
            case "Y":
              for (u = parseInt(ue[k].slice(1)) - 1, X = C.length; X <= u; ++X) C[X] = [];
              break;
            case "M":
              j = parseInt(ue[k].slice(1)) / 20;
              break;
            case "F":
              break;
            case "G":
              break;
            case "P":
              Q = M[parseInt(ue[k].slice(1))];
              break;
            case "S":
              break;
            case "D":
              break;
            case "N":
              break;
            case "W":
              for (D = ue[k].slice(1).split(" "), X = parseInt(D[0], 10); X <= parseInt(D[1], 10); ++X)
                j = parseInt(D[2], 10), H[X - 1] = j === 0 ? { hidden: !0 } : { wch: j }, Ya(H[X - 1]);
              break;
            case "C":
              d = parseInt(ue[k].slice(1)) - 1, H[d] || (H[d] = {});
              break;
            case "R":
              u = parseInt(ue[k].slice(1)) - 1, O[u] || (O[u] = {}), j > 0 ? (O[u].hpt = j, O[u].hpx = es(j)) : j === 0 && (O[u].hidden = !0);
              break;
            default:
              if (h && h.WTF) throw new Error("SYLK bad record " + Y);
          }
          F < 1 && (Q = null);
          break;
        default:
          if (h && h.WTF) throw new Error("SYLK bad record " + Y);
      }
    }
    return O.length > 0 && (ce["!rows"] = O), H.length > 0 && (ce["!cols"] = H), h && h.sheetRows && (C = C.slice(0, h.sheetRows)), [C, ce];
  }
  function s(v, h) {
    var m = a(v, h), u = m[0], d = m[1], A = Kr(u, h);
    return ht(d).forEach(function(k) {
      A[k] = d[k];
    }), A;
  }
  function f(v, h) {
    return Fr(s(v, h), h);
  }
  function l(v, h, m, u) {
    var d = "C;Y" + (m + 1) + ";X" + (u + 1) + ";K";
    switch (v.t) {
      case "n":
        d += v.v || 0, v.f && !v.F && (d += ";E" + Ja(v.f, { r: m, c: u }));
        break;
      case "b":
        d += v.v ? "TRUE" : "FALSE";
        break;
      case "e":
        d += v.w || v.v;
        break;
      case "d":
        d += '"' + (v.w || v.v) + '"';
        break;
      case "s":
        d += '"' + v.v.replace(/"/g, "").replace(/;/g, ";;") + '"';
        break;
    }
    return d;
  }
  function o(v, h) {
    h.forEach(function(m, u) {
      var d = "F;W" + (u + 1) + " " + (u + 1) + " ";
      m.hidden ? d += "0" : (typeof m.width == "number" && !m.wpx && (m.wpx = Jn(m.width)), typeof m.wpx == "number" && !m.wch && (m.wch = Zn(m.wpx)), typeof m.wch == "number" && (d += Math.round(m.wch))), d.charAt(d.length - 1) != " " && v.push(d);
    });
  }
  function c(v, h) {
    h.forEach(function(m, u) {
      var d = "F;";
      m.hidden ? d += "M0;" : m.hpt ? d += "M" + 20 * m.hpt + ";" : m.hpx && (d += "M" + 20 * qn(m.hpx) + ";"), d.length > 2 && v.push(d + "R" + (u + 1));
    });
  }
  function p(v, h) {
    var m = ["ID;PWXL;N;E"], u = [], d = $e(v["!ref"]), A, k = Array.isArray(v), C = `\r
`;
    m.push("P;PGeneral"), m.push("F;P0;DG0G8;M255"), v["!cols"] && o(m, v["!cols"]), v["!rows"] && c(m, v["!rows"]), m.push("B;Y" + (d.e.r - d.s.r + 1) + ";X" + (d.e.c - d.s.c + 1) + ";D" + [d.s.c, d.s.r, d.e.c, d.e.r].join(" "));
    for (var M = d.s.r; M <= d.e.r; ++M)
      for (var Q = d.s.c; Q <= d.e.c; ++Q) {
        var ce = Be({ r: M, c: Q });
        A = k ? (v[M] || [])[Q] : v[ce], !(!A || A.v == null && (!A.f || A.F)) && u.push(l(A, v, M, Q));
      }
    return m.join(C) + C + u.join(C) + C + "E" + C;
  }
  return {
    to_workbook: f,
    to_sheet: s,
    from_sheet: p
  };
}(), Uo = /* @__PURE__ */ function() {
  function e(i, s) {
    switch (s.type) {
      case "base64":
        return r(nr(i), s);
      case "binary":
        return r(i, s);
      case "buffer":
        return r(Ie && Buffer.isBuffer(i) ? i.toString("binary") : wn(i), s);
      case "array":
        return r(ia(i), s);
    }
    throw new Error("Unrecognized type " + s.type);
  }
  function r(i, s) {
    for (var f = i.split(`
`), l = -1, o = -1, c = 0, p = []; c !== f.length; ++c) {
      if (f[c].trim() === "BOT") {
        p[++l] = [], o = 0;
        continue;
      }
      if (!(l < 0)) {
        var v = f[c].trim().split(","), h = v[0], m = v[1];
        ++c;
        for (var u = f[c] || ""; (u.match(/["]/g) || []).length & 1 && c < f.length - 1; ) u += `
` + f[++c];
        switch (u = u.trim(), +h) {
          case -1:
            if (u === "BOT") {
              p[++l] = [], o = 0;
              continue;
            } else if (u !== "EOD") throw new Error("Unrecognized DIF special command " + u);
            break;
          case 0:
            u === "TRUE" ? p[l][o] = !0 : u === "FALSE" ? p[l][o] = !1 : isNaN(tr(m)) ? isNaN(pn(m).getDate()) ? p[l][o] = m : p[l][o] = Tt(m) : p[l][o] = tr(m), ++o;
            break;
          case 1:
            u = u.slice(1, u.length - 1), u = u.replace(/""/g, '"'), u && u.match(/^=".*"$/) && (u = u.slice(2, -1)), p[l][o++] = u !== "" ? u : null;
            break;
        }
        if (u === "EOD") break;
      }
    }
    return s && s.sheetRows && (p = p.slice(0, s.sheetRows)), p;
  }
  function t(i, s) {
    return Kr(e(i, s), s);
  }
  function n(i, s) {
    return Fr(t(i, s), s);
  }
  var a = /* @__PURE__ */ function() {
    var i = function(l, o, c, p, v) {
      l.push(o), l.push(c + "," + p), l.push('"' + v.replace(/"/g, '""') + '"');
    }, s = function(l, o, c, p) {
      l.push(o + "," + c), l.push(o == 1 ? '"' + p.replace(/"/g, '""') + '"' : p);
    };
    return function(l) {
      var o = [], c = $e(l["!ref"]), p, v = Array.isArray(l);
      i(o, "TABLE", 0, 1, "sheetjs"), i(o, "VECTORS", 0, c.e.r - c.s.r + 1, ""), i(o, "TUPLES", 0, c.e.c - c.s.c + 1, ""), i(o, "DATA", 0, 0, "");
      for (var h = c.s.r; h <= c.e.r; ++h) {
        s(o, -1, 0, "BOT");
        for (var m = c.s.c; m <= c.e.c; ++m) {
          var u = Be({ r: h, c: m });
          if (p = v ? (l[h] || [])[m] : l[u], !p) {
            s(o, 1, 0, "");
            continue;
          }
          switch (p.t) {
            case "n":
              var d = p.w;
              !d && p.v != null && (d = p.v), d == null ? p.f && !p.F ? s(o, 1, 0, "=" + p.f) : s(o, 1, 0, "") : s(o, 0, d, "V");
              break;
            case "b":
              s(o, 0, p.v ? 1 : 0, p.v ? "TRUE" : "FALSE");
              break;
            case "s":
              s(o, 1, 0, isNaN(p.v) ? p.v : '="' + p.v + '"');
              break;
            case "d":
              p.w || (p.w = vr(p.z || Ye[14], yt(Tt(p.v)))), s(o, 0, p.w, "V");
              break;
            default:
              s(o, 1, 0, "");
          }
        }
      }
      s(o, -1, 0, "EOD");
      var A = `\r
`, k = o.join(A);
      return k;
    };
  }();
  return {
    to_workbook: n,
    to_sheet: t,
    from_sheet: a
  };
}(), Ji = /* @__PURE__ */ function() {
  function e(p) {
    return p.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, `
`);
  }
  function r(p) {
    return p.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n");
  }
  function t(p, v) {
    for (var h = p.split(`
`), m = -1, u = -1, d = 0, A = []; d !== h.length; ++d) {
      var k = h[d].trim().split(":");
      if (k[0] === "cell") {
        var C = it(k[1]);
        if (A.length <= C.r) for (m = A.length; m <= C.r; ++m) A[m] || (A[m] = []);
        switch (m = C.r, u = C.c, k[2]) {
          case "t":
            A[m][u] = e(k[3]);
            break;
          case "v":
            A[m][u] = +k[3];
            break;
          case "vtf":
            var M = k[k.length - 1];
          case "vtc":
            switch (k[3]) {
              case "nl":
                A[m][u] = !!+k[4];
                break;
              default:
                A[m][u] = +k[4];
                break;
            }
            k[2] == "vtf" && (A[m][u] = [A[m][u], M]);
        }
      }
    }
    return v && v.sheetRows && (A = A.slice(0, v.sheetRows)), A;
  }
  function n(p, v) {
    return Kr(t(p, v), v);
  }
  function a(p, v) {
    return Fr(n(p, v), v);
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
`, f = [
    "# SocialCalc Spreadsheet Control Save",
    "part:sheet"
  ].join(`
`), l = "--SocialCalcSpreadsheetControlSave--";
  function o(p) {
    if (!p || !p["!ref"]) return "";
    for (var v = [], h = [], m, u = "", d = It(p["!ref"]), A = Array.isArray(p), k = d.s.r; k <= d.e.r; ++k)
      for (var C = d.s.c; C <= d.e.c; ++C)
        if (u = Be({ r: k, c: C }), m = A ? (p[k] || [])[C] : p[u], !(!m || m.v == null || m.t === "z")) {
          switch (h = ["cell", u, "t"], m.t) {
            case "s":
            case "str":
              h.push(r(m.v));
              break;
            case "n":
              m.f ? (h[2] = "vtf", h[3] = "n", h[4] = m.v, h[5] = r(m.f)) : (h[2] = "v", h[3] = m.v);
              break;
            case "b":
              h[2] = "vt" + (m.f ? "f" : "c"), h[3] = "nl", h[4] = m.v ? "1" : "0", h[5] = r(m.f || (m.v ? "TRUE" : "FALSE"));
              break;
            case "d":
              var M = yt(Tt(m.v));
              h[2] = "vtc", h[3] = "nd", h[4] = "" + M, h[5] = m.w || vr(m.z || Ye[14], M);
              break;
            case "e":
              continue;
          }
          v.push(h.join(":"));
        }
    return v.push("sheet:c:" + (d.e.c - d.s.c + 1) + ":r:" + (d.e.r - d.s.r + 1) + ":tvf:1"), v.push("valueformat:1:text-wiki"), v.join(`
`);
  }
  function c(p) {
    return [i, s, f, s, o(p), l].join(`
`);
  }
  return {
    to_workbook: a,
    to_sheet: n,
    from_sheet: c
  };
}(), Wo = /* @__PURE__ */ function() {
  function e(c, p, v, h, m) {
    m.raw ? p[v][h] = c : c === "" || (c === "TRUE" ? p[v][h] = !0 : c === "FALSE" ? p[v][h] = !1 : isNaN(tr(c)) ? isNaN(pn(c).getDate()) ? p[v][h] = c : p[v][h] = Tt(c) : p[v][h] = tr(c));
  }
  function r(c, p) {
    var v = p || {}, h = [];
    if (!c || c.length === 0) return h;
    for (var m = c.split(/[\r\n]/), u = m.length - 1; u >= 0 && m[u].length === 0; ) --u;
    for (var d = 10, A = 0, k = 0; k <= u; ++k)
      A = m[k].indexOf(" "), A == -1 ? A = m[k].length : A++, d = Math.max(d, A);
    for (k = 0; k <= u; ++k) {
      h[k] = [];
      var C = 0;
      for (e(m[k].slice(0, d).trim(), h, k, C, v), C = 1; C <= (m[k].length - d) / 10 + 1; ++C)
        e(m[k].slice(d + (C - 1) * 10, d + C * 10).trim(), h, k, C, v);
    }
    return v.sheetRows && (h = h.slice(0, v.sheetRows)), h;
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
    for (var p = {}, v = !1, h = 0, m = 0; h < c.length; ++h)
      (m = c.charCodeAt(h)) == 34 ? v = !v : !v && m in t && (p[m] = (p[m] || 0) + 1);
    m = [];
    for (h in p) Object.prototype.hasOwnProperty.call(p, h) && m.push([p[h], h]);
    if (!m.length) {
      p = n;
      for (h in p) Object.prototype.hasOwnProperty.call(p, h) && m.push([p[h], h]);
    }
    return m.sort(function(u, d) {
      return u[0] - d[0] || n[u[1]] - n[d[1]];
    }), t[m.pop()[1]] || 44;
  }
  function i(c, p) {
    var v = p || {}, h = "", m = v.dense ? [] : {}, u = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    c.slice(0, 4) == "sep=" ? c.charCodeAt(5) == 13 && c.charCodeAt(6) == 10 ? (h = c.charAt(4), c = c.slice(7)) : c.charCodeAt(5) == 13 || c.charCodeAt(5) == 10 ? (h = c.charAt(4), c = c.slice(6)) : h = a(c.slice(0, 1024)) : v && v.FS ? h = v.FS : h = a(c.slice(0, 1024));
    var d = 0, A = 0, k = 0, C = 0, M = 0, Q = h.charCodeAt(0), ce = !1, O = 0, H = c.charCodeAt(0);
    c = c.replace(/\r\n/mg, `
`);
    var D = v.dateNF != null ? tl(v.dateNF) : null;
    function j() {
      var X = c.slice(C, M), Y = {};
      if (X.charAt(0) == '"' && X.charAt(X.length - 1) == '"' && (X = X.slice(1, -1).replace(/""/g, '"')), X.length === 0) Y.t = "z";
      else if (v.raw)
        Y.t = "s", Y.v = X;
      else if (X.trim().length === 0)
        Y.t = "s", Y.v = X;
      else if (X.charCodeAt(0) == 61)
        X.charCodeAt(1) == 34 && X.charCodeAt(X.length - 1) == 34 ? (Y.t = "s", Y.v = X.slice(2, -1).replace(/""/g, '"')) : bc(X) ? (Y.t = "n", Y.f = X.slice(1)) : (Y.t = "s", Y.v = X);
      else if (X == "TRUE")
        Y.t = "b", Y.v = !0;
      else if (X == "FALSE")
        Y.t = "b", Y.v = !1;
      else if (!isNaN(k = tr(X)))
        Y.t = "n", v.cellText !== !1 && (Y.w = X), Y.v = k;
      else if (!isNaN(pn(X).getDate()) || D && X.match(D)) {
        Y.z = v.dateNF || Ye[14];
        var ue = 0;
        D && X.match(D) && (X = rl(X, v.dateNF, X.match(D) || []), ue = 1), v.cellDates ? (Y.t = "d", Y.v = Tt(X, ue)) : (Y.t = "n", Y.v = yt(Tt(X, ue))), v.cellText !== !1 && (Y.w = vr(Y.z, Y.v instanceof Date ? yt(Y.v) : Y.v)), v.cellNF || delete Y.z;
      } else
        Y.t = "s", Y.v = X;
      if (Y.t == "z" || (v.dense ? (m[d] || (m[d] = []), m[d][A] = Y) : m[Be({ c: A, r: d })] = Y), C = M + 1, H = c.charCodeAt(C), u.e.c < A && (u.e.c = A), u.e.r < d && (u.e.r = d), O == Q) ++A;
      else if (A = 0, ++d, v.sheetRows && v.sheetRows <= d) return !0;
    }
    e: for (; M < c.length; ++M) switch (O = c.charCodeAt(M)) {
      case 34:
        H === 34 && (ce = !ce);
        break;
      case Q:
      case 10:
      case 13:
        if (!ce && j()) break e;
        break;
    }
    return M - C > 0 && j(), m["!ref"] = Qe(u), m;
  }
  function s(c, p) {
    return !(p && p.PRN) || p.FS || c.slice(0, 4) == "sep=" || c.indexOf("	") >= 0 || c.indexOf(",") >= 0 || c.indexOf(";") >= 0 ? i(c, p) : Kr(r(c, p), p);
  }
  function f(c, p) {
    var v = "", h = p.type == "string" ? [0, 0, 0, 0] : qd(c, p);
    switch (p.type) {
      case "base64":
        v = nr(c);
        break;
      case "binary":
        v = c;
        break;
      case "buffer":
        p.codepage == 65001 ? v = c.toString("utf8") : p.codepage && typeof $n < "u" || (v = Ie && Buffer.isBuffer(c) ? c.toString("binary") : wn(c));
        break;
      case "array":
        v = ia(c);
        break;
      case "string":
        v = c;
        break;
      default:
        throw new Error("Unrecognized type " + p.type);
    }
    return h[0] == 239 && h[1] == 187 && h[2] == 191 ? v = ln(v.slice(3)) : p.type != "string" && p.type != "buffer" && p.codepage == 65001 ? v = ln(v) : p.type == "binary" && typeof $n < "u", v.slice(0, 19) == "socialcalc:version:" ? Ji.to_sheet(p.type == "string" ? v : ln(v), p) : s(v, p);
  }
  function l(c, p) {
    return Fr(f(c, p), p);
  }
  function o(c) {
    for (var p = [], v = $e(c["!ref"]), h, m = Array.isArray(c), u = v.s.r; u <= v.e.r; ++u) {
      for (var d = [], A = v.s.c; A <= v.e.c; ++A) {
        var k = Be({ r: u, c: A });
        if (h = m ? (c[u] || [])[A] : c[k], !h || h.v == null) {
          d.push("          ");
          continue;
        }
        for (var C = (h.w || (ar(h), h.w) || "").slice(0, 10); C.length < 10; ) C += " ";
        d.push(C + (A === 0 ? " " : ""));
      }
      p.push(d.join(""));
    }
    return p.join(`
`);
  }
  return {
    to_workbook: l,
    to_sheet: f,
    from_sheet: o
  };
}(), W0 = /* @__PURE__ */ function() {
  function e(S, P, F) {
    if (S) {
      Ct(S, S.l || 0);
      for (var y = F.Enum || We; S.l < S.length; ) {
        var B = S.read_shift(2), ae = y[B] || y[65535], xe = S.read_shift(2), oe = S.l + xe, se = ae.f && ae.f(S, xe, F);
        if (S.l = oe, P(se, ae, B)) return;
      }
    }
  }
  function r(S, P) {
    switch (P.type) {
      case "base64":
        return t(Ht(nr(S)), P);
      case "binary":
        return t(Ht(S), P);
      case "buffer":
      case "array":
        return t(S, P);
    }
    throw "Unsupported type " + P.type;
  }
  function t(S, P) {
    if (!S) return S;
    var F = P || {}, y = F.dense ? [] : {}, B = "Sheet1", ae = "", xe = 0, oe = {}, se = [], Ce = [], ye = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, Je = F.sheetRows || 0;
    if (S[2] == 0 && (S[3] == 8 || S[3] == 9) && S.length >= 16 && S[14] == 5 && S[15] === 108)
      throw new Error("Unsupported Works 3 for Mac file");
    if (S[2] == 2)
      F.Enum = We, e(S, function(pe, pt, Et) {
        switch (Et) {
          case 0:
            F.vers = pe, pe >= 4096 && (F.qpro = !0);
            break;
          case 6:
            ye = pe;
            break;
          case 204:
            pe && (ae = pe);
            break;
          case 222:
            ae = pe;
            break;
          case 15:
          case 51:
            F.qpro || (pe[1].v = pe[1].v.slice(1));
          case 13:
          case 14:
          case 16:
            Et == 14 && (pe[2] & 112) == 112 && (pe[2] & 15) > 1 && (pe[2] & 15) < 15 && (pe[1].z = F.dateNF || Ye[14], F.cellDates && (pe[1].t = "d", pe[1].v = di(pe[1].v))), F.qpro && pe[3] > xe && (y["!ref"] = Qe(ye), oe[B] = y, se.push(B), y = F.dense ? [] : {}, ye = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, xe = pe[3], B = ae || "Sheet" + (xe + 1), ae = "");
            var bt = F.dense ? (y[pe[0].r] || [])[pe[0].c] : y[Be(pe[0])];
            if (bt) {
              bt.t = pe[1].t, bt.v = pe[1].v, pe[1].z != null && (bt.z = pe[1].z), pe[1].f != null && (bt.f = pe[1].f);
              break;
            }
            F.dense ? (y[pe[0].r] || (y[pe[0].r] = []), y[pe[0].r][pe[0].c] = pe[1]) : y[Be(pe[0])] = pe[1];
            break;
        }
      }, F);
    else if (S[2] == 26 || S[2] == 14)
      F.Enum = Ke, S[2] == 14 && (F.qpro = !0, S.l = 0), e(S, function(pe, pt, Et) {
        switch (Et) {
          case 204:
            B = pe;
            break;
          case 22:
            pe[1].v = pe[1].v.slice(1);
          case 23:
          case 24:
          case 25:
          case 37:
          case 39:
          case 40:
            if (pe[3] > xe && (y["!ref"] = Qe(ye), oe[B] = y, se.push(B), y = F.dense ? [] : {}, ye = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, xe = pe[3], B = "Sheet" + (xe + 1)), Je > 0 && pe[0].r >= Je) break;
            F.dense ? (y[pe[0].r] || (y[pe[0].r] = []), y[pe[0].r][pe[0].c] = pe[1]) : y[Be(pe[0])] = pe[1], ye.e.c < pe[0].c && (ye.e.c = pe[0].c), ye.e.r < pe[0].r && (ye.e.r = pe[0].r);
            break;
          case 27:
            pe[14e3] && (Ce[pe[14e3][0]] = pe[14e3][1]);
            break;
          case 1537:
            Ce[pe[0]] = pe[1], pe[0] == xe && (B = pe[1]);
            break;
        }
      }, F);
    else throw new Error("Unrecognized LOTUS BOF " + S[2]);
    if (y["!ref"] = Qe(ye), oe[ae || B] = y, se.push(ae || B), !Ce.length) return { SheetNames: se, Sheets: oe };
    for (var Fe = {}, Bt = [], He = 0; He < Ce.length; ++He) oe[se[He]] ? (Bt.push(Ce[He] || se[He]), Fe[Ce[He]] = oe[Ce[He]] || oe[se[He]]) : (Bt.push(Ce[He]), Fe[Ce[He]] = { "!ref": "A1" });
    return { SheetNames: Bt, Sheets: Fe };
  }
  function n(S, P) {
    var F = P || {};
    if (+F.codepage >= 0 && xn(+F.codepage), F.type == "string") throw new Error("Cannot write WK1 to JS string");
    var y = At(), B = $e(S["!ref"]), ae = Array.isArray(S), xe = [];
    ne(y, 0, i(1030)), ne(y, 6, l(B));
    for (var oe = Math.min(B.e.r, 8191), se = B.s.r; se <= oe; ++se)
      for (var Ce = ut(se), ye = B.s.c; ye <= B.e.c; ++ye) {
        se === B.s.r && (xe[ye] = xt(ye));
        var Je = xe[ye] + Ce, Fe = ae ? (S[se] || [])[ye] : S[Je];
        if (!(!Fe || Fe.t == "z"))
          if (Fe.t == "n")
            (Fe.v | 0) == Fe.v && Fe.v >= -32768 && Fe.v <= 32767 ? ne(y, 13, h(se, ye, Fe.v)) : ne(y, 14, u(se, ye, Fe.v));
          else {
            var Bt = ar(Fe);
            ne(y, 15, p(se, ye, Bt.slice(0, 239)));
          }
      }
    return ne(y, 1), y.end();
  }
  function a(S, P) {
    var F = P || {};
    if (+F.codepage >= 0 && xn(+F.codepage), F.type == "string") throw new Error("Cannot write WK3 to JS string");
    var y = At();
    ne(y, 0, s(S));
    for (var B = 0, ae = 0; B < S.SheetNames.length; ++B) (S.Sheets[S.SheetNames[B]] || {})["!ref"] && ne(y, 27, _e(S.SheetNames[B], ae++));
    var xe = 0;
    for (B = 0; B < S.SheetNames.length; ++B) {
      var oe = S.Sheets[S.SheetNames[B]];
      if (!(!oe || !oe["!ref"])) {
        for (var se = $e(oe["!ref"]), Ce = Array.isArray(oe), ye = [], Je = Math.min(se.e.r, 8191), Fe = se.s.r; Fe <= Je; ++Fe)
          for (var Bt = ut(Fe), He = se.s.c; He <= se.e.c; ++He) {
            Fe === se.s.r && (ye[He] = xt(He));
            var pe = ye[He] + Bt, pt = Ce ? (oe[Fe] || [])[He] : oe[pe];
            if (!(!pt || pt.t == "z"))
              if (pt.t == "n")
                ne(y, 23, j(Fe, He, xe, pt.v));
              else {
                var Et = ar(pt);
                ne(y, 22, O(Fe, He, xe, Et.slice(0, 239)));
              }
          }
        ++xe;
      }
    }
    return ne(y, 1), y.end();
  }
  function i(S) {
    var P = U(2);
    return P.write_shift(2, S), P;
  }
  function s(S) {
    var P = U(26);
    P.write_shift(2, 4096), P.write_shift(2, 4), P.write_shift(4, 0);
    for (var F = 0, y = 0, B = 0, ae = 0; ae < S.SheetNames.length; ++ae) {
      var xe = S.SheetNames[ae], oe = S.Sheets[xe];
      if (!(!oe || !oe["!ref"])) {
        ++B;
        var se = It(oe["!ref"]);
        F < se.e.r && (F = se.e.r), y < se.e.c && (y = se.e.c);
      }
    }
    return F > 8191 && (F = 8191), P.write_shift(2, F), P.write_shift(1, B), P.write_shift(1, y), P.write_shift(2, 0), P.write_shift(2, 0), P.write_shift(1, 1), P.write_shift(1, 2), P.write_shift(4, 0), P.write_shift(4, 0), P;
  }
  function f(S, P, F) {
    var y = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    return P == 8 && F.qpro ? (y.s.c = S.read_shift(1), S.l++, y.s.r = S.read_shift(2), y.e.c = S.read_shift(1), S.l++, y.e.r = S.read_shift(2), y) : (y.s.c = S.read_shift(2), y.s.r = S.read_shift(2), P == 12 && F.qpro && (S.l += 2), y.e.c = S.read_shift(2), y.e.r = S.read_shift(2), P == 12 && F.qpro && (S.l += 2), y.s.c == 65535 && (y.s.c = y.e.c = y.s.r = y.e.r = 0), y);
  }
  function l(S) {
    var P = U(8);
    return P.write_shift(2, S.s.c), P.write_shift(2, S.s.r), P.write_shift(2, S.e.c), P.write_shift(2, S.e.r), P;
  }
  function o(S, P, F) {
    var y = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0, 0];
    return F.qpro && F.vers != 20768 ? (y[0].c = S.read_shift(1), y[3] = S.read_shift(1), y[0].r = S.read_shift(2), S.l += 2) : (y[2] = S.read_shift(1), y[0].c = S.read_shift(2), y[0].r = S.read_shift(2)), y;
  }
  function c(S, P, F) {
    var y = S.l + P, B = o(S, P, F);
    if (B[1].t = "s", F.vers == 20768) {
      S.l++;
      var ae = S.read_shift(1);
      return B[1].v = S.read_shift(ae, "utf8"), B;
    }
    return F.qpro && S.l++, B[1].v = S.read_shift(y - S.l, "cstr"), B;
  }
  function p(S, P, F) {
    var y = U(7 + F.length);
    y.write_shift(1, 255), y.write_shift(2, P), y.write_shift(2, S), y.write_shift(1, 39);
    for (var B = 0; B < y.length; ++B) {
      var ae = F.charCodeAt(B);
      y.write_shift(1, ae >= 128 ? 95 : ae);
    }
    return y.write_shift(1, 0), y;
  }
  function v(S, P, F) {
    var y = o(S, P, F);
    return y[1].v = S.read_shift(2, "i"), y;
  }
  function h(S, P, F) {
    var y = U(7);
    return y.write_shift(1, 255), y.write_shift(2, P), y.write_shift(2, S), y.write_shift(2, F, "i"), y;
  }
  function m(S, P, F) {
    var y = o(S, P, F);
    return y[1].v = S.read_shift(8, "f"), y;
  }
  function u(S, P, F) {
    var y = U(13);
    return y.write_shift(1, 255), y.write_shift(2, P), y.write_shift(2, S), y.write_shift(8, F, "f"), y;
  }
  function d(S, P, F) {
    var y = S.l + P, B = o(S, P, F);
    if (B[1].v = S.read_shift(8, "f"), F.qpro) S.l = y;
    else {
      var ae = S.read_shift(2);
      M(S.slice(S.l, S.l + ae), B), S.l += ae;
    }
    return B;
  }
  function A(S, P, F) {
    var y = P & 32768;
    return P &= -32769, P = (y ? S : 0) + (P >= 8192 ? P - 16384 : P), (y ? "" : "$") + (F ? xt(P) : ut(P));
  }
  var k = {
    51: ["FALSE", 0],
    52: ["TRUE", 0],
    70: ["LEN", 1],
    80: ["SUM", 69],
    81: ["AVERAGEA", 69],
    82: ["COUNTA", 69],
    83: ["MINA", 69],
    84: ["MAXA", 69],
    111: ["T", 1]
  }, C = [
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
  function M(S, P) {
    Ct(S, 0);
    for (var F = [], y = 0, B = "", ae = "", xe = "", oe = ""; S.l < S.length; ) {
      var se = S[S.l++];
      switch (se) {
        case 0:
          F.push(S.read_shift(8, "f"));
          break;
        case 1:
          ae = A(P[0].c, S.read_shift(2), !0), B = A(P[0].r, S.read_shift(2), !1), F.push(ae + B);
          break;
        case 2:
          {
            var Ce = A(P[0].c, S.read_shift(2), !0), ye = A(P[0].r, S.read_shift(2), !1);
            ae = A(P[0].c, S.read_shift(2), !0), B = A(P[0].r, S.read_shift(2), !1), F.push(Ce + ye + ":" + ae + B);
          }
          break;
        case 3:
          if (S.l < S.length) {
            console.error("WK1 premature formula end");
            return;
          }
          break;
        case 4:
          F.push("(" + F.pop() + ")");
          break;
        case 5:
          F.push(S.read_shift(2));
          break;
        case 6:
          {
            for (var Je = ""; se = S[S.l++]; ) Je += String.fromCharCode(se);
            F.push('"' + Je.replace(/"/g, '""') + '"');
          }
          break;
        case 8:
          F.push("-" + F.pop());
          break;
        case 23:
          F.push("+" + F.pop());
          break;
        case 22:
          F.push("NOT(" + F.pop() + ")");
          break;
        case 20:
        case 21:
          oe = F.pop(), xe = F.pop(), F.push(["AND", "OR"][se - 20] + "(" + xe + "," + oe + ")");
          break;
        default:
          if (se < 32 && C[se])
            oe = F.pop(), xe = F.pop(), F.push(xe + C[se] + oe);
          else if (k[se]) {
            if (y = k[se][1], y == 69 && (y = S[S.l++]), y > F.length) {
              console.error("WK1 bad formula parse 0x" + se.toString(16) + ":|" + F.join("|") + "|");
              return;
            }
            var Fe = F.slice(-y);
            F.length -= y, F.push(k[se][0] + "(" + Fe.join(",") + ")");
          } else return se <= 7 ? console.error("WK1 invalid opcode " + se.toString(16)) : se <= 24 ? console.error("WK1 unsupported op " + se.toString(16)) : se <= 30 ? console.error("WK1 invalid opcode " + se.toString(16)) : se <= 115 ? console.error("WK1 unsupported function opcode " + se.toString(16)) : console.error("WK1 unrecognized opcode " + se.toString(16));
      }
    }
    F.length == 1 ? P[1].f = "" + F[0] : console.error("WK1 bad formula parse |" + F.join("|") + "|");
  }
  function Q(S) {
    var P = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0];
    return P[0].r = S.read_shift(2), P[3] = S[S.l++], P[0].c = S[S.l++], P;
  }
  function ce(S, P) {
    var F = Q(S);
    return F[1].t = "s", F[1].v = S.read_shift(P - 4, "cstr"), F;
  }
  function O(S, P, F, y) {
    var B = U(6 + y.length);
    B.write_shift(2, S), B.write_shift(1, F), B.write_shift(1, P), B.write_shift(1, 39);
    for (var ae = 0; ae < y.length; ++ae) {
      var xe = y.charCodeAt(ae);
      B.write_shift(1, xe >= 128 ? 95 : xe);
    }
    return B.write_shift(1, 0), B;
  }
  function H(S, P) {
    var F = Q(S);
    F[1].v = S.read_shift(2);
    var y = F[1].v >> 1;
    if (F[1].v & 1)
      switch (y & 7) {
        case 0:
          y = (y >> 3) * 5e3;
          break;
        case 1:
          y = (y >> 3) * 500;
          break;
        case 2:
          y = (y >> 3) / 20;
          break;
        case 3:
          y = (y >> 3) / 200;
          break;
        case 4:
          y = (y >> 3) / 2e3;
          break;
        case 5:
          y = (y >> 3) / 2e4;
          break;
        case 6:
          y = (y >> 3) / 16;
          break;
        case 7:
          y = (y >> 3) / 64;
          break;
      }
    return F[1].v = y, F;
  }
  function D(S, P) {
    var F = Q(S), y = S.read_shift(4), B = S.read_shift(4), ae = S.read_shift(2);
    if (ae == 65535)
      return y === 0 && B === 3221225472 ? (F[1].t = "e", F[1].v = 15) : y === 0 && B === 3489660928 ? (F[1].t = "e", F[1].v = 42) : F[1].v = 0, F;
    var xe = ae & 32768;
    return ae = (ae & 32767) - 16446, F[1].v = (1 - xe * 2) * (B * Math.pow(2, ae + 32) + y * Math.pow(2, ae)), F;
  }
  function j(S, P, F, y) {
    var B = U(14);
    if (B.write_shift(2, S), B.write_shift(1, F), B.write_shift(1, P), y == 0)
      return B.write_shift(4, 0), B.write_shift(4, 0), B.write_shift(2, 65535), B;
    var ae = 0, xe = 0, oe = 0, se = 0;
    return y < 0 && (ae = 1, y = -y), xe = Math.log2(y) | 0, y /= Math.pow(2, xe - 31), se = y >>> 0, se & 2147483648 || (y /= 2, ++xe, se = y >>> 0), y -= se, se |= 2147483648, se >>>= 0, y *= Math.pow(2, 32), oe = y >>> 0, B.write_shift(4, oe), B.write_shift(4, se), xe += 16383 + (ae ? 32768 : 0), B.write_shift(2, xe), B;
  }
  function X(S, P) {
    var F = D(S);
    return S.l += P - 14, F;
  }
  function Y(S, P) {
    var F = Q(S), y = S.read_shift(4);
    return F[1].v = y >> 6, F;
  }
  function ue(S, P) {
    var F = Q(S), y = S.read_shift(8, "f");
    return F[1].v = y, F;
  }
  function V(S, P) {
    var F = ue(S);
    return S.l += P - 10, F;
  }
  function b(S, P) {
    return S[S.l + P - 1] == 0 ? S.read_shift(P, "cstr") : "";
  }
  function K(S, P) {
    var F = S[S.l++];
    F > P - 1 && (F = P - 1);
    for (var y = ""; y.length < F; ) y += String.fromCharCode(S[S.l++]);
    return y;
  }
  function J(S, P, F) {
    if (!(!F.qpro || P < 21)) {
      var y = S.read_shift(1);
      S.l += 17, S.l += 1, S.l += 2;
      var B = S.read_shift(P - 21, "cstr");
      return [y, B];
    }
  }
  function he(S, P) {
    for (var F = {}, y = S.l + P; S.l < y; ) {
      var B = S.read_shift(2);
      if (B == 14e3) {
        for (F[B] = [0, ""], F[B][0] = S.read_shift(2); S[S.l]; )
          F[B][1] += String.fromCharCode(S[S.l]), S.l++;
        S.l++;
      }
    }
    return F;
  }
  function _e(S, P) {
    var F = U(5 + S.length);
    F.write_shift(2, 14e3), F.write_shift(2, P);
    for (var y = 0; y < S.length; ++y) {
      var B = S.charCodeAt(y);
      F[F.l++] = B > 127 ? 95 : B;
    }
    return F[F.l++] = 0, F;
  }
  var We = {
    /*::[*/
    0: { n: "BOF", f: ji },
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
    6: { n: "RANGE", f },
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
    13: { n: "INTEGER", f: v },
    /*::[*/
    14: { n: "NUMBER", f: m },
    /*::[*/
    15: { n: "LABEL", f: c },
    /*::[*/
    16: { n: "FORMULA", f: d },
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
    204: { n: "SHEETNAMECS", f: b },
    /*::[*/
    222: { n: "SHEETNAMELP", f: K },
    /*::[*/
    65535: { n: "" }
  }, Ke = {
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
    22: { n: "LABEL16", f: ce },
    /*::[*/
    23: { n: "NUMBER17", f: D },
    /*::[*/
    24: { n: "NUMBER18", f: H },
    /*::[*/
    25: { n: "FORMULA19", f: X },
    /*::[*/
    26: { n: "FORMULA1A" },
    /*::[*/
    27: { n: "XFORMAT", f: he },
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
    37: { n: "NUMBER25", f: Y },
    /*::[*/
    38: { n: "??" },
    /*::[*/
    39: { n: "NUMBER27", f: ue },
    /*::[*/
    40: { n: "FORMULA28", f: V },
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
    204: { n: "SHEETNAMECS", f: b },
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
    1537: { n: "SHEETINFOQP", f: J },
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
}(), $o = /^\s|\s$|[\t\n\r]/;
function Zi(e, r) {
  if (!r.bookSST) return "";
  var t = [et];
  t[t.length] = re("sst", null, {
    xmlns: Yr[0],
    count: e.Count,
    uniqueCount: e.Unique
  });
  for (var n = 0; n != e.length; ++n)
    if (e[n] != null) {
      var a = e[n], i = "<si>";
      a.r ? i += a.r : (i += "<t", a.t || (a.t = ""), a.t.match($o) && (i += ' xml:space="preserve"'), i += ">" + Me(a.t) + "</t>"), i += "</si>", t[t.length] = i;
    }
  return t.length > 2 && (t[t.length] = "</sst>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function Ho(e) {
  return [e.read_shift(4), e.read_shift(4)];
}
function Vo(e, r) {
  return r || (r = U(8)), r.write_shift(4, e.Count), r.write_shift(4, e.Unique), r;
}
var Go = Nl;
function jo(e) {
  var r = At();
  G(r, 159, Vo(e));
  for (var t = 0; t < e.length; ++t) G(r, 19, Go(e[t]));
  return G(
    r,
    160
    /* BrtEndSst */
  ), r.end();
}
function Xo(e) {
  for (var r = [], t = e.split(""), n = 0; n < t.length; ++n) r[n] = t[n].charCodeAt(0);
  return r;
}
function qi(e) {
  var r = 0, t, n = Xo(e), a = n.length + 1, i, s, f, l, o;
  for (t = Sr(a), t[0] = n.length, i = 1; i != a; ++i) t[i] = n[i - 1];
  for (i = a - 1; i >= 0; --i)
    s = t[i], f = r & 16384 ? 1 : 0, l = r << 1 & 32767, o = f | l, r = o ^ s;
  return r ^ 52811;
}
var zo = /* @__PURE__ */ function() {
  function e(a, i) {
    switch (i.type) {
      case "base64":
        return r(nr(a), i);
      case "binary":
        return r(a, i);
      case "buffer":
        return r(Ie && Buffer.isBuffer(a) ? a.toString("binary") : wn(a), i);
      case "array":
        return r(ia(a), i);
    }
    throw new Error("Unrecognized type " + i.type);
  }
  function r(a, i) {
    var s = i || {}, f = s.dense ? [] : {}, l = a.match(/\\trowd.*?\\row\b/g);
    if (!l.length) throw new Error("RTF missing table");
    var o = { s: { c: 0, r: 0 }, e: { c: 0, r: l.length - 1 } };
    return l.forEach(function(c, p) {
      Array.isArray(f) && (f[p] = []);
      for (var v = /\\\w+\b/g, h = 0, m, u = -1; m = v.exec(c); ) {
        switch (m[0]) {
          case "\\cell":
            var d = c.slice(h, v.lastIndex - m[0].length);
            if (d[0] == " " && (d = d.slice(1)), ++u, d.length) {
              var A = { v: d, t: "s" };
              Array.isArray(f) ? f[p][u] = A : f[Be({ r: p, c: u })] = A;
            }
            break;
        }
        h = v.lastIndex;
      }
      u > o.e.c && (o.e.c = u);
    }), f["!ref"] = Qe(o), f;
  }
  function t(a, i) {
    return Fr(e(a, i), i);
  }
  function n(a) {
    for (var i = ["{\\rtf1\\ansi"], s = $e(a["!ref"]), f, l = Array.isArray(a), o = s.s.r; o <= s.e.r; ++o) {
      i.push("\\trowd\\trautofit1");
      for (var c = s.s.c; c <= s.e.c; ++c) i.push("\\cellx" + (c + 1));
      for (i.push("\\pard\\intbl"), c = s.s.c; c <= s.e.c; ++c) {
        var p = Be({ r: o, c });
        f = l ? (a[o] || [])[c] : a[p], !(!f || f.v == null && (!f.f || f.F)) && (i.push(" " + (f.w || (ar(f), f.w))), i.push("\\cell"));
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
function $0(e) {
  for (var r = 0, t = 1; r != 3; ++r) t = t * 256 + (e[r] > 255 ? 255 : e[r] < 0 ? 0 : e[r]);
  return t.toString(16).toUpperCase().slice(1);
}
var Yo = 6, rr = Yo;
function Jn(e) {
  return Math.floor((e + Math.round(128 / rr) / 256) * rr);
}
function Zn(e) {
  return Math.floor((e - 5) / rr * 100 + 0.5) / 100;
}
function Ra(e) {
  return Math.round((e * rr + 5) / rr * 256) / 256;
}
function Ya(e) {
  e.width ? (e.wpx = Jn(e.width), e.wch = Zn(e.wpx), e.MDW = rr) : e.wpx ? (e.wch = Zn(e.wpx), e.width = Ra(e.wch), e.MDW = rr) : typeof e.wch == "number" && (e.width = Ra(e.wch), e.wpx = Jn(e.width), e.MDW = rr), e.customWidth && delete e.customWidth;
}
var Ko = 96, Qi = Ko;
function qn(e) {
  return e * 96 / Qi;
}
function es(e) {
  return e * Qi / 96;
}
function Jo(e) {
  var r = ["<numFmts>"];
  return [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(t) {
    for (var n = t[0]; n <= t[1]; ++n) e[n] != null && (r[r.length] = re("numFmt", null, { numFmtId: n, formatCode: Me(e[n]) }));
  }), r.length === 1 ? "" : (r[r.length] = "</numFmts>", r[0] = re("numFmts", null, { count: r.length - 2 }).replace("/>", ">"), r.join(""));
}
function Zo(e) {
  var r = [];
  return r[r.length] = re("cellXfs", null), e.forEach(function(t) {
    r[r.length] = re("xf", null, t);
  }), r[r.length] = "</cellXfs>", r.length === 2 ? "" : (r[0] = re("cellXfs", null, { count: r.length - 2 }).replace("/>", ">"), r.join(""));
}
function ts(e, r) {
  var t = [et, re("styleSheet", null, {
    xmlns: Yr[0],
    "xmlns:vt": at.vt
  })], n;
  return e.SSF && (n = Jo(e.SSF)) != null && (t[t.length] = n), t[t.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>', t[t.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>', t[t.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>', t[t.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>', (n = Zo(r.cellXfs)) && (t[t.length] = n), t[t.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>', t[t.length] = '<dxfs count="0"/>', t[t.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>', t.length > 2 && (t[t.length] = "</styleSheet>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function qo(e, r) {
  var t = e.read_shift(2), n = vt(e);
  return [t, n];
}
function Qo(e, r, t) {
  t || (t = U(6 + 4 * r.length)), t.write_shift(2, e), st(r, t);
  var n = t.length > t.l ? t.slice(0, t.l) : t;
  return t.l == null && (t.l = t.length), n;
}
function ec(e, r, t) {
  var n = {};
  n.sz = e.read_shift(2) / 20;
  var a = Wl(e);
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
  var f = e.read_shift(1);
  f > 0 && (n.family = f);
  var l = e.read_shift(1);
  switch (l > 0 && (n.charset = l), e.l++, n.color = Ul(e), e.read_shift(1)) {
    case 1:
      n.scheme = "major";
      break;
    case 2:
      n.scheme = "minor";
      break;
  }
  return n.name = vt(e), n;
}
function tc(e, r) {
  r || (r = U(25 + 4 * 32)), r.write_shift(2, e.sz * 20), $l(e, r), r.write_shift(2, e.bold ? 700 : 400);
  var t = 0;
  e.vertAlign == "superscript" ? t = 1 : e.vertAlign == "subscript" && (t = 2), r.write_shift(2, t), r.write_shift(1, e.underline || 0), r.write_shift(1, e.family || 0), r.write_shift(1, e.charset || 0), r.write_shift(1, 0), Yn(e.color, r);
  var n = 0;
  return n = 2, r.write_shift(1, n), st(e.name, r), r.length > r.l ? r.slice(0, r.l) : r;
}
var rc = [
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
], Ea, nc = Jt;
function H0(e, r) {
  r || (r = U(4 * 3 + 8 * 7 + 16 * 1)), Ea || (Ea = Ma(rc));
  var t = Ea[e.patternType];
  t == null && (t = 40), r.write_shift(4, t);
  var n = 0;
  if (t != 40)
    for (Yn({ auto: 1 }, r), Yn({ auto: 1 }, r); n < 12; ++n) r.write_shift(4, 0);
  else {
    for (; n < 4; ++n) r.write_shift(4, 0);
    for (; n < 12; ++n) r.write_shift(4, 0);
  }
  return r.length > r.l ? r.slice(0, r.l) : r;
}
function ac(e, r) {
  var t = e.l + r, n = e.read_shift(2), a = e.read_shift(2);
  return e.l = t, { ixfe: n, numFmtId: a };
}
function rs(e, r, t) {
  t || (t = U(16)), t.write_shift(2, r || 0), t.write_shift(2, e.numFmtId || 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(1, 0), t.write_shift(1, 0);
  var n = 0;
  return t.write_shift(1, n), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(1, 0), t;
}
function nn(e, r) {
  return r || (r = U(10)), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(4, 0), r.write_shift(4, 0), r;
}
var ic = Jt;
function sc(e, r) {
  return r || (r = U(51)), r.write_shift(1, 0), nn(null, r), nn(null, r), nn(null, r), nn(null, r), nn(null, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function fc(e, r) {
  return r || (r = U(12 + 4 * 10)), r.write_shift(4, e.xfId), r.write_shift(2, 1), r.write_shift(1, 0), r.write_shift(1, 0), zn(e.name || "", r), r.length > r.l ? r.slice(0, r.l) : r;
}
function lc(e, r, t) {
  var n = U(2052);
  return n.write_shift(4, e), zn(r, n), zn(t, n), n.length > n.l ? n.slice(0, n.l) : n;
}
function oc(e, r) {
  if (r) {
    var t = 0;
    [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a) r[a] != null && ++t;
    }), t != 0 && (G(e, 615, Gt(t)), [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a) r[a] != null && G(e, 44, Qo(a, r[a]));
    }), G(
      e,
      616
      /* BrtEndFmts */
    ));
  }
}
function cc(e) {
  var r = 1;
  G(e, 611, Gt(r)), G(e, 43, tc({
    sz: 12,
    color: { theme: 1 },
    name: "Calibri",
    family: 2
  })), G(
    e,
    612
    /* BrtEndFonts */
  );
}
function uc(e) {
  var r = 2;
  G(e, 603, Gt(r)), G(e, 45, H0({ patternType: "none" })), G(e, 45, H0({ patternType: "gray125" })), G(
    e,
    604
    /* BrtEndFills */
  );
}
function hc(e) {
  var r = 1;
  G(e, 613, Gt(r)), G(e, 46, sc()), G(
    e,
    614
    /* BrtEndBorders */
  );
}
function dc(e) {
  var r = 1;
  G(e, 626, Gt(r)), G(e, 47, rs({
    numFmtId: 0
  }, 65535)), G(
    e,
    627
    /* BrtEndCellStyleXFs */
  );
}
function xc(e, r) {
  G(e, 617, Gt(r.length)), r.forEach(function(t) {
    G(e, 47, rs(t, 0));
  }), G(
    e,
    618
    /* BrtEndCellXFs */
  );
}
function vc(e) {
  var r = 1;
  G(e, 619, Gt(r)), G(e, 48, fc({
    xfId: 0,
    name: "Normal"
  })), G(
    e,
    620
    /* BrtEndStyles */
  );
}
function pc(e) {
  var r = 0;
  G(e, 505, Gt(r)), G(
    e,
    506
    /* BrtEndDXFs */
  );
}
function mc(e) {
  var r = 0;
  G(e, 508, lc(r, "TableStyleMedium9", "PivotStyleMedium4")), G(
    e,
    509
    /* BrtEndTableStyles */
  );
}
function gc(e, r) {
  var t = At();
  return G(
    t,
    278
    /* BrtBeginStyleSheet */
  ), oc(t, e.SSF), cc(t), uc(t), hc(t), dc(t), xc(t, r.cellXfs), vc(t), pc(t), mc(t), G(
    t,
    279
    /* BrtEndStyleSheet */
  ), t.end();
}
function ns(e, r) {
  if (r && r.themeXLSX) return r.themeXLSX;
  if (e && typeof e.raw == "string") return e.raw;
  var t = [et];
  return t[t.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">', t[t.length] = "<a:themeElements>", t[t.length] = '<a:clrScheme name="Office">', t[t.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>', t[t.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>', t[t.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>', t[t.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>', t[t.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>', t[t.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>', t[t.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>', t[t.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>', t[t.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>', t[t.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>', t[t.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>', t[t.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>', t[t.length] = "</a:clrScheme>", t[t.length] = '<a:fontScheme name="Office">', t[t.length] = "<a:majorFont>", t[t.length] = '<a:latin typeface="Cambria"/>', t[t.length] = '<a:ea typeface=""/>', t[t.length] = '<a:cs typeface=""/>', t[t.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', t[t.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', t[t.length] = '<a:font script="Hans" typeface="宋体"/>', t[t.length] = '<a:font script="Hant" typeface="新細明體"/>', t[t.length] = '<a:font script="Arab" typeface="Times New Roman"/>', t[t.length] = '<a:font script="Hebr" typeface="Times New Roman"/>', t[t.length] = '<a:font script="Thai" typeface="Tahoma"/>', t[t.length] = '<a:font script="Ethi" typeface="Nyala"/>', t[t.length] = '<a:font script="Beng" typeface="Vrinda"/>', t[t.length] = '<a:font script="Gujr" typeface="Shruti"/>', t[t.length] = '<a:font script="Khmr" typeface="MoolBoran"/>', t[t.length] = '<a:font script="Knda" typeface="Tunga"/>', t[t.length] = '<a:font script="Guru" typeface="Raavi"/>', t[t.length] = '<a:font script="Cans" typeface="Euphemia"/>', t[t.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', t[t.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', t[t.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', t[t.length] = '<a:font script="Thaa" typeface="MV Boli"/>', t[t.length] = '<a:font script="Deva" typeface="Mangal"/>', t[t.length] = '<a:font script="Telu" typeface="Gautami"/>', t[t.length] = '<a:font script="Taml" typeface="Latha"/>', t[t.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', t[t.length] = '<a:font script="Orya" typeface="Kalinga"/>', t[t.length] = '<a:font script="Mlym" typeface="Kartika"/>', t[t.length] = '<a:font script="Laoo" typeface="DokChampa"/>', t[t.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', t[t.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', t[t.length] = '<a:font script="Viet" typeface="Times New Roman"/>', t[t.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', t[t.length] = '<a:font script="Geor" typeface="Sylfaen"/>', t[t.length] = "</a:majorFont>", t[t.length] = "<a:minorFont>", t[t.length] = '<a:latin typeface="Calibri"/>', t[t.length] = '<a:ea typeface=""/>', t[t.length] = '<a:cs typeface=""/>', t[t.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', t[t.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', t[t.length] = '<a:font script="Hans" typeface="宋体"/>', t[t.length] = '<a:font script="Hant" typeface="新細明體"/>', t[t.length] = '<a:font script="Arab" typeface="Arial"/>', t[t.length] = '<a:font script="Hebr" typeface="Arial"/>', t[t.length] = '<a:font script="Thai" typeface="Tahoma"/>', t[t.length] = '<a:font script="Ethi" typeface="Nyala"/>', t[t.length] = '<a:font script="Beng" typeface="Vrinda"/>', t[t.length] = '<a:font script="Gujr" typeface="Shruti"/>', t[t.length] = '<a:font script="Khmr" typeface="DaunPenh"/>', t[t.length] = '<a:font script="Knda" typeface="Tunga"/>', t[t.length] = '<a:font script="Guru" typeface="Raavi"/>', t[t.length] = '<a:font script="Cans" typeface="Euphemia"/>', t[t.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', t[t.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', t[t.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', t[t.length] = '<a:font script="Thaa" typeface="MV Boli"/>', t[t.length] = '<a:font script="Deva" typeface="Mangal"/>', t[t.length] = '<a:font script="Telu" typeface="Gautami"/>', t[t.length] = '<a:font script="Taml" typeface="Latha"/>', t[t.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', t[t.length] = '<a:font script="Orya" typeface="Kalinga"/>', t[t.length] = '<a:font script="Mlym" typeface="Kartika"/>', t[t.length] = '<a:font script="Laoo" typeface="DokChampa"/>', t[t.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', t[t.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', t[t.length] = '<a:font script="Viet" typeface="Arial"/>', t[t.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', t[t.length] = '<a:font script="Geor" typeface="Sylfaen"/>', t[t.length] = "</a:minorFont>", t[t.length] = "</a:fontScheme>", t[t.length] = '<a:fmtScheme name="Office">', t[t.length] = "<a:fillStyleLst>", t[t.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', t[t.length] = '<a:gradFill rotWithShape="1">', t[t.length] = "<a:gsLst>", t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', t[t.length] = "</a:gsLst>", t[t.length] = '<a:lin ang="16200000" scaled="1"/>', t[t.length] = "</a:gradFill>", t[t.length] = '<a:gradFill rotWithShape="1">', t[t.length] = "<a:gsLst>", t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', t[t.length] = "</a:gsLst>", t[t.length] = '<a:lin ang="16200000" scaled="0"/>', t[t.length] = "</a:gradFill>", t[t.length] = "</a:fillStyleLst>", t[t.length] = "<a:lnStyleLst>", t[t.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>', t[t.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', t[t.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', t[t.length] = "</a:lnStyleLst>", t[t.length] = "<a:effectStyleLst>", t[t.length] = "<a:effectStyle>", t[t.length] = "<a:effectLst>", t[t.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>', t[t.length] = "</a:effectLst>", t[t.length] = "</a:effectStyle>", t[t.length] = "<a:effectStyle>", t[t.length] = "<a:effectLst>", t[t.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', t[t.length] = "</a:effectLst>", t[t.length] = "</a:effectStyle>", t[t.length] = "<a:effectStyle>", t[t.length] = "<a:effectLst>", t[t.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', t[t.length] = "</a:effectLst>", t[t.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>', t[t.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>', t[t.length] = "</a:effectStyle>", t[t.length] = "</a:effectStyleLst>", t[t.length] = "<a:bgFillStyleLst>", t[t.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', t[t.length] = '<a:gradFill rotWithShape="1">', t[t.length] = "<a:gsLst>", t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>', t[t.length] = "</a:gsLst>", t[t.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>', t[t.length] = "</a:gradFill>", t[t.length] = '<a:gradFill rotWithShape="1">', t[t.length] = "<a:gsLst>", t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>', t[t.length] = "</a:gsLst>", t[t.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>', t[t.length] = "</a:gradFill>", t[t.length] = "</a:bgFillStyleLst>", t[t.length] = "</a:fmtScheme>", t[t.length] = "</a:themeElements>", t[t.length] = "<a:objectDefaults>", t[t.length] = "<a:spDef>", t[t.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>', t[t.length] = "</a:spDef>", t[t.length] = "<a:lnDef>", t[t.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>', t[t.length] = "</a:lnDef>", t[t.length] = "</a:objectDefaults>", t[t.length] = "<a:extraClrSchemeLst/>", t[t.length] = "</a:theme>", t.join("");
}
function _c(e, r) {
  return {
    flags: e.read_shift(4),
    version: e.read_shift(4),
    name: vt(e)
  };
}
function Tc(e) {
  var r = U(12 + 2 * e.name.length);
  return r.write_shift(4, e.flags), r.write_shift(4, e.version), st(e.name, r), r.slice(0, r.l);
}
function Ec(e) {
  for (var r = [], t = e.read_shift(4); t-- > 0; )
    r.push([e.read_shift(4), e.read_shift(4)]);
  return r;
}
function wc(e) {
  var r = U(4 + 8 * e.length);
  r.write_shift(4, e.length);
  for (var t = 0; t < e.length; ++t)
    r.write_shift(4, e[t][0]), r.write_shift(4, e[t][1]);
  return r;
}
function Sc(e, r) {
  var t = U(8 + 2 * r.length);
  return t.write_shift(4, e), st(r, t), t.slice(0, t.l);
}
function Ac(e) {
  return e.l += 4, e.read_shift(4) != 0;
}
function yc(e, r) {
  var t = U(8);
  return t.write_shift(4, e), t.write_shift(4, 1), t;
}
function Fc() {
  var e = At();
  return G(e, 332), G(e, 334, Gt(1)), G(e, 335, Tc({
    name: "XLDAPR",
    version: 12e4,
    flags: 3496657072
  })), G(e, 336), G(e, 339, Sc(1, "XLDAPR")), G(e, 52), G(e, 35, Gt(514)), G(e, 4096, Gt(0)), G(e, 4097, Lt(1)), G(e, 36), G(e, 53), G(e, 340), G(e, 337, yc(1)), G(e, 51, wc([[1, 0]])), G(e, 338), G(e, 333), e.end();
}
function as() {
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
function kc(e) {
  var r = {};
  r.i = e.read_shift(4);
  var t = {};
  t.r = e.read_shift(4), t.c = e.read_shift(4), r.r = Be(t);
  var n = e.read_shift(1);
  return n & 2 && (r.l = "1"), n & 8 && (r.a = "1"), r;
}
var $r = 1024;
function is(e, r) {
  for (var t = [21600, 21600], n = ["m0,0l0", t[1], t[0], t[1], t[0], "0xe"].join(","), a = [
    re("xml", null, { "xmlns:v": Dt.v, "xmlns:o": Dt.o, "xmlns:x": Dt.x, "xmlns:mv": Dt.mv }).replace(/\/>/, ">"),
    re("o:shapelayout", re("o:idmap", null, { "v:ext": "edit", data: e }), { "v:ext": "edit" }),
    re("v:shapetype", [
      re("v:stroke", null, { joinstyle: "miter" }),
      re("v:path", null, { gradientshapeok: "t", "o:connecttype": "rect" })
    ].join(""), { id: "_x0000_t202", "o:spt": 202, coordsize: t.join(","), path: n })
  ]; $r < e * 1e3; ) $r += 1e3;
  return r.forEach(function(i) {
    var s = it(i[0]), f = (
      /*::(*/
      { color2: "#BEFF82", type: "gradient" }
    );
    f.type == "gradient" && (f.angle = "-180");
    var l = f.type == "gradient" ? re("o:fill", null, { type: "gradientUnscaled", "v:ext": "view" }) : null, o = re("v:fill", l, f), c = { on: "t", obscured: "t" };
    ++$r, a = a.concat([
      "<v:shape" + gn({
        id: "_x0000_s" + $r,
        type: "#_x0000_t202",
        style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" + (i[1].hidden ? ";visibility:hidden" : ""),
        fillcolor: "#ECFAD4",
        strokecolor: "#edeaa1"
      }) + ">",
      o,
      re("v:shadow", null, c),
      re("v:path", null, { "o:connecttype": "none" }),
      '<v:textbox><div style="text-align:left"></div></v:textbox>',
      '<x:ClientData ObjectType="Note">',
      "<x:MoveWithCells/>",
      "<x:SizeWithCells/>",
      /* Part 4 19.4.2.3 Anchor (Anchor) */
      ct("x:Anchor", [s.c + 1, 0, s.r + 1, 0, s.c + 3, 20, s.r + 5, 20].join(",")),
      ct("x:AutoFill", "False"),
      ct("x:Row", String(s.r)),
      ct("x:Column", String(s.c)),
      i[1].hidden ? "" : "<x:Visible/>",
      "</x:ClientData>",
      "</v:shape>"
    ]);
  }), a.push("</xml>"), a.join("");
}
function ss(e) {
  var r = [et, re("comments", null, { xmlns: Yr[0] })], t = [];
  return r.push("<authors>"), e.forEach(function(n) {
    n[1].forEach(function(a) {
      var i = Me(a.a);
      t.indexOf(i) == -1 && (t.push(i), r.push("<author>" + i + "</author>")), a.T && a.ID && t.indexOf("tc=" + a.ID) == -1 && (t.push("tc=" + a.ID), r.push("<author>tc=" + a.ID + "</author>"));
    });
  }), t.length == 0 && (t.push("SheetJ5"), r.push("<author>SheetJ5</author>")), r.push("</authors>"), r.push("<commentList>"), e.forEach(function(n) {
    var a = 0, i = [];
    if (n[1][0] && n[1][0].T && n[1][0].ID ? a = t.indexOf("tc=" + n[1][0].ID) : n[1].forEach(function(l) {
      l.a && (a = t.indexOf(Me(l.a))), i.push(l.t || "");
    }), r.push('<comment ref="' + n[0] + '" authorId="' + a + '"><text>'), i.length <= 1) r.push(ct("t", Me(i[0] || "")));
    else {
      for (var s = `Comment:
    ` + i[0] + `
`, f = 1; f < i.length; ++f) s += `Reply:
    ` + i[f] + `
`;
      r.push(ct("t", Me(s)));
    }
    r.push("</text></comment>");
  }), r.push("</commentList>"), r.length > 2 && (r[r.length] = "</comments>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Cc(e, r, t) {
  var n = [et, re("ThreadedComments", null, { xmlns: at.TCMNT }).replace(/[\/]>/, ">")];
  return e.forEach(function(a) {
    var i = "";
    (a[1] || []).forEach(function(s, f) {
      if (!s.T) {
        delete s.ID;
        return;
      }
      s.a && r.indexOf(s.a) == -1 && r.push(s.a);
      var l = {
        ref: a[0],
        id: "{54EE7951-7262-4200-6969-" + ("000000000000" + t.tcid++).slice(-12) + "}"
      };
      f == 0 ? i = l.id : l.parentId = i, s.ID = l.id, s.a && (l.personId = "{54EE7950-7262-4200-6969-" + ("000000000000" + r.indexOf(s.a)).slice(-12) + "}"), n.push(re("threadedComment", ct("text", s.t || ""), l));
    });
  }), n.push("</ThreadedComments>"), n.join("");
}
function Dc(e) {
  var r = [et, re("personList", null, {
    xmlns: at.TCMNT,
    "xmlns:x": Yr[0]
  }).replace(/[\/]>/, ">")];
  return e.forEach(function(t, n) {
    r.push(re("person", null, {
      displayName: t,
      id: "{54EE7950-7262-4200-6969-" + ("000000000000" + n).slice(-12) + "}",
      userId: t,
      providerId: "None"
    }));
  }), r.push("</personList>"), r.join("");
}
function Oc(e) {
  var r = {};
  r.iauthor = e.read_shift(4);
  var t = Or(e);
  return r.rfx = t.s, r.ref = Be(t.s), e.l += 16, r;
}
function Ic(e, r) {
  return r == null && (r = U(36)), r.write_shift(4, e[1].iauthor), Jr(e[0], r), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(4, 0), r;
}
var Rc = vt;
function Nc(e) {
  return st(e.slice(0, 54));
}
function Pc(e) {
  var r = At(), t = [];
  return G(
    r,
    628
    /* BrtBeginComments */
  ), G(
    r,
    630
    /* BrtBeginCommentAuthors */
  ), e.forEach(function(n) {
    n[1].forEach(function(a) {
      t.indexOf(a.a) > -1 || (t.push(a.a.slice(0, 54)), G(r, 632, Nc(a.a)));
    });
  }), G(
    r,
    631
    /* BrtEndCommentAuthors */
  ), G(
    r,
    633
    /* BrtBeginCommentList */
  ), e.forEach(function(n) {
    n[1].forEach(function(a) {
      a.iauthor = t.indexOf(a.a);
      var i = { s: it(n[0]), e: it(n[0]) };
      G(r, 635, Ic([i, a])), a.t && a.t.length > 0 && G(r, 637, Ll(a)), G(
        r,
        636
        /* BrtEndComment */
      ), delete a.iauthor;
    });
  }), G(
    r,
    634
    /* BrtEndCommentList */
  ), G(
    r,
    629
    /* BrtEndComments */
  ), r.end();
}
function Lc(e, r) {
  r.FullPaths.forEach(function(t, n) {
    if (n != 0) {
      var a = t.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
      a.slice(-1) !== "/" && be.utils.cfb_add(e, a, r.FileIndex[n].content);
    }
  });
}
var fs = ["xlsb", "xlsm", "xlam", "biff8", "xla"], Mc = /* @__PURE__ */ function() {
  var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g, r = { r: 0, c: 0 };
  function t(n, a, i, s) {
    var f = !1, l = !1;
    i.length == 0 ? l = !0 : i.charAt(0) == "[" && (l = !0, i = i.slice(1, -1)), s.length == 0 ? f = !0 : s.charAt(0) == "[" && (f = !0, s = s.slice(1, -1));
    var o = i.length > 0 ? parseInt(i, 10) | 0 : 0, c = s.length > 0 ? parseInt(s, 10) | 0 : 0;
    return f ? c += r.c : --c, l ? o += r.r : --o, a + (f ? "" : "$") + xt(c) + (l ? "" : "$") + ut(o);
  }
  return function(a, i) {
    return r = i, a.replace(e, t);
  };
}(), Ka = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g, Ja = /* @__PURE__ */ function() {
  return function(r, t) {
    return r.replace(Ka, function(n, a, i, s, f, l) {
      var o = Va(s) - (i ? 0 : t.c), c = Ha(l) - (f ? 0 : t.r), p = c == 0 ? "" : f ? c + 1 : "[" + c + "]", v = o == 0 ? "" : i ? o + 1 : "[" + o + "]";
      return a + "R" + p + "C" + v;
    });
  };
}();
function Bc(e, r) {
  return e.replace(Ka, function(t, n, a, i, s, f) {
    return n + (a == "$" ? a + i : xt(Va(i) + r.c)) + (s == "$" ? s + f : ut(Ha(f) + r.r));
  });
}
function bc(e) {
  return e.length != 1;
}
function qe(e) {
  e.l += 1;
}
function pr(e, r) {
  var t = e.read_shift(2);
  return [t & 16383, t >> 14 & 1, t >> 15 & 1];
}
function ls(e, r, t) {
  var n = 2;
  if (t) {
    if (t.biff >= 2 && t.biff <= 5) return os(e);
    t.biff == 12 && (n = 4);
  }
  var a = e.read_shift(n), i = e.read_shift(n), s = pr(e), f = pr(e);
  return { s: { r: a, c: s[0], cRel: s[1], rRel: s[2] }, e: { r: i, c: f[0], cRel: f[1], rRel: f[2] } };
}
function os(e) {
  var r = pr(e), t = pr(e), n = e.read_shift(1), a = e.read_shift(1);
  return { s: { r: r[0], c: n, cRel: r[1], rRel: r[2] }, e: { r: t[0], c: a, cRel: t[1], rRel: t[2] } };
}
function Uc(e, r, t) {
  if (t.biff < 8) return os(e);
  var n = e.read_shift(t.biff == 12 ? 4 : 2), a = e.read_shift(t.biff == 12 ? 4 : 2), i = pr(e), s = pr(e);
  return { s: { r: n, c: i[0], cRel: i[1], rRel: i[2] }, e: { r: a, c: s[0], cRel: s[1], rRel: s[2] } };
}
function cs(e, r, t) {
  if (t && t.biff >= 2 && t.biff <= 5) return Wc(e);
  var n = e.read_shift(t && t.biff == 12 ? 4 : 2), a = pr(e);
  return { r: n, c: a[0], cRel: a[1], rRel: a[2] };
}
function Wc(e) {
  var r = pr(e), t = e.read_shift(1);
  return { r: r[0], c: t, cRel: r[1], rRel: r[2] };
}
function $c(e) {
  var r = e.read_shift(2), t = e.read_shift(2);
  return { r, c: t & 255, fQuoted: !!(t & 16384), cRel: t >> 15, rRel: t >> 15 };
}
function Hc(e, r, t) {
  var n = t && t.biff ? t.biff : 8;
  if (n >= 2 && n <= 5) return Vc(e);
  var a = e.read_shift(n >= 12 ? 4 : 2), i = e.read_shift(2), s = (i & 16384) >> 14, f = (i & 32768) >> 15;
  if (i &= 16383, f == 1) for (; a > 524287; ) a -= 1048576;
  if (s == 1) for (; i > 8191; ) i = i - 16384;
  return { r: a, c: i, cRel: s, rRel: f };
}
function Vc(e) {
  var r = e.read_shift(2), t = e.read_shift(1), n = (r & 32768) >> 15, a = (r & 16384) >> 14;
  return r &= 16383, n == 1 && r >= 8192 && (r = r - 16384), a == 1 && t >= 128 && (t = t - 256), { r, c: t, cRel: a, rRel: n };
}
function Gc(e, r, t) {
  var n = (e[e.l++] & 96) >> 5, a = ls(e, t.biff >= 2 && t.biff <= 5 ? 6 : 8, t);
  return [n, a];
}
function jc(e, r, t) {
  var n = (e[e.l++] & 96) >> 5, a = e.read_shift(2, "i"), i = 8;
  if (t) switch (t.biff) {
    case 5:
      e.l += 12, i = 6;
      break;
    case 12:
      i = 12;
      break;
  }
  var s = ls(e, i, t);
  return [n, a, s];
}
function Xc(e, r, t) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += t && t.biff > 8 ? 12 : t.biff < 8 ? 6 : 8, [n];
}
function zc(e, r, t) {
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
function Yc(e, r, t) {
  var n = (e[e.l++] & 96) >> 5, a = Uc(e, r - 1, t);
  return [n, a];
}
function Kc(e, r, t) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += t.biff == 2 ? 6 : t.biff == 12 ? 14 : 7, [n];
}
function V0(e) {
  var r = e[e.l + 1] & 1, t = 1;
  return e.l += 4, [r, t];
}
function Jc(e, r, t) {
  e.l += 2;
  for (var n = e.read_shift(t && t.biff == 2 ? 1 : 2), a = [], i = 0; i <= n; ++i) a.push(e.read_shift(t && t.biff == 2 ? 1 : 2));
  return a;
}
function Zc(e, r, t) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(t && t.biff == 2 ? 1 : 2)];
}
function qc(e, r, t) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(t && t.biff == 2 ? 1 : 2)];
}
function Qc(e) {
  var r = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [r, e.read_shift(2)];
}
function eu(e, r, t) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += t && t.biff == 2 ? 3 : 4, [n];
}
function us(e) {
  var r = e.read_shift(1), t = e.read_shift(1);
  return [r, t];
}
function tu(e) {
  return e.read_shift(2), us(e);
}
function ru(e) {
  return e.read_shift(2), us(e);
}
function nu(e, r, t) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = cs(e, 0, t);
  return [n, a];
}
function au(e, r, t) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = Hc(e, 0, t);
  return [n, a];
}
function iu(e, r, t) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(2);
  t && t.biff == 5 && (e.l += 12);
  var i = cs(e, 0, t);
  return [n, a, i];
}
function su(e, r, t) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(t && t.biff <= 3 ? 1 : 2);
  return [s1[a], xs[a], n];
}
function fu(e, r, t) {
  var n = e[e.l++], a = e.read_shift(1), i = t && t.biff <= 3 ? [n == 88 ? -1 : 0, e.read_shift(1)] : lu(e);
  return [a, (i[0] === 0 ? xs : i1)[i[1]]];
}
function lu(e) {
  return [e[e.l + 1] >> 7, e.read_shift(2) & 32767];
}
function ou(e, r, t) {
  e.l += t && t.biff == 2 ? 3 : 4;
}
function cu(e, r, t) {
  if (e.l++, t && t.biff == 12) return [e.read_shift(4, "i"), 0];
  var n = e.read_shift(2), a = e.read_shift(t && t.biff == 2 ? 1 : 2);
  return [n, a];
}
function uu(e) {
  return e.l++, yn[e.read_shift(1)];
}
function hu(e) {
  return e.l++, e.read_shift(2);
}
function du(e) {
  return e.l++, e.read_shift(1) !== 0;
}
function xu(e) {
  return e.l++, Zr(e);
}
function vu(e, r, t) {
  return e.l++, zi(e, r - 1, t);
}
function pu(e, r) {
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
      t[1] = ao(e, 1) ? "TRUE" : "FALSE", r != 12 && (e.l += 7);
      break;
    case 37:
    case 16:
      t[1] = yn[e[e.l]], e.l += r == 12 ? 4 : 8;
      break;
    case 0:
      e.l += 8;
      break;
    case 1:
      t[1] = Zr(e);
      break;
    case 2:
      t[1] = lo(e, 0, { biff: r > 0 && r < 8 ? 2 : r });
      break;
    default:
      throw new Error("Bad SerAr: " + t[0]);
  }
  return t;
}
function mu(e, r, t) {
  for (var n = e.read_shift(t.biff == 12 ? 4 : 2), a = [], i = 0; i != n; ++i) a.push((t.biff == 12 ? Or : uo)(e));
  return a;
}
function gu(e, r, t) {
  var n = 0, a = 0;
  t.biff == 12 ? (n = e.read_shift(4), a = e.read_shift(4)) : (a = 1 + e.read_shift(1), n = 1 + e.read_shift(2)), t.biff >= 2 && t.biff < 8 && (--n, --a == 0 && (a = 256));
  for (var i = 0, s = []; i != n && (s[i] = []); ++i)
    for (var f = 0; f != a; ++f) s[i][f] = pu(e, t.biff);
  return s;
}
function _u(e, r, t) {
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
function Tu(e, r, t) {
  if (t.biff == 5) return Eu(e);
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(2), i = e.read_shift(4);
  return [n, a, i];
}
function Eu(e) {
  var r = e.read_shift(1) >>> 5 & 3, t = e.read_shift(2, "i");
  e.l += 8;
  var n = e.read_shift(2);
  return e.l += 12, [r, t, n];
}
function wu(e, r, t) {
  var n = e.read_shift(1) >>> 5 & 3;
  e.l += t && t.biff == 2 ? 3 : 4;
  var a = e.read_shift(t && t.biff == 2 ? 1 : 2);
  return [n, a];
}
function Su(e, r, t) {
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(t && t.biff == 2 ? 1 : 2);
  return [n, a];
}
function Au(e, r, t) {
  var n = e.read_shift(1) >>> 5 & 3;
  return e.l += 4, t.biff < 8 && e.l--, t.biff == 12 && (e.l += 2), [n];
}
function yu(e, r, t) {
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
var Fu = Jt, ku = Jt, Cu = Jt;
function Fn(e, r, t) {
  return e.l += 2, [$c(e)];
}
function Za(e) {
  return e.l += 6, [];
}
var Du = Fn, Ou = Za, Iu = Za, Ru = Fn;
function hs(e) {
  return e.l += 2, [ji(e), e.read_shift(2) & 1];
}
var Nu = Fn, Pu = hs, Lu = Za, Mu = Fn, Bu = Fn, bu = [
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
function Uu(e) {
  e.l += 2;
  var r = e.read_shift(2), t = e.read_shift(2), n = e.read_shift(4), a = e.read_shift(2), i = e.read_shift(2), s = bu[t >> 2 & 31];
  return { ixti: r, coltype: t & 3, rt: s, idx: n, c: a, C: i };
}
function Wu(e) {
  return e.l += 2, [e.read_shift(4)];
}
function $u(e, r, t) {
  return e.l += 5, e.l += 2, e.l += t.biff == 2 ? 1 : 4, ["PTGSHEET"];
}
function Hu(e, r, t) {
  return e.l += t.biff == 2 ? 4 : 5, ["PTGENDSHEET"];
}
function Vu(e) {
  var r = e.read_shift(1) >>> 5 & 3, t = e.read_shift(2);
  return [r, t];
}
function Gu(e) {
  var r = e.read_shift(1) >>> 5 & 3, t = e.read_shift(2);
  return [r, t];
}
function ju(e) {
  return e.l += 4, [0, 0];
}
var G0 = {
  /*::[*/
  1: { n: "PtgExp", f: cu },
  /*::[*/
  2: { n: "PtgTbl", f: Cu },
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
  23: { n: "PtgStr", f: vu },
  /*::[*/
  26: { n: "PtgSheet", f: $u },
  /*::[*/
  27: { n: "PtgEndSheet", f: Hu },
  /*::[*/
  28: { n: "PtgErr", f: uu },
  /*::[*/
  29: { n: "PtgBool", f: du },
  /*::[*/
  30: { n: "PtgInt", f: hu },
  /*::[*/
  31: { n: "PtgNum", f: xu },
  /*::[*/
  32: { n: "PtgArray", f: Kc },
  /*::[*/
  33: { n: "PtgFunc", f: su },
  /*::[*/
  34: { n: "PtgFuncVar", f: fu },
  /*::[*/
  35: { n: "PtgName", f: _u },
  /*::[*/
  36: { n: "PtgRef", f: nu },
  /*::[*/
  37: { n: "PtgArea", f: Gc },
  /*::[*/
  38: { n: "PtgMemArea", f: wu },
  /*::[*/
  39: { n: "PtgMemErr", f: Fu },
  /*::[*/
  40: { n: "PtgMemNoMem", f: ku },
  /*::[*/
  41: { n: "PtgMemFunc", f: Su },
  /*::[*/
  42: { n: "PtgRefErr", f: Au },
  /*::[*/
  43: { n: "PtgAreaErr", f: Xc },
  /*::[*/
  44: { n: "PtgRefN", f: au },
  /*::[*/
  45: { n: "PtgAreaN", f: Yc },
  /*::[*/
  46: { n: "PtgMemAreaN", f: Vu },
  /*::[*/
  47: { n: "PtgMemNoMemN", f: Gu },
  /*::[*/
  57: { n: "PtgNameX", f: Tu },
  /*::[*/
  58: { n: "PtgRef3d", f: iu },
  /*::[*/
  59: { n: "PtgArea3d", f: jc },
  /*::[*/
  60: { n: "PtgRefErr3d", f: yu },
  /*::[*/
  61: { n: "PtgAreaErr3d", f: zc },
  /*::[*/
  255: {}
}, Xu = {
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
}, zu = {
  /*::[*/
  1: { n: "PtgElfLel", f: hs },
  /*::[*/
  2: { n: "PtgElfRw", f: Mu },
  /*::[*/
  3: { n: "PtgElfCol", f: Du },
  /*::[*/
  6: { n: "PtgElfRwV", f: Bu },
  /*::[*/
  7: { n: "PtgElfColV", f: Ru },
  /*::[*/
  10: { n: "PtgElfRadical", f: Nu },
  /*::[*/
  11: { n: "PtgElfRadicalS", f: Lu },
  /*::[*/
  13: { n: "PtgElfColS", f: Ou },
  /*::[*/
  15: { n: "PtgElfColSV", f: Iu },
  /*::[*/
  16: { n: "PtgElfRadicalLel", f: Pu },
  /*::[*/
  25: { n: "PtgList", f: Uu },
  /*::[*/
  29: { n: "PtgSxName", f: Wu },
  /*::[*/
  255: {}
}, Yu = {
  /*::[*/
  0: { n: "PtgAttrNoop", f: ju },
  /*::[*/
  1: { n: "PtgAttrSemi", f: eu },
  /*::[*/
  2: { n: "PtgAttrIf", f: qc },
  /*::[*/
  4: { n: "PtgAttrChoose", f: Jc },
  /*::[*/
  8: { n: "PtgAttrGoto", f: Zc },
  /*::[*/
  16: { n: "PtgAttrSum", f: ou },
  /*::[*/
  32: { n: "PtgAttrBaxcel", f: V0 },
  /*::[*/
  33: { n: "PtgAttrBaxcel", f: V0 },
  /*::[*/
  64: { n: "PtgAttrSpace", f: tu },
  /*::[*/
  65: { n: "PtgAttrSpaceSemi", f: ru },
  /*::[*/
  128: { n: "PtgAttrIfError", f: Qc },
  /*::[*/
  255: {}
};
function Ku(e, r, t, n) {
  if (n.biff < 8) return Jt(e, r);
  for (var a = e.l + r, i = [], s = 0; s !== t.length; ++s)
    switch (t[s][0]) {
      case "PtgArray":
        t[s][1] = gu(e, 0, n), i.push(t[s][1]);
        break;
      case "PtgMemArea":
        t[s][2] = mu(e, t[s][1], n), i.push(t[s][2]);
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
  return r = a - e.l, r !== 0 && i.push(Jt(e, r)), i;
}
function Ju(e, r, t) {
  for (var n = e.l + r, a, i, s = []; n != e.l; )
    r = n - e.l, i = e[e.l], a = G0[i] || G0[Xu[i]], (i === 24 || i === 25) && (a = (i === 24 ? zu : Yu)[e[e.l + 1]]), !a || !a.f ? Jt(e, r) : s.push([a.n, a.f(e, r, t)]);
  return s;
}
function Zu(e) {
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
var qu = {
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
function Qu(e, r) {
  if (!e && !(r && r.biff <= 5 && r.biff >= 2)) throw new Error("empty sheet name");
  return /[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e) ? "'" + e + "'" : e;
}
function ds(e, r, t) {
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
function j0(e, r, t) {
  var n = ds(e, r, t);
  return n == "#REF" ? n : Qu(n, t);
}
function Xr(e, r, t, n, a) {
  var i = a && a.biff || 8, s = (
    /*range != null ? range :*/
    { s: { c: 0, r: 0 } }
  ), f = [], l, o, c, p = 0, v = 0, h, m = "";
  if (!e[0] || !e[0][0]) return "";
  for (var u = -1, d = "", A = 0, k = e[0].length; A < k; ++A) {
    var C = e[0][A];
    switch (C[0]) {
      case "PtgUminus":
        f.push("-" + f.pop());
        break;
      case "PtgUplus":
        f.push("+" + f.pop());
        break;
      case "PtgPercent":
        f.push(f.pop() + "%");
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
        if (l = f.pop(), o = f.pop(), u >= 0) {
          switch (e[0][u][1][0]) {
            case 0:
              d = ze(" ", e[0][u][1][1]);
              break;
            case 1:
              d = ze("\r", e[0][u][1][1]);
              break;
            default:
              if (d = "", a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][u][1][0]);
          }
          o = o + d, u = -1;
        }
        f.push(o + qu[C[0]] + l);
        break;
      case "PtgIsect":
        l = f.pop(), o = f.pop(), f.push(o + " " + l);
        break;
      case "PtgUnion":
        l = f.pop(), o = f.pop(), f.push(o + "," + l);
        break;
      case "PtgRange":
        l = f.pop(), o = f.pop(), f.push(o + ":" + l);
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
        c = cn(C[1][1], s, a), f.push(un(c, i));
        break;
      case "PtgRefN":
        c = t ? cn(C[1][1], t, a) : C[1][1], f.push(un(c, i));
        break;
      case "PtgRef3d":
        p = /*::Number(*/
        C[1][1], c = cn(C[1][2], s, a), m = j0(n, p, a), f.push(m + "!" + un(c, i));
        break;
      case "PtgFunc":
      case "PtgFuncVar":
        var M = C[1][0], Q = C[1][1];
        M || (M = 0), M &= 127;
        var ce = M == 0 ? [] : f.slice(-M);
        f.length -= M, Q === "User" && (Q = ce.shift()), f.push(Q + "(" + ce.join(",") + ")");
        break;
      case "PtgBool":
        f.push(C[1] ? "TRUE" : "FALSE");
        break;
      case "PtgInt":
        f.push(
          /*::String(*/
          C[1]
          /*::)*/
        );
        break;
      case "PtgNum":
        f.push(String(C[1]));
        break;
      case "PtgStr":
        f.push('"' + C[1].replace(/"/g, '""') + '"');
        break;
      case "PtgErr":
        f.push(
          /*::String(*/
          C[1]
          /*::)*/
        );
        break;
      case "PtgAreaN":
        h = D0(C[1][1], t ? { s: t } : s, a), f.push(_a(h, a));
        break;
      case "PtgArea":
        h = D0(C[1][1], s, a), f.push(_a(h, a));
        break;
      case "PtgArea3d":
        p = /*::Number(*/
        C[1][1], h = C[1][2], m = j0(n, p, a), f.push(m + "!" + _a(h, a));
        break;
      case "PtgAttrSum":
        f.push("SUM(" + f.pop() + ")");
        break;
      case "PtgAttrBaxcel":
      case "PtgAttrSemi":
        break;
      case "PtgName":
        v = C[1][2];
        var O = (n.names || [])[v - 1] || (n[0] || [])[v], H = O ? O.Name : "SH33TJSNAME" + String(v);
        H && H.slice(0, 6) == "_xlfn." && !a.xlfn && (H = H.slice(6)), f.push(H);
        break;
      case "PtgNameX":
        var D = C[1][1];
        v = C[1][2];
        var j;
        if (a.biff <= 5)
          D < 0 && (D = -D), n[D] && (j = n[D][v]);
        else {
          var X = "";
          if (((n[D] || [])[0] || [])[0] == 14849 || (((n[D] || [])[0] || [])[0] == 1025 ? n[D][v] && n[D][v].itab > 0 && (X = n.SheetNames[n[D][v].itab - 1] + "!") : X = n.SheetNames[v - 1] + "!"), n[D] && n[D][v]) X += n[D][v].Name;
          else if (n[0] && n[0][v]) X += n[0][v].Name;
          else {
            var Y = (ds(n, D, a) || "").split(";;");
            Y[v - 1] ? X = Y[v - 1] : X += "SH33TJSERRX";
          }
          f.push(X);
          break;
        }
        j || (j = { Name: "SH33TJSERRY" }), f.push(j.Name);
        break;
      case "PtgParen":
        var ue = "(", V = ")";
        if (u >= 0) {
          switch (d = "", e[0][u][1][0]) {
            case 2:
              ue = ze(" ", e[0][u][1][1]) + ue;
              break;
            case 3:
              ue = ze("\r", e[0][u][1][1]) + ue;
              break;
            case 4:
              V = ze(" ", e[0][u][1][1]) + V;
              break;
            case 5:
              V = ze("\r", e[0][u][1][1]) + V;
              break;
            default:
              if (a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][u][1][0]);
          }
          u = -1;
        }
        f.push(ue + f.pop() + V);
        break;
      case "PtgRefErr":
        f.push("#REF!");
        break;
      case "PtgRefErr3d":
        f.push("#REF!");
        break;
      case "PtgExp":
        c = { c: C[1][1], r: C[1][0] };
        var b = { c: t.c, r: t.r };
        if (n.sharedf[Be(c)]) {
          var K = n.sharedf[Be(c)];
          f.push(Xr(K, s, b, n, a));
        } else {
          var J = !1;
          for (l = 0; l != n.arrayf.length; ++l)
            if (o = n.arrayf[l], !(c.c < o[0].s.c || c.c > o[0].e.c) && !(c.r < o[0].s.r || c.r > o[0].e.r)) {
              f.push(Xr(o[1], s, b, n, a)), J = !0;
              break;
            }
          J || f.push(
            /*::String(*/
            C[1]
            /*::)*/
          );
        }
        break;
      case "PtgArray":
        f.push("{" + Zu(
          /*::(*/
          C[1]
          /*:: :any)*/
        ) + "}");
        break;
      case "PtgMemArea":
        break;
      case "PtgAttrSpace":
      case "PtgAttrSpaceSemi":
        u = A;
        break;
      case "PtgTbl":
        break;
      case "PtgMemErr":
        break;
      case "PtgMissArg":
        f.push("");
        break;
      case "PtgAreaErr":
        f.push("#REF!");
        break;
      case "PtgAreaErr3d":
        f.push("#REF!");
        break;
      case "PtgList":
        f.push("Table" + C[1].idx + "[#" + C[1].rt + "]");
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
        throw new Error("Unrecognized Formula Token: " + String(C));
      default:
        throw new Error("Unrecognized Formula Token: " + String(C));
    }
    var he = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
    if (a.biff != 3 && u >= 0 && he.indexOf(e[0][A][0]) == -1) {
      C = e[0][u];
      var _e = !0;
      switch (C[1][0]) {
        case 4:
          _e = !1;
        case 0:
          d = ze(" ", C[1][1]);
          break;
        case 5:
          _e = !1;
        case 1:
          d = ze("\r", C[1][1]);
          break;
        default:
          if (d = "", a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + C[1][0]);
      }
      f.push((_e ? d : "") + f.pop() + (_e ? "" : d)), u = -1;
    }
  }
  if (f.length > 1 && a.WTF) throw new Error("bad formula stack");
  return f[0];
}
function e1(e) {
  if (e == null) {
    var r = U(8);
    return r.write_shift(1, 3), r.write_shift(1, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 65535), r;
  } else if (typeof e == "number") return Ar(e);
  return Ar(0);
}
function t1(e, r, t, n, a) {
  var i = yr(r, t, a), s = e1(e.v), f = U(6), l = 33;
  f.write_shift(2, l), f.write_shift(4, 0);
  for (var o = U(e.bf.length), c = 0; c < e.bf.length; ++c) o[c] = e.bf[c];
  var p = ot([i, s, f, o]);
  return p;
}
function sa(e, r, t) {
  var n = e.read_shift(4), a = Ju(e, n, t), i = e.read_shift(4), s = i > 0 ? Ku(e, i, a, t) : null;
  return [a, s];
}
var r1 = sa, fa = sa, n1 = sa, a1 = sa, i1 = {
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
}, xs = {
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
}, s1 = {
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
  var r = "of:=" + e.replace(Ka, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
  return r.replace(/;/g, "|").replace(/,/g, ";");
}
function l1(e) {
  return e.replace(/\./, "!");
}
var hn = typeof Map < "u";
function qa(e, r, t) {
  var n = 0, a = e.length;
  if (t) {
    if (hn ? t.has(r) : Object.prototype.hasOwnProperty.call(t, r)) {
      for (var i = hn ? t.get(r) : t[r]; n < i.length; ++n)
        if (e[i[n]].t === r)
          return e.Count++, i[n];
    }
  } else for (; n < a; ++n)
    if (e[n].t === r)
      return e.Count++, n;
  return e[a] = { t: r }, e.Count++, e.Unique++, t && (hn ? (t.has(r) || t.set(r, []), t.get(r).push(a)) : (Object.prototype.hasOwnProperty.call(t, r) || (t[r] = []), t[r].push(a))), a;
}
function la(e, r) {
  var t = { min: e + 1, max: e + 1 }, n = -1;
  return r.MDW && (rr = r.MDW), r.width != null ? t.customWidth = 1 : r.wpx != null ? n = Zn(r.wpx) : r.wch != null && (n = r.wch), n > -1 ? (t.width = Ra(n), t.customWidth = 1) : r.width != null && (t.width = r.width), r.hidden && (t.hidden = !0), r.level != null && (t.outlineLevel = t.level = r.level), t;
}
function vs(e, r) {
  if (e) {
    var t = [0.7, 0.7, 0.75, 0.75, 0.3, 0.3];
    e.left == null && (e.left = t[0]), e.right == null && (e.right = t[1]), e.top == null && (e.top = t[2]), e.bottom == null && (e.bottom = t[3]), e.header == null && (e.header = t[4]), e.footer == null && (e.footer = t[5]);
  }
}
function gr(e, r, t) {
  var n = t.revssf[r.z != null ? r.z : "General"], a = 60, i = e.length;
  if (n == null && t.ssf) {
    for (; a < 392; ++a) if (t.ssf[a] == null) {
      ci(r.z, a), t.ssf[a] = r.z, t.revssf[r.z] = n = a;
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
function o1(e, r, t) {
  if (e && e["!ref"]) {
    var n = $e(e["!ref"]);
    if (n.e.c < n.s.c || n.e.r < n.s.r) throw new Error("Bad range (" + t + "): " + e["!ref"]);
  }
}
function c1(e) {
  if (e.length === 0) return "";
  for (var r = '<mergeCells count="' + e.length + '">', t = 0; t != e.length; ++t) r += '<mergeCell ref="' + Qe(e[t]) + '"/>';
  return r + "</mergeCells>";
}
function u1(e, r, t, n, a) {
  var i = !1, s = {}, f = null;
  if (n.bookType !== "xlsx" && r.vbaraw) {
    var l = r.SheetNames[t];
    try {
      r.Workbook && (l = r.Workbook.Sheets[t].CodeName || l);
    } catch {
    }
    i = !0, s.codeName = mn(Me(l));
  }
  if (e && e["!outline"]) {
    var o = { summaryBelow: 1, summaryRight: 1 };
    e["!outline"].above && (o.summaryBelow = 0), e["!outline"].left && (o.summaryRight = 0), f = (f || "") + re("outlinePr", null, o);
  }
  !i && !f || (a[a.length] = re("sheetPr", f, s));
}
var h1 = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"], d1 = [
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
function x1(e) {
  var r = { sheet: 1 };
  return h1.forEach(function(t) {
    e[t] != null && e[t] && (r[t] = "1");
  }), d1.forEach(function(t) {
    e[t] != null && !e[t] && (r[t] = "0");
  }), e.password && (r.password = qi(e.password).toString(16).toUpperCase()), re("sheetProtection", null, r);
}
function v1(e) {
  return vs(e), re("pageMargins", null, e);
}
function p1(e, r) {
  for (var t = ["<cols>"], n, a = 0; a != r.length; ++a)
    (n = r[a]) && (t[t.length] = re("col", null, la(a, n)));
  return t[t.length] = "</cols>", t.join("");
}
function m1(e, r, t, n) {
  var a = typeof e.ref == "string" ? e.ref : Qe(e.ref);
  t.Workbook || (t.Workbook = { Sheets: [] }), t.Workbook.Names || (t.Workbook.Names = []);
  var i = t.Workbook.Names, s = It(a);
  s.s.r == s.e.r && (s.e.r = It(r["!ref"]).e.r, a = Qe(s));
  for (var f = 0; f < i.length; ++f) {
    var l = i[f];
    if (l.Name == "_xlnm._FilterDatabase" && l.Sheet == n) {
      l.Ref = "'" + t.SheetNames[n] + "'!" + a;
      break;
    }
  }
  return f == i.length && i.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + t.SheetNames[n] + "'!" + a }), re("autoFilter", null, { ref: a });
}
function g1(e, r, t, n) {
  var a = { workbookViewId: "0" };
  return (((n || {}).Workbook || {}).Views || [])[0] && (a.rightToLeft = n.Workbook.Views[0].RTL ? "1" : "0"), re("sheetViews", re("sheetView", null, a), {});
}
function _1(e, r, t, n) {
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
      a = yn[e.v];
      break;
    case "d":
      n && n.cellDates ? a = Tt(e.v, -1).toISOString() : (e = Ft(e), e.t = "n", a = "" + (e.v = yt(Tt(e.v)))), typeof e.z > "u" && (e.z = Ye[14]);
      break;
    default:
      a = e.v;
      break;
  }
  var f = ct("v", Me(a)), l = { r }, o = gr(n.cellXfs, e, n);
  switch (o !== 0 && (l.s = o), e.t) {
    case "n":
      break;
    case "d":
      l.t = "d";
      break;
    case "b":
      l.t = "b";
      break;
    case "e":
      l.t = "e";
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
        f = ct("v", "" + qa(n.Strings, e.v, n.revStrings)), l.t = "s";
        break;
      }
      l.t = "str";
      break;
  }
  if (e.t != i && (e.t = i, e.v = s), typeof e.f == "string" && e.f) {
    var c = e.F && e.F.slice(0, r.length) == r ? { t: "array", ref: e.F } : null;
    f = re("f", Me(e.f), c) + (e.v != null ? f : "");
  }
  return e.l && t["!links"].push([r, e.l]), e.D && (l.cm = 1), re("c", f, l);
}
function T1(e, r, t, n) {
  var a = [], i = [], s = $e(e["!ref"]), f = "", l, o = "", c = [], p = 0, v = 0, h = e["!rows"], m = Array.isArray(e), u = { r: o }, d, A = -1;
  for (v = s.s.c; v <= s.e.c; ++v) c[v] = xt(v);
  for (p = s.s.r; p <= s.e.r; ++p) {
    for (i = [], o = ut(p), v = s.s.c; v <= s.e.c; ++v) {
      l = c[v] + o;
      var k = m ? (e[p] || [])[v] : e[l];
      k !== void 0 && (f = _1(k, l, e, r)) != null && i.push(f);
    }
    (i.length > 0 || h && h[p]) && (u = { r: o }, h && h[p] && (d = h[p], d.hidden && (u.hidden = 1), A = -1, d.hpx ? A = qn(d.hpx) : d.hpt && (A = d.hpt), A > -1 && (u.ht = A, u.customHeight = 1), d.level && (u.outlineLevel = d.level)), a[a.length] = re("row", i.join(""), u));
  }
  if (h) for (; p < h.length; ++p)
    h && h[p] && (u = { r: p + 1 }, d = h[p], d.hidden && (u.hidden = 1), A = -1, d.hpx ? A = qn(d.hpx) : d.hpt && (A = d.hpt), A > -1 && (u.ht = A, u.customHeight = 1), d.level && (u.outlineLevel = d.level), a[a.length] = re("row", "", u));
  return a.join("");
}
function ps(e, r, t, n) {
  var a = [et, re("worksheet", null, {
    xmlns: Yr[0],
    "xmlns:r": at.r
  })], i = t.SheetNames[e], s = 0, f = "", l = t.Sheets[i];
  l == null && (l = {});
  var o = l["!ref"] || "A1", c = $e(o);
  if (c.e.c > 16383 || c.e.r > 1048575) {
    if (r.WTF) throw new Error("Range " + o + " exceeds format limit A1:XFD1048576");
    c.e.c = Math.min(c.e.c, 16383), c.e.r = Math.min(c.e.c, 1048575), o = Qe(c);
  }
  n || (n = {}), l["!comments"] = [];
  var p = [];
  u1(l, t, e, r, a), a[a.length] = re("dimension", null, { ref: o }), a[a.length] = g1(l, r, e, t), r.sheetFormat && (a[a.length] = re("sheetFormatPr", null, {
    defaultRowHeight: r.sheetFormat.defaultRowHeight || "16",
    baseColWidth: r.sheetFormat.baseColWidth || "10",
    outlineLevelRow: r.sheetFormat.outlineLevelRow || "7"
  })), l["!cols"] != null && l["!cols"].length > 0 && (a[a.length] = p1(l, l["!cols"])), a[s = a.length] = "<sheetData/>", l["!links"] = [], l["!ref"] != null && (f = T1(l, r), f.length > 0 && (a[a.length] = f)), a.length > s + 1 && (a[a.length] = "</sheetData>", a[s] = a[s].replace("/>", ">")), l["!protect"] && (a[a.length] = x1(l["!protect"])), l["!autofilter"] != null && (a[a.length] = m1(l["!autofilter"], l, t, e)), l["!merges"] != null && l["!merges"].length > 0 && (a[a.length] = c1(l["!merges"]));
  var v = -1, h, m = -1;
  return (
    /*::(*/
    l["!links"].length > 0 && (a[a.length] = "<hyperlinks>", l["!links"].forEach(function(u) {
      u[1].Target && (h = { ref: u[0] }, u[1].Target.charAt(0) != "#" && (m = Le(n, -1, Me(u[1].Target).replace(/#.*$/, ""), Oe.HLINK), h["r:id"] = "rId" + m), (v = u[1].Target.indexOf("#")) > -1 && (h.location = Me(u[1].Target.slice(v + 1))), u[1].Tooltip && (h.tooltip = Me(u[1].Tooltip)), a[a.length] = re("hyperlink", null, h));
    }), a[a.length] = "</hyperlinks>"), delete l["!links"], l["!margins"] != null && (a[a.length] = v1(l["!margins"])), (!r || r.ignoreEC || r.ignoreEC == null) && (a[a.length] = ct("ignoredErrors", re("ignoredError", null, { numberStoredAsText: 1, sqref: o }))), p.length > 0 && (m = Le(n, -1, "../drawings/drawing" + (e + 1) + ".xml", Oe.DRAW), a[a.length] = re("drawing", null, { "r:id": "rId" + m }), l["!drawing"] = p), l["!comments"].length > 0 && (m = Le(n, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", Oe.VML), a[a.length] = re("legacyDrawing", null, { "r:id": "rId" + m }), l["!legacy"] = m), a.length > 1 && (a[a.length] = "</worksheet>", a[1] = a[1].replace("/>", ">")), a.join("")
  );
}
function E1(e, r) {
  var t = {}, n = e.l + r;
  t.r = e.read_shift(4), e.l += 4;
  var a = e.read_shift(2);
  e.l += 1;
  var i = e.read_shift(1);
  return e.l = n, i & 7 && (t.level = i & 7), i & 16 && (t.hidden = !0), i & 32 && (t.hpt = a / 20), t;
}
function w1(e, r, t) {
  var n = U(145), a = (t["!rows"] || [])[e] || {};
  n.write_shift(4, e), n.write_shift(4, 0);
  var i = 320;
  a.hpx ? i = qn(a.hpx) * 20 : a.hpt && (i = a.hpt * 20), n.write_shift(2, i), n.write_shift(1, 0);
  var s = 0;
  a.level && (s |= a.level), a.hidden && (s |= 16), (a.hpx || a.hpt) && (s |= 32), n.write_shift(1, s), n.write_shift(1, 0);
  var f = 0, l = n.l;
  n.l += 4;
  for (var o = { r: e, c: 0 }, c = 0; c < 16; ++c)
    if (!(r.s.c > c + 1 << 10 || r.e.c < c << 10)) {
      for (var p = -1, v = -1, h = c << 10; h < c + 1 << 10; ++h) {
        o.c = h;
        var m = Array.isArray(t) ? (t[o.r] || [])[o.c] : t[Be(o)];
        m && (p < 0 && (p = h), v = h);
      }
      p < 0 || (++f, n.write_shift(4, p), n.write_shift(4, v));
    }
  var u = n.l;
  return n.l = l, n.write_shift(4, f), n.l = u, n.length > n.l ? n.slice(0, n.l) : n;
}
function S1(e, r, t, n) {
  var a = w1(n, t, r);
  (a.length > 17 || (r["!rows"] || [])[n]) && G(e, 0, a);
}
var A1 = Or, y1 = Jr;
function F1() {
}
function k1(e, r) {
  var t = {}, n = e[e.l];
  return ++e.l, t.above = !(n & 64), t.left = !(n & 128), e.l += 18, t.name = Ml(e), t;
}
function C1(e, r, t) {
  t == null && (t = U(84 + 4 * e.length));
  var n = 192;
  r && (r.above && (n &= -65), r.left && (n &= -129)), t.write_shift(1, n);
  for (var a = 1; a < 3; ++a) t.write_shift(1, 0);
  return Yn({ auto: 1 }, t), t.write_shift(-4, -1), t.write_shift(-4, -1), Ii(e, t), t.slice(0, t.l);
}
function D1(e) {
  var r = Mt(e);
  return [r];
}
function O1(e, r, t) {
  return t == null && (t = U(8)), kr(r, t);
}
function I1(e) {
  var r = Cr(e);
  return [r];
}
function R1(e, r, t) {
  return t == null && (t = U(4)), Dr(r, t);
}
function N1(e) {
  var r = Mt(e), t = e.read_shift(1);
  return [r, t, "b"];
}
function P1(e, r, t) {
  return t == null && (t = U(9)), kr(r, t), t.write_shift(1, e.v ? 1 : 0), t;
}
function L1(e) {
  var r = Cr(e), t = e.read_shift(1);
  return [r, t, "b"];
}
function M1(e, r, t) {
  return t == null && (t = U(5)), Dr(r, t), t.write_shift(1, e.v ? 1 : 0), t;
}
function B1(e) {
  var r = Mt(e), t = e.read_shift(1);
  return [r, t, "e"];
}
function b1(e, r, t) {
  return t == null && (t = U(9)), kr(r, t), t.write_shift(1, e.v), t;
}
function U1(e) {
  var r = Cr(e), t = e.read_shift(1);
  return [r, t, "e"];
}
function W1(e, r, t) {
  return t == null && (t = U(8)), Dr(r, t), t.write_shift(1, e.v), t.write_shift(2, 0), t.write_shift(1, 0), t;
}
function $1(e) {
  var r = Mt(e), t = e.read_shift(4);
  return [r, t, "s"];
}
function H1(e, r, t) {
  return t == null && (t = U(12)), kr(r, t), t.write_shift(4, r.v), t;
}
function V1(e) {
  var r = Cr(e), t = e.read_shift(4);
  return [r, t, "s"];
}
function G1(e, r, t) {
  return t == null && (t = U(8)), Dr(r, t), t.write_shift(4, r.v), t;
}
function j1(e) {
  var r = Mt(e), t = Zr(e);
  return [r, t, "n"];
}
function X1(e, r, t) {
  return t == null && (t = U(16)), kr(r, t), Ar(e.v, t), t;
}
function z1(e) {
  var r = Cr(e), t = Zr(e);
  return [r, t, "n"];
}
function Y1(e, r, t) {
  return t == null && (t = U(12)), Dr(r, t), Ar(e.v, t), t;
}
function K1(e) {
  var r = Mt(e), t = Ri(e);
  return [r, t, "n"];
}
function J1(e, r, t) {
  return t == null && (t = U(12)), kr(r, t), Ni(e.v, t), t;
}
function Z1(e) {
  var r = Cr(e), t = Ri(e);
  return [r, t, "n"];
}
function q1(e, r, t) {
  return t == null && (t = U(8)), Dr(r, t), Ni(e.v, t), t;
}
function Q1(e) {
  var r = Mt(e), t = Ga(e);
  return [r, t, "is"];
}
function eh(e) {
  var r = Mt(e), t = vt(e);
  return [r, t, "str"];
}
function th(e, r, t) {
  return t == null && (t = U(12 + 4 * e.v.length)), kr(r, t), st(e.v, t), t.length > t.l ? t.slice(0, t.l) : t;
}
function rh(e) {
  var r = Cr(e), t = vt(e);
  return [r, t, "str"];
}
function nh(e, r, t) {
  return t == null && (t = U(8 + 4 * e.v.length)), Dr(r, t), st(e.v, t), t.length > t.l ? t.slice(0, t.l) : t;
}
function ah(e, r, t) {
  var n = e.l + r, a = Mt(e);
  a.r = t["!row"];
  var i = e.read_shift(1), s = [a, i, "b"];
  if (t.cellFormula) {
    e.l += 2;
    var f = fa(e, n - e.l, t);
    s[3] = Xr(f, null, a, t.supbooks, t);
  } else e.l = n;
  return s;
}
function ih(e, r, t) {
  var n = e.l + r, a = Mt(e);
  a.r = t["!row"];
  var i = e.read_shift(1), s = [a, i, "e"];
  if (t.cellFormula) {
    e.l += 2;
    var f = fa(e, n - e.l, t);
    s[3] = Xr(f, null, a, t.supbooks, t);
  } else e.l = n;
  return s;
}
function sh(e, r, t) {
  var n = e.l + r, a = Mt(e);
  a.r = t["!row"];
  var i = Zr(e), s = [a, i, "n"];
  if (t.cellFormula) {
    e.l += 2;
    var f = fa(e, n - e.l, t);
    s[3] = Xr(f, null, a, t.supbooks, t);
  } else e.l = n;
  return s;
}
function fh(e, r, t) {
  var n = e.l + r, a = Mt(e);
  a.r = t["!row"];
  var i = vt(e), s = [a, i, "str"];
  if (t.cellFormula) {
    e.l += 2;
    var f = fa(e, n - e.l, t);
    s[3] = Xr(f, null, a, t.supbooks, t);
  } else e.l = n;
  return s;
}
var lh = Or, oh = Jr;
function ch(e, r) {
  return r == null && (r = U(4)), r.write_shift(4, e), r;
}
function uh(e, r) {
  var t = e.l + r, n = Or(e), a = ja(e), i = vt(e), s = vt(e), f = vt(e);
  e.l = t;
  var l = { rfx: n, relId: a, loc: i, display: f };
  return s && (l.Tooltip = s), l;
}
function hh(e, r) {
  var t = U(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
  Jr({ s: it(e[0]), e: it(e[0]) }, t), Xa("rId" + r, t);
  var n = e[1].Target.indexOf("#"), a = n == -1 ? "" : e[1].Target.slice(n + 1);
  return st(a || "", t), st(e[1].Tooltip || "", t), st("", t), t.slice(0, t.l);
}
function dh() {
}
function xh(e, r, t) {
  var n = e.l + r, a = Pi(e), i = e.read_shift(1), s = [a];
  if (s[2] = i, t.cellFormula) {
    var f = r1(e, n - e.l, t);
    s[1] = f;
  } else e.l = n;
  return s;
}
function vh(e, r, t) {
  var n = e.l + r, a = Or(e), i = [a];
  if (t.cellFormula) {
    var s = a1(e, n - e.l, t);
    i[1] = s, e.l = n;
  } else e.l = n;
  return i;
}
function ph(e, r, t) {
  t == null && (t = U(18));
  var n = la(e, r);
  t.write_shift(-4, e), t.write_shift(-4, e), t.write_shift(4, (n.width || 10) * 256), t.write_shift(
    4,
    0
    /*ixfe*/
  );
  var a = 0;
  return r.hidden && (a |= 1), typeof n.width == "number" && (a |= 2), r.level && (a |= r.level << 8), t.write_shift(2, a), t;
}
var ms = ["left", "right", "top", "bottom", "header", "footer"];
function mh(e) {
  var r = {};
  return ms.forEach(function(t) {
    r[t] = Zr(e);
  }), r;
}
function gh(e, r) {
  return r == null && (r = U(6 * 8)), vs(e), ms.forEach(function(t) {
    Ar(e[t], r);
  }), r;
}
function _h(e) {
  var r = e.read_shift(2);
  return e.l += 28, { RTL: r & 32 };
}
function Th(e, r, t) {
  t == null && (t = U(30));
  var n = 924;
  return (((r || {}).Views || [])[0] || {}).RTL && (n |= 32), t.write_shift(2, n), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(2, 0), t.write_shift(2, 100), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(4, 0), t;
}
function Eh(e) {
  var r = U(24);
  return r.write_shift(4, 4), r.write_shift(4, 1), Jr(e, r), r;
}
function wh(e, r) {
  return r == null && (r = U(16 * 4 + 2)), r.write_shift(2, e.password ? qi(e.password) : 0), r.write_shift(4, 1), [
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
function Sh() {
}
function Ah() {
}
function yh(e, r, t, n, a, i, s) {
  if (r.v === void 0) return !1;
  var f = "";
  switch (r.t) {
    case "b":
      f = r.v ? "1" : "0";
      break;
    case "d":
      r = Ft(r), r.z = r.z || Ye[14], r.v = yt(Tt(r.v)), r.t = "n";
      break;
    case "n":
    case "e":
      f = "" + r.v;
      break;
    default:
      f = r.v;
      break;
  }
  var l = { r: t, c: n };
  switch (l.s = gr(a.cellXfs, r, a), r.l && i["!links"].push([Be(l), r.l]), r.c && i["!comments"].push([Be(l), r.c]), r.t) {
    case "s":
    case "str":
      return a.bookSST ? (f = qa(a.Strings, r.v, a.revStrings), l.t = "s", l.v = f, s ? G(e, 18, G1(r, l)) : G(e, 7, H1(r, l))) : (l.t = "str", s ? G(e, 17, nh(r, l)) : G(e, 6, th(r, l))), !0;
    case "n":
      return r.v == (r.v | 0) && r.v > -1e3 && r.v < 1e3 ? s ? G(e, 13, q1(r, l)) : G(e, 2, J1(r, l)) : s ? G(e, 16, Y1(r, l)) : G(e, 5, X1(r, l)), !0;
    case "b":
      return l.t = "b", s ? G(e, 15, M1(r, l)) : G(e, 4, P1(r, l)), !0;
    case "e":
      return l.t = "e", s ? G(e, 14, W1(r, l)) : G(e, 3, b1(r, l)), !0;
  }
  return s ? G(e, 12, R1(r, l)) : G(e, 1, O1(r, l)), !0;
}
function Fh(e, r, t, n) {
  var a = $e(r["!ref"] || "A1"), i, s = "", f = [];
  G(
    e,
    145
    /* BrtBeginSheetData */
  );
  var l = Array.isArray(r), o = a.e.r;
  r["!rows"] && (o = Math.max(a.e.r, r["!rows"].length - 1));
  for (var c = a.s.r; c <= o; ++c) {
    s = ut(c), S1(e, r, a, c);
    var p = !1;
    if (c <= a.e.r) for (var v = a.s.c; v <= a.e.c; ++v) {
      c === a.s.r && (f[v] = xt(v)), i = f[v] + s;
      var h = l ? (r[c] || [])[v] : r[i];
      if (!h) {
        p = !1;
        continue;
      }
      p = yh(e, h, c, v, n, r, p);
    }
  }
  G(
    e,
    146
    /* BrtEndSheetData */
  );
}
function kh(e, r) {
  !r || !r["!merges"] || (G(e, 177, ch(r["!merges"].length)), r["!merges"].forEach(function(t) {
    G(e, 176, oh(t));
  }), G(
    e,
    178
    /* BrtEndMergeCells */
  ));
}
function Ch(e, r) {
  !r || !r["!cols"] || (G(
    e,
    390
    /* BrtBeginColInfos */
  ), r["!cols"].forEach(function(t, n) {
    t && G(e, 60, ph(n, t));
  }), G(
    e,
    391
    /* BrtEndColInfos */
  ));
}
function Dh(e, r) {
  !r || !r["!ref"] || (G(
    e,
    648
    /* BrtBeginCellIgnoreECs */
  ), G(e, 649, Eh($e(r["!ref"]))), G(
    e,
    650
    /* BrtEndCellIgnoreECs */
  ));
}
function Oh(e, r, t) {
  r["!links"].forEach(function(n) {
    if (n[1].Target) {
      var a = Le(t, -1, n[1].Target.replace(/#.*$/, ""), Oe.HLINK);
      G(e, 494, hh(n, a));
    }
  }), delete r["!links"];
}
function Ih(e, r, t, n) {
  if (r["!comments"].length > 0) {
    var a = Le(n, -1, "../drawings/vmlDrawing" + (t + 1) + ".vml", Oe.VML);
    G(e, 551, Xa("rId" + a)), r["!legacy"] = a;
  }
}
function Rh(e, r, t, n) {
  if (r["!autofilter"]) {
    var a = r["!autofilter"], i = typeof a.ref == "string" ? a.ref : Qe(a.ref);
    t.Workbook || (t.Workbook = { Sheets: [] }), t.Workbook.Names || (t.Workbook.Names = []);
    var s = t.Workbook.Names, f = It(i);
    f.s.r == f.e.r && (f.e.r = It(r["!ref"]).e.r, i = Qe(f));
    for (var l = 0; l < s.length; ++l) {
      var o = s[l];
      if (o.Name == "_xlnm._FilterDatabase" && o.Sheet == n) {
        o.Ref = "'" + t.SheetNames[n] + "'!" + i;
        break;
      }
    }
    l == s.length && s.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + t.SheetNames[n] + "'!" + i }), G(e, 161, Jr($e(i))), G(
      e,
      162
      /* BrtEndAFilter */
    );
  }
}
function Nh(e, r, t) {
  G(
    e,
    133
    /* BrtBeginWsViews */
  ), G(e, 137, Th(r, t)), G(
    e,
    138
    /* BrtEndWsView */
  ), G(
    e,
    134
    /* BrtEndWsViews */
  );
}
function Ph(e, r) {
  r["!protect"] && G(e, 535, wh(r["!protect"]));
}
function Lh(e, r, t, n) {
  var a = At(), i = t.SheetNames[e], s = t.Sheets[i] || {}, f = i;
  try {
    t && t.Workbook && (f = t.Workbook.Sheets[e].CodeName || f);
  } catch {
  }
  var l = $e(s["!ref"] || "A1");
  if (l.e.c > 16383 || l.e.r > 1048575) {
    if (r.WTF) throw new Error("Range " + (s["!ref"] || "A1") + " exceeds format limit A1:XFD1048576");
    l.e.c = Math.min(l.e.c, 16383), l.e.r = Math.min(l.e.c, 1048575);
  }
  return s["!links"] = [], s["!comments"] = [], G(
    a,
    129
    /* BrtBeginSheet */
  ), (t.vbaraw || s["!outline"]) && G(a, 147, C1(f, s["!outline"])), G(a, 148, y1(l)), Nh(a, s, t.Workbook), Ch(a, s), Fh(a, s, e, r), Ph(a, s), Rh(a, s, t, e), kh(a, s), Oh(a, s, n), s["!margins"] && G(a, 476, gh(s["!margins"])), (!r || r.ignoreEC || r.ignoreEC == null) && Dh(a, s), Ih(a, s, e, n), G(
    a,
    130
    /* BrtEndSheet */
  ), a.end();
}
function Mh(e, r) {
  e.l += 10;
  var t = vt(e);
  return { name: t };
}
var Bh = [
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
function bh(e) {
  return !e.Workbook || !e.Workbook.WBProps ? "false" : xl(e.Workbook.WBProps.date1904) ? "true" : "false";
}
var Uh = /* @__PURE__ */ "][*?/\\".split("");
function gs(e, r) {
  if (e.length > 31)
    throw new Error("Sheet names cannot exceed 31 chars");
  var t = !0;
  return Uh.forEach(function(n) {
    if (e.indexOf(n) != -1)
      throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
  }), t;
}
function Wh(e, r, t) {
  e.forEach(function(n, a) {
    gs(n);
    for (var i = 0; i < a; ++i) if (n == e[i]) throw new Error("Duplicate Sheet Name: " + n);
    if (t) {
      var s = r && r[a] && r[a].CodeName || n;
      if (s.charCodeAt(0) == 95 && s.length > 22) throw new Error("Bad Code Name: Worksheet" + s);
    }
  });
}
function $h(e) {
  if (!e || !e.SheetNames || !e.Sheets) throw new Error("Invalid Workbook");
  if (!e.SheetNames.length) throw new Error("Workbook is empty");
  var r = e.Workbook && e.Workbook.Sheets || [];
  Wh(e.SheetNames, r, !!e.vbaraw);
  for (var t = 0; t < e.SheetNames.length; ++t) o1(e.Sheets[e.SheetNames[t]], e.SheetNames[t], t);
}
function _s(e) {
  var r = [et];
  r[r.length] = re("workbook", null, {
    xmlns: Yr[0],
    //'xmlns:mx': XMLNS.mx,
    //'xmlns:s': XMLNS_main[0],
    "xmlns:r": at.r
  });
  var t = e.Workbook && (e.Workbook.Names || []).length > 0, n = { codeName: "ThisWorkbook" };
  e.Workbook && e.Workbook.WBProps && (Bh.forEach(function(f) {
    e.Workbook.WBProps[f[0]] != null && e.Workbook.WBProps[f[0]] != f[1] && (n[f[0]] = e.Workbook.WBProps[f[0]]);
  }), e.Workbook.WBProps.CodeName && (n.codeName = e.Workbook.WBProps.CodeName, delete n.CodeName)), r[r.length] = re("workbookPr", null, n);
  var a = e.Workbook && e.Workbook.Sheets || [], i = 0;
  if (a && a[0] && a[0].Hidden) {
    for (r[r.length] = "<bookViews>", i = 0; i != e.SheetNames.length && !(!a[i] || !a[i].Hidden); ++i)
      ;
    i == e.SheetNames.length && (i = 0), r[r.length] = '<workbookView firstSheet="' + i + '" activeTab="' + i + '"/>', r[r.length] = "</bookViews>";
  }
  for (r[r.length] = "<sheets>", i = 0; i != e.SheetNames.length; ++i) {
    var s = { name: Me(e.SheetNames[i].slice(0, 31)) };
    if (s.sheetId = "" + (i + 1), s["r:id"] = "rId" + (i + 1), a[i]) switch (a[i].Hidden) {
      case 1:
        s.state = "hidden";
        break;
      case 2:
        s.state = "veryHidden";
        break;
    }
    r[r.length] = re("sheet", null, s);
  }
  return r[r.length] = "</sheets>", t && (r[r.length] = "<definedNames>", e.Workbook && e.Workbook.Names && e.Workbook.Names.forEach(function(f) {
    var l = { name: f.Name };
    f.Comment && (l.comment = f.Comment), f.Sheet != null && (l.localSheetId = "" + f.Sheet), f.Hidden && (l.hidden = "1"), f.Ref && (r[r.length] = re("definedName", Me(f.Ref), l));
  }), r[r.length] = "</definedNames>"), r.length > 2 && (r[r.length] = "</workbook>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Hh(e, r) {
  var t = {};
  return t.Hidden = e.read_shift(4), t.iTabID = e.read_shift(4), t.strRelID = Ia(e), t.name = vt(e), t;
}
function Vh(e, r) {
  return r || (r = U(127)), r.write_shift(4, e.Hidden), r.write_shift(4, e.iTabID), Xa(e.strRelID, r), st(e.name.slice(0, 31), r), r.length > r.l ? r.slice(0, r.l) : r;
}
function Gh(e, r) {
  var t = {}, n = e.read_shift(4);
  t.defaultThemeVersion = e.read_shift(4);
  var a = r > 8 ? vt(e) : "";
  return a.length > 0 && (t.CodeName = a), t.autoCompressPictures = !!(n & 65536), t.backupFile = !!(n & 64), t.checkCompatibility = !!(n & 4096), t.date1904 = !!(n & 1), t.filterPrivacy = !!(n & 8), t.hidePivotFieldList = !!(n & 1024), t.promptedSolutions = !!(n & 16), t.publishItems = !!(n & 2048), t.refreshAllConnections = !!(n & 262144), t.saveExternalLinkValues = !!(n & 128), t.showBorderUnselectedTables = !!(n & 4), t.showInkAnnotation = !!(n & 32), t.showObjects = ["all", "placeholders", "none"][n >> 13 & 3], t.showPivotChartFilter = !!(n & 32768), t.updateLinks = ["userSet", "never", "always"][n >> 8 & 3], t;
}
function jh(e, r) {
  r || (r = U(72));
  var t = 0;
  return e && e.filterPrivacy && (t |= 8), r.write_shift(4, t), r.write_shift(4, 0), Ii(e && e.CodeName || "ThisWorkbook", r), r.slice(0, r.l);
}
function Xh(e, r, t) {
  var n = e.l + r;
  e.l += 4, e.l += 1;
  var a = e.read_shift(4), i = Bl(e), s = n1(e, 0, t), f = ja(e);
  e.l = n;
  var l = { Name: i, Ptg: s };
  return a < 268435455 && (l.Sheet = a), f && (l.Comment = f), l;
}
function zh(e, r) {
  G(
    e,
    143
    /* BrtBeginBundleShs */
  );
  for (var t = 0; t != r.SheetNames.length; ++t) {
    var n = r.Workbook && r.Workbook.Sheets && r.Workbook.Sheets[t] && r.Workbook.Sheets[t].Hidden || 0, a = { Hidden: n, iTabID: t + 1, strRelID: "rId" + (t + 1), name: r.SheetNames[t] };
    G(e, 156, Vh(a));
  }
  G(
    e,
    144
    /* BrtEndBundleShs */
  );
}
function Yh(e, r) {
  r || (r = U(127));
  for (var t = 0; t != 4; ++t) r.write_shift(4, 0);
  return st("SheetJS", r), st(Wn.version, r), st(Wn.version, r), st("7262", r), r.length > r.l ? r.slice(0, r.l) : r;
}
function Kh(e, r) {
  r || (r = U(29)), r.write_shift(-4, 0), r.write_shift(-4, 460), r.write_shift(4, 28800), r.write_shift(4, 17600), r.write_shift(4, 500), r.write_shift(4, e), r.write_shift(4, e);
  var t = 120;
  return r.write_shift(1, t), r.length > r.l ? r.slice(0, r.l) : r;
}
function Jh(e, r) {
  if (!(!r.Workbook || !r.Workbook.Sheets)) {
    for (var t = r.Workbook.Sheets, n = 0, a = -1, i = -1; n < t.length; ++n)
      !t[n] || !t[n].Hidden && a == -1 ? a = n : t[n].Hidden == 1 && i == -1 && (i = n);
    i > a || (G(
      e,
      135
      /* BrtBeginBookViews */
    ), G(e, 158, Kh(a)), G(
      e,
      136
      /* BrtEndBookViews */
    ));
  }
}
function Zh(e, r) {
  var t = At();
  return G(
    t,
    131
    /* BrtBeginBook */
  ), G(t, 128, Yh()), G(t, 153, jh(e.Workbook && e.Workbook.WBProps || null)), Jh(t, e), zh(t, e), G(
    t,
    132
    /* BrtEndBook */
  ), t.end();
}
function qh(e, r, t) {
  return (r.slice(-4) === ".bin" ? Zh : _s)(e);
}
function Qh(e, r, t, n, a) {
  return (r.slice(-4) === ".bin" ? Lh : ps)(e, t, n, a);
}
function ed(e, r, t) {
  return (r.slice(-4) === ".bin" ? gc : ts)(e, t);
}
function td(e, r, t) {
  return (r.slice(-4) === ".bin" ? jo : Zi)(e, t);
}
function rd(e, r, t) {
  return (r.slice(-4) === ".bin" ? Pc : ss)(e);
}
function nd(e) {
  return (e.slice(-4) === ".bin" ? Fc : as)();
}
function ad(e, r) {
  var t = [];
  return e.Props && t.push(Ql(e.Props, r)), e.Custprops && t.push(eo(e.Props, e.Custprops)), t.join("");
}
function id() {
  return "";
}
function sd(e, r) {
  var t = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
  return r.cellXfs.forEach(function(n, a) {
    var i = [];
    i.push(re("NumberFormat", null, { "ss:Format": Me(Ye[n.numFmtId]) }));
    var s = (
      /*::(*/
      { "ss:ID": "s" + (21 + a) }
    );
    t.push(re("Style", i.join(""), s));
  }), re("Styles", t.join(""));
}
function Ts(e) {
  return re("NamedRange", null, { "ss:Name": e.Name, "ss:RefersTo": "=" + Ja(e.Ref, { r: 0, c: 0 }) });
}
function fd(e) {
  if (!((e || {}).Workbook || {}).Names) return "";
  for (var r = e.Workbook.Names, t = [], n = 0; n < r.length; ++n) {
    var a = r[n];
    a.Sheet == null && (a.Name.match(/^_xlfn\./) || t.push(Ts(a)));
  }
  return re("Names", t.join(""));
}
function ld(e, r, t, n) {
  if (!e || !((n || {}).Workbook || {}).Names) return "";
  for (var a = n.Workbook.Names, i = [], s = 0; s < a.length; ++s) {
    var f = a[s];
    f.Sheet == t && (f.Name.match(/^_xlfn\./) || i.push(Ts(f)));
  }
  return i.join("");
}
function od(e, r, t, n) {
  if (!e) return "";
  var a = [];
  if (e["!margins"] && (a.push("<PageSetup>"), e["!margins"].header && a.push(re("Header", null, { "x:Margin": e["!margins"].header })), e["!margins"].footer && a.push(re("Footer", null, { "x:Margin": e["!margins"].footer })), a.push(re("PageMargins", null, {
    "x:Bottom": e["!margins"].bottom || "0.75",
    "x:Left": e["!margins"].left || "0.7",
    "x:Right": e["!margins"].right || "0.7",
    "x:Top": e["!margins"].top || "0.75"
  })), a.push("</PageSetup>")), n && n.Workbook && n.Workbook.Sheets && n.Workbook.Sheets[t])
    if (n.Workbook.Sheets[t].Hidden) a.push(re("Visible", n.Workbook.Sheets[t].Hidden == 1 ? "SheetHidden" : "SheetVeryHidden", {}));
    else {
      for (var i = 0; i < t && !(n.Workbook.Sheets[i] && !n.Workbook.Sheets[i].Hidden); ++i) ;
      i == t && a.push("<Selected/>");
    }
  return ((((n || {}).Workbook || {}).Views || [])[0] || {}).RTL && a.push("<DisplayRightToLeft/>"), e["!protect"] && (a.push(ct("ProtectContents", "True")), e["!protect"].objects && a.push(ct("ProtectObjects", "True")), e["!protect"].scenarios && a.push(ct("ProtectScenarios", "True")), e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells ? a.push(ct("EnableSelection", "NoSelection")) : e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells && a.push(ct("EnableSelection", "UnlockedCells")), [
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
  })), a.length == 0 ? "" : re("WorksheetOptions", a.join(""), { xmlns: Dt.x });
}
function cd(e) {
  return e.map(function(r) {
    var t = dl(r.t || ""), n = re("ss:Data", t, { xmlns: "http://www.w3.org/TR/REC-html40" });
    return re("Comment", n, { "ss:Author": r.a });
  }).join("");
}
function ud(e, r, t, n, a, i, s) {
  if (!e || e.v == null && e.f == null) return "";
  var f = {};
  if (e.f && (f["ss:Formula"] = "=" + Me(Ja(e.f, s))), e.F && e.F.slice(0, r.length) == r) {
    var l = it(e.F.slice(r.length + 1));
    f["ss:ArrayRange"] = "RC:R" + (l.r == s.r ? "" : "[" + (l.r - s.r) + "]") + "C" + (l.c == s.c ? "" : "[" + (l.c - s.c) + "]");
  }
  if (e.l && e.l.Target && (f["ss:HRef"] = Me(e.l.Target), e.l.Tooltip && (f["x:HRefScreenTip"] = Me(e.l.Tooltip))), t["!merges"])
    for (var o = t["!merges"], c = 0; c != o.length; ++c)
      o[c].s.c != s.c || o[c].s.r != s.r || (o[c].e.c > o[c].s.c && (f["ss:MergeAcross"] = o[c].e.c - o[c].s.c), o[c].e.r > o[c].s.r && (f["ss:MergeDown"] = o[c].e.r - o[c].s.r));
  var p = "", v = "";
  switch (e.t) {
    case "z":
      if (!n.sheetStubs) return "";
      break;
    case "n":
      p = "Number", v = String(e.v);
      break;
    case "b":
      p = "Boolean", v = e.v ? "1" : "0";
      break;
    case "e":
      p = "Error", v = yn[e.v];
      break;
    case "d":
      p = "DateTime", v = new Date(e.v).toISOString(), e.z == null && (e.z = e.z || Ye[14]);
      break;
    case "s":
      p = "String", v = hl(e.v || "");
      break;
  }
  var h = gr(n.cellXfs, e, n);
  f["ss:StyleID"] = "s" + (21 + h), f["ss:Index"] = s.c + 1;
  var m = e.v != null ? v : "", u = e.t == "z" ? "" : '<Data ss:Type="' + p + '">' + m + "</Data>";
  return (e.c || []).length > 0 && (u += cd(e.c)), re("Cell", u, f);
}
function hd(e, r) {
  var t = '<Row ss:Index="' + (e + 1) + '"';
  return r && (r.hpt && !r.hpx && (r.hpx = es(r.hpt)), r.hpx && (t += ' ss:AutoFitHeight="0" ss:Height="' + r.hpx + '"'), r.hidden && (t += ' ss:Hidden="1"')), t + ">";
}
function dd(e, r, t, n) {
  if (!e["!ref"]) return "";
  var a = $e(e["!ref"]), i = e["!merges"] || [], s = 0, f = [];
  e["!cols"] && e["!cols"].forEach(function(d, A) {
    Ya(d);
    var k = !!d.width, C = la(A, d), M = { "ss:Index": A + 1 };
    k && (M["ss:Width"] = Jn(C.width)), d.hidden && (M["ss:Hidden"] = "1"), f.push(re("Column", null, M));
  });
  for (var l = Array.isArray(e), o = a.s.r; o <= a.e.r; ++o) {
    for (var c = [hd(o, (e["!rows"] || [])[o])], p = a.s.c; p <= a.e.c; ++p) {
      var v = !1;
      for (s = 0; s != i.length; ++s)
        if (!(i[s].s.c > p) && !(i[s].s.r > o) && !(i[s].e.c < p) && !(i[s].e.r < o)) {
          (i[s].s.c != p || i[s].s.r != o) && (v = !0);
          break;
        }
      if (!v) {
        var h = { r: o, c: p }, m = Be(h), u = l ? (e[o] || [])[p] : e[m];
        c.push(ud(u, m, e, r, t, n, h));
      }
    }
    c.push("</Row>"), c.length > 2 && f.push(c.join(""));
  }
  return f.join("");
}
function xd(e, r, t) {
  var n = [], a = t.SheetNames[e], i = t.Sheets[a], s = i ? ld(i, r, e, t) : "";
  return s.length > 0 && n.push("<Names>" + s + "</Names>"), s = i ? dd(i, r, e, t) : "", s.length > 0 && n.push("<Table>" + s + "</Table>"), n.push(od(i, r, e, t)), n.join("");
}
function vd(e, r) {
  r || (r = {}), e.SSF || (e.SSF = Ft(Ye)), e.SSF && (na(), ra(e.SSF), r.revssf = aa(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF, r.cellXfs = [], gr(r.cellXfs, {}, { revssf: { General: 0 } }));
  var t = [];
  t.push(ad(e, r)), t.push(id()), t.push(""), t.push("");
  for (var n = 0; n < e.SheetNames.length; ++n)
    t.push(re("Worksheet", xd(n, r, e), { "ss:Name": Me(e.SheetNames[n]) }));
  return t[2] = sd(e, r), t[3] = fd(e), et + re("Workbook", t.join(""), {
    xmlns: Dt.ss,
    "xmlns:o": Dt.o,
    "xmlns:x": Dt.x,
    "xmlns:ss": Dt.ss,
    "xmlns:dt": Dt.dt,
    "xmlns:html": Dt.html
  });
}
var wa = {
  SI: "e0859ff2f94f6810ab9108002b27b3d9",
  DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
  UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
};
function pd(e, r) {
  var t = [], n = [], a = [], i = 0, s, f = g0(I0, "n"), l = g0(R0, "n");
  if (e.Props)
    for (s = ht(e.Props), i = 0; i < s.length; ++i) (Object.prototype.hasOwnProperty.call(f, s[i]) ? t : Object.prototype.hasOwnProperty.call(l, s[i]) ? n : a).push([s[i], e.Props[s[i]]]);
  if (e.Custprops)
    for (s = ht(e.Custprops), i = 0; i < s.length; ++i) Object.prototype.hasOwnProperty.call(e.Props || {}, s[i]) || (Object.prototype.hasOwnProperty.call(f, s[i]) ? t : Object.prototype.hasOwnProperty.call(l, s[i]) ? n : a).push([s[i], e.Custprops[s[i]]]);
  var o = [];
  for (i = 0; i < a.length; ++i)
    Gi.indexOf(a[i][0]) > -1 || $i.indexOf(a[i][0]) > -1 || a[i][1] != null && o.push(a[i]);
  n.length && be.utils.cfb_add(r, "/SummaryInformation", B0(n, wa.SI, l, R0)), (t.length || o.length) && be.utils.cfb_add(r, "/DocumentSummaryInformation", B0(t, wa.DSI, f, I0, o.length ? o : null, wa.UDI));
}
function md(e, r) {
  var t = r || {}, n = be.utils.cfb_new({ root: "R" }), a = "/Workbook";
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
  return be.utils.cfb_add(n, a, Es(e, t)), t.biff == 8 && (e.Props || e.Custprops) && pd(e, n), t.biff == 8 && e.vbaraw && Lc(n, be.read(e.vbaraw, { type: typeof e.vbaraw == "string" ? "binary" : "buffer" })), n;
}
var gd = {
  /*::[*/
  0: {
    /* n:"BrtRowHdr", */
    f: E1
  },
  /*::[*/
  1: {
    /* n:"BrtCellBlank", */
    f: D1
  },
  /*::[*/
  2: {
    /* n:"BrtCellRk", */
    f: K1
  },
  /*::[*/
  3: {
    /* n:"BrtCellError", */
    f: B1
  },
  /*::[*/
  4: {
    /* n:"BrtCellBool", */
    f: N1
  },
  /*::[*/
  5: {
    /* n:"BrtCellReal", */
    f: j1
  },
  /*::[*/
  6: {
    /* n:"BrtCellSt", */
    f: eh
  },
  /*::[*/
  7: {
    /* n:"BrtCellIsst", */
    f: $1
  },
  /*::[*/
  8: {
    /* n:"BrtFmlaString", */
    f: fh
  },
  /*::[*/
  9: {
    /* n:"BrtFmlaNum", */
    f: sh
  },
  /*::[*/
  10: {
    /* n:"BrtFmlaBool", */
    f: ah
  },
  /*::[*/
  11: {
    /* n:"BrtFmlaError", */
    f: ih
  },
  /*::[*/
  12: {
    /* n:"BrtShortBlank", */
    f: I1
  },
  /*::[*/
  13: {
    /* n:"BrtShortRk", */
    f: Z1
  },
  /*::[*/
  14: {
    /* n:"BrtShortError", */
    f: U1
  },
  /*::[*/
  15: {
    /* n:"BrtShortBool", */
    f: L1
  },
  /*::[*/
  16: {
    /* n:"BrtShortReal", */
    f: z1
  },
  /*::[*/
  17: {
    /* n:"BrtShortSt", */
    f: rh
  },
  /*::[*/
  18: {
    /* n:"BrtShortIsst", */
    f: V1
  },
  /*::[*/
  19: {
    /* n:"BrtSSTItem", */
    f: Ga
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
    f: Xh
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
    f: ec
  },
  /*::[*/
  44: {
    /* n:"BrtFmt", */
    f: qo
  },
  /*::[*/
  45: {
    /* n:"BrtFill", */
    f: nc
  },
  /*::[*/
  46: {
    /* n:"BrtBorder", */
    f: ic
  },
  /*::[*/
  47: {
    /* n:"BrtXF", */
    f: ac
  },
  /*::[*/
  48: {
    /* n:"BrtStyle" */
  },
  /*::[*/
  49: {
    /* n:"BrtCellMeta", */
    f: Ol
  },
  /*::[*/
  50: {
    /* n:"BrtValueMeta" */
  },
  /*::[*/
  51: {
    /* n:"BrtMdb" */
    f: Ec
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
    f: Ro
  },
  /*::[*/
  62: {
    /* n:"BrtCellRString", */
    f: Q1
  },
  /*::[*/
  63: {
    /* n:"BrtCalcChainItem$", */
    f: kc
  },
  /*::[*/
  64: {
    /* n:"BrtDVal", */
    f: Sh
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
    f: Jt,
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
    f: _h
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
    f: k1
  },
  /*::[*/
  148: {
    /* n:"BrtWsDim", */
    f: A1,
    p: 16
  },
  /*::[*/
  151: {
    /* n:"BrtPane", */
    f: dh
  },
  /*::[*/
  152: {
    /* n:"BrtSel" */
  },
  /*::[*/
  153: {
    /* n:"BrtWbProp", */
    f: Gh
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
    f: Or
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
    f: lh
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
    f: _c
  },
  /*::[*/
  336: {
    /* n:"BrtEndEsmdtinfo", */
    T: -1
  },
  /*::[*/
  337: {
    /* n:"BrtBeginEsmdb", */
    f: Ac,
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
    f: Ia
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
    f: Fo
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
    f: xh
  },
  /*::[*/
  427: {
    /* n:"BrtShrFmla", */
    f: vh
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
    f: mh
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
    f: F1
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
    f: uh
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
    f: Ia
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
    f: Rc
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
    f: Oc
  },
  /*::[*/
  636: {
    /* n:"BrtEndComment", */
    T: -1
  },
  /*::[*/
  637: {
    /* n:"BrtCommentText", */
    f: Pl
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
    f: Mh
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
    f: Ah
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
function ne(e, r, t, n) {
  var a = r;
  if (!isNaN(a)) {
    var i = n || (t || []).length || 0, s = e.next(4);
    s.write_shift(2, a), s.write_shift(2, i), /*:: len != null &&*/
    i > 0 && $a(t) && e.push(t);
  }
}
function _d(e, r, t, n) {
  var a = (t || []).length || 0;
  if (a <= 8224) return ne(e, r, t, a);
  var i = r;
  if (!isNaN(i)) {
    for (var s = t.parts || [], f = 0, l = 0, o = 0; o + (s[f] || 8224) <= 8224; )
      o += s[f] || 8224, f++;
    var c = e.next(4);
    for (c.write_shift(2, i), c.write_shift(2, o), e.push(t.slice(l, l + o)), l += o; l < a; ) {
      for (c = e.next(4), c.write_shift(2, 60), o = 0; o + (s[f] || 8224) <= 8224; )
        o += s[f] || 8224, f++;
      c.write_shift(2, o), e.push(t.slice(l, l + o)), l += o;
    }
  }
}
function kn(e, r, t) {
  return e || (e = U(7)), e.write_shift(2, r), e.write_shift(2, t), e.write_shift(2, 0), e.write_shift(1, 0), e;
}
function Td(e, r, t, n) {
  var a = U(9);
  return kn(a, e, r), Xi(t, n || "b", a), a;
}
function Ed(e, r, t) {
  var n = U(8 + 2 * t.length);
  return kn(n, e, r), n.write_shift(1, t.length), n.write_shift(t.length, t, "sbcs"), n.l < n.length ? n.slice(0, n.l) : n;
}
function wd(e, r, t, n) {
  if (r.v != null) switch (r.t) {
    case "d":
    case "n":
      var a = r.t == "d" ? yt(Tt(r.v)) : r.v;
      a == (a | 0) && a >= 0 && a < 65536 ? ne(e, 2, Mo(t, n, a)) : ne(e, 3, Lo(t, n, a));
      return;
    case "b":
    case "e":
      ne(e, 5, Td(t, n, r.v, r.t));
      return;
    case "s":
    case "str":
      ne(e, 4, Ed(t, n, (r.v || "").slice(0, 255)));
      return;
  }
  ne(e, 1, kn(null, t, n));
}
function Sd(e, r, t, n) {
  var a = Array.isArray(r), i = $e(r["!ref"] || "A1"), s, f = "", l = [];
  if (i.e.c > 255 || i.e.r > 16383) {
    if (n.WTF) throw new Error("Range " + (r["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    i.e.c = Math.min(i.e.c, 255), i.e.r = Math.min(i.e.c, 16383), s = Qe(i);
  }
  for (var o = i.s.r; o <= i.e.r; ++o) {
    f = ut(o);
    for (var c = i.s.c; c <= i.e.c; ++c) {
      o === i.s.r && (l[c] = xt(c)), s = l[c] + f;
      var p = a ? (r[o] || [])[c] : r[s];
      p && wd(e, p, o, c);
    }
  }
}
function Ad(e, r) {
  for (var t = r || {}, n = At(), a = 0, i = 0; i < e.SheetNames.length; ++i) e.SheetNames[i] == t.sheet && (a = i);
  if (a == 0 && t.sheet && e.SheetNames[0] != t.sheet) throw new Error("Sheet not found: " + t.sheet);
  return ne(n, t.biff == 4 ? 1033 : t.biff == 3 ? 521 : 9, za(e, 16, t)), Sd(n, e.Sheets[e.SheetNames[a]], a, t), ne(n, 10), n.end();
}
function yd(e, r, t) {
  ne(e, 49, go({
    sz: 12,
    name: "Arial"
  }, t));
}
function Fd(e, r, t) {
  r && [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(n) {
    for (var a = n[0]; a <= n[1]; ++a) r[a] != null && ne(e, 1054, Eo(a, r[a], t));
  });
}
function kd(e, r) {
  var t = U(19);
  t.write_shift(4, 2151), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(2, 3), t.write_shift(1, 1), t.write_shift(4, 0), ne(e, 2151, t), t = U(39), t.write_shift(4, 2152), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(2, 3), t.write_shift(1, 0), t.write_shift(4, 0), t.write_shift(2, 1), t.write_shift(4, 4), t.write_shift(2, 0), Ki($e(r["!ref"] || "A1"), t), t.write_shift(4, 4), ne(e, 2152, t);
}
function Cd(e, r) {
  for (var t = 0; t < 16; ++t) ne(e, 224, U0({ numFmtId: 0, style: !0 }, 0, r));
  r.cellXfs.forEach(function(n) {
    ne(e, 224, U0(n, 0, r));
  });
}
function Dd(e, r) {
  for (var t = 0; t < r["!links"].length; ++t) {
    var n = r["!links"][t];
    ne(e, 440, Do(n)), n[1].Tooltip && ne(e, 2048, Oo(n));
  }
  delete r["!links"];
}
function Od(e, r) {
  if (r) {
    var t = 0;
    r.forEach(function(n, a) {
      ++t <= 256 && n && ne(e, 125, No(la(a, n), a));
    });
  }
}
function Id(e, r, t, n, a) {
  var i = 16 + gr(a.cellXfs, r, a);
  if (r.v == null && !r.bf) {
    ne(e, 513, yr(t, n, i));
    return;
  }
  if (r.bf) ne(e, 6, t1(r, t, n, a, i));
  else switch (r.t) {
    case "d":
    case "n":
      var s = r.t == "d" ? yt(Tt(r.v)) : r.v;
      ne(e, 515, yo(t, n, s, i));
      break;
    case "b":
    case "e":
      ne(e, 517, Ao(t, n, r.v, i, a, r.t));
      break;
    case "s":
    case "str":
      if (a.bookSST) {
        var f = qa(a.Strings, r.v, a.revStrings);
        ne(e, 253, _o(t, n, f, i));
      } else ne(e, 516, To(t, n, (r.v || "").slice(0, 255), i, a));
      break;
    default:
      ne(e, 513, yr(t, n, i));
  }
}
function Rd(e, r, t) {
  var n = At(), a = t.SheetNames[e], i = t.Sheets[a] || {}, s = (t || {}).Workbook || {}, f = (s.Sheets || [])[e] || {}, l = Array.isArray(i), o = r.biff == 8, c, p = "", v = [], h = $e(i["!ref"] || "A1"), m = o ? 65536 : 16384;
  if (h.e.c > 255 || h.e.r >= m) {
    if (r.WTF) throw new Error("Range " + (i["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    h.e.c = Math.min(h.e.c, 255), h.e.r = Math.min(h.e.c, m - 1);
  }
  ne(n, 2057, za(t, 16, r)), ne(n, 13, Lt(1)), ne(n, 12, Lt(100)), ne(n, 15, _t(!0)), ne(n, 17, _t(!1)), ne(n, 16, Ar(1e-3)), ne(n, 95, _t(!0)), ne(n, 42, _t(!1)), ne(n, 43, _t(!1)), ne(n, 130, Lt(1)), ne(n, 128, So()), ne(n, 131, _t(!1)), ne(n, 132, _t(!1)), o && Od(n, i["!cols"]), ne(n, 512, wo(h, r)), o && (i["!links"] = []);
  for (var u = h.s.r; u <= h.e.r; ++u) {
    p = ut(u);
    for (var d = h.s.c; d <= h.e.c; ++d) {
      u === h.s.r && (v[d] = xt(d)), c = v[d] + p;
      var A = l ? (i[u] || [])[d] : i[c];
      A && (Id(n, A, u, d, r), o && A.l && i["!links"].push([c, A.l]));
    }
  }
  var k = f.CodeName || f.name || a;
  return o && ne(n, 574, mo((s.Views || [])[0])), o && (i["!merges"] || []).length && ne(n, 229, Co(i["!merges"])), o && Dd(n, i), ne(n, 442, Yi(k)), o && kd(n, i), ne(
    n,
    10
    /* EOF */
  ), n.end();
}
function Nd(e, r, t) {
  var n = At(), a = (e || {}).Workbook || {}, i = a.Sheets || [], s = (
    /*::((*/
    a.WBProps || {
      /*::CodeName:"ThisWorkbook"*/
    }
  ), f = t.biff == 8, l = t.biff == 5;
  if (ne(n, 2057, za(e, 5, t)), t.bookType == "xla" && ne(
    n,
    135
    /* Addin */
  ), ne(n, 225, f ? Lt(1200) : null), ne(n, 193, no(2)), l && ne(
    n,
    191
    /* ToolbarHdr */
  ), l && ne(
    n,
    192
    /* ToolbarEnd */
  ), ne(
    n,
    226
    /* InterfaceEnd */
  ), ne(n, 92, ho("SheetJS", t)), ne(n, 66, Lt(f ? 1200 : 1252)), f && ne(n, 353, Lt(0)), f && ne(
    n,
    448
    /* Excel9File */
  ), ne(n, 317, Po(e.SheetNames.length)), f && e.vbaraw && ne(
    n,
    211
    /* ObProj */
  ), f && e.vbaraw) {
    var o = s.CodeName || "ThisWorkbook";
    ne(n, 442, Yi(o));
  }
  ne(n, 156, Lt(17)), ne(n, 25, _t(!1)), ne(n, 18, _t(!1)), ne(n, 19, Lt(0)), f && ne(n, 431, _t(!1)), f && ne(n, 444, Lt(0)), ne(n, 61, po()), ne(n, 64, _t(!1)), ne(n, 141, Lt(0)), ne(n, 34, _t(bh(e) == "true")), ne(n, 14, _t(!0)), f && ne(n, 439, _t(!1)), ne(n, 218, Lt(0)), yd(n, e, t), Fd(n, e.SSF, t), Cd(n, t), f && ne(n, 352, _t(!1));
  var c = n.end(), p = At();
  f && ne(p, 140, Io()), f && t.Strings && _d(p, 252, vo(t.Strings)), ne(
    p,
    10
    /* EOF */
  );
  var v = p.end(), h = At(), m = 0, u = 0;
  for (u = 0; u < e.SheetNames.length; ++u) m += (f ? 12 : 11) + (f ? 2 : 1) * e.SheetNames[u].length;
  var d = c.length + m + v.length;
  for (u = 0; u < e.SheetNames.length; ++u) {
    var A = i[u] || {};
    ne(h, 133, xo({ pos: d, hs: A.Hidden || 0, dt: 0, name: e.SheetNames[u] }, t)), d += r[u].length;
  }
  var k = h.end();
  if (m != k.length) throw new Error("BS8 " + m + " != " + k.length);
  var C = [];
  return c.length && C.push(c), k.length && C.push(k), v.length && C.push(v), ot(C);
}
function Pd(e, r) {
  var t = r || {}, n = [];
  e && !e.SSF && (e.SSF = Ft(Ye)), e && e.SSF && (na(), ra(e.SSF), t.revssf = aa(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, Qa(t), t.cellXfs = [], gr(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {});
  for (var a = 0; a < e.SheetNames.length; ++a) n[n.length] = Rd(a, t, e);
  return n.unshift(Nd(e, n, t)), ot(n);
}
function Es(e, r) {
  for (var t = 0; t <= e.SheetNames.length; ++t) {
    var n = e.Sheets[e.SheetNames[t]];
    if (!(!n || !n["!ref"])) {
      var a = It(n["!ref"]);
      a.e.c > 255 && typeof console < "u" && console.error && console.error("Worksheet '" + e.SheetNames[t] + "' extends beyond column IV (255).  Data may be lost.");
    }
  }
  var i = r || {};
  switch (i.biff || 2) {
    case 8:
    case 5:
      return Pd(e, r);
    case 4:
    case 3:
    case 2:
      return Ad(e, r);
  }
  throw new Error("invalid type " + i.bookType + " for BIFF");
}
function Ld(e, r, t, n) {
  for (var a = e["!merges"] || [], i = [], s = r.s.c; s <= r.e.c; ++s) {
    for (var f = 0, l = 0, o = 0; o < a.length; ++o)
      if (!(a[o].s.r > t || a[o].s.c > s) && !(a[o].e.r < t || a[o].e.c < s)) {
        if (a[o].s.r < t || a[o].s.c < s) {
          f = -1;
          break;
        }
        f = a[o].e.r - a[o].s.r + 1, l = a[o].e.c - a[o].s.c + 1;
        break;
      }
    if (!(f < 0)) {
      var c = Be({ r: t, c: s }), p = n.dense ? (e[t] || [])[s] : e[c], v = p && p.v != null && (p.h || ul(p.w || (ar(p), p.w) || "")) || "", h = {};
      f > 1 && (h.rowspan = f), l > 1 && (h.colspan = l), n.editable ? v = '<span contenteditable="true">' + v + "</span>" : p && (h["data-t"] = p && p.t || "z", p.v != null && (h["data-v"] = p.v), p.z != null && (h["data-z"] = p.z), p.l && (p.l.Target || "#").charAt(0) != "#" && (v = '<a href="' + p.l.Target + '">' + v + "</a>")), h.id = (n.id || "sjs") + "-" + c, i.push(re("td", v, h));
    }
  }
  var m = "<tr>";
  return m + i.join("") + "</tr>";
}
var Md = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>', Bd = "</body></html>";
function bd(e, r, t) {
  var n = [];
  return n.join("") + "<table" + (t && t.id ? ' id="' + t.id + '"' : "") + ">";
}
function ws(e, r) {
  var t = r || {}, n = t.header != null ? t.header : Md, a = t.footer != null ? t.footer : Bd, i = [n], s = It(e["!ref"]);
  t.dense = Array.isArray(e), i.push(bd(e, s, t));
  for (var f = s.s.r; f <= s.e.r; ++f) i.push(Ld(e, s, f, t));
  return i.push("</table>" + a), i.join("");
}
function Ss(e, r, t) {
  var n = t || {}, a = 0, i = 0;
  if (n.origin != null)
    if (typeof n.origin == "number") a = n.origin;
    else {
      var s = typeof n.origin == "string" ? it(n.origin) : n.origin;
      a = s.r, i = s.c;
    }
  var f = r.getElementsByTagName("tr"), l = Math.min(n.sheetRows || 1e7, f.length), o = { s: { r: 0, c: 0 }, e: { r: a, c: i } };
  if (e["!ref"]) {
    var c = It(e["!ref"]);
    o.s.r = Math.min(o.s.r, c.s.r), o.s.c = Math.min(o.s.c, c.s.c), o.e.r = Math.max(o.e.r, c.e.r), o.e.c = Math.max(o.e.c, c.e.c), a == -1 && (o.e.r = a = c.e.r + 1);
  }
  var p = [], v = 0, h = e["!rows"] || (e["!rows"] = []), m = 0, u = 0, d = 0, A = 0, k = 0, C = 0;
  for (e["!cols"] || (e["!cols"] = []); m < f.length && u < l; ++m) {
    var M = f[m];
    if (X0(M)) {
      if (n.display) continue;
      h[u] = { hidden: !0 };
    }
    var Q = M.children;
    for (d = A = 0; d < Q.length; ++d) {
      var ce = Q[d];
      if (!(n.display && X0(ce))) {
        var O = ce.hasAttribute("data-v") ? ce.getAttribute("data-v") : ce.hasAttribute("v") ? ce.getAttribute("v") : vl(ce.innerHTML), H = ce.getAttribute("data-z") || ce.getAttribute("z");
        for (v = 0; v < p.length; ++v) {
          var D = p[v];
          D.s.c == A + i && D.s.r < u + a && u + a <= D.e.r && (A = D.e.c + 1 - i, v = -1);
        }
        C = +ce.getAttribute("colspan") || 1, ((k = +ce.getAttribute("rowspan") || 1) > 1 || C > 1) && p.push({ s: { r: u + a, c: A + i }, e: { r: u + a + (k || 1) - 1, c: A + i + (C || 1) - 1 } });
        var j = { t: "s", v: O }, X = ce.getAttribute("data-t") || ce.getAttribute("t") || "";
        O != null && (O.length == 0 ? j.t = X || "z" : n.raw || O.trim().length == 0 || X == "s" || (O === "TRUE" ? j = { t: "b", v: !0 } : O === "FALSE" ? j = { t: "b", v: !1 } : isNaN(tr(O)) ? isNaN(pn(O).getDate()) || (j = { t: "d", v: Tt(O) }, n.cellDates || (j = { t: "n", v: yt(j.v) }), j.z = n.dateNF || Ye[14]) : j = { t: "n", v: tr(O) })), j.z === void 0 && H != null && (j.z = H);
        var Y = "", ue = ce.getElementsByTagName("A");
        if (ue && ue.length) for (var V = 0; V < ue.length && !(ue[V].hasAttribute("href") && (Y = ue[V].getAttribute("href"), Y.charAt(0) != "#")); ++V) ;
        Y && Y.charAt(0) != "#" && (j.l = { Target: Y }), n.dense ? (e[u + a] || (e[u + a] = []), e[u + a][A + i] = j) : e[Be({ c: A + i, r: u + a })] = j, o.e.c < A + i && (o.e.c = A + i), A += C;
      }
    }
    ++u;
  }
  return p.length && (e["!merges"] = (e["!merges"] || []).concat(p)), o.e.r = Math.max(o.e.r, u - 1 + a), e["!ref"] = Qe(o), u >= l && (e["!fullref"] = Qe((o.e.r = f.length - m + u - 1 + a, o))), e;
}
function As(e, r) {
  var t = r || {}, n = t.dense ? [] : {};
  return Ss(n, e, r);
}
function Ud(e, r) {
  return Fr(As(e, r), r);
}
function X0(e) {
  var r = "", t = Wd(e);
  return t && (r = t(e).getPropertyValue("display")), r || (r = e.style && e.style.display), r === "none";
}
function Wd(e) {
  return e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle == "function" ? e.ownerDocument.defaultView.getComputedStyle : typeof getComputedStyle == "function" ? getComputedStyle : null;
}
var $d = /* @__PURE__ */ function() {
  var e = [
    "<office:master-styles>",
    '<style:master-page style:name="mp1" style:page-layout-name="mp1">',
    "<style:header/>",
    '<style:header-left style:display="false"/>',
    "<style:footer/>",
    '<style:footer-left style:display="false"/>',
    "</style:master-page>",
    "</office:master-styles>"
  ].join(""), r = "<office:document-styles " + gn({
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
}(), z0 = /* @__PURE__ */ function() {
  var e = function(i) {
    return Me(i).replace(/  +/g, function(s) {
      return '<text:s text:c="' + s.length + '"/>';
    }).replace(/\t/g, "<text:tab/>").replace(/\n/g, "</text:p><text:p>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>");
  }, r = `          <table:table-cell />
`, t = `          <table:covered-table-cell/>
`, n = function(i, s, f) {
    var l = [];
    l.push('      <table:table table:name="' + Me(s.SheetNames[f]) + `" table:style-name="ta1">
`);
    var o = 0, c = 0, p = It(i["!ref"] || "A1"), v = i["!merges"] || [], h = 0, m = Array.isArray(i);
    if (i["!cols"])
      for (c = 0; c <= p.e.c; ++c) l.push("        <table:table-column" + (i["!cols"][c] ? ' table:style-name="co' + i["!cols"][c].ods + '"' : "") + `></table:table-column>
`);
    var u = "", d = i["!rows"] || [];
    for (o = 0; o < p.s.r; ++o)
      u = d[o] ? ' table:style-name="ro' + d[o].ods + '"' : "", l.push("        <table:table-row" + u + `></table:table-row>
`);
    for (; o <= p.e.r; ++o) {
      for (u = d[o] ? ' table:style-name="ro' + d[o].ods + '"' : "", l.push("        <table:table-row" + u + `>
`), c = 0; c < p.s.c; ++c) l.push(r);
      for (; c <= p.e.c; ++c) {
        var A = !1, k = {}, C = "";
        for (h = 0; h != v.length; ++h)
          if (!(v[h].s.c > c) && !(v[h].s.r > o) && !(v[h].e.c < c) && !(v[h].e.r < o)) {
            (v[h].s.c != c || v[h].s.r != o) && (A = !0), k["table:number-columns-spanned"] = v[h].e.c - v[h].s.c + 1, k["table:number-rows-spanned"] = v[h].e.r - v[h].s.r + 1;
            break;
          }
        if (A) {
          l.push(t);
          continue;
        }
        var M = Be({ r: o, c }), Q = m ? (i[o] || [])[c] : i[M];
        if (Q && Q.f && (k["table:formula"] = Me(f1(Q.f)), Q.F && Q.F.slice(0, M.length) == M)) {
          var ce = It(Q.F);
          k["table:number-matrix-columns-spanned"] = ce.e.c - ce.s.c + 1, k["table:number-matrix-rows-spanned"] = ce.e.r - ce.s.r + 1;
        }
        if (!Q) {
          l.push(r);
          continue;
        }
        switch (Q.t) {
          case "b":
            C = Q.v ? "TRUE" : "FALSE", k["office:value-type"] = "boolean", k["office:boolean-value"] = Q.v ? "true" : "false";
            break;
          case "n":
            C = Q.w || String(Q.v || 0), k["office:value-type"] = "float", k["office:value"] = Q.v || 0;
            break;
          case "s":
          case "str":
            C = Q.v == null ? "" : Q.v, k["office:value-type"] = "string";
            break;
          case "d":
            C = Q.w || Tt(Q.v).toISOString(), k["office:value-type"] = "date", k["office:date-value"] = Tt(Q.v).toISOString(), k["table:style-name"] = "ce1";
            break;
          default:
            l.push(r);
            continue;
        }
        var O = e(C);
        if (Q.l && Q.l.Target) {
          var H = Q.l.Target;
          H = H.charAt(0) == "#" ? "#" + l1(H.slice(1)) : H, H.charAt(0) != "#" && !H.match(/^\w+:/) && (H = "../" + H), O = re("text:a", O, { "xlink:href": H.replace(/&/g, "&amp;") });
        }
        l.push("          " + re("table:table-cell", re("text:p", O, {}), k) + `
`);
      }
      l.push(`        </table:table-row>
`);
    }
    return l.push(`      </table:table>
`), l.join("");
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
    var f = 0;
    s.SheetNames.map(function(o) {
      return s.Sheets[o];
    }).forEach(function(o) {
      if (o && o["!cols"]) {
        for (var c = 0; c < o["!cols"].length; ++c) if (o["!cols"][c]) {
          var p = o["!cols"][c];
          if (p.width == null && p.wpx == null && p.wch == null) continue;
          Ya(p), p.ods = f;
          var v = o["!cols"][c].wpx + "px";
          i.push('  <style:style style:name="co' + f + `" style:family="table-column">
`), i.push('   <style:table-column-properties fo:break-before="auto" style:column-width="' + v + `"/>
`), i.push(`  </style:style>
`), ++f;
        }
      }
    });
    var l = 0;
    s.SheetNames.map(function(o) {
      return s.Sheets[o];
    }).forEach(function(o) {
      if (o && o["!rows"]) {
        for (var c = 0; c < o["!rows"].length; ++c) if (o["!rows"][c]) {
          o["!rows"][c].ods = l;
          var p = o["!rows"][c].hpx + "px";
          i.push('  <style:style style:name="ro' + l + `" style:family="table-row">
`), i.push('   <style:table-row-properties fo:break-before="auto" style:row-height="' + p + `"/>
`), i.push(`  </style:style>
`), ++l;
        }
      }
    }), i.push(`  <style:style style:name="ta1" style:family="table" style:master-page-name="mp1">
`), i.push(`   <style:table-properties table:display="true" style:writing-mode="lr-tb"/>
`), i.push(`  </style:style>
`), i.push(`  <style:style style:name="ce1" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="N37"/>
`), i.push(` </office:automatic-styles>
`);
  };
  return function(s, f) {
    var l = [et], o = gn({
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
    }), c = gn({
      "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
      "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
    });
    f.bookType == "fods" ? (l.push("<office:document" + o + c + `>
`), l.push(Ui().replace(/office:document-meta/g, "office:meta"))) : l.push("<office:document-content" + o + `>
`), a(l, s), l.push(`  <office:body>
`), l.push(`    <office:spreadsheet>
`);
    for (var p = 0; p != s.SheetNames.length; ++p) l.push(n(s.Sheets[s.SheetNames[p]], s, p));
    return l.push(`    </office:spreadsheet>
`), l.push(`  </office:body>
`), f.bookType == "fods" ? l.push("</office:document>") : l.push("</office:document-content>"), l.join("");
  };
}();
function ys(e, r) {
  if (r.bookType == "fods") return z0(e, r);
  var t = Ba(), n = "", a = [], i = [];
  return n = "mimetype", Ae(t, n, "application/vnd.oasis.opendocument.spreadsheet"), n = "content.xml", Ae(t, n, z0(e, r)), a.push([n, "text/xml"]), i.push([n, "ContentFile"]), n = "styles.xml", Ae(t, n, $d(e, r)), a.push([n, "text/xml"]), i.push([n, "StylesFile"]), n = "meta.xml", Ae(t, n, et + Ui(
    /*::wb, opts*/
  )), a.push([n, "text/xml"]), i.push([n, "MetadataFile"]), n = "manifest.rdf", Ae(t, n, ql(
    i
    /*, opts*/
  )), a.push([n, "application/rdf+xml"]), n = "META-INF/manifest.xml", Ae(t, n, Jl(
    a
    /*, opts*/
  )), t;
}
/*! sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
function Qn(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function Hd(e) {
  return typeof TextEncoder < "u" ? new TextEncoder().encode(e) : Ht(mn(e));
}
function Vd(e, r) {
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
function Gd(e, r, t) {
  var n = Math.floor(t == 0 ? 0 : Math.LOG10E * Math.log(Math.abs(t))) + 6176 - 20, a = t / Math.pow(10, n - 6176);
  e[r + 15] |= n >> 7, e[r + 14] |= (n & 127) << 1;
  for (var i = 0; a >= 1; ++i, a /= 256)
    e[r + i] = a & 255;
  e[r + 15] |= t >= 0 ? 0 : 128;
}
function _n(e, r) {
  var t = r ? r[0] : 0, n = e[t] & 127;
  e:
    if (e[t++] >= 128 && (n |= (e[t] & 127) << 7, e[t++] < 128 || (n |= (e[t] & 127) << 14, e[t++] < 128) || (n |= (e[t] & 127) << 21, e[t++] < 128) || (n += (e[t] & 127) * Math.pow(2, 28), ++t, e[t++] < 128) || (n += (e[t] & 127) * Math.pow(2, 35), ++t, e[t++] < 128) || (n += (e[t] & 127) * Math.pow(2, 42), ++t, e[t++] < 128)))
      break e;
  return r && (r[0] = t), n;
}
function Ne(e) {
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
function jr(e) {
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
    var n = t[0], a = _n(e, t), i = a & 7;
    a = Math.floor(a / 8);
    var s = 0, f;
    if (a == 0)
      break;
    switch (i) {
      case 0:
        {
          for (var l = t[0]; e[t[0]++] >= 128; )
            ;
          f = e.slice(l, t[0]);
        }
        break;
      case 5:
        s = 4, f = e.slice(t[0], t[0] + s), t[0] += s;
        break;
      case 1:
        s = 8, f = e.slice(t[0], t[0] + s), t[0] += s;
        break;
      case 2:
        s = _n(e, t), f = e.slice(t[0], t[0] + s), t[0] += s;
        break;
      case 3:
      case 4:
      default:
        throw new Error("PB Type ".concat(i, " for Field ").concat(a, " at offset ").concat(n));
    }
    var o = { data: f, type: i };
    r[a] == null ? r[a] = [o] : r[a].push(o);
  }
  return r;
}
function ft(e) {
  var r = [];
  return e.forEach(function(t, n) {
    t.forEach(function(a) {
      a.data && (r.push(Ne(n * 8 + a.type)), a.type == 2 && r.push(Ne(a.data.length)), r.push(a.data));
    });
  }), mr(r);
}
function Ut(e) {
  for (var r, t = [], n = [0]; n[0] < e.length; ) {
    var a = _n(e, n), i = tt(e.slice(n[0], n[0] + a));
    n[0] += a;
    var s = {
      id: jr(i[1][0].data),
      messages: []
    };
    i[2].forEach(function(f) {
      var l = tt(f.data), o = jr(l[3][0].data);
      s.messages.push({
        meta: l,
        data: e.slice(n[0], n[0] + o)
      }), n[0] += o;
    }), (r = i[3]) != null && r[0] && (s.merge = jr(i[3][0].data) >>> 0 > 0), t.push(s);
  }
  return t;
}
function br(e) {
  var r = [];
  return e.forEach(function(t) {
    var n = [];
    n[1] = [{ data: Ne(t.id), type: 0 }], n[2] = [], t.merge != null && (n[3] = [{ data: Ne(+!!t.merge), type: 0 }]);
    var a = [];
    t.messages.forEach(function(s) {
      a.push(s.data), s.meta[3] = [{ type: 0, data: Ne(s.data.length) }], n[2].push({ data: ft(s.meta), type: 2 });
    });
    var i = ft(n);
    r.push(Ne(i.length)), r.push(i), a.forEach(function(s) {
      return r.push(s);
    });
  }), mr(r);
}
function jd(e, r) {
  if (e != 0)
    throw new Error("Unexpected Snappy chunk type ".concat(e));
  for (var t = [0], n = _n(r, t), a = []; t[0] < r.length; ) {
    var i = r[t[0]] & 3;
    if (i == 0) {
      var s = r[t[0]++] >> 2;
      if (s < 60)
        ++s;
      else {
        var f = s - 59;
        s = r[t[0]], f > 1 && (s |= r[t[0] + 1] << 8), f > 2 && (s |= r[t[0] + 2] << 16), f > 3 && (s |= r[t[0] + 3] << 24), s >>>= 0, s++, t[0] += f;
      }
      a.push(r.slice(t[0], t[0] + s)), t[0] += s;
      continue;
    } else {
      var l = 0, o = 0;
      if (i == 1 ? (o = (r[t[0]] >> 2 & 7) + 4, l = (r[t[0]++] & 224) << 3, l |= r[t[0]++]) : (o = (r[t[0]++] >> 2) + 1, i == 2 ? (l = r[t[0]] | r[t[0] + 1] << 8, t[0] += 2) : (l = (r[t[0]] | r[t[0] + 1] << 8 | r[t[0] + 2] << 16 | r[t[0] + 3] << 24) >>> 0, t[0] += 4)), a = [mr(a)], l == 0)
        throw new Error("Invalid offset 0");
      if (l > a[0].length)
        throw new Error("Invalid offset beyond length");
      if (o >= l)
        for (a.push(a[0].slice(-l)), o -= l; o >= a[a.length - 1].length; )
          a.push(a[a.length - 1]), o -= a[a.length - 1].length;
      a.push(a[0].slice(-l, -l + o));
    }
  }
  var c = mr(a);
  if (c.length != n)
    throw new Error("Unexpected length: ".concat(c.length, " != ").concat(n));
  return c;
}
function Wt(e) {
  for (var r = [], t = 0; t < e.length; ) {
    var n = e[t++], a = e[t] | e[t + 1] << 8 | e[t + 2] << 16;
    t += 3, r.push(jd(n, e.slice(t, t + a))), t += a;
  }
  if (t !== e.length)
    throw new Error("data is not a valid framed stream!");
  return mr(r);
}
function Ur(e) {
  for (var r = [], t = 0; t < e.length; ) {
    var n = Math.min(e.length - t, 268435455), a = new Uint8Array(4);
    r.push(a);
    var i = Ne(n), s = i.length;
    r.push(i), n <= 60 ? (s++, r.push(new Uint8Array([n - 1 << 2]))) : n <= 256 ? (s += 2, r.push(new Uint8Array([240, n - 1 & 255]))) : n <= 65536 ? (s += 3, r.push(new Uint8Array([244, n - 1 & 255, n - 1 >> 8 & 255]))) : n <= 16777216 ? (s += 4, r.push(new Uint8Array([248, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255]))) : n <= 4294967296 && (s += 5, r.push(new Uint8Array([252, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255, n - 1 >>> 24 & 255]))), r.push(e.slice(t, t + n)), s += n, a[0] = 0, a[1] = s & 255, a[2] = s >> 8 & 255, a[3] = s >> 16 & 255, t += n;
  }
  return mr(r);
}
function Sa(e, r) {
  var t = new Uint8Array(32), n = Qn(t), a = 12, i = 0;
  switch (t[0] = 5, e.t) {
    case "n":
      t[1] = 2, Gd(t, a, e.v), i |= 1, a += 16;
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
function Aa(e, r) {
  var t = new Uint8Array(32), n = Qn(t), a = 12, i = 0;
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
function or(e) {
  var r = tt(e);
  return _n(r[1][0].data);
}
function Xd(e, r, t) {
  var n, a, i, s;
  if (!((n = e[6]) != null && n[0]) || !((a = e[7]) != null && a[0]))
    throw "Mutation only works on post-BNC storages!";
  var f = ((s = (i = e[8]) == null ? void 0 : i[0]) == null ? void 0 : s.data) && jr(e[8][0].data) > 0 || !1;
  if (f)
    throw "Math only works with normal offsets";
  for (var l = 0, o = Qn(e[7][0].data), c = 0, p = [], v = Qn(e[4][0].data), h = 0, m = [], u = 0; u < r.length; ++u) {
    if (r[u] == null) {
      o.setUint16(u * 2, 65535, !0), v.setUint16(u * 2, 65535);
      continue;
    }
    o.setUint16(u * 2, c, !0), v.setUint16(u * 2, h, !0);
    var d, A;
    switch (typeof r[u]) {
      case "string":
        d = Sa({ t: "s", v: r[u] }, t), A = Aa({ t: "s", v: r[u] }, t);
        break;
      case "number":
        d = Sa({ t: "n", v: r[u] }, t), A = Aa({ t: "n", v: r[u] }, t);
        break;
      case "boolean":
        d = Sa({ t: "b", v: r[u] }, t), A = Aa({ t: "b", v: r[u] }, t);
        break;
      default:
        throw new Error("Unsupported value " + r[u]);
    }
    p.push(d), c += d.length, m.push(A), h += A.length, ++l;
  }
  for (e[2][0].data = Ne(l); u < e[7][0].data.length / 2; ++u)
    o.setUint16(u * 2, 65535, !0), v.setUint16(u * 2, 65535, !0);
  return e[6][0].data = mr(p), e[3][0].data = mr(m), l;
}
function zd(e, r) {
  if (!r || !r.numbers)
    throw new Error("Must pass a `numbers` option -- check the README");
  var t = e.Sheets[e.SheetNames[0]];
  e.SheetNames.length > 1 && console.error("The Numbers writer currently writes only the first table");
  var n = It(t["!ref"]);
  n.s.r = n.s.c = 0;
  var a = !1;
  n.e.c > 9 && (a = !0, n.e.c = 9), n.e.r > 49 && (a = !0, n.e.r = 49), a && console.error("The Numbers writer is currently limited to ".concat(Qe(n)));
  var i = ea(t, { range: n, header: 1 }), s = ["~Sh33tJ5~"];
  i.forEach(function(P) {
    return P.forEach(function(F) {
      typeof F == "string" && s.push(F);
    });
  });
  var f = {}, l = [], o = be.read(r.numbers, { type: "base64" });
  o.FileIndex.map(function(P, F) {
    return [P, o.FullPaths[F]];
  }).forEach(function(P) {
    var F = P[0], y = P[1];
    if (F.type == 2 && F.name.match(/\.iwa/)) {
      var B = F.content, ae = Wt(B), xe = Ut(ae);
      xe.forEach(function(oe) {
        l.push(oe.id), f[oe.id] = { deps: [], location: y, type: jr(oe.messages[0].meta[1][0].data) };
      });
    }
  }), l.sort(function(P, F) {
    return P - F;
  });
  var c = l.filter(function(P) {
    return P > 1;
  }).map(function(P) {
    return [P, Ne(P)];
  });
  o.FileIndex.map(function(P, F) {
    return [P, o.FullPaths[F]];
  }).forEach(function(P) {
    var F = P[0];
    if (P[1], !!F.name.match(/\.iwa/)) {
      var y = Ut(Wt(F.content));
      y.forEach(function(B) {
        B.messages.forEach(function(ae) {
          c.forEach(function(xe) {
            B.messages.some(function(oe) {
              return jr(oe.meta[1][0].data) != 11006 && Vd(oe.data, xe[1]);
            }) && f[xe[0]].deps.push(B.id);
          });
        });
      });
    }
  });
  for (var p = be.find(o, f[1].location), v = Ut(Wt(p.content)), h, m = 0; m < v.length; ++m) {
    var u = v[m];
    u.id == 1 && (h = u);
  }
  var d = or(tt(h.messages[0].data)[1][0].data);
  for (p = be.find(o, f[d].location), v = Ut(Wt(p.content)), m = 0; m < v.length; ++m)
    u = v[m], u.id == d && (h = u);
  for (d = or(tt(h.messages[0].data)[2][0].data), p = be.find(o, f[d].location), v = Ut(Wt(p.content)), m = 0; m < v.length; ++m)
    u = v[m], u.id == d && (h = u);
  for (d = or(tt(h.messages[0].data)[2][0].data), p = be.find(o, f[d].location), v = Ut(Wt(p.content)), m = 0; m < v.length; ++m)
    u = v[m], u.id == d && (h = u);
  var A = tt(h.messages[0].data);
  {
    A[6][0].data = Ne(n.e.r + 1), A[7][0].data = Ne(n.e.c + 1);
    var k = or(A[46][0].data), C = be.find(o, f[k].location), M = Ut(Wt(C.content));
    {
      for (var Q = 0; Q < M.length && M[Q].id != k; ++Q)
        ;
      if (M[Q].id != k)
        throw "Bad ColumnRowUIDMapArchive";
      var ce = tt(M[Q].messages[0].data);
      ce[1] = [], ce[2] = [], ce[3] = [];
      for (var O = 0; O <= n.e.c; ++O) {
        var H = [];
        H[1] = H[2] = [{ type: 0, data: Ne(O + 420690) }], ce[1].push({ type: 2, data: ft(H) }), ce[2].push({ type: 0, data: Ne(O) }), ce[3].push({ type: 0, data: Ne(O) });
      }
      ce[4] = [], ce[5] = [], ce[6] = [];
      for (var D = 0; D <= n.e.r; ++D)
        H = [], H[1] = H[2] = [{ type: 0, data: Ne(D + 726270) }], ce[4].push({ type: 2, data: ft(H) }), ce[5].push({ type: 0, data: Ne(D) }), ce[6].push({ type: 0, data: Ne(D) });
      M[Q].messages[0].data = ft(ce);
    }
    C.content = Ur(br(M)), C.size = C.content.length, delete A[46];
    var j = tt(A[4][0].data);
    {
      j[7][0].data = Ne(n.e.r + 1);
      var X = tt(j[1][0].data), Y = or(X[2][0].data);
      C = be.find(o, f[Y].location), M = Ut(Wt(C.content));
      {
        if (M[0].id != Y)
          throw "Bad HeaderStorageBucket";
        var ue = tt(M[0].messages[0].data);
        for (D = 0; D < i.length; ++D) {
          var V = tt(ue[2][0].data);
          V[1][0].data = Ne(D), V[4][0].data = Ne(i[D].length), ue[2][D] = { type: ue[2][0].type, data: ft(V) };
        }
        M[0].messages[0].data = ft(ue);
      }
      C.content = Ur(br(M)), C.size = C.content.length;
      var b = or(j[2][0].data);
      C = be.find(o, f[b].location), M = Ut(Wt(C.content));
      {
        if (M[0].id != b)
          throw "Bad HeaderStorageBucket";
        for (ue = tt(M[0].messages[0].data), O = 0; O <= n.e.c; ++O)
          V = tt(ue[2][0].data), V[1][0].data = Ne(O), V[4][0].data = Ne(n.e.r + 1), ue[2][O] = { type: ue[2][0].type, data: ft(V) };
        M[0].messages[0].data = ft(ue);
      }
      C.content = Ur(br(M)), C.size = C.content.length;
      var K = or(j[4][0].data);
      (function() {
        for (var P = be.find(o, f[K].location), F = Ut(Wt(P.content)), y, B = 0; B < F.length; ++B) {
          var ae = F[B];
          ae.id == K && (y = ae);
        }
        var xe = tt(y.messages[0].data);
        {
          xe[3] = [];
          var oe = [];
          s.forEach(function(ye, Je) {
            oe[1] = [{ type: 0, data: Ne(Je) }], oe[2] = [{ type: 0, data: Ne(1) }], oe[3] = [{ type: 2, data: Hd(ye) }], xe[3].push({ type: 2, data: ft(oe) });
          });
        }
        y.messages[0].data = ft(xe);
        var se = br(F), Ce = Ur(se);
        P.content = Ce, P.size = P.content.length;
      })();
      var J = tt(j[3][0].data);
      {
        var he = J[1][0];
        delete J[2];
        var _e = tt(he.data);
        {
          var We = or(_e[2][0].data);
          (function() {
            for (var P = be.find(o, f[We].location), F = Ut(Wt(P.content)), y, B = 0; B < F.length; ++B) {
              var ae = F[B];
              ae.id == We && (y = ae);
            }
            var xe = tt(y.messages[0].data);
            {
              delete xe[6], delete J[7];
              var oe = new Uint8Array(xe[5][0].data);
              xe[5] = [];
              for (var se = 0, Ce = 0; Ce <= n.e.r; ++Ce) {
                var ye = tt(oe);
                se += Xd(ye, i[Ce], s), ye[1][0].data = Ne(Ce), xe[5].push({ data: ft(ye), type: 2 });
              }
              xe[1] = [{ type: 0, data: Ne(n.e.c + 1) }], xe[2] = [{ type: 0, data: Ne(n.e.r + 1) }], xe[3] = [{ type: 0, data: Ne(se) }], xe[4] = [{ type: 0, data: Ne(n.e.r + 1) }];
            }
            y.messages[0].data = ft(xe);
            var Je = br(F), Fe = Ur(Je);
            P.content = Fe, P.size = P.content.length;
          })();
        }
        he.data = ft(_e);
      }
      j[3][0].data = ft(J);
    }
    A[4][0].data = ft(j);
  }
  h.messages[0].data = ft(A);
  var Ke = br(v), S = Ur(Ke);
  return p.content = S, p.size = p.content.length, o;
}
function Yd(e) {
  return function(t) {
    for (var n = 0; n != e.length; ++n) {
      var a = e[n];
      t[a[0]] === void 0 && (t[a[0]] = a[1]), a[2] === "n" && (t[a[0]] = Number(t[a[0]]));
    }
  };
}
function Qa(e) {
  Yd([
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
function Kd(e, r) {
  return r.bookType == "ods" ? ys(e, r) : r.bookType == "numbers" ? zd(e, r) : r.bookType == "xlsb" ? Jd(e, r) : Zd(e, r);
}
function Jd(e, r) {
  $r = 1024, e && !e.SSF && (e.SSF = Ft(Ye)), e && e.SSF && (na(), ra(e.SSF), r.revssf = aa(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF), r.rels = {}, r.wbrels = {}, r.Strings = /*::((*/
  [], r.Strings.Count = 0, r.Strings.Unique = 0, hn ? r.revStrings = /* @__PURE__ */ new Map() : (r.revStrings = {}, r.revStrings.foo = [], delete r.revStrings.foo);
  var t = r.bookType == "xlsb" ? "bin" : "xml", n = fs.indexOf(r.bookType) > -1, a = Mi();
  Qa(r = r || {});
  var i = Ba(), s = "", f = 0;
  if (r.cellXfs = [], gr(r.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", Ae(i, s, Wi(e.Props, r)), a.coreprops.push(s), Le(r.rels, 2, s, Oe.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var l = [], o = 0; o < e.SheetNames.length; ++o)
      (e.Workbook.Sheets[o] || {}).Hidden != 2 && l.push(e.SheetNames[o]);
    e.Props.SheetNames = l;
  }
  for (e.Props.Worksheets = e.Props.SheetNames.length, Ae(i, s, Hi(e.Props)), a.extprops.push(s), Le(r.rels, 3, s, Oe.EXT_PROPS), e.Custprops !== e.Props && ht(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", Ae(i, s, Vi(e.Custprops)), a.custprops.push(s), Le(r.rels, 4, s, Oe.CUST_PROPS)), f = 1; f <= e.SheetNames.length; ++f) {
    var c = { "!id": {} }, p = e.Sheets[e.SheetNames[f - 1]], v = (p || {})["!type"] || "sheet";
    switch (v) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + t, Ae(i, s, Qh(f - 1, s, r, e, c)), a.sheets.push(s), Le(r.wbrels, -1, "worksheets/sheet" + f + "." + t, Oe.WS[0]);
    }
    if (p) {
      var h = p["!comments"], m = !1, u = "";
      h && h.length > 0 && (u = "xl/comments" + f + "." + t, Ae(i, u, rd(h, u)), a.comments.push(u), Le(c, -1, "../comments" + f + "." + t, Oe.CMNT), m = !0), p["!legacy"] && m && Ae(i, "xl/drawings/vmlDrawing" + f + ".vml", is(f, p["!comments"])), delete p["!comments"], delete p["!legacy"];
    }
    c["!id"].rId1 && Ae(i, bi(s), Vr(c));
  }
  return r.Strings != null && r.Strings.length > 0 && (s = "xl/sharedStrings." + t, Ae(i, s, td(r.Strings, s, r)), a.strs.push(s), Le(r.wbrels, -1, "sharedStrings." + t, Oe.SST)), s = "xl/workbook." + t, Ae(i, s, qh(e, s)), a.workbooks.push(s), Le(r.rels, 1, s, Oe.WB), s = "xl/theme/theme1.xml", Ae(i, s, ns(e.Themes, r)), a.themes.push(s), Le(r.wbrels, -1, "theme/theme1.xml", Oe.THEME), s = "xl/styles." + t, Ae(i, s, ed(e, s, r)), a.styles.push(s), Le(r.wbrels, -1, "styles." + t, Oe.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", Ae(i, s, e.vbaraw), a.vba.push(s), Le(r.wbrels, -1, "vbaProject.bin", Oe.VBA)), s = "xl/metadata." + t, Ae(i, s, nd(s)), a.metadata.push(s), Le(r.wbrels, -1, "metadata." + t, Oe.XLMETA), Ae(i, "[Content_Types].xml", Bi(a, r)), Ae(i, "_rels/.rels", Vr(r.rels)), Ae(i, "xl/_rels/workbook." + t + ".rels", Vr(r.wbrels)), delete r.revssf, delete r.ssf, i;
}
function Zd(e, r) {
  $r = 1024, e && !e.SSF && (e.SSF = Ft(Ye)), e && e.SSF && (na(), ra(e.SSF), r.revssf = aa(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF), r.rels = {}, r.wbrels = {}, r.Strings = /*::((*/
  [], r.Strings.Count = 0, r.Strings.Unique = 0, hn ? r.revStrings = /* @__PURE__ */ new Map() : (r.revStrings = {}, r.revStrings.foo = [], delete r.revStrings.foo);
  var t = "xml", n = fs.indexOf(r.bookType) > -1, a = Mi();
  Qa(r = r || {});
  var i = Ba(), s = "", f = 0;
  if (r.cellXfs = [], gr(r.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", Ae(i, s, Wi(e.Props, r)), a.coreprops.push(s), Le(r.rels, 2, s, Oe.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var l = [], o = 0; o < e.SheetNames.length; ++o)
      (e.Workbook.Sheets[o] || {}).Hidden != 2 && l.push(e.SheetNames[o]);
    e.Props.SheetNames = l;
  }
  e.Props.Worksheets = e.Props.SheetNames.length, Ae(i, s, Hi(e.Props)), a.extprops.push(s), Le(r.rels, 3, s, Oe.EXT_PROPS), e.Custprops !== e.Props && ht(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", Ae(i, s, Vi(e.Custprops)), a.custprops.push(s), Le(r.rels, 4, s, Oe.CUST_PROPS));
  var c = ["SheetJ5"];
  for (r.tcid = 0, f = 1; f <= e.SheetNames.length; ++f) {
    var p = { "!id": {} }, v = e.Sheets[e.SheetNames[f - 1]], h = (v || {})["!type"] || "sheet";
    switch (h) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + t, Ae(i, s, ps(f - 1, r, e, p)), a.sheets.push(s), Le(r.wbrels, -1, "worksheets/sheet" + f + "." + t, Oe.WS[0]);
    }
    if (v) {
      var m = v["!comments"], u = !1, d = "";
      if (m && m.length > 0) {
        var A = !1;
        m.forEach(function(k) {
          k[1].forEach(function(C) {
            C.T == !0 && (A = !0);
          });
        }), A && (d = "xl/threadedComments/threadedComment" + f + "." + t, Ae(i, d, Cc(m, c, r)), a.threadedcomments.push(d), Le(p, -1, "../threadedComments/threadedComment" + f + "." + t, Oe.TCMNT)), d = "xl/comments" + f + "." + t, Ae(i, d, ss(m)), a.comments.push(d), Le(p, -1, "../comments" + f + "." + t, Oe.CMNT), u = !0;
      }
      v["!legacy"] && u && Ae(i, "xl/drawings/vmlDrawing" + f + ".vml", is(f, v["!comments"])), delete v["!comments"], delete v["!legacy"];
    }
    p["!id"].rId1 && Ae(i, bi(s), Vr(p));
  }
  return r.Strings != null && r.Strings.length > 0 && (s = "xl/sharedStrings." + t, Ae(i, s, Zi(r.Strings, r)), a.strs.push(s), Le(r.wbrels, -1, "sharedStrings." + t, Oe.SST)), s = "xl/workbook." + t, Ae(i, s, _s(e)), a.workbooks.push(s), Le(r.rels, 1, s, Oe.WB), s = "xl/theme/theme1.xml", Ae(i, s, ns(e.Themes, r)), a.themes.push(s), Le(r.wbrels, -1, "theme/theme1.xml", Oe.THEME), s = "xl/styles." + t, Ae(i, s, ts(e, r)), a.styles.push(s), Le(r.wbrels, -1, "styles." + t, Oe.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", Ae(i, s, e.vbaraw), a.vba.push(s), Le(r.wbrels, -1, "vbaProject.bin", Oe.VBA)), s = "xl/metadata." + t, Ae(i, s, as()), a.metadata.push(s), Le(r.wbrels, -1, "metadata." + t, Oe.XLMETA), c.length > 1 && (s = "xl/persons/person.xml", Ae(i, s, Dc(c)), a.people.push(s), Le(r.wbrels, -1, "persons/person.xml", Oe.PEOPLE)), Ae(i, "[Content_Types].xml", Bi(a, r)), Ae(i, "_rels/.rels", Vr(r.rels)), Ae(i, "xl/_rels/workbook." + t + ".rels", Vr(r.wbrels)), delete r.revssf, delete r.ssf, i;
}
function qd(e, r) {
  var t = "";
  switch ((r || {}).type || "base64") {
    case "buffer":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    case "base64":
      t = nr(e.slice(0, 12));
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
function Fs(e, r) {
  switch (r.type) {
    case "base64":
    case "binary":
      break;
    case "buffer":
    case "array":
      r.type = "";
      break;
    case "file":
      return Sn(r.file, be.write(e, { type: Ie ? "buffer" : "" }));
    case "string":
      throw new Error("'string' output type invalid for '" + r.bookType + "' files");
    default:
      throw new Error("Unrecognized type " + r.type);
  }
  return be.write(e, r);
}
function Qd(e, r) {
  var t = Ft(r || {}), n = Kd(e, t);
  return ex(n, t);
}
function ex(e, r) {
  var t = {}, n = Ie ? "nodebuffer" : typeof Uint8Array < "u" ? "array" : "string";
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
  var a = e.FullPaths ? be.write(e, { fileType: "zip", type: (
    /*::(*/
    { nodebuffer: "buffer", string: "binary" }[t.type] || t.type
  ), compression: !!r.compression }) : e.generate(t);
  if (typeof Deno < "u" && typeof a == "string") {
    if (r.type == "binary" || r.type == "base64") return a;
    a = new Uint8Array(ta(a));
  }
  return r.password && typeof encrypt_agile < "u" ? Fs(encrypt_agile(a, r.password), r) : r.type === "file" ? Sn(r.file, a) : r.type == "string" ? ln(
    /*::(*/
    a
    /*:: :any)*/
  ) : a;
}
function tx(e, r) {
  var t = r || {}, n = md(e, t);
  return Fs(n, t);
}
function Yt(e, r, t) {
  t || (t = "");
  var n = t + e;
  switch (r.type) {
    case "base64":
      return vn(mn(n));
    case "binary":
      return mn(n);
    case "string":
      return e;
    case "file":
      return Sn(r.file, n, "utf8");
    case "buffer":
      return Ie ? ir(n, "utf8") : typeof TextEncoder < "u" ? new TextEncoder().encode(n) : Yt(n, { type: "binary" }).split("").map(function(a) {
        return a.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + r.type);
}
function rx(e, r) {
  switch (r.type) {
    case "base64":
      return vn(e);
    case "binary":
      return e;
    case "string":
      return e;
    case "file":
      return Sn(r.file, e, "binary");
    case "buffer":
      return Ie ? ir(e, "binary") : e.split("").map(function(t) {
        return t.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + r.type);
}
function bn(e, r) {
  switch (r.type) {
    case "string":
    case "base64":
    case "binary":
      for (var t = "", n = 0; n < e.length; ++n) t += String.fromCharCode(e[n]);
      return r.type == "base64" ? vn(t) : r.type == "string" ? ln(t) : t;
    case "file":
      return Sn(r.file, e);
    case "buffer":
      return e;
    default:
      throw new Error("Unrecognized type " + r.type);
  }
}
function ks(e, r) {
  Df(), $h(e);
  var t = Ft(r || {});
  if (t.cellStyles && (t.cellNF = !0, t.sheetStubs = !0), t.type == "array") {
    t.type = "binary";
    var n = ks(e, t);
    return t.type = "array", ta(n);
  }
  var a = 0;
  if (t.sheet && (typeof t.sheet == "number" ? a = t.sheet : a = e.SheetNames.indexOf(t.sheet), !e.SheetNames[a]))
    throw new Error("Sheet not found: " + t.sheet + " : " + typeof t.sheet);
  switch (t.bookType || "xlsb") {
    case "xml":
    case "xlml":
      return Yt(vd(e, t), t);
    case "slk":
    case "sylk":
      return Yt(bo.from_sheet(e.Sheets[e.SheetNames[a]], t), t);
    case "htm":
    case "html":
      return Yt(ws(e.Sheets[e.SheetNames[a]], t), t);
    case "txt":
      return rx(Ds(e.Sheets[e.SheetNames[a]], t), t);
    case "csv":
      return Yt(e0(e.Sheets[e.SheetNames[a]], t), t, "\uFEFF");
    case "dif":
      return Yt(Uo.from_sheet(e.Sheets[e.SheetNames[a]], t), t);
    case "dbf":
      return bn(Bo.from_sheet(e.Sheets[e.SheetNames[a]], t), t);
    case "prn":
      return Yt(Wo.from_sheet(e.Sheets[e.SheetNames[a]], t), t);
    case "rtf":
      return Yt(zo.from_sheet(e.Sheets[e.SheetNames[a]], t), t);
    case "eth":
      return Yt(Ji.from_sheet(e.Sheets[e.SheetNames[a]], t), t);
    case "fods":
      return Yt(ys(e, t), t);
    case "wk1":
      return bn(W0.sheet_to_wk1(e.Sheets[e.SheetNames[a]], t), t);
    case "wk3":
      return bn(W0.book_to_wk3(e, t), t);
    case "biff2":
      t.biff || (t.biff = 2);
    case "biff3":
      t.biff || (t.biff = 3);
    case "biff4":
      return t.biff || (t.biff = 4), bn(Es(e, t), t);
    case "biff5":
      t.biff || (t.biff = 5);
    case "biff8":
    case "xla":
    case "xls":
      return t.biff || (t.biff = 8), tx(e, t);
    case "xlsx":
    case "xlsm":
    case "xlam":
    case "xlsb":
    case "numbers":
    case "ods":
      return Qd(e, t);
    default:
      throw new Error("Unrecognized bookType |" + t.bookType + "|");
  }
}
function nx(e) {
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
function Cs(e, r, t) {
  var n = {};
  return n.type = "file", n.file = r, nx(n), ks(e, n);
}
function ax(e, r, t, n, a, i, s, f) {
  var l = ut(t), o = f.defval, c = f.raw || !Object.prototype.hasOwnProperty.call(f, "raw"), p = !0, v = a === 1 ? [] : {};
  if (a !== 1)
    if (Object.defineProperty) try {
      Object.defineProperty(v, "__rowNum__", { value: t, enumerable: !1 });
    } catch {
      v.__rowNum__ = t;
    }
    else v.__rowNum__ = t;
  if (!s || e[t]) for (var h = r.s.c; h <= r.e.c; ++h) {
    var m = s ? e[t][h] : e[n[h] + l];
    if (m === void 0 || m.t === void 0) {
      if (o === void 0) continue;
      i[h] != null && (v[i[h]] = o);
      continue;
    }
    var u = m.v;
    switch (m.t) {
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
        throw new Error("unrecognized type " + m.t);
    }
    if (i[h] != null) {
      if (u == null)
        if (m.t == "e" && u === null) v[i[h]] = null;
        else if (o !== void 0) v[i[h]] = o;
        else if (c && u === null) v[i[h]] = null;
        else continue;
      else
        v[i[h]] = c && (m.t !== "n" || m.t === "n" && f.rawNumbers !== !1) ? u : ar(m, u, f);
      u != null && (p = !1);
    }
  }
  return { row: v, isempty: p };
}
function ea(e, r) {
  if (e == null || e["!ref"] == null) return [];
  var t = { t: "n", v: 0 }, n = 0, a = 1, i = [], s = 0, f = "", l = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, o = r || {}, c = o.range != null ? o.range : e["!ref"];
  switch (o.header === 1 ? n = 1 : o.header === "A" ? n = 2 : Array.isArray(o.header) ? n = 3 : o.header == null && (n = 0), typeof c) {
    case "string":
      l = $e(c);
      break;
    case "number":
      l = $e(e["!ref"]), l.s.r = c;
      break;
    default:
      l = c;
  }
  n > 0 && (a = 0);
  var p = ut(l.s.r), v = [], h = [], m = 0, u = 0, d = Array.isArray(e), A = l.s.r, k = 0, C = {};
  d && !e[A] && (e[A] = []);
  var M = o.skipHidden && e["!cols"] || [], Q = o.skipHidden && e["!rows"] || [];
  for (k = l.s.c; k <= l.e.c; ++k)
    if (!(M[k] || {}).hidden)
      switch (v[k] = xt(k), t = d ? e[A][k] : e[v[k] + p], n) {
        case 1:
          i[k] = k - l.s.c;
          break;
        case 2:
          i[k] = v[k];
          break;
        case 3:
          i[k] = o.header[k - l.s.c];
          break;
        default:
          if (t == null && (t = { w: "__EMPTY", t: "s" }), f = s = ar(t, null, o), u = C[s] || 0, !u) C[s] = 1;
          else {
            do
              f = s + "_" + u++;
            while (C[f]);
            C[s] = u, C[f] = 1;
          }
          i[k] = f;
      }
  for (A = l.s.r + a; A <= l.e.r; ++A)
    if (!(Q[A] || {}).hidden) {
      var ce = ax(e, l, A, v, n, i, d, o);
      (ce.isempty === !1 || (n === 1 ? o.blankrows !== !1 : o.blankrows)) && (h[m++] = ce.row);
    }
  return h.length = m, h;
}
var Y0 = /"/g;
function ix(e, r, t, n, a, i, s, f) {
  for (var l = !0, o = [], c = "", p = ut(t), v = r.s.c; v <= r.e.c; ++v)
    if (n[v]) {
      var h = f.dense ? (e[t] || [])[v] : e[n[v] + p];
      if (h == null) c = "";
      else if (h.v != null) {
        l = !1, c = "" + (f.rawNumbers && h.t == "n" ? h.v : ar(h, null, f));
        for (var m = 0, u = 0; m !== c.length; ++m) if ((u = c.charCodeAt(m)) === a || u === i || u === 34 || f.forceQuotes) {
          c = '"' + c.replace(Y0, '""') + '"';
          break;
        }
        c == "ID" && (c = '"ID"');
      } else h.f != null && !h.F ? (l = !1, c = "=" + h.f, c.indexOf(",") >= 0 && (c = '"' + c.replace(Y0, '""') + '"')) : c = "";
      o.push(c);
    }
  return f.blankrows === !1 && l ? null : o.join(s);
}
function e0(e, r) {
  var t = [], n = r ?? {};
  if (e == null || e["!ref"] == null) return "";
  var a = $e(e["!ref"]), i = n.FS !== void 0 ? n.FS : ",", s = i.charCodeAt(0), f = n.RS !== void 0 ? n.RS : `
`, l = f.charCodeAt(0), o = new RegExp((i == "|" ? "\\|" : i) + "+$"), c = "", p = [];
  n.dense = Array.isArray(e);
  for (var v = n.skipHidden && e["!cols"] || [], h = n.skipHidden && e["!rows"] || [], m = a.s.c; m <= a.e.c; ++m) (v[m] || {}).hidden || (p[m] = xt(m));
  for (var u = 0, d = a.s.r; d <= a.e.r; ++d)
    (h[d] || {}).hidden || (c = ix(e, a, d, p, s, l, i, n), c != null && (n.strip && (c = c.replace(o, "")), (c || n.blankrows !== !1) && t.push((u++ ? f : "") + c)));
  return delete n.dense, t.join("");
}
function Ds(e, r) {
  r || (r = {}), r.FS = "	", r.RS = `
`;
  var t = e0(e, r);
  return t;
}
function sx(e) {
  var r = "", t, n = "";
  if (e == null || e["!ref"] == null) return [];
  var a = $e(e["!ref"]), i = "", s = [], f, l = [], o = Array.isArray(e);
  for (f = a.s.c; f <= a.e.c; ++f) s[f] = xt(f);
  for (var c = a.s.r; c <= a.e.r; ++c)
    for (i = ut(c), f = a.s.c; f <= a.e.c; ++f)
      if (r = s[f] + i, t = o ? (e[c] || [])[f] : e[r], n = "", t !== void 0) {
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
        l[l.length] = r + "=" + n;
      }
  return l;
}
function Os(e, r, t) {
  var n = t || {}, a = +!n.skipHeader, i = e || {}, s = 0, f = 0;
  if (i && n.origin != null)
    if (typeof n.origin == "number") s = n.origin;
    else {
      var l = typeof n.origin == "string" ? it(n.origin) : n.origin;
      s = l.r, f = l.c;
    }
  var o, c = { s: { c: 0, r: 0 }, e: { c: f, r: s + r.length - 1 + a } };
  if (i["!ref"]) {
    var p = $e(i["!ref"]);
    c.e.c = Math.max(c.e.c, p.e.c), c.e.r = Math.max(c.e.r, p.e.r), s == -1 && (s = p.e.r + 1, c.e.r = s + r.length - 1 + a);
  } else
    s == -1 && (s = 0, c.e.r = r.length - 1 + a);
  var v = n.header || [], h = 0;
  r.forEach(function(u, d) {
    ht(u).forEach(function(A) {
      (h = v.indexOf(A)) == -1 && (v[h = v.length] = A);
      var k = u[A], C = "z", M = "", Q = Be({ c: f + h, r: s + d + a });
      o = Tn(i, Q), k && typeof k == "object" && !(k instanceof Date) ? i[Q] = k : (typeof k == "number" ? C = "n" : typeof k == "boolean" ? C = "b" : typeof k == "string" ? C = "s" : k instanceof Date ? (C = "d", n.cellDates || (C = "n", k = yt(k)), M = n.dateNF || Ye[14]) : k === null && n.nullError && (C = "e", k = 0), o ? (o.t = C, o.v = k, delete o.w, delete o.R, M && (o.z = M)) : i[Q] = o = { t: C, v: k }, M && (o.z = M));
    });
  }), c.e.c = Math.max(c.e.c, f + v.length - 1);
  var m = ut(s);
  if (a) for (h = 0; h < v.length; ++h) i[xt(h + f) + m] = { t: "s", v: v[h] };
  return i["!ref"] = Qe(c), i;
}
function fx(e, r) {
  return Os(null, e, r);
}
function Tn(e, r, t) {
  if (typeof r == "string") {
    if (Array.isArray(e)) {
      var n = it(r);
      return e[n.r] || (e[n.r] = []), e[n.r][n.c] || (e[n.r][n.c] = { t: "z" });
    }
    return e[r] || (e[r] = { t: "z" });
  }
  return typeof r != "number" ? Tn(e, Be(r)) : Tn(e, Be({ r, c: t || 0 }));
}
function lx(e, r) {
  if (typeof r == "number") {
    if (r >= 0 && e.SheetNames.length > r) return r;
    throw new Error("Cannot find sheet # " + r);
  } else if (typeof r == "string") {
    var t = e.SheetNames.indexOf(r);
    if (t > -1) return t;
    throw new Error("Cannot find sheet name |" + r + "|");
  } else throw new Error("Cannot find sheet |" + r + "|");
}
function ox() {
  return { SheetNames: [], Sheets: {} };
}
function cx(e, r, t, n) {
  var a = 1;
  if (!t) for (; a <= 65535 && e.SheetNames.indexOf(t = "Sheet" + a) != -1; ++a, t = void 0) ;
  if (!t || e.SheetNames.length >= 65535) throw new Error("Too many worksheets");
  if (n && e.SheetNames.indexOf(t) >= 0) {
    var i = t.match(/(^.*?)(\d+)$/);
    a = i && +i[2] || 0;
    var s = i && i[1] || t;
    for (++a; a <= 65535 && e.SheetNames.indexOf(t = s + a) != -1; ++a) ;
  }
  if (gs(t), e.SheetNames.indexOf(t) >= 0) throw new Error("Worksheet with name |" + t + "| already exists!");
  return e.SheetNames.push(t), e.Sheets[t] = r, t;
}
function ux(e, r, t) {
  e.Workbook || (e.Workbook = {}), e.Workbook.Sheets || (e.Workbook.Sheets = []);
  var n = lx(e, r);
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
function hx(e, r) {
  return e.z = r, e;
}
function Is(e, r, t) {
  return r ? (e.l = { Target: r }, t && (e.l.Tooltip = t)) : delete e.l, e;
}
function dx(e, r, t) {
  return Is(e, "#" + r, t);
}
function xx(e, r, t) {
  e.c || (e.c = []), e.c.push({ t: r, a: t || "SheetJS" });
}
function vx(e, r, t, n) {
  for (var a = typeof r != "string" ? r : $e(r), i = typeof r == "string" ? r : Qe(r), s = a.s.r; s <= a.e.r; ++s) for (var f = a.s.c; f <= a.e.c; ++f) {
    var l = Tn(e, s, f);
    l.t = "n", l.F = i, delete l.v, s == a.s.r && f == a.s.c && (l.f = t, n && (l.D = !0));
  }
  return e;
}
var Kt = {
  encode_col: xt,
  encode_row: ut,
  encode_cell: Be,
  encode_range: Qe,
  decode_col: Va,
  decode_row: Ha,
  split_cell: Dl,
  decode_cell: it,
  decode_range: It,
  format_cell: ar,
  sheet_add_aoa: Oi,
  sheet_add_json: Os,
  sheet_add_dom: Ss,
  aoa_to_sheet: Kr,
  json_to_sheet: fx,
  table_to_sheet: As,
  table_to_book: Ud,
  sheet_to_csv: e0,
  sheet_to_txt: Ds,
  sheet_to_json: ea,
  sheet_to_html: ws,
  sheet_to_formulae: sx,
  sheet_to_row_object_array: ea,
  sheet_get_cell: Tn,
  book_new: ox,
  book_append_sheet: cx,
  book_set_sheet_visibility: ux,
  cell_set_number_format: hx,
  cell_set_hyperlink: Is,
  cell_set_internal_link: dx,
  cell_add_comment: xx,
  sheet_set_array_formula: vx,
  consts: {
    SHEET_VISIBLE: 0,
    SHEET_HIDDEN: 1,
    SHEET_VERY_HIDDEN: 2
  }
};
const px = { class: "wr-header" }, mx = { class: "wr-week-label" }, gx = {
  key: 0,
  class: "wr-body"
}, _x = { class: "wr-stats" }, Tx = { class: "wr-stat" }, Ex = { class: "wr-stat__num" }, wx = { class: "wr-stat wr-stat--green" }, Sx = { class: "wr-stat__num" }, Ax = { class: "wr-stat wr-stat--orange" }, yx = { class: "wr-stat__num" }, Fx = { class: "wr-stat__num" }, kx = { class: "wr-section" }, Cx = { class: "wr-table" }, Dx = {
  key: 0,
  class: "wr-section"
}, Ox = { class: "wr-table" }, Ix = { class: "td-green" }, Rx = {
  key: 1,
  class: "wr-section"
}, Nx = { class: "wr-overdue-list" }, Px = {
  key: 0,
  class: "wr-proj"
}, Lx = { class: "wr-summary" }, Mx = /* @__PURE__ */ zr({
  __name: "WeeklyReportDialog",
  props: {
    visible: { type: Boolean },
    generateReport: { type: Function }
  },
  emits: ["close"],
  setup(e, { emit: r }) {
    const t = e, n = Pe(f0(nt()));
    Na(() => t.visible, (u) => {
      u && (n.value = f0(nt()));
    });
    const a = Ze(() => t.generateReport(n.value)), i = Ze(() => {
      const u = n.value, d = Ca(u), [A, k, C] = u.split("-").map(Number), [, M, Q] = d.split("-").map(Number), ce = o(u);
      return `${A}年${k}月${C}日 — ${M}月${Q}日（第${ce}周）`;
    }), s = Ze(() => Ca(n.value) < nt());
    function f() {
      const u = new Date(n.value);
      u.setDate(u.getDate() - 7), n.value = `${u.getFullYear()}-${String(u.getMonth() + 1).padStart(2, "0")}-${String(u.getDate()).padStart(2, "0")}`;
    }
    function l() {
      if (!s.value) return;
      const u = new Date(n.value);
      u.setDate(u.getDate() + 7), n.value = `${u.getFullYear()}-${String(u.getMonth() + 1).padStart(2, "0")}-${String(u.getDate()).padStart(2, "0")}`;
    }
    function o(u) {
      const d = new Date(u), A = new Date(d.getFullYear(), 0, 1), k = d.getTime() - A.getTime();
      return Math.ceil((k / 864e5 + A.getDay() + 1) / 7);
    }
    function c(u) {
      const [, d, A] = u.split("-").map(Number);
      return `${d}/${A}`;
    }
    const p = Ze(() => {
      var d;
      const u = ((d = a.value) == null ? void 0 : d.completionRate) ?? 0;
      return u >= 80 ? "wr-stat--green" : u >= 50 ? "wr-stat--orange" : "wr-stat--red";
    }), v = Ze(() => {
      if (!a.value) return [];
      const u = a.value, d = [];
      u.completionRate >= 80 ? d.push("本周完成度很高，继续保持！") : u.completionRate >= 50 ? d.push("本周完成了大部分任务，还有提升空间。") : u.totalCreated > 0 ? d.push("本周完成度偏低，建议精简任务优先级。") : d.push("本周暂无任务记录。");
      const A = u.overdueTasks.filter((k) => k.rolloverCount >= 3);
      return A.length > 0 && d.push(`有${A.length}个任务反复顺延超过3次，建议评估是否需要调整优先级。`), u.projectStats.forEach((k) => {
        k.created > 0 && k.completed / k.created < 0.3 && d.push(`「${k.name}」任务完成度较低，建议关注进度。`);
      }), d;
    });
    function h() {
      if (!a.value) return;
      const u = JSON.stringify(a.value, null, 2), d = new Blob([u], { type: "application/json" }), A = URL.createObjectURL(d), k = document.createElement("a");
      k.href = A, k.download = `weekly-report-${n.value}.json`, k.click(), URL.revokeObjectURL(A);
    }
    function m() {
      if (!a.value) return;
      const u = a.value, d = Kt.book_new(), A = [
        ["周期", `${u.weekStart} ~ ${u.weekEnd}`],
        ["新建任务", u.totalCreated],
        ["完成任务", u.totalCompleted],
        ["顺延任务", u.totalRollover],
        ["逾期任务", u.totalOverdue],
        ["完成率", `${u.completionRate.toFixed(1)}%`]
      ];
      Kt.book_append_sheet(d, Kt.aoa_to_sheet(A), "周报概览");
      const k = [["日期", "新建", "完成", "顺延"], ...u.dailyStats.map((M) => [M.date, M.created, M.completed, M.rollover])];
      Kt.book_append_sheet(d, Kt.aoa_to_sheet(k), "每日明细");
      const C = [
        ["任务标题", "所属项目", "原定日期", "顺延次数"],
        ...u.overdueTasks.map((M) => [M.title, M.project ?? "", M.originalTargetDate, M.rolloverCount])
      ];
      Kt.book_append_sheet(d, Kt.aoa_to_sheet(C), "逾期任务"), Cs(d, `weekly-report-${u.weekStart}.xlsx`);
    }
    return (u, d) => (ee(), $t(ge(dn), {
      "model-value": e.visible,
      title: "每周复盘",
      width: "680px",
      onClose: d[0] || (d[0] = (A) => u.$emit("close")),
      "append-to-body": ""
    }, {
      footer: Ee(() => [
        Te(ge(je), { onClick: h }, {
          default: Ee(() => [...d[16] || (d[16] = [
            Re("导出 JSON", -1)
          ])]),
          _: 1
        }),
        Te(ge(je), {
          type: "primary",
          onClick: m
        }, {
          default: Ee(() => [...d[17] || (d[17] = [
            Re("导出 Excel", -1)
          ])]),
          _: 1
        })
      ]),
      default: Ee(() => [
        q("div", px, [
          Te(ge(je), {
            size: "small",
            onClick: f
          }, {
            default: Ee(() => [...d[1] || (d[1] = [
              Re("‹ 上周", -1)
            ])]),
            _: 1
          }),
          q("span", mx, we(i.value), 1),
          Te(ge(je), {
            size: "small",
            onClick: l,
            disabled: !s.value
          }, {
            default: Ee(() => [...d[2] || (d[2] = [
              Re("下周 ›", -1)
            ])]),
            _: 1
          }, 8, ["disabled"])
        ]),
        a.value ? (ee(), le("div", gx, [
          q("div", _x, [
            q("div", Tx, [
              q("div", Ex, we(a.value.totalCreated), 1),
              d[3] || (d[3] = q("div", { class: "wr-stat__label" }, "新建任务", -1))
            ]),
            q("div", wx, [
              q("div", Sx, we(a.value.totalCompleted), 1),
              d[4] || (d[4] = q("div", { class: "wr-stat__label" }, "完成任务", -1))
            ]),
            q("div", Ax, [
              q("div", yx, we(a.value.totalRollover), 1),
              d[5] || (d[5] = q("div", { class: "wr-stat__label" }, "顺延任务", -1))
            ]),
            q("div", {
              class: ur(["wr-stat", p.value])
            }, [
              q("div", Fx, we(a.value.completionRate.toFixed(1)) + "%", 1),
              d[6] || (d[6] = q("div", { class: "wr-stat__label" }, "完成率", -1))
            ], 2)
          ]),
          q("div", kx, [
            d[11] || (d[11] = q("div", { class: "wr-section__title" }, "📈 每日趋势", -1)),
            q("table", Cx, [
              q("thead", null, [
                q("tr", null, [
                  d[7] || (d[7] = q("th", null, "日期", -1)),
                  (ee(!0), le(Ue, null, rt(a.value.dailyStats, (A) => (ee(), le("th", {
                    key: A.date
                  }, we(c(A.date)), 1))), 128))
                ])
              ]),
              q("tbody", null, [
                q("tr", null, [
                  d[8] || (d[8] = q("td", null, "新建", -1)),
                  (ee(!0), le(Ue, null, rt(a.value.dailyStats, (A) => (ee(), le("td", {
                    key: A.date
                  }, we(A.created || "-"), 1))), 128))
                ]),
                q("tr", null, [
                  d[9] || (d[9] = q("td", null, "完成", -1)),
                  (ee(!0), le(Ue, null, rt(a.value.dailyStats, (A) => (ee(), le("td", {
                    key: A.date,
                    class: "td-green"
                  }, we(A.completed || "-"), 1))), 128))
                ]),
                q("tr", null, [
                  d[10] || (d[10] = q("td", null, "顺延", -1)),
                  (ee(!0), le(Ue, null, rt(a.value.dailyStats, (A) => (ee(), le("td", {
                    key: A.date,
                    class: "td-orange"
                  }, we(A.rollover || "-"), 1))), 128))
                ])
              ])
            ])
          ]),
          a.value.projectStats.length > 0 ? (ee(), le("div", Dx, [
            d[13] || (d[13] = q("div", { class: "wr-section__title" }, "📊 按项目统计", -1)),
            q("table", Ox, [
              d[12] || (d[12] = q("thead", null, [
                q("tr", null, [
                  q("th", null, "项目"),
                  q("th", null, "新建"),
                  q("th", null, "完成"),
                  q("th", null, "完成率")
                ])
              ], -1)),
              q("tbody", null, [
                (ee(!0), le(Ue, null, rt(a.value.projectStats, (A) => (ee(), le("tr", {
                  key: A.name
                }, [
                  q("td", null, we(A.name), 1),
                  q("td", null, we(A.created), 1),
                  q("td", Ix, we(A.completed), 1),
                  q("td", null, we(A.created > 0 ? Math.round(A.completed / A.created * 100) : 0) + "%", 1)
                ]))), 128))
              ])
            ])
          ])) : ke("", !0),
          a.value.overdueTasks.length > 0 ? (ee(), le("div", Rx, [
            d[14] || (d[14] = q("div", { class: "wr-section__title" }, "⚠️ 当前逾期未完成", -1)),
            q("div", Nx, [
              (ee(!0), le(Ue, null, rt(a.value.overdueTasks, (A) => (ee(), le("div", {
                key: A.id,
                class: "wr-overdue-item"
              }, [
                Re(" · " + we(A.title) + "（原定" + we(ge(ka)(A.originalTargetDate)) + "，已顺延" + we(A.rolloverCount) + "次） ", 1),
                A.project ? (ee(), le("span", Px, we(A.project), 1)) : ke("", !0)
              ]))), 128))
            ])
          ])) : ke("", !0),
          q("div", Lx, [
            d[15] || (d[15] = q("div", { class: "wr-section__title" }, "💡 本周小结", -1)),
            (ee(!0), le(Ue, null, rt(v.value, (A, k) => (ee(), le("p", {
              key: k,
              class: "wr-summary-line"
            }, we(A), 1))), 128))
          ])
        ])) : ke("", !0)
      ]),
      _: 1
    }, 8, ["model-value"]));
  }
}), Bx = /* @__PURE__ */ En(Mx, [["__scopeId", "data-v-5fd6dd57"]]), bx = { class: "todo-root" }, Ux = { class: "todo-header" }, Wx = { class: "todo-header__actions" }, $x = { class: "todo-layout" }, Hx = { class: "todo-sidebar" }, Vx = ["onClick"], Gx = { class: "nav-icon" }, jx = { class: "nav-label" }, Xx = {
  key: 0,
  class: "nav-badge"
}, zx = ["onClick"], Yx = { class: "nav-label" }, Kx = {
  key: 0,
  class: "nav-badge"
}, Jx = { class: "todo-main" }, Zx = {
  key: 0,
  class: "todo-content-header"
}, qx = { class: "todo-content-header__left" }, Qx = { class: "view-title" }, ev = {
  key: 1,
  class: "view-title"
}, tv = {
  key: 2,
  class: "view-title"
}, rv = {
  key: 1,
  class: "search-view"
}, nv = {
  key: 2,
  class: "quick-add"
}, av = { class: "task-list" }, iv = {
  key: 0,
  class: "empty-hint"
}, sv = {
  key: 1,
  class: "empty-hint"
}, fv = {
  key: 0,
  class: "empty-hint"
}, lv = { class: "ie-section" }, ov = { class: "ie-section" }, cv = { style: { "margin-top": "8px" } }, uv = { class: "color-picker" }, hv = ["onClick"], dv = /* @__PURE__ */ zr({
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
      completeTask: f,
      uncompleteTask: l,
      completeSubTask: o,
      uncompleteSubTask: c,
      splitTask: p,
      unsplitTask: v,
      addProject: h,
      getTasksForDate: m,
      getTasksForDateWithCompleted: u,
      getChildren: d,
      getAllPending: A,
      searchTasks: k,
      getTasksByProject: C,
      generateWeeklyReport: M,
      exportJson: Q,
      importJson: ce,
      tasks: O,
      projects: H
    } = r;
    t0(() => {
      n();
    });
    const D = Pe("today"), j = [
      { key: "today", icon: "📅", label: "今天" },
      { key: "yesterday", icon: "📅", label: "昨天" },
      { key: "dayBefore", icon: "📅", label: "前天" },
      { key: "divider1", divider: !0, icon: "", label: "" },
      { key: "all", icon: "📋", label: "全部待办" },
      { key: "search", icon: "🔍", label: "搜索" },
      { key: "divider2", divider: !0, icon: "", label: "" },
      { key: "history", icon: "🗓️", label: "历史日期" }
    ];
    function X(me) {
      D.value = me, me === "search" && Fa(() => {
        var z;
        return (z = F.value) == null ? void 0 : z.focus();
      });
    }
    const Y = Ze(() => {
      const me = nt(), z = O.value.filter((De) => De.status === "todo" && !De.parentId), ie = {
        today: z.filter((De) => De.targetDate === me).length,
        all: z.length
      };
      for (const De of t.value)
        ie[`project:${De}`] = z.filter((Xe) => Xe.project === De).length;
      return ie;
    }), ue = Pe(nt()), V = Ze(() => D.value === "today" ? nt() : D.value === "yesterday" ? cr(-1) : D.value === "dayBefore" ? cr(-2) : D.value === "history" ? ue.value : nt()), b = Ze(
      () => ["today", "yesterday", "dayBefore", "history"].includes(D.value)
    ), K = Ze(
      () => ["yesterday", "dayBefore", "history"].includes(D.value)
    ), J = Ze(
      () => K.value
    ), he = Pe(!0), _e = Ze(() => {
      const me = V.value, z = nt(), [ie, De, Xe] = me.split("-").map(Number), lr = ["日", "一", "二", "三", "四", "五", "六"], Rt = new Date(me), Lr = lr[Rt.getDay()], St = `${ie}年${De}月${Xe}日 周${Lr}`;
      return me === z ? `📅 ${St} (今天)` : D.value === "yesterday" ? `📅 ${St} (昨天)` : D.value === "dayBefore" ? `📅 ${St} (前天)` : `📅 ${St}`;
    });
    function We() {
    }
    const Ke = Ze(() => D.value === "all" ? A() : D.value.startsWith("project:") ? C(D.value.slice(8)) : b.value ? K.value && he.value ? u(V.value) : m(V.value) : []), S = Pe(""), P = Pe([]), F = Pe();
    function y() {
      P.value = k(S.value);
    }
    const B = Pe(!1), ae = Pe(""), xe = Pe();
    function oe() {
      B.value = !0, Fa(() => {
        var me;
        return (me = xe.value) == null ? void 0 : me.focus();
      });
    }
    function se() {
      const me = ae.value.trim();
      if (!me) {
        Ce();
        return;
      }
      const { title: z, targetDate: ie, project: De } = Hs(me, V.value);
      if (!z) {
        Ce();
        return;
      }
      a({ title: z, targetDate: ie, project: De || void 0 }), ae.value = "";
    }
    function Ce() {
      B.value = !1, ae.value = "";
    }
    const ye = Pe(!1), Je = Pe(null);
    function Fe(me) {
      Je.value = me, ye.value = !0;
    }
    function Bt(me) {
      var z;
      Je.value ? (i(Je.value.id, me), (z = me.stakeholders) == null || z.forEach((ie) => {
        ie.name && r.rememberStakeholder(ie.name, ie.role ?? "");
      })) : me.title && a({ title: me.title, ...me }), ye.value = !1, Je.value = null;
    }
    function He(me) {
      ye.value = !1, wt(me);
    }
    function pe(me) {
      me.status === "completed" ? l(me.id) : f(me.id);
    }
    function pt(me) {
      me.status === "completed" ? c(me.id) : o(me.id);
    }
    const Et = Pe(!1), bt = Pe(null);
    function Zt(me) {
      bt.value = me, Et.value = !0;
    }
    function Cn(me, z) {
      p(me, z), Et.value = !1, bt.value = null;
    }
    function Ir(me) {
      i0.confirm("取消拆分后，子任务将变为独立任务。确认？", "取消拆分", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => v(me.id)).catch(() => {
      });
    }
    function wt(me) {
      const z = me.isSplit ? `删除「${me.title}」及其所有子任务？` : `删除「${me.title}」？`;
      i0.confirm(z, "删除任务", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        s(me.id), xa.success("已删除");
      }).catch(() => {
      });
    }
    const jt = Pe(!1), Xt = Pe(""), sr = Pe("#4A90D9"), qt = ["#4A90D9", "#67c23a", "#e6a23c", "#f56c6c", "#909399", "#409eff", "#7b5ea7", "#00bcd4"];
    function oa(me) {
      var z;
      return ((z = H.value.find((ie) => ie.name === me)) == null ? void 0 : z.color) ?? "#909399";
    }
    const qr = Ze(() => {
      const me = {};
      return H.value.forEach((z) => {
        me[z.name] = z.color;
      }), me;
    });
    function Rr() {
      Xt.value.trim() && (h(Xt.value.trim(), sr.value), Xt.value = "", sr.value = "#4A90D9", jt.value = !1);
    }
    const Nr = Pe(!1), fr = Pe(!1), Pr = Pe("merge"), Qr = Pe();
    function ca() {
      const me = Q(), z = new Blob([me], { type: "application/json" }), ie = URL.createObjectURL(z), De = document.createElement("a");
      De.href = ie, De.download = `todo-backup-${nt()}.json`, De.click(), URL.revokeObjectURL(ie);
    }
    function ua() {
      const z = O.value.filter((Xe) => !Xe.parentId).map((Xe, lr) => {
        const Rt = Xe.parentId ? O.value.find((St) => St.id === Xe.parentId) : null, Lr = Xe.stakeholders ?? [];
        return [
          lr + 1,
          Xe.title,
          (Rt == null ? void 0 : Rt.title) ?? "",
          Xe.status === "completed" ? "已完成" : "待办",
          Xe.project ?? "",
          Xe.targetDate,
          Xe.originalTargetDate,
          Xe.rolloverCount,
          Lr.map((St) => `${St.name}${St.role ? `(${St.role})` : ""}`).join("; "),
          Lr.map((St) => St.remark ?? "").join("; "),
          Xe.createdAt,
          Xe.completedAt ?? "",
          Xe.description ?? ""
        ];
      }), ie = Kt.aoa_to_sheet([
        ["序号", "任务标题", "父任务", "状态", "所属项目", "目标日期", "原始日期", "顺延次数", "干系人", "干系人备注", "创建时间", "完成时间", "描述"],
        ...z
      ]), De = Kt.book_new();
      Kt.book_append_sheet(De, ie, "任务明细"), Cs(De, `todo-export-${nt()}.xlsx`);
    }
    function Dn(me) {
      var De;
      const z = (De = me.target.files) == null ? void 0 : De[0];
      if (!z) return;
      const ie = new FileReader();
      ie.onload = (Xe) => {
        var lr;
        try {
          const Rt = ce((lr = Xe.target) == null ? void 0 : lr.result, Pr.value);
          xa.success(`导入完成：新增 ${Rt.imported} 条，跳过 ${Rt.skipped} 条`), fr.value = !1;
        } catch (Rt) {
          xa.error("导入失败：" + Rt.message);
        }
        me.target.value = "";
      }, ie.readAsText(z, "UTF-8");
    }
    function On(me) {
      const z = me.target.tagName;
      z === "INPUT" || z === "TEXTAREA" || ((me.key === "n" || me.key === "N") && D.value !== "search" && oe(), (me.ctrlKey || me.metaKey) && me.key === "f" && (me.preventDefault(), X("search")));
    }
    return t0(() => {
      document.addEventListener("keydown", On);
    }), (me, z) => (ee(), le("div", bx, [
      q("div", Ux, [
        z[19] || (z[19] = q("span", { class: "todo-header__title" }, "✅ 待办任务", -1)),
        q("div", Wx, [
          Te(ge(je), {
            size: "small",
            onClick: z[0] || (z[0] = (ie) => fr.value = !0)
          }, {
            default: Ee(() => [...z[17] || (z[17] = [
              Re("导出/导入", -1)
            ])]),
            _: 1
          }),
          Te(ge(je), {
            size: "small",
            onClick: z[1] || (z[1] = (ie) => Nr.value = !0)
          }, {
            default: Ee(() => [...z[18] || (z[18] = [
              Re("📊 复盘", -1)
            ])]),
            _: 1
          })
        ])
      ]),
      q("div", $x, [
        q("div", Hx, [
          (ee(), le(Ue, null, rt(j, (ie) => q("div", {
            key: ie.key,
            class: ur(["nav-item", { "nav-item--active": D.value === ie.key, "nav-divider": ie.divider }]),
            onClick: (De) => ie.divider ? null : X(ie.key)
          }, [
            ie.divider ? ke("", !0) : (ee(), le(Ue, { key: 0 }, [
              q("span", Gx, we(ie.icon), 1),
              q("span", jx, we(ie.label), 1),
              Y.value[ie.key] ? (ee(), le("span", Xx, we(Y.value[ie.key] > 99 ? "99+" : Y.value[ie.key]), 1)) : ke("", !0)
            ], 64))
          ], 10, Vx)), 64)),
          z[20] || (z[20] = q("div", { class: "nav-section-title" }, "📁 项目", -1)),
          (ee(!0), le(Ue, null, rt(ge(t), (ie) => (ee(), le("div", {
            key: ie,
            class: ur(["nav-item nav-item--sub", { "nav-item--active": D.value === "project:" + ie }]),
            onClick: (De) => X("project:" + ie)
          }, [
            q("span", {
              class: "nav-dot",
              style: ya({ background: oa(ie) })
            }, null, 4),
            q("span", Yx, we(ie), 1),
            Y.value["project:" + ie] ? (ee(), le("span", Kx, we(Y.value["project:" + ie] > 99 ? "99+" : Y.value["project:" + ie]), 1)) : ke("", !0)
          ], 10, zx))), 128)),
          q("div", {
            class: "nav-item nav-item--sub nav-item--add-project",
            onClick: z[2] || (z[2] = (ie) => jt.value = !0)
          }, " + 新建项目 ")
        ]),
        q("div", Jx, [
          b.value || D.value === "all" || D.value.startsWith("project:") ? (ee(), le("div", Zx, [
            q("div", qx, [
              b.value ? (ee(), le(Ue, { key: 0 }, [
                q("span", Qx, we(_e.value), 1),
                D.value === "history" ? (ee(), $t(ge(J0), {
                  key: 0,
                  modelValue: ue.value,
                  "onUpdate:modelValue": z[3] || (z[3] = (ie) => ue.value = ie),
                  type: "date",
                  "value-format": "YYYY-MM-DD",
                  size: "small",
                  style: { width: "160px", "margin-left": "8px" },
                  onChange: We
                }, null, 8, ["modelValue"])) : ke("", !0),
                K.value ? (ee(), $t(ge(Ws), {
                  key: 1,
                  modelValue: he.value,
                  "onUpdate:modelValue": z[4] || (z[4] = (ie) => he.value = ie),
                  style: { "margin-left": "12px" },
                  "active-text": "显示已完成",
                  "inactive-text": "隐藏已完成",
                  size: "small"
                }, null, 8, ["modelValue"])) : ke("", !0)
              ], 64)) : D.value === "all" ? (ee(), le("span", ev, "📋 全部待办")) : D.value.startsWith("project:") ? (ee(), le("span", tv, "📁 " + we(D.value.slice(8)), 1)) : ke("", !0)
            ]),
            J.value ? ke("", !0) : (ee(), $t(ge(je), {
              key: 0,
              type: "primary",
              size: "small",
              onClick: oe
            }, {
              default: Ee(() => [...z[21] || (z[21] = [
                Re(" + 新任务 ", -1)
              ])]),
              _: 1
            }))
          ])) : D.value === "search" ? (ee(), le("div", rv, [
            Te(ge(hr), {
              modelValue: S.value,
              "onUpdate:modelValue": z[5] || (z[5] = (ie) => S.value = ie),
              placeholder: "搜索任务标题或描述...",
              clearable: "",
              "prefix-icon": "Search",
              ref_key: "searchInputRef",
              ref: F,
              onInput: y
            }, null, 8, ["modelValue"])
          ])) : ke("", !0),
          B.value && !J.value ? (ee(), le("div", nv, [
            Te(ge(hr), {
              modelValue: ae.value,
              "onUpdate:modelValue": z[6] || (z[6] = (ie) => ae.value = ie),
              placeholder: "输入任务（支持 📅5/15 #项目 语法）",
              ref_key: "quickAddRef",
              ref: xe,
              onKeydown: [
                sn(mt(se, ["prevent"]), ["enter"]),
                sn(mt(Ce, ["prevent"]), ["esc"])
              ],
              onBlur: Ce
            }, null, 8, ["modelValue", "onKeydown"]),
            z[22] || (z[22] = q("div", { class: "quick-add-hint" }, "回车保存 · Esc取消 · 📅日期 #项目", -1))
          ])) : ke("", !0),
          q("div", av, [
            D.value === "search" ? (ee(), le(Ue, { key: 0 }, [
              S.value ? P.value.length === 0 ? (ee(), le("div", sv, "未找到匹配的任务")) : ke("", !0) : (ee(), le("div", iv, "输入关键词搜索任务")),
              (ee(!0), le(Ue, null, rt(P.value, (ie) => (ee(), $t(l0, {
                key: ie.id,
                task: ie,
                children: ge(d)(ie.id),
                "project-colors": qr.value,
                readonly: !1,
                onToggle: pe,
                onToggleChild: pt,
                onEdit: Fe,
                onSplit: Zt,
                onUnsplit: Ir,
                onDelete: wt
              }, null, 8, ["task", "children", "project-colors"]))), 128))
            ], 64)) : (ee(), le(Ue, { key: 1 }, [
              Ke.value.length === 0 ? (ee(), le("div", fv, [
                J.value ? (ee(), le(Ue, { key: 0 }, [
                  Re("当天无任务记录")
                ], 64)) : (ee(), le(Ue, { key: 1 }, [
                  Re("暂无任务，点击「+ 新任务」开始")
                ], 64))
              ])) : ke("", !0),
              (ee(!0), le(Ue, null, rt(Ke.value, (ie) => (ee(), $t(l0, {
                key: ie.id,
                task: ie,
                children: ge(d)(ie.id),
                "project-colors": qr.value,
                readonly: J.value,
                onToggle: pe,
                onToggleChild: pt,
                onEdit: Fe,
                onSplit: Zt,
                onUnsplit: Ir,
                onDelete: wt
              }, null, 8, ["task", "children", "project-colors", "readonly"]))), 128))
            ], 64))
          ])
        ])
      ]),
      Te(Tf, {
        visible: ye.value,
        task: Je.value,
        "default-date": V.value,
        "all-projects": ge(t),
        onSave: Bt,
        onCancel: z[7] || (z[7] = (ie) => ye.value = !1),
        onDelete: He
      }, null, 8, ["visible", "task", "default-date", "all-projects"]),
      Te(Ff, {
        visible: Et.value,
        task: bt.value,
        onConfirm: Cn,
        onCancel: z[8] || (z[8] = (ie) => Et.value = !1)
      }, null, 8, ["visible", "task"]),
      Te(Bx, {
        visible: Nr.value,
        "generate-report": ge(M),
        onClose: z[9] || (z[9] = (ie) => Nr.value = !1)
      }, null, 8, ["visible", "generate-report"]),
      Te(ge(dn), {
        modelValue: fr.value,
        "onUpdate:modelValue": z[13] || (z[13] = (ie) => fr.value = ie),
        title: "导出 / 导入",
        width: "440px",
        "append-to-body": ""
      }, {
        footer: Ee(() => [
          Te(ge(je), {
            onClick: z[12] || (z[12] = (ie) => fr.value = !1)
          }, {
            default: Ee(() => [...z[30] || (z[30] = [
              Re("关闭", -1)
            ])]),
            _: 1
          })
        ]),
        default: Ee(() => [
          q("div", lv, [
            z[25] || (z[25] = q("div", { class: "ie-title" }, "导出", -1)),
            Te(ge(je), { onClick: ca }, {
              default: Ee(() => [...z[23] || (z[23] = [
                Re("📄 导出 JSON", -1)
              ])]),
              _: 1
            }),
            Te(ge(je), {
              onClick: ua,
              style: { "margin-left": "8px" }
            }, {
              default: Ee(() => [...z[24] || (z[24] = [
                Re("📊 导出 Excel", -1)
              ])]),
              _: 1
            })
          ]),
          q("div", ov, [
            z[29] || (z[29] = q("div", { class: "ie-title" }, "导入 JSON", -1)),
            Te(ge($s), {
              modelValue: Pr.value,
              "onUpdate:modelValue": z[10] || (z[10] = (ie) => Pr.value = ie),
              size: "small"
            }, {
              default: Ee(() => [
                Te(ge(a0), { value: "merge" }, {
                  default: Ee(() => [...z[26] || (z[26] = [
                    Re("合并模式（保留现有数据）", -1)
                  ])]),
                  _: 1
                }),
                Te(ge(a0), { value: "overwrite" }, {
                  default: Ee(() => [...z[27] || (z[27] = [
                    Re("覆盖模式（清空现有数据）", -1)
                  ])]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue"]),
            q("div", cv, [
              q("input", {
                type: "file",
                accept: ".json",
                ref_key: "importFileRef",
                ref: Qr,
                onChange: Dn,
                style: { display: "none" }
              }, null, 544),
              Te(ge(je), {
                onClick: z[11] || (z[11] = (ie) => {
                  var De;
                  return (De = Qr.value) == null ? void 0 : De.click();
                })
              }, {
                default: Ee(() => [...z[28] || (z[28] = [
                  Re("选择 JSON 文件", -1)
                ])]),
                _: 1
              })
            ])
          ])
        ]),
        _: 1
      }, 8, ["modelValue"]),
      Te(ge(dn), {
        modelValue: jt.value,
        "onUpdate:modelValue": z[16] || (z[16] = (ie) => jt.value = ie),
        title: "新建项目",
        width: "360px",
        "append-to-body": ""
      }, {
        footer: Ee(() => [
          Te(ge(je), {
            onClick: z[15] || (z[15] = (ie) => jt.value = !1)
          }, {
            default: Ee(() => [...z[31] || (z[31] = [
              Re("取消", -1)
            ])]),
            _: 1
          }),
          Te(ge(je), {
            type: "primary",
            onClick: Rr,
            disabled: !Xt.value.trim()
          }, {
            default: Ee(() => [...z[32] || (z[32] = [
              Re("确认", -1)
            ])]),
            _: 1
          }, 8, ["disabled"])
        ]),
        default: Ee(() => [
          Te(ge(K0), {
            onSubmit: mt(Rr, ["prevent"])
          }, {
            default: Ee(() => [
              Te(ge(Tr), { label: "项目名称" }, {
                default: Ee(() => [
                  Te(ge(hr), {
                    modelValue: Xt.value,
                    "onUpdate:modelValue": z[14] || (z[14] = (ie) => Xt.value = ie),
                    placeholder: "项目名称",
                    onKeydown: sn(mt(Rr, ["prevent"]), ["enter"])
                  }, null, 8, ["modelValue", "onKeydown"])
                ]),
                _: 1
              }),
              Te(ge(Tr), { label: "颜色" }, {
                default: Ee(() => [
                  q("div", uv, [
                    (ee(), le(Ue, null, rt(qt, (ie) => q("span", {
                      key: ie,
                      class: ur(["color-dot", { "color-dot--selected": sr.value === ie }]),
                      style: ya({ background: ie }),
                      onClick: (De) => sr.value = ie
                    }, null, 14, hv)), 64))
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
}), xv = /* @__PURE__ */ En(dv, [["__scopeId", "data-v-4c351994"]]);
function mv(e, r) {
  return zr({
    render() {
      return Us(xv, { api: e, toolId: r });
    }
  });
}
export {
  mv as createView
};
