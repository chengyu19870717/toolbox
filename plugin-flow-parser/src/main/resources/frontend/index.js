import { defineComponent as Us, ref as Ke, onMounted as ul, computed as hl, resolveComponent as Yt, openBlock as je, createElementBlock as gr, createElementVNode as cr, normalizeClass as Ei, withDirectives as Ti, createVNode as j, unref as q, withCtx as ae, createTextVNode as be, toDisplayString as Oe, createCommentVNode as Hr, createBlock as Pt, Fragment as Lt, renderList as va, normalizeStyle as xl, vShow as Si, h as dl } from "vue";
import { ElCard as pa, ElTabs as Fi, ElTabPane as ma, ElUpload as yi, ElIcon as Qr, ElForm as t0, ElFormItem as Jt, ElSelect as a0, ElOption as n0, ElInput as ga, ElButton as gt, ElCollapse as vl, ElCollapseItem as pl, ElTable as wn, ElTableColumn as Ye, ElTag as ot, ElRadioGroup as Ai, ElRadioButton as Ci, ElDescriptions as ml, ElDescriptionsItem as _t, ElDialog as gl, ElMessage as xr } from "element-plus";
/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var Rn = {};
Rn.version = "0.18.5";
var Ws = 1252, _l = [874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1e4], O0 = {
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
}, R0 = function(e) {
  _l.indexOf(e) != -1 && (Ws = O0[0] = e);
};
function wl() {
  R0(1252);
}
var xt = function(e) {
  R0(e);
};
function b0() {
  xt(1200), wl();
}
function Di(e) {
  for (var t = [], r = 0, a = e.length; r < a; ++r) t[r] = e.charCodeAt(r);
  return t;
}
function kl(e) {
  for (var t = [], r = 0; r < e.length >> 1; ++r) t[r] = String.fromCharCode(e.charCodeAt(2 * r) + (e.charCodeAt(2 * r + 1) << 8));
  return t.join("");
}
function Vs(e) {
  for (var t = [], r = 0; r < e.length >> 1; ++r) t[r] = String.fromCharCode(e.charCodeAt(2 * r + 1) + (e.charCodeAt(2 * r) << 8));
  return t.join("");
}
var Ua = function(e) {
  var t = e.charCodeAt(0), r = e.charCodeAt(1);
  return t == 255 && r == 254 ? kl(e.slice(2)) : t == 254 && r == 255 ? Vs(e.slice(2)) : t == 65279 ? e.slice(1) : e;
}, kn = function(t) {
  return String.fromCharCode(t);
}, Ii = function(t) {
  return String.fromCharCode(t);
}, Ja, Mt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function qa(e) {
  for (var t = "", r = 0, a = 0, n = 0, i = 0, s = 0, f = 0, c = 0, l = 0; l < e.length; )
    r = e.charCodeAt(l++), i = r >> 2, a = e.charCodeAt(l++), s = (r & 3) << 4 | a >> 4, n = e.charCodeAt(l++), f = (a & 15) << 2 | n >> 6, c = n & 63, isNaN(a) ? f = c = 64 : isNaN(n) && (c = 64), t += Mt.charAt(i) + Mt.charAt(s) + Mt.charAt(f) + Mt.charAt(c);
  return t;
}
function qr(e) {
  var t = "", r = 0, a = 0, n = 0, i = 0, s = 0, f = 0, c = 0;
  e = e.replace(/[^\w\+\/\=]/g, "");
  for (var l = 0; l < e.length; )
    i = Mt.indexOf(e.charAt(l++)), s = Mt.indexOf(e.charAt(l++)), r = i << 2 | s >> 4, t += String.fromCharCode(r), f = Mt.indexOf(e.charAt(l++)), a = (s & 15) << 4 | f >> 2, f !== 64 && (t += String.fromCharCode(a)), c = Mt.indexOf(e.charAt(l++)), n = (f & 3) << 6 | c, c !== 64 && (t += String.fromCharCode(n));
  return t;
}
var Ne = /* @__PURE__ */ function() {
  return typeof Buffer < "u" && typeof process < "u" && typeof process.versions < "u" && !!process.versions.node;
}(), Rt = /* @__PURE__ */ function() {
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
function Wt(e) {
  return Ne ? Buffer.alloc ? Buffer.alloc(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
function Oi(e) {
  return Ne ? Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
var Yr = function(t) {
  return Ne ? Rt(t, "binary") : t.split("").map(function(r) {
    return r.charCodeAt(0) & 255;
  });
};
function zn(e) {
  if (typeof ArrayBuffer > "u") return Yr(e);
  for (var t = new ArrayBuffer(e.length), r = new Uint8Array(t), a = 0; a != e.length; ++a) r[a] = e.charCodeAt(a) & 255;
  return t;
}
function Gt(e) {
  if (Array.isArray(e)) return e.map(function(a) {
    return String.fromCharCode(a);
  }).join("");
  for (var t = [], r = 0; r < e.length; ++r) t[r] = String.fromCharCode(e[r]);
  return t.join("");
}
function El(e) {
  if (typeof Uint8Array > "u") throw new Error("Unsupported");
  return new Uint8Array(e);
}
function N0(e) {
  if (typeof ArrayBuffer > "u") throw new Error("Unsupported");
  if (e instanceof ArrayBuffer) return N0(new Uint8Array(e));
  for (var t = new Array(e.length), r = 0; r < e.length; ++r) t[r] = e[r];
  return t;
}
var Er = Ne ? function(e) {
  return Buffer.concat(e.map(function(t) {
    return Buffer.isBuffer(t) ? t : Rt(t);
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
function Tl(e) {
  for (var t = [], r = 0, a = e.length + 250, n = Wt(e.length + 255), i = 0; i < e.length; ++i) {
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
    r > a && (t.push(n.slice(0, r)), r = 0, n = Wt(65535), a = 65530);
  }
  return t.push(n.slice(0, r)), Er(t);
}
var Vr = /\u0000/g, Wa = /[\u0001-\u0006]/g;
function Sa(e) {
  for (var t = "", r = e.length - 1; r >= 0; ) t += e.charAt(r--);
  return t;
}
function dt(e, t) {
  var r = "" + e;
  return r.length >= t ? r : nr("0", t - r.length) + r;
}
function P0(e, t) {
  var r = "" + e;
  return r.length >= t ? r : nr(" ", t - r.length) + r;
}
function bn(e, t) {
  var r = "" + e;
  return r.length >= t ? r : r + nr(" ", t - r.length);
}
function Sl(e, t) {
  var r = "" + Math.round(e);
  return r.length >= t ? r : nr("0", t - r.length) + r;
}
function Fl(e, t) {
  var r = "" + e;
  return r.length >= t ? r : nr("0", t - r.length) + r;
}
var Ri = /* @__PURE__ */ Math.pow(2, 32);
function _a(e, t) {
  if (e > Ri || e < -Ri) return Sl(e, t);
  var r = Math.round(e);
  return Fl(r, t);
}
function Nn(e, t) {
  return t = t || 0, e.length >= 7 + t && (e.charCodeAt(t) | 32) === 103 && (e.charCodeAt(t + 1) | 32) === 101 && (e.charCodeAt(t + 2) | 32) === 110 && (e.charCodeAt(t + 3) | 32) === 101 && (e.charCodeAt(t + 4) | 32) === 114 && (e.charCodeAt(t + 5) | 32) === 97 && (e.charCodeAt(t + 6) | 32) === 108;
}
var bi = [
  ["Sun", "Sunday"],
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"]
], i0 = [
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
function yl(e) {
  return e || (e = {}), e[0] = "General", e[1] = "0", e[2] = "0.00", e[3] = "#,##0", e[4] = "#,##0.00", e[9] = "0%", e[10] = "0.00%", e[11] = "0.00E+00", e[12] = "# ?/?", e[13] = "# ??/??", e[14] = "m/d/yy", e[15] = "d-mmm-yy", e[16] = "d-mmm", e[17] = "mmm-yy", e[18] = "h:mm AM/PM", e[19] = "h:mm:ss AM/PM", e[20] = "h:mm", e[21] = "h:mm:ss", e[22] = "m/d/yy h:mm", e[37] = "#,##0 ;(#,##0)", e[38] = "#,##0 ;[Red](#,##0)", e[39] = "#,##0.00;(#,##0.00)", e[40] = "#,##0.00;[Red](#,##0.00)", e[45] = "mm:ss", e[46] = "[h]:mm:ss", e[47] = "mmss.0", e[48] = "##0.0E+0", e[49] = "@", e[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "', e;
}
var Te = {
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
}, Ni = {
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
}, Al = {
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
function Pn(e, t, r) {
  for (var a = e < 0 ? -1 : 1, n = e * a, i = 0, s = 1, f = 0, c = 1, l = 0, o = 0, u = Math.floor(n); l < t && (u = Math.floor(n), f = u * s + i, o = u * l + c, !(n - u < 5e-8)); )
    n = 1 / (n - u), i = s, s = f, c = l, l = o;
  if (o > t && (l > t ? (o = c, f = i) : (o = l, f = s)), !r) return [0, a * f, o];
  var x = Math.floor(a * f / o);
  return [x, a * f - x * o, o];
}
function Zt(e, t, r) {
  if (e > 2958465 || e < 0) return null;
  var a = e | 0, n = Math.floor(86400 * (e - a)), i = 0, s = [], f = { D: a, T: n, u: 86400 * (e - a) - n, y: 0, m: 0, d: 0, H: 0, M: 0, S: 0, q: 0 };
  if (Math.abs(f.u) < 1e-6 && (f.u = 0), t && t.date1904 && (a += 1462), f.u > 0.9999 && (f.u = 0, ++n == 86400 && (f.T = n = 0, ++a, ++f.D)), a === 60)
    s = r ? [1317, 10, 29] : [1900, 2, 29], i = 3;
  else if (a === 0)
    s = r ? [1317, 8, 29] : [1900, 1, 0], i = 6;
  else {
    a > 60 && --a;
    var c = new Date(1900, 0, 1);
    c.setDate(c.getDate() + a - 1), s = [c.getFullYear(), c.getMonth() + 1, c.getDate()], i = c.getDay(), a < 60 && (i = (i + 6) % 7), r && (i = bl(c, s));
  }
  return f.y = s[0], f.m = s[1], f.d = s[2], f.S = n % 60, n = Math.floor(n / 60), f.M = n % 60, n = Math.floor(n / 60), f.H = n, f.q = i, f;
}
var Hs = /* @__PURE__ */ new Date(1899, 11, 31, 0, 0, 0), Cl = /* @__PURE__ */ Hs.getTime(), Dl = /* @__PURE__ */ new Date(1900, 2, 1, 0, 0, 0);
function Xs(e, t) {
  var r = /* @__PURE__ */ e.getTime();
  return t ? r -= 1461 * 24 * 60 * 60 * 1e3 : e >= Dl && (r += 24 * 60 * 60 * 1e3), (r - (Cl + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ Hs.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3);
}
function L0(e) {
  return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1");
}
function Il(e) {
  return e.indexOf("E") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/, "$10$2");
}
function Ol(e) {
  var t = e < 0 ? 12 : 11, r = L0(e.toFixed(12));
  return r.length <= t || (r = e.toPrecision(10), r.length <= t) ? r : e.toExponential(5);
}
function Rl(e) {
  var t = L0(e.toFixed(11));
  return t.length > (e < 0 ? 12 : 11) || t === "0" || t === "-0" ? e.toPrecision(6) : t;
}
function Za(e) {
  var t = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E), r;
  return t >= -4 && t <= -1 ? r = e.toPrecision(10 + t) : Math.abs(t) <= 9 ? r = Ol(e) : t === 10 ? r = e.toFixed(10).substr(0, 12) : r = Rl(e), L0(Il(r.toUpperCase()));
}
function aa(e, t) {
  switch (typeof e) {
    case "string":
      return e;
    case "boolean":
      return e ? "TRUE" : "FALSE";
    case "number":
      return (e | 0) === e ? e.toString(10) : Za(e);
    case "undefined":
      return "";
    case "object":
      if (e == null) return "";
      if (e instanceof Date) return ft(14, Xs(e, t && t.date1904), t);
  }
  throw new Error("unsupported value in General format: " + e);
}
function bl(e, t) {
  t[0] -= 581;
  var r = e.getDay();
  return e < 60 && (r = (r + 6) % 7), r;
}
function Nl(e, t, r, a) {
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
          return i0[r.m - 1][1];
        case 5:
          return i0[r.m - 1][0];
        default:
          return i0[r.m - 1][2];
      }
      break;
    case 100:
      switch (t.length) {
        case 1:
        case 2:
          c = r.d, l = t.length;
          break;
        case 3:
          return bi[r.q][0];
        default:
          return bi[r.q][1];
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
      return r.u === 0 && (t == "s" || t == "ss") ? dt(r.S, t.length) : (a >= 2 ? s = a === 3 ? 1e3 : 100 : s = a === 1 ? 10 : 1, i = Math.round(s * (r.S + r.u)), i >= 60 * s && (i = 0), t === "s" ? i === 0 ? "0" : "" + i / s : (n = dt(i, 2 + a), t === "ss" ? n.substr(0, 2) : "." + n.substr(2, t.length - 1)));
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
  var o = l > 0 ? dt(c, l) : "";
  return o;
}
function Ut(e) {
  var t = 3;
  if (e.length <= t) return e;
  for (var r = e.length % t, a = e.substr(0, r); r != e.length; r += t) a += (a.length > 0 ? "," : "") + e.substr(r, t);
  return a;
}
var Gs = /%/g;
function Pl(e, t, r) {
  var a = t.replace(Gs, ""), n = t.length - a.length;
  return Ct(e, a, r * Math.pow(10, 2 * n)) + nr("%", n);
}
function Ll(e, t, r) {
  for (var a = t.length - 1; t.charCodeAt(a - 1) === 44; ) --a;
  return Ct(e, t.substr(0, a), r / Math.pow(10, 3 * (t.length - a)));
}
function zs(e, t) {
  var r, a = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0) return "0.0E+0";
    if (t < 0) return "-" + zs(e, -t);
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
var $s = /# (\?+)( ?)\/( ?)(\d+)/;
function Bl(e, t, r) {
  var a = parseInt(e[4], 10), n = Math.round(t * a), i = Math.floor(n / a), s = n - i * a, f = a;
  return r + (i === 0 ? "" : "" + i) + " " + (s === 0 ? nr(" ", e[1].length + 1 + e[4].length) : P0(s, e[1].length) + e[2] + "/" + e[3] + dt(f, e[4].length));
}
function Ml(e, t, r) {
  return r + (t === 0 ? "" : "" + t) + nr(" ", e[1].length + 2 + e[4].length);
}
var Ks = /^#*0*\.([0#]+)/, js = /\).*[0#]/, Ys = /\(###\) ###\\?-####/;
function Ur(e) {
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
function Pi(e, t) {
  var r = Math.pow(10, t);
  return "" + Math.round(e * r) / r;
}
function Li(e, t) {
  var r = e - Math.floor(e), a = Math.pow(10, t);
  return t < ("" + Math.round(r * a)).length ? 0 : Math.round(r * a);
}
function Ul(e, t) {
  return t < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, t))).length ? 1 : 0;
}
function Wl(e) {
  return e < 2147483647 && e > -2147483648 ? "" + (e >= 0 ? e | 0 : e - 1 | 0) : "" + Math.floor(e);
}
function rt(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(js)) {
    var a = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? rt("n", a, r) : "(" + rt("n", a, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44) return Ll(e, t, r);
  if (t.indexOf("%") !== -1) return Pl(e, t, r);
  if (t.indexOf("E") !== -1) return zs(t, r);
  if (t.charCodeAt(0) === 36) return "$" + rt(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var n, i, s, f, c = Math.abs(r), l = r < 0 ? "-" : "";
  if (t.match(/^00+$/)) return l + _a(c, t.length);
  if (t.match(/^[#?]+$/))
    return n = _a(r, 0), n === "0" && (n = ""), n.length > t.length ? n : Ur(t.substr(0, t.length - n.length)) + n;
  if (i = t.match($s)) return Bl(i, c, l);
  if (t.match(/^#+0+$/)) return l + _a(c, t.length - t.indexOf("0"));
  if (i = t.match(Ks))
    return n = Pi(r, i[1].length).replace(/^([^\.]+)$/, "$1." + Ur(i[1])).replace(/\.$/, "." + Ur(i[1])).replace(/\.(\d*)$/, function(v, h) {
      return "." + h + nr("0", Ur(
        /*::(*/
        i[1]
      ).length - h.length);
    }), t.indexOf("0.") !== -1 ? n : n.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return l + Pi(c, i[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/)) return l + Ut(_a(c, 0));
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + rt(e, t, -r) : Ut("" + (Math.floor(r) + Ul(r, i[1].length))) + "." + dt(Li(r, i[1].length), i[1].length);
  if (i = t.match(/^#,#*,#0/)) return rt(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return n = Sa(rt(e, t.replace(/[\\-]/g, ""), r)), s = 0, Sa(Sa(t.replace(/\\/g, "")).replace(/[0#]/g, function(v) {
      return s < n.length ? n.charAt(s++) : v === "0" ? "0" : "";
    }));
  if (t.match(Ys))
    return n = rt(e, "##########", r), "(" + n.substr(0, 3) + ") " + n.substr(3, 3) + "-" + n.substr(6);
  var o = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), f = Pn(c, Math.pow(10, s) - 1, !1), n = "" + l, o = Ct(
      "n",
      /*::String(*/
      i[1],
      f[1]
    ), o.charAt(o.length - 1) == " " && (o = o.substr(0, o.length - 1) + "0"), n += o + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], o = bn(f[2], s), o.length < i[4].length && (o = Ur(i[4].substr(i[4].length - o.length)) + o), n += o, n;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = Pn(c, Math.pow(10, s) - 1, !0), l + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? P0(f[1], s) + i[2] + "/" + i[3] + bn(f[2], s) : nr(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return n = _a(r, 0), t.length <= n.length ? n : Ur(t.substr(0, t.length - n.length)) + n;
  if (i = t.match(/^([#0?]+)\.([#0]+)$/)) {
    n = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = n.indexOf(".");
    var u = t.indexOf(".") - s, x = t.length - n.length - u;
    return Ur(t.substr(0, u) + n + t.substr(t.length - x));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return s = Li(r, i[1].length), r < 0 ? "-" + rt(e, t, -r) : Ut(Wl(r)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(v) {
      return "00," + (v.length < 3 ? dt(0, 3 - v.length) : "") + v;
    }) + "." + dt(s, i[1].length);
  switch (t) {
    case "###,##0.00":
      return rt(e, "#,##0.00", r);
    case "###,###":
    case "##,###":
    case "#,###":
      var d = Ut(_a(c, 0));
      return d !== "0" ? l + d : "";
    case "###,###.00":
      return rt(e, "###,##0.00", r).replace(/^0\./, ".");
    case "#,###.00":
      return rt(e, "#,##0.00", r).replace(/^0\./, ".");
  }
  throw new Error("unsupported format |" + t + "|");
}
function Vl(e, t, r) {
  for (var a = t.length - 1; t.charCodeAt(a - 1) === 44; ) --a;
  return Ct(e, t.substr(0, a), r / Math.pow(10, 3 * (t.length - a)));
}
function Hl(e, t, r) {
  var a = t.replace(Gs, ""), n = t.length - a.length;
  return Ct(e, a, r * Math.pow(10, 2 * n)) + nr("%", n);
}
function Js(e, t) {
  var r, a = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0) return "0.0E+0";
    if (t < 0) return "-" + Js(e, -t);
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
function kt(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(js)) {
    var a = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? kt("n", a, r) : "(" + kt("n", a, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44) return Vl(e, t, r);
  if (t.indexOf("%") !== -1) return Hl(e, t, r);
  if (t.indexOf("E") !== -1) return Js(t, r);
  if (t.charCodeAt(0) === 36) return "$" + kt(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var n, i, s, f, c = Math.abs(r), l = r < 0 ? "-" : "";
  if (t.match(/^00+$/)) return l + dt(c, t.length);
  if (t.match(/^[#?]+$/))
    return n = "" + r, r === 0 && (n = ""), n.length > t.length ? n : Ur(t.substr(0, t.length - n.length)) + n;
  if (i = t.match($s)) return Ml(i, c, l);
  if (t.match(/^#+0+$/)) return l + dt(c, t.length - t.indexOf("0"));
  if (i = t.match(Ks))
    return n = ("" + r).replace(/^([^\.]+)$/, "$1." + Ur(i[1])).replace(/\.$/, "." + Ur(i[1])), n = n.replace(/\.(\d*)$/, function(v, h) {
      return "." + h + nr("0", Ur(i[1]).length - h.length);
    }), t.indexOf("0.") !== -1 ? n : n.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return l + ("" + c).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/)) return l + Ut("" + c);
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + kt(e, t, -r) : Ut("" + r) + "." + nr("0", i[1].length);
  if (i = t.match(/^#,#*,#0/)) return kt(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return n = Sa(kt(e, t.replace(/[\\-]/g, ""), r)), s = 0, Sa(Sa(t.replace(/\\/g, "")).replace(/[0#]/g, function(v) {
      return s < n.length ? n.charAt(s++) : v === "0" ? "0" : "";
    }));
  if (t.match(Ys))
    return n = kt(e, "##########", r), "(" + n.substr(0, 3) + ") " + n.substr(3, 3) + "-" + n.substr(6);
  var o = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), f = Pn(c, Math.pow(10, s) - 1, !1), n = "" + l, o = Ct(
      "n",
      /*::String(*/
      i[1],
      f[1]
    ), o.charAt(o.length - 1) == " " && (o = o.substr(0, o.length - 1) + "0"), n += o + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], o = bn(f[2], s), o.length < i[4].length && (o = Ur(i[4].substr(i[4].length - o.length)) + o), n += o, n;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = Pn(c, Math.pow(10, s) - 1, !0), l + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? P0(f[1], s) + i[2] + "/" + i[3] + bn(f[2], s) : nr(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return n = "" + r, t.length <= n.length ? n : Ur(t.substr(0, t.length - n.length)) + n;
  if (i = t.match(/^([#0]+)\.([#0]+)$/)) {
    n = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = n.indexOf(".");
    var u = t.indexOf(".") - s, x = t.length - n.length - u;
    return Ur(t.substr(0, u) + n + t.substr(t.length - x));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return r < 0 ? "-" + kt(e, t, -r) : Ut("" + r).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(v) {
      return "00," + (v.length < 3 ? dt(0, 3 - v.length) : "") + v;
    }) + "." + dt(0, i[1].length);
  switch (t) {
    case "###,###":
    case "##,###":
    case "#,###":
      var d = Ut("" + c);
      return d !== "0" ? l + d : "";
    default:
      if (t.match(/\.[0#?]*$/)) return kt(e, t.slice(0, t.lastIndexOf(".")), r) + Ur(t.slice(t.lastIndexOf(".")));
  }
  throw new Error("unsupported format |" + t + "|");
}
function Ct(e, t, r) {
  return (r | 0) === r ? kt(e, t, r) : rt(e, t, r);
}
function Xl(e) {
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
var qs = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
function Oa(e) {
  for (var t = 0, r = "", a = ""; t < e.length; )
    switch (r = e.charAt(t)) {
      case "G":
        Nn(e, t) && (t += 6), t++;
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
        if (a.match(qs)) return !0;
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
function Gl(e, t, r, a) {
  for (var n = [], i = "", s = 0, f = "", c = "t", l, o, u, x = "H"; s < e.length; )
    switch (f = e.charAt(s)) {
      case "G":
        if (!Nn(e, s)) throw new Error("unrecognized character " + f + " in " + e);
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
          if (l == null && (l = Zt(t, r, e.charAt(s + 1) === "2"), l == null))
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
        if (t < 0 || l == null && (l = Zt(t, r), l == null))
          return "";
        for (i = f; ++s < e.length && e.charAt(s).toLowerCase() === f; ) i += f;
        f === "m" && c.toLowerCase() === "h" && (f = "M"), f === "h" && (f = x), n[n.length] = { t: f, v: i }, c = f;
        break;
      case "A":
      case "a":
      case "上":
        var h = { t: f, v: f };
        if (l == null && (l = Zt(t, r)), e.substr(s, 3).toUpperCase() === "A/P" ? (l != null && (h.v = l.H >= 12 ? "P" : "A"), h.t = "T", x = "h", s += 3) : e.substr(s, 5).toUpperCase() === "AM/PM" ? (l != null && (h.v = l.H >= 12 ? "PM" : "AM"), h.t = "T", s += 5, x = "h") : e.substr(s, 5).toUpperCase() === "上午/下午" ? (l != null && (h.v = l.H >= 12 ? "下午" : "上午"), h.t = "T", s += 5, x = "h") : (h.t = "t", ++s), l == null && h.t === "T") return "";
        n[n.length] = h, c = f;
        break;
      case "[":
        for (i = f; e.charAt(s++) !== "]" && s < e.length; ) i += e.charAt(s);
        if (i.slice(-1) !== "]") throw 'unterminated "[" block: |' + i + "|";
        if (i.match(qs)) {
          if (l == null && (l = Zt(t, r), l == null))
            return "";
          n[n.length] = { t: "Z", v: i.toLowerCase() }, c = i.charAt(1);
        } else i.indexOf("$") > -1 && (i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$", Oa(e) || (n[n.length] = { t: "t", v: i }));
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
  var p = 0, k = 0, T;
  for (s = n.length - 1, c = "t"; s >= 0; --s)
    switch (n[s].t) {
      case "h":
      case "H":
        n[s].t = x, c = "h", p < 1 && (p = 1);
        break;
      case "s":
        (T = n[s].v.match(/\.0+$/)) && (k = Math.max(k, T[0].length - 1)), p < 3 && (p = 3);
      case "d":
      case "y":
      case "M":
      case "e":
        c = n[s].t;
        break;
      case "m":
        c === "s" && (n[s].t = "M", p < 2 && (p = 2));
        break;
      case "X":
        break;
      case "Z":
        p < 1 && n[s].v.match(/[Hh]/) && (p = 1), p < 2 && n[s].v.match(/[Mm]/) && (p = 2), p < 3 && n[s].v.match(/[Ss]/) && (p = 3);
    }
  switch (p) {
    case 0:
      break;
    case 1:
      l.u >= 0.5 && (l.u = 0, ++l.S), l.S >= 60 && (l.S = 0, ++l.M), l.M >= 60 && (l.M = 0, ++l.H);
      break;
    case 2:
      l.u >= 0.5 && (l.u = 0, ++l.S), l.S >= 60 && (l.S = 0, ++l.M);
      break;
  }
  var g = "", D;
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
        n[s].v = Nl(n[s].t.charCodeAt(0), n[s].v, l, k), n[s].t = "t";
        break;
      case "n":
      case "?":
        for (D = s + 1; n[D] != null && ((f = n[D].t) === "?" || f === "D" || (f === " " || f === "t") && n[D + 1] != null && (n[D + 1].t === "?" || n[D + 1].t === "t" && n[D + 1].v === "/") || n[s].t === "(" && (f === " " || f === "n" || f === ")") || f === "t" && (n[D].v === "/" || n[D].v === " " && n[D + 1] != null && n[D + 1].t == "?")); )
          n[s].v += n[D].v, n[D] = { v: "", t: ";" }, ++D;
        g += n[s].v, s = D - 1;
        break;
      case "G":
        n[s].t = "t", n[s].v = aa(t, r);
        break;
    }
  var N = "", b, F;
  if (g.length > 0) {
    g.charCodeAt(0) == 40 ? (b = t < 0 && g.charCodeAt(0) === 45 ? -t : t, F = Ct("n", g, b)) : (b = t < 0 && a > 1 ? -t : t, F = Ct("n", g, b), b < 0 && n[0] && n[0].t == "t" && (F = F.substr(1), n[0].v = "-" + n[0].v)), D = F.length - 1;
    var B = n.length;
    for (s = 0; s < n.length; ++s) if (n[s] != null && n[s].t != "t" && n[s].v.indexOf(".") > -1) {
      B = s;
      break;
    }
    var O = n.length;
    if (B === n.length && F.indexOf("E") === -1) {
      for (s = n.length - 1; s >= 0; --s)
        n[s] == null || "n?".indexOf(n[s].t) === -1 || (D >= n[s].v.length - 1 ? (D -= n[s].v.length, n[s].v = F.substr(D + 1, n[s].v.length)) : D < 0 ? n[s].v = "" : (n[s].v = F.substr(0, D + 1), D = -1), n[s].t = "t", O = s);
      D >= 0 && O < n.length && (n[O].v = F.substr(0, D + 1) + n[O].v);
    } else if (B !== n.length && F.indexOf("E") === -1) {
      for (D = F.indexOf(".") - 1, s = B; s >= 0; --s)
        if (!(n[s] == null || "n?".indexOf(n[s].t) === -1)) {
          for (o = n[s].v.indexOf(".") > -1 && s === B ? n[s].v.indexOf(".") - 1 : n[s].v.length - 1, N = n[s].v.substr(o + 1); o >= 0; --o)
            D >= 0 && (n[s].v.charAt(o) === "0" || n[s].v.charAt(o) === "#") && (N = F.charAt(D--) + N);
          n[s].v = N, n[s].t = "t", O = s;
        }
      for (D >= 0 && O < n.length && (n[O].v = F.substr(0, D + 1) + n[O].v), D = F.indexOf(".") + 1, s = B; s < n.length; ++s)
        if (!(n[s] == null || "n?(".indexOf(n[s].t) === -1 && s !== B)) {
          for (o = n[s].v.indexOf(".") > -1 && s === B ? n[s].v.indexOf(".") + 1 : 0, N = n[s].v.substr(0, o); o < n[s].v.length; ++o)
            D < F.length && (N += F.charAt(D++));
          n[s].v = N, n[s].t = "t", O = s;
        }
    }
  }
  for (s = 0; s < n.length; ++s) n[s] != null && "n?".indexOf(n[s].t) > -1 && (b = a > 1 && t < 0 && s > 0 && n[s - 1].v === "-" ? -t : t, n[s].v = Ct(n[s].t, n[s].v, b), n[s].t = "t");
  var z = "";
  for (s = 0; s !== n.length; ++s) n[s] != null && (z += n[s].v);
  return z;
}
var Bi = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
function Mi(e, t) {
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
function zl(e, t) {
  var r = Xl(e), a = r.length, n = r[a - 1].indexOf("@");
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
    var s = r[0].match(Bi), f = r[1].match(Bi);
    return Mi(t, s) ? [a, r[0]] : Mi(t, f) ? [a, r[1]] : [a, r[s != null && f != null ? 2 : 1]];
  }
  return [a, i];
}
function ft(e, t, r) {
  r == null && (r = {});
  var a = "";
  switch (typeof e) {
    case "string":
      e == "m/d/yy" && r.dateNF ? a = r.dateNF : a = e;
      break;
    case "number":
      e == 14 && r.dateNF ? a = r.dateNF : a = (r.table != null ? r.table : Te)[e], a == null && (a = r.table && r.table[Ni[e]] || Te[Ni[e]]), a == null && (a = Al[e] || "General");
      break;
  }
  if (Nn(a, 0)) return aa(t, r);
  t instanceof Date && (t = Xs(t, r.date1904));
  var n = zl(a, t);
  if (Nn(n[1])) return aa(t, r);
  if (t === !0) t = "TRUE";
  else if (t === !1) t = "FALSE";
  else if (t === "" || t == null) return "";
  return Gl(n[1], t, r, n[0]);
}
function Dt(e, t) {
  if (typeof t != "number") {
    t = +t || -1;
    for (var r = 0; r < 392; ++r) {
      if (Te[r] == null) {
        t < 0 && (t = r);
        continue;
      }
      if (Te[r] == e) {
        t = r;
        break;
      }
    }
    t < 0 && (t = 391);
  }
  return Te[t] = e, t;
}
function $n(e) {
  for (var t = 0; t != 392; ++t)
    e[t] !== void 0 && Dt(e[t], t);
}
function Ra() {
  Te = yl();
}
var $l = {
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
}, Zs = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
function Kl(e) {
  var t = typeof e == "number" ? Te[e] : e;
  return t = t.replace(Zs, "(\\d+)"), new RegExp("^" + t + "$");
}
function jl(e, t, r) {
  var a = -1, n = -1, i = -1, s = -1, f = -1, c = -1;
  (t.match(Zs) || []).forEach(function(u, x) {
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
var Yl = /* @__PURE__ */ function() {
  var e = {};
  e.version = "1.2.0";
  function t() {
    for (var F = 0, B = new Array(256), O = 0; O != 256; ++O)
      F = O, F = F & 1 ? -306674912 ^ F >>> 1 : F >>> 1, F = F & 1 ? -306674912 ^ F >>> 1 : F >>> 1, F = F & 1 ? -306674912 ^ F >>> 1 : F >>> 1, F = F & 1 ? -306674912 ^ F >>> 1 : F >>> 1, F = F & 1 ? -306674912 ^ F >>> 1 : F >>> 1, F = F & 1 ? -306674912 ^ F >>> 1 : F >>> 1, F = F & 1 ? -306674912 ^ F >>> 1 : F >>> 1, F = F & 1 ? -306674912 ^ F >>> 1 : F >>> 1, B[O] = F;
    return typeof Int32Array < "u" ? new Int32Array(B) : B;
  }
  var r = t();
  function a(F) {
    var B = 0, O = 0, z = 0, X = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
    for (z = 0; z != 256; ++z) X[z] = F[z];
    for (z = 0; z != 256; ++z)
      for (O = F[z], B = 256 + z; B < 4096; B += 256) O = X[B] = O >>> 8 ^ F[O & 255];
    var L = [];
    for (z = 1; z != 16; ++z) L[z - 1] = typeof Int32Array < "u" ? X.subarray(z * 256, z * 256 + 256) : X.slice(z * 256, z * 256 + 256);
    return L;
  }
  var n = a(r), i = n[0], s = n[1], f = n[2], c = n[3], l = n[4], o = n[5], u = n[6], x = n[7], d = n[8], v = n[9], h = n[10], p = n[11], k = n[12], T = n[13], g = n[14];
  function D(F, B) {
    for (var O = B ^ -1, z = 0, X = F.length; z < X; ) O = O >>> 8 ^ r[(O ^ F.charCodeAt(z++)) & 255];
    return ~O;
  }
  function N(F, B) {
    for (var O = B ^ -1, z = F.length - 15, X = 0; X < z; ) O = g[F[X++] ^ O & 255] ^ T[F[X++] ^ O >> 8 & 255] ^ k[F[X++] ^ O >> 16 & 255] ^ p[F[X++] ^ O >>> 24] ^ h[F[X++]] ^ v[F[X++]] ^ d[F[X++]] ^ x[F[X++]] ^ u[F[X++]] ^ o[F[X++]] ^ l[F[X++]] ^ c[F[X++]] ^ f[F[X++]] ^ s[F[X++]] ^ i[F[X++]] ^ r[F[X++]];
    for (z += 15; X < z; ) O = O >>> 8 ^ r[(O ^ F[X++]) & 255];
    return ~O;
  }
  function b(F, B) {
    for (var O = B ^ -1, z = 0, X = F.length, L = 0, te = 0; z < X; )
      L = F.charCodeAt(z++), L < 128 ? O = O >>> 8 ^ r[(O ^ L) & 255] : L < 2048 ? (O = O >>> 8 ^ r[(O ^ (192 | L >> 6 & 31)) & 255], O = O >>> 8 ^ r[(O ^ (128 | L & 63)) & 255]) : L >= 55296 && L < 57344 ? (L = (L & 1023) + 64, te = F.charCodeAt(z++) & 1023, O = O >>> 8 ^ r[(O ^ (240 | L >> 8 & 7)) & 255], O = O >>> 8 ^ r[(O ^ (128 | L >> 2 & 63)) & 255], O = O >>> 8 ^ r[(O ^ (128 | te >> 6 & 15 | (L & 3) << 4)) & 255], O = O >>> 8 ^ r[(O ^ (128 | te & 63)) & 255]) : (O = O >>> 8 ^ r[(O ^ (224 | L >> 12 & 15)) & 255], O = O >>> 8 ^ r[(O ^ (128 | L >> 6 & 63)) & 255], O = O >>> 8 ^ r[(O ^ (128 | L & 63)) & 255]);
    return ~O;
  }
  return e.table = r, e.bstr = D, e.buf = N, e.str = b, e;
}(), we = /* @__PURE__ */ function() {
  var t = {};
  t.version = "1.2.1";
  function r(m, E) {
    for (var _ = m.split("/"), w = E.split("/"), S = 0, y = 0, W = Math.min(_.length, w.length); S < W; ++S) {
      if (y = _[S].length - w[S].length) return y;
      if (_[S] != w[S]) return _[S] < w[S] ? -1 : 1;
    }
    return _.length - w.length;
  }
  function a(m) {
    if (m.charAt(m.length - 1) == "/") return m.slice(0, -1).indexOf("/") === -1 ? m : a(m.slice(0, -1));
    var E = m.lastIndexOf("/");
    return E === -1 ? m : m.slice(0, E + 1);
  }
  function n(m) {
    if (m.charAt(m.length - 1) == "/") return n(m.slice(0, -1));
    var E = m.lastIndexOf("/");
    return E === -1 ? m : m.slice(E + 1);
  }
  function i(m, E) {
    typeof E == "string" && (E = new Date(E));
    var _ = E.getHours();
    _ = _ << 6 | E.getMinutes(), _ = _ << 5 | E.getSeconds() >>> 1, m.write_shift(2, _);
    var w = E.getFullYear() - 1980;
    w = w << 4 | E.getMonth() + 1, w = w << 5 | E.getDate(), m.write_shift(2, w);
  }
  function s(m) {
    var E = m.read_shift(2) & 65535, _ = m.read_shift(2) & 65535, w = /* @__PURE__ */ new Date(), S = _ & 31;
    _ >>>= 5;
    var y = _ & 15;
    _ >>>= 4, w.setMilliseconds(0), w.setFullYear(_ + 1980), w.setMonth(y - 1), w.setDate(S);
    var W = E & 31;
    E >>>= 5;
    var J = E & 63;
    return E >>>= 6, w.setHours(E), w.setMinutes(J), w.setSeconds(W << 1), w;
  }
  function f(m) {
    Fr(m, 0);
    for (var E = (
      /*::(*/
      {}
    ), _ = 0; m.l <= m.length - 4; ) {
      var w = m.read_shift(2), S = m.read_shift(2), y = m.l + S, W = {};
      switch (w) {
        case 21589:
          _ = m.read_shift(1), _ & 1 && (W.mtime = m.read_shift(4)), S > 5 && (_ & 2 && (W.atime = m.read_shift(4)), _ & 4 && (W.ctime = m.read_shift(4))), W.mtime && (W.mt = new Date(W.mtime * 1e3));
          break;
      }
      m.l = y, E[w] = W;
    }
    return E;
  }
  var c;
  function l() {
    return c || (c = {});
  }
  function o(m, E) {
    if (m[0] == 80 && m[1] == 75) return ki(m, E);
    if ((m[0] | 32) == 109 && (m[1] | 32) == 105) return il(m, E);
    if (m.length < 512) throw new Error("CFB file size " + m.length + " < 512");
    var _ = 3, w = 512, S = 0, y = 0, W = 0, J = 0, M = 0, V = [], H = (
      /*::(*/
      m.slice(0, 512)
    );
    Fr(H, 0);
    var se = u(H);
    switch (_ = se[0], _) {
      case 3:
        w = 512;
        break;
      case 4:
        w = 4096;
        break;
      case 0:
        if (se[1] == 0) return ki(m, E);
      default:
        throw new Error("Major Version: Expected 3 or 4 saw " + _);
    }
    w !== 512 && (H = /*::(*/
    m.slice(0, w), Fr(
      H,
      28
      /* blob.l */
    ));
    var xe = m.slice(0, w);
    x(H, _);
    var ge = H.read_shift(4, "i");
    if (_ === 3 && ge !== 0) throw new Error("# Directory Sectors: Expected 0 saw " + ge);
    H.l += 4, W = H.read_shift(4, "i"), H.l += 4, H.chk("00100000", "Mini Stream Cutoff Size: "), J = H.read_shift(4, "i"), S = H.read_shift(4, "i"), M = H.read_shift(4, "i"), y = H.read_shift(4, "i");
    for (var le = -1, me = 0; me < 109 && (le = H.read_shift(4, "i"), !(le < 0)); ++me)
      V[me] = le;
    var Ce = d(m, w);
    p(M, y, Ce, w, V);
    var er = T(Ce, W, V, w);
    er[W].name = "!Directory", S > 0 && J !== te && (er[J].name = "!MiniFAT"), er[V[0]].name = "!FAT", er.fat_addrs = V, er.ssz = w;
    var rr = {}, Dr = [], Pa = [], La = [];
    g(W, er, Ce, Dr, S, rr, Pa, J), v(Pa, La, Dr), Dr.shift();
    var Ba = {
      FileIndex: Pa,
      FullPaths: La
    };
    return E && E.raw && (Ba.raw = { header: xe, sectors: Ce }), Ba;
  }
  function u(m) {
    if (m[m.l] == 80 && m[m.l + 1] == 75) return [0, 0];
    m.chk(pe, "Header Signature: "), m.l += 16;
    var E = m.read_shift(2, "u");
    return [m.read_shift(2, "u"), E];
  }
  function x(m, E) {
    var _ = 9;
    switch (m.l += 2, _ = m.read_shift(2)) {
      case 9:
        if (E != 3) throw new Error("Sector Shift: Expected 9 saw " + _);
        break;
      case 12:
        if (E != 4) throw new Error("Sector Shift: Expected 12 saw " + _);
        break;
      default:
        throw new Error("Sector Shift: Expected 9 or 12 saw " + _);
    }
    m.chk("0600", "Mini Sector Shift: "), m.chk("000000000000", "Reserved: ");
  }
  function d(m, E) {
    for (var _ = Math.ceil(m.length / E) - 1, w = [], S = 1; S < _; ++S) w[S - 1] = m.slice(S * E, (S + 1) * E);
    return w[_ - 1] = m.slice(_ * E), w;
  }
  function v(m, E, _) {
    for (var w = 0, S = 0, y = 0, W = 0, J = 0, M = _.length, V = [], H = []; w < M; ++w)
      V[w] = H[w] = w, E[w] = _[w];
    for (; J < H.length; ++J)
      w = H[J], S = m[w].L, y = m[w].R, W = m[w].C, V[w] === w && (S !== -1 && V[S] !== S && (V[w] = V[S]), y !== -1 && V[y] !== y && (V[w] = V[y])), W !== -1 && (V[W] = w), S !== -1 && w != V[w] && (V[S] = V[w], H.lastIndexOf(S) < J && H.push(S)), y !== -1 && w != V[w] && (V[y] = V[w], H.lastIndexOf(y) < J && H.push(y));
    for (w = 1; w < M; ++w) V[w] === w && (y !== -1 && V[y] !== y ? V[w] = V[y] : S !== -1 && V[S] !== S && (V[w] = V[S]));
    for (w = 1; w < M; ++w)
      if (m[w].type !== 0) {
        if (J = w, J != V[J]) do
          J = V[J], E[w] = E[J] + "/" + E[w];
        while (J !== 0 && V[J] !== -1 && J != V[J]);
        V[w] = -1;
      }
    for (E[0] += "/", w = 1; w < M; ++w)
      m[w].type !== 2 && (E[w] += "/");
  }
  function h(m, E, _) {
    for (var w = m.start, S = m.size, y = [], W = w; _ && S > 0 && W >= 0; )
      y.push(E.slice(W * L, W * L + L)), S -= L, W = qt(_, W * 4);
    return y.length === 0 ? K(0) : Er(y).slice(0, m.size);
  }
  function p(m, E, _, w, S) {
    var y = te;
    if (m === te) {
      if (E !== 0) throw new Error("DIFAT chain shorter than expected");
    } else if (m !== -1) {
      var W = _[m], J = (w >>> 2) - 1;
      if (!W) return;
      for (var M = 0; M < J && (y = qt(W, M * 4)) !== te; ++M)
        S.push(y);
      p(qt(W, w - 4), E - 1, _, w, S);
    }
  }
  function k(m, E, _, w, S) {
    var y = [], W = [];
    S || (S = []);
    var J = w - 1, M = 0, V = 0;
    for (M = E; M >= 0; ) {
      S[M] = !0, y[y.length] = M, W.push(m[M]);
      var H = _[Math.floor(M * 4 / w)];
      if (V = M * 4 & J, w < 4 + V) throw new Error("FAT boundary crossed: " + M + " 4 " + w);
      if (!m[H]) break;
      M = qt(m[H], V);
    }
    return { nodes: y, data: Ji([W]) };
  }
  function T(m, E, _, w) {
    var S = m.length, y = [], W = [], J = [], M = [], V = w - 1, H = 0, se = 0, xe = 0, ge = 0;
    for (H = 0; H < S; ++H)
      if (J = [], xe = H + E, xe >= S && (xe -= S), !W[xe]) {
        M = [];
        var le = [];
        for (se = xe; se >= 0; ) {
          le[se] = !0, W[se] = !0, J[J.length] = se, M.push(m[se]);
          var me = _[Math.floor(se * 4 / w)];
          if (ge = se * 4 & V, w < 4 + ge) throw new Error("FAT boundary crossed: " + se + " 4 " + w);
          if (!m[me] || (se = qt(m[me], ge), le[se])) break;
        }
        y[xe] = { nodes: J, data: Ji([M]) };
      }
    return y;
  }
  function g(m, E, _, w, S, y, W, J) {
    for (var M = 0, V = w.length ? 2 : 0, H = E[m].data, se = 0, xe = 0, ge; se < H.length; se += 128) {
      var le = (
        /*::(*/
        H.slice(se, se + 128)
      );
      Fr(le, 64), xe = le.read_shift(2), ge = X0(le, 0, xe - V), w.push(ge);
      var me = {
        name: ge,
        type: le.read_shift(1),
        color: le.read_shift(1),
        L: le.read_shift(4, "i"),
        R: le.read_shift(4, "i"),
        C: le.read_shift(4, "i"),
        clsid: le.read_shift(16),
        state: le.read_shift(4, "i"),
        start: 0,
        size: 0
      }, Ce = le.read_shift(2) + le.read_shift(2) + le.read_shift(2) + le.read_shift(2);
      Ce !== 0 && (me.ct = D(le, le.l - 8));
      var er = le.read_shift(2) + le.read_shift(2) + le.read_shift(2) + le.read_shift(2);
      er !== 0 && (me.mt = D(le, le.l - 8)), me.start = le.read_shift(4, "i"), me.size = le.read_shift(4, "i"), me.size < 0 && me.start < 0 && (me.size = me.type = 0, me.start = te, me.name = ""), me.type === 5 ? (M = me.start, S > 0 && M !== te && (E[M].name = "!StreamData")) : me.size >= 4096 ? (me.storage = "fat", E[me.start] === void 0 && (E[me.start] = k(_, me.start, E.fat_addrs, E.ssz)), E[me.start].name = me.name, me.content = E[me.start].data.slice(0, me.size)) : (me.storage = "minifat", me.size < 0 ? me.size = 0 : M !== te && me.start !== te && E[M] && (me.content = h(me, E[M].data, (E[J] || {}).data))), me.content && Fr(me.content, 0), y[ge] = me, W.push(me);
    }
  }
  function D(m, E) {
    return new Date((jr(m, E + 4) / 1e7 * Math.pow(2, 32) + jr(m, E) / 1e7 - 11644473600) * 1e3);
  }
  function N(m, E) {
    return l(), o(c.readFileSync(m), E);
  }
  function b(m, E) {
    var _ = E && E.type;
    switch (_ || Ne && Buffer.isBuffer(m) && (_ = "buffer"), _ || "base64") {
      case "file":
        return N(m, E);
      case "base64":
        return o(Yr(qr(m)), E);
      case "binary":
        return o(Yr(m), E);
    }
    return o(
      /*::typeof blob == 'string' ? new Buffer(blob, 'utf-8') : */
      m,
      E
    );
  }
  function F(m, E) {
    var _ = E || {}, w = _.root || "Root Entry";
    if (m.FullPaths || (m.FullPaths = []), m.FileIndex || (m.FileIndex = []), m.FullPaths.length !== m.FileIndex.length) throw new Error("inconsistent CFB structure");
    m.FullPaths.length === 0 && (m.FullPaths[0] = w + "/", m.FileIndex[0] = { name: w, type: 5 }), _.CLSID && (m.FileIndex[0].clsid = _.CLSID), B(m);
  }
  function B(m) {
    var E = "Sh33tJ5";
    if (!we.find(m, "/" + E)) {
      var _ = K(4);
      _[0] = 55, _[1] = _[3] = 50, _[2] = 54, m.FileIndex.push({ name: E, type: 2, content: _, size: 4, L: 69, R: 69, C: 69 }), m.FullPaths.push(m.FullPaths[0] + E), O(m);
    }
  }
  function O(m, E) {
    F(m);
    for (var _ = !1, w = !1, S = m.FullPaths.length - 1; S >= 0; --S) {
      var y = m.FileIndex[S];
      switch (y.type) {
        case 0:
          w ? _ = !0 : (m.FileIndex.pop(), m.FullPaths.pop());
          break;
        case 1:
        case 2:
        case 5:
          w = !0, isNaN(y.R * y.L * y.C) && (_ = !0), y.R > -1 && y.L > -1 && y.R == y.L && (_ = !0);
          break;
        default:
          _ = !0;
          break;
      }
    }
    if (!(!_ && !E)) {
      var W = new Date(1987, 1, 19), J = 0, M = Object.create ? /* @__PURE__ */ Object.create(null) : {}, V = [];
      for (S = 0; S < m.FullPaths.length; ++S)
        M[m.FullPaths[S]] = !0, m.FileIndex[S].type !== 0 && V.push([m.FullPaths[S], m.FileIndex[S]]);
      for (S = 0; S < V.length; ++S) {
        var H = a(V[S][0]);
        w = M[H], w || (V.push([H, {
          name: n(H).replace("/", ""),
          type: 1,
          clsid: de,
          ct: W,
          mt: W,
          content: null
        }]), M[H] = !0);
      }
      for (V.sort(function(ge, le) {
        return r(ge[0], le[0]);
      }), m.FullPaths = [], m.FileIndex = [], S = 0; S < V.length; ++S)
        m.FullPaths[S] = V[S][0], m.FileIndex[S] = V[S][1];
      for (S = 0; S < V.length; ++S) {
        var se = m.FileIndex[S], xe = m.FullPaths[S];
        if (se.name = n(xe).replace("/", ""), se.L = se.R = se.C = -(se.color = 1), se.size = se.content ? se.content.length : 0, se.start = 0, se.clsid = se.clsid || de, S === 0)
          se.C = V.length > 1 ? 1 : -1, se.size = 0, se.type = 5;
        else if (xe.slice(-1) == "/") {
          for (J = S + 1; J < V.length && a(m.FullPaths[J]) != xe; ++J) ;
          for (se.C = J >= V.length ? -1 : J, J = S + 1; J < V.length && a(m.FullPaths[J]) != a(xe); ++J) ;
          se.R = J >= V.length ? -1 : J, se.type = 1;
        } else
          a(m.FullPaths[S + 1] || "") == a(xe) && (se.R = S + 1), se.type = 2;
      }
    }
  }
  function z(m, E) {
    var _ = E || {};
    if (_.fileType == "mad") return sl(m, _);
    switch (O(m), _.fileType) {
      case "zip":
        return Qc(m, _);
    }
    var w = function(ge) {
      for (var le = 0, me = 0, Ce = 0; Ce < ge.FileIndex.length; ++Ce) {
        var er = ge.FileIndex[Ce];
        if (er.content) {
          var rr = er.content.length;
          rr > 0 && (rr < 4096 ? le += rr + 63 >> 6 : me += rr + 511 >> 9);
        }
      }
      for (var Dr = ge.FullPaths.length + 3 >> 2, Pa = le + 7 >> 3, La = le + 127 >> 7, Ba = Pa + me + Dr + La, jt = Ba + 127 >> 7, r0 = jt <= 109 ? 0 : Math.ceil((jt - 109) / 127); Ba + jt + r0 + 127 >> 7 > jt; ) r0 = ++jt <= 109 ? 0 : Math.ceil((jt - 109) / 127);
      var yt = [1, r0, jt, La, Dr, me, le, 0];
      return ge.FileIndex[0].size = le << 6, yt[7] = (ge.FileIndex[0].start = yt[0] + yt[1] + yt[2] + yt[3] + yt[4] + yt[5]) + (yt[6] + 7 >> 3), yt;
    }(m), S = K(w[7] << 9), y = 0, W = 0;
    {
      for (y = 0; y < 8; ++y) S.write_shift(1, oe[y]);
      for (y = 0; y < 8; ++y) S.write_shift(2, 0);
      for (S.write_shift(2, 62), S.write_shift(2, 3), S.write_shift(2, 65534), S.write_shift(2, 9), S.write_shift(2, 6), y = 0; y < 3; ++y) S.write_shift(2, 0);
      for (S.write_shift(4, 0), S.write_shift(4, w[2]), S.write_shift(4, w[0] + w[1] + w[2] + w[3] - 1), S.write_shift(4, 0), S.write_shift(4, 4096), S.write_shift(4, w[3] ? w[0] + w[1] + w[2] - 1 : te), S.write_shift(4, w[3]), S.write_shift(-4, w[1] ? w[0] - 1 : te), S.write_shift(4, w[1]), y = 0; y < 109; ++y) S.write_shift(-4, y < w[2] ? w[1] + y : -1);
    }
    if (w[1])
      for (W = 0; W < w[1]; ++W) {
        for (; y < 236 + W * 127; ++y) S.write_shift(-4, y < w[2] ? w[1] + y : -1);
        S.write_shift(-4, W === w[1] - 1 ? te : W + 1);
      }
    var J = function(ge) {
      for (W += ge; y < W - 1; ++y) S.write_shift(-4, y + 1);
      ge && (++y, S.write_shift(-4, te));
    };
    for (W = y = 0, W += w[1]; y < W; ++y) S.write_shift(-4, ve.DIFSECT);
    for (W += w[2]; y < W; ++y) S.write_shift(-4, ve.FATSECT);
    J(w[3]), J(w[4]);
    for (var M = 0, V = 0, H = m.FileIndex[0]; M < m.FileIndex.length; ++M)
      H = m.FileIndex[M], H.content && (V = H.content.length, !(V < 4096) && (H.start = W, J(V + 511 >> 9)));
    for (J(w[6] + 7 >> 3); S.l & 511; ) S.write_shift(-4, ve.ENDOFCHAIN);
    for (W = y = 0, M = 0; M < m.FileIndex.length; ++M)
      H = m.FileIndex[M], H.content && (V = H.content.length, !(!V || V >= 4096) && (H.start = W, J(V + 63 >> 6)));
    for (; S.l & 511; ) S.write_shift(-4, ve.ENDOFCHAIN);
    for (y = 0; y < w[4] << 2; ++y) {
      var se = m.FullPaths[y];
      if (!se || se.length === 0) {
        for (M = 0; M < 17; ++M) S.write_shift(4, 0);
        for (M = 0; M < 3; ++M) S.write_shift(4, -1);
        for (M = 0; M < 12; ++M) S.write_shift(4, 0);
        continue;
      }
      H = m.FileIndex[y], y === 0 && (H.start = H.size ? H.start - 1 : te);
      var xe = y === 0 && _.root || H.name;
      if (V = 2 * (xe.length + 1), S.write_shift(64, xe, "utf16le"), S.write_shift(2, V), S.write_shift(1, H.type), S.write_shift(1, H.color), S.write_shift(-4, H.L), S.write_shift(-4, H.R), S.write_shift(-4, H.C), H.clsid) S.write_shift(16, H.clsid, "hex");
      else for (M = 0; M < 4; ++M) S.write_shift(4, 0);
      S.write_shift(4, H.state || 0), S.write_shift(4, 0), S.write_shift(4, 0), S.write_shift(4, 0), S.write_shift(4, 0), S.write_shift(4, H.start), S.write_shift(4, H.size), S.write_shift(4, 0);
    }
    for (y = 1; y < m.FileIndex.length; ++y)
      if (H = m.FileIndex[y], H.size >= 4096)
        if (S.l = H.start + 1 << 9, Ne && Buffer.isBuffer(H.content))
          H.content.copy(S, S.l, 0, H.size), S.l += H.size + 511 & -512;
        else {
          for (M = 0; M < H.size; ++M) S.write_shift(1, H.content[M]);
          for (; M & 511; ++M) S.write_shift(1, 0);
        }
    for (y = 1; y < m.FileIndex.length; ++y)
      if (H = m.FileIndex[y], H.size > 0 && H.size < 4096)
        if (Ne && Buffer.isBuffer(H.content))
          H.content.copy(S, S.l, 0, H.size), S.l += H.size + 63 & -64;
        else {
          for (M = 0; M < H.size; ++M) S.write_shift(1, H.content[M]);
          for (; M & 63; ++M) S.write_shift(1, 0);
        }
    if (Ne)
      S.l = S.length;
    else
      for (; S.l < S.length; ) S.write_shift(1, 0);
    return S;
  }
  function X(m, E) {
    var _ = m.FullPaths.map(function(M) {
      return M.toUpperCase();
    }), w = _.map(function(M) {
      var V = M.split("/");
      return V[V.length - (M.slice(-1) == "/" ? 2 : 1)];
    }), S = !1;
    E.charCodeAt(0) === 47 ? (S = !0, E = _[0].slice(0, -1) + E) : S = E.indexOf("/") !== -1;
    var y = E.toUpperCase(), W = S === !0 ? _.indexOf(y) : w.indexOf(y);
    if (W !== -1) return m.FileIndex[W];
    var J = !y.match(Wa);
    for (y = y.replace(Vr, ""), J && (y = y.replace(Wa, "!")), W = 0; W < _.length; ++W)
      if ((J ? _[W].replace(Wa, "!") : _[W]).replace(Vr, "") == y || (J ? w[W].replace(Wa, "!") : w[W]).replace(Vr, "") == y) return m.FileIndex[W];
    return null;
  }
  var L = 64, te = -2, pe = "d0cf11e0a1b11ae1", oe = [208, 207, 17, 224, 161, 177, 26, 225], de = "00000000000000000000000000000000", ve = {
    /* 2.1 Compund File Sector Numbers and Types */
    MAXREGSECT: -6,
    DIFSECT: -4,
    FATSECT: -3,
    ENDOFCHAIN: te,
    FREESECT: -1,
    /* 2.2 Compound File Header */
    HEADER_SIGNATURE: pe,
    HEADER_MINOR_VERSION: "3e00",
    MAXREGSID: -6,
    NOSTREAM: -1,
    HEADER_CLSID: de,
    /* 2.6.1 Compound File Directory Entry */
    EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
  };
  function Ie(m, E, _) {
    l();
    var w = z(m, _);
    c.writeFileSync(E, w);
  }
  function U(m) {
    for (var E = new Array(m.length), _ = 0; _ < m.length; ++_) E[_] = String.fromCharCode(m[_]);
    return E.join("");
  }
  function Ee(m, E) {
    var _ = z(m, E);
    switch (E && E.type || "buffer") {
      case "file":
        return l(), c.writeFileSync(E.filename, _), _;
      case "binary":
        return typeof _ == "string" ? _ : U(_);
      case "base64":
        return qa(typeof _ == "string" ? _ : U(_));
      case "buffer":
        if (Ne) return Buffer.isBuffer(_) ? _ : Rt(_);
      case "array":
        return typeof _ == "string" ? Yr(_) : _;
    }
    return _;
  }
  var Se;
  function C(m) {
    try {
      var E = m.InflateRaw, _ = new E();
      if (_._processChunk(new Uint8Array([3, 0]), _._finishFlushFlag), _.bytesRead) Se = m;
      else throw new Error("zlib does not expose bytesRead");
    } catch (w) {
      console.error("cannot use native zlib: " + (w.message || w));
    }
  }
  function P(m, E) {
    if (!Se) return _i(m, E);
    var _ = Se.InflateRaw, w = new _(), S = w._processChunk(m.slice(m.l), w._finishFlushFlag);
    return m.l += w.bytesRead, S;
  }
  function I(m) {
    return Se ? Se.deflateRawSync(m) : Le(m);
  }
  var R = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], Y = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], fe = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
  function ce(m) {
    var E = (m << 1 | m << 11) & 139536 | (m << 5 | m << 15) & 558144;
    return (E >> 16 | E >> 8 | E) & 255;
  }
  for (var ie = typeof Uint8Array < "u", ne = ie ? new Uint8Array(256) : [], Ae = 0; Ae < 256; ++Ae) ne[Ae] = ce(Ae);
  function A(m, E) {
    var _ = ne[m & 255];
    return E <= 8 ? _ >>> 8 - E : (_ = _ << 8 | ne[m >> 8 & 255], E <= 16 ? _ >>> 16 - E : (_ = _ << 8 | ne[m >> 16 & 255], _ >>> 24 - E));
  }
  function $e(m, E) {
    var _ = E & 7, w = E >>> 3;
    return (m[w] | (_ <= 6 ? 0 : m[w + 1] << 8)) >>> _ & 3;
  }
  function Pe(m, E) {
    var _ = E & 7, w = E >>> 3;
    return (m[w] | (_ <= 5 ? 0 : m[w + 1] << 8)) >>> _ & 7;
  }
  function re(m, E) {
    var _ = E & 7, w = E >>> 3;
    return (m[w] | (_ <= 4 ? 0 : m[w + 1] << 8)) >>> _ & 15;
  }
  function G(m, E) {
    var _ = E & 7, w = E >>> 3;
    return (m[w] | (_ <= 3 ? 0 : m[w + 1] << 8)) >>> _ & 31;
  }
  function Z(m, E) {
    var _ = E & 7, w = E >>> 3;
    return (m[w] | (_ <= 1 ? 0 : m[w + 1] << 8)) >>> _ & 127;
  }
  function ke(m, E, _) {
    var w = E & 7, S = E >>> 3, y = (1 << _) - 1, W = m[S] >>> w;
    return _ < 8 - w || (W |= m[S + 1] << 8 - w, _ < 16 - w) || (W |= m[S + 2] << 16 - w, _ < 24 - w) || (W |= m[S + 3] << 24 - w), W & y;
  }
  function We(m, E, _) {
    var w = E & 7, S = E >>> 3;
    return w <= 5 ? m[S] |= (_ & 7) << w : (m[S] |= _ << w & 255, m[S + 1] = (_ & 7) >> 8 - w), E + 3;
  }
  function _e(m, E, _) {
    var w = E & 7, S = E >>> 3;
    return _ = (_ & 1) << w, m[S] |= _, E + 1;
  }
  function Qe(m, E, _) {
    var w = E & 7, S = E >>> 3;
    return _ <<= w, m[S] |= _ & 255, _ >>>= 8, m[S + 1] = _, E + 8;
  }
  function $r(m, E, _) {
    var w = E & 7, S = E >>> 3;
    return _ <<= w, m[S] |= _ & 255, _ >>>= 8, m[S + 1] = _ & 255, m[S + 2] = _ >>> 8, E + 16;
  }
  function Ar(m, E) {
    var _ = m.length, w = 2 * _ > E ? 2 * _ : E + 5, S = 0;
    if (_ >= E) return m;
    if (Ne) {
      var y = Oi(w);
      if (m.copy) m.copy(y);
      else for (; S < m.length; ++S) y[S] = m[S];
      return y;
    } else if (ie) {
      var W = new Uint8Array(w);
      if (W.set) W.set(m);
      else for (; S < _; ++S) W[S] = m[S];
      return W;
    }
    return m.length = w, m;
  }
  function ee(m) {
    for (var E = new Array(m), _ = 0; _ < m; ++_) E[_] = 0;
    return E;
  }
  function hr(m, E, _) {
    var w = 1, S = 0, y = 0, W = 0, J = 0, M = m.length, V = ie ? new Uint16Array(32) : ee(32);
    for (y = 0; y < 32; ++y) V[y] = 0;
    for (y = M; y < _; ++y) m[y] = 0;
    M = m.length;
    var H = ie ? new Uint16Array(M) : ee(M);
    for (y = 0; y < M; ++y)
      V[S = m[y]]++, w < S && (w = S), H[y] = 0;
    for (V[0] = 0, y = 1; y <= w; ++y) V[y + 16] = J = J + V[y - 1] << 1;
    for (y = 0; y < M; ++y)
      J = m[y], J != 0 && (H[y] = V[J + 16]++);
    var se = 0;
    for (y = 0; y < M; ++y)
      if (se = m[y], se != 0)
        for (J = A(H[y], w) >> w - se, W = (1 << w + 4 - se) - 1; W >= 0; --W)
          E[J | W << se] = se & 15 | y << 4;
    return w;
  }
  var Cr = ie ? new Uint16Array(512) : ee(512), lt = ie ? new Uint16Array(32) : ee(32);
  if (!ie) {
    for (var Mr = 0; Mr < 512; ++Mr) Cr[Mr] = 0;
    for (Mr = 0; Mr < 32; ++Mr) lt[Mr] = 0;
  }
  (function() {
    for (var m = [], E = 0; E < 32; E++) m.push(5);
    hr(m, lt, 32);
    var _ = [];
    for (E = 0; E <= 143; E++) _.push(8);
    for (; E <= 255; E++) _.push(9);
    for (; E <= 279; E++) _.push(7);
    for (; E <= 287; E++) _.push(8);
    hr(_, Cr, 288);
  })();
  var mt = /* @__PURE__ */ function() {
    for (var E = ie ? new Uint8Array(32768) : [], _ = 0, w = 0; _ < fe.length - 1; ++_)
      for (; w < fe[_ + 1]; ++w) E[w] = _;
    for (; w < 32768; ++w) E[w] = 29;
    var S = ie ? new Uint8Array(259) : [];
    for (_ = 0, w = 0; _ < Y.length - 1; ++_)
      for (; w < Y[_ + 1]; ++w) S[w] = _;
    function y(J, M) {
      for (var V = 0; V < J.length; ) {
        var H = Math.min(65535, J.length - V), se = V + H == J.length;
        for (M.write_shift(1, +se), M.write_shift(2, H), M.write_shift(2, ~H & 65535); H-- > 0; ) M[M.l++] = J[V++];
      }
      return M.l;
    }
    function W(J, M) {
      for (var V = 0, H = 0, se = ie ? new Uint16Array(32768) : []; H < J.length; ) {
        var xe = (
          /* data.length - boff; */
          Math.min(65535, J.length - H)
        );
        if (xe < 10) {
          for (V = We(M, V, +(H + xe == J.length)), V & 7 && (V += 8 - (V & 7)), M.l = V / 8 | 0, M.write_shift(2, xe), M.write_shift(2, ~xe & 65535); xe-- > 0; ) M[M.l++] = J[H++];
          V = M.l * 8;
          continue;
        }
        V = We(M, V, +(H + xe == J.length) + 2);
        for (var ge = 0; xe-- > 0; ) {
          var le = J[H];
          ge = (ge << 5 ^ le) & 32767;
          var me = -1, Ce = 0;
          if ((me = se[ge]) && (me |= H & -32768, me > H && (me -= 32768), me < H))
            for (; J[me + Ce] == J[H + Ce] && Ce < 250; ) ++Ce;
          if (Ce > 2) {
            le = S[Ce], le <= 22 ? V = Qe(M, V, ne[le + 1] >> 1) - 1 : (Qe(M, V, 3), V += 5, Qe(M, V, ne[le - 23] >> 5), V += 3);
            var er = le < 8 ? 0 : le - 4 >> 2;
            er > 0 && ($r(M, V, Ce - Y[le]), V += er), le = E[H - me], V = Qe(M, V, ne[le] >> 3), V -= 3;
            var rr = le < 4 ? 0 : le - 2 >> 1;
            rr > 0 && ($r(M, V, H - me - fe[le]), V += rr);
            for (var Dr = 0; Dr < Ce; ++Dr)
              se[ge] = H & 32767, ge = (ge << 5 ^ J[H]) & 32767, ++H;
            xe -= Ce - 1;
          } else
            le <= 143 ? le = le + 48 : V = _e(M, V, 1), V = Qe(M, V, ne[le]), se[ge] = H & 32767, ++H;
        }
        V = Qe(M, V, 0) - 1;
      }
      return M.l = (V + 7) / 8 | 0, M.l;
    }
    return function(M, V) {
      return M.length < 8 ? y(M, V) : W(M, V);
    };
  }();
  function Le(m) {
    var E = K(50 + Math.floor(m.length * 1.1)), _ = mt(m, E);
    return E.slice(0, _);
  }
  var fr = ie ? new Uint16Array(32768) : ee(32768), Zr = ie ? new Uint16Array(32768) : ee(32768), mr = ie ? new Uint16Array(128) : ee(128), Kt = 1, gi = 1;
  function Jc(m, E) {
    var _ = G(m, E) + 257;
    E += 5;
    var w = G(m, E) + 1;
    E += 5;
    var S = re(m, E) + 4;
    E += 4;
    for (var y = 0, W = ie ? new Uint8Array(19) : ee(19), J = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], M = 1, V = ie ? new Uint8Array(8) : ee(8), H = ie ? new Uint8Array(8) : ee(8), se = W.length, xe = 0; xe < S; ++xe)
      W[R[xe]] = y = Pe(m, E), M < y && (M = y), V[y]++, E += 3;
    var ge = 0;
    for (V[0] = 0, xe = 1; xe <= M; ++xe) H[xe] = ge = ge + V[xe - 1] << 1;
    for (xe = 0; xe < se; ++xe) (ge = W[xe]) != 0 && (J[xe] = H[ge]++);
    var le = 0;
    for (xe = 0; xe < se; ++xe)
      if (le = W[xe], le != 0) {
        ge = ne[J[xe]] >> 8 - le;
        for (var me = (1 << 7 - le) - 1; me >= 0; --me) mr[ge | me << le] = le & 7 | xe << 3;
      }
    var Ce = [];
    for (M = 1; Ce.length < _ + w; )
      switch (ge = mr[Z(m, E)], E += ge & 7, ge >>>= 3) {
        case 16:
          for (y = 3 + $e(m, E), E += 2, ge = Ce[Ce.length - 1]; y-- > 0; ) Ce.push(ge);
          break;
        case 17:
          for (y = 3 + Pe(m, E), E += 3; y-- > 0; ) Ce.push(0);
          break;
        case 18:
          for (y = 11 + Z(m, E), E += 7; y-- > 0; ) Ce.push(0);
          break;
        default:
          Ce.push(ge), M < ge && (M = ge);
          break;
      }
    var er = Ce.slice(0, _), rr = Ce.slice(_);
    for (xe = _; xe < 286; ++xe) er[xe] = 0;
    for (xe = w; xe < 30; ++xe) rr[xe] = 0;
    return Kt = hr(er, fr, 286), gi = hr(rr, Zr, 30), E;
  }
  function qc(m, E) {
    if (m[0] == 3 && !(m[1] & 3))
      return [Wt(E), 2];
    for (var _ = 0, w = 0, S = Oi(E || 1 << 18), y = 0, W = S.length >>> 0, J = 0, M = 0; !(w & 1); ) {
      if (w = Pe(m, _), _ += 3, w >>> 1)
        w >> 1 == 1 ? (J = 9, M = 5) : (_ = Jc(m, _), J = Kt, M = gi);
      else {
        _ & 7 && (_ += 8 - (_ & 7));
        var V = m[_ >>> 3] | m[(_ >>> 3) + 1] << 8;
        if (_ += 32, V > 0)
          for (!E && W < y + V && (S = Ar(S, y + V), W = S.length); V-- > 0; )
            S[y++] = m[_ >>> 3], _ += 8;
        continue;
      }
      for (; ; ) {
        !E && W < y + 32767 && (S = Ar(S, y + 32767), W = S.length);
        var H = ke(m, _, J), se = w >>> 1 == 1 ? Cr[H] : fr[H];
        if (_ += se & 15, se >>>= 4, !(se >>> 8 & 255)) S[y++] = se;
        else {
          if (se == 256) break;
          se -= 257;
          var xe = se < 8 ? 0 : se - 4 >> 2;
          xe > 5 && (xe = 0);
          var ge = y + Y[se];
          xe > 0 && (ge += ke(m, _, xe), _ += xe), H = ke(m, _, M), se = w >>> 1 == 1 ? lt[H] : Zr[H], _ += se & 15, se >>>= 4;
          var le = se < 4 ? 0 : se - 2 >> 1, me = fe[se];
          for (le > 0 && (me += ke(m, _, le), _ += le), !E && W < ge && (S = Ar(S, ge + 100), W = S.length); y < ge; )
            S[y] = S[y - me], ++y;
        }
      }
    }
    return E ? [S, _ + 7 >>> 3] : [S.slice(0, y), _ + 7 >>> 3];
  }
  function _i(m, E) {
    var _ = m.slice(m.l || 0), w = qc(_, E);
    return m.l += w[1], w[0];
  }
  function wi(m, E) {
    if (m)
      typeof console < "u" && console.error(E);
    else throw new Error(E);
  }
  function ki(m, E) {
    var _ = (
      /*::(*/
      m
    );
    Fr(_, 0);
    var w = [], S = [], y = {
      FileIndex: w,
      FullPaths: S
    };
    F(y, { root: E.root });
    for (var W = _.length - 4; (_[W] != 80 || _[W + 1] != 75 || _[W + 2] != 5 || _[W + 3] != 6) && W >= 0; ) --W;
    _.l = W + 4, _.l += 4;
    var J = _.read_shift(2);
    _.l += 6;
    var M = _.read_shift(4);
    for (_.l = M, W = 0; W < J; ++W) {
      _.l += 20;
      var V = _.read_shift(4), H = _.read_shift(4), se = _.read_shift(2), xe = _.read_shift(2), ge = _.read_shift(2);
      _.l += 8;
      var le = _.read_shift(4), me = f(
        /*::(*/
        _.slice(_.l + se, _.l + se + xe)
        /*:: :any)*/
      );
      _.l += se + xe + ge;
      var Ce = _.l;
      _.l = le + 4, Zc(_, V, H, y, me), _.l = Ce;
    }
    return y;
  }
  function Zc(m, E, _, w, S) {
    m.l += 2;
    var y = m.read_shift(2), W = m.read_shift(2), J = s(m);
    if (y & 8257) throw new Error("Unsupported ZIP encryption");
    for (var M = m.read_shift(4), V = m.read_shift(4), H = m.read_shift(4), se = m.read_shift(2), xe = m.read_shift(2), ge = "", le = 0; le < se; ++le) ge += String.fromCharCode(m[m.l++]);
    if (xe) {
      var me = f(
        /*::(*/
        m.slice(m.l, m.l + xe)
        /*:: :any)*/
      );
      (me[21589] || {}).mt && (J = me[21589].mt), ((S || {})[21589] || {}).mt && (J = S[21589].mt);
    }
    m.l += xe;
    var Ce = m.slice(m.l, m.l + V);
    switch (W) {
      case 8:
        Ce = P(m, H);
        break;
      case 0:
        break;
      default:
        throw new Error("Unsupported ZIP Compression method " + W);
    }
    var er = !1;
    y & 8 && (M = m.read_shift(4), M == 134695760 && (M = m.read_shift(4), er = !0), V = m.read_shift(4), H = m.read_shift(4)), V != E && wi(er, "Bad compressed size: " + E + " != " + V), H != _ && wi(er, "Bad uncompressed size: " + _ + " != " + H), e0(w, ge, Ce, { unsafe: !0, mt: J });
  }
  function Qc(m, E) {
    var _ = E || {}, w = [], S = [], y = K(1), W = _.compression ? 8 : 0, J = 0, M = 0, V = 0, H = 0, se = 0, xe = m.FullPaths[0], ge = xe, le = m.FileIndex[0], me = [], Ce = 0;
    for (M = 1; M < m.FullPaths.length; ++M)
      if (ge = m.FullPaths[M].slice(xe.length), le = m.FileIndex[M], !(!le.size || !le.content || ge == "Sh33tJ5")) {
        var er = H, rr = K(ge.length);
        for (V = 0; V < ge.length; ++V) rr.write_shift(1, ge.charCodeAt(V) & 127);
        rr = rr.slice(0, rr.l), me[se] = Yl.buf(
          /*::((*/
          le.content,
          0
        );
        var Dr = le.content;
        W == 8 && (Dr = I(Dr)), y = K(30), y.write_shift(4, 67324752), y.write_shift(2, 20), y.write_shift(2, J), y.write_shift(2, W), le.mt ? i(y, le.mt) : y.write_shift(4, 0), y.write_shift(-4, me[se]), y.write_shift(4, Dr.length), y.write_shift(
          4,
          /*::(*/
          le.content.length
        ), y.write_shift(2, rr.length), y.write_shift(2, 0), H += y.length, w.push(y), H += rr.length, w.push(rr), H += Dr.length, w.push(Dr), y = K(46), y.write_shift(4, 33639248), y.write_shift(2, 0), y.write_shift(2, 20), y.write_shift(2, J), y.write_shift(2, W), y.write_shift(4, 0), y.write_shift(-4, me[se]), y.write_shift(4, Dr.length), y.write_shift(
          4,
          /*::(*/
          le.content.length
        ), y.write_shift(2, rr.length), y.write_shift(2, 0), y.write_shift(2, 0), y.write_shift(2, 0), y.write_shift(2, 0), y.write_shift(4, 0), y.write_shift(4, er), Ce += y.l, S.push(y), Ce += rr.length, S.push(rr), ++se;
      }
    return y = K(22), y.write_shift(4, 101010256), y.write_shift(2, 0), y.write_shift(2, 0), y.write_shift(2, se), y.write_shift(2, se), y.write_shift(4, Ce), y.write_shift(4, H), y.write_shift(2, 0), Er([Er(w), Er(S), y]);
  }
  var _n = {
    htm: "text/html",
    xml: "text/xml",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    mso: "application/x-mso",
    thmx: "application/vnd.ms-officetheme",
    sh33tj5: "application/octet-stream"
  };
  function el(m, E) {
    if (m.ctype) return m.ctype;
    var _ = m.name || "", w = _.match(/\.([^\.]+)$/);
    return w && _n[w[1]] || E && (w = (_ = E).match(/[\.\\]([^\.\\])+$/), w && _n[w[1]]) ? _n[w[1]] : "application/octet-stream";
  }
  function rl(m) {
    for (var E = qa(m), _ = [], w = 0; w < E.length; w += 76) _.push(E.slice(w, w + 76));
    return _.join(`\r
`) + `\r
`;
  }
  function tl(m) {
    var E = m.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function(V) {
      var H = V.charCodeAt(0).toString(16).toUpperCase();
      return "=" + (H.length == 1 ? "0" + H : H);
    });
    E = E.replace(/ $/mg, "=20").replace(/\t$/mg, "=09"), E.charAt(0) == `
` && (E = "=0D" + E.slice(1)), E = E.replace(/\r(?!\n)/mg, "=0D").replace(/\n\n/mg, `
=0A`).replace(/([^\r\n])\n/mg, "$1=0A");
    for (var _ = [], w = E.split(`\r
`), S = 0; S < w.length; ++S) {
      var y = w[S];
      if (y.length == 0) {
        _.push("");
        continue;
      }
      for (var W = 0; W < y.length; ) {
        var J = 76, M = y.slice(W, W + J);
        M.charAt(J - 1) == "=" ? J-- : M.charAt(J - 2) == "=" ? J -= 2 : M.charAt(J - 3) == "=" && (J -= 3), M = y.slice(W, W + J), W += J, W < y.length && (M += "="), _.push(M);
      }
    }
    return _.join(`\r
`);
  }
  function al(m) {
    for (var E = [], _ = 0; _ < m.length; ++_) {
      for (var w = m[_]; _ <= m.length && w.charAt(w.length - 1) == "="; ) w = w.slice(0, w.length - 1) + m[++_];
      E.push(w);
    }
    for (var S = 0; S < E.length; ++S) E[S] = E[S].replace(/[=][0-9A-Fa-f]{2}/g, function(y) {
      return String.fromCharCode(parseInt(y.slice(1), 16));
    });
    return Yr(E.join(`\r
`));
  }
  function nl(m, E, _) {
    for (var w = "", S = "", y = "", W, J = 0; J < 10; ++J) {
      var M = E[J];
      if (!M || M.match(/^\s*$/)) break;
      var V = M.match(/^(.*?):\s*([^\s].*)$/);
      if (V) switch (V[1].toLowerCase()) {
        case "content-location":
          w = V[2].trim();
          break;
        case "content-type":
          y = V[2].trim();
          break;
        case "content-transfer-encoding":
          S = V[2].trim();
          break;
      }
    }
    switch (++J, S.toLowerCase()) {
      case "base64":
        W = Yr(qr(E.slice(J).join("")));
        break;
      case "quoted-printable":
        W = al(E.slice(J));
        break;
      default:
        throw new Error("Unsupported Content-Transfer-Encoding " + S);
    }
    var H = e0(m, w.slice(_.length), W, { unsafe: !0 });
    y && (H.ctype = y);
  }
  function il(m, E) {
    if (U(m.slice(0, 13)).toLowerCase() != "mime-version:") throw new Error("Unsupported MAD header");
    var _ = E && E.root || "", w = (Ne && Buffer.isBuffer(m) ? m.toString("binary") : U(m)).split(`\r
`), S = 0, y = "";
    for (S = 0; S < w.length; ++S)
      if (y = w[S], !!/^Content-Location:/i.test(y) && (y = y.slice(y.indexOf("file")), _ || (_ = y.slice(0, y.lastIndexOf("/") + 1)), y.slice(0, _.length) != _))
        for (; _.length > 0 && (_ = _.slice(0, _.length - 1), _ = _.slice(0, _.lastIndexOf("/") + 1), y.slice(0, _.length) != _); )
          ;
    var W = (w[1] || "").match(/boundary="(.*?)"/);
    if (!W) throw new Error("MAD cannot find boundary");
    var J = "--" + (W[1] || ""), M = [], V = [], H = {
      FileIndex: M,
      FullPaths: V
    };
    F(H);
    var se, xe = 0;
    for (S = 0; S < w.length; ++S) {
      var ge = w[S];
      ge !== J && ge !== J + "--" || (xe++ && nl(H, w.slice(se, S), _), se = S);
    }
    return H;
  }
  function sl(m, E) {
    var _ = E || {}, w = _.boundary || "SheetJS";
    w = "------=" + w;
    for (var S = [
      "MIME-Version: 1.0",
      'Content-Type: multipart/related; boundary="' + w.slice(2) + '"',
      "",
      "",
      ""
    ], y = m.FullPaths[0], W = y, J = m.FileIndex[0], M = 1; M < m.FullPaths.length; ++M)
      if (W = m.FullPaths[M].slice(y.length), J = m.FileIndex[M], !(!J.size || !J.content || W == "Sh33tJ5")) {
        W = W.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function(Ce) {
          return "_x" + Ce.charCodeAt(0).toString(16) + "_";
        }).replace(/[\u0080-\uFFFF]/g, function(Ce) {
          return "_u" + Ce.charCodeAt(0).toString(16) + "_";
        });
        for (var V = J.content, H = Ne && Buffer.isBuffer(V) ? V.toString("binary") : U(V), se = 0, xe = Math.min(1024, H.length), ge = 0, le = 0; le <= xe; ++le) (ge = H.charCodeAt(le)) >= 32 && ge < 128 && ++se;
        var me = se >= xe * 4 / 5;
        S.push(w), S.push("Content-Location: " + (_.root || "file:///C:/SheetJS/") + W), S.push("Content-Transfer-Encoding: " + (me ? "quoted-printable" : "base64")), S.push("Content-Type: " + el(J, W)), S.push(""), S.push(me ? tl(H) : rl(H));
      }
    return S.push(w + `--\r
`), S.join(`\r
`);
  }
  function fl(m) {
    var E = {};
    return F(E, m), E;
  }
  function e0(m, E, _, w) {
    var S = w && w.unsafe;
    S || F(m);
    var y = !S && we.find(m, E);
    if (!y) {
      var W = m.FullPaths[0];
      E.slice(0, W.length) == W ? W = E : (W.slice(-1) != "/" && (W += "/"), W = (W + E).replace("//", "/")), y = { name: n(E), type: 2 }, m.FileIndex.push(y), m.FullPaths.push(W), S || we.utils.cfb_gc(m);
    }
    return y.content = _, y.size = _ ? _.length : 0, w && (w.CLSID && (y.clsid = w.CLSID), w.mt && (y.mt = w.mt), w.ct && (y.ct = w.ct)), y;
  }
  function cl(m, E) {
    F(m);
    var _ = we.find(m, E);
    if (_) {
      for (var w = 0; w < m.FileIndex.length; ++w) if (m.FileIndex[w] == _)
        return m.FileIndex.splice(w, 1), m.FullPaths.splice(w, 1), !0;
    }
    return !1;
  }
  function ll(m, E, _) {
    F(m);
    var w = we.find(m, E);
    if (w) {
      for (var S = 0; S < m.FileIndex.length; ++S) if (m.FileIndex[S] == w)
        return m.FileIndex[S].name = n(_), m.FullPaths[S] = _, !0;
    }
    return !1;
  }
  function ol(m) {
    O(m, !0);
  }
  return t.find = X, t.read = b, t.parse = o, t.write = Ee, t.writeFile = Ie, t.utils = {
    cfb_new: fl,
    cfb_add: e0,
    cfb_del: cl,
    cfb_mov: ll,
    cfb_gc: ol,
    ReadShift: Ha,
    CheckField: kf,
    prep_blob: Fr,
    bconcat: Er,
    use_zlib: C,
    _deflateRaw: Le,
    _inflateRaw: _i,
    consts: ve
  }, t;
}();
function Jl(e) {
  return typeof e == "string" ? zn(e) : Array.isArray(e) ? El(e) : e;
}
function un(e, t, r) {
  if (typeof Deno < "u") {
    if (r && typeof t == "string") switch (r) {
      case "utf8":
        t = new TextEncoder(r).encode(t);
        break;
      case "binary":
        t = zn(t);
        break;
      default:
        throw new Error("Unsupported encoding " + r);
    }
    return Deno.writeFileSync(e, t);
  }
  var a = r == "utf8" ? Tt(t) : t;
  if (typeof IE_SaveFile < "u") return IE_SaveFile(a, e);
  if (typeof Blob < "u") {
    var n = new Blob([Jl(a)], { type: "application/octet-stream" });
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
    return f.open("w"), f.encoding = "binary", Array.isArray(t) && (t = Gt(t)), f.write(t), f.close(), t;
  } catch (c) {
    if (!c.message || !c.message.match(/onstruct/)) throw c;
  }
  throw new Error("cannot save file " + e);
}
function ql(e) {
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
function sr(e) {
  for (var t = Object.keys(e), r = [], a = 0; a < t.length; ++a) Object.prototype.hasOwnProperty.call(e, t[a]) && r.push(t[a]);
  return r;
}
function Ui(e, t) {
  for (var r = [], a = sr(e), n = 0; n !== a.length; ++n) r[e[a[n]][t]] == null && (r[e[a[n]][t]] = a[n]);
  return r;
}
function Kn(e) {
  for (var t = [], r = sr(e), a = 0; a !== r.length; ++a) t[e[r[a]]] = r[a];
  return t;
}
function jn(e) {
  for (var t = [], r = sr(e), a = 0; a !== r.length; ++a) t[e[r[a]]] = parseInt(r[a], 10);
  return t;
}
function Zl(e) {
  for (var t = [], r = sr(e), a = 0; a !== r.length; ++a)
    t[e[r[a]]] == null && (t[e[r[a]]] = []), t[e[r[a]]].push(r[a]);
  return t;
}
var Ln = /* @__PURE__ */ new Date(1899, 11, 30, 0, 0, 0);
function wr(e, t) {
  var r = /* @__PURE__ */ e.getTime(), a = /* @__PURE__ */ Ln.getTime() + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ Ln.getTimezoneOffset()) * 6e4;
  return (r - a) / (24 * 60 * 60 * 1e3);
}
var Qs = /* @__PURE__ */ new Date(), Ql = /* @__PURE__ */ Ln.getTime() + (/* @__PURE__ */ Qs.getTimezoneOffset() - /* @__PURE__ */ Ln.getTimezoneOffset()) * 6e4, Wi = /* @__PURE__ */ Qs.getTimezoneOffset();
function Yn(e) {
  var t = /* @__PURE__ */ new Date();
  return t.setTime(e * 24 * 60 * 60 * 1e3 + Ql), t.getTimezoneOffset() !== Wi && t.setTime(t.getTime() + (t.getTimezoneOffset() - Wi) * 6e4), t;
}
function eo(e) {
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
var Vi = /* @__PURE__ */ new Date("2017-02-19T19:06:09.000Z"), ef = /* @__PURE__ */ isNaN(/* @__PURE__ */ Vi.getFullYear()) ? /* @__PURE__ */ new Date("2/19/17") : Vi, ro = /* @__PURE__ */ ef.getFullYear() == 2017;
function qe(e, t) {
  var r = new Date(e);
  if (ro)
    return t > 0 ? r.setTime(r.getTime() + r.getTimezoneOffset() * 60 * 1e3) : t < 0 && r.setTime(r.getTime() - r.getTimezoneOffset() * 60 * 1e3), r;
  if (e instanceof Date) return e;
  if (ef.getFullYear() == 1917 && !isNaN(r.getFullYear())) {
    var a = r.getFullYear();
    return e.indexOf("" + a) > -1 || r.setFullYear(r.getFullYear() + 100), r;
  }
  var n = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"], i = new Date(+n[0], +n[1] - 1, +n[2], +n[3] || 0, +n[4] || 0, +n[5] || 0);
  return e.indexOf("Z") > -1 && (i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3)), i;
}
function na(e, t) {
  if (Ne && Buffer.isBuffer(e)) {
    if (t) {
      if (e[0] == 255 && e[1] == 254) return Tt(e.slice(2).toString("utf16le"));
      if (e[1] == 254 && e[2] == 255) return Tt(Vs(e.slice(2).toString("binary")));
    }
    return e.toString("binary");
  }
  if (typeof TextDecoder < "u") try {
    if (t) {
      if (e[0] == 255 && e[1] == 254) return Tt(new TextDecoder("utf-16le").decode(e.slice(2)));
      if (e[0] == 254 && e[1] == 255) return Tt(new TextDecoder("utf-16be").decode(e.slice(2)));
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
function Ze(e) {
  if (typeof JSON < "u" && !Array.isArray(e)) return JSON.parse(JSON.stringify(e));
  if (typeof e != "object" || e == null) return e;
  if (e instanceof Date) return new Date(e.getTime());
  var t = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = Ze(e[r]));
  return t;
}
function nr(e, t) {
  for (var r = ""; r.length < t; ) r += e;
  return r;
}
function vt(e) {
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
var to = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
function Ca(e) {
  var t = new Date(e), r = /* @__PURE__ */ new Date(NaN), a = t.getYear(), n = t.getMonth(), i = t.getDate();
  if (isNaN(i)) return r;
  var s = e.toLowerCase();
  if (s.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
    if (s = s.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, ""), s.length > 3 && to.indexOf(s) == -1) return r;
  } else if (s.match(/[a-z]/)) return r;
  return a < 0 || a > 8099 ? r : (n > 0 || i > 1) && a != 101 ? t : e.match(/[^-0-9:,\/\\]/) ? r : t;
}
var ao = /* @__PURE__ */ function() {
  var e = "abacaba".split(/(:?b)/i).length == 5;
  return function(r, a, n) {
    if (e || typeof a == "string") return r.split(a);
    for (var i = r.split(a), s = [i[0]], f = 1; f < i.length; ++f)
      s.push(n), s.push(i[f]);
    return s;
  };
}();
function rf(e) {
  return e ? e.content && e.type ? na(e.content, !0) : e.data ? Ua(e.data) : e.asNodeBuffer && Ne ? Ua(e.asNodeBuffer().toString("binary")) : e.asBinary ? Ua(e.asBinary()) : e._data && e._data.getContent ? Ua(na(Array.prototype.slice.call(e._data.getContent(), 0))) : null : null;
}
function tf(e) {
  if (!e) return null;
  if (e.data) return Di(e.data);
  if (e.asNodeBuffer && Ne) return e.asNodeBuffer();
  if (e._data && e._data.getContent) {
    var t = e._data.getContent();
    return typeof t == "string" ? Di(t) : Array.prototype.slice.call(t);
  }
  return e.content && e.type ? e.content : null;
}
function no(e) {
  return e && e.name.slice(-4) === ".bin" ? tf(e) : rf(e);
}
function nt(e, t) {
  for (var r = e.FullPaths || sr(e.files), a = t.toLowerCase().replace(/[\/]/g, "\\"), n = a.replace(/\\/g, "/"), i = 0; i < r.length; ++i) {
    var s = r[i].replace(/^Root Entry[\/]/, "").toLowerCase();
    if (a == s || n == s) return e.files ? e.files[r[i]] : e.FileIndex[i];
  }
  return null;
}
function B0(e, t) {
  var r = nt(e, t);
  if (r == null) throw new Error("Cannot find file " + t + " in zip");
  return r;
}
function vr(e, t, r) {
  if (!r) return no(B0(e, t));
  if (!t) return null;
  try {
    return vr(e, t);
  } catch {
    return null;
  }
}
function Jr(e, t, r) {
  if (!r) return rf(B0(e, t));
  if (!t) return null;
  try {
    return Jr(e, t);
  } catch {
    return null;
  }
}
function io(e, t, r) {
  return tf(B0(e, t));
}
function Hi(e) {
  for (var t = e.FullPaths || sr(e.files), r = [], a = 0; a < t.length; ++a) t[a].slice(-1) != "/" && r.push(t[a].replace(/^Root Entry[\/]/, ""));
  return r.sort();
}
function Re(e, t, r) {
  if (e.FullPaths) {
    if (typeof r == "string") {
      var a;
      return Ne ? a = Rt(r) : a = Tl(r), we.utils.cfb_add(e, t, a);
    }
    we.utils.cfb_add(e, t, r);
  } else e.file(t, r);
}
function M0() {
  return we.utils.cfb_new();
}
function af(e, t) {
  switch (t.type) {
    case "base64":
      return we.read(e, { type: "base64" });
    case "binary":
      return we.read(e, { type: "binary" });
    case "buffer":
    case "array":
      return we.read(e, { type: "buffer" });
  }
  throw new Error("Unrecognized type " + t.type);
}
function Va(e, t) {
  if (e.charAt(0) == "/") return e.slice(1);
  var r = t.split("/");
  t.slice(-1) != "/" && r.pop();
  for (var a = e.split("/"); a.length !== 0; ) {
    var n = a.shift();
    n === ".." ? r.pop() : n !== "." && r.push(n);
  }
  return r.join("/");
}
var ur = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`, so = /([^"\s?>\/]+)\s*=\s*((?:")([^"]*)(?:")|(?:')([^']*)(?:')|([^'">\s]+))/g, Xi = /<[\/\?]?[a-zA-Z0-9:_-]+(?:\s+[^"\s?>\/]+\s*=\s*(?:"[^"]*"|'[^']*'|[^'">\s=]+))*\s*[\/\?]?>/mg, fo = /<[^>]*>/g, Br = /* @__PURE__ */ ur.match(Xi) ? Xi : fo, co = /<\w*:/, lo = /<(\/?)\w+:/;
function ye(e, t, r) {
  for (var a = {}, n = 0, i = 0; n !== e.length && !((i = e.charCodeAt(n)) === 32 || i === 10 || i === 13); ++n) ;
  if (t || (a[0] = e.slice(0, n)), n === e.length) return a;
  var s = e.match(so), f = 0, c = "", l = 0, o = "", u = "", x = 1;
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
function St(e) {
  return e.replace(lo, "<$1");
}
var nf = {
  "&quot;": '"',
  "&apos;": "'",
  "&gt;": ">",
  "&lt;": "<",
  "&amp;": "&"
}, U0 = /* @__PURE__ */ Kn(nf), Me = /* @__PURE__ */ function() {
  var e = /&(?:quot|apos|gt|lt|amp|#x?([\da-fA-F]+));/ig, t = /_x([\da-fA-F]{4})_/ig;
  return function r(a) {
    var n = a + "", i = n.indexOf("<![CDATA[");
    if (i == -1) return n.replace(e, function(f, c) {
      return nf[f] || String.fromCharCode(parseInt(c, f.indexOf("x") > -1 ? 16 : 10)) || f;
    }).replace(t, function(f, c) {
      return String.fromCharCode(parseInt(c, 16));
    });
    var s = n.indexOf("]]>");
    return r(n.slice(0, i)) + n.slice(i + 9, s) + r(n.slice(s + 3));
  };
}(), W0 = /[&<>'"]/g, oo = /[\u0000-\u0008\u000b-\u001f]/g;
function Ge(e) {
  var t = e + "";
  return t.replace(W0, function(r) {
    return U0[r];
  }).replace(oo, function(r) {
    return "_x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + "_";
  });
}
function Gi(e) {
  return Ge(e).replace(/ /g, "_x0020_");
}
var sf = /[\u0000-\u001f]/g;
function V0(e) {
  var t = e + "";
  return t.replace(W0, function(r) {
    return U0[r];
  }).replace(/\n/g, "<br/>").replace(sf, function(r) {
    return "&#x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + ";";
  });
}
function uo(e) {
  var t = e + "";
  return t.replace(W0, function(r) {
    return U0[r];
  }).replace(sf, function(r) {
    return "&#x" + r.charCodeAt(0).toString(16).toUpperCase() + ";";
  });
}
var zi = /* @__PURE__ */ function() {
  var e = /&#(\d+);/g;
  function t(r, a) {
    return String.fromCharCode(parseInt(a, 10));
  }
  return function(a) {
    return a.replace(e, t);
  };
}();
function ho(e) {
  return e.replace(/(\r\n|[\r\n])/g, "&#10;");
}
function Je(e) {
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
function s0(e) {
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
function $i(e) {
  var t = Wt(2 * e.length), r, a, n = 1, i = 0, s = 0, f;
  for (a = 0; a < e.length; a += n)
    n = 1, (f = e.charCodeAt(a)) < 128 ? r = f : f < 224 ? (r = (f & 31) * 64 + (e.charCodeAt(a + 1) & 63), n = 2) : f < 240 ? (r = (f & 15) * 4096 + (e.charCodeAt(a + 1) & 63) * 64 + (e.charCodeAt(a + 2) & 63), n = 3) : (n = 4, r = (f & 7) * 262144 + (e.charCodeAt(a + 1) & 63) * 4096 + (e.charCodeAt(a + 2) & 63) * 64 + (e.charCodeAt(a + 3) & 63), r -= 65536, s = 55296 + (r >>> 10 & 1023), r = 56320 + (r & 1023)), s !== 0 && (t[i++] = s & 255, t[i++] = s >>> 8, s = 0), t[i++] = r % 256, t[i++] = r >>> 8;
  return t.slice(0, i).toString("ucs2");
}
function Ki(e) {
  return Rt(e, "binary").toString("utf8");
}
var En = "foo bar bazâð£", ze = Ne && (/* @__PURE__ */ Ki(En) == /* @__PURE__ */ s0(En) && Ki || /* @__PURE__ */ $i(En) == /* @__PURE__ */ s0(En) && $i) || s0, Tt = Ne ? function(e) {
  return Rt(e, "utf8").toString("binary");
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
}, Qa = /* @__PURE__ */ function() {
  var e = {};
  return function(r, a) {
    var n = r + "|" + (a || "");
    return e[n] ? e[n] : e[n] = new RegExp("<(?:\\w+:)?" + r + '(?: xml:space="preserve")?(?:[^>]*)>([\\s\\S]*?)</(?:\\w+:)?' + r + ">", a || "");
  };
}(), ff = /* @__PURE__ */ function() {
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
}(), xo = /* @__PURE__ */ function() {
  var e = {};
  return function(r) {
    return e[r] !== void 0 ? e[r] : e[r] = new RegExp("<(?:vt:)?" + r + ">([\\s\\S]*?)</(?:vt:)?" + r + ">", "g");
  };
}(), vo = /<\/?(?:vt:)?variant>/g, po = /<(?:vt:)([^>]*)>([\s\S]*)</;
function ji(e, t) {
  var r = ye(e), a = e.match(xo(r.baseType)) || [], n = [];
  if (a.length != r.size) {
    if (t.WTF) throw new Error("unexpected vector length " + a.length + " != " + r.size);
    return n;
  }
  return a.forEach(function(i) {
    var s = i.replace(vo, "").match(po);
    s && n.push({ v: ze(s[2]), t: s[1] });
  }), n;
}
var cf = /(^\s|\s$|\n)/;
function yr(e, t) {
  return "<" + e + (t.match(cf) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e + ">";
}
function en(e) {
  return sr(e).map(function(t) {
    return " " + t + '="' + e[t] + '"';
  }).join("");
}
function ue(e, t, r) {
  return "<" + e + (r != null ? en(r) : "") + (t != null ? (t.match(cf) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e : "/") + ">";
}
function _0(e, t) {
  try {
    return e.toISOString().replace(/\.\d*/, "");
  } catch (r) {
    if (t) throw r;
  }
  return "";
}
function mo(e, t) {
  switch (typeof e) {
    case "string":
      var r = ue("vt:lpwstr", Ge(e));
      return r = r.replace(/&quot;/g, "_x0022_"), r;
    case "number":
      return ue((e | 0) == e ? "vt:i4" : "vt:r8", Ge(String(e)));
    case "boolean":
      return ue("vt:bool", e ? "true" : "false");
  }
  if (e instanceof Date) return ue("vt:filetime", _0(e));
  throw new Error("Unable to serialize " + e);
}
function H0(e) {
  if (Ne && /*::typeof Buffer !== "undefined" && d != null && d instanceof Buffer &&*/
  Buffer.isBuffer(e)) return e.toString("utf8");
  if (typeof e == "string") return e;
  if (typeof Uint8Array < "u" && e instanceof Uint8Array) return ze(Gt(N0(e)));
  throw new Error("Bad input format: expected Buffer or string");
}
var rn = /<(\/?)([^\s?><!\/:]*:|)([^\s?<>:\/]+)(?:[\s?:\/][^>]*)?>/mg, _r = {
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
}, la = [
  "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  "http://purl.oclc.org/ooxml/spreadsheetml/main",
  "http://schemas.microsoft.com/office/excel/2006/main",
  "http://schemas.microsoft.com/office/excel/2006/2"
], Kr = {
  o: "urn:schemas-microsoft-com:office:office",
  x: "urn:schemas-microsoft-com:office:excel",
  ss: "urn:schemas-microsoft-com:office:spreadsheet",
  dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
  mv: "http://macVmlSchemaUri",
  v: "urn:schemas-microsoft-com:vml",
  html: "http://www.w3.org/TR/REC-html40"
};
function go(e, t) {
  for (var r = 1 - 2 * (e[t + 7] >>> 7), a = ((e[t + 7] & 127) << 4) + (e[t + 6] >>> 4 & 15), n = e[t + 6] & 15, i = 5; i >= 0; --i) n = n * 256 + e[t + i];
  return a == 2047 ? n == 0 ? r * (1 / 0) : NaN : (a == 0 ? a = -1022 : (a -= 1023, n += Math.pow(2, 52)), r * Math.pow(2, a - 52) * n);
}
function _o(e, t, r) {
  var a = (t < 0 || 1 / t == -1 / 0 ? 1 : 0) << 7, n = 0, i = 0, s = a ? -t : t;
  isFinite(s) ? s == 0 ? n = i = 0 : (n = Math.floor(Math.log(s) / Math.LN2), i = s * Math.pow(2, 52 - n), n <= -1023 && (!isFinite(i) || i < Math.pow(2, 52)) ? n = -1022 : (i -= Math.pow(2, 52), n += 1023)) : (n = 2047, i = isNaN(t) ? 26985 : 0);
  for (var f = 0; f <= 5; ++f, i /= 256) e[r + f] = i & 255;
  e[r + 6] = (n & 15) << 4 | i & 15, e[r + 7] = n >> 4 | a;
}
var Yi = function(e) {
  for (var t = [], r = 10240, a = 0; a < e[0].length; ++a) if (e[0][a]) for (var n = 0, i = e[0][a].length; n < i; n += r) t.push.apply(t, e[0][a].slice(n, n + r));
  return t;
}, Ji = Ne ? function(e) {
  return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0].map(function(t) {
    return Buffer.isBuffer(t) ? t : Rt(t);
  })) : Yi(e);
} : Yi, qi = function(e, t, r) {
  for (var a = [], n = t; n < r; n += 2) a.push(String.fromCharCode(At(e, n)));
  return a.join("").replace(Vr, "");
}, X0 = Ne ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("utf16le", t, r).replace(Vr, "") : qi(e, t, r);
} : qi, Zi = function(e, t, r) {
  for (var a = [], n = t; n < t + r; ++n) a.push(("0" + e[n].toString(16)).slice(-2));
  return a.join("");
}, lf = Ne ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("hex", t, t + r) : Zi(e, t, r);
} : Zi, Qi = function(e, t, r) {
  for (var a = [], n = t; n < r; n++) a.push(String.fromCharCode(Ea(e, n)));
  return a.join("");
}, hn = Ne ? function(t, r, a) {
  return Buffer.isBuffer(t) ? t.toString("utf8", r, a) : Qi(t, r, a);
} : Qi, of = function(e, t) {
  var r = jr(e, t);
  return r > 0 ? hn(e, t + 4, t + 4 + r - 1) : "";
}, uf = of, hf = function(e, t) {
  var r = jr(e, t);
  return r > 0 ? hn(e, t + 4, t + 4 + r - 1) : "";
}, xf = hf, df = function(e, t) {
  var r = 2 * jr(e, t);
  return r > 0 ? hn(e, t + 4, t + 4 + r - 1) : "";
}, vf = df, pf = function(t, r) {
  var a = jr(t, r);
  return a > 0 ? X0(t, r + 4, r + 4 + a) : "";
}, mf = pf, gf = function(e, t) {
  var r = jr(e, t);
  return r > 0 ? hn(e, t + 4, t + 4 + r) : "";
}, _f = gf, wf = function(e, t) {
  return go(e, t);
}, Bn = wf, G0 = function(t) {
  return Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
};
Ne && (uf = function(t, r) {
  if (!Buffer.isBuffer(t)) return of(t, r);
  var a = t.readUInt32LE(r);
  return a > 0 ? t.toString("utf8", r + 4, r + 4 + a - 1) : "";
}, xf = function(t, r) {
  if (!Buffer.isBuffer(t)) return hf(t, r);
  var a = t.readUInt32LE(r);
  return a > 0 ? t.toString("utf8", r + 4, r + 4 + a - 1) : "";
}, vf = function(t, r) {
  if (!Buffer.isBuffer(t)) return df(t, r);
  var a = 2 * t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + a - 1);
}, mf = function(t, r) {
  if (!Buffer.isBuffer(t)) return pf(t, r);
  var a = t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + a);
}, _f = function(t, r) {
  if (!Buffer.isBuffer(t)) return gf(t, r);
  var a = t.readUInt32LE(r);
  return t.toString("utf8", r + 4, r + 4 + a);
}, Bn = function(t, r) {
  return Buffer.isBuffer(t) ? t.readDoubleLE(r) : wf(t, r);
}, G0 = function(t) {
  return Buffer.isBuffer(t) || Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
});
var Ea = function(e, t) {
  return e[t];
}, At = function(e, t) {
  return e[t + 1] * 256 + e[t];
}, wo = function(e, t) {
  var r = e[t + 1] * 256 + e[t];
  return r < 32768 ? r : (65535 - r + 1) * -1;
}, jr = function(e, t) {
  return e[t + 3] * (1 << 24) + (e[t + 2] << 16) + (e[t + 1] << 8) + e[t];
}, qt = function(e, t) {
  return e[t + 3] << 24 | e[t + 2] << 16 | e[t + 1] << 8 | e[t];
}, ko = function(e, t) {
  return e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3];
};
function Ha(e, t) {
  var r = "", a, n, i = [], s, f, c, l;
  switch (t) {
    case "dbcs":
      if (l = this.l, Ne && Buffer.isBuffer(this)) r = this.slice(this.l, this.l + 2 * e).toString("utf16le");
      else for (c = 0; c < e; ++c)
        r += String.fromCharCode(At(this, l)), l += 2;
      e *= 2;
      break;
    case "utf8":
      r = hn(this, this.l, this.l + e);
      break;
    case "utf16le":
      e *= 2, r = X0(this, this.l, this.l + e);
      break;
    case "wstr":
      return Ha.call(this, e, "dbcs");
    case "lpstr-ansi":
      r = uf(this, this.l), e = 4 + jr(this, this.l);
      break;
    case "lpstr-cp":
      r = xf(this, this.l), e = 4 + jr(this, this.l);
      break;
    case "lpwstr":
      r = vf(this, this.l), e = 4 + 2 * jr(this, this.l);
      break;
    case "lpp4":
      e = 4 + jr(this, this.l), r = mf(this, this.l), e & 2 && (e += 2);
      break;
    case "8lpp4":
      e = 4 + jr(this, this.l), r = _f(this, this.l), e & 3 && (e += 4 - (e & 3));
      break;
    case "cstr":
      for (e = 0, r = ""; (s = Ea(this, this.l + e++)) !== 0; ) i.push(kn(s));
      r = i.join("");
      break;
    case "_wstr":
      for (e = 0, r = ""; (s = At(this, this.l + e)) !== 0; )
        i.push(kn(s)), e += 2;
      e += 2, r = i.join("");
      break;
    case "dbcs-cont":
      for (r = "", l = this.l, c = 0; c < e; ++c) {
        if (this.lens && this.lens.indexOf(l) !== -1)
          return s = Ea(this, l), this.l = l + 1, f = Ha.call(this, e - c, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(kn(At(this, l))), l += 2;
      }
      r = i.join(""), e *= 2;
      break;
    case "cpstr":
    case "sbcs-cont":
      for (r = "", l = this.l, c = 0; c != e; ++c) {
        if (this.lens && this.lens.indexOf(l) !== -1)
          return s = Ea(this, l), this.l = l + 1, f = Ha.call(this, e - c, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(kn(Ea(this, l))), l += 1;
      }
      r = i.join("");
      break;
    default:
      switch (e) {
        case 1:
          return a = Ea(this, this.l), this.l++, a;
        case 2:
          return a = (t === "i" ? wo : At)(this, this.l), this.l += 2, a;
        case 4:
        case -4:
          return t === "i" || !(this[this.l + 3] & 128) ? (a = (e > 0 ? qt : ko)(this, this.l), this.l += 4, a) : (n = jr(this, this.l), this.l += 4, n);
        case 8:
        case -8:
          if (t === "f")
            return e == 8 ? n = Bn(this, this.l) : n = Bn([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0), this.l += 8, n;
          e = 8;
        case 16:
          r = lf(this, this.l, e);
          break;
      }
  }
  return this.l += e, r;
}
var Eo = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255, e[r + 2] = t >>> 16 & 255, e[r + 3] = t >>> 24 & 255;
}, To = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >> 8 & 255, e[r + 2] = t >> 16 & 255, e[r + 3] = t >> 24 & 255;
}, So = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255;
};
function Fo(e, t, r) {
  var a = 0, n = 0;
  if (r === "dbcs") {
    for (n = 0; n != t.length; ++n) So(this, t.charCodeAt(n), this.l + 2 * n);
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
      a = 4, Eo(this, t, this.l);
      break;
    case 8:
      if (a = 8, r === "f") {
        _o(this, t, this.l);
        break;
      }
    case 16:
      break;
    case -4:
      a = 4, To(this, t, this.l);
      break;
  }
  return this.l += a, this;
}
function kf(e, t) {
  var r = lf(this, this.l, e.length >> 1);
  if (r !== e) throw new Error(t + "Expected " + e + " saw " + r);
  this.l += e.length >> 1;
}
function Fr(e, t) {
  e.l = t, e.read_shift = /*::(*/
  Ha, e.chk = kf, e.write_shift = Fo;
}
function Lr(e, t) {
  e.l += t;
}
function K(e) {
  var t = Wt(e);
  return Fr(t, 0), t;
}
function bt(e, t, r) {
  if (e) {
    var a, n, i;
    Fr(e, e.l || 0);
    for (var s = e.length, f = 0, c = 0; e.l < s; ) {
      f = e.read_shift(1), f & 128 && (f = (f & 127) + ((e.read_shift(1) & 127) << 7));
      var l = cn[f] || cn[65535];
      for (a = e.read_shift(1), i = a & 127, n = 1; n < 4 && a & 128; ++n) i += ((a = e.read_shift(1)) & 127) << 7 * n;
      c = e.l + i;
      var o = l.f && l.f(e, i, r);
      if (e.l = c, t(o, l, f)) return;
    }
  }
}
function Gr() {
  var e = [], t = Ne ? 256 : 2048, r = function(l) {
    var o = K(l);
    return Fr(o, 0), o;
  }, a = r(t), n = function() {
    a && (a.length > a.l && (a = a.slice(0, a.l), a.l = a.length), a.length > 0 && e.push(a), a = null);
  }, i = function(l) {
    return a && l < a.length - a.l ? a : (n(), a = r(Math.max(l + 1, t)));
  }, s = function() {
    return n(), Er(e);
  }, f = function(l) {
    n(), a = l, a.l == null && (a.l = a.length), i(t);
  };
  return { next: i, push: f, end: s, _bufs: e };
}
function Q(e, t, r, a) {
  var n = +t, i;
  if (!isNaN(n)) {
    a || (a = cn[n].p || (r || []).length || 0), i = 1 + (n >= 128 ? 1 : 0) + 1, a >= 128 && ++i, a >= 16384 && ++i, a >= 2097152 && ++i;
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
    a > 0 && G0(r) && e.push(r);
  }
}
function Xa(e, t, r) {
  var a = Ze(e);
  if (t.s ? (a.cRel && (a.c += t.s.c), a.rRel && (a.r += t.s.r)) : (a.cRel && (a.c += t.c), a.rRel && (a.r += t.r)), !r || r.biff < 12) {
    for (; a.c >= 256; ) a.c -= 256;
    for (; a.r >= 65536; ) a.r -= 65536;
  }
  return a;
}
function es(e, t, r) {
  var a = Ze(e);
  return a.s = Xa(a.s, t.s, r), a.e = Xa(a.e, t.s, r), a;
}
function Ga(e, t) {
  if (e.cRel && e.c < 0)
    for (e = Ze(e); e.c < 0; ) e.c += t > 8 ? 16384 : 256;
  if (e.rRel && e.r < 0)
    for (e = Ze(e); e.r < 0; ) e.r += t > 8 ? 1048576 : t > 5 ? 65536 : 16384;
  var r = Fe(e);
  return !e.cRel && e.cRel != null && (r = Co(r)), !e.rRel && e.rRel != null && (r = yo(r)), r;
}
function f0(e, t) {
  return e.s.r == 0 && !e.s.rRel && e.e.r == (t.biff >= 12 ? 1048575 : t.biff >= 8 ? 65536 : 16384) && !e.e.rRel ? (e.s.cRel ? "" : "$") + tr(e.s.c) + ":" + (e.e.cRel ? "" : "$") + tr(e.e.c) : e.s.c == 0 && !e.s.cRel && e.e.c == (t.biff >= 12 ? 16383 : 255) && !e.e.cRel ? (e.s.rRel ? "" : "$") + or(e.s.r) + ":" + (e.e.rRel ? "" : "$") + or(e.e.r) : Ga(e.s, t.biff) + ":" + Ga(e.e, t.biff);
}
function z0(e) {
  return parseInt(Ao(e), 10) - 1;
}
function or(e) {
  return "" + (e + 1);
}
function yo(e) {
  return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2");
}
function Ao(e) {
  return e.replace(/\$(\d+)$/, "$1");
}
function $0(e) {
  for (var t = Do(e), r = 0, a = 0; a !== t.length; ++a) r = 26 * r + t.charCodeAt(a) - 64;
  return r - 1;
}
function tr(e) {
  if (e < 0) throw new Error("invalid column " + e);
  var t = "";
  for (++e; e; e = Math.floor((e - 1) / 26)) t = String.fromCharCode((e - 1) % 26 + 65) + t;
  return t;
}
function Co(e) {
  return e.replace(/^([A-Z])/, "$$$1");
}
function Do(e) {
  return e.replace(/^\$([A-Z])/, "$1");
}
function Io(e) {
  return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",");
}
function ar(e) {
  for (var t = 0, r = 0, a = 0; a < e.length; ++a) {
    var n = e.charCodeAt(a);
    n >= 48 && n <= 57 ? t = 10 * t + (n - 48) : n >= 65 && n <= 90 && (r = 26 * r + (n - 64));
  }
  return { c: r - 1, r: t - 1 };
}
function Fe(e) {
  for (var t = e.c + 1, r = ""; t; t = (t - 1) / 26 | 0) r = String.fromCharCode((t - 1) % 26 + 65) + r;
  return r + (e.r + 1);
}
function zr(e) {
  var t = e.indexOf(":");
  return t == -1 ? { s: ar(e), e: ar(e) } : { s: ar(e.slice(0, t)), e: ar(e.slice(t + 1)) };
}
function De(e, t) {
  return typeof t > "u" || typeof t == "number" ? De(e.s, e.e) : (typeof e != "string" && (e = Fe(e)), typeof t != "string" && (t = Fe(t)), e == t ? e : e + ":" + t);
}
function Ue(e) {
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
function rs(e, t) {
  var r = e.t == "d" && t instanceof Date;
  if (e.z != null) try {
    return e.w = ft(e.z, r ? wr(t) : t);
  } catch {
  }
  try {
    return e.w = ft((e.XF || {}).numFmtId || (r ? 14 : 0), r ? wr(t) : t);
  } catch {
    return "" + t;
  }
}
function Ot(e, t, r) {
  return e == null || e.t == null || e.t == "z" ? "" : e.w !== void 0 ? e.w : (e.t == "d" && !e.z && r && r.dateNF && (e.z = r.dateNF), e.t == "e" ? Nt[e.v] || e.v : t == null ? rs(e, e.v) : rs(e, t));
}
function zt(e, t) {
  var r = t && t.sheet ? t.sheet : "Sheet1", a = {};
  return a[r] = e, { SheetNames: [r], Sheets: a };
}
function Ef(e, t, r) {
  var a = r || {}, n = e ? Array.isArray(e) : a.dense, i = e || (n ? [] : {}), s = 0, f = 0;
  if (i && a.origin != null) {
    if (typeof a.origin == "number") s = a.origin;
    else {
      var c = typeof a.origin == "string" ? ar(a.origin) : a.origin;
      s = c.r, f = c.c;
    }
    i["!ref"] || (i["!ref"] = "A1:A1");
  }
  var l = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } };
  if (i["!ref"]) {
    var o = Ue(i["!ref"]);
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
          else typeof d.v == "number" ? d.t = "n" : typeof d.v == "boolean" ? d.t = "b" : d.v instanceof Date ? (d.z = a.dateNF || Te[14], a.cellDates ? (d.t = "d", d.w = ft(d.z, wr(d.v))) : (d.t = "n", d.v = wr(d.v), d.w = ft(d.z, d.v))) : d.t = "s";
          if (n)
            i[v] || (i[v] = []), i[v][h] && i[v][h].z && (d.z = i[v][h].z), i[v][h] = d;
          else {
            var p = Fe({ c: h, r: v });
            i[p] && i[p].z && (d.z = i[p].z), i[p] = d;
          }
        }
    }
  return l.s.c < 1e7 && (i["!ref"] = De(l)), i;
}
function ba(e, t) {
  return Ef(null, e, t);
}
function Oo(e) {
  return e.read_shift(4, "i");
}
function pt(e, t) {
  return t || (t = K(4)), t.write_shift(4, e), t;
}
function Pr(e) {
  var t = e.read_shift(4);
  return t === 0 ? "" : e.read_shift(t, "dbcs");
}
function Tr(e, t) {
  var r = !1;
  return t == null && (r = !0, t = K(4 + 2 * e.length)), t.write_shift(4, e.length), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
function Ro(e) {
  return { ich: e.read_shift(2), ifnt: e.read_shift(2) };
}
function bo(e, t) {
  return t || (t = K(4)), t.write_shift(2, 0), t.write_shift(2, 0), t;
}
function K0(e, t) {
  var r = e.l, a = e.read_shift(1), n = Pr(e), i = [], s = { t: n, h: n };
  if (a & 1) {
    for (var f = e.read_shift(4), c = 0; c != f; ++c) i.push(Ro(e));
    s.r = i;
  } else s.r = [{ ich: 0, ifnt: 0 }];
  return e.l = r + t, s;
}
function No(e, t) {
  var r = !1;
  return t == null && (r = !0, t = K(15 + 4 * e.t.length)), t.write_shift(1, 0), Tr(e.t, t), r ? t.slice(0, t.l) : t;
}
var Po = K0;
function Lo(e, t) {
  var r = !1;
  return t == null && (r = !0, t = K(23 + 4 * e.t.length)), t.write_shift(1, 1), Tr(e.t, t), t.write_shift(4, 1), bo({}, t), r ? t.slice(0, t.l) : t;
}
function ct(e) {
  var t = e.read_shift(4), r = e.read_shift(2);
  return r += e.read_shift(1) << 16, e.l++, { c: t, iStyleRef: r };
}
function oa(e, t) {
  return t == null && (t = K(8)), t.write_shift(-4, e.c), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
function ua(e) {
  var t = e.read_shift(2);
  return t += e.read_shift(1) << 16, e.l++, { c: -1, iStyleRef: t };
}
function ha(e, t) {
  return t == null && (t = K(4)), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
var Bo = Pr, Tf = Tr;
function j0(e) {
  var t = e.read_shift(4);
  return t === 0 || t === 4294967295 ? "" : e.read_shift(t, "dbcs");
}
function Mn(e, t) {
  var r = !1;
  return t == null && (r = !0, t = K(127)), t.write_shift(4, e.length > 0 ? e.length : 4294967295), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
var Mo = Pr, w0 = j0, Y0 = Mn;
function J0(e) {
  var t = e.slice(e.l, e.l + 4), r = t[0] & 1, a = t[0] & 2;
  e.l += 4;
  var n = a === 0 ? Bn([0, 0, 0, 0, t[0] & 252, t[1], t[2], t[3]], 0) : qt(t, 0) >> 2;
  return r ? n / 100 : n;
}
function Sf(e, t) {
  t == null && (t = K(4));
  var r = 0, a = 0, n = e * 100;
  if (e == (e | 0) && e >= -536870912 && e < 1 << 29 ? a = 1 : n == (n | 0) && n >= -536870912 && n < 1 << 29 && (a = 1, r = 1), a) t.write_shift(-4, ((r ? n : e) << 2) + (r + 2));
  else throw new Error("unsupported RkNumber " + e);
}
function Ff(e) {
  var t = { s: {}, e: {} };
  return t.s.r = e.read_shift(4), t.e.r = e.read_shift(4), t.s.c = e.read_shift(4), t.e.c = e.read_shift(4), t;
}
function Uo(e, t) {
  return t || (t = K(16)), t.write_shift(4, e.s.r), t.write_shift(4, e.e.r), t.write_shift(4, e.s.c), t.write_shift(4, e.e.c), t;
}
var xa = Ff, Na = Uo;
function Nr(e) {
  if (e.length - e.l < 8) throw "XLS Xnum Buffer underflow";
  return e.read_shift(8, "f");
}
function ia(e, t) {
  return (t || K(8)).write_shift(8, e, "f");
}
function Wo(e) {
  var t = {}, r = e.read_shift(1), a = r >>> 1, n = e.read_shift(1), i = e.read_shift(2, "i"), s = e.read_shift(1), f = e.read_shift(1), c = e.read_shift(1);
  switch (e.l++, a) {
    case 0:
      t.auto = 1;
      break;
    case 1:
      t.index = n;
      var l = Qt[n];
      l && (t.rgb = an(l));
      break;
    case 2:
      t.rgb = an([s, f, c]);
      break;
    case 3:
      t.theme = n;
      break;
  }
  return i != 0 && (t.tint = i > 0 ? i / 32767 : i / 32768), t;
}
function Un(e, t) {
  if (t || (t = K(8)), !e || e.auto)
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
function Vo(e) {
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
function Ho(e, t) {
  t || (t = K(2));
  var r = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 : 0);
  return t.write_shift(1, r), t.write_shift(1, 0), t;
}
function yf(e, t) {
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
function Xo(e) {
  return yf(e, 1);
}
function Go(e) {
  return yf(e, 2);
}
var q0 = 2, Xr = 3, Tn = 11, ts = 12, Wn = 19, Sn = 64, zo = 65, $o = 71, Ko = 4108, jo = 4126, kr = 80, Af = 81, Yo = [kr, Af], k0 = {
  /*::[*/
  1: { n: "CodePage", t: q0 },
  /*::[*/
  2: { n: "Category", t: kr },
  /*::[*/
  3: { n: "PresentationFormat", t: kr },
  /*::[*/
  4: { n: "ByteCount", t: Xr },
  /*::[*/
  5: { n: "LineCount", t: Xr },
  /*::[*/
  6: { n: "ParagraphCount", t: Xr },
  /*::[*/
  7: { n: "SlideCount", t: Xr },
  /*::[*/
  8: { n: "NoteCount", t: Xr },
  /*::[*/
  9: { n: "HiddenCount", t: Xr },
  /*::[*/
  10: { n: "MultimediaClipCount", t: Xr },
  /*::[*/
  11: { n: "ScaleCrop", t: Tn },
  /*::[*/
  12: {
    n: "HeadingPairs",
    t: Ko
    /* VT_VECTOR | VT_VARIANT */
  },
  /*::[*/
  13: {
    n: "TitlesOfParts",
    t: jo
    /* VT_VECTOR | VT_LPSTR */
  },
  /*::[*/
  14: { n: "Manager", t: kr },
  /*::[*/
  15: { n: "Company", t: kr },
  /*::[*/
  16: { n: "LinksUpToDate", t: Tn },
  /*::[*/
  17: { n: "CharacterCount", t: Xr },
  /*::[*/
  19: { n: "SharedDoc", t: Tn },
  /*::[*/
  22: { n: "HyperlinksChanged", t: Tn },
  /*::[*/
  23: { n: "AppVersion", t: Xr, p: "version" },
  /*::[*/
  24: { n: "DigSig", t: zo },
  /*::[*/
  26: { n: "ContentType", t: kr },
  /*::[*/
  27: { n: "ContentStatus", t: kr },
  /*::[*/
  28: { n: "Language", t: kr },
  /*::[*/
  29: { n: "Version", t: kr },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: Wn },
  /*::[*/
  2147483651: { n: "Behavior", t: Wn },
  /*::[*/
  1919054434: {}
}, E0 = {
  /*::[*/
  1: { n: "CodePage", t: q0 },
  /*::[*/
  2: { n: "Title", t: kr },
  /*::[*/
  3: { n: "Subject", t: kr },
  /*::[*/
  4: { n: "Author", t: kr },
  /*::[*/
  5: { n: "Keywords", t: kr },
  /*::[*/
  6: { n: "Comments", t: kr },
  /*::[*/
  7: { n: "Template", t: kr },
  /*::[*/
  8: { n: "LastAuthor", t: kr },
  /*::[*/
  9: { n: "RevNumber", t: kr },
  /*::[*/
  10: { n: "EditTime", t: Sn },
  /*::[*/
  11: { n: "LastPrinted", t: Sn },
  /*::[*/
  12: { n: "CreatedDate", t: Sn },
  /*::[*/
  13: { n: "ModifiedDate", t: Sn },
  /*::[*/
  14: { n: "PageCount", t: Xr },
  /*::[*/
  15: { n: "WordCount", t: Xr },
  /*::[*/
  16: { n: "CharCount", t: Xr },
  /*::[*/
  17: { n: "Thumbnail", t: $o },
  /*::[*/
  18: { n: "Application", t: kr },
  /*::[*/
  19: { n: "DocSecurity", t: Xr },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: Wn },
  /*::[*/
  2147483651: { n: "Behavior", t: Wn },
  /*::[*/
  1919054434: {}
}, as = {
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
}, Jo = [
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
function qo(e) {
  return e.map(function(t) {
    return [t >> 16 & 255, t >> 8 & 255, t & 255];
  });
}
var Zo = /* @__PURE__ */ qo([
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
]), Qt = /* @__PURE__ */ Ze(Zo), Nt = {
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
}, Cf = {
  "#NULL!": 0,
  "#DIV/0!": 7,
  "#VALUE!": 15,
  "#REF!": 23,
  "#NAME?": 29,
  "#NUM!": 36,
  "#N/A": 42,
  "#GETTING_DATA": 43,
  "#WTF?": 255
}, T0 = {
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
}, Fn = {
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
function Z0() {
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
function Qo(e) {
  var t = Z0();
  if (!e || !e.match) return t;
  var r = {};
  if ((e.match(Br) || []).forEach(function(a) {
    var n = ye(a);
    switch (n[0].replace(co, "<")) {
      case "<?xml":
        break;
      case "<Types":
        t.xmlns = n["xmlns" + (n[0].match(/<(\w+):/) || ["", ""])[1]];
        break;
      case "<Default":
        r[n.Extension] = n.ContentType;
        break;
      case "<Override":
        t[T0[n.ContentType]] !== void 0 && t[T0[n.ContentType]].push(n.PartName);
        break;
    }
  }), t.xmlns !== _r.CT) throw new Error("Unknown Namespace: " + t.xmlns);
  return t.calcchain = t.calcchains.length > 0 ? t.calcchains[0] : "", t.sst = t.strs.length > 0 ? t.strs[0] : "", t.style = t.styles.length > 0 ? t.styles[0] : "", t.defaults = r, delete t.calcchains, t;
}
function Df(e, t) {
  var r = Zl(T0), a = [], n;
  a[a.length] = ur, a[a.length] = ue("Types", null, {
    xmlns: _r.CT,
    "xmlns:xsd": _r.xsd,
    "xmlns:xsi": _r.xsi
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
    return ue("Default", null, { Extension: c[0], ContentType: c[1] });
  }));
  var i = function(c) {
    e[c] && e[c].length > 0 && (n = e[c][0], a[a.length] = ue("Override", null, {
      PartName: (n[0] == "/" ? "" : "/") + n,
      ContentType: Fn[c][t.bookType] || Fn[c].xlsx
    }));
  }, s = function(c) {
    (e[c] || []).forEach(function(l) {
      a[a.length] = ue("Override", null, {
        PartName: (l[0] == "/" ? "" : "/") + l,
        ContentType: Fn[c][t.bookType] || Fn[c].xlsx
      });
    });
  }, f = function(c) {
    (e[c] || []).forEach(function(l) {
      a[a.length] = ue("Override", null, {
        PartName: (l[0] == "/" ? "" : "/") + l,
        ContentType: r[c][0]
      });
    });
  };
  return i("workbooks"), s("sheets"), s("charts"), f("themes"), ["strs", "styles"].forEach(i), ["coreprops", "extprops", "custprops"].forEach(f), f("vba"), f("comments"), f("threadedcomments"), f("drawings"), s("metadata"), f("people"), a.length > 2 && (a[a.length] = "</Types>", a[1] = a[1].replace("/>", ">")), a.join("");
}
var Be = {
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
function tn(e) {
  var t = e.lastIndexOf("/");
  return e.slice(0, t + 1) + "_rels/" + e.slice(t + 1) + ".rels";
}
function za(e, t) {
  var r = { "!id": {} };
  if (!e) return r;
  t.charAt(0) !== "/" && (t = "/" + t);
  var a = {};
  return (e.match(Br) || []).forEach(function(n) {
    var i = ye(n);
    if (i[0] === "<Relationship") {
      var s = {};
      s.Type = i.Type, s.Target = i.Target, s.Id = i.Id, i.TargetMode && (s.TargetMode = i.TargetMode);
      var f = i.TargetMode === "External" ? i.Target : Va(i.Target, t);
      r[f] = s, a[i.Id] = s;
    }
  }), r["!id"] = a, r;
}
function Fa(e) {
  var t = [ur, ue("Relationships", null, {
    //'xmlns:ns0': XMLNS.RELS,
    xmlns: _r.RELS
  })];
  return sr(e["!id"]).forEach(function(r) {
    t[t.length] = ue("Relationship", null, e["!id"][r]);
  }), t.length > 2 && (t[t.length] = "</Relationships>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function Xe(e, t, r, a, n, i) {
  if (n || (n = {}), e["!id"] || (e["!id"] = {}), e["!idx"] || (e["!idx"] = 1), t < 0) for (t = e["!idx"]; e["!id"]["rId" + t]; ++t)
    ;
  if (e["!idx"] = t + 1, n.Id = "rId" + t, n.Type = a, n.Target = r, [Be.HLINK, Be.XPATH, Be.XMISS].indexOf(n.Type) > -1 && (n.TargetMode = "External"), e["!id"][n.Id]) throw new Error("Cannot rewrite rId " + t);
  return e["!id"][n.Id] = n, e[("/" + n.Target).replace("//", "/")] = n, t;
}
var eu = "application/vnd.oasis.opendocument.spreadsheet";
function ru(e, t) {
  for (var r = H0(e), a, n; a = rn.exec(r); ) switch (a[3]) {
    case "manifest":
      break;
    case "file-entry":
      if (n = ye(a[0], !1), n.path == "/" && n.type !== eu) throw new Error("This OpenDocument is not a spreadsheet");
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
function tu(e) {
  var t = [ur];
  t.push(`<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
`), t.push(`  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
`);
  for (var r = 0; r < e.length; ++r) t.push('  <manifest:file-entry manifest:full-path="' + e[r][0] + '" manifest:media-type="' + e[r][1] + `"/>
`);
  return t.push("</manifest:manifest>"), t.join("");
}
function ns(e, t, r) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (r || "odf") + "#" + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function au(e, t) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function nu(e) {
  var t = [ur];
  t.push(`<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
`);
  for (var r = 0; r != e.length; ++r)
    t.push(ns(e[r][0], e[r][1])), t.push(au("", e[r][0]));
  return t.push(ns("", "Document", "pkg")), t.push("</rdf:RDF>"), t.join("");
}
function If() {
  return '<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS ' + Rn.version + "</meta:generator></office:meta></office:document-meta>";
}
var st = [
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
], iu = /* @__PURE__ */ function() {
  for (var e = new Array(st.length), t = 0; t < st.length; ++t) {
    var r = st[t], a = "(?:" + r[0].slice(0, r[0].indexOf(":")) + ":)" + r[0].slice(r[0].indexOf(":") + 1);
    e[t] = new RegExp("<" + a + "[^>]*>([\\s\\S]*?)</" + a + ">");
  }
  return e;
}();
function Of(e) {
  var t = {};
  e = ze(e);
  for (var r = 0; r < st.length; ++r) {
    var a = st[r], n = e.match(iu[r]);
    n != null && n.length > 0 && (t[a[1]] = Me(n[1])), a[2] === "date" && t[a[1]] && (t[a[1]] = qe(t[a[1]]));
  }
  return t;
}
function c0(e, t, r, a, n) {
  n[e] != null || t == null || t === "" || (n[e] = t, t = Ge(t), a[a.length] = r ? ue(e, t, r) : yr(e, t));
}
function Rf(e, t) {
  var r = t || {}, a = [ur, ue("cp:coreProperties", null, {
    //'xmlns': XMLNS.CORE_PROPS,
    "xmlns:cp": _r.CORE_PROPS,
    "xmlns:dc": _r.dc,
    "xmlns:dcterms": _r.dcterms,
    "xmlns:dcmitype": _r.dcmitype,
    "xmlns:xsi": _r.xsi
  })], n = {};
  if (!e && !r.Props) return a.join("");
  e && (e.CreatedDate != null && c0("dcterms:created", typeof e.CreatedDate == "string" ? e.CreatedDate : _0(e.CreatedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, a, n), e.ModifiedDate != null && c0("dcterms:modified", typeof e.ModifiedDate == "string" ? e.ModifiedDate : _0(e.ModifiedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, a, n));
  for (var i = 0; i != st.length; ++i) {
    var s = st[i], f = r.Props && r.Props[s[1]] != null ? r.Props[s[1]] : e ? e[s[1]] : null;
    f === !0 ? f = "1" : f === !1 ? f = "0" : typeof f == "number" && (f = String(f)), f != null && c0(s[0], f, null, a, n);
  }
  return a.length > 2 && (a[a.length] = "</cp:coreProperties>", a[1] = a[1].replace("/>", ">")), a.join("");
}
var ea = [
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
], bf = [
  "Worksheets",
  "SheetNames",
  "NamedRanges",
  "DefinedNames",
  "Chartsheets",
  "ChartNames"
];
function Nf(e, t, r, a) {
  var n = [];
  if (typeof e == "string") n = ji(e, a);
  else for (var i = 0; i < e.length; ++i) n = n.concat(e[i].map(function(o) {
    return { v: o };
  }));
  var s = typeof t == "string" ? ji(t, a).map(function(o) {
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
function su(e, t, r) {
  var a = {};
  return t || (t = {}), e = ze(e), ea.forEach(function(n) {
    var i = (e.match(Qa(n[0])) || [])[1];
    switch (n[2]) {
      case "string":
        i && (t[n[1]] = Me(i));
        break;
      case "bool":
        t[n[1]] = i === "true";
        break;
      case "raw":
        var s = e.match(new RegExp("<" + n[0] + "[^>]*>([\\s\\S]*?)</" + n[0] + ">"));
        s && s.length > 0 && (a[n[1]] = s[1]);
        break;
    }
  }), a.HeadingPairs && a.TitlesOfParts && Nf(a.HeadingPairs, a.TitlesOfParts, t, r), t;
}
function Pf(e) {
  var t = [], r = ue;
  return e || (e = {}), e.Application = "SheetJS", t[t.length] = ur, t[t.length] = ue("Properties", null, {
    xmlns: _r.EXT_PROPS,
    "xmlns:vt": _r.vt
  }), ea.forEach(function(a) {
    if (e[a[1]] !== void 0) {
      var n;
      switch (a[2]) {
        case "string":
          n = Ge(String(e[a[1]]));
          break;
        case "bool":
          n = e[a[1]] ? "true" : "false";
          break;
      }
      n !== void 0 && (t[t.length] = r(a[0], n));
    }
  }), t[t.length] = r("HeadingPairs", r("vt:vector", r("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + r("vt:variant", r("vt:i4", String(e.Worksheets))), { size: 2, baseType: "variant" })), t[t.length] = r("TitlesOfParts", r("vt:vector", e.SheetNames.map(function(a) {
    return "<vt:lpstr>" + Ge(a) + "</vt:lpstr>";
  }).join(""), { size: e.Worksheets, baseType: "lpstr" })), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
var fu = /<[^>]+>[^<]*/g;
function cu(e, t) {
  var r = {}, a = "", n = e.match(fu);
  if (n) for (var i = 0; i != n.length; ++i) {
    var s = n[i], f = ye(s);
    switch (f[0]) {
      case "<?xml":
        break;
      case "<Properties":
        break;
      case "<property":
        a = Me(f.name);
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
              r[a] = Me(o);
              break;
            case "bool":
              r[a] = Je(o);
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
              r[a] = qe(o);
              break;
            case "cy":
            case "error":
              r[a] = Me(o);
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
function Lf(e) {
  var t = [ur, ue("Properties", null, {
    xmlns: _r.CUST_PROPS,
    "xmlns:vt": _r.vt
  })];
  if (!e) return t.join("");
  var r = 1;
  return sr(e).forEach(function(n) {
    ++r, t[t.length] = ue("property", mo(e[n]), {
      fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: r,
      name: Ge(n)
    });
  }), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
var S0 = {
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
}, l0;
function lu(e, t, r) {
  l0 || (l0 = Kn(S0)), t = l0[t] || t, e[t] = r;
}
function ou(e, t) {
  var r = [];
  return sr(S0).map(function(a) {
    for (var n = 0; n < st.length; ++n) if (st[n][1] == a) return st[n];
    for (n = 0; n < ea.length; ++n) if (ea[n][1] == a) return ea[n];
    throw a;
  }).forEach(function(a) {
    if (e[a[1]] != null) {
      var n = t && t.Props && t.Props[a[1]] != null ? t.Props[a[1]] : e[a[1]];
      switch (a[2]) {
        case "date":
          n = new Date(n).toISOString().replace(/\.\d*Z/, "Z");
          break;
      }
      typeof n == "number" ? n = String(n) : n === !0 || n === !1 ? n = n ? "1" : "0" : n instanceof Date && (n = new Date(n).toISOString().replace(/\.\d*Z/, "")), r.push(yr(S0[a[1]] || a[1], n));
    }
  }), ue("DocumentProperties", r.join(""), { xmlns: Kr.o });
}
function uu(e, t) {
  var r = ["Worksheets", "SheetNames"], a = "CustomDocumentProperties", n = [];
  return e && sr(e).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(e, i)) {
      for (var s = 0; s < st.length; ++s) if (i == st[s][1]) return;
      for (s = 0; s < ea.length; ++s) if (i == ea[s][1]) return;
      for (s = 0; s < r.length; ++s) if (i == r[s]) return;
      var f = e[i], c = "string";
      typeof f == "number" ? (c = "float", f = String(f)) : f === !0 || f === !1 ? (c = "boolean", f = f ? "1" : "0") : f = String(f), n.push(ue(Gi(i), f, { "dt:dt": c }));
    }
  }), t && sr(t).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(t, i) && !(e && Object.prototype.hasOwnProperty.call(e, i))) {
      var s = t[i], f = "string";
      typeof s == "number" ? (f = "float", s = String(s)) : s === !0 || s === !1 ? (f = "boolean", s = s ? "1" : "0") : s instanceof Date ? (f = "dateTime.tz", s = s.toISOString()) : s = String(s), n.push(ue(Gi(i), s, { "dt:dt": f }));
    }
  }), "<" + a + ' xmlns="' + Kr.o + '">' + n.join("") + "</" + a + ">";
}
function Q0(e) {
  var t = e.read_shift(4), r = e.read_shift(4);
  return new Date((r / 1e7 * Math.pow(2, 32) + t / 1e7 - 11644473600) * 1e3).toISOString().replace(/\.000/, "");
}
function hu(e) {
  var t = typeof e == "string" ? new Date(Date.parse(e)) : e, r = t.getTime() / 1e3 + 11644473600, a = r % Math.pow(2, 32), n = (r - a) / Math.pow(2, 32);
  a *= 1e7, n *= 1e7;
  var i = a / Math.pow(2, 32) | 0;
  i > 0 && (a = a % Math.pow(2, 32), n += i);
  var s = K(8);
  return s.write_shift(4, a), s.write_shift(4, n), s;
}
function Bf(e, t, r) {
  var a = e.l, n = e.read_shift(0, "lpstr-cp");
  if (r) for (; e.l - a & 3; ) ++e.l;
  return n;
}
function Mf(e, t, r) {
  var a = e.read_shift(0, "lpwstr");
  return a;
}
function Uf(e, t, r) {
  return t === 31 ? Mf(e) : Bf(e, t, r);
}
function F0(e, t, r) {
  return Uf(e, t, r === !1 ? 0 : 4);
}
function xu(e, t) {
  if (!t) throw new Error("VtUnalignedString must have positive length");
  return Uf(e, t, 0);
}
function du(e) {
  for (var t = e.read_shift(4), r = [], a = 0; a != t; ++a) {
    var n = e.l;
    r[a] = e.read_shift(0, "lpwstr").replace(Vr, ""), e.l - n & 2 && (e.l += 2);
  }
  return r;
}
function vu(e) {
  for (var t = e.read_shift(4), r = [], a = 0; a != t; ++a) r[a] = e.read_shift(0, "lpstr-cp").replace(Vr, "");
  return r;
}
function pu(e) {
  var t = e.l, r = Vn(e, Af);
  e[e.l] == 0 && e[e.l + 1] == 0 && e.l - t & 2 && (e.l += 2);
  var a = Vn(e, Xr);
  return [r, a];
}
function mu(e) {
  for (var t = e.read_shift(4), r = [], a = 0; a < t / 2; ++a) r.push(pu(e));
  return r;
}
function is(e, t) {
  for (var r = e.read_shift(4), a = {}, n = 0; n != r; ++n) {
    var i = e.read_shift(4), s = e.read_shift(4);
    a[i] = e.read_shift(s, t === 1200 ? "utf16le" : "utf8").replace(Vr, "").replace(Wa, "!"), t === 1200 && s % 2 && (e.l += 2);
  }
  return e.l & 3 && (e.l = e.l >> 3 << 2), a;
}
function Wf(e) {
  var t = e.read_shift(4), r = e.slice(e.l, e.l + t);
  return e.l += t, (t & 3) > 0 && (e.l += 4 - (t & 3) & 3), r;
}
function gu(e) {
  var t = {};
  return t.Size = e.read_shift(4), e.l += t.Size + 3 - (t.Size - 1) % 4, t;
}
function Vn(e, t, r) {
  var a = e.read_shift(2), n, i = r || {};
  if (e.l += 2, t !== ts && a !== t && Yo.indexOf(t) === -1 && !((t & 65534) == 4126 && (a & 65534) == 4126))
    throw new Error("Expected type " + t + " saw " + a);
  switch (t === ts ? a : t) {
    case 2:
      return n = e.read_shift(2, "i"), i.raw || (e.l += 2), n;
    case 3:
      return n = e.read_shift(4, "i"), n;
    case 11:
      return e.read_shift(4) !== 0;
    case 19:
      return n = e.read_shift(4), n;
    case 30:
      return Bf(e, a, 4).replace(Vr, "");
    case 31:
      return Mf(e);
    case 64:
      return Q0(e);
    case 65:
      return Wf(e);
    case 71:
      return gu(e);
    case 80:
      return F0(e, a, !i.raw).replace(Vr, "");
    case 81:
      return xu(
        e,
        a
        /*, 4*/
      ).replace(Vr, "");
    case 4108:
      return mu(e);
    case 4126:
    case 4127:
      return a == 4127 ? du(e) : vu(e);
    default:
      throw new Error("TypedPropertyValue unrecognized type " + t + " " + a);
  }
}
function ss(e, t) {
  var r = K(4), a = K(4);
  switch (r.write_shift(4, e == 80 ? 31 : e), e) {
    case 3:
      a.write_shift(-4, t);
      break;
    case 5:
      a = K(8), a.write_shift(8, t, "f");
      break;
    case 11:
      a.write_shift(4, t ? 1 : 0);
      break;
    case 64:
      a = hu(t);
      break;
    case 31:
    case 80:
      for (a = K(4 + 2 * (t.length + 1) + (t.length % 2 ? 0 : 2)), a.write_shift(4, t.length + 1), a.write_shift(0, t, "dbcs"); a.l != a.length; ) a.write_shift(1, 0);
      break;
    default:
      throw new Error("TypedPropertyValue unrecognized type " + e + " " + t);
  }
  return Er([r, a]);
}
function fs(e, t) {
  var r = e.l, a = e.read_shift(4), n = e.read_shift(4), i = [], s = 0, f = 0, c = -1, l = {};
  for (s = 0; s != n; ++s) {
    var o = e.read_shift(4), u = e.read_shift(4);
    i[s] = [o, u + r];
  }
  i.sort(function(T, g) {
    return T[1] - g[1];
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
      if (x[v.n] = Vn(e, v.t, { raw: !0 }), v.p === "version" && (x[v.n] = String(x[v.n] >> 16) + "." + ("0000" + String(x[v.n] & 65535)).slice(-4)), v.n == "CodePage") switch (x[v.n]) {
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
          xt(f = x[v.n] >>> 0 & 65535);
          break;
        default:
          throw new Error("Unsupported CodePage: " + x[v.n]);
      }
    } else if (i[s][0] === 1) {
      if (f = x.CodePage = Vn(e, q0), xt(f), c !== -1) {
        var h = e.l;
        e.l = i[c][1], l = is(e, f), e.l = h;
      }
    } else if (i[s][0] === 0) {
      if (f === 0) {
        c = s, e.l = i[s + 1][1];
        continue;
      }
      l = is(e, f);
    } else {
      var p = l[i[s][0]], k;
      switch (e[e.l]) {
        case 65:
          e.l += 4, k = Wf(e);
          break;
        case 30:
          e.l += 4, k = F0(e, e[e.l - 4]).replace(/\u0000+$/, "");
          break;
        case 31:
          e.l += 4, k = F0(e, e[e.l - 4]).replace(/\u0000+$/, "");
          break;
        case 3:
          e.l += 4, k = e.read_shift(4, "i");
          break;
        case 19:
          e.l += 4, k = e.read_shift(4);
          break;
        case 5:
          e.l += 4, k = e.read_shift(8, "f");
          break;
        case 11:
          e.l += 4, k = lr(e, 4);
          break;
        case 64:
          e.l += 4, k = qe(Q0(e));
          break;
        default:
          throw new Error("unparsed value: " + e[e.l]);
      }
      x[p] = k;
    }
  }
  return e.l = r + a, x;
}
var Vf = ["CodePage", "Thumbnail", "_PID_LINKBASE", "_PID_HLINKS", "SystemIdentifier", "FMTID"];
function _u(e) {
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
function cs(e, t, r) {
  var a = K(8), n = [], i = [], s = 8, f = 0, c = K(8), l = K(8);
  if (c.write_shift(4, 2), c.write_shift(4, 1200), l.write_shift(4, 1), i.push(c), n.push(l), s += 8 + c.length, !t) {
    l = K(8), l.write_shift(4, 0), n.unshift(l);
    var o = [K(4)];
    for (o[0].write_shift(4, e.length), f = 0; f < e.length; ++f) {
      var u = e[f][0];
      for (c = K(8 + 2 * (u.length + 1) + (u.length % 2 ? 0 : 2)), c.write_shift(4, f + 2), c.write_shift(4, u.length + 1), c.write_shift(0, u, "dbcs"); c.l != c.length; ) c.write_shift(1, 0);
      o.push(c);
    }
    c = Er(o), i.unshift(c), s += 8 + c.length;
  }
  for (f = 0; f < e.length; ++f)
    if (!(t && !t[e[f][0]]) && !(Vf.indexOf(e[f][0]) > -1 || bf.indexOf(e[f][0]) > -1) && e[f][1] != null) {
      var x = e[f][1], d = 0;
      if (t) {
        d = +t[e[f][0]];
        var v = r[d];
        if (v.p == "version" && typeof x == "string") {
          var h = x.split(".");
          x = (+h[0] << 16) + (+h[1] || 0);
        }
        c = ss(v.t, x);
      } else {
        var p = _u(x);
        p == -1 && (p = 31, x = String(x)), c = ss(p, x);
      }
      i.push(c), l = K(8), l.write_shift(4, t ? d : 2 + f), n.push(l), s += 8 + c.length;
    }
  var k = 8 * (i.length + 1);
  for (f = 0; f < i.length; ++f)
    n[f].write_shift(4, k), k += i[f].length;
  return a.write_shift(4, s), a.write_shift(4, i.length), Er([a].concat(n).concat(i));
}
function ls(e, t, r) {
  var a = e.content;
  if (!a) return {};
  Fr(a, 0);
  var n, i, s, f, c = 0;
  a.chk("feff", "Byte Order: "), a.read_shift(2);
  var l = a.read_shift(4), o = a.read_shift(16);
  if (o !== we.utils.consts.HEADER_CLSID && o !== r) throw new Error("Bad PropertySet CLSID " + o);
  if (n = a.read_shift(4), n !== 1 && n !== 2) throw new Error("Unrecognized #Sets: " + n);
  if (i = a.read_shift(16), f = a.read_shift(4), n === 1 && f !== a.l) throw new Error("Length mismatch: " + f + " !== " + a.l);
  n === 2 && (s = a.read_shift(16), c = a.read_shift(4));
  var u = fs(a, t), x = { SystemIdentifier: l };
  for (var d in u) x[d] = u[d];
  if (x.FMTID = i, n === 1) return x;
  if (c - a.l == 2 && (a.l += 2), a.l !== c) throw new Error("Length mismatch 2: " + a.l + " !== " + c);
  var v;
  try {
    v = fs(a, null);
  } catch {
  }
  for (d in v) x[d] = v[d];
  return x.FMTID = [i, s], x;
}
function os(e, t, r, a, n, i) {
  var s = K(n ? 68 : 48), f = [s];
  s.write_shift(2, 65534), s.write_shift(2, 0), s.write_shift(4, 842412599), s.write_shift(16, we.utils.consts.HEADER_CLSID, "hex"), s.write_shift(4, n ? 2 : 1), s.write_shift(16, t, "hex"), s.write_shift(4, n ? 68 : 48);
  var c = cs(e, r, a);
  if (f.push(c), n) {
    var l = cs(n, null, null);
    s.write_shift(16, i, "hex"), s.write_shift(4, 68 + c.length), f.push(l);
  }
  return Er(f);
}
function Bt(e, t) {
  return e.read_shift(t), null;
}
function wu(e, t) {
  t || (t = K(e));
  for (var r = 0; r < e; ++r) t.write_shift(1, 0);
  return t;
}
function ku(e, t, r) {
  for (var a = [], n = e.l + t; e.l < n; ) a.push(r(e, n - e.l));
  if (n !== e.l) throw new Error("Slurp error");
  return a;
}
function lr(e, t) {
  return e.read_shift(t) === 1;
}
function Wr(e, t) {
  return t || (t = K(2)), t.write_shift(2, +!!e), t;
}
function pr(e) {
  return e.read_shift(2, "u");
}
function it(e, t) {
  return t || (t = K(2)), t.write_shift(2, e), t;
}
function Hf(e, t) {
  return ku(e, t, pr);
}
function Eu(e) {
  var t = e.read_shift(1), r = e.read_shift(1);
  return r === 1 ? t : t === 1;
}
function Xf(e, t, r) {
  return r || (r = K(2)), r.write_shift(1, t == "e" ? +e : +!!e), r.write_shift(1, t == "e" ? 1 : 0), r;
}
function xn(e, t, r) {
  var a = e.read_shift(r && r.biff >= 12 ? 2 : 1), n = "sbcs-cont";
  if (r && r.biff >= 8, !r || r.biff == 8) {
    var i = e.read_shift(1);
    i && (n = "dbcs-cont");
  } else r.biff == 12 && (n = "wstr");
  r.biff >= 2 && r.biff <= 5 && (n = "cpstr");
  var s = a ? e.read_shift(a, n) : "";
  return s;
}
function Tu(e) {
  var t = e.read_shift(2), r = e.read_shift(1), a = r & 4, n = r & 8, i = 1 + (r & 1), s = 0, f, c = {};
  n && (s = e.read_shift(2)), a && (f = e.read_shift(4));
  var l = i == 2 ? "dbcs-cont" : "sbcs-cont", o = t === 0 ? "" : e.read_shift(t, l);
  return n && (e.l += 4 * s), a && (e.l += f), c.t = o, n || (c.raw = "<t>" + c.t + "</t>", c.r = c.t), c;
}
function Su(e) {
  var t = e.t || "", r = K(3);
  r.write_shift(2, t.length), r.write_shift(1, 1);
  var a = K(2 * t.length);
  a.write_shift(2 * t.length, t, "utf16le");
  var n = [r, a];
  return Er(n);
}
function sa(e, t, r) {
  var a;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5) return e.read_shift(t, "cpstr");
    if (r.biff >= 12) return e.read_shift(t, "dbcs-cont");
  }
  var n = e.read_shift(1);
  return n === 0 ? a = e.read_shift(t, "sbcs-cont") : a = e.read_shift(t, "dbcs-cont"), a;
}
function dn(e, t, r) {
  var a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return a === 0 ? (e.l++, "") : sa(e, a, r);
}
function da(e, t, r) {
  if (r.biff > 5) return dn(e, t, r);
  var a = e.read_shift(1);
  return a === 0 ? (e.l++, "") : e.read_shift(a, r.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont");
}
function Gf(e, t, r) {
  return r || (r = K(3 + 2 * e.length)), r.write_shift(2, e.length), r.write_shift(1, 1), r.write_shift(31, e, "utf16le"), r;
}
function Fu(e) {
  var t = e.read_shift(1);
  e.l++;
  var r = e.read_shift(2);
  return e.l += 2, [t, r];
}
function yu(e) {
  var t = e.read_shift(4), r = e.l, a = !1;
  t > 24 && (e.l += t - 24, e.read_shift(16) === "795881f43b1d7f48af2c825dc4852763" && (a = !0), e.l = r);
  var n = e.read_shift((a ? t - 24 : t) >> 1, "utf16le").replace(Vr, "");
  return a && (e.l += 24), n;
}
function Au(e) {
  for (var t = e.read_shift(2), r = ""; t-- > 0; ) r += "../";
  var a = e.read_shift(0, "lpstr-ansi");
  if (e.l += 2, e.read_shift(2) != 57005) throw new Error("Bad FileMoniker");
  var n = e.read_shift(4);
  if (n === 0) return r + a.replace(/\\/g, "/");
  var i = e.read_shift(4);
  if (e.read_shift(2) != 3) throw new Error("Bad FileMoniker");
  var s = e.read_shift(i >> 1, "utf16le").replace(Vr, "");
  return r + s;
}
function Cu(e, t) {
  var r = e.read_shift(16);
  switch (r) {
    case "e0c9ea79f9bace118c8200aa004ba90b":
      return yu(e);
    case "0303000000000000c000000000000046":
      return Au(e);
    default:
      throw new Error("Unsupported Moniker " + r);
  }
}
function yn(e) {
  var t = e.read_shift(4), r = t > 0 ? e.read_shift(t, "utf16le").replace(Vr, "") : "";
  return r;
}
function us(e, t) {
  t || (t = K(6 + e.length * 2)), t.write_shift(4, 1 + e.length);
  for (var r = 0; r < e.length; ++r) t.write_shift(2, e.charCodeAt(r));
  return t.write_shift(2, 0), t;
}
function Du(e, t) {
  var r = e.l + t, a = e.read_shift(4);
  if (a !== 2) throw new Error("Unrecognized streamVersion: " + a);
  var n = e.read_shift(2);
  e.l += 2;
  var i, s, f, c, l = "", o, u;
  n & 16 && (i = yn(e, r - e.l)), n & 128 && (s = yn(e, r - e.l)), (n & 257) === 257 && (f = yn(e, r - e.l)), (n & 257) === 1 && (c = Cu(e, r - e.l)), n & 8 && (l = yn(e, r - e.l)), n & 32 && (o = e.read_shift(16)), n & 64 && (u = Q0(
    e
    /*, 8*/
  )), e.l = r;
  var x = s || f || c || "";
  x && l && (x += "#" + l), x || (x = "#" + l), n & 2 && x.charAt(0) == "/" && x.charAt(1) != "/" && (x = "file://" + x);
  var d = { Target: x };
  return o && (d.guid = o), u && (d.time = u), i && (d.Tooltip = i), d;
}
function Iu(e) {
  var t = K(512), r = 0, a = e.Target;
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
    a = a.slice(1), us(a, t);
  else if (i & 2) {
    for (s = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), r = 0; r < s.length; ++r) t.write_shift(1, parseInt(s[r], 16));
    var f = n > -1 ? a.slice(0, n) : a;
    for (t.write_shift(4, 2 * (f.length + 1)), r = 0; r < f.length; ++r) t.write_shift(2, f.charCodeAt(r));
    t.write_shift(2, 0), i & 8 && us(n > -1 ? a.slice(n + 1) : "", t);
  } else {
    for (s = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" "), r = 0; r < s.length; ++r) t.write_shift(1, parseInt(s[r], 16));
    for (var c = 0; a.slice(c * 3, c * 3 + 3) == "../" || a.slice(c * 3, c * 3 + 3) == "..\\"; ) ++c;
    for (t.write_shift(2, c), t.write_shift(4, a.length - 3 * c + 1), r = 0; r < a.length - 3 * c; ++r) t.write_shift(1, a.charCodeAt(r + 3 * c) & 255);
    for (t.write_shift(1, 0), t.write_shift(2, 65535), t.write_shift(2, 57005), r = 0; r < 6; ++r) t.write_shift(4, 0);
  }
  return t.slice(0, t.l);
}
function zf(e) {
  var t = e.read_shift(1), r = e.read_shift(1), a = e.read_shift(1), n = e.read_shift(1);
  return [t, r, a, n];
}
function $f(e, t) {
  var r = zf(e);
  return r[3] = 0, r;
}
function Ft(e) {
  var t = e.read_shift(2), r = e.read_shift(2), a = e.read_shift(2);
  return { r: t, c: r, ixfe: a };
}
function fa(e, t, r, a) {
  return a || (a = K(6)), a.write_shift(2, e), a.write_shift(2, t), a.write_shift(2, r || 0), a;
}
function Ou(e) {
  var t = e.read_shift(2), r = e.read_shift(2);
  return e.l += 8, { type: t, flags: r };
}
function Ru(e, t, r) {
  return t === 0 ? "" : da(e, t, r);
}
function bu(e, t, r) {
  var a = r.biff > 8 ? 4 : 2, n = e.read_shift(a), i = e.read_shift(a, "i"), s = e.read_shift(a, "i");
  return [n, i, s];
}
function Kf(e) {
  var t = e.read_shift(2), r = J0(e);
  return [t, r];
}
function Nu(e, t, r) {
  e.l += 4, t -= 4;
  var a = e.l + t, n = xn(e, t, r), i = e.read_shift(2);
  if (a -= e.l, i !== a) throw new Error("Malformed AddinUdf: padding = " + a + " != " + i);
  return e.l += i, n;
}
function Jn(e) {
  var t = e.read_shift(2), r = e.read_shift(2), a = e.read_shift(2), n = e.read_shift(2);
  return { s: { c: a, r: t }, e: { c: n, r } };
}
function jf(e, t) {
  return t || (t = K(8)), t.write_shift(2, e.s.r), t.write_shift(2, e.e.r), t.write_shift(2, e.s.c), t.write_shift(2, e.e.c), t;
}
function Yf(e) {
  var t = e.read_shift(2), r = e.read_shift(2), a = e.read_shift(1), n = e.read_shift(1);
  return { s: { c: a, r: t }, e: { c: n, r } };
}
var Pu = Yf;
function Jf(e) {
  e.l += 4;
  var t = e.read_shift(2), r = e.read_shift(2), a = e.read_shift(2);
  return e.l += 12, [r, t, a];
}
function Lu(e) {
  var t = {};
  return e.l += 4, e.l += 16, t.fSharedNote = e.read_shift(2), e.l += 4, t;
}
function Bu(e) {
  var t = {};
  return e.l += 4, e.cf = e.read_shift(2), t;
}
function Ir(e) {
  e.l += 2, e.l += e.read_shift(2);
}
var Mu = {
  /*::[*/
  0: Ir,
  /* FtEnd */
  /*::[*/
  4: Ir,
  /* FtMacro */
  /*::[*/
  5: Ir,
  /* FtButton */
  /*::[*/
  6: Ir,
  /* FtGmo */
  /*::[*/
  7: Bu,
  /* FtCf */
  /*::[*/
  8: Ir,
  /* FtPioGrbit */
  /*::[*/
  9: Ir,
  /* FtPictFmla */
  /*::[*/
  10: Ir,
  /* FtCbls */
  /*::[*/
  11: Ir,
  /* FtRbo */
  /*::[*/
  12: Ir,
  /* FtSbs */
  /*::[*/
  13: Lu,
  /* FtNts */
  /*::[*/
  14: Ir,
  /* FtSbsFmla */
  /*::[*/
  15: Ir,
  /* FtGboData */
  /*::[*/
  16: Ir,
  /* FtEdoData */
  /*::[*/
  17: Ir,
  /* FtRboData */
  /*::[*/
  18: Ir,
  /* FtCblsData */
  /*::[*/
  19: Ir,
  /* FtLbsData */
  /*::[*/
  20: Ir,
  /* FtCblsFmla */
  /*::[*/
  21: Jf
};
function Uu(e, t) {
  for (var r = e.l + t, a = []; e.l < r; ) {
    var n = e.read_shift(2);
    e.l -= 2;
    try {
      a.push(Mu[n](e, r - e.l));
    } catch {
      return e.l = r, a;
    }
  }
  return e.l != r && (e.l = r), a;
}
function An(e, t) {
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
function ei(e, t, r) {
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
  var i = K(n);
  return i.write_shift(2, a), i.write_shift(2, t), n > 4 && i.write_shift(2, 29282), n > 6 && i.write_shift(2, 1997), n > 8 && (i.write_shift(2, 49161), i.write_shift(2, 1), i.write_shift(2, 1798), i.write_shift(2, 0)), i;
}
function Wu(e, t) {
  return t === 0 || e.read_shift(2), 1200;
}
function Vu(e, t, r) {
  if (r.enc)
    return e.l += t, "";
  var a = e.l, n = da(e, 0, r);
  return e.read_shift(t + a - e.l), n;
}
function Hu(e, t) {
  var r = !t || t.biff == 8, a = K(r ? 112 : 54);
  for (a.write_shift(t.biff == 8 ? 2 : 1, 7), r && a.write_shift(1, 0), a.write_shift(4, 859007059), a.write_shift(4, 5458548 | (r ? 0 : 536870912)); a.l < a.length; ) a.write_shift(1, r ? 0 : 32);
  return a;
}
function Xu(e, t, r) {
  var a = r && r.biff == 8 || t == 2 ? e.read_shift(2) : (e.l += t, 0);
  return { fDialog: a & 16, fBelow: a & 64, fRight: a & 128 };
}
function Gu(e, t, r) {
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
  var s = xn(e, 0, r);
  return s.length === 0 && (s = "Sheet1"), { pos: a, hs: n, dt: i, name: s };
}
function zu(e, t) {
  var r = !t || t.biff >= 8 ? 2 : 1, a = K(8 + r * e.name.length);
  a.write_shift(4, e.pos), a.write_shift(1, e.hs || 0), a.write_shift(1, e.dt), a.write_shift(1, e.name.length), t.biff >= 8 && a.write_shift(1, 1), a.write_shift(r * e.name.length, e.name, t.biff < 8 ? "sbcs" : "utf16le");
  var n = a.slice(0, a.l);
  return n.l = a.l, n;
}
function $u(e, t) {
  for (var r = e.l + t, a = e.read_shift(4), n = e.read_shift(4), i = [], s = 0; s != n && e.l < r; ++s)
    i.push(Tu(e));
  return i.Count = a, i.Unique = n, i;
}
function Ku(e, t) {
  var r = K(8);
  r.write_shift(4, e.Count), r.write_shift(4, e.Unique);
  for (var a = [], n = 0; n < e.length; ++n) a[n] = Su(e[n]);
  var i = Er([r].concat(a));
  return i.parts = [r.length].concat(a.map(function(s) {
    return s.length;
  })), i;
}
function ju(e, t) {
  var r = {};
  return r.dsst = e.read_shift(2), e.l += t - 2, r;
}
function Yu(e) {
  var t = {};
  t.r = e.read_shift(2), t.c = e.read_shift(2), t.cnt = e.read_shift(2) - t.c;
  var r = e.read_shift(2);
  e.l += 4;
  var a = e.read_shift(1);
  return e.l += 3, a & 7 && (t.level = a & 7), a & 32 && (t.hidden = !0), a & 64 && (t.hpt = r / 20), t;
}
function Ju(e) {
  var t = Ou(e);
  if (t.type != 2211) throw new Error("Invalid Future Record " + t.type);
  var r = e.read_shift(4);
  return r !== 0;
}
function qu(e) {
  return e.read_shift(2), e.read_shift(4);
}
function hs(e, t, r) {
  var a = 0;
  r && r.biff == 2 || (a = e.read_shift(2));
  var n = e.read_shift(2);
  r && r.biff == 2 && (a = 1 - (n >> 15), n &= 32767);
  var i = { Unsynced: a & 1, DyZero: (a & 2) >> 1, ExAsc: (a & 4) >> 2, ExDsc: (a & 8) >> 3 };
  return [i, n];
}
function Zu(e) {
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
function Qu() {
  var e = K(18);
  return e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 29280), e.write_shift(2, 17600), e.write_shift(2, 56), e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 1), e.write_shift(2, 500), e;
}
function eh(e, t, r) {
  if (r && r.biff >= 2 && r.biff < 5) return {};
  var a = e.read_shift(2);
  return { RTL: a & 64 };
}
function rh(e) {
  var t = K(18), r = 1718;
  return e && e.RTL && (r |= 64), t.write_shift(2, r), t.write_shift(4, 0), t.write_shift(4, 64), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
function th() {
}
function ah(e, t, r) {
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
  return a.name = xn(e, 0, r), a;
}
function nh(e, t) {
  var r = e.name || "Arial", a = t && t.biff == 5, n = a ? 15 + r.length : 16 + 2 * r.length, i = K(n);
  return i.write_shift(2, e.sz * 20), i.write_shift(4, 0), i.write_shift(2, 400), i.write_shift(4, 0), i.write_shift(2, 0), i.write_shift(1, r.length), a || i.write_shift(1, 1), i.write_shift((a ? 1 : 2) * r.length, r, a ? "sbcs" : "utf16le"), i;
}
function ih(e) {
  var t = Ft(e);
  return t.isst = e.read_shift(4), t;
}
function sh(e, t, r, a) {
  var n = K(10);
  return fa(e, t, a, n), n.write_shift(4, r), n;
}
function fh(e, t, r) {
  r.biffguess && r.biff == 2 && (r.biff = 5);
  var a = e.l + t, n = Ft(e);
  r.biff == 2 && e.l++;
  var i = dn(e, a - e.l, r);
  return n.val = i, n;
}
function ch(e, t, r, a, n) {
  var i = !n || n.biff == 8, s = K(8 + +i + (1 + i) * r.length);
  return fa(e, t, a, s), s.write_shift(2, r.length), i && s.write_shift(1, 1), s.write_shift((1 + i) * r.length, r, i ? "utf16le" : "sbcs"), s;
}
function lh(e, t, r) {
  var a = e.read_shift(2), n = da(e, 0, r);
  return [a, n];
}
function oh(e, t, r, a) {
  var n = r && r.biff == 5;
  a || (a = K(n ? 3 + t.length : 5 + 2 * t.length)), a.write_shift(2, e), a.write_shift(n ? 1 : 2, t.length), n || a.write_shift(1, 1), a.write_shift((n ? 1 : 2) * t.length, t, n ? "sbcs" : "utf16le");
  var i = a.length > a.l ? a.slice(0, a.l) : a;
  return i.l == null && (i.l = i.length), i;
}
var uh = da;
function xs(e, t, r) {
  var a = e.l + t, n = r.biff == 8 || !r.biff ? 4 : 2, i = e.read_shift(n), s = e.read_shift(n), f = e.read_shift(2), c = e.read_shift(2);
  return e.l = a, { s: { r: i, c: f }, e: { r: s, c } };
}
function hh(e, t) {
  var r = t.biff == 8 || !t.biff ? 4 : 2, a = K(2 * r + 6);
  return a.write_shift(r, e.s.r), a.write_shift(r, e.e.r + 1), a.write_shift(2, e.s.c), a.write_shift(2, e.e.c + 1), a.write_shift(2, 0), a;
}
function xh(e) {
  var t = e.read_shift(2), r = e.read_shift(2), a = Kf(e);
  return { r: t, c: r, ixfe: a[0], rknum: a[1] };
}
function dh(e, t) {
  for (var r = e.l + t - 2, a = e.read_shift(2), n = e.read_shift(2), i = []; e.l < r; ) i.push(Kf(e));
  if (e.l !== r) throw new Error("MulRK read error");
  var s = e.read_shift(2);
  if (i.length != s - n + 1) throw new Error("MulRK length mismatch");
  return { r: a, c: n, C: s, rkrec: i };
}
function vh(e, t) {
  for (var r = e.l + t - 2, a = e.read_shift(2), n = e.read_shift(2), i = []; e.l < r; ) i.push(e.read_shift(2));
  if (e.l !== r) throw new Error("MulBlank read error");
  var s = e.read_shift(2);
  if (i.length != s - n + 1) throw new Error("MulBlank length mismatch");
  return { r: a, c: n, C: s, ixfe: i };
}
function ph(e, t, r, a) {
  var n = {}, i = e.read_shift(4), s = e.read_shift(4), f = e.read_shift(4), c = e.read_shift(2);
  return n.patternType = Jo[f >> 26], a.cellStyles && (n.alc = i & 7, n.fWrap = i >> 3 & 1, n.alcV = i >> 4 & 7, n.fJustLast = i >> 7 & 1, n.trot = i >> 8 & 255, n.cIndent = i >> 16 & 15, n.fShrinkToFit = i >> 20 & 1, n.iReadOrder = i >> 22 & 2, n.fAtrNum = i >> 26 & 1, n.fAtrFnt = i >> 27 & 1, n.fAtrAlc = i >> 28 & 1, n.fAtrBdr = i >> 29 & 1, n.fAtrPat = i >> 30 & 1, n.fAtrProt = i >> 31 & 1, n.dgLeft = s & 15, n.dgRight = s >> 4 & 15, n.dgTop = s >> 8 & 15, n.dgBottom = s >> 12 & 15, n.icvLeft = s >> 16 & 127, n.icvRight = s >> 23 & 127, n.grbitDiag = s >> 30 & 3, n.icvTop = f & 127, n.icvBottom = f >> 7 & 127, n.icvDiag = f >> 14 & 127, n.dgDiag = f >> 21 & 15, n.icvFore = c & 127, n.icvBack = c >> 7 & 127, n.fsxButton = c >> 14 & 1), n;
}
function mh(e, t, r) {
  var a = {};
  return a.ifnt = e.read_shift(2), a.numFmtId = e.read_shift(2), a.flags = e.read_shift(2), a.fStyle = a.flags >> 2 & 1, t -= 6, a.data = ph(e, t, a.fStyle, r), a;
}
function ds(e, t, r, a) {
  var n = r && r.biff == 5;
  a || (a = K(n ? 16 : 20)), a.write_shift(2, 0), e.style ? (a.write_shift(2, e.numFmtId || 0), a.write_shift(2, 65524)) : (a.write_shift(2, e.numFmtId || 0), a.write_shift(2, t << 4));
  var i = 0;
  return e.numFmtId > 0 && n && (i |= 1024), a.write_shift(4, i), a.write_shift(4, 0), n || a.write_shift(4, 0), a.write_shift(2, 0), a;
}
function gh(e) {
  e.l += 4;
  var t = [e.read_shift(2), e.read_shift(2)];
  if (t[0] !== 0 && t[0]--, t[1] !== 0 && t[1]--, t[0] > 7 || t[1] > 7) throw new Error("Bad Gutters: " + t.join("|"));
  return t;
}
function _h(e) {
  var t = K(8);
  return t.write_shift(4, 0), t.write_shift(2, 0), t.write_shift(2, 0), t;
}
function vs(e, t, r) {
  var a = Ft(e);
  (r.biff == 2 || t == 9) && ++e.l;
  var n = Eu(e);
  return a.val = n, a.t = n === !0 || n === !1 ? "b" : "e", a;
}
function wh(e, t, r, a, n, i) {
  var s = K(8);
  return fa(e, t, a, s), Xf(r, i, s), s;
}
function kh(e, t, r) {
  r.biffguess && r.biff == 2 && (r.biff = 5);
  var a = Ft(e), n = Nr(e);
  return a.val = n, a;
}
function Eh(e, t, r, a) {
  var n = K(14);
  return fa(e, t, a, n), ia(r, n), n;
}
var ps = Ru;
function Th(e, t, r) {
  var a = e.l + t, n = e.read_shift(2), i = e.read_shift(2);
  if (r.sbcch = i, i == 1025 || i == 14849) return [i, n];
  if (i < 1 || i > 255) throw new Error("Unexpected SupBook type: " + i);
  for (var s = sa(e, i), f = []; a > e.l; ) f.push(dn(e));
  return [i, n, s, f];
}
function ms(e, t, r) {
  var a = e.read_shift(2), n, i = {
    fBuiltIn: a & 1,
    fWantAdvise: a >>> 1 & 1,
    fWantPict: a >>> 2 & 1,
    fOle: a >>> 3 & 1,
    fOleLink: a >>> 4 & 1,
    cf: a >>> 5 & 1023,
    fIcon: a >>> 15 & 1
  };
  return r.sbcch === 14849 && (n = Nu(e, t - 2, r)), i.body = n || e.read_shift(t - 2), typeof n == "string" && (i.Name = n), i;
}
var Sh = [
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
function gs(e, t, r) {
  var a = e.l + t, n = e.read_shift(2), i = e.read_shift(1), s = e.read_shift(1), f = e.read_shift(r && r.biff == 2 ? 1 : 2), c = 0;
  (!r || r.biff >= 5) && (r.biff != 5 && (e.l += 2), c = e.read_shift(2), r.biff == 5 && (e.l += 2), e.l += 4);
  var l = sa(e, s, r);
  n & 32 && (l = Sh[l.charCodeAt(0)]);
  var o = a - e.l;
  r && r.biff == 2 && --o;
  var u = a == e.l || f === 0 || !(o > 0) ? [] : Uv(e, o, r, f);
  return {
    chKey: i,
    Name: l,
    itab: c,
    rgce: u
  };
}
function qf(e, t, r) {
  if (r.biff < 8) return Fh(e, t, r);
  for (var a = [], n = e.l + t, i = e.read_shift(r.biff > 8 ? 4 : 2); i-- !== 0; ) a.push(bu(e, r.biff > 8 ? 12 : 6, r));
  if (e.l != n) throw new Error("Bad ExternSheet: " + e.l + " != " + n);
  return a;
}
function Fh(e, t, r) {
  e[e.l + 1] == 3 && e[e.l]++;
  var a = xn(e, t, r);
  return a.charCodeAt(0) == 3 ? a.slice(1) : a;
}
function yh(e, t, r) {
  if (r.biff < 8) {
    e.l += t;
    return;
  }
  var a = e.read_shift(2), n = e.read_shift(2), i = sa(e, a, r), s = sa(e, n, r);
  return [i, s];
}
function Ah(e, t, r) {
  var a = Yf(e);
  e.l++;
  var n = e.read_shift(1);
  return t -= 8, [Wv(e, t, r), n, a];
}
function _s(e, t, r) {
  var a = Pu(e);
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
  return [a, Bv(e, t, r)];
}
function Ch(e) {
  var t = e.read_shift(4) !== 0, r = e.read_shift(4) !== 0, a = e.read_shift(4);
  return [t, r, a];
}
function Dh(e, t, r) {
  if (!(r.biff < 8)) {
    var a = e.read_shift(2), n = e.read_shift(2), i = e.read_shift(2), s = e.read_shift(2), f = da(e, 0, r);
    return r.biff < 8 && e.read_shift(1), [{ r: a, c: n }, f, s, i];
  }
}
function Ih(e, t, r) {
  return Dh(e, t, r);
}
function Oh(e, t) {
  for (var r = [], a = e.read_shift(2); a--; ) r.push(Jn(e));
  return r;
}
function Rh(e) {
  var t = K(2 + e.length * 8);
  t.write_shift(2, e.length);
  for (var r = 0; r < e.length; ++r) jf(e[r], t);
  return t;
}
function bh(e, t, r) {
  if (r && r.biff < 8) return Ph(e, t, r);
  var a = Jf(e), n = Uu(e, t - 22, a[1]);
  return { cmo: a, ft: n };
}
var Nh = {
  8: function(e, t) {
    var r = e.l + t;
    e.l += 10;
    var a = e.read_shift(2);
    e.l += 4, e.l += 2, e.l += 2, e.l += 2, e.l += 4;
    var n = e.read_shift(1);
    return e.l += n, e.l = r, { fmt: a };
  }
};
function Ph(e, t, r) {
  e.l += 4;
  var a = e.read_shift(2), n = e.read_shift(2), i = e.read_shift(2);
  e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 6, t -= 36;
  var s = [];
  return s.push((Nh[a] || Lr)(e, t, r)), { cmo: [n, a, i], ft: s };
}
function Lh(e, t, r) {
  var a = e.l, n = "";
  try {
    e.l += 4;
    var i = (r.lastobj || { cmo: [0, 0] }).cmo[1], s;
    [0, 5, 7, 11, 12, 14].indexOf(i) == -1 ? e.l += 6 : s = Fu(e, 6, r);
    var f = e.read_shift(2);
    e.read_shift(2), pr(e, 2);
    var c = e.read_shift(2);
    e.l += c;
    for (var l = 1; l < e.lens.length - 1; ++l) {
      if (e.l - a != e.lens[l]) throw new Error("TxO: bad continue record");
      var o = e[e.l], u = sa(e, e.lens[l + 1] - e.lens[l] - 1);
      if (n += u, n.length >= (o ? f : 2 * f)) break;
    }
    if (n.length !== f && n.length !== f * 2)
      throw new Error("cchText: " + f + " != " + n.length);
    return e.l = a + t, { t: n };
  } catch {
    return e.l = a + t, { t: n };
  }
}
function Bh(e, t) {
  var r = Jn(e);
  e.l += 16;
  var a = Du(e, t - 24);
  return [r, a];
}
function Mh(e) {
  var t = K(24), r = ar(e[0]);
  t.write_shift(2, r.r), t.write_shift(2, r.r), t.write_shift(2, r.c), t.write_shift(2, r.c);
  for (var a = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), n = 0; n < 16; ++n) t.write_shift(1, parseInt(a[n], 16));
  return Er([t, Iu(e[1])]);
}
function Uh(e, t) {
  e.read_shift(2);
  var r = Jn(e), a = e.read_shift((t - 10) / 2, "dbcs-cont");
  return a = a.replace(Vr, ""), [r, a];
}
function Wh(e) {
  var t = e[1].Tooltip, r = K(10 + 2 * (t.length + 1));
  r.write_shift(2, 2048);
  var a = ar(e[0]);
  r.write_shift(2, a.r), r.write_shift(2, a.r), r.write_shift(2, a.c), r.write_shift(2, a.c);
  for (var n = 0; n < t.length; ++n) r.write_shift(2, t.charCodeAt(n));
  return r.write_shift(2, 0), r;
}
function Vh(e) {
  var t = [0, 0], r;
  return r = e.read_shift(2), t[0] = as[r] || r, r = e.read_shift(2), t[1] = as[r] || r, t;
}
function Hh(e) {
  return e || (e = K(4)), e.write_shift(2, 1), e.write_shift(2, 1), e;
}
function Xh(e) {
  for (var t = e.read_shift(2), r = []; t-- > 0; ) r.push($f(e));
  return r;
}
function Gh(e) {
  for (var t = e.read_shift(2), r = []; t-- > 0; ) r.push($f(e));
  return r;
}
function zh(e) {
  e.l += 2;
  var t = { cxfs: 0, crc: 0 };
  return t.cxfs = e.read_shift(2), t.crc = e.read_shift(4), t;
}
function Zf(e, t, r) {
  if (!r.cellStyles) return Lr(e, t);
  var a = r && r.biff >= 12 ? 4 : 2, n = e.read_shift(a), i = e.read_shift(a), s = e.read_shift(a), f = e.read_shift(a), c = e.read_shift(2);
  a == 2 && (e.l += 2);
  var l = { s: n, e: i, w: s, ixfe: f, flags: c };
  return (r.biff >= 5 || !r.biff) && (l.level = c >> 8 & 7), l;
}
function $h(e, t) {
  var r = K(12);
  r.write_shift(2, t), r.write_shift(2, t), r.write_shift(2, e.width * 256), r.write_shift(2, 0);
  var a = 0;
  return e.hidden && (a |= 1), r.write_shift(1, a), a = e.level || 0, r.write_shift(1, a), r.write_shift(2, 0), r;
}
function Kh(e, t) {
  var r = {};
  return t < 32 || (e.l += 16, r.header = Nr(e), r.footer = Nr(e), e.l += 2), r;
}
function jh(e, t, r) {
  var a = { area: !1 };
  if (r.biff != 5)
    return e.l += t, a;
  var n = e.read_shift(1);
  return e.l += 3, n & 16 && (a.area = !0), a;
}
function Yh(e) {
  for (var t = K(2 * e), r = 0; r < e; ++r) t.write_shift(2, r + 1);
  return t;
}
var Jh = Ft, qh = Hf, Zh = dn;
function Qh(e) {
  var t = e.read_shift(2), r = e.read_shift(2), a = e.read_shift(4), n = { fmt: t, env: r, len: a, data: e.slice(e.l, e.l + a) };
  return e.l += a, n;
}
function e1(e, t, r) {
  r.biffguess && r.biff == 5 && (r.biff = 2);
  var a = Ft(e);
  ++e.l;
  var n = da(e, t - 7, r);
  return a.t = "str", a.val = n, a;
}
function r1(e) {
  var t = Ft(e);
  ++e.l;
  var r = Nr(e);
  return t.t = "n", t.val = r, t;
}
function t1(e, t, r) {
  var a = K(15);
  return gn(a, e, t), a.write_shift(8, r, "f"), a;
}
function a1(e) {
  var t = Ft(e);
  ++e.l;
  var r = e.read_shift(2);
  return t.t = "n", t.val = r, t;
}
function n1(e, t, r) {
  var a = K(9);
  return gn(a, e, t), a.write_shift(2, r), a;
}
function i1(e) {
  var t = e.read_shift(1);
  return t === 0 ? (e.l++, "") : e.read_shift(t, "sbcs-cont");
}
function s1(e, t) {
  e.l += 6, e.l += 2, e.l += 1, e.l += 3, e.l += 1, e.l += t - 13;
}
function f1(e, t, r) {
  var a = e.l + t, n = Ft(e), i = e.read_shift(2), s = sa(e, i, r);
  return e.l = a, n.t = "str", n.val = s, n;
}
var c1 = [2, 3, 48, 49, 131, 139, 140, 245], y0 = /* @__PURE__ */ function() {
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
  }, t = Kn({
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
    var l = [], o = Wt(1);
    switch (c.type) {
      case "base64":
        o = Yr(qr(f));
        break;
      case "binary":
        o = Yr(f);
        break;
      case "buffer":
      case "array":
        o = f;
        break;
    }
    Fr(o, 0);
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
    var h = 0, p = 521;
    u == 2 && (h = o.read_shift(2)), o.l += 3, u != 2 && (h = o.read_shift(4)), h > 1048576 && (h = 1e6), u != 2 && (p = o.read_shift(2));
    var k = o.read_shift(2), T = c.codepage || 1252;
    u != 2 && (o.l += 16, o.read_shift(1), o[o.l] !== 0 && (T = e[o[o.l]]), o.l += 1, o.l += 2), v && (o.l += 36);
    for (var g = [], D = {}, N = Math.min(o.length, u == 2 ? 521 : p - 10 - (d ? 264 : 0)), b = v ? 32 : 11; o.l < N && o[o.l] != 13; )
      switch (D = {}, D.name = Ja.utils.decode(T, o.slice(o.l, o.l + b)).replace(/[\u0000\r\n].*$/g, ""), o.l += b, D.type = String.fromCharCode(o.read_shift(1)), u != 2 && !v && (D.offset = o.read_shift(4)), D.len = o.read_shift(1), u == 2 && (D.offset = o.read_shift(2)), D.dec = o.read_shift(1), D.name.length && g.push(D), u != 2 && (o.l += v ? 13 : 14), D.type) {
        case "B":
          (!d || D.len != 8) && c.WTF && console.log("Skipping " + D.name + ":" + D.type);
          break;
        case "G":
        case "P":
          c.WTF && console.log("Skipping " + D.name + ":" + D.type);
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
          throw new Error("Unknown Field Type: " + D.type);
      }
    if (o[o.l] !== 13 && (o.l = p - 1), o.read_shift(1) !== 13) throw new Error("DBF Terminator not found " + o.l + " " + o[o.l]);
    o.l = p;
    var F = 0, B = 0;
    for (l[0] = [], B = 0; B != g.length; ++B) l[0][B] = g[B].name;
    for (; h-- > 0; ) {
      if (o[o.l] === 42) {
        o.l += k;
        continue;
      }
      for (++o.l, l[++F] = [], B = 0, B = 0; B != g.length; ++B) {
        var O = o.slice(o.l, o.l + g[B].len);
        o.l += g[B].len, Fr(O, 0);
        var z = Ja.utils.decode(T, O);
        switch (g[B].type) {
          case "C":
            z.trim().length && (l[F][B] = z.replace(/\s+$/, ""));
            break;
          case "D":
            z.length === 8 ? l[F][B] = new Date(+z.slice(0, 4), +z.slice(4, 6) - 1, +z.slice(6, 8)) : l[F][B] = z;
            break;
          case "F":
            l[F][B] = parseFloat(z.trim());
            break;
          case "+":
          case "I":
            l[F][B] = v ? O.read_shift(-4, "i") ^ 2147483648 : O.read_shift(4, "i");
            break;
          case "L":
            switch (z.trim().toUpperCase()) {
              case "Y":
              case "T":
                l[F][B] = !0;
                break;
              case "N":
              case "F":
                l[F][B] = !1;
                break;
              case "":
              case "?":
                break;
              default:
                throw new Error("DBF Unrecognized L:|" + z + "|");
            }
            break;
          case "M":
            if (!x) throw new Error("DBF Unexpected MEMO for type " + u.toString(16));
            l[F][B] = "##MEMO##" + (v ? parseInt(z.trim(), 10) : O.read_shift(4));
            break;
          case "N":
            z = z.replace(/\u0000/g, "").trim(), z && z != "." && (l[F][B] = +z || 0);
            break;
          case "@":
            l[F][B] = new Date(O.read_shift(-8, "f") - 621356832e5);
            break;
          case "T":
            l[F][B] = new Date((O.read_shift(4) - 2440588) * 864e5 + O.read_shift(4));
            break;
          case "Y":
            l[F][B] = O.read_shift(4, "i") / 1e4 + O.read_shift(4, "i") / 1e4 * Math.pow(2, 32);
            break;
          case "O":
            l[F][B] = -O.read_shift(-8, "f");
            break;
          case "B":
            if (d && g[B].len == 8) {
              l[F][B] = O.read_shift(8, "f");
              break;
            }
          case "G":
          case "P":
            O.l += g[B].len;
            break;
          case "0":
            if (g[B].name === "_NullFlags") break;
          default:
            throw new Error("DBF Unsupported data type " + g[B].type);
        }
      }
    }
    if (u != 2 && o.l < o.length && o[o.l++] != 26) throw new Error("DBF EOF Marker missing " + (o.l - 1) + " of " + o.length + " " + o[o.l - 1].toString(16));
    return c && c.sheetRows && (l = l.slice(0, c.sheetRows)), c.DBF = g, l;
  }
  function a(f, c) {
    var l = c || {};
    l.dateNF || (l.dateNF = "yyyymmdd");
    var o = ba(r(f, l), l);
    return o["!cols"] = l.DBF.map(function(u) {
      return {
        wch: u.len,
        DBF: u
      };
    }), delete l.DBF, o;
  }
  function n(f, c) {
    try {
      return zt(a(f, c), c);
    } catch (l) {
      if (c && c.WTF) throw l;
    }
    return { SheetNames: [], Sheets: {} };
  }
  var i = { B: 8, C: 250, L: 1, D: 8, "?": 0, "": 0 };
  function s(f, c) {
    var l = c || {};
    if (+l.codepage >= 0 && xt(+l.codepage), l.type == "string") throw new Error("Cannot write DBF to JS string");
    var o = Gr(), u = Gn(f, { header: 1, raw: !0, cellDates: !0 }), x = u[0], d = u.slice(1), v = f["!cols"] || [], h = 0, p = 0, k = 0, T = 1;
    for (h = 0; h < x.length; ++h) {
      if (((v[h] || {}).DBF || {}).name) {
        x[h] = v[h].DBF.name, ++k;
        continue;
      }
      if (x[h] != null) {
        if (++k, typeof x[h] == "number" && (x[h] = x[h].toString(10)), typeof x[h] != "string") throw new Error("DBF Invalid column name " + x[h] + " |" + typeof x[h] + "|");
        if (x.indexOf(x[h]) !== h) {
          for (p = 0; p < 1024; ++p)
            if (x.indexOf(x[h] + "_" + p) == -1) {
              x[h] += "_" + p;
              break;
            }
        }
      }
    }
    var g = Ue(f["!ref"]), D = [], N = [], b = [];
    for (h = 0; h <= g.e.c - g.s.c; ++h) {
      var F = "", B = "", O = 0, z = [];
      for (p = 0; p < d.length; ++p)
        d[p][h] != null && z.push(d[p][h]);
      if (z.length == 0 || x[h] == null) {
        D[h] = "?";
        continue;
      }
      for (p = 0; p < z.length; ++p) {
        switch (typeof z[p]) {
          case "number":
            B = "B";
            break;
          case "string":
            B = "C";
            break;
          case "boolean":
            B = "L";
            break;
          case "object":
            B = z[p] instanceof Date ? "D" : "C";
            break;
          default:
            B = "C";
        }
        O = Math.max(O, String(z[p]).length), F = F && F != B ? "C" : B;
      }
      O > 250 && (O = 250), B = ((v[h] || {}).DBF || {}).type, B == "C" && v[h].DBF.len > O && (O = v[h].DBF.len), F == "B" && B == "N" && (F = "N", b[h] = v[h].DBF.dec, O = v[h].DBF.len), N[h] = F == "C" || B == "N" ? O : i[F] || 0, T += N[h], D[h] = F;
    }
    var X = o.next(32);
    for (X.write_shift(4, 318902576), X.write_shift(4, d.length), X.write_shift(2, 296 + 32 * k), X.write_shift(2, T), h = 0; h < 4; ++h) X.write_shift(4, 0);
    for (X.write_shift(4, 0 | (+t[
      /*::String(*/
      Ws
      /*::)*/
    ] || 3) << 8), h = 0, p = 0; h < x.length; ++h)
      if (x[h] != null) {
        var L = o.next(32), te = (x[h].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
        L.write_shift(1, te, "sbcs"), L.write_shift(1, D[h] == "?" ? "C" : D[h], "sbcs"), L.write_shift(4, p), L.write_shift(1, N[h] || i[D[h]] || 0), L.write_shift(1, b[h] || 0), L.write_shift(1, 2), L.write_shift(4, 0), L.write_shift(1, 0), L.write_shift(4, 0), L.write_shift(4, 0), p += N[h] || i[D[h]] || 0;
      }
    var pe = o.next(264);
    for (pe.write_shift(4, 13), h = 0; h < 65; ++h) pe.write_shift(4, 0);
    for (h = 0; h < d.length; ++h) {
      var oe = o.next(T);
      for (oe.write_shift(1, 0), p = 0; p < x.length; ++p)
        if (x[p] != null)
          switch (D[p]) {
            case "L":
              oe.write_shift(1, d[h][p] == null ? 63 : d[h][p] ? 84 : 70);
              break;
            case "B":
              oe.write_shift(8, d[h][p] || 0, "f");
              break;
            case "N":
              var de = "0";
              for (typeof d[h][p] == "number" && (de = d[h][p].toFixed(b[p] || 0)), k = 0; k < N[p] - de.length; ++k) oe.write_shift(1, 32);
              oe.write_shift(1, de, "sbcs");
              break;
            case "D":
              d[h][p] ? (oe.write_shift(4, ("0000" + d[h][p].getFullYear()).slice(-4), "sbcs"), oe.write_shift(2, ("00" + (d[h][p].getMonth() + 1)).slice(-2), "sbcs"), oe.write_shift(2, ("00" + d[h][p].getDate()).slice(-2), "sbcs")) : oe.write_shift(8, "00000000", "sbcs");
              break;
            case "C":
              var ve = String(d[h][p] != null ? d[h][p] : "").slice(0, N[p]);
              for (oe.write_shift(1, ve, "sbcs"), k = 0; k < N[p] - ve.length; ++k) oe.write_shift(1, 32);
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
}(), Qf = /* @__PURE__ */ function() {
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
  }, t = new RegExp("\x1BN(" + sr(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm"), r = function(x, d) {
    var v = e[d];
    return typeof v == "number" ? Ii(v) : v;
  }, a = function(x, d, v) {
    var h = d.charCodeAt(0) - 32 << 4 | v.charCodeAt(0) - 48;
    return h == 59 ? x : Ii(h);
  };
  e["|"] = 254;
  function n(x, d) {
    switch (d.type) {
      case "base64":
        return i(qr(x), d);
      case "binary":
        return i(x, d);
      case "buffer":
        return i(Ne && Buffer.isBuffer(x) ? x.toString("binary") : Gt(x), d);
      case "array":
        return i(na(x), d);
    }
    throw new Error("Unrecognized type " + d.type);
  }
  function i(x, d) {
    var v = x.split(/[\n\r]+/), h = -1, p = -1, k = 0, T = 0, g = [], D = [], N = null, b = {}, F = [], B = [], O = [], z = 0, X;
    for (+d.codepage >= 0 && xt(+d.codepage); k !== v.length; ++k) {
      z = 0;
      var L = v[k].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, a).replace(t, r), te = L.replace(/;;/g, "\0").split(";").map(function(R) {
        return R.replace(/\u0000/g, ";");
      }), pe = te[0], oe;
      if (L.length > 0) switch (pe) {
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
          te[1].charAt(0) == "P" && D.push(L.slice(3).replace(/;;/g, ";"));
          break;
        case "C":
          var de = !1, ve = !1, Ie = !1, U = !1, Ee = -1, Se = -1;
          for (T = 1; T < te.length; ++T) switch (te[T].charAt(0)) {
            case "A":
              break;
            case "X":
              p = parseInt(te[T].slice(1)) - 1, ve = !0;
              break;
            case "Y":
              for (h = parseInt(te[T].slice(1)) - 1, ve || (p = 0), X = g.length; X <= h; ++X) g[X] = [];
              break;
            case "K":
              oe = te[T].slice(1), oe.charAt(0) === '"' ? oe = oe.slice(1, oe.length - 1) : oe === "TRUE" ? oe = !0 : oe === "FALSE" ? oe = !1 : isNaN(vt(oe)) ? isNaN(Ca(oe).getDate()) || (oe = qe(oe)) : (oe = vt(oe), N !== null && Oa(N) && (oe = Yn(oe))), de = !0;
              break;
            case "E":
              U = !0;
              var C = ya(te[T].slice(1), { r: h, c: p });
              g[h][p] = [g[h][p], C];
              break;
            case "S":
              Ie = !0, g[h][p] = [g[h][p], "S5S"];
              break;
            case "G":
              break;
            case "R":
              Ee = parseInt(te[T].slice(1)) - 1;
              break;
            case "C":
              Se = parseInt(te[T].slice(1)) - 1;
              break;
            default:
              if (d && d.WTF) throw new Error("SYLK bad record " + L);
          }
          if (de && (g[h][p] && g[h][p].length == 2 ? g[h][p][0] = oe : g[h][p] = oe, N = null), Ie) {
            if (U) throw new Error("SYLK shared formula cannot have own formula");
            var P = Ee > -1 && g[Ee][Se];
            if (!P || !P[1]) throw new Error("SYLK shared formula cannot find base");
            g[h][p][1] = mc(P[1], { r: h - Ee, c: p - Se });
          }
          break;
        case "F":
          var I = 0;
          for (T = 1; T < te.length; ++T) switch (te[T].charAt(0)) {
            case "X":
              p = parseInt(te[T].slice(1)) - 1, ++I;
              break;
            case "Y":
              for (h = parseInt(te[T].slice(1)) - 1, X = g.length; X <= h; ++X) g[X] = [];
              break;
            case "M":
              z = parseInt(te[T].slice(1)) / 20;
              break;
            case "F":
              break;
            case "G":
              break;
            case "P":
              N = D[parseInt(te[T].slice(1))];
              break;
            case "S":
              break;
            case "D":
              break;
            case "N":
              break;
            case "W":
              for (O = te[T].slice(1).split(" "), X = parseInt(O[0], 10); X <= parseInt(O[1], 10); ++X)
                z = parseInt(O[2], 10), B[X - 1] = z === 0 ? { hidden: !0 } : { wch: z }, Vt(B[X - 1]);
              break;
            case "C":
              p = parseInt(te[T].slice(1)) - 1, B[p] || (B[p] = {});
              break;
            case "R":
              h = parseInt(te[T].slice(1)) - 1, F[h] || (F[h] = {}), z > 0 ? (F[h].hpt = z, F[h].hpx = Ia(z)) : z === 0 && (F[h].hidden = !0);
              break;
            default:
              if (d && d.WTF) throw new Error("SYLK bad record " + L);
          }
          I < 1 && (N = null);
          break;
        default:
          if (d && d.WTF) throw new Error("SYLK bad record " + L);
      }
    }
    return F.length > 0 && (b["!rows"] = F), B.length > 0 && (b["!cols"] = B), d && d.sheetRows && (g = g.slice(0, d.sheetRows)), [g, b];
  }
  function s(x, d) {
    var v = n(x, d), h = v[0], p = v[1], k = ba(h, d);
    return sr(p).forEach(function(T) {
      k[T] = p[T];
    }), k;
  }
  function f(x, d) {
    return zt(s(x, d), d);
  }
  function c(x, d, v, h) {
    var p = "C;Y" + (v + 1) + ";X" + (h + 1) + ";K";
    switch (x.t) {
      case "n":
        p += x.v || 0, x.f && !x.F && (p += ";E" + si(x.f, { r: v, c: h }));
        break;
      case "b":
        p += x.v ? "TRUE" : "FALSE";
        break;
      case "e":
        p += x.w || x.v;
        break;
      case "d":
        p += '"' + (x.w || x.v) + '"';
        break;
      case "s":
        p += '"' + x.v.replace(/"/g, "").replace(/;/g, ";;") + '"';
        break;
    }
    return p;
  }
  function l(x, d) {
    d.forEach(function(v, h) {
      var p = "F;W" + (h + 1) + " " + (h + 1) + " ";
      v.hidden ? p += "0" : (typeof v.width == "number" && !v.wpx && (v.wpx = nn(v.width)), typeof v.wpx == "number" && !v.wch && (v.wch = sn(v.wpx)), typeof v.wch == "number" && (p += Math.round(v.wch))), p.charAt(p.length - 1) != " " && x.push(p);
    });
  }
  function o(x, d) {
    d.forEach(function(v, h) {
      var p = "F;";
      v.hidden ? p += "M0;" : v.hpt ? p += "M" + 20 * v.hpt + ";" : v.hpx && (p += "M" + 20 * fn(v.hpx) + ";"), p.length > 2 && x.push(p + "R" + (h + 1));
    });
  }
  function u(x, d) {
    var v = ["ID;PWXL;N;E"], h = [], p = Ue(x["!ref"]), k, T = Array.isArray(x), g = `\r
`;
    v.push("P;PGeneral"), v.push("F;P0;DG0G8;M255"), x["!cols"] && l(v, x["!cols"]), x["!rows"] && o(v, x["!rows"]), v.push("B;Y" + (p.e.r - p.s.r + 1) + ";X" + (p.e.c - p.s.c + 1) + ";D" + [p.s.c, p.s.r, p.e.c, p.e.r].join(" "));
    for (var D = p.s.r; D <= p.e.r; ++D)
      for (var N = p.s.c; N <= p.e.c; ++N) {
        var b = Fe({ r: D, c: N });
        k = T ? (x[D] || [])[N] : x[b], !(!k || k.v == null && (!k.f || k.F)) && h.push(c(k, x, D, N));
      }
    return v.join(g) + g + h.join(g) + g + "E" + g;
  }
  return {
    to_workbook: f,
    to_sheet: s,
    from_sheet: u
  };
}(), ec = /* @__PURE__ */ function() {
  function e(i, s) {
    switch (s.type) {
      case "base64":
        return t(qr(i), s);
      case "binary":
        return t(i, s);
      case "buffer":
        return t(Ne && Buffer.isBuffer(i) ? i.toString("binary") : Gt(i), s);
      case "array":
        return t(na(i), s);
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
            h === "TRUE" ? u[c][l] = !0 : h === "FALSE" ? u[c][l] = !1 : isNaN(vt(v)) ? isNaN(Ca(v).getDate()) ? u[c][l] = v : u[c][l] = qe(v) : u[c][l] = vt(v), ++l;
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
    return ba(e(i, s), s);
  }
  function a(i, s) {
    return zt(r(i, s), s);
  }
  var n = /* @__PURE__ */ function() {
    var i = function(c, l, o, u, x) {
      c.push(l), c.push(o + "," + u), c.push('"' + x.replace(/"/g, '""') + '"');
    }, s = function(c, l, o, u) {
      c.push(l + "," + o), c.push(l == 1 ? '"' + u.replace(/"/g, '""') + '"' : u);
    };
    return function(c) {
      var l = [], o = Ue(c["!ref"]), u, x = Array.isArray(c);
      i(l, "TABLE", 0, 1, "sheetjs"), i(l, "VECTORS", 0, o.e.r - o.s.r + 1, ""), i(l, "TUPLES", 0, o.e.c - o.s.c + 1, ""), i(l, "DATA", 0, 0, "");
      for (var d = o.s.r; d <= o.e.r; ++d) {
        s(l, -1, 0, "BOT");
        for (var v = o.s.c; v <= o.e.c; ++v) {
          var h = Fe({ r: d, c: v });
          if (u = x ? (c[d] || [])[v] : c[h], !u) {
            s(l, 1, 0, "");
            continue;
          }
          switch (u.t) {
            case "n":
              var p = u.w;
              !p && u.v != null && (p = u.v), p == null ? u.f && !u.F ? s(l, 1, 0, "=" + u.f) : s(l, 1, 0, "") : s(l, 0, p, "V");
              break;
            case "b":
              s(l, 0, u.v ? 1 : 0, u.v ? "TRUE" : "FALSE");
              break;
            case "s":
              s(l, 1, 0, isNaN(u.v) ? u.v : '="' + u.v + '"');
              break;
            case "d":
              u.w || (u.w = ft(u.z || Te[14], wr(qe(u.v)))), s(l, 0, u.w, "V");
              break;
            default:
              s(l, 1, 0, "");
          }
        }
      }
      s(l, -1, 0, "EOD");
      var k = `\r
`, T = l.join(k);
      return T;
    };
  }();
  return {
    to_workbook: a,
    to_sheet: r,
    from_sheet: n
  };
}(), rc = /* @__PURE__ */ function() {
  function e(u) {
    return u.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, `
`);
  }
  function t(u) {
    return u.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n");
  }
  function r(u, x) {
    for (var d = u.split(`
`), v = -1, h = -1, p = 0, k = []; p !== d.length; ++p) {
      var T = d[p].trim().split(":");
      if (T[0] === "cell") {
        var g = ar(T[1]);
        if (k.length <= g.r) for (v = k.length; v <= g.r; ++v) k[v] || (k[v] = []);
        switch (v = g.r, h = g.c, T[2]) {
          case "t":
            k[v][h] = e(T[3]);
            break;
          case "v":
            k[v][h] = +T[3];
            break;
          case "vtf":
            var D = T[T.length - 1];
          case "vtc":
            switch (T[3]) {
              case "nl":
                k[v][h] = !!+T[4];
                break;
              default:
                k[v][h] = +T[4];
                break;
            }
            T[2] == "vtf" && (k[v][h] = [k[v][h], D]);
        }
      }
    }
    return x && x.sheetRows && (k = k.slice(0, x.sheetRows)), k;
  }
  function a(u, x) {
    return ba(r(u, x), x);
  }
  function n(u, x) {
    return zt(a(u, x), x);
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
    for (var x = [], d = [], v, h = "", p = zr(u["!ref"]), k = Array.isArray(u), T = p.s.r; T <= p.e.r; ++T)
      for (var g = p.s.c; g <= p.e.c; ++g)
        if (h = Fe({ r: T, c: g }), v = k ? (u[T] || [])[g] : u[h], !(!v || v.v == null || v.t === "z")) {
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
              var D = wr(qe(v.v));
              d[2] = "vtc", d[3] = "nd", d[4] = "" + D, d[5] = v.w || ft(v.z || Te[14], D);
              break;
            case "e":
              continue;
          }
          x.push(d.join(":"));
        }
    return x.push("sheet:c:" + (p.e.c - p.s.c + 1) + ":r:" + (p.e.r - p.s.r + 1) + ":tvf:1"), x.push("valueformat:1:text-wiki"), x.join(`
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
}(), Da = /* @__PURE__ */ function() {
  function e(o, u, x, d, v) {
    v.raw ? u[x][d] = o : o === "" || (o === "TRUE" ? u[x][d] = !0 : o === "FALSE" ? u[x][d] = !1 : isNaN(vt(o)) ? isNaN(Ca(o).getDate()) ? u[x][d] = o : u[x][d] = qe(o) : u[x][d] = vt(o));
  }
  function t(o, u) {
    var x = u || {}, d = [];
    if (!o || o.length === 0) return d;
    for (var v = o.split(/[\r\n]/), h = v.length - 1; h >= 0 && v[h].length === 0; ) --h;
    for (var p = 10, k = 0, T = 0; T <= h; ++T)
      k = v[T].indexOf(" "), k == -1 ? k = v[T].length : k++, p = Math.max(p, k);
    for (T = 0; T <= h; ++T) {
      d[T] = [];
      var g = 0;
      for (e(v[T].slice(0, p).trim(), d, T, g, x), g = 1; g <= (v[T].length - p) / 10 + 1; ++g)
        e(v[T].slice(p + (g - 1) * 10, p + g * 10).trim(), d, T, g, x);
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
    return v.sort(function(h, p) {
      return h[0] - p[0] || a[h[1]] - a[p[1]];
    }), r[v.pop()[1]] || 44;
  }
  function i(o, u) {
    var x = u || {}, d = "", v = x.dense ? [] : {}, h = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    o.slice(0, 4) == "sep=" ? o.charCodeAt(5) == 13 && o.charCodeAt(6) == 10 ? (d = o.charAt(4), o = o.slice(7)) : o.charCodeAt(5) == 13 || o.charCodeAt(5) == 10 ? (d = o.charAt(4), o = o.slice(6)) : d = n(o.slice(0, 1024)) : x && x.FS ? d = x.FS : d = n(o.slice(0, 1024));
    var p = 0, k = 0, T = 0, g = 0, D = 0, N = d.charCodeAt(0), b = !1, F = 0, B = o.charCodeAt(0);
    o = o.replace(/\r\n/mg, `
`);
    var O = x.dateNF != null ? Kl(x.dateNF) : null;
    function z() {
      var X = o.slice(g, D), L = {};
      if (X.charAt(0) == '"' && X.charAt(X.length - 1) == '"' && (X = X.slice(1, -1).replace(/""/g, '"')), X.length === 0) L.t = "z";
      else if (x.raw)
        L.t = "s", L.v = X;
      else if (X.trim().length === 0)
        L.t = "s", L.v = X;
      else if (X.charCodeAt(0) == 61)
        X.charCodeAt(1) == 34 && X.charCodeAt(X.length - 1) == 34 ? (L.t = "s", L.v = X.slice(2, -1).replace(/""/g, '"')) : Td(X) ? (L.t = "n", L.f = X.slice(1)) : (L.t = "s", L.v = X);
      else if (X == "TRUE")
        L.t = "b", L.v = !0;
      else if (X == "FALSE")
        L.t = "b", L.v = !1;
      else if (!isNaN(T = vt(X)))
        L.t = "n", x.cellText !== !1 && (L.w = X), L.v = T;
      else if (!isNaN(Ca(X).getDate()) || O && X.match(O)) {
        L.z = x.dateNF || Te[14];
        var te = 0;
        O && X.match(O) && (X = jl(X, x.dateNF, X.match(O) || []), te = 1), x.cellDates ? (L.t = "d", L.v = qe(X, te)) : (L.t = "n", L.v = wr(qe(X, te))), x.cellText !== !1 && (L.w = ft(L.z, L.v instanceof Date ? wr(L.v) : L.v)), x.cellNF || delete L.z;
      } else
        L.t = "s", L.v = X;
      if (L.t == "z" || (x.dense ? (v[p] || (v[p] = []), v[p][k] = L) : v[Fe({ c: k, r: p })] = L), g = D + 1, B = o.charCodeAt(g), h.e.c < k && (h.e.c = k), h.e.r < p && (h.e.r = p), F == N) ++k;
      else if (k = 0, ++p, x.sheetRows && x.sheetRows <= p) return !0;
    }
    e: for (; D < o.length; ++D) switch (F = o.charCodeAt(D)) {
      case 34:
        B === 34 && (b = !b);
        break;
      case N:
      case 10:
      case 13:
        if (!b && z()) break e;
        break;
    }
    return D - g > 0 && z(), v["!ref"] = De(h), v;
  }
  function s(o, u) {
    return !(u && u.PRN) || u.FS || o.slice(0, 4) == "sep=" || o.indexOf("	") >= 0 || o.indexOf(",") >= 0 || o.indexOf(";") >= 0 ? i(o, u) : ba(t(o, u), u);
  }
  function f(o, u) {
    var x = "", d = u.type == "string" ? [0, 0, 0, 0] : di(o, u);
    switch (u.type) {
      case "base64":
        x = qr(o);
        break;
      case "binary":
        x = o;
        break;
      case "buffer":
        u.codepage == 65001 ? x = o.toString("utf8") : u.codepage && typeof Ja < "u" || (x = Ne && Buffer.isBuffer(o) ? o.toString("binary") : Gt(o));
        break;
      case "array":
        x = na(o);
        break;
      case "string":
        x = o;
        break;
      default:
        throw new Error("Unrecognized type " + u.type);
    }
    return d[0] == 239 && d[1] == 187 && d[2] == 191 ? x = ze(x.slice(3)) : u.type != "string" && u.type != "buffer" && u.codepage == 65001 ? x = ze(x) : u.type == "binary" && typeof Ja < "u", x.slice(0, 19) == "socialcalc:version:" ? rc.to_sheet(u.type == "string" ? x : ze(x), u) : s(x, u);
  }
  function c(o, u) {
    return zt(f(o, u), u);
  }
  function l(o) {
    for (var u = [], x = Ue(o["!ref"]), d, v = Array.isArray(o), h = x.s.r; h <= x.e.r; ++h) {
      for (var p = [], k = x.s.c; k <= x.e.c; ++k) {
        var T = Fe({ r: h, c: k });
        if (d = v ? (o[h] || [])[k] : o[T], !d || d.v == null) {
          p.push("          ");
          continue;
        }
        for (var g = (d.w || (Ot(d), d.w) || "").slice(0, 10); g.length < 10; ) g += " ";
        p.push(g + (k === 0 ? " " : ""));
      }
      u.push(p.join(""));
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
function l1(e, t) {
  var r = t || {}, a = !!r.WTF;
  r.WTF = !0;
  try {
    var n = Qf.to_workbook(e, r);
    return r.WTF = a, n;
  } catch (i) {
    if (r.WTF = a, !i.message.match(/SYLK bad record ID/) && a) throw i;
    return Da.to_workbook(e, t);
  }
}
var ra = /* @__PURE__ */ function() {
  function e(C, P, I) {
    if (C) {
      Fr(C, C.l || 0);
      for (var R = I.Enum || Ee; C.l < C.length; ) {
        var Y = C.read_shift(2), fe = R[Y] || R[65535], ce = C.read_shift(2), ie = C.l + ce, ne = fe.f && fe.f(C, ce, I);
        if (C.l = ie, P(ne, fe, Y)) return;
      }
    }
  }
  function t(C, P) {
    switch (P.type) {
      case "base64":
        return r(Yr(qr(C)), P);
      case "binary":
        return r(Yr(C), P);
      case "buffer":
      case "array":
        return r(C, P);
    }
    throw "Unsupported type " + P.type;
  }
  function r(C, P) {
    if (!C) return C;
    var I = P || {}, R = I.dense ? [] : {}, Y = "Sheet1", fe = "", ce = 0, ie = {}, ne = [], Ae = [], A = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, $e = I.sheetRows || 0;
    if (C[2] == 0 && (C[3] == 8 || C[3] == 9) && C.length >= 16 && C[14] == 5 && C[15] === 108)
      throw new Error("Unsupported Works 3 for Mac file");
    if (C[2] == 2)
      I.Enum = Ee, e(C, function(Z, ke, We) {
        switch (We) {
          case 0:
            I.vers = Z, Z >= 4096 && (I.qpro = !0);
            break;
          case 6:
            A = Z;
            break;
          case 204:
            Z && (fe = Z);
            break;
          case 222:
            fe = Z;
            break;
          case 15:
          case 51:
            I.qpro || (Z[1].v = Z[1].v.slice(1));
          case 13:
          case 14:
          case 16:
            We == 14 && (Z[2] & 112) == 112 && (Z[2] & 15) > 1 && (Z[2] & 15) < 15 && (Z[1].z = I.dateNF || Te[14], I.cellDates && (Z[1].t = "d", Z[1].v = Yn(Z[1].v))), I.qpro && Z[3] > ce && (R["!ref"] = De(A), ie[Y] = R, ne.push(Y), R = I.dense ? [] : {}, A = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, ce = Z[3], Y = fe || "Sheet" + (ce + 1), fe = "");
            var _e = I.dense ? (R[Z[0].r] || [])[Z[0].c] : R[Fe(Z[0])];
            if (_e) {
              _e.t = Z[1].t, _e.v = Z[1].v, Z[1].z != null && (_e.z = Z[1].z), Z[1].f != null && (_e.f = Z[1].f);
              break;
            }
            I.dense ? (R[Z[0].r] || (R[Z[0].r] = []), R[Z[0].r][Z[0].c] = Z[1]) : R[Fe(Z[0])] = Z[1];
            break;
        }
      }, I);
    else if (C[2] == 26 || C[2] == 14)
      I.Enum = Se, C[2] == 14 && (I.qpro = !0, C.l = 0), e(C, function(Z, ke, We) {
        switch (We) {
          case 204:
            Y = Z;
            break;
          case 22:
            Z[1].v = Z[1].v.slice(1);
          case 23:
          case 24:
          case 25:
          case 37:
          case 39:
          case 40:
            if (Z[3] > ce && (R["!ref"] = De(A), ie[Y] = R, ne.push(Y), R = I.dense ? [] : {}, A = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, ce = Z[3], Y = "Sheet" + (ce + 1)), $e > 0 && Z[0].r >= $e) break;
            I.dense ? (R[Z[0].r] || (R[Z[0].r] = []), R[Z[0].r][Z[0].c] = Z[1]) : R[Fe(Z[0])] = Z[1], A.e.c < Z[0].c && (A.e.c = Z[0].c), A.e.r < Z[0].r && (A.e.r = Z[0].r);
            break;
          case 27:
            Z[14e3] && (Ae[Z[14e3][0]] = Z[14e3][1]);
            break;
          case 1537:
            Ae[Z[0]] = Z[1], Z[0] == ce && (Y = Z[1]);
            break;
        }
      }, I);
    else throw new Error("Unrecognized LOTUS BOF " + C[2]);
    if (R["!ref"] = De(A), ie[fe || Y] = R, ne.push(fe || Y), !Ae.length) return { SheetNames: ne, Sheets: ie };
    for (var Pe = {}, re = [], G = 0; G < Ae.length; ++G) ie[ne[G]] ? (re.push(Ae[G] || ne[G]), Pe[Ae[G]] = ie[Ae[G]] || ie[ne[G]]) : (re.push(Ae[G]), Pe[Ae[G]] = { "!ref": "A1" });
    return { SheetNames: re, Sheets: Pe };
  }
  function a(C, P) {
    var I = P || {};
    if (+I.codepage >= 0 && xt(+I.codepage), I.type == "string") throw new Error("Cannot write WK1 to JS string");
    var R = Gr(), Y = Ue(C["!ref"]), fe = Array.isArray(C), ce = [];
    he(R, 0, i(1030)), he(R, 6, c(Y));
    for (var ie = Math.min(Y.e.r, 8191), ne = Y.s.r; ne <= ie; ++ne)
      for (var Ae = or(ne), A = Y.s.c; A <= Y.e.c; ++A) {
        ne === Y.s.r && (ce[A] = tr(A));
        var $e = ce[A] + Ae, Pe = fe ? (C[ne] || [])[A] : C[$e];
        if (!(!Pe || Pe.t == "z"))
          if (Pe.t == "n")
            (Pe.v | 0) == Pe.v && Pe.v >= -32768 && Pe.v <= 32767 ? he(R, 13, d(ne, A, Pe.v)) : he(R, 14, h(ne, A, Pe.v));
          else {
            var re = Ot(Pe);
            he(R, 15, u(ne, A, re.slice(0, 239)));
          }
      }
    return he(R, 1), R.end();
  }
  function n(C, P) {
    var I = P || {};
    if (+I.codepage >= 0 && xt(+I.codepage), I.type == "string") throw new Error("Cannot write WK3 to JS string");
    var R = Gr();
    he(R, 0, s(C));
    for (var Y = 0, fe = 0; Y < C.SheetNames.length; ++Y) (C.Sheets[C.SheetNames[Y]] || {})["!ref"] && he(R, 27, U(C.SheetNames[Y], fe++));
    var ce = 0;
    for (Y = 0; Y < C.SheetNames.length; ++Y) {
      var ie = C.Sheets[C.SheetNames[Y]];
      if (!(!ie || !ie["!ref"])) {
        for (var ne = Ue(ie["!ref"]), Ae = Array.isArray(ie), A = [], $e = Math.min(ne.e.r, 8191), Pe = ne.s.r; Pe <= $e; ++Pe)
          for (var re = or(Pe), G = ne.s.c; G <= ne.e.c; ++G) {
            Pe === ne.s.r && (A[G] = tr(G));
            var Z = A[G] + re, ke = Ae ? (ie[Pe] || [])[G] : ie[Z];
            if (!(!ke || ke.t == "z"))
              if (ke.t == "n")
                he(R, 23, z(Pe, G, ce, ke.v));
              else {
                var We = Ot(ke);
                he(R, 22, F(Pe, G, ce, We.slice(0, 239)));
              }
          }
        ++ce;
      }
    }
    return he(R, 1), R.end();
  }
  function i(C) {
    var P = K(2);
    return P.write_shift(2, C), P;
  }
  function s(C) {
    var P = K(26);
    P.write_shift(2, 4096), P.write_shift(2, 4), P.write_shift(4, 0);
    for (var I = 0, R = 0, Y = 0, fe = 0; fe < C.SheetNames.length; ++fe) {
      var ce = C.SheetNames[fe], ie = C.Sheets[ce];
      if (!(!ie || !ie["!ref"])) {
        ++Y;
        var ne = zr(ie["!ref"]);
        I < ne.e.r && (I = ne.e.r), R < ne.e.c && (R = ne.e.c);
      }
    }
    return I > 8191 && (I = 8191), P.write_shift(2, I), P.write_shift(1, Y), P.write_shift(1, R), P.write_shift(2, 0), P.write_shift(2, 0), P.write_shift(1, 1), P.write_shift(1, 2), P.write_shift(4, 0), P.write_shift(4, 0), P;
  }
  function f(C, P, I) {
    var R = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    return P == 8 && I.qpro ? (R.s.c = C.read_shift(1), C.l++, R.s.r = C.read_shift(2), R.e.c = C.read_shift(1), C.l++, R.e.r = C.read_shift(2), R) : (R.s.c = C.read_shift(2), R.s.r = C.read_shift(2), P == 12 && I.qpro && (C.l += 2), R.e.c = C.read_shift(2), R.e.r = C.read_shift(2), P == 12 && I.qpro && (C.l += 2), R.s.c == 65535 && (R.s.c = R.e.c = R.s.r = R.e.r = 0), R);
  }
  function c(C) {
    var P = K(8);
    return P.write_shift(2, C.s.c), P.write_shift(2, C.s.r), P.write_shift(2, C.e.c), P.write_shift(2, C.e.r), P;
  }
  function l(C, P, I) {
    var R = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0, 0];
    return I.qpro && I.vers != 20768 ? (R[0].c = C.read_shift(1), R[3] = C.read_shift(1), R[0].r = C.read_shift(2), C.l += 2) : (R[2] = C.read_shift(1), R[0].c = C.read_shift(2), R[0].r = C.read_shift(2)), R;
  }
  function o(C, P, I) {
    var R = C.l + P, Y = l(C, P, I);
    if (Y[1].t = "s", I.vers == 20768) {
      C.l++;
      var fe = C.read_shift(1);
      return Y[1].v = C.read_shift(fe, "utf8"), Y;
    }
    return I.qpro && C.l++, Y[1].v = C.read_shift(R - C.l, "cstr"), Y;
  }
  function u(C, P, I) {
    var R = K(7 + I.length);
    R.write_shift(1, 255), R.write_shift(2, P), R.write_shift(2, C), R.write_shift(1, 39);
    for (var Y = 0; Y < R.length; ++Y) {
      var fe = I.charCodeAt(Y);
      R.write_shift(1, fe >= 128 ? 95 : fe);
    }
    return R.write_shift(1, 0), R;
  }
  function x(C, P, I) {
    var R = l(C, P, I);
    return R[1].v = C.read_shift(2, "i"), R;
  }
  function d(C, P, I) {
    var R = K(7);
    return R.write_shift(1, 255), R.write_shift(2, P), R.write_shift(2, C), R.write_shift(2, I, "i"), R;
  }
  function v(C, P, I) {
    var R = l(C, P, I);
    return R[1].v = C.read_shift(8, "f"), R;
  }
  function h(C, P, I) {
    var R = K(13);
    return R.write_shift(1, 255), R.write_shift(2, P), R.write_shift(2, C), R.write_shift(8, I, "f"), R;
  }
  function p(C, P, I) {
    var R = C.l + P, Y = l(C, P, I);
    if (Y[1].v = C.read_shift(8, "f"), I.qpro) C.l = R;
    else {
      var fe = C.read_shift(2);
      D(C.slice(C.l, C.l + fe), Y), C.l += fe;
    }
    return Y;
  }
  function k(C, P, I) {
    var R = P & 32768;
    return P &= -32769, P = (R ? C : 0) + (P >= 8192 ? P - 16384 : P), (R ? "" : "$") + (I ? tr(P) : or(P));
  }
  var T = {
    51: ["FALSE", 0],
    52: ["TRUE", 0],
    70: ["LEN", 1],
    80: ["SUM", 69],
    81: ["AVERAGEA", 69],
    82: ["COUNTA", 69],
    83: ["MINA", 69],
    84: ["MAXA", 69],
    111: ["T", 1]
  }, g = [
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
  function D(C, P) {
    Fr(C, 0);
    for (var I = [], R = 0, Y = "", fe = "", ce = "", ie = ""; C.l < C.length; ) {
      var ne = C[C.l++];
      switch (ne) {
        case 0:
          I.push(C.read_shift(8, "f"));
          break;
        case 1:
          fe = k(P[0].c, C.read_shift(2), !0), Y = k(P[0].r, C.read_shift(2), !1), I.push(fe + Y);
          break;
        case 2:
          {
            var Ae = k(P[0].c, C.read_shift(2), !0), A = k(P[0].r, C.read_shift(2), !1);
            fe = k(P[0].c, C.read_shift(2), !0), Y = k(P[0].r, C.read_shift(2), !1), I.push(Ae + A + ":" + fe + Y);
          }
          break;
        case 3:
          if (C.l < C.length) {
            console.error("WK1 premature formula end");
            return;
          }
          break;
        case 4:
          I.push("(" + I.pop() + ")");
          break;
        case 5:
          I.push(C.read_shift(2));
          break;
        case 6:
          {
            for (var $e = ""; ne = C[C.l++]; ) $e += String.fromCharCode(ne);
            I.push('"' + $e.replace(/"/g, '""') + '"');
          }
          break;
        case 8:
          I.push("-" + I.pop());
          break;
        case 23:
          I.push("+" + I.pop());
          break;
        case 22:
          I.push("NOT(" + I.pop() + ")");
          break;
        case 20:
        case 21:
          ie = I.pop(), ce = I.pop(), I.push(["AND", "OR"][ne - 20] + "(" + ce + "," + ie + ")");
          break;
        default:
          if (ne < 32 && g[ne])
            ie = I.pop(), ce = I.pop(), I.push(ce + g[ne] + ie);
          else if (T[ne]) {
            if (R = T[ne][1], R == 69 && (R = C[C.l++]), R > I.length) {
              console.error("WK1 bad formula parse 0x" + ne.toString(16) + ":|" + I.join("|") + "|");
              return;
            }
            var Pe = I.slice(-R);
            I.length -= R, I.push(T[ne][0] + "(" + Pe.join(",") + ")");
          } else return ne <= 7 ? console.error("WK1 invalid opcode " + ne.toString(16)) : ne <= 24 ? console.error("WK1 unsupported op " + ne.toString(16)) : ne <= 30 ? console.error("WK1 invalid opcode " + ne.toString(16)) : ne <= 115 ? console.error("WK1 unsupported function opcode " + ne.toString(16)) : console.error("WK1 unrecognized opcode " + ne.toString(16));
      }
    }
    I.length == 1 ? P[1].f = "" + I[0] : console.error("WK1 bad formula parse |" + I.join("|") + "|");
  }
  function N(C) {
    var P = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0];
    return P[0].r = C.read_shift(2), P[3] = C[C.l++], P[0].c = C[C.l++], P;
  }
  function b(C, P) {
    var I = N(C);
    return I[1].t = "s", I[1].v = C.read_shift(P - 4, "cstr"), I;
  }
  function F(C, P, I, R) {
    var Y = K(6 + R.length);
    Y.write_shift(2, C), Y.write_shift(1, I), Y.write_shift(1, P), Y.write_shift(1, 39);
    for (var fe = 0; fe < R.length; ++fe) {
      var ce = R.charCodeAt(fe);
      Y.write_shift(1, ce >= 128 ? 95 : ce);
    }
    return Y.write_shift(1, 0), Y;
  }
  function B(C, P) {
    var I = N(C);
    I[1].v = C.read_shift(2);
    var R = I[1].v >> 1;
    if (I[1].v & 1)
      switch (R & 7) {
        case 0:
          R = (R >> 3) * 5e3;
          break;
        case 1:
          R = (R >> 3) * 500;
          break;
        case 2:
          R = (R >> 3) / 20;
          break;
        case 3:
          R = (R >> 3) / 200;
          break;
        case 4:
          R = (R >> 3) / 2e3;
          break;
        case 5:
          R = (R >> 3) / 2e4;
          break;
        case 6:
          R = (R >> 3) / 16;
          break;
        case 7:
          R = (R >> 3) / 64;
          break;
      }
    return I[1].v = R, I;
  }
  function O(C, P) {
    var I = N(C), R = C.read_shift(4), Y = C.read_shift(4), fe = C.read_shift(2);
    if (fe == 65535)
      return R === 0 && Y === 3221225472 ? (I[1].t = "e", I[1].v = 15) : R === 0 && Y === 3489660928 ? (I[1].t = "e", I[1].v = 42) : I[1].v = 0, I;
    var ce = fe & 32768;
    return fe = (fe & 32767) - 16446, I[1].v = (1 - ce * 2) * (Y * Math.pow(2, fe + 32) + R * Math.pow(2, fe)), I;
  }
  function z(C, P, I, R) {
    var Y = K(14);
    if (Y.write_shift(2, C), Y.write_shift(1, I), Y.write_shift(1, P), R == 0)
      return Y.write_shift(4, 0), Y.write_shift(4, 0), Y.write_shift(2, 65535), Y;
    var fe = 0, ce = 0, ie = 0, ne = 0;
    return R < 0 && (fe = 1, R = -R), ce = Math.log2(R) | 0, R /= Math.pow(2, ce - 31), ne = R >>> 0, ne & 2147483648 || (R /= 2, ++ce, ne = R >>> 0), R -= ne, ne |= 2147483648, ne >>>= 0, R *= Math.pow(2, 32), ie = R >>> 0, Y.write_shift(4, ie), Y.write_shift(4, ne), ce += 16383 + (fe ? 32768 : 0), Y.write_shift(2, ce), Y;
  }
  function X(C, P) {
    var I = O(C);
    return C.l += P - 14, I;
  }
  function L(C, P) {
    var I = N(C), R = C.read_shift(4);
    return I[1].v = R >> 6, I;
  }
  function te(C, P) {
    var I = N(C), R = C.read_shift(8, "f");
    return I[1].v = R, I;
  }
  function pe(C, P) {
    var I = te(C);
    return C.l += P - 10, I;
  }
  function oe(C, P) {
    return C[C.l + P - 1] == 0 ? C.read_shift(P, "cstr") : "";
  }
  function de(C, P) {
    var I = C[C.l++];
    I > P - 1 && (I = P - 1);
    for (var R = ""; R.length < I; ) R += String.fromCharCode(C[C.l++]);
    return R;
  }
  function ve(C, P, I) {
    if (!(!I.qpro || P < 21)) {
      var R = C.read_shift(1);
      C.l += 17, C.l += 1, C.l += 2;
      var Y = C.read_shift(P - 21, "cstr");
      return [R, Y];
    }
  }
  function Ie(C, P) {
    for (var I = {}, R = C.l + P; C.l < R; ) {
      var Y = C.read_shift(2);
      if (Y == 14e3) {
        for (I[Y] = [0, ""], I[Y][0] = C.read_shift(2); C[C.l]; )
          I[Y][1] += String.fromCharCode(C[C.l]), C.l++;
        C.l++;
      }
    }
    return I;
  }
  function U(C, P) {
    var I = K(5 + C.length);
    I.write_shift(2, 14e3), I.write_shift(2, P);
    for (var R = 0; R < C.length; ++R) {
      var Y = C.charCodeAt(R);
      I[I.l++] = Y > 127 ? 95 : Y;
    }
    return I[I.l++] = 0, I;
  }
  var Ee = {
    /*::[*/
    0: { n: "BOF", f: pr },
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
    16: { n: "FORMULA", f: p },
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
    204: { n: "SHEETNAMECS", f: oe },
    /*::[*/
    222: { n: "SHEETNAMELP", f: de },
    /*::[*/
    65535: { n: "" }
  }, Se = {
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
    22: { n: "LABEL16", f: b },
    /*::[*/
    23: { n: "NUMBER17", f: O },
    /*::[*/
    24: { n: "NUMBER18", f: B },
    /*::[*/
    25: { n: "FORMULA19", f: X },
    /*::[*/
    26: { n: "FORMULA1A" },
    /*::[*/
    27: { n: "XFORMAT", f: Ie },
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
    37: { n: "NUMBER25", f: L },
    /*::[*/
    38: { n: "??" },
    /*::[*/
    39: { n: "NUMBER27", f: te },
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
    204: { n: "SHEETNAMECS", f: oe },
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
    1537: { n: "SHEETINFOQP", f: ve },
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
function o1(e) {
  var t = {}, r = e.match(Br), a = 0, n = !1;
  if (r) for (; a != r.length; ++a) {
    var i = ye(r[a]);
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
        t.cp = O0[parseInt(i.val, 10)];
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
var u1 = /* @__PURE__ */ function() {
  var e = Qa("t"), t = Qa("rPr");
  function r(i) {
    var s = i.match(e);
    if (!s) return { t: "s", v: "" };
    var f = { t: "s", v: Me(s[1]) }, c = i.match(t);
    return c && (f.s = o1(c[1])), f;
  }
  var a = /<(?:\w+:)?r>/g, n = /<\/(?:\w+:)?r>/;
  return function(s) {
    return s.replace(a, "").split(n).map(r).filter(function(f) {
      return f.v;
    });
  };
}(), h1 = /* @__PURE__ */ function() {
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
}(), x1 = /<(?:\w+:)?t[^>]*>([^<]*)<\/(?:\w+:)?t>/g, d1 = /<(?:\w+:)?r>/, v1 = /<(?:\w+:)?rPh.*?>([\s\S]*?)<\/(?:\w+:)?rPh>/g;
function ri(e, t) {
  var r = t ? t.cellHTML : !0, a = {};
  return e ? (e.match(/^\s*<(?:\w+:)?t[^>]*>/) ? (a.t = Me(ze(e.slice(e.indexOf(">") + 1).split(/<\/(?:\w+:)?t>/)[0] || "")), a.r = ze(e), r && (a.h = V0(a.t))) : (
    /*y = */
    e.match(d1) && (a.r = ze(e), a.t = Me(ze((e.replace(v1, "").match(x1) || []).join("").replace(Br, ""))), r && (a.h = h1(u1(a.r))))
  ), a) : { t: "" };
}
var p1 = /<(?:\w+:)?sst([^>]*)>([\s\S]*)<\/(?:\w+:)?sst>/, m1 = /<(?:\w+:)?(?:si|sstItem)>/g, g1 = /<\/(?:\w+:)?(?:si|sstItem)>/;
function _1(e, t) {
  var r = [], a = "";
  if (!e) return r;
  var n = e.match(p1);
  if (n) {
    a = n[2].replace(m1, "").split(g1);
    for (var i = 0; i != a.length; ++i) {
      var s = ri(a[i].trim(), t);
      s != null && (r[r.length] = s);
    }
    n = ye(n[1]), r.Count = n.count, r.Unique = n.uniqueCount;
  }
  return r;
}
var w1 = /^\s|\s$|[\t\n\r]/;
function tc(e, t) {
  if (!t.bookSST) return "";
  var r = [ur];
  r[r.length] = ue("sst", null, {
    xmlns: la[0],
    count: e.Count,
    uniqueCount: e.Unique
  });
  for (var a = 0; a != e.length; ++a)
    if (e[a] != null) {
      var n = e[a], i = "<si>";
      n.r ? i += n.r : (i += "<t", n.t || (n.t = ""), n.t.match(w1) && (i += ' xml:space="preserve"'), i += ">" + Ge(n.t) + "</t>"), i += "</si>", r[r.length] = i;
    }
  return r.length > 2 && (r[r.length] = "</sst>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function k1(e) {
  return [e.read_shift(4), e.read_shift(4)];
}
function E1(e, t) {
  var r = [], a = !1;
  return bt(e, function(i, s, f) {
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
function T1(e, t) {
  return t || (t = K(8)), t.write_shift(4, e.Count), t.write_shift(4, e.Unique), t;
}
var S1 = No;
function F1(e) {
  var t = Gr();
  Q(t, 159, T1(e));
  for (var r = 0; r < e.length; ++r) Q(t, 19, S1(e[r]));
  return Q(
    t,
    160
    /* BrtEndSst */
  ), t.end();
}
function ac(e) {
  for (var t = [], r = e.split(""), a = 0; a < r.length; ++a) t[a] = r[a].charCodeAt(0);
  return t;
}
function It(e, t) {
  var r = {};
  return r.Major = e.read_shift(2), r.Minor = e.read_shift(2), t >= 4 && (e.l += t - 4), r;
}
function y1(e) {
  var t = {};
  return t.id = e.read_shift(0, "lpp4"), t.R = It(e, 4), t.U = It(e, 4), t.W = It(e, 4), t;
}
function A1(e) {
  for (var t = e.read_shift(4), r = e.l + t - 4, a = {}, n = e.read_shift(4), i = []; n-- > 0; ) i.push({ t: e.read_shift(4), v: e.read_shift(0, "lpp4") });
  if (a.name = e.read_shift(0, "lpp4"), a.comps = i, e.l != r) throw new Error("Bad DataSpaceMapEntry: " + e.l + " != " + r);
  return a;
}
function C1(e) {
  var t = [];
  e.l += 4;
  for (var r = e.read_shift(4); r-- > 0; ) t.push(A1(e));
  return t;
}
function D1(e) {
  var t = [];
  e.l += 4;
  for (var r = e.read_shift(4); r-- > 0; ) t.push(e.read_shift(0, "lpp4"));
  return t;
}
function I1(e) {
  var t = {};
  return e.read_shift(4), e.l += 4, t.id = e.read_shift(0, "lpp4"), t.name = e.read_shift(0, "lpp4"), t.R = It(e, 4), t.U = It(e, 4), t.W = It(e, 4), t;
}
function O1(e) {
  var t = I1(e);
  if (t.ename = e.read_shift(0, "8lpp4"), t.blksz = e.read_shift(4), t.cmode = e.read_shift(4), e.read_shift(4) != 4) throw new Error("Bad !Primary record");
  return t;
}
function nc(e, t) {
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
function ic(e, t) {
  var r = {}, a = e.l + t;
  return e.l += 4, r.Salt = e.slice(e.l, e.l + 16), e.l += 16, r.Verifier = e.slice(e.l, e.l + 16), e.l += 16, e.read_shift(4), r.VerifierHash = e.slice(e.l, a), e.l = a, r;
}
function R1(e) {
  var t = It(e);
  switch (t.Minor) {
    case 2:
      return [t.Minor, b1(e)];
    case 3:
      return [t.Minor, N1()];
    case 4:
      return [t.Minor, P1(e)];
  }
  throw new Error("ECMA-376 Encrypted file unrecognized Version: " + t.Minor);
}
function b1(e) {
  var t = e.read_shift(4);
  if ((t & 63) != 36) throw new Error("EncryptionInfo mismatch");
  var r = e.read_shift(4), a = nc(e, r), n = ic(e, e.length - e.l);
  return { t: "Std", h: a, v: n };
}
function N1() {
  throw new Error("File is password-protected: ECMA-376 Extensible");
}
function P1(e) {
  var t = ["saltSize", "blockSize", "keyBits", "hashSize", "cipherAlgorithm", "cipherChaining", "hashAlgorithm", "saltValue"];
  e.l += 4;
  var r = e.read_shift(e.length - e.l, "utf8"), a = {};
  return r.replace(Br, function(i) {
    var s = ye(i);
    switch (St(s[0])) {
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
function L1(e, t) {
  var r = {}, a = r.EncryptionVersionInfo = It(e, 4);
  if (t -= 4, a.Minor != 2) throw new Error("unrecognized minor version code: " + a.Minor);
  if (a.Major > 4 || a.Major < 2) throw new Error("unrecognized major version code: " + a.Major);
  r.Flags = e.read_shift(4), t -= 4;
  var n = e.read_shift(4);
  return t -= 4, r.EncryptionHeader = nc(e, n), t -= n, r.EncryptionVerifier = ic(e, t), r;
}
function B1(e) {
  var t = {}, r = t.EncryptionVersionInfo = It(e, 4);
  if (r.Major != 1 || r.Minor != 1) throw "unrecognized version code " + r.Major + " : " + r.Minor;
  return t.Salt = e.read_shift(16), t.EncryptedVerifier = e.read_shift(16), t.EncryptedVerifierHash = e.read_shift(16), t;
}
function ti(e) {
  var t = 0, r, a = ac(e), n = a.length + 1, i, s, f, c, l;
  for (r = Wt(n), r[0] = a.length, i = 1; i != n; ++i) r[i] = a[i - 1];
  for (i = n - 1; i >= 0; --i)
    s = r[i], f = t & 16384 ? 1 : 0, c = t << 1 & 32767, l = f | c, t = l ^ s;
  return t ^ 52811;
}
var sc = /* @__PURE__ */ function() {
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
    for (var f = ac(s), c = i(f), l = f.length, o = Wt(16), u = 0; u != 16; ++u) o[u] = 0;
    var x, d, v;
    for ((l & 1) === 1 && (x = c >> 8, o[l] = n(e[0], x), --l, x = c & 255, d = f[f.length - 1], o[l] = n(d, x)); l > 0; )
      --l, x = c >> 8, o[l] = n(f[l], x), --l, x = c & 255, o[l] = n(f[l], x);
    for (l = 15, v = 15 - f.length; v > 0; )
      x = c >> 8, o[l] = n(e[v], x), --l, --v, x = c & 255, o[l] = n(f[l], x), --l, --v;
    return o;
  };
}(), M1 = function(e, t, r, a, n) {
  n || (n = t), a || (a = sc(e));
  var i, s;
  for (i = 0; i != t.length; ++i)
    s = t[i], s ^= a[r], s = (s >> 5 | s << 3) & 255, n[i] = s, ++r;
  return [n, r, a];
}, U1 = function(e) {
  var t = 0, r = sc(e);
  return function(a) {
    var n = M1("", a, t, r);
    return t = n[1], n[0];
  };
};
function W1(e, t, r, a) {
  var n = { key: pr(e), verificationBytes: pr(e) };
  return r.password && (n.verifier = ti(r.password)), a.valid = n.verificationBytes === n.verifier, a.valid && (a.insitu = U1(r.password)), n;
}
function V1(e, t, r) {
  var a = r || {};
  return a.Info = e.read_shift(2), e.l -= 2, a.Info === 1 ? a.Data = B1(e) : a.Data = L1(e, t), a;
}
function H1(e, t, r) {
  var a = { Type: r.biff >= 8 ? e.read_shift(2) : 0 };
  return a.Type ? V1(e, t - 2, a) : W1(e, r.biff >= 8 ? t : t - 2, r, a), a;
}
var fc = /* @__PURE__ */ function() {
  function e(n, i) {
    switch (i.type) {
      case "base64":
        return t(qr(n), i);
      case "binary":
        return t(n, i);
      case "buffer":
        return t(Ne && Buffer.isBuffer(n) ? n.toString("binary") : Gt(n), i);
      case "array":
        return t(na(n), i);
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
            var p = o.slice(d, x.lastIndex - v[0].length);
            if (p[0] == " " && (p = p.slice(1)), ++h, p.length) {
              var k = { v: p, t: "s" };
              Array.isArray(f) ? f[u][h] = k : f[Fe({ r: u, c: h })] = k;
            }
            break;
        }
        d = x.lastIndex;
      }
      h > l.e.c && (l.e.c = h);
    }), f["!ref"] = De(l), f;
  }
  function r(n, i) {
    return zt(e(n, i), i);
  }
  function a(n) {
    for (var i = ["{\\rtf1\\ansi"], s = Ue(n["!ref"]), f, c = Array.isArray(n), l = s.s.r; l <= s.e.r; ++l) {
      i.push("\\trowd\\trautofit1");
      for (var o = s.s.c; o <= s.e.c; ++o) i.push("\\cellx" + (o + 1));
      for (i.push("\\pard\\intbl"), o = s.s.c; o <= s.e.c; ++o) {
        var u = Fe({ r: l, c: o });
        f = c ? (n[l] || [])[o] : n[u], !(!f || f.v == null && (!f.f || f.F)) && (i.push(" " + (f.w || (Ot(f), f.w))), i.push("\\cell"));
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
function X1(e) {
  var t = e.slice(e[0] === "#" ? 1 : 0).slice(0, 6);
  return [parseInt(t.slice(0, 2), 16), parseInt(t.slice(2, 4), 16), parseInt(t.slice(4, 6), 16)];
}
function an(e) {
  for (var t = 0, r = 1; t != 3; ++t) r = r * 256 + (e[t] > 255 ? 255 : e[t] < 0 ? 0 : e[t]);
  return r.toString(16).toUpperCase().slice(1);
}
function G1(e) {
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
function z1(e) {
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
function Hn(e, t) {
  if (t === 0) return e;
  var r = G1(X1(e));
  return t < 0 ? r[2] = r[2] * (1 + t) : r[2] = 1 - (1 - r[2]) * (1 - t), an(z1(r));
}
var cc = 6, $1 = 15, K1 = 1, br = cc;
function nn(e) {
  return Math.floor((e + Math.round(128 / br) / 256) * br);
}
function sn(e) {
  return Math.floor((e - 5) / br * 100 + 0.5) / 100;
}
function Xn(e) {
  return Math.round((e * br + 5) / br * 256) / 256;
}
function o0(e) {
  return Xn(sn(nn(e)));
}
function ai(e) {
  var t = Math.abs(e - o0(e)), r = br;
  if (t > 5e-3) for (br = K1; br < $1; ++br) Math.abs(e - o0(e)) <= t && (t = Math.abs(e - o0(e)), r = br);
  br = r;
}
function Vt(e) {
  e.width ? (e.wpx = nn(e.width), e.wch = sn(e.wpx), e.MDW = br) : e.wpx ? (e.wch = sn(e.wpx), e.width = Xn(e.wch), e.MDW = br) : typeof e.wch == "number" && (e.width = Xn(e.wch), e.wpx = nn(e.width), e.MDW = br), e.customWidth && delete e.customWidth;
}
var j1 = 96, lc = j1;
function fn(e) {
  return e * 96 / lc;
}
function Ia(e) {
  return e * lc / 96;
}
var Y1 = {
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
function J1(e, t, r, a) {
  t.Borders = [];
  var n = {}, i = !1;
  (e[0].match(Br) || []).forEach(function(s) {
    var f = ye(s);
    switch (St(f[0])) {
      case "<borders":
      case "<borders>":
      case "</borders>":
        break;
      case "<border":
      case "<border>":
      case "<border/>":
        n = /*::(*/
        {}, f.diagonalUp && (n.diagonalUp = Je(f.diagonalUp)), f.diagonalDown && (n.diagonalDown = Je(f.diagonalDown)), t.Borders.push(n);
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
function q1(e, t, r, a) {
  t.Fills = [];
  var n = {}, i = !1;
  (e[0].match(Br) || []).forEach(function(s) {
    var f = ye(s);
    switch (St(f[0])) {
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
function Z1(e, t, r, a) {
  t.Fonts = [];
  var n = {}, i = !1;
  (e[0].match(Br) || []).forEach(function(s) {
    var f = ye(s);
    switch (St(f[0])) {
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
        f.val && (n.name = ze(f.val));
        break;
      case "<name/>":
      case "</name>":
        break;
      case "<b":
        n.bold = f.val ? Je(f.val) : 1;
        break;
      case "<b/>":
        n.bold = 1;
        break;
      case "<i":
        n.italic = f.val ? Je(f.val) : 1;
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
        n.strike = f.val ? Je(f.val) : 1;
        break;
      case "<strike/>":
        n.strike = 1;
        break;
      case "<outline":
        n.outline = f.val ? Je(f.val) : 1;
        break;
      case "<outline/>":
        n.outline = 1;
        break;
      case "<shadow":
        n.shadow = f.val ? Je(f.val) : 1;
        break;
      case "<shadow/>":
        n.shadow = 1;
        break;
      case "<condense":
        n.condense = f.val ? Je(f.val) : 1;
        break;
      case "<condense/>":
        n.condense = 1;
        break;
      case "<extend":
        n.extend = f.val ? Je(f.val) : 1;
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
        f.codepage = O0[parseInt(f.val, 10)];
        break;
      case "<color":
        if (n.color || (n.color = {}), f.auto && (n.color.auto = Je(f.auto)), f.rgb) n.color.rgb = f.rgb.slice(-6);
        else if (f.indexed) {
          n.color.index = parseInt(f.indexed, 10);
          var c = Qt[n.color.index];
          n.color.index == 81 && (c = Qt[1]), c || (c = Qt[1]), n.color.rgb = c[0].toString(16) + c[1].toString(16) + c[2].toString(16);
        } else f.theme && (n.color.theme = parseInt(f.theme, 10), f.tint && (n.color.tint = parseFloat(f.tint)), f.theme && r.themeElements && r.themeElements.clrScheme && (n.color.rgb = Hn(r.themeElements.clrScheme[n.color.theme].rgb, n.color.tint || 0)));
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
function Q1(e, t, r) {
  t.NumberFmt = [];
  for (var a = sr(Te), n = 0; n < a.length; ++n) t.NumberFmt[a[n]] = Te[a[n]];
  var i = e[0].match(Br);
  if (i)
    for (n = 0; n < i.length; ++n) {
      var s = ye(i[n]);
      switch (St(s[0])) {
        case "<numFmts":
        case "</numFmts>":
        case "<numFmts/>":
        case "<numFmts>":
          break;
        case "<numFmt":
          {
            var f = Me(ze(s.formatCode)), c = parseInt(s.numFmtId, 10);
            if (t.NumberFmt[c] = f, c > 0) {
              if (c > 392) {
                for (c = 392; c > 60 && t.NumberFmt[c] != null; --c) ;
                t.NumberFmt[c] = f;
              }
              Dt(f, c);
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
function ex(e) {
  var t = ["<numFmts>"];
  return [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(r) {
    for (var a = r[0]; a <= r[1]; ++a) e[a] != null && (t[t.length] = ue("numFmt", null, { numFmtId: a, formatCode: Ge(e[a]) }));
  }), t.length === 1 ? "" : (t[t.length] = "</numFmts>", t[0] = ue("numFmts", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
var Cn = ["numFmtId", "fillId", "fontId", "borderId", "xfId"], Dn = ["applyAlignment", "applyBorder", "applyFill", "applyFont", "applyNumberFormat", "applyProtection", "pivotButton", "quotePrefix"];
function rx(e, t, r) {
  t.CellXf = [];
  var a, n = !1;
  (e[0].match(Br) || []).forEach(function(i) {
    var s = ye(i), f = 0;
    switch (St(s[0])) {
      case "<cellXfs":
      case "<cellXfs>":
      case "<cellXfs/>":
      case "</cellXfs>":
        break;
      case "<xf":
      case "<xf/>":
        for (a = s, delete a[0], f = 0; f < Cn.length; ++f) a[Cn[f]] && (a[Cn[f]] = parseInt(a[Cn[f]], 10));
        for (f = 0; f < Dn.length; ++f) a[Dn[f]] && (a[Dn[f]] = Je(a[Dn[f]]));
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
        s.vertical && (c.vertical = s.vertical), s.horizontal && (c.horizontal = s.horizontal), s.textRotation != null && (c.textRotation = s.textRotation), s.indent && (c.indent = s.indent), s.wrapText && (c.wrapText = Je(s.wrapText)), a.alignment = c;
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
function tx(e) {
  var t = [];
  return t[t.length] = ue("cellXfs", null), e.forEach(function(r) {
    t[t.length] = ue("xf", null, r);
  }), t[t.length] = "</cellXfs>", t.length === 2 ? "" : (t[0] = ue("cellXfs", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
var ax = /* @__PURE__ */ function() {
  var t = /<(?:\w+:)?numFmts([^>]*)>[\S\s]*?<\/(?:\w+:)?numFmts>/, r = /<(?:\w+:)?cellXfs([^>]*)>[\S\s]*?<\/(?:\w+:)?cellXfs>/, a = /<(?:\w+:)?fills([^>]*)>[\S\s]*?<\/(?:\w+:)?fills>/, n = /<(?:\w+:)?fonts([^>]*)>[\S\s]*?<\/(?:\w+:)?fonts>/, i = /<(?:\w+:)?borders([^>]*)>[\S\s]*?<\/(?:\w+:)?borders>/;
  return function(f, c, l) {
    var o = {};
    if (!f) return o;
    f = f.replace(/<!--([\s\S]*?)-->/mg, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, "");
    var u;
    return (u = f.match(t)) && Q1(u, o, l), (u = f.match(n)) && Z1(u, o, c, l), (u = f.match(a)) && q1(u, o, c, l), (u = f.match(i)) && J1(u, o, c, l), (u = f.match(r)) && rx(u, o, l), o;
  };
}();
function oc(e, t) {
  var r = [ur, ue("styleSheet", null, {
    xmlns: la[0],
    "xmlns:vt": _r.vt
  })], a;
  return e.SSF && (a = ex(e.SSF)) != null && (r[r.length] = a), r[r.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>', r[r.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>', r[r.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>', r[r.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>', (a = tx(t.cellXfs)) && (r[r.length] = a), r[r.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>', r[r.length] = '<dxfs count="0"/>', r[r.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>', r.length > 2 && (r[r.length] = "</styleSheet>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function nx(e, t) {
  var r = e.read_shift(2), a = Pr(e);
  return [r, a];
}
function ix(e, t, r) {
  r || (r = K(6 + 4 * t.length)), r.write_shift(2, e), Tr(t, r);
  var a = r.length > r.l ? r.slice(0, r.l) : r;
  return r.l == null && (r.l = r.length), a;
}
function sx(e, t, r) {
  var a = {};
  a.sz = e.read_shift(2) / 20;
  var n = Vo(e);
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
  switch (c > 0 && (a.charset = c), e.l++, a.color = Wo(e), e.read_shift(1)) {
    case 1:
      a.scheme = "major";
      break;
    case 2:
      a.scheme = "minor";
      break;
  }
  return a.name = Pr(e), a;
}
function fx(e, t) {
  t || (t = K(25 + 4 * 32)), t.write_shift(2, e.sz * 20), Ho(e, t), t.write_shift(2, e.bold ? 700 : 400);
  var r = 0;
  e.vertAlign == "superscript" ? r = 1 : e.vertAlign == "subscript" && (r = 2), t.write_shift(2, r), t.write_shift(1, e.underline || 0), t.write_shift(1, e.family || 0), t.write_shift(1, e.charset || 0), t.write_shift(1, 0), Un(e.color, t);
  var a = 0;
  return a = 2, t.write_shift(1, a), Tr(e.name, t), t.length > t.l ? t.slice(0, t.l) : t;
}
var cx = [
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
], u0, lx = Lr;
function ws(e, t) {
  t || (t = K(4 * 3 + 8 * 7 + 16 * 1)), u0 || (u0 = Kn(cx));
  var r = u0[e.patternType];
  r == null && (r = 40), t.write_shift(4, r);
  var a = 0;
  if (r != 40)
    for (Un({ auto: 1 }, t), Un({ auto: 1 }, t); a < 12; ++a) t.write_shift(4, 0);
  else {
    for (; a < 4; ++a) t.write_shift(4, 0);
    for (; a < 12; ++a) t.write_shift(4, 0);
  }
  return t.length > t.l ? t.slice(0, t.l) : t;
}
function ox(e, t) {
  var r = e.l + t, a = e.read_shift(2), n = e.read_shift(2);
  return e.l = r, { ixfe: a, numFmtId: n };
}
function uc(e, t, r) {
  r || (r = K(16)), r.write_shift(2, t || 0), r.write_shift(2, e.numFmtId || 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(1, 0), r.write_shift(1, 0);
  var a = 0;
  return r.write_shift(1, a), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(1, 0), r;
}
function Ma(e, t) {
  return t || (t = K(10)), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var ux = Lr;
function hx(e, t) {
  return t || (t = K(51)), t.write_shift(1, 0), Ma(null, t), Ma(null, t), Ma(null, t), Ma(null, t), Ma(null, t), t.length > t.l ? t.slice(0, t.l) : t;
}
function xx(e, t) {
  return t || (t = K(12 + 4 * 10)), t.write_shift(4, e.xfId), t.write_shift(2, 1), t.write_shift(1, 0), t.write_shift(1, 0), Mn(e.name || "", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function dx(e, t, r) {
  var a = K(2052);
  return a.write_shift(4, e), Mn(t, a), Mn(r, a), a.length > a.l ? a.slice(0, a.l) : a;
}
function vx(e, t, r) {
  var a = {};
  a.NumberFmt = [];
  for (var n in Te) a.NumberFmt[n] = Te[n];
  a.CellXf = [], a.Fonts = [];
  var i = [], s = !1;
  return bt(e, function(c, l, o) {
    switch (o) {
      case 44:
        a.NumberFmt[c[0]] = c[1], Dt(c[1], c[0]);
        break;
      case 43:
        a.Fonts.push(c), c.color.theme != null && t && t.themeElements && t.themeElements.clrScheme && (c.color.rgb = Hn(t.themeElements.clrScheme[c.color.theme].rgb, c.color.tint || 0));
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
function px(e, t) {
  if (t) {
    var r = 0;
    [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(a) {
      for (var n = a[0]; n <= a[1]; ++n) t[n] != null && ++r;
    }), r != 0 && (Q(e, 615, pt(r)), [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(a) {
      for (var n = a[0]; n <= a[1]; ++n) t[n] != null && Q(e, 44, ix(n, t[n]));
    }), Q(
      e,
      616
      /* BrtEndFmts */
    ));
  }
}
function mx(e) {
  var t = 1;
  Q(e, 611, pt(t)), Q(e, 43, fx({
    sz: 12,
    color: { theme: 1 },
    name: "Calibri",
    family: 2
  })), Q(
    e,
    612
    /* BrtEndFonts */
  );
}
function gx(e) {
  var t = 2;
  Q(e, 603, pt(t)), Q(e, 45, ws({ patternType: "none" })), Q(e, 45, ws({ patternType: "gray125" })), Q(
    e,
    604
    /* BrtEndFills */
  );
}
function _x(e) {
  var t = 1;
  Q(e, 613, pt(t)), Q(e, 46, hx()), Q(
    e,
    614
    /* BrtEndBorders */
  );
}
function wx(e) {
  var t = 1;
  Q(e, 626, pt(t)), Q(e, 47, uc({
    numFmtId: 0
  }, 65535)), Q(
    e,
    627
    /* BrtEndCellStyleXFs */
  );
}
function kx(e, t) {
  Q(e, 617, pt(t.length)), t.forEach(function(r) {
    Q(e, 47, uc(r, 0));
  }), Q(
    e,
    618
    /* BrtEndCellXFs */
  );
}
function Ex(e) {
  var t = 1;
  Q(e, 619, pt(t)), Q(e, 48, xx({
    xfId: 0,
    name: "Normal"
  })), Q(
    e,
    620
    /* BrtEndStyles */
  );
}
function Tx(e) {
  var t = 0;
  Q(e, 505, pt(t)), Q(
    e,
    506
    /* BrtEndDXFs */
  );
}
function Sx(e) {
  var t = 0;
  Q(e, 508, dx(t, "TableStyleMedium9", "PivotStyleMedium4")), Q(
    e,
    509
    /* BrtEndTableStyles */
  );
}
function Fx(e, t) {
  var r = Gr();
  return Q(
    r,
    278
    /* BrtBeginStyleSheet */
  ), px(r, e.SSF), mx(r), gx(r), _x(r), wx(r), kx(r, t.cellXfs), Ex(r), Tx(r), Sx(r), Q(
    r,
    279
    /* BrtEndStyleSheet */
  ), r.end();
}
var yx = [
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
function Ax(e, t, r) {
  t.themeElements.clrScheme = [];
  var a = {};
  (e[0].match(Br) || []).forEach(function(n) {
    var i = ye(n);
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
        i[0].charAt(1) === "/" ? (t.themeElements.clrScheme[yx.indexOf(i[0])] = a, a = {}) : a.name = i[0].slice(3, i[0].length - 1);
        break;
      default:
        if (r && r.WTF) throw new Error("Unrecognized " + i[0] + " in clrScheme");
    }
  });
}
function Cx() {
}
function Dx() {
}
var Ix = /<a:clrScheme([^>]*)>[\s\S]*<\/a:clrScheme>/, Ox = /<a:fontScheme([^>]*)>[\s\S]*<\/a:fontScheme>/, Rx = /<a:fmtScheme([^>]*)>[\s\S]*<\/a:fmtScheme>/;
function bx(e, t, r) {
  t.themeElements = {};
  var a;
  [
    /* clrScheme CT_ColorScheme */
    ["clrScheme", Ix, Ax],
    /* fontScheme CT_FontScheme */
    ["fontScheme", Ox, Cx],
    /* fmtScheme CT_StyleMatrix */
    ["fmtScheme", Rx, Dx]
  ].forEach(function(n) {
    if (!(a = e.match(n[1]))) throw new Error(n[0] + " not found in themeElements");
    n[2](a, t, r);
  });
}
var Nx = /<a:themeElements([^>]*)>[\s\S]*<\/a:themeElements>/;
function hc(e, t) {
  (!e || e.length === 0) && (e = ni());
  var r, a = {};
  if (!(r = e.match(Nx))) throw new Error("themeElements not found in theme");
  return bx(r[0], a, t), a.raw = e, a;
}
function ni(e, t) {
  if (t && t.themeXLSX) return t.themeXLSX;
  if (e && typeof e.raw == "string") return e.raw;
  var r = [ur];
  return r[r.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">', r[r.length] = "<a:themeElements>", r[r.length] = '<a:clrScheme name="Office">', r[r.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>', r[r.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>', r[r.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>', r[r.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>', r[r.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>', r[r.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>', r[r.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>', r[r.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>', r[r.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>', r[r.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>', r[r.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>', r[r.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>', r[r.length] = "</a:clrScheme>", r[r.length] = '<a:fontScheme name="Office">', r[r.length] = "<a:majorFont>", r[r.length] = '<a:latin typeface="Cambria"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Hebr" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="MoolBoran"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:majorFont>", r[r.length] = "<a:minorFont>", r[r.length] = '<a:latin typeface="Calibri"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Arial"/>', r[r.length] = '<a:font script="Hebr" typeface="Arial"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="DaunPenh"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Arial"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:minorFont>", r[r.length] = "</a:fontScheme>", r[r.length] = '<a:fmtScheme name="Office">', r[r.length] = "<a:fillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="1"/>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="0"/>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:fillStyleLst>", r[r.length] = "<a:lnStyleLst>", r[r.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = "</a:lnStyleLst>", r[r.length] = "<a:effectStyleLst>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>', r[r.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>', r[r.length] = "</a:effectStyle>", r[r.length] = "</a:effectStyleLst>", r[r.length] = "<a:bgFillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:bgFillStyleLst>", r[r.length] = "</a:fmtScheme>", r[r.length] = "</a:themeElements>", r[r.length] = "<a:objectDefaults>", r[r.length] = "<a:spDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>', r[r.length] = "</a:spDef>", r[r.length] = "<a:lnDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>', r[r.length] = "</a:lnDef>", r[r.length] = "</a:objectDefaults>", r[r.length] = "<a:extraClrSchemeLst/>", r[r.length] = "</a:theme>", r.join("");
}
function Px(e, t, r) {
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
      s = af(i, { type: "array" });
    } catch {
      return;
    }
    var f = Jr(s, "theme/theme/theme1.xml", !0);
    if (f)
      return hc(f, r);
  }
}
function Lx(e) {
  return e.read_shift(4);
}
function Bx(e) {
  var t = {};
  switch (t.xclrType = e.read_shift(2), t.nTintShade = e.read_shift(2), t.xclrType) {
    case 0:
      e.l += 4;
      break;
    case 1:
      t.xclrValue = Mx(e, 4);
      break;
    case 2:
      t.xclrValue = zf(e);
      break;
    case 3:
      t.xclrValue = Lx(e);
      break;
    case 4:
      e.l += 4;
      break;
  }
  return e.l += 8, t;
}
function Mx(e, t) {
  return Lr(e, t);
}
function Ux(e, t) {
  return Lr(e, t);
}
function Wx(e) {
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
      a[1] = Bx(e);
      break;
    case 6:
      a[1] = Ux(e, r);
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
function Vx(e, t) {
  var r = e.l + t;
  e.l += 2;
  var a = e.read_shift(2);
  e.l += 2;
  for (var n = e.read_shift(2), i = []; n-- > 0; ) i.push(Wx(e, r - e.l));
  return { ixfe: a, ext: i };
}
function Hx(e, t) {
  t.forEach(function(r) {
    switch (r[0]) {
    }
  });
}
function Xx(e, t) {
  return {
    flags: e.read_shift(4),
    version: e.read_shift(4),
    name: Pr(e)
  };
}
function Gx(e) {
  var t = K(12 + 2 * e.name.length);
  return t.write_shift(4, e.flags), t.write_shift(4, e.version), Tr(e.name, t), t.slice(0, t.l);
}
function zx(e) {
  for (var t = [], r = e.read_shift(4); r-- > 0; )
    t.push([e.read_shift(4), e.read_shift(4)]);
  return t;
}
function $x(e) {
  var t = K(4 + 8 * e.length);
  t.write_shift(4, e.length);
  for (var r = 0; r < e.length; ++r)
    t.write_shift(4, e[r][0]), t.write_shift(4, e[r][1]);
  return t;
}
function Kx(e, t) {
  var r = K(8 + 2 * t.length);
  return r.write_shift(4, e), Tr(t, r), r.slice(0, r.l);
}
function jx(e) {
  return e.l += 4, e.read_shift(4) != 0;
}
function Yx(e, t) {
  var r = K(8);
  return r.write_shift(4, e), r.write_shift(4, 1), r;
}
function Jx(e, t, r) {
  var a = { Types: [], Cell: [], Value: [] }, n = r || {}, i = [], s = !1, f = 2;
  return bt(e, function(c, l, o) {
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
function qx() {
  var e = Gr();
  return Q(e, 332), Q(e, 334, pt(1)), Q(e, 335, Gx({
    name: "XLDAPR",
    version: 12e4,
    flags: 3496657072
  })), Q(e, 336), Q(e, 339, Kx(1, "XLDAPR")), Q(e, 52), Q(e, 35, pt(514)), Q(e, 4096, pt(0)), Q(e, 4097, it(1)), Q(e, 36), Q(e, 53), Q(e, 340), Q(e, 337, Yx(1)), Q(e, 51, $x([[1, 0]])), Q(e, 338), Q(e, 333), e.end();
}
function Zx(e, t, r) {
  var a = { Types: [], Cell: [], Value: [] };
  if (!e)
    return a;
  var n = !1, i = 2, s;
  return e.replace(Br, function(f) {
    var c = ye(f);
    switch (St(c[0])) {
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
function xc() {
  var e = [ur];
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
function Qx(e) {
  var t = [];
  if (!e) return t;
  var r = 1;
  return (e.match(Br) || []).forEach(function(a) {
    var n = ye(a);
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
function ed(e) {
  var t = {};
  t.i = e.read_shift(4);
  var r = {};
  r.r = e.read_shift(4), r.c = e.read_shift(4), t.r = Fe(r);
  var a = e.read_shift(1);
  return a & 2 && (t.l = "1"), a & 8 && (t.a = "1"), t;
}
function rd(e, t, r) {
  var a = [];
  return bt(e, function(i, s, f) {
    switch (f) {
      case 63:
        a.push(i);
        break;
      default:
        if (!s.T) throw new Error("Unexpected record 0x" + f.toString(16));
    }
  }), a;
}
function td(e, t, r, a) {
  if (!e) return e;
  var n = a || {}, i = !1;
  bt(e, function(f, c, l) {
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
function ad(e, t) {
  if (!e) return "??";
  var r = (e.match(/<c:chart [^>]*r:id="([^"]*)"/) || ["", ""])[1];
  return t["!id"][r].Target;
}
var Ta = 1024;
function dc(e, t) {
  for (var r = [21600, 21600], a = ["m0,0l0", r[1], r[0], r[1], r[0], "0xe"].join(","), n = [
    ue("xml", null, { "xmlns:v": Kr.v, "xmlns:o": Kr.o, "xmlns:x": Kr.x, "xmlns:mv": Kr.mv }).replace(/\/>/, ">"),
    ue("o:shapelayout", ue("o:idmap", null, { "v:ext": "edit", data: e }), { "v:ext": "edit" }),
    ue("v:shapetype", [
      ue("v:stroke", null, { joinstyle: "miter" }),
      ue("v:path", null, { gradientshapeok: "t", "o:connecttype": "rect" })
    ].join(""), { id: "_x0000_t202", "o:spt": 202, coordsize: r.join(","), path: a })
  ]; Ta < e * 1e3; ) Ta += 1e3;
  return t.forEach(function(i) {
    var s = ar(i[0]), f = (
      /*::(*/
      { color2: "#BEFF82", type: "gradient" }
    );
    f.type == "gradient" && (f.angle = "-180");
    var c = f.type == "gradient" ? ue("o:fill", null, { type: "gradientUnscaled", "v:ext": "view" }) : null, l = ue("v:fill", c, f), o = { on: "t", obscured: "t" };
    ++Ta, n = n.concat([
      "<v:shape" + en({
        id: "_x0000_s" + Ta,
        type: "#_x0000_t202",
        style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" + (i[1].hidden ? ";visibility:hidden" : ""),
        fillcolor: "#ECFAD4",
        strokecolor: "#edeaa1"
      }) + ">",
      l,
      ue("v:shadow", null, o),
      ue("v:path", null, { "o:connecttype": "none" }),
      '<v:textbox><div style="text-align:left"></div></v:textbox>',
      '<x:ClientData ObjectType="Note">',
      "<x:MoveWithCells/>",
      "<x:SizeWithCells/>",
      /* Part 4 19.4.2.3 Anchor (Anchor) */
      yr("x:Anchor", [s.c + 1, 0, s.r + 1, 0, s.c + 3, 20, s.r + 5, 20].join(",")),
      yr("x:AutoFill", "False"),
      yr("x:Row", String(s.r)),
      yr("x:Column", String(s.c)),
      i[1].hidden ? "" : "<x:Visible/>",
      "</x:ClientData>",
      "</v:shape>"
    ]);
  }), n.push("</xml>"), n.join("");
}
function ks(e, t, r, a) {
  var n = Array.isArray(e), i;
  t.forEach(function(s) {
    var f = ar(s.ref);
    if (n ? (e[f.r] || (e[f.r] = []), i = e[f.r][f.c]) : i = e[s.ref], !i) {
      i = { t: "z" }, n ? e[f.r][f.c] = i : e[s.ref] = i;
      var c = Ue(e["!ref"] || "BDWGO1000001:A1");
      c.s.r > f.r && (c.s.r = f.r), c.e.r < f.r && (c.e.r = f.r), c.s.c > f.c && (c.s.c = f.c), c.e.c < f.c && (c.e.c = f.c);
      var l = De(c);
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
function nd(e, t) {
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
        var c = ye(f[0]), l = { author: c.authorId && r[c.authorId] || "sheetjsghost", ref: c.ref, guid: c.guid }, o = ar(c.ref);
        if (!(t.sheetRows && t.sheetRows <= o.r)) {
          var u = s.match(/<(?:\w+:)?text>([\s\S]*)<\/(?:\w+:)?text>/), x = !!u && !!u[1] && ri(u[1]) || { r: "", t: "", h: "" };
          l.r = x.r, x.r == "<t></t>" && (x.t = x.h = ""), l.t = (x.t || "").replace(/\r\n/g, `
`).replace(/\r/g, `
`), t.cellHTML && (l.h = x.h), a.push(l);
        }
      }
    }
  }), a;
}
function vc(e) {
  var t = [ur, ue("comments", null, { xmlns: la[0] })], r = [];
  return t.push("<authors>"), e.forEach(function(a) {
    a[1].forEach(function(n) {
      var i = Ge(n.a);
      r.indexOf(i) == -1 && (r.push(i), t.push("<author>" + i + "</author>")), n.T && n.ID && r.indexOf("tc=" + n.ID) == -1 && (r.push("tc=" + n.ID), t.push("<author>tc=" + n.ID + "</author>"));
    });
  }), r.length == 0 && (r.push("SheetJ5"), t.push("<author>SheetJ5</author>")), t.push("</authors>"), t.push("<commentList>"), e.forEach(function(a) {
    var n = 0, i = [];
    if (a[1][0] && a[1][0].T && a[1][0].ID ? n = r.indexOf("tc=" + a[1][0].ID) : a[1].forEach(function(c) {
      c.a && (n = r.indexOf(Ge(c.a))), i.push(c.t || "");
    }), t.push('<comment ref="' + a[0] + '" authorId="' + n + '"><text>'), i.length <= 1) t.push(yr("t", Ge(i[0] || "")));
    else {
      for (var s = `Comment:
    ` + i[0] + `
`, f = 1; f < i.length; ++f) s += `Reply:
    ` + i[f] + `
`;
      t.push(yr("t", Ge(s)));
    }
    t.push("</text></comment>");
  }), t.push("</commentList>"), t.length > 2 && (t[t.length] = "</comments>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function id(e, t) {
  var r = [], a = !1, n = {}, i = 0;
  return e.replace(Br, function(f, c) {
    var l = ye(f);
    switch (St(l[0])) {
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
function sd(e, t, r) {
  var a = [ur, ue("ThreadedComments", null, { xmlns: _r.TCMNT }).replace(/[\/]>/, ">")];
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
      f == 0 ? i = c.id : c.parentId = i, s.ID = c.id, s.a && (c.personId = "{54EE7950-7262-4200-6969-" + ("000000000000" + t.indexOf(s.a)).slice(-12) + "}"), a.push(ue("threadedComment", yr("text", s.t || ""), c));
    });
  }), a.push("</ThreadedComments>"), a.join("");
}
function fd(e, t) {
  var r = [], a = !1;
  return e.replace(Br, function(i) {
    var s = ye(i);
    switch (St(s[0])) {
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
function cd(e) {
  var t = [ur, ue("personList", null, {
    xmlns: _r.TCMNT,
    "xmlns:x": la[0]
  }).replace(/[\/]>/, ">")];
  return e.forEach(function(r, a) {
    t.push(ue("person", null, {
      displayName: r,
      id: "{54EE7950-7262-4200-6969-" + ("000000000000" + a).slice(-12) + "}",
      userId: r,
      providerId: "None"
    }));
  }), t.push("</personList>"), t.join("");
}
function ld(e) {
  var t = {};
  t.iauthor = e.read_shift(4);
  var r = xa(e);
  return t.rfx = r.s, t.ref = Fe(r.s), e.l += 16, t;
}
function od(e, t) {
  return t == null && (t = K(36)), t.write_shift(4, e[1].iauthor), Na(e[0], t), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var ud = Pr;
function hd(e) {
  return Tr(e.slice(0, 54));
}
function xd(e, t) {
  var r = [], a = [], n = {}, i = !1;
  return bt(e, function(f, c, l) {
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
function dd(e) {
  var t = Gr(), r = [];
  return Q(
    t,
    628
    /* BrtBeginComments */
  ), Q(
    t,
    630
    /* BrtBeginCommentAuthors */
  ), e.forEach(function(a) {
    a[1].forEach(function(n) {
      r.indexOf(n.a) > -1 || (r.push(n.a.slice(0, 54)), Q(t, 632, hd(n.a)));
    });
  }), Q(
    t,
    631
    /* BrtEndCommentAuthors */
  ), Q(
    t,
    633
    /* BrtBeginCommentList */
  ), e.forEach(function(a) {
    a[1].forEach(function(n) {
      n.iauthor = r.indexOf(n.a);
      var i = { s: ar(a[0]), e: ar(a[0]) };
      Q(t, 635, od([i, n])), n.t && n.t.length > 0 && Q(t, 637, Lo(n)), Q(
        t,
        636
        /* BrtEndComment */
      ), delete n.iauthor;
    });
  }), Q(
    t,
    634
    /* BrtEndCommentList */
  ), Q(
    t,
    629
    /* BrtEndComments */
  ), t.end();
}
var vd = "application/vnd.ms-office.vbaProject";
function pd(e) {
  var t = we.utils.cfb_new({ root: "R" });
  return e.FullPaths.forEach(function(r, a) {
    if (!(r.slice(-1) === "/" || !r.match(/_VBA_PROJECT_CUR/))) {
      var n = r.replace(/^[^\/]*/, "R").replace(/\/_VBA_PROJECT_CUR\u0000*/, "");
      we.utils.cfb_add(t, n, e.FileIndex[a].content);
    }
  }), we.write(t);
}
function md(e, t) {
  t.FullPaths.forEach(function(r, a) {
    if (a != 0) {
      var n = r.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
      n.slice(-1) !== "/" && we.utils.cfb_add(e, n, t.FileIndex[a].content);
    }
  });
}
var pc = ["xlsb", "xlsm", "xlam", "biff8", "xla"];
function gd() {
  return { "!type": "dialog" };
}
function _d() {
  return { "!type": "dialog" };
}
function wd() {
  return { "!type": "macro" };
}
function kd() {
  return { "!type": "macro" };
}
var ya = /* @__PURE__ */ function() {
  var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g, t = { r: 0, c: 0 };
  function r(a, n, i, s) {
    var f = !1, c = !1;
    i.length == 0 ? c = !0 : i.charAt(0) == "[" && (c = !0, i = i.slice(1, -1)), s.length == 0 ? f = !0 : s.charAt(0) == "[" && (f = !0, s = s.slice(1, -1));
    var l = i.length > 0 ? parseInt(i, 10) | 0 : 0, o = s.length > 0 ? parseInt(s, 10) | 0 : 0;
    return f ? o += t.c : --o, c ? l += t.r : --l, n + (f ? "" : "$") + tr(o) + (c ? "" : "$") + or(l);
  }
  return function(n, i) {
    return t = i, n.replace(e, r);
  };
}(), ii = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g, si = /* @__PURE__ */ function() {
  return function(t, r) {
    return t.replace(ii, function(a, n, i, s, f, c) {
      var l = $0(s) - (i ? 0 : r.c), o = z0(c) - (f ? 0 : r.r), u = o == 0 ? "" : f ? o + 1 : "[" + o + "]", x = l == 0 ? "" : i ? l + 1 : "[" + l + "]";
      return n + "R" + u + "C" + x;
    });
  };
}();
function mc(e, t) {
  return e.replace(ii, function(r, a, n, i, s, f) {
    return a + (n == "$" ? n + i : tr($0(i) + t.c)) + (s == "$" ? s + f : or(z0(f) + t.r));
  });
}
function Ed(e, t, r) {
  var a = zr(t), n = a.s, i = ar(r), s = { r: i.r - n.r, c: i.c - n.c };
  return mc(e, s);
}
function Td(e) {
  return e.length != 1;
}
function Es(e) {
  return e.replace(/_xlfn\./g, "");
}
function dr(e) {
  e.l += 1;
}
function Ht(e, t) {
  var r = e.read_shift(2);
  return [r & 16383, r >> 14 & 1, r >> 15 & 1];
}
function gc(e, t, r) {
  var a = 2;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5) return _c(e);
    r.biff == 12 && (a = 4);
  }
  var n = e.read_shift(a), i = e.read_shift(a), s = Ht(e), f = Ht(e);
  return { s: { r: n, c: s[0], cRel: s[1], rRel: s[2] }, e: { r: i, c: f[0], cRel: f[1], rRel: f[2] } };
}
function _c(e) {
  var t = Ht(e), r = Ht(e), a = e.read_shift(1), n = e.read_shift(1);
  return { s: { r: t[0], c: a, cRel: t[1], rRel: t[2] }, e: { r: r[0], c: n, cRel: r[1], rRel: r[2] } };
}
function Sd(e, t, r) {
  if (r.biff < 8) return _c(e);
  var a = e.read_shift(r.biff == 12 ? 4 : 2), n = e.read_shift(r.biff == 12 ? 4 : 2), i = Ht(e), s = Ht(e);
  return { s: { r: a, c: i[0], cRel: i[1], rRel: i[2] }, e: { r: n, c: s[0], cRel: s[1], rRel: s[2] } };
}
function wc(e, t, r) {
  if (r && r.biff >= 2 && r.biff <= 5) return Fd(e);
  var a = e.read_shift(r && r.biff == 12 ? 4 : 2), n = Ht(e);
  return { r: a, c: n[0], cRel: n[1], rRel: n[2] };
}
function Fd(e) {
  var t = Ht(e), r = e.read_shift(1);
  return { r: t[0], c: r, cRel: t[1], rRel: t[2] };
}
function yd(e) {
  var t = e.read_shift(2), r = e.read_shift(2);
  return { r: t, c: r & 255, fQuoted: !!(r & 16384), cRel: r >> 15, rRel: r >> 15 };
}
function Ad(e, t, r) {
  var a = r && r.biff ? r.biff : 8;
  if (a >= 2 && a <= 5) return Cd(e);
  var n = e.read_shift(a >= 12 ? 4 : 2), i = e.read_shift(2), s = (i & 16384) >> 14, f = (i & 32768) >> 15;
  if (i &= 16383, f == 1) for (; n > 524287; ) n -= 1048576;
  if (s == 1) for (; i > 8191; ) i = i - 16384;
  return { r: n, c: i, cRel: s, rRel: f };
}
function Cd(e) {
  var t = e.read_shift(2), r = e.read_shift(1), a = (t & 32768) >> 15, n = (t & 16384) >> 14;
  return t &= 16383, a == 1 && t >= 8192 && (t = t - 16384), n == 1 && r >= 128 && (r = r - 256), { r: t, c: r, cRel: n, rRel: a };
}
function Dd(e, t, r) {
  var a = (e[e.l++] & 96) >> 5, n = gc(e, r.biff >= 2 && r.biff <= 5 ? 6 : 8, r);
  return [a, n];
}
function Id(e, t, r) {
  var a = (e[e.l++] & 96) >> 5, n = e.read_shift(2, "i"), i = 8;
  if (r) switch (r.biff) {
    case 5:
      e.l += 12, i = 6;
      break;
    case 12:
      i = 12;
      break;
  }
  var s = gc(e, i, r);
  return [a, n, s];
}
function Od(e, t, r) {
  var a = (e[e.l++] & 96) >> 5;
  return e.l += r && r.biff > 8 ? 12 : r.biff < 8 ? 6 : 8, [a];
}
function Rd(e, t, r) {
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
function bd(e, t, r) {
  var a = (e[e.l++] & 96) >> 5, n = Sd(e, t - 1, r);
  return [a, n];
}
function Nd(e, t, r) {
  var a = (e[e.l++] & 96) >> 5;
  return e.l += r.biff == 2 ? 6 : r.biff == 12 ? 14 : 7, [a];
}
function Ts(e) {
  var t = e[e.l + 1] & 1, r = 1;
  return e.l += 4, [t, r];
}
function Pd(e, t, r) {
  e.l += 2;
  for (var a = e.read_shift(r && r.biff == 2 ? 1 : 2), n = [], i = 0; i <= a; ++i) n.push(e.read_shift(r && r.biff == 2 ? 1 : 2));
  return n;
}
function Ld(e, t, r) {
  var a = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [a, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function Bd(e, t, r) {
  var a = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [a, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function Md(e) {
  var t = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [t, e.read_shift(2)];
}
function Ud(e, t, r) {
  var a = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += r && r.biff == 2 ? 3 : 4, [a];
}
function kc(e) {
  var t = e.read_shift(1), r = e.read_shift(1);
  return [t, r];
}
function Wd(e) {
  return e.read_shift(2), kc(e);
}
function Vd(e) {
  return e.read_shift(2), kc(e);
}
function Hd(e, t, r) {
  var a = (e[e.l] & 96) >> 5;
  e.l += 1;
  var n = wc(e, 0, r);
  return [a, n];
}
function Xd(e, t, r) {
  var a = (e[e.l] & 96) >> 5;
  e.l += 1;
  var n = Ad(e, 0, r);
  return [a, n];
}
function Gd(e, t, r) {
  var a = (e[e.l] & 96) >> 5;
  e.l += 1;
  var n = e.read_shift(2);
  r && r.biff == 5 && (e.l += 12);
  var i = wc(e, 0, r);
  return [a, n, i];
}
function zd(e, t, r) {
  var a = (e[e.l] & 96) >> 5;
  e.l += 1;
  var n = e.read_shift(r && r.biff <= 3 ? 1 : 2);
  return [jv[n], Sc[n], a];
}
function $d(e, t, r) {
  var a = e[e.l++], n = e.read_shift(1), i = r && r.biff <= 3 ? [a == 88 ? -1 : 0, e.read_shift(1)] : Kd(e);
  return [n, (i[0] === 0 ? Sc : Kv)[i[1]]];
}
function Kd(e) {
  return [e[e.l + 1] >> 7, e.read_shift(2) & 32767];
}
function jd(e, t, r) {
  e.l += r && r.biff == 2 ? 3 : 4;
}
function Yd(e, t, r) {
  if (e.l++, r && r.biff == 12) return [e.read_shift(4, "i"), 0];
  var a = e.read_shift(2), n = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [a, n];
}
function Jd(e) {
  return e.l++, Nt[e.read_shift(1)];
}
function qd(e) {
  return e.l++, e.read_shift(2);
}
function Zd(e) {
  return e.l++, e.read_shift(1) !== 0;
}
function Qd(e) {
  return e.l++, Nr(e);
}
function ev(e, t, r) {
  return e.l++, xn(e, t - 1, r);
}
function rv(e, t) {
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
      r[1] = lr(e, 1) ? "TRUE" : "FALSE", t != 12 && (e.l += 7);
      break;
    case 37:
    case 16:
      r[1] = Nt[e[e.l]], e.l += t == 12 ? 4 : 8;
      break;
    case 0:
      e.l += 8;
      break;
    case 1:
      r[1] = Nr(e);
      break;
    case 2:
      r[1] = da(e, 0, { biff: t > 0 && t < 8 ? 2 : t });
      break;
    default:
      throw new Error("Bad SerAr: " + r[0]);
  }
  return r;
}
function tv(e, t, r) {
  for (var a = e.read_shift(r.biff == 12 ? 4 : 2), n = [], i = 0; i != a; ++i) n.push((r.biff == 12 ? xa : Jn)(e));
  return n;
}
function av(e, t, r) {
  var a = 0, n = 0;
  r.biff == 12 ? (a = e.read_shift(4), n = e.read_shift(4)) : (n = 1 + e.read_shift(1), a = 1 + e.read_shift(2)), r.biff >= 2 && r.biff < 8 && (--a, --n == 0 && (n = 256));
  for (var i = 0, s = []; i != a && (s[i] = []); ++i)
    for (var f = 0; f != n; ++f) s[i][f] = rv(e, r.biff);
  return s;
}
function nv(e, t, r) {
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
function iv(e, t, r) {
  if (r.biff == 5) return sv(e);
  var a = e.read_shift(1) >>> 5 & 3, n = e.read_shift(2), i = e.read_shift(4);
  return [a, n, i];
}
function sv(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2, "i");
  e.l += 8;
  var a = e.read_shift(2);
  return e.l += 12, [t, r, a];
}
function fv(e, t, r) {
  var a = e.read_shift(1) >>> 5 & 3;
  e.l += r && r.biff == 2 ? 3 : 4;
  var n = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [a, n];
}
function cv(e, t, r) {
  var a = e.read_shift(1) >>> 5 & 3, n = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [a, n];
}
function lv(e, t, r) {
  var a = e.read_shift(1) >>> 5 & 3;
  return e.l += 4, r.biff < 8 && e.l--, r.biff == 12 && (e.l += 2), [a];
}
function ov(e, t, r) {
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
var uv = Lr, hv = Lr, xv = Lr;
function vn(e, t, r) {
  return e.l += 2, [yd(e)];
}
function fi(e) {
  return e.l += 6, [];
}
var dv = vn, vv = fi, pv = fi, mv = vn;
function Ec(e) {
  return e.l += 2, [pr(e), e.read_shift(2) & 1];
}
var gv = vn, _v = Ec, wv = fi, kv = vn, Ev = vn, Tv = [
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
function Sv(e) {
  e.l += 2;
  var t = e.read_shift(2), r = e.read_shift(2), a = e.read_shift(4), n = e.read_shift(2), i = e.read_shift(2), s = Tv[r >> 2 & 31];
  return { ixti: t, coltype: r & 3, rt: s, idx: a, c: n, C: i };
}
function Fv(e) {
  return e.l += 2, [e.read_shift(4)];
}
function yv(e, t, r) {
  return e.l += 5, e.l += 2, e.l += r.biff == 2 ? 1 : 4, ["PTGSHEET"];
}
function Av(e, t, r) {
  return e.l += r.biff == 2 ? 4 : 5, ["PTGENDSHEET"];
}
function Cv(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function Dv(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function Iv(e) {
  return e.l += 4, [0, 0];
}
var Ss = {
  /*::[*/
  1: { n: "PtgExp", f: Yd },
  /*::[*/
  2: { n: "PtgTbl", f: xv },
  /*::[*/
  3: { n: "PtgAdd", f: dr },
  /*::[*/
  4: { n: "PtgSub", f: dr },
  /*::[*/
  5: { n: "PtgMul", f: dr },
  /*::[*/
  6: { n: "PtgDiv", f: dr },
  /*::[*/
  7: { n: "PtgPower", f: dr },
  /*::[*/
  8: { n: "PtgConcat", f: dr },
  /*::[*/
  9: { n: "PtgLt", f: dr },
  /*::[*/
  10: { n: "PtgLe", f: dr },
  /*::[*/
  11: { n: "PtgEq", f: dr },
  /*::[*/
  12: { n: "PtgGe", f: dr },
  /*::[*/
  13: { n: "PtgGt", f: dr },
  /*::[*/
  14: { n: "PtgNe", f: dr },
  /*::[*/
  15: { n: "PtgIsect", f: dr },
  /*::[*/
  16: { n: "PtgUnion", f: dr },
  /*::[*/
  17: { n: "PtgRange", f: dr },
  /*::[*/
  18: { n: "PtgUplus", f: dr },
  /*::[*/
  19: { n: "PtgUminus", f: dr },
  /*::[*/
  20: { n: "PtgPercent", f: dr },
  /*::[*/
  21: { n: "PtgParen", f: dr },
  /*::[*/
  22: { n: "PtgMissArg", f: dr },
  /*::[*/
  23: { n: "PtgStr", f: ev },
  /*::[*/
  26: { n: "PtgSheet", f: yv },
  /*::[*/
  27: { n: "PtgEndSheet", f: Av },
  /*::[*/
  28: { n: "PtgErr", f: Jd },
  /*::[*/
  29: { n: "PtgBool", f: Zd },
  /*::[*/
  30: { n: "PtgInt", f: qd },
  /*::[*/
  31: { n: "PtgNum", f: Qd },
  /*::[*/
  32: { n: "PtgArray", f: Nd },
  /*::[*/
  33: { n: "PtgFunc", f: zd },
  /*::[*/
  34: { n: "PtgFuncVar", f: $d },
  /*::[*/
  35: { n: "PtgName", f: nv },
  /*::[*/
  36: { n: "PtgRef", f: Hd },
  /*::[*/
  37: { n: "PtgArea", f: Dd },
  /*::[*/
  38: { n: "PtgMemArea", f: fv },
  /*::[*/
  39: { n: "PtgMemErr", f: uv },
  /*::[*/
  40: { n: "PtgMemNoMem", f: hv },
  /*::[*/
  41: { n: "PtgMemFunc", f: cv },
  /*::[*/
  42: { n: "PtgRefErr", f: lv },
  /*::[*/
  43: { n: "PtgAreaErr", f: Od },
  /*::[*/
  44: { n: "PtgRefN", f: Xd },
  /*::[*/
  45: { n: "PtgAreaN", f: bd },
  /*::[*/
  46: { n: "PtgMemAreaN", f: Cv },
  /*::[*/
  47: { n: "PtgMemNoMemN", f: Dv },
  /*::[*/
  57: { n: "PtgNameX", f: iv },
  /*::[*/
  58: { n: "PtgRef3d", f: Gd },
  /*::[*/
  59: { n: "PtgArea3d", f: Id },
  /*::[*/
  60: { n: "PtgRefErr3d", f: ov },
  /*::[*/
  61: { n: "PtgAreaErr3d", f: Rd },
  /*::[*/
  255: {}
}, Ov = {
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
}, Rv = {
  /*::[*/
  1: { n: "PtgElfLel", f: Ec },
  /*::[*/
  2: { n: "PtgElfRw", f: kv },
  /*::[*/
  3: { n: "PtgElfCol", f: dv },
  /*::[*/
  6: { n: "PtgElfRwV", f: Ev },
  /*::[*/
  7: { n: "PtgElfColV", f: mv },
  /*::[*/
  10: { n: "PtgElfRadical", f: gv },
  /*::[*/
  11: { n: "PtgElfRadicalS", f: wv },
  /*::[*/
  13: { n: "PtgElfColS", f: vv },
  /*::[*/
  15: { n: "PtgElfColSV", f: pv },
  /*::[*/
  16: { n: "PtgElfRadicalLel", f: _v },
  /*::[*/
  25: { n: "PtgList", f: Sv },
  /*::[*/
  29: { n: "PtgSxName", f: Fv },
  /*::[*/
  255: {}
}, bv = {
  /*::[*/
  0: { n: "PtgAttrNoop", f: Iv },
  /*::[*/
  1: { n: "PtgAttrSemi", f: Ud },
  /*::[*/
  2: { n: "PtgAttrIf", f: Bd },
  /*::[*/
  4: { n: "PtgAttrChoose", f: Pd },
  /*::[*/
  8: { n: "PtgAttrGoto", f: Ld },
  /*::[*/
  16: { n: "PtgAttrSum", f: jd },
  /*::[*/
  32: { n: "PtgAttrBaxcel", f: Ts },
  /*::[*/
  33: { n: "PtgAttrBaxcel", f: Ts },
  /*::[*/
  64: { n: "PtgAttrSpace", f: Wd },
  /*::[*/
  65: { n: "PtgAttrSpaceSemi", f: Vd },
  /*::[*/
  128: { n: "PtgAttrIfError", f: Md },
  /*::[*/
  255: {}
};
function pn(e, t, r, a) {
  if (a.biff < 8) return Lr(e, t);
  for (var n = e.l + t, i = [], s = 0; s !== r.length; ++s)
    switch (r[s][0]) {
      case "PtgArray":
        r[s][1] = av(e, 0, a), i.push(r[s][1]);
        break;
      case "PtgMemArea":
        r[s][2] = tv(e, r[s][1], a), i.push(r[s][2]);
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
  return t = n - e.l, t !== 0 && i.push(Lr(e, t)), i;
}
function mn(e, t, r) {
  for (var a = e.l + t, n, i, s = []; a != e.l; )
    t = a - e.l, i = e[e.l], n = Ss[i] || Ss[Ov[i]], (i === 24 || i === 25) && (n = (i === 24 ? Rv : bv)[e[e.l + 1]]), !n || !n.f ? Lr(e, t) : s.push([n.n, n.f(e, t, r)]);
  return s;
}
function Nv(e) {
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
var Pv = {
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
function Lv(e, t) {
  if (!e && !(t && t.biff <= 5 && t.biff >= 2)) throw new Error("empty sheet name");
  return /[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e) ? "'" + e + "'" : e;
}
function Tc(e, t, r) {
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
function Fs(e, t, r) {
  var a = Tc(e, t, r);
  return a == "#REF" ? a : Lv(a, r);
}
function Rr(e, t, r, a, n) {
  var i = n && n.biff || 8, s = (
    /*range != null ? range :*/
    { s: { c: 0, r: 0 } }
  ), f = [], c, l, o, u = 0, x = 0, d, v = "";
  if (!e[0] || !e[0][0]) return "";
  for (var h = -1, p = "", k = 0, T = e[0].length; k < T; ++k) {
    var g = e[0][k];
    switch (g[0]) {
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
              p = nr(" ", e[0][h][1][1]);
              break;
            case 1:
              p = nr("\r", e[0][h][1][1]);
              break;
            default:
              if (p = "", n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][h][1][0]);
          }
          l = l + p, h = -1;
        }
        f.push(l + Pv[g[0]] + c);
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
        o = Xa(g[1][1], s, n), f.push(Ga(o, i));
        break;
      case "PtgRefN":
        o = r ? Xa(g[1][1], r, n) : g[1][1], f.push(Ga(o, i));
        break;
      case "PtgRef3d":
        u = /*::Number(*/
        g[1][1], o = Xa(g[1][2], s, n), v = Fs(a, u, n), f.push(v + "!" + Ga(o, i));
        break;
      case "PtgFunc":
      case "PtgFuncVar":
        var D = g[1][0], N = g[1][1];
        D || (D = 0), D &= 127;
        var b = D == 0 ? [] : f.slice(-D);
        f.length -= D, N === "User" && (N = b.shift()), f.push(N + "(" + b.join(",") + ")");
        break;
      case "PtgBool":
        f.push(g[1] ? "TRUE" : "FALSE");
        break;
      case "PtgInt":
        f.push(
          /*::String(*/
          g[1]
          /*::)*/
        );
        break;
      case "PtgNum":
        f.push(String(g[1]));
        break;
      case "PtgStr":
        f.push('"' + g[1].replace(/"/g, '""') + '"');
        break;
      case "PtgErr":
        f.push(
          /*::String(*/
          g[1]
          /*::)*/
        );
        break;
      case "PtgAreaN":
        d = es(g[1][1], r ? { s: r } : s, n), f.push(f0(d, n));
        break;
      case "PtgArea":
        d = es(g[1][1], s, n), f.push(f0(d, n));
        break;
      case "PtgArea3d":
        u = /*::Number(*/
        g[1][1], d = g[1][2], v = Fs(a, u, n), f.push(v + "!" + f0(d, n));
        break;
      case "PtgAttrSum":
        f.push("SUM(" + f.pop() + ")");
        break;
      case "PtgAttrBaxcel":
      case "PtgAttrSemi":
        break;
      case "PtgName":
        x = g[1][2];
        var F = (a.names || [])[x - 1] || (a[0] || [])[x], B = F ? F.Name : "SH33TJSNAME" + String(x);
        B && B.slice(0, 6) == "_xlfn." && !n.xlfn && (B = B.slice(6)), f.push(B);
        break;
      case "PtgNameX":
        var O = g[1][1];
        x = g[1][2];
        var z;
        if (n.biff <= 5)
          O < 0 && (O = -O), a[O] && (z = a[O][x]);
        else {
          var X = "";
          if (((a[O] || [])[0] || [])[0] == 14849 || (((a[O] || [])[0] || [])[0] == 1025 ? a[O][x] && a[O][x].itab > 0 && (X = a.SheetNames[a[O][x].itab - 1] + "!") : X = a.SheetNames[x - 1] + "!"), a[O] && a[O][x]) X += a[O][x].Name;
          else if (a[0] && a[0][x]) X += a[0][x].Name;
          else {
            var L = (Tc(a, O, n) || "").split(";;");
            L[x - 1] ? X = L[x - 1] : X += "SH33TJSERRX";
          }
          f.push(X);
          break;
        }
        z || (z = { Name: "SH33TJSERRY" }), f.push(z.Name);
        break;
      case "PtgParen":
        var te = "(", pe = ")";
        if (h >= 0) {
          switch (p = "", e[0][h][1][0]) {
            case 2:
              te = nr(" ", e[0][h][1][1]) + te;
              break;
            case 3:
              te = nr("\r", e[0][h][1][1]) + te;
              break;
            case 4:
              pe = nr(" ", e[0][h][1][1]) + pe;
              break;
            case 5:
              pe = nr("\r", e[0][h][1][1]) + pe;
              break;
            default:
              if (n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][h][1][0]);
          }
          h = -1;
        }
        f.push(te + f.pop() + pe);
        break;
      case "PtgRefErr":
        f.push("#REF!");
        break;
      case "PtgRefErr3d":
        f.push("#REF!");
        break;
      case "PtgExp":
        o = { c: g[1][1], r: g[1][0] };
        var oe = { c: r.c, r: r.r };
        if (a.sharedf[Fe(o)]) {
          var de = a.sharedf[Fe(o)];
          f.push(Rr(de, s, oe, a, n));
        } else {
          var ve = !1;
          for (c = 0; c != a.arrayf.length; ++c)
            if (l = a.arrayf[c], !(o.c < l[0].s.c || o.c > l[0].e.c) && !(o.r < l[0].s.r || o.r > l[0].e.r)) {
              f.push(Rr(l[1], s, oe, a, n)), ve = !0;
              break;
            }
          ve || f.push(
            /*::String(*/
            g[1]
            /*::)*/
          );
        }
        break;
      case "PtgArray":
        f.push("{" + Nv(
          /*::(*/
          g[1]
          /*:: :any)*/
        ) + "}");
        break;
      case "PtgMemArea":
        break;
      case "PtgAttrSpace":
      case "PtgAttrSpaceSemi":
        h = k;
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
        f.push("Table" + g[1].idx + "[#" + g[1].rt + "]");
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
        throw new Error("Unrecognized Formula Token: " + String(g));
      default:
        throw new Error("Unrecognized Formula Token: " + String(g));
    }
    var Ie = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
    if (n.biff != 3 && h >= 0 && Ie.indexOf(e[0][k][0]) == -1) {
      g = e[0][h];
      var U = !0;
      switch (g[1][0]) {
        case 4:
          U = !1;
        case 0:
          p = nr(" ", g[1][1]);
          break;
        case 5:
          U = !1;
        case 1:
          p = nr("\r", g[1][1]);
          break;
        default:
          if (p = "", n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + g[1][0]);
      }
      f.push((U ? p : "") + f.pop() + (U ? "" : p)), h = -1;
    }
  }
  if (f.length > 1 && n.WTF) throw new Error("bad formula stack");
  return f[0];
}
function Bv(e, t, r) {
  var a = e.l + t, n = r.biff == 2 ? 1 : 2, i, s = e.read_shift(n);
  if (s == 65535) return [[], Lr(e, t - 2)];
  var f = mn(e, s, r);
  return t !== s + n && (i = pn(e, t - s - n, f, r)), e.l = a, [f, i];
}
function Mv(e, t, r) {
  var a = e.l + t, n = r.biff == 2 ? 1 : 2, i, s = e.read_shift(n);
  if (s == 65535) return [[], Lr(e, t - 2)];
  var f = mn(e, s, r);
  return t !== s + n && (i = pn(e, t - s - n, f, r)), e.l = a, [f, i];
}
function Uv(e, t, r, a) {
  var n = e.l + t, i = mn(e, a, r), s;
  return n !== e.l && (s = pn(e, n - e.l, i, r)), [i, s];
}
function Wv(e, t, r) {
  var a = e.l + t, n, i = e.read_shift(2), s = mn(e, i, r);
  return i == 65535 ? [[], Lr(e, t - 2)] : (t !== i + 2 && (n = pn(e, a - i - 2, s, r)), [s, n]);
}
function Vv(e) {
  var t;
  if (At(e, e.l + 6) !== 65535) return [Nr(e), "n"];
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
function Hv(e) {
  if (e == null) {
    var t = K(8);
    return t.write_shift(1, 3), t.write_shift(1, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 65535), t;
  } else if (typeof e == "number") return ia(e);
  return ia(0);
}
function h0(e, t, r) {
  var a = e.l + t, n = Ft(e);
  r.biff == 2 && ++e.l;
  var i = Vv(e), s = e.read_shift(1);
  r.biff != 2 && (e.read_shift(1), r.biff >= 5 && e.read_shift(4));
  var f = Mv(e, a - e.l, r);
  return { cell: n, val: i[0], formula: f, shared: s >> 3 & 1, tt: i[1] };
}
function Xv(e, t, r, a, n) {
  var i = fa(t, r, n), s = Hv(e.v), f = K(6), c = 33;
  f.write_shift(2, c), f.write_shift(4, 0);
  for (var l = K(e.bf.length), o = 0; o < e.bf.length; ++o) l[o] = e.bf[o];
  var u = Er([i, s, f, l]);
  return u;
}
function qn(e, t, r) {
  var a = e.read_shift(4), n = mn(e, a, r), i = e.read_shift(4), s = i > 0 ? pn(e, i, n, r) : null;
  return [n, s];
}
var Gv = qn, Zn = qn, zv = qn, $v = qn, Kv = {
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
}, Sc = {
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
}, jv = {
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
function ys(e) {
  return e.slice(0, 3) == "of:" && (e = e.slice(3)), e.charCodeAt(0) == 61 && (e = e.slice(1), e.charCodeAt(0) == 61 && (e = e.slice(1))), e = e.replace(/COM\.MICROSOFT\./g, ""), e = e.replace(/\[((?:\.[A-Z]+[0-9]+)(?::\.[A-Z]+[0-9]+)?)\]/g, function(t, r) {
    return r.replace(/\./g, "");
  }), e = e.replace(/\[.(#[A-Z]*[?!])\]/g, "$1"), e.replace(/[;~]/g, ",").replace(/\|/g, ";");
}
function Yv(e) {
  var t = "of:=" + e.replace(ii, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
  return t.replace(/;/g, "|").replace(/,/g, ";");
}
function x0(e) {
  var t = e.split(":"), r = t[0].split(".")[0];
  return [r, t[0].split(".")[1] + (t.length > 1 ? ":" + (t[1].split(".")[1] || t[1].split(".")[0]) : "")];
}
function Jv(e) {
  return e.replace(/\./, "!");
}
var $a = {}, Aa = {}, Ka = typeof Map < "u";
function ci(e, t, r) {
  var a = 0, n = e.length;
  if (r) {
    if (Ka ? r.has(t) : Object.prototype.hasOwnProperty.call(r, t)) {
      for (var i = Ka ? r.get(t) : r[t]; a < i.length; ++a)
        if (e[i[a]].t === t)
          return e.Count++, i[a];
    }
  } else for (; a < n; ++a)
    if (e[a].t === t)
      return e.Count++, a;
  return e[n] = { t }, e.Count++, e.Unique++, r && (Ka ? (r.has(t) || r.set(t, []), r.get(t).push(n)) : (Object.prototype.hasOwnProperty.call(r, t) || (r[t] = []), r[t].push(n))), n;
}
function Qn(e, t) {
  var r = { min: e + 1, max: e + 1 }, a = -1;
  return t.MDW && (br = t.MDW), t.width != null ? r.customWidth = 1 : t.wpx != null ? a = sn(t.wpx) : t.wch != null && (a = t.wch), a > -1 ? (r.width = Xn(a), r.customWidth = 1) : t.width != null && (r.width = t.width), t.hidden && (r.hidden = !0), t.level != null && (r.outlineLevel = r.level = t.level), r;
}
function ta(e, t) {
  if (e) {
    var r = [0.7, 0.7, 0.75, 0.75, 0.3, 0.3];
    t == "xlml" && (r = [1, 1, 1, 1, 0.5, 0.5]), e.left == null && (e.left = r[0]), e.right == null && (e.right = r[1]), e.top == null && (e.top = r[2]), e.bottom == null && (e.bottom = r[3]), e.header == null && (e.header = r[4]), e.footer == null && (e.footer = r[5]);
  }
}
function $t(e, t, r) {
  var a = r.revssf[t.z != null ? t.z : "General"], n = 60, i = e.length;
  if (a == null && r.ssf) {
    for (; n < 392; ++n) if (r.ssf[n] == null) {
      Dt(t.z, n), r.ssf[n] = t.z, r.revssf[t.z] = a = n;
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
function Fc(e, t, r, a, n, i) {
  try {
    a.cellNF && (e.z = Te[t]);
  } catch (f) {
    if (a.WTF) throw f;
  }
  if (!(e.t === "z" && !a.cellStyles)) {
    if (e.t === "d" && typeof e.v == "string" && (e.v = qe(e.v)), (!a || a.cellText !== !1) && e.t !== "z") try {
      if (Te[t] == null && Dt($l[t] || "General", t), e.t === "e") e.w = e.w || Nt[e.v];
      else if (t === 0)
        if (e.t === "n")
          (e.v | 0) === e.v ? e.w = e.v.toString(10) : e.w = Za(e.v);
        else if (e.t === "d") {
          var s = wr(e.v);
          (s | 0) === s ? e.w = s.toString(10) : e.w = Za(s);
        } else {
          if (e.v === void 0) return "";
          e.w = aa(e.v, Aa);
        }
      else e.t === "d" ? e.w = ft(t, wr(e.v), Aa) : e.w = ft(t, e.v, Aa);
    } catch (f) {
      if (a.WTF) throw f;
    }
    if (a.cellStyles && r != null)
      try {
        e.s = i.Fills[r], e.s.fgColor && e.s.fgColor.theme && !e.s.fgColor.rgb && (e.s.fgColor.rgb = Hn(n.themeElements.clrScheme[e.s.fgColor.theme].rgb, e.s.fgColor.tint || 0), a.WTF && (e.s.fgColor.raw_rgb = n.themeElements.clrScheme[e.s.fgColor.theme].rgb)), e.s.bgColor && e.s.bgColor.theme && (e.s.bgColor.rgb = Hn(n.themeElements.clrScheme[e.s.bgColor.theme].rgb, e.s.bgColor.tint || 0), a.WTF && (e.s.bgColor.raw_rgb = n.themeElements.clrScheme[e.s.bgColor.theme].rgb));
      } catch (f) {
        if (a.WTF && i.Fills) throw f;
      }
  }
}
function qv(e, t, r) {
  if (e && e["!ref"]) {
    var a = Ue(e["!ref"]);
    if (a.e.c < a.s.c || a.e.r < a.s.r) throw new Error("Bad range (" + r + "): " + e["!ref"]);
  }
}
function Zv(e, t) {
  var r = Ue(t);
  r.s.r <= r.e.r && r.s.c <= r.e.c && r.s.r >= 0 && r.s.c >= 0 && (e["!ref"] = De(r));
}
var Qv = /<(?:\w:)?mergeCell ref="[A-Z0-9:]+"\s*[\/]?>/g, ep = /<(?:\w+:)?sheetData[^>]*>([\s\S]*)<\/(?:\w+:)?sheetData>/, rp = /<(?:\w:)?hyperlink [^>]*>/mg, tp = /"(\w*:\w*)"/, ap = /<(?:\w:)?col\b[^>]*[\/]?>/g, np = /<(?:\w:)?autoFilter[^>]*([\/]|>([\s\S]*)<\/(?:\w:)?autoFilter)>/g, ip = /<(?:\w:)?pageMargins[^>]*\/>/g, yc = /<(?:\w:)?sheetPr\b(?:[^>a-z][^>]*)?\/>/, sp = /<(?:\w:)?sheetPr[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetPr)>/, fp = /<(?:\w:)?sheetViews[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetViews)>/;
function cp(e, t, r, a, n, i, s) {
  if (!e) return e;
  a || (a = { "!id": {} });
  var f = t.dense ? [] : {}, c = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } }, l = "", o = "", u = e.match(ep);
  u ? (l = e.slice(0, u.index), o = e.slice(u.index + u[0].length)) : l = o = e;
  var x = l.match(yc);
  x ? li(x[0], f, n, r) : (x = l.match(sp)) && op(x[0], x[1] || "", f, n, r);
  var d = (l.match(/<(?:\w*:)?dimension/) || { index: -1 }).index;
  if (d > 0) {
    var v = l.slice(d, d + 50).match(tp);
    v && Zv(f, v[1]);
  }
  var h = l.match(fp);
  h && h[1] && Tp(h[1], n);
  var p = [];
  if (t.cellStyles) {
    var k = l.match(ap);
    k && gp(p, k);
  }
  u && yp(u[1], f, t, c, i, s);
  var T = o.match(np);
  T && (f["!autofilter"] = wp(T[0]));
  var g = [], D = o.match(Qv);
  if (D) for (d = 0; d != D.length; ++d)
    g[d] = Ue(D[d].slice(D[d].indexOf('"') + 1));
  var N = o.match(rp);
  N && vp(f, N, a);
  var b = o.match(ip);
  if (b && (f["!margins"] = pp(ye(b[0]))), !f["!ref"] && c.e.c >= c.s.c && c.e.r >= c.s.r && (f["!ref"] = De(c)), t.sheetRows > 0 && f["!ref"]) {
    var F = Ue(f["!ref"]);
    t.sheetRows <= +F.e.r && (F.e.r = t.sheetRows - 1, F.e.r > c.e.r && (F.e.r = c.e.r), F.e.r < F.s.r && (F.s.r = F.e.r), F.e.c > c.e.c && (F.e.c = c.e.c), F.e.c < F.s.c && (F.s.c = F.e.c), f["!fullref"] = f["!ref"], f["!ref"] = De(F));
  }
  return p.length > 0 && (f["!cols"] = p), g.length > 0 && (f["!merges"] = g), f;
}
function lp(e) {
  if (e.length === 0) return "";
  for (var t = '<mergeCells count="' + e.length + '">', r = 0; r != e.length; ++r) t += '<mergeCell ref="' + De(e[r]) + '"/>';
  return t + "</mergeCells>";
}
function li(e, t, r, a) {
  var n = ye(e);
  r.Sheets[a] || (r.Sheets[a] = {}), n.codeName && (r.Sheets[a].CodeName = Me(ze(n.codeName)));
}
function op(e, t, r, a, n) {
  li(e.slice(0, e.indexOf(">")), r, a, n);
}
function up(e, t, r, a, n) {
  var i = !1, s = {}, f = null;
  if (a.bookType !== "xlsx" && t.vbaraw) {
    var c = t.SheetNames[r];
    try {
      t.Workbook && (c = t.Workbook.Sheets[r].CodeName || c);
    } catch {
    }
    i = !0, s.codeName = Tt(Ge(c));
  }
  if (e && e["!outline"]) {
    var l = { summaryBelow: 1, summaryRight: 1 };
    e["!outline"].above && (l.summaryBelow = 0), e["!outline"].left && (l.summaryRight = 0), f = (f || "") + ue("outlinePr", null, l);
  }
  !i && !f || (n[n.length] = ue("sheetPr", f, s));
}
var hp = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"], xp = [
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
function dp(e) {
  var t = { sheet: 1 };
  return hp.forEach(function(r) {
    e[r] != null && e[r] && (t[r] = "1");
  }), xp.forEach(function(r) {
    e[r] != null && !e[r] && (t[r] = "0");
  }), e.password && (t.password = ti(e.password).toString(16).toUpperCase()), ue("sheetProtection", null, t);
}
function vp(e, t, r) {
  for (var a = Array.isArray(e), n = 0; n != t.length; ++n) {
    var i = ye(ze(t[n]), !0);
    if (!i.ref) return;
    var s = ((r || {})["!id"] || [])[i.id];
    s ? (i.Target = s.Target, i.location && (i.Target += "#" + Me(i.location))) : (i.Target = "#" + Me(i.location), s = { Target: i.Target, TargetMode: "Internal" }), i.Rel = s, i.tooltip && (i.Tooltip = i.tooltip, delete i.tooltip);
    for (var f = Ue(i.ref), c = f.s.r; c <= f.e.r; ++c) for (var l = f.s.c; l <= f.e.c; ++l) {
      var o = Fe({ c: l, r: c });
      a ? (e[c] || (e[c] = []), e[c][l] || (e[c][l] = { t: "z", v: void 0 }), e[c][l].l = i) : (e[o] || (e[o] = { t: "z", v: void 0 }), e[o].l = i);
    }
  }
}
function pp(e) {
  var t = {};
  return ["left", "right", "top", "bottom", "header", "footer"].forEach(function(r) {
    e[r] && (t[r] = parseFloat(e[r]));
  }), t;
}
function mp(e) {
  return ta(e), ue("pageMargins", null, e);
}
function gp(e, t) {
  for (var r = !1, a = 0; a != t.length; ++a) {
    var n = ye(t[a], !0);
    n.hidden && (n.hidden = Je(n.hidden));
    var i = parseInt(n.min, 10) - 1, s = parseInt(n.max, 10) - 1;
    for (n.outlineLevel && (n.level = +n.outlineLevel || 0), delete n.min, delete n.max, n.width = +n.width, !r && n.width && (r = !0, ai(n.width)), Vt(n); i <= s; ) e[i++] = Ze(n);
  }
}
function _p(e, t) {
  for (var r = ["<cols>"], a, n = 0; n != t.length; ++n)
    (a = t[n]) && (r[r.length] = ue("col", null, Qn(n, a)));
  return r[r.length] = "</cols>", r.join("");
}
function wp(e) {
  var t = { ref: (e.match(/ref="([^"]*)"/) || [])[1] };
  return t;
}
function kp(e, t, r, a) {
  var n = typeof e.ref == "string" ? e.ref : De(e.ref);
  r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
  var i = r.Workbook.Names, s = zr(n);
  s.s.r == s.e.r && (s.e.r = zr(t["!ref"]).e.r, n = De(s));
  for (var f = 0; f < i.length; ++f) {
    var c = i[f];
    if (c.Name == "_xlnm._FilterDatabase" && c.Sheet == a) {
      c.Ref = "'" + r.SheetNames[a] + "'!" + n;
      break;
    }
  }
  return f == i.length && i.push({ Name: "_xlnm._FilterDatabase", Sheet: a, Ref: "'" + r.SheetNames[a] + "'!" + n }), ue("autoFilter", null, { ref: n });
}
var Ep = /<(?:\w:)?sheetView(?:[^>a-z][^>]*)?\/?>/;
function Tp(e, t) {
  t.Views || (t.Views = [{}]), (e.match(Ep) || []).forEach(function(r, a) {
    var n = ye(r);
    t.Views[a] || (t.Views[a] = {}), +n.zoomScale && (t.Views[a].zoom = +n.zoomScale), Je(n.rightToLeft) && (t.Views[a].RTL = !0);
  });
}
function Sp(e, t, r, a) {
  var n = { workbookViewId: "0" };
  return (((a || {}).Workbook || {}).Views || [])[0] && (n.rightToLeft = a.Workbook.Views[0].RTL ? "1" : "0"), ue("sheetViews", ue("sheetView", null, n), {});
}
function Fp(e, t, r, a) {
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
      n = Nt[e.v];
      break;
    case "d":
      a && a.cellDates ? n = qe(e.v, -1).toISOString() : (e = Ze(e), e.t = "n", n = "" + (e.v = wr(qe(e.v)))), typeof e.z > "u" && (e.z = Te[14]);
      break;
    default:
      n = e.v;
      break;
  }
  var f = yr("v", Ge(n)), c = { r: t }, l = $t(a.cellXfs, e, a);
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
        f = yr("v", "" + ci(a.Strings, e.v, a.revStrings)), c.t = "s";
        break;
      }
      c.t = "str";
      break;
  }
  if (e.t != i && (e.t = i, e.v = s), typeof e.f == "string" && e.f) {
    var o = e.F && e.F.slice(0, t.length) == t ? { t: "array", ref: e.F } : null;
    f = ue("f", Ge(e.f), o) + (e.v != null ? f : "");
  }
  return e.l && r["!links"].push([t, e.l]), e.D && (c.cm = 1), ue("c", f, c);
}
var yp = /* @__PURE__ */ function() {
  var e = /<(?:\w+:)?c[ \/>]/, t = /<\/(?:\w+:)?row>/, r = /r=["']([^"']*)["']/, a = /<(?:\w+:)?is>([\S\s]*?)<\/(?:\w+:)?is>/, n = /ref=["']([^"']*)["']/, i = Qa("v"), s = Qa("f");
  return function(c, l, o, u, x, d) {
    for (var v = 0, h = "", p = [], k = [], T = 0, g = 0, D = 0, N = "", b, F, B = 0, O = 0, z, X, L = 0, te = 0, pe = Array.isArray(d.CellXf), oe, de = [], ve = [], Ie = Array.isArray(l), U = [], Ee = {}, Se = !1, C = !!o.sheetStubs, P = c.split(t), I = 0, R = P.length; I != R; ++I) {
      h = P[I].trim();
      var Y = h.length;
      if (Y !== 0) {
        var fe = 0;
        e: for (v = 0; v < Y; ++v) switch (
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
              if (F = ye(h.slice(fe, v), !0), B = F.r != null ? parseInt(F.r, 10) : B + 1, O = -1, o.sheetRows && o.sheetRows < B) continue;
              Ee = {}, Se = !1, F.ht && (Se = !0, Ee.hpt = parseFloat(F.ht), Ee.hpx = Ia(Ee.hpt)), F.hidden == "1" && (Se = !0, Ee.hidden = !0), F.outlineLevel != null && (Se = !0, Ee.level = +F.outlineLevel), Se && (U[B - 1] = Ee);
            }
            break;
          case "<":
            fe = v;
            break;
        }
        if (fe >= v) break;
        if (F = ye(h.slice(fe, v), !0), B = F.r != null ? parseInt(F.r, 10) : B + 1, O = -1, !(o.sheetRows && o.sheetRows < B)) {
          u.s.r > B - 1 && (u.s.r = B - 1), u.e.r < B - 1 && (u.e.r = B - 1), o && o.cellStyles && (Ee = {}, Se = !1, F.ht && (Se = !0, Ee.hpt = parseFloat(F.ht), Ee.hpx = Ia(Ee.hpt)), F.hidden == "1" && (Se = !0, Ee.hidden = !0), F.outlineLevel != null && (Se = !0, Ee.level = +F.outlineLevel), Se && (U[B - 1] = Ee)), p = h.slice(v).split(e);
          for (var ce = 0; ce != p.length && p[ce].trim().charAt(0) == "<"; ++ce) ;
          for (p = p.slice(ce), v = 0; v != p.length; ++v)
            if (h = p[v].trim(), h.length !== 0) {
              if (k = h.match(r), T = v, g = 0, D = 0, h = "<c " + (h.slice(0, 1) == "<" ? ">" : "") + h, k != null && k.length === 2) {
                for (T = 0, N = k[1], g = 0; g != N.length && !((D = N.charCodeAt(g) - 64) < 1 || D > 26); ++g)
                  T = 26 * T + D;
                --T, O = T;
              } else ++O;
              for (g = 0; g != h.length && h.charCodeAt(g) !== 62; ++g) ;
              if (++g, F = ye(h.slice(0, g), !0), F.r || (F.r = Fe({ r: B - 1, c: O })), N = h.slice(g), b = { t: "" }, (k = N.match(i)) != null && /*::cref != null && */
              k[1] !== "" && (b.v = Me(k[1])), o.cellFormula) {
                if ((k = N.match(s)) != null && /*::cref != null && */
                k[1] !== "") {
                  if (b.f = Me(ze(k[1])).replace(/\r\n/g, `
`), o.xlfn || (b.f = Es(b.f)), /*::cref != null && cref[0] != null && */
                  k[0].indexOf('t="array"') > -1)
                    b.F = (N.match(n) || [])[1], b.F.indexOf(":") > -1 && de.push([Ue(b.F), b.F]);
                  else if (
                    /*::cref != null && cref[0] != null && */
                    k[0].indexOf('t="shared"') > -1
                  ) {
                    X = ye(k[0]);
                    var ie = Me(ze(k[1]));
                    o.xlfn || (ie = Es(ie)), ve[parseInt(X.si, 10)] = [X, ie, F.r];
                  }
                } else (k = N.match(/<f[^>]*\/>/)) && (X = ye(k[0]), ve[X.si] && (b.f = Ed(ve[X.si][1], ve[X.si][2], F.r)));
                var ne = ar(F.r);
                for (g = 0; g < de.length; ++g)
                  ne.r >= de[g][0].s.r && ne.r <= de[g][0].e.r && ne.c >= de[g][0].s.c && ne.c <= de[g][0].e.c && (b.F = de[g][1]);
              }
              if (F.t == null && b.v === void 0)
                if (b.f || b.F)
                  b.v = 0, b.t = "n";
                else if (C) b.t = "z";
                else continue;
              else b.t = F.t || "n";
              switch (u.s.c > O && (u.s.c = O), u.e.c < O && (u.e.c = O), b.t) {
                case "n":
                  if (b.v == "" || b.v == null) {
                    if (!C) continue;
                    b.t = "z";
                  } else b.v = parseFloat(b.v);
                  break;
                case "s":
                  if (typeof b.v > "u") {
                    if (!C) continue;
                    b.t = "z";
                  } else
                    z = $a[parseInt(b.v, 10)], b.v = z.t, b.r = z.r, o.cellHTML && (b.h = z.h);
                  break;
                case "str":
                  b.t = "s", b.v = b.v != null ? ze(b.v) : "", o.cellHTML && (b.h = V0(b.v));
                  break;
                case "inlineStr":
                  k = N.match(a), b.t = "s", k != null && (z = ri(k[1])) ? (b.v = z.t, o.cellHTML && (b.h = z.h)) : b.v = "";
                  break;
                case "b":
                  b.v = Je(b.v);
                  break;
                case "d":
                  o.cellDates ? b.v = qe(b.v, 1) : (b.v = wr(qe(b.v, 1)), b.t = "n");
                  break;
                case "e":
                  (!o || o.cellText !== !1) && (b.w = b.v), b.v = Cf[b.v];
                  break;
              }
              if (L = te = 0, oe = null, pe && F.s !== void 0 && (oe = d.CellXf[F.s], oe != null && (oe.numFmtId != null && (L = oe.numFmtId), o.cellStyles && oe.fillId != null && (te = oe.fillId))), Fc(b, L, te, o, x, d), o.cellDates && pe && b.t == "n" && Oa(Te[L]) && (b.t = "d", b.v = Yn(b.v)), F.cm && o.xlmeta) {
                var Ae = (o.xlmeta.Cell || [])[+F.cm - 1];
                Ae && Ae.type == "XLDAPR" && (b.D = !0);
              }
              if (Ie) {
                var A = ar(F.r);
                l[A.r] || (l[A.r] = []), l[A.r][A.c] = b;
              } else l[F.r] = b;
            }
        }
      }
    }
    U.length > 0 && (l["!rows"] = U);
  };
}();
function Ap(e, t, r, a) {
  var n = [], i = [], s = Ue(e["!ref"]), f = "", c, l = "", o = [], u = 0, x = 0, d = e["!rows"], v = Array.isArray(e), h = { r: l }, p, k = -1;
  for (x = s.s.c; x <= s.e.c; ++x) o[x] = tr(x);
  for (u = s.s.r; u <= s.e.r; ++u) {
    for (i = [], l = or(u), x = s.s.c; x <= s.e.c; ++x) {
      c = o[x] + l;
      var T = v ? (e[u] || [])[x] : e[c];
      T !== void 0 && (f = Fp(T, c, e, t)) != null && i.push(f);
    }
    (i.length > 0 || d && d[u]) && (h = { r: l }, d && d[u] && (p = d[u], p.hidden && (h.hidden = 1), k = -1, p.hpx ? k = fn(p.hpx) : p.hpt && (k = p.hpt), k > -1 && (h.ht = k, h.customHeight = 1), p.level && (h.outlineLevel = p.level)), n[n.length] = ue("row", i.join(""), h));
  }
  if (d) for (; u < d.length; ++u)
    d && d[u] && (h = { r: u + 1 }, p = d[u], p.hidden && (h.hidden = 1), k = -1, p.hpx ? k = fn(p.hpx) : p.hpt && (k = p.hpt), k > -1 && (h.ht = k, h.customHeight = 1), p.level && (h.outlineLevel = p.level), n[n.length] = ue("row", "", h));
  return n.join("");
}
function Ac(e, t, r, a) {
  var n = [ur, ue("worksheet", null, {
    xmlns: la[0],
    "xmlns:r": _r.r
  })], i = r.SheetNames[e], s = 0, f = "", c = r.Sheets[i];
  c == null && (c = {});
  var l = c["!ref"] || "A1", o = Ue(l);
  if (o.e.c > 16383 || o.e.r > 1048575) {
    if (t.WTF) throw new Error("Range " + l + " exceeds format limit A1:XFD1048576");
    o.e.c = Math.min(o.e.c, 16383), o.e.r = Math.min(o.e.c, 1048575), l = De(o);
  }
  a || (a = {}), c["!comments"] = [];
  var u = [];
  up(c, r, e, t, n), n[n.length] = ue("dimension", null, { ref: l }), n[n.length] = Sp(c, t, e, r), t.sheetFormat && (n[n.length] = ue("sheetFormatPr", null, {
    defaultRowHeight: t.sheetFormat.defaultRowHeight || "16",
    baseColWidth: t.sheetFormat.baseColWidth || "10",
    outlineLevelRow: t.sheetFormat.outlineLevelRow || "7"
  })), c["!cols"] != null && c["!cols"].length > 0 && (n[n.length] = _p(c, c["!cols"])), n[s = n.length] = "<sheetData/>", c["!links"] = [], c["!ref"] != null && (f = Ap(c, t), f.length > 0 && (n[n.length] = f)), n.length > s + 1 && (n[n.length] = "</sheetData>", n[s] = n[s].replace("/>", ">")), c["!protect"] && (n[n.length] = dp(c["!protect"])), c["!autofilter"] != null && (n[n.length] = kp(c["!autofilter"], c, r, e)), c["!merges"] != null && c["!merges"].length > 0 && (n[n.length] = lp(c["!merges"]));
  var x = -1, d, v = -1;
  return (
    /*::(*/
    c["!links"].length > 0 && (n[n.length] = "<hyperlinks>", c["!links"].forEach(function(h) {
      h[1].Target && (d = { ref: h[0] }, h[1].Target.charAt(0) != "#" && (v = Xe(a, -1, Ge(h[1].Target).replace(/#.*$/, ""), Be.HLINK), d["r:id"] = "rId" + v), (x = h[1].Target.indexOf("#")) > -1 && (d.location = Ge(h[1].Target.slice(x + 1))), h[1].Tooltip && (d.tooltip = Ge(h[1].Tooltip)), n[n.length] = ue("hyperlink", null, d));
    }), n[n.length] = "</hyperlinks>"), delete c["!links"], c["!margins"] != null && (n[n.length] = mp(c["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && (n[n.length] = yr("ignoredErrors", ue("ignoredError", null, { numberStoredAsText: 1, sqref: l }))), u.length > 0 && (v = Xe(a, -1, "../drawings/drawing" + (e + 1) + ".xml", Be.DRAW), n[n.length] = ue("drawing", null, { "r:id": "rId" + v }), c["!drawing"] = u), c["!comments"].length > 0 && (v = Xe(a, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", Be.VML), n[n.length] = ue("legacyDrawing", null, { "r:id": "rId" + v }), c["!legacy"] = v), n.length > 1 && (n[n.length] = "</worksheet>", n[1] = n[1].replace("/>", ">")), n.join("")
  );
}
function Cp(e, t) {
  var r = {}, a = e.l + t;
  r.r = e.read_shift(4), e.l += 4;
  var n = e.read_shift(2);
  e.l += 1;
  var i = e.read_shift(1);
  return e.l = a, i & 7 && (r.level = i & 7), i & 16 && (r.hidden = !0), i & 32 && (r.hpt = n / 20), r;
}
function Dp(e, t, r) {
  var a = K(145), n = (r["!rows"] || [])[e] || {};
  a.write_shift(4, e), a.write_shift(4, 0);
  var i = 320;
  n.hpx ? i = fn(n.hpx) * 20 : n.hpt && (i = n.hpt * 20), a.write_shift(2, i), a.write_shift(1, 0);
  var s = 0;
  n.level && (s |= n.level), n.hidden && (s |= 16), (n.hpx || n.hpt) && (s |= 32), a.write_shift(1, s), a.write_shift(1, 0);
  var f = 0, c = a.l;
  a.l += 4;
  for (var l = { r: e, c: 0 }, o = 0; o < 16; ++o)
    if (!(t.s.c > o + 1 << 10 || t.e.c < o << 10)) {
      for (var u = -1, x = -1, d = o << 10; d < o + 1 << 10; ++d) {
        l.c = d;
        var v = Array.isArray(r) ? (r[l.r] || [])[l.c] : r[Fe(l)];
        v && (u < 0 && (u = d), x = d);
      }
      u < 0 || (++f, a.write_shift(4, u), a.write_shift(4, x));
    }
  var h = a.l;
  return a.l = c, a.write_shift(4, f), a.l = h, a.length > a.l ? a.slice(0, a.l) : a;
}
function Ip(e, t, r, a) {
  var n = Dp(a, r, t);
  (n.length > 17 || (t["!rows"] || [])[a]) && Q(e, 0, n);
}
var Op = xa, Rp = Na;
function bp() {
}
function Np(e, t) {
  var r = {}, a = e[e.l];
  return ++e.l, r.above = !(a & 64), r.left = !(a & 128), e.l += 18, r.name = Bo(e), r;
}
function Pp(e, t, r) {
  r == null && (r = K(84 + 4 * e.length));
  var a = 192;
  t && (t.above && (a &= -65), t.left && (a &= -129)), r.write_shift(1, a);
  for (var n = 1; n < 3; ++n) r.write_shift(1, 0);
  return Un({ auto: 1 }, r), r.write_shift(-4, -1), r.write_shift(-4, -1), Tf(e, r), r.slice(0, r.l);
}
function Lp(e) {
  var t = ct(e);
  return [t];
}
function Bp(e, t, r) {
  return r == null && (r = K(8)), oa(t, r);
}
function Mp(e) {
  var t = ua(e);
  return [t];
}
function Up(e, t, r) {
  return r == null && (r = K(4)), ha(t, r);
}
function Wp(e) {
  var t = ct(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function Vp(e, t, r) {
  return r == null && (r = K(9)), oa(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function Hp(e) {
  var t = ua(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function Xp(e, t, r) {
  return r == null && (r = K(5)), ha(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function Gp(e) {
  var t = ct(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function zp(e, t, r) {
  return r == null && (r = K(9)), oa(t, r), r.write_shift(1, e.v), r;
}
function $p(e) {
  var t = ua(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function Kp(e, t, r) {
  return r == null && (r = K(8)), ha(t, r), r.write_shift(1, e.v), r.write_shift(2, 0), r.write_shift(1, 0), r;
}
function jp(e) {
  var t = ct(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function Yp(e, t, r) {
  return r == null && (r = K(12)), oa(t, r), r.write_shift(4, t.v), r;
}
function Jp(e) {
  var t = ua(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function qp(e, t, r) {
  return r == null && (r = K(8)), ha(t, r), r.write_shift(4, t.v), r;
}
function Zp(e) {
  var t = ct(e), r = Nr(e);
  return [t, r, "n"];
}
function Qp(e, t, r) {
  return r == null && (r = K(16)), oa(t, r), ia(e.v, r), r;
}
function Cc(e) {
  var t = ua(e), r = Nr(e);
  return [t, r, "n"];
}
function em(e, t, r) {
  return r == null && (r = K(12)), ha(t, r), ia(e.v, r), r;
}
function rm(e) {
  var t = ct(e), r = J0(e);
  return [t, r, "n"];
}
function tm(e, t, r) {
  return r == null && (r = K(12)), oa(t, r), Sf(e.v, r), r;
}
function am(e) {
  var t = ua(e), r = J0(e);
  return [t, r, "n"];
}
function nm(e, t, r) {
  return r == null && (r = K(8)), ha(t, r), Sf(e.v, r), r;
}
function im(e) {
  var t = ct(e), r = K0(e);
  return [t, r, "is"];
}
function sm(e) {
  var t = ct(e), r = Pr(e);
  return [t, r, "str"];
}
function fm(e, t, r) {
  return r == null && (r = K(12 + 4 * e.v.length)), oa(t, r), Tr(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function cm(e) {
  var t = ua(e), r = Pr(e);
  return [t, r, "str"];
}
function lm(e, t, r) {
  return r == null && (r = K(8 + 4 * e.v.length)), ha(t, r), Tr(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function om(e, t, r) {
  var a = e.l + t, n = ct(e);
  n.r = r["!row"];
  var i = e.read_shift(1), s = [n, i, "b"];
  if (r.cellFormula) {
    e.l += 2;
    var f = Zn(e, a - e.l, r);
    s[3] = Rr(f, null, n, r.supbooks, r);
  } else e.l = a;
  return s;
}
function um(e, t, r) {
  var a = e.l + t, n = ct(e);
  n.r = r["!row"];
  var i = e.read_shift(1), s = [n, i, "e"];
  if (r.cellFormula) {
    e.l += 2;
    var f = Zn(e, a - e.l, r);
    s[3] = Rr(f, null, n, r.supbooks, r);
  } else e.l = a;
  return s;
}
function hm(e, t, r) {
  var a = e.l + t, n = ct(e);
  n.r = r["!row"];
  var i = Nr(e), s = [n, i, "n"];
  if (r.cellFormula) {
    e.l += 2;
    var f = Zn(e, a - e.l, r);
    s[3] = Rr(f, null, n, r.supbooks, r);
  } else e.l = a;
  return s;
}
function xm(e, t, r) {
  var a = e.l + t, n = ct(e);
  n.r = r["!row"];
  var i = Pr(e), s = [n, i, "str"];
  if (r.cellFormula) {
    e.l += 2;
    var f = Zn(e, a - e.l, r);
    s[3] = Rr(f, null, n, r.supbooks, r);
  } else e.l = a;
  return s;
}
var dm = xa, vm = Na;
function pm(e, t) {
  return t == null && (t = K(4)), t.write_shift(4, e), t;
}
function mm(e, t) {
  var r = e.l + t, a = xa(e), n = j0(e), i = Pr(e), s = Pr(e), f = Pr(e);
  e.l = r;
  var c = { rfx: a, relId: n, loc: i, display: f };
  return s && (c.Tooltip = s), c;
}
function gm(e, t) {
  var r = K(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
  Na({ s: ar(e[0]), e: ar(e[0]) }, r), Y0("rId" + t, r);
  var a = e[1].Target.indexOf("#"), n = a == -1 ? "" : e[1].Target.slice(a + 1);
  return Tr(n || "", r), Tr(e[1].Tooltip || "", r), Tr("", r), r.slice(0, r.l);
}
function _m() {
}
function wm(e, t, r) {
  var a = e.l + t, n = Ff(e), i = e.read_shift(1), s = [n];
  if (s[2] = i, r.cellFormula) {
    var f = Gv(e, a - e.l, r);
    s[1] = f;
  } else e.l = a;
  return s;
}
function km(e, t, r) {
  var a = e.l + t, n = xa(e), i = [n];
  if (r.cellFormula) {
    var s = $v(e, a - e.l, r);
    i[1] = s, e.l = a;
  } else e.l = a;
  return i;
}
function Em(e, t, r) {
  r == null && (r = K(18));
  var a = Qn(e, t);
  r.write_shift(-4, e), r.write_shift(-4, e), r.write_shift(4, (a.width || 10) * 256), r.write_shift(
    4,
    0
    /*ixfe*/
  );
  var n = 0;
  return t.hidden && (n |= 1), typeof a.width == "number" && (n |= 2), t.level && (n |= t.level << 8), r.write_shift(2, n), r;
}
var Dc = ["left", "right", "top", "bottom", "header", "footer"];
function Tm(e) {
  var t = {};
  return Dc.forEach(function(r) {
    t[r] = Nr(e);
  }), t;
}
function Sm(e, t) {
  return t == null && (t = K(6 * 8)), ta(e), Dc.forEach(function(r) {
    ia(e[r], t);
  }), t;
}
function Fm(e) {
  var t = e.read_shift(2);
  return e.l += 28, { RTL: t & 32 };
}
function ym(e, t, r) {
  r == null && (r = K(30));
  var a = 924;
  return (((t || {}).Views || [])[0] || {}).RTL && (a |= 32), r.write_shift(2, a), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(2, 0), r.write_shift(2, 100), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(4, 0), r;
}
function Am(e) {
  var t = K(24);
  return t.write_shift(4, 4), t.write_shift(4, 1), Na(e, t), t;
}
function Cm(e, t) {
  return t == null && (t = K(16 * 4 + 2)), t.write_shift(2, e.password ? ti(e.password) : 0), t.write_shift(4, 1), [
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
function Dm() {
}
function Im() {
}
function Om(e, t, r, a, n, i, s) {
  if (!e) return e;
  var f = t || {};
  a || (a = { "!id": {} });
  var c = f.dense ? [] : {}, l, o = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } }, u = !1, x = !1, d, v, h, p, k, T, g, D, N, b = [];
  f.biff = 12, f["!row"] = 0;
  var F = 0, B = !1, O = [], z = {}, X = f.supbooks || /*::(*/
  n.supbooks || [[]];
  if (X.sharedf = z, X.arrayf = O, X.SheetNames = n.SheetNames || n.Sheets.map(function(Ie) {
    return Ie.name;
  }), !f.supbooks && (f.supbooks = X, n.Names))
    for (var L = 0; L < n.Names.length; ++L) X[0][L + 1] = n.Names[L];
  var te = [], pe = [], oe = !1;
  cn[16] = { n: "BrtShortReal", f: Cc };
  var de;
  if (bt(e, function(U, Ee, Se) {
    if (!x)
      switch (Se) {
        case 148:
          l = U;
          break;
        case 0:
          d = U, f.sheetRows && f.sheetRows <= d.r && (x = !0), D = or(p = d.r), f["!row"] = d.r, (U.hidden || U.hpt || U.level != null) && (U.hpt && (U.hpx = Ia(U.hpt)), pe[U.r] = U);
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
          switch (v = { t: U[2] }, U[2]) {
            case "n":
              v.v = U[1];
              break;
            case "s":
              g = $a[U[1]], v.v = g.t, v.r = g.r;
              break;
            case "b":
              v.v = !!U[1];
              break;
            case "e":
              v.v = U[1], f.cellText !== !1 && (v.w = Nt[v.v]);
              break;
            case "str":
              v.t = "s", v.v = U[1];
              break;
            case "is":
              v.t = "s", v.v = U[1].t;
              break;
          }
          if ((h = s.CellXf[U[0].iStyleRef]) && Fc(v, h.numFmtId, null, f, i, s), k = U[0].c == -1 ? k + 1 : U[0].c, f.dense ? (c[p] || (c[p] = []), c[p][k] = v) : c[tr(k) + D] = v, f.cellFormula) {
            for (B = !1, F = 0; F < O.length; ++F) {
              var C = O[F];
              d.r >= C[0].s.r && d.r <= C[0].e.r && k >= C[0].s.c && k <= C[0].e.c && (v.F = De(C[0]), B = !0);
            }
            !B && U.length > 3 && (v.f = U[3]);
          }
          if (o.s.r > d.r && (o.s.r = d.r), o.s.c > k && (o.s.c = k), o.e.r < d.r && (o.e.r = d.r), o.e.c < k && (o.e.c = k), f.cellDates && h && v.t == "n" && Oa(Te[h.numFmtId])) {
            var P = Zt(v.v);
            P && (v.t = "d", v.v = new Date(P.y, P.m - 1, P.d, P.H, P.M, P.S, P.u));
          }
          de && (de.type == "XLDAPR" && (v.D = !0), de = void 0);
          break;
        case 1:
        case 12:
          if (!f.sheetStubs || u) break;
          v = { t: "z", v: void 0 }, k = U[0].c == -1 ? k + 1 : U[0].c, f.dense ? (c[p] || (c[p] = []), c[p][k] = v) : c[tr(k) + D] = v, o.s.r > d.r && (o.s.r = d.r), o.s.c > k && (o.s.c = k), o.e.r < d.r && (o.e.r = d.r), o.e.c < k && (o.e.c = k), de && (de.type == "XLDAPR" && (v.D = !0), de = void 0);
          break;
        case 176:
          b.push(U);
          break;
        case 49:
          de = ((f.xlmeta || {}).Cell || [])[U - 1];
          break;
        case 494:
          var I = a["!id"][U.relId];
          for (I ? (U.Target = I.Target, U.loc && (U.Target += "#" + U.loc), U.Rel = I) : U.relId == "" && (U.Target = "#" + U.loc), p = U.rfx.s.r; p <= U.rfx.e.r; ++p) for (k = U.rfx.s.c; k <= U.rfx.e.c; ++k)
            f.dense ? (c[p] || (c[p] = []), c[p][k] || (c[p][k] = { t: "z", v: void 0 }), c[p][k].l = U) : (T = Fe({ c: k, r: p }), c[T] || (c[T] = { t: "z", v: void 0 }), c[T].l = U);
          break;
        case 426:
          if (!f.cellFormula) break;
          O.push(U), N = f.dense ? c[p][k] : c[tr(k) + D], N.f = Rr(U[1], o, { r: d.r, c: k }, X, f), N.F = De(U[0]);
          break;
        case 427:
          if (!f.cellFormula) break;
          z[Fe(U[0].s)] = U[1], N = f.dense ? c[p][k] : c[tr(k) + D], N.f = Rr(U[1], o, { r: d.r, c: k }, X, f);
          break;
        case 60:
          if (!f.cellStyles) break;
          for (; U.e >= U.s; )
            te[U.e--] = { width: U.w / 256, hidden: !!(U.flags & 1), level: U.level }, oe || (oe = !0, ai(U.w / 256)), Vt(te[U.e + 1]);
          break;
        case 161:
          c["!autofilter"] = { ref: De(U) };
          break;
        case 476:
          c["!margins"] = U;
          break;
        case 147:
          n.Sheets[r] || (n.Sheets[r] = {}), U.name && (n.Sheets[r].CodeName = U.name), (U.above || U.left) && (c["!outline"] = { above: U.above, left: U.left });
          break;
        case 137:
          n.Views || (n.Views = [{}]), n.Views[0] || (n.Views[0] = {}), U.RTL && (n.Views[0].RTL = !0);
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
          if (!Ee.T) {
            if (!u || f.WTF) throw new Error("Unexpected record 0x" + Se.toString(16));
          }
      }
  }, f), delete f.supbooks, delete f["!row"], !c["!ref"] && (o.s.r < 2e6 || l && (l.e.r > 0 || l.e.c > 0 || l.s.r > 0 || l.s.c > 0)) && (c["!ref"] = De(l || o)), f.sheetRows && c["!ref"]) {
    var ve = Ue(c["!ref"]);
    f.sheetRows <= +ve.e.r && (ve.e.r = f.sheetRows - 1, ve.e.r > o.e.r && (ve.e.r = o.e.r), ve.e.r < ve.s.r && (ve.s.r = ve.e.r), ve.e.c > o.e.c && (ve.e.c = o.e.c), ve.e.c < ve.s.c && (ve.s.c = ve.e.c), c["!fullref"] = c["!ref"], c["!ref"] = De(ve));
  }
  return b.length > 0 && (c["!merges"] = b), te.length > 0 && (c["!cols"] = te), pe.length > 0 && (c["!rows"] = pe), c;
}
function Rm(e, t, r, a, n, i, s) {
  if (t.v === void 0) return !1;
  var f = "";
  switch (t.t) {
    case "b":
      f = t.v ? "1" : "0";
      break;
    case "d":
      t = Ze(t), t.z = t.z || Te[14], t.v = wr(qe(t.v)), t.t = "n";
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
  switch (c.s = $t(n.cellXfs, t, n), t.l && i["!links"].push([Fe(c), t.l]), t.c && i["!comments"].push([Fe(c), t.c]), t.t) {
    case "s":
    case "str":
      return n.bookSST ? (f = ci(n.Strings, t.v, n.revStrings), c.t = "s", c.v = f, s ? Q(e, 18, qp(t, c)) : Q(e, 7, Yp(t, c))) : (c.t = "str", s ? Q(e, 17, lm(t, c)) : Q(e, 6, fm(t, c))), !0;
    case "n":
      return t.v == (t.v | 0) && t.v > -1e3 && t.v < 1e3 ? s ? Q(e, 13, nm(t, c)) : Q(e, 2, tm(t, c)) : s ? Q(e, 16, em(t, c)) : Q(e, 5, Qp(t, c)), !0;
    case "b":
      return c.t = "b", s ? Q(e, 15, Xp(t, c)) : Q(e, 4, Vp(t, c)), !0;
    case "e":
      return c.t = "e", s ? Q(e, 14, Kp(t, c)) : Q(e, 3, zp(t, c)), !0;
  }
  return s ? Q(e, 12, Up(t, c)) : Q(e, 1, Bp(t, c)), !0;
}
function bm(e, t, r, a) {
  var n = Ue(t["!ref"] || "A1"), i, s = "", f = [];
  Q(
    e,
    145
    /* BrtBeginSheetData */
  );
  var c = Array.isArray(t), l = n.e.r;
  t["!rows"] && (l = Math.max(n.e.r, t["!rows"].length - 1));
  for (var o = n.s.r; o <= l; ++o) {
    s = or(o), Ip(e, t, n, o);
    var u = !1;
    if (o <= n.e.r) for (var x = n.s.c; x <= n.e.c; ++x) {
      o === n.s.r && (f[x] = tr(x)), i = f[x] + s;
      var d = c ? (t[o] || [])[x] : t[i];
      if (!d) {
        u = !1;
        continue;
      }
      u = Rm(e, d, o, x, a, t, u);
    }
  }
  Q(
    e,
    146
    /* BrtEndSheetData */
  );
}
function Nm(e, t) {
  !t || !t["!merges"] || (Q(e, 177, pm(t["!merges"].length)), t["!merges"].forEach(function(r) {
    Q(e, 176, vm(r));
  }), Q(
    e,
    178
    /* BrtEndMergeCells */
  ));
}
function Pm(e, t) {
  !t || !t["!cols"] || (Q(
    e,
    390
    /* BrtBeginColInfos */
  ), t["!cols"].forEach(function(r, a) {
    r && Q(e, 60, Em(a, r));
  }), Q(
    e,
    391
    /* BrtEndColInfos */
  ));
}
function Lm(e, t) {
  !t || !t["!ref"] || (Q(
    e,
    648
    /* BrtBeginCellIgnoreECs */
  ), Q(e, 649, Am(Ue(t["!ref"]))), Q(
    e,
    650
    /* BrtEndCellIgnoreECs */
  ));
}
function Bm(e, t, r) {
  t["!links"].forEach(function(a) {
    if (a[1].Target) {
      var n = Xe(r, -1, a[1].Target.replace(/#.*$/, ""), Be.HLINK);
      Q(e, 494, gm(a, n));
    }
  }), delete t["!links"];
}
function Mm(e, t, r, a) {
  if (t["!comments"].length > 0) {
    var n = Xe(a, -1, "../drawings/vmlDrawing" + (r + 1) + ".vml", Be.VML);
    Q(e, 551, Y0("rId" + n)), t["!legacy"] = n;
  }
}
function Um(e, t, r, a) {
  if (t["!autofilter"]) {
    var n = t["!autofilter"], i = typeof n.ref == "string" ? n.ref : De(n.ref);
    r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
    var s = r.Workbook.Names, f = zr(i);
    f.s.r == f.e.r && (f.e.r = zr(t["!ref"]).e.r, i = De(f));
    for (var c = 0; c < s.length; ++c) {
      var l = s[c];
      if (l.Name == "_xlnm._FilterDatabase" && l.Sheet == a) {
        l.Ref = "'" + r.SheetNames[a] + "'!" + i;
        break;
      }
    }
    c == s.length && s.push({ Name: "_xlnm._FilterDatabase", Sheet: a, Ref: "'" + r.SheetNames[a] + "'!" + i }), Q(e, 161, Na(Ue(i))), Q(
      e,
      162
      /* BrtEndAFilter */
    );
  }
}
function Wm(e, t, r) {
  Q(
    e,
    133
    /* BrtBeginWsViews */
  ), Q(e, 137, ym(t, r)), Q(
    e,
    138
    /* BrtEndWsView */
  ), Q(
    e,
    134
    /* BrtEndWsViews */
  );
}
function Vm(e, t) {
  t["!protect"] && Q(e, 535, Cm(t["!protect"]));
}
function Hm(e, t, r, a) {
  var n = Gr(), i = r.SheetNames[e], s = r.Sheets[i] || {}, f = i;
  try {
    r && r.Workbook && (f = r.Workbook.Sheets[e].CodeName || f);
  } catch {
  }
  var c = Ue(s["!ref"] || "A1");
  if (c.e.c > 16383 || c.e.r > 1048575) {
    if (t.WTF) throw new Error("Range " + (s["!ref"] || "A1") + " exceeds format limit A1:XFD1048576");
    c.e.c = Math.min(c.e.c, 16383), c.e.r = Math.min(c.e.c, 1048575);
  }
  return s["!links"] = [], s["!comments"] = [], Q(
    n,
    129
    /* BrtBeginSheet */
  ), (r.vbaraw || s["!outline"]) && Q(n, 147, Pp(f, s["!outline"])), Q(n, 148, Rp(c)), Wm(n, s, r.Workbook), Pm(n, s), bm(n, s, e, t), Vm(n, s), Um(n, s, r, e), Nm(n, s), Bm(n, s, a), s["!margins"] && Q(n, 476, Sm(s["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && Lm(n, s), Mm(n, s, e, a), Q(
    n,
    130
    /* BrtEndSheet */
  ), n.end();
}
function Xm(e) {
  var t = [], r = e.match(/^<c:numCache>/), a;
  (e.match(/<c:pt idx="(\d*)">(.*?)<\/c:pt>/mg) || []).forEach(function(i) {
    var s = i.match(/<c:pt idx="(\d*?)"><c:v>(.*)<\/c:v><\/c:pt>/);
    s && (t[+s[1]] = r ? +s[2] : s[2]);
  });
  var n = Me((e.match(/<c:formatCode>([\s\S]*?)<\/c:formatCode>/) || ["", "General"])[1]);
  return (e.match(/<c:f>(.*?)<\/c:f>/mg) || []).forEach(function(i) {
    a = i.replace(/<.*?>/g, "");
  }), [t, n, a];
}
function Gm(e, t, r, a, n, i) {
  var s = i || { "!type": "chart" };
  if (!e) return i;
  var f = 0, c = 0, l = "A", o = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } };
  return (e.match(/<c:numCache>[\s\S]*?<\/c:numCache>/gm) || []).forEach(function(u) {
    var x = Xm(u);
    o.s.r = o.s.c = 0, o.e.c = f, l = tr(f), x[0].forEach(function(d, v) {
      s[l + or(v)] = { t: "n", v: d, z: x[1] }, c = v;
    }), o.e.r < c && (o.e.r = c), ++f;
  }), f > 0 && (s["!ref"] = De(o)), s;
}
function zm(e, t, r, a, n) {
  if (!e) return e;
  a || (a = { "!id": {} });
  var i = { "!type": "chart", "!drawel": null, "!rel": "" }, s, f = e.match(yc);
  return f && li(f[0], i, n, r), (s = e.match(/drawing r:id="(.*?)"/)) && (i["!rel"] = s[1]), a["!id"][i["!rel"]] && (i["!drawel"] = a["!id"][i["!rel"]]), i;
}
function $m(e, t) {
  e.l += 10;
  var r = Pr(e);
  return { name: r };
}
function Km(e, t, r, a, n) {
  if (!e) return e;
  a || (a = { "!id": {} });
  var i = { "!type": "chart", "!drawel": null, "!rel": "" }, s = !1;
  return bt(e, function(c, l, o) {
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
var oi = [
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
], jm = [
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
], Ym = [
  //['state', 'visible']
], Jm = [
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
function As(e, t) {
  for (var r = 0; r != e.length; ++r)
    for (var a = e[r], n = 0; n != t.length; ++n) {
      var i = t[n];
      if (a[i[0]] == null) a[i[0]] = i[1];
      else switch (i[2]) {
        case "bool":
          typeof a[i[0]] == "string" && (a[i[0]] = Je(a[i[0]]));
          break;
        case "int":
          typeof a[i[0]] == "string" && (a[i[0]] = parseInt(a[i[0]], 10));
          break;
      }
    }
}
function Cs(e, t) {
  for (var r = 0; r != t.length; ++r) {
    var a = t[r];
    if (e[a[0]] == null) e[a[0]] = a[1];
    else switch (a[2]) {
      case "bool":
        typeof e[a[0]] == "string" && (e[a[0]] = Je(e[a[0]]));
        break;
      case "int":
        typeof e[a[0]] == "string" && (e[a[0]] = parseInt(e[a[0]], 10));
        break;
    }
  }
}
function Ic(e) {
  Cs(e.WBProps, oi), Cs(e.CalcPr, Jm), As(e.WBView, jm), As(e.Sheets, Ym), Aa.date1904 = Je(e.WBProps.date1904);
}
function qm(e) {
  return !e.Workbook || !e.Workbook.WBProps ? "false" : Je(e.Workbook.WBProps.date1904) ? "true" : "false";
}
var Zm = /* @__PURE__ */ "][*?/\\".split("");
function Oc(e, t) {
  if (e.length > 31)
    throw new Error("Sheet names cannot exceed 31 chars");
  var r = !0;
  return Zm.forEach(function(a) {
    if (e.indexOf(a) != -1)
      throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
  }), r;
}
function Qm(e, t, r) {
  e.forEach(function(a, n) {
    Oc(a);
    for (var i = 0; i < n; ++i) if (a == e[i]) throw new Error("Duplicate Sheet Name: " + a);
    if (r) {
      var s = t && t[n] && t[n].CodeName || a;
      if (s.charCodeAt(0) == 95 && s.length > 22) throw new Error("Bad Code Name: Worksheet" + s);
    }
  });
}
function e2(e) {
  if (!e || !e.SheetNames || !e.Sheets) throw new Error("Invalid Workbook");
  if (!e.SheetNames.length) throw new Error("Workbook is empty");
  var t = e.Workbook && e.Workbook.Sheets || [];
  Qm(e.SheetNames, t, !!e.vbaraw);
  for (var r = 0; r < e.SheetNames.length; ++r) qv(e.Sheets[e.SheetNames[r]], e.SheetNames[r], r);
}
var r2 = /<\w+:workbook/;
function t2(e, t) {
  if (!e) throw new Error("Could not find file");
  var r = (
    /*::(*/
    { AppVersion: {}, WBProps: {}, WBView: [], Sheets: [], CalcPr: {}, Names: [], xmlns: "" }
  ), a = !1, n = "xmlns", i = {}, s = 0;
  if (e.replace(Br, function(c, l) {
    var o = ye(c);
    switch (St(o[0])) {
      case "<?xml":
        break;
      case "<workbook":
        c.match(r2) && (n = "xmlns" + c.match(/<(\w+):/)[1]), r.xmlns = o[n];
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
        oi.forEach(function(u) {
          if (o[u[0]] != null)
            switch (u[2]) {
              case "bool":
                r.WBProps[u[0]] = Je(o[u[0]]);
                break;
              case "int":
                r.WBProps[u[0]] = parseInt(o[u[0]], 10);
                break;
              default:
                r.WBProps[u[0]] = o[u[0]];
            }
        }), o.codeName && (r.WBProps.CodeName = ze(o.codeName));
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
        delete o.state, o.name = Me(ze(o.name)), delete o[0], r.Sheets.push(o);
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
        i = {}, i.Name = ze(o.name), o.comment && (i.Comment = o.comment), o.localSheetId && (i.Sheet = +o.localSheetId), Je(o.hidden || "0") && (i.Hidden = !0), s = l + c.length;
        break;
      case "</definedName>":
        i.Ref = Me(ze(e.slice(s, l))), r.Names.push(i);
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
  }), la.indexOf(r.xmlns) === -1) throw new Error("Unknown Namespace: " + r.xmlns);
  return Ic(r), r;
}
function Rc(e) {
  var t = [ur];
  t[t.length] = ue("workbook", null, {
    xmlns: la[0],
    //'xmlns:mx': XMLNS.mx,
    //'xmlns:s': XMLNS_main[0],
    "xmlns:r": _r.r
  });
  var r = e.Workbook && (e.Workbook.Names || []).length > 0, a = { codeName: "ThisWorkbook" };
  e.Workbook && e.Workbook.WBProps && (oi.forEach(function(f) {
    e.Workbook.WBProps[f[0]] != null && e.Workbook.WBProps[f[0]] != f[1] && (a[f[0]] = e.Workbook.WBProps[f[0]]);
  }), e.Workbook.WBProps.CodeName && (a.codeName = e.Workbook.WBProps.CodeName, delete a.CodeName)), t[t.length] = ue("workbookPr", null, a);
  var n = e.Workbook && e.Workbook.Sheets || [], i = 0;
  if (n && n[0] && n[0].Hidden) {
    for (t[t.length] = "<bookViews>", i = 0; i != e.SheetNames.length && !(!n[i] || !n[i].Hidden); ++i)
      ;
    i == e.SheetNames.length && (i = 0), t[t.length] = '<workbookView firstSheet="' + i + '" activeTab="' + i + '"/>', t[t.length] = "</bookViews>";
  }
  for (t[t.length] = "<sheets>", i = 0; i != e.SheetNames.length; ++i) {
    var s = { name: Ge(e.SheetNames[i].slice(0, 31)) };
    if (s.sheetId = "" + (i + 1), s["r:id"] = "rId" + (i + 1), n[i]) switch (n[i].Hidden) {
      case 1:
        s.state = "hidden";
        break;
      case 2:
        s.state = "veryHidden";
        break;
    }
    t[t.length] = ue("sheet", null, s);
  }
  return t[t.length] = "</sheets>", r && (t[t.length] = "<definedNames>", e.Workbook && e.Workbook.Names && e.Workbook.Names.forEach(function(f) {
    var c = { name: f.Name };
    f.Comment && (c.comment = f.Comment), f.Sheet != null && (c.localSheetId = "" + f.Sheet), f.Hidden && (c.hidden = "1"), f.Ref && (t[t.length] = ue("definedName", Ge(f.Ref), c));
  }), t[t.length] = "</definedNames>"), t.length > 2 && (t[t.length] = "</workbook>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function a2(e, t) {
  var r = {};
  return r.Hidden = e.read_shift(4), r.iTabID = e.read_shift(4), r.strRelID = w0(e), r.name = Pr(e), r;
}
function n2(e, t) {
  return t || (t = K(127)), t.write_shift(4, e.Hidden), t.write_shift(4, e.iTabID), Y0(e.strRelID, t), Tr(e.name.slice(0, 31), t), t.length > t.l ? t.slice(0, t.l) : t;
}
function i2(e, t) {
  var r = {}, a = e.read_shift(4);
  r.defaultThemeVersion = e.read_shift(4);
  var n = t > 8 ? Pr(e) : "";
  return n.length > 0 && (r.CodeName = n), r.autoCompressPictures = !!(a & 65536), r.backupFile = !!(a & 64), r.checkCompatibility = !!(a & 4096), r.date1904 = !!(a & 1), r.filterPrivacy = !!(a & 8), r.hidePivotFieldList = !!(a & 1024), r.promptedSolutions = !!(a & 16), r.publishItems = !!(a & 2048), r.refreshAllConnections = !!(a & 262144), r.saveExternalLinkValues = !!(a & 128), r.showBorderUnselectedTables = !!(a & 4), r.showInkAnnotation = !!(a & 32), r.showObjects = ["all", "placeholders", "none"][a >> 13 & 3], r.showPivotChartFilter = !!(a & 32768), r.updateLinks = ["userSet", "never", "always"][a >> 8 & 3], r;
}
function s2(e, t) {
  t || (t = K(72));
  var r = 0;
  return e && e.filterPrivacy && (r |= 8), t.write_shift(4, r), t.write_shift(4, 0), Tf(e && e.CodeName || "ThisWorkbook", t), t.slice(0, t.l);
}
function f2(e, t) {
  var r = {};
  return e.read_shift(4), r.ArchID = e.read_shift(4), e.l += t - 8, r;
}
function c2(e, t, r) {
  var a = e.l + t;
  e.l += 4, e.l += 1;
  var n = e.read_shift(4), i = Mo(e), s = zv(e, 0, r), f = j0(e);
  e.l = a;
  var c = { Name: i, Ptg: s };
  return n < 268435455 && (c.Sheet = n), f && (c.Comment = f), c;
}
function l2(e, t) {
  var r = { AppVersion: {}, WBProps: {}, WBView: [], Sheets: [], CalcPr: {}, xmlns: "" }, a = [], n = !1;
  t || (t = {}), t.biff = 12;
  var i = [], s = [[]];
  return s.SheetNames = [], s.XTI = [], cn[16] = { n: "BrtFRTArchID$", f: f2 }, bt(e, function(c, l, o) {
    switch (o) {
      case 156:
        s.SheetNames.push(c.name), r.Sheets.push(c);
        break;
      case 153:
        r.WBProps = c;
        break;
      case 39:
        c.Sheet != null && (t.SID = c.Sheet), c.Ref = Rr(c.Ptg, null, null, s, t), delete t.SID, delete c.Ptg, i.push(c);
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
  }, t), Ic(r), r.Names = i, r.supbooks = s, r;
}
function o2(e, t) {
  Q(
    e,
    143
    /* BrtBeginBundleShs */
  );
  for (var r = 0; r != t.SheetNames.length; ++r) {
    var a = t.Workbook && t.Workbook.Sheets && t.Workbook.Sheets[r] && t.Workbook.Sheets[r].Hidden || 0, n = { Hidden: a, iTabID: r + 1, strRelID: "rId" + (r + 1), name: t.SheetNames[r] };
    Q(e, 156, n2(n));
  }
  Q(
    e,
    144
    /* BrtEndBundleShs */
  );
}
function u2(e, t) {
  t || (t = K(127));
  for (var r = 0; r != 4; ++r) t.write_shift(4, 0);
  return Tr("SheetJS", t), Tr(Rn.version, t), Tr(Rn.version, t), Tr("7262", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function h2(e, t) {
  t || (t = K(29)), t.write_shift(-4, 0), t.write_shift(-4, 460), t.write_shift(4, 28800), t.write_shift(4, 17600), t.write_shift(4, 500), t.write_shift(4, e), t.write_shift(4, e);
  var r = 120;
  return t.write_shift(1, r), t.length > t.l ? t.slice(0, t.l) : t;
}
function x2(e, t) {
  if (!(!t.Workbook || !t.Workbook.Sheets)) {
    for (var r = t.Workbook.Sheets, a = 0, n = -1, i = -1; a < r.length; ++a)
      !r[a] || !r[a].Hidden && n == -1 ? n = a : r[a].Hidden == 1 && i == -1 && (i = a);
    i > n || (Q(
      e,
      135
      /* BrtBeginBookViews */
    ), Q(e, 158, h2(n)), Q(
      e,
      136
      /* BrtEndBookViews */
    ));
  }
}
function d2(e, t) {
  var r = Gr();
  return Q(
    r,
    131
    /* BrtBeginBook */
  ), Q(r, 128, u2()), Q(r, 153, s2(e.Workbook && e.Workbook.WBProps || null)), x2(r, e), o2(r, e), Q(
    r,
    132
    /* BrtEndBook */
  ), r.end();
}
function v2(e, t, r) {
  return t.slice(-4) === ".bin" ? l2(e, r) : t2(e, r);
}
function p2(e, t, r, a, n, i, s, f) {
  return t.slice(-4) === ".bin" ? Om(e, a, r, n, i, s, f) : cp(e, a, r, n, i, s, f);
}
function m2(e, t, r, a, n, i, s, f) {
  return t.slice(-4) === ".bin" ? Km(e, a, r, n, i) : zm(e, a, r, n, i);
}
function g2(e, t, r, a, n, i, s, f) {
  return t.slice(-4) === ".bin" ? wd() : kd();
}
function _2(e, t, r, a, n, i, s, f) {
  return t.slice(-4) === ".bin" ? gd() : _d();
}
function w2(e, t, r, a) {
  return t.slice(-4) === ".bin" ? vx(e, r, a) : ax(e, r, a);
}
function k2(e, t, r) {
  return hc(e, r);
}
function E2(e, t, r) {
  return t.slice(-4) === ".bin" ? E1(e, r) : _1(e, r);
}
function T2(e, t, r) {
  return t.slice(-4) === ".bin" ? xd(e, r) : nd(e, r);
}
function S2(e, t, r) {
  return t.slice(-4) === ".bin" ? rd(e) : Qx(e);
}
function F2(e, t, r, a) {
  return r.slice(-4) === ".bin" ? td(e, t, r, a) : void 0;
}
function y2(e, t, r) {
  return t.slice(-4) === ".bin" ? Jx(e, t, r) : Zx(e, t, r);
}
function A2(e, t, r) {
  return (t.slice(-4) === ".bin" ? d2 : Rc)(e);
}
function C2(e, t, r, a, n) {
  return (t.slice(-4) === ".bin" ? Hm : Ac)(e, r, a, n);
}
function D2(e, t, r) {
  return (t.slice(-4) === ".bin" ? Fx : oc)(e, r);
}
function I2(e, t, r) {
  return (t.slice(-4) === ".bin" ? F1 : tc)(e, r);
}
function O2(e, t, r) {
  return (t.slice(-4) === ".bin" ? dd : vc)(e);
}
function R2(e) {
  return (e.slice(-4) === ".bin" ? qx : xc)();
}
var bc = /([\w:]+)=((?:")([^"]*)(?:")|(?:')([^']*)(?:'))/g, Nc = /([\w:]+)=((?:")(?:[^"]*)(?:")|(?:')(?:[^']*)(?:'))/;
function ut(e, t) {
  var r = e.split(/\s+/), a = [];
  if (a[0] = r[0], r.length === 1) return a;
  var n = e.match(bc), i, s, f, c;
  if (n) for (c = 0; c != n.length; ++c)
    i = n[c].match(Nc), (s = i[1].indexOf(":")) === -1 ? a[i[1]] = i[2].slice(1, i[2].length - 1) : (i[1].slice(0, 6) === "xmlns:" ? f = "xmlns" + i[1].slice(6) : f = i[1].slice(s + 1), a[f] = i[2].slice(1, i[2].length - 1));
  return a;
}
function b2(e) {
  var t = e.split(/\s+/), r = {};
  if (t.length === 1) return r;
  var a = e.match(bc), n, i, s, f;
  if (a) for (f = 0; f != a.length; ++f)
    n = a[f].match(Nc), (i = n[1].indexOf(":")) === -1 ? r[n[1]] = n[2].slice(1, n[2].length - 1) : (n[1].slice(0, 6) === "xmlns:" ? s = "xmlns" + n[1].slice(6) : s = n[1].slice(i + 1), r[s] = n[2].slice(1, n[2].length - 1));
  return r;
}
var ja;
function N2(e, t) {
  var r = ja[e] || Me(e);
  return r === "General" ? aa(t) : ft(r, t);
}
function P2(e, t, r, a) {
  var n = a;
  switch ((r[0].match(/dt:dt="([\w.]+)"/) || ["", ""])[1]) {
    case "boolean":
      n = Je(a);
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
      n = qe(a);
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
  e[Me(t)] = n;
}
function L2(e, t, r) {
  if (e.t !== "z") {
    if (!r || r.cellText !== !1) try {
      e.t === "e" ? e.w = e.w || Nt[e.v] : t === "General" ? e.t === "n" ? (e.v | 0) === e.v ? e.w = e.v.toString(10) : e.w = Za(e.v) : e.w = aa(e.v) : e.w = N2(t || "General", e.v);
    } catch (i) {
      if (r.WTF) throw i;
    }
    try {
      var a = ja[t] || t || "General";
      if (r.cellNF && (e.z = a), r.cellDates && e.t == "n" && Oa(a)) {
        var n = Zt(e.v);
        n && (e.t = "d", e.v = new Date(n.y, n.m - 1, n.d, n.H, n.M, n.S, n.u));
      }
    } catch (i) {
      if (r.WTF) throw i;
    }
  }
}
function B2(e, t, r) {
  if (r.cellStyles && t.Interior) {
    var a = t.Interior;
    a.Pattern && (a.patternType = Y1[a.Pattern] || a.Pattern);
  }
  e[t.ID] = t;
}
function M2(e, t, r, a, n, i, s, f, c, l) {
  var o = "General", u = a.StyleID, x = {};
  l = l || {};
  var d = [], v = 0;
  for (u === void 0 && f && (u = f.StyleID), u === void 0 && s && (u = s.StyleID); i[u] !== void 0 && (i[u].nf && (o = i[u].nf), i[u].Interior && d.push(i[u].Interior), !!i[u].Parent); )
    u = i[u].Parent;
  switch (r.Type) {
    case "Boolean":
      a.t = "b", a.v = Je(e);
      break;
    case "String":
      a.t = "s", a.r = zi(Me(e)), a.v = e.indexOf("<") > -1 ? Me(t || e).replace(/<.*?>/g, "") : a.r;
      break;
    case "DateTime":
      e.slice(-1) != "Z" && (e += "Z"), a.v = (qe(e) - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1e3), a.v !== a.v ? a.v = Me(e) : a.v < 60 && (a.v = a.v - 1), (!o || o == "General") && (o = "yyyy-mm-dd");
    case "Number":
      a.v === void 0 && (a.v = +e), a.t || (a.t = "n");
      break;
    case "Error":
      a.t = "e", a.v = Cf[e], l.cellText !== !1 && (a.w = e);
      break;
    default:
      e == "" && t == "" ? a.t = "z" : (a.t = "s", a.v = zi(t || e));
      break;
  }
  if (L2(a, o, l), l.cellFormula !== !1)
    if (a.Formula) {
      var h = Me(a.Formula);
      h.charCodeAt(0) == 61 && (h = h.slice(1)), a.f = ya(h, n), delete a.Formula, a.ArrayRange == "RC" ? a.F = ya("RC:RC", n) : a.ArrayRange && (a.F = ya(a.ArrayRange, n), c.push([Ue(a.F), a.F]));
    } else
      for (v = 0; v < c.length; ++v)
        n.r >= c[v][0].s.r && n.r <= c[v][0].e.r && n.c >= c[v][0].s.c && n.c <= c[v][0].e.c && (a.F = c[v][1]);
  l.cellStyles && (d.forEach(function(p) {
    !x.patternType && p.patternType && (x.patternType = p.patternType);
  }), a.s = x), a.StyleID !== void 0 && (a.ixfe = a.StyleID);
}
function U2(e) {
  e.t = e.v || "", e.t = e.t.replace(/\r\n/g, `
`).replace(/\r/g, `
`), e.v = e.w = e.ixfe = void 0;
}
function d0(e, t) {
  var r = t || {};
  Ra();
  var a = Ua(H0(e));
  (r.type == "binary" || r.type == "array" || r.type == "base64") && (a = ze(a));
  var n = a.slice(0, 1024).toLowerCase(), i = !1;
  if (n = n.replace(/".*?"/g, ""), (n.indexOf(">") & 1023) > Math.min(n.indexOf(",") & 1023, n.indexOf(";") & 1023)) {
    var s = Ze(r);
    return s.type = "string", Da.to_workbook(a, s);
  }
  if (n.indexOf("<?xml") == -1 && ["html", "table", "head", "meta", "script", "style", "div"].forEach(function(ke) {
    n.indexOf("<" + ke) >= 0 && (i = !0);
  }), i) return Sg(a, r);
  ja = {
    "General Number": "General",
    "General Date": Te[22],
    "Long Date": "dddd, mmmm dd, yyyy",
    "Medium Date": Te[15],
    "Short Date": Te[14],
    "Long Time": Te[19],
    "Medium Time": Te[18],
    "Short Time": Te[20],
    Currency: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
    Fixed: Te[2],
    Standard: Te[4],
    Percent: Te[10],
    Scientific: Te[11],
    "Yes/No": '"Yes";"Yes";"No";@',
    "True/False": '"True";"True";"False";@',
    "On/Off": '"Yes";"Yes";"No";@'
  };
  var f, c = [], l, o = {}, u = [], x = r.dense ? [] : {}, d = "", v = {}, h = {}, p = ut('<Data ss:Type="String">'), k = 0, T = 0, g = 0, D = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } }, N = {}, b = {}, F = "", B = 0, O = [], z = {}, X = {}, L = 0, te = [], pe = [], oe = {}, de = [], ve, Ie = !1, U = [], Ee = [], Se = {}, C = 0, P = 0, I = { Sheets: [], WBProps: { date1904: !1 } }, R = {};
  rn.lastIndex = 0, a = a.replace(/<!--([\s\S]*?)-->/mg, "");
  for (var Y = ""; f = rn.exec(a); ) switch (f[3] = (Y = f[3]).toLowerCase()) {
    case "data":
      if (Y == "data") {
        if (f[1] === "/") {
          if ((l = c.pop())[0] !== f[3]) throw new Error("Bad state: " + l.join("|"));
        } else f[0].charAt(f[0].length - 2) !== "/" && c.push([f[3], !0]);
        break;
      }
      if (c[c.length - 1][1]) break;
      f[1] === "/" ? M2(a.slice(k, f.index), F, p, c[c.length - 1][0] == /*"Comment"*/
      "comment" ? oe : v, { c: T, r: g }, N, de[T], h, U, r) : (F = "", p = ut(f[0]), k = f.index + f[0].length);
      break;
    case "cell":
      if (f[1] === "/")
        if (pe.length > 0 && (v.c = pe), (!r.sheetRows || r.sheetRows > g) && v.v !== void 0 && (r.dense ? (x[g] || (x[g] = []), x[g][T] = v) : x[tr(T) + or(g)] = v), v.HRef && (v.l = { Target: Me(v.HRef) }, v.HRefScreenTip && (v.l.Tooltip = v.HRefScreenTip), delete v.HRef, delete v.HRefScreenTip), (v.MergeAcross || v.MergeDown) && (C = T + (parseInt(v.MergeAcross, 10) | 0), P = g + (parseInt(v.MergeDown, 10) | 0), O.push({ s: { c: T, r: g }, e: { c: C, r: P } })), !r.sheetStubs)
          v.MergeAcross ? T = C + 1 : ++T;
        else if (v.MergeAcross || v.MergeDown) {
          for (var fe = T; fe <= C; ++fe)
            for (var ce = g; ce <= P; ++ce)
              (fe > T || ce > g) && (r.dense ? (x[ce] || (x[ce] = []), x[ce][fe] = { t: "z" }) : x[tr(fe) + or(ce)] = { t: "z" });
          T = C + 1;
        } else ++T;
      else
        v = b2(f[0]), v.Index && (T = +v.Index - 1), T < D.s.c && (D.s.c = T), T > D.e.c && (D.e.c = T), f[0].slice(-2) === "/>" && ++T, pe = [];
      break;
    case "row":
      f[1] === "/" || f[0].slice(-2) === "/>" ? (g < D.s.r && (D.s.r = g), g > D.e.r && (D.e.r = g), f[0].slice(-2) === "/>" && (h = ut(f[0]), h.Index && (g = +h.Index - 1)), T = 0, ++g) : (h = ut(f[0]), h.Index && (g = +h.Index - 1), Se = {}, (h.AutoFitHeight == "0" || h.Height) && (Se.hpx = parseInt(h.Height, 10), Se.hpt = fn(Se.hpx), Ee[g] = Se), h.Hidden == "1" && (Se.hidden = !0, Ee[g] = Se));
      break;
    case "worksheet":
      if (f[1] === "/") {
        if ((l = c.pop())[0] !== f[3]) throw new Error("Bad state: " + l.join("|"));
        u.push(d), D.s.r <= D.e.r && D.s.c <= D.e.c && (x["!ref"] = De(D), r.sheetRows && r.sheetRows <= D.e.r && (x["!fullref"] = x["!ref"], D.e.r = r.sheetRows - 1, x["!ref"] = De(D))), O.length && (x["!merges"] = O), de.length > 0 && (x["!cols"] = de), Ee.length > 0 && (x["!rows"] = Ee), o[d] = x;
      } else
        D = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } }, g = T = 0, c.push([f[3], !1]), l = ut(f[0]), d = Me(l.Name), x = r.dense ? [] : {}, O = [], U = [], Ee = [], R = { name: d, Hidden: 0 }, I.Sheets.push(R);
      break;
    case "table":
      if (f[1] === "/") {
        if ((l = c.pop())[0] !== f[3]) throw new Error("Bad state: " + l.join("|"));
      } else {
        if (f[0].slice(-2) == "/>") break;
        c.push([f[3], !1]), de = [], Ie = !1;
      }
      break;
    case "style":
      f[1] === "/" ? B2(N, b, r) : b = ut(f[0]);
      break;
    case "numberformat":
      b.nf = Me(ut(f[0]).Format || "General"), ja[b.nf] && (b.nf = ja[b.nf]);
      for (var ie = 0; ie != 392 && Te[ie] != b.nf; ++ie) ;
      if (ie == 392) {
        for (ie = 57; ie != 392; ++ie) if (Te[ie] == null) {
          Dt(b.nf, ie);
          break;
        }
      }
      break;
    case "column":
      if (c[c.length - 1][0] !== /*'Table'*/
      "table") break;
      if (ve = ut(f[0]), ve.Hidden && (ve.hidden = !0, delete ve.Hidden), ve.Width && (ve.wpx = parseInt(ve.Width, 10)), !Ie && ve.wpx > 10) {
        Ie = !0, br = cc;
        for (var ne = 0; ne < de.length; ++ne) de[ne] && Vt(de[ne]);
      }
      Ie && Vt(ve), de[ve.Index - 1 || de.length] = ve;
      for (var Ae = 0; Ae < +ve.Span; ++Ae) de[de.length] = Ze(ve);
      break;
    case "namedrange":
      if (f[1] === "/") break;
      I.Names || (I.Names = []);
      var A = ye(f[0]), $e = {
        Name: A.Name,
        Ref: ya(A.RefersTo.slice(1), { r: 0, c: 0 })
      };
      I.Sheets.length > 0 && ($e.Sheet = I.Sheets.length - 1), I.Names.push($e);
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
      f[1] === "/" ? F += a.slice(B, f.index) : B = f.index + f[0].length;
      break;
    case "interior":
      if (!r.cellStyles) break;
      b.Interior = ut(f[0]);
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
      f[1] === "/" ? lu(z, Y, a.slice(L, f.index)) : L = f.index + f[0].length;
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
        U2(oe), pe.push(oe);
      } else
        c.push([f[3], !1]), l = ut(f[0]), oe = { a: l.Author };
      break;
    case "autofilter":
      if (f[1] === "/") {
        if ((l = c.pop())[0] !== f[3]) throw new Error("Bad state: " + l.join("|"));
      } else if (f[0].charAt(f[0].length - 2) !== "/") {
        var Pe = ut(f[0]);
        x["!autofilter"] = { ref: ya(Pe.Range).replace(/\$/g, "") }, c.push([f[3], !0]);
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
      if (c.length == 0 && f[3] == "document" || c.length == 0 && f[3] == "uof") return bs(a, r);
      var re = !0;
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
              re = !1;
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
              re = !1;
          }
          break;
        case "excelworkbook":
          switch (f[3]) {
            case "date1904":
              I.WBProps.date1904 = !0;
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
              re = !1;
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
              re = !1;
          }
          break;
        case "worksheetoptions":
          switch (f[3]) {
            case "visible":
              if (f[0].slice(-2) !== "/>") if (f[1] === "/") switch (a.slice(L, f.index)) {
                case "SheetHidden":
                  R.Hidden = 1;
                  break;
                case "SheetVeryHidden":
                  R.Hidden = 2;
                  break;
              }
              else L = f.index + f[0].length;
              break;
            case "header":
              x["!margins"] || ta(x["!margins"] = {}, "xlml"), isNaN(+ye(f[0]).Margin) || (x["!margins"].header = +ye(f[0]).Margin);
              break;
            case "footer":
              x["!margins"] || ta(x["!margins"] = {}, "xlml"), isNaN(+ye(f[0]).Margin) || (x["!margins"].footer = +ye(f[0]).Margin);
              break;
            case "pagemargins":
              var G = ye(f[0]);
              x["!margins"] || ta(x["!margins"] = {}, "xlml"), isNaN(+G.Top) || (x["!margins"].top = +G.Top), isNaN(+G.Left) || (x["!margins"].left = +G.Left), isNaN(+G.Right) || (x["!margins"].right = +G.Right), isNaN(+G.Bottom) || (x["!margins"].bottom = +G.Bottom);
              break;
            case "displayrighttoleft":
              I.Views || (I.Views = []), I.Views[0] || (I.Views[0] = {}), I.Views[0].RTL = !0;
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
              re = !1;
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
              re = !1;
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
              re = !1;
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
              re = !1;
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
              re = !1;
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
              re = !1;
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
              re = !1;
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
              re = !1;
          }
          break;
        case "smarttags":
          break;
        default:
          re = !1;
          break;
      }
      if (re || f[3].match(/!\[CDATA/)) break;
      if (!c[c.length - 1][1]) throw "Unrecognized tag: " + f[3] + "|" + c.join("|");
      if (c[c.length - 1][0] === /*'CustomDocumentProperties'*/
      "customdocumentproperties") {
        if (f[0].slice(-2) === "/>") break;
        f[1] === "/" ? P2(X, Y, te, a.slice(L, f.index)) : (te = f, L = f.index + f[0].length);
        break;
      }
      if (r.WTF) throw "Unrecognized tag: " + f[3] + "|" + c.join("|");
  }
  var Z = {};
  return !r.bookSheets && !r.bookProps && (Z.Sheets = o), Z.SheetNames = u, Z.Workbook = I, Z.SSF = Ze(Te), Z.Props = z, Z.Custprops = X, Z;
}
function A0(e, t) {
  switch (hi(t = t || {}), t.type || "base64") {
    case "base64":
      return d0(qr(e), t);
    case "binary":
    case "buffer":
    case "file":
      return d0(e, t);
    case "array":
      return d0(Gt(e), t);
  }
}
function W2(e, t) {
  var r = [];
  return e.Props && r.push(ou(e.Props, t)), e.Custprops && r.push(uu(e.Props, e.Custprops)), r.join("");
}
function V2() {
  return "";
}
function H2(e, t) {
  var r = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
  return t.cellXfs.forEach(function(a, n) {
    var i = [];
    i.push(ue("NumberFormat", null, { "ss:Format": Ge(Te[a.numFmtId]) }));
    var s = (
      /*::(*/
      { "ss:ID": "s" + (21 + n) }
    );
    r.push(ue("Style", i.join(""), s));
  }), ue("Styles", r.join(""));
}
function Pc(e) {
  return ue("NamedRange", null, { "ss:Name": e.Name, "ss:RefersTo": "=" + si(e.Ref, { r: 0, c: 0 }) });
}
function X2(e) {
  if (!((e || {}).Workbook || {}).Names) return "";
  for (var t = e.Workbook.Names, r = [], a = 0; a < t.length; ++a) {
    var n = t[a];
    n.Sheet == null && (n.Name.match(/^_xlfn\./) || r.push(Pc(n)));
  }
  return ue("Names", r.join(""));
}
function G2(e, t, r, a) {
  if (!e || !((a || {}).Workbook || {}).Names) return "";
  for (var n = a.Workbook.Names, i = [], s = 0; s < n.length; ++s) {
    var f = n[s];
    f.Sheet == r && (f.Name.match(/^_xlfn\./) || i.push(Pc(f)));
  }
  return i.join("");
}
function z2(e, t, r, a) {
  if (!e) return "";
  var n = [];
  if (e["!margins"] && (n.push("<PageSetup>"), e["!margins"].header && n.push(ue("Header", null, { "x:Margin": e["!margins"].header })), e["!margins"].footer && n.push(ue("Footer", null, { "x:Margin": e["!margins"].footer })), n.push(ue("PageMargins", null, {
    "x:Bottom": e["!margins"].bottom || "0.75",
    "x:Left": e["!margins"].left || "0.7",
    "x:Right": e["!margins"].right || "0.7",
    "x:Top": e["!margins"].top || "0.75"
  })), n.push("</PageSetup>")), a && a.Workbook && a.Workbook.Sheets && a.Workbook.Sheets[r])
    if (a.Workbook.Sheets[r].Hidden) n.push(ue("Visible", a.Workbook.Sheets[r].Hidden == 1 ? "SheetHidden" : "SheetVeryHidden", {}));
    else {
      for (var i = 0; i < r && !(a.Workbook.Sheets[i] && !a.Workbook.Sheets[i].Hidden); ++i) ;
      i == r && n.push("<Selected/>");
    }
  return ((((a || {}).Workbook || {}).Views || [])[0] || {}).RTL && n.push("<DisplayRightToLeft/>"), e["!protect"] && (n.push(yr("ProtectContents", "True")), e["!protect"].objects && n.push(yr("ProtectObjects", "True")), e["!protect"].scenarios && n.push(yr("ProtectScenarios", "True")), e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells ? n.push(yr("EnableSelection", "NoSelection")) : e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells && n.push(yr("EnableSelection", "UnlockedCells")), [
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
  })), n.length == 0 ? "" : ue("WorksheetOptions", n.join(""), { xmlns: Kr.x });
}
function $2(e) {
  return e.map(function(t) {
    var r = ho(t.t || ""), a = ue("ss:Data", r, { xmlns: "http://www.w3.org/TR/REC-html40" });
    return ue("Comment", a, { "ss:Author": t.a });
  }).join("");
}
function K2(e, t, r, a, n, i, s) {
  if (!e || e.v == null && e.f == null) return "";
  var f = {};
  if (e.f && (f["ss:Formula"] = "=" + Ge(si(e.f, s))), e.F && e.F.slice(0, t.length) == t) {
    var c = ar(e.F.slice(t.length + 1));
    f["ss:ArrayRange"] = "RC:R" + (c.r == s.r ? "" : "[" + (c.r - s.r) + "]") + "C" + (c.c == s.c ? "" : "[" + (c.c - s.c) + "]");
  }
  if (e.l && e.l.Target && (f["ss:HRef"] = Ge(e.l.Target), e.l.Tooltip && (f["x:HRefScreenTip"] = Ge(e.l.Tooltip))), r["!merges"])
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
      u = "Error", x = Nt[e.v];
      break;
    case "d":
      u = "DateTime", x = new Date(e.v).toISOString(), e.z == null && (e.z = e.z || Te[14]);
      break;
    case "s":
      u = "String", x = uo(e.v || "");
      break;
  }
  var d = $t(a.cellXfs, e, a);
  f["ss:StyleID"] = "s" + (21 + d), f["ss:Index"] = s.c + 1;
  var v = e.v != null ? x : "", h = e.t == "z" ? "" : '<Data ss:Type="' + u + '">' + v + "</Data>";
  return (e.c || []).length > 0 && (h += $2(e.c)), ue("Cell", h, f);
}
function j2(e, t) {
  var r = '<Row ss:Index="' + (e + 1) + '"';
  return t && (t.hpt && !t.hpx && (t.hpx = Ia(t.hpt)), t.hpx && (r += ' ss:AutoFitHeight="0" ss:Height="' + t.hpx + '"'), t.hidden && (r += ' ss:Hidden="1"')), r + ">";
}
function Y2(e, t, r, a) {
  if (!e["!ref"]) return "";
  var n = Ue(e["!ref"]), i = e["!merges"] || [], s = 0, f = [];
  e["!cols"] && e["!cols"].forEach(function(p, k) {
    Vt(p);
    var T = !!p.width, g = Qn(k, p), D = { "ss:Index": k + 1 };
    T && (D["ss:Width"] = nn(g.width)), p.hidden && (D["ss:Hidden"] = "1"), f.push(ue("Column", null, D));
  });
  for (var c = Array.isArray(e), l = n.s.r; l <= n.e.r; ++l) {
    for (var o = [j2(l, (e["!rows"] || [])[l])], u = n.s.c; u <= n.e.c; ++u) {
      var x = !1;
      for (s = 0; s != i.length; ++s)
        if (!(i[s].s.c > u) && !(i[s].s.r > l) && !(i[s].e.c < u) && !(i[s].e.r < l)) {
          (i[s].s.c != u || i[s].s.r != l) && (x = !0);
          break;
        }
      if (!x) {
        var d = { r: l, c: u }, v = Fe(d), h = c ? (e[l] || [])[u] : e[v];
        o.push(K2(h, v, e, t, r, a, d));
      }
    }
    o.push("</Row>"), o.length > 2 && f.push(o.join(""));
  }
  return f.join("");
}
function J2(e, t, r) {
  var a = [], n = r.SheetNames[e], i = r.Sheets[n], s = i ? G2(i, t, e, r) : "";
  return s.length > 0 && a.push("<Names>" + s + "</Names>"), s = i ? Y2(i, t, e, r) : "", s.length > 0 && a.push("<Table>" + s + "</Table>"), a.push(z2(i, t, e, r)), a.join("");
}
function q2(e, t) {
  t || (t = {}), e.SSF || (e.SSF = Ze(Te)), e.SSF && (Ra(), $n(e.SSF), t.revssf = jn(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF, t.cellXfs = [], $t(t.cellXfs, {}, { revssf: { General: 0 } }));
  var r = [];
  r.push(W2(e, t)), r.push(V2()), r.push(""), r.push("");
  for (var a = 0; a < e.SheetNames.length; ++a)
    r.push(ue("Worksheet", J2(a, t, e), { "ss:Name": Ge(e.SheetNames[a]) }));
  return r[2] = H2(e, t), r[3] = X2(e), ur + ue("Workbook", r.join(""), {
    xmlns: Kr.ss,
    "xmlns:o": Kr.o,
    "xmlns:x": Kr.x,
    "xmlns:ss": Kr.ss,
    "xmlns:dt": Kr.dt,
    "xmlns:html": Kr.html
  });
}
function Z2(e) {
  var t = {}, r = e.content;
  if (r.l = 28, t.AnsiUserType = r.read_shift(0, "lpstr-ansi"), t.AnsiClipboardFormat = Xo(r), r.length - r.l <= 4) return t;
  var a = r.read_shift(4);
  if (a == 0 || a > 40 || (r.l -= 4, t.Reserved1 = r.read_shift(0, "lpstr-ansi"), r.length - r.l <= 4) || (a = r.read_shift(4), a !== 1907505652) || (t.UnicodeClipboardFormat = Go(r), a = r.read_shift(4), a == 0 || a > 40)) return t;
  r.l -= 4, t.Reserved2 = r.read_shift(0, "lpwstr");
}
var Q2 = [60, 1084, 2066, 2165, 2175];
function eg(e, t, r, a, n) {
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
  for (var c = At(r, r.l), l = C0[c], o = 0; l != null && Q2.indexOf(c) > -1; )
    i = At(r, r.l + 2), o = r.l + 4, c == 2066 ? o += 4 : (c == 2165 || c == 2175) && (o += 12), f = r.slice(o, r.l + 4 + i), s.push(f), r.l += 4 + i, l = C0[c = At(r, r.l)];
  var u = Er(s);
  Fr(u, 0);
  var x = 0;
  u.lens = [];
  for (var d = 0; d < s.length; ++d)
    u.lens.push(x), x += s[d].length;
  if (u.length < a) throw "XLS Record 0x" + e.toString(16) + " Truncated: " + u.length + " < " + a;
  return t.f(u, u.length, n);
}
function wt(e, t, r) {
  if (e.t !== "z" && e.XF) {
    var a = 0;
    try {
      a = e.z || e.XF.numFmtId || 0, t.cellNF && (e.z = Te[a]);
    } catch (i) {
      if (t.WTF) throw i;
    }
    if (!t || t.cellText !== !1) try {
      e.t === "e" ? e.w = e.w || Nt[e.v] : a === 0 || a == "General" ? e.t === "n" ? (e.v | 0) === e.v ? e.w = e.v.toString(10) : e.w = Za(e.v) : e.w = aa(e.v) : e.w = ft(a, e.v, { date1904: !!r, dateNF: t && t.dateNF });
    } catch (i) {
      if (t.WTF) throw i;
    }
    if (t.cellDates && a && e.t == "n" && Oa(Te[a] || String(a))) {
      var n = Zt(e.v);
      n && (e.t = "d", e.v = new Date(n.y, n.m - 1, n.d, n.H, n.M, n.S, n.u));
    }
  }
}
function In(e, t, r) {
  return { v: e, ixfe: t, t: r };
}
function rg(e, t) {
  var r = { opts: {} }, a = {}, n = t.dense ? [] : {}, i = {}, s = {}, f = null, c = [], l = "", o = {}, u, x = "", d, v, h, p, k = {}, T = [], g, D, N = [], b = [], F = { Sheets: [], WBProps: { date1904: !1 }, Views: [{}] }, B = {}, O = function(Le) {
    return Le < 8 ? Qt[Le] : Le < 64 && b[Le - 8] || Qt[Le];
  }, z = function(Le, fr, Zr) {
    var mr = fr.XF.data;
    if (!(!mr || !mr.patternType || !Zr || !Zr.cellStyles)) {
      fr.s = {}, fr.s.patternType = mr.patternType;
      var Kt;
      (Kt = an(O(mr.icvFore))) && (fr.s.fgColor = { rgb: Kt }), (Kt = an(O(mr.icvBack))) && (fr.s.bgColor = { rgb: Kt });
    }
  }, X = function(Le, fr, Zr) {
    if (!(Se > 1) && !(Zr.sheetRows && Le.r >= Zr.sheetRows)) {
      if (Zr.cellStyles && fr.XF && fr.XF.data && z(Le, fr, Zr), delete fr.ixfe, delete fr.XF, u = Le, x = Fe(Le), (!s || !s.s || !s.e) && (s = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }), Le.r < s.s.r && (s.s.r = Le.r), Le.c < s.s.c && (s.s.c = Le.c), Le.r + 1 > s.e.r && (s.e.r = Le.r + 1), Le.c + 1 > s.e.c && (s.e.c = Le.c + 1), Zr.cellFormula && fr.f) {
        for (var mr = 0; mr < T.length; ++mr)
          if (!(T[mr][0].s.c > Le.c || T[mr][0].s.r > Le.r) && !(T[mr][0].e.c < Le.c || T[mr][0].e.r < Le.r)) {
            fr.F = De(T[mr][0]), (T[mr][0].s.c != Le.c || T[mr][0].s.r != Le.r) && delete fr.f, fr.f && (fr.f = "" + Rr(T[mr][1], s, Le, U, L));
            break;
          }
      }
      Zr.dense ? (n[Le.r] || (n[Le.r] = []), n[Le.r][Le.c] = fr) : n[x] = fr;
    }
  }, L = {
    enc: !1,
    // encrypted
    sbcch: 0,
    // cch in the preceding SupBook
    snames: [],
    // sheetnames
    sharedf: k,
    // shared formulae by address
    arrayf: T,
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
  t.password && (L.password = t.password);
  var te, pe = [], oe = [], de = [], ve = [], Ie = !1, U = [];
  U.SheetNames = L.snames, U.sharedf = L.sharedf, U.arrayf = L.arrayf, U.names = [], U.XTI = [];
  var Ee = 0, Se = 0, C = 0, P = [], I = [], R;
  L.codepage = 1200, xt(1200);
  for (var Y = !1; e.l < e.length - 1; ) {
    var fe = e.l, ce = e.read_shift(2);
    if (ce === 0 && Ee === 10) break;
    var ie = e.l === e.length ? 0 : e.read_shift(2), ne = C0[ce];
    if (ne && ne.f) {
      if (t.bookSheets && Ee === 133 && ce !== 133)
        break;
      if (Ee = ce, ne.r === 2 || ne.r == 12) {
        var Ae = e.read_shift(2);
        if (ie -= 2, !L.enc && Ae !== ce && ((Ae & 255) << 8 | Ae >> 8) !== ce) throw new Error("rt mismatch: " + Ae + "!=" + ce);
        ne.r == 12 && (e.l += 10, ie -= 10);
      }
      var A = {};
      if (ce === 10 ? A = /*::(*/
      ne.f(e, ie, L) : A = /*::(*/
      eg(ce, ne, e, ie, L), Se == 0 && [9, 521, 1033, 2057].indexOf(Ee) === -1) continue;
      switch (ce) {
        case 34:
          r.opts.Date1904 = F.WBProps.date1904 = A;
          break;
        case 134:
          r.opts.WriteProtect = !0;
          break;
        case 47:
          if (L.enc || (e.l = 0), L.enc = A, !t.password) throw new Error("File is password-protected");
          if (A.valid == null) throw new Error("Encryption scheme unsupported");
          if (!A.valid) throw new Error("Password is incorrect");
          break;
        case 92:
          L.lastuser = A;
          break;
        case 66:
          var $e = Number(A);
          switch ($e) {
            case 21010:
              $e = 1200;
              break;
            case 32768:
              $e = 1e4;
              break;
            case 32769:
              $e = 1252;
              break;
          }
          xt(L.codepage = $e), Y = !0;
          break;
        case 317:
          L.rrtabid = A;
          break;
        case 25:
          L.winlocked = A;
          break;
        case 439:
          r.opts.RefreshAll = A;
          break;
        case 12:
          r.opts.CalcCount = A;
          break;
        case 16:
          r.opts.CalcDelta = A;
          break;
        case 17:
          r.opts.CalcIter = A;
          break;
        case 13:
          r.opts.CalcMode = A;
          break;
        case 14:
          r.opts.CalcPrecision = A;
          break;
        case 95:
          r.opts.CalcSaveRecalc = A;
          break;
        case 15:
          L.CalcRefMode = A;
          break;
        case 2211:
          r.opts.FullCalc = A;
          break;
        case 129:
          A.fDialog && (n["!type"] = "dialog"), A.fBelow || ((n["!outline"] || (n["!outline"] = {})).above = !0), A.fRight || ((n["!outline"] || (n["!outline"] = {})).left = !0);
          break;
        case 224:
          N.push(A);
          break;
        case 430:
          U.push([A]), U[U.length - 1].XTI = [];
          break;
        case 35:
        case 547:
          U[U.length - 1].push(A);
          break;
        case 24:
        case 536:
          R = {
            Name: A.Name,
            Ref: Rr(A.rgce, s, null, U, L)
          }, A.itab > 0 && (R.Sheet = A.itab - 1), U.names.push(R), U[0] || (U[0] = [], U[0].XTI = []), U[U.length - 1].push(A), A.Name == "_xlnm._FilterDatabase" && A.itab > 0 && A.rgce && A.rgce[0] && A.rgce[0][0] && A.rgce[0][0][0] == "PtgArea3d" && (I[A.itab - 1] = { ref: De(A.rgce[0][0][1][2]) });
          break;
        case 22:
          L.ExternCount = A;
          break;
        case 23:
          U.length == 0 && (U[0] = [], U[0].XTI = []), U[U.length - 1].XTI = U[U.length - 1].XTI.concat(A), U.XTI = U.XTI.concat(A);
          break;
        case 2196:
          if (L.biff < 8) break;
          R != null && (R.Comment = A[1]);
          break;
        case 18:
          n["!protect"] = A;
          break;
        case 19:
          A !== 0 && L.WTF && console.error("Password verifier: " + A);
          break;
        case 133:
          i[A.pos] = A, L.snames.push(A.name);
          break;
        case 10:
          {
            if (--Se) break;
            if (s.e) {
              if (s.e.r > 0 && s.e.c > 0) {
                if (s.e.r--, s.e.c--, n["!ref"] = De(s), t.sheetRows && t.sheetRows <= s.e.r) {
                  var Pe = s.e.r;
                  s.e.r = t.sheetRows - 1, n["!fullref"] = n["!ref"], n["!ref"] = De(s), s.e.r = Pe;
                }
                s.e.r++, s.e.c++;
              }
              pe.length > 0 && (n["!merges"] = pe), oe.length > 0 && (n["!objects"] = oe), de.length > 0 && (n["!cols"] = de), ve.length > 0 && (n["!rows"] = ve), F.Sheets.push(B);
            }
            l === "" ? o = n : a[l] = n, n = t.dense ? [] : {};
          }
          break;
        case 9:
        case 521:
        case 1033:
        case 2057:
          {
            if (L.biff === 8 && (L.biff = {
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
            }[A.BIFFVer] || 8), L.biffguess = A.BIFFVer == 0, A.BIFFVer == 0 && A.dt == 4096 && (L.biff = 5, Y = !0, xt(L.codepage = 28591)), L.biff == 8 && A.BIFFVer == 0 && A.dt == 16 && (L.biff = 2), Se++) break;
            if (n = t.dense ? [] : {}, L.biff < 8 && !Y && (Y = !0, xt(L.codepage = t.codepage || 1252)), L.biff < 5 || A.BIFFVer == 0 && A.dt == 4096) {
              l === "" && (l = "Sheet1"), s = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } };
              var re = { pos: e.l - ie, name: l };
              i[re.pos] = re, L.snames.push(l);
            } else l = (i[fe] || { name: "" }).name;
            A.dt == 32 && (n["!type"] = "chart"), A.dt == 64 && (n["!type"] = "macro"), pe = [], oe = [], L.arrayf = T = [], de = [], ve = [], Ie = !1, B = { Hidden: (i[fe] || { hs: 0 }).hs, name: l };
          }
          break;
        case 515:
        case 3:
        case 2:
          n["!type"] == "chart" && (t.dense ? (n[A.r] || [])[A.c] : n[Fe({ c: A.c, r: A.r })]) && ++A.c, g = { ixfe: A.ixfe, XF: N[A.ixfe] || {}, v: A.val, t: "n" }, C > 0 && (g.z = P[g.ixfe >> 8 & 63]), wt(g, t, r.opts.Date1904), X({ c: A.c, r: A.r }, g, t);
          break;
        case 5:
        case 517:
          g = { ixfe: A.ixfe, XF: N[A.ixfe], v: A.val, t: A.t }, C > 0 && (g.z = P[g.ixfe >> 8 & 63]), wt(g, t, r.opts.Date1904), X({ c: A.c, r: A.r }, g, t);
          break;
        case 638:
          g = { ixfe: A.ixfe, XF: N[A.ixfe], v: A.rknum, t: "n" }, C > 0 && (g.z = P[g.ixfe >> 8 & 63]), wt(g, t, r.opts.Date1904), X({ c: A.c, r: A.r }, g, t);
          break;
        case 189:
          for (var G = A.c; G <= A.C; ++G) {
            var Z = A.rkrec[G - A.c][0];
            g = { ixfe: Z, XF: N[Z], v: A.rkrec[G - A.c][1], t: "n" }, C > 0 && (g.z = P[g.ixfe >> 8 & 63]), wt(g, t, r.opts.Date1904), X({ c: G, r: A.r }, g, t);
          }
          break;
        case 6:
        case 518:
        case 1030:
          {
            if (A.val == "String") {
              f = A;
              break;
            }
            if (g = In(A.val, A.cell.ixfe, A.tt), g.XF = N[g.ixfe], t.cellFormula) {
              var ke = A.formula;
              if (ke && ke[0] && ke[0][0] && ke[0][0][0] == "PtgExp") {
                var We = ke[0][0][1][0], _e = ke[0][0][1][1], Qe = Fe({ r: We, c: _e });
                k[Qe] ? g.f = "" + Rr(A.formula, s, A.cell, U, L) : g.F = ((t.dense ? (n[We] || [])[_e] : n[Qe]) || {}).F;
              } else g.f = "" + Rr(A.formula, s, A.cell, U, L);
            }
            C > 0 && (g.z = P[g.ixfe >> 8 & 63]), wt(g, t, r.opts.Date1904), X(A.cell, g, t), f = A;
          }
          break;
        case 7:
        case 519:
          if (f)
            f.val = A, g = In(A, f.cell.ixfe, "s"), g.XF = N[g.ixfe], t.cellFormula && (g.f = "" + Rr(f.formula, s, f.cell, U, L)), C > 0 && (g.z = P[g.ixfe >> 8 & 63]), wt(g, t, r.opts.Date1904), X(f.cell, g, t), f = null;
          else throw new Error("String record expects Formula");
          break;
        case 33:
        case 545:
          {
            T.push(A);
            var $r = Fe(A[0].s);
            if (d = t.dense ? (n[A[0].s.r] || [])[A[0].s.c] : n[$r], t.cellFormula && d) {
              if (!f || !$r || !d) break;
              d.f = "" + Rr(A[1], s, A[0], U, L), d.F = De(A[0]);
            }
          }
          break;
        case 1212:
          {
            if (!t.cellFormula) break;
            if (x) {
              if (!f) break;
              k[Fe(f.cell)] = A[0], d = t.dense ? (n[f.cell.r] || [])[f.cell.c] : n[Fe(f.cell)], (d || {}).f = "" + Rr(A[0], s, u, U, L);
            }
          }
          break;
        case 253:
          g = In(c[A.isst].t, A.ixfe, "s"), c[A.isst].h && (g.h = c[A.isst].h), g.XF = N[g.ixfe], C > 0 && (g.z = P[g.ixfe >> 8 & 63]), wt(g, t, r.opts.Date1904), X({ c: A.c, r: A.r }, g, t);
          break;
        case 513:
          t.sheetStubs && (g = { ixfe: A.ixfe, XF: N[A.ixfe], t: "z" }, C > 0 && (g.z = P[g.ixfe >> 8 & 63]), wt(g, t, r.opts.Date1904), X({ c: A.c, r: A.r }, g, t));
          break;
        case 190:
          if (t.sheetStubs)
            for (var Ar = A.c; Ar <= A.C; ++Ar) {
              var ee = A.ixfe[Ar - A.c];
              g = { ixfe: ee, XF: N[ee], t: "z" }, C > 0 && (g.z = P[g.ixfe >> 8 & 63]), wt(g, t, r.opts.Date1904), X({ c: Ar, r: A.r }, g, t);
            }
          break;
        case 214:
        case 516:
        case 4:
          g = In(A.val, A.ixfe, "s"), g.XF = N[g.ixfe], C > 0 && (g.z = P[g.ixfe >> 8 & 63]), wt(g, t, r.opts.Date1904), X({ c: A.c, r: A.r }, g, t);
          break;
        case 0:
        case 512:
          Se === 1 && (s = A);
          break;
        case 252:
          c = A;
          break;
        case 1054:
          if (L.biff == 4) {
            P[C++] = A[1];
            for (var hr = 0; hr < C + 163 && Te[hr] != A[1]; ++hr) ;
            hr >= 163 && Dt(A[1], C + 163);
          } else Dt(A[1], A[0]);
          break;
        case 30:
          {
            P[C++] = A;
            for (var Cr = 0; Cr < C + 163 && Te[Cr] != A; ++Cr) ;
            Cr >= 163 && Dt(A, C + 163);
          }
          break;
        case 229:
          pe = pe.concat(A);
          break;
        case 93:
          oe[A.cmo[0]] = L.lastobj = A;
          break;
        case 438:
          L.lastobj.TxO = A;
          break;
        case 127:
          L.lastobj.ImData = A;
          break;
        case 440:
          for (p = A[0].s.r; p <= A[0].e.r; ++p)
            for (h = A[0].s.c; h <= A[0].e.c; ++h)
              d = t.dense ? (n[p] || [])[h] : n[Fe({ c: h, r: p })], d && (d.l = A[1]);
          break;
        case 2048:
          for (p = A[0].s.r; p <= A[0].e.r; ++p)
            for (h = A[0].s.c; h <= A[0].e.c; ++h)
              d = t.dense ? (n[p] || [])[h] : n[Fe({ c: h, r: p })], d && d.l && (d.l.Tooltip = A[1]);
          break;
        case 28:
          {
            if (L.biff <= 5 && L.biff >= 2) break;
            d = t.dense ? (n[A[0].r] || [])[A[0].c] : n[Fe(A[0])];
            var lt = oe[A[2]];
            d || (t.dense ? (n[A[0].r] || (n[A[0].r] = []), d = n[A[0].r][A[0].c] = { t: "z" }) : d = n[Fe(A[0])] = { t: "z" }, s.e.r = Math.max(s.e.r, A[0].r), s.s.r = Math.min(s.s.r, A[0].r), s.e.c = Math.max(s.e.c, A[0].c), s.s.c = Math.min(s.s.c, A[0].c)), d.c || (d.c = []), v = { a: A[1], t: lt.TxO.t }, d.c.push(v);
          }
          break;
        case 2173:
          Hx(N[A.ixfe], A.ext);
          break;
        case 125:
          {
            if (!L.cellStyles) break;
            for (; A.e >= A.s; )
              de[A.e--] = { width: A.w / 256, level: A.level || 0, hidden: !!(A.flags & 1) }, Ie || (Ie = !0, ai(A.w / 256)), Vt(de[A.e + 1]);
          }
          break;
        case 520:
          {
            var Mr = {};
            A.level != null && (ve[A.r] = Mr, Mr.level = A.level), A.hidden && (ve[A.r] = Mr, Mr.hidden = !0), A.hpt && (ve[A.r] = Mr, Mr.hpt = A.hpt, Mr.hpx = Ia(A.hpt));
          }
          break;
        case 38:
        case 39:
        case 40:
        case 41:
          n["!margins"] || ta(n["!margins"] = {}), n["!margins"][{ 38: "left", 39: "right", 40: "top", 41: "bottom" }[ce]] = A;
          break;
        case 161:
          n["!margins"] || ta(n["!margins"] = {}), n["!margins"].header = A.header, n["!margins"].footer = A.footer;
          break;
        case 574:
          A.RTL && (F.Views[0].RTL = !0);
          break;
        case 146:
          b = A;
          break;
        case 2198:
          te = A;
          break;
        case 140:
          D = A;
          break;
        case 442:
          l ? B.CodeName = A || B.name : F.WBProps.CodeName = A || "ThisWorkbook";
          break;
      }
    } else
      ne || console.error("Missing Info for XLS Record 0x" + ce.toString(16)), e.l += ie;
  }
  return r.SheetNames = sr(i).sort(function(mt, Le) {
    return Number(mt) - Number(Le);
  }).map(function(mt) {
    return i[mt].name;
  }), t.bookSheets || (r.Sheets = a), !r.SheetNames.length && o["!ref"] ? (r.SheetNames.push("Sheet1"), r.Sheets && (r.Sheets.Sheet1 = o)) : r.Preamble = o, r.Sheets && I.forEach(function(mt, Le) {
    r.Sheets[r.SheetNames[Le]]["!autofilter"] = mt;
  }), r.Strings = c, r.SSF = Ze(Te), L.enc && (r.Encryption = L.enc), te && (r.Themes = te), r.Metadata = {}, D !== void 0 && (r.Metadata.Country = D), U.names.length > 0 && (F.Names = U.names), r.Workbook = F, r;
}
var Ya = {
  SI: "e0859ff2f94f6810ab9108002b27b3d9",
  DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
  UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
};
function tg(e, t, r) {
  var a = we.find(e, "/!DocumentSummaryInformation");
  if (a && a.size > 0) try {
    var n = ls(a, k0, Ya.DSI);
    for (var i in n) t[i] = n[i];
  } catch (l) {
    if (r.WTF) throw l;
  }
  var s = we.find(e, "/!SummaryInformation");
  if (s && s.size > 0) try {
    var f = ls(s, E0, Ya.SI);
    for (var c in f) t[c] == null && (t[c] = f[c]);
  } catch (l) {
    if (r.WTF) throw l;
  }
  t.HeadingPairs && t.TitlesOfParts && (Nf(t.HeadingPairs, t.TitlesOfParts, t, r), delete t.HeadingPairs, delete t.TitlesOfParts);
}
function ag(e, t) {
  var r = [], a = [], n = [], i = 0, s, f = Ui(k0, "n"), c = Ui(E0, "n");
  if (e.Props)
    for (s = sr(e.Props), i = 0; i < s.length; ++i) (Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(c, s[i]) ? a : n).push([s[i], e.Props[s[i]]]);
  if (e.Custprops)
    for (s = sr(e.Custprops), i = 0; i < s.length; ++i) Object.prototype.hasOwnProperty.call(e.Props || {}, s[i]) || (Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(c, s[i]) ? a : n).push([s[i], e.Custprops[s[i]]]);
  var l = [];
  for (i = 0; i < n.length; ++i)
    Vf.indexOf(n[i][0]) > -1 || bf.indexOf(n[i][0]) > -1 || n[i][1] != null && l.push(n[i]);
  a.length && we.utils.cfb_add(t, "/SummaryInformation", os(a, Ya.SI, c, E0)), (r.length || l.length) && we.utils.cfb_add(t, "/DocumentSummaryInformation", os(r, Ya.DSI, f, k0, l.length ? l : null, Ya.UDI));
}
function Lc(e, t) {
  t || (t = {}), hi(t), b0(), t.codepage && R0(t.codepage);
  var r, a;
  if (e.FullPaths) {
    if (we.find(e, "/encryption")) throw new Error("File is password-protected");
    r = we.find(e, "!CompObj"), a = we.find(e, "/Workbook") || we.find(e, "/Book");
  } else {
    switch (t.type) {
      case "base64":
        e = Yr(qr(e));
        break;
      case "binary":
        e = Yr(e);
        break;
      case "buffer":
        break;
      case "array":
        Array.isArray(e) || (e = Array.prototype.slice.call(e));
        break;
    }
    Fr(e, 0), a = { content: e };
  }
  var n, i;
  if (r && Z2(r), t.bookProps && !t.bookSheets) n = {};
  else {
    var s = Ne ? "buffer" : "array";
    if (a && a.content) n = rg(a.content, t);
    else if ((i = we.find(e, "PerfectOffice_MAIN")) && i.content) n = ra.to_workbook(i.content, (t.type = s, t));
    else if ((i = we.find(e, "NativeContent_MAIN")) && i.content) n = ra.to_workbook(i.content, (t.type = s, t));
    else throw (i = we.find(e, "MN0")) && i.content ? new Error("Unsupported Works 4 for Mac file") : new Error("Cannot find Workbook stream");
    t.bookVBA && e.FullPaths && we.find(e, "/_VBA_PROJECT_CUR/VBA/dir") && (n.vbaraw = pd(e));
  }
  var f = {};
  return e.FullPaths && tg(
    /*::((*/
    e,
    f,
    t
  ), n.Props = n.Custprops = f, t.bookFiles && (n.cfb = e), n;
}
function ng(e, t) {
  var r = t || {}, a = we.utils.cfb_new({ root: "R" }), n = "/Workbook";
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
  return we.utils.cfb_add(a, n, Bc(e, r)), r.biff == 8 && (e.Props || e.Custprops) && ag(e, a), r.biff == 8 && e.vbaraw && md(a, we.read(e.vbaraw, { type: typeof e.vbaraw == "string" ? "binary" : "buffer" })), a;
}
var cn = {
  /*::[*/
  0: {
    /* n:"BrtRowHdr", */
    f: Cp
  },
  /*::[*/
  1: {
    /* n:"BrtCellBlank", */
    f: Lp
  },
  /*::[*/
  2: {
    /* n:"BrtCellRk", */
    f: rm
  },
  /*::[*/
  3: {
    /* n:"BrtCellError", */
    f: Gp
  },
  /*::[*/
  4: {
    /* n:"BrtCellBool", */
    f: Wp
  },
  /*::[*/
  5: {
    /* n:"BrtCellReal", */
    f: Zp
  },
  /*::[*/
  6: {
    /* n:"BrtCellSt", */
    f: sm
  },
  /*::[*/
  7: {
    /* n:"BrtCellIsst", */
    f: jp
  },
  /*::[*/
  8: {
    /* n:"BrtFmlaString", */
    f: xm
  },
  /*::[*/
  9: {
    /* n:"BrtFmlaNum", */
    f: hm
  },
  /*::[*/
  10: {
    /* n:"BrtFmlaBool", */
    f: om
  },
  /*::[*/
  11: {
    /* n:"BrtFmlaError", */
    f: um
  },
  /*::[*/
  12: {
    /* n:"BrtShortBlank", */
    f: Mp
  },
  /*::[*/
  13: {
    /* n:"BrtShortRk", */
    f: am
  },
  /*::[*/
  14: {
    /* n:"BrtShortError", */
    f: $p
  },
  /*::[*/
  15: {
    /* n:"BrtShortBool", */
    f: Hp
  },
  /*::[*/
  16: {
    /* n:"BrtShortReal", */
    f: Cc
  },
  /*::[*/
  17: {
    /* n:"BrtShortSt", */
    f: cm
  },
  /*::[*/
  18: {
    /* n:"BrtShortIsst", */
    f: Jp
  },
  /*::[*/
  19: {
    /* n:"BrtSSTItem", */
    f: K0
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
    f: c2
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
    f: sx
  },
  /*::[*/
  44: {
    /* n:"BrtFmt", */
    f: nx
  },
  /*::[*/
  45: {
    /* n:"BrtFill", */
    f: lx
  },
  /*::[*/
  46: {
    /* n:"BrtBorder", */
    f: ux
  },
  /*::[*/
  47: {
    /* n:"BrtXF", */
    f: ox
  },
  /*::[*/
  48: {
    /* n:"BrtStyle" */
  },
  /*::[*/
  49: {
    /* n:"BrtCellMeta", */
    f: Oo
  },
  /*::[*/
  50: {
    /* n:"BrtValueMeta" */
  },
  /*::[*/
  51: {
    /* n:"BrtMdb" */
    f: zx
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
    f: Zf
  },
  /*::[*/
  62: {
    /* n:"BrtCellRString", */
    f: im
  },
  /*::[*/
  63: {
    /* n:"BrtCalcChainItem$", */
    f: ed
  },
  /*::[*/
  64: {
    /* n:"BrtDVal", */
    f: Dm
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
    f: Lr,
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
    f: Fm
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
    f: Np
  },
  /*::[*/
  148: {
    /* n:"BrtWsDim", */
    f: Op,
    p: 16
  },
  /*::[*/
  151: {
    /* n:"BrtPane", */
    f: _m
  },
  /*::[*/
  152: {
    /* n:"BrtSel" */
  },
  /*::[*/
  153: {
    /* n:"BrtWbProp", */
    f: i2
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
    f: a2
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
    f: k1
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
    f: xa
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
    f: dm
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
    f: Xx
  },
  /*::[*/
  336: {
    /* n:"BrtEndEsmdtinfo", */
    T: -1
  },
  /*::[*/
  337: {
    /* n:"BrtBeginEsmdb", */
    f: jx,
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
    f: w0
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
    f: qf
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
    f: wm
  },
  /*::[*/
  427: {
    /* n:"BrtShrFmla", */
    f: km
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
    f: Tm
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
    f: bp
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
    f: mm
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
    f: w0
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
    f: ud
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
    f: ld
  },
  /*::[*/
  636: {
    /* n:"BrtEndComment", */
    T: -1
  },
  /*::[*/
  637: {
    /* n:"BrtCommentText", */
    f: Po
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
    f: $m
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
    f: Im
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
}, C0 = {
  /* [MS-XLS] 2.3 Record Enumeration 2021-08-17 */
  /*::[*/
  6: {
    /* n:"Formula", */
    f: h0
  },
  /*::[*/
  10: {
    /* n:"EOF", */
    f: Bt
  },
  /*::[*/
  12: {
    /* n:"CalcCount", */
    f: pr
  },
  //
  /*::[*/
  13: {
    /* n:"CalcMode", */
    f: pr
  },
  //
  /*::[*/
  14: {
    /* n:"CalcPrecision", */
    f: lr
  },
  //
  /*::[*/
  15: {
    /* n:"CalcRefMode", */
    f: lr
  },
  //
  /*::[*/
  16: {
    /* n:"CalcDelta", */
    f: Nr
  },
  //
  /*::[*/
  17: {
    /* n:"CalcIter", */
    f: lr
  },
  //
  /*::[*/
  18: {
    /* n:"Protect", */
    f: lr
  },
  /*::[*/
  19: {
    /* n:"Password", */
    f: pr
  },
  /*::[*/
  20: {
    /* n:"Header", */
    f: ps
  },
  /*::[*/
  21: {
    /* n:"Footer", */
    f: ps
  },
  /*::[*/
  23: {
    /* n:"ExternSheet", */
    f: qf
  },
  /*::[*/
  24: {
    /* n:"Lbl", */
    f: gs
  },
  /*::[*/
  25: {
    /* n:"WinProtect", */
    f: lr
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
    f: Ih
  },
  /*::[*/
  29: {
    /* n:"Selection", */
  },
  /*::[*/
  34: {
    /* n:"Date1904", */
    f: lr
  },
  /*::[*/
  35: {
    /* n:"ExternName", */
    f: ms
  },
  /*::[*/
  38: {
    /* n:"LeftMargin", */
    f: Nr
  },
  // *
  /*::[*/
  39: {
    /* n:"RightMargin", */
    f: Nr
  },
  // *
  /*::[*/
  40: {
    /* n:"TopMargin", */
    f: Nr
  },
  // *
  /*::[*/
  41: {
    /* n:"BottomMargin", */
    f: Nr
  },
  // *
  /*::[*/
  42: {
    /* n:"PrintRowCol", */
    f: lr
  },
  /*::[*/
  43: {
    /* n:"PrintGrid", */
    f: lr
  },
  /*::[*/
  47: {
    /* n:"FilePass", */
    f: H1
  },
  /*::[*/
  49: {
    /* n:"Font", */
    f: ah
  },
  /*::[*/
  51: {
    /* n:"PrintSize", */
    f: pr
  },
  /*::[*/
  60: {
    /* n:"Continue", */
  },
  /*::[*/
  61: {
    /* n:"Window1", */
    f: Zu
  },
  /*::[*/
  64: {
    /* n:"Backup", */
    f: lr
  },
  /*::[*/
  65: {
    /* n:"Pane", */
    f: th
  },
  /*::[*/
  66: {
    /* n:"CodePage", */
    f: pr
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
    f: pr
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
    f: Vu
  },
  /*::[*/
  93: {
    /* n:"Obj", */
    f: bh
  },
  /*::[*/
  94: {
    /* n:"Uncalced", */
  },
  /*::[*/
  95: {
    /* n:"CalcSaveRecalc", */
    f: lr
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
    f: lr
  },
  /*::[*/
  125: {
    /* n:"ColInfo", */
    f: Zf
  },
  /*::[*/
  128: {
    /* n:"Guts", */
    f: gh
  },
  /*::[*/
  129: {
    /* n:"WsBool", */
    f: Xu
  },
  /*::[*/
  130: {
    /* n:"GridSet", */
    f: pr
  },
  /*::[*/
  131: {
    /* n:"HCenter", */
    f: lr
  },
  /*::[*/
  132: {
    /* n:"VCenter", */
    f: lr
  },
  /*::[*/
  133: {
    /* n:"BoundSheet8", */
    f: Gu
  },
  /*::[*/
  134: {
    /* n:"WriteProtect", */
  },
  /*::[*/
  140: {
    /* n:"Country", */
    f: Vh
  },
  /*::[*/
  141: {
    /* n:"HideObj", */
    f: pr
  },
  /*::[*/
  144: {
    /* n:"Sort", */
  },
  /*::[*/
  146: {
    /* n:"Palette", */
    f: Gh
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
    f: pr
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
    f: qh
  },
  /*::[*/
  161: {
    /* n:"Setup", */
    f: Kh
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
    f: dh
  },
  /*::[*/
  190: {
    /* n:"MulBlank", */
    f: vh
  },
  /*::[*/
  193: {
    /* n:"Mms", */
    f: Bt
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
    f: lr
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
    f: pr
  },
  /*::[*/
  220: {
    /* n:"DbOrParamQry", */
  },
  /*::[*/
  221: {
    /* n:"ScenarioProtect", */
    f: lr
  },
  /*::[*/
  222: {
    /* n:"OleObjectSize", */
  },
  /*::[*/
  224: {
    /* n:"XF", */
    f: mh
  },
  /*::[*/
  225: {
    /* n:"InterfaceHdr", */
    f: Wu
  },
  /*::[*/
  226: {
    /* n:"InterfaceEnd", */
    f: Bt
  },
  /*::[*/
  227: {
    /* n:"SXVS", */
  },
  /*::[*/
  229: {
    /* n:"MergeCells", */
    f: Oh
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
    f: $u
  },
  /*::[*/
  253: {
    /* n:"LabelSst", */
    f: ih
  },
  /*::[*/
  255: {
    /* n:"ExtSST", */
    f: ju
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
    f: Hf
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
    f: lr
  },
  /*::[*/
  353: {
    /* n:"DSF", */
    f: Bt
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
    f: Th
  },
  /*::[*/
  431: {
    /* n:"Prot4Rev", */
    f: lr
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
    f: Lh
  },
  /*::[*/
  439: {
    /* n:"RefreshAll", */
    f: lr
  },
  //
  /*::[*/
  440: {
    /* n:"HLink", */
    f: Bh
  },
  /*::[*/
  441: {
    /* n:"Lel", */
  },
  /*::[*/
  442: {
    /* n:"CodeName", */
    f: dn
  },
  /*::[*/
  443: {
    /* n:"SXFDBType", */
  },
  /*::[*/
  444: {
    /* n:"Prot4RevPass", */
    f: pr
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
    f: Bt
  },
  /*::[*/
  449: {
    /* n:"RecalcId", */
    f: qu,
    r: 2
  },
  /*::[*/
  450: {
    /* n:"EntExU2", */
    f: Bt
  },
  /*::[*/
  512: {
    /* n:"Dimensions", */
    f: xs
  },
  /*::[*/
  513: {
    /* n:"Blank", */
    f: Jh
  },
  /*::[*/
  515: {
    /* n:"Number", */
    f: kh
  },
  /*::[*/
  516: {
    /* n:"Label", */
    f: fh
  },
  /*::[*/
  517: {
    /* n:"BoolErr", */
    f: vs
  },
  /*::[*/
  519: {
    /* n:"String", */
    f: Zh
  },
  /*::[*/
  520: {
    /* n:"Row", */
    f: Yu
  },
  /*::[*/
  523: {
    /* n:"Index", */
  },
  /*::[*/
  545: {
    /* n:"Array", */
    f: _s
  },
  /*::[*/
  549: {
    /* n:"DefaultRowHeight", */
    f: hs
  },
  /*::[*/
  566: {
    /* n:"Table", */
  },
  /*::[*/
  574: {
    /* n:"Window2", */
    f: eh
  },
  /*::[*/
  638: {
    /* n:"RK", */
    f: xh
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
    f: lh
  },
  /*::[*/
  1084: {
    /* n:"ContinueBigName", */
  },
  /*::[*/
  1212: {
    /* n:"ShrFmla", */
    f: Ah
  },
  /*::[*/
  2048: {
    /* n:"HLinkTooltip", */
    f: Uh
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
    f: An
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
    f: Bt
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
    f: zh,
    r: 12
  },
  /*::[*/
  2173: {
    /* n:"XFExt", */
    f: Vx,
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
    f: lr,
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
    f: yh,
    r: 12
  },
  /*::[*/
  2197: {
    /* n:"SortData", */
  },
  /*::[*/
  2198: {
    /* n:"Theme", */
    f: Px,
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
    f: Ch,
    r: 12
  },
  /*::[*/
  2203: {
    /* n:"CompressPictures", */
    f: Bt
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
    f: Ju
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
    f: pr
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
    f: jh
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
    f: Xh
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
    f: xs
  },
  /*::[*/
  1: {
    /* n:"BIFF2BLANK", */
  },
  /*::[*/
  2: {
    /* n:"BIFF2INT", */
    f: a1
  },
  /*::[*/
  3: {
    /* n:"BIFF2NUM", */
    f: r1
  },
  /*::[*/
  4: {
    /* n:"BIFF2STR", */
    f: e1
  },
  /*::[*/
  5: {
    /* n:"BoolErr", */
    f: vs
  },
  /*::[*/
  7: {
    /* n:"String", */
    f: i1
  },
  /*::[*/
  8: {
    /* n:"BIFF2ROW", */
  },
  /*::[*/
  9: {
    /* n:"BOF", */
    f: An
  },
  /*::[*/
  11: {
    /* n:"Index", */
  },
  /*::[*/
  22: {
    /* n:"ExternCount", */
    f: pr
  },
  /*::[*/
  30: {
    /* n:"BIFF2FORMAT", */
    f: uh
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
    f: _s
  },
  /*::[*/
  36: {
    /* n:"COLWIDTH", */
  },
  /*::[*/
  37: {
    /* n:"DefaultRowHeight", */
    f: hs
  },
  // 0x2c ??
  // 0x2d ??
  // 0x2e ??
  // 0x30 FONTCOUNT: number of fonts
  /*::[*/
  50: {
    /* n:"BIFF2FONTXTRA", */
    f: s1
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
    f: pr
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
    f: Qh
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
    f: f1
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
    f: h0
  },
  /*::[*/
  521: {
    /* n:"BOF", */
    f: An
  },
  /*::[*/
  536: {
    /* n:"Lbl", */
    f: gs
  },
  /*::[*/
  547: {
    /* n:"ExternName", */
    f: ms
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
    f: h0
  },
  /*::[*/
  1033: {
    /* n:"BOF", */
    f: An
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
function he(e, t, r, a) {
  var n = t;
  if (!isNaN(n)) {
    var i = a || (r || []).length || 0, s = e.next(4);
    s.write_shift(2, n), s.write_shift(2, i), /*:: len != null &&*/
    i > 0 && G0(r) && e.push(r);
  }
}
function ig(e, t, r, a) {
  var n = (r || []).length || 0;
  if (n <= 8224) return he(e, t, r, n);
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
function gn(e, t, r) {
  return e || (e = K(7)), e.write_shift(2, t), e.write_shift(2, r), e.write_shift(2, 0), e.write_shift(1, 0), e;
}
function sg(e, t, r, a) {
  var n = K(9);
  return gn(n, e, t), Xf(r, a || "b", n), n;
}
function fg(e, t, r) {
  var a = K(8 + 2 * r.length);
  return gn(a, e, t), a.write_shift(1, r.length), a.write_shift(r.length, r, "sbcs"), a.l < a.length ? a.slice(0, a.l) : a;
}
function cg(e, t, r, a) {
  if (t.v != null) switch (t.t) {
    case "d":
    case "n":
      var n = t.t == "d" ? wr(qe(t.v)) : t.v;
      n == (n | 0) && n >= 0 && n < 65536 ? he(e, 2, n1(r, a, n)) : he(e, 3, t1(r, a, n));
      return;
    case "b":
    case "e":
      he(e, 5, sg(r, a, t.v, t.t));
      return;
    case "s":
    case "str":
      he(e, 4, fg(r, a, (t.v || "").slice(0, 255)));
      return;
  }
  he(e, 1, gn(null, r, a));
}
function lg(e, t, r, a) {
  var n = Array.isArray(t), i = Ue(t["!ref"] || "A1"), s, f = "", c = [];
  if (i.e.c > 255 || i.e.r > 16383) {
    if (a.WTF) throw new Error("Range " + (t["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    i.e.c = Math.min(i.e.c, 255), i.e.r = Math.min(i.e.c, 16383), s = De(i);
  }
  for (var l = i.s.r; l <= i.e.r; ++l) {
    f = or(l);
    for (var o = i.s.c; o <= i.e.c; ++o) {
      l === i.s.r && (c[o] = tr(o)), s = c[o] + f;
      var u = n ? (t[l] || [])[o] : t[s];
      u && cg(e, u, l, o);
    }
  }
}
function og(e, t) {
  for (var r = t || {}, a = Gr(), n = 0, i = 0; i < e.SheetNames.length; ++i) e.SheetNames[i] == r.sheet && (n = i);
  if (n == 0 && r.sheet && e.SheetNames[0] != r.sheet) throw new Error("Sheet not found: " + r.sheet);
  return he(a, r.biff == 4 ? 1033 : r.biff == 3 ? 521 : 9, ei(e, 16, r)), lg(a, e.Sheets[e.SheetNames[n]], n, r), he(a, 10), a.end();
}
function ug(e, t, r) {
  he(e, 49, nh({
    sz: 12,
    name: "Arial"
  }, r));
}
function hg(e, t, r) {
  t && [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(a) {
    for (var n = a[0]; n <= a[1]; ++n) t[n] != null && he(e, 1054, oh(n, t[n], r));
  });
}
function xg(e, t) {
  var r = K(19);
  r.write_shift(4, 2151), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 1), r.write_shift(4, 0), he(e, 2151, r), r = K(39), r.write_shift(4, 2152), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 0), r.write_shift(4, 0), r.write_shift(2, 1), r.write_shift(4, 4), r.write_shift(2, 0), jf(Ue(t["!ref"] || "A1"), r), r.write_shift(4, 4), he(e, 2152, r);
}
function dg(e, t) {
  for (var r = 0; r < 16; ++r) he(e, 224, ds({ numFmtId: 0, style: !0 }, 0, t));
  t.cellXfs.forEach(function(a) {
    he(e, 224, ds(a, 0, t));
  });
}
function vg(e, t) {
  for (var r = 0; r < t["!links"].length; ++r) {
    var a = t["!links"][r];
    he(e, 440, Mh(a)), a[1].Tooltip && he(e, 2048, Wh(a));
  }
  delete t["!links"];
}
function pg(e, t) {
  if (t) {
    var r = 0;
    t.forEach(function(a, n) {
      ++r <= 256 && a && he(e, 125, $h(Qn(n, a), n));
    });
  }
}
function mg(e, t, r, a, n) {
  var i = 16 + $t(n.cellXfs, t, n);
  if (t.v == null && !t.bf) {
    he(e, 513, fa(r, a, i));
    return;
  }
  if (t.bf) he(e, 6, Xv(t, r, a, n, i));
  else switch (t.t) {
    case "d":
    case "n":
      var s = t.t == "d" ? wr(qe(t.v)) : t.v;
      he(e, 515, Eh(r, a, s, i));
      break;
    case "b":
    case "e":
      he(e, 517, wh(r, a, t.v, i, n, t.t));
      break;
    case "s":
    case "str":
      if (n.bookSST) {
        var f = ci(n.Strings, t.v, n.revStrings);
        he(e, 253, sh(r, a, f, i));
      } else he(e, 516, ch(r, a, (t.v || "").slice(0, 255), i, n));
      break;
    default:
      he(e, 513, fa(r, a, i));
  }
}
function gg(e, t, r) {
  var a = Gr(), n = r.SheetNames[e], i = r.Sheets[n] || {}, s = (r || {}).Workbook || {}, f = (s.Sheets || [])[e] || {}, c = Array.isArray(i), l = t.biff == 8, o, u = "", x = [], d = Ue(i["!ref"] || "A1"), v = l ? 65536 : 16384;
  if (d.e.c > 255 || d.e.r >= v) {
    if (t.WTF) throw new Error("Range " + (i["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    d.e.c = Math.min(d.e.c, 255), d.e.r = Math.min(d.e.c, v - 1);
  }
  he(a, 2057, ei(r, 16, t)), he(a, 13, it(1)), he(a, 12, it(100)), he(a, 15, Wr(!0)), he(a, 17, Wr(!1)), he(a, 16, ia(1e-3)), he(a, 95, Wr(!0)), he(a, 42, Wr(!1)), he(a, 43, Wr(!1)), he(a, 130, it(1)), he(a, 128, _h()), he(a, 131, Wr(!1)), he(a, 132, Wr(!1)), l && pg(a, i["!cols"]), he(a, 512, hh(d, t)), l && (i["!links"] = []);
  for (var h = d.s.r; h <= d.e.r; ++h) {
    u = or(h);
    for (var p = d.s.c; p <= d.e.c; ++p) {
      h === d.s.r && (x[p] = tr(p)), o = x[p] + u;
      var k = c ? (i[h] || [])[p] : i[o];
      k && (mg(a, k, h, p, t), l && k.l && i["!links"].push([o, k.l]));
    }
  }
  var T = f.CodeName || f.name || n;
  return l && he(a, 574, rh((s.Views || [])[0])), l && (i["!merges"] || []).length && he(a, 229, Rh(i["!merges"])), l && vg(a, i), he(a, 442, Gf(T)), l && xg(a, i), he(
    a,
    10
    /* EOF */
  ), a.end();
}
function _g(e, t, r) {
  var a = Gr(), n = (e || {}).Workbook || {}, i = n.Sheets || [], s = (
    /*::((*/
    n.WBProps || {
      /*::CodeName:"ThisWorkbook"*/
    }
  ), f = r.biff == 8, c = r.biff == 5;
  if (he(a, 2057, ei(e, 5, r)), r.bookType == "xla" && he(
    a,
    135
    /* Addin */
  ), he(a, 225, f ? it(1200) : null), he(a, 193, wu(2)), c && he(
    a,
    191
    /* ToolbarHdr */
  ), c && he(
    a,
    192
    /* ToolbarEnd */
  ), he(
    a,
    226
    /* InterfaceEnd */
  ), he(a, 92, Hu("SheetJS", r)), he(a, 66, it(f ? 1200 : 1252)), f && he(a, 353, it(0)), f && he(
    a,
    448
    /* Excel9File */
  ), he(a, 317, Yh(e.SheetNames.length)), f && e.vbaraw && he(
    a,
    211
    /* ObProj */
  ), f && e.vbaraw) {
    var l = s.CodeName || "ThisWorkbook";
    he(a, 442, Gf(l));
  }
  he(a, 156, it(17)), he(a, 25, Wr(!1)), he(a, 18, Wr(!1)), he(a, 19, it(0)), f && he(a, 431, Wr(!1)), f && he(a, 444, it(0)), he(a, 61, Qu()), he(a, 64, Wr(!1)), he(a, 141, it(0)), he(a, 34, Wr(qm(e) == "true")), he(a, 14, Wr(!0)), f && he(a, 439, Wr(!1)), he(a, 218, it(0)), ug(a, e, r), hg(a, e.SSF, r), dg(a, r), f && he(a, 352, Wr(!1));
  var o = a.end(), u = Gr();
  f && he(u, 140, Hh()), f && r.Strings && ig(u, 252, Ku(r.Strings)), he(
    u,
    10
    /* EOF */
  );
  var x = u.end(), d = Gr(), v = 0, h = 0;
  for (h = 0; h < e.SheetNames.length; ++h) v += (f ? 12 : 11) + (f ? 2 : 1) * e.SheetNames[h].length;
  var p = o.length + v + x.length;
  for (h = 0; h < e.SheetNames.length; ++h) {
    var k = i[h] || {};
    he(d, 133, zu({ pos: p, hs: k.Hidden || 0, dt: 0, name: e.SheetNames[h] }, r)), p += t[h].length;
  }
  var T = d.end();
  if (v != T.length) throw new Error("BS8 " + v + " != " + T.length);
  var g = [];
  return o.length && g.push(o), T.length && g.push(T), x.length && g.push(x), Er(g);
}
function wg(e, t) {
  var r = t || {}, a = [];
  e && !e.SSF && (e.SSF = Ze(Te)), e && e.SSF && (Ra(), $n(e.SSF), r.revssf = jn(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF), r.Strings = /*::((*/
  [], r.Strings.Count = 0, r.Strings.Unique = 0, xi(r), r.cellXfs = [], $t(r.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {});
  for (var n = 0; n < e.SheetNames.length; ++n) a[a.length] = gg(n, r, e);
  return a.unshift(_g(e, a, r)), Er(a);
}
function Bc(e, t) {
  for (var r = 0; r <= e.SheetNames.length; ++r) {
    var a = e.Sheets[e.SheetNames[r]];
    if (!(!a || !a["!ref"])) {
      var n = zr(a["!ref"]);
      n.e.c > 255 && typeof console < "u" && console.error && console.error("Worksheet '" + e.SheetNames[r] + "' extends beyond column IV (255).  Data may be lost.");
    }
  }
  var i = t || {};
  switch (i.biff || 2) {
    case 8:
    case 5:
      return wg(e, t);
    case 4:
    case 3:
    case 2:
      return og(e, t);
  }
  throw new Error("invalid type " + i.bookType + " for BIFF");
}
function Ds(e, t) {
  var r = t || {}, a = r.dense ? [] : {};
  e = e.replace(/<!--.*?-->/g, "");
  var n = e.match(/<table/i);
  if (!n) throw new Error("Invalid HTML: could not find <table>");
  var i = e.match(/<\/table/i), s = n.index, f = i && i.index || e.length, c = ao(e.slice(s, f), /(:?<tr[^>]*>)/i, "<tr>"), l = -1, o = 0, u = 0, x = 0, d = { s: { r: 1e7, c: 1e7 }, e: { r: 0, c: 0 } }, v = [];
  for (s = 0; s < c.length; ++s) {
    var h = c[s].trim(), p = h.slice(0, 3).toLowerCase();
    if (p == "<tr") {
      if (++l, r.sheetRows && r.sheetRows <= l) {
        --l;
        break;
      }
      o = 0;
      continue;
    }
    if (!(p != "<td" && p != "<th")) {
      var k = h.split(/<\/t[dh]>/i);
      for (f = 0; f < k.length; ++f) {
        var T = k[f].trim();
        if (T.match(/<t[dh]/i)) {
          for (var g = T, D = 0; g.charAt(0) == "<" && (D = g.indexOf(">")) > -1; ) g = g.slice(D + 1);
          for (var N = 0; N < v.length; ++N) {
            var b = v[N];
            b.s.c == o && b.s.r < l && l <= b.e.r && (o = b.e.c + 1, N = -1);
          }
          var F = ye(T.slice(0, T.indexOf(">")));
          x = F.colspan ? +F.colspan : 1, ((u = +F.rowspan) > 1 || x > 1) && v.push({ s: { r: l, c: o }, e: { r: l + (u || 1) - 1, c: o + x - 1 } });
          var B = F.t || F["data-t"] || "";
          if (!g.length) {
            o += x;
            continue;
          }
          if (g = ff(g), d.s.r > l && (d.s.r = l), d.e.r < l && (d.e.r = l), d.s.c > o && (d.s.c = o), d.e.c < o && (d.e.c = o), !g.length) {
            o += x;
            continue;
          }
          var O = { t: "s", v: g };
          r.raw || !g.trim().length || B == "s" || (g === "TRUE" ? O = { t: "b", v: !0 } : g === "FALSE" ? O = { t: "b", v: !1 } : isNaN(vt(g)) ? isNaN(Ca(g).getDate()) || (O = { t: "d", v: qe(g) }, r.cellDates || (O = { t: "n", v: wr(O.v) }), O.z = r.dateNF || Te[14]) : O = { t: "n", v: vt(g) }), r.dense ? (a[l] || (a[l] = []), a[l][o] = O) : a[Fe({ r: l, c: o })] = O, o += x;
        }
      }
    }
  }
  return a["!ref"] = De(d), v.length && (a["!merges"] = v), a;
}
function kg(e, t, r, a) {
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
      var o = Fe({ r, c: s }), u = a.dense ? (e[r] || [])[s] : e[o], x = u && u.v != null && (u.h || V0(u.w || (Ot(u), u.w) || "")) || "", d = {};
      f > 1 && (d.rowspan = f), c > 1 && (d.colspan = c), a.editable ? x = '<span contenteditable="true">' + x + "</span>" : u && (d["data-t"] = u && u.t || "z", u.v != null && (d["data-v"] = u.v), u.z != null && (d["data-z"] = u.z), u.l && (u.l.Target || "#").charAt(0) != "#" && (x = '<a href="' + u.l.Target + '">' + x + "</a>")), d.id = (a.id || "sjs") + "-" + o, i.push(ue("td", x, d));
    }
  }
  var v = "<tr>";
  return v + i.join("") + "</tr>";
}
var Eg = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>', Tg = "</body></html>";
function Sg(e, t) {
  var r = e.match(/<table[\s\S]*?>[\s\S]*?<\/table>/gi);
  if (!r || r.length == 0) throw new Error("Invalid HTML: could not find <table>");
  if (r.length == 1) return zt(Ds(r[0], t), t);
  var a = pi();
  return r.forEach(function(n, i) {
    mi(a, Ds(n, t), "Sheet" + (i + 1));
  }), a;
}
function Fg(e, t, r) {
  var a = [];
  return a.join("") + "<table" + (r && r.id ? ' id="' + r.id + '"' : "") + ">";
}
function Mc(e, t) {
  var r = t || {}, a = r.header != null ? r.header : Eg, n = r.footer != null ? r.footer : Tg, i = [a], s = zr(e["!ref"]);
  r.dense = Array.isArray(e), i.push(Fg(e, s, r));
  for (var f = s.s.r; f <= s.e.r; ++f) i.push(kg(e, s, f, r));
  return i.push("</table>" + n), i.join("");
}
function Uc(e, t, r) {
  var a = r || {}, n = 0, i = 0;
  if (a.origin != null)
    if (typeof a.origin == "number") n = a.origin;
    else {
      var s = typeof a.origin == "string" ? ar(a.origin) : a.origin;
      n = s.r, i = s.c;
    }
  var f = t.getElementsByTagName("tr"), c = Math.min(a.sheetRows || 1e7, f.length), l = { s: { r: 0, c: 0 }, e: { r: n, c: i } };
  if (e["!ref"]) {
    var o = zr(e["!ref"]);
    l.s.r = Math.min(l.s.r, o.s.r), l.s.c = Math.min(l.s.c, o.s.c), l.e.r = Math.max(l.e.r, o.e.r), l.e.c = Math.max(l.e.c, o.e.c), n == -1 && (l.e.r = n = o.e.r + 1);
  }
  var u = [], x = 0, d = e["!rows"] || (e["!rows"] = []), v = 0, h = 0, p = 0, k = 0, T = 0, g = 0;
  for (e["!cols"] || (e["!cols"] = []); v < f.length && h < c; ++v) {
    var D = f[v];
    if (Is(D)) {
      if (a.display) continue;
      d[h] = { hidden: !0 };
    }
    var N = D.children;
    for (p = k = 0; p < N.length; ++p) {
      var b = N[p];
      if (!(a.display && Is(b))) {
        var F = b.hasAttribute("data-v") ? b.getAttribute("data-v") : b.hasAttribute("v") ? b.getAttribute("v") : ff(b.innerHTML), B = b.getAttribute("data-z") || b.getAttribute("z");
        for (x = 0; x < u.length; ++x) {
          var O = u[x];
          O.s.c == k + i && O.s.r < h + n && h + n <= O.e.r && (k = O.e.c + 1 - i, x = -1);
        }
        g = +b.getAttribute("colspan") || 1, ((T = +b.getAttribute("rowspan") || 1) > 1 || g > 1) && u.push({ s: { r: h + n, c: k + i }, e: { r: h + n + (T || 1) - 1, c: k + i + (g || 1) - 1 } });
        var z = { t: "s", v: F }, X = b.getAttribute("data-t") || b.getAttribute("t") || "";
        F != null && (F.length == 0 ? z.t = X || "z" : a.raw || F.trim().length == 0 || X == "s" || (F === "TRUE" ? z = { t: "b", v: !0 } : F === "FALSE" ? z = { t: "b", v: !1 } : isNaN(vt(F)) ? isNaN(Ca(F).getDate()) || (z = { t: "d", v: qe(F) }, a.cellDates || (z = { t: "n", v: wr(z.v) }), z.z = a.dateNF || Te[14]) : z = { t: "n", v: vt(F) })), z.z === void 0 && B != null && (z.z = B);
        var L = "", te = b.getElementsByTagName("A");
        if (te && te.length) for (var pe = 0; pe < te.length && !(te[pe].hasAttribute("href") && (L = te[pe].getAttribute("href"), L.charAt(0) != "#")); ++pe) ;
        L && L.charAt(0) != "#" && (z.l = { Target: L }), a.dense ? (e[h + n] || (e[h + n] = []), e[h + n][k + i] = z) : e[Fe({ c: k + i, r: h + n })] = z, l.e.c < k + i && (l.e.c = k + i), k += g;
      }
    }
    ++h;
  }
  return u.length && (e["!merges"] = (e["!merges"] || []).concat(u)), l.e.r = Math.max(l.e.r, h - 1 + n), e["!ref"] = De(l), h >= c && (e["!fullref"] = De((l.e.r = f.length - v + h - 1 + n, l))), e;
}
function Wc(e, t) {
  var r = t || {}, a = r.dense ? [] : {};
  return Uc(a, e, t);
}
function yg(e, t) {
  return zt(Wc(e, t), t);
}
function Is(e) {
  var t = "", r = Ag(e);
  return r && (t = r(e).getPropertyValue("display")), t || (t = e.style && e.style.display), t === "none";
}
function Ag(e) {
  return e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle == "function" ? e.ownerDocument.defaultView.getComputedStyle : typeof getComputedStyle == "function" ? getComputedStyle : null;
}
function Cg(e) {
  var t = e.replace(/[\t\r\n]/g, " ").trim().replace(/ +/g, " ").replace(/<text:s\/>/g, " ").replace(/<text:s text:c="(\d+)"\/>/g, function(a, n) {
    return Array(parseInt(n, 10) + 1).join(" ");
  }).replace(/<text:tab[^>]*\/>/g, "	").replace(/<text:line-break\/>/g, `
`), r = Me(t.replace(/<[^>]*>/g, ""));
  return [r];
}
var Os = {
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
function Vc(e, t) {
  var r = t || {}, a = H0(e), n = [], i, s, f = { name: "" }, c = "", l = 0, o, u, x = {}, d = [], v = r.dense ? [] : {}, h, p, k = { value: "" }, T = "", g = 0, D = [], N = -1, b = -1, F = { s: { r: 1e6, c: 1e7 }, e: { r: 0, c: 0 } }, B = 0, O = {}, z = [], X = {}, L = 0, te = 0, pe = [], oe = 1, de = 1, ve = [], Ie = { Names: [] }, U = {}, Ee = ["", ""], Se = [], C = {}, P = "", I = 0, R = !1, Y = !1, fe = 0;
  for (rn.lastIndex = 0, a = a.replace(/<!--([\s\S]*?)-->/mg, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, ""); h = rn.exec(a); ) switch (h[3] = h[3].replace(/_.*$/, "")) {
    case "table":
    case "工作表":
      h[1] === "/" ? (F.e.c >= F.s.c && F.e.r >= F.s.r ? v["!ref"] = De(F) : v["!ref"] = "A1:A1", r.sheetRows > 0 && r.sheetRows <= F.e.r && (v["!fullref"] = v["!ref"], F.e.r = r.sheetRows - 1, v["!ref"] = De(F)), z.length && (v["!merges"] = z), pe.length && (v["!rows"] = pe), o.name = o.名称 || o.name, typeof JSON < "u" && JSON.stringify(o), d.push(o.name), x[o.name] = v, Y = !1) : h[0].charAt(h[0].length - 2) !== "/" && (o = ye(h[0], !1), N = b = -1, F.s.r = F.s.c = 1e7, F.e.r = F.e.c = 0, v = r.dense ? [] : {}, z = [], pe = [], Y = !0);
      break;
    case "table-row-group":
      h[1] === "/" ? --B : ++B;
      break;
    case "table-row":
    case "行":
      if (h[1] === "/") {
        N += oe, oe = 1;
        break;
      }
      if (u = ye(h[0], !1), u.行号 ? N = u.行号 - 1 : N == -1 && (N = 0), oe = +u["number-rows-repeated"] || 1, oe < 10) for (fe = 0; fe < oe; ++fe) B > 0 && (pe[N + fe] = { level: B });
      b = -1;
      break;
    case "covered-table-cell":
      h[1] !== "/" && ++b, r.sheetStubs && (r.dense ? (v[N] || (v[N] = []), v[N][b] = { t: "z" }) : v[Fe({ r: N, c: b })] = { t: "z" }), T = "", D = [];
      break;
    case "table-cell":
    case "数据":
      if (h[0].charAt(h[0].length - 2) === "/")
        ++b, k = ye(h[0], !1), de = parseInt(k["number-columns-repeated"] || "1", 10), p = {
          t: "z",
          v: null
          /*:: , z:null, w:"",c:[]*/
        }, k.formula && r.cellFormula != !1 && (p.f = ys(Me(k.formula))), (k.数据类型 || k["value-type"]) == "string" && (p.t = "s", p.v = Me(k["string-value"] || ""), r.dense ? (v[N] || (v[N] = []), v[N][b] = p) : v[Fe({ r: N, c: b })] = p), b += de - 1;
      else if (h[1] !== "/") {
        ++b, T = "", g = 0, D = [], de = 1;
        var ce = oe ? N + oe - 1 : N;
        if (b > F.e.c && (F.e.c = b), b < F.s.c && (F.s.c = b), N < F.s.r && (F.s.r = N), ce > F.e.r && (F.e.r = ce), k = ye(h[0], !1), Se = [], C = {}, p = {
          t: k.数据类型 || k["value-type"],
          v: null
          /*:: , z:null, w:"",c:[]*/
        }, r.cellFormula)
          if (k.formula && (k.formula = Me(k.formula)), k["number-matrix-columns-spanned"] && k["number-matrix-rows-spanned"] && (L = parseInt(k["number-matrix-rows-spanned"], 10) || 0, te = parseInt(k["number-matrix-columns-spanned"], 10) || 0, X = { s: { r: N, c: b }, e: { r: N + L - 1, c: b + te - 1 } }, p.F = De(X), ve.push([X, p.F])), k.formula) p.f = ys(k.formula);
          else for (fe = 0; fe < ve.length; ++fe)
            N >= ve[fe][0].s.r && N <= ve[fe][0].e.r && b >= ve[fe][0].s.c && b <= ve[fe][0].e.c && (p.F = ve[fe][1]);
        switch ((k["number-columns-spanned"] || k["number-rows-spanned"]) && (L = parseInt(k["number-rows-spanned"], 10) || 0, te = parseInt(k["number-columns-spanned"], 10) || 0, X = { s: { r: N, c: b }, e: { r: N + L - 1, c: b + te - 1 } }, z.push(X)), k["number-columns-repeated"] && (de = parseInt(k["number-columns-repeated"], 10)), p.t) {
          case "boolean":
            p.t = "b", p.v = Je(k["boolean-value"]);
            break;
          case "float":
            p.t = "n", p.v = parseFloat(k.value);
            break;
          case "percentage":
            p.t = "n", p.v = parseFloat(k.value);
            break;
          case "currency":
            p.t = "n", p.v = parseFloat(k.value);
            break;
          case "date":
            p.t = "d", p.v = qe(k["date-value"]), r.cellDates || (p.t = "n", p.v = wr(p.v)), p.z = "m/d/yy";
            break;
          case "time":
            p.t = "n", p.v = eo(k["time-value"]) / 86400, r.cellDates && (p.t = "d", p.v = Yn(p.v)), p.z = "HH:MM:SS";
            break;
          case "number":
            p.t = "n", p.v = parseFloat(k.数据数值);
            break;
          default:
            if (p.t === "string" || p.t === "text" || !p.t)
              p.t = "s", k["string-value"] != null && (T = Me(k["string-value"]), D = []);
            else throw new Error("Unsupported value type " + p.t);
        }
      } else {
        if (R = !1, p.t === "s" && (p.v = T || "", D.length && (p.R = D), R = g == 0), U.Target && (p.l = U), Se.length > 0 && (p.c = Se, Se = []), T && r.cellText !== !1 && (p.w = T), R && (p.t = "z", delete p.v), (!R || r.sheetStubs) && !(r.sheetRows && r.sheetRows <= N))
          for (var ie = 0; ie < oe; ++ie) {
            if (de = parseInt(k["number-columns-repeated"] || "1", 10), r.dense)
              for (v[N + ie] || (v[N + ie] = []), v[N + ie][b] = ie == 0 ? p : Ze(p); --de > 0; ) v[N + ie][b + de] = Ze(p);
            else
              for (v[Fe({ r: N + ie, c: b })] = p; --de > 0; ) v[Fe({ r: N + ie, c: b + de })] = Ze(p);
            F.e.c <= b && (F.e.c = b);
          }
        de = parseInt(k["number-columns-repeated"] || "1", 10), b += de - 1, de = 0, p = {
          /*:: t:"", v:null, z:null, w:"",c:[]*/
        }, T = "", D = [];
      }
      U = {};
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
        C.t = T, D.length && (C.R = D), C.a = P, Se.push(C);
      } else h[0].charAt(h[0].length - 2) !== "/" && n.push([h[3], !1]);
      P = "", I = 0, T = "", g = 0, D = [];
      break;
    case "creator":
      h[1] === "/" ? P = a.slice(I, h.index) : I = h.index + h[0].length;
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
      T = "", g = 0, D = [];
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
        if (O[f.name] = c, (i = n.pop())[0] !== h[3]) throw "Bad state: " + i;
      } else h[0].charAt(h[0].length - 2) !== "/" && (c = "", f = ye(h[0], !1), n.push([h[3], !0]));
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
          s = ye(h[0], !1), c += Os[h[3]][s.style === "long" ? 1 : 0];
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
          s = ye(h[0], !1), c += Os[h[3]][s.style === "long" ? 1 : 0];
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
      s = ye(h[0], !1), Ee = x0(s["cell-range-address"]);
      var ne = { Name: s.name, Ref: Ee[0] + "!" + Ee[1] };
      Y && (ne.Sheet = d.length), Ie.Names.push(ne);
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
      if (h[1] === "/" && (!k || !k["string-value"])) {
        var Ae = Cg(a.slice(g, h.index));
        T = (T.length > 0 ? T + `
` : "") + Ae[0];
      } else
        ye(h[0], !1), g = h.index + h[0].length;
      break;
    case "s":
      break;
    case "database-range":
      if (h[1] === "/") break;
      try {
        Ee = x0(ye(h[0])["target-range-address"]), x[Ee[0]]["!autofilter"] = { ref: Ee[1] };
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
        if (U = ye(h[0], !1), !U.href) break;
        U.Target = Me(U.href), delete U.href, U.Target.charAt(0) == "#" && U.Target.indexOf(".") > -1 ? (Ee = x0(U.Target.slice(1)), U.Target = "#" + Ee[0] + "!" + Ee[1]) : U.Target.match(/^\.\.[\\\/]/) && (U.Target = U.Target.slice(3));
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
  var A = {
    Sheets: x,
    SheetNames: d,
    Workbook: Ie
  };
  return r.bookSheets && delete /*::(*/
  A.Sheets, A;
}
function Rs(e, t) {
  t = t || {}, nt(e, "META-INF/manifest.xml") && ru(vr(e, "META-INF/manifest.xml"), t);
  var r = Jr(e, "content.xml");
  if (!r) throw new Error("Missing content.xml in ODS / UOF file");
  var a = Vc(ze(r), t);
  return nt(e, "meta.xml") && (a.Props = Of(vr(e, "meta.xml"))), a;
}
function bs(e, t) {
  return Vc(e, t);
}
var Dg = /* @__PURE__ */ function() {
  var e = [
    "<office:master-styles>",
    '<style:master-page style:name="mp1" style:page-layout-name="mp1">',
    "<style:header/>",
    '<style:header-left style:display="false"/>',
    "<style:footer/>",
    '<style:footer-left style:display="false"/>',
    "</style:master-page>",
    "</office:master-styles>"
  ].join(""), t = "<office:document-styles " + en({
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
    return ur + t;
  };
}(), Ns = /* @__PURE__ */ function() {
  var e = function(i) {
    return Ge(i).replace(/  +/g, function(s) {
      return '<text:s text:c="' + s.length + '"/>';
    }).replace(/\t/g, "<text:tab/>").replace(/\n/g, "</text:p><text:p>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>");
  }, t = `          <table:table-cell />
`, r = `          <table:covered-table-cell/>
`, a = function(i, s, f) {
    var c = [];
    c.push('      <table:table table:name="' + Ge(s.SheetNames[f]) + `" table:style-name="ta1">
`);
    var l = 0, o = 0, u = zr(i["!ref"] || "A1"), x = i["!merges"] || [], d = 0, v = Array.isArray(i);
    if (i["!cols"])
      for (o = 0; o <= u.e.c; ++o) c.push("        <table:table-column" + (i["!cols"][o] ? ' table:style-name="co' + i["!cols"][o].ods + '"' : "") + `></table:table-column>
`);
    var h = "", p = i["!rows"] || [];
    for (l = 0; l < u.s.r; ++l)
      h = p[l] ? ' table:style-name="ro' + p[l].ods + '"' : "", c.push("        <table:table-row" + h + `></table:table-row>
`);
    for (; l <= u.e.r; ++l) {
      for (h = p[l] ? ' table:style-name="ro' + p[l].ods + '"' : "", c.push("        <table:table-row" + h + `>
`), o = 0; o < u.s.c; ++o) c.push(t);
      for (; o <= u.e.c; ++o) {
        var k = !1, T = {}, g = "";
        for (d = 0; d != x.length; ++d)
          if (!(x[d].s.c > o) && !(x[d].s.r > l) && !(x[d].e.c < o) && !(x[d].e.r < l)) {
            (x[d].s.c != o || x[d].s.r != l) && (k = !0), T["table:number-columns-spanned"] = x[d].e.c - x[d].s.c + 1, T["table:number-rows-spanned"] = x[d].e.r - x[d].s.r + 1;
            break;
          }
        if (k) {
          c.push(r);
          continue;
        }
        var D = Fe({ r: l, c: o }), N = v ? (i[l] || [])[o] : i[D];
        if (N && N.f && (T["table:formula"] = Ge(Yv(N.f)), N.F && N.F.slice(0, D.length) == D)) {
          var b = zr(N.F);
          T["table:number-matrix-columns-spanned"] = b.e.c - b.s.c + 1, T["table:number-matrix-rows-spanned"] = b.e.r - b.s.r + 1;
        }
        if (!N) {
          c.push(t);
          continue;
        }
        switch (N.t) {
          case "b":
            g = N.v ? "TRUE" : "FALSE", T["office:value-type"] = "boolean", T["office:boolean-value"] = N.v ? "true" : "false";
            break;
          case "n":
            g = N.w || String(N.v || 0), T["office:value-type"] = "float", T["office:value"] = N.v || 0;
            break;
          case "s":
          case "str":
            g = N.v == null ? "" : N.v, T["office:value-type"] = "string";
            break;
          case "d":
            g = N.w || qe(N.v).toISOString(), T["office:value-type"] = "date", T["office:date-value"] = qe(N.v).toISOString(), T["table:style-name"] = "ce1";
            break;
          default:
            c.push(t);
            continue;
        }
        var F = e(g);
        if (N.l && N.l.Target) {
          var B = N.l.Target;
          B = B.charAt(0) == "#" ? "#" + Jv(B.slice(1)) : B, B.charAt(0) != "#" && !B.match(/^\w+:/) && (B = "../" + B), F = ue("text:a", F, { "xlink:href": B.replace(/&/g, "&amp;") });
        }
        c.push("          " + ue("table:table-cell", ue("text:p", F, {}), T) + `
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
          Vt(u), u.ods = f;
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
    var c = [ur], l = en({
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
    }), o = en({
      "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
      "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
    });
    f.bookType == "fods" ? (c.push("<office:document" + l + o + `>
`), c.push(If().replace(/office:document-meta/g, "office:meta"))) : c.push("<office:document-content" + l + `>
`), n(c, s), c.push(`  <office:body>
`), c.push(`    <office:spreadsheet>
`);
    for (var u = 0; u != s.SheetNames.length; ++u) c.push(a(s.Sheets[s.SheetNames[u]], s, u));
    return c.push(`    </office:spreadsheet>
`), c.push(`  </office:body>
`), f.bookType == "fods" ? c.push("</office:document>") : c.push("</office:document-content>"), c.join("");
  };
}();
function Hc(e, t) {
  if (t.bookType == "fods") return Ns(e, t);
  var r = M0(), a = "", n = [], i = [];
  return a = "mimetype", Re(r, a, "application/vnd.oasis.opendocument.spreadsheet"), a = "content.xml", Re(r, a, Ns(e, t)), n.push([a, "text/xml"]), i.push([a, "ContentFile"]), a = "styles.xml", Re(r, a, Dg(e, t)), n.push([a, "text/xml"]), i.push([a, "StylesFile"]), a = "meta.xml", Re(r, a, ur + If(
    /*::wb, opts*/
  )), n.push([a, "text/xml"]), i.push([a, "MetadataFile"]), a = "manifest.rdf", Re(r, a, nu(
    i
    /*, opts*/
  )), n.push([a, "application/rdf+xml"]), a = "META-INF/manifest.xml", Re(r, a, tu(
    n
    /*, opts*/
  )), r;
}
/*! sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
function ca(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function D0(e) {
  return typeof TextDecoder < "u" ? new TextDecoder().decode(e) : ze(Gt(e));
}
function Ig(e) {
  return typeof TextEncoder < "u" ? new TextEncoder().encode(e) : Yr(Tt(e));
}
function Og(e, t) {
  e:
    for (var r = 0; r <= e.length - t.length; ++r) {
      for (var a = 0; a < t.length; ++a)
        if (e[r + a] != t[a])
          continue e;
      return !0;
    }
  return !1;
}
function Xt(e) {
  var t = e.reduce(function(n, i) {
    return n + i.length;
  }, 0), r = new Uint8Array(t), a = 0;
  return e.forEach(function(n) {
    r.set(n, a), a += n.length;
  }), r;
}
function Ps(e) {
  return e -= e >> 1 & 1431655765, e = (e & 858993459) + (e >> 2 & 858993459), (e + (e >> 4) & 252645135) * 16843009 >>> 24;
}
function Rg(e, t) {
  for (var r = (e[t + 15] & 127) << 7 | e[t + 14] >> 1, a = e[t + 14] & 1, n = t + 13; n >= t; --n)
    a = a * 256 + e[n];
  return (e[t + 15] & 128 ? -a : a) * Math.pow(10, r - 6176);
}
function bg(e, t, r) {
  var a = Math.floor(r == 0 ? 0 : Math.LOG10E * Math.log(Math.abs(r))) + 6176 - 20, n = r / Math.pow(10, a - 6176);
  e[t + 15] |= a >> 7, e[t + 14] |= (a & 127) << 1;
  for (var i = 0; n >= 1; ++i, n /= 256)
    e[t + i] = n & 255;
  e[t + 15] |= r >= 0 ? 0 : 128;
}
function ln(e, t) {
  var r = t ? t[0] : 0, a = e[r] & 127;
  e:
    if (e[r++] >= 128 && (a |= (e[r] & 127) << 7, e[r++] < 128 || (a |= (e[r] & 127) << 14, e[r++] < 128) || (a |= (e[r] & 127) << 21, e[r++] < 128) || (a += (e[r] & 127) * Math.pow(2, 28), ++r, e[r++] < 128) || (a += (e[r] & 127) * Math.pow(2, 35), ++r, e[r++] < 128) || (a += (e[r] & 127) * Math.pow(2, 42), ++r, e[r++] < 128)))
      break e;
  return t && (t[0] = r), a;
}
function He(e) {
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
function ir(e) {
  var t = 0, r = e[t] & 127;
  e:
    if (e[t++] >= 128) {
      if (r |= (e[t] & 127) << 7, e[t++] < 128 || (r |= (e[t] & 127) << 14, e[t++] < 128) || (r |= (e[t] & 127) << 21, e[t++] < 128))
        break e;
      r |= (e[t] & 127) << 28;
    }
  return r;
}
function Ve(e) {
  for (var t = [], r = [0]; r[0] < e.length; ) {
    var a = r[0], n = ln(e, r), i = n & 7;
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
        s = ln(e, r), f = e.slice(r[0], r[0] + s), r[0] += s;
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
function Sr(e) {
  var t = [];
  return e.forEach(function(r, a) {
    r.forEach(function(n) {
      n.data && (t.push(He(a * 8 + n.type)), n.type == 2 && t.push(He(n.data.length)), t.push(n.data));
    });
  }), Xt(t);
}
function ui(e, t) {
  return (e == null ? void 0 : e.map(function(r) {
    return t(r.data);
  })) || [];
}
function tt(e) {
  for (var t, r = [], a = [0]; a[0] < e.length; ) {
    var n = ln(e, a), i = Ve(e.slice(a[0], a[0] + n));
    a[0] += n;
    var s = {
      id: ir(i[1][0].data),
      messages: []
    };
    i[2].forEach(function(f) {
      var c = Ve(f.data), l = ir(c[3][0].data);
      s.messages.push({
        meta: c,
        data: e.slice(a[0], a[0] + l)
      }), a[0] += l;
    }), (t = i[3]) != null && t[0] && (s.merge = ir(i[3][0].data) >>> 0 > 0), r.push(s);
  }
  return r;
}
function wa(e) {
  var t = [];
  return e.forEach(function(r) {
    var a = [];
    a[1] = [{ data: He(r.id), type: 0 }], a[2] = [], r.merge != null && (a[3] = [{ data: He(+!!r.merge), type: 0 }]);
    var n = [];
    r.messages.forEach(function(s) {
      n.push(s.data), s.meta[3] = [{ type: 0, data: He(s.data.length) }], a[2].push({ data: Sr(s.meta), type: 2 });
    });
    var i = Sr(a);
    t.push(He(i.length)), t.push(i), n.forEach(function(s) {
      return t.push(s);
    });
  }), Xt(t);
}
function Ng(e, t) {
  if (e != 0)
    throw new Error("Unexpected Snappy chunk type ".concat(e));
  for (var r = [0], a = ln(t, r), n = []; r[0] < t.length; ) {
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
      if (i == 1 ? (l = (t[r[0]] >> 2 & 7) + 4, c = (t[r[0]++] & 224) << 3, c |= t[r[0]++]) : (l = (t[r[0]++] >> 2) + 1, i == 2 ? (c = t[r[0]] | t[r[0] + 1] << 8, r[0] += 2) : (c = (t[r[0]] | t[r[0] + 1] << 8 | t[r[0] + 2] << 16 | t[r[0] + 3] << 24) >>> 0, r[0] += 4)), n = [Xt(n)], c == 0)
        throw new Error("Invalid offset 0");
      if (c > n[0].length)
        throw new Error("Invalid offset beyond length");
      if (l >= c)
        for (n.push(n[0].slice(-c)), l -= c; l >= n[n.length - 1].length; )
          n.push(n[n.length - 1]), l -= n[n.length - 1].length;
      n.push(n[0].slice(-c, -c + l));
    }
  }
  var o = Xt(n);
  if (o.length != a)
    throw new Error("Unexpected length: ".concat(o.length, " != ").concat(a));
  return o;
}
function at(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var a = e[r++], n = e[r] | e[r + 1] << 8 | e[r + 2] << 16;
    r += 3, t.push(Ng(a, e.slice(r, r + n))), r += n;
  }
  if (r !== e.length)
    throw new Error("data is not a valid framed stream!");
  return Xt(t);
}
function ka(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var a = Math.min(e.length - r, 268435455), n = new Uint8Array(4);
    t.push(n);
    var i = He(a), s = i.length;
    t.push(i), a <= 60 ? (s++, t.push(new Uint8Array([a - 1 << 2]))) : a <= 256 ? (s += 2, t.push(new Uint8Array([240, a - 1 & 255]))) : a <= 65536 ? (s += 3, t.push(new Uint8Array([244, a - 1 & 255, a - 1 >> 8 & 255]))) : a <= 16777216 ? (s += 4, t.push(new Uint8Array([248, a - 1 & 255, a - 1 >> 8 & 255, a - 1 >> 16 & 255]))) : a <= 4294967296 && (s += 5, t.push(new Uint8Array([252, a - 1 & 255, a - 1 >> 8 & 255, a - 1 >> 16 & 255, a - 1 >>> 24 & 255]))), t.push(e.slice(r, r + a)), s += a, n[0] = 0, n[1] = s & 255, n[2] = s >> 8 & 255, n[3] = s >> 16 & 255, r += a;
  }
  return Xt(t);
}
function Pg(e, t, r, a) {
  var n = ca(e), i = n.getUint32(4, !0), s = (a > 1 ? 12 : 8) + Ps(i & (a > 1 ? 3470 : 398)) * 4, f = -1, c = -1, l = NaN, o = new Date(2001, 0, 1);
  i & 512 && (f = n.getUint32(s, !0), s += 4), s += Ps(i & (a > 1 ? 12288 : 4096)) * 4, i & 16 && (c = n.getUint32(s, !0), s += 4), i & 32 && (l = n.getFloat64(s, !0), s += 8), i & 64 && (o.setTime(o.getTime() + n.getFloat64(s, !0) * 1e3), s += 8);
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
function Lg(e, t, r) {
  var a = ca(e), n = a.getUint32(8, !0), i = 12, s = -1, f = -1, c = NaN, l = NaN, o = new Date(2001, 0, 1);
  n & 1 && (c = Rg(e, i), i += 16), n & 2 && (l = a.getFloat64(i, !0), i += 8), n & 4 && (o.setTime(o.getTime() + a.getFloat64(i, !0) * 1e3), i += 8), n & 8 && (f = a.getUint32(i, !0), i += 4), n & 16 && (s = a.getUint32(i, !0), i += 4);
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
function v0(e, t) {
  var r = new Uint8Array(32), a = ca(r), n = 12, i = 0;
  switch (r[0] = 5, e.t) {
    case "n":
      r[1] = 2, bg(r, n, e.v), i |= 1, n += 16;
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
function p0(e, t) {
  var r = new Uint8Array(32), a = ca(r), n = 12, i = 0;
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
function Bg(e, t, r) {
  switch (e[0]) {
    case 0:
    case 1:
    case 2:
    case 3:
      return Pg(e, t, r, e[0]);
    case 5:
      return Lg(e, t, r);
    default:
      throw new Error("Unsupported payload version ".concat(e[0]));
  }
}
function Or(e) {
  var t = Ve(e);
  return ln(t[1][0].data);
}
function Ls(e, t) {
  var r = Ve(t.data), a = ir(r[1][0].data), n = r[3], i = [];
  return (n || []).forEach(function(s) {
    var f = Ve(s.data), c = ir(f[1][0].data) >>> 0;
    switch (a) {
      case 1:
        i[c] = D0(f[3][0].data);
        break;
      case 8:
        {
          var l = e[Or(f[9][0].data)][0], o = Ve(l.data), u = e[Or(o[1][0].data)][0], x = ir(u.meta[1][0].data);
          if (x != 2001)
            throw new Error("2000 unexpected reference to ".concat(x));
          var d = Ve(u.data);
          i[c] = d[3].map(function(v) {
            return D0(v.data);
          }).join("");
        }
        break;
    }
  }), i;
}
function Mg(e, t) {
  var r, a, n, i, s, f, c, l, o, u, x, d, v, h, p = Ve(e), k = ir(p[1][0].data) >>> 0, T = ir(p[2][0].data) >>> 0, g = ((a = (r = p[8]) == null ? void 0 : r[0]) == null ? void 0 : a.data) && ir(p[8][0].data) > 0 || !1, D, N;
  if ((i = (n = p[7]) == null ? void 0 : n[0]) != null && i.data && t != 0)
    D = (f = (s = p[7]) == null ? void 0 : s[0]) == null ? void 0 : f.data, N = (l = (c = p[6]) == null ? void 0 : c[0]) == null ? void 0 : l.data;
  else if ((u = (o = p[4]) == null ? void 0 : o[0]) != null && u.data && t != 1)
    D = (d = (x = p[4]) == null ? void 0 : x[0]) == null ? void 0 : d.data, N = (h = (v = p[3]) == null ? void 0 : v[0]) == null ? void 0 : h.data;
  else
    throw "NUMBERS Tile missing ".concat(t, " cell storage");
  for (var b = g ? 4 : 1, F = ca(D), B = [], O = 0; O < D.length / 2; ++O) {
    var z = F.getUint16(O * 2, !0);
    z < 65535 && B.push([O, z]);
  }
  if (B.length != T)
    throw "Expected ".concat(T, " cells, found ").concat(B.length);
  var X = [];
  for (O = 0; O < B.length - 1; ++O)
    X[B[O][0]] = N.subarray(B[O][1] * b, B[O + 1][1] * b);
  return B.length >= 1 && (X[B[B.length - 1][0]] = N.subarray(B[B.length - 1][1] * b)), { R: k, cells: X };
}
function Ug(e, t) {
  var r, a = Ve(t.data), n = (r = a == null ? void 0 : a[7]) != null && r[0] ? ir(a[7][0].data) >>> 0 > 0 ? 1 : 0 : -1, i = ui(a[5], function(s) {
    return Mg(s, n);
  });
  return {
    nrows: ir(a[4][0].data) >>> 0,
    data: i.reduce(function(s, f) {
      return s[f.R] || (s[f.R] = []), f.cells.forEach(function(c, l) {
        if (s[f.R][l])
          throw new Error("Duplicate cell r=".concat(f.R, " c=").concat(l));
        s[f.R][l] = c;
      }), s;
    }, [])
  };
}
function Wg(e, t, r) {
  var a, n = Ve(t.data), i = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } };
  if (i.e.r = (ir(n[6][0].data) >>> 0) - 1, i.e.r < 0)
    throw new Error("Invalid row varint ".concat(n[6][0].data));
  if (i.e.c = (ir(n[7][0].data) >>> 0) - 1, i.e.c < 0)
    throw new Error("Invalid col varint ".concat(n[7][0].data));
  r["!ref"] = De(i);
  var s = Ve(n[4][0].data), f = Ls(e, e[Or(s[4][0].data)][0]), c = (a = s[17]) != null && a[0] ? Ls(e, e[Or(s[17][0].data)][0]) : [], l = Ve(s[3][0].data), o = 0;
  l[1].forEach(function(u) {
    var x = Ve(u.data), d = e[Or(x[2][0].data)][0], v = ir(d.meta[1][0].data);
    if (v != 6002)
      throw new Error("6001 unexpected reference to ".concat(v));
    var h = Ug(e, d);
    h.data.forEach(function(p, k) {
      p.forEach(function(T, g) {
        var D = Fe({ r: o + k, c: g }), N = Bg(T, f, c);
        N && (r[D] = N);
      });
    }), o += h.nrows;
  });
}
function Vg(e, t) {
  var r = Ve(t.data), a = { "!ref": "A1" }, n = e[Or(r[2][0].data)], i = ir(n[0].meta[1][0].data);
  if (i != 6001)
    throw new Error("6000 unexpected reference to ".concat(i));
  return Wg(e, n[0], a), a;
}
function Hg(e, t) {
  var r, a = Ve(t.data), n = {
    name: (r = a[1]) != null && r[0] ? D0(a[1][0].data) : "",
    sheets: []
  }, i = ui(a[2], Or);
  return i.forEach(function(s) {
    e[s].forEach(function(f) {
      var c = ir(f.meta[1][0].data);
      c == 6e3 && n.sheets.push(Vg(e, f));
    });
  }), n;
}
function Xg(e, t) {
  var r = pi(), a = Ve(t.data), n = ui(a[1], Or);
  if (n.forEach(function(i) {
    e[i].forEach(function(s) {
      var f = ir(s.meta[1][0].data);
      if (f == 2) {
        var c = Hg(e, s);
        c.sheets.forEach(function(l, o) {
          mi(r, l, o == 0 ? c.name : c.name + "_" + o, !0);
        });
      }
    });
  }), r.SheetNames.length == 0)
    throw new Error("Empty NUMBERS file");
  return r;
}
function m0(e) {
  var t, r, a, n, i = {}, s = [];
  if (e.FullPaths.forEach(function(c) {
    if (c.match(/\.iwpv2/))
      throw new Error("Unsupported password protection");
  }), e.FileIndex.forEach(function(c) {
    if (c.name.match(/\.iwa$/)) {
      var l;
      try {
        l = at(c.content);
      } catch (u) {
        return console.log("?? " + c.content.length + " " + (u.message || u));
      }
      var o;
      try {
        o = tt(l);
      } catch (u) {
        return console.log("## " + (u.message || u));
      }
      o.forEach(function(u) {
        i[u.id] = u.messages, s.push(u.id);
      });
    }
  }), !s.length)
    throw new Error("File has no messages");
  var f = ((n = (a = (r = (t = i == null ? void 0 : i[1]) == null ? void 0 : t[0]) == null ? void 0 : r.meta) == null ? void 0 : a[1]) == null ? void 0 : n[0].data) && ir(i[1][0].meta[1][0].data) == 1 && i[1][0];
  if (f || s.forEach(function(c) {
    i[c].forEach(function(l) {
      var o = ir(l.meta[1][0].data) >>> 0;
      if (o == 1)
        if (!f)
          f = l;
        else
          throw new Error("Document has multiple roots");
    });
  }), !f)
    throw new Error("Cannot find Document root");
  return Xg(i, f);
}
function Gg(e, t, r) {
  var a, n, i, s;
  if (!((a = e[6]) != null && a[0]) || !((n = e[7]) != null && n[0]))
    throw "Mutation only works on post-BNC storages!";
  var f = ((s = (i = e[8]) == null ? void 0 : i[0]) == null ? void 0 : s.data) && ir(e[8][0].data) > 0 || !1;
  if (f)
    throw "Math only works with normal offsets";
  for (var c = 0, l = ca(e[7][0].data), o = 0, u = [], x = ca(e[4][0].data), d = 0, v = [], h = 0; h < t.length; ++h) {
    if (t[h] == null) {
      l.setUint16(h * 2, 65535, !0), x.setUint16(h * 2, 65535);
      continue;
    }
    l.setUint16(h * 2, o, !0), x.setUint16(h * 2, d, !0);
    var p, k;
    switch (typeof t[h]) {
      case "string":
        p = v0({ t: "s", v: t[h] }, r), k = p0({ t: "s", v: t[h] }, r);
        break;
      case "number":
        p = v0({ t: "n", v: t[h] }, r), k = p0({ t: "n", v: t[h] }, r);
        break;
      case "boolean":
        p = v0({ t: "b", v: t[h] }, r), k = p0({ t: "b", v: t[h] }, r);
        break;
      default:
        throw new Error("Unsupported value " + t[h]);
    }
    u.push(p), o += p.length, v.push(k), d += k.length, ++c;
  }
  for (e[2][0].data = He(c); h < e[7][0].data.length / 2; ++h)
    l.setUint16(h * 2, 65535, !0), x.setUint16(h * 2, 65535, !0);
  return e[6][0].data = Xt(u), e[3][0].data = Xt(v), c;
}
function zg(e, t) {
  if (!t || !t.numbers)
    throw new Error("Must pass a `numbers` option -- check the README");
  var r = e.Sheets[e.SheetNames[0]];
  e.SheetNames.length > 1 && console.error("The Numbers writer currently writes only the first table");
  var a = zr(r["!ref"]);
  a.s.r = a.s.c = 0;
  var n = !1;
  a.e.c > 9 && (n = !0, a.e.c = 9), a.e.r > 49 && (n = !0, a.e.r = 49), n && console.error("The Numbers writer is currently limited to ".concat(De(a)));
  var i = Gn(r, { range: a, header: 1 }), s = ["~Sh33tJ5~"];
  i.forEach(function(P) {
    return P.forEach(function(I) {
      typeof I == "string" && s.push(I);
    });
  });
  var f = {}, c = [], l = we.read(t.numbers, { type: "base64" });
  l.FileIndex.map(function(P, I) {
    return [P, l.FullPaths[I]];
  }).forEach(function(P) {
    var I = P[0], R = P[1];
    if (I.type == 2 && I.name.match(/\.iwa/)) {
      var Y = I.content, fe = at(Y), ce = tt(fe);
      ce.forEach(function(ie) {
        c.push(ie.id), f[ie.id] = { deps: [], location: R, type: ir(ie.messages[0].meta[1][0].data) };
      });
    }
  }), c.sort(function(P, I) {
    return P - I;
  });
  var o = c.filter(function(P) {
    return P > 1;
  }).map(function(P) {
    return [P, He(P)];
  });
  l.FileIndex.map(function(P, I) {
    return [P, l.FullPaths[I]];
  }).forEach(function(P) {
    var I = P[0];
    if (P[1], !!I.name.match(/\.iwa/)) {
      var R = tt(at(I.content));
      R.forEach(function(Y) {
        Y.messages.forEach(function(fe) {
          o.forEach(function(ce) {
            Y.messages.some(function(ie) {
              return ir(ie.meta[1][0].data) != 11006 && Og(ie.data, ce[1]);
            }) && f[ce[0]].deps.push(Y.id);
          });
        });
      });
    }
  });
  for (var u = we.find(l, f[1].location), x = tt(at(u.content)), d, v = 0; v < x.length; ++v) {
    var h = x[v];
    h.id == 1 && (d = h);
  }
  var p = Or(Ve(d.messages[0].data)[1][0].data);
  for (u = we.find(l, f[p].location), x = tt(at(u.content)), v = 0; v < x.length; ++v)
    h = x[v], h.id == p && (d = h);
  for (p = Or(Ve(d.messages[0].data)[2][0].data), u = we.find(l, f[p].location), x = tt(at(u.content)), v = 0; v < x.length; ++v)
    h = x[v], h.id == p && (d = h);
  for (p = Or(Ve(d.messages[0].data)[2][0].data), u = we.find(l, f[p].location), x = tt(at(u.content)), v = 0; v < x.length; ++v)
    h = x[v], h.id == p && (d = h);
  var k = Ve(d.messages[0].data);
  {
    k[6][0].data = He(a.e.r + 1), k[7][0].data = He(a.e.c + 1);
    var T = Or(k[46][0].data), g = we.find(l, f[T].location), D = tt(at(g.content));
    {
      for (var N = 0; N < D.length && D[N].id != T; ++N)
        ;
      if (D[N].id != T)
        throw "Bad ColumnRowUIDMapArchive";
      var b = Ve(D[N].messages[0].data);
      b[1] = [], b[2] = [], b[3] = [];
      for (var F = 0; F <= a.e.c; ++F) {
        var B = [];
        B[1] = B[2] = [{ type: 0, data: He(F + 420690) }], b[1].push({ type: 2, data: Sr(B) }), b[2].push({ type: 0, data: He(F) }), b[3].push({ type: 0, data: He(F) });
      }
      b[4] = [], b[5] = [], b[6] = [];
      for (var O = 0; O <= a.e.r; ++O)
        B = [], B[1] = B[2] = [{ type: 0, data: He(O + 726270) }], b[4].push({ type: 2, data: Sr(B) }), b[5].push({ type: 0, data: He(O) }), b[6].push({ type: 0, data: He(O) });
      D[N].messages[0].data = Sr(b);
    }
    g.content = ka(wa(D)), g.size = g.content.length, delete k[46];
    var z = Ve(k[4][0].data);
    {
      z[7][0].data = He(a.e.r + 1);
      var X = Ve(z[1][0].data), L = Or(X[2][0].data);
      g = we.find(l, f[L].location), D = tt(at(g.content));
      {
        if (D[0].id != L)
          throw "Bad HeaderStorageBucket";
        var te = Ve(D[0].messages[0].data);
        for (O = 0; O < i.length; ++O) {
          var pe = Ve(te[2][0].data);
          pe[1][0].data = He(O), pe[4][0].data = He(i[O].length), te[2][O] = { type: te[2][0].type, data: Sr(pe) };
        }
        D[0].messages[0].data = Sr(te);
      }
      g.content = ka(wa(D)), g.size = g.content.length;
      var oe = Or(z[2][0].data);
      g = we.find(l, f[oe].location), D = tt(at(g.content));
      {
        if (D[0].id != oe)
          throw "Bad HeaderStorageBucket";
        for (te = Ve(D[0].messages[0].data), F = 0; F <= a.e.c; ++F)
          pe = Ve(te[2][0].data), pe[1][0].data = He(F), pe[4][0].data = He(a.e.r + 1), te[2][F] = { type: te[2][0].type, data: Sr(pe) };
        D[0].messages[0].data = Sr(te);
      }
      g.content = ka(wa(D)), g.size = g.content.length;
      var de = Or(z[4][0].data);
      (function() {
        for (var P = we.find(l, f[de].location), I = tt(at(P.content)), R, Y = 0; Y < I.length; ++Y) {
          var fe = I[Y];
          fe.id == de && (R = fe);
        }
        var ce = Ve(R.messages[0].data);
        {
          ce[3] = [];
          var ie = [];
          s.forEach(function(A, $e) {
            ie[1] = [{ type: 0, data: He($e) }], ie[2] = [{ type: 0, data: He(1) }], ie[3] = [{ type: 2, data: Ig(A) }], ce[3].push({ type: 2, data: Sr(ie) });
          });
        }
        R.messages[0].data = Sr(ce);
        var ne = wa(I), Ae = ka(ne);
        P.content = Ae, P.size = P.content.length;
      })();
      var ve = Ve(z[3][0].data);
      {
        var Ie = ve[1][0];
        delete ve[2];
        var U = Ve(Ie.data);
        {
          var Ee = Or(U[2][0].data);
          (function() {
            for (var P = we.find(l, f[Ee].location), I = tt(at(P.content)), R, Y = 0; Y < I.length; ++Y) {
              var fe = I[Y];
              fe.id == Ee && (R = fe);
            }
            var ce = Ve(R.messages[0].data);
            {
              delete ce[6], delete ve[7];
              var ie = new Uint8Array(ce[5][0].data);
              ce[5] = [];
              for (var ne = 0, Ae = 0; Ae <= a.e.r; ++Ae) {
                var A = Ve(ie);
                ne += Gg(A, i[Ae], s), A[1][0].data = He(Ae), ce[5].push({ data: Sr(A), type: 2 });
              }
              ce[1] = [{ type: 0, data: He(a.e.c + 1) }], ce[2] = [{ type: 0, data: He(a.e.r + 1) }], ce[3] = [{ type: 0, data: He(ne) }], ce[4] = [{ type: 0, data: He(a.e.r + 1) }];
            }
            R.messages[0].data = Sr(ce);
            var $e = wa(I), Pe = ka($e);
            P.content = Pe, P.size = P.content.length;
          })();
        }
        Ie.data = Sr(U);
      }
      z[3][0].data = Sr(ve);
    }
    k[4][0].data = Sr(z);
  }
  d.messages[0].data = Sr(k);
  var Se = wa(x), C = ka(Se);
  return u.content = C, u.size = u.content.length, l;
}
function Xc(e) {
  return function(r) {
    for (var a = 0; a != e.length; ++a) {
      var n = e[a];
      r[n[0]] === void 0 && (r[n[0]] = n[1]), n[2] === "n" && (r[n[0]] = Number(r[n[0]]));
    }
  };
}
function hi(e) {
  Xc([
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
function xi(e) {
  Xc([
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
function $g(e) {
  return Be.WS.indexOf(e) > -1 ? "sheet" : e == Be.CS ? "chart" : e == Be.DS ? "dialog" : e == Be.MS ? "macro" : e && e.length ? e : "sheet";
}
function Kg(e, t) {
  if (!e) return 0;
  try {
    e = t.map(function(a) {
      return a.id || (a.id = a.strRelID), [a.name, e["!id"][a.id].Target, $g(e["!id"][a.id].Type)];
    });
  } catch {
    return null;
  }
  return !e || e.length === 0 ? null : e;
}
function jg(e, t, r, a, n, i, s, f, c, l, o, u) {
  try {
    i[a] = za(Jr(e, r, !0), t);
    var x = vr(e, t), d;
    switch (f) {
      case "sheet":
        d = p2(x, t, n, c, i[a], l, o, u);
        break;
      case "chart":
        if (d = m2(x, t, n, c, i[a], l, o, u), !d || !d["!drawel"]) break;
        var v = Va(d["!drawel"].Target, t), h = tn(v), p = ad(Jr(e, v, !0), za(Jr(e, h, !0), v)), k = Va(p, v), T = tn(k);
        d = Gm(Jr(e, k, !0), k, c, za(Jr(e, T, !0), k), l, d);
        break;
      case "macro":
        d = g2(x, t, n, c, i[a], l, o, u);
        break;
      case "dialog":
        d = _2(x, t, n, c, i[a], l, o, u);
        break;
      default:
        throw new Error("Unrecognized sheet type " + f);
    }
    s[a] = d;
    var g = [];
    i && i[a] && sr(i[a]).forEach(function(D) {
      var N = "";
      if (i[a][D].Type == Be.CMNT) {
        N = Va(i[a][D].Target, t);
        var b = T2(vr(e, N, !0), N, c);
        if (!b || !b.length) return;
        ks(d, b, !1);
      }
      i[a][D].Type == Be.TCMNT && (N = Va(i[a][D].Target, t), g = g.concat(id(vr(e, N, !0), c)));
    }), g && g.length && ks(d, g, !0, c.people || []);
  } catch (D) {
    if (c.WTF) throw D;
  }
}
function et(e) {
  return e.charAt(0) == "/" ? e.slice(1) : e;
}
function Yg(e, t) {
  if (Ra(), t = t || {}, hi(t), nt(e, "META-INF/manifest.xml") || nt(e, "objectdata.xml")) return Rs(e, t);
  if (nt(e, "Index/Document.iwa")) {
    if (typeof Uint8Array > "u") throw new Error("NUMBERS file parsing requires Uint8Array support");
    if (typeof m0 < "u") {
      if (e.FileIndex) return m0(e);
      var r = we.utils.cfb_new();
      return Hi(e).forEach(function(pe) {
        Re(r, pe, io(e, pe));
      }), m0(r);
    }
    throw new Error("Unsupported NUMBERS file");
  }
  if (!nt(e, "[Content_Types].xml"))
    throw nt(e, "index.xml.gz") ? new Error("Unsupported NUMBERS 08 file") : nt(e, "index.xml") ? new Error("Unsupported NUMBERS 09 file") : new Error("Unsupported ZIP file");
  var a = Hi(e), n = Qo(Jr(e, "[Content_Types].xml")), i = !1, s, f;
  if (n.workbooks.length === 0 && (f = "xl/workbook.xml", vr(e, f, !0) && n.workbooks.push(f)), n.workbooks.length === 0) {
    if (f = "xl/workbook.bin", !vr(e, f, !0)) throw new Error("Could not find workbook");
    n.workbooks.push(f), i = !0;
  }
  n.workbooks[0].slice(-3) == "bin" && (i = !0);
  var c = {}, l = {};
  if (!t.bookSheets && !t.bookProps) {
    if ($a = [], n.sst) try {
      $a = E2(vr(e, et(n.sst)), n.sst, t);
    } catch (pe) {
      if (t.WTF) throw pe;
    }
    t.cellStyles && n.themes.length && (c = k2(Jr(e, n.themes[0].replace(/^\//, ""), !0) || "", n.themes[0], t)), n.style && (l = w2(vr(e, et(n.style)), n.style, c, t));
  }
  n.links.map(function(pe) {
    try {
      var oe = za(Jr(e, tn(et(pe))), pe);
      return F2(vr(e, et(pe)), oe, pe, t);
    } catch {
    }
  });
  var o = v2(vr(e, et(n.workbooks[0])), n.workbooks[0], t), u = {}, x = "";
  n.coreprops.length && (x = vr(e, et(n.coreprops[0]), !0), x && (u = Of(x)), n.extprops.length !== 0 && (x = vr(e, et(n.extprops[0]), !0), x && su(x, u, t)));
  var d = {};
  (!t.bookSheets || t.bookProps) && n.custprops.length !== 0 && (x = Jr(e, et(n.custprops[0]), !0), x && (d = cu(x, t)));
  var v = {};
  if ((t.bookSheets || t.bookProps) && (o.Sheets ? s = o.Sheets.map(function(oe) {
    return oe.name;
  }) : u.Worksheets && u.SheetNames.length > 0 && (s = u.SheetNames), t.bookProps && (v.Props = u, v.Custprops = d), t.bookSheets && typeof s < "u" && (v.SheetNames = s), t.bookSheets ? v.SheetNames : t.bookProps))
    return v;
  s = {};
  var h = {};
  t.bookDeps && n.calcchain && (h = S2(vr(e, et(n.calcchain)), n.calcchain));
  var p = 0, k = {}, T, g;
  {
    var D = o.Sheets;
    u.Worksheets = D.length, u.SheetNames = [];
    for (var N = 0; N != D.length; ++N)
      u.SheetNames[N] = D[N].name;
  }
  var b = i ? "bin" : "xml", F = n.workbooks[0].lastIndexOf("/"), B = (n.workbooks[0].slice(0, F + 1) + "_rels/" + n.workbooks[0].slice(F + 1) + ".rels").replace(/^\//, "");
  nt(e, B) || (B = "xl/_rels/workbook." + b + ".rels");
  var O = za(Jr(e, B, !0), B.replace(/_rels.*/, "s5s"));
  (n.metadata || []).length >= 1 && (t.xlmeta = y2(vr(e, et(n.metadata[0])), n.metadata[0], t)), (n.people || []).length >= 1 && (t.people = fd(vr(e, et(n.people[0])), t)), O && (O = Kg(O, o.Sheets));
  var z = vr(e, "xl/worksheets/sheet.xml", !0) ? 1 : 0;
  e: for (p = 0; p != u.Worksheets; ++p) {
    var X = "sheet";
    if (O && O[p] ? (T = "xl/" + O[p][1].replace(/[\/]?xl\//, ""), nt(e, T) || (T = O[p][1]), nt(e, T) || (T = B.replace(/_rels\/.*$/, "") + O[p][1]), X = O[p][2]) : (T = "xl/worksheets/sheet" + (p + 1 - z) + "." + b, T = T.replace(/sheet0\./, "sheet.")), g = T.replace(/^(.*)(\/)([^\/]*)$/, "$1/_rels/$3.rels"), t && t.sheets != null) switch (typeof t.sheets) {
      case "number":
        if (p != t.sheets) continue e;
        break;
      case "string":
        if (u.SheetNames[p].toLowerCase() != t.sheets.toLowerCase()) continue e;
        break;
      default:
        if (Array.isArray && Array.isArray(t.sheets)) {
          for (var L = !1, te = 0; te != t.sheets.length; ++te)
            typeof t.sheets[te] == "number" && t.sheets[te] == p && (L = 1), typeof t.sheets[te] == "string" && t.sheets[te].toLowerCase() == u.SheetNames[p].toLowerCase() && (L = 1);
          if (!L) continue e;
        }
    }
    jg(e, T, g, u.SheetNames[p], p, k, s, X, t, o, c, l);
  }
  return v = {
    Directory: n,
    Workbook: o,
    Props: u,
    Custprops: d,
    Deps: h,
    Sheets: s,
    SheetNames: u.SheetNames,
    Strings: $a,
    Styles: l,
    Themes: c,
    SSF: Ze(Te)
  }, t && t.bookFiles && (e.files ? (v.keys = a, v.files = e.files) : (v.keys = [], v.files = {}, e.FullPaths.forEach(function(pe, oe) {
    pe = pe.replace(/^Root Entry[\/]/, ""), v.keys.push(pe), v.files[pe] = e.FileIndex[oe];
  }))), t && t.bookVBA && (n.vba.length > 0 ? v.vbaraw = vr(e, et(n.vba[0]), !0) : n.defaults && n.defaults.bin === vd && (v.vbaraw = vr(e, "xl/vbaProject.bin", !0))), v;
}
function Jg(e, t) {
  var r = t || {}, a = "Workbook", n = we.find(e, a);
  try {
    if (a = "/!DataSpaces/Version", n = we.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
    if (y1(n.content), a = "/!DataSpaces/DataSpaceMap", n = we.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
    var i = C1(n.content);
    if (i.length !== 1 || i[0].comps.length !== 1 || i[0].comps[0].t !== 0 || i[0].name !== "StrongEncryptionDataSpace" || i[0].comps[0].v !== "EncryptedPackage")
      throw new Error("ECMA-376 Encrypted file bad " + a);
    if (a = "/!DataSpaces/DataSpaceInfo/StrongEncryptionDataSpace", n = we.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
    var s = D1(n.content);
    if (s.length != 1 || s[0] != "StrongEncryptionTransform")
      throw new Error("ECMA-376 Encrypted file bad " + a);
    if (a = "/!DataSpaces/TransformInfo/StrongEncryptionTransform/!Primary", n = we.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
    O1(n.content);
  } catch {
  }
  if (a = "/EncryptionInfo", n = we.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
  var f = R1(n.content);
  if (a = "/EncryptedPackage", n = we.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
  if (f[0] == 4 && typeof decrypt_agile < "u") return decrypt_agile(f[1], n.content, r.password || "", r);
  if (f[0] == 2 && typeof decrypt_std76 < "u") return decrypt_std76(f[1], n.content, r.password || "", r);
  throw new Error("File is password-protected");
}
function qg(e, t) {
  return t.bookType == "ods" ? Hc(e, t) : t.bookType == "numbers" ? zg(e, t) : t.bookType == "xlsb" ? Zg(e, t) : Qg(e, t);
}
function Zg(e, t) {
  Ta = 1024, e && !e.SSF && (e.SSF = Ze(Te)), e && e.SSF && (Ra(), $n(e.SSF), t.revssf = jn(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, Ka ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = t.bookType == "xlsb" ? "bin" : "xml", a = pc.indexOf(t.bookType) > -1, n = Z0();
  xi(t = t || {});
  var i = M0(), s = "", f = 0;
  if (t.cellXfs = [], $t(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", Re(i, s, Rf(e.Props, t)), n.coreprops.push(s), Xe(t.rels, 2, s, Be.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var c = [], l = 0; l < e.SheetNames.length; ++l)
      (e.Workbook.Sheets[l] || {}).Hidden != 2 && c.push(e.SheetNames[l]);
    e.Props.SheetNames = c;
  }
  for (e.Props.Worksheets = e.Props.SheetNames.length, Re(i, s, Pf(e.Props)), n.extprops.push(s), Xe(t.rels, 3, s, Be.EXT_PROPS), e.Custprops !== e.Props && sr(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", Re(i, s, Lf(e.Custprops)), n.custprops.push(s), Xe(t.rels, 4, s, Be.CUST_PROPS)), f = 1; f <= e.SheetNames.length; ++f) {
    var o = { "!id": {} }, u = e.Sheets[e.SheetNames[f - 1]], x = (u || {})["!type"] || "sheet";
    switch (x) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + r, Re(i, s, C2(f - 1, s, t, e, o)), n.sheets.push(s), Xe(t.wbrels, -1, "worksheets/sheet" + f + "." + r, Be.WS[0]);
    }
    if (u) {
      var d = u["!comments"], v = !1, h = "";
      d && d.length > 0 && (h = "xl/comments" + f + "." + r, Re(i, h, O2(d, h)), n.comments.push(h), Xe(o, -1, "../comments" + f + "." + r, Be.CMNT), v = !0), u["!legacy"] && v && Re(i, "xl/drawings/vmlDrawing" + f + ".vml", dc(f, u["!comments"])), delete u["!comments"], delete u["!legacy"];
    }
    o["!id"].rId1 && Re(i, tn(s), Fa(o));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, Re(i, s, I2(t.Strings, s, t)), n.strs.push(s), Xe(t.wbrels, -1, "sharedStrings." + r, Be.SST)), s = "xl/workbook." + r, Re(i, s, A2(e, s)), n.workbooks.push(s), Xe(t.rels, 1, s, Be.WB), s = "xl/theme/theme1.xml", Re(i, s, ni(e.Themes, t)), n.themes.push(s), Xe(t.wbrels, -1, "theme/theme1.xml", Be.THEME), s = "xl/styles." + r, Re(i, s, D2(e, s, t)), n.styles.push(s), Xe(t.wbrels, -1, "styles." + r, Be.STY), e.vbaraw && a && (s = "xl/vbaProject.bin", Re(i, s, e.vbaraw), n.vba.push(s), Xe(t.wbrels, -1, "vbaProject.bin", Be.VBA)), s = "xl/metadata." + r, Re(i, s, R2(s)), n.metadata.push(s), Xe(t.wbrels, -1, "metadata." + r, Be.XLMETA), Re(i, "[Content_Types].xml", Df(n, t)), Re(i, "_rels/.rels", Fa(t.rels)), Re(i, "xl/_rels/workbook." + r + ".rels", Fa(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function Qg(e, t) {
  Ta = 1024, e && !e.SSF && (e.SSF = Ze(Te)), e && e.SSF && (Ra(), $n(e.SSF), t.revssf = jn(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, Ka ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = "xml", a = pc.indexOf(t.bookType) > -1, n = Z0();
  xi(t = t || {});
  var i = M0(), s = "", f = 0;
  if (t.cellXfs = [], $t(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", Re(i, s, Rf(e.Props, t)), n.coreprops.push(s), Xe(t.rels, 2, s, Be.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var c = [], l = 0; l < e.SheetNames.length; ++l)
      (e.Workbook.Sheets[l] || {}).Hidden != 2 && c.push(e.SheetNames[l]);
    e.Props.SheetNames = c;
  }
  e.Props.Worksheets = e.Props.SheetNames.length, Re(i, s, Pf(e.Props)), n.extprops.push(s), Xe(t.rels, 3, s, Be.EXT_PROPS), e.Custprops !== e.Props && sr(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", Re(i, s, Lf(e.Custprops)), n.custprops.push(s), Xe(t.rels, 4, s, Be.CUST_PROPS));
  var o = ["SheetJ5"];
  for (t.tcid = 0, f = 1; f <= e.SheetNames.length; ++f) {
    var u = { "!id": {} }, x = e.Sheets[e.SheetNames[f - 1]], d = (x || {})["!type"] || "sheet";
    switch (d) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + r, Re(i, s, Ac(f - 1, t, e, u)), n.sheets.push(s), Xe(t.wbrels, -1, "worksheets/sheet" + f + "." + r, Be.WS[0]);
    }
    if (x) {
      var v = x["!comments"], h = !1, p = "";
      if (v && v.length > 0) {
        var k = !1;
        v.forEach(function(T) {
          T[1].forEach(function(g) {
            g.T == !0 && (k = !0);
          });
        }), k && (p = "xl/threadedComments/threadedComment" + f + "." + r, Re(i, p, sd(v, o, t)), n.threadedcomments.push(p), Xe(u, -1, "../threadedComments/threadedComment" + f + "." + r, Be.TCMNT)), p = "xl/comments" + f + "." + r, Re(i, p, vc(v)), n.comments.push(p), Xe(u, -1, "../comments" + f + "." + r, Be.CMNT), h = !0;
      }
      x["!legacy"] && h && Re(i, "xl/drawings/vmlDrawing" + f + ".vml", dc(f, x["!comments"])), delete x["!comments"], delete x["!legacy"];
    }
    u["!id"].rId1 && Re(i, tn(s), Fa(u));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, Re(i, s, tc(t.Strings, t)), n.strs.push(s), Xe(t.wbrels, -1, "sharedStrings." + r, Be.SST)), s = "xl/workbook." + r, Re(i, s, Rc(e)), n.workbooks.push(s), Xe(t.rels, 1, s, Be.WB), s = "xl/theme/theme1.xml", Re(i, s, ni(e.Themes, t)), n.themes.push(s), Xe(t.wbrels, -1, "theme/theme1.xml", Be.THEME), s = "xl/styles." + r, Re(i, s, oc(e, t)), n.styles.push(s), Xe(t.wbrels, -1, "styles." + r, Be.STY), e.vbaraw && a && (s = "xl/vbaProject.bin", Re(i, s, e.vbaraw), n.vba.push(s), Xe(t.wbrels, -1, "vbaProject.bin", Be.VBA)), s = "xl/metadata." + r, Re(i, s, xc()), n.metadata.push(s), Xe(t.wbrels, -1, "metadata." + r, Be.XLMETA), o.length > 1 && (s = "xl/persons/person.xml", Re(i, s, cd(o)), n.people.push(s), Xe(t.wbrels, -1, "persons/person.xml", Be.PEOPLE)), Re(i, "[Content_Types].xml", Df(n, t)), Re(i, "_rels/.rels", Fa(t.rels)), Re(i, "xl/_rels/workbook." + r + ".rels", Fa(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function di(e, t) {
  var r = "";
  switch ((t || {}).type || "base64") {
    case "buffer":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    case "base64":
      r = qr(e.slice(0, 12));
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
function e_(e, t) {
  return we.find(e, "EncryptedPackage") ? Jg(e, t) : Lc(e, t);
}
function r_(e, t) {
  var r, a = e, n = t || {};
  return n.type || (n.type = Ne && Buffer.isBuffer(e) ? "buffer" : "base64"), r = af(a, n), Yg(r, n);
}
function Gc(e, t) {
  var r = 0;
  e: for (; r < e.length; ) switch (e.charCodeAt(r)) {
    case 10:
    case 13:
    case 32:
      ++r;
      break;
    case 60:
      return A0(e.slice(r), t);
    default:
      break e;
  }
  return Da.to_workbook(e, t);
}
function t_(e, t) {
  var r = "", a = di(e, t);
  switch (t.type) {
    case "base64":
      r = qr(e);
      break;
    case "binary":
      r = e;
      break;
    case "buffer":
      r = e.toString("binary");
      break;
    case "array":
      r = na(e);
      break;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  return a[0] == 239 && a[1] == 187 && a[2] == 191 && (r = ze(r)), t.type = "binary", Gc(r, t);
}
function a_(e, t) {
  var r = e;
  return t.type == "base64" && (r = qr(r)), r = Ja.utils.decode(1200, r.slice(2), "str"), t.type = "binary", Gc(r, t);
}
function n_(e) {
  return e.match(/[^\x00-\x7F]/) ? Tt(e) : e;
}
function g0(e, t, r, a) {
  return a ? (r.type = "string", Da.to_workbook(e, r)) : Da.to_workbook(t, r);
}
function I0(e, t) {
  b0();
  var r = t || {};
  if (typeof ArrayBuffer < "u" && e instanceof ArrayBuffer) return I0(new Uint8Array(e), (r = Ze(r), r.type = "array", r));
  typeof Uint8Array < "u" && e instanceof Uint8Array && !r.type && (r.type = typeof Deno < "u" ? "buffer" : "array");
  var a = e, n = [0, 0, 0, 0], i = !1;
  if (r.cellStyles && (r.cellNF = !0, r.sheetStubs = !0), Aa = {}, r.dateNF && (Aa.dateNF = r.dateNF), r.type || (r.type = Ne && Buffer.isBuffer(e) ? "buffer" : "base64"), r.type == "file" && (r.type = Ne ? "buffer" : "binary", a = ql(e), typeof Uint8Array < "u" && !Ne && (r.type = "array")), r.type == "string" && (i = !0, r.type = "binary", r.codepage = 65001, a = n_(e)), r.type == "array" && typeof Uint8Array < "u" && e instanceof Uint8Array && typeof ArrayBuffer < "u") {
    var s = new ArrayBuffer(3), f = new Uint8Array(s);
    if (f.foo = "bar", !f.foo)
      return r = Ze(r), r.type = "array", I0(N0(a), r);
  }
  switch ((n = di(a, r))[0]) {
    case 208:
      if (n[1] === 207 && n[2] === 17 && n[3] === 224 && n[4] === 161 && n[5] === 177 && n[6] === 26 && n[7] === 225) return e_(we.read(a, r), r);
      break;
    case 9:
      if (n[1] <= 8) return Lc(a, r);
      break;
    case 60:
      return A0(a, r);
    case 73:
      if (n[1] === 73 && n[2] === 42 && n[3] === 0) throw new Error("TIFF Image File is not a spreadsheet");
      if (n[1] === 68) return l1(a, r);
      break;
    case 84:
      if (n[1] === 65 && n[2] === 66 && n[3] === 76) return ec.to_workbook(a, r);
      break;
    case 80:
      return n[1] === 75 && n[2] < 9 && n[3] < 9 ? r_(a, r) : g0(e, a, r, i);
    case 239:
      return n[3] === 60 ? A0(a, r) : g0(e, a, r, i);
    case 255:
      if (n[1] === 254)
        return a_(a, r);
      if (n[1] === 0 && n[2] === 2 && n[3] === 0) return ra.to_workbook(a, r);
      break;
    case 0:
      if (n[1] === 0 && (n[2] >= 2 && n[3] === 0 || n[2] === 0 && (n[3] === 8 || n[3] === 9)))
        return ra.to_workbook(a, r);
      break;
    case 3:
    case 131:
    case 139:
    case 140:
      return y0.to_workbook(a, r);
    case 123:
      if (n[1] === 92 && n[2] === 114 && n[3] === 116) return fc.to_workbook(a, r);
      break;
    case 10:
    case 13:
    case 32:
      return t_(a, r);
    case 137:
      if (n[1] === 80 && n[2] === 78 && n[3] === 71) throw new Error("PNG Image File is not a spreadsheet");
      break;
  }
  return c1.indexOf(n[0]) > -1 && n[2] <= 12 && n[3] <= 31 ? y0.to_workbook(a, r) : g0(e, a, r, i);
}
function zc(e, t) {
  switch (t.type) {
    case "base64":
    case "binary":
      break;
    case "buffer":
    case "array":
      t.type = "";
      break;
    case "file":
      return un(t.file, we.write(e, { type: Ne ? "buffer" : "" }));
    case "string":
      throw new Error("'string' output type invalid for '" + t.bookType + "' files");
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  return we.write(e, t);
}
function i_(e, t) {
  var r = Ze(t || {}), a = qg(e, r);
  return s_(a, r);
}
function s_(e, t) {
  var r = {}, a = Ne ? "nodebuffer" : typeof Uint8Array < "u" ? "array" : "string";
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
  var n = e.FullPaths ? we.write(e, { fileType: "zip", type: (
    /*::(*/
    { nodebuffer: "buffer", string: "binary" }[r.type] || r.type
  ), compression: !!t.compression }) : e.generate(r);
  if (typeof Deno < "u" && typeof n == "string") {
    if (t.type == "binary" || t.type == "base64") return n;
    n = new Uint8Array(zn(n));
  }
  return t.password && typeof encrypt_agile < "u" ? zc(encrypt_agile(n, t.password), t) : t.type === "file" ? un(t.file, n) : t.type == "string" ? ze(
    /*::(*/
    n
    /*:: :any)*/
  ) : n;
}
function f_(e, t) {
  var r = t || {}, a = ng(e, r);
  return zc(a, r);
}
function Et(e, t, r) {
  r || (r = "");
  var a = r + e;
  switch (t.type) {
    case "base64":
      return qa(Tt(a));
    case "binary":
      return Tt(a);
    case "string":
      return e;
    case "file":
      return un(t.file, a, "utf8");
    case "buffer":
      return Ne ? Rt(a, "utf8") : typeof TextEncoder < "u" ? new TextEncoder().encode(a) : Et(a, { type: "binary" }).split("").map(function(n) {
        return n.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function c_(e, t) {
  switch (t.type) {
    case "base64":
      return qa(e);
    case "binary":
      return e;
    case "string":
      return e;
    case "file":
      return un(t.file, e, "binary");
    case "buffer":
      return Ne ? Rt(e, "binary") : e.split("").map(function(r) {
        return r.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function On(e, t) {
  switch (t.type) {
    case "string":
    case "base64":
    case "binary":
      for (var r = "", a = 0; a < e.length; ++a) r += String.fromCharCode(e[a]);
      return t.type == "base64" ? qa(r) : t.type == "string" ? ze(r) : r;
    case "file":
      return un(t.file, e);
    case "buffer":
      return e;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
}
function $c(e, t) {
  b0(), e2(e);
  var r = Ze(t || {});
  if (r.cellStyles && (r.cellNF = !0, r.sheetStubs = !0), r.type == "array") {
    r.type = "binary";
    var a = $c(e, r);
    return r.type = "array", zn(a);
  }
  var n = 0;
  if (r.sheet && (typeof r.sheet == "number" ? n = r.sheet : n = e.SheetNames.indexOf(r.sheet), !e.SheetNames[n]))
    throw new Error("Sheet not found: " + r.sheet + " : " + typeof r.sheet);
  switch (r.bookType || "xlsb") {
    case "xml":
    case "xlml":
      return Et(q2(e, r), r);
    case "slk":
    case "sylk":
      return Et(Qf.from_sheet(e.Sheets[e.SheetNames[n]], r), r);
    case "htm":
    case "html":
      return Et(Mc(e.Sheets[e.SheetNames[n]], r), r);
    case "txt":
      return c_(Kc(e.Sheets[e.SheetNames[n]], r), r);
    case "csv":
      return Et(vi(e.Sheets[e.SheetNames[n]], r), r, "\uFEFF");
    case "dif":
      return Et(ec.from_sheet(e.Sheets[e.SheetNames[n]], r), r);
    case "dbf":
      return On(y0.from_sheet(e.Sheets[e.SheetNames[n]], r), r);
    case "prn":
      return Et(Da.from_sheet(e.Sheets[e.SheetNames[n]], r), r);
    case "rtf":
      return Et(fc.from_sheet(e.Sheets[e.SheetNames[n]], r), r);
    case "eth":
      return Et(rc.from_sheet(e.Sheets[e.SheetNames[n]], r), r);
    case "fods":
      return Et(Hc(e, r), r);
    case "wk1":
      return On(ra.sheet_to_wk1(e.Sheets[e.SheetNames[n]], r), r);
    case "wk3":
      return On(ra.book_to_wk3(e, r), r);
    case "biff2":
      r.biff || (r.biff = 2);
    case "biff3":
      r.biff || (r.biff = 3);
    case "biff4":
      return r.biff || (r.biff = 4), On(Bc(e, r), r);
    case "biff5":
      r.biff || (r.biff = 5);
    case "biff8":
    case "xla":
    case "xls":
      return r.biff || (r.biff = 8), f_(e, r);
    case "xlsx":
    case "xlsm":
    case "xlam":
    case "xlsb":
    case "numbers":
    case "ods":
      return i_(e, r);
    default:
      throw new Error("Unrecognized bookType |" + r.bookType + "|");
  }
}
function l_(e) {
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
function Bs(e, t, r) {
  var a = {};
  return a.type = "file", a.file = t, l_(a), $c(e, a);
}
function o_(e, t, r, a, n, i, s, f) {
  var c = or(r), l = f.defval, o = f.raw || !Object.prototype.hasOwnProperty.call(f, "raw"), u = !0, x = n === 1 ? [] : {};
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
        x[i[d]] = o && (v.t !== "n" || v.t === "n" && f.rawNumbers !== !1) ? h : Ot(v, h, f);
      h != null && (u = !1);
    }
  }
  return { row: x, isempty: u };
}
function Gn(e, t) {
  if (e == null || e["!ref"] == null) return [];
  var r = { t: "n", v: 0 }, a = 0, n = 1, i = [], s = 0, f = "", c = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, l = t || {}, o = l.range != null ? l.range : e["!ref"];
  switch (l.header === 1 ? a = 1 : l.header === "A" ? a = 2 : Array.isArray(l.header) ? a = 3 : l.header == null && (a = 0), typeof o) {
    case "string":
      c = Ue(o);
      break;
    case "number":
      c = Ue(e["!ref"]), c.s.r = o;
      break;
    default:
      c = o;
  }
  a > 0 && (n = 0);
  var u = or(c.s.r), x = [], d = [], v = 0, h = 0, p = Array.isArray(e), k = c.s.r, T = 0, g = {};
  p && !e[k] && (e[k] = []);
  var D = l.skipHidden && e["!cols"] || [], N = l.skipHidden && e["!rows"] || [];
  for (T = c.s.c; T <= c.e.c; ++T)
    if (!(D[T] || {}).hidden)
      switch (x[T] = tr(T), r = p ? e[k][T] : e[x[T] + u], a) {
        case 1:
          i[T] = T - c.s.c;
          break;
        case 2:
          i[T] = x[T];
          break;
        case 3:
          i[T] = l.header[T - c.s.c];
          break;
        default:
          if (r == null && (r = { w: "__EMPTY", t: "s" }), f = s = Ot(r, null, l), h = g[s] || 0, !h) g[s] = 1;
          else {
            do
              f = s + "_" + h++;
            while (g[f]);
            g[s] = h, g[f] = 1;
          }
          i[T] = f;
      }
  for (k = c.s.r + n; k <= c.e.r; ++k)
    if (!(N[k] || {}).hidden) {
      var b = o_(e, c, k, x, a, i, p, l);
      (b.isempty === !1 || (a === 1 ? l.blankrows !== !1 : l.blankrows)) && (d[v++] = b.row);
    }
  return d.length = v, d;
}
var Ms = /"/g;
function u_(e, t, r, a, n, i, s, f) {
  for (var c = !0, l = [], o = "", u = or(r), x = t.s.c; x <= t.e.c; ++x)
    if (a[x]) {
      var d = f.dense ? (e[r] || [])[x] : e[a[x] + u];
      if (d == null) o = "";
      else if (d.v != null) {
        c = !1, o = "" + (f.rawNumbers && d.t == "n" ? d.v : Ot(d, null, f));
        for (var v = 0, h = 0; v !== o.length; ++v) if ((h = o.charCodeAt(v)) === n || h === i || h === 34 || f.forceQuotes) {
          o = '"' + o.replace(Ms, '""') + '"';
          break;
        }
        o == "ID" && (o = '"ID"');
      } else d.f != null && !d.F ? (c = !1, o = "=" + d.f, o.indexOf(",") >= 0 && (o = '"' + o.replace(Ms, '""') + '"')) : o = "";
      l.push(o);
    }
  return f.blankrows === !1 && c ? null : l.join(s);
}
function vi(e, t) {
  var r = [], a = t ?? {};
  if (e == null || e["!ref"] == null) return "";
  var n = Ue(e["!ref"]), i = a.FS !== void 0 ? a.FS : ",", s = i.charCodeAt(0), f = a.RS !== void 0 ? a.RS : `
`, c = f.charCodeAt(0), l = new RegExp((i == "|" ? "\\|" : i) + "+$"), o = "", u = [];
  a.dense = Array.isArray(e);
  for (var x = a.skipHidden && e["!cols"] || [], d = a.skipHidden && e["!rows"] || [], v = n.s.c; v <= n.e.c; ++v) (x[v] || {}).hidden || (u[v] = tr(v));
  for (var h = 0, p = n.s.r; p <= n.e.r; ++p)
    (d[p] || {}).hidden || (o = u_(e, n, p, u, s, c, i, a), o != null && (a.strip && (o = o.replace(l, "")), (o || a.blankrows !== !1) && r.push((h++ ? f : "") + o)));
  return delete a.dense, r.join("");
}
function Kc(e, t) {
  t || (t = {}), t.FS = "	", t.RS = `
`;
  var r = vi(e, t);
  return r;
}
function h_(e) {
  var t = "", r, a = "";
  if (e == null || e["!ref"] == null) return [];
  var n = Ue(e["!ref"]), i = "", s = [], f, c = [], l = Array.isArray(e);
  for (f = n.s.c; f <= n.e.c; ++f) s[f] = tr(f);
  for (var o = n.s.r; o <= n.e.r; ++o)
    for (i = or(o), f = n.s.c; f <= n.e.c; ++f)
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
function jc(e, t, r) {
  var a = r || {}, n = +!a.skipHeader, i = e || {}, s = 0, f = 0;
  if (i && a.origin != null)
    if (typeof a.origin == "number") s = a.origin;
    else {
      var c = typeof a.origin == "string" ? ar(a.origin) : a.origin;
      s = c.r, f = c.c;
    }
  var l, o = { s: { c: 0, r: 0 }, e: { c: f, r: s + t.length - 1 + n } };
  if (i["!ref"]) {
    var u = Ue(i["!ref"]);
    o.e.c = Math.max(o.e.c, u.e.c), o.e.r = Math.max(o.e.r, u.e.r), s == -1 && (s = u.e.r + 1, o.e.r = s + t.length - 1 + n);
  } else
    s == -1 && (s = 0, o.e.r = t.length - 1 + n);
  var x = a.header || [], d = 0;
  t.forEach(function(h, p) {
    sr(h).forEach(function(k) {
      (d = x.indexOf(k)) == -1 && (x[d = x.length] = k);
      var T = h[k], g = "z", D = "", N = Fe({ c: f + d, r: s + p + n });
      l = on(i, N), T && typeof T == "object" && !(T instanceof Date) ? i[N] = T : (typeof T == "number" ? g = "n" : typeof T == "boolean" ? g = "b" : typeof T == "string" ? g = "s" : T instanceof Date ? (g = "d", a.cellDates || (g = "n", T = wr(T)), D = a.dateNF || Te[14]) : T === null && a.nullError && (g = "e", T = 0), l ? (l.t = g, l.v = T, delete l.w, delete l.R, D && (l.z = D)) : i[N] = l = { t: g, v: T }, D && (l.z = D));
    });
  }), o.e.c = Math.max(o.e.c, f + x.length - 1);
  var v = or(s);
  if (n) for (d = 0; d < x.length; ++d) i[tr(d + f) + v] = { t: "s", v: x[d] };
  return i["!ref"] = De(o), i;
}
function x_(e, t) {
  return jc(null, e, t);
}
function on(e, t, r) {
  if (typeof t == "string") {
    if (Array.isArray(e)) {
      var a = ar(t);
      return e[a.r] || (e[a.r] = []), e[a.r][a.c] || (e[a.r][a.c] = { t: "z" });
    }
    return e[t] || (e[t] = { t: "z" });
  }
  return typeof t != "number" ? on(e, Fe(t)) : on(e, Fe({ r: t, c: r || 0 }));
}
function d_(e, t) {
  if (typeof t == "number") {
    if (t >= 0 && e.SheetNames.length > t) return t;
    throw new Error("Cannot find sheet # " + t);
  } else if (typeof t == "string") {
    var r = e.SheetNames.indexOf(t);
    if (r > -1) return r;
    throw new Error("Cannot find sheet name |" + t + "|");
  } else throw new Error("Cannot find sheet |" + t + "|");
}
function pi() {
  return { SheetNames: [], Sheets: {} };
}
function mi(e, t, r, a) {
  var n = 1;
  if (!r) for (; n <= 65535 && e.SheetNames.indexOf(r = "Sheet" + n) != -1; ++n, r = void 0) ;
  if (!r || e.SheetNames.length >= 65535) throw new Error("Too many worksheets");
  if (a && e.SheetNames.indexOf(r) >= 0) {
    var i = r.match(/(^.*?)(\d+)$/);
    n = i && +i[2] || 0;
    var s = i && i[1] || r;
    for (++n; n <= 65535 && e.SheetNames.indexOf(r = s + n) != -1; ++n) ;
  }
  if (Oc(r), e.SheetNames.indexOf(r) >= 0) throw new Error("Worksheet with name |" + r + "| already exists!");
  return e.SheetNames.push(r), e.Sheets[r] = t, r;
}
function v_(e, t, r) {
  e.Workbook || (e.Workbook = {}), e.Workbook.Sheets || (e.Workbook.Sheets = []);
  var a = d_(e, t);
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
function p_(e, t) {
  return e.z = t, e;
}
function Yc(e, t, r) {
  return t ? (e.l = { Target: t }, r && (e.l.Tooltip = r)) : delete e.l, e;
}
function m_(e, t, r) {
  return Yc(e, "#" + t, r);
}
function g_(e, t, r) {
  e.c || (e.c = []), e.c.push({ t, a: r || "SheetJS" });
}
function __(e, t, r, a) {
  for (var n = typeof t != "string" ? t : Ue(t), i = typeof t == "string" ? t : De(t), s = n.s.r; s <= n.e.r; ++s) for (var f = n.s.c; f <= n.e.c; ++f) {
    var c = on(e, s, f);
    c.t = "n", c.F = i, delete c.v, s == n.s.r && f == n.s.c && (c.f = r, a && (c.D = !0));
  }
  return e;
}
var ht = {
  encode_col: tr,
  encode_row: or,
  encode_cell: Fe,
  encode_range: De,
  decode_col: $0,
  decode_row: z0,
  split_cell: Io,
  decode_cell: ar,
  decode_range: zr,
  format_cell: Ot,
  sheet_add_aoa: Ef,
  sheet_add_json: jc,
  sheet_add_dom: Uc,
  aoa_to_sheet: ba,
  json_to_sheet: x_,
  table_to_sheet: Wc,
  table_to_book: yg,
  sheet_to_csv: vi,
  sheet_to_txt: Kc,
  sheet_to_json: Gn,
  sheet_to_html: Mc,
  sheet_to_formulae: h_,
  sheet_to_row_object_array: Gn,
  sheet_get_cell: on,
  book_new: pi,
  book_append_sheet: mi,
  book_set_sheet_visibility: v_,
  cell_set_number_format: p_,
  cell_set_hyperlink: Yc,
  cell_set_internal_link: m_,
  cell_add_comment: g_,
  sheet_set_array_formula: __,
  consts: {
    SHEET_VISIBLE: 0,
    SHEET_HIDDEN: 1,
    SHEET_VERY_HIDDEN: 2
  }
};
const w_ = { class: "fp-root" }, k_ = { class: "fp-tab-bar" }, E_ = {
  key: 0,
  style: { "margin-top": "8px", color: "#67c23a" }
}, T_ = { style: { "margin-top": "12px" } }, S_ = {
  key: 1,
  style: { margin: "12px 0" }
}, F_ = { style: { display: "flex", "align-items": "center", "justify-content": "space-between" } }, y_ = { style: { "font-weight": "600" } }, A_ = { style: { "font-weight": "600" } }, C_ = {
  key: 0,
  style: { "font-size": "12px" }
}, D_ = {
  key: 1,
  style: { "font-size": "11px", color: "#909399" }
}, I_ = { style: { "font-weight": "600" } }, O_ = {
  key: 0,
  style: { "font-size": "11px", color: "#909399" }
}, R_ = { style: { "margin-bottom": "12px", display: "flex", "align-items": "center", "justify-content": "space-between" } }, b_ = {
  key: 0,
  style: { "text-align": "center", padding: "32px", color: "#67c23a", "font-size": "15px" }
}, N_ = {
  key: 0,
  style: { "margin-top": "8px", color: "#67c23a" }
}, P_ = { style: { "margin-top": "12px" } }, L_ = {
  key: 0,
  style: { margin: "12px 0" }
}, B_ = { style: { display: "flex", "align-items": "center", "justify-content": "space-between" } }, M_ = { style: { display: "flex", gap: "8px" } }, U_ = { class: "fp-xml-output" }, W_ = /* @__PURE__ */ Us({
  __name: "FlowParserView",
  props: {
    api: {},
    toolId: {}
  },
  setup(e) {
    const t = e, r = Ke("parse"), a = Ke([]), n = Ke(!1);
    ul(async () => {
      n.value = !0;
      try {
        a.value = await t.api.dataSource.list();
      } finally {
        n.value = !1;
      }
    });
    const i = Ke("paste"), s = Ke(""), f = Ke(""), c = Ke(""), l = Ke({ dataSourceId: "", sql: "", xmlField: "" }), o = Ke(!1), u = Ke([]), x = Ke(0), d = Ke([]), v = Ke(!1), h = Ke([]), p = Ke(""), k = Ke([]), T = hl(() => u.value[x.value] ?? null), g = Ke(!1), D = Ke(!1), N = Ke([]);
    async function b() {
      if (!T.value) return;
      const re = i.value === "file" ? f.value : c.value;
      if (!re) {
        xr.warning("请先解析流程");
        return;
      }
      g.value = !0;
      try {
        const G = await t.api.plugin.callSync("checkFlow", { xmlContent: re });
        if (N.value = G.issues ?? [], D.value = !0, !N.value.length)
          xr.success("检查完成，未发现配置问题");
        else {
          const Z = N.value.filter((ke) => ke.level === "ERROR").length;
          xr[Z > 0 ? "error" : "warning"](
            `检查完成，发现 ${N.value.length} 个问题（ERROR: ${Z}）`
          );
        }
      } finally {
        g.value = !1;
      }
    }
    function F(re) {
      return re === "ERROR" ? "danger" : re === "WARN" ? "warning" : "info";
    }
    function B() {
      var We;
      const re = T.value;
      if (!N.value.length && !re) return;
      const G = ht.book_new(), Z = N.value.map((_e) => ({
        级别: _e.level,
        规则编号: _e.ruleCode,
        规则名称: _e.ruleName,
        节点编号: _e.nodeId ?? "",
        关联节点: _e.nodeName ?? "",
        问题描述: _e.message
      })), ke = ht.json_to_sheet(Z.length ? Z : [{ 结果: "未发现配置问题" }]);
      ht.book_append_sheet(G, ke, "流程检查结果"), Bs(G, `check-${((We = re == null ? void 0 : re.workflow) == null ? void 0 : We.flowId) ?? "flow"}.xlsx`), xr.success("检查结果已导出");
    }
    function O(re) {
      s.value = re.name, v.value = re.name.toLowerCase().endsWith(".csv");
      const G = new FileReader();
      G.onload = (Z) => {
        var We;
        const ke = ((We = Z.target) == null ? void 0 : We.result) ?? "";
        if (v.value) {
          const _e = I0(ke, { type: "string" }), Qe = _e.Sheets[_e.SheetNames[0]], $r = ht.sheet_to_json(Qe, { header: 1 });
          h.value = ($r[0] ?? []).map(String), k.value = $r.slice(1).map((Ar) => Ar.map((ee) => ee == null ? "" : String(ee))), p.value = h.value[0] ?? "";
        } else
          f.value = ke;
      }, G.readAsText(re.raw, "UTF-8");
    }
    async function z() {
      o.value = !0, u.value = [], x.value = 0;
      try {
        let re;
        if (i.value === "file")
          if (v.value) {
            if (!p.value) {
              xr.warning("请选择包含XML内容的列");
              return;
            }
            const Z = h.value.indexOf(p.value), ke = k.value.map((We) => We[Z] ?? "").filter((We) => We.trim());
            if (!ke.length) {
              xr.warning("所选列无有效数据");
              return;
            }
            re = await t.api.plugin.callSync("parseXmlList", { xmlList: ke });
          } else {
            if (!f.value) {
              xr.warning("请先上传文件");
              return;
            }
            re = await t.api.plugin.callSync("parseXml", { xmlContent: f.value });
          }
        else if (i.value === "paste") {
          if (!c.value.trim()) {
            xr.warning("请粘贴XML内容");
            return;
          }
          re = await t.api.plugin.callSync("parseXml", { xmlContent: c.value });
        } else {
          if (!l.value.dataSourceId) {
            xr.warning("请选择数据源");
            return;
          }
          if (!l.value.sql.trim()) {
            xr.warning("请输入SQL语句");
            return;
          }
          if (!l.value.xmlField) {
            xr.warning("请输入XML字段名");
            return;
          }
          re = await t.api.plugin.callSync("parseSql", l.value);
        }
        u.value = re.flows ?? [], d.value = re.parseErrors ?? [];
        const G = d.value.length ? `，${d.value.length} 行解析失败` : "";
        xr[d.value.length ? "warning" : "success"](`解析完成，共 ${u.value.length} 个流程${G}`);
      } finally {
        o.value = !1;
      }
    }
    function X() {
      u.value = [], d.value = [], f.value = "", s.value = "", c.value = "", x.value = 0, v.value = !1, h.value = [], p.value = "", k.value = [];
    }
    const L = Ke("paste"), te = Ke(""), pe = Ke(""), oe = Ke(""), de = Ke({ dataSourceId: "", sql: "", xmlField: "" }), ve = Ke(!1), Ie = Ke([]), U = Ke(0);
    function Ee(re) {
      te.value = re.name;
      const G = new FileReader();
      G.onload = (Z) => {
        var ke;
        pe.value = ((ke = Z.target) == null ? void 0 : ke.result) ?? "";
      }, G.readAsText(re.raw, "UTF-8");
    }
    function Se(re) {
      const G = "  ";
      let Z = re.replace(/\r\n/g, `
`).replace(/\r/g, `
`).replace(/(>)\s*(<)/g, `$1
$2`).trim(), ke = 0;
      return Z.split(`
`).map((We) => {
        const _e = We.trim();
        let Qe = "";
        return (_e.startsWith("</") || _e.startsWith("?>")) && (ke = Math.max(0, ke - 1)), Qe = G.repeat(ke), _e.startsWith("<") && !_e.startsWith("</") && !_e.startsWith("<?") && !_e.endsWith("/>") && !_e.includes("</") && ke++, Qe + _e;
      }).join(`
`);
    }
    async function C() {
      ve.value = !0, Ie.value = [], U.value = 0;
      try {
        let re = [];
        if (L.value === "file") {
          if (!pe.value) {
            xr.warning("请先上传XML文件");
            return;
          }
          re = [pe.value];
        } else if (L.value === "paste") {
          if (!oe.value.trim()) {
            xr.warning("请粘贴XML内容");
            return;
          }
          re = [oe.value];
        } else {
          if (!de.value.dataSourceId) {
            xr.warning("请选择数据源");
            return;
          }
          if (!de.value.sql.trim()) {
            xr.warning("请输入SQL语句");
            return;
          }
          if (!de.value.xmlField) {
            xr.warning("请输入XML字段名");
            return;
          }
          re = (await t.api.plugin.callSync("queryRawXml", de.value)).xmlList ?? [];
        }
        const G = [];
        for (const Z of re)
          try {
            G.push(Se(Z));
          } catch (ke) {
            G.push(`<!-- 格式化失败: ${ke.message} -->
${Z}`);
          }
        Ie.value = G, xr.success(`格式化完成，共 ${G.length} 条`);
      } finally {
        ve.value = !1;
      }
    }
    function P() {
      Ie.value = [], pe.value = "", te.value = "", oe.value = "", U.value = 0;
    }
    async function I() {
      await navigator.clipboard.writeText(Ie.value[U.value] ?? ""), xr.success("已复制到剪贴板");
    }
    function R() {
      const re = Ie.value[U.value];
      if (!re) return;
      const G = new Blob([re], { type: "application/xml;charset=utf-8" }), Z = URL.createObjectURL(G), ke = document.createElement("a");
      ke.href = Z, ke.download = `formatted-${U.value + 1}.xml`, ke.click(), URL.revokeObjectURL(Z);
    }
    function Y() {
      Ie.value.forEach((re, G) => {
        const Z = new Blob([re], { type: "application/xml;charset=utf-8" }), ke = URL.createObjectURL(Z), We = document.createElement("a");
        We.href = ke, We.download = `formatted-${G + 1}.xml`, setTimeout(() => {
          We.click(), URL.revokeObjectURL(ke);
        }, G * 200);
      });
    }
    function fe(re) {
      if (!T.value) return re;
      const G = T.value.nodes.find((Z) => Z.nid === re);
      return G && G.label || re;
    }
    function ce(re) {
      return re === "S" ? "开始" : re === "E" ? "结束" : "过程";
    }
    function ie(re) {
      return re === "S" ? "success" : re === "E" ? "danger" : "";
    }
    function ne(re) {
      return { 5: "等于", 6: "不等于", 7: "大于", 8: "小于" }[re] ?? re;
    }
    function Ae(re) {
      return !re || re === "0" ? "" : { ReturnBackToFirstImpl: "退回发起人", ReturnBackToPrevImpl: "退回上一节点", ReturnBackImpl: "自定义退回" }[re] ?? re;
    }
    function A(re) {
      return re === "1" ? "是" : "否";
    }
    function $e() {
      const re = T.value;
      if (!re) return;
      const G = ht.book_new(), Z = ht.json_to_sheet([{
        流程编号: re.workflow.flowId,
        流程标识: re.workflow.flowSign,
        流程名称: re.workflow.flowName,
        流程标题: re.workflow.title,
        流程作者: re.workflow.flowAdmin,
        版本编号: re.workflow.flowVersion,
        所属机构: re.workflow.orgId,
        系统标识: re.workflow.systemId,
        创建时间: re.workflow.startTime,
        更新时间: re.workflow.updateTime
      }]);
      ht.book_append_sheet(G, Z, "流程信息");
      const ke = re.nodes.map((_e, Qe) => ({
        序号: Qe + 1,
        节点序号: _e.nodeSign,
        节点编号: _e.nid,
        节点名称: _e.label,
        节点类型: ce(_e.nodeType),
        人员配置编码: _e.nodeUser,
        人员配置描述: _e.convertLabel,
        角色ID: Pe(_e.nodeUser, "R"),
        人员逻辑: Pe(_e.nodeUser, "E"),
        机构层级: Pe(_e.nodeUser, "A"),
        授权规则: _e.creditAuth,
        自动提交: A(_e.autoSubmit),
        无人员跳过: A(_e.noUserJump),
        退回策略: Ae(_e.returnBack),
        收回标识: _e.tackBack === "TackBackImpl" ? "是" : A(_e.tackBack),
        撤回标识: A(_e.retract),
        加签: A(_e.addSign),
        协助: A(_e.assist),
        催办: A(_e.urged),
        变更: A(_e.change),
        拒绝: A(_e.refuse),
        异步执行: A(_e.asynDo),
        业务逻辑Bean: _e.bizBeanId,
        消息通知: _e.noticeType
      }));
      ht.book_append_sheet(G, ht.json_to_sheet(ke), "节点明细");
      const We = re.lines.map((_e, Qe) => {
        var $r;
        return {
          序号: Qe + 1,
          路由编号: _e.nid,
          路由名称: _e.label,
          起点节点: fe(_e.source),
          终点节点: fe(_e.target),
          条件逻辑: _e.isContinueBeanId === "0" ? "无条件" : "条件判断",
          条件配置: (($r = _e.conditions) == null ? void 0 : $r.map((Ar) => `${Ar.varName} ${ne(Ar.relation)} ${Ar.value}`).join(" / ")) ?? "",
          路由脚本: _e.routeScriptTxt,
          线条颜色: _e.customColor
        };
      });
      ht.book_append_sheet(G, ht.json_to_sheet(We), "路由线"), Bs(G, `flow-${re.workflow.flowId || "flow"}.xlsx`), xr.success("Excel 已下载");
    }
    function Pe(re, G) {
      return re ? re.split(";").filter((Z) => Z.startsWith(G + ".")).map((Z) => Z.slice(G.length + 1)).join(";") : "";
    }
    return (re, G) => {
      const Z = Yt("UploadFilled"), ke = Yt("Document"), We = Yt("Search"), _e = Yt("Warning"), Qe = Yt("Download"), $r = Yt("MagicStick"), Ar = Yt("CopyDocument");
      return je(), gr("div", w_, [
        cr("div", k_, [
          cr("div", {
            class: Ei(["fp-tab-item", { active: r.value === "parse" }]),
            onClick: G[0] || (G[0] = (ee) => r.value = "parse")
          }, "流程解析", 2),
          cr("div", {
            class: Ei(["fp-tab-item", { active: r.value === "format" }]),
            onClick: G[1] || (G[1] = (ee) => r.value = "format")
          }, "XML格式化", 2)
        ]),
        Ti(cr("div", null, [
          j(q(pa), { class: "fp-input-card" }, {
            default: ae(() => [
              j(q(Fi), {
                modelValue: i.value,
                "onUpdate:modelValue": G[7] || (G[7] = (ee) => i.value = ee)
              }, {
                default: ae(() => [
                  j(q(ma), {
                    label: "上传文件",
                    name: "file"
                  }, {
                    default: ae(() => [
                      j(q(yi), {
                        drag: "",
                        accept: ".xml,.txt,.csv",
                        "auto-upload": !1,
                        "on-change": O,
                        "show-file-list": !1,
                        style: { "margin-top": "8px" }
                      }, {
                        default: ae(() => [
                          j(q(Qr), { style: { "font-size": "40px", color: "#409eff" } }, {
                            default: ae(() => [
                              j(Z)
                            ]),
                            _: 1
                          }),
                          G[16] || (G[16] = cr("div", { style: { "margin-top": "8px" } }, "拖拽或点击上传文件（支持 XML / TXT / CSV）", -1))
                        ]),
                        _: 1
                      }),
                      s.value ? (je(), gr("div", E_, [
                        j(q(Qr), null, {
                          default: ae(() => [
                            j(ke)
                          ]),
                          _: 1
                        }),
                        be(" " + Oe(s.value), 1)
                      ])) : Hr("", !0),
                      v.value ? (je(), Pt(q(t0), {
                        key: 1,
                        "label-width": "90px",
                        style: { "margin-top": "12px" }
                      }, {
                        default: ae(() => [
                          j(q(Jt), { label: "XML列名" }, {
                            default: ae(() => [
                              j(q(a0), {
                                modelValue: p.value,
                                "onUpdate:modelValue": G[2] || (G[2] = (ee) => p.value = ee),
                                placeholder: "选择包含XML内容的列",
                                style: { width: "260px" }
                              }, {
                                default: ae(() => [
                                  (je(!0), gr(Lt, null, va(h.value, (ee) => (je(), Pt(q(n0), {
                                    key: ee,
                                    label: ee,
                                    value: ee
                                  }, null, 8, ["label", "value"]))), 128))
                                ]),
                                _: 1
                              }, 8, ["modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : Hr("", !0)
                    ]),
                    _: 1
                  }),
                  j(q(ma), {
                    label: "粘贴XML内容",
                    name: "paste"
                  }, {
                    default: ae(() => [
                      j(q(ga), {
                        modelValue: c.value,
                        "onUpdate:modelValue": G[3] || (G[3] = (ee) => c.value = ee),
                        type: "textarea",
                        rows: 8,
                        placeholder: "粘贴 XML 内容，支持多个 mxGraphModel 直接拼接",
                        style: { "font-family": "monospace", "font-size": "12px", "margin-top": "8px" }
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  j(q(ma), {
                    label: "SQL查询",
                    name: "sql"
                  }, {
                    default: ae(() => [
                      j(q(t0), {
                        "label-width": "90px",
                        style: { "margin-top": "8px" }
                      }, {
                        default: ae(() => [
                          j(q(Jt), { label: "数据源" }, {
                            default: ae(() => [
                              j(q(a0), {
                                modelValue: l.value.dataSourceId,
                                "onUpdate:modelValue": G[4] || (G[4] = (ee) => l.value.dataSourceId = ee),
                                placeholder: "选择数据源",
                                style: { width: "260px" },
                                loading: n.value
                              }, {
                                default: ae(() => [
                                  (je(!0), gr(Lt, null, va(a.value, (ee) => (je(), Pt(q(n0), {
                                    key: ee.id,
                                    label: ee.name,
                                    value: ee.id
                                  }, null, 8, ["label", "value"]))), 128))
                                ]),
                                _: 1
                              }, 8, ["modelValue", "loading"])
                            ]),
                            _: 1
                          }),
                          j(q(Jt), { label: "SQL语句" }, {
                            default: ae(() => [
                              j(q(ga), {
                                modelValue: l.value.sql,
                                "onUpdate:modelValue": G[5] || (G[5] = (ee) => l.value.sql = ee),
                                type: "textarea",
                                rows: 4,
                                placeholder: "SELECT flow_content FROM t_flow WHERE flow_id = ?",
                                style: { "font-family": "monospace", "font-size": "12px" }
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          j(q(Jt), { label: "XML字段名" }, {
                            default: ae(() => [
                              j(q(ga), {
                                modelValue: l.value.xmlField,
                                "onUpdate:modelValue": G[6] || (G[6] = (ee) => l.value.xmlField = ee),
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
              cr("div", T_, [
                j(q(gt), {
                  type: "primary",
                  loading: o.value,
                  onClick: z
                }, {
                  default: ae(() => [
                    j(q(Qr), null, {
                      default: ae(() => [
                        j(We)
                      ]),
                      _: 1
                    }),
                    G[17] || (G[17] = be(" 解析 ", -1))
                  ]),
                  _: 1
                }, 8, ["loading"]),
                j(q(gt), { onClick: X }, {
                  default: ae(() => [...G[18] || (G[18] = [
                    be("清空", -1)
                  ])]),
                  _: 1
                })
              ])
            ]),
            _: 1
          }),
          d.value.length ? (je(), Pt(q(vl), {
            key: 0,
            style: { margin: "12px 0" }
          }, {
            default: ae(() => [
              j(q(pl), null, {
                title: ae(() => [
                  j(q(ot), {
                    type: "warning",
                    size: "small",
                    style: { "margin-right": "8px" }
                  }, {
                    default: ae(() => [
                      be(Oe(d.value.length) + " 行解析失败", 1)
                    ]),
                    _: 1
                  }),
                  G[19] || (G[19] = cr("span", { style: { "font-size": "13px", color: "#e6a23c" } }, "点击展开查看详情", -1))
                ]),
                default: ae(() => [
                  j(q(wn), {
                    data: d.value,
                    border: "",
                    size: "small",
                    "max-height": "280"
                  }, {
                    default: ae(() => [
                      j(q(Ye), {
                        prop: "row",
                        label: "行号",
                        width: "70",
                        align: "center"
                      }),
                      j(q(Ye), {
                        prop: "error",
                        label: "错误信息",
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
          })) : Hr("", !0),
          u.value.length > 1 ? (je(), gr("div", S_, [
            j(q(ot), {
              size: "small",
              style: { "margin-right": "8px" }
            }, {
              default: ae(() => [
                be("共 " + Oe(u.value.length) + " 个流程", 1)
              ]),
              _: 1
            }),
            j(q(Ai), {
              modelValue: x.value,
              "onUpdate:modelValue": G[8] || (G[8] = (ee) => x.value = ee),
              size: "small"
            }, {
              default: ae(() => [
                (je(!0), gr(Lt, null, va(u.value, (ee, hr) => (je(), Pt(q(Ci), {
                  key: hr,
                  value: hr
                }, {
                  default: ae(() => {
                    var Cr, lt;
                    return [
                      be(Oe(((Cr = ee.workflow) == null ? void 0 : Cr.flowName) || ((lt = ee.workflow) == null ? void 0 : lt.flowId) || "流程" + (hr + 1)), 1)
                    ];
                  }),
                  _: 2
                }, 1032, ["value"]))), 128))
              ]),
              _: 1
            }, 8, ["modelValue"])
          ])) : Hr("", !0),
          T.value ? (je(), gr(Lt, { key: 2 }, [
            j(q(pa), { class: "fp-info-card" }, {
              header: ae(() => [
                cr("div", F_, [
                  cr("span", y_, Oe(T.value.workflow.flowName || T.value.workflow.title), 1),
                  cr("div", null, [
                    j(q(gt), {
                      size: "small",
                      type: "warning",
                      onClick: b,
                      loading: g.value
                    }, {
                      default: ae(() => [
                        j(q(Qr), null, {
                          default: ae(() => [
                            j(_e)
                          ]),
                          _: 1
                        }),
                        G[20] || (G[20] = be(" 流程检查 ", -1))
                      ]),
                      _: 1
                    }, 8, ["loading"]),
                    j(q(gt), {
                      size: "small",
                      type: "success",
                      onClick: $e
                    }, {
                      default: ae(() => [
                        j(q(Qr), null, {
                          default: ae(() => [
                            j(Qe)
                          ]),
                          _: 1
                        }),
                        G[21] || (G[21] = be(" 下载Excel ", -1))
                      ]),
                      _: 1
                    })
                  ])
                ])
              ]),
              default: ae(() => [
                j(q(ml), {
                  column: 4,
                  size: "small",
                  border: ""
                }, {
                  default: ae(() => [
                    j(q(_t), { label: "流程编号" }, {
                      default: ae(() => [
                        be(Oe(T.value.workflow.flowId), 1)
                      ]),
                      _: 1
                    }),
                    j(q(_t), { label: "流程标识" }, {
                      default: ae(() => [
                        be(Oe(T.value.workflow.flowSign), 1)
                      ]),
                      _: 1
                    }),
                    j(q(_t), { label: "流程名称" }, {
                      default: ae(() => [
                        be(Oe(T.value.workflow.flowName), 1)
                      ]),
                      _: 1
                    }),
                    j(q(_t), { label: "流程标题" }, {
                      default: ae(() => [
                        be(Oe(T.value.workflow.title), 1)
                      ]),
                      _: 1
                    }),
                    j(q(_t), { label: "流程作者" }, {
                      default: ae(() => [
                        be(Oe(T.value.workflow.flowAdmin), 1)
                      ]),
                      _: 1
                    }),
                    j(q(_t), { label: "版本编号" }, {
                      default: ae(() => [
                        be(Oe(T.value.workflow.flowVersion), 1)
                      ]),
                      _: 1
                    }),
                    j(q(_t), { label: "所属机构" }, {
                      default: ae(() => [
                        be(Oe(T.value.workflow.orgId), 1)
                      ]),
                      _: 1
                    }),
                    j(q(_t), { label: "系统标识" }, {
                      default: ae(() => [
                        be(Oe(T.value.workflow.systemId), 1)
                      ]),
                      _: 1
                    }),
                    j(q(_t), {
                      label: "创建时间",
                      span: 2
                    }, {
                      default: ae(() => [
                        be(Oe(T.value.workflow.startTime), 1)
                      ]),
                      _: 1
                    }),
                    j(q(_t), {
                      label: "更新时间",
                      span: 2
                    }, {
                      default: ae(() => [
                        be(Oe(T.value.workflow.updateTime), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            j(q(pa), { style: { "margin-top": "12px" } }, {
              header: ae(() => [
                cr("span", A_, "节点列表（" + Oe(T.value.nodes.length) + " 个）", 1)
              ]),
              default: ae(() => [
                j(q(wn), {
                  data: T.value.nodes,
                  border: "",
                  stripe: "",
                  size: "small",
                  "max-height": "420"
                }, {
                  default: ae(() => [
                    j(q(Ye), {
                      type: "index",
                      label: "序",
                      width: "46"
                    }),
                    j(q(Ye), {
                      prop: "nodeSign",
                      label: "节点序号",
                      width: "80"
                    }),
                    j(q(Ye), {
                      prop: "nid",
                      label: "编号",
                      width: "60"
                    }),
                    j(q(Ye), {
                      prop: "label",
                      label: "节点名称",
                      "min-width": "120",
                      "show-overflow-tooltip": ""
                    }),
                    j(q(Ye), {
                      label: "类型",
                      width: "64"
                    }, {
                      default: ae(({ row: ee }) => [
                        j(q(ot), {
                          type: ie(ee.nodeType),
                          size: "small"
                        }, {
                          default: ae(() => [
                            be(Oe(ce(ee.nodeType)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    j(q(Ye), {
                      label: "人员配置",
                      "min-width": "150",
                      "show-overflow-tooltip": ""
                    }, {
                      default: ae(({ row: ee }) => [
                        ee.convertLabel ? (je(), gr("div", C_, Oe(ee.convertLabel), 1)) : Hr("", !0),
                        ee.nodeUser ? (je(), gr("div", D_, Oe(ee.nodeUser), 1)) : Hr("", !0)
                      ]),
                      _: 1
                    }),
                    j(q(Ye), {
                      label: "授权规则",
                      "min-width": "120",
                      "show-overflow-tooltip": ""
                    }, {
                      default: ae(({ row: ee }) => [
                        be(Oe(ee.creditAuth), 1)
                      ]),
                      _: 1
                    }),
                    j(q(Ye), {
                      label: "自动提交",
                      width: "72",
                      align: "center"
                    }, {
                      default: ae(({ row: ee }) => [
                        j(q(ot), {
                          type: ee.autoSubmit === "1" ? "success" : "info",
                          size: "small"
                        }, {
                          default: ae(() => [
                            be(Oe(ee.autoSubmit === "1" ? "是" : "否"), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    j(q(Ye), {
                      label: "无人跳过",
                      width: "72",
                      align: "center"
                    }, {
                      default: ae(({ row: ee }) => [
                        j(q(ot), {
                          type: ee.noUserJump === "1" ? "warning" : "info",
                          size: "small"
                        }, {
                          default: ae(() => [
                            be(Oe(ee.noUserJump === "1" ? "是" : "否"), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    j(q(Ye), {
                      label: "退回策略",
                      "min-width": "100",
                      "show-overflow-tooltip": ""
                    }, {
                      default: ae(({ row: ee }) => [
                        be(Oe(Ae(ee.returnBack)), 1)
                      ]),
                      _: 1
                    }),
                    j(q(Ye), {
                      label: "消息通知",
                      "min-width": "100",
                      "show-overflow-tooltip": ""
                    }, {
                      default: ae(({ row: ee }) => [
                        be(Oe(ee.noticeType), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["data"])
              ]),
              _: 1
            }),
            j(q(pa), { style: { "margin-top": "12px" } }, {
              header: ae(() => [
                cr("span", I_, "路由线（" + Oe(T.value.lines.length) + " 条）", 1)
              ]),
              default: ae(() => [
                j(q(wn), {
                  data: T.value.lines,
                  border: "",
                  stripe: "",
                  size: "small",
                  "max-height": "380"
                }, {
                  default: ae(() => [
                    j(q(Ye), {
                      type: "index",
                      label: "序",
                      width: "46"
                    }),
                    j(q(Ye), {
                      prop: "nid",
                      label: "编号",
                      width: "60"
                    }),
                    j(q(Ye), {
                      prop: "label",
                      label: "路由名称",
                      width: "100",
                      "show-overflow-tooltip": ""
                    }),
                    j(q(Ye), {
                      label: "起点",
                      width: "120",
                      "show-overflow-tooltip": ""
                    }, {
                      default: ae(({ row: ee }) => [
                        be(Oe(fe(ee.source)), 1)
                      ]),
                      _: 1
                    }),
                    j(q(Ye), {
                      label: "终点",
                      width: "120",
                      "show-overflow-tooltip": ""
                    }, {
                      default: ae(({ row: ee }) => [
                        be(Oe(fe(ee.target)), 1)
                      ]),
                      _: 1
                    }),
                    j(q(Ye), {
                      label: "条件逻辑",
                      width: "90"
                    }, {
                      default: ae(({ row: ee }) => [
                        j(q(ot), {
                          type: ee.isContinueBeanId === "0" ? "info" : "warning",
                          size: "small"
                        }, {
                          default: ae(() => [
                            be(Oe(ee.isContinueBeanId === "0" ? "无条件" : "条件判断"), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    j(q(Ye), {
                      label: "条件配置",
                      "min-width": "180",
                      "show-overflow-tooltip": ""
                    }, {
                      default: ae(({ row: ee }) => {
                        var hr;
                        return [
                          (je(!0), gr(Lt, null, va(ee.conditions, (Cr, lt) => (je(), gr("div", {
                            key: lt,
                            style: { "font-size": "11px" }
                          }, Oe(lt > 0 ? Cr.logic === "1" ? "或" : "且" : "") + " " + Oe(Cr.varName) + " " + Oe(ne(Cr.relation)) + " " + Oe(Cr.value), 1))), 128)),
                          !((hr = ee.conditions) != null && hr.length) && ee.routeScriptTxt ? (je(), gr("div", O_, Oe(ee.routeScriptTxt.slice(0, 60)) + "…", 1)) : Hr("", !0)
                        ];
                      }),
                      _: 1
                    }),
                    j(q(Ye), {
                      label: "线条颜色",
                      width: "80",
                      align: "center"
                    }, {
                      default: ae(({ row: ee }) => [
                        ee.customColor ? (je(), gr("span", {
                          key: 0,
                          style: xl({ color: ee.customColor, fontWeight: "bold" })
                        }, "■", 4)) : Hr("", !0)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["data"])
              ]),
              _: 1
            })
          ], 64)) : Hr("", !0),
          j(q(gl), {
            modelValue: D.value,
            "onUpdate:modelValue": G[9] || (G[9] = (ee) => D.value = ee),
            title: "流程检查结果",
            width: "820px",
            "close-on-click-modal": !1,
            "destroy-on-close": ""
          }, {
            default: ae(() => [
              cr("div", R_, [
                cr("div", null, [
                  j(q(ot), {
                    type: "danger",
                    style: { "margin-right": "6px" }
                  }, {
                    default: ae(() => [
                      be(" ERROR " + Oe(N.value.filter((ee) => ee.level === "ERROR").length), 1)
                    ]),
                    _: 1
                  }),
                  j(q(ot), {
                    type: "warning",
                    style: { "margin-right": "6px" }
                  }, {
                    default: ae(() => [
                      be(" WARN " + Oe(N.value.filter((ee) => ee.level === "WARN").length), 1)
                    ]),
                    _: 1
                  }),
                  j(q(ot), { type: "info" }, {
                    default: ae(() => [
                      be(" INFO " + Oe(N.value.filter((ee) => ee.level === "INFO").length), 1)
                    ]),
                    _: 1
                  })
                ]),
                j(q(gt), {
                  size: "small",
                  type: "success",
                  onClick: B
                }, {
                  default: ae(() => [
                    j(q(Qr), null, {
                      default: ae(() => [
                        j(Qe)
                      ]),
                      _: 1
                    }),
                    G[22] || (G[22] = be(" 导出Excel ", -1))
                  ]),
                  _: 1
                })
              ]),
              j(q(wn), {
                data: N.value,
                border: "",
                stripe: "",
                size: "small",
                "max-height": "480"
              }, {
                default: ae(() => [
                  j(q(Ye), {
                    label: "级别",
                    width: "74",
                    align: "center"
                  }, {
                    default: ae(({ row: ee }) => [
                      j(q(ot), {
                        type: F(ee.level),
                        size: "small"
                      }, {
                        default: ae(() => [
                          be(Oe(ee.level), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])
                    ]),
                    _: 1
                  }),
                  j(q(Ye), {
                    prop: "ruleCode",
                    label: "规则编号",
                    width: "80"
                  }),
                  j(q(Ye), {
                    prop: "ruleName",
                    label: "规则名称",
                    width: "120"
                  }),
                  j(q(Ye), {
                    prop: "nodeId",
                    label: "节点编号",
                    width: "100",
                    "show-overflow-tooltip": ""
                  }),
                  j(q(Ye), {
                    prop: "nodeName",
                    label: "关联节点",
                    width: "120",
                    "show-overflow-tooltip": ""
                  }),
                  j(q(Ye), {
                    prop: "message",
                    label: "问题描述",
                    "min-width": "200",
                    "show-overflow-tooltip": ""
                  })
                ]),
                _: 1
              }, 8, ["data"]),
              N.value.length ? Hr("", !0) : (je(), gr("div", b_, " ✓ 未发现配置问题 "))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ], 512), [
          [Si, r.value === "parse"]
        ]),
        Ti(cr("div", null, [
          j(q(pa), { class: "fp-input-card" }, {
            default: ae(() => [
              j(q(Fi), {
                modelValue: L.value,
                "onUpdate:modelValue": G[14] || (G[14] = (ee) => L.value = ee)
              }, {
                default: ae(() => [
                  j(q(ma), {
                    label: "上传XML文件",
                    name: "file"
                  }, {
                    default: ae(() => [
                      j(q(yi), {
                        drag: "",
                        accept: ".xml,.txt",
                        "auto-upload": !1,
                        "on-change": Ee,
                        "show-file-list": !1,
                        style: { "margin-top": "8px" }
                      }, {
                        default: ae(() => [
                          j(q(Qr), { style: { "font-size": "40px", color: "#409eff" } }, {
                            default: ae(() => [
                              j(Z)
                            ]),
                            _: 1
                          }),
                          G[23] || (G[23] = cr("div", { style: { "margin-top": "8px" } }, "拖拽或点击上传 XML 文件", -1))
                        ]),
                        _: 1
                      }),
                      te.value ? (je(), gr("div", N_, [
                        j(q(Qr), null, {
                          default: ae(() => [
                            j(ke)
                          ]),
                          _: 1
                        }),
                        be(" " + Oe(te.value), 1)
                      ])) : Hr("", !0)
                    ]),
                    _: 1
                  }),
                  j(q(ma), {
                    label: "粘贴XML内容",
                    name: "paste"
                  }, {
                    default: ae(() => [
                      j(q(ga), {
                        modelValue: oe.value,
                        "onUpdate:modelValue": G[10] || (G[10] = (ee) => oe.value = ee),
                        type: "textarea",
                        rows: 8,
                        placeholder: "粘贴 XML 内容",
                        style: { "font-family": "monospace", "font-size": "12px", "margin-top": "8px" }
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  j(q(ma), {
                    label: "SQL查询",
                    name: "sql"
                  }, {
                    default: ae(() => [
                      j(q(t0), {
                        "label-width": "90px",
                        style: { "margin-top": "8px" }
                      }, {
                        default: ae(() => [
                          j(q(Jt), { label: "数据源" }, {
                            default: ae(() => [
                              j(q(a0), {
                                modelValue: de.value.dataSourceId,
                                "onUpdate:modelValue": G[11] || (G[11] = (ee) => de.value.dataSourceId = ee),
                                placeholder: "选择数据源",
                                style: { width: "260px" },
                                loading: n.value
                              }, {
                                default: ae(() => [
                                  (je(!0), gr(Lt, null, va(a.value, (ee) => (je(), Pt(q(n0), {
                                    key: ee.id,
                                    label: ee.name,
                                    value: ee.id
                                  }, null, 8, ["label", "value"]))), 128))
                                ]),
                                _: 1
                              }, 8, ["modelValue", "loading"])
                            ]),
                            _: 1
                          }),
                          j(q(Jt), { label: "SQL语句" }, {
                            default: ae(() => [
                              j(q(ga), {
                                modelValue: de.value.sql,
                                "onUpdate:modelValue": G[12] || (G[12] = (ee) => de.value.sql = ee),
                                type: "textarea",
                                rows: 4,
                                placeholder: "SELECT flow_content FROM t_flow WHERE flow_id = ?",
                                style: { "font-family": "monospace", "font-size": "12px" }
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          j(q(Jt), { label: "XML字段名" }, {
                            default: ae(() => [
                              j(q(ga), {
                                modelValue: de.value.xmlField,
                                "onUpdate:modelValue": G[13] || (G[13] = (ee) => de.value.xmlField = ee),
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
              cr("div", P_, [
                j(q(gt), {
                  type: "primary",
                  loading: ve.value,
                  onClick: C
                }, {
                  default: ae(() => [
                    j(q(Qr), null, {
                      default: ae(() => [
                        j($r)
                      ]),
                      _: 1
                    }),
                    G[24] || (G[24] = be(" 格式化 ", -1))
                  ]),
                  _: 1
                }, 8, ["loading"]),
                j(q(gt), { onClick: P }, {
                  default: ae(() => [...G[25] || (G[25] = [
                    be("清空", -1)
                  ])]),
                  _: 1
                })
              ])
            ]),
            _: 1
          }),
          Ie.value.length ? (je(), gr(Lt, { key: 0 }, [
            Ie.value.length > 1 ? (je(), gr("div", L_, [
              j(q(ot), {
                size: "small",
                style: { "margin-right": "8px" }
              }, {
                default: ae(() => [
                  be("共 " + Oe(Ie.value.length) + " 条", 1)
                ]),
                _: 1
              }),
              j(q(Ai), {
                modelValue: U.value,
                "onUpdate:modelValue": G[15] || (G[15] = (ee) => U.value = ee),
                size: "small"
              }, {
                default: ae(() => [
                  (je(!0), gr(Lt, null, va(Ie.value, (ee, hr) => (je(), Pt(q(Ci), {
                    key: hr,
                    value: hr
                  }, {
                    default: ae(() => [
                      be(" 第 " + Oe(hr + 1) + " 条 ", 1)
                    ]),
                    _: 2
                  }, 1032, ["value"]))), 128))
                ]),
                _: 1
              }, 8, ["modelValue"])
            ])) : Hr("", !0),
            j(q(pa), { style: { "margin-top": "12px" } }, {
              header: ae(() => [
                cr("div", B_, [
                  G[29] || (G[29] = cr("span", { style: { "font-weight": "600" } }, "格式化结果", -1)),
                  cr("div", M_, [
                    j(q(gt), {
                      size: "small",
                      onClick: I
                    }, {
                      default: ae(() => [
                        j(q(Qr), null, {
                          default: ae(() => [
                            j(Ar)
                          ]),
                          _: 1
                        }),
                        G[26] || (G[26] = be(" 复制 ", -1))
                      ]),
                      _: 1
                    }),
                    j(q(gt), {
                      size: "small",
                      type: "success",
                      onClick: R
                    }, {
                      default: ae(() => [
                        j(q(Qr), null, {
                          default: ae(() => [
                            j(Qe)
                          ]),
                          _: 1
                        }),
                        G[27] || (G[27] = be(" 下载XML ", -1))
                      ]),
                      _: 1
                    }),
                    Ie.value.length > 1 ? (je(), Pt(q(gt), {
                      key: 0,
                      size: "small",
                      type: "warning",
                      onClick: Y
                    }, {
                      default: ae(() => [
                        j(q(Qr), null, {
                          default: ae(() => [
                            j(Qe)
                          ]),
                          _: 1
                        }),
                        G[28] || (G[28] = be(" 下载全部 ", -1))
                      ]),
                      _: 1
                    })) : Hr("", !0)
                  ])
                ])
              ]),
              default: ae(() => [
                cr("pre", U_, Oe(Ie.value[U.value]), 1)
              ]),
              _: 1
            })
          ], 64)) : Hr("", !0)
        ], 512), [
          [Si, r.value === "format"]
        ])
      ]);
    };
  }
}), V_ = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [a, n] of t)
    r[a] = n;
  return r;
}, H_ = /* @__PURE__ */ V_(W_, [["__scopeId", "data-v-dffff0ae"]]);
function z_(e, t) {
  return Us({
    render() {
      return dl(H_, { api: e, toolId: t });
    }
  });
}
export {
  z_ as createView
};
