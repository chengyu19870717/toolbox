import { getCurrentScope as J0, inject as Fr, effectScope as Q0, watch as tt, provide as wr, defineComponent as Ze, useSlots as ec, onUnmounted as bd, openBlock as we, createElementBlock as Oe, unref as W, createVNode as oe, withCtx as ve, renderSlot as lt, getCurrentInstance as oi, reactive as Md, computed as Re, onScopeDispose as Ra, ref as $e, nextTick as Pn, onBeforeMount as Rd, onMounted as Wn, shallowRef as Qn, toRef as Ye, normalizeClass as Sn, createElementVNode as Le, Fragment as ct, renderList as wn, normalizeStyle as Yt, onBeforeUnmount as tc, isMemoSame as Pd, createBlock as at, createCommentVNode as ze, toDisplayString as Me, isRef as qs, toRefs as Ld, customRef as Bd, toValue as Ve, resolveComponent as mn, h as Ke, useAttrs as js, mergeProps as Xa, createPropsRestProxy as $d, resolveDynamicComponent as ur, createTextVNode as Be, markRaw as Pa, readonly as Ud, watchEffect as zd, normalizeProps as Hd, withDirectives as Yl, vShow as Kl } from "vue";
import { ElButtonGroup as Vd, ElButton as Pt, ElCard as Mr, ElTabs as Zl, ElTabPane as Rr, ElUpload as ql, ElIcon as Ht, ElInput as Pr, ElForm as jl, ElFormItem as Lr, ElSelect as Jl, ElOption as Ql, ElTag as hn, ElRadioGroup as eu, ElRadioButton as tu, ElDescriptions as Wd, ElDescriptionsItem as dn, ElTable as Jo, ElTableColumn as it, ElDialog as nu, ElMessage as _t } from "element-plus";
/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var Ya = {};
Ya.version = "0.18.5";
var nc = 1252, Gd = [874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1e4], rc = function(e) {
  Gd.indexOf(e) != -1 && (nc = e);
};
function Xd() {
  rc(1252);
}
var Mi = function(e) {
  rc(e);
};
function Yd() {
  Mi(1200), Xd();
}
var da = function(t) {
  return String.fromCharCode(t);
}, ru = function(t) {
  return String.fromCharCode(t);
}, Ka, er = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function Ri(e) {
  for (var t = "", n = 0, r = 0, i = 0, a = 0, o = 0, s = 0, u = 0, l = 0; l < e.length; )
    n = e.charCodeAt(l++), a = n >> 2, r = e.charCodeAt(l++), o = (n & 3) << 4 | r >> 4, i = e.charCodeAt(l++), s = (r & 15) << 2 | i >> 6, u = i & 63, isNaN(r) ? s = u = 64 : isNaN(i) && (u = 64), t += er.charAt(a) + er.charAt(o) + er.charAt(s) + er.charAt(u);
  return t;
}
function Un(e) {
  var t = "", n = 0, r = 0, i = 0, a = 0, o = 0, s = 0, u = 0;
  e = e.replace(/[^\w\+\/\=]/g, "");
  for (var l = 0; l < e.length; )
    a = er.indexOf(e.charAt(l++)), o = er.indexOf(e.charAt(l++)), n = a << 2 | o >> 4, t += String.fromCharCode(n), s = er.indexOf(e.charAt(l++)), r = (o & 15) << 4 | s >> 2, s !== 64 && (t += String.fromCharCode(r)), u = er.indexOf(e.charAt(l++)), i = (s & 3) << 6 | u, u !== 64 && (t += String.fromCharCode(i));
  return t;
}
var Xe = /* @__PURE__ */ function() {
  return typeof Buffer < "u" && typeof process < "u" && typeof process.versions < "u" && !!process.versions.node;
}(), Gn = /* @__PURE__ */ function() {
  if (typeof Buffer < "u") {
    var e = !Buffer.from;
    if (!e) try {
      Buffer.from("foo", "utf8");
    } catch {
      e = !0;
    }
    return e ? function(t, n) {
      return n ? new Buffer(t, n) : new Buffer(t);
    } : Buffer.from.bind(Buffer);
  }
  return function() {
  };
}();
function yr(e) {
  return Xe ? Buffer.alloc ? Buffer.alloc(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
function iu(e) {
  return Xe ? Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
var rn = function(t) {
  return Xe ? Gn(t, "binary") : t.split("").map(function(n) {
    return n.charCodeAt(0) & 255;
  });
};
function No(e) {
  if (typeof ArrayBuffer > "u") return rn(e);
  for (var t = new ArrayBuffer(e.length), n = new Uint8Array(t), r = 0; r != e.length; ++r) n[r] = e.charCodeAt(r) & 255;
  return t;
}
function ea(e) {
  if (Array.isArray(e)) return e.map(function(r) {
    return String.fromCharCode(r);
  }).join("");
  for (var t = [], n = 0; n < e.length; ++n) t[n] = String.fromCharCode(e[n]);
  return t.join("");
}
function Kd(e) {
  if (typeof Uint8Array > "u") throw new Error("Unsupported");
  return new Uint8Array(e);
}
var At = Xe ? function(e) {
  return Buffer.concat(e.map(function(t) {
    return Buffer.isBuffer(t) ? t : Gn(t);
  }));
} : function(e) {
  if (typeof Uint8Array < "u") {
    var t = 0, n = 0;
    for (t = 0; t < e.length; ++t) n += e[t].length;
    var r = new Uint8Array(n), i = 0;
    for (t = 0, n = 0; t < e.length; n += i, ++t)
      if (i = e[t].length, e[t] instanceof Uint8Array) r.set(e[t], n);
      else {
        if (typeof e[t] == "string")
          throw "wtf";
        r.set(new Uint8Array(e[t]), n);
      }
    return r;
  }
  return [].concat.apply([], e.map(function(a) {
    return Array.isArray(a) ? a : [].slice.call(a);
  }));
};
function Zd(e) {
  for (var t = [], n = 0, r = e.length + 250, i = yr(e.length + 255), a = 0; a < e.length; ++a) {
    var o = e.charCodeAt(a);
    if (o < 128) i[n++] = o;
    else if (o < 2048)
      i[n++] = 192 | o >> 6 & 31, i[n++] = 128 | o & 63;
    else if (o >= 55296 && o < 57344) {
      o = (o & 1023) + 64;
      var s = e.charCodeAt(++a) & 1023;
      i[n++] = 240 | o >> 8 & 7, i[n++] = 128 | o >> 2 & 63, i[n++] = 128 | s >> 6 & 15 | (o & 3) << 4, i[n++] = 128 | s & 63;
    } else
      i[n++] = 224 | o >> 12 & 15, i[n++] = 128 | o >> 6 & 63, i[n++] = 128 | o & 63;
    n > r && (t.push(i.slice(0, n)), n = 0, i = yr(65535), r = 65530);
  }
  return t.push(i.slice(0, n)), At(t);
}
var Ai = /\u0000/g, va = /[\u0001-\u0006]/g;
function Gr(e) {
  for (var t = "", n = e.length - 1; n >= 0; ) t += e.charAt(n--);
  return t;
}
function ln(e, t) {
  var n = "" + e;
  return n.length >= t ? n : ut("0", t - n.length) + n;
}
function Js(e, t) {
  var n = "" + e;
  return n.length >= t ? n : ut(" ", t - n.length) + n;
}
function Za(e, t) {
  var n = "" + e;
  return n.length >= t ? n : n + ut(" ", t - n.length);
}
function qd(e, t) {
  var n = "" + Math.round(e);
  return n.length >= t ? n : ut("0", t - n.length) + n;
}
function jd(e, t) {
  var n = "" + e;
  return n.length >= t ? n : ut("0", t - n.length) + n;
}
var au = /* @__PURE__ */ Math.pow(2, 32);
function Br(e, t) {
  if (e > au || e < -au) return qd(e, t);
  var n = Math.round(e);
  return jd(n, t);
}
function qa(e, t) {
  return t = t || 0, e.length >= 7 + t && (e.charCodeAt(t) | 32) === 103 && (e.charCodeAt(t + 1) | 32) === 101 && (e.charCodeAt(t + 2) | 32) === 110 && (e.charCodeAt(t + 3) | 32) === 101 && (e.charCodeAt(t + 4) | 32) === 114 && (e.charCodeAt(t + 5) | 32) === 97 && (e.charCodeAt(t + 6) | 32) === 108;
}
var ou = [
  ["Sun", "Sunday"],
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"]
], Qo = [
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
function Jd(e) {
  return e || (e = {}), e[0] = "General", e[1] = "0", e[2] = "0.00", e[3] = "#,##0", e[4] = "#,##0.00", e[9] = "0%", e[10] = "0.00%", e[11] = "0.00E+00", e[12] = "# ?/?", e[13] = "# ??/??", e[14] = "m/d/yy", e[15] = "d-mmm-yy", e[16] = "d-mmm", e[17] = "mmm-yy", e[18] = "h:mm AM/PM", e[19] = "h:mm:ss AM/PM", e[20] = "h:mm", e[21] = "h:mm:ss", e[22] = "m/d/yy h:mm", e[37] = "#,##0 ;(#,##0)", e[38] = "#,##0 ;[Red](#,##0)", e[39] = "#,##0.00;(#,##0.00)", e[40] = "#,##0.00;[Red](#,##0.00)", e[45] = "mm:ss", e[46] = "[h]:mm:ss", e[47] = "mmss.0", e[48] = "##0.0E+0", e[49] = "@", e[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "', e;
}
var ft = {
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
}, su = {
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
}, Qd = {
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
function ja(e, t, n) {
  for (var r = e < 0 ? -1 : 1, i = e * r, a = 0, o = 1, s = 0, u = 1, l = 0, c = 0, f = Math.floor(i); l < t && (f = Math.floor(i), s = f * o + a, c = f * l + u, !(i - f < 5e-8)); )
    i = 1 / (i - f), a = o, o = s, u = l, l = c;
  if (c > t && (l > t ? (c = u, s = a) : (c = l, s = o)), !n) return [0, r * s, c];
  var h = Math.floor(r * s / c);
  return [h, r * s - h * c, c];
}
function pa(e, t, n) {
  if (e > 2958465 || e < 0) return null;
  var r = e | 0, i = Math.floor(86400 * (e - r)), a = 0, o = [], s = { D: r, T: i, u: 86400 * (e - r) - i, y: 0, m: 0, d: 0, H: 0, M: 0, S: 0, q: 0 };
  if (Math.abs(s.u) < 1e-6 && (s.u = 0), t && t.date1904 && (r += 1462), s.u > 0.9999 && (s.u = 0, ++i == 86400 && (s.T = i = 0, ++r, ++s.D)), r === 60)
    o = n ? [1317, 10, 29] : [1900, 2, 29], a = 3;
  else if (r === 0)
    o = n ? [1317, 8, 29] : [1900, 1, 0], a = 6;
  else {
    r > 60 && --r;
    var u = new Date(1900, 0, 1);
    u.setDate(u.getDate() + r - 1), o = [u.getFullYear(), u.getMonth() + 1, u.getDate()], a = u.getDay(), r < 60 && (a = (a + 6) % 7), n && (a = o1(u, o));
  }
  return s.y = o[0], s.m = o[1], s.d = o[2], s.S = i % 60, i = Math.floor(i / 60), s.M = i % 60, i = Math.floor(i / 60), s.H = i, s.q = a, s;
}
var ic = /* @__PURE__ */ new Date(1899, 11, 31, 0, 0, 0), e1 = /* @__PURE__ */ ic.getTime(), t1 = /* @__PURE__ */ new Date(1900, 2, 1, 0, 0, 0);
function ac(e, t) {
  var n = /* @__PURE__ */ e.getTime();
  return t ? n -= 1461 * 24 * 60 * 60 * 1e3 : e >= t1 && (n += 24 * 60 * 60 * 1e3), (n - (e1 + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ ic.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3);
}
function Qs(e) {
  return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1");
}
function n1(e) {
  return e.indexOf("E") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/, "$10$2");
}
function r1(e) {
  var t = e < 0 ? 12 : 11, n = Qs(e.toFixed(12));
  return n.length <= t || (n = e.toPrecision(10), n.length <= t) ? n : e.toExponential(5);
}
function i1(e) {
  var t = Qs(e.toFixed(11));
  return t.length > (e < 0 ? 12 : 11) || t === "0" || t === "-0" ? e.toPrecision(6) : t;
}
function a1(e) {
  var t = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E), n;
  return t >= -4 && t <= -1 ? n = e.toPrecision(10 + t) : Math.abs(t) <= 9 ? n = r1(e) : t === 10 ? n = e.toFixed(10).substr(0, 12) : n = i1(e), Qs(n1(n.toUpperCase()));
}
function Es(e, t) {
  switch (typeof e) {
    case "string":
      return e;
    case "boolean":
      return e ? "TRUE" : "FALSE";
    case "number":
      return (e | 0) === e ? e.toString(10) : a1(e);
    case "undefined":
      return "";
    case "object":
      if (e == null) return "";
      if (e instanceof Date) return nr(14, ac(e, t && t.date1904), t);
  }
  throw new Error("unsupported value in General format: " + e);
}
function o1(e, t) {
  t[0] -= 581;
  var n = e.getDay();
  return e < 60 && (n = (n + 6) % 7), n;
}
function s1(e, t, n, r) {
  var i = "", a = 0, o = 0, s = n.y, u, l = 0;
  switch (e) {
    case 98:
      s = n.y + 543;
    case 121:
      switch (t.length) {
        case 1:
        case 2:
          u = s % 100, l = 2;
          break;
        default:
          u = s % 1e4, l = 4;
          break;
      }
      break;
    case 109:
      switch (t.length) {
        case 1:
        case 2:
          u = n.m, l = t.length;
          break;
        case 3:
          return Qo[n.m - 1][1];
        case 5:
          return Qo[n.m - 1][0];
        default:
          return Qo[n.m - 1][2];
      }
      break;
    case 100:
      switch (t.length) {
        case 1:
        case 2:
          u = n.d, l = t.length;
          break;
        case 3:
          return ou[n.q][0];
        default:
          return ou[n.q][1];
      }
      break;
    case 104:
      switch (t.length) {
        case 1:
        case 2:
          u = 1 + (n.H + 11) % 12, l = t.length;
          break;
        default:
          throw "bad hour format: " + t;
      }
      break;
    case 72:
      switch (t.length) {
        case 1:
        case 2:
          u = n.H, l = t.length;
          break;
        default:
          throw "bad hour format: " + t;
      }
      break;
    case 77:
      switch (t.length) {
        case 1:
        case 2:
          u = n.M, l = t.length;
          break;
        default:
          throw "bad minute format: " + t;
      }
      break;
    case 115:
      if (t != "s" && t != "ss" && t != ".0" && t != ".00" && t != ".000") throw "bad second format: " + t;
      return n.u === 0 && (t == "s" || t == "ss") ? ln(n.S, t.length) : (r >= 2 ? o = r === 3 ? 1e3 : 100 : o = r === 1 ? 10 : 1, a = Math.round(o * (n.S + n.u)), a >= 60 * o && (a = 0), t === "s" ? a === 0 ? "0" : "" + a / o : (i = ln(a, 2 + r), t === "ss" ? i.substr(0, 2) : "." + i.substr(2, t.length - 1)));
    case 90:
      switch (t) {
        case "[h]":
        case "[hh]":
          u = n.D * 24 + n.H;
          break;
        case "[m]":
        case "[mm]":
          u = (n.D * 24 + n.H) * 60 + n.M;
          break;
        case "[s]":
        case "[ss]":
          u = ((n.D * 24 + n.H) * 60 + n.M) * 60 + Math.round(n.S + n.u);
          break;
        default:
          throw "bad abstime format: " + t;
      }
      l = t.length === 3 ? 1 : 2;
      break;
    case 101:
      u = s, l = 1;
      break;
  }
  var c = l > 0 ? ln(u, l) : "";
  return c;
}
function tr(e) {
  var t = 3;
  if (e.length <= t) return e;
  for (var n = e.length % t, r = e.substr(0, n); n != e.length; n += t) r += (r.length > 0 ? "," : "") + e.substr(n, t);
  return r;
}
var oc = /%/g;
function l1(e, t, n) {
  var r = t.replace(oc, ""), i = t.length - r.length;
  return Ln(e, r, n * Math.pow(10, 2 * i)) + ut("%", i);
}
function u1(e, t, n) {
  for (var r = t.length - 1; t.charCodeAt(r - 1) === 44; ) --r;
  return Ln(e, t.substr(0, r), n / Math.pow(10, 3 * (t.length - r)));
}
function sc(e, t) {
  var n, r = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0) return "0.0E+0";
    if (t < 0) return "-" + sc(e, -t);
    var i = e.indexOf(".");
    i === -1 && (i = e.indexOf("E"));
    var a = Math.floor(Math.log(t) * Math.LOG10E) % i;
    if (a < 0 && (a += i), n = (t / Math.pow(10, a)).toPrecision(r + 1 + (i + a) % i), n.indexOf("e") === -1) {
      var o = Math.floor(Math.log(t) * Math.LOG10E);
      for (n.indexOf(".") === -1 ? n = n.charAt(0) + "." + n.substr(1) + "E+" + (o - n.length + a) : n += "E+" + (o - a); n.substr(0, 2) === "0."; )
        n = n.charAt(0) + n.substr(2, i) + "." + n.substr(2 + i), n = n.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.");
      n = n.replace(/\+-/, "-");
    }
    n = n.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(s, u, l, c) {
      return u + l + c.substr(0, (i + a) % i) + "." + c.substr(a) + "E";
    });
  } else n = t.toExponential(r);
  return e.match(/E\+00$/) && n.match(/e[+-]\d$/) && (n = n.substr(0, n.length - 1) + "0" + n.charAt(n.length - 1)), e.match(/E\-/) && n.match(/e\+/) && (n = n.replace(/e\+/, "e")), n.replace("e", "E");
}
var lc = /# (\?+)( ?)\/( ?)(\d+)/;
function c1(e, t, n) {
  var r = parseInt(e[4], 10), i = Math.round(t * r), a = Math.floor(i / r), o = i - a * r, s = r;
  return n + (a === 0 ? "" : "" + a) + " " + (o === 0 ? ut(" ", e[1].length + 1 + e[4].length) : Js(o, e[1].length) + e[2] + "/" + e[3] + ln(s, e[4].length));
}
function f1(e, t, n) {
  return n + (t === 0 ? "" : "" + t) + ut(" ", e[1].length + 2 + e[4].length);
}
var uc = /^#*0*\.([0#]+)/, cc = /\).*[0#]/, fc = /\(###\) ###\\?-####/;
function Dt(e) {
  for (var t = "", n, r = 0; r != e.length; ++r) switch (n = e.charCodeAt(r)) {
    case 35:
      break;
    case 63:
      t += " ";
      break;
    case 48:
      t += "0";
      break;
    default:
      t += String.fromCharCode(n);
  }
  return t;
}
function lu(e, t) {
  var n = Math.pow(10, t);
  return "" + Math.round(e * n) / n;
}
function uu(e, t) {
  var n = e - Math.floor(e), r = Math.pow(10, t);
  return t < ("" + Math.round(n * r)).length ? 0 : Math.round(n * r);
}
function h1(e, t) {
  return t < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, t))).length ? 1 : 0;
}
function d1(e) {
  return e < 2147483647 && e > -2147483648 ? "" + (e >= 0 ? e | 0 : e - 1 | 0) : "" + Math.floor(e);
}
function Jt(e, t, n) {
  if (e.charCodeAt(0) === 40 && !t.match(cc)) {
    var r = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return n >= 0 ? Jt("n", r, n) : "(" + Jt("n", r, -n) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44) return u1(e, t, n);
  if (t.indexOf("%") !== -1) return l1(e, t, n);
  if (t.indexOf("E") !== -1) return sc(t, n);
  if (t.charCodeAt(0) === 36) return "$" + Jt(e, t.substr(t.charAt(1) == " " ? 2 : 1), n);
  var i, a, o, s, u = Math.abs(n), l = n < 0 ? "-" : "";
  if (t.match(/^00+$/)) return l + Br(u, t.length);
  if (t.match(/^[#?]+$/))
    return i = Br(n, 0), i === "0" && (i = ""), i.length > t.length ? i : Dt(t.substr(0, t.length - i.length)) + i;
  if (a = t.match(lc)) return c1(a, u, l);
  if (t.match(/^#+0+$/)) return l + Br(u, t.length - t.indexOf("0"));
  if (a = t.match(uc))
    return i = lu(n, a[1].length).replace(/^([^\.]+)$/, "$1." + Dt(a[1])).replace(/\.$/, "." + Dt(a[1])).replace(/\.(\d*)$/, function(p, v) {
      return "." + v + ut("0", Dt(
        /*::(*/
        a[1]
      ).length - v.length);
    }), t.indexOf("0.") !== -1 ? i : i.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), a = t.match(/^(0*)\.(#*)$/))
    return l + lu(u, a[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, a[1].length ? "0." : ".");
  if (a = t.match(/^#{1,3},##0(\.?)$/)) return l + tr(Br(u, 0));
  if (a = t.match(/^#,##0\.([#0]*0)$/))
    return n < 0 ? "-" + Jt(e, t, -n) : tr("" + (Math.floor(n) + h1(n, a[1].length))) + "." + ln(uu(n, a[1].length), a[1].length);
  if (a = t.match(/^#,#*,#0/)) return Jt(e, t.replace(/^#,#*,/, ""), n);
  if (a = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return i = Gr(Jt(e, t.replace(/[\\-]/g, ""), n)), o = 0, Gr(Gr(t.replace(/\\/g, "")).replace(/[0#]/g, function(p) {
      return o < i.length ? i.charAt(o++) : p === "0" ? "0" : "";
    }));
  if (t.match(fc))
    return i = Jt(e, "##########", n), "(" + i.substr(0, 3) + ") " + i.substr(3, 3) + "-" + i.substr(6);
  var c = "";
  if (a = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return o = Math.min(
      /*::String(*/
      a[4].length,
      7
    ), s = ja(u, Math.pow(10, o) - 1, !1), i = "" + l, c = Ln(
      "n",
      /*::String(*/
      a[1],
      s[1]
    ), c.charAt(c.length - 1) == " " && (c = c.substr(0, c.length - 1) + "0"), i += c + /*::String(*/
    a[2] + "/" + /*::String(*/
    a[3], c = Za(s[2], o), c.length < a[4].length && (c = Dt(a[4].substr(a[4].length - c.length)) + c), i += c, i;
  if (a = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return o = Math.min(Math.max(a[1].length, a[4].length), 7), s = ja(u, Math.pow(10, o) - 1, !0), l + (s[0] || (s[1] ? "" : "0")) + " " + (s[1] ? Js(s[1], o) + a[2] + "/" + a[3] + Za(s[2], o) : ut(" ", 2 * o + 1 + a[2].length + a[3].length));
  if (a = t.match(/^[#0?]+$/))
    return i = Br(n, 0), t.length <= i.length ? i : Dt(t.substr(0, t.length - i.length)) + i;
  if (a = t.match(/^([#0?]+)\.([#0]+)$/)) {
    i = "" + n.toFixed(Math.min(a[2].length, 10)).replace(/([^0])0+$/, "$1"), o = i.indexOf(".");
    var f = t.indexOf(".") - o, h = t.length - i.length - f;
    return Dt(t.substr(0, f) + i + t.substr(t.length - h));
  }
  if (a = t.match(/^00,000\.([#0]*0)$/))
    return o = uu(n, a[1].length), n < 0 ? "-" + Jt(e, t, -n) : tr(d1(n)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(p) {
      return "00," + (p.length < 3 ? ln(0, 3 - p.length) : "") + p;
    }) + "." + ln(o, a[1].length);
  switch (t) {
    case "###,##0.00":
      return Jt(e, "#,##0.00", n);
    case "###,###":
    case "##,###":
    case "#,###":
      var d = tr(Br(u, 0));
      return d !== "0" ? l + d : "";
    case "###,###.00":
      return Jt(e, "###,##0.00", n).replace(/^0\./, ".");
    case "#,###.00":
      return Jt(e, "#,##0.00", n).replace(/^0\./, ".");
  }
  throw new Error("unsupported format |" + t + "|");
}
function v1(e, t, n) {
  for (var r = t.length - 1; t.charCodeAt(r - 1) === 44; ) --r;
  return Ln(e, t.substr(0, r), n / Math.pow(10, 3 * (t.length - r)));
}
function p1(e, t, n) {
  var r = t.replace(oc, ""), i = t.length - r.length;
  return Ln(e, r, n * Math.pow(10, 2 * i)) + ut("%", i);
}
function hc(e, t) {
  var n, r = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0) return "0.0E+0";
    if (t < 0) return "-" + hc(e, -t);
    var i = e.indexOf(".");
    i === -1 && (i = e.indexOf("E"));
    var a = Math.floor(Math.log(t) * Math.LOG10E) % i;
    if (a < 0 && (a += i), n = (t / Math.pow(10, a)).toPrecision(r + 1 + (i + a) % i), !n.match(/[Ee]/)) {
      var o = Math.floor(Math.log(t) * Math.LOG10E);
      n.indexOf(".") === -1 ? n = n.charAt(0) + "." + n.substr(1) + "E+" + (o - n.length + a) : n += "E+" + (o - a), n = n.replace(/\+-/, "-");
    }
    n = n.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(s, u, l, c) {
      return u + l + c.substr(0, (i + a) % i) + "." + c.substr(a) + "E";
    });
  } else n = t.toExponential(r);
  return e.match(/E\+00$/) && n.match(/e[+-]\d$/) && (n = n.substr(0, n.length - 1) + "0" + n.charAt(n.length - 1)), e.match(/E\-/) && n.match(/e\+/) && (n = n.replace(/e\+/, "e")), n.replace("e", "E");
}
function pn(e, t, n) {
  if (e.charCodeAt(0) === 40 && !t.match(cc)) {
    var r = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return n >= 0 ? pn("n", r, n) : "(" + pn("n", r, -n) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44) return v1(e, t, n);
  if (t.indexOf("%") !== -1) return p1(e, t, n);
  if (t.indexOf("E") !== -1) return hc(t, n);
  if (t.charCodeAt(0) === 36) return "$" + pn(e, t.substr(t.charAt(1) == " " ? 2 : 1), n);
  var i, a, o, s, u = Math.abs(n), l = n < 0 ? "-" : "";
  if (t.match(/^00+$/)) return l + ln(u, t.length);
  if (t.match(/^[#?]+$/))
    return i = "" + n, n === 0 && (i = ""), i.length > t.length ? i : Dt(t.substr(0, t.length - i.length)) + i;
  if (a = t.match(lc)) return f1(a, u, l);
  if (t.match(/^#+0+$/)) return l + ln(u, t.length - t.indexOf("0"));
  if (a = t.match(uc))
    return i = ("" + n).replace(/^([^\.]+)$/, "$1." + Dt(a[1])).replace(/\.$/, "." + Dt(a[1])), i = i.replace(/\.(\d*)$/, function(p, v) {
      return "." + v + ut("0", Dt(a[1]).length - v.length);
    }), t.indexOf("0.") !== -1 ? i : i.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), a = t.match(/^(0*)\.(#*)$/))
    return l + ("" + u).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, a[1].length ? "0." : ".");
  if (a = t.match(/^#{1,3},##0(\.?)$/)) return l + tr("" + u);
  if (a = t.match(/^#,##0\.([#0]*0)$/))
    return n < 0 ? "-" + pn(e, t, -n) : tr("" + n) + "." + ut("0", a[1].length);
  if (a = t.match(/^#,#*,#0/)) return pn(e, t.replace(/^#,#*,/, ""), n);
  if (a = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return i = Gr(pn(e, t.replace(/[\\-]/g, ""), n)), o = 0, Gr(Gr(t.replace(/\\/g, "")).replace(/[0#]/g, function(p) {
      return o < i.length ? i.charAt(o++) : p === "0" ? "0" : "";
    }));
  if (t.match(fc))
    return i = pn(e, "##########", n), "(" + i.substr(0, 3) + ") " + i.substr(3, 3) + "-" + i.substr(6);
  var c = "";
  if (a = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return o = Math.min(
      /*::String(*/
      a[4].length,
      7
    ), s = ja(u, Math.pow(10, o) - 1, !1), i = "" + l, c = Ln(
      "n",
      /*::String(*/
      a[1],
      s[1]
    ), c.charAt(c.length - 1) == " " && (c = c.substr(0, c.length - 1) + "0"), i += c + /*::String(*/
    a[2] + "/" + /*::String(*/
    a[3], c = Za(s[2], o), c.length < a[4].length && (c = Dt(a[4].substr(a[4].length - c.length)) + c), i += c, i;
  if (a = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return o = Math.min(Math.max(a[1].length, a[4].length), 7), s = ja(u, Math.pow(10, o) - 1, !0), l + (s[0] || (s[1] ? "" : "0")) + " " + (s[1] ? Js(s[1], o) + a[2] + "/" + a[3] + Za(s[2], o) : ut(" ", 2 * o + 1 + a[2].length + a[3].length));
  if (a = t.match(/^[#0?]+$/))
    return i = "" + n, t.length <= i.length ? i : Dt(t.substr(0, t.length - i.length)) + i;
  if (a = t.match(/^([#0]+)\.([#0]+)$/)) {
    i = "" + n.toFixed(Math.min(a[2].length, 10)).replace(/([^0])0+$/, "$1"), o = i.indexOf(".");
    var f = t.indexOf(".") - o, h = t.length - i.length - f;
    return Dt(t.substr(0, f) + i + t.substr(t.length - h));
  }
  if (a = t.match(/^00,000\.([#0]*0)$/))
    return n < 0 ? "-" + pn(e, t, -n) : tr("" + n).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(p) {
      return "00," + (p.length < 3 ? ln(0, 3 - p.length) : "") + p;
    }) + "." + ln(0, a[1].length);
  switch (t) {
    case "###,###":
    case "##,###":
    case "#,###":
      var d = tr("" + u);
      return d !== "0" ? l + d : "";
    default:
      if (t.match(/\.[0#?]*$/)) return pn(e, t.slice(0, t.lastIndexOf(".")), n) + Dt(t.slice(t.lastIndexOf(".")));
  }
  throw new Error("unsupported format |" + t + "|");
}
function Ln(e, t, n) {
  return (n | 0) === n ? pn(e, t, n) : Jt(e, t, n);
}
function g1(e) {
  for (var t = [], n = !1, r = 0, i = 0; r < e.length; ++r) switch (
    /*cc=*/
    e.charCodeAt(r)
  ) {
    case 34:
      n = !n;
      break;
    case 95:
    case 42:
    case 92:
      ++r;
      break;
    case 59:
      t[t.length] = e.substr(i, r - i), i = r + 1;
  }
  if (t[t.length] = e.substr(i), n === !0) throw new Error("Format |" + e + "| unterminated string ");
  return t;
}
var dc = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
function vc(e) {
  for (var t = 0, n = "", r = ""; t < e.length; )
    switch (n = e.charAt(t)) {
      case "G":
        qa(e, t) && (t += 6), t++;
        break;
      case '"':
        for (
          ;
          /*cc=*/
          e.charCodeAt(++t) !== 34 && t < e.length;
        )
          ;
        ++t;
        break;
      case "\\":
        t += 2;
        break;
      case "_":
        t += 2;
        break;
      case "@":
        ++t;
        break;
      case "B":
      case "b":
        if (e.charAt(t + 1) === "1" || e.charAt(t + 1) === "2") return !0;
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
        if (e.substr(t, 3).toUpperCase() === "A/P" || e.substr(t, 5).toUpperCase() === "AM/PM" || e.substr(t, 5).toUpperCase() === "上午/下午") return !0;
        ++t;
        break;
      case "[":
        for (r = n; e.charAt(t++) !== "]" && t < e.length; ) r += e.charAt(t);
        if (r.match(dc)) return !0;
        break;
      case ".":
      case "0":
      case "#":
        for (; t < e.length && ("0#?.,E+-%".indexOf(n = e.charAt(++t)) > -1 || n == "\\" && e.charAt(t + 1) == "-" && "0#".indexOf(e.charAt(t + 2)) > -1); )
          ;
        break;
      case "?":
        for (; e.charAt(++t) === n; )
          ;
        break;
      case "*":
        ++t, (e.charAt(t) == " " || e.charAt(t) == "*") && ++t;
        break;
      case "(":
      case ")":
        ++t;
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
        for (; t < e.length && "0123456789".indexOf(e.charAt(++t)) > -1; )
          ;
        break;
      case " ":
        ++t;
        break;
      default:
        ++t;
        break;
    }
  return !1;
}
function m1(e, t, n, r) {
  for (var i = [], a = "", o = 0, s = "", u = "t", l, c, f, h = "H"; o < e.length; )
    switch (s = e.charAt(o)) {
      case "G":
        if (!qa(e, o)) throw new Error("unrecognized character " + s + " in " + e);
        i[i.length] = { t: "G", v: "General" }, o += 7;
        break;
      case '"':
        for (a = ""; (f = e.charCodeAt(++o)) !== 34 && o < e.length; ) a += String.fromCharCode(f);
        i[i.length] = { t: "t", v: a }, ++o;
        break;
      case "\\":
        var d = e.charAt(++o), p = d === "(" || d === ")" ? d : "t";
        i[i.length] = { t: p, v: d }, ++o;
        break;
      case "_":
        i[i.length] = { t: "t", v: " " }, o += 2;
        break;
      case "@":
        i[i.length] = { t: "T", v: t }, ++o;
        break;
      case "B":
      case "b":
        if (e.charAt(o + 1) === "1" || e.charAt(o + 1) === "2") {
          if (l == null && (l = pa(t, n, e.charAt(o + 1) === "2"), l == null))
            return "";
          i[i.length] = { t: "X", v: e.substr(o, 2) }, u = s, o += 2;
          break;
        }
      case "M":
      case "D":
      case "Y":
      case "H":
      case "S":
      case "E":
        s = s.toLowerCase();
      case "m":
      case "d":
      case "y":
      case "h":
      case "s":
      case "e":
      case "g":
        if (t < 0 || l == null && (l = pa(t, n), l == null))
          return "";
        for (a = s; ++o < e.length && e.charAt(o).toLowerCase() === s; ) a += s;
        s === "m" && u.toLowerCase() === "h" && (s = "M"), s === "h" && (s = h), i[i.length] = { t: s, v: a }, u = s;
        break;
      case "A":
      case "a":
      case "上":
        var v = { t: s, v: s };
        if (l == null && (l = pa(t, n)), e.substr(o, 3).toUpperCase() === "A/P" ? (l != null && (v.v = l.H >= 12 ? "P" : "A"), v.t = "T", h = "h", o += 3) : e.substr(o, 5).toUpperCase() === "AM/PM" ? (l != null && (v.v = l.H >= 12 ? "PM" : "AM"), v.t = "T", o += 5, h = "h") : e.substr(o, 5).toUpperCase() === "上午/下午" ? (l != null && (v.v = l.H >= 12 ? "下午" : "上午"), v.t = "T", o += 5, h = "h") : (v.t = "t", ++o), l == null && v.t === "T") return "";
        i[i.length] = v, u = s;
        break;
      case "[":
        for (a = s; e.charAt(o++) !== "]" && o < e.length; ) a += e.charAt(o);
        if (a.slice(-1) !== "]") throw 'unterminated "[" block: |' + a + "|";
        if (a.match(dc)) {
          if (l == null && (l = pa(t, n), l == null))
            return "";
          i[i.length] = { t: "Z", v: a.toLowerCase() }, u = a.charAt(1);
        } else a.indexOf("$") > -1 && (a = (a.match(/\$([^-\[\]]*)/) || [])[1] || "$", vc(e) || (i[i.length] = { t: "t", v: a }));
        break;
      case ".":
        if (l != null) {
          for (a = s; ++o < e.length && (s = e.charAt(o)) === "0"; ) a += s;
          i[i.length] = { t: "s", v: a };
          break;
        }
      case "0":
      case "#":
        for (a = s; ++o < e.length && "0#?.,E+-%".indexOf(s = e.charAt(o)) > -1; ) a += s;
        i[i.length] = { t: "n", v: a };
        break;
      case "?":
        for (a = s; e.charAt(++o) === s; ) a += s;
        i[i.length] = { t: s, v: a }, u = s;
        break;
      case "*":
        ++o, (e.charAt(o) == " " || e.charAt(o) == "*") && ++o;
        break;
      case "(":
      case ")":
        i[i.length] = { t: r === 1 ? "t" : s, v: s }, ++o;
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
        for (a = s; o < e.length && "0123456789".indexOf(e.charAt(++o)) > -1; ) a += e.charAt(o);
        i[i.length] = { t: "D", v: a };
        break;
      case " ":
        i[i.length] = { t: s, v: s }, ++o;
        break;
      case "$":
        i[i.length] = { t: "t", v: "$" }, ++o;
        break;
      default:
        if (",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(s) === -1) throw new Error("unrecognized character " + s + " in " + e);
        i[i.length] = { t: "t", v: s }, ++o;
        break;
    }
  var g = 0, x = 0, y;
  for (o = i.length - 1, u = "t"; o >= 0; --o)
    switch (i[o].t) {
      case "h":
      case "H":
        i[o].t = h, u = "h", g < 1 && (g = 1);
        break;
      case "s":
        (y = i[o].v.match(/\.0+$/)) && (x = Math.max(x, y[0].length - 1)), g < 3 && (g = 3);
      case "d":
      case "y":
      case "M":
      case "e":
        u = i[o].t;
        break;
      case "m":
        u === "s" && (i[o].t = "M", g < 2 && (g = 2));
        break;
      case "X":
        break;
      case "Z":
        g < 1 && i[o].v.match(/[Hh]/) && (g = 1), g < 2 && i[o].v.match(/[Mm]/) && (g = 2), g < 3 && i[o].v.match(/[Ss]/) && (g = 3);
    }
  switch (g) {
    case 0:
      break;
    case 1:
      l.u >= 0.5 && (l.u = 0, ++l.S), l.S >= 60 && (l.S = 0, ++l.M), l.M >= 60 && (l.M = 0, ++l.H);
      break;
    case 2:
      l.u >= 0.5 && (l.u = 0, ++l.S), l.S >= 60 && (l.S = 0, ++l.M);
      break;
  }
  var m = "", T;
  for (o = 0; o < i.length; ++o)
    switch (i[o].t) {
      case "t":
      case "T":
      case " ":
      case "D":
        break;
      case "X":
        i[o].v = "", i[o].t = ";";
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
        i[o].v = s1(i[o].t.charCodeAt(0), i[o].v, l, x), i[o].t = "t";
        break;
      case "n":
      case "?":
        for (T = o + 1; i[T] != null && ((s = i[T].t) === "?" || s === "D" || (s === " " || s === "t") && i[T + 1] != null && (i[T + 1].t === "?" || i[T + 1].t === "t" && i[T + 1].v === "/") || i[o].t === "(" && (s === " " || s === "n" || s === ")") || s === "t" && (i[T].v === "/" || i[T].v === " " && i[T + 1] != null && i[T + 1].t == "?")); )
          i[o].v += i[T].v, i[T] = { v: "", t: ";" }, ++T;
        m += i[o].v, o = T - 1;
        break;
      case "G":
        i[o].t = "t", i[o].v = Es(t, n);
        break;
    }
  var Y = "", Q, R;
  if (m.length > 0) {
    m.charCodeAt(0) == 40 ? (Q = t < 0 && m.charCodeAt(0) === 45 ? -t : t, R = Ln("n", m, Q)) : (Q = t < 0 && r > 1 ? -t : t, R = Ln("n", m, Q), Q < 0 && i[0] && i[0].t == "t" && (R = R.substr(1), i[0].v = "-" + i[0].v)), T = R.length - 1;
    var V = i.length;
    for (o = 0; o < i.length; ++o) if (i[o] != null && i[o].t != "t" && i[o].v.indexOf(".") > -1) {
      V = o;
      break;
    }
    var P = i.length;
    if (V === i.length && R.indexOf("E") === -1) {
      for (o = i.length - 1; o >= 0; --o)
        i[o] == null || "n?".indexOf(i[o].t) === -1 || (T >= i[o].v.length - 1 ? (T -= i[o].v.length, i[o].v = R.substr(T + 1, i[o].v.length)) : T < 0 ? i[o].v = "" : (i[o].v = R.substr(0, T + 1), T = -1), i[o].t = "t", P = o);
      T >= 0 && P < i.length && (i[P].v = R.substr(0, T + 1) + i[P].v);
    } else if (V !== i.length && R.indexOf("E") === -1) {
      for (T = R.indexOf(".") - 1, o = V; o >= 0; --o)
        if (!(i[o] == null || "n?".indexOf(i[o].t) === -1)) {
          for (c = i[o].v.indexOf(".") > -1 && o === V ? i[o].v.indexOf(".") - 1 : i[o].v.length - 1, Y = i[o].v.substr(c + 1); c >= 0; --c)
            T >= 0 && (i[o].v.charAt(c) === "0" || i[o].v.charAt(c) === "#") && (Y = R.charAt(T--) + Y);
          i[o].v = Y, i[o].t = "t", P = o;
        }
      for (T >= 0 && P < i.length && (i[P].v = R.substr(0, T + 1) + i[P].v), T = R.indexOf(".") + 1, o = V; o < i.length; ++o)
        if (!(i[o] == null || "n?(".indexOf(i[o].t) === -1 && o !== V)) {
          for (c = i[o].v.indexOf(".") > -1 && o === V ? i[o].v.indexOf(".") + 1 : 0, Y = i[o].v.substr(0, c); c < i[o].v.length; ++c)
            T < R.length && (Y += R.charAt(T++));
          i[o].v = Y, i[o].t = "t", P = o;
        }
    }
  }
  for (o = 0; o < i.length; ++o) i[o] != null && "n?".indexOf(i[o].t) > -1 && (Q = r > 1 && t < 0 && o > 0 && i[o - 1].v === "-" ? -t : t, i[o].v = Ln(i[o].t, i[o].v, Q), i[o].t = "t");
  var H = "";
  for (o = 0; o !== i.length; ++o) i[o] != null && (H += i[o].v);
  return H;
}
var cu = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
function fu(e, t) {
  if (t == null) return !1;
  var n = parseFloat(t[2]);
  switch (t[1]) {
    case "=":
      if (e == n) return !0;
      break;
    case ">":
      if (e > n) return !0;
      break;
    case "<":
      if (e < n) return !0;
      break;
    case "<>":
      if (e != n) return !0;
      break;
    case ">=":
      if (e >= n) return !0;
      break;
    case "<=":
      if (e <= n) return !0;
      break;
  }
  return !1;
}
function x1(e, t) {
  var n = g1(e), r = n.length, i = n[r - 1].indexOf("@");
  if (r < 4 && i > -1 && --r, n.length > 4) throw new Error("cannot find right format for |" + n.join("|") + "|");
  if (typeof t != "number") return [4, n.length === 4 || i > -1 ? n[n.length - 1] : "@"];
  switch (n.length) {
    case 1:
      n = i > -1 ? ["General", "General", "General", n[0]] : [n[0], n[0], n[0], "@"];
      break;
    case 2:
      n = i > -1 ? [n[0], n[0], n[0], n[1]] : [n[0], n[1], n[0], "@"];
      break;
    case 3:
      n = i > -1 ? [n[0], n[1], n[0], n[2]] : [n[0], n[1], n[2], "@"];
      break;
  }
  var a = t > 0 ? n[0] : t < 0 ? n[1] : n[2];
  if (n[0].indexOf("[") === -1 && n[1].indexOf("[") === -1) return [r, a];
  if (n[0].match(/\[[=<>]/) != null || n[1].match(/\[[=<>]/) != null) {
    var o = n[0].match(cu), s = n[1].match(cu);
    return fu(t, o) ? [r, n[0]] : fu(t, s) ? [r, n[1]] : [r, n[o != null && s != null ? 2 : 1]];
  }
  return [r, a];
}
function nr(e, t, n) {
  n == null && (n = {});
  var r = "";
  switch (typeof e) {
    case "string":
      e == "m/d/yy" && n.dateNF ? r = n.dateNF : r = e;
      break;
    case "number":
      e == 14 && n.dateNF ? r = n.dateNF : r = (n.table != null ? n.table : ft)[e], r == null && (r = n.table && n.table[su[e]] || ft[su[e]]), r == null && (r = Qd[e] || "General");
      break;
  }
  if (qa(r, 0)) return Es(t, n);
  t instanceof Date && (t = ac(t, n.date1904));
  var i = x1(r, t);
  if (qa(i[1])) return Es(t, n);
  if (t === !0) t = "TRUE";
  else if (t === !1) t = "FALSE";
  else if (t === "" || t == null) return "";
  return m1(i[1], t, n, i[0]);
}
function pc(e, t) {
  if (typeof t != "number") {
    t = +t || -1;
    for (var n = 0; n < 392; ++n) {
      if (ft[n] == null) {
        t < 0 && (t = n);
        continue;
      }
      if (ft[n] == e) {
        t = n;
        break;
      }
    }
    t < 0 && (t = 391);
  }
  return ft[t] = e, t;
}
function Fo(e) {
  for (var t = 0; t != 392; ++t)
    e[t] !== void 0 && pc(e[t], t);
}
function ko() {
  ft = Jd();
}
var gc = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
function _1(e) {
  var t = typeof e == "number" ? ft[e] : e;
  return t = t.replace(gc, "(\\d+)"), new RegExp("^" + t + "$");
}
function w1(e, t, n) {
  var r = -1, i = -1, a = -1, o = -1, s = -1, u = -1;
  (t.match(gc) || []).forEach(function(f, h) {
    var d = parseInt(n[h + 1], 10);
    switch (f.toLowerCase().charAt(0)) {
      case "y":
        r = d;
        break;
      case "d":
        a = d;
        break;
      case "h":
        o = d;
        break;
      case "s":
        u = d;
        break;
      case "m":
        o >= 0 ? s = d : i = d;
        break;
    }
  }), u >= 0 && s == -1 && i >= 0 && (s = i, i = -1);
  var l = ("" + (r >= 0 ? r : (/* @__PURE__ */ new Date()).getFullYear())).slice(-4) + "-" + ("00" + (i >= 1 ? i : 1)).slice(-2) + "-" + ("00" + (a >= 1 ? a : 1)).slice(-2);
  l.length == 7 && (l = "0" + l), l.length == 8 && (l = "20" + l);
  var c = ("00" + (o >= 0 ? o : 0)).slice(-2) + ":" + ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + ("00" + (u >= 0 ? u : 0)).slice(-2);
  return o == -1 && s == -1 && u == -1 ? l : r == -1 && i == -1 && a == -1 ? c : l + "T" + c;
}
var y1 = /* @__PURE__ */ function() {
  var e = {};
  e.version = "1.2.0";
  function t() {
    for (var R = 0, V = new Array(256), P = 0; P != 256; ++P)
      R = P, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, V[P] = R;
    return typeof Int32Array < "u" ? new Int32Array(V) : V;
  }
  var n = t();
  function r(R) {
    var V = 0, P = 0, H = 0, G = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
    for (H = 0; H != 256; ++H) G[H] = R[H];
    for (H = 0; H != 256; ++H)
      for (P = R[H], V = 256 + H; V < 4096; V += 256) P = G[V] = P >>> 8 ^ R[P & 255];
    var C = [];
    for (H = 1; H != 16; ++H) C[H - 1] = typeof Int32Array < "u" ? G.subarray(H * 256, H * 256 + 256) : G.slice(H * 256, H * 256 + 256);
    return C;
  }
  var i = r(n), a = i[0], o = i[1], s = i[2], u = i[3], l = i[4], c = i[5], f = i[6], h = i[7], d = i[8], p = i[9], v = i[10], g = i[11], x = i[12], y = i[13], m = i[14];
  function T(R, V) {
    for (var P = V ^ -1, H = 0, G = R.length; H < G; ) P = P >>> 8 ^ n[(P ^ R.charCodeAt(H++)) & 255];
    return ~P;
  }
  function Y(R, V) {
    for (var P = V ^ -1, H = R.length - 15, G = 0; G < H; ) P = m[R[G++] ^ P & 255] ^ y[R[G++] ^ P >> 8 & 255] ^ x[R[G++] ^ P >> 16 & 255] ^ g[R[G++] ^ P >>> 24] ^ v[R[G++]] ^ p[R[G++]] ^ d[R[G++]] ^ h[R[G++]] ^ f[R[G++]] ^ c[R[G++]] ^ l[R[G++]] ^ u[R[G++]] ^ s[R[G++]] ^ o[R[G++]] ^ a[R[G++]] ^ n[R[G++]];
    for (H += 15; G < H; ) P = P >>> 8 ^ n[(P ^ R[G++]) & 255];
    return ~P;
  }
  function Q(R, V) {
    for (var P = V ^ -1, H = 0, G = R.length, C = 0, se = 0; H < G; )
      C = R.charCodeAt(H++), C < 128 ? P = P >>> 8 ^ n[(P ^ C) & 255] : C < 2048 ? (P = P >>> 8 ^ n[(P ^ (192 | C >> 6 & 31)) & 255], P = P >>> 8 ^ n[(P ^ (128 | C & 63)) & 255]) : C >= 55296 && C < 57344 ? (C = (C & 1023) + 64, se = R.charCodeAt(H++) & 1023, P = P >>> 8 ^ n[(P ^ (240 | C >> 8 & 7)) & 255], P = P >>> 8 ^ n[(P ^ (128 | C >> 2 & 63)) & 255], P = P >>> 8 ^ n[(P ^ (128 | se >> 6 & 15 | (C & 3) << 4)) & 255], P = P >>> 8 ^ n[(P ^ (128 | se & 63)) & 255]) : (P = P >>> 8 ^ n[(P ^ (224 | C >> 12 & 15)) & 255], P = P >>> 8 ^ n[(P ^ (128 | C >> 6 & 63)) & 255], P = P >>> 8 ^ n[(P ^ (128 | C & 63)) & 255]);
    return ~P;
  }
  return e.table = n, e.bstr = T, e.buf = Y, e.str = Q, e;
}(), et = /* @__PURE__ */ function() {
  var t = {};
  t.version = "1.2.1";
  function n(_, N) {
    for (var E = _.split("/"), S = N.split("/"), k = 0, b = 0, re = Math.min(E.length, S.length); k < re; ++k) {
      if (b = E[k].length - S[k].length) return b;
      if (E[k] != S[k]) return E[k] < S[k] ? -1 : 1;
    }
    return E.length - S.length;
  }
  function r(_) {
    if (_.charAt(_.length - 1) == "/") return _.slice(0, -1).indexOf("/") === -1 ? _ : r(_.slice(0, -1));
    var N = _.lastIndexOf("/");
    return N === -1 ? _ : _.slice(0, N + 1);
  }
  function i(_) {
    if (_.charAt(_.length - 1) == "/") return i(_.slice(0, -1));
    var N = _.lastIndexOf("/");
    return N === -1 ? _ : _.slice(N + 1);
  }
  function a(_, N) {
    typeof N == "string" && (N = new Date(N));
    var E = N.getHours();
    E = E << 6 | N.getMinutes(), E = E << 5 | N.getSeconds() >>> 1, _.write_shift(2, E);
    var S = N.getFullYear() - 1980;
    S = S << 4 | N.getMonth() + 1, S = S << 5 | N.getDate(), _.write_shift(2, S);
  }
  function o(_) {
    var N = _.read_shift(2) & 65535, E = _.read_shift(2) & 65535, S = /* @__PURE__ */ new Date(), k = E & 31;
    E >>>= 5;
    var b = E & 15;
    E >>>= 4, S.setMilliseconds(0), S.setFullYear(E + 1980), S.setMonth(b - 1), S.setDate(k);
    var re = N & 31;
    N >>>= 5;
    var fe = N & 63;
    return N >>>= 6, S.setHours(N), S.setMinutes(fe), S.setSeconds(re << 1), S;
  }
  function s(_) {
    Wt(_, 0);
    for (var N = (
      /*::(*/
      {}
    ), E = 0; _.l <= _.length - 4; ) {
      var S = _.read_shift(2), k = _.read_shift(2), b = _.l + k, re = {};
      switch (S) {
        case 21589:
          E = _.read_shift(1), E & 1 && (re.mtime = _.read_shift(4)), k > 5 && (E & 2 && (re.atime = _.read_shift(4)), E & 4 && (re.ctime = _.read_shift(4))), re.mtime && (re.mt = new Date(re.mtime * 1e3));
          break;
      }
      _.l = b, N[S] = re;
    }
    return N;
  }
  var u;
  function l() {
    return u || (u = {});
  }
  function c(_, N) {
    if (_[0] == 80 && _[1] == 75) return Xl(_, N);
    if ((_[0] | 32) == 109 && (_[1] | 32) == 105) return Nd(_, N);
    if (_.length < 512) throw new Error("CFB file size " + _.length + " < 512");
    var E = 3, S = 512, k = 0, b = 0, re = 0, fe = 0, te = 0, ie = [], ae = (
      /*::(*/
      _.slice(0, 512)
    );
    Wt(ae, 0);
    var xe = f(ae);
    switch (E = xe[0], E) {
      case 3:
        S = 512;
        break;
      case 4:
        S = 4096;
        break;
      case 0:
        if (xe[1] == 0) return Xl(_, N);
      default:
        throw new Error("Major Version: Expected 3 or 4 saw " + E);
    }
    S !== 512 && (ae = /*::(*/
    _.slice(0, S), Wt(
      ae,
      28
      /* blob.l */
    ));
    var Ce = _.slice(0, S);
    h(ae, E);
    var Ie = ae.read_shift(4, "i");
    if (E === 3 && Ie !== 0) throw new Error("# Directory Sectors: Expected 0 saw " + Ie);
    ae.l += 4, re = ae.read_shift(4, "i"), ae.l += 4, ae.chk("00100000", "Mini Stream Cutoff Size: "), fe = ae.read_shift(4, "i"), k = ae.read_shift(4, "i"), te = ae.read_shift(4, "i"), b = ae.read_shift(4, "i");
    for (var ye = -1, Fe = 0; Fe < 109 && (ye = ae.read_shift(4, "i"), !(ye < 0)); ++Fe)
      ie[Fe] = ye;
    var Ue = d(_, S);
    g(te, b, Ue, S, ie);
    var ot = y(Ue, re, ie, S);
    ot[re].name = "!Directory", k > 0 && fe !== se && (ot[fe].name = "!MiniFAT"), ot[ie[0]].name = "!FAT", ot.fat_addrs = ie, ot.ssz = S;
    var st = {}, kt = [], fi = [], hi = [];
    m(re, ot, Ue, kt, k, st, fi, fe), p(fi, hi, kt), kt.shift();
    var di = {
      FileIndex: fi,
      FullPaths: hi
    };
    return N && N.raw && (di.raw = { header: Ce, sectors: Ue }), di;
  }
  function f(_) {
    if (_[_.l] == 80 && _[_.l + 1] == 75) return [0, 0];
    _.chk(w, "Header Signature: "), _.l += 16;
    var N = _.read_shift(2, "u");
    return [_.read_shift(2, "u"), N];
  }
  function h(_, N) {
    var E = 9;
    switch (_.l += 2, E = _.read_shift(2)) {
      case 9:
        if (N != 3) throw new Error("Sector Shift: Expected 9 saw " + E);
        break;
      case 12:
        if (N != 4) throw new Error("Sector Shift: Expected 12 saw " + E);
        break;
      default:
        throw new Error("Sector Shift: Expected 9 or 12 saw " + E);
    }
    _.chk("0600", "Mini Sector Shift: "), _.chk("000000000000", "Reserved: ");
  }
  function d(_, N) {
    for (var E = Math.ceil(_.length / N) - 1, S = [], k = 1; k < E; ++k) S[k - 1] = _.slice(k * N, (k + 1) * N);
    return S[E - 1] = _.slice(E * N), S;
  }
  function p(_, N, E) {
    for (var S = 0, k = 0, b = 0, re = 0, fe = 0, te = E.length, ie = [], ae = []; S < te; ++S)
      ie[S] = ae[S] = S, N[S] = E[S];
    for (; fe < ae.length; ++fe)
      S = ae[fe], k = _[S].L, b = _[S].R, re = _[S].C, ie[S] === S && (k !== -1 && ie[k] !== k && (ie[S] = ie[k]), b !== -1 && ie[b] !== b && (ie[S] = ie[b])), re !== -1 && (ie[re] = S), k !== -1 && S != ie[S] && (ie[k] = ie[S], ae.lastIndexOf(k) < fe && ae.push(k)), b !== -1 && S != ie[S] && (ie[b] = ie[S], ae.lastIndexOf(b) < fe && ae.push(b));
    for (S = 1; S < te; ++S) ie[S] === S && (b !== -1 && ie[b] !== b ? ie[S] = ie[b] : k !== -1 && ie[k] !== k && (ie[S] = ie[k]));
    for (S = 1; S < te; ++S)
      if (_[S].type !== 0) {
        if (fe = S, fe != ie[fe]) do
          fe = ie[fe], N[S] = N[fe] + "/" + N[S];
        while (fe !== 0 && ie[fe] !== -1 && fe != ie[fe]);
        ie[S] = -1;
      }
    for (N[0] += "/", S = 1; S < te; ++S)
      _[S].type !== 2 && (N[S] += "/");
  }
  function v(_, N, E) {
    for (var S = _.start, k = _.size, b = [], re = S; E && k > 0 && re >= 0; )
      b.push(N.slice(re * C, re * C + C)), k -= C, re = cr(E, re * 4);
    return b.length === 0 ? ce(0) : At(b).slice(0, _.size);
  }
  function g(_, N, E, S, k) {
    var b = se;
    if (_ === se) {
      if (N !== 0) throw new Error("DIFAT chain shorter than expected");
    } else if (_ !== -1) {
      var re = E[_], fe = (S >>> 2) - 1;
      if (!re) return;
      for (var te = 0; te < fe && (b = cr(re, te * 4)) !== se; ++te)
        k.push(b);
      g(cr(re, S - 4), N - 1, E, S, k);
    }
  }
  function x(_, N, E, S, k) {
    var b = [], re = [];
    k || (k = []);
    var fe = S - 1, te = 0, ie = 0;
    for (te = N; te >= 0; ) {
      k[te] = !0, b[b.length] = te, re.push(_[te]);
      var ae = E[Math.floor(te * 4 / S)];
      if (ie = te * 4 & fe, S < 4 + ie) throw new Error("FAT boundary crossed: " + te + " 4 " + S);
      if (!_[ae]) break;
      te = cr(_[ae], ie);
    }
    return { nodes: b, data: _u([re]) };
  }
  function y(_, N, E, S) {
    var k = _.length, b = [], re = [], fe = [], te = [], ie = S - 1, ae = 0, xe = 0, Ce = 0, Ie = 0;
    for (ae = 0; ae < k; ++ae)
      if (fe = [], Ce = ae + N, Ce >= k && (Ce -= k), !re[Ce]) {
        te = [];
        var ye = [];
        for (xe = Ce; xe >= 0; ) {
          ye[xe] = !0, re[xe] = !0, fe[fe.length] = xe, te.push(_[xe]);
          var Fe = E[Math.floor(xe * 4 / S)];
          if (Ie = xe * 4 & ie, S < 4 + Ie) throw new Error("FAT boundary crossed: " + xe + " 4 " + S);
          if (!_[Fe] || (xe = cr(_[Fe], Ie), ye[xe])) break;
        }
        b[Ce] = { nodes: fe, data: _u([te]) };
      }
    return b;
  }
  function m(_, N, E, S, k, b, re, fe) {
    for (var te = 0, ie = S.length ? 2 : 0, ae = N[_].data, xe = 0, Ce = 0, Ie; xe < ae.length; xe += 128) {
      var ye = (
        /*::(*/
        ae.slice(xe, xe + 128)
      );
      Wt(ye, 64), Ce = ye.read_shift(2), Ie = il(ye, 0, Ce - ie), S.push(Ie);
      var Fe = {
        name: Ie,
        type: ye.read_shift(1),
        color: ye.read_shift(1),
        L: ye.read_shift(4, "i"),
        R: ye.read_shift(4, "i"),
        C: ye.read_shift(4, "i"),
        clsid: ye.read_shift(16),
        state: ye.read_shift(4, "i"),
        start: 0,
        size: 0
      }, Ue = ye.read_shift(2) + ye.read_shift(2) + ye.read_shift(2) + ye.read_shift(2);
      Ue !== 0 && (Fe.ct = T(ye, ye.l - 8));
      var ot = ye.read_shift(2) + ye.read_shift(2) + ye.read_shift(2) + ye.read_shift(2);
      ot !== 0 && (Fe.mt = T(ye, ye.l - 8)), Fe.start = ye.read_shift(4, "i"), Fe.size = ye.read_shift(4, "i"), Fe.size < 0 && Fe.start < 0 && (Fe.size = Fe.type = 0, Fe.start = se, Fe.name = ""), Fe.type === 5 ? (te = Fe.start, k > 0 && te !== se && (N[te].name = "!StreamData")) : Fe.size >= 4096 ? (Fe.storage = "fat", N[Fe.start] === void 0 && (N[Fe.start] = x(E, Fe.start, N.fat_addrs, N.ssz)), N[Fe.start].name = Fe.name, Fe.content = N[Fe.start].data.slice(0, Fe.size)) : (Fe.storage = "minifat", Fe.size < 0 ? Fe.size = 0 : te !== se && Fe.start !== se && N[te] && (Fe.content = v(Fe, N[te].data, (N[fe] || {}).data))), Fe.content && Wt(Fe.content, 0), b[Ie] = Fe, re.push(Fe);
    }
  }
  function T(_, N) {
    return new Date((Xt(_, N + 4) / 1e7 * Math.pow(2, 32) + Xt(_, N) / 1e7 - 11644473600) * 1e3);
  }
  function Y(_, N) {
    return l(), c(u.readFileSync(_), N);
  }
  function Q(_, N) {
    var E = N && N.type;
    switch (E || Xe && Buffer.isBuffer(_) && (E = "buffer"), E || "base64") {
      case "file":
        return Y(_, N);
      case "base64":
        return c(rn(Un(_)), N);
      case "binary":
        return c(rn(_), N);
    }
    return c(
      /*::typeof blob == 'string' ? new Buffer(blob, 'utf-8') : */
      _,
      N
    );
  }
  function R(_, N) {
    var E = N || {}, S = E.root || "Root Entry";
    if (_.FullPaths || (_.FullPaths = []), _.FileIndex || (_.FileIndex = []), _.FullPaths.length !== _.FileIndex.length) throw new Error("inconsistent CFB structure");
    _.FullPaths.length === 0 && (_.FullPaths[0] = S + "/", _.FileIndex[0] = { name: S, type: 5 }), E.CLSID && (_.FileIndex[0].clsid = E.CLSID), V(_);
  }
  function V(_) {
    var N = "Sh33tJ5";
    if (!et.find(_, "/" + N)) {
      var E = ce(4);
      E[0] = 55, E[1] = E[3] = 50, E[2] = 54, _.FileIndex.push({ name: N, type: 2, content: E, size: 4, L: 69, R: 69, C: 69 }), _.FullPaths.push(_.FullPaths[0] + N), P(_);
    }
  }
  function P(_, N) {
    R(_);
    for (var E = !1, S = !1, k = _.FullPaths.length - 1; k >= 0; --k) {
      var b = _.FileIndex[k];
      switch (b.type) {
        case 0:
          S ? E = !0 : (_.FileIndex.pop(), _.FullPaths.pop());
          break;
        case 1:
        case 2:
        case 5:
          S = !0, isNaN(b.R * b.L * b.C) && (E = !0), b.R > -1 && b.L > -1 && b.R == b.L && (E = !0);
          break;
        default:
          E = !0;
          break;
      }
    }
    if (!(!E && !N)) {
      var re = new Date(1987, 1, 19), fe = 0, te = Object.create ? /* @__PURE__ */ Object.create(null) : {}, ie = [];
      for (k = 0; k < _.FullPaths.length; ++k)
        te[_.FullPaths[k]] = !0, _.FileIndex[k].type !== 0 && ie.push([_.FullPaths[k], _.FileIndex[k]]);
      for (k = 0; k < ie.length; ++k) {
        var ae = r(ie[k][0]);
        S = te[ae], S || (ie.push([ae, {
          name: i(ae).replace("/", ""),
          type: 1,
          clsid: I,
          ct: re,
          mt: re,
          content: null
        }]), te[ae] = !0);
      }
      for (ie.sort(function(Ie, ye) {
        return n(Ie[0], ye[0]);
      }), _.FullPaths = [], _.FileIndex = [], k = 0; k < ie.length; ++k)
        _.FullPaths[k] = ie[k][0], _.FileIndex[k] = ie[k][1];
      for (k = 0; k < ie.length; ++k) {
        var xe = _.FileIndex[k], Ce = _.FullPaths[k];
        if (xe.name = i(Ce).replace("/", ""), xe.L = xe.R = xe.C = -(xe.color = 1), xe.size = xe.content ? xe.content.length : 0, xe.start = 0, xe.clsid = xe.clsid || I, k === 0)
          xe.C = ie.length > 1 ? 1 : -1, xe.size = 0, xe.type = 5;
        else if (Ce.slice(-1) == "/") {
          for (fe = k + 1; fe < ie.length && r(_.FullPaths[fe]) != Ce; ++fe) ;
          for (xe.C = fe >= ie.length ? -1 : fe, fe = k + 1; fe < ie.length && r(_.FullPaths[fe]) != r(Ce); ++fe) ;
          xe.R = fe >= ie.length ? -1 : fe, xe.type = 1;
        } else
          r(_.FullPaths[k + 1] || "") == r(Ce) && (xe.R = k + 1), xe.type = 2;
      }
    }
  }
  function H(_, N) {
    var E = N || {};
    if (E.fileType == "mad") return Fd(_, E);
    switch (P(_), E.fileType) {
      case "zip":
        return yd(_, E);
    }
    var S = function(Ie) {
      for (var ye = 0, Fe = 0, Ue = 0; Ue < Ie.FileIndex.length; ++Ue) {
        var ot = Ie.FileIndex[Ue];
        if (ot.content) {
          var st = ot.content.length;
          st > 0 && (st < 4096 ? ye += st + 63 >> 6 : Fe += st + 511 >> 9);
        }
      }
      for (var kt = Ie.FullPaths.length + 3 >> 2, fi = ye + 7 >> 3, hi = ye + 127 >> 7, di = fi + Fe + kt + hi, lr = di + 127 >> 7, jo = lr <= 109 ? 0 : Math.ceil((lr - 109) / 127); di + lr + jo + 127 >> 7 > lr; ) jo = ++lr <= 109 ? 0 : Math.ceil((lr - 109) / 127);
      var kn = [1, jo, lr, hi, kt, Fe, ye, 0];
      return Ie.FileIndex[0].size = ye << 6, kn[7] = (Ie.FileIndex[0].start = kn[0] + kn[1] + kn[2] + kn[3] + kn[4] + kn[5]) + (kn[6] + 7 >> 3), kn;
    }(_), k = ce(S[7] << 9), b = 0, re = 0;
    {
      for (b = 0; b < 8; ++b) k.write_shift(1, U[b]);
      for (b = 0; b < 8; ++b) k.write_shift(2, 0);
      for (k.write_shift(2, 62), k.write_shift(2, 3), k.write_shift(2, 65534), k.write_shift(2, 9), k.write_shift(2, 6), b = 0; b < 3; ++b) k.write_shift(2, 0);
      for (k.write_shift(4, 0), k.write_shift(4, S[2]), k.write_shift(4, S[0] + S[1] + S[2] + S[3] - 1), k.write_shift(4, 0), k.write_shift(4, 4096), k.write_shift(4, S[3] ? S[0] + S[1] + S[2] - 1 : se), k.write_shift(4, S[3]), k.write_shift(-4, S[1] ? S[0] - 1 : se), k.write_shift(4, S[1]), b = 0; b < 109; ++b) k.write_shift(-4, b < S[2] ? S[1] + b : -1);
    }
    if (S[1])
      for (re = 0; re < S[1]; ++re) {
        for (; b < 236 + re * 127; ++b) k.write_shift(-4, b < S[2] ? S[1] + b : -1);
        k.write_shift(-4, re === S[1] - 1 ? se : re + 1);
      }
    var fe = function(Ie) {
      for (re += Ie; b < re - 1; ++b) k.write_shift(-4, b + 1);
      Ie && (++b, k.write_shift(-4, se));
    };
    for (re = b = 0, re += S[1]; b < re; ++b) k.write_shift(-4, j.DIFSECT);
    for (re += S[2]; b < re; ++b) k.write_shift(-4, j.FATSECT);
    fe(S[3]), fe(S[4]);
    for (var te = 0, ie = 0, ae = _.FileIndex[0]; te < _.FileIndex.length; ++te)
      ae = _.FileIndex[te], ae.content && (ie = ae.content.length, !(ie < 4096) && (ae.start = re, fe(ie + 511 >> 9)));
    for (fe(S[6] + 7 >> 3); k.l & 511; ) k.write_shift(-4, j.ENDOFCHAIN);
    for (re = b = 0, te = 0; te < _.FileIndex.length; ++te)
      ae = _.FileIndex[te], ae.content && (ie = ae.content.length, !(!ie || ie >= 4096) && (ae.start = re, fe(ie + 63 >> 6)));
    for (; k.l & 511; ) k.write_shift(-4, j.ENDOFCHAIN);
    for (b = 0; b < S[4] << 2; ++b) {
      var xe = _.FullPaths[b];
      if (!xe || xe.length === 0) {
        for (te = 0; te < 17; ++te) k.write_shift(4, 0);
        for (te = 0; te < 3; ++te) k.write_shift(4, -1);
        for (te = 0; te < 12; ++te) k.write_shift(4, 0);
        continue;
      }
      ae = _.FileIndex[b], b === 0 && (ae.start = ae.size ? ae.start - 1 : se);
      var Ce = b === 0 && E.root || ae.name;
      if (ie = 2 * (Ce.length + 1), k.write_shift(64, Ce, "utf16le"), k.write_shift(2, ie), k.write_shift(1, ae.type), k.write_shift(1, ae.color), k.write_shift(-4, ae.L), k.write_shift(-4, ae.R), k.write_shift(-4, ae.C), ae.clsid) k.write_shift(16, ae.clsid, "hex");
      else for (te = 0; te < 4; ++te) k.write_shift(4, 0);
      k.write_shift(4, ae.state || 0), k.write_shift(4, 0), k.write_shift(4, 0), k.write_shift(4, 0), k.write_shift(4, 0), k.write_shift(4, ae.start), k.write_shift(4, ae.size), k.write_shift(4, 0);
    }
    for (b = 1; b < _.FileIndex.length; ++b)
      if (ae = _.FileIndex[b], ae.size >= 4096)
        if (k.l = ae.start + 1 << 9, Xe && Buffer.isBuffer(ae.content))
          ae.content.copy(k, k.l, 0, ae.size), k.l += ae.size + 511 & -512;
        else {
          for (te = 0; te < ae.size; ++te) k.write_shift(1, ae.content[te]);
          for (; te & 511; ++te) k.write_shift(1, 0);
        }
    for (b = 1; b < _.FileIndex.length; ++b)
      if (ae = _.FileIndex[b], ae.size > 0 && ae.size < 4096)
        if (Xe && Buffer.isBuffer(ae.content))
          ae.content.copy(k, k.l, 0, ae.size), k.l += ae.size + 63 & -64;
        else {
          for (te = 0; te < ae.size; ++te) k.write_shift(1, ae.content[te]);
          for (; te & 63; ++te) k.write_shift(1, 0);
        }
    if (Xe)
      k.l = k.length;
    else
      for (; k.l < k.length; ) k.write_shift(1, 0);
    return k;
  }
  function G(_, N) {
    var E = _.FullPaths.map(function(te) {
      return te.toUpperCase();
    }), S = E.map(function(te) {
      var ie = te.split("/");
      return ie[ie.length - (te.slice(-1) == "/" ? 2 : 1)];
    }), k = !1;
    N.charCodeAt(0) === 47 ? (k = !0, N = E[0].slice(0, -1) + N) : k = N.indexOf("/") !== -1;
    var b = N.toUpperCase(), re = k === !0 ? E.indexOf(b) : S.indexOf(b);
    if (re !== -1) return _.FileIndex[re];
    var fe = !b.match(va);
    for (b = b.replace(Ai, ""), fe && (b = b.replace(va, "!")), re = 0; re < E.length; ++re)
      if ((fe ? E[re].replace(va, "!") : E[re]).replace(Ai, "") == b || (fe ? S[re].replace(va, "!") : S[re]).replace(Ai, "") == b) return _.FileIndex[re];
    return null;
  }
  var C = 64, se = -2, w = "d0cf11e0a1b11ae1", U = [208, 207, 17, 224, 161, 177, 26, 225], I = "00000000000000000000000000000000", j = {
    /* 2.1 Compund File Sector Numbers and Types */
    MAXREGSECT: -6,
    DIFSECT: -4,
    FATSECT: -3,
    ENDOFCHAIN: se,
    FREESECT: -1,
    /* 2.2 Compound File Header */
    HEADER_SIGNATURE: w,
    HEADER_MINOR_VERSION: "3e00",
    MAXREGSID: -6,
    NOSTREAM: -1,
    HEADER_CLSID: I,
    /* 2.6.1 Compound File Directory Entry */
    EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
  };
  function K(_, N, E) {
    l();
    var S = H(_, E);
    u.writeFileSync(N, S);
  }
  function ee(_) {
    for (var N = new Array(_.length), E = 0; E < _.length; ++E) N[E] = String.fromCharCode(_[E]);
    return N.join("");
  }
  function J(_, N) {
    var E = H(_, N);
    switch (N && N.type || "buffer") {
      case "file":
        return l(), u.writeFileSync(N.filename, E), E;
      case "binary":
        return typeof E == "string" ? E : ee(E);
      case "base64":
        return Ri(typeof E == "string" ? E : ee(E));
      case "buffer":
        if (Xe) return Buffer.isBuffer(E) ? E : Gn(E);
      case "array":
        return typeof E == "string" ? rn(E) : E;
    }
    return E;
  }
  var de;
  function A(_) {
    try {
      var N = _.InflateRaw, E = new N();
      if (E._processChunk(new Uint8Array([3, 0]), E._finishFlushFlag), E.bytesRead) de = _;
      else throw new Error("zlib does not expose bytesRead");
    } catch (S) {
      console.error("cannot use native zlib: " + (S.message || S));
    }
  }
  function z(_, N) {
    if (!de) return Wl(_, N);
    var E = de.InflateRaw, S = new E(), k = S._processChunk(_.slice(_.l), S._finishFlushFlag);
    return _.l += S.bytesRead, k;
  }
  function L(_) {
    return de ? de.deflateRawSync(_) : fa(_);
  }
  var O = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], X = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], le = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
  function pe(_) {
    var N = (_ << 1 | _ << 11) & 139536 | (_ << 5 | _ << 15) & 558144;
    return (N >> 16 | N >> 8 | N) & 255;
  }
  for (var me = typeof Uint8Array < "u", he = me ? new Uint8Array(256) : [], ue = 0; ue < 256; ++ue) he[ue] = pe(ue);
  function Z(_, N) {
    var E = he[_ & 255];
    return N <= 8 ? E >>> 8 - N : (E = E << 8 | he[_ >> 8 & 255], N <= 16 ? E >>> 16 - N : (E = E << 8 | he[_ >> 16 & 255], E >>> 24 - N));
  }
  function _e(_, N) {
    var E = N & 7, S = N >>> 3;
    return (_[S] | (E <= 6 ? 0 : _[S + 1] << 8)) >>> E & 3;
  }
  function F(_, N) {
    var E = N & 7, S = N >>> 3;
    return (_[S] | (E <= 5 ? 0 : _[S + 1] << 8)) >>> E & 7;
  }
  function M(_, N) {
    var E = N & 7, S = N >>> 3;
    return (_[S] | (E <= 4 ? 0 : _[S + 1] << 8)) >>> E & 15;
  }
  function D(_, N) {
    var E = N & 7, S = N >>> 3;
    return (_[S] | (E <= 3 ? 0 : _[S + 1] << 8)) >>> E & 31;
  }
  function B(_, N) {
    var E = N & 7, S = N >>> 3;
    return (_[S] | (E <= 1 ? 0 : _[S + 1] << 8)) >>> E & 127;
  }
  function q(_, N, E) {
    var S = N & 7, k = N >>> 3, b = (1 << E) - 1, re = _[k] >>> S;
    return E < 8 - S || (re |= _[k + 1] << 8 - S, E < 16 - S) || (re |= _[k + 2] << 16 - S, E < 24 - S) || (re |= _[k + 3] << 24 - S), re & b;
  }
  function Ee(_, N, E) {
    var S = N & 7, k = N >>> 3;
    return S <= 5 ? _[k] |= (E & 7) << S : (_[k] |= E << S & 255, _[k + 1] = (E & 7) >> 8 - S), N + 3;
  }
  function Ae(_, N, E) {
    var S = N & 7, k = N >>> 3;
    return E = (E & 1) << S, _[k] |= E, N + 1;
  }
  function ne(_, N, E) {
    var S = N & 7, k = N >>> 3;
    return E <<= S, _[k] |= E & 255, E >>>= 8, _[k + 1] = E, N + 8;
  }
  function Ne(_, N, E) {
    var S = N & 7, k = N >>> 3;
    return E <<= S, _[k] |= E & 255, E >>>= 8, _[k + 1] = E & 255, _[k + 2] = E >>> 8, N + 16;
  }
  function be(_, N) {
    var E = _.length, S = 2 * E > N ? 2 * E : N + 5, k = 0;
    if (E >= N) return _;
    if (Xe) {
      var b = iu(S);
      if (_.copy) _.copy(b);
      else for (; k < _.length; ++k) b[k] = _[k];
      return b;
    } else if (me) {
      var re = new Uint8Array(S);
      if (re.set) re.set(_);
      else for (; k < E; ++k) re[k] = _[k];
      return re;
    }
    return _.length = S, _;
  }
  function Pe(_) {
    for (var N = new Array(_), E = 0; E < _; ++E) N[E] = 0;
    return N;
  }
  function We(_, N, E) {
    var S = 1, k = 0, b = 0, re = 0, fe = 0, te = _.length, ie = me ? new Uint16Array(32) : Pe(32);
    for (b = 0; b < 32; ++b) ie[b] = 0;
    for (b = te; b < E; ++b) _[b] = 0;
    te = _.length;
    var ae = me ? new Uint16Array(te) : Pe(te);
    for (b = 0; b < te; ++b)
      ie[k = _[b]]++, S < k && (S = k), ae[b] = 0;
    for (ie[0] = 0, b = 1; b <= S; ++b) ie[b + 16] = fe = fe + ie[b - 1] << 1;
    for (b = 0; b < te; ++b)
      fe = _[b], fe != 0 && (ae[b] = ie[fe + 16]++);
    var xe = 0;
    for (b = 0; b < te; ++b)
      if (xe = _[b], xe != 0)
        for (fe = Z(ae[b], S) >> S - xe, re = (1 << S + 4 - xe) - 1; re >= 0; --re)
          N[fe | re << xe] = xe & 15 | b << 4;
    return S;
  }
  var jt = me ? new Uint16Array(512) : Pe(512), Rt = me ? new Uint16Array(32) : Pe(32);
  if (!me) {
    for (var Fn = 0; Fn < 512; ++Fn) jt[Fn] = 0;
    for (Fn = 0; Fn < 32; ++Fn) Rt[Fn] = 0;
  }
  (function() {
    for (var _ = [], N = 0; N < 32; N++) _.push(5);
    We(_, Rt, 32);
    var E = [];
    for (N = 0; N <= 143; N++) E.push(8);
    for (; N <= 255; N++) E.push(9);
    for (; N <= 279; N++) E.push(7);
    for (; N <= 287; N++) E.push(8);
    We(E, jt, 288);
  })();
  var Zo = /* @__PURE__ */ function() {
    for (var N = me ? new Uint8Array(32768) : [], E = 0, S = 0; E < le.length - 1; ++E)
      for (; S < le[E + 1]; ++S) N[S] = E;
    for (; S < 32768; ++S) N[S] = 29;
    var k = me ? new Uint8Array(259) : [];
    for (E = 0, S = 0; E < X.length - 1; ++E)
      for (; S < X[E + 1]; ++S) k[S] = E;
    function b(fe, te) {
      for (var ie = 0; ie < fe.length; ) {
        var ae = Math.min(65535, fe.length - ie), xe = ie + ae == fe.length;
        for (te.write_shift(1, +xe), te.write_shift(2, ae), te.write_shift(2, ~ae & 65535); ae-- > 0; ) te[te.l++] = fe[ie++];
      }
      return te.l;
    }
    function re(fe, te) {
      for (var ie = 0, ae = 0, xe = me ? new Uint16Array(32768) : []; ae < fe.length; ) {
        var Ce = (
          /* data.length - boff; */
          Math.min(65535, fe.length - ae)
        );
        if (Ce < 10) {
          for (ie = Ee(te, ie, +(ae + Ce == fe.length)), ie & 7 && (ie += 8 - (ie & 7)), te.l = ie / 8 | 0, te.write_shift(2, Ce), te.write_shift(2, ~Ce & 65535); Ce-- > 0; ) te[te.l++] = fe[ae++];
          ie = te.l * 8;
          continue;
        }
        ie = Ee(te, ie, +(ae + Ce == fe.length) + 2);
        for (var Ie = 0; Ce-- > 0; ) {
          var ye = fe[ae];
          Ie = (Ie << 5 ^ ye) & 32767;
          var Fe = -1, Ue = 0;
          if ((Fe = xe[Ie]) && (Fe |= ae & -32768, Fe > ae && (Fe -= 32768), Fe < ae))
            for (; fe[Fe + Ue] == fe[ae + Ue] && Ue < 250; ) ++Ue;
          if (Ue > 2) {
            ye = k[Ue], ye <= 22 ? ie = ne(te, ie, he[ye + 1] >> 1) - 1 : (ne(te, ie, 3), ie += 5, ne(te, ie, he[ye - 23] >> 5), ie += 3);
            var ot = ye < 8 ? 0 : ye - 4 >> 2;
            ot > 0 && (Ne(te, ie, Ue - X[ye]), ie += ot), ye = N[ae - Fe], ie = ne(te, ie, he[ye] >> 3), ie -= 3;
            var st = ye < 4 ? 0 : ye - 2 >> 1;
            st > 0 && (Ne(te, ie, ae - Fe - le[ye]), ie += st);
            for (var kt = 0; kt < Ue; ++kt)
              xe[Ie] = ae & 32767, Ie = (Ie << 5 ^ fe[ae]) & 32767, ++ae;
            Ce -= Ue - 1;
          } else
            ye <= 143 ? ye = ye + 48 : ie = Ae(te, ie, 1), ie = ne(te, ie, he[ye]), xe[Ie] = ae & 32767, ++ae;
        }
        ie = ne(te, ie, 0) - 1;
      }
      return te.l = (ie + 7) / 8 | 0, te.l;
    }
    return function(te, ie) {
      return te.length < 8 ? b(te, ie) : re(te, ie);
    };
  }();
  function fa(_) {
    var N = ce(50 + Math.floor(_.length * 1.1)), E = Zo(_, N);
    return N.slice(0, E);
  }
  var $l = me ? new Uint16Array(32768) : Pe(32768), Ul = me ? new Uint16Array(32768) : Pe(32768), zl = me ? new Uint16Array(128) : Pe(128), Hl = 1, Vl = 1;
  function xd(_, N) {
    var E = D(_, N) + 257;
    N += 5;
    var S = D(_, N) + 1;
    N += 5;
    var k = M(_, N) + 4;
    N += 4;
    for (var b = 0, re = me ? new Uint8Array(19) : Pe(19), fe = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], te = 1, ie = me ? new Uint8Array(8) : Pe(8), ae = me ? new Uint8Array(8) : Pe(8), xe = re.length, Ce = 0; Ce < k; ++Ce)
      re[O[Ce]] = b = F(_, N), te < b && (te = b), ie[b]++, N += 3;
    var Ie = 0;
    for (ie[0] = 0, Ce = 1; Ce <= te; ++Ce) ae[Ce] = Ie = Ie + ie[Ce - 1] << 1;
    for (Ce = 0; Ce < xe; ++Ce) (Ie = re[Ce]) != 0 && (fe[Ce] = ae[Ie]++);
    var ye = 0;
    for (Ce = 0; Ce < xe; ++Ce)
      if (ye = re[Ce], ye != 0) {
        Ie = he[fe[Ce]] >> 8 - ye;
        for (var Fe = (1 << 7 - ye) - 1; Fe >= 0; --Fe) zl[Ie | Fe << ye] = ye & 7 | Ce << 3;
      }
    var Ue = [];
    for (te = 1; Ue.length < E + S; )
      switch (Ie = zl[B(_, N)], N += Ie & 7, Ie >>>= 3) {
        case 16:
          for (b = 3 + _e(_, N), N += 2, Ie = Ue[Ue.length - 1]; b-- > 0; ) Ue.push(Ie);
          break;
        case 17:
          for (b = 3 + F(_, N), N += 3; b-- > 0; ) Ue.push(0);
          break;
        case 18:
          for (b = 11 + B(_, N), N += 7; b-- > 0; ) Ue.push(0);
          break;
        default:
          Ue.push(Ie), te < Ie && (te = Ie);
          break;
      }
    var ot = Ue.slice(0, E), st = Ue.slice(E);
    for (Ce = E; Ce < 286; ++Ce) ot[Ce] = 0;
    for (Ce = S; Ce < 30; ++Ce) st[Ce] = 0;
    return Hl = We(ot, $l, 286), Vl = We(st, Ul, 30), N;
  }
  function _d(_, N) {
    if (_[0] == 3 && !(_[1] & 3))
      return [yr(N), 2];
    for (var E = 0, S = 0, k = iu(N || 1 << 18), b = 0, re = k.length >>> 0, fe = 0, te = 0; !(S & 1); ) {
      if (S = F(_, E), E += 3, S >>> 1)
        S >> 1 == 1 ? (fe = 9, te = 5) : (E = xd(_, E), fe = Hl, te = Vl);
      else {
        E & 7 && (E += 8 - (E & 7));
        var ie = _[E >>> 3] | _[(E >>> 3) + 1] << 8;
        if (E += 32, ie > 0)
          for (!N && re < b + ie && (k = be(k, b + ie), re = k.length); ie-- > 0; )
            k[b++] = _[E >>> 3], E += 8;
        continue;
      }
      for (; ; ) {
        !N && re < b + 32767 && (k = be(k, b + 32767), re = k.length);
        var ae = q(_, E, fe), xe = S >>> 1 == 1 ? jt[ae] : $l[ae];
        if (E += xe & 15, xe >>>= 4, !(xe >>> 8 & 255)) k[b++] = xe;
        else {
          if (xe == 256) break;
          xe -= 257;
          var Ce = xe < 8 ? 0 : xe - 4 >> 2;
          Ce > 5 && (Ce = 0);
          var Ie = b + X[xe];
          Ce > 0 && (Ie += q(_, E, Ce), E += Ce), ae = q(_, E, te), xe = S >>> 1 == 1 ? Rt[ae] : Ul[ae], E += xe & 15, xe >>>= 4;
          var ye = xe < 4 ? 0 : xe - 2 >> 1, Fe = le[xe];
          for (ye > 0 && (Fe += q(_, E, ye), E += ye), !N && re < Ie && (k = be(k, Ie + 100), re = k.length); b < Ie; )
            k[b] = k[b - Fe], ++b;
        }
      }
    }
    return N ? [k, E + 7 >>> 3] : [k.slice(0, b), E + 7 >>> 3];
  }
  function Wl(_, N) {
    var E = _.slice(_.l || 0), S = _d(E, N);
    return _.l += S[1], S[0];
  }
  function Gl(_, N) {
    if (_)
      typeof console < "u" && console.error(N);
    else throw new Error(N);
  }
  function Xl(_, N) {
    var E = (
      /*::(*/
      _
    );
    Wt(E, 0);
    var S = [], k = [], b = {
      FileIndex: S,
      FullPaths: k
    };
    R(b, { root: N.root });
    for (var re = E.length - 4; (E[re] != 80 || E[re + 1] != 75 || E[re + 2] != 5 || E[re + 3] != 6) && re >= 0; ) --re;
    E.l = re + 4, E.l += 4;
    var fe = E.read_shift(2);
    E.l += 6;
    var te = E.read_shift(4);
    for (E.l = te, re = 0; re < fe; ++re) {
      E.l += 20;
      var ie = E.read_shift(4), ae = E.read_shift(4), xe = E.read_shift(2), Ce = E.read_shift(2), Ie = E.read_shift(2);
      E.l += 8;
      var ye = E.read_shift(4), Fe = s(
        /*::(*/
        E.slice(E.l + xe, E.l + xe + Ce)
        /*:: :any)*/
      );
      E.l += xe + Ce + Ie;
      var Ue = E.l;
      E.l = ye + 4, wd(E, ie, ae, b, Fe), E.l = Ue;
    }
    return b;
  }
  function wd(_, N, E, S, k) {
    _.l += 2;
    var b = _.read_shift(2), re = _.read_shift(2), fe = o(_);
    if (b & 8257) throw new Error("Unsupported ZIP encryption");
    for (var te = _.read_shift(4), ie = _.read_shift(4), ae = _.read_shift(4), xe = _.read_shift(2), Ce = _.read_shift(2), Ie = "", ye = 0; ye < xe; ++ye) Ie += String.fromCharCode(_[_.l++]);
    if (Ce) {
      var Fe = s(
        /*::(*/
        _.slice(_.l, _.l + Ce)
        /*:: :any)*/
      );
      (Fe[21589] || {}).mt && (fe = Fe[21589].mt), ((k || {})[21589] || {}).mt && (fe = k[21589].mt);
    }
    _.l += Ce;
    var Ue = _.slice(_.l, _.l + ie);
    switch (re) {
      case 8:
        Ue = z(_, ae);
        break;
      case 0:
        break;
      default:
        throw new Error("Unsupported ZIP Compression method " + re);
    }
    var ot = !1;
    b & 8 && (te = _.read_shift(4), te == 134695760 && (te = _.read_shift(4), ot = !0), ie = _.read_shift(4), ae = _.read_shift(4)), ie != N && Gl(ot, "Bad compressed size: " + N + " != " + ie), ae != E && Gl(ot, "Bad uncompressed size: " + E + " != " + ae), qo(S, Ie, Ue, { unsafe: !0, mt: fe });
  }
  function yd(_, N) {
    var E = N || {}, S = [], k = [], b = ce(1), re = E.compression ? 8 : 0, fe = 0, te = 0, ie = 0, ae = 0, xe = 0, Ce = _.FullPaths[0], Ie = Ce, ye = _.FileIndex[0], Fe = [], Ue = 0;
    for (te = 1; te < _.FullPaths.length; ++te)
      if (Ie = _.FullPaths[te].slice(Ce.length), ye = _.FileIndex[te], !(!ye.size || !ye.content || Ie == "Sh33tJ5")) {
        var ot = ae, st = ce(Ie.length);
        for (ie = 0; ie < Ie.length; ++ie) st.write_shift(1, Ie.charCodeAt(ie) & 127);
        st = st.slice(0, st.l), Fe[xe] = y1.buf(
          /*::((*/
          ye.content,
          0
        );
        var kt = ye.content;
        re == 8 && (kt = L(kt)), b = ce(30), b.write_shift(4, 67324752), b.write_shift(2, 20), b.write_shift(2, fe), b.write_shift(2, re), ye.mt ? a(b, ye.mt) : b.write_shift(4, 0), b.write_shift(-4, Fe[xe]), b.write_shift(4, kt.length), b.write_shift(
          4,
          /*::(*/
          ye.content.length
        ), b.write_shift(2, st.length), b.write_shift(2, 0), ae += b.length, S.push(b), ae += st.length, S.push(st), ae += kt.length, S.push(kt), b = ce(46), b.write_shift(4, 33639248), b.write_shift(2, 0), b.write_shift(2, 20), b.write_shift(2, fe), b.write_shift(2, re), b.write_shift(4, 0), b.write_shift(-4, Fe[xe]), b.write_shift(4, kt.length), b.write_shift(
          4,
          /*::(*/
          ye.content.length
        ), b.write_shift(2, st.length), b.write_shift(2, 0), b.write_shift(2, 0), b.write_shift(2, 0), b.write_shift(2, 0), b.write_shift(4, 0), b.write_shift(4, ot), Ue += b.l, k.push(b), Ue += st.length, k.push(st), ++xe;
      }
    return b = ce(22), b.write_shift(4, 101010256), b.write_shift(2, 0), b.write_shift(2, 0), b.write_shift(2, xe), b.write_shift(2, xe), b.write_shift(4, Ue), b.write_shift(4, ae), b.write_shift(2, 0), At([At(S), At(k), b]);
  }
  var ha = {
    htm: "text/html",
    xml: "text/xml",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    mso: "application/x-mso",
    thmx: "application/vnd.ms-officetheme",
    sh33tj5: "application/octet-stream"
  };
  function Ed(_, N) {
    if (_.ctype) return _.ctype;
    var E = _.name || "", S = E.match(/\.([^\.]+)$/);
    return S && ha[S[1]] || N && (S = (E = N).match(/[\.\\]([^\.\\])+$/), S && ha[S[1]]) ? ha[S[1]] : "application/octet-stream";
  }
  function Td(_) {
    for (var N = Ri(_), E = [], S = 0; S < N.length; S += 76) E.push(N.slice(S, S + 76));
    return E.join(`\r
`) + `\r
`;
  }
  function Sd(_) {
    var N = _.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function(ie) {
      var ae = ie.charCodeAt(0).toString(16).toUpperCase();
      return "=" + (ae.length == 1 ? "0" + ae : ae);
    });
    N = N.replace(/ $/mg, "=20").replace(/\t$/mg, "=09"), N.charAt(0) == `
` && (N = "=0D" + N.slice(1)), N = N.replace(/\r(?!\n)/mg, "=0D").replace(/\n\n/mg, `
=0A`).replace(/([^\r\n])\n/mg, "$1=0A");
    for (var E = [], S = N.split(`\r
`), k = 0; k < S.length; ++k) {
      var b = S[k];
      if (b.length == 0) {
        E.push("");
        continue;
      }
      for (var re = 0; re < b.length; ) {
        var fe = 76, te = b.slice(re, re + fe);
        te.charAt(fe - 1) == "=" ? fe-- : te.charAt(fe - 2) == "=" ? fe -= 2 : te.charAt(fe - 3) == "=" && (fe -= 3), te = b.slice(re, re + fe), re += fe, re < b.length && (te += "="), E.push(te);
      }
    }
    return E.join(`\r
`);
  }
  function Ad(_) {
    for (var N = [], E = 0; E < _.length; ++E) {
      for (var S = _[E]; E <= _.length && S.charAt(S.length - 1) == "="; ) S = S.slice(0, S.length - 1) + _[++E];
      N.push(S);
    }
    for (var k = 0; k < N.length; ++k) N[k] = N[k].replace(/[=][0-9A-Fa-f]{2}/g, function(b) {
      return String.fromCharCode(parseInt(b.slice(1), 16));
    });
    return rn(N.join(`\r
`));
  }
  function Cd(_, N, E) {
    for (var S = "", k = "", b = "", re, fe = 0; fe < 10; ++fe) {
      var te = N[fe];
      if (!te || te.match(/^\s*$/)) break;
      var ie = te.match(/^(.*?):\s*([^\s].*)$/);
      if (ie) switch (ie[1].toLowerCase()) {
        case "content-location":
          S = ie[2].trim();
          break;
        case "content-type":
          b = ie[2].trim();
          break;
        case "content-transfer-encoding":
          k = ie[2].trim();
          break;
      }
    }
    switch (++fe, k.toLowerCase()) {
      case "base64":
        re = rn(Un(N.slice(fe).join("")));
        break;
      case "quoted-printable":
        re = Ad(N.slice(fe));
        break;
      default:
        throw new Error("Unsupported Content-Transfer-Encoding " + k);
    }
    var ae = qo(_, S.slice(E.length), re, { unsafe: !0 });
    b && (ae.ctype = b);
  }
  function Nd(_, N) {
    if (ee(_.slice(0, 13)).toLowerCase() != "mime-version:") throw new Error("Unsupported MAD header");
    var E = N && N.root || "", S = (Xe && Buffer.isBuffer(_) ? _.toString("binary") : ee(_)).split(`\r
`), k = 0, b = "";
    for (k = 0; k < S.length; ++k)
      if (b = S[k], !!/^Content-Location:/i.test(b) && (b = b.slice(b.indexOf("file")), E || (E = b.slice(0, b.lastIndexOf("/") + 1)), b.slice(0, E.length) != E))
        for (; E.length > 0 && (E = E.slice(0, E.length - 1), E = E.slice(0, E.lastIndexOf("/") + 1), b.slice(0, E.length) != E); )
          ;
    var re = (S[1] || "").match(/boundary="(.*?)"/);
    if (!re) throw new Error("MAD cannot find boundary");
    var fe = "--" + (re[1] || ""), te = [], ie = [], ae = {
      FileIndex: te,
      FullPaths: ie
    };
    R(ae);
    var xe, Ce = 0;
    for (k = 0; k < S.length; ++k) {
      var Ie = S[k];
      Ie !== fe && Ie !== fe + "--" || (Ce++ && Cd(ae, S.slice(xe, k), E), xe = k);
    }
    return ae;
  }
  function Fd(_, N) {
    var E = N || {}, S = E.boundary || "SheetJS";
    S = "------=" + S;
    for (var k = [
      "MIME-Version: 1.0",
      'Content-Type: multipart/related; boundary="' + S.slice(2) + '"',
      "",
      "",
      ""
    ], b = _.FullPaths[0], re = b, fe = _.FileIndex[0], te = 1; te < _.FullPaths.length; ++te)
      if (re = _.FullPaths[te].slice(b.length), fe = _.FileIndex[te], !(!fe.size || !fe.content || re == "Sh33tJ5")) {
        re = re.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function(Ue) {
          return "_x" + Ue.charCodeAt(0).toString(16) + "_";
        }).replace(/[\u0080-\uFFFF]/g, function(Ue) {
          return "_u" + Ue.charCodeAt(0).toString(16) + "_";
        });
        for (var ie = fe.content, ae = Xe && Buffer.isBuffer(ie) ? ie.toString("binary") : ee(ie), xe = 0, Ce = Math.min(1024, ae.length), Ie = 0, ye = 0; ye <= Ce; ++ye) (Ie = ae.charCodeAt(ye)) >= 32 && Ie < 128 && ++xe;
        var Fe = xe >= Ce * 4 / 5;
        k.push(S), k.push("Content-Location: " + (E.root || "file:///C:/SheetJS/") + re), k.push("Content-Transfer-Encoding: " + (Fe ? "quoted-printable" : "base64")), k.push("Content-Type: " + Ed(fe, re)), k.push(""), k.push(Fe ? Sd(ae) : Td(ae));
      }
    return k.push(S + `--\r
`), k.join(`\r
`);
  }
  function kd(_) {
    var N = {};
    return R(N, _), N;
  }
  function qo(_, N, E, S) {
    var k = S && S.unsafe;
    k || R(_);
    var b = !k && et.find(_, N);
    if (!b) {
      var re = _.FullPaths[0];
      N.slice(0, re.length) == re ? re = N : (re.slice(-1) != "/" && (re += "/"), re = (re + N).replace("//", "/")), b = { name: i(N), type: 2 }, _.FileIndex.push(b), _.FullPaths.push(re), k || et.utils.cfb_gc(_);
    }
    return b.content = E, b.size = E ? E.length : 0, S && (S.CLSID && (b.clsid = S.CLSID), S.mt && (b.mt = S.mt), S.ct && (b.ct = S.ct)), b;
  }
  function Id(_, N) {
    R(_);
    var E = et.find(_, N);
    if (E) {
      for (var S = 0; S < _.FileIndex.length; ++S) if (_.FileIndex[S] == E)
        return _.FileIndex.splice(S, 1), _.FullPaths.splice(S, 1), !0;
    }
    return !1;
  }
  function Od(_, N, E) {
    R(_);
    var S = et.find(_, N);
    if (S) {
      for (var k = 0; k < _.FileIndex.length; ++k) if (_.FileIndex[k] == S)
        return _.FileIndex[k].name = i(E), _.FullPaths[k] = E, !0;
    }
    return !1;
  }
  function Dd(_) {
    P(_, !0);
  }
  return t.find = G, t.read = Q, t.parse = c, t.write = J, t.writeFile = K, t.utils = {
    cfb_new: kd,
    cfb_add: qo,
    cfb_del: Id,
    cfb_mov: Od,
    cfb_gc: Dd,
    ReadShift: Ni,
    CheckField: Mc,
    prep_blob: Wt,
    bconcat: At,
    use_zlib: A,
    _deflateRaw: fa,
    _inflateRaw: Wl,
    consts: j
  }, t;
}();
function E1(e) {
  return typeof e == "string" ? No(e) : Array.isArray(e) ? Kd(e) : e;
}
function ta(e, t, n) {
  if (typeof Deno < "u") {
    if (n && typeof t == "string") switch (n) {
      case "utf8":
        t = new TextEncoder(n).encode(t);
        break;
      case "binary":
        t = No(t);
        break;
      default:
        throw new Error("Unsupported encoding " + n);
    }
    return Deno.writeFileSync(e, t);
  }
  var r = n == "utf8" ? Li(t) : t;
  if (typeof IE_SaveFile < "u") return IE_SaveFile(r, e);
  if (typeof Blob < "u") {
    var i = new Blob([E1(r)], { type: "application/octet-stream" });
    if (typeof navigator < "u" && navigator.msSaveBlob) return navigator.msSaveBlob(i, e);
    if (typeof saveAs < "u") return saveAs(i, e);
    if (typeof URL < "u" && typeof document < "u" && document.createElement && URL.createObjectURL) {
      var a = URL.createObjectURL(i);
      if (typeof chrome == "object" && typeof (chrome.downloads || {}).download == "function")
        return URL.revokeObjectURL && typeof setTimeout < "u" && setTimeout(function() {
          URL.revokeObjectURL(a);
        }, 6e4), chrome.downloads.download({ url: a, filename: e, saveAs: !0 });
      var o = document.createElement("a");
      if (o.download != null)
        return o.download = e, o.href = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL && typeof setTimeout < "u" && setTimeout(function() {
          URL.revokeObjectURL(a);
        }, 6e4), a;
    }
  }
  if (typeof $ < "u" && typeof File < "u" && typeof Folder < "u") try {
    var s = File(e);
    return s.open("w"), s.encoding = "binary", Array.isArray(t) && (t = ea(t)), s.write(t), s.close(), t;
  } catch (u) {
    if (!u.message || !u.message.match(/onstruct/)) throw u;
  }
  throw new Error("cannot save file " + e);
}
function Ft(e) {
  for (var t = Object.keys(e), n = [], r = 0; r < t.length; ++r) Object.prototype.hasOwnProperty.call(e, t[r]) && n.push(t[r]);
  return n;
}
function hu(e, t) {
  for (var n = [], r = Ft(e), i = 0; i !== r.length; ++i) n[e[r[i]][t]] == null && (n[e[r[i]][t]] = r[i]);
  return n;
}
function el(e) {
  for (var t = [], n = Ft(e), r = 0; r !== n.length; ++r) t[e[n[r]]] = n[r];
  return t;
}
function Io(e) {
  for (var t = [], n = Ft(e), r = 0; r !== n.length; ++r) t[e[n[r]]] = parseInt(n[r], 10);
  return t;
}
function T1(e) {
  for (var t = [], n = Ft(e), r = 0; r !== n.length; ++r)
    t[e[n[r]]] == null && (t[e[n[r]]] = []), t[e[n[r]]].push(n[r]);
  return t;
}
var Ja = /* @__PURE__ */ new Date(1899, 11, 30, 0, 0, 0);
function Ut(e, t) {
  var n = /* @__PURE__ */ e.getTime(), r = /* @__PURE__ */ Ja.getTime() + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ Ja.getTimezoneOffset()) * 6e4;
  return (n - r) / (24 * 60 * 60 * 1e3);
}
var mc = /* @__PURE__ */ new Date(), S1 = /* @__PURE__ */ Ja.getTime() + (/* @__PURE__ */ mc.getTimezoneOffset() - /* @__PURE__ */ Ja.getTimezoneOffset()) * 6e4, du = /* @__PURE__ */ mc.getTimezoneOffset();
function xc(e) {
  var t = /* @__PURE__ */ new Date();
  return t.setTime(e * 24 * 60 * 60 * 1e3 + S1), t.getTimezoneOffset() !== du && t.setTime(t.getTime() + (t.getTimezoneOffset() - du) * 6e4), t;
}
var vu = /* @__PURE__ */ new Date("2017-02-19T19:06:09.000Z"), _c = /* @__PURE__ */ isNaN(/* @__PURE__ */ vu.getFullYear()) ? /* @__PURE__ */ new Date("2/19/17") : vu, A1 = /* @__PURE__ */ _c.getFullYear() == 2017;
function Mt(e, t) {
  var n = new Date(e);
  if (A1)
    return t > 0 ? n.setTime(n.getTime() + n.getTimezoneOffset() * 60 * 1e3) : t < 0 && n.setTime(n.getTime() - n.getTimezoneOffset() * 60 * 1e3), n;
  if (e instanceof Date) return e;
  if (_c.getFullYear() == 1917 && !isNaN(n.getFullYear())) {
    var r = n.getFullYear();
    return e.indexOf("" + r) > -1 || n.setFullYear(n.getFullYear() + 100), n;
  }
  var i = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"], a = new Date(+i[0], +i[1] - 1, +i[2], +i[3] || 0, +i[4] || 0, +i[5] || 0);
  return e.indexOf("Z") > -1 && (a = new Date(a.getTime() - a.getTimezoneOffset() * 60 * 1e3)), a;
}
function Oo(e, t) {
  if (Xe && Buffer.isBuffer(e))
    return e.toString("binary");
  if (typeof TextDecoder < "u") try {
    var n = {
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
    return Array.isArray(e) && (e = new Uint8Array(e)), new TextDecoder("latin1").decode(e).replace(/[€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ]/g, function(a) {
      return n[a] || a;
    });
  } catch {
  }
  for (var r = [], i = 0; i != e.length; ++i) r.push(String.fromCharCode(e[i]));
  return r.join("");
}
function zt(e) {
  if (typeof JSON < "u" && !Array.isArray(e)) return JSON.parse(JSON.stringify(e));
  if (typeof e != "object" || e == null) return e;
  if (e instanceof Date) return new Date(e.getTime());
  var t = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = zt(e[n]));
  return t;
}
function ut(e, t) {
  for (var n = ""; n.length < t; ) n += e;
  return n;
}
function Bn(e) {
  var t = Number(e);
  if (!isNaN(t)) return isFinite(t) ? t : NaN;
  if (!/\d/.test(e)) return t;
  var n = 1, r = e.replace(/([\d]),([\d])/g, "$1$2").replace(/[$]/g, "").replace(/[%]/g, function() {
    return n *= 100, "";
  });
  return !isNaN(t = Number(r)) || (r = r.replace(/[(](.*)[)]/, function(i, a) {
    return n = -n, a;
  }), !isNaN(t = Number(r))) ? t / n : t;
}
var C1 = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
function Pi(e) {
  var t = new Date(e), n = /* @__PURE__ */ new Date(NaN), r = t.getYear(), i = t.getMonth(), a = t.getDate();
  if (isNaN(a)) return n;
  var o = e.toLowerCase();
  if (o.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
    if (o = o.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, ""), o.length > 3 && C1.indexOf(o) == -1) return n;
  } else if (o.match(/[a-z]/)) return n;
  return r < 0 || r > 8099 ? n : (i > 0 || a > 1) && r != 101 ? t : e.match(/[^-0-9:,\/\\]/) ? n : t;
}
function He(e, t, n) {
  if (e.FullPaths) {
    if (typeof n == "string") {
      var r;
      return Xe ? r = Gn(n) : r = Zd(n), et.utils.cfb_add(e, t, r);
    }
    et.utils.cfb_add(e, t, n);
  } else e.file(t, n);
}
function tl() {
  return et.utils.cfb_new();
}
var gt = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`, N1 = {
  "&quot;": '"',
  "&apos;": "'",
  "&gt;": ">",
  "&lt;": "<",
  "&amp;": "&"
}, nl = /* @__PURE__ */ el(N1), rl = /[&<>'"]/g, F1 = /[\u0000-\u0008\u000b-\u001f]/g;
function Je(e) {
  var t = e + "";
  return t.replace(rl, function(n) {
    return nl[n];
  }).replace(F1, function(n) {
    return "_x" + ("000" + n.charCodeAt(0).toString(16)).slice(-4) + "_";
  });
}
function pu(e) {
  return Je(e).replace(/ /g, "_x0020_");
}
var wc = /[\u0000-\u001f]/g;
function k1(e) {
  var t = e + "";
  return t.replace(rl, function(n) {
    return nl[n];
  }).replace(/\n/g, "<br/>").replace(wc, function(n) {
    return "&#x" + ("000" + n.charCodeAt(0).toString(16)).slice(-4) + ";";
  });
}
function I1(e) {
  var t = e + "";
  return t.replace(rl, function(n) {
    return nl[n];
  }).replace(wc, function(n) {
    return "&#x" + n.charCodeAt(0).toString(16).toUpperCase() + ";";
  });
}
function O1(e) {
  return e.replace(/(\r\n|[\r\n])/g, "&#10;");
}
function D1(e) {
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
function es(e) {
  for (var t = "", n = 0, r = 0, i = 0, a = 0, o = 0, s = 0; n < e.length; ) {
    if (r = e.charCodeAt(n++), r < 128) {
      t += String.fromCharCode(r);
      continue;
    }
    if (i = e.charCodeAt(n++), r > 191 && r < 224) {
      o = (r & 31) << 6, o |= i & 63, t += String.fromCharCode(o);
      continue;
    }
    if (a = e.charCodeAt(n++), r < 240) {
      t += String.fromCharCode((r & 15) << 12 | (i & 63) << 6 | a & 63);
      continue;
    }
    o = e.charCodeAt(n++), s = ((r & 7) << 18 | (i & 63) << 12 | (a & 63) << 6 | o & 63) - 65536, t += String.fromCharCode(55296 + (s >>> 10 & 1023)), t += String.fromCharCode(56320 + (s & 1023));
  }
  return t;
}
function gu(e) {
  var t = yr(2 * e.length), n, r, i = 1, a = 0, o = 0, s;
  for (r = 0; r < e.length; r += i)
    i = 1, (s = e.charCodeAt(r)) < 128 ? n = s : s < 224 ? (n = (s & 31) * 64 + (e.charCodeAt(r + 1) & 63), i = 2) : s < 240 ? (n = (s & 15) * 4096 + (e.charCodeAt(r + 1) & 63) * 64 + (e.charCodeAt(r + 2) & 63), i = 3) : (i = 4, n = (s & 7) * 262144 + (e.charCodeAt(r + 1) & 63) * 4096 + (e.charCodeAt(r + 2) & 63) * 64 + (e.charCodeAt(r + 3) & 63), n -= 65536, o = 55296 + (n >>> 10 & 1023), n = 56320 + (n & 1023)), o !== 0 && (t[a++] = o & 255, t[a++] = o >>> 8, o = 0), t[a++] = n % 256, t[a++] = n >>> 8;
  return t.slice(0, a).toString("ucs2");
}
function mu(e) {
  return Gn(e, "binary").toString("utf8");
}
var ga = "foo bar bazâð£", Ci = Xe && (/* @__PURE__ */ mu(ga) == /* @__PURE__ */ es(ga) && mu || /* @__PURE__ */ gu(ga) == /* @__PURE__ */ es(ga) && gu) || es, Li = Xe ? function(e) {
  return Gn(e, "utf8").toString("binary");
} : function(e) {
  for (var t = [], n = 0, r = 0, i = 0; n < e.length; )
    switch (r = e.charCodeAt(n++), !0) {
      case r < 128:
        t.push(String.fromCharCode(r));
        break;
      case r < 2048:
        t.push(String.fromCharCode(192 + (r >> 6))), t.push(String.fromCharCode(128 + (r & 63)));
        break;
      case (r >= 55296 && r < 57344):
        r -= 55296, i = e.charCodeAt(n++) - 56320 + (r << 10), t.push(String.fromCharCode(240 + (i >> 18 & 7))), t.push(String.fromCharCode(144 + (i >> 12 & 63))), t.push(String.fromCharCode(128 + (i >> 6 & 63))), t.push(String.fromCharCode(128 + (i & 63)));
        break;
      default:
        t.push(String.fromCharCode(224 + (r >> 12))), t.push(String.fromCharCode(128 + (r >> 6 & 63))), t.push(String.fromCharCode(128 + (r & 63)));
    }
  return t.join("");
}, b1 = /* @__PURE__ */ function() {
  var e = [
    ["nbsp", " "],
    ["middot", "·"],
    ["quot", '"'],
    ["apos", "'"],
    ["gt", ">"],
    ["lt", "<"],
    ["amp", "&"]
  ].map(function(t) {
    return [new RegExp("&" + t[0] + ";", "ig"), t[1]];
  });
  return function(n) {
    for (var r = n.replace(/^[\t\n\r ]+/, "").replace(/[\t\n\r ]+$/, "").replace(/>\s+/g, ">").replace(/\s+</g, "<").replace(/[\t\n\r ]+/g, " ").replace(/<\s*[bB][rR]\s*\/?>/g, `
`).replace(/<[^>]*>/g, ""), i = 0; i < e.length; ++i) r = r.replace(e[i][0], e[i][1]);
    return r;
  };
}(), yc = /(^\s|\s$|\n)/;
function Ct(e, t) {
  return "<" + e + (t.match(yc) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e + ">";
}
function Bi(e) {
  return Ft(e).map(function(t) {
    return " " + t + '="' + e[t] + '"';
  }).join("");
}
function Te(e, t, n) {
  return "<" + e + (n != null ? Bi(n) : "") + (t != null ? (t.match(yc) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e : "/") + ">";
}
function Ts(e, t) {
  try {
    return e.toISOString().replace(/\.\d*/, "");
  } catch (n) {
    if (t) throw n;
  }
  return "";
}
function M1(e, t) {
  switch (typeof e) {
    case "string":
      var n = Te("vt:lpwstr", Je(e));
      return n = n.replace(/&quot;/g, "_x0022_"), n;
    case "number":
      return Te((e | 0) == e ? "vt:i4" : "vt:r8", Je(String(e)));
    case "boolean":
      return Te("vt:bool", e ? "true" : "false");
  }
  if (e instanceof Date) return Te("vt:filetime", Ts(e));
  throw new Error("Unable to serialize " + e);
}
var wt = {
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
}, si = [
  "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  "http://purl.oclc.org/ooxml/spreadsheetml/main",
  "http://schemas.microsoft.com/office/excel/2006/main",
  "http://schemas.microsoft.com/office/excel/2006/2"
], Gt = {
  o: "urn:schemas-microsoft-com:office:office",
  x: "urn:schemas-microsoft-com:office:excel",
  ss: "urn:schemas-microsoft-com:office:spreadsheet",
  dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
  mv: "http://macVmlSchemaUri",
  v: "urn:schemas-microsoft-com:vml",
  html: "http://www.w3.org/TR/REC-html40"
};
function R1(e, t) {
  for (var n = 1 - 2 * (e[t + 7] >>> 7), r = ((e[t + 7] & 127) << 4) + (e[t + 6] >>> 4 & 15), i = e[t + 6] & 15, a = 5; a >= 0; --a) i = i * 256 + e[t + a];
  return r == 2047 ? i == 0 ? n * (1 / 0) : NaN : (r == 0 ? r = -1022 : (r -= 1023, i += Math.pow(2, 52)), n * Math.pow(2, r - 52) * i);
}
function P1(e, t, n) {
  var r = (t < 0 || 1 / t == -1 / 0 ? 1 : 0) << 7, i = 0, a = 0, o = r ? -t : t;
  isFinite(o) ? o == 0 ? i = a = 0 : (i = Math.floor(Math.log(o) / Math.LN2), a = o * Math.pow(2, 52 - i), i <= -1023 && (!isFinite(a) || a < Math.pow(2, 52)) ? i = -1022 : (a -= Math.pow(2, 52), i += 1023)) : (i = 2047, a = isNaN(t) ? 26985 : 0);
  for (var s = 0; s <= 5; ++s, a /= 256) e[n + s] = a & 255;
  e[n + 6] = (i & 15) << 4 | a & 15, e[n + 7] = i >> 4 | r;
}
var xu = function(e) {
  for (var t = [], n = 10240, r = 0; r < e[0].length; ++r) if (e[0][r]) for (var i = 0, a = e[0][r].length; i < a; i += n) t.push.apply(t, e[0][r].slice(i, i + n));
  return t;
}, _u = Xe ? function(e) {
  return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0].map(function(t) {
    return Buffer.isBuffer(t) ? t : Gn(t);
  })) : xu(e);
} : xu, wu = function(e, t, n) {
  for (var r = [], i = t; i < n; i += 2) r.push(String.fromCharCode(_i(e, i)));
  return r.join("").replace(Ai, "");
}, il = Xe ? function(e, t, n) {
  return Buffer.isBuffer(e) ? e.toString("utf16le", t, n).replace(Ai, "") : wu(e, t, n);
} : wu, yu = function(e, t, n) {
  for (var r = [], i = t; i < t + n; ++i) r.push(("0" + e[i].toString(16)).slice(-2));
  return r.join("");
}, Ec = Xe ? function(e, t, n) {
  return Buffer.isBuffer(e) ? e.toString("hex", t, t + n) : yu(e, t, n);
} : yu, Eu = function(e, t, n) {
  for (var r = [], i = t; i < n; i++) r.push(String.fromCharCode(Vr(e, i)));
  return r.join("");
}, na = Xe ? function(t, n, r) {
  return Buffer.isBuffer(t) ? t.toString("utf8", n, r) : Eu(t, n, r);
} : Eu, Tc = function(e, t) {
  var n = Xt(e, t);
  return n > 0 ? na(e, t + 4, t + 4 + n - 1) : "";
}, Sc = Tc, Ac = function(e, t) {
  var n = Xt(e, t);
  return n > 0 ? na(e, t + 4, t + 4 + n - 1) : "";
}, Cc = Ac, Nc = function(e, t) {
  var n = 2 * Xt(e, t);
  return n > 0 ? na(e, t + 4, t + 4 + n - 1) : "";
}, Fc = Nc, kc = function(t, n) {
  var r = Xt(t, n);
  return r > 0 ? il(t, n + 4, n + 4 + r) : "";
}, Ic = kc, Oc = function(e, t) {
  var n = Xt(e, t);
  return n > 0 ? na(e, t + 4, t + 4 + n) : "";
}, Dc = Oc, bc = function(e, t) {
  return R1(e, t);
}, Qa = bc, al = function(t) {
  return Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
};
Xe && (Sc = function(t, n) {
  if (!Buffer.isBuffer(t)) return Tc(t, n);
  var r = t.readUInt32LE(n);
  return r > 0 ? t.toString("utf8", n + 4, n + 4 + r - 1) : "";
}, Cc = function(t, n) {
  if (!Buffer.isBuffer(t)) return Ac(t, n);
  var r = t.readUInt32LE(n);
  return r > 0 ? t.toString("utf8", n + 4, n + 4 + r - 1) : "";
}, Fc = function(t, n) {
  if (!Buffer.isBuffer(t)) return Nc(t, n);
  var r = 2 * t.readUInt32LE(n);
  return t.toString("utf16le", n + 4, n + 4 + r - 1);
}, Ic = function(t, n) {
  if (!Buffer.isBuffer(t)) return kc(t, n);
  var r = t.readUInt32LE(n);
  return t.toString("utf16le", n + 4, n + 4 + r);
}, Dc = function(t, n) {
  if (!Buffer.isBuffer(t)) return Oc(t, n);
  var r = t.readUInt32LE(n);
  return t.toString("utf8", n + 4, n + 4 + r);
}, Qa = function(t, n) {
  return Buffer.isBuffer(t) ? t.readDoubleLE(n) : bc(t, n);
}, al = function(t) {
  return Buffer.isBuffer(t) || Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
});
var Vr = function(e, t) {
  return e[t];
}, _i = function(e, t) {
  return e[t + 1] * 256 + e[t];
}, L1 = function(e, t) {
  var n = e[t + 1] * 256 + e[t];
  return n < 32768 ? n : (65535 - n + 1) * -1;
}, Xt = function(e, t) {
  return e[t + 3] * (1 << 24) + (e[t + 2] << 16) + (e[t + 1] << 8) + e[t];
}, cr = function(e, t) {
  return e[t + 3] << 24 | e[t + 2] << 16 | e[t + 1] << 8 | e[t];
}, B1 = function(e, t) {
  return e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3];
};
function Ni(e, t) {
  var n = "", r, i, a = [], o, s, u, l;
  switch (t) {
    case "dbcs":
      if (l = this.l, Xe && Buffer.isBuffer(this)) n = this.slice(this.l, this.l + 2 * e).toString("utf16le");
      else for (u = 0; u < e; ++u)
        n += String.fromCharCode(_i(this, l)), l += 2;
      e *= 2;
      break;
    case "utf8":
      n = na(this, this.l, this.l + e);
      break;
    case "utf16le":
      e *= 2, n = il(this, this.l, this.l + e);
      break;
    case "wstr":
      return Ni.call(this, e, "dbcs");
    case "lpstr-ansi":
      n = Sc(this, this.l), e = 4 + Xt(this, this.l);
      break;
    case "lpstr-cp":
      n = Cc(this, this.l), e = 4 + Xt(this, this.l);
      break;
    case "lpwstr":
      n = Fc(this, this.l), e = 4 + 2 * Xt(this, this.l);
      break;
    case "lpp4":
      e = 4 + Xt(this, this.l), n = Ic(this, this.l), e & 2 && (e += 2);
      break;
    case "8lpp4":
      e = 4 + Xt(this, this.l), n = Dc(this, this.l), e & 3 && (e += 4 - (e & 3));
      break;
    case "cstr":
      for (e = 0, n = ""; (o = Vr(this, this.l + e++)) !== 0; ) a.push(da(o));
      n = a.join("");
      break;
    case "_wstr":
      for (e = 0, n = ""; (o = _i(this, this.l + e)) !== 0; )
        a.push(da(o)), e += 2;
      e += 2, n = a.join("");
      break;
    case "dbcs-cont":
      for (n = "", l = this.l, u = 0; u < e; ++u) {
        if (this.lens && this.lens.indexOf(l) !== -1)
          return o = Vr(this, l), this.l = l + 1, s = Ni.call(this, e - u, o ? "dbcs-cont" : "sbcs-cont"), a.join("") + s;
        a.push(da(_i(this, l))), l += 2;
      }
      n = a.join(""), e *= 2;
      break;
    case "cpstr":
    case "sbcs-cont":
      for (n = "", l = this.l, u = 0; u != e; ++u) {
        if (this.lens && this.lens.indexOf(l) !== -1)
          return o = Vr(this, l), this.l = l + 1, s = Ni.call(this, e - u, o ? "dbcs-cont" : "sbcs-cont"), a.join("") + s;
        a.push(da(Vr(this, l))), l += 1;
      }
      n = a.join("");
      break;
    default:
      switch (e) {
        case 1:
          return r = Vr(this, this.l), this.l++, r;
        case 2:
          return r = (t === "i" ? L1 : _i)(this, this.l), this.l += 2, r;
        case 4:
        case -4:
          return t === "i" || !(this[this.l + 3] & 128) ? (r = (e > 0 ? cr : B1)(this, this.l), this.l += 4, r) : (i = Xt(this, this.l), this.l += 4, i);
        case 8:
        case -8:
          if (t === "f")
            return e == 8 ? i = Qa(this, this.l) : i = Qa([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0), this.l += 8, i;
          e = 8;
        case 16:
          n = Ec(this, this.l, e);
          break;
      }
  }
  return this.l += e, n;
}
var $1 = function(e, t, n) {
  e[n] = t & 255, e[n + 1] = t >>> 8 & 255, e[n + 2] = t >>> 16 & 255, e[n + 3] = t >>> 24 & 255;
}, U1 = function(e, t, n) {
  e[n] = t & 255, e[n + 1] = t >> 8 & 255, e[n + 2] = t >> 16 & 255, e[n + 3] = t >> 24 & 255;
}, z1 = function(e, t, n) {
  e[n] = t & 255, e[n + 1] = t >>> 8 & 255;
};
function H1(e, t, n) {
  var r = 0, i = 0;
  if (n === "dbcs") {
    for (i = 0; i != t.length; ++i) z1(this, t.charCodeAt(i), this.l + 2 * i);
    r = 2 * t.length;
  } else if (n === "sbcs") {
    for (t = t.replace(/[^\x00-\x7F]/g, "_"), i = 0; i != t.length; ++i) this[this.l + i] = t.charCodeAt(i) & 255;
    r = t.length;
  } else if (n === "hex") {
    for (; i < e; ++i)
      this[this.l++] = parseInt(t.slice(2 * i, 2 * i + 2), 16) || 0;
    return this;
  } else if (n === "utf16le") {
    var a = Math.min(this.l + e, this.length);
    for (i = 0; i < Math.min(t.length, e); ++i) {
      var o = t.charCodeAt(i);
      this[this.l++] = o & 255, this[this.l++] = o >> 8;
    }
    for (; this.l < a; ) this[this.l++] = 0;
    return this;
  } else switch (e) {
    case 1:
      r = 1, this[this.l] = t & 255;
      break;
    case 2:
      r = 2, this[this.l] = t & 255, t >>>= 8, this[this.l + 1] = t & 255;
      break;
    case 3:
      r = 3, this[this.l] = t & 255, t >>>= 8, this[this.l + 1] = t & 255, t >>>= 8, this[this.l + 2] = t & 255;
      break;
    case 4:
      r = 4, $1(this, t, this.l);
      break;
    case 8:
      if (r = 8, n === "f") {
        P1(this, t, this.l);
        break;
      }
    case 16:
      break;
    case -4:
      r = 4, U1(this, t, this.l);
      break;
  }
  return this.l += r, this;
}
function Mc(e, t) {
  var n = Ec(this, this.l, e.length >> 1);
  if (n !== e) throw new Error(t + "Expected " + e + " saw " + n);
  this.l += e.length >> 1;
}
function Wt(e, t) {
  e.l = t, e.read_shift = /*::(*/
  Ni, e.chk = Mc, e.write_shift = H1;
}
function An(e, t) {
  e.l += t;
}
function ce(e) {
  var t = yr(e);
  return Wt(t, 0), t;
}
function $t() {
  var e = [], t = Xe ? 256 : 2048, n = function(l) {
    var c = ce(l);
    return Wt(c, 0), c;
  }, r = n(t), i = function() {
    r && (r.length > r.l && (r = r.slice(0, r.l), r.l = r.length), r.length > 0 && e.push(r), r = null);
  }, a = function(l) {
    return r && l < r.length - r.l ? r : (i(), r = n(Math.max(l + 1, t)));
  }, o = function() {
    return i(), At(e);
  }, s = function(l) {
    i(), r = l, r.l == null && (r.l = r.length), a(t);
  };
  return { next: a, push: s, end: o, _bufs: e };
}
function ge(e, t, n, r) {
  var i = +t, a;
  if (!isNaN(i)) {
    r || (r = R_[i].p || (n || []).length || 0), a = 1 + (i >= 128 ? 1 : 0) + 1, r >= 128 && ++a, r >= 16384 && ++a, r >= 2097152 && ++a;
    var o = e.next(a);
    i <= 127 ? o.write_shift(1, i) : (o.write_shift(1, (i & 127) + 128), o.write_shift(1, i >> 7));
    for (var s = 0; s != 4; ++s)
      if (r >= 128)
        o.write_shift(1, (r & 127) + 128), r >>= 7;
      else {
        o.write_shift(1, r);
        break;
      }
    /*:: length != null &&*/
    r > 0 && al(n) && e.push(n);
  }
}
function Fi(e, t, n) {
  var r = zt(e);
  if (t.s ? (r.cRel && (r.c += t.s.c), r.rRel && (r.r += t.s.r)) : (r.cRel && (r.c += t.c), r.rRel && (r.r += t.r)), !n || n.biff < 12) {
    for (; r.c >= 256; ) r.c -= 256;
    for (; r.r >= 65536; ) r.r -= 65536;
  }
  return r;
}
function Tu(e, t, n) {
  var r = zt(e);
  return r.s = Fi(r.s, t.s, n), r.e = Fi(r.e, t.s, n), r;
}
function ki(e, t) {
  if (e.cRel && e.c < 0)
    for (e = zt(e); e.c < 0; ) e.c += t > 8 ? 16384 : 256;
  if (e.rRel && e.r < 0)
    for (e = zt(e); e.r < 0; ) e.r += t > 8 ? 1048576 : t > 5 ? 65536 : 16384;
  var n = Qe(e);
  return !e.cRel && e.cRel != null && (n = G1(n)), !e.rRel && e.rRel != null && (n = V1(n)), n;
}
function ts(e, t) {
  return e.s.r == 0 && !e.s.rRel && e.e.r == (t.biff >= 12 ? 1048575 : t.biff >= 8 ? 65536 : 16384) && !e.e.rRel ? (e.s.cRel ? "" : "$") + It(e.s.c) + ":" + (e.e.cRel ? "" : "$") + It(e.e.c) : e.s.c == 0 && !e.s.cRel && e.e.c == (t.biff >= 12 ? 16383 : 255) && !e.e.cRel ? (e.s.rRel ? "" : "$") + Nt(e.s.r) + ":" + (e.e.rRel ? "" : "$") + Nt(e.e.r) : ki(e.s, t.biff) + ":" + ki(e.e, t.biff);
}
function ol(e) {
  return parseInt(W1(e), 10) - 1;
}
function Nt(e) {
  return "" + (e + 1);
}
function V1(e) {
  return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2");
}
function W1(e) {
  return e.replace(/\$(\d+)$/, "$1");
}
function sl(e) {
  for (var t = X1(e), n = 0, r = 0; r !== t.length; ++r) n = 26 * n + t.charCodeAt(r) - 64;
  return n - 1;
}
function It(e) {
  if (e < 0) throw new Error("invalid column " + e);
  var t = "";
  for (++e; e; e = Math.floor((e - 1) / 26)) t = String.fromCharCode((e - 1) % 26 + 65) + t;
  return t;
}
function G1(e) {
  return e.replace(/^([A-Z])/, "$$$1");
}
function X1(e) {
  return e.replace(/^\$([A-Z])/, "$1");
}
function Y1(e) {
  return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",");
}
function yt(e) {
  for (var t = 0, n = 0, r = 0; r < e.length; ++r) {
    var i = e.charCodeAt(r);
    i >= 48 && i <= 57 ? t = 10 * t + (i - 48) : i >= 65 && i <= 90 && (n = 26 * n + (i - 64));
  }
  return { c: n - 1, r: t - 1 };
}
function Qe(e) {
  for (var t = e.c + 1, n = ""; t; t = (t - 1) / 26 | 0) n = String.fromCharCode((t - 1) % 26 + 65) + n;
  return n + (e.r + 1);
}
function Kt(e) {
  var t = e.indexOf(":");
  return t == -1 ? { s: yt(e), e: yt(e) } : { s: yt(e.slice(0, t)), e: yt(e.slice(t + 1)) };
}
function pt(e, t) {
  return typeof t > "u" || typeof t == "number" ? pt(e.s, e.e) : (typeof e != "string" && (e = Qe(e)), typeof t != "string" && (t = Qe(t)), e == t ? e : e + ":" + t);
}
function rt(e) {
  var t = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } }, n = 0, r = 0, i = 0, a = e.length;
  for (n = 0; r < a && !((i = e.charCodeAt(r) - 64) < 1 || i > 26); ++r)
    n = 26 * n + i;
  for (t.s.c = --n, n = 0; r < a && !((i = e.charCodeAt(r) - 48) < 0 || i > 9); ++r)
    n = 10 * n + i;
  if (t.s.r = --n, r === a || i != 10)
    return t.e.c = t.s.c, t.e.r = t.s.r, t;
  for (++r, n = 0; r != a && !((i = e.charCodeAt(r) - 64) < 1 || i > 26); ++r)
    n = 26 * n + i;
  for (t.e.c = --n, n = 0; r != a && !((i = e.charCodeAt(r) - 48) < 0 || i > 9); ++r)
    n = 10 * n + i;
  return t.e.r = --n, t;
}
function Su(e, t) {
  var n = e.t == "d" && t instanceof Date;
  if (e.z != null) try {
    return e.w = nr(e.z, n ? Ut(t) : t);
  } catch {
  }
  try {
    return e.w = nr((e.XF || {}).numFmtId || (n ? 14 : 0), n ? Ut(t) : t);
  } catch {
    return "" + t;
  }
}
function zn(e, t, n) {
  return e == null || e.t == null || e.t == "z" ? "" : e.w !== void 0 ? e.w : (e.t == "d" && !e.z && n && n.dateNF && (e.z = n.dateNF), e.t == "e" ? ra[e.v] || e.v : t == null ? Su(e, e.v) : Su(e, t));
}
function kr(e, t) {
  var n = t && t.sheet ? t.sheet : "Sheet1", r = {};
  return r[n] = e, { SheetNames: [n], Sheets: r };
}
function Rc(e, t, n) {
  var r = n || {}, i = e ? Array.isArray(e) : r.dense, a = e || (i ? [] : {}), o = 0, s = 0;
  if (a && r.origin != null) {
    if (typeof r.origin == "number") o = r.origin;
    else {
      var u = typeof r.origin == "string" ? yt(r.origin) : r.origin;
      o = u.r, s = u.c;
    }
    a["!ref"] || (a["!ref"] = "A1:A1");
  }
  var l = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } };
  if (a["!ref"]) {
    var c = rt(a["!ref"]);
    l.s.c = c.s.c, l.s.r = c.s.r, l.e.c = Math.max(l.e.c, c.e.c), l.e.r = Math.max(l.e.r, c.e.r), o == -1 && (l.e.r = o = c.e.r + 1);
  }
  for (var f = 0; f != t.length; ++f)
    if (t[f]) {
      if (!Array.isArray(t[f])) throw new Error("aoa_to_sheet expects an array of arrays");
      for (var h = 0; h != t[f].length; ++h)
        if (!(typeof t[f][h] > "u")) {
          var d = { v: t[f][h] }, p = o + f, v = s + h;
          if (l.s.r > p && (l.s.r = p), l.s.c > v && (l.s.c = v), l.e.r < p && (l.e.r = p), l.e.c < v && (l.e.c = v), t[f][h] && typeof t[f][h] == "object" && !Array.isArray(t[f][h]) && !(t[f][h] instanceof Date)) d = t[f][h];
          else if (Array.isArray(d.v) && (d.f = t[f][h][1], d.v = d.v[0]), d.v === null)
            if (d.f) d.t = "n";
            else if (r.nullError)
              d.t = "e", d.v = 0;
            else if (r.sheetStubs) d.t = "z";
            else continue;
          else typeof d.v == "number" ? d.t = "n" : typeof d.v == "boolean" ? d.t = "b" : d.v instanceof Date ? (d.z = r.dateNF || ft[14], r.cellDates ? (d.t = "d", d.w = nr(d.z, Ut(d.v))) : (d.t = "n", d.v = Ut(d.v), d.w = nr(d.z, d.v))) : d.t = "s";
          if (i)
            a[p] || (a[p] = []), a[p][v] && a[p][v].z && (d.z = a[p][v].z), a[p][v] = d;
          else {
            var g = Qe({ c: v, r: p });
            a[g] && a[g].z && (d.z = a[g].z), a[g] = d;
          }
        }
    }
  return l.s.c < 1e7 && (a["!ref"] = pt(l)), a;
}
function li(e, t) {
  return Rc(null, e, t);
}
function K1(e) {
  return e.read_shift(4, "i");
}
function un(e, t) {
  return t || (t = ce(4)), t.write_shift(4, e), t;
}
function Ot(e) {
  var t = e.read_shift(4);
  return t === 0 ? "" : e.read_shift(t, "dbcs");
}
function Et(e, t) {
  var n = !1;
  return t == null && (n = !0, t = ce(4 + 2 * e.length)), t.write_shift(4, e.length), e.length > 0 && t.write_shift(0, e, "dbcs"), n ? t.slice(0, t.l) : t;
}
function Z1(e) {
  return { ich: e.read_shift(2), ifnt: e.read_shift(2) };
}
function q1(e, t) {
  return t || (t = ce(4)), t.write_shift(2, 0), t.write_shift(2, 0), t;
}
function ll(e, t) {
  var n = e.l, r = e.read_shift(1), i = Ot(e), a = [], o = { t: i, h: i };
  if (r & 1) {
    for (var s = e.read_shift(4), u = 0; u != s; ++u) a.push(Z1(e));
    o.r = a;
  } else o.r = [{ ich: 0, ifnt: 0 }];
  return e.l = n + t, o;
}
function j1(e, t) {
  var n = !1;
  return t == null && (n = !0, t = ce(15 + 4 * e.t.length)), t.write_shift(1, 0), Et(e.t, t), n ? t.slice(0, t.l) : t;
}
var J1 = ll;
function Q1(e, t) {
  var n = !1;
  return t == null && (n = !0, t = ce(23 + 4 * e.t.length)), t.write_shift(1, 1), Et(e.t, t), t.write_shift(4, 1), q1({}, t), n ? t.slice(0, t.l) : t;
}
function en(e) {
  var t = e.read_shift(4), n = e.read_shift(2);
  return n += e.read_shift(1) << 16, e.l++, { c: t, iStyleRef: n };
}
function Ir(e, t) {
  return t == null && (t = ce(8)), t.write_shift(-4, e.c), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
function Or(e) {
  var t = e.read_shift(2);
  return t += e.read_shift(1) << 16, e.l++, { c: -1, iStyleRef: t };
}
function Dr(e, t) {
  return t == null && (t = ce(4)), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
var ev = Ot, Pc = Et;
function ul(e) {
  var t = e.read_shift(4);
  return t === 0 || t === 4294967295 ? "" : e.read_shift(t, "dbcs");
}
function eo(e, t) {
  var n = !1;
  return t == null && (n = !0, t = ce(127)), t.write_shift(4, e.length > 0 ? e.length : 4294967295), e.length > 0 && t.write_shift(0, e, "dbcs"), n ? t.slice(0, t.l) : t;
}
var tv = Ot, Ss = ul, cl = eo;
function Lc(e) {
  var t = e.slice(e.l, e.l + 4), n = t[0] & 1, r = t[0] & 2;
  e.l += 4;
  var i = r === 0 ? Qa([0, 0, 0, 0, t[0] & 252, t[1], t[2], t[3]], 0) : cr(t, 0) >> 2;
  return n ? i / 100 : i;
}
function Bc(e, t) {
  t == null && (t = ce(4));
  var n = 0, r = 0, i = e * 100;
  if (e == (e | 0) && e >= -536870912 && e < 1 << 29 ? r = 1 : i == (i | 0) && i >= -536870912 && i < 1 << 29 && (r = 1, n = 1), r) t.write_shift(-4, ((n ? i : e) << 2) + (n + 2));
  else throw new Error("unsupported RkNumber " + e);
}
function $c(e) {
  var t = { s: {}, e: {} };
  return t.s.r = e.read_shift(4), t.e.r = e.read_shift(4), t.s.c = e.read_shift(4), t.e.c = e.read_shift(4), t;
}
function nv(e, t) {
  return t || (t = ce(16)), t.write_shift(4, e.s.r), t.write_shift(4, e.e.r), t.write_shift(4, e.s.c), t.write_shift(4, e.e.c), t;
}
var br = $c, ui = nv;
function ci(e) {
  if (e.length - e.l < 8) throw "XLS Xnum Buffer underflow";
  return e.read_shift(8, "f");
}
function Er(e, t) {
  return (t || ce(8)).write_shift(8, e, "f");
}
function rv(e) {
  var t = {}, n = e.read_shift(1), r = n >>> 1, i = e.read_shift(1), a = e.read_shift(2, "i"), o = e.read_shift(1), s = e.read_shift(1), u = e.read_shift(1);
  switch (e.l++, r) {
    case 0:
      t.auto = 1;
      break;
    case 1:
      t.index = i;
      var l = hv[i];
      l && (t.rgb = Ru(l));
      break;
    case 2:
      t.rgb = Ru([o, s, u]);
      break;
    case 3:
      t.theme = i;
      break;
  }
  return a != 0 && (t.tint = a > 0 ? a / 32767 : a / 32768), t;
}
function to(e, t) {
  if (t || (t = ce(8)), !e || e.auto)
    return t.write_shift(4, 0), t.write_shift(4, 0), t;
  e.index != null ? (t.write_shift(1, 2), t.write_shift(1, e.index)) : e.theme != null ? (t.write_shift(1, 6), t.write_shift(1, e.theme)) : (t.write_shift(1, 5), t.write_shift(1, 0));
  var n = e.tint || 0;
  if (n > 0 ? n *= 32767 : n < 0 && (n *= 32768), t.write_shift(2, n), !e.rgb || e.theme != null)
    t.write_shift(2, 0), t.write_shift(1, 0), t.write_shift(1, 0);
  else {
    var r = e.rgb || "FFFFFF";
    typeof r == "number" && (r = ("000000" + r.toString(16)).slice(-6)), t.write_shift(1, parseInt(r.slice(0, 2), 16)), t.write_shift(1, parseInt(r.slice(2, 4), 16)), t.write_shift(1, parseInt(r.slice(4, 6), 16)), t.write_shift(1, 255);
  }
  return t;
}
function iv(e) {
  var t = e.read_shift(1);
  e.l++;
  var n = {
    fBold: t & 1,
    fItalic: t & 2,
    fUnderline: t & 4,
    fStrikeout: t & 8,
    fOutline: t & 16,
    fShadow: t & 32,
    fCondense: t & 64,
    fExtend: t & 128
  };
  return n;
}
function av(e, t) {
  t || (t = ce(2));
  var n = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 : 0);
  return t.write_shift(1, n), t.write_shift(1, 0), t;
}
var Uc = 2, Vt = 3, ma = 11, no = 19, xa = 64, ov = 65, sv = 71, lv = 4108, uv = 4126, St = 80, Au = {
  /*::[*/
  1: { n: "CodePage", t: Uc },
  /*::[*/
  2: { n: "Category", t: St },
  /*::[*/
  3: { n: "PresentationFormat", t: St },
  /*::[*/
  4: { n: "ByteCount", t: Vt },
  /*::[*/
  5: { n: "LineCount", t: Vt },
  /*::[*/
  6: { n: "ParagraphCount", t: Vt },
  /*::[*/
  7: { n: "SlideCount", t: Vt },
  /*::[*/
  8: { n: "NoteCount", t: Vt },
  /*::[*/
  9: { n: "HiddenCount", t: Vt },
  /*::[*/
  10: { n: "MultimediaClipCount", t: Vt },
  /*::[*/
  11: { n: "ScaleCrop", t: ma },
  /*::[*/
  12: {
    n: "HeadingPairs",
    t: lv
    /* VT_VECTOR | VT_VARIANT */
  },
  /*::[*/
  13: {
    n: "TitlesOfParts",
    t: uv
    /* VT_VECTOR | VT_LPSTR */
  },
  /*::[*/
  14: { n: "Manager", t: St },
  /*::[*/
  15: { n: "Company", t: St },
  /*::[*/
  16: { n: "LinksUpToDate", t: ma },
  /*::[*/
  17: { n: "CharacterCount", t: Vt },
  /*::[*/
  19: { n: "SharedDoc", t: ma },
  /*::[*/
  22: { n: "HyperlinksChanged", t: ma },
  /*::[*/
  23: { n: "AppVersion", t: Vt, p: "version" },
  /*::[*/
  24: { n: "DigSig", t: ov },
  /*::[*/
  26: { n: "ContentType", t: St },
  /*::[*/
  27: { n: "ContentStatus", t: St },
  /*::[*/
  28: { n: "Language", t: St },
  /*::[*/
  29: { n: "Version", t: St },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: no },
  /*::[*/
  2147483651: { n: "Behavior", t: no },
  /*::[*/
  1919054434: {}
}, Cu = {
  /*::[*/
  1: { n: "CodePage", t: Uc },
  /*::[*/
  2: { n: "Title", t: St },
  /*::[*/
  3: { n: "Subject", t: St },
  /*::[*/
  4: { n: "Author", t: St },
  /*::[*/
  5: { n: "Keywords", t: St },
  /*::[*/
  6: { n: "Comments", t: St },
  /*::[*/
  7: { n: "Template", t: St },
  /*::[*/
  8: { n: "LastAuthor", t: St },
  /*::[*/
  9: { n: "RevNumber", t: St },
  /*::[*/
  10: { n: "EditTime", t: xa },
  /*::[*/
  11: { n: "LastPrinted", t: xa },
  /*::[*/
  12: { n: "CreatedDate", t: xa },
  /*::[*/
  13: { n: "ModifiedDate", t: xa },
  /*::[*/
  14: { n: "PageCount", t: Vt },
  /*::[*/
  15: { n: "WordCount", t: Vt },
  /*::[*/
  16: { n: "CharCount", t: Vt },
  /*::[*/
  17: { n: "Thumbnail", t: sv },
  /*::[*/
  18: { n: "Application", t: St },
  /*::[*/
  19: { n: "DocSecurity", t: Vt },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: no },
  /*::[*/
  2147483651: { n: "Behavior", t: no },
  /*::[*/
  1919054434: {}
};
function cv(e) {
  return e.map(function(t) {
    return [t >> 16 & 255, t >> 8 & 255, t & 255];
  });
}
var fv = /* @__PURE__ */ cv([
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
]), hv = /* @__PURE__ */ zt(fv), ra = {
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
}, dv = {
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
}, _a = {
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
function zc() {
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
function Hc(e, t) {
  var n = T1(dv), r = [], i;
  r[r.length] = gt, r[r.length] = Te("Types", null, {
    xmlns: wt.CT,
    "xmlns:xsd": wt.xsd,
    "xmlns:xsi": wt.xsi
  }), r = r.concat([
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
  ].map(function(u) {
    return Te("Default", null, { Extension: u[0], ContentType: u[1] });
  }));
  var a = function(u) {
    e[u] && e[u].length > 0 && (i = e[u][0], r[r.length] = Te("Override", null, {
      PartName: (i[0] == "/" ? "" : "/") + i,
      ContentType: _a[u][t.bookType] || _a[u].xlsx
    }));
  }, o = function(u) {
    (e[u] || []).forEach(function(l) {
      r[r.length] = Te("Override", null, {
        PartName: (l[0] == "/" ? "" : "/") + l,
        ContentType: _a[u][t.bookType] || _a[u].xlsx
      });
    });
  }, s = function(u) {
    (e[u] || []).forEach(function(l) {
      r[r.length] = Te("Override", null, {
        PartName: (l[0] == "/" ? "" : "/") + l,
        ContentType: n[u][0]
      });
    });
  };
  return a("workbooks"), o("sheets"), o("charts"), s("themes"), ["strs", "styles"].forEach(a), ["coreprops", "extprops", "custprops"].forEach(s), s("vba"), s("comments"), s("threadedcomments"), s("drawings"), o("metadata"), s("people"), r.length > 2 && (r[r.length] = "</Types>", r[1] = r[1].replace("/>", ">")), r.join("");
}
var Ge = {
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
function Vc(e) {
  var t = e.lastIndexOf("/");
  return e.slice(0, t + 1) + "_rels/" + e.slice(t + 1) + ".rels";
}
function Xr(e) {
  var t = [gt, Te("Relationships", null, {
    //'xmlns:ns0': XMLNS.RELS,
    xmlns: wt.RELS
  })];
  return Ft(e["!id"]).forEach(function(n) {
    t[t.length] = Te("Relationship", null, e["!id"][n]);
  }), t.length > 2 && (t[t.length] = "</Relationships>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function je(e, t, n, r, i, a) {
  if (i || (i = {}), e["!id"] || (e["!id"] = {}), e["!idx"] || (e["!idx"] = 1), t < 0) for (t = e["!idx"]; e["!id"]["rId" + t]; ++t)
    ;
  if (e["!idx"] = t + 1, i.Id = "rId" + t, i.Type = r, i.Target = n, [Ge.HLINK, Ge.XPATH, Ge.XMISS].indexOf(i.Type) > -1 && (i.TargetMode = "External"), e["!id"][i.Id]) throw new Error("Cannot rewrite rId " + t);
  return e["!id"][i.Id] = i, e[("/" + i.Target).replace("//", "/")] = i, t;
}
function vv(e) {
  var t = [gt];
  t.push(`<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
`), t.push(`  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
`);
  for (var n = 0; n < e.length; ++n) t.push('  <manifest:file-entry manifest:full-path="' + e[n][0] + '" manifest:media-type="' + e[n][1] + `"/>
`);
  return t.push("</manifest:manifest>"), t.join("");
}
function Nu(e, t, n) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (n || "odf") + "#" + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function pv(e, t) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function gv(e) {
  var t = [gt];
  t.push(`<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
`);
  for (var n = 0; n != e.length; ++n)
    t.push(Nu(e[n][0], e[n][1])), t.push(pv("", e[n][0]));
  return t.push(Nu("", "Document", "pkg")), t.push("</rdf:RDF>"), t.join("");
}
function Wc() {
  return '<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS ' + Ya.version + "</meta:generator></office:meta></office:document-meta>";
}
var gr = [
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
function ns(e, t, n, r, i) {
  i[e] != null || t == null || t === "" || (i[e] = t, t = Je(t), r[r.length] = n ? Te(e, t, n) : Ct(e, t));
}
function Gc(e, t) {
  var n = t || {}, r = [gt, Te("cp:coreProperties", null, {
    //'xmlns': XMLNS.CORE_PROPS,
    "xmlns:cp": wt.CORE_PROPS,
    "xmlns:dc": wt.dc,
    "xmlns:dcterms": wt.dcterms,
    "xmlns:dcmitype": wt.dcmitype,
    "xmlns:xsi": wt.xsi
  })], i = {};
  if (!e && !n.Props) return r.join("");
  e && (e.CreatedDate != null && ns("dcterms:created", typeof e.CreatedDate == "string" ? e.CreatedDate : Ts(e.CreatedDate, n.WTF), { "xsi:type": "dcterms:W3CDTF" }, r, i), e.ModifiedDate != null && ns("dcterms:modified", typeof e.ModifiedDate == "string" ? e.ModifiedDate : Ts(e.ModifiedDate, n.WTF), { "xsi:type": "dcterms:W3CDTF" }, r, i));
  for (var a = 0; a != gr.length; ++a) {
    var o = gr[a], s = n.Props && n.Props[o[1]] != null ? n.Props[o[1]] : e ? e[o[1]] : null;
    s === !0 ? s = "1" : s === !1 ? s = "0" : typeof s == "number" && (s = String(s)), s != null && ns(o[0], s, null, r, i);
  }
  return r.length > 2 && (r[r.length] = "</cp:coreProperties>", r[1] = r[1].replace("/>", ">")), r.join("");
}
var Yr = [
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
], Xc = [
  "Worksheets",
  "SheetNames",
  "NamedRanges",
  "DefinedNames",
  "Chartsheets",
  "ChartNames"
];
function Yc(e) {
  var t = [], n = Te;
  return e || (e = {}), e.Application = "SheetJS", t[t.length] = gt, t[t.length] = Te("Properties", null, {
    xmlns: wt.EXT_PROPS,
    "xmlns:vt": wt.vt
  }), Yr.forEach(function(r) {
    if (e[r[1]] !== void 0) {
      var i;
      switch (r[2]) {
        case "string":
          i = Je(String(e[r[1]]));
          break;
        case "bool":
          i = e[r[1]] ? "true" : "false";
          break;
      }
      i !== void 0 && (t[t.length] = n(r[0], i));
    }
  }), t[t.length] = n("HeadingPairs", n("vt:vector", n("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + n("vt:variant", n("vt:i4", String(e.Worksheets))), { size: 2, baseType: "variant" })), t[t.length] = n("TitlesOfParts", n("vt:vector", e.SheetNames.map(function(r) {
    return "<vt:lpstr>" + Je(r) + "</vt:lpstr>";
  }).join(""), { size: e.Worksheets, baseType: "lpstr" })), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function Kc(e) {
  var t = [gt, Te("Properties", null, {
    xmlns: wt.CUST_PROPS,
    "xmlns:vt": wt.vt
  })];
  if (!e) return t.join("");
  var n = 1;
  return Ft(e).forEach(function(i) {
    ++n, t[t.length] = Te("property", M1(e[i]), {
      fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: n,
      name: Je(i)
    });
  }), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
var Fu = {
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
function mv(e, t) {
  var n = [];
  return Ft(Fu).map(function(r) {
    for (var i = 0; i < gr.length; ++i) if (gr[i][1] == r) return gr[i];
    for (i = 0; i < Yr.length; ++i) if (Yr[i][1] == r) return Yr[i];
    throw r;
  }).forEach(function(r) {
    if (e[r[1]] != null) {
      var i = t && t.Props && t.Props[r[1]] != null ? t.Props[r[1]] : e[r[1]];
      switch (r[2]) {
        case "date":
          i = new Date(i).toISOString().replace(/\.\d*Z/, "Z");
          break;
      }
      typeof i == "number" ? i = String(i) : i === !0 || i === !1 ? i = i ? "1" : "0" : i instanceof Date && (i = new Date(i).toISOString().replace(/\.\d*Z/, "")), n.push(Ct(Fu[r[1]] || r[1], i));
    }
  }), Te("DocumentProperties", n.join(""), { xmlns: Gt.o });
}
function xv(e, t) {
  var n = ["Worksheets", "SheetNames"], r = "CustomDocumentProperties", i = [];
  return e && Ft(e).forEach(function(a) {
    if (Object.prototype.hasOwnProperty.call(e, a)) {
      for (var o = 0; o < gr.length; ++o) if (a == gr[o][1]) return;
      for (o = 0; o < Yr.length; ++o) if (a == Yr[o][1]) return;
      for (o = 0; o < n.length; ++o) if (a == n[o]) return;
      var s = e[a], u = "string";
      typeof s == "number" ? (u = "float", s = String(s)) : s === !0 || s === !1 ? (u = "boolean", s = s ? "1" : "0") : s = String(s), i.push(Te(pu(a), s, { "dt:dt": u }));
    }
  }), t && Ft(t).forEach(function(a) {
    if (Object.prototype.hasOwnProperty.call(t, a) && !(e && Object.prototype.hasOwnProperty.call(e, a))) {
      var o = t[a], s = "string";
      typeof o == "number" ? (s = "float", o = String(o)) : o === !0 || o === !1 ? (s = "boolean", o = o ? "1" : "0") : o instanceof Date ? (s = "dateTime.tz", o = o.toISOString()) : o = String(o), i.push(Te(pu(a), o, { "dt:dt": s }));
    }
  }), "<" + r + ' xmlns="' + Gt.o + '">' + i.join("") + "</" + r + ">";
}
function _v(e) {
  var t = typeof e == "string" ? new Date(Date.parse(e)) : e, n = t.getTime() / 1e3 + 11644473600, r = n % Math.pow(2, 32), i = (n - r) / Math.pow(2, 32);
  r *= 1e7, i *= 1e7;
  var a = r / Math.pow(2, 32) | 0;
  a > 0 && (r = r % Math.pow(2, 32), i += a);
  var o = ce(8);
  return o.write_shift(4, r), o.write_shift(4, i), o;
}
function ku(e, t) {
  var n = ce(4), r = ce(4);
  switch (n.write_shift(4, e == 80 ? 31 : e), e) {
    case 3:
      r.write_shift(-4, t);
      break;
    case 5:
      r = ce(8), r.write_shift(8, t, "f");
      break;
    case 11:
      r.write_shift(4, t ? 1 : 0);
      break;
    case 64:
      r = _v(t);
      break;
    case 31:
    case 80:
      for (r = ce(4 + 2 * (t.length + 1) + (t.length % 2 ? 0 : 2)), r.write_shift(4, t.length + 1), r.write_shift(0, t, "dbcs"); r.l != r.length; ) r.write_shift(1, 0);
      break;
    default:
      throw new Error("TypedPropertyValue unrecognized type " + e + " " + t);
  }
  return At([n, r]);
}
var Zc = ["CodePage", "Thumbnail", "_PID_LINKBASE", "_PID_HLINKS", "SystemIdentifier", "FMTID"];
function wv(e) {
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
function Iu(e, t, n) {
  var r = ce(8), i = [], a = [], o = 8, s = 0, u = ce(8), l = ce(8);
  if (u.write_shift(4, 2), u.write_shift(4, 1200), l.write_shift(4, 1), a.push(u), i.push(l), o += 8 + u.length, !t) {
    l = ce(8), l.write_shift(4, 0), i.unshift(l);
    var c = [ce(4)];
    for (c[0].write_shift(4, e.length), s = 0; s < e.length; ++s) {
      var f = e[s][0];
      for (u = ce(8 + 2 * (f.length + 1) + (f.length % 2 ? 0 : 2)), u.write_shift(4, s + 2), u.write_shift(4, f.length + 1), u.write_shift(0, f, "dbcs"); u.l != u.length; ) u.write_shift(1, 0);
      c.push(u);
    }
    u = At(c), a.unshift(u), o += 8 + u.length;
  }
  for (s = 0; s < e.length; ++s)
    if (!(t && !t[e[s][0]]) && !(Zc.indexOf(e[s][0]) > -1 || Xc.indexOf(e[s][0]) > -1) && e[s][1] != null) {
      var h = e[s][1], d = 0;
      if (t) {
        d = +t[e[s][0]];
        var p = n[d];
        if (p.p == "version" && typeof h == "string") {
          var v = h.split(".");
          h = (+v[0] << 16) + (+v[1] || 0);
        }
        u = ku(p.t, h);
      } else {
        var g = wv(h);
        g == -1 && (g = 31, h = String(h)), u = ku(g, h);
      }
      a.push(u), l = ce(8), l.write_shift(4, t ? d : 2 + s), i.push(l), o += 8 + u.length;
    }
  var x = 8 * (a.length + 1);
  for (s = 0; s < a.length; ++s)
    i[s].write_shift(4, x), x += a[s].length;
  return r.write_shift(4, o), r.write_shift(4, a.length), At([r].concat(i).concat(a));
}
function Ou(e, t, n, r, i, a) {
  var o = ce(i ? 68 : 48), s = [o];
  o.write_shift(2, 65534), o.write_shift(2, 0), o.write_shift(4, 842412599), o.write_shift(16, et.utils.consts.HEADER_CLSID, "hex"), o.write_shift(4, i ? 2 : 1), o.write_shift(16, t, "hex"), o.write_shift(4, i ? 68 : 48);
  var u = Iu(e, n, r);
  if (s.push(u), i) {
    var l = Iu(i, null, null);
    o.write_shift(16, a, "hex"), o.write_shift(4, 68 + u.length), s.push(l);
  }
  return At(s);
}
function yv(e, t) {
  t || (t = ce(e));
  for (var n = 0; n < e; ++n) t.write_shift(1, 0);
  return t;
}
function Ev(e, t) {
  return e.read_shift(t) === 1;
}
function bt(e, t) {
  return t || (t = ce(2)), t.write_shift(2, +!!e), t;
}
function qc(e) {
  return e.read_shift(2, "u");
}
function Qt(e, t) {
  return t || (t = ce(2)), t.write_shift(2, e), t;
}
function jc(e, t, n) {
  return n || (n = ce(2)), n.write_shift(1, t == "e" ? +e : +!!e), n.write_shift(1, t == "e" ? 1 : 0), n;
}
function Jc(e, t, n) {
  var r = e.read_shift(n && n.biff >= 12 ? 2 : 1), i = "sbcs-cont";
  if (n && n.biff >= 8, !n || n.biff == 8) {
    var a = e.read_shift(1);
    a && (i = "dbcs-cont");
  } else n.biff == 12 && (i = "wstr");
  n.biff >= 2 && n.biff <= 5 && (i = "cpstr");
  var o = r ? e.read_shift(r, i) : "";
  return o;
}
function Tv(e) {
  var t = e.t || "", n = ce(3);
  n.write_shift(2, t.length), n.write_shift(1, 1);
  var r = ce(2 * t.length);
  r.write_shift(2 * t.length, t, "utf16le");
  var i = [n, r];
  return At(i);
}
function Sv(e, t, n) {
  var r;
  if (n) {
    if (n.biff >= 2 && n.biff <= 5) return e.read_shift(t, "cpstr");
    if (n.biff >= 12) return e.read_shift(t, "dbcs-cont");
  }
  var i = e.read_shift(1);
  return i === 0 ? r = e.read_shift(t, "sbcs-cont") : r = e.read_shift(t, "dbcs-cont"), r;
}
function Av(e, t, n) {
  var r = e.read_shift(n && n.biff == 2 ? 1 : 2);
  return r === 0 ? (e.l++, "") : Sv(e, r, n);
}
function Cv(e, t, n) {
  if (n.biff > 5) return Av(e, t, n);
  var r = e.read_shift(1);
  return r === 0 ? (e.l++, "") : e.read_shift(r, n.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont");
}
function Qc(e, t, n) {
  return n || (n = ce(3 + 2 * e.length)), n.write_shift(2, e.length), n.write_shift(1, 1), n.write_shift(31, e, "utf16le"), n;
}
function Du(e, t) {
  t || (t = ce(6 + e.length * 2)), t.write_shift(4, 1 + e.length);
  for (var n = 0; n < e.length; ++n) t.write_shift(2, e.charCodeAt(n));
  return t.write_shift(2, 0), t;
}
function Nv(e) {
  var t = ce(512), n = 0, r = e.Target;
  r.slice(0, 7) == "file://" && (r = r.slice(7));
  var i = r.indexOf("#"), a = i > -1 ? 31 : 23;
  switch (r.charAt(0)) {
    case "#":
      a = 28;
      break;
    case ".":
      a &= -3;
      break;
  }
  t.write_shift(4, 2), t.write_shift(4, a);
  var o = [8, 6815827, 6619237, 4849780, 83];
  for (n = 0; n < o.length; ++n) t.write_shift(4, o[n]);
  if (a == 28)
    r = r.slice(1), Du(r, t);
  else if (a & 2) {
    for (o = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), n = 0; n < o.length; ++n) t.write_shift(1, parseInt(o[n], 16));
    var s = i > -1 ? r.slice(0, i) : r;
    for (t.write_shift(4, 2 * (s.length + 1)), n = 0; n < s.length; ++n) t.write_shift(2, s.charCodeAt(n));
    t.write_shift(2, 0), a & 8 && Du(i > -1 ? r.slice(i + 1) : "", t);
  } else {
    for (o = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" "), n = 0; n < o.length; ++n) t.write_shift(1, parseInt(o[n], 16));
    for (var u = 0; r.slice(u * 3, u * 3 + 3) == "../" || r.slice(u * 3, u * 3 + 3) == "..\\"; ) ++u;
    for (t.write_shift(2, u), t.write_shift(4, r.length - 3 * u + 1), n = 0; n < r.length - 3 * u; ++n) t.write_shift(1, r.charCodeAt(n + 3 * u) & 255);
    for (t.write_shift(1, 0), t.write_shift(2, 65535), t.write_shift(2, 57005), n = 0; n < 6; ++n) t.write_shift(4, 0);
  }
  return t.slice(0, t.l);
}
function Tr(e, t, n, r) {
  return r || (r = ce(6)), r.write_shift(2, e), r.write_shift(2, t), r.write_shift(2, n || 0), r;
}
function Fv(e, t, n) {
  var r = n.biff > 8 ? 4 : 2, i = e.read_shift(r), a = e.read_shift(r, "i"), o = e.read_shift(r, "i");
  return [i, a, o];
}
function kv(e) {
  var t = e.read_shift(2), n = e.read_shift(2), r = e.read_shift(2), i = e.read_shift(2);
  return { s: { c: r, r: t }, e: { c: i, r: n } };
}
function ef(e, t) {
  return t || (t = ce(8)), t.write_shift(2, e.s.r), t.write_shift(2, e.e.r), t.write_shift(2, e.s.c), t.write_shift(2, e.e.c), t;
}
function fl(e, t, n) {
  var r = 1536, i = 16;
  switch (n.bookType) {
    case "biff8":
      break;
    case "biff5":
      r = 1280, i = 8;
      break;
    case "biff4":
      r = 4, i = 6;
      break;
    case "biff3":
      r = 3, i = 6;
      break;
    case "biff2":
      r = 2, i = 4;
      break;
    case "xla":
      break;
    default:
      throw new Error("unsupported BIFF version");
  }
  var a = ce(i);
  return a.write_shift(2, r), a.write_shift(2, t), i > 4 && a.write_shift(2, 29282), i > 6 && a.write_shift(2, 1997), i > 8 && (a.write_shift(2, 49161), a.write_shift(2, 1), a.write_shift(2, 1798), a.write_shift(2, 0)), a;
}
function Iv(e, t) {
  var n = !t || t.biff == 8, r = ce(n ? 112 : 54);
  for (r.write_shift(t.biff == 8 ? 2 : 1, 7), n && r.write_shift(1, 0), r.write_shift(4, 859007059), r.write_shift(4, 5458548 | (n ? 0 : 536870912)); r.l < r.length; ) r.write_shift(1, n ? 0 : 32);
  return r;
}
function Ov(e, t) {
  var n = !t || t.biff >= 8 ? 2 : 1, r = ce(8 + n * e.name.length);
  r.write_shift(4, e.pos), r.write_shift(1, e.hs || 0), r.write_shift(1, e.dt), r.write_shift(1, e.name.length), t.biff >= 8 && r.write_shift(1, 1), r.write_shift(n * e.name.length, e.name, t.biff < 8 ? "sbcs" : "utf16le");
  var i = r.slice(0, r.l);
  return i.l = r.l, i;
}
function Dv(e, t) {
  var n = ce(8);
  n.write_shift(4, e.Count), n.write_shift(4, e.Unique);
  for (var r = [], i = 0; i < e.length; ++i) r[i] = Tv(e[i]);
  var a = At([n].concat(r));
  return a.parts = [n.length].concat(r.map(function(o) {
    return o.length;
  })), a;
}
function bv() {
  var e = ce(18);
  return e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 29280), e.write_shift(2, 17600), e.write_shift(2, 56), e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 1), e.write_shift(2, 500), e;
}
function Mv(e) {
  var t = ce(18), n = 1718;
  return e && e.RTL && (n |= 64), t.write_shift(2, n), t.write_shift(4, 0), t.write_shift(4, 64), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
function Rv(e, t) {
  var n = e.name || "Arial", r = t && t.biff == 5, i = r ? 15 + n.length : 16 + 2 * n.length, a = ce(i);
  return a.write_shift(2, e.sz * 20), a.write_shift(4, 0), a.write_shift(2, 400), a.write_shift(4, 0), a.write_shift(2, 0), a.write_shift(1, n.length), r || a.write_shift(1, 1), a.write_shift((r ? 1 : 2) * n.length, n, r ? "sbcs" : "utf16le"), a;
}
function Pv(e, t, n, r) {
  var i = ce(10);
  return Tr(e, t, r, i), i.write_shift(4, n), i;
}
function Lv(e, t, n, r, i) {
  var a = !i || i.biff == 8, o = ce(8 + +a + (1 + a) * n.length);
  return Tr(e, t, r, o), o.write_shift(2, n.length), a && o.write_shift(1, 1), o.write_shift((1 + a) * n.length, n, a ? "utf16le" : "sbcs"), o;
}
function Bv(e, t, n, r) {
  var i = n && n.biff == 5;
  r || (r = ce(i ? 3 + t.length : 5 + 2 * t.length)), r.write_shift(2, e), r.write_shift(i ? 1 : 2, t.length), i || r.write_shift(1, 1), r.write_shift((i ? 1 : 2) * t.length, t, i ? "sbcs" : "utf16le");
  var a = r.length > r.l ? r.slice(0, r.l) : r;
  return a.l == null && (a.l = a.length), a;
}
function $v(e, t) {
  var n = t.biff == 8 || !t.biff ? 4 : 2, r = ce(2 * n + 6);
  return r.write_shift(n, e.s.r), r.write_shift(n, e.e.r + 1), r.write_shift(2, e.s.c), r.write_shift(2, e.e.c + 1), r.write_shift(2, 0), r;
}
function bu(e, t, n, r) {
  var i = n && n.biff == 5;
  r || (r = ce(i ? 16 : 20)), r.write_shift(2, 0), e.style ? (r.write_shift(2, e.numFmtId || 0), r.write_shift(2, 65524)) : (r.write_shift(2, e.numFmtId || 0), r.write_shift(2, t << 4));
  var a = 0;
  return e.numFmtId > 0 && i && (a |= 1024), r.write_shift(4, a), r.write_shift(4, 0), i || r.write_shift(4, 0), r.write_shift(2, 0), r;
}
function Uv(e) {
  var t = ce(8);
  return t.write_shift(4, 0), t.write_shift(2, 0), t.write_shift(2, 0), t;
}
function zv(e, t, n, r, i, a) {
  var o = ce(8);
  return Tr(e, t, r, o), jc(n, a, o), o;
}
function Hv(e, t, n, r) {
  var i = ce(14);
  return Tr(e, t, r, i), Er(n, i), i;
}
function Vv(e, t, n) {
  if (n.biff < 8) return Wv(e, t, n);
  for (var r = [], i = e.l + t, a = e.read_shift(n.biff > 8 ? 4 : 2); a-- !== 0; ) r.push(Fv(e, n.biff > 8 ? 12 : 6, n));
  if (e.l != i) throw new Error("Bad ExternSheet: " + e.l + " != " + i);
  return r;
}
function Wv(e, t, n) {
  e[e.l + 1] == 3 && e[e.l]++;
  var r = Jc(e, t, n);
  return r.charCodeAt(0) == 3 ? r.slice(1) : r;
}
function Gv(e) {
  var t = ce(2 + e.length * 8);
  t.write_shift(2, e.length);
  for (var n = 0; n < e.length; ++n) ef(e[n], t);
  return t;
}
function Xv(e) {
  var t = ce(24), n = yt(e[0]);
  t.write_shift(2, n.r), t.write_shift(2, n.r), t.write_shift(2, n.c), t.write_shift(2, n.c);
  for (var r = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), i = 0; i < 16; ++i) t.write_shift(1, parseInt(r[i], 16));
  return At([t, Nv(e[1])]);
}
function Yv(e) {
  var t = e[1].Tooltip, n = ce(10 + 2 * (t.length + 1));
  n.write_shift(2, 2048);
  var r = yt(e[0]);
  n.write_shift(2, r.r), n.write_shift(2, r.r), n.write_shift(2, r.c), n.write_shift(2, r.c);
  for (var i = 0; i < t.length; ++i) n.write_shift(2, t.charCodeAt(i));
  return n.write_shift(2, 0), n;
}
function Kv(e) {
  return e || (e = ce(4)), e.write_shift(2, 1), e.write_shift(2, 1), e;
}
function Zv(e, t, n) {
  if (!n.cellStyles) return An(e, t);
  var r = n && n.biff >= 12 ? 4 : 2, i = e.read_shift(r), a = e.read_shift(r), o = e.read_shift(r), s = e.read_shift(r), u = e.read_shift(2);
  r == 2 && (e.l += 2);
  var l = { s: i, e: a, w: o, ixfe: s, flags: u };
  return (n.biff >= 5 || !n.biff) && (l.level = u >> 8 & 7), l;
}
function qv(e, t) {
  var n = ce(12);
  n.write_shift(2, t), n.write_shift(2, t), n.write_shift(2, e.width * 256), n.write_shift(2, 0);
  var r = 0;
  return e.hidden && (r |= 1), n.write_shift(1, r), r = e.level || 0, n.write_shift(1, r), n.write_shift(2, 0), n;
}
function jv(e) {
  for (var t = ce(2 * e), n = 0; n < e; ++n) t.write_shift(2, n + 1);
  return t;
}
function Jv(e, t, n) {
  var r = ce(15);
  return aa(r, e, t), r.write_shift(8, n, "f"), r;
}
function Qv(e, t, n) {
  var r = ce(9);
  return aa(r, e, t), r.write_shift(2, n), r;
}
var ep = /* @__PURE__ */ function() {
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
  }, t = el({
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
  function n(s, u) {
    var l = [], c = yr(1);
    switch (u.type) {
      case "base64":
        c = rn(Un(s));
        break;
      case "binary":
        c = rn(s);
        break;
      case "buffer":
      case "array":
        c = s;
        break;
    }
    Wt(c, 0);
    var f = c.read_shift(1), h = !!(f & 136), d = !1, p = !1;
    switch (f) {
      case 2:
        break;
      case 3:
        break;
      case 48:
        d = !0, h = !0;
        break;
      case 49:
        d = !0, h = !0;
        break;
      case 131:
        break;
      case 139:
        break;
      case 140:
        p = !0;
        break;
      case 245:
        break;
      default:
        throw new Error("DBF Unsupported Version: " + f.toString(16));
    }
    var v = 0, g = 521;
    f == 2 && (v = c.read_shift(2)), c.l += 3, f != 2 && (v = c.read_shift(4)), v > 1048576 && (v = 1e6), f != 2 && (g = c.read_shift(2));
    var x = c.read_shift(2), y = u.codepage || 1252;
    f != 2 && (c.l += 16, c.read_shift(1), c[c.l] !== 0 && (y = e[c[c.l]]), c.l += 1, c.l += 2), p && (c.l += 36);
    for (var m = [], T = {}, Y = Math.min(c.length, f == 2 ? 521 : g - 10 - (d ? 264 : 0)), Q = p ? 32 : 11; c.l < Y && c[c.l] != 13; )
      switch (T = {}, T.name = Ka.utils.decode(y, c.slice(c.l, c.l + Q)).replace(/[\u0000\r\n].*$/g, ""), c.l += Q, T.type = String.fromCharCode(c.read_shift(1)), f != 2 && !p && (T.offset = c.read_shift(4)), T.len = c.read_shift(1), f == 2 && (T.offset = c.read_shift(2)), T.dec = c.read_shift(1), T.name.length && m.push(T), f != 2 && (c.l += p ? 13 : 14), T.type) {
        case "B":
          (!d || T.len != 8) && u.WTF && console.log("Skipping " + T.name + ":" + T.type);
          break;
        case "G":
        case "P":
          u.WTF && console.log("Skipping " + T.name + ":" + T.type);
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
          throw new Error("Unknown Field Type: " + T.type);
      }
    if (c[c.l] !== 13 && (c.l = g - 1), c.read_shift(1) !== 13) throw new Error("DBF Terminator not found " + c.l + " " + c[c.l]);
    c.l = g;
    var R = 0, V = 0;
    for (l[0] = [], V = 0; V != m.length; ++V) l[0][V] = m[V].name;
    for (; v-- > 0; ) {
      if (c[c.l] === 42) {
        c.l += x;
        continue;
      }
      for (++c.l, l[++R] = [], V = 0, V = 0; V != m.length; ++V) {
        var P = c.slice(c.l, c.l + m[V].len);
        c.l += m[V].len, Wt(P, 0);
        var H = Ka.utils.decode(y, P);
        switch (m[V].type) {
          case "C":
            H.trim().length && (l[R][V] = H.replace(/\s+$/, ""));
            break;
          case "D":
            H.length === 8 ? l[R][V] = new Date(+H.slice(0, 4), +H.slice(4, 6) - 1, +H.slice(6, 8)) : l[R][V] = H;
            break;
          case "F":
            l[R][V] = parseFloat(H.trim());
            break;
          case "+":
          case "I":
            l[R][V] = p ? P.read_shift(-4, "i") ^ 2147483648 : P.read_shift(4, "i");
            break;
          case "L":
            switch (H.trim().toUpperCase()) {
              case "Y":
              case "T":
                l[R][V] = !0;
                break;
              case "N":
              case "F":
                l[R][V] = !1;
                break;
              case "":
              case "?":
                break;
              default:
                throw new Error("DBF Unrecognized L:|" + H + "|");
            }
            break;
          case "M":
            if (!h) throw new Error("DBF Unexpected MEMO for type " + f.toString(16));
            l[R][V] = "##MEMO##" + (p ? parseInt(H.trim(), 10) : P.read_shift(4));
            break;
          case "N":
            H = H.replace(/\u0000/g, "").trim(), H && H != "." && (l[R][V] = +H || 0);
            break;
          case "@":
            l[R][V] = new Date(P.read_shift(-8, "f") - 621356832e5);
            break;
          case "T":
            l[R][V] = new Date((P.read_shift(4) - 2440588) * 864e5 + P.read_shift(4));
            break;
          case "Y":
            l[R][V] = P.read_shift(4, "i") / 1e4 + P.read_shift(4, "i") / 1e4 * Math.pow(2, 32);
            break;
          case "O":
            l[R][V] = -P.read_shift(-8, "f");
            break;
          case "B":
            if (d && m[V].len == 8) {
              l[R][V] = P.read_shift(8, "f");
              break;
            }
          case "G":
          case "P":
            P.l += m[V].len;
            break;
          case "0":
            if (m[V].name === "_NullFlags") break;
          default:
            throw new Error("DBF Unsupported data type " + m[V].type);
        }
      }
    }
    if (f != 2 && c.l < c.length && c[c.l++] != 26) throw new Error("DBF EOF Marker missing " + (c.l - 1) + " of " + c.length + " " + c[c.l - 1].toString(16));
    return u && u.sheetRows && (l = l.slice(0, u.sheetRows)), u.DBF = m, l;
  }
  function r(s, u) {
    var l = u || {};
    l.dateNF || (l.dateNF = "yyyymmdd");
    var c = li(n(s, l), l);
    return c["!cols"] = l.DBF.map(function(f) {
      return {
        wch: f.len,
        DBF: f
      };
    }), delete l.DBF, c;
  }
  function i(s, u) {
    try {
      return kr(r(s, u), u);
    } catch (l) {
      if (u && u.WTF) throw l;
    }
    return { SheetNames: [], Sheets: {} };
  }
  var a = { B: 8, C: 250, L: 1, D: 8, "?": 0, "": 0 };
  function o(s, u) {
    var l = u || {};
    if (+l.codepage >= 0 && Mi(+l.codepage), l.type == "string") throw new Error("Cannot write DBF to JS string");
    var c = $t(), f = so(s, { header: 1, raw: !0, cellDates: !0 }), h = f[0], d = f.slice(1), p = s["!cols"] || [], v = 0, g = 0, x = 0, y = 1;
    for (v = 0; v < h.length; ++v) {
      if (((p[v] || {}).DBF || {}).name) {
        h[v] = p[v].DBF.name, ++x;
        continue;
      }
      if (h[v] != null) {
        if (++x, typeof h[v] == "number" && (h[v] = h[v].toString(10)), typeof h[v] != "string") throw new Error("DBF Invalid column name " + h[v] + " |" + typeof h[v] + "|");
        if (h.indexOf(h[v]) !== v) {
          for (g = 0; g < 1024; ++g)
            if (h.indexOf(h[v] + "_" + g) == -1) {
              h[v] += "_" + g;
              break;
            }
        }
      }
    }
    var m = rt(s["!ref"]), T = [], Y = [], Q = [];
    for (v = 0; v <= m.e.c - m.s.c; ++v) {
      var R = "", V = "", P = 0, H = [];
      for (g = 0; g < d.length; ++g)
        d[g][v] != null && H.push(d[g][v]);
      if (H.length == 0 || h[v] == null) {
        T[v] = "?";
        continue;
      }
      for (g = 0; g < H.length; ++g) {
        switch (typeof H[g]) {
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
            V = H[g] instanceof Date ? "D" : "C";
            break;
          default:
            V = "C";
        }
        P = Math.max(P, String(H[g]).length), R = R && R != V ? "C" : V;
      }
      P > 250 && (P = 250), V = ((p[v] || {}).DBF || {}).type, V == "C" && p[v].DBF.len > P && (P = p[v].DBF.len), R == "B" && V == "N" && (R = "N", Q[v] = p[v].DBF.dec, P = p[v].DBF.len), Y[v] = R == "C" || V == "N" ? P : a[R] || 0, y += Y[v], T[v] = R;
    }
    var G = c.next(32);
    for (G.write_shift(4, 318902576), G.write_shift(4, d.length), G.write_shift(2, 296 + 32 * x), G.write_shift(2, y), v = 0; v < 4; ++v) G.write_shift(4, 0);
    for (G.write_shift(4, 0 | (+t[
      /*::String(*/
      nc
      /*::)*/
    ] || 3) << 8), v = 0, g = 0; v < h.length; ++v)
      if (h[v] != null) {
        var C = c.next(32), se = (h[v].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
        C.write_shift(1, se, "sbcs"), C.write_shift(1, T[v] == "?" ? "C" : T[v], "sbcs"), C.write_shift(4, g), C.write_shift(1, Y[v] || a[T[v]] || 0), C.write_shift(1, Q[v] || 0), C.write_shift(1, 2), C.write_shift(4, 0), C.write_shift(1, 0), C.write_shift(4, 0), C.write_shift(4, 0), g += Y[v] || a[T[v]] || 0;
      }
    var w = c.next(264);
    for (w.write_shift(4, 13), v = 0; v < 65; ++v) w.write_shift(4, 0);
    for (v = 0; v < d.length; ++v) {
      var U = c.next(y);
      for (U.write_shift(1, 0), g = 0; g < h.length; ++g)
        if (h[g] != null)
          switch (T[g]) {
            case "L":
              U.write_shift(1, d[v][g] == null ? 63 : d[v][g] ? 84 : 70);
              break;
            case "B":
              U.write_shift(8, d[v][g] || 0, "f");
              break;
            case "N":
              var I = "0";
              for (typeof d[v][g] == "number" && (I = d[v][g].toFixed(Q[g] || 0)), x = 0; x < Y[g] - I.length; ++x) U.write_shift(1, 32);
              U.write_shift(1, I, "sbcs");
              break;
            case "D":
              d[v][g] ? (U.write_shift(4, ("0000" + d[v][g].getFullYear()).slice(-4), "sbcs"), U.write_shift(2, ("00" + (d[v][g].getMonth() + 1)).slice(-2), "sbcs"), U.write_shift(2, ("00" + d[v][g].getDate()).slice(-2), "sbcs")) : U.write_shift(8, "00000000", "sbcs");
              break;
            case "C":
              var j = String(d[v][g] != null ? d[v][g] : "").slice(0, Y[g]);
              for (U.write_shift(1, j, "sbcs"), x = 0; x < Y[g] - j.length; ++x) U.write_shift(1, 32);
              break;
          }
    }
    return c.next(1).write_shift(1, 26), c.end();
  }
  return {
    to_workbook: i,
    to_sheet: r,
    from_sheet: o
  };
}(), tp = /* @__PURE__ */ function() {
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
  }, t = new RegExp("\x1BN(" + Ft(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm"), n = function(h, d) {
    var p = e[d];
    return typeof p == "number" ? ru(p) : p;
  }, r = function(h, d, p) {
    var v = d.charCodeAt(0) - 32 << 4 | p.charCodeAt(0) - 48;
    return v == 59 ? h : ru(v);
  };
  e["|"] = 254;
  function i(h, d) {
    switch (d.type) {
      case "base64":
        return a(Un(h), d);
      case "binary":
        return a(h, d);
      case "buffer":
        return a(Xe && Buffer.isBuffer(h) ? h.toString("binary") : ea(h), d);
      case "array":
        return a(Oo(h), d);
    }
    throw new Error("Unrecognized type " + d.type);
  }
  function a(h, d) {
    var p = h.split(/[\n\r]+/), v = -1, g = -1, x = 0, y = 0, m = [], T = [], Y = null, Q = {}, R = [], V = [], P = [], H = 0, G;
    for (+d.codepage >= 0 && Mi(+d.codepage); x !== p.length; ++x) {
      H = 0;
      var C = p[x].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, r).replace(t, n), se = C.replace(/;;/g, "\0").split(";").map(function(O) {
        return O.replace(/\u0000/g, ";");
      }), w = se[0], U;
      if (C.length > 0) switch (w) {
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
          se[1].charAt(0) == "P" && T.push(C.slice(3).replace(/;;/g, ";"));
          break;
        case "C":
          var I = !1, j = !1, K = !1, ee = !1, J = -1, de = -1;
          for (y = 1; y < se.length; ++y) switch (se[y].charAt(0)) {
            case "A":
              break;
            case "X":
              g = parseInt(se[y].slice(1)) - 1, j = !0;
              break;
            case "Y":
              for (v = parseInt(se[y].slice(1)) - 1, j || (g = 0), G = m.length; G <= v; ++G) m[G] = [];
              break;
            case "K":
              U = se[y].slice(1), U.charAt(0) === '"' ? U = U.slice(1, U.length - 1) : U === "TRUE" ? U = !0 : U === "FALSE" ? U = !1 : isNaN(Bn(U)) ? isNaN(Pi(U).getDate()) || (U = Mt(U)) : (U = Bn(U), Y !== null && vc(Y) && (U = xc(U))), I = !0;
              break;
            case "E":
              ee = !0;
              var A = Qp(se[y].slice(1), { r: v, c: g });
              m[v][g] = [m[v][g], A];
              break;
            case "S":
              K = !0, m[v][g] = [m[v][g], "S5S"];
              break;
            case "G":
              break;
            case "R":
              J = parseInt(se[y].slice(1)) - 1;
              break;
            case "C":
              de = parseInt(se[y].slice(1)) - 1;
              break;
            default:
              if (d && d.WTF) throw new Error("SYLK bad record " + C);
          }
          if (I && (m[v][g] && m[v][g].length == 2 ? m[v][g][0] = U : m[v][g] = U, Y = null), K) {
            if (ee) throw new Error("SYLK shared formula cannot have own formula");
            var z = J > -1 && m[J][de];
            if (!z || !z[1]) throw new Error("SYLK shared formula cannot find base");
            m[v][g][1] = eg(z[1], { r: v - J, c: g - de });
          }
          break;
        case "F":
          var L = 0;
          for (y = 1; y < se.length; ++y) switch (se[y].charAt(0)) {
            case "X":
              g = parseInt(se[y].slice(1)) - 1, ++L;
              break;
            case "Y":
              for (v = parseInt(se[y].slice(1)) - 1, G = m.length; G <= v; ++G) m[G] = [];
              break;
            case "M":
              H = parseInt(se[y].slice(1)) / 20;
              break;
            case "F":
              break;
            case "G":
              break;
            case "P":
              Y = T[parseInt(se[y].slice(1))];
              break;
            case "S":
              break;
            case "D":
              break;
            case "N":
              break;
            case "W":
              for (P = se[y].slice(1).split(" "), G = parseInt(P[0], 10); G <= parseInt(P[1], 10); ++G)
                H = parseInt(P[2], 10), V[G - 1] = H === 0 ? { hidden: !0 } : { wch: H }, hl(V[G - 1]);
              break;
            case "C":
              g = parseInt(se[y].slice(1)) - 1, V[g] || (V[g] = {});
              break;
            case "R":
              v = parseInt(se[y].slice(1)) - 1, R[v] || (R[v] = {}), H > 0 ? (R[v].hpt = H, R[v].hpx = of(H)) : H === 0 && (R[v].hidden = !0);
              break;
            default:
              if (d && d.WTF) throw new Error("SYLK bad record " + C);
          }
          L < 1 && (Y = null);
          break;
        default:
          if (d && d.WTF) throw new Error("SYLK bad record " + C);
      }
    }
    return R.length > 0 && (Q["!rows"] = R), V.length > 0 && (Q["!cols"] = V), d && d.sheetRows && (m = m.slice(0, d.sheetRows)), [m, Q];
  }
  function o(h, d) {
    var p = i(h, d), v = p[0], g = p[1], x = li(v, d);
    return Ft(g).forEach(function(y) {
      x[y] = g[y];
    }), x;
  }
  function s(h, d) {
    return kr(o(h, d), d);
  }
  function u(h, d, p, v) {
    var g = "C;Y" + (p + 1) + ";X" + (v + 1) + ";K";
    switch (h.t) {
      case "n":
        g += h.v || 0, h.f && !h.F && (g += ";E" + vl(h.f, { r: p, c: v }));
        break;
      case "b":
        g += h.v ? "TRUE" : "FALSE";
        break;
      case "e":
        g += h.w || h.v;
        break;
      case "d":
        g += '"' + (h.w || h.v) + '"';
        break;
      case "s":
        g += '"' + h.v.replace(/"/g, "").replace(/;/g, ";;") + '"';
        break;
    }
    return g;
  }
  function l(h, d) {
    d.forEach(function(p, v) {
      var g = "F;W" + (v + 1) + " " + (v + 1) + " ";
      p.hidden ? g += "0" : (typeof p.width == "number" && !p.wpx && (p.wpx = ro(p.width)), typeof p.wpx == "number" && !p.wch && (p.wch = io(p.wpx)), typeof p.wch == "number" && (g += Math.round(p.wch))), g.charAt(g.length - 1) != " " && h.push(g);
    });
  }
  function c(h, d) {
    d.forEach(function(p, v) {
      var g = "F;";
      p.hidden ? g += "M0;" : p.hpt ? g += "M" + 20 * p.hpt + ";" : p.hpx && (g += "M" + 20 * ao(p.hpx) + ";"), g.length > 2 && h.push(g + "R" + (v + 1));
    });
  }
  function f(h, d) {
    var p = ["ID;PWXL;N;E"], v = [], g = rt(h["!ref"]), x, y = Array.isArray(h), m = `\r
`;
    p.push("P;PGeneral"), p.push("F;P0;DG0G8;M255"), h["!cols"] && l(p, h["!cols"]), h["!rows"] && c(p, h["!rows"]), p.push("B;Y" + (g.e.r - g.s.r + 1) + ";X" + (g.e.c - g.s.c + 1) + ";D" + [g.s.c, g.s.r, g.e.c, g.e.r].join(" "));
    for (var T = g.s.r; T <= g.e.r; ++T)
      for (var Y = g.s.c; Y <= g.e.c; ++Y) {
        var Q = Qe({ r: T, c: Y });
        x = y ? (h[T] || [])[Y] : h[Q], !(!x || x.v == null && (!x.f || x.F)) && v.push(u(x, h, T, Y));
      }
    return p.join(m) + m + v.join(m) + m + "E" + m;
  }
  return {
    to_workbook: s,
    to_sheet: o,
    from_sheet: f
  };
}(), np = /* @__PURE__ */ function() {
  function e(a, o) {
    switch (o.type) {
      case "base64":
        return t(Un(a), o);
      case "binary":
        return t(a, o);
      case "buffer":
        return t(Xe && Buffer.isBuffer(a) ? a.toString("binary") : ea(a), o);
      case "array":
        return t(Oo(a), o);
    }
    throw new Error("Unrecognized type " + o.type);
  }
  function t(a, o) {
    for (var s = a.split(`
`), u = -1, l = -1, c = 0, f = []; c !== s.length; ++c) {
      if (s[c].trim() === "BOT") {
        f[++u] = [], l = 0;
        continue;
      }
      if (!(u < 0)) {
        var h = s[c].trim().split(","), d = h[0], p = h[1];
        ++c;
        for (var v = s[c] || ""; (v.match(/["]/g) || []).length & 1 && c < s.length - 1; ) v += `
` + s[++c];
        switch (v = v.trim(), +d) {
          case -1:
            if (v === "BOT") {
              f[++u] = [], l = 0;
              continue;
            } else if (v !== "EOD") throw new Error("Unrecognized DIF special command " + v);
            break;
          case 0:
            v === "TRUE" ? f[u][l] = !0 : v === "FALSE" ? f[u][l] = !1 : isNaN(Bn(p)) ? isNaN(Pi(p).getDate()) ? f[u][l] = p : f[u][l] = Mt(p) : f[u][l] = Bn(p), ++l;
            break;
          case 1:
            v = v.slice(1, v.length - 1), v = v.replace(/""/g, '"'), v && v.match(/^=".*"$/) && (v = v.slice(2, -1)), f[u][l++] = v !== "" ? v : null;
            break;
        }
        if (v === "EOD") break;
      }
    }
    return o && o.sheetRows && (f = f.slice(0, o.sheetRows)), f;
  }
  function n(a, o) {
    return li(e(a, o), o);
  }
  function r(a, o) {
    return kr(n(a, o), o);
  }
  var i = /* @__PURE__ */ function() {
    var a = function(u, l, c, f, h) {
      u.push(l), u.push(c + "," + f), u.push('"' + h.replace(/"/g, '""') + '"');
    }, o = function(u, l, c, f) {
      u.push(l + "," + c), u.push(l == 1 ? '"' + f.replace(/"/g, '""') + '"' : f);
    };
    return function(u) {
      var l = [], c = rt(u["!ref"]), f, h = Array.isArray(u);
      a(l, "TABLE", 0, 1, "sheetjs"), a(l, "VECTORS", 0, c.e.r - c.s.r + 1, ""), a(l, "TUPLES", 0, c.e.c - c.s.c + 1, ""), a(l, "DATA", 0, 0, "");
      for (var d = c.s.r; d <= c.e.r; ++d) {
        o(l, -1, 0, "BOT");
        for (var p = c.s.c; p <= c.e.c; ++p) {
          var v = Qe({ r: d, c: p });
          if (f = h ? (u[d] || [])[p] : u[v], !f) {
            o(l, 1, 0, "");
            continue;
          }
          switch (f.t) {
            case "n":
              var g = f.w;
              !g && f.v != null && (g = f.v), g == null ? f.f && !f.F ? o(l, 1, 0, "=" + f.f) : o(l, 1, 0, "") : o(l, 0, g, "V");
              break;
            case "b":
              o(l, 0, f.v ? 1 : 0, f.v ? "TRUE" : "FALSE");
              break;
            case "s":
              o(l, 1, 0, isNaN(f.v) ? f.v : '="' + f.v + '"');
              break;
            case "d":
              f.w || (f.w = nr(f.z || ft[14], Ut(Mt(f.v)))), o(l, 0, f.w, "V");
              break;
            default:
              o(l, 1, 0, "");
          }
        }
      }
      o(l, -1, 0, "EOD");
      var x = `\r
`, y = l.join(x);
      return y;
    };
  }();
  return {
    to_workbook: r,
    to_sheet: n,
    from_sheet: i
  };
}(), tf = /* @__PURE__ */ function() {
  function e(f) {
    return f.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, `
`);
  }
  function t(f) {
    return f.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n");
  }
  function n(f, h) {
    for (var d = f.split(`
`), p = -1, v = -1, g = 0, x = []; g !== d.length; ++g) {
      var y = d[g].trim().split(":");
      if (y[0] === "cell") {
        var m = yt(y[1]);
        if (x.length <= m.r) for (p = x.length; p <= m.r; ++p) x[p] || (x[p] = []);
        switch (p = m.r, v = m.c, y[2]) {
          case "t":
            x[p][v] = e(y[3]);
            break;
          case "v":
            x[p][v] = +y[3];
            break;
          case "vtf":
            var T = y[y.length - 1];
          case "vtc":
            switch (y[3]) {
              case "nl":
                x[p][v] = !!+y[4];
                break;
              default:
                x[p][v] = +y[4];
                break;
            }
            y[2] == "vtf" && (x[p][v] = [x[p][v], T]);
        }
      }
    }
    return h && h.sheetRows && (x = x.slice(0, h.sheetRows)), x;
  }
  function r(f, h) {
    return li(n(f, h), h);
  }
  function i(f, h) {
    return kr(r(f, h), h);
  }
  var a = [
    "socialcalc:version:1.5",
    "MIME-Version: 1.0",
    "Content-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave"
  ].join(`
`), o = [
    "--SocialCalcSpreadsheetControlSave",
    "Content-type: text/plain; charset=UTF-8"
  ].join(`
`) + `
`, s = [
    "# SocialCalc Spreadsheet Control Save",
    "part:sheet"
  ].join(`
`), u = "--SocialCalcSpreadsheetControlSave--";
  function l(f) {
    if (!f || !f["!ref"]) return "";
    for (var h = [], d = [], p, v = "", g = Kt(f["!ref"]), x = Array.isArray(f), y = g.s.r; y <= g.e.r; ++y)
      for (var m = g.s.c; m <= g.e.c; ++m)
        if (v = Qe({ r: y, c: m }), p = x ? (f[y] || [])[m] : f[v], !(!p || p.v == null || p.t === "z")) {
          switch (d = ["cell", v, "t"], p.t) {
            case "s":
            case "str":
              d.push(t(p.v));
              break;
            case "n":
              p.f ? (d[2] = "vtf", d[3] = "n", d[4] = p.v, d[5] = t(p.f)) : (d[2] = "v", d[3] = p.v);
              break;
            case "b":
              d[2] = "vt" + (p.f ? "f" : "c"), d[3] = "nl", d[4] = p.v ? "1" : "0", d[5] = t(p.f || (p.v ? "TRUE" : "FALSE"));
              break;
            case "d":
              var T = Ut(Mt(p.v));
              d[2] = "vtc", d[3] = "nd", d[4] = "" + T, d[5] = p.w || nr(p.z || ft[14], T);
              break;
            case "e":
              continue;
          }
          h.push(d.join(":"));
        }
    return h.push("sheet:c:" + (g.e.c - g.s.c + 1) + ":r:" + (g.e.r - g.s.r + 1) + ":tvf:1"), h.push("valueformat:1:text-wiki"), h.join(`
`);
  }
  function c(f) {
    return [a, o, s, o, l(f), u].join(`
`);
  }
  return {
    to_workbook: i,
    to_sheet: r,
    from_sheet: c
  };
}(), rp = /* @__PURE__ */ function() {
  function e(c, f, h, d, p) {
    p.raw ? f[h][d] = c : c === "" || (c === "TRUE" ? f[h][d] = !0 : c === "FALSE" ? f[h][d] = !1 : isNaN(Bn(c)) ? isNaN(Pi(c).getDate()) ? f[h][d] = c : f[h][d] = Mt(c) : f[h][d] = Bn(c));
  }
  function t(c, f) {
    var h = f || {}, d = [];
    if (!c || c.length === 0) return d;
    for (var p = c.split(/[\r\n]/), v = p.length - 1; v >= 0 && p[v].length === 0; ) --v;
    for (var g = 10, x = 0, y = 0; y <= v; ++y)
      x = p[y].indexOf(" "), x == -1 ? x = p[y].length : x++, g = Math.max(g, x);
    for (y = 0; y <= v; ++y) {
      d[y] = [];
      var m = 0;
      for (e(p[y].slice(0, g).trim(), d, y, m, h), m = 1; m <= (p[y].length - g) / 10 + 1; ++m)
        e(p[y].slice(g + (m - 1) * 10, g + m * 10).trim(), d, y, m, h);
    }
    return h.sheetRows && (d = d.slice(0, h.sheetRows)), d;
  }
  var n = {
    /*::[*/
    44: ",",
    /*::[*/
    9: "	",
    /*::[*/
    59: ";",
    /*::[*/
    124: "|"
  }, r = {
    /*::[*/
    44: 3,
    /*::[*/
    9: 2,
    /*::[*/
    59: 1,
    /*::[*/
    124: 0
  };
  function i(c) {
    for (var f = {}, h = !1, d = 0, p = 0; d < c.length; ++d)
      (p = c.charCodeAt(d)) == 34 ? h = !h : !h && p in n && (f[p] = (f[p] || 0) + 1);
    p = [];
    for (d in f) Object.prototype.hasOwnProperty.call(f, d) && p.push([f[d], d]);
    if (!p.length) {
      f = r;
      for (d in f) Object.prototype.hasOwnProperty.call(f, d) && p.push([f[d], d]);
    }
    return p.sort(function(v, g) {
      return v[0] - g[0] || r[v[1]] - r[g[1]];
    }), n[p.pop()[1]] || 44;
  }
  function a(c, f) {
    var h = f || {}, d = "", p = h.dense ? [] : {}, v = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    c.slice(0, 4) == "sep=" ? c.charCodeAt(5) == 13 && c.charCodeAt(6) == 10 ? (d = c.charAt(4), c = c.slice(7)) : c.charCodeAt(5) == 13 || c.charCodeAt(5) == 10 ? (d = c.charAt(4), c = c.slice(6)) : d = i(c.slice(0, 1024)) : h && h.FS ? d = h.FS : d = i(c.slice(0, 1024));
    var g = 0, x = 0, y = 0, m = 0, T = 0, Y = d.charCodeAt(0), Q = !1, R = 0, V = c.charCodeAt(0);
    c = c.replace(/\r\n/mg, `
`);
    var P = h.dateNF != null ? _1(h.dateNF) : null;
    function H() {
      var G = c.slice(m, T), C = {};
      if (G.charAt(0) == '"' && G.charAt(G.length - 1) == '"' && (G = G.slice(1, -1).replace(/""/g, '"')), G.length === 0) C.t = "z";
      else if (h.raw)
        C.t = "s", C.v = G;
      else if (G.trim().length === 0)
        C.t = "s", C.v = G;
      else if (G.charCodeAt(0) == 61)
        G.charCodeAt(1) == 34 && G.charCodeAt(G.length - 1) == 34 ? (C.t = "s", C.v = G.slice(2, -1).replace(/""/g, '"')) : tg(G) ? (C.t = "n", C.f = G.slice(1)) : (C.t = "s", C.v = G);
      else if (G == "TRUE")
        C.t = "b", C.v = !0;
      else if (G == "FALSE")
        C.t = "b", C.v = !1;
      else if (!isNaN(y = Bn(G)))
        C.t = "n", h.cellText !== !1 && (C.w = G), C.v = y;
      else if (!isNaN(Pi(G).getDate()) || P && G.match(P)) {
        C.z = h.dateNF || ft[14];
        var se = 0;
        P && G.match(P) && (G = w1(G, h.dateNF, G.match(P) || []), se = 1), h.cellDates ? (C.t = "d", C.v = Mt(G, se)) : (C.t = "n", C.v = Ut(Mt(G, se))), h.cellText !== !1 && (C.w = nr(C.z, C.v instanceof Date ? Ut(C.v) : C.v)), h.cellNF || delete C.z;
      } else
        C.t = "s", C.v = G;
      if (C.t == "z" || (h.dense ? (p[g] || (p[g] = []), p[g][x] = C) : p[Qe({ c: x, r: g })] = C), m = T + 1, V = c.charCodeAt(m), v.e.c < x && (v.e.c = x), v.e.r < g && (v.e.r = g), R == Y) ++x;
      else if (x = 0, ++g, h.sheetRows && h.sheetRows <= g) return !0;
    }
    e: for (; T < c.length; ++T) switch (R = c.charCodeAt(T)) {
      case 34:
        V === 34 && (Q = !Q);
        break;
      case Y:
      case 10:
      case 13:
        if (!Q && H()) break e;
        break;
    }
    return T - m > 0 && H(), p["!ref"] = pt(v), p;
  }
  function o(c, f) {
    return !(f && f.PRN) || f.FS || c.slice(0, 4) == "sep=" || c.indexOf("	") >= 0 || c.indexOf(",") >= 0 || c.indexOf(";") >= 0 ? a(c, f) : li(t(c, f), f);
  }
  function s(c, f) {
    var h = "", d = f.type == "string" ? [0, 0, 0, 0] : p2(c, f);
    switch (f.type) {
      case "base64":
        h = Un(c);
        break;
      case "binary":
        h = c;
        break;
      case "buffer":
        f.codepage == 65001 ? h = c.toString("utf8") : f.codepage && typeof Ka < "u" || (h = Xe && Buffer.isBuffer(c) ? c.toString("binary") : ea(c));
        break;
      case "array":
        h = Oo(c);
        break;
      case "string":
        h = c;
        break;
      default:
        throw new Error("Unrecognized type " + f.type);
    }
    return d[0] == 239 && d[1] == 187 && d[2] == 191 ? h = Ci(h.slice(3)) : f.type != "string" && f.type != "buffer" && f.codepage == 65001 ? h = Ci(h) : f.type == "binary" && typeof Ka < "u", h.slice(0, 19) == "socialcalc:version:" ? tf.to_sheet(f.type == "string" ? h : Ci(h), f) : o(h, f);
  }
  function u(c, f) {
    return kr(s(c, f), f);
  }
  function l(c) {
    for (var f = [], h = rt(c["!ref"]), d, p = Array.isArray(c), v = h.s.r; v <= h.e.r; ++v) {
      for (var g = [], x = h.s.c; x <= h.e.c; ++x) {
        var y = Qe({ r: v, c: x });
        if (d = p ? (c[v] || [])[x] : c[y], !d || d.v == null) {
          g.push("          ");
          continue;
        }
        for (var m = (d.w || (zn(d), d.w) || "").slice(0, 10); m.length < 10; ) m += " ";
        g.push(m + (x === 0 ? " " : ""));
      }
      f.push(g.join(""));
    }
    return f.join(`
`);
  }
  return {
    to_workbook: u,
    to_sheet: s,
    from_sheet: l
  };
}(), Mu = /* @__PURE__ */ function() {
  function e(A, z, L) {
    if (A) {
      Wt(A, A.l || 0);
      for (var O = L.Enum || J; A.l < A.length; ) {
        var X = A.read_shift(2), le = O[X] || O[65535], pe = A.read_shift(2), me = A.l + pe, he = le.f && le.f(A, pe, L);
        if (A.l = me, z(he, le, X)) return;
      }
    }
  }
  function t(A, z) {
    switch (z.type) {
      case "base64":
        return n(rn(Un(A)), z);
      case "binary":
        return n(rn(A), z);
      case "buffer":
      case "array":
        return n(A, z);
    }
    throw "Unsupported type " + z.type;
  }
  function n(A, z) {
    if (!A) return A;
    var L = z || {}, O = L.dense ? [] : {}, X = "Sheet1", le = "", pe = 0, me = {}, he = [], ue = [], Z = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, _e = L.sheetRows || 0;
    if (A[2] == 0 && (A[3] == 8 || A[3] == 9) && A.length >= 16 && A[14] == 5 && A[15] === 108)
      throw new Error("Unsupported Works 3 for Mac file");
    if (A[2] == 2)
      L.Enum = J, e(A, function(B, q, Ee) {
        switch (Ee) {
          case 0:
            L.vers = B, B >= 4096 && (L.qpro = !0);
            break;
          case 6:
            Z = B;
            break;
          case 204:
            B && (le = B);
            break;
          case 222:
            le = B;
            break;
          case 15:
          case 51:
            L.qpro || (B[1].v = B[1].v.slice(1));
          case 13:
          case 14:
          case 16:
            Ee == 14 && (B[2] & 112) == 112 && (B[2] & 15) > 1 && (B[2] & 15) < 15 && (B[1].z = L.dateNF || ft[14], L.cellDates && (B[1].t = "d", B[1].v = xc(B[1].v))), L.qpro && B[3] > pe && (O["!ref"] = pt(Z), me[X] = O, he.push(X), O = L.dense ? [] : {}, Z = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, pe = B[3], X = le || "Sheet" + (pe + 1), le = "");
            var Ae = L.dense ? (O[B[0].r] || [])[B[0].c] : O[Qe(B[0])];
            if (Ae) {
              Ae.t = B[1].t, Ae.v = B[1].v, B[1].z != null && (Ae.z = B[1].z), B[1].f != null && (Ae.f = B[1].f);
              break;
            }
            L.dense ? (O[B[0].r] || (O[B[0].r] = []), O[B[0].r][B[0].c] = B[1]) : O[Qe(B[0])] = B[1];
            break;
        }
      }, L);
    else if (A[2] == 26 || A[2] == 14)
      L.Enum = de, A[2] == 14 && (L.qpro = !0, A.l = 0), e(A, function(B, q, Ee) {
        switch (Ee) {
          case 204:
            X = B;
            break;
          case 22:
            B[1].v = B[1].v.slice(1);
          case 23:
          case 24:
          case 25:
          case 37:
          case 39:
          case 40:
            if (B[3] > pe && (O["!ref"] = pt(Z), me[X] = O, he.push(X), O = L.dense ? [] : {}, Z = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, pe = B[3], X = "Sheet" + (pe + 1)), _e > 0 && B[0].r >= _e) break;
            L.dense ? (O[B[0].r] || (O[B[0].r] = []), O[B[0].r][B[0].c] = B[1]) : O[Qe(B[0])] = B[1], Z.e.c < B[0].c && (Z.e.c = B[0].c), Z.e.r < B[0].r && (Z.e.r = B[0].r);
            break;
          case 27:
            B[14e3] && (ue[B[14e3][0]] = B[14e3][1]);
            break;
          case 1537:
            ue[B[0]] = B[1], B[0] == pe && (X = B[1]);
            break;
        }
      }, L);
    else throw new Error("Unrecognized LOTUS BOF " + A[2]);
    if (O["!ref"] = pt(Z), me[le || X] = O, he.push(le || X), !ue.length) return { SheetNames: he, Sheets: me };
    for (var F = {}, M = [], D = 0; D < ue.length; ++D) me[he[D]] ? (M.push(ue[D] || he[D]), F[ue[D]] = me[ue[D]] || me[he[D]]) : (M.push(ue[D]), F[ue[D]] = { "!ref": "A1" });
    return { SheetNames: M, Sheets: F };
  }
  function r(A, z) {
    var L = z || {};
    if (+L.codepage >= 0 && Mi(+L.codepage), L.type == "string") throw new Error("Cannot write WK1 to JS string");
    var O = $t(), X = rt(A["!ref"]), le = Array.isArray(A), pe = [];
    Se(O, 0, a(1030)), Se(O, 6, u(X));
    for (var me = Math.min(X.e.r, 8191), he = X.s.r; he <= me; ++he)
      for (var ue = Nt(he), Z = X.s.c; Z <= X.e.c; ++Z) {
        he === X.s.r && (pe[Z] = It(Z));
        var _e = pe[Z] + ue, F = le ? (A[he] || [])[Z] : A[_e];
        if (!(!F || F.t == "z"))
          if (F.t == "n")
            (F.v | 0) == F.v && F.v >= -32768 && F.v <= 32767 ? Se(O, 13, d(he, Z, F.v)) : Se(O, 14, v(he, Z, F.v));
          else {
            var M = zn(F);
            Se(O, 15, f(he, Z, M.slice(0, 239)));
          }
      }
    return Se(O, 1), O.end();
  }
  function i(A, z) {
    var L = z || {};
    if (+L.codepage >= 0 && Mi(+L.codepage), L.type == "string") throw new Error("Cannot write WK3 to JS string");
    var O = $t();
    Se(O, 0, o(A));
    for (var X = 0, le = 0; X < A.SheetNames.length; ++X) (A.Sheets[A.SheetNames[X]] || {})["!ref"] && Se(O, 27, ee(A.SheetNames[X], le++));
    var pe = 0;
    for (X = 0; X < A.SheetNames.length; ++X) {
      var me = A.Sheets[A.SheetNames[X]];
      if (!(!me || !me["!ref"])) {
        for (var he = rt(me["!ref"]), ue = Array.isArray(me), Z = [], _e = Math.min(he.e.r, 8191), F = he.s.r; F <= _e; ++F)
          for (var M = Nt(F), D = he.s.c; D <= he.e.c; ++D) {
            F === he.s.r && (Z[D] = It(D));
            var B = Z[D] + M, q = ue ? (me[F] || [])[D] : me[B];
            if (!(!q || q.t == "z"))
              if (q.t == "n")
                Se(O, 23, H(F, D, pe, q.v));
              else {
                var Ee = zn(q);
                Se(O, 22, R(F, D, pe, Ee.slice(0, 239)));
              }
          }
        ++pe;
      }
    }
    return Se(O, 1), O.end();
  }
  function a(A) {
    var z = ce(2);
    return z.write_shift(2, A), z;
  }
  function o(A) {
    var z = ce(26);
    z.write_shift(2, 4096), z.write_shift(2, 4), z.write_shift(4, 0);
    for (var L = 0, O = 0, X = 0, le = 0; le < A.SheetNames.length; ++le) {
      var pe = A.SheetNames[le], me = A.Sheets[pe];
      if (!(!me || !me["!ref"])) {
        ++X;
        var he = Kt(me["!ref"]);
        L < he.e.r && (L = he.e.r), O < he.e.c && (O = he.e.c);
      }
    }
    return L > 8191 && (L = 8191), z.write_shift(2, L), z.write_shift(1, X), z.write_shift(1, O), z.write_shift(2, 0), z.write_shift(2, 0), z.write_shift(1, 1), z.write_shift(1, 2), z.write_shift(4, 0), z.write_shift(4, 0), z;
  }
  function s(A, z, L) {
    var O = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    return z == 8 && L.qpro ? (O.s.c = A.read_shift(1), A.l++, O.s.r = A.read_shift(2), O.e.c = A.read_shift(1), A.l++, O.e.r = A.read_shift(2), O) : (O.s.c = A.read_shift(2), O.s.r = A.read_shift(2), z == 12 && L.qpro && (A.l += 2), O.e.c = A.read_shift(2), O.e.r = A.read_shift(2), z == 12 && L.qpro && (A.l += 2), O.s.c == 65535 && (O.s.c = O.e.c = O.s.r = O.e.r = 0), O);
  }
  function u(A) {
    var z = ce(8);
    return z.write_shift(2, A.s.c), z.write_shift(2, A.s.r), z.write_shift(2, A.e.c), z.write_shift(2, A.e.r), z;
  }
  function l(A, z, L) {
    var O = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0, 0];
    return L.qpro && L.vers != 20768 ? (O[0].c = A.read_shift(1), O[3] = A.read_shift(1), O[0].r = A.read_shift(2), A.l += 2) : (O[2] = A.read_shift(1), O[0].c = A.read_shift(2), O[0].r = A.read_shift(2)), O;
  }
  function c(A, z, L) {
    var O = A.l + z, X = l(A, z, L);
    if (X[1].t = "s", L.vers == 20768) {
      A.l++;
      var le = A.read_shift(1);
      return X[1].v = A.read_shift(le, "utf8"), X;
    }
    return L.qpro && A.l++, X[1].v = A.read_shift(O - A.l, "cstr"), X;
  }
  function f(A, z, L) {
    var O = ce(7 + L.length);
    O.write_shift(1, 255), O.write_shift(2, z), O.write_shift(2, A), O.write_shift(1, 39);
    for (var X = 0; X < O.length; ++X) {
      var le = L.charCodeAt(X);
      O.write_shift(1, le >= 128 ? 95 : le);
    }
    return O.write_shift(1, 0), O;
  }
  function h(A, z, L) {
    var O = l(A, z, L);
    return O[1].v = A.read_shift(2, "i"), O;
  }
  function d(A, z, L) {
    var O = ce(7);
    return O.write_shift(1, 255), O.write_shift(2, z), O.write_shift(2, A), O.write_shift(2, L, "i"), O;
  }
  function p(A, z, L) {
    var O = l(A, z, L);
    return O[1].v = A.read_shift(8, "f"), O;
  }
  function v(A, z, L) {
    var O = ce(13);
    return O.write_shift(1, 255), O.write_shift(2, z), O.write_shift(2, A), O.write_shift(8, L, "f"), O;
  }
  function g(A, z, L) {
    var O = A.l + z, X = l(A, z, L);
    if (X[1].v = A.read_shift(8, "f"), L.qpro) A.l = O;
    else {
      var le = A.read_shift(2);
      T(A.slice(A.l, A.l + le), X), A.l += le;
    }
    return X;
  }
  function x(A, z, L) {
    var O = z & 32768;
    return z &= -32769, z = (O ? A : 0) + (z >= 8192 ? z - 16384 : z), (O ? "" : "$") + (L ? It(z) : Nt(z));
  }
  var y = {
    51: ["FALSE", 0],
    52: ["TRUE", 0],
    70: ["LEN", 1],
    80: ["SUM", 69],
    81: ["AVERAGEA", 69],
    82: ["COUNTA", 69],
    83: ["MINA", 69],
    84: ["MAXA", 69],
    111: ["T", 1]
  }, m = [
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
  function T(A, z) {
    Wt(A, 0);
    for (var L = [], O = 0, X = "", le = "", pe = "", me = ""; A.l < A.length; ) {
      var he = A[A.l++];
      switch (he) {
        case 0:
          L.push(A.read_shift(8, "f"));
          break;
        case 1:
          le = x(z[0].c, A.read_shift(2), !0), X = x(z[0].r, A.read_shift(2), !1), L.push(le + X);
          break;
        case 2:
          {
            var ue = x(z[0].c, A.read_shift(2), !0), Z = x(z[0].r, A.read_shift(2), !1);
            le = x(z[0].c, A.read_shift(2), !0), X = x(z[0].r, A.read_shift(2), !1), L.push(ue + Z + ":" + le + X);
          }
          break;
        case 3:
          if (A.l < A.length) {
            console.error("WK1 premature formula end");
            return;
          }
          break;
        case 4:
          L.push("(" + L.pop() + ")");
          break;
        case 5:
          L.push(A.read_shift(2));
          break;
        case 6:
          {
            for (var _e = ""; he = A[A.l++]; ) _e += String.fromCharCode(he);
            L.push('"' + _e.replace(/"/g, '""') + '"');
          }
          break;
        case 8:
          L.push("-" + L.pop());
          break;
        case 23:
          L.push("+" + L.pop());
          break;
        case 22:
          L.push("NOT(" + L.pop() + ")");
          break;
        case 20:
        case 21:
          me = L.pop(), pe = L.pop(), L.push(["AND", "OR"][he - 20] + "(" + pe + "," + me + ")");
          break;
        default:
          if (he < 32 && m[he])
            me = L.pop(), pe = L.pop(), L.push(pe + m[he] + me);
          else if (y[he]) {
            if (O = y[he][1], O == 69 && (O = A[A.l++]), O > L.length) {
              console.error("WK1 bad formula parse 0x" + he.toString(16) + ":|" + L.join("|") + "|");
              return;
            }
            var F = L.slice(-O);
            L.length -= O, L.push(y[he][0] + "(" + F.join(",") + ")");
          } else return he <= 7 ? console.error("WK1 invalid opcode " + he.toString(16)) : he <= 24 ? console.error("WK1 unsupported op " + he.toString(16)) : he <= 30 ? console.error("WK1 invalid opcode " + he.toString(16)) : he <= 115 ? console.error("WK1 unsupported function opcode " + he.toString(16)) : console.error("WK1 unrecognized opcode " + he.toString(16));
      }
    }
    L.length == 1 ? z[1].f = "" + L[0] : console.error("WK1 bad formula parse |" + L.join("|") + "|");
  }
  function Y(A) {
    var z = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0];
    return z[0].r = A.read_shift(2), z[3] = A[A.l++], z[0].c = A[A.l++], z;
  }
  function Q(A, z) {
    var L = Y(A);
    return L[1].t = "s", L[1].v = A.read_shift(z - 4, "cstr"), L;
  }
  function R(A, z, L, O) {
    var X = ce(6 + O.length);
    X.write_shift(2, A), X.write_shift(1, L), X.write_shift(1, z), X.write_shift(1, 39);
    for (var le = 0; le < O.length; ++le) {
      var pe = O.charCodeAt(le);
      X.write_shift(1, pe >= 128 ? 95 : pe);
    }
    return X.write_shift(1, 0), X;
  }
  function V(A, z) {
    var L = Y(A);
    L[1].v = A.read_shift(2);
    var O = L[1].v >> 1;
    if (L[1].v & 1)
      switch (O & 7) {
        case 0:
          O = (O >> 3) * 5e3;
          break;
        case 1:
          O = (O >> 3) * 500;
          break;
        case 2:
          O = (O >> 3) / 20;
          break;
        case 3:
          O = (O >> 3) / 200;
          break;
        case 4:
          O = (O >> 3) / 2e3;
          break;
        case 5:
          O = (O >> 3) / 2e4;
          break;
        case 6:
          O = (O >> 3) / 16;
          break;
        case 7:
          O = (O >> 3) / 64;
          break;
      }
    return L[1].v = O, L;
  }
  function P(A, z) {
    var L = Y(A), O = A.read_shift(4), X = A.read_shift(4), le = A.read_shift(2);
    if (le == 65535)
      return O === 0 && X === 3221225472 ? (L[1].t = "e", L[1].v = 15) : O === 0 && X === 3489660928 ? (L[1].t = "e", L[1].v = 42) : L[1].v = 0, L;
    var pe = le & 32768;
    return le = (le & 32767) - 16446, L[1].v = (1 - pe * 2) * (X * Math.pow(2, le + 32) + O * Math.pow(2, le)), L;
  }
  function H(A, z, L, O) {
    var X = ce(14);
    if (X.write_shift(2, A), X.write_shift(1, L), X.write_shift(1, z), O == 0)
      return X.write_shift(4, 0), X.write_shift(4, 0), X.write_shift(2, 65535), X;
    var le = 0, pe = 0, me = 0, he = 0;
    return O < 0 && (le = 1, O = -O), pe = Math.log2(O) | 0, O /= Math.pow(2, pe - 31), he = O >>> 0, he & 2147483648 || (O /= 2, ++pe, he = O >>> 0), O -= he, he |= 2147483648, he >>>= 0, O *= Math.pow(2, 32), me = O >>> 0, X.write_shift(4, me), X.write_shift(4, he), pe += 16383 + (le ? 32768 : 0), X.write_shift(2, pe), X;
  }
  function G(A, z) {
    var L = P(A);
    return A.l += z - 14, L;
  }
  function C(A, z) {
    var L = Y(A), O = A.read_shift(4);
    return L[1].v = O >> 6, L;
  }
  function se(A, z) {
    var L = Y(A), O = A.read_shift(8, "f");
    return L[1].v = O, L;
  }
  function w(A, z) {
    var L = se(A);
    return A.l += z - 10, L;
  }
  function U(A, z) {
    return A[A.l + z - 1] == 0 ? A.read_shift(z, "cstr") : "";
  }
  function I(A, z) {
    var L = A[A.l++];
    L > z - 1 && (L = z - 1);
    for (var O = ""; O.length < L; ) O += String.fromCharCode(A[A.l++]);
    return O;
  }
  function j(A, z, L) {
    if (!(!L.qpro || z < 21)) {
      var O = A.read_shift(1);
      A.l += 17, A.l += 1, A.l += 2;
      var X = A.read_shift(z - 21, "cstr");
      return [O, X];
    }
  }
  function K(A, z) {
    for (var L = {}, O = A.l + z; A.l < O; ) {
      var X = A.read_shift(2);
      if (X == 14e3) {
        for (L[X] = [0, ""], L[X][0] = A.read_shift(2); A[A.l]; )
          L[X][1] += String.fromCharCode(A[A.l]), A.l++;
        A.l++;
      }
    }
    return L;
  }
  function ee(A, z) {
    var L = ce(5 + A.length);
    L.write_shift(2, 14e3), L.write_shift(2, z);
    for (var O = 0; O < A.length; ++O) {
      var X = A.charCodeAt(O);
      L[L.l++] = X > 127 ? 95 : X;
    }
    return L[L.l++] = 0, L;
  }
  var J = {
    /*::[*/
    0: { n: "BOF", f: qc },
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
    6: { n: "RANGE", f: s },
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
    13: { n: "INTEGER", f: h },
    /*::[*/
    14: { n: "NUMBER", f: p },
    /*::[*/
    15: { n: "LABEL", f: c },
    /*::[*/
    16: { n: "FORMULA", f: g },
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
    204: { n: "SHEETNAMECS", f: U },
    /*::[*/
    222: { n: "SHEETNAMELP", f: I },
    /*::[*/
    65535: { n: "" }
  }, de = {
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
    22: { n: "LABEL16", f: Q },
    /*::[*/
    23: { n: "NUMBER17", f: P },
    /*::[*/
    24: { n: "NUMBER18", f: V },
    /*::[*/
    25: { n: "FORMULA19", f: G },
    /*::[*/
    26: { n: "FORMULA1A" },
    /*::[*/
    27: { n: "XFORMAT", f: K },
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
    37: { n: "NUMBER25", f: C },
    /*::[*/
    38: { n: "??" },
    /*::[*/
    39: { n: "NUMBER27", f: se },
    /*::[*/
    40: { n: "FORMULA28", f: w },
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
    204: { n: "SHEETNAMECS", f: U },
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
    1537: { n: "SHEETINFOQP", f: j },
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
    sheet_to_wk1: r,
    book_to_wk3: i,
    to_workbook: t
  };
}(), ip = /^\s|\s$|[\t\n\r]/;
function nf(e, t) {
  if (!t.bookSST) return "";
  var n = [gt];
  n[n.length] = Te("sst", null, {
    xmlns: si[0],
    count: e.Count,
    uniqueCount: e.Unique
  });
  for (var r = 0; r != e.length; ++r)
    if (e[r] != null) {
      var i = e[r], a = "<si>";
      i.r ? a += i.r : (a += "<t", i.t || (i.t = ""), i.t.match(ip) && (a += ' xml:space="preserve"'), a += ">" + Je(i.t) + "</t>"), a += "</si>", n[n.length] = a;
    }
  return n.length > 2 && (n[n.length] = "</sst>", n[1] = n[1].replace("/>", ">")), n.join("");
}
function ap(e) {
  return [e.read_shift(4), e.read_shift(4)];
}
function op(e, t) {
  return t || (t = ce(8)), t.write_shift(4, e.Count), t.write_shift(4, e.Unique), t;
}
var sp = j1;
function lp(e) {
  var t = $t();
  ge(t, 159, op(e));
  for (var n = 0; n < e.length; ++n) ge(t, 19, sp(e[n]));
  return ge(
    t,
    160
    /* BrtEndSst */
  ), t.end();
}
function up(e) {
  for (var t = [], n = e.split(""), r = 0; r < n.length; ++r) t[r] = n[r].charCodeAt(0);
  return t;
}
function rf(e) {
  var t = 0, n, r = up(e), i = r.length + 1, a, o, s, u, l;
  for (n = yr(i), n[0] = r.length, a = 1; a != i; ++a) n[a] = r[a - 1];
  for (a = i - 1; a >= 0; --a)
    o = n[a], s = t & 16384 ? 1 : 0, u = t << 1 & 32767, l = s | u, t = l ^ o;
  return t ^ 52811;
}
var cp = /* @__PURE__ */ function() {
  function e(i, a) {
    switch (a.type) {
      case "base64":
        return t(Un(i), a);
      case "binary":
        return t(i, a);
      case "buffer":
        return t(Xe && Buffer.isBuffer(i) ? i.toString("binary") : ea(i), a);
      case "array":
        return t(Oo(i), a);
    }
    throw new Error("Unrecognized type " + a.type);
  }
  function t(i, a) {
    var o = a || {}, s = o.dense ? [] : {}, u = i.match(/\\trowd.*?\\row\b/g);
    if (!u.length) throw new Error("RTF missing table");
    var l = { s: { c: 0, r: 0 }, e: { c: 0, r: u.length - 1 } };
    return u.forEach(function(c, f) {
      Array.isArray(s) && (s[f] = []);
      for (var h = /\\\w+\b/g, d = 0, p, v = -1; p = h.exec(c); ) {
        switch (p[0]) {
          case "\\cell":
            var g = c.slice(d, h.lastIndex - p[0].length);
            if (g[0] == " " && (g = g.slice(1)), ++v, g.length) {
              var x = { v: g, t: "s" };
              Array.isArray(s) ? s[f][v] = x : s[Qe({ r: f, c: v })] = x;
            }
            break;
        }
        d = h.lastIndex;
      }
      v > l.e.c && (l.e.c = v);
    }), s["!ref"] = pt(l), s;
  }
  function n(i, a) {
    return kr(e(i, a), a);
  }
  function r(i) {
    for (var a = ["{\\rtf1\\ansi"], o = rt(i["!ref"]), s, u = Array.isArray(i), l = o.s.r; l <= o.e.r; ++l) {
      a.push("\\trowd\\trautofit1");
      for (var c = o.s.c; c <= o.e.c; ++c) a.push("\\cellx" + (c + 1));
      for (a.push("\\pard\\intbl"), c = o.s.c; c <= o.e.c; ++c) {
        var f = Qe({ r: l, c });
        s = u ? (i[l] || [])[c] : i[f], !(!s || s.v == null && (!s.f || s.F)) && (a.push(" " + (s.w || (zn(s), s.w))), a.push("\\cell"));
      }
      a.push("\\pard\\intbl\\row");
    }
    return a.join("") + "}";
  }
  return {
    to_workbook: n,
    to_sheet: e,
    from_sheet: r
  };
}();
function Ru(e) {
  for (var t = 0, n = 1; t != 3; ++t) n = n * 256 + (e[t] > 255 ? 255 : e[t] < 0 ? 0 : e[t]);
  return n.toString(16).toUpperCase().slice(1);
}
var fp = 6, $n = fp;
function ro(e) {
  return Math.floor((e + Math.round(128 / $n) / 256) * $n);
}
function io(e) {
  return Math.floor((e - 5) / $n * 100 + 0.5) / 100;
}
function As(e) {
  return Math.round((e * $n + 5) / $n * 256) / 256;
}
function hl(e) {
  e.width ? (e.wpx = ro(e.width), e.wch = io(e.wpx), e.MDW = $n) : e.wpx ? (e.wch = io(e.wpx), e.width = As(e.wch), e.MDW = $n) : typeof e.wch == "number" && (e.width = As(e.wch), e.wpx = ro(e.width), e.MDW = $n), e.customWidth && delete e.customWidth;
}
var hp = 96, af = hp;
function ao(e) {
  return e * 96 / af;
}
function of(e) {
  return e * af / 96;
}
function dp(e) {
  var t = ["<numFmts>"];
  return [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(n) {
    for (var r = n[0]; r <= n[1]; ++r) e[r] != null && (t[t.length] = Te("numFmt", null, { numFmtId: r, formatCode: Je(e[r]) }));
  }), t.length === 1 ? "" : (t[t.length] = "</numFmts>", t[0] = Te("numFmts", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
function vp(e) {
  var t = [];
  return t[t.length] = Te("cellXfs", null), e.forEach(function(n) {
    t[t.length] = Te("xf", null, n);
  }), t[t.length] = "</cellXfs>", t.length === 2 ? "" : (t[0] = Te("cellXfs", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
function sf(e, t) {
  var n = [gt, Te("styleSheet", null, {
    xmlns: si[0],
    "xmlns:vt": wt.vt
  })], r;
  return e.SSF && (r = dp(e.SSF)) != null && (n[n.length] = r), n[n.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>', n[n.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>', n[n.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>', n[n.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>', (r = vp(t.cellXfs)) && (n[n.length] = r), n[n.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>', n[n.length] = '<dxfs count="0"/>', n[n.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>', n.length > 2 && (n[n.length] = "</styleSheet>", n[1] = n[1].replace("/>", ">")), n.join("");
}
function pp(e, t) {
  var n = e.read_shift(2), r = Ot(e);
  return [n, r];
}
function gp(e, t, n) {
  n || (n = ce(6 + 4 * t.length)), n.write_shift(2, e), Et(t, n);
  var r = n.length > n.l ? n.slice(0, n.l) : n;
  return n.l == null && (n.l = n.length), r;
}
function mp(e, t, n) {
  var r = {};
  r.sz = e.read_shift(2) / 20;
  var i = iv(e);
  i.fItalic && (r.italic = 1), i.fCondense && (r.condense = 1), i.fExtend && (r.extend = 1), i.fShadow && (r.shadow = 1), i.fOutline && (r.outline = 1), i.fStrikeout && (r.strike = 1);
  var a = e.read_shift(2);
  switch (a === 700 && (r.bold = 1), e.read_shift(2)) {
    case 1:
      r.vertAlign = "superscript";
      break;
    case 2:
      r.vertAlign = "subscript";
      break;
  }
  var o = e.read_shift(1);
  o != 0 && (r.underline = o);
  var s = e.read_shift(1);
  s > 0 && (r.family = s);
  var u = e.read_shift(1);
  switch (u > 0 && (r.charset = u), e.l++, r.color = rv(e), e.read_shift(1)) {
    case 1:
      r.scheme = "major";
      break;
    case 2:
      r.scheme = "minor";
      break;
  }
  return r.name = Ot(e), r;
}
function xp(e, t) {
  t || (t = ce(25 + 4 * 32)), t.write_shift(2, e.sz * 20), av(e, t), t.write_shift(2, e.bold ? 700 : 400);
  var n = 0;
  e.vertAlign == "superscript" ? n = 1 : e.vertAlign == "subscript" && (n = 2), t.write_shift(2, n), t.write_shift(1, e.underline || 0), t.write_shift(1, e.family || 0), t.write_shift(1, e.charset || 0), t.write_shift(1, 0), to(e.color, t);
  var r = 0;
  return r = 2, t.write_shift(1, r), Et(e.name, t), t.length > t.l ? t.slice(0, t.l) : t;
}
var _p = [
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
], rs, wp = An;
function Pu(e, t) {
  t || (t = ce(4 * 3 + 8 * 7 + 16 * 1)), rs || (rs = el(_p));
  var n = rs[e.patternType];
  n == null && (n = 40), t.write_shift(4, n);
  var r = 0;
  if (n != 40)
    for (to({ auto: 1 }, t), to({ auto: 1 }, t); r < 12; ++r) t.write_shift(4, 0);
  else {
    for (; r < 4; ++r) t.write_shift(4, 0);
    for (; r < 12; ++r) t.write_shift(4, 0);
  }
  return t.length > t.l ? t.slice(0, t.l) : t;
}
function yp(e, t) {
  var n = e.l + t, r = e.read_shift(2), i = e.read_shift(2);
  return e.l = n, { ixfe: r, numFmtId: i };
}
function lf(e, t, n) {
  n || (n = ce(16)), n.write_shift(2, t || 0), n.write_shift(2, e.numFmtId || 0), n.write_shift(2, 0), n.write_shift(2, 0), n.write_shift(2, 0), n.write_shift(1, 0), n.write_shift(1, 0);
  var r = 0;
  return n.write_shift(1, r), n.write_shift(1, 0), n.write_shift(1, 0), n.write_shift(1, 0), n;
}
function vi(e, t) {
  return t || (t = ce(10)), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var Ep = An;
function Tp(e, t) {
  return t || (t = ce(51)), t.write_shift(1, 0), vi(null, t), vi(null, t), vi(null, t), vi(null, t), vi(null, t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Sp(e, t) {
  return t || (t = ce(12 + 4 * 10)), t.write_shift(4, e.xfId), t.write_shift(2, 1), t.write_shift(1, 0), t.write_shift(1, 0), eo(e.name || "", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Ap(e, t, n) {
  var r = ce(2052);
  return r.write_shift(4, e), eo(t, r), eo(n, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function Cp(e, t) {
  if (t) {
    var n = 0;
    [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(r) {
      for (var i = r[0]; i <= r[1]; ++i) t[i] != null && ++n;
    }), n != 0 && (ge(e, 615, un(n)), [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(r) {
      for (var i = r[0]; i <= r[1]; ++i) t[i] != null && ge(e, 44, gp(i, t[i]));
    }), ge(
      e,
      616
      /* BrtEndFmts */
    ));
  }
}
function Np(e) {
  var t = 1;
  ge(e, 611, un(t)), ge(e, 43, xp({
    sz: 12,
    color: { theme: 1 },
    name: "Calibri",
    family: 2
  })), ge(
    e,
    612
    /* BrtEndFonts */
  );
}
function Fp(e) {
  var t = 2;
  ge(e, 603, un(t)), ge(e, 45, Pu({ patternType: "none" })), ge(e, 45, Pu({ patternType: "gray125" })), ge(
    e,
    604
    /* BrtEndFills */
  );
}
function kp(e) {
  var t = 1;
  ge(e, 613, un(t)), ge(e, 46, Tp()), ge(
    e,
    614
    /* BrtEndBorders */
  );
}
function Ip(e) {
  var t = 1;
  ge(e, 626, un(t)), ge(e, 47, lf({
    numFmtId: 0
  }, 65535)), ge(
    e,
    627
    /* BrtEndCellStyleXFs */
  );
}
function Op(e, t) {
  ge(e, 617, un(t.length)), t.forEach(function(n) {
    ge(e, 47, lf(n, 0));
  }), ge(
    e,
    618
    /* BrtEndCellXFs */
  );
}
function Dp(e) {
  var t = 1;
  ge(e, 619, un(t)), ge(e, 48, Sp({
    xfId: 0,
    name: "Normal"
  })), ge(
    e,
    620
    /* BrtEndStyles */
  );
}
function bp(e) {
  var t = 0;
  ge(e, 505, un(t)), ge(
    e,
    506
    /* BrtEndDXFs */
  );
}
function Mp(e) {
  var t = 0;
  ge(e, 508, Ap(t, "TableStyleMedium9", "PivotStyleMedium4")), ge(
    e,
    509
    /* BrtEndTableStyles */
  );
}
function Rp(e, t) {
  var n = $t();
  return ge(
    n,
    278
    /* BrtBeginStyleSheet */
  ), Cp(n, e.SSF), Np(n), Fp(n), kp(n), Ip(n), Op(n, t.cellXfs), Dp(n), bp(n), Mp(n), ge(
    n,
    279
    /* BrtEndStyleSheet */
  ), n.end();
}
function uf(e, t) {
  if (t && t.themeXLSX) return t.themeXLSX;
  if (e && typeof e.raw == "string") return e.raw;
  var n = [gt];
  return n[n.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">', n[n.length] = "<a:themeElements>", n[n.length] = '<a:clrScheme name="Office">', n[n.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>', n[n.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>', n[n.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>', n[n.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>', n[n.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>', n[n.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>', n[n.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>', n[n.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>', n[n.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>', n[n.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>', n[n.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>', n[n.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>', n[n.length] = "</a:clrScheme>", n[n.length] = '<a:fontScheme name="Office">', n[n.length] = "<a:majorFont>", n[n.length] = '<a:latin typeface="Cambria"/>', n[n.length] = '<a:ea typeface=""/>', n[n.length] = '<a:cs typeface=""/>', n[n.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', n[n.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', n[n.length] = '<a:font script="Hans" typeface="宋体"/>', n[n.length] = '<a:font script="Hant" typeface="新細明體"/>', n[n.length] = '<a:font script="Arab" typeface="Times New Roman"/>', n[n.length] = '<a:font script="Hebr" typeface="Times New Roman"/>', n[n.length] = '<a:font script="Thai" typeface="Tahoma"/>', n[n.length] = '<a:font script="Ethi" typeface="Nyala"/>', n[n.length] = '<a:font script="Beng" typeface="Vrinda"/>', n[n.length] = '<a:font script="Gujr" typeface="Shruti"/>', n[n.length] = '<a:font script="Khmr" typeface="MoolBoran"/>', n[n.length] = '<a:font script="Knda" typeface="Tunga"/>', n[n.length] = '<a:font script="Guru" typeface="Raavi"/>', n[n.length] = '<a:font script="Cans" typeface="Euphemia"/>', n[n.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', n[n.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', n[n.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', n[n.length] = '<a:font script="Thaa" typeface="MV Boli"/>', n[n.length] = '<a:font script="Deva" typeface="Mangal"/>', n[n.length] = '<a:font script="Telu" typeface="Gautami"/>', n[n.length] = '<a:font script="Taml" typeface="Latha"/>', n[n.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', n[n.length] = '<a:font script="Orya" typeface="Kalinga"/>', n[n.length] = '<a:font script="Mlym" typeface="Kartika"/>', n[n.length] = '<a:font script="Laoo" typeface="DokChampa"/>', n[n.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', n[n.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', n[n.length] = '<a:font script="Viet" typeface="Times New Roman"/>', n[n.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', n[n.length] = '<a:font script="Geor" typeface="Sylfaen"/>', n[n.length] = "</a:majorFont>", n[n.length] = "<a:minorFont>", n[n.length] = '<a:latin typeface="Calibri"/>', n[n.length] = '<a:ea typeface=""/>', n[n.length] = '<a:cs typeface=""/>', n[n.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', n[n.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', n[n.length] = '<a:font script="Hans" typeface="宋体"/>', n[n.length] = '<a:font script="Hant" typeface="新細明體"/>', n[n.length] = '<a:font script="Arab" typeface="Arial"/>', n[n.length] = '<a:font script="Hebr" typeface="Arial"/>', n[n.length] = '<a:font script="Thai" typeface="Tahoma"/>', n[n.length] = '<a:font script="Ethi" typeface="Nyala"/>', n[n.length] = '<a:font script="Beng" typeface="Vrinda"/>', n[n.length] = '<a:font script="Gujr" typeface="Shruti"/>', n[n.length] = '<a:font script="Khmr" typeface="DaunPenh"/>', n[n.length] = '<a:font script="Knda" typeface="Tunga"/>', n[n.length] = '<a:font script="Guru" typeface="Raavi"/>', n[n.length] = '<a:font script="Cans" typeface="Euphemia"/>', n[n.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', n[n.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', n[n.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', n[n.length] = '<a:font script="Thaa" typeface="MV Boli"/>', n[n.length] = '<a:font script="Deva" typeface="Mangal"/>', n[n.length] = '<a:font script="Telu" typeface="Gautami"/>', n[n.length] = '<a:font script="Taml" typeface="Latha"/>', n[n.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', n[n.length] = '<a:font script="Orya" typeface="Kalinga"/>', n[n.length] = '<a:font script="Mlym" typeface="Kartika"/>', n[n.length] = '<a:font script="Laoo" typeface="DokChampa"/>', n[n.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', n[n.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', n[n.length] = '<a:font script="Viet" typeface="Arial"/>', n[n.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', n[n.length] = '<a:font script="Geor" typeface="Sylfaen"/>', n[n.length] = "</a:minorFont>", n[n.length] = "</a:fontScheme>", n[n.length] = '<a:fmtScheme name="Office">', n[n.length] = "<a:fillStyleLst>", n[n.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', n[n.length] = '<a:gradFill rotWithShape="1">', n[n.length] = "<a:gsLst>", n[n.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', n[n.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', n[n.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', n[n.length] = "</a:gsLst>", n[n.length] = '<a:lin ang="16200000" scaled="1"/>', n[n.length] = "</a:gradFill>", n[n.length] = '<a:gradFill rotWithShape="1">', n[n.length] = "<a:gsLst>", n[n.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>', n[n.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', n[n.length] = "</a:gsLst>", n[n.length] = '<a:lin ang="16200000" scaled="0"/>', n[n.length] = "</a:gradFill>", n[n.length] = "</a:fillStyleLst>", n[n.length] = "<a:lnStyleLst>", n[n.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>', n[n.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', n[n.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', n[n.length] = "</a:lnStyleLst>", n[n.length] = "<a:effectStyleLst>", n[n.length] = "<a:effectStyle>", n[n.length] = "<a:effectLst>", n[n.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>', n[n.length] = "</a:effectLst>", n[n.length] = "</a:effectStyle>", n[n.length] = "<a:effectStyle>", n[n.length] = "<a:effectLst>", n[n.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', n[n.length] = "</a:effectLst>", n[n.length] = "</a:effectStyle>", n[n.length] = "<a:effectStyle>", n[n.length] = "<a:effectLst>", n[n.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', n[n.length] = "</a:effectLst>", n[n.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>', n[n.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>', n[n.length] = "</a:effectStyle>", n[n.length] = "</a:effectStyleLst>", n[n.length] = "<a:bgFillStyleLst>", n[n.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', n[n.length] = '<a:gradFill rotWithShape="1">', n[n.length] = "<a:gsLst>", n[n.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', n[n.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', n[n.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>', n[n.length] = "</a:gsLst>", n[n.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>', n[n.length] = "</a:gradFill>", n[n.length] = '<a:gradFill rotWithShape="1">', n[n.length] = "<a:gsLst>", n[n.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', n[n.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>', n[n.length] = "</a:gsLst>", n[n.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>', n[n.length] = "</a:gradFill>", n[n.length] = "</a:bgFillStyleLst>", n[n.length] = "</a:fmtScheme>", n[n.length] = "</a:themeElements>", n[n.length] = "<a:objectDefaults>", n[n.length] = "<a:spDef>", n[n.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>', n[n.length] = "</a:spDef>", n[n.length] = "<a:lnDef>", n[n.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>', n[n.length] = "</a:lnDef>", n[n.length] = "</a:objectDefaults>", n[n.length] = "<a:extraClrSchemeLst/>", n[n.length] = "</a:theme>", n.join("");
}
function Pp(e, t) {
  return {
    flags: e.read_shift(4),
    version: e.read_shift(4),
    name: Ot(e)
  };
}
function Lp(e) {
  var t = ce(12 + 2 * e.name.length);
  return t.write_shift(4, e.flags), t.write_shift(4, e.version), Et(e.name, t), t.slice(0, t.l);
}
function Bp(e) {
  for (var t = [], n = e.read_shift(4); n-- > 0; )
    t.push([e.read_shift(4), e.read_shift(4)]);
  return t;
}
function $p(e) {
  var t = ce(4 + 8 * e.length);
  t.write_shift(4, e.length);
  for (var n = 0; n < e.length; ++n)
    t.write_shift(4, e[n][0]), t.write_shift(4, e[n][1]);
  return t;
}
function Up(e, t) {
  var n = ce(8 + 2 * t.length);
  return n.write_shift(4, e), Et(t, n), n.slice(0, n.l);
}
function zp(e) {
  return e.l += 4, e.read_shift(4) != 0;
}
function Hp(e, t) {
  var n = ce(8);
  return n.write_shift(4, e), n.write_shift(4, 1), n;
}
function Vp() {
  var e = $t();
  return ge(e, 332), ge(e, 334, un(1)), ge(e, 335, Lp({
    name: "XLDAPR",
    version: 12e4,
    flags: 3496657072
  })), ge(e, 336), ge(e, 339, Up(1, "XLDAPR")), ge(e, 52), ge(e, 35, un(514)), ge(e, 4096, un(0)), ge(e, 4097, Qt(1)), ge(e, 36), ge(e, 53), ge(e, 340), ge(e, 337, Hp(1)), ge(e, 51, $p([[1, 0]])), ge(e, 338), ge(e, 333), e.end();
}
function cf() {
  var e = [gt];
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
function Wp(e) {
  var t = {};
  t.i = e.read_shift(4);
  var n = {};
  n.r = e.read_shift(4), n.c = e.read_shift(4), t.r = Qe(n);
  var r = e.read_shift(1);
  return r & 2 && (t.l = "1"), r & 8 && (t.a = "1"), t;
}
var Wr = 1024;
function ff(e, t) {
  for (var n = [21600, 21600], r = ["m0,0l0", n[1], n[0], n[1], n[0], "0xe"].join(","), i = [
    Te("xml", null, { "xmlns:v": Gt.v, "xmlns:o": Gt.o, "xmlns:x": Gt.x, "xmlns:mv": Gt.mv }).replace(/\/>/, ">"),
    Te("o:shapelayout", Te("o:idmap", null, { "v:ext": "edit", data: e }), { "v:ext": "edit" }),
    Te("v:shapetype", [
      Te("v:stroke", null, { joinstyle: "miter" }),
      Te("v:path", null, { gradientshapeok: "t", "o:connecttype": "rect" })
    ].join(""), { id: "_x0000_t202", "o:spt": 202, coordsize: n.join(","), path: r })
  ]; Wr < e * 1e3; ) Wr += 1e3;
  return t.forEach(function(a) {
    var o = yt(a[0]), s = (
      /*::(*/
      { color2: "#BEFF82", type: "gradient" }
    );
    s.type == "gradient" && (s.angle = "-180");
    var u = s.type == "gradient" ? Te("o:fill", null, { type: "gradientUnscaled", "v:ext": "view" }) : null, l = Te("v:fill", u, s), c = { on: "t", obscured: "t" };
    ++Wr, i = i.concat([
      "<v:shape" + Bi({
        id: "_x0000_s" + Wr,
        type: "#_x0000_t202",
        style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" + (a[1].hidden ? ";visibility:hidden" : ""),
        fillcolor: "#ECFAD4",
        strokecolor: "#edeaa1"
      }) + ">",
      l,
      Te("v:shadow", null, c),
      Te("v:path", null, { "o:connecttype": "none" }),
      '<v:textbox><div style="text-align:left"></div></v:textbox>',
      '<x:ClientData ObjectType="Note">',
      "<x:MoveWithCells/>",
      "<x:SizeWithCells/>",
      /* Part 4 19.4.2.3 Anchor (Anchor) */
      Ct("x:Anchor", [o.c + 1, 0, o.r + 1, 0, o.c + 3, 20, o.r + 5, 20].join(",")),
      Ct("x:AutoFill", "False"),
      Ct("x:Row", String(o.r)),
      Ct("x:Column", String(o.c)),
      a[1].hidden ? "" : "<x:Visible/>",
      "</x:ClientData>",
      "</v:shape>"
    ]);
  }), i.push("</xml>"), i.join("");
}
function hf(e) {
  var t = [gt, Te("comments", null, { xmlns: si[0] })], n = [];
  return t.push("<authors>"), e.forEach(function(r) {
    r[1].forEach(function(i) {
      var a = Je(i.a);
      n.indexOf(a) == -1 && (n.push(a), t.push("<author>" + a + "</author>")), i.T && i.ID && n.indexOf("tc=" + i.ID) == -1 && (n.push("tc=" + i.ID), t.push("<author>tc=" + i.ID + "</author>"));
    });
  }), n.length == 0 && (n.push("SheetJ5"), t.push("<author>SheetJ5</author>")), t.push("</authors>"), t.push("<commentList>"), e.forEach(function(r) {
    var i = 0, a = [];
    if (r[1][0] && r[1][0].T && r[1][0].ID ? i = n.indexOf("tc=" + r[1][0].ID) : r[1].forEach(function(u) {
      u.a && (i = n.indexOf(Je(u.a))), a.push(u.t || "");
    }), t.push('<comment ref="' + r[0] + '" authorId="' + i + '"><text>'), a.length <= 1) t.push(Ct("t", Je(a[0] || "")));
    else {
      for (var o = `Comment:
    ` + a[0] + `
`, s = 1; s < a.length; ++s) o += `Reply:
    ` + a[s] + `
`;
      t.push(Ct("t", Je(o)));
    }
    t.push("</text></comment>");
  }), t.push("</commentList>"), t.length > 2 && (t[t.length] = "</comments>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function Gp(e, t, n) {
  var r = [gt, Te("ThreadedComments", null, { xmlns: wt.TCMNT }).replace(/[\/]>/, ">")];
  return e.forEach(function(i) {
    var a = "";
    (i[1] || []).forEach(function(o, s) {
      if (!o.T) {
        delete o.ID;
        return;
      }
      o.a && t.indexOf(o.a) == -1 && t.push(o.a);
      var u = {
        ref: i[0],
        id: "{54EE7951-7262-4200-6969-" + ("000000000000" + n.tcid++).slice(-12) + "}"
      };
      s == 0 ? a = u.id : u.parentId = a, o.ID = u.id, o.a && (u.personId = "{54EE7950-7262-4200-6969-" + ("000000000000" + t.indexOf(o.a)).slice(-12) + "}"), r.push(Te("threadedComment", Ct("text", o.t || ""), u));
    });
  }), r.push("</ThreadedComments>"), r.join("");
}
function Xp(e) {
  var t = [gt, Te("personList", null, {
    xmlns: wt.TCMNT,
    "xmlns:x": si[0]
  }).replace(/[\/]>/, ">")];
  return e.forEach(function(n, r) {
    t.push(Te("person", null, {
      displayName: n,
      id: "{54EE7950-7262-4200-6969-" + ("000000000000" + r).slice(-12) + "}",
      userId: n,
      providerId: "None"
    }));
  }), t.push("</personList>"), t.join("");
}
function Yp(e) {
  var t = {};
  t.iauthor = e.read_shift(4);
  var n = br(e);
  return t.rfx = n.s, t.ref = Qe(n.s), e.l += 16, t;
}
function Kp(e, t) {
  return t == null && (t = ce(36)), t.write_shift(4, e[1].iauthor), ui(e[0], t), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var Zp = Ot;
function qp(e) {
  return Et(e.slice(0, 54));
}
function jp(e) {
  var t = $t(), n = [];
  return ge(
    t,
    628
    /* BrtBeginComments */
  ), ge(
    t,
    630
    /* BrtBeginCommentAuthors */
  ), e.forEach(function(r) {
    r[1].forEach(function(i) {
      n.indexOf(i.a) > -1 || (n.push(i.a.slice(0, 54)), ge(t, 632, qp(i.a)));
    });
  }), ge(
    t,
    631
    /* BrtEndCommentAuthors */
  ), ge(
    t,
    633
    /* BrtBeginCommentList */
  ), e.forEach(function(r) {
    r[1].forEach(function(i) {
      i.iauthor = n.indexOf(i.a);
      var a = { s: yt(r[0]), e: yt(r[0]) };
      ge(t, 635, Kp([a, i])), i.t && i.t.length > 0 && ge(t, 637, Q1(i)), ge(
        t,
        636
        /* BrtEndComment */
      ), delete i.iauthor;
    });
  }), ge(
    t,
    634
    /* BrtEndCommentList */
  ), ge(
    t,
    629
    /* BrtEndComments */
  ), t.end();
}
function Jp(e, t) {
  t.FullPaths.forEach(function(n, r) {
    if (r != 0) {
      var i = n.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
      i.slice(-1) !== "/" && et.utils.cfb_add(e, i, t.FileIndex[r].content);
    }
  });
}
var df = ["xlsb", "xlsm", "xlam", "biff8", "xla"], Qp = /* @__PURE__ */ function() {
  var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g, t = { r: 0, c: 0 };
  function n(r, i, a, o) {
    var s = !1, u = !1;
    a.length == 0 ? u = !0 : a.charAt(0) == "[" && (u = !0, a = a.slice(1, -1)), o.length == 0 ? s = !0 : o.charAt(0) == "[" && (s = !0, o = o.slice(1, -1));
    var l = a.length > 0 ? parseInt(a, 10) | 0 : 0, c = o.length > 0 ? parseInt(o, 10) | 0 : 0;
    return s ? c += t.c : --c, u ? l += t.r : --l, i + (s ? "" : "$") + It(c) + (u ? "" : "$") + Nt(l);
  }
  return function(i, a) {
    return t = a, i.replace(e, n);
  };
}(), dl = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g, vl = /* @__PURE__ */ function() {
  return function(t, n) {
    return t.replace(dl, function(r, i, a, o, s, u) {
      var l = sl(o) - (a ? 0 : n.c), c = ol(u) - (s ? 0 : n.r), f = c == 0 ? "" : s ? c + 1 : "[" + c + "]", h = l == 0 ? "" : a ? l + 1 : "[" + l + "]";
      return i + "R" + f + "C" + h;
    });
  };
}();
function eg(e, t) {
  return e.replace(dl, function(n, r, i, a, o, s) {
    return r + (i == "$" ? i + a : It(sl(a) + t.c)) + (o == "$" ? o + s : Nt(ol(s) + t.r));
  });
}
function tg(e) {
  return e.length != 1;
}
function ht(e) {
  e.l += 1;
}
function rr(e, t) {
  var n = e.read_shift(2);
  return [n & 16383, n >> 14 & 1, n >> 15 & 1];
}
function vf(e, t, n) {
  var r = 2;
  if (n) {
    if (n.biff >= 2 && n.biff <= 5) return pf(e);
    n.biff == 12 && (r = 4);
  }
  var i = e.read_shift(r), a = e.read_shift(r), o = rr(e), s = rr(e);
  return { s: { r: i, c: o[0], cRel: o[1], rRel: o[2] }, e: { r: a, c: s[0], cRel: s[1], rRel: s[2] } };
}
function pf(e) {
  var t = rr(e), n = rr(e), r = e.read_shift(1), i = e.read_shift(1);
  return { s: { r: t[0], c: r, cRel: t[1], rRel: t[2] }, e: { r: n[0], c: i, cRel: n[1], rRel: n[2] } };
}
function ng(e, t, n) {
  if (n.biff < 8) return pf(e);
  var r = e.read_shift(n.biff == 12 ? 4 : 2), i = e.read_shift(n.biff == 12 ? 4 : 2), a = rr(e), o = rr(e);
  return { s: { r, c: a[0], cRel: a[1], rRel: a[2] }, e: { r: i, c: o[0], cRel: o[1], rRel: o[2] } };
}
function gf(e, t, n) {
  if (n && n.biff >= 2 && n.biff <= 5) return rg(e);
  var r = e.read_shift(n && n.biff == 12 ? 4 : 2), i = rr(e);
  return { r, c: i[0], cRel: i[1], rRel: i[2] };
}
function rg(e) {
  var t = rr(e), n = e.read_shift(1);
  return { r: t[0], c: n, cRel: t[1], rRel: t[2] };
}
function ig(e) {
  var t = e.read_shift(2), n = e.read_shift(2);
  return { r: t, c: n & 255, fQuoted: !!(n & 16384), cRel: n >> 15, rRel: n >> 15 };
}
function ag(e, t, n) {
  var r = n && n.biff ? n.biff : 8;
  if (r >= 2 && r <= 5) return og(e);
  var i = e.read_shift(r >= 12 ? 4 : 2), a = e.read_shift(2), o = (a & 16384) >> 14, s = (a & 32768) >> 15;
  if (a &= 16383, s == 1) for (; i > 524287; ) i -= 1048576;
  if (o == 1) for (; a > 8191; ) a = a - 16384;
  return { r: i, c: a, cRel: o, rRel: s };
}
function og(e) {
  var t = e.read_shift(2), n = e.read_shift(1), r = (t & 32768) >> 15, i = (t & 16384) >> 14;
  return t &= 16383, r == 1 && t >= 8192 && (t = t - 16384), i == 1 && n >= 128 && (n = n - 256), { r: t, c: n, cRel: i, rRel: r };
}
function sg(e, t, n) {
  var r = (e[e.l++] & 96) >> 5, i = vf(e, n.biff >= 2 && n.biff <= 5 ? 6 : 8, n);
  return [r, i];
}
function lg(e, t, n) {
  var r = (e[e.l++] & 96) >> 5, i = e.read_shift(2, "i"), a = 8;
  if (n) switch (n.biff) {
    case 5:
      e.l += 12, a = 6;
      break;
    case 12:
      a = 12;
      break;
  }
  var o = vf(e, a, n);
  return [r, i, o];
}
function ug(e, t, n) {
  var r = (e[e.l++] & 96) >> 5;
  return e.l += n && n.biff > 8 ? 12 : n.biff < 8 ? 6 : 8, [r];
}
function cg(e, t, n) {
  var r = (e[e.l++] & 96) >> 5, i = e.read_shift(2), a = 8;
  if (n) switch (n.biff) {
    case 5:
      e.l += 12, a = 6;
      break;
    case 12:
      a = 12;
      break;
  }
  return e.l += a, [r, i];
}
function fg(e, t, n) {
  var r = (e[e.l++] & 96) >> 5, i = ng(e, t - 1, n);
  return [r, i];
}
function hg(e, t, n) {
  var r = (e[e.l++] & 96) >> 5;
  return e.l += n.biff == 2 ? 6 : n.biff == 12 ? 14 : 7, [r];
}
function Lu(e) {
  var t = e[e.l + 1] & 1, n = 1;
  return e.l += 4, [t, n];
}
function dg(e, t, n) {
  e.l += 2;
  for (var r = e.read_shift(n && n.biff == 2 ? 1 : 2), i = [], a = 0; a <= r; ++a) i.push(e.read_shift(n && n.biff == 2 ? 1 : 2));
  return i;
}
function vg(e, t, n) {
  var r = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [r, e.read_shift(n && n.biff == 2 ? 1 : 2)];
}
function pg(e, t, n) {
  var r = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [r, e.read_shift(n && n.biff == 2 ? 1 : 2)];
}
function gg(e) {
  var t = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [t, e.read_shift(2)];
}
function mg(e, t, n) {
  var r = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += n && n.biff == 2 ? 3 : 4, [r];
}
function mf(e) {
  var t = e.read_shift(1), n = e.read_shift(1);
  return [t, n];
}
function xg(e) {
  return e.read_shift(2), mf(e);
}
function _g(e) {
  return e.read_shift(2), mf(e);
}
function wg(e, t, n) {
  var r = (e[e.l] & 96) >> 5;
  e.l += 1;
  var i = gf(e, 0, n);
  return [r, i];
}
function yg(e, t, n) {
  var r = (e[e.l] & 96) >> 5;
  e.l += 1;
  var i = ag(e, 0, n);
  return [r, i];
}
function Eg(e, t, n) {
  var r = (e[e.l] & 96) >> 5;
  e.l += 1;
  var i = e.read_shift(2);
  n && n.biff == 5 && (e.l += 12);
  var a = gf(e, 0, n);
  return [r, i, a];
}
function Tg(e, t, n) {
  var r = (e[e.l] & 96) >> 5;
  e.l += 1;
  var i = e.read_shift(n && n.biff <= 3 ? 1 : 2);
  return [Tm[i], wf[i], r];
}
function Sg(e, t, n) {
  var r = e[e.l++], i = e.read_shift(1), a = n && n.biff <= 3 ? [r == 88 ? -1 : 0, e.read_shift(1)] : Ag(e);
  return [i, (a[0] === 0 ? wf : Em)[a[1]]];
}
function Ag(e) {
  return [e[e.l + 1] >> 7, e.read_shift(2) & 32767];
}
function Cg(e, t, n) {
  e.l += n && n.biff == 2 ? 3 : 4;
}
function Ng(e, t, n) {
  if (e.l++, n && n.biff == 12) return [e.read_shift(4, "i"), 0];
  var r = e.read_shift(2), i = e.read_shift(n && n.biff == 2 ? 1 : 2);
  return [r, i];
}
function Fg(e) {
  return e.l++, ra[e.read_shift(1)];
}
function kg(e) {
  return e.l++, e.read_shift(2);
}
function Ig(e) {
  return e.l++, e.read_shift(1) !== 0;
}
function Og(e) {
  return e.l++, ci(e);
}
function Dg(e, t, n) {
  return e.l++, Jc(e, t - 1, n);
}
function bg(e, t) {
  var n = [e.read_shift(1)];
  if (t == 12) switch (n[0]) {
    case 2:
      n[0] = 4;
      break;
    case 4:
      n[0] = 16;
      break;
    case 0:
      n[0] = 1;
      break;
    case 1:
      n[0] = 2;
      break;
  }
  switch (n[0]) {
    case 4:
      n[1] = Ev(e, 1) ? "TRUE" : "FALSE", t != 12 && (e.l += 7);
      break;
    case 37:
    case 16:
      n[1] = ra[e[e.l]], e.l += t == 12 ? 4 : 8;
      break;
    case 0:
      e.l += 8;
      break;
    case 1:
      n[1] = ci(e);
      break;
    case 2:
      n[1] = Cv(e, 0, { biff: t > 0 && t < 8 ? 2 : t });
      break;
    default:
      throw new Error("Bad SerAr: " + n[0]);
  }
  return n;
}
function Mg(e, t, n) {
  for (var r = e.read_shift(n.biff == 12 ? 4 : 2), i = [], a = 0; a != r; ++a) i.push((n.biff == 12 ? br : kv)(e));
  return i;
}
function Rg(e, t, n) {
  var r = 0, i = 0;
  n.biff == 12 ? (r = e.read_shift(4), i = e.read_shift(4)) : (i = 1 + e.read_shift(1), r = 1 + e.read_shift(2)), n.biff >= 2 && n.biff < 8 && (--r, --i == 0 && (i = 256));
  for (var a = 0, o = []; a != r && (o[a] = []); ++a)
    for (var s = 0; s != i; ++s) o[a][s] = bg(e, n.biff);
  return o;
}
function Pg(e, t, n) {
  var r = e.read_shift(1) >>> 5 & 3, i = !n || n.biff >= 8 ? 4 : 2, a = e.read_shift(i);
  switch (n.biff) {
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
  return [r, 0, a];
}
function Lg(e, t, n) {
  if (n.biff == 5) return Bg(e);
  var r = e.read_shift(1) >>> 5 & 3, i = e.read_shift(2), a = e.read_shift(4);
  return [r, i, a];
}
function Bg(e) {
  var t = e.read_shift(1) >>> 5 & 3, n = e.read_shift(2, "i");
  e.l += 8;
  var r = e.read_shift(2);
  return e.l += 12, [t, n, r];
}
function $g(e, t, n) {
  var r = e.read_shift(1) >>> 5 & 3;
  e.l += n && n.biff == 2 ? 3 : 4;
  var i = e.read_shift(n && n.biff == 2 ? 1 : 2);
  return [r, i];
}
function Ug(e, t, n) {
  var r = e.read_shift(1) >>> 5 & 3, i = e.read_shift(n && n.biff == 2 ? 1 : 2);
  return [r, i];
}
function zg(e, t, n) {
  var r = e.read_shift(1) >>> 5 & 3;
  return e.l += 4, n.biff < 8 && e.l--, n.biff == 12 && (e.l += 2), [r];
}
function Hg(e, t, n) {
  var r = (e[e.l++] & 96) >> 5, i = e.read_shift(2), a = 4;
  if (n) switch (n.biff) {
    case 5:
      a = 15;
      break;
    case 12:
      a = 6;
      break;
  }
  return e.l += a, [r, i];
}
var Vg = An, Wg = An, Gg = An;
function ia(e, t, n) {
  return e.l += 2, [ig(e)];
}
function pl(e) {
  return e.l += 6, [];
}
var Xg = ia, Yg = pl, Kg = pl, Zg = ia;
function xf(e) {
  return e.l += 2, [qc(e), e.read_shift(2) & 1];
}
var qg = ia, jg = xf, Jg = pl, Qg = ia, em = ia, tm = [
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
function nm(e) {
  e.l += 2;
  var t = e.read_shift(2), n = e.read_shift(2), r = e.read_shift(4), i = e.read_shift(2), a = e.read_shift(2), o = tm[n >> 2 & 31];
  return { ixti: t, coltype: n & 3, rt: o, idx: r, c: i, C: a };
}
function rm(e) {
  return e.l += 2, [e.read_shift(4)];
}
function im(e, t, n) {
  return e.l += 5, e.l += 2, e.l += n.biff == 2 ? 1 : 4, ["PTGSHEET"];
}
function am(e, t, n) {
  return e.l += n.biff == 2 ? 4 : 5, ["PTGENDSHEET"];
}
function om(e) {
  var t = e.read_shift(1) >>> 5 & 3, n = e.read_shift(2);
  return [t, n];
}
function sm(e) {
  var t = e.read_shift(1) >>> 5 & 3, n = e.read_shift(2);
  return [t, n];
}
function lm(e) {
  return e.l += 4, [0, 0];
}
var Bu = {
  /*::[*/
  1: { n: "PtgExp", f: Ng },
  /*::[*/
  2: { n: "PtgTbl", f: Gg },
  /*::[*/
  3: { n: "PtgAdd", f: ht },
  /*::[*/
  4: { n: "PtgSub", f: ht },
  /*::[*/
  5: { n: "PtgMul", f: ht },
  /*::[*/
  6: { n: "PtgDiv", f: ht },
  /*::[*/
  7: { n: "PtgPower", f: ht },
  /*::[*/
  8: { n: "PtgConcat", f: ht },
  /*::[*/
  9: { n: "PtgLt", f: ht },
  /*::[*/
  10: { n: "PtgLe", f: ht },
  /*::[*/
  11: { n: "PtgEq", f: ht },
  /*::[*/
  12: { n: "PtgGe", f: ht },
  /*::[*/
  13: { n: "PtgGt", f: ht },
  /*::[*/
  14: { n: "PtgNe", f: ht },
  /*::[*/
  15: { n: "PtgIsect", f: ht },
  /*::[*/
  16: { n: "PtgUnion", f: ht },
  /*::[*/
  17: { n: "PtgRange", f: ht },
  /*::[*/
  18: { n: "PtgUplus", f: ht },
  /*::[*/
  19: { n: "PtgUminus", f: ht },
  /*::[*/
  20: { n: "PtgPercent", f: ht },
  /*::[*/
  21: { n: "PtgParen", f: ht },
  /*::[*/
  22: { n: "PtgMissArg", f: ht },
  /*::[*/
  23: { n: "PtgStr", f: Dg },
  /*::[*/
  26: { n: "PtgSheet", f: im },
  /*::[*/
  27: { n: "PtgEndSheet", f: am },
  /*::[*/
  28: { n: "PtgErr", f: Fg },
  /*::[*/
  29: { n: "PtgBool", f: Ig },
  /*::[*/
  30: { n: "PtgInt", f: kg },
  /*::[*/
  31: { n: "PtgNum", f: Og },
  /*::[*/
  32: { n: "PtgArray", f: hg },
  /*::[*/
  33: { n: "PtgFunc", f: Tg },
  /*::[*/
  34: { n: "PtgFuncVar", f: Sg },
  /*::[*/
  35: { n: "PtgName", f: Pg },
  /*::[*/
  36: { n: "PtgRef", f: wg },
  /*::[*/
  37: { n: "PtgArea", f: sg },
  /*::[*/
  38: { n: "PtgMemArea", f: $g },
  /*::[*/
  39: { n: "PtgMemErr", f: Vg },
  /*::[*/
  40: { n: "PtgMemNoMem", f: Wg },
  /*::[*/
  41: { n: "PtgMemFunc", f: Ug },
  /*::[*/
  42: { n: "PtgRefErr", f: zg },
  /*::[*/
  43: { n: "PtgAreaErr", f: ug },
  /*::[*/
  44: { n: "PtgRefN", f: yg },
  /*::[*/
  45: { n: "PtgAreaN", f: fg },
  /*::[*/
  46: { n: "PtgMemAreaN", f: om },
  /*::[*/
  47: { n: "PtgMemNoMemN", f: sm },
  /*::[*/
  57: { n: "PtgNameX", f: Lg },
  /*::[*/
  58: { n: "PtgRef3d", f: Eg },
  /*::[*/
  59: { n: "PtgArea3d", f: lg },
  /*::[*/
  60: { n: "PtgRefErr3d", f: Hg },
  /*::[*/
  61: { n: "PtgAreaErr3d", f: cg },
  /*::[*/
  255: {}
}, um = {
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
}, cm = {
  /*::[*/
  1: { n: "PtgElfLel", f: xf },
  /*::[*/
  2: { n: "PtgElfRw", f: Qg },
  /*::[*/
  3: { n: "PtgElfCol", f: Xg },
  /*::[*/
  6: { n: "PtgElfRwV", f: em },
  /*::[*/
  7: { n: "PtgElfColV", f: Zg },
  /*::[*/
  10: { n: "PtgElfRadical", f: qg },
  /*::[*/
  11: { n: "PtgElfRadicalS", f: Jg },
  /*::[*/
  13: { n: "PtgElfColS", f: Yg },
  /*::[*/
  15: { n: "PtgElfColSV", f: Kg },
  /*::[*/
  16: { n: "PtgElfRadicalLel", f: jg },
  /*::[*/
  25: { n: "PtgList", f: nm },
  /*::[*/
  29: { n: "PtgSxName", f: rm },
  /*::[*/
  255: {}
}, fm = {
  /*::[*/
  0: { n: "PtgAttrNoop", f: lm },
  /*::[*/
  1: { n: "PtgAttrSemi", f: mg },
  /*::[*/
  2: { n: "PtgAttrIf", f: pg },
  /*::[*/
  4: { n: "PtgAttrChoose", f: dg },
  /*::[*/
  8: { n: "PtgAttrGoto", f: vg },
  /*::[*/
  16: { n: "PtgAttrSum", f: Cg },
  /*::[*/
  32: { n: "PtgAttrBaxcel", f: Lu },
  /*::[*/
  33: { n: "PtgAttrBaxcel", f: Lu },
  /*::[*/
  64: { n: "PtgAttrSpace", f: xg },
  /*::[*/
  65: { n: "PtgAttrSpaceSemi", f: _g },
  /*::[*/
  128: { n: "PtgAttrIfError", f: gg },
  /*::[*/
  255: {}
};
function hm(e, t, n, r) {
  if (r.biff < 8) return An(e, t);
  for (var i = e.l + t, a = [], o = 0; o !== n.length; ++o)
    switch (n[o][0]) {
      case "PtgArray":
        n[o][1] = Rg(e, 0, r), a.push(n[o][1]);
        break;
      case "PtgMemArea":
        n[o][2] = Mg(e, n[o][1], r), a.push(n[o][2]);
        break;
      case "PtgExp":
        r && r.biff == 12 && (n[o][1][1] = e.read_shift(4), a.push(n[o][1]));
        break;
      case "PtgList":
      case "PtgElfRadicalS":
      case "PtgElfColS":
      case "PtgElfColSV":
        throw "Unsupported " + n[o][0];
    }
  return t = i - e.l, t !== 0 && a.push(An(e, t)), a;
}
function dm(e, t, n) {
  for (var r = e.l + t, i, a, o = []; r != e.l; )
    t = r - e.l, a = e[e.l], i = Bu[a] || Bu[um[a]], (a === 24 || a === 25) && (i = (a === 24 ? cm : fm)[e[e.l + 1]]), !i || !i.f ? An(e, t) : o.push([i.n, i.f(e, t, n)]);
  return o;
}
function vm(e) {
  for (var t = [], n = 0; n < e.length; ++n) {
    for (var r = e[n], i = [], a = 0; a < r.length; ++a) {
      var o = r[a];
      if (o) switch (o[0]) {
        case 2:
          i.push('"' + o[1].replace(/"/g, '""') + '"');
          break;
        default:
          i.push(o[1]);
      }
      else i.push("");
    }
    t.push(i.join(","));
  }
  return t.join(";");
}
var pm = {
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
function gm(e, t) {
  if (!e && !(t && t.biff <= 5 && t.biff >= 2)) throw new Error("empty sheet name");
  return /[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e) ? "'" + e + "'" : e;
}
function _f(e, t, n) {
  if (!e) return "SH33TJSERR0";
  if (n.biff > 8 && (!e.XTI || !e.XTI[t])) return e.SheetNames[t];
  if (!e.XTI) return "SH33TJSERR6";
  var r = e.XTI[t];
  if (n.biff < 8)
    return t > 1e4 && (t -= 65536), t < 0 && (t = -t), t == 0 ? "" : e.XTI[t - 1];
  if (!r) return "SH33TJSERR1";
  var i = "";
  if (n.biff > 8) switch (e[r[0]][0]) {
    case 357:
      return i = r[1] == -1 ? "#REF" : e.SheetNames[r[1]], r[1] == r[2] ? i : i + ":" + e.SheetNames[r[2]];
    case 358:
      return n.SID != null ? e.SheetNames[n.SID] : "SH33TJSSAME" + e[r[0]][0];
    case 355:
    default:
      return "SH33TJSSRC" + e[r[0]][0];
  }
  switch (e[r[0]][0][0]) {
    case 1025:
      return i = r[1] == -1 ? "#REF" : e.SheetNames[r[1]] || "SH33TJSERR3", r[1] == r[2] ? i : i + ":" + e.SheetNames[r[2]];
    case 14849:
      return e[r[0]].slice(1).map(function(a) {
        return a.Name;
      }).join(";;");
    default:
      return e[r[0]][0][3] ? (i = r[1] == -1 ? "#REF" : e[r[0]][0][3][r[1]] || "SH33TJSERR4", r[1] == r[2] ? i : i + ":" + e[r[0]][0][3][r[2]]) : "SH33TJSERR2";
  }
}
function $u(e, t, n) {
  var r = _f(e, t, n);
  return r == "#REF" ? r : gm(r, n);
}
function Qr(e, t, n, r, i) {
  var a = i && i.biff || 8, o = (
    /*range != null ? range :*/
    { s: { c: 0, r: 0 } }
  ), s = [], u, l, c, f = 0, h = 0, d, p = "";
  if (!e[0] || !e[0][0]) return "";
  for (var v = -1, g = "", x = 0, y = e[0].length; x < y; ++x) {
    var m = e[0][x];
    switch (m[0]) {
      case "PtgUminus":
        s.push("-" + s.pop());
        break;
      case "PtgUplus":
        s.push("+" + s.pop());
        break;
      case "PtgPercent":
        s.push(s.pop() + "%");
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
        if (u = s.pop(), l = s.pop(), v >= 0) {
          switch (e[0][v][1][0]) {
            case 0:
              g = ut(" ", e[0][v][1][1]);
              break;
            case 1:
              g = ut("\r", e[0][v][1][1]);
              break;
            default:
              if (g = "", i.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][v][1][0]);
          }
          l = l + g, v = -1;
        }
        s.push(l + pm[m[0]] + u);
        break;
      case "PtgIsect":
        u = s.pop(), l = s.pop(), s.push(l + " " + u);
        break;
      case "PtgUnion":
        u = s.pop(), l = s.pop(), s.push(l + "," + u);
        break;
      case "PtgRange":
        u = s.pop(), l = s.pop(), s.push(l + ":" + u);
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
        c = Fi(m[1][1], o, i), s.push(ki(c, a));
        break;
      case "PtgRefN":
        c = n ? Fi(m[1][1], n, i) : m[1][1], s.push(ki(c, a));
        break;
      case "PtgRef3d":
        f = /*::Number(*/
        m[1][1], c = Fi(m[1][2], o, i), p = $u(r, f, i), s.push(p + "!" + ki(c, a));
        break;
      case "PtgFunc":
      case "PtgFuncVar":
        var T = m[1][0], Y = m[1][1];
        T || (T = 0), T &= 127;
        var Q = T == 0 ? [] : s.slice(-T);
        s.length -= T, Y === "User" && (Y = Q.shift()), s.push(Y + "(" + Q.join(",") + ")");
        break;
      case "PtgBool":
        s.push(m[1] ? "TRUE" : "FALSE");
        break;
      case "PtgInt":
        s.push(
          /*::String(*/
          m[1]
          /*::)*/
        );
        break;
      case "PtgNum":
        s.push(String(m[1]));
        break;
      case "PtgStr":
        s.push('"' + m[1].replace(/"/g, '""') + '"');
        break;
      case "PtgErr":
        s.push(
          /*::String(*/
          m[1]
          /*::)*/
        );
        break;
      case "PtgAreaN":
        d = Tu(m[1][1], n ? { s: n } : o, i), s.push(ts(d, i));
        break;
      case "PtgArea":
        d = Tu(m[1][1], o, i), s.push(ts(d, i));
        break;
      case "PtgArea3d":
        f = /*::Number(*/
        m[1][1], d = m[1][2], p = $u(r, f, i), s.push(p + "!" + ts(d, i));
        break;
      case "PtgAttrSum":
        s.push("SUM(" + s.pop() + ")");
        break;
      case "PtgAttrBaxcel":
      case "PtgAttrSemi":
        break;
      case "PtgName":
        h = m[1][2];
        var R = (r.names || [])[h - 1] || (r[0] || [])[h], V = R ? R.Name : "SH33TJSNAME" + String(h);
        V && V.slice(0, 6) == "_xlfn." && !i.xlfn && (V = V.slice(6)), s.push(V);
        break;
      case "PtgNameX":
        var P = m[1][1];
        h = m[1][2];
        var H;
        if (i.biff <= 5)
          P < 0 && (P = -P), r[P] && (H = r[P][h]);
        else {
          var G = "";
          if (((r[P] || [])[0] || [])[0] == 14849 || (((r[P] || [])[0] || [])[0] == 1025 ? r[P][h] && r[P][h].itab > 0 && (G = r.SheetNames[r[P][h].itab - 1] + "!") : G = r.SheetNames[h - 1] + "!"), r[P] && r[P][h]) G += r[P][h].Name;
          else if (r[0] && r[0][h]) G += r[0][h].Name;
          else {
            var C = (_f(r, P, i) || "").split(";;");
            C[h - 1] ? G = C[h - 1] : G += "SH33TJSERRX";
          }
          s.push(G);
          break;
        }
        H || (H = { Name: "SH33TJSERRY" }), s.push(H.Name);
        break;
      case "PtgParen":
        var se = "(", w = ")";
        if (v >= 0) {
          switch (g = "", e[0][v][1][0]) {
            case 2:
              se = ut(" ", e[0][v][1][1]) + se;
              break;
            case 3:
              se = ut("\r", e[0][v][1][1]) + se;
              break;
            case 4:
              w = ut(" ", e[0][v][1][1]) + w;
              break;
            case 5:
              w = ut("\r", e[0][v][1][1]) + w;
              break;
            default:
              if (i.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][v][1][0]);
          }
          v = -1;
        }
        s.push(se + s.pop() + w);
        break;
      case "PtgRefErr":
        s.push("#REF!");
        break;
      case "PtgRefErr3d":
        s.push("#REF!");
        break;
      case "PtgExp":
        c = { c: m[1][1], r: m[1][0] };
        var U = { c: n.c, r: n.r };
        if (r.sharedf[Qe(c)]) {
          var I = r.sharedf[Qe(c)];
          s.push(Qr(I, o, U, r, i));
        } else {
          var j = !1;
          for (u = 0; u != r.arrayf.length; ++u)
            if (l = r.arrayf[u], !(c.c < l[0].s.c || c.c > l[0].e.c) && !(c.r < l[0].s.r || c.r > l[0].e.r)) {
              s.push(Qr(l[1], o, U, r, i)), j = !0;
              break;
            }
          j || s.push(
            /*::String(*/
            m[1]
            /*::)*/
          );
        }
        break;
      case "PtgArray":
        s.push("{" + vm(
          /*::(*/
          m[1]
          /*:: :any)*/
        ) + "}");
        break;
      case "PtgMemArea":
        break;
      case "PtgAttrSpace":
      case "PtgAttrSpaceSemi":
        v = x;
        break;
      case "PtgTbl":
        break;
      case "PtgMemErr":
        break;
      case "PtgMissArg":
        s.push("");
        break;
      case "PtgAreaErr":
        s.push("#REF!");
        break;
      case "PtgAreaErr3d":
        s.push("#REF!");
        break;
      case "PtgList":
        s.push("Table" + m[1].idx + "[#" + m[1].rt + "]");
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
        throw new Error("Unrecognized Formula Token: " + String(m));
      default:
        throw new Error("Unrecognized Formula Token: " + String(m));
    }
    var K = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
    if (i.biff != 3 && v >= 0 && K.indexOf(e[0][x][0]) == -1) {
      m = e[0][v];
      var ee = !0;
      switch (m[1][0]) {
        case 4:
          ee = !1;
        case 0:
          g = ut(" ", m[1][1]);
          break;
        case 5:
          ee = !1;
        case 1:
          g = ut("\r", m[1][1]);
          break;
        default:
          if (g = "", i.WTF) throw new Error("Unexpected PtgAttrSpaceType " + m[1][0]);
      }
      s.push((ee ? g : "") + s.pop() + (ee ? "" : g)), v = -1;
    }
  }
  if (s.length > 1 && i.WTF) throw new Error("bad formula stack");
  return s[0];
}
function mm(e) {
  if (e == null) {
    var t = ce(8);
    return t.write_shift(1, 3), t.write_shift(1, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 65535), t;
  } else if (typeof e == "number") return Er(e);
  return Er(0);
}
function xm(e, t, n, r, i) {
  var a = Tr(t, n, i), o = mm(e.v), s = ce(6), u = 33;
  s.write_shift(2, u), s.write_shift(4, 0);
  for (var l = ce(e.bf.length), c = 0; c < e.bf.length; ++c) l[c] = e.bf[c];
  var f = At([a, o, s, l]);
  return f;
}
function Do(e, t, n) {
  var r = e.read_shift(4), i = dm(e, r, n), a = e.read_shift(4), o = a > 0 ? hm(e, a, i, n) : null;
  return [i, o];
}
var _m = Do, bo = Do, wm = Do, ym = Do, Em = {
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
}, wf = {
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
}, Tm = {
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
function Sm(e) {
  var t = "of:=" + e.replace(dl, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
  return t.replace(/;/g, "|").replace(/,/g, ";");
}
function Am(e) {
  return e.replace(/\./, "!");
}
var Ii = typeof Map < "u";
function gl(e, t, n) {
  var r = 0, i = e.length;
  if (n) {
    if (Ii ? n.has(t) : Object.prototype.hasOwnProperty.call(n, t)) {
      for (var a = Ii ? n.get(t) : n[t]; r < a.length; ++r)
        if (e[a[r]].t === t)
          return e.Count++, a[r];
    }
  } else for (; r < i; ++r)
    if (e[r].t === t)
      return e.Count++, r;
  return e[i] = { t }, e.Count++, e.Unique++, n && (Ii ? (n.has(t) || n.set(t, []), n.get(t).push(i)) : (Object.prototype.hasOwnProperty.call(n, t) || (n[t] = []), n[t].push(i))), i;
}
function Mo(e, t) {
  var n = { min: e + 1, max: e + 1 }, r = -1;
  return t.MDW && ($n = t.MDW), t.width != null ? n.customWidth = 1 : t.wpx != null ? r = io(t.wpx) : t.wch != null && (r = t.wch), r > -1 ? (n.width = As(r), n.customWidth = 1) : t.width != null && (n.width = t.width), t.hidden && (n.hidden = !0), t.level != null && (n.outlineLevel = n.level = t.level), n;
}
function yf(e, t) {
  if (e) {
    var n = [0.7, 0.7, 0.75, 0.75, 0.3, 0.3];
    e.left == null && (e.left = n[0]), e.right == null && (e.right = n[1]), e.top == null && (e.top = n[2]), e.bottom == null && (e.bottom = n[3]), e.header == null && (e.header = n[4]), e.footer == null && (e.footer = n[5]);
  }
}
function sr(e, t, n) {
  var r = n.revssf[t.z != null ? t.z : "General"], i = 60, a = e.length;
  if (r == null && n.ssf) {
    for (; i < 392; ++i) if (n.ssf[i] == null) {
      pc(t.z, i), n.ssf[i] = t.z, n.revssf[t.z] = r = i;
      break;
    }
  }
  for (i = 0; i != a; ++i) if (e[i].numFmtId === r) return i;
  return e[a] = {
    numFmtId: r,
    fontId: 0,
    fillId: 0,
    borderId: 0,
    xfId: 0,
    applyNumberFormat: 1
  }, a;
}
function Cm(e, t, n) {
  if (e && e["!ref"]) {
    var r = rt(e["!ref"]);
    if (r.e.c < r.s.c || r.e.r < r.s.r) throw new Error("Bad range (" + n + "): " + e["!ref"]);
  }
}
function Nm(e) {
  if (e.length === 0) return "";
  for (var t = '<mergeCells count="' + e.length + '">', n = 0; n != e.length; ++n) t += '<mergeCell ref="' + pt(e[n]) + '"/>';
  return t + "</mergeCells>";
}
function Fm(e, t, n, r, i) {
  var a = !1, o = {}, s = null;
  if (r.bookType !== "xlsx" && t.vbaraw) {
    var u = t.SheetNames[n];
    try {
      t.Workbook && (u = t.Workbook.Sheets[n].CodeName || u);
    } catch {
    }
    a = !0, o.codeName = Li(Je(u));
  }
  if (e && e["!outline"]) {
    var l = { summaryBelow: 1, summaryRight: 1 };
    e["!outline"].above && (l.summaryBelow = 0), e["!outline"].left && (l.summaryRight = 0), s = (s || "") + Te("outlinePr", null, l);
  }
  !a && !s || (i[i.length] = Te("sheetPr", s, o));
}
var km = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"], Im = [
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
function Om(e) {
  var t = { sheet: 1 };
  return km.forEach(function(n) {
    e[n] != null && e[n] && (t[n] = "1");
  }), Im.forEach(function(n) {
    e[n] != null && !e[n] && (t[n] = "0");
  }), e.password && (t.password = rf(e.password).toString(16).toUpperCase()), Te("sheetProtection", null, t);
}
function Dm(e) {
  return yf(e), Te("pageMargins", null, e);
}
function bm(e, t) {
  for (var n = ["<cols>"], r, i = 0; i != t.length; ++i)
    (r = t[i]) && (n[n.length] = Te("col", null, Mo(i, r)));
  return n[n.length] = "</cols>", n.join("");
}
function Mm(e, t, n, r) {
  var i = typeof e.ref == "string" ? e.ref : pt(e.ref);
  n.Workbook || (n.Workbook = { Sheets: [] }), n.Workbook.Names || (n.Workbook.Names = []);
  var a = n.Workbook.Names, o = Kt(i);
  o.s.r == o.e.r && (o.e.r = Kt(t["!ref"]).e.r, i = pt(o));
  for (var s = 0; s < a.length; ++s) {
    var u = a[s];
    if (u.Name == "_xlnm._FilterDatabase" && u.Sheet == r) {
      u.Ref = "'" + n.SheetNames[r] + "'!" + i;
      break;
    }
  }
  return s == a.length && a.push({ Name: "_xlnm._FilterDatabase", Sheet: r, Ref: "'" + n.SheetNames[r] + "'!" + i }), Te("autoFilter", null, { ref: i });
}
function Rm(e, t, n, r) {
  var i = { workbookViewId: "0" };
  return (((r || {}).Workbook || {}).Views || [])[0] && (i.rightToLeft = r.Workbook.Views[0].RTL ? "1" : "0"), Te("sheetViews", Te("sheetView", null, i), {});
}
function Pm(e, t, n, r) {
  if (e.c && n["!comments"].push([t, e.c]), e.v === void 0 && typeof e.f != "string" || e.t === "z" && !e.f) return "";
  var i = "", a = e.t, o = e.v;
  if (e.t !== "z") switch (e.t) {
    case "b":
      i = e.v ? "1" : "0";
      break;
    case "n":
      i = "" + e.v;
      break;
    case "e":
      i = ra[e.v];
      break;
    case "d":
      r && r.cellDates ? i = Mt(e.v, -1).toISOString() : (e = zt(e), e.t = "n", i = "" + (e.v = Ut(Mt(e.v)))), typeof e.z > "u" && (e.z = ft[14]);
      break;
    default:
      i = e.v;
      break;
  }
  var s = Ct("v", Je(i)), u = { r: t }, l = sr(r.cellXfs, e, r);
  switch (l !== 0 && (u.s = l), e.t) {
    case "n":
      break;
    case "d":
      u.t = "d";
      break;
    case "b":
      u.t = "b";
      break;
    case "e":
      u.t = "e";
      break;
    case "z":
      break;
    default:
      if (e.v == null) {
        delete e.t;
        break;
      }
      if (e.v.length > 32767) throw new Error("Text length must not exceed 32767 characters");
      if (r && r.bookSST) {
        s = Ct("v", "" + gl(r.Strings, e.v, r.revStrings)), u.t = "s";
        break;
      }
      u.t = "str";
      break;
  }
  if (e.t != a && (e.t = a, e.v = o), typeof e.f == "string" && e.f) {
    var c = e.F && e.F.slice(0, t.length) == t ? { t: "array", ref: e.F } : null;
    s = Te("f", Je(e.f), c) + (e.v != null ? s : "");
  }
  return e.l && n["!links"].push([t, e.l]), e.D && (u.cm = 1), Te("c", s, u);
}
function Lm(e, t, n, r) {
  var i = [], a = [], o = rt(e["!ref"]), s = "", u, l = "", c = [], f = 0, h = 0, d = e["!rows"], p = Array.isArray(e), v = { r: l }, g, x = -1;
  for (h = o.s.c; h <= o.e.c; ++h) c[h] = It(h);
  for (f = o.s.r; f <= o.e.r; ++f) {
    for (a = [], l = Nt(f), h = o.s.c; h <= o.e.c; ++h) {
      u = c[h] + l;
      var y = p ? (e[f] || [])[h] : e[u];
      y !== void 0 && (s = Pm(y, u, e, t)) != null && a.push(s);
    }
    (a.length > 0 || d && d[f]) && (v = { r: l }, d && d[f] && (g = d[f], g.hidden && (v.hidden = 1), x = -1, g.hpx ? x = ao(g.hpx) : g.hpt && (x = g.hpt), x > -1 && (v.ht = x, v.customHeight = 1), g.level && (v.outlineLevel = g.level)), i[i.length] = Te("row", a.join(""), v));
  }
  if (d) for (; f < d.length; ++f)
    d && d[f] && (v = { r: f + 1 }, g = d[f], g.hidden && (v.hidden = 1), x = -1, g.hpx ? x = ao(g.hpx) : g.hpt && (x = g.hpt), x > -1 && (v.ht = x, v.customHeight = 1), g.level && (v.outlineLevel = g.level), i[i.length] = Te("row", "", v));
  return i.join("");
}
function Ef(e, t, n, r) {
  var i = [gt, Te("worksheet", null, {
    xmlns: si[0],
    "xmlns:r": wt.r
  })], a = n.SheetNames[e], o = 0, s = "", u = n.Sheets[a];
  u == null && (u = {});
  var l = u["!ref"] || "A1", c = rt(l);
  if (c.e.c > 16383 || c.e.r > 1048575) {
    if (t.WTF) throw new Error("Range " + l + " exceeds format limit A1:XFD1048576");
    c.e.c = Math.min(c.e.c, 16383), c.e.r = Math.min(c.e.c, 1048575), l = pt(c);
  }
  r || (r = {}), u["!comments"] = [];
  var f = [];
  Fm(u, n, e, t, i), i[i.length] = Te("dimension", null, { ref: l }), i[i.length] = Rm(u, t, e, n), t.sheetFormat && (i[i.length] = Te("sheetFormatPr", null, {
    defaultRowHeight: t.sheetFormat.defaultRowHeight || "16",
    baseColWidth: t.sheetFormat.baseColWidth || "10",
    outlineLevelRow: t.sheetFormat.outlineLevelRow || "7"
  })), u["!cols"] != null && u["!cols"].length > 0 && (i[i.length] = bm(u, u["!cols"])), i[o = i.length] = "<sheetData/>", u["!links"] = [], u["!ref"] != null && (s = Lm(u, t), s.length > 0 && (i[i.length] = s)), i.length > o + 1 && (i[i.length] = "</sheetData>", i[o] = i[o].replace("/>", ">")), u["!protect"] && (i[i.length] = Om(u["!protect"])), u["!autofilter"] != null && (i[i.length] = Mm(u["!autofilter"], u, n, e)), u["!merges"] != null && u["!merges"].length > 0 && (i[i.length] = Nm(u["!merges"]));
  var h = -1, d, p = -1;
  return (
    /*::(*/
    u["!links"].length > 0 && (i[i.length] = "<hyperlinks>", u["!links"].forEach(function(v) {
      v[1].Target && (d = { ref: v[0] }, v[1].Target.charAt(0) != "#" && (p = je(r, -1, Je(v[1].Target).replace(/#.*$/, ""), Ge.HLINK), d["r:id"] = "rId" + p), (h = v[1].Target.indexOf("#")) > -1 && (d.location = Je(v[1].Target.slice(h + 1))), v[1].Tooltip && (d.tooltip = Je(v[1].Tooltip)), i[i.length] = Te("hyperlink", null, d));
    }), i[i.length] = "</hyperlinks>"), delete u["!links"], u["!margins"] != null && (i[i.length] = Dm(u["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && (i[i.length] = Ct("ignoredErrors", Te("ignoredError", null, { numberStoredAsText: 1, sqref: l }))), f.length > 0 && (p = je(r, -1, "../drawings/drawing" + (e + 1) + ".xml", Ge.DRAW), i[i.length] = Te("drawing", null, { "r:id": "rId" + p }), u["!drawing"] = f), u["!comments"].length > 0 && (p = je(r, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", Ge.VML), i[i.length] = Te("legacyDrawing", null, { "r:id": "rId" + p }), u["!legacy"] = p), i.length > 1 && (i[i.length] = "</worksheet>", i[1] = i[1].replace("/>", ">")), i.join("")
  );
}
function Bm(e, t) {
  var n = {}, r = e.l + t;
  n.r = e.read_shift(4), e.l += 4;
  var i = e.read_shift(2);
  e.l += 1;
  var a = e.read_shift(1);
  return e.l = r, a & 7 && (n.level = a & 7), a & 16 && (n.hidden = !0), a & 32 && (n.hpt = i / 20), n;
}
function $m(e, t, n) {
  var r = ce(145), i = (n["!rows"] || [])[e] || {};
  r.write_shift(4, e), r.write_shift(4, 0);
  var a = 320;
  i.hpx ? a = ao(i.hpx) * 20 : i.hpt && (a = i.hpt * 20), r.write_shift(2, a), r.write_shift(1, 0);
  var o = 0;
  i.level && (o |= i.level), i.hidden && (o |= 16), (i.hpx || i.hpt) && (o |= 32), r.write_shift(1, o), r.write_shift(1, 0);
  var s = 0, u = r.l;
  r.l += 4;
  for (var l = { r: e, c: 0 }, c = 0; c < 16; ++c)
    if (!(t.s.c > c + 1 << 10 || t.e.c < c << 10)) {
      for (var f = -1, h = -1, d = c << 10; d < c + 1 << 10; ++d) {
        l.c = d;
        var p = Array.isArray(n) ? (n[l.r] || [])[l.c] : n[Qe(l)];
        p && (f < 0 && (f = d), h = d);
      }
      f < 0 || (++s, r.write_shift(4, f), r.write_shift(4, h));
    }
  var v = r.l;
  return r.l = u, r.write_shift(4, s), r.l = v, r.length > r.l ? r.slice(0, r.l) : r;
}
function Um(e, t, n, r) {
  var i = $m(r, n, t);
  (i.length > 17 || (t["!rows"] || [])[r]) && ge(e, 0, i);
}
var zm = br, Hm = ui;
function Vm() {
}
function Wm(e, t) {
  var n = {}, r = e[e.l];
  return ++e.l, n.above = !(r & 64), n.left = !(r & 128), e.l += 18, n.name = ev(e), n;
}
function Gm(e, t, n) {
  n == null && (n = ce(84 + 4 * e.length));
  var r = 192;
  t && (t.above && (r &= -65), t.left && (r &= -129)), n.write_shift(1, r);
  for (var i = 1; i < 3; ++i) n.write_shift(1, 0);
  return to({ auto: 1 }, n), n.write_shift(-4, -1), n.write_shift(-4, -1), Pc(e, n), n.slice(0, n.l);
}
function Xm(e) {
  var t = en(e);
  return [t];
}
function Ym(e, t, n) {
  return n == null && (n = ce(8)), Ir(t, n);
}
function Km(e) {
  var t = Or(e);
  return [t];
}
function Zm(e, t, n) {
  return n == null && (n = ce(4)), Dr(t, n);
}
function qm(e) {
  var t = en(e), n = e.read_shift(1);
  return [t, n, "b"];
}
function jm(e, t, n) {
  return n == null && (n = ce(9)), Ir(t, n), n.write_shift(1, e.v ? 1 : 0), n;
}
function Jm(e) {
  var t = Or(e), n = e.read_shift(1);
  return [t, n, "b"];
}
function Qm(e, t, n) {
  return n == null && (n = ce(5)), Dr(t, n), n.write_shift(1, e.v ? 1 : 0), n;
}
function ex(e) {
  var t = en(e), n = e.read_shift(1);
  return [t, n, "e"];
}
function tx(e, t, n) {
  return n == null && (n = ce(9)), Ir(t, n), n.write_shift(1, e.v), n;
}
function nx(e) {
  var t = Or(e), n = e.read_shift(1);
  return [t, n, "e"];
}
function rx(e, t, n) {
  return n == null && (n = ce(8)), Dr(t, n), n.write_shift(1, e.v), n.write_shift(2, 0), n.write_shift(1, 0), n;
}
function ix(e) {
  var t = en(e), n = e.read_shift(4);
  return [t, n, "s"];
}
function ax(e, t, n) {
  return n == null && (n = ce(12)), Ir(t, n), n.write_shift(4, t.v), n;
}
function ox(e) {
  var t = Or(e), n = e.read_shift(4);
  return [t, n, "s"];
}
function sx(e, t, n) {
  return n == null && (n = ce(8)), Dr(t, n), n.write_shift(4, t.v), n;
}
function lx(e) {
  var t = en(e), n = ci(e);
  return [t, n, "n"];
}
function ux(e, t, n) {
  return n == null && (n = ce(16)), Ir(t, n), Er(e.v, n), n;
}
function cx(e) {
  var t = Or(e), n = ci(e);
  return [t, n, "n"];
}
function fx(e, t, n) {
  return n == null && (n = ce(12)), Dr(t, n), Er(e.v, n), n;
}
function hx(e) {
  var t = en(e), n = Lc(e);
  return [t, n, "n"];
}
function dx(e, t, n) {
  return n == null && (n = ce(12)), Ir(t, n), Bc(e.v, n), n;
}
function vx(e) {
  var t = Or(e), n = Lc(e);
  return [t, n, "n"];
}
function px(e, t, n) {
  return n == null && (n = ce(8)), Dr(t, n), Bc(e.v, n), n;
}
function gx(e) {
  var t = en(e), n = ll(e);
  return [t, n, "is"];
}
function mx(e) {
  var t = en(e), n = Ot(e);
  return [t, n, "str"];
}
function xx(e, t, n) {
  return n == null && (n = ce(12 + 4 * e.v.length)), Ir(t, n), Et(e.v, n), n.length > n.l ? n.slice(0, n.l) : n;
}
function _x(e) {
  var t = Or(e), n = Ot(e);
  return [t, n, "str"];
}
function wx(e, t, n) {
  return n == null && (n = ce(8 + 4 * e.v.length)), Dr(t, n), Et(e.v, n), n.length > n.l ? n.slice(0, n.l) : n;
}
function yx(e, t, n) {
  var r = e.l + t, i = en(e);
  i.r = n["!row"];
  var a = e.read_shift(1), o = [i, a, "b"];
  if (n.cellFormula) {
    e.l += 2;
    var s = bo(e, r - e.l, n);
    o[3] = Qr(s, null, i, n.supbooks, n);
  } else e.l = r;
  return o;
}
function Ex(e, t, n) {
  var r = e.l + t, i = en(e);
  i.r = n["!row"];
  var a = e.read_shift(1), o = [i, a, "e"];
  if (n.cellFormula) {
    e.l += 2;
    var s = bo(e, r - e.l, n);
    o[3] = Qr(s, null, i, n.supbooks, n);
  } else e.l = r;
  return o;
}
function Tx(e, t, n) {
  var r = e.l + t, i = en(e);
  i.r = n["!row"];
  var a = ci(e), o = [i, a, "n"];
  if (n.cellFormula) {
    e.l += 2;
    var s = bo(e, r - e.l, n);
    o[3] = Qr(s, null, i, n.supbooks, n);
  } else e.l = r;
  return o;
}
function Sx(e, t, n) {
  var r = e.l + t, i = en(e);
  i.r = n["!row"];
  var a = Ot(e), o = [i, a, "str"];
  if (n.cellFormula) {
    e.l += 2;
    var s = bo(e, r - e.l, n);
    o[3] = Qr(s, null, i, n.supbooks, n);
  } else e.l = r;
  return o;
}
var Ax = br, Cx = ui;
function Nx(e, t) {
  return t == null && (t = ce(4)), t.write_shift(4, e), t;
}
function Fx(e, t) {
  var n = e.l + t, r = br(e), i = ul(e), a = Ot(e), o = Ot(e), s = Ot(e);
  e.l = n;
  var u = { rfx: r, relId: i, loc: a, display: s };
  return o && (u.Tooltip = o), u;
}
function kx(e, t) {
  var n = ce(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
  ui({ s: yt(e[0]), e: yt(e[0]) }, n), cl("rId" + t, n);
  var r = e[1].Target.indexOf("#"), i = r == -1 ? "" : e[1].Target.slice(r + 1);
  return Et(i || "", n), Et(e[1].Tooltip || "", n), Et("", n), n.slice(0, n.l);
}
function Ix() {
}
function Ox(e, t, n) {
  var r = e.l + t, i = $c(e), a = e.read_shift(1), o = [i];
  if (o[2] = a, n.cellFormula) {
    var s = _m(e, r - e.l, n);
    o[1] = s;
  } else e.l = r;
  return o;
}
function Dx(e, t, n) {
  var r = e.l + t, i = br(e), a = [i];
  if (n.cellFormula) {
    var o = ym(e, r - e.l, n);
    a[1] = o, e.l = r;
  } else e.l = r;
  return a;
}
function bx(e, t, n) {
  n == null && (n = ce(18));
  var r = Mo(e, t);
  n.write_shift(-4, e), n.write_shift(-4, e), n.write_shift(4, (r.width || 10) * 256), n.write_shift(
    4,
    0
    /*ixfe*/
  );
  var i = 0;
  return t.hidden && (i |= 1), typeof r.width == "number" && (i |= 2), t.level && (i |= t.level << 8), n.write_shift(2, i), n;
}
var Tf = ["left", "right", "top", "bottom", "header", "footer"];
function Mx(e) {
  var t = {};
  return Tf.forEach(function(n) {
    t[n] = ci(e);
  }), t;
}
function Rx(e, t) {
  return t == null && (t = ce(6 * 8)), yf(e), Tf.forEach(function(n) {
    Er(e[n], t);
  }), t;
}
function Px(e) {
  var t = e.read_shift(2);
  return e.l += 28, { RTL: t & 32 };
}
function Lx(e, t, n) {
  n == null && (n = ce(30));
  var r = 924;
  return (((t || {}).Views || [])[0] || {}).RTL && (r |= 32), n.write_shift(2, r), n.write_shift(4, 0), n.write_shift(4, 0), n.write_shift(4, 0), n.write_shift(1, 0), n.write_shift(1, 0), n.write_shift(2, 0), n.write_shift(2, 100), n.write_shift(2, 0), n.write_shift(2, 0), n.write_shift(2, 0), n.write_shift(4, 0), n;
}
function Bx(e) {
  var t = ce(24);
  return t.write_shift(4, 4), t.write_shift(4, 1), ui(e, t), t;
}
function $x(e, t) {
  return t == null && (t = ce(16 * 4 + 2)), t.write_shift(2, e.password ? rf(e.password) : 0), t.write_shift(4, 1), [
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
  ].forEach(function(n) {
    n[1] ? t.write_shift(4, e[n[0]] != null && !e[n[0]] ? 1 : 0) : t.write_shift(4, e[n[0]] != null && e[n[0]] ? 0 : 1);
  }), t;
}
function Ux() {
}
function zx() {
}
function Hx(e, t, n, r, i, a, o) {
  if (t.v === void 0) return !1;
  var s = "";
  switch (t.t) {
    case "b":
      s = t.v ? "1" : "0";
      break;
    case "d":
      t = zt(t), t.z = t.z || ft[14], t.v = Ut(Mt(t.v)), t.t = "n";
      break;
    case "n":
    case "e":
      s = "" + t.v;
      break;
    default:
      s = t.v;
      break;
  }
  var u = { r: n, c: r };
  switch (u.s = sr(i.cellXfs, t, i), t.l && a["!links"].push([Qe(u), t.l]), t.c && a["!comments"].push([Qe(u), t.c]), t.t) {
    case "s":
    case "str":
      return i.bookSST ? (s = gl(i.Strings, t.v, i.revStrings), u.t = "s", u.v = s, o ? ge(e, 18, sx(t, u)) : ge(e, 7, ax(t, u))) : (u.t = "str", o ? ge(e, 17, wx(t, u)) : ge(e, 6, xx(t, u))), !0;
    case "n":
      return t.v == (t.v | 0) && t.v > -1e3 && t.v < 1e3 ? o ? ge(e, 13, px(t, u)) : ge(e, 2, dx(t, u)) : o ? ge(e, 16, fx(t, u)) : ge(e, 5, ux(t, u)), !0;
    case "b":
      return u.t = "b", o ? ge(e, 15, Qm(t, u)) : ge(e, 4, jm(t, u)), !0;
    case "e":
      return u.t = "e", o ? ge(e, 14, rx(t, u)) : ge(e, 3, tx(t, u)), !0;
  }
  return o ? ge(e, 12, Zm(t, u)) : ge(e, 1, Ym(t, u)), !0;
}
function Vx(e, t, n, r) {
  var i = rt(t["!ref"] || "A1"), a, o = "", s = [];
  ge(
    e,
    145
    /* BrtBeginSheetData */
  );
  var u = Array.isArray(t), l = i.e.r;
  t["!rows"] && (l = Math.max(i.e.r, t["!rows"].length - 1));
  for (var c = i.s.r; c <= l; ++c) {
    o = Nt(c), Um(e, t, i, c);
    var f = !1;
    if (c <= i.e.r) for (var h = i.s.c; h <= i.e.c; ++h) {
      c === i.s.r && (s[h] = It(h)), a = s[h] + o;
      var d = u ? (t[c] || [])[h] : t[a];
      if (!d) {
        f = !1;
        continue;
      }
      f = Hx(e, d, c, h, r, t, f);
    }
  }
  ge(
    e,
    146
    /* BrtEndSheetData */
  );
}
function Wx(e, t) {
  !t || !t["!merges"] || (ge(e, 177, Nx(t["!merges"].length)), t["!merges"].forEach(function(n) {
    ge(e, 176, Cx(n));
  }), ge(
    e,
    178
    /* BrtEndMergeCells */
  ));
}
function Gx(e, t) {
  !t || !t["!cols"] || (ge(
    e,
    390
    /* BrtBeginColInfos */
  ), t["!cols"].forEach(function(n, r) {
    n && ge(e, 60, bx(r, n));
  }), ge(
    e,
    391
    /* BrtEndColInfos */
  ));
}
function Xx(e, t) {
  !t || !t["!ref"] || (ge(
    e,
    648
    /* BrtBeginCellIgnoreECs */
  ), ge(e, 649, Bx(rt(t["!ref"]))), ge(
    e,
    650
    /* BrtEndCellIgnoreECs */
  ));
}
function Yx(e, t, n) {
  t["!links"].forEach(function(r) {
    if (r[1].Target) {
      var i = je(n, -1, r[1].Target.replace(/#.*$/, ""), Ge.HLINK);
      ge(e, 494, kx(r, i));
    }
  }), delete t["!links"];
}
function Kx(e, t, n, r) {
  if (t["!comments"].length > 0) {
    var i = je(r, -1, "../drawings/vmlDrawing" + (n + 1) + ".vml", Ge.VML);
    ge(e, 551, cl("rId" + i)), t["!legacy"] = i;
  }
}
function Zx(e, t, n, r) {
  if (t["!autofilter"]) {
    var i = t["!autofilter"], a = typeof i.ref == "string" ? i.ref : pt(i.ref);
    n.Workbook || (n.Workbook = { Sheets: [] }), n.Workbook.Names || (n.Workbook.Names = []);
    var o = n.Workbook.Names, s = Kt(a);
    s.s.r == s.e.r && (s.e.r = Kt(t["!ref"]).e.r, a = pt(s));
    for (var u = 0; u < o.length; ++u) {
      var l = o[u];
      if (l.Name == "_xlnm._FilterDatabase" && l.Sheet == r) {
        l.Ref = "'" + n.SheetNames[r] + "'!" + a;
        break;
      }
    }
    u == o.length && o.push({ Name: "_xlnm._FilterDatabase", Sheet: r, Ref: "'" + n.SheetNames[r] + "'!" + a }), ge(e, 161, ui(rt(a))), ge(
      e,
      162
      /* BrtEndAFilter */
    );
  }
}
function qx(e, t, n) {
  ge(
    e,
    133
    /* BrtBeginWsViews */
  ), ge(e, 137, Lx(t, n)), ge(
    e,
    138
    /* BrtEndWsView */
  ), ge(
    e,
    134
    /* BrtEndWsViews */
  );
}
function jx(e, t) {
  t["!protect"] && ge(e, 535, $x(t["!protect"]));
}
function Jx(e, t, n, r) {
  var i = $t(), a = n.SheetNames[e], o = n.Sheets[a] || {}, s = a;
  try {
    n && n.Workbook && (s = n.Workbook.Sheets[e].CodeName || s);
  } catch {
  }
  var u = rt(o["!ref"] || "A1");
  if (u.e.c > 16383 || u.e.r > 1048575) {
    if (t.WTF) throw new Error("Range " + (o["!ref"] || "A1") + " exceeds format limit A1:XFD1048576");
    u.e.c = Math.min(u.e.c, 16383), u.e.r = Math.min(u.e.c, 1048575);
  }
  return o["!links"] = [], o["!comments"] = [], ge(
    i,
    129
    /* BrtBeginSheet */
  ), (n.vbaraw || o["!outline"]) && ge(i, 147, Gm(s, o["!outline"])), ge(i, 148, Hm(u)), qx(i, o, n.Workbook), Gx(i, o), Vx(i, o, e, t), jx(i, o), Zx(i, o, n, e), Wx(i, o), Yx(i, o, r), o["!margins"] && ge(i, 476, Rx(o["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && Xx(i, o), Kx(i, o, e, r), ge(
    i,
    130
    /* BrtEndSheet */
  ), i.end();
}
function Qx(e, t) {
  e.l += 10;
  var n = Ot(e);
  return { name: n };
}
var e_ = [
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
function t_(e) {
  return !e.Workbook || !e.Workbook.WBProps ? "false" : D1(e.Workbook.WBProps.date1904) ? "true" : "false";
}
var n_ = /* @__PURE__ */ "][*?/\\".split("");
function Sf(e, t) {
  if (e.length > 31)
    throw new Error("Sheet names cannot exceed 31 chars");
  var n = !0;
  return n_.forEach(function(r) {
    if (e.indexOf(r) != -1)
      throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
  }), n;
}
function r_(e, t, n) {
  e.forEach(function(r, i) {
    Sf(r);
    for (var a = 0; a < i; ++a) if (r == e[a]) throw new Error("Duplicate Sheet Name: " + r);
    if (n) {
      var o = t && t[i] && t[i].CodeName || r;
      if (o.charCodeAt(0) == 95 && o.length > 22) throw new Error("Bad Code Name: Worksheet" + o);
    }
  });
}
function i_(e) {
  if (!e || !e.SheetNames || !e.Sheets) throw new Error("Invalid Workbook");
  if (!e.SheetNames.length) throw new Error("Workbook is empty");
  var t = e.Workbook && e.Workbook.Sheets || [];
  r_(e.SheetNames, t, !!e.vbaraw);
  for (var n = 0; n < e.SheetNames.length; ++n) Cm(e.Sheets[e.SheetNames[n]], e.SheetNames[n], n);
}
function Af(e) {
  var t = [gt];
  t[t.length] = Te("workbook", null, {
    xmlns: si[0],
    //'xmlns:mx': XMLNS.mx,
    //'xmlns:s': XMLNS_main[0],
    "xmlns:r": wt.r
  });
  var n = e.Workbook && (e.Workbook.Names || []).length > 0, r = { codeName: "ThisWorkbook" };
  e.Workbook && e.Workbook.WBProps && (e_.forEach(function(s) {
    e.Workbook.WBProps[s[0]] != null && e.Workbook.WBProps[s[0]] != s[1] && (r[s[0]] = e.Workbook.WBProps[s[0]]);
  }), e.Workbook.WBProps.CodeName && (r.codeName = e.Workbook.WBProps.CodeName, delete r.CodeName)), t[t.length] = Te("workbookPr", null, r);
  var i = e.Workbook && e.Workbook.Sheets || [], a = 0;
  if (i && i[0] && i[0].Hidden) {
    for (t[t.length] = "<bookViews>", a = 0; a != e.SheetNames.length && !(!i[a] || !i[a].Hidden); ++a)
      ;
    a == e.SheetNames.length && (a = 0), t[t.length] = '<workbookView firstSheet="' + a + '" activeTab="' + a + '"/>', t[t.length] = "</bookViews>";
  }
  for (t[t.length] = "<sheets>", a = 0; a != e.SheetNames.length; ++a) {
    var o = { name: Je(e.SheetNames[a].slice(0, 31)) };
    if (o.sheetId = "" + (a + 1), o["r:id"] = "rId" + (a + 1), i[a]) switch (i[a].Hidden) {
      case 1:
        o.state = "hidden";
        break;
      case 2:
        o.state = "veryHidden";
        break;
    }
    t[t.length] = Te("sheet", null, o);
  }
  return t[t.length] = "</sheets>", n && (t[t.length] = "<definedNames>", e.Workbook && e.Workbook.Names && e.Workbook.Names.forEach(function(s) {
    var u = { name: s.Name };
    s.Comment && (u.comment = s.Comment), s.Sheet != null && (u.localSheetId = "" + s.Sheet), s.Hidden && (u.hidden = "1"), s.Ref && (t[t.length] = Te("definedName", Je(s.Ref), u));
  }), t[t.length] = "</definedNames>"), t.length > 2 && (t[t.length] = "</workbook>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function a_(e, t) {
  var n = {};
  return n.Hidden = e.read_shift(4), n.iTabID = e.read_shift(4), n.strRelID = Ss(e), n.name = Ot(e), n;
}
function o_(e, t) {
  return t || (t = ce(127)), t.write_shift(4, e.Hidden), t.write_shift(4, e.iTabID), cl(e.strRelID, t), Et(e.name.slice(0, 31), t), t.length > t.l ? t.slice(0, t.l) : t;
}
function s_(e, t) {
  var n = {}, r = e.read_shift(4);
  n.defaultThemeVersion = e.read_shift(4);
  var i = t > 8 ? Ot(e) : "";
  return i.length > 0 && (n.CodeName = i), n.autoCompressPictures = !!(r & 65536), n.backupFile = !!(r & 64), n.checkCompatibility = !!(r & 4096), n.date1904 = !!(r & 1), n.filterPrivacy = !!(r & 8), n.hidePivotFieldList = !!(r & 1024), n.promptedSolutions = !!(r & 16), n.publishItems = !!(r & 2048), n.refreshAllConnections = !!(r & 262144), n.saveExternalLinkValues = !!(r & 128), n.showBorderUnselectedTables = !!(r & 4), n.showInkAnnotation = !!(r & 32), n.showObjects = ["all", "placeholders", "none"][r >> 13 & 3], n.showPivotChartFilter = !!(r & 32768), n.updateLinks = ["userSet", "never", "always"][r >> 8 & 3], n;
}
function l_(e, t) {
  t || (t = ce(72));
  var n = 0;
  return e && e.filterPrivacy && (n |= 8), t.write_shift(4, n), t.write_shift(4, 0), Pc(e && e.CodeName || "ThisWorkbook", t), t.slice(0, t.l);
}
function u_(e, t, n) {
  var r = e.l + t;
  e.l += 4, e.l += 1;
  var i = e.read_shift(4), a = tv(e), o = wm(e, 0, n), s = ul(e);
  e.l = r;
  var u = { Name: a, Ptg: o };
  return i < 268435455 && (u.Sheet = i), s && (u.Comment = s), u;
}
function c_(e, t) {
  ge(
    e,
    143
    /* BrtBeginBundleShs */
  );
  for (var n = 0; n != t.SheetNames.length; ++n) {
    var r = t.Workbook && t.Workbook.Sheets && t.Workbook.Sheets[n] && t.Workbook.Sheets[n].Hidden || 0, i = { Hidden: r, iTabID: n + 1, strRelID: "rId" + (n + 1), name: t.SheetNames[n] };
    ge(e, 156, o_(i));
  }
  ge(
    e,
    144
    /* BrtEndBundleShs */
  );
}
function f_(e, t) {
  t || (t = ce(127));
  for (var n = 0; n != 4; ++n) t.write_shift(4, 0);
  return Et("SheetJS", t), Et(Ya.version, t), Et(Ya.version, t), Et("7262", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function h_(e, t) {
  t || (t = ce(29)), t.write_shift(-4, 0), t.write_shift(-4, 460), t.write_shift(4, 28800), t.write_shift(4, 17600), t.write_shift(4, 500), t.write_shift(4, e), t.write_shift(4, e);
  var n = 120;
  return t.write_shift(1, n), t.length > t.l ? t.slice(0, t.l) : t;
}
function d_(e, t) {
  if (!(!t.Workbook || !t.Workbook.Sheets)) {
    for (var n = t.Workbook.Sheets, r = 0, i = -1, a = -1; r < n.length; ++r)
      !n[r] || !n[r].Hidden && i == -1 ? i = r : n[r].Hidden == 1 && a == -1 && (a = r);
    a > i || (ge(
      e,
      135
      /* BrtBeginBookViews */
    ), ge(e, 158, h_(i)), ge(
      e,
      136
      /* BrtEndBookViews */
    ));
  }
}
function v_(e, t) {
  var n = $t();
  return ge(
    n,
    131
    /* BrtBeginBook */
  ), ge(n, 128, f_()), ge(n, 153, l_(e.Workbook && e.Workbook.WBProps || null)), d_(n, e), c_(n, e), ge(
    n,
    132
    /* BrtEndBook */
  ), n.end();
}
function p_(e, t, n) {
  return (t.slice(-4) === ".bin" ? v_ : Af)(e);
}
function g_(e, t, n, r, i) {
  return (t.slice(-4) === ".bin" ? Jx : Ef)(e, n, r, i);
}
function m_(e, t, n) {
  return (t.slice(-4) === ".bin" ? Rp : sf)(e, n);
}
function x_(e, t, n) {
  return (t.slice(-4) === ".bin" ? lp : nf)(e, n);
}
function __(e, t, n) {
  return (t.slice(-4) === ".bin" ? jp : hf)(e);
}
function w_(e) {
  return (e.slice(-4) === ".bin" ? Vp : cf)();
}
function y_(e, t) {
  var n = [];
  return e.Props && n.push(mv(e.Props, t)), e.Custprops && n.push(xv(e.Props, e.Custprops)), n.join("");
}
function E_() {
  return "";
}
function T_(e, t) {
  var n = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
  return t.cellXfs.forEach(function(r, i) {
    var a = [];
    a.push(Te("NumberFormat", null, { "ss:Format": Je(ft[r.numFmtId]) }));
    var o = (
      /*::(*/
      { "ss:ID": "s" + (21 + i) }
    );
    n.push(Te("Style", a.join(""), o));
  }), Te("Styles", n.join(""));
}
function Cf(e) {
  return Te("NamedRange", null, { "ss:Name": e.Name, "ss:RefersTo": "=" + vl(e.Ref, { r: 0, c: 0 }) });
}
function S_(e) {
  if (!((e || {}).Workbook || {}).Names) return "";
  for (var t = e.Workbook.Names, n = [], r = 0; r < t.length; ++r) {
    var i = t[r];
    i.Sheet == null && (i.Name.match(/^_xlfn\./) || n.push(Cf(i)));
  }
  return Te("Names", n.join(""));
}
function A_(e, t, n, r) {
  if (!e || !((r || {}).Workbook || {}).Names) return "";
  for (var i = r.Workbook.Names, a = [], o = 0; o < i.length; ++o) {
    var s = i[o];
    s.Sheet == n && (s.Name.match(/^_xlfn\./) || a.push(Cf(s)));
  }
  return a.join("");
}
function C_(e, t, n, r) {
  if (!e) return "";
  var i = [];
  if (e["!margins"] && (i.push("<PageSetup>"), e["!margins"].header && i.push(Te("Header", null, { "x:Margin": e["!margins"].header })), e["!margins"].footer && i.push(Te("Footer", null, { "x:Margin": e["!margins"].footer })), i.push(Te("PageMargins", null, {
    "x:Bottom": e["!margins"].bottom || "0.75",
    "x:Left": e["!margins"].left || "0.7",
    "x:Right": e["!margins"].right || "0.7",
    "x:Top": e["!margins"].top || "0.75"
  })), i.push("</PageSetup>")), r && r.Workbook && r.Workbook.Sheets && r.Workbook.Sheets[n])
    if (r.Workbook.Sheets[n].Hidden) i.push(Te("Visible", r.Workbook.Sheets[n].Hidden == 1 ? "SheetHidden" : "SheetVeryHidden", {}));
    else {
      for (var a = 0; a < n && !(r.Workbook.Sheets[a] && !r.Workbook.Sheets[a].Hidden); ++a) ;
      a == n && i.push("<Selected/>");
    }
  return ((((r || {}).Workbook || {}).Views || [])[0] || {}).RTL && i.push("<DisplayRightToLeft/>"), e["!protect"] && (i.push(Ct("ProtectContents", "True")), e["!protect"].objects && i.push(Ct("ProtectObjects", "True")), e["!protect"].scenarios && i.push(Ct("ProtectScenarios", "True")), e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells ? i.push(Ct("EnableSelection", "NoSelection")) : e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells && i.push(Ct("EnableSelection", "UnlockedCells")), [
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
  ].forEach(function(o) {
    e["!protect"][o[0]] && i.push("<" + o[1] + "/>");
  })), i.length == 0 ? "" : Te("WorksheetOptions", i.join(""), { xmlns: Gt.x });
}
function N_(e) {
  return e.map(function(t) {
    var n = O1(t.t || ""), r = Te("ss:Data", n, { xmlns: "http://www.w3.org/TR/REC-html40" });
    return Te("Comment", r, { "ss:Author": t.a });
  }).join("");
}
function F_(e, t, n, r, i, a, o) {
  if (!e || e.v == null && e.f == null) return "";
  var s = {};
  if (e.f && (s["ss:Formula"] = "=" + Je(vl(e.f, o))), e.F && e.F.slice(0, t.length) == t) {
    var u = yt(e.F.slice(t.length + 1));
    s["ss:ArrayRange"] = "RC:R" + (u.r == o.r ? "" : "[" + (u.r - o.r) + "]") + "C" + (u.c == o.c ? "" : "[" + (u.c - o.c) + "]");
  }
  if (e.l && e.l.Target && (s["ss:HRef"] = Je(e.l.Target), e.l.Tooltip && (s["x:HRefScreenTip"] = Je(e.l.Tooltip))), n["!merges"])
    for (var l = n["!merges"], c = 0; c != l.length; ++c)
      l[c].s.c != o.c || l[c].s.r != o.r || (l[c].e.c > l[c].s.c && (s["ss:MergeAcross"] = l[c].e.c - l[c].s.c), l[c].e.r > l[c].s.r && (s["ss:MergeDown"] = l[c].e.r - l[c].s.r));
  var f = "", h = "";
  switch (e.t) {
    case "z":
      if (!r.sheetStubs) return "";
      break;
    case "n":
      f = "Number", h = String(e.v);
      break;
    case "b":
      f = "Boolean", h = e.v ? "1" : "0";
      break;
    case "e":
      f = "Error", h = ra[e.v];
      break;
    case "d":
      f = "DateTime", h = new Date(e.v).toISOString(), e.z == null && (e.z = e.z || ft[14]);
      break;
    case "s":
      f = "String", h = I1(e.v || "");
      break;
  }
  var d = sr(r.cellXfs, e, r);
  s["ss:StyleID"] = "s" + (21 + d), s["ss:Index"] = o.c + 1;
  var p = e.v != null ? h : "", v = e.t == "z" ? "" : '<Data ss:Type="' + f + '">' + p + "</Data>";
  return (e.c || []).length > 0 && (v += N_(e.c)), Te("Cell", v, s);
}
function k_(e, t) {
  var n = '<Row ss:Index="' + (e + 1) + '"';
  return t && (t.hpt && !t.hpx && (t.hpx = of(t.hpt)), t.hpx && (n += ' ss:AutoFitHeight="0" ss:Height="' + t.hpx + '"'), t.hidden && (n += ' ss:Hidden="1"')), n + ">";
}
function I_(e, t, n, r) {
  if (!e["!ref"]) return "";
  var i = rt(e["!ref"]), a = e["!merges"] || [], o = 0, s = [];
  e["!cols"] && e["!cols"].forEach(function(g, x) {
    hl(g);
    var y = !!g.width, m = Mo(x, g), T = { "ss:Index": x + 1 };
    y && (T["ss:Width"] = ro(m.width)), g.hidden && (T["ss:Hidden"] = "1"), s.push(Te("Column", null, T));
  });
  for (var u = Array.isArray(e), l = i.s.r; l <= i.e.r; ++l) {
    for (var c = [k_(l, (e["!rows"] || [])[l])], f = i.s.c; f <= i.e.c; ++f) {
      var h = !1;
      for (o = 0; o != a.length; ++o)
        if (!(a[o].s.c > f) && !(a[o].s.r > l) && !(a[o].e.c < f) && !(a[o].e.r < l)) {
          (a[o].s.c != f || a[o].s.r != l) && (h = !0);
          break;
        }
      if (!h) {
        var d = { r: l, c: f }, p = Qe(d), v = u ? (e[l] || [])[f] : e[p];
        c.push(F_(v, p, e, t, n, r, d));
      }
    }
    c.push("</Row>"), c.length > 2 && s.push(c.join(""));
  }
  return s.join("");
}
function O_(e, t, n) {
  var r = [], i = n.SheetNames[e], a = n.Sheets[i], o = a ? A_(a, t, e, n) : "";
  return o.length > 0 && r.push("<Names>" + o + "</Names>"), o = a ? I_(a, t, e, n) : "", o.length > 0 && r.push("<Table>" + o + "</Table>"), r.push(C_(a, t, e, n)), r.join("");
}
function D_(e, t) {
  t || (t = {}), e.SSF || (e.SSF = zt(ft)), e.SSF && (ko(), Fo(e.SSF), t.revssf = Io(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF, t.cellXfs = [], sr(t.cellXfs, {}, { revssf: { General: 0 } }));
  var n = [];
  n.push(y_(e, t)), n.push(E_()), n.push(""), n.push("");
  for (var r = 0; r < e.SheetNames.length; ++r)
    n.push(Te("Worksheet", O_(r, t, e), { "ss:Name": Je(e.SheetNames[r]) }));
  return n[2] = T_(e, t), n[3] = S_(e), gt + Te("Workbook", n.join(""), {
    xmlns: Gt.ss,
    "xmlns:o": Gt.o,
    "xmlns:x": Gt.x,
    "xmlns:ss": Gt.ss,
    "xmlns:dt": Gt.dt,
    "xmlns:html": Gt.html
  });
}
var is = {
  SI: "e0859ff2f94f6810ab9108002b27b3d9",
  DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
  UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
};
function b_(e, t) {
  var n = [], r = [], i = [], a = 0, o, s = hu(Au, "n"), u = hu(Cu, "n");
  if (e.Props)
    for (o = Ft(e.Props), a = 0; a < o.length; ++a) (Object.prototype.hasOwnProperty.call(s, o[a]) ? n : Object.prototype.hasOwnProperty.call(u, o[a]) ? r : i).push([o[a], e.Props[o[a]]]);
  if (e.Custprops)
    for (o = Ft(e.Custprops), a = 0; a < o.length; ++a) Object.prototype.hasOwnProperty.call(e.Props || {}, o[a]) || (Object.prototype.hasOwnProperty.call(s, o[a]) ? n : Object.prototype.hasOwnProperty.call(u, o[a]) ? r : i).push([o[a], e.Custprops[o[a]]]);
  var l = [];
  for (a = 0; a < i.length; ++a)
    Zc.indexOf(i[a][0]) > -1 || Xc.indexOf(i[a][0]) > -1 || i[a][1] != null && l.push(i[a]);
  r.length && et.utils.cfb_add(t, "/SummaryInformation", Ou(r, is.SI, u, Cu)), (n.length || l.length) && et.utils.cfb_add(t, "/DocumentSummaryInformation", Ou(n, is.DSI, s, Au, l.length ? l : null, is.UDI));
}
function M_(e, t) {
  var n = t || {}, r = et.utils.cfb_new({ root: "R" }), i = "/Workbook";
  switch (n.bookType || "xls") {
    case "xls":
      n.bookType = "biff8";
    case "xla":
      n.bookType || (n.bookType = "xla");
    case "biff8":
      i = "/Workbook", n.biff = 8;
      break;
    case "biff5":
      i = "/Book", n.biff = 5;
      break;
    default:
      throw new Error("invalid type " + n.bookType + " for XLS CFB");
  }
  return et.utils.cfb_add(r, i, Nf(e, n)), n.biff == 8 && (e.Props || e.Custprops) && b_(e, r), n.biff == 8 && e.vbaraw && Jp(r, et.read(e.vbaraw, { type: typeof e.vbaraw == "string" ? "binary" : "buffer" })), r;
}
var R_ = {
  /*::[*/
  0: {
    /* n:"BrtRowHdr", */
    f: Bm
  },
  /*::[*/
  1: {
    /* n:"BrtCellBlank", */
    f: Xm
  },
  /*::[*/
  2: {
    /* n:"BrtCellRk", */
    f: hx
  },
  /*::[*/
  3: {
    /* n:"BrtCellError", */
    f: ex
  },
  /*::[*/
  4: {
    /* n:"BrtCellBool", */
    f: qm
  },
  /*::[*/
  5: {
    /* n:"BrtCellReal", */
    f: lx
  },
  /*::[*/
  6: {
    /* n:"BrtCellSt", */
    f: mx
  },
  /*::[*/
  7: {
    /* n:"BrtCellIsst", */
    f: ix
  },
  /*::[*/
  8: {
    /* n:"BrtFmlaString", */
    f: Sx
  },
  /*::[*/
  9: {
    /* n:"BrtFmlaNum", */
    f: Tx
  },
  /*::[*/
  10: {
    /* n:"BrtFmlaBool", */
    f: yx
  },
  /*::[*/
  11: {
    /* n:"BrtFmlaError", */
    f: Ex
  },
  /*::[*/
  12: {
    /* n:"BrtShortBlank", */
    f: Km
  },
  /*::[*/
  13: {
    /* n:"BrtShortRk", */
    f: vx
  },
  /*::[*/
  14: {
    /* n:"BrtShortError", */
    f: nx
  },
  /*::[*/
  15: {
    /* n:"BrtShortBool", */
    f: Jm
  },
  /*::[*/
  16: {
    /* n:"BrtShortReal", */
    f: cx
  },
  /*::[*/
  17: {
    /* n:"BrtShortSt", */
    f: _x
  },
  /*::[*/
  18: {
    /* n:"BrtShortIsst", */
    f: ox
  },
  /*::[*/
  19: {
    /* n:"BrtSSTItem", */
    f: ll
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
    f: u_
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
    f: mp
  },
  /*::[*/
  44: {
    /* n:"BrtFmt", */
    f: pp
  },
  /*::[*/
  45: {
    /* n:"BrtFill", */
    f: wp
  },
  /*::[*/
  46: {
    /* n:"BrtBorder", */
    f: Ep
  },
  /*::[*/
  47: {
    /* n:"BrtXF", */
    f: yp
  },
  /*::[*/
  48: {
    /* n:"BrtStyle" */
  },
  /*::[*/
  49: {
    /* n:"BrtCellMeta", */
    f: K1
  },
  /*::[*/
  50: {
    /* n:"BrtValueMeta" */
  },
  /*::[*/
  51: {
    /* n:"BrtMdb" */
    f: Bp
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
    f: Zv
  },
  /*::[*/
  62: {
    /* n:"BrtCellRString", */
    f: gx
  },
  /*::[*/
  63: {
    /* n:"BrtCalcChainItem$", */
    f: Wp
  },
  /*::[*/
  64: {
    /* n:"BrtDVal", */
    f: Ux
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
    f: An,
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
    f: Px
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
    f: Wm
  },
  /*::[*/
  148: {
    /* n:"BrtWsDim", */
    f: zm,
    p: 16
  },
  /*::[*/
  151: {
    /* n:"BrtPane", */
    f: Ix
  },
  /*::[*/
  152: {
    /* n:"BrtSel" */
  },
  /*::[*/
  153: {
    /* n:"BrtWbProp", */
    f: s_
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
    f: a_
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
    f: ap
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
    f: br
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
    f: Ax
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
    f: Pp
  },
  /*::[*/
  336: {
    /* n:"BrtEndEsmdtinfo", */
    T: -1
  },
  /*::[*/
  337: {
    /* n:"BrtBeginEsmdb", */
    f: zp,
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
    f: Ss
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
    f: Vv
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
    f: Ox
  },
  /*::[*/
  427: {
    /* n:"BrtShrFmla", */
    f: Dx
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
    f: Mx
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
    f: Vm
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
    f: Fx
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
    f: Ss
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
    f: Zp
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
    f: Yp
  },
  /*::[*/
  636: {
    /* n:"BrtEndComment", */
    T: -1
  },
  /*::[*/
  637: {
    /* n:"BrtCommentText", */
    f: J1
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
    f: Qx
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
    f: zx
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
function Se(e, t, n, r) {
  var i = t;
  if (!isNaN(i)) {
    var a = r || (n || []).length || 0, o = e.next(4);
    o.write_shift(2, i), o.write_shift(2, a), /*:: len != null &&*/
    a > 0 && al(n) && e.push(n);
  }
}
function P_(e, t, n, r) {
  var i = (n || []).length || 0;
  if (i <= 8224) return Se(e, t, n, i);
  var a = t;
  if (!isNaN(a)) {
    for (var o = n.parts || [], s = 0, u = 0, l = 0; l + (o[s] || 8224) <= 8224; )
      l += o[s] || 8224, s++;
    var c = e.next(4);
    for (c.write_shift(2, a), c.write_shift(2, l), e.push(n.slice(u, u + l)), u += l; u < i; ) {
      for (c = e.next(4), c.write_shift(2, 60), l = 0; l + (o[s] || 8224) <= 8224; )
        l += o[s] || 8224, s++;
      c.write_shift(2, l), e.push(n.slice(u, u + l)), u += l;
    }
  }
}
function aa(e, t, n) {
  return e || (e = ce(7)), e.write_shift(2, t), e.write_shift(2, n), e.write_shift(2, 0), e.write_shift(1, 0), e;
}
function L_(e, t, n, r) {
  var i = ce(9);
  return aa(i, e, t), jc(n, r || "b", i), i;
}
function B_(e, t, n) {
  var r = ce(8 + 2 * n.length);
  return aa(r, e, t), r.write_shift(1, n.length), r.write_shift(n.length, n, "sbcs"), r.l < r.length ? r.slice(0, r.l) : r;
}
function $_(e, t, n, r) {
  if (t.v != null) switch (t.t) {
    case "d":
    case "n":
      var i = t.t == "d" ? Ut(Mt(t.v)) : t.v;
      i == (i | 0) && i >= 0 && i < 65536 ? Se(e, 2, Qv(n, r, i)) : Se(e, 3, Jv(n, r, i));
      return;
    case "b":
    case "e":
      Se(e, 5, L_(n, r, t.v, t.t));
      return;
    case "s":
    case "str":
      Se(e, 4, B_(n, r, (t.v || "").slice(0, 255)));
      return;
  }
  Se(e, 1, aa(null, n, r));
}
function U_(e, t, n, r) {
  var i = Array.isArray(t), a = rt(t["!ref"] || "A1"), o, s = "", u = [];
  if (a.e.c > 255 || a.e.r > 16383) {
    if (r.WTF) throw new Error("Range " + (t["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    a.e.c = Math.min(a.e.c, 255), a.e.r = Math.min(a.e.c, 16383), o = pt(a);
  }
  for (var l = a.s.r; l <= a.e.r; ++l) {
    s = Nt(l);
    for (var c = a.s.c; c <= a.e.c; ++c) {
      l === a.s.r && (u[c] = It(c)), o = u[c] + s;
      var f = i ? (t[l] || [])[c] : t[o];
      f && $_(e, f, l, c);
    }
  }
}
function z_(e, t) {
  for (var n = t || {}, r = $t(), i = 0, a = 0; a < e.SheetNames.length; ++a) e.SheetNames[a] == n.sheet && (i = a);
  if (i == 0 && n.sheet && e.SheetNames[0] != n.sheet) throw new Error("Sheet not found: " + n.sheet);
  return Se(r, n.biff == 4 ? 1033 : n.biff == 3 ? 521 : 9, fl(e, 16, n)), U_(r, e.Sheets[e.SheetNames[i]], i, n), Se(r, 10), r.end();
}
function H_(e, t, n) {
  Se(e, 49, Rv({
    sz: 12,
    name: "Arial"
  }, n));
}
function V_(e, t, n) {
  t && [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(r) {
    for (var i = r[0]; i <= r[1]; ++i) t[i] != null && Se(e, 1054, Bv(i, t[i], n));
  });
}
function W_(e, t) {
  var n = ce(19);
  n.write_shift(4, 2151), n.write_shift(4, 0), n.write_shift(4, 0), n.write_shift(2, 3), n.write_shift(1, 1), n.write_shift(4, 0), Se(e, 2151, n), n = ce(39), n.write_shift(4, 2152), n.write_shift(4, 0), n.write_shift(4, 0), n.write_shift(2, 3), n.write_shift(1, 0), n.write_shift(4, 0), n.write_shift(2, 1), n.write_shift(4, 4), n.write_shift(2, 0), ef(rt(t["!ref"] || "A1"), n), n.write_shift(4, 4), Se(e, 2152, n);
}
function G_(e, t) {
  for (var n = 0; n < 16; ++n) Se(e, 224, bu({ numFmtId: 0, style: !0 }, 0, t));
  t.cellXfs.forEach(function(r) {
    Se(e, 224, bu(r, 0, t));
  });
}
function X_(e, t) {
  for (var n = 0; n < t["!links"].length; ++n) {
    var r = t["!links"][n];
    Se(e, 440, Xv(r)), r[1].Tooltip && Se(e, 2048, Yv(r));
  }
  delete t["!links"];
}
function Y_(e, t) {
  if (t) {
    var n = 0;
    t.forEach(function(r, i) {
      ++n <= 256 && r && Se(e, 125, qv(Mo(i, r), i));
    });
  }
}
function K_(e, t, n, r, i) {
  var a = 16 + sr(i.cellXfs, t, i);
  if (t.v == null && !t.bf) {
    Se(e, 513, Tr(n, r, a));
    return;
  }
  if (t.bf) Se(e, 6, xm(t, n, r, i, a));
  else switch (t.t) {
    case "d":
    case "n":
      var o = t.t == "d" ? Ut(Mt(t.v)) : t.v;
      Se(e, 515, Hv(n, r, o, a));
      break;
    case "b":
    case "e":
      Se(e, 517, zv(n, r, t.v, a, i, t.t));
      break;
    case "s":
    case "str":
      if (i.bookSST) {
        var s = gl(i.Strings, t.v, i.revStrings);
        Se(e, 253, Pv(n, r, s, a));
      } else Se(e, 516, Lv(n, r, (t.v || "").slice(0, 255), a, i));
      break;
    default:
      Se(e, 513, Tr(n, r, a));
  }
}
function Z_(e, t, n) {
  var r = $t(), i = n.SheetNames[e], a = n.Sheets[i] || {}, o = (n || {}).Workbook || {}, s = (o.Sheets || [])[e] || {}, u = Array.isArray(a), l = t.biff == 8, c, f = "", h = [], d = rt(a["!ref"] || "A1"), p = l ? 65536 : 16384;
  if (d.e.c > 255 || d.e.r >= p) {
    if (t.WTF) throw new Error("Range " + (a["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    d.e.c = Math.min(d.e.c, 255), d.e.r = Math.min(d.e.c, p - 1);
  }
  Se(r, 2057, fl(n, 16, t)), Se(r, 13, Qt(1)), Se(r, 12, Qt(100)), Se(r, 15, bt(!0)), Se(r, 17, bt(!1)), Se(r, 16, Er(1e-3)), Se(r, 95, bt(!0)), Se(r, 42, bt(!1)), Se(r, 43, bt(!1)), Se(r, 130, Qt(1)), Se(r, 128, Uv()), Se(r, 131, bt(!1)), Se(r, 132, bt(!1)), l && Y_(r, a["!cols"]), Se(r, 512, $v(d, t)), l && (a["!links"] = []);
  for (var v = d.s.r; v <= d.e.r; ++v) {
    f = Nt(v);
    for (var g = d.s.c; g <= d.e.c; ++g) {
      v === d.s.r && (h[g] = It(g)), c = h[g] + f;
      var x = u ? (a[v] || [])[g] : a[c];
      x && (K_(r, x, v, g, t), l && x.l && a["!links"].push([c, x.l]));
    }
  }
  var y = s.CodeName || s.name || i;
  return l && Se(r, 574, Mv((o.Views || [])[0])), l && (a["!merges"] || []).length && Se(r, 229, Gv(a["!merges"])), l && X_(r, a), Se(r, 442, Qc(y)), l && W_(r, a), Se(
    r,
    10
    /* EOF */
  ), r.end();
}
function q_(e, t, n) {
  var r = $t(), i = (e || {}).Workbook || {}, a = i.Sheets || [], o = (
    /*::((*/
    i.WBProps || {
      /*::CodeName:"ThisWorkbook"*/
    }
  ), s = n.biff == 8, u = n.biff == 5;
  if (Se(r, 2057, fl(e, 5, n)), n.bookType == "xla" && Se(
    r,
    135
    /* Addin */
  ), Se(r, 225, s ? Qt(1200) : null), Se(r, 193, yv(2)), u && Se(
    r,
    191
    /* ToolbarHdr */
  ), u && Se(
    r,
    192
    /* ToolbarEnd */
  ), Se(
    r,
    226
    /* InterfaceEnd */
  ), Se(r, 92, Iv("SheetJS", n)), Se(r, 66, Qt(s ? 1200 : 1252)), s && Se(r, 353, Qt(0)), s && Se(
    r,
    448
    /* Excel9File */
  ), Se(r, 317, jv(e.SheetNames.length)), s && e.vbaraw && Se(
    r,
    211
    /* ObProj */
  ), s && e.vbaraw) {
    var l = o.CodeName || "ThisWorkbook";
    Se(r, 442, Qc(l));
  }
  Se(r, 156, Qt(17)), Se(r, 25, bt(!1)), Se(r, 18, bt(!1)), Se(r, 19, Qt(0)), s && Se(r, 431, bt(!1)), s && Se(r, 444, Qt(0)), Se(r, 61, bv()), Se(r, 64, bt(!1)), Se(r, 141, Qt(0)), Se(r, 34, bt(t_(e) == "true")), Se(r, 14, bt(!0)), s && Se(r, 439, bt(!1)), Se(r, 218, Qt(0)), H_(r, e, n), V_(r, e.SSF, n), G_(r, n), s && Se(r, 352, bt(!1));
  var c = r.end(), f = $t();
  s && Se(f, 140, Kv()), s && n.Strings && P_(f, 252, Dv(n.Strings)), Se(
    f,
    10
    /* EOF */
  );
  var h = f.end(), d = $t(), p = 0, v = 0;
  for (v = 0; v < e.SheetNames.length; ++v) p += (s ? 12 : 11) + (s ? 2 : 1) * e.SheetNames[v].length;
  var g = c.length + p + h.length;
  for (v = 0; v < e.SheetNames.length; ++v) {
    var x = a[v] || {};
    Se(d, 133, Ov({ pos: g, hs: x.Hidden || 0, dt: 0, name: e.SheetNames[v] }, n)), g += t[v].length;
  }
  var y = d.end();
  if (p != y.length) throw new Error("BS8 " + p + " != " + y.length);
  var m = [];
  return c.length && m.push(c), y.length && m.push(y), h.length && m.push(h), At(m);
}
function j_(e, t) {
  var n = t || {}, r = [];
  e && !e.SSF && (e.SSF = zt(ft)), e && e.SSF && (ko(), Fo(e.SSF), n.revssf = Io(e.SSF), n.revssf[e.SSF[65535]] = 0, n.ssf = e.SSF), n.Strings = /*::((*/
  [], n.Strings.Count = 0, n.Strings.Unique = 0, ml(n), n.cellXfs = [], sr(n.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {});
  for (var i = 0; i < e.SheetNames.length; ++i) r[r.length] = Z_(i, n, e);
  return r.unshift(q_(e, r, n)), At(r);
}
function Nf(e, t) {
  for (var n = 0; n <= e.SheetNames.length; ++n) {
    var r = e.Sheets[e.SheetNames[n]];
    if (!(!r || !r["!ref"])) {
      var i = Kt(r["!ref"]);
      i.e.c > 255 && typeof console < "u" && console.error && console.error("Worksheet '" + e.SheetNames[n] + "' extends beyond column IV (255).  Data may be lost.");
    }
  }
  var a = t || {};
  switch (a.biff || 2) {
    case 8:
    case 5:
      return j_(e, t);
    case 4:
    case 3:
    case 2:
      return z_(e, t);
  }
  throw new Error("invalid type " + a.bookType + " for BIFF");
}
function J_(e, t, n, r) {
  for (var i = e["!merges"] || [], a = [], o = t.s.c; o <= t.e.c; ++o) {
    for (var s = 0, u = 0, l = 0; l < i.length; ++l)
      if (!(i[l].s.r > n || i[l].s.c > o) && !(i[l].e.r < n || i[l].e.c < o)) {
        if (i[l].s.r < n || i[l].s.c < o) {
          s = -1;
          break;
        }
        s = i[l].e.r - i[l].s.r + 1, u = i[l].e.c - i[l].s.c + 1;
        break;
      }
    if (!(s < 0)) {
      var c = Qe({ r: n, c: o }), f = r.dense ? (e[n] || [])[o] : e[c], h = f && f.v != null && (f.h || k1(f.w || (zn(f), f.w) || "")) || "", d = {};
      s > 1 && (d.rowspan = s), u > 1 && (d.colspan = u), r.editable ? h = '<span contenteditable="true">' + h + "</span>" : f && (d["data-t"] = f && f.t || "z", f.v != null && (d["data-v"] = f.v), f.z != null && (d["data-z"] = f.z), f.l && (f.l.Target || "#").charAt(0) != "#" && (h = '<a href="' + f.l.Target + '">' + h + "</a>")), d.id = (r.id || "sjs") + "-" + c, a.push(Te("td", h, d));
    }
  }
  var p = "<tr>";
  return p + a.join("") + "</tr>";
}
var Q_ = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>', e2 = "</body></html>";
function t2(e, t, n) {
  var r = [];
  return r.join("") + "<table" + (n && n.id ? ' id="' + n.id + '"' : "") + ">";
}
function Ff(e, t) {
  var n = t || {}, r = n.header != null ? n.header : Q_, i = n.footer != null ? n.footer : e2, a = [r], o = Kt(e["!ref"]);
  n.dense = Array.isArray(e), a.push(t2(e, o, n));
  for (var s = o.s.r; s <= o.e.r; ++s) a.push(J_(e, o, s, n));
  return a.push("</table>" + i), a.join("");
}
function kf(e, t, n) {
  var r = n || {}, i = 0, a = 0;
  if (r.origin != null)
    if (typeof r.origin == "number") i = r.origin;
    else {
      var o = typeof r.origin == "string" ? yt(r.origin) : r.origin;
      i = o.r, a = o.c;
    }
  var s = t.getElementsByTagName("tr"), u = Math.min(r.sheetRows || 1e7, s.length), l = { s: { r: 0, c: 0 }, e: { r: i, c: a } };
  if (e["!ref"]) {
    var c = Kt(e["!ref"]);
    l.s.r = Math.min(l.s.r, c.s.r), l.s.c = Math.min(l.s.c, c.s.c), l.e.r = Math.max(l.e.r, c.e.r), l.e.c = Math.max(l.e.c, c.e.c), i == -1 && (l.e.r = i = c.e.r + 1);
  }
  var f = [], h = 0, d = e["!rows"] || (e["!rows"] = []), p = 0, v = 0, g = 0, x = 0, y = 0, m = 0;
  for (e["!cols"] || (e["!cols"] = []); p < s.length && v < u; ++p) {
    var T = s[p];
    if (Uu(T)) {
      if (r.display) continue;
      d[v] = { hidden: !0 };
    }
    var Y = T.children;
    for (g = x = 0; g < Y.length; ++g) {
      var Q = Y[g];
      if (!(r.display && Uu(Q))) {
        var R = Q.hasAttribute("data-v") ? Q.getAttribute("data-v") : Q.hasAttribute("v") ? Q.getAttribute("v") : b1(Q.innerHTML), V = Q.getAttribute("data-z") || Q.getAttribute("z");
        for (h = 0; h < f.length; ++h) {
          var P = f[h];
          P.s.c == x + a && P.s.r < v + i && v + i <= P.e.r && (x = P.e.c + 1 - a, h = -1);
        }
        m = +Q.getAttribute("colspan") || 1, ((y = +Q.getAttribute("rowspan") || 1) > 1 || m > 1) && f.push({ s: { r: v + i, c: x + a }, e: { r: v + i + (y || 1) - 1, c: x + a + (m || 1) - 1 } });
        var H = { t: "s", v: R }, G = Q.getAttribute("data-t") || Q.getAttribute("t") || "";
        R != null && (R.length == 0 ? H.t = G || "z" : r.raw || R.trim().length == 0 || G == "s" || (R === "TRUE" ? H = { t: "b", v: !0 } : R === "FALSE" ? H = { t: "b", v: !1 } : isNaN(Bn(R)) ? isNaN(Pi(R).getDate()) || (H = { t: "d", v: Mt(R) }, r.cellDates || (H = { t: "n", v: Ut(H.v) }), H.z = r.dateNF || ft[14]) : H = { t: "n", v: Bn(R) })), H.z === void 0 && V != null && (H.z = V);
        var C = "", se = Q.getElementsByTagName("A");
        if (se && se.length) for (var w = 0; w < se.length && !(se[w].hasAttribute("href") && (C = se[w].getAttribute("href"), C.charAt(0) != "#")); ++w) ;
        C && C.charAt(0) != "#" && (H.l = { Target: C }), r.dense ? (e[v + i] || (e[v + i] = []), e[v + i][x + a] = H) : e[Qe({ c: x + a, r: v + i })] = H, l.e.c < x + a && (l.e.c = x + a), x += m;
      }
    }
    ++v;
  }
  return f.length && (e["!merges"] = (e["!merges"] || []).concat(f)), l.e.r = Math.max(l.e.r, v - 1 + i), e["!ref"] = pt(l), v >= u && (e["!fullref"] = pt((l.e.r = s.length - p + v - 1 + i, l))), e;
}
function If(e, t) {
  var n = t || {}, r = n.dense ? [] : {};
  return kf(r, e, t);
}
function n2(e, t) {
  return kr(If(e, t), t);
}
function Uu(e) {
  var t = "", n = r2(e);
  return n && (t = n(e).getPropertyValue("display")), t || (t = e.style && e.style.display), t === "none";
}
function r2(e) {
  return e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle == "function" ? e.ownerDocument.defaultView.getComputedStyle : typeof getComputedStyle == "function" ? getComputedStyle : null;
}
var i2 = /* @__PURE__ */ function() {
  var e = [
    "<office:master-styles>",
    '<style:master-page style:name="mp1" style:page-layout-name="mp1">',
    "<style:header/>",
    '<style:header-left style:display="false"/>',
    "<style:footer/>",
    '<style:footer-left style:display="false"/>',
    "</style:master-page>",
    "</office:master-styles>"
  ].join(""), t = "<office:document-styles " + Bi({
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
    return gt + t;
  };
}(), zu = /* @__PURE__ */ function() {
  var e = function(a) {
    return Je(a).replace(/  +/g, function(o) {
      return '<text:s text:c="' + o.length + '"/>';
    }).replace(/\t/g, "<text:tab/>").replace(/\n/g, "</text:p><text:p>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>");
  }, t = `          <table:table-cell />
`, n = `          <table:covered-table-cell/>
`, r = function(a, o, s) {
    var u = [];
    u.push('      <table:table table:name="' + Je(o.SheetNames[s]) + `" table:style-name="ta1">
`);
    var l = 0, c = 0, f = Kt(a["!ref"] || "A1"), h = a["!merges"] || [], d = 0, p = Array.isArray(a);
    if (a["!cols"])
      for (c = 0; c <= f.e.c; ++c) u.push("        <table:table-column" + (a["!cols"][c] ? ' table:style-name="co' + a["!cols"][c].ods + '"' : "") + `></table:table-column>
`);
    var v = "", g = a["!rows"] || [];
    for (l = 0; l < f.s.r; ++l)
      v = g[l] ? ' table:style-name="ro' + g[l].ods + '"' : "", u.push("        <table:table-row" + v + `></table:table-row>
`);
    for (; l <= f.e.r; ++l) {
      for (v = g[l] ? ' table:style-name="ro' + g[l].ods + '"' : "", u.push("        <table:table-row" + v + `>
`), c = 0; c < f.s.c; ++c) u.push(t);
      for (; c <= f.e.c; ++c) {
        var x = !1, y = {}, m = "";
        for (d = 0; d != h.length; ++d)
          if (!(h[d].s.c > c) && !(h[d].s.r > l) && !(h[d].e.c < c) && !(h[d].e.r < l)) {
            (h[d].s.c != c || h[d].s.r != l) && (x = !0), y["table:number-columns-spanned"] = h[d].e.c - h[d].s.c + 1, y["table:number-rows-spanned"] = h[d].e.r - h[d].s.r + 1;
            break;
          }
        if (x) {
          u.push(n);
          continue;
        }
        var T = Qe({ r: l, c }), Y = p ? (a[l] || [])[c] : a[T];
        if (Y && Y.f && (y["table:formula"] = Je(Sm(Y.f)), Y.F && Y.F.slice(0, T.length) == T)) {
          var Q = Kt(Y.F);
          y["table:number-matrix-columns-spanned"] = Q.e.c - Q.s.c + 1, y["table:number-matrix-rows-spanned"] = Q.e.r - Q.s.r + 1;
        }
        if (!Y) {
          u.push(t);
          continue;
        }
        switch (Y.t) {
          case "b":
            m = Y.v ? "TRUE" : "FALSE", y["office:value-type"] = "boolean", y["office:boolean-value"] = Y.v ? "true" : "false";
            break;
          case "n":
            m = Y.w || String(Y.v || 0), y["office:value-type"] = "float", y["office:value"] = Y.v || 0;
            break;
          case "s":
          case "str":
            m = Y.v == null ? "" : Y.v, y["office:value-type"] = "string";
            break;
          case "d":
            m = Y.w || Mt(Y.v).toISOString(), y["office:value-type"] = "date", y["office:date-value"] = Mt(Y.v).toISOString(), y["table:style-name"] = "ce1";
            break;
          default:
            u.push(t);
            continue;
        }
        var R = e(m);
        if (Y.l && Y.l.Target) {
          var V = Y.l.Target;
          V = V.charAt(0) == "#" ? "#" + Am(V.slice(1)) : V, V.charAt(0) != "#" && !V.match(/^\w+:/) && (V = "../" + V), R = Te("text:a", R, { "xlink:href": V.replace(/&/g, "&amp;") });
        }
        u.push("          " + Te("table:table-cell", Te("text:p", R, {}), y) + `
`);
      }
      u.push(`        </table:table-row>
`);
    }
    return u.push(`      </table:table>
`), u.join("");
  }, i = function(a, o) {
    a.push(` <office:automatic-styles>
`), a.push(`  <number:date-style style:name="N37" number:automatic-order="true">
`), a.push(`   <number:month number:style="long"/>
`), a.push(`   <number:text>/</number:text>
`), a.push(`   <number:day number:style="long"/>
`), a.push(`   <number:text>/</number:text>
`), a.push(`   <number:year/>
`), a.push(`  </number:date-style>
`);
    var s = 0;
    o.SheetNames.map(function(l) {
      return o.Sheets[l];
    }).forEach(function(l) {
      if (l && l["!cols"]) {
        for (var c = 0; c < l["!cols"].length; ++c) if (l["!cols"][c]) {
          var f = l["!cols"][c];
          if (f.width == null && f.wpx == null && f.wch == null) continue;
          hl(f), f.ods = s;
          var h = l["!cols"][c].wpx + "px";
          a.push('  <style:style style:name="co' + s + `" style:family="table-column">
`), a.push('   <style:table-column-properties fo:break-before="auto" style:column-width="' + h + `"/>
`), a.push(`  </style:style>
`), ++s;
        }
      }
    });
    var u = 0;
    o.SheetNames.map(function(l) {
      return o.Sheets[l];
    }).forEach(function(l) {
      if (l && l["!rows"]) {
        for (var c = 0; c < l["!rows"].length; ++c) if (l["!rows"][c]) {
          l["!rows"][c].ods = u;
          var f = l["!rows"][c].hpx + "px";
          a.push('  <style:style style:name="ro' + u + `" style:family="table-row">
`), a.push('   <style:table-row-properties fo:break-before="auto" style:row-height="' + f + `"/>
`), a.push(`  </style:style>
`), ++u;
        }
      }
    }), a.push(`  <style:style style:name="ta1" style:family="table" style:master-page-name="mp1">
`), a.push(`   <style:table-properties table:display="true" style:writing-mode="lr-tb"/>
`), a.push(`  </style:style>
`), a.push(`  <style:style style:name="ce1" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="N37"/>
`), a.push(` </office:automatic-styles>
`);
  };
  return function(o, s) {
    var u = [gt], l = Bi({
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
    }), c = Bi({
      "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
      "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
    });
    s.bookType == "fods" ? (u.push("<office:document" + l + c + `>
`), u.push(Wc().replace(/office:document-meta/g, "office:meta"))) : u.push("<office:document-content" + l + `>
`), i(u, o), u.push(`  <office:body>
`), u.push(`    <office:spreadsheet>
`);
    for (var f = 0; f != o.SheetNames.length; ++f) u.push(r(o.Sheets[o.SheetNames[f]], o, f));
    return u.push(`    </office:spreadsheet>
`), u.push(`  </office:body>
`), s.bookType == "fods" ? u.push("</office:document>") : u.push("</office:document-content>"), u.join("");
  };
}();
function Of(e, t) {
  if (t.bookType == "fods") return zu(e, t);
  var n = tl(), r = "", i = [], a = [];
  return r = "mimetype", He(n, r, "application/vnd.oasis.opendocument.spreadsheet"), r = "content.xml", He(n, r, zu(e, t)), i.push([r, "text/xml"]), a.push([r, "ContentFile"]), r = "styles.xml", He(n, r, i2(e, t)), i.push([r, "text/xml"]), a.push([r, "StylesFile"]), r = "meta.xml", He(n, r, gt + Wc(
    /*::wb, opts*/
  )), i.push([r, "text/xml"]), a.push([r, "MetadataFile"]), r = "manifest.rdf", He(n, r, gv(
    a
    /*, opts*/
  )), i.push([r, "application/rdf+xml"]), r = "META-INF/manifest.xml", He(n, r, vv(
    i
    /*, opts*/
  )), n;
}
/*! sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
function oo(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function a2(e) {
  return typeof TextEncoder < "u" ? new TextEncoder().encode(e) : rn(Li(e));
}
function o2(e, t) {
  e:
    for (var n = 0; n <= e.length - t.length; ++n) {
      for (var r = 0; r < t.length; ++r)
        if (e[n + r] != t[r])
          continue e;
      return !0;
    }
  return !1;
}
function ir(e) {
  var t = e.reduce(function(i, a) {
    return i + a.length;
  }, 0), n = new Uint8Array(t), r = 0;
  return e.forEach(function(i) {
    n.set(i, r), r += i.length;
  }), n;
}
function s2(e, t, n) {
  var r = Math.floor(n == 0 ? 0 : Math.LOG10E * Math.log(Math.abs(n))) + 6176 - 20, i = n / Math.pow(10, r - 6176);
  e[t + 15] |= r >> 7, e[t + 14] |= (r & 127) << 1;
  for (var a = 0; i >= 1; ++a, i /= 256)
    e[t + a] = i & 255;
  e[t + 15] |= n >= 0 ? 0 : 128;
}
function $i(e, t) {
  var n = t ? t[0] : 0, r = e[n] & 127;
  e:
    if (e[n++] >= 128 && (r |= (e[n] & 127) << 7, e[n++] < 128 || (r |= (e[n] & 127) << 14, e[n++] < 128) || (r |= (e[n] & 127) << 21, e[n++] < 128) || (r += (e[n] & 127) * Math.pow(2, 28), ++n, e[n++] < 128) || (r += (e[n] & 127) * Math.pow(2, 35), ++n, e[n++] < 128) || (r += (e[n] & 127) * Math.pow(2, 42), ++n, e[n++] < 128)))
      break e;
  return t && (t[0] = n), r;
}
function qe(e) {
  var t = new Uint8Array(7);
  t[0] = e & 127;
  var n = 1;
  e:
    if (e > 127) {
      if (t[n - 1] |= 128, t[n] = e >> 7 & 127, ++n, e <= 16383 || (t[n - 1] |= 128, t[n] = e >> 14 & 127, ++n, e <= 2097151) || (t[n - 1] |= 128, t[n] = e >> 21 & 127, ++n, e <= 268435455) || (t[n - 1] |= 128, t[n] = e / 256 >>> 21 & 127, ++n, e <= 34359738367) || (t[n - 1] |= 128, t[n] = e / 65536 >>> 21 & 127, ++n, e <= 4398046511103))
        break e;
      t[n - 1] |= 128, t[n] = e / 16777216 >>> 21 & 127, ++n;
    }
  return t.slice(0, n);
}
function Kr(e) {
  var t = 0, n = e[t] & 127;
  e:
    if (e[t++] >= 128) {
      if (n |= (e[t] & 127) << 7, e[t++] < 128 || (n |= (e[t] & 127) << 14, e[t++] < 128) || (n |= (e[t] & 127) << 21, e[t++] < 128))
        break e;
      n |= (e[t] & 127) << 28;
    }
  return n;
}
function mt(e) {
  for (var t = [], n = [0]; n[0] < e.length; ) {
    var r = n[0], i = $i(e, n), a = i & 7;
    i = Math.floor(i / 8);
    var o = 0, s;
    if (i == 0)
      break;
    switch (a) {
      case 0:
        {
          for (var u = n[0]; e[n[0]++] >= 128; )
            ;
          s = e.slice(u, n[0]);
        }
        break;
      case 5:
        o = 4, s = e.slice(n[0], n[0] + o), n[0] += o;
        break;
      case 1:
        o = 8, s = e.slice(n[0], n[0] + o), n[0] += o;
        break;
      case 2:
        o = $i(e, n), s = e.slice(n[0], n[0] + o), n[0] += o;
        break;
      case 3:
      case 4:
      default:
        throw new Error("PB Type ".concat(a, " for Field ").concat(i, " at offset ").concat(r));
    }
    var l = { data: s, type: a };
    t[i] == null ? t[i] = [l] : t[i].push(l);
  }
  return t;
}
function Tt(e) {
  var t = [];
  return e.forEach(function(n, r) {
    n.forEach(function(i) {
      i.data && (t.push(qe(r * 8 + i.type)), i.type == 2 && t.push(qe(i.data.length)), t.push(i.data));
    });
  }), ir(t);
}
function tn(e) {
  for (var t, n = [], r = [0]; r[0] < e.length; ) {
    var i = $i(e, r), a = mt(e.slice(r[0], r[0] + i));
    r[0] += i;
    var o = {
      id: Kr(a[1][0].data),
      messages: []
    };
    a[2].forEach(function(s) {
      var u = mt(s.data), l = Kr(u[3][0].data);
      o.messages.push({
        meta: u,
        data: e.slice(r[0], r[0] + l)
      }), r[0] += l;
    }), (t = a[3]) != null && t[0] && (o.merge = Kr(a[3][0].data) >>> 0 > 0), n.push(o);
  }
  return n;
}
function $r(e) {
  var t = [];
  return e.forEach(function(n) {
    var r = [];
    r[1] = [{ data: qe(n.id), type: 0 }], r[2] = [], n.merge != null && (r[3] = [{ data: qe(+!!n.merge), type: 0 }]);
    var i = [];
    n.messages.forEach(function(o) {
      i.push(o.data), o.meta[3] = [{ type: 0, data: qe(o.data.length) }], r[2].push({ data: Tt(o.meta), type: 2 });
    });
    var a = Tt(r);
    t.push(qe(a.length)), t.push(a), i.forEach(function(o) {
      return t.push(o);
    });
  }), ir(t);
}
function l2(e, t) {
  if (e != 0)
    throw new Error("Unexpected Snappy chunk type ".concat(e));
  for (var n = [0], r = $i(t, n), i = []; n[0] < t.length; ) {
    var a = t[n[0]] & 3;
    if (a == 0) {
      var o = t[n[0]++] >> 2;
      if (o < 60)
        ++o;
      else {
        var s = o - 59;
        o = t[n[0]], s > 1 && (o |= t[n[0] + 1] << 8), s > 2 && (o |= t[n[0] + 2] << 16), s > 3 && (o |= t[n[0] + 3] << 24), o >>>= 0, o++, n[0] += s;
      }
      i.push(t.slice(n[0], n[0] + o)), n[0] += o;
      continue;
    } else {
      var u = 0, l = 0;
      if (a == 1 ? (l = (t[n[0]] >> 2 & 7) + 4, u = (t[n[0]++] & 224) << 3, u |= t[n[0]++]) : (l = (t[n[0]++] >> 2) + 1, a == 2 ? (u = t[n[0]] | t[n[0] + 1] << 8, n[0] += 2) : (u = (t[n[0]] | t[n[0] + 1] << 8 | t[n[0] + 2] << 16 | t[n[0] + 3] << 24) >>> 0, n[0] += 4)), i = [ir(i)], u == 0)
        throw new Error("Invalid offset 0");
      if (u > i[0].length)
        throw new Error("Invalid offset beyond length");
      if (l >= u)
        for (i.push(i[0].slice(-u)), l -= u; l >= i[i.length - 1].length; )
          i.push(i[i.length - 1]), l -= i[i.length - 1].length;
      i.push(i[0].slice(-u, -u + l));
    }
  }
  var c = ir(i);
  if (c.length != r)
    throw new Error("Unexpected length: ".concat(c.length, " != ").concat(r));
  return c;
}
function nn(e) {
  for (var t = [], n = 0; n < e.length; ) {
    var r = e[n++], i = e[n] | e[n + 1] << 8 | e[n + 2] << 16;
    n += 3, t.push(l2(r, e.slice(n, n + i))), n += i;
  }
  if (n !== e.length)
    throw new Error("data is not a valid framed stream!");
  return ir(t);
}
function Ur(e) {
  for (var t = [], n = 0; n < e.length; ) {
    var r = Math.min(e.length - n, 268435455), i = new Uint8Array(4);
    t.push(i);
    var a = qe(r), o = a.length;
    t.push(a), r <= 60 ? (o++, t.push(new Uint8Array([r - 1 << 2]))) : r <= 256 ? (o += 2, t.push(new Uint8Array([240, r - 1 & 255]))) : r <= 65536 ? (o += 3, t.push(new Uint8Array([244, r - 1 & 255, r - 1 >> 8 & 255]))) : r <= 16777216 ? (o += 4, t.push(new Uint8Array([248, r - 1 & 255, r - 1 >> 8 & 255, r - 1 >> 16 & 255]))) : r <= 4294967296 && (o += 5, t.push(new Uint8Array([252, r - 1 & 255, r - 1 >> 8 & 255, r - 1 >> 16 & 255, r - 1 >>> 24 & 255]))), t.push(e.slice(n, n + r)), o += r, i[0] = 0, i[1] = o & 255, i[2] = o >> 8 & 255, i[3] = o >> 16 & 255, n += r;
  }
  return ir(t);
}
function as(e, t) {
  var n = new Uint8Array(32), r = oo(n), i = 12, a = 0;
  switch (n[0] = 5, e.t) {
    case "n":
      n[1] = 2, s2(n, i, e.v), a |= 1, i += 16;
      break;
    case "b":
      n[1] = 6, r.setFloat64(i, e.v ? 1 : 0, !0), a |= 2, i += 8;
      break;
    case "s":
      if (t.indexOf(e.v) == -1)
        throw new Error("Value ".concat(e.v, " missing from SST!"));
      n[1] = 3, r.setUint32(i, t.indexOf(e.v), !0), a |= 8, i += 4;
      break;
    default:
      throw "unsupported cell type " + e.t;
  }
  return r.setUint32(8, a, !0), n.slice(0, i);
}
function os(e, t) {
  var n = new Uint8Array(32), r = oo(n), i = 12, a = 0;
  switch (n[0] = 3, e.t) {
    case "n":
      n[2] = 2, r.setFloat64(i, e.v, !0), a |= 32, i += 8;
      break;
    case "b":
      n[2] = 6, r.setFloat64(i, e.v ? 1 : 0, !0), a |= 32, i += 8;
      break;
    case "s":
      if (t.indexOf(e.v) == -1)
        throw new Error("Value ".concat(e.v, " missing from SST!"));
      n[2] = 3, r.setUint32(i, t.indexOf(e.v), !0), a |= 16, i += 4;
      break;
    default:
      throw "unsupported cell type " + e.t;
  }
  return r.setUint32(4, a, !0), n.slice(0, i);
}
function Xn(e) {
  var t = mt(e);
  return $i(t[1][0].data);
}
function u2(e, t, n) {
  var r, i, a, o;
  if (!((r = e[6]) != null && r[0]) || !((i = e[7]) != null && i[0]))
    throw "Mutation only works on post-BNC storages!";
  var s = ((o = (a = e[8]) == null ? void 0 : a[0]) == null ? void 0 : o.data) && Kr(e[8][0].data) > 0 || !1;
  if (s)
    throw "Math only works with normal offsets";
  for (var u = 0, l = oo(e[7][0].data), c = 0, f = [], h = oo(e[4][0].data), d = 0, p = [], v = 0; v < t.length; ++v) {
    if (t[v] == null) {
      l.setUint16(v * 2, 65535, !0), h.setUint16(v * 2, 65535);
      continue;
    }
    l.setUint16(v * 2, c, !0), h.setUint16(v * 2, d, !0);
    var g, x;
    switch (typeof t[v]) {
      case "string":
        g = as({ t: "s", v: t[v] }, n), x = os({ t: "s", v: t[v] }, n);
        break;
      case "number":
        g = as({ t: "n", v: t[v] }, n), x = os({ t: "n", v: t[v] }, n);
        break;
      case "boolean":
        g = as({ t: "b", v: t[v] }, n), x = os({ t: "b", v: t[v] }, n);
        break;
      default:
        throw new Error("Unsupported value " + t[v]);
    }
    f.push(g), c += g.length, p.push(x), d += x.length, ++u;
  }
  for (e[2][0].data = qe(u); v < e[7][0].data.length / 2; ++v)
    l.setUint16(v * 2, 65535, !0), h.setUint16(v * 2, 65535, !0);
  return e[6][0].data = ir(f), e[3][0].data = ir(p), u;
}
function c2(e, t) {
  if (!t || !t.numbers)
    throw new Error("Must pass a `numbers` option -- check the README");
  var n = e.Sheets[e.SheetNames[0]];
  e.SheetNames.length > 1 && console.error("The Numbers writer currently writes only the first table");
  var r = Kt(n["!ref"]);
  r.s.r = r.s.c = 0;
  var i = !1;
  r.e.c > 9 && (i = !0, r.e.c = 9), r.e.r > 49 && (i = !0, r.e.r = 49), i && console.error("The Numbers writer is currently limited to ".concat(pt(r)));
  var a = so(n, { range: r, header: 1 }), o = ["~Sh33tJ5~"];
  a.forEach(function(z) {
    return z.forEach(function(L) {
      typeof L == "string" && o.push(L);
    });
  });
  var s = {}, u = [], l = et.read(t.numbers, { type: "base64" });
  l.FileIndex.map(function(z, L) {
    return [z, l.FullPaths[L]];
  }).forEach(function(z) {
    var L = z[0], O = z[1];
    if (L.type == 2 && L.name.match(/\.iwa/)) {
      var X = L.content, le = nn(X), pe = tn(le);
      pe.forEach(function(me) {
        u.push(me.id), s[me.id] = { deps: [], location: O, type: Kr(me.messages[0].meta[1][0].data) };
      });
    }
  }), u.sort(function(z, L) {
    return z - L;
  });
  var c = u.filter(function(z) {
    return z > 1;
  }).map(function(z) {
    return [z, qe(z)];
  });
  l.FileIndex.map(function(z, L) {
    return [z, l.FullPaths[L]];
  }).forEach(function(z) {
    var L = z[0];
    if (z[1], !!L.name.match(/\.iwa/)) {
      var O = tn(nn(L.content));
      O.forEach(function(X) {
        X.messages.forEach(function(le) {
          c.forEach(function(pe) {
            X.messages.some(function(me) {
              return Kr(me.meta[1][0].data) != 11006 && o2(me.data, pe[1]);
            }) && s[pe[0]].deps.push(X.id);
          });
        });
      });
    }
  });
  for (var f = et.find(l, s[1].location), h = tn(nn(f.content)), d, p = 0; p < h.length; ++p) {
    var v = h[p];
    v.id == 1 && (d = v);
  }
  var g = Xn(mt(d.messages[0].data)[1][0].data);
  for (f = et.find(l, s[g].location), h = tn(nn(f.content)), p = 0; p < h.length; ++p)
    v = h[p], v.id == g && (d = v);
  for (g = Xn(mt(d.messages[0].data)[2][0].data), f = et.find(l, s[g].location), h = tn(nn(f.content)), p = 0; p < h.length; ++p)
    v = h[p], v.id == g && (d = v);
  for (g = Xn(mt(d.messages[0].data)[2][0].data), f = et.find(l, s[g].location), h = tn(nn(f.content)), p = 0; p < h.length; ++p)
    v = h[p], v.id == g && (d = v);
  var x = mt(d.messages[0].data);
  {
    x[6][0].data = qe(r.e.r + 1), x[7][0].data = qe(r.e.c + 1);
    var y = Xn(x[46][0].data), m = et.find(l, s[y].location), T = tn(nn(m.content));
    {
      for (var Y = 0; Y < T.length && T[Y].id != y; ++Y)
        ;
      if (T[Y].id != y)
        throw "Bad ColumnRowUIDMapArchive";
      var Q = mt(T[Y].messages[0].data);
      Q[1] = [], Q[2] = [], Q[3] = [];
      for (var R = 0; R <= r.e.c; ++R) {
        var V = [];
        V[1] = V[2] = [{ type: 0, data: qe(R + 420690) }], Q[1].push({ type: 2, data: Tt(V) }), Q[2].push({ type: 0, data: qe(R) }), Q[3].push({ type: 0, data: qe(R) });
      }
      Q[4] = [], Q[5] = [], Q[6] = [];
      for (var P = 0; P <= r.e.r; ++P)
        V = [], V[1] = V[2] = [{ type: 0, data: qe(P + 726270) }], Q[4].push({ type: 2, data: Tt(V) }), Q[5].push({ type: 0, data: qe(P) }), Q[6].push({ type: 0, data: qe(P) });
      T[Y].messages[0].data = Tt(Q);
    }
    m.content = Ur($r(T)), m.size = m.content.length, delete x[46];
    var H = mt(x[4][0].data);
    {
      H[7][0].data = qe(r.e.r + 1);
      var G = mt(H[1][0].data), C = Xn(G[2][0].data);
      m = et.find(l, s[C].location), T = tn(nn(m.content));
      {
        if (T[0].id != C)
          throw "Bad HeaderStorageBucket";
        var se = mt(T[0].messages[0].data);
        for (P = 0; P < a.length; ++P) {
          var w = mt(se[2][0].data);
          w[1][0].data = qe(P), w[4][0].data = qe(a[P].length), se[2][P] = { type: se[2][0].type, data: Tt(w) };
        }
        T[0].messages[0].data = Tt(se);
      }
      m.content = Ur($r(T)), m.size = m.content.length;
      var U = Xn(H[2][0].data);
      m = et.find(l, s[U].location), T = tn(nn(m.content));
      {
        if (T[0].id != U)
          throw "Bad HeaderStorageBucket";
        for (se = mt(T[0].messages[0].data), R = 0; R <= r.e.c; ++R)
          w = mt(se[2][0].data), w[1][0].data = qe(R), w[4][0].data = qe(r.e.r + 1), se[2][R] = { type: se[2][0].type, data: Tt(w) };
        T[0].messages[0].data = Tt(se);
      }
      m.content = Ur($r(T)), m.size = m.content.length;
      var I = Xn(H[4][0].data);
      (function() {
        for (var z = et.find(l, s[I].location), L = tn(nn(z.content)), O, X = 0; X < L.length; ++X) {
          var le = L[X];
          le.id == I && (O = le);
        }
        var pe = mt(O.messages[0].data);
        {
          pe[3] = [];
          var me = [];
          o.forEach(function(Z, _e) {
            me[1] = [{ type: 0, data: qe(_e) }], me[2] = [{ type: 0, data: qe(1) }], me[3] = [{ type: 2, data: a2(Z) }], pe[3].push({ type: 2, data: Tt(me) });
          });
        }
        O.messages[0].data = Tt(pe);
        var he = $r(L), ue = Ur(he);
        z.content = ue, z.size = z.content.length;
      })();
      var j = mt(H[3][0].data);
      {
        var K = j[1][0];
        delete j[2];
        var ee = mt(K.data);
        {
          var J = Xn(ee[2][0].data);
          (function() {
            for (var z = et.find(l, s[J].location), L = tn(nn(z.content)), O, X = 0; X < L.length; ++X) {
              var le = L[X];
              le.id == J && (O = le);
            }
            var pe = mt(O.messages[0].data);
            {
              delete pe[6], delete j[7];
              var me = new Uint8Array(pe[5][0].data);
              pe[5] = [];
              for (var he = 0, ue = 0; ue <= r.e.r; ++ue) {
                var Z = mt(me);
                he += u2(Z, a[ue], o), Z[1][0].data = qe(ue), pe[5].push({ data: Tt(Z), type: 2 });
              }
              pe[1] = [{ type: 0, data: qe(r.e.c + 1) }], pe[2] = [{ type: 0, data: qe(r.e.r + 1) }], pe[3] = [{ type: 0, data: qe(he) }], pe[4] = [{ type: 0, data: qe(r.e.r + 1) }];
            }
            O.messages[0].data = Tt(pe);
            var _e = $r(L), F = Ur(_e);
            z.content = F, z.size = z.content.length;
          })();
        }
        K.data = Tt(ee);
      }
      H[3][0].data = Tt(j);
    }
    x[4][0].data = Tt(H);
  }
  d.messages[0].data = Tt(x);
  var de = $r(h), A = Ur(de);
  return f.content = A, f.size = f.content.length, l;
}
function f2(e) {
  return function(n) {
    for (var r = 0; r != e.length; ++r) {
      var i = e[r];
      n[i[0]] === void 0 && (n[i[0]] = i[1]), i[2] === "n" && (n[i[0]] = Number(n[i[0]]));
    }
  };
}
function ml(e) {
  f2([
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
function h2(e, t) {
  return t.bookType == "ods" ? Of(e, t) : t.bookType == "numbers" ? c2(e, t) : t.bookType == "xlsb" ? d2(e, t) : v2(e, t);
}
function d2(e, t) {
  Wr = 1024, e && !e.SSF && (e.SSF = zt(ft)), e && e.SSF && (ko(), Fo(e.SSF), t.revssf = Io(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, Ii ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var n = t.bookType == "xlsb" ? "bin" : "xml", r = df.indexOf(t.bookType) > -1, i = zc();
  ml(t = t || {});
  var a = tl(), o = "", s = 0;
  if (t.cellXfs = [], sr(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), o = "docProps/core.xml", He(a, o, Gc(e.Props, t)), i.coreprops.push(o), je(t.rels, 2, o, Ge.CORE_PROPS), o = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var u = [], l = 0; l < e.SheetNames.length; ++l)
      (e.Workbook.Sheets[l] || {}).Hidden != 2 && u.push(e.SheetNames[l]);
    e.Props.SheetNames = u;
  }
  for (e.Props.Worksheets = e.Props.SheetNames.length, He(a, o, Yc(e.Props)), i.extprops.push(o), je(t.rels, 3, o, Ge.EXT_PROPS), e.Custprops !== e.Props && Ft(e.Custprops || {}).length > 0 && (o = "docProps/custom.xml", He(a, o, Kc(e.Custprops)), i.custprops.push(o), je(t.rels, 4, o, Ge.CUST_PROPS)), s = 1; s <= e.SheetNames.length; ++s) {
    var c = { "!id": {} }, f = e.Sheets[e.SheetNames[s - 1]], h = (f || {})["!type"] || "sheet";
    switch (h) {
      case "chart":
      default:
        o = "xl/worksheets/sheet" + s + "." + n, He(a, o, g_(s - 1, o, t, e, c)), i.sheets.push(o), je(t.wbrels, -1, "worksheets/sheet" + s + "." + n, Ge.WS[0]);
    }
    if (f) {
      var d = f["!comments"], p = !1, v = "";
      d && d.length > 0 && (v = "xl/comments" + s + "." + n, He(a, v, __(d, v)), i.comments.push(v), je(c, -1, "../comments" + s + "." + n, Ge.CMNT), p = !0), f["!legacy"] && p && He(a, "xl/drawings/vmlDrawing" + s + ".vml", ff(s, f["!comments"])), delete f["!comments"], delete f["!legacy"];
    }
    c["!id"].rId1 && He(a, Vc(o), Xr(c));
  }
  return t.Strings != null && t.Strings.length > 0 && (o = "xl/sharedStrings." + n, He(a, o, x_(t.Strings, o, t)), i.strs.push(o), je(t.wbrels, -1, "sharedStrings." + n, Ge.SST)), o = "xl/workbook." + n, He(a, o, p_(e, o)), i.workbooks.push(o), je(t.rels, 1, o, Ge.WB), o = "xl/theme/theme1.xml", He(a, o, uf(e.Themes, t)), i.themes.push(o), je(t.wbrels, -1, "theme/theme1.xml", Ge.THEME), o = "xl/styles." + n, He(a, o, m_(e, o, t)), i.styles.push(o), je(t.wbrels, -1, "styles." + n, Ge.STY), e.vbaraw && r && (o = "xl/vbaProject.bin", He(a, o, e.vbaraw), i.vba.push(o), je(t.wbrels, -1, "vbaProject.bin", Ge.VBA)), o = "xl/metadata." + n, He(a, o, w_(o)), i.metadata.push(o), je(t.wbrels, -1, "metadata." + n, Ge.XLMETA), He(a, "[Content_Types].xml", Hc(i, t)), He(a, "_rels/.rels", Xr(t.rels)), He(a, "xl/_rels/workbook." + n + ".rels", Xr(t.wbrels)), delete t.revssf, delete t.ssf, a;
}
function v2(e, t) {
  Wr = 1024, e && !e.SSF && (e.SSF = zt(ft)), e && e.SSF && (ko(), Fo(e.SSF), t.revssf = Io(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, Ii ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var n = "xml", r = df.indexOf(t.bookType) > -1, i = zc();
  ml(t = t || {});
  var a = tl(), o = "", s = 0;
  if (t.cellXfs = [], sr(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), o = "docProps/core.xml", He(a, o, Gc(e.Props, t)), i.coreprops.push(o), je(t.rels, 2, o, Ge.CORE_PROPS), o = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var u = [], l = 0; l < e.SheetNames.length; ++l)
      (e.Workbook.Sheets[l] || {}).Hidden != 2 && u.push(e.SheetNames[l]);
    e.Props.SheetNames = u;
  }
  e.Props.Worksheets = e.Props.SheetNames.length, He(a, o, Yc(e.Props)), i.extprops.push(o), je(t.rels, 3, o, Ge.EXT_PROPS), e.Custprops !== e.Props && Ft(e.Custprops || {}).length > 0 && (o = "docProps/custom.xml", He(a, o, Kc(e.Custprops)), i.custprops.push(o), je(t.rels, 4, o, Ge.CUST_PROPS));
  var c = ["SheetJ5"];
  for (t.tcid = 0, s = 1; s <= e.SheetNames.length; ++s) {
    var f = { "!id": {} }, h = e.Sheets[e.SheetNames[s - 1]], d = (h || {})["!type"] || "sheet";
    switch (d) {
      case "chart":
      default:
        o = "xl/worksheets/sheet" + s + "." + n, He(a, o, Ef(s - 1, t, e, f)), i.sheets.push(o), je(t.wbrels, -1, "worksheets/sheet" + s + "." + n, Ge.WS[0]);
    }
    if (h) {
      var p = h["!comments"], v = !1, g = "";
      if (p && p.length > 0) {
        var x = !1;
        p.forEach(function(y) {
          y[1].forEach(function(m) {
            m.T == !0 && (x = !0);
          });
        }), x && (g = "xl/threadedComments/threadedComment" + s + "." + n, He(a, g, Gp(p, c, t)), i.threadedcomments.push(g), je(f, -1, "../threadedComments/threadedComment" + s + "." + n, Ge.TCMNT)), g = "xl/comments" + s + "." + n, He(a, g, hf(p)), i.comments.push(g), je(f, -1, "../comments" + s + "." + n, Ge.CMNT), v = !0;
      }
      h["!legacy"] && v && He(a, "xl/drawings/vmlDrawing" + s + ".vml", ff(s, h["!comments"])), delete h["!comments"], delete h["!legacy"];
    }
    f["!id"].rId1 && He(a, Vc(o), Xr(f));
  }
  return t.Strings != null && t.Strings.length > 0 && (o = "xl/sharedStrings." + n, He(a, o, nf(t.Strings, t)), i.strs.push(o), je(t.wbrels, -1, "sharedStrings." + n, Ge.SST)), o = "xl/workbook." + n, He(a, o, Af(e)), i.workbooks.push(o), je(t.rels, 1, o, Ge.WB), o = "xl/theme/theme1.xml", He(a, o, uf(e.Themes, t)), i.themes.push(o), je(t.wbrels, -1, "theme/theme1.xml", Ge.THEME), o = "xl/styles." + n, He(a, o, sf(e, t)), i.styles.push(o), je(t.wbrels, -1, "styles." + n, Ge.STY), e.vbaraw && r && (o = "xl/vbaProject.bin", He(a, o, e.vbaraw), i.vba.push(o), je(t.wbrels, -1, "vbaProject.bin", Ge.VBA)), o = "xl/metadata." + n, He(a, o, cf()), i.metadata.push(o), je(t.wbrels, -1, "metadata." + n, Ge.XLMETA), c.length > 1 && (o = "xl/persons/person.xml", He(a, o, Xp(c)), i.people.push(o), je(t.wbrels, -1, "persons/person.xml", Ge.PEOPLE)), He(a, "[Content_Types].xml", Hc(i, t)), He(a, "_rels/.rels", Xr(t.rels)), He(a, "xl/_rels/workbook." + n + ".rels", Xr(t.wbrels)), delete t.revssf, delete t.ssf, a;
}
function p2(e, t) {
  var n = "";
  switch ((t || {}).type || "base64") {
    case "buffer":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    case "base64":
      n = Un(e.slice(0, 12));
      break;
    case "binary":
      n = e;
      break;
    case "array":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    default:
      throw new Error("Unrecognized type " + (t && t.type || "undefined"));
  }
  return [n.charCodeAt(0), n.charCodeAt(1), n.charCodeAt(2), n.charCodeAt(3), n.charCodeAt(4), n.charCodeAt(5), n.charCodeAt(6), n.charCodeAt(7)];
}
function Df(e, t) {
  switch (t.type) {
    case "base64":
    case "binary":
      break;
    case "buffer":
    case "array":
      t.type = "";
      break;
    case "file":
      return ta(t.file, et.write(e, { type: Xe ? "buffer" : "" }));
    case "string":
      throw new Error("'string' output type invalid for '" + t.bookType + "' files");
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  return et.write(e, t);
}
function g2(e, t) {
  var n = zt(t || {}), r = h2(e, n);
  return m2(r, n);
}
function m2(e, t) {
  var n = {}, r = Xe ? "nodebuffer" : typeof Uint8Array < "u" ? "array" : "string";
  if (t.compression && (n.compression = "DEFLATE"), t.password) n.type = r;
  else switch (t.type) {
    case "base64":
      n.type = "base64";
      break;
    case "binary":
      n.type = "string";
      break;
    case "string":
      throw new Error("'string' output type invalid for '" + t.bookType + "' files");
    case "buffer":
    case "file":
      n.type = r;
      break;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  var i = e.FullPaths ? et.write(e, { fileType: "zip", type: (
    /*::(*/
    { nodebuffer: "buffer", string: "binary" }[n.type] || n.type
  ), compression: !!t.compression }) : e.generate(n);
  if (typeof Deno < "u" && typeof i == "string") {
    if (t.type == "binary" || t.type == "base64") return i;
    i = new Uint8Array(No(i));
  }
  return t.password && typeof encrypt_agile < "u" ? Df(encrypt_agile(i, t.password), t) : t.type === "file" ? ta(t.file, i) : t.type == "string" ? Ci(
    /*::(*/
    i
    /*:: :any)*/
  ) : i;
}
function x2(e, t) {
  var n = t || {}, r = M_(e, n);
  return Df(r, n);
}
function gn(e, t, n) {
  n || (n = "");
  var r = n + e;
  switch (t.type) {
    case "base64":
      return Ri(Li(r));
    case "binary":
      return Li(r);
    case "string":
      return e;
    case "file":
      return ta(t.file, r, "utf8");
    case "buffer":
      return Xe ? Gn(r, "utf8") : typeof TextEncoder < "u" ? new TextEncoder().encode(r) : gn(r, { type: "binary" }).split("").map(function(i) {
        return i.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function _2(e, t) {
  switch (t.type) {
    case "base64":
      return Ri(e);
    case "binary":
      return e;
    case "string":
      return e;
    case "file":
      return ta(t.file, e, "binary");
    case "buffer":
      return Xe ? Gn(e, "binary") : e.split("").map(function(n) {
        return n.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function wa(e, t) {
  switch (t.type) {
    case "string":
    case "base64":
    case "binary":
      for (var n = "", r = 0; r < e.length; ++r) n += String.fromCharCode(e[r]);
      return t.type == "base64" ? Ri(n) : t.type == "string" ? Ci(n) : n;
    case "file":
      return ta(t.file, e);
    case "buffer":
      return e;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
}
function bf(e, t) {
  Yd(), i_(e);
  var n = zt(t || {});
  if (n.cellStyles && (n.cellNF = !0, n.sheetStubs = !0), n.type == "array") {
    n.type = "binary";
    var r = bf(e, n);
    return n.type = "array", No(r);
  }
  var i = 0;
  if (n.sheet && (typeof n.sheet == "number" ? i = n.sheet : i = e.SheetNames.indexOf(n.sheet), !e.SheetNames[i]))
    throw new Error("Sheet not found: " + n.sheet + " : " + typeof n.sheet);
  switch (n.bookType || "xlsb") {
    case "xml":
    case "xlml":
      return gn(D_(e, n), n);
    case "slk":
    case "sylk":
      return gn(tp.from_sheet(e.Sheets[e.SheetNames[i]], n), n);
    case "htm":
    case "html":
      return gn(Ff(e.Sheets[e.SheetNames[i]], n), n);
    case "txt":
      return _2(Mf(e.Sheets[e.SheetNames[i]], n), n);
    case "csv":
      return gn(xl(e.Sheets[e.SheetNames[i]], n), n, "\uFEFF");
    case "dif":
      return gn(np.from_sheet(e.Sheets[e.SheetNames[i]], n), n);
    case "dbf":
      return wa(ep.from_sheet(e.Sheets[e.SheetNames[i]], n), n);
    case "prn":
      return gn(rp.from_sheet(e.Sheets[e.SheetNames[i]], n), n);
    case "rtf":
      return gn(cp.from_sheet(e.Sheets[e.SheetNames[i]], n), n);
    case "eth":
      return gn(tf.from_sheet(e.Sheets[e.SheetNames[i]], n), n);
    case "fods":
      return gn(Of(e, n), n);
    case "wk1":
      return wa(Mu.sheet_to_wk1(e.Sheets[e.SheetNames[i]], n), n);
    case "wk3":
      return wa(Mu.book_to_wk3(e, n), n);
    case "biff2":
      n.biff || (n.biff = 2);
    case "biff3":
      n.biff || (n.biff = 3);
    case "biff4":
      return n.biff || (n.biff = 4), wa(Nf(e, n), n);
    case "biff5":
      n.biff || (n.biff = 5);
    case "biff8":
    case "xla":
    case "xls":
      return n.biff || (n.biff = 8), x2(e, n);
    case "xlsx":
    case "xlsm":
    case "xlam":
    case "xlsb":
    case "numbers":
    case "ods":
      return g2(e, n);
    default:
      throw new Error("Unrecognized bookType |" + n.bookType + "|");
  }
}
function w2(e) {
  if (!e.bookType) {
    var t = {
      xls: "biff8",
      htm: "html",
      slk: "sylk",
      socialcalc: "eth",
      Sh33tJS: "WTF"
    }, n = e.file.slice(e.file.lastIndexOf(".")).toLowerCase();
    n.match(/^\.[a-z]+$/) && (e.bookType = n.slice(1)), e.bookType = t[e.bookType] || e.bookType;
  }
}
function Hu(e, t, n) {
  var r = {};
  return r.type = "file", r.file = t, w2(r), bf(e, r);
}
function y2(e, t, n, r, i, a, o, s) {
  var u = Nt(n), l = s.defval, c = s.raw || !Object.prototype.hasOwnProperty.call(s, "raw"), f = !0, h = i === 1 ? [] : {};
  if (i !== 1)
    if (Object.defineProperty) try {
      Object.defineProperty(h, "__rowNum__", { value: n, enumerable: !1 });
    } catch {
      h.__rowNum__ = n;
    }
    else h.__rowNum__ = n;
  if (!o || e[n]) for (var d = t.s.c; d <= t.e.c; ++d) {
    var p = o ? e[n][d] : e[r[d] + u];
    if (p === void 0 || p.t === void 0) {
      if (l === void 0) continue;
      a[d] != null && (h[a[d]] = l);
      continue;
    }
    var v = p.v;
    switch (p.t) {
      case "z":
        if (v == null) break;
        continue;
      case "e":
        v = v == 0 ? null : void 0;
        break;
      case "s":
      case "d":
      case "b":
      case "n":
        break;
      default:
        throw new Error("unrecognized type " + p.t);
    }
    if (a[d] != null) {
      if (v == null)
        if (p.t == "e" && v === null) h[a[d]] = null;
        else if (l !== void 0) h[a[d]] = l;
        else if (c && v === null) h[a[d]] = null;
        else continue;
      else
        h[a[d]] = c && (p.t !== "n" || p.t === "n" && s.rawNumbers !== !1) ? v : zn(p, v, s);
      v != null && (f = !1);
    }
  }
  return { row: h, isempty: f };
}
function so(e, t) {
  if (e == null || e["!ref"] == null) return [];
  var n = { t: "n", v: 0 }, r = 0, i = 1, a = [], o = 0, s = "", u = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, l = t || {}, c = l.range != null ? l.range : e["!ref"];
  switch (l.header === 1 ? r = 1 : l.header === "A" ? r = 2 : Array.isArray(l.header) ? r = 3 : l.header == null && (r = 0), typeof c) {
    case "string":
      u = rt(c);
      break;
    case "number":
      u = rt(e["!ref"]), u.s.r = c;
      break;
    default:
      u = c;
  }
  r > 0 && (i = 0);
  var f = Nt(u.s.r), h = [], d = [], p = 0, v = 0, g = Array.isArray(e), x = u.s.r, y = 0, m = {};
  g && !e[x] && (e[x] = []);
  var T = l.skipHidden && e["!cols"] || [], Y = l.skipHidden && e["!rows"] || [];
  for (y = u.s.c; y <= u.e.c; ++y)
    if (!(T[y] || {}).hidden)
      switch (h[y] = It(y), n = g ? e[x][y] : e[h[y] + f], r) {
        case 1:
          a[y] = y - u.s.c;
          break;
        case 2:
          a[y] = h[y];
          break;
        case 3:
          a[y] = l.header[y - u.s.c];
          break;
        default:
          if (n == null && (n = { w: "__EMPTY", t: "s" }), s = o = zn(n, null, l), v = m[o] || 0, !v) m[o] = 1;
          else {
            do
              s = o + "_" + v++;
            while (m[s]);
            m[o] = v, m[s] = 1;
          }
          a[y] = s;
      }
  for (x = u.s.r + i; x <= u.e.r; ++x)
    if (!(Y[x] || {}).hidden) {
      var Q = y2(e, u, x, h, r, a, g, l);
      (Q.isempty === !1 || (r === 1 ? l.blankrows !== !1 : l.blankrows)) && (d[p++] = Q.row);
    }
  return d.length = p, d;
}
var Vu = /"/g;
function E2(e, t, n, r, i, a, o, s) {
  for (var u = !0, l = [], c = "", f = Nt(n), h = t.s.c; h <= t.e.c; ++h)
    if (r[h]) {
      var d = s.dense ? (e[n] || [])[h] : e[r[h] + f];
      if (d == null) c = "";
      else if (d.v != null) {
        u = !1, c = "" + (s.rawNumbers && d.t == "n" ? d.v : zn(d, null, s));
        for (var p = 0, v = 0; p !== c.length; ++p) if ((v = c.charCodeAt(p)) === i || v === a || v === 34 || s.forceQuotes) {
          c = '"' + c.replace(Vu, '""') + '"';
          break;
        }
        c == "ID" && (c = '"ID"');
      } else d.f != null && !d.F ? (u = !1, c = "=" + d.f, c.indexOf(",") >= 0 && (c = '"' + c.replace(Vu, '""') + '"')) : c = "";
      l.push(c);
    }
  return s.blankrows === !1 && u ? null : l.join(o);
}
function xl(e, t) {
  var n = [], r = t ?? {};
  if (e == null || e["!ref"] == null) return "";
  var i = rt(e["!ref"]), a = r.FS !== void 0 ? r.FS : ",", o = a.charCodeAt(0), s = r.RS !== void 0 ? r.RS : `
`, u = s.charCodeAt(0), l = new RegExp((a == "|" ? "\\|" : a) + "+$"), c = "", f = [];
  r.dense = Array.isArray(e);
  for (var h = r.skipHidden && e["!cols"] || [], d = r.skipHidden && e["!rows"] || [], p = i.s.c; p <= i.e.c; ++p) (h[p] || {}).hidden || (f[p] = It(p));
  for (var v = 0, g = i.s.r; g <= i.e.r; ++g)
    (d[g] || {}).hidden || (c = E2(e, i, g, f, o, u, a, r), c != null && (r.strip && (c = c.replace(l, "")), (c || r.blankrows !== !1) && n.push((v++ ? s : "") + c)));
  return delete r.dense, n.join("");
}
function Mf(e, t) {
  t || (t = {}), t.FS = "	", t.RS = `
`;
  var n = xl(e, t);
  return n;
}
function T2(e) {
  var t = "", n, r = "";
  if (e == null || e["!ref"] == null) return [];
  var i = rt(e["!ref"]), a = "", o = [], s, u = [], l = Array.isArray(e);
  for (s = i.s.c; s <= i.e.c; ++s) o[s] = It(s);
  for (var c = i.s.r; c <= i.e.r; ++c)
    for (a = Nt(c), s = i.s.c; s <= i.e.c; ++s)
      if (t = o[s] + a, n = l ? (e[c] || [])[s] : e[t], r = "", n !== void 0) {
        if (n.F != null) {
          if (t = n.F, !n.f) continue;
          r = n.f, t.indexOf(":") == -1 && (t = t + ":" + t);
        }
        if (n.f != null) r = n.f;
        else {
          if (n.t == "z") continue;
          if (n.t == "n" && n.v != null) r = "" + n.v;
          else if (n.t == "b") r = n.v ? "TRUE" : "FALSE";
          else if (n.w !== void 0) r = "'" + n.w;
          else {
            if (n.v === void 0) continue;
            n.t == "s" ? r = "'" + n.v : r = "" + n.v;
          }
        }
        u[u.length] = t + "=" + r;
      }
  return u;
}
function Rf(e, t, n) {
  var r = n || {}, i = +!r.skipHeader, a = e || {}, o = 0, s = 0;
  if (a && r.origin != null)
    if (typeof r.origin == "number") o = r.origin;
    else {
      var u = typeof r.origin == "string" ? yt(r.origin) : r.origin;
      o = u.r, s = u.c;
    }
  var l, c = { s: { c: 0, r: 0 }, e: { c: s, r: o + t.length - 1 + i } };
  if (a["!ref"]) {
    var f = rt(a["!ref"]);
    c.e.c = Math.max(c.e.c, f.e.c), c.e.r = Math.max(c.e.r, f.e.r), o == -1 && (o = f.e.r + 1, c.e.r = o + t.length - 1 + i);
  } else
    o == -1 && (o = 0, c.e.r = t.length - 1 + i);
  var h = r.header || [], d = 0;
  t.forEach(function(v, g) {
    Ft(v).forEach(function(x) {
      (d = h.indexOf(x)) == -1 && (h[d = h.length] = x);
      var y = v[x], m = "z", T = "", Y = Qe({ c: s + d, r: o + g + i });
      l = Ui(a, Y), y && typeof y == "object" && !(y instanceof Date) ? a[Y] = y : (typeof y == "number" ? m = "n" : typeof y == "boolean" ? m = "b" : typeof y == "string" ? m = "s" : y instanceof Date ? (m = "d", r.cellDates || (m = "n", y = Ut(y)), T = r.dateNF || ft[14]) : y === null && r.nullError && (m = "e", y = 0), l ? (l.t = m, l.v = y, delete l.w, delete l.R, T && (l.z = T)) : a[Y] = l = { t: m, v: y }, T && (l.z = T));
    });
  }), c.e.c = Math.max(c.e.c, s + h.length - 1);
  var p = Nt(o);
  if (i) for (d = 0; d < h.length; ++d) a[It(d + s) + p] = { t: "s", v: h[d] };
  return a["!ref"] = pt(c), a;
}
function S2(e, t) {
  return Rf(null, e, t);
}
function Ui(e, t, n) {
  if (typeof t == "string") {
    if (Array.isArray(e)) {
      var r = yt(t);
      return e[r.r] || (e[r.r] = []), e[r.r][r.c] || (e[r.r][r.c] = { t: "z" });
    }
    return e[t] || (e[t] = { t: "z" });
  }
  return typeof t != "number" ? Ui(e, Qe(t)) : Ui(e, Qe({ r: t, c: n || 0 }));
}
function A2(e, t) {
  if (typeof t == "number") {
    if (t >= 0 && e.SheetNames.length > t) return t;
    throw new Error("Cannot find sheet # " + t);
  } else if (typeof t == "string") {
    var n = e.SheetNames.indexOf(t);
    if (n > -1) return n;
    throw new Error("Cannot find sheet name |" + t + "|");
  } else throw new Error("Cannot find sheet |" + t + "|");
}
function C2() {
  return { SheetNames: [], Sheets: {} };
}
function N2(e, t, n, r) {
  var i = 1;
  if (!n) for (; i <= 65535 && e.SheetNames.indexOf(n = "Sheet" + i) != -1; ++i, n = void 0) ;
  if (!n || e.SheetNames.length >= 65535) throw new Error("Too many worksheets");
  if (r && e.SheetNames.indexOf(n) >= 0) {
    var a = n.match(/(^.*?)(\d+)$/);
    i = a && +a[2] || 0;
    var o = a && a[1] || n;
    for (++i; i <= 65535 && e.SheetNames.indexOf(n = o + i) != -1; ++i) ;
  }
  if (Sf(n), e.SheetNames.indexOf(n) >= 0) throw new Error("Worksheet with name |" + n + "| already exists!");
  return e.SheetNames.push(n), e.Sheets[n] = t, n;
}
function F2(e, t, n) {
  e.Workbook || (e.Workbook = {}), e.Workbook.Sheets || (e.Workbook.Sheets = []);
  var r = A2(e, t);
  switch (e.Workbook.Sheets[r] || (e.Workbook.Sheets[r] = {}), n) {
    case 0:
    case 1:
    case 2:
      break;
    default:
      throw new Error("Bad sheet visibility setting " + n);
  }
  e.Workbook.Sheets[r].Hidden = n;
}
function k2(e, t) {
  return e.z = t, e;
}
function Pf(e, t, n) {
  return t ? (e.l = { Target: t }, n && (e.l.Tooltip = n)) : delete e.l, e;
}
function I2(e, t, n) {
  return Pf(e, "#" + t, n);
}
function O2(e, t, n) {
  e.c || (e.c = []), e.c.push({ t, a: n || "SheetJS" });
}
function D2(e, t, n, r) {
  for (var i = typeof t != "string" ? t : rt(t), a = typeof t == "string" ? t : pt(t), o = i.s.r; o <= i.e.r; ++o) for (var s = i.s.c; s <= i.e.c; ++s) {
    var u = Ui(e, o, s);
    u.t = "n", u.F = a, delete u.v, o == i.s.r && s == i.s.c && (u.f = n, r && (u.D = !0));
  }
  return e;
}
var vn = {
  encode_col: It,
  encode_row: Nt,
  encode_cell: Qe,
  encode_range: pt,
  decode_col: sl,
  decode_row: ol,
  split_cell: Y1,
  decode_cell: yt,
  decode_range: Kt,
  format_cell: zn,
  sheet_add_aoa: Rc,
  sheet_add_json: Rf,
  sheet_add_dom: kf,
  aoa_to_sheet: li,
  json_to_sheet: S2,
  table_to_sheet: If,
  table_to_book: n2,
  sheet_to_csv: xl,
  sheet_to_txt: Mf,
  sheet_to_json: so,
  sheet_to_html: Ff,
  sheet_to_formulae: T2,
  sheet_to_row_object_array: so,
  sheet_get_cell: Ui,
  book_new: C2,
  book_append_sheet: N2,
  book_set_sheet_visibility: F2,
  cell_set_number_format: k2,
  cell_set_hyperlink: Pf,
  cell_set_internal_link: I2,
  cell_add_comment: O2,
  sheet_set_array_formula: D2,
  consts: {
    SHEET_VISIBLE: 0,
    SHEET_HIDDEN: 1,
    SHEET_VERY_HIDDEN: 2
  }
};
function zi(e) {
  return J0() ? (Ra(e), !0) : !1;
}
function Dn(e) {
  return typeof e == "function" ? e() : W(e);
}
const b2 = typeof window < "u" && typeof document < "u", M2 = (e) => typeof e < "u", R2 = Object.prototype.toString, P2 = (e) => R2.call(e) === "[object Object]", L2 = () => {
};
function B2(e, t) {
  function n(...r) {
    return new Promise((i, a) => {
      Promise.resolve(e(() => t.apply(this, r), { fn: t, thisArg: this, args: r })).then(i).catch(a);
    });
  }
  return n;
}
const Lf = (e) => e();
function $2(e = Lf) {
  const t = $e(!0);
  function n() {
    t.value = !1;
  }
  function r() {
    t.value = !0;
  }
  const i = (...a) => {
    t.value && e(...a);
  };
  return { isActive: Ud(t), pause: n, resume: r, eventFilter: i };
}
function Wu(e, t = !1, n = "Timeout") {
  return new Promise((r, i) => {
    setTimeout(t ? () => i(n) : r, e);
  });
}
function U2(e, t, n = {}) {
  const {
    eventFilter: r = Lf,
    ...i
  } = n;
  return tt(
    e,
    B2(
      r,
      t
    ),
    i
  );
}
function zr(e, t, n = {}) {
  const {
    eventFilter: r,
    ...i
  } = n, { eventFilter: a, pause: o, resume: s, isActive: u } = $2(r);
  return { stop: U2(
    e,
    t,
    {
      ...i,
      eventFilter: a
    }
  ), pause: o, resume: s, isActive: u };
}
function z2(e, t = {}) {
  if (!qs(e))
    return Ld(e);
  const n = Array.isArray(e.value) ? Array.from({ length: e.value.length }) : {};
  for (const r in e.value)
    n[r] = Bd(() => ({
      get() {
        return e.value[r];
      },
      set(i) {
        var a;
        if ((a = Dn(t.replaceRef)) != null ? a : !0)
          if (Array.isArray(e.value)) {
            const s = [...e.value];
            s[r] = i, e.value = s;
          } else {
            const s = { ...e.value, [r]: i };
            Object.setPrototypeOf(s, Object.getPrototypeOf(e.value)), e.value = s;
          }
        else
          e.value[r] = i;
      }
    }));
  return n;
}
function Cs(e, t = !1) {
  function n(f, { flush: h = "sync", deep: d = !1, timeout: p, throwOnTimeout: v } = {}) {
    let g = null;
    const y = [new Promise((m) => {
      g = tt(
        e,
        (T) => {
          f(T) !== t && (g == null || g(), m(T));
        },
        {
          flush: h,
          deep: d,
          immediate: !0
        }
      );
    })];
    return p != null && y.push(
      Wu(p, v).then(() => Dn(e)).finally(() => g == null ? void 0 : g())
    ), Promise.race(y);
  }
  function r(f, h) {
    if (!qs(f))
      return n((T) => T === f, h);
    const { flush: d = "sync", deep: p = !1, timeout: v, throwOnTimeout: g } = h ?? {};
    let x = null;
    const m = [new Promise((T) => {
      x = tt(
        [e, f],
        ([Y, Q]) => {
          t !== (Y === Q) && (x == null || x(), T(Y));
        },
        {
          flush: d,
          deep: p,
          immediate: !0
        }
      );
    })];
    return v != null && m.push(
      Wu(v, g).then(() => Dn(e)).finally(() => (x == null || x(), Dn(e)))
    ), Promise.race(m);
  }
  function i(f) {
    return n((h) => !!h, f);
  }
  function a(f) {
    return r(null, f);
  }
  function o(f) {
    return r(void 0, f);
  }
  function s(f) {
    return n(Number.isNaN, f);
  }
  function u(f, h) {
    return n((d) => {
      const p = Array.from(d);
      return p.includes(f) || p.includes(Dn(f));
    }, h);
  }
  function l(f) {
    return c(1, f);
  }
  function c(f = 1, h) {
    let d = -1;
    return n(() => (d += 1, d >= f), h);
  }
  return Array.isArray(Dn(e)) ? {
    toMatch: n,
    toContains: u,
    changed: l,
    changedTimes: c,
    get not() {
      return Cs(e, !t);
    }
  } : {
    toMatch: n,
    toBe: r,
    toBeTruthy: i,
    toBeNull: a,
    toBeNaN: s,
    toBeUndefined: o,
    changed: l,
    changedTimes: c,
    get not() {
      return Cs(e, !t);
    }
  };
}
function Ns(e) {
  return Cs(e);
}
function H2(e) {
  var t;
  const n = Dn(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const Bf = b2 ? window : void 0;
function $f(...e) {
  let t, n, r, i;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, r, i] = e, t = Bf) : [t, n, r, i] = e, !t)
    return L2;
  Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
  const a = [], o = () => {
    a.forEach((c) => c()), a.length = 0;
  }, s = (c, f, h, d) => (c.addEventListener(f, h, d), () => c.removeEventListener(f, h, d)), u = tt(
    () => [H2(t), Dn(i)],
    ([c, f]) => {
      if (o(), !c)
        return;
      const h = P2(f) ? { ...f } : f;
      a.push(
        ...n.flatMap((d) => r.map((p) => s(c, d, p, h)))
      );
    },
    { immediate: !0, flush: "post" }
  ), l = () => {
    u(), o();
  };
  return zi(l), l;
}
function V2(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function Gu(...e) {
  let t, n, r = {};
  e.length === 3 ? (t = e[0], n = e[1], r = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], r = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
  const {
    target: i = Bf,
    eventName: a = "keydown",
    passive: o = !1,
    dedupe: s = !1
  } = r, u = V2(t);
  return $f(i, a, (c) => {
    c.repeat && Dn(s) || u(c) && n(c);
  }, o);
}
function W2(e) {
  return JSON.parse(JSON.stringify(e));
}
function ss(e, t, n, r = {}) {
  var i, a, o;
  const {
    clone: s = !1,
    passive: u = !1,
    eventName: l,
    deep: c = !1,
    defaultValue: f,
    shouldEmit: h
  } = r, d = oi(), p = n || (d == null ? void 0 : d.emit) || ((i = d == null ? void 0 : d.$emit) == null ? void 0 : i.bind(d)) || ((o = (a = d == null ? void 0 : d.proxy) == null ? void 0 : a.$emit) == null ? void 0 : o.bind(d == null ? void 0 : d.proxy));
  let v = l;
  t || (t = "modelValue"), v = v || `update:${t.toString()}`;
  const g = (m) => s ? typeof s == "function" ? s(m) : W2(m) : m, x = () => M2(e[t]) ? g(e[t]) : f, y = (m) => {
    h ? h(m) && p(v, m) : p(v, m);
  };
  if (u) {
    const m = x(), T = $e(m);
    let Y = !1;
    return tt(
      () => e[t],
      (Q) => {
        Y || (Y = !0, T.value = g(Q), Pn(() => Y = !1));
      }
    ), tt(
      T,
      (Q) => {
        !Y && (Q !== e[t] || c) && y(Q);
      },
      { deep: c }
    ), T;
  } else
    return Re({
      get() {
        return x();
      },
      set(m) {
        y(m);
      }
    });
}
var G2 = { value: () => {
} };
function Ro() {
  for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
    if (!(r = arguments[e] + "") || r in n || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new La(n);
}
function La(e) {
  this._ = e;
}
function X2(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !t.hasOwnProperty(n))
      throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
La.prototype = Ro.prototype = {
  constructor: La,
  on: function(e, t) {
    var n = this._, r = X2(e + "", n), i, a = -1, o = r.length;
    if (arguments.length < 2) {
      for (; ++a < o; )
        if ((i = (e = r[a]).type) && (i = Y2(n[i], e.name)))
          return i;
      return;
    }
    if (t != null && typeof t != "function")
      throw new Error("invalid callback: " + t);
    for (; ++a < o; )
      if (i = (e = r[a]).type)
        n[i] = Xu(n[i], e.name, t);
      else if (t == null)
        for (i in n)
          n[i] = Xu(n[i], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t)
      e[n] = t[n].slice();
    return new La(e);
  },
  call: function(e, t) {
    if ((i = arguments.length - 2) > 0)
      for (var n = new Array(i), r = 0, i, a; r < i; ++r)
        n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(e))
      throw new Error("unknown type: " + e);
    for (a = this._[e], r = 0, i = a.length; r < i; ++r)
      a[r].value.apply(t, n);
  },
  apply: function(e, t, n) {
    if (!this._.hasOwnProperty(e))
      throw new Error("unknown type: " + e);
    for (var r = this._[e], i = 0, a = r.length; i < a; ++i)
      r[i].value.apply(t, n);
  }
};
function Y2(e, t) {
  for (var n = 0, r = e.length, i; n < r; ++n)
    if ((i = e[n]).name === t)
      return i.value;
}
function Xu(e, t, n) {
  for (var r = 0, i = e.length; r < i; ++r)
    if (e[r].name === t) {
      e[r] = G2, e = e.slice(0, r).concat(e.slice(r + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var Fs = "http://www.w3.org/1999/xhtml";
const Yu = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Fs,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Po(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), Yu.hasOwnProperty(t) ? { space: Yu[t], local: e } : e;
}
function K2(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === Fs && t.documentElement.namespaceURI === Fs ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function Z2(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Uf(e) {
  var t = Po(e);
  return (t.local ? Z2 : K2)(t);
}
function q2() {
}
function _l(e) {
  return e == null ? q2 : function() {
    return this.querySelector(e);
  };
}
function j2(e) {
  typeof e != "function" && (e = _l(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = t[i], o = a.length, s = r[i] = new Array(o), u, l, c = 0; c < o; ++c)
      (u = a[c]) && (l = e.call(u, u.__data__, c, a)) && ("__data__" in u && (l.__data__ = u.__data__), s[c] = l);
  return new Zt(r, this._parents);
}
function J2(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Q2() {
  return [];
}
function zf(e) {
  return e == null ? Q2 : function() {
    return this.querySelectorAll(e);
  };
}
function ew(e) {
  return function() {
    return J2(e.apply(this, arguments));
  };
}
function tw(e) {
  typeof e == "function" ? e = ew(e) : e = zf(e);
  for (var t = this._groups, n = t.length, r = [], i = [], a = 0; a < n; ++a)
    for (var o = t[a], s = o.length, u, l = 0; l < s; ++l)
      (u = o[l]) && (r.push(e.call(u, u.__data__, l, o)), i.push(u));
  return new Zt(r, i);
}
function Hf(e) {
  return function() {
    return this.matches(e);
  };
}
function Vf(e) {
  return function(t) {
    return t.matches(e);
  };
}
var nw = Array.prototype.find;
function rw(e) {
  return function() {
    return nw.call(this.children, e);
  };
}
function iw() {
  return this.firstElementChild;
}
function aw(e) {
  return this.select(e == null ? iw : rw(typeof e == "function" ? e : Vf(e)));
}
var ow = Array.prototype.filter;
function sw() {
  return Array.from(this.children);
}
function lw(e) {
  return function() {
    return ow.call(this.children, e);
  };
}
function uw(e) {
  return this.selectAll(e == null ? sw : lw(typeof e == "function" ? e : Vf(e)));
}
function cw(e) {
  typeof e != "function" && (e = Hf(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = t[i], o = a.length, s = r[i] = [], u, l = 0; l < o; ++l)
      (u = a[l]) && e.call(u, u.__data__, l, a) && s.push(u);
  return new Zt(r, this._parents);
}
function Wf(e) {
  return new Array(e.length);
}
function fw() {
  return new Zt(this._enter || this._groups.map(Wf), this._parents);
}
function lo(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
lo.prototype = {
  constructor: lo,
  appendChild: function(e) {
    return this._parent.insertBefore(e, this._next);
  },
  insertBefore: function(e, t) {
    return this._parent.insertBefore(e, t);
  },
  querySelector: function(e) {
    return this._parent.querySelector(e);
  },
  querySelectorAll: function(e) {
    return this._parent.querySelectorAll(e);
  }
};
function hw(e) {
  return function() {
    return e;
  };
}
function dw(e, t, n, r, i, a) {
  for (var o = 0, s, u = t.length, l = a.length; o < l; ++o)
    (s = t[o]) ? (s.__data__ = a[o], r[o] = s) : n[o] = new lo(e, a[o]);
  for (; o < u; ++o)
    (s = t[o]) && (i[o] = s);
}
function vw(e, t, n, r, i, a, o) {
  var s, u, l = /* @__PURE__ */ new Map(), c = t.length, f = a.length, h = new Array(c), d;
  for (s = 0; s < c; ++s)
    (u = t[s]) && (h[s] = d = o.call(u, u.__data__, s, t) + "", l.has(d) ? i[s] = u : l.set(d, u));
  for (s = 0; s < f; ++s)
    d = o.call(e, a[s], s, a) + "", (u = l.get(d)) ? (r[s] = u, u.__data__ = a[s], l.delete(d)) : n[s] = new lo(e, a[s]);
  for (s = 0; s < c; ++s)
    (u = t[s]) && l.get(h[s]) === u && (i[s] = u);
}
function pw(e) {
  return e.__data__;
}
function gw(e, t) {
  if (!arguments.length)
    return Array.from(this, pw);
  var n = t ? vw : dw, r = this._parents, i = this._groups;
  typeof e != "function" && (e = hw(e));
  for (var a = i.length, o = new Array(a), s = new Array(a), u = new Array(a), l = 0; l < a; ++l) {
    var c = r[l], f = i[l], h = f.length, d = mw(e.call(c, c && c.__data__, l, r)), p = d.length, v = s[l] = new Array(p), g = o[l] = new Array(p), x = u[l] = new Array(h);
    n(c, f, v, g, x, d, t);
    for (var y = 0, m = 0, T, Y; y < p; ++y)
      if (T = v[y]) {
        for (y >= m && (m = y + 1); !(Y = g[m]) && ++m < p; )
          ;
        T._next = Y || null;
      }
  }
  return o = new Zt(o, r), o._enter = s, o._exit = u, o;
}
function mw(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function xw() {
  return new Zt(this._exit || this._groups.map(Wf), this._parents);
}
function _w(e, t, n) {
  var r = this.enter(), i = this, a = this.exit();
  return typeof e == "function" ? (r = e(r), r && (r = r.selection())) : r = r.append(e + ""), t != null && (i = t(i), i && (i = i.selection())), n == null ? a.remove() : n(a), r && i ? r.merge(i).order() : i;
}
function ww(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, r = t._groups, i = n.length, a = r.length, o = Math.min(i, a), s = new Array(i), u = 0; u < o; ++u)
    for (var l = n[u], c = r[u], f = l.length, h = s[u] = new Array(f), d, p = 0; p < f; ++p)
      (d = l[p] || c[p]) && (h[p] = d);
  for (; u < i; ++u)
    s[u] = n[u];
  return new Zt(s, this._parents);
}
function yw() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var r = e[t], i = r.length - 1, a = r[i], o; --i >= 0; )
      (o = r[i]) && (a && o.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(o, a), a = o);
  return this;
}
function Ew(e) {
  e || (e = Tw);
  function t(f, h) {
    return f && h ? e(f.__data__, h.__data__) : !f - !h;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), a = 0; a < r; ++a) {
    for (var o = n[a], s = o.length, u = i[a] = new Array(s), l, c = 0; c < s; ++c)
      (l = o[c]) && (u[c] = l);
    u.sort(t);
  }
  return new Zt(i, this._parents).order();
}
function Tw(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Sw() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Aw() {
  return Array.from(this);
}
function Cw() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], i = 0, a = r.length; i < a; ++i) {
      var o = r[i];
      if (o)
        return o;
    }
  return null;
}
function Nw() {
  let e = 0;
  for (const t of this)
    ++e;
  return e;
}
function Fw() {
  return !this.node();
}
function kw(e) {
  for (var t = this._groups, n = 0, r = t.length; n < r; ++n)
    for (var i = t[n], a = 0, o = i.length, s; a < o; ++a)
      (s = i[a]) && e.call(s, s.__data__, a, i);
  return this;
}
function Iw(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Ow(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Dw(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function bw(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Mw(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function Rw(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function Pw(e, t) {
  var n = Po(e);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((t == null ? n.local ? Ow : Iw : typeof t == "function" ? n.local ? Rw : Mw : n.local ? bw : Dw)(n, t));
}
function Gf(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Lw(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Bw(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function $w(e, t, n) {
  return function() {
    var r = t.apply(this, arguments);
    r == null ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
  };
}
function Uw(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? Lw : typeof t == "function" ? $w : Bw)(e, t, n ?? "")) : ei(this.node(), e);
}
function ei(e, t) {
  return e.style.getPropertyValue(t) || Gf(e).getComputedStyle(e, null).getPropertyValue(t);
}
function zw(e) {
  return function() {
    delete this[e];
  };
}
function Hw(e, t) {
  return function() {
    this[e] = t;
  };
}
function Vw(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function Ww(e, t) {
  return arguments.length > 1 ? this.each((t == null ? zw : typeof t == "function" ? Vw : Hw)(e, t)) : this.node()[e];
}
function Xf(e) {
  return e.trim().split(/^|\s+/);
}
function wl(e) {
  return e.classList || new Yf(e);
}
function Yf(e) {
  this._node = e, this._names = Xf(e.getAttribute("class") || "");
}
Yf.prototype = {
  add: function(e) {
    var t = this._names.indexOf(e);
    t < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(e) {
    var t = this._names.indexOf(e);
    t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(e) {
    return this._names.indexOf(e) >= 0;
  }
};
function Kf(e, t) {
  for (var n = wl(e), r = -1, i = t.length; ++r < i; )
    n.add(t[r]);
}
function Zf(e, t) {
  for (var n = wl(e), r = -1, i = t.length; ++r < i; )
    n.remove(t[r]);
}
function Gw(e) {
  return function() {
    Kf(this, e);
  };
}
function Xw(e) {
  return function() {
    Zf(this, e);
  };
}
function Yw(e, t) {
  return function() {
    (t.apply(this, arguments) ? Kf : Zf)(this, e);
  };
}
function Kw(e, t) {
  var n = Xf(e + "");
  if (arguments.length < 2) {
    for (var r = wl(this.node()), i = -1, a = n.length; ++i < a; )
      if (!r.contains(n[i]))
        return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Yw : t ? Gw : Xw)(n, t));
}
function Zw() {
  this.textContent = "";
}
function qw(e) {
  return function() {
    this.textContent = e;
  };
}
function jw(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Jw(e) {
  return arguments.length ? this.each(e == null ? Zw : (typeof e == "function" ? jw : qw)(e)) : this.node().textContent;
}
function Qw() {
  this.innerHTML = "";
}
function ey(e) {
  return function() {
    this.innerHTML = e;
  };
}
function ty(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function ny(e) {
  return arguments.length ? this.each(e == null ? Qw : (typeof e == "function" ? ty : ey)(e)) : this.node().innerHTML;
}
function ry() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function iy() {
  return this.each(ry);
}
function ay() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function oy() {
  return this.each(ay);
}
function sy(e) {
  var t = typeof e == "function" ? e : Uf(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function ly() {
  return null;
}
function uy(e, t) {
  var n = typeof e == "function" ? e : Uf(e), r = t == null ? ly : typeof t == "function" ? t : _l(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function cy() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function fy() {
  return this.each(cy);
}
function hy() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function dy() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function vy(e) {
  return this.select(e ? dy : hy);
}
function py(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function gy(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function my(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", r = t.indexOf(".");
    return r >= 0 && (n = t.slice(r + 1), t = t.slice(0, r)), { type: t, name: n };
  });
}
function xy(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, r = -1, i = t.length, a; n < i; ++n)
        a = t[n], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++r] = a;
      ++r ? t.length = r : delete this.__on;
    }
  };
}
function _y(e, t, n) {
  return function() {
    var r = this.__on, i, a = gy(t);
    if (r) {
      for (var o = 0, s = r.length; o < s; ++o)
        if ((i = r[o]).type === e.type && i.name === e.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = a, i.options = n), i.value = t;
          return;
        }
    }
    this.addEventListener(e.type, a, n), i = { type: e.type, name: e.name, value: t, listener: a, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function wy(e, t, n) {
  var r = my(e + ""), i, a = r.length, o;
  if (arguments.length < 2) {
    var s = this.node().__on;
    if (s) {
      for (var u = 0, l = s.length, c; u < l; ++u)
        for (i = 0, c = s[u]; i < a; ++i)
          if ((o = r[i]).type === c.type && o.name === c.name)
            return c.value;
    }
    return;
  }
  for (s = t ? _y : xy, i = 0; i < a; ++i)
    this.each(s(r[i], t, n));
  return this;
}
function qf(e, t, n) {
  var r = Gf(e), i = r.CustomEvent;
  typeof i == "function" ? i = new i(t, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(t, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(t, !1, !1)), e.dispatchEvent(i);
}
function yy(e, t) {
  return function() {
    return qf(this, e, t);
  };
}
function Ey(e, t) {
  return function() {
    return qf(this, e, t.apply(this, arguments));
  };
}
function Ty(e, t) {
  return this.each((typeof t == "function" ? Ey : yy)(e, t));
}
function* Sy() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], i = 0, a = r.length, o; i < a; ++i)
      (o = r[i]) && (yield o);
}
var jf = [null];
function Zt(e, t) {
  this._groups = e, this._parents = t;
}
function oa() {
  return new Zt([[document.documentElement]], jf);
}
function Ay() {
  return this;
}
Zt.prototype = oa.prototype = {
  constructor: Zt,
  select: j2,
  selectAll: tw,
  selectChild: aw,
  selectChildren: uw,
  filter: cw,
  data: gw,
  enter: fw,
  exit: xw,
  join: _w,
  merge: ww,
  selection: Ay,
  order: yw,
  sort: Ew,
  call: Sw,
  nodes: Aw,
  node: Cw,
  size: Nw,
  empty: Fw,
  each: kw,
  attr: Pw,
  style: Uw,
  property: Ww,
  classed: Kw,
  text: Jw,
  html: ny,
  raise: iy,
  lower: oy,
  append: sy,
  insert: uy,
  remove: fy,
  clone: vy,
  datum: py,
  on: wy,
  dispatch: Ty,
  [Symbol.iterator]: Sy
};
function an(e) {
  return typeof e == "string" ? new Zt([[document.querySelector(e)]], [document.documentElement]) : new Zt([[e]], jf);
}
function Cy(e) {
  let t;
  for (; t = e.sourceEvent; )
    e = t;
  return e;
}
function xn(e, t) {
  if (e = Cy(e), t === void 0 && (t = e.currentTarget), t) {
    var n = t.ownerSVGElement || t;
    if (n.createSVGPoint) {
      var r = n.createSVGPoint();
      return r.x = e.clientX, r.y = e.clientY, r = r.matrixTransform(t.getScreenCTM().inverse()), [r.x, r.y];
    }
    if (t.getBoundingClientRect) {
      var i = t.getBoundingClientRect();
      return [e.clientX - i.left - t.clientLeft, e.clientY - i.top - t.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
const Ny = { passive: !1 }, Hi = { capture: !0, passive: !1 };
function ls(e) {
  e.stopImmediatePropagation();
}
function Zr(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Jf(e) {
  var t = e.document.documentElement, n = an(e).on("dragstart.drag", Zr, Hi);
  "onselectstart" in t ? n.on("selectstart.drag", Zr, Hi) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Qf(e, t) {
  var n = e.document.documentElement, r = an(e).on("dragstart.drag", null);
  t && (r.on("click.drag", Zr, Hi), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const ya = (e) => () => e;
function ks(e, {
  sourceEvent: t,
  subject: n,
  target: r,
  identifier: i,
  active: a,
  x: o,
  y: s,
  dx: u,
  dy: l,
  dispatch: c
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: i, enumerable: !0, configurable: !0 },
    active: { value: a, enumerable: !0, configurable: !0 },
    x: { value: o, enumerable: !0, configurable: !0 },
    y: { value: s, enumerable: !0, configurable: !0 },
    dx: { value: u, enumerable: !0, configurable: !0 },
    dy: { value: l, enumerable: !0, configurable: !0 },
    _: { value: c }
  });
}
ks.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function Fy(e) {
  return !e.ctrlKey && !e.button;
}
function ky() {
  return this.parentNode;
}
function Iy(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function Oy() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Dy() {
  var e = Fy, t = ky, n = Iy, r = Oy, i = {}, a = Ro("start", "drag", "end"), o = 0, s, u, l, c, f = 0;
  function h(T) {
    T.on("mousedown.drag", d).filter(r).on("touchstart.drag", g).on("touchmove.drag", x, Ny).on("touchend.drag touchcancel.drag", y).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function d(T, Y) {
    if (!(c || !e.call(this, T, Y))) {
      var Q = m(this, t.call(this, T, Y), T, Y, "mouse");
      Q && (an(T.view).on("mousemove.drag", p, Hi).on("mouseup.drag", v, Hi), Jf(T.view), ls(T), l = !1, s = T.clientX, u = T.clientY, Q("start", T));
    }
  }
  function p(T) {
    if (Zr(T), !l) {
      var Y = T.clientX - s, Q = T.clientY - u;
      l = Y * Y + Q * Q > f;
    }
    i.mouse("drag", T);
  }
  function v(T) {
    an(T.view).on("mousemove.drag mouseup.drag", null), Qf(T.view, l), Zr(T), i.mouse("end", T);
  }
  function g(T, Y) {
    if (e.call(this, T, Y)) {
      var Q = T.changedTouches, R = t.call(this, T, Y), V = Q.length, P, H;
      for (P = 0; P < V; ++P)
        (H = m(this, R, T, Y, Q[P].identifier, Q[P])) && (ls(T), H("start", T, Q[P]));
    }
  }
  function x(T) {
    var Y = T.changedTouches, Q = Y.length, R, V;
    for (R = 0; R < Q; ++R)
      (V = i[Y[R].identifier]) && (Zr(T), V("drag", T, Y[R]));
  }
  function y(T) {
    var Y = T.changedTouches, Q = Y.length, R, V;
    for (c && clearTimeout(c), c = setTimeout(function() {
      c = null;
    }, 500), R = 0; R < Q; ++R)
      (V = i[Y[R].identifier]) && (ls(T), V("end", T, Y[R]));
  }
  function m(T, Y, Q, R, V, P) {
    var H = a.copy(), G = xn(P || Q, Y), C, se, w;
    if ((w = n.call(T, new ks("beforestart", {
      sourceEvent: Q,
      target: h,
      identifier: V,
      active: o,
      x: G[0],
      y: G[1],
      dx: 0,
      dy: 0,
      dispatch: H
    }), R)) != null)
      return C = w.x - G[0] || 0, se = w.y - G[1] || 0, function U(I, j, K) {
        var ee = G, J;
        switch (I) {
          case "start":
            i[V] = U, J = o++;
            break;
          case "end":
            delete i[V], --o;
          case "drag":
            G = xn(K || j, Y), J = o;
            break;
        }
        H.call(
          I,
          T,
          new ks(I, {
            sourceEvent: j,
            subject: w,
            target: h,
            identifier: V,
            active: J,
            x: G[0] + C,
            y: G[1] + se,
            dx: G[0] - ee[0],
            dy: G[1] - ee[1],
            dispatch: H
          }),
          R
        );
      };
  }
  return h.filter = function(T) {
    return arguments.length ? (e = typeof T == "function" ? T : ya(!!T), h) : e;
  }, h.container = function(T) {
    return arguments.length ? (t = typeof T == "function" ? T : ya(T), h) : t;
  }, h.subject = function(T) {
    return arguments.length ? (n = typeof T == "function" ? T : ya(T), h) : n;
  }, h.touchable = function(T) {
    return arguments.length ? (r = typeof T == "function" ? T : ya(!!T), h) : r;
  }, h.on = function() {
    var T = a.on.apply(a, arguments);
    return T === a ? h : T;
  }, h.clickDistance = function(T) {
    return arguments.length ? (f = (T = +T) * T, h) : Math.sqrt(f);
  }, h;
}
function yl(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function eh(e, t) {
  var n = Object.create(e.prototype);
  for (var r in t)
    n[r] = t[r];
  return n;
}
function sa() {
}
var Vi = 0.7, uo = 1 / Vi, qr = "\\s*([+-]?\\d+)\\s*", Wi = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", En = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", by = /^#([0-9a-f]{3,8})$/, My = new RegExp(`^rgb\\(${qr},${qr},${qr}\\)$`), Ry = new RegExp(`^rgb\\(${En},${En},${En}\\)$`), Py = new RegExp(`^rgba\\(${qr},${qr},${qr},${Wi}\\)$`), Ly = new RegExp(`^rgba\\(${En},${En},${En},${Wi}\\)$`), By = new RegExp(`^hsl\\(${Wi},${En},${En}\\)$`), $y = new RegExp(`^hsla\\(${Wi},${En},${En},${Wi}\\)$`), Ku = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
yl(sa, Sr, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Zu,
  // Deprecated! Use color.formatHex.
  formatHex: Zu,
  formatHex8: Uy,
  formatHsl: zy,
  formatRgb: qu,
  toString: qu
});
function Zu() {
  return this.rgb().formatHex();
}
function Uy() {
  return this.rgb().formatHex8();
}
function zy() {
  return th(this).formatHsl();
}
function qu() {
  return this.rgb().formatRgb();
}
function Sr(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = by.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? ju(t) : n === 3 ? new Lt(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Ea(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Ea(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = My.exec(e)) ? new Lt(t[1], t[2], t[3], 1) : (t = Ry.exec(e)) ? new Lt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Py.exec(e)) ? Ea(t[1], t[2], t[3], t[4]) : (t = Ly.exec(e)) ? Ea(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = By.exec(e)) ? e0(t[1], t[2] / 100, t[3] / 100, 1) : (t = $y.exec(e)) ? e0(t[1], t[2] / 100, t[3] / 100, t[4]) : Ku.hasOwnProperty(e) ? ju(Ku[e]) : e === "transparent" ? new Lt(NaN, NaN, NaN, 0) : null;
}
function ju(e) {
  return new Lt(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Ea(e, t, n, r) {
  return r <= 0 && (e = t = n = NaN), new Lt(e, t, n, r);
}
function Hy(e) {
  return e instanceof sa || (e = Sr(e)), e ? (e = e.rgb(), new Lt(e.r, e.g, e.b, e.opacity)) : new Lt();
}
function Is(e, t, n, r) {
  return arguments.length === 1 ? Hy(e) : new Lt(e, t, n, r ?? 1);
}
function Lt(e, t, n, r) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
yl(Lt, Is, eh(sa, {
  brighter(e) {
    return e = e == null ? uo : Math.pow(uo, e), new Lt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Vi : Math.pow(Vi, e), new Lt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Lt(mr(this.r), mr(this.g), mr(this.b), co(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Ju,
  // Deprecated! Use color.formatHex.
  formatHex: Ju,
  formatHex8: Vy,
  formatRgb: Qu,
  toString: Qu
}));
function Ju() {
  return `#${vr(this.r)}${vr(this.g)}${vr(this.b)}`;
}
function Vy() {
  return `#${vr(this.r)}${vr(this.g)}${vr(this.b)}${vr((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Qu() {
  const e = co(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${mr(this.r)}, ${mr(this.g)}, ${mr(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function co(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function mr(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function vr(e) {
  return e = mr(e), (e < 16 ? "0" : "") + e.toString(16);
}
function e0(e, t, n, r) {
  return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new on(e, t, n, r);
}
function th(e) {
  if (e instanceof on)
    return new on(e.h, e.s, e.l, e.opacity);
  if (e instanceof sa || (e = Sr(e)), !e)
    return new on();
  if (e instanceof on)
    return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), a = Math.max(t, n, r), o = NaN, s = a - i, u = (a + i) / 2;
  return s ? (t === a ? o = (n - r) / s + (n < r) * 6 : n === a ? o = (r - t) / s + 2 : o = (t - n) / s + 4, s /= u < 0.5 ? a + i : 2 - a - i, o *= 60) : s = u > 0 && u < 1 ? 0 : o, new on(o, s, u, e.opacity);
}
function Wy(e, t, n, r) {
  return arguments.length === 1 ? th(e) : new on(e, t, n, r ?? 1);
}
function on(e, t, n, r) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
yl(on, Wy, eh(sa, {
  brighter(e) {
    return e = e == null ? uo : Math.pow(uo, e), new on(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Vi : Math.pow(Vi, e), new on(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * t, i = 2 * n - r;
    return new Lt(
      us(e >= 240 ? e - 240 : e + 120, i, r),
      us(e, i, r),
      us(e < 120 ? e + 240 : e - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new on(t0(this.h), Ta(this.s), Ta(this.l), co(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = co(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${t0(this.h)}, ${Ta(this.s) * 100}%, ${Ta(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function t0(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Ta(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function us(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const El = (e) => () => e;
function Gy(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function Xy(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(r) {
    return Math.pow(e + r * t, n);
  };
}
function Yy(e) {
  return (e = +e) == 1 ? nh : function(t, n) {
    return n - t ? Xy(t, n, e) : El(isNaN(t) ? n : t);
  };
}
function nh(e, t) {
  var n = t - e;
  return n ? Gy(e, n) : El(isNaN(e) ? t : e);
}
const fo = function e(t) {
  var n = Yy(t);
  function r(i, a) {
    var o = n((i = Is(i)).r, (a = Is(a)).r), s = n(i.g, a.g), u = n(i.b, a.b), l = nh(i.opacity, a.opacity);
    return function(c) {
      return i.r = o(c), i.g = s(c), i.b = u(c), i.opacity = l(c), i + "";
    };
  }
  return r.gamma = e, r;
}(1);
function Ky(e, t) {
  t || (t = []);
  var n = e ? Math.min(t.length, e.length) : 0, r = t.slice(), i;
  return function(a) {
    for (i = 0; i < n; ++i)
      r[i] = e[i] * (1 - a) + t[i] * a;
    return r;
  };
}
function Zy(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function qy(e, t) {
  var n = t ? t.length : 0, r = e ? Math.min(n, e.length) : 0, i = new Array(r), a = new Array(n), o;
  for (o = 0; o < r; ++o)
    i[o] = Oi(e[o], t[o]);
  for (; o < n; ++o)
    a[o] = t[o];
  return function(s) {
    for (o = 0; o < r; ++o)
      a[o] = i[o](s);
    return a;
  };
}
function jy(e, t) {
  var n = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(r) {
    return n.setTime(e * (1 - r) + t * r), n;
  };
}
function _n(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
function Jy(e, t) {
  var n = {}, r = {}, i;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (i in t)
    i in e ? n[i] = Oi(e[i], t[i]) : r[i] = t[i];
  return function(a) {
    for (i in n)
      r[i] = n[i](a);
    return r;
  };
}
var Os = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, cs = new RegExp(Os.source, "g");
function Qy(e) {
  return function() {
    return e;
  };
}
function eE(e) {
  return function(t) {
    return e(t) + "";
  };
}
function rh(e, t) {
  var n = Os.lastIndex = cs.lastIndex = 0, r, i, a, o = -1, s = [], u = [];
  for (e = e + "", t = t + ""; (r = Os.exec(e)) && (i = cs.exec(t)); )
    (a = i.index) > n && (a = t.slice(n, a), s[o] ? s[o] += a : s[++o] = a), (r = r[0]) === (i = i[0]) ? s[o] ? s[o] += i : s[++o] = i : (s[++o] = null, u.push({ i: o, x: _n(r, i) })), n = cs.lastIndex;
  return n < t.length && (a = t.slice(n), s[o] ? s[o] += a : s[++o] = a), s.length < 2 ? u[0] ? eE(u[0].x) : Qy(t) : (t = u.length, function(l) {
    for (var c = 0, f; c < t; ++c)
      s[(f = u[c]).i] = f.x(l);
    return s.join("");
  });
}
function Oi(e, t) {
  var n = typeof t, r;
  return t == null || n === "boolean" ? El(t) : (n === "number" ? _n : n === "string" ? (r = Sr(t)) ? (t = r, fo) : rh : t instanceof Sr ? fo : t instanceof Date ? jy : Zy(t) ? Ky : Array.isArray(t) ? qy : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? Jy : _n)(e, t);
}
var n0 = 180 / Math.PI, Ds = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ih(e, t, n, r, i, a) {
  var o, s, u;
  return (o = Math.sqrt(e * e + t * t)) && (e /= o, t /= o), (u = e * n + t * r) && (n -= e * u, r -= t * u), (s = Math.sqrt(n * n + r * r)) && (n /= s, r /= s, u /= s), e * r < t * n && (e = -e, t = -t, u = -u, o = -o), {
    translateX: i,
    translateY: a,
    rotate: Math.atan2(t, e) * n0,
    skewX: Math.atan(u) * n0,
    scaleX: o,
    scaleY: s
  };
}
var Sa;
function tE(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Ds : ih(t.a, t.b, t.c, t.d, t.e, t.f);
}
function nE(e) {
  return e == null || (Sa || (Sa = document.createElementNS("http://www.w3.org/2000/svg", "g")), Sa.setAttribute("transform", e), !(e = Sa.transform.baseVal.consolidate())) ? Ds : (e = e.matrix, ih(e.a, e.b, e.c, e.d, e.e, e.f));
}
function ah(e, t, n, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function a(l, c, f, h, d, p) {
    if (l !== f || c !== h) {
      var v = d.push("translate(", null, t, null, n);
      p.push({ i: v - 4, x: _n(l, f) }, { i: v - 2, x: _n(c, h) });
    } else (f || h) && d.push("translate(" + f + t + h + n);
  }
  function o(l, c, f, h) {
    l !== c ? (l - c > 180 ? c += 360 : c - l > 180 && (l += 360), h.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: _n(l, c) })) : c && f.push(i(f) + "rotate(" + c + r);
  }
  function s(l, c, f, h) {
    l !== c ? h.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: _n(l, c) }) : c && f.push(i(f) + "skewX(" + c + r);
  }
  function u(l, c, f, h, d, p) {
    if (l !== f || c !== h) {
      var v = d.push(i(d) + "scale(", null, ",", null, ")");
      p.push({ i: v - 4, x: _n(l, f) }, { i: v - 2, x: _n(c, h) });
    } else (f !== 1 || h !== 1) && d.push(i(d) + "scale(" + f + "," + h + ")");
  }
  return function(l, c) {
    var f = [], h = [];
    return l = e(l), c = e(c), a(l.translateX, l.translateY, c.translateX, c.translateY, f, h), o(l.rotate, c.rotate, f, h), s(l.skewX, c.skewX, f, h), u(l.scaleX, l.scaleY, c.scaleX, c.scaleY, f, h), l = c = null, function(d) {
      for (var p = -1, v = h.length, g; ++p < v; )
        f[(g = h[p]).i] = g.x(d);
      return f.join("");
    };
  };
}
var rE = ah(tE, "px, ", "px)", "deg)"), iE = ah(nE, ", ", ")", ")"), aE = 1e-12;
function r0(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function oE(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function sE(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Ba = function e(t, n, r) {
  function i(a, o) {
    var s = a[0], u = a[1], l = a[2], c = o[0], f = o[1], h = o[2], d = c - s, p = f - u, v = d * d + p * p, g, x;
    if (v < aE)
      x = Math.log(h / l) / t, g = function(R) {
        return [
          s + R * d,
          u + R * p,
          l * Math.exp(t * R * x)
        ];
      };
    else {
      var y = Math.sqrt(v), m = (h * h - l * l + r * v) / (2 * l * n * y), T = (h * h - l * l - r * v) / (2 * h * n * y), Y = Math.log(Math.sqrt(m * m + 1) - m), Q = Math.log(Math.sqrt(T * T + 1) - T);
      x = (Q - Y) / t, g = function(R) {
        var V = R * x, P = r0(Y), H = l / (n * y) * (P * sE(t * V + Y) - oE(Y));
        return [
          s + H * d,
          u + H * p,
          l * P / r0(t * V + Y)
        ];
      };
    }
    return g.duration = x * 1e3 * t / Math.SQRT2, g;
  }
  return i.rho = function(a) {
    var o = Math.max(1e-3, +a), s = o * o, u = s * s;
    return e(o, s, u);
  }, i;
}(Math.SQRT2, 2, 4);
var ti = 0, wi = 0, pi = 0, oh = 1e3, ho, yi, vo = 0, Ar = 0, Lo = 0, Gi = typeof performance == "object" && performance.now ? performance : Date, sh = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Tl() {
  return Ar || (sh(lE), Ar = Gi.now() + Lo);
}
function lE() {
  Ar = 0;
}
function po() {
  this._call = this._time = this._next = null;
}
po.prototype = lh.prototype = {
  constructor: po,
  restart: function(e, t, n) {
    if (typeof e != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? Tl() : +n) + (t == null ? 0 : +t), !this._next && yi !== this && (yi ? yi._next = this : ho = this, yi = this), this._call = e, this._time = n, bs();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, bs());
  }
};
function lh(e, t, n) {
  var r = new po();
  return r.restart(e, t, n), r;
}
function uE() {
  Tl(), ++ti;
  for (var e = ho, t; e; )
    (t = Ar - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --ti;
}
function i0() {
  Ar = (vo = Gi.now()) + Lo, ti = wi = 0;
  try {
    uE();
  } finally {
    ti = 0, fE(), Ar = 0;
  }
}
function cE() {
  var e = Gi.now(), t = e - vo;
  t > oh && (Lo -= t, vo = e);
}
function fE() {
  for (var e, t = ho, n, r = 1 / 0; t; )
    t._call ? (r > t._time && (r = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : ho = n);
  yi = e, bs(r);
}
function bs(e) {
  if (!ti) {
    wi && (wi = clearTimeout(wi));
    var t = e - Ar;
    t > 24 ? (e < 1 / 0 && (wi = setTimeout(i0, e - Gi.now() - Lo)), pi && (pi = clearInterval(pi))) : (pi || (vo = Gi.now(), pi = setInterval(cE, oh)), ti = 1, sh(i0));
  }
}
function a0(e, t, n) {
  var r = new po();
  return t = t == null ? 0 : +t, r.restart((i) => {
    r.stop(), e(i + t);
  }, t, n), r;
}
var hE = Ro("start", "end", "cancel", "interrupt"), dE = [], uh = 0, o0 = 1, Ms = 2, $a = 3, s0 = 4, Rs = 5, Ua = 6;
function Bo(e, t, n, r, i, a) {
  var o = e.__transition;
  if (!o)
    e.__transition = {};
  else if (n in o)
    return;
  vE(e, n, {
    name: t,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: hE,
    tween: dE,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: uh
  });
}
function Sl(e, t) {
  var n = cn(e, t);
  if (n.state > uh)
    throw new Error("too late; already scheduled");
  return n;
}
function Cn(e, t) {
  var n = cn(e, t);
  if (n.state > $a)
    throw new Error("too late; already running");
  return n;
}
function cn(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t]))
    throw new Error("transition not found");
  return n;
}
function vE(e, t, n) {
  var r = e.__transition, i;
  r[t] = n, n.timer = lh(a, 0, n.time);
  function a(l) {
    n.state = o0, n.timer.restart(o, n.delay, n.time), n.delay <= l && o(l - n.delay);
  }
  function o(l) {
    var c, f, h, d;
    if (n.state !== o0)
      return u();
    for (c in r)
      if (d = r[c], d.name === n.name) {
        if (d.state === $a)
          return a0(o);
        d.state === s0 ? (d.state = Ua, d.timer.stop(), d.on.call("interrupt", e, e.__data__, d.index, d.group), delete r[c]) : +c < t && (d.state = Ua, d.timer.stop(), d.on.call("cancel", e, e.__data__, d.index, d.group), delete r[c]);
      }
    if (a0(function() {
      n.state === $a && (n.state = s0, n.timer.restart(s, n.delay, n.time), s(l));
    }), n.state = Ms, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Ms) {
      for (n.state = $a, i = new Array(h = n.tween.length), c = 0, f = -1; c < h; ++c)
        (d = n.tween[c].value.call(e, e.__data__, n.index, n.group)) && (i[++f] = d);
      i.length = f + 1;
    }
  }
  function s(l) {
    for (var c = l < n.duration ? n.ease.call(null, l / n.duration) : (n.timer.restart(u), n.state = Rs, 1), f = -1, h = i.length; ++f < h; )
      i[f].call(e, c);
    n.state === Rs && (n.on.call("end", e, e.__data__, n.index, n.group), u());
  }
  function u() {
    n.state = Ua, n.timer.stop(), delete r[t];
    for (var l in r)
      return;
    delete e.__transition;
  }
}
function za(e, t) {
  var n = e.__transition, r, i, a = !0, o;
  if (n) {
    t = t == null ? null : t + "";
    for (o in n) {
      if ((r = n[o]).name !== t) {
        a = !1;
        continue;
      }
      i = r.state > Ms && r.state < Rs, r.state = Ua, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", e, e.__data__, r.index, r.group), delete n[o];
    }
    a && delete e.__transition;
  }
}
function pE(e) {
  return this.each(function() {
    za(this, e);
  });
}
function gE(e, t) {
  var n, r;
  return function() {
    var i = Cn(this, e), a = i.tween;
    if (a !== n) {
      r = n = a;
      for (var o = 0, s = r.length; o < s; ++o)
        if (r[o].name === t) {
          r = r.slice(), r.splice(o, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function mE(e, t, n) {
  var r, i;
  if (typeof n != "function")
    throw new Error();
  return function() {
    var a = Cn(this, e), o = a.tween;
    if (o !== r) {
      i = (r = o).slice();
      for (var s = { name: t, value: n }, u = 0, l = i.length; u < l; ++u)
        if (i[u].name === t) {
          i[u] = s;
          break;
        }
      u === l && i.push(s);
    }
    a.tween = i;
  };
}
function xE(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var r = cn(this.node(), n).tween, i = 0, a = r.length, o; i < a; ++i)
      if ((o = r[i]).name === e)
        return o.value;
    return null;
  }
  return this.each((t == null ? gE : mE)(n, e, t));
}
function Al(e, t, n) {
  var r = e._id;
  return e.each(function() {
    var i = Cn(this, r);
    (i.value || (i.value = {}))[t] = n.apply(this, arguments);
  }), function(i) {
    return cn(i, r).value[t];
  };
}
function ch(e, t) {
  var n;
  return (typeof t == "number" ? _n : t instanceof Sr ? fo : (n = Sr(t)) ? (t = n, fo) : rh)(e, t);
}
function _E(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function wE(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function yE(e, t, n) {
  var r, i = n + "", a;
  return function() {
    var o = this.getAttribute(e);
    return o === i ? null : o === r ? a : a = t(r = o, n);
  };
}
function EE(e, t, n) {
  var r, i = n + "", a;
  return function() {
    var o = this.getAttributeNS(e.space, e.local);
    return o === i ? null : o === r ? a : a = t(r = o, n);
  };
}
function TE(e, t, n) {
  var r, i, a;
  return function() {
    var o, s = n(this), u;
    return s == null ? void this.removeAttribute(e) : (o = this.getAttribute(e), u = s + "", o === u ? null : o === r && u === i ? a : (i = u, a = t(r = o, s)));
  };
}
function SE(e, t, n) {
  var r, i, a;
  return function() {
    var o, s = n(this), u;
    return s == null ? void this.removeAttributeNS(e.space, e.local) : (o = this.getAttributeNS(e.space, e.local), u = s + "", o === u ? null : o === r && u === i ? a : (i = u, a = t(r = o, s)));
  };
}
function AE(e, t) {
  var n = Po(e), r = n === "transform" ? iE : ch;
  return this.attrTween(e, typeof t == "function" ? (n.local ? SE : TE)(n, r, Al(this, "attr." + e, t)) : t == null ? (n.local ? wE : _E)(n) : (n.local ? EE : yE)(n, r, t));
}
function CE(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function NE(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function FE(e, t) {
  var n, r;
  function i() {
    var a = t.apply(this, arguments);
    return a !== r && (n = (r = a) && NE(e, a)), n;
  }
  return i._value = t, i;
}
function kE(e, t) {
  var n, r;
  function i() {
    var a = t.apply(this, arguments);
    return a !== r && (n = (r = a) && CE(e, a)), n;
  }
  return i._value = t, i;
}
function IE(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (t == null)
    return this.tween(n, null);
  if (typeof t != "function")
    throw new Error();
  var r = Po(e);
  return this.tween(n, (r.local ? FE : kE)(r, t));
}
function OE(e, t) {
  return function() {
    Sl(this, e).delay = +t.apply(this, arguments);
  };
}
function DE(e, t) {
  return t = +t, function() {
    Sl(this, e).delay = t;
  };
}
function bE(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? OE : DE)(t, e)) : cn(this.node(), t).delay;
}
function ME(e, t) {
  return function() {
    Cn(this, e).duration = +t.apply(this, arguments);
  };
}
function RE(e, t) {
  return t = +t, function() {
    Cn(this, e).duration = t;
  };
}
function PE(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? ME : RE)(t, e)) : cn(this.node(), t).duration;
}
function LE(e, t) {
  if (typeof t != "function")
    throw new Error();
  return function() {
    Cn(this, e).ease = t;
  };
}
function BE(e) {
  var t = this._id;
  return arguments.length ? this.each(LE(t, e)) : cn(this.node(), t).ease;
}
function $E(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    Cn(this, e).ease = n;
  };
}
function UE(e) {
  if (typeof e != "function")
    throw new Error();
  return this.each($E(this._id, e));
}
function zE(e) {
  typeof e != "function" && (e = Hf(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = t[i], o = a.length, s = r[i] = [], u, l = 0; l < o; ++l)
      (u = a[l]) && e.call(u, u.__data__, l, a) && s.push(u);
  return new Hn(r, this._parents, this._name, this._id);
}
function HE(e) {
  if (e._id !== this._id)
    throw new Error();
  for (var t = this._groups, n = e._groups, r = t.length, i = n.length, a = Math.min(r, i), o = new Array(r), s = 0; s < a; ++s)
    for (var u = t[s], l = n[s], c = u.length, f = o[s] = new Array(c), h, d = 0; d < c; ++d)
      (h = u[d] || l[d]) && (f[d] = h);
  for (; s < r; ++s)
    o[s] = t[s];
  return new Hn(o, this._parents, this._name, this._id);
}
function VE(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function WE(e, t, n) {
  var r, i, a = VE(t) ? Sl : Cn;
  return function() {
    var o = a(this, e), s = o.on;
    s !== r && (i = (r = s).copy()).on(t, n), o.on = i;
  };
}
function GE(e, t) {
  var n = this._id;
  return arguments.length < 2 ? cn(this.node(), n).on.on(e) : this.each(WE(n, e, t));
}
function XE(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition)
      if (+n !== e)
        return;
    t && t.removeChild(this);
  };
}
function YE() {
  return this.on("end.remove", XE(this._id));
}
function KE(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = _l(e));
  for (var r = this._groups, i = r.length, a = new Array(i), o = 0; o < i; ++o)
    for (var s = r[o], u = s.length, l = a[o] = new Array(u), c, f, h = 0; h < u; ++h)
      (c = s[h]) && (f = e.call(c, c.__data__, h, s)) && ("__data__" in c && (f.__data__ = c.__data__), l[h] = f, Bo(l[h], t, n, h, l, cn(c, n)));
  return new Hn(a, this._parents, t, n);
}
function ZE(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = zf(e));
  for (var r = this._groups, i = r.length, a = [], o = [], s = 0; s < i; ++s)
    for (var u = r[s], l = u.length, c, f = 0; f < l; ++f)
      if (c = u[f]) {
        for (var h = e.call(c, c.__data__, f, u), d, p = cn(c, n), v = 0, g = h.length; v < g; ++v)
          (d = h[v]) && Bo(d, t, n, v, h, p);
        a.push(h), o.push(c);
      }
  return new Hn(a, o, t, n);
}
var qE = oa.prototype.constructor;
function jE() {
  return new qE(this._groups, this._parents);
}
function JE(e, t) {
  var n, r, i;
  return function() {
    var a = ei(this, e), o = (this.style.removeProperty(e), ei(this, e));
    return a === o ? null : a === n && o === r ? i : i = t(n = a, r = o);
  };
}
function fh(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function QE(e, t, n) {
  var r, i = n + "", a;
  return function() {
    var o = ei(this, e);
    return o === i ? null : o === r ? a : a = t(r = o, n);
  };
}
function eT(e, t, n) {
  var r, i, a;
  return function() {
    var o = ei(this, e), s = n(this), u = s + "";
    return s == null && (u = s = (this.style.removeProperty(e), ei(this, e))), o === u ? null : o === r && u === i ? a : (i = u, a = t(r = o, s));
  };
}
function tT(e, t) {
  var n, r, i, a = "style." + t, o = "end." + a, s;
  return function() {
    var u = Cn(this, e), l = u.on, c = u.value[a] == null ? s || (s = fh(t)) : void 0;
    (l !== n || i !== c) && (r = (n = l).copy()).on(o, i = c), u.on = r;
  };
}
function nT(e, t, n) {
  var r = (e += "") == "transform" ? rE : ch;
  return t == null ? this.styleTween(e, JE(e, r)).on("end.style." + e, fh(e)) : typeof t == "function" ? this.styleTween(e, eT(e, r, Al(this, "style." + e, t))).each(tT(this._id, e)) : this.styleTween(e, QE(e, r, t), n).on("end.style." + e, null);
}
function rT(e, t, n) {
  return function(r) {
    this.style.setProperty(e, t.call(this, r), n);
  };
}
function iT(e, t, n) {
  var r, i;
  function a() {
    var o = t.apply(this, arguments);
    return o !== i && (r = (i = o) && rT(e, o, n)), r;
  }
  return a._value = t, a;
}
function aT(e, t, n) {
  var r = "style." + (e += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (t == null)
    return this.tween(r, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(r, iT(e, t, n ?? ""));
}
function oT(e) {
  return function() {
    this.textContent = e;
  };
}
function sT(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function lT(e) {
  return this.tween("text", typeof e == "function" ? sT(Al(this, "text", e)) : oT(e == null ? "" : e + ""));
}
function uT(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function cT(e) {
  var t, n;
  function r() {
    var i = e.apply(this, arguments);
    return i !== n && (t = (n = i) && uT(i)), t;
  }
  return r._value = e, r;
}
function fT(e) {
  var t = "text";
  if (arguments.length < 1)
    return (t = this.tween(t)) && t._value;
  if (e == null)
    return this.tween(t, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(t, cT(e));
}
function hT() {
  for (var e = this._name, t = this._id, n = hh(), r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var o = r[a], s = o.length, u, l = 0; l < s; ++l)
      if (u = o[l]) {
        var c = cn(u, t);
        Bo(u, e, n, l, o, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new Hn(r, this._parents, e, n);
}
function dT() {
  var e, t, n = this, r = n._id, i = n.size();
  return new Promise(function(a, o) {
    var s = { value: o }, u = { value: function() {
      --i === 0 && a();
    } };
    n.each(function() {
      var l = Cn(this, r), c = l.on;
      c !== e && (t = (e = c).copy(), t._.cancel.push(s), t._.interrupt.push(s), t._.end.push(u)), l.on = t;
    }), i === 0 && a();
  });
}
var vT = 0;
function Hn(e, t, n, r) {
  this._groups = e, this._parents = t, this._name = n, this._id = r;
}
function hh() {
  return ++vT;
}
var In = oa.prototype;
Hn.prototype = {
  constructor: Hn,
  select: KE,
  selectAll: ZE,
  selectChild: In.selectChild,
  selectChildren: In.selectChildren,
  filter: zE,
  merge: HE,
  selection: jE,
  transition: hT,
  call: In.call,
  nodes: In.nodes,
  node: In.node,
  size: In.size,
  empty: In.empty,
  each: In.each,
  on: GE,
  attr: AE,
  attrTween: IE,
  style: nT,
  styleTween: aT,
  text: lT,
  textTween: fT,
  remove: YE,
  tween: xE,
  delay: bE,
  duration: PE,
  ease: BE,
  easeVarying: UE,
  end: dT,
  [Symbol.iterator]: In[Symbol.iterator]
};
function pT(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var gT = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: pT
};
function mT(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function xT(e) {
  var t, n;
  e instanceof Hn ? (t = e._id, e = e._name) : (t = hh(), (n = gT).time = Tl(), e = e == null ? null : e + "");
  for (var r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var o = r[a], s = o.length, u, l = 0; l < s; ++l)
      (u = o[l]) && Bo(u, e, t, l, o, n || mT(u, t));
  return new Hn(r, this._parents, e, t);
}
oa.prototype.interrupt = pE;
oa.prototype.transition = xT;
const Aa = (e) => () => e;
function _T(e, {
  sourceEvent: t,
  target: n,
  transform: r,
  dispatch: i
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: r, enumerable: !0, configurable: !0 },
    _: { value: i }
  });
}
function bn(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
bn.prototype = {
  constructor: bn,
  scale: function(e) {
    return e === 1 ? this : new bn(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new bn(this.k, this.x + this.k * e, this.y + this.k * t);
  },
  apply: function(e) {
    return [e[0] * this.k + this.x, e[1] * this.k + this.y];
  },
  applyX: function(e) {
    return e * this.k + this.x;
  },
  applyY: function(e) {
    return e * this.k + this.y;
  },
  invert: function(e) {
    return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
  },
  invertX: function(e) {
    return (e - this.x) / this.k;
  },
  invertY: function(e) {
    return (e - this.y) / this.k;
  },
  rescaleX: function(e) {
    return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
  },
  rescaleY: function(e) {
    return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var ni = new bn(1, 0, 0);
bn.prototype;
function fs(e) {
  e.stopImmediatePropagation();
}
function gi(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function wT(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function yT() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function l0() {
  return this.__zoom || ni;
}
function ET(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function TT() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ST(e, t, n) {
  var r = e.invertX(t[0][0]) - n[0][0], i = e.invertX(t[1][0]) - n[1][0], a = e.invertY(t[0][1]) - n[0][1], o = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    o > a ? (a + o) / 2 : Math.min(0, a) || Math.max(0, o)
  );
}
function AT() {
  var e = wT, t = yT, n = ST, r = ET, i = TT, a = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], s = 250, u = Ba, l = Ro("start", "zoom", "end"), c, f, h, d = 500, p = 150, v = 0, g = 10;
  function x(w) {
    w.property("__zoom", l0).on("wheel.zoom", V, { passive: !1 }).on("mousedown.zoom", P).on("dblclick.zoom", H).filter(i).on("touchstart.zoom", G).on("touchmove.zoom", C).on("touchend.zoom touchcancel.zoom", se).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  x.transform = function(w, U, I, j) {
    var K = w.selection ? w.selection() : w;
    K.property("__zoom", l0), w !== K ? Y(w, U, I, j) : K.interrupt().each(function() {
      Q(this, arguments).event(j).start().zoom(null, typeof U == "function" ? U.apply(this, arguments) : U).end();
    });
  }, x.scaleBy = function(w, U, I, j) {
    x.scaleTo(w, function() {
      var K = this.__zoom.k, ee = typeof U == "function" ? U.apply(this, arguments) : U;
      return K * ee;
    }, I, j);
  }, x.scaleTo = function(w, U, I, j) {
    x.transform(w, function() {
      var K = t.apply(this, arguments), ee = this.__zoom, J = I == null ? T(K) : typeof I == "function" ? I.apply(this, arguments) : I, de = ee.invert(J), A = typeof U == "function" ? U.apply(this, arguments) : U;
      return n(m(y(ee, A), J, de), K, o);
    }, I, j);
  }, x.translateBy = function(w, U, I, j) {
    x.transform(w, function() {
      return n(this.__zoom.translate(
        typeof U == "function" ? U.apply(this, arguments) : U,
        typeof I == "function" ? I.apply(this, arguments) : I
      ), t.apply(this, arguments), o);
    }, null, j);
  }, x.translateTo = function(w, U, I, j, K) {
    x.transform(w, function() {
      var ee = t.apply(this, arguments), J = this.__zoom, de = j == null ? T(ee) : typeof j == "function" ? j.apply(this, arguments) : j;
      return n(ni.translate(de[0], de[1]).scale(J.k).translate(
        typeof U == "function" ? -U.apply(this, arguments) : -U,
        typeof I == "function" ? -I.apply(this, arguments) : -I
      ), ee, o);
    }, j, K);
  };
  function y(w, U) {
    return U = Math.max(a[0], Math.min(a[1], U)), U === w.k ? w : new bn(U, w.x, w.y);
  }
  function m(w, U, I) {
    var j = U[0] - I[0] * w.k, K = U[1] - I[1] * w.k;
    return j === w.x && K === w.y ? w : new bn(w.k, j, K);
  }
  function T(w) {
    return [(+w[0][0] + +w[1][0]) / 2, (+w[0][1] + +w[1][1]) / 2];
  }
  function Y(w, U, I, j) {
    w.on("start.zoom", function() {
      Q(this, arguments).event(j).start();
    }).on("interrupt.zoom end.zoom", function() {
      Q(this, arguments).event(j).end();
    }).tween("zoom", function() {
      var K = this, ee = arguments, J = Q(K, ee).event(j), de = t.apply(K, ee), A = I == null ? T(de) : typeof I == "function" ? I.apply(K, ee) : I, z = Math.max(de[1][0] - de[0][0], de[1][1] - de[0][1]), L = K.__zoom, O = typeof U == "function" ? U.apply(K, ee) : U, X = u(L.invert(A).concat(z / L.k), O.invert(A).concat(z / O.k));
      return function(le) {
        if (le === 1)
          le = O;
        else {
          var pe = X(le), me = z / pe[2];
          le = new bn(me, A[0] - pe[0] * me, A[1] - pe[1] * me);
        }
        J.zoom(null, le);
      };
    });
  }
  function Q(w, U, I) {
    return !I && w.__zooming || new R(w, U);
  }
  function R(w, U) {
    this.that = w, this.args = U, this.active = 0, this.sourceEvent = null, this.extent = t.apply(w, U), this.taps = 0;
  }
  R.prototype = {
    event: function(w) {
      return w && (this.sourceEvent = w), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(w, U) {
      return this.mouse && w !== "mouse" && (this.mouse[1] = U.invert(this.mouse[0])), this.touch0 && w !== "touch" && (this.touch0[1] = U.invert(this.touch0[0])), this.touch1 && w !== "touch" && (this.touch1[1] = U.invert(this.touch1[0])), this.that.__zoom = U, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(w) {
      var U = an(this.that).datum();
      l.call(
        w,
        this.that,
        new _T(w, {
          sourceEvent: this.sourceEvent,
          target: x,
          transform: this.that.__zoom,
          dispatch: l
        }),
        U
      );
    }
  };
  function V(w, ...U) {
    if (!e.apply(this, arguments))
      return;
    var I = Q(this, U).event(w), j = this.__zoom, K = Math.max(a[0], Math.min(a[1], j.k * Math.pow(2, r.apply(this, arguments)))), ee = xn(w);
    if (I.wheel)
      (I.mouse[0][0] !== ee[0] || I.mouse[0][1] !== ee[1]) && (I.mouse[1] = j.invert(I.mouse[0] = ee)), clearTimeout(I.wheel);
    else {
      if (j.k === K)
        return;
      I.mouse = [ee, j.invert(ee)], za(this), I.start();
    }
    gi(w), I.wheel = setTimeout(J, p), I.zoom("mouse", n(m(y(j, K), I.mouse[0], I.mouse[1]), I.extent, o));
    function J() {
      I.wheel = null, I.end();
    }
  }
  function P(w, ...U) {
    if (h || !e.apply(this, arguments))
      return;
    var I = w.currentTarget, j = Q(this, U, !0).event(w), K = an(w.view).on("mousemove.zoom", A, !0).on("mouseup.zoom", z, !0), ee = xn(w, I), J = w.clientX, de = w.clientY;
    Jf(w.view), fs(w), j.mouse = [ee, this.__zoom.invert(ee)], za(this), j.start();
    function A(L) {
      if (gi(L), !j.moved) {
        var O = L.clientX - J, X = L.clientY - de;
        j.moved = O * O + X * X > v;
      }
      j.event(L).zoom("mouse", n(m(j.that.__zoom, j.mouse[0] = xn(L, I), j.mouse[1]), j.extent, o));
    }
    function z(L) {
      K.on("mousemove.zoom mouseup.zoom", null), Qf(L.view, j.moved), gi(L), j.event(L).end();
    }
  }
  function H(w, ...U) {
    if (e.apply(this, arguments)) {
      var I = this.__zoom, j = xn(w.changedTouches ? w.changedTouches[0] : w, this), K = I.invert(j), ee = I.k * (w.shiftKey ? 0.5 : 2), J = n(m(y(I, ee), j, K), t.apply(this, U), o);
      gi(w), s > 0 ? an(this).transition().duration(s).call(Y, J, j, w) : an(this).call(x.transform, J, j, w);
    }
  }
  function G(w, ...U) {
    if (e.apply(this, arguments)) {
      var I = w.touches, j = I.length, K = Q(this, U, w.changedTouches.length === j).event(w), ee, J, de, A;
      for (fs(w), J = 0; J < j; ++J)
        de = I[J], A = xn(de, this), A = [A, this.__zoom.invert(A), de.identifier], K.touch0 ? !K.touch1 && K.touch0[2] !== A[2] && (K.touch1 = A, K.taps = 0) : (K.touch0 = A, ee = !0, K.taps = 1 + !!c);
      c && (c = clearTimeout(c)), ee && (K.taps < 2 && (f = A[0], c = setTimeout(function() {
        c = null;
      }, d)), za(this), K.start());
    }
  }
  function C(w, ...U) {
    if (this.__zooming) {
      var I = Q(this, U).event(w), j = w.changedTouches, K = j.length, ee, J, de, A;
      for (gi(w), ee = 0; ee < K; ++ee)
        J = j[ee], de = xn(J, this), I.touch0 && I.touch0[2] === J.identifier ? I.touch0[0] = de : I.touch1 && I.touch1[2] === J.identifier && (I.touch1[0] = de);
      if (J = I.that.__zoom, I.touch1) {
        var z = I.touch0[0], L = I.touch0[1], O = I.touch1[0], X = I.touch1[1], le = (le = O[0] - z[0]) * le + (le = O[1] - z[1]) * le, pe = (pe = X[0] - L[0]) * pe + (pe = X[1] - L[1]) * pe;
        J = y(J, Math.sqrt(le / pe)), de = [(z[0] + O[0]) / 2, (z[1] + O[1]) / 2], A = [(L[0] + X[0]) / 2, (L[1] + X[1]) / 2];
      } else if (I.touch0)
        de = I.touch0[0], A = I.touch0[1];
      else
        return;
      I.zoom("touch", n(m(J, de, A), I.extent, o));
    }
  }
  function se(w, ...U) {
    if (this.__zooming) {
      var I = Q(this, U).event(w), j = w.changedTouches, K = j.length, ee, J;
      for (fs(w), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, d), ee = 0; ee < K; ++ee)
        J = j[ee], I.touch0 && I.touch0[2] === J.identifier ? delete I.touch0 : I.touch1 && I.touch1[2] === J.identifier && delete I.touch1;
      if (I.touch1 && !I.touch0 && (I.touch0 = I.touch1, delete I.touch1), I.touch0)
        I.touch0[1] = this.__zoom.invert(I.touch0[0]);
      else if (I.end(), I.taps === 2 && (J = xn(J, this), Math.hypot(f[0] - J[0], f[1] - J[1]) < g)) {
        var de = an(this).on("dblclick.zoom");
        de && de.apply(this, arguments);
      }
    }
  }
  return x.wheelDelta = function(w) {
    return arguments.length ? (r = typeof w == "function" ? w : Aa(+w), x) : r;
  }, x.filter = function(w) {
    return arguments.length ? (e = typeof w == "function" ? w : Aa(!!w), x) : e;
  }, x.touchable = function(w) {
    return arguments.length ? (i = typeof w == "function" ? w : Aa(!!w), x) : i;
  }, x.extent = function(w) {
    return arguments.length ? (t = typeof w == "function" ? w : Aa([[+w[0][0], +w[0][1]], [+w[1][0], +w[1][1]]]), x) : t;
  }, x.scaleExtent = function(w) {
    return arguments.length ? (a[0] = +w[0], a[1] = +w[1], x) : [a[0], a[1]];
  }, x.translateExtent = function(w) {
    return arguments.length ? (o[0][0] = +w[0][0], o[1][0] = +w[1][0], o[0][1] = +w[0][1], o[1][1] = +w[1][1], x) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
  }, x.constrain = function(w) {
    return arguments.length ? (n = w, x) : n;
  }, x.duration = function(w) {
    return arguments.length ? (s = +w, x) : s;
  }, x.interpolate = function(w) {
    return arguments.length ? (u = w, x) : u;
  }, x.on = function() {
    var w = l.on.apply(l, arguments);
    return w === l ? x : w;
  }, x.clickDistance = function(w) {
    return arguments.length ? (v = (w = +w) * w, x) : Math.sqrt(v);
  }, x.tapDistance = function(w) {
    return arguments.length ? (g = +w, x) : g;
  }, x;
}
var De = /* @__PURE__ */ ((e) => (e.Left = "left", e.Top = "top", e.Right = "right", e.Bottom = "bottom", e))(De || {}), Cl = /* @__PURE__ */ ((e) => (e.Partial = "partial", e.Full = "full", e))(Cl || {}), fr = /* @__PURE__ */ ((e) => (e.Bezier = "default", e.SimpleBezier = "simple-bezier", e.Straight = "straight", e.Step = "step", e.SmoothStep = "smoothstep", e))(fr || {}), ar = /* @__PURE__ */ ((e) => (e.Strict = "strict", e.Loose = "loose", e))(ar || {}), go = /* @__PURE__ */ ((e) => (e.Arrow = "arrow", e.ArrowClosed = "arrowclosed", e))(go || {}), Di = /* @__PURE__ */ ((e) => (e.Free = "free", e.Vertical = "vertical", e.Horizontal = "horizontal", e))(Di || {}), dh = /* @__PURE__ */ ((e) => (e.TopLeft = "top-left", e.TopCenter = "top-center", e.TopRight = "top-right", e.BottomLeft = "bottom-left", e.BottomCenter = "bottom-center", e.BottomRight = "bottom-right", e))(dh || {});
const CT = ["INPUT", "SELECT", "TEXTAREA"], NT = typeof document < "u" ? document : null;
function Ps(e) {
  var t, n;
  const r = ((n = (t = e.composedPath) == null ? void 0 : t.call(e)) == null ? void 0 : n[0]) || e.target, i = typeof (r == null ? void 0 : r.hasAttribute) == "function" ? r.hasAttribute("contenteditable") : !1, a = typeof (r == null ? void 0 : r.closest) == "function" ? r.closest(".nokey") : null;
  return CT.includes(r == null ? void 0 : r.nodeName) || i || !!a;
}
function FT(e) {
  return e.ctrlKey || e.metaKey || e.shiftKey || e.altKey;
}
function u0(e, t, n, r) {
  const i = t.replace("+", `
`).replace(`

`, `
+`).split(`
`).map((o) => o.trim().toLowerCase());
  if (i.length === 1)
    return e.toLowerCase() === t.toLowerCase();
  r || n.add(e.toLowerCase());
  const a = i.every(
    (o, s) => n.has(o) && Array.from(n.values())[s] === i[s]
  );
  return r && n.delete(e.toLowerCase()), a;
}
function kT(e, t) {
  return (n) => {
    if (!n.code && !n.key)
      return !1;
    const r = IT(n.code, e);
    return Array.isArray(e) ? e.some((i) => u0(n[r], i, t, n.type === "keyup")) : u0(n[r], e, t, n.type === "keyup");
  };
}
function IT(e, t) {
  return t.includes(e) ? "code" : "key";
}
function bi(e, t) {
  const n = Re(() => Ve(t == null ? void 0 : t.target) ?? NT), r = Qn(Ve(e) === !0);
  let i = !1;
  const a = /* @__PURE__ */ new Set();
  let o = u(Ve(e));
  tt(
    () => Ve(e),
    (l, c) => {
      typeof c == "boolean" && typeof l != "boolean" && s(), o = u(l);
    },
    {
      immediate: !0
    }
  ), $f(["blur", "contextmenu"], s), Gu(
    (...l) => o(...l),
    (l) => {
      var c, f;
      const h = Ve(t == null ? void 0 : t.actInsideInputWithModifier) ?? !0, d = Ve(t == null ? void 0 : t.preventDefault) ?? !1;
      if (i = FT(l), (!i || i && !h) && Ps(l))
        return;
      const v = ((f = (c = l.composedPath) == null ? void 0 : c.call(l)) == null ? void 0 : f[0]) || l.target, g = (v == null ? void 0 : v.nodeName) === "BUTTON" || (v == null ? void 0 : v.nodeName) === "A";
      !d && (i || !g) && l.preventDefault(), r.value = !0;
    },
    { eventName: "keydown", target: n }
  ), Gu(
    (...l) => o(...l),
    (l) => {
      const c = Ve(t == null ? void 0 : t.actInsideInputWithModifier) ?? !0;
      if (r.value) {
        if ((!i || i && !c) && Ps(l))
          return;
        i = !1, r.value = !1;
      }
    },
    { eventName: "keyup", target: n }
  );
  function s() {
    i = !1, a.clear(), r.value = Ve(e) === !0;
  }
  function u(l) {
    return l === null ? (s(), () => !1) : typeof l == "boolean" ? (s(), r.value = l, () => !1) : Array.isArray(l) || typeof l == "string" ? kT(l, a) : l;
  }
  return r;
}
const vh = "vue-flow__node-desc", ph = "vue-flow__edge-desc", OT = "vue-flow__aria-live", gh = ["Enter", " ", "Escape"], jr = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
};
function mo(e) {
  return {
    ...e.computedPosition || { x: 0, y: 0 },
    width: e.dimensions.width || 0,
    height: e.dimensions.height || 0
  };
}
function xo(e, t) {
  const n = Math.max(0, Math.min(e.x + e.width, t.x + t.width) - Math.max(e.x, t.x)), r = Math.max(0, Math.min(e.y + e.height, t.y + t.height) - Math.max(e.y, t.y));
  return Math.ceil(n * r);
}
function $o(e) {
  return {
    width: e.offsetWidth,
    height: e.offsetHeight
  };
}
function Cr(e, t = 0, n = 1) {
  return Math.min(Math.max(e, t), n);
}
function mh(e, t) {
  return {
    x: Cr(e.x, t[0][0], t[1][0]),
    y: Cr(e.y, t[0][1], t[1][1])
  };
}
function c0(e) {
  const t = e.getRootNode();
  return "elementFromPoint" in t ? t : window.document;
}
function or(e) {
  return e && typeof e == "object" && "id" in e && "source" in e && "target" in e;
}
function xr(e) {
  return e && typeof e == "object" && "id" in e && "position" in e && !or(e);
}
function Ei(e) {
  return xr(e) && "computedPosition" in e;
}
function Ca(e) {
  return !Number.isNaN(e) && Number.isFinite(e);
}
function DT(e) {
  return Ca(e.width) && Ca(e.height) && Ca(e.x) && Ca(e.y);
}
function bT(e, t, n) {
  const r = {
    id: e.id.toString(),
    type: e.type ?? "default",
    dimensions: Pa({
      width: 0,
      height: 0
    }),
    computedPosition: Pa({
      z: 0,
      ...e.position
    }),
    // todo: shouldn't be defined initially, as we want to use handleBounds to check if a node was actually initialized or not
    handleBounds: {
      source: [],
      target: []
    },
    draggable: void 0,
    selectable: void 0,
    connectable: void 0,
    focusable: void 0,
    selected: !1,
    dragging: !1,
    resizing: !1,
    initialized: !1,
    isParent: !1,
    position: {
      x: 0,
      y: 0
    },
    data: dt(e.data) ? e.data : {},
    events: Pa(dt(e.events) ? e.events : {})
  };
  return Object.assign(t ?? r, e, { id: e.id.toString(), parentNode: n });
}
function xh(e, t, n) {
  var r, i;
  const a = {
    id: e.id.toString(),
    type: e.type ?? (t == null ? void 0 : t.type) ?? "default",
    source: e.source.toString(),
    target: e.target.toString(),
    sourceHandle: (r = e.sourceHandle) == null ? void 0 : r.toString(),
    targetHandle: (i = e.targetHandle) == null ? void 0 : i.toString(),
    updatable: e.updatable ?? (n == null ? void 0 : n.updatable),
    selectable: e.selectable ?? (n == null ? void 0 : n.selectable),
    focusable: e.focusable ?? (n == null ? void 0 : n.focusable),
    data: dt(e.data) ? e.data : {},
    events: Pa(dt(e.events) ? e.events : {}),
    label: e.label ?? "",
    interactionWidth: e.interactionWidth ?? (n == null ? void 0 : n.interactionWidth),
    ...n ?? {}
  };
  return Object.assign(t ?? a, e, { id: e.id.toString() });
}
function _h(e, t, n, r) {
  const i = typeof e == "string" ? e : e.id, a = /* @__PURE__ */ new Set(), o = r === "source" ? "target" : "source";
  for (const s of n)
    s[o] === i && a.add(s[r]);
  return t.filter((s) => a.has(s.id));
}
function MT(...e) {
  if (e.length === 3) {
    const [a, o, s] = e;
    return _h(a, o, s, "target");
  }
  const [t, n] = e, r = typeof t == "string" ? t : t.id;
  return n.filter((a) => or(a) && a.source === r).map((a) => n.find((o) => xr(o) && o.id === a.target));
}
function RT(...e) {
  if (e.length === 3) {
    const [a, o, s] = e;
    return _h(a, o, s, "source");
  }
  const [t, n] = e, r = typeof t == "string" ? t : t.id;
  return n.filter((a) => or(a) && a.target === r).map((a) => n.find((o) => xr(o) && o.id === a.source));
}
function wh({ source: e, sourceHandle: t, target: n, targetHandle: r }) {
  return `vueflow__edge-${e}${t ?? ""}-${n}${r ?? ""}`;
}
function PT(e, t) {
  return t.some(
    (n) => or(n) && n.source === e.source && n.target === e.target && (n.sourceHandle === e.sourceHandle || !n.sourceHandle && !e.sourceHandle) && (n.targetHandle === e.targetHandle || !n.targetHandle && !e.targetHandle)
  );
}
function Xi({ x: e, y: t }, { x: n, y: r, zoom: i }) {
  return {
    x: e * i + n,
    y: t * i + r
  };
}
function Yi({ x: e, y: t }, { x: n, y: r, zoom: i }, a = !1, o = [1, 1]) {
  const s = {
    x: (e - n) / i,
    y: (t - r) / i
  };
  return a ? Uo(s, o) : s;
}
function yh(e, t) {
  return {
    x: Math.min(e.x, t.x),
    y: Math.min(e.y, t.y),
    x2: Math.max(e.x2, t.x2),
    y2: Math.max(e.y2, t.y2)
  };
}
function _o({ x: e, y: t, width: n, height: r }) {
  return {
    x: e,
    y: t,
    x2: e + n,
    y2: t + r
  };
}
function Eh({ x: e, y: t, x2: n, y2: r }) {
  return {
    x: e,
    y: t,
    width: n - e,
    height: r - t
  };
}
function LT(e, t) {
  return Eh(yh(_o(e), _o(t)));
}
function Nl(e) {
  let t = {
    x: Number.POSITIVE_INFINITY,
    y: Number.POSITIVE_INFINITY,
    x2: Number.NEGATIVE_INFINITY,
    y2: Number.NEGATIVE_INFINITY
  };
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    t = yh(
      t,
      _o({
        ...r.computedPosition,
        ...r.dimensions
      })
    );
  }
  return Eh(t);
}
function Th(e, t, n = { x: 0, y: 0, zoom: 1 }, r = !1, i = !1) {
  const a = {
    ...Yi(t, n),
    width: t.width / n.zoom,
    height: t.height / n.zoom
  }, o = [];
  for (const s of e) {
    const { dimensions: u, selectable: l = !0, hidden: c = !1 } = s, f = u.width ?? s.width ?? null, h = u.height ?? s.height ?? null;
    if (i && !l || c)
      continue;
    const d = xo(a, mo(s)), p = f === null || h === null, v = r && d > 0, g = (f ?? 0) * (h ?? 0);
    (p || v || d >= g || s.dragging) && o.push(s);
  }
  return o;
}
function hr(e, t) {
  const n = /* @__PURE__ */ new Set();
  if (typeof e == "string")
    n.add(e);
  else if (e.length >= 1)
    for (const r of e)
      n.add(r.id);
  return t.filter((r) => n.has(r.source) || n.has(r.target));
}
function Hr(e, t) {
  if (typeof e == "number")
    return Math.floor((t - t / (1 + e)) * 0.5);
  if (typeof e == "string" && e.endsWith("px")) {
    const n = Number.parseFloat(e);
    if (!Number.isNaN(n))
      return Math.floor(n);
  }
  if (typeof e == "string" && e.endsWith("%")) {
    const n = Number.parseFloat(e);
    if (!Number.isNaN(n))
      return Math.floor(t * n * 0.01);
  }
  return la(`The padding value "${e}" is invalid. Please provide a number or a string with a valid unit (px or %).`), 0;
}
function BT(e, t, n) {
  if (typeof e == "string" || typeof e == "number") {
    const r = Hr(e, n), i = Hr(e, t);
    return {
      top: r,
      right: i,
      bottom: r,
      left: i,
      x: i * 2,
      y: r * 2
    };
  }
  if (typeof e == "object") {
    const r = Hr(e.top ?? e.y ?? 0, n), i = Hr(e.bottom ?? e.y ?? 0, n), a = Hr(e.left ?? e.x ?? 0, t), o = Hr(e.right ?? e.x ?? 0, t);
    return { top: r, right: o, bottom: i, left: a, x: a + o, y: r + i };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function $T(e, t, n, r, i, a) {
  const { x: o, y: s } = Xi(e, { x: t, y: n, zoom: r }), { x: u, y: l } = Xi(
    { x: e.x + e.width, y: e.y + e.height },
    {
      x: t,
      y: n,
      zoom: r
    }
  ), c = i - u, f = a - l;
  return {
    left: Math.floor(o),
    top: Math.floor(s),
    right: Math.floor(c),
    bottom: Math.floor(f)
  };
}
function f0(e, t, n, r, i, a = 0.1) {
  const o = BT(a, t, n), s = (t - o.x) / e.width, u = (n - o.y) / e.height, l = Math.min(s, u), c = Cr(l, r, i), f = e.x + e.width / 2, h = e.y + e.height / 2, d = t / 2 - f * c, p = n / 2 - h * c, v = $T(e, d, p, c, t, n), g = {
    left: Math.min(v.left - o.left, 0),
    top: Math.min(v.top - o.top, 0),
    right: Math.min(v.right - o.right, 0),
    bottom: Math.min(v.bottom - o.bottom, 0)
  };
  return {
    x: d - g.left + g.right,
    y: p - g.top + g.bottom,
    zoom: c
  };
}
function UT(e, t) {
  return {
    x: t.x + e.x,
    y: t.y + e.y,
    z: (e.z > t.z ? e.z : t.z) + 1
  };
}
function Sh(e, t) {
  if (!e.parentNode)
    return !1;
  const n = t.get(e.parentNode);
  return n ? n.selected ? !0 : Sh(n, t) : !1;
}
function Ki(e, t) {
  return typeof e > "u" ? "" : typeof e == "string" ? e : `${t ? `${t}__` : ""}${Object.keys(e).sort().map((r) => `${r}=${e[r]}`).join("&")}`;
}
function Ls(e) {
  const t = e.ctrlKey && Zi() ? 10 : 1;
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * t;
}
function h0(e, t, n) {
  return e < t ? Cr(Math.abs(e - t), 1, t) / t : e > n ? -Cr(Math.abs(e - n), 1, t) / t : 0;
}
function Ah(e, t, n = 15, r = 40) {
  const i = h0(e.x, r, t.width - r) * n, a = h0(e.y, r, t.height - r) * n;
  return [i, a];
}
function hs(e, t) {
  if (t) {
    const n = e.position.x + e.dimensions.width - t.dimensions.width, r = e.position.y + e.dimensions.height - t.dimensions.height;
    if (n > 0 || r > 0 || e.position.x < 0 || e.position.y < 0) {
      let i = {};
      if (typeof t.style == "function" ? i = { ...t.style(t) } : t.style && (i = { ...t.style }), i.width = i.width ?? `${t.dimensions.width}px`, i.height = i.height ?? `${t.dimensions.height}px`, n > 0)
        if (typeof i.width == "string") {
          const a = Number(i.width.replace("px", ""));
          i.width = `${a + n}px`;
        } else
          i.width += n;
      if (r > 0)
        if (typeof i.height == "string") {
          const a = Number(i.height.replace("px", ""));
          i.height = `${a + r}px`;
        } else
          i.height += r;
      if (e.position.x < 0) {
        const a = Math.abs(e.position.x);
        if (t.position.x = t.position.x - a, typeof i.width == "string") {
          const o = Number(i.width.replace("px", ""));
          i.width = `${o + a}px`;
        } else
          i.width += a;
        e.position.x = 0;
      }
      if (e.position.y < 0) {
        const a = Math.abs(e.position.y);
        if (t.position.y = t.position.y - a, typeof i.height == "string") {
          const o = Number(i.height.replace("px", ""));
          i.height = `${o + a}px`;
        } else
          i.height += a;
        e.position.y = 0;
      }
      t.dimensions.width = Number(i.width.toString().replace("px", "")), t.dimensions.height = Number(i.height.toString().replace("px", "")), typeof t.style == "function" ? t.style = (a) => {
        const o = t.style;
        return {
          ...o(a),
          ...i
        };
      } : t.style = {
        ...t.style,
        ...i
      };
    }
  }
}
function d0(e, t) {
  var n, r;
  const i = e.filter((o) => o.type === "add" || o.type === "remove");
  for (const o of i)
    if (o.type === "add")
      t.findIndex((u) => u.id === o.item.id) === -1 && t.push(o.item);
    else if (o.type === "remove") {
      const s = t.findIndex((u) => u.id === o.id);
      s !== -1 && t.splice(s, 1);
    }
  const a = t.map((o) => o.id);
  for (const o of t)
    for (const s of e)
      if (s.id === o.id)
        switch (s.type) {
          case "select":
            o.selected = s.selected;
            break;
          case "position":
            if (Ei(o) && (typeof s.position < "u" && (o.position = s.position), typeof s.dragging < "u" && (o.dragging = s.dragging), o.expandParent && o.parentNode)) {
              const u = t[a.indexOf(o.parentNode)];
              u && Ei(u) && hs(o, u);
            }
            break;
          case "dimensions":
            if (Ei(o) && (typeof s.dimensions < "u" && (o.dimensions = s.dimensions), typeof s.updateStyle < "u" && s.updateStyle && (o.style = {
              ...o.style || {},
              width: `${(n = s.dimensions) == null ? void 0 : n.width}px`,
              height: `${(r = s.dimensions) == null ? void 0 : r.height}px`
            }), typeof s.resizing < "u" && (o.resizing = s.resizing), o.expandParent && o.parentNode)) {
              const u = t[a.indexOf(o.parentNode)];
              u && Ei(u) && (!!u.dimensions.width && !!u.dimensions.height ? hs(o, u) : Pn(() => {
                hs(o, u);
              }));
            }
            break;
        }
  return t;
}
function Kn(e, t) {
  return {
    id: e,
    type: "select",
    selected: t
  };
}
function v0(e) {
  return {
    item: e,
    type: "add"
  };
}
function p0(e) {
  return {
    id: e,
    type: "remove"
  };
}
function g0(e, t, n, r, i) {
  return {
    id: e,
    source: t,
    target: n,
    sourceHandle: r || null,
    targetHandle: i || null,
    type: "remove"
  };
}
function qn(e, t = /* @__PURE__ */ new Set(), n = !1) {
  const r = [];
  for (const [i, a] of e) {
    const o = t.has(i);
    !(a.selected === void 0 && !o) && a.selected !== o && (n && (a.selected = o), r.push(Kn(a.id, o)));
  }
  return r;
}
const m0 = () => {
};
function ke(e) {
  const t = /* @__PURE__ */ new Set();
  let n = m0, r = () => !1;
  const i = () => t.size > 0 || r(), a = (h) => {
    n = h;
  }, o = () => {
    n = m0;
  }, s = (h) => {
    r = h;
  }, u = () => {
    r = () => !1;
  }, l = (h) => {
    t.delete(h);
  };
  return {
    on: (h) => {
      t.add(h);
      const d = () => l(h);
      return zi(d), { off: d };
    },
    off: l,
    trigger: (h) => {
      const d = [n];
      return i() ? d.push(...t) : e && d.push(e), Promise.allSettled(d.map((p) => p(h)));
    },
    hasListeners: i,
    listeners: t,
    setEmitter: a,
    removeEmitter: o,
    setHasEmitListeners: s,
    removeHasEmitListeners: u
  };
}
function x0(e, t, n) {
  let r = e;
  do {
    if (r && r.matches(t))
      return !0;
    if (r === n)
      return !1;
    r = r.parentElement;
  } while (r);
  return !1;
}
function zT(e, t, n, r) {
  var i, a;
  const o = /* @__PURE__ */ new Map();
  for (const [s, u] of e)
    (u.selected || u.id === r) && (!u.parentNode || !Sh(u, e)) && (u.draggable || t && typeof u.draggable > "u") && e.get(s) && o.set(s, {
      id: u.id,
      position: u.position || { x: 0, y: 0 },
      distance: {
        x: n.x - ((i = u.computedPosition) == null ? void 0 : i.x) || 0,
        y: n.y - ((a = u.computedPosition) == null ? void 0 : a.y) || 0
      },
      from: { x: u.computedPosition.x, y: u.computedPosition.y },
      extent: u.extent,
      parentNode: u.parentNode,
      dimensions: { ...u.dimensions },
      expandParent: u.expandParent
    });
  return Array.from(o.values());
}
function ds({
  id: e,
  dragItems: t,
  findNode: n
}) {
  const r = [];
  for (const i of t) {
    const a = n(i.id);
    a && r.push(a);
  }
  return [e ? r.find((i) => i.id === e) : r[0], r];
}
function Ch(e) {
  if (Array.isArray(e))
    switch (e.length) {
      case 1:
        return [e[0], e[0], e[0], e[0]];
      case 2:
        return [e[0], e[1], e[0], e[1]];
      case 3:
        return [e[0], e[1], e[2], e[1]];
      case 4:
        return e;
      default:
        return [0, 0, 0, 0];
    }
  return [e, e, e, e];
}
function HT(e, t, n) {
  const [r, i, a, o] = typeof e != "string" ? Ch(e.padding) : [0, 0, 0, 0];
  return n && typeof n.computedPosition.x < "u" && typeof n.computedPosition.y < "u" && typeof n.dimensions.width < "u" && typeof n.dimensions.height < "u" ? [
    [n.computedPosition.x + o, n.computedPosition.y + r],
    [
      n.computedPosition.x + n.dimensions.width - i,
      n.computedPosition.y + n.dimensions.height - a
    ]
  ] : !1;
}
function VT(e, t, n, r) {
  let i = e.extent || n;
  if ((i === "parent" || !Array.isArray(i) && (i == null ? void 0 : i.range) === "parent") && !e.expandParent)
    if (e.parentNode && r && e.dimensions.width && e.dimensions.height) {
      const a = HT(i, e, r);
      a && (i = a);
    } else
      t(new xt(vt.NODE_EXTENT_INVALID, e.id)), i = n;
  else if (Array.isArray(i)) {
    const a = (r == null ? void 0 : r.computedPosition.x) || 0, o = (r == null ? void 0 : r.computedPosition.y) || 0;
    i = [
      [i[0][0] + a, i[0][1] + o],
      [i[1][0] + a, i[1][1] + o]
    ];
  } else if (i !== "parent" && (i != null && i.range) && Array.isArray(i.range)) {
    const [a, o, s, u] = Ch(i.padding), l = (r == null ? void 0 : r.computedPosition.x) || 0, c = (r == null ? void 0 : r.computedPosition.y) || 0;
    i = [
      [i.range[0][0] + l + u, i.range[0][1] + c + a],
      [i.range[1][0] + l - o, i.range[1][1] + c - s]
    ];
  }
  return i === "parent" ? [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
  ] : i;
}
function WT({ width: e, height: t }, n) {
  return [n[0], [n[1][0] - (e || 0), n[1][1] - (t || 0)]];
}
function Fl(e, t, n, r, i) {
  const a = WT(e.dimensions, VT(e, n, r, i)), o = mh(t, a);
  return {
    position: {
      x: o.x - ((i == null ? void 0 : i.computedPosition.x) || 0),
      y: o.y - ((i == null ? void 0 : i.computedPosition.y) || 0)
    },
    computedPosition: o
  };
}
function ri(e, t, n = De.Left, r = !1) {
  const i = ((t == null ? void 0 : t.x) ?? 0) + e.computedPosition.x, a = ((t == null ? void 0 : t.y) ?? 0) + e.computedPosition.y, { width: o, height: s } = t ?? KT(e);
  if (r)
    return { x: i + o / 2, y: a + s / 2 };
  switch ((t == null ? void 0 : t.position) ?? n) {
    case De.Top:
      return { x: i + o / 2, y: a };
    case De.Right:
      return { x: i + o, y: a + s / 2 };
    case De.Bottom:
      return { x: i + o / 2, y: a + s };
    case De.Left:
      return { x: i, y: a + s / 2 };
  }
}
function _0(e, t) {
  return e && (t ? e.find((n) => n.id === t) : e[0]) || null;
}
function GT({
  sourcePos: e,
  targetPos: t,
  sourceWidth: n,
  sourceHeight: r,
  targetWidth: i,
  targetHeight: a,
  width: o,
  height: s,
  viewport: u
}) {
  const l = {
    x: Math.min(e.x, t.x),
    y: Math.min(e.y, t.y),
    x2: Math.max(e.x + n, t.x + i),
    y2: Math.max(e.y + r, t.y + a)
  };
  l.x === l.x2 && (l.x2 += 1), l.y === l.y2 && (l.y2 += 1);
  const c = _o({
    x: (0 - u.x) / u.zoom,
    y: (0 - u.y) / u.zoom,
    width: o / u.zoom,
    height: s / u.zoom
  }), f = Math.max(0, Math.min(c.x2, l.x2) - Math.max(c.x, l.x)), h = Math.max(0, Math.min(c.y2, l.y2) - Math.max(c.y, l.y));
  return Math.ceil(f * h) > 0;
}
function XT(e, t, n = !1) {
  const r = typeof e.zIndex == "number";
  let i = r ? e.zIndex : 0;
  const a = t(e.source), o = t(e.target);
  return !a || !o ? 0 : (n && (i = r ? e.zIndex : Math.max(a.computedPosition.z || 0, o.computedPosition.z || 0)), i);
}
var vt = /* @__PURE__ */ ((e) => (e.MISSING_STYLES = "MISSING_STYLES", e.MISSING_VIEWPORT_DIMENSIONS = "MISSING_VIEWPORT_DIMENSIONS", e.NODE_INVALID = "NODE_INVALID", e.NODE_NOT_FOUND = "NODE_NOT_FOUND", e.NODE_MISSING_PARENT = "NODE_MISSING_PARENT", e.NODE_TYPE_MISSING = "NODE_TYPE_MISSING", e.NODE_EXTENT_INVALID = "NODE_EXTENT_INVALID", e.EDGE_INVALID = "EDGE_INVALID", e.EDGE_NOT_FOUND = "EDGE_NOT_FOUND", e.EDGE_SOURCE_MISSING = "EDGE_SOURCE_MISSING", e.EDGE_TARGET_MISSING = "EDGE_TARGET_MISSING", e.EDGE_TYPE_MISSING = "EDGE_TYPE_MISSING", e.EDGE_SOURCE_TARGET_SAME = "EDGE_SOURCE_TARGET_SAME", e.EDGE_SOURCE_TARGET_MISSING = "EDGE_SOURCE_TARGET_MISSING", e.EDGE_ORPHANED = "EDGE_ORPHANED", e.USEVUEFLOW_OPTIONS = "USEVUEFLOW_OPTIONS", e))(vt || {});
const w0 = {
  MISSING_STYLES: () => "It seems that you haven't loaded the necessary styles. Please import '@vue-flow/core/dist/style.css' to ensure that the graph is rendered correctly",
  MISSING_VIEWPORT_DIMENSIONS: () => "The Vue Flow parent container needs a width and a height to render the graph",
  NODE_INVALID: (e) => `Node is invalid
Node: ${e}`,
  NODE_NOT_FOUND: (e) => `Node not found
Node: ${e}`,
  NODE_MISSING_PARENT: (e, t) => `Node is missing a parent
Node: ${e}
Parent: ${t}`,
  NODE_TYPE_MISSING: (e) => `Node type is missing
Type: ${e}`,
  NODE_EXTENT_INVALID: (e) => `Only child nodes can use a parent extent
Node: ${e}`,
  EDGE_INVALID: (e) => `An edge needs a source and a target
Edge: ${e}`,
  EDGE_SOURCE_MISSING: (e, t) => `Edge source is missing
Edge: ${e} 
Source: ${t}`,
  EDGE_TARGET_MISSING: (e, t) => `Edge target is missing
Edge: ${e} 
Target: ${t}`,
  EDGE_TYPE_MISSING: (e) => `Edge type is missing
Type: ${e}`,
  EDGE_SOURCE_TARGET_SAME: (e, t, n) => `Edge source and target are the same
Edge: ${e} 
Source: ${t} 
Target: ${n}`,
  EDGE_SOURCE_TARGET_MISSING: (e, t, n) => `Edge source or target is missing
Edge: ${e} 
Source: ${t} 
Target: ${n}`,
  EDGE_ORPHANED: (e) => `Edge was orphaned (suddenly missing source or target) and has been removed
Edge: ${e}`,
  EDGE_NOT_FOUND: (e) => `Edge not found
Edge: ${e}`,
  // deprecation errors
  USEVUEFLOW_OPTIONS: () => "The options parameter is deprecated and will be removed in the next major version. Please use the id parameter instead"
};
class xt extends Error {
  constructor(t, ...n) {
    var r;
    super((r = w0[t]) == null ? void 0 : r.call(w0, ...n)), this.name = "VueFlowError", this.code = t, this.args = n;
  }
}
function kl(e) {
  return "clientX" in e;
}
function YT(e) {
  return "sourceEvent" in e;
}
function yn(e, t) {
  const n = kl(e);
  let r, i;
  return n ? (r = e.clientX, i = e.clientY) : "touches" in e && e.touches.length > 0 ? (r = e.touches[0].clientX, i = e.touches[0].clientY) : "changedTouches" in e && e.changedTouches.length > 0 ? (r = e.changedTouches[0].clientX, i = e.changedTouches[0].clientY) : (r = 0, i = 0), {
    x: r - ((t == null ? void 0 : t.left) ?? 0),
    y: i - ((t == null ? void 0 : t.top) ?? 0)
  };
}
const Zi = () => {
  var e;
  return typeof navigator < "u" && ((e = navigator == null ? void 0 : navigator.userAgent) == null ? void 0 : e.indexOf("Mac")) >= 0;
};
function KT(e) {
  var t, n;
  return {
    width: ((t = e.dimensions) == null ? void 0 : t.width) ?? e.width ?? 0,
    height: ((n = e.dimensions) == null ? void 0 : n.height) ?? e.height ?? 0
  };
}
function Uo(e, t = [1, 1]) {
  return {
    x: t[0] * Math.round(e.x / t[0]),
    y: t[1] * Math.round(e.y / t[1])
  };
}
const ZT = () => !0;
function vs(e) {
  e == null || e.classList.remove("valid", "connecting", "vue-flow__handle-valid", "vue-flow__handle-connecting");
}
function qT(e, t, n) {
  const r = [], i = {
    x: e.x - n,
    y: e.y - n,
    width: n * 2,
    height: n * 2
  };
  for (const a of t.values())
    xo(i, mo(a)) > 0 && r.push(a);
  return r;
}
const jT = 250;
function JT(e, t, n, r) {
  var i, a;
  let o = [], s = Number.POSITIVE_INFINITY;
  const u = qT(e, n, t + jT);
  for (const l of u) {
    const c = [...((i = l.handleBounds) == null ? void 0 : i.source) ?? [], ...((a = l.handleBounds) == null ? void 0 : a.target) ?? []];
    for (const f of c) {
      if (r.nodeId === f.nodeId && r.type === f.type && r.id === f.id)
        continue;
      const { x: h, y: d } = ri(l, f, f.position, !0), p = Math.sqrt((h - e.x) ** 2 + (d - e.y) ** 2);
      p > t || (p < s ? (o = [{ ...f, x: h, y: d }], s = p) : p === s && o.push({ ...f, x: h, y: d }));
    }
  }
  if (!o.length)
    return null;
  if (o.length > 1) {
    const l = r.type === "source" ? "target" : "source";
    return o.find((c) => c.type === l) ?? o[0];
  }
  return o[0];
}
function y0(e, {
  handle: t,
  connectionMode: n,
  fromNodeId: r,
  fromHandleId: i,
  fromType: a,
  doc: o,
  lib: s,
  flowId: u,
  isValidConnection: l = ZT
}, c, f, h, d) {
  const p = a === "target", v = t ? o.querySelector(`.${s}-flow__handle[data-id="${u}-${t == null ? void 0 : t.nodeId}-${t == null ? void 0 : t.id}-${t == null ? void 0 : t.type}"]`) : null, { x: g, y: x } = yn(e), y = o.elementFromPoint(g, x), m = y != null && y.classList.contains(`${s}-flow__handle`) ? y : v, T = {
    handleDomNode: m,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (m) {
    const Y = Nh(void 0, m), Q = m.getAttribute("data-nodeid"), R = m.getAttribute("data-handleid"), V = m.classList.contains("connectable"), P = m.classList.contains("connectableend");
    if (!Q || !Y)
      return T;
    const H = {
      source: p ? Q : r,
      sourceHandle: p ? R : i,
      target: p ? r : Q,
      targetHandle: p ? i : R
    };
    T.connection = H;
    const C = V && P && (n === ar.Strict ? p && Y === "source" || !p && Y === "target" : Q !== r || R !== i);
    T.isValid = C && l(H, {
      nodes: f,
      edges: c,
      sourceNode: h(H.source),
      targetNode: h(H.target)
    }), T.toHandle = Fh(Q, Y, R, d, n, !0);
  }
  return T;
}
function Nh(e, t) {
  return e || (t != null && t.classList.contains("target") ? "target" : t != null && t.classList.contains("source") ? "source" : null);
}
function QT(e, t) {
  let n = null;
  return t ? n = "valid" : e && !t && (n = "invalid"), n;
}
function eS(e, t) {
  let n = null;
  return t ? n = !0 : e && !t && (n = !1), n;
}
function Fh(e, t, n, r, i, a = !1) {
  var o, s, u;
  const l = r.get(e);
  if (!l)
    return null;
  const c = i === ar.Strict ? (o = l.handleBounds) == null ? void 0 : o[t] : [...((s = l.handleBounds) == null ? void 0 : s.source) ?? [], ...((u = l.handleBounds) == null ? void 0 : u.target) ?? []], f = (n ? c == null ? void 0 : c.find((h) => h.id === n) : c == null ? void 0 : c[0]) ?? null;
  return f && a ? { ...f, ...ri(l, f, f.position, !0) } : f;
}
const Bs = {
  [De.Left]: De.Right,
  [De.Right]: De.Left,
  [De.Top]: De.Bottom,
  [De.Bottom]: De.Top
}, tS = ["production", "prod"];
function la(e, ...t) {
  kh() && console.warn(`[Vue Flow]: ${e}`, ...t);
}
function kh() {
  return !tS.includes("production");
}
function E0(e, t, n, r, i) {
  const a = t.querySelectorAll(`.vue-flow__handle.${e}`);
  return a != null && a.length ? Array.from(a).map((o) => {
    const s = o.getBoundingClientRect();
    return {
      id: o.getAttribute("data-handleid"),
      type: e,
      nodeId: i,
      position: o.getAttribute("data-handlepos"),
      x: (s.left - n.left) / r,
      y: (s.top - n.top) / r,
      ...$o(o)
    };
  }) : null;
}
function $s(e, t, n, r, i, a = !1, o) {
  i.value = !1, e.selected ? (a || e.selected && t) && (r([e]), Pn(() => {
    o.blur();
  })) : n([e]);
}
function dt(e) {
  return typeof W(e) < "u";
}
function nS(e, t, n, r) {
  if (!e || !e.source || !e.target)
    return n(new xt(vt.EDGE_INVALID, (e == null ? void 0 : e.id) ?? "[ID UNKNOWN]")), !1;
  let i;
  return or(e) ? i = e : i = {
    ...e,
    id: wh(e)
  }, i = xh(i, void 0, r), PT(i, t) ? !1 : i;
}
function rS(e, t, n, r, i) {
  if (!t.source || !t.target)
    return i(new xt(vt.EDGE_INVALID, e.id)), !1;
  if (!n)
    return i(new xt(vt.EDGE_NOT_FOUND, e.id)), !1;
  const { id: a, ...o } = e;
  return {
    ...o,
    id: r ? wh(t) : a,
    source: t.source,
    target: t.target,
    sourceHandle: t.sourceHandle,
    targetHandle: t.targetHandle
  };
}
function T0(e, t, n) {
  const r = {}, i = [];
  for (let a = 0; a < e.length; ++a) {
    const o = e[a];
    if (!xr(o)) {
      n(
        new xt(vt.NODE_INVALID, o == null ? void 0 : o.id) || `[ID UNKNOWN|INDEX ${a}]`
      );
      continue;
    }
    const s = bT(o, t(o.id), o.parentNode);
    o.parentNode && (r[o.parentNode] = !0), i[a] = s;
  }
  for (const a of i) {
    const o = t(a.parentNode) || i.find((s) => s.id === a.parentNode);
    a.parentNode && !o && n(new xt(vt.NODE_MISSING_PARENT, a.id, a.parentNode)), (a.parentNode || r[a.id]) && (r[a.id] && (a.isParent = !0), o && (o.isParent = !0));
  }
  return i;
}
function S0(e, t, n, r, i, a) {
  let o = i;
  const s = r.get(o) || /* @__PURE__ */ new Map();
  r.set(o, s.set(n, t)), o = `${i}-${e}`;
  const u = r.get(o) || /* @__PURE__ */ new Map();
  if (r.set(o, u.set(n, t)), a) {
    o = `${i}-${e}-${a}`;
    const l = r.get(o) || /* @__PURE__ */ new Map();
    r.set(o, l.set(n, t));
  }
}
function ps(e, t, n) {
  e.clear();
  for (const r of n) {
    const { source: i, target: a, sourceHandle: o = null, targetHandle: s = null } = r, u = { edgeId: r.id, source: i, target: a, sourceHandle: o, targetHandle: s }, l = `${i}-${o}--${a}-${s}`, c = `${a}-${s}--${i}-${o}`;
    S0("source", u, c, e, i, o), S0("target", u, l, e, a, s);
  }
}
function A0(e, t) {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
}
function gs(e, t, n, r, i, a, o, s) {
  const u = [];
  for (const l of e) {
    const c = or(l) ? l : nS(l, s, i, a);
    if (!c)
      continue;
    const f = n(c.source), h = n(c.target);
    if (!f || !h) {
      i(new xt(vt.EDGE_SOURCE_TARGET_MISSING, c.id, c.source, c.target));
      continue;
    }
    if (!f) {
      i(new xt(vt.EDGE_SOURCE_MISSING, c.id, c.source));
      continue;
    }
    if (!h) {
      i(new xt(vt.EDGE_TARGET_MISSING, c.id, c.target));
      continue;
    }
    if (t && !t(c, {
      edges: s,
      nodes: o,
      sourceNode: f,
      targetNode: h
    })) {
      i(new xt(vt.EDGE_INVALID, c.id));
      continue;
    }
    const d = r(c.id);
    u.push({
      ...xh(c, d, a),
      sourceNode: f,
      targetNode: h
    });
  }
  return u;
}
const C0 = Symbol("vueFlow"), Ih = Symbol("nodeId"), Oh = Symbol("nodeRef"), iS = Symbol("edgeId"), aS = Symbol("edgeRef"), zo = Symbol("slots");
function Dh(e) {
  const {
    vueFlowRef: t,
    snapToGrid: n,
    snapGrid: r,
    noDragClassName: i,
    nodeLookup: a,
    nodeExtent: o,
    nodeDragThreshold: s,
    viewport: u,
    autoPanOnNodeDrag: l,
    autoPanSpeed: c,
    nodesDraggable: f,
    panBy: h,
    findNode: d,
    multiSelectionActive: p,
    nodesSelectionActive: v,
    selectNodesOnDrag: g,
    removeSelectedElements: x,
    addSelectedNodes: y,
    updateNodePositions: m,
    emits: T
  } = nt(), { onStart: Y, onDrag: Q, onStop: R, onClick: V, el: P, disabled: H, id: G, selectable: C, dragHandle: se } = e, w = Qn(!1);
  let U = [], I, j = null, K = { x: void 0, y: void 0 }, ee = { x: 0, y: 0 }, J = null, de = !1, A = !1, z = 0, L = !1;
  const O = lS(), X = ({ x: Z, y: _e }) => {
    K = { x: Z, y: _e };
    let F = !1;
    if (U = U.map((M) => {
      const D = { x: Z - M.distance.x, y: _e - M.distance.y }, { computedPosition: B } = Fl(
        M,
        n.value ? Uo(D, r.value) : D,
        T.error,
        o.value,
        M.parentNode ? d(M.parentNode) : void 0
      );
      return F = F || M.position.x !== B.x || M.position.y !== B.y, M.position = B, M;
    }), A = A || F, !!F && (m(U, !0, !0), w.value = !0, J)) {
      const [M, D] = ds({
        id: G,
        dragItems: U,
        findNode: d
      });
      Q({ event: J, node: M, nodes: D });
    }
  }, le = () => {
    if (!j)
      return;
    const [Z, _e] = Ah(ee, j, c.value);
    if (Z !== 0 || _e !== 0) {
      const F = {
        x: (K.x ?? 0) - Z / u.value.zoom,
        y: (K.y ?? 0) - _e / u.value.zoom
      };
      h({ x: Z, y: _e }) && X(F);
    }
    z = requestAnimationFrame(le);
  }, pe = (Z, _e) => {
    de = !0;
    const F = d(G);
    !g.value && !p.value && F && (F.selected || x()), F && Ve(C) && g.value && $s(
      F,
      p.value,
      y,
      x,
      v,
      !1,
      _e
    );
    const M = O(Z.sourceEvent);
    if (K = M, U = zT(a.value, f.value, M, G), U.length) {
      const [D, B] = ds({
        id: G,
        dragItems: U,
        findNode: d
      });
      Y({ event: Z.sourceEvent, node: D, nodes: B });
    }
  }, me = (Z, _e) => {
    var F;
    Z.sourceEvent.type === "touchmove" && Z.sourceEvent.touches.length > 1 || (A = !1, s.value === 0 && pe(Z, _e), K = O(Z.sourceEvent), j = ((F = t.value) == null ? void 0 : F.getBoundingClientRect()) || null, ee = yn(Z.sourceEvent, j));
  }, he = (Z, _e) => {
    const F = O(Z.sourceEvent);
    if (!L && de && l.value && (L = !0, le()), !de) {
      const M = F.xSnapped - (K.x ?? 0), D = F.ySnapped - (K.y ?? 0);
      Math.sqrt(M * M + D * D) > s.value && pe(Z, _e);
    }
    (K.x !== F.xSnapped || K.y !== F.ySnapped) && U.length && de && (J = Z.sourceEvent, ee = yn(Z.sourceEvent, j), X(F));
  }, ue = (Z) => {
    let _e = !1;
    if (!de && !w.value && !p.value) {
      const F = Z.sourceEvent, M = O(F), D = M.xSnapped - (K.x ?? 0), B = M.ySnapped - (K.y ?? 0), q = Math.sqrt(D * D + B * B);
      q !== 0 && q <= s.value && (V == null || V(F), _e = !0);
    }
    if (U.length && !_e) {
      A && (m(U, !1, !1), A = !1);
      const [F, M] = ds({
        id: G,
        dragItems: U,
        findNode: d
      });
      R({ event: Z.sourceEvent, node: F, nodes: M });
    }
    U = [], w.value = !1, L = !1, de = !1, K = { x: void 0, y: void 0 }, cancelAnimationFrame(z);
  };
  return tt([() => Ve(H), P], ([Z, _e], F, M) => {
    if (_e) {
      const D = an(_e);
      Z || (I = Dy().on("start", (B) => me(B, _e)).on("drag", (B) => he(B, _e)).on("end", (B) => ue(B)).filter((B) => {
        const q = B.target, Ee = Ve(se);
        return !B.button && (!i.value || !x0(q, `.${i.value}`, _e) && (!Ee || x0(q, Ee, _e)));
      }), D.call(I)), M(() => {
        D.on(".drag", null), I && (I.on("start", null), I.on("drag", null), I.on("end", null));
      });
    }
  }), w;
}
function oS() {
  return {
    doubleClick: ke(),
    click: ke(),
    mouseEnter: ke(),
    mouseMove: ke(),
    mouseLeave: ke(),
    contextMenu: ke(),
    updateStart: ke(),
    update: ke(),
    updateEnd: ke()
  };
}
function sS(e, t) {
  const n = oS();
  return n.doubleClick.on((r) => {
    var i, a;
    t.edgeDoubleClick(r), (a = (i = e.events) == null ? void 0 : i.doubleClick) == null || a.call(i, r);
  }), n.click.on((r) => {
    var i, a;
    t.edgeClick(r), (a = (i = e.events) == null ? void 0 : i.click) == null || a.call(i, r);
  }), n.mouseEnter.on((r) => {
    var i, a;
    t.edgeMouseEnter(r), (a = (i = e.events) == null ? void 0 : i.mouseEnter) == null || a.call(i, r);
  }), n.mouseMove.on((r) => {
    var i, a;
    t.edgeMouseMove(r), (a = (i = e.events) == null ? void 0 : i.mouseMove) == null || a.call(i, r);
  }), n.mouseLeave.on((r) => {
    var i, a;
    t.edgeMouseLeave(r), (a = (i = e.events) == null ? void 0 : i.mouseLeave) == null || a.call(i, r);
  }), n.contextMenu.on((r) => {
    var i, a;
    t.edgeContextMenu(r), (a = (i = e.events) == null ? void 0 : i.contextMenu) == null || a.call(i, r);
  }), n.updateStart.on((r) => {
    var i, a;
    t.edgeUpdateStart(r), (a = (i = e.events) == null ? void 0 : i.updateStart) == null || a.call(i, r);
  }), n.update.on((r) => {
    var i, a;
    t.edgeUpdate(r), (a = (i = e.events) == null ? void 0 : i.update) == null || a.call(i, r);
  }), n.updateEnd.on((r) => {
    var i, a;
    t.edgeUpdateEnd(r), (a = (i = e.events) == null ? void 0 : i.updateEnd) == null || a.call(i, r);
  }), Object.entries(n).reduce(
    (r, [i, a]) => (r.emit[i] = a.trigger, r.on[i] = a.on, r),
    { emit: {}, on: {} }
  );
}
function lS() {
  const { viewport: e, snapGrid: t, snapToGrid: n, vueFlowRef: r } = nt();
  return (i) => {
    var a;
    const o = ((a = r.value) == null ? void 0 : a.getBoundingClientRect()) ?? { left: 0, top: 0 }, s = YT(i) ? i.sourceEvent : i, { x: u, y: l } = yn(s, o), c = Yi({ x: u, y: l }, e.value), { x: f, y: h } = n.value ? Uo(c, t.value) : c;
    return {
      xSnapped: f,
      ySnapped: h,
      ...c
    };
  };
}
function Na() {
  return !0;
}
function bh({
  handleId: e,
  nodeId: t,
  type: n,
  isValidConnection: r,
  edgeUpdaterType: i,
  onEdgeUpdate: a,
  onEdgeUpdateEnd: o
}) {
  const {
    id: s,
    vueFlowRef: u,
    connectionMode: l,
    connectionRadius: c,
    connectOnClick: f,
    connectionClickStartHandle: h,
    nodesConnectable: d,
    autoPanOnConnect: p,
    autoPanSpeed: v,
    findNode: g,
    panBy: x,
    startConnection: y,
    updateConnection: m,
    endConnection: T,
    emits: Y,
    viewport: Q,
    edges: R,
    nodes: V,
    isValidConnection: P,
    nodeLookup: H
  } = nt();
  let G = null, C = !1, se = null;
  function w(I) {
    var j;
    const K = Ve(n) === "target", ee = kl(I), J = c0(I.target), de = I.currentTarget;
    if (de && (ee && I.button === 0 || !ee)) {
      let A = function(Ne) {
        F = yn(Ne, ue), X = JT(
          Yi(F, Q.value, !1, [1, 1]),
          c.value,
          H.value,
          B
        ), M || (D(), M = !0);
        const be = y0(
          Ne,
          {
            handle: X,
            connectionMode: l.value,
            fromNodeId: Ve(t),
            fromHandleId: Ve(e),
            fromType: K ? "target" : "source",
            isValidConnection: O,
            doc: J,
            lib: "vue",
            flowId: s,
            nodeLookup: H.value
          },
          R.value,
          V.value,
          g,
          H.value
        );
        se = be.handleDomNode, G = be.connection, C = eS(!!X, be.isValid);
        const Pe = {
          // from stays the same
          ...ne,
          isValid: C,
          to: be.toHandle && C ? Xi({ x: be.toHandle.x, y: be.toHandle.y }, Q.value) : F,
          toHandle: be.toHandle,
          toPosition: C && be.toHandle ? be.toHandle.position : Bs[B.position],
          toNode: be.toHandle ? H.value.get(be.toHandle.nodeId) : null
        };
        if (C && X && (ne != null && ne.toHandle) && Pe.toHandle && ne.toHandle.type === Pe.toHandle.type && ne.toHandle.nodeId === Pe.toHandle.nodeId && ne.toHandle.id === Pe.toHandle.id && ne.to.x === Pe.to.x && ne.to.y === Pe.to.y)
          return;
        const We = X ?? be.toHandle;
        if (m(
          We && C ? Xi(
            {
              x: We.x,
              y: We.y
            },
            Q.value
          ) : F,
          We,
          QT(!!We, C)
        ), ne = Pe, !X && !C && !se)
          return vs(_e);
        G && G.source !== G.target && se && (vs(_e), _e = se, se.classList.add("connecting", "vue-flow__handle-connecting"), se.classList.toggle("valid", !!C), se.classList.toggle("vue-flow__handle-valid", !!C));
      }, z = function(Ne) {
        "touches" in Ne && Ne.touches.length > 0 || ((X || se) && G && C && (a ? a(Ne, G) : Y.connect(G)), Y.connectEnd(Ne), i && (o == null || o(Ne)), vs(_e), cancelAnimationFrame(le), T(Ne), M = !1, C = !1, G = null, se = null, J.removeEventListener("mousemove", A), J.removeEventListener("mouseup", z), J.removeEventListener("touchmove", A), J.removeEventListener("touchend", z));
      };
      const L = g(Ve(t));
      let O = Ve(r) || P.value || Na;
      !O && L && (O = (K ? L.isValidSourcePos : L.isValidTargetPos) || Na);
      let X, le = 0;
      const { x: pe, y: me } = yn(I), he = Nh(Ve(i), de), ue = (j = u.value) == null ? void 0 : j.getBoundingClientRect();
      if (!ue || !he)
        return;
      const Z = Fh(Ve(t), he, Ve(e), H.value, l.value);
      if (!Z)
        return;
      let _e, F = yn(I, ue), M = !1;
      const D = () => {
        if (!p.value)
          return;
        const [Ne, be] = Ah(F, ue, v.value);
        x({ x: Ne, y: be }), le = requestAnimationFrame(D);
      }, B = {
        ...Z,
        nodeId: Ve(t),
        type: he,
        position: Z.position
      }, q = H.value.get(Ve(t)), Ae = {
        inProgress: !0,
        isValid: null,
        from: ri(q, B, De.Left, !0),
        fromHandle: B,
        fromPosition: B.position,
        fromNode: q,
        to: F,
        toHandle: null,
        toPosition: Bs[B.position],
        toNode: null
      };
      y(
        {
          nodeId: Ve(t),
          id: Ve(e),
          type: he,
          position: (de == null ? void 0 : de.getAttribute("data-handlepos")) || De.Top,
          ...F
        },
        {
          x: pe - ue.left,
          y: me - ue.top
        }
      ), Y.connectStart({ event: I, nodeId: Ve(t), handleId: Ve(e), handleType: he });
      let ne = Ae;
      J.addEventListener("mousemove", A), J.addEventListener("mouseup", z), J.addEventListener("touchmove", A), J.addEventListener("touchend", z);
    }
  }
  function U(I) {
    var j, K;
    if (!f.value)
      return;
    const ee = Ve(n) === "target";
    if (!h.value) {
      Y.clickConnectStart({ event: I, nodeId: Ve(t), handleId: Ve(e) }), y(
        {
          nodeId: Ve(t),
          type: Ve(n),
          id: Ve(e),
          position: De.Top,
          ...yn(I)
        },
        void 0,
        !0
      );
      return;
    }
    let J = Ve(r) || P.value || Na;
    const de = g(Ve(t));
    if (!J && de && (J = (ee ? de.isValidSourcePos : de.isValidTargetPos) || Na), de && (typeof de.connectable > "u" ? d.value : de.connectable) === !1)
      return;
    const A = c0(I.target), z = y0(
      I,
      {
        handle: {
          nodeId: Ve(t),
          id: Ve(e),
          type: Ve(n),
          position: De.Top,
          ...yn(I)
        },
        connectionMode: l.value,
        fromNodeId: h.value.nodeId,
        fromHandleId: h.value.id ?? null,
        fromType: h.value.type,
        isValidConnection: J,
        doc: A,
        lib: "vue",
        flowId: s,
        nodeLookup: H.value
      },
      R.value,
      V.value,
      g,
      H.value
    ), L = ((j = z.connection) == null ? void 0 : j.source) === ((K = z.connection) == null ? void 0 : K.target);
    z.isValid && z.connection && !L && Y.connect(z.connection), Y.clickConnectEnd(I), T(I, !0);
  }
  return {
    handlePointerDown: w,
    handleClick: U
  };
}
function uS() {
  return Fr(Ih, "");
}
function Mh(e) {
  const t = e ?? uS() ?? "", n = Fr(Oh, $e(null)), { findNode: r, edges: i, emits: a } = nt(), o = r(t);
  return o || a.error(new xt(vt.NODE_NOT_FOUND, t)), {
    id: t,
    nodeEl: n,
    node: o,
    parentNode: Re(() => r(o.parentNode)),
    connectedEdges: Re(() => hr([o], i.value))
  };
}
function cS() {
  return {
    doubleClick: ke(),
    click: ke(),
    mouseEnter: ke(),
    mouseMove: ke(),
    mouseLeave: ke(),
    contextMenu: ke(),
    dragStart: ke(),
    drag: ke(),
    dragStop: ke()
  };
}
function fS(e, t) {
  const n = cS();
  return n.doubleClick.on((r) => {
    var i, a;
    t.nodeDoubleClick(r), (a = (i = e.events) == null ? void 0 : i.doubleClick) == null || a.call(i, r);
  }), n.click.on((r) => {
    var i, a;
    t.nodeClick(r), (a = (i = e.events) == null ? void 0 : i.click) == null || a.call(i, r);
  }), n.mouseEnter.on((r) => {
    var i, a;
    t.nodeMouseEnter(r), (a = (i = e.events) == null ? void 0 : i.mouseEnter) == null || a.call(i, r);
  }), n.mouseMove.on((r) => {
    var i, a;
    t.nodeMouseMove(r), (a = (i = e.events) == null ? void 0 : i.mouseMove) == null || a.call(i, r);
  }), n.mouseLeave.on((r) => {
    var i, a;
    t.nodeMouseLeave(r), (a = (i = e.events) == null ? void 0 : i.mouseLeave) == null || a.call(i, r);
  }), n.contextMenu.on((r) => {
    var i, a;
    t.nodeContextMenu(r), (a = (i = e.events) == null ? void 0 : i.contextMenu) == null || a.call(i, r);
  }), n.dragStart.on((r) => {
    var i, a;
    t.nodeDragStart(r), (a = (i = e.events) == null ? void 0 : i.dragStart) == null || a.call(i, r);
  }), n.drag.on((r) => {
    var i, a;
    t.nodeDrag(r), (a = (i = e.events) == null ? void 0 : i.drag) == null || a.call(i, r);
  }), n.dragStop.on((r) => {
    var i, a;
    t.nodeDragStop(r), (a = (i = e.events) == null ? void 0 : i.dragStop) == null || a.call(i, r);
  }), Object.entries(n).reduce(
    (r, [i, a]) => (r.emit[i] = a.trigger, r.on[i] = a.on, r),
    { emit: {}, on: {} }
  );
}
function Rh() {
  const { getSelectedNodes: e, nodeExtent: t, updateNodePositions: n, findNode: r, snapGrid: i, snapToGrid: a, nodesDraggable: o, emits: s } = nt();
  return (u, l = !1) => {
    const c = a.value ? i.value[0] : 5, f = a.value ? i.value[1] : 5, h = l ? 4 : 1, d = u.x * c * h, p = u.y * f * h, v = [];
    for (const g of e.value)
      if (g.draggable || o && typeof g.draggable > "u") {
        const x = { x: g.computedPosition.x + d, y: g.computedPosition.y + p }, { position: y } = Fl(
          g,
          x,
          s.error,
          t.value,
          g.parentNode ? r(g.parentNode) : void 0
        );
        v.push({
          id: g.id,
          position: y,
          from: g.position,
          distance: { x: u.x, y: u.y },
          dimensions: g.dimensions
        });
      }
    n(v, !0, !1);
  };
}
const Fa = 0.1, hS = (e) => ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
function Yn() {
  return la("Viewport not initialized yet."), Promise.resolve(!1);
}
const dS = {
  zoomIn: Yn,
  zoomOut: Yn,
  zoomTo: Yn,
  fitView: Yn,
  setCenter: Yn,
  fitBounds: Yn,
  project: (e) => e,
  screenToFlowCoordinate: (e) => e,
  flowToScreenCoordinate: (e) => e,
  setViewport: Yn,
  setTransform: Yn,
  getViewport: () => ({ x: 0, y: 0, zoom: 1 }),
  getTransform: () => ({ x: 0, y: 0, zoom: 1 }),
  viewportInitialized: !1
};
function vS(e) {
  function t(r, i) {
    return new Promise((a) => {
      e.d3Selection && e.d3Zoom ? e.d3Zoom.interpolate((i == null ? void 0 : i.interpolate) === "linear" ? Oi : Ba).scaleBy(
        ms(e.d3Selection, i == null ? void 0 : i.duration, i == null ? void 0 : i.ease, () => {
          a(!0);
        }),
        r
      ) : a(!1);
    });
  }
  function n(r, i, a, o) {
    return new Promise((s) => {
      var u;
      const { x: l, y: c } = mh({ x: -r, y: -i }, e.translateExtent), f = ni.translate(-l, -c).scale(a);
      e.d3Selection && e.d3Zoom ? (u = e.d3Zoom) == null || u.interpolate((o == null ? void 0 : o.interpolate) === "linear" ? Oi : Ba).transform(
        ms(e.d3Selection, o == null ? void 0 : o.duration, o == null ? void 0 : o.ease, () => {
          s(!0);
        }),
        f
      ) : s(!1);
    });
  }
  return Re(() => e.d3Zoom && e.d3Selection && e.dimensions.width && e.dimensions.height ? {
    viewportInitialized: !0,
    // todo: allow passing scale as option
    zoomIn: (i) => t(1.2, i),
    zoomOut: (i) => t(1 / 1.2, i),
    zoomTo: (i, a) => new Promise((o) => {
      e.d3Selection && e.d3Zoom ? e.d3Zoom.interpolate((a == null ? void 0 : a.interpolate) === "linear" ? Oi : Ba).scaleTo(
        ms(e.d3Selection, a == null ? void 0 : a.duration, a == null ? void 0 : a.ease, () => {
          o(!0);
        }),
        i
      ) : o(!1);
    }),
    setViewport: (i, a) => n(i.x, i.y, i.zoom, a),
    setTransform: (i, a) => n(i.x, i.y, i.zoom, a),
    getViewport: () => ({
      x: e.viewport.x,
      y: e.viewport.y,
      zoom: e.viewport.zoom
    }),
    getTransform: () => ({
      x: e.viewport.x,
      y: e.viewport.y,
      zoom: e.viewport.zoom
    }),
    fitView: (i = {
      padding: Fa,
      includeHiddenNodes: !1,
      duration: 0
    }) => {
      var a, o;
      const s = [];
      for (const h of e.nodes)
        h.dimensions.width && h.dimensions.height && ((i == null ? void 0 : i.includeHiddenNodes) || !h.hidden) && (!((a = i.nodes) != null && a.length) || (o = i.nodes) != null && o.length && i.nodes.includes(h.id)) && s.push(h);
      if (!s.length)
        return Promise.resolve(!1);
      const u = Nl(s), { x: l, y: c, zoom: f } = f0(
        u,
        e.dimensions.width,
        e.dimensions.height,
        i.minZoom ?? e.minZoom,
        i.maxZoom ?? e.maxZoom,
        i.padding ?? Fa
      );
      return n(l, c, f, i);
    },
    setCenter: (i, a, o) => {
      const s = typeof (o == null ? void 0 : o.zoom) < "u" ? o.zoom : e.maxZoom, u = e.dimensions.width / 2 - i * s, l = e.dimensions.height / 2 - a * s;
      return n(u, l, s, o);
    },
    fitBounds: (i, a = { padding: Fa }) => {
      const { x: o, y: s, zoom: u } = f0(
        i,
        e.dimensions.width,
        e.dimensions.height,
        e.minZoom,
        e.maxZoom,
        a.padding ?? Fa
      );
      return n(o, s, u, a);
    },
    project: (i) => Yi(i, e.viewport, e.snapToGrid, e.snapGrid),
    screenToFlowCoordinate: (i) => {
      if (e.vueFlowRef) {
        const { x: a, y: o } = e.vueFlowRef.getBoundingClientRect(), s = {
          x: i.x - a,
          y: i.y - o
        };
        return Yi(s, e.viewport, e.snapToGrid, e.snapGrid);
      }
      return { x: 0, y: 0 };
    },
    flowToScreenCoordinate: (i) => {
      if (e.vueFlowRef) {
        const { x: a, y: o } = e.vueFlowRef.getBoundingClientRect(), s = {
          x: i.x + a,
          y: i.y + o
        };
        return Xi(s, e.viewport);
      }
      return { x: 0, y: 0 };
    }
  } : dS);
}
function ms(e, t = 0, n = hS, r = () => {
}) {
  const i = typeof t == "number" && t > 0;
  return i || r(), i ? e.transition().duration(t).ease(n).on("end", r) : e;
}
function pS(e, t, n) {
  const r = Q0(!0);
  return r.run(() => {
    const i = () => {
      r.run(() => {
        let v, g, x = !!(n.nodes.value.length || n.edges.value.length);
        v = zr([e.modelValue, () => {
          var y, m;
          return (m = (y = e.modelValue) == null ? void 0 : y.value) == null ? void 0 : m.length;
        }], ([y]) => {
          y && Array.isArray(y) && (g == null || g.pause(), n.setElements(y), !g && !x && y.length ? x = !0 : g == null || g.resume());
        }), g = zr(
          [n.nodes, n.edges, () => n.edges.value.length, () => n.nodes.value.length],
          ([y, m]) => {
            var T;
            (T = e.modelValue) != null && T.value && Array.isArray(e.modelValue.value) && (v == null || v.pause(), e.modelValue.value = [...y, ...m], Pn(() => {
              v == null || v.resume();
            }));
          },
          { immediate: x }
        ), Ra(() => {
          v == null || v.stop(), g == null || g.stop();
        });
      });
    }, a = () => {
      r.run(() => {
        let v, g, x = !!n.nodes.value.length;
        v = zr([e.nodes, () => {
          var y, m;
          return (m = (y = e.nodes) == null ? void 0 : y.value) == null ? void 0 : m.length;
        }], ([y]) => {
          y && Array.isArray(y) && (g == null || g.pause(), n.setNodes(y), !g && !x && y.length ? x = !0 : g == null || g.resume());
        }), g = zr(
          [n.nodes, () => n.nodes.value.length],
          ([y]) => {
            var m;
            (m = e.nodes) != null && m.value && Array.isArray(e.nodes.value) && (v == null || v.pause(), e.nodes.value = [...y], Pn(() => {
              v == null || v.resume();
            }));
          },
          { immediate: x }
        ), Ra(() => {
          v == null || v.stop(), g == null || g.stop();
        });
      });
    }, o = () => {
      r.run(() => {
        let v, g, x = !!n.edges.value.length;
        v = zr([e.edges, () => {
          var y, m;
          return (m = (y = e.edges) == null ? void 0 : y.value) == null ? void 0 : m.length;
        }], ([y]) => {
          y && Array.isArray(y) && (g == null || g.pause(), n.setEdges(y), !g && !x && y.length ? x = !0 : g == null || g.resume());
        }), g = zr(
          [n.edges, () => n.edges.value.length],
          ([y]) => {
            var m;
            (m = e.edges) != null && m.value && Array.isArray(e.edges.value) && (v == null || v.pause(), e.edges.value = [...y], Pn(() => {
              v == null || v.resume();
            }));
          },
          { immediate: x }
        ), Ra(() => {
          v == null || v.stop(), g == null || g.stop();
        });
      });
    }, s = () => {
      r.run(() => {
        tt(
          () => t.maxZoom,
          () => {
            t.maxZoom && dt(t.maxZoom) && n.setMaxZoom(t.maxZoom);
          },
          {
            immediate: !0
          }
        );
      });
    }, u = () => {
      r.run(() => {
        tt(
          () => t.minZoom,
          () => {
            t.minZoom && dt(t.minZoom) && n.setMinZoom(t.minZoom);
          },
          { immediate: !0 }
        );
      });
    }, l = () => {
      r.run(() => {
        tt(
          () => t.translateExtent,
          () => {
            t.translateExtent && dt(t.translateExtent) && n.setTranslateExtent(t.translateExtent);
          },
          {
            immediate: !0
          }
        );
      });
    }, c = () => {
      r.run(() => {
        tt(
          () => t.nodeExtent,
          () => {
            t.nodeExtent && dt(t.nodeExtent) && n.setNodeExtent(t.nodeExtent);
          },
          {
            immediate: !0
          }
        );
      });
    }, f = () => {
      r.run(() => {
        tt(
          () => t.applyDefault,
          () => {
            dt(t.applyDefault) && (n.applyDefault.value = t.applyDefault);
          },
          {
            immediate: !0
          }
        );
      });
    }, h = () => {
      r.run(() => {
        const v = async (g) => {
          let x = g;
          typeof t.autoConnect == "function" && (x = await t.autoConnect(g)), x !== !1 && n.addEdges([x]);
        };
        tt(
          () => t.autoConnect,
          () => {
            dt(t.autoConnect) && (n.autoConnect.value = t.autoConnect);
          },
          { immediate: !0 }
        ), tt(
          n.autoConnect,
          (g, x, y) => {
            g ? n.onConnect(v) : n.hooks.value.connect.off(v), y(() => {
              n.hooks.value.connect.off(v);
            });
          },
          { immediate: !0 }
        );
      });
    }, d = () => {
      const v = [
        "id",
        "modelValue",
        "translateExtent",
        "nodeExtent",
        "edges",
        "nodes",
        "maxZoom",
        "minZoom",
        "applyDefault",
        "autoConnect"
      ];
      for (const g of Object.keys(t)) {
        const x = g;
        if (!v.includes(x)) {
          const y = Ye(() => t[x]), m = n[x];
          qs(m) && r.run(() => {
            tt(
              y,
              (T) => {
                dt(T) && (m.value = T);
              },
              { immediate: !0 }
            );
          });
        }
      }
    };
    (() => {
      i(), a(), o(), u(), s(), l(), c(), f(), h(), d();
    })();
  }), () => r.stop();
}
function gS() {
  return {
    edgesChange: ke(),
    nodesChange: ke(),
    nodeDoubleClick: ke(),
    nodeClick: ke(),
    nodeMouseEnter: ke(),
    nodeMouseMove: ke(),
    nodeMouseLeave: ke(),
    nodeContextMenu: ke(),
    nodeDragStart: ke(),
    nodeDrag: ke(),
    nodeDragStop: ke(),
    nodesInitialized: ke(),
    miniMapNodeClick: ke(),
    miniMapNodeDoubleClick: ke(),
    miniMapNodeMouseEnter: ke(),
    miniMapNodeMouseMove: ke(),
    miniMapNodeMouseLeave: ke(),
    connect: ke(),
    connectStart: ke(),
    connectEnd: ke(),
    clickConnectStart: ke(),
    clickConnectEnd: ke(),
    paneReady: ke(),
    init: ke(),
    move: ke(),
    moveStart: ke(),
    moveEnd: ke(),
    selectionDragStart: ke(),
    selectionDrag: ke(),
    selectionDragStop: ke(),
    selectionContextMenu: ke(),
    selectionStart: ke(),
    selectionEnd: ke(),
    viewportChangeStart: ke(),
    viewportChange: ke(),
    viewportChangeEnd: ke(),
    paneScroll: ke(),
    paneClick: ke(),
    paneContextMenu: ke(),
    paneMouseEnter: ke(),
    paneMouseMove: ke(),
    paneMouseLeave: ke(),
    edgeContextMenu: ke(),
    edgeMouseEnter: ke(),
    edgeMouseMove: ke(),
    edgeMouseLeave: ke(),
    edgeDoubleClick: ke(),
    edgeClick: ke(),
    edgeUpdateStart: ke(),
    edgeUpdate: ke(),
    edgeUpdateEnd: ke(),
    updateNodeInternals: ke(),
    error: ke((e) => la(e.message))
  };
}
function mS(e, t) {
  const n = oi();
  Rd(() => {
    for (const [i, a] of Object.entries(t.value)) {
      const o = (s) => {
        e(i, s);
      };
      a.setEmitter(o), zi(a.removeEmitter), a.setHasEmitListeners(() => r(i)), zi(a.removeHasEmitListeners);
    }
  });
  function r(i) {
    var a;
    const o = xS(i);
    return !!((a = n == null ? void 0 : n.vnode.props) == null ? void 0 : a[o]);
  }
}
function xS(e) {
  const [t, ...n] = e.split(":");
  return `on${t.replace(/(?:^|-)(\w)/g, (i, a) => a.toUpperCase())}${n.length ? `:${n.join(":")}` : ""}`;
}
function Ph() {
  return {
    vueFlowRef: null,
    viewportRef: null,
    nodes: [],
    edges: [],
    connectionLookup: /* @__PURE__ */ new Map(),
    nodeTypes: {},
    edgeTypes: {},
    initialized: !1,
    dimensions: {
      width: 0,
      height: 0
    },
    viewport: { x: 0, y: 0, zoom: 1 },
    d3Zoom: null,
    d3Selection: null,
    d3ZoomHandler: null,
    minZoom: 0.5,
    maxZoom: 2,
    translateExtent: [
      [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
      [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
    ],
    nodeExtent: [
      [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
      [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
    ],
    selectionMode: Cl.Full,
    paneDragging: !1,
    preventScrolling: !0,
    zoomOnScroll: !0,
    zoomOnPinch: !0,
    zoomOnDoubleClick: !0,
    panOnScroll: !1,
    panOnScrollSpeed: 0.5,
    panOnScrollMode: Di.Free,
    paneClickDistance: 0,
    panOnDrag: !0,
    edgeUpdaterRadius: 10,
    onlyRenderVisibleElements: !1,
    defaultViewport: { x: 0, y: 0, zoom: 1 },
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    defaultMarkerColor: "#b1b1b7",
    connectionLineStyle: {},
    connectionLineType: null,
    connectionLineOptions: {
      type: fr.Bezier,
      style: {}
    },
    connectionMode: ar.Loose,
    connectionStartHandle: null,
    connectionEndHandle: null,
    connectionClickStartHandle: null,
    connectionPosition: { x: Number.NaN, y: Number.NaN },
    connectionRadius: 20,
    connectOnClick: !0,
    connectionStatus: null,
    isValidConnection: null,
    snapGrid: [15, 15],
    snapToGrid: !1,
    edgesUpdatable: !1,
    edgesFocusable: !0,
    nodesFocusable: !0,
    nodesConnectable: !0,
    nodesDraggable: !0,
    nodeDragThreshold: 1,
    elementsSelectable: !0,
    selectNodesOnDrag: !0,
    multiSelectionActive: !1,
    selectionKeyCode: "Shift",
    multiSelectionKeyCode: Zi() ? "Meta" : "Control",
    zoomActivationKeyCode: Zi() ? "Meta" : "Control",
    deleteKeyCode: "Backspace",
    panActivationKeyCode: "Space",
    hooks: gS(),
    applyDefault: !0,
    autoConnect: !1,
    fitViewOnInit: !1,
    fitViewOnInitDone: !1,
    noDragClassName: "nodrag",
    noWheelClassName: "nowheel",
    noPanClassName: "nopan",
    defaultEdgeOptions: void 0,
    elevateEdgesOnSelect: !1,
    elevateNodesOnSelect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnConnect: !0,
    autoPanSpeed: 15,
    disableKeyboardA11y: !1,
    ariaLiveMessage: ""
  };
}
const _S = [
  "id",
  "vueFlowRef",
  "viewportRef",
  "initialized",
  "modelValue",
  "nodes",
  "edges",
  "maxZoom",
  "minZoom",
  "translateExtent",
  "hooks",
  "defaultEdgeOptions"
];
function wS(e, t, n) {
  const r = vS(e), i = (F) => {
    const M = F ?? [];
    e.hooks.updateNodeInternals.trigger(M);
  }, a = (F) => RT(F, e.nodes, e.edges), o = (F) => MT(F, e.nodes, e.edges), s = (F) => hr(F, e.edges), u = ({ id: F, type: M, nodeId: D }) => {
    var B;
    const q = F ? `-${M}-${F}` : `-${M}`;
    return Array.from(((B = e.connectionLookup.get(`${D}${q}`)) == null ? void 0 : B.values()) ?? []);
  }, l = (F) => {
    if (F)
      return t.value.get(F);
  }, c = (F) => {
    if (F)
      return n.value.get(F);
  }, f = (F, M, D) => {
    var B, q;
    const Ee = [];
    for (const Ae of F) {
      const ne = {
        id: Ae.id,
        type: "position",
        dragging: D,
        from: Ae.from
      };
      if (M && (ne.position = Ae.position, Ae.parentNode)) {
        const Ne = l(Ae.parentNode);
        ne.position = {
          x: ne.position.x - (((B = Ne == null ? void 0 : Ne.computedPosition) == null ? void 0 : B.x) ?? 0),
          y: ne.position.y - (((q = Ne == null ? void 0 : Ne.computedPosition) == null ? void 0 : q.y) ?? 0)
        };
      }
      Ee.push(ne);
    }
    Ee != null && Ee.length && e.hooks.nodesChange.trigger(Ee);
  }, h = (F) => {
    if (!e.vueFlowRef)
      return;
    const M = e.vueFlowRef.querySelector(".vue-flow__transformationpane");
    if (!M)
      return;
    const D = window.getComputedStyle(M), { m22: B } = new window.DOMMatrixReadOnly(D.transform), q = [];
    for (const Ee of F) {
      const Ae = Ee, ne = l(Ae.id);
      if (ne) {
        const Ne = $o(Ae.nodeElement);
        if (!!(Ne.width && Ne.height && (ne.dimensions.width !== Ne.width || ne.dimensions.height !== Ne.height || Ae.forceUpdate))) {
          const Pe = Ae.nodeElement.getBoundingClientRect();
          ne.dimensions = Ne, ne.handleBounds.source = E0("source", Ae.nodeElement, Pe, B, ne.id), ne.handleBounds.target = E0("target", Ae.nodeElement, Pe, B, ne.id), q.push({
            id: ne.id,
            type: "dimensions",
            dimensions: Ne
          });
        }
      }
    }
    !e.fitViewOnInitDone && e.fitViewOnInit && r.value.fitView().then(() => {
      e.fitViewOnInitDone = !0;
    }), q.length && e.hooks.nodesChange.trigger(q);
  }, d = (F, M) => {
    const D = /* @__PURE__ */ new Set(), B = /* @__PURE__ */ new Set();
    for (const Ae of F)
      xr(Ae) ? D.add(Ae.id) : or(Ae) && B.add(Ae.id);
    const q = qn(t.value, D, !0), Ee = qn(n.value, B);
    if (e.multiSelectionActive) {
      for (const Ae of D)
        q.push(Kn(Ae, M));
      for (const Ae of B)
        Ee.push(Kn(Ae, M));
    }
    q.length && e.hooks.nodesChange.trigger(q), Ee.length && e.hooks.edgesChange.trigger(Ee);
  }, p = (F) => {
    if (e.multiSelectionActive) {
      const M = F.map((D) => Kn(D.id, !0));
      e.hooks.nodesChange.trigger(M);
      return;
    }
    e.hooks.nodesChange.trigger(qn(t.value, new Set(F.map((M) => M.id)), !0)), e.hooks.edgesChange.trigger(qn(n.value));
  }, v = (F) => {
    if (e.multiSelectionActive) {
      const M = F.map((D) => Kn(D.id, !0));
      e.hooks.edgesChange.trigger(M);
      return;
    }
    e.hooks.edgesChange.trigger(qn(n.value, new Set(F.map((M) => M.id)))), e.hooks.nodesChange.trigger(qn(t.value, /* @__PURE__ */ new Set(), !0));
  }, g = (F) => {
    d(F, !0);
  }, x = (F) => {
    const D = (F || e.nodes).map((B) => (B.selected = !1, Kn(B.id, !1)));
    e.hooks.nodesChange.trigger(D);
  }, y = (F) => {
    const D = (F || e.edges).map((B) => (B.selected = !1, Kn(B.id, !1)));
    e.hooks.edgesChange.trigger(D);
  }, m = (F) => {
    if (!F || !F.length)
      return d([], !1);
    const M = F.reduce(
      (D, B) => {
        const q = Kn(B.id, !1);
        return xr(B) ? D.nodes.push(q) : D.edges.push(q), D;
      },
      { nodes: [], edges: [] }
    );
    M.nodes.length && e.hooks.nodesChange.trigger(M.nodes), M.edges.length && e.hooks.edgesChange.trigger(M.edges);
  }, T = (F) => {
    var M;
    (M = e.d3Zoom) == null || M.scaleExtent([F, e.maxZoom]), e.minZoom = F;
  }, Y = (F) => {
    var M;
    (M = e.d3Zoom) == null || M.scaleExtent([e.minZoom, F]), e.maxZoom = F;
  }, Q = (F) => {
    var M;
    (M = e.d3Zoom) == null || M.translateExtent(F), e.translateExtent = F;
  }, R = (F) => {
    e.nodeExtent = F, i();
  }, V = (F) => {
    var M;
    (M = e.d3Zoom) == null || M.clickDistance(F);
  }, P = (F) => {
    e.nodesDraggable = F, e.nodesConnectable = F, e.elementsSelectable = F;
  }, H = (F) => {
    const M = F instanceof Function ? F(e.nodes) : F;
    !e.initialized && !M.length || (e.nodes = T0(M, l, e.hooks.error.trigger));
  }, G = (F) => {
    const M = F instanceof Function ? F(e.edges) : F;
    if (!e.initialized && !M.length)
      return;
    const D = gs(
      M,
      e.isValidConnection,
      l,
      c,
      e.hooks.error.trigger,
      e.defaultEdgeOptions,
      e.nodes,
      e.edges
    );
    ps(e.connectionLookup, n.value, D), e.edges = D;
  }, C = (F) => {
    const M = F instanceof Function ? F([...e.nodes, ...e.edges]) : F;
    !e.initialized && !M.length || (H(M.filter(xr)), G(M.filter(or)));
  }, se = (F) => {
    let M = F instanceof Function ? F(e.nodes) : F;
    M = Array.isArray(M) ? M : [M];
    const D = T0(M, l, e.hooks.error.trigger), B = [];
    for (const q of D)
      B.push(v0(q));
    B.length && e.hooks.nodesChange.trigger(B);
  }, w = (F) => {
    let M = F instanceof Function ? F(e.edges) : F;
    M = Array.isArray(M) ? M : [M];
    const D = gs(
      M,
      e.isValidConnection,
      l,
      c,
      e.hooks.error.trigger,
      e.defaultEdgeOptions,
      e.nodes,
      e.edges
    ), B = [];
    for (const q of D)
      B.push(v0(q));
    B.length && e.hooks.edgesChange.trigger(B);
  }, U = (F, M = !0, D = !1) => {
    const B = F instanceof Function ? F(e.nodes) : F, q = Array.isArray(B) ? B : [B], Ee = [], Ae = [];
    function ne(be) {
      const Pe = s(be);
      for (const We of Pe)
        (!dt(We.deletable) || We.deletable) && Ae.push(g0(We.id, We.source, We.target, We.sourceHandle, We.targetHandle));
    }
    function Ne(be) {
      const Pe = [];
      for (const We of e.nodes)
        We.parentNode === be && Pe.push(We);
      if (Pe.length) {
        for (const We of Pe)
          Ee.push(p0(We.id));
        M && ne(Pe);
        for (const We of Pe)
          Ne(We.id);
      }
    }
    for (const be of q) {
      const Pe = typeof be == "string" ? l(be) : be;
      Pe && (dt(Pe.deletable) && !Pe.deletable || (Ee.push(p0(Pe.id)), M && ne([Pe]), D && Ne(Pe.id)));
    }
    Ae.length && e.hooks.edgesChange.trigger(Ae), Ee.length && e.hooks.nodesChange.trigger(Ee);
  }, I = (F) => {
    const M = F instanceof Function ? F(e.edges) : F, D = Array.isArray(M) ? M : [M], B = [];
    for (const q of D) {
      const Ee = typeof q == "string" ? c(q) : q;
      Ee && (dt(Ee.deletable) && !Ee.deletable || B.push(
        g0(
          typeof q == "string" ? q : q.id,
          Ee.source,
          Ee.target,
          Ee.sourceHandle,
          Ee.targetHandle
        )
      ));
    }
    e.hooks.edgesChange.trigger(B);
  }, j = (F, M, D = !0) => {
    const B = c(F.id);
    if (!B)
      return !1;
    const q = e.edges.indexOf(B), Ee = rS(F, M, B, D, e.hooks.error.trigger);
    if (Ee) {
      const [Ae] = gs(
        [Ee],
        e.isValidConnection,
        l,
        c,
        e.hooks.error.trigger,
        e.defaultEdgeOptions,
        e.nodes,
        e.edges
      );
      return e.edges = e.edges.map((ne, Ne) => Ne === q ? Ae : ne), ps(e.connectionLookup, n.value, [Ae]), Ae;
    }
    return !1;
  }, K = (F, M, D = { replace: !1 }) => {
    const B = c(F);
    if (!B)
      return;
    const q = typeof M == "function" ? M(B) : M;
    B.data = D.replace ? q : { ...B.data, ...q };
  }, ee = (F) => d0(F, e.nodes), J = (F) => {
    const M = d0(F, e.edges);
    return ps(e.connectionLookup, n.value, M), M;
  }, de = (F, M, D = { replace: !1 }) => {
    const B = l(F);
    if (!B)
      return;
    const q = typeof M == "function" ? M(B) : M;
    D.replace ? e.nodes.splice(e.nodes.indexOf(B), 1, q) : Object.assign(B, q);
  }, A = (F, M, D = { replace: !1 }) => {
    const B = l(F);
    if (!B)
      return;
    const q = typeof M == "function" ? M(B) : M;
    B.data = D.replace ? q : { ...B.data, ...q };
  }, z = (F, M, D = !1) => {
    D ? e.connectionClickStartHandle = F : e.connectionStartHandle = F, e.connectionEndHandle = null, e.connectionStatus = null, M && (e.connectionPosition = M);
  }, L = (F, M = null, D = null) => {
    e.connectionStartHandle && (e.connectionPosition = F, e.connectionEndHandle = M, e.connectionStatus = D);
  }, O = (F, M) => {
    e.connectionPosition = { x: Number.NaN, y: Number.NaN }, e.connectionEndHandle = null, e.connectionStatus = null, M ? e.connectionClickStartHandle = null : e.connectionStartHandle = null;
  }, X = (F) => {
    const M = DT(F), D = M ? null : Ei(F) ? F : l(F.id);
    return !M && !D ? [null, null, M] : [M ? F : mo(D), D, M];
  }, le = (F, M = !0, D = e.nodes) => {
    const [B, q, Ee] = X(F);
    if (!B)
      return [];
    const Ae = [];
    for (const ne of D || e.nodes) {
      if (!Ee && (ne.id === q.id || !ne.computedPosition))
        continue;
      const Ne = mo(ne), be = xo(Ne, B);
      (M && be > 0 || be >= Ne.width * Ne.height || be >= Number(B.width) * Number(B.height)) && Ae.push(ne);
    }
    return Ae;
  }, pe = (F, M, D = !0) => {
    const [B] = X(F);
    if (!B)
      return !1;
    const q = xo(B, M);
    return D && q > 0 || q >= Number(B.width) * Number(B.height);
  }, me = (F) => {
    const { viewport: M, dimensions: D, d3Zoom: B, d3Selection: q, translateExtent: Ee } = e;
    if (!B || !q || !F.x && !F.y)
      return !1;
    const Ae = ni.translate(M.x + F.x, M.y + F.y).scale(M.zoom), ne = [
      [0, 0],
      [D.width, D.height]
    ], Ne = B.constrain()(Ae, ne, Ee), be = e.viewport.x !== Ne.x || e.viewport.y !== Ne.y || e.viewport.zoom !== Ne.k;
    return B.transform(q, Ne), be;
  }, he = (F) => {
    const M = F instanceof Function ? F(e) : F, D = [
      "d3Zoom",
      "d3Selection",
      "d3ZoomHandler",
      "viewportRef",
      "vueFlowRef",
      "dimensions",
      "hooks"
    ];
    dt(M.defaultEdgeOptions) && (e.defaultEdgeOptions = M.defaultEdgeOptions);
    const B = M.modelValue || M.nodes || M.edges ? [] : void 0;
    B && (M.modelValue && B.push(...M.modelValue), M.nodes && B.push(...M.nodes), M.edges && B.push(...M.edges), C(B));
    const q = () => {
      dt(M.maxZoom) && Y(M.maxZoom), dt(M.minZoom) && T(M.minZoom), dt(M.translateExtent) && Q(M.translateExtent);
    };
    for (const Ee of Object.keys(M)) {
      const Ae = Ee, ne = M[Ae];
      ![..._S, ...D].includes(Ae) && dt(ne) && (e[Ae] = ne);
    }
    Ns(() => e.d3Zoom).not.toBeNull().then(q), e.initialized || (e.initialized = !0);
  };
  return {
    updateNodePositions: f,
    updateNodeDimensions: h,
    setElements: C,
    setNodes: H,
    setEdges: G,
    addNodes: se,
    addEdges: w,
    removeNodes: U,
    removeEdges: I,
    findNode: l,
    findEdge: c,
    updateEdge: j,
    updateEdgeData: K,
    updateNode: de,
    updateNodeData: A,
    applyEdgeChanges: J,
    applyNodeChanges: ee,
    addSelectedElements: g,
    addSelectedNodes: p,
    addSelectedEdges: v,
    setMinZoom: T,
    setMaxZoom: Y,
    setTranslateExtent: Q,
    setNodeExtent: R,
    setPaneClickDistance: V,
    removeSelectedElements: m,
    removeSelectedNodes: x,
    removeSelectedEdges: y,
    startConnection: z,
    updateConnection: L,
    endConnection: O,
    setInteractive: P,
    setState: he,
    getIntersectingNodes: le,
    getIncomers: a,
    getOutgoers: o,
    getConnectedEdges: s,
    getHandleConnections: u,
    isNodeIntersecting: pe,
    panBy: me,
    fitView: (F) => r.value.fitView(F),
    zoomIn: (F) => r.value.zoomIn(F),
    zoomOut: (F) => r.value.zoomOut(F),
    zoomTo: (F, M) => r.value.zoomTo(F, M),
    setViewport: (F, M) => r.value.setViewport(F, M),
    setTransform: (F, M) => r.value.setTransform(F, M),
    getViewport: () => r.value.getViewport(),
    getTransform: () => r.value.getTransform(),
    setCenter: (F, M, D) => r.value.setCenter(F, M, D),
    fitBounds: (F, M) => r.value.fitBounds(F, M),
    project: (F) => r.value.project(F),
    screenToFlowCoordinate: (F) => r.value.screenToFlowCoordinate(F),
    flowToScreenCoordinate: (F) => r.value.flowToScreenCoordinate(F),
    toObject: () => {
      const F = [], M = [];
      for (const D of e.nodes) {
        const {
          computedPosition: B,
          handleBounds: q,
          selected: Ee,
          dimensions: Ae,
          isParent: ne,
          resizing: Ne,
          dragging: be,
          events: Pe,
          ...We
        } = D;
        F.push(We);
      }
      for (const D of e.edges) {
        const { selected: B, sourceNode: q, targetNode: Ee, events: Ae, ...ne } = D;
        M.push(ne);
      }
      return JSON.parse(
        JSON.stringify({
          nodes: F,
          edges: M,
          position: [e.viewport.x, e.viewport.y],
          zoom: e.viewport.zoom,
          viewport: e.viewport
        })
      );
    },
    fromObject: (F) => new Promise((M) => {
      const { nodes: D, edges: B, position: q, zoom: Ee, viewport: Ae } = F;
      D && H(D), B && G(B);
      const [ne, Ne] = Ae != null && Ae.x && (Ae != null && Ae.y) ? [Ae.x, Ae.y] : q ?? [null, null];
      if (ne && Ne) {
        const be = (Ae == null ? void 0 : Ae.zoom) || Ee || e.viewport.zoom;
        return Ns(() => r.value.viewportInitialized).toBe(!0).then(() => {
          r.value.setViewport({
            x: ne,
            y: Ne,
            zoom: be
          }).then(() => {
            M(!0);
          });
        });
      } else
        M(!0);
    }),
    updateNodeInternals: i,
    viewportHelper: r,
    $reset: () => {
      const F = Ph();
      if (e.edges = [], e.nodes = [], e.d3Zoom && e.d3Selection) {
        const M = ni.translate(F.defaultViewport.x ?? 0, F.defaultViewport.y ?? 0).scale(Cr(F.defaultViewport.zoom ?? 1, F.minZoom, F.maxZoom)), D = e.viewportRef.getBoundingClientRect(), B = [
          [0, 0],
          [D.width, D.height]
        ], q = e.d3Zoom.constrain()(M, B, F.translateExtent);
        e.d3Zoom.transform(e.d3Selection, q);
      }
      he(F);
    },
    $destroy: () => {
    }
  };
}
const yS = ["data-id", "data-handleid", "data-nodeid", "data-handlepos"], ES = {
  name: "Handle",
  compatConfig: { MODE: 3 }
}, wo = /* @__PURE__ */ Ze({
  ...ES,
  props: {
    id: { default: null },
    type: {},
    position: { default: () => De.Top },
    isValidConnection: { type: Function },
    connectable: { type: [Boolean, Number, String, Function], default: void 0 },
    connectableStart: { type: Boolean, default: !0 },
    connectableEnd: { type: Boolean, default: !0 }
  },
  setup(e, { expose: t }) {
    const n = $d(e, ["position", "connectable", "connectableStart", "connectableEnd", "id"]), r = Ye(() => n.type ?? "source"), i = Ye(() => n.isValidConnection ?? null), {
      id: a,
      connectionStartHandle: o,
      connectionClickStartHandle: s,
      connectionEndHandle: u,
      vueFlowRef: l,
      nodesConnectable: c,
      noDragClassName: f,
      noPanClassName: h
    } = nt(), { id: d, node: p, nodeEl: v, connectedEdges: g } = Mh(), x = $e(), y = Ye(() => typeof e.connectableStart < "u" ? e.connectableStart : !0), m = Ye(() => typeof e.connectableEnd < "u" ? e.connectableEnd : !0), T = Ye(
      () => {
        var G, C, se, w, U, I;
        return ((G = o.value) == null ? void 0 : G.nodeId) === d && ((C = o.value) == null ? void 0 : C.id) === e.id && ((se = o.value) == null ? void 0 : se.type) === r.value || ((w = u.value) == null ? void 0 : w.nodeId) === d && ((U = u.value) == null ? void 0 : U.id) === e.id && ((I = u.value) == null ? void 0 : I.type) === r.value;
      }
    ), Y = Ye(
      () => {
        var G, C, se;
        return ((G = s.value) == null ? void 0 : G.nodeId) === d && ((C = s.value) == null ? void 0 : C.id) === e.id && ((se = s.value) == null ? void 0 : se.type) === r.value;
      }
    ), { handlePointerDown: Q, handleClick: R } = bh({
      nodeId: d,
      handleId: e.id,
      isValidConnection: i,
      type: r
    }), V = Re(() => typeof e.connectable == "string" && e.connectable === "single" ? !g.value.some((G) => {
      const C = G[`${r.value}Handle`];
      return G[r.value] !== d ? !1 : C ? C === e.id : !0;
    }) : typeof e.connectable == "number" ? g.value.filter((G) => {
      const C = G[`${r.value}Handle`];
      return G[r.value] !== d ? !1 : C ? C === e.id : !0;
    }).length < e.connectable : typeof e.connectable == "function" ? e.connectable(p, g.value) : dt(e.connectable) ? e.connectable : c.value);
    Wn(() => {
      var G;
      if (!p.dimensions.width || !p.dimensions.height)
        return;
      const C = (G = p.handleBounds[r.value]) == null ? void 0 : G.find((ee) => ee.id === e.id);
      if (!l.value || C)
        return;
      const se = l.value.querySelector(".vue-flow__transformationpane");
      if (!v.value || !x.value || !se || !e.id)
        return;
      const w = v.value.getBoundingClientRect(), U = x.value.getBoundingClientRect(), I = window.getComputedStyle(se), { m22: j } = new window.DOMMatrixReadOnly(I.transform), K = {
        id: e.id,
        position: e.position,
        x: (U.left - w.left) / j,
        y: (U.top - w.top) / j,
        type: r.value,
        nodeId: d,
        ...$o(x.value)
      };
      p.handleBounds[r.value] = [...p.handleBounds[r.value] ?? [], K];
    });
    function P(G) {
      const C = kl(G);
      V.value && y.value && (C && G.button === 0 || !C) && Q(G);
    }
    function H(G) {
      !d || !s.value && !y.value || V.value && R(G);
    }
    return t({
      handleClick: R,
      handlePointerDown: Q,
      onClick: H,
      onPointerDown: P
    }), (G, C) => (we(), Oe("div", {
      ref_key: "handle",
      ref: x,
      "data-id": `${W(a)}-${W(d)}-${e.id}-${r.value}`,
      "data-handleid": e.id,
      "data-nodeid": W(d),
      "data-handlepos": G.position,
      class: Sn(["vue-flow__handle", [
        `vue-flow__handle-${G.position}`,
        `vue-flow__handle-${e.id}`,
        W(f),
        W(h),
        r.value,
        {
          connectable: V.value,
          connecting: Y.value,
          connectablestart: y.value,
          connectableend: m.value,
          connectionindicator: V.value && (y.value && !T.value || m.value && T.value)
        }
      ]]),
      onMousedown: P,
      onTouchstartPassive: P,
      onClick: H
    }, [
      lt(G.$slots, "default", { id: G.id })
    ], 42, yS));
  }
}), Ho = function({
  sourcePosition: e = De.Bottom,
  targetPosition: t = De.Top,
  label: n,
  connectable: r = !0,
  isValidTargetPos: i,
  isValidSourcePos: a,
  data: o
}) {
  const s = o.label ?? n;
  return [
    Ke(wo, { type: "target", position: t, connectable: r, isValidConnection: i }),
    typeof s != "string" && s ? Ke(s) : Ke(ct, [s]),
    Ke(wo, { type: "source", position: e, connectable: r, isValidConnection: a })
  ];
};
Ho.props = ["sourcePosition", "targetPosition", "label", "isValidTargetPos", "isValidSourcePos", "connectable", "data"];
Ho.inheritAttrs = !1;
Ho.compatConfig = { MODE: 3 };
const TS = Ho, Vo = function({
  targetPosition: e = De.Top,
  label: t,
  connectable: n = !0,
  isValidTargetPos: r,
  data: i
}) {
  const a = i.label ?? t;
  return [
    Ke(wo, { type: "target", position: e, connectable: n, isValidConnection: r }),
    typeof a != "string" && a ? Ke(a) : Ke(ct, [a])
  ];
};
Vo.props = ["targetPosition", "label", "isValidTargetPos", "connectable", "data"];
Vo.inheritAttrs = !1;
Vo.compatConfig = { MODE: 3 };
const SS = Vo, Wo = function({
  sourcePosition: e = De.Bottom,
  label: t,
  connectable: n = !0,
  isValidSourcePos: r,
  data: i
}) {
  const a = i.label ?? t;
  return [
    typeof a != "string" && a ? Ke(a) : Ke(ct, [a]),
    Ke(wo, { type: "source", position: e, connectable: n, isValidConnection: r })
  ];
};
Wo.props = ["sourcePosition", "label", "isValidSourcePos", "connectable", "data"];
Wo.inheritAttrs = !1;
Wo.compatConfig = { MODE: 3 };
const AS = Wo, CS = ["transform"], NS = ["width", "height", "x", "y", "rx", "ry"], FS = ["y"], kS = {
  name: "EdgeText",
  compatConfig: { MODE: 3 }
}, IS = /* @__PURE__ */ Ze({
  ...kS,
  props: {
    x: {},
    y: {},
    label: {},
    labelStyle: { default: () => ({}) },
    labelShowBg: { type: Boolean, default: !0 },
    labelBgStyle: { default: () => ({}) },
    labelBgPadding: { default: () => [2, 4] },
    labelBgBorderRadius: { default: 2 }
  },
  setup(e) {
    const t = $e({ x: 0, y: 0, width: 0, height: 0 }), n = $e(null), r = Re(() => `translate(${e.x - t.value.width / 2} ${e.y - t.value.height / 2})`);
    Wn(i), tt([() => e.x, () => e.y, n, () => e.label], i);
    function i() {
      if (!n.value)
        return;
      const a = n.value.getBBox();
      (a.width !== t.value.width || a.height !== t.value.height) && (t.value = a);
    }
    return (a, o) => (we(), Oe("g", {
      transform: r.value,
      class: "vue-flow__edge-textwrapper"
    }, [
      a.labelShowBg ? (we(), Oe("rect", {
        key: 0,
        class: "vue-flow__edge-textbg",
        width: `${t.value.width + 2 * a.labelBgPadding[0]}px`,
        height: `${t.value.height + 2 * a.labelBgPadding[1]}px`,
        x: -a.labelBgPadding[0],
        y: -a.labelBgPadding[1],
        style: Yt(a.labelBgStyle),
        rx: a.labelBgBorderRadius,
        ry: a.labelBgBorderRadius
      }, null, 12, NS)) : ze("", !0),
      Le("text", Xa(a.$attrs, {
        ref_key: "el",
        ref: n,
        class: "vue-flow__edge-text",
        y: t.value.height / 2,
        dy: "0.3em",
        style: a.labelStyle
      }), [
        lt(a.$slots, "default", {}, () => [
          typeof a.label != "string" ? (we(), at(ur(a.label), { key: 0 })) : (we(), Oe(ct, { key: 1 }, [
            Be(Me(a.label), 1)
          ], 64))
        ])
      ], 16, FS)
    ], 8, CS));
  }
}), OS = ["id", "d", "marker-end", "marker-start"], DS = ["d", "stroke-width"], bS = {
  name: "BaseEdge",
  inheritAttrs: !1,
  compatConfig: { MODE: 3 }
}, Go = /* @__PURE__ */ Ze({
  ...bS,
  props: {
    id: {},
    labelX: {},
    labelY: {},
    path: {},
    label: {},
    markerStart: {},
    markerEnd: {},
    interactionWidth: { default: 20 },
    labelStyle: {},
    labelShowBg: { type: Boolean },
    labelBgStyle: {},
    labelBgPadding: {},
    labelBgBorderRadius: {}
  },
  setup(e, { expose: t }) {
    const n = $e(null), r = $e(null), i = $e(null), a = js();
    return t({
      pathEl: n,
      interactionEl: r,
      labelEl: i
    }), (o, s) => (we(), Oe(ct, null, [
      Le("path", Xa(W(a), {
        id: o.id,
        ref_key: "pathEl",
        ref: n,
        d: o.path,
        class: "vue-flow__edge-path",
        "marker-end": o.markerEnd,
        "marker-start": o.markerStart
      }), null, 16, OS),
      o.interactionWidth ? (we(), Oe("path", {
        key: 0,
        ref_key: "interactionEl",
        ref: r,
        fill: "none",
        d: o.path,
        "stroke-width": o.interactionWidth,
        "stroke-opacity": 0,
        class: "vue-flow__edge-interaction"
      }, null, 8, DS)) : ze("", !0),
      o.label && o.labelX && o.labelY ? (we(), at(IS, {
        key: 1,
        ref_key: "labelEl",
        ref: i,
        x: o.labelX,
        y: o.labelY,
        label: o.label,
        "label-show-bg": o.labelShowBg,
        "label-bg-style": o.labelBgStyle,
        "label-bg-padding": o.labelBgPadding,
        "label-bg-border-radius": o.labelBgBorderRadius,
        "label-style": o.labelStyle
      }, null, 8, ["x", "y", "label", "label-show-bg", "label-bg-style", "label-bg-padding", "label-bg-border-radius", "label-style"])) : ze("", !0)
    ], 64));
  }
});
function Lh({
  sourceX: e,
  sourceY: t,
  targetX: n,
  targetY: r
}) {
  const i = Math.abs(n - e) / 2, a = n < e ? n + i : n - i, o = Math.abs(r - t) / 2, s = r < t ? r + o : r - o;
  return [a, s, i, o];
}
function Bh({
  sourceX: e,
  sourceY: t,
  targetX: n,
  targetY: r,
  sourceControlX: i,
  sourceControlY: a,
  targetControlX: o,
  targetControlY: s
}) {
  const u = e * 0.125 + i * 0.375 + o * 0.375 + n * 0.125, l = t * 0.125 + a * 0.375 + s * 0.375 + r * 0.125, c = Math.abs(u - e), f = Math.abs(l - t);
  return [u, l, c, f];
}
function ka(e, t) {
  return e >= 0 ? 0.5 * e : t * 25 * Math.sqrt(-e);
}
function N0({ pos: e, x1: t, y1: n, x2: r, y2: i, c: a }) {
  let o, s;
  switch (e) {
    case De.Left:
      o = t - ka(t - r, a), s = n;
      break;
    case De.Right:
      o = t + ka(r - t, a), s = n;
      break;
    case De.Top:
      o = t, s = n - ka(n - i, a);
      break;
    case De.Bottom:
      o = t, s = n + ka(i - n, a);
      break;
  }
  return [o, s];
}
function $h(e) {
  const {
    sourceX: t,
    sourceY: n,
    sourcePosition: r = De.Bottom,
    targetX: i,
    targetY: a,
    targetPosition: o = De.Top,
    curvature: s = 0.25
  } = e, [u, l] = N0({
    pos: r,
    x1: t,
    y1: n,
    x2: i,
    y2: a,
    c: s
  }), [c, f] = N0({
    pos: o,
    x1: i,
    y1: a,
    x2: t,
    y2: n,
    c: s
  }), [h, d, p, v] = Bh({
    sourceX: t,
    sourceY: n,
    targetX: i,
    targetY: a,
    sourceControlX: u,
    sourceControlY: l,
    targetControlX: c,
    targetControlY: f
  });
  return [
    `M${t},${n} C${u},${l} ${c},${f} ${i},${a}`,
    h,
    d,
    p,
    v
  ];
}
function F0({ pos: e, x1: t, y1: n, x2: r, y2: i }) {
  let a, o;
  switch (e) {
    case De.Left:
    case De.Right:
      a = 0.5 * (t + r), o = n;
      break;
    case De.Top:
    case De.Bottom:
      a = t, o = 0.5 * (n + i);
      break;
  }
  return [a, o];
}
function Uh(e) {
  const {
    sourceX: t,
    sourceY: n,
    sourcePosition: r = De.Bottom,
    targetX: i,
    targetY: a,
    targetPosition: o = De.Top
  } = e, [s, u] = F0({
    pos: r,
    x1: t,
    y1: n,
    x2: i,
    y2: a
  }), [l, c] = F0({
    pos: o,
    x1: i,
    y1: a,
    x2: t,
    y2: n
  }), [f, h, d, p] = Bh({
    sourceX: t,
    sourceY: n,
    targetX: i,
    targetY: a,
    sourceControlX: s,
    sourceControlY: u,
    targetControlX: l,
    targetControlY: c
  });
  return [
    `M${t},${n} C${s},${u} ${l},${c} ${i},${a}`,
    f,
    h,
    d,
    p
  ];
}
const k0 = {
  [De.Left]: { x: -1, y: 0 },
  [De.Right]: { x: 1, y: 0 },
  [De.Top]: { x: 0, y: -1 },
  [De.Bottom]: { x: 0, y: 1 }
};
function MS({
  source: e,
  sourcePosition: t = De.Bottom,
  target: n
}) {
  return t === De.Left || t === De.Right ? e.x < n.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : e.y < n.y ? { x: 0, y: 1 } : { x: 0, y: -1 };
}
function I0(e, t) {
  return Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2);
}
function RS({
  source: e,
  sourcePosition: t = De.Bottom,
  target: n,
  targetPosition: r = De.Top,
  center: i,
  offset: a
}) {
  const o = k0[t], s = k0[r], u = { x: e.x + o.x * a, y: e.y + o.y * a }, l = { x: n.x + s.x * a, y: n.y + s.y * a }, c = MS({
    source: u,
    sourcePosition: t,
    target: l
  }), f = c.x !== 0 ? "x" : "y", h = c[f];
  let d, p, v;
  const g = { x: 0, y: 0 }, x = { x: 0, y: 0 }, [y, m, T, Y] = Lh({
    sourceX: e.x,
    sourceY: e.y,
    targetX: n.x,
    targetY: n.y
  });
  if (o[f] * s[f] === -1) {
    p = i.x ?? y, v = i.y ?? m;
    const R = [
      { x: p, y: u.y },
      { x: p, y: l.y }
    ], V = [
      { x: u.x, y: v },
      { x: l.x, y: v }
    ];
    o[f] === h ? d = f === "x" ? R : V : d = f === "x" ? V : R;
  } else {
    const R = [{ x: u.x, y: l.y }], V = [{ x: l.x, y: u.y }];
    if (f === "x" ? d = o.x === h ? V : R : d = o.y === h ? R : V, t === r) {
      const se = Math.abs(e[f] - n[f]);
      if (se <= a) {
        const w = Math.min(a - 1, a - se);
        o[f] === h ? g[f] = (u[f] > e[f] ? -1 : 1) * w : x[f] = (l[f] > n[f] ? -1 : 1) * w;
      }
    }
    if (t !== r) {
      const se = f === "x" ? "y" : "x", w = o[f] === s[se], U = u[se] > l[se], I = u[se] < l[se];
      (o[f] === 1 && (!w && U || w && I) || o[f] !== 1 && (!w && I || w && U)) && (d = f === "x" ? R : V);
    }
    const P = { x: u.x + g.x, y: u.y + g.y }, H = { x: l.x + x.x, y: l.y + x.y }, G = Math.max(Math.abs(P.x - d[0].x), Math.abs(H.x - d[0].x)), C = Math.max(Math.abs(P.y - d[0].y), Math.abs(H.y - d[0].y));
    G >= C ? (p = (P.x + H.x) / 2, v = d[0].y) : (p = d[0].x, v = (P.y + H.y) / 2);
  }
  return [[
    e,
    { x: u.x + g.x, y: u.y + g.y },
    ...d,
    { x: l.x + x.x, y: l.y + x.y },
    n
  ], p, v, T, Y];
}
function PS(e, t, n, r) {
  const i = Math.min(I0(e, t) / 2, I0(t, n) / 2, r), { x: a, y: o } = t;
  if (e.x === a && a === n.x || e.y === o && o === n.y)
    return `L${a} ${o}`;
  if (e.y === o) {
    const l = e.x < n.x ? -1 : 1, c = e.y < n.y ? 1 : -1;
    return `L ${a + i * l},${o}Q ${a},${o} ${a},${o + i * c}`;
  }
  const s = e.x < n.x ? 1 : -1, u = e.y < n.y ? -1 : 1;
  return `L ${a},${o + i * u}Q ${a},${o} ${a + i * s},${o}`;
}
function Us(e) {
  const {
    sourceX: t,
    sourceY: n,
    sourcePosition: r = De.Bottom,
    targetX: i,
    targetY: a,
    targetPosition: o = De.Top,
    borderRadius: s = 5,
    centerX: u,
    centerY: l,
    offset: c = 20
  } = e, [f, h, d, p, v] = RS({
    source: { x: t, y: n },
    sourcePosition: r,
    target: { x: i, y: a },
    targetPosition: o,
    center: { x: u, y: l },
    offset: c
  });
  return [f.reduce((x, y, m) => {
    let T;
    return m > 0 && m < f.length - 1 ? T = PS(f[m - 1], y, f[m + 1], s) : T = `${m === 0 ? "M" : "L"}${y.x} ${y.y}`, x += T, x;
  }, ""), h, d, p, v];
}
function LS(e) {
  const { sourceX: t, sourceY: n, targetX: r, targetY: i } = e, [a, o, s, u] = Lh({
    sourceX: t,
    sourceY: n,
    targetX: r,
    targetY: i
  });
  return [`M ${t},${n}L ${r},${i}`, a, o, s, u];
}
const BS = Ze({
  name: "StraightEdge",
  props: [
    "label",
    "labelStyle",
    "labelShowBg",
    "labelBgStyle",
    "labelBgPadding",
    "labelBgBorderRadius",
    "sourceY",
    "sourceX",
    "targetX",
    "targetY",
    "markerEnd",
    "markerStart",
    "interactionWidth"
  ],
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t }) {
    return () => {
      const [n, r, i] = LS(e);
      return Ke(Go, {
        path: n,
        labelX: r,
        labelY: i,
        ...t,
        ...e
      });
    };
  }
}), $S = BS, US = Ze({
  name: "SmoothStepEdge",
  props: [
    "sourcePosition",
    "targetPosition",
    "label",
    "labelStyle",
    "labelShowBg",
    "labelBgStyle",
    "labelBgPadding",
    "labelBgBorderRadius",
    "sourceY",
    "sourceX",
    "targetX",
    "targetY",
    "borderRadius",
    "markerEnd",
    "markerStart",
    "interactionWidth",
    "offset"
  ],
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t }) {
    return () => {
      const [n, r, i] = Us({
        ...e,
        sourcePosition: e.sourcePosition ?? De.Bottom,
        targetPosition: e.targetPosition ?? De.Top
      });
      return Ke(Go, {
        path: n,
        labelX: r,
        labelY: i,
        ...t,
        ...e
      });
    };
  }
}), zh = US, zS = Ze({
  name: "StepEdge",
  props: [
    "sourcePosition",
    "targetPosition",
    "label",
    "labelStyle",
    "labelShowBg",
    "labelBgStyle",
    "labelBgPadding",
    "labelBgBorderRadius",
    "sourceY",
    "sourceX",
    "targetX",
    "targetY",
    "markerEnd",
    "markerStart",
    "interactionWidth"
  ],
  setup(e, { attrs: t }) {
    return () => Ke(zh, { ...e, ...t, borderRadius: 0 });
  }
}), HS = zS, VS = Ze({
  name: "BezierEdge",
  props: [
    "sourcePosition",
    "targetPosition",
    "label",
    "labelStyle",
    "labelShowBg",
    "labelBgStyle",
    "labelBgPadding",
    "labelBgBorderRadius",
    "sourceY",
    "sourceX",
    "targetX",
    "targetY",
    "curvature",
    "markerEnd",
    "markerStart",
    "interactionWidth"
  ],
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t }) {
    return () => {
      const [n, r, i] = $h({
        ...e,
        sourcePosition: e.sourcePosition ?? De.Bottom,
        targetPosition: e.targetPosition ?? De.Top
      });
      return Ke(Go, {
        path: n,
        labelX: r,
        labelY: i,
        ...t,
        ...e
      });
    };
  }
}), WS = VS, GS = Ze({
  name: "SimpleBezierEdge",
  props: [
    "sourcePosition",
    "targetPosition",
    "label",
    "labelStyle",
    "labelShowBg",
    "labelBgStyle",
    "labelBgPadding",
    "labelBgBorderRadius",
    "sourceY",
    "sourceX",
    "targetX",
    "targetY",
    "markerEnd",
    "markerStart",
    "interactionWidth"
  ],
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t }) {
    return () => {
      const [n, r, i] = Uh({
        ...e,
        sourcePosition: e.sourcePosition ?? De.Bottom,
        targetPosition: e.targetPosition ?? De.Top
      });
      return Ke(Go, {
        path: n,
        labelX: r,
        labelY: i,
        ...t,
        ...e
      });
    };
  }
}), XS = GS, YS = {
  input: AS,
  default: TS,
  output: SS
}, KS = {
  default: WS,
  straight: $S,
  step: HS,
  smoothstep: zh,
  simplebezier: XS
};
function ZS(e, t, n) {
  const r = Re(() => (v) => t.value.get(v)), i = Re(() => (v) => n.value.get(v)), a = Re(() => {
    const v = {
      ...KS,
      ...e.edgeTypes
    }, g = Object.keys(v);
    for (const x of e.edges)
      x.type && !g.includes(x.type) && (v[x.type] = x.type);
    return v;
  }), o = Re(() => {
    const v = {
      ...YS,
      ...e.nodeTypes
    }, g = Object.keys(v);
    for (const x of e.nodes)
      x.type && !g.includes(x.type) && (v[x.type] = x.type);
    return v;
  }), s = Re(() => e.onlyRenderVisibleElements ? Th(
    e.nodes,
    {
      x: 0,
      y: 0,
      width: e.dimensions.width,
      height: e.dimensions.height
    },
    e.viewport,
    !0
  ) : e.nodes), u = Re(() => {
    if (e.onlyRenderVisibleElements) {
      const v = [];
      for (const g of e.edges) {
        const x = t.value.get(g.source), y = t.value.get(g.target);
        GT({
          sourcePos: x.computedPosition || { x: 0, y: 0 },
          targetPos: y.computedPosition || { x: 0, y: 0 },
          sourceWidth: x.dimensions.width,
          sourceHeight: x.dimensions.height,
          targetWidth: y.dimensions.width,
          targetHeight: y.dimensions.height,
          width: e.dimensions.width,
          height: e.dimensions.height,
          viewport: e.viewport
        }) && v.push(g);
      }
      return v;
    }
    return e.edges;
  }), l = Re(() => [...s.value, ...u.value]), c = Re(() => {
    const v = [];
    for (const g of e.nodes)
      g.selected && v.push(g);
    return v;
  }), f = Re(() => {
    const v = [];
    for (const g of e.edges)
      g.selected && v.push(g);
    return v;
  }), h = Re(() => [
    ...c.value,
    ...f.value
  ]), d = Re(() => {
    const v = [];
    for (const g of e.nodes)
      g.dimensions.width && g.dimensions.height && g.handleBounds !== void 0 && v.push(g);
    return v;
  }), p = Re(
    () => s.value.length > 0 && d.value.length === s.value.length
  );
  return {
    getNode: r,
    getEdge: i,
    getElements: l,
    getEdgeTypes: a,
    getNodeTypes: o,
    getEdges: u,
    getNodes: s,
    getSelectedElements: h,
    getSelectedNodes: c,
    getSelectedEdges: f,
    getNodesInitialized: d,
    areNodesInitialized: p
  };
}
class dr {
  constructor() {
    this.currentId = 0, this.flows = /* @__PURE__ */ new Map();
  }
  static getInstance() {
    var t;
    const n = (t = oi()) == null ? void 0 : t.appContext.app, r = (n == null ? void 0 : n.config.globalProperties.$vueFlowStorage) ?? dr.instance;
    return dr.instance = r ?? new dr(), n && (n.config.globalProperties.$vueFlowStorage = dr.instance), dr.instance;
  }
  set(t, n) {
    return this.flows.set(t, n);
  }
  get(t) {
    return this.flows.get(t);
  }
  remove(t) {
    return this.flows.delete(t);
  }
  create(t, n) {
    const r = Ph(), i = Md(r), a = {};
    for (const [h, d] of Object.entries(i.hooks)) {
      const p = `on${h.charAt(0).toUpperCase() + h.slice(1)}`;
      a[p] = d.on;
    }
    const o = {};
    for (const [h, d] of Object.entries(i.hooks))
      o[h] = d.trigger;
    const s = Re(() => {
      const h = /* @__PURE__ */ new Map();
      for (const d of i.nodes)
        h.set(d.id, d);
      return h;
    }), u = Re(() => {
      const h = /* @__PURE__ */ new Map();
      for (const d of i.edges)
        h.set(d.id, d);
      return h;
    }), l = ZS(i, s, u), c = wS(i, s, u);
    c.setState({ ...i, ...n });
    const f = {
      ...a,
      ...l,
      ...c,
      ...z2(i),
      nodeLookup: s,
      edgeLookup: u,
      emits: o,
      id: t,
      vueFlowVersion: "1.48.2",
      $destroy: () => {
        this.remove(t);
      }
    };
    return this.set(t, f), f;
  }
  getId() {
    return `vue-flow-${this.currentId++}`;
  }
}
function nt(e) {
  const t = dr.getInstance(), n = J0(), r = typeof e == "object", i = r ? e : { id: e }, a = i.id, o = a ?? (n == null ? void 0 : n.vueFlowId);
  let s;
  if (n) {
    const u = Fr(C0, null);
    typeof u < "u" && u !== null && (!o || u.id === o) && (s = u);
  }
  if (s || o && (s = t.get(o)), !s || o && s.id !== o) {
    const u = a ?? t.getId(), l = t.create(u, i);
    s = l, (n ?? Q0(!0)).run(() => {
      tt(
        l.applyDefault,
        (f, h, d) => {
          const p = (g) => {
            l.applyNodeChanges(g);
          }, v = (g) => {
            l.applyEdgeChanges(g);
          };
          f ? (l.onNodesChange(p), l.onEdgesChange(v)) : (l.hooks.value.nodesChange.off(p), l.hooks.value.edgesChange.off(v)), d(() => {
            l.hooks.value.nodesChange.off(p), l.hooks.value.edgesChange.off(v);
          });
        },
        { immediate: !0 }
      ), zi(() => {
        if (s) {
          const f = t.get(s.id);
          f ? f.$destroy() : la(`No store instance found for id ${s.id} in storage.`);
        }
      });
    });
  } else
    r && s.setState(i);
  if (n && (wr(C0, s), n.vueFlowId = s.id), r) {
    const u = oi();
    (u == null ? void 0 : u.type.name) !== "VueFlow" && s.emits.error(new xt(vt.USEVUEFLOW_OPTIONS));
  }
  return s;
}
function qS(e) {
  const { emits: t, dimensions: n } = nt();
  let r;
  Wn(() => {
    const i = () => {
      var a, o;
      if (!e.value || !(((o = (a = e.value).checkVisibility) == null ? void 0 : o.call(a)) ?? !0))
        return;
      const s = $o(e.value);
      (s.width === 0 || s.height === 0) && t.error(new xt(vt.MISSING_VIEWPORT_DIMENSIONS)), n.value = { width: s.width || 500, height: s.height || 500 };
    };
    i(), window.addEventListener("resize", i), e.value && (r = new ResizeObserver(() => i()), r.observe(e.value)), tc(() => {
      window.removeEventListener("resize", i), r && e.value && r.unobserve(e.value);
    });
  });
}
const jS = {
  name: "UserSelection",
  compatConfig: { MODE: 3 }
}, JS = /* @__PURE__ */ Ze({
  ...jS,
  props: {
    userSelectionRect: {}
  },
  setup(e) {
    return (t, n) => (we(), Oe("div", {
      class: "vue-flow__selection vue-flow__container",
      style: Yt({
        width: `${t.userSelectionRect.width}px`,
        height: `${t.userSelectionRect.height}px`,
        transform: `translate(${t.userSelectionRect.x}px, ${t.userSelectionRect.y}px)`
      })
    }, null, 4));
  }
}), QS = ["tabIndex"], e4 = {
  name: "NodesSelection",
  compatConfig: { MODE: 3 }
}, t4 = /* @__PURE__ */ Ze({
  ...e4,
  setup(e) {
    const { emits: t, viewport: n, getSelectedNodes: r, noPanClassName: i, disableKeyboardA11y: a, userSelectionActive: o } = nt(), s = Rh(), u = $e(null), l = Dh({
      el: u,
      onStart(p) {
        t.selectionDragStart(p), t.nodeDragStart(p);
      },
      onDrag(p) {
        t.selectionDrag(p), t.nodeDrag(p);
      },
      onStop(p) {
        t.selectionDragStop(p), t.nodeDragStop(p);
      }
    });
    Wn(() => {
      var p;
      a.value || (p = u.value) == null || p.focus({ preventScroll: !0 });
    });
    const c = Re(() => Nl(r.value)), f = Re(() => ({
      width: `${c.value.width}px`,
      height: `${c.value.height}px`,
      top: `${c.value.y}px`,
      left: `${c.value.x}px`
    }));
    function h(p) {
      t.selectionContextMenu({ event: p, nodes: r.value });
    }
    function d(p) {
      a.value || jr[p.key] && (p.preventDefault(), s(
        {
          x: jr[p.key].x,
          y: jr[p.key].y
        },
        p.shiftKey
      ));
    }
    return (p, v) => !W(o) && c.value.width && c.value.height ? (we(), Oe("div", {
      key: 0,
      class: Sn(["vue-flow__nodesselection vue-flow__container", W(i)]),
      style: Yt({ transform: `translate(${W(n).x}px,${W(n).y}px) scale(${W(n).zoom})` })
    }, [
      Le("div", {
        ref_key: "el",
        ref: u,
        class: Sn([{ dragging: W(l) }, "vue-flow__nodesselection-rect"]),
        style: Yt(f.value),
        tabIndex: W(a) ? void 0 : -1,
        onContextmenu: h,
        onKeydown: d
      }, null, 46, QS)
    ], 6)) : ze("", !0);
  }
});
function n4(e, t) {
  return {
    x: e.clientX - t.left,
    y: e.clientY - t.top
  };
}
const r4 = {
  name: "Pane",
  compatConfig: { MODE: 3 }
}, i4 = /* @__PURE__ */ Ze({
  ...r4,
  props: {
    isSelecting: { type: Boolean },
    selectionKeyPressed: { type: Boolean }
  },
  setup(e) {
    const {
      vueFlowRef: t,
      nodes: n,
      viewport: r,
      emits: i,
      userSelectionActive: a,
      removeSelectedElements: o,
      userSelectionRect: s,
      elementsSelectable: u,
      nodesSelectionActive: l,
      getSelectedEdges: c,
      getSelectedNodes: f,
      removeNodes: h,
      removeEdges: d,
      selectionMode: p,
      deleteKeyCode: v,
      multiSelectionKeyCode: g,
      multiSelectionActive: x,
      edgeLookup: y,
      nodeLookup: m,
      connectionLookup: T,
      defaultEdgeOptions: Y,
      connectionStartHandle: Q,
      panOnDrag: R
    } = nt(), V = Qn(null), P = Qn(/* @__PURE__ */ new Set()), H = Qn(/* @__PURE__ */ new Set()), G = Qn(null), C = Ye(() => u.value && (e.isSelecting || a.value)), se = Ye(() => Q.value !== null);
    let w = !1, U = !1;
    const I = bi(v, { actInsideInputWithModifier: !1 }), j = bi(g);
    tt(I, (O) => {
      O && (h(f.value), d(c.value), l.value = !1);
    }), tt(j, (O) => {
      x.value = O;
    });
    function K(O, X) {
      return (le) => {
        le.target === X && (O == null || O(le));
      };
    }
    function ee(O) {
      if (w || se.value) {
        w = !1;
        return;
      }
      i.paneClick(O), o(), l.value = !1;
    }
    function J(O) {
      var X;
      if (Array.isArray(R.value) && ((X = R.value) != null && X.includes(2))) {
        O.preventDefault();
        return;
      }
      i.paneContextMenu(O);
    }
    function de(O) {
      i.paneScroll(O);
    }
    function A(O) {
      var X, le, pe;
      if (G.value = ((X = t.value) == null ? void 0 : X.getBoundingClientRect()) ?? null, !u.value || !e.isSelecting || O.button !== 0 || O.target !== V.value || !G.value)
        return;
      (pe = (le = O.target) == null ? void 0 : le.setPointerCapture) == null || pe.call(le, O.pointerId);
      const { x: me, y: he } = n4(O, G.value);
      U = !0, w = !1, o(), s.value = {
        width: 0,
        height: 0,
        startX: me,
        startY: he,
        x: me,
        y: he
      }, i.selectionStart(O);
    }
    function z(O) {
      var X;
      if (!G.value || !s.value)
        return;
      w = !0;
      const { x: le, y: pe } = yn(O, G.value), { startX: me = 0, startY: he = 0 } = s.value, ue = {
        startX: me,
        startY: he,
        x: le < me ? le : me,
        y: pe < he ? pe : he,
        width: Math.abs(le - me),
        height: Math.abs(pe - he)
      }, Z = P.value, _e = H.value;
      P.value = new Set(
        Th(n.value, ue, r.value, p.value === Cl.Partial, !0).map(
          (M) => M.id
        )
      ), H.value = /* @__PURE__ */ new Set();
      const F = ((X = Y.value) == null ? void 0 : X.selectable) ?? !0;
      for (const M of P.value) {
        const D = T.value.get(M);
        if (D)
          for (const { edgeId: B } of D.values()) {
            const q = y.value.get(B);
            q && (q.selectable ?? F) && H.value.add(B);
          }
      }
      if (!A0(Z, P.value)) {
        const M = qn(m.value, P.value, !0);
        i.nodesChange(M);
      }
      if (!A0(_e, H.value)) {
        const M = qn(y.value, H.value);
        i.edgesChange(M);
      }
      s.value = ue, a.value = !0, l.value = !1;
    }
    function L(O) {
      var X;
      O.button !== 0 || !U || ((X = O.target) == null || X.releasePointerCapture(O.pointerId), !a.value && s.value && O.target === V.value && ee(O), a.value = !1, s.value = null, l.value = P.value.size > 0, i.selectionEnd(O), e.selectionKeyPressed && (w = !1), U = !1);
    }
    return (O, X) => (we(), Oe("div", {
      ref_key: "container",
      ref: V,
      class: Sn(["vue-flow__pane vue-flow__container", { selection: O.isSelecting }]),
      onClick: X[0] || (X[0] = (le) => C.value ? void 0 : K(ee, V.value)(le)),
      onContextmenu: X[1] || (X[1] = (le) => K(J, V.value)(le)),
      onWheelPassive: X[2] || (X[2] = (le) => K(de, V.value)(le)),
      onPointerenter: X[3] || (X[3] = (le) => C.value ? void 0 : W(i).paneMouseEnter(le)),
      onPointerdown: X[4] || (X[4] = (le) => C.value ? A(le) : W(i).paneMouseMove(le)),
      onPointermove: X[5] || (X[5] = (le) => C.value ? z(le) : W(i).paneMouseMove(le)),
      onPointerup: X[6] || (X[6] = (le) => C.value ? L(le) : void 0),
      onPointerleave: X[7] || (X[7] = (le) => W(i).paneMouseLeave(le))
    }, [
      lt(O.$slots, "default"),
      W(a) && W(s) ? (we(), at(JS, {
        key: 0,
        "user-selection-rect": W(s)
      }, null, 8, ["user-selection-rect"])) : ze("", !0),
      W(l) && W(f).length ? (we(), at(t4, { key: 1 })) : ze("", !0)
    ], 34));
  }
}), a4 = {
  name: "Transform",
  compatConfig: { MODE: 3 }
}, o4 = /* @__PURE__ */ Ze({
  ...a4,
  setup(e) {
    const { viewport: t, fitViewOnInit: n, fitViewOnInitDone: r } = nt(), i = Re(() => n.value ? !r.value : !1), a = Re(() => `translate(${t.value.x}px,${t.value.y}px) scale(${t.value.zoom})`);
    return (o, s) => (we(), Oe("div", {
      class: "vue-flow__transformationpane vue-flow__container",
      style: Yt({ transform: a.value, opacity: i.value ? 0 : void 0 })
    }, [
      lt(o.$slots, "default")
    ], 4));
  }
}), s4 = {
  name: "Viewport",
  compatConfig: { MODE: 3 }
}, l4 = /* @__PURE__ */ Ze({
  ...s4,
  setup(e) {
    const {
      minZoom: t,
      maxZoom: n,
      defaultViewport: r,
      translateExtent: i,
      zoomActivationKeyCode: a,
      selectionKeyCode: o,
      panActivationKeyCode: s,
      panOnScroll: u,
      panOnScrollMode: l,
      panOnScrollSpeed: c,
      panOnDrag: f,
      zoomOnDoubleClick: h,
      zoomOnPinch: d,
      zoomOnScroll: p,
      preventScrolling: v,
      noWheelClassName: g,
      noPanClassName: x,
      emits: y,
      connectionStartHandle: m,
      userSelectionActive: T,
      paneDragging: Y,
      d3Zoom: Q,
      d3Selection: R,
      d3ZoomHandler: V,
      viewport: P,
      viewportRef: H,
      paneClickDistance: G
    } = nt();
    qS(H);
    const C = Qn(!1), se = Qn(!1);
    let w = null, U = !1, I = 0, j = {
      x: 0,
      y: 0,
      zoom: 0
    };
    const K = bi(s), ee = bi(o), J = bi(a), de = Ye(
      () => (!ee.value || ee.value && o.value === !0) && (K.value || f.value)
    ), A = Ye(() => K.value || u.value), z = Ye(() => o.value === !0 && de.value !== !0), L = Ye(
      () => ee.value && o.value !== !0 || T.value || z.value
    ), O = Ye(() => m.value !== null);
    Wn(() => {
      if (!H.value) {
        la("Viewport element is missing");
        return;
      }
      const he = H.value, ue = he.getBoundingClientRect(), Z = AT().clickDistance(G.value).scaleExtent([t.value, n.value]).translateExtent(i.value), _e = an(he).call(Z), F = _e.on("wheel.zoom"), M = ni.translate(r.value.x ?? 0, r.value.y ?? 0).scale(Cr(r.value.zoom ?? 1, t.value, n.value)), D = [
        [0, 0],
        [ue.width, ue.height]
      ], B = Z.constrain()(M, D, i.value);
      Z.transform(_e, B), Z.wheelDelta(Ls), Q.value = Z, R.value = _e, V.value = F, P.value = { x: B.x, y: B.y, zoom: B.k }, Z.on("start", (q) => {
        var Ee;
        if (!q.sourceEvent)
          return null;
        I = q.sourceEvent.button, C.value = !0;
        const Ae = pe(q.transform);
        ((Ee = q.sourceEvent) == null ? void 0 : Ee.type) === "mousedown" && (Y.value = !0), j = Ae, y.viewportChangeStart(Ae), y.moveStart({ event: q, flowTransform: Ae });
      }), Z.on("end", (q) => {
        if (!q.sourceEvent)
          return null;
        if (C.value = !1, Y.value = !1, X(de.value, I ?? 0) && !U && y.paneContextMenu(q.sourceEvent), U = !1, le(j, q.transform)) {
          const Ee = pe(q.transform);
          j = Ee, y.viewportChangeEnd(Ee), y.moveEnd({ event: q, flowTransform: Ee });
        }
      }), Z.filter((q) => {
        var Ee;
        const Ae = J.value || p.value, ne = d.value && q.ctrlKey, Ne = q.button, be = q.type === "wheel";
        if (Ne === 1 && q.type === "mousedown" && (me(q, "vue-flow__node") || me(q, "vue-flow__edge")))
          return !0;
        if (!de.value && !Ae && !A.value && !h.value && !d.value || T.value || O.value && !be || !h.value && q.type === "dblclick" || me(q, g.value) && be || me(q, x.value) && (!be || A.value && be && !J.value) || !d.value && q.ctrlKey && be || !Ae && !A.value && !ne && be)
          return !1;
        if (!d && q.type === "touchstart" && ((Ee = q.touches) == null ? void 0 : Ee.length) > 1)
          return q.preventDefault(), !1;
        if (!de.value && (q.type === "mousedown" || q.type === "touchstart") || z.value && Array.isArray(f.value) && f.value.includes(0) && Ne === 0 || Array.isArray(f.value) && !f.value.includes(Ne) && (q.type === "mousedown" || q.type === "touchstart"))
          return !1;
        const Pe = Array.isArray(f.value) && f.value.includes(Ne) || o.value === !0 && Array.isArray(f.value) && !f.value.includes(0) || !Ne || Ne <= 1;
        return (!q.ctrlKey || K.value || be) && Pe;
      }), tt(
        [T, de],
        () => {
          T.value && !C.value ? Z.on("zoom", null) : T.value || Z.on("zoom", (q) => {
            P.value = { x: q.transform.x, y: q.transform.y, zoom: q.transform.k };
            const Ee = pe(q.transform);
            U = X(de.value, I ?? 0), y.viewportChange(Ee), y.move({ event: q, flowTransform: Ee });
          });
        },
        { immediate: !0 }
      ), tt(
        [T, A, l, J, d, v, g],
        () => {
          A.value && !J.value && !T.value ? _e.on(
            "wheel.zoom",
            (q) => {
              if (me(q, g.value))
                return !1;
              const Ee = J.value || p.value, Ae = d.value && q.ctrlKey;
              if (!(!v.value || A.value || Ee || Ae))
                return !1;
              q.preventDefault(), q.stopImmediatePropagation();
              const Ne = _e.property("__zoom").k || 1, be = Zi();
              if (!K.value && q.ctrlKey && d.value && be) {
                const Fn = xn(q), Zo = Ls(q), fa = Ne * 2 ** Zo;
                Z.scaleTo(_e, fa, Fn, q);
                return;
              }
              const Pe = q.deltaMode === 1 ? 20 : 1;
              let We = l.value === Di.Vertical ? 0 : q.deltaX * Pe, jt = l.value === Di.Horizontal ? 0 : q.deltaY * Pe;
              !be && q.shiftKey && l.value !== Di.Vertical && !We && jt && (We = jt, jt = 0), Z.translateBy(
                _e,
                -(We / Ne) * c.value,
                -(jt / Ne) * c.value
              );
              const Rt = pe(_e.property("__zoom"));
              w && clearTimeout(w), se.value ? (y.move({ event: q, flowTransform: Rt }), y.viewportChange(Rt), w = setTimeout(() => {
                y.moveEnd({ event: q, flowTransform: Rt }), y.viewportChangeEnd(Rt), se.value = !1;
              }, 150)) : (se.value = !0, y.moveStart({ event: q, flowTransform: Rt }), y.viewportChangeStart(Rt));
            },
            { passive: !1 }
          ) : typeof F < "u" && _e.on(
            "wheel.zoom",
            function(q, Ee) {
              const Ae = !v.value && q.type === "wheel" && !q.ctrlKey, ne = J.value || p.value, Ne = d.value && q.ctrlKey;
              if (!ne && !u.value && !Ne && q.type === "wheel" || Ae || me(q, g.value))
                return null;
              q.preventDefault(), F.call(this, q, Ee);
            },
            { passive: !1 }
          );
        },
        { immediate: !0 }
      );
    });
    function X(he, ue) {
      return ue === 2 && Array.isArray(he) && he.includes(2);
    }
    function le(he, ue) {
      return he.x !== ue.x && !Number.isNaN(ue.x) || he.y !== ue.y && !Number.isNaN(ue.y) || he.zoom !== ue.k && !Number.isNaN(ue.k);
    }
    function pe(he) {
      return {
        x: he.x,
        y: he.y,
        zoom: he.k
      };
    }
    function me(he, ue) {
      return he.target.closest(`.${ue}`);
    }
    return (he, ue) => (we(), Oe("div", {
      ref_key: "viewportRef",
      ref: H,
      class: "vue-flow__viewport vue-flow__container"
    }, [
      oe(i4, {
        "is-selecting": L.value,
        "selection-key-pressed": W(ee),
        class: Sn({
          connecting: O.value,
          dragging: W(Y),
          draggable: W(f) === !0 || Array.isArray(W(f)) && W(f).includes(0)
        })
      }, {
        default: ve(() => [
          oe(o4, null, {
            default: ve(() => [
              lt(he.$slots, "default")
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["is-selecting", "selection-key-pressed", "class"])
    ], 512));
  }
}), u4 = ["id"], c4 = ["id"], f4 = ["id"], h4 = {
  name: "A11yDescriptions",
  compatConfig: { MODE: 3 }
}, d4 = /* @__PURE__ */ Ze({
  ...h4,
  setup(e) {
    const { id: t, disableKeyboardA11y: n, ariaLiveMessage: r } = nt();
    return (i, a) => (we(), Oe(ct, null, [
      Le("div", {
        id: `${W(vh)}-${W(t)}`,
        style: { display: "none" }
      }, " Press enter or space to select a node. " + Me(W(n) ? "" : "You can then use the arrow keys to move the node around.") + " You can then use the arrow keys to move the node around, press delete to remove it and press escape to cancel. ", 9, u4),
      Le("div", {
        id: `${W(ph)}-${W(t)}`,
        style: { display: "none" }
      }, " Press enter or space to select an edge. You can then press delete to remove it or press escape to cancel. ", 8, c4),
      W(n) ? ze("", !0) : (we(), Oe("div", {
        key: 0,
        id: `${W(OT)}-${W(t)}`,
        "aria-live": "assertive",
        "aria-atomic": "true",
        style: { position: "absolute", width: "1px", height: "1px", margin: "-1px", border: "0", padding: "0", overflow: "hidden", clip: "rect(0px, 0px, 0px, 0px)", "clip-path": "inset(100%)" }
      }, Me(W(r)), 9, f4))
    ], 64));
  }
});
function v4() {
  const e = nt();
  tt(
    () => e.viewportHelper.value.viewportInitialized,
    (t) => {
      t && setTimeout(() => {
        e.emits.init(e), e.emits.paneReady(e);
      }, 1);
    }
  );
}
function p4(e, t, n) {
  return n === De.Left ? e - t : n === De.Right ? e + t : e;
}
function g4(e, t, n) {
  return n === De.Top ? e - t : n === De.Bottom ? e + t : e;
}
const Il = function({
  radius: e = 10,
  centerX: t = 0,
  centerY: n = 0,
  position: r = De.Top,
  type: i
}) {
  return Ke("circle", {
    class: `vue-flow__edgeupdater vue-flow__edgeupdater-${i}`,
    cx: p4(t, e, r),
    cy: g4(n, e, r),
    r: e,
    stroke: "transparent",
    fill: "transparent"
  });
};
Il.props = ["radius", "centerX", "centerY", "position", "type"];
Il.compatConfig = { MODE: 3 };
const O0 = Il, m4 = Ze({
  name: "Edge",
  compatConfig: { MODE: 3 },
  props: ["id"],
  setup(e) {
    const {
      id: t,
      addSelectedEdges: n,
      connectionMode: r,
      edgeUpdaterRadius: i,
      emits: a,
      nodesSelectionActive: o,
      noPanClassName: s,
      getEdgeTypes: u,
      removeSelectedEdges: l,
      findEdge: c,
      findNode: f,
      isValidConnection: h,
      multiSelectionActive: d,
      disableKeyboardA11y: p,
      elementsSelectable: v,
      edgesUpdatable: g,
      edgesFocusable: x,
      hooks: y
    } = nt(), m = Re(() => c(e.id)), { emit: T, on: Y } = sS(m.value, a), Q = Fr(zo), R = oi(), V = $e(!1), P = $e(!1), H = $e(""), G = $e(null), C = $e("source"), se = $e(null), w = Ye(
      () => typeof m.value.selectable > "u" ? v.value : m.value.selectable
    ), U = Ye(() => typeof m.value.updatable > "u" ? g.value : m.value.updatable), I = Ye(() => typeof m.value.focusable > "u" ? x.value : m.value.focusable);
    wr(iS, e.id), wr(aS, se);
    const j = Re(() => m.value.class instanceof Function ? m.value.class(m.value) : m.value.class), K = Re(() => m.value.style instanceof Function ? m.value.style(m.value) : m.value.style), ee = Re(() => {
      const M = m.value.type || "default", D = Q == null ? void 0 : Q[`edge-${M}`];
      if (D)
        return D;
      let B = m.value.template ?? u.value[M];
      if (typeof B == "string" && R) {
        const q = Object.keys(R.appContext.components);
        q && q.includes(M) && (B = mn(M, !1));
      }
      return B && typeof B != "string" ? B : (a.error(new xt(vt.EDGE_TYPE_MISSING, B)), !1);
    }), { handlePointerDown: J } = bh({
      nodeId: H,
      handleId: G,
      type: C,
      isValidConnection: h,
      edgeUpdaterType: C,
      onEdgeUpdate: z,
      onEdgeUpdateEnd: L
    });
    return () => {
      const M = f(m.value.source), D = f(m.value.target), B = "pathOptions" in m.value ? m.value.pathOptions : {};
      if (!M && !D)
        return a.error(new xt(vt.EDGE_SOURCE_TARGET_MISSING, m.value.id, m.value.source, m.value.target)), null;
      if (!M)
        return a.error(new xt(vt.EDGE_SOURCE_MISSING, m.value.id, m.value.source)), null;
      if (!D)
        return a.error(new xt(vt.EDGE_TARGET_MISSING, m.value.id, m.value.target)), null;
      if (!m.value || m.value.hidden || M.hidden || D.hidden)
        return null;
      let q;
      r.value === ar.Strict ? q = M.handleBounds.source : q = [...M.handleBounds.source || [], ...M.handleBounds.target || []];
      const Ee = _0(q, m.value.sourceHandle);
      let Ae;
      r.value === ar.Strict ? Ae = D.handleBounds.target : Ae = [...D.handleBounds.target || [], ...D.handleBounds.source || []];
      const ne = _0(Ae, m.value.targetHandle), Ne = (Ee == null ? void 0 : Ee.position) || De.Bottom, be = (ne == null ? void 0 : ne.position) || De.Top, { x: Pe, y: We } = ri(M, Ee, Ne), { x: jt, y: Rt } = ri(D, ne, be);
      return m.value.sourceX = Pe, m.value.sourceY = We, m.value.targetX = jt, m.value.targetY = Rt, Ke(
        "g",
        {
          ref: se,
          key: e.id,
          "data-id": e.id,
          class: [
            "vue-flow__edge",
            `vue-flow__edge-${ee.value === !1 ? "default" : m.value.type || "default"}`,
            s.value,
            j.value,
            {
              updating: V.value,
              selected: m.value.selected,
              animated: m.value.animated,
              inactive: !w.value && !y.value.edgeClick.hasListeners()
            }
          ],
          tabIndex: I.value ? 0 : void 0,
          "aria-label": m.value.ariaLabel === null ? void 0 : m.value.ariaLabel ?? `Edge from ${m.value.source} to ${m.value.target}`,
          "aria-describedby": I.value ? `${ph}-${t}` : void 0,
          "aria-roledescription": "edge",
          role: I.value ? "group" : "img",
          ...m.value.domAttributes,
          onClick: X,
          onContextmenu: le,
          onDblclick: pe,
          onMouseenter: me,
          onMousemove: he,
          onMouseleave: ue,
          onKeyDown: I.value ? F : void 0
        },
        [
          P.value ? null : Ke(ee.value === !1 ? u.value.default : ee.value, {
            id: e.id,
            sourceNode: M,
            targetNode: D,
            source: m.value.source,
            target: m.value.target,
            type: m.value.type,
            updatable: U.value,
            selected: m.value.selected,
            animated: m.value.animated,
            label: m.value.label,
            labelStyle: m.value.labelStyle,
            labelShowBg: m.value.labelShowBg,
            labelBgStyle: m.value.labelBgStyle,
            labelBgPadding: m.value.labelBgPadding,
            labelBgBorderRadius: m.value.labelBgBorderRadius,
            data: m.value.data,
            events: { ...m.value.events, ...Y },
            style: K.value,
            markerStart: `url('#${Ki(m.value.markerStart, t)}')`,
            markerEnd: `url('#${Ki(m.value.markerEnd, t)}')`,
            sourcePosition: Ne,
            targetPosition: be,
            sourceX: Pe,
            sourceY: We,
            targetX: jt,
            targetY: Rt,
            sourceHandleId: m.value.sourceHandle,
            targetHandleId: m.value.targetHandle,
            interactionWidth: m.value.interactionWidth,
            ...B
          }),
          [
            U.value === "source" || U.value === !0 ? [
              Ke(
                "g",
                {
                  onMousedown: Z,
                  onMouseenter: de,
                  onMouseout: A
                },
                Ke(O0, {
                  position: Ne,
                  centerX: Pe,
                  centerY: We,
                  radius: i.value,
                  type: "source",
                  "data-type": "source"
                })
              )
            ] : null,
            U.value === "target" || U.value === !0 ? [
              Ke(
                "g",
                {
                  onMousedown: _e,
                  onMouseenter: de,
                  onMouseout: A
                },
                Ke(O0, {
                  position: be,
                  centerX: jt,
                  centerY: Rt,
                  radius: i.value,
                  type: "target",
                  "data-type": "target"
                })
              )
            ] : null
          ]
        ]
      );
    };
    function de() {
      V.value = !0;
    }
    function A() {
      V.value = !1;
    }
    function z(M, D) {
      T.update({ event: M, edge: m.value, connection: D });
    }
    function L(M) {
      T.updateEnd({ event: M, edge: m.value }), P.value = !1;
    }
    function O(M, D) {
      M.button === 0 && (P.value = !0, H.value = D ? m.value.target : m.value.source, G.value = (D ? m.value.targetHandle : m.value.sourceHandle) ?? null, C.value = D ? "target" : "source", T.updateStart({ event: M, edge: m.value }), J(M));
    }
    function X(M) {
      var D;
      const B = { event: M, edge: m.value };
      w.value && (o.value = !1, m.value.selected && d.value ? (l([m.value]), (D = se.value) == null || D.blur()) : n([m.value])), T.click(B);
    }
    function le(M) {
      T.contextMenu({ event: M, edge: m.value });
    }
    function pe(M) {
      T.doubleClick({ event: M, edge: m.value });
    }
    function me(M) {
      T.mouseEnter({ event: M, edge: m.value });
    }
    function he(M) {
      T.mouseMove({ event: M, edge: m.value });
    }
    function ue(M) {
      T.mouseLeave({ event: M, edge: m.value });
    }
    function Z(M) {
      O(M, !0);
    }
    function _e(M) {
      O(M, !1);
    }
    function F(M) {
      var D;
      !p.value && gh.includes(M.key) && w.value && (M.key === "Escape" ? ((D = se.value) == null || D.blur(), l([c(e.id)])) : n([c(e.id)]));
    }
  }
}), x4 = m4, _4 = Ze({
  name: "ConnectionLine",
  compatConfig: { MODE: 3 },
  setup() {
    var e;
    const {
      id: t,
      connectionMode: n,
      connectionStartHandle: r,
      connectionEndHandle: i,
      connectionPosition: a,
      connectionLineType: o,
      connectionLineStyle: s,
      connectionLineOptions: u,
      connectionStatus: l,
      viewport: c,
      findNode: f
    } = nt(), h = (e = Fr(zo)) == null ? void 0 : e["connection-line"], d = Re(() => {
      var y;
      return f((y = r.value) == null ? void 0 : y.nodeId);
    }), p = Re(() => {
      var y;
      return f((y = i.value) == null ? void 0 : y.nodeId) ?? null;
    }), v = Re(() => ({
      x: (a.value.x - c.value.x) / c.value.zoom,
      y: (a.value.y - c.value.y) / c.value.zoom
    })), g = Re(
      () => u.value.markerStart ? `url(#${Ki(u.value.markerStart, t)})` : ""
    ), x = Re(
      () => u.value.markerEnd ? `url(#${Ki(u.value.markerEnd, t)})` : ""
    );
    return () => {
      var y, m, T;
      if (!d.value || !r.value)
        return null;
      const Y = r.value.id, Q = r.value.type, R = d.value.handleBounds;
      let V = (R == null ? void 0 : R[Q]) ?? [];
      if (n.value === ar.Loose) {
        const K = (R == null ? void 0 : R[Q === "source" ? "target" : "source"]) ?? [];
        V = [...V, ...K];
      }
      if (!V)
        return null;
      const P = (Y ? V.find((K) => K.id === Y) : V[0]) ?? null, H = (P == null ? void 0 : P.position) ?? De.Top, { x: G, y: C } = ri(d.value, P, H);
      let se = null;
      p.value && (n.value === ar.Strict ? se = ((y = p.value.handleBounds[Q === "source" ? "target" : "source"]) == null ? void 0 : y.find(
        (K) => {
          var ee;
          return K.id === ((ee = i.value) == null ? void 0 : ee.id);
        }
      )) || null : se = ((m = [...p.value.handleBounds.source ?? [], ...p.value.handleBounds.target ?? []]) == null ? void 0 : m.find(
        (K) => {
          var ee;
          return K.id === ((ee = i.value) == null ? void 0 : ee.id);
        }
      )) || null);
      const w = ((T = i.value) == null ? void 0 : T.position) ?? (H ? Bs[H] : null);
      if (!H || !w)
        return null;
      const U = o.value ?? u.value.type ?? fr.Bezier;
      let I = "";
      const j = {
        sourceX: G,
        sourceY: C,
        sourcePosition: H,
        targetX: v.value.x,
        targetY: v.value.y,
        targetPosition: w
      };
      return U === fr.Bezier ? [I] = $h(j) : U === fr.Step ? [I] = Us({
        ...j,
        borderRadius: 0
      }) : U === fr.SmoothStep ? [I] = Us(j) : U === fr.SimpleBezier ? [I] = Uh(j) : I = `M${G},${C} ${v.value.x},${v.value.y}`, Ke(
        "svg",
        { class: "vue-flow__edges vue-flow__connectionline vue-flow__container" },
        Ke(
          "g",
          { class: "vue-flow__connection" },
          h ? Ke(h, {
            sourceX: G,
            sourceY: C,
            sourcePosition: H,
            targetX: v.value.x,
            targetY: v.value.y,
            targetPosition: w,
            sourceNode: d.value,
            sourceHandle: P,
            targetNode: p.value,
            targetHandle: se,
            markerEnd: x.value,
            markerStart: g.value,
            connectionStatus: l.value
          }) : Ke("path", {
            d: I,
            class: [u.value.class, l.value, "vue-flow__connection-path"],
            style: {
              ...s.value,
              ...u.value.style
            },
            "marker-end": x.value,
            "marker-start": g.value
          })
        )
      );
    };
  }
}), w4 = _4, y4 = ["id", "markerWidth", "markerHeight", "markerUnits", "orient"], E4 = {
  name: "MarkerType",
  compatConfig: { MODE: 3 }
}, T4 = /* @__PURE__ */ Ze({
  ...E4,
  props: {
    id: {},
    type: {},
    color: { default: "none" },
    width: { default: 12.5 },
    height: { default: 12.5 },
    markerUnits: { default: "strokeWidth" },
    orient: { default: "auto-start-reverse" },
    strokeWidth: { default: 1 }
  },
  setup(e) {
    return (t, n) => (we(), Oe("marker", {
      id: t.id,
      class: "vue-flow__arrowhead",
      viewBox: "-10 -10 20 20",
      refX: "0",
      refY: "0",
      markerWidth: `${t.width}`,
      markerHeight: `${t.height}`,
      markerUnits: t.markerUnits,
      orient: t.orient
    }, [
      t.type === W(go).ArrowClosed ? (we(), Oe("polyline", {
        key: 0,
        style: Yt({
          stroke: t.color,
          fill: t.color,
          strokeWidth: t.strokeWidth
        }),
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        points: "-5,-4 0,0 -5,4 -5,-4"
      }, null, 4)) : ze("", !0),
      t.type === W(go).Arrow ? (we(), Oe("polyline", {
        key: 1,
        style: Yt({
          stroke: t.color,
          strokeWidth: t.strokeWidth
        }),
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        fill: "none",
        points: "-5,-4 0,0 -5,4"
      }, null, 4)) : ze("", !0)
    ], 8, y4));
  }
}), S4 = {
  class: "vue-flow__marker vue-flow__container",
  "aria-hidden": "true"
}, A4 = {
  name: "MarkerDefinitions",
  compatConfig: { MODE: 3 }
}, C4 = /* @__PURE__ */ Ze({
  ...A4,
  setup(e) {
    const { id: t, edges: n, connectionLineOptions: r, defaultMarkerColor: i } = nt(), a = Re(() => {
      const o = /* @__PURE__ */ new Set(), s = [], u = (l) => {
        if (l) {
          const c = Ki(l, t);
          o.has(c) || (typeof l == "object" ? s.push({ ...l, id: c, color: l.color || i.value }) : s.push({ id: c, color: i.value, type: l }), o.add(c));
        }
      };
      for (const l of [r.value.markerEnd, r.value.markerStart])
        u(l);
      for (const l of n.value)
        for (const c of [l.markerStart, l.markerEnd])
          u(c);
      return s.sort((l, c) => l.id.localeCompare(c.id));
    });
    return (o, s) => (we(), Oe("svg", S4, [
      Le("defs", null, [
        (we(!0), Oe(ct, null, wn(a.value, (u) => (we(), at(T4, {
          id: u.id,
          key: u.id,
          type: u.type,
          color: u.color,
          width: u.width,
          height: u.height,
          markerUnits: u.markerUnits,
          "stroke-width": u.strokeWidth,
          orient: u.orient
        }, null, 8, ["id", "type", "color", "width", "height", "markerUnits", "stroke-width", "orient"]))), 128))
      ])
    ]));
  }
}), N4 = {
  name: "Edges",
  compatConfig: { MODE: 3 }
}, F4 = /* @__PURE__ */ Ze({
  ...N4,
  setup(e) {
    const { findNode: t, getEdges: n, elevateEdgesOnSelect: r } = nt();
    return (i, a) => (we(), Oe(ct, null, [
      oe(C4),
      (we(!0), Oe(ct, null, wn(W(n), (o) => (we(), Oe("svg", {
        key: o.id,
        class: "vue-flow__edges vue-flow__container",
        style: Yt({ zIndex: W(XT)(o, W(t), W(r)) })
      }, [
        oe(W(x4), {
          id: o.id
        }, null, 8, ["id"])
      ], 4))), 128)),
      oe(W(w4))
    ], 64));
  }
}), k4 = Ze({
  name: "Node",
  compatConfig: { MODE: 3 },
  props: ["id", "resizeObserver"],
  setup(e) {
    const {
      id: t,
      noPanClassName: n,
      selectNodesOnDrag: r,
      nodesSelectionActive: i,
      multiSelectionActive: a,
      emits: o,
      removeSelectedNodes: s,
      addSelectedNodes: u,
      updateNodeDimensions: l,
      onUpdateNodeInternals: c,
      getNodeTypes: f,
      nodeExtent: h,
      elevateNodesOnSelect: d,
      disableKeyboardA11y: p,
      ariaLiveMessage: v,
      snapToGrid: g,
      snapGrid: x,
      nodeDragThreshold: y,
      nodesDraggable: m,
      elementsSelectable: T,
      nodesConnectable: Y,
      nodesFocusable: Q,
      hooks: R
    } = nt(), V = $e(null);
    wr(Oh, V), wr(Ih, e.id);
    const P = Fr(zo), H = oi(), G = Rh(), { node: C, parentNode: se } = Mh(e.id), { emit: w, on: U } = fS(C, o), I = Ye(() => typeof C.draggable > "u" ? m.value : C.draggable), j = Ye(() => typeof C.selectable > "u" ? T.value : C.selectable), K = Ye(() => typeof C.connectable > "u" ? Y.value : C.connectable), ee = Ye(() => typeof C.focusable > "u" ? Q.value : C.focusable), J = Re(
      () => j.value || I.value || R.value.nodeClick.hasListeners() || R.value.nodeDoubleClick.hasListeners() || R.value.nodeMouseEnter.hasListeners() || R.value.nodeMouseMove.hasListeners() || R.value.nodeMouseLeave.hasListeners()
    ), de = Ye(() => !!C.dimensions.width && !!C.dimensions.height), A = Re(() => {
      const D = C.type || "default", B = P == null ? void 0 : P[`node-${D}`];
      if (B)
        return B;
      let q = C.template || f.value[D];
      if (typeof q == "string" && H) {
        const Ee = Object.keys(H.appContext.components);
        Ee && Ee.includes(D) && (q = mn(D, !1));
      }
      return q && typeof q != "string" ? q : (o.error(new xt(vt.NODE_TYPE_MISSING, q)), !1);
    }), z = Dh({
      id: e.id,
      el: V,
      disabled: () => !I.value,
      selectable: j,
      dragHandle: () => C.dragHandle,
      onStart(D) {
        w.dragStart(D);
      },
      onDrag(D) {
        w.drag(D);
      },
      onStop(D) {
        w.dragStop(D);
      },
      onClick(D) {
        F(D);
      }
    }), L = Re(() => C.class instanceof Function ? C.class(C) : C.class), O = Re(() => {
      const D = (C.style instanceof Function ? C.style(C) : C.style) || {}, B = C.width instanceof Function ? C.width(C) : C.width, q = C.height instanceof Function ? C.height(C) : C.height;
      return !D.width && B && (D.width = typeof B == "string" ? B : `${B}px`), !D.height && q && (D.height = typeof q == "string" ? q : `${q}px`), D;
    }), X = Ye(() => Number(C.zIndex ?? O.value.zIndex ?? 0));
    return c((D) => {
      (D.includes(e.id) || !D.length) && pe();
    }), Wn(() => {
      tt(
        () => C.hidden,
        (D = !1, B, q) => {
          !D && V.value && (e.resizeObserver.observe(V.value), q(() => {
            V.value && e.resizeObserver.unobserve(V.value);
          }));
        },
        { immediate: !0, flush: "post" }
      );
    }), tt([() => C.type, () => C.sourcePosition, () => C.targetPosition], () => {
      Pn(() => {
        l([{ id: e.id, nodeElement: V.value, forceUpdate: !0 }]);
      });
    }), tt(
      [
        () => C.position.x,
        () => C.position.y,
        () => {
          var D;
          return (D = se.value) == null ? void 0 : D.computedPosition.x;
        },
        () => {
          var D;
          return (D = se.value) == null ? void 0 : D.computedPosition.y;
        },
        () => {
          var D;
          return (D = se.value) == null ? void 0 : D.computedPosition.z;
        },
        X,
        () => C.selected,
        () => C.dimensions.height,
        () => C.dimensions.width,
        () => {
          var D;
          return (D = se.value) == null ? void 0 : D.dimensions.height;
        },
        () => {
          var D;
          return (D = se.value) == null ? void 0 : D.dimensions.width;
        }
      ],
      ([D, B, q, Ee, Ae, ne]) => {
        const Ne = {
          x: D,
          y: B,
          z: ne + (d.value && C.selected ? 1e3 : 0)
        };
        typeof q < "u" && typeof Ee < "u" ? C.computedPosition = UT({ x: q, y: Ee, z: Ae }, Ne) : C.computedPosition = Ne;
      },
      { flush: "post", immediate: !0 }
    ), tt([() => C.extent, h], ([D, B], [q, Ee]) => {
      (D !== q || B !== Ee) && le();
    }), C.extent === "parent" || typeof C.extent == "object" && "range" in C.extent && C.extent.range === "parent" ? Ns(() => de).toBe(!0).then(le) : le(), () => C.hidden ? null : Ke(
      "div",
      {
        ref: V,
        "data-id": C.id,
        class: [
          "vue-flow__node",
          `vue-flow__node-${A.value === !1 ? "default" : C.type || "default"}`,
          {
            [n.value]: I.value,
            dragging: z == null ? void 0 : z.value,
            draggable: I.value,
            selected: C.selected,
            selectable: j.value,
            parent: C.isParent
          },
          L.value
        ],
        style: {
          visibility: de.value ? "visible" : "hidden",
          zIndex: C.computedPosition.z ?? X.value,
          transform: `translate(${C.computedPosition.x}px,${C.computedPosition.y}px)`,
          pointerEvents: J.value ? "all" : "none",
          ...O.value
        },
        tabIndex: ee.value ? 0 : void 0,
        role: ee.value ? "group" : void 0,
        "aria-describedby": p.value ? void 0 : `${vh}-${t}`,
        "aria-label": C.ariaLabel,
        "aria-roledescription": "node",
        ...C.domAttributes,
        onMouseenter: me,
        onMousemove: he,
        onMouseleave: ue,
        onContextmenu: Z,
        onClick: F,
        onDblclick: _e,
        onKeydown: M
      },
      [
        Ke(A.value === !1 ? f.value.default : A.value, {
          id: C.id,
          type: C.type,
          data: C.data,
          events: { ...C.events, ...U },
          selected: C.selected,
          resizing: C.resizing,
          dragging: z.value,
          connectable: K.value,
          position: C.computedPosition,
          dimensions: C.dimensions,
          isValidTargetPos: C.isValidTargetPos,
          isValidSourcePos: C.isValidSourcePos,
          parent: C.parentNode,
          parentNodeId: C.parentNode,
          zIndex: C.computedPosition.z ?? X.value,
          targetPosition: C.targetPosition,
          sourcePosition: C.sourcePosition,
          label: C.label,
          dragHandle: C.dragHandle,
          onUpdateNodeInternals: pe
        })
      ]
    );
    function le() {
      const D = C.computedPosition, { computedPosition: B, position: q } = Fl(
        C,
        g.value ? Uo(D, x.value) : D,
        o.error,
        h.value,
        se.value
      );
      (C.computedPosition.x !== B.x || C.computedPosition.y !== B.y) && (C.computedPosition = { ...C.computedPosition, ...B }), (C.position.x !== q.x || C.position.y !== q.y) && (C.position = q);
    }
    function pe() {
      V.value && l([{ id: e.id, nodeElement: V.value, forceUpdate: !0 }]);
    }
    function me(D) {
      z != null && z.value || w.mouseEnter({ event: D, node: C });
    }
    function he(D) {
      z != null && z.value || w.mouseMove({ event: D, node: C });
    }
    function ue(D) {
      z != null && z.value || w.mouseLeave({ event: D, node: C });
    }
    function Z(D) {
      return w.contextMenu({ event: D, node: C });
    }
    function _e(D) {
      return w.doubleClick({ event: D, node: C });
    }
    function F(D) {
      j.value && (!r.value || !I.value || y.value > 0) && $s(
        C,
        a.value,
        u,
        s,
        i,
        !1,
        V.value
      ), w.click({ event: D, node: C });
    }
    function M(D) {
      if (!(Ps(D) || p.value))
        if (gh.includes(D.key) && j.value) {
          const B = D.key === "Escape";
          $s(
            C,
            a.value,
            u,
            s,
            i,
            B,
            V.value
          );
        } else I.value && C.selected && jr[D.key] && (D.preventDefault(), v.value = `Moved selected node ${D.key.replace("Arrow", "").toLowerCase()}. New position, x: ${~~C.position.x}, y: ${~~C.position.y}`, G(
          {
            x: jr[D.key].x,
            y: jr[D.key].y
          },
          D.shiftKey
        ));
    }
  }
}), I4 = k4;
function O4(e = { includeHiddenNodes: !1 }) {
  const { nodes: t } = nt();
  return Re(() => {
    if (t.value.length === 0)
      return !1;
    for (const n of t.value)
      if ((e.includeHiddenNodes || !n.hidden) && ((n == null ? void 0 : n.handleBounds) === void 0 || n.dimensions.width === 0 || n.dimensions.height === 0))
        return !1;
    return !0;
  });
}
const D4 = { class: "vue-flow__nodes vue-flow__container" }, b4 = {
  name: "Nodes",
  compatConfig: { MODE: 3 }
}, M4 = /* @__PURE__ */ Ze({
  ...b4,
  setup(e) {
    const { getNodes: t, updateNodeDimensions: n, emits: r } = nt(), i = O4(), a = $e();
    return tt(
      i,
      (o) => {
        o && Pn(() => {
          r.nodesInitialized(t.value);
        });
      },
      { immediate: !0 }
    ), Wn(() => {
      a.value = new ResizeObserver((o) => {
        const s = o.map((u) => ({
          id: u.target.getAttribute("data-id"),
          nodeElement: u.target,
          forceUpdate: !0
        }));
        Pn(() => n(s));
      });
    }), tc(() => {
      var o;
      return (o = a.value) == null ? void 0 : o.disconnect();
    }), (o, s) => (we(), Oe("div", D4, [
      a.value ? (we(!0), Oe(ct, { key: 0 }, wn(W(t), (u, l, c, f) => {
        const h = [u.id];
        if (f && f.key === u.id && Pd(f, h))
          return f;
        const d = (we(), at(W(I4), {
          id: u.id,
          key: u.id,
          "resize-observer": a.value
        }, null, 8, ["id", "resize-observer"]));
        return d.memo = h, d;
      }, s, 0), 128)) : ze("", !0)
    ]));
  }
});
function R4() {
  const { emits: e } = nt();
  Wn(() => {
    if (kh()) {
      const t = document.querySelector(".vue-flow__pane");
      t && window.getComputedStyle(t).zIndex !== "1" && e.error(new xt(vt.MISSING_STYLES));
    }
  });
}
const P4 = /* @__PURE__ */ Le("div", { class: "vue-flow__edge-labels" }, null, -1), L4 = {
  name: "VueFlow",
  compatConfig: { MODE: 3 }
}, B4 = /* @__PURE__ */ Ze({
  ...L4,
  props: {
    id: {},
    modelValue: {},
    nodes: {},
    edges: {},
    edgeTypes: {},
    nodeTypes: {},
    connectionMode: {},
    connectionLineType: {},
    connectionLineStyle: { default: void 0 },
    connectionLineOptions: { default: void 0 },
    connectionRadius: {},
    isValidConnection: { type: [Function, null], default: void 0 },
    deleteKeyCode: { default: void 0 },
    selectionKeyCode: { type: [Boolean, null], default: void 0 },
    multiSelectionKeyCode: { default: void 0 },
    zoomActivationKeyCode: { default: void 0 },
    panActivationKeyCode: { default: void 0 },
    snapToGrid: { type: Boolean, default: void 0 },
    snapGrid: {},
    onlyRenderVisibleElements: { type: Boolean, default: void 0 },
    edgesUpdatable: { type: [Boolean, String], default: void 0 },
    nodesDraggable: { type: Boolean, default: void 0 },
    nodesConnectable: { type: Boolean, default: void 0 },
    nodeDragThreshold: {},
    elementsSelectable: { type: Boolean, default: void 0 },
    selectNodesOnDrag: { type: Boolean, default: void 0 },
    panOnDrag: { type: [Boolean, Array], default: void 0 },
    minZoom: {},
    maxZoom: {},
    defaultViewport: {},
    translateExtent: {},
    nodeExtent: {},
    defaultMarkerColor: {},
    zoomOnScroll: { type: Boolean, default: void 0 },
    zoomOnPinch: { type: Boolean, default: void 0 },
    panOnScroll: { type: Boolean, default: void 0 },
    panOnScrollSpeed: {},
    panOnScrollMode: {},
    paneClickDistance: {},
    zoomOnDoubleClick: { type: Boolean, default: void 0 },
    preventScrolling: { type: Boolean, default: void 0 },
    selectionMode: {},
    edgeUpdaterRadius: {},
    fitViewOnInit: { type: Boolean, default: void 0 },
    connectOnClick: { type: Boolean, default: void 0 },
    applyDefault: { type: Boolean, default: void 0 },
    autoConnect: { type: [Boolean, Function], default: void 0 },
    noDragClassName: {},
    noWheelClassName: {},
    noPanClassName: {},
    defaultEdgeOptions: {},
    elevateEdgesOnSelect: { type: Boolean, default: void 0 },
    elevateNodesOnSelect: { type: Boolean, default: void 0 },
    disableKeyboardA11y: { type: Boolean, default: void 0 },
    edgesFocusable: { type: Boolean, default: void 0 },
    nodesFocusable: { type: Boolean, default: void 0 },
    autoPanOnConnect: { type: Boolean, default: void 0 },
    autoPanOnNodeDrag: { type: Boolean, default: void 0 },
    autoPanSpeed: {}
  },
  emits: ["nodesChange", "edgesChange", "nodesInitialized", "paneReady", "init", "updateNodeInternals", "error", "connect", "connectStart", "connectEnd", "clickConnectStart", "clickConnectEnd", "moveStart", "move", "moveEnd", "selectionDragStart", "selectionDrag", "selectionDragStop", "selectionContextMenu", "selectionStart", "selectionEnd", "viewportChangeStart", "viewportChange", "viewportChangeEnd", "paneScroll", "paneClick", "paneContextMenu", "paneMouseEnter", "paneMouseMove", "paneMouseLeave", "edgeUpdate", "edgeContextMenu", "edgeMouseEnter", "edgeMouseMove", "edgeMouseLeave", "edgeDoubleClick", "edgeClick", "edgeUpdateStart", "edgeUpdateEnd", "nodeContextMenu", "nodeMouseEnter", "nodeMouseMove", "nodeMouseLeave", "nodeDoubleClick", "nodeClick", "nodeDragStart", "nodeDrag", "nodeDragStop", "miniMapNodeClick", "miniMapNodeDoubleClick", "miniMapNodeMouseEnter", "miniMapNodeMouseMove", "miniMapNodeMouseLeave", "update:modelValue", "update:nodes", "update:edges"],
  setup(e, { expose: t, emit: n }) {
    const r = e, i = ec(), a = ss(r, "modelValue", n), o = ss(r, "nodes", n), s = ss(r, "edges", n), u = nt(r), l = pS({ modelValue: a, nodes: o, edges: s }, r, u);
    return mS(n, u.hooks), v4(), R4(), wr(zo, i), bd(l), t(u), (c, f) => (we(), Oe("div", {
      ref: W(u).vueFlowRef,
      class: "vue-flow"
    }, [
      oe(l4, null, {
        default: ve(() => [
          oe(F4),
          P4,
          oe(M4),
          lt(c.$slots, "zoom-pane")
        ]),
        _: 3
      }),
      lt(c.$slots, "default"),
      oe(d4)
    ], 512));
  }
}), $4 = {
  name: "Panel",
  compatConfig: { MODE: 3 }
}, Hh = /* @__PURE__ */ Ze({
  ...$4,
  props: {
    position: {}
  },
  setup(e) {
    const t = e, { userSelectionActive: n } = nt(), r = Re(() => `${t.position}`.split("-"));
    return (i, a) => (we(), Oe("div", {
      class: Sn(["vue-flow__panel", r.value]),
      style: Yt({ pointerEvents: W(n) ? "none" : "all" })
    }, [
      lt(i.$slots, "default")
    ], 6));
  }
});
var Mn = /* @__PURE__ */ ((e) => (e.Lines = "lines", e.Dots = "dots", e))(Mn || {});
const Vh = function({ dimensions: e, size: t, color: n }) {
  return Ke("path", {
    stroke: n,
    "stroke-width": t,
    d: `M${e[0] / 2} 0 V${e[1]} M0 ${e[1] / 2} H${e[0]}`
  });
}, Wh = function({ radius: e, color: t }) {
  return Ke("circle", { cx: e, cy: e, r: e, fill: t });
};
Mn.Lines + "", Mn.Dots + "";
const U4 = {
  [Mn.Dots]: "#81818a",
  [Mn.Lines]: "#eee"
}, z4 = ["id", "x", "y", "width", "height", "patternTransform"], H4 = {
  key: 2,
  height: "100",
  width: "100"
}, V4 = ["fill"], W4 = ["x", "y", "fill"], G4 = {
  name: "Background",
  compatConfig: { MODE: 3 }
}, X4 = /* @__PURE__ */ Ze({
  ...G4,
  props: {
    id: {},
    variant: { default: () => Mn.Dots },
    gap: { default: 20 },
    size: { default: 1 },
    lineWidth: { default: 1 },
    patternColor: {},
    color: {},
    bgColor: {},
    height: { default: 100 },
    width: { default: 100 },
    x: { default: 0 },
    y: { default: 0 },
    offset: { default: 0 }
  },
  setup(e) {
    const { id: t, viewport: n } = nt(), r = Re(() => {
      const o = n.value.zoom, [s, u] = Array.isArray(e.gap) ? e.gap : [e.gap, e.gap], l = [s * o || 1, u * o || 1], c = e.size * o, [f, h] = Array.isArray(e.offset) ? e.offset : [e.offset, e.offset], d = [f * o || 1 + l[0] / 2, h * o || 1 + l[1] / 2];
      return {
        scaledGap: l,
        offset: d,
        size: c
      };
    }), i = Ye(() => `pattern-${t}${e.id ? `-${e.id}` : ""}`), a = Ye(() => e.color || e.patternColor || U4[e.variant || Mn.Dots]);
    return (o, s) => (we(), Oe("svg", {
      class: "vue-flow__background vue-flow__container",
      style: Yt({
        height: `${o.height > 100 ? 100 : o.height}%`,
        width: `${o.width > 100 ? 100 : o.width}%`
      })
    }, [
      lt(o.$slots, "pattern-container", { id: i.value }, () => [
        Le("pattern", {
          id: i.value,
          x: W(n).x % r.value.scaledGap[0],
          y: W(n).y % r.value.scaledGap[1],
          width: r.value.scaledGap[0],
          height: r.value.scaledGap[1],
          patternTransform: `translate(-${r.value.offset[0]},-${r.value.offset[1]})`,
          patternUnits: "userSpaceOnUse"
        }, [
          lt(o.$slots, "pattern", {}, () => [
            o.variant === W(Mn).Lines ? (we(), at(W(Vh), {
              key: 0,
              size: o.lineWidth,
              color: a.value,
              dimensions: r.value.scaledGap
            }, null, 8, ["size", "color", "dimensions"])) : o.variant === W(Mn).Dots ? (we(), at(W(Wh), {
              key: 1,
              color: a.value,
              radius: r.value.size / 2
            }, null, 8, ["color", "radius"])) : ze("", !0),
            o.bgColor ? (we(), Oe("svg", H4, [
              Le("rect", {
                width: "100%",
                height: "100%",
                fill: o.bgColor
              }, null, 8, V4)
            ])) : ze("", !0)
          ])
        ], 8, z4)
      ]),
      Le("rect", {
        x: o.x,
        y: o.y,
        width: "100%",
        height: "100%",
        fill: `url(#${i.value})`
      }, null, 8, W4),
      lt(o.$slots, "default", { id: i.value })
    ], 4));
  }
});
var Y4 = { value: () => {
} };
function Ol() {
  for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
    if (!(r = arguments[e] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Ha(n);
}
function Ha(e) {
  this._ = e;
}
function K4(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Ha.prototype = Ol.prototype = {
  constructor: Ha,
  on: function(e, t) {
    var n = this._, r = K4(e + "", n), i, a = -1, o = r.length;
    if (arguments.length < 2) {
      for (; ++a < o; ) if ((i = (e = r[a]).type) && (i = Z4(n[i], e.name))) return i;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++a < o; )
      if (i = (e = r[a]).type) n[i] = D0(n[i], e.name, t);
      else if (t == null) for (i in n) n[i] = D0(n[i], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new Ha(e);
  },
  call: function(e, t) {
    if ((i = arguments.length - 2) > 0) for (var n = new Array(i), r = 0, i, a; r < i; ++r) n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (a = this._[e], r = 0, i = a.length; r < i; ++r) a[r].value.apply(t, n);
  },
  apply: function(e, t, n) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var r = this._[e], i = 0, a = r.length; i < a; ++i) r[i].value.apply(t, n);
  }
};
function Z4(e, t) {
  for (var n = 0, r = e.length, i; n < r; ++n)
    if ((i = e[n]).name === t)
      return i.value;
}
function D0(e, t, n) {
  for (var r = 0, i = e.length; r < i; ++r)
    if (e[r].name === t) {
      e[r] = Y4, e = e.slice(0, r).concat(e.slice(r + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var zs = "http://www.w3.org/1999/xhtml";
const b0 = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: zs,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Xo(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), b0.hasOwnProperty(t) ? { space: b0[t], local: e } : e;
}
function q4(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === zs && t.documentElement.namespaceURI === zs ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function j4(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Gh(e) {
  var t = Xo(e);
  return (t.local ? j4 : q4)(t);
}
function J4() {
}
function Dl(e) {
  return e == null ? J4 : function() {
    return this.querySelector(e);
  };
}
function Q4(e) {
  typeof e != "function" && (e = Dl(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = t[i], o = a.length, s = r[i] = new Array(o), u, l, c = 0; c < o; ++c)
      (u = a[c]) && (l = e.call(u, u.__data__, c, a)) && ("__data__" in u && (l.__data__ = u.__data__), s[c] = l);
  return new qt(r, this._parents);
}
function e3(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function t3() {
  return [];
}
function Xh(e) {
  return e == null ? t3 : function() {
    return this.querySelectorAll(e);
  };
}
function n3(e) {
  return function() {
    return e3(e.apply(this, arguments));
  };
}
function r3(e) {
  typeof e == "function" ? e = n3(e) : e = Xh(e);
  for (var t = this._groups, n = t.length, r = [], i = [], a = 0; a < n; ++a)
    for (var o = t[a], s = o.length, u, l = 0; l < s; ++l)
      (u = o[l]) && (r.push(e.call(u, u.__data__, l, o)), i.push(u));
  return new qt(r, i);
}
function Yh(e) {
  return function() {
    return this.matches(e);
  };
}
function Kh(e) {
  return function(t) {
    return t.matches(e);
  };
}
var i3 = Array.prototype.find;
function a3(e) {
  return function() {
    return i3.call(this.children, e);
  };
}
function o3() {
  return this.firstElementChild;
}
function s3(e) {
  return this.select(e == null ? o3 : a3(typeof e == "function" ? e : Kh(e)));
}
var l3 = Array.prototype.filter;
function u3() {
  return Array.from(this.children);
}
function c3(e) {
  return function() {
    return l3.call(this.children, e);
  };
}
function f3(e) {
  return this.selectAll(e == null ? u3 : c3(typeof e == "function" ? e : Kh(e)));
}
function h3(e) {
  typeof e != "function" && (e = Yh(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = t[i], o = a.length, s = r[i] = [], u, l = 0; l < o; ++l)
      (u = a[l]) && e.call(u, u.__data__, l, a) && s.push(u);
  return new qt(r, this._parents);
}
function Zh(e) {
  return new Array(e.length);
}
function d3() {
  return new qt(this._enter || this._groups.map(Zh), this._parents);
}
function yo(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
yo.prototype = {
  constructor: yo,
  appendChild: function(e) {
    return this._parent.insertBefore(e, this._next);
  },
  insertBefore: function(e, t) {
    return this._parent.insertBefore(e, t);
  },
  querySelector: function(e) {
    return this._parent.querySelector(e);
  },
  querySelectorAll: function(e) {
    return this._parent.querySelectorAll(e);
  }
};
function v3(e) {
  return function() {
    return e;
  };
}
function p3(e, t, n, r, i, a) {
  for (var o = 0, s, u = t.length, l = a.length; o < l; ++o)
    (s = t[o]) ? (s.__data__ = a[o], r[o] = s) : n[o] = new yo(e, a[o]);
  for (; o < u; ++o)
    (s = t[o]) && (i[o] = s);
}
function g3(e, t, n, r, i, a, o) {
  var s, u, l = /* @__PURE__ */ new Map(), c = t.length, f = a.length, h = new Array(c), d;
  for (s = 0; s < c; ++s)
    (u = t[s]) && (h[s] = d = o.call(u, u.__data__, s, t) + "", l.has(d) ? i[s] = u : l.set(d, u));
  for (s = 0; s < f; ++s)
    d = o.call(e, a[s], s, a) + "", (u = l.get(d)) ? (r[s] = u, u.__data__ = a[s], l.delete(d)) : n[s] = new yo(e, a[s]);
  for (s = 0; s < c; ++s)
    (u = t[s]) && l.get(h[s]) === u && (i[s] = u);
}
function m3(e) {
  return e.__data__;
}
function x3(e, t) {
  if (!arguments.length) return Array.from(this, m3);
  var n = t ? g3 : p3, r = this._parents, i = this._groups;
  typeof e != "function" && (e = v3(e));
  for (var a = i.length, o = new Array(a), s = new Array(a), u = new Array(a), l = 0; l < a; ++l) {
    var c = r[l], f = i[l], h = f.length, d = _3(e.call(c, c && c.__data__, l, r)), p = d.length, v = s[l] = new Array(p), g = o[l] = new Array(p), x = u[l] = new Array(h);
    n(c, f, v, g, x, d, t);
    for (var y = 0, m = 0, T, Y; y < p; ++y)
      if (T = v[y]) {
        for (y >= m && (m = y + 1); !(Y = g[m]) && ++m < p; ) ;
        T._next = Y || null;
      }
  }
  return o = new qt(o, r), o._enter = s, o._exit = u, o;
}
function _3(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function w3() {
  return new qt(this._exit || this._groups.map(Zh), this._parents);
}
function y3(e, t, n) {
  var r = this.enter(), i = this, a = this.exit();
  return typeof e == "function" ? (r = e(r), r && (r = r.selection())) : r = r.append(e + ""), t != null && (i = t(i), i && (i = i.selection())), n == null ? a.remove() : n(a), r && i ? r.merge(i).order() : i;
}
function E3(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, r = t._groups, i = n.length, a = r.length, o = Math.min(i, a), s = new Array(i), u = 0; u < o; ++u)
    for (var l = n[u], c = r[u], f = l.length, h = s[u] = new Array(f), d, p = 0; p < f; ++p)
      (d = l[p] || c[p]) && (h[p] = d);
  for (; u < i; ++u)
    s[u] = n[u];
  return new qt(s, this._parents);
}
function T3() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var r = e[t], i = r.length - 1, a = r[i], o; --i >= 0; )
      (o = r[i]) && (a && o.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(o, a), a = o);
  return this;
}
function S3(e) {
  e || (e = A3);
  function t(f, h) {
    return f && h ? e(f.__data__, h.__data__) : !f - !h;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), a = 0; a < r; ++a) {
    for (var o = n[a], s = o.length, u = i[a] = new Array(s), l, c = 0; c < s; ++c)
      (l = o[c]) && (u[c] = l);
    u.sort(t);
  }
  return new qt(i, this._parents).order();
}
function A3(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function C3() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function N3() {
  return Array.from(this);
}
function F3() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], i = 0, a = r.length; i < a; ++i) {
      var o = r[i];
      if (o) return o;
    }
  return null;
}
function k3() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function I3() {
  return !this.node();
}
function O3(e) {
  for (var t = this._groups, n = 0, r = t.length; n < r; ++n)
    for (var i = t[n], a = 0, o = i.length, s; a < o; ++a)
      (s = i[a]) && e.call(s, s.__data__, a, i);
  return this;
}
function D3(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function b3(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function M3(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function R3(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function P3(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function L3(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function B3(e, t) {
  var n = Xo(e);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((t == null ? n.local ? b3 : D3 : typeof t == "function" ? n.local ? L3 : P3 : n.local ? R3 : M3)(n, t));
}
function qh(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function $3(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function U3(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function z3(e, t, n) {
  return function() {
    var r = t.apply(this, arguments);
    r == null ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
  };
}
function H3(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? $3 : typeof t == "function" ? z3 : U3)(e, t, n ?? "")) : ii(this.node(), e);
}
function ii(e, t) {
  return e.style.getPropertyValue(t) || qh(e).getComputedStyle(e, null).getPropertyValue(t);
}
function V3(e) {
  return function() {
    delete this[e];
  };
}
function W3(e, t) {
  return function() {
    this[e] = t;
  };
}
function G3(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function X3(e, t) {
  return arguments.length > 1 ? this.each((t == null ? V3 : typeof t == "function" ? G3 : W3)(e, t)) : this.node()[e];
}
function jh(e) {
  return e.trim().split(/^|\s+/);
}
function bl(e) {
  return e.classList || new Jh(e);
}
function Jh(e) {
  this._node = e, this._names = jh(e.getAttribute("class") || "");
}
Jh.prototype = {
  add: function(e) {
    var t = this._names.indexOf(e);
    t < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(e) {
    var t = this._names.indexOf(e);
    t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(e) {
    return this._names.indexOf(e) >= 0;
  }
};
function Qh(e, t) {
  for (var n = bl(e), r = -1, i = t.length; ++r < i; ) n.add(t[r]);
}
function ed(e, t) {
  for (var n = bl(e), r = -1, i = t.length; ++r < i; ) n.remove(t[r]);
}
function Y3(e) {
  return function() {
    Qh(this, e);
  };
}
function K3(e) {
  return function() {
    ed(this, e);
  };
}
function Z3(e, t) {
  return function() {
    (t.apply(this, arguments) ? Qh : ed)(this, e);
  };
}
function q3(e, t) {
  var n = jh(e + "");
  if (arguments.length < 2) {
    for (var r = bl(this.node()), i = -1, a = n.length; ++i < a; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Z3 : t ? Y3 : K3)(n, t));
}
function j3() {
  this.textContent = "";
}
function J3(e) {
  return function() {
    this.textContent = e;
  };
}
function Q3(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function eA(e) {
  return arguments.length ? this.each(e == null ? j3 : (typeof e == "function" ? Q3 : J3)(e)) : this.node().textContent;
}
function tA() {
  this.innerHTML = "";
}
function nA(e) {
  return function() {
    this.innerHTML = e;
  };
}
function rA(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function iA(e) {
  return arguments.length ? this.each(e == null ? tA : (typeof e == "function" ? rA : nA)(e)) : this.node().innerHTML;
}
function aA() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function oA() {
  return this.each(aA);
}
function sA() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lA() {
  return this.each(sA);
}
function uA(e) {
  var t = typeof e == "function" ? e : Gh(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function cA() {
  return null;
}
function fA(e, t) {
  var n = typeof e == "function" ? e : Gh(e), r = t == null ? cA : typeof t == "function" ? t : Dl(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function hA() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function dA() {
  return this.each(hA);
}
function vA() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function pA() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function gA(e) {
  return this.select(e ? pA : vA);
}
function mA(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function xA(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function _A(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", r = t.indexOf(".");
    return r >= 0 && (n = t.slice(r + 1), t = t.slice(0, r)), { type: t, name: n };
  });
}
function wA(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, r = -1, i = t.length, a; n < i; ++n)
        a = t[n], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++r] = a;
      ++r ? t.length = r : delete this.__on;
    }
  };
}
function yA(e, t, n) {
  return function() {
    var r = this.__on, i, a = xA(t);
    if (r) {
      for (var o = 0, s = r.length; o < s; ++o)
        if ((i = r[o]).type === e.type && i.name === e.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = a, i.options = n), i.value = t;
          return;
        }
    }
    this.addEventListener(e.type, a, n), i = { type: e.type, name: e.name, value: t, listener: a, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function EA(e, t, n) {
  var r = _A(e + ""), i, a = r.length, o;
  if (arguments.length < 2) {
    var s = this.node().__on;
    if (s) {
      for (var u = 0, l = s.length, c; u < l; ++u)
        for (i = 0, c = s[u]; i < a; ++i)
          if ((o = r[i]).type === c.type && o.name === c.name)
            return c.value;
    }
    return;
  }
  for (s = t ? yA : wA, i = 0; i < a; ++i) this.each(s(r[i], t, n));
  return this;
}
function td(e, t, n) {
  var r = qh(e), i = r.CustomEvent;
  typeof i == "function" ? i = new i(t, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(t, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(t, !1, !1)), e.dispatchEvent(i);
}
function TA(e, t) {
  return function() {
    return td(this, e, t);
  };
}
function SA(e, t) {
  return function() {
    return td(this, e, t.apply(this, arguments));
  };
}
function AA(e, t) {
  return this.each((typeof t == "function" ? SA : TA)(e, t));
}
function* CA() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], i = 0, a = r.length, o; i < a; ++i)
      (o = r[i]) && (yield o);
}
var nd = [null];
function qt(e, t) {
  this._groups = e, this._parents = t;
}
function ua() {
  return new qt([[document.documentElement]], nd);
}
function NA() {
  return this;
}
qt.prototype = ua.prototype = {
  constructor: qt,
  select: Q4,
  selectAll: r3,
  selectChild: s3,
  selectChildren: f3,
  filter: h3,
  data: x3,
  enter: d3,
  exit: w3,
  join: y3,
  merge: E3,
  selection: NA,
  order: T3,
  sort: S3,
  call: C3,
  nodes: N3,
  node: F3,
  size: k3,
  empty: I3,
  each: O3,
  attr: B3,
  style: H3,
  property: X3,
  classed: q3,
  text: eA,
  html: iA,
  raise: oA,
  lower: lA,
  append: uA,
  insert: fA,
  remove: dA,
  clone: gA,
  datum: mA,
  on: EA,
  dispatch: AA,
  [Symbol.iterator]: CA
};
function Jn(e) {
  return typeof e == "string" ? new qt([[document.querySelector(e)]], [document.documentElement]) : new qt([[e]], nd);
}
function FA(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function Zn(e, t) {
  if (e = FA(e), t === void 0 && (t = e.currentTarget), t) {
    var n = t.ownerSVGElement || t;
    if (n.createSVGPoint) {
      var r = n.createSVGPoint();
      return r.x = e.clientX, r.y = e.clientY, r = r.matrixTransform(t.getScreenCTM().inverse()), [r.x, r.y];
    }
    if (t.getBoundingClientRect) {
      var i = t.getBoundingClientRect();
      return [e.clientX - i.left - t.clientLeft, e.clientY - i.top - t.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
const Hs = { capture: !0, passive: !1 };
function Vs(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function kA(e) {
  var t = e.document.documentElement, n = Jn(e).on("dragstart.drag", Vs, Hs);
  "onselectstart" in t ? n.on("selectstart.drag", Vs, Hs) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function IA(e, t) {
  var n = e.document.documentElement, r = Jn(e).on("dragstart.drag", null);
  t && (r.on("click.drag", Vs, Hs), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
function Ml(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function rd(e, t) {
  var n = Object.create(e.prototype);
  for (var r in t) n[r] = t[r];
  return n;
}
function ca() {
}
var qi = 0.7, Eo = 1 / qi, Jr = "\\s*([+-]?\\d+)\\s*", ji = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Tn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", OA = /^#([0-9a-f]{3,8})$/, DA = new RegExp(`^rgb\\(${Jr},${Jr},${Jr}\\)$`), bA = new RegExp(`^rgb\\(${Tn},${Tn},${Tn}\\)$`), MA = new RegExp(`^rgba\\(${Jr},${Jr},${Jr},${ji}\\)$`), RA = new RegExp(`^rgba\\(${Tn},${Tn},${Tn},${ji}\\)$`), PA = new RegExp(`^hsl\\(${ji},${Tn},${Tn}\\)$`), LA = new RegExp(`^hsla\\(${ji},${Tn},${Tn},${ji}\\)$`), M0 = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Ml(ca, Ji, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: R0,
  // Deprecated! Use color.formatHex.
  formatHex: R0,
  formatHex8: BA,
  formatHsl: $A,
  formatRgb: P0,
  toString: P0
});
function R0() {
  return this.rgb().formatHex();
}
function BA() {
  return this.rgb().formatHex8();
}
function $A() {
  return id(this).formatHsl();
}
function P0() {
  return this.rgb().formatRgb();
}
function Ji(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = OA.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? L0(t) : n === 3 ? new Bt(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Ia(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Ia(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = DA.exec(e)) ? new Bt(t[1], t[2], t[3], 1) : (t = bA.exec(e)) ? new Bt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = MA.exec(e)) ? Ia(t[1], t[2], t[3], t[4]) : (t = RA.exec(e)) ? Ia(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = PA.exec(e)) ? U0(t[1], t[2] / 100, t[3] / 100, 1) : (t = LA.exec(e)) ? U0(t[1], t[2] / 100, t[3] / 100, t[4]) : M0.hasOwnProperty(e) ? L0(M0[e]) : e === "transparent" ? new Bt(NaN, NaN, NaN, 0) : null;
}
function L0(e) {
  return new Bt(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Ia(e, t, n, r) {
  return r <= 0 && (e = t = n = NaN), new Bt(e, t, n, r);
}
function UA(e) {
  return e instanceof ca || (e = Ji(e)), e ? (e = e.rgb(), new Bt(e.r, e.g, e.b, e.opacity)) : new Bt();
}
function Ws(e, t, n, r) {
  return arguments.length === 1 ? UA(e) : new Bt(e, t, n, r ?? 1);
}
function Bt(e, t, n, r) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
Ml(Bt, Ws, rd(ca, {
  brighter(e) {
    return e = e == null ? Eo : Math.pow(Eo, e), new Bt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? qi : Math.pow(qi, e), new Bt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Bt(_r(this.r), _r(this.g), _r(this.b), To(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: B0,
  // Deprecated! Use color.formatHex.
  formatHex: B0,
  formatHex8: zA,
  formatRgb: $0,
  toString: $0
}));
function B0() {
  return `#${pr(this.r)}${pr(this.g)}${pr(this.b)}`;
}
function zA() {
  return `#${pr(this.r)}${pr(this.g)}${pr(this.b)}${pr((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function $0() {
  const e = To(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${_r(this.r)}, ${_r(this.g)}, ${_r(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function To(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function _r(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function pr(e) {
  return e = _r(e), (e < 16 ? "0" : "") + e.toString(16);
}
function U0(e, t, n, r) {
  return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new sn(e, t, n, r);
}
function id(e) {
  if (e instanceof sn) return new sn(e.h, e.s, e.l, e.opacity);
  if (e instanceof ca || (e = Ji(e)), !e) return new sn();
  if (e instanceof sn) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), a = Math.max(t, n, r), o = NaN, s = a - i, u = (a + i) / 2;
  return s ? (t === a ? o = (n - r) / s + (n < r) * 6 : n === a ? o = (r - t) / s + 2 : o = (t - n) / s + 4, s /= u < 0.5 ? a + i : 2 - a - i, o *= 60) : s = u > 0 && u < 1 ? 0 : o, new sn(o, s, u, e.opacity);
}
function HA(e, t, n, r) {
  return arguments.length === 1 ? id(e) : new sn(e, t, n, r ?? 1);
}
function sn(e, t, n, r) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
Ml(sn, HA, rd(ca, {
  brighter(e) {
    return e = e == null ? Eo : Math.pow(Eo, e), new sn(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? qi : Math.pow(qi, e), new sn(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * t, i = 2 * n - r;
    return new Bt(
      xs(e >= 240 ? e - 240 : e + 120, i, r),
      xs(e, i, r),
      xs(e < 120 ? e + 240 : e - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new sn(z0(this.h), Oa(this.s), Oa(this.l), To(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = To(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${z0(this.h)}, ${Oa(this.s) * 100}%, ${Oa(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function z0(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Oa(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function xs(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const ad = (e) => () => e;
function VA(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function WA(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(r) {
    return Math.pow(e + r * t, n);
  };
}
function GA(e) {
  return (e = +e) == 1 ? od : function(t, n) {
    return n - t ? WA(t, n, e) : ad(isNaN(t) ? n : t);
  };
}
function od(e, t) {
  var n = t - e;
  return n ? VA(e, n) : ad(isNaN(e) ? t : e);
}
const H0 = function e(t) {
  var n = GA(t);
  function r(i, a) {
    var o = n((i = Ws(i)).r, (a = Ws(a)).r), s = n(i.g, a.g), u = n(i.b, a.b), l = od(i.opacity, a.opacity);
    return function(c) {
      return i.r = o(c), i.g = s(c), i.b = u(c), i.opacity = l(c), i + "";
    };
  }
  return r.gamma = e, r;
}(1);
function jn(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
var Gs = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, _s = new RegExp(Gs.source, "g");
function XA(e) {
  return function() {
    return e;
  };
}
function YA(e) {
  return function(t) {
    return e(t) + "";
  };
}
function KA(e, t) {
  var n = Gs.lastIndex = _s.lastIndex = 0, r, i, a, o = -1, s = [], u = [];
  for (e = e + "", t = t + ""; (r = Gs.exec(e)) && (i = _s.exec(t)); )
    (a = i.index) > n && (a = t.slice(n, a), s[o] ? s[o] += a : s[++o] = a), (r = r[0]) === (i = i[0]) ? s[o] ? s[o] += i : s[++o] = i : (s[++o] = null, u.push({ i: o, x: jn(r, i) })), n = _s.lastIndex;
  return n < t.length && (a = t.slice(n), s[o] ? s[o] += a : s[++o] = a), s.length < 2 ? u[0] ? YA(u[0].x) : XA(t) : (t = u.length, function(l) {
    for (var c = 0, f; c < t; ++c) s[(f = u[c]).i] = f.x(l);
    return s.join("");
  });
}
var V0 = 180 / Math.PI, Xs = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function sd(e, t, n, r, i, a) {
  var o, s, u;
  return (o = Math.sqrt(e * e + t * t)) && (e /= o, t /= o), (u = e * n + t * r) && (n -= e * u, r -= t * u), (s = Math.sqrt(n * n + r * r)) && (n /= s, r /= s, u /= s), e * r < t * n && (e = -e, t = -t, u = -u, o = -o), {
    translateX: i,
    translateY: a,
    rotate: Math.atan2(t, e) * V0,
    skewX: Math.atan(u) * V0,
    scaleX: o,
    scaleY: s
  };
}
var Da;
function ZA(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Xs : sd(t.a, t.b, t.c, t.d, t.e, t.f);
}
function qA(e) {
  return e == null || (Da || (Da = document.createElementNS("http://www.w3.org/2000/svg", "g")), Da.setAttribute("transform", e), !(e = Da.transform.baseVal.consolidate())) ? Xs : (e = e.matrix, sd(e.a, e.b, e.c, e.d, e.e, e.f));
}
function ld(e, t, n, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function a(l, c, f, h, d, p) {
    if (l !== f || c !== h) {
      var v = d.push("translate(", null, t, null, n);
      p.push({ i: v - 4, x: jn(l, f) }, { i: v - 2, x: jn(c, h) });
    } else (f || h) && d.push("translate(" + f + t + h + n);
  }
  function o(l, c, f, h) {
    l !== c ? (l - c > 180 ? c += 360 : c - l > 180 && (l += 360), h.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: jn(l, c) })) : c && f.push(i(f) + "rotate(" + c + r);
  }
  function s(l, c, f, h) {
    l !== c ? h.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: jn(l, c) }) : c && f.push(i(f) + "skewX(" + c + r);
  }
  function u(l, c, f, h, d, p) {
    if (l !== f || c !== h) {
      var v = d.push(i(d) + "scale(", null, ",", null, ")");
      p.push({ i: v - 4, x: jn(l, f) }, { i: v - 2, x: jn(c, h) });
    } else (f !== 1 || h !== 1) && d.push(i(d) + "scale(" + f + "," + h + ")");
  }
  return function(l, c) {
    var f = [], h = [];
    return l = e(l), c = e(c), a(l.translateX, l.translateY, c.translateX, c.translateY, f, h), o(l.rotate, c.rotate, f, h), s(l.skewX, c.skewX, f, h), u(l.scaleX, l.scaleY, c.scaleX, c.scaleY, f, h), l = c = null, function(d) {
      for (var p = -1, v = h.length, g; ++p < v; ) f[(g = h[p]).i] = g.x(d);
      return f.join("");
    };
  };
}
var jA = ld(ZA, "px, ", "px)", "deg)"), JA = ld(qA, ", ", ")", ")"), QA = 1e-12;
function W0(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function eC(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function tC(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const nC = function e(t, n, r) {
  function i(a, o) {
    var s = a[0], u = a[1], l = a[2], c = o[0], f = o[1], h = o[2], d = c - s, p = f - u, v = d * d + p * p, g, x;
    if (v < QA)
      x = Math.log(h / l) / t, g = function(R) {
        return [
          s + R * d,
          u + R * p,
          l * Math.exp(t * R * x)
        ];
      };
    else {
      var y = Math.sqrt(v), m = (h * h - l * l + r * v) / (2 * l * n * y), T = (h * h - l * l - r * v) / (2 * h * n * y), Y = Math.log(Math.sqrt(m * m + 1) - m), Q = Math.log(Math.sqrt(T * T + 1) - T);
      x = (Q - Y) / t, g = function(R) {
        var V = R * x, P = W0(Y), H = l / (n * y) * (P * tC(t * V + Y) - eC(Y));
        return [
          s + H * d,
          u + H * p,
          l * P / W0(t * V + Y)
        ];
      };
    }
    return g.duration = x * 1e3 * t / Math.SQRT2, g;
  }
  return i.rho = function(a) {
    var o = Math.max(1e-3, +a), s = o * o, u = s * s;
    return e(o, s, u);
  }, i;
}(Math.SQRT2, 2, 4);
var ai = 0, Ti = 0, mi = 0, ud = 1e3, So, Si, Ao = 0, Nr = 0, Yo = 0, Qi = typeof performance == "object" && performance.now ? performance : Date, cd = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Rl() {
  return Nr || (cd(rC), Nr = Qi.now() + Yo);
}
function rC() {
  Nr = 0;
}
function Co() {
  this._call = this._time = this._next = null;
}
Co.prototype = fd.prototype = {
  constructor: Co,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Rl() : +n) + (t == null ? 0 : +t), !this._next && Si !== this && (Si ? Si._next = this : So = this, Si = this), this._call = e, this._time = n, Ys();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ys());
  }
};
function fd(e, t, n) {
  var r = new Co();
  return r.restart(e, t, n), r;
}
function iC() {
  Rl(), ++ai;
  for (var e = So, t; e; )
    (t = Nr - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --ai;
}
function G0() {
  Nr = (Ao = Qi.now()) + Yo, ai = Ti = 0;
  try {
    iC();
  } finally {
    ai = 0, oC(), Nr = 0;
  }
}
function aC() {
  var e = Qi.now(), t = e - Ao;
  t > ud && (Yo -= t, Ao = e);
}
function oC() {
  for (var e, t = So, n, r = 1 / 0; t; )
    t._call ? (r > t._time && (r = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : So = n);
  Si = e, Ys(r);
}
function Ys(e) {
  if (!ai) {
    Ti && (Ti = clearTimeout(Ti));
    var t = e - Nr;
    t > 24 ? (e < 1 / 0 && (Ti = setTimeout(G0, e - Qi.now() - Yo)), mi && (mi = clearInterval(mi))) : (mi || (Ao = Qi.now(), mi = setInterval(aC, ud)), ai = 1, cd(G0));
  }
}
function X0(e, t, n) {
  var r = new Co();
  return t = t == null ? 0 : +t, r.restart((i) => {
    r.stop(), e(i + t);
  }, t, n), r;
}
var sC = Ol("start", "end", "cancel", "interrupt"), lC = [], hd = 0, Y0 = 1, Ks = 2, Va = 3, K0 = 4, Zs = 5, Wa = 6;
function Ko(e, t, n, r, i, a) {
  var o = e.__transition;
  if (!o) e.__transition = {};
  else if (n in o) return;
  uC(e, n, {
    name: t,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: sC,
    tween: lC,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: hd
  });
}
function Pl(e, t) {
  var n = fn(e, t);
  if (n.state > hd) throw new Error("too late; already scheduled");
  return n;
}
function Nn(e, t) {
  var n = fn(e, t);
  if (n.state > Va) throw new Error("too late; already running");
  return n;
}
function fn(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function uC(e, t, n) {
  var r = e.__transition, i;
  r[t] = n, n.timer = fd(a, 0, n.time);
  function a(l) {
    n.state = Y0, n.timer.restart(o, n.delay, n.time), n.delay <= l && o(l - n.delay);
  }
  function o(l) {
    var c, f, h, d;
    if (n.state !== Y0) return u();
    for (c in r)
      if (d = r[c], d.name === n.name) {
        if (d.state === Va) return X0(o);
        d.state === K0 ? (d.state = Wa, d.timer.stop(), d.on.call("interrupt", e, e.__data__, d.index, d.group), delete r[c]) : +c < t && (d.state = Wa, d.timer.stop(), d.on.call("cancel", e, e.__data__, d.index, d.group), delete r[c]);
      }
    if (X0(function() {
      n.state === Va && (n.state = K0, n.timer.restart(s, n.delay, n.time), s(l));
    }), n.state = Ks, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Ks) {
      for (n.state = Va, i = new Array(h = n.tween.length), c = 0, f = -1; c < h; ++c)
        (d = n.tween[c].value.call(e, e.__data__, n.index, n.group)) && (i[++f] = d);
      i.length = f + 1;
    }
  }
  function s(l) {
    for (var c = l < n.duration ? n.ease.call(null, l / n.duration) : (n.timer.restart(u), n.state = Zs, 1), f = -1, h = i.length; ++f < h; )
      i[f].call(e, c);
    n.state === Zs && (n.on.call("end", e, e.__data__, n.index, n.group), u());
  }
  function u() {
    n.state = Wa, n.timer.stop(), delete r[t];
    for (var l in r) return;
    delete e.__transition;
  }
}
function Ga(e, t) {
  var n = e.__transition, r, i, a = !0, o;
  if (n) {
    t = t == null ? null : t + "";
    for (o in n) {
      if ((r = n[o]).name !== t) {
        a = !1;
        continue;
      }
      i = r.state > Ks && r.state < Zs, r.state = Wa, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", e, e.__data__, r.index, r.group), delete n[o];
    }
    a && delete e.__transition;
  }
}
function cC(e) {
  return this.each(function() {
    Ga(this, e);
  });
}
function fC(e, t) {
  var n, r;
  return function() {
    var i = Nn(this, e), a = i.tween;
    if (a !== n) {
      r = n = a;
      for (var o = 0, s = r.length; o < s; ++o)
        if (r[o].name === t) {
          r = r.slice(), r.splice(o, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function hC(e, t, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var a = Nn(this, e), o = a.tween;
    if (o !== r) {
      i = (r = o).slice();
      for (var s = { name: t, value: n }, u = 0, l = i.length; u < l; ++u)
        if (i[u].name === t) {
          i[u] = s;
          break;
        }
      u === l && i.push(s);
    }
    a.tween = i;
  };
}
function dC(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var r = fn(this.node(), n).tween, i = 0, a = r.length, o; i < a; ++i)
      if ((o = r[i]).name === e)
        return o.value;
    return null;
  }
  return this.each((t == null ? fC : hC)(n, e, t));
}
function Ll(e, t, n) {
  var r = e._id;
  return e.each(function() {
    var i = Nn(this, r);
    (i.value || (i.value = {}))[t] = n.apply(this, arguments);
  }), function(i) {
    return fn(i, r).value[t];
  };
}
function dd(e, t) {
  var n;
  return (typeof t == "number" ? jn : t instanceof Ji ? H0 : (n = Ji(t)) ? (t = n, H0) : KA)(e, t);
}
function vC(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function pC(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function gC(e, t, n) {
  var r, i = n + "", a;
  return function() {
    var o = this.getAttribute(e);
    return o === i ? null : o === r ? a : a = t(r = o, n);
  };
}
function mC(e, t, n) {
  var r, i = n + "", a;
  return function() {
    var o = this.getAttributeNS(e.space, e.local);
    return o === i ? null : o === r ? a : a = t(r = o, n);
  };
}
function xC(e, t, n) {
  var r, i, a;
  return function() {
    var o, s = n(this), u;
    return s == null ? void this.removeAttribute(e) : (o = this.getAttribute(e), u = s + "", o === u ? null : o === r && u === i ? a : (i = u, a = t(r = o, s)));
  };
}
function _C(e, t, n) {
  var r, i, a;
  return function() {
    var o, s = n(this), u;
    return s == null ? void this.removeAttributeNS(e.space, e.local) : (o = this.getAttributeNS(e.space, e.local), u = s + "", o === u ? null : o === r && u === i ? a : (i = u, a = t(r = o, s)));
  };
}
function wC(e, t) {
  var n = Xo(e), r = n === "transform" ? JA : dd;
  return this.attrTween(e, typeof t == "function" ? (n.local ? _C : xC)(n, r, Ll(this, "attr." + e, t)) : t == null ? (n.local ? pC : vC)(n) : (n.local ? mC : gC)(n, r, t));
}
function yC(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function EC(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function TC(e, t) {
  var n, r;
  function i() {
    var a = t.apply(this, arguments);
    return a !== r && (n = (r = a) && EC(e, a)), n;
  }
  return i._value = t, i;
}
function SC(e, t) {
  var n, r;
  function i() {
    var a = t.apply(this, arguments);
    return a !== r && (n = (r = a) && yC(e, a)), n;
  }
  return i._value = t, i;
}
function AC(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var r = Xo(e);
  return this.tween(n, (r.local ? TC : SC)(r, t));
}
function CC(e, t) {
  return function() {
    Pl(this, e).delay = +t.apply(this, arguments);
  };
}
function NC(e, t) {
  return t = +t, function() {
    Pl(this, e).delay = t;
  };
}
function FC(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? CC : NC)(t, e)) : fn(this.node(), t).delay;
}
function kC(e, t) {
  return function() {
    Nn(this, e).duration = +t.apply(this, arguments);
  };
}
function IC(e, t) {
  return t = +t, function() {
    Nn(this, e).duration = t;
  };
}
function OC(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? kC : IC)(t, e)) : fn(this.node(), t).duration;
}
function DC(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Nn(this, e).ease = t;
  };
}
function bC(e) {
  var t = this._id;
  return arguments.length ? this.each(DC(t, e)) : fn(this.node(), t).ease;
}
function MC(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Nn(this, e).ease = n;
  };
}
function RC(e) {
  if (typeof e != "function") throw new Error();
  return this.each(MC(this._id, e));
}
function PC(e) {
  typeof e != "function" && (e = Yh(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = t[i], o = a.length, s = r[i] = [], u, l = 0; l < o; ++l)
      (u = a[l]) && e.call(u, u.__data__, l, a) && s.push(u);
  return new Vn(r, this._parents, this._name, this._id);
}
function LC(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, r = t.length, i = n.length, a = Math.min(r, i), o = new Array(r), s = 0; s < a; ++s)
    for (var u = t[s], l = n[s], c = u.length, f = o[s] = new Array(c), h, d = 0; d < c; ++d)
      (h = u[d] || l[d]) && (f[d] = h);
  for (; s < r; ++s)
    o[s] = t[s];
  return new Vn(o, this._parents, this._name, this._id);
}
function BC(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function $C(e, t, n) {
  var r, i, a = BC(t) ? Pl : Nn;
  return function() {
    var o = a(this, e), s = o.on;
    s !== r && (i = (r = s).copy()).on(t, n), o.on = i;
  };
}
function UC(e, t) {
  var n = this._id;
  return arguments.length < 2 ? fn(this.node(), n).on.on(e) : this.each($C(n, e, t));
}
function zC(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function HC() {
  return this.on("end.remove", zC(this._id));
}
function VC(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Dl(e));
  for (var r = this._groups, i = r.length, a = new Array(i), o = 0; o < i; ++o)
    for (var s = r[o], u = s.length, l = a[o] = new Array(u), c, f, h = 0; h < u; ++h)
      (c = s[h]) && (f = e.call(c, c.__data__, h, s)) && ("__data__" in c && (f.__data__ = c.__data__), l[h] = f, Ko(l[h], t, n, h, l, fn(c, n)));
  return new Vn(a, this._parents, t, n);
}
function WC(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Xh(e));
  for (var r = this._groups, i = r.length, a = [], o = [], s = 0; s < i; ++s)
    for (var u = r[s], l = u.length, c, f = 0; f < l; ++f)
      if (c = u[f]) {
        for (var h = e.call(c, c.__data__, f, u), d, p = fn(c, n), v = 0, g = h.length; v < g; ++v)
          (d = h[v]) && Ko(d, t, n, v, h, p);
        a.push(h), o.push(c);
      }
  return new Vn(a, o, t, n);
}
var GC = ua.prototype.constructor;
function XC() {
  return new GC(this._groups, this._parents);
}
function YC(e, t) {
  var n, r, i;
  return function() {
    var a = ii(this, e), o = (this.style.removeProperty(e), ii(this, e));
    return a === o ? null : a === n && o === r ? i : i = t(n = a, r = o);
  };
}
function vd(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function KC(e, t, n) {
  var r, i = n + "", a;
  return function() {
    var o = ii(this, e);
    return o === i ? null : o === r ? a : a = t(r = o, n);
  };
}
function ZC(e, t, n) {
  var r, i, a;
  return function() {
    var o = ii(this, e), s = n(this), u = s + "";
    return s == null && (u = s = (this.style.removeProperty(e), ii(this, e))), o === u ? null : o === r && u === i ? a : (i = u, a = t(r = o, s));
  };
}
function qC(e, t) {
  var n, r, i, a = "style." + t, o = "end." + a, s;
  return function() {
    var u = Nn(this, e), l = u.on, c = u.value[a] == null ? s || (s = vd(t)) : void 0;
    (l !== n || i !== c) && (r = (n = l).copy()).on(o, i = c), u.on = r;
  };
}
function jC(e, t, n) {
  var r = (e += "") == "transform" ? jA : dd;
  return t == null ? this.styleTween(e, YC(e, r)).on("end.style." + e, vd(e)) : typeof t == "function" ? this.styleTween(e, ZC(e, r, Ll(this, "style." + e, t))).each(qC(this._id, e)) : this.styleTween(e, KC(e, r, t), n).on("end.style." + e, null);
}
function JC(e, t, n) {
  return function(r) {
    this.style.setProperty(e, t.call(this, r), n);
  };
}
function QC(e, t, n) {
  var r, i;
  function a() {
    var o = t.apply(this, arguments);
    return o !== i && (r = (i = o) && JC(e, o, n)), r;
  }
  return a._value = t, a;
}
function e8(e, t, n) {
  var r = "style." + (e += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (t == null) return this.tween(r, null);
  if (typeof t != "function") throw new Error();
  return this.tween(r, QC(e, t, n ?? ""));
}
function t8(e) {
  return function() {
    this.textContent = e;
  };
}
function n8(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function r8(e) {
  return this.tween("text", typeof e == "function" ? n8(Ll(this, "text", e)) : t8(e == null ? "" : e + ""));
}
function i8(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function a8(e) {
  var t, n;
  function r() {
    var i = e.apply(this, arguments);
    return i !== n && (t = (n = i) && i8(i)), t;
  }
  return r._value = e, r;
}
function o8(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, a8(e));
}
function s8() {
  for (var e = this._name, t = this._id, n = pd(), r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var o = r[a], s = o.length, u, l = 0; l < s; ++l)
      if (u = o[l]) {
        var c = fn(u, t);
        Ko(u, e, n, l, o, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new Vn(r, this._parents, e, n);
}
function l8() {
  var e, t, n = this, r = n._id, i = n.size();
  return new Promise(function(a, o) {
    var s = { value: o }, u = { value: function() {
      --i === 0 && a();
    } };
    n.each(function() {
      var l = Nn(this, r), c = l.on;
      c !== e && (t = (e = c).copy(), t._.cancel.push(s), t._.interrupt.push(s), t._.end.push(u)), l.on = t;
    }), i === 0 && a();
  });
}
var u8 = 0;
function Vn(e, t, n, r) {
  this._groups = e, this._parents = t, this._name = n, this._id = r;
}
function pd() {
  return ++u8;
}
var On = ua.prototype;
Vn.prototype = {
  constructor: Vn,
  select: VC,
  selectAll: WC,
  selectChild: On.selectChild,
  selectChildren: On.selectChildren,
  filter: PC,
  merge: LC,
  selection: XC,
  transition: s8,
  call: On.call,
  nodes: On.nodes,
  node: On.node,
  size: On.size,
  empty: On.empty,
  each: On.each,
  on: UC,
  attr: wC,
  attrTween: AC,
  style: jC,
  styleTween: e8,
  text: r8,
  textTween: o8,
  remove: HC,
  tween: dC,
  delay: FC,
  duration: OC,
  ease: bC,
  easeVarying: RC,
  end: l8,
  [Symbol.iterator]: On[Symbol.iterator]
};
function c8(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var f8 = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: c8
};
function h8(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function d8(e) {
  var t, n;
  e instanceof Vn ? (t = e._id, e = e._name) : (t = pd(), (n = f8).time = Rl(), e = e == null ? null : e + "");
  for (var r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var o = r[a], s = o.length, u, l = 0; l < s; ++l)
      (u = o[l]) && Ko(u, e, t, l, o, n || h8(u, t));
  return new Vn(r, this._parents, e, t);
}
ua.prototype.interrupt = cC;
ua.prototype.transition = d8;
const ba = (e) => () => e;
function v8(e, {
  sourceEvent: t,
  target: n,
  transform: r,
  dispatch: i
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: r, enumerable: !0, configurable: !0 },
    _: { value: i }
  });
}
function Rn(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
Rn.prototype = {
  constructor: Rn,
  scale: function(e) {
    return e === 1 ? this : new Rn(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new Rn(this.k, this.x + this.k * e, this.y + this.k * t);
  },
  apply: function(e) {
    return [e[0] * this.k + this.x, e[1] * this.k + this.y];
  },
  applyX: function(e) {
    return e * this.k + this.x;
  },
  applyY: function(e) {
    return e * this.k + this.y;
  },
  invert: function(e) {
    return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
  },
  invertX: function(e) {
    return (e - this.x) / this.k;
  },
  invertY: function(e) {
    return (e - this.y) / this.k;
  },
  rescaleX: function(e) {
    return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
  },
  rescaleY: function(e) {
    return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var Bl = new Rn(1, 0, 0);
Rn.prototype;
function ws(e) {
  e.stopImmediatePropagation();
}
function xi(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function p8(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function g8() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Z0() {
  return this.__zoom || Bl;
}
function m8(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function x8() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function _8(e, t, n) {
  var r = e.invertX(t[0][0]) - n[0][0], i = e.invertX(t[1][0]) - n[1][0], a = e.invertY(t[0][1]) - n[0][1], o = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    o > a ? (a + o) / 2 : Math.min(0, a) || Math.max(0, o)
  );
}
function w8() {
  var e = p8, t = g8, n = _8, r = m8, i = x8, a = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], s = 250, u = nC, l = Ol("start", "zoom", "end"), c, f, h, d = 500, p = 150, v = 0, g = 10;
  function x(w) {
    w.property("__zoom", Z0).on("wheel.zoom", V, { passive: !1 }).on("mousedown.zoom", P).on("dblclick.zoom", H).filter(i).on("touchstart.zoom", G).on("touchmove.zoom", C).on("touchend.zoom touchcancel.zoom", se).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  x.transform = function(w, U, I, j) {
    var K = w.selection ? w.selection() : w;
    K.property("__zoom", Z0), w !== K ? Y(w, U, I, j) : K.interrupt().each(function() {
      Q(this, arguments).event(j).start().zoom(null, typeof U == "function" ? U.apply(this, arguments) : U).end();
    });
  }, x.scaleBy = function(w, U, I, j) {
    x.scaleTo(w, function() {
      var K = this.__zoom.k, ee = typeof U == "function" ? U.apply(this, arguments) : U;
      return K * ee;
    }, I, j);
  }, x.scaleTo = function(w, U, I, j) {
    x.transform(w, function() {
      var K = t.apply(this, arguments), ee = this.__zoom, J = I == null ? T(K) : typeof I == "function" ? I.apply(this, arguments) : I, de = ee.invert(J), A = typeof U == "function" ? U.apply(this, arguments) : U;
      return n(m(y(ee, A), J, de), K, o);
    }, I, j);
  }, x.translateBy = function(w, U, I, j) {
    x.transform(w, function() {
      return n(this.__zoom.translate(
        typeof U == "function" ? U.apply(this, arguments) : U,
        typeof I == "function" ? I.apply(this, arguments) : I
      ), t.apply(this, arguments), o);
    }, null, j);
  }, x.translateTo = function(w, U, I, j, K) {
    x.transform(w, function() {
      var ee = t.apply(this, arguments), J = this.__zoom, de = j == null ? T(ee) : typeof j == "function" ? j.apply(this, arguments) : j;
      return n(Bl.translate(de[0], de[1]).scale(J.k).translate(
        typeof U == "function" ? -U.apply(this, arguments) : -U,
        typeof I == "function" ? -I.apply(this, arguments) : -I
      ), ee, o);
    }, j, K);
  };
  function y(w, U) {
    return U = Math.max(a[0], Math.min(a[1], U)), U === w.k ? w : new Rn(U, w.x, w.y);
  }
  function m(w, U, I) {
    var j = U[0] - I[0] * w.k, K = U[1] - I[1] * w.k;
    return j === w.x && K === w.y ? w : new Rn(w.k, j, K);
  }
  function T(w) {
    return [(+w[0][0] + +w[1][0]) / 2, (+w[0][1] + +w[1][1]) / 2];
  }
  function Y(w, U, I, j) {
    w.on("start.zoom", function() {
      Q(this, arguments).event(j).start();
    }).on("interrupt.zoom end.zoom", function() {
      Q(this, arguments).event(j).end();
    }).tween("zoom", function() {
      var K = this, ee = arguments, J = Q(K, ee).event(j), de = t.apply(K, ee), A = I == null ? T(de) : typeof I == "function" ? I.apply(K, ee) : I, z = Math.max(de[1][0] - de[0][0], de[1][1] - de[0][1]), L = K.__zoom, O = typeof U == "function" ? U.apply(K, ee) : U, X = u(L.invert(A).concat(z / L.k), O.invert(A).concat(z / O.k));
      return function(le) {
        if (le === 1) le = O;
        else {
          var pe = X(le), me = z / pe[2];
          le = new Rn(me, A[0] - pe[0] * me, A[1] - pe[1] * me);
        }
        J.zoom(null, le);
      };
    });
  }
  function Q(w, U, I) {
    return !I && w.__zooming || new R(w, U);
  }
  function R(w, U) {
    this.that = w, this.args = U, this.active = 0, this.sourceEvent = null, this.extent = t.apply(w, U), this.taps = 0;
  }
  R.prototype = {
    event: function(w) {
      return w && (this.sourceEvent = w), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(w, U) {
      return this.mouse && w !== "mouse" && (this.mouse[1] = U.invert(this.mouse[0])), this.touch0 && w !== "touch" && (this.touch0[1] = U.invert(this.touch0[0])), this.touch1 && w !== "touch" && (this.touch1[1] = U.invert(this.touch1[0])), this.that.__zoom = U, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(w) {
      var U = Jn(this.that).datum();
      l.call(
        w,
        this.that,
        new v8(w, {
          sourceEvent: this.sourceEvent,
          target: x,
          transform: this.that.__zoom,
          dispatch: l
        }),
        U
      );
    }
  };
  function V(w, ...U) {
    if (!e.apply(this, arguments)) return;
    var I = Q(this, U).event(w), j = this.__zoom, K = Math.max(a[0], Math.min(a[1], j.k * Math.pow(2, r.apply(this, arguments)))), ee = Zn(w);
    if (I.wheel)
      (I.mouse[0][0] !== ee[0] || I.mouse[0][1] !== ee[1]) && (I.mouse[1] = j.invert(I.mouse[0] = ee)), clearTimeout(I.wheel);
    else {
      if (j.k === K) return;
      I.mouse = [ee, j.invert(ee)], Ga(this), I.start();
    }
    xi(w), I.wheel = setTimeout(J, p), I.zoom("mouse", n(m(y(j, K), I.mouse[0], I.mouse[1]), I.extent, o));
    function J() {
      I.wheel = null, I.end();
    }
  }
  function P(w, ...U) {
    if (h || !e.apply(this, arguments)) return;
    var I = w.currentTarget, j = Q(this, U, !0).event(w), K = Jn(w.view).on("mousemove.zoom", A, !0).on("mouseup.zoom", z, !0), ee = Zn(w, I), J = w.clientX, de = w.clientY;
    kA(w.view), ws(w), j.mouse = [ee, this.__zoom.invert(ee)], Ga(this), j.start();
    function A(L) {
      if (xi(L), !j.moved) {
        var O = L.clientX - J, X = L.clientY - de;
        j.moved = O * O + X * X > v;
      }
      j.event(L).zoom("mouse", n(m(j.that.__zoom, j.mouse[0] = Zn(L, I), j.mouse[1]), j.extent, o));
    }
    function z(L) {
      K.on("mousemove.zoom mouseup.zoom", null), IA(L.view, j.moved), xi(L), j.event(L).end();
    }
  }
  function H(w, ...U) {
    if (e.apply(this, arguments)) {
      var I = this.__zoom, j = Zn(w.changedTouches ? w.changedTouches[0] : w, this), K = I.invert(j), ee = I.k * (w.shiftKey ? 0.5 : 2), J = n(m(y(I, ee), j, K), t.apply(this, U), o);
      xi(w), s > 0 ? Jn(this).transition().duration(s).call(Y, J, j, w) : Jn(this).call(x.transform, J, j, w);
    }
  }
  function G(w, ...U) {
    if (e.apply(this, arguments)) {
      var I = w.touches, j = I.length, K = Q(this, U, w.changedTouches.length === j).event(w), ee, J, de, A;
      for (ws(w), J = 0; J < j; ++J)
        de = I[J], A = Zn(de, this), A = [A, this.__zoom.invert(A), de.identifier], K.touch0 ? !K.touch1 && K.touch0[2] !== A[2] && (K.touch1 = A, K.taps = 0) : (K.touch0 = A, ee = !0, K.taps = 1 + !!c);
      c && (c = clearTimeout(c)), ee && (K.taps < 2 && (f = A[0], c = setTimeout(function() {
        c = null;
      }, d)), Ga(this), K.start());
    }
  }
  function C(w, ...U) {
    if (this.__zooming) {
      var I = Q(this, U).event(w), j = w.changedTouches, K = j.length, ee, J, de, A;
      for (xi(w), ee = 0; ee < K; ++ee)
        J = j[ee], de = Zn(J, this), I.touch0 && I.touch0[2] === J.identifier ? I.touch0[0] = de : I.touch1 && I.touch1[2] === J.identifier && (I.touch1[0] = de);
      if (J = I.that.__zoom, I.touch1) {
        var z = I.touch0[0], L = I.touch0[1], O = I.touch1[0], X = I.touch1[1], le = (le = O[0] - z[0]) * le + (le = O[1] - z[1]) * le, pe = (pe = X[0] - L[0]) * pe + (pe = X[1] - L[1]) * pe;
        J = y(J, Math.sqrt(le / pe)), de = [(z[0] + O[0]) / 2, (z[1] + O[1]) / 2], A = [(L[0] + X[0]) / 2, (L[1] + X[1]) / 2];
      } else if (I.touch0) de = I.touch0[0], A = I.touch0[1];
      else return;
      I.zoom("touch", n(m(J, de, A), I.extent, o));
    }
  }
  function se(w, ...U) {
    if (this.__zooming) {
      var I = Q(this, U).event(w), j = w.changedTouches, K = j.length, ee, J;
      for (ws(w), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, d), ee = 0; ee < K; ++ee)
        J = j[ee], I.touch0 && I.touch0[2] === J.identifier ? delete I.touch0 : I.touch1 && I.touch1[2] === J.identifier && delete I.touch1;
      if (I.touch1 && !I.touch0 && (I.touch0 = I.touch1, delete I.touch1), I.touch0) I.touch0[1] = this.__zoom.invert(I.touch0[0]);
      else if (I.end(), I.taps === 2 && (J = Zn(J, this), Math.hypot(f[0] - J[0], f[1] - J[1]) < g)) {
        var de = Jn(this).on("dblclick.zoom");
        de && de.apply(this, arguments);
      }
    }
  }
  return x.wheelDelta = function(w) {
    return arguments.length ? (r = typeof w == "function" ? w : ba(+w), x) : r;
  }, x.filter = function(w) {
    return arguments.length ? (e = typeof w == "function" ? w : ba(!!w), x) : e;
  }, x.touchable = function(w) {
    return arguments.length ? (i = typeof w == "function" ? w : ba(!!w), x) : i;
  }, x.extent = function(w) {
    return arguments.length ? (t = typeof w == "function" ? w : ba([[+w[0][0], +w[0][1]], [+w[1][0], +w[1][1]]]), x) : t;
  }, x.scaleExtent = function(w) {
    return arguments.length ? (a[0] = +w[0], a[1] = +w[1], x) : [a[0], a[1]];
  }, x.translateExtent = function(w) {
    return arguments.length ? (o[0][0] = +w[0][0], o[1][0] = +w[1][0], o[0][1] = +w[0][1], o[1][1] = +w[1][1], x) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
  }, x.constrain = function(w) {
    return arguments.length ? (n = w, x) : n;
  }, x.duration = function(w) {
    return arguments.length ? (s = +w, x) : s;
  }, x.interpolate = function(w) {
    return arguments.length ? (u = w, x) : u;
  }, x.on = function() {
    var w = l.on.apply(l, arguments);
    return w === l ? x : w;
  }, x.clickDistance = function(w) {
    return arguments.length ? (v = (w = +w) * w, x) : Math.sqrt(v);
  }, x.tapDistance = function(w) {
    return arguments.length ? (g = +w, x) : g;
  }, x;
}
const gd = Symbol("MiniMapSlots"), y8 = ["id", "x", "y", "rx", "ry", "width", "height", "fill", "stroke", "stroke-width", "shape-rendering"], E8 = {
  name: "MiniMapNode",
  compatConfig: { MODE: 3 },
  inheritAttrs: !1
}, T8 = /* @__PURE__ */ Ze({
  ...E8,
  props: {
    id: {},
    type: {},
    selected: { type: Boolean },
    dragging: { type: Boolean },
    position: {},
    dimensions: {},
    borderRadius: {},
    color: {},
    shapeRendering: {},
    strokeColor: {},
    strokeWidth: {},
    hidden: { type: Boolean }
  },
  emits: ["click", "dblclick", "mouseenter", "mousemove", "mouseleave"],
  setup(e, { emit: t }) {
    const n = e, r = Fr(gd), i = js(), a = Ye(() => i.style ?? {});
    function o(f) {
      t("click", f);
    }
    function s(f) {
      t("dblclick", f);
    }
    function u(f) {
      t("mouseenter", f);
    }
    function l(f) {
      t("mousemove", f);
    }
    function c(f) {
      t("mouseleave", f);
    }
    return (f, h) => !f.hidden && f.dimensions.width !== 0 && f.dimensions.height !== 0 ? (we(), Oe(ct, { key: 0 }, [
      W(r)[`node-${n.type}`] ? (we(), at(ur(W(r)[`node-${n.type}`]), Hd(Xa({ key: 0 }, { ...n, ...f.$attrs })), null, 16)) : (we(), Oe("rect", Xa({
        key: 1,
        id: f.id
      }, f.$attrs, {
        class: ["vue-flow__minimap-node", { selected: f.selected, dragging: f.dragging }],
        x: f.position.x,
        y: f.position.y,
        rx: f.borderRadius,
        ry: f.borderRadius,
        width: f.dimensions.width,
        height: f.dimensions.height,
        fill: f.color || a.value.background || a.value.backgroundColor,
        stroke: f.strokeColor,
        "stroke-width": f.strokeWidth,
        "shape-rendering": f.shapeRendering,
        onClick: o,
        onDblclick: s,
        onMouseenter: u,
        onMousemove: l,
        onMouseleave: c
      }), null, 16, y8))
    ], 64)) : ze("", !0);
  }
}), S8 = ["width", "height", "viewBox", "aria-labelledby"], A8 = ["id"], C8 = ["d", "fill", "stroke", "stroke-width"], N8 = {
  name: "MiniMap",
  compatConfig: { MODE: 3 }
}, F8 = /* @__PURE__ */ Ze({
  ...N8,
  props: {
    nodeColor: { type: [String, Function], default: "#e2e2e2" },
    nodeStrokeColor: { type: [String, Function], default: "transparent" },
    nodeClassName: { type: [String, Function] },
    nodeBorderRadius: { default: 5 },
    nodeStrokeWidth: { default: 2 },
    maskColor: { default: "rgb(240, 240, 240, 0.6)" },
    maskStrokeColor: { default: "none" },
    maskStrokeWidth: { default: 1 },
    position: { default: "bottom-right" },
    pannable: { type: Boolean, default: !1 },
    zoomable: { type: Boolean, default: !1 },
    width: {},
    height: {},
    ariaLabel: { default: "Vue Flow mini map" },
    inversePan: { type: Boolean, default: !1 },
    zoomStep: { default: 1 },
    offsetScale: { default: 5 },
    maskBorderRadius: { default: 0 }
  },
  emits: ["click", "nodeClick", "nodeDblclick", "nodeMouseenter", "nodeMousemove", "nodeMouseleave"],
  setup(e, { emit: t }) {
    const n = ec(), r = js(), i = 200, a = 150, { id: o, edges: s, viewport: u, translateExtent: l, dimensions: c, emits: f, d3Selection: h, d3Zoom: d, getNodesInitialized: p } = nt(), v = $e();
    wr(gd, n);
    const g = Ye(() => {
      var K;
      return e.width ?? ((K = r.style) == null ? void 0 : K.width) ?? i;
    }), x = Ye(() => {
      var K;
      return e.height ?? ((K = r.style) == null ? void 0 : K.height) ?? a;
    }), y = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision", m = Re(() => typeof e.nodeColor == "string" ? () => e.nodeColor : e.nodeColor), T = Re(
      () => typeof e.nodeStrokeColor == "string" ? () => e.nodeStrokeColor : e.nodeStrokeColor
    ), Y = Re(
      () => typeof e.nodeClassName == "string" ? () => e.nodeClassName : typeof e.nodeClassName == "function" ? e.nodeClassName : () => ""
    ), Q = Re(() => Nl(p.value.filter((K) => !K.hidden))), R = Re(() => ({
      x: -u.value.x / u.value.zoom,
      y: -u.value.y / u.value.zoom,
      width: c.value.width / u.value.zoom,
      height: c.value.height / u.value.zoom
    })), V = Re(
      () => p.value && p.value.length ? LT(Q.value, R.value) : R.value
    ), P = Re(() => {
      const K = V.value.width / g.value, ee = V.value.height / x.value;
      return Math.max(K, ee);
    }), H = Re(() => {
      const K = P.value * g.value, ee = P.value * x.value, J = e.offsetScale * P.value;
      return {
        offset: J,
        x: V.value.x - (K - V.value.width) / 2 - J,
        y: V.value.y - (ee - V.value.height) / 2 - J,
        width: K + J * 2,
        height: ee + J * 2
      };
    }), G = Re(() => !H.value.x || !H.value.y ? "" : `
    M${H.value.x - H.value.offset},${H.value.y - H.value.offset}
    h${H.value.width + H.value.offset * 2}
    v${H.value.height + H.value.offset * 2}
    h${-H.value.width - H.value.offset * 2}z
    M${R.value.x + e.maskBorderRadius},${R.value.y}
    h${R.value.width - 2 * e.maskBorderRadius}
    a${e.maskBorderRadius},${e.maskBorderRadius} 0 0 1 ${e.maskBorderRadius},${e.maskBorderRadius}
    v${R.value.height - 2 * e.maskBorderRadius}
    a${e.maskBorderRadius},${e.maskBorderRadius} 0 0 1 -${e.maskBorderRadius},${e.maskBorderRadius}
    h${-(R.value.width - 2 * e.maskBorderRadius)}
    a${e.maskBorderRadius},${e.maskBorderRadius} 0 0 1 -${e.maskBorderRadius},-${e.maskBorderRadius}
    v${-(R.value.height - 2 * e.maskBorderRadius)}
    a${e.maskBorderRadius},${e.maskBorderRadius} 0 0 1 ${e.maskBorderRadius},-${e.maskBorderRadius}z`);
    zd(
      (K) => {
        if (v.value) {
          const ee = Jn(v.value), J = (z) => {
            if (z.sourceEvent.type !== "wheel" || !h.value || !d.value)
              return;
            const L = z.sourceEvent.ctrlKey && Zi() ? 10 : 1, O = -z.sourceEvent.deltaY * (z.sourceEvent.deltaMode === 1 ? 0.05 : z.sourceEvent.deltaMode ? 1 : 2e-3) * e.zoomStep, X = u.value.zoom * 2 ** (O * L);
            d.value.scaleTo(h.value, X);
          }, de = (z) => {
            if (z.sourceEvent.type !== "mousemove" || !h.value || !d.value)
              return;
            const L = P.value * Math.max(1, u.value.zoom) * (e.inversePan ? -1 : 1), O = {
              x: u.value.x - z.sourceEvent.movementX * L,
              y: u.value.y - z.sourceEvent.movementY * L
            }, X = [
              [0, 0],
              [c.value.width, c.value.height]
            ], le = Bl.translate(O.x, O.y).scale(u.value.zoom), pe = d.value.constrain()(le, X, l.value);
            d.value.transform(h.value, pe);
          }, A = w8().wheelDelta((z) => Ls(z) * (e.zoomStep / 10)).on("zoom", e.pannable ? de : () => {
          }).on("zoom.wheel", e.zoomable ? J : () => {
          });
          ee.call(A), K(() => {
            ee.on("zoom", null);
          });
        }
      },
      { flush: "post" }
    );
    function C(K) {
      const [ee, J] = Zn(K);
      t("click", { event: K, position: { x: ee, y: J } });
    }
    function se(K, ee) {
      const J = { event: K, node: ee, connectedEdges: hr([ee], s.value) };
      f.miniMapNodeClick(J), t("nodeClick", J);
    }
    function w(K, ee) {
      const J = { event: K, node: ee, connectedEdges: hr([ee], s.value) };
      f.miniMapNodeDoubleClick(J), t("nodeDblclick", J);
    }
    function U(K, ee) {
      const J = { event: K, node: ee, connectedEdges: hr([ee], s.value) };
      f.miniMapNodeMouseEnter(J), t("nodeMouseenter", J);
    }
    function I(K, ee) {
      const J = { event: K, node: ee, connectedEdges: hr([ee], s.value) };
      f.miniMapNodeMouseMove(J), t("nodeMousemove", J);
    }
    function j(K, ee) {
      const J = { event: K, node: ee, connectedEdges: hr([ee], s.value) };
      f.miniMapNodeMouseLeave(J), t("nodeMouseleave", J);
    }
    return (K, ee) => (we(), at(W(Hh), {
      position: K.position,
      class: Sn(["vue-flow__minimap", { pannable: K.pannable, zoomable: K.zoomable }])
    }, {
      default: ve(() => [
        (we(), Oe("svg", {
          ref_key: "el",
          ref: v,
          width: g.value,
          height: x.value,
          viewBox: [H.value.x, H.value.y, H.value.width, H.value.height].join(" "),
          role: "img",
          "aria-labelledby": `vue-flow__minimap-${W(o)}`,
          onClick: C
        }, [
          K.ariaLabel ? (we(), Oe("title", {
            key: 0,
            id: `vue-flow__minimap-${W(o)}`
          }, Me(K.ariaLabel), 9, A8)) : ze("", !0),
          (we(!0), Oe(ct, null, wn(W(p), (J) => (we(), at(T8, {
            id: J.id,
            key: J.id,
            f: "",
            position: J.computedPosition,
            dimensions: J.dimensions,
            selected: J.selected,
            dragging: J.dragging,
            style: Yt(J.style),
            class: Sn(Y.value(J)),
            color: m.value(J),
            "border-radius": K.nodeBorderRadius,
            "stroke-color": T.value(J),
            "stroke-width": K.nodeStrokeWidth,
            "shape-rendering": W(y),
            type: J.type,
            hidden: J.hidden,
            onClick: (de) => se(de, J),
            onDblclick: (de) => w(de, J),
            onMouseenter: (de) => U(de, J),
            onMousemove: (de) => I(de, J),
            onMouseleave: (de) => j(de, J)
          }, null, 8, ["id", "position", "dimensions", "selected", "dragging", "style", "class", "color", "border-radius", "stroke-color", "stroke-width", "shape-rendering", "type", "hidden", "onClick", "onDblclick", "onMouseenter", "onMousemove", "onMouseleave"]))), 128)),
          Le("path", {
            class: "vue-flow__minimap-mask",
            d: G.value,
            fill: K.maskColor,
            stroke: K.maskStrokeColor,
            "stroke-width": K.maskStrokeWidth,
            "fill-rule": "evenodd"
          }, null, 8, C8)
        ], 8, S8))
      ]),
      _: 1
    }, 8, ["position", "class"]));
  }
}), k8 = {
  name: "ControlButton",
  compatConfig: { MODE: 3 }
}, I8 = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, i] of t)
    n[r] = i;
  return n;
}, O8 = {
  type: "button",
  class: "vue-flow__controls-button"
};
function D8(e, t, n, r, i, a) {
  return we(), Oe("button", O8, [
    lt(e.$slots, "default")
  ]);
}
const Ma = /* @__PURE__ */ I8(k8, [["render", D8]]), b8 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 32 32"
}, M8 = /* @__PURE__ */ Le("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }, null, -1), R8 = [
  M8
];
function P8(e, t) {
  return we(), Oe("svg", b8, R8);
}
const L8 = { render: P8 }, B8 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 32 5"
}, $8 = /* @__PURE__ */ Le("path", { d: "M0 0h32v4.2H0z" }, null, -1), U8 = [
  $8
];
function z8(e, t) {
  return we(), Oe("svg", B8, U8);
}
const H8 = { render: z8 }, V8 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 32 30"
}, W8 = /* @__PURE__ */ Le("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0 0 27.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94a.919.919 0 0 1-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }, null, -1), G8 = [
  W8
];
function X8(e, t) {
  return we(), Oe("svg", V8, G8);
}
const Y8 = { render: X8 }, K8 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 25 32"
}, Z8 = /* @__PURE__ */ Le("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 0 0 0 13.714v15.238A3.056 3.056 0 0 0 3.048 32h18.285a3.056 3.056 0 0 0 3.048-3.048V13.714a3.056 3.056 0 0 0-3.048-3.047zM12.19 24.533a3.056 3.056 0 0 1-3.047-3.047 3.056 3.056 0 0 1 3.047-3.048 3.056 3.056 0 0 1 3.048 3.048 3.056 3.056 0 0 1-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }, null, -1), q8 = [
  Z8
];
function j8(e, t) {
  return we(), Oe("svg", K8, q8);
}
const J8 = { render: j8 }, Q8 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 25 32"
}, e6 = /* @__PURE__ */ Le("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 0 0 0 13.714v15.238A3.056 3.056 0 0 0 3.048 32h18.285a3.056 3.056 0 0 0 3.048-3.048V13.714a3.056 3.056 0 0 0-3.048-3.047zM12.19 24.533a3.056 3.056 0 0 1-3.047-3.047 3.056 3.056 0 0 1 3.047-3.048 3.056 3.056 0 0 1 3.048 3.048 3.056 3.056 0 0 1-3.048 3.047z" }, null, -1), t6 = [
  e6
];
function n6(e, t) {
  return we(), Oe("svg", Q8, t6);
}
const r6 = { render: n6 }, i6 = {
  name: "Controls",
  compatConfig: { MODE: 3 }
}, a6 = /* @__PURE__ */ Ze({
  ...i6,
  props: {
    showZoom: { type: Boolean, default: !0 },
    showFitView: { type: Boolean, default: !0 },
    showInteractive: { type: Boolean, default: !0 },
    fitViewParams: {},
    position: { default: () => dh.BottomLeft }
  },
  emits: ["zoomIn", "zoomOut", "fitView", "interactionChange"],
  setup(e, { emit: t }) {
    const {
      nodesDraggable: n,
      nodesConnectable: r,
      elementsSelectable: i,
      setInteractive: a,
      zoomIn: o,
      zoomOut: s,
      fitView: u,
      viewport: l,
      minZoom: c,
      maxZoom: f
    } = nt(), h = Ye(() => n.value || r.value || i.value), d = Ye(() => l.value.zoom <= c.value), p = Ye(() => l.value.zoom >= f.value);
    function v() {
      o(), t("zoomIn");
    }
    function g() {
      s(), t("zoomOut");
    }
    function x() {
      u(e.fitViewParams), t("fitView");
    }
    function y() {
      a(!h.value), t("interactionChange", !h.value);
    }
    return (m, T) => (we(), at(W(Hh), {
      class: "vue-flow__controls",
      position: m.position
    }, {
      default: ve(() => [
        lt(m.$slots, "top"),
        m.showZoom ? (we(), Oe(ct, { key: 0 }, [
          lt(m.$slots, "control-zoom-in", {}, () => [
            oe(Ma, {
              class: "vue-flow__controls-zoomin",
              disabled: p.value,
              onClick: v
            }, {
              default: ve(() => [
                lt(m.$slots, "icon-zoom-in", {}, () => [
                  (we(), at(ur(W(L8))))
                ])
              ]),
              _: 3
            }, 8, ["disabled"])
          ]),
          lt(m.$slots, "control-zoom-out", {}, () => [
            oe(Ma, {
              class: "vue-flow__controls-zoomout",
              disabled: d.value,
              onClick: g
            }, {
              default: ve(() => [
                lt(m.$slots, "icon-zoom-out", {}, () => [
                  (we(), at(ur(W(H8))))
                ])
              ]),
              _: 3
            }, 8, ["disabled"])
          ])
        ], 64)) : ze("", !0),
        m.showFitView ? lt(m.$slots, "control-fit-view", { key: 1 }, () => [
          oe(Ma, {
            class: "vue-flow__controls-fitview",
            onClick: x
          }, {
            default: ve(() => [
              lt(m.$slots, "icon-fit-view", {}, () => [
                (we(), at(ur(W(Y8))))
              ])
            ]),
            _: 3
          })
        ]) : ze("", !0),
        m.showInteractive ? lt(m.$slots, "control-interactive", { key: 2 }, () => [
          m.showInteractive ? (we(), at(Ma, {
            key: 0,
            class: "vue-flow__controls-interactive",
            onClick: y
          }, {
            default: ve(() => [
              h.value ? lt(m.$slots, "icon-unlock", { key: 0 }, () => [
                (we(), at(ur(W(r6))))
              ]) : ze("", !0),
              h.value ? ze("", !0) : lt(m.$slots, "icon-lock", { key: 1 }, () => [
                (we(), at(ur(W(J8))))
              ])
            ]),
            _: 3
          })) : ze("", !0)
        ]) : ze("", !0),
        lt(m.$slots, "default")
      ]),
      _: 3
    }, 8, ["position"]));
  }
}), o6 = { class: "fd-wrap" }, s6 = { class: "fd-toolbar" }, l6 = { class: "vf-node vf-node--start" }, u6 = { class: "vf-node__title" }, c6 = { class: "vf-node vf-node--end" }, f6 = { class: "vf-node__title" }, h6 = { class: "vf-node vf-node--process" }, d6 = { class: "vf-node__title" }, v6 = {
  key: 0,
  class: "vf-node__meta"
}, p6 = ["title"], g6 = {
  key: 2,
  class: "vf-node__badge auto"
}, m6 = {
  key: 3,
  class: "vf-node__badge jump"
}, x6 = ["title"], _6 = { class: "fd-edge-tooltip__title" }, w6 = { class: "fd-edge-tooltip__row" }, y6 = { class: "fd-edge-tooltip__key" }, E6 = { class: "fd-edge-tooltip__script" }, ys = 200, q0 = 110, j0 = 60, T6 = 50, S6 = /* @__PURE__ */ Ze({
  __name: "FlowDiagram",
  props: {
    nodes: {},
    lines: {}
  },
  setup(e) {
    const t = e, { fitView: n, zoomIn: r, zoomOut: i } = nt(), a = $e();
    function o(p, v) {
      const g = p.map((P) => P.nid), x = {}, y = {};
      g.forEach((P) => {
        x[P] = 0, y[P] = [];
      }), v.forEach((P) => {
        y[P.source] !== void 0 && y[P.source].push(P.target), x[P.target] !== void 0 && x[P.target]++;
      });
      const m = {}, T = g.filter((P) => x[P] === 0);
      T.forEach((P) => {
        m[P] = 0;
      });
      const Y = /* @__PURE__ */ new Set(), Q = [...T];
      for (; Q.length; ) {
        const P = Q.shift();
        Y.has(P) || (Y.add(P), y[P].forEach((H) => {
          m[H] = Math.max(m[H] ?? 0, (m[P] ?? 0) + 1), Y.has(H) || Q.push(H);
        }));
      }
      g.filter((P) => m[P] === void 0).forEach((P, H) => {
        const G = Math.max(0, ...Object.values(m));
        m[P] = G + 1 + H;
      });
      const R = {};
      g.forEach((P) => {
        const H = m[P];
        R[H] || (R[H] = []), R[H].push(P);
      });
      const V = {};
      return Object.entries(R).forEach(([P, H]) => {
        const G = Number(P), se = -(H.length * ys + (H.length - 1) * j0) / 2;
        H.forEach((w, U) => {
          V[w] = {
            x: se + U * (ys + j0),
            y: G * (q0 + T6)
          };
        });
      }), V;
    }
    const s = Re(() => {
      const p = o(t.nodes, t.lines);
      return t.nodes.map((v) => {
        const g = v.nodeType === "S" ? "start" : v.nodeType === "E" ? "end" : "process";
        return {
          id: v.nid,
          type: g,
          position: p[v.nid] ?? { x: 0, y: 0 },
          data: { ...v, label: v.label || v.nid },
          style: { width: ys + "px", minHeight: q0 + "px" },
          sourcePosition: De.Bottom,
          targetPosition: De.Top
        };
      });
    }), u = Re(
      () => t.lines.map((p) => ({
        id: `e-${p.nid}`,
        source: p.source,
        target: p.target,
        label: p.label || "",
        type: "smoothstep",
        animated: !1,
        markerEnd: go.ArrowClosed,
        style: { stroke: p.customColor || "#409eff", strokeWidth: 2 },
        labelStyle: { fill: "#606266", fontSize: 11 },
        data: p
      }))
    ), l = $e({
      visible: !1,
      x: 0,
      y: 0,
      label: "",
      condType: "",
      conditions: [],
      routeScript: ""
    });
    function c({ edge: p, event: v }) {
      var y;
      const g = p.data, x = ((y = a.value) == null ? void 0 : y.getBoundingClientRect()) ?? { left: 0, top: 0 };
      l.value = {
        visible: !0,
        x: v.clientX - x.left + 12,
        y: v.clientY - x.top - 10,
        label: g.label || "",
        condType: g.isContinueBeanId === "0" ? "无条件" : "条件判断",
        conditions: g.conditions ?? [],
        routeScript: g.routeScriptTxt || ""
      };
    }
    function f() {
      l.value.visible = !1;
    }
    function h(p) {
      return { 5: "等于", 6: "不等于", 7: "大于", 8: "小于" }[p] ?? p;
    }
    function d(p, v) {
      return p && p.length > v ? p.slice(0, v) + "…" : p;
    }
    return (p, v) => {
      var g;
      return we(), Oe("div", o6, [
        Le("div", s6, [
          oe(W(Vd), { size: "small" }, {
            default: ve(() => [
              oe(W(Pt), { onClick: W(n) }, {
                default: ve(() => [...v[0] || (v[0] = [
                  Be("适应窗口", -1)
                ])]),
                _: 1
              }, 8, ["onClick"]),
              oe(W(Pt), { onClick: W(r) }, {
                default: ve(() => [...v[1] || (v[1] = [
                  Be("放大", -1)
                ])]),
                _: 1
              }, 8, ["onClick"]),
              oe(W(Pt), { onClick: W(i) }, {
                default: ve(() => [...v[2] || (v[2] = [
                  Be("缩小", -1)
                ])]),
                _: 1
              }, 8, ["onClick"])
            ]),
            _: 1
          }),
          v[3] || (v[3] = Le("span", { style: { "margin-left": "12px", "font-size": "12px", color: "#909399" } }, " 鼠标移到路由线上查看条件逻辑 ", -1))
        ]),
        Le("div", {
          class: "fd-canvas",
          ref_key: "canvasRef",
          ref: a
        }, [
          oe(W(B4), {
            nodes: s.value,
            edges: u.value,
            "default-viewport": { zoom: 0.9 },
            "fit-view-on-init": "",
            "nodes-connectable": !1,
            "nodes-draggable": !0,
            "edges-updatable": !1,
            onEdgeMouseEnter: c,
            onEdgeMouseLeave: f
          }, {
            "node-start": ve(({ data: x }) => [
              Le("div", l6, [
                Le("div", u6, Me(x.label), 1),
                v[4] || (v[4] = Le("div", { class: "vf-node__type-badge start" }, "开始", -1))
              ])
            ]),
            "node-end": ve(({ data: x }) => [
              Le("div", c6, [
                Le("div", f6, Me(x.label), 1),
                v[5] || (v[5] = Le("div", { class: "vf-node__type-badge end" }, "结束", -1))
              ])
            ]),
            "node-process": ve(({ data: x }) => [
              Le("div", h6, [
                Le("div", d6, Me(x.label), 1),
                x.nodeSign ? (we(), Oe("div", v6, "序号：" + Me(x.nodeSign), 1)) : ze("", !0),
                x.convertLabel ? (we(), Oe("div", {
                  key: 1,
                  class: "vf-node__meta",
                  title: x.convertLabel
                }, " 人员：" + Me(d(x.convertLabel, 30)), 9, p6)) : ze("", !0),
                x.autoSubmit === "1" ? (we(), Oe("div", g6, "自动提交")) : ze("", !0),
                x.noUserJump === "1" ? (we(), Oe("div", m6, "无人跳过")) : ze("", !0),
                x.creditAuth ? (we(), Oe("div", {
                  key: 4,
                  class: "vf-node__meta",
                  title: x.creditAuth
                }, " 授权：" + Me(d(x.creditAuth, 28)), 9, x6)) : ze("", !0)
              ])
            ]),
            default: ve(() => [
              oe(W(X4), {
                "pattern-color": "#e8e8e8",
                gap: 20
              }),
              oe(W(F8)),
              oe(W(a6))
            ]),
            _: 1
          }, 8, ["nodes", "edges"]),
          l.value.visible ? (we(), Oe("div", {
            key: 0,
            class: "fd-edge-tooltip",
            style: Yt({ left: l.value.x + "px", top: l.value.y + "px" })
          }, [
            Le("div", _6, "路由：" + Me(l.value.label || "（无名称）"), 1),
            Le("div", w6, [
              v[6] || (v[6] = Le("span", { class: "fd-edge-tooltip__key" }, "条件类型：", -1)),
              Be(" " + Me(l.value.condType), 1)
            ]),
            (g = l.value.conditions) != null && g.length ? (we(!0), Oe(ct, { key: 0 }, wn(l.value.conditions, (x, y) => (we(), Oe("div", {
              class: "fd-edge-tooltip__row",
              key: y
            }, [
              Le("span", y6, Me(y === 0 ? "条件：" : x.logic === "1" ? "或：" : "且："), 1),
              Be(" " + Me(x.varName) + " " + Me(h(x.relation)) + " " + Me(x.value), 1)
            ]))), 128)) : ze("", !0),
            l.value.routeScript ? (we(), Oe(ct, { key: 1 }, [
              v[7] || (v[7] = Le("div", {
                class: "fd-edge-tooltip__key",
                style: { "margin-top": "4px" }
              }, "路由脚本：", -1)),
              Le("pre", E6, Me(l.value.routeScript), 1)
            ], 64)) : ze("", !0)
          ], 4)) : ze("", !0)
        ], 512)
      ]);
    };
  }
}), md = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, i] of t)
    n[r] = i;
  return n;
}, A6 = /* @__PURE__ */ md(S6, [["__scopeId", "data-v-4eb93f60"]]), C6 = { class: "fp-root" }, N6 = { class: "fp-tab-bar" }, F6 = {
  key: 0,
  style: { "margin-top": "8px", color: "#67c23a" }
}, k6 = { style: { "margin-top": "12px" } }, I6 = {
  key: 0,
  style: { margin: "12px 0" }
}, O6 = { style: { display: "flex", "align-items": "center", "justify-content": "space-between" } }, D6 = { style: { "font-weight": "600" } }, b6 = { style: { "font-weight": "600" } }, M6 = {
  key: 0,
  style: { "font-size": "12px" }
}, R6 = {
  key: 1,
  style: { "font-size": "11px", color: "#909399" }
}, P6 = { style: { "font-weight": "600" } }, L6 = {
  key: 0,
  style: { "font-size": "11px", color: "#909399" }
}, B6 = { style: { "margin-bottom": "12px", display: "flex", "align-items": "center", "justify-content": "space-between" } }, $6 = {
  key: 0,
  style: { "text-align": "center", padding: "32px", color: "#67c23a", "font-size": "15px" }
}, U6 = {
  key: 0,
  style: { "margin-top": "8px", color: "#67c23a" }
}, z6 = { style: { "margin-top": "12px" } }, H6 = {
  key: 0,
  style: { margin: "12px 0" }
}, V6 = { style: { display: "flex", "align-items": "center", "justify-content": "space-between" } }, W6 = { style: { display: "flex", gap: "8px" } }, G6 = { class: "fp-xml-output" }, X6 = /* @__PURE__ */ Ze({
  __name: "FlowParserView",
  props: {
    api: {},
    toolId: {}
  },
  setup(e) {
    const t = e, n = $e("parse"), r = $e([]), i = $e(!1);
    Wn(async () => {
      i.value = !0;
      try {
        r.value = await t.api.dataSource.list();
      } finally {
        i.value = !1;
      }
    });
    const a = $e("paste"), o = $e(""), s = $e(""), u = $e(""), l = $e({ dataSourceId: "", sql: "", xmlField: "" }), c = $e(!1), f = $e([]), h = $e(0), d = $e(!1), p = Re(() => f.value[h.value] ?? null), v = $e(!1), g = $e(!1), x = $e([]);
    async function y() {
      if (!p.value) return;
      const ue = a.value === "file" ? s.value : u.value;
      if (!ue) {
        _t.warning("请先解析流程");
        return;
      }
      v.value = !0;
      try {
        const Z = await t.api.plugin.callSync("checkFlow", { xmlContent: ue });
        if (x.value = Z.issues ?? [], g.value = !0, !x.value.length)
          _t.success("检查完成，未发现配置问题");
        else {
          const _e = x.value.filter((F) => F.level === "ERROR").length;
          _t[_e > 0 ? "error" : "warning"](
            `检查完成，发现 ${x.value.length} 个问题（ERROR: ${_e}）`
          );
        }
      } finally {
        v.value = !1;
      }
    }
    function m(ue) {
      return ue === "ERROR" ? "danger" : ue === "WARN" ? "warning" : "info";
    }
    function T() {
      var M;
      const ue = p.value;
      if (!x.value.length && !ue) return;
      const Z = vn.book_new(), _e = x.value.map((D) => ({
        级别: D.level,
        规则编号: D.ruleCode,
        规则名称: D.ruleName,
        关联节点: D.nodeName ?? "",
        问题描述: D.message
      })), F = vn.json_to_sheet(_e.length ? _e : [{ 结果: "未发现配置问题" }]);
      vn.book_append_sheet(Z, F, "流程检查结果"), Hu(Z, `check-${((M = ue == null ? void 0 : ue.workflow) == null ? void 0 : M.flowId) ?? "flow"}.xlsx`), _t.success("检查结果已导出");
    }
    function Y(ue) {
      o.value = ue.name;
      const Z = new FileReader();
      Z.onload = (_e) => {
        var F;
        s.value = ((F = _e.target) == null ? void 0 : F.result) ?? "";
      }, Z.readAsText(ue.raw, "UTF-8");
    }
    async function Q() {
      c.value = !0, f.value = [], h.value = 0;
      try {
        let ue;
        if (a.value === "file") {
          if (!s.value) {
            _t.warning("请先上传XML文件");
            return;
          }
          ue = await t.api.plugin.callSync("parseXml", { xmlContent: s.value });
        } else if (a.value === "paste") {
          if (!u.value.trim()) {
            _t.warning("请粘贴XML内容");
            return;
          }
          ue = await t.api.plugin.callSync("parseXml", { xmlContent: u.value });
        } else {
          if (!l.value.dataSourceId) {
            _t.warning("请选择数据源");
            return;
          }
          if (!l.value.sql.trim()) {
            _t.warning("请输入SQL语句");
            return;
          }
          if (!l.value.xmlField) {
            _t.warning("请输入XML字段名");
            return;
          }
          ue = await t.api.plugin.callSync("parseSql", l.value);
        }
        f.value = ue.flows ?? [], _t.success(`解析完成，共 ${f.value.length} 个流程`);
      } finally {
        c.value = !1;
      }
    }
    function R() {
      f.value = [], s.value = "", o.value = "", u.value = "", h.value = 0;
    }
    const V = $e("paste"), P = $e(""), H = $e(""), G = $e(""), C = $e({ dataSourceId: "", sql: "", xmlField: "" }), se = $e(!1), w = $e([]), U = $e(0);
    function I(ue) {
      P.value = ue.name;
      const Z = new FileReader();
      Z.onload = (_e) => {
        var F;
        H.value = ((F = _e.target) == null ? void 0 : F.result) ?? "";
      }, Z.readAsText(ue.raw, "UTF-8");
    }
    function j(ue) {
      const Z = "  ";
      let _e = ue.replace(/(>)\s*(<)/g, `$1
$2`).trim(), F = 0;
      return _e.split(`
`).map((M) => {
        const D = M.trim();
        let B = "";
        return (D.startsWith("</") || D.startsWith("?>")) && (F = Math.max(0, F - 1)), B = Z.repeat(F), D.startsWith("<") && !D.startsWith("</") && !D.startsWith("<?") && !D.endsWith("/>") && !D.includes("</") && F++, B + D;
      }).join(`
`);
    }
    async function K() {
      se.value = !0, w.value = [], U.value = 0;
      try {
        let ue = [];
        if (V.value === "file") {
          if (!H.value) {
            _t.warning("请先上传XML文件");
            return;
          }
          ue = [H.value];
        } else if (V.value === "paste") {
          if (!G.value.trim()) {
            _t.warning("请粘贴XML内容");
            return;
          }
          ue = [G.value];
        } else {
          if (!C.value.dataSourceId) {
            _t.warning("请选择数据源");
            return;
          }
          if (!C.value.sql.trim()) {
            _t.warning("请输入SQL语句");
            return;
          }
          if (!C.value.xmlField) {
            _t.warning("请输入XML字段名");
            return;
          }
          ue = (await t.api.plugin.callSync("queryRawXml", C.value)).xmlList ?? [];
        }
        const Z = [];
        for (const _e of ue)
          try {
            Z.push(j(_e));
          } catch (F) {
            Z.push(`<!-- 格式化失败: ${F.message} -->
${_e}`);
          }
        w.value = Z, _t.success(`格式化完成，共 ${Z.length} 条`);
      } finally {
        se.value = !1;
      }
    }
    function ee() {
      w.value = [], H.value = "", P.value = "", G.value = "", U.value = 0;
    }
    async function J() {
      await navigator.clipboard.writeText(w.value[U.value] ?? ""), _t.success("已复制到剪贴板");
    }
    function de() {
      const ue = w.value[U.value];
      if (!ue) return;
      const Z = new Blob([ue], { type: "application/xml;charset=utf-8" }), _e = URL.createObjectURL(Z), F = document.createElement("a");
      F.href = _e, F.download = `formatted-${U.value + 1}.xml`, F.click(), URL.revokeObjectURL(_e);
    }
    function A() {
      w.value.forEach((ue, Z) => {
        const _e = new Blob([ue], { type: "application/xml;charset=utf-8" }), F = URL.createObjectURL(_e), M = document.createElement("a");
        M.href = F, M.download = `formatted-${Z + 1}.xml`, setTimeout(() => {
          M.click(), URL.revokeObjectURL(F);
        }, Z * 200);
      });
    }
    function z(ue) {
      if (!p.value) return ue;
      const Z = p.value.nodes.find((_e) => _e.nid === ue);
      return Z && Z.label || ue;
    }
    function L(ue) {
      return ue === "S" ? "开始" : ue === "E" ? "结束" : "过程";
    }
    function O(ue) {
      return ue === "S" ? "success" : ue === "E" ? "danger" : "";
    }
    function X(ue) {
      return { 5: "等于", 6: "不等于", 7: "大于", 8: "小于" }[ue] ?? ue;
    }
    function le(ue) {
      return !ue || ue === "0" ? "" : { ReturnBackToFirstImpl: "退回发起人", ReturnBackToPrevImpl: "退回上一节点", ReturnBackImpl: "自定义退回" }[ue] ?? ue;
    }
    function pe(ue) {
      return ue === "1" ? "是" : "否";
    }
    function me() {
      const ue = p.value;
      if (!ue) return;
      const Z = vn.book_new(), _e = vn.json_to_sheet([{
        流程编号: ue.workflow.flowId,
        流程标识: ue.workflow.flowSign,
        流程名称: ue.workflow.flowName,
        流程标题: ue.workflow.title,
        流程作者: ue.workflow.flowAdmin,
        版本编号: ue.workflow.flowVersion,
        所属机构: ue.workflow.orgId,
        系统标识: ue.workflow.systemId,
        创建时间: ue.workflow.startTime,
        更新时间: ue.workflow.updateTime
      }]);
      vn.book_append_sheet(Z, _e, "流程信息");
      const F = ue.nodes.map((D, B) => ({
        序号: B + 1,
        节点序号: D.nodeSign,
        节点编号: D.nid,
        节点名称: D.label,
        节点类型: L(D.nodeType),
        人员配置编码: D.nodeUser,
        人员配置描述: D.convertLabel,
        角色ID: he(D.nodeUser, "R"),
        人员逻辑: he(D.nodeUser, "E"),
        机构层级: he(D.nodeUser, "A"),
        授权规则: D.creditAuth,
        自动提交: pe(D.autoSubmit),
        无人员跳过: pe(D.noUserJump),
        退回策略: le(D.returnBack),
        收回标识: D.tackBack === "TackBackImpl" ? "是" : pe(D.tackBack),
        撤回标识: pe(D.retract),
        加签: pe(D.addSign),
        协助: pe(D.assist),
        催办: pe(D.urged),
        变更: pe(D.change),
        拒绝: pe(D.refuse),
        异步执行: pe(D.asynDo),
        业务逻辑Bean: D.bizBeanId,
        消息通知: D.noticeType
      }));
      vn.book_append_sheet(Z, vn.json_to_sheet(F), "节点明细");
      const M = ue.lines.map((D, B) => {
        var q;
        return {
          序号: B + 1,
          路由编号: D.nid,
          路由名称: D.label,
          起点节点: z(D.source),
          终点节点: z(D.target),
          条件逻辑: D.isContinueBeanId === "0" ? "无条件" : "条件判断",
          条件配置: ((q = D.conditions) == null ? void 0 : q.map((Ee) => `${Ee.varName} ${X(Ee.relation)} ${Ee.value}`).join(" / ")) ?? "",
          路由脚本: D.routeScriptTxt,
          线条颜色: D.customColor
        };
      });
      vn.book_append_sheet(Z, vn.json_to_sheet(M), "路由线"), Hu(Z, `flow-${ue.workflow.flowId || "flow"}.xlsx`), _t.success("Excel 已下载");
    }
    function he(ue, Z) {
      return ue ? ue.split(";").filter((_e) => _e.startsWith(Z + ".")).map((_e) => _e.slice(Z.length + 1)).join(";") : "";
    }
    return (ue, Z) => {
      const _e = mn("UploadFilled"), F = mn("Document"), M = mn("Search"), D = mn("Warning"), B = mn("Download"), q = mn("Share"), Ee = mn("MagicStick"), Ae = mn("CopyDocument");
      return we(), Oe("div", C6, [
        Le("div", N6, [
          Le("div", {
            class: Sn(["fp-tab-item", { active: n.value === "parse" }]),
            onClick: Z[0] || (Z[0] = (ne) => n.value = "parse")
          }, "流程解析", 2),
          Le("div", {
            class: Sn(["fp-tab-item", { active: n.value === "format" }]),
            onClick: Z[1] || (Z[1] = (ne) => n.value = "format")
          }, "XML格式化", 2)
        ]),
        Yl(Le("div", null, [
          oe(W(Mr), { class: "fp-input-card" }, {
            default: ve(() => [
              oe(W(Zl), {
                modelValue: a.value,
                "onUpdate:modelValue": Z[6] || (Z[6] = (ne) => a.value = ne)
              }, {
                default: ve(() => [
                  oe(W(Rr), {
                    label: "上传XML文件",
                    name: "file"
                  }, {
                    default: ve(() => [
                      oe(W(ql), {
                        drag: "",
                        accept: ".xml,.txt",
                        "auto-upload": !1,
                        "on-change": Y,
                        "show-file-list": !1,
                        style: { "margin-top": "8px" }
                      }, {
                        default: ve(() => [
                          oe(W(Ht), { style: { "font-size": "40px", color: "#409eff" } }, {
                            default: ve(() => [
                              oe(_e)
                            ]),
                            _: 1
                          }),
                          Z[17] || (Z[17] = Le("div", { style: { "margin-top": "8px" } }, "拖拽或点击上传 XML 文件（支持单/多流程）", -1))
                        ]),
                        _: 1
                      }),
                      o.value ? (we(), Oe("div", F6, [
                        oe(W(Ht), null, {
                          default: ve(() => [
                            oe(F)
                          ]),
                          _: 1
                        }),
                        Be(" " + Me(o.value), 1)
                      ])) : ze("", !0)
                    ]),
                    _: 1
                  }),
                  oe(W(Rr), {
                    label: "粘贴XML内容",
                    name: "paste"
                  }, {
                    default: ve(() => [
                      oe(W(Pr), {
                        modelValue: u.value,
                        "onUpdate:modelValue": Z[2] || (Z[2] = (ne) => u.value = ne),
                        type: "textarea",
                        rows: 8,
                        placeholder: "粘贴 XML 内容，支持多个 mxGraphModel 直接拼接",
                        style: { "font-family": "monospace", "font-size": "12px", "margin-top": "8px" }
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  oe(W(Rr), {
                    label: "SQL查询",
                    name: "sql"
                  }, {
                    default: ve(() => [
                      oe(W(jl), {
                        "label-width": "90px",
                        style: { "margin-top": "8px" }
                      }, {
                        default: ve(() => [
                          oe(W(Lr), { label: "数据源" }, {
                            default: ve(() => [
                              oe(W(Jl), {
                                modelValue: l.value.dataSourceId,
                                "onUpdate:modelValue": Z[3] || (Z[3] = (ne) => l.value.dataSourceId = ne),
                                placeholder: "选择数据源",
                                style: { width: "260px" },
                                loading: i.value
                              }, {
                                default: ve(() => [
                                  (we(!0), Oe(ct, null, wn(r.value, (ne) => (we(), at(W(Ql), {
                                    key: ne.id,
                                    label: ne.name,
                                    value: ne.id
                                  }, null, 8, ["label", "value"]))), 128))
                                ]),
                                _: 1
                              }, 8, ["modelValue", "loading"])
                            ]),
                            _: 1
                          }),
                          oe(W(Lr), { label: "SQL语句" }, {
                            default: ve(() => [
                              oe(W(Pr), {
                                modelValue: l.value.sql,
                                "onUpdate:modelValue": Z[4] || (Z[4] = (ne) => l.value.sql = ne),
                                type: "textarea",
                                rows: 4,
                                placeholder: "SELECT flow_content FROM t_flow WHERE flow_id = ?",
                                style: { "font-family": "monospace", "font-size": "12px" }
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          oe(W(Lr), { label: "XML字段名" }, {
                            default: ve(() => [
                              oe(W(Pr), {
                                modelValue: l.value.xmlField,
                                "onUpdate:modelValue": Z[5] || (Z[5] = (ne) => l.value.xmlField = ne),
                                placeholder: "包含XML内容的列名，如 flow_content",
                                style: { width: "260px" }
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
              }, 8, ["modelValue"]),
              Le("div", k6, [
                oe(W(Pt), {
                  type: "primary",
                  loading: c.value,
                  onClick: Q
                }, {
                  default: ve(() => [
                    oe(W(Ht), null, {
                      default: ve(() => [
                        oe(M)
                      ]),
                      _: 1
                    }),
                    Z[18] || (Z[18] = Be(" 解析 ", -1))
                  ]),
                  _: 1
                }, 8, ["loading"]),
                oe(W(Pt), { onClick: R }, {
                  default: ve(() => [...Z[19] || (Z[19] = [
                    Be("清空", -1)
                  ])]),
                  _: 1
                })
              ])
            ]),
            _: 1
          }),
          f.value.length > 1 ? (we(), Oe("div", I6, [
            oe(W(hn), {
              size: "small",
              style: { "margin-right": "8px" }
            }, {
              default: ve(() => [
                Be("共 " + Me(f.value.length) + " 个流程", 1)
              ]),
              _: 1
            }),
            oe(W(eu), {
              modelValue: h.value,
              "onUpdate:modelValue": Z[7] || (Z[7] = (ne) => h.value = ne),
              size: "small"
            }, {
              default: ve(() => [
                (we(!0), Oe(ct, null, wn(f.value, (ne, Ne) => (we(), at(W(tu), {
                  key: Ne,
                  value: Ne
                }, {
                  default: ve(() => {
                    var be, Pe;
                    return [
                      Be(Me(((be = ne.workflow) == null ? void 0 : be.flowName) || ((Pe = ne.workflow) == null ? void 0 : Pe.flowId) || "流程" + (Ne + 1)), 1)
                    ];
                  }),
                  _: 2
                }, 1032, ["value"]))), 128))
              ]),
              _: 1
            }, 8, ["modelValue"])
          ])) : ze("", !0),
          p.value ? (we(), Oe(ct, { key: 1 }, [
            oe(W(Mr), { class: "fp-info-card" }, {
              header: ve(() => [
                Le("div", O6, [
                  Le("span", D6, Me(p.value.workflow.flowName || p.value.workflow.title), 1),
                  Le("div", null, [
                    oe(W(Pt), {
                      size: "small",
                      type: "warning",
                      onClick: y,
                      loading: v.value
                    }, {
                      default: ve(() => [
                        oe(W(Ht), null, {
                          default: ve(() => [
                            oe(D)
                          ]),
                          _: 1
                        }),
                        Z[20] || (Z[20] = Be(" 流程检查 ", -1))
                      ]),
                      _: 1
                    }, 8, ["loading"]),
                    oe(W(Pt), {
                      size: "small",
                      type: "success",
                      onClick: me
                    }, {
                      default: ve(() => [
                        oe(W(Ht), null, {
                          default: ve(() => [
                            oe(B)
                          ]),
                          _: 1
                        }),
                        Z[21] || (Z[21] = Be(" 下载Excel ", -1))
                      ]),
                      _: 1
                    }),
                    oe(W(Pt), {
                      size: "small",
                      type: "primary",
                      onClick: Z[8] || (Z[8] = (ne) => d.value = !0)
                    }, {
                      default: ve(() => [
                        oe(W(Ht), null, {
                          default: ve(() => [
                            oe(q)
                          ]),
                          _: 1
                        }),
                        Z[22] || (Z[22] = Be(" 生成流程图 ", -1))
                      ]),
                      _: 1
                    })
                  ])
                ])
              ]),
              default: ve(() => [
                oe(W(Wd), {
                  column: 4,
                  size: "small",
                  border: ""
                }, {
                  default: ve(() => [
                    oe(W(dn), { label: "流程编号" }, {
                      default: ve(() => [
                        Be(Me(p.value.workflow.flowId), 1)
                      ]),
                      _: 1
                    }),
                    oe(W(dn), { label: "流程标识" }, {
                      default: ve(() => [
                        Be(Me(p.value.workflow.flowSign), 1)
                      ]),
                      _: 1
                    }),
                    oe(W(dn), { label: "流程名称" }, {
                      default: ve(() => [
                        Be(Me(p.value.workflow.flowName), 1)
                      ]),
                      _: 1
                    }),
                    oe(W(dn), { label: "流程标题" }, {
                      default: ve(() => [
                        Be(Me(p.value.workflow.title), 1)
                      ]),
                      _: 1
                    }),
                    oe(W(dn), { label: "流程作者" }, {
                      default: ve(() => [
                        Be(Me(p.value.workflow.flowAdmin), 1)
                      ]),
                      _: 1
                    }),
                    oe(W(dn), { label: "版本编号" }, {
                      default: ve(() => [
                        Be(Me(p.value.workflow.flowVersion), 1)
                      ]),
                      _: 1
                    }),
                    oe(W(dn), { label: "所属机构" }, {
                      default: ve(() => [
                        Be(Me(p.value.workflow.orgId), 1)
                      ]),
                      _: 1
                    }),
                    oe(W(dn), { label: "系统标识" }, {
                      default: ve(() => [
                        Be(Me(p.value.workflow.systemId), 1)
                      ]),
                      _: 1
                    }),
                    oe(W(dn), {
                      label: "创建时间",
                      span: 2
                    }, {
                      default: ve(() => [
                        Be(Me(p.value.workflow.startTime), 1)
                      ]),
                      _: 1
                    }),
                    oe(W(dn), {
                      label: "更新时间",
                      span: 2
                    }, {
                      default: ve(() => [
                        Be(Me(p.value.workflow.updateTime), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            oe(W(Mr), { style: { "margin-top": "12px" } }, {
              header: ve(() => [
                Le("span", b6, "节点列表（" + Me(p.value.nodes.length) + " 个）", 1)
              ]),
              default: ve(() => [
                oe(W(Jo), {
                  data: p.value.nodes,
                  border: "",
                  stripe: "",
                  size: "small",
                  "max-height": "420"
                }, {
                  default: ve(() => [
                    oe(W(it), {
                      type: "index",
                      label: "序",
                      width: "46"
                    }),
                    oe(W(it), {
                      prop: "nodeSign",
                      label: "节点序号",
                      width: "80"
                    }),
                    oe(W(it), {
                      prop: "nid",
                      label: "编号",
                      width: "60"
                    }),
                    oe(W(it), {
                      prop: "label",
                      label: "节点名称",
                      "min-width": "120",
                      "show-overflow-tooltip": ""
                    }),
                    oe(W(it), {
                      label: "类型",
                      width: "64"
                    }, {
                      default: ve(({ row: ne }) => [
                        oe(W(hn), {
                          type: O(ne.nodeType),
                          size: "small"
                        }, {
                          default: ve(() => [
                            Be(Me(L(ne.nodeType)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    oe(W(it), {
                      label: "人员配置",
                      "min-width": "150",
                      "show-overflow-tooltip": ""
                    }, {
                      default: ve(({ row: ne }) => [
                        ne.convertLabel ? (we(), Oe("div", M6, Me(ne.convertLabel), 1)) : ze("", !0),
                        ne.nodeUser ? (we(), Oe("div", R6, Me(ne.nodeUser), 1)) : ze("", !0)
                      ]),
                      _: 1
                    }),
                    oe(W(it), {
                      label: "授权规则",
                      "min-width": "120",
                      "show-overflow-tooltip": ""
                    }, {
                      default: ve(({ row: ne }) => [
                        Be(Me(ne.creditAuth), 1)
                      ]),
                      _: 1
                    }),
                    oe(W(it), {
                      label: "自动提交",
                      width: "72",
                      align: "center"
                    }, {
                      default: ve(({ row: ne }) => [
                        oe(W(hn), {
                          type: ne.autoSubmit === "1" ? "success" : "info",
                          size: "small"
                        }, {
                          default: ve(() => [
                            Be(Me(ne.autoSubmit === "1" ? "是" : "否"), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    oe(W(it), {
                      label: "无人跳过",
                      width: "72",
                      align: "center"
                    }, {
                      default: ve(({ row: ne }) => [
                        oe(W(hn), {
                          type: ne.noUserJump === "1" ? "warning" : "info",
                          size: "small"
                        }, {
                          default: ve(() => [
                            Be(Me(ne.noUserJump === "1" ? "是" : "否"), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    oe(W(it), {
                      label: "退回策略",
                      "min-width": "100",
                      "show-overflow-tooltip": ""
                    }, {
                      default: ve(({ row: ne }) => [
                        Be(Me(le(ne.returnBack)), 1)
                      ]),
                      _: 1
                    }),
                    oe(W(it), {
                      label: "消息通知",
                      "min-width": "100",
                      "show-overflow-tooltip": ""
                    }, {
                      default: ve(({ row: ne }) => [
                        Be(Me(ne.noticeType), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["data"])
              ]),
              _: 1
            }),
            oe(W(Mr), { style: { "margin-top": "12px" } }, {
              header: ve(() => [
                Le("span", P6, "路由线（" + Me(p.value.lines.length) + " 条）", 1)
              ]),
              default: ve(() => [
                oe(W(Jo), {
                  data: p.value.lines,
                  border: "",
                  stripe: "",
                  size: "small",
                  "max-height": "380"
                }, {
                  default: ve(() => [
                    oe(W(it), {
                      type: "index",
                      label: "序",
                      width: "46"
                    }),
                    oe(W(it), {
                      prop: "nid",
                      label: "编号",
                      width: "60"
                    }),
                    oe(W(it), {
                      prop: "label",
                      label: "路由名称",
                      width: "100",
                      "show-overflow-tooltip": ""
                    }),
                    oe(W(it), {
                      label: "起点",
                      width: "120",
                      "show-overflow-tooltip": ""
                    }, {
                      default: ve(({ row: ne }) => [
                        Be(Me(z(ne.source)), 1)
                      ]),
                      _: 1
                    }),
                    oe(W(it), {
                      label: "终点",
                      width: "120",
                      "show-overflow-tooltip": ""
                    }, {
                      default: ve(({ row: ne }) => [
                        Be(Me(z(ne.target)), 1)
                      ]),
                      _: 1
                    }),
                    oe(W(it), {
                      label: "条件逻辑",
                      width: "90"
                    }, {
                      default: ve(({ row: ne }) => [
                        oe(W(hn), {
                          type: ne.isContinueBeanId === "0" ? "info" : "warning",
                          size: "small"
                        }, {
                          default: ve(() => [
                            Be(Me(ne.isContinueBeanId === "0" ? "无条件" : "条件判断"), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    oe(W(it), {
                      label: "条件配置",
                      "min-width": "180",
                      "show-overflow-tooltip": ""
                    }, {
                      default: ve(({ row: ne }) => {
                        var Ne;
                        return [
                          (we(!0), Oe(ct, null, wn(ne.conditions, (be, Pe) => (we(), Oe("div", {
                            key: Pe,
                            style: { "font-size": "11px" }
                          }, Me(Pe > 0 ? be.logic === "1" ? "或" : "且" : "") + " " + Me(be.varName) + " " + Me(X(be.relation)) + " " + Me(be.value), 1))), 128)),
                          !((Ne = ne.conditions) != null && Ne.length) && ne.routeScriptTxt ? (we(), Oe("div", L6, Me(ne.routeScriptTxt.slice(0, 60)) + "…", 1)) : ze("", !0)
                        ];
                      }),
                      _: 1
                    }),
                    oe(W(it), {
                      label: "线条颜色",
                      width: "80",
                      align: "center"
                    }, {
                      default: ve(({ row: ne }) => [
                        ne.customColor ? (we(), Oe("span", {
                          key: 0,
                          style: Yt({ color: ne.customColor, fontWeight: "bold" })
                        }, "■", 4)) : ze("", !0)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["data"])
              ]),
              _: 1
            })
          ], 64)) : ze("", !0),
          oe(W(nu), {
            modelValue: d.value,
            "onUpdate:modelValue": Z[9] || (Z[9] = (ne) => d.value = ne),
            title: "流程图",
            width: "90vw",
            top: "3vh",
            "close-on-click-modal": !1,
            "destroy-on-close": ""
          }, {
            default: ve(() => [
              d.value && p.value ? (we(), at(A6, {
                key: 0,
                nodes: p.value.nodes,
                lines: p.value.lines
              }, null, 8, ["nodes", "lines"])) : ze("", !0)
            ]),
            _: 1
          }, 8, ["modelValue"]),
          oe(W(nu), {
            modelValue: g.value,
            "onUpdate:modelValue": Z[10] || (Z[10] = (ne) => g.value = ne),
            title: "流程检查结果",
            width: "820px",
            "close-on-click-modal": !1,
            "destroy-on-close": ""
          }, {
            default: ve(() => [
              Le("div", B6, [
                Le("div", null, [
                  oe(W(hn), {
                    type: "danger",
                    style: { "margin-right": "6px" }
                  }, {
                    default: ve(() => [
                      Be(" ERROR " + Me(x.value.filter((ne) => ne.level === "ERROR").length), 1)
                    ]),
                    _: 1
                  }),
                  oe(W(hn), {
                    type: "warning",
                    style: { "margin-right": "6px" }
                  }, {
                    default: ve(() => [
                      Be(" WARN " + Me(x.value.filter((ne) => ne.level === "WARN").length), 1)
                    ]),
                    _: 1
                  }),
                  oe(W(hn), { type: "info" }, {
                    default: ve(() => [
                      Be(" INFO " + Me(x.value.filter((ne) => ne.level === "INFO").length), 1)
                    ]),
                    _: 1
                  })
                ]),
                oe(W(Pt), {
                  size: "small",
                  type: "success",
                  onClick: T
                }, {
                  default: ve(() => [
                    oe(W(Ht), null, {
                      default: ve(() => [
                        oe(B)
                      ]),
                      _: 1
                    }),
                    Z[23] || (Z[23] = Be(" 导出Excel ", -1))
                  ]),
                  _: 1
                })
              ]),
              oe(W(Jo), {
                data: x.value,
                border: "",
                stripe: "",
                size: "small",
                "max-height": "480"
              }, {
                default: ve(() => [
                  oe(W(it), {
                    label: "级别",
                    width: "74",
                    align: "center"
                  }, {
                    default: ve(({ row: ne }) => [
                      oe(W(hn), {
                        type: m(ne.level),
                        size: "small"
                      }, {
                        default: ve(() => [
                          Be(Me(ne.level), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])
                    ]),
                    _: 1
                  }),
                  oe(W(it), {
                    prop: "ruleCode",
                    label: "规则编号",
                    width: "80"
                  }),
                  oe(W(it), {
                    prop: "ruleName",
                    label: "规则名称",
                    width: "120"
                  }),
                  oe(W(it), {
                    prop: "nodeName",
                    label: "关联节点",
                    width: "120",
                    "show-overflow-tooltip": ""
                  }),
                  oe(W(it), {
                    prop: "message",
                    label: "问题描述",
                    "min-width": "200",
                    "show-overflow-tooltip": ""
                  })
                ]),
                _: 1
              }, 8, ["data"]),
              x.value.length ? ze("", !0) : (we(), Oe("div", $6, " ✓ 未发现配置问题 "))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ], 512), [
          [Kl, n.value === "parse"]
        ]),
        Yl(Le("div", null, [
          oe(W(Mr), { class: "fp-input-card" }, {
            default: ve(() => [
              oe(W(Zl), {
                modelValue: V.value,
                "onUpdate:modelValue": Z[15] || (Z[15] = (ne) => V.value = ne)
              }, {
                default: ve(() => [
                  oe(W(Rr), {
                    label: "上传XML文件",
                    name: "file"
                  }, {
                    default: ve(() => [
                      oe(W(ql), {
                        drag: "",
                        accept: ".xml,.txt",
                        "auto-upload": !1,
                        "on-change": I,
                        "show-file-list": !1,
                        style: { "margin-top": "8px" }
                      }, {
                        default: ve(() => [
                          oe(W(Ht), { style: { "font-size": "40px", color: "#409eff" } }, {
                            default: ve(() => [
                              oe(_e)
                            ]),
                            _: 1
                          }),
                          Z[24] || (Z[24] = Le("div", { style: { "margin-top": "8px" } }, "拖拽或点击上传 XML 文件", -1))
                        ]),
                        _: 1
                      }),
                      P.value ? (we(), Oe("div", U6, [
                        oe(W(Ht), null, {
                          default: ve(() => [
                            oe(F)
                          ]),
                          _: 1
                        }),
                        Be(" " + Me(P.value), 1)
                      ])) : ze("", !0)
                    ]),
                    _: 1
                  }),
                  oe(W(Rr), {
                    label: "粘贴XML内容",
                    name: "paste"
                  }, {
                    default: ve(() => [
                      oe(W(Pr), {
                        modelValue: G.value,
                        "onUpdate:modelValue": Z[11] || (Z[11] = (ne) => G.value = ne),
                        type: "textarea",
                        rows: 8,
                        placeholder: "粘贴 XML 内容",
                        style: { "font-family": "monospace", "font-size": "12px", "margin-top": "8px" }
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  oe(W(Rr), {
                    label: "SQL查询",
                    name: "sql"
                  }, {
                    default: ve(() => [
                      oe(W(jl), {
                        "label-width": "90px",
                        style: { "margin-top": "8px" }
                      }, {
                        default: ve(() => [
                          oe(W(Lr), { label: "数据源" }, {
                            default: ve(() => [
                              oe(W(Jl), {
                                modelValue: C.value.dataSourceId,
                                "onUpdate:modelValue": Z[12] || (Z[12] = (ne) => C.value.dataSourceId = ne),
                                placeholder: "选择数据源",
                                style: { width: "260px" },
                                loading: i.value
                              }, {
                                default: ve(() => [
                                  (we(!0), Oe(ct, null, wn(r.value, (ne) => (we(), at(W(Ql), {
                                    key: ne.id,
                                    label: ne.name,
                                    value: ne.id
                                  }, null, 8, ["label", "value"]))), 128))
                                ]),
                                _: 1
                              }, 8, ["modelValue", "loading"])
                            ]),
                            _: 1
                          }),
                          oe(W(Lr), { label: "SQL语句" }, {
                            default: ve(() => [
                              oe(W(Pr), {
                                modelValue: C.value.sql,
                                "onUpdate:modelValue": Z[13] || (Z[13] = (ne) => C.value.sql = ne),
                                type: "textarea",
                                rows: 4,
                                placeholder: "SELECT flow_content FROM t_flow WHERE flow_id = ?",
                                style: { "font-family": "monospace", "font-size": "12px" }
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          oe(W(Lr), { label: "XML字段名" }, {
                            default: ve(() => [
                              oe(W(Pr), {
                                modelValue: C.value.xmlField,
                                "onUpdate:modelValue": Z[14] || (Z[14] = (ne) => C.value.xmlField = ne),
                                placeholder: "包含XML内容的列名",
                                style: { width: "260px" }
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
              }, 8, ["modelValue"]),
              Le("div", z6, [
                oe(W(Pt), {
                  type: "primary",
                  loading: se.value,
                  onClick: K
                }, {
                  default: ve(() => [
                    oe(W(Ht), null, {
                      default: ve(() => [
                        oe(Ee)
                      ]),
                      _: 1
                    }),
                    Z[25] || (Z[25] = Be(" 格式化 ", -1))
                  ]),
                  _: 1
                }, 8, ["loading"]),
                oe(W(Pt), { onClick: ee }, {
                  default: ve(() => [...Z[26] || (Z[26] = [
                    Be("清空", -1)
                  ])]),
                  _: 1
                })
              ])
            ]),
            _: 1
          }),
          w.value.length ? (we(), Oe(ct, { key: 0 }, [
            w.value.length > 1 ? (we(), Oe("div", H6, [
              oe(W(hn), {
                size: "small",
                style: { "margin-right": "8px" }
              }, {
                default: ve(() => [
                  Be("共 " + Me(w.value.length) + " 条", 1)
                ]),
                _: 1
              }),
              oe(W(eu), {
                modelValue: U.value,
                "onUpdate:modelValue": Z[16] || (Z[16] = (ne) => U.value = ne),
                size: "small"
              }, {
                default: ve(() => [
                  (we(!0), Oe(ct, null, wn(w.value, (ne, Ne) => (we(), at(W(tu), {
                    key: Ne,
                    value: Ne
                  }, {
                    default: ve(() => [
                      Be(" 第 " + Me(Ne + 1) + " 条 ", 1)
                    ]),
                    _: 2
                  }, 1032, ["value"]))), 128))
                ]),
                _: 1
              }, 8, ["modelValue"])
            ])) : ze("", !0),
            oe(W(Mr), { style: { "margin-top": "12px" } }, {
              header: ve(() => [
                Le("div", V6, [
                  Z[30] || (Z[30] = Le("span", { style: { "font-weight": "600" } }, "格式化结果", -1)),
                  Le("div", W6, [
                    oe(W(Pt), {
                      size: "small",
                      onClick: J
                    }, {
                      default: ve(() => [
                        oe(W(Ht), null, {
                          default: ve(() => [
                            oe(Ae)
                          ]),
                          _: 1
                        }),
                        Z[27] || (Z[27] = Be(" 复制 ", -1))
                      ]),
                      _: 1
                    }),
                    oe(W(Pt), {
                      size: "small",
                      type: "success",
                      onClick: de
                    }, {
                      default: ve(() => [
                        oe(W(Ht), null, {
                          default: ve(() => [
                            oe(B)
                          ]),
                          _: 1
                        }),
                        Z[28] || (Z[28] = Be(" 下载XML ", -1))
                      ]),
                      _: 1
                    }),
                    w.value.length > 1 ? (we(), at(W(Pt), {
                      key: 0,
                      size: "small",
                      type: "warning",
                      onClick: A
                    }, {
                      default: ve(() => [
                        oe(W(Ht), null, {
                          default: ve(() => [
                            oe(B)
                          ]),
                          _: 1
                        }),
                        Z[29] || (Z[29] = Be(" 下载全部 ", -1))
                      ]),
                      _: 1
                    })) : ze("", !0)
                  ])
                ])
              ]),
              default: ve(() => [
                Le("pre", G6, Me(w.value[U.value]), 1)
              ]),
              _: 1
            })
          ], 64)) : ze("", !0)
        ], 512), [
          [Kl, n.value === "format"]
        ])
      ]);
    };
  }
}), Y6 = /* @__PURE__ */ md(X6, [["__scopeId", "data-v-a502ca4b"]]);
function q6(e, t) {
  return Ze({
    render() {
      return Ke(Y6, { api: e, toolId: t });
    }
  });
}
export {
  q6 as createView
};
