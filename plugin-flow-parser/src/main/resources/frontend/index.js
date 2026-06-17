import { defineComponent as Cf, ref as Oe, onMounted as Vl, computed as Zn, resolveComponent as ct, openBlock as Se, createElementBlock as Me, createElementVNode as Ae, normalizeClass as hn, withDirectives as xs, createVNode as W, unref as X, withCtx as Y, createTextVNode as ke, toDisplayString as _e, createCommentVNode as or, createBlock as gt, Fragment as Zr, renderList as Gt, normalizeStyle as Hl, vShow as ds, h as Xl } from "vue";
import { ElCard as Ha, ElTabs as ps, ElTabPane as Xa, ElUpload as vs, ElIcon as Sr, ElForm as G0, ElFormItem as pa, ElSelect as $0, ElOption as j0, ElInput as va, ElButton as Cr, ElCollapse as zl, ElCollapseItem as Gl, ElTable as za, ElTableColumn as De, ElTag as Vr, ElDialog as xn, ElDescriptions as ms, ElDescriptionsItem as at, ElMessage as qe } from "element-plus";
/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var o0 = {};
o0.version = "0.18.5";
var bf = 1252, $l = [874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1e4], wi = {
  /*::[*/
  0: 1252,
  /* ANSI */
  /*::[*/
  1: 65001,
  /* DEFAULT */
  /*::[*/
  2: 65001,
  /* SYMBOL */
  /*::[*/
  77: 1e4,
  /* MAC */
  /*::[*/
  128: 932,
  /* SHIFTJIS */
  /*::[*/
  129: 949,
  /* HANGUL */
  /*::[*/
  130: 1361,
  /* JOHAB */
  /*::[*/
  134: 936,
  /* GB2312 */
  /*::[*/
  136: 950,
  /* CHINESEBIG5 */
  /*::[*/
  161: 1253,
  /* GREEK */
  /*::[*/
  162: 1254,
  /* TURKISH */
  /*::[*/
  163: 1258,
  /* VIETNAMESE */
  /*::[*/
  177: 1255,
  /* HEBREW */
  /*::[*/
  178: 1256,
  /* ARABIC */
  /*::[*/
  186: 1257,
  /* BALTIC */
  /*::[*/
  204: 1251,
  /* RUSSIAN */
  /*::[*/
  222: 874,
  /* THAI */
  /*::[*/
  238: 1250,
  /* EASTEUROPE */
  /*::[*/
  255: 1252,
  /* OEM */
  /*::[*/
  69: 6969
  /* MISC */
}, ki = function(e) {
  $l.indexOf(e) != -1 && (bf = wi[0] = e);
};
function jl() {
  ki(1252);
}
var Nt = function(e) {
  ki(e);
};
function Ei() {
  Nt(1200), jl();
}
function gs(e) {
  for (var t = [], r = 0, a = e.length; r < a; ++r) t[r] = e.charCodeAt(r);
  return t;
}
function Kl(e) {
  for (var t = [], r = 0; r < e.length >> 1; ++r) t[r] = String.fromCharCode(e.charCodeAt(2 * r) + (e.charCodeAt(2 * r + 1) << 8));
  return t.join("");
}
function Df(e) {
  for (var t = [], r = 0; r < e.length >> 1; ++r) t[r] = String.fromCharCode(e.charCodeAt(2 * r + 1) + (e.charCodeAt(2 * r) << 8));
  return t.join("");
}
var vn = function(e) {
  var t = e.charCodeAt(0), r = e.charCodeAt(1);
  return t == 255 && r == 254 ? Kl(e.slice(2)) : t == 254 && r == 255 ? Df(e.slice(2)) : t == 65279 ? e.slice(1) : e;
}, Qn = function(t) {
  return String.fromCharCode(t);
}, _s = function(t) {
  return String.fromCharCode(t);
}, An, ra = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function Cn(e) {
  for (var t = "", r = 0, a = 0, n = 0, i = 0, s = 0, f = 0, c = 0, l = 0; l < e.length; )
    r = e.charCodeAt(l++), i = r >> 2, a = e.charCodeAt(l++), s = (r & 3) << 4 | a >> 4, n = e.charCodeAt(l++), f = (a & 15) << 2 | n >> 6, c = n & 63, isNaN(a) ? f = c = 64 : isNaN(n) && (c = 64), t += ra.charAt(i) + ra.charAt(s) + ra.charAt(f) + ra.charAt(c);
  return t;
}
function xt(e) {
  var t = "", r = 0, a = 0, n = 0, i = 0, s = 0, f = 0, c = 0;
  e = e.replace(/[^\w\+\/\=]/g, "");
  for (var l = 0; l < e.length; )
    i = ra.indexOf(e.charAt(l++)), s = ra.indexOf(e.charAt(l++)), r = i << 2 | s >> 4, t += String.fromCharCode(r), f = ra.indexOf(e.charAt(l++)), a = (s & 15) << 4 | f >> 2, f !== 64 && (t += String.fromCharCode(a)), c = ra.indexOf(e.charAt(l++)), n = (f & 3) << 6 | c, c !== 64 && (t += String.fromCharCode(n));
  return t;
}
var We = /* @__PURE__ */ function() {
  return typeof Buffer < "u" && typeof process < "u" && typeof process.versions < "u" && !!process.versions.node;
}(), qt = /* @__PURE__ */ function() {
  if (typeof Buffer < "u") {
    var e = !Buffer.from;
    if (!e) try {
      Buffer.from("foo", "utf8");
    } catch {
      e = !0;
    }
    return e ? function(t, r) {
      return r ? new Buffer(t, r) : new Buffer(t);
    } : Buffer.from.bind(Buffer);
  }
  return function() {
  };
}();
function aa(e) {
  return We ? Buffer.alloc ? Buffer.alloc(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
function ws(e) {
  return We ? Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
var ut = function(t) {
  return We ? qt(t, "binary") : t.split("").map(function(r) {
    return r.charCodeAt(0) & 255;
  });
};
function T0(e) {
  if (typeof ArrayBuffer > "u") return ut(e);
  for (var t = new ArrayBuffer(e.length), r = new Uint8Array(t), a = 0; a != e.length; ++a) r[a] = e.charCodeAt(a) & 255;
  return t;
}
function fa(e) {
  if (Array.isArray(e)) return e.map(function(a) {
    return String.fromCharCode(a);
  }).join("");
  for (var t = [], r = 0; r < e.length; ++r) t[r] = String.fromCharCode(e[r]);
  return t.join("");
}
function Yl(e) {
  if (typeof Uint8Array > "u") throw new Error("Unsupported");
  return new Uint8Array(e);
}
function Ti(e) {
  if (typeof ArrayBuffer > "u") throw new Error("Unsupported");
  if (e instanceof ArrayBuffer) return Ti(new Uint8Array(e));
  for (var t = new Array(e.length), r = 0; r < e.length; ++r) t[r] = e[r];
  return t;
}
var Dr = We ? function(e) {
  return Buffer.concat(e.map(function(t) {
    return Buffer.isBuffer(t) ? t : qt(t);
  }));
} : function(e) {
  if (typeof Uint8Array < "u") {
    var t = 0, r = 0;
    for (t = 0; t < e.length; ++t) r += e[t].length;
    var a = new Uint8Array(r), n = 0;
    for (t = 0, r = 0; t < e.length; r += n, ++t)
      if (n = e[t].length, e[t] instanceof Uint8Array) a.set(e[t], r);
      else {
        if (typeof e[t] == "string")
          throw "wtf";
        a.set(new Uint8Array(e[t]), r);
      }
    return a;
  }
  return [].concat.apply([], e.map(function(i) {
    return Array.isArray(i) ? i : [].slice.call(i);
  }));
};
function Jl(e) {
  for (var t = [], r = 0, a = e.length + 250, n = aa(e.length + 255), i = 0; i < e.length; ++i) {
    var s = e.charCodeAt(i);
    if (s < 128) n[r++] = s;
    else if (s < 2048)
      n[r++] = 192 | s >> 6 & 31, n[r++] = 128 | s & 63;
    else if (s >= 55296 && s < 57344) {
      s = (s & 1023) + 64;
      var f = e.charCodeAt(++i) & 1023;
      n[r++] = 240 | s >> 8 & 7, n[r++] = 128 | s >> 2 & 63, n[r++] = 128 | f >> 6 & 15 | (s & 3) << 4, n[r++] = 128 | f & 63;
    } else
      n[r++] = 224 | s >> 12 & 15, n[r++] = 128 | s >> 6 & 63, n[r++] = 128 | s & 63;
    r > a && (t.push(n.slice(0, r)), r = 0, n = aa(65535), a = 65530);
  }
  return t.push(n.slice(0, r)), Dr(t);
}
var rt = /\u0000/g, mn = /[\u0001-\u0006]/g;
function Ja(e) {
  for (var t = "", r = e.length - 1; r >= 0; ) t += e.charAt(r--);
  return t;
}
function Rt(e, t) {
  var r = "" + e;
  return r.length >= t ? r : vr("0", t - r.length) + r;
}
function yi(e, t) {
  var r = "" + e;
  return r.length >= t ? r : vr(" ", t - r.length) + r;
}
function u0(e, t) {
  var r = "" + e;
  return r.length >= t ? r : r + vr(" ", t - r.length);
}
function ql(e, t) {
  var r = "" + Math.round(e);
  return r.length >= t ? r : vr("0", t - r.length) + r;
}
function Zl(e, t) {
  var r = "" + e;
  return r.length >= t ? r : vr("0", t - r.length) + r;
}
var ks = /* @__PURE__ */ Math.pow(2, 32);
function Ga(e, t) {
  if (e > ks || e < -ks) return ql(e, t);
  var r = Math.round(e);
  return Zl(r, t);
}
function h0(e, t) {
  return t = t || 0, e.length >= 7 + t && (e.charCodeAt(t) | 32) === 103 && (e.charCodeAt(t + 1) | 32) === 101 && (e.charCodeAt(t + 2) | 32) === 110 && (e.charCodeAt(t + 3) | 32) === 101 && (e.charCodeAt(t + 4) | 32) === 114 && (e.charCodeAt(t + 5) | 32) === 97 && (e.charCodeAt(t + 6) | 32) === 108;
}
var Es = [
  ["Sun", "Sunday"],
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"]
], K0 = [
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
function Ql(e) {
  return e || (e = {}), e[0] = "General", e[1] = "0", e[2] = "0.00", e[3] = "#,##0", e[4] = "#,##0.00", e[9] = "0%", e[10] = "0.00%", e[11] = "0.00E+00", e[12] = "# ?/?", e[13] = "# ??/??", e[14] = "m/d/yy", e[15] = "d-mmm-yy", e[16] = "d-mmm", e[17] = "mmm-yy", e[18] = "h:mm AM/PM", e[19] = "h:mm:ss AM/PM", e[20] = "h:mm", e[21] = "h:mm:ss", e[22] = "m/d/yy h:mm", e[37] = "#,##0 ;(#,##0)", e[38] = "#,##0 ;[Red](#,##0)", e[39] = "#,##0.00;(#,##0.00)", e[40] = "#,##0.00;[Red](#,##0.00)", e[45] = "mm:ss", e[46] = "[h]:mm:ss", e[47] = "mmss.0", e[48] = "##0.0E+0", e[49] = "@", e[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "', e;
}
var Fe = {
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
}, Ts = {
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
}, eo = {
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
function x0(e, t, r) {
  for (var a = e < 0 ? -1 : 1, n = e * a, i = 0, s = 1, f = 0, c = 1, l = 0, o = 0, u = Math.floor(n); l < t && (u = Math.floor(n), f = u * s + i, o = u * l + c, !(n - u < 5e-8)); )
    n = 1 / (n - u), i = s, s = f, c = l, l = o;
  if (o > t && (l > t ? (o = c, f = i) : (o = l, f = s)), !r) return [0, a * f, o];
  var x = Math.floor(a * f / o);
  return [x, a * f - x * o, o];
}
function ga(e, t, r) {
  if (e > 2958465 || e < 0) return null;
  var a = e | 0, n = Math.floor(86400 * (e - a)), i = 0, s = [], f = { D: a, T: n, u: 86400 * (e - a) - n, y: 0, m: 0, d: 0, H: 0, M: 0, S: 0, q: 0 };
  if (Math.abs(f.u) < 1e-6 && (f.u = 0), t && t.date1904 && (a += 1462), f.u > 0.9999 && (f.u = 0, ++n == 86400 && (f.T = n = 0, ++a, ++f.D)), a === 60)
    s = r ? [1317, 10, 29] : [1900, 2, 29], i = 3;
  else if (a === 0)
    s = r ? [1317, 8, 29] : [1900, 1, 0], i = 6;
  else {
    a > 60 && --a;
    var c = new Date(1900, 0, 1);
    c.setDate(c.getDate() + a - 1), s = [c.getFullYear(), c.getMonth() + 1, c.getDate()], i = c.getDay(), a < 60 && (i = (i + 6) % 7), r && (i = so(c, s));
  }
  return f.y = s[0], f.m = s[1], f.d = s[2], f.S = n % 60, n = Math.floor(n / 60), f.M = n % 60, n = Math.floor(n / 60), f.H = n, f.q = i, f;
}
var If = /* @__PURE__ */ new Date(1899, 11, 31, 0, 0, 0), ro = /* @__PURE__ */ If.getTime(), to = /* @__PURE__ */ new Date(1900, 2, 1, 0, 0, 0);
function Of(e, t) {
  var r = /* @__PURE__ */ e.getTime();
  return t ? r -= 1461 * 24 * 60 * 60 * 1e3 : e >= to && (r += 24 * 60 * 60 * 1e3), (r - (ro + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ If.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3);
}
function Si(e) {
  return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1");
}
function ao(e) {
  return e.indexOf("E") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/, "$10$2");
}
function no(e) {
  var t = e < 0 ? 12 : 11, r = Si(e.toFixed(12));
  return r.length <= t || (r = e.toPrecision(10), r.length <= t) ? r : e.toExponential(5);
}
function io(e) {
  var t = Si(e.toFixed(11));
  return t.length > (e < 0 ? 12 : 11) || t === "0" || t === "-0" ? e.toPrecision(6) : t;
}
function bn(e) {
  var t = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E), r;
  return t >= -4 && t <= -1 ? r = e.toPrecision(10 + t) : Math.abs(t) <= 9 ? r = no(e) : t === 10 ? r = e.toFixed(10).substr(0, 12) : r = io(e), Si(ao(r.toUpperCase()));
}
function Ta(e, t) {
  switch (typeof e) {
    case "string":
      return e;
    case "boolean":
      return e ? "TRUE" : "FALSE";
    case "number":
      return (e | 0) === e ? e.toString(10) : bn(e);
    case "undefined":
      return "";
    case "object":
      if (e == null) return "";
      if (e instanceof Date) return Ft(14, Of(e, t && t.date1904), t);
  }
  throw new Error("unsupported value in General format: " + e);
}
function so(e, t) {
  t[0] -= 581;
  var r = e.getDay();
  return e < 60 && (r = (r + 6) % 7), r;
}
function fo(e, t, r, a) {
  var n = "", i = 0, s = 0, f = r.y, c, l = 0;
  switch (e) {
    case 98:
      f = r.y + 543;
    case 121:
      switch (t.length) {
        case 1:
        case 2:
          c = f % 100, l = 2;
          break;
        default:
          c = f % 1e4, l = 4;
          break;
      }
      break;
    case 109:
      switch (t.length) {
        case 1:
        case 2:
          c = r.m, l = t.length;
          break;
        case 3:
          return K0[r.m - 1][1];
        case 5:
          return K0[r.m - 1][0];
        default:
          return K0[r.m - 1][2];
      }
      break;
    case 100:
      switch (t.length) {
        case 1:
        case 2:
          c = r.d, l = t.length;
          break;
        case 3:
          return Es[r.q][0];
        default:
          return Es[r.q][1];
      }
      break;
    case 104:
      switch (t.length) {
        case 1:
        case 2:
          c = 1 + (r.H + 11) % 12, l = t.length;
          break;
        default:
          throw "bad hour format: " + t;
      }
      break;
    case 72:
      switch (t.length) {
        case 1:
        case 2:
          c = r.H, l = t.length;
          break;
        default:
          throw "bad hour format: " + t;
      }
      break;
    case 77:
      switch (t.length) {
        case 1:
        case 2:
          c = r.M, l = t.length;
          break;
        default:
          throw "bad minute format: " + t;
      }
      break;
    case 115:
      if (t != "s" && t != "ss" && t != ".0" && t != ".00" && t != ".000") throw "bad second format: " + t;
      return r.u === 0 && (t == "s" || t == "ss") ? Rt(r.S, t.length) : (a >= 2 ? s = a === 3 ? 1e3 : 100 : s = a === 1 ? 10 : 1, i = Math.round(s * (r.S + r.u)), i >= 60 * s && (i = 0), t === "s" ? i === 0 ? "0" : "" + i / s : (n = Rt(i, 2 + a), t === "ss" ? n.substr(0, 2) : "." + n.substr(2, t.length - 1)));
    case 90:
      switch (t) {
        case "[h]":
        case "[hh]":
          c = r.D * 24 + r.H;
          break;
        case "[m]":
        case "[mm]":
          c = (r.D * 24 + r.H) * 60 + r.M;
          break;
        case "[s]":
        case "[ss]":
          c = ((r.D * 24 + r.H) * 60 + r.M) * 60 + Math.round(r.S + r.u);
          break;
        default:
          throw "bad abstime format: " + t;
      }
      l = t.length === 3 ? 1 : 2;
      break;
    case 101:
      c = f, l = 1;
      break;
  }
  var o = l > 0 ? Rt(c, l) : "";
  return o;
}
function ta(e) {
  var t = 3;
  if (e.length <= t) return e;
  for (var r = e.length % t, a = e.substr(0, r); r != e.length; r += t) a += (a.length > 0 ? "," : "") + e.substr(r, t);
  return a;
}
var Nf = /%/g;
function co(e, t, r) {
  var a = t.replace(Nf, ""), n = t.length - a.length;
  return jt(e, a, r * Math.pow(10, 2 * n)) + vr("%", n);
}
function lo(e, t, r) {
  for (var a = t.length - 1; t.charCodeAt(a - 1) === 44; ) --a;
  return jt(e, t.substr(0, a), r / Math.pow(10, 3 * (t.length - a)));
}
function Rf(e, t) {
  var r, a = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0) return "0.0E+0";
    if (t < 0) return "-" + Rf(e, -t);
    var n = e.indexOf(".");
    n === -1 && (n = e.indexOf("E"));
    var i = Math.floor(Math.log(t) * Math.LOG10E) % n;
    if (i < 0 && (i += n), r = (t / Math.pow(10, i)).toPrecision(a + 1 + (n + i) % n), r.indexOf("e") === -1) {
      var s = Math.floor(Math.log(t) * Math.LOG10E);
      for (r.indexOf(".") === -1 ? r = r.charAt(0) + "." + r.substr(1) + "E+" + (s - r.length + i) : r += "E+" + (s - i); r.substr(0, 2) === "0."; )
        r = r.charAt(0) + r.substr(2, n) + "." + r.substr(2 + n), r = r.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.");
      r = r.replace(/\+-/, "-");
    }
    r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(f, c, l, o) {
      return c + l + o.substr(0, (n + i) % n) + "." + o.substr(i) + "E";
    });
  } else r = t.toExponential(a);
  return e.match(/E\+00$/) && r.match(/e[+-]\d$/) && (r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1)), e.match(/E\-/) && r.match(/e\+/) && (r = r.replace(/e\+/, "e")), r.replace("e", "E");
}
var Lf = /# (\?+)( ?)\/( ?)(\d+)/;
function oo(e, t, r) {
  var a = parseInt(e[4], 10), n = Math.round(t * a), i = Math.floor(n / a), s = n - i * a, f = a;
  return r + (i === 0 ? "" : "" + i) + " " + (s === 0 ? vr(" ", e[1].length + 1 + e[4].length) : yi(s, e[1].length) + e[2] + "/" + e[3] + Rt(f, e[4].length));
}
function uo(e, t, r) {
  return r + (t === 0 ? "" : "" + t) + vr(" ", e[1].length + 2 + e[4].length);
}
var Pf = /^#*0*\.([0#]+)/, Bf = /\).*[0#]/, Mf = /\(###\) ###\\?-####/;
function Qr(e) {
  for (var t = "", r, a = 0; a != e.length; ++a) switch (r = e.charCodeAt(a)) {
    case 35:
      break;
    case 63:
      t += " ";
      break;
    case 48:
      t += "0";
      break;
    default:
      t += String.fromCharCode(r);
  }
  return t;
}
function ys(e, t) {
  var r = Math.pow(10, t);
  return "" + Math.round(e * r) / r;
}
function Ss(e, t) {
  var r = e - Math.floor(e), a = Math.pow(10, t);
  return t < ("" + Math.round(r * a)).length ? 0 : Math.round(r * a);
}
function ho(e, t) {
  return t < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, t))).length ? 1 : 0;
}
function xo(e) {
  return e < 2147483647 && e > -2147483648 ? "" + (e >= 0 ? e | 0 : e - 1 | 0) : "" + Math.floor(e);
}
function wt(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(Bf)) {
    var a = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? wt("n", a, r) : "(" + wt("n", a, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44) return lo(e, t, r);
  if (t.indexOf("%") !== -1) return co(e, t, r);
  if (t.indexOf("E") !== -1) return Rf(t, r);
  if (t.charCodeAt(0) === 36) return "$" + wt(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var n, i, s, f, c = Math.abs(r), l = r < 0 ? "-" : "";
  if (t.match(/^00+$/)) return l + Ga(c, t.length);
  if (t.match(/^[#?]+$/))
    return n = Ga(r, 0), n === "0" && (n = ""), n.length > t.length ? n : Qr(t.substr(0, t.length - n.length)) + n;
  if (i = t.match(Lf)) return oo(i, c, l);
  if (t.match(/^#+0+$/)) return l + Ga(c, t.length - t.indexOf("0"));
  if (i = t.match(Pf))
    return n = ys(r, i[1].length).replace(/^([^\.]+)$/, "$1." + Qr(i[1])).replace(/\.$/, "." + Qr(i[1])).replace(/\.(\d*)$/, function(v, h) {
      return "." + h + vr("0", Qr(
        /*::(*/
        i[1]
      ).length - h.length);
    }), t.indexOf("0.") !== -1 ? n : n.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return l + ys(c, i[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/)) return l + ta(Ga(c, 0));
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + wt(e, t, -r) : ta("" + (Math.floor(r) + ho(r, i[1].length))) + "." + Rt(Ss(r, i[1].length), i[1].length);
  if (i = t.match(/^#,#*,#0/)) return wt(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return n = Ja(wt(e, t.replace(/[\\-]/g, ""), r)), s = 0, Ja(Ja(t.replace(/\\/g, "")).replace(/[0#]/g, function(v) {
      return s < n.length ? n.charAt(s++) : v === "0" ? "0" : "";
    }));
  if (t.match(Mf))
    return n = wt(e, "##########", r), "(" + n.substr(0, 3) + ") " + n.substr(3, 3) + "-" + n.substr(6);
  var o = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), f = x0(c, Math.pow(10, s) - 1, !1), n = "" + l, o = jt(
      "n",
      /*::String(*/
      i[1],
      f[1]
    ), o.charAt(o.length - 1) == " " && (o = o.substr(0, o.length - 1) + "0"), n += o + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], o = u0(f[2], s), o.length < i[4].length && (o = Qr(i[4].substr(i[4].length - o.length)) + o), n += o, n;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = x0(c, Math.pow(10, s) - 1, !0), l + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? yi(f[1], s) + i[2] + "/" + i[3] + u0(f[2], s) : vr(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return n = Ga(r, 0), t.length <= n.length ? n : Qr(t.substr(0, t.length - n.length)) + n;
  if (i = t.match(/^([#0?]+)\.([#0]+)$/)) {
    n = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = n.indexOf(".");
    var u = t.indexOf(".") - s, x = t.length - n.length - u;
    return Qr(t.substr(0, u) + n + t.substr(t.length - x));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return s = Ss(r, i[1].length), r < 0 ? "-" + wt(e, t, -r) : ta(xo(r)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(v) {
      return "00," + (v.length < 3 ? Rt(0, 3 - v.length) : "") + v;
    }) + "." + Rt(s, i[1].length);
  switch (t) {
    case "###,##0.00":
      return wt(e, "#,##0.00", r);
    case "###,###":
    case "##,###":
    case "#,###":
      var d = ta(Ga(c, 0));
      return d !== "0" ? l + d : "";
    case "###,###.00":
      return wt(e, "###,##0.00", r).replace(/^0\./, ".");
    case "#,###.00":
      return wt(e, "#,##0.00", r).replace(/^0\./, ".");
  }
  throw new Error("unsupported format |" + t + "|");
}
function po(e, t, r) {
  for (var a = t.length - 1; t.charCodeAt(a - 1) === 44; ) --a;
  return jt(e, t.substr(0, a), r / Math.pow(10, 3 * (t.length - a)));
}
function vo(e, t, r) {
  var a = t.replace(Nf, ""), n = t.length - a.length;
  return jt(e, a, r * Math.pow(10, 2 * n)) + vr("%", n);
}
function Uf(e, t) {
  var r, a = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0) return "0.0E+0";
    if (t < 0) return "-" + Uf(e, -t);
    var n = e.indexOf(".");
    n === -1 && (n = e.indexOf("E"));
    var i = Math.floor(Math.log(t) * Math.LOG10E) % n;
    if (i < 0 && (i += n), r = (t / Math.pow(10, i)).toPrecision(a + 1 + (n + i) % n), !r.match(/[Ee]/)) {
      var s = Math.floor(Math.log(t) * Math.LOG10E);
      r.indexOf(".") === -1 ? r = r.charAt(0) + "." + r.substr(1) + "E+" + (s - r.length + i) : r += "E+" + (s - i), r = r.replace(/\+-/, "-");
    }
    r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(f, c, l, o) {
      return c + l + o.substr(0, (n + i) % n) + "." + o.substr(i) + "E";
    });
  } else r = t.toExponential(a);
  return e.match(/E\+00$/) && r.match(/e[+-]\d$/) && (r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1)), e.match(/E\-/) && r.match(/e\+/) && (r = r.replace(/e\+/, "e")), r.replace("e", "E");
}
function Wt(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(Bf)) {
    var a = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? Wt("n", a, r) : "(" + Wt("n", a, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44) return po(e, t, r);
  if (t.indexOf("%") !== -1) return vo(e, t, r);
  if (t.indexOf("E") !== -1) return Uf(t, r);
  if (t.charCodeAt(0) === 36) return "$" + Wt(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var n, i, s, f, c = Math.abs(r), l = r < 0 ? "-" : "";
  if (t.match(/^00+$/)) return l + Rt(c, t.length);
  if (t.match(/^[#?]+$/))
    return n = "" + r, r === 0 && (n = ""), n.length > t.length ? n : Qr(t.substr(0, t.length - n.length)) + n;
  if (i = t.match(Lf)) return uo(i, c, l);
  if (t.match(/^#+0+$/)) return l + Rt(c, t.length - t.indexOf("0"));
  if (i = t.match(Pf))
    return n = ("" + r).replace(/^([^\.]+)$/, "$1." + Qr(i[1])).replace(/\.$/, "." + Qr(i[1])), n = n.replace(/\.(\d*)$/, function(v, h) {
      return "." + h + vr("0", Qr(i[1]).length - h.length);
    }), t.indexOf("0.") !== -1 ? n : n.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return l + ("" + c).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/)) return l + ta("" + c);
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + Wt(e, t, -r) : ta("" + r) + "." + vr("0", i[1].length);
  if (i = t.match(/^#,#*,#0/)) return Wt(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return n = Ja(Wt(e, t.replace(/[\\-]/g, ""), r)), s = 0, Ja(Ja(t.replace(/\\/g, "")).replace(/[0#]/g, function(v) {
      return s < n.length ? n.charAt(s++) : v === "0" ? "0" : "";
    }));
  if (t.match(Mf))
    return n = Wt(e, "##########", r), "(" + n.substr(0, 3) + ") " + n.substr(3, 3) + "-" + n.substr(6);
  var o = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), f = x0(c, Math.pow(10, s) - 1, !1), n = "" + l, o = jt(
      "n",
      /*::String(*/
      i[1],
      f[1]
    ), o.charAt(o.length - 1) == " " && (o = o.substr(0, o.length - 1) + "0"), n += o + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], o = u0(f[2], s), o.length < i[4].length && (o = Qr(i[4].substr(i[4].length - o.length)) + o), n += o, n;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = x0(c, Math.pow(10, s) - 1, !0), l + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? yi(f[1], s) + i[2] + "/" + i[3] + u0(f[2], s) : vr(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return n = "" + r, t.length <= n.length ? n : Qr(t.substr(0, t.length - n.length)) + n;
  if (i = t.match(/^([#0]+)\.([#0]+)$/)) {
    n = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = n.indexOf(".");
    var u = t.indexOf(".") - s, x = t.length - n.length - u;
    return Qr(t.substr(0, u) + n + t.substr(t.length - x));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return r < 0 ? "-" + Wt(e, t, -r) : ta("" + r).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(v) {
      return "00," + (v.length < 3 ? Rt(0, 3 - v.length) : "") + v;
    }) + "." + Rt(0, i[1].length);
  switch (t) {
    case "###,###":
    case "##,###":
    case "#,###":
      var d = ta("" + c);
      return d !== "0" ? l + d : "";
    default:
      if (t.match(/\.[0#?]*$/)) return Wt(e, t.slice(0, t.lastIndexOf(".")), r) + Qr(t.slice(t.lastIndexOf(".")));
  }
  throw new Error("unsupported format |" + t + "|");
}
function jt(e, t, r) {
  return (r | 0) === r ? Wt(e, t, r) : wt(e, t, r);
}
function mo(e) {
  for (var t = [], r = !1, a = 0, n = 0; a < e.length; ++a) switch (
    /*cc=*/
    e.charCodeAt(a)
  ) {
    case 34:
      r = !r;
      break;
    case 95:
    case 42:
    case 92:
      ++a;
      break;
    case 59:
      t[t.length] = e.substr(n, a - n), n = a + 1;
  }
  if (t[t.length] = e.substr(n), r === !0) throw new Error("Format |" + e + "| unterminated string ");
  return t;
}
var Wf = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
function an(e) {
  for (var t = 0, r = "", a = ""; t < e.length; )
    switch (r = e.charAt(t)) {
      case "G":
        h0(e, t) && (t += 6), t++;
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
        for (a = r; e.charAt(t++) !== "]" && t < e.length; ) a += e.charAt(t);
        if (a.match(Wf)) return !0;
        break;
      case ".":
      case "0":
      case "#":
        for (; t < e.length && ("0#?.,E+-%".indexOf(r = e.charAt(++t)) > -1 || r == "\\" && e.charAt(t + 1) == "-" && "0#".indexOf(e.charAt(t + 2)) > -1); )
          ;
        break;
      case "?":
        for (; e.charAt(++t) === r; )
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
function go(e, t, r, a) {
  for (var n = [], i = "", s = 0, f = "", c = "t", l, o, u, x = "H"; s < e.length; )
    switch (f = e.charAt(s)) {
      case "G":
        if (!h0(e, s)) throw new Error("unrecognized character " + f + " in " + e);
        n[n.length] = { t: "G", v: "General" }, s += 7;
        break;
      case '"':
        for (i = ""; (u = e.charCodeAt(++s)) !== 34 && s < e.length; ) i += String.fromCharCode(u);
        n[n.length] = { t: "t", v: i }, ++s;
        break;
      case "\\":
        var d = e.charAt(++s), v = d === "(" || d === ")" ? d : "t";
        n[n.length] = { t: v, v: d }, ++s;
        break;
      case "_":
        n[n.length] = { t: "t", v: " " }, s += 2;
        break;
      case "@":
        n[n.length] = { t: "T", v: t }, ++s;
        break;
      case "B":
      case "b":
        if (e.charAt(s + 1) === "1" || e.charAt(s + 1) === "2") {
          if (l == null && (l = ga(t, r, e.charAt(s + 1) === "2"), l == null))
            return "";
          n[n.length] = { t: "X", v: e.substr(s, 2) }, c = f, s += 2;
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
        if (t < 0 || l == null && (l = ga(t, r), l == null))
          return "";
        for (i = f; ++s < e.length && e.charAt(s).toLowerCase() === f; ) i += f;
        f === "m" && c.toLowerCase() === "h" && (f = "M"), f === "h" && (f = x), n[n.length] = { t: f, v: i }, c = f;
        break;
      case "A":
      case "a":
      case "上":
        var h = { t: f, v: f };
        if (l == null && (l = ga(t, r)), e.substr(s, 3).toUpperCase() === "A/P" ? (l != null && (h.v = l.H >= 12 ? "P" : "A"), h.t = "T", x = "h", s += 3) : e.substr(s, 5).toUpperCase() === "AM/PM" ? (l != null && (h.v = l.H >= 12 ? "PM" : "AM"), h.t = "T", s += 5, x = "h") : e.substr(s, 5).toUpperCase() === "上午/下午" ? (l != null && (h.v = l.H >= 12 ? "下午" : "上午"), h.t = "T", s += 5, x = "h") : (h.t = "t", ++s), l == null && h.t === "T") return "";
        n[n.length] = h, c = f;
        break;
      case "[":
        for (i = f; e.charAt(s++) !== "]" && s < e.length; ) i += e.charAt(s);
        if (i.slice(-1) !== "]") throw 'unterminated "[" block: |' + i + "|";
        if (i.match(Wf)) {
          if (l == null && (l = ga(t, r), l == null))
            return "";
          n[n.length] = { t: "Z", v: i.toLowerCase() }, c = i.charAt(1);
        } else i.indexOf("$") > -1 && (i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$", an(e) || (n[n.length] = { t: "t", v: i }));
        break;
      case ".":
        if (l != null) {
          for (i = f; ++s < e.length && (f = e.charAt(s)) === "0"; ) i += f;
          n[n.length] = { t: "s", v: i };
          break;
        }
      case "0":
      case "#":
        for (i = f; ++s < e.length && "0#?.,E+-%".indexOf(f = e.charAt(s)) > -1; ) i += f;
        n[n.length] = { t: "n", v: i };
        break;
      case "?":
        for (i = f; e.charAt(++s) === f; ) i += f;
        n[n.length] = { t: f, v: i }, c = f;
        break;
      case "*":
        ++s, (e.charAt(s) == " " || e.charAt(s) == "*") && ++s;
        break;
      case "(":
      case ")":
        n[n.length] = { t: a === 1 ? "t" : f, v: f }, ++s;
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
        n[n.length] = { t: "D", v: i };
        break;
      case " ":
        n[n.length] = { t: f, v: f }, ++s;
        break;
      case "$":
        n[n.length] = { t: "t", v: "$" }, ++s;
        break;
      default:
        if (",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(f) === -1) throw new Error("unrecognized character " + f + " in " + e);
        n[n.length] = { t: "t", v: f }, ++s;
        break;
    }
  var g = 0, T = 0, A;
  for (s = n.length - 1, c = "t"; s >= 0; --s)
    switch (n[s].t) {
      case "h":
      case "H":
        n[s].t = x, c = "h", g < 1 && (g = 1);
        break;
      case "s":
        (A = n[s].v.match(/\.0+$/)) && (T = Math.max(T, A[0].length - 1)), g < 3 && (g = 3);
      case "d":
      case "y":
      case "M":
      case "e":
        c = n[s].t;
        break;
      case "m":
        c === "s" && (n[s].t = "M", g < 2 && (g = 2));
        break;
      case "X":
        break;
      case "Z":
        g < 1 && n[s].v.match(/[Hh]/) && (g = 1), g < 2 && n[s].v.match(/[Mm]/) && (g = 2), g < 3 && n[s].v.match(/[Ss]/) && (g = 3);
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
  var k = "", R;
  for (s = 0; s < n.length; ++s)
    switch (n[s].t) {
      case "t":
      case "T":
      case " ":
      case "D":
        break;
      case "X":
        n[s].v = "", n[s].t = ";";
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
        n[s].v = fo(n[s].t.charCodeAt(0), n[s].v, l, T), n[s].t = "t";
        break;
      case "n":
      case "?":
        for (R = s + 1; n[R] != null && ((f = n[R].t) === "?" || f === "D" || (f === " " || f === "t") && n[R + 1] != null && (n[R + 1].t === "?" || n[R + 1].t === "t" && n[R + 1].v === "/") || n[s].t === "(" && (f === " " || f === "n" || f === ")") || f === "t" && (n[R].v === "/" || n[R].v === " " && n[R + 1] != null && n[R + 1].t == "?")); )
          n[s].v += n[R].v, n[R] = { v: "", t: ";" }, ++R;
        k += n[s].v, s = R - 1;
        break;
      case "G":
        n[s].t = "t", n[s].v = Ta(t, r);
        break;
    }
  var V = "", N, S;
  if (k.length > 0) {
    k.charCodeAt(0) == 40 ? (N = t < 0 && k.charCodeAt(0) === 45 ? -t : t, S = jt("n", k, N)) : (N = t < 0 && a > 1 ? -t : t, S = jt("n", k, N), N < 0 && n[0] && n[0].t == "t" && (S = S.substr(1), n[0].v = "-" + n[0].v)), R = S.length - 1;
    var z = n.length;
    for (s = 0; s < n.length; ++s) if (n[s] != null && n[s].t != "t" && n[s].v.indexOf(".") > -1) {
      z = s;
      break;
    }
    var L = n.length;
    if (z === n.length && S.indexOf("E") === -1) {
      for (s = n.length - 1; s >= 0; --s)
        n[s] == null || "n?".indexOf(n[s].t) === -1 || (R >= n[s].v.length - 1 ? (R -= n[s].v.length, n[s].v = S.substr(R + 1, n[s].v.length)) : R < 0 ? n[s].v = "" : (n[s].v = S.substr(0, R + 1), R = -1), n[s].t = "t", L = s);
      R >= 0 && L < n.length && (n[L].v = S.substr(0, R + 1) + n[L].v);
    } else if (z !== n.length && S.indexOf("E") === -1) {
      for (R = S.indexOf(".") - 1, s = z; s >= 0; --s)
        if (!(n[s] == null || "n?".indexOf(n[s].t) === -1)) {
          for (o = n[s].v.indexOf(".") > -1 && s === z ? n[s].v.indexOf(".") - 1 : n[s].v.length - 1, V = n[s].v.substr(o + 1); o >= 0; --o)
            R >= 0 && (n[s].v.charAt(o) === "0" || n[s].v.charAt(o) === "#") && (V = S.charAt(R--) + V);
          n[s].v = V, n[s].t = "t", L = s;
        }
      for (R >= 0 && L < n.length && (n[L].v = S.substr(0, R + 1) + n[L].v), R = S.indexOf(".") + 1, s = z; s < n.length; ++s)
        if (!(n[s] == null || "n?(".indexOf(n[s].t) === -1 && s !== z)) {
          for (o = n[s].v.indexOf(".") > -1 && s === z ? n[s].v.indexOf(".") + 1 : 0, V = n[s].v.substr(0, o); o < n[s].v.length; ++o)
            R < S.length && (V += S.charAt(R++));
          n[s].v = V, n[s].t = "t", L = s;
        }
    }
  }
  for (s = 0; s < n.length; ++s) n[s] != null && "n?".indexOf(n[s].t) > -1 && (N = a > 1 && t < 0 && s > 0 && n[s - 1].v === "-" ? -t : t, n[s].v = jt(n[s].t, n[s].v, N), n[s].t = "t");
  var J = "";
  for (s = 0; s !== n.length; ++s) n[s] != null && (J += n[s].v);
  return J;
}
var Fs = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
function As(e, t) {
  if (t == null) return !1;
  var r = parseFloat(t[2]);
  switch (t[1]) {
    case "=":
      if (e == r) return !0;
      break;
    case ">":
      if (e > r) return !0;
      break;
    case "<":
      if (e < r) return !0;
      break;
    case "<>":
      if (e != r) return !0;
      break;
    case ">=":
      if (e >= r) return !0;
      break;
    case "<=":
      if (e <= r) return !0;
      break;
  }
  return !1;
}
function _o(e, t) {
  var r = mo(e), a = r.length, n = r[a - 1].indexOf("@");
  if (a < 4 && n > -1 && --a, r.length > 4) throw new Error("cannot find right format for |" + r.join("|") + "|");
  if (typeof t != "number") return [4, r.length === 4 || n > -1 ? r[r.length - 1] : "@"];
  switch (r.length) {
    case 1:
      r = n > -1 ? ["General", "General", "General", r[0]] : [r[0], r[0], r[0], "@"];
      break;
    case 2:
      r = n > -1 ? [r[0], r[0], r[0], r[1]] : [r[0], r[1], r[0], "@"];
      break;
    case 3:
      r = n > -1 ? [r[0], r[1], r[0], r[2]] : [r[0], r[1], r[2], "@"];
      break;
  }
  var i = t > 0 ? r[0] : t < 0 ? r[1] : r[2];
  if (r[0].indexOf("[") === -1 && r[1].indexOf("[") === -1) return [a, i];
  if (r[0].match(/\[[=<>]/) != null || r[1].match(/\[[=<>]/) != null) {
    var s = r[0].match(Fs), f = r[1].match(Fs);
    return As(t, s) ? [a, r[0]] : As(t, f) ? [a, r[1]] : [a, r[s != null && f != null ? 2 : 1]];
  }
  return [a, i];
}
function Ft(e, t, r) {
  r == null && (r = {});
  var a = "";
  switch (typeof e) {
    case "string":
      e == "m/d/yy" && r.dateNF ? a = r.dateNF : a = e;
      break;
    case "number":
      e == 14 && r.dateNF ? a = r.dateNF : a = (r.table != null ? r.table : Fe)[e], a == null && (a = r.table && r.table[Ts[e]] || Fe[Ts[e]]), a == null && (a = eo[e] || "General");
      break;
  }
  if (h0(a, 0)) return Ta(t, r);
  t instanceof Date && (t = Of(t, r.date1904));
  var n = _o(a, t);
  if (h0(n[1])) return Ta(t, r);
  if (t === !0) t = "TRUE";
  else if (t === !1) t = "FALSE";
  else if (t === "" || t == null) return "";
  return go(n[1], t, r, n[0]);
}
function Kt(e, t) {
  if (typeof t != "number") {
    t = +t || -1;
    for (var r = 0; r < 392; ++r) {
      if (Fe[r] == null) {
        t < 0 && (t = r);
        continue;
      }
      if (Fe[r] == e) {
        t = r;
        break;
      }
    }
    t < 0 && (t = 391);
  }
  return Fe[t] = e, t;
}
function y0(e) {
  for (var t = 0; t != 392; ++t)
    e[t] !== void 0 && Kt(e[t], t);
}
function nn() {
  Fe = Ql();
}
var wo = {
  5: '"$"#,##0_);\\("$"#,##0\\)',
  6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  23: "General",
  24: "General",
  25: "General",
  26: "General",
  27: "m/d/yy",
  28: "m/d/yy",
  29: "m/d/yy",
  30: "m/d/yy",
  31: "m/d/yy",
  32: "h:mm:ss",
  33: "h:mm:ss",
  34: "h:mm:ss",
  35: "h:mm:ss",
  36: "m/d/yy",
  41: '_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)',
  42: '_("$"* #,##0_);_("$"* (#,##0);_("$"* "-"_);_(@_)',
  43: '_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)',
  44: '_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)',
  50: "m/d/yy",
  51: "m/d/yy",
  52: "m/d/yy",
  53: "m/d/yy",
  54: "m/d/yy",
  55: "m/d/yy",
  56: "m/d/yy",
  57: "m/d/yy",
  58: "m/d/yy",
  59: "0",
  60: "0.00",
  61: "#,##0",
  62: "#,##0.00",
  63: '"$"#,##0_);\\("$"#,##0\\)',
  64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  67: "0%",
  68: "0.00%",
  69: "# ?/?",
  70: "# ??/??",
  71: "m/d/yy",
  72: "m/d/yy",
  73: "d-mmm-yy",
  74: "d-mmm",
  75: "mmm-yy",
  76: "h:mm",
  77: "h:mm:ss",
  78: "m/d/yy h:mm",
  79: "mm:ss",
  80: "[h]:mm:ss",
  81: "mmss.0"
}, Vf = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
function ko(e) {
  var t = typeof e == "number" ? Fe[e] : e;
  return t = t.replace(Vf, "(\\d+)"), new RegExp("^" + t + "$");
}
function Eo(e, t, r) {
  var a = -1, n = -1, i = -1, s = -1, f = -1, c = -1;
  (t.match(Vf) || []).forEach(function(u, x) {
    var d = parseInt(r[x + 1], 10);
    switch (u.toLowerCase().charAt(0)) {
      case "y":
        a = d;
        break;
      case "d":
        i = d;
        break;
      case "h":
        s = d;
        break;
      case "s":
        c = d;
        break;
      case "m":
        s >= 0 ? f = d : n = d;
        break;
    }
  }), c >= 0 && f == -1 && n >= 0 && (f = n, n = -1);
  var l = ("" + (a >= 0 ? a : (/* @__PURE__ */ new Date()).getFullYear())).slice(-4) + "-" + ("00" + (n >= 1 ? n : 1)).slice(-2) + "-" + ("00" + (i >= 1 ? i : 1)).slice(-2);
  l.length == 7 && (l = "0" + l), l.length == 8 && (l = "20" + l);
  var o = ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + ("00" + (f >= 0 ? f : 0)).slice(-2) + ":" + ("00" + (c >= 0 ? c : 0)).slice(-2);
  return s == -1 && f == -1 && c == -1 ? l : a == -1 && n == -1 && i == -1 ? o : l + "T" + o;
}
var To = /* @__PURE__ */ function() {
  var e = {};
  e.version = "1.2.0";
  function t() {
    for (var S = 0, z = new Array(256), L = 0; L != 256; ++L)
      S = L, S = S & 1 ? -306674912 ^ S >>> 1 : S >>> 1, S = S & 1 ? -306674912 ^ S >>> 1 : S >>> 1, S = S & 1 ? -306674912 ^ S >>> 1 : S >>> 1, S = S & 1 ? -306674912 ^ S >>> 1 : S >>> 1, S = S & 1 ? -306674912 ^ S >>> 1 : S >>> 1, S = S & 1 ? -306674912 ^ S >>> 1 : S >>> 1, S = S & 1 ? -306674912 ^ S >>> 1 : S >>> 1, S = S & 1 ? -306674912 ^ S >>> 1 : S >>> 1, z[L] = S;
    return typeof Int32Array < "u" ? new Int32Array(z) : z;
  }
  var r = t();
  function a(S) {
    var z = 0, L = 0, J = 0, j = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
    for (J = 0; J != 256; ++J) j[J] = S[J];
    for (J = 0; J != 256; ++J)
      for (L = S[J], z = 256 + J; z < 4096; z += 256) L = j[z] = L >>> 8 ^ S[L & 255];
    var H = [];
    for (J = 1; J != 16; ++J) H[J - 1] = typeof Int32Array < "u" ? j.subarray(J * 256, J * 256 + 256) : j.slice(J * 256, J * 256 + 256);
    return H;
  }
  var n = a(r), i = n[0], s = n[1], f = n[2], c = n[3], l = n[4], o = n[5], u = n[6], x = n[7], d = n[8], v = n[9], h = n[10], g = n[11], T = n[12], A = n[13], k = n[14];
  function R(S, z) {
    for (var L = z ^ -1, J = 0, j = S.length; J < j; ) L = L >>> 8 ^ r[(L ^ S.charCodeAt(J++)) & 255];
    return ~L;
  }
  function V(S, z) {
    for (var L = z ^ -1, J = S.length - 15, j = 0; j < J; ) L = k[S[j++] ^ L & 255] ^ A[S[j++] ^ L >> 8 & 255] ^ T[S[j++] ^ L >> 16 & 255] ^ g[S[j++] ^ L >>> 24] ^ h[S[j++]] ^ v[S[j++]] ^ d[S[j++]] ^ x[S[j++]] ^ u[S[j++]] ^ o[S[j++]] ^ l[S[j++]] ^ c[S[j++]] ^ f[S[j++]] ^ s[S[j++]] ^ i[S[j++]] ^ r[S[j++]];
    for (J += 15; j < J; ) L = L >>> 8 ^ r[(L ^ S[j++]) & 255];
    return ~L;
  }
  function N(S, z) {
    for (var L = z ^ -1, J = 0, j = S.length, H = 0, re = 0; J < j; )
      H = S.charCodeAt(J++), H < 128 ? L = L >>> 8 ^ r[(L ^ H) & 255] : H < 2048 ? (L = L >>> 8 ^ r[(L ^ (192 | H >> 6 & 31)) & 255], L = L >>> 8 ^ r[(L ^ (128 | H & 63)) & 255]) : H >= 55296 && H < 57344 ? (H = (H & 1023) + 64, re = S.charCodeAt(J++) & 1023, L = L >>> 8 ^ r[(L ^ (240 | H >> 8 & 7)) & 255], L = L >>> 8 ^ r[(L ^ (128 | H >> 2 & 63)) & 255], L = L >>> 8 ^ r[(L ^ (128 | re >> 6 & 15 | (H & 3) << 4)) & 255], L = L >>> 8 ^ r[(L ^ (128 | re & 63)) & 255]) : (L = L >>> 8 ^ r[(L ^ (224 | H >> 12 & 15)) & 255], L = L >>> 8 ^ r[(L ^ (128 | H >> 6 & 63)) & 255], L = L >>> 8 ^ r[(L ^ (128 | H & 63)) & 255]);
    return ~L;
  }
  return e.table = r, e.bstr = R, e.buf = V, e.str = N, e;
}(), ye = /* @__PURE__ */ function() {
  var t = {};
  t.version = "1.2.1";
  function r(_, y) {
    for (var m = _.split("/"), p = y.split("/"), w = 0, E = 0, b = Math.min(m.length, p.length); w < b; ++w) {
      if (E = m[w].length - p[w].length) return E;
      if (m[w] != p[w]) return m[w] < p[w] ? -1 : 1;
    }
    return m.length - p.length;
  }
  function a(_) {
    if (_.charAt(_.length - 1) == "/") return _.slice(0, -1).indexOf("/") === -1 ? _ : a(_.slice(0, -1));
    var y = _.lastIndexOf("/");
    return y === -1 ? _ : _.slice(0, y + 1);
  }
  function n(_) {
    if (_.charAt(_.length - 1) == "/") return n(_.slice(0, -1));
    var y = _.lastIndexOf("/");
    return y === -1 ? _ : _.slice(y + 1);
  }
  function i(_, y) {
    typeof y == "string" && (y = new Date(y));
    var m = y.getHours();
    m = m << 6 | y.getMinutes(), m = m << 5 | y.getSeconds() >>> 1, _.write_shift(2, m);
    var p = y.getFullYear() - 1980;
    p = p << 4 | y.getMonth() + 1, p = p << 5 | y.getDate(), _.write_shift(2, p);
  }
  function s(_) {
    var y = _.read_shift(2) & 65535, m = _.read_shift(2) & 65535, p = /* @__PURE__ */ new Date(), w = m & 31;
    m >>>= 5;
    var E = m & 15;
    m >>>= 4, p.setMilliseconds(0), p.setFullYear(m + 1980), p.setMonth(E - 1), p.setDate(w);
    var b = y & 31;
    y >>>= 5;
    var G = y & 63;
    return y >>>= 6, p.setHours(y), p.setMinutes(G), p.setSeconds(b << 1), p;
  }
  function f(_) {
    Mr(_, 0);
    for (var y = (
      /*::(*/
      {}
    ), m = 0; _.l <= _.length - 4; ) {
      var p = _.read_shift(2), w = _.read_shift(2), E = _.l + w, b = {};
      switch (p) {
        case 21589:
          m = _.read_shift(1), m & 1 && (b.mtime = _.read_shift(4)), w > 5 && (m & 2 && (b.atime = _.read_shift(4)), m & 4 && (b.ctime = _.read_shift(4))), b.mtime && (b.mt = new Date(b.mtime * 1e3));
          break;
      }
      _.l = E, y[p] = b;
    }
    return y;
  }
  var c;
  function l() {
    return c || (c = {});
  }
  function o(_, y) {
    if (_[0] == 80 && _[1] == 75) return bt(_, y);
    if ((_[0] | 32) == 109 && (_[1] | 32) == 105) return Ma(_, y);
    if (_.length < 512) throw new Error("CFB file size " + _.length + " < 512");
    var m = 3, p = 512, w = 0, E = 0, b = 0, G = 0, U = 0, B = [], D = (
      /*::(*/
      _.slice(0, 512)
    );
    Mr(D, 0);
    var q = u(D);
    switch (m = q[0], m) {
      case 3:
        p = 512;
        break;
      case 4:
        p = 4096;
        break;
      case 0:
        if (q[1] == 0) return bt(_, y);
      default:
        throw new Error("Major Version: Expected 3 or 4 saw " + m);
    }
    p !== 512 && (D = /*::(*/
    _.slice(0, p), Mr(
      D,
      28
      /* blob.l */
    ));
    var te = _.slice(0, p);
    x(D, m);
    var se = D.read_shift(4, "i");
    if (m === 3 && se !== 0) throw new Error("# Directory Sectors: Expected 0 saw " + se);
    D.l += 4, b = D.read_shift(4, "i"), D.l += 4, D.chk("00100000", "Mini Stream Cutoff Size: "), G = D.read_shift(4, "i"), w = D.read_shift(4, "i"), U = D.read_shift(4, "i"), E = D.read_shift(4, "i");
    for (var ae = -1, he = 0; he < 109 && (ae = D.read_shift(4, "i"), !(ae < 0)); ++he)
      B[he] = ae;
    var Ee = d(_, p);
    g(U, E, Ee, p, B);
    var I = A(Ee, b, B, p);
    I[b].name = "!Directory", w > 0 && G !== re && (I[G].name = "!MiniFAT"), I[B[0]].name = "!FAT", I.fat_addrs = B, I.ssz = p;
    var Te = {}, Ue = [], dr = [], Dt = [];
    k(b, I, Ee, Ue, w, Te, dr, G), v(dr, Dt, Ue), Ue.shift();
    var Mt = {
      FileIndex: dr,
      FullPaths: Dt
    };
    return y && y.raw && (Mt.raw = { header: te, sectors: Ee }), Mt;
  }
  function u(_) {
    if (_[_.l] == 80 && _[_.l + 1] == 75) return [0, 0];
    _.chk(me, "Header Signature: "), _.l += 16;
    var y = _.read_shift(2, "u");
    return [_.read_shift(2, "u"), y];
  }
  function x(_, y) {
    var m = 9;
    switch (_.l += 2, m = _.read_shift(2)) {
      case 9:
        if (y != 3) throw new Error("Sector Shift: Expected 9 saw " + m);
        break;
      case 12:
        if (y != 4) throw new Error("Sector Shift: Expected 12 saw " + m);
        break;
      default:
        throw new Error("Sector Shift: Expected 9 or 12 saw " + m);
    }
    _.chk("0600", "Mini Sector Shift: "), _.chk("000000000000", "Reserved: ");
  }
  function d(_, y) {
    for (var m = Math.ceil(_.length / y) - 1, p = [], w = 1; w < m; ++w) p[w - 1] = _.slice(w * y, (w + 1) * y);
    return p[m - 1] = _.slice(m * y), p;
  }
  function v(_, y, m) {
    for (var p = 0, w = 0, E = 0, b = 0, G = 0, U = m.length, B = [], D = []; p < U; ++p)
      B[p] = D[p] = p, y[p] = m[p];
    for (; G < D.length; ++G)
      p = D[G], w = _[p].L, E = _[p].R, b = _[p].C, B[p] === p && (w !== -1 && B[w] !== w && (B[p] = B[w]), E !== -1 && B[E] !== E && (B[p] = B[E])), b !== -1 && (B[b] = p), w !== -1 && p != B[p] && (B[w] = B[p], D.lastIndexOf(w) < G && D.push(w)), E !== -1 && p != B[p] && (B[E] = B[p], D.lastIndexOf(E) < G && D.push(E));
    for (p = 1; p < U; ++p) B[p] === p && (E !== -1 && B[E] !== E ? B[p] = B[E] : w !== -1 && B[w] !== w && (B[p] = B[w]));
    for (p = 1; p < U; ++p)
      if (_[p].type !== 0) {
        if (G = p, G != B[G]) do
          G = B[G], y[p] = y[G] + "/" + y[p];
        while (G !== 0 && B[G] !== -1 && G != B[G]);
        B[p] = -1;
      }
    for (y[0] += "/", p = 1; p < U; ++p)
      _[p].type !== 2 && (y[p] += "/");
  }
  function h(_, y, m) {
    for (var p = _.start, w = _.size, E = [], b = p; m && w > 0 && b >= 0; )
      E.push(y.slice(b * H, b * H + H)), w -= H, b = ma(m, b * 4);
    return E.length === 0 ? Z(0) : Dr(E).slice(0, _.size);
  }
  function g(_, y, m, p, w) {
    var E = re;
    if (_ === re) {
      if (y !== 0) throw new Error("DIFAT chain shorter than expected");
    } else if (_ !== -1) {
      var b = m[_], G = (p >>> 2) - 1;
      if (!b) return;
      for (var U = 0; U < G && (E = ma(b, U * 4)) !== re; ++U)
        w.push(E);
      g(ma(b, p - 4), y - 1, m, p, w);
    }
  }
  function T(_, y, m, p, w) {
    var E = [], b = [];
    w || (w = []);
    var G = p - 1, U = 0, B = 0;
    for (U = y; U >= 0; ) {
      w[U] = !0, E[E.length] = U, b.push(_[U]);
      var D = m[Math.floor(U * 4 / p)];
      if (B = U * 4 & G, p < 4 + B) throw new Error("FAT boundary crossed: " + U + " 4 " + p);
      if (!_[D]) break;
      U = ma(_[D], B);
    }
    return { nodes: E, data: Us([b]) };
  }
  function A(_, y, m, p) {
    var w = _.length, E = [], b = [], G = [], U = [], B = p - 1, D = 0, q = 0, te = 0, se = 0;
    for (D = 0; D < w; ++D)
      if (G = [], te = D + y, te >= w && (te -= w), !b[te]) {
        U = [];
        var ae = [];
        for (q = te; q >= 0; ) {
          ae[q] = !0, b[q] = !0, G[G.length] = q, U.push(_[q]);
          var he = m[Math.floor(q * 4 / p)];
          if (se = q * 4 & B, p < 4 + se) throw new Error("FAT boundary crossed: " + q + " 4 " + p);
          if (!_[he] || (q = ma(_[he], se), ae[q])) break;
        }
        E[te] = { nodes: G, data: Us([U]) };
      }
    return E;
  }
  function k(_, y, m, p, w, E, b, G) {
    for (var U = 0, B = p.length ? 2 : 0, D = y[_].data, q = 0, te = 0, se; q < D.length; q += 128) {
      var ae = (
        /*::(*/
        D.slice(q, q + 128)
      );
      Mr(ae, 64), te = ae.read_shift(2), se = Oi(ae, 0, te - B), p.push(se);
      var he = {
        name: se,
        type: ae.read_shift(1),
        color: ae.read_shift(1),
        L: ae.read_shift(4, "i"),
        R: ae.read_shift(4, "i"),
        C: ae.read_shift(4, "i"),
        clsid: ae.read_shift(16),
        state: ae.read_shift(4, "i"),
        start: 0,
        size: 0
      }, Ee = ae.read_shift(2) + ae.read_shift(2) + ae.read_shift(2) + ae.read_shift(2);
      Ee !== 0 && (he.ct = R(ae, ae.l - 8));
      var I = ae.read_shift(2) + ae.read_shift(2) + ae.read_shift(2) + ae.read_shift(2);
      I !== 0 && (he.mt = R(ae, ae.l - 8)), he.start = ae.read_shift(4, "i"), he.size = ae.read_shift(4, "i"), he.size < 0 && he.start < 0 && (he.size = he.type = 0, he.start = re, he.name = ""), he.type === 5 ? (U = he.start, w > 0 && U !== re && (y[U].name = "!StreamData")) : he.size >= 4096 ? (he.storage = "fat", y[he.start] === void 0 && (y[he.start] = T(m, he.start, y.fat_addrs, y.ssz)), y[he.start].name = he.name, he.content = y[he.start].data.slice(0, he.size)) : (he.storage = "minifat", he.size < 0 ? he.size = 0 : U !== re && he.start !== re && y[U] && (he.content = h(he, y[U].data, (y[G] || {}).data))), he.content && Mr(he.content, 0), E[se] = he, b.push(he);
    }
  }
  function R(_, y) {
    return new Date((ot(_, y + 4) / 1e7 * Math.pow(2, 32) + ot(_, y) / 1e7 - 11644473600) * 1e3);
  }
  function V(_, y) {
    return l(), o(c.readFileSync(_), y);
  }
  function N(_, y) {
    var m = y && y.type;
    switch (m || We && Buffer.isBuffer(_) && (m = "buffer"), m || "base64") {
      case "file":
        return V(_, y);
      case "base64":
        return o(ut(xt(_)), y);
      case "binary":
        return o(ut(_), y);
    }
    return o(
      /*::typeof blob == 'string' ? new Buffer(blob, 'utf-8') : */
      _,
      y
    );
  }
  function S(_, y) {
    var m = y || {}, p = m.root || "Root Entry";
    if (_.FullPaths || (_.FullPaths = []), _.FileIndex || (_.FileIndex = []), _.FullPaths.length !== _.FileIndex.length) throw new Error("inconsistent CFB structure");
    _.FullPaths.length === 0 && (_.FullPaths[0] = p + "/", _.FileIndex[0] = { name: p, type: 5 }), m.CLSID && (_.FileIndex[0].clsid = m.CLSID), z(_);
  }
  function z(_) {
    var y = "Sh33tJ5";
    if (!ye.find(_, "/" + y)) {
      var m = Z(4);
      m[0] = 55, m[1] = m[3] = 50, m[2] = 54, _.FileIndex.push({ name: y, type: 2, content: m, size: 4, L: 69, R: 69, C: 69 }), _.FullPaths.push(_.FullPaths[0] + y), L(_);
    }
  }
  function L(_, y) {
    S(_);
    for (var m = !1, p = !1, w = _.FullPaths.length - 1; w >= 0; --w) {
      var E = _.FileIndex[w];
      switch (E.type) {
        case 0:
          p ? m = !0 : (_.FileIndex.pop(), _.FullPaths.pop());
          break;
        case 1:
        case 2:
        case 5:
          p = !0, isNaN(E.R * E.L * E.C) && (m = !0), E.R > -1 && E.L > -1 && E.R == E.L && (m = !0);
          break;
        default:
          m = !0;
          break;
      }
    }
    if (!(!m && !y)) {
      var b = new Date(1987, 1, 19), G = 0, U = Object.create ? /* @__PURE__ */ Object.create(null) : {}, B = [];
      for (w = 0; w < _.FullPaths.length; ++w)
        U[_.FullPaths[w]] = !0, _.FileIndex[w].type !== 0 && B.push([_.FullPaths[w], _.FileIndex[w]]);
      for (w = 0; w < B.length; ++w) {
        var D = a(B[w][0]);
        p = U[D], p || (B.push([D, {
          name: n(D).replace("/", ""),
          type: 1,
          clsid: ve,
          ct: b,
          mt: b,
          content: null
        }]), U[D] = !0);
      }
      for (B.sort(function(se, ae) {
        return r(se[0], ae[0]);
      }), _.FullPaths = [], _.FileIndex = [], w = 0; w < B.length; ++w)
        _.FullPaths[w] = B[w][0], _.FileIndex[w] = B[w][1];
      for (w = 0; w < B.length; ++w) {
        var q = _.FileIndex[w], te = _.FullPaths[w];
        if (q.name = n(te).replace("/", ""), q.L = q.R = q.C = -(q.color = 1), q.size = q.content ? q.content.length : 0, q.start = 0, q.clsid = q.clsid || ve, w === 0)
          q.C = B.length > 1 ? 1 : -1, q.size = 0, q.type = 5;
        else if (te.slice(-1) == "/") {
          for (G = w + 1; G < B.length && a(_.FullPaths[G]) != te; ++G) ;
          for (q.C = G >= B.length ? -1 : G, G = w + 1; G < B.length && a(_.FullPaths[G]) != a(te); ++G) ;
          q.R = G >= B.length ? -1 : G, q.type = 1;
        } else
          a(_.FullPaths[w + 1] || "") == a(te) && (q.R = w + 1), q.type = 2;
      }
    }
  }
  function J(_, y) {
    var m = y || {};
    if (m.fileType == "mad") return Yn(_, m);
    switch (L(_), m.fileType) {
      case "zip":
        return N0(_, m);
    }
    var p = function(se) {
      for (var ae = 0, he = 0, Ee = 0; Ee < se.FileIndex.length; ++Ee) {
        var I = se.FileIndex[Ee];
        if (I.content) {
          var Te = I.content.length;
          Te > 0 && (Te < 4096 ? ae += Te + 63 >> 6 : he += Te + 511 >> 9);
        }
      }
      for (var Ue = se.FullPaths.length + 3 >> 2, dr = ae + 7 >> 3, Dt = ae + 127 >> 7, Mt = dr + he + Ue + Dt, Lr = Mt + 127 >> 7, Wa = Lr <= 109 ? 0 : Math.ceil((Lr - 109) / 127); Mt + Lr + Wa + 127 >> 7 > Lr; ) Wa = ++Lr <= 109 ? 0 : Math.ceil((Lr - 109) / 127);
      var It = [1, Wa, Lr, Dt, Ue, he, ae, 0];
      return se.FileIndex[0].size = ae << 6, It[7] = (se.FileIndex[0].start = It[0] + It[1] + It[2] + It[3] + It[4] + It[5]) + (It[6] + 7 >> 3), It;
    }(_), w = Z(p[7] << 9), E = 0, b = 0;
    {
      for (E = 0; E < 8; ++E) w.write_shift(1, xe[E]);
      for (E = 0; E < 8; ++E) w.write_shift(2, 0);
      for (w.write_shift(2, 62), w.write_shift(2, 3), w.write_shift(2, 65534), w.write_shift(2, 9), w.write_shift(2, 6), E = 0; E < 3; ++E) w.write_shift(2, 0);
      for (w.write_shift(4, 0), w.write_shift(4, p[2]), w.write_shift(4, p[0] + p[1] + p[2] + p[3] - 1), w.write_shift(4, 0), w.write_shift(4, 4096), w.write_shift(4, p[3] ? p[0] + p[1] + p[2] - 1 : re), w.write_shift(4, p[3]), w.write_shift(-4, p[1] ? p[0] - 1 : re), w.write_shift(4, p[1]), E = 0; E < 109; ++E) w.write_shift(-4, E < p[2] ? p[1] + E : -1);
    }
    if (p[1])
      for (b = 0; b < p[1]; ++b) {
        for (; E < 236 + b * 127; ++E) w.write_shift(-4, E < p[2] ? p[1] + E : -1);
        w.write_shift(-4, b === p[1] - 1 ? re : b + 1);
      }
    var G = function(se) {
      for (b += se; E < b - 1; ++E) w.write_shift(-4, E + 1);
      se && (++E, w.write_shift(-4, re));
    };
    for (b = E = 0, b += p[1]; E < b; ++E) w.write_shift(-4, de.DIFSECT);
    for (b += p[2]; E < b; ++E) w.write_shift(-4, de.FATSECT);
    G(p[3]), G(p[4]);
    for (var U = 0, B = 0, D = _.FileIndex[0]; U < _.FileIndex.length; ++U)
      D = _.FileIndex[U], D.content && (B = D.content.length, !(B < 4096) && (D.start = b, G(B + 511 >> 9)));
    for (G(p[6] + 7 >> 3); w.l & 511; ) w.write_shift(-4, de.ENDOFCHAIN);
    for (b = E = 0, U = 0; U < _.FileIndex.length; ++U)
      D = _.FileIndex[U], D.content && (B = D.content.length, !(!B || B >= 4096) && (D.start = b, G(B + 63 >> 6)));
    for (; w.l & 511; ) w.write_shift(-4, de.ENDOFCHAIN);
    for (E = 0; E < p[4] << 2; ++E) {
      var q = _.FullPaths[E];
      if (!q || q.length === 0) {
        for (U = 0; U < 17; ++U) w.write_shift(4, 0);
        for (U = 0; U < 3; ++U) w.write_shift(4, -1);
        for (U = 0; U < 12; ++U) w.write_shift(4, 0);
        continue;
      }
      D = _.FileIndex[E], E === 0 && (D.start = D.size ? D.start - 1 : re);
      var te = E === 0 && m.root || D.name;
      if (B = 2 * (te.length + 1), w.write_shift(64, te, "utf16le"), w.write_shift(2, B), w.write_shift(1, D.type), w.write_shift(1, D.color), w.write_shift(-4, D.L), w.write_shift(-4, D.R), w.write_shift(-4, D.C), D.clsid) w.write_shift(16, D.clsid, "hex");
      else for (U = 0; U < 4; ++U) w.write_shift(4, 0);
      w.write_shift(4, D.state || 0), w.write_shift(4, 0), w.write_shift(4, 0), w.write_shift(4, 0), w.write_shift(4, 0), w.write_shift(4, D.start), w.write_shift(4, D.size), w.write_shift(4, 0);
    }
    for (E = 1; E < _.FileIndex.length; ++E)
      if (D = _.FileIndex[E], D.size >= 4096)
        if (w.l = D.start + 1 << 9, We && Buffer.isBuffer(D.content))
          D.content.copy(w, w.l, 0, D.size), w.l += D.size + 511 & -512;
        else {
          for (U = 0; U < D.size; ++U) w.write_shift(1, D.content[U]);
          for (; U & 511; ++U) w.write_shift(1, 0);
        }
    for (E = 1; E < _.FileIndex.length; ++E)
      if (D = _.FileIndex[E], D.size > 0 && D.size < 4096)
        if (We && Buffer.isBuffer(D.content))
          D.content.copy(w, w.l, 0, D.size), w.l += D.size + 63 & -64;
        else {
          for (U = 0; U < D.size; ++U) w.write_shift(1, D.content[U]);
          for (; U & 63; ++U) w.write_shift(1, 0);
        }
    if (We)
      w.l = w.length;
    else
      for (; w.l < w.length; ) w.write_shift(1, 0);
    return w;
  }
  function j(_, y) {
    var m = _.FullPaths.map(function(U) {
      return U.toUpperCase();
    }), p = m.map(function(U) {
      var B = U.split("/");
      return B[B.length - (U.slice(-1) == "/" ? 2 : 1)];
    }), w = !1;
    y.charCodeAt(0) === 47 ? (w = !0, y = m[0].slice(0, -1) + y) : w = y.indexOf("/") !== -1;
    var E = y.toUpperCase(), b = w === !0 ? m.indexOf(E) : p.indexOf(E);
    if (b !== -1) return _.FileIndex[b];
    var G = !E.match(mn);
    for (E = E.replace(rt, ""), G && (E = E.replace(mn, "!")), b = 0; b < m.length; ++b)
      if ((G ? m[b].replace(mn, "!") : m[b]).replace(rt, "") == E || (G ? p[b].replace(mn, "!") : p[b]).replace(rt, "") == E) return _.FileIndex[b];
    return null;
  }
  var H = 64, re = -2, me = "d0cf11e0a1b11ae1", xe = [208, 207, 17, 224, 161, 177, 26, 225], ve = "00000000000000000000000000000000", de = {
    /* 2.1 Compund File Sector Numbers and Types */
    MAXREGSECT: -6,
    DIFSECT: -4,
    FATSECT: -3,
    ENDOFCHAIN: re,
    FREESECT: -1,
    /* 2.2 Compound File Header */
    HEADER_SIGNATURE: me,
    HEADER_MINOR_VERSION: "3e00",
    MAXREGSID: -6,
    NOSTREAM: -1,
    HEADER_CLSID: ve,
    /* 2.6.1 Compound File Directory Entry */
    EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
  };
  function Xe(_, y, m) {
    l();
    var p = J(_, m);
    c.writeFileSync(y, p);
  }
  function K(_) {
    for (var y = new Array(_.length), m = 0; m < _.length; ++m) y[m] = String.fromCharCode(_[m]);
    return y.join("");
  }
  function pe(_, y) {
    var m = J(_, y);
    switch (y && y.type || "buffer") {
      case "file":
        return l(), c.writeFileSync(y.filename, m), m;
      case "binary":
        return typeof m == "string" ? m : K(m);
      case "base64":
        return Cn(typeof m == "string" ? m : K(m));
      case "buffer":
        if (We) return Buffer.isBuffer(m) ? m : qt(m);
      case "array":
        return typeof m == "string" ? ut(m) : m;
    }
    return m;
  }
  var we;
  function C(_) {
    try {
      var y = _.InflateRaw, m = new y();
      if (m._processChunk(new Uint8Array([3, 0]), m._finishFlushFlag), m.bytesRead) we = _;
      else throw new Error("zlib does not expose bytesRead");
    } catch (p) {
      console.error("cannot use native zlib: " + (p.message || p));
    }
  }
  function M(_, y) {
    if (!we) return La(_, y);
    var m = we.InflateRaw, p = new m(), w = p._processChunk(_.slice(_.l), p._finishFlushFlag);
    return _.l += p.bytesRead, w;
  }
  function O(_) {
    return we ? we.deflateRawSync(_) : Pe(_);
  }
  var P = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], Q = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], fe = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
  function ce(_) {
    var y = (_ << 1 | _ << 11) & 139536 | (_ << 5 | _ << 15) & 558144;
    return (y >> 16 | y >> 8 | y) & 255;
  }
  for (var ie = typeof Uint8Array < "u", ne = ie ? new Uint8Array(256) : [], Ie = 0; Ie < 256; ++Ie) ne[Ie] = ce(Ie);
  function F(_, y) {
    var m = ne[_ & 255];
    return y <= 8 ? m >>> 8 - y : (m = m << 8 | ne[_ >> 8 & 255], y <= 16 ? m >>> 16 - y : (m = m << 8 | ne[_ >> 16 & 255], m >>> 24 - y));
  }
  function rr(_, y) {
    var m = y & 7, p = y >>> 3;
    return (_[p] | (m <= 6 ? 0 : _[p + 1] << 8)) >>> m & 3;
  }
  function He(_, y) {
    var m = y & 7, p = y >>> 3;
    return (_[p] | (m <= 5 ? 0 : _[p + 1] << 8)) >>> m & 7;
  }
  function Je(_, y) {
    var m = y & 7, p = y >>> 3;
    return (_[p] | (m <= 4 ? 0 : _[p + 1] << 8)) >>> m & 15;
  }
  function Re(_, y) {
    var m = y & 7, p = y >>> 3;
    return (_[p] | (m <= 3 ? 0 : _[p + 1] << 8)) >>> m & 31;
  }
  function le(_, y) {
    var m = y & 7, p = y >>> 3;
    return (_[p] | (m <= 1 ? 0 : _[p + 1] << 8)) >>> m & 127;
  }
  function sr(_, y, m) {
    var p = y & 7, w = y >>> 3, E = (1 << m) - 1, b = _[w] >>> p;
    return m < 8 - p || (b |= _[w + 1] << 8 - p, m < 16 - p) || (b |= _[w + 2] << 16 - p, m < 24 - p) || (b |= _[w + 3] << 24 - p), b & E;
  }
  function Wr(_, y, m) {
    var p = y & 7, w = y >>> 3;
    return p <= 5 ? _[w] |= (m & 7) << p : (_[w] |= m << p & 255, _[w + 1] = (m & 7) >> 8 - p), y + 3;
  }
  function Or(_, y, m) {
    var p = y & 7, w = y >>> 3;
    return m = (m & 1) << p, _[w] |= m, y + 1;
  }
  function Ct(_, y, m) {
    var p = y & 7, w = y >>> 3;
    return m <<= p, _[w] |= m & 255, m >>>= 8, _[w + 1] = m, y + 8;
  }
  function oa(_, y, m) {
    var p = y & 7, w = y >>> 3;
    return m <<= p, _[w] |= m & 255, m >>>= 8, _[w + 1] = m & 255, _[w + 2] = m >>> 8, y + 16;
  }
  function Bt(_, y) {
    var m = _.length, p = 2 * m > y ? 2 * m : y + 5, w = 0;
    if (m >= y) return _;
    if (We) {
      var E = ws(p);
      if (_.copy) _.copy(E);
      else for (; w < _.length; ++w) E[w] = _[w];
      return E;
    } else if (ie) {
      var b = new Uint8Array(p);
      if (b.set) b.set(_);
      else for (; w < m; ++w) b[w] = _[w];
      return b;
    }
    return _.length = p, _;
  }
  function Nr(_) {
    for (var y = new Array(_), m = 0; m < _; ++m) y[m] = 0;
    return y;
  }
  function ft(_, y, m) {
    var p = 1, w = 0, E = 0, b = 0, G = 0, U = _.length, B = ie ? new Uint16Array(32) : Nr(32);
    for (E = 0; E < 32; ++E) B[E] = 0;
    for (E = U; E < m; ++E) _[E] = 0;
    U = _.length;
    var D = ie ? new Uint16Array(U) : Nr(U);
    for (E = 0; E < U; ++E)
      B[w = _[E]]++, p < w && (p = w), D[E] = 0;
    for (B[0] = 0, E = 1; E <= p; ++E) B[E + 16] = G = G + B[E - 1] << 1;
    for (E = 0; E < U; ++E)
      G = _[E], G != 0 && (D[E] = B[G + 16]++);
    var q = 0;
    for (E = 0; E < U; ++E)
      if (q = _[E], q != 0)
        for (G = F(D[E], p) >> p - q, b = (1 << p + 4 - q) - 1; b >= 0; --b)
          y[G | b << q] = q & 15 | E << 4;
    return p;
  }
  var xr = ie ? new Uint16Array(512) : Nr(512), ua = ie ? new Uint16Array(32) : Nr(32);
  if (!ie) {
    for (var Rr = 0; Rr < 512; ++Rr) xr[Rr] = 0;
    for (Rr = 0; Rr < 32; ++Rr) ua[Rr] = 0;
  }
  (function() {
    for (var _ = [], y = 0; y < 32; y++) _.push(5);
    ft(_, ua, 32);
    var m = [];
    for (y = 0; y <= 143; y++) m.push(8);
    for (; y <= 255; y++) m.push(9);
    for (; y <= 279; y++) m.push(7);
    for (; y <= 287; y++) m.push(8);
    ft(m, xr, 288);
  })();
  var dt = /* @__PURE__ */ function() {
    for (var y = ie ? new Uint8Array(32768) : [], m = 0, p = 0; m < fe.length - 1; ++m)
      for (; p < fe[m + 1]; ++p) y[p] = m;
    for (; p < 32768; ++p) y[p] = 29;
    var w = ie ? new Uint8Array(259) : [];
    for (m = 0, p = 0; m < Q.length - 1; ++m)
      for (; p < Q[m + 1]; ++p) w[p] = m;
    function E(G, U) {
      for (var B = 0; B < G.length; ) {
        var D = Math.min(65535, G.length - B), q = B + D == G.length;
        for (U.write_shift(1, +q), U.write_shift(2, D), U.write_shift(2, ~D & 65535); D-- > 0; ) U[U.l++] = G[B++];
      }
      return U.l;
    }
    function b(G, U) {
      for (var B = 0, D = 0, q = ie ? new Uint16Array(32768) : []; D < G.length; ) {
        var te = (
          /* data.length - boff; */
          Math.min(65535, G.length - D)
        );
        if (te < 10) {
          for (B = Wr(U, B, +(D + te == G.length)), B & 7 && (B += 8 - (B & 7)), U.l = B / 8 | 0, U.write_shift(2, te), U.write_shift(2, ~te & 65535); te-- > 0; ) U[U.l++] = G[D++];
          B = U.l * 8;
          continue;
        }
        B = Wr(U, B, +(D + te == G.length) + 2);
        for (var se = 0; te-- > 0; ) {
          var ae = G[D];
          se = (se << 5 ^ ae) & 32767;
          var he = -1, Ee = 0;
          if ((he = q[se]) && (he |= D & -32768, he > D && (he -= 32768), he < D))
            for (; G[he + Ee] == G[D + Ee] && Ee < 250; ) ++Ee;
          if (Ee > 2) {
            ae = w[Ee], ae <= 22 ? B = Ct(U, B, ne[ae + 1] >> 1) - 1 : (Ct(U, B, 3), B += 5, Ct(U, B, ne[ae - 23] >> 5), B += 3);
            var I = ae < 8 ? 0 : ae - 4 >> 2;
            I > 0 && (oa(U, B, Ee - Q[ae]), B += I), ae = y[D - he], B = Ct(U, B, ne[ae] >> 3), B -= 3;
            var Te = ae < 4 ? 0 : ae - 2 >> 1;
            Te > 0 && (oa(U, B, D - he - fe[ae]), B += Te);
            for (var Ue = 0; Ue < Ee; ++Ue)
              q[se] = D & 32767, se = (se << 5 ^ G[D]) & 32767, ++D;
            te -= Ee - 1;
          } else
            ae <= 143 ? ae = ae + 48 : B = Or(U, B, 1), B = Ct(U, B, ne[ae]), q[se] = D & 32767, ++D;
        }
        B = Ct(U, B, 0) - 1;
      }
      return U.l = (B + 7) / 8 | 0, U.l;
    }
    return function(U, B) {
      return U.length < 8 ? E(U, B) : b(U, B);
    };
  }();
  function Pe(_) {
    var y = Z(50 + Math.floor(_.length * 1.1)), m = dt(_, y);
    return y.slice(0, m);
  }
  var lr = ie ? new Uint16Array(32768) : Nr(32768), tt = ie ? new Uint16Array(32768) : Nr(32768), fr = ie ? new Uint16Array(128) : Nr(128), pt = 1, ha = 1;
  function xa(_, y) {
    var m = Re(_, y) + 257;
    y += 5;
    var p = Re(_, y) + 1;
    y += 5;
    var w = Je(_, y) + 4;
    y += 4;
    for (var E = 0, b = ie ? new Uint8Array(19) : Nr(19), G = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], U = 1, B = ie ? new Uint8Array(8) : Nr(8), D = ie ? new Uint8Array(8) : Nr(8), q = b.length, te = 0; te < w; ++te)
      b[P[te]] = E = He(_, y), U < E && (U = E), B[E]++, y += 3;
    var se = 0;
    for (B[0] = 0, te = 1; te <= U; ++te) D[te] = se = se + B[te - 1] << 1;
    for (te = 0; te < q; ++te) (se = b[te]) != 0 && (G[te] = D[se]++);
    var ae = 0;
    for (te = 0; te < q; ++te)
      if (ae = b[te], ae != 0) {
        se = ne[G[te]] >> 8 - ae;
        for (var he = (1 << 7 - ae) - 1; he >= 0; --he) fr[se | he << ae] = ae & 7 | te << 3;
      }
    var Ee = [];
    for (U = 1; Ee.length < m + p; )
      switch (se = fr[le(_, y)], y += se & 7, se >>>= 3) {
        case 16:
          for (E = 3 + rr(_, y), y += 2, se = Ee[Ee.length - 1]; E-- > 0; ) Ee.push(se);
          break;
        case 17:
          for (E = 3 + He(_, y), y += 3; E-- > 0; ) Ee.push(0);
          break;
        case 18:
          for (E = 11 + le(_, y), y += 7; E-- > 0; ) Ee.push(0);
          break;
        default:
          Ee.push(se), U < se && (U = se);
          break;
      }
    var I = Ee.slice(0, m), Te = Ee.slice(m);
    for (te = m; te < 286; ++te) I[te] = 0;
    for (te = p; te < 30; ++te) Te[te] = 0;
    return pt = ft(I, lr, 286), ha = ft(Te, tt, 30), y;
  }
  function vt(_, y) {
    if (_[0] == 3 && !(_[1] & 3))
      return [aa(y), 2];
    for (var m = 0, p = 0, w = ws(y || 1 << 18), E = 0, b = w.length >>> 0, G = 0, U = 0; !(p & 1); ) {
      if (p = He(_, m), m += 3, p >>> 1)
        p >> 1 == 1 ? (G = 9, U = 5) : (m = xa(_, m), G = pt, U = ha);
      else {
        m & 7 && (m += 8 - (m & 7));
        var B = _[m >>> 3] | _[(m >>> 3) + 1] << 8;
        if (m += 32, B > 0)
          for (!y && b < E + B && (w = Bt(w, E + B), b = w.length); B-- > 0; )
            w[E++] = _[m >>> 3], m += 8;
        continue;
      }
      for (; ; ) {
        !y && b < E + 32767 && (w = Bt(w, E + 32767), b = w.length);
        var D = sr(_, m, G), q = p >>> 1 == 1 ? xr[D] : lr[D];
        if (m += q & 15, q >>>= 4, !(q >>> 8 & 255)) w[E++] = q;
        else {
          if (q == 256) break;
          q -= 257;
          var te = q < 8 ? 0 : q - 4 >> 2;
          te > 5 && (te = 0);
          var se = E + Q[q];
          te > 0 && (se += sr(_, m, te), m += te), D = sr(_, m, U), q = p >>> 1 == 1 ? ua[D] : tt[D], m += q & 15, q >>>= 4;
          var ae = q < 4 ? 0 : q - 2 >> 1, he = fe[q];
          for (ae > 0 && (he += sr(_, m, ae), m += ae), !y && b < se && (w = Bt(w, se + 100), b = w.length); E < se; )
            w[E] = w[E - he], ++E;
        }
      }
    }
    return y ? [w, m + 7 >>> 3] : [w.slice(0, E), m + 7 >>> 3];
  }
  function La(_, y) {
    var m = _.slice(_.l || 0), p = vt(m, y);
    return _.l += p[1], p[0];
  }
  function qr(_, y) {
    if (_)
      typeof console < "u" && console.error(y);
    else throw new Error(y);
  }
  function bt(_, y) {
    var m = (
      /*::(*/
      _
    );
    Mr(m, 0);
    var p = [], w = [], E = {
      FileIndex: p,
      FullPaths: w
    };
    S(E, { root: y.root });
    for (var b = m.length - 4; (m[b] != 80 || m[b + 1] != 75 || m[b + 2] != 5 || m[b + 3] != 6) && b >= 0; ) --b;
    m.l = b + 4, m.l += 4;
    var G = m.read_shift(2);
    m.l += 6;
    var U = m.read_shift(4);
    for (m.l = U, b = 0; b < G; ++b) {
      m.l += 20;
      var B = m.read_shift(4), D = m.read_shift(4), q = m.read_shift(2), te = m.read_shift(2), se = m.read_shift(2);
      m.l += 8;
      var ae = m.read_shift(4), he = f(
        /*::(*/
        m.slice(m.l + q, m.l + q + te)
        /*:: :any)*/
      );
      m.l += q + te + se;
      var Ee = m.l;
      m.l = ae + 4, O0(m, B, D, E, he), m.l = Ee;
    }
    return E;
  }
  function O0(_, y, m, p, w) {
    _.l += 2;
    var E = _.read_shift(2), b = _.read_shift(2), G = s(_);
    if (E & 8257) throw new Error("Unsupported ZIP encryption");
    for (var U = _.read_shift(4), B = _.read_shift(4), D = _.read_shift(4), q = _.read_shift(2), te = _.read_shift(2), se = "", ae = 0; ae < q; ++ae) se += String.fromCharCode(_[_.l++]);
    if (te) {
      var he = f(
        /*::(*/
        _.slice(_.l, _.l + te)
        /*:: :any)*/
      );
      (he[21589] || {}).mt && (G = he[21589].mt), ((w || {})[21589] || {}).mt && (G = w[21589].mt);
    }
    _.l += te;
    var Ee = _.slice(_.l, _.l + B);
    switch (b) {
      case 8:
        Ee = M(_, D);
        break;
      case 0:
        break;
      default:
        throw new Error("Unsupported ZIP Compression method " + b);
    }
    var I = !1;
    E & 8 && (U = _.read_shift(4), U == 134695760 && (U = _.read_shift(4), I = !0), B = _.read_shift(4), D = _.read_shift(4)), B != y && qr(I, "Bad compressed size: " + y + " != " + B), D != m && qr(I, "Bad uncompressed size: " + m + " != " + D), Ua(p, se, Ee, { unsafe: !0, mt: G });
  }
  function N0(_, y) {
    var m = y || {}, p = [], w = [], E = Z(1), b = m.compression ? 8 : 0, G = 0, U = 0, B = 0, D = 0, q = 0, te = _.FullPaths[0], se = te, ae = _.FileIndex[0], he = [], Ee = 0;
    for (U = 1; U < _.FullPaths.length; ++U)
      if (se = _.FullPaths[U].slice(te.length), ae = _.FileIndex[U], !(!ae.size || !ae.content || se == "Sh33tJ5")) {
        var I = D, Te = Z(se.length);
        for (B = 0; B < se.length; ++B) Te.write_shift(1, se.charCodeAt(B) & 127);
        Te = Te.slice(0, Te.l), he[q] = To.buf(
          /*::((*/
          ae.content,
          0
        );
        var Ue = ae.content;
        b == 8 && (Ue = O(Ue)), E = Z(30), E.write_shift(4, 67324752), E.write_shift(2, 20), E.write_shift(2, G), E.write_shift(2, b), ae.mt ? i(E, ae.mt) : E.write_shift(4, 0), E.write_shift(-4, he[q]), E.write_shift(4, Ue.length), E.write_shift(
          4,
          /*::(*/
          ae.content.length
        ), E.write_shift(2, Te.length), E.write_shift(2, 0), D += E.length, p.push(E), D += Te.length, p.push(Te), D += Ue.length, p.push(Ue), E = Z(46), E.write_shift(4, 33639248), E.write_shift(2, 0), E.write_shift(2, 20), E.write_shift(2, G), E.write_shift(2, b), E.write_shift(4, 0), E.write_shift(-4, he[q]), E.write_shift(4, Ue.length), E.write_shift(
          4,
          /*::(*/
          ae.content.length
        ), E.write_shift(2, Te.length), E.write_shift(2, 0), E.write_shift(2, 0), E.write_shift(2, 0), E.write_shift(2, 0), E.write_shift(4, 0), E.write_shift(4, I), Ee += E.l, w.push(E), Ee += Te.length, w.push(Te), ++q;
      }
    return E = Z(22), E.write_shift(4, 101010256), E.write_shift(2, 0), E.write_shift(2, 0), E.write_shift(2, q), E.write_shift(2, q), E.write_shift(4, Ee), E.write_shift(4, D), E.write_shift(2, 0), Dr([Dr(p), Dr(w), E]);
  }
  var Pa = {
    htm: "text/html",
    xml: "text/xml",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    mso: "application/x-mso",
    thmx: "application/vnd.ms-officetheme",
    sh33tj5: "application/octet-stream"
  };
  function R0(_, y) {
    if (_.ctype) return _.ctype;
    var m = _.name || "", p = m.match(/\.([^\.]+)$/);
    return p && Pa[p[1]] || y && (p = (m = y).match(/[\.\\]([^\.\\])+$/), p && Pa[p[1]]) ? Pa[p[1]] : "application/octet-stream";
  }
  function L0(_) {
    for (var y = Cn(_), m = [], p = 0; p < y.length; p += 76) m.push(y.slice(p, p + 76));
    return m.join(`\r
`) + `\r
`;
  }
  function P0(_) {
    var y = _.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function(B) {
      var D = B.charCodeAt(0).toString(16).toUpperCase();
      return "=" + (D.length == 1 ? "0" + D : D);
    });
    y = y.replace(/ $/mg, "=20").replace(/\t$/mg, "=09"), y.charAt(0) == `
` && (y = "=0D" + y.slice(1)), y = y.replace(/\r(?!\n)/mg, "=0D").replace(/\n\n/mg, `
=0A`).replace(/([^\r\n])\n/mg, "$1=0A");
    for (var m = [], p = y.split(`\r
`), w = 0; w < p.length; ++w) {
      var E = p[w];
      if (E.length == 0) {
        m.push("");
        continue;
      }
      for (var b = 0; b < E.length; ) {
        var G = 76, U = E.slice(b, b + G);
        U.charAt(G - 1) == "=" ? G-- : U.charAt(G - 2) == "=" ? G -= 2 : U.charAt(G - 3) == "=" && (G -= 3), U = E.slice(b, b + G), b += G, b < E.length && (U += "="), m.push(U);
      }
    }
    return m.join(`\r
`);
  }
  function B0(_) {
    for (var y = [], m = 0; m < _.length; ++m) {
      for (var p = _[m]; m <= _.length && p.charAt(p.length - 1) == "="; ) p = p.slice(0, p.length - 1) + _[++m];
      y.push(p);
    }
    for (var w = 0; w < y.length; ++w) y[w] = y[w].replace(/[=][0-9A-Fa-f]{2}/g, function(E) {
      return String.fromCharCode(parseInt(E.slice(1), 16));
    });
    return ut(y.join(`\r
`));
  }
  function Ba(_, y, m) {
    for (var p = "", w = "", E = "", b, G = 0; G < 10; ++G) {
      var U = y[G];
      if (!U || U.match(/^\s*$/)) break;
      var B = U.match(/^(.*?):\s*([^\s].*)$/);
      if (B) switch (B[1].toLowerCase()) {
        case "content-location":
          p = B[2].trim();
          break;
        case "content-type":
          E = B[2].trim();
          break;
        case "content-transfer-encoding":
          w = B[2].trim();
          break;
      }
    }
    switch (++G, w.toLowerCase()) {
      case "base64":
        b = ut(xt(y.slice(G).join("")));
        break;
      case "quoted-printable":
        b = B0(y.slice(G));
        break;
      default:
        throw new Error("Unsupported Content-Transfer-Encoding " + w);
    }
    var D = Ua(_, p.slice(m.length), b, { unsafe: !0 });
    E && (D.ctype = E);
  }
  function Ma(_, y) {
    if (K(_.slice(0, 13)).toLowerCase() != "mime-version:") throw new Error("Unsupported MAD header");
    var m = y && y.root || "", p = (We && Buffer.isBuffer(_) ? _.toString("binary") : K(_)).split(`\r
`), w = 0, E = "";
    for (w = 0; w < p.length; ++w)
      if (E = p[w], !!/^Content-Location:/i.test(E) && (E = E.slice(E.indexOf("file")), m || (m = E.slice(0, E.lastIndexOf("/") + 1)), E.slice(0, m.length) != m))
        for (; m.length > 0 && (m = m.slice(0, m.length - 1), m = m.slice(0, m.lastIndexOf("/") + 1), E.slice(0, m.length) != m); )
          ;
    var b = (p[1] || "").match(/boundary="(.*?)"/);
    if (!b) throw new Error("MAD cannot find boundary");
    var G = "--" + (b[1] || ""), U = [], B = [], D = {
      FileIndex: U,
      FullPaths: B
    };
    S(D);
    var q, te = 0;
    for (w = 0; w < p.length; ++w) {
      var se = p[w];
      se !== G && se !== G + "--" || (te++ && Ba(D, p.slice(q, w), m), q = w);
    }
    return D;
  }
  function Yn(_, y) {
    var m = y || {}, p = m.boundary || "SheetJS";
    p = "------=" + p;
    for (var w = [
      "MIME-Version: 1.0",
      'Content-Type: multipart/related; boundary="' + p.slice(2) + '"',
      "",
      "",
      ""
    ], E = _.FullPaths[0], b = E, G = _.FileIndex[0], U = 1; U < _.FullPaths.length; ++U)
      if (b = _.FullPaths[U].slice(E.length), G = _.FileIndex[U], !(!G.size || !G.content || b == "Sh33tJ5")) {
        b = b.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function(Ee) {
          return "_x" + Ee.charCodeAt(0).toString(16) + "_";
        }).replace(/[\u0080-\uFFFF]/g, function(Ee) {
          return "_u" + Ee.charCodeAt(0).toString(16) + "_";
        });
        for (var B = G.content, D = We && Buffer.isBuffer(B) ? B.toString("binary") : K(B), q = 0, te = Math.min(1024, D.length), se = 0, ae = 0; ae <= te; ++ae) (se = D.charCodeAt(ae)) >= 32 && se < 128 && ++q;
        var he = q >= te * 4 / 5;
        w.push(p), w.push("Content-Location: " + (m.root || "file:///C:/SheetJS/") + b), w.push("Content-Transfer-Encoding: " + (he ? "quoted-printable" : "base64")), w.push("Content-Type: " + R0(G, b)), w.push(""), w.push(he ? P0(D) : L0(D));
      }
    return w.push(p + `--\r
`), w.join(`\r
`);
  }
  function cn(_) {
    var y = {};
    return S(y, _), y;
  }
  function Ua(_, y, m, p) {
    var w = p && p.unsafe;
    w || S(_);
    var E = !w && ye.find(_, y);
    if (!E) {
      var b = _.FullPaths[0];
      y.slice(0, b.length) == b ? b = y : (b.slice(-1) != "/" && (b += "/"), b = (b + y).replace("//", "/")), E = { name: n(y), type: 2 }, _.FileIndex.push(E), _.FullPaths.push(b), w || ye.utils.cfb_gc(_);
    }
    return E.content = m, E.size = m ? m.length : 0, p && (p.CLSID && (E.clsid = p.CLSID), p.mt && (E.mt = p.mt), p.ct && (E.ct = p.ct)), E;
  }
  function mt(_, y) {
    S(_);
    var m = ye.find(_, y);
    if (m) {
      for (var p = 0; p < _.FileIndex.length; ++p) if (_.FileIndex[p] == m)
        return _.FileIndex.splice(p, 1), _.FullPaths.splice(p, 1), !0;
    }
    return !1;
  }
  function M0(_, y, m) {
    S(_);
    var p = ye.find(_, y);
    if (p) {
      for (var w = 0; w < _.FileIndex.length; ++w) if (_.FileIndex[w] == p)
        return _.FileIndex[w].name = n(m), _.FullPaths[w] = m, !0;
    }
    return !1;
  }
  function U0(_) {
    L(_, !0);
  }
  return t.find = j, t.read = N, t.parse = o, t.write = pe, t.writeFile = Xe, t.utils = {
    cfb_new: cn,
    cfb_add: Ua,
    cfb_del: mt,
    cfb_mov: M0,
    cfb_gc: U0,
    ReadShift: _n,
    CheckField: lc,
    prep_blob: Mr,
    bconcat: Dr,
    use_zlib: C,
    _deflateRaw: Pe,
    _inflateRaw: La,
    consts: de
  }, t;
}();
function yo(e) {
  return typeof e == "string" ? T0(e) : Array.isArray(e) ? Yl(e) : e;
}
function Vn(e, t, r) {
  if (typeof Deno < "u") {
    if (r && typeof t == "string") switch (r) {
      case "utf8":
        t = new TextEncoder(r).encode(t);
        break;
      case "binary":
        t = T0(t);
        break;
      default:
        throw new Error("Unsupported encoding " + r);
    }
    return Deno.writeFileSync(e, t);
  }
  var a = r == "utf8" ? Ht(t) : t;
  if (typeof IE_SaveFile < "u") return IE_SaveFile(a, e);
  if (typeof Blob < "u") {
    var n = new Blob([yo(a)], { type: "application/octet-stream" });
    if (typeof navigator < "u" && navigator.msSaveBlob) return navigator.msSaveBlob(n, e);
    if (typeof saveAs < "u") return saveAs(n, e);
    if (typeof URL < "u" && typeof document < "u" && document.createElement && URL.createObjectURL) {
      var i = URL.createObjectURL(n);
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
    return f.open("w"), f.encoding = "binary", Array.isArray(t) && (t = fa(t)), f.write(t), f.close(), t;
  } catch (c) {
    if (!c.message || !c.message.match(/onstruct/)) throw c;
  }
  throw new Error("cannot save file " + e);
}
function So(e) {
  if (typeof Deno < "u") return Deno.readFileSync(e);
  if (typeof $ < "u" && typeof File < "u" && typeof Folder < "u") try {
    var t = File(e);
    t.open("r"), t.encoding = "binary";
    var r = t.read();
    return t.close(), r;
  } catch (a) {
    if (!a.message || !a.message.match(/onstruct/)) throw a;
  }
  throw new Error("Cannot access file " + e);
}
function gr(e) {
  for (var t = Object.keys(e), r = [], a = 0; a < t.length; ++a) Object.prototype.hasOwnProperty.call(e, t[a]) && r.push(t[a]);
  return r;
}
function Cs(e, t) {
  for (var r = [], a = gr(e), n = 0; n !== a.length; ++n) r[e[a[n]][t]] == null && (r[e[a[n]][t]] = a[n]);
  return r;
}
function S0(e) {
  for (var t = [], r = gr(e), a = 0; a !== r.length; ++a) t[e[r[a]]] = r[a];
  return t;
}
function F0(e) {
  for (var t = [], r = gr(e), a = 0; a !== r.length; ++a) t[e[r[a]]] = parseInt(r[a], 10);
  return t;
}
function Fo(e) {
  for (var t = [], r = gr(e), a = 0; a !== r.length; ++a)
    t[e[r[a]]] == null && (t[e[r[a]]] = []), t[e[r[a]]].push(r[a]);
  return t;
}
var d0 = /* @__PURE__ */ new Date(1899, 11, 30, 0, 0, 0);
function Ar(e, t) {
  var r = /* @__PURE__ */ e.getTime(), a = /* @__PURE__ */ d0.getTime() + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ d0.getTimezoneOffset()) * 6e4;
  return (r - a) / (24 * 60 * 60 * 1e3);
}
var Hf = /* @__PURE__ */ new Date(), Ao = /* @__PURE__ */ d0.getTime() + (/* @__PURE__ */ Hf.getTimezoneOffset() - /* @__PURE__ */ d0.getTimezoneOffset()) * 6e4, bs = /* @__PURE__ */ Hf.getTimezoneOffset();
function A0(e) {
  var t = /* @__PURE__ */ new Date();
  return t.setTime(e * 24 * 60 * 60 * 1e3 + Ao), t.getTimezoneOffset() !== bs && t.setTime(t.getTime() + (t.getTimezoneOffset() - bs) * 6e4), t;
}
function Co(e) {
  var t = 0, r = 0, a = !1, n = e.match(/P([0-9\.]+Y)?([0-9\.]+M)?([0-9\.]+D)?T([0-9\.]+H)?([0-9\.]+M)?([0-9\.]+S)?/);
  if (!n) throw new Error("|" + e + "| is not an ISO8601 Duration");
  for (var i = 1; i != n.length; ++i)
    if (n[i]) {
      switch (r = 1, i > 3 && (a = !0), n[i].slice(n[i].length - 1)) {
        case "Y":
          throw new Error("Unsupported ISO Duration Field: " + n[i].slice(n[i].length - 1));
        case "D":
          r *= 24;
        case "H":
          r *= 60;
        case "M":
          if (a) r *= 60;
          else throw new Error("Unsupported ISO Duration Field: M");
      }
      t += r * parseInt(n[i], 10);
    }
  return t;
}
var Ds = /* @__PURE__ */ new Date("2017-02-19T19:06:09.000Z"), Xf = /* @__PURE__ */ isNaN(/* @__PURE__ */ Ds.getFullYear()) ? /* @__PURE__ */ new Date("2/19/17") : Ds, bo = /* @__PURE__ */ Xf.getFullYear() == 2017;
function nr(e, t) {
  var r = new Date(e);
  if (bo)
    return t > 0 ? r.setTime(r.getTime() + r.getTimezoneOffset() * 60 * 1e3) : t < 0 && r.setTime(r.getTime() - r.getTimezoneOffset() * 60 * 1e3), r;
  if (e instanceof Date) return e;
  if (Xf.getFullYear() == 1917 && !isNaN(r.getFullYear())) {
    var a = r.getFullYear();
    return e.indexOf("" + a) > -1 || r.setFullYear(r.getFullYear() + 100), r;
  }
  var n = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"], i = new Date(+n[0], +n[1] - 1, +n[2], +n[3] || 0, +n[4] || 0, +n[5] || 0);
  return e.indexOf("Z") > -1 && (i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3)), i;
}
function ya(e, t) {
  if (We && Buffer.isBuffer(e)) {
    if (t) {
      if (e[0] == 255 && e[1] == 254) return Ht(e.slice(2).toString("utf16le"));
      if (e[1] == 254 && e[2] == 255) return Ht(Df(e.slice(2).toString("binary")));
    }
    return e.toString("binary");
  }
  if (typeof TextDecoder < "u") try {
    if (t) {
      if (e[0] == 255 && e[1] == 254) return Ht(new TextDecoder("utf-16le").decode(e.slice(2)));
      if (e[0] == 254 && e[1] == 255) return Ht(new TextDecoder("utf-16be").decode(e.slice(2)));
    }
    var r = {
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
      return r[i] || i;
    });
  } catch {
  }
  for (var a = [], n = 0; n != e.length; ++n) a.push(String.fromCharCode(e[n]));
  return a.join("");
}
function ir(e) {
  if (typeof JSON < "u" && !Array.isArray(e)) return JSON.parse(JSON.stringify(e));
  if (typeof e != "object" || e == null) return e;
  if (e instanceof Date) return new Date(e.getTime());
  var t = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = ir(e[r]));
  return t;
}
function vr(e, t) {
  for (var r = ""; r.length < t; ) r += e;
  return r;
}
function Lt(e) {
  var t = Number(e);
  if (!isNaN(t)) return isFinite(t) ? t : NaN;
  if (!/\d/.test(e)) return t;
  var r = 1, a = e.replace(/([\d]),([\d])/g, "$1$2").replace(/[$]/g, "").replace(/[%]/g, function() {
    return r *= 100, "";
  });
  return !isNaN(t = Number(a)) || (a = a.replace(/[(](.*)[)]/, function(n, i) {
    return r = -r, i;
  }), !isNaN(t = Number(a))) ? t / r : t;
}
var Do = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
function en(e) {
  var t = new Date(e), r = /* @__PURE__ */ new Date(NaN), a = t.getYear(), n = t.getMonth(), i = t.getDate();
  if (isNaN(i)) return r;
  var s = e.toLowerCase();
  if (s.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
    if (s = s.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, ""), s.length > 3 && Do.indexOf(s) == -1) return r;
  } else if (s.match(/[a-z]/)) return r;
  return a < 0 || a > 8099 ? r : (n > 0 || i > 1) && a != 101 ? t : e.match(/[^-0-9:,\/\\]/) ? r : t;
}
var Io = /* @__PURE__ */ function() {
  var e = "abacaba".split(/(:?b)/i).length == 5;
  return function(r, a, n) {
    if (e || typeof a == "string") return r.split(a);
    for (var i = r.split(a), s = [i[0]], f = 1; f < i.length; ++f)
      s.push(n), s.push(i[f]);
    return s;
  };
}();
function zf(e) {
  return e ? e.content && e.type ? ya(e.content, !0) : e.data ? vn(e.data) : e.asNodeBuffer && We ? vn(e.asNodeBuffer().toString("binary")) : e.asBinary ? vn(e.asBinary()) : e._data && e._data.getContent ? vn(ya(Array.prototype.slice.call(e._data.getContent(), 0))) : null : null;
}
function Gf(e) {
  if (!e) return null;
  if (e.data) return gs(e.data);
  if (e.asNodeBuffer && We) return e.asNodeBuffer();
  if (e._data && e._data.getContent) {
    var t = e._data.getContent();
    return typeof t == "string" ? gs(t) : Array.prototype.slice.call(t);
  }
  return e.content && e.type ? e.content : null;
}
function Oo(e) {
  return e && e.name.slice(-4) === ".bin" ? Gf(e) : zf(e);
}
function Tt(e, t) {
  for (var r = e.FullPaths || gr(e.files), a = t.toLowerCase().replace(/[\/]/g, "\\"), n = a.replace(/\\/g, "/"), i = 0; i < r.length; ++i) {
    var s = r[i].replace(/^Root Entry[\/]/, "").toLowerCase();
    if (a == s || n == s) return e.files ? e.files[r[i]] : e.FileIndex[i];
  }
  return null;
}
function Fi(e, t) {
  var r = Tt(e, t);
  if (r == null) throw new Error("Cannot find file " + t + " in zip");
  return r;
}
function Tr(e, t, r) {
  if (!r) return Oo(Fi(e, t));
  if (!t) return null;
  try {
    return Tr(e, t);
  } catch {
    return null;
  }
}
function ht(e, t, r) {
  if (!r) return zf(Fi(e, t));
  if (!t) return null;
  try {
    return ht(e, t);
  } catch {
    return null;
  }
}
function No(e, t, r) {
  return Gf(Fi(e, t));
}
function Is(e) {
  for (var t = e.FullPaths || gr(e.files), r = [], a = 0; a < t.length; ++a) t[a].slice(-1) != "/" && r.push(t[a].replace(/^Root Entry[\/]/, ""));
  return r.sort();
}
function Le(e, t, r) {
  if (e.FullPaths) {
    if (typeof r == "string") {
      var a;
      return We ? a = qt(r) : a = Jl(r), ye.utils.cfb_add(e, t, a);
    }
    ye.utils.cfb_add(e, t, r);
  } else e.file(t, r);
}
function Ai() {
  return ye.utils.cfb_new();
}
function $f(e, t) {
  switch (t.type) {
    case "base64":
      return ye.read(e, { type: "base64" });
    case "binary":
      return ye.read(e, { type: "binary" });
    case "buffer":
    case "array":
      return ye.read(e, { type: "buffer" });
  }
  throw new Error("Unrecognized type " + t.type);
}
function gn(e, t) {
  if (e.charAt(0) == "/") return e.slice(1);
  var r = t.split("/");
  t.slice(-1) != "/" && r.pop();
  for (var a = e.split("/"); a.length !== 0; ) {
    var n = a.shift();
    n === ".." ? r.pop() : n !== "." && r.push(n);
  }
  return r.join("/");
}
var kr = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`, Ro = /([^"\s?>\/]+)\s*=\s*((?:")([^"]*)(?:")|(?:')([^']*)(?:')|([^'">\s]+))/g, Os = /<[\/\?]?[a-zA-Z0-9:_-]+(?:\s+[^"\s?>\/]+\s*=\s*(?:"[^"]*"|'[^']*'|[^'">\s=]+))*\s*[\/\?]?>/mg, Lo = /<[^>]*>/g, Jr = /* @__PURE__ */ kr.match(Os) ? Os : Lo, Po = /<\w*:/, Bo = /<(\/?)\w+:/;
function be(e, t, r) {
  for (var a = {}, n = 0, i = 0; n !== e.length && !((i = e.charCodeAt(n)) === 32 || i === 10 || i === 13); ++n) ;
  if (t || (a[0] = e.slice(0, n)), n === e.length) return a;
  var s = e.match(Ro), f = 0, c = "", l = 0, o = "", u = "", x = 1;
  if (s) for (l = 0; l != s.length; ++l) {
    for (u = s[l], i = 0; i != u.length && u.charCodeAt(i) !== 61; ++i) ;
    for (o = u.slice(0, i).trim(); u.charCodeAt(i + 1) == 32; ) ++i;
    for (x = (n = u.charCodeAt(i + 1)) == 34 || n == 39 ? 1 : 0, c = u.slice(i + 1 + x, u.length - x), f = 0; f != o.length && o.charCodeAt(f) !== 58; ++f) ;
    if (f === o.length)
      o.indexOf("_") > 0 && (o = o.slice(0, o.indexOf("_"))), a[o] = c, a[o.toLowerCase()] = c;
    else {
      var d = (f === 5 && o.slice(0, 5) === "xmlns" ? "xmlns" : "") + o.slice(f + 1);
      if (a[d] && o.slice(f - 3, f) == "ext") continue;
      a[d] = c, a[d.toLowerCase()] = c;
    }
  }
  return a;
}
function Xt(e) {
  return e.replace(Bo, "<$1");
}
var jf = {
  "&quot;": '"',
  "&apos;": "'",
  "&gt;": ">",
  "&lt;": "<",
  "&amp;": "&"
}, Ci = /* @__PURE__ */ S0(jf), Ge = /* @__PURE__ */ function() {
  var e = /&(?:quot|apos|gt|lt|amp|#x?([\da-fA-F]+));/ig, t = /_x([\da-fA-F]{4})_/ig;
  return function r(a) {
    var n = a + "", i = n.indexOf("<![CDATA[");
    if (i == -1) return n.replace(e, function(f, c) {
      return jf[f] || String.fromCharCode(parseInt(c, f.indexOf("x") > -1 ? 16 : 10)) || f;
    }).replace(t, function(f, c) {
      return String.fromCharCode(parseInt(c, 16));
    });
    var s = n.indexOf("]]>");
    return r(n.slice(0, i)) + n.slice(i + 9, s) + r(n.slice(s + 3));
  };
}(), bi = /[&<>'"]/g, Mo = /[\u0000-\u0008\u000b-\u001f]/g;
function er(e) {
  var t = e + "";
  return t.replace(bi, function(r) {
    return Ci[r];
  }).replace(Mo, function(r) {
    return "_x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + "_";
  });
}
function Ns(e) {
  return er(e).replace(/ /g, "_x0020_");
}
var Kf = /[\u0000-\u001f]/g;
function Di(e) {
  var t = e + "";
  return t.replace(bi, function(r) {
    return Ci[r];
  }).replace(/\n/g, "<br/>").replace(Kf, function(r) {
    return "&#x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + ";";
  });
}
function Uo(e) {
  var t = e + "";
  return t.replace(bi, function(r) {
    return Ci[r];
  }).replace(Kf, function(r) {
    return "&#x" + r.charCodeAt(0).toString(16).toUpperCase() + ";";
  });
}
var Rs = /* @__PURE__ */ function() {
  var e = /&#(\d+);/g;
  function t(r, a) {
    return String.fromCharCode(parseInt(a, 10));
  }
  return function(a) {
    return a.replace(e, t);
  };
}();
function Wo(e) {
  return e.replace(/(\r\n|[\r\n])/g, "&#10;");
}
function ar(e) {
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
function Y0(e) {
  for (var t = "", r = 0, a = 0, n = 0, i = 0, s = 0, f = 0; r < e.length; ) {
    if (a = e.charCodeAt(r++), a < 128) {
      t += String.fromCharCode(a);
      continue;
    }
    if (n = e.charCodeAt(r++), a > 191 && a < 224) {
      s = (a & 31) << 6, s |= n & 63, t += String.fromCharCode(s);
      continue;
    }
    if (i = e.charCodeAt(r++), a < 240) {
      t += String.fromCharCode((a & 15) << 12 | (n & 63) << 6 | i & 63);
      continue;
    }
    s = e.charCodeAt(r++), f = ((a & 7) << 18 | (n & 63) << 12 | (i & 63) << 6 | s & 63) - 65536, t += String.fromCharCode(55296 + (f >>> 10 & 1023)), t += String.fromCharCode(56320 + (f & 1023));
  }
  return t;
}
function Ls(e) {
  var t = aa(2 * e.length), r, a, n = 1, i = 0, s = 0, f;
  for (a = 0; a < e.length; a += n)
    n = 1, (f = e.charCodeAt(a)) < 128 ? r = f : f < 224 ? (r = (f & 31) * 64 + (e.charCodeAt(a + 1) & 63), n = 2) : f < 240 ? (r = (f & 15) * 4096 + (e.charCodeAt(a + 1) & 63) * 64 + (e.charCodeAt(a + 2) & 63), n = 3) : (n = 4, r = (f & 7) * 262144 + (e.charCodeAt(a + 1) & 63) * 4096 + (e.charCodeAt(a + 2) & 63) * 64 + (e.charCodeAt(a + 3) & 63), r -= 65536, s = 55296 + (r >>> 10 & 1023), r = 56320 + (r & 1023)), s !== 0 && (t[i++] = s & 255, t[i++] = s >>> 8, s = 0), t[i++] = r % 256, t[i++] = r >>> 8;
  return t.slice(0, i).toString("ucs2");
}
function Ps(e) {
  return qt(e, "binary").toString("utf8");
}
var e0 = "foo bar bazâð£", tr = We && (/* @__PURE__ */ Ps(e0) == /* @__PURE__ */ Y0(e0) && Ps || /* @__PURE__ */ Ls(e0) == /* @__PURE__ */ Y0(e0) && Ls) || Y0, Ht = We ? function(e) {
  return qt(e, "utf8").toString("binary");
} : function(e) {
  for (var t = [], r = 0, a = 0, n = 0; r < e.length; )
    switch (a = e.charCodeAt(r++), !0) {
      case a < 128:
        t.push(String.fromCharCode(a));
        break;
      case a < 2048:
        t.push(String.fromCharCode(192 + (a >> 6))), t.push(String.fromCharCode(128 + (a & 63)));
        break;
      case (a >= 55296 && a < 57344):
        a -= 55296, n = e.charCodeAt(r++) - 56320 + (a << 10), t.push(String.fromCharCode(240 + (n >> 18 & 7))), t.push(String.fromCharCode(144 + (n >> 12 & 63))), t.push(String.fromCharCode(128 + (n >> 6 & 63))), t.push(String.fromCharCode(128 + (n & 63)));
        break;
      default:
        t.push(String.fromCharCode(224 + (a >> 12))), t.push(String.fromCharCode(128 + (a >> 6 & 63))), t.push(String.fromCharCode(128 + (a & 63)));
    }
  return t.join("");
}, Dn = /* @__PURE__ */ function() {
  var e = {};
  return function(r, a) {
    var n = r + "|" + (a || "");
    return e[n] ? e[n] : e[n] = new RegExp("<(?:\\w+:)?" + r + '(?: xml:space="preserve")?(?:[^>]*)>([\\s\\S]*?)</(?:\\w+:)?' + r + ">", a || "");
  };
}(), Yf = /* @__PURE__ */ function() {
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
  return function(r) {
    for (var a = r.replace(/^[\t\n\r ]+/, "").replace(/[\t\n\r ]+$/, "").replace(/>\s+/g, ">").replace(/\s+</g, "<").replace(/[\t\n\r ]+/g, " ").replace(/<\s*[bB][rR]\s*\/?>/g, `
`).replace(/<[^>]*>/g, ""), n = 0; n < e.length; ++n) a = a.replace(e[n][0], e[n][1]);
    return a;
  };
}(), Vo = /* @__PURE__ */ function() {
  var e = {};
  return function(r) {
    return e[r] !== void 0 ? e[r] : e[r] = new RegExp("<(?:vt:)?" + r + ">([\\s\\S]*?)</(?:vt:)?" + r + ">", "g");
  };
}(), Ho = /<\/?(?:vt:)?variant>/g, Xo = /<(?:vt:)([^>]*)>([\s\S]*)</;
function Bs(e, t) {
  var r = be(e), a = e.match(Vo(r.baseType)) || [], n = [];
  if (a.length != r.size) {
    if (t.WTF) throw new Error("unexpected vector length " + a.length + " != " + r.size);
    return n;
  }
  return a.forEach(function(i) {
    var s = i.replace(Ho, "").match(Xo);
    s && n.push({ v: tr(s[2]), t: s[1] });
  }), n;
}
var Jf = /(^\s|\s$|\n)/;
function Ur(e, t) {
  return "<" + e + (t.match(Jf) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e + ">";
}
function In(e) {
  return gr(e).map(function(t) {
    return " " + t + '="' + e[t] + '"';
  }).join("");
}
function oe(e, t, r) {
  return "<" + e + (r != null ? In(r) : "") + (t != null ? (t.match(Jf) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e : "/") + ">";
}
function ci(e, t) {
  try {
    return e.toISOString().replace(/\.\d*/, "");
  } catch (r) {
    if (t) throw r;
  }
  return "";
}
function zo(e, t) {
  switch (typeof e) {
    case "string":
      var r = oe("vt:lpwstr", er(e));
      return r = r.replace(/&quot;/g, "_x0022_"), r;
    case "number":
      return oe((e | 0) == e ? "vt:i4" : "vt:r8", er(String(e)));
    case "boolean":
      return oe("vt:bool", e ? "true" : "false");
  }
  if (e instanceof Date) return oe("vt:filetime", ci(e));
  throw new Error("Unable to serialize " + e);
}
function Ii(e) {
  if (We && /*::typeof Buffer !== "undefined" && d != null && d instanceof Buffer &&*/
  Buffer.isBuffer(e)) return e.toString("utf8");
  if (typeof e == "string") return e;
  if (typeof Uint8Array < "u" && e instanceof Uint8Array) return tr(fa(Ti(e)));
  throw new Error("Bad input format: expected Buffer or string");
}
var On = /<(\/?)([^\s?><!\/:]*:|)([^\s?<>:\/]+)(?:[\s?:\/][^>]*)?>/mg, Fr = {
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
}, ba = [
  "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  "http://purl.oclc.org/ooxml/spreadsheetml/main",
  "http://schemas.microsoft.com/office/excel/2006/main",
  "http://schemas.microsoft.com/office/excel/2006/2"
], lt = {
  o: "urn:schemas-microsoft-com:office:office",
  x: "urn:schemas-microsoft-com:office:excel",
  ss: "urn:schemas-microsoft-com:office:spreadsheet",
  dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
  mv: "http://macVmlSchemaUri",
  v: "urn:schemas-microsoft-com:vml",
  html: "http://www.w3.org/TR/REC-html40"
};
function Go(e, t) {
  for (var r = 1 - 2 * (e[t + 7] >>> 7), a = ((e[t + 7] & 127) << 4) + (e[t + 6] >>> 4 & 15), n = e[t + 6] & 15, i = 5; i >= 0; --i) n = n * 256 + e[t + i];
  return a == 2047 ? n == 0 ? r * (1 / 0) : NaN : (a == 0 ? a = -1022 : (a -= 1023, n += Math.pow(2, 52)), r * Math.pow(2, a - 52) * n);
}
function $o(e, t, r) {
  var a = (t < 0 || 1 / t == -1 / 0 ? 1 : 0) << 7, n = 0, i = 0, s = a ? -t : t;
  isFinite(s) ? s == 0 ? n = i = 0 : (n = Math.floor(Math.log(s) / Math.LN2), i = s * Math.pow(2, 52 - n), n <= -1023 && (!isFinite(i) || i < Math.pow(2, 52)) ? n = -1022 : (i -= Math.pow(2, 52), n += 1023)) : (n = 2047, i = isNaN(t) ? 26985 : 0);
  for (var f = 0; f <= 5; ++f, i /= 256) e[r + f] = i & 255;
  e[r + 6] = (n & 15) << 4 | i & 15, e[r + 7] = n >> 4 | a;
}
var Ms = function(e) {
  for (var t = [], r = 10240, a = 0; a < e[0].length; ++a) if (e[0][a]) for (var n = 0, i = e[0][a].length; n < i; n += r) t.push.apply(t, e[0][a].slice(n, n + r));
  return t;
}, Us = We ? function(e) {
  return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0].map(function(t) {
    return Buffer.isBuffer(t) ? t : qt(t);
  })) : Ms(e);
} : Ms, Ws = function(e, t, r) {
  for (var a = [], n = t; n < r; n += 2) a.push(String.fromCharCode($t(e, n)));
  return a.join("").replace(rt, "");
}, Oi = We ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("utf16le", t, r).replace(rt, "") : Ws(e, t, r);
} : Ws, Vs = function(e, t, r) {
  for (var a = [], n = t; n < t + r; ++n) a.push(("0" + e[n].toString(16)).slice(-2));
  return a.join("");
}, qf = We ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("hex", t, t + r) : Vs(e, t, r);
} : Vs, Hs = function(e, t, r) {
  for (var a = [], n = t; n < r; n++) a.push(String.fromCharCode(Ka(e, n)));
  return a.join("");
}, Hn = We ? function(t, r, a) {
  return Buffer.isBuffer(t) ? t.toString("utf8", r, a) : Hs(t, r, a);
} : Hs, Zf = function(e, t) {
  var r = ot(e, t);
  return r > 0 ? Hn(e, t + 4, t + 4 + r - 1) : "";
}, Qf = Zf, ec = function(e, t) {
  var r = ot(e, t);
  return r > 0 ? Hn(e, t + 4, t + 4 + r - 1) : "";
}, rc = ec, tc = function(e, t) {
  var r = 2 * ot(e, t);
  return r > 0 ? Hn(e, t + 4, t + 4 + r - 1) : "";
}, ac = tc, nc = function(t, r) {
  var a = ot(t, r);
  return a > 0 ? Oi(t, r + 4, r + 4 + a) : "";
}, ic = nc, sc = function(e, t) {
  var r = ot(e, t);
  return r > 0 ? Hn(e, t + 4, t + 4 + r) : "";
}, fc = sc, cc = function(e, t) {
  return Go(e, t);
}, p0 = cc, Ni = function(t) {
  return Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
};
We && (Qf = function(t, r) {
  if (!Buffer.isBuffer(t)) return Zf(t, r);
  var a = t.readUInt32LE(r);
  return a > 0 ? t.toString("utf8", r + 4, r + 4 + a - 1) : "";
}, rc = function(t, r) {
  if (!Buffer.isBuffer(t)) return ec(t, r);
  var a = t.readUInt32LE(r);
  return a > 0 ? t.toString("utf8", r + 4, r + 4 + a - 1) : "";
}, ac = function(t, r) {
  if (!Buffer.isBuffer(t)) return tc(t, r);
  var a = 2 * t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + a - 1);
}, ic = function(t, r) {
  if (!Buffer.isBuffer(t)) return nc(t, r);
  var a = t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + a);
}, fc = function(t, r) {
  if (!Buffer.isBuffer(t)) return sc(t, r);
  var a = t.readUInt32LE(r);
  return t.toString("utf8", r + 4, r + 4 + a);
}, p0 = function(t, r) {
  return Buffer.isBuffer(t) ? t.readDoubleLE(r) : cc(t, r);
}, Ni = function(t) {
  return Buffer.isBuffer(t) || Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
});
var Ka = function(e, t) {
  return e[t];
}, $t = function(e, t) {
  return e[t + 1] * 256 + e[t];
}, jo = function(e, t) {
  var r = e[t + 1] * 256 + e[t];
  return r < 32768 ? r : (65535 - r + 1) * -1;
}, ot = function(e, t) {
  return e[t + 3] * (1 << 24) + (e[t + 2] << 16) + (e[t + 1] << 8) + e[t];
}, ma = function(e, t) {
  return e[t + 3] << 24 | e[t + 2] << 16 | e[t + 1] << 8 | e[t];
}, Ko = function(e, t) {
  return e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3];
};
function _n(e, t) {
  var r = "", a, n, i = [], s, f, c, l;
  switch (t) {
    case "dbcs":
      if (l = this.l, We && Buffer.isBuffer(this)) r = this.slice(this.l, this.l + 2 * e).toString("utf16le");
      else for (c = 0; c < e; ++c)
        r += String.fromCharCode($t(this, l)), l += 2;
      e *= 2;
      break;
    case "utf8":
      r = Hn(this, this.l, this.l + e);
      break;
    case "utf16le":
      e *= 2, r = Oi(this, this.l, this.l + e);
      break;
    case "wstr":
      return _n.call(this, e, "dbcs");
    case "lpstr-ansi":
      r = Qf(this, this.l), e = 4 + ot(this, this.l);
      break;
    case "lpstr-cp":
      r = rc(this, this.l), e = 4 + ot(this, this.l);
      break;
    case "lpwstr":
      r = ac(this, this.l), e = 4 + 2 * ot(this, this.l);
      break;
    case "lpp4":
      e = 4 + ot(this, this.l), r = ic(this, this.l), e & 2 && (e += 2);
      break;
    case "8lpp4":
      e = 4 + ot(this, this.l), r = fc(this, this.l), e & 3 && (e += 4 - (e & 3));
      break;
    case "cstr":
      for (e = 0, r = ""; (s = Ka(this, this.l + e++)) !== 0; ) i.push(Qn(s));
      r = i.join("");
      break;
    case "_wstr":
      for (e = 0, r = ""; (s = $t(this, this.l + e)) !== 0; )
        i.push(Qn(s)), e += 2;
      e += 2, r = i.join("");
      break;
    case "dbcs-cont":
      for (r = "", l = this.l, c = 0; c < e; ++c) {
        if (this.lens && this.lens.indexOf(l) !== -1)
          return s = Ka(this, l), this.l = l + 1, f = _n.call(this, e - c, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(Qn($t(this, l))), l += 2;
      }
      r = i.join(""), e *= 2;
      break;
    case "cpstr":
    case "sbcs-cont":
      for (r = "", l = this.l, c = 0; c != e; ++c) {
        if (this.lens && this.lens.indexOf(l) !== -1)
          return s = Ka(this, l), this.l = l + 1, f = _n.call(this, e - c, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(Qn(Ka(this, l))), l += 1;
      }
      r = i.join("");
      break;
    default:
      switch (e) {
        case 1:
          return a = Ka(this, this.l), this.l++, a;
        case 2:
          return a = (t === "i" ? jo : $t)(this, this.l), this.l += 2, a;
        case 4:
        case -4:
          return t === "i" || !(this[this.l + 3] & 128) ? (a = (e > 0 ? ma : Ko)(this, this.l), this.l += 4, a) : (n = ot(this, this.l), this.l += 4, n);
        case 8:
        case -8:
          if (t === "f")
            return e == 8 ? n = p0(this, this.l) : n = p0([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0), this.l += 8, n;
          e = 8;
        case 16:
          r = qf(this, this.l, e);
          break;
      }
  }
  return this.l += e, r;
}
var Yo = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255, e[r + 2] = t >>> 16 & 255, e[r + 3] = t >>> 24 & 255;
}, Jo = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >> 8 & 255, e[r + 2] = t >> 16 & 255, e[r + 3] = t >> 24 & 255;
}, qo = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255;
};
function Zo(e, t, r) {
  var a = 0, n = 0;
  if (r === "dbcs") {
    for (n = 0; n != t.length; ++n) qo(this, t.charCodeAt(n), this.l + 2 * n);
    a = 2 * t.length;
  } else if (r === "sbcs") {
    for (t = t.replace(/[^\x00-\x7F]/g, "_"), n = 0; n != t.length; ++n) this[this.l + n] = t.charCodeAt(n) & 255;
    a = t.length;
  } else if (r === "hex") {
    for (; n < e; ++n)
      this[this.l++] = parseInt(t.slice(2 * n, 2 * n + 2), 16) || 0;
    return this;
  } else if (r === "utf16le") {
    var i = Math.min(this.l + e, this.length);
    for (n = 0; n < Math.min(t.length, e); ++n) {
      var s = t.charCodeAt(n);
      this[this.l++] = s & 255, this[this.l++] = s >> 8;
    }
    for (; this.l < i; ) this[this.l++] = 0;
    return this;
  } else switch (e) {
    case 1:
      a = 1, this[this.l] = t & 255;
      break;
    case 2:
      a = 2, this[this.l] = t & 255, t >>>= 8, this[this.l + 1] = t & 255;
      break;
    case 3:
      a = 3, this[this.l] = t & 255, t >>>= 8, this[this.l + 1] = t & 255, t >>>= 8, this[this.l + 2] = t & 255;
      break;
    case 4:
      a = 4, Yo(this, t, this.l);
      break;
    case 8:
      if (a = 8, r === "f") {
        $o(this, t, this.l);
        break;
      }
    case 16:
      break;
    case -4:
      a = 4, Jo(this, t, this.l);
      break;
  }
  return this.l += a, this;
}
function lc(e, t) {
  var r = qf(this, this.l, e.length >> 1);
  if (r !== e) throw new Error(t + "Expected " + e + " saw " + r);
  this.l += e.length >> 1;
}
function Mr(e, t) {
  e.l = t, e.read_shift = /*::(*/
  _n, e.chk = lc, e.write_shift = Zo;
}
function Yr(e, t) {
  e.l += t;
}
function Z(e) {
  var t = aa(e);
  return Mr(t, 0), t;
}
function Zt(e, t, r) {
  if (e) {
    var a, n, i;
    Mr(e, e.l || 0);
    for (var s = e.length, f = 0, c = 0; e.l < s; ) {
      f = e.read_shift(1), f & 128 && (f = (f & 127) + ((e.read_shift(1) & 127) << 7));
      var l = Mn[f] || Mn[65535];
      for (a = e.read_shift(1), i = a & 127, n = 1; n < 4 && a & 128; ++n) i += ((a = e.read_shift(1)) & 127) << 7 * n;
      c = e.l + i;
      var o = l.f && l.f(e, i, r);
      if (e.l = c, t(o, l, f)) return;
    }
  }
}
function it() {
  var e = [], t = We ? 256 : 2048, r = function(l) {
    var o = Z(l);
    return Mr(o, 0), o;
  }, a = r(t), n = function() {
    a && (a.length > a.l && (a = a.slice(0, a.l), a.l = a.length), a.length > 0 && e.push(a), a = null);
  }, i = function(l) {
    return a && l < a.length - a.l ? a : (n(), a = r(Math.max(l + 1, t)));
  }, s = function() {
    return n(), Dr(e);
  }, f = function(l) {
    n(), a = l, a.l == null && (a.l = a.length), i(t);
  };
  return { next: i, push: f, end: s, _bufs: e };
}
function ee(e, t, r, a) {
  var n = +t, i;
  if (!isNaN(n)) {
    a || (a = Mn[n].p || (r || []).length || 0), i = 1 + (n >= 128 ? 1 : 0) + 1, a >= 128 && ++i, a >= 16384 && ++i, a >= 2097152 && ++i;
    var s = e.next(i);
    n <= 127 ? s.write_shift(1, n) : (s.write_shift(1, (n & 127) + 128), s.write_shift(1, n >> 7));
    for (var f = 0; f != 4; ++f)
      if (a >= 128)
        s.write_shift(1, (a & 127) + 128), a >>= 7;
      else {
        s.write_shift(1, a);
        break;
      }
    /*:: length != null &&*/
    a > 0 && Ni(r) && e.push(r);
  }
}
function wn(e, t, r) {
  var a = ir(e);
  if (t.s ? (a.cRel && (a.c += t.s.c), a.rRel && (a.r += t.s.r)) : (a.cRel && (a.c += t.c), a.rRel && (a.r += t.r)), !r || r.biff < 12) {
    for (; a.c >= 256; ) a.c -= 256;
    for (; a.r >= 65536; ) a.r -= 65536;
  }
  return a;
}
function Xs(e, t, r) {
  var a = ir(e);
  return a.s = wn(a.s, t.s, r), a.e = wn(a.e, t.s, r), a;
}
function kn(e, t) {
  if (e.cRel && e.c < 0)
    for (e = ir(e); e.c < 0; ) e.c += t > 8 ? 16384 : 256;
  if (e.rRel && e.r < 0)
    for (e = ir(e); e.r < 0; ) e.r += t > 8 ? 1048576 : t > 5 ? 65536 : 16384;
  var r = Ce(e);
  return !e.cRel && e.cRel != null && (r = ru(r)), !e.rRel && e.rRel != null && (r = Qo(r)), r;
}
function J0(e, t) {
  return e.s.r == 0 && !e.s.rRel && e.e.r == (t.biff >= 12 ? 1048575 : t.biff >= 8 ? 65536 : 16384) && !e.e.rRel ? (e.s.cRel ? "" : "$") + ur(e.s.c) + ":" + (e.e.cRel ? "" : "$") + ur(e.e.c) : e.s.c == 0 && !e.s.cRel && e.e.c == (t.biff >= 12 ? 16383 : 255) && !e.e.cRel ? (e.s.rRel ? "" : "$") + wr(e.s.r) + ":" + (e.e.rRel ? "" : "$") + wr(e.e.r) : kn(e.s, t.biff) + ":" + kn(e.e, t.biff);
}
function Ri(e) {
  return parseInt(eu(e), 10) - 1;
}
function wr(e) {
  return "" + (e + 1);
}
function Qo(e) {
  return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2");
}
function eu(e) {
  return e.replace(/\$(\d+)$/, "$1");
}
function Li(e) {
  for (var t = tu(e), r = 0, a = 0; a !== t.length; ++a) r = 26 * r + t.charCodeAt(a) - 64;
  return r - 1;
}
function ur(e) {
  if (e < 0) throw new Error("invalid column " + e);
  var t = "";
  for (++e; e; e = Math.floor((e - 1) / 26)) t = String.fromCharCode((e - 1) % 26 + 65) + t;
  return t;
}
function ru(e) {
  return e.replace(/^([A-Z])/, "$$$1");
}
function tu(e) {
  return e.replace(/^\$([A-Z])/, "$1");
}
function au(e) {
  return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",");
}
function hr(e) {
  for (var t = 0, r = 0, a = 0; a < e.length; ++a) {
    var n = e.charCodeAt(a);
    n >= 48 && n <= 57 ? t = 10 * t + (n - 48) : n >= 65 && n <= 90 && (r = 26 * r + (n - 64));
  }
  return { c: r - 1, r: t - 1 };
}
function Ce(e) {
  for (var t = e.c + 1, r = ""; t; t = (t - 1) / 26 | 0) r = String.fromCharCode((t - 1) % 26 + 65) + r;
  return r + (e.r + 1);
}
function st(e) {
  var t = e.indexOf(":");
  return t == -1 ? { s: hr(e), e: hr(e) } : { s: hr(e.slice(0, t)), e: hr(e.slice(t + 1)) };
}
function Ne(e, t) {
  return typeof t > "u" || typeof t == "number" ? Ne(e.s, e.e) : (typeof e != "string" && (e = Ce(e)), typeof t != "string" && (t = Ce(t)), e == t ? e : e + ":" + t);
}
function $e(e) {
  var t = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } }, r = 0, a = 0, n = 0, i = e.length;
  for (r = 0; a < i && !((n = e.charCodeAt(a) - 64) < 1 || n > 26); ++a)
    r = 26 * r + n;
  for (t.s.c = --r, r = 0; a < i && !((n = e.charCodeAt(a) - 48) < 0 || n > 9); ++a)
    r = 10 * r + n;
  if (t.s.r = --r, a === i || n != 10)
    return t.e.c = t.s.c, t.e.r = t.s.r, t;
  for (++a, r = 0; a != i && !((n = e.charCodeAt(a) - 64) < 1 || n > 26); ++a)
    r = 26 * r + n;
  for (t.e.c = --r, r = 0; a != i && !((n = e.charCodeAt(a) - 48) < 0 || n > 9); ++a)
    r = 10 * r + n;
  return t.e.r = --r, t;
}
function zs(e, t) {
  var r = e.t == "d" && t instanceof Date;
  if (e.z != null) try {
    return e.w = Ft(e.z, r ? Ar(t) : t);
  } catch {
  }
  try {
    return e.w = Ft((e.XF || {}).numFmtId || (r ? 14 : 0), r ? Ar(t) : t);
  } catch {
    return "" + t;
  }
}
function Jt(e, t, r) {
  return e == null || e.t == null || e.t == "z" ? "" : e.w !== void 0 ? e.w : (e.t == "d" && !e.z && r && r.dateNF && (e.z = r.dateNF), e.t == "e" ? Qt[e.v] || e.v : t == null ? zs(e, e.v) : zs(e, t));
}
function ca(e, t) {
  var r = t && t.sheet ? t.sheet : "Sheet1", a = {};
  return a[r] = e, { SheetNames: [r], Sheets: a };
}
function oc(e, t, r) {
  var a = r || {}, n = e ? Array.isArray(e) : a.dense, i = e || (n ? [] : {}), s = 0, f = 0;
  if (i && a.origin != null) {
    if (typeof a.origin == "number") s = a.origin;
    else {
      var c = typeof a.origin == "string" ? hr(a.origin) : a.origin;
      s = c.r, f = c.c;
    }
    i["!ref"] || (i["!ref"] = "A1:A1");
  }
  var l = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } };
  if (i["!ref"]) {
    var o = $e(i["!ref"]);
    l.s.c = o.s.c, l.s.r = o.s.r, l.e.c = Math.max(l.e.c, o.e.c), l.e.r = Math.max(l.e.r, o.e.r), s == -1 && (l.e.r = s = o.e.r + 1);
  }
  for (var u = 0; u != t.length; ++u)
    if (t[u]) {
      if (!Array.isArray(t[u])) throw new Error("aoa_to_sheet expects an array of arrays");
      for (var x = 0; x != t[u].length; ++x)
        if (!(typeof t[u][x] > "u")) {
          var d = { v: t[u][x] }, v = s + u, h = f + x;
          if (l.s.r > v && (l.s.r = v), l.s.c > h && (l.s.c = h), l.e.r < v && (l.e.r = v), l.e.c < h && (l.e.c = h), t[u][x] && typeof t[u][x] == "object" && !Array.isArray(t[u][x]) && !(t[u][x] instanceof Date)) d = t[u][x];
          else if (Array.isArray(d.v) && (d.f = t[u][x][1], d.v = d.v[0]), d.v === null)
            if (d.f) d.t = "n";
            else if (a.nullError)
              d.t = "e", d.v = 0;
            else if (a.sheetStubs) d.t = "z";
            else continue;
          else typeof d.v == "number" ? d.t = "n" : typeof d.v == "boolean" ? d.t = "b" : d.v instanceof Date ? (d.z = a.dateNF || Fe[14], a.cellDates ? (d.t = "d", d.w = Ft(d.z, Ar(d.v))) : (d.t = "n", d.v = Ar(d.v), d.w = Ft(d.z, d.v))) : d.t = "s";
          if (n)
            i[v] || (i[v] = []), i[v][h] && i[v][h].z && (d.z = i[v][h].z), i[v][h] = d;
          else {
            var g = Ce({ c: h, r: v });
            i[g] && i[g].z && (d.z = i[g].z), i[g] = d;
          }
        }
    }
  return l.s.c < 1e7 && (i["!ref"] = Ne(l)), i;
}
function sn(e, t) {
  return oc(null, e, t);
}
function nu(e) {
  return e.read_shift(4, "i");
}
function Pt(e, t) {
  return t || (t = Z(4)), t.write_shift(4, e), t;
}
function Kr(e) {
  var t = e.read_shift(4);
  return t === 0 ? "" : e.read_shift(t, "dbcs");
}
function Ir(e, t) {
  var r = !1;
  return t == null && (r = !0, t = Z(4 + 2 * e.length)), t.write_shift(4, e.length), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
function iu(e) {
  return { ich: e.read_shift(2), ifnt: e.read_shift(2) };
}
function su(e, t) {
  return t || (t = Z(4)), t.write_shift(2, 0), t.write_shift(2, 0), t;
}
function Pi(e, t) {
  var r = e.l, a = e.read_shift(1), n = Kr(e), i = [], s = { t: n, h: n };
  if (a & 1) {
    for (var f = e.read_shift(4), c = 0; c != f; ++c) i.push(iu(e));
    s.r = i;
  } else s.r = [{ ich: 0, ifnt: 0 }];
  return e.l = r + t, s;
}
function fu(e, t) {
  var r = !1;
  return t == null && (r = !0, t = Z(15 + 4 * e.t.length)), t.write_shift(1, 0), Ir(e.t, t), r ? t.slice(0, t.l) : t;
}
var cu = Pi;
function lu(e, t) {
  var r = !1;
  return t == null && (r = !0, t = Z(23 + 4 * e.t.length)), t.write_shift(1, 1), Ir(e.t, t), t.write_shift(4, 1), su({}, t), r ? t.slice(0, t.l) : t;
}
function At(e) {
  var t = e.read_shift(4), r = e.read_shift(2);
  return r += e.read_shift(1) << 16, e.l++, { c: t, iStyleRef: r };
}
function Da(e, t) {
  return t == null && (t = Z(8)), t.write_shift(-4, e.c), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
function Ia(e) {
  var t = e.read_shift(2);
  return t += e.read_shift(1) << 16, e.l++, { c: -1, iStyleRef: t };
}
function Oa(e, t) {
  return t == null && (t = Z(4)), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
var ou = Kr, uc = Ir;
function Bi(e) {
  var t = e.read_shift(4);
  return t === 0 || t === 4294967295 ? "" : e.read_shift(t, "dbcs");
}
function v0(e, t) {
  var r = !1;
  return t == null && (r = !0, t = Z(127)), t.write_shift(4, e.length > 0 ? e.length : 4294967295), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
var uu = Kr, li = Bi, Mi = v0;
function Ui(e) {
  var t = e.slice(e.l, e.l + 4), r = t[0] & 1, a = t[0] & 2;
  e.l += 4;
  var n = a === 0 ? p0([0, 0, 0, 0, t[0] & 252, t[1], t[2], t[3]], 0) : ma(t, 0) >> 2;
  return r ? n / 100 : n;
}
function hc(e, t) {
  t == null && (t = Z(4));
  var r = 0, a = 0, n = e * 100;
  if (e == (e | 0) && e >= -536870912 && e < 1 << 29 ? a = 1 : n == (n | 0) && n >= -536870912 && n < 1 << 29 && (a = 1, r = 1), a) t.write_shift(-4, ((r ? n : e) << 2) + (r + 2));
  else throw new Error("unsupported RkNumber " + e);
}
function xc(e) {
  var t = { s: {}, e: {} };
  return t.s.r = e.read_shift(4), t.e.r = e.read_shift(4), t.s.c = e.read_shift(4), t.e.c = e.read_shift(4), t;
}
function hu(e, t) {
  return t || (t = Z(16)), t.write_shift(4, e.s.r), t.write_shift(4, e.e.r), t.write_shift(4, e.s.c), t.write_shift(4, e.e.c), t;
}
var Na = xc, fn = hu;
function jr(e) {
  if (e.length - e.l < 8) throw "XLS Xnum Buffer underflow";
  return e.read_shift(8, "f");
}
function Sa(e, t) {
  return (t || Z(8)).write_shift(8, e, "f");
}
function xu(e) {
  var t = {}, r = e.read_shift(1), a = r >>> 1, n = e.read_shift(1), i = e.read_shift(2, "i"), s = e.read_shift(1), f = e.read_shift(1), c = e.read_shift(1);
  switch (e.l++, a) {
    case 0:
      t.auto = 1;
      break;
    case 1:
      t.index = n;
      var l = _a[n];
      l && (t.rgb = Rn(l));
      break;
    case 2:
      t.rgb = Rn([s, f, c]);
      break;
    case 3:
      t.theme = n;
      break;
  }
  return i != 0 && (t.tint = i > 0 ? i / 32767 : i / 32768), t;
}
function m0(e, t) {
  if (t || (t = Z(8)), !e || e.auto)
    return t.write_shift(4, 0), t.write_shift(4, 0), t;
  e.index != null ? (t.write_shift(1, 2), t.write_shift(1, e.index)) : e.theme != null ? (t.write_shift(1, 6), t.write_shift(1, e.theme)) : (t.write_shift(1, 5), t.write_shift(1, 0));
  var r = e.tint || 0;
  if (r > 0 ? r *= 32767 : r < 0 && (r *= 32768), t.write_shift(2, r), !e.rgb || e.theme != null)
    t.write_shift(2, 0), t.write_shift(1, 0), t.write_shift(1, 0);
  else {
    var a = e.rgb || "FFFFFF";
    typeof a == "number" && (a = ("000000" + a.toString(16)).slice(-6)), t.write_shift(1, parseInt(a.slice(0, 2), 16)), t.write_shift(1, parseInt(a.slice(2, 4), 16)), t.write_shift(1, parseInt(a.slice(4, 6), 16)), t.write_shift(1, 255);
  }
  return t;
}
function du(e) {
  var t = e.read_shift(1);
  e.l++;
  var r = {
    fBold: t & 1,
    fItalic: t & 2,
    fUnderline: t & 4,
    fStrikeout: t & 8,
    fOutline: t & 16,
    fShadow: t & 32,
    fCondense: t & 64,
    fExtend: t & 128
  };
  return r;
}
function pu(e, t) {
  t || (t = Z(2));
  var r = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 : 0);
  return t.write_shift(1, r), t.write_shift(1, 0), t;
}
function dc(e, t) {
  var r = { 2: "BITMAP", 3: "METAFILEPICT", 8: "DIB", 14: "ENHMETAFILE" }, a = e.read_shift(4);
  switch (a) {
    case 0:
      return "";
    case 4294967295:
    case 4294967294:
      return r[e.read_shift(4)] || "";
  }
  if (a > 400) throw new Error("Unsupported Clipboard: " + a.toString(16));
  return e.l -= 4, e.read_shift(0, t == 1 ? "lpstr" : "lpwstr");
}
function vu(e) {
  return dc(e, 1);
}
function mu(e) {
  return dc(e, 2);
}
var Wi = 2, nt = 3, r0 = 11, Gs = 12, g0 = 19, t0 = 64, gu = 65, _u = 71, wu = 4108, ku = 4126, br = 80, pc = 81, Eu = [br, pc], oi = {
  /*::[*/
  1: { n: "CodePage", t: Wi },
  /*::[*/
  2: { n: "Category", t: br },
  /*::[*/
  3: { n: "PresentationFormat", t: br },
  /*::[*/
  4: { n: "ByteCount", t: nt },
  /*::[*/
  5: { n: "LineCount", t: nt },
  /*::[*/
  6: { n: "ParagraphCount", t: nt },
  /*::[*/
  7: { n: "SlideCount", t: nt },
  /*::[*/
  8: { n: "NoteCount", t: nt },
  /*::[*/
  9: { n: "HiddenCount", t: nt },
  /*::[*/
  10: { n: "MultimediaClipCount", t: nt },
  /*::[*/
  11: { n: "ScaleCrop", t: r0 },
  /*::[*/
  12: {
    n: "HeadingPairs",
    t: wu
    /* VT_VECTOR | VT_VARIANT */
  },
  /*::[*/
  13: {
    n: "TitlesOfParts",
    t: ku
    /* VT_VECTOR | VT_LPSTR */
  },
  /*::[*/
  14: { n: "Manager", t: br },
  /*::[*/
  15: { n: "Company", t: br },
  /*::[*/
  16: { n: "LinksUpToDate", t: r0 },
  /*::[*/
  17: { n: "CharacterCount", t: nt },
  /*::[*/
  19: { n: "SharedDoc", t: r0 },
  /*::[*/
  22: { n: "HyperlinksChanged", t: r0 },
  /*::[*/
  23: { n: "AppVersion", t: nt, p: "version" },
  /*::[*/
  24: { n: "DigSig", t: gu },
  /*::[*/
  26: { n: "ContentType", t: br },
  /*::[*/
  27: { n: "ContentStatus", t: br },
  /*::[*/
  28: { n: "Language", t: br },
  /*::[*/
  29: { n: "Version", t: br },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: g0 },
  /*::[*/
  2147483651: { n: "Behavior", t: g0 },
  /*::[*/
  1919054434: {}
}, ui = {
  /*::[*/
  1: { n: "CodePage", t: Wi },
  /*::[*/
  2: { n: "Title", t: br },
  /*::[*/
  3: { n: "Subject", t: br },
  /*::[*/
  4: { n: "Author", t: br },
  /*::[*/
  5: { n: "Keywords", t: br },
  /*::[*/
  6: { n: "Comments", t: br },
  /*::[*/
  7: { n: "Template", t: br },
  /*::[*/
  8: { n: "LastAuthor", t: br },
  /*::[*/
  9: { n: "RevNumber", t: br },
  /*::[*/
  10: { n: "EditTime", t: t0 },
  /*::[*/
  11: { n: "LastPrinted", t: t0 },
  /*::[*/
  12: { n: "CreatedDate", t: t0 },
  /*::[*/
  13: { n: "ModifiedDate", t: t0 },
  /*::[*/
  14: { n: "PageCount", t: nt },
  /*::[*/
  15: { n: "WordCount", t: nt },
  /*::[*/
  16: { n: "CharCount", t: nt },
  /*::[*/
  17: { n: "Thumbnail", t: _u },
  /*::[*/
  18: { n: "Application", t: br },
  /*::[*/
  19: { n: "DocSecurity", t: nt },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: g0 },
  /*::[*/
  2147483651: { n: "Behavior", t: g0 },
  /*::[*/
  1919054434: {}
}, $s = {
  /*::[*/
  1: "US",
  // United States
  /*::[*/
  2: "CA",
  // Canada
  /*::[*/
  3: "",
  // Latin America (except Brazil)
  /*::[*/
  7: "RU",
  // Russia
  /*::[*/
  20: "EG",
  // Egypt
  /*::[*/
  30: "GR",
  // Greece
  /*::[*/
  31: "NL",
  // Netherlands
  /*::[*/
  32: "BE",
  // Belgium
  /*::[*/
  33: "FR",
  // France
  /*::[*/
  34: "ES",
  // Spain
  /*::[*/
  36: "HU",
  // Hungary
  /*::[*/
  39: "IT",
  // Italy
  /*::[*/
  41: "CH",
  // Switzerland
  /*::[*/
  43: "AT",
  // Austria
  /*::[*/
  44: "GB",
  // United Kingdom
  /*::[*/
  45: "DK",
  // Denmark
  /*::[*/
  46: "SE",
  // Sweden
  /*::[*/
  47: "NO",
  // Norway
  /*::[*/
  48: "PL",
  // Poland
  /*::[*/
  49: "DE",
  // Germany
  /*::[*/
  52: "MX",
  // Mexico
  /*::[*/
  55: "BR",
  // Brazil
  /*::[*/
  61: "AU",
  // Australia
  /*::[*/
  64: "NZ",
  // New Zealand
  /*::[*/
  66: "TH",
  // Thailand
  /*::[*/
  81: "JP",
  // Japan
  /*::[*/
  82: "KR",
  // Korea
  /*::[*/
  84: "VN",
  // Viet Nam
  /*::[*/
  86: "CN",
  // China
  /*::[*/
  90: "TR",
  // Turkey
  /*::[*/
  105: "JS",
  // Ramastan
  /*::[*/
  213: "DZ",
  // Algeria
  /*::[*/
  216: "MA",
  // Morocco
  /*::[*/
  218: "LY",
  // Libya
  /*::[*/
  351: "PT",
  // Portugal
  /*::[*/
  354: "IS",
  // Iceland
  /*::[*/
  358: "FI",
  // Finland
  /*::[*/
  420: "CZ",
  // Czech Republic
  /*::[*/
  886: "TW",
  // Taiwan
  /*::[*/
  961: "LB",
  // Lebanon
  /*::[*/
  962: "JO",
  // Jordan
  /*::[*/
  963: "SY",
  // Syria
  /*::[*/
  964: "IQ",
  // Iraq
  /*::[*/
  965: "KW",
  // Kuwait
  /*::[*/
  966: "SA",
  // Saudi Arabia
  /*::[*/
  971: "AE",
  // United Arab Emirates
  /*::[*/
  972: "IL",
  // Israel
  /*::[*/
  974: "QA",
  // Qatar
  /*::[*/
  981: "IR",
  // Iran
  /*::[*/
  65535: "US"
  // United States
}, Tu = [
  null,
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
];
function yu(e) {
  return e.map(function(t) {
    return [t >> 16 & 255, t >> 8 & 255, t & 255];
  });
}
var Su = /* @__PURE__ */ yu([
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
]), _a = /* @__PURE__ */ ir(Su), Qt = {
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
}, vc = {
  "#NULL!": 0,
  "#DIV/0!": 7,
  "#VALUE!": 15,
  "#REF!": 23,
  "#NAME?": 29,
  "#NUM!": 36,
  "#N/A": 42,
  "#GETTING_DATA": 43,
  "#WTF?": 255
}, hi = {
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
}, a0 = {
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
function Fu(e) {
  var t = Vi();
  if (!e || !e.match) return t;
  var r = {};
  if ((e.match(Jr) || []).forEach(function(a) {
    var n = be(a);
    switch (n[0].replace(Po, "<")) {
      case "<?xml":
        break;
      case "<Types":
        t.xmlns = n["xmlns" + (n[0].match(/<(\w+):/) || ["", ""])[1]];
        break;
      case "<Default":
        r[n.Extension] = n.ContentType;
        break;
      case "<Override":
        t[hi[n.ContentType]] !== void 0 && t[hi[n.ContentType]].push(n.PartName);
        break;
    }
  }), t.xmlns !== Fr.CT) throw new Error("Unknown Namespace: " + t.xmlns);
  return t.calcchain = t.calcchains.length > 0 ? t.calcchains[0] : "", t.sst = t.strs.length > 0 ? t.strs[0] : "", t.style = t.styles.length > 0 ? t.styles[0] : "", t.defaults = r, delete t.calcchains, t;
}
function mc(e, t) {
  var r = Fo(hi), a = [], n;
  a[a.length] = kr, a[a.length] = oe("Types", null, {
    xmlns: Fr.CT,
    "xmlns:xsd": Fr.xsd,
    "xmlns:xsi": Fr.xsi
  }), a = a.concat([
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
  ].map(function(c) {
    return oe("Default", null, { Extension: c[0], ContentType: c[1] });
  }));
  var i = function(c) {
    e[c] && e[c].length > 0 && (n = e[c][0], a[a.length] = oe("Override", null, {
      PartName: (n[0] == "/" ? "" : "/") + n,
      ContentType: a0[c][t.bookType] || a0[c].xlsx
    }));
  }, s = function(c) {
    (e[c] || []).forEach(function(l) {
      a[a.length] = oe("Override", null, {
        PartName: (l[0] == "/" ? "" : "/") + l,
        ContentType: a0[c][t.bookType] || a0[c].xlsx
      });
    });
  }, f = function(c) {
    (e[c] || []).forEach(function(l) {
      a[a.length] = oe("Override", null, {
        PartName: (l[0] == "/" ? "" : "/") + l,
        ContentType: r[c][0]
      });
    });
  };
  return i("workbooks"), s("sheets"), s("charts"), f("themes"), ["strs", "styles"].forEach(i), ["coreprops", "extprops", "custprops"].forEach(f), f("vba"), f("comments"), f("threadedcomments"), f("drawings"), s("metadata"), f("people"), a.length > 2 && (a[a.length] = "</Types>", a[1] = a[1].replace("/>", ">")), a.join("");
}
var Ve = {
  WB: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
  SHEET: "http://sheetjs.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
  HLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
  VML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing",
  XPATH: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLinkPath",
  XMISS: "http://schemas.microsoft.com/office/2006/relationships/xlExternalLinkPath/xlPathMissing",
  XLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLink",
  CXML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml",
  CXMLP: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps",
  CMNT: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments",
  CORE_PROPS: "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties",
  EXT_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties",
  CUST_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties",
  SST: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",
  STY: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
  THEME: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme",
  CHART: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart",
  CHARTEX: "http://schemas.microsoft.com/office/2014/relationships/chartEx",
  CS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartsheet",
  WS: [
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
    "http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet"
  ],
  DS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/dialogsheet",
  MS: "http://schemas.microsoft.com/office/2006/relationships/xlMacrosheet",
  IMG: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
  DRAW: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing",
  XLMETA: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sheetMetadata",
  TCMNT: "http://schemas.microsoft.com/office/2017/10/relationships/threadedComment",
  PEOPLE: "http://schemas.microsoft.com/office/2017/10/relationships/person",
  VBA: "http://schemas.microsoft.com/office/2006/relationships/vbaProject"
};
function Nn(e) {
  var t = e.lastIndexOf("/");
  return e.slice(0, t + 1) + "_rels/" + e.slice(t + 1) + ".rels";
}
function En(e, t) {
  var r = { "!id": {} };
  if (!e) return r;
  t.charAt(0) !== "/" && (t = "/" + t);
  var a = {};
  return (e.match(Jr) || []).forEach(function(n) {
    var i = be(n);
    if (i[0] === "<Relationship") {
      var s = {};
      s.Type = i.Type, s.Target = i.Target, s.Id = i.Id, i.TargetMode && (s.TargetMode = i.TargetMode);
      var f = i.TargetMode === "External" ? i.Target : gn(i.Target, t);
      r[f] = s, a[i.Id] = s;
    }
  }), r["!id"] = a, r;
}
function qa(e) {
  var t = [kr, oe("Relationships", null, {
    //'xmlns:ns0': XMLNS.RELS,
    xmlns: Fr.RELS
  })];
  return gr(e["!id"]).forEach(function(r) {
    t[t.length] = oe("Relationship", null, e["!id"][r]);
  }), t.length > 2 && (t[t.length] = "</Relationships>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function Qe(e, t, r, a, n, i) {
  if (n || (n = {}), e["!id"] || (e["!id"] = {}), e["!idx"] || (e["!idx"] = 1), t < 0) for (t = e["!idx"]; e["!id"]["rId" + t]; ++t)
    ;
  if (e["!idx"] = t + 1, n.Id = "rId" + t, n.Type = a, n.Target = r, [Ve.HLINK, Ve.XPATH, Ve.XMISS].indexOf(n.Type) > -1 && (n.TargetMode = "External"), e["!id"][n.Id]) throw new Error("Cannot rewrite rId " + t);
  return e["!id"][n.Id] = n, e[("/" + n.Target).replace("//", "/")] = n, t;
}
var Au = "application/vnd.oasis.opendocument.spreadsheet";
function Cu(e, t) {
  for (var r = Ii(e), a, n; a = On.exec(r); ) switch (a[3]) {
    case "manifest":
      break;
    case "file-entry":
      if (n = be(a[0], !1), n.path == "/" && n.type !== Au) throw new Error("This OpenDocument is not a spreadsheet");
      break;
    case "encryption-data":
    case "algorithm":
    case "start-key-generation":
    case "key-derivation":
      throw new Error("Unsupported ODS Encryption");
    default:
      if (t && t.WTF) throw a;
  }
}
function bu(e) {
  var t = [kr];
  t.push(`<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
`), t.push(`  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
`);
  for (var r = 0; r < e.length; ++r) t.push('  <manifest:file-entry manifest:full-path="' + e[r][0] + '" manifest:media-type="' + e[r][1] + `"/>
`);
  return t.push("</manifest:manifest>"), t.join("");
}
function js(e, t, r) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (r || "odf") + "#" + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function Du(e, t) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function Iu(e) {
  var t = [kr];
  t.push(`<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
`);
  for (var r = 0; r != e.length; ++r)
    t.push(js(e[r][0], e[r][1])), t.push(Du("", e[r][0]));
  return t.push(js("", "Document", "pkg")), t.push("</rdf:RDF>"), t.join("");
}
function gc() {
  return '<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS ' + o0.version + "</meta:generator></office:meta></office:document-meta>";
}
var St = [
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
], Ou = /* @__PURE__ */ function() {
  for (var e = new Array(St.length), t = 0; t < St.length; ++t) {
    var r = St[t], a = "(?:" + r[0].slice(0, r[0].indexOf(":")) + ":)" + r[0].slice(r[0].indexOf(":") + 1);
    e[t] = new RegExp("<" + a + "[^>]*>([\\s\\S]*?)</" + a + ">");
  }
  return e;
}();
function _c(e) {
  var t = {};
  e = tr(e);
  for (var r = 0; r < St.length; ++r) {
    var a = St[r], n = e.match(Ou[r]);
    n != null && n.length > 0 && (t[a[1]] = Ge(n[1])), a[2] === "date" && t[a[1]] && (t[a[1]] = nr(t[a[1]]));
  }
  return t;
}
function q0(e, t, r, a, n) {
  n[e] != null || t == null || t === "" || (n[e] = t, t = er(t), a[a.length] = r ? oe(e, t, r) : Ur(e, t));
}
function wc(e, t) {
  var r = t || {}, a = [kr, oe("cp:coreProperties", null, {
    //'xmlns': XMLNS.CORE_PROPS,
    "xmlns:cp": Fr.CORE_PROPS,
    "xmlns:dc": Fr.dc,
    "xmlns:dcterms": Fr.dcterms,
    "xmlns:dcmitype": Fr.dcmitype,
    "xmlns:xsi": Fr.xsi
  })], n = {};
  if (!e && !r.Props) return a.join("");
  e && (e.CreatedDate != null && q0("dcterms:created", typeof e.CreatedDate == "string" ? e.CreatedDate : ci(e.CreatedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, a, n), e.ModifiedDate != null && q0("dcterms:modified", typeof e.ModifiedDate == "string" ? e.ModifiedDate : ci(e.ModifiedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, a, n));
  for (var i = 0; i != St.length; ++i) {
    var s = St[i], f = r.Props && r.Props[s[1]] != null ? r.Props[s[1]] : e ? e[s[1]] : null;
    f === !0 ? f = "1" : f === !1 ? f = "0" : typeof f == "number" && (f = String(f)), f != null && q0(s[0], f, null, a, n);
  }
  return a.length > 2 && (a[a.length] = "</cp:coreProperties>", a[1] = a[1].replace("/>", ">")), a.join("");
}
var wa = [
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
], kc = [
  "Worksheets",
  "SheetNames",
  "NamedRanges",
  "DefinedNames",
  "Chartsheets",
  "ChartNames"
];
function Ec(e, t, r, a) {
  var n = [];
  if (typeof e == "string") n = Bs(e, a);
  else for (var i = 0; i < e.length; ++i) n = n.concat(e[i].map(function(o) {
    return { v: o };
  }));
  var s = typeof t == "string" ? Bs(t, a).map(function(o) {
    return o.v;
  }) : t, f = 0, c = 0;
  if (s.length > 0) for (var l = 0; l !== n.length; l += 2) {
    switch (c = +n[l + 1].v, n[l].v) {
      case "Worksheets":
      case "工作表":
      case "Листы":
      case "أوراق العمل":
      case "ワークシート":
      case "גליונות עבודה":
      case "Arbeitsblätter":
      case "Çalışma Sayfaları":
      case "Feuilles de calcul":
      case "Fogli di lavoro":
      case "Folhas de cálculo":
      case "Planilhas":
      case "Regneark":
      case "Hojas de cálculo":
      case "Werkbladen":
        r.Worksheets = c, r.SheetNames = s.slice(f, f + c);
        break;
      case "Named Ranges":
      case "Rangos con nombre":
      case "名前付き一覧":
      case "Benannte Bereiche":
      case "Navngivne områder":
        r.NamedRanges = c, r.DefinedNames = s.slice(f, f + c);
        break;
      case "Charts":
      case "Diagramme":
        r.Chartsheets = c, r.ChartNames = s.slice(f, f + c);
        break;
    }
    f += c;
  }
}
function Nu(e, t, r) {
  var a = {};
  return t || (t = {}), e = tr(e), wa.forEach(function(n) {
    var i = (e.match(Dn(n[0])) || [])[1];
    switch (n[2]) {
      case "string":
        i && (t[n[1]] = Ge(i));
        break;
      case "bool":
        t[n[1]] = i === "true";
        break;
      case "raw":
        var s = e.match(new RegExp("<" + n[0] + "[^>]*>([\\s\\S]*?)</" + n[0] + ">"));
        s && s.length > 0 && (a[n[1]] = s[1]);
        break;
    }
  }), a.HeadingPairs && a.TitlesOfParts && Ec(a.HeadingPairs, a.TitlesOfParts, t, r), t;
}
function Tc(e) {
  var t = [], r = oe;
  return e || (e = {}), e.Application = "SheetJS", t[t.length] = kr, t[t.length] = oe("Properties", null, {
    xmlns: Fr.EXT_PROPS,
    "xmlns:vt": Fr.vt
  }), wa.forEach(function(a) {
    if (e[a[1]] !== void 0) {
      var n;
      switch (a[2]) {
        case "string":
          n = er(String(e[a[1]]));
          break;
        case "bool":
          n = e[a[1]] ? "true" : "false";
          break;
      }
      n !== void 0 && (t[t.length] = r(a[0], n));
    }
  }), t[t.length] = r("HeadingPairs", r("vt:vector", r("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + r("vt:variant", r("vt:i4", String(e.Worksheets))), { size: 2, baseType: "variant" })), t[t.length] = r("TitlesOfParts", r("vt:vector", e.SheetNames.map(function(a) {
    return "<vt:lpstr>" + er(a) + "</vt:lpstr>";
  }).join(""), { size: e.Worksheets, baseType: "lpstr" })), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
var Ru = /<[^>]+>[^<]*/g;
function Lu(e, t) {
  var r = {}, a = "", n = e.match(Ru);
  if (n) for (var i = 0; i != n.length; ++i) {
    var s = n[i], f = be(s);
    switch (f[0]) {
      case "<?xml":
        break;
      case "<Properties":
        break;
      case "<property":
        a = Ge(f.name);
        break;
      case "</property>":
        a = null;
        break;
      default:
        if (s.indexOf("<vt:") === 0) {
          var c = s.split(">"), l = c[0].slice(4), o = c[1];
          switch (l) {
            case "lpstr":
            case "bstr":
            case "lpwstr":
              r[a] = Ge(o);
              break;
            case "bool":
              r[a] = ar(o);
              break;
            case "i1":
            case "i2":
            case "i4":
            case "i8":
            case "int":
            case "uint":
              r[a] = parseInt(o, 10);
              break;
            case "r4":
            case "r8":
            case "decimal":
              r[a] = parseFloat(o);
              break;
            case "filetime":
            case "date":
              r[a] = nr(o);
              break;
            case "cy":
            case "error":
              r[a] = Ge(o);
              break;
            default:
              if (l.slice(-1) == "/") break;
              t.WTF && typeof console < "u" && console.warn("Unexpected", s, l, c);
          }
        } else if (s.slice(0, 2) !== "</") {
          if (t.WTF) throw new Error(s);
        }
    }
  }
  return r;
}
function yc(e) {
  var t = [kr, oe("Properties", null, {
    xmlns: Fr.CUST_PROPS,
    "xmlns:vt": Fr.vt
  })];
  if (!e) return t.join("");
  var r = 1;
  return gr(e).forEach(function(n) {
    ++r, t[t.length] = oe("property", zo(e[n]), {
      fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: r,
      name: er(n)
    });
  }), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
var xi = {
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
}, Z0;
function Pu(e, t, r) {
  Z0 || (Z0 = S0(xi)), t = Z0[t] || t, e[t] = r;
}
function Bu(e, t) {
  var r = [];
  return gr(xi).map(function(a) {
    for (var n = 0; n < St.length; ++n) if (St[n][1] == a) return St[n];
    for (n = 0; n < wa.length; ++n) if (wa[n][1] == a) return wa[n];
    throw a;
  }).forEach(function(a) {
    if (e[a[1]] != null) {
      var n = t && t.Props && t.Props[a[1]] != null ? t.Props[a[1]] : e[a[1]];
      switch (a[2]) {
        case "date":
          n = new Date(n).toISOString().replace(/\.\d*Z/, "Z");
          break;
      }
      typeof n == "number" ? n = String(n) : n === !0 || n === !1 ? n = n ? "1" : "0" : n instanceof Date && (n = new Date(n).toISOString().replace(/\.\d*Z/, "")), r.push(Ur(xi[a[1]] || a[1], n));
    }
  }), oe("DocumentProperties", r.join(""), { xmlns: lt.o });
}
function Mu(e, t) {
  var r = ["Worksheets", "SheetNames"], a = "CustomDocumentProperties", n = [];
  return e && gr(e).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(e, i)) {
      for (var s = 0; s < St.length; ++s) if (i == St[s][1]) return;
      for (s = 0; s < wa.length; ++s) if (i == wa[s][1]) return;
      for (s = 0; s < r.length; ++s) if (i == r[s]) return;
      var f = e[i], c = "string";
      typeof f == "number" ? (c = "float", f = String(f)) : f === !0 || f === !1 ? (c = "boolean", f = f ? "1" : "0") : f = String(f), n.push(oe(Ns(i), f, { "dt:dt": c }));
    }
  }), t && gr(t).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(t, i) && !(e && Object.prototype.hasOwnProperty.call(e, i))) {
      var s = t[i], f = "string";
      typeof s == "number" ? (f = "float", s = String(s)) : s === !0 || s === !1 ? (f = "boolean", s = s ? "1" : "0") : s instanceof Date ? (f = "dateTime.tz", s = s.toISOString()) : s = String(s), n.push(oe(Ns(i), s, { "dt:dt": f }));
    }
  }), "<" + a + ' xmlns="' + lt.o + '">' + n.join("") + "</" + a + ">";
}
function Hi(e) {
  var t = e.read_shift(4), r = e.read_shift(4);
  return new Date((r / 1e7 * Math.pow(2, 32) + t / 1e7 - 11644473600) * 1e3).toISOString().replace(/\.000/, "");
}
function Uu(e) {
  var t = typeof e == "string" ? new Date(Date.parse(e)) : e, r = t.getTime() / 1e3 + 11644473600, a = r % Math.pow(2, 32), n = (r - a) / Math.pow(2, 32);
  a *= 1e7, n *= 1e7;
  var i = a / Math.pow(2, 32) | 0;
  i > 0 && (a = a % Math.pow(2, 32), n += i);
  var s = Z(8);
  return s.write_shift(4, a), s.write_shift(4, n), s;
}
function Sc(e, t, r) {
  var a = e.l, n = e.read_shift(0, "lpstr-cp");
  if (r) for (; e.l - a & 3; ) ++e.l;
  return n;
}
function Fc(e, t, r) {
  var a = e.read_shift(0, "lpwstr");
  return a;
}
function Ac(e, t, r) {
  return t === 31 ? Fc(e) : Sc(e, t, r);
}
function di(e, t, r) {
  return Ac(e, t, r === !1 ? 0 : 4);
}
function Wu(e, t) {
  if (!t) throw new Error("VtUnalignedString must have positive length");
  return Ac(e, t, 0);
}
function Vu(e) {
  for (var t = e.read_shift(4), r = [], a = 0; a != t; ++a) {
    var n = e.l;
    r[a] = e.read_shift(0, "lpwstr").replace(rt, ""), e.l - n & 2 && (e.l += 2);
  }
  return r;
}
function Hu(e) {
  for (var t = e.read_shift(4), r = [], a = 0; a != t; ++a) r[a] = e.read_shift(0, "lpstr-cp").replace(rt, "");
  return r;
}
function Xu(e) {
  var t = e.l, r = _0(e, pc);
  e[e.l] == 0 && e[e.l + 1] == 0 && e.l - t & 2 && (e.l += 2);
  var a = _0(e, nt);
  return [r, a];
}
function zu(e) {
  for (var t = e.read_shift(4), r = [], a = 0; a < t / 2; ++a) r.push(Xu(e));
  return r;
}
function Ks(e, t) {
  for (var r = e.read_shift(4), a = {}, n = 0; n != r; ++n) {
    var i = e.read_shift(4), s = e.read_shift(4);
    a[i] = e.read_shift(s, t === 1200 ? "utf16le" : "utf8").replace(rt, "").replace(mn, "!"), t === 1200 && s % 2 && (e.l += 2);
  }
  return e.l & 3 && (e.l = e.l >> 3 << 2), a;
}
function Cc(e) {
  var t = e.read_shift(4), r = e.slice(e.l, e.l + t);
  return e.l += t, (t & 3) > 0 && (e.l += 4 - (t & 3) & 3), r;
}
function Gu(e) {
  var t = {};
  return t.Size = e.read_shift(4), e.l += t.Size + 3 - (t.Size - 1) % 4, t;
}
function _0(e, t, r) {
  var a = e.read_shift(2), n, i = r || {};
  if (e.l += 2, t !== Gs && a !== t && Eu.indexOf(t) === -1 && !((t & 65534) == 4126 && (a & 65534) == 4126))
    throw new Error("Expected type " + t + " saw " + a);
  switch (t === Gs ? a : t) {
    case 2:
      return n = e.read_shift(2, "i"), i.raw || (e.l += 2), n;
    case 3:
      return n = e.read_shift(4, "i"), n;
    case 11:
      return e.read_shift(4) !== 0;
    case 19:
      return n = e.read_shift(4), n;
    case 30:
      return Sc(e, a, 4).replace(rt, "");
    case 31:
      return Fc(e);
    case 64:
      return Hi(e);
    case 65:
      return Cc(e);
    case 71:
      return Gu(e);
    case 80:
      return di(e, a, !i.raw).replace(rt, "");
    case 81:
      return Wu(
        e,
        a
        /*, 4*/
      ).replace(rt, "");
    case 4108:
      return zu(e);
    case 4126:
    case 4127:
      return a == 4127 ? Vu(e) : Hu(e);
    default:
      throw new Error("TypedPropertyValue unrecognized type " + t + " " + a);
  }
}
function Ys(e, t) {
  var r = Z(4), a = Z(4);
  switch (r.write_shift(4, e == 80 ? 31 : e), e) {
    case 3:
      a.write_shift(-4, t);
      break;
    case 5:
      a = Z(8), a.write_shift(8, t, "f");
      break;
    case 11:
      a.write_shift(4, t ? 1 : 0);
      break;
    case 64:
      a = Uu(t);
      break;
    case 31:
    case 80:
      for (a = Z(4 + 2 * (t.length + 1) + (t.length % 2 ? 0 : 2)), a.write_shift(4, t.length + 1), a.write_shift(0, t, "dbcs"); a.l != a.length; ) a.write_shift(1, 0);
      break;
    default:
      throw new Error("TypedPropertyValue unrecognized type " + e + " " + t);
  }
  return Dr([r, a]);
}
function Js(e, t) {
  var r = e.l, a = e.read_shift(4), n = e.read_shift(4), i = [], s = 0, f = 0, c = -1, l = {};
  for (s = 0; s != n; ++s) {
    var o = e.read_shift(4), u = e.read_shift(4);
    i[s] = [o, u + r];
  }
  i.sort(function(A, k) {
    return A[1] - k[1];
  });
  var x = {};
  for (s = 0; s != n; ++s) {
    if (e.l !== i[s][1]) {
      var d = !0;
      if (s > 0 && t) switch (t[i[s - 1][0]].t) {
        case 2:
          e.l + 2 === i[s][1] && (e.l += 2, d = !1);
          break;
        case 80:
          e.l <= i[s][1] && (e.l = i[s][1], d = !1);
          break;
        case 4108:
          e.l <= i[s][1] && (e.l = i[s][1], d = !1);
          break;
      }
      if ((!t || s == 0) && e.l <= i[s][1] && (d = !1, e.l = i[s][1]), d) throw new Error("Read Error: Expected address " + i[s][1] + " at " + e.l + " :" + s);
    }
    if (t) {
      var v = t[i[s][0]];
      if (x[v.n] = _0(e, v.t, { raw: !0 }), v.p === "version" && (x[v.n] = String(x[v.n] >> 16) + "." + ("0000" + String(x[v.n] & 65535)).slice(-4)), v.n == "CodePage") switch (x[v.n]) {
        case 0:
          x[v.n] = 1252;
        case 874:
        case 932:
        case 936:
        case 949:
        case 950:
        case 1250:
        case 1251:
        case 1253:
        case 1254:
        case 1255:
        case 1256:
        case 1257:
        case 1258:
        case 1e4:
        case 1200:
        case 1201:
        case 1252:
        case 65e3:
        case -536:
        case 65001:
        case -535:
          Nt(f = x[v.n] >>> 0 & 65535);
          break;
        default:
          throw new Error("Unsupported CodePage: " + x[v.n]);
      }
    } else if (i[s][0] === 1) {
      if (f = x.CodePage = _0(e, Wi), Nt(f), c !== -1) {
        var h = e.l;
        e.l = i[c][1], l = Ks(e, f), e.l = h;
      }
    } else if (i[s][0] === 0) {
      if (f === 0) {
        c = s, e.l = i[s + 1][1];
        continue;
      }
      l = Ks(e, f);
    } else {
      var g = l[i[s][0]], T;
      switch (e[e.l]) {
        case 65:
          e.l += 4, T = Cc(e);
          break;
        case 30:
          e.l += 4, T = di(e, e[e.l - 4]).replace(/\u0000+$/, "");
          break;
        case 31:
          e.l += 4, T = di(e, e[e.l - 4]).replace(/\u0000+$/, "");
          break;
        case 3:
          e.l += 4, T = e.read_shift(4, "i");
          break;
        case 19:
          e.l += 4, T = e.read_shift(4);
          break;
        case 5:
          e.l += 4, T = e.read_shift(8, "f");
          break;
        case 11:
          e.l += 4, T = _r(e, 4);
          break;
        case 64:
          e.l += 4, T = nr(Hi(e));
          break;
        default:
          throw new Error("unparsed value: " + e[e.l]);
      }
      x[g] = T;
    }
  }
  return e.l = r + a, x;
}
var bc = ["CodePage", "Thumbnail", "_PID_LINKBASE", "_PID_HLINKS", "SystemIdentifier", "FMTID"];
function $u(e) {
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
function qs(e, t, r) {
  var a = Z(8), n = [], i = [], s = 8, f = 0, c = Z(8), l = Z(8);
  if (c.write_shift(4, 2), c.write_shift(4, 1200), l.write_shift(4, 1), i.push(c), n.push(l), s += 8 + c.length, !t) {
    l = Z(8), l.write_shift(4, 0), n.unshift(l);
    var o = [Z(4)];
    for (o[0].write_shift(4, e.length), f = 0; f < e.length; ++f) {
      var u = e[f][0];
      for (c = Z(8 + 2 * (u.length + 1) + (u.length % 2 ? 0 : 2)), c.write_shift(4, f + 2), c.write_shift(4, u.length + 1), c.write_shift(0, u, "dbcs"); c.l != c.length; ) c.write_shift(1, 0);
      o.push(c);
    }
    c = Dr(o), i.unshift(c), s += 8 + c.length;
  }
  for (f = 0; f < e.length; ++f)
    if (!(t && !t[e[f][0]]) && !(bc.indexOf(e[f][0]) > -1 || kc.indexOf(e[f][0]) > -1) && e[f][1] != null) {
      var x = e[f][1], d = 0;
      if (t) {
        d = +t[e[f][0]];
        var v = r[d];
        if (v.p == "version" && typeof x == "string") {
          var h = x.split(".");
          x = (+h[0] << 16) + (+h[1] || 0);
        }
        c = Ys(v.t, x);
      } else {
        var g = $u(x);
        g == -1 && (g = 31, x = String(x)), c = Ys(g, x);
      }
      i.push(c), l = Z(8), l.write_shift(4, t ? d : 2 + f), n.push(l), s += 8 + c.length;
    }
  var T = 8 * (i.length + 1);
  for (f = 0; f < i.length; ++f)
    n[f].write_shift(4, T), T += i[f].length;
  return a.write_shift(4, s), a.write_shift(4, i.length), Dr([a].concat(n).concat(i));
}
function Zs(e, t, r) {
  var a = e.content;
  if (!a) return {};
  Mr(a, 0);
  var n, i, s, f, c = 0;
  a.chk("feff", "Byte Order: "), a.read_shift(2);
  var l = a.read_shift(4), o = a.read_shift(16);
  if (o !== ye.utils.consts.HEADER_CLSID && o !== r) throw new Error("Bad PropertySet CLSID " + o);
  if (n = a.read_shift(4), n !== 1 && n !== 2) throw new Error("Unrecognized #Sets: " + n);
  if (i = a.read_shift(16), f = a.read_shift(4), n === 1 && f !== a.l) throw new Error("Length mismatch: " + f + " !== " + a.l);
  n === 2 && (s = a.read_shift(16), c = a.read_shift(4));
  var u = Js(a, t), x = { SystemIdentifier: l };
  for (var d in u) x[d] = u[d];
  if (x.FMTID = i, n === 1) return x;
  if (c - a.l == 2 && (a.l += 2), a.l !== c) throw new Error("Length mismatch 2: " + a.l + " !== " + c);
  var v;
  try {
    v = Js(a, null);
  } catch {
  }
  for (d in v) x[d] = v[d];
  return x.FMTID = [i, s], x;
}
function Qs(e, t, r, a, n, i) {
  var s = Z(n ? 68 : 48), f = [s];
  s.write_shift(2, 65534), s.write_shift(2, 0), s.write_shift(4, 842412599), s.write_shift(16, ye.utils.consts.HEADER_CLSID, "hex"), s.write_shift(4, n ? 2 : 1), s.write_shift(16, t, "hex"), s.write_shift(4, n ? 68 : 48);
  var c = qs(e, r, a);
  if (f.push(c), n) {
    var l = qs(n, null, null);
    s.write_shift(16, i, "hex"), s.write_shift(4, 68 + c.length), f.push(l);
  }
  return Dr(f);
}
function ea(e, t) {
  return e.read_shift(t), null;
}
function ju(e, t) {
  t || (t = Z(e));
  for (var r = 0; r < e; ++r) t.write_shift(1, 0);
  return t;
}
function Ku(e, t, r) {
  for (var a = [], n = e.l + t; e.l < n; ) a.push(r(e, n - e.l));
  if (n !== e.l) throw new Error("Slurp error");
  return a;
}
function _r(e, t) {
  return e.read_shift(t) === 1;
}
function et(e, t) {
  return t || (t = Z(2)), t.write_shift(2, +!!e), t;
}
function yr(e) {
  return e.read_shift(2, "u");
}
function yt(e, t) {
  return t || (t = Z(2)), t.write_shift(2, e), t;
}
function Dc(e, t) {
  return Ku(e, t, yr);
}
function Yu(e) {
  var t = e.read_shift(1), r = e.read_shift(1);
  return r === 1 ? t : t === 1;
}
function Ic(e, t, r) {
  return r || (r = Z(2)), r.write_shift(1, t == "e" ? +e : +!!e), r.write_shift(1, t == "e" ? 1 : 0), r;
}
function Xn(e, t, r) {
  var a = e.read_shift(r && r.biff >= 12 ? 2 : 1), n = "sbcs-cont";
  if (r && r.biff >= 8, !r || r.biff == 8) {
    var i = e.read_shift(1);
    i && (n = "dbcs-cont");
  } else r.biff == 12 && (n = "wstr");
  r.biff >= 2 && r.biff <= 5 && (n = "cpstr");
  var s = a ? e.read_shift(a, n) : "";
  return s;
}
function Ju(e) {
  var t = e.read_shift(2), r = e.read_shift(1), a = r & 4, n = r & 8, i = 1 + (r & 1), s = 0, f, c = {};
  n && (s = e.read_shift(2)), a && (f = e.read_shift(4));
  var l = i == 2 ? "dbcs-cont" : "sbcs-cont", o = t === 0 ? "" : e.read_shift(t, l);
  return n && (e.l += 4 * s), a && (e.l += f), c.t = o, n || (c.raw = "<t>" + c.t + "</t>", c.r = c.t), c;
}
function qu(e) {
  var t = e.t || "", r = Z(3);
  r.write_shift(2, t.length), r.write_shift(1, 1);
  var a = Z(2 * t.length);
  a.write_shift(2 * t.length, t, "utf16le");
  var n = [r, a];
  return Dr(n);
}
function Fa(e, t, r) {
  var a;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5) return e.read_shift(t, "cpstr");
    if (r.biff >= 12) return e.read_shift(t, "dbcs-cont");
  }
  var n = e.read_shift(1);
  return n === 0 ? a = e.read_shift(t, "sbcs-cont") : a = e.read_shift(t, "dbcs-cont"), a;
}
function zn(e, t, r) {
  var a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return a === 0 ? (e.l++, "") : Fa(e, a, r);
}
function Ra(e, t, r) {
  if (r.biff > 5) return zn(e, t, r);
  var a = e.read_shift(1);
  return a === 0 ? (e.l++, "") : e.read_shift(a, r.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont");
}
function Oc(e, t, r) {
  return r || (r = Z(3 + 2 * e.length)), r.write_shift(2, e.length), r.write_shift(1, 1), r.write_shift(31, e, "utf16le"), r;
}
function Zu(e) {
  var t = e.read_shift(1);
  e.l++;
  var r = e.read_shift(2);
  return e.l += 2, [t, r];
}
function Qu(e) {
  var t = e.read_shift(4), r = e.l, a = !1;
  t > 24 && (e.l += t - 24, e.read_shift(16) === "795881f43b1d7f48af2c825dc4852763" && (a = !0), e.l = r);
  var n = e.read_shift((a ? t - 24 : t) >> 1, "utf16le").replace(rt, "");
  return a && (e.l += 24), n;
}
function eh(e) {
  for (var t = e.read_shift(2), r = ""; t-- > 0; ) r += "../";
  var a = e.read_shift(0, "lpstr-ansi");
  if (e.l += 2, e.read_shift(2) != 57005) throw new Error("Bad FileMoniker");
  var n = e.read_shift(4);
  if (n === 0) return r + a.replace(/\\/g, "/");
  var i = e.read_shift(4);
  if (e.read_shift(2) != 3) throw new Error("Bad FileMoniker");
  var s = e.read_shift(i >> 1, "utf16le").replace(rt, "");
  return r + s;
}
function rh(e, t) {
  var r = e.read_shift(16);
  switch (r) {
    case "e0c9ea79f9bace118c8200aa004ba90b":
      return Qu(e);
    case "0303000000000000c000000000000046":
      return eh(e);
    default:
      throw new Error("Unsupported Moniker " + r);
  }
}
function n0(e) {
  var t = e.read_shift(4), r = t > 0 ? e.read_shift(t, "utf16le").replace(rt, "") : "";
  return r;
}
function ef(e, t) {
  t || (t = Z(6 + e.length * 2)), t.write_shift(4, 1 + e.length);
  for (var r = 0; r < e.length; ++r) t.write_shift(2, e.charCodeAt(r));
  return t.write_shift(2, 0), t;
}
function th(e, t) {
  var r = e.l + t, a = e.read_shift(4);
  if (a !== 2) throw new Error("Unrecognized streamVersion: " + a);
  var n = e.read_shift(2);
  e.l += 2;
  var i, s, f, c, l = "", o, u;
  n & 16 && (i = n0(e, r - e.l)), n & 128 && (s = n0(e, r - e.l)), (n & 257) === 257 && (f = n0(e, r - e.l)), (n & 257) === 1 && (c = rh(e, r - e.l)), n & 8 && (l = n0(e, r - e.l)), n & 32 && (o = e.read_shift(16)), n & 64 && (u = Hi(
    e
    /*, 8*/
  )), e.l = r;
  var x = s || f || c || "";
  x && l && (x += "#" + l), x || (x = "#" + l), n & 2 && x.charAt(0) == "/" && x.charAt(1) != "/" && (x = "file://" + x);
  var d = { Target: x };
  return o && (d.guid = o), u && (d.time = u), i && (d.Tooltip = i), d;
}
function ah(e) {
  var t = Z(512), r = 0, a = e.Target;
  a.slice(0, 7) == "file://" && (a = a.slice(7));
  var n = a.indexOf("#"), i = n > -1 ? 31 : 23;
  switch (a.charAt(0)) {
    case "#":
      i = 28;
      break;
    case ".":
      i &= -3;
      break;
  }
  t.write_shift(4, 2), t.write_shift(4, i);
  var s = [8, 6815827, 6619237, 4849780, 83];
  for (r = 0; r < s.length; ++r) t.write_shift(4, s[r]);
  if (i == 28)
    a = a.slice(1), ef(a, t);
  else if (i & 2) {
    for (s = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), r = 0; r < s.length; ++r) t.write_shift(1, parseInt(s[r], 16));
    var f = n > -1 ? a.slice(0, n) : a;
    for (t.write_shift(4, 2 * (f.length + 1)), r = 0; r < f.length; ++r) t.write_shift(2, f.charCodeAt(r));
    t.write_shift(2, 0), i & 8 && ef(n > -1 ? a.slice(n + 1) : "", t);
  } else {
    for (s = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" "), r = 0; r < s.length; ++r) t.write_shift(1, parseInt(s[r], 16));
    for (var c = 0; a.slice(c * 3, c * 3 + 3) == "../" || a.slice(c * 3, c * 3 + 3) == "..\\"; ) ++c;
    for (t.write_shift(2, c), t.write_shift(4, a.length - 3 * c + 1), r = 0; r < a.length - 3 * c; ++r) t.write_shift(1, a.charCodeAt(r + 3 * c) & 255);
    for (t.write_shift(1, 0), t.write_shift(2, 65535), t.write_shift(2, 57005), r = 0; r < 6; ++r) t.write_shift(4, 0);
  }
  return t.slice(0, t.l);
}
function Nc(e) {
  var t = e.read_shift(1), r = e.read_shift(1), a = e.read_shift(1), n = e.read_shift(1);
  return [t, r, a, n];
}
function Rc(e, t) {
  var r = Nc(e);
  return r[3] = 0, r;
}
function zt(e) {
  var t = e.read_shift(2), r = e.read_shift(2), a = e.read_shift(2);
  return { r: t, c: r, ixfe: a };
}
function Aa(e, t, r, a) {
  return a || (a = Z(6)), a.write_shift(2, e), a.write_shift(2, t), a.write_shift(2, r || 0), a;
}
function nh(e) {
  var t = e.read_shift(2), r = e.read_shift(2);
  return e.l += 8, { type: t, flags: r };
}
function ih(e, t, r) {
  return t === 0 ? "" : Ra(e, t, r);
}
function sh(e, t, r) {
  var a = r.biff > 8 ? 4 : 2, n = e.read_shift(a), i = e.read_shift(a, "i"), s = e.read_shift(a, "i");
  return [n, i, s];
}
function Lc(e) {
  var t = e.read_shift(2), r = Ui(e);
  return [t, r];
}
function fh(e, t, r) {
  e.l += 4, t -= 4;
  var a = e.l + t, n = Xn(e, t, r), i = e.read_shift(2);
  if (a -= e.l, i !== a) throw new Error("Malformed AddinUdf: padding = " + a + " != " + i);
  return e.l += i, n;
}
function C0(e) {
  var t = e.read_shift(2), r = e.read_shift(2), a = e.read_shift(2), n = e.read_shift(2);
  return { s: { c: a, r: t }, e: { c: n, r } };
}
function Pc(e, t) {
  return t || (t = Z(8)), t.write_shift(2, e.s.r), t.write_shift(2, e.e.r), t.write_shift(2, e.s.c), t.write_shift(2, e.e.c), t;
}
function Bc(e) {
  var t = e.read_shift(2), r = e.read_shift(2), a = e.read_shift(1), n = e.read_shift(1);
  return { s: { c: a, r: t }, e: { c: n, r } };
}
var ch = Bc;
function Mc(e) {
  e.l += 4;
  var t = e.read_shift(2), r = e.read_shift(2), a = e.read_shift(2);
  return e.l += 12, [r, t, a];
}
function lh(e) {
  var t = {};
  return e.l += 4, e.l += 16, t.fSharedNote = e.read_shift(2), e.l += 4, t;
}
function oh(e) {
  var t = {};
  return e.l += 4, e.cf = e.read_shift(2), t;
}
function Hr(e) {
  e.l += 2, e.l += e.read_shift(2);
}
var uh = {
  /*::[*/
  0: Hr,
  /* FtEnd */
  /*::[*/
  4: Hr,
  /* FtMacro */
  /*::[*/
  5: Hr,
  /* FtButton */
  /*::[*/
  6: Hr,
  /* FtGmo */
  /*::[*/
  7: oh,
  /* FtCf */
  /*::[*/
  8: Hr,
  /* FtPioGrbit */
  /*::[*/
  9: Hr,
  /* FtPictFmla */
  /*::[*/
  10: Hr,
  /* FtCbls */
  /*::[*/
  11: Hr,
  /* FtRbo */
  /*::[*/
  12: Hr,
  /* FtSbs */
  /*::[*/
  13: lh,
  /* FtNts */
  /*::[*/
  14: Hr,
  /* FtSbsFmla */
  /*::[*/
  15: Hr,
  /* FtGboData */
  /*::[*/
  16: Hr,
  /* FtEdoData */
  /*::[*/
  17: Hr,
  /* FtRboData */
  /*::[*/
  18: Hr,
  /* FtCblsData */
  /*::[*/
  19: Hr,
  /* FtLbsData */
  /*::[*/
  20: Hr,
  /* FtCblsFmla */
  /*::[*/
  21: Mc
};
function hh(e, t) {
  for (var r = e.l + t, a = []; e.l < r; ) {
    var n = e.read_shift(2);
    e.l -= 2;
    try {
      a.push(uh[n](e, r - e.l));
    } catch {
      return e.l = r, a;
    }
  }
  return e.l != r && (e.l = r), a;
}
function i0(e, t) {
  var r = { BIFFVer: 0, dt: 0 };
  switch (r.BIFFVer = e.read_shift(2), t -= 2, t >= 2 && (r.dt = e.read_shift(2), e.l -= 2), r.BIFFVer) {
    case 1536:
    case 1280:
    case 1024:
    case 768:
    case 512:
    case 2:
    case 7:
      break;
    default:
      if (t > 6) throw new Error("Unexpected BIFF Ver " + r.BIFFVer);
  }
  return e.read_shift(t), r;
}
function Xi(e, t, r) {
  var a = 1536, n = 16;
  switch (r.bookType) {
    case "biff8":
      break;
    case "biff5":
      a = 1280, n = 8;
      break;
    case "biff4":
      a = 4, n = 6;
      break;
    case "biff3":
      a = 3, n = 6;
      break;
    case "biff2":
      a = 2, n = 4;
      break;
    case "xla":
      break;
    default:
      throw new Error("unsupported BIFF version");
  }
  var i = Z(n);
  return i.write_shift(2, a), i.write_shift(2, t), n > 4 && i.write_shift(2, 29282), n > 6 && i.write_shift(2, 1997), n > 8 && (i.write_shift(2, 49161), i.write_shift(2, 1), i.write_shift(2, 1798), i.write_shift(2, 0)), i;
}
function xh(e, t) {
  return t === 0 || e.read_shift(2), 1200;
}
function dh(e, t, r) {
  if (r.enc)
    return e.l += t, "";
  var a = e.l, n = Ra(e, 0, r);
  return e.read_shift(t + a - e.l), n;
}
function ph(e, t) {
  var r = !t || t.biff == 8, a = Z(r ? 112 : 54);
  for (a.write_shift(t.biff == 8 ? 2 : 1, 7), r && a.write_shift(1, 0), a.write_shift(4, 859007059), a.write_shift(4, 5458548 | (r ? 0 : 536870912)); a.l < a.length; ) a.write_shift(1, r ? 0 : 32);
  return a;
}
function vh(e, t, r) {
  var a = r && r.biff == 8 || t == 2 ? e.read_shift(2) : (e.l += t, 0);
  return { fDialog: a & 16, fBelow: a & 64, fRight: a & 128 };
}
function mh(e, t, r) {
  var a = e.read_shift(4), n = e.read_shift(1) & 3, i = e.read_shift(1);
  switch (i) {
    case 0:
      i = "Worksheet";
      break;
    case 1:
      i = "Macrosheet";
      break;
    case 2:
      i = "Chartsheet";
      break;
    case 6:
      i = "VBAModule";
      break;
  }
  var s = Xn(e, 0, r);
  return s.length === 0 && (s = "Sheet1"), { pos: a, hs: n, dt: i, name: s };
}
function gh(e, t) {
  var r = !t || t.biff >= 8 ? 2 : 1, a = Z(8 + r * e.name.length);
  a.write_shift(4, e.pos), a.write_shift(1, e.hs || 0), a.write_shift(1, e.dt), a.write_shift(1, e.name.length), t.biff >= 8 && a.write_shift(1, 1), a.write_shift(r * e.name.length, e.name, t.biff < 8 ? "sbcs" : "utf16le");
  var n = a.slice(0, a.l);
  return n.l = a.l, n;
}
function _h(e, t) {
  for (var r = e.l + t, a = e.read_shift(4), n = e.read_shift(4), i = [], s = 0; s != n && e.l < r; ++s)
    i.push(Ju(e));
  return i.Count = a, i.Unique = n, i;
}
function wh(e, t) {
  var r = Z(8);
  r.write_shift(4, e.Count), r.write_shift(4, e.Unique);
  for (var a = [], n = 0; n < e.length; ++n) a[n] = qu(e[n]);
  var i = Dr([r].concat(a));
  return i.parts = [r.length].concat(a.map(function(s) {
    return s.length;
  })), i;
}
function kh(e, t) {
  var r = {};
  return r.dsst = e.read_shift(2), e.l += t - 2, r;
}
function Eh(e) {
  var t = {};
  t.r = e.read_shift(2), t.c = e.read_shift(2), t.cnt = e.read_shift(2) - t.c;
  var r = e.read_shift(2);
  e.l += 4;
  var a = e.read_shift(1);
  return e.l += 3, a & 7 && (t.level = a & 7), a & 32 && (t.hidden = !0), a & 64 && (t.hpt = r / 20), t;
}
function Th(e) {
  var t = nh(e);
  if (t.type != 2211) throw new Error("Invalid Future Record " + t.type);
  var r = e.read_shift(4);
  return r !== 0;
}
function yh(e) {
  return e.read_shift(2), e.read_shift(4);
}
function rf(e, t, r) {
  var a = 0;
  r && r.biff == 2 || (a = e.read_shift(2));
  var n = e.read_shift(2);
  r && r.biff == 2 && (a = 1 - (n >> 15), n &= 32767);
  var i = { Unsynced: a & 1, DyZero: (a & 2) >> 1, ExAsc: (a & 4) >> 2, ExDsc: (a & 8) >> 3 };
  return [i, n];
}
function Sh(e) {
  var t = e.read_shift(2), r = e.read_shift(2), a = e.read_shift(2), n = e.read_shift(2), i = e.read_shift(2), s = e.read_shift(2), f = e.read_shift(2), c = e.read_shift(2), l = e.read_shift(2);
  return {
    Pos: [t, r],
    Dim: [a, n],
    Flags: i,
    CurTab: s,
    FirstTab: f,
    Selected: c,
    TabRatio: l
  };
}
function Fh() {
  var e = Z(18);
  return e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 29280), e.write_shift(2, 17600), e.write_shift(2, 56), e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 1), e.write_shift(2, 500), e;
}
function Ah(e, t, r) {
  if (r && r.biff >= 2 && r.biff < 5) return {};
  var a = e.read_shift(2);
  return { RTL: a & 64 };
}
function Ch(e) {
  var t = Z(18), r = 1718;
  return e && e.RTL && (r |= 64), t.write_shift(2, r), t.write_shift(4, 0), t.write_shift(4, 64), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
function bh() {
}
function Dh(e, t, r) {
  var a = {
    dyHeight: e.read_shift(2),
    fl: e.read_shift(2)
  };
  switch (r && r.biff || 8) {
    case 2:
      break;
    case 3:
    case 4:
      e.l += 2;
      break;
    default:
      e.l += 10;
      break;
  }
  return a.name = Xn(e, 0, r), a;
}
function Ih(e, t) {
  var r = e.name || "Arial", a = t && t.biff == 5, n = a ? 15 + r.length : 16 + 2 * r.length, i = Z(n);
  return i.write_shift(2, e.sz * 20), i.write_shift(4, 0), i.write_shift(2, 400), i.write_shift(4, 0), i.write_shift(2, 0), i.write_shift(1, r.length), a || i.write_shift(1, 1), i.write_shift((a ? 1 : 2) * r.length, r, a ? "sbcs" : "utf16le"), i;
}
function Oh(e) {
  var t = zt(e);
  return t.isst = e.read_shift(4), t;
}
function Nh(e, t, r, a) {
  var n = Z(10);
  return Aa(e, t, a, n), n.write_shift(4, r), n;
}
function Rh(e, t, r) {
  r.biffguess && r.biff == 2 && (r.biff = 5);
  var a = e.l + t, n = zt(e);
  r.biff == 2 && e.l++;
  var i = zn(e, a - e.l, r);
  return n.val = i, n;
}
function Lh(e, t, r, a, n) {
  var i = !n || n.biff == 8, s = Z(8 + +i + (1 + i) * r.length);
  return Aa(e, t, a, s), s.write_shift(2, r.length), i && s.write_shift(1, 1), s.write_shift((1 + i) * r.length, r, i ? "utf16le" : "sbcs"), s;
}
function Ph(e, t, r) {
  var a = e.read_shift(2), n = Ra(e, 0, r);
  return [a, n];
}
function Bh(e, t, r, a) {
  var n = r && r.biff == 5;
  a || (a = Z(n ? 3 + t.length : 5 + 2 * t.length)), a.write_shift(2, e), a.write_shift(n ? 1 : 2, t.length), n || a.write_shift(1, 1), a.write_shift((n ? 1 : 2) * t.length, t, n ? "sbcs" : "utf16le");
  var i = a.length > a.l ? a.slice(0, a.l) : a;
  return i.l == null && (i.l = i.length), i;
}
var Mh = Ra;
function tf(e, t, r) {
  var a = e.l + t, n = r.biff == 8 || !r.biff ? 4 : 2, i = e.read_shift(n), s = e.read_shift(n), f = e.read_shift(2), c = e.read_shift(2);
  return e.l = a, { s: { r: i, c: f }, e: { r: s, c } };
}
function Uh(e, t) {
  var r = t.biff == 8 || !t.biff ? 4 : 2, a = Z(2 * r + 6);
  return a.write_shift(r, e.s.r), a.write_shift(r, e.e.r + 1), a.write_shift(2, e.s.c), a.write_shift(2, e.e.c + 1), a.write_shift(2, 0), a;
}
function Wh(e) {
  var t = e.read_shift(2), r = e.read_shift(2), a = Lc(e);
  return { r: t, c: r, ixfe: a[0], rknum: a[1] };
}
function Vh(e, t) {
  for (var r = e.l + t - 2, a = e.read_shift(2), n = e.read_shift(2), i = []; e.l < r; ) i.push(Lc(e));
  if (e.l !== r) throw new Error("MulRK read error");
  var s = e.read_shift(2);
  if (i.length != s - n + 1) throw new Error("MulRK length mismatch");
  return { r: a, c: n, C: s, rkrec: i };
}
function Hh(e, t) {
  for (var r = e.l + t - 2, a = e.read_shift(2), n = e.read_shift(2), i = []; e.l < r; ) i.push(e.read_shift(2));
  if (e.l !== r) throw new Error("MulBlank read error");
  var s = e.read_shift(2);
  if (i.length != s - n + 1) throw new Error("MulBlank length mismatch");
  return { r: a, c: n, C: s, ixfe: i };
}
function Xh(e, t, r, a) {
  var n = {}, i = e.read_shift(4), s = e.read_shift(4), f = e.read_shift(4), c = e.read_shift(2);
  return n.patternType = Tu[f >> 26], a.cellStyles && (n.alc = i & 7, n.fWrap = i >> 3 & 1, n.alcV = i >> 4 & 7, n.fJustLast = i >> 7 & 1, n.trot = i >> 8 & 255, n.cIndent = i >> 16 & 15, n.fShrinkToFit = i >> 20 & 1, n.iReadOrder = i >> 22 & 2, n.fAtrNum = i >> 26 & 1, n.fAtrFnt = i >> 27 & 1, n.fAtrAlc = i >> 28 & 1, n.fAtrBdr = i >> 29 & 1, n.fAtrPat = i >> 30 & 1, n.fAtrProt = i >> 31 & 1, n.dgLeft = s & 15, n.dgRight = s >> 4 & 15, n.dgTop = s >> 8 & 15, n.dgBottom = s >> 12 & 15, n.icvLeft = s >> 16 & 127, n.icvRight = s >> 23 & 127, n.grbitDiag = s >> 30 & 3, n.icvTop = f & 127, n.icvBottom = f >> 7 & 127, n.icvDiag = f >> 14 & 127, n.dgDiag = f >> 21 & 15, n.icvFore = c & 127, n.icvBack = c >> 7 & 127, n.fsxButton = c >> 14 & 1), n;
}
function zh(e, t, r) {
  var a = {};
  return a.ifnt = e.read_shift(2), a.numFmtId = e.read_shift(2), a.flags = e.read_shift(2), a.fStyle = a.flags >> 2 & 1, t -= 6, a.data = Xh(e, t, a.fStyle, r), a;
}
function af(e, t, r, a) {
  var n = r && r.biff == 5;
  a || (a = Z(n ? 16 : 20)), a.write_shift(2, 0), e.style ? (a.write_shift(2, e.numFmtId || 0), a.write_shift(2, 65524)) : (a.write_shift(2, e.numFmtId || 0), a.write_shift(2, t << 4));
  var i = 0;
  return e.numFmtId > 0 && n && (i |= 1024), a.write_shift(4, i), a.write_shift(4, 0), n || a.write_shift(4, 0), a.write_shift(2, 0), a;
}
function Gh(e) {
  e.l += 4;
  var t = [e.read_shift(2), e.read_shift(2)];
  if (t[0] !== 0 && t[0]--, t[1] !== 0 && t[1]--, t[0] > 7 || t[1] > 7) throw new Error("Bad Gutters: " + t.join("|"));
  return t;
}
function $h(e) {
  var t = Z(8);
  return t.write_shift(4, 0), t.write_shift(2, 0), t.write_shift(2, 0), t;
}
function nf(e, t, r) {
  var a = zt(e);
  (r.biff == 2 || t == 9) && ++e.l;
  var n = Yu(e);
  return a.val = n, a.t = n === !0 || n === !1 ? "b" : "e", a;
}
function jh(e, t, r, a, n, i) {
  var s = Z(8);
  return Aa(e, t, a, s), Ic(r, i, s), s;
}
function Kh(e, t, r) {
  r.biffguess && r.biff == 2 && (r.biff = 5);
  var a = zt(e), n = jr(e);
  return a.val = n, a;
}
function Yh(e, t, r, a) {
  var n = Z(14);
  return Aa(e, t, a, n), Sa(r, n), n;
}
var sf = ih;
function Jh(e, t, r) {
  var a = e.l + t, n = e.read_shift(2), i = e.read_shift(2);
  if (r.sbcch = i, i == 1025 || i == 14849) return [i, n];
  if (i < 1 || i > 255) throw new Error("Unexpected SupBook type: " + i);
  for (var s = Fa(e, i), f = []; a > e.l; ) f.push(zn(e));
  return [i, n, s, f];
}
function ff(e, t, r) {
  var a = e.read_shift(2), n, i = {
    fBuiltIn: a & 1,
    fWantAdvise: a >>> 1 & 1,
    fWantPict: a >>> 2 & 1,
    fOle: a >>> 3 & 1,
    fOleLink: a >>> 4 & 1,
    cf: a >>> 5 & 1023,
    fIcon: a >>> 15 & 1
  };
  return r.sbcch === 14849 && (n = fh(e, t - 2, r)), i.body = n || e.read_shift(t - 2), typeof n == "string" && (i.Name = n), i;
}
var qh = [
  "_xlnm.Consolidate_Area",
  "_xlnm.Auto_Open",
  "_xlnm.Auto_Close",
  "_xlnm.Extract",
  "_xlnm.Database",
  "_xlnm.Criteria",
  "_xlnm.Print_Area",
  "_xlnm.Print_Titles",
  "_xlnm.Recorder",
  "_xlnm.Data_Form",
  "_xlnm.Auto_Activate",
  "_xlnm.Auto_Deactivate",
  "_xlnm.Sheet_Title",
  "_xlnm._FilterDatabase"
];
function cf(e, t, r) {
  var a = e.l + t, n = e.read_shift(2), i = e.read_shift(1), s = e.read_shift(1), f = e.read_shift(r && r.biff == 2 ? 1 : 2), c = 0;
  (!r || r.biff >= 5) && (r.biff != 5 && (e.l += 2), c = e.read_shift(2), r.biff == 5 && (e.l += 2), e.l += 4);
  var l = Fa(e, s, r);
  n & 32 && (l = qh[l.charCodeAt(0)]);
  var o = a - e.l;
  r && r.biff == 2 && --o;
  var u = a == e.l || f === 0 || !(o > 0) ? [] : hv(e, o, r, f);
  return {
    chKey: i,
    Name: l,
    itab: c,
    rgce: u
  };
}
function Uc(e, t, r) {
  if (r.biff < 8) return Zh(e, t, r);
  for (var a = [], n = e.l + t, i = e.read_shift(r.biff > 8 ? 4 : 2); i-- !== 0; ) a.push(sh(e, r.biff > 8 ? 12 : 6, r));
  if (e.l != n) throw new Error("Bad ExternSheet: " + e.l + " != " + n);
  return a;
}
function Zh(e, t, r) {
  e[e.l + 1] == 3 && e[e.l]++;
  var a = Xn(e, t, r);
  return a.charCodeAt(0) == 3 ? a.slice(1) : a;
}
function Qh(e, t, r) {
  if (r.biff < 8) {
    e.l += t;
    return;
  }
  var a = e.read_shift(2), n = e.read_shift(2), i = Fa(e, a, r), s = Fa(e, n, r);
  return [i, s];
}
function e1(e, t, r) {
  var a = Bc(e);
  e.l++;
  var n = e.read_shift(1);
  return t -= 8, [xv(e, t, r), n, a];
}
function lf(e, t, r) {
  var a = ch(e);
  switch (r.biff) {
    case 2:
      e.l++, t -= 7;
      break;
    case 3:
    case 4:
      e.l += 2, t -= 8;
      break;
    default:
      e.l += 6, t -= 12;
  }
  return [a, ov(e, t, r)];
}
function r1(e) {
  var t = e.read_shift(4) !== 0, r = e.read_shift(4) !== 0, a = e.read_shift(4);
  return [t, r, a];
}
function t1(e, t, r) {
  if (!(r.biff < 8)) {
    var a = e.read_shift(2), n = e.read_shift(2), i = e.read_shift(2), s = e.read_shift(2), f = Ra(e, 0, r);
    return r.biff < 8 && e.read_shift(1), [{ r: a, c: n }, f, s, i];
  }
}
function a1(e, t, r) {
  return t1(e, t, r);
}
function n1(e, t) {
  for (var r = [], a = e.read_shift(2); a--; ) r.push(C0(e));
  return r;
}
function i1(e) {
  var t = Z(2 + e.length * 8);
  t.write_shift(2, e.length);
  for (var r = 0; r < e.length; ++r) Pc(e[r], t);
  return t;
}
function s1(e, t, r) {
  if (r && r.biff < 8) return c1(e, t, r);
  var a = Mc(e), n = hh(e, t - 22, a[1]);
  return { cmo: a, ft: n };
}
var f1 = {
  8: function(e, t) {
    var r = e.l + t;
    e.l += 10;
    var a = e.read_shift(2);
    e.l += 4, e.l += 2, e.l += 2, e.l += 2, e.l += 4;
    var n = e.read_shift(1);
    return e.l += n, e.l = r, { fmt: a };
  }
};
function c1(e, t, r) {
  e.l += 4;
  var a = e.read_shift(2), n = e.read_shift(2), i = e.read_shift(2);
  e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 6, t -= 36;
  var s = [];
  return s.push((f1[a] || Yr)(e, t, r)), { cmo: [n, a, i], ft: s };
}
function l1(e, t, r) {
  var a = e.l, n = "";
  try {
    e.l += 4;
    var i = (r.lastobj || { cmo: [0, 0] }).cmo[1], s;
    [0, 5, 7, 11, 12, 14].indexOf(i) == -1 ? e.l += 6 : s = Zu(e, 6, r);
    var f = e.read_shift(2);
    e.read_shift(2), yr(e, 2);
    var c = e.read_shift(2);
    e.l += c;
    for (var l = 1; l < e.lens.length - 1; ++l) {
      if (e.l - a != e.lens[l]) throw new Error("TxO: bad continue record");
      var o = e[e.l], u = Fa(e, e.lens[l + 1] - e.lens[l] - 1);
      if (n += u, n.length >= (o ? f : 2 * f)) break;
    }
    if (n.length !== f && n.length !== f * 2)
      throw new Error("cchText: " + f + " != " + n.length);
    return e.l = a + t, { t: n };
  } catch {
    return e.l = a + t, { t: n };
  }
}
function o1(e, t) {
  var r = C0(e);
  e.l += 16;
  var a = th(e, t - 24);
  return [r, a];
}
function u1(e) {
  var t = Z(24), r = hr(e[0]);
  t.write_shift(2, r.r), t.write_shift(2, r.r), t.write_shift(2, r.c), t.write_shift(2, r.c);
  for (var a = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), n = 0; n < 16; ++n) t.write_shift(1, parseInt(a[n], 16));
  return Dr([t, ah(e[1])]);
}
function h1(e, t) {
  e.read_shift(2);
  var r = C0(e), a = e.read_shift((t - 10) / 2, "dbcs-cont");
  return a = a.replace(rt, ""), [r, a];
}
function x1(e) {
  var t = e[1].Tooltip, r = Z(10 + 2 * (t.length + 1));
  r.write_shift(2, 2048);
  var a = hr(e[0]);
  r.write_shift(2, a.r), r.write_shift(2, a.r), r.write_shift(2, a.c), r.write_shift(2, a.c);
  for (var n = 0; n < t.length; ++n) r.write_shift(2, t.charCodeAt(n));
  return r.write_shift(2, 0), r;
}
function d1(e) {
  var t = [0, 0], r;
  return r = e.read_shift(2), t[0] = $s[r] || r, r = e.read_shift(2), t[1] = $s[r] || r, t;
}
function p1(e) {
  return e || (e = Z(4)), e.write_shift(2, 1), e.write_shift(2, 1), e;
}
function v1(e) {
  for (var t = e.read_shift(2), r = []; t-- > 0; ) r.push(Rc(e));
  return r;
}
function m1(e) {
  for (var t = e.read_shift(2), r = []; t-- > 0; ) r.push(Rc(e));
  return r;
}
function g1(e) {
  e.l += 2;
  var t = { cxfs: 0, crc: 0 };
  return t.cxfs = e.read_shift(2), t.crc = e.read_shift(4), t;
}
function Wc(e, t, r) {
  if (!r.cellStyles) return Yr(e, t);
  var a = r && r.biff >= 12 ? 4 : 2, n = e.read_shift(a), i = e.read_shift(a), s = e.read_shift(a), f = e.read_shift(a), c = e.read_shift(2);
  a == 2 && (e.l += 2);
  var l = { s: n, e: i, w: s, ixfe: f, flags: c };
  return (r.biff >= 5 || !r.biff) && (l.level = c >> 8 & 7), l;
}
function _1(e, t) {
  var r = Z(12);
  r.write_shift(2, t), r.write_shift(2, t), r.write_shift(2, e.width * 256), r.write_shift(2, 0);
  var a = 0;
  return e.hidden && (a |= 1), r.write_shift(1, a), a = e.level || 0, r.write_shift(1, a), r.write_shift(2, 0), r;
}
function w1(e, t) {
  var r = {};
  return t < 32 || (e.l += 16, r.header = jr(e), r.footer = jr(e), e.l += 2), r;
}
function k1(e, t, r) {
  var a = { area: !1 };
  if (r.biff != 5)
    return e.l += t, a;
  var n = e.read_shift(1);
  return e.l += 3, n & 16 && (a.area = !0), a;
}
function E1(e) {
  for (var t = Z(2 * e), r = 0; r < e; ++r) t.write_shift(2, r + 1);
  return t;
}
var T1 = zt, y1 = Dc, S1 = zn;
function F1(e) {
  var t = e.read_shift(2), r = e.read_shift(2), a = e.read_shift(4), n = { fmt: t, env: r, len: a, data: e.slice(e.l, e.l + a) };
  return e.l += a, n;
}
function A1(e, t, r) {
  r.biffguess && r.biff == 5 && (r.biff = 2);
  var a = zt(e);
  ++e.l;
  var n = Ra(e, t - 7, r);
  return a.t = "str", a.val = n, a;
}
function C1(e) {
  var t = zt(e);
  ++e.l;
  var r = jr(e);
  return t.t = "n", t.val = r, t;
}
function b1(e, t, r) {
  var a = Z(15);
  return Kn(a, e, t), a.write_shift(8, r, "f"), a;
}
function D1(e) {
  var t = zt(e);
  ++e.l;
  var r = e.read_shift(2);
  return t.t = "n", t.val = r, t;
}
function I1(e, t, r) {
  var a = Z(9);
  return Kn(a, e, t), a.write_shift(2, r), a;
}
function O1(e) {
  var t = e.read_shift(1);
  return t === 0 ? (e.l++, "") : e.read_shift(t, "sbcs-cont");
}
function N1(e, t) {
  e.l += 6, e.l += 2, e.l += 1, e.l += 3, e.l += 1, e.l += t - 13;
}
function R1(e, t, r) {
  var a = e.l + t, n = zt(e), i = e.read_shift(2), s = Fa(e, i, r);
  return e.l = a, n.t = "str", n.val = s, n;
}
var L1 = [2, 3, 48, 49, 131, 139, 140, 245], pi = /* @__PURE__ */ function() {
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
  }, t = S0({
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
  function r(f, c) {
    var l = [], o = aa(1);
    switch (c.type) {
      case "base64":
        o = ut(xt(f));
        break;
      case "binary":
        o = ut(f);
        break;
      case "buffer":
      case "array":
        o = f;
        break;
    }
    Mr(o, 0);
    var u = o.read_shift(1), x = !!(u & 136), d = !1, v = !1;
    switch (u) {
      case 2:
        break;
      case 3:
        break;
      case 48:
        d = !0, x = !0;
        break;
      case 49:
        d = !0, x = !0;
        break;
      case 131:
        break;
      case 139:
        break;
      case 140:
        v = !0;
        break;
      case 245:
        break;
      default:
        throw new Error("DBF Unsupported Version: " + u.toString(16));
    }
    var h = 0, g = 521;
    u == 2 && (h = o.read_shift(2)), o.l += 3, u != 2 && (h = o.read_shift(4)), h > 1048576 && (h = 1e6), u != 2 && (g = o.read_shift(2));
    var T = o.read_shift(2), A = c.codepage || 1252;
    u != 2 && (o.l += 16, o.read_shift(1), o[o.l] !== 0 && (A = e[o[o.l]]), o.l += 1, o.l += 2), v && (o.l += 36);
    for (var k = [], R = {}, V = Math.min(o.length, u == 2 ? 521 : g - 10 - (d ? 264 : 0)), N = v ? 32 : 11; o.l < V && o[o.l] != 13; )
      switch (R = {}, R.name = An.utils.decode(A, o.slice(o.l, o.l + N)).replace(/[\u0000\r\n].*$/g, ""), o.l += N, R.type = String.fromCharCode(o.read_shift(1)), u != 2 && !v && (R.offset = o.read_shift(4)), R.len = o.read_shift(1), u == 2 && (R.offset = o.read_shift(2)), R.dec = o.read_shift(1), R.name.length && k.push(R), u != 2 && (o.l += v ? 13 : 14), R.type) {
        case "B":
          (!d || R.len != 8) && c.WTF && console.log("Skipping " + R.name + ":" + R.type);
          break;
        case "G":
        case "P":
          c.WTF && console.log("Skipping " + R.name + ":" + R.type);
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
          throw new Error("Unknown Field Type: " + R.type);
      }
    if (o[o.l] !== 13 && (o.l = g - 1), o.read_shift(1) !== 13) throw new Error("DBF Terminator not found " + o.l + " " + o[o.l]);
    o.l = g;
    var S = 0, z = 0;
    for (l[0] = [], z = 0; z != k.length; ++z) l[0][z] = k[z].name;
    for (; h-- > 0; ) {
      if (o[o.l] === 42) {
        o.l += T;
        continue;
      }
      for (++o.l, l[++S] = [], z = 0, z = 0; z != k.length; ++z) {
        var L = o.slice(o.l, o.l + k[z].len);
        o.l += k[z].len, Mr(L, 0);
        var J = An.utils.decode(A, L);
        switch (k[z].type) {
          case "C":
            J.trim().length && (l[S][z] = J.replace(/\s+$/, ""));
            break;
          case "D":
            J.length === 8 ? l[S][z] = new Date(+J.slice(0, 4), +J.slice(4, 6) - 1, +J.slice(6, 8)) : l[S][z] = J;
            break;
          case "F":
            l[S][z] = parseFloat(J.trim());
            break;
          case "+":
          case "I":
            l[S][z] = v ? L.read_shift(-4, "i") ^ 2147483648 : L.read_shift(4, "i");
            break;
          case "L":
            switch (J.trim().toUpperCase()) {
              case "Y":
              case "T":
                l[S][z] = !0;
                break;
              case "N":
              case "F":
                l[S][z] = !1;
                break;
              case "":
              case "?":
                break;
              default:
                throw new Error("DBF Unrecognized L:|" + J + "|");
            }
            break;
          case "M":
            if (!x) throw new Error("DBF Unexpected MEMO for type " + u.toString(16));
            l[S][z] = "##MEMO##" + (v ? parseInt(J.trim(), 10) : L.read_shift(4));
            break;
          case "N":
            J = J.replace(/\u0000/g, "").trim(), J && J != "." && (l[S][z] = +J || 0);
            break;
          case "@":
            l[S][z] = new Date(L.read_shift(-8, "f") - 621356832e5);
            break;
          case "T":
            l[S][z] = new Date((L.read_shift(4) - 2440588) * 864e5 + L.read_shift(4));
            break;
          case "Y":
            l[S][z] = L.read_shift(4, "i") / 1e4 + L.read_shift(4, "i") / 1e4 * Math.pow(2, 32);
            break;
          case "O":
            l[S][z] = -L.read_shift(-8, "f");
            break;
          case "B":
            if (d && k[z].len == 8) {
              l[S][z] = L.read_shift(8, "f");
              break;
            }
          case "G":
          case "P":
            L.l += k[z].len;
            break;
          case "0":
            if (k[z].name === "_NullFlags") break;
          default:
            throw new Error("DBF Unsupported data type " + k[z].type);
        }
      }
    }
    if (u != 2 && o.l < o.length && o[o.l++] != 26) throw new Error("DBF EOF Marker missing " + (o.l - 1) + " of " + o.length + " " + o[o.l - 1].toString(16));
    return c && c.sheetRows && (l = l.slice(0, c.sheetRows)), c.DBF = k, l;
  }
  function a(f, c) {
    var l = c || {};
    l.dateNF || (l.dateNF = "yyyymmdd");
    var o = sn(r(f, l), l);
    return o["!cols"] = l.DBF.map(function(u) {
      return {
        wch: u.len,
        DBF: u
      };
    }), delete l.DBF, o;
  }
  function n(f, c) {
    try {
      return ca(a(f, c), c);
    } catch (l) {
      if (c && c.WTF) throw l;
    }
    return { SheetNames: [], Sheets: {} };
  }
  var i = { B: 8, C: 250, L: 1, D: 8, "?": 0, "": 0 };
  function s(f, c) {
    var l = c || {};
    if (+l.codepage >= 0 && Nt(+l.codepage), l.type == "string") throw new Error("Cannot write DBF to JS string");
    var o = it(), u = E0(f, { header: 1, raw: !0, cellDates: !0 }), x = u[0], d = u.slice(1), v = f["!cols"] || [], h = 0, g = 0, T = 0, A = 1;
    for (h = 0; h < x.length; ++h) {
      if (((v[h] || {}).DBF || {}).name) {
        x[h] = v[h].DBF.name, ++T;
        continue;
      }
      if (x[h] != null) {
        if (++T, typeof x[h] == "number" && (x[h] = x[h].toString(10)), typeof x[h] != "string") throw new Error("DBF Invalid column name " + x[h] + " |" + typeof x[h] + "|");
        if (x.indexOf(x[h]) !== h) {
          for (g = 0; g < 1024; ++g)
            if (x.indexOf(x[h] + "_" + g) == -1) {
              x[h] += "_" + g;
              break;
            }
        }
      }
    }
    var k = $e(f["!ref"]), R = [], V = [], N = [];
    for (h = 0; h <= k.e.c - k.s.c; ++h) {
      var S = "", z = "", L = 0, J = [];
      for (g = 0; g < d.length; ++g)
        d[g][h] != null && J.push(d[g][h]);
      if (J.length == 0 || x[h] == null) {
        R[h] = "?";
        continue;
      }
      for (g = 0; g < J.length; ++g) {
        switch (typeof J[g]) {
          case "number":
            z = "B";
            break;
          case "string":
            z = "C";
            break;
          case "boolean":
            z = "L";
            break;
          case "object":
            z = J[g] instanceof Date ? "D" : "C";
            break;
          default:
            z = "C";
        }
        L = Math.max(L, String(J[g]).length), S = S && S != z ? "C" : z;
      }
      L > 250 && (L = 250), z = ((v[h] || {}).DBF || {}).type, z == "C" && v[h].DBF.len > L && (L = v[h].DBF.len), S == "B" && z == "N" && (S = "N", N[h] = v[h].DBF.dec, L = v[h].DBF.len), V[h] = S == "C" || z == "N" ? L : i[S] || 0, A += V[h], R[h] = S;
    }
    var j = o.next(32);
    for (j.write_shift(4, 318902576), j.write_shift(4, d.length), j.write_shift(2, 296 + 32 * T), j.write_shift(2, A), h = 0; h < 4; ++h) j.write_shift(4, 0);
    for (j.write_shift(4, 0 | (+t[
      /*::String(*/
      bf
      /*::)*/
    ] || 3) << 8), h = 0, g = 0; h < x.length; ++h)
      if (x[h] != null) {
        var H = o.next(32), re = (x[h].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
        H.write_shift(1, re, "sbcs"), H.write_shift(1, R[h] == "?" ? "C" : R[h], "sbcs"), H.write_shift(4, g), H.write_shift(1, V[h] || i[R[h]] || 0), H.write_shift(1, N[h] || 0), H.write_shift(1, 2), H.write_shift(4, 0), H.write_shift(1, 0), H.write_shift(4, 0), H.write_shift(4, 0), g += V[h] || i[R[h]] || 0;
      }
    var me = o.next(264);
    for (me.write_shift(4, 13), h = 0; h < 65; ++h) me.write_shift(4, 0);
    for (h = 0; h < d.length; ++h) {
      var xe = o.next(A);
      for (xe.write_shift(1, 0), g = 0; g < x.length; ++g)
        if (x[g] != null)
          switch (R[g]) {
            case "L":
              xe.write_shift(1, d[h][g] == null ? 63 : d[h][g] ? 84 : 70);
              break;
            case "B":
              xe.write_shift(8, d[h][g] || 0, "f");
              break;
            case "N":
              var ve = "0";
              for (typeof d[h][g] == "number" && (ve = d[h][g].toFixed(N[g] || 0)), T = 0; T < V[g] - ve.length; ++T) xe.write_shift(1, 32);
              xe.write_shift(1, ve, "sbcs");
              break;
            case "D":
              d[h][g] ? (xe.write_shift(4, ("0000" + d[h][g].getFullYear()).slice(-4), "sbcs"), xe.write_shift(2, ("00" + (d[h][g].getMonth() + 1)).slice(-2), "sbcs"), xe.write_shift(2, ("00" + d[h][g].getDate()).slice(-2), "sbcs")) : xe.write_shift(8, "00000000", "sbcs");
              break;
            case "C":
              var de = String(d[h][g] != null ? d[h][g] : "").slice(0, V[g]);
              for (xe.write_shift(1, de, "sbcs"), T = 0; T < V[g] - de.length; ++T) xe.write_shift(1, 32);
              break;
          }
    }
    return o.next(1).write_shift(1, 26), o.end();
  }
  return {
    to_workbook: n,
    to_sheet: a,
    from_sheet: s
  };
}(), Vc = /* @__PURE__ */ function() {
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
  }, t = new RegExp("\x1BN(" + gr(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm"), r = function(x, d) {
    var v = e[d];
    return typeof v == "number" ? _s(v) : v;
  }, a = function(x, d, v) {
    var h = d.charCodeAt(0) - 32 << 4 | v.charCodeAt(0) - 48;
    return h == 59 ? x : _s(h);
  };
  e["|"] = 254;
  function n(x, d) {
    switch (d.type) {
      case "base64":
        return i(xt(x), d);
      case "binary":
        return i(x, d);
      case "buffer":
        return i(We && Buffer.isBuffer(x) ? x.toString("binary") : fa(x), d);
      case "array":
        return i(ya(x), d);
    }
    throw new Error("Unrecognized type " + d.type);
  }
  function i(x, d) {
    var v = x.split(/[\n\r]+/), h = -1, g = -1, T = 0, A = 0, k = [], R = [], V = null, N = {}, S = [], z = [], L = [], J = 0, j;
    for (+d.codepage >= 0 && Nt(+d.codepage); T !== v.length; ++T) {
      J = 0;
      var H = v[T].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, a).replace(t, r), re = H.replace(/;;/g, "\0").split(";").map(function(P) {
        return P.replace(/\u0000/g, ";");
      }), me = re[0], xe;
      if (H.length > 0) switch (me) {
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
          re[1].charAt(0) == "P" && R.push(H.slice(3).replace(/;;/g, ";"));
          break;
        case "C":
          var ve = !1, de = !1, Xe = !1, K = !1, pe = -1, we = -1;
          for (A = 1; A < re.length; ++A) switch (re[A].charAt(0)) {
            case "A":
              break;
            case "X":
              g = parseInt(re[A].slice(1)) - 1, de = !0;
              break;
            case "Y":
              for (h = parseInt(re[A].slice(1)) - 1, de || (g = 0), j = k.length; j <= h; ++j) k[j] = [];
              break;
            case "K":
              xe = re[A].slice(1), xe.charAt(0) === '"' ? xe = xe.slice(1, xe.length - 1) : xe === "TRUE" ? xe = !0 : xe === "FALSE" ? xe = !1 : isNaN(Lt(xe)) ? isNaN(en(xe).getDate()) || (xe = nr(xe)) : (xe = Lt(xe), V !== null && an(V) && (xe = A0(xe))), ve = !0;
              break;
            case "E":
              K = !0;
              var C = Za(re[A].slice(1), { r: h, c: g });
              k[h][g] = [k[h][g], C];
              break;
            case "S":
              Xe = !0, k[h][g] = [k[h][g], "S5S"];
              break;
            case "G":
              break;
            case "R":
              pe = parseInt(re[A].slice(1)) - 1;
              break;
            case "C":
              we = parseInt(re[A].slice(1)) - 1;
              break;
            default:
              if (d && d.WTF) throw new Error("SYLK bad record " + H);
          }
          if (ve && (k[h][g] && k[h][g].length == 2 ? k[h][g][0] = xe : k[h][g] = xe, V = null), Xe) {
            if (K) throw new Error("SYLK shared formula cannot have own formula");
            var M = pe > -1 && k[pe][we];
            if (!M || !M[1]) throw new Error("SYLK shared formula cannot find base");
            k[h][g][1] = il(M[1], { r: h - pe, c: g - we });
          }
          break;
        case "F":
          var O = 0;
          for (A = 1; A < re.length; ++A) switch (re[A].charAt(0)) {
            case "X":
              g = parseInt(re[A].slice(1)) - 1, ++O;
              break;
            case "Y":
              for (h = parseInt(re[A].slice(1)) - 1, j = k.length; j <= h; ++j) k[j] = [];
              break;
            case "M":
              J = parseInt(re[A].slice(1)) / 20;
              break;
            case "F":
              break;
            case "G":
              break;
            case "P":
              V = R[parseInt(re[A].slice(1))];
              break;
            case "S":
              break;
            case "D":
              break;
            case "N":
              break;
            case "W":
              for (L = re[A].slice(1).split(" "), j = parseInt(L[0], 10); j <= parseInt(L[1], 10); ++j)
                J = parseInt(L[2], 10), z[j - 1] = J === 0 ? { hidden: !0 } : { wch: J }, na(z[j - 1]);
              break;
            case "C":
              g = parseInt(re[A].slice(1)) - 1, z[g] || (z[g] = {});
              break;
            case "R":
              h = parseInt(re[A].slice(1)) - 1, S[h] || (S[h] = {}), J > 0 ? (S[h].hpt = J, S[h].hpx = tn(J)) : J === 0 && (S[h].hidden = !0);
              break;
            default:
              if (d && d.WTF) throw new Error("SYLK bad record " + H);
          }
          O < 1 && (V = null);
          break;
        default:
          if (d && d.WTF) throw new Error("SYLK bad record " + H);
      }
    }
    return S.length > 0 && (N["!rows"] = S), z.length > 0 && (N["!cols"] = z), d && d.sheetRows && (k = k.slice(0, d.sheetRows)), [k, N];
  }
  function s(x, d) {
    var v = n(x, d), h = v[0], g = v[1], T = sn(h, d);
    return gr(g).forEach(function(A) {
      T[A] = g[A];
    }), T;
  }
  function f(x, d) {
    return ca(s(x, d), d);
  }
  function c(x, d, v, h) {
    var g = "C;Y" + (v + 1) + ";X" + (h + 1) + ";K";
    switch (x.t) {
      case "n":
        g += x.v || 0, x.f && !x.F && (g += ";E" + Yi(x.f, { r: v, c: h }));
        break;
      case "b":
        g += x.v ? "TRUE" : "FALSE";
        break;
      case "e":
        g += x.w || x.v;
        break;
      case "d":
        g += '"' + (x.w || x.v) + '"';
        break;
      case "s":
        g += '"' + x.v.replace(/"/g, "").replace(/;/g, ";;") + '"';
        break;
    }
    return g;
  }
  function l(x, d) {
    d.forEach(function(v, h) {
      var g = "F;W" + (h + 1) + " " + (h + 1) + " ";
      v.hidden ? g += "0" : (typeof v.width == "number" && !v.wpx && (v.wpx = Ln(v.width)), typeof v.wpx == "number" && !v.wch && (v.wch = Pn(v.wpx)), typeof v.wch == "number" && (g += Math.round(v.wch))), g.charAt(g.length - 1) != " " && x.push(g);
    });
  }
  function o(x, d) {
    d.forEach(function(v, h) {
      var g = "F;";
      v.hidden ? g += "M0;" : v.hpt ? g += "M" + 20 * v.hpt + ";" : v.hpx && (g += "M" + 20 * Bn(v.hpx) + ";"), g.length > 2 && x.push(g + "R" + (h + 1));
    });
  }
  function u(x, d) {
    var v = ["ID;PWXL;N;E"], h = [], g = $e(x["!ref"]), T, A = Array.isArray(x), k = `\r
`;
    v.push("P;PGeneral"), v.push("F;P0;DG0G8;M255"), x["!cols"] && l(v, x["!cols"]), x["!rows"] && o(v, x["!rows"]), v.push("B;Y" + (g.e.r - g.s.r + 1) + ";X" + (g.e.c - g.s.c + 1) + ";D" + [g.s.c, g.s.r, g.e.c, g.e.r].join(" "));
    for (var R = g.s.r; R <= g.e.r; ++R)
      for (var V = g.s.c; V <= g.e.c; ++V) {
        var N = Ce({ r: R, c: V });
        T = A ? (x[R] || [])[V] : x[N], !(!T || T.v == null && (!T.f || T.F)) && h.push(c(T, x, R, V));
      }
    return v.join(k) + k + h.join(k) + k + "E" + k;
  }
  return {
    to_workbook: f,
    to_sheet: s,
    from_sheet: u
  };
}(), Hc = /* @__PURE__ */ function() {
  function e(i, s) {
    switch (s.type) {
      case "base64":
        return t(xt(i), s);
      case "binary":
        return t(i, s);
      case "buffer":
        return t(We && Buffer.isBuffer(i) ? i.toString("binary") : fa(i), s);
      case "array":
        return t(ya(i), s);
    }
    throw new Error("Unrecognized type " + s.type);
  }
  function t(i, s) {
    for (var f = i.split(`
`), c = -1, l = -1, o = 0, u = []; o !== f.length; ++o) {
      if (f[o].trim() === "BOT") {
        u[++c] = [], l = 0;
        continue;
      }
      if (!(c < 0)) {
        var x = f[o].trim().split(","), d = x[0], v = x[1];
        ++o;
        for (var h = f[o] || ""; (h.match(/["]/g) || []).length & 1 && o < f.length - 1; ) h += `
` + f[++o];
        switch (h = h.trim(), +d) {
          case -1:
            if (h === "BOT") {
              u[++c] = [], l = 0;
              continue;
            } else if (h !== "EOD") throw new Error("Unrecognized DIF special command " + h);
            break;
          case 0:
            h === "TRUE" ? u[c][l] = !0 : h === "FALSE" ? u[c][l] = !1 : isNaN(Lt(v)) ? isNaN(en(v).getDate()) ? u[c][l] = v : u[c][l] = nr(v) : u[c][l] = Lt(v), ++l;
            break;
          case 1:
            h = h.slice(1, h.length - 1), h = h.replace(/""/g, '"'), h && h.match(/^=".*"$/) && (h = h.slice(2, -1)), u[c][l++] = h !== "" ? h : null;
            break;
        }
        if (h === "EOD") break;
      }
    }
    return s && s.sheetRows && (u = u.slice(0, s.sheetRows)), u;
  }
  function r(i, s) {
    return sn(e(i, s), s);
  }
  function a(i, s) {
    return ca(r(i, s), s);
  }
  var n = /* @__PURE__ */ function() {
    var i = function(c, l, o, u, x) {
      c.push(l), c.push(o + "," + u), c.push('"' + x.replace(/"/g, '""') + '"');
    }, s = function(c, l, o, u) {
      c.push(l + "," + o), c.push(l == 1 ? '"' + u.replace(/"/g, '""') + '"' : u);
    };
    return function(c) {
      var l = [], o = $e(c["!ref"]), u, x = Array.isArray(c);
      i(l, "TABLE", 0, 1, "sheetjs"), i(l, "VECTORS", 0, o.e.r - o.s.r + 1, ""), i(l, "TUPLES", 0, o.e.c - o.s.c + 1, ""), i(l, "DATA", 0, 0, "");
      for (var d = o.s.r; d <= o.e.r; ++d) {
        s(l, -1, 0, "BOT");
        for (var v = o.s.c; v <= o.e.c; ++v) {
          var h = Ce({ r: d, c: v });
          if (u = x ? (c[d] || [])[v] : c[h], !u) {
            s(l, 1, 0, "");
            continue;
          }
          switch (u.t) {
            case "n":
              var g = u.w;
              !g && u.v != null && (g = u.v), g == null ? u.f && !u.F ? s(l, 1, 0, "=" + u.f) : s(l, 1, 0, "") : s(l, 0, g, "V");
              break;
            case "b":
              s(l, 0, u.v ? 1 : 0, u.v ? "TRUE" : "FALSE");
              break;
            case "s":
              s(l, 1, 0, isNaN(u.v) ? u.v : '="' + u.v + '"');
              break;
            case "d":
              u.w || (u.w = Ft(u.z || Fe[14], Ar(nr(u.v)))), s(l, 0, u.w, "V");
              break;
            default:
              s(l, 1, 0, "");
          }
        }
      }
      s(l, -1, 0, "EOD");
      var T = `\r
`, A = l.join(T);
      return A;
    };
  }();
  return {
    to_workbook: a,
    to_sheet: r,
    from_sheet: n
  };
}(), Xc = /* @__PURE__ */ function() {
  function e(u) {
    return u.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, `
`);
  }
  function t(u) {
    return u.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n");
  }
  function r(u, x) {
    for (var d = u.split(`
`), v = -1, h = -1, g = 0, T = []; g !== d.length; ++g) {
      var A = d[g].trim().split(":");
      if (A[0] === "cell") {
        var k = hr(A[1]);
        if (T.length <= k.r) for (v = T.length; v <= k.r; ++v) T[v] || (T[v] = []);
        switch (v = k.r, h = k.c, A[2]) {
          case "t":
            T[v][h] = e(A[3]);
            break;
          case "v":
            T[v][h] = +A[3];
            break;
          case "vtf":
            var R = A[A.length - 1];
          case "vtc":
            switch (A[3]) {
              case "nl":
                T[v][h] = !!+A[4];
                break;
              default:
                T[v][h] = +A[4];
                break;
            }
            A[2] == "vtf" && (T[v][h] = [T[v][h], R]);
        }
      }
    }
    return x && x.sheetRows && (T = T.slice(0, x.sheetRows)), T;
  }
  function a(u, x) {
    return sn(r(u, x), x);
  }
  function n(u, x) {
    return ca(a(u, x), x);
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
`), c = "--SocialCalcSpreadsheetControlSave--";
  function l(u) {
    if (!u || !u["!ref"]) return "";
    for (var x = [], d = [], v, h = "", g = st(u["!ref"]), T = Array.isArray(u), A = g.s.r; A <= g.e.r; ++A)
      for (var k = g.s.c; k <= g.e.c; ++k)
        if (h = Ce({ r: A, c: k }), v = T ? (u[A] || [])[k] : u[h], !(!v || v.v == null || v.t === "z")) {
          switch (d = ["cell", h, "t"], v.t) {
            case "s":
            case "str":
              d.push(t(v.v));
              break;
            case "n":
              v.f ? (d[2] = "vtf", d[3] = "n", d[4] = v.v, d[5] = t(v.f)) : (d[2] = "v", d[3] = v.v);
              break;
            case "b":
              d[2] = "vt" + (v.f ? "f" : "c"), d[3] = "nl", d[4] = v.v ? "1" : "0", d[5] = t(v.f || (v.v ? "TRUE" : "FALSE"));
              break;
            case "d":
              var R = Ar(nr(v.v));
              d[2] = "vtc", d[3] = "nd", d[4] = "" + R, d[5] = v.w || Ft(v.z || Fe[14], R);
              break;
            case "e":
              continue;
          }
          x.push(d.join(":"));
        }
    return x.push("sheet:c:" + (g.e.c - g.s.c + 1) + ":r:" + (g.e.r - g.s.r + 1) + ":tvf:1"), x.push("valueformat:1:text-wiki"), x.join(`
`);
  }
  function o(u) {
    return [i, s, f, s, l(u), c].join(`
`);
  }
  return {
    to_workbook: n,
    to_sheet: a,
    from_sheet: o
  };
}(), rn = /* @__PURE__ */ function() {
  function e(o, u, x, d, v) {
    v.raw ? u[x][d] = o : o === "" || (o === "TRUE" ? u[x][d] = !0 : o === "FALSE" ? u[x][d] = !1 : isNaN(Lt(o)) ? isNaN(en(o).getDate()) ? u[x][d] = o : u[x][d] = nr(o) : u[x][d] = Lt(o));
  }
  function t(o, u) {
    var x = u || {}, d = [];
    if (!o || o.length === 0) return d;
    for (var v = o.split(/[\r\n]/), h = v.length - 1; h >= 0 && v[h].length === 0; ) --h;
    for (var g = 10, T = 0, A = 0; A <= h; ++A)
      T = v[A].indexOf(" "), T == -1 ? T = v[A].length : T++, g = Math.max(g, T);
    for (A = 0; A <= h; ++A) {
      d[A] = [];
      var k = 0;
      for (e(v[A].slice(0, g).trim(), d, A, k, x), k = 1; k <= (v[A].length - g) / 10 + 1; ++k)
        e(v[A].slice(g + (k - 1) * 10, g + k * 10).trim(), d, A, k, x);
    }
    return x.sheetRows && (d = d.slice(0, x.sheetRows)), d;
  }
  var r = {
    /*::[*/
    44: ",",
    /*::[*/
    9: "	",
    /*::[*/
    59: ";",
    /*::[*/
    124: "|"
  }, a = {
    /*::[*/
    44: 3,
    /*::[*/
    9: 2,
    /*::[*/
    59: 1,
    /*::[*/
    124: 0
  };
  function n(o) {
    for (var u = {}, x = !1, d = 0, v = 0; d < o.length; ++d)
      (v = o.charCodeAt(d)) == 34 ? x = !x : !x && v in r && (u[v] = (u[v] || 0) + 1);
    v = [];
    for (d in u) Object.prototype.hasOwnProperty.call(u, d) && v.push([u[d], d]);
    if (!v.length) {
      u = a;
      for (d in u) Object.prototype.hasOwnProperty.call(u, d) && v.push([u[d], d]);
    }
    return v.sort(function(h, g) {
      return h[0] - g[0] || a[h[1]] - a[g[1]];
    }), r[v.pop()[1]] || 44;
  }
  function i(o, u) {
    var x = u || {}, d = "", v = x.dense ? [] : {}, h = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    o.slice(0, 4) == "sep=" ? o.charCodeAt(5) == 13 && o.charCodeAt(6) == 10 ? (d = o.charAt(4), o = o.slice(7)) : o.charCodeAt(5) == 13 || o.charCodeAt(5) == 10 ? (d = o.charAt(4), o = o.slice(6)) : d = n(o.slice(0, 1024)) : x && x.FS ? d = x.FS : d = n(o.slice(0, 1024));
    var g = 0, T = 0, A = 0, k = 0, R = 0, V = d.charCodeAt(0), N = !1, S = 0, z = o.charCodeAt(0);
    o = o.replace(/\r\n/mg, `
`);
    var L = x.dateNF != null ? ko(x.dateNF) : null;
    function J() {
      var j = o.slice(k, R), H = {};
      if (j.charAt(0) == '"' && j.charAt(j.length - 1) == '"' && (j = j.slice(1, -1).replace(/""/g, '"')), j.length === 0) H.t = "z";
      else if (x.raw)
        H.t = "s", H.v = j;
      else if (j.trim().length === 0)
        H.t = "s", H.v = j;
      else if (j.charCodeAt(0) == 61)
        j.charCodeAt(1) == 34 && j.charCodeAt(j.length - 1) == 34 ? (H.t = "s", H.v = j.slice(2, -1).replace(/""/g, '"')) : Jd(j) ? (H.t = "n", H.f = j.slice(1)) : (H.t = "s", H.v = j);
      else if (j == "TRUE")
        H.t = "b", H.v = !0;
      else if (j == "FALSE")
        H.t = "b", H.v = !1;
      else if (!isNaN(A = Lt(j)))
        H.t = "n", x.cellText !== !1 && (H.w = j), H.v = A;
      else if (!isNaN(en(j).getDate()) || L && j.match(L)) {
        H.z = x.dateNF || Fe[14];
        var re = 0;
        L && j.match(L) && (j = Eo(j, x.dateNF, j.match(L) || []), re = 1), x.cellDates ? (H.t = "d", H.v = nr(j, re)) : (H.t = "n", H.v = Ar(nr(j, re))), x.cellText !== !1 && (H.w = Ft(H.z, H.v instanceof Date ? Ar(H.v) : H.v)), x.cellNF || delete H.z;
      } else
        H.t = "s", H.v = j;
      if (H.t == "z" || (x.dense ? (v[g] || (v[g] = []), v[g][T] = H) : v[Ce({ c: T, r: g })] = H), k = R + 1, z = o.charCodeAt(k), h.e.c < T && (h.e.c = T), h.e.r < g && (h.e.r = g), S == V) ++T;
      else if (T = 0, ++g, x.sheetRows && x.sheetRows <= g) return !0;
    }
    e: for (; R < o.length; ++R) switch (S = o.charCodeAt(R)) {
      case 34:
        z === 34 && (N = !N);
        break;
      case V:
      case 10:
      case 13:
        if (!N && J()) break e;
        break;
    }
    return R - k > 0 && J(), v["!ref"] = Ne(h), v;
  }
  function s(o, u) {
    return !(u && u.PRN) || u.FS || o.slice(0, 4) == "sep=" || o.indexOf("	") >= 0 || o.indexOf(",") >= 0 || o.indexOf(";") >= 0 ? i(o, u) : sn(t(o, u), u);
  }
  function f(o, u) {
    var x = "", d = u.type == "string" ? [0, 0, 0, 0] : as(o, u);
    switch (u.type) {
      case "base64":
        x = xt(o);
        break;
      case "binary":
        x = o;
        break;
      case "buffer":
        u.codepage == 65001 ? x = o.toString("utf8") : u.codepage && typeof An < "u" || (x = We && Buffer.isBuffer(o) ? o.toString("binary") : fa(o));
        break;
      case "array":
        x = ya(o);
        break;
      case "string":
        x = o;
        break;
      default:
        throw new Error("Unrecognized type " + u.type);
    }
    return d[0] == 239 && d[1] == 187 && d[2] == 191 ? x = tr(x.slice(3)) : u.type != "string" && u.type != "buffer" && u.codepage == 65001 ? x = tr(x) : u.type == "binary" && typeof An < "u", x.slice(0, 19) == "socialcalc:version:" ? Xc.to_sheet(u.type == "string" ? x : tr(x), u) : s(x, u);
  }
  function c(o, u) {
    return ca(f(o, u), u);
  }
  function l(o) {
    for (var u = [], x = $e(o["!ref"]), d, v = Array.isArray(o), h = x.s.r; h <= x.e.r; ++h) {
      for (var g = [], T = x.s.c; T <= x.e.c; ++T) {
        var A = Ce({ r: h, c: T });
        if (d = v ? (o[h] || [])[T] : o[A], !d || d.v == null) {
          g.push("          ");
          continue;
        }
        for (var k = (d.w || (Jt(d), d.w) || "").slice(0, 10); k.length < 10; ) k += " ";
        g.push(k + (T === 0 ? " " : ""));
      }
      u.push(g.join(""));
    }
    return u.join(`
`);
  }
  return {
    to_workbook: c,
    to_sheet: f,
    from_sheet: l
  };
}();
function P1(e, t) {
  var r = t || {}, a = !!r.WTF;
  r.WTF = !0;
  try {
    var n = Vc.to_workbook(e, r);
    return r.WTF = a, n;
  } catch (i) {
    if (r.WTF = a, !i.message.match(/SYLK bad record ID/) && a) throw i;
    return rn.to_workbook(e, t);
  }
}
var ka = /* @__PURE__ */ function() {
  function e(C, M, O) {
    if (C) {
      Mr(C, C.l || 0);
      for (var P = O.Enum || pe; C.l < C.length; ) {
        var Q = C.read_shift(2), fe = P[Q] || P[65535], ce = C.read_shift(2), ie = C.l + ce, ne = fe.f && fe.f(C, ce, O);
        if (C.l = ie, M(ne, fe, Q)) return;
      }
    }
  }
  function t(C, M) {
    switch (M.type) {
      case "base64":
        return r(ut(xt(C)), M);
      case "binary":
        return r(ut(C), M);
      case "buffer":
      case "array":
        return r(C, M);
    }
    throw "Unsupported type " + M.type;
  }
  function r(C, M) {
    if (!C) return C;
    var O = M || {}, P = O.dense ? [] : {}, Q = "Sheet1", fe = "", ce = 0, ie = {}, ne = [], Ie = [], F = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, rr = O.sheetRows || 0;
    if (C[2] == 0 && (C[3] == 8 || C[3] == 9) && C.length >= 16 && C[14] == 5 && C[15] === 108)
      throw new Error("Unsupported Works 3 for Mac file");
    if (C[2] == 2)
      O.Enum = pe, e(C, function(le, sr, Wr) {
        switch (Wr) {
          case 0:
            O.vers = le, le >= 4096 && (O.qpro = !0);
            break;
          case 6:
            F = le;
            break;
          case 204:
            le && (fe = le);
            break;
          case 222:
            fe = le;
            break;
          case 15:
          case 51:
            O.qpro || (le[1].v = le[1].v.slice(1));
          case 13:
          case 14:
          case 16:
            Wr == 14 && (le[2] & 112) == 112 && (le[2] & 15) > 1 && (le[2] & 15) < 15 && (le[1].z = O.dateNF || Fe[14], O.cellDates && (le[1].t = "d", le[1].v = A0(le[1].v))), O.qpro && le[3] > ce && (P["!ref"] = Ne(F), ie[Q] = P, ne.push(Q), P = O.dense ? [] : {}, F = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, ce = le[3], Q = fe || "Sheet" + (ce + 1), fe = "");
            var Or = O.dense ? (P[le[0].r] || [])[le[0].c] : P[Ce(le[0])];
            if (Or) {
              Or.t = le[1].t, Or.v = le[1].v, le[1].z != null && (Or.z = le[1].z), le[1].f != null && (Or.f = le[1].f);
              break;
            }
            O.dense ? (P[le[0].r] || (P[le[0].r] = []), P[le[0].r][le[0].c] = le[1]) : P[Ce(le[0])] = le[1];
            break;
        }
      }, O);
    else if (C[2] == 26 || C[2] == 14)
      O.Enum = we, C[2] == 14 && (O.qpro = !0, C.l = 0), e(C, function(le, sr, Wr) {
        switch (Wr) {
          case 204:
            Q = le;
            break;
          case 22:
            le[1].v = le[1].v.slice(1);
          case 23:
          case 24:
          case 25:
          case 37:
          case 39:
          case 40:
            if (le[3] > ce && (P["!ref"] = Ne(F), ie[Q] = P, ne.push(Q), P = O.dense ? [] : {}, F = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, ce = le[3], Q = "Sheet" + (ce + 1)), rr > 0 && le[0].r >= rr) break;
            O.dense ? (P[le[0].r] || (P[le[0].r] = []), P[le[0].r][le[0].c] = le[1]) : P[Ce(le[0])] = le[1], F.e.c < le[0].c && (F.e.c = le[0].c), F.e.r < le[0].r && (F.e.r = le[0].r);
            break;
          case 27:
            le[14e3] && (Ie[le[14e3][0]] = le[14e3][1]);
            break;
          case 1537:
            Ie[le[0]] = le[1], le[0] == ce && (Q = le[1]);
            break;
        }
      }, O);
    else throw new Error("Unrecognized LOTUS BOF " + C[2]);
    if (P["!ref"] = Ne(F), ie[fe || Q] = P, ne.push(fe || Q), !Ie.length) return { SheetNames: ne, Sheets: ie };
    for (var He = {}, Je = [], Re = 0; Re < Ie.length; ++Re) ie[ne[Re]] ? (Je.push(Ie[Re] || ne[Re]), He[Ie[Re]] = ie[Ie[Re]] || ie[ne[Re]]) : (Je.push(Ie[Re]), He[Ie[Re]] = { "!ref": "A1" });
    return { SheetNames: Je, Sheets: He };
  }
  function a(C, M) {
    var O = M || {};
    if (+O.codepage >= 0 && Nt(+O.codepage), O.type == "string") throw new Error("Cannot write WK1 to JS string");
    var P = it(), Q = $e(C["!ref"]), fe = Array.isArray(C), ce = [];
    ue(P, 0, i(1030)), ue(P, 6, c(Q));
    for (var ie = Math.min(Q.e.r, 8191), ne = Q.s.r; ne <= ie; ++ne)
      for (var Ie = wr(ne), F = Q.s.c; F <= Q.e.c; ++F) {
        ne === Q.s.r && (ce[F] = ur(F));
        var rr = ce[F] + Ie, He = fe ? (C[ne] || [])[F] : C[rr];
        if (!(!He || He.t == "z"))
          if (He.t == "n")
            (He.v | 0) == He.v && He.v >= -32768 && He.v <= 32767 ? ue(P, 13, d(ne, F, He.v)) : ue(P, 14, h(ne, F, He.v));
          else {
            var Je = Jt(He);
            ue(P, 15, u(ne, F, Je.slice(0, 239)));
          }
      }
    return ue(P, 1), P.end();
  }
  function n(C, M) {
    var O = M || {};
    if (+O.codepage >= 0 && Nt(+O.codepage), O.type == "string") throw new Error("Cannot write WK3 to JS string");
    var P = it();
    ue(P, 0, s(C));
    for (var Q = 0, fe = 0; Q < C.SheetNames.length; ++Q) (C.Sheets[C.SheetNames[Q]] || {})["!ref"] && ue(P, 27, K(C.SheetNames[Q], fe++));
    var ce = 0;
    for (Q = 0; Q < C.SheetNames.length; ++Q) {
      var ie = C.Sheets[C.SheetNames[Q]];
      if (!(!ie || !ie["!ref"])) {
        for (var ne = $e(ie["!ref"]), Ie = Array.isArray(ie), F = [], rr = Math.min(ne.e.r, 8191), He = ne.s.r; He <= rr; ++He)
          for (var Je = wr(He), Re = ne.s.c; Re <= ne.e.c; ++Re) {
            He === ne.s.r && (F[Re] = ur(Re));
            var le = F[Re] + Je, sr = Ie ? (ie[He] || [])[Re] : ie[le];
            if (!(!sr || sr.t == "z"))
              if (sr.t == "n")
                ue(P, 23, J(He, Re, ce, sr.v));
              else {
                var Wr = Jt(sr);
                ue(P, 22, S(He, Re, ce, Wr.slice(0, 239)));
              }
          }
        ++ce;
      }
    }
    return ue(P, 1), P.end();
  }
  function i(C) {
    var M = Z(2);
    return M.write_shift(2, C), M;
  }
  function s(C) {
    var M = Z(26);
    M.write_shift(2, 4096), M.write_shift(2, 4), M.write_shift(4, 0);
    for (var O = 0, P = 0, Q = 0, fe = 0; fe < C.SheetNames.length; ++fe) {
      var ce = C.SheetNames[fe], ie = C.Sheets[ce];
      if (!(!ie || !ie["!ref"])) {
        ++Q;
        var ne = st(ie["!ref"]);
        O < ne.e.r && (O = ne.e.r), P < ne.e.c && (P = ne.e.c);
      }
    }
    return O > 8191 && (O = 8191), M.write_shift(2, O), M.write_shift(1, Q), M.write_shift(1, P), M.write_shift(2, 0), M.write_shift(2, 0), M.write_shift(1, 1), M.write_shift(1, 2), M.write_shift(4, 0), M.write_shift(4, 0), M;
  }
  function f(C, M, O) {
    var P = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    return M == 8 && O.qpro ? (P.s.c = C.read_shift(1), C.l++, P.s.r = C.read_shift(2), P.e.c = C.read_shift(1), C.l++, P.e.r = C.read_shift(2), P) : (P.s.c = C.read_shift(2), P.s.r = C.read_shift(2), M == 12 && O.qpro && (C.l += 2), P.e.c = C.read_shift(2), P.e.r = C.read_shift(2), M == 12 && O.qpro && (C.l += 2), P.s.c == 65535 && (P.s.c = P.e.c = P.s.r = P.e.r = 0), P);
  }
  function c(C) {
    var M = Z(8);
    return M.write_shift(2, C.s.c), M.write_shift(2, C.s.r), M.write_shift(2, C.e.c), M.write_shift(2, C.e.r), M;
  }
  function l(C, M, O) {
    var P = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0, 0];
    return O.qpro && O.vers != 20768 ? (P[0].c = C.read_shift(1), P[3] = C.read_shift(1), P[0].r = C.read_shift(2), C.l += 2) : (P[2] = C.read_shift(1), P[0].c = C.read_shift(2), P[0].r = C.read_shift(2)), P;
  }
  function o(C, M, O) {
    var P = C.l + M, Q = l(C, M, O);
    if (Q[1].t = "s", O.vers == 20768) {
      C.l++;
      var fe = C.read_shift(1);
      return Q[1].v = C.read_shift(fe, "utf8"), Q;
    }
    return O.qpro && C.l++, Q[1].v = C.read_shift(P - C.l, "cstr"), Q;
  }
  function u(C, M, O) {
    var P = Z(7 + O.length);
    P.write_shift(1, 255), P.write_shift(2, M), P.write_shift(2, C), P.write_shift(1, 39);
    for (var Q = 0; Q < P.length; ++Q) {
      var fe = O.charCodeAt(Q);
      P.write_shift(1, fe >= 128 ? 95 : fe);
    }
    return P.write_shift(1, 0), P;
  }
  function x(C, M, O) {
    var P = l(C, M, O);
    return P[1].v = C.read_shift(2, "i"), P;
  }
  function d(C, M, O) {
    var P = Z(7);
    return P.write_shift(1, 255), P.write_shift(2, M), P.write_shift(2, C), P.write_shift(2, O, "i"), P;
  }
  function v(C, M, O) {
    var P = l(C, M, O);
    return P[1].v = C.read_shift(8, "f"), P;
  }
  function h(C, M, O) {
    var P = Z(13);
    return P.write_shift(1, 255), P.write_shift(2, M), P.write_shift(2, C), P.write_shift(8, O, "f"), P;
  }
  function g(C, M, O) {
    var P = C.l + M, Q = l(C, M, O);
    if (Q[1].v = C.read_shift(8, "f"), O.qpro) C.l = P;
    else {
      var fe = C.read_shift(2);
      R(C.slice(C.l, C.l + fe), Q), C.l += fe;
    }
    return Q;
  }
  function T(C, M, O) {
    var P = M & 32768;
    return M &= -32769, M = (P ? C : 0) + (M >= 8192 ? M - 16384 : M), (P ? "" : "$") + (O ? ur(M) : wr(M));
  }
  var A = {
    51: ["FALSE", 0],
    52: ["TRUE", 0],
    70: ["LEN", 1],
    80: ["SUM", 69],
    81: ["AVERAGEA", 69],
    82: ["COUNTA", 69],
    83: ["MINA", 69],
    84: ["MAXA", 69],
    111: ["T", 1]
  }, k = [
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
  function R(C, M) {
    Mr(C, 0);
    for (var O = [], P = 0, Q = "", fe = "", ce = "", ie = ""; C.l < C.length; ) {
      var ne = C[C.l++];
      switch (ne) {
        case 0:
          O.push(C.read_shift(8, "f"));
          break;
        case 1:
          fe = T(M[0].c, C.read_shift(2), !0), Q = T(M[0].r, C.read_shift(2), !1), O.push(fe + Q);
          break;
        case 2:
          {
            var Ie = T(M[0].c, C.read_shift(2), !0), F = T(M[0].r, C.read_shift(2), !1);
            fe = T(M[0].c, C.read_shift(2), !0), Q = T(M[0].r, C.read_shift(2), !1), O.push(Ie + F + ":" + fe + Q);
          }
          break;
        case 3:
          if (C.l < C.length) {
            console.error("WK1 premature formula end");
            return;
          }
          break;
        case 4:
          O.push("(" + O.pop() + ")");
          break;
        case 5:
          O.push(C.read_shift(2));
          break;
        case 6:
          {
            for (var rr = ""; ne = C[C.l++]; ) rr += String.fromCharCode(ne);
            O.push('"' + rr.replace(/"/g, '""') + '"');
          }
          break;
        case 8:
          O.push("-" + O.pop());
          break;
        case 23:
          O.push("+" + O.pop());
          break;
        case 22:
          O.push("NOT(" + O.pop() + ")");
          break;
        case 20:
        case 21:
          ie = O.pop(), ce = O.pop(), O.push(["AND", "OR"][ne - 20] + "(" + ce + "," + ie + ")");
          break;
        default:
          if (ne < 32 && k[ne])
            ie = O.pop(), ce = O.pop(), O.push(ce + k[ne] + ie);
          else if (A[ne]) {
            if (P = A[ne][1], P == 69 && (P = C[C.l++]), P > O.length) {
              console.error("WK1 bad formula parse 0x" + ne.toString(16) + ":|" + O.join("|") + "|");
              return;
            }
            var He = O.slice(-P);
            O.length -= P, O.push(A[ne][0] + "(" + He.join(",") + ")");
          } else return ne <= 7 ? console.error("WK1 invalid opcode " + ne.toString(16)) : ne <= 24 ? console.error("WK1 unsupported op " + ne.toString(16)) : ne <= 30 ? console.error("WK1 invalid opcode " + ne.toString(16)) : ne <= 115 ? console.error("WK1 unsupported function opcode " + ne.toString(16)) : console.error("WK1 unrecognized opcode " + ne.toString(16));
      }
    }
    O.length == 1 ? M[1].f = "" + O[0] : console.error("WK1 bad formula parse |" + O.join("|") + "|");
  }
  function V(C) {
    var M = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0];
    return M[0].r = C.read_shift(2), M[3] = C[C.l++], M[0].c = C[C.l++], M;
  }
  function N(C, M) {
    var O = V(C);
    return O[1].t = "s", O[1].v = C.read_shift(M - 4, "cstr"), O;
  }
  function S(C, M, O, P) {
    var Q = Z(6 + P.length);
    Q.write_shift(2, C), Q.write_shift(1, O), Q.write_shift(1, M), Q.write_shift(1, 39);
    for (var fe = 0; fe < P.length; ++fe) {
      var ce = P.charCodeAt(fe);
      Q.write_shift(1, ce >= 128 ? 95 : ce);
    }
    return Q.write_shift(1, 0), Q;
  }
  function z(C, M) {
    var O = V(C);
    O[1].v = C.read_shift(2);
    var P = O[1].v >> 1;
    if (O[1].v & 1)
      switch (P & 7) {
        case 0:
          P = (P >> 3) * 5e3;
          break;
        case 1:
          P = (P >> 3) * 500;
          break;
        case 2:
          P = (P >> 3) / 20;
          break;
        case 3:
          P = (P >> 3) / 200;
          break;
        case 4:
          P = (P >> 3) / 2e3;
          break;
        case 5:
          P = (P >> 3) / 2e4;
          break;
        case 6:
          P = (P >> 3) / 16;
          break;
        case 7:
          P = (P >> 3) / 64;
          break;
      }
    return O[1].v = P, O;
  }
  function L(C, M) {
    var O = V(C), P = C.read_shift(4), Q = C.read_shift(4), fe = C.read_shift(2);
    if (fe == 65535)
      return P === 0 && Q === 3221225472 ? (O[1].t = "e", O[1].v = 15) : P === 0 && Q === 3489660928 ? (O[1].t = "e", O[1].v = 42) : O[1].v = 0, O;
    var ce = fe & 32768;
    return fe = (fe & 32767) - 16446, O[1].v = (1 - ce * 2) * (Q * Math.pow(2, fe + 32) + P * Math.pow(2, fe)), O;
  }
  function J(C, M, O, P) {
    var Q = Z(14);
    if (Q.write_shift(2, C), Q.write_shift(1, O), Q.write_shift(1, M), P == 0)
      return Q.write_shift(4, 0), Q.write_shift(4, 0), Q.write_shift(2, 65535), Q;
    var fe = 0, ce = 0, ie = 0, ne = 0;
    return P < 0 && (fe = 1, P = -P), ce = Math.log2(P) | 0, P /= Math.pow(2, ce - 31), ne = P >>> 0, ne & 2147483648 || (P /= 2, ++ce, ne = P >>> 0), P -= ne, ne |= 2147483648, ne >>>= 0, P *= Math.pow(2, 32), ie = P >>> 0, Q.write_shift(4, ie), Q.write_shift(4, ne), ce += 16383 + (fe ? 32768 : 0), Q.write_shift(2, ce), Q;
  }
  function j(C, M) {
    var O = L(C);
    return C.l += M - 14, O;
  }
  function H(C, M) {
    var O = V(C), P = C.read_shift(4);
    return O[1].v = P >> 6, O;
  }
  function re(C, M) {
    var O = V(C), P = C.read_shift(8, "f");
    return O[1].v = P, O;
  }
  function me(C, M) {
    var O = re(C);
    return C.l += M - 10, O;
  }
  function xe(C, M) {
    return C[C.l + M - 1] == 0 ? C.read_shift(M, "cstr") : "";
  }
  function ve(C, M) {
    var O = C[C.l++];
    O > M - 1 && (O = M - 1);
    for (var P = ""; P.length < O; ) P += String.fromCharCode(C[C.l++]);
    return P;
  }
  function de(C, M, O) {
    if (!(!O.qpro || M < 21)) {
      var P = C.read_shift(1);
      C.l += 17, C.l += 1, C.l += 2;
      var Q = C.read_shift(M - 21, "cstr");
      return [P, Q];
    }
  }
  function Xe(C, M) {
    for (var O = {}, P = C.l + M; C.l < P; ) {
      var Q = C.read_shift(2);
      if (Q == 14e3) {
        for (O[Q] = [0, ""], O[Q][0] = C.read_shift(2); C[C.l]; )
          O[Q][1] += String.fromCharCode(C[C.l]), C.l++;
        C.l++;
      }
    }
    return O;
  }
  function K(C, M) {
    var O = Z(5 + C.length);
    O.write_shift(2, 14e3), O.write_shift(2, M);
    for (var P = 0; P < C.length; ++P) {
      var Q = C.charCodeAt(P);
      O[O.l++] = Q > 127 ? 95 : Q;
    }
    return O[O.l++] = 0, O;
  }
  var pe = {
    /*::[*/
    0: { n: "BOF", f: yr },
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
    13: { n: "INTEGER", f: x },
    /*::[*/
    14: { n: "NUMBER", f: v },
    /*::[*/
    15: { n: "LABEL", f: o },
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
    51: { n: "STRING", f: o },
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
    204: { n: "SHEETNAMECS", f: xe },
    /*::[*/
    222: { n: "SHEETNAMELP", f: ve },
    /*::[*/
    65535: { n: "" }
  }, we = {
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
    22: { n: "LABEL16", f: N },
    /*::[*/
    23: { n: "NUMBER17", f: L },
    /*::[*/
    24: { n: "NUMBER18", f: z },
    /*::[*/
    25: { n: "FORMULA19", f: j },
    /*::[*/
    26: { n: "FORMULA1A" },
    /*::[*/
    27: { n: "XFORMAT", f: Xe },
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
    37: { n: "NUMBER25", f: H },
    /*::[*/
    38: { n: "??" },
    /*::[*/
    39: { n: "NUMBER27", f: re },
    /*::[*/
    40: { n: "FORMULA28", f: me },
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
    204: { n: "SHEETNAMECS", f: xe },
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
    1537: { n: "SHEETINFOQP", f: de },
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
    sheet_to_wk1: a,
    book_to_wk3: n,
    to_workbook: t
  };
}();
function B1(e) {
  var t = {}, r = e.match(Jr), a = 0, n = !1;
  if (r) for (; a != r.length; ++a) {
    var i = be(r[a]);
    switch (i[0].replace(/\w*:/g, "")) {
      case "<condense":
        break;
      case "<extend":
        break;
      case "<shadow":
        if (!i.val) break;
      case "<shadow>":
      case "<shadow/>":
        t.shadow = 1;
        break;
      case "</shadow>":
        break;
      case "<charset":
        if (i.val == "1") break;
        t.cp = wi[parseInt(i.val, 10)];
        break;
      case "<outline":
        if (!i.val) break;
      case "<outline>":
      case "<outline/>":
        t.outline = 1;
        break;
      case "</outline>":
        break;
      case "<rFont":
        t.name = i.val;
        break;
      case "<sz":
        t.sz = i.val;
        break;
      case "<strike":
        if (!i.val) break;
      case "<strike>":
      case "<strike/>":
        t.strike = 1;
        break;
      case "</strike>":
        break;
      case "<u":
        if (!i.val) break;
        switch (i.val) {
          case "double":
            t.uval = "double";
            break;
          case "singleAccounting":
            t.uval = "single-accounting";
            break;
          case "doubleAccounting":
            t.uval = "double-accounting";
            break;
        }
      case "<u>":
      case "<u/>":
        t.u = 1;
        break;
      case "</u>":
        break;
      case "<b":
        if (i.val == "0") break;
      case "<b>":
      case "<b/>":
        t.b = 1;
        break;
      case "</b>":
        break;
      case "<i":
        if (i.val == "0") break;
      case "<i>":
      case "<i/>":
        t.i = 1;
        break;
      case "</i>":
        break;
      case "<color":
        i.rgb && (t.color = i.rgb.slice(2, 8));
        break;
      case "<color>":
      case "<color/>":
      case "</color>":
        break;
      case "<family":
        t.family = i.val;
        break;
      case "<family>":
      case "<family/>":
      case "</family>":
        break;
      case "<vertAlign":
        t.valign = i.val;
        break;
      case "<vertAlign>":
      case "<vertAlign/>":
      case "</vertAlign>":
        break;
      case "<scheme":
        break;
      case "<scheme>":
      case "<scheme/>":
      case "</scheme>":
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
        break;
      case "<ext":
        n = !0;
        break;
      case "</ext>":
        n = !1;
        break;
      default:
        if (i[0].charCodeAt(1) !== 47 && !n) throw new Error("Unrecognized rich format " + i[0]);
    }
  }
  return t;
}
var M1 = /* @__PURE__ */ function() {
  var e = Dn("t"), t = Dn("rPr");
  function r(i) {
    var s = i.match(e);
    if (!s) return { t: "s", v: "" };
    var f = { t: "s", v: Ge(s[1]) }, c = i.match(t);
    return c && (f.s = B1(c[1])), f;
  }
  var a = /<(?:\w+:)?r>/g, n = /<\/(?:\w+:)?r>/;
  return function(s) {
    return s.replace(a, "").split(n).map(r).filter(function(f) {
      return f.v;
    });
  };
}(), U1 = /* @__PURE__ */ function() {
  var t = /(\r\n|\n)/g;
  function r(n, i, s) {
    var f = [];
    n.u && f.push("text-decoration: underline;"), n.uval && f.push("text-underline-style:" + n.uval + ";"), n.sz && f.push("font-size:" + n.sz + "pt;"), n.outline && f.push("text-effect: outline;"), n.shadow && f.push("text-shadow: auto;"), i.push('<span style="' + f.join("") + '">'), n.b && (i.push("<b>"), s.push("</b>")), n.i && (i.push("<i>"), s.push("</i>")), n.strike && (i.push("<s>"), s.push("</s>"));
    var c = n.valign || "";
    return c == "superscript" || c == "super" ? c = "sup" : c == "subscript" && (c = "sub"), c != "" && (i.push("<" + c + ">"), s.push("</" + c + ">")), s.push("</span>"), n;
  }
  function a(n) {
    var i = [[], n.v, []];
    return n.v ? (n.s && r(n.s, i[0], i[2]), i[0].join("") + i[1].replace(t, "<br/>") + i[2].join("")) : "";
  }
  return function(i) {
    return i.map(a).join("");
  };
}(), W1 = /<(?:\w+:)?t[^>]*>([^<]*)<\/(?:\w+:)?t>/g, V1 = /<(?:\w+:)?r>/, H1 = /<(?:\w+:)?rPh.*?>([\s\S]*?)<\/(?:\w+:)?rPh>/g;
function zi(e, t) {
  var r = t ? t.cellHTML : !0, a = {};
  return e ? (e.match(/^\s*<(?:\w+:)?t[^>]*>/) ? (a.t = Ge(tr(e.slice(e.indexOf(">") + 1).split(/<\/(?:\w+:)?t>/)[0] || "")), a.r = tr(e), r && (a.h = Di(a.t))) : (
    /*y = */
    e.match(V1) && (a.r = tr(e), a.t = Ge(tr((e.replace(H1, "").match(W1) || []).join("").replace(Jr, ""))), r && (a.h = U1(M1(a.r))))
  ), a) : { t: "" };
}
var X1 = /<(?:\w+:)?sst([^>]*)>([\s\S]*)<\/(?:\w+:)?sst>/, z1 = /<(?:\w+:)?(?:si|sstItem)>/g, G1 = /<\/(?:\w+:)?(?:si|sstItem)>/;
function $1(e, t) {
  var r = [], a = "";
  if (!e) return r;
  var n = e.match(X1);
  if (n) {
    a = n[2].replace(z1, "").split(G1);
    for (var i = 0; i != a.length; ++i) {
      var s = zi(a[i].trim(), t);
      s != null && (r[r.length] = s);
    }
    n = be(n[1]), r.Count = n.count, r.Unique = n.uniqueCount;
  }
  return r;
}
var j1 = /^\s|\s$|[\t\n\r]/;
function zc(e, t) {
  if (!t.bookSST) return "";
  var r = [kr];
  r[r.length] = oe("sst", null, {
    xmlns: ba[0],
    count: e.Count,
    uniqueCount: e.Unique
  });
  for (var a = 0; a != e.length; ++a)
    if (e[a] != null) {
      var n = e[a], i = "<si>";
      n.r ? i += n.r : (i += "<t", n.t || (n.t = ""), n.t.match(j1) && (i += ' xml:space="preserve"'), i += ">" + er(n.t) + "</t>"), i += "</si>", r[r.length] = i;
    }
  return r.length > 2 && (r[r.length] = "</sst>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function K1(e) {
  return [e.read_shift(4), e.read_shift(4)];
}
function Y1(e, t) {
  var r = [], a = !1;
  return Zt(e, function(i, s, f) {
    switch (f) {
      case 159:
        r.Count = i[0], r.Unique = i[1];
        break;
      case 19:
        r.push(i);
        break;
      case 160:
        return !0;
      case 35:
        a = !0;
        break;
      case 36:
        a = !1;
        break;
      default:
        if (s.T, !a || t.WTF) throw new Error("Unexpected record 0x" + f.toString(16));
    }
  }), r;
}
function J1(e, t) {
  return t || (t = Z(8)), t.write_shift(4, e.Count), t.write_shift(4, e.Unique), t;
}
var q1 = fu;
function Z1(e) {
  var t = it();
  ee(t, 159, J1(e));
  for (var r = 0; r < e.length; ++r) ee(t, 19, q1(e[r]));
  return ee(
    t,
    160
    /* BrtEndSst */
  ), t.end();
}
function Gc(e) {
  for (var t = [], r = e.split(""), a = 0; a < r.length; ++a) t[a] = r[a].charCodeAt(0);
  return t;
}
function Yt(e, t) {
  var r = {};
  return r.Major = e.read_shift(2), r.Minor = e.read_shift(2), t >= 4 && (e.l += t - 4), r;
}
function Q1(e) {
  var t = {};
  return t.id = e.read_shift(0, "lpp4"), t.R = Yt(e, 4), t.U = Yt(e, 4), t.W = Yt(e, 4), t;
}
function ex(e) {
  for (var t = e.read_shift(4), r = e.l + t - 4, a = {}, n = e.read_shift(4), i = []; n-- > 0; ) i.push({ t: e.read_shift(4), v: e.read_shift(0, "lpp4") });
  if (a.name = e.read_shift(0, "lpp4"), a.comps = i, e.l != r) throw new Error("Bad DataSpaceMapEntry: " + e.l + " != " + r);
  return a;
}
function rx(e) {
  var t = [];
  e.l += 4;
  for (var r = e.read_shift(4); r-- > 0; ) t.push(ex(e));
  return t;
}
function tx(e) {
  var t = [];
  e.l += 4;
  for (var r = e.read_shift(4); r-- > 0; ) t.push(e.read_shift(0, "lpp4"));
  return t;
}
function ax(e) {
  var t = {};
  return e.read_shift(4), e.l += 4, t.id = e.read_shift(0, "lpp4"), t.name = e.read_shift(0, "lpp4"), t.R = Yt(e, 4), t.U = Yt(e, 4), t.W = Yt(e, 4), t;
}
function nx(e) {
  var t = ax(e);
  if (t.ename = e.read_shift(0, "8lpp4"), t.blksz = e.read_shift(4), t.cmode = e.read_shift(4), e.read_shift(4) != 4) throw new Error("Bad !Primary record");
  return t;
}
function $c(e, t) {
  var r = e.l + t, a = {};
  a.Flags = e.read_shift(4) & 63, e.l += 4, a.AlgID = e.read_shift(4);
  var n = !1;
  switch (a.AlgID) {
    case 26126:
    case 26127:
    case 26128:
      n = a.Flags == 36;
      break;
    case 26625:
      n = a.Flags == 4;
      break;
    case 0:
      n = a.Flags == 16 || a.Flags == 4 || a.Flags == 36;
      break;
    default:
      throw "Unrecognized encryption algorithm: " + a.AlgID;
  }
  if (!n) throw new Error("Encryption Flags/AlgID mismatch");
  return a.AlgIDHash = e.read_shift(4), a.KeySize = e.read_shift(4), a.ProviderType = e.read_shift(4), e.l += 8, a.CSPName = e.read_shift(r - e.l >> 1, "utf16le"), e.l = r, a;
}
function jc(e, t) {
  var r = {}, a = e.l + t;
  return e.l += 4, r.Salt = e.slice(e.l, e.l + 16), e.l += 16, r.Verifier = e.slice(e.l, e.l + 16), e.l += 16, e.read_shift(4), r.VerifierHash = e.slice(e.l, a), e.l = a, r;
}
function ix(e) {
  var t = Yt(e);
  switch (t.Minor) {
    case 2:
      return [t.Minor, sx(e)];
    case 3:
      return [t.Minor, fx()];
    case 4:
      return [t.Minor, cx(e)];
  }
  throw new Error("ECMA-376 Encrypted file unrecognized Version: " + t.Minor);
}
function sx(e) {
  var t = e.read_shift(4);
  if ((t & 63) != 36) throw new Error("EncryptionInfo mismatch");
  var r = e.read_shift(4), a = $c(e, r), n = jc(e, e.length - e.l);
  return { t: "Std", h: a, v: n };
}
function fx() {
  throw new Error("File is password-protected: ECMA-376 Extensible");
}
function cx(e) {
  var t = ["saltSize", "blockSize", "keyBits", "hashSize", "cipherAlgorithm", "cipherChaining", "hashAlgorithm", "saltValue"];
  e.l += 4;
  var r = e.read_shift(e.length - e.l, "utf8"), a = {};
  return r.replace(Jr, function(i) {
    var s = be(i);
    switch (Xt(s[0])) {
      case "<?xml":
        break;
      case "<encryption":
      case "</encryption>":
        break;
      case "<keyData":
        t.forEach(function(f) {
          a[f] = s[f];
        });
        break;
      case "<dataIntegrity":
        a.encryptedHmacKey = s.encryptedHmacKey, a.encryptedHmacValue = s.encryptedHmacValue;
        break;
      case "<keyEncryptors>":
      case "<keyEncryptors":
        a.encs = [];
        break;
      case "</keyEncryptors>":
        break;
      case "<keyEncryptor":
        a.uri = s.uri;
        break;
      case "</keyEncryptor>":
        break;
      case "<encryptedKey":
        a.encs.push(s);
        break;
      default:
        throw s[0];
    }
  }), a;
}
function lx(e, t) {
  var r = {}, a = r.EncryptionVersionInfo = Yt(e, 4);
  if (t -= 4, a.Minor != 2) throw new Error("unrecognized minor version code: " + a.Minor);
  if (a.Major > 4 || a.Major < 2) throw new Error("unrecognized major version code: " + a.Major);
  r.Flags = e.read_shift(4), t -= 4;
  var n = e.read_shift(4);
  return t -= 4, r.EncryptionHeader = $c(e, n), t -= n, r.EncryptionVerifier = jc(e, t), r;
}
function ox(e) {
  var t = {}, r = t.EncryptionVersionInfo = Yt(e, 4);
  if (r.Major != 1 || r.Minor != 1) throw "unrecognized version code " + r.Major + " : " + r.Minor;
  return t.Salt = e.read_shift(16), t.EncryptedVerifier = e.read_shift(16), t.EncryptedVerifierHash = e.read_shift(16), t;
}
function Gi(e) {
  var t = 0, r, a = Gc(e), n = a.length + 1, i, s, f, c, l;
  for (r = aa(n), r[0] = a.length, i = 1; i != n; ++i) r[i] = a[i - 1];
  for (i = n - 1; i >= 0; --i)
    s = r[i], f = t & 16384 ? 1 : 0, c = t << 1 & 32767, l = f | c, t = l ^ s;
  return t ^ 52811;
}
var Kc = /* @__PURE__ */ function() {
  var e = [187, 255, 255, 186, 255, 255, 185, 128, 0, 190, 15, 0, 191, 15, 0], t = [57840, 7439, 52380, 33984, 4364, 3600, 61902, 12606, 6258, 57657, 54287, 34041, 10252, 43370, 20163], r = [44796, 19929, 39858, 10053, 20106, 40212, 10761, 31585, 63170, 64933, 60267, 50935, 40399, 11199, 17763, 35526, 1453, 2906, 5812, 11624, 23248, 885, 1770, 3540, 7080, 14160, 28320, 56640, 55369, 41139, 20807, 41614, 21821, 43642, 17621, 28485, 56970, 44341, 19019, 38038, 14605, 29210, 60195, 50791, 40175, 10751, 21502, 43004, 24537, 18387, 36774, 3949, 7898, 15796, 31592, 63184, 47201, 24803, 49606, 37805, 14203, 28406, 56812, 17824, 35648, 1697, 3394, 6788, 13576, 27152, 43601, 17539, 35078, 557, 1114, 2228, 4456, 30388, 60776, 51953, 34243, 7079, 14158, 28316, 14128, 28256, 56512, 43425, 17251, 34502, 7597, 13105, 26210, 52420, 35241, 883, 1766, 3532, 4129, 8258, 16516, 33032, 4657, 9314, 18628], a = function(s) {
    return (s / 2 | s * 128) & 255;
  }, n = function(s, f) {
    return a(s ^ f);
  }, i = function(s) {
    for (var f = t[s.length - 1], c = 104, l = s.length - 1; l >= 0; --l)
      for (var o = s[l], u = 0; u != 7; ++u)
        o & 64 && (f ^= r[c]), o *= 2, --c;
    return f;
  };
  return function(s) {
    for (var f = Gc(s), c = i(f), l = f.length, o = aa(16), u = 0; u != 16; ++u) o[u] = 0;
    var x, d, v;
    for ((l & 1) === 1 && (x = c >> 8, o[l] = n(e[0], x), --l, x = c & 255, d = f[f.length - 1], o[l] = n(d, x)); l > 0; )
      --l, x = c >> 8, o[l] = n(f[l], x), --l, x = c & 255, o[l] = n(f[l], x);
    for (l = 15, v = 15 - f.length; v > 0; )
      x = c >> 8, o[l] = n(e[v], x), --l, --v, x = c & 255, o[l] = n(f[l], x), --l, --v;
    return o;
  };
}(), ux = function(e, t, r, a, n) {
  n || (n = t), a || (a = Kc(e));
  var i, s;
  for (i = 0; i != t.length; ++i)
    s = t[i], s ^= a[r], s = (s >> 5 | s << 3) & 255, n[i] = s, ++r;
  return [n, r, a];
}, hx = function(e) {
  var t = 0, r = Kc(e);
  return function(a) {
    var n = ux("", a, t, r);
    return t = n[1], n[0];
  };
};
function xx(e, t, r, a) {
  var n = { key: yr(e), verificationBytes: yr(e) };
  return r.password && (n.verifier = Gi(r.password)), a.valid = n.verificationBytes === n.verifier, a.valid && (a.insitu = hx(r.password)), n;
}
function dx(e, t, r) {
  var a = r || {};
  return a.Info = e.read_shift(2), e.l -= 2, a.Info === 1 ? a.Data = ox(e) : a.Data = lx(e, t), a;
}
function px(e, t, r) {
  var a = { Type: r.biff >= 8 ? e.read_shift(2) : 0 };
  return a.Type ? dx(e, t - 2, a) : xx(e, r.biff >= 8 ? t : t - 2, r, a), a;
}
var Yc = /* @__PURE__ */ function() {
  function e(n, i) {
    switch (i.type) {
      case "base64":
        return t(xt(n), i);
      case "binary":
        return t(n, i);
      case "buffer":
        return t(We && Buffer.isBuffer(n) ? n.toString("binary") : fa(n), i);
      case "array":
        return t(ya(n), i);
    }
    throw new Error("Unrecognized type " + i.type);
  }
  function t(n, i) {
    var s = i || {}, f = s.dense ? [] : {}, c = n.match(/\\trowd.*?\\row\b/g);
    if (!c.length) throw new Error("RTF missing table");
    var l = { s: { c: 0, r: 0 }, e: { c: 0, r: c.length - 1 } };
    return c.forEach(function(o, u) {
      Array.isArray(f) && (f[u] = []);
      for (var x = /\\\w+\b/g, d = 0, v, h = -1; v = x.exec(o); ) {
        switch (v[0]) {
          case "\\cell":
            var g = o.slice(d, x.lastIndex - v[0].length);
            if (g[0] == " " && (g = g.slice(1)), ++h, g.length) {
              var T = { v: g, t: "s" };
              Array.isArray(f) ? f[u][h] = T : f[Ce({ r: u, c: h })] = T;
            }
            break;
        }
        d = x.lastIndex;
      }
      h > l.e.c && (l.e.c = h);
    }), f["!ref"] = Ne(l), f;
  }
  function r(n, i) {
    return ca(e(n, i), i);
  }
  function a(n) {
    for (var i = ["{\\rtf1\\ansi"], s = $e(n["!ref"]), f, c = Array.isArray(n), l = s.s.r; l <= s.e.r; ++l) {
      i.push("\\trowd\\trautofit1");
      for (var o = s.s.c; o <= s.e.c; ++o) i.push("\\cellx" + (o + 1));
      for (i.push("\\pard\\intbl"), o = s.s.c; o <= s.e.c; ++o) {
        var u = Ce({ r: l, c: o });
        f = c ? (n[l] || [])[o] : n[u], !(!f || f.v == null && (!f.f || f.F)) && (i.push(" " + (f.w || (Jt(f), f.w))), i.push("\\cell"));
      }
      i.push("\\pard\\intbl\\row");
    }
    return i.join("") + "}";
  }
  return {
    to_workbook: r,
    to_sheet: e,
    from_sheet: a
  };
}();
function vx(e) {
  var t = e.slice(e[0] === "#" ? 1 : 0).slice(0, 6);
  return [parseInt(t.slice(0, 2), 16), parseInt(t.slice(2, 4), 16), parseInt(t.slice(4, 6), 16)];
}
function Rn(e) {
  for (var t = 0, r = 1; t != 3; ++t) r = r * 256 + (e[t] > 255 ? 255 : e[t] < 0 ? 0 : e[t]);
  return r.toString(16).toUpperCase().slice(1);
}
function mx(e) {
  var t = e[0] / 255, r = e[1] / 255, a = e[2] / 255, n = Math.max(t, r, a), i = Math.min(t, r, a), s = n - i;
  if (s === 0) return [0, 0, t];
  var f = 0, c = 0, l = n + i;
  switch (c = s / (l > 1 ? 2 - l : l), n) {
    case t:
      f = ((r - a) / s + 6) % 6;
      break;
    case r:
      f = (a - t) / s + 2;
      break;
    case a:
      f = (t - r) / s + 4;
      break;
  }
  return [f / 6, c, l / 2];
}
function gx(e) {
  var t = e[0], r = e[1], a = e[2], n = r * 2 * (a < 0.5 ? a : 1 - a), i = a - n / 2, s = [i, i, i], f = 6 * t, c;
  if (r !== 0) switch (f | 0) {
    case 0:
    case 6:
      c = n * f, s[0] += n, s[1] += c;
      break;
    case 1:
      c = n * (2 - f), s[0] += c, s[1] += n;
      break;
    case 2:
      c = n * (f - 2), s[1] += n, s[2] += c;
      break;
    case 3:
      c = n * (4 - f), s[1] += c, s[2] += n;
      break;
    case 4:
      c = n * (f - 4), s[2] += n, s[0] += c;
      break;
    case 5:
      c = n * (6 - f), s[2] += c, s[0] += n;
      break;
  }
  for (var l = 0; l != 3; ++l) s[l] = Math.round(s[l] * 255);
  return s;
}
function w0(e, t) {
  if (t === 0) return e;
  var r = mx(vx(e));
  return t < 0 ? r[2] = r[2] * (1 + t) : r[2] = 1 - (1 - r[2]) * (1 - t), Rn(gx(r));
}
var Jc = 6, _x = 15, wx = 1, $r = Jc;
function Ln(e) {
  return Math.floor((e + Math.round(128 / $r) / 256) * $r);
}
function Pn(e) {
  return Math.floor((e - 5) / $r * 100 + 0.5) / 100;
}
function k0(e) {
  return Math.round((e * $r + 5) / $r * 256) / 256;
}
function Q0(e) {
  return k0(Pn(Ln(e)));
}
function $i(e) {
  var t = Math.abs(e - Q0(e)), r = $r;
  if (t > 5e-3) for ($r = wx; $r < _x; ++$r) Math.abs(e - Q0(e)) <= t && (t = Math.abs(e - Q0(e)), r = $r);
  $r = r;
}
function na(e) {
  e.width ? (e.wpx = Ln(e.width), e.wch = Pn(e.wpx), e.MDW = $r) : e.wpx ? (e.wch = Pn(e.wpx), e.width = k0(e.wch), e.MDW = $r) : typeof e.wch == "number" && (e.width = k0(e.wch), e.wpx = Ln(e.width), e.MDW = $r), e.customWidth && delete e.customWidth;
}
var kx = 96, qc = kx;
function Bn(e) {
  return e * 96 / qc;
}
function tn(e) {
  return e * qc / 96;
}
var Ex = {
  None: "none",
  Solid: "solid",
  Gray50: "mediumGray",
  Gray75: "darkGray",
  Gray25: "lightGray",
  HorzStripe: "darkHorizontal",
  VertStripe: "darkVertical",
  ReverseDiagStripe: "darkDown",
  DiagStripe: "darkUp",
  DiagCross: "darkGrid",
  ThickDiagCross: "darkTrellis",
  ThinHorzStripe: "lightHorizontal",
  ThinVertStripe: "lightVertical",
  ThinReverseDiagStripe: "lightDown",
  ThinHorzCross: "lightGrid"
};
function Tx(e, t, r, a) {
  t.Borders = [];
  var n = {}, i = !1;
  (e[0].match(Jr) || []).forEach(function(s) {
    var f = be(s);
    switch (Xt(f[0])) {
      case "<borders":
      case "<borders>":
      case "</borders>":
        break;
      case "<border":
      case "<border>":
      case "<border/>":
        n = /*::(*/
        {}, f.diagonalUp && (n.diagonalUp = ar(f.diagonalUp)), f.diagonalDown && (n.diagonalDown = ar(f.diagonalDown)), t.Borders.push(n);
        break;
      case "</border>":
        break;
      case "<left/>":
        break;
      case "<left":
      case "<left>":
        break;
      case "</left>":
        break;
      case "<right/>":
        break;
      case "<right":
      case "<right>":
        break;
      case "</right>":
        break;
      case "<top/>":
        break;
      case "<top":
      case "<top>":
        break;
      case "</top>":
        break;
      case "<bottom/>":
        break;
      case "<bottom":
      case "<bottom>":
        break;
      case "</bottom>":
        break;
      case "<diagonal":
      case "<diagonal>":
      case "<diagonal/>":
        break;
      case "</diagonal>":
        break;
      case "<horizontal":
      case "<horizontal>":
      case "<horizontal/>":
        break;
      case "</horizontal>":
        break;
      case "<vertical":
      case "<vertical>":
      case "<vertical/>":
        break;
      case "</vertical>":
        break;
      case "<start":
      case "<start>":
      case "<start/>":
        break;
      case "</start>":
        break;
      case "<end":
      case "<end>":
      case "<end/>":
        break;
      case "</end>":
        break;
      case "<color":
      case "<color>":
        break;
      case "<color/>":
      case "</color>":
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
        break;
      case "<ext":
        i = !0;
        break;
      case "</ext>":
        i = !1;
        break;
      default:
        if (a && a.WTF && !i)
          throw new Error("unrecognized " + f[0] + " in borders");
    }
  });
}
function yx(e, t, r, a) {
  t.Fills = [];
  var n = {}, i = !1;
  (e[0].match(Jr) || []).forEach(function(s) {
    var f = be(s);
    switch (Xt(f[0])) {
      case "<fills":
      case "<fills>":
      case "</fills>":
        break;
      case "<fill>":
      case "<fill":
      case "<fill/>":
        n = {}, t.Fills.push(n);
        break;
      case "</fill>":
        break;
      case "<gradientFill>":
        break;
      case "<gradientFill":
      case "</gradientFill>":
        t.Fills.push(n), n = {};
        break;
      case "<patternFill":
      case "<patternFill>":
        f.patternType && (n.patternType = f.patternType);
        break;
      case "<patternFill/>":
      case "</patternFill>":
        break;
      case "<bgColor":
        n.bgColor || (n.bgColor = {}), f.indexed && (n.bgColor.indexed = parseInt(f.indexed, 10)), f.theme && (n.bgColor.theme = parseInt(f.theme, 10)), f.tint && (n.bgColor.tint = parseFloat(f.tint)), f.rgb && (n.bgColor.rgb = f.rgb.slice(-6));
        break;
      case "<bgColor/>":
      case "</bgColor>":
        break;
      case "<fgColor":
        n.fgColor || (n.fgColor = {}), f.theme && (n.fgColor.theme = parseInt(f.theme, 10)), f.tint && (n.fgColor.tint = parseFloat(f.tint)), f.rgb != null && (n.fgColor.rgb = f.rgb.slice(-6));
        break;
      case "<fgColor/>":
      case "</fgColor>":
        break;
      case "<stop":
      case "<stop/>":
        break;
      case "</stop>":
        break;
      case "<color":
      case "<color/>":
        break;
      case "</color>":
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
        break;
      case "<ext":
        i = !0;
        break;
      case "</ext>":
        i = !1;
        break;
      default:
        if (a && a.WTF && !i)
          throw new Error("unrecognized " + f[0] + " in fills");
    }
  });
}
function Sx(e, t, r, a) {
  t.Fonts = [];
  var n = {}, i = !1;
  (e[0].match(Jr) || []).forEach(function(s) {
    var f = be(s);
    switch (Xt(f[0])) {
      case "<fonts":
      case "<fonts>":
      case "</fonts>":
        break;
      case "<font":
      case "<font>":
        break;
      case "</font>":
      case "<font/>":
        t.Fonts.push(n), n = {};
        break;
      case "<name":
        f.val && (n.name = tr(f.val));
        break;
      case "<name/>":
      case "</name>":
        break;
      case "<b":
        n.bold = f.val ? ar(f.val) : 1;
        break;
      case "<b/>":
        n.bold = 1;
        break;
      case "<i":
        n.italic = f.val ? ar(f.val) : 1;
        break;
      case "<i/>":
        n.italic = 1;
        break;
      case "<u":
        switch (f.val) {
          case "none":
            n.underline = 0;
            break;
          case "single":
            n.underline = 1;
            break;
          case "double":
            n.underline = 2;
            break;
          case "singleAccounting":
            n.underline = 33;
            break;
          case "doubleAccounting":
            n.underline = 34;
            break;
        }
        break;
      case "<u/>":
        n.underline = 1;
        break;
      case "<strike":
        n.strike = f.val ? ar(f.val) : 1;
        break;
      case "<strike/>":
        n.strike = 1;
        break;
      case "<outline":
        n.outline = f.val ? ar(f.val) : 1;
        break;
      case "<outline/>":
        n.outline = 1;
        break;
      case "<shadow":
        n.shadow = f.val ? ar(f.val) : 1;
        break;
      case "<shadow/>":
        n.shadow = 1;
        break;
      case "<condense":
        n.condense = f.val ? ar(f.val) : 1;
        break;
      case "<condense/>":
        n.condense = 1;
        break;
      case "<extend":
        n.extend = f.val ? ar(f.val) : 1;
        break;
      case "<extend/>":
        n.extend = 1;
        break;
      case "<sz":
        f.val && (n.sz = +f.val);
        break;
      case "<sz/>":
      case "</sz>":
        break;
      case "<vertAlign":
        f.val && (n.vertAlign = f.val);
        break;
      case "<vertAlign/>":
      case "</vertAlign>":
        break;
      case "<family":
        f.val && (n.family = parseInt(f.val, 10));
        break;
      case "<family/>":
      case "</family>":
        break;
      case "<scheme":
        f.val && (n.scheme = f.val);
        break;
      case "<scheme/>":
      case "</scheme>":
        break;
      case "<charset":
        if (f.val == "1") break;
        f.codepage = wi[parseInt(f.val, 10)];
        break;
      case "<color":
        if (n.color || (n.color = {}), f.auto && (n.color.auto = ar(f.auto)), f.rgb) n.color.rgb = f.rgb.slice(-6);
        else if (f.indexed) {
          n.color.index = parseInt(f.indexed, 10);
          var c = _a[n.color.index];
          n.color.index == 81 && (c = _a[1]), c || (c = _a[1]), n.color.rgb = c[0].toString(16) + c[1].toString(16) + c[2].toString(16);
        } else f.theme && (n.color.theme = parseInt(f.theme, 10), f.tint && (n.color.tint = parseFloat(f.tint)), f.theme && r.themeElements && r.themeElements.clrScheme && (n.color.rgb = w0(r.themeElements.clrScheme[n.color.theme].rgb, n.color.tint || 0)));
        break;
      case "<color/>":
      case "</color>":
        break;
      case "<AlternateContent":
        i = !0;
        break;
      case "</AlternateContent>":
        i = !1;
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
        break;
      case "<ext":
        i = !0;
        break;
      case "</ext>":
        i = !1;
        break;
      default:
        if (a && a.WTF && !i)
          throw new Error("unrecognized " + f[0] + " in fonts");
    }
  });
}
function Fx(e, t, r) {
  t.NumberFmt = [];
  for (var a = gr(Fe), n = 0; n < a.length; ++n) t.NumberFmt[a[n]] = Fe[a[n]];
  var i = e[0].match(Jr);
  if (i)
    for (n = 0; n < i.length; ++n) {
      var s = be(i[n]);
      switch (Xt(s[0])) {
        case "<numFmts":
        case "</numFmts>":
        case "<numFmts/>":
        case "<numFmts>":
          break;
        case "<numFmt":
          {
            var f = Ge(tr(s.formatCode)), c = parseInt(s.numFmtId, 10);
            if (t.NumberFmt[c] = f, c > 0) {
              if (c > 392) {
                for (c = 392; c > 60 && t.NumberFmt[c] != null; --c) ;
                t.NumberFmt[c] = f;
              }
              Kt(f, c);
            }
          }
          break;
        case "</numFmt>":
          break;
        default:
          if (r.WTF) throw new Error("unrecognized " + s[0] + " in numFmts");
      }
    }
}
function Ax(e) {
  var t = ["<numFmts>"];
  return [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(r) {
    for (var a = r[0]; a <= r[1]; ++a) e[a] != null && (t[t.length] = oe("numFmt", null, { numFmtId: a, formatCode: er(e[a]) }));
  }), t.length === 1 ? "" : (t[t.length] = "</numFmts>", t[0] = oe("numFmts", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
var s0 = ["numFmtId", "fillId", "fontId", "borderId", "xfId"], f0 = ["applyAlignment", "applyBorder", "applyFill", "applyFont", "applyNumberFormat", "applyProtection", "pivotButton", "quotePrefix"];
function Cx(e, t, r) {
  t.CellXf = [];
  var a, n = !1;
  (e[0].match(Jr) || []).forEach(function(i) {
    var s = be(i), f = 0;
    switch (Xt(s[0])) {
      case "<cellXfs":
      case "<cellXfs>":
      case "<cellXfs/>":
      case "</cellXfs>":
        break;
      case "<xf":
      case "<xf/>":
        for (a = s, delete a[0], f = 0; f < s0.length; ++f) a[s0[f]] && (a[s0[f]] = parseInt(a[s0[f]], 10));
        for (f = 0; f < f0.length; ++f) a[f0[f]] && (a[f0[f]] = ar(a[f0[f]]));
        if (t.NumberFmt && a.numFmtId > 392) {
          for (f = 392; f > 60; --f) if (t.NumberFmt[a.numFmtId] == t.NumberFmt[f]) {
            a.numFmtId = f;
            break;
          }
        }
        t.CellXf.push(a);
        break;
      case "</xf>":
        break;
      case "<alignment":
      case "<alignment/>":
        var c = {};
        s.vertical && (c.vertical = s.vertical), s.horizontal && (c.horizontal = s.horizontal), s.textRotation != null && (c.textRotation = s.textRotation), s.indent && (c.indent = s.indent), s.wrapText && (c.wrapText = ar(s.wrapText)), a.alignment = c;
        break;
      case "</alignment>":
        break;
      case "<protection":
        break;
      case "</protection>":
      case "<protection/>":
        break;
      case "<AlternateContent":
        n = !0;
        break;
      case "</AlternateContent>":
        n = !1;
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
        break;
      case "<ext":
        n = !0;
        break;
      case "</ext>":
        n = !1;
        break;
      default:
        if (r && r.WTF && !n)
          throw new Error("unrecognized " + s[0] + " in cellXfs");
    }
  });
}
function bx(e) {
  var t = [];
  return t[t.length] = oe("cellXfs", null), e.forEach(function(r) {
    t[t.length] = oe("xf", null, r);
  }), t[t.length] = "</cellXfs>", t.length === 2 ? "" : (t[0] = oe("cellXfs", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
var Dx = /* @__PURE__ */ function() {
  var t = /<(?:\w+:)?numFmts([^>]*)>[\S\s]*?<\/(?:\w+:)?numFmts>/, r = /<(?:\w+:)?cellXfs([^>]*)>[\S\s]*?<\/(?:\w+:)?cellXfs>/, a = /<(?:\w+:)?fills([^>]*)>[\S\s]*?<\/(?:\w+:)?fills>/, n = /<(?:\w+:)?fonts([^>]*)>[\S\s]*?<\/(?:\w+:)?fonts>/, i = /<(?:\w+:)?borders([^>]*)>[\S\s]*?<\/(?:\w+:)?borders>/;
  return function(f, c, l) {
    var o = {};
    if (!f) return o;
    f = f.replace(/<!--([\s\S]*?)-->/mg, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, "");
    var u;
    return (u = f.match(t)) && Fx(u, o, l), (u = f.match(n)) && Sx(u, o, c, l), (u = f.match(a)) && yx(u, o, c, l), (u = f.match(i)) && Tx(u, o, c, l), (u = f.match(r)) && Cx(u, o, l), o;
  };
}();
function Zc(e, t) {
  var r = [kr, oe("styleSheet", null, {
    xmlns: ba[0],
    "xmlns:vt": Fr.vt
  })], a;
  return e.SSF && (a = Ax(e.SSF)) != null && (r[r.length] = a), r[r.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>', r[r.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>', r[r.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>', r[r.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>', (a = bx(t.cellXfs)) && (r[r.length] = a), r[r.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>', r[r.length] = '<dxfs count="0"/>', r[r.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>', r.length > 2 && (r[r.length] = "</styleSheet>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Ix(e, t) {
  var r = e.read_shift(2), a = Kr(e);
  return [r, a];
}
function Ox(e, t, r) {
  r || (r = Z(6 + 4 * t.length)), r.write_shift(2, e), Ir(t, r);
  var a = r.length > r.l ? r.slice(0, r.l) : r;
  return r.l == null && (r.l = r.length), a;
}
function Nx(e, t, r) {
  var a = {};
  a.sz = e.read_shift(2) / 20;
  var n = du(e);
  n.fItalic && (a.italic = 1), n.fCondense && (a.condense = 1), n.fExtend && (a.extend = 1), n.fShadow && (a.shadow = 1), n.fOutline && (a.outline = 1), n.fStrikeout && (a.strike = 1);
  var i = e.read_shift(2);
  switch (i === 700 && (a.bold = 1), e.read_shift(2)) {
    case 1:
      a.vertAlign = "superscript";
      break;
    case 2:
      a.vertAlign = "subscript";
      break;
  }
  var s = e.read_shift(1);
  s != 0 && (a.underline = s);
  var f = e.read_shift(1);
  f > 0 && (a.family = f);
  var c = e.read_shift(1);
  switch (c > 0 && (a.charset = c), e.l++, a.color = xu(e), e.read_shift(1)) {
    case 1:
      a.scheme = "major";
      break;
    case 2:
      a.scheme = "minor";
      break;
  }
  return a.name = Kr(e), a;
}
function Rx(e, t) {
  t || (t = Z(25 + 4 * 32)), t.write_shift(2, e.sz * 20), pu(e, t), t.write_shift(2, e.bold ? 700 : 400);
  var r = 0;
  e.vertAlign == "superscript" ? r = 1 : e.vertAlign == "subscript" && (r = 2), t.write_shift(2, r), t.write_shift(1, e.underline || 0), t.write_shift(1, e.family || 0), t.write_shift(1, e.charset || 0), t.write_shift(1, 0), m0(e.color, t);
  var a = 0;
  return a = 2, t.write_shift(1, a), Ir(e.name, t), t.length > t.l ? t.slice(0, t.l) : t;
}
var Lx = [
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
], ei, Px = Yr;
function of(e, t) {
  t || (t = Z(4 * 3 + 8 * 7 + 16 * 1)), ei || (ei = S0(Lx));
  var r = ei[e.patternType];
  r == null && (r = 40), t.write_shift(4, r);
  var a = 0;
  if (r != 40)
    for (m0({ auto: 1 }, t), m0({ auto: 1 }, t); a < 12; ++a) t.write_shift(4, 0);
  else {
    for (; a < 4; ++a) t.write_shift(4, 0);
    for (; a < 12; ++a) t.write_shift(4, 0);
  }
  return t.length > t.l ? t.slice(0, t.l) : t;
}
function Bx(e, t) {
  var r = e.l + t, a = e.read_shift(2), n = e.read_shift(2);
  return e.l = r, { ixfe: a, numFmtId: n };
}
function Qc(e, t, r) {
  r || (r = Z(16)), r.write_shift(2, t || 0), r.write_shift(2, e.numFmtId || 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(1, 0), r.write_shift(1, 0);
  var a = 0;
  return r.write_shift(1, a), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(1, 0), r;
}
function dn(e, t) {
  return t || (t = Z(10)), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var Mx = Yr;
function Ux(e, t) {
  return t || (t = Z(51)), t.write_shift(1, 0), dn(null, t), dn(null, t), dn(null, t), dn(null, t), dn(null, t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Wx(e, t) {
  return t || (t = Z(12 + 4 * 10)), t.write_shift(4, e.xfId), t.write_shift(2, 1), t.write_shift(1, 0), t.write_shift(1, 0), v0(e.name || "", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Vx(e, t, r) {
  var a = Z(2052);
  return a.write_shift(4, e), v0(t, a), v0(r, a), a.length > a.l ? a.slice(0, a.l) : a;
}
function Hx(e, t, r) {
  var a = {};
  a.NumberFmt = [];
  for (var n in Fe) a.NumberFmt[n] = Fe[n];
  a.CellXf = [], a.Fonts = [];
  var i = [], s = !1;
  return Zt(e, function(c, l, o) {
    switch (o) {
      case 44:
        a.NumberFmt[c[0]] = c[1], Kt(c[1], c[0]);
        break;
      case 43:
        a.Fonts.push(c), c.color.theme != null && t && t.themeElements && t.themeElements.clrScheme && (c.color.rgb = w0(t.themeElements.clrScheme[c.color.theme].rgb, c.color.tint || 0));
        break;
      case 1025:
        break;
      case 45:
        break;
      case 46:
        break;
      case 47:
        i[i.length - 1] == 617 && a.CellXf.push(c);
        break;
      case 48:
      case 507:
      case 572:
      case 475:
        break;
      case 1171:
      case 2102:
      case 1130:
      case 512:
      case 2095:
      case 3072:
        break;
      case 35:
        s = !0;
        break;
      case 36:
        s = !1;
        break;
      case 37:
        i.push(o), s = !0;
        break;
      case 38:
        i.pop(), s = !1;
        break;
      default:
        if (l.T > 0) i.push(o);
        else if (l.T < 0) i.pop();
        else if (!s || r.WTF && i[i.length - 1] != 37) throw new Error("Unexpected record 0x" + o.toString(16));
    }
  }), a;
}
function Xx(e, t) {
  if (t) {
    var r = 0;
    [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(a) {
      for (var n = a[0]; n <= a[1]; ++n) t[n] != null && ++r;
    }), r != 0 && (ee(e, 615, Pt(r)), [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(a) {
      for (var n = a[0]; n <= a[1]; ++n) t[n] != null && ee(e, 44, Ox(n, t[n]));
    }), ee(
      e,
      616
      /* BrtEndFmts */
    ));
  }
}
function zx(e) {
  var t = 1;
  ee(e, 611, Pt(t)), ee(e, 43, Rx({
    sz: 12,
    color: { theme: 1 },
    name: "Calibri",
    family: 2
  })), ee(
    e,
    612
    /* BrtEndFonts */
  );
}
function Gx(e) {
  var t = 2;
  ee(e, 603, Pt(t)), ee(e, 45, of({ patternType: "none" })), ee(e, 45, of({ patternType: "gray125" })), ee(
    e,
    604
    /* BrtEndFills */
  );
}
function $x(e) {
  var t = 1;
  ee(e, 613, Pt(t)), ee(e, 46, Ux()), ee(
    e,
    614
    /* BrtEndBorders */
  );
}
function jx(e) {
  var t = 1;
  ee(e, 626, Pt(t)), ee(e, 47, Qc({
    numFmtId: 0
  }, 65535)), ee(
    e,
    627
    /* BrtEndCellStyleXFs */
  );
}
function Kx(e, t) {
  ee(e, 617, Pt(t.length)), t.forEach(function(r) {
    ee(e, 47, Qc(r, 0));
  }), ee(
    e,
    618
    /* BrtEndCellXFs */
  );
}
function Yx(e) {
  var t = 1;
  ee(e, 619, Pt(t)), ee(e, 48, Wx({
    xfId: 0,
    name: "Normal"
  })), ee(
    e,
    620
    /* BrtEndStyles */
  );
}
function Jx(e) {
  var t = 0;
  ee(e, 505, Pt(t)), ee(
    e,
    506
    /* BrtEndDXFs */
  );
}
function qx(e) {
  var t = 0;
  ee(e, 508, Vx(t, "TableStyleMedium9", "PivotStyleMedium4")), ee(
    e,
    509
    /* BrtEndTableStyles */
  );
}
function Zx(e, t) {
  var r = it();
  return ee(
    r,
    278
    /* BrtBeginStyleSheet */
  ), Xx(r, e.SSF), zx(r), Gx(r), $x(r), jx(r), Kx(r, t.cellXfs), Yx(r), Jx(r), qx(r), ee(
    r,
    279
    /* BrtEndStyleSheet */
  ), r.end();
}
var Qx = [
  "</a:lt1>",
  "</a:dk1>",
  "</a:lt2>",
  "</a:dk2>",
  "</a:accent1>",
  "</a:accent2>",
  "</a:accent3>",
  "</a:accent4>",
  "</a:accent5>",
  "</a:accent6>",
  "</a:hlink>",
  "</a:folHlink>"
];
function ed(e, t, r) {
  t.themeElements.clrScheme = [];
  var a = {};
  (e[0].match(Jr) || []).forEach(function(n) {
    var i = be(n);
    switch (i[0]) {
      case "<a:clrScheme":
      case "</a:clrScheme>":
        break;
      case "<a:srgbClr":
        a.rgb = i.val;
        break;
      case "<a:sysClr":
        a.rgb = i.lastClr;
        break;
      case "<a:dk1>":
      case "</a:dk1>":
      case "<a:lt1>":
      case "</a:lt1>":
      case "<a:dk2>":
      case "</a:dk2>":
      case "<a:lt2>":
      case "</a:lt2>":
      case "<a:accent1>":
      case "</a:accent1>":
      case "<a:accent2>":
      case "</a:accent2>":
      case "<a:accent3>":
      case "</a:accent3>":
      case "<a:accent4>":
      case "</a:accent4>":
      case "<a:accent5>":
      case "</a:accent5>":
      case "<a:accent6>":
      case "</a:accent6>":
      case "<a:hlink>":
      case "</a:hlink>":
      case "<a:folHlink>":
      case "</a:folHlink>":
        i[0].charAt(1) === "/" ? (t.themeElements.clrScheme[Qx.indexOf(i[0])] = a, a = {}) : a.name = i[0].slice(3, i[0].length - 1);
        break;
      default:
        if (r && r.WTF) throw new Error("Unrecognized " + i[0] + " in clrScheme");
    }
  });
}
function rd() {
}
function td() {
}
var ad = /<a:clrScheme([^>]*)>[\s\S]*<\/a:clrScheme>/, nd = /<a:fontScheme([^>]*)>[\s\S]*<\/a:fontScheme>/, id = /<a:fmtScheme([^>]*)>[\s\S]*<\/a:fmtScheme>/;
function sd(e, t, r) {
  t.themeElements = {};
  var a;
  [
    /* clrScheme CT_ColorScheme */
    ["clrScheme", ad, ed],
    /* fontScheme CT_FontScheme */
    ["fontScheme", nd, rd],
    /* fmtScheme CT_StyleMatrix */
    ["fmtScheme", id, td]
  ].forEach(function(n) {
    if (!(a = e.match(n[1]))) throw new Error(n[0] + " not found in themeElements");
    n[2](a, t, r);
  });
}
var fd = /<a:themeElements([^>]*)>[\s\S]*<\/a:themeElements>/;
function el(e, t) {
  (!e || e.length === 0) && (e = ji());
  var r, a = {};
  if (!(r = e.match(fd))) throw new Error("themeElements not found in theme");
  return sd(r[0], a, t), a.raw = e, a;
}
function ji(e, t) {
  if (t && t.themeXLSX) return t.themeXLSX;
  if (e && typeof e.raw == "string") return e.raw;
  var r = [kr];
  return r[r.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">', r[r.length] = "<a:themeElements>", r[r.length] = '<a:clrScheme name="Office">', r[r.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>', r[r.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>', r[r.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>', r[r.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>', r[r.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>', r[r.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>', r[r.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>', r[r.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>', r[r.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>', r[r.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>', r[r.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>', r[r.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>', r[r.length] = "</a:clrScheme>", r[r.length] = '<a:fontScheme name="Office">', r[r.length] = "<a:majorFont>", r[r.length] = '<a:latin typeface="Cambria"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Hebr" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="MoolBoran"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:majorFont>", r[r.length] = "<a:minorFont>", r[r.length] = '<a:latin typeface="Calibri"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Arial"/>', r[r.length] = '<a:font script="Hebr" typeface="Arial"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="DaunPenh"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Arial"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:minorFont>", r[r.length] = "</a:fontScheme>", r[r.length] = '<a:fmtScheme name="Office">', r[r.length] = "<a:fillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="1"/>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="0"/>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:fillStyleLst>", r[r.length] = "<a:lnStyleLst>", r[r.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = "</a:lnStyleLst>", r[r.length] = "<a:effectStyleLst>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>', r[r.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>', r[r.length] = "</a:effectStyle>", r[r.length] = "</a:effectStyleLst>", r[r.length] = "<a:bgFillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:bgFillStyleLst>", r[r.length] = "</a:fmtScheme>", r[r.length] = "</a:themeElements>", r[r.length] = "<a:objectDefaults>", r[r.length] = "<a:spDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>', r[r.length] = "</a:spDef>", r[r.length] = "<a:lnDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>', r[r.length] = "</a:lnDef>", r[r.length] = "</a:objectDefaults>", r[r.length] = "<a:extraClrSchemeLst/>", r[r.length] = "</a:theme>", r.join("");
}
function cd(e, t, r) {
  var a = e.l + t, n = e.read_shift(4);
  if (n !== 124226) {
    if (!r.cellStyles) {
      e.l = a;
      return;
    }
    var i = e.slice(e.l);
    e.l = a;
    var s;
    try {
      s = $f(i, { type: "array" });
    } catch {
      return;
    }
    var f = ht(s, "theme/theme/theme1.xml", !0);
    if (f)
      return el(f, r);
  }
}
function ld(e) {
  return e.read_shift(4);
}
function od(e) {
  var t = {};
  switch (t.xclrType = e.read_shift(2), t.nTintShade = e.read_shift(2), t.xclrType) {
    case 0:
      e.l += 4;
      break;
    case 1:
      t.xclrValue = ud(e, 4);
      break;
    case 2:
      t.xclrValue = Nc(e);
      break;
    case 3:
      t.xclrValue = ld(e);
      break;
    case 4:
      e.l += 4;
      break;
  }
  return e.l += 8, t;
}
function ud(e, t) {
  return Yr(e, t);
}
function hd(e, t) {
  return Yr(e, t);
}
function xd(e) {
  var t = e.read_shift(2), r = e.read_shift(2) - 4, a = [t];
  switch (t) {
    case 4:
    case 5:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 13:
      a[1] = od(e);
      break;
    case 6:
      a[1] = hd(e, r);
      break;
    case 14:
    case 15:
      a[1] = e.read_shift(r === 1 ? 1 : 2);
      break;
    default:
      throw new Error("Unrecognized ExtProp type: " + t + " " + r);
  }
  return a;
}
function dd(e, t) {
  var r = e.l + t;
  e.l += 2;
  var a = e.read_shift(2);
  e.l += 2;
  for (var n = e.read_shift(2), i = []; n-- > 0; ) i.push(xd(e, r - e.l));
  return { ixfe: a, ext: i };
}
function pd(e, t) {
  t.forEach(function(r) {
    switch (r[0]) {
    }
  });
}
function vd(e, t) {
  return {
    flags: e.read_shift(4),
    version: e.read_shift(4),
    name: Kr(e)
  };
}
function md(e) {
  var t = Z(12 + 2 * e.name.length);
  return t.write_shift(4, e.flags), t.write_shift(4, e.version), Ir(e.name, t), t.slice(0, t.l);
}
function gd(e) {
  for (var t = [], r = e.read_shift(4); r-- > 0; )
    t.push([e.read_shift(4), e.read_shift(4)]);
  return t;
}
function _d(e) {
  var t = Z(4 + 8 * e.length);
  t.write_shift(4, e.length);
  for (var r = 0; r < e.length; ++r)
    t.write_shift(4, e[r][0]), t.write_shift(4, e[r][1]);
  return t;
}
function wd(e, t) {
  var r = Z(8 + 2 * t.length);
  return r.write_shift(4, e), Ir(t, r), r.slice(0, r.l);
}
function kd(e) {
  return e.l += 4, e.read_shift(4) != 0;
}
function Ed(e, t) {
  var r = Z(8);
  return r.write_shift(4, e), r.write_shift(4, 1), r;
}
function Td(e, t, r) {
  var a = { Types: [], Cell: [], Value: [] }, n = r || {}, i = [], s = !1, f = 2;
  return Zt(e, function(c, l, o) {
    switch (o) {
      case 335:
        a.Types.push({ name: c.name });
        break;
      case 51:
        c.forEach(function(u) {
          f == 1 ? a.Cell.push({ type: a.Types[u[0] - 1].name, index: u[1] }) : f == 0 && a.Value.push({ type: a.Types[u[0] - 1].name, index: u[1] });
        });
        break;
      case 337:
        f = c ? 1 : 0;
        break;
      case 338:
        f = 2;
        break;
      case 35:
        i.push(o), s = !0;
        break;
      case 36:
        i.pop(), s = !1;
        break;
      default:
        if (!l.T) {
          if (!s || n.WTF && i[i.length - 1] != 35)
            throw new Error("Unexpected record 0x" + o.toString(16));
        }
    }
  }), a;
}
function yd() {
  var e = it();
  return ee(e, 332), ee(e, 334, Pt(1)), ee(e, 335, md({
    name: "XLDAPR",
    version: 12e4,
    flags: 3496657072
  })), ee(e, 336), ee(e, 339, wd(1, "XLDAPR")), ee(e, 52), ee(e, 35, Pt(514)), ee(e, 4096, Pt(0)), ee(e, 4097, yt(1)), ee(e, 36), ee(e, 53), ee(e, 340), ee(e, 337, Ed(1)), ee(e, 51, _d([[1, 0]])), ee(e, 338), ee(e, 333), e.end();
}
function Sd(e, t, r) {
  var a = { Types: [], Cell: [], Value: [] };
  if (!e)
    return a;
  var n = !1, i = 2, s;
  return e.replace(Jr, function(f) {
    var c = be(f);
    switch (Xt(c[0])) {
      case "<?xml":
        break;
      case "<metadata":
      case "</metadata>":
        break;
      case "<metadataTypes":
      case "</metadataTypes>":
        break;
      case "<metadataType":
        a.Types.push({ name: c.name });
        break;
      case "</metadataType>":
        break;
      case "<futureMetadata":
        for (var l = 0; l < a.Types.length; ++l)
          a.Types[l].name == c.name && (s = a.Types[l]);
        break;
      case "</futureMetadata>":
        break;
      case "<bk>":
        break;
      case "</bk>":
        break;
      case "<rc":
        i == 1 ? a.Cell.push({ type: a.Types[c.t - 1].name, index: +c.v }) : i == 0 && a.Value.push({ type: a.Types[c.t - 1].name, index: +c.v });
        break;
      case "</rc>":
        break;
      case "<cellMetadata":
        i = 1;
        break;
      case "</cellMetadata>":
        i = 2;
        break;
      case "<valueMetadata":
        i = 0;
        break;
      case "</valueMetadata>":
        i = 2;
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
      case "<extLst/>":
        break;
      case "<ext":
        n = !0;
        break;
      case "</ext>":
        n = !1;
        break;
      case "<rvb":
        if (!s)
          break;
        s.offsets || (s.offsets = []), s.offsets.push(+c.i);
        break;
      default:
        if (!n && r.WTF)
          throw new Error("unrecognized " + c[0] + " in metadata");
    }
    return f;
  }), a;
}
function rl() {
  var e = [kr];
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
function Fd(e) {
  var t = [];
  if (!e) return t;
  var r = 1;
  return (e.match(Jr) || []).forEach(function(a) {
    var n = be(a);
    switch (n[0]) {
      case "<?xml":
        break;
      case "<calcChain":
      case "<calcChain>":
      case "</calcChain>":
        break;
      case "<c":
        delete n[0], n.i ? r = n.i : n.i = r, t.push(n);
        break;
    }
  }), t;
}
function Ad(e) {
  var t = {};
  t.i = e.read_shift(4);
  var r = {};
  r.r = e.read_shift(4), r.c = e.read_shift(4), t.r = Ce(r);
  var a = e.read_shift(1);
  return a & 2 && (t.l = "1"), a & 8 && (t.a = "1"), t;
}
function Cd(e, t, r) {
  var a = [];
  return Zt(e, function(i, s, f) {
    switch (f) {
      case 63:
        a.push(i);
        break;
      default:
        if (!s.T) throw new Error("Unexpected record 0x" + f.toString(16));
    }
  }), a;
}
function bd(e, t, r, a) {
  if (!e) return e;
  var n = a || {}, i = !1;
  Zt(e, function(f, c, l) {
    switch (l) {
      case 359:
      case 363:
      case 364:
      case 366:
      case 367:
      case 368:
      case 369:
      case 370:
      case 371:
      case 472:
      case 577:
      case 578:
      case 579:
      case 580:
      case 581:
      case 582:
      case 583:
      case 584:
      case 585:
      case 586:
      case 587:
        break;
      case 35:
        i = !0;
        break;
      case 36:
        i = !1;
        break;
      default:
        if (!c.T) {
          if (!i || n.WTF) throw new Error("Unexpected record 0x" + l.toString(16));
        }
    }
  }, n);
}
function Dd(e, t) {
  if (!e) return "??";
  var r = (e.match(/<c:chart [^>]*r:id="([^"]*)"/) || ["", ""])[1];
  return t["!id"][r].Target;
}
var Ya = 1024;
function tl(e, t) {
  for (var r = [21600, 21600], a = ["m0,0l0", r[1], r[0], r[1], r[0], "0xe"].join(","), n = [
    oe("xml", null, { "xmlns:v": lt.v, "xmlns:o": lt.o, "xmlns:x": lt.x, "xmlns:mv": lt.mv }).replace(/\/>/, ">"),
    oe("o:shapelayout", oe("o:idmap", null, { "v:ext": "edit", data: e }), { "v:ext": "edit" }),
    oe("v:shapetype", [
      oe("v:stroke", null, { joinstyle: "miter" }),
      oe("v:path", null, { gradientshapeok: "t", "o:connecttype": "rect" })
    ].join(""), { id: "_x0000_t202", "o:spt": 202, coordsize: r.join(","), path: a })
  ]; Ya < e * 1e3; ) Ya += 1e3;
  return t.forEach(function(i) {
    var s = hr(i[0]), f = (
      /*::(*/
      { color2: "#BEFF82", type: "gradient" }
    );
    f.type == "gradient" && (f.angle = "-180");
    var c = f.type == "gradient" ? oe("o:fill", null, { type: "gradientUnscaled", "v:ext": "view" }) : null, l = oe("v:fill", c, f), o = { on: "t", obscured: "t" };
    ++Ya, n = n.concat([
      "<v:shape" + In({
        id: "_x0000_s" + Ya,
        type: "#_x0000_t202",
        style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" + (i[1].hidden ? ";visibility:hidden" : ""),
        fillcolor: "#ECFAD4",
        strokecolor: "#edeaa1"
      }) + ">",
      l,
      oe("v:shadow", null, o),
      oe("v:path", null, { "o:connecttype": "none" }),
      '<v:textbox><div style="text-align:left"></div></v:textbox>',
      '<x:ClientData ObjectType="Note">',
      "<x:MoveWithCells/>",
      "<x:SizeWithCells/>",
      /* Part 4 19.4.2.3 Anchor (Anchor) */
      Ur("x:Anchor", [s.c + 1, 0, s.r + 1, 0, s.c + 3, 20, s.r + 5, 20].join(",")),
      Ur("x:AutoFill", "False"),
      Ur("x:Row", String(s.r)),
      Ur("x:Column", String(s.c)),
      i[1].hidden ? "" : "<x:Visible/>",
      "</x:ClientData>",
      "</v:shape>"
    ]);
  }), n.push("</xml>"), n.join("");
}
function uf(e, t, r, a) {
  var n = Array.isArray(e), i;
  t.forEach(function(s) {
    var f = hr(s.ref);
    if (n ? (e[f.r] || (e[f.r] = []), i = e[f.r][f.c]) : i = e[s.ref], !i) {
      i = { t: "z" }, n ? e[f.r][f.c] = i : e[s.ref] = i;
      var c = $e(e["!ref"] || "BDWGO1000001:A1");
      c.s.r > f.r && (c.s.r = f.r), c.e.r < f.r && (c.e.r = f.r), c.s.c > f.c && (c.s.c = f.c), c.e.c < f.c && (c.e.c = f.c);
      var l = Ne(c);
      l !== e["!ref"] && (e["!ref"] = l);
    }
    i.c || (i.c = []);
    var o = { a: s.author, t: s.t, r: s.r, T: r };
    s.h && (o.h = s.h);
    for (var u = i.c.length - 1; u >= 0; --u) {
      if (!r && i.c[u].T) return;
      r && !i.c[u].T && i.c.splice(u, 1);
    }
    if (r && a) {
      for (u = 0; u < a.length; ++u)
        if (o.a == a[u].id) {
          o.a = a[u].name || o.a;
          break;
        }
    }
    i.c.push(o);
  });
}
function Id(e, t) {
  if (e.match(/<(?:\w+:)?comments *\/>/)) return [];
  var r = [], a = [], n = e.match(/<(?:\w+:)?authors>([\s\S]*)<\/(?:\w+:)?authors>/);
  n && n[1] && n[1].split(/<\/\w*:?author>/).forEach(function(s) {
    if (!(s === "" || s.trim() === "")) {
      var f = s.match(/<(?:\w+:)?author[^>]*>(.*)/);
      f && r.push(f[1]);
    }
  });
  var i = e.match(/<(?:\w+:)?commentList>([\s\S]*)<\/(?:\w+:)?commentList>/);
  return i && i[1] && i[1].split(/<\/\w*:?comment>/).forEach(function(s) {
    if (!(s === "" || s.trim() === "")) {
      var f = s.match(/<(?:\w+:)?comment[^>]*>/);
      if (f) {
        var c = be(f[0]), l = { author: c.authorId && r[c.authorId] || "sheetjsghost", ref: c.ref, guid: c.guid }, o = hr(c.ref);
        if (!(t.sheetRows && t.sheetRows <= o.r)) {
          var u = s.match(/<(?:\w+:)?text>([\s\S]*)<\/(?:\w+:)?text>/), x = !!u && !!u[1] && zi(u[1]) || { r: "", t: "", h: "" };
          l.r = x.r, x.r == "<t></t>" && (x.t = x.h = ""), l.t = (x.t || "").replace(/\r\n/g, `
`).replace(/\r/g, `
`), t.cellHTML && (l.h = x.h), a.push(l);
        }
      }
    }
  }), a;
}
function al(e) {
  var t = [kr, oe("comments", null, { xmlns: ba[0] })], r = [];
  return t.push("<authors>"), e.forEach(function(a) {
    a[1].forEach(function(n) {
      var i = er(n.a);
      r.indexOf(i) == -1 && (r.push(i), t.push("<author>" + i + "</author>")), n.T && n.ID && r.indexOf("tc=" + n.ID) == -1 && (r.push("tc=" + n.ID), t.push("<author>tc=" + n.ID + "</author>"));
    });
  }), r.length == 0 && (r.push("SheetJ5"), t.push("<author>SheetJ5</author>")), t.push("</authors>"), t.push("<commentList>"), e.forEach(function(a) {
    var n = 0, i = [];
    if (a[1][0] && a[1][0].T && a[1][0].ID ? n = r.indexOf("tc=" + a[1][0].ID) : a[1].forEach(function(c) {
      c.a && (n = r.indexOf(er(c.a))), i.push(c.t || "");
    }), t.push('<comment ref="' + a[0] + '" authorId="' + n + '"><text>'), i.length <= 1) t.push(Ur("t", er(i[0] || "")));
    else {
      for (var s = `Comment:
    ` + i[0] + `
`, f = 1; f < i.length; ++f) s += `Reply:
    ` + i[f] + `
`;
      t.push(Ur("t", er(s)));
    }
    t.push("</text></comment>");
  }), t.push("</commentList>"), t.length > 2 && (t[t.length] = "</comments>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function Od(e, t) {
  var r = [], a = !1, n = {}, i = 0;
  return e.replace(Jr, function(f, c) {
    var l = be(f);
    switch (Xt(l[0])) {
      case "<?xml":
        break;
      case "<ThreadedComments":
        break;
      case "</ThreadedComments>":
        break;
      case "<threadedComment":
        n = { author: l.personId, guid: l.id, ref: l.ref, T: 1 };
        break;
      case "</threadedComment>":
        n.t != null && r.push(n);
        break;
      case "<text>":
      case "<text":
        i = c + f.length;
        break;
      case "</text>":
        n.t = e.slice(i, c).replace(/\r\n/g, `
`).replace(/\r/g, `
`);
        break;
      case "<mentions":
      case "<mentions>":
        a = !0;
        break;
      case "</mentions>":
        a = !1;
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
      case "<extLst/>":
        break;
      case "<ext":
        a = !0;
        break;
      case "</ext>":
        a = !1;
        break;
      default:
        if (!a && t.WTF) throw new Error("unrecognized " + l[0] + " in threaded comments");
    }
    return f;
  }), r;
}
function Nd(e, t, r) {
  var a = [kr, oe("ThreadedComments", null, { xmlns: Fr.TCMNT }).replace(/[\/]>/, ">")];
  return e.forEach(function(n) {
    var i = "";
    (n[1] || []).forEach(function(s, f) {
      if (!s.T) {
        delete s.ID;
        return;
      }
      s.a && t.indexOf(s.a) == -1 && t.push(s.a);
      var c = {
        ref: n[0],
        id: "{54EE7951-7262-4200-6969-" + ("000000000000" + r.tcid++).slice(-12) + "}"
      };
      f == 0 ? i = c.id : c.parentId = i, s.ID = c.id, s.a && (c.personId = "{54EE7950-7262-4200-6969-" + ("000000000000" + t.indexOf(s.a)).slice(-12) + "}"), a.push(oe("threadedComment", Ur("text", s.t || ""), c));
    });
  }), a.push("</ThreadedComments>"), a.join("");
}
function Rd(e, t) {
  var r = [], a = !1;
  return e.replace(Jr, function(i) {
    var s = be(i);
    switch (Xt(s[0])) {
      case "<?xml":
        break;
      case "<personList":
        break;
      case "</personList>":
        break;
      case "<person":
        r.push({ name: s.displayname, id: s.id });
        break;
      case "</person>":
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
      case "<extLst/>":
        break;
      case "<ext":
        a = !0;
        break;
      case "</ext>":
        a = !1;
        break;
      default:
        if (!a && t.WTF) throw new Error("unrecognized " + s[0] + " in threaded comments");
    }
    return i;
  }), r;
}
function Ld(e) {
  var t = [kr, oe("personList", null, {
    xmlns: Fr.TCMNT,
    "xmlns:x": ba[0]
  }).replace(/[\/]>/, ">")];
  return e.forEach(function(r, a) {
    t.push(oe("person", null, {
      displayName: r,
      id: "{54EE7950-7262-4200-6969-" + ("000000000000" + a).slice(-12) + "}",
      userId: r,
      providerId: "None"
    }));
  }), t.push("</personList>"), t.join("");
}
function Pd(e) {
  var t = {};
  t.iauthor = e.read_shift(4);
  var r = Na(e);
  return t.rfx = r.s, t.ref = Ce(r.s), e.l += 16, t;
}
function Bd(e, t) {
  return t == null && (t = Z(36)), t.write_shift(4, e[1].iauthor), fn(e[0], t), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var Md = Kr;
function Ud(e) {
  return Ir(e.slice(0, 54));
}
function Wd(e, t) {
  var r = [], a = [], n = {}, i = !1;
  return Zt(e, function(f, c, l) {
    switch (l) {
      case 632:
        a.push(f);
        break;
      case 635:
        n = f;
        break;
      case 637:
        n.t = f.t, n.h = f.h, n.r = f.r;
        break;
      case 636:
        if (n.author = a[n.iauthor], delete n.iauthor, t.sheetRows && n.rfx && t.sheetRows <= n.rfx.r) break;
        n.t || (n.t = ""), delete n.rfx, r.push(n);
        break;
      case 3072:
        break;
      case 35:
        i = !0;
        break;
      case 36:
        i = !1;
        break;
      case 37:
        break;
      case 38:
        break;
      default:
        if (!c.T) {
          if (!i || t.WTF) throw new Error("Unexpected record 0x" + l.toString(16));
        }
    }
  }), r;
}
function Vd(e) {
  var t = it(), r = [];
  return ee(
    t,
    628
    /* BrtBeginComments */
  ), ee(
    t,
    630
    /* BrtBeginCommentAuthors */
  ), e.forEach(function(a) {
    a[1].forEach(function(n) {
      r.indexOf(n.a) > -1 || (r.push(n.a.slice(0, 54)), ee(t, 632, Ud(n.a)));
    });
  }), ee(
    t,
    631
    /* BrtEndCommentAuthors */
  ), ee(
    t,
    633
    /* BrtBeginCommentList */
  ), e.forEach(function(a) {
    a[1].forEach(function(n) {
      n.iauthor = r.indexOf(n.a);
      var i = { s: hr(a[0]), e: hr(a[0]) };
      ee(t, 635, Bd([i, n])), n.t && n.t.length > 0 && ee(t, 637, lu(n)), ee(
        t,
        636
        /* BrtEndComment */
      ), delete n.iauthor;
    });
  }), ee(
    t,
    634
    /* BrtEndCommentList */
  ), ee(
    t,
    629
    /* BrtEndComments */
  ), t.end();
}
var Hd = "application/vnd.ms-office.vbaProject";
function Xd(e) {
  var t = ye.utils.cfb_new({ root: "R" });
  return e.FullPaths.forEach(function(r, a) {
    if (!(r.slice(-1) === "/" || !r.match(/_VBA_PROJECT_CUR/))) {
      var n = r.replace(/^[^\/]*/, "R").replace(/\/_VBA_PROJECT_CUR\u0000*/, "");
      ye.utils.cfb_add(t, n, e.FileIndex[a].content);
    }
  }), ye.write(t);
}
function zd(e, t) {
  t.FullPaths.forEach(function(r, a) {
    if (a != 0) {
      var n = r.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
      n.slice(-1) !== "/" && ye.utils.cfb_add(e, n, t.FileIndex[a].content);
    }
  });
}
var nl = ["xlsb", "xlsm", "xlam", "biff8", "xla"];
function Gd() {
  return { "!type": "dialog" };
}
function $d() {
  return { "!type": "dialog" };
}
function jd() {
  return { "!type": "macro" };
}
function Kd() {
  return { "!type": "macro" };
}
var Za = /* @__PURE__ */ function() {
  var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g, t = { r: 0, c: 0 };
  function r(a, n, i, s) {
    var f = !1, c = !1;
    i.length == 0 ? c = !0 : i.charAt(0) == "[" && (c = !0, i = i.slice(1, -1)), s.length == 0 ? f = !0 : s.charAt(0) == "[" && (f = !0, s = s.slice(1, -1));
    var l = i.length > 0 ? parseInt(i, 10) | 0 : 0, o = s.length > 0 ? parseInt(s, 10) | 0 : 0;
    return f ? o += t.c : --o, c ? l += t.r : --l, n + (f ? "" : "$") + ur(o) + (c ? "" : "$") + wr(l);
  }
  return function(n, i) {
    return t = i, n.replace(e, r);
  };
}(), Ki = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g, Yi = /* @__PURE__ */ function() {
  return function(t, r) {
    return t.replace(Ki, function(a, n, i, s, f, c) {
      var l = Li(s) - (i ? 0 : r.c), o = Ri(c) - (f ? 0 : r.r), u = o == 0 ? "" : f ? o + 1 : "[" + o + "]", x = l == 0 ? "" : i ? l + 1 : "[" + l + "]";
      return n + "R" + u + "C" + x;
    });
  };
}();
function il(e, t) {
  return e.replace(Ki, function(r, a, n, i, s, f) {
    return a + (n == "$" ? n + i : ur(Li(i) + t.c)) + (s == "$" ? s + f : wr(Ri(f) + t.r));
  });
}
function Yd(e, t, r) {
  var a = st(t), n = a.s, i = hr(r), s = { r: i.r - n.r, c: i.c - n.c };
  return il(e, s);
}
function Jd(e) {
  return e.length != 1;
}
function hf(e) {
  return e.replace(/_xlfn\./g, "");
}
function Er(e) {
  e.l += 1;
}
function ia(e, t) {
  var r = e.read_shift(2);
  return [r & 16383, r >> 14 & 1, r >> 15 & 1];
}
function sl(e, t, r) {
  var a = 2;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5) return fl(e);
    r.biff == 12 && (a = 4);
  }
  var n = e.read_shift(a), i = e.read_shift(a), s = ia(e), f = ia(e);
  return { s: { r: n, c: s[0], cRel: s[1], rRel: s[2] }, e: { r: i, c: f[0], cRel: f[1], rRel: f[2] } };
}
function fl(e) {
  var t = ia(e), r = ia(e), a = e.read_shift(1), n = e.read_shift(1);
  return { s: { r: t[0], c: a, cRel: t[1], rRel: t[2] }, e: { r: r[0], c: n, cRel: r[1], rRel: r[2] } };
}
function qd(e, t, r) {
  if (r.biff < 8) return fl(e);
  var a = e.read_shift(r.biff == 12 ? 4 : 2), n = e.read_shift(r.biff == 12 ? 4 : 2), i = ia(e), s = ia(e);
  return { s: { r: a, c: i[0], cRel: i[1], rRel: i[2] }, e: { r: n, c: s[0], cRel: s[1], rRel: s[2] } };
}
function cl(e, t, r) {
  if (r && r.biff >= 2 && r.biff <= 5) return Zd(e);
  var a = e.read_shift(r && r.biff == 12 ? 4 : 2), n = ia(e);
  return { r: a, c: n[0], cRel: n[1], rRel: n[2] };
}
function Zd(e) {
  var t = ia(e), r = e.read_shift(1);
  return { r: t[0], c: r, cRel: t[1], rRel: t[2] };
}
function Qd(e) {
  var t = e.read_shift(2), r = e.read_shift(2);
  return { r: t, c: r & 255, fQuoted: !!(r & 16384), cRel: r >> 15, rRel: r >> 15 };
}
function ep(e, t, r) {
  var a = r && r.biff ? r.biff : 8;
  if (a >= 2 && a <= 5) return rp(e);
  var n = e.read_shift(a >= 12 ? 4 : 2), i = e.read_shift(2), s = (i & 16384) >> 14, f = (i & 32768) >> 15;
  if (i &= 16383, f == 1) for (; n > 524287; ) n -= 1048576;
  if (s == 1) for (; i > 8191; ) i = i - 16384;
  return { r: n, c: i, cRel: s, rRel: f };
}
function rp(e) {
  var t = e.read_shift(2), r = e.read_shift(1), a = (t & 32768) >> 15, n = (t & 16384) >> 14;
  return t &= 16383, a == 1 && t >= 8192 && (t = t - 16384), n == 1 && r >= 128 && (r = r - 256), { r: t, c: r, cRel: n, rRel: a };
}
function tp(e, t, r) {
  var a = (e[e.l++] & 96) >> 5, n = sl(e, r.biff >= 2 && r.biff <= 5 ? 6 : 8, r);
  return [a, n];
}
function ap(e, t, r) {
  var a = (e[e.l++] & 96) >> 5, n = e.read_shift(2, "i"), i = 8;
  if (r) switch (r.biff) {
    case 5:
      e.l += 12, i = 6;
      break;
    case 12:
      i = 12;
      break;
  }
  var s = sl(e, i, r);
  return [a, n, s];
}
function np(e, t, r) {
  var a = (e[e.l++] & 96) >> 5;
  return e.l += r && r.biff > 8 ? 12 : r.biff < 8 ? 6 : 8, [a];
}
function ip(e, t, r) {
  var a = (e[e.l++] & 96) >> 5, n = e.read_shift(2), i = 8;
  if (r) switch (r.biff) {
    case 5:
      e.l += 12, i = 6;
      break;
    case 12:
      i = 12;
      break;
  }
  return e.l += i, [a, n];
}
function sp(e, t, r) {
  var a = (e[e.l++] & 96) >> 5, n = qd(e, t - 1, r);
  return [a, n];
}
function fp(e, t, r) {
  var a = (e[e.l++] & 96) >> 5;
  return e.l += r.biff == 2 ? 6 : r.biff == 12 ? 14 : 7, [a];
}
function xf(e) {
  var t = e[e.l + 1] & 1, r = 1;
  return e.l += 4, [t, r];
}
function cp(e, t, r) {
  e.l += 2;
  for (var a = e.read_shift(r && r.biff == 2 ? 1 : 2), n = [], i = 0; i <= a; ++i) n.push(e.read_shift(r && r.biff == 2 ? 1 : 2));
  return n;
}
function lp(e, t, r) {
  var a = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [a, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function op(e, t, r) {
  var a = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [a, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function up(e) {
  var t = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [t, e.read_shift(2)];
}
function hp(e, t, r) {
  var a = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += r && r.biff == 2 ? 3 : 4, [a];
}
function ll(e) {
  var t = e.read_shift(1), r = e.read_shift(1);
  return [t, r];
}
function xp(e) {
  return e.read_shift(2), ll(e);
}
function dp(e) {
  return e.read_shift(2), ll(e);
}
function pp(e, t, r) {
  var a = (e[e.l] & 96) >> 5;
  e.l += 1;
  var n = cl(e, 0, r);
  return [a, n];
}
function vp(e, t, r) {
  var a = (e[e.l] & 96) >> 5;
  e.l += 1;
  var n = ep(e, 0, r);
  return [a, n];
}
function mp(e, t, r) {
  var a = (e[e.l] & 96) >> 5;
  e.l += 1;
  var n = e.read_shift(2);
  r && r.biff == 5 && (e.l += 12);
  var i = cl(e, 0, r);
  return [a, n, i];
}
function gp(e, t, r) {
  var a = (e[e.l] & 96) >> 5;
  e.l += 1;
  var n = e.read_shift(r && r.biff <= 3 ? 1 : 2);
  return [kv[n], hl[n], a];
}
function _p(e, t, r) {
  var a = e[e.l++], n = e.read_shift(1), i = r && r.biff <= 3 ? [a == 88 ? -1 : 0, e.read_shift(1)] : wp(e);
  return [n, (i[0] === 0 ? hl : wv)[i[1]]];
}
function wp(e) {
  return [e[e.l + 1] >> 7, e.read_shift(2) & 32767];
}
function kp(e, t, r) {
  e.l += r && r.biff == 2 ? 3 : 4;
}
function Ep(e, t, r) {
  if (e.l++, r && r.biff == 12) return [e.read_shift(4, "i"), 0];
  var a = e.read_shift(2), n = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [a, n];
}
function Tp(e) {
  return e.l++, Qt[e.read_shift(1)];
}
function yp(e) {
  return e.l++, e.read_shift(2);
}
function Sp(e) {
  return e.l++, e.read_shift(1) !== 0;
}
function Fp(e) {
  return e.l++, jr(e);
}
function Ap(e, t, r) {
  return e.l++, Xn(e, t - 1, r);
}
function Cp(e, t) {
  var r = [e.read_shift(1)];
  if (t == 12) switch (r[0]) {
    case 2:
      r[0] = 4;
      break;
    case 4:
      r[0] = 16;
      break;
    case 0:
      r[0] = 1;
      break;
    case 1:
      r[0] = 2;
      break;
  }
  switch (r[0]) {
    case 4:
      r[1] = _r(e, 1) ? "TRUE" : "FALSE", t != 12 && (e.l += 7);
      break;
    case 37:
    case 16:
      r[1] = Qt[e[e.l]], e.l += t == 12 ? 4 : 8;
      break;
    case 0:
      e.l += 8;
      break;
    case 1:
      r[1] = jr(e);
      break;
    case 2:
      r[1] = Ra(e, 0, { biff: t > 0 && t < 8 ? 2 : t });
      break;
    default:
      throw new Error("Bad SerAr: " + r[0]);
  }
  return r;
}
function bp(e, t, r) {
  for (var a = e.read_shift(r.biff == 12 ? 4 : 2), n = [], i = 0; i != a; ++i) n.push((r.biff == 12 ? Na : C0)(e));
  return n;
}
function Dp(e, t, r) {
  var a = 0, n = 0;
  r.biff == 12 ? (a = e.read_shift(4), n = e.read_shift(4)) : (n = 1 + e.read_shift(1), a = 1 + e.read_shift(2)), r.biff >= 2 && r.biff < 8 && (--a, --n == 0 && (n = 256));
  for (var i = 0, s = []; i != a && (s[i] = []); ++i)
    for (var f = 0; f != n; ++f) s[i][f] = Cp(e, r.biff);
  return s;
}
function Ip(e, t, r) {
  var a = e.read_shift(1) >>> 5 & 3, n = !r || r.biff >= 8 ? 4 : 2, i = e.read_shift(n);
  switch (r.biff) {
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
  return [a, 0, i];
}
function Op(e, t, r) {
  if (r.biff == 5) return Np(e);
  var a = e.read_shift(1) >>> 5 & 3, n = e.read_shift(2), i = e.read_shift(4);
  return [a, n, i];
}
function Np(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2, "i");
  e.l += 8;
  var a = e.read_shift(2);
  return e.l += 12, [t, r, a];
}
function Rp(e, t, r) {
  var a = e.read_shift(1) >>> 5 & 3;
  e.l += r && r.biff == 2 ? 3 : 4;
  var n = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [a, n];
}
function Lp(e, t, r) {
  var a = e.read_shift(1) >>> 5 & 3, n = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [a, n];
}
function Pp(e, t, r) {
  var a = e.read_shift(1) >>> 5 & 3;
  return e.l += 4, r.biff < 8 && e.l--, r.biff == 12 && (e.l += 2), [a];
}
function Bp(e, t, r) {
  var a = (e[e.l++] & 96) >> 5, n = e.read_shift(2), i = 4;
  if (r) switch (r.biff) {
    case 5:
      i = 15;
      break;
    case 12:
      i = 6;
      break;
  }
  return e.l += i, [a, n];
}
var Mp = Yr, Up = Yr, Wp = Yr;
function Gn(e, t, r) {
  return e.l += 2, [Qd(e)];
}
function Ji(e) {
  return e.l += 6, [];
}
var Vp = Gn, Hp = Ji, Xp = Ji, zp = Gn;
function ol(e) {
  return e.l += 2, [yr(e), e.read_shift(2) & 1];
}
var Gp = Gn, $p = ol, jp = Ji, Kp = Gn, Yp = Gn, Jp = [
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
function qp(e) {
  e.l += 2;
  var t = e.read_shift(2), r = e.read_shift(2), a = e.read_shift(4), n = e.read_shift(2), i = e.read_shift(2), s = Jp[r >> 2 & 31];
  return { ixti: t, coltype: r & 3, rt: s, idx: a, c: n, C: i };
}
function Zp(e) {
  return e.l += 2, [e.read_shift(4)];
}
function Qp(e, t, r) {
  return e.l += 5, e.l += 2, e.l += r.biff == 2 ? 1 : 4, ["PTGSHEET"];
}
function ev(e, t, r) {
  return e.l += r.biff == 2 ? 4 : 5, ["PTGENDSHEET"];
}
function rv(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function tv(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function av(e) {
  return e.l += 4, [0, 0];
}
var df = {
  /*::[*/
  1: { n: "PtgExp", f: Ep },
  /*::[*/
  2: { n: "PtgTbl", f: Wp },
  /*::[*/
  3: { n: "PtgAdd", f: Er },
  /*::[*/
  4: { n: "PtgSub", f: Er },
  /*::[*/
  5: { n: "PtgMul", f: Er },
  /*::[*/
  6: { n: "PtgDiv", f: Er },
  /*::[*/
  7: { n: "PtgPower", f: Er },
  /*::[*/
  8: { n: "PtgConcat", f: Er },
  /*::[*/
  9: { n: "PtgLt", f: Er },
  /*::[*/
  10: { n: "PtgLe", f: Er },
  /*::[*/
  11: { n: "PtgEq", f: Er },
  /*::[*/
  12: { n: "PtgGe", f: Er },
  /*::[*/
  13: { n: "PtgGt", f: Er },
  /*::[*/
  14: { n: "PtgNe", f: Er },
  /*::[*/
  15: { n: "PtgIsect", f: Er },
  /*::[*/
  16: { n: "PtgUnion", f: Er },
  /*::[*/
  17: { n: "PtgRange", f: Er },
  /*::[*/
  18: { n: "PtgUplus", f: Er },
  /*::[*/
  19: { n: "PtgUminus", f: Er },
  /*::[*/
  20: { n: "PtgPercent", f: Er },
  /*::[*/
  21: { n: "PtgParen", f: Er },
  /*::[*/
  22: { n: "PtgMissArg", f: Er },
  /*::[*/
  23: { n: "PtgStr", f: Ap },
  /*::[*/
  26: { n: "PtgSheet", f: Qp },
  /*::[*/
  27: { n: "PtgEndSheet", f: ev },
  /*::[*/
  28: { n: "PtgErr", f: Tp },
  /*::[*/
  29: { n: "PtgBool", f: Sp },
  /*::[*/
  30: { n: "PtgInt", f: yp },
  /*::[*/
  31: { n: "PtgNum", f: Fp },
  /*::[*/
  32: { n: "PtgArray", f: fp },
  /*::[*/
  33: { n: "PtgFunc", f: gp },
  /*::[*/
  34: { n: "PtgFuncVar", f: _p },
  /*::[*/
  35: { n: "PtgName", f: Ip },
  /*::[*/
  36: { n: "PtgRef", f: pp },
  /*::[*/
  37: { n: "PtgArea", f: tp },
  /*::[*/
  38: { n: "PtgMemArea", f: Rp },
  /*::[*/
  39: { n: "PtgMemErr", f: Mp },
  /*::[*/
  40: { n: "PtgMemNoMem", f: Up },
  /*::[*/
  41: { n: "PtgMemFunc", f: Lp },
  /*::[*/
  42: { n: "PtgRefErr", f: Pp },
  /*::[*/
  43: { n: "PtgAreaErr", f: np },
  /*::[*/
  44: { n: "PtgRefN", f: vp },
  /*::[*/
  45: { n: "PtgAreaN", f: sp },
  /*::[*/
  46: { n: "PtgMemAreaN", f: rv },
  /*::[*/
  47: { n: "PtgMemNoMemN", f: tv },
  /*::[*/
  57: { n: "PtgNameX", f: Op },
  /*::[*/
  58: { n: "PtgRef3d", f: mp },
  /*::[*/
  59: { n: "PtgArea3d", f: ap },
  /*::[*/
  60: { n: "PtgRefErr3d", f: Bp },
  /*::[*/
  61: { n: "PtgAreaErr3d", f: ip },
  /*::[*/
  255: {}
}, nv = {
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
}, iv = {
  /*::[*/
  1: { n: "PtgElfLel", f: ol },
  /*::[*/
  2: { n: "PtgElfRw", f: Kp },
  /*::[*/
  3: { n: "PtgElfCol", f: Vp },
  /*::[*/
  6: { n: "PtgElfRwV", f: Yp },
  /*::[*/
  7: { n: "PtgElfColV", f: zp },
  /*::[*/
  10: { n: "PtgElfRadical", f: Gp },
  /*::[*/
  11: { n: "PtgElfRadicalS", f: jp },
  /*::[*/
  13: { n: "PtgElfColS", f: Hp },
  /*::[*/
  15: { n: "PtgElfColSV", f: Xp },
  /*::[*/
  16: { n: "PtgElfRadicalLel", f: $p },
  /*::[*/
  25: { n: "PtgList", f: qp },
  /*::[*/
  29: { n: "PtgSxName", f: Zp },
  /*::[*/
  255: {}
}, sv = {
  /*::[*/
  0: { n: "PtgAttrNoop", f: av },
  /*::[*/
  1: { n: "PtgAttrSemi", f: hp },
  /*::[*/
  2: { n: "PtgAttrIf", f: op },
  /*::[*/
  4: { n: "PtgAttrChoose", f: cp },
  /*::[*/
  8: { n: "PtgAttrGoto", f: lp },
  /*::[*/
  16: { n: "PtgAttrSum", f: kp },
  /*::[*/
  32: { n: "PtgAttrBaxcel", f: xf },
  /*::[*/
  33: { n: "PtgAttrBaxcel", f: xf },
  /*::[*/
  64: { n: "PtgAttrSpace", f: xp },
  /*::[*/
  65: { n: "PtgAttrSpaceSemi", f: dp },
  /*::[*/
  128: { n: "PtgAttrIfError", f: up },
  /*::[*/
  255: {}
};
function $n(e, t, r, a) {
  if (a.biff < 8) return Yr(e, t);
  for (var n = e.l + t, i = [], s = 0; s !== r.length; ++s)
    switch (r[s][0]) {
      case "PtgArray":
        r[s][1] = Dp(e, 0, a), i.push(r[s][1]);
        break;
      case "PtgMemArea":
        r[s][2] = bp(e, r[s][1], a), i.push(r[s][2]);
        break;
      case "PtgExp":
        a && a.biff == 12 && (r[s][1][1] = e.read_shift(4), i.push(r[s][1]));
        break;
      case "PtgList":
      case "PtgElfRadicalS":
      case "PtgElfColS":
      case "PtgElfColSV":
        throw "Unsupported " + r[s][0];
    }
  return t = n - e.l, t !== 0 && i.push(Yr(e, t)), i;
}
function jn(e, t, r) {
  for (var a = e.l + t, n, i, s = []; a != e.l; )
    t = a - e.l, i = e[e.l], n = df[i] || df[nv[i]], (i === 24 || i === 25) && (n = (i === 24 ? iv : sv)[e[e.l + 1]]), !n || !n.f ? Yr(e, t) : s.push([n.n, n.f(e, t, r)]);
  return s;
}
function fv(e) {
  for (var t = [], r = 0; r < e.length; ++r) {
    for (var a = e[r], n = [], i = 0; i < a.length; ++i) {
      var s = a[i];
      if (s) switch (s[0]) {
        case 2:
          n.push('"' + s[1].replace(/"/g, '""') + '"');
          break;
        default:
          n.push(s[1]);
      }
      else n.push("");
    }
    t.push(n.join(","));
  }
  return t.join(";");
}
var cv = {
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
function lv(e, t) {
  if (!e && !(t && t.biff <= 5 && t.biff >= 2)) throw new Error("empty sheet name");
  return /[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e) ? "'" + e + "'" : e;
}
function ul(e, t, r) {
  if (!e) return "SH33TJSERR0";
  if (r.biff > 8 && (!e.XTI || !e.XTI[t])) return e.SheetNames[t];
  if (!e.XTI) return "SH33TJSERR6";
  var a = e.XTI[t];
  if (r.biff < 8)
    return t > 1e4 && (t -= 65536), t < 0 && (t = -t), t == 0 ? "" : e.XTI[t - 1];
  if (!a) return "SH33TJSERR1";
  var n = "";
  if (r.biff > 8) switch (e[a[0]][0]) {
    case 357:
      return n = a[1] == -1 ? "#REF" : e.SheetNames[a[1]], a[1] == a[2] ? n : n + ":" + e.SheetNames[a[2]];
    case 358:
      return r.SID != null ? e.SheetNames[r.SID] : "SH33TJSSAME" + e[a[0]][0];
    case 355:
    default:
      return "SH33TJSSRC" + e[a[0]][0];
  }
  switch (e[a[0]][0][0]) {
    case 1025:
      return n = a[1] == -1 ? "#REF" : e.SheetNames[a[1]] || "SH33TJSERR3", a[1] == a[2] ? n : n + ":" + e.SheetNames[a[2]];
    case 14849:
      return e[a[0]].slice(1).map(function(i) {
        return i.Name;
      }).join(";;");
    default:
      return e[a[0]][0][3] ? (n = a[1] == -1 ? "#REF" : e[a[0]][0][3][a[1]] || "SH33TJSERR4", a[1] == a[2] ? n : n + ":" + e[a[0]][0][3][a[2]]) : "SH33TJSERR2";
  }
}
function pf(e, t, r) {
  var a = ul(e, t, r);
  return a == "#REF" ? a : lv(a, r);
}
function Gr(e, t, r, a, n) {
  var i = n && n.biff || 8, s = (
    /*range != null ? range :*/
    { s: { c: 0, r: 0 } }
  ), f = [], c, l, o, u = 0, x = 0, d, v = "";
  if (!e[0] || !e[0][0]) return "";
  for (var h = -1, g = "", T = 0, A = e[0].length; T < A; ++T) {
    var k = e[0][T];
    switch (k[0]) {
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
        if (c = f.pop(), l = f.pop(), h >= 0) {
          switch (e[0][h][1][0]) {
            case 0:
              g = vr(" ", e[0][h][1][1]);
              break;
            case 1:
              g = vr("\r", e[0][h][1][1]);
              break;
            default:
              if (g = "", n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][h][1][0]);
          }
          l = l + g, h = -1;
        }
        f.push(l + cv[k[0]] + c);
        break;
      case "PtgIsect":
        c = f.pop(), l = f.pop(), f.push(l + " " + c);
        break;
      case "PtgUnion":
        c = f.pop(), l = f.pop(), f.push(l + "," + c);
        break;
      case "PtgRange":
        c = f.pop(), l = f.pop(), f.push(l + ":" + c);
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
        o = wn(k[1][1], s, n), f.push(kn(o, i));
        break;
      case "PtgRefN":
        o = r ? wn(k[1][1], r, n) : k[1][1], f.push(kn(o, i));
        break;
      case "PtgRef3d":
        u = /*::Number(*/
        k[1][1], o = wn(k[1][2], s, n), v = pf(a, u, n), f.push(v + "!" + kn(o, i));
        break;
      case "PtgFunc":
      case "PtgFuncVar":
        var R = k[1][0], V = k[1][1];
        R || (R = 0), R &= 127;
        var N = R == 0 ? [] : f.slice(-R);
        f.length -= R, V === "User" && (V = N.shift()), f.push(V + "(" + N.join(",") + ")");
        break;
      case "PtgBool":
        f.push(k[1] ? "TRUE" : "FALSE");
        break;
      case "PtgInt":
        f.push(
          /*::String(*/
          k[1]
          /*::)*/
        );
        break;
      case "PtgNum":
        f.push(String(k[1]));
        break;
      case "PtgStr":
        f.push('"' + k[1].replace(/"/g, '""') + '"');
        break;
      case "PtgErr":
        f.push(
          /*::String(*/
          k[1]
          /*::)*/
        );
        break;
      case "PtgAreaN":
        d = Xs(k[1][1], r ? { s: r } : s, n), f.push(J0(d, n));
        break;
      case "PtgArea":
        d = Xs(k[1][1], s, n), f.push(J0(d, n));
        break;
      case "PtgArea3d":
        u = /*::Number(*/
        k[1][1], d = k[1][2], v = pf(a, u, n), f.push(v + "!" + J0(d, n));
        break;
      case "PtgAttrSum":
        f.push("SUM(" + f.pop() + ")");
        break;
      case "PtgAttrBaxcel":
      case "PtgAttrSemi":
        break;
      case "PtgName":
        x = k[1][2];
        var S = (a.names || [])[x - 1] || (a[0] || [])[x], z = S ? S.Name : "SH33TJSNAME" + String(x);
        z && z.slice(0, 6) == "_xlfn." && !n.xlfn && (z = z.slice(6)), f.push(z);
        break;
      case "PtgNameX":
        var L = k[1][1];
        x = k[1][2];
        var J;
        if (n.biff <= 5)
          L < 0 && (L = -L), a[L] && (J = a[L][x]);
        else {
          var j = "";
          if (((a[L] || [])[0] || [])[0] == 14849 || (((a[L] || [])[0] || [])[0] == 1025 ? a[L][x] && a[L][x].itab > 0 && (j = a.SheetNames[a[L][x].itab - 1] + "!") : j = a.SheetNames[x - 1] + "!"), a[L] && a[L][x]) j += a[L][x].Name;
          else if (a[0] && a[0][x]) j += a[0][x].Name;
          else {
            var H = (ul(a, L, n) || "").split(";;");
            H[x - 1] ? j = H[x - 1] : j += "SH33TJSERRX";
          }
          f.push(j);
          break;
        }
        J || (J = { Name: "SH33TJSERRY" }), f.push(J.Name);
        break;
      case "PtgParen":
        var re = "(", me = ")";
        if (h >= 0) {
          switch (g = "", e[0][h][1][0]) {
            case 2:
              re = vr(" ", e[0][h][1][1]) + re;
              break;
            case 3:
              re = vr("\r", e[0][h][1][1]) + re;
              break;
            case 4:
              me = vr(" ", e[0][h][1][1]) + me;
              break;
            case 5:
              me = vr("\r", e[0][h][1][1]) + me;
              break;
            default:
              if (n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][h][1][0]);
          }
          h = -1;
        }
        f.push(re + f.pop() + me);
        break;
      case "PtgRefErr":
        f.push("#REF!");
        break;
      case "PtgRefErr3d":
        f.push("#REF!");
        break;
      case "PtgExp":
        o = { c: k[1][1], r: k[1][0] };
        var xe = { c: r.c, r: r.r };
        if (a.sharedf[Ce(o)]) {
          var ve = a.sharedf[Ce(o)];
          f.push(Gr(ve, s, xe, a, n));
        } else {
          var de = !1;
          for (c = 0; c != a.arrayf.length; ++c)
            if (l = a.arrayf[c], !(o.c < l[0].s.c || o.c > l[0].e.c) && !(o.r < l[0].s.r || o.r > l[0].e.r)) {
              f.push(Gr(l[1], s, xe, a, n)), de = !0;
              break;
            }
          de || f.push(
            /*::String(*/
            k[1]
            /*::)*/
          );
        }
        break;
      case "PtgArray":
        f.push("{" + fv(
          /*::(*/
          k[1]
          /*:: :any)*/
        ) + "}");
        break;
      case "PtgMemArea":
        break;
      case "PtgAttrSpace":
      case "PtgAttrSpaceSemi":
        h = T;
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
        f.push("Table" + k[1].idx + "[#" + k[1].rt + "]");
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
        throw new Error("Unrecognized Formula Token: " + String(k));
      default:
        throw new Error("Unrecognized Formula Token: " + String(k));
    }
    var Xe = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
    if (n.biff != 3 && h >= 0 && Xe.indexOf(e[0][T][0]) == -1) {
      k = e[0][h];
      var K = !0;
      switch (k[1][0]) {
        case 4:
          K = !1;
        case 0:
          g = vr(" ", k[1][1]);
          break;
        case 5:
          K = !1;
        case 1:
          g = vr("\r", k[1][1]);
          break;
        default:
          if (g = "", n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + k[1][0]);
      }
      f.push((K ? g : "") + f.pop() + (K ? "" : g)), h = -1;
    }
  }
  if (f.length > 1 && n.WTF) throw new Error("bad formula stack");
  return f[0];
}
function ov(e, t, r) {
  var a = e.l + t, n = r.biff == 2 ? 1 : 2, i, s = e.read_shift(n);
  if (s == 65535) return [[], Yr(e, t - 2)];
  var f = jn(e, s, r);
  return t !== s + n && (i = $n(e, t - s - n, f, r)), e.l = a, [f, i];
}
function uv(e, t, r) {
  var a = e.l + t, n = r.biff == 2 ? 1 : 2, i, s = e.read_shift(n);
  if (s == 65535) return [[], Yr(e, t - 2)];
  var f = jn(e, s, r);
  return t !== s + n && (i = $n(e, t - s - n, f, r)), e.l = a, [f, i];
}
function hv(e, t, r, a) {
  var n = e.l + t, i = jn(e, a, r), s;
  return n !== e.l && (s = $n(e, n - e.l, i, r)), [i, s];
}
function xv(e, t, r) {
  var a = e.l + t, n, i = e.read_shift(2), s = jn(e, i, r);
  return i == 65535 ? [[], Yr(e, t - 2)] : (t !== i + 2 && (n = $n(e, a - i - 2, s, r)), [s, n]);
}
function dv(e) {
  var t;
  if ($t(e, e.l + 6) !== 65535) return [jr(e), "n"];
  switch (e[e.l]) {
    case 0:
      return e.l += 8, ["String", "s"];
    case 1:
      return t = e[e.l + 2] === 1, e.l += 8, [t, "b"];
    case 2:
      return t = e[e.l + 2], e.l += 8, [t, "e"];
    case 3:
      return e.l += 8, ["", "s"];
  }
  return [];
}
function pv(e) {
  if (e == null) {
    var t = Z(8);
    return t.write_shift(1, 3), t.write_shift(1, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 65535), t;
  } else if (typeof e == "number") return Sa(e);
  return Sa(0);
}
function ri(e, t, r) {
  var a = e.l + t, n = zt(e);
  r.biff == 2 && ++e.l;
  var i = dv(e), s = e.read_shift(1);
  r.biff != 2 && (e.read_shift(1), r.biff >= 5 && e.read_shift(4));
  var f = uv(e, a - e.l, r);
  return { cell: n, val: i[0], formula: f, shared: s >> 3 & 1, tt: i[1] };
}
function vv(e, t, r, a, n) {
  var i = Aa(t, r, n), s = pv(e.v), f = Z(6), c = 33;
  f.write_shift(2, c), f.write_shift(4, 0);
  for (var l = Z(e.bf.length), o = 0; o < e.bf.length; ++o) l[o] = e.bf[o];
  var u = Dr([i, s, f, l]);
  return u;
}
function b0(e, t, r) {
  var a = e.read_shift(4), n = jn(e, a, r), i = e.read_shift(4), s = i > 0 ? $n(e, i, n, r) : null;
  return [n, s];
}
var mv = b0, D0 = b0, gv = b0, _v = b0, wv = {
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
}, hl = {
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
}, kv = {
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
function vf(e) {
  return e.slice(0, 3) == "of:" && (e = e.slice(3)), e.charCodeAt(0) == 61 && (e = e.slice(1), e.charCodeAt(0) == 61 && (e = e.slice(1))), e = e.replace(/COM\.MICROSOFT\./g, ""), e = e.replace(/\[((?:\.[A-Z]+[0-9]+)(?::\.[A-Z]+[0-9]+)?)\]/g, function(t, r) {
    return r.replace(/\./g, "");
  }), e = e.replace(/\[.(#[A-Z]*[?!])\]/g, "$1"), e.replace(/[;~]/g, ",").replace(/\|/g, ";");
}
function Ev(e) {
  var t = "of:=" + e.replace(Ki, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
  return t.replace(/;/g, "|").replace(/,/g, ";");
}
function ti(e) {
  var t = e.split(":"), r = t[0].split(".")[0];
  return [r, t[0].split(".")[1] + (t.length > 1 ? ":" + (t[1].split(".")[1] || t[1].split(".")[0]) : "")];
}
function Tv(e) {
  return e.replace(/\./, "!");
}
var Tn = {}, Qa = {}, yn = typeof Map < "u";
function qi(e, t, r) {
  var a = 0, n = e.length;
  if (r) {
    if (yn ? r.has(t) : Object.prototype.hasOwnProperty.call(r, t)) {
      for (var i = yn ? r.get(t) : r[t]; a < i.length; ++a)
        if (e[i[a]].t === t)
          return e.Count++, i[a];
    }
  } else for (; a < n; ++a)
    if (e[a].t === t)
      return e.Count++, a;
  return e[n] = { t }, e.Count++, e.Unique++, r && (yn ? (r.has(t) || r.set(t, []), r.get(t).push(n)) : (Object.prototype.hasOwnProperty.call(r, t) || (r[t] = []), r[t].push(n))), n;
}
function I0(e, t) {
  var r = { min: e + 1, max: e + 1 }, a = -1;
  return t.MDW && ($r = t.MDW), t.width != null ? r.customWidth = 1 : t.wpx != null ? a = Pn(t.wpx) : t.wch != null && (a = t.wch), a > -1 ? (r.width = k0(a), r.customWidth = 1) : t.width != null && (r.width = t.width), t.hidden && (r.hidden = !0), t.level != null && (r.outlineLevel = r.level = t.level), r;
}
function Ea(e, t) {
  if (e) {
    var r = [0.7, 0.7, 0.75, 0.75, 0.3, 0.3];
    t == "xlml" && (r = [1, 1, 1, 1, 0.5, 0.5]), e.left == null && (e.left = r[0]), e.right == null && (e.right = r[1]), e.top == null && (e.top = r[2]), e.bottom == null && (e.bottom = r[3]), e.header == null && (e.header = r[4]), e.footer == null && (e.footer = r[5]);
  }
}
function la(e, t, r) {
  var a = r.revssf[t.z != null ? t.z : "General"], n = 60, i = e.length;
  if (a == null && r.ssf) {
    for (; n < 392; ++n) if (r.ssf[n] == null) {
      Kt(t.z, n), r.ssf[n] = t.z, r.revssf[t.z] = a = n;
      break;
    }
  }
  for (n = 0; n != i; ++n) if (e[n].numFmtId === a) return n;
  return e[i] = {
    numFmtId: a,
    fontId: 0,
    fillId: 0,
    borderId: 0,
    xfId: 0,
    applyNumberFormat: 1
  }, i;
}
function xl(e, t, r, a, n, i) {
  try {
    a.cellNF && (e.z = Fe[t]);
  } catch (f) {
    if (a.WTF) throw f;
  }
  if (!(e.t === "z" && !a.cellStyles)) {
    if (e.t === "d" && typeof e.v == "string" && (e.v = nr(e.v)), (!a || a.cellText !== !1) && e.t !== "z") try {
      if (Fe[t] == null && Kt(wo[t] || "General", t), e.t === "e") e.w = e.w || Qt[e.v];
      else if (t === 0)
        if (e.t === "n")
          (e.v | 0) === e.v ? e.w = e.v.toString(10) : e.w = bn(e.v);
        else if (e.t === "d") {
          var s = Ar(e.v);
          (s | 0) === s ? e.w = s.toString(10) : e.w = bn(s);
        } else {
          if (e.v === void 0) return "";
          e.w = Ta(e.v, Qa);
        }
      else e.t === "d" ? e.w = Ft(t, Ar(e.v), Qa) : e.w = Ft(t, e.v, Qa);
    } catch (f) {
      if (a.WTF) throw f;
    }
    if (a.cellStyles && r != null)
      try {
        e.s = i.Fills[r], e.s.fgColor && e.s.fgColor.theme && !e.s.fgColor.rgb && (e.s.fgColor.rgb = w0(n.themeElements.clrScheme[e.s.fgColor.theme].rgb, e.s.fgColor.tint || 0), a.WTF && (e.s.fgColor.raw_rgb = n.themeElements.clrScheme[e.s.fgColor.theme].rgb)), e.s.bgColor && e.s.bgColor.theme && (e.s.bgColor.rgb = w0(n.themeElements.clrScheme[e.s.bgColor.theme].rgb, e.s.bgColor.tint || 0), a.WTF && (e.s.bgColor.raw_rgb = n.themeElements.clrScheme[e.s.bgColor.theme].rgb));
      } catch (f) {
        if (a.WTF && i.Fills) throw f;
      }
  }
}
function yv(e, t, r) {
  if (e && e["!ref"]) {
    var a = $e(e["!ref"]);
    if (a.e.c < a.s.c || a.e.r < a.s.r) throw new Error("Bad range (" + r + "): " + e["!ref"]);
  }
}
function Sv(e, t) {
  var r = $e(t);
  r.s.r <= r.e.r && r.s.c <= r.e.c && r.s.r >= 0 && r.s.c >= 0 && (e["!ref"] = Ne(r));
}
var Fv = /<(?:\w:)?mergeCell ref="[A-Z0-9:]+"\s*[\/]?>/g, Av = /<(?:\w+:)?sheetData[^>]*>([\s\S]*)<\/(?:\w+:)?sheetData>/, Cv = /<(?:\w:)?hyperlink [^>]*>/mg, bv = /"(\w*:\w*)"/, Dv = /<(?:\w:)?col\b[^>]*[\/]?>/g, Iv = /<(?:\w:)?autoFilter[^>]*([\/]|>([\s\S]*)<\/(?:\w:)?autoFilter)>/g, Ov = /<(?:\w:)?pageMargins[^>]*\/>/g, dl = /<(?:\w:)?sheetPr\b(?:[^>a-z][^>]*)?\/>/, Nv = /<(?:\w:)?sheetPr[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetPr)>/, Rv = /<(?:\w:)?sheetViews[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetViews)>/;
function Lv(e, t, r, a, n, i, s) {
  if (!e) return e;
  a || (a = { "!id": {} });
  var f = t.dense ? [] : {}, c = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } }, l = "", o = "", u = e.match(Av);
  u ? (l = e.slice(0, u.index), o = e.slice(u.index + u[0].length)) : l = o = e;
  var x = l.match(dl);
  x ? Zi(x[0], f, n, r) : (x = l.match(Nv)) && Bv(x[0], x[1] || "", f, n, r);
  var d = (l.match(/<(?:\w*:)?dimension/) || { index: -1 }).index;
  if (d > 0) {
    var v = l.slice(d, d + 50).match(bv);
    v && Sv(f, v[1]);
  }
  var h = l.match(Rv);
  h && h[1] && Jv(h[1], n);
  var g = [];
  if (t.cellStyles) {
    var T = l.match(Dv);
    T && Gv(g, T);
  }
  u && Qv(u[1], f, t, c, i, s);
  var A = o.match(Iv);
  A && (f["!autofilter"] = jv(A[0]));
  var k = [], R = o.match(Fv);
  if (R) for (d = 0; d != R.length; ++d)
    k[d] = $e(R[d].slice(R[d].indexOf('"') + 1));
  var V = o.match(Cv);
  V && Hv(f, V, a);
  var N = o.match(Ov);
  if (N && (f["!margins"] = Xv(be(N[0]))), !f["!ref"] && c.e.c >= c.s.c && c.e.r >= c.s.r && (f["!ref"] = Ne(c)), t.sheetRows > 0 && f["!ref"]) {
    var S = $e(f["!ref"]);
    t.sheetRows <= +S.e.r && (S.e.r = t.sheetRows - 1, S.e.r > c.e.r && (S.e.r = c.e.r), S.e.r < S.s.r && (S.s.r = S.e.r), S.e.c > c.e.c && (S.e.c = c.e.c), S.e.c < S.s.c && (S.s.c = S.e.c), f["!fullref"] = f["!ref"], f["!ref"] = Ne(S));
  }
  return g.length > 0 && (f["!cols"] = g), k.length > 0 && (f["!merges"] = k), f;
}
function Pv(e) {
  if (e.length === 0) return "";
  for (var t = '<mergeCells count="' + e.length + '">', r = 0; r != e.length; ++r) t += '<mergeCell ref="' + Ne(e[r]) + '"/>';
  return t + "</mergeCells>";
}
function Zi(e, t, r, a) {
  var n = be(e);
  r.Sheets[a] || (r.Sheets[a] = {}), n.codeName && (r.Sheets[a].CodeName = Ge(tr(n.codeName)));
}
function Bv(e, t, r, a, n) {
  Zi(e.slice(0, e.indexOf(">")), r, a, n);
}
function Mv(e, t, r, a, n) {
  var i = !1, s = {}, f = null;
  if (a.bookType !== "xlsx" && t.vbaraw) {
    var c = t.SheetNames[r];
    try {
      t.Workbook && (c = t.Workbook.Sheets[r].CodeName || c);
    } catch {
    }
    i = !0, s.codeName = Ht(er(c));
  }
  if (e && e["!outline"]) {
    var l = { summaryBelow: 1, summaryRight: 1 };
    e["!outline"].above && (l.summaryBelow = 0), e["!outline"].left && (l.summaryRight = 0), f = (f || "") + oe("outlinePr", null, l);
  }
  !i && !f || (n[n.length] = oe("sheetPr", f, s));
}
var Uv = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"], Wv = [
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
function Vv(e) {
  var t = { sheet: 1 };
  return Uv.forEach(function(r) {
    e[r] != null && e[r] && (t[r] = "1");
  }), Wv.forEach(function(r) {
    e[r] != null && !e[r] && (t[r] = "0");
  }), e.password && (t.password = Gi(e.password).toString(16).toUpperCase()), oe("sheetProtection", null, t);
}
function Hv(e, t, r) {
  for (var a = Array.isArray(e), n = 0; n != t.length; ++n) {
    var i = be(tr(t[n]), !0);
    if (!i.ref) return;
    var s = ((r || {})["!id"] || [])[i.id];
    s ? (i.Target = s.Target, i.location && (i.Target += "#" + Ge(i.location))) : (i.Target = "#" + Ge(i.location), s = { Target: i.Target, TargetMode: "Internal" }), i.Rel = s, i.tooltip && (i.Tooltip = i.tooltip, delete i.tooltip);
    for (var f = $e(i.ref), c = f.s.r; c <= f.e.r; ++c) for (var l = f.s.c; l <= f.e.c; ++l) {
      var o = Ce({ c: l, r: c });
      a ? (e[c] || (e[c] = []), e[c][l] || (e[c][l] = { t: "z", v: void 0 }), e[c][l].l = i) : (e[o] || (e[o] = { t: "z", v: void 0 }), e[o].l = i);
    }
  }
}
function Xv(e) {
  var t = {};
  return ["left", "right", "top", "bottom", "header", "footer"].forEach(function(r) {
    e[r] && (t[r] = parseFloat(e[r]));
  }), t;
}
function zv(e) {
  return Ea(e), oe("pageMargins", null, e);
}
function Gv(e, t) {
  for (var r = !1, a = 0; a != t.length; ++a) {
    var n = be(t[a], !0);
    n.hidden && (n.hidden = ar(n.hidden));
    var i = parseInt(n.min, 10) - 1, s = parseInt(n.max, 10) - 1;
    for (n.outlineLevel && (n.level = +n.outlineLevel || 0), delete n.min, delete n.max, n.width = +n.width, !r && n.width && (r = !0, $i(n.width)), na(n); i <= s; ) e[i++] = ir(n);
  }
}
function $v(e, t) {
  for (var r = ["<cols>"], a, n = 0; n != t.length; ++n)
    (a = t[n]) && (r[r.length] = oe("col", null, I0(n, a)));
  return r[r.length] = "</cols>", r.join("");
}
function jv(e) {
  var t = { ref: (e.match(/ref="([^"]*)"/) || [])[1] };
  return t;
}
function Kv(e, t, r, a) {
  var n = typeof e.ref == "string" ? e.ref : Ne(e.ref);
  r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
  var i = r.Workbook.Names, s = st(n);
  s.s.r == s.e.r && (s.e.r = st(t["!ref"]).e.r, n = Ne(s));
  for (var f = 0; f < i.length; ++f) {
    var c = i[f];
    if (c.Name == "_xlnm._FilterDatabase" && c.Sheet == a) {
      c.Ref = "'" + r.SheetNames[a] + "'!" + n;
      break;
    }
  }
  return f == i.length && i.push({ Name: "_xlnm._FilterDatabase", Sheet: a, Ref: "'" + r.SheetNames[a] + "'!" + n }), oe("autoFilter", null, { ref: n });
}
var Yv = /<(?:\w:)?sheetView(?:[^>a-z][^>]*)?\/?>/;
function Jv(e, t) {
  t.Views || (t.Views = [{}]), (e.match(Yv) || []).forEach(function(r, a) {
    var n = be(r);
    t.Views[a] || (t.Views[a] = {}), +n.zoomScale && (t.Views[a].zoom = +n.zoomScale), ar(n.rightToLeft) && (t.Views[a].RTL = !0);
  });
}
function qv(e, t, r, a) {
  var n = { workbookViewId: "0" };
  return (((a || {}).Workbook || {}).Views || [])[0] && (n.rightToLeft = a.Workbook.Views[0].RTL ? "1" : "0"), oe("sheetViews", oe("sheetView", null, n), {});
}
function Zv(e, t, r, a) {
  if (e.c && r["!comments"].push([t, e.c]), e.v === void 0 && typeof e.f != "string" || e.t === "z" && !e.f) return "";
  var n = "", i = e.t, s = e.v;
  if (e.t !== "z") switch (e.t) {
    case "b":
      n = e.v ? "1" : "0";
      break;
    case "n":
      n = "" + e.v;
      break;
    case "e":
      n = Qt[e.v];
      break;
    case "d":
      a && a.cellDates ? n = nr(e.v, -1).toISOString() : (e = ir(e), e.t = "n", n = "" + (e.v = Ar(nr(e.v)))), typeof e.z > "u" && (e.z = Fe[14]);
      break;
    default:
      n = e.v;
      break;
  }
  var f = Ur("v", er(n)), c = { r: t }, l = la(a.cellXfs, e, a);
  switch (l !== 0 && (c.s = l), e.t) {
    case "n":
      break;
    case "d":
      c.t = "d";
      break;
    case "b":
      c.t = "b";
      break;
    case "e":
      c.t = "e";
      break;
    case "z":
      break;
    default:
      if (e.v == null) {
        delete e.t;
        break;
      }
      if (e.v.length > 32767) throw new Error("Text length must not exceed 32767 characters");
      if (a && a.bookSST) {
        f = Ur("v", "" + qi(a.Strings, e.v, a.revStrings)), c.t = "s";
        break;
      }
      c.t = "str";
      break;
  }
  if (e.t != i && (e.t = i, e.v = s), typeof e.f == "string" && e.f) {
    var o = e.F && e.F.slice(0, t.length) == t ? { t: "array", ref: e.F } : null;
    f = oe("f", er(e.f), o) + (e.v != null ? f : "");
  }
  return e.l && r["!links"].push([t, e.l]), e.D && (c.cm = 1), oe("c", f, c);
}
var Qv = /* @__PURE__ */ function() {
  var e = /<(?:\w+:)?c[ \/>]/, t = /<\/(?:\w+:)?row>/, r = /r=["']([^"']*)["']/, a = /<(?:\w+:)?is>([\S\s]*?)<\/(?:\w+:)?is>/, n = /ref=["']([^"']*)["']/, i = Dn("v"), s = Dn("f");
  return function(c, l, o, u, x, d) {
    for (var v = 0, h = "", g = [], T = [], A = 0, k = 0, R = 0, V = "", N, S, z = 0, L = 0, J, j, H = 0, re = 0, me = Array.isArray(d.CellXf), xe, ve = [], de = [], Xe = Array.isArray(l), K = [], pe = {}, we = !1, C = !!o.sheetStubs, M = c.split(t), O = 0, P = M.length; O != P; ++O) {
      h = M[O].trim();
      var Q = h.length;
      if (Q !== 0) {
        var fe = 0;
        e: for (v = 0; v < Q; ++v) switch (
          /*x.charCodeAt(ri)*/
          h[v]
        ) {
          case ">":
            if (
              /*x.charCodeAt(ri-1) != 47*/
              h[v - 1] != "/"
            ) {
              ++v;
              break e;
            }
            if (o && o.cellStyles) {
              if (S = be(h.slice(fe, v), !0), z = S.r != null ? parseInt(S.r, 10) : z + 1, L = -1, o.sheetRows && o.sheetRows < z) continue;
              pe = {}, we = !1, S.ht && (we = !0, pe.hpt = parseFloat(S.ht), pe.hpx = tn(pe.hpt)), S.hidden == "1" && (we = !0, pe.hidden = !0), S.outlineLevel != null && (we = !0, pe.level = +S.outlineLevel), we && (K[z - 1] = pe);
            }
            break;
          case "<":
            fe = v;
            break;
        }
        if (fe >= v) break;
        if (S = be(h.slice(fe, v), !0), z = S.r != null ? parseInt(S.r, 10) : z + 1, L = -1, !(o.sheetRows && o.sheetRows < z)) {
          u.s.r > z - 1 && (u.s.r = z - 1), u.e.r < z - 1 && (u.e.r = z - 1), o && o.cellStyles && (pe = {}, we = !1, S.ht && (we = !0, pe.hpt = parseFloat(S.ht), pe.hpx = tn(pe.hpt)), S.hidden == "1" && (we = !0, pe.hidden = !0), S.outlineLevel != null && (we = !0, pe.level = +S.outlineLevel), we && (K[z - 1] = pe)), g = h.slice(v).split(e);
          for (var ce = 0; ce != g.length && g[ce].trim().charAt(0) == "<"; ++ce) ;
          for (g = g.slice(ce), v = 0; v != g.length; ++v)
            if (h = g[v].trim(), h.length !== 0) {
              if (T = h.match(r), A = v, k = 0, R = 0, h = "<c " + (h.slice(0, 1) == "<" ? ">" : "") + h, T != null && T.length === 2) {
                for (A = 0, V = T[1], k = 0; k != V.length && !((R = V.charCodeAt(k) - 64) < 1 || R > 26); ++k)
                  A = 26 * A + R;
                --A, L = A;
              } else ++L;
              for (k = 0; k != h.length && h.charCodeAt(k) !== 62; ++k) ;
              if (++k, S = be(h.slice(0, k), !0), S.r || (S.r = Ce({ r: z - 1, c: L })), V = h.slice(k), N = { t: "" }, (T = V.match(i)) != null && /*::cref != null && */
              T[1] !== "" && (N.v = Ge(T[1])), o.cellFormula) {
                if ((T = V.match(s)) != null && /*::cref != null && */
                T[1] !== "") {
                  if (N.f = Ge(tr(T[1])).replace(/\r\n/g, `
`), o.xlfn || (N.f = hf(N.f)), /*::cref != null && cref[0] != null && */
                  T[0].indexOf('t="array"') > -1)
                    N.F = (V.match(n) || [])[1], N.F.indexOf(":") > -1 && ve.push([$e(N.F), N.F]);
                  else if (
                    /*::cref != null && cref[0] != null && */
                    T[0].indexOf('t="shared"') > -1
                  ) {
                    j = be(T[0]);
                    var ie = Ge(tr(T[1]));
                    o.xlfn || (ie = hf(ie)), de[parseInt(j.si, 10)] = [j, ie, S.r];
                  }
                } else (T = V.match(/<f[^>]*\/>/)) && (j = be(T[0]), de[j.si] && (N.f = Yd(de[j.si][1], de[j.si][2], S.r)));
                var ne = hr(S.r);
                for (k = 0; k < ve.length; ++k)
                  ne.r >= ve[k][0].s.r && ne.r <= ve[k][0].e.r && ne.c >= ve[k][0].s.c && ne.c <= ve[k][0].e.c && (N.F = ve[k][1]);
              }
              if (S.t == null && N.v === void 0)
                if (N.f || N.F)
                  N.v = 0, N.t = "n";
                else if (C) N.t = "z";
                else continue;
              else N.t = S.t || "n";
              switch (u.s.c > L && (u.s.c = L), u.e.c < L && (u.e.c = L), N.t) {
                case "n":
                  if (N.v == "" || N.v == null) {
                    if (!C) continue;
                    N.t = "z";
                  } else N.v = parseFloat(N.v);
                  break;
                case "s":
                  if (typeof N.v > "u") {
                    if (!C) continue;
                    N.t = "z";
                  } else
                    J = Tn[parseInt(N.v, 10)], N.v = J.t, N.r = J.r, o.cellHTML && (N.h = J.h);
                  break;
                case "str":
                  N.t = "s", N.v = N.v != null ? tr(N.v) : "", o.cellHTML && (N.h = Di(N.v));
                  break;
                case "inlineStr":
                  T = V.match(a), N.t = "s", T != null && (J = zi(T[1])) ? (N.v = J.t, o.cellHTML && (N.h = J.h)) : N.v = "";
                  break;
                case "b":
                  N.v = ar(N.v);
                  break;
                case "d":
                  o.cellDates ? N.v = nr(N.v, 1) : (N.v = Ar(nr(N.v, 1)), N.t = "n");
                  break;
                case "e":
                  (!o || o.cellText !== !1) && (N.w = N.v), N.v = vc[N.v];
                  break;
              }
              if (H = re = 0, xe = null, me && S.s !== void 0 && (xe = d.CellXf[S.s], xe != null && (xe.numFmtId != null && (H = xe.numFmtId), o.cellStyles && xe.fillId != null && (re = xe.fillId))), xl(N, H, re, o, x, d), o.cellDates && me && N.t == "n" && an(Fe[H]) && (N.t = "d", N.v = A0(N.v)), S.cm && o.xlmeta) {
                var Ie = (o.xlmeta.Cell || [])[+S.cm - 1];
                Ie && Ie.type == "XLDAPR" && (N.D = !0);
              }
              if (Xe) {
                var F = hr(S.r);
                l[F.r] || (l[F.r] = []), l[F.r][F.c] = N;
              } else l[S.r] = N;
            }
        }
      }
    }
    K.length > 0 && (l["!rows"] = K);
  };
}();
function em(e, t, r, a) {
  var n = [], i = [], s = $e(e["!ref"]), f = "", c, l = "", o = [], u = 0, x = 0, d = e["!rows"], v = Array.isArray(e), h = { r: l }, g, T = -1;
  for (x = s.s.c; x <= s.e.c; ++x) o[x] = ur(x);
  for (u = s.s.r; u <= s.e.r; ++u) {
    for (i = [], l = wr(u), x = s.s.c; x <= s.e.c; ++x) {
      c = o[x] + l;
      var A = v ? (e[u] || [])[x] : e[c];
      A !== void 0 && (f = Zv(A, c, e, t)) != null && i.push(f);
    }
    (i.length > 0 || d && d[u]) && (h = { r: l }, d && d[u] && (g = d[u], g.hidden && (h.hidden = 1), T = -1, g.hpx ? T = Bn(g.hpx) : g.hpt && (T = g.hpt), T > -1 && (h.ht = T, h.customHeight = 1), g.level && (h.outlineLevel = g.level)), n[n.length] = oe("row", i.join(""), h));
  }
  if (d) for (; u < d.length; ++u)
    d && d[u] && (h = { r: u + 1 }, g = d[u], g.hidden && (h.hidden = 1), T = -1, g.hpx ? T = Bn(g.hpx) : g.hpt && (T = g.hpt), T > -1 && (h.ht = T, h.customHeight = 1), g.level && (h.outlineLevel = g.level), n[n.length] = oe("row", "", h));
  return n.join("");
}
function pl(e, t, r, a) {
  var n = [kr, oe("worksheet", null, {
    xmlns: ba[0],
    "xmlns:r": Fr.r
  })], i = r.SheetNames[e], s = 0, f = "", c = r.Sheets[i];
  c == null && (c = {});
  var l = c["!ref"] || "A1", o = $e(l);
  if (o.e.c > 16383 || o.e.r > 1048575) {
    if (t.WTF) throw new Error("Range " + l + " exceeds format limit A1:XFD1048576");
    o.e.c = Math.min(o.e.c, 16383), o.e.r = Math.min(o.e.c, 1048575), l = Ne(o);
  }
  a || (a = {}), c["!comments"] = [];
  var u = [];
  Mv(c, r, e, t, n), n[n.length] = oe("dimension", null, { ref: l }), n[n.length] = qv(c, t, e, r), t.sheetFormat && (n[n.length] = oe("sheetFormatPr", null, {
    defaultRowHeight: t.sheetFormat.defaultRowHeight || "16",
    baseColWidth: t.sheetFormat.baseColWidth || "10",
    outlineLevelRow: t.sheetFormat.outlineLevelRow || "7"
  })), c["!cols"] != null && c["!cols"].length > 0 && (n[n.length] = $v(c, c["!cols"])), n[s = n.length] = "<sheetData/>", c["!links"] = [], c["!ref"] != null && (f = em(c, t), f.length > 0 && (n[n.length] = f)), n.length > s + 1 && (n[n.length] = "</sheetData>", n[s] = n[s].replace("/>", ">")), c["!protect"] && (n[n.length] = Vv(c["!protect"])), c["!autofilter"] != null && (n[n.length] = Kv(c["!autofilter"], c, r, e)), c["!merges"] != null && c["!merges"].length > 0 && (n[n.length] = Pv(c["!merges"]));
  var x = -1, d, v = -1;
  return (
    /*::(*/
    c["!links"].length > 0 && (n[n.length] = "<hyperlinks>", c["!links"].forEach(function(h) {
      h[1].Target && (d = { ref: h[0] }, h[1].Target.charAt(0) != "#" && (v = Qe(a, -1, er(h[1].Target).replace(/#.*$/, ""), Ve.HLINK), d["r:id"] = "rId" + v), (x = h[1].Target.indexOf("#")) > -1 && (d.location = er(h[1].Target.slice(x + 1))), h[1].Tooltip && (d.tooltip = er(h[1].Tooltip)), n[n.length] = oe("hyperlink", null, d));
    }), n[n.length] = "</hyperlinks>"), delete c["!links"], c["!margins"] != null && (n[n.length] = zv(c["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && (n[n.length] = Ur("ignoredErrors", oe("ignoredError", null, { numberStoredAsText: 1, sqref: l }))), u.length > 0 && (v = Qe(a, -1, "../drawings/drawing" + (e + 1) + ".xml", Ve.DRAW), n[n.length] = oe("drawing", null, { "r:id": "rId" + v }), c["!drawing"] = u), c["!comments"].length > 0 && (v = Qe(a, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", Ve.VML), n[n.length] = oe("legacyDrawing", null, { "r:id": "rId" + v }), c["!legacy"] = v), n.length > 1 && (n[n.length] = "</worksheet>", n[1] = n[1].replace("/>", ">")), n.join("")
  );
}
function rm(e, t) {
  var r = {}, a = e.l + t;
  r.r = e.read_shift(4), e.l += 4;
  var n = e.read_shift(2);
  e.l += 1;
  var i = e.read_shift(1);
  return e.l = a, i & 7 && (r.level = i & 7), i & 16 && (r.hidden = !0), i & 32 && (r.hpt = n / 20), r;
}
function tm(e, t, r) {
  var a = Z(145), n = (r["!rows"] || [])[e] || {};
  a.write_shift(4, e), a.write_shift(4, 0);
  var i = 320;
  n.hpx ? i = Bn(n.hpx) * 20 : n.hpt && (i = n.hpt * 20), a.write_shift(2, i), a.write_shift(1, 0);
  var s = 0;
  n.level && (s |= n.level), n.hidden && (s |= 16), (n.hpx || n.hpt) && (s |= 32), a.write_shift(1, s), a.write_shift(1, 0);
  var f = 0, c = a.l;
  a.l += 4;
  for (var l = { r: e, c: 0 }, o = 0; o < 16; ++o)
    if (!(t.s.c > o + 1 << 10 || t.e.c < o << 10)) {
      for (var u = -1, x = -1, d = o << 10; d < o + 1 << 10; ++d) {
        l.c = d;
        var v = Array.isArray(r) ? (r[l.r] || [])[l.c] : r[Ce(l)];
        v && (u < 0 && (u = d), x = d);
      }
      u < 0 || (++f, a.write_shift(4, u), a.write_shift(4, x));
    }
  var h = a.l;
  return a.l = c, a.write_shift(4, f), a.l = h, a.length > a.l ? a.slice(0, a.l) : a;
}
function am(e, t, r, a) {
  var n = tm(a, r, t);
  (n.length > 17 || (t["!rows"] || [])[a]) && ee(e, 0, n);
}
var nm = Na, im = fn;
function sm() {
}
function fm(e, t) {
  var r = {}, a = e[e.l];
  return ++e.l, r.above = !(a & 64), r.left = !(a & 128), e.l += 18, r.name = ou(e), r;
}
function cm(e, t, r) {
  r == null && (r = Z(84 + 4 * e.length));
  var a = 192;
  t && (t.above && (a &= -65), t.left && (a &= -129)), r.write_shift(1, a);
  for (var n = 1; n < 3; ++n) r.write_shift(1, 0);
  return m0({ auto: 1 }, r), r.write_shift(-4, -1), r.write_shift(-4, -1), uc(e, r), r.slice(0, r.l);
}
function lm(e) {
  var t = At(e);
  return [t];
}
function om(e, t, r) {
  return r == null && (r = Z(8)), Da(t, r);
}
function um(e) {
  var t = Ia(e);
  return [t];
}
function hm(e, t, r) {
  return r == null && (r = Z(4)), Oa(t, r);
}
function xm(e) {
  var t = At(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function dm(e, t, r) {
  return r == null && (r = Z(9)), Da(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function pm(e) {
  var t = Ia(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function vm(e, t, r) {
  return r == null && (r = Z(5)), Oa(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function mm(e) {
  var t = At(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function gm(e, t, r) {
  return r == null && (r = Z(9)), Da(t, r), r.write_shift(1, e.v), r;
}
function _m(e) {
  var t = Ia(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function wm(e, t, r) {
  return r == null && (r = Z(8)), Oa(t, r), r.write_shift(1, e.v), r.write_shift(2, 0), r.write_shift(1, 0), r;
}
function km(e) {
  var t = At(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function Em(e, t, r) {
  return r == null && (r = Z(12)), Da(t, r), r.write_shift(4, t.v), r;
}
function Tm(e) {
  var t = Ia(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function ym(e, t, r) {
  return r == null && (r = Z(8)), Oa(t, r), r.write_shift(4, t.v), r;
}
function Sm(e) {
  var t = At(e), r = jr(e);
  return [t, r, "n"];
}
function Fm(e, t, r) {
  return r == null && (r = Z(16)), Da(t, r), Sa(e.v, r), r;
}
function vl(e) {
  var t = Ia(e), r = jr(e);
  return [t, r, "n"];
}
function Am(e, t, r) {
  return r == null && (r = Z(12)), Oa(t, r), Sa(e.v, r), r;
}
function Cm(e) {
  var t = At(e), r = Ui(e);
  return [t, r, "n"];
}
function bm(e, t, r) {
  return r == null && (r = Z(12)), Da(t, r), hc(e.v, r), r;
}
function Dm(e) {
  var t = Ia(e), r = Ui(e);
  return [t, r, "n"];
}
function Im(e, t, r) {
  return r == null && (r = Z(8)), Oa(t, r), hc(e.v, r), r;
}
function Om(e) {
  var t = At(e), r = Pi(e);
  return [t, r, "is"];
}
function Nm(e) {
  var t = At(e), r = Kr(e);
  return [t, r, "str"];
}
function Rm(e, t, r) {
  return r == null && (r = Z(12 + 4 * e.v.length)), Da(t, r), Ir(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function Lm(e) {
  var t = Ia(e), r = Kr(e);
  return [t, r, "str"];
}
function Pm(e, t, r) {
  return r == null && (r = Z(8 + 4 * e.v.length)), Oa(t, r), Ir(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function Bm(e, t, r) {
  var a = e.l + t, n = At(e);
  n.r = r["!row"];
  var i = e.read_shift(1), s = [n, i, "b"];
  if (r.cellFormula) {
    e.l += 2;
    var f = D0(e, a - e.l, r);
    s[3] = Gr(f, null, n, r.supbooks, r);
  } else e.l = a;
  return s;
}
function Mm(e, t, r) {
  var a = e.l + t, n = At(e);
  n.r = r["!row"];
  var i = e.read_shift(1), s = [n, i, "e"];
  if (r.cellFormula) {
    e.l += 2;
    var f = D0(e, a - e.l, r);
    s[3] = Gr(f, null, n, r.supbooks, r);
  } else e.l = a;
  return s;
}
function Um(e, t, r) {
  var a = e.l + t, n = At(e);
  n.r = r["!row"];
  var i = jr(e), s = [n, i, "n"];
  if (r.cellFormula) {
    e.l += 2;
    var f = D0(e, a - e.l, r);
    s[3] = Gr(f, null, n, r.supbooks, r);
  } else e.l = a;
  return s;
}
function Wm(e, t, r) {
  var a = e.l + t, n = At(e);
  n.r = r["!row"];
  var i = Kr(e), s = [n, i, "str"];
  if (r.cellFormula) {
    e.l += 2;
    var f = D0(e, a - e.l, r);
    s[3] = Gr(f, null, n, r.supbooks, r);
  } else e.l = a;
  return s;
}
var Vm = Na, Hm = fn;
function Xm(e, t) {
  return t == null && (t = Z(4)), t.write_shift(4, e), t;
}
function zm(e, t) {
  var r = e.l + t, a = Na(e), n = Bi(e), i = Kr(e), s = Kr(e), f = Kr(e);
  e.l = r;
  var c = { rfx: a, relId: n, loc: i, display: f };
  return s && (c.Tooltip = s), c;
}
function Gm(e, t) {
  var r = Z(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
  fn({ s: hr(e[0]), e: hr(e[0]) }, r), Mi("rId" + t, r);
  var a = e[1].Target.indexOf("#"), n = a == -1 ? "" : e[1].Target.slice(a + 1);
  return Ir(n || "", r), Ir(e[1].Tooltip || "", r), Ir("", r), r.slice(0, r.l);
}
function $m() {
}
function jm(e, t, r) {
  var a = e.l + t, n = xc(e), i = e.read_shift(1), s = [n];
  if (s[2] = i, r.cellFormula) {
    var f = mv(e, a - e.l, r);
    s[1] = f;
  } else e.l = a;
  return s;
}
function Km(e, t, r) {
  var a = e.l + t, n = Na(e), i = [n];
  if (r.cellFormula) {
    var s = _v(e, a - e.l, r);
    i[1] = s, e.l = a;
  } else e.l = a;
  return i;
}
function Ym(e, t, r) {
  r == null && (r = Z(18));
  var a = I0(e, t);
  r.write_shift(-4, e), r.write_shift(-4, e), r.write_shift(4, (a.width || 10) * 256), r.write_shift(
    4,
    0
    /*ixfe*/
  );
  var n = 0;
  return t.hidden && (n |= 1), typeof a.width == "number" && (n |= 2), t.level && (n |= t.level << 8), r.write_shift(2, n), r;
}
var ml = ["left", "right", "top", "bottom", "header", "footer"];
function Jm(e) {
  var t = {};
  return ml.forEach(function(r) {
    t[r] = jr(e);
  }), t;
}
function qm(e, t) {
  return t == null && (t = Z(6 * 8)), Ea(e), ml.forEach(function(r) {
    Sa(e[r], t);
  }), t;
}
function Zm(e) {
  var t = e.read_shift(2);
  return e.l += 28, { RTL: t & 32 };
}
function Qm(e, t, r) {
  r == null && (r = Z(30));
  var a = 924;
  return (((t || {}).Views || [])[0] || {}).RTL && (a |= 32), r.write_shift(2, a), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(2, 0), r.write_shift(2, 100), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(4, 0), r;
}
function e2(e) {
  var t = Z(24);
  return t.write_shift(4, 4), t.write_shift(4, 1), fn(e, t), t;
}
function r2(e, t) {
  return t == null && (t = Z(16 * 4 + 2)), t.write_shift(2, e.password ? Gi(e.password) : 0), t.write_shift(4, 1), [
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
  ].forEach(function(r) {
    r[1] ? t.write_shift(4, e[r[0]] != null && !e[r[0]] ? 1 : 0) : t.write_shift(4, e[r[0]] != null && e[r[0]] ? 0 : 1);
  }), t;
}
function t2() {
}
function a2() {
}
function n2(e, t, r, a, n, i, s) {
  if (!e) return e;
  var f = t || {};
  a || (a = { "!id": {} });
  var c = f.dense ? [] : {}, l, o = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } }, u = !1, x = !1, d, v, h, g, T, A, k, R, V, N = [];
  f.biff = 12, f["!row"] = 0;
  var S = 0, z = !1, L = [], J = {}, j = f.supbooks || /*::(*/
  n.supbooks || [[]];
  if (j.sharedf = J, j.arrayf = L, j.SheetNames = n.SheetNames || n.Sheets.map(function(Xe) {
    return Xe.name;
  }), !f.supbooks && (f.supbooks = j, n.Names))
    for (var H = 0; H < n.Names.length; ++H) j[0][H + 1] = n.Names[H];
  var re = [], me = [], xe = !1;
  Mn[16] = { n: "BrtShortReal", f: vl };
  var ve;
  if (Zt(e, function(K, pe, we) {
    if (!x)
      switch (we) {
        case 148:
          l = K;
          break;
        case 0:
          d = K, f.sheetRows && f.sheetRows <= d.r && (x = !0), R = wr(g = d.r), f["!row"] = d.r, (K.hidden || K.hpt || K.level != null) && (K.hpt && (K.hpx = tn(K.hpt)), me[K.r] = K);
          break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 62:
          switch (v = { t: K[2] }, K[2]) {
            case "n":
              v.v = K[1];
              break;
            case "s":
              k = Tn[K[1]], v.v = k.t, v.r = k.r;
              break;
            case "b":
              v.v = !!K[1];
              break;
            case "e":
              v.v = K[1], f.cellText !== !1 && (v.w = Qt[v.v]);
              break;
            case "str":
              v.t = "s", v.v = K[1];
              break;
            case "is":
              v.t = "s", v.v = K[1].t;
              break;
          }
          if ((h = s.CellXf[K[0].iStyleRef]) && xl(v, h.numFmtId, null, f, i, s), T = K[0].c == -1 ? T + 1 : K[0].c, f.dense ? (c[g] || (c[g] = []), c[g][T] = v) : c[ur(T) + R] = v, f.cellFormula) {
            for (z = !1, S = 0; S < L.length; ++S) {
              var C = L[S];
              d.r >= C[0].s.r && d.r <= C[0].e.r && T >= C[0].s.c && T <= C[0].e.c && (v.F = Ne(C[0]), z = !0);
            }
            !z && K.length > 3 && (v.f = K[3]);
          }
          if (o.s.r > d.r && (o.s.r = d.r), o.s.c > T && (o.s.c = T), o.e.r < d.r && (o.e.r = d.r), o.e.c < T && (o.e.c = T), f.cellDates && h && v.t == "n" && an(Fe[h.numFmtId])) {
            var M = ga(v.v);
            M && (v.t = "d", v.v = new Date(M.y, M.m - 1, M.d, M.H, M.M, M.S, M.u));
          }
          ve && (ve.type == "XLDAPR" && (v.D = !0), ve = void 0);
          break;
        case 1:
        case 12:
          if (!f.sheetStubs || u) break;
          v = { t: "z", v: void 0 }, T = K[0].c == -1 ? T + 1 : K[0].c, f.dense ? (c[g] || (c[g] = []), c[g][T] = v) : c[ur(T) + R] = v, o.s.r > d.r && (o.s.r = d.r), o.s.c > T && (o.s.c = T), o.e.r < d.r && (o.e.r = d.r), o.e.c < T && (o.e.c = T), ve && (ve.type == "XLDAPR" && (v.D = !0), ve = void 0);
          break;
        case 176:
          N.push(K);
          break;
        case 49:
          ve = ((f.xlmeta || {}).Cell || [])[K - 1];
          break;
        case 494:
          var O = a["!id"][K.relId];
          for (O ? (K.Target = O.Target, K.loc && (K.Target += "#" + K.loc), K.Rel = O) : K.relId == "" && (K.Target = "#" + K.loc), g = K.rfx.s.r; g <= K.rfx.e.r; ++g) for (T = K.rfx.s.c; T <= K.rfx.e.c; ++T)
            f.dense ? (c[g] || (c[g] = []), c[g][T] || (c[g][T] = { t: "z", v: void 0 }), c[g][T].l = K) : (A = Ce({ c: T, r: g }), c[A] || (c[A] = { t: "z", v: void 0 }), c[A].l = K);
          break;
        case 426:
          if (!f.cellFormula) break;
          L.push(K), V = f.dense ? c[g][T] : c[ur(T) + R], V.f = Gr(K[1], o, { r: d.r, c: T }, j, f), V.F = Ne(K[0]);
          break;
        case 427:
          if (!f.cellFormula) break;
          J[Ce(K[0].s)] = K[1], V = f.dense ? c[g][T] : c[ur(T) + R], V.f = Gr(K[1], o, { r: d.r, c: T }, j, f);
          break;
        case 60:
          if (!f.cellStyles) break;
          for (; K.e >= K.s; )
            re[K.e--] = { width: K.w / 256, hidden: !!(K.flags & 1), level: K.level }, xe || (xe = !0, $i(K.w / 256)), na(re[K.e + 1]);
          break;
        case 161:
          c["!autofilter"] = { ref: Ne(K) };
          break;
        case 476:
          c["!margins"] = K;
          break;
        case 147:
          n.Sheets[r] || (n.Sheets[r] = {}), K.name && (n.Sheets[r].CodeName = K.name), (K.above || K.left) && (c["!outline"] = { above: K.above, left: K.left });
          break;
        case 137:
          n.Views || (n.Views = [{}]), n.Views[0] || (n.Views[0] = {}), K.RTL && (n.Views[0].RTL = !0);
          break;
        case 485:
          break;
        case 64:
        case 1053:
          break;
        case 151:
          break;
        case 152:
        case 175:
        case 644:
        case 625:
        case 562:
        case 396:
        case 1112:
        case 1146:
        case 471:
        case 1050:
        case 649:
        case 1105:
        case 589:
        case 607:
        case 564:
        case 1055:
        case 168:
        case 174:
        case 1180:
        case 499:
        case 507:
        case 550:
        case 171:
        case 167:
        case 1177:
        case 169:
        case 1181:
        case 551:
        case 552:
        case 661:
        case 639:
        case 478:
        case 537:
        case 477:
        case 536:
        case 1103:
        case 680:
        case 1104:
        case 1024:
        case 663:
        case 535:
        case 678:
        case 504:
        case 1043:
        case 428:
        case 170:
        case 3072:
        case 50:
        case 2070:
        case 1045:
          break;
        case 35:
          u = !0;
          break;
        case 36:
          u = !1;
          break;
        case 37:
          u = !0;
          break;
        case 38:
          u = !1;
          break;
        default:
          if (!pe.T) {
            if (!u || f.WTF) throw new Error("Unexpected record 0x" + we.toString(16));
          }
      }
  }, f), delete f.supbooks, delete f["!row"], !c["!ref"] && (o.s.r < 2e6 || l && (l.e.r > 0 || l.e.c > 0 || l.s.r > 0 || l.s.c > 0)) && (c["!ref"] = Ne(l || o)), f.sheetRows && c["!ref"]) {
    var de = $e(c["!ref"]);
    f.sheetRows <= +de.e.r && (de.e.r = f.sheetRows - 1, de.e.r > o.e.r && (de.e.r = o.e.r), de.e.r < de.s.r && (de.s.r = de.e.r), de.e.c > o.e.c && (de.e.c = o.e.c), de.e.c < de.s.c && (de.s.c = de.e.c), c["!fullref"] = c["!ref"], c["!ref"] = Ne(de));
  }
  return N.length > 0 && (c["!merges"] = N), re.length > 0 && (c["!cols"] = re), me.length > 0 && (c["!rows"] = me), c;
}
function i2(e, t, r, a, n, i, s) {
  if (t.v === void 0) return !1;
  var f = "";
  switch (t.t) {
    case "b":
      f = t.v ? "1" : "0";
      break;
    case "d":
      t = ir(t), t.z = t.z || Fe[14], t.v = Ar(nr(t.v)), t.t = "n";
      break;
    case "n":
    case "e":
      f = "" + t.v;
      break;
    default:
      f = t.v;
      break;
  }
  var c = { r, c: a };
  switch (c.s = la(n.cellXfs, t, n), t.l && i["!links"].push([Ce(c), t.l]), t.c && i["!comments"].push([Ce(c), t.c]), t.t) {
    case "s":
    case "str":
      return n.bookSST ? (f = qi(n.Strings, t.v, n.revStrings), c.t = "s", c.v = f, s ? ee(e, 18, ym(t, c)) : ee(e, 7, Em(t, c))) : (c.t = "str", s ? ee(e, 17, Pm(t, c)) : ee(e, 6, Rm(t, c))), !0;
    case "n":
      return t.v == (t.v | 0) && t.v > -1e3 && t.v < 1e3 ? s ? ee(e, 13, Im(t, c)) : ee(e, 2, bm(t, c)) : s ? ee(e, 16, Am(t, c)) : ee(e, 5, Fm(t, c)), !0;
    case "b":
      return c.t = "b", s ? ee(e, 15, vm(t, c)) : ee(e, 4, dm(t, c)), !0;
    case "e":
      return c.t = "e", s ? ee(e, 14, wm(t, c)) : ee(e, 3, gm(t, c)), !0;
  }
  return s ? ee(e, 12, hm(t, c)) : ee(e, 1, om(t, c)), !0;
}
function s2(e, t, r, a) {
  var n = $e(t["!ref"] || "A1"), i, s = "", f = [];
  ee(
    e,
    145
    /* BrtBeginSheetData */
  );
  var c = Array.isArray(t), l = n.e.r;
  t["!rows"] && (l = Math.max(n.e.r, t["!rows"].length - 1));
  for (var o = n.s.r; o <= l; ++o) {
    s = wr(o), am(e, t, n, o);
    var u = !1;
    if (o <= n.e.r) for (var x = n.s.c; x <= n.e.c; ++x) {
      o === n.s.r && (f[x] = ur(x)), i = f[x] + s;
      var d = c ? (t[o] || [])[x] : t[i];
      if (!d) {
        u = !1;
        continue;
      }
      u = i2(e, d, o, x, a, t, u);
    }
  }
  ee(
    e,
    146
    /* BrtEndSheetData */
  );
}
function f2(e, t) {
  !t || !t["!merges"] || (ee(e, 177, Xm(t["!merges"].length)), t["!merges"].forEach(function(r) {
    ee(e, 176, Hm(r));
  }), ee(
    e,
    178
    /* BrtEndMergeCells */
  ));
}
function c2(e, t) {
  !t || !t["!cols"] || (ee(
    e,
    390
    /* BrtBeginColInfos */
  ), t["!cols"].forEach(function(r, a) {
    r && ee(e, 60, Ym(a, r));
  }), ee(
    e,
    391
    /* BrtEndColInfos */
  ));
}
function l2(e, t) {
  !t || !t["!ref"] || (ee(
    e,
    648
    /* BrtBeginCellIgnoreECs */
  ), ee(e, 649, e2($e(t["!ref"]))), ee(
    e,
    650
    /* BrtEndCellIgnoreECs */
  ));
}
function o2(e, t, r) {
  t["!links"].forEach(function(a) {
    if (a[1].Target) {
      var n = Qe(r, -1, a[1].Target.replace(/#.*$/, ""), Ve.HLINK);
      ee(e, 494, Gm(a, n));
    }
  }), delete t["!links"];
}
function u2(e, t, r, a) {
  if (t["!comments"].length > 0) {
    var n = Qe(a, -1, "../drawings/vmlDrawing" + (r + 1) + ".vml", Ve.VML);
    ee(e, 551, Mi("rId" + n)), t["!legacy"] = n;
  }
}
function h2(e, t, r, a) {
  if (t["!autofilter"]) {
    var n = t["!autofilter"], i = typeof n.ref == "string" ? n.ref : Ne(n.ref);
    r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
    var s = r.Workbook.Names, f = st(i);
    f.s.r == f.e.r && (f.e.r = st(t["!ref"]).e.r, i = Ne(f));
    for (var c = 0; c < s.length; ++c) {
      var l = s[c];
      if (l.Name == "_xlnm._FilterDatabase" && l.Sheet == a) {
        l.Ref = "'" + r.SheetNames[a] + "'!" + i;
        break;
      }
    }
    c == s.length && s.push({ Name: "_xlnm._FilterDatabase", Sheet: a, Ref: "'" + r.SheetNames[a] + "'!" + i }), ee(e, 161, fn($e(i))), ee(
      e,
      162
      /* BrtEndAFilter */
    );
  }
}
function x2(e, t, r) {
  ee(
    e,
    133
    /* BrtBeginWsViews */
  ), ee(e, 137, Qm(t, r)), ee(
    e,
    138
    /* BrtEndWsView */
  ), ee(
    e,
    134
    /* BrtEndWsViews */
  );
}
function d2(e, t) {
  t["!protect"] && ee(e, 535, r2(t["!protect"]));
}
function p2(e, t, r, a) {
  var n = it(), i = r.SheetNames[e], s = r.Sheets[i] || {}, f = i;
  try {
    r && r.Workbook && (f = r.Workbook.Sheets[e].CodeName || f);
  } catch {
  }
  var c = $e(s["!ref"] || "A1");
  if (c.e.c > 16383 || c.e.r > 1048575) {
    if (t.WTF) throw new Error("Range " + (s["!ref"] || "A1") + " exceeds format limit A1:XFD1048576");
    c.e.c = Math.min(c.e.c, 16383), c.e.r = Math.min(c.e.c, 1048575);
  }
  return s["!links"] = [], s["!comments"] = [], ee(
    n,
    129
    /* BrtBeginSheet */
  ), (r.vbaraw || s["!outline"]) && ee(n, 147, cm(f, s["!outline"])), ee(n, 148, im(c)), x2(n, s, r.Workbook), c2(n, s), s2(n, s, e, t), d2(n, s), h2(n, s, r, e), f2(n, s), o2(n, s, a), s["!margins"] && ee(n, 476, qm(s["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && l2(n, s), u2(n, s, e, a), ee(
    n,
    130
    /* BrtEndSheet */
  ), n.end();
}
function v2(e) {
  var t = [], r = e.match(/^<c:numCache>/), a;
  (e.match(/<c:pt idx="(\d*)">(.*?)<\/c:pt>/mg) || []).forEach(function(i) {
    var s = i.match(/<c:pt idx="(\d*?)"><c:v>(.*)<\/c:v><\/c:pt>/);
    s && (t[+s[1]] = r ? +s[2] : s[2]);
  });
  var n = Ge((e.match(/<c:formatCode>([\s\S]*?)<\/c:formatCode>/) || ["", "General"])[1]);
  return (e.match(/<c:f>(.*?)<\/c:f>/mg) || []).forEach(function(i) {
    a = i.replace(/<.*?>/g, "");
  }), [t, n, a];
}
function m2(e, t, r, a, n, i) {
  var s = i || { "!type": "chart" };
  if (!e) return i;
  var f = 0, c = 0, l = "A", o = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } };
  return (e.match(/<c:numCache>[\s\S]*?<\/c:numCache>/gm) || []).forEach(function(u) {
    var x = v2(u);
    o.s.r = o.s.c = 0, o.e.c = f, l = ur(f), x[0].forEach(function(d, v) {
      s[l + wr(v)] = { t: "n", v: d, z: x[1] }, c = v;
    }), o.e.r < c && (o.e.r = c), ++f;
  }), f > 0 && (s["!ref"] = Ne(o)), s;
}
function g2(e, t, r, a, n) {
  if (!e) return e;
  a || (a = { "!id": {} });
  var i = { "!type": "chart", "!drawel": null, "!rel": "" }, s, f = e.match(dl);
  return f && Zi(f[0], i, n, r), (s = e.match(/drawing r:id="(.*?)"/)) && (i["!rel"] = s[1]), a["!id"][i["!rel"]] && (i["!drawel"] = a["!id"][i["!rel"]]), i;
}
function _2(e, t) {
  e.l += 10;
  var r = Kr(e);
  return { name: r };
}
function w2(e, t, r, a, n) {
  if (!e) return e;
  a || (a = { "!id": {} });
  var i = { "!type": "chart", "!drawel": null, "!rel": "" }, s = !1;
  return Zt(e, function(c, l, o) {
    switch (o) {
      case 550:
        i["!rel"] = c;
        break;
      case 651:
        n.Sheets[r] || (n.Sheets[r] = {}), c.name && (n.Sheets[r].CodeName = c.name);
        break;
      case 562:
      case 652:
      case 669:
      case 679:
      case 551:
      case 552:
      case 476:
      case 3072:
        break;
      case 35:
        s = !0;
        break;
      case 36:
        s = !1;
        break;
      case 37:
        break;
      case 38:
        break;
      default:
        if (!(l.T > 0)) {
          if (!(l.T < 0)) {
            if (!s || t.WTF) throw new Error("Unexpected record 0x" + o.toString(16));
          }
        }
    }
  }, t), a["!id"][i["!rel"]] && (i["!drawel"] = a["!id"][i["!rel"]]), i;
}
var Qi = [
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
], k2 = [
  ["activeTab", 0, "int"],
  ["autoFilterDateGrouping", !0, "bool"],
  ["firstSheet", 0, "int"],
  ["minimized", !1, "bool"],
  ["showHorizontalScroll", !0, "bool"],
  ["showSheetTabs", !0, "bool"],
  ["showVerticalScroll", !0, "bool"],
  ["tabRatio", 600, "int"],
  ["visibility", "visible"]
  //window{Height,Width}, {x,y}Window
], E2 = [
  //['state', 'visible']
], T2 = [
  ["calcCompleted", "true"],
  ["calcMode", "auto"],
  ["calcOnSave", "true"],
  ["concurrentCalc", "true"],
  ["fullCalcOnLoad", "false"],
  ["fullPrecision", "true"],
  ["iterate", "false"],
  ["iterateCount", "100"],
  ["iterateDelta", "0.001"],
  ["refMode", "A1"]
];
function mf(e, t) {
  for (var r = 0; r != e.length; ++r)
    for (var a = e[r], n = 0; n != t.length; ++n) {
      var i = t[n];
      if (a[i[0]] == null) a[i[0]] = i[1];
      else switch (i[2]) {
        case "bool":
          typeof a[i[0]] == "string" && (a[i[0]] = ar(a[i[0]]));
          break;
        case "int":
          typeof a[i[0]] == "string" && (a[i[0]] = parseInt(a[i[0]], 10));
          break;
      }
    }
}
function gf(e, t) {
  for (var r = 0; r != t.length; ++r) {
    var a = t[r];
    if (e[a[0]] == null) e[a[0]] = a[1];
    else switch (a[2]) {
      case "bool":
        typeof e[a[0]] == "string" && (e[a[0]] = ar(e[a[0]]));
        break;
      case "int":
        typeof e[a[0]] == "string" && (e[a[0]] = parseInt(e[a[0]], 10));
        break;
    }
  }
}
function gl(e) {
  gf(e.WBProps, Qi), gf(e.CalcPr, T2), mf(e.WBView, k2), mf(e.Sheets, E2), Qa.date1904 = ar(e.WBProps.date1904);
}
function y2(e) {
  return !e.Workbook || !e.Workbook.WBProps ? "false" : ar(e.Workbook.WBProps.date1904) ? "true" : "false";
}
var S2 = /* @__PURE__ */ "][*?/\\".split("");
function _l(e, t) {
  if (e.length > 31)
    throw new Error("Sheet names cannot exceed 31 chars");
  var r = !0;
  return S2.forEach(function(a) {
    if (e.indexOf(a) != -1)
      throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
  }), r;
}
function F2(e, t, r) {
  e.forEach(function(a, n) {
    _l(a);
    for (var i = 0; i < n; ++i) if (a == e[i]) throw new Error("Duplicate Sheet Name: " + a);
    if (r) {
      var s = t && t[n] && t[n].CodeName || a;
      if (s.charCodeAt(0) == 95 && s.length > 22) throw new Error("Bad Code Name: Worksheet" + s);
    }
  });
}
function A2(e) {
  if (!e || !e.SheetNames || !e.Sheets) throw new Error("Invalid Workbook");
  if (!e.SheetNames.length) throw new Error("Workbook is empty");
  var t = e.Workbook && e.Workbook.Sheets || [];
  F2(e.SheetNames, t, !!e.vbaraw);
  for (var r = 0; r < e.SheetNames.length; ++r) yv(e.Sheets[e.SheetNames[r]], e.SheetNames[r], r);
}
var C2 = /<\w+:workbook/;
function b2(e, t) {
  if (!e) throw new Error("Could not find file");
  var r = (
    /*::(*/
    { AppVersion: {}, WBProps: {}, WBView: [], Sheets: [], CalcPr: {}, Names: [], xmlns: "" }
  ), a = !1, n = "xmlns", i = {}, s = 0;
  if (e.replace(Jr, function(c, l) {
    var o = be(c);
    switch (Xt(o[0])) {
      case "<?xml":
        break;
      case "<workbook":
        c.match(C2) && (n = "xmlns" + c.match(/<(\w+):/)[1]), r.xmlns = o[n];
        break;
      case "</workbook>":
        break;
      case "<fileVersion":
        delete o[0], r.AppVersion = o;
        break;
      case "<fileVersion/>":
      case "</fileVersion>":
        break;
      case "<fileSharing":
        break;
      case "<fileSharing/>":
        break;
      case "<workbookPr":
      case "<workbookPr/>":
        Qi.forEach(function(u) {
          if (o[u[0]] != null)
            switch (u[2]) {
              case "bool":
                r.WBProps[u[0]] = ar(o[u[0]]);
                break;
              case "int":
                r.WBProps[u[0]] = parseInt(o[u[0]], 10);
                break;
              default:
                r.WBProps[u[0]] = o[u[0]];
            }
        }), o.codeName && (r.WBProps.CodeName = tr(o.codeName));
        break;
      case "</workbookPr>":
        break;
      case "<workbookProtection":
        break;
      case "<workbookProtection/>":
        break;
      case "<bookViews":
      case "<bookViews>":
      case "</bookViews>":
        break;
      case "<workbookView":
      case "<workbookView/>":
        delete o[0], r.WBView.push(o);
        break;
      case "</workbookView>":
        break;
      case "<sheets":
      case "<sheets>":
      case "</sheets>":
        break;
      case "<sheet":
        switch (o.state) {
          case "hidden":
            o.Hidden = 1;
            break;
          case "veryHidden":
            o.Hidden = 2;
            break;
          default:
            o.Hidden = 0;
        }
        delete o.state, o.name = Ge(tr(o.name)), delete o[0], r.Sheets.push(o);
        break;
      case "</sheet>":
        break;
      case "<functionGroups":
      case "<functionGroups/>":
        break;
      case "<functionGroup":
        break;
      case "<externalReferences":
      case "</externalReferences>":
      case "<externalReferences>":
        break;
      case "<externalReference":
        break;
      case "<definedNames/>":
        break;
      case "<definedNames>":
      case "<definedNames":
        a = !0;
        break;
      case "</definedNames>":
        a = !1;
        break;
      case "<definedName":
        i = {}, i.Name = tr(o.name), o.comment && (i.Comment = o.comment), o.localSheetId && (i.Sheet = +o.localSheetId), ar(o.hidden || "0") && (i.Hidden = !0), s = l + c.length;
        break;
      case "</definedName>":
        i.Ref = Ge(tr(e.slice(s, l))), r.Names.push(i);
        break;
      case "<definedName/>":
        break;
      case "<calcPr":
        delete o[0], r.CalcPr = o;
        break;
      case "<calcPr/>":
        delete o[0], r.CalcPr = o;
        break;
      case "</calcPr>":
        break;
      case "<oleSize":
        break;
      case "<customWorkbookViews>":
      case "</customWorkbookViews>":
      case "<customWorkbookViews":
        break;
      case "<customWorkbookView":
      case "</customWorkbookView>":
        break;
      case "<pivotCaches>":
      case "</pivotCaches>":
      case "<pivotCaches":
        break;
      case "<pivotCache":
        break;
      case "<smartTagPr":
      case "<smartTagPr/>":
        break;
      case "<smartTagTypes":
      case "<smartTagTypes>":
      case "</smartTagTypes>":
        break;
      case "<smartTagType":
        break;
      case "<webPublishing":
      case "<webPublishing/>":
        break;
      case "<fileRecoveryPr":
      case "<fileRecoveryPr/>":
        break;
      case "<webPublishObjects>":
      case "<webPublishObjects":
      case "</webPublishObjects>":
        break;
      case "<webPublishObject":
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
      case "<extLst/>":
        break;
      case "<ext":
        a = !0;
        break;
      case "</ext>":
        a = !1;
        break;
      case "<ArchID":
        break;
      case "<AlternateContent":
      case "<AlternateContent>":
        a = !0;
        break;
      case "</AlternateContent>":
        a = !1;
        break;
      case "<revisionPtr":
        break;
      default:
        if (!a && t.WTF) throw new Error("unrecognized " + o[0] + " in workbook");
    }
    return c;
  }), ba.indexOf(r.xmlns) === -1) throw new Error("Unknown Namespace: " + r.xmlns);
  return gl(r), r;
}
function wl(e) {
  var t = [kr];
  t[t.length] = oe("workbook", null, {
    xmlns: ba[0],
    //'xmlns:mx': XMLNS.mx,
    //'xmlns:s': XMLNS_main[0],
    "xmlns:r": Fr.r
  });
  var r = e.Workbook && (e.Workbook.Names || []).length > 0, a = { codeName: "ThisWorkbook" };
  e.Workbook && e.Workbook.WBProps && (Qi.forEach(function(f) {
    e.Workbook.WBProps[f[0]] != null && e.Workbook.WBProps[f[0]] != f[1] && (a[f[0]] = e.Workbook.WBProps[f[0]]);
  }), e.Workbook.WBProps.CodeName && (a.codeName = e.Workbook.WBProps.CodeName, delete a.CodeName)), t[t.length] = oe("workbookPr", null, a);
  var n = e.Workbook && e.Workbook.Sheets || [], i = 0;
  if (n && n[0] && n[0].Hidden) {
    for (t[t.length] = "<bookViews>", i = 0; i != e.SheetNames.length && !(!n[i] || !n[i].Hidden); ++i)
      ;
    i == e.SheetNames.length && (i = 0), t[t.length] = '<workbookView firstSheet="' + i + '" activeTab="' + i + '"/>', t[t.length] = "</bookViews>";
  }
  for (t[t.length] = "<sheets>", i = 0; i != e.SheetNames.length; ++i) {
    var s = { name: er(e.SheetNames[i].slice(0, 31)) };
    if (s.sheetId = "" + (i + 1), s["r:id"] = "rId" + (i + 1), n[i]) switch (n[i].Hidden) {
      case 1:
        s.state = "hidden";
        break;
      case 2:
        s.state = "veryHidden";
        break;
    }
    t[t.length] = oe("sheet", null, s);
  }
  return t[t.length] = "</sheets>", r && (t[t.length] = "<definedNames>", e.Workbook && e.Workbook.Names && e.Workbook.Names.forEach(function(f) {
    var c = { name: f.Name };
    f.Comment && (c.comment = f.Comment), f.Sheet != null && (c.localSheetId = "" + f.Sheet), f.Hidden && (c.hidden = "1"), f.Ref && (t[t.length] = oe("definedName", er(f.Ref), c));
  }), t[t.length] = "</definedNames>"), t.length > 2 && (t[t.length] = "</workbook>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function D2(e, t) {
  var r = {};
  return r.Hidden = e.read_shift(4), r.iTabID = e.read_shift(4), r.strRelID = li(e), r.name = Kr(e), r;
}
function I2(e, t) {
  return t || (t = Z(127)), t.write_shift(4, e.Hidden), t.write_shift(4, e.iTabID), Mi(e.strRelID, t), Ir(e.name.slice(0, 31), t), t.length > t.l ? t.slice(0, t.l) : t;
}
function O2(e, t) {
  var r = {}, a = e.read_shift(4);
  r.defaultThemeVersion = e.read_shift(4);
  var n = t > 8 ? Kr(e) : "";
  return n.length > 0 && (r.CodeName = n), r.autoCompressPictures = !!(a & 65536), r.backupFile = !!(a & 64), r.checkCompatibility = !!(a & 4096), r.date1904 = !!(a & 1), r.filterPrivacy = !!(a & 8), r.hidePivotFieldList = !!(a & 1024), r.promptedSolutions = !!(a & 16), r.publishItems = !!(a & 2048), r.refreshAllConnections = !!(a & 262144), r.saveExternalLinkValues = !!(a & 128), r.showBorderUnselectedTables = !!(a & 4), r.showInkAnnotation = !!(a & 32), r.showObjects = ["all", "placeholders", "none"][a >> 13 & 3], r.showPivotChartFilter = !!(a & 32768), r.updateLinks = ["userSet", "never", "always"][a >> 8 & 3], r;
}
function N2(e, t) {
  t || (t = Z(72));
  var r = 0;
  return e && e.filterPrivacy && (r |= 8), t.write_shift(4, r), t.write_shift(4, 0), uc(e && e.CodeName || "ThisWorkbook", t), t.slice(0, t.l);
}
function R2(e, t) {
  var r = {};
  return e.read_shift(4), r.ArchID = e.read_shift(4), e.l += t - 8, r;
}
function L2(e, t, r) {
  var a = e.l + t;
  e.l += 4, e.l += 1;
  var n = e.read_shift(4), i = uu(e), s = gv(e, 0, r), f = Bi(e);
  e.l = a;
  var c = { Name: i, Ptg: s };
  return n < 268435455 && (c.Sheet = n), f && (c.Comment = f), c;
}
function P2(e, t) {
  var r = { AppVersion: {}, WBProps: {}, WBView: [], Sheets: [], CalcPr: {}, xmlns: "" }, a = [], n = !1;
  t || (t = {}), t.biff = 12;
  var i = [], s = [[]];
  return s.SheetNames = [], s.XTI = [], Mn[16] = { n: "BrtFRTArchID$", f: R2 }, Zt(e, function(c, l, o) {
    switch (o) {
      case 156:
        s.SheetNames.push(c.name), r.Sheets.push(c);
        break;
      case 153:
        r.WBProps = c;
        break;
      case 39:
        c.Sheet != null && (t.SID = c.Sheet), c.Ref = Gr(c.Ptg, null, null, s, t), delete t.SID, delete c.Ptg, i.push(c);
        break;
      case 1036:
        break;
      case 357:
      case 358:
      case 355:
      case 667:
        s[0].length ? s.push([o, c]) : s[0] = [o, c], s[s.length - 1].XTI = [];
        break;
      case 362:
        s.length === 0 && (s[0] = [], s[0].XTI = []), s[s.length - 1].XTI = s[s.length - 1].XTI.concat(c), s.XTI = s.XTI.concat(c);
        break;
      case 361:
        break;
      case 2071:
      case 158:
      case 143:
      case 664:
      case 353:
        break;
      case 3072:
      case 3073:
      case 534:
      case 677:
      case 157:
      case 610:
      case 2050:
      case 155:
      case 548:
      case 676:
      case 128:
      case 665:
      case 2128:
      case 2125:
      case 549:
      case 2053:
      case 596:
      case 2076:
      case 2075:
      case 2082:
      case 397:
      case 154:
      case 1117:
      case 553:
      case 2091:
        break;
      case 35:
        a.push(o), n = !0;
        break;
      case 36:
        a.pop(), n = !1;
        break;
      case 37:
        a.push(o), n = !0;
        break;
      case 38:
        a.pop(), n = !1;
        break;
      case 16:
        break;
      default:
        if (!l.T) {
          if (!n || t.WTF && a[a.length - 1] != 37 && a[a.length - 1] != 35) throw new Error("Unexpected record 0x" + o.toString(16));
        }
    }
  }, t), gl(r), r.Names = i, r.supbooks = s, r;
}
function B2(e, t) {
  ee(
    e,
    143
    /* BrtBeginBundleShs */
  );
  for (var r = 0; r != t.SheetNames.length; ++r) {
    var a = t.Workbook && t.Workbook.Sheets && t.Workbook.Sheets[r] && t.Workbook.Sheets[r].Hidden || 0, n = { Hidden: a, iTabID: r + 1, strRelID: "rId" + (r + 1), name: t.SheetNames[r] };
    ee(e, 156, I2(n));
  }
  ee(
    e,
    144
    /* BrtEndBundleShs */
  );
}
function M2(e, t) {
  t || (t = Z(127));
  for (var r = 0; r != 4; ++r) t.write_shift(4, 0);
  return Ir("SheetJS", t), Ir(o0.version, t), Ir(o0.version, t), Ir("7262", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function U2(e, t) {
  t || (t = Z(29)), t.write_shift(-4, 0), t.write_shift(-4, 460), t.write_shift(4, 28800), t.write_shift(4, 17600), t.write_shift(4, 500), t.write_shift(4, e), t.write_shift(4, e);
  var r = 120;
  return t.write_shift(1, r), t.length > t.l ? t.slice(0, t.l) : t;
}
function W2(e, t) {
  if (!(!t.Workbook || !t.Workbook.Sheets)) {
    for (var r = t.Workbook.Sheets, a = 0, n = -1, i = -1; a < r.length; ++a)
      !r[a] || !r[a].Hidden && n == -1 ? n = a : r[a].Hidden == 1 && i == -1 && (i = a);
    i > n || (ee(
      e,
      135
      /* BrtBeginBookViews */
    ), ee(e, 158, U2(n)), ee(
      e,
      136
      /* BrtEndBookViews */
    ));
  }
}
function V2(e, t) {
  var r = it();
  return ee(
    r,
    131
    /* BrtBeginBook */
  ), ee(r, 128, M2()), ee(r, 153, N2(e.Workbook && e.Workbook.WBProps || null)), W2(r, e), B2(r, e), ee(
    r,
    132
    /* BrtEndBook */
  ), r.end();
}
function H2(e, t, r) {
  return t.slice(-4) === ".bin" ? P2(e, r) : b2(e, r);
}
function X2(e, t, r, a, n, i, s, f) {
  return t.slice(-4) === ".bin" ? n2(e, a, r, n, i, s, f) : Lv(e, a, r, n, i, s, f);
}
function z2(e, t, r, a, n, i, s, f) {
  return t.slice(-4) === ".bin" ? w2(e, a, r, n, i) : g2(e, a, r, n, i);
}
function G2(e, t, r, a, n, i, s, f) {
  return t.slice(-4) === ".bin" ? jd() : Kd();
}
function $2(e, t, r, a, n, i, s, f) {
  return t.slice(-4) === ".bin" ? Gd() : $d();
}
function j2(e, t, r, a) {
  return t.slice(-4) === ".bin" ? Hx(e, r, a) : Dx(e, r, a);
}
function K2(e, t, r) {
  return el(e, r);
}
function Y2(e, t, r) {
  return t.slice(-4) === ".bin" ? Y1(e, r) : $1(e, r);
}
function J2(e, t, r) {
  return t.slice(-4) === ".bin" ? Wd(e, r) : Id(e, r);
}
function q2(e, t, r) {
  return t.slice(-4) === ".bin" ? Cd(e) : Fd(e);
}
function Z2(e, t, r, a) {
  return r.slice(-4) === ".bin" ? bd(e, t, r, a) : void 0;
}
function Q2(e, t, r) {
  return t.slice(-4) === ".bin" ? Td(e, t, r) : Sd(e, t, r);
}
function eg(e, t, r) {
  return (t.slice(-4) === ".bin" ? V2 : wl)(e);
}
function rg(e, t, r, a, n) {
  return (t.slice(-4) === ".bin" ? p2 : pl)(e, r, a, n);
}
function tg(e, t, r) {
  return (t.slice(-4) === ".bin" ? Zx : Zc)(e, r);
}
function ag(e, t, r) {
  return (t.slice(-4) === ".bin" ? Z1 : zc)(e, r);
}
function ng(e, t, r) {
  return (t.slice(-4) === ".bin" ? Vd : al)(e);
}
function ig(e) {
  return (e.slice(-4) === ".bin" ? yd : rl)();
}
var kl = /([\w:]+)=((?:")([^"]*)(?:")|(?:')([^']*)(?:'))/g, El = /([\w:]+)=((?:")(?:[^"]*)(?:")|(?:')(?:[^']*)(?:'))/;
function Ot(e, t) {
  var r = e.split(/\s+/), a = [];
  if (a[0] = r[0], r.length === 1) return a;
  var n = e.match(kl), i, s, f, c;
  if (n) for (c = 0; c != n.length; ++c)
    i = n[c].match(El), (s = i[1].indexOf(":")) === -1 ? a[i[1]] = i[2].slice(1, i[2].length - 1) : (i[1].slice(0, 6) === "xmlns:" ? f = "xmlns" + i[1].slice(6) : f = i[1].slice(s + 1), a[f] = i[2].slice(1, i[2].length - 1));
  return a;
}
function sg(e) {
  var t = e.split(/\s+/), r = {};
  if (t.length === 1) return r;
  var a = e.match(kl), n, i, s, f;
  if (a) for (f = 0; f != a.length; ++f)
    n = a[f].match(El), (i = n[1].indexOf(":")) === -1 ? r[n[1]] = n[2].slice(1, n[2].length - 1) : (n[1].slice(0, 6) === "xmlns:" ? s = "xmlns" + n[1].slice(6) : s = n[1].slice(i + 1), r[s] = n[2].slice(1, n[2].length - 1));
  return r;
}
var Sn;
function fg(e, t) {
  var r = Sn[e] || Ge(e);
  return r === "General" ? Ta(t) : Ft(r, t);
}
function cg(e, t, r, a) {
  var n = a;
  switch ((r[0].match(/dt:dt="([\w.]+)"/) || ["", ""])[1]) {
    case "boolean":
      n = ar(a);
      break;
    case "i2":
    case "int":
      n = parseInt(a, 10);
      break;
    case "r4":
    case "float":
      n = parseFloat(a);
      break;
    case "date":
    case "dateTime.tz":
      n = nr(a);
      break;
    case "i8":
    case "string":
    case "fixed":
    case "uuid":
    case "bin.base64":
      break;
    default:
      throw new Error("bad custprop:" + r[0]);
  }
  e[Ge(t)] = n;
}
function lg(e, t, r) {
  if (e.t !== "z") {
    if (!r || r.cellText !== !1) try {
      e.t === "e" ? e.w = e.w || Qt[e.v] : t === "General" ? e.t === "n" ? (e.v | 0) === e.v ? e.w = e.v.toString(10) : e.w = bn(e.v) : e.w = Ta(e.v) : e.w = fg(t || "General", e.v);
    } catch (i) {
      if (r.WTF) throw i;
    }
    try {
      var a = Sn[t] || t || "General";
      if (r.cellNF && (e.z = a), r.cellDates && e.t == "n" && an(a)) {
        var n = ga(e.v);
        n && (e.t = "d", e.v = new Date(n.y, n.m - 1, n.d, n.H, n.M, n.S, n.u));
      }
    } catch (i) {
      if (r.WTF) throw i;
    }
  }
}
function og(e, t, r) {
  if (r.cellStyles && t.Interior) {
    var a = t.Interior;
    a.Pattern && (a.patternType = Ex[a.Pattern] || a.Pattern);
  }
  e[t.ID] = t;
}
function ug(e, t, r, a, n, i, s, f, c, l) {
  var o = "General", u = a.StyleID, x = {};
  l = l || {};
  var d = [], v = 0;
  for (u === void 0 && f && (u = f.StyleID), u === void 0 && s && (u = s.StyleID); i[u] !== void 0 && (i[u].nf && (o = i[u].nf), i[u].Interior && d.push(i[u].Interior), !!i[u].Parent); )
    u = i[u].Parent;
  switch (r.Type) {
    case "Boolean":
      a.t = "b", a.v = ar(e);
      break;
    case "String":
      a.t = "s", a.r = Rs(Ge(e)), a.v = e.indexOf("<") > -1 ? Ge(t || e).replace(/<.*?>/g, "") : a.r;
      break;
    case "DateTime":
      e.slice(-1) != "Z" && (e += "Z"), a.v = (nr(e) - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1e3), a.v !== a.v ? a.v = Ge(e) : a.v < 60 && (a.v = a.v - 1), (!o || o == "General") && (o = "yyyy-mm-dd");
    case "Number":
      a.v === void 0 && (a.v = +e), a.t || (a.t = "n");
      break;
    case "Error":
      a.t = "e", a.v = vc[e], l.cellText !== !1 && (a.w = e);
      break;
    default:
      e == "" && t == "" ? a.t = "z" : (a.t = "s", a.v = Rs(t || e));
      break;
  }
  if (lg(a, o, l), l.cellFormula !== !1)
    if (a.Formula) {
      var h = Ge(a.Formula);
      h.charCodeAt(0) == 61 && (h = h.slice(1)), a.f = Za(h, n), delete a.Formula, a.ArrayRange == "RC" ? a.F = Za("RC:RC", n) : a.ArrayRange && (a.F = Za(a.ArrayRange, n), c.push([$e(a.F), a.F]));
    } else
      for (v = 0; v < c.length; ++v)
        n.r >= c[v][0].s.r && n.r <= c[v][0].e.r && n.c >= c[v][0].s.c && n.c <= c[v][0].e.c && (a.F = c[v][1]);
  l.cellStyles && (d.forEach(function(g) {
    !x.patternType && g.patternType && (x.patternType = g.patternType);
  }), a.s = x), a.StyleID !== void 0 && (a.ixfe = a.StyleID);
}
function hg(e) {
  e.t = e.v || "", e.t = e.t.replace(/\r\n/g, `
`).replace(/\r/g, `
`), e.v = e.w = e.ixfe = void 0;
}
function ai(e, t) {
  var r = t || {};
  nn();
  var a = vn(Ii(e));
  (r.type == "binary" || r.type == "array" || r.type == "base64") && (a = tr(a));
  var n = a.slice(0, 1024).toLowerCase(), i = !1;
  if (n = n.replace(/".*?"/g, ""), (n.indexOf(">") & 1023) > Math.min(n.indexOf(",") & 1023, n.indexOf(";") & 1023)) {
    var s = ir(r);
    return s.type = "string", rn.to_workbook(a, s);
  }
  if (n.indexOf("<?xml") == -1 && ["html", "table", "head", "meta", "script", "style", "div"].forEach(function(sr) {
    n.indexOf("<" + sr) >= 0 && (i = !0);
  }), i) return qg(a, r);
  Sn = {
    "General Number": "General",
    "General Date": Fe[22],
    "Long Date": "dddd, mmmm dd, yyyy",
    "Medium Date": Fe[15],
    "Short Date": Fe[14],
    "Long Time": Fe[19],
    "Medium Time": Fe[18],
    "Short Time": Fe[20],
    Currency: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
    Fixed: Fe[2],
    Standard: Fe[4],
    Percent: Fe[10],
    Scientific: Fe[11],
    "Yes/No": '"Yes";"Yes";"No";@',
    "True/False": '"True";"True";"False";@',
    "On/Off": '"Yes";"Yes";"No";@'
  };
  var f, c = [], l, o = {}, u = [], x = r.dense ? [] : {}, d = "", v = {}, h = {}, g = Ot('<Data ss:Type="String">'), T = 0, A = 0, k = 0, R = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } }, V = {}, N = {}, S = "", z = 0, L = [], J = {}, j = {}, H = 0, re = [], me = [], xe = {}, ve = [], de, Xe = !1, K = [], pe = [], we = {}, C = 0, M = 0, O = { Sheets: [], WBProps: { date1904: !1 } }, P = {};
  On.lastIndex = 0, a = a.replace(/<!--([\s\S]*?)-->/mg, "");
  for (var Q = ""; f = On.exec(a); ) switch (f[3] = (Q = f[3]).toLowerCase()) {
    case "data":
      if (Q == "data") {
        if (f[1] === "/") {
          if ((l = c.pop())[0] !== f[3]) throw new Error("Bad state: " + l.join("|"));
        } else f[0].charAt(f[0].length - 2) !== "/" && c.push([f[3], !0]);
        break;
      }
      if (c[c.length - 1][1]) break;
      f[1] === "/" ? ug(a.slice(T, f.index), S, g, c[c.length - 1][0] == /*"Comment"*/
      "comment" ? xe : v, { c: A, r: k }, V, ve[A], h, K, r) : (S = "", g = Ot(f[0]), T = f.index + f[0].length);
      break;
    case "cell":
      if (f[1] === "/")
        if (me.length > 0 && (v.c = me), (!r.sheetRows || r.sheetRows > k) && v.v !== void 0 && (r.dense ? (x[k] || (x[k] = []), x[k][A] = v) : x[ur(A) + wr(k)] = v), v.HRef && (v.l = { Target: Ge(v.HRef) }, v.HRefScreenTip && (v.l.Tooltip = v.HRefScreenTip), delete v.HRef, delete v.HRefScreenTip), (v.MergeAcross || v.MergeDown) && (C = A + (parseInt(v.MergeAcross, 10) | 0), M = k + (parseInt(v.MergeDown, 10) | 0), L.push({ s: { c: A, r: k }, e: { c: C, r: M } })), !r.sheetStubs)
          v.MergeAcross ? A = C + 1 : ++A;
        else if (v.MergeAcross || v.MergeDown) {
          for (var fe = A; fe <= C; ++fe)
            for (var ce = k; ce <= M; ++ce)
              (fe > A || ce > k) && (r.dense ? (x[ce] || (x[ce] = []), x[ce][fe] = { t: "z" }) : x[ur(fe) + wr(ce)] = { t: "z" });
          A = C + 1;
        } else ++A;
      else
        v = sg(f[0]), v.Index && (A = +v.Index - 1), A < R.s.c && (R.s.c = A), A > R.e.c && (R.e.c = A), f[0].slice(-2) === "/>" && ++A, me = [];
      break;
    case "row":
      f[1] === "/" || f[0].slice(-2) === "/>" ? (k < R.s.r && (R.s.r = k), k > R.e.r && (R.e.r = k), f[0].slice(-2) === "/>" && (h = Ot(f[0]), h.Index && (k = +h.Index - 1)), A = 0, ++k) : (h = Ot(f[0]), h.Index && (k = +h.Index - 1), we = {}, (h.AutoFitHeight == "0" || h.Height) && (we.hpx = parseInt(h.Height, 10), we.hpt = Bn(we.hpx), pe[k] = we), h.Hidden == "1" && (we.hidden = !0, pe[k] = we));
      break;
    case "worksheet":
      if (f[1] === "/") {
        if ((l = c.pop())[0] !== f[3]) throw new Error("Bad state: " + l.join("|"));
        u.push(d), R.s.r <= R.e.r && R.s.c <= R.e.c && (x["!ref"] = Ne(R), r.sheetRows && r.sheetRows <= R.e.r && (x["!fullref"] = x["!ref"], R.e.r = r.sheetRows - 1, x["!ref"] = Ne(R))), L.length && (x["!merges"] = L), ve.length > 0 && (x["!cols"] = ve), pe.length > 0 && (x["!rows"] = pe), o[d] = x;
      } else
        R = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } }, k = A = 0, c.push([f[3], !1]), l = Ot(f[0]), d = Ge(l.Name), x = r.dense ? [] : {}, L = [], K = [], pe = [], P = { name: d, Hidden: 0 }, O.Sheets.push(P);
      break;
    case "table":
      if (f[1] === "/") {
        if ((l = c.pop())[0] !== f[3]) throw new Error("Bad state: " + l.join("|"));
      } else {
        if (f[0].slice(-2) == "/>") break;
        c.push([f[3], !1]), ve = [], Xe = !1;
      }
      break;
    case "style":
      f[1] === "/" ? og(V, N, r) : N = Ot(f[0]);
      break;
    case "numberformat":
      N.nf = Ge(Ot(f[0]).Format || "General"), Sn[N.nf] && (N.nf = Sn[N.nf]);
      for (var ie = 0; ie != 392 && Fe[ie] != N.nf; ++ie) ;
      if (ie == 392) {
        for (ie = 57; ie != 392; ++ie) if (Fe[ie] == null) {
          Kt(N.nf, ie);
          break;
        }
      }
      break;
    case "column":
      if (c[c.length - 1][0] !== /*'Table'*/
      "table") break;
      if (de = Ot(f[0]), de.Hidden && (de.hidden = !0, delete de.Hidden), de.Width && (de.wpx = parseInt(de.Width, 10)), !Xe && de.wpx > 10) {
        Xe = !0, $r = Jc;
        for (var ne = 0; ne < ve.length; ++ne) ve[ne] && na(ve[ne]);
      }
      Xe && na(de), ve[de.Index - 1 || ve.length] = de;
      for (var Ie = 0; Ie < +de.Span; ++Ie) ve[ve.length] = ir(de);
      break;
    case "namedrange":
      if (f[1] === "/") break;
      O.Names || (O.Names = []);
      var F = be(f[0]), rr = {
        Name: F.Name,
        Ref: Za(F.RefersTo.slice(1), { r: 0, c: 0 })
      };
      O.Sheets.length > 0 && (rr.Sheet = O.Sheets.length - 1), O.Names.push(rr);
      break;
    case "namedcell":
      break;
    case "b":
      break;
    case "i":
      break;
    case "u":
      break;
    case "s":
      break;
    case "em":
      break;
    case "h2":
      break;
    case "h3":
      break;
    case "sub":
      break;
    case "sup":
      break;
    case "span":
      break;
    case "alignment":
      break;
    case "borders":
      break;
    case "border":
      break;
    case "font":
      if (f[0].slice(-2) === "/>") break;
      f[1] === "/" ? S += a.slice(z, f.index) : z = f.index + f[0].length;
      break;
    case "interior":
      if (!r.cellStyles) break;
      N.Interior = Ot(f[0]);
      break;
    case "protection":
      break;
    case "author":
    case "title":
    case "description":
    case "created":
    case "keywords":
    case "subject":
    case "category":
    case "company":
    case "lastauthor":
    case "lastsaved":
    case "lastprinted":
    case "version":
    case "revision":
    case "totaltime":
    case "hyperlinkbase":
    case "manager":
    case "contentstatus":
    case "identifier":
    case "language":
    case "appname":
      if (f[0].slice(-2) === "/>") break;
      f[1] === "/" ? Pu(J, Q, a.slice(H, f.index)) : H = f.index + f[0].length;
      break;
    case "paragraphs":
      break;
    case "styles":
    case "workbook":
      if (f[1] === "/") {
        if ((l = c.pop())[0] !== f[3]) throw new Error("Bad state: " + l.join("|"));
      } else c.push([f[3], !1]);
      break;
    case "comment":
      if (f[1] === "/") {
        if ((l = c.pop())[0] !== f[3]) throw new Error("Bad state: " + l.join("|"));
        hg(xe), me.push(xe);
      } else
        c.push([f[3], !1]), l = Ot(f[0]), xe = { a: l.Author };
      break;
    case "autofilter":
      if (f[1] === "/") {
        if ((l = c.pop())[0] !== f[3]) throw new Error("Bad state: " + l.join("|"));
      } else if (f[0].charAt(f[0].length - 2) !== "/") {
        var He = Ot(f[0]);
        x["!autofilter"] = { ref: Za(He.Range).replace(/\$/g, "") }, c.push([f[3], !0]);
      }
      break;
    case "name":
      break;
    case "datavalidation":
      if (f[1] === "/") {
        if ((l = c.pop())[0] !== f[3]) throw new Error("Bad state: " + l.join("|"));
      } else
        f[0].charAt(f[0].length - 2) !== "/" && c.push([f[3], !0]);
      break;
    case "pixelsperinch":
      break;
    case "componentoptions":
    case "documentproperties":
    case "customdocumentproperties":
    case "officedocumentsettings":
    case "pivottable":
    case "pivotcache":
    case "names":
    case "mapinfo":
    case "pagebreaks":
    case "querytable":
    case "sorting":
    case "schema":
    case "conditionalformatting":
    case "smarttagtype":
    case "smarttags":
    case "excelworkbook":
    case "workbookoptions":
    case "worksheetoptions":
      if (f[1] === "/") {
        if ((l = c.pop())[0] !== f[3]) throw new Error("Bad state: " + l.join("|"));
      } else f[0].charAt(f[0].length - 2) !== "/" && c.push([f[3], !0]);
      break;
    case "null":
      break;
    default:
      if (c.length == 0 && f[3] == "document" || c.length == 0 && f[3] == "uof") return Tf(a, r);
      var Je = !0;
      switch (c[c.length - 1][0]) {
        case "officedocumentsettings":
          switch (f[3]) {
            case "allowpng":
              break;
            case "removepersonalinformation":
              break;
            case "downloadcomponents":
              break;
            case "locationofcomponents":
              break;
            case "colors":
              break;
            case "color":
              break;
            case "index":
              break;
            case "rgb":
              break;
            case "targetscreensize":
              break;
            case "readonlyrecommended":
              break;
            default:
              Je = !1;
          }
          break;
        case "componentoptions":
          switch (f[3]) {
            case "toolbar":
              break;
            case "hideofficelogo":
              break;
            case "spreadsheetautofit":
              break;
            case "label":
              break;
            case "caption":
              break;
            case "maxheight":
              break;
            case "maxwidth":
              break;
            case "nextsheetnumber":
              break;
            default:
              Je = !1;
          }
          break;
        case "excelworkbook":
          switch (f[3]) {
            case "date1904":
              O.WBProps.date1904 = !0;
              break;
            case "windowheight":
              break;
            case "windowwidth":
              break;
            case "windowtopx":
              break;
            case "windowtopy":
              break;
            case "tabratio":
              break;
            case "protectstructure":
              break;
            case "protectwindow":
              break;
            case "protectwindows":
              break;
            case "activesheet":
              break;
            case "displayinknotes":
              break;
            case "firstvisiblesheet":
              break;
            case "supbook":
              break;
            case "sheetname":
              break;
            case "sheetindex":
              break;
            case "sheetindexfirst":
              break;
            case "sheetindexlast":
              break;
            case "dll":
              break;
            case "acceptlabelsinformulas":
              break;
            case "donotsavelinkvalues":
              break;
            case "iteration":
              break;
            case "maxiterations":
              break;
            case "maxchange":
              break;
            case "path":
              break;
            case "xct":
              break;
            case "count":
              break;
            case "selectedsheets":
              break;
            case "calculation":
              break;
            case "uncalced":
              break;
            case "startupprompt":
              break;
            case "crn":
              break;
            case "externname":
              break;
            case "formula":
              break;
            case "colfirst":
              break;
            case "collast":
              break;
            case "wantadvise":
              break;
            case "boolean":
              break;
            case "error":
              break;
            case "text":
              break;
            case "ole":
              break;
            case "noautorecover":
              break;
            case "publishobjects":
              break;
            case "donotcalculatebeforesave":
              break;
            case "number":
              break;
            case "refmoder1c1":
              break;
            case "embedsavesmarttags":
              break;
            default:
              Je = !1;
          }
          break;
        case "workbookoptions":
          switch (f[3]) {
            case "owcversion":
              break;
            case "height":
              break;
            case "width":
              break;
            default:
              Je = !1;
          }
          break;
        case "worksheetoptions":
          switch (f[3]) {
            case "visible":
              if (f[0].slice(-2) !== "/>") if (f[1] === "/") switch (a.slice(H, f.index)) {
                case "SheetHidden":
                  P.Hidden = 1;
                  break;
                case "SheetVeryHidden":
                  P.Hidden = 2;
                  break;
              }
              else H = f.index + f[0].length;
              break;
            case "header":
              x["!margins"] || Ea(x["!margins"] = {}, "xlml"), isNaN(+be(f[0]).Margin) || (x["!margins"].header = +be(f[0]).Margin);
              break;
            case "footer":
              x["!margins"] || Ea(x["!margins"] = {}, "xlml"), isNaN(+be(f[0]).Margin) || (x["!margins"].footer = +be(f[0]).Margin);
              break;
            case "pagemargins":
              var Re = be(f[0]);
              x["!margins"] || Ea(x["!margins"] = {}, "xlml"), isNaN(+Re.Top) || (x["!margins"].top = +Re.Top), isNaN(+Re.Left) || (x["!margins"].left = +Re.Left), isNaN(+Re.Right) || (x["!margins"].right = +Re.Right), isNaN(+Re.Bottom) || (x["!margins"].bottom = +Re.Bottom);
              break;
            case "displayrighttoleft":
              O.Views || (O.Views = []), O.Views[0] || (O.Views[0] = {}), O.Views[0].RTL = !0;
              break;
            case "freezepanes":
              break;
            case "frozennosplit":
              break;
            case "splithorizontal":
            case "splitvertical":
              break;
            case "donotdisplaygridlines":
              break;
            case "activerow":
              break;
            case "activecol":
              break;
            case "toprowbottompane":
              break;
            case "leftcolumnrightpane":
              break;
            case "unsynced":
              break;
            case "print":
              break;
            case "printerrors":
              break;
            case "panes":
              break;
            case "scale":
              break;
            case "pane":
              break;
            case "number":
              break;
            case "layout":
              break;
            case "pagesetup":
              break;
            case "selected":
              break;
            case "protectobjects":
              break;
            case "enableselection":
              break;
            case "protectscenarios":
              break;
            case "validprinterinfo":
              break;
            case "horizontalresolution":
              break;
            case "verticalresolution":
              break;
            case "numberofcopies":
              break;
            case "activepane":
              break;
            case "toprowvisible":
              break;
            case "leftcolumnvisible":
              break;
            case "fittopage":
              break;
            case "rangeselection":
              break;
            case "papersizeindex":
              break;
            case "pagelayoutzoom":
              break;
            case "pagebreakzoom":
              break;
            case "filteron":
              break;
            case "fitwidth":
              break;
            case "fitheight":
              break;
            case "commentslayout":
              break;
            case "zoom":
              break;
            case "lefttoright":
              break;
            case "gridlines":
              break;
            case "allowsort":
              break;
            case "allowfilter":
              break;
            case "allowinsertrows":
              break;
            case "allowdeleterows":
              break;
            case "allowinsertcols":
              break;
            case "allowdeletecols":
              break;
            case "allowinserthyperlinks":
              break;
            case "allowformatcells":
              break;
            case "allowsizecols":
              break;
            case "allowsizerows":
              break;
            case "nosummaryrowsbelowdetail":
              x["!outline"] || (x["!outline"] = {}), x["!outline"].above = !0;
              break;
            case "tabcolorindex":
              break;
            case "donotdisplayheadings":
              break;
            case "showpagelayoutzoom":
              break;
            case "nosummarycolumnsrightdetail":
              x["!outline"] || (x["!outline"] = {}), x["!outline"].left = !0;
              break;
            case "blackandwhite":
              break;
            case "donotdisplayzeros":
              break;
            case "displaypagebreak":
              break;
            case "rowcolheadings":
              break;
            case "donotdisplayoutline":
              break;
            case "noorientation":
              break;
            case "allowusepivottables":
              break;
            case "zeroheight":
              break;
            case "viewablerange":
              break;
            case "selection":
              break;
            case "protectcontents":
              break;
            default:
              Je = !1;
          }
          break;
        case "pivottable":
        case "pivotcache":
          switch (f[3]) {
            case "immediateitemsondrop":
              break;
            case "showpagemultipleitemlabel":
              break;
            case "compactrowindent":
              break;
            case "location":
              break;
            case "pivotfield":
              break;
            case "orientation":
              break;
            case "layoutform":
              break;
            case "layoutsubtotallocation":
              break;
            case "layoutcompactrow":
              break;
            case "position":
              break;
            case "pivotitem":
              break;
            case "datatype":
              break;
            case "datafield":
              break;
            case "sourcename":
              break;
            case "parentfield":
              break;
            case "ptlineitems":
              break;
            case "ptlineitem":
              break;
            case "countofsameitems":
              break;
            case "item":
              break;
            case "itemtype":
              break;
            case "ptsource":
              break;
            case "cacheindex":
              break;
            case "consolidationreference":
              break;
            case "filename":
              break;
            case "reference":
              break;
            case "nocolumngrand":
              break;
            case "norowgrand":
              break;
            case "blanklineafteritems":
              break;
            case "hidden":
              break;
            case "subtotal":
              break;
            case "basefield":
              break;
            case "mapchilditems":
              break;
            case "function":
              break;
            case "refreshonfileopen":
              break;
            case "printsettitles":
              break;
            case "mergelabels":
              break;
            case "defaultversion":
              break;
            case "refreshname":
              break;
            case "refreshdate":
              break;
            case "refreshdatecopy":
              break;
            case "versionlastrefresh":
              break;
            case "versionlastupdate":
              break;
            case "versionupdateablemin":
              break;
            case "versionrefreshablemin":
              break;
            case "calculation":
              break;
            default:
              Je = !1;
          }
          break;
        case "pagebreaks":
          switch (f[3]) {
            case "colbreaks":
              break;
            case "colbreak":
              break;
            case "rowbreaks":
              break;
            case "rowbreak":
              break;
            case "colstart":
              break;
            case "colend":
              break;
            case "rowend":
              break;
            default:
              Je = !1;
          }
          break;
        case "autofilter":
          switch (f[3]) {
            case "autofiltercolumn":
              break;
            case "autofiltercondition":
              break;
            case "autofilterand":
              break;
            case "autofilteror":
              break;
            default:
              Je = !1;
          }
          break;
        case "querytable":
          switch (f[3]) {
            case "id":
              break;
            case "autoformatfont":
              break;
            case "autoformatpattern":
              break;
            case "querysource":
              break;
            case "querytype":
              break;
            case "enableredirections":
              break;
            case "refreshedinxl9":
              break;
            case "urlstring":
              break;
            case "htmltables":
              break;
            case "connection":
              break;
            case "commandtext":
              break;
            case "refreshinfo":
              break;
            case "notitles":
              break;
            case "nextid":
              break;
            case "columninfo":
              break;
            case "overwritecells":
              break;
            case "donotpromptforfile":
              break;
            case "textwizardsettings":
              break;
            case "source":
              break;
            case "number":
              break;
            case "decimal":
              break;
            case "thousandseparator":
              break;
            case "trailingminusnumbers":
              break;
            case "formatsettings":
              break;
            case "fieldtype":
              break;
            case "delimiters":
              break;
            case "tab":
              break;
            case "comma":
              break;
            case "autoformatname":
              break;
            case "versionlastedit":
              break;
            case "versionlastrefresh":
              break;
            default:
              Je = !1;
          }
          break;
        case "datavalidation":
          switch (f[3]) {
            case "range":
              break;
            case "type":
              break;
            case "min":
              break;
            case "max":
              break;
            case "sort":
              break;
            case "descending":
              break;
            case "order":
              break;
            case "casesensitive":
              break;
            case "value":
              break;
            case "errorstyle":
              break;
            case "errormessage":
              break;
            case "errortitle":
              break;
            case "inputmessage":
              break;
            case "inputtitle":
              break;
            case "combohide":
              break;
            case "inputhide":
              break;
            case "condition":
              break;
            case "qualifier":
              break;
            case "useblank":
              break;
            case "value1":
              break;
            case "value2":
              break;
            case "format":
              break;
            case "cellrangelist":
              break;
            default:
              Je = !1;
          }
          break;
        case "sorting":
        case "conditionalformatting":
          switch (f[3]) {
            case "range":
              break;
            case "type":
              break;
            case "min":
              break;
            case "max":
              break;
            case "sort":
              break;
            case "descending":
              break;
            case "order":
              break;
            case "casesensitive":
              break;
            case "value":
              break;
            case "errorstyle":
              break;
            case "errormessage":
              break;
            case "errortitle":
              break;
            case "cellrangelist":
              break;
            case "inputmessage":
              break;
            case "inputtitle":
              break;
            case "combohide":
              break;
            case "inputhide":
              break;
            case "condition":
              break;
            case "qualifier":
              break;
            case "useblank":
              break;
            case "value1":
              break;
            case "value2":
              break;
            case "format":
              break;
            default:
              Je = !1;
          }
          break;
        case "mapinfo":
        case "schema":
        case "data":
          switch (f[3]) {
            case "map":
              break;
            case "entry":
              break;
            case "range":
              break;
            case "xpath":
              break;
            case "field":
              break;
            case "xsdtype":
              break;
            case "filteron":
              break;
            case "aggregate":
              break;
            case "elementtype":
              break;
            case "attributetype":
              break;
            case "schema":
            case "element":
            case "complextype":
            case "datatype":
            case "all":
            case "attribute":
            case "extends":
              break;
            case "row":
              break;
            default:
              Je = !1;
          }
          break;
        case "smarttags":
          break;
        default:
          Je = !1;
          break;
      }
      if (Je || f[3].match(/!\[CDATA/)) break;
      if (!c[c.length - 1][1]) throw "Unrecognized tag: " + f[3] + "|" + c.join("|");
      if (c[c.length - 1][0] === /*'CustomDocumentProperties'*/
      "customdocumentproperties") {
        if (f[0].slice(-2) === "/>") break;
        f[1] === "/" ? cg(j, Q, re, a.slice(H, f.index)) : (re = f, H = f.index + f[0].length);
        break;
      }
      if (r.WTF) throw "Unrecognized tag: " + f[3] + "|" + c.join("|");
  }
  var le = {};
  return !r.bookSheets && !r.bookProps && (le.Sheets = o), le.SheetNames = u, le.Workbook = O, le.SSF = ir(Fe), le.Props = J, le.Custprops = j, le;
}
function vi(e, t) {
  switch (rs(t = t || {}), t.type || "base64") {
    case "base64":
      return ai(xt(e), t);
    case "binary":
    case "buffer":
    case "file":
      return ai(e, t);
    case "array":
      return ai(fa(e), t);
  }
}
function xg(e, t) {
  var r = [];
  return e.Props && r.push(Bu(e.Props, t)), e.Custprops && r.push(Mu(e.Props, e.Custprops)), r.join("");
}
function dg() {
  return "";
}
function pg(e, t) {
  var r = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
  return t.cellXfs.forEach(function(a, n) {
    var i = [];
    i.push(oe("NumberFormat", null, { "ss:Format": er(Fe[a.numFmtId]) }));
    var s = (
      /*::(*/
      { "ss:ID": "s" + (21 + n) }
    );
    r.push(oe("Style", i.join(""), s));
  }), oe("Styles", r.join(""));
}
function Tl(e) {
  return oe("NamedRange", null, { "ss:Name": e.Name, "ss:RefersTo": "=" + Yi(e.Ref, { r: 0, c: 0 }) });
}
function vg(e) {
  if (!((e || {}).Workbook || {}).Names) return "";
  for (var t = e.Workbook.Names, r = [], a = 0; a < t.length; ++a) {
    var n = t[a];
    n.Sheet == null && (n.Name.match(/^_xlfn\./) || r.push(Tl(n)));
  }
  return oe("Names", r.join(""));
}
function mg(e, t, r, a) {
  if (!e || !((a || {}).Workbook || {}).Names) return "";
  for (var n = a.Workbook.Names, i = [], s = 0; s < n.length; ++s) {
    var f = n[s];
    f.Sheet == r && (f.Name.match(/^_xlfn\./) || i.push(Tl(f)));
  }
  return i.join("");
}
function gg(e, t, r, a) {
  if (!e) return "";
  var n = [];
  if (e["!margins"] && (n.push("<PageSetup>"), e["!margins"].header && n.push(oe("Header", null, { "x:Margin": e["!margins"].header })), e["!margins"].footer && n.push(oe("Footer", null, { "x:Margin": e["!margins"].footer })), n.push(oe("PageMargins", null, {
    "x:Bottom": e["!margins"].bottom || "0.75",
    "x:Left": e["!margins"].left || "0.7",
    "x:Right": e["!margins"].right || "0.7",
    "x:Top": e["!margins"].top || "0.75"
  })), n.push("</PageSetup>")), a && a.Workbook && a.Workbook.Sheets && a.Workbook.Sheets[r])
    if (a.Workbook.Sheets[r].Hidden) n.push(oe("Visible", a.Workbook.Sheets[r].Hidden == 1 ? "SheetHidden" : "SheetVeryHidden", {}));
    else {
      for (var i = 0; i < r && !(a.Workbook.Sheets[i] && !a.Workbook.Sheets[i].Hidden); ++i) ;
      i == r && n.push("<Selected/>");
    }
  return ((((a || {}).Workbook || {}).Views || [])[0] || {}).RTL && n.push("<DisplayRightToLeft/>"), e["!protect"] && (n.push(Ur("ProtectContents", "True")), e["!protect"].objects && n.push(Ur("ProtectObjects", "True")), e["!protect"].scenarios && n.push(Ur("ProtectScenarios", "True")), e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells ? n.push(Ur("EnableSelection", "NoSelection")) : e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells && n.push(Ur("EnableSelection", "UnlockedCells")), [
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
    e["!protect"][s[0]] && n.push("<" + s[1] + "/>");
  })), n.length == 0 ? "" : oe("WorksheetOptions", n.join(""), { xmlns: lt.x });
}
function _g(e) {
  return e.map(function(t) {
    var r = Wo(t.t || ""), a = oe("ss:Data", r, { xmlns: "http://www.w3.org/TR/REC-html40" });
    return oe("Comment", a, { "ss:Author": t.a });
  }).join("");
}
function wg(e, t, r, a, n, i, s) {
  if (!e || e.v == null && e.f == null) return "";
  var f = {};
  if (e.f && (f["ss:Formula"] = "=" + er(Yi(e.f, s))), e.F && e.F.slice(0, t.length) == t) {
    var c = hr(e.F.slice(t.length + 1));
    f["ss:ArrayRange"] = "RC:R" + (c.r == s.r ? "" : "[" + (c.r - s.r) + "]") + "C" + (c.c == s.c ? "" : "[" + (c.c - s.c) + "]");
  }
  if (e.l && e.l.Target && (f["ss:HRef"] = er(e.l.Target), e.l.Tooltip && (f["x:HRefScreenTip"] = er(e.l.Tooltip))), r["!merges"])
    for (var l = r["!merges"], o = 0; o != l.length; ++o)
      l[o].s.c != s.c || l[o].s.r != s.r || (l[o].e.c > l[o].s.c && (f["ss:MergeAcross"] = l[o].e.c - l[o].s.c), l[o].e.r > l[o].s.r && (f["ss:MergeDown"] = l[o].e.r - l[o].s.r));
  var u = "", x = "";
  switch (e.t) {
    case "z":
      if (!a.sheetStubs) return "";
      break;
    case "n":
      u = "Number", x = String(e.v);
      break;
    case "b":
      u = "Boolean", x = e.v ? "1" : "0";
      break;
    case "e":
      u = "Error", x = Qt[e.v];
      break;
    case "d":
      u = "DateTime", x = new Date(e.v).toISOString(), e.z == null && (e.z = e.z || Fe[14]);
      break;
    case "s":
      u = "String", x = Uo(e.v || "");
      break;
  }
  var d = la(a.cellXfs, e, a);
  f["ss:StyleID"] = "s" + (21 + d), f["ss:Index"] = s.c + 1;
  var v = e.v != null ? x : "", h = e.t == "z" ? "" : '<Data ss:Type="' + u + '">' + v + "</Data>";
  return (e.c || []).length > 0 && (h += _g(e.c)), oe("Cell", h, f);
}
function kg(e, t) {
  var r = '<Row ss:Index="' + (e + 1) + '"';
  return t && (t.hpt && !t.hpx && (t.hpx = tn(t.hpt)), t.hpx && (r += ' ss:AutoFitHeight="0" ss:Height="' + t.hpx + '"'), t.hidden && (r += ' ss:Hidden="1"')), r + ">";
}
function Eg(e, t, r, a) {
  if (!e["!ref"]) return "";
  var n = $e(e["!ref"]), i = e["!merges"] || [], s = 0, f = [];
  e["!cols"] && e["!cols"].forEach(function(g, T) {
    na(g);
    var A = !!g.width, k = I0(T, g), R = { "ss:Index": T + 1 };
    A && (R["ss:Width"] = Ln(k.width)), g.hidden && (R["ss:Hidden"] = "1"), f.push(oe("Column", null, R));
  });
  for (var c = Array.isArray(e), l = n.s.r; l <= n.e.r; ++l) {
    for (var o = [kg(l, (e["!rows"] || [])[l])], u = n.s.c; u <= n.e.c; ++u) {
      var x = !1;
      for (s = 0; s != i.length; ++s)
        if (!(i[s].s.c > u) && !(i[s].s.r > l) && !(i[s].e.c < u) && !(i[s].e.r < l)) {
          (i[s].s.c != u || i[s].s.r != l) && (x = !0);
          break;
        }
      if (!x) {
        var d = { r: l, c: u }, v = Ce(d), h = c ? (e[l] || [])[u] : e[v];
        o.push(wg(h, v, e, t, r, a, d));
      }
    }
    o.push("</Row>"), o.length > 2 && f.push(o.join(""));
  }
  return f.join("");
}
function Tg(e, t, r) {
  var a = [], n = r.SheetNames[e], i = r.Sheets[n], s = i ? mg(i, t, e, r) : "";
  return s.length > 0 && a.push("<Names>" + s + "</Names>"), s = i ? Eg(i, t, e, r) : "", s.length > 0 && a.push("<Table>" + s + "</Table>"), a.push(gg(i, t, e, r)), a.join("");
}
function yg(e, t) {
  t || (t = {}), e.SSF || (e.SSF = ir(Fe)), e.SSF && (nn(), y0(e.SSF), t.revssf = F0(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF, t.cellXfs = [], la(t.cellXfs, {}, { revssf: { General: 0 } }));
  var r = [];
  r.push(xg(e, t)), r.push(dg()), r.push(""), r.push("");
  for (var a = 0; a < e.SheetNames.length; ++a)
    r.push(oe("Worksheet", Tg(a, t, e), { "ss:Name": er(e.SheetNames[a]) }));
  return r[2] = pg(e, t), r[3] = vg(e), kr + oe("Workbook", r.join(""), {
    xmlns: lt.ss,
    "xmlns:o": lt.o,
    "xmlns:x": lt.x,
    "xmlns:ss": lt.ss,
    "xmlns:dt": lt.dt,
    "xmlns:html": lt.html
  });
}
function Sg(e) {
  var t = {}, r = e.content;
  if (r.l = 28, t.AnsiUserType = r.read_shift(0, "lpstr-ansi"), t.AnsiClipboardFormat = vu(r), r.length - r.l <= 4) return t;
  var a = r.read_shift(4);
  if (a == 0 || a > 40 || (r.l -= 4, t.Reserved1 = r.read_shift(0, "lpstr-ansi"), r.length - r.l <= 4) || (a = r.read_shift(4), a !== 1907505652) || (t.UnicodeClipboardFormat = mu(r), a = r.read_shift(4), a == 0 || a > 40)) return t;
  r.l -= 4, t.Reserved2 = r.read_shift(0, "lpwstr");
}
var Fg = [60, 1084, 2066, 2165, 2175];
function Ag(e, t, r, a, n) {
  var i = a, s = [], f = r.slice(r.l, r.l + i);
  if (n && n.enc && n.enc.insitu && f.length > 0) switch (e) {
    case 9:
    case 521:
    case 1033:
    case 2057:
    case 47:
    case 405:
    case 225:
    case 406:
    case 312:
    case 404:
    case 10:
      break;
    case 133:
      break;
    default:
      n.enc.insitu(f);
  }
  s.push(f), r.l += i;
  for (var c = $t(r, r.l), l = mi[c], o = 0; l != null && Fg.indexOf(c) > -1; )
    i = $t(r, r.l + 2), o = r.l + 4, c == 2066 ? o += 4 : (c == 2165 || c == 2175) && (o += 12), f = r.slice(o, r.l + 4 + i), s.push(f), r.l += 4 + i, l = mi[c = $t(r, r.l)];
  var u = Dr(s);
  Mr(u, 0);
  var x = 0;
  u.lens = [];
  for (var d = 0; d < s.length; ++d)
    u.lens.push(x), x += s[d].length;
  if (u.length < a) throw "XLS Record 0x" + e.toString(16) + " Truncated: " + u.length + " < " + a;
  return t.f(u, u.length, n);
}
function Ut(e, t, r) {
  if (e.t !== "z" && e.XF) {
    var a = 0;
    try {
      a = e.z || e.XF.numFmtId || 0, t.cellNF && (e.z = Fe[a]);
    } catch (i) {
      if (t.WTF) throw i;
    }
    if (!t || t.cellText !== !1) try {
      e.t === "e" ? e.w = e.w || Qt[e.v] : a === 0 || a == "General" ? e.t === "n" ? (e.v | 0) === e.v ? e.w = e.v.toString(10) : e.w = bn(e.v) : e.w = Ta(e.v) : e.w = Ft(a, e.v, { date1904: !!r, dateNF: t && t.dateNF });
    } catch (i) {
      if (t.WTF) throw i;
    }
    if (t.cellDates && a && e.t == "n" && an(Fe[a] || String(a))) {
      var n = ga(e.v);
      n && (e.t = "d", e.v = new Date(n.y, n.m - 1, n.d, n.H, n.M, n.S, n.u));
    }
  }
}
function c0(e, t, r) {
  return { v: e, ixfe: t, t: r };
}
function Cg(e, t) {
  var r = { opts: {} }, a = {}, n = t.dense ? [] : {}, i = {}, s = {}, f = null, c = [], l = "", o = {}, u, x = "", d, v, h, g, T = {}, A = [], k, R, V = [], N = [], S = { Sheets: [], WBProps: { date1904: !1 }, Views: [{}] }, z = {}, L = function(Pe) {
    return Pe < 8 ? _a[Pe] : Pe < 64 && N[Pe - 8] || _a[Pe];
  }, J = function(Pe, lr, tt) {
    var fr = lr.XF.data;
    if (!(!fr || !fr.patternType || !tt || !tt.cellStyles)) {
      lr.s = {}, lr.s.patternType = fr.patternType;
      var pt;
      (pt = Rn(L(fr.icvFore))) && (lr.s.fgColor = { rgb: pt }), (pt = Rn(L(fr.icvBack))) && (lr.s.bgColor = { rgb: pt });
    }
  }, j = function(Pe, lr, tt) {
    if (!(we > 1) && !(tt.sheetRows && Pe.r >= tt.sheetRows)) {
      if (tt.cellStyles && lr.XF && lr.XF.data && J(Pe, lr, tt), delete lr.ixfe, delete lr.XF, u = Pe, x = Ce(Pe), (!s || !s.s || !s.e) && (s = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }), Pe.r < s.s.r && (s.s.r = Pe.r), Pe.c < s.s.c && (s.s.c = Pe.c), Pe.r + 1 > s.e.r && (s.e.r = Pe.r + 1), Pe.c + 1 > s.e.c && (s.e.c = Pe.c + 1), tt.cellFormula && lr.f) {
        for (var fr = 0; fr < A.length; ++fr)
          if (!(A[fr][0].s.c > Pe.c || A[fr][0].s.r > Pe.r) && !(A[fr][0].e.c < Pe.c || A[fr][0].e.r < Pe.r)) {
            lr.F = Ne(A[fr][0]), (A[fr][0].s.c != Pe.c || A[fr][0].s.r != Pe.r) && delete lr.f, lr.f && (lr.f = "" + Gr(A[fr][1], s, Pe, K, H));
            break;
          }
      }
      tt.dense ? (n[Pe.r] || (n[Pe.r] = []), n[Pe.r][Pe.c] = lr) : n[x] = lr;
    }
  }, H = {
    enc: !1,
    // encrypted
    sbcch: 0,
    // cch in the preceding SupBook
    snames: [],
    // sheetnames
    sharedf: T,
    // shared formulae by address
    arrayf: A,
    // array formulae array
    rrtabid: [],
    // RRTabId
    lastuser: "",
    // Last User from WriteAccess
    biff: 8,
    // BIFF version
    codepage: 0,
    // CP from CodePage record
    winlocked: 0,
    // fLockWn from WinProtect
    cellStyles: !!t && !!t.cellStyles,
    WTF: !!t && !!t.wtf
  };
  t.password && (H.password = t.password);
  var re, me = [], xe = [], ve = [], de = [], Xe = !1, K = [];
  K.SheetNames = H.snames, K.sharedf = H.sharedf, K.arrayf = H.arrayf, K.names = [], K.XTI = [];
  var pe = 0, we = 0, C = 0, M = [], O = [], P;
  H.codepage = 1200, Nt(1200);
  for (var Q = !1; e.l < e.length - 1; ) {
    var fe = e.l, ce = e.read_shift(2);
    if (ce === 0 && pe === 10) break;
    var ie = e.l === e.length ? 0 : e.read_shift(2), ne = mi[ce];
    if (ne && ne.f) {
      if (t.bookSheets && pe === 133 && ce !== 133)
        break;
      if (pe = ce, ne.r === 2 || ne.r == 12) {
        var Ie = e.read_shift(2);
        if (ie -= 2, !H.enc && Ie !== ce && ((Ie & 255) << 8 | Ie >> 8) !== ce) throw new Error("rt mismatch: " + Ie + "!=" + ce);
        ne.r == 12 && (e.l += 10, ie -= 10);
      }
      var F = {};
      if (ce === 10 ? F = /*::(*/
      ne.f(e, ie, H) : F = /*::(*/
      Ag(ce, ne, e, ie, H), we == 0 && [9, 521, 1033, 2057].indexOf(pe) === -1) continue;
      switch (ce) {
        case 34:
          r.opts.Date1904 = S.WBProps.date1904 = F;
          break;
        case 134:
          r.opts.WriteProtect = !0;
          break;
        case 47:
          if (H.enc || (e.l = 0), H.enc = F, !t.password) throw new Error("File is password-protected");
          if (F.valid == null) throw new Error("Encryption scheme unsupported");
          if (!F.valid) throw new Error("Password is incorrect");
          break;
        case 92:
          H.lastuser = F;
          break;
        case 66:
          var rr = Number(F);
          switch (rr) {
            case 21010:
              rr = 1200;
              break;
            case 32768:
              rr = 1e4;
              break;
            case 32769:
              rr = 1252;
              break;
          }
          Nt(H.codepage = rr), Q = !0;
          break;
        case 317:
          H.rrtabid = F;
          break;
        case 25:
          H.winlocked = F;
          break;
        case 439:
          r.opts.RefreshAll = F;
          break;
        case 12:
          r.opts.CalcCount = F;
          break;
        case 16:
          r.opts.CalcDelta = F;
          break;
        case 17:
          r.opts.CalcIter = F;
          break;
        case 13:
          r.opts.CalcMode = F;
          break;
        case 14:
          r.opts.CalcPrecision = F;
          break;
        case 95:
          r.opts.CalcSaveRecalc = F;
          break;
        case 15:
          H.CalcRefMode = F;
          break;
        case 2211:
          r.opts.FullCalc = F;
          break;
        case 129:
          F.fDialog && (n["!type"] = "dialog"), F.fBelow || ((n["!outline"] || (n["!outline"] = {})).above = !0), F.fRight || ((n["!outline"] || (n["!outline"] = {})).left = !0);
          break;
        case 224:
          V.push(F);
          break;
        case 430:
          K.push([F]), K[K.length - 1].XTI = [];
          break;
        case 35:
        case 547:
          K[K.length - 1].push(F);
          break;
        case 24:
        case 536:
          P = {
            Name: F.Name,
            Ref: Gr(F.rgce, s, null, K, H)
          }, F.itab > 0 && (P.Sheet = F.itab - 1), K.names.push(P), K[0] || (K[0] = [], K[0].XTI = []), K[K.length - 1].push(F), F.Name == "_xlnm._FilterDatabase" && F.itab > 0 && F.rgce && F.rgce[0] && F.rgce[0][0] && F.rgce[0][0][0] == "PtgArea3d" && (O[F.itab - 1] = { ref: Ne(F.rgce[0][0][1][2]) });
          break;
        case 22:
          H.ExternCount = F;
          break;
        case 23:
          K.length == 0 && (K[0] = [], K[0].XTI = []), K[K.length - 1].XTI = K[K.length - 1].XTI.concat(F), K.XTI = K.XTI.concat(F);
          break;
        case 2196:
          if (H.biff < 8) break;
          P != null && (P.Comment = F[1]);
          break;
        case 18:
          n["!protect"] = F;
          break;
        case 19:
          F !== 0 && H.WTF && console.error("Password verifier: " + F);
          break;
        case 133:
          i[F.pos] = F, H.snames.push(F.name);
          break;
        case 10:
          {
            if (--we) break;
            if (s.e) {
              if (s.e.r > 0 && s.e.c > 0) {
                if (s.e.r--, s.e.c--, n["!ref"] = Ne(s), t.sheetRows && t.sheetRows <= s.e.r) {
                  var He = s.e.r;
                  s.e.r = t.sheetRows - 1, n["!fullref"] = n["!ref"], n["!ref"] = Ne(s), s.e.r = He;
                }
                s.e.r++, s.e.c++;
              }
              me.length > 0 && (n["!merges"] = me), xe.length > 0 && (n["!objects"] = xe), ve.length > 0 && (n["!cols"] = ve), de.length > 0 && (n["!rows"] = de), S.Sheets.push(z);
            }
            l === "" ? o = n : a[l] = n, n = t.dense ? [] : {};
          }
          break;
        case 9:
        case 521:
        case 1033:
        case 2057:
          {
            if (H.biff === 8 && (H.biff = {
              /*::[*/
              9: 2,
              /*::[*/
              521: 3,
              /*::[*/
              1033: 4
            }[ce] || {
              /*::[*/
              512: 2,
              /*::[*/
              768: 3,
              /*::[*/
              1024: 4,
              /*::[*/
              1280: 5,
              /*::[*/
              1536: 8,
              /*::[*/
              2: 2,
              /*::[*/
              7: 2
            }[F.BIFFVer] || 8), H.biffguess = F.BIFFVer == 0, F.BIFFVer == 0 && F.dt == 4096 && (H.biff = 5, Q = !0, Nt(H.codepage = 28591)), H.biff == 8 && F.BIFFVer == 0 && F.dt == 16 && (H.biff = 2), we++) break;
            if (n = t.dense ? [] : {}, H.biff < 8 && !Q && (Q = !0, Nt(H.codepage = t.codepage || 1252)), H.biff < 5 || F.BIFFVer == 0 && F.dt == 4096) {
              l === "" && (l = "Sheet1"), s = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } };
              var Je = { pos: e.l - ie, name: l };
              i[Je.pos] = Je, H.snames.push(l);
            } else l = (i[fe] || { name: "" }).name;
            F.dt == 32 && (n["!type"] = "chart"), F.dt == 64 && (n["!type"] = "macro"), me = [], xe = [], H.arrayf = A = [], ve = [], de = [], Xe = !1, z = { Hidden: (i[fe] || { hs: 0 }).hs, name: l };
          }
          break;
        case 515:
        case 3:
        case 2:
          n["!type"] == "chart" && (t.dense ? (n[F.r] || [])[F.c] : n[Ce({ c: F.c, r: F.r })]) && ++F.c, k = { ixfe: F.ixfe, XF: V[F.ixfe] || {}, v: F.val, t: "n" }, C > 0 && (k.z = M[k.ixfe >> 8 & 63]), Ut(k, t, r.opts.Date1904), j({ c: F.c, r: F.r }, k, t);
          break;
        case 5:
        case 517:
          k = { ixfe: F.ixfe, XF: V[F.ixfe], v: F.val, t: F.t }, C > 0 && (k.z = M[k.ixfe >> 8 & 63]), Ut(k, t, r.opts.Date1904), j({ c: F.c, r: F.r }, k, t);
          break;
        case 638:
          k = { ixfe: F.ixfe, XF: V[F.ixfe], v: F.rknum, t: "n" }, C > 0 && (k.z = M[k.ixfe >> 8 & 63]), Ut(k, t, r.opts.Date1904), j({ c: F.c, r: F.r }, k, t);
          break;
        case 189:
          for (var Re = F.c; Re <= F.C; ++Re) {
            var le = F.rkrec[Re - F.c][0];
            k = { ixfe: le, XF: V[le], v: F.rkrec[Re - F.c][1], t: "n" }, C > 0 && (k.z = M[k.ixfe >> 8 & 63]), Ut(k, t, r.opts.Date1904), j({ c: Re, r: F.r }, k, t);
          }
          break;
        case 6:
        case 518:
        case 1030:
          {
            if (F.val == "String") {
              f = F;
              break;
            }
            if (k = c0(F.val, F.cell.ixfe, F.tt), k.XF = V[k.ixfe], t.cellFormula) {
              var sr = F.formula;
              if (sr && sr[0] && sr[0][0] && sr[0][0][0] == "PtgExp") {
                var Wr = sr[0][0][1][0], Or = sr[0][0][1][1], Ct = Ce({ r: Wr, c: Or });
                T[Ct] ? k.f = "" + Gr(F.formula, s, F.cell, K, H) : k.F = ((t.dense ? (n[Wr] || [])[Or] : n[Ct]) || {}).F;
              } else k.f = "" + Gr(F.formula, s, F.cell, K, H);
            }
            C > 0 && (k.z = M[k.ixfe >> 8 & 63]), Ut(k, t, r.opts.Date1904), j(F.cell, k, t), f = F;
          }
          break;
        case 7:
        case 519:
          if (f)
            f.val = F, k = c0(F, f.cell.ixfe, "s"), k.XF = V[k.ixfe], t.cellFormula && (k.f = "" + Gr(f.formula, s, f.cell, K, H)), C > 0 && (k.z = M[k.ixfe >> 8 & 63]), Ut(k, t, r.opts.Date1904), j(f.cell, k, t), f = null;
          else throw new Error("String record expects Formula");
          break;
        case 33:
        case 545:
          {
            A.push(F);
            var oa = Ce(F[0].s);
            if (d = t.dense ? (n[F[0].s.r] || [])[F[0].s.c] : n[oa], t.cellFormula && d) {
              if (!f || !oa || !d) break;
              d.f = "" + Gr(F[1], s, F[0], K, H), d.F = Ne(F[0]);
            }
          }
          break;
        case 1212:
          {
            if (!t.cellFormula) break;
            if (x) {
              if (!f) break;
              T[Ce(f.cell)] = F[0], d = t.dense ? (n[f.cell.r] || [])[f.cell.c] : n[Ce(f.cell)], (d || {}).f = "" + Gr(F[0], s, u, K, H);
            }
          }
          break;
        case 253:
          k = c0(c[F.isst].t, F.ixfe, "s"), c[F.isst].h && (k.h = c[F.isst].h), k.XF = V[k.ixfe], C > 0 && (k.z = M[k.ixfe >> 8 & 63]), Ut(k, t, r.opts.Date1904), j({ c: F.c, r: F.r }, k, t);
          break;
        case 513:
          t.sheetStubs && (k = { ixfe: F.ixfe, XF: V[F.ixfe], t: "z" }, C > 0 && (k.z = M[k.ixfe >> 8 & 63]), Ut(k, t, r.opts.Date1904), j({ c: F.c, r: F.r }, k, t));
          break;
        case 190:
          if (t.sheetStubs)
            for (var Bt = F.c; Bt <= F.C; ++Bt) {
              var Nr = F.ixfe[Bt - F.c];
              k = { ixfe: Nr, XF: V[Nr], t: "z" }, C > 0 && (k.z = M[k.ixfe >> 8 & 63]), Ut(k, t, r.opts.Date1904), j({ c: Bt, r: F.r }, k, t);
            }
          break;
        case 214:
        case 516:
        case 4:
          k = c0(F.val, F.ixfe, "s"), k.XF = V[k.ixfe], C > 0 && (k.z = M[k.ixfe >> 8 & 63]), Ut(k, t, r.opts.Date1904), j({ c: F.c, r: F.r }, k, t);
          break;
        case 0:
        case 512:
          we === 1 && (s = F);
          break;
        case 252:
          c = F;
          break;
        case 1054:
          if (H.biff == 4) {
            M[C++] = F[1];
            for (var ft = 0; ft < C + 163 && Fe[ft] != F[1]; ++ft) ;
            ft >= 163 && Kt(F[1], C + 163);
          } else Kt(F[1], F[0]);
          break;
        case 30:
          {
            M[C++] = F;
            for (var xr = 0; xr < C + 163 && Fe[xr] != F; ++xr) ;
            xr >= 163 && Kt(F, C + 163);
          }
          break;
        case 229:
          me = me.concat(F);
          break;
        case 93:
          xe[F.cmo[0]] = H.lastobj = F;
          break;
        case 438:
          H.lastobj.TxO = F;
          break;
        case 127:
          H.lastobj.ImData = F;
          break;
        case 440:
          for (g = F[0].s.r; g <= F[0].e.r; ++g)
            for (h = F[0].s.c; h <= F[0].e.c; ++h)
              d = t.dense ? (n[g] || [])[h] : n[Ce({ c: h, r: g })], d && (d.l = F[1]);
          break;
        case 2048:
          for (g = F[0].s.r; g <= F[0].e.r; ++g)
            for (h = F[0].s.c; h <= F[0].e.c; ++h)
              d = t.dense ? (n[g] || [])[h] : n[Ce({ c: h, r: g })], d && d.l && (d.l.Tooltip = F[1]);
          break;
        case 28:
          {
            if (H.biff <= 5 && H.biff >= 2) break;
            d = t.dense ? (n[F[0].r] || [])[F[0].c] : n[Ce(F[0])];
            var ua = xe[F[2]];
            d || (t.dense ? (n[F[0].r] || (n[F[0].r] = []), d = n[F[0].r][F[0].c] = { t: "z" }) : d = n[Ce(F[0])] = { t: "z" }, s.e.r = Math.max(s.e.r, F[0].r), s.s.r = Math.min(s.s.r, F[0].r), s.e.c = Math.max(s.e.c, F[0].c), s.s.c = Math.min(s.s.c, F[0].c)), d.c || (d.c = []), v = { a: F[1], t: ua.TxO.t }, d.c.push(v);
          }
          break;
        case 2173:
          pd(V[F.ixfe], F.ext);
          break;
        case 125:
          {
            if (!H.cellStyles) break;
            for (; F.e >= F.s; )
              ve[F.e--] = { width: F.w / 256, level: F.level || 0, hidden: !!(F.flags & 1) }, Xe || (Xe = !0, $i(F.w / 256)), na(ve[F.e + 1]);
          }
          break;
        case 520:
          {
            var Rr = {};
            F.level != null && (de[F.r] = Rr, Rr.level = F.level), F.hidden && (de[F.r] = Rr, Rr.hidden = !0), F.hpt && (de[F.r] = Rr, Rr.hpt = F.hpt, Rr.hpx = tn(F.hpt));
          }
          break;
        case 38:
        case 39:
        case 40:
        case 41:
          n["!margins"] || Ea(n["!margins"] = {}), n["!margins"][{ 38: "left", 39: "right", 40: "top", 41: "bottom" }[ce]] = F;
          break;
        case 161:
          n["!margins"] || Ea(n["!margins"] = {}), n["!margins"].header = F.header, n["!margins"].footer = F.footer;
          break;
        case 574:
          F.RTL && (S.Views[0].RTL = !0);
          break;
        case 146:
          N = F;
          break;
        case 2198:
          re = F;
          break;
        case 140:
          R = F;
          break;
        case 442:
          l ? z.CodeName = F || z.name : S.WBProps.CodeName = F || "ThisWorkbook";
          break;
      }
    } else
      ne || console.error("Missing Info for XLS Record 0x" + ce.toString(16)), e.l += ie;
  }
  return r.SheetNames = gr(i).sort(function(dt, Pe) {
    return Number(dt) - Number(Pe);
  }).map(function(dt) {
    return i[dt].name;
  }), t.bookSheets || (r.Sheets = a), !r.SheetNames.length && o["!ref"] ? (r.SheetNames.push("Sheet1"), r.Sheets && (r.Sheets.Sheet1 = o)) : r.Preamble = o, r.Sheets && O.forEach(function(dt, Pe) {
    r.Sheets[r.SheetNames[Pe]]["!autofilter"] = dt;
  }), r.Strings = c, r.SSF = ir(Fe), H.enc && (r.Encryption = H.enc), re && (r.Themes = re), r.Metadata = {}, R !== void 0 && (r.Metadata.Country = R), K.names.length > 0 && (S.Names = K.names), r.Workbook = S, r;
}
var Fn = {
  SI: "e0859ff2f94f6810ab9108002b27b3d9",
  DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
  UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
};
function bg(e, t, r) {
  var a = ye.find(e, "/!DocumentSummaryInformation");
  if (a && a.size > 0) try {
    var n = Zs(a, oi, Fn.DSI);
    for (var i in n) t[i] = n[i];
  } catch (l) {
    if (r.WTF) throw l;
  }
  var s = ye.find(e, "/!SummaryInformation");
  if (s && s.size > 0) try {
    var f = Zs(s, ui, Fn.SI);
    for (var c in f) t[c] == null && (t[c] = f[c]);
  } catch (l) {
    if (r.WTF) throw l;
  }
  t.HeadingPairs && t.TitlesOfParts && (Ec(t.HeadingPairs, t.TitlesOfParts, t, r), delete t.HeadingPairs, delete t.TitlesOfParts);
}
function Dg(e, t) {
  var r = [], a = [], n = [], i = 0, s, f = Cs(oi, "n"), c = Cs(ui, "n");
  if (e.Props)
    for (s = gr(e.Props), i = 0; i < s.length; ++i) (Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(c, s[i]) ? a : n).push([s[i], e.Props[s[i]]]);
  if (e.Custprops)
    for (s = gr(e.Custprops), i = 0; i < s.length; ++i) Object.prototype.hasOwnProperty.call(e.Props || {}, s[i]) || (Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(c, s[i]) ? a : n).push([s[i], e.Custprops[s[i]]]);
  var l = [];
  for (i = 0; i < n.length; ++i)
    bc.indexOf(n[i][0]) > -1 || kc.indexOf(n[i][0]) > -1 || n[i][1] != null && l.push(n[i]);
  a.length && ye.utils.cfb_add(t, "/SummaryInformation", Qs(a, Fn.SI, c, ui)), (r.length || l.length) && ye.utils.cfb_add(t, "/DocumentSummaryInformation", Qs(r, Fn.DSI, f, oi, l.length ? l : null, Fn.UDI));
}
function yl(e, t) {
  t || (t = {}), rs(t), Ei(), t.codepage && ki(t.codepage);
  var r, a;
  if (e.FullPaths) {
    if (ye.find(e, "/encryption")) throw new Error("File is password-protected");
    r = ye.find(e, "!CompObj"), a = ye.find(e, "/Workbook") || ye.find(e, "/Book");
  } else {
    switch (t.type) {
      case "base64":
        e = ut(xt(e));
        break;
      case "binary":
        e = ut(e);
        break;
      case "buffer":
        break;
      case "array":
        Array.isArray(e) || (e = Array.prototype.slice.call(e));
        break;
    }
    Mr(e, 0), a = { content: e };
  }
  var n, i;
  if (r && Sg(r), t.bookProps && !t.bookSheets) n = {};
  else {
    var s = We ? "buffer" : "array";
    if (a && a.content) n = Cg(a.content, t);
    else if ((i = ye.find(e, "PerfectOffice_MAIN")) && i.content) n = ka.to_workbook(i.content, (t.type = s, t));
    else if ((i = ye.find(e, "NativeContent_MAIN")) && i.content) n = ka.to_workbook(i.content, (t.type = s, t));
    else throw (i = ye.find(e, "MN0")) && i.content ? new Error("Unsupported Works 4 for Mac file") : new Error("Cannot find Workbook stream");
    t.bookVBA && e.FullPaths && ye.find(e, "/_VBA_PROJECT_CUR/VBA/dir") && (n.vbaraw = Xd(e));
  }
  var f = {};
  return e.FullPaths && bg(
    /*::((*/
    e,
    f,
    t
  ), n.Props = n.Custprops = f, t.bookFiles && (n.cfb = e), n;
}
function Ig(e, t) {
  var r = t || {}, a = ye.utils.cfb_new({ root: "R" }), n = "/Workbook";
  switch (r.bookType || "xls") {
    case "xls":
      r.bookType = "biff8";
    case "xla":
      r.bookType || (r.bookType = "xla");
    case "biff8":
      n = "/Workbook", r.biff = 8;
      break;
    case "biff5":
      n = "/Book", r.biff = 5;
      break;
    default:
      throw new Error("invalid type " + r.bookType + " for XLS CFB");
  }
  return ye.utils.cfb_add(a, n, Sl(e, r)), r.biff == 8 && (e.Props || e.Custprops) && Dg(e, a), r.biff == 8 && e.vbaraw && zd(a, ye.read(e.vbaraw, { type: typeof e.vbaraw == "string" ? "binary" : "buffer" })), a;
}
var Mn = {
  /*::[*/
  0: {
    /* n:"BrtRowHdr", */
    f: rm
  },
  /*::[*/
  1: {
    /* n:"BrtCellBlank", */
    f: lm
  },
  /*::[*/
  2: {
    /* n:"BrtCellRk", */
    f: Cm
  },
  /*::[*/
  3: {
    /* n:"BrtCellError", */
    f: mm
  },
  /*::[*/
  4: {
    /* n:"BrtCellBool", */
    f: xm
  },
  /*::[*/
  5: {
    /* n:"BrtCellReal", */
    f: Sm
  },
  /*::[*/
  6: {
    /* n:"BrtCellSt", */
    f: Nm
  },
  /*::[*/
  7: {
    /* n:"BrtCellIsst", */
    f: km
  },
  /*::[*/
  8: {
    /* n:"BrtFmlaString", */
    f: Wm
  },
  /*::[*/
  9: {
    /* n:"BrtFmlaNum", */
    f: Um
  },
  /*::[*/
  10: {
    /* n:"BrtFmlaBool", */
    f: Bm
  },
  /*::[*/
  11: {
    /* n:"BrtFmlaError", */
    f: Mm
  },
  /*::[*/
  12: {
    /* n:"BrtShortBlank", */
    f: um
  },
  /*::[*/
  13: {
    /* n:"BrtShortRk", */
    f: Dm
  },
  /*::[*/
  14: {
    /* n:"BrtShortError", */
    f: _m
  },
  /*::[*/
  15: {
    /* n:"BrtShortBool", */
    f: pm
  },
  /*::[*/
  16: {
    /* n:"BrtShortReal", */
    f: vl
  },
  /*::[*/
  17: {
    /* n:"BrtShortSt", */
    f: Lm
  },
  /*::[*/
  18: {
    /* n:"BrtShortIsst", */
    f: Tm
  },
  /*::[*/
  19: {
    /* n:"BrtSSTItem", */
    f: Pi
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
    f: L2
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
    f: Nx
  },
  /*::[*/
  44: {
    /* n:"BrtFmt", */
    f: Ix
  },
  /*::[*/
  45: {
    /* n:"BrtFill", */
    f: Px
  },
  /*::[*/
  46: {
    /* n:"BrtBorder", */
    f: Mx
  },
  /*::[*/
  47: {
    /* n:"BrtXF", */
    f: Bx
  },
  /*::[*/
  48: {
    /* n:"BrtStyle" */
  },
  /*::[*/
  49: {
    /* n:"BrtCellMeta", */
    f: nu
  },
  /*::[*/
  50: {
    /* n:"BrtValueMeta" */
  },
  /*::[*/
  51: {
    /* n:"BrtMdb" */
    f: gd
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
    f: Wc
  },
  /*::[*/
  62: {
    /* n:"BrtCellRString", */
    f: Om
  },
  /*::[*/
  63: {
    /* n:"BrtCalcChainItem$", */
    f: Ad
  },
  /*::[*/
  64: {
    /* n:"BrtDVal", */
    f: t2
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
    f: Yr,
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
    f: Zm
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
    f: fm
  },
  /*::[*/
  148: {
    /* n:"BrtWsDim", */
    f: nm,
    p: 16
  },
  /*::[*/
  151: {
    /* n:"BrtPane", */
    f: $m
  },
  /*::[*/
  152: {
    /* n:"BrtSel" */
  },
  /*::[*/
  153: {
    /* n:"BrtWbProp", */
    f: O2
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
    f: D2
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
    f: K1
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
    f: Na
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
    f: Vm
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
    f: vd
  },
  /*::[*/
  336: {
    /* n:"BrtEndEsmdtinfo", */
    T: -1
  },
  /*::[*/
  337: {
    /* n:"BrtBeginEsmdb", */
    f: kd,
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
    f: li
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
    f: Uc
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
    f: jm
  },
  /*::[*/
  427: {
    /* n:"BrtShrFmla", */
    f: Km
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
    f: Jm
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
    f: sm
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
    f: zm
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
    f: li
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
    f: Md
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
    f: Pd
  },
  /*::[*/
  636: {
    /* n:"BrtEndComment", */
    T: -1
  },
  /*::[*/
  637: {
    /* n:"BrtCommentText", */
    f: cu
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
    f: _2
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
    f: a2
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
}, mi = {
  /* [MS-XLS] 2.3 Record Enumeration 2021-08-17 */
  /*::[*/
  6: {
    /* n:"Formula", */
    f: ri
  },
  /*::[*/
  10: {
    /* n:"EOF", */
    f: ea
  },
  /*::[*/
  12: {
    /* n:"CalcCount", */
    f: yr
  },
  //
  /*::[*/
  13: {
    /* n:"CalcMode", */
    f: yr
  },
  //
  /*::[*/
  14: {
    /* n:"CalcPrecision", */
    f: _r
  },
  //
  /*::[*/
  15: {
    /* n:"CalcRefMode", */
    f: _r
  },
  //
  /*::[*/
  16: {
    /* n:"CalcDelta", */
    f: jr
  },
  //
  /*::[*/
  17: {
    /* n:"CalcIter", */
    f: _r
  },
  //
  /*::[*/
  18: {
    /* n:"Protect", */
    f: _r
  },
  /*::[*/
  19: {
    /* n:"Password", */
    f: yr
  },
  /*::[*/
  20: {
    /* n:"Header", */
    f: sf
  },
  /*::[*/
  21: {
    /* n:"Footer", */
    f: sf
  },
  /*::[*/
  23: {
    /* n:"ExternSheet", */
    f: Uc
  },
  /*::[*/
  24: {
    /* n:"Lbl", */
    f: cf
  },
  /*::[*/
  25: {
    /* n:"WinProtect", */
    f: _r
  },
  /*::[*/
  26: {
    /* n:"VerticalPageBreaks", */
  },
  /*::[*/
  27: {
    /* n:"HorizontalPageBreaks", */
  },
  /*::[*/
  28: {
    /* n:"Note", */
    f: a1
  },
  /*::[*/
  29: {
    /* n:"Selection", */
  },
  /*::[*/
  34: {
    /* n:"Date1904", */
    f: _r
  },
  /*::[*/
  35: {
    /* n:"ExternName", */
    f: ff
  },
  /*::[*/
  38: {
    /* n:"LeftMargin", */
    f: jr
  },
  // *
  /*::[*/
  39: {
    /* n:"RightMargin", */
    f: jr
  },
  // *
  /*::[*/
  40: {
    /* n:"TopMargin", */
    f: jr
  },
  // *
  /*::[*/
  41: {
    /* n:"BottomMargin", */
    f: jr
  },
  // *
  /*::[*/
  42: {
    /* n:"PrintRowCol", */
    f: _r
  },
  /*::[*/
  43: {
    /* n:"PrintGrid", */
    f: _r
  },
  /*::[*/
  47: {
    /* n:"FilePass", */
    f: px
  },
  /*::[*/
  49: {
    /* n:"Font", */
    f: Dh
  },
  /*::[*/
  51: {
    /* n:"PrintSize", */
    f: yr
  },
  /*::[*/
  60: {
    /* n:"Continue", */
  },
  /*::[*/
  61: {
    /* n:"Window1", */
    f: Sh
  },
  /*::[*/
  64: {
    /* n:"Backup", */
    f: _r
  },
  /*::[*/
  65: {
    /* n:"Pane", */
    f: bh
  },
  /*::[*/
  66: {
    /* n:"CodePage", */
    f: yr
  },
  /*::[*/
  77: {
    /* n:"Pls", */
  },
  /*::[*/
  80: {
    /* n:"DCon", */
  },
  /*::[*/
  81: {
    /* n:"DConRef", */
  },
  /*::[*/
  82: {
    /* n:"DConName", */
  },
  /*::[*/
  85: {
    /* n:"DefColWidth", */
    f: yr
  },
  /*::[*/
  89: {
    /* n:"XCT", */
  },
  /*::[*/
  90: {
    /* n:"CRN", */
  },
  /*::[*/
  91: {
    /* n:"FileSharing", */
  },
  /*::[*/
  92: {
    /* n:"WriteAccess", */
    f: dh
  },
  /*::[*/
  93: {
    /* n:"Obj", */
    f: s1
  },
  /*::[*/
  94: {
    /* n:"Uncalced", */
  },
  /*::[*/
  95: {
    /* n:"CalcSaveRecalc", */
    f: _r
  },
  //
  /*::[*/
  96: {
    /* n:"Template", */
  },
  /*::[*/
  97: {
    /* n:"Intl", */
  },
  /*::[*/
  99: {
    /* n:"ObjProtect", */
    f: _r
  },
  /*::[*/
  125: {
    /* n:"ColInfo", */
    f: Wc
  },
  /*::[*/
  128: {
    /* n:"Guts", */
    f: Gh
  },
  /*::[*/
  129: {
    /* n:"WsBool", */
    f: vh
  },
  /*::[*/
  130: {
    /* n:"GridSet", */
    f: yr
  },
  /*::[*/
  131: {
    /* n:"HCenter", */
    f: _r
  },
  /*::[*/
  132: {
    /* n:"VCenter", */
    f: _r
  },
  /*::[*/
  133: {
    /* n:"BoundSheet8", */
    f: mh
  },
  /*::[*/
  134: {
    /* n:"WriteProtect", */
  },
  /*::[*/
  140: {
    /* n:"Country", */
    f: d1
  },
  /*::[*/
  141: {
    /* n:"HideObj", */
    f: yr
  },
  /*::[*/
  144: {
    /* n:"Sort", */
  },
  /*::[*/
  146: {
    /* n:"Palette", */
    f: m1
  },
  /*::[*/
  151: {
    /* n:"Sync", */
  },
  /*::[*/
  152: {
    /* n:"LPr", */
  },
  /*::[*/
  153: {
    /* n:"DxGCol", */
  },
  /*::[*/
  154: {
    /* n:"FnGroupName", */
  },
  /*::[*/
  155: {
    /* n:"FilterMode", */
  },
  /*::[*/
  156: {
    /* n:"BuiltInFnGroupCount", */
    f: yr
  },
  /*::[*/
  157: {
    /* n:"AutoFilterInfo", */
  },
  /*::[*/
  158: {
    /* n:"AutoFilter", */
  },
  /*::[*/
  160: {
    /* n:"Scl", */
    f: y1
  },
  /*::[*/
  161: {
    /* n:"Setup", */
    f: w1
  },
  /*::[*/
  174: {
    /* n:"ScenMan", */
  },
  /*::[*/
  175: {
    /* n:"SCENARIO", */
  },
  /*::[*/
  176: {
    /* n:"SxView", */
  },
  /*::[*/
  177: {
    /* n:"Sxvd", */
  },
  /*::[*/
  178: {
    /* n:"SXVI", */
  },
  /*::[*/
  180: {
    /* n:"SxIvd", */
  },
  /*::[*/
  181: {
    /* n:"SXLI", */
  },
  /*::[*/
  182: {
    /* n:"SXPI", */
  },
  /*::[*/
  184: {
    /* n:"DocRoute", */
  },
  /*::[*/
  185: {
    /* n:"RecipName", */
  },
  /*::[*/
  189: {
    /* n:"MulRk", */
    f: Vh
  },
  /*::[*/
  190: {
    /* n:"MulBlank", */
    f: Hh
  },
  /*::[*/
  193: {
    /* n:"Mms", */
    f: ea
  },
  /*::[*/
  197: {
    /* n:"SXDI", */
  },
  /*::[*/
  198: {
    /* n:"SXDB", */
  },
  /*::[*/
  199: {
    /* n:"SXFDB", */
  },
  /*::[*/
  200: {
    /* n:"SXDBB", */
  },
  /*::[*/
  201: {
    /* n:"SXNum", */
  },
  /*::[*/
  202: {
    /* n:"SxBool", */
    f: _r
  },
  /*::[*/
  203: {
    /* n:"SxErr", */
  },
  /*::[*/
  204: {
    /* n:"SXInt", */
  },
  /*::[*/
  205: {
    /* n:"SXString", */
  },
  /*::[*/
  206: {
    /* n:"SXDtr", */
  },
  /*::[*/
  207: {
    /* n:"SxNil", */
  },
  /*::[*/
  208: {
    /* n:"SXTbl", */
  },
  /*::[*/
  209: {
    /* n:"SXTBRGIITM", */
  },
  /*::[*/
  210: {
    /* n:"SxTbpg", */
  },
  /*::[*/
  211: {
    /* n:"ObProj", */
  },
  /*::[*/
  213: {
    /* n:"SXStreamID", */
  },
  /*::[*/
  215: {
    /* n:"DBCell", */
  },
  /*::[*/
  216: {
    /* n:"SXRng", */
  },
  /*::[*/
  217: {
    /* n:"SxIsxoper", */
  },
  /*::[*/
  218: {
    /* n:"BookBool", */
    f: yr
  },
  /*::[*/
  220: {
    /* n:"DbOrParamQry", */
  },
  /*::[*/
  221: {
    /* n:"ScenarioProtect", */
    f: _r
  },
  /*::[*/
  222: {
    /* n:"OleObjectSize", */
  },
  /*::[*/
  224: {
    /* n:"XF", */
    f: zh
  },
  /*::[*/
  225: {
    /* n:"InterfaceHdr", */
    f: xh
  },
  /*::[*/
  226: {
    /* n:"InterfaceEnd", */
    f: ea
  },
  /*::[*/
  227: {
    /* n:"SXVS", */
  },
  /*::[*/
  229: {
    /* n:"MergeCells", */
    f: n1
  },
  /*::[*/
  233: {
    /* n:"BkHim", */
  },
  /*::[*/
  235: {
    /* n:"MsoDrawingGroup", */
  },
  /*::[*/
  236: {
    /* n:"MsoDrawing", */
  },
  /*::[*/
  237: {
    /* n:"MsoDrawingSelection", */
  },
  /*::[*/
  239: {
    /* n:"PhoneticInfo", */
  },
  /*::[*/
  240: {
    /* n:"SxRule", */
  },
  /*::[*/
  241: {
    /* n:"SXEx", */
  },
  /*::[*/
  242: {
    /* n:"SxFilt", */
  },
  /*::[*/
  244: {
    /* n:"SxDXF", */
  },
  /*::[*/
  245: {
    /* n:"SxItm", */
  },
  /*::[*/
  246: {
    /* n:"SxName", */
  },
  /*::[*/
  247: {
    /* n:"SxSelect", */
  },
  /*::[*/
  248: {
    /* n:"SXPair", */
  },
  /*::[*/
  249: {
    /* n:"SxFmla", */
  },
  /*::[*/
  251: {
    /* n:"SxFormat", */
  },
  /*::[*/
  252: {
    /* n:"SST", */
    f: _h
  },
  /*::[*/
  253: {
    /* n:"LabelSst", */
    f: Oh
  },
  /*::[*/
  255: {
    /* n:"ExtSST", */
    f: kh
  },
  /*::[*/
  256: {
    /* n:"SXVDEx", */
  },
  /*::[*/
  259: {
    /* n:"SXFormula", */
  },
  /*::[*/
  290: {
    /* n:"SXDBEx", */
  },
  /*::[*/
  311: {
    /* n:"RRDInsDel", */
  },
  /*::[*/
  312: {
    /* n:"RRDHead", */
  },
  /*::[*/
  315: {
    /* n:"RRDChgCell", */
  },
  /*::[*/
  317: {
    /* n:"RRTabId", */
    f: Dc
  },
  /*::[*/
  318: {
    /* n:"RRDRenSheet", */
  },
  /*::[*/
  319: {
    /* n:"RRSort", */
  },
  /*::[*/
  320: {
    /* n:"RRDMove", */
  },
  /*::[*/
  330: {
    /* n:"RRFormat", */
  },
  /*::[*/
  331: {
    /* n:"RRAutoFmt", */
  },
  /*::[*/
  333: {
    /* n:"RRInsertSh", */
  },
  /*::[*/
  334: {
    /* n:"RRDMoveBegin", */
  },
  /*::[*/
  335: {
    /* n:"RRDMoveEnd", */
  },
  /*::[*/
  336: {
    /* n:"RRDInsDelBegin", */
  },
  /*::[*/
  337: {
    /* n:"RRDInsDelEnd", */
  },
  /*::[*/
  338: {
    /* n:"RRDConflict", */
  },
  /*::[*/
  339: {
    /* n:"RRDDefName", */
  },
  /*::[*/
  340: {
    /* n:"RRDRstEtxp", */
  },
  /*::[*/
  351: {
    /* n:"LRng", */
  },
  /*::[*/
  352: {
    /* n:"UsesELFs", */
    f: _r
  },
  /*::[*/
  353: {
    /* n:"DSF", */
    f: ea
  },
  /*::[*/
  401: {
    /* n:"CUsr", */
  },
  /*::[*/
  402: {
    /* n:"CbUsr", */
  },
  /*::[*/
  403: {
    /* n:"UsrInfo", */
  },
  /*::[*/
  404: {
    /* n:"UsrExcl", */
  },
  /*::[*/
  405: {
    /* n:"FileLock", */
  },
  /*::[*/
  406: {
    /* n:"RRDInfo", */
  },
  /*::[*/
  407: {
    /* n:"BCUsrs", */
  },
  /*::[*/
  408: {
    /* n:"UsrChk", */
  },
  /*::[*/
  425: {
    /* n:"UserBView", */
  },
  /*::[*/
  426: {
    /* n:"UserSViewBegin", */
  },
  /*::[*/
  427: {
    /* n:"UserSViewEnd", */
  },
  /*::[*/
  428: {
    /* n:"RRDUserView", */
  },
  /*::[*/
  429: {
    /* n:"Qsi", */
  },
  /*::[*/
  430: {
    /* n:"SupBook", */
    f: Jh
  },
  /*::[*/
  431: {
    /* n:"Prot4Rev", */
    f: _r
  },
  /*::[*/
  432: {
    /* n:"CondFmt", */
  },
  /*::[*/
  433: {
    /* n:"CF", */
  },
  /*::[*/
  434: {
    /* n:"DVal", */
  },
  /*::[*/
  437: {
    /* n:"DConBin", */
  },
  /*::[*/
  438: {
    /* n:"TxO", */
    f: l1
  },
  /*::[*/
  439: {
    /* n:"RefreshAll", */
    f: _r
  },
  //
  /*::[*/
  440: {
    /* n:"HLink", */
    f: o1
  },
  /*::[*/
  441: {
    /* n:"Lel", */
  },
  /*::[*/
  442: {
    /* n:"CodeName", */
    f: zn
  },
  /*::[*/
  443: {
    /* n:"SXFDBType", */
  },
  /*::[*/
  444: {
    /* n:"Prot4RevPass", */
    f: yr
  },
  /*::[*/
  445: {
    /* n:"ObNoMacros", */
  },
  /*::[*/
  446: {
    /* n:"Dv", */
  },
  /*::[*/
  448: {
    /* n:"Excel9File", */
    f: ea
  },
  /*::[*/
  449: {
    /* n:"RecalcId", */
    f: yh,
    r: 2
  },
  /*::[*/
  450: {
    /* n:"EntExU2", */
    f: ea
  },
  /*::[*/
  512: {
    /* n:"Dimensions", */
    f: tf
  },
  /*::[*/
  513: {
    /* n:"Blank", */
    f: T1
  },
  /*::[*/
  515: {
    /* n:"Number", */
    f: Kh
  },
  /*::[*/
  516: {
    /* n:"Label", */
    f: Rh
  },
  /*::[*/
  517: {
    /* n:"BoolErr", */
    f: nf
  },
  /*::[*/
  519: {
    /* n:"String", */
    f: S1
  },
  /*::[*/
  520: {
    /* n:"Row", */
    f: Eh
  },
  /*::[*/
  523: {
    /* n:"Index", */
  },
  /*::[*/
  545: {
    /* n:"Array", */
    f: lf
  },
  /*::[*/
  549: {
    /* n:"DefaultRowHeight", */
    f: rf
  },
  /*::[*/
  566: {
    /* n:"Table", */
  },
  /*::[*/
  574: {
    /* n:"Window2", */
    f: Ah
  },
  /*::[*/
  638: {
    /* n:"RK", */
    f: Wh
  },
  /*::[*/
  659: {
    /* n:"Style", */
  },
  /*::[*/
  1048: {
    /* n:"BigName", */
  },
  /*::[*/
  1054: {
    /* n:"Format", */
    f: Ph
  },
  /*::[*/
  1084: {
    /* n:"ContinueBigName", */
  },
  /*::[*/
  1212: {
    /* n:"ShrFmla", */
    f: e1
  },
  /*::[*/
  2048: {
    /* n:"HLinkTooltip", */
    f: h1
  },
  /*::[*/
  2049: {
    /* n:"WebPub", */
  },
  /*::[*/
  2050: {
    /* n:"QsiSXTag", */
  },
  /*::[*/
  2051: {
    /* n:"DBQueryExt", */
  },
  /*::[*/
  2052: {
    /* n:"ExtString", */
  },
  /*::[*/
  2053: {
    /* n:"TxtQry", */
  },
  /*::[*/
  2054: {
    /* n:"Qsir", */
  },
  /*::[*/
  2055: {
    /* n:"Qsif", */
  },
  /*::[*/
  2056: {
    /* n:"RRDTQSIF", */
  },
  /*::[*/
  2057: {
    /* n:"BOF", */
    f: i0
  },
  /*::[*/
  2058: {
    /* n:"OleDbConn", */
  },
  /*::[*/
  2059: {
    /* n:"WOpt", */
  },
  /*::[*/
  2060: {
    /* n:"SXViewEx", */
  },
  /*::[*/
  2061: {
    /* n:"SXTH", */
  },
  /*::[*/
  2062: {
    /* n:"SXPIEx", */
  },
  /*::[*/
  2063: {
    /* n:"SXVDTEx", */
  },
  /*::[*/
  2064: {
    /* n:"SXViewEx9", */
  },
  /*::[*/
  2066: {
    /* n:"ContinueFrt", */
  },
  /*::[*/
  2067: {
    /* n:"RealTimeData", */
  },
  /*::[*/
  2128: {
    /* n:"ChartFrtInfo", */
  },
  /*::[*/
  2129: {
    /* n:"FrtWrapper", */
  },
  /*::[*/
  2130: {
    /* n:"StartBlock", */
  },
  /*::[*/
  2131: {
    /* n:"EndBlock", */
  },
  /*::[*/
  2132: {
    /* n:"StartObject", */
  },
  /*::[*/
  2133: {
    /* n:"EndObject", */
  },
  /*::[*/
  2134: {
    /* n:"CatLab", */
  },
  /*::[*/
  2135: {
    /* n:"YMult", */
  },
  /*::[*/
  2136: {
    /* n:"SXViewLink", */
  },
  /*::[*/
  2137: {
    /* n:"PivotChartBits", */
  },
  /*::[*/
  2138: {
    /* n:"FrtFontList", */
  },
  /*::[*/
  2146: {
    /* n:"SheetExt", */
  },
  /*::[*/
  2147: {
    /* n:"BookExt", */
    r: 12
  },
  /*::[*/
  2148: {
    /* n:"SXAddl", */
  },
  /*::[*/
  2149: {
    /* n:"CrErr", */
  },
  /*::[*/
  2150: {
    /* n:"HFPicture", */
  },
  /*::[*/
  2151: {
    /* n:"FeatHdr", */
    f: ea
  },
  /*::[*/
  2152: {
    /* n:"Feat", */
  },
  /*::[*/
  2154: {
    /* n:"DataLabExt", */
  },
  /*::[*/
  2155: {
    /* n:"DataLabExtContents", */
  },
  /*::[*/
  2156: {
    /* n:"CellWatch", */
  },
  /*::[*/
  2161: {
    /* n:"FeatHdr11", */
  },
  /*::[*/
  2162: {
    /* n:"Feature11", */
  },
  /*::[*/
  2164: {
    /* n:"DropDownObjIds", */
  },
  /*::[*/
  2165: {
    /* n:"ContinueFrt11", */
  },
  /*::[*/
  2166: {
    /* n:"DConn", */
  },
  /*::[*/
  2167: {
    /* n:"List12", */
  },
  /*::[*/
  2168: {
    /* n:"Feature12", */
  },
  /*::[*/
  2169: {
    /* n:"CondFmt12", */
  },
  /*::[*/
  2170: {
    /* n:"CF12", */
  },
  /*::[*/
  2171: {
    /* n:"CFEx", */
  },
  /*::[*/
  2172: {
    /* n:"XFCRC", */
    f: g1,
    r: 12
  },
  /*::[*/
  2173: {
    /* n:"XFExt", */
    f: dd,
    r: 12
  },
  /*::[*/
  2174: {
    /* n:"AutoFilter12", */
  },
  /*::[*/
  2175: {
    /* n:"ContinueFrt12", */
  },
  /*::[*/
  2180: {
    /* n:"MDTInfo", */
  },
  /*::[*/
  2181: {
    /* n:"MDXStr", */
  },
  /*::[*/
  2182: {
    /* n:"MDXTuple", */
  },
  /*::[*/
  2183: {
    /* n:"MDXSet", */
  },
  /*::[*/
  2184: {
    /* n:"MDXProp", */
  },
  /*::[*/
  2185: {
    /* n:"MDXKPI", */
  },
  /*::[*/
  2186: {
    /* n:"MDB", */
  },
  /*::[*/
  2187: {
    /* n:"PLV", */
  },
  /*::[*/
  2188: {
    /* n:"Compat12", */
    f: _r,
    r: 12
  },
  /*::[*/
  2189: {
    /* n:"DXF", */
  },
  /*::[*/
  2190: {
    /* n:"TableStyles", */
    r: 12
  },
  /*::[*/
  2191: {
    /* n:"TableStyle", */
  },
  /*::[*/
  2192: {
    /* n:"TableStyleElement", */
  },
  /*::[*/
  2194: {
    /* n:"StyleExt", */
  },
  /*::[*/
  2195: {
    /* n:"NamePublish", */
  },
  /*::[*/
  2196: {
    /* n:"NameCmt", */
    f: Qh,
    r: 12
  },
  /*::[*/
  2197: {
    /* n:"SortData", */
  },
  /*::[*/
  2198: {
    /* n:"Theme", */
    f: cd,
    r: 12
  },
  /*::[*/
  2199: {
    /* n:"GUIDTypeLib", */
  },
  /*::[*/
  2200: {
    /* n:"FnGrp12", */
  },
  /*::[*/
  2201: {
    /* n:"NameFnGrp12", */
  },
  /*::[*/
  2202: {
    /* n:"MTRSettings", */
    f: r1,
    r: 12
  },
  /*::[*/
  2203: {
    /* n:"CompressPictures", */
    f: ea
  },
  /*::[*/
  2204: {
    /* n:"HeaderFooter", */
  },
  /*::[*/
  2205: {
    /* n:"CrtLayout12", */
  },
  /*::[*/
  2206: {
    /* n:"CrtMlFrt", */
  },
  /*::[*/
  2207: {
    /* n:"CrtMlFrtContinue", */
  },
  /*::[*/
  2211: {
    /* n:"ForceFullCalculation", */
    f: Th
  },
  /*::[*/
  2212: {
    /* n:"ShapePropsStream", */
  },
  /*::[*/
  2213: {
    /* n:"TextPropsStream", */
  },
  /*::[*/
  2214: {
    /* n:"RichTextStream", */
  },
  /*::[*/
  2215: {
    /* n:"CrtLayout12A", */
  },
  /*::[*/
  4097: {
    /* n:"Units", */
  },
  /*::[*/
  4098: {
    /* n:"Chart", */
  },
  /*::[*/
  4099: {
    /* n:"Series", */
  },
  /*::[*/
  4102: {
    /* n:"DataFormat", */
  },
  /*::[*/
  4103: {
    /* n:"LineFormat", */
  },
  /*::[*/
  4105: {
    /* n:"MarkerFormat", */
  },
  /*::[*/
  4106: {
    /* n:"AreaFormat", */
  },
  /*::[*/
  4107: {
    /* n:"PieFormat", */
  },
  /*::[*/
  4108: {
    /* n:"AttachedLabel", */
  },
  /*::[*/
  4109: {
    /* n:"SeriesText", */
  },
  /*::[*/
  4116: {
    /* n:"ChartFormat", */
  },
  /*::[*/
  4117: {
    /* n:"Legend", */
  },
  /*::[*/
  4118: {
    /* n:"SeriesList", */
  },
  /*::[*/
  4119: {
    /* n:"Bar", */
  },
  /*::[*/
  4120: {
    /* n:"Line", */
  },
  /*::[*/
  4121: {
    /* n:"Pie", */
  },
  /*::[*/
  4122: {
    /* n:"Area", */
  },
  /*::[*/
  4123: {
    /* n:"Scatter", */
  },
  /*::[*/
  4124: {
    /* n:"CrtLine", */
  },
  /*::[*/
  4125: {
    /* n:"Axis", */
  },
  /*::[*/
  4126: {
    /* n:"Tick", */
  },
  /*::[*/
  4127: {
    /* n:"ValueRange", */
  },
  /*::[*/
  4128: {
    /* n:"CatSerRange", */
  },
  /*::[*/
  4129: {
    /* n:"AxisLine", */
  },
  /*::[*/
  4130: {
    /* n:"CrtLink", */
  },
  /*::[*/
  4132: {
    /* n:"DefaultText", */
  },
  /*::[*/
  4133: {
    /* n:"Text", */
  },
  /*::[*/
  4134: {
    /* n:"FontX", */
    f: yr
  },
  /*::[*/
  4135: {
    /* n:"ObjectLink", */
  },
  /*::[*/
  4146: {
    /* n:"Frame", */
  },
  /*::[*/
  4147: {
    /* n:"Begin", */
  },
  /*::[*/
  4148: {
    /* n:"End", */
  },
  /*::[*/
  4149: {
    /* n:"PlotArea", */
  },
  /*::[*/
  4154: {
    /* n:"Chart3d", */
  },
  /*::[*/
  4156: {
    /* n:"PicF", */
  },
  /*::[*/
  4157: {
    /* n:"DropBar", */
  },
  /*::[*/
  4158: {
    /* n:"Radar", */
  },
  /*::[*/
  4159: {
    /* n:"Surf", */
  },
  /*::[*/
  4160: {
    /* n:"RadarArea", */
  },
  /*::[*/
  4161: {
    /* n:"AxisParent", */
  },
  /*::[*/
  4163: {
    /* n:"LegendException", */
  },
  /*::[*/
  4164: {
    /* n:"ShtProps", */
    f: k1
  },
  /*::[*/
  4165: {
    /* n:"SerToCrt", */
  },
  /*::[*/
  4166: {
    /* n:"AxesUsed", */
  },
  /*::[*/
  4168: {
    /* n:"SBaseRef", */
  },
  /*::[*/
  4170: {
    /* n:"SerParent", */
  },
  /*::[*/
  4171: {
    /* n:"SerAuxTrend", */
  },
  /*::[*/
  4174: {
    /* n:"IFmtRecord", */
  },
  /*::[*/
  4175: {
    /* n:"Pos", */
  },
  /*::[*/
  4176: {
    /* n:"AlRuns", */
  },
  /*::[*/
  4177: {
    /* n:"BRAI", */
  },
  /*::[*/
  4187: {
    /* n:"SerAuxErrBar", */
  },
  /*::[*/
  4188: {
    /* n:"ClrtClient", */
    f: v1
  },
  /*::[*/
  4189: {
    /* n:"SerFmt", */
  },
  /*::[*/
  4191: {
    /* n:"Chart3DBarShape", */
  },
  /*::[*/
  4192: {
    /* n:"Fbi", */
  },
  /*::[*/
  4193: {
    /* n:"BopPop", */
  },
  /*::[*/
  4194: {
    /* n:"AxcExt", */
  },
  /*::[*/
  4195: {
    /* n:"Dat", */
  },
  /*::[*/
  4196: {
    /* n:"PlotGrowth", */
  },
  /*::[*/
  4197: {
    /* n:"SIIndex", */
  },
  /*::[*/
  4198: {
    /* n:"GelFrame", */
  },
  /*::[*/
  4199: {
    /* n:"BopPopCustom", */
  },
  /*::[*/
  4200: {
    /* n:"Fbi2", */
  },
  /*::[*/
  0: {
    /* n:"Dimensions", */
    f: tf
  },
  /*::[*/
  1: {
    /* n:"BIFF2BLANK", */
  },
  /*::[*/
  2: {
    /* n:"BIFF2INT", */
    f: D1
  },
  /*::[*/
  3: {
    /* n:"BIFF2NUM", */
    f: C1
  },
  /*::[*/
  4: {
    /* n:"BIFF2STR", */
    f: A1
  },
  /*::[*/
  5: {
    /* n:"BoolErr", */
    f: nf
  },
  /*::[*/
  7: {
    /* n:"String", */
    f: O1
  },
  /*::[*/
  8: {
    /* n:"BIFF2ROW", */
  },
  /*::[*/
  9: {
    /* n:"BOF", */
    f: i0
  },
  /*::[*/
  11: {
    /* n:"Index", */
  },
  /*::[*/
  22: {
    /* n:"ExternCount", */
    f: yr
  },
  /*::[*/
  30: {
    /* n:"BIFF2FORMAT", */
    f: Mh
  },
  /*::[*/
  31: {
    /* n:"BIFF2FMTCNT", */
  },
  /* 16-bit cnt of BIFF2FORMAT records */
  /*::[*/
  32: {
    /* n:"BIFF2COLINFO", */
  },
  /*::[*/
  33: {
    /* n:"Array", */
    f: lf
  },
  /*::[*/
  36: {
    /* n:"COLWIDTH", */
  },
  /*::[*/
  37: {
    /* n:"DefaultRowHeight", */
    f: rf
  },
  // 0x2c ??
  // 0x2d ??
  // 0x2e ??
  // 0x30 FONTCOUNT: number of fonts
  /*::[*/
  50: {
    /* n:"BIFF2FONTXTRA", */
    f: N1
  },
  // 0x35: INFOOPTS
  // 0x36: TABLE (BIFF2 only)
  // 0x37: TABLE2 (BIFF2 only)
  // 0x38: WNDESK
  // 0x39 ??
  // 0x3a: BEGINPREF
  // 0x3b: ENDPREF
  /*::[*/
  62: {
    /* n:"BIFF2WINDOW2", */
  },
  // 0x3f ??
  // 0x46: SHOWSCROLL
  // 0x47: SHOWFORMULA
  // 0x48: STATUSBAR
  // 0x49: SHORTMENUS
  // 0x4A:
  // 0x4B:
  // 0x4C:
  // 0x4E:
  // 0x4F:
  // 0x58: TOOLBAR (BIFF3)
  /* - - - */
  /*::[*/
  52: {
    /* n:"DDEObjName", */
  },
  /*::[*/
  67: {
    /* n:"BIFF2XF", */
  },
  /*::[*/
  68: {
    /* n:"BIFF2XFINDEX", */
    f: yr
  },
  /*::[*/
  69: {
    /* n:"BIFF2FONTCLR", */
  },
  /*::[*/
  86: {
    /* n:"BIFF4FMTCNT", */
  },
  /* 16-bit cnt, similar to BIFF2 */
  /*::[*/
  126: {
    /* n:"RK", */
  },
  /* Not necessarily same as 0x027e */
  /*::[*/
  127: {
    /* n:"ImData", */
    f: F1
  },
  /*::[*/
  135: {
    /* n:"Addin", */
  },
  /*::[*/
  136: {
    /* n:"Edg", */
  },
  /*::[*/
  137: {
    /* n:"Pub", */
  },
  // 0x8A
  // 0x8B LH: alternate menu key flag (BIFF3/4)
  // 0x8E
  // 0x8F
  /*::[*/
  145: {
    /* n:"Sub", */
  },
  // 0x93 STYLE
  /*::[*/
  148: {
    /* n:"LHRecord", */
  },
  /*::[*/
  149: {
    /* n:"LHNGraph", */
  },
  /*::[*/
  150: {
    /* n:"Sound", */
  },
  // 0xA2 FNPROTO: function prototypes (BIFF4)
  // 0xA3
  // 0xA8
  /*::[*/
  169: {
    /* n:"CoordList", */
  },
  /*::[*/
  171: {
    /* n:"GCW", */
  },
  /*::[*/
  188: {
    /* n:"ShrFmla", */
  },
  /* Not necessarily same as 0x04bc */
  /*::[*/
  191: {
    /* n:"ToolbarHdr", */
  },
  /*::[*/
  192: {
    /* n:"ToolbarEnd", */
  },
  /*::[*/
  194: {
    /* n:"AddMenu", */
  },
  /*::[*/
  195: {
    /* n:"DelMenu", */
  },
  /*::[*/
  214: {
    /* n:"RString", */
    f: R1
  },
  /*::[*/
  223: {
    /* n:"UDDesc", */
  },
  /*::[*/
  234: {
    /* n:"TabIdConf", */
  },
  /*::[*/
  354: {
    /* n:"XL5Modify", */
  },
  /*::[*/
  421: {
    /* n:"FileSharing2", */
  },
  /*::[*/
  518: {
    /* n:"Formula", */
    f: ri
  },
  /*::[*/
  521: {
    /* n:"BOF", */
    f: i0
  },
  /*::[*/
  536: {
    /* n:"Lbl", */
    f: cf
  },
  /*::[*/
  547: {
    /* n:"ExternName", */
    f: ff
  },
  /*::[*/
  561: {
    /* n:"Font", */
  },
  /*::[*/
  579: {
    /* n:"BIFF3XF", */
  },
  /*::[*/
  1030: {
    /* n:"Formula", */
    f: ri
  },
  /*::[*/
  1033: {
    /* n:"BOF", */
    f: i0
  },
  /*::[*/
  1091: {
    /* n:"BIFF4XF", */
  },
  /*::[*/
  2157: {
    /* n:"FeatInfo", */
  },
  /*::[*/
  2163: {
    /* n:"FeatInfo11", */
  },
  /*::[*/
  2177: {
    /* n:"SXAddl12", */
  },
  /*::[*/
  2240: {
    /* n:"AutoWebPub", */
  },
  /*::[*/
  2241: {
    /* n:"ListObj", */
  },
  /*::[*/
  2242: {
    /* n:"ListField", */
  },
  /*::[*/
  2243: {
    /* n:"ListDV", */
  },
  /*::[*/
  2244: {
    /* n:"ListCondFmt", */
  },
  /*::[*/
  2245: {
    /* n:"ListCF", */
  },
  /*::[*/
  2246: {
    /* n:"FMQry", */
  },
  /*::[*/
  2247: {
    /* n:"FMSQry", */
  },
  /*::[*/
  2248: {
    /* n:"PLV", */
  },
  /*::[*/
  2249: {
    /* n:"LnExt", */
  },
  /*::[*/
  2250: {
    /* n:"MkrExt", */
  },
  /*::[*/
  2251: {
    /* n:"CrtCoopt", */
  },
  /*::[*/
  2262: {
    /* n:"FRTArchId$", */
    r: 12
  },
  /*::[*/
  29282: {}
};
function ue(e, t, r, a) {
  var n = t;
  if (!isNaN(n)) {
    var i = a || (r || []).length || 0, s = e.next(4);
    s.write_shift(2, n), s.write_shift(2, i), /*:: len != null &&*/
    i > 0 && Ni(r) && e.push(r);
  }
}
function Og(e, t, r, a) {
  var n = (r || []).length || 0;
  if (n <= 8224) return ue(e, t, r, n);
  var i = t;
  if (!isNaN(i)) {
    for (var s = r.parts || [], f = 0, c = 0, l = 0; l + (s[f] || 8224) <= 8224; )
      l += s[f] || 8224, f++;
    var o = e.next(4);
    for (o.write_shift(2, i), o.write_shift(2, l), e.push(r.slice(c, c + l)), c += l; c < n; ) {
      for (o = e.next(4), o.write_shift(2, 60), l = 0; l + (s[f] || 8224) <= 8224; )
        l += s[f] || 8224, f++;
      o.write_shift(2, l), e.push(r.slice(c, c + l)), c += l;
    }
  }
}
function Kn(e, t, r) {
  return e || (e = Z(7)), e.write_shift(2, t), e.write_shift(2, r), e.write_shift(2, 0), e.write_shift(1, 0), e;
}
function Ng(e, t, r, a) {
  var n = Z(9);
  return Kn(n, e, t), Ic(r, a || "b", n), n;
}
function Rg(e, t, r) {
  var a = Z(8 + 2 * r.length);
  return Kn(a, e, t), a.write_shift(1, r.length), a.write_shift(r.length, r, "sbcs"), a.l < a.length ? a.slice(0, a.l) : a;
}
function Lg(e, t, r, a) {
  if (t.v != null) switch (t.t) {
    case "d":
    case "n":
      var n = t.t == "d" ? Ar(nr(t.v)) : t.v;
      n == (n | 0) && n >= 0 && n < 65536 ? ue(e, 2, I1(r, a, n)) : ue(e, 3, b1(r, a, n));
      return;
    case "b":
    case "e":
      ue(e, 5, Ng(r, a, t.v, t.t));
      return;
    case "s":
    case "str":
      ue(e, 4, Rg(r, a, (t.v || "").slice(0, 255)));
      return;
  }
  ue(e, 1, Kn(null, r, a));
}
function Pg(e, t, r, a) {
  var n = Array.isArray(t), i = $e(t["!ref"] || "A1"), s, f = "", c = [];
  if (i.e.c > 255 || i.e.r > 16383) {
    if (a.WTF) throw new Error("Range " + (t["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    i.e.c = Math.min(i.e.c, 255), i.e.r = Math.min(i.e.c, 16383), s = Ne(i);
  }
  for (var l = i.s.r; l <= i.e.r; ++l) {
    f = wr(l);
    for (var o = i.s.c; o <= i.e.c; ++o) {
      l === i.s.r && (c[o] = ur(o)), s = c[o] + f;
      var u = n ? (t[l] || [])[o] : t[s];
      u && Lg(e, u, l, o);
    }
  }
}
function Bg(e, t) {
  for (var r = t || {}, a = it(), n = 0, i = 0; i < e.SheetNames.length; ++i) e.SheetNames[i] == r.sheet && (n = i);
  if (n == 0 && r.sheet && e.SheetNames[0] != r.sheet) throw new Error("Sheet not found: " + r.sheet);
  return ue(a, r.biff == 4 ? 1033 : r.biff == 3 ? 521 : 9, Xi(e, 16, r)), Pg(a, e.Sheets[e.SheetNames[n]], n, r), ue(a, 10), a.end();
}
function Mg(e, t, r) {
  ue(e, 49, Ih({
    sz: 12,
    name: "Arial"
  }, r));
}
function Ug(e, t, r) {
  t && [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(a) {
    for (var n = a[0]; n <= a[1]; ++n) t[n] != null && ue(e, 1054, Bh(n, t[n], r));
  });
}
function Wg(e, t) {
  var r = Z(19);
  r.write_shift(4, 2151), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 1), r.write_shift(4, 0), ue(e, 2151, r), r = Z(39), r.write_shift(4, 2152), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 0), r.write_shift(4, 0), r.write_shift(2, 1), r.write_shift(4, 4), r.write_shift(2, 0), Pc($e(t["!ref"] || "A1"), r), r.write_shift(4, 4), ue(e, 2152, r);
}
function Vg(e, t) {
  for (var r = 0; r < 16; ++r) ue(e, 224, af({ numFmtId: 0, style: !0 }, 0, t));
  t.cellXfs.forEach(function(a) {
    ue(e, 224, af(a, 0, t));
  });
}
function Hg(e, t) {
  for (var r = 0; r < t["!links"].length; ++r) {
    var a = t["!links"][r];
    ue(e, 440, u1(a)), a[1].Tooltip && ue(e, 2048, x1(a));
  }
  delete t["!links"];
}
function Xg(e, t) {
  if (t) {
    var r = 0;
    t.forEach(function(a, n) {
      ++r <= 256 && a && ue(e, 125, _1(I0(n, a), n));
    });
  }
}
function zg(e, t, r, a, n) {
  var i = 16 + la(n.cellXfs, t, n);
  if (t.v == null && !t.bf) {
    ue(e, 513, Aa(r, a, i));
    return;
  }
  if (t.bf) ue(e, 6, vv(t, r, a, n, i));
  else switch (t.t) {
    case "d":
    case "n":
      var s = t.t == "d" ? Ar(nr(t.v)) : t.v;
      ue(e, 515, Yh(r, a, s, i));
      break;
    case "b":
    case "e":
      ue(e, 517, jh(r, a, t.v, i, n, t.t));
      break;
    case "s":
    case "str":
      if (n.bookSST) {
        var f = qi(n.Strings, t.v, n.revStrings);
        ue(e, 253, Nh(r, a, f, i));
      } else ue(e, 516, Lh(r, a, (t.v || "").slice(0, 255), i, n));
      break;
    default:
      ue(e, 513, Aa(r, a, i));
  }
}
function Gg(e, t, r) {
  var a = it(), n = r.SheetNames[e], i = r.Sheets[n] || {}, s = (r || {}).Workbook || {}, f = (s.Sheets || [])[e] || {}, c = Array.isArray(i), l = t.biff == 8, o, u = "", x = [], d = $e(i["!ref"] || "A1"), v = l ? 65536 : 16384;
  if (d.e.c > 255 || d.e.r >= v) {
    if (t.WTF) throw new Error("Range " + (i["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    d.e.c = Math.min(d.e.c, 255), d.e.r = Math.min(d.e.c, v - 1);
  }
  ue(a, 2057, Xi(r, 16, t)), ue(a, 13, yt(1)), ue(a, 12, yt(100)), ue(a, 15, et(!0)), ue(a, 17, et(!1)), ue(a, 16, Sa(1e-3)), ue(a, 95, et(!0)), ue(a, 42, et(!1)), ue(a, 43, et(!1)), ue(a, 130, yt(1)), ue(a, 128, $h()), ue(a, 131, et(!1)), ue(a, 132, et(!1)), l && Xg(a, i["!cols"]), ue(a, 512, Uh(d, t)), l && (i["!links"] = []);
  for (var h = d.s.r; h <= d.e.r; ++h) {
    u = wr(h);
    for (var g = d.s.c; g <= d.e.c; ++g) {
      h === d.s.r && (x[g] = ur(g)), o = x[g] + u;
      var T = c ? (i[h] || [])[g] : i[o];
      T && (zg(a, T, h, g, t), l && T.l && i["!links"].push([o, T.l]));
    }
  }
  var A = f.CodeName || f.name || n;
  return l && ue(a, 574, Ch((s.Views || [])[0])), l && (i["!merges"] || []).length && ue(a, 229, i1(i["!merges"])), l && Hg(a, i), ue(a, 442, Oc(A)), l && Wg(a, i), ue(
    a,
    10
    /* EOF */
  ), a.end();
}
function $g(e, t, r) {
  var a = it(), n = (e || {}).Workbook || {}, i = n.Sheets || [], s = (
    /*::((*/
    n.WBProps || {
      /*::CodeName:"ThisWorkbook"*/
    }
  ), f = r.biff == 8, c = r.biff == 5;
  if (ue(a, 2057, Xi(e, 5, r)), r.bookType == "xla" && ue(
    a,
    135
    /* Addin */
  ), ue(a, 225, f ? yt(1200) : null), ue(a, 193, ju(2)), c && ue(
    a,
    191
    /* ToolbarHdr */
  ), c && ue(
    a,
    192
    /* ToolbarEnd */
  ), ue(
    a,
    226
    /* InterfaceEnd */
  ), ue(a, 92, ph("SheetJS", r)), ue(a, 66, yt(f ? 1200 : 1252)), f && ue(a, 353, yt(0)), f && ue(
    a,
    448
    /* Excel9File */
  ), ue(a, 317, E1(e.SheetNames.length)), f && e.vbaraw && ue(
    a,
    211
    /* ObProj */
  ), f && e.vbaraw) {
    var l = s.CodeName || "ThisWorkbook";
    ue(a, 442, Oc(l));
  }
  ue(a, 156, yt(17)), ue(a, 25, et(!1)), ue(a, 18, et(!1)), ue(a, 19, yt(0)), f && ue(a, 431, et(!1)), f && ue(a, 444, yt(0)), ue(a, 61, Fh()), ue(a, 64, et(!1)), ue(a, 141, yt(0)), ue(a, 34, et(y2(e) == "true")), ue(a, 14, et(!0)), f && ue(a, 439, et(!1)), ue(a, 218, yt(0)), Mg(a, e, r), Ug(a, e.SSF, r), Vg(a, r), f && ue(a, 352, et(!1));
  var o = a.end(), u = it();
  f && ue(u, 140, p1()), f && r.Strings && Og(u, 252, wh(r.Strings)), ue(
    u,
    10
    /* EOF */
  );
  var x = u.end(), d = it(), v = 0, h = 0;
  for (h = 0; h < e.SheetNames.length; ++h) v += (f ? 12 : 11) + (f ? 2 : 1) * e.SheetNames[h].length;
  var g = o.length + v + x.length;
  for (h = 0; h < e.SheetNames.length; ++h) {
    var T = i[h] || {};
    ue(d, 133, gh({ pos: g, hs: T.Hidden || 0, dt: 0, name: e.SheetNames[h] }, r)), g += t[h].length;
  }
  var A = d.end();
  if (v != A.length) throw new Error("BS8 " + v + " != " + A.length);
  var k = [];
  return o.length && k.push(o), A.length && k.push(A), x.length && k.push(x), Dr(k);
}
function jg(e, t) {
  var r = t || {}, a = [];
  e && !e.SSF && (e.SSF = ir(Fe)), e && e.SSF && (nn(), y0(e.SSF), r.revssf = F0(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF), r.Strings = /*::((*/
  [], r.Strings.Count = 0, r.Strings.Unique = 0, ts(r), r.cellXfs = [], la(r.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {});
  for (var n = 0; n < e.SheetNames.length; ++n) a[a.length] = Gg(n, r, e);
  return a.unshift($g(e, a, r)), Dr(a);
}
function Sl(e, t) {
  for (var r = 0; r <= e.SheetNames.length; ++r) {
    var a = e.Sheets[e.SheetNames[r]];
    if (!(!a || !a["!ref"])) {
      var n = st(a["!ref"]);
      n.e.c > 255 && typeof console < "u" && console.error && console.error("Worksheet '" + e.SheetNames[r] + "' extends beyond column IV (255).  Data may be lost.");
    }
  }
  var i = t || {};
  switch (i.biff || 2) {
    case 8:
    case 5:
      return jg(e, t);
    case 4:
    case 3:
    case 2:
      return Bg(e, t);
  }
  throw new Error("invalid type " + i.bookType + " for BIFF");
}
function _f(e, t) {
  var r = t || {}, a = r.dense ? [] : {};
  e = e.replace(/<!--.*?-->/g, "");
  var n = e.match(/<table/i);
  if (!n) throw new Error("Invalid HTML: could not find <table>");
  var i = e.match(/<\/table/i), s = n.index, f = i && i.index || e.length, c = Io(e.slice(s, f), /(:?<tr[^>]*>)/i, "<tr>"), l = -1, o = 0, u = 0, x = 0, d = { s: { r: 1e7, c: 1e7 }, e: { r: 0, c: 0 } }, v = [];
  for (s = 0; s < c.length; ++s) {
    var h = c[s].trim(), g = h.slice(0, 3).toLowerCase();
    if (g == "<tr") {
      if (++l, r.sheetRows && r.sheetRows <= l) {
        --l;
        break;
      }
      o = 0;
      continue;
    }
    if (!(g != "<td" && g != "<th")) {
      var T = h.split(/<\/t[dh]>/i);
      for (f = 0; f < T.length; ++f) {
        var A = T[f].trim();
        if (A.match(/<t[dh]/i)) {
          for (var k = A, R = 0; k.charAt(0) == "<" && (R = k.indexOf(">")) > -1; ) k = k.slice(R + 1);
          for (var V = 0; V < v.length; ++V) {
            var N = v[V];
            N.s.c == o && N.s.r < l && l <= N.e.r && (o = N.e.c + 1, V = -1);
          }
          var S = be(A.slice(0, A.indexOf(">")));
          x = S.colspan ? +S.colspan : 1, ((u = +S.rowspan) > 1 || x > 1) && v.push({ s: { r: l, c: o }, e: { r: l + (u || 1) - 1, c: o + x - 1 } });
          var z = S.t || S["data-t"] || "";
          if (!k.length) {
            o += x;
            continue;
          }
          if (k = Yf(k), d.s.r > l && (d.s.r = l), d.e.r < l && (d.e.r = l), d.s.c > o && (d.s.c = o), d.e.c < o && (d.e.c = o), !k.length) {
            o += x;
            continue;
          }
          var L = { t: "s", v: k };
          r.raw || !k.trim().length || z == "s" || (k === "TRUE" ? L = { t: "b", v: !0 } : k === "FALSE" ? L = { t: "b", v: !1 } : isNaN(Lt(k)) ? isNaN(en(k).getDate()) || (L = { t: "d", v: nr(k) }, r.cellDates || (L = { t: "n", v: Ar(L.v) }), L.z = r.dateNF || Fe[14]) : L = { t: "n", v: Lt(k) }), r.dense ? (a[l] || (a[l] = []), a[l][o] = L) : a[Ce({ r: l, c: o })] = L, o += x;
        }
      }
    }
  }
  return a["!ref"] = Ne(d), v.length && (a["!merges"] = v), a;
}
function Kg(e, t, r, a) {
  for (var n = e["!merges"] || [], i = [], s = t.s.c; s <= t.e.c; ++s) {
    for (var f = 0, c = 0, l = 0; l < n.length; ++l)
      if (!(n[l].s.r > r || n[l].s.c > s) && !(n[l].e.r < r || n[l].e.c < s)) {
        if (n[l].s.r < r || n[l].s.c < s) {
          f = -1;
          break;
        }
        f = n[l].e.r - n[l].s.r + 1, c = n[l].e.c - n[l].s.c + 1;
        break;
      }
    if (!(f < 0)) {
      var o = Ce({ r, c: s }), u = a.dense ? (e[r] || [])[s] : e[o], x = u && u.v != null && (u.h || Di(u.w || (Jt(u), u.w) || "")) || "", d = {};
      f > 1 && (d.rowspan = f), c > 1 && (d.colspan = c), a.editable ? x = '<span contenteditable="true">' + x + "</span>" : u && (d["data-t"] = u && u.t || "z", u.v != null && (d["data-v"] = u.v), u.z != null && (d["data-z"] = u.z), u.l && (u.l.Target || "#").charAt(0) != "#" && (x = '<a href="' + u.l.Target + '">' + x + "</a>")), d.id = (a.id || "sjs") + "-" + o, i.push(oe("td", x, d));
    }
  }
  var v = "<tr>";
  return v + i.join("") + "</tr>";
}
var Yg = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>', Jg = "</body></html>";
function qg(e, t) {
  var r = e.match(/<table[\s\S]*?>[\s\S]*?<\/table>/gi);
  if (!r || r.length == 0) throw new Error("Invalid HTML: could not find <table>");
  if (r.length == 1) return ca(_f(r[0], t), t);
  var a = is();
  return r.forEach(function(n, i) {
    ss(a, _f(n, t), "Sheet" + (i + 1));
  }), a;
}
function Zg(e, t, r) {
  var a = [];
  return a.join("") + "<table" + (r && r.id ? ' id="' + r.id + '"' : "") + ">";
}
function Fl(e, t) {
  var r = t || {}, a = r.header != null ? r.header : Yg, n = r.footer != null ? r.footer : Jg, i = [a], s = st(e["!ref"]);
  r.dense = Array.isArray(e), i.push(Zg(e, s, r));
  for (var f = s.s.r; f <= s.e.r; ++f) i.push(Kg(e, s, f, r));
  return i.push("</table>" + n), i.join("");
}
function Al(e, t, r) {
  var a = r || {}, n = 0, i = 0;
  if (a.origin != null)
    if (typeof a.origin == "number") n = a.origin;
    else {
      var s = typeof a.origin == "string" ? hr(a.origin) : a.origin;
      n = s.r, i = s.c;
    }
  var f = t.getElementsByTagName("tr"), c = Math.min(a.sheetRows || 1e7, f.length), l = { s: { r: 0, c: 0 }, e: { r: n, c: i } };
  if (e["!ref"]) {
    var o = st(e["!ref"]);
    l.s.r = Math.min(l.s.r, o.s.r), l.s.c = Math.min(l.s.c, o.s.c), l.e.r = Math.max(l.e.r, o.e.r), l.e.c = Math.max(l.e.c, o.e.c), n == -1 && (l.e.r = n = o.e.r + 1);
  }
  var u = [], x = 0, d = e["!rows"] || (e["!rows"] = []), v = 0, h = 0, g = 0, T = 0, A = 0, k = 0;
  for (e["!cols"] || (e["!cols"] = []); v < f.length && h < c; ++v) {
    var R = f[v];
    if (wf(R)) {
      if (a.display) continue;
      d[h] = { hidden: !0 };
    }
    var V = R.children;
    for (g = T = 0; g < V.length; ++g) {
      var N = V[g];
      if (!(a.display && wf(N))) {
        var S = N.hasAttribute("data-v") ? N.getAttribute("data-v") : N.hasAttribute("v") ? N.getAttribute("v") : Yf(N.innerHTML), z = N.getAttribute("data-z") || N.getAttribute("z");
        for (x = 0; x < u.length; ++x) {
          var L = u[x];
          L.s.c == T + i && L.s.r < h + n && h + n <= L.e.r && (T = L.e.c + 1 - i, x = -1);
        }
        k = +N.getAttribute("colspan") || 1, ((A = +N.getAttribute("rowspan") || 1) > 1 || k > 1) && u.push({ s: { r: h + n, c: T + i }, e: { r: h + n + (A || 1) - 1, c: T + i + (k || 1) - 1 } });
        var J = { t: "s", v: S }, j = N.getAttribute("data-t") || N.getAttribute("t") || "";
        S != null && (S.length == 0 ? J.t = j || "z" : a.raw || S.trim().length == 0 || j == "s" || (S === "TRUE" ? J = { t: "b", v: !0 } : S === "FALSE" ? J = { t: "b", v: !1 } : isNaN(Lt(S)) ? isNaN(en(S).getDate()) || (J = { t: "d", v: nr(S) }, a.cellDates || (J = { t: "n", v: Ar(J.v) }), J.z = a.dateNF || Fe[14]) : J = { t: "n", v: Lt(S) })), J.z === void 0 && z != null && (J.z = z);
        var H = "", re = N.getElementsByTagName("A");
        if (re && re.length) for (var me = 0; me < re.length && !(re[me].hasAttribute("href") && (H = re[me].getAttribute("href"), H.charAt(0) != "#")); ++me) ;
        H && H.charAt(0) != "#" && (J.l = { Target: H }), a.dense ? (e[h + n] || (e[h + n] = []), e[h + n][T + i] = J) : e[Ce({ c: T + i, r: h + n })] = J, l.e.c < T + i && (l.e.c = T + i), T += k;
      }
    }
    ++h;
  }
  return u.length && (e["!merges"] = (e["!merges"] || []).concat(u)), l.e.r = Math.max(l.e.r, h - 1 + n), e["!ref"] = Ne(l), h >= c && (e["!fullref"] = Ne((l.e.r = f.length - v + h - 1 + n, l))), e;
}
function Cl(e, t) {
  var r = t || {}, a = r.dense ? [] : {};
  return Al(a, e, t);
}
function Qg(e, t) {
  return ca(Cl(e, t), t);
}
function wf(e) {
  var t = "", r = e_(e);
  return r && (t = r(e).getPropertyValue("display")), t || (t = e.style && e.style.display), t === "none";
}
function e_(e) {
  return e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle == "function" ? e.ownerDocument.defaultView.getComputedStyle : typeof getComputedStyle == "function" ? getComputedStyle : null;
}
function r_(e) {
  var t = e.replace(/[\t\r\n]/g, " ").trim().replace(/ +/g, " ").replace(/<text:s\/>/g, " ").replace(/<text:s text:c="(\d+)"\/>/g, function(a, n) {
    return Array(parseInt(n, 10) + 1).join(" ");
  }).replace(/<text:tab[^>]*\/>/g, "	").replace(/<text:line-break\/>/g, `
`), r = Ge(t.replace(/<[^>]*>/g, ""));
  return [r];
}
var kf = {
  /* ods name: [short ssf fmt, long ssf fmt] */
  day: ["d", "dd"],
  month: ["m", "mm"],
  year: ["y", "yy"],
  hours: ["h", "hh"],
  minutes: ["m", "mm"],
  seconds: ["s", "ss"],
  "am-pm": ["A/P", "AM/PM"],
  "day-of-week": ["ddd", "dddd"],
  era: ["e", "ee"],
  /* there is no native representation of LO "Q" format */
  quarter: ["\\Qm", 'm\\"th quarter"']
};
function bl(e, t) {
  var r = t || {}, a = Ii(e), n = [], i, s, f = { name: "" }, c = "", l = 0, o, u, x = {}, d = [], v = r.dense ? [] : {}, h, g, T = { value: "" }, A = "", k = 0, R = [], V = -1, N = -1, S = { s: { r: 1e6, c: 1e7 }, e: { r: 0, c: 0 } }, z = 0, L = {}, J = [], j = {}, H = 0, re = 0, me = [], xe = 1, ve = 1, de = [], Xe = { Names: [] }, K = {}, pe = ["", ""], we = [], C = {}, M = "", O = 0, P = !1, Q = !1, fe = 0;
  for (On.lastIndex = 0, a = a.replace(/<!--([\s\S]*?)-->/mg, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, ""); h = On.exec(a); ) switch (h[3] = h[3].replace(/_.*$/, "")) {
    case "table":
    case "工作表":
      h[1] === "/" ? (S.e.c >= S.s.c && S.e.r >= S.s.r ? v["!ref"] = Ne(S) : v["!ref"] = "A1:A1", r.sheetRows > 0 && r.sheetRows <= S.e.r && (v["!fullref"] = v["!ref"], S.e.r = r.sheetRows - 1, v["!ref"] = Ne(S)), J.length && (v["!merges"] = J), me.length && (v["!rows"] = me), o.name = o.名称 || o.name, typeof JSON < "u" && JSON.stringify(o), d.push(o.name), x[o.name] = v, Q = !1) : h[0].charAt(h[0].length - 2) !== "/" && (o = be(h[0], !1), V = N = -1, S.s.r = S.s.c = 1e7, S.e.r = S.e.c = 0, v = r.dense ? [] : {}, J = [], me = [], Q = !0);
      break;
    case "table-row-group":
      h[1] === "/" ? --z : ++z;
      break;
    case "table-row":
    case "行":
      if (h[1] === "/") {
        V += xe, xe = 1;
        break;
      }
      if (u = be(h[0], !1), u.行号 ? V = u.行号 - 1 : V == -1 && (V = 0), xe = +u["number-rows-repeated"] || 1, xe < 10) for (fe = 0; fe < xe; ++fe) z > 0 && (me[V + fe] = { level: z });
      N = -1;
      break;
    case "covered-table-cell":
      h[1] !== "/" && ++N, r.sheetStubs && (r.dense ? (v[V] || (v[V] = []), v[V][N] = { t: "z" }) : v[Ce({ r: V, c: N })] = { t: "z" }), A = "", R = [];
      break;
    case "table-cell":
    case "数据":
      if (h[0].charAt(h[0].length - 2) === "/")
        ++N, T = be(h[0], !1), ve = parseInt(T["number-columns-repeated"] || "1", 10), g = {
          t: "z",
          v: null
          /*:: , z:null, w:"",c:[]*/
        }, T.formula && r.cellFormula != !1 && (g.f = vf(Ge(T.formula))), (T.数据类型 || T["value-type"]) == "string" && (g.t = "s", g.v = Ge(T["string-value"] || ""), r.dense ? (v[V] || (v[V] = []), v[V][N] = g) : v[Ce({ r: V, c: N })] = g), N += ve - 1;
      else if (h[1] !== "/") {
        ++N, A = "", k = 0, R = [], ve = 1;
        var ce = xe ? V + xe - 1 : V;
        if (N > S.e.c && (S.e.c = N), N < S.s.c && (S.s.c = N), V < S.s.r && (S.s.r = V), ce > S.e.r && (S.e.r = ce), T = be(h[0], !1), we = [], C = {}, g = {
          t: T.数据类型 || T["value-type"],
          v: null
          /*:: , z:null, w:"",c:[]*/
        }, r.cellFormula)
          if (T.formula && (T.formula = Ge(T.formula)), T["number-matrix-columns-spanned"] && T["number-matrix-rows-spanned"] && (H = parseInt(T["number-matrix-rows-spanned"], 10) || 0, re = parseInt(T["number-matrix-columns-spanned"], 10) || 0, j = { s: { r: V, c: N }, e: { r: V + H - 1, c: N + re - 1 } }, g.F = Ne(j), de.push([j, g.F])), T.formula) g.f = vf(T.formula);
          else for (fe = 0; fe < de.length; ++fe)
            V >= de[fe][0].s.r && V <= de[fe][0].e.r && N >= de[fe][0].s.c && N <= de[fe][0].e.c && (g.F = de[fe][1]);
        switch ((T["number-columns-spanned"] || T["number-rows-spanned"]) && (H = parseInt(T["number-rows-spanned"], 10) || 0, re = parseInt(T["number-columns-spanned"], 10) || 0, j = { s: { r: V, c: N }, e: { r: V + H - 1, c: N + re - 1 } }, J.push(j)), T["number-columns-repeated"] && (ve = parseInt(T["number-columns-repeated"], 10)), g.t) {
          case "boolean":
            g.t = "b", g.v = ar(T["boolean-value"]);
            break;
          case "float":
            g.t = "n", g.v = parseFloat(T.value);
            break;
          case "percentage":
            g.t = "n", g.v = parseFloat(T.value);
            break;
          case "currency":
            g.t = "n", g.v = parseFloat(T.value);
            break;
          case "date":
            g.t = "d", g.v = nr(T["date-value"]), r.cellDates || (g.t = "n", g.v = Ar(g.v)), g.z = "m/d/yy";
            break;
          case "time":
            g.t = "n", g.v = Co(T["time-value"]) / 86400, r.cellDates && (g.t = "d", g.v = A0(g.v)), g.z = "HH:MM:SS";
            break;
          case "number":
            g.t = "n", g.v = parseFloat(T.数据数值);
            break;
          default:
            if (g.t === "string" || g.t === "text" || !g.t)
              g.t = "s", T["string-value"] != null && (A = Ge(T["string-value"]), R = []);
            else throw new Error("Unsupported value type " + g.t);
        }
      } else {
        if (P = !1, g.t === "s" && (g.v = A || "", R.length && (g.R = R), P = k == 0), K.Target && (g.l = K), we.length > 0 && (g.c = we, we = []), A && r.cellText !== !1 && (g.w = A), P && (g.t = "z", delete g.v), (!P || r.sheetStubs) && !(r.sheetRows && r.sheetRows <= V))
          for (var ie = 0; ie < xe; ++ie) {
            if (ve = parseInt(T["number-columns-repeated"] || "1", 10), r.dense)
              for (v[V + ie] || (v[V + ie] = []), v[V + ie][N] = ie == 0 ? g : ir(g); --ve > 0; ) v[V + ie][N + ve] = ir(g);
            else
              for (v[Ce({ r: V + ie, c: N })] = g; --ve > 0; ) v[Ce({ r: V + ie, c: N + ve })] = ir(g);
            S.e.c <= N && (S.e.c = N);
          }
        ve = parseInt(T["number-columns-repeated"] || "1", 10), N += ve - 1, ve = 0, g = {
          /*:: t:"", v:null, z:null, w:"",c:[]*/
        }, A = "", R = [];
      }
      K = {};
      break;
    case "document":
    case "document-content":
    case "电子表格文档":
    case "spreadsheet":
    case "主体":
    case "scripts":
    case "styles":
    case "font-face-decls":
    case "master-styles":
      if (h[1] === "/") {
        if ((i = n.pop())[0] !== h[3]) throw "Bad state: " + i;
      } else h[0].charAt(h[0].length - 2) !== "/" && n.push([h[3], !0]);
      break;
    case "annotation":
      if (h[1] === "/") {
        if ((i = n.pop())[0] !== h[3]) throw "Bad state: " + i;
        C.t = A, R.length && (C.R = R), C.a = M, we.push(C);
      } else h[0].charAt(h[0].length - 2) !== "/" && n.push([h[3], !1]);
      M = "", O = 0, A = "", k = 0, R = [];
      break;
    case "creator":
      h[1] === "/" ? M = a.slice(O, h.index) : O = h.index + h[0].length;
      break;
    case "meta":
    case "元数据":
    case "settings":
    case "config-item-set":
    case "config-item-map-indexed":
    case "config-item-map-entry":
    case "config-item-map-named":
    case "shapes":
    case "frame":
    case "text-box":
    case "image":
    case "data-pilot-tables":
    case "list-style":
    case "form":
    case "dde-links":
    case "event-listeners":
    case "chart":
      if (h[1] === "/") {
        if ((i = n.pop())[0] !== h[3]) throw "Bad state: " + i;
      } else h[0].charAt(h[0].length - 2) !== "/" && n.push([h[3], !1]);
      A = "", k = 0, R = [];
      break;
    case "scientific-number":
      break;
    case "currency-symbol":
      break;
    case "currency-style":
      break;
    case "number-style":
    case "percentage-style":
    case "date-style":
    case "time-style":
      if (h[1] === "/") {
        if (L[f.name] = c, (i = n.pop())[0] !== h[3]) throw "Bad state: " + i;
      } else h[0].charAt(h[0].length - 2) !== "/" && (c = "", f = be(h[0], !1), n.push([h[3], !0]));
      break;
    case "script":
      break;
    case "libraries":
      break;
    case "automatic-styles":
      break;
    case "default-style":
    case "page-layout":
      break;
    case "style":
      break;
    case "map":
      break;
    case "font-face":
      break;
    case "paragraph-properties":
      break;
    case "table-properties":
      break;
    case "table-column-properties":
      break;
    case "table-row-properties":
      break;
    case "table-cell-properties":
      break;
    case "number":
      switch (n[n.length - 1][0]) {
        case "time-style":
        case "date-style":
          s = be(h[0], !1), c += kf[h[3]][s.style === "long" ? 1 : 0];
          break;
      }
      break;
    case "fraction":
      break;
    case "day":
    case "month":
    case "year":
    case "era":
    case "day-of-week":
    case "week-of-year":
    case "quarter":
    case "hours":
    case "minutes":
    case "seconds":
    case "am-pm":
      switch (n[n.length - 1][0]) {
        case "time-style":
        case "date-style":
          s = be(h[0], !1), c += kf[h[3]][s.style === "long" ? 1 : 0];
          break;
      }
      break;
    case "boolean-style":
      break;
    case "boolean":
      break;
    case "text-style":
      break;
    case "text":
      if (h[0].slice(-2) === "/>") break;
      if (h[1] === "/") switch (n[n.length - 1][0]) {
        case "number-style":
        case "date-style":
        case "time-style":
          c += a.slice(l, h.index);
          break;
      }
      else l = h.index + h[0].length;
      break;
    case "named-range":
      s = be(h[0], !1), pe = ti(s["cell-range-address"]);
      var ne = { Name: s.name, Ref: pe[0] + "!" + pe[1] };
      Q && (ne.Sheet = d.length), Xe.Names.push(ne);
      break;
    case "text-content":
      break;
    case "text-properties":
      break;
    case "embedded-text":
      break;
    case "body":
    case "电子表格":
      break;
    case "forms":
      break;
    case "table-column":
      break;
    case "table-header-rows":
      break;
    case "table-rows":
      break;
    case "table-column-group":
      break;
    case "table-header-columns":
      break;
    case "table-columns":
      break;
    case "null-date":
      break;
    case "graphic-properties":
      break;
    case "calculation-settings":
      break;
    case "named-expressions":
      break;
    case "label-range":
      break;
    case "label-ranges":
      break;
    case "named-expression":
      break;
    case "sort":
      break;
    case "sort-by":
      break;
    case "sort-groups":
      break;
    case "tab":
      break;
    case "line-break":
      break;
    case "span":
      break;
    case "p":
    case "文本串":
      if (["master-styles"].indexOf(n[n.length - 1][0]) > -1) break;
      if (h[1] === "/" && (!T || !T["string-value"])) {
        var Ie = r_(a.slice(k, h.index));
        A = (A.length > 0 ? A + `
` : "") + Ie[0];
      } else
        be(h[0], !1), k = h.index + h[0].length;
      break;
    case "s":
      break;
    case "database-range":
      if (h[1] === "/") break;
      try {
        pe = ti(be(h[0])["target-range-address"]), x[pe[0]]["!autofilter"] = { ref: pe[1] };
      } catch {
      }
      break;
    case "date":
      break;
    case "object":
      break;
    case "title":
    case "标题":
      break;
    case "desc":
      break;
    case "binary-data":
      break;
    case "table-source":
      break;
    case "scenario":
      break;
    case "iteration":
      break;
    case "content-validations":
      break;
    case "content-validation":
      break;
    case "help-message":
      break;
    case "error-message":
      break;
    case "database-ranges":
      break;
    case "filter":
      break;
    case "filter-and":
      break;
    case "filter-or":
      break;
    case "filter-condition":
      break;
    case "list-level-style-bullet":
      break;
    case "list-level-style-number":
      break;
    case "list-level-properties":
      break;
    case "sender-firstname":
    case "sender-lastname":
    case "sender-initials":
    case "sender-title":
    case "sender-position":
    case "sender-email":
    case "sender-phone-private":
    case "sender-fax":
    case "sender-company":
    case "sender-phone-work":
    case "sender-street":
    case "sender-city":
    case "sender-postal-code":
    case "sender-country":
    case "sender-state-or-province":
    case "author-name":
    case "author-initials":
    case "chapter":
    case "file-name":
    case "template-name":
    case "sheet-name":
      break;
    case "event-listener":
      break;
    case "initial-creator":
    case "creation-date":
    case "print-date":
    case "generator":
    case "document-statistic":
    case "user-defined":
    case "editing-duration":
    case "editing-cycles":
      break;
    case "config-item":
      break;
    case "page-number":
      break;
    case "page-count":
      break;
    case "time":
      break;
    case "cell-range-source":
      break;
    case "detective":
      break;
    case "operation":
      break;
    case "highlighted-range":
      break;
    case "data-pilot-table":
    case "source-cell-range":
    case "source-service":
    case "data-pilot-field":
    case "data-pilot-level":
    case "data-pilot-subtotals":
    case "data-pilot-subtotal":
    case "data-pilot-members":
    case "data-pilot-member":
    case "data-pilot-display-info":
    case "data-pilot-sort-info":
    case "data-pilot-layout-info":
    case "data-pilot-field-reference":
    case "data-pilot-groups":
    case "data-pilot-group":
    case "data-pilot-group-member":
      break;
    case "rect":
      break;
    case "dde-connection-decls":
    case "dde-connection-decl":
    case "dde-link":
    case "dde-source":
      break;
    case "properties":
      break;
    case "property":
      break;
    case "a":
      if (h[1] !== "/") {
        if (K = be(h[0], !1), !K.href) break;
        K.Target = Ge(K.href), delete K.href, K.Target.charAt(0) == "#" && K.Target.indexOf(".") > -1 ? (pe = ti(K.Target.slice(1)), K.Target = "#" + pe[0] + "!" + pe[1]) : K.Target.match(/^\.\.[\\\/]/) && (K.Target = K.Target.slice(3));
      }
      break;
    case "table-protection":
      break;
    case "data-pilot-grand-total":
      break;
    case "office-document-common-attrs":
      break;
    default:
      switch (h[2]) {
        case "dc:":
        case "calcext:":
        case "loext:":
        case "ooo:":
        case "chartooo:":
        case "draw:":
        case "style:":
        case "chart:":
        case "form:":
        case "uof:":
        case "表:":
        case "字:":
          break;
        default:
          if (r.WTF) throw new Error(h);
      }
  }
  var F = {
    Sheets: x,
    SheetNames: d,
    Workbook: Xe
  };
  return r.bookSheets && delete /*::(*/
  F.Sheets, F;
}
function Ef(e, t) {
  t = t || {}, Tt(e, "META-INF/manifest.xml") && Cu(Tr(e, "META-INF/manifest.xml"), t);
  var r = ht(e, "content.xml");
  if (!r) throw new Error("Missing content.xml in ODS / UOF file");
  var a = bl(tr(r), t);
  return Tt(e, "meta.xml") && (a.Props = _c(Tr(e, "meta.xml"))), a;
}
function Tf(e, t) {
  return bl(e, t);
}
var t_ = /* @__PURE__ */ function() {
  var e = [
    "<office:master-styles>",
    '<style:master-page style:name="mp1" style:page-layout-name="mp1">',
    "<style:header/>",
    '<style:header-left style:display="false"/>',
    "<style:footer/>",
    '<style:footer-left style:display="false"/>',
    "</style:master-page>",
    "</office:master-styles>"
  ].join(""), t = "<office:document-styles " + In({
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
    return kr + t;
  };
}(), yf = /* @__PURE__ */ function() {
  var e = function(i) {
    return er(i).replace(/  +/g, function(s) {
      return '<text:s text:c="' + s.length + '"/>';
    }).replace(/\t/g, "<text:tab/>").replace(/\n/g, "</text:p><text:p>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>");
  }, t = `          <table:table-cell />
`, r = `          <table:covered-table-cell/>
`, a = function(i, s, f) {
    var c = [];
    c.push('      <table:table table:name="' + er(s.SheetNames[f]) + `" table:style-name="ta1">
`);
    var l = 0, o = 0, u = st(i["!ref"] || "A1"), x = i["!merges"] || [], d = 0, v = Array.isArray(i);
    if (i["!cols"])
      for (o = 0; o <= u.e.c; ++o) c.push("        <table:table-column" + (i["!cols"][o] ? ' table:style-name="co' + i["!cols"][o].ods + '"' : "") + `></table:table-column>
`);
    var h = "", g = i["!rows"] || [];
    for (l = 0; l < u.s.r; ++l)
      h = g[l] ? ' table:style-name="ro' + g[l].ods + '"' : "", c.push("        <table:table-row" + h + `></table:table-row>
`);
    for (; l <= u.e.r; ++l) {
      for (h = g[l] ? ' table:style-name="ro' + g[l].ods + '"' : "", c.push("        <table:table-row" + h + `>
`), o = 0; o < u.s.c; ++o) c.push(t);
      for (; o <= u.e.c; ++o) {
        var T = !1, A = {}, k = "";
        for (d = 0; d != x.length; ++d)
          if (!(x[d].s.c > o) && !(x[d].s.r > l) && !(x[d].e.c < o) && !(x[d].e.r < l)) {
            (x[d].s.c != o || x[d].s.r != l) && (T = !0), A["table:number-columns-spanned"] = x[d].e.c - x[d].s.c + 1, A["table:number-rows-spanned"] = x[d].e.r - x[d].s.r + 1;
            break;
          }
        if (T) {
          c.push(r);
          continue;
        }
        var R = Ce({ r: l, c: o }), V = v ? (i[l] || [])[o] : i[R];
        if (V && V.f && (A["table:formula"] = er(Ev(V.f)), V.F && V.F.slice(0, R.length) == R)) {
          var N = st(V.F);
          A["table:number-matrix-columns-spanned"] = N.e.c - N.s.c + 1, A["table:number-matrix-rows-spanned"] = N.e.r - N.s.r + 1;
        }
        if (!V) {
          c.push(t);
          continue;
        }
        switch (V.t) {
          case "b":
            k = V.v ? "TRUE" : "FALSE", A["office:value-type"] = "boolean", A["office:boolean-value"] = V.v ? "true" : "false";
            break;
          case "n":
            k = V.w || String(V.v || 0), A["office:value-type"] = "float", A["office:value"] = V.v || 0;
            break;
          case "s":
          case "str":
            k = V.v == null ? "" : V.v, A["office:value-type"] = "string";
            break;
          case "d":
            k = V.w || nr(V.v).toISOString(), A["office:value-type"] = "date", A["office:date-value"] = nr(V.v).toISOString(), A["table:style-name"] = "ce1";
            break;
          default:
            c.push(t);
            continue;
        }
        var S = e(k);
        if (V.l && V.l.Target) {
          var z = V.l.Target;
          z = z.charAt(0) == "#" ? "#" + Tv(z.slice(1)) : z, z.charAt(0) != "#" && !z.match(/^\w+:/) && (z = "../" + z), S = oe("text:a", S, { "xlink:href": z.replace(/&/g, "&amp;") });
        }
        c.push("          " + oe("table:table-cell", oe("text:p", S, {}), A) + `
`);
      }
      c.push(`        </table:table-row>
`);
    }
    return c.push(`      </table:table>
`), c.join("");
  }, n = function(i, s) {
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
    s.SheetNames.map(function(l) {
      return s.Sheets[l];
    }).forEach(function(l) {
      if (l && l["!cols"]) {
        for (var o = 0; o < l["!cols"].length; ++o) if (l["!cols"][o]) {
          var u = l["!cols"][o];
          if (u.width == null && u.wpx == null && u.wch == null) continue;
          na(u), u.ods = f;
          var x = l["!cols"][o].wpx + "px";
          i.push('  <style:style style:name="co' + f + `" style:family="table-column">
`), i.push('   <style:table-column-properties fo:break-before="auto" style:column-width="' + x + `"/>
`), i.push(`  </style:style>
`), ++f;
        }
      }
    });
    var c = 0;
    s.SheetNames.map(function(l) {
      return s.Sheets[l];
    }).forEach(function(l) {
      if (l && l["!rows"]) {
        for (var o = 0; o < l["!rows"].length; ++o) if (l["!rows"][o]) {
          l["!rows"][o].ods = c;
          var u = l["!rows"][o].hpx + "px";
          i.push('  <style:style style:name="ro' + c + `" style:family="table-row">
`), i.push('   <style:table-row-properties fo:break-before="auto" style:row-height="' + u + `"/>
`), i.push(`  </style:style>
`), ++c;
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
    var c = [kr], l = In({
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
    }), o = In({
      "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
      "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
    });
    f.bookType == "fods" ? (c.push("<office:document" + l + o + `>
`), c.push(gc().replace(/office:document-meta/g, "office:meta"))) : c.push("<office:document-content" + l + `>
`), n(c, s), c.push(`  <office:body>
`), c.push(`    <office:spreadsheet>
`);
    for (var u = 0; u != s.SheetNames.length; ++u) c.push(a(s.Sheets[s.SheetNames[u]], s, u));
    return c.push(`    </office:spreadsheet>
`), c.push(`  </office:body>
`), f.bookType == "fods" ? c.push("</office:document>") : c.push("</office:document-content>"), c.join("");
  };
}();
function Dl(e, t) {
  if (t.bookType == "fods") return yf(e, t);
  var r = Ai(), a = "", n = [], i = [];
  return a = "mimetype", Le(r, a, "application/vnd.oasis.opendocument.spreadsheet"), a = "content.xml", Le(r, a, yf(e, t)), n.push([a, "text/xml"]), i.push([a, "ContentFile"]), a = "styles.xml", Le(r, a, t_(e, t)), n.push([a, "text/xml"]), i.push([a, "StylesFile"]), a = "meta.xml", Le(r, a, kr + gc(
    /*::wb, opts*/
  )), n.push([a, "text/xml"]), i.push([a, "MetadataFile"]), a = "manifest.rdf", Le(r, a, Iu(
    i
    /*, opts*/
  )), n.push([a, "application/rdf+xml"]), a = "META-INF/manifest.xml", Le(r, a, bu(
    n
    /*, opts*/
  )), r;
}
/*! sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
function Ca(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function gi(e) {
  return typeof TextDecoder < "u" ? new TextDecoder().decode(e) : tr(fa(e));
}
function a_(e) {
  return typeof TextEncoder < "u" ? new TextEncoder().encode(e) : ut(Ht(e));
}
function n_(e, t) {
  e:
    for (var r = 0; r <= e.length - t.length; ++r) {
      for (var a = 0; a < t.length; ++a)
        if (e[r + a] != t[a])
          continue e;
      return !0;
    }
  return !1;
}
function sa(e) {
  var t = e.reduce(function(n, i) {
    return n + i.length;
  }, 0), r = new Uint8Array(t), a = 0;
  return e.forEach(function(n) {
    r.set(n, a), a += n.length;
  }), r;
}
function Sf(e) {
  return e -= e >> 1 & 1431655765, e = (e & 858993459) + (e >> 2 & 858993459), (e + (e >> 4) & 252645135) * 16843009 >>> 24;
}
function i_(e, t) {
  for (var r = (e[t + 15] & 127) << 7 | e[t + 14] >> 1, a = e[t + 14] & 1, n = t + 13; n >= t; --n)
    a = a * 256 + e[n];
  return (e[t + 15] & 128 ? -a : a) * Math.pow(10, r - 6176);
}
function s_(e, t, r) {
  var a = Math.floor(r == 0 ? 0 : Math.LOG10E * Math.log(Math.abs(r))) + 6176 - 20, n = r / Math.pow(10, a - 6176);
  e[t + 15] |= a >> 7, e[t + 14] |= (a & 127) << 1;
  for (var i = 0; n >= 1; ++i, n /= 256)
    e[t + i] = n & 255;
  e[t + 15] |= r >= 0 ? 0 : 128;
}
function Un(e, t) {
  var r = t ? t[0] : 0, a = e[r] & 127;
  e:
    if (e[r++] >= 128 && (a |= (e[r] & 127) << 7, e[r++] < 128 || (a |= (e[r] & 127) << 14, e[r++] < 128) || (a |= (e[r] & 127) << 21, e[r++] < 128) || (a += (e[r] & 127) * Math.pow(2, 28), ++r, e[r++] < 128) || (a += (e[r] & 127) * Math.pow(2, 35), ++r, e[r++] < 128) || (a += (e[r] & 127) * Math.pow(2, 42), ++r, e[r++] < 128)))
      break e;
  return t && (t[0] = r), a;
}
function Ze(e) {
  var t = new Uint8Array(7);
  t[0] = e & 127;
  var r = 1;
  e:
    if (e > 127) {
      if (t[r - 1] |= 128, t[r] = e >> 7 & 127, ++r, e <= 16383 || (t[r - 1] |= 128, t[r] = e >> 14 & 127, ++r, e <= 2097151) || (t[r - 1] |= 128, t[r] = e >> 21 & 127, ++r, e <= 268435455) || (t[r - 1] |= 128, t[r] = e / 256 >>> 21 & 127, ++r, e <= 34359738367) || (t[r - 1] |= 128, t[r] = e / 65536 >>> 21 & 127, ++r, e <= 4398046511103))
        break e;
      t[r - 1] |= 128, t[r] = e / 16777216 >>> 21 & 127, ++r;
    }
  return t.slice(0, r);
}
function mr(e) {
  var t = 0, r = e[t] & 127;
  e:
    if (e[t++] >= 128) {
      if (r |= (e[t] & 127) << 7, e[t++] < 128 || (r |= (e[t] & 127) << 14, e[t++] < 128) || (r |= (e[t] & 127) << 21, e[t++] < 128))
        break e;
      r |= (e[t] & 127) << 28;
    }
  return r;
}
function Ke(e) {
  for (var t = [], r = [0]; r[0] < e.length; ) {
    var a = r[0], n = Un(e, r), i = n & 7;
    n = Math.floor(n / 8);
    var s = 0, f;
    if (n == 0)
      break;
    switch (i) {
      case 0:
        {
          for (var c = r[0]; e[r[0]++] >= 128; )
            ;
          f = e.slice(c, r[0]);
        }
        break;
      case 5:
        s = 4, f = e.slice(r[0], r[0] + s), r[0] += s;
        break;
      case 1:
        s = 8, f = e.slice(r[0], r[0] + s), r[0] += s;
        break;
      case 2:
        s = Un(e, r), f = e.slice(r[0], r[0] + s), r[0] += s;
        break;
      case 3:
      case 4:
      default:
        throw new Error("PB Type ".concat(i, " for Field ").concat(n, " at offset ").concat(a));
    }
    var l = { data: f, type: i };
    t[n] == null ? t[n] = [l] : t[n].push(l);
  }
  return t;
}
function Br(e) {
  var t = [];
  return e.forEach(function(r, a) {
    r.forEach(function(n) {
      n.data && (t.push(Ze(a * 8 + n.type)), n.type == 2 && t.push(Ze(n.data.length)), t.push(n.data));
    });
  }), sa(t);
}
function es(e, t) {
  return (e == null ? void 0 : e.map(function(r) {
    return t(r.data);
  })) || [];
}
function kt(e) {
  for (var t, r = [], a = [0]; a[0] < e.length; ) {
    var n = Un(e, a), i = Ke(e.slice(a[0], a[0] + n));
    a[0] += n;
    var s = {
      id: mr(i[1][0].data),
      messages: []
    };
    i[2].forEach(function(f) {
      var c = Ke(f.data), l = mr(c[3][0].data);
      s.messages.push({
        meta: c,
        data: e.slice(a[0], a[0] + l)
      }), a[0] += l;
    }), (t = i[3]) != null && t[0] && (s.merge = mr(i[3][0].data) >>> 0 > 0), r.push(s);
  }
  return r;
}
function $a(e) {
  var t = [];
  return e.forEach(function(r) {
    var a = [];
    a[1] = [{ data: Ze(r.id), type: 0 }], a[2] = [], r.merge != null && (a[3] = [{ data: Ze(+!!r.merge), type: 0 }]);
    var n = [];
    r.messages.forEach(function(s) {
      n.push(s.data), s.meta[3] = [{ type: 0, data: Ze(s.data.length) }], a[2].push({ data: Br(s.meta), type: 2 });
    });
    var i = Br(a);
    t.push(Ze(i.length)), t.push(i), n.forEach(function(s) {
      return t.push(s);
    });
  }), sa(t);
}
function f_(e, t) {
  if (e != 0)
    throw new Error("Unexpected Snappy chunk type ".concat(e));
  for (var r = [0], a = Un(t, r), n = []; r[0] < t.length; ) {
    var i = t[r[0]] & 3;
    if (i == 0) {
      var s = t[r[0]++] >> 2;
      if (s < 60)
        ++s;
      else {
        var f = s - 59;
        s = t[r[0]], f > 1 && (s |= t[r[0] + 1] << 8), f > 2 && (s |= t[r[0] + 2] << 16), f > 3 && (s |= t[r[0] + 3] << 24), s >>>= 0, s++, r[0] += f;
      }
      n.push(t.slice(r[0], r[0] + s)), r[0] += s;
      continue;
    } else {
      var c = 0, l = 0;
      if (i == 1 ? (l = (t[r[0]] >> 2 & 7) + 4, c = (t[r[0]++] & 224) << 3, c |= t[r[0]++]) : (l = (t[r[0]++] >> 2) + 1, i == 2 ? (c = t[r[0]] | t[r[0] + 1] << 8, r[0] += 2) : (c = (t[r[0]] | t[r[0] + 1] << 8 | t[r[0] + 2] << 16 | t[r[0] + 3] << 24) >>> 0, r[0] += 4)), n = [sa(n)], c == 0)
        throw new Error("Invalid offset 0");
      if (c > n[0].length)
        throw new Error("Invalid offset beyond length");
      if (l >= c)
        for (n.push(n[0].slice(-c)), l -= c; l >= n[n.length - 1].length; )
          n.push(n[n.length - 1]), l -= n[n.length - 1].length;
      n.push(n[0].slice(-c, -c + l));
    }
  }
  var o = sa(n);
  if (o.length != a)
    throw new Error("Unexpected length: ".concat(o.length, " != ").concat(a));
  return o;
}
function Et(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var a = e[r++], n = e[r] | e[r + 1] << 8 | e[r + 2] << 16;
    r += 3, t.push(f_(a, e.slice(r, r + n))), r += n;
  }
  if (r !== e.length)
    throw new Error("data is not a valid framed stream!");
  return sa(t);
}
function ja(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var a = Math.min(e.length - r, 268435455), n = new Uint8Array(4);
    t.push(n);
    var i = Ze(a), s = i.length;
    t.push(i), a <= 60 ? (s++, t.push(new Uint8Array([a - 1 << 2]))) : a <= 256 ? (s += 2, t.push(new Uint8Array([240, a - 1 & 255]))) : a <= 65536 ? (s += 3, t.push(new Uint8Array([244, a - 1 & 255, a - 1 >> 8 & 255]))) : a <= 16777216 ? (s += 4, t.push(new Uint8Array([248, a - 1 & 255, a - 1 >> 8 & 255, a - 1 >> 16 & 255]))) : a <= 4294967296 && (s += 5, t.push(new Uint8Array([252, a - 1 & 255, a - 1 >> 8 & 255, a - 1 >> 16 & 255, a - 1 >>> 24 & 255]))), t.push(e.slice(r, r + a)), s += a, n[0] = 0, n[1] = s & 255, n[2] = s >> 8 & 255, n[3] = s >> 16 & 255, r += a;
  }
  return sa(t);
}
function c_(e, t, r, a) {
  var n = Ca(e), i = n.getUint32(4, !0), s = (a > 1 ? 12 : 8) + Sf(i & (a > 1 ? 3470 : 398)) * 4, f = -1, c = -1, l = NaN, o = new Date(2001, 0, 1);
  i & 512 && (f = n.getUint32(s, !0), s += 4), s += Sf(i & (a > 1 ? 12288 : 4096)) * 4, i & 16 && (c = n.getUint32(s, !0), s += 4), i & 32 && (l = n.getFloat64(s, !0), s += 8), i & 64 && (o.setTime(o.getTime() + n.getFloat64(s, !0) * 1e3), s += 8);
  var u;
  switch (e[2]) {
    case 0:
      break;
    case 2:
      u = { t: "n", v: l };
      break;
    case 3:
      u = { t: "s", v: t[c] };
      break;
    case 5:
      u = { t: "d", v: o };
      break;
    case 6:
      u = { t: "b", v: l > 0 };
      break;
    case 7:
      u = { t: "n", v: l / 86400 };
      break;
    case 8:
      u = { t: "e", v: 0 };
      break;
    case 9:
      if (f > -1)
        u = { t: "s", v: r[f] };
      else if (c > -1)
        u = { t: "s", v: t[c] };
      else if (!isNaN(l))
        u = { t: "n", v: l };
      else
        throw new Error("Unsupported cell type ".concat(e.slice(0, 4)));
      break;
    default:
      throw new Error("Unsupported cell type ".concat(e.slice(0, 4)));
  }
  return u;
}
function l_(e, t, r) {
  var a = Ca(e), n = a.getUint32(8, !0), i = 12, s = -1, f = -1, c = NaN, l = NaN, o = new Date(2001, 0, 1);
  n & 1 && (c = i_(e, i), i += 16), n & 2 && (l = a.getFloat64(i, !0), i += 8), n & 4 && (o.setTime(o.getTime() + a.getFloat64(i, !0) * 1e3), i += 8), n & 8 && (f = a.getUint32(i, !0), i += 4), n & 16 && (s = a.getUint32(i, !0), i += 4);
  var u;
  switch (e[1]) {
    case 0:
      break;
    case 2:
      u = { t: "n", v: c };
      break;
    case 3:
      u = { t: "s", v: t[f] };
      break;
    case 5:
      u = { t: "d", v: o };
      break;
    case 6:
      u = { t: "b", v: l > 0 };
      break;
    case 7:
      u = { t: "n", v: l / 86400 };
      break;
    case 8:
      u = { t: "e", v: 0 };
      break;
    case 9:
      if (s > -1)
        u = { t: "s", v: r[s] };
      else
        throw new Error("Unsupported cell type ".concat(e[1], " : ").concat(n & 31, " : ").concat(e.slice(0, 4)));
      break;
    case 10:
      u = { t: "n", v: c };
      break;
    default:
      throw new Error("Unsupported cell type ".concat(e[1], " : ").concat(n & 31, " : ").concat(e.slice(0, 4)));
  }
  return u;
}
function ni(e, t) {
  var r = new Uint8Array(32), a = Ca(r), n = 12, i = 0;
  switch (r[0] = 5, e.t) {
    case "n":
      r[1] = 2, s_(r, n, e.v), i |= 1, n += 16;
      break;
    case "b":
      r[1] = 6, a.setFloat64(n, e.v ? 1 : 0, !0), i |= 2, n += 8;
      break;
    case "s":
      if (t.indexOf(e.v) == -1)
        throw new Error("Value ".concat(e.v, " missing from SST!"));
      r[1] = 3, a.setUint32(n, t.indexOf(e.v), !0), i |= 8, n += 4;
      break;
    default:
      throw "unsupported cell type " + e.t;
  }
  return a.setUint32(8, i, !0), r.slice(0, n);
}
function ii(e, t) {
  var r = new Uint8Array(32), a = Ca(r), n = 12, i = 0;
  switch (r[0] = 3, e.t) {
    case "n":
      r[2] = 2, a.setFloat64(n, e.v, !0), i |= 32, n += 8;
      break;
    case "b":
      r[2] = 6, a.setFloat64(n, e.v ? 1 : 0, !0), i |= 32, n += 8;
      break;
    case "s":
      if (t.indexOf(e.v) == -1)
        throw new Error("Value ".concat(e.v, " missing from SST!"));
      r[2] = 3, a.setUint32(n, t.indexOf(e.v), !0), i |= 16, n += 4;
      break;
    default:
      throw "unsupported cell type " + e.t;
  }
  return a.setUint32(4, i, !0), r.slice(0, n);
}
function o_(e, t, r) {
  switch (e[0]) {
    case 0:
    case 1:
    case 2:
    case 3:
      return c_(e, t, r, e[0]);
    case 5:
      return l_(e, t, r);
    default:
      throw new Error("Unsupported payload version ".concat(e[0]));
  }
}
function zr(e) {
  var t = Ke(e);
  return Un(t[1][0].data);
}
function Ff(e, t) {
  var r = Ke(t.data), a = mr(r[1][0].data), n = r[3], i = [];
  return (n || []).forEach(function(s) {
    var f = Ke(s.data), c = mr(f[1][0].data) >>> 0;
    switch (a) {
      case 1:
        i[c] = gi(f[3][0].data);
        break;
      case 8:
        {
          var l = e[zr(f[9][0].data)][0], o = Ke(l.data), u = e[zr(o[1][0].data)][0], x = mr(u.meta[1][0].data);
          if (x != 2001)
            throw new Error("2000 unexpected reference to ".concat(x));
          var d = Ke(u.data);
          i[c] = d[3].map(function(v) {
            return gi(v.data);
          }).join("");
        }
        break;
    }
  }), i;
}
function u_(e, t) {
  var r, a, n, i, s, f, c, l, o, u, x, d, v, h, g = Ke(e), T = mr(g[1][0].data) >>> 0, A = mr(g[2][0].data) >>> 0, k = ((a = (r = g[8]) == null ? void 0 : r[0]) == null ? void 0 : a.data) && mr(g[8][0].data) > 0 || !1, R, V;
  if ((i = (n = g[7]) == null ? void 0 : n[0]) != null && i.data && t != 0)
    R = (f = (s = g[7]) == null ? void 0 : s[0]) == null ? void 0 : f.data, V = (l = (c = g[6]) == null ? void 0 : c[0]) == null ? void 0 : l.data;
  else if ((u = (o = g[4]) == null ? void 0 : o[0]) != null && u.data && t != 1)
    R = (d = (x = g[4]) == null ? void 0 : x[0]) == null ? void 0 : d.data, V = (h = (v = g[3]) == null ? void 0 : v[0]) == null ? void 0 : h.data;
  else
    throw "NUMBERS Tile missing ".concat(t, " cell storage");
  for (var N = k ? 4 : 1, S = Ca(R), z = [], L = 0; L < R.length / 2; ++L) {
    var J = S.getUint16(L * 2, !0);
    J < 65535 && z.push([L, J]);
  }
  if (z.length != A)
    throw "Expected ".concat(A, " cells, found ").concat(z.length);
  var j = [];
  for (L = 0; L < z.length - 1; ++L)
    j[z[L][0]] = V.subarray(z[L][1] * N, z[L + 1][1] * N);
  return z.length >= 1 && (j[z[z.length - 1][0]] = V.subarray(z[z.length - 1][1] * N)), { R: T, cells: j };
}
function h_(e, t) {
  var r, a = Ke(t.data), n = (r = a == null ? void 0 : a[7]) != null && r[0] ? mr(a[7][0].data) >>> 0 > 0 ? 1 : 0 : -1, i = es(a[5], function(s) {
    return u_(s, n);
  });
  return {
    nrows: mr(a[4][0].data) >>> 0,
    data: i.reduce(function(s, f) {
      return s[f.R] || (s[f.R] = []), f.cells.forEach(function(c, l) {
        if (s[f.R][l])
          throw new Error("Duplicate cell r=".concat(f.R, " c=").concat(l));
        s[f.R][l] = c;
      }), s;
    }, [])
  };
}
function x_(e, t, r) {
  var a, n = Ke(t.data), i = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } };
  if (i.e.r = (mr(n[6][0].data) >>> 0) - 1, i.e.r < 0)
    throw new Error("Invalid row varint ".concat(n[6][0].data));
  if (i.e.c = (mr(n[7][0].data) >>> 0) - 1, i.e.c < 0)
    throw new Error("Invalid col varint ".concat(n[7][0].data));
  r["!ref"] = Ne(i);
  var s = Ke(n[4][0].data), f = Ff(e, e[zr(s[4][0].data)][0]), c = (a = s[17]) != null && a[0] ? Ff(e, e[zr(s[17][0].data)][0]) : [], l = Ke(s[3][0].data), o = 0;
  l[1].forEach(function(u) {
    var x = Ke(u.data), d = e[zr(x[2][0].data)][0], v = mr(d.meta[1][0].data);
    if (v != 6002)
      throw new Error("6001 unexpected reference to ".concat(v));
    var h = h_(e, d);
    h.data.forEach(function(g, T) {
      g.forEach(function(A, k) {
        var R = Ce({ r: o + T, c: k }), V = o_(A, f, c);
        V && (r[R] = V);
      });
    }), o += h.nrows;
  });
}
function d_(e, t) {
  var r = Ke(t.data), a = { "!ref": "A1" }, n = e[zr(r[2][0].data)], i = mr(n[0].meta[1][0].data);
  if (i != 6001)
    throw new Error("6000 unexpected reference to ".concat(i));
  return x_(e, n[0], a), a;
}
function p_(e, t) {
  var r, a = Ke(t.data), n = {
    name: (r = a[1]) != null && r[0] ? gi(a[1][0].data) : "",
    sheets: []
  }, i = es(a[2], zr);
  return i.forEach(function(s) {
    e[s].forEach(function(f) {
      var c = mr(f.meta[1][0].data);
      c == 6e3 && n.sheets.push(d_(e, f));
    });
  }), n;
}
function v_(e, t) {
  var r = is(), a = Ke(t.data), n = es(a[1], zr);
  if (n.forEach(function(i) {
    e[i].forEach(function(s) {
      var f = mr(s.meta[1][0].data);
      if (f == 2) {
        var c = p_(e, s);
        c.sheets.forEach(function(l, o) {
          ss(r, l, o == 0 ? c.name : c.name + "_" + o, !0);
        });
      }
    });
  }), r.SheetNames.length == 0)
    throw new Error("Empty NUMBERS file");
  return r;
}
function si(e) {
  var t, r, a, n, i = {}, s = [];
  if (e.FullPaths.forEach(function(c) {
    if (c.match(/\.iwpv2/))
      throw new Error("Unsupported password protection");
  }), e.FileIndex.forEach(function(c) {
    if (c.name.match(/\.iwa$/)) {
      var l;
      try {
        l = Et(c.content);
      } catch (u) {
        return console.log("?? " + c.content.length + " " + (u.message || u));
      }
      var o;
      try {
        o = kt(l);
      } catch (u) {
        return console.log("## " + (u.message || u));
      }
      o.forEach(function(u) {
        i[u.id] = u.messages, s.push(u.id);
      });
    }
  }), !s.length)
    throw new Error("File has no messages");
  var f = ((n = (a = (r = (t = i == null ? void 0 : i[1]) == null ? void 0 : t[0]) == null ? void 0 : r.meta) == null ? void 0 : a[1]) == null ? void 0 : n[0].data) && mr(i[1][0].meta[1][0].data) == 1 && i[1][0];
  if (f || s.forEach(function(c) {
    i[c].forEach(function(l) {
      var o = mr(l.meta[1][0].data) >>> 0;
      if (o == 1)
        if (!f)
          f = l;
        else
          throw new Error("Document has multiple roots");
    });
  }), !f)
    throw new Error("Cannot find Document root");
  return v_(i, f);
}
function m_(e, t, r) {
  var a, n, i, s;
  if (!((a = e[6]) != null && a[0]) || !((n = e[7]) != null && n[0]))
    throw "Mutation only works on post-BNC storages!";
  var f = ((s = (i = e[8]) == null ? void 0 : i[0]) == null ? void 0 : s.data) && mr(e[8][0].data) > 0 || !1;
  if (f)
    throw "Math only works with normal offsets";
  for (var c = 0, l = Ca(e[7][0].data), o = 0, u = [], x = Ca(e[4][0].data), d = 0, v = [], h = 0; h < t.length; ++h) {
    if (t[h] == null) {
      l.setUint16(h * 2, 65535, !0), x.setUint16(h * 2, 65535);
      continue;
    }
    l.setUint16(h * 2, o, !0), x.setUint16(h * 2, d, !0);
    var g, T;
    switch (typeof t[h]) {
      case "string":
        g = ni({ t: "s", v: t[h] }, r), T = ii({ t: "s", v: t[h] }, r);
        break;
      case "number":
        g = ni({ t: "n", v: t[h] }, r), T = ii({ t: "n", v: t[h] }, r);
        break;
      case "boolean":
        g = ni({ t: "b", v: t[h] }, r), T = ii({ t: "b", v: t[h] }, r);
        break;
      default:
        throw new Error("Unsupported value " + t[h]);
    }
    u.push(g), o += g.length, v.push(T), d += T.length, ++c;
  }
  for (e[2][0].data = Ze(c); h < e[7][0].data.length / 2; ++h)
    l.setUint16(h * 2, 65535, !0), x.setUint16(h * 2, 65535, !0);
  return e[6][0].data = sa(u), e[3][0].data = sa(v), c;
}
function g_(e, t) {
  if (!t || !t.numbers)
    throw new Error("Must pass a `numbers` option -- check the README");
  var r = e.Sheets[e.SheetNames[0]];
  e.SheetNames.length > 1 && console.error("The Numbers writer currently writes only the first table");
  var a = st(r["!ref"]);
  a.s.r = a.s.c = 0;
  var n = !1;
  a.e.c > 9 && (n = !0, a.e.c = 9), a.e.r > 49 && (n = !0, a.e.r = 49), n && console.error("The Numbers writer is currently limited to ".concat(Ne(a)));
  var i = E0(r, { range: a, header: 1 }), s = ["~Sh33tJ5~"];
  i.forEach(function(M) {
    return M.forEach(function(O) {
      typeof O == "string" && s.push(O);
    });
  });
  var f = {}, c = [], l = ye.read(t.numbers, { type: "base64" });
  l.FileIndex.map(function(M, O) {
    return [M, l.FullPaths[O]];
  }).forEach(function(M) {
    var O = M[0], P = M[1];
    if (O.type == 2 && O.name.match(/\.iwa/)) {
      var Q = O.content, fe = Et(Q), ce = kt(fe);
      ce.forEach(function(ie) {
        c.push(ie.id), f[ie.id] = { deps: [], location: P, type: mr(ie.messages[0].meta[1][0].data) };
      });
    }
  }), c.sort(function(M, O) {
    return M - O;
  });
  var o = c.filter(function(M) {
    return M > 1;
  }).map(function(M) {
    return [M, Ze(M)];
  });
  l.FileIndex.map(function(M, O) {
    return [M, l.FullPaths[O]];
  }).forEach(function(M) {
    var O = M[0];
    if (M[1], !!O.name.match(/\.iwa/)) {
      var P = kt(Et(O.content));
      P.forEach(function(Q) {
        Q.messages.forEach(function(fe) {
          o.forEach(function(ce) {
            Q.messages.some(function(ie) {
              return mr(ie.meta[1][0].data) != 11006 && n_(ie.data, ce[1]);
            }) && f[ce[0]].deps.push(Q.id);
          });
        });
      });
    }
  });
  for (var u = ye.find(l, f[1].location), x = kt(Et(u.content)), d, v = 0; v < x.length; ++v) {
    var h = x[v];
    h.id == 1 && (d = h);
  }
  var g = zr(Ke(d.messages[0].data)[1][0].data);
  for (u = ye.find(l, f[g].location), x = kt(Et(u.content)), v = 0; v < x.length; ++v)
    h = x[v], h.id == g && (d = h);
  for (g = zr(Ke(d.messages[0].data)[2][0].data), u = ye.find(l, f[g].location), x = kt(Et(u.content)), v = 0; v < x.length; ++v)
    h = x[v], h.id == g && (d = h);
  for (g = zr(Ke(d.messages[0].data)[2][0].data), u = ye.find(l, f[g].location), x = kt(Et(u.content)), v = 0; v < x.length; ++v)
    h = x[v], h.id == g && (d = h);
  var T = Ke(d.messages[0].data);
  {
    T[6][0].data = Ze(a.e.r + 1), T[7][0].data = Ze(a.e.c + 1);
    var A = zr(T[46][0].data), k = ye.find(l, f[A].location), R = kt(Et(k.content));
    {
      for (var V = 0; V < R.length && R[V].id != A; ++V)
        ;
      if (R[V].id != A)
        throw "Bad ColumnRowUIDMapArchive";
      var N = Ke(R[V].messages[0].data);
      N[1] = [], N[2] = [], N[3] = [];
      for (var S = 0; S <= a.e.c; ++S) {
        var z = [];
        z[1] = z[2] = [{ type: 0, data: Ze(S + 420690) }], N[1].push({ type: 2, data: Br(z) }), N[2].push({ type: 0, data: Ze(S) }), N[3].push({ type: 0, data: Ze(S) });
      }
      N[4] = [], N[5] = [], N[6] = [];
      for (var L = 0; L <= a.e.r; ++L)
        z = [], z[1] = z[2] = [{ type: 0, data: Ze(L + 726270) }], N[4].push({ type: 2, data: Br(z) }), N[5].push({ type: 0, data: Ze(L) }), N[6].push({ type: 0, data: Ze(L) });
      R[V].messages[0].data = Br(N);
    }
    k.content = ja($a(R)), k.size = k.content.length, delete T[46];
    var J = Ke(T[4][0].data);
    {
      J[7][0].data = Ze(a.e.r + 1);
      var j = Ke(J[1][0].data), H = zr(j[2][0].data);
      k = ye.find(l, f[H].location), R = kt(Et(k.content));
      {
        if (R[0].id != H)
          throw "Bad HeaderStorageBucket";
        var re = Ke(R[0].messages[0].data);
        for (L = 0; L < i.length; ++L) {
          var me = Ke(re[2][0].data);
          me[1][0].data = Ze(L), me[4][0].data = Ze(i[L].length), re[2][L] = { type: re[2][0].type, data: Br(me) };
        }
        R[0].messages[0].data = Br(re);
      }
      k.content = ja($a(R)), k.size = k.content.length;
      var xe = zr(J[2][0].data);
      k = ye.find(l, f[xe].location), R = kt(Et(k.content));
      {
        if (R[0].id != xe)
          throw "Bad HeaderStorageBucket";
        for (re = Ke(R[0].messages[0].data), S = 0; S <= a.e.c; ++S)
          me = Ke(re[2][0].data), me[1][0].data = Ze(S), me[4][0].data = Ze(a.e.r + 1), re[2][S] = { type: re[2][0].type, data: Br(me) };
        R[0].messages[0].data = Br(re);
      }
      k.content = ja($a(R)), k.size = k.content.length;
      var ve = zr(J[4][0].data);
      (function() {
        for (var M = ye.find(l, f[ve].location), O = kt(Et(M.content)), P, Q = 0; Q < O.length; ++Q) {
          var fe = O[Q];
          fe.id == ve && (P = fe);
        }
        var ce = Ke(P.messages[0].data);
        {
          ce[3] = [];
          var ie = [];
          s.forEach(function(F, rr) {
            ie[1] = [{ type: 0, data: Ze(rr) }], ie[2] = [{ type: 0, data: Ze(1) }], ie[3] = [{ type: 2, data: a_(F) }], ce[3].push({ type: 2, data: Br(ie) });
          });
        }
        P.messages[0].data = Br(ce);
        var ne = $a(O), Ie = ja(ne);
        M.content = Ie, M.size = M.content.length;
      })();
      var de = Ke(J[3][0].data);
      {
        var Xe = de[1][0];
        delete de[2];
        var K = Ke(Xe.data);
        {
          var pe = zr(K[2][0].data);
          (function() {
            for (var M = ye.find(l, f[pe].location), O = kt(Et(M.content)), P, Q = 0; Q < O.length; ++Q) {
              var fe = O[Q];
              fe.id == pe && (P = fe);
            }
            var ce = Ke(P.messages[0].data);
            {
              delete ce[6], delete de[7];
              var ie = new Uint8Array(ce[5][0].data);
              ce[5] = [];
              for (var ne = 0, Ie = 0; Ie <= a.e.r; ++Ie) {
                var F = Ke(ie);
                ne += m_(F, i[Ie], s), F[1][0].data = Ze(Ie), ce[5].push({ data: Br(F), type: 2 });
              }
              ce[1] = [{ type: 0, data: Ze(a.e.c + 1) }], ce[2] = [{ type: 0, data: Ze(a.e.r + 1) }], ce[3] = [{ type: 0, data: Ze(ne) }], ce[4] = [{ type: 0, data: Ze(a.e.r + 1) }];
            }
            P.messages[0].data = Br(ce);
            var rr = $a(O), He = ja(rr);
            M.content = He, M.size = M.content.length;
          })();
        }
        Xe.data = Br(K);
      }
      J[3][0].data = Br(de);
    }
    T[4][0].data = Br(J);
  }
  d.messages[0].data = Br(T);
  var we = $a(x), C = ja(we);
  return u.content = C, u.size = u.content.length, l;
}
function Il(e) {
  return function(r) {
    for (var a = 0; a != e.length; ++a) {
      var n = e[a];
      r[n[0]] === void 0 && (r[n[0]] = n[1]), n[2] === "n" && (r[n[0]] = Number(r[n[0]]));
    }
  };
}
function rs(e) {
  Il([
    ["cellNF", !1],
    /* emit cell number format string as .z */
    ["cellHTML", !0],
    /* emit html string as .h */
    ["cellFormula", !0],
    /* emit formulae as .f */
    ["cellStyles", !1],
    /* emits style/theme as .s */
    ["cellText", !0],
    /* emit formatted text as .w */
    ["cellDates", !1],
    /* emit date cells with type `d` */
    ["sheetStubs", !1],
    /* emit empty cells */
    ["sheetRows", 0, "n"],
    /* read n rows (0 = read all rows) */
    ["bookDeps", !1],
    /* parse calculation chains */
    ["bookSheets", !1],
    /* only try to get sheet names (no Sheets) */
    ["bookProps", !1],
    /* only try to get properties (no Sheets) */
    ["bookFiles", !1],
    /* include raw file structure (keys, files, cfb) */
    ["bookVBA", !1],
    /* include vba raw data (vbaraw) */
    ["password", ""],
    /* password */
    ["WTF", !1]
    /* WTF mode (throws errors) */
  ])(e);
}
function ts(e) {
  Il([
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
function __(e) {
  return Ve.WS.indexOf(e) > -1 ? "sheet" : e == Ve.CS ? "chart" : e == Ve.DS ? "dialog" : e == Ve.MS ? "macro" : e && e.length ? e : "sheet";
}
function w_(e, t) {
  if (!e) return 0;
  try {
    e = t.map(function(a) {
      return a.id || (a.id = a.strRelID), [a.name, e["!id"][a.id].Target, __(e["!id"][a.id].Type)];
    });
  } catch {
    return null;
  }
  return !e || e.length === 0 ? null : e;
}
function k_(e, t, r, a, n, i, s, f, c, l, o, u) {
  try {
    i[a] = En(ht(e, r, !0), t);
    var x = Tr(e, t), d;
    switch (f) {
      case "sheet":
        d = X2(x, t, n, c, i[a], l, o, u);
        break;
      case "chart":
        if (d = z2(x, t, n, c, i[a], l, o, u), !d || !d["!drawel"]) break;
        var v = gn(d["!drawel"].Target, t), h = Nn(v), g = Dd(ht(e, v, !0), En(ht(e, h, !0), v)), T = gn(g, v), A = Nn(T);
        d = m2(ht(e, T, !0), T, c, En(ht(e, A, !0), T), l, d);
        break;
      case "macro":
        d = G2(x, t, n, c, i[a], l, o, u);
        break;
      case "dialog":
        d = $2(x, t, n, c, i[a], l, o, u);
        break;
      default:
        throw new Error("Unrecognized sheet type " + f);
    }
    s[a] = d;
    var k = [];
    i && i[a] && gr(i[a]).forEach(function(R) {
      var V = "";
      if (i[a][R].Type == Ve.CMNT) {
        V = gn(i[a][R].Target, t);
        var N = J2(Tr(e, V, !0), V, c);
        if (!N || !N.length) return;
        uf(d, N, !1);
      }
      i[a][R].Type == Ve.TCMNT && (V = gn(i[a][R].Target, t), k = k.concat(Od(Tr(e, V, !0), c)));
    }), k && k.length && uf(d, k, !0, c.people || []);
  } catch (R) {
    if (c.WTF) throw R;
  }
}
function _t(e) {
  return e.charAt(0) == "/" ? e.slice(1) : e;
}
function E_(e, t) {
  if (nn(), t = t || {}, rs(t), Tt(e, "META-INF/manifest.xml") || Tt(e, "objectdata.xml")) return Ef(e, t);
  if (Tt(e, "Index/Document.iwa")) {
    if (typeof Uint8Array > "u") throw new Error("NUMBERS file parsing requires Uint8Array support");
    if (typeof si < "u") {
      if (e.FileIndex) return si(e);
      var r = ye.utils.cfb_new();
      return Is(e).forEach(function(me) {
        Le(r, me, No(e, me));
      }), si(r);
    }
    throw new Error("Unsupported NUMBERS file");
  }
  if (!Tt(e, "[Content_Types].xml"))
    throw Tt(e, "index.xml.gz") ? new Error("Unsupported NUMBERS 08 file") : Tt(e, "index.xml") ? new Error("Unsupported NUMBERS 09 file") : new Error("Unsupported ZIP file");
  var a = Is(e), n = Fu(ht(e, "[Content_Types].xml")), i = !1, s, f;
  if (n.workbooks.length === 0 && (f = "xl/workbook.xml", Tr(e, f, !0) && n.workbooks.push(f)), n.workbooks.length === 0) {
    if (f = "xl/workbook.bin", !Tr(e, f, !0)) throw new Error("Could not find workbook");
    n.workbooks.push(f), i = !0;
  }
  n.workbooks[0].slice(-3) == "bin" && (i = !0);
  var c = {}, l = {};
  if (!t.bookSheets && !t.bookProps) {
    if (Tn = [], n.sst) try {
      Tn = Y2(Tr(e, _t(n.sst)), n.sst, t);
    } catch (me) {
      if (t.WTF) throw me;
    }
    t.cellStyles && n.themes.length && (c = K2(ht(e, n.themes[0].replace(/^\//, ""), !0) || "", n.themes[0], t)), n.style && (l = j2(Tr(e, _t(n.style)), n.style, c, t));
  }
  n.links.map(function(me) {
    try {
      var xe = En(ht(e, Nn(_t(me))), me);
      return Z2(Tr(e, _t(me)), xe, me, t);
    } catch {
    }
  });
  var o = H2(Tr(e, _t(n.workbooks[0])), n.workbooks[0], t), u = {}, x = "";
  n.coreprops.length && (x = Tr(e, _t(n.coreprops[0]), !0), x && (u = _c(x)), n.extprops.length !== 0 && (x = Tr(e, _t(n.extprops[0]), !0), x && Nu(x, u, t)));
  var d = {};
  (!t.bookSheets || t.bookProps) && n.custprops.length !== 0 && (x = ht(e, _t(n.custprops[0]), !0), x && (d = Lu(x, t)));
  var v = {};
  if ((t.bookSheets || t.bookProps) && (o.Sheets ? s = o.Sheets.map(function(xe) {
    return xe.name;
  }) : u.Worksheets && u.SheetNames.length > 0 && (s = u.SheetNames), t.bookProps && (v.Props = u, v.Custprops = d), t.bookSheets && typeof s < "u" && (v.SheetNames = s), t.bookSheets ? v.SheetNames : t.bookProps))
    return v;
  s = {};
  var h = {};
  t.bookDeps && n.calcchain && (h = q2(Tr(e, _t(n.calcchain)), n.calcchain));
  var g = 0, T = {}, A, k;
  {
    var R = o.Sheets;
    u.Worksheets = R.length, u.SheetNames = [];
    for (var V = 0; V != R.length; ++V)
      u.SheetNames[V] = R[V].name;
  }
  var N = i ? "bin" : "xml", S = n.workbooks[0].lastIndexOf("/"), z = (n.workbooks[0].slice(0, S + 1) + "_rels/" + n.workbooks[0].slice(S + 1) + ".rels").replace(/^\//, "");
  Tt(e, z) || (z = "xl/_rels/workbook." + N + ".rels");
  var L = En(ht(e, z, !0), z.replace(/_rels.*/, "s5s"));
  (n.metadata || []).length >= 1 && (t.xlmeta = Q2(Tr(e, _t(n.metadata[0])), n.metadata[0], t)), (n.people || []).length >= 1 && (t.people = Rd(Tr(e, _t(n.people[0])), t)), L && (L = w_(L, o.Sheets));
  var J = Tr(e, "xl/worksheets/sheet.xml", !0) ? 1 : 0;
  e: for (g = 0; g != u.Worksheets; ++g) {
    var j = "sheet";
    if (L && L[g] ? (A = "xl/" + L[g][1].replace(/[\/]?xl\//, ""), Tt(e, A) || (A = L[g][1]), Tt(e, A) || (A = z.replace(/_rels\/.*$/, "") + L[g][1]), j = L[g][2]) : (A = "xl/worksheets/sheet" + (g + 1 - J) + "." + N, A = A.replace(/sheet0\./, "sheet.")), k = A.replace(/^(.*)(\/)([^\/]*)$/, "$1/_rels/$3.rels"), t && t.sheets != null) switch (typeof t.sheets) {
      case "number":
        if (g != t.sheets) continue e;
        break;
      case "string":
        if (u.SheetNames[g].toLowerCase() != t.sheets.toLowerCase()) continue e;
        break;
      default:
        if (Array.isArray && Array.isArray(t.sheets)) {
          for (var H = !1, re = 0; re != t.sheets.length; ++re)
            typeof t.sheets[re] == "number" && t.sheets[re] == g && (H = 1), typeof t.sheets[re] == "string" && t.sheets[re].toLowerCase() == u.SheetNames[g].toLowerCase() && (H = 1);
          if (!H) continue e;
        }
    }
    k_(e, A, k, u.SheetNames[g], g, T, s, j, t, o, c, l);
  }
  return v = {
    Directory: n,
    Workbook: o,
    Props: u,
    Custprops: d,
    Deps: h,
    Sheets: s,
    SheetNames: u.SheetNames,
    Strings: Tn,
    Styles: l,
    Themes: c,
    SSF: ir(Fe)
  }, t && t.bookFiles && (e.files ? (v.keys = a, v.files = e.files) : (v.keys = [], v.files = {}, e.FullPaths.forEach(function(me, xe) {
    me = me.replace(/^Root Entry[\/]/, ""), v.keys.push(me), v.files[me] = e.FileIndex[xe];
  }))), t && t.bookVBA && (n.vba.length > 0 ? v.vbaraw = Tr(e, _t(n.vba[0]), !0) : n.defaults && n.defaults.bin === Hd && (v.vbaraw = Tr(e, "xl/vbaProject.bin", !0))), v;
}
function T_(e, t) {
  var r = t || {}, a = "Workbook", n = ye.find(e, a);
  try {
    if (a = "/!DataSpaces/Version", n = ye.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
    if (Q1(n.content), a = "/!DataSpaces/DataSpaceMap", n = ye.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
    var i = rx(n.content);
    if (i.length !== 1 || i[0].comps.length !== 1 || i[0].comps[0].t !== 0 || i[0].name !== "StrongEncryptionDataSpace" || i[0].comps[0].v !== "EncryptedPackage")
      throw new Error("ECMA-376 Encrypted file bad " + a);
    if (a = "/!DataSpaces/DataSpaceInfo/StrongEncryptionDataSpace", n = ye.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
    var s = tx(n.content);
    if (s.length != 1 || s[0] != "StrongEncryptionTransform")
      throw new Error("ECMA-376 Encrypted file bad " + a);
    if (a = "/!DataSpaces/TransformInfo/StrongEncryptionTransform/!Primary", n = ye.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
    nx(n.content);
  } catch {
  }
  if (a = "/EncryptionInfo", n = ye.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
  var f = ix(n.content);
  if (a = "/EncryptedPackage", n = ye.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
  if (f[0] == 4 && typeof decrypt_agile < "u") return decrypt_agile(f[1], n.content, r.password || "", r);
  if (f[0] == 2 && typeof decrypt_std76 < "u") return decrypt_std76(f[1], n.content, r.password || "", r);
  throw new Error("File is password-protected");
}
function y_(e, t) {
  return t.bookType == "ods" ? Dl(e, t) : t.bookType == "numbers" ? g_(e, t) : t.bookType == "xlsb" ? S_(e, t) : F_(e, t);
}
function S_(e, t) {
  Ya = 1024, e && !e.SSF && (e.SSF = ir(Fe)), e && e.SSF && (nn(), y0(e.SSF), t.revssf = F0(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, yn ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = t.bookType == "xlsb" ? "bin" : "xml", a = nl.indexOf(t.bookType) > -1, n = Vi();
  ts(t = t || {});
  var i = Ai(), s = "", f = 0;
  if (t.cellXfs = [], la(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", Le(i, s, wc(e.Props, t)), n.coreprops.push(s), Qe(t.rels, 2, s, Ve.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var c = [], l = 0; l < e.SheetNames.length; ++l)
      (e.Workbook.Sheets[l] || {}).Hidden != 2 && c.push(e.SheetNames[l]);
    e.Props.SheetNames = c;
  }
  for (e.Props.Worksheets = e.Props.SheetNames.length, Le(i, s, Tc(e.Props)), n.extprops.push(s), Qe(t.rels, 3, s, Ve.EXT_PROPS), e.Custprops !== e.Props && gr(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", Le(i, s, yc(e.Custprops)), n.custprops.push(s), Qe(t.rels, 4, s, Ve.CUST_PROPS)), f = 1; f <= e.SheetNames.length; ++f) {
    var o = { "!id": {} }, u = e.Sheets[e.SheetNames[f - 1]], x = (u || {})["!type"] || "sheet";
    switch (x) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + r, Le(i, s, rg(f - 1, s, t, e, o)), n.sheets.push(s), Qe(t.wbrels, -1, "worksheets/sheet" + f + "." + r, Ve.WS[0]);
    }
    if (u) {
      var d = u["!comments"], v = !1, h = "";
      d && d.length > 0 && (h = "xl/comments" + f + "." + r, Le(i, h, ng(d, h)), n.comments.push(h), Qe(o, -1, "../comments" + f + "." + r, Ve.CMNT), v = !0), u["!legacy"] && v && Le(i, "xl/drawings/vmlDrawing" + f + ".vml", tl(f, u["!comments"])), delete u["!comments"], delete u["!legacy"];
    }
    o["!id"].rId1 && Le(i, Nn(s), qa(o));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, Le(i, s, ag(t.Strings, s, t)), n.strs.push(s), Qe(t.wbrels, -1, "sharedStrings." + r, Ve.SST)), s = "xl/workbook." + r, Le(i, s, eg(e, s)), n.workbooks.push(s), Qe(t.rels, 1, s, Ve.WB), s = "xl/theme/theme1.xml", Le(i, s, ji(e.Themes, t)), n.themes.push(s), Qe(t.wbrels, -1, "theme/theme1.xml", Ve.THEME), s = "xl/styles." + r, Le(i, s, tg(e, s, t)), n.styles.push(s), Qe(t.wbrels, -1, "styles." + r, Ve.STY), e.vbaraw && a && (s = "xl/vbaProject.bin", Le(i, s, e.vbaraw), n.vba.push(s), Qe(t.wbrels, -1, "vbaProject.bin", Ve.VBA)), s = "xl/metadata." + r, Le(i, s, ig(s)), n.metadata.push(s), Qe(t.wbrels, -1, "metadata." + r, Ve.XLMETA), Le(i, "[Content_Types].xml", mc(n, t)), Le(i, "_rels/.rels", qa(t.rels)), Le(i, "xl/_rels/workbook." + r + ".rels", qa(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function F_(e, t) {
  Ya = 1024, e && !e.SSF && (e.SSF = ir(Fe)), e && e.SSF && (nn(), y0(e.SSF), t.revssf = F0(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, yn ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = "xml", a = nl.indexOf(t.bookType) > -1, n = Vi();
  ts(t = t || {});
  var i = Ai(), s = "", f = 0;
  if (t.cellXfs = [], la(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", Le(i, s, wc(e.Props, t)), n.coreprops.push(s), Qe(t.rels, 2, s, Ve.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var c = [], l = 0; l < e.SheetNames.length; ++l)
      (e.Workbook.Sheets[l] || {}).Hidden != 2 && c.push(e.SheetNames[l]);
    e.Props.SheetNames = c;
  }
  e.Props.Worksheets = e.Props.SheetNames.length, Le(i, s, Tc(e.Props)), n.extprops.push(s), Qe(t.rels, 3, s, Ve.EXT_PROPS), e.Custprops !== e.Props && gr(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", Le(i, s, yc(e.Custprops)), n.custprops.push(s), Qe(t.rels, 4, s, Ve.CUST_PROPS));
  var o = ["SheetJ5"];
  for (t.tcid = 0, f = 1; f <= e.SheetNames.length; ++f) {
    var u = { "!id": {} }, x = e.Sheets[e.SheetNames[f - 1]], d = (x || {})["!type"] || "sheet";
    switch (d) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + r, Le(i, s, pl(f - 1, t, e, u)), n.sheets.push(s), Qe(t.wbrels, -1, "worksheets/sheet" + f + "." + r, Ve.WS[0]);
    }
    if (x) {
      var v = x["!comments"], h = !1, g = "";
      if (v && v.length > 0) {
        var T = !1;
        v.forEach(function(A) {
          A[1].forEach(function(k) {
            k.T == !0 && (T = !0);
          });
        }), T && (g = "xl/threadedComments/threadedComment" + f + "." + r, Le(i, g, Nd(v, o, t)), n.threadedcomments.push(g), Qe(u, -1, "../threadedComments/threadedComment" + f + "." + r, Ve.TCMNT)), g = "xl/comments" + f + "." + r, Le(i, g, al(v)), n.comments.push(g), Qe(u, -1, "../comments" + f + "." + r, Ve.CMNT), h = !0;
      }
      x["!legacy"] && h && Le(i, "xl/drawings/vmlDrawing" + f + ".vml", tl(f, x["!comments"])), delete x["!comments"], delete x["!legacy"];
    }
    u["!id"].rId1 && Le(i, Nn(s), qa(u));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, Le(i, s, zc(t.Strings, t)), n.strs.push(s), Qe(t.wbrels, -1, "sharedStrings." + r, Ve.SST)), s = "xl/workbook." + r, Le(i, s, wl(e)), n.workbooks.push(s), Qe(t.rels, 1, s, Ve.WB), s = "xl/theme/theme1.xml", Le(i, s, ji(e.Themes, t)), n.themes.push(s), Qe(t.wbrels, -1, "theme/theme1.xml", Ve.THEME), s = "xl/styles." + r, Le(i, s, Zc(e, t)), n.styles.push(s), Qe(t.wbrels, -1, "styles." + r, Ve.STY), e.vbaraw && a && (s = "xl/vbaProject.bin", Le(i, s, e.vbaraw), n.vba.push(s), Qe(t.wbrels, -1, "vbaProject.bin", Ve.VBA)), s = "xl/metadata." + r, Le(i, s, rl()), n.metadata.push(s), Qe(t.wbrels, -1, "metadata." + r, Ve.XLMETA), o.length > 1 && (s = "xl/persons/person.xml", Le(i, s, Ld(o)), n.people.push(s), Qe(t.wbrels, -1, "persons/person.xml", Ve.PEOPLE)), Le(i, "[Content_Types].xml", mc(n, t)), Le(i, "_rels/.rels", qa(t.rels)), Le(i, "xl/_rels/workbook." + r + ".rels", qa(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function as(e, t) {
  var r = "";
  switch ((t || {}).type || "base64") {
    case "buffer":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    case "base64":
      r = xt(e.slice(0, 12));
      break;
    case "binary":
      r = e;
      break;
    case "array":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    default:
      throw new Error("Unrecognized type " + (t && t.type || "undefined"));
  }
  return [r.charCodeAt(0), r.charCodeAt(1), r.charCodeAt(2), r.charCodeAt(3), r.charCodeAt(4), r.charCodeAt(5), r.charCodeAt(6), r.charCodeAt(7)];
}
function A_(e, t) {
  return ye.find(e, "EncryptedPackage") ? T_(e, t) : yl(e, t);
}
function C_(e, t) {
  var r, a = e, n = t || {};
  return n.type || (n.type = We && Buffer.isBuffer(e) ? "buffer" : "base64"), r = $f(a, n), E_(r, n);
}
function Ol(e, t) {
  var r = 0;
  e: for (; r < e.length; ) switch (e.charCodeAt(r)) {
    case 10:
    case 13:
    case 32:
      ++r;
      break;
    case 60:
      return vi(e.slice(r), t);
    default:
      break e;
  }
  return rn.to_workbook(e, t);
}
function b_(e, t) {
  var r = "", a = as(e, t);
  switch (t.type) {
    case "base64":
      r = xt(e);
      break;
    case "binary":
      r = e;
      break;
    case "buffer":
      r = e.toString("binary");
      break;
    case "array":
      r = ya(e);
      break;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  return a[0] == 239 && a[1] == 187 && a[2] == 191 && (r = tr(r)), t.type = "binary", Ol(r, t);
}
function D_(e, t) {
  var r = e;
  return t.type == "base64" && (r = xt(r)), r = An.utils.decode(1200, r.slice(2), "str"), t.type = "binary", Ol(r, t);
}
function I_(e) {
  return e.match(/[^\x00-\x7F]/) ? Ht(e) : e;
}
function fi(e, t, r, a) {
  return a ? (r.type = "string", rn.to_workbook(e, r)) : rn.to_workbook(t, r);
}
function _i(e, t) {
  Ei();
  var r = t || {};
  if (typeof ArrayBuffer < "u" && e instanceof ArrayBuffer) return _i(new Uint8Array(e), (r = ir(r), r.type = "array", r));
  typeof Uint8Array < "u" && e instanceof Uint8Array && !r.type && (r.type = typeof Deno < "u" ? "buffer" : "array");
  var a = e, n = [0, 0, 0, 0], i = !1;
  if (r.cellStyles && (r.cellNF = !0, r.sheetStubs = !0), Qa = {}, r.dateNF && (Qa.dateNF = r.dateNF), r.type || (r.type = We && Buffer.isBuffer(e) ? "buffer" : "base64"), r.type == "file" && (r.type = We ? "buffer" : "binary", a = So(e), typeof Uint8Array < "u" && !We && (r.type = "array")), r.type == "string" && (i = !0, r.type = "binary", r.codepage = 65001, a = I_(e)), r.type == "array" && typeof Uint8Array < "u" && e instanceof Uint8Array && typeof ArrayBuffer < "u") {
    var s = new ArrayBuffer(3), f = new Uint8Array(s);
    if (f.foo = "bar", !f.foo)
      return r = ir(r), r.type = "array", _i(Ti(a), r);
  }
  switch ((n = as(a, r))[0]) {
    case 208:
      if (n[1] === 207 && n[2] === 17 && n[3] === 224 && n[4] === 161 && n[5] === 177 && n[6] === 26 && n[7] === 225) return A_(ye.read(a, r), r);
      break;
    case 9:
      if (n[1] <= 8) return yl(a, r);
      break;
    case 60:
      return vi(a, r);
    case 73:
      if (n[1] === 73 && n[2] === 42 && n[3] === 0) throw new Error("TIFF Image File is not a spreadsheet");
      if (n[1] === 68) return P1(a, r);
      break;
    case 84:
      if (n[1] === 65 && n[2] === 66 && n[3] === 76) return Hc.to_workbook(a, r);
      break;
    case 80:
      return n[1] === 75 && n[2] < 9 && n[3] < 9 ? C_(a, r) : fi(e, a, r, i);
    case 239:
      return n[3] === 60 ? vi(a, r) : fi(e, a, r, i);
    case 255:
      if (n[1] === 254)
        return D_(a, r);
      if (n[1] === 0 && n[2] === 2 && n[3] === 0) return ka.to_workbook(a, r);
      break;
    case 0:
      if (n[1] === 0 && (n[2] >= 2 && n[3] === 0 || n[2] === 0 && (n[3] === 8 || n[3] === 9)))
        return ka.to_workbook(a, r);
      break;
    case 3:
    case 131:
    case 139:
    case 140:
      return pi.to_workbook(a, r);
    case 123:
      if (n[1] === 92 && n[2] === 114 && n[3] === 116) return Yc.to_workbook(a, r);
      break;
    case 10:
    case 13:
    case 32:
      return b_(a, r);
    case 137:
      if (n[1] === 80 && n[2] === 78 && n[3] === 71) throw new Error("PNG Image File is not a spreadsheet");
      break;
  }
  return L1.indexOf(n[0]) > -1 && n[2] <= 12 && n[3] <= 31 ? pi.to_workbook(a, r) : fi(e, a, r, i);
}
function Nl(e, t) {
  switch (t.type) {
    case "base64":
    case "binary":
      break;
    case "buffer":
    case "array":
      t.type = "";
      break;
    case "file":
      return Vn(t.file, ye.write(e, { type: We ? "buffer" : "" }));
    case "string":
      throw new Error("'string' output type invalid for '" + t.bookType + "' files");
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  return ye.write(e, t);
}
function O_(e, t) {
  var r = ir(t || {}), a = y_(e, r);
  return N_(a, r);
}
function N_(e, t) {
  var r = {}, a = We ? "nodebuffer" : typeof Uint8Array < "u" ? "array" : "string";
  if (t.compression && (r.compression = "DEFLATE"), t.password) r.type = a;
  else switch (t.type) {
    case "base64":
      r.type = "base64";
      break;
    case "binary":
      r.type = "string";
      break;
    case "string":
      throw new Error("'string' output type invalid for '" + t.bookType + "' files");
    case "buffer":
    case "file":
      r.type = a;
      break;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  var n = e.FullPaths ? ye.write(e, { fileType: "zip", type: (
    /*::(*/
    { nodebuffer: "buffer", string: "binary" }[r.type] || r.type
  ), compression: !!t.compression }) : e.generate(r);
  if (typeof Deno < "u" && typeof n == "string") {
    if (t.type == "binary" || t.type == "base64") return n;
    n = new Uint8Array(T0(n));
  }
  return t.password && typeof encrypt_agile < "u" ? Nl(encrypt_agile(n, t.password), t) : t.type === "file" ? Vn(t.file, n) : t.type == "string" ? tr(
    /*::(*/
    n
    /*:: :any)*/
  ) : n;
}
function R_(e, t) {
  var r = t || {}, a = Ig(e, r);
  return Nl(a, r);
}
function Vt(e, t, r) {
  r || (r = "");
  var a = r + e;
  switch (t.type) {
    case "base64":
      return Cn(Ht(a));
    case "binary":
      return Ht(a);
    case "string":
      return e;
    case "file":
      return Vn(t.file, a, "utf8");
    case "buffer":
      return We ? qt(a, "utf8") : typeof TextEncoder < "u" ? new TextEncoder().encode(a) : Vt(a, { type: "binary" }).split("").map(function(n) {
        return n.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function L_(e, t) {
  switch (t.type) {
    case "base64":
      return Cn(e);
    case "binary":
      return e;
    case "string":
      return e;
    case "file":
      return Vn(t.file, e, "binary");
    case "buffer":
      return We ? qt(e, "binary") : e.split("").map(function(r) {
        return r.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function l0(e, t) {
  switch (t.type) {
    case "string":
    case "base64":
    case "binary":
      for (var r = "", a = 0; a < e.length; ++a) r += String.fromCharCode(e[a]);
      return t.type == "base64" ? Cn(r) : t.type == "string" ? tr(r) : r;
    case "file":
      return Vn(t.file, e);
    case "buffer":
      return e;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
}
function Rl(e, t) {
  Ei(), A2(e);
  var r = ir(t || {});
  if (r.cellStyles && (r.cellNF = !0, r.sheetStubs = !0), r.type == "array") {
    r.type = "binary";
    var a = Rl(e, r);
    return r.type = "array", T0(a);
  }
  var n = 0;
  if (r.sheet && (typeof r.sheet == "number" ? n = r.sheet : n = e.SheetNames.indexOf(r.sheet), !e.SheetNames[n]))
    throw new Error("Sheet not found: " + r.sheet + " : " + typeof r.sheet);
  switch (r.bookType || "xlsb") {
    case "xml":
    case "xlml":
      return Vt(yg(e, r), r);
    case "slk":
    case "sylk":
      return Vt(Vc.from_sheet(e.Sheets[e.SheetNames[n]], r), r);
    case "htm":
    case "html":
      return Vt(Fl(e.Sheets[e.SheetNames[n]], r), r);
    case "txt":
      return L_(Ll(e.Sheets[e.SheetNames[n]], r), r);
    case "csv":
      return Vt(ns(e.Sheets[e.SheetNames[n]], r), r, "\uFEFF");
    case "dif":
      return Vt(Hc.from_sheet(e.Sheets[e.SheetNames[n]], r), r);
    case "dbf":
      return l0(pi.from_sheet(e.Sheets[e.SheetNames[n]], r), r);
    case "prn":
      return Vt(rn.from_sheet(e.Sheets[e.SheetNames[n]], r), r);
    case "rtf":
      return Vt(Yc.from_sheet(e.Sheets[e.SheetNames[n]], r), r);
    case "eth":
      return Vt(Xc.from_sheet(e.Sheets[e.SheetNames[n]], r), r);
    case "fods":
      return Vt(Dl(e, r), r);
    case "wk1":
      return l0(ka.sheet_to_wk1(e.Sheets[e.SheetNames[n]], r), r);
    case "wk3":
      return l0(ka.book_to_wk3(e, r), r);
    case "biff2":
      r.biff || (r.biff = 2);
    case "biff3":
      r.biff || (r.biff = 3);
    case "biff4":
      return r.biff || (r.biff = 4), l0(Sl(e, r), r);
    case "biff5":
      r.biff || (r.biff = 5);
    case "biff8":
    case "xla":
    case "xls":
      return r.biff || (r.biff = 8), R_(e, r);
    case "xlsx":
    case "xlsm":
    case "xlam":
    case "xlsb":
    case "numbers":
    case "ods":
      return O_(e, r);
    default:
      throw new Error("Unrecognized bookType |" + r.bookType + "|");
  }
}
function P_(e) {
  if (!e.bookType) {
    var t = {
      xls: "biff8",
      htm: "html",
      slk: "sylk",
      socialcalc: "eth",
      Sh33tJS: "WTF"
    }, r = e.file.slice(e.file.lastIndexOf(".")).toLowerCase();
    r.match(/^\.[a-z]+$/) && (e.bookType = r.slice(1)), e.bookType = t[e.bookType] || e.bookType;
  }
}
function pn(e, t, r) {
  var a = {};
  return a.type = "file", a.file = t, P_(a), Rl(e, a);
}
function B_(e, t, r, a, n, i, s, f) {
  var c = wr(r), l = f.defval, o = f.raw || !Object.prototype.hasOwnProperty.call(f, "raw"), u = !0, x = n === 1 ? [] : {};
  if (n !== 1)
    if (Object.defineProperty) try {
      Object.defineProperty(x, "__rowNum__", { value: r, enumerable: !1 });
    } catch {
      x.__rowNum__ = r;
    }
    else x.__rowNum__ = r;
  if (!s || e[r]) for (var d = t.s.c; d <= t.e.c; ++d) {
    var v = s ? e[r][d] : e[a[d] + c];
    if (v === void 0 || v.t === void 0) {
      if (l === void 0) continue;
      i[d] != null && (x[i[d]] = l);
      continue;
    }
    var h = v.v;
    switch (v.t) {
      case "z":
        if (h == null) break;
        continue;
      case "e":
        h = h == 0 ? null : void 0;
        break;
      case "s":
      case "d":
      case "b":
      case "n":
        break;
      default:
        throw new Error("unrecognized type " + v.t);
    }
    if (i[d] != null) {
      if (h == null)
        if (v.t == "e" && h === null) x[i[d]] = null;
        else if (l !== void 0) x[i[d]] = l;
        else if (o && h === null) x[i[d]] = null;
        else continue;
      else
        x[i[d]] = o && (v.t !== "n" || v.t === "n" && f.rawNumbers !== !1) ? h : Jt(v, h, f);
      h != null && (u = !1);
    }
  }
  return { row: x, isempty: u };
}
function E0(e, t) {
  if (e == null || e["!ref"] == null) return [];
  var r = { t: "n", v: 0 }, a = 0, n = 1, i = [], s = 0, f = "", c = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, l = t || {}, o = l.range != null ? l.range : e["!ref"];
  switch (l.header === 1 ? a = 1 : l.header === "A" ? a = 2 : Array.isArray(l.header) ? a = 3 : l.header == null && (a = 0), typeof o) {
    case "string":
      c = $e(o);
      break;
    case "number":
      c = $e(e["!ref"]), c.s.r = o;
      break;
    default:
      c = o;
  }
  a > 0 && (n = 0);
  var u = wr(c.s.r), x = [], d = [], v = 0, h = 0, g = Array.isArray(e), T = c.s.r, A = 0, k = {};
  g && !e[T] && (e[T] = []);
  var R = l.skipHidden && e["!cols"] || [], V = l.skipHidden && e["!rows"] || [];
  for (A = c.s.c; A <= c.e.c; ++A)
    if (!(R[A] || {}).hidden)
      switch (x[A] = ur(A), r = g ? e[T][A] : e[x[A] + u], a) {
        case 1:
          i[A] = A - c.s.c;
          break;
        case 2:
          i[A] = x[A];
          break;
        case 3:
          i[A] = l.header[A - c.s.c];
          break;
        default:
          if (r == null && (r = { w: "__EMPTY", t: "s" }), f = s = Jt(r, null, l), h = k[s] || 0, !h) k[s] = 1;
          else {
            do
              f = s + "_" + h++;
            while (k[f]);
            k[s] = h, k[f] = 1;
          }
          i[A] = f;
      }
  for (T = c.s.r + n; T <= c.e.r; ++T)
    if (!(V[T] || {}).hidden) {
      var N = B_(e, c, T, x, a, i, g, l);
      (N.isempty === !1 || (a === 1 ? l.blankrows !== !1 : l.blankrows)) && (d[v++] = N.row);
    }
  return d.length = v, d;
}
var Af = /"/g;
function M_(e, t, r, a, n, i, s, f) {
  for (var c = !0, l = [], o = "", u = wr(r), x = t.s.c; x <= t.e.c; ++x)
    if (a[x]) {
      var d = f.dense ? (e[r] || [])[x] : e[a[x] + u];
      if (d == null) o = "";
      else if (d.v != null) {
        c = !1, o = "" + (f.rawNumbers && d.t == "n" ? d.v : Jt(d, null, f));
        for (var v = 0, h = 0; v !== o.length; ++v) if ((h = o.charCodeAt(v)) === n || h === i || h === 34 || f.forceQuotes) {
          o = '"' + o.replace(Af, '""') + '"';
          break;
        }
        o == "ID" && (o = '"ID"');
      } else d.f != null && !d.F ? (c = !1, o = "=" + d.f, o.indexOf(",") >= 0 && (o = '"' + o.replace(Af, '""') + '"')) : o = "";
      l.push(o);
    }
  return f.blankrows === !1 && c ? null : l.join(s);
}
function ns(e, t) {
  var r = [], a = t ?? {};
  if (e == null || e["!ref"] == null) return "";
  var n = $e(e["!ref"]), i = a.FS !== void 0 ? a.FS : ",", s = i.charCodeAt(0), f = a.RS !== void 0 ? a.RS : `
`, c = f.charCodeAt(0), l = new RegExp((i == "|" ? "\\|" : i) + "+$"), o = "", u = [];
  a.dense = Array.isArray(e);
  for (var x = a.skipHidden && e["!cols"] || [], d = a.skipHidden && e["!rows"] || [], v = n.s.c; v <= n.e.c; ++v) (x[v] || {}).hidden || (u[v] = ur(v));
  for (var h = 0, g = n.s.r; g <= n.e.r; ++g)
    (d[g] || {}).hidden || (o = M_(e, n, g, u, s, c, i, a), o != null && (a.strip && (o = o.replace(l, "")), (o || a.blankrows !== !1) && r.push((h++ ? f : "") + o)));
  return delete a.dense, r.join("");
}
function Ll(e, t) {
  t || (t = {}), t.FS = "	", t.RS = `
`;
  var r = ns(e, t);
  return r;
}
function U_(e) {
  var t = "", r, a = "";
  if (e == null || e["!ref"] == null) return [];
  var n = $e(e["!ref"]), i = "", s = [], f, c = [], l = Array.isArray(e);
  for (f = n.s.c; f <= n.e.c; ++f) s[f] = ur(f);
  for (var o = n.s.r; o <= n.e.r; ++o)
    for (i = wr(o), f = n.s.c; f <= n.e.c; ++f)
      if (t = s[f] + i, r = l ? (e[o] || [])[f] : e[t], a = "", r !== void 0) {
        if (r.F != null) {
          if (t = r.F, !r.f) continue;
          a = r.f, t.indexOf(":") == -1 && (t = t + ":" + t);
        }
        if (r.f != null) a = r.f;
        else {
          if (r.t == "z") continue;
          if (r.t == "n" && r.v != null) a = "" + r.v;
          else if (r.t == "b") a = r.v ? "TRUE" : "FALSE";
          else if (r.w !== void 0) a = "'" + r.w;
          else {
            if (r.v === void 0) continue;
            r.t == "s" ? a = "'" + r.v : a = "" + r.v;
          }
        }
        c[c.length] = t + "=" + a;
      }
  return c;
}
function Pl(e, t, r) {
  var a = r || {}, n = +!a.skipHeader, i = e || {}, s = 0, f = 0;
  if (i && a.origin != null)
    if (typeof a.origin == "number") s = a.origin;
    else {
      var c = typeof a.origin == "string" ? hr(a.origin) : a.origin;
      s = c.r, f = c.c;
    }
  var l, o = { s: { c: 0, r: 0 }, e: { c: f, r: s + t.length - 1 + n } };
  if (i["!ref"]) {
    var u = $e(i["!ref"]);
    o.e.c = Math.max(o.e.c, u.e.c), o.e.r = Math.max(o.e.r, u.e.r), s == -1 && (s = u.e.r + 1, o.e.r = s + t.length - 1 + n);
  } else
    s == -1 && (s = 0, o.e.r = t.length - 1 + n);
  var x = a.header || [], d = 0;
  t.forEach(function(h, g) {
    gr(h).forEach(function(T) {
      (d = x.indexOf(T)) == -1 && (x[d = x.length] = T);
      var A = h[T], k = "z", R = "", V = Ce({ c: f + d, r: s + g + n });
      l = Wn(i, V), A && typeof A == "object" && !(A instanceof Date) ? i[V] = A : (typeof A == "number" ? k = "n" : typeof A == "boolean" ? k = "b" : typeof A == "string" ? k = "s" : A instanceof Date ? (k = "d", a.cellDates || (k = "n", A = Ar(A)), R = a.dateNF || Fe[14]) : A === null && a.nullError && (k = "e", A = 0), l ? (l.t = k, l.v = A, delete l.w, delete l.R, R && (l.z = R)) : i[V] = l = { t: k, v: A }, R && (l.z = R));
    });
  }), o.e.c = Math.max(o.e.c, f + x.length - 1);
  var v = wr(s);
  if (n) for (d = 0; d < x.length; ++d) i[ur(d + f) + v] = { t: "s", v: x[d] };
  return i["!ref"] = Ne(o), i;
}
function W_(e, t) {
  return Pl(null, e, t);
}
function Wn(e, t, r) {
  if (typeof t == "string") {
    if (Array.isArray(e)) {
      var a = hr(t);
      return e[a.r] || (e[a.r] = []), e[a.r][a.c] || (e[a.r][a.c] = { t: "z" });
    }
    return e[t] || (e[t] = { t: "z" });
  }
  return typeof t != "number" ? Wn(e, Ce(t)) : Wn(e, Ce({ r: t, c: r || 0 }));
}
function V_(e, t) {
  if (typeof t == "number") {
    if (t >= 0 && e.SheetNames.length > t) return t;
    throw new Error("Cannot find sheet # " + t);
  } else if (typeof t == "string") {
    var r = e.SheetNames.indexOf(t);
    if (r > -1) return r;
    throw new Error("Cannot find sheet name |" + t + "|");
  } else throw new Error("Cannot find sheet |" + t + "|");
}
function is() {
  return { SheetNames: [], Sheets: {} };
}
function ss(e, t, r, a) {
  var n = 1;
  if (!r) for (; n <= 65535 && e.SheetNames.indexOf(r = "Sheet" + n) != -1; ++n, r = void 0) ;
  if (!r || e.SheetNames.length >= 65535) throw new Error("Too many worksheets");
  if (a && e.SheetNames.indexOf(r) >= 0) {
    var i = r.match(/(^.*?)(\d+)$/);
    n = i && +i[2] || 0;
    var s = i && i[1] || r;
    for (++n; n <= 65535 && e.SheetNames.indexOf(r = s + n) != -1; ++n) ;
  }
  if (_l(r), e.SheetNames.indexOf(r) >= 0) throw new Error("Worksheet with name |" + r + "| already exists!");
  return e.SheetNames.push(r), e.Sheets[r] = t, r;
}
function H_(e, t, r) {
  e.Workbook || (e.Workbook = {}), e.Workbook.Sheets || (e.Workbook.Sheets = []);
  var a = V_(e, t);
  switch (e.Workbook.Sheets[a] || (e.Workbook.Sheets[a] = {}), r) {
    case 0:
    case 1:
    case 2:
      break;
    default:
      throw new Error("Bad sheet visibility setting " + r);
  }
  e.Workbook.Sheets[a].Hidden = r;
}
function X_(e, t) {
  return e.z = t, e;
}
function Bl(e, t, r) {
  return t ? (e.l = { Target: t }, r && (e.l.Tooltip = r)) : delete e.l, e;
}
function z_(e, t, r) {
  return Bl(e, "#" + t, r);
}
function G_(e, t, r) {
  e.c || (e.c = []), e.c.push({ t, a: r || "SheetJS" });
}
function $_(e, t, r, a) {
  for (var n = typeof t != "string" ? t : $e(t), i = typeof t == "string" ? t : Ne(t), s = n.s.r; s <= n.e.r; ++s) for (var f = n.s.c; f <= n.e.c; ++f) {
    var c = Wn(e, s, f);
    c.t = "n", c.F = i, delete c.v, s == n.s.r && f == n.s.c && (c.f = r, a && (c.D = !0));
  }
  return e;
}
var Xr = {
  encode_col: ur,
  encode_row: wr,
  encode_cell: Ce,
  encode_range: Ne,
  decode_col: Li,
  decode_row: Ri,
  split_cell: au,
  decode_cell: hr,
  decode_range: st,
  format_cell: Jt,
  sheet_add_aoa: oc,
  sheet_add_json: Pl,
  sheet_add_dom: Al,
  aoa_to_sheet: sn,
  json_to_sheet: W_,
  table_to_sheet: Cl,
  table_to_book: Qg,
  sheet_to_csv: ns,
  sheet_to_txt: Ll,
  sheet_to_json: E0,
  sheet_to_html: Fl,
  sheet_to_formulae: U_,
  sheet_to_row_object_array: E0,
  sheet_get_cell: Wn,
  book_new: is,
  book_append_sheet: ss,
  book_set_sheet_visibility: H_,
  cell_set_number_format: X_,
  cell_set_hyperlink: Bl,
  cell_set_internal_link: z_,
  cell_add_comment: G_,
  sheet_set_array_formula: $_,
  consts: {
    SHEET_VISIBLE: 0,
    SHEET_HIDDEN: 1,
    SHEET_VERY_HIDDEN: 2
  }
};
const j_ = { class: "fp-root" }, K_ = { class: "fp-tab-bar" }, Y_ = {
  key: 0,
  style: { "margin-top": "8px", color: "#67c23a" }
}, J_ = { style: { "margin-top": "12px", display: "flex", gap: "8px", "align-items": "center" } }, q_ = { style: { display: "flex", "align-items": "center", gap: "8px", "margin-bottom": "10px" } }, Z_ = {
  key: 0,
  style: { "font-size": "12px", color: "#909399", "margin-left": "auto" }
}, Q_ = { class: "fp-log-box" }, ew = {
  key: 0,
  style: { color: "#c0c4cc", "text-align": "center", padding: "24px" }
}, rw = ["onClick"], tw = { class: "fp-flow-tab-count" }, aw = { style: { display: "flex", "align-items": "center", "justify-content": "space-between" } }, nw = { style: { "font-weight": "600" } }, iw = { style: { "font-weight": "600" } }, sw = {
  key: 0,
  style: { "font-size": "12px" }
}, fw = {
  key: 1,
  style: { "font-size": "11px", color: "#909399" }
}, cw = { style: { "font-weight": "600" } }, lw = ["onClick"], ow = ["onClick"], uw = { style: { "font-size": "11px", color: "#909399" } }, hw = {
  key: 2,
  style: { "font-size": "11px", color: "#c0c4cc" }
}, xw = { style: { display: "flex", "align-items": "center", gap: "12px", "margin-bottom": "10px" } }, dw = ["width", "height"], pw = ["d", "stroke", "marker-end", "stroke-dasharray"], vw = ["x", "y", "width"], mw = ["x", "y"], gw = ["points"], _w = ["x", "y"], ww = ["x", "y", "width", "height", "fill", "stroke"], kw = ["x", "y", "font-weight"], Ew = ["x", "y"], Tw = {
  key: 0,
  style: { "font-size": "13px" }
}, yw = { style: { "font-weight": "600", "margin-bottom": "8px" } }, Sw = {
  key: 1,
  style: { color: "#c0c4cc" }
}, Fw = { class: "fp-script-box" }, Aw = { style: { "margin-bottom": "12px", display: "flex", "align-items": "center", "justify-content": "space-between" } }, Cw = {
  key: 0,
  style: { "text-align": "center", padding: "32px", color: "#909399", "font-size": "14px" }
}, bw = { style: { "margin-bottom": "12px", display: "flex", "align-items": "center", "justify-content": "space-between" } }, Dw = {
  key: 0,
  style: { "text-align": "center", padding: "32px", color: "#67c23a", "font-size": "15px" }
}, Iw = {
  key: 0,
  style: { "margin-top": "8px", color: "#67c23a" }
}, Ow = { style: { "margin-top": "12px" } }, Nw = {
  key: 0,
  style: { margin: "12px 0" }
}, Rw = { style: { display: "flex", "align-items": "center", "justify-content": "space-between" } }, Lw = { style: { display: "flex", gap: "8px" } }, Pw = { class: "fp-xml-output" }, Bw = /* @__PURE__ */ Cf({
  __name: "FlowParserView",
  props: {
    api: {},
    toolId: {}
  },
  setup(e) {
    const t = e, r = Oe("parse"), a = Oe([]), n = Oe(!1);
    Vl(async () => {
      n.value = !0;
      try {
        a.value = await t.api.dataSource.list();
      } finally {
        n.value = !1;
      }
    });
    const i = Oe("paste"), s = Oe(""), f = Oe(""), c = Oe(""), l = Oe({ dataSourceId: "", sql: "", xmlField: "" }), o = Oe(!1), u = Oe([]), x = Oe(0), d = Oe(null), v = Oe(!1);
    let h = 0, g = 0, T = !1;
    function A(m) {
      const p = d.value;
      p && (v.value = !0, T = !1, h = m.clientX, g = p.scrollLeft, m.preventDefault());
    }
    function k(m) {
      if (!v.value || !d.value) return;
      const p = m.clientX - h;
      Math.abs(p) > 3 && (T = !0), d.value.scrollLeft = g - p;
    }
    function R() {
      v.value = !1;
    }
    function V(m) {
      T || (x.value = m);
    }
    const N = Oe([]), S = Oe(!1), z = Oe(200), L = Oe(""), J = Oe(!1), j = Oe([]), H = Zn(
      () => L.value ? j.value.filter((m) => m.includes(L.value)) : j.value
    );
    function re(m) {
      return m.includes(" ERROR ") || m.includes(" error ") ? "fp-log-error" : m.includes(" WARN ") || m.includes("解析失败") ? "fp-log-warn" : "";
    }
    async function me() {
      J.value = !0;
      try {
        const m = await t.api.plugin.callSync("queryLogs", { lines: z.value });
        j.value = m.lines ?? [];
      } finally {
        J.value = !1;
      }
    }
    async function xe() {
      S.value = !0, j.value.length || await me();
    }
    const ve = Oe(!1), de = Oe([]), Xe = Oe(""), K = Oe([]), pe = Zn(() => u.value[x.value] ?? null), we = { NW: 160, NH: 50, HG: 60, VG: 110 }, C = Oe(!1), M = Oe({ nodes: [], edges: [], svgW: 800, svgH: 400 }), O = Oe(), P = Oe();
    function Q(m, p) {
      return m && m.length > p ? m.slice(0, p) + "…" : m ?? "";
    }
    function fe(m) {
      return m === "S" ? "#f0fdf4" : m === "E" ? "#fff1f0" : "#eff6ff";
    }
    function ce(m) {
      return m === "S" ? "#52c41a" : m === "E" ? "#ff4d4f" : "#409eff";
    }
    function ie(m) {
      var us;
      const { NW: p, NH: w, HG: E, VG: b } = we, G = "__cond_", U = [...m.nodes], B = [...m.lines], D = /* @__PURE__ */ new Set();
      for (const ge of B)
        D.add(ge.source), D.add(ge.target);
      if (D.size === 0) return { nodes: [], edges: [], svgW: 400, svgH: 200 };
      function q(ge) {
        const Be = /* @__PURE__ */ new Map(), Ye = /* @__PURE__ */ new Map();
        for (const je of D) Ye.set(je, 0);
        for (const je of ge)
          !D.has(je.source) || !D.has(je.target) || (Be.has(je.source) || Be.set(je.source, []), Be.get(je.source).push(je), Ye.set(je.target, (Ye.get(je.target) ?? 0) + 1));
        return { adj: Be, indeg: Ye };
      }
      function te(ge, Be) {
        const Ye = /* @__PURE__ */ new Map([[ge, 0]]), je = [ge];
        for (; je.length; ) {
          const ze = je.shift(), cr = Ye.get(ze);
          for (const pr of Be.get(ze) ?? []) {
            const Pr = pr.target;
            if (!D.has(Pr)) continue;
            const da = Ye.get(Pr) ?? -1;
            da < cr + 1 && (Ye.set(Pr, cr + 1), da < 0 && je.push(Pr));
          }
        }
        return Ye;
      }
      let { adj: se, indeg: ae } = q(B);
      const he = U.find((ge) => ge.nodeType === "S" && D.has(ge.nid)), Ee = (he == null ? void 0 : he.nid) ?? ((us = [...ae.entries()].sort((ge, Be) => ge[1] - Be[1])[0]) == null ? void 0 : us[0]);
      if (!Ee) return { nodes: [], edges: [], svgW: 400, svgH: 200 };
      const I = te(Ee, se), Te = [];
      for (const [ge, Be] of ae)
        !I.has(ge) && Be === 0 && Te.push(ge);
      if (console.log("[buildChartData] mainRoot:", Ee, "mainLevels size:", I.size, "discRoots:", Te, "total connectedIds:", D.size), Te.length > 0) {
        const ge = [...I.keys()].filter(
          (Ye) => !(se.get(Ye) ?? []).some((je) => D.has(je.target))
        ), Be = `${G}0`;
        D.add(Be), U.push({ nodeType: "COND", label: "条件路由", nid: Be, synthetic: !0 });
        for (const Ye of ge)
          B.push({ source: Ye, target: Be, nid: `__ci_${Ye}`, label: "", synthetic: !0 });
        for (const Ye of Te)
          B.push({ source: Be, target: Ye, nid: `__co_${Ye}`, label: "", synthetic: !0 });
        ({ adj: se, indeg: ae } = q(B));
      }
      const Ue = te(Ee, se);
      for (const ge of D)
        if (!Ue.has(ge)) {
          const Be = te(ge, se), Ye = Math.max(-1, ...Ue.values()) + 1;
          for (const [je, ze] of Be) Ue.set(je, ze + Ye);
        }
      const dr = /* @__PURE__ */ new Map();
      for (const [ge, Be] of Ue)
        dr.has(Be) || dr.set(Be, []), dr.get(Be).push(ge);
      const Dt = Math.max(...Ue.values()), Mt = /* @__PURE__ */ new Map();
      for (const ge of B)
        Mt.has(ge.target) || Mt.set(ge.target, []), Mt.get(ge.target).push(ge.source);
      const Lr = /* @__PURE__ */ new Map();
      for (const [ge, Be] of dr) Be.forEach((Ye, je) => Lr.set(Ye, je));
      function Wa() {
        for (let ge = 1; ge <= Dt; ge++) {
          const Be = dr.get(ge) ?? [], Ye = Be.map((ze) => {
            const pr = (Mt.get(ze) ?? []).filter((Pr) => Lr.has(Pr));
            return pr.length ? pr.reduce((Pr, da) => Pr + (Lr.get(da) ?? 0), 0) / pr.length : Lr.get(ze) ?? 0;
          }), je = Be.map((ze, cr) => ({ id: ze, bc: Ye[cr] })).sort((ze, cr) => ze.bc - cr.bc).map((ze) => ze.id);
          dr.set(ge, je), je.forEach((ze, cr) => Lr.set(ze, cr));
        }
      }
      function It() {
        for (let ge = Dt - 1; ge >= 0; ge--) {
          const Be = dr.get(ge) ?? [], Ye = Be.map((ze) => {
            const cr = (se.get(ze) ?? []).map((pr) => pr.target).filter((pr) => Lr.has(pr));
            return cr.length ? cr.reduce((pr, Pr) => pr + (Lr.get(Pr) ?? 0), 0) / cr.length : Lr.get(ze) ?? 0;
          }), je = Be.map((ze, cr) => ({ id: ze, bc: Ye[cr] })).sort((ze, cr) => ze.bc - cr.bc).map((ze) => ze.id);
          dr.set(ge, je), je.forEach((ze, cr) => Lr.set(ze, cr));
        }
      }
      Wa(), It(), Wa();
      let W0 = 0;
      for (const ge of dr.values()) {
        const Be = ge.length * p + (ge.length - 1) * E;
        Be > W0 && (W0 = Be);
      }
      const V0 = W0 + 100, Va = /* @__PURE__ */ new Map();
      for (let ge = 0; ge <= Dt; ge++) {
        const Be = dr.get(ge) ?? [], Ye = Be.length * p + (Be.length - 1) * E, je = (V0 - Ye) / 2;
        Be.forEach((ze, cr) => {
          const pr = U.find((Pr) => Pr.nid === ze);
          Va.set(ze, {
            id: ze,
            label: (pr == null ? void 0 : pr.label) || ze,
            nid: ze,
            type: (pr == null ? void 0 : pr.nodeType) ?? "",
            x: je + cr * (p + E),
            y: ge * (w + b) + 24
          });
        });
      }
      const H0 = /* @__PURE__ */ new Map(), X0 = /* @__PURE__ */ new Map(), fs = /* @__PURE__ */ new Map(), cs = /* @__PURE__ */ new Map();
      for (const ge of B)
        !Va.has(ge.source) || !Va.has(ge.target) || (H0.set(ge.source, (H0.get(ge.source) ?? 0) + 1), X0.set(ge.target, (X0.get(ge.target) ?? 0) + 1));
      const ls = [], os = /* @__PURE__ */ new Set();
      for (const ge of B) {
        const Be = Va.get(ge.source), Ye = Va.get(ge.target);
        if (!Be || !Ye) continue;
        const je = `${ge.source}=>${ge.target}`;
        if (os.has(je)) continue;
        os.add(je);
        const ze = fs.get(ge.source) ?? 0;
        fs.set(ge.source, ze + 1);
        const cr = cs.get(ge.target) ?? 0;
        cs.set(ge.target, cr + 1);
        const pr = H0.get(ge.source) ?? 1, Pr = X0.get(ge.target) ?? 1, da = Math.min(p * 0.6, (pr - 1) * 14), Ml = pr > 1 ? -da / 2 + ze * (da / (pr - 1)) : 0, Ul = Pr > 1 ? -Math.min(p * 0.6, (Pr - 1) * 14) / 2 + cr * (Math.min(p * 0.6, (Pr - 1) * 14) / (Pr - 1)) : 0, Jn = Be.x + p / 2 + Ml, ln = Be.y + w, qn = Ye.x + p / 2 + Ul, on = Ye.y, hs = (Ue.get(ge.target) ?? 0) <= (Ue.get(ge.source) ?? 0);
        let z0;
        if (hs) {
          const un = V0 - 20;
          z0 = `M ${Jn} ${ln} C ${un} ${ln} ${un} ${on} ${qn} ${on}`;
        } else {
          const un = (ln + on) / 2;
          z0 = `M ${Jn} ${ln} C ${Jn} ${un} ${qn} ${un} ${qn} ${on}`;
        }
        const Wl = !!ge.synthetic;
        ls.push({
          id: ge.nid || je,
          path: z0,
          label: Wl ? "" : ge.label || "",
          lx: (Jn + qn) / 2,
          ly: (ln + on) / 2,
          isBack: hs
        });
      }
      return {
        nodes: [...Va.values()],
        edges: ls,
        svgW: V0,
        svgH: (Dt + 1) * (w + b) + 40
      };
    }
    function ne() {
      pe.value && (M.value = ie(pe.value), C.value = !0);
    }
    function Ie() {
      var U, B;
      const m = O.value;
      if (!m) return;
      const w = `<?xml version="1.0" encoding="UTF-8"?>
` + new XMLSerializer().serializeToString(m), E = new Blob([w], { type: "image/svg+xml;charset=utf-8" }), b = URL.createObjectURL(E), G = document.createElement("a");
      G.href = b, G.download = `flow-${((B = (U = pe.value) == null ? void 0 : U.workflow) == null ? void 0 : B.flowId) || "chart"}.svg`, G.click(), URL.revokeObjectURL(b), qe.success("流程图已导出");
    }
    function F(m) {
      const p = new Set(
        m.nodes.filter((w) => w.nodeType === "E").map((w) => w.nid)
      );
      return new Set(
        m.lines.filter((w) => p.has(w.target)).map((w) => w.source)
      );
    }
    function rr(m) {
      const p = new Set(
        m.nodes.filter((w) => w.nodeType === "S").map((w) => w.nid)
      );
      return new Set(
        m.lines.filter((w) => p.has(w.source)).map((w) => w.target)
      );
    }
    const He = Zn(() => pe.value ? F(pe.value) : /* @__PURE__ */ new Set()), Je = Zn(() => pe.value ? rr(pe.value) : /* @__PURE__ */ new Set()), Re = Oe(!1), le = Oe(null);
    function sr(m) {
      le.value = m, Re.value = !0;
    }
    const Wr = Oe(!1), Or = Oe([]);
    function Ct(m) {
      var w, E;
      const p = [];
      for (const b of m) {
        const G = ((w = b.workflow) == null ? void 0 : w.flowName) || ((E = b.workflow) == null ? void 0 : E.flowId) || "未知流程", U = new Set(
          b.nodes.filter((q) => q.nodeType === "E").map((q) => q.nid)
        ), B = b.lines.filter((q) => U.has(q.target)), D = /* @__PURE__ */ new Map();
        for (const q of B)
          D.has(q.source) || D.set(q.source, []), D.get(q.source).push(q);
        for (const [q, te] of D) {
          const se = b.nodes.find((I) => I.nid === q);
          if (!se) continue;
          const ae = te.map((I) => {
            const Te = b.nodes.find((Ue) => Ue.nid === I.target);
            return (Te == null ? void 0 : Te.label) || I.target;
          }), he = te.map((I) => I.label || I.nid || "").filter(Boolean), Ee = (se.convertLabel || "").split(";").map((I) => I.trim()).filter(Boolean).join("，");
          p.push({
            flowName: G,
            nodeSign: se.nodeSign,
            nid: se.nid,
            label: se.label,
            nodeType: se.nodeType,
            roles: Ee,
            toEndNodeLabel: [...new Set(ae)].join("、"),
            routeLabel: [...new Set(he)].join("、")
          });
        }
      }
      return p;
    }
    function oa() {
      Or.value = Ct(u.value), Wr.value = !0;
    }
    function Bt() {
      var E, b;
      if (!Or.value.length) {
        qe.warning("无终节点数据");
        return;
      }
      const m = Xr.book_new(), p = Or.value.map((G, U) => ({
        序号: U + 1,
        所属流程: G.flowName,
        节点序号: G.nodeSign,
        节点编号: G.nid,
        节点名称: G.label,
        节点类型: Ma(G.nodeType),
        配置角色: G.roles,
        连接的结束节点: G.toEndNodeLabel,
        路由线名称: G.routeLabel
      }));
      Xr.book_append_sheet(m, Xr.json_to_sheet(p), "终节点");
      const w = ((b = (E = u.value[0]) == null ? void 0 : E.workflow) == null ? void 0 : b.flowId) || "flow";
      pn(m, `terminal-nodes-${w}.xlsx`), qe.success("终节点已导出");
    }
    const Nr = Oe(!1), ft = Oe(!1), xr = Oe([]);
    async function ua() {
      if (!u.value.length) {
        qe.warning("请先解析流程");
        return;
      }
      Nr.value = !0;
      try {
        let m;
        if (i.value === "sql" || i.value === "file" && ve.value)
          m = await t.api.plugin.callSync("checkAllParsed", { flows: u.value });
        else {
          const p = i.value === "file" ? f.value : c.value;
          if (!p) {
            qe.warning("请先解析流程");
            return;
          }
          m = await t.api.plugin.callSync("checkFlow", { xmlContent: p });
        }
        if (xr.value = m.issues ?? [], ft.value = !0, !xr.value.length)
          qe.success(`检查完成，共 ${m.flowCount ?? u.value.length} 个流程，未发现配置问题`);
        else {
          const p = xr.value.filter((w) => w.level === "ERROR").length;
          qe[p > 0 ? "error" : "warning"](
            `检查完成，共 ${m.flowCount ?? u.value.length} 个流程，发现 ${xr.value.length} 个问题（ERROR: ${p}）`
          );
        }
      } finally {
        Nr.value = !1;
      }
    }
    function Rr(m) {
      return m === "ERROR" ? "danger" : m === "WARN" ? "warning" : "info";
    }
    function dt() {
      var G, U;
      if (!xr.value.length && !u.value.length) return;
      const m = xr.value.some((B) => B.flowName), p = Xr.book_new(), w = xr.value.map((B) => {
        const D = { 级别: B.level };
        return m && (D.所属流程 = B.flowName ?? ""), D.规则编号 = B.ruleCode, D.规则名称 = B.ruleName, D.节点编号 = B.nodeId ?? "", D.关联节点 = B.nodeName ?? "", D.问题描述 = B.message, D;
      }), E = Xr.json_to_sheet(w.length ? w : [{ 结果: "未发现配置问题" }]);
      Xr.book_append_sheet(p, E, "流程检查结果");
      const b = u.value.length === 1 ? ((U = (G = u.value[0]) == null ? void 0 : G.workflow) == null ? void 0 : U.flowId) ?? "flow" : `batch-${u.value.length}`;
      pn(p, `check-${b}.xlsx`), qe.success("检查结果已导出");
    }
    function Pe(m) {
      s.value = m.name, ve.value = m.name.toLowerCase().endsWith(".csv");
      const p = new FileReader();
      p.onload = (w) => {
        var b;
        const E = ((b = w.target) == null ? void 0 : b.result) ?? "";
        if (ve.value) {
          const G = _i(E, { type: "string" }), U = G.Sheets[G.SheetNames[0]], B = Xr.sheet_to_json(U, { header: 1 });
          de.value = (B[0] ?? []).map(String), K.value = B.slice(1).map((D) => D.map((q) => q == null ? "" : String(q))), Xe.value = de.value[0] ?? "";
        } else
          f.value = E;
      }, p.readAsText(m.raw, "UTF-8");
    }
    async function lr() {
      o.value = !0, u.value = [], x.value = 0;
      try {
        let m;
        if (i.value === "file")
          if (ve.value) {
            if (!Xe.value) {
              qe.warning("请选择包含XML内容的列");
              return;
            }
            const w = de.value.indexOf(Xe.value), E = K.value.map((b) => b[w] ?? "").filter((b) => b.trim());
            if (!E.length) {
              qe.warning("所选列无有效数据");
              return;
            }
            m = await t.api.plugin.callSync("parseXmlList", { xmlList: E });
          } else {
            if (!f.value) {
              qe.warning("请先上传文件");
              return;
            }
            m = await t.api.plugin.callSync("parseXml", { xmlContent: f.value });
          }
        else if (i.value === "paste") {
          if (!c.value.trim()) {
            qe.warning("请粘贴XML内容");
            return;
          }
          m = await t.api.plugin.callSync("parseXml", { xmlContent: c.value });
        } else {
          if (!l.value.dataSourceId) {
            qe.warning("请选择数据源");
            return;
          }
          if (!l.value.sql.trim()) {
            qe.warning("请输入SQL语句");
            return;
          }
          if (!l.value.xmlField) {
            qe.warning("请输入XML字段名");
            return;
          }
          m = await t.api.plugin.callSync("parseSql", l.value);
        }
        u.value = m.flows ?? [], N.value = m.parseErrors ?? [];
        const p = N.value.length ? `，${N.value.length} 行解析失败` : "";
        qe[N.value.length ? "warning" : "success"](`解析完成，共 ${u.value.length} 个流程${p}`);
      } finally {
        o.value = !1;
      }
    }
    function tt() {
      u.value = [], N.value = [], f.value = "", s.value = "", c.value = "", x.value = 0, ve.value = !1, de.value = [], Xe.value = "", K.value = [];
    }
    const fr = Oe("paste"), pt = Oe(""), ha = Oe(""), xa = Oe(""), vt = Oe({ dataSourceId: "", sql: "", xmlField: "" }), La = Oe(!1), qr = Oe([]), bt = Oe(0);
    function O0(m) {
      pt.value = m.name;
      const p = new FileReader();
      p.onload = (w) => {
        var E;
        ha.value = ((E = w.target) == null ? void 0 : E.result) ?? "";
      }, p.readAsText(m.raw, "UTF-8");
    }
    function N0(m) {
      const p = "  ";
      let w = m.replace(/\r\n/g, `
`).replace(/\r/g, `
`).replace(/(>)\s*(<)/g, `$1
$2`).trim(), E = 0;
      return w.split(`
`).map((b) => {
        const G = b.trim();
        let U = "";
        return (G.startsWith("</") || G.startsWith("?>")) && (E = Math.max(0, E - 1)), U = p.repeat(E), G.startsWith("<") && !G.startsWith("</") && !G.startsWith("<?") && !G.endsWith("/>") && !G.includes("</") && E++, U + G;
      }).join(`
`);
    }
    async function Pa() {
      La.value = !0, qr.value = [], bt.value = 0;
      try {
        let m = [];
        if (fr.value === "file") {
          if (!ha.value) {
            qe.warning("请先上传XML文件");
            return;
          }
          m = [ha.value];
        } else if (fr.value === "paste") {
          if (!xa.value.trim()) {
            qe.warning("请粘贴XML内容");
            return;
          }
          m = [xa.value];
        } else {
          if (!vt.value.dataSourceId) {
            qe.warning("请选择数据源");
            return;
          }
          if (!vt.value.sql.trim()) {
            qe.warning("请输入SQL语句");
            return;
          }
          if (!vt.value.xmlField) {
            qe.warning("请输入XML字段名");
            return;
          }
          m = (await t.api.plugin.callSync("queryRawXml", vt.value)).xmlList ?? [];
        }
        const p = [];
        for (const w of m)
          try {
            p.push(N0(w));
          } catch (E) {
            p.push(`<!-- 格式化失败: ${E.message} -->
${w}`);
          }
        qr.value = p, qe.success(`格式化完成，共 ${p.length} 条`);
      } finally {
        La.value = !1;
      }
    }
    function R0() {
      qr.value = [], ha.value = "", pt.value = "", xa.value = "", bt.value = 0;
    }
    async function L0() {
      await navigator.clipboard.writeText(qr.value[bt.value] ?? ""), qe.success("已复制到剪贴板");
    }
    function P0() {
      const m = qr.value[bt.value];
      if (!m) return;
      const p = new Blob([m], { type: "application/xml;charset=utf-8" }), w = URL.createObjectURL(p), E = document.createElement("a");
      E.href = w, E.download = `formatted-${bt.value + 1}.xml`, E.click(), URL.revokeObjectURL(w);
    }
    function B0() {
      qr.value.forEach((m, p) => {
        const w = new Blob([m], { type: "application/xml;charset=utf-8" }), E = URL.createObjectURL(w), b = document.createElement("a");
        b.href = E, b.download = `formatted-${p + 1}.xml`, setTimeout(() => {
          b.click(), URL.revokeObjectURL(E);
        }, p * 200);
      });
    }
    function Ba(m) {
      if (!pe.value) return m;
      const p = pe.value.nodes.find((w) => w.nid === m);
      return p && p.label || m;
    }
    function Ma(m) {
      return m === "S" ? "开始" : m === "E" ? "结束" : "过程";
    }
    function Yn(m) {
      return m === "S" ? "success" : m === "E" ? "danger" : "";
    }
    function cn(m) {
      return { 5: "等于", 6: "不等于", 7: "大于", 8: "小于" }[m] ?? m;
    }
    function Ua(m) {
      return !m || m === "0" ? "" : { ReturnBackToFirstImpl: "退回发起人", ReturnBackToPrevImpl: "退回上一节点", ReturnBackImpl: "自定义退回" }[m] ?? m;
    }
    function mt(m) {
      return m === "1" ? "是" : "否";
    }
    function M0() {
      var E;
      if (!u.value.length) {
        qe.warning("暂无已解析的流程");
        return;
      }
      const m = Xr.book_new(), p = u.value.map((b, G) => {
        var U, B, D, q, te, se, ae, he, Ee, I, Te, Ue;
        return {
          序号: G + 1,
          流程编号: (U = b.workflow) == null ? void 0 : U.flowId,
          流程标识: (B = b.workflow) == null ? void 0 : B.flowSign,
          流程名称: (D = b.workflow) == null ? void 0 : D.flowName,
          流程标题: (q = b.workflow) == null ? void 0 : q.title,
          流程作者: (te = b.workflow) == null ? void 0 : te.flowAdmin,
          版本编号: (se = b.workflow) == null ? void 0 : se.flowVersion,
          所属机构: (ae = b.workflow) == null ? void 0 : ae.orgId,
          系统标识: (he = b.workflow) == null ? void 0 : he.systemId,
          创建时间: (Ee = b.workflow) == null ? void 0 : Ee.startTime,
          更新时间: (I = b.workflow) == null ? void 0 : I.updateTime,
          节点数: ((Te = b.nodes) == null ? void 0 : Te.length) ?? 0,
          路由线数: ((Ue = b.lines) == null ? void 0 : Ue.length) ?? 0
        };
      });
      Xr.book_append_sheet(m, Xr.json_to_sheet(p), "流程基本信息");
      const w = u.value.length === 1 ? `flow-${((E = u.value[0].workflow) == null ? void 0 : E.flowId) || "flow"}.xlsx` : `flows-${u.value.length}.xlsx`;
      pn(m, w), qe.success(`已下载 ${u.value.length} 个流程的基本信息`);
    }
    function U0() {
      var w, E;
      if (!u.value.length) {
        qe.warning("暂无已解析的流程");
        return;
      }
      const m = Xr.book_new(), p = [];
      for (const b of u.value) {
        const G = ((w = b.workflow) == null ? void 0 : w.flowName) || ((E = b.workflow) == null ? void 0 : E.flowId) || "未知流程", U = F(b), B = rr(b);
        b.nodes.forEach((D, q) => {
          var te;
          p.push({
            所属流程: G,
            流程编号: (te = b.workflow) == null ? void 0 : te.flowId,
            序号: q + 1,
            节点序号: D.nodeSign,
            节点编号: D.nid,
            节点名称: D.label,
            节点类型: Ma(D.nodeType),
            终节点标识: U.has(D.nid) ? "是" : "否",
            首节点标识: B.has(D.nid) ? "是" : "否",
            人员配置编码: D.nodeUser,
            人员配置描述: D.convertLabel,
            角色ID: y(D.nodeUser, "R"),
            人员逻辑: y(D.nodeUser, "E"),
            机构层级: y(D.nodeUser, "A"),
            授权规则: D.creditAuth,
            自动提交: mt(D.autoSubmit),
            无人员跳过: mt(D.noUserJump),
            退回策略: Ua(D.returnBack),
            收回标识: D.tackBack === "TackBackImpl" ? "是" : mt(D.tackBack),
            撤回标识: mt(D.retract),
            加签: mt(D.addSign),
            协助: mt(D.assist),
            催办: mt(D.urged),
            变更: mt(D.change),
            拒绝: mt(D.refuse),
            异步执行: mt(D.asynDo),
            业务逻辑Bean: D.bizBeanId,
            消息通知: D.noticeType
          });
        });
      }
      Xr.book_append_sheet(m, Xr.json_to_sheet(p), "节点清单"), pn(m, `nodes-all-${u.value.length}flows.xlsx`), qe.success(`已下载节点清单，共 ${p.length} 条`);
    }
    function _() {
      var w, E;
      if (!u.value.length) {
        qe.warning("暂无已解析的流程");
        return;
      }
      const m = Xr.book_new(), p = [];
      for (const b of u.value) {
        const G = ((w = b.workflow) == null ? void 0 : w.flowName) || ((E = b.workflow) == null ? void 0 : E.flowId) || "未知流程", U = new Map(b.nodes.map((B) => [B.nid, B.label]));
        b.lines.forEach((B, D) => {
          var q, te;
          p.push({
            所属流程: G,
            流程编号: (q = b.workflow) == null ? void 0 : q.flowId,
            序号: D + 1,
            路由编号: B.nid,
            路由名称: B.label,
            起点节点编号: B.source,
            起点节点名称: U.get(B.source) ?? "",
            终点节点编号: B.target,
            终点节点名称: U.get(B.target) ?? "",
            条件逻辑: B.isContinueBeanId === "0" ? "无条件" : "条件判断",
            条件配置: ((te = B.conditions) == null ? void 0 : te.map((se) => `${se.varName} ${cn(se.relation)} ${se.value}`).join(" / ")) ?? "",
            路由脚本: B.routeScriptTxt,
            线条颜色: B.customColor
          });
        });
      }
      Xr.book_append_sheet(m, Xr.json_to_sheet(p), "路由线清单"), pn(m, `lines-all-${u.value.length}flows.xlsx`), qe.success(`已下载路由线清单，共 ${p.length} 条`);
    }
    function y(m, p) {
      return m ? m.split(";").filter((w) => w.startsWith(p + ".")).map((w) => w.slice(p.length + 1)).join(";") : "";
    }
    return (m, p) => {
      const w = ct("UploadFilled"), E = ct("Document"), b = ct("Search"), G = ct("el-input-number"), U = ct("Warning"), B = ct("Position"), D = ct("Share"), q = ct("Download"), te = ct("el-link"), se = ct("MagicStick"), ae = ct("el-radio-button"), he = ct("el-radio-group"), Ee = ct("CopyDocument");
      return Se(), Me("div", j_, [
        Ae("div", K_, [
          Ae("div", {
            class: hn(["fp-tab-item", { active: r.value === "parse" }]),
            onClick: p[0] || (p[0] = (I) => r.value = "parse")
          }, "流程解析", 2),
          Ae("div", {
            class: hn(["fp-tab-item", { active: r.value === "format" }]),
            onClick: p[1] || (p[1] = (I) => r.value = "format")
          }, "XML格式化", 2)
        ]),
        xs(Ae("div", null, [
          W(X(Ha), { class: "fp-input-card" }, {
            default: Y(() => [
              W(X(ps), {
                modelValue: i.value,
                "onUpdate:modelValue": p[7] || (p[7] = (I) => i.value = I)
              }, {
                default: Y(() => [
                  W(X(Xa), {
                    label: "上传文件",
                    name: "file"
                  }, {
                    default: Y(() => [
                      W(X(vs), {
                        drag: "",
                        accept: ".xml,.txt,.csv",
                        "auto-upload": !1,
                        "on-change": Pe,
                        "show-file-list": !1,
                        style: { "margin-top": "8px" }
                      }, {
                        default: Y(() => [
                          W(X(Sr), { style: { "font-size": "40px", color: "#409eff" } }, {
                            default: Y(() => [
                              W(w)
                            ]),
                            _: 1
                          }),
                          p[21] || (p[21] = Ae("div", { style: { "margin-top": "8px" } }, "拖拽或点击上传文件（支持 XML / TXT / CSV）", -1))
                        ]),
                        _: 1
                      }),
                      s.value ? (Se(), Me("div", Y_, [
                        W(X(Sr), null, {
                          default: Y(() => [
                            W(E)
                          ]),
                          _: 1
                        }),
                        ke(" " + _e(s.value), 1)
                      ])) : or("", !0),
                      ve.value ? (Se(), gt(X(G0), {
                        key: 1,
                        "label-width": "90px",
                        style: { "margin-top": "12px" }
                      }, {
                        default: Y(() => [
                          W(X(pa), { label: "XML列名" }, {
                            default: Y(() => [
                              W(X($0), {
                                modelValue: Xe.value,
                                "onUpdate:modelValue": p[2] || (p[2] = (I) => Xe.value = I),
                                placeholder: "选择包含XML内容的列",
                                style: { width: "260px" }
                              }, {
                                default: Y(() => [
                                  (Se(!0), Me(Zr, null, Gt(de.value, (I) => (Se(), gt(X(j0), {
                                    key: I,
                                    label: I,
                                    value: I
                                  }, null, 8, ["label", "value"]))), 128))
                                ]),
                                _: 1
                              }, 8, ["modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : or("", !0)
                    ]),
                    _: 1
                  }),
                  W(X(Xa), {
                    label: "粘贴XML内容",
                    name: "paste"
                  }, {
                    default: Y(() => [
                      W(X(va), {
                        modelValue: c.value,
                        "onUpdate:modelValue": p[3] || (p[3] = (I) => c.value = I),
                        type: "textarea",
                        rows: 8,
                        placeholder: "粘贴 XML 内容，支持多个 mxGraphModel 直接拼接",
                        style: { "font-family": "monospace", "font-size": "12px", "margin-top": "8px" }
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  W(X(Xa), {
                    label: "SQL查询",
                    name: "sql"
                  }, {
                    default: Y(() => [
                      W(X(G0), {
                        "label-width": "90px",
                        style: { "margin-top": "8px" }
                      }, {
                        default: Y(() => [
                          W(X(pa), { label: "数据源" }, {
                            default: Y(() => [
                              W(X($0), {
                                modelValue: l.value.dataSourceId,
                                "onUpdate:modelValue": p[4] || (p[4] = (I) => l.value.dataSourceId = I),
                                placeholder: "选择数据源",
                                style: { width: "260px" },
                                loading: n.value
                              }, {
                                default: Y(() => [
                                  (Se(!0), Me(Zr, null, Gt(a.value, (I) => (Se(), gt(X(j0), {
                                    key: I.id,
                                    label: I.name,
                                    value: I.id
                                  }, null, 8, ["label", "value"]))), 128))
                                ]),
                                _: 1
                              }, 8, ["modelValue", "loading"])
                            ]),
                            _: 1
                          }),
                          W(X(pa), { label: "SQL语句" }, {
                            default: Y(() => [
                              W(X(va), {
                                modelValue: l.value.sql,
                                "onUpdate:modelValue": p[5] || (p[5] = (I) => l.value.sql = I),
                                type: "textarea",
                                rows: 4,
                                placeholder: "SELECT flow_content FROM t_flow WHERE flow_id = ?",
                                style: { "font-family": "monospace", "font-size": "12px" }
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          W(X(pa), { label: "XML字段名" }, {
                            default: Y(() => [
                              W(X(va), {
                                modelValue: l.value.xmlField,
                                "onUpdate:modelValue": p[6] || (p[6] = (I) => l.value.xmlField = I),
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
              Ae("div", J_, [
                W(X(Cr), {
                  type: "primary",
                  loading: o.value,
                  onClick: lr
                }, {
                  default: Y(() => [
                    W(X(Sr), null, {
                      default: Y(() => [
                        W(b)
                      ]),
                      _: 1
                    }),
                    p[22] || (p[22] = ke(" 解析 ", -1))
                  ]),
                  _: 1
                }, 8, ["loading"]),
                W(X(Cr), { onClick: tt }, {
                  default: Y(() => [...p[23] || (p[23] = [
                    ke("清空", -1)
                  ])]),
                  _: 1
                }),
                W(X(Cr), {
                  onClick: xe,
                  style: { "margin-left": "auto" }
                }, {
                  default: Y(() => [
                    W(X(Sr), null, {
                      default: Y(() => [
                        W(E)
                      ]),
                      _: 1
                    }),
                    p[24] || (p[24] = ke(" 查看日志 ", -1))
                  ]),
                  _: 1
                })
              ])
            ]),
            _: 1
          }),
          N.value.length ? (Se(), gt(X(zl), {
            key: 0,
            style: { margin: "12px 0" }
          }, {
            default: Y(() => [
              W(X(Gl), null, {
                title: Y(() => [
                  W(X(Vr), {
                    type: "warning",
                    size: "small",
                    style: { "margin-right": "8px" }
                  }, {
                    default: Y(() => [
                      ke(_e(N.value.length) + " 个片段解析失败", 1)
                    ]),
                    _: 1
                  }),
                  p[25] || (p[25] = Ae("span", { style: { "font-size": "13px", color: "#e6a23c" } }, "点击展开查看详情", -1))
                ]),
                default: Y(() => [
                  W(X(za), {
                    data: N.value,
                    border: "",
                    size: "small",
                    "max-height": "280"
                  }, {
                    default: Y(() => [
                      W(X(De), {
                        label: "片段/行",
                        width: "75",
                        align: "center"
                      }, {
                        default: Y(({ row: I }) => [
                          ke(_e(I.fragment ?? I.row ?? "-"), 1)
                        ]),
                        _: 1
                      }),
                      W(X(De), {
                        prop: "error",
                        label: "错误原因",
                        "min-width": "200",
                        "show-overflow-tooltip": ""
                      }),
                      W(X(De), {
                        prop: "snippet",
                        label: "内容预览",
                        "min-width": "200",
                        "show-overflow-tooltip": ""
                      })
                    ]),
                    _: 1
                  }, 8, ["data"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })) : or("", !0),
          W(X(xn), {
            modelValue: S.value,
            "onUpdate:modelValue": p[10] || (p[10] = (I) => S.value = I),
            title: "解析日志",
            width: "820px",
            "close-on-click-modal": !1
          }, {
            default: Y(() => [
              Ae("div", q_, [
                p[27] || (p[27] = Ae("span", { style: { "font-size": "13px", color: "#606266" } }, "显示最近", -1)),
                W(G, {
                  modelValue: z.value,
                  "onUpdate:modelValue": p[8] || (p[8] = (I) => z.value = I),
                  min: 50,
                  max: 2e3,
                  step: 50,
                  size: "small",
                  style: { width: "100px" }
                }, null, 8, ["modelValue"]),
                p[28] || (p[28] = Ae("span", { style: { "font-size": "13px", color: "#606266" } }, "行", -1)),
                W(X(Cr), {
                  size: "small",
                  type: "primary",
                  loading: J.value,
                  onClick: me
                }, {
                  default: Y(() => [...p[26] || (p[26] = [
                    ke("刷新", -1)
                  ])]),
                  _: 1
                }, 8, ["loading"]),
                W(X(va), {
                  modelValue: L.value,
                  "onUpdate:modelValue": p[9] || (p[9] = (I) => L.value = I),
                  placeholder: "过滤关键词",
                  clearable: "",
                  size: "small",
                  style: { width: "180px", "margin-left": "8px" }
                }, null, 8, ["modelValue"]),
                j.value.length ? (Se(), Me("span", Z_, "共 " + _e(j.value.length) + " 行", 1)) : or("", !0)
              ]),
              Ae("div", Q_, [
                (Se(!0), Me(Zr, null, Gt(H.value, (I, Te) => (Se(), Me("div", {
                  key: Te,
                  class: hn(["fp-log-line", re(I)])
                }, _e(I), 3))), 128)),
                H.value.length ? or("", !0) : (Se(), Me("div", ew, "暂无日志内容"))
              ])
            ]),
            _: 1
          }, 8, ["modelValue"]),
          u.value.length > 0 ? (Se(), Me("div", {
            key: 1,
            class: hn(["fp-flow-tab-bar", { dragging: v.value }]),
            ref_key: "flowTabBarRef",
            ref: d,
            onMousedown: A,
            onMousemove: k,
            onMouseup: R,
            onMouseleave: R
          }, [
            (Se(!0), Me(Zr, null, Gt(u.value, (I, Te) => {
              var Ue, dr;
              return Se(), Me("div", {
                key: Te,
                class: hn(["fp-flow-tab", { active: x.value === Te }]),
                onClick: (Dt) => V(Te)
              }, _e(((Ue = I.workflow) == null ? void 0 : Ue.flowName) || ((dr = I.workflow) == null ? void 0 : dr.flowId) || "流程" + (Te + 1)), 11, rw);
            }), 128)),
            p[29] || (p[29] = Ae("div", { style: { flex: "1", "min-width": "12px" } }, null, -1)),
            Ae("div", tw, "共 " + _e(u.value.length) + " 个流程", 1)
          ], 34)) : or("", !0),
          pe.value ? (Se(), Me(Zr, { key: 2 }, [
            W(X(Ha), { class: "fp-info-card" }, {
              header: Y(() => [
                Ae("div", aw, [
                  Ae("span", nw, _e(pe.value.workflow.flowName || pe.value.workflow.title), 1),
                  Ae("div", null, [
                    W(X(Cr), {
                      size: "small",
                      type: "warning",
                      onClick: ua,
                      loading: Nr.value
                    }, {
                      default: Y(() => [
                        W(X(Sr), null, {
                          default: Y(() => [
                            W(U)
                          ]),
                          _: 1
                        }),
                        ke(" " + _e(u.value.length > 1 ? "检查全部" : "流程检查"), 1)
                      ]),
                      _: 1
                    }, 8, ["loading"]),
                    W(X(Cr), {
                      size: "small",
                      type: "info",
                      onClick: oa
                    }, {
                      default: Y(() => [
                        W(X(Sr), null, {
                          default: Y(() => [
                            W(B)
                          ]),
                          _: 1
                        }),
                        p[30] || (p[30] = ke(" 查看终节点 ", -1))
                      ]),
                      _: 1
                    }),
                    W(X(Cr), {
                      size: "small",
                      onClick: ne
                    }, {
                      default: Y(() => [
                        W(X(Sr), null, {
                          default: Y(() => [
                            W(D)
                          ]),
                          _: 1
                        }),
                        p[31] || (p[31] = ke(" 生成流程图 ", -1))
                      ]),
                      _: 1
                    }),
                    W(X(Cr), {
                      size: "small",
                      type: "success",
                      onClick: M0
                    }, {
                      default: Y(() => [
                        W(X(Sr), null, {
                          default: Y(() => [
                            W(q)
                          ]),
                          _: 1
                        }),
                        p[32] || (p[32] = ke(" 下载Excel ", -1))
                      ]),
                      _: 1
                    }),
                    W(X(Cr), {
                      size: "small",
                      type: "success",
                      onClick: U0
                    }, {
                      default: Y(() => [
                        W(X(Sr), null, {
                          default: Y(() => [
                            W(q)
                          ]),
                          _: 1
                        }),
                        p[33] || (p[33] = ke(" 下载节点清单 ", -1))
                      ]),
                      _: 1
                    }),
                    W(X(Cr), {
                      size: "small",
                      type: "success",
                      onClick: _
                    }, {
                      default: Y(() => [
                        W(X(Sr), null, {
                          default: Y(() => [
                            W(q)
                          ]),
                          _: 1
                        }),
                        p[34] || (p[34] = ke(" 下载路由线清单 ", -1))
                      ]),
                      _: 1
                    })
                  ])
                ])
              ]),
              default: Y(() => [
                W(X(ms), {
                  column: 4,
                  size: "small",
                  border: ""
                }, {
                  default: Y(() => [
                    W(X(at), { label: "流程编号" }, {
                      default: Y(() => [
                        ke(_e(pe.value.workflow.flowId), 1)
                      ]),
                      _: 1
                    }),
                    W(X(at), { label: "流程标识" }, {
                      default: Y(() => [
                        ke(_e(pe.value.workflow.flowSign), 1)
                      ]),
                      _: 1
                    }),
                    W(X(at), { label: "流程名称" }, {
                      default: Y(() => [
                        ke(_e(pe.value.workflow.flowName), 1)
                      ]),
                      _: 1
                    }),
                    W(X(at), { label: "流程标题" }, {
                      default: Y(() => [
                        ke(_e(pe.value.workflow.title), 1)
                      ]),
                      _: 1
                    }),
                    W(X(at), { label: "流程作者" }, {
                      default: Y(() => [
                        ke(_e(pe.value.workflow.flowAdmin), 1)
                      ]),
                      _: 1
                    }),
                    W(X(at), { label: "版本编号" }, {
                      default: Y(() => [
                        ke(_e(pe.value.workflow.flowVersion), 1)
                      ]),
                      _: 1
                    }),
                    W(X(at), { label: "所属机构" }, {
                      default: Y(() => [
                        ke(_e(pe.value.workflow.orgId), 1)
                      ]),
                      _: 1
                    }),
                    W(X(at), { label: "系统标识" }, {
                      default: Y(() => [
                        ke(_e(pe.value.workflow.systemId), 1)
                      ]),
                      _: 1
                    }),
                    W(X(at), {
                      label: "创建时间",
                      span: 2
                    }, {
                      default: Y(() => [
                        ke(_e(pe.value.workflow.startTime), 1)
                      ]),
                      _: 1
                    }),
                    W(X(at), {
                      label: "更新时间",
                      span: 2
                    }, {
                      default: Y(() => [
                        ke(_e(pe.value.workflow.updateTime), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            W(X(Ha), { style: { "margin-top": "12px" } }, {
              header: Y(() => [
                Ae("span", iw, "节点列表（" + _e(pe.value.nodes.length) + " 个）", 1)
              ]),
              default: Y(() => [
                W(X(za), {
                  data: pe.value.nodes,
                  border: "",
                  stripe: "",
                  size: "small",
                  "max-height": "420"
                }, {
                  default: Y(() => [
                    W(X(De), {
                      type: "index",
                      label: "序",
                      width: "46"
                    }),
                    W(X(De), {
                      prop: "nodeSign",
                      label: "节点序号",
                      width: "80"
                    }),
                    W(X(De), {
                      prop: "nid",
                      label: "编号",
                      width: "60"
                    }),
                    W(X(De), {
                      prop: "label",
                      label: "节点名称",
                      "min-width": "120",
                      "show-overflow-tooltip": ""
                    }),
                    W(X(De), {
                      label: "类型",
                      width: "64"
                    }, {
                      default: Y(({ row: I }) => [
                        W(X(Vr), {
                          type: Yn(I.nodeType),
                          size: "small"
                        }, {
                          default: Y(() => [
                            ke(_e(Ma(I.nodeType)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    W(X(De), {
                      label: "终节点标识",
                      width: "86",
                      align: "center"
                    }, {
                      default: Y(({ row: I }) => [
                        W(X(Vr), {
                          type: He.value.has(I.nid) ? "warning" : "info",
                          size: "small"
                        }, {
                          default: Y(() => [
                            ke(_e(He.value.has(I.nid) ? "是" : "否"), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    W(X(De), {
                      label: "首节点标识",
                      width: "86",
                      align: "center"
                    }, {
                      default: Y(({ row: I }) => [
                        W(X(Vr), {
                          type: Je.value.has(I.nid) ? "success" : "info",
                          size: "small"
                        }, {
                          default: Y(() => [
                            ke(_e(Je.value.has(I.nid) ? "是" : "否"), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    W(X(De), {
                      label: "人员配置",
                      "min-width": "150",
                      "show-overflow-tooltip": ""
                    }, {
                      default: Y(({ row: I }) => [
                        I.convertLabel ? (Se(), Me("div", sw, _e(I.convertLabel), 1)) : or("", !0),
                        I.nodeUser ? (Se(), Me("div", fw, _e(I.nodeUser), 1)) : or("", !0)
                      ]),
                      _: 1
                    }),
                    W(X(De), {
                      label: "授权规则",
                      "min-width": "120",
                      "show-overflow-tooltip": ""
                    }, {
                      default: Y(({ row: I }) => [
                        ke(_e(I.creditAuth), 1)
                      ]),
                      _: 1
                    }),
                    W(X(De), {
                      label: "自动提交",
                      width: "72",
                      align: "center"
                    }, {
                      default: Y(({ row: I }) => [
                        W(X(Vr), {
                          type: I.autoSubmit === "1" ? "success" : "info",
                          size: "small"
                        }, {
                          default: Y(() => [
                            ke(_e(I.autoSubmit === "1" ? "是" : "否"), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    W(X(De), {
                      label: "无人跳过",
                      width: "72",
                      align: "center"
                    }, {
                      default: Y(({ row: I }) => [
                        W(X(Vr), {
                          type: I.noUserJump === "1" ? "warning" : "info",
                          size: "small"
                        }, {
                          default: Y(() => [
                            ke(_e(I.noUserJump === "1" ? "是" : "否"), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    W(X(De), {
                      label: "退回策略",
                      "min-width": "100",
                      "show-overflow-tooltip": ""
                    }, {
                      default: Y(({ row: I }) => [
                        ke(_e(Ua(I.returnBack)), 1)
                      ]),
                      _: 1
                    }),
                    W(X(De), {
                      label: "消息通知",
                      "min-width": "100",
                      "show-overflow-tooltip": ""
                    }, {
                      default: Y(({ row: I }) => [
                        ke(_e(I.noticeType), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["data"])
              ]),
              _: 1
            }),
            W(X(Ha), { style: { "margin-top": "12px" } }, {
              header: Y(() => [
                Ae("span", cw, "路由线（" + _e(pe.value.lines.length) + " 条）", 1)
              ]),
              default: Y(() => [
                W(X(za), {
                  data: pe.value.lines,
                  border: "",
                  stripe: "",
                  size: "small",
                  "max-height": "380"
                }, {
                  default: Y(() => [
                    W(X(De), {
                      type: "index",
                      label: "序",
                      width: "46"
                    }),
                    W(X(De), {
                      prop: "nid",
                      label: "编号",
                      width: "60"
                    }),
                    W(X(De), {
                      prop: "label",
                      label: "路由名称",
                      width: "100",
                      "show-overflow-tooltip": ""
                    }),
                    W(X(De), {
                      label: "起点",
                      width: "120",
                      "show-overflow-tooltip": ""
                    }, {
                      default: Y(({ row: I }) => [
                        ke(_e(Ba(I.source)), 1)
                      ]),
                      _: 1
                    }),
                    W(X(De), {
                      label: "终点",
                      width: "120",
                      "show-overflow-tooltip": ""
                    }, {
                      default: Y(({ row: I }) => [
                        ke(_e(Ba(I.target)), 1)
                      ]),
                      _: 1
                    }),
                    W(X(De), {
                      label: "条件逻辑",
                      width: "90"
                    }, {
                      default: Y(({ row: I }) => [
                        W(X(Vr), {
                          type: I.isContinueBeanId === "0" ? "info" : "warning",
                          size: "small"
                        }, {
                          default: Y(() => [
                            ke(_e(I.isContinueBeanId === "0" ? "无条件" : "条件判断"), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    W(X(De), {
                      label: "条件配置",
                      "min-width": "180"
                    }, {
                      default: Y(({ row: I }) => {
                        var Te;
                        return [
                          (Te = I.conditions) != null && Te.length ? (Se(), Me("div", {
                            key: 0,
                            style: { cursor: "pointer" },
                            onClick: (Ue) => sr(I)
                          }, [
                            (Se(!0), Me(Zr, null, Gt(I.conditions.slice(0, 2), (Ue, dr) => (Se(), Me("div", {
                              key: dr,
                              style: { "font-size": "11px" }
                            }, _e(dr > 0 ? Ue.logic === "1" ? "或" : "且" : "") + " " + _e(Ue.varName) + " " + _e(cn(Ue.relation)) + " " + _e(Ue.value), 1))), 128)),
                            I.conditions.length > 2 ? (Se(), gt(te, {
                              key: 0,
                              type: "primary",
                              underline: !1,
                              style: { "font-size": "11px" }
                            }, {
                              default: Y(() => [
                                ke(" …共" + _e(I.conditions.length) + "条，点击查看 ", 1)
                              ]),
                              _: 2
                            }, 1024)) : (Se(), gt(te, {
                              key: 1,
                              type: "primary",
                              underline: !1,
                              style: { "font-size": "11px" }
                            }, {
                              default: Y(() => [...p[35] || (p[35] = [
                                ke("查看明细", -1)
                              ])]),
                              _: 1
                            }))
                          ], 8, lw)) : I.routeScriptTxt ? (Se(), Me("div", {
                            key: 1,
                            style: { cursor: "pointer" },
                            onClick: (Ue) => sr(I)
                          }, [
                            Ae("span", uw, _e(I.routeScriptTxt.slice(0, 50)) + "…", 1),
                            W(te, {
                              type: "primary",
                              underline: !1,
                              style: { "font-size": "11px", "margin-left": "4px" }
                            }, {
                              default: Y(() => [...p[36] || (p[36] = [
                                ke("查看明细", -1)
                              ])]),
                              _: 1
                            })
                          ], 8, ow)) : (Se(), Me("span", hw, "—"))
                        ];
                      }),
                      _: 1
                    }),
                    W(X(De), {
                      label: "线条颜色",
                      width: "80",
                      align: "center"
                    }, {
                      default: Y(({ row: I }) => [
                        I.customColor ? (Se(), Me("span", {
                          key: 0,
                          style: Hl({ color: I.customColor, fontWeight: "bold" })
                        }, "■", 4)) : or("", !0)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["data"])
              ]),
              _: 1
            })
          ], 64)) : or("", !0),
          W(X(xn), {
            modelValue: C.value,
            "onUpdate:modelValue": p[11] || (p[11] = (I) => C.value = I),
            title: "流程图",
            width: "95%",
            style: { "max-width": "1400px", top: "2vh" },
            "close-on-click-modal": !1,
            "destroy-on-close": ""
          }, {
            default: Y(() => [
              Ae("div", xw, [
                W(X(Vr), {
                  type: "info",
                  size: "small"
                }, {
                  default: Y(() => [
                    ke("节点 " + _e(M.value.nodes.length) + " / 连线 " + _e(M.value.edges.length), 1)
                  ]),
                  _: 1
                }),
                W(X(Cr), {
                  size: "small",
                  type: "success",
                  onClick: Ie
                }, {
                  default: Y(() => [
                    W(X(Sr), null, {
                      default: Y(() => [
                        W(q)
                      ]),
                      _: 1
                    }),
                    p[37] || (p[37] = ke(" 导出SVG ", -1))
                  ]),
                  _: 1
                }),
                p[38] || (p[38] = Ae("span", { style: { "font-size": "12px", color: "#909399" } }, "滚动缩放 · 拖动查看", -1))
              ]),
              Ae("div", {
                class: "fp-chart-wrap",
                ref_key: "chartWrapRef",
                ref: P
              }, [
                (Se(), Me("svg", {
                  ref_key: "chartSvgRef",
                  ref: O,
                  width: M.value.svgW,
                  height: M.value.svgH,
                  xmlns: "http://www.w3.org/2000/svg",
                  style: { display: "block" }
                }, [
                  p[39] || (p[39] = Ae("defs", null, [
                    Ae("marker", {
                      id: "fp-arrow",
                      markerWidth: "8",
                      markerHeight: "6",
                      refX: "8",
                      refY: "3",
                      orient: "auto"
                    }, [
                      Ae("polygon", {
                        points: "0 0,8 3,0 6",
                        fill: "#409eff"
                      })
                    ]),
                    Ae("marker", {
                      id: "fp-arrow-back",
                      markerWidth: "8",
                      markerHeight: "6",
                      refX: "8",
                      refY: "3",
                      orient: "auto"
                    }, [
                      Ae("polygon", {
                        points: "0 0,8 3,0 6",
                        fill: "#e6a23c"
                      })
                    ])
                  ], -1)),
                  Ae("g", null, [
                    (Se(!0), Me(Zr, null, Gt(M.value.edges, (I) => (Se(), Me("g", {
                      key: I.id
                    }, [
                      Ae("path", {
                        d: I.path,
                        stroke: I.isBack ? "#e6a23c" : "#409eff",
                        "stroke-width": "1.5",
                        fill: "none",
                        "marker-end": I.isBack ? "url(#fp-arrow-back)" : "url(#fp-arrow)",
                        "stroke-dasharray": I.isBack ? "5,3" : "none"
                      }, null, 8, pw),
                      I.label ? (Se(), Me("rect", {
                        key: 0,
                        x: I.lx - I.label.length * 3.2,
                        y: I.ly - 8,
                        width: I.label.length * 6.4 + 4,
                        height: "14",
                        fill: "white",
                        opacity: "0.85",
                        rx: "2"
                      }, null, 8, vw)) : or("", !0),
                      I.label ? (Se(), Me("text", {
                        key: 1,
                        x: I.lx,
                        y: I.ly + 1,
                        "font-size": "10",
                        fill: "#606266",
                        "text-anchor": "middle",
                        "dominant-baseline": "middle"
                      }, _e(I.label), 9, mw)) : or("", !0)
                    ]))), 128))
                  ]),
                  (Se(!0), Me(Zr, null, Gt(M.value.nodes, (I) => (Se(), Me("g", {
                    key: I.id
                  }, [
                    I.type === "COND" ? (Se(), Me(Zr, { key: 0 }, [
                      Ae("polygon", {
                        points: `${I.x + we.NW / 2},${I.y} ${I.x + we.NW},${I.y + we.NH / 2} ${I.x + we.NW / 2},${I.y + we.NH} ${I.x},${I.y + we.NH / 2}`,
                        fill: "#fff7e6",
                        stroke: "#fa8c16",
                        "stroke-width": "1.5"
                      }, null, 8, gw),
                      Ae("text", {
                        x: I.x + we.NW / 2,
                        y: I.y + we.NH / 2,
                        "font-size": "11",
                        fill: "#fa8c16",
                        "text-anchor": "middle",
                        "dominant-baseline": "middle",
                        "font-weight": "600"
                      }, _e(I.label), 9, _w)
                    ], 64)) : (Se(), Me(Zr, { key: 1 }, [
                      Ae("rect", {
                        x: I.x,
                        y: I.y,
                        width: we.NW,
                        height: we.NH,
                        rx: "6",
                        fill: fe(I.type),
                        stroke: ce(I.type),
                        "stroke-width": "1.5"
                      }, null, 8, ww),
                      Ae("text", {
                        x: I.x + we.NW / 2,
                        y: I.y + we.NH / 2 - 7,
                        "font-size": "12",
                        fill: "#303133",
                        "text-anchor": "middle",
                        "dominant-baseline": "middle",
                        "font-weight": I.type === "S" || I.type === "E" ? "600" : "normal"
                      }, _e(Q(I.label, 16)), 9, kw),
                      Ae("text", {
                        x: I.x + we.NW / 2,
                        y: I.y + we.NH / 2 + 8,
                        "font-size": "10",
                        fill: "#909399",
                        "text-anchor": "middle"
                      }, _e(I.nid), 9, Ew)
                    ], 64))
                  ]))), 128))
                ], 8, dw))
              ], 512)
            ]),
            _: 1
          }, 8, ["modelValue"]),
          W(X(xn), {
            modelValue: Re.value,
            "onUpdate:modelValue": p[12] || (p[12] = (I) => Re.value = I),
            title: "条件配置明细",
            width: "680px",
            "close-on-click-modal": !1
          }, {
            default: Y(() => {
              var I;
              return [
                le.value ? (Se(), Me("div", Tw, [
                  W(X(ms), {
                    column: 2,
                    border: "",
                    size: "small",
                    style: { "margin-bottom": "14px" }
                  }, {
                    default: Y(() => [
                      W(X(at), { label: "路由编号" }, {
                        default: Y(() => [
                          ke(_e(le.value.nid), 1)
                        ]),
                        _: 1
                      }),
                      W(X(at), { label: "路由名称" }, {
                        default: Y(() => [
                          ke(_e(le.value.label || "—"), 1)
                        ]),
                        _: 1
                      }),
                      W(X(at), { label: "起点节点" }, {
                        default: Y(() => [
                          ke(_e(Ba(le.value.source)), 1)
                        ]),
                        _: 1
                      }),
                      W(X(at), { label: "终点节点" }, {
                        default: Y(() => [
                          ke(_e(Ba(le.value.target)), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  (I = le.value.conditions) != null && I.length ? (Se(), Me(Zr, { key: 0 }, [
                    Ae("div", yw, "条件规则（" + _e(le.value.conditions.length) + " 条）", 1),
                    W(X(za), {
                      data: le.value.conditions,
                      border: "",
                      size: "small"
                    }, {
                      default: Y(() => [
                        W(X(De), {
                          type: "index",
                          label: "序",
                          width: "46"
                        }),
                        W(X(De), {
                          label: "逻辑",
                          width: "50",
                          align: "center"
                        }, {
                          default: Y(({ $index: Te }) => [
                            Te > 0 ? (Se(), gt(X(Vr), {
                              key: 0,
                              type: le.value.conditions[Te].logic === "1" ? "warning" : "primary",
                              size: "small"
                            }, {
                              default: Y(() => [
                                ke(_e(le.value.conditions[Te].logic === "1" ? "OR" : "AND"), 1)
                              ]),
                              _: 2
                            }, 1032, ["type"])) : (Se(), Me("span", Sw, "—"))
                          ]),
                          _: 1
                        }),
                        W(X(De), {
                          prop: "varName",
                          label: "变量名",
                          "min-width": "140",
                          "show-overflow-tooltip": ""
                        }),
                        W(X(De), {
                          label: "关系",
                          width: "70",
                          align: "center"
                        }, {
                          default: Y(({ row: Te }) => [
                            ke(_e(cn(Te.relation)), 1)
                          ]),
                          _: 1
                        }),
                        W(X(De), {
                          prop: "value",
                          label: "值",
                          "min-width": "100",
                          "show-overflow-tooltip": ""
                        }),
                        W(X(De), {
                          prop: "varType",
                          label: "变量类型",
                          width: "80",
                          "show-overflow-tooltip": ""
                        })
                      ]),
                      _: 1
                    }, 8, ["data"])
                  ], 64)) : or("", !0),
                  le.value.routeScriptTxt ? (Se(), Me(Zr, { key: 1 }, [
                    p[40] || (p[40] = Ae("div", { style: { "font-weight": "600", margin: "14px 0 8px" } }, "路由脚本", -1)),
                    Ae("pre", Fw, _e(le.value.routeScriptTxt), 1)
                  ], 64)) : or("", !0)
                ])) : or("", !0)
              ];
            }),
            _: 1
          }, 8, ["modelValue"]),
          W(X(xn), {
            modelValue: Wr.value,
            "onUpdate:modelValue": p[13] || (p[13] = (I) => Wr.value = I),
            title: "终节点列表",
            width: "860px",
            "close-on-click-modal": !1,
            "destroy-on-close": ""
          }, {
            default: Y(() => [
              Ae("div", Aw, [
                Ae("div", null, [
                  W(X(Vr), {
                    type: "info",
                    style: { "margin-right": "6px" }
                  }, {
                    default: Y(() => [
                      ke(" 共 " + _e(Or.value.length) + " 个终节点 ", 1)
                    ]),
                    _: 1
                  }),
                  p[41] || (p[41] = Ae("span", { style: { "font-size": "12px", color: "#909399" } }, "终节点：通过路由线连接了结束类型节点的节点", -1))
                ]),
                W(X(Cr), {
                  size: "small",
                  type: "success",
                  onClick: Bt
                }, {
                  default: Y(() => [
                    W(X(Sr), null, {
                      default: Y(() => [
                        W(q)
                      ]),
                      _: 1
                    }),
                    p[42] || (p[42] = ke(" 导出Excel ", -1))
                  ]),
                  _: 1
                })
              ]),
              W(X(za), {
                data: Or.value,
                border: "",
                stripe: "",
                size: "small",
                "max-height": "500"
              }, {
                default: Y(() => [
                  W(X(De), {
                    type: "index",
                    label: "序",
                    width: "46"
                  }),
                  u.value.length > 1 ? (Se(), gt(X(De), {
                    key: 0,
                    prop: "flowName",
                    label: "所属流程",
                    width: "160",
                    "show-overflow-tooltip": ""
                  })) : or("", !0),
                  W(X(De), {
                    prop: "nodeSign",
                    label: "节点序号",
                    width: "80"
                  }),
                  W(X(De), {
                    prop: "nid",
                    label: "节点编号",
                    width: "70"
                  }),
                  W(X(De), {
                    prop: "label",
                    label: "节点名称",
                    "min-width": "140",
                    "show-overflow-tooltip": ""
                  }),
                  W(X(De), {
                    label: "节点类型",
                    width: "72",
                    align: "center"
                  }, {
                    default: Y(({ row: I }) => [
                      W(X(Vr), {
                        type: Yn(I.nodeType),
                        size: "small"
                      }, {
                        default: Y(() => [
                          ke(_e(Ma(I.nodeType)), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])
                    ]),
                    _: 1
                  }),
                  W(X(De), {
                    prop: "roles",
                    label: "配置角色",
                    "min-width": "160",
                    "show-overflow-tooltip": ""
                  }),
                  W(X(De), {
                    prop: "toEndNodeLabel",
                    label: "连接的结束节点",
                    "min-width": "140",
                    "show-overflow-tooltip": ""
                  }),
                  W(X(De), {
                    prop: "routeLabel",
                    label: "路由线名称",
                    "min-width": "120",
                    "show-overflow-tooltip": ""
                  })
                ]),
                _: 1
              }, 8, ["data"]),
              Or.value.length ? or("", !0) : (Se(), Me("div", Cw, " 未找到终节点 "))
            ]),
            _: 1
          }, 8, ["modelValue"]),
          W(X(xn), {
            modelValue: ft.value,
            "onUpdate:modelValue": p[14] || (p[14] = (I) => ft.value = I),
            title: `流程检查结果${u.value.length > 1 ? "（共 " + u.value.length + " 个流程）" : ""}`,
            width: "860px",
            "close-on-click-modal": !1,
            "destroy-on-close": ""
          }, {
            default: Y(() => [
              Ae("div", bw, [
                Ae("div", null, [
                  W(X(Vr), {
                    type: "danger",
                    style: { "margin-right": "6px" }
                  }, {
                    default: Y(() => [
                      ke(" ERROR " + _e(xr.value.filter((I) => I.level === "ERROR").length), 1)
                    ]),
                    _: 1
                  }),
                  W(X(Vr), {
                    type: "warning",
                    style: { "margin-right": "6px" }
                  }, {
                    default: Y(() => [
                      ke(" WARN " + _e(xr.value.filter((I) => I.level === "WARN").length), 1)
                    ]),
                    _: 1
                  }),
                  W(X(Vr), { type: "info" }, {
                    default: Y(() => [
                      ke(" INFO " + _e(xr.value.filter((I) => I.level === "INFO").length), 1)
                    ]),
                    _: 1
                  })
                ]),
                W(X(Cr), {
                  size: "small",
                  type: "success",
                  onClick: dt
                }, {
                  default: Y(() => [
                    W(X(Sr), null, {
                      default: Y(() => [
                        W(q)
                      ]),
                      _: 1
                    }),
                    p[43] || (p[43] = ke(" 导出Excel ", -1))
                  ]),
                  _: 1
                })
              ]),
              W(X(za), {
                data: xr.value,
                border: "",
                stripe: "",
                size: "small",
                "max-height": "480"
              }, {
                default: Y(() => [
                  W(X(De), {
                    label: "级别",
                    width: "74",
                    align: "center"
                  }, {
                    default: Y(({ row: I }) => [
                      W(X(Vr), {
                        type: Rr(I.level),
                        size: "small"
                      }, {
                        default: Y(() => [
                          ke(_e(I.level), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])
                    ]),
                    _: 1
                  }),
                  xr.value.some((I) => I.flowName) ? (Se(), gt(X(De), {
                    key: 0,
                    prop: "flowName",
                    label: "所属流程",
                    width: "160",
                    "show-overflow-tooltip": ""
                  })) : or("", !0),
                  W(X(De), {
                    prop: "ruleCode",
                    label: "规则编号",
                    width: "80"
                  }),
                  W(X(De), {
                    prop: "ruleName",
                    label: "规则名称",
                    width: "120"
                  }),
                  W(X(De), {
                    prop: "nodeId",
                    label: "节点编号",
                    width: "100",
                    "show-overflow-tooltip": ""
                  }),
                  W(X(De), {
                    prop: "nodeName",
                    label: "关联节点",
                    width: "120",
                    "show-overflow-tooltip": ""
                  }),
                  W(X(De), {
                    prop: "message",
                    label: "问题描述",
                    "min-width": "200",
                    "show-overflow-tooltip": ""
                  })
                ]),
                _: 1
              }, 8, ["data"]),
              xr.value.length ? or("", !0) : (Se(), Me("div", Dw, " ✓ 未发现配置问题 "))
            ]),
            _: 1
          }, 8, ["modelValue", "title"])
        ], 512), [
          [ds, r.value === "parse"]
        ]),
        xs(Ae("div", null, [
          W(X(Ha), { class: "fp-input-card" }, {
            default: Y(() => [
              W(X(ps), {
                modelValue: fr.value,
                "onUpdate:modelValue": p[19] || (p[19] = (I) => fr.value = I)
              }, {
                default: Y(() => [
                  W(X(Xa), {
                    label: "上传XML文件",
                    name: "file"
                  }, {
                    default: Y(() => [
                      W(X(vs), {
                        drag: "",
                        accept: ".xml,.txt",
                        "auto-upload": !1,
                        "on-change": O0,
                        "show-file-list": !1,
                        style: { "margin-top": "8px" }
                      }, {
                        default: Y(() => [
                          W(X(Sr), { style: { "font-size": "40px", color: "#409eff" } }, {
                            default: Y(() => [
                              W(w)
                            ]),
                            _: 1
                          }),
                          p[44] || (p[44] = Ae("div", { style: { "margin-top": "8px" } }, "拖拽或点击上传 XML 文件", -1))
                        ]),
                        _: 1
                      }),
                      pt.value ? (Se(), Me("div", Iw, [
                        W(X(Sr), null, {
                          default: Y(() => [
                            W(E)
                          ]),
                          _: 1
                        }),
                        ke(" " + _e(pt.value), 1)
                      ])) : or("", !0)
                    ]),
                    _: 1
                  }),
                  W(X(Xa), {
                    label: "粘贴XML内容",
                    name: "paste"
                  }, {
                    default: Y(() => [
                      W(X(va), {
                        modelValue: xa.value,
                        "onUpdate:modelValue": p[15] || (p[15] = (I) => xa.value = I),
                        type: "textarea",
                        rows: 8,
                        placeholder: "粘贴 XML 内容",
                        style: { "font-family": "monospace", "font-size": "12px", "margin-top": "8px" }
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  W(X(Xa), {
                    label: "SQL查询",
                    name: "sql"
                  }, {
                    default: Y(() => [
                      W(X(G0), {
                        "label-width": "90px",
                        style: { "margin-top": "8px" }
                      }, {
                        default: Y(() => [
                          W(X(pa), { label: "数据源" }, {
                            default: Y(() => [
                              W(X($0), {
                                modelValue: vt.value.dataSourceId,
                                "onUpdate:modelValue": p[16] || (p[16] = (I) => vt.value.dataSourceId = I),
                                placeholder: "选择数据源",
                                style: { width: "260px" },
                                loading: n.value
                              }, {
                                default: Y(() => [
                                  (Se(!0), Me(Zr, null, Gt(a.value, (I) => (Se(), gt(X(j0), {
                                    key: I.id,
                                    label: I.name,
                                    value: I.id
                                  }, null, 8, ["label", "value"]))), 128))
                                ]),
                                _: 1
                              }, 8, ["modelValue", "loading"])
                            ]),
                            _: 1
                          }),
                          W(X(pa), { label: "SQL语句" }, {
                            default: Y(() => [
                              W(X(va), {
                                modelValue: vt.value.sql,
                                "onUpdate:modelValue": p[17] || (p[17] = (I) => vt.value.sql = I),
                                type: "textarea",
                                rows: 4,
                                placeholder: "SELECT flow_content FROM t_flow WHERE flow_id = ?",
                                style: { "font-family": "monospace", "font-size": "12px" }
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          W(X(pa), { label: "XML字段名" }, {
                            default: Y(() => [
                              W(X(va), {
                                modelValue: vt.value.xmlField,
                                "onUpdate:modelValue": p[18] || (p[18] = (I) => vt.value.xmlField = I),
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
              Ae("div", Ow, [
                W(X(Cr), {
                  type: "primary",
                  loading: La.value,
                  onClick: Pa
                }, {
                  default: Y(() => [
                    W(X(Sr), null, {
                      default: Y(() => [
                        W(se)
                      ]),
                      _: 1
                    }),
                    p[45] || (p[45] = ke(" 格式化 ", -1))
                  ]),
                  _: 1
                }, 8, ["loading"]),
                W(X(Cr), { onClick: R0 }, {
                  default: Y(() => [...p[46] || (p[46] = [
                    ke("清空", -1)
                  ])]),
                  _: 1
                })
              ])
            ]),
            _: 1
          }),
          qr.value.length ? (Se(), Me(Zr, { key: 0 }, [
            qr.value.length > 1 ? (Se(), Me("div", Nw, [
              W(X(Vr), {
                size: "small",
                style: { "margin-right": "8px" }
              }, {
                default: Y(() => [
                  ke("共 " + _e(qr.value.length) + " 条", 1)
                ]),
                _: 1
              }),
              W(he, {
                modelValue: bt.value,
                "onUpdate:modelValue": p[20] || (p[20] = (I) => bt.value = I),
                size: "small"
              }, {
                default: Y(() => [
                  (Se(!0), Me(Zr, null, Gt(qr.value, (I, Te) => (Se(), gt(ae, {
                    key: Te,
                    value: Te
                  }, {
                    default: Y(() => [
                      ke(" 第 " + _e(Te + 1) + " 条 ", 1)
                    ]),
                    _: 2
                  }, 1032, ["value"]))), 128))
                ]),
                _: 1
              }, 8, ["modelValue"])
            ])) : or("", !0),
            W(X(Ha), { style: { "margin-top": "12px" } }, {
              header: Y(() => [
                Ae("div", Rw, [
                  p[50] || (p[50] = Ae("span", { style: { "font-weight": "600" } }, "格式化结果", -1)),
                  Ae("div", Lw, [
                    W(X(Cr), {
                      size: "small",
                      onClick: L0
                    }, {
                      default: Y(() => [
                        W(X(Sr), null, {
                          default: Y(() => [
                            W(Ee)
                          ]),
                          _: 1
                        }),
                        p[47] || (p[47] = ke(" 复制 ", -1))
                      ]),
                      _: 1
                    }),
                    W(X(Cr), {
                      size: "small",
                      type: "success",
                      onClick: P0
                    }, {
                      default: Y(() => [
                        W(X(Sr), null, {
                          default: Y(() => [
                            W(q)
                          ]),
                          _: 1
                        }),
                        p[48] || (p[48] = ke(" 下载XML ", -1))
                      ]),
                      _: 1
                    }),
                    qr.value.length > 1 ? (Se(), gt(X(Cr), {
                      key: 0,
                      size: "small",
                      type: "warning",
                      onClick: B0
                    }, {
                      default: Y(() => [
                        W(X(Sr), null, {
                          default: Y(() => [
                            W(q)
                          ]),
                          _: 1
                        }),
                        p[49] || (p[49] = ke(" 下载全部 ", -1))
                      ]),
                      _: 1
                    })) : or("", !0)
                  ])
                ])
              ]),
              default: Y(() => [
                Ae("pre", Pw, _e(qr.value[bt.value]), 1)
              ]),
              _: 1
            })
          ], 64)) : or("", !0)
        ], 512), [
          [ds, r.value === "format"]
        ])
      ]);
    };
  }
}), Mw = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [a, n] of t)
    r[a] = n;
  return r;
}, Uw = /* @__PURE__ */ Mw(Bw, [["__scopeId", "data-v-a61c7b89"]]);
function Hw(e, t) {
  return Cf({
    render() {
      return Xl(Uw, { api: e, toolId: t });
    }
  });
}
export {
  Hw as createView
};
