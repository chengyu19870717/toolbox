import { defineComponent as l0, ref as Pe, computed as n0, onMounted as cs, resolveComponent as gr, openBlock as _r, createElementBlock as Ar, createElementVNode as Ne, Fragment as Ut, renderList as Wt, normalizeClass as us, toDisplayString as zr, withDirectives as Yn, createVNode as G, withCtx as ie, createTextVNode as Le, withModifiers as xn, vShow as D0, createCommentVNode as Vt, createBlock as hs, vModelCheckbox as xs, h as ds } from "vue";
import { ElMessage as Ke, ElMessageBox as dn } from "element-plus";
/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var Sn = {};
Sn.version = "0.18.5";
var ma = 1252, ps = [874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1e4], ga = function(e) {
  ps.indexOf(e) != -1 && (ma = e);
};
function vs() {
  ga(1252);
}
var Zt = function(e) {
  ga(e);
};
function ms() {
  Zt(1200), vs();
}
var pn = function(t) {
  return String.fromCharCode(t);
}, R0 = function(t) {
  return String.fromCharCode(t);
}, An, et = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function qt(e) {
  for (var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, f = 0, o = 0, l = 0; l < e.length; )
    r = e.charCodeAt(l++), i = r >> 2, n = e.charCodeAt(l++), s = (r & 3) << 4 | n >> 4, a = e.charCodeAt(l++), f = (n & 15) << 2 | a >> 6, o = a & 63, isNaN(n) ? f = o = 64 : isNaN(a) && (o = 64), t += et.charAt(i) + et.charAt(s) + et.charAt(f) + et.charAt(o);
  return t;
}
function Jr(e) {
  var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, f = 0, o = 0;
  e = e.replace(/[^\w\+\/\=]/g, "");
  for (var l = 0; l < e.length; )
    i = et.indexOf(e.charAt(l++)), s = et.indexOf(e.charAt(l++)), r = i << 2 | s >> 4, t += String.fromCharCode(r), f = et.indexOf(e.charAt(l++)), n = (s & 15) << 4 | f >> 2, f !== 64 && (t += String.fromCharCode(n)), o = et.indexOf(e.charAt(l++)), a = (f & 3) << 6 | o, o !== 64 && (t += String.fromCharCode(a));
  return t;
}
var Se = /* @__PURE__ */ function() {
  return typeof Buffer < "u" && typeof process < "u" && typeof process.versions < "u" && !!process.versions.node;
}(), qr = /* @__PURE__ */ function() {
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
function ct(e) {
  return Se ? Buffer.alloc ? Buffer.alloc(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
function I0(e) {
  return Se ? Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
var Mr = function(t) {
  return Se ? qr(t, "binary") : t.split("").map(function(r) {
    return r.charCodeAt(0) & 255;
  });
};
function bn(e) {
  if (typeof ArrayBuffer > "u") return Mr(e);
  for (var t = new ArrayBuffer(e.length), r = new Uint8Array(t), n = 0; n != e.length; ++n) r[n] = e.charCodeAt(n) & 255;
  return t;
}
function an(e) {
  if (Array.isArray(e)) return e.map(function(n) {
    return String.fromCharCode(n);
  }).join("");
  for (var t = [], r = 0; r < e.length; ++r) t[r] = String.fromCharCode(e[r]);
  return t.join("");
}
function gs(e) {
  if (typeof Uint8Array > "u") throw new Error("Unsupported");
  return new Uint8Array(e);
}
var tr = Se ? function(e) {
  return Buffer.concat(e.map(function(t) {
    return Buffer.isBuffer(t) ? t : qr(t);
  }));
} : function(e) {
  if (typeof Uint8Array < "u") {
    var t = 0, r = 0;
    for (t = 0; t < e.length; ++t) r += e[t].length;
    var n = new Uint8Array(r), a = 0;
    for (t = 0, r = 0; t < e.length; r += a, ++t)
      if (a = e[t].length, e[t] instanceof Uint8Array) n.set(e[t], r);
      else {
        if (typeof e[t] == "string")
          throw "wtf";
        n.set(new Uint8Array(e[t]), r);
      }
    return n;
  }
  return [].concat.apply([], e.map(function(i) {
    return Array.isArray(i) ? i : [].slice.call(i);
  }));
};
function _s(e) {
  for (var t = [], r = 0, n = e.length + 250, a = ct(e.length + 255), i = 0; i < e.length; ++i) {
    var s = e.charCodeAt(i);
    if (s < 128) a[r++] = s;
    else if (s < 2048)
      a[r++] = 192 | s >> 6 & 31, a[r++] = 128 | s & 63;
    else if (s >= 55296 && s < 57344) {
      s = (s & 1023) + 64;
      var f = e.charCodeAt(++i) & 1023;
      a[r++] = 240 | s >> 8 & 7, a[r++] = 128 | s >> 2 & 63, a[r++] = 128 | f >> 6 & 15 | (s & 3) << 4, a[r++] = 128 | f & 63;
    } else
      a[r++] = 224 | s >> 12 & 15, a[r++] = 128 | s >> 6 & 63, a[r++] = 128 | s & 63;
    r > n && (t.push(a.slice(0, r)), r = 0, a = ct(65535), n = 65530);
  }
  return t.push(a.slice(0, r)), tr(t);
}
var $t = /\u0000/g, vn = /[\u0001-\u0006]/g;
function St(e) {
  for (var t = "", r = e.length - 1; r >= 0; ) t += e.charAt(r--);
  return t;
}
function Br(e, t) {
  var r = "" + e;
  return r.length >= t ? r : We("0", t - r.length) + r;
}
function o0(e, t) {
  var r = "" + e;
  return r.length >= t ? r : We(" ", t - r.length) + r;
}
function Fn(e, t) {
  var r = "" + e;
  return r.length >= t ? r : r + We(" ", t - r.length);
}
function Ts(e, t) {
  var r = "" + Math.round(e);
  return r.length >= t ? r : We("0", t - r.length) + r;
}
function Es(e, t) {
  var r = "" + e;
  return r.length >= t ? r : We("0", t - r.length) + r;
}
var N0 = /* @__PURE__ */ Math.pow(2, 32);
function gt(e, t) {
  if (e > N0 || e < -N0) return Ts(e, t);
  var r = Math.round(e);
  return Es(r, t);
}
function yn(e, t) {
  return t = t || 0, e.length >= 7 + t && (e.charCodeAt(t) | 32) === 103 && (e.charCodeAt(t + 1) | 32) === 101 && (e.charCodeAt(t + 2) | 32) === 110 && (e.charCodeAt(t + 3) | 32) === 101 && (e.charCodeAt(t + 4) | 32) === 114 && (e.charCodeAt(t + 5) | 32) === 97 && (e.charCodeAt(t + 6) | 32) === 108;
}
var P0 = [
  ["Sun", "Sunday"],
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"]
], jn = [
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
function ws(e) {
  return e || (e = {}), e[0] = "General", e[1] = "0", e[2] = "0.00", e[3] = "#,##0", e[4] = "#,##0.00", e[9] = "0%", e[10] = "0.00%", e[11] = "0.00E+00", e[12] = "# ?/?", e[13] = "# ??/??", e[14] = "m/d/yy", e[15] = "d-mmm-yy", e[16] = "d-mmm", e[17] = "mmm-yy", e[18] = "h:mm AM/PM", e[19] = "h:mm:ss AM/PM", e[20] = "h:mm", e[21] = "h:mm:ss", e[22] = "m/d/yy h:mm", e[37] = "#,##0 ;(#,##0)", e[38] = "#,##0 ;[Red](#,##0)", e[39] = "#,##0.00;(#,##0.00)", e[40] = "#,##0.00;[Red](#,##0.00)", e[45] = "mm:ss", e[46] = "[h]:mm:ss", e[47] = "mmss.0", e[48] = "##0.0E+0", e[49] = "@", e[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "', e;
}
var Ve = {
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
}, L0 = {
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
}, Ss = {
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
function Cn(e, t, r) {
  for (var n = e < 0 ? -1 : 1, a = e * n, i = 0, s = 1, f = 0, o = 1, l = 0, c = 0, d = Math.floor(a); l < t && (d = Math.floor(a), f = d * s + i, c = d * l + o, !(a - d < 5e-8)); )
    a = 1 / (a - d), i = s, s = f, o = l, l = c;
  if (c > t && (l > t ? (c = o, f = i) : (c = l, f = s)), !r) return [0, n * f, c];
  var x = Math.floor(n * f / c);
  return [x, n * f - x * c, c];
}
function mn(e, t, r) {
  if (e > 2958465 || e < 0) return null;
  var n = e | 0, a = Math.floor(86400 * (e - n)), i = 0, s = [], f = { D: n, T: a, u: 86400 * (e - n) - a, y: 0, m: 0, d: 0, H: 0, M: 0, S: 0, q: 0 };
  if (Math.abs(f.u) < 1e-6 && (f.u = 0), t && t.date1904 && (n += 1462), f.u > 0.9999 && (f.u = 0, ++a == 86400 && (f.T = a = 0, ++n, ++f.D)), n === 60)
    s = r ? [1317, 10, 29] : [1900, 2, 29], i = 3;
  else if (n === 0)
    s = r ? [1317, 8, 29] : [1900, 1, 0], i = 6;
  else {
    n > 60 && --n;
    var o = new Date(1900, 0, 1);
    o.setDate(o.getDate() + n - 1), s = [o.getFullYear(), o.getMonth() + 1, o.getDate()], i = o.getDay(), n < 60 && (i = (i + 6) % 7), r && (i = Ds(o, s));
  }
  return f.y = s[0], f.m = s[1], f.d = s[2], f.S = a % 60, a = Math.floor(a / 60), f.M = a % 60, a = Math.floor(a / 60), f.H = a, f.q = i, f;
}
var _a = /* @__PURE__ */ new Date(1899, 11, 31, 0, 0, 0), As = /* @__PURE__ */ _a.getTime(), Fs = /* @__PURE__ */ new Date(1900, 2, 1, 0, 0, 0);
function Ta(e, t) {
  var r = /* @__PURE__ */ e.getTime();
  return t ? r -= 1461 * 24 * 60 * 60 * 1e3 : e >= Fs && (r += 24 * 60 * 60 * 1e3), (r - (As + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ _a.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3);
}
function c0(e) {
  return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1");
}
function ys(e) {
  return e.indexOf("E") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/, "$10$2");
}
function Cs(e) {
  var t = e < 0 ? 12 : 11, r = c0(e.toFixed(12));
  return r.length <= t || (r = e.toPrecision(10), r.length <= t) ? r : e.toExponential(5);
}
function Os(e) {
  var t = c0(e.toFixed(11));
  return t.length > (e < 0 ? 12 : 11) || t === "0" || t === "-0" ? e.toPrecision(6) : t;
}
function ks(e) {
  var t = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E), r;
  return t >= -4 && t <= -1 ? r = e.toPrecision(10 + t) : Math.abs(t) <= 9 ? r = Cs(e) : t === 10 ? r = e.toFixed(10).substr(0, 12) : r = Os(e), c0(ys(r.toUpperCase()));
}
function a0(e, t) {
  switch (typeof e) {
    case "string":
      return e;
    case "boolean":
      return e ? "TRUE" : "FALSE";
    case "number":
      return (e | 0) === e ? e.toString(10) : ks(e);
    case "undefined":
      return "";
    case "object":
      if (e == null) return "";
      if (e instanceof Date) return tt(14, Ta(e, t && t.date1904), t);
  }
  throw new Error("unsupported value in General format: " + e);
}
function Ds(e, t) {
  t[0] -= 581;
  var r = e.getDay();
  return e < 60 && (r = (r + 6) % 7), r;
}
function Rs(e, t, r, n) {
  var a = "", i = 0, s = 0, f = r.y, o, l = 0;
  switch (e) {
    case 98:
      f = r.y + 543;
    case 121:
      switch (t.length) {
        case 1:
        case 2:
          o = f % 100, l = 2;
          break;
        default:
          o = f % 1e4, l = 4;
          break;
      }
      break;
    case 109:
      switch (t.length) {
        case 1:
        case 2:
          o = r.m, l = t.length;
          break;
        case 3:
          return jn[r.m - 1][1];
        case 5:
          return jn[r.m - 1][0];
        default:
          return jn[r.m - 1][2];
      }
      break;
    case 100:
      switch (t.length) {
        case 1:
        case 2:
          o = r.d, l = t.length;
          break;
        case 3:
          return P0[r.q][0];
        default:
          return P0[r.q][1];
      }
      break;
    case 104:
      switch (t.length) {
        case 1:
        case 2:
          o = 1 + (r.H + 11) % 12, l = t.length;
          break;
        default:
          throw "bad hour format: " + t;
      }
      break;
    case 72:
      switch (t.length) {
        case 1:
        case 2:
          o = r.H, l = t.length;
          break;
        default:
          throw "bad hour format: " + t;
      }
      break;
    case 77:
      switch (t.length) {
        case 1:
        case 2:
          o = r.M, l = t.length;
          break;
        default:
          throw "bad minute format: " + t;
      }
      break;
    case 115:
      if (t != "s" && t != "ss" && t != ".0" && t != ".00" && t != ".000") throw "bad second format: " + t;
      return r.u === 0 && (t == "s" || t == "ss") ? Br(r.S, t.length) : (n >= 2 ? s = n === 3 ? 1e3 : 100 : s = n === 1 ? 10 : 1, i = Math.round(s * (r.S + r.u)), i >= 60 * s && (i = 0), t === "s" ? i === 0 ? "0" : "" + i / s : (a = Br(i, 2 + n), t === "ss" ? a.substr(0, 2) : "." + a.substr(2, t.length - 1)));
    case 90:
      switch (t) {
        case "[h]":
        case "[hh]":
          o = r.D * 24 + r.H;
          break;
        case "[m]":
        case "[mm]":
          o = (r.D * 24 + r.H) * 60 + r.M;
          break;
        case "[s]":
        case "[ss]":
          o = ((r.D * 24 + r.H) * 60 + r.M) * 60 + Math.round(r.S + r.u);
          break;
        default:
          throw "bad abstime format: " + t;
      }
      l = t.length === 3 ? 1 : 2;
      break;
    case 101:
      o = f, l = 1;
      break;
  }
  var c = l > 0 ? Br(o, l) : "";
  return c;
}
function rt(e) {
  var t = 3;
  if (e.length <= t) return e;
  for (var r = e.length % t, n = e.substr(0, r); r != e.length; r += t) n += (n.length > 0 ? "," : "") + e.substr(r, t);
  return n;
}
var Ea = /%/g;
function Is(e, t, r) {
  var n = t.replace(Ea, ""), a = t.length - n.length;
  return Kr(e, n, r * Math.pow(10, 2 * a)) + We("%", a);
}
function Ns(e, t, r) {
  for (var n = t.length - 1; t.charCodeAt(n - 1) === 44; ) --n;
  return Kr(e, t.substr(0, n), r / Math.pow(10, 3 * (t.length - n)));
}
function wa(e, t) {
  var r, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0) return "0.0E+0";
    if (t < 0) return "-" + wa(e, -t);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(t) * Math.LOG10E) % a;
    if (i < 0 && (i += a), r = (t / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a), r.indexOf("e") === -1) {
      var s = Math.floor(Math.log(t) * Math.LOG10E);
      for (r.indexOf(".") === -1 ? r = r.charAt(0) + "." + r.substr(1) + "E+" + (s - r.length + i) : r += "E+" + (s - i); r.substr(0, 2) === "0."; )
        r = r.charAt(0) + r.substr(2, a) + "." + r.substr(2 + a), r = r.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.");
      r = r.replace(/\+-/, "-");
    }
    r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(f, o, l, c) {
      return o + l + c.substr(0, (a + i) % a) + "." + c.substr(i) + "E";
    });
  } else r = t.toExponential(n);
  return e.match(/E\+00$/) && r.match(/e[+-]\d$/) && (r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1)), e.match(/E\-/) && r.match(/e\+/) && (r = r.replace(/e\+/, "e")), r.replace("e", "E");
}
var Sa = /# (\?+)( ?)\/( ?)(\d+)/;
function Ps(e, t, r) {
  var n = parseInt(e[4], 10), a = Math.round(t * n), i = Math.floor(a / n), s = a - i * n, f = n;
  return r + (i === 0 ? "" : "" + i) + " " + (s === 0 ? We(" ", e[1].length + 1 + e[4].length) : o0(s, e[1].length) + e[2] + "/" + e[3] + Br(f, e[4].length));
}
function Ls(e, t, r) {
  return r + (t === 0 ? "" : "" + t) + We(" ", e[1].length + 2 + e[4].length);
}
var Aa = /^#*0*\.([0#]+)/, Fa = /\).*[0#]/, ya = /\(###\) ###\\?-####/;
function xr(e) {
  for (var t = "", r, n = 0; n != e.length; ++n) switch (r = e.charCodeAt(n)) {
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
function M0(e, t) {
  var r = Math.pow(10, t);
  return "" + Math.round(e * r) / r;
}
function B0(e, t) {
  var r = e - Math.floor(e), n = Math.pow(10, t);
  return t < ("" + Math.round(r * n)).length ? 0 : Math.round(r * n);
}
function Ms(e, t) {
  return t < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, t))).length ? 1 : 0;
}
function Bs(e) {
  return e < 2147483647 && e > -2147483648 ? "" + (e >= 0 ? e | 0 : e - 1 | 0) : "" + Math.floor(e);
}
function Dr(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(Fa)) {
    var n = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? Dr("n", n, r) : "(" + Dr("n", n, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44) return Ns(e, t, r);
  if (t.indexOf("%") !== -1) return Is(e, t, r);
  if (t.indexOf("E") !== -1) return wa(t, r);
  if (t.charCodeAt(0) === 36) return "$" + Dr(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var a, i, s, f, o = Math.abs(r), l = r < 0 ? "-" : "";
  if (t.match(/^00+$/)) return l + gt(o, t.length);
  if (t.match(/^[#?]+$/))
    return a = gt(r, 0), a === "0" && (a = ""), a.length > t.length ? a : xr(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(Sa)) return Ps(i, o, l);
  if (t.match(/^#+0+$/)) return l + gt(o, t.length - t.indexOf("0"));
  if (i = t.match(Aa))
    return a = M0(r, i[1].length).replace(/^([^\.]+)$/, "$1." + xr(i[1])).replace(/\.$/, "." + xr(i[1])).replace(/\.(\d*)$/, function(g, u) {
      return "." + u + We("0", xr(
        /*::(*/
        i[1]
      ).length - u.length);
    }), t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return l + M0(o, i[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/)) return l + rt(gt(o, 0));
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + Dr(e, t, -r) : rt("" + (Math.floor(r) + Ms(r, i[1].length))) + "." + Br(B0(r, i[1].length), i[1].length);
  if (i = t.match(/^#,#*,#0/)) return Dr(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = St(Dr(e, t.replace(/[\\-]/g, ""), r)), s = 0, St(St(t.replace(/\\/g, "")).replace(/[0#]/g, function(g) {
      return s < a.length ? a.charAt(s++) : g === "0" ? "0" : "";
    }));
  if (t.match(ya))
    return a = Dr(e, "##########", r), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var c = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), f = Cn(o, Math.pow(10, s) - 1, !1), a = "" + l, c = Kr(
      "n",
      /*::String(*/
      i[1],
      f[1]
    ), c.charAt(c.length - 1) == " " && (c = c.substr(0, c.length - 1) + "0"), a += c + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], c = Fn(f[2], s), c.length < i[4].length && (c = xr(i[4].substr(i[4].length - c.length)) + c), a += c, a;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = Cn(o, Math.pow(10, s) - 1, !0), l + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? o0(f[1], s) + i[2] + "/" + i[3] + Fn(f[2], s) : We(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return a = gt(r, 0), t.length <= a.length ? a : xr(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(/^([#0?]+)\.([#0]+)$/)) {
    a = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var d = t.indexOf(".") - s, x = t.length - a.length - d;
    return xr(t.substr(0, d) + a + t.substr(t.length - x));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return s = B0(r, i[1].length), r < 0 ? "-" + Dr(e, t, -r) : rt(Bs(r)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(g) {
      return "00," + (g.length < 3 ? Br(0, 3 - g.length) : "") + g;
    }) + "." + Br(s, i[1].length);
  switch (t) {
    case "###,##0.00":
      return Dr(e, "#,##0.00", r);
    case "###,###":
    case "##,###":
    case "#,###":
      var p = rt(gt(o, 0));
      return p !== "0" ? l + p : "";
    case "###,###.00":
      return Dr(e, "###,##0.00", r).replace(/^0\./, ".");
    case "#,###.00":
      return Dr(e, "#,##0.00", r).replace(/^0\./, ".");
  }
  throw new Error("unsupported format |" + t + "|");
}
function bs(e, t, r) {
  for (var n = t.length - 1; t.charCodeAt(n - 1) === 44; ) --n;
  return Kr(e, t.substr(0, n), r / Math.pow(10, 3 * (t.length - n)));
}
function Us(e, t, r) {
  var n = t.replace(Ea, ""), a = t.length - n.length;
  return Kr(e, n, r * Math.pow(10, 2 * a)) + We("%", a);
}
function Ca(e, t) {
  var r, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0) return "0.0E+0";
    if (t < 0) return "-" + Ca(e, -t);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(t) * Math.LOG10E) % a;
    if (i < 0 && (i += a), r = (t / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a), !r.match(/[Ee]/)) {
      var s = Math.floor(Math.log(t) * Math.LOG10E);
      r.indexOf(".") === -1 ? r = r.charAt(0) + "." + r.substr(1) + "E+" + (s - r.length + i) : r += "E+" + (s - i), r = r.replace(/\+-/, "-");
    }
    r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(f, o, l, c) {
      return o + l + c.substr(0, (a + i) % a) + "." + c.substr(i) + "E";
    });
  } else r = t.toExponential(n);
  return e.match(/E\+00$/) && r.match(/e[+-]\d$/) && (r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1)), e.match(/E\-/) && r.match(/e\+/) && (r = r.replace(/e\+/, "e")), r.replace("e", "E");
}
function Vr(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(Fa)) {
    var n = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? Vr("n", n, r) : "(" + Vr("n", n, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44) return bs(e, t, r);
  if (t.indexOf("%") !== -1) return Us(e, t, r);
  if (t.indexOf("E") !== -1) return Ca(t, r);
  if (t.charCodeAt(0) === 36) return "$" + Vr(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var a, i, s, f, o = Math.abs(r), l = r < 0 ? "-" : "";
  if (t.match(/^00+$/)) return l + Br(o, t.length);
  if (t.match(/^[#?]+$/))
    return a = "" + r, r === 0 && (a = ""), a.length > t.length ? a : xr(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(Sa)) return Ls(i, o, l);
  if (t.match(/^#+0+$/)) return l + Br(o, t.length - t.indexOf("0"));
  if (i = t.match(Aa))
    return a = ("" + r).replace(/^([^\.]+)$/, "$1." + xr(i[1])).replace(/\.$/, "." + xr(i[1])), a = a.replace(/\.(\d*)$/, function(g, u) {
      return "." + u + We("0", xr(i[1]).length - u.length);
    }), t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return l + ("" + o).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/)) return l + rt("" + o);
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + Vr(e, t, -r) : rt("" + r) + "." + We("0", i[1].length);
  if (i = t.match(/^#,#*,#0/)) return Vr(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = St(Vr(e, t.replace(/[\\-]/g, ""), r)), s = 0, St(St(t.replace(/\\/g, "")).replace(/[0#]/g, function(g) {
      return s < a.length ? a.charAt(s++) : g === "0" ? "0" : "";
    }));
  if (t.match(ya))
    return a = Vr(e, "##########", r), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var c = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), f = Cn(o, Math.pow(10, s) - 1, !1), a = "" + l, c = Kr(
      "n",
      /*::String(*/
      i[1],
      f[1]
    ), c.charAt(c.length - 1) == " " && (c = c.substr(0, c.length - 1) + "0"), a += c + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], c = Fn(f[2], s), c.length < i[4].length && (c = xr(i[4].substr(i[4].length - c.length)) + c), a += c, a;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = Cn(o, Math.pow(10, s) - 1, !0), l + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? o0(f[1], s) + i[2] + "/" + i[3] + Fn(f[2], s) : We(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return a = "" + r, t.length <= a.length ? a : xr(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(/^([#0]+)\.([#0]+)$/)) {
    a = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var d = t.indexOf(".") - s, x = t.length - a.length - d;
    return xr(t.substr(0, d) + a + t.substr(t.length - x));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return r < 0 ? "-" + Vr(e, t, -r) : rt("" + r).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(g) {
      return "00," + (g.length < 3 ? Br(0, 3 - g.length) : "") + g;
    }) + "." + Br(0, i[1].length);
  switch (t) {
    case "###,###":
    case "##,###":
    case "#,###":
      var p = rt("" + o);
      return p !== "0" ? l + p : "";
    default:
      if (t.match(/\.[0#?]*$/)) return Vr(e, t.slice(0, t.lastIndexOf(".")), r) + xr(t.slice(t.lastIndexOf(".")));
  }
  throw new Error("unsupported format |" + t + "|");
}
function Kr(e, t, r) {
  return (r | 0) === r ? Vr(e, t, r) : Dr(e, t, r);
}
function Ws(e) {
  for (var t = [], r = !1, n = 0, a = 0; n < e.length; ++n) switch (
    /*cc=*/
    e.charCodeAt(n)
  ) {
    case 34:
      r = !r;
      break;
    case 95:
    case 42:
    case 92:
      ++n;
      break;
    case 59:
      t[t.length] = e.substr(a, n - a), a = n + 1;
  }
  if (t[t.length] = e.substr(a), r === !0) throw new Error("Format |" + e + "| unterminated string ");
  return t;
}
var Oa = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
function ka(e) {
  for (var t = 0, r = "", n = ""; t < e.length; )
    switch (r = e.charAt(t)) {
      case "G":
        yn(e, t) && (t += 6), t++;
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
        for (n = r; e.charAt(t++) !== "]" && t < e.length; ) n += e.charAt(t);
        if (n.match(Oa)) return !0;
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
function Vs(e, t, r, n) {
  for (var a = [], i = "", s = 0, f = "", o = "t", l, c, d, x = "H"; s < e.length; )
    switch (f = e.charAt(s)) {
      case "G":
        if (!yn(e, s)) throw new Error("unrecognized character " + f + " in " + e);
        a[a.length] = { t: "G", v: "General" }, s += 7;
        break;
      case '"':
        for (i = ""; (d = e.charCodeAt(++s)) !== 34 && s < e.length; ) i += String.fromCharCode(d);
        a[a.length] = { t: "t", v: i }, ++s;
        break;
      case "\\":
        var p = e.charAt(++s), g = p === "(" || p === ")" ? p : "t";
        a[a.length] = { t: g, v: p }, ++s;
        break;
      case "_":
        a[a.length] = { t: "t", v: " " }, s += 2;
        break;
      case "@":
        a[a.length] = { t: "T", v: t }, ++s;
        break;
      case "B":
      case "b":
        if (e.charAt(s + 1) === "1" || e.charAt(s + 1) === "2") {
          if (l == null && (l = mn(t, r, e.charAt(s + 1) === "2"), l == null))
            return "";
          a[a.length] = { t: "X", v: e.substr(s, 2) }, o = f, s += 2;
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
        if (t < 0 || l == null && (l = mn(t, r), l == null))
          return "";
        for (i = f; ++s < e.length && e.charAt(s).toLowerCase() === f; ) i += f;
        f === "m" && o.toLowerCase() === "h" && (f = "M"), f === "h" && (f = x), a[a.length] = { t: f, v: i }, o = f;
        break;
      case "A":
      case "a":
      case "上":
        var u = { t: f, v: f };
        if (l == null && (l = mn(t, r)), e.substr(s, 3).toUpperCase() === "A/P" ? (l != null && (u.v = l.H >= 12 ? "P" : "A"), u.t = "T", x = "h", s += 3) : e.substr(s, 5).toUpperCase() === "AM/PM" ? (l != null && (u.v = l.H >= 12 ? "PM" : "AM"), u.t = "T", s += 5, x = "h") : e.substr(s, 5).toUpperCase() === "上午/下午" ? (l != null && (u.v = l.H >= 12 ? "下午" : "上午"), u.t = "T", s += 5, x = "h") : (u.t = "t", ++s), l == null && u.t === "T") return "";
        a[a.length] = u, o = f;
        break;
      case "[":
        for (i = f; e.charAt(s++) !== "]" && s < e.length; ) i += e.charAt(s);
        if (i.slice(-1) !== "]") throw 'unterminated "[" block: |' + i + "|";
        if (i.match(Oa)) {
          if (l == null && (l = mn(t, r), l == null))
            return "";
          a[a.length] = { t: "Z", v: i.toLowerCase() }, o = i.charAt(1);
        } else i.indexOf("$") > -1 && (i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$", ka(e) || (a[a.length] = { t: "t", v: i }));
        break;
      case ".":
        if (l != null) {
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
        a[a.length] = { t: f, v: i }, o = f;
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
  var _ = 0, k = 0, D;
  for (s = a.length - 1, o = "t"; s >= 0; --s)
    switch (a[s].t) {
      case "h":
      case "H":
        a[s].t = x, o = "h", _ < 1 && (_ = 1);
        break;
      case "s":
        (D = a[s].v.match(/\.0+$/)) && (k = Math.max(k, D[0].length - 1)), _ < 3 && (_ = 3);
      case "d":
      case "y":
      case "M":
      case "e":
        o = a[s].t;
        break;
      case "m":
        o === "s" && (a[s].t = "M", _ < 2 && (_ = 2));
        break;
      case "X":
        break;
      case "Z":
        _ < 1 && a[s].v.match(/[Hh]/) && (_ = 1), _ < 2 && a[s].v.match(/[Mm]/) && (_ = 2), _ < 3 && a[s].v.match(/[Ss]/) && (_ = 3);
    }
  switch (_) {
    case 0:
      break;
    case 1:
      l.u >= 0.5 && (l.u = 0, ++l.S), l.S >= 60 && (l.S = 0, ++l.M), l.M >= 60 && (l.M = 0, ++l.H);
      break;
    case 2:
      l.u >= 0.5 && (l.u = 0, ++l.S), l.S >= 60 && (l.S = 0, ++l.M);
      break;
  }
  var C = "", B;
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
        a[s].v = Rs(a[s].t.charCodeAt(0), a[s].v, l, k), a[s].t = "t";
        break;
      case "n":
      case "?":
        for (B = s + 1; a[B] != null && ((f = a[B].t) === "?" || f === "D" || (f === " " || f === "t") && a[B + 1] != null && (a[B + 1].t === "?" || a[B + 1].t === "t" && a[B + 1].v === "/") || a[s].t === "(" && (f === " " || f === "n" || f === ")") || f === "t" && (a[B].v === "/" || a[B].v === " " && a[B + 1] != null && a[B + 1].t == "?")); )
          a[s].v += a[B].v, a[B] = { v: "", t: ";" }, ++B;
        C += a[s].v, s = B - 1;
        break;
      case "G":
        a[s].t = "t", a[s].v = a0(t, r);
        break;
    }
  var Y = "", re, O;
  if (C.length > 0) {
    C.charCodeAt(0) == 40 ? (re = t < 0 && C.charCodeAt(0) === 45 ? -t : t, O = Kr("n", C, re)) : (re = t < 0 && n > 1 ? -t : t, O = Kr("n", C, re), re < 0 && a[0] && a[0].t == "t" && (O = O.substr(1), a[0].v = "-" + a[0].v)), B = O.length - 1;
    var b = a.length;
    for (s = 0; s < a.length; ++s) if (a[s] != null && a[s].t != "t" && a[s].v.indexOf(".") > -1) {
      b = s;
      break;
    }
    var M = a.length;
    if (b === a.length && O.indexOf("E") === -1) {
      for (s = a.length - 1; s >= 0; --s)
        a[s] == null || "n?".indexOf(a[s].t) === -1 || (B >= a[s].v.length - 1 ? (B -= a[s].v.length, a[s].v = O.substr(B + 1, a[s].v.length)) : B < 0 ? a[s].v = "" : (a[s].v = O.substr(0, B + 1), B = -1), a[s].t = "t", M = s);
      B >= 0 && M < a.length && (a[M].v = O.substr(0, B + 1) + a[M].v);
    } else if (b !== a.length && O.indexOf("E") === -1) {
      for (B = O.indexOf(".") - 1, s = b; s >= 0; --s)
        if (!(a[s] == null || "n?".indexOf(a[s].t) === -1)) {
          for (c = a[s].v.indexOf(".") > -1 && s === b ? a[s].v.indexOf(".") - 1 : a[s].v.length - 1, Y = a[s].v.substr(c + 1); c >= 0; --c)
            B >= 0 && (a[s].v.charAt(c) === "0" || a[s].v.charAt(c) === "#") && (Y = O.charAt(B--) + Y);
          a[s].v = Y, a[s].t = "t", M = s;
        }
      for (B >= 0 && M < a.length && (a[M].v = O.substr(0, B + 1) + a[M].v), B = O.indexOf(".") + 1, s = b; s < a.length; ++s)
        if (!(a[s] == null || "n?(".indexOf(a[s].t) === -1 && s !== b)) {
          for (c = a[s].v.indexOf(".") > -1 && s === b ? a[s].v.indexOf(".") + 1 : 0, Y = a[s].v.substr(0, c); c < a[s].v.length; ++c)
            B < O.length && (Y += O.charAt(B++));
          a[s].v = Y, a[s].t = "t", M = s;
        }
    }
  }
  for (s = 0; s < a.length; ++s) a[s] != null && "n?".indexOf(a[s].t) > -1 && (re = n > 1 && t < 0 && s > 0 && a[s - 1].v === "-" ? -t : t, a[s].v = Kr(a[s].t, a[s].v, re), a[s].t = "t");
  var X = "";
  for (s = 0; s !== a.length; ++s) a[s] != null && (X += a[s].v);
  return X;
}
var b0 = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
function U0(e, t) {
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
function Hs(e, t) {
  var r = Ws(e), n = r.length, a = r[n - 1].indexOf("@");
  if (n < 4 && a > -1 && --n, r.length > 4) throw new Error("cannot find right format for |" + r.join("|") + "|");
  if (typeof t != "number") return [4, r.length === 4 || a > -1 ? r[r.length - 1] : "@"];
  switch (r.length) {
    case 1:
      r = a > -1 ? ["General", "General", "General", r[0]] : [r[0], r[0], r[0], "@"];
      break;
    case 2:
      r = a > -1 ? [r[0], r[0], r[0], r[1]] : [r[0], r[1], r[0], "@"];
      break;
    case 3:
      r = a > -1 ? [r[0], r[1], r[0], r[2]] : [r[0], r[1], r[2], "@"];
      break;
  }
  var i = t > 0 ? r[0] : t < 0 ? r[1] : r[2];
  if (r[0].indexOf("[") === -1 && r[1].indexOf("[") === -1) return [n, i];
  if (r[0].match(/\[[=<>]/) != null || r[1].match(/\[[=<>]/) != null) {
    var s = r[0].match(b0), f = r[1].match(b0);
    return U0(t, s) ? [n, r[0]] : U0(t, f) ? [n, r[1]] : [n, r[s != null && f != null ? 2 : 1]];
  }
  return [n, i];
}
function tt(e, t, r) {
  r == null && (r = {});
  var n = "";
  switch (typeof e) {
    case "string":
      e == "m/d/yy" && r.dateNF ? n = r.dateNF : n = e;
      break;
    case "number":
      e == 14 && r.dateNF ? n = r.dateNF : n = (r.table != null ? r.table : Ve)[e], n == null && (n = r.table && r.table[L0[e]] || Ve[L0[e]]), n == null && (n = Ss[e] || "General");
      break;
  }
  if (yn(n, 0)) return a0(t, r);
  t instanceof Date && (t = Ta(t, r.date1904));
  var a = Hs(n, t);
  if (yn(a[1])) return a0(t, r);
  if (t === !0) t = "TRUE";
  else if (t === !1) t = "FALSE";
  else if (t === "" || t == null) return "";
  return Vs(a[1], t, r, a[0]);
}
function Da(e, t) {
  if (typeof t != "number") {
    t = +t || -1;
    for (var r = 0; r < 392; ++r) {
      if (Ve[r] == null) {
        t < 0 && (t = r);
        continue;
      }
      if (Ve[r] == e) {
        t = r;
        break;
      }
    }
    t < 0 && (t = 391);
  }
  return Ve[t] = e, t;
}
function Un(e) {
  for (var t = 0; t != 392; ++t)
    e[t] !== void 0 && Da(e[t], t);
}
function Wn() {
  Ve = ws();
}
var Ra = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
function Gs(e) {
  var t = typeof e == "number" ? Ve[e] : e;
  return t = t.replace(Ra, "(\\d+)"), new RegExp("^" + t + "$");
}
function Xs(e, t, r) {
  var n = -1, a = -1, i = -1, s = -1, f = -1, o = -1;
  (t.match(Ra) || []).forEach(function(d, x) {
    var p = parseInt(r[x + 1], 10);
    switch (d.toLowerCase().charAt(0)) {
      case "y":
        n = p;
        break;
      case "d":
        i = p;
        break;
      case "h":
        s = p;
        break;
      case "s":
        o = p;
        break;
      case "m":
        s >= 0 ? f = p : a = p;
        break;
    }
  }), o >= 0 && f == -1 && a >= 0 && (f = a, a = -1);
  var l = ("" + (n >= 0 ? n : (/* @__PURE__ */ new Date()).getFullYear())).slice(-4) + "-" + ("00" + (a >= 1 ? a : 1)).slice(-2) + "-" + ("00" + (i >= 1 ? i : 1)).slice(-2);
  l.length == 7 && (l = "0" + l), l.length == 8 && (l = "20" + l);
  var c = ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + ("00" + (f >= 0 ? f : 0)).slice(-2) + ":" + ("00" + (o >= 0 ? o : 0)).slice(-2);
  return s == -1 && f == -1 && o == -1 ? l : n == -1 && a == -1 && i == -1 ? c : l + "T" + c;
}
var $s = /* @__PURE__ */ function() {
  var e = {};
  e.version = "1.2.0";
  function t() {
    for (var O = 0, b = new Array(256), M = 0; M != 256; ++M)
      O = M, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, b[M] = O;
    return typeof Int32Array < "u" ? new Int32Array(b) : b;
  }
  var r = t();
  function n(O) {
    var b = 0, M = 0, X = 0, K = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
    for (X = 0; X != 256; ++X) K[X] = O[X];
    for (X = 0; X != 256; ++X)
      for (M = O[X], b = 256 + X; b < 4096; b += 256) M = K[b] = M >>> 8 ^ O[M & 255];
    var j = [];
    for (X = 1; X != 16; ++X) j[X - 1] = typeof Int32Array < "u" ? K.subarray(X * 256, X * 256 + 256) : K.slice(X * 256, X * 256 + 256);
    return j;
  }
  var a = n(r), i = a[0], s = a[1], f = a[2], o = a[3], l = a[4], c = a[5], d = a[6], x = a[7], p = a[8], g = a[9], u = a[10], _ = a[11], k = a[12], D = a[13], C = a[14];
  function B(O, b) {
    for (var M = b ^ -1, X = 0, K = O.length; X < K; ) M = M >>> 8 ^ r[(M ^ O.charCodeAt(X++)) & 255];
    return ~M;
  }
  function Y(O, b) {
    for (var M = b ^ -1, X = O.length - 15, K = 0; K < X; ) M = C[O[K++] ^ M & 255] ^ D[O[K++] ^ M >> 8 & 255] ^ k[O[K++] ^ M >> 16 & 255] ^ _[O[K++] ^ M >>> 24] ^ u[O[K++]] ^ g[O[K++]] ^ p[O[K++]] ^ x[O[K++]] ^ d[O[K++]] ^ c[O[K++]] ^ l[O[K++]] ^ o[O[K++]] ^ f[O[K++]] ^ s[O[K++]] ^ i[O[K++]] ^ r[O[K++]];
    for (X += 15; K < X; ) M = M >>> 8 ^ r[(M ^ O[K++]) & 255];
    return ~M;
  }
  function re(O, b) {
    for (var M = b ^ -1, X = 0, K = O.length, j = 0, ne = 0; X < K; )
      j = O.charCodeAt(X++), j < 128 ? M = M >>> 8 ^ r[(M ^ j) & 255] : j < 2048 ? (M = M >>> 8 ^ r[(M ^ (192 | j >> 6 & 31)) & 255], M = M >>> 8 ^ r[(M ^ (128 | j & 63)) & 255]) : j >= 55296 && j < 57344 ? (j = (j & 1023) + 64, ne = O.charCodeAt(X++) & 1023, M = M >>> 8 ^ r[(M ^ (240 | j >> 8 & 7)) & 255], M = M >>> 8 ^ r[(M ^ (128 | j >> 2 & 63)) & 255], M = M >>> 8 ^ r[(M ^ (128 | ne >> 6 & 15 | (j & 3) << 4)) & 255], M = M >>> 8 ^ r[(M ^ (128 | ne & 63)) & 255]) : (M = M >>> 8 ^ r[(M ^ (224 | j >> 12 & 15)) & 255], M = M >>> 8 ^ r[(M ^ (128 | j >> 6 & 63)) & 255], M = M >>> 8 ^ r[(M ^ (128 | j & 63)) & 255]);
    return ~M;
  }
  return e.table = r, e.bstr = B, e.buf = Y, e.str = re, e;
}(), De = /* @__PURE__ */ function() {
  var t = {};
  t.version = "1.2.1";
  function r(h, T) {
    for (var v = h.split("/"), m = T.split("/"), E = 0, w = 0, I = Math.min(v.length, m.length); E < I; ++E) {
      if (w = v[E].length - m[E].length) return w;
      if (v[E] != m[E]) return v[E] < m[E] ? -1 : 1;
    }
    return v.length - m.length;
  }
  function n(h) {
    if (h.charAt(h.length - 1) == "/") return h.slice(0, -1).indexOf("/") === -1 ? h : n(h.slice(0, -1));
    var T = h.lastIndexOf("/");
    return T === -1 ? h : h.slice(0, T + 1);
  }
  function a(h) {
    if (h.charAt(h.length - 1) == "/") return a(h.slice(0, -1));
    var T = h.lastIndexOf("/");
    return T === -1 ? h : h.slice(T + 1);
  }
  function i(h, T) {
    typeof T == "string" && (T = new Date(T));
    var v = T.getHours();
    v = v << 6 | T.getMinutes(), v = v << 5 | T.getSeconds() >>> 1, h.write_shift(2, v);
    var m = T.getFullYear() - 1980;
    m = m << 4 | T.getMonth() + 1, m = m << 5 | T.getDate(), h.write_shift(2, m);
  }
  function s(h) {
    var T = h.read_shift(2) & 65535, v = h.read_shift(2) & 65535, m = /* @__PURE__ */ new Date(), E = v & 31;
    v >>>= 5;
    var w = v & 15;
    v >>>= 4, m.setMilliseconds(0), m.setFullYear(v + 1980), m.setMonth(w - 1), m.setDate(E);
    var I = T & 31;
    T >>>= 5;
    var W = T & 63;
    return T >>>= 6, m.setHours(T), m.setMinutes(W), m.setSeconds(I << 1), m;
  }
  function f(h) {
    yr(h, 0);
    for (var T = (
      /*::(*/
      {}
    ), v = 0; h.l <= h.length - 4; ) {
      var m = h.read_shift(2), E = h.read_shift(2), w = h.l + E, I = {};
      switch (m) {
        case 21589:
          v = h.read_shift(1), v & 1 && (I.mtime = h.read_shift(4)), E > 5 && (v & 2 && (I.atime = h.read_shift(4)), v & 4 && (I.ctime = h.read_shift(4))), I.mtime && (I.mt = new Date(I.mtime * 1e3));
          break;
      }
      h.l = w, T[m] = I;
    }
    return T;
  }
  var o;
  function l() {
    return o || (o = {});
  }
  function c(h, T) {
    if (h[0] == 80 && h[1] == 75) return st(h, T);
    if ((h[0] | 32) == 109 && (h[1] | 32) == 105) return as(h, T);
    if (h.length < 512) throw new Error("CFB file size " + h.length + " < 512");
    var v = 3, m = 512, E = 0, w = 0, I = 0, W = 0, R = 0, N = [], P = (
      /*::(*/
      h.slice(0, 512)
    );
    yr(P, 0);
    var J = d(P);
    switch (v = J[0], v) {
      case 3:
        m = 512;
        break;
      case 4:
        m = 4096;
        break;
      case 0:
        if (J[1] == 0) return st(h, T);
      default:
        throw new Error("Major Version: Expected 3 or 4 saw " + v);
    }
    m !== 512 && (P = /*::(*/
    h.slice(0, m), yr(
      P,
      28
      /* blob.l */
    ));
    var te = h.slice(0, m);
    x(P, v);
    var le = P.read_shift(4, "i");
    if (v === 3 && le !== 0) throw new Error("# Directory Sectors: Expected 0 saw " + le);
    P.l += 4, I = P.read_shift(4, "i"), P.l += 4, P.chk("00100000", "Mini Stream Cutoff Size: "), W = P.read_shift(4, "i"), E = P.read_shift(4, "i"), R = P.read_shift(4, "i"), w = P.read_shift(4, "i");
    for (var q = -1, se = 0; se < 109 && (q = P.read_shift(4, "i"), !(q < 0)); ++se)
      N[se] = q;
    var ve = p(h, m);
    _(R, w, ve, m, N);
    var be = D(ve, I, N, m);
    be[I].name = "!Directory", E > 0 && W !== ne && (be[W].name = "!MiniFAT"), be[N[0]].name = "!FAT", be.fat_addrs = N, be.ssz = m;
    var Ue = {}, lr = [], Mt = [], Bt = [];
    C(I, be, ve, lr, E, Ue, Mt, W), g(Mt, Bt, lr), lr.shift();
    var bt = {
      FileIndex: Mt,
      FullPaths: Bt
    };
    return T && T.raw && (bt.raw = { header: te, sectors: ve }), bt;
  }
  function d(h) {
    if (h[h.l] == 80 && h[h.l + 1] == 75) return [0, 0];
    h.chk(Te, "Header Signature: "), h.l += 16;
    var T = h.read_shift(2, "u");
    return [h.read_shift(2, "u"), T];
  }
  function x(h, T) {
    var v = 9;
    switch (h.l += 2, v = h.read_shift(2)) {
      case 9:
        if (T != 3) throw new Error("Sector Shift: Expected 9 saw " + v);
        break;
      case 12:
        if (T != 4) throw new Error("Sector Shift: Expected 12 saw " + v);
        break;
      default:
        throw new Error("Sector Shift: Expected 9 or 12 saw " + v);
    }
    h.chk("0600", "Mini Sector Shift: "), h.chk("000000000000", "Reserved: ");
  }
  function p(h, T) {
    for (var v = Math.ceil(h.length / T) - 1, m = [], E = 1; E < v; ++E) m[E - 1] = h.slice(E * T, (E + 1) * T);
    return m[v - 1] = h.slice(v * T), m;
  }
  function g(h, T, v) {
    for (var m = 0, E = 0, w = 0, I = 0, W = 0, R = v.length, N = [], P = []; m < R; ++m)
      N[m] = P[m] = m, T[m] = v[m];
    for (; W < P.length; ++W)
      m = P[W], E = h[m].L, w = h[m].R, I = h[m].C, N[m] === m && (E !== -1 && N[E] !== E && (N[m] = N[E]), w !== -1 && N[w] !== w && (N[m] = N[w])), I !== -1 && (N[I] = m), E !== -1 && m != N[m] && (N[E] = N[m], P.lastIndexOf(E) < W && P.push(E)), w !== -1 && m != N[m] && (N[w] = N[m], P.lastIndexOf(w) < W && P.push(w));
    for (m = 1; m < R; ++m) N[m] === m && (w !== -1 && N[w] !== w ? N[m] = N[w] : E !== -1 && N[E] !== E && (N[m] = N[E]));
    for (m = 1; m < R; ++m)
      if (h[m].type !== 0) {
        if (W = m, W != N[W]) do
          W = N[W], T[m] = T[W] + "/" + T[m];
        while (W !== 0 && N[W] !== -1 && W != N[W]);
        N[m] = -1;
      }
    for (T[0] += "/", m = 1; m < R; ++m)
      h[m].type !== 2 && (T[m] += "/");
  }
  function u(h, T, v) {
    for (var m = h.start, E = h.size, w = [], I = m; v && E > 0 && I >= 0; )
      w.push(T.slice(I * j, I * j + j)), E -= j, I = lt(v, I * 4);
    return w.length === 0 ? U(0) : tr(w).slice(0, h.size);
  }
  function _(h, T, v, m, E) {
    var w = ne;
    if (h === ne) {
      if (T !== 0) throw new Error("DIFAT chain shorter than expected");
    } else if (h !== -1) {
      var I = v[h], W = (m >>> 2) - 1;
      if (!I) return;
      for (var R = 0; R < W && (w = lt(I, R * 4)) !== ne; ++R)
        E.push(w);
      _(lt(I, m - 4), T - 1, v, m, E);
    }
  }
  function k(h, T, v, m, E) {
    var w = [], I = [];
    E || (E = []);
    var W = m - 1, R = 0, N = 0;
    for (R = T; R >= 0; ) {
      E[R] = !0, w[w.length] = R, I.push(h[R]);
      var P = v[Math.floor(R * 4 / m)];
      if (N = R * 4 & W, m < 4 + N) throw new Error("FAT boundary crossed: " + R + " 4 " + m);
      if (!h[P]) break;
      R = lt(h[P], N);
    }
    return { nodes: w, data: K0([I]) };
  }
  function D(h, T, v, m) {
    var E = h.length, w = [], I = [], W = [], R = [], N = m - 1, P = 0, J = 0, te = 0, le = 0;
    for (P = 0; P < E; ++P)
      if (W = [], te = P + T, te >= E && (te -= E), !I[te]) {
        R = [];
        var q = [];
        for (J = te; J >= 0; ) {
          q[J] = !0, I[J] = !0, W[W.length] = J, R.push(h[J]);
          var se = v[Math.floor(J * 4 / m)];
          if (le = J * 4 & N, m < 4 + le) throw new Error("FAT boundary crossed: " + J + " 4 " + m);
          if (!h[se] || (J = lt(h[se], le), q[J])) break;
        }
        w[te] = { nodes: W, data: K0([R]) };
      }
    return w;
  }
  function C(h, T, v, m, E, w, I, W) {
    for (var R = 0, N = m.length ? 2 : 0, P = T[h].data, J = 0, te = 0, le; J < P.length; J += 128) {
      var q = (
        /*::(*/
        P.slice(J, J + 128)
      );
      yr(q, 64), te = q.read_shift(2), le = p0(q, 0, te - N), m.push(le);
      var se = {
        name: le,
        type: q.read_shift(1),
        color: q.read_shift(1),
        L: q.read_shift(4, "i"),
        R: q.read_shift(4, "i"),
        C: q.read_shift(4, "i"),
        clsid: q.read_shift(16),
        state: q.read_shift(4, "i"),
        start: 0,
        size: 0
      }, ve = q.read_shift(2) + q.read_shift(2) + q.read_shift(2) + q.read_shift(2);
      ve !== 0 && (se.ct = B(q, q.l - 8));
      var be = q.read_shift(2) + q.read_shift(2) + q.read_shift(2) + q.read_shift(2);
      be !== 0 && (se.mt = B(q, q.l - 8)), se.start = q.read_shift(4, "i"), se.size = q.read_shift(4, "i"), se.size < 0 && se.start < 0 && (se.size = se.type = 0, se.start = ne, se.name = ""), se.type === 5 ? (R = se.start, E > 0 && R !== ne && (T[R].name = "!StreamData")) : se.size >= 4096 ? (se.storage = "fat", T[se.start] === void 0 && (T[se.start] = k(v, se.start, T.fat_addrs, T.ssz)), T[se.start].name = se.name, se.content = T[se.start].data.slice(0, se.size)) : (se.storage = "minifat", se.size < 0 ? se.size = 0 : R !== ne && se.start !== ne && T[R] && (se.content = u(se, T[R].data, (T[W] || {}).data))), se.content && yr(se.content, 0), w[le] = se, I.push(se);
    }
  }
  function B(h, T) {
    return new Date((Or(h, T + 4) / 1e7 * Math.pow(2, 32) + Or(h, T) / 1e7 - 11644473600) * 1e3);
  }
  function Y(h, T) {
    return l(), c(o.readFileSync(h), T);
  }
  function re(h, T) {
    var v = T && T.type;
    switch (v || Se && Buffer.isBuffer(h) && (v = "buffer"), v || "base64") {
      case "file":
        return Y(h, T);
      case "base64":
        return c(Mr(Jr(h)), T);
      case "binary":
        return c(Mr(h), T);
    }
    return c(
      /*::typeof blob == 'string' ? new Buffer(blob, 'utf-8') : */
      h,
      T
    );
  }
  function O(h, T) {
    var v = T || {}, m = v.root || "Root Entry";
    if (h.FullPaths || (h.FullPaths = []), h.FileIndex || (h.FileIndex = []), h.FullPaths.length !== h.FileIndex.length) throw new Error("inconsistent CFB structure");
    h.FullPaths.length === 0 && (h.FullPaths[0] = m + "/", h.FileIndex[0] = { name: m, type: 5 }), v.CLSID && (h.FileIndex[0].clsid = v.CLSID), b(h);
  }
  function b(h) {
    var T = "Sh33tJ5";
    if (!De.find(h, "/" + T)) {
      var v = U(4);
      v[0] = 55, v[1] = v[3] = 50, v[2] = 54, h.FileIndex.push({ name: T, type: 2, content: v, size: 4, L: 69, R: 69, C: 69 }), h.FullPaths.push(h.FullPaths[0] + T), M(h);
    }
  }
  function M(h, T) {
    O(h);
    for (var v = !1, m = !1, E = h.FullPaths.length - 1; E >= 0; --E) {
      var w = h.FileIndex[E];
      switch (w.type) {
        case 0:
          m ? v = !0 : (h.FileIndex.pop(), h.FullPaths.pop());
          break;
        case 1:
        case 2:
        case 5:
          m = !0, isNaN(w.R * w.L * w.C) && (v = !0), w.R > -1 && w.L > -1 && w.R == w.L && (v = !0);
          break;
        default:
          v = !0;
          break;
      }
    }
    if (!(!v && !T)) {
      var I = new Date(1987, 1, 19), W = 0, R = Object.create ? /* @__PURE__ */ Object.create(null) : {}, N = [];
      for (E = 0; E < h.FullPaths.length; ++E)
        R[h.FullPaths[E]] = !0, h.FileIndex[E].type !== 0 && N.push([h.FullPaths[E], h.FileIndex[E]]);
      for (E = 0; E < N.length; ++E) {
        var P = n(N[E][0]);
        m = R[P], m || (N.push([P, {
          name: a(P).replace("/", ""),
          type: 1,
          clsid: Re,
          ct: I,
          mt: I,
          content: null
        }]), R[P] = !0);
      }
      for (N.sort(function(le, q) {
        return r(le[0], q[0]);
      }), h.FullPaths = [], h.FileIndex = [], E = 0; E < N.length; ++E)
        h.FullPaths[E] = N[E][0], h.FileIndex[E] = N[E][1];
      for (E = 0; E < N.length; ++E) {
        var J = h.FileIndex[E], te = h.FullPaths[E];
        if (J.name = a(te).replace("/", ""), J.L = J.R = J.C = -(J.color = 1), J.size = J.content ? J.content.length : 0, J.start = 0, J.clsid = J.clsid || Re, E === 0)
          J.C = N.length > 1 ? 1 : -1, J.size = 0, J.type = 5;
        else if (te.slice(-1) == "/") {
          for (W = E + 1; W < N.length && n(h.FullPaths[W]) != te; ++W) ;
          for (J.C = W >= N.length ? -1 : W, W = E + 1; W < N.length && n(h.FullPaths[W]) != n(te); ++W) ;
          J.R = W >= N.length ? -1 : W, J.type = 1;
        } else
          n(h.FullPaths[E + 1] || "") == n(te) && (J.R = E + 1), J.type = 2;
      }
    }
  }
  function X(h, T) {
    var v = T || {};
    if (v.fileType == "mad") return is(h, v);
    switch (M(h), v.fileType) {
      case "zip":
        return qi(h, v);
    }
    var m = function(le) {
      for (var q = 0, se = 0, ve = 0; ve < le.FileIndex.length; ++ve) {
        var be = le.FileIndex[ve];
        if (be.content) {
          var Ue = be.content.length;
          Ue > 0 && (Ue < 4096 ? q += Ue + 63 >> 6 : se += Ue + 511 >> 9);
        }
      }
      for (var lr = le.FullPaths.length + 3 >> 2, Mt = q + 7 >> 3, Bt = q + 127 >> 7, bt = Mt + se + lr + Bt, ft = bt + 127 >> 7, Kn = ft <= 109 ? 0 : Math.ceil((ft - 109) / 127); bt + ft + Kn + 127 >> 7 > ft; ) Kn = ++ft <= 109 ? 0 : Math.ceil((ft - 109) / 127);
      var $r = [1, Kn, ft, Bt, lr, se, q, 0];
      return le.FileIndex[0].size = q << 6, $r[7] = (le.FileIndex[0].start = $r[0] + $r[1] + $r[2] + $r[3] + $r[4] + $r[5]) + ($r[6] + 7 >> 3), $r;
    }(h), E = U(m[7] << 9), w = 0, I = 0;
    {
      for (w = 0; w < 8; ++w) E.write_shift(1, xe[w]);
      for (w = 0; w < 8; ++w) E.write_shift(2, 0);
      for (E.write_shift(2, 62), E.write_shift(2, 3), E.write_shift(2, 65534), E.write_shift(2, 9), E.write_shift(2, 6), w = 0; w < 3; ++w) E.write_shift(2, 0);
      for (E.write_shift(4, 0), E.write_shift(4, m[2]), E.write_shift(4, m[0] + m[1] + m[2] + m[3] - 1), E.write_shift(4, 0), E.write_shift(4, 4096), E.write_shift(4, m[3] ? m[0] + m[1] + m[2] - 1 : ne), E.write_shift(4, m[3]), E.write_shift(-4, m[1] ? m[0] - 1 : ne), E.write_shift(4, m[1]), w = 0; w < 109; ++w) E.write_shift(-4, w < m[2] ? m[1] + w : -1);
    }
    if (m[1])
      for (I = 0; I < m[1]; ++I) {
        for (; w < 236 + I * 127; ++w) E.write_shift(-4, w < m[2] ? m[1] + w : -1);
        E.write_shift(-4, I === m[1] - 1 ? ne : I + 1);
      }
    var W = function(le) {
      for (I += le; w < I - 1; ++w) E.write_shift(-4, w + 1);
      le && (++w, E.write_shift(-4, ne));
    };
    for (I = w = 0, I += m[1]; w < I; ++w) E.write_shift(-4, de.DIFSECT);
    for (I += m[2]; w < I; ++w) E.write_shift(-4, de.FATSECT);
    W(m[3]), W(m[4]);
    for (var R = 0, N = 0, P = h.FileIndex[0]; R < h.FileIndex.length; ++R)
      P = h.FileIndex[R], P.content && (N = P.content.length, !(N < 4096) && (P.start = I, W(N + 511 >> 9)));
    for (W(m[6] + 7 >> 3); E.l & 511; ) E.write_shift(-4, de.ENDOFCHAIN);
    for (I = w = 0, R = 0; R < h.FileIndex.length; ++R)
      P = h.FileIndex[R], P.content && (N = P.content.length, !(!N || N >= 4096) && (P.start = I, W(N + 63 >> 6)));
    for (; E.l & 511; ) E.write_shift(-4, de.ENDOFCHAIN);
    for (w = 0; w < m[4] << 2; ++w) {
      var J = h.FullPaths[w];
      if (!J || J.length === 0) {
        for (R = 0; R < 17; ++R) E.write_shift(4, 0);
        for (R = 0; R < 3; ++R) E.write_shift(4, -1);
        for (R = 0; R < 12; ++R) E.write_shift(4, 0);
        continue;
      }
      P = h.FileIndex[w], w === 0 && (P.start = P.size ? P.start - 1 : ne);
      var te = w === 0 && v.root || P.name;
      if (N = 2 * (te.length + 1), E.write_shift(64, te, "utf16le"), E.write_shift(2, N), E.write_shift(1, P.type), E.write_shift(1, P.color), E.write_shift(-4, P.L), E.write_shift(-4, P.R), E.write_shift(-4, P.C), P.clsid) E.write_shift(16, P.clsid, "hex");
      else for (R = 0; R < 4; ++R) E.write_shift(4, 0);
      E.write_shift(4, P.state || 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, P.start), E.write_shift(4, P.size), E.write_shift(4, 0);
    }
    for (w = 1; w < h.FileIndex.length; ++w)
      if (P = h.FileIndex[w], P.size >= 4096)
        if (E.l = P.start + 1 << 9, Se && Buffer.isBuffer(P.content))
          P.content.copy(E, E.l, 0, P.size), E.l += P.size + 511 & -512;
        else {
          for (R = 0; R < P.size; ++R) E.write_shift(1, P.content[R]);
          for (; R & 511; ++R) E.write_shift(1, 0);
        }
    for (w = 1; w < h.FileIndex.length; ++w)
      if (P = h.FileIndex[w], P.size > 0 && P.size < 4096)
        if (Se && Buffer.isBuffer(P.content))
          P.content.copy(E, E.l, 0, P.size), E.l += P.size + 63 & -64;
        else {
          for (R = 0; R < P.size; ++R) E.write_shift(1, P.content[R]);
          for (; R & 63; ++R) E.write_shift(1, 0);
        }
    if (Se)
      E.l = E.length;
    else
      for (; E.l < E.length; ) E.write_shift(1, 0);
    return E;
  }
  function K(h, T) {
    var v = h.FullPaths.map(function(R) {
      return R.toUpperCase();
    }), m = v.map(function(R) {
      var N = R.split("/");
      return N[N.length - (R.slice(-1) == "/" ? 2 : 1)];
    }), E = !1;
    T.charCodeAt(0) === 47 ? (E = !0, T = v[0].slice(0, -1) + T) : E = T.indexOf("/") !== -1;
    var w = T.toUpperCase(), I = E === !0 ? v.indexOf(w) : m.indexOf(w);
    if (I !== -1) return h.FileIndex[I];
    var W = !w.match(vn);
    for (w = w.replace($t, ""), W && (w = w.replace(vn, "!")), I = 0; I < v.length; ++I)
      if ((W ? v[I].replace(vn, "!") : v[I]).replace($t, "") == w || (W ? m[I].replace(vn, "!") : m[I]).replace($t, "") == w) return h.FileIndex[I];
    return null;
  }
  var j = 64, ne = -2, Te = "d0cf11e0a1b11ae1", xe = [208, 207, 17, 224, 161, 177, 26, 225], Re = "00000000000000000000000000000000", de = {
    /* 2.1 Compund File Sector Numbers and Types */
    MAXREGSECT: -6,
    DIFSECT: -4,
    FATSECT: -3,
    ENDOFCHAIN: ne,
    FREESECT: -1,
    /* 2.2 Compound File Header */
    HEADER_SIGNATURE: Te,
    HEADER_MINOR_VERSION: "3e00",
    MAXREGSID: -6,
    NOSTREAM: -1,
    HEADER_CLSID: Re,
    /* 2.6.1 Compound File Directory Entry */
    EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
  };
  function vr(h, T, v) {
    l();
    var m = X(h, v);
    o.writeFileSync(T, m);
  }
  function He(h) {
    for (var T = new Array(h.length), v = 0; v < h.length; ++v) T[v] = String.fromCharCode(h[v]);
    return T.join("");
  }
  function ur(h, T) {
    var v = X(h, T);
    switch (T && T.type || "buffer") {
      case "file":
        return l(), o.writeFileSync(T.filename, v), v;
      case "binary":
        return typeof v == "string" ? v : He(v);
      case "base64":
        return qt(typeof v == "string" ? v : He(v));
      case "buffer":
        if (Se) return Buffer.isBuffer(v) ? v : qr(v);
      case "array":
        return typeof v == "string" ? Mr(v) : v;
    }
    return v;
  }
  var hr;
  function S(h) {
    try {
      var T = h.InflateRaw, v = new T();
      if (v._processChunk(new Uint8Array([3, 0]), v._finishFlushFlag), v.bytesRead) hr = h;
      else throw new Error("zlib does not expose bytesRead");
    } catch (m) {
      console.error("cannot use native zlib: " + (m.message || m));
    }
  }
  function L(h, T) {
    if (!hr) return z(h, T);
    var v = hr.InflateRaw, m = new v(), E = m._processChunk(h.slice(h.l), m._finishFlushFlag);
    return h.l += m.bytesRead, E;
  }
  function F(h) {
    return hr ? hr.deflateRawSync(h) : Xr(h);
  }
  var A = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], V = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], ue = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
  function he(h) {
    var T = (h << 1 | h << 11) & 139536 | (h << 5 | h << 15) & 558144;
    return (T >> 16 | T >> 8 | T) & 255;
  }
  for (var ce = typeof Uint8Array < "u", ae = ce ? new Uint8Array(256) : [], Ae = 0; Ae < 256; ++Ae) ae[Ae] = he(Ae);
  function _e(h, T) {
    var v = ae[h & 255];
    return T <= 8 ? v >>> 8 - T : (v = v << 8 | ae[h >> 8 & 255], T <= 16 ? v >>> 16 - T : (v = v << 8 | ae[h >> 16 & 255], v >>> 24 - T));
  }
  function je(h, T) {
    var v = T & 7, m = T >>> 3;
    return (h[m] | (v <= 6 ? 0 : h[m + 1] << 8)) >>> v & 3;
  }
  function Ee(h, T) {
    var v = T & 7, m = T >>> 3;
    return (h[m] | (v <= 5 ? 0 : h[m + 1] << 8)) >>> v & 7;
  }
  function Nr(h, T) {
    var v = T & 7, m = T >>> 3;
    return (h[m] | (v <= 4 ? 0 : h[m + 1] << 8)) >>> v & 15;
  }
  function Be(h, T) {
    var v = T & 7, m = T >>> 3;
    return (h[m] | (v <= 3 ? 0 : h[m + 1] << 8)) >>> v & 31;
  }
  function oe(h, T) {
    var v = T & 7, m = T >>> 3;
    return (h[m] | (v <= 1 ? 0 : h[m + 1] << 8)) >>> v & 127;
  }
  function mr(h, T, v) {
    var m = T & 7, E = T >>> 3, w = (1 << v) - 1, I = h[E] >>> m;
    return v < 8 - m || (I |= h[E + 1] << 8 - m, v < 16 - m) || (I |= h[E + 2] << 16 - m, v < 24 - m) || (I |= h[E + 3] << 24 - m), I & w;
  }
  function Sr(h, T, v) {
    var m = T & 7, E = T >>> 3;
    return m <= 5 ? h[E] |= (v & 7) << m : (h[E] |= v << m & 255, h[E + 1] = (v & 7) >> 8 - m), T + 3;
  }
  function Ur(h, T, v) {
    var m = T & 7, E = T >>> 3;
    return v = (v & 1) << m, h[E] |= v, T + 1;
  }
  function Wr(h, T, v) {
    var m = T & 7, E = T >>> 3;
    return v <<= m, h[E] |= v & 255, v >>>= 8, h[E + 1] = v, T + 8;
  }
  function Z(h, T, v) {
    var m = T & 7, E = T >>> 3;
    return v <<= m, h[E] |= v & 255, v >>>= 8, h[E + 1] = v & 255, h[E + 2] = v >>> 8, T + 16;
  }
  function y(h, T) {
    var v = h.length, m = 2 * v > T ? 2 * v : T + 5, E = 0;
    if (v >= T) return h;
    if (Se) {
      var w = I0(m);
      if (h.copy) h.copy(w);
      else for (; E < h.length; ++E) w[E] = h[E];
      return w;
    } else if (ce) {
      var I = new Uint8Array(m);
      if (I.set) I.set(h);
      else for (; E < v; ++E) I[E] = h[E];
      return I;
    }
    return h.length = m, h;
  }
  function fe(h) {
    for (var T = new Array(h), v = 0; v < h; ++v) T[v] = 0;
    return T;
  }
  function me(h, T, v) {
    var m = 1, E = 0, w = 0, I = 0, W = 0, R = h.length, N = ce ? new Uint16Array(32) : fe(32);
    for (w = 0; w < 32; ++w) N[w] = 0;
    for (w = R; w < v; ++w) h[w] = 0;
    R = h.length;
    var P = ce ? new Uint16Array(R) : fe(R);
    for (w = 0; w < R; ++w)
      N[E = h[w]]++, m < E && (m = E), P[w] = 0;
    for (N[0] = 0, w = 1; w <= m; ++w) N[w + 16] = W = W + N[w - 1] << 1;
    for (w = 0; w < R; ++w)
      W = h[w], W != 0 && (P[w] = N[W + 16]++);
    var J = 0;
    for (w = 0; w < R; ++w)
      if (J = h[w], J != 0)
        for (W = _e(P[w], m) >> m - J, I = (1 << m + 4 - J) - 1; I >= 0; --I)
          T[W | I << J] = J & 15 | w << 4;
    return m;
  }
  var Fe = ce ? new Uint16Array(512) : fe(512), pe = ce ? new Uint16Array(32) : fe(32);
  if (!ce) {
    for (var Je = 0; Je < 512; ++Je) Fe[Je] = 0;
    for (Je = 0; Je < 32; ++Je) pe[Je] = 0;
  }
  (function() {
    for (var h = [], T = 0; T < 32; T++) h.push(5);
    me(h, pe, 32);
    var v = [];
    for (T = 0; T <= 143; T++) v.push(8);
    for (; T <= 255; T++) v.push(9);
    for (; T <= 279; T++) v.push(7);
    for (; T <= 287; T++) v.push(8);
    me(v, Fe, 288);
  })();
  var Ie = /* @__PURE__ */ function() {
    for (var T = ce ? new Uint8Array(32768) : [], v = 0, m = 0; v < ue.length - 1; ++v)
      for (; m < ue[v + 1]; ++m) T[m] = v;
    for (; m < 32768; ++m) T[m] = 29;
    var E = ce ? new Uint8Array(259) : [];
    for (v = 0, m = 0; v < V.length - 1; ++v)
      for (; m < V[v + 1]; ++m) E[m] = v;
    function w(W, R) {
      for (var N = 0; N < W.length; ) {
        var P = Math.min(65535, W.length - N), J = N + P == W.length;
        for (R.write_shift(1, +J), R.write_shift(2, P), R.write_shift(2, ~P & 65535); P-- > 0; ) R[R.l++] = W[N++];
      }
      return R.l;
    }
    function I(W, R) {
      for (var N = 0, P = 0, J = ce ? new Uint16Array(32768) : []; P < W.length; ) {
        var te = (
          /* data.length - boff; */
          Math.min(65535, W.length - P)
        );
        if (te < 10) {
          for (N = Sr(R, N, +(P + te == W.length)), N & 7 && (N += 8 - (N & 7)), R.l = N / 8 | 0, R.write_shift(2, te), R.write_shift(2, ~te & 65535); te-- > 0; ) R[R.l++] = W[P++];
          N = R.l * 8;
          continue;
        }
        N = Sr(R, N, +(P + te == W.length) + 2);
        for (var le = 0; te-- > 0; ) {
          var q = W[P];
          le = (le << 5 ^ q) & 32767;
          var se = -1, ve = 0;
          if ((se = J[le]) && (se |= P & -32768, se > P && (se -= 32768), se < P))
            for (; W[se + ve] == W[P + ve] && ve < 250; ) ++ve;
          if (ve > 2) {
            q = E[ve], q <= 22 ? N = Wr(R, N, ae[q + 1] >> 1) - 1 : (Wr(R, N, 3), N += 5, Wr(R, N, ae[q - 23] >> 5), N += 3);
            var be = q < 8 ? 0 : q - 4 >> 2;
            be > 0 && (Z(R, N, ve - V[q]), N += be), q = T[P - se], N = Wr(R, N, ae[q] >> 3), N -= 3;
            var Ue = q < 4 ? 0 : q - 2 >> 1;
            Ue > 0 && (Z(R, N, P - se - ue[q]), N += Ue);
            for (var lr = 0; lr < ve; ++lr)
              J[le] = P & 32767, le = (le << 5 ^ W[P]) & 32767, ++P;
            te -= ve - 1;
          } else
            q <= 143 ? q = q + 48 : N = Ur(R, N, 1), N = Wr(R, N, ae[q]), J[le] = P & 32767, ++P;
        }
        N = Wr(R, N, 0) - 1;
      }
      return R.l = (N + 7) / 8 | 0, R.l;
    }
    return function(R, N) {
      return R.length < 8 ? w(R, N) : I(R, N);
    };
  }();
  function Xr(h) {
    var T = U(50 + Math.floor(h.length * 1.1)), v = Ie(h, T);
    return T.slice(0, v);
  }
  var sr = ce ? new Uint16Array(32768) : fe(32768), fr = ce ? new Uint16Array(32768) : fe(32768), It = ce ? new Uint16Array(128) : fe(128), Nt = 1, Pt = 1;
  function un(h, T) {
    var v = Be(h, T) + 257;
    T += 5;
    var m = Be(h, T) + 1;
    T += 5;
    var E = Nr(h, T) + 4;
    T += 4;
    for (var w = 0, I = ce ? new Uint8Array(19) : fe(19), W = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], R = 1, N = ce ? new Uint8Array(8) : fe(8), P = ce ? new Uint8Array(8) : fe(8), J = I.length, te = 0; te < E; ++te)
      I[A[te]] = w = Ee(h, T), R < w && (R = w), N[w]++, T += 3;
    var le = 0;
    for (N[0] = 0, te = 1; te <= R; ++te) P[te] = le = le + N[te - 1] << 1;
    for (te = 0; te < J; ++te) (le = I[te]) != 0 && (W[te] = P[le]++);
    var q = 0;
    for (te = 0; te < J; ++te)
      if (q = I[te], q != 0) {
        le = ae[W[te]] >> 8 - q;
        for (var se = (1 << 7 - q) - 1; se >= 0; --se) It[le | se << q] = q & 7 | te << 3;
      }
    var ve = [];
    for (R = 1; ve.length < v + m; )
      switch (le = It[oe(h, T)], T += le & 7, le >>>= 3) {
        case 16:
          for (w = 3 + je(h, T), T += 2, le = ve[ve.length - 1]; w-- > 0; ) ve.push(le);
          break;
        case 17:
          for (w = 3 + Ee(h, T), T += 3; w-- > 0; ) ve.push(0);
          break;
        case 18:
          for (w = 11 + oe(h, T), T += 7; w-- > 0; ) ve.push(0);
          break;
        default:
          ve.push(le), R < le && (R = le);
          break;
      }
    var be = ve.slice(0, v), Ue = ve.slice(v);
    for (te = v; te < 286; ++te) be[te] = 0;
    for (te = m; te < 30; ++te) Ue[te] = 0;
    return Nt = me(be, sr, 286), Pt = me(Ue, fr, 30), T;
  }
  function Lt(h, T) {
    if (h[0] == 3 && !(h[1] & 3))
      return [ct(T), 2];
    for (var v = 0, m = 0, E = I0(T || 1 << 18), w = 0, I = E.length >>> 0, W = 0, R = 0; !(m & 1); ) {
      if (m = Ee(h, v), v += 3, m >>> 1)
        m >> 1 == 1 ? (W = 9, R = 5) : (v = un(h, v), W = Nt, R = Pt);
      else {
        v & 7 && (v += 8 - (v & 7));
        var N = h[v >>> 3] | h[(v >>> 3) + 1] << 8;
        if (v += 32, N > 0)
          for (!T && I < w + N && (E = y(E, w + N), I = E.length); N-- > 0; )
            E[w++] = h[v >>> 3], v += 8;
        continue;
      }
      for (; ; ) {
        !T && I < w + 32767 && (E = y(E, w + 32767), I = E.length);
        var P = mr(h, v, W), J = m >>> 1 == 1 ? Fe[P] : sr[P];
        if (v += J & 15, J >>>= 4, !(J >>> 8 & 255)) E[w++] = J;
        else {
          if (J == 256) break;
          J -= 257;
          var te = J < 8 ? 0 : J - 4 >> 2;
          te > 5 && (te = 0);
          var le = w + V[J];
          te > 0 && (le += mr(h, v, te), v += te), P = mr(h, v, R), J = m >>> 1 == 1 ? pe[P] : fr[P], v += J & 15, J >>>= 4;
          var q = J < 4 ? 0 : J - 2 >> 1, se = ue[J];
          for (q > 0 && (se += mr(h, v, q), v += q), !T && I < le && (E = y(E, le + 100), I = E.length); w < le; )
            E[w] = E[w - se], ++w;
        }
      }
    }
    return T ? [E, v + 7 >>> 3] : [E.slice(0, w), v + 7 >>> 3];
  }
  function z(h, T) {
    var v = h.slice(h.l || 0), m = Lt(v, T);
    return h.l += m[1], m[0];
  }
  function ze(h, T) {
    if (h)
      typeof console < "u" && console.error(T);
    else throw new Error(T);
  }
  function st(h, T) {
    var v = (
      /*::(*/
      h
    );
    yr(v, 0);
    var m = [], E = [], w = {
      FileIndex: m,
      FullPaths: E
    };
    O(w, { root: T.root });
    for (var I = v.length - 4; (v[I] != 80 || v[I + 1] != 75 || v[I + 2] != 5 || v[I + 3] != 6) && I >= 0; ) --I;
    v.l = I + 4, v.l += 4;
    var W = v.read_shift(2);
    v.l += 6;
    var R = v.read_shift(4);
    for (v.l = R, I = 0; I < W; ++I) {
      v.l += 20;
      var N = v.read_shift(4), P = v.read_shift(4), J = v.read_shift(2), te = v.read_shift(2), le = v.read_shift(2);
      v.l += 8;
      var q = v.read_shift(4), se = f(
        /*::(*/
        v.slice(v.l + J, v.l + J + te)
        /*:: :any)*/
      );
      v.l += J + te + le;
      var ve = v.l;
      v.l = q + 4, Zi(v, N, P, w, se), v.l = ve;
    }
    return w;
  }
  function Zi(h, T, v, m, E) {
    h.l += 2;
    var w = h.read_shift(2), I = h.read_shift(2), W = s(h);
    if (w & 8257) throw new Error("Unsupported ZIP encryption");
    for (var R = h.read_shift(4), N = h.read_shift(4), P = h.read_shift(4), J = h.read_shift(2), te = h.read_shift(2), le = "", q = 0; q < J; ++q) le += String.fromCharCode(h[h.l++]);
    if (te) {
      var se = f(
        /*::(*/
        h.slice(h.l, h.l + te)
        /*:: :any)*/
      );
      (se[21589] || {}).mt && (W = se[21589].mt), ((E || {})[21589] || {}).mt && (W = E[21589].mt);
    }
    h.l += te;
    var ve = h.slice(h.l, h.l + N);
    switch (I) {
      case 8:
        ve = L(h, P);
        break;
      case 0:
        break;
      default:
        throw new Error("Unsupported ZIP Compression method " + I);
    }
    var be = !1;
    w & 8 && (R = h.read_shift(4), R == 134695760 && (R = h.read_shift(4), be = !0), N = h.read_shift(4), P = h.read_shift(4)), N != T && ze(be, "Bad compressed size: " + T + " != " + N), P != v && ze(be, "Bad uncompressed size: " + v + " != " + P), zn(m, le, ve, { unsafe: !0, mt: W });
  }
  function qi(h, T) {
    var v = T || {}, m = [], E = [], w = U(1), I = v.compression ? 8 : 0, W = 0, R = 0, N = 0, P = 0, J = 0, te = h.FullPaths[0], le = te, q = h.FileIndex[0], se = [], ve = 0;
    for (R = 1; R < h.FullPaths.length; ++R)
      if (le = h.FullPaths[R].slice(te.length), q = h.FileIndex[R], !(!q.size || !q.content || le == "Sh33tJ5")) {
        var be = P, Ue = U(le.length);
        for (N = 0; N < le.length; ++N) Ue.write_shift(1, le.charCodeAt(N) & 127);
        Ue = Ue.slice(0, Ue.l), se[J] = $s.buf(
          /*::((*/
          q.content,
          0
        );
        var lr = q.content;
        I == 8 && (lr = F(lr)), w = U(30), w.write_shift(4, 67324752), w.write_shift(2, 20), w.write_shift(2, W), w.write_shift(2, I), q.mt ? i(w, q.mt) : w.write_shift(4, 0), w.write_shift(-4, se[J]), w.write_shift(4, lr.length), w.write_shift(
          4,
          /*::(*/
          q.content.length
        ), w.write_shift(2, Ue.length), w.write_shift(2, 0), P += w.length, m.push(w), P += Ue.length, m.push(Ue), P += lr.length, m.push(lr), w = U(46), w.write_shift(4, 33639248), w.write_shift(2, 0), w.write_shift(2, 20), w.write_shift(2, W), w.write_shift(2, I), w.write_shift(4, 0), w.write_shift(-4, se[J]), w.write_shift(4, lr.length), w.write_shift(
          4,
          /*::(*/
          q.content.length
        ), w.write_shift(2, Ue.length), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(4, 0), w.write_shift(4, be), ve += w.l, E.push(w), ve += Ue.length, E.push(Ue), ++J;
      }
    return w = U(22), w.write_shift(4, 101010256), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(2, J), w.write_shift(2, J), w.write_shift(4, ve), w.write_shift(4, P), w.write_shift(2, 0), tr([tr(m), tr(E), w]);
  }
  var hn = {
    htm: "text/html",
    xml: "text/xml",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    mso: "application/x-mso",
    thmx: "application/vnd.ms-officetheme",
    sh33tj5: "application/octet-stream"
  };
  function Qi(h, T) {
    if (h.ctype) return h.ctype;
    var v = h.name || "", m = v.match(/\.([^\.]+)$/);
    return m && hn[m[1]] || T && (m = (v = T).match(/[\.\\]([^\.\\])+$/), m && hn[m[1]]) ? hn[m[1]] : "application/octet-stream";
  }
  function es(h) {
    for (var T = qt(h), v = [], m = 0; m < T.length; m += 76) v.push(T.slice(m, m + 76));
    return v.join(`\r
`) + `\r
`;
  }
  function rs(h) {
    var T = h.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function(N) {
      var P = N.charCodeAt(0).toString(16).toUpperCase();
      return "=" + (P.length == 1 ? "0" + P : P);
    });
    T = T.replace(/ $/mg, "=20").replace(/\t$/mg, "=09"), T.charAt(0) == `
` && (T = "=0D" + T.slice(1)), T = T.replace(/\r(?!\n)/mg, "=0D").replace(/\n\n/mg, `
=0A`).replace(/([^\r\n])\n/mg, "$1=0A");
    for (var v = [], m = T.split(`\r
`), E = 0; E < m.length; ++E) {
      var w = m[E];
      if (w.length == 0) {
        v.push("");
        continue;
      }
      for (var I = 0; I < w.length; ) {
        var W = 76, R = w.slice(I, I + W);
        R.charAt(W - 1) == "=" ? W-- : R.charAt(W - 2) == "=" ? W -= 2 : R.charAt(W - 3) == "=" && (W -= 3), R = w.slice(I, I + W), I += W, I < w.length && (R += "="), v.push(R);
      }
    }
    return v.join(`\r
`);
  }
  function ts(h) {
    for (var T = [], v = 0; v < h.length; ++v) {
      for (var m = h[v]; v <= h.length && m.charAt(m.length - 1) == "="; ) m = m.slice(0, m.length - 1) + h[++v];
      T.push(m);
    }
    for (var E = 0; E < T.length; ++E) T[E] = T[E].replace(/[=][0-9A-Fa-f]{2}/g, function(w) {
      return String.fromCharCode(parseInt(w.slice(1), 16));
    });
    return Mr(T.join(`\r
`));
  }
  function ns(h, T, v) {
    for (var m = "", E = "", w = "", I, W = 0; W < 10; ++W) {
      var R = T[W];
      if (!R || R.match(/^\s*$/)) break;
      var N = R.match(/^(.*?):\s*([^\s].*)$/);
      if (N) switch (N[1].toLowerCase()) {
        case "content-location":
          m = N[2].trim();
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
        I = Mr(Jr(T.slice(W).join("")));
        break;
      case "quoted-printable":
        I = ts(T.slice(W));
        break;
      default:
        throw new Error("Unsupported Content-Transfer-Encoding " + E);
    }
    var P = zn(h, m.slice(v.length), I, { unsafe: !0 });
    w && (P.ctype = w);
  }
  function as(h, T) {
    if (He(h.slice(0, 13)).toLowerCase() != "mime-version:") throw new Error("Unsupported MAD header");
    var v = T && T.root || "", m = (Se && Buffer.isBuffer(h) ? h.toString("binary") : He(h)).split(`\r
`), E = 0, w = "";
    for (E = 0; E < m.length; ++E)
      if (w = m[E], !!/^Content-Location:/i.test(w) && (w = w.slice(w.indexOf("file")), v || (v = w.slice(0, w.lastIndexOf("/") + 1)), w.slice(0, v.length) != v))
        for (; v.length > 0 && (v = v.slice(0, v.length - 1), v = v.slice(0, v.lastIndexOf("/") + 1), w.slice(0, v.length) != v); )
          ;
    var I = (m[1] || "").match(/boundary="(.*?)"/);
    if (!I) throw new Error("MAD cannot find boundary");
    var W = "--" + (I[1] || ""), R = [], N = [], P = {
      FileIndex: R,
      FullPaths: N
    };
    O(P);
    var J, te = 0;
    for (E = 0; E < m.length; ++E) {
      var le = m[E];
      le !== W && le !== W + "--" || (te++ && ns(P, m.slice(J, E), v), J = E);
    }
    return P;
  }
  function is(h, T) {
    var v = T || {}, m = v.boundary || "SheetJS";
    m = "------=" + m;
    for (var E = [
      "MIME-Version: 1.0",
      'Content-Type: multipart/related; boundary="' + m.slice(2) + '"',
      "",
      "",
      ""
    ], w = h.FullPaths[0], I = w, W = h.FileIndex[0], R = 1; R < h.FullPaths.length; ++R)
      if (I = h.FullPaths[R].slice(w.length), W = h.FileIndex[R], !(!W.size || !W.content || I == "Sh33tJ5")) {
        I = I.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function(ve) {
          return "_x" + ve.charCodeAt(0).toString(16) + "_";
        }).replace(/[\u0080-\uFFFF]/g, function(ve) {
          return "_u" + ve.charCodeAt(0).toString(16) + "_";
        });
        for (var N = W.content, P = Se && Buffer.isBuffer(N) ? N.toString("binary") : He(N), J = 0, te = Math.min(1024, P.length), le = 0, q = 0; q <= te; ++q) (le = P.charCodeAt(q)) >= 32 && le < 128 && ++J;
        var se = J >= te * 4 / 5;
        E.push(m), E.push("Content-Location: " + (v.root || "file:///C:/SheetJS/") + I), E.push("Content-Transfer-Encoding: " + (se ? "quoted-printable" : "base64")), E.push("Content-Type: " + Qi(W, I)), E.push(""), E.push(se ? rs(P) : es(P));
      }
    return E.push(m + `--\r
`), E.join(`\r
`);
  }
  function ss(h) {
    var T = {};
    return O(T, h), T;
  }
  function zn(h, T, v, m) {
    var E = m && m.unsafe;
    E || O(h);
    var w = !E && De.find(h, T);
    if (!w) {
      var I = h.FullPaths[0];
      T.slice(0, I.length) == I ? I = T : (I.slice(-1) != "/" && (I += "/"), I = (I + T).replace("//", "/")), w = { name: a(T), type: 2 }, h.FileIndex.push(w), h.FullPaths.push(I), E || De.utils.cfb_gc(h);
    }
    return w.content = v, w.size = v ? v.length : 0, m && (m.CLSID && (w.clsid = m.CLSID), m.mt && (w.mt = m.mt), m.ct && (w.ct = m.ct)), w;
  }
  function fs(h, T) {
    O(h);
    var v = De.find(h, T);
    if (v) {
      for (var m = 0; m < h.FileIndex.length; ++m) if (h.FileIndex[m] == v)
        return h.FileIndex.splice(m, 1), h.FullPaths.splice(m, 1), !0;
    }
    return !1;
  }
  function ls(h, T, v) {
    O(h);
    var m = De.find(h, T);
    if (m) {
      for (var E = 0; E < h.FileIndex.length; ++E) if (h.FileIndex[E] == m)
        return h.FileIndex[E].name = a(v), h.FullPaths[E] = v, !0;
    }
    return !1;
  }
  function os(h) {
    M(h, !0);
  }
  return t.find = K, t.read = re, t.parse = c, t.write = ur, t.writeFile = vr, t.utils = {
    cfb_new: ss,
    cfb_add: zn,
    cfb_del: fs,
    cfb_mov: ls,
    cfb_gc: os,
    ReadShift: Kt,
    CheckField: ja,
    prep_blob: yr,
    bconcat: tr,
    use_zlib: S,
    _deflateRaw: Xr,
    _inflateRaw: z,
    consts: de
  }, t;
}();
function zs(e) {
  return typeof e == "string" ? bn(e) : Array.isArray(e) ? gs(e) : e;
}
function sn(e, t, r) {
  if (typeof Deno < "u") {
    if (r && typeof t == "string") switch (r) {
      case "utf8":
        t = new TextEncoder(r).encode(t);
        break;
      case "binary":
        t = bn(t);
        break;
      default:
        throw new Error("Unsupported encoding " + r);
    }
    return Deno.writeFileSync(e, t);
  }
  var n = r == "utf8" ? en(t) : t;
  if (typeof IE_SaveFile < "u") return IE_SaveFile(n, e);
  if (typeof Blob < "u") {
    var a = new Blob([zs(n)], { type: "application/octet-stream" });
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
    return f.open("w"), f.encoding = "binary", Array.isArray(t) && (t = an(t)), f.write(t), f.close(), t;
  } catch (o) {
    if (!o.message || !o.message.match(/onstruct/)) throw o;
  }
  throw new Error("cannot save file " + e);
}
function ir(e) {
  for (var t = Object.keys(e), r = [], n = 0; n < t.length; ++n) Object.prototype.hasOwnProperty.call(e, t[n]) && r.push(t[n]);
  return r;
}
function W0(e, t) {
  for (var r = [], n = ir(e), a = 0; a !== n.length; ++a) r[e[n[a]][t]] == null && (r[e[n[a]][t]] = n[a]);
  return r;
}
function u0(e) {
  for (var t = [], r = ir(e), n = 0; n !== r.length; ++n) t[e[r[n]]] = r[n];
  return t;
}
function Vn(e) {
  for (var t = [], r = ir(e), n = 0; n !== r.length; ++n) t[e[r[n]]] = parseInt(r[n], 10);
  return t;
}
function Ks(e) {
  for (var t = [], r = ir(e), n = 0; n !== r.length; ++n)
    t[e[r[n]]] == null && (t[e[r[n]]] = []), t[e[r[n]]].push(r[n]);
  return t;
}
var On = /* @__PURE__ */ new Date(1899, 11, 30, 0, 0, 0);
function Er(e, t) {
  var r = /* @__PURE__ */ e.getTime(), n = /* @__PURE__ */ On.getTime() + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ On.getTimezoneOffset()) * 6e4;
  return (r - n) / (24 * 60 * 60 * 1e3);
}
var Ia = /* @__PURE__ */ new Date(), Ys = /* @__PURE__ */ On.getTime() + (/* @__PURE__ */ Ia.getTimezoneOffset() - /* @__PURE__ */ On.getTimezoneOffset()) * 6e4, V0 = /* @__PURE__ */ Ia.getTimezoneOffset();
function Na(e) {
  var t = /* @__PURE__ */ new Date();
  return t.setTime(e * 24 * 60 * 60 * 1e3 + Ys), t.getTimezoneOffset() !== V0 && t.setTime(t.getTime() + (t.getTimezoneOffset() - V0) * 6e4), t;
}
var H0 = /* @__PURE__ */ new Date("2017-02-19T19:06:09.000Z"), Pa = /* @__PURE__ */ isNaN(/* @__PURE__ */ H0.getFullYear()) ? /* @__PURE__ */ new Date("2/19/17") : H0, js = /* @__PURE__ */ Pa.getFullYear() == 2017;
function pr(e, t) {
  var r = new Date(e);
  if (js)
    return t > 0 ? r.setTime(r.getTime() + r.getTimezoneOffset() * 60 * 1e3) : t < 0 && r.setTime(r.getTime() - r.getTimezoneOffset() * 60 * 1e3), r;
  if (e instanceof Date) return e;
  if (Pa.getFullYear() == 1917 && !isNaN(r.getFullYear())) {
    var n = r.getFullYear();
    return e.indexOf("" + n) > -1 || r.setFullYear(r.getFullYear() + 100), r;
  }
  var a = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"], i = new Date(+a[0], +a[1] - 1, +a[2], +a[3] || 0, +a[4] || 0, +a[5] || 0);
  return e.indexOf("Z") > -1 && (i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3)), i;
}
function Hn(e, t) {
  if (Se && Buffer.isBuffer(e))
    return e.toString("binary");
  if (typeof TextDecoder < "u") try {
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
  for (var n = [], a = 0; a != e.length; ++a) n.push(String.fromCharCode(e[a]));
  return n.join("");
}
function wr(e) {
  if (typeof JSON < "u" && !Array.isArray(e)) return JSON.parse(JSON.stringify(e));
  if (typeof e != "object" || e == null) return e;
  if (e instanceof Date) return new Date(e.getTime());
  var t = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = wr(e[r]));
  return t;
}
function We(e, t) {
  for (var r = ""; r.length < t; ) r += e;
  return r;
}
function Yr(e) {
  var t = Number(e);
  if (!isNaN(t)) return isFinite(t) ? t : NaN;
  if (!/\d/.test(e)) return t;
  var r = 1, n = e.replace(/([\d]),([\d])/g, "$1$2").replace(/[$]/g, "").replace(/[%]/g, function() {
    return r *= 100, "";
  });
  return !isNaN(t = Number(n)) || (n = n.replace(/[(](.*)[)]/, function(a, i) {
    return r = -r, i;
  }), !isNaN(t = Number(n))) ? t / r : t;
}
var Js = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
function Qt(e) {
  var t = new Date(e), r = /* @__PURE__ */ new Date(NaN), n = t.getYear(), a = t.getMonth(), i = t.getDate();
  if (isNaN(i)) return r;
  var s = e.toLowerCase();
  if (s.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
    if (s = s.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, ""), s.length > 3 && Js.indexOf(s) == -1) return r;
  } else if (s.match(/[a-z]/)) return r;
  return n < 0 || n > 8099 ? r : (a > 0 || i > 1) && n != 101 ? t : e.match(/[^-0-9:,\/\\]/) ? r : t;
}
function ge(e, t, r) {
  if (e.FullPaths) {
    if (typeof r == "string") {
      var n;
      return Se ? n = qr(r) : n = _s(r), De.utils.cfb_add(e, t, n);
    }
    De.utils.cfb_add(e, t, r);
  } else e.file(t, r);
}
function h0() {
  return De.utils.cfb_new();
}
var $e = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`, Zs = {
  "&quot;": '"',
  "&apos;": "'",
  "&gt;": ">",
  "&lt;": "<",
  "&amp;": "&"
}, x0 = /* @__PURE__ */ u0(Zs), d0 = /[&<>'"]/g, qs = /[\u0000-\u0008\u000b-\u001f]/g;
function Oe(e) {
  var t = e + "";
  return t.replace(d0, function(r) {
    return x0[r];
  }).replace(qs, function(r) {
    return "_x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + "_";
  });
}
function G0(e) {
  return Oe(e).replace(/ /g, "_x0020_");
}
var La = /[\u0000-\u001f]/g;
function Qs(e) {
  var t = e + "";
  return t.replace(d0, function(r) {
    return x0[r];
  }).replace(/\n/g, "<br/>").replace(La, function(r) {
    return "&#x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + ";";
  });
}
function ef(e) {
  var t = e + "";
  return t.replace(d0, function(r) {
    return x0[r];
  }).replace(La, function(r) {
    return "&#x" + r.charCodeAt(0).toString(16).toUpperCase() + ";";
  });
}
function rf(e) {
  return e.replace(/(\r\n|[\r\n])/g, "&#10;");
}
function tf(e) {
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
function Jn(e) {
  for (var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, f = 0; r < e.length; ) {
    if (n = e.charCodeAt(r++), n < 128) {
      t += String.fromCharCode(n);
      continue;
    }
    if (a = e.charCodeAt(r++), n > 191 && n < 224) {
      s = (n & 31) << 6, s |= a & 63, t += String.fromCharCode(s);
      continue;
    }
    if (i = e.charCodeAt(r++), n < 240) {
      t += String.fromCharCode((n & 15) << 12 | (a & 63) << 6 | i & 63);
      continue;
    }
    s = e.charCodeAt(r++), f = ((n & 7) << 18 | (a & 63) << 12 | (i & 63) << 6 | s & 63) - 65536, t += String.fromCharCode(55296 + (f >>> 10 & 1023)), t += String.fromCharCode(56320 + (f & 1023));
  }
  return t;
}
function X0(e) {
  var t = ct(2 * e.length), r, n, a = 1, i = 0, s = 0, f;
  for (n = 0; n < e.length; n += a)
    a = 1, (f = e.charCodeAt(n)) < 128 ? r = f : f < 224 ? (r = (f & 31) * 64 + (e.charCodeAt(n + 1) & 63), a = 2) : f < 240 ? (r = (f & 15) * 4096 + (e.charCodeAt(n + 1) & 63) * 64 + (e.charCodeAt(n + 2) & 63), a = 3) : (a = 4, r = (f & 7) * 262144 + (e.charCodeAt(n + 1) & 63) * 4096 + (e.charCodeAt(n + 2) & 63) * 64 + (e.charCodeAt(n + 3) & 63), r -= 65536, s = 55296 + (r >>> 10 & 1023), r = 56320 + (r & 1023)), s !== 0 && (t[i++] = s & 255, t[i++] = s >>> 8, s = 0), t[i++] = r % 256, t[i++] = r >>> 8;
  return t.slice(0, i).toString("ucs2");
}
function $0(e) {
  return qr(e, "binary").toString("utf8");
}
var gn = "foo bar bazâð£", zt = Se && (/* @__PURE__ */ $0(gn) == /* @__PURE__ */ Jn(gn) && $0 || /* @__PURE__ */ X0(gn) == /* @__PURE__ */ Jn(gn) && X0) || Jn, en = Se ? function(e) {
  return qr(e, "utf8").toString("binary");
} : function(e) {
  for (var t = [], r = 0, n = 0, a = 0; r < e.length; )
    switch (n = e.charCodeAt(r++), !0) {
      case n < 128:
        t.push(String.fromCharCode(n));
        break;
      case n < 2048:
        t.push(String.fromCharCode(192 + (n >> 6))), t.push(String.fromCharCode(128 + (n & 63)));
        break;
      case (n >= 55296 && n < 57344):
        n -= 55296, a = e.charCodeAt(r++) - 56320 + (n << 10), t.push(String.fromCharCode(240 + (a >> 18 & 7))), t.push(String.fromCharCode(144 + (a >> 12 & 63))), t.push(String.fromCharCode(128 + (a >> 6 & 63))), t.push(String.fromCharCode(128 + (a & 63)));
        break;
      default:
        t.push(String.fromCharCode(224 + (n >> 12))), t.push(String.fromCharCode(128 + (n >> 6 & 63))), t.push(String.fromCharCode(128 + (n & 63)));
    }
  return t.join("");
}, nf = /* @__PURE__ */ function() {
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
    for (var n = r.replace(/^[\t\n\r ]+/, "").replace(/[\t\n\r ]+$/, "").replace(/>\s+/g, ">").replace(/\s+</g, "<").replace(/[\t\n\r ]+/g, " ").replace(/<\s*[bB][rR]\s*\/?>/g, `
`).replace(/<[^>]*>/g, ""), a = 0; a < e.length; ++a) n = n.replace(e[a][0], e[a][1]);
    return n;
  };
}(), Ma = /(^\s|\s$|\n)/;
function nr(e, t) {
  return "<" + e + (t.match(Ma) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e + ">";
}
function rn(e) {
  return ir(e).map(function(t) {
    return " " + t + '="' + e[t] + '"';
  }).join("");
}
function Q(e, t, r) {
  return "<" + e + (r != null ? rn(r) : "") + (t != null ? (t.match(Ma) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e : "/") + ">";
}
function i0(e, t) {
  try {
    return e.toISOString().replace(/\.\d*/, "");
  } catch (r) {
    if (t) throw r;
  }
  return "";
}
function af(e, t) {
  switch (typeof e) {
    case "string":
      var r = Q("vt:lpwstr", Oe(e));
      return r = r.replace(/&quot;/g, "_x0022_"), r;
    case "number":
      return Q((e | 0) == e ? "vt:i4" : "vt:r8", Oe(String(e)));
    case "boolean":
      return Q("vt:bool", e ? "true" : "false");
  }
  if (e instanceof Date) return Q("vt:filetime", i0(e));
  throw new Error("Unable to serialize " + e);
}
var Ze = {
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
}, Ot = [
  "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  "http://purl.oclc.org/ooxml/spreadsheetml/main",
  "http://schemas.microsoft.com/office/excel/2006/main",
  "http://schemas.microsoft.com/office/excel/2006/2"
], Cr = {
  o: "urn:schemas-microsoft-com:office:office",
  x: "urn:schemas-microsoft-com:office:excel",
  ss: "urn:schemas-microsoft-com:office:spreadsheet",
  dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
  mv: "http://macVmlSchemaUri",
  v: "urn:schemas-microsoft-com:vml",
  html: "http://www.w3.org/TR/REC-html40"
};
function sf(e, t) {
  for (var r = 1 - 2 * (e[t + 7] >>> 7), n = ((e[t + 7] & 127) << 4) + (e[t + 6] >>> 4 & 15), a = e[t + 6] & 15, i = 5; i >= 0; --i) a = a * 256 + e[t + i];
  return n == 2047 ? a == 0 ? r * (1 / 0) : NaN : (n == 0 ? n = -1022 : (n -= 1023, a += Math.pow(2, 52)), r * Math.pow(2, n - 52) * a);
}
function ff(e, t, r) {
  var n = (t < 0 || 1 / t == -1 / 0 ? 1 : 0) << 7, a = 0, i = 0, s = n ? -t : t;
  isFinite(s) ? s == 0 ? a = i = 0 : (a = Math.floor(Math.log(s) / Math.LN2), i = s * Math.pow(2, 52 - a), a <= -1023 && (!isFinite(i) || i < Math.pow(2, 52)) ? a = -1022 : (i -= Math.pow(2, 52), a += 1023)) : (a = 2047, i = isNaN(t) ? 26985 : 0);
  for (var f = 0; f <= 5; ++f, i /= 256) e[r + f] = i & 255;
  e[r + 6] = (a & 15) << 4 | i & 15, e[r + 7] = a >> 4 | n;
}
var z0 = function(e) {
  for (var t = [], r = 10240, n = 0; n < e[0].length; ++n) if (e[0][n]) for (var a = 0, i = e[0][n].length; a < i; a += r) t.push.apply(t, e[0][n].slice(a, a + r));
  return t;
}, K0 = Se ? function(e) {
  return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0].map(function(t) {
    return Buffer.isBuffer(t) ? t : qr(t);
  })) : z0(e);
} : z0, Y0 = function(e, t, r) {
  for (var n = [], a = t; a < r; a += 2) n.push(String.fromCharCode(Xt(e, a)));
  return n.join("").replace($t, "");
}, p0 = Se ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("utf16le", t, r).replace($t, "") : Y0(e, t, r);
} : Y0, j0 = function(e, t, r) {
  for (var n = [], a = t; a < t + r; ++a) n.push(("0" + e[a].toString(16)).slice(-2));
  return n.join("");
}, Ba = Se ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("hex", t, t + r) : j0(e, t, r);
} : j0, J0 = function(e, t, r) {
  for (var n = [], a = t; a < r; a++) n.push(String.fromCharCode(Et(e, a)));
  return n.join("");
}, fn = Se ? function(t, r, n) {
  return Buffer.isBuffer(t) ? t.toString("utf8", r, n) : J0(t, r, n);
} : J0, ba = function(e, t) {
  var r = Or(e, t);
  return r > 0 ? fn(e, t + 4, t + 4 + r - 1) : "";
}, Ua = ba, Wa = function(e, t) {
  var r = Or(e, t);
  return r > 0 ? fn(e, t + 4, t + 4 + r - 1) : "";
}, Va = Wa, Ha = function(e, t) {
  var r = 2 * Or(e, t);
  return r > 0 ? fn(e, t + 4, t + 4 + r - 1) : "";
}, Ga = Ha, Xa = function(t, r) {
  var n = Or(t, r);
  return n > 0 ? p0(t, r + 4, r + 4 + n) : "";
}, $a = Xa, za = function(e, t) {
  var r = Or(e, t);
  return r > 0 ? fn(e, t + 4, t + 4 + r) : "";
}, Ka = za, Ya = function(e, t) {
  return sf(e, t);
}, kn = Ya, v0 = function(t) {
  return Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
};
Se && (Ua = function(t, r) {
  if (!Buffer.isBuffer(t)) return ba(t, r);
  var n = t.readUInt32LE(r);
  return n > 0 ? t.toString("utf8", r + 4, r + 4 + n - 1) : "";
}, Va = function(t, r) {
  if (!Buffer.isBuffer(t)) return Wa(t, r);
  var n = t.readUInt32LE(r);
  return n > 0 ? t.toString("utf8", r + 4, r + 4 + n - 1) : "";
}, Ga = function(t, r) {
  if (!Buffer.isBuffer(t)) return Ha(t, r);
  var n = 2 * t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + n - 1);
}, $a = function(t, r) {
  if (!Buffer.isBuffer(t)) return Xa(t, r);
  var n = t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + n);
}, Ka = function(t, r) {
  if (!Buffer.isBuffer(t)) return za(t, r);
  var n = t.readUInt32LE(r);
  return t.toString("utf8", r + 4, r + 4 + n);
}, kn = function(t, r) {
  return Buffer.isBuffer(t) ? t.readDoubleLE(r) : Ya(t, r);
}, v0 = function(t) {
  return Buffer.isBuffer(t) || Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
});
var Et = function(e, t) {
  return e[t];
}, Xt = function(e, t) {
  return e[t + 1] * 256 + e[t];
}, lf = function(e, t) {
  var r = e[t + 1] * 256 + e[t];
  return r < 32768 ? r : (65535 - r + 1) * -1;
}, Or = function(e, t) {
  return e[t + 3] * (1 << 24) + (e[t + 2] << 16) + (e[t + 1] << 8) + e[t];
}, lt = function(e, t) {
  return e[t + 3] << 24 | e[t + 2] << 16 | e[t + 1] << 8 | e[t];
}, of = function(e, t) {
  return e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3];
};
function Kt(e, t) {
  var r = "", n, a, i = [], s, f, o, l;
  switch (t) {
    case "dbcs":
      if (l = this.l, Se && Buffer.isBuffer(this)) r = this.slice(this.l, this.l + 2 * e).toString("utf16le");
      else for (o = 0; o < e; ++o)
        r += String.fromCharCode(Xt(this, l)), l += 2;
      e *= 2;
      break;
    case "utf8":
      r = fn(this, this.l, this.l + e);
      break;
    case "utf16le":
      e *= 2, r = p0(this, this.l, this.l + e);
      break;
    case "wstr":
      return Kt.call(this, e, "dbcs");
    case "lpstr-ansi":
      r = Ua(this, this.l), e = 4 + Or(this, this.l);
      break;
    case "lpstr-cp":
      r = Va(this, this.l), e = 4 + Or(this, this.l);
      break;
    case "lpwstr":
      r = Ga(this, this.l), e = 4 + 2 * Or(this, this.l);
      break;
    case "lpp4":
      e = 4 + Or(this, this.l), r = $a(this, this.l), e & 2 && (e += 2);
      break;
    case "8lpp4":
      e = 4 + Or(this, this.l), r = Ka(this, this.l), e & 3 && (e += 4 - (e & 3));
      break;
    case "cstr":
      for (e = 0, r = ""; (s = Et(this, this.l + e++)) !== 0; ) i.push(pn(s));
      r = i.join("");
      break;
    case "_wstr":
      for (e = 0, r = ""; (s = Xt(this, this.l + e)) !== 0; )
        i.push(pn(s)), e += 2;
      e += 2, r = i.join("");
      break;
    case "dbcs-cont":
      for (r = "", l = this.l, o = 0; o < e; ++o) {
        if (this.lens && this.lens.indexOf(l) !== -1)
          return s = Et(this, l), this.l = l + 1, f = Kt.call(this, e - o, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(pn(Xt(this, l))), l += 2;
      }
      r = i.join(""), e *= 2;
      break;
    case "cpstr":
    case "sbcs-cont":
      for (r = "", l = this.l, o = 0; o != e; ++o) {
        if (this.lens && this.lens.indexOf(l) !== -1)
          return s = Et(this, l), this.l = l + 1, f = Kt.call(this, e - o, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(pn(Et(this, l))), l += 1;
      }
      r = i.join("");
      break;
    default:
      switch (e) {
        case 1:
          return n = Et(this, this.l), this.l++, n;
        case 2:
          return n = (t === "i" ? lf : Xt)(this, this.l), this.l += 2, n;
        case 4:
        case -4:
          return t === "i" || !(this[this.l + 3] & 128) ? (n = (e > 0 ? lt : of)(this, this.l), this.l += 4, n) : (a = Or(this, this.l), this.l += 4, a);
        case 8:
        case -8:
          if (t === "f")
            return e == 8 ? a = kn(this, this.l) : a = kn([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0), this.l += 8, a;
          e = 8;
        case 16:
          r = Ba(this, this.l, e);
          break;
      }
  }
  return this.l += e, r;
}
var cf = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255, e[r + 2] = t >>> 16 & 255, e[r + 3] = t >>> 24 & 255;
}, uf = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >> 8 & 255, e[r + 2] = t >> 16 & 255, e[r + 3] = t >> 24 & 255;
}, hf = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255;
};
function xf(e, t, r) {
  var n = 0, a = 0;
  if (r === "dbcs") {
    for (a = 0; a != t.length; ++a) hf(this, t.charCodeAt(a), this.l + 2 * a);
    n = 2 * t.length;
  } else if (r === "sbcs") {
    for (t = t.replace(/[^\x00-\x7F]/g, "_"), a = 0; a != t.length; ++a) this[this.l + a] = t.charCodeAt(a) & 255;
    n = t.length;
  } else if (r === "hex") {
    for (; a < e; ++a)
      this[this.l++] = parseInt(t.slice(2 * a, 2 * a + 2), 16) || 0;
    return this;
  } else if (r === "utf16le") {
    var i = Math.min(this.l + e, this.length);
    for (a = 0; a < Math.min(t.length, e); ++a) {
      var s = t.charCodeAt(a);
      this[this.l++] = s & 255, this[this.l++] = s >> 8;
    }
    for (; this.l < i; ) this[this.l++] = 0;
    return this;
  } else switch (e) {
    case 1:
      n = 1, this[this.l] = t & 255;
      break;
    case 2:
      n = 2, this[this.l] = t & 255, t >>>= 8, this[this.l + 1] = t & 255;
      break;
    case 3:
      n = 3, this[this.l] = t & 255, t >>>= 8, this[this.l + 1] = t & 255, t >>>= 8, this[this.l + 2] = t & 255;
      break;
    case 4:
      n = 4, cf(this, t, this.l);
      break;
    case 8:
      if (n = 8, r === "f") {
        ff(this, t, this.l);
        break;
      }
    case 16:
      break;
    case -4:
      n = 4, uf(this, t, this.l);
      break;
  }
  return this.l += n, this;
}
function ja(e, t) {
  var r = Ba(this, this.l, e.length >> 1);
  if (r !== e) throw new Error(t + "Expected " + e + " saw " + r);
  this.l += e.length >> 1;
}
function yr(e, t) {
  e.l = t, e.read_shift = /*::(*/
  Kt, e.chk = ja, e.write_shift = xf;
}
function Gr(e, t) {
  e.l += t;
}
function U(e) {
  var t = ct(e);
  return yr(t, 0), t;
}
function Tr() {
  var e = [], t = Se ? 256 : 2048, r = function(l) {
    var c = U(l);
    return yr(c, 0), c;
  }, n = r(t), a = function() {
    n && (n.length > n.l && (n = n.slice(0, n.l), n.l = n.length), n.length > 0 && e.push(n), n = null);
  }, i = function(l) {
    return n && l < n.length - n.l ? n : (a(), n = r(Math.max(l + 1, t)));
  }, s = function() {
    return a(), tr(e);
  }, f = function(l) {
    a(), n = l, n.l == null && (n.l = n.length), i(t);
  };
  return { next: i, push: f, end: s, _bufs: e };
}
function H(e, t, r, n) {
  var a = +t, i;
  if (!isNaN(a)) {
    n || (n = fh[a].p || (r || []).length || 0), i = 1 + (a >= 128 ? 1 : 0) + 1, n >= 128 && ++i, n >= 16384 && ++i, n >= 2097152 && ++i;
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
    n > 0 && v0(r) && e.push(r);
  }
}
function Yt(e, t, r) {
  var n = wr(e);
  if (t.s ? (n.cRel && (n.c += t.s.c), n.rRel && (n.r += t.s.r)) : (n.cRel && (n.c += t.c), n.rRel && (n.r += t.r)), !r || r.biff < 12) {
    for (; n.c >= 256; ) n.c -= 256;
    for (; n.r >= 65536; ) n.r -= 65536;
  }
  return n;
}
function Z0(e, t, r) {
  var n = wr(e);
  return n.s = Yt(n.s, t.s, r), n.e = Yt(n.e, t.s, r), n;
}
function jt(e, t) {
  if (e.cRel && e.c < 0)
    for (e = wr(e); e.c < 0; ) e.c += t > 8 ? 16384 : 256;
  if (e.rRel && e.r < 0)
    for (e = wr(e); e.r < 0; ) e.r += t > 8 ? 1048576 : t > 5 ? 65536 : 16384;
  var r = ke(e);
  return !e.cRel && e.cRel != null && (r = vf(r)), !e.rRel && e.rRel != null && (r = df(r)), r;
}
function Zn(e, t) {
  return e.s.r == 0 && !e.s.rRel && e.e.r == (t.biff >= 12 ? 1048575 : t.biff >= 8 ? 65536 : 16384) && !e.e.rRel ? (e.s.cRel ? "" : "$") + or(e.s.c) + ":" + (e.e.cRel ? "" : "$") + or(e.e.c) : e.s.c == 0 && !e.s.cRel && e.e.c == (t.biff >= 12 ? 16383 : 255) && !e.e.cRel ? (e.s.rRel ? "" : "$") + ar(e.s.r) + ":" + (e.e.rRel ? "" : "$") + ar(e.e.r) : jt(e.s, t.biff) + ":" + jt(e.e, t.biff);
}
function m0(e) {
  return parseInt(pf(e), 10) - 1;
}
function ar(e) {
  return "" + (e + 1);
}
function df(e) {
  return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2");
}
function pf(e) {
  return e.replace(/\$(\d+)$/, "$1");
}
function g0(e) {
  for (var t = mf(e), r = 0, n = 0; n !== t.length; ++n) r = 26 * r + t.charCodeAt(n) - 64;
  return r - 1;
}
function or(e) {
  if (e < 0) throw new Error("invalid column " + e);
  var t = "";
  for (++e; e; e = Math.floor((e - 1) / 26)) t = String.fromCharCode((e - 1) % 26 + 65) + t;
  return t;
}
function vf(e) {
  return e.replace(/^([A-Z])/, "$$$1");
}
function mf(e) {
  return e.replace(/^\$([A-Z])/, "$1");
}
function gf(e) {
  return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",");
}
function qe(e) {
  for (var t = 0, r = 0, n = 0; n < e.length; ++n) {
    var a = e.charCodeAt(n);
    a >= 48 && a <= 57 ? t = 10 * t + (a - 48) : a >= 65 && a <= 90 && (r = 26 * r + (a - 64));
  }
  return { c: r - 1, r: t - 1 };
}
function ke(e) {
  for (var t = e.c + 1, r = ""; t; t = (t - 1) / 26 | 0) r = String.fromCharCode((t - 1) % 26 + 65) + r;
  return r + (e.r + 1);
}
function kr(e) {
  var t = e.indexOf(":");
  return t == -1 ? { s: qe(e), e: qe(e) } : { s: qe(e.slice(0, t)), e: qe(e.slice(t + 1)) };
}
function Xe(e, t) {
  return typeof t > "u" || typeof t == "number" ? Xe(e.s, e.e) : (typeof e != "string" && (e = ke(e)), typeof t != "string" && (t = ke(t)), e == t ? e : e + ":" + t);
}
function Me(e) {
  var t = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } }, r = 0, n = 0, a = 0, i = e.length;
  for (r = 0; n < i && !((a = e.charCodeAt(n) - 64) < 1 || a > 26); ++n)
    r = 26 * r + a;
  for (t.s.c = --r, r = 0; n < i && !((a = e.charCodeAt(n) - 48) < 0 || a > 9); ++n)
    r = 10 * r + a;
  if (t.s.r = --r, n === i || a != 10)
    return t.e.c = t.s.c, t.e.r = t.s.r, t;
  for (++n, r = 0; n != i && !((a = e.charCodeAt(n) - 64) < 1 || a > 26); ++n)
    r = 26 * r + a;
  for (t.e.c = --r, r = 0; n != i && !((a = e.charCodeAt(n) - 48) < 0 || a > 9); ++n)
    r = 10 * r + a;
  return t.e.r = --r, t;
}
function q0(e, t) {
  var r = e.t == "d" && t instanceof Date;
  if (e.z != null) try {
    return e.w = tt(e.z, r ? Er(t) : t);
  } catch {
  }
  try {
    return e.w = tt((e.XF || {}).numFmtId || (r ? 14 : 0), r ? Er(t) : t);
  } catch {
    return "" + t;
  }
}
function Zr(e, t, r) {
  return e == null || e.t == null || e.t == "z" ? "" : e.w !== void 0 ? e.w : (e.t == "d" && !e.z && r && r.dateNF && (e.z = r.dateNF), e.t == "e" ? ln[e.v] || e.v : t == null ? q0(e, e.v) : q0(e, t));
}
function xt(e, t) {
  var r = t && t.sheet ? t.sheet : "Sheet1", n = {};
  return n[r] = e, { SheetNames: [r], Sheets: n };
}
function Ja(e, t, r) {
  var n = r || {}, a = e ? Array.isArray(e) : n.dense, i = e || (a ? [] : {}), s = 0, f = 0;
  if (i && n.origin != null) {
    if (typeof n.origin == "number") s = n.origin;
    else {
      var o = typeof n.origin == "string" ? qe(n.origin) : n.origin;
      s = o.r, f = o.c;
    }
    i["!ref"] || (i["!ref"] = "A1:A1");
  }
  var l = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } };
  if (i["!ref"]) {
    var c = Me(i["!ref"]);
    l.s.c = c.s.c, l.s.r = c.s.r, l.e.c = Math.max(l.e.c, c.e.c), l.e.r = Math.max(l.e.r, c.e.r), s == -1 && (l.e.r = s = c.e.r + 1);
  }
  for (var d = 0; d != t.length; ++d)
    if (t[d]) {
      if (!Array.isArray(t[d])) throw new Error("aoa_to_sheet expects an array of arrays");
      for (var x = 0; x != t[d].length; ++x)
        if (!(typeof t[d][x] > "u")) {
          var p = { v: t[d][x] }, g = s + d, u = f + x;
          if (l.s.r > g && (l.s.r = g), l.s.c > u && (l.s.c = u), l.e.r < g && (l.e.r = g), l.e.c < u && (l.e.c = u), t[d][x] && typeof t[d][x] == "object" && !Array.isArray(t[d][x]) && !(t[d][x] instanceof Date)) p = t[d][x];
          else if (Array.isArray(p.v) && (p.f = t[d][x][1], p.v = p.v[0]), p.v === null)
            if (p.f) p.t = "n";
            else if (n.nullError)
              p.t = "e", p.v = 0;
            else if (n.sheetStubs) p.t = "z";
            else continue;
          else typeof p.v == "number" ? p.t = "n" : typeof p.v == "boolean" ? p.t = "b" : p.v instanceof Date ? (p.z = n.dateNF || Ve[14], n.cellDates ? (p.t = "d", p.w = tt(p.z, Er(p.v))) : (p.t = "n", p.v = Er(p.v), p.w = tt(p.z, p.v))) : p.t = "s";
          if (a)
            i[g] || (i[g] = []), i[g][u] && i[g][u].z && (p.z = i[g][u].z), i[g][u] = p;
          else {
            var _ = ke({ c: u, r: g });
            i[_] && i[_].z && (p.z = i[_].z), i[_] = p;
          }
        }
    }
  return l.s.c < 1e7 && (i["!ref"] = Xe(l)), i;
}
function kt(e, t) {
  return Ja(null, e, t);
}
function _f(e) {
  return e.read_shift(4, "i");
}
function br(e, t) {
  return t || (t = U(4)), t.write_shift(4, e), t;
}
function cr(e) {
  var t = e.read_shift(4);
  return t === 0 ? "" : e.read_shift(t, "dbcs");
}
function Qe(e, t) {
  var r = !1;
  return t == null && (r = !0, t = U(4 + 2 * e.length)), t.write_shift(4, e.length), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
function Tf(e) {
  return { ich: e.read_shift(2), ifnt: e.read_shift(2) };
}
function Ef(e, t) {
  return t || (t = U(4)), t.write_shift(2, 0), t.write_shift(2, 0), t;
}
function _0(e, t) {
  var r = e.l, n = e.read_shift(1), a = cr(e), i = [], s = { t: a, h: a };
  if (n & 1) {
    for (var f = e.read_shift(4), o = 0; o != f; ++o) i.push(Tf(e));
    s.r = i;
  } else s.r = [{ ich: 0, ifnt: 0 }];
  return e.l = r + t, s;
}
function wf(e, t) {
  var r = !1;
  return t == null && (r = !0, t = U(15 + 4 * e.t.length)), t.write_shift(1, 0), Qe(e.t, t), r ? t.slice(0, t.l) : t;
}
var Sf = _0;
function Af(e, t) {
  var r = !1;
  return t == null && (r = !0, t = U(23 + 4 * e.t.length)), t.write_shift(1, 1), Qe(e.t, t), t.write_shift(4, 1), Ef({}, t), r ? t.slice(0, t.l) : t;
}
function Ir(e) {
  var t = e.read_shift(4), r = e.read_shift(2);
  return r += e.read_shift(1) << 16, e.l++, { c: t, iStyleRef: r };
}
function dt(e, t) {
  return t == null && (t = U(8)), t.write_shift(-4, e.c), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
function pt(e) {
  var t = e.read_shift(2);
  return t += e.read_shift(1) << 16, e.l++, { c: -1, iStyleRef: t };
}
function vt(e, t) {
  return t == null && (t = U(4)), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
var Ff = cr, Za = Qe;
function T0(e) {
  var t = e.read_shift(4);
  return t === 0 || t === 4294967295 ? "" : e.read_shift(t, "dbcs");
}
function Dn(e, t) {
  var r = !1;
  return t == null && (r = !0, t = U(127)), t.write_shift(4, e.length > 0 ? e.length : 4294967295), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
var yf = cr, s0 = T0, E0 = Dn;
function qa(e) {
  var t = e.slice(e.l, e.l + 4), r = t[0] & 1, n = t[0] & 2;
  e.l += 4;
  var a = n === 0 ? kn([0, 0, 0, 0, t[0] & 252, t[1], t[2], t[3]], 0) : lt(t, 0) >> 2;
  return r ? a / 100 : a;
}
function Qa(e, t) {
  t == null && (t = U(4));
  var r = 0, n = 0, a = e * 100;
  if (e == (e | 0) && e >= -536870912 && e < 1 << 29 ? n = 1 : a == (a | 0) && a >= -536870912 && a < 1 << 29 && (n = 1, r = 1), n) t.write_shift(-4, ((r ? a : e) << 2) + (r + 2));
  else throw new Error("unsupported RkNumber " + e);
}
function ei(e) {
  var t = { s: {}, e: {} };
  return t.s.r = e.read_shift(4), t.e.r = e.read_shift(4), t.s.c = e.read_shift(4), t.e.c = e.read_shift(4), t;
}
function Cf(e, t) {
  return t || (t = U(16)), t.write_shift(4, e.s.r), t.write_shift(4, e.e.r), t.write_shift(4, e.s.c), t.write_shift(4, e.e.c), t;
}
var mt = ei, Dt = Cf;
function Rt(e) {
  if (e.length - e.l < 8) throw "XLS Xnum Buffer underflow";
  return e.read_shift(8, "f");
}
function ut(e, t) {
  return (t || U(8)).write_shift(8, e, "f");
}
function Of(e) {
  var t = {}, r = e.read_shift(1), n = r >>> 1, a = e.read_shift(1), i = e.read_shift(2, "i"), s = e.read_shift(1), f = e.read_shift(1), o = e.read_shift(1);
  switch (e.l++, n) {
    case 0:
      t.auto = 1;
      break;
    case 1:
      t.index = a;
      var l = Bf[a];
      l && (t.rgb = oa(l));
      break;
    case 2:
      t.rgb = oa([s, f, o]);
      break;
    case 3:
      t.theme = a;
      break;
  }
  return i != 0 && (t.tint = i > 0 ? i / 32767 : i / 32768), t;
}
function Rn(e, t) {
  if (t || (t = U(8)), !e || e.auto)
    return t.write_shift(4, 0), t.write_shift(4, 0), t;
  e.index != null ? (t.write_shift(1, 2), t.write_shift(1, e.index)) : e.theme != null ? (t.write_shift(1, 6), t.write_shift(1, e.theme)) : (t.write_shift(1, 5), t.write_shift(1, 0));
  var r = e.tint || 0;
  if (r > 0 ? r *= 32767 : r < 0 && (r *= 32768), t.write_shift(2, r), !e.rgb || e.theme != null)
    t.write_shift(2, 0), t.write_shift(1, 0), t.write_shift(1, 0);
  else {
    var n = e.rgb || "FFFFFF";
    typeof n == "number" && (n = ("000000" + n.toString(16)).slice(-6)), t.write_shift(1, parseInt(n.slice(0, 2), 16)), t.write_shift(1, parseInt(n.slice(2, 4), 16)), t.write_shift(1, parseInt(n.slice(4, 6), 16)), t.write_shift(1, 255);
  }
  return t;
}
function kf(e) {
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
function Df(e, t) {
  t || (t = U(2));
  var r = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 : 0);
  return t.write_shift(1, r), t.write_shift(1, 0), t;
}
var ri = 2, Fr = 3, _n = 11, In = 19, Tn = 64, Rf = 65, If = 71, Nf = 4108, Pf = 4126, rr = 80, Q0 = {
  /*::[*/
  1: { n: "CodePage", t: ri },
  /*::[*/
  2: { n: "Category", t: rr },
  /*::[*/
  3: { n: "PresentationFormat", t: rr },
  /*::[*/
  4: { n: "ByteCount", t: Fr },
  /*::[*/
  5: { n: "LineCount", t: Fr },
  /*::[*/
  6: { n: "ParagraphCount", t: Fr },
  /*::[*/
  7: { n: "SlideCount", t: Fr },
  /*::[*/
  8: { n: "NoteCount", t: Fr },
  /*::[*/
  9: { n: "HiddenCount", t: Fr },
  /*::[*/
  10: { n: "MultimediaClipCount", t: Fr },
  /*::[*/
  11: { n: "ScaleCrop", t: _n },
  /*::[*/
  12: {
    n: "HeadingPairs",
    t: Nf
    /* VT_VECTOR | VT_VARIANT */
  },
  /*::[*/
  13: {
    n: "TitlesOfParts",
    t: Pf
    /* VT_VECTOR | VT_LPSTR */
  },
  /*::[*/
  14: { n: "Manager", t: rr },
  /*::[*/
  15: { n: "Company", t: rr },
  /*::[*/
  16: { n: "LinksUpToDate", t: _n },
  /*::[*/
  17: { n: "CharacterCount", t: Fr },
  /*::[*/
  19: { n: "SharedDoc", t: _n },
  /*::[*/
  22: { n: "HyperlinksChanged", t: _n },
  /*::[*/
  23: { n: "AppVersion", t: Fr, p: "version" },
  /*::[*/
  24: { n: "DigSig", t: Rf },
  /*::[*/
  26: { n: "ContentType", t: rr },
  /*::[*/
  27: { n: "ContentStatus", t: rr },
  /*::[*/
  28: { n: "Language", t: rr },
  /*::[*/
  29: { n: "Version", t: rr },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: In },
  /*::[*/
  2147483651: { n: "Behavior", t: In },
  /*::[*/
  1919054434: {}
}, ea = {
  /*::[*/
  1: { n: "CodePage", t: ri },
  /*::[*/
  2: { n: "Title", t: rr },
  /*::[*/
  3: { n: "Subject", t: rr },
  /*::[*/
  4: { n: "Author", t: rr },
  /*::[*/
  5: { n: "Keywords", t: rr },
  /*::[*/
  6: { n: "Comments", t: rr },
  /*::[*/
  7: { n: "Template", t: rr },
  /*::[*/
  8: { n: "LastAuthor", t: rr },
  /*::[*/
  9: { n: "RevNumber", t: rr },
  /*::[*/
  10: { n: "EditTime", t: Tn },
  /*::[*/
  11: { n: "LastPrinted", t: Tn },
  /*::[*/
  12: { n: "CreatedDate", t: Tn },
  /*::[*/
  13: { n: "ModifiedDate", t: Tn },
  /*::[*/
  14: { n: "PageCount", t: Fr },
  /*::[*/
  15: { n: "WordCount", t: Fr },
  /*::[*/
  16: { n: "CharCount", t: Fr },
  /*::[*/
  17: { n: "Thumbnail", t: If },
  /*::[*/
  18: { n: "Application", t: rr },
  /*::[*/
  19: { n: "DocSecurity", t: Fr },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: In },
  /*::[*/
  2147483651: { n: "Behavior", t: In },
  /*::[*/
  1919054434: {}
};
function Lf(e) {
  return e.map(function(t) {
    return [t >> 16 & 255, t >> 8 & 255, t & 255];
  });
}
var Mf = /* @__PURE__ */ Lf([
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
]), Bf = /* @__PURE__ */ wr(Mf), ln = {
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
}, bf = {
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
}, En = {
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
function ti() {
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
function ni(e, t) {
  var r = Ks(bf), n = [], a;
  n[n.length] = $e, n[n.length] = Q("Types", null, {
    xmlns: Ze.CT,
    "xmlns:xsd": Ze.xsd,
    "xmlns:xsi": Ze.xsi
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
  ].map(function(o) {
    return Q("Default", null, { Extension: o[0], ContentType: o[1] });
  }));
  var i = function(o) {
    e[o] && e[o].length > 0 && (a = e[o][0], n[n.length] = Q("Override", null, {
      PartName: (a[0] == "/" ? "" : "/") + a,
      ContentType: En[o][t.bookType] || En[o].xlsx
    }));
  }, s = function(o) {
    (e[o] || []).forEach(function(l) {
      n[n.length] = Q("Override", null, {
        PartName: (l[0] == "/" ? "" : "/") + l,
        ContentType: En[o][t.bookType] || En[o].xlsx
      });
    });
  }, f = function(o) {
    (e[o] || []).forEach(function(l) {
      n[n.length] = Q("Override", null, {
        PartName: (l[0] == "/" ? "" : "/") + l,
        ContentType: r[o][0]
      });
    });
  };
  return i("workbooks"), s("sheets"), s("charts"), f("themes"), ["strs", "styles"].forEach(i), ["coreprops", "extprops", "custprops"].forEach(f), f("vba"), f("comments"), f("threadedcomments"), f("drawings"), s("metadata"), f("people"), n.length > 2 && (n[n.length] = "</Types>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var we = {
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
function ai(e) {
  var t = e.lastIndexOf("/");
  return e.slice(0, t + 1) + "_rels/" + e.slice(t + 1) + ".rels";
}
function At(e) {
  var t = [$e, Q("Relationships", null, {
    //'xmlns:ns0': XMLNS.RELS,
    xmlns: Ze.RELS
  })];
  return ir(e["!id"]).forEach(function(r) {
    t[t.length] = Q("Relationship", null, e["!id"][r]);
  }), t.length > 2 && (t[t.length] = "</Relationships>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function Ce(e, t, r, n, a, i) {
  if (a || (a = {}), e["!id"] || (e["!id"] = {}), e["!idx"] || (e["!idx"] = 1), t < 0) for (t = e["!idx"]; e["!id"]["rId" + t]; ++t)
    ;
  if (e["!idx"] = t + 1, a.Id = "rId" + t, a.Type = n, a.Target = r, [we.HLINK, we.XPATH, we.XMISS].indexOf(a.Type) > -1 && (a.TargetMode = "External"), e["!id"][a.Id]) throw new Error("Cannot rewrite rId " + t);
  return e["!id"][a.Id] = a, e[("/" + a.Target).replace("//", "/")] = a, t;
}
function Uf(e) {
  var t = [$e];
  t.push(`<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
`), t.push(`  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
`);
  for (var r = 0; r < e.length; ++r) t.push('  <manifest:file-entry manifest:full-path="' + e[r][0] + '" manifest:media-type="' + e[r][1] + `"/>
`);
  return t.push("</manifest:manifest>"), t.join("");
}
function ra(e, t, r) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (r || "odf") + "#" + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function Wf(e, t) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function Vf(e) {
  var t = [$e];
  t.push(`<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
`);
  for (var r = 0; r != e.length; ++r)
    t.push(ra(e[r][0], e[r][1])), t.push(Wf("", e[r][0]));
  return t.push(ra("", "Document", "pkg")), t.push("</rdf:RDF>"), t.join("");
}
function ii() {
  return '<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS ' + Sn.version + "</meta:generator></office:meta></office:document-meta>";
}
var ot = [
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
function qn(e, t, r, n, a) {
  a[e] != null || t == null || t === "" || (a[e] = t, t = Oe(t), n[n.length] = r ? Q(e, t, r) : nr(e, t));
}
function si(e, t) {
  var r = t || {}, n = [$e, Q("cp:coreProperties", null, {
    //'xmlns': XMLNS.CORE_PROPS,
    "xmlns:cp": Ze.CORE_PROPS,
    "xmlns:dc": Ze.dc,
    "xmlns:dcterms": Ze.dcterms,
    "xmlns:dcmitype": Ze.dcmitype,
    "xmlns:xsi": Ze.xsi
  })], a = {};
  if (!e && !r.Props) return n.join("");
  e && (e.CreatedDate != null && qn("dcterms:created", typeof e.CreatedDate == "string" ? e.CreatedDate : i0(e.CreatedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a), e.ModifiedDate != null && qn("dcterms:modified", typeof e.ModifiedDate == "string" ? e.ModifiedDate : i0(e.ModifiedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a));
  for (var i = 0; i != ot.length; ++i) {
    var s = ot[i], f = r.Props && r.Props[s[1]] != null ? r.Props[s[1]] : e ? e[s[1]] : null;
    f === !0 ? f = "1" : f === !1 ? f = "0" : typeof f == "number" && (f = String(f)), f != null && qn(s[0], f, null, n, a);
  }
  return n.length > 2 && (n[n.length] = "</cp:coreProperties>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var Ft = [
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
], fi = [
  "Worksheets",
  "SheetNames",
  "NamedRanges",
  "DefinedNames",
  "Chartsheets",
  "ChartNames"
];
function li(e) {
  var t = [], r = Q;
  return e || (e = {}), e.Application = "SheetJS", t[t.length] = $e, t[t.length] = Q("Properties", null, {
    xmlns: Ze.EXT_PROPS,
    "xmlns:vt": Ze.vt
  }), Ft.forEach(function(n) {
    if (e[n[1]] !== void 0) {
      var a;
      switch (n[2]) {
        case "string":
          a = Oe(String(e[n[1]]));
          break;
        case "bool":
          a = e[n[1]] ? "true" : "false";
          break;
      }
      a !== void 0 && (t[t.length] = r(n[0], a));
    }
  }), t[t.length] = r("HeadingPairs", r("vt:vector", r("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + r("vt:variant", r("vt:i4", String(e.Worksheets))), { size: 2, baseType: "variant" })), t[t.length] = r("TitlesOfParts", r("vt:vector", e.SheetNames.map(function(n) {
    return "<vt:lpstr>" + Oe(n) + "</vt:lpstr>";
  }).join(""), { size: e.Worksheets, baseType: "lpstr" })), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function oi(e) {
  var t = [$e, Q("Properties", null, {
    xmlns: Ze.CUST_PROPS,
    "xmlns:vt": Ze.vt
  })];
  if (!e) return t.join("");
  var r = 1;
  return ir(e).forEach(function(a) {
    ++r, t[t.length] = Q("property", af(e[a]), {
      fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: r,
      name: Oe(a)
    });
  }), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
var ta = {
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
function Hf(e, t) {
  var r = [];
  return ir(ta).map(function(n) {
    for (var a = 0; a < ot.length; ++a) if (ot[a][1] == n) return ot[a];
    for (a = 0; a < Ft.length; ++a) if (Ft[a][1] == n) return Ft[a];
    throw n;
  }).forEach(function(n) {
    if (e[n[1]] != null) {
      var a = t && t.Props && t.Props[n[1]] != null ? t.Props[n[1]] : e[n[1]];
      switch (n[2]) {
        case "date":
          a = new Date(a).toISOString().replace(/\.\d*Z/, "Z");
          break;
      }
      typeof a == "number" ? a = String(a) : a === !0 || a === !1 ? a = a ? "1" : "0" : a instanceof Date && (a = new Date(a).toISOString().replace(/\.\d*Z/, "")), r.push(nr(ta[n[1]] || n[1], a));
    }
  }), Q("DocumentProperties", r.join(""), { xmlns: Cr.o });
}
function Gf(e, t) {
  var r = ["Worksheets", "SheetNames"], n = "CustomDocumentProperties", a = [];
  return e && ir(e).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(e, i)) {
      for (var s = 0; s < ot.length; ++s) if (i == ot[s][1]) return;
      for (s = 0; s < Ft.length; ++s) if (i == Ft[s][1]) return;
      for (s = 0; s < r.length; ++s) if (i == r[s]) return;
      var f = e[i], o = "string";
      typeof f == "number" ? (o = "float", f = String(f)) : f === !0 || f === !1 ? (o = "boolean", f = f ? "1" : "0") : f = String(f), a.push(Q(G0(i), f, { "dt:dt": o }));
    }
  }), t && ir(t).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(t, i) && !(e && Object.prototype.hasOwnProperty.call(e, i))) {
      var s = t[i], f = "string";
      typeof s == "number" ? (f = "float", s = String(s)) : s === !0 || s === !1 ? (f = "boolean", s = s ? "1" : "0") : s instanceof Date ? (f = "dateTime.tz", s = s.toISOString()) : s = String(s), a.push(Q(G0(i), s, { "dt:dt": f }));
    }
  }), "<" + n + ' xmlns="' + Cr.o + '">' + a.join("") + "</" + n + ">";
}
function Xf(e) {
  var t = typeof e == "string" ? new Date(Date.parse(e)) : e, r = t.getTime() / 1e3 + 11644473600, n = r % Math.pow(2, 32), a = (r - n) / Math.pow(2, 32);
  n *= 1e7, a *= 1e7;
  var i = n / Math.pow(2, 32) | 0;
  i > 0 && (n = n % Math.pow(2, 32), a += i);
  var s = U(8);
  return s.write_shift(4, n), s.write_shift(4, a), s;
}
function na(e, t) {
  var r = U(4), n = U(4);
  switch (r.write_shift(4, e == 80 ? 31 : e), e) {
    case 3:
      n.write_shift(-4, t);
      break;
    case 5:
      n = U(8), n.write_shift(8, t, "f");
      break;
    case 11:
      n.write_shift(4, t ? 1 : 0);
      break;
    case 64:
      n = Xf(t);
      break;
    case 31:
    case 80:
      for (n = U(4 + 2 * (t.length + 1) + (t.length % 2 ? 0 : 2)), n.write_shift(4, t.length + 1), n.write_shift(0, t, "dbcs"); n.l != n.length; ) n.write_shift(1, 0);
      break;
    default:
      throw new Error("TypedPropertyValue unrecognized type " + e + " " + t);
  }
  return tr([r, n]);
}
var ci = ["CodePage", "Thumbnail", "_PID_LINKBASE", "_PID_HLINKS", "SystemIdentifier", "FMTID"];
function $f(e) {
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
function aa(e, t, r) {
  var n = U(8), a = [], i = [], s = 8, f = 0, o = U(8), l = U(8);
  if (o.write_shift(4, 2), o.write_shift(4, 1200), l.write_shift(4, 1), i.push(o), a.push(l), s += 8 + o.length, !t) {
    l = U(8), l.write_shift(4, 0), a.unshift(l);
    var c = [U(4)];
    for (c[0].write_shift(4, e.length), f = 0; f < e.length; ++f) {
      var d = e[f][0];
      for (o = U(8 + 2 * (d.length + 1) + (d.length % 2 ? 0 : 2)), o.write_shift(4, f + 2), o.write_shift(4, d.length + 1), o.write_shift(0, d, "dbcs"); o.l != o.length; ) o.write_shift(1, 0);
      c.push(o);
    }
    o = tr(c), i.unshift(o), s += 8 + o.length;
  }
  for (f = 0; f < e.length; ++f)
    if (!(t && !t[e[f][0]]) && !(ci.indexOf(e[f][0]) > -1 || fi.indexOf(e[f][0]) > -1) && e[f][1] != null) {
      var x = e[f][1], p = 0;
      if (t) {
        p = +t[e[f][0]];
        var g = r[p];
        if (g.p == "version" && typeof x == "string") {
          var u = x.split(".");
          x = (+u[0] << 16) + (+u[1] || 0);
        }
        o = na(g.t, x);
      } else {
        var _ = $f(x);
        _ == -1 && (_ = 31, x = String(x)), o = na(_, x);
      }
      i.push(o), l = U(8), l.write_shift(4, t ? p : 2 + f), a.push(l), s += 8 + o.length;
    }
  var k = 8 * (i.length + 1);
  for (f = 0; f < i.length; ++f)
    a[f].write_shift(4, k), k += i[f].length;
  return n.write_shift(4, s), n.write_shift(4, i.length), tr([n].concat(a).concat(i));
}
function ia(e, t, r, n, a, i) {
  var s = U(a ? 68 : 48), f = [s];
  s.write_shift(2, 65534), s.write_shift(2, 0), s.write_shift(4, 842412599), s.write_shift(16, De.utils.consts.HEADER_CLSID, "hex"), s.write_shift(4, a ? 2 : 1), s.write_shift(16, t, "hex"), s.write_shift(4, a ? 68 : 48);
  var o = aa(e, r, n);
  if (f.push(o), a) {
    var l = aa(a, null, null);
    s.write_shift(16, i, "hex"), s.write_shift(4, 68 + o.length), f.push(l);
  }
  return tr(f);
}
function zf(e, t) {
  t || (t = U(e));
  for (var r = 0; r < e; ++r) t.write_shift(1, 0);
  return t;
}
function Kf(e, t) {
  return e.read_shift(t) === 1;
}
function dr(e, t) {
  return t || (t = U(2)), t.write_shift(2, +!!e), t;
}
function ui(e) {
  return e.read_shift(2, "u");
}
function Rr(e, t) {
  return t || (t = U(2)), t.write_shift(2, e), t;
}
function hi(e, t, r) {
  return r || (r = U(2)), r.write_shift(1, t == "e" ? +e : +!!e), r.write_shift(1, t == "e" ? 1 : 0), r;
}
function xi(e, t, r) {
  var n = e.read_shift(r && r.biff >= 12 ? 2 : 1), a = "sbcs-cont";
  if (r && r.biff >= 8, !r || r.biff == 8) {
    var i = e.read_shift(1);
    i && (a = "dbcs-cont");
  } else r.biff == 12 && (a = "wstr");
  r.biff >= 2 && r.biff <= 5 && (a = "cpstr");
  var s = n ? e.read_shift(n, a) : "";
  return s;
}
function Yf(e) {
  var t = e.t || "", r = U(3);
  r.write_shift(2, t.length), r.write_shift(1, 1);
  var n = U(2 * t.length);
  n.write_shift(2 * t.length, t, "utf16le");
  var a = [r, n];
  return tr(a);
}
function jf(e, t, r) {
  var n;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5) return e.read_shift(t, "cpstr");
    if (r.biff >= 12) return e.read_shift(t, "dbcs-cont");
  }
  var a = e.read_shift(1);
  return a === 0 ? n = e.read_shift(t, "sbcs-cont") : n = e.read_shift(t, "dbcs-cont"), n;
}
function Jf(e, t, r) {
  var n = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return n === 0 ? (e.l++, "") : jf(e, n, r);
}
function Zf(e, t, r) {
  if (r.biff > 5) return Jf(e, t, r);
  var n = e.read_shift(1);
  return n === 0 ? (e.l++, "") : e.read_shift(n, r.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont");
}
function di(e, t, r) {
  return r || (r = U(3 + 2 * e.length)), r.write_shift(2, e.length), r.write_shift(1, 1), r.write_shift(31, e, "utf16le"), r;
}
function sa(e, t) {
  t || (t = U(6 + e.length * 2)), t.write_shift(4, 1 + e.length);
  for (var r = 0; r < e.length; ++r) t.write_shift(2, e.charCodeAt(r));
  return t.write_shift(2, 0), t;
}
function qf(e) {
  var t = U(512), r = 0, n = e.Target;
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
  t.write_shift(4, 2), t.write_shift(4, i);
  var s = [8, 6815827, 6619237, 4849780, 83];
  for (r = 0; r < s.length; ++r) t.write_shift(4, s[r]);
  if (i == 28)
    n = n.slice(1), sa(n, t);
  else if (i & 2) {
    for (s = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), r = 0; r < s.length; ++r) t.write_shift(1, parseInt(s[r], 16));
    var f = a > -1 ? n.slice(0, a) : n;
    for (t.write_shift(4, 2 * (f.length + 1)), r = 0; r < f.length; ++r) t.write_shift(2, f.charCodeAt(r));
    t.write_shift(2, 0), i & 8 && sa(a > -1 ? n.slice(a + 1) : "", t);
  } else {
    for (s = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" "), r = 0; r < s.length; ++r) t.write_shift(1, parseInt(s[r], 16));
    for (var o = 0; n.slice(o * 3, o * 3 + 3) == "../" || n.slice(o * 3, o * 3 + 3) == "..\\"; ) ++o;
    for (t.write_shift(2, o), t.write_shift(4, n.length - 3 * o + 1), r = 0; r < n.length - 3 * o; ++r) t.write_shift(1, n.charCodeAt(r + 3 * o) & 255);
    for (t.write_shift(1, 0), t.write_shift(2, 65535), t.write_shift(2, 57005), r = 0; r < 6; ++r) t.write_shift(4, 0);
  }
  return t.slice(0, t.l);
}
function ht(e, t, r, n) {
  return n || (n = U(6)), n.write_shift(2, e), n.write_shift(2, t), n.write_shift(2, r || 0), n;
}
function Qf(e, t, r) {
  var n = r.biff > 8 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n, "i"), s = e.read_shift(n, "i");
  return [a, i, s];
}
function el(e) {
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(2), a = e.read_shift(2);
  return { s: { c: n, r: t }, e: { c: a, r } };
}
function pi(e, t) {
  return t || (t = U(8)), t.write_shift(2, e.s.r), t.write_shift(2, e.e.r), t.write_shift(2, e.s.c), t.write_shift(2, e.e.c), t;
}
function w0(e, t, r) {
  var n = 1536, a = 16;
  switch (r.bookType) {
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
  return i.write_shift(2, n), i.write_shift(2, t), a > 4 && i.write_shift(2, 29282), a > 6 && i.write_shift(2, 1997), a > 8 && (i.write_shift(2, 49161), i.write_shift(2, 1), i.write_shift(2, 1798), i.write_shift(2, 0)), i;
}
function rl(e, t) {
  var r = !t || t.biff == 8, n = U(r ? 112 : 54);
  for (n.write_shift(t.biff == 8 ? 2 : 1, 7), r && n.write_shift(1, 0), n.write_shift(4, 859007059), n.write_shift(4, 5458548 | (r ? 0 : 536870912)); n.l < n.length; ) n.write_shift(1, r ? 0 : 32);
  return n;
}
function tl(e, t) {
  var r = !t || t.biff >= 8 ? 2 : 1, n = U(8 + r * e.name.length);
  n.write_shift(4, e.pos), n.write_shift(1, e.hs || 0), n.write_shift(1, e.dt), n.write_shift(1, e.name.length), t.biff >= 8 && n.write_shift(1, 1), n.write_shift(r * e.name.length, e.name, t.biff < 8 ? "sbcs" : "utf16le");
  var a = n.slice(0, n.l);
  return a.l = n.l, a;
}
function nl(e, t) {
  var r = U(8);
  r.write_shift(4, e.Count), r.write_shift(4, e.Unique);
  for (var n = [], a = 0; a < e.length; ++a) n[a] = Yf(e[a]);
  var i = tr([r].concat(n));
  return i.parts = [r.length].concat(n.map(function(s) {
    return s.length;
  })), i;
}
function al() {
  var e = U(18);
  return e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 29280), e.write_shift(2, 17600), e.write_shift(2, 56), e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 1), e.write_shift(2, 500), e;
}
function il(e) {
  var t = U(18), r = 1718;
  return e && e.RTL && (r |= 64), t.write_shift(2, r), t.write_shift(4, 0), t.write_shift(4, 64), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
function sl(e, t) {
  var r = e.name || "Arial", n = t && t.biff == 5, a = n ? 15 + r.length : 16 + 2 * r.length, i = U(a);
  return i.write_shift(2, e.sz * 20), i.write_shift(4, 0), i.write_shift(2, 400), i.write_shift(4, 0), i.write_shift(2, 0), i.write_shift(1, r.length), n || i.write_shift(1, 1), i.write_shift((n ? 1 : 2) * r.length, r, n ? "sbcs" : "utf16le"), i;
}
function fl(e, t, r, n) {
  var a = U(10);
  return ht(e, t, n, a), a.write_shift(4, r), a;
}
function ll(e, t, r, n, a) {
  var i = !a || a.biff == 8, s = U(8 + +i + (1 + i) * r.length);
  return ht(e, t, n, s), s.write_shift(2, r.length), i && s.write_shift(1, 1), s.write_shift((1 + i) * r.length, r, i ? "utf16le" : "sbcs"), s;
}
function ol(e, t, r, n) {
  var a = r && r.biff == 5;
  n || (n = U(a ? 3 + t.length : 5 + 2 * t.length)), n.write_shift(2, e), n.write_shift(a ? 1 : 2, t.length), a || n.write_shift(1, 1), n.write_shift((a ? 1 : 2) * t.length, t, a ? "sbcs" : "utf16le");
  var i = n.length > n.l ? n.slice(0, n.l) : n;
  return i.l == null && (i.l = i.length), i;
}
function cl(e, t) {
  var r = t.biff == 8 || !t.biff ? 4 : 2, n = U(2 * r + 6);
  return n.write_shift(r, e.s.r), n.write_shift(r, e.e.r + 1), n.write_shift(2, e.s.c), n.write_shift(2, e.e.c + 1), n.write_shift(2, 0), n;
}
function fa(e, t, r, n) {
  var a = r && r.biff == 5;
  n || (n = U(a ? 16 : 20)), n.write_shift(2, 0), e.style ? (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, 65524)) : (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, t << 4));
  var i = 0;
  return e.numFmtId > 0 && a && (i |= 1024), n.write_shift(4, i), n.write_shift(4, 0), a || n.write_shift(4, 0), n.write_shift(2, 0), n;
}
function ul(e) {
  var t = U(8);
  return t.write_shift(4, 0), t.write_shift(2, 0), t.write_shift(2, 0), t;
}
function hl(e, t, r, n, a, i) {
  var s = U(8);
  return ht(e, t, n, s), hi(r, i, s), s;
}
function xl(e, t, r, n) {
  var a = U(14);
  return ht(e, t, n, a), ut(r, a), a;
}
function dl(e, t, r) {
  if (r.biff < 8) return pl(e, t, r);
  for (var n = [], a = e.l + t, i = e.read_shift(r.biff > 8 ? 4 : 2); i-- !== 0; ) n.push(Qf(e, r.biff > 8 ? 12 : 6, r));
  if (e.l != a) throw new Error("Bad ExternSheet: " + e.l + " != " + a);
  return n;
}
function pl(e, t, r) {
  e[e.l + 1] == 3 && e[e.l]++;
  var n = xi(e, t, r);
  return n.charCodeAt(0) == 3 ? n.slice(1) : n;
}
function vl(e) {
  var t = U(2 + e.length * 8);
  t.write_shift(2, e.length);
  for (var r = 0; r < e.length; ++r) pi(e[r], t);
  return t;
}
function ml(e) {
  var t = U(24), r = qe(e[0]);
  t.write_shift(2, r.r), t.write_shift(2, r.r), t.write_shift(2, r.c), t.write_shift(2, r.c);
  for (var n = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), a = 0; a < 16; ++a) t.write_shift(1, parseInt(n[a], 16));
  return tr([t, qf(e[1])]);
}
function gl(e) {
  var t = e[1].Tooltip, r = U(10 + 2 * (t.length + 1));
  r.write_shift(2, 2048);
  var n = qe(e[0]);
  r.write_shift(2, n.r), r.write_shift(2, n.r), r.write_shift(2, n.c), r.write_shift(2, n.c);
  for (var a = 0; a < t.length; ++a) r.write_shift(2, t.charCodeAt(a));
  return r.write_shift(2, 0), r;
}
function _l(e) {
  return e || (e = U(4)), e.write_shift(2, 1), e.write_shift(2, 1), e;
}
function Tl(e, t, r) {
  if (!r.cellStyles) return Gr(e, t);
  var n = r && r.biff >= 12 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n), s = e.read_shift(n), f = e.read_shift(n), o = e.read_shift(2);
  n == 2 && (e.l += 2);
  var l = { s: a, e: i, w: s, ixfe: f, flags: o };
  return (r.biff >= 5 || !r.biff) && (l.level = o >> 8 & 7), l;
}
function El(e, t) {
  var r = U(12);
  r.write_shift(2, t), r.write_shift(2, t), r.write_shift(2, e.width * 256), r.write_shift(2, 0);
  var n = 0;
  return e.hidden && (n |= 1), r.write_shift(1, n), n = e.level || 0, r.write_shift(1, n), r.write_shift(2, 0), r;
}
function wl(e) {
  for (var t = U(2 * e), r = 0; r < e; ++r) t.write_shift(2, r + 1);
  return t;
}
function Sl(e, t, r) {
  var n = U(15);
  return cn(n, e, t), n.write_shift(8, r, "f"), n;
}
function Al(e, t, r) {
  var n = U(9);
  return cn(n, e, t), n.write_shift(2, r), n;
}
var Fl = /* @__PURE__ */ function() {
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
  }, t = u0({
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
  function r(f, o) {
    var l = [], c = ct(1);
    switch (o.type) {
      case "base64":
        c = Mr(Jr(f));
        break;
      case "binary":
        c = Mr(f);
        break;
      case "buffer":
      case "array":
        c = f;
        break;
    }
    yr(c, 0);
    var d = c.read_shift(1), x = !!(d & 136), p = !1, g = !1;
    switch (d) {
      case 2:
        break;
      case 3:
        break;
      case 48:
        p = !0, x = !0;
        break;
      case 49:
        p = !0, x = !0;
        break;
      case 131:
        break;
      case 139:
        break;
      case 140:
        g = !0;
        break;
      case 245:
        break;
      default:
        throw new Error("DBF Unsupported Version: " + d.toString(16));
    }
    var u = 0, _ = 521;
    d == 2 && (u = c.read_shift(2)), c.l += 3, d != 2 && (u = c.read_shift(4)), u > 1048576 && (u = 1e6), d != 2 && (_ = c.read_shift(2));
    var k = c.read_shift(2), D = o.codepage || 1252;
    d != 2 && (c.l += 16, c.read_shift(1), c[c.l] !== 0 && (D = e[c[c.l]]), c.l += 1, c.l += 2), g && (c.l += 36);
    for (var C = [], B = {}, Y = Math.min(c.length, d == 2 ? 521 : _ - 10 - (p ? 264 : 0)), re = g ? 32 : 11; c.l < Y && c[c.l] != 13; )
      switch (B = {}, B.name = An.utils.decode(D, c.slice(c.l, c.l + re)).replace(/[\u0000\r\n].*$/g, ""), c.l += re, B.type = String.fromCharCode(c.read_shift(1)), d != 2 && !g && (B.offset = c.read_shift(4)), B.len = c.read_shift(1), d == 2 && (B.offset = c.read_shift(2)), B.dec = c.read_shift(1), B.name.length && C.push(B), d != 2 && (c.l += g ? 13 : 14), B.type) {
        case "B":
          (!p || B.len != 8) && o.WTF && console.log("Skipping " + B.name + ":" + B.type);
          break;
        case "G":
        case "P":
          o.WTF && console.log("Skipping " + B.name + ":" + B.type);
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
          throw new Error("Unknown Field Type: " + B.type);
      }
    if (c[c.l] !== 13 && (c.l = _ - 1), c.read_shift(1) !== 13) throw new Error("DBF Terminator not found " + c.l + " " + c[c.l]);
    c.l = _;
    var O = 0, b = 0;
    for (l[0] = [], b = 0; b != C.length; ++b) l[0][b] = C[b].name;
    for (; u-- > 0; ) {
      if (c[c.l] === 42) {
        c.l += k;
        continue;
      }
      for (++c.l, l[++O] = [], b = 0, b = 0; b != C.length; ++b) {
        var M = c.slice(c.l, c.l + C[b].len);
        c.l += C[b].len, yr(M, 0);
        var X = An.utils.decode(D, M);
        switch (C[b].type) {
          case "C":
            X.trim().length && (l[O][b] = X.replace(/\s+$/, ""));
            break;
          case "D":
            X.length === 8 ? l[O][b] = new Date(+X.slice(0, 4), +X.slice(4, 6) - 1, +X.slice(6, 8)) : l[O][b] = X;
            break;
          case "F":
            l[O][b] = parseFloat(X.trim());
            break;
          case "+":
          case "I":
            l[O][b] = g ? M.read_shift(-4, "i") ^ 2147483648 : M.read_shift(4, "i");
            break;
          case "L":
            switch (X.trim().toUpperCase()) {
              case "Y":
              case "T":
                l[O][b] = !0;
                break;
              case "N":
              case "F":
                l[O][b] = !1;
                break;
              case "":
              case "?":
                break;
              default:
                throw new Error("DBF Unrecognized L:|" + X + "|");
            }
            break;
          case "M":
            if (!x) throw new Error("DBF Unexpected MEMO for type " + d.toString(16));
            l[O][b] = "##MEMO##" + (g ? parseInt(X.trim(), 10) : M.read_shift(4));
            break;
          case "N":
            X = X.replace(/\u0000/g, "").trim(), X && X != "." && (l[O][b] = +X || 0);
            break;
          case "@":
            l[O][b] = new Date(M.read_shift(-8, "f") - 621356832e5);
            break;
          case "T":
            l[O][b] = new Date((M.read_shift(4) - 2440588) * 864e5 + M.read_shift(4));
            break;
          case "Y":
            l[O][b] = M.read_shift(4, "i") / 1e4 + M.read_shift(4, "i") / 1e4 * Math.pow(2, 32);
            break;
          case "O":
            l[O][b] = -M.read_shift(-8, "f");
            break;
          case "B":
            if (p && C[b].len == 8) {
              l[O][b] = M.read_shift(8, "f");
              break;
            }
          case "G":
          case "P":
            M.l += C[b].len;
            break;
          case "0":
            if (C[b].name === "_NullFlags") break;
          default:
            throw new Error("DBF Unsupported data type " + C[b].type);
        }
      }
    }
    if (d != 2 && c.l < c.length && c[c.l++] != 26) throw new Error("DBF EOF Marker missing " + (c.l - 1) + " of " + c.length + " " + c[c.l - 1].toString(16));
    return o && o.sheetRows && (l = l.slice(0, o.sheetRows)), o.DBF = C, l;
  }
  function n(f, o) {
    var l = o || {};
    l.dateNF || (l.dateNF = "yyyymmdd");
    var c = kt(r(f, l), l);
    return c["!cols"] = l.DBF.map(function(d) {
      return {
        wch: d.len,
        DBF: d
      };
    }), delete l.DBF, c;
  }
  function a(f, o) {
    try {
      return xt(n(f, o), o);
    } catch (l) {
      if (o && o.WTF) throw l;
    }
    return { SheetNames: [], Sheets: {} };
  }
  var i = { B: 8, C: 250, L: 1, D: 8, "?": 0, "": 0 };
  function s(f, o) {
    var l = o || {};
    if (+l.codepage >= 0 && Zt(+l.codepage), l.type == "string") throw new Error("Cannot write DBF to JS string");
    var c = Tr(), d = Bn(f, { header: 1, raw: !0, cellDates: !0 }), x = d[0], p = d.slice(1), g = f["!cols"] || [], u = 0, _ = 0, k = 0, D = 1;
    for (u = 0; u < x.length; ++u) {
      if (((g[u] || {}).DBF || {}).name) {
        x[u] = g[u].DBF.name, ++k;
        continue;
      }
      if (x[u] != null) {
        if (++k, typeof x[u] == "number" && (x[u] = x[u].toString(10)), typeof x[u] != "string") throw new Error("DBF Invalid column name " + x[u] + " |" + typeof x[u] + "|");
        if (x.indexOf(x[u]) !== u) {
          for (_ = 0; _ < 1024; ++_)
            if (x.indexOf(x[u] + "_" + _) == -1) {
              x[u] += "_" + _;
              break;
            }
        }
      }
    }
    var C = Me(f["!ref"]), B = [], Y = [], re = [];
    for (u = 0; u <= C.e.c - C.s.c; ++u) {
      var O = "", b = "", M = 0, X = [];
      for (_ = 0; _ < p.length; ++_)
        p[_][u] != null && X.push(p[_][u]);
      if (X.length == 0 || x[u] == null) {
        B[u] = "?";
        continue;
      }
      for (_ = 0; _ < X.length; ++_) {
        switch (typeof X[_]) {
          case "number":
            b = "B";
            break;
          case "string":
            b = "C";
            break;
          case "boolean":
            b = "L";
            break;
          case "object":
            b = X[_] instanceof Date ? "D" : "C";
            break;
          default:
            b = "C";
        }
        M = Math.max(M, String(X[_]).length), O = O && O != b ? "C" : b;
      }
      M > 250 && (M = 250), b = ((g[u] || {}).DBF || {}).type, b == "C" && g[u].DBF.len > M && (M = g[u].DBF.len), O == "B" && b == "N" && (O = "N", re[u] = g[u].DBF.dec, M = g[u].DBF.len), Y[u] = O == "C" || b == "N" ? M : i[O] || 0, D += Y[u], B[u] = O;
    }
    var K = c.next(32);
    for (K.write_shift(4, 318902576), K.write_shift(4, p.length), K.write_shift(2, 296 + 32 * k), K.write_shift(2, D), u = 0; u < 4; ++u) K.write_shift(4, 0);
    for (K.write_shift(4, 0 | (+t[
      /*::String(*/
      ma
      /*::)*/
    ] || 3) << 8), u = 0, _ = 0; u < x.length; ++u)
      if (x[u] != null) {
        var j = c.next(32), ne = (x[u].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
        j.write_shift(1, ne, "sbcs"), j.write_shift(1, B[u] == "?" ? "C" : B[u], "sbcs"), j.write_shift(4, _), j.write_shift(1, Y[u] || i[B[u]] || 0), j.write_shift(1, re[u] || 0), j.write_shift(1, 2), j.write_shift(4, 0), j.write_shift(1, 0), j.write_shift(4, 0), j.write_shift(4, 0), _ += Y[u] || i[B[u]] || 0;
      }
    var Te = c.next(264);
    for (Te.write_shift(4, 13), u = 0; u < 65; ++u) Te.write_shift(4, 0);
    for (u = 0; u < p.length; ++u) {
      var xe = c.next(D);
      for (xe.write_shift(1, 0), _ = 0; _ < x.length; ++_)
        if (x[_] != null)
          switch (B[_]) {
            case "L":
              xe.write_shift(1, p[u][_] == null ? 63 : p[u][_] ? 84 : 70);
              break;
            case "B":
              xe.write_shift(8, p[u][_] || 0, "f");
              break;
            case "N":
              var Re = "0";
              for (typeof p[u][_] == "number" && (Re = p[u][_].toFixed(re[_] || 0)), k = 0; k < Y[_] - Re.length; ++k) xe.write_shift(1, 32);
              xe.write_shift(1, Re, "sbcs");
              break;
            case "D":
              p[u][_] ? (xe.write_shift(4, ("0000" + p[u][_].getFullYear()).slice(-4), "sbcs"), xe.write_shift(2, ("00" + (p[u][_].getMonth() + 1)).slice(-2), "sbcs"), xe.write_shift(2, ("00" + p[u][_].getDate()).slice(-2), "sbcs")) : xe.write_shift(8, "00000000", "sbcs");
              break;
            case "C":
              var de = String(p[u][_] != null ? p[u][_] : "").slice(0, Y[_]);
              for (xe.write_shift(1, de, "sbcs"), k = 0; k < Y[_] - de.length; ++k) xe.write_shift(1, 32);
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
}(), yl = /* @__PURE__ */ function() {
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
  }, t = new RegExp("\x1BN(" + ir(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm"), r = function(x, p) {
    var g = e[p];
    return typeof g == "number" ? R0(g) : g;
  }, n = function(x, p, g) {
    var u = p.charCodeAt(0) - 32 << 4 | g.charCodeAt(0) - 48;
    return u == 59 ? x : R0(u);
  };
  e["|"] = 254;
  function a(x, p) {
    switch (p.type) {
      case "base64":
        return i(Jr(x), p);
      case "binary":
        return i(x, p);
      case "buffer":
        return i(Se && Buffer.isBuffer(x) ? x.toString("binary") : an(x), p);
      case "array":
        return i(Hn(x), p);
    }
    throw new Error("Unrecognized type " + p.type);
  }
  function i(x, p) {
    var g = x.split(/[\n\r]+/), u = -1, _ = -1, k = 0, D = 0, C = [], B = [], Y = null, re = {}, O = [], b = [], M = [], X = 0, K;
    for (+p.codepage >= 0 && Zt(+p.codepage); k !== g.length; ++k) {
      X = 0;
      var j = g[k].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, n).replace(t, r), ne = j.replace(/;;/g, "\0").split(";").map(function(A) {
        return A.replace(/\u0000/g, ";");
      }), Te = ne[0], xe;
      if (j.length > 0) switch (Te) {
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
          ne[1].charAt(0) == "P" && B.push(j.slice(3).replace(/;;/g, ";"));
          break;
        case "C":
          var Re = !1, de = !1, vr = !1, He = !1, ur = -1, hr = -1;
          for (D = 1; D < ne.length; ++D) switch (ne[D].charAt(0)) {
            case "A":
              break;
            case "X":
              _ = parseInt(ne[D].slice(1)) - 1, de = !0;
              break;
            case "Y":
              for (u = parseInt(ne[D].slice(1)) - 1, de || (_ = 0), K = C.length; K <= u; ++K) C[K] = [];
              break;
            case "K":
              xe = ne[D].slice(1), xe.charAt(0) === '"' ? xe = xe.slice(1, xe.length - 1) : xe === "TRUE" ? xe = !0 : xe === "FALSE" ? xe = !1 : isNaN(Yr(xe)) ? isNaN(Qt(xe).getDate()) || (xe = pr(xe)) : (xe = Yr(xe), Y !== null && ka(Y) && (xe = Na(xe))), Re = !0;
              break;
            case "E":
              He = !0;
              var S = Fo(ne[D].slice(1), { r: u, c: _ });
              C[u][_] = [C[u][_], S];
              break;
            case "S":
              vr = !0, C[u][_] = [C[u][_], "S5S"];
              break;
            case "G":
              break;
            case "R":
              ur = parseInt(ne[D].slice(1)) - 1;
              break;
            case "C":
              hr = parseInt(ne[D].slice(1)) - 1;
              break;
            default:
              if (p && p.WTF) throw new Error("SYLK bad record " + j);
          }
          if (Re && (C[u][_] && C[u][_].length == 2 ? C[u][_][0] = xe : C[u][_] = xe, Y = null), vr) {
            if (He) throw new Error("SYLK shared formula cannot have own formula");
            var L = ur > -1 && C[ur][hr];
            if (!L || !L[1]) throw new Error("SYLK shared formula cannot find base");
            C[u][_][1] = yo(L[1], { r: u - ur, c: _ - hr });
          }
          break;
        case "F":
          var F = 0;
          for (D = 1; D < ne.length; ++D) switch (ne[D].charAt(0)) {
            case "X":
              _ = parseInt(ne[D].slice(1)) - 1, ++F;
              break;
            case "Y":
              for (u = parseInt(ne[D].slice(1)) - 1, K = C.length; K <= u; ++K) C[K] = [];
              break;
            case "M":
              X = parseInt(ne[D].slice(1)) / 20;
              break;
            case "F":
              break;
            case "G":
              break;
            case "P":
              Y = B[parseInt(ne[D].slice(1))];
              break;
            case "S":
              break;
            case "D":
              break;
            case "N":
              break;
            case "W":
              for (M = ne[D].slice(1).split(" "), K = parseInt(M[0], 10); K <= parseInt(M[1], 10); ++K)
                X = parseInt(M[2], 10), b[K - 1] = X === 0 ? { hidden: !0 } : { wch: X }, S0(b[K - 1]);
              break;
            case "C":
              _ = parseInt(ne[D].slice(1)) - 1, b[_] || (b[_] = {});
              break;
            case "R":
              u = parseInt(ne[D].slice(1)) - 1, O[u] || (O[u] = {}), X > 0 ? (O[u].hpt = X, O[u].hpx = Ti(X)) : X === 0 && (O[u].hidden = !0);
              break;
            default:
              if (p && p.WTF) throw new Error("SYLK bad record " + j);
          }
          F < 1 && (Y = null);
          break;
        default:
          if (p && p.WTF) throw new Error("SYLK bad record " + j);
      }
    }
    return O.length > 0 && (re["!rows"] = O), b.length > 0 && (re["!cols"] = b), p && p.sheetRows && (C = C.slice(0, p.sheetRows)), [C, re];
  }
  function s(x, p) {
    var g = a(x, p), u = g[0], _ = g[1], k = kt(u, p);
    return ir(_).forEach(function(D) {
      k[D] = _[D];
    }), k;
  }
  function f(x, p) {
    return xt(s(x, p), p);
  }
  function o(x, p, g, u) {
    var _ = "C;Y" + (g + 1) + ";X" + (u + 1) + ";K";
    switch (x.t) {
      case "n":
        _ += x.v || 0, x.f && !x.F && (_ += ";E" + F0(x.f, { r: g, c: u }));
        break;
      case "b":
        _ += x.v ? "TRUE" : "FALSE";
        break;
      case "e":
        _ += x.w || x.v;
        break;
      case "d":
        _ += '"' + (x.w || x.v) + '"';
        break;
      case "s":
        _ += '"' + x.v.replace(/"/g, "").replace(/;/g, ";;") + '"';
        break;
    }
    return _;
  }
  function l(x, p) {
    p.forEach(function(g, u) {
      var _ = "F;W" + (u + 1) + " " + (u + 1) + " ";
      g.hidden ? _ += "0" : (typeof g.width == "number" && !g.wpx && (g.wpx = Nn(g.width)), typeof g.wpx == "number" && !g.wch && (g.wch = Pn(g.wpx)), typeof g.wch == "number" && (_ += Math.round(g.wch))), _.charAt(_.length - 1) != " " && x.push(_);
    });
  }
  function c(x, p) {
    p.forEach(function(g, u) {
      var _ = "F;";
      g.hidden ? _ += "M0;" : g.hpt ? _ += "M" + 20 * g.hpt + ";" : g.hpx && (_ += "M" + 20 * Ln(g.hpx) + ";"), _.length > 2 && x.push(_ + "R" + (u + 1));
    });
  }
  function d(x, p) {
    var g = ["ID;PWXL;N;E"], u = [], _ = Me(x["!ref"]), k, D = Array.isArray(x), C = `\r
`;
    g.push("P;PGeneral"), g.push("F;P0;DG0G8;M255"), x["!cols"] && l(g, x["!cols"]), x["!rows"] && c(g, x["!rows"]), g.push("B;Y" + (_.e.r - _.s.r + 1) + ";X" + (_.e.c - _.s.c + 1) + ";D" + [_.s.c, _.s.r, _.e.c, _.e.r].join(" "));
    for (var B = _.s.r; B <= _.e.r; ++B)
      for (var Y = _.s.c; Y <= _.e.c; ++Y) {
        var re = ke({ r: B, c: Y });
        k = D ? (x[B] || [])[Y] : x[re], !(!k || k.v == null && (!k.f || k.F)) && u.push(o(k, x, B, Y));
      }
    return g.join(C) + C + u.join(C) + C + "E" + C;
  }
  return {
    to_workbook: f,
    to_sheet: s,
    from_sheet: d
  };
}(), Cl = /* @__PURE__ */ function() {
  function e(i, s) {
    switch (s.type) {
      case "base64":
        return t(Jr(i), s);
      case "binary":
        return t(i, s);
      case "buffer":
        return t(Se && Buffer.isBuffer(i) ? i.toString("binary") : an(i), s);
      case "array":
        return t(Hn(i), s);
    }
    throw new Error("Unrecognized type " + s.type);
  }
  function t(i, s) {
    for (var f = i.split(`
`), o = -1, l = -1, c = 0, d = []; c !== f.length; ++c) {
      if (f[c].trim() === "BOT") {
        d[++o] = [], l = 0;
        continue;
      }
      if (!(o < 0)) {
        var x = f[c].trim().split(","), p = x[0], g = x[1];
        ++c;
        for (var u = f[c] || ""; (u.match(/["]/g) || []).length & 1 && c < f.length - 1; ) u += `
` + f[++c];
        switch (u = u.trim(), +p) {
          case -1:
            if (u === "BOT") {
              d[++o] = [], l = 0;
              continue;
            } else if (u !== "EOD") throw new Error("Unrecognized DIF special command " + u);
            break;
          case 0:
            u === "TRUE" ? d[o][l] = !0 : u === "FALSE" ? d[o][l] = !1 : isNaN(Yr(g)) ? isNaN(Qt(g).getDate()) ? d[o][l] = g : d[o][l] = pr(g) : d[o][l] = Yr(g), ++l;
            break;
          case 1:
            u = u.slice(1, u.length - 1), u = u.replace(/""/g, '"'), u && u.match(/^=".*"$/) && (u = u.slice(2, -1)), d[o][l++] = u !== "" ? u : null;
            break;
        }
        if (u === "EOD") break;
      }
    }
    return s && s.sheetRows && (d = d.slice(0, s.sheetRows)), d;
  }
  function r(i, s) {
    return kt(e(i, s), s);
  }
  function n(i, s) {
    return xt(r(i, s), s);
  }
  var a = /* @__PURE__ */ function() {
    var i = function(o, l, c, d, x) {
      o.push(l), o.push(c + "," + d), o.push('"' + x.replace(/"/g, '""') + '"');
    }, s = function(o, l, c, d) {
      o.push(l + "," + c), o.push(l == 1 ? '"' + d.replace(/"/g, '""') + '"' : d);
    };
    return function(o) {
      var l = [], c = Me(o["!ref"]), d, x = Array.isArray(o);
      i(l, "TABLE", 0, 1, "sheetjs"), i(l, "VECTORS", 0, c.e.r - c.s.r + 1, ""), i(l, "TUPLES", 0, c.e.c - c.s.c + 1, ""), i(l, "DATA", 0, 0, "");
      for (var p = c.s.r; p <= c.e.r; ++p) {
        s(l, -1, 0, "BOT");
        for (var g = c.s.c; g <= c.e.c; ++g) {
          var u = ke({ r: p, c: g });
          if (d = x ? (o[p] || [])[g] : o[u], !d) {
            s(l, 1, 0, "");
            continue;
          }
          switch (d.t) {
            case "n":
              var _ = d.w;
              !_ && d.v != null && (_ = d.v), _ == null ? d.f && !d.F ? s(l, 1, 0, "=" + d.f) : s(l, 1, 0, "") : s(l, 0, _, "V");
              break;
            case "b":
              s(l, 0, d.v ? 1 : 0, d.v ? "TRUE" : "FALSE");
              break;
            case "s":
              s(l, 1, 0, isNaN(d.v) ? d.v : '="' + d.v + '"');
              break;
            case "d":
              d.w || (d.w = tt(d.z || Ve[14], Er(pr(d.v)))), s(l, 0, d.w, "V");
              break;
            default:
              s(l, 1, 0, "");
          }
        }
      }
      s(l, -1, 0, "EOD");
      var k = `\r
`, D = l.join(k);
      return D;
    };
  }();
  return {
    to_workbook: n,
    to_sheet: r,
    from_sheet: a
  };
}(), vi = /* @__PURE__ */ function() {
  function e(d) {
    return d.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, `
`);
  }
  function t(d) {
    return d.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n");
  }
  function r(d, x) {
    for (var p = d.split(`
`), g = -1, u = -1, _ = 0, k = []; _ !== p.length; ++_) {
      var D = p[_].trim().split(":");
      if (D[0] === "cell") {
        var C = qe(D[1]);
        if (k.length <= C.r) for (g = k.length; g <= C.r; ++g) k[g] || (k[g] = []);
        switch (g = C.r, u = C.c, D[2]) {
          case "t":
            k[g][u] = e(D[3]);
            break;
          case "v":
            k[g][u] = +D[3];
            break;
          case "vtf":
            var B = D[D.length - 1];
          case "vtc":
            switch (D[3]) {
              case "nl":
                k[g][u] = !!+D[4];
                break;
              default:
                k[g][u] = +D[4];
                break;
            }
            D[2] == "vtf" && (k[g][u] = [k[g][u], B]);
        }
      }
    }
    return x && x.sheetRows && (k = k.slice(0, x.sheetRows)), k;
  }
  function n(d, x) {
    return kt(r(d, x), x);
  }
  function a(d, x) {
    return xt(n(d, x), x);
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
`), o = "--SocialCalcSpreadsheetControlSave--";
  function l(d) {
    if (!d || !d["!ref"]) return "";
    for (var x = [], p = [], g, u = "", _ = kr(d["!ref"]), k = Array.isArray(d), D = _.s.r; D <= _.e.r; ++D)
      for (var C = _.s.c; C <= _.e.c; ++C)
        if (u = ke({ r: D, c: C }), g = k ? (d[D] || [])[C] : d[u], !(!g || g.v == null || g.t === "z")) {
          switch (p = ["cell", u, "t"], g.t) {
            case "s":
            case "str":
              p.push(t(g.v));
              break;
            case "n":
              g.f ? (p[2] = "vtf", p[3] = "n", p[4] = g.v, p[5] = t(g.f)) : (p[2] = "v", p[3] = g.v);
              break;
            case "b":
              p[2] = "vt" + (g.f ? "f" : "c"), p[3] = "nl", p[4] = g.v ? "1" : "0", p[5] = t(g.f || (g.v ? "TRUE" : "FALSE"));
              break;
            case "d":
              var B = Er(pr(g.v));
              p[2] = "vtc", p[3] = "nd", p[4] = "" + B, p[5] = g.w || tt(g.z || Ve[14], B);
              break;
            case "e":
              continue;
          }
          x.push(p.join(":"));
        }
    return x.push("sheet:c:" + (_.e.c - _.s.c + 1) + ":r:" + (_.e.r - _.s.r + 1) + ":tvf:1"), x.push("valueformat:1:text-wiki"), x.join(`
`);
  }
  function c(d) {
    return [i, s, f, s, l(d), o].join(`
`);
  }
  return {
    to_workbook: a,
    to_sheet: n,
    from_sheet: c
  };
}(), Ol = /* @__PURE__ */ function() {
  function e(c, d, x, p, g) {
    g.raw ? d[x][p] = c : c === "" || (c === "TRUE" ? d[x][p] = !0 : c === "FALSE" ? d[x][p] = !1 : isNaN(Yr(c)) ? isNaN(Qt(c).getDate()) ? d[x][p] = c : d[x][p] = pr(c) : d[x][p] = Yr(c));
  }
  function t(c, d) {
    var x = d || {}, p = [];
    if (!c || c.length === 0) return p;
    for (var g = c.split(/[\r\n]/), u = g.length - 1; u >= 0 && g[u].length === 0; ) --u;
    for (var _ = 10, k = 0, D = 0; D <= u; ++D)
      k = g[D].indexOf(" "), k == -1 ? k = g[D].length : k++, _ = Math.max(_, k);
    for (D = 0; D <= u; ++D) {
      p[D] = [];
      var C = 0;
      for (e(g[D].slice(0, _).trim(), p, D, C, x), C = 1; C <= (g[D].length - _) / 10 + 1; ++C)
        e(g[D].slice(_ + (C - 1) * 10, _ + C * 10).trim(), p, D, C, x);
    }
    return x.sheetRows && (p = p.slice(0, x.sheetRows)), p;
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
    for (var d = {}, x = !1, p = 0, g = 0; p < c.length; ++p)
      (g = c.charCodeAt(p)) == 34 ? x = !x : !x && g in r && (d[g] = (d[g] || 0) + 1);
    g = [];
    for (p in d) Object.prototype.hasOwnProperty.call(d, p) && g.push([d[p], p]);
    if (!g.length) {
      d = n;
      for (p in d) Object.prototype.hasOwnProperty.call(d, p) && g.push([d[p], p]);
    }
    return g.sort(function(u, _) {
      return u[0] - _[0] || n[u[1]] - n[_[1]];
    }), r[g.pop()[1]] || 44;
  }
  function i(c, d) {
    var x = d || {}, p = "", g = x.dense ? [] : {}, u = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    c.slice(0, 4) == "sep=" ? c.charCodeAt(5) == 13 && c.charCodeAt(6) == 10 ? (p = c.charAt(4), c = c.slice(7)) : c.charCodeAt(5) == 13 || c.charCodeAt(5) == 10 ? (p = c.charAt(4), c = c.slice(6)) : p = a(c.slice(0, 1024)) : x && x.FS ? p = x.FS : p = a(c.slice(0, 1024));
    var _ = 0, k = 0, D = 0, C = 0, B = 0, Y = p.charCodeAt(0), re = !1, O = 0, b = c.charCodeAt(0);
    c = c.replace(/\r\n/mg, `
`);
    var M = x.dateNF != null ? Gs(x.dateNF) : null;
    function X() {
      var K = c.slice(C, B), j = {};
      if (K.charAt(0) == '"' && K.charAt(K.length - 1) == '"' && (K = K.slice(1, -1).replace(/""/g, '"')), K.length === 0) j.t = "z";
      else if (x.raw)
        j.t = "s", j.v = K;
      else if (K.trim().length === 0)
        j.t = "s", j.v = K;
      else if (K.charCodeAt(0) == 61)
        K.charCodeAt(1) == 34 && K.charCodeAt(K.length - 1) == 34 ? (j.t = "s", j.v = K.slice(2, -1).replace(/""/g, '"')) : Co(K) ? (j.t = "n", j.f = K.slice(1)) : (j.t = "s", j.v = K);
      else if (K == "TRUE")
        j.t = "b", j.v = !0;
      else if (K == "FALSE")
        j.t = "b", j.v = !1;
      else if (!isNaN(D = Yr(K)))
        j.t = "n", x.cellText !== !1 && (j.w = K), j.v = D;
      else if (!isNaN(Qt(K).getDate()) || M && K.match(M)) {
        j.z = x.dateNF || Ve[14];
        var ne = 0;
        M && K.match(M) && (K = Xs(K, x.dateNF, K.match(M) || []), ne = 1), x.cellDates ? (j.t = "d", j.v = pr(K, ne)) : (j.t = "n", j.v = Er(pr(K, ne))), x.cellText !== !1 && (j.w = tt(j.z, j.v instanceof Date ? Er(j.v) : j.v)), x.cellNF || delete j.z;
      } else
        j.t = "s", j.v = K;
      if (j.t == "z" || (x.dense ? (g[_] || (g[_] = []), g[_][k] = j) : g[ke({ c: k, r: _ })] = j), C = B + 1, b = c.charCodeAt(C), u.e.c < k && (u.e.c = k), u.e.r < _ && (u.e.r = _), O == Y) ++k;
      else if (k = 0, ++_, x.sheetRows && x.sheetRows <= _) return !0;
    }
    e: for (; B < c.length; ++B) switch (O = c.charCodeAt(B)) {
      case 34:
        b === 34 && (re = !re);
        break;
      case Y:
      case 10:
      case 13:
        if (!re && X()) break e;
        break;
    }
    return B - C > 0 && X(), g["!ref"] = Xe(u), g;
  }
  function s(c, d) {
    return !(d && d.PRN) || d.FS || c.slice(0, 4) == "sep=" || c.indexOf("	") >= 0 || c.indexOf(",") >= 0 || c.indexOf(";") >= 0 ? i(c, d) : kt(t(c, d), d);
  }
  function f(c, d) {
    var x = "", p = d.type == "string" ? [0, 0, 0, 0] : Vh(c, d);
    switch (d.type) {
      case "base64":
        x = Jr(c);
        break;
      case "binary":
        x = c;
        break;
      case "buffer":
        d.codepage == 65001 ? x = c.toString("utf8") : d.codepage && typeof An < "u" || (x = Se && Buffer.isBuffer(c) ? c.toString("binary") : an(c));
        break;
      case "array":
        x = Hn(c);
        break;
      case "string":
        x = c;
        break;
      default:
        throw new Error("Unrecognized type " + d.type);
    }
    return p[0] == 239 && p[1] == 187 && p[2] == 191 ? x = zt(x.slice(3)) : d.type != "string" && d.type != "buffer" && d.codepage == 65001 ? x = zt(x) : d.type == "binary" && typeof An < "u", x.slice(0, 19) == "socialcalc:version:" ? vi.to_sheet(d.type == "string" ? x : zt(x), d) : s(x, d);
  }
  function o(c, d) {
    return xt(f(c, d), d);
  }
  function l(c) {
    for (var d = [], x = Me(c["!ref"]), p, g = Array.isArray(c), u = x.s.r; u <= x.e.r; ++u) {
      for (var _ = [], k = x.s.c; k <= x.e.c; ++k) {
        var D = ke({ r: u, c: k });
        if (p = g ? (c[u] || [])[k] : c[D], !p || p.v == null) {
          _.push("          ");
          continue;
        }
        for (var C = (p.w || (Zr(p), p.w) || "").slice(0, 10); C.length < 10; ) C += " ";
        _.push(C + (k === 0 ? " " : ""));
      }
      d.push(_.join(""));
    }
    return d.join(`
`);
  }
  return {
    to_workbook: o,
    to_sheet: f,
    from_sheet: l
  };
}(), la = /* @__PURE__ */ function() {
  function e(S, L, F) {
    if (S) {
      yr(S, S.l || 0);
      for (var A = F.Enum || ur; S.l < S.length; ) {
        var V = S.read_shift(2), ue = A[V] || A[65535], he = S.read_shift(2), ce = S.l + he, ae = ue.f && ue.f(S, he, F);
        if (S.l = ce, L(ae, ue, V)) return;
      }
    }
  }
  function t(S, L) {
    switch (L.type) {
      case "base64":
        return r(Mr(Jr(S)), L);
      case "binary":
        return r(Mr(S), L);
      case "buffer":
      case "array":
        return r(S, L);
    }
    throw "Unsupported type " + L.type;
  }
  function r(S, L) {
    if (!S) return S;
    var F = L || {}, A = F.dense ? [] : {}, V = "Sheet1", ue = "", he = 0, ce = {}, ae = [], Ae = [], _e = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, je = F.sheetRows || 0;
    if (S[2] == 0 && (S[3] == 8 || S[3] == 9) && S.length >= 16 && S[14] == 5 && S[15] === 108)
      throw new Error("Unsupported Works 3 for Mac file");
    if (S[2] == 2)
      F.Enum = ur, e(S, function(oe, mr, Sr) {
        switch (Sr) {
          case 0:
            F.vers = oe, oe >= 4096 && (F.qpro = !0);
            break;
          case 6:
            _e = oe;
            break;
          case 204:
            oe && (ue = oe);
            break;
          case 222:
            ue = oe;
            break;
          case 15:
          case 51:
            F.qpro || (oe[1].v = oe[1].v.slice(1));
          case 13:
          case 14:
          case 16:
            Sr == 14 && (oe[2] & 112) == 112 && (oe[2] & 15) > 1 && (oe[2] & 15) < 15 && (oe[1].z = F.dateNF || Ve[14], F.cellDates && (oe[1].t = "d", oe[1].v = Na(oe[1].v))), F.qpro && oe[3] > he && (A["!ref"] = Xe(_e), ce[V] = A, ae.push(V), A = F.dense ? [] : {}, _e = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, he = oe[3], V = ue || "Sheet" + (he + 1), ue = "");
            var Ur = F.dense ? (A[oe[0].r] || [])[oe[0].c] : A[ke(oe[0])];
            if (Ur) {
              Ur.t = oe[1].t, Ur.v = oe[1].v, oe[1].z != null && (Ur.z = oe[1].z), oe[1].f != null && (Ur.f = oe[1].f);
              break;
            }
            F.dense ? (A[oe[0].r] || (A[oe[0].r] = []), A[oe[0].r][oe[0].c] = oe[1]) : A[ke(oe[0])] = oe[1];
            break;
        }
      }, F);
    else if (S[2] == 26 || S[2] == 14)
      F.Enum = hr, S[2] == 14 && (F.qpro = !0, S.l = 0), e(S, function(oe, mr, Sr) {
        switch (Sr) {
          case 204:
            V = oe;
            break;
          case 22:
            oe[1].v = oe[1].v.slice(1);
          case 23:
          case 24:
          case 25:
          case 37:
          case 39:
          case 40:
            if (oe[3] > he && (A["!ref"] = Xe(_e), ce[V] = A, ae.push(V), A = F.dense ? [] : {}, _e = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, he = oe[3], V = "Sheet" + (he + 1)), je > 0 && oe[0].r >= je) break;
            F.dense ? (A[oe[0].r] || (A[oe[0].r] = []), A[oe[0].r][oe[0].c] = oe[1]) : A[ke(oe[0])] = oe[1], _e.e.c < oe[0].c && (_e.e.c = oe[0].c), _e.e.r < oe[0].r && (_e.e.r = oe[0].r);
            break;
          case 27:
            oe[14e3] && (Ae[oe[14e3][0]] = oe[14e3][1]);
            break;
          case 1537:
            Ae[oe[0]] = oe[1], oe[0] == he && (V = oe[1]);
            break;
        }
      }, F);
    else throw new Error("Unrecognized LOTUS BOF " + S[2]);
    if (A["!ref"] = Xe(_e), ce[ue || V] = A, ae.push(ue || V), !Ae.length) return { SheetNames: ae, Sheets: ce };
    for (var Ee = {}, Nr = [], Be = 0; Be < Ae.length; ++Be) ce[ae[Be]] ? (Nr.push(Ae[Be] || ae[Be]), Ee[Ae[Be]] = ce[Ae[Be]] || ce[ae[Be]]) : (Nr.push(Ae[Be]), Ee[Ae[Be]] = { "!ref": "A1" });
    return { SheetNames: Nr, Sheets: Ee };
  }
  function n(S, L) {
    var F = L || {};
    if (+F.codepage >= 0 && Zt(+F.codepage), F.type == "string") throw new Error("Cannot write WK1 to JS string");
    var A = Tr(), V = Me(S["!ref"]), ue = Array.isArray(S), he = [];
    ee(A, 0, i(1030)), ee(A, 6, o(V));
    for (var ce = Math.min(V.e.r, 8191), ae = V.s.r; ae <= ce; ++ae)
      for (var Ae = ar(ae), _e = V.s.c; _e <= V.e.c; ++_e) {
        ae === V.s.r && (he[_e] = or(_e));
        var je = he[_e] + Ae, Ee = ue ? (S[ae] || [])[_e] : S[je];
        if (!(!Ee || Ee.t == "z"))
          if (Ee.t == "n")
            (Ee.v | 0) == Ee.v && Ee.v >= -32768 && Ee.v <= 32767 ? ee(A, 13, p(ae, _e, Ee.v)) : ee(A, 14, u(ae, _e, Ee.v));
          else {
            var Nr = Zr(Ee);
            ee(A, 15, d(ae, _e, Nr.slice(0, 239)));
          }
      }
    return ee(A, 1), A.end();
  }
  function a(S, L) {
    var F = L || {};
    if (+F.codepage >= 0 && Zt(+F.codepage), F.type == "string") throw new Error("Cannot write WK3 to JS string");
    var A = Tr();
    ee(A, 0, s(S));
    for (var V = 0, ue = 0; V < S.SheetNames.length; ++V) (S.Sheets[S.SheetNames[V]] || {})["!ref"] && ee(A, 27, He(S.SheetNames[V], ue++));
    var he = 0;
    for (V = 0; V < S.SheetNames.length; ++V) {
      var ce = S.Sheets[S.SheetNames[V]];
      if (!(!ce || !ce["!ref"])) {
        for (var ae = Me(ce["!ref"]), Ae = Array.isArray(ce), _e = [], je = Math.min(ae.e.r, 8191), Ee = ae.s.r; Ee <= je; ++Ee)
          for (var Nr = ar(Ee), Be = ae.s.c; Be <= ae.e.c; ++Be) {
            Ee === ae.s.r && (_e[Be] = or(Be));
            var oe = _e[Be] + Nr, mr = Ae ? (ce[Ee] || [])[Be] : ce[oe];
            if (!(!mr || mr.t == "z"))
              if (mr.t == "n")
                ee(A, 23, X(Ee, Be, he, mr.v));
              else {
                var Sr = Zr(mr);
                ee(A, 22, O(Ee, Be, he, Sr.slice(0, 239)));
              }
          }
        ++he;
      }
    }
    return ee(A, 1), A.end();
  }
  function i(S) {
    var L = U(2);
    return L.write_shift(2, S), L;
  }
  function s(S) {
    var L = U(26);
    L.write_shift(2, 4096), L.write_shift(2, 4), L.write_shift(4, 0);
    for (var F = 0, A = 0, V = 0, ue = 0; ue < S.SheetNames.length; ++ue) {
      var he = S.SheetNames[ue], ce = S.Sheets[he];
      if (!(!ce || !ce["!ref"])) {
        ++V;
        var ae = kr(ce["!ref"]);
        F < ae.e.r && (F = ae.e.r), A < ae.e.c && (A = ae.e.c);
      }
    }
    return F > 8191 && (F = 8191), L.write_shift(2, F), L.write_shift(1, V), L.write_shift(1, A), L.write_shift(2, 0), L.write_shift(2, 0), L.write_shift(1, 1), L.write_shift(1, 2), L.write_shift(4, 0), L.write_shift(4, 0), L;
  }
  function f(S, L, F) {
    var A = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    return L == 8 && F.qpro ? (A.s.c = S.read_shift(1), S.l++, A.s.r = S.read_shift(2), A.e.c = S.read_shift(1), S.l++, A.e.r = S.read_shift(2), A) : (A.s.c = S.read_shift(2), A.s.r = S.read_shift(2), L == 12 && F.qpro && (S.l += 2), A.e.c = S.read_shift(2), A.e.r = S.read_shift(2), L == 12 && F.qpro && (S.l += 2), A.s.c == 65535 && (A.s.c = A.e.c = A.s.r = A.e.r = 0), A);
  }
  function o(S) {
    var L = U(8);
    return L.write_shift(2, S.s.c), L.write_shift(2, S.s.r), L.write_shift(2, S.e.c), L.write_shift(2, S.e.r), L;
  }
  function l(S, L, F) {
    var A = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0, 0];
    return F.qpro && F.vers != 20768 ? (A[0].c = S.read_shift(1), A[3] = S.read_shift(1), A[0].r = S.read_shift(2), S.l += 2) : (A[2] = S.read_shift(1), A[0].c = S.read_shift(2), A[0].r = S.read_shift(2)), A;
  }
  function c(S, L, F) {
    var A = S.l + L, V = l(S, L, F);
    if (V[1].t = "s", F.vers == 20768) {
      S.l++;
      var ue = S.read_shift(1);
      return V[1].v = S.read_shift(ue, "utf8"), V;
    }
    return F.qpro && S.l++, V[1].v = S.read_shift(A - S.l, "cstr"), V;
  }
  function d(S, L, F) {
    var A = U(7 + F.length);
    A.write_shift(1, 255), A.write_shift(2, L), A.write_shift(2, S), A.write_shift(1, 39);
    for (var V = 0; V < A.length; ++V) {
      var ue = F.charCodeAt(V);
      A.write_shift(1, ue >= 128 ? 95 : ue);
    }
    return A.write_shift(1, 0), A;
  }
  function x(S, L, F) {
    var A = l(S, L, F);
    return A[1].v = S.read_shift(2, "i"), A;
  }
  function p(S, L, F) {
    var A = U(7);
    return A.write_shift(1, 255), A.write_shift(2, L), A.write_shift(2, S), A.write_shift(2, F, "i"), A;
  }
  function g(S, L, F) {
    var A = l(S, L, F);
    return A[1].v = S.read_shift(8, "f"), A;
  }
  function u(S, L, F) {
    var A = U(13);
    return A.write_shift(1, 255), A.write_shift(2, L), A.write_shift(2, S), A.write_shift(8, F, "f"), A;
  }
  function _(S, L, F) {
    var A = S.l + L, V = l(S, L, F);
    if (V[1].v = S.read_shift(8, "f"), F.qpro) S.l = A;
    else {
      var ue = S.read_shift(2);
      B(S.slice(S.l, S.l + ue), V), S.l += ue;
    }
    return V;
  }
  function k(S, L, F) {
    var A = L & 32768;
    return L &= -32769, L = (A ? S : 0) + (L >= 8192 ? L - 16384 : L), (A ? "" : "$") + (F ? or(L) : ar(L));
  }
  var D = {
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
  function B(S, L) {
    yr(S, 0);
    for (var F = [], A = 0, V = "", ue = "", he = "", ce = ""; S.l < S.length; ) {
      var ae = S[S.l++];
      switch (ae) {
        case 0:
          F.push(S.read_shift(8, "f"));
          break;
        case 1:
          ue = k(L[0].c, S.read_shift(2), !0), V = k(L[0].r, S.read_shift(2), !1), F.push(ue + V);
          break;
        case 2:
          {
            var Ae = k(L[0].c, S.read_shift(2), !0), _e = k(L[0].r, S.read_shift(2), !1);
            ue = k(L[0].c, S.read_shift(2), !0), V = k(L[0].r, S.read_shift(2), !1), F.push(Ae + _e + ":" + ue + V);
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
            for (var je = ""; ae = S[S.l++]; ) je += String.fromCharCode(ae);
            F.push('"' + je.replace(/"/g, '""') + '"');
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
          ce = F.pop(), he = F.pop(), F.push(["AND", "OR"][ae - 20] + "(" + he + "," + ce + ")");
          break;
        default:
          if (ae < 32 && C[ae])
            ce = F.pop(), he = F.pop(), F.push(he + C[ae] + ce);
          else if (D[ae]) {
            if (A = D[ae][1], A == 69 && (A = S[S.l++]), A > F.length) {
              console.error("WK1 bad formula parse 0x" + ae.toString(16) + ":|" + F.join("|") + "|");
              return;
            }
            var Ee = F.slice(-A);
            F.length -= A, F.push(D[ae][0] + "(" + Ee.join(",") + ")");
          } else return ae <= 7 ? console.error("WK1 invalid opcode " + ae.toString(16)) : ae <= 24 ? console.error("WK1 unsupported op " + ae.toString(16)) : ae <= 30 ? console.error("WK1 invalid opcode " + ae.toString(16)) : ae <= 115 ? console.error("WK1 unsupported function opcode " + ae.toString(16)) : console.error("WK1 unrecognized opcode " + ae.toString(16));
      }
    }
    F.length == 1 ? L[1].f = "" + F[0] : console.error("WK1 bad formula parse |" + F.join("|") + "|");
  }
  function Y(S) {
    var L = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0];
    return L[0].r = S.read_shift(2), L[3] = S[S.l++], L[0].c = S[S.l++], L;
  }
  function re(S, L) {
    var F = Y(S);
    return F[1].t = "s", F[1].v = S.read_shift(L - 4, "cstr"), F;
  }
  function O(S, L, F, A) {
    var V = U(6 + A.length);
    V.write_shift(2, S), V.write_shift(1, F), V.write_shift(1, L), V.write_shift(1, 39);
    for (var ue = 0; ue < A.length; ++ue) {
      var he = A.charCodeAt(ue);
      V.write_shift(1, he >= 128 ? 95 : he);
    }
    return V.write_shift(1, 0), V;
  }
  function b(S, L) {
    var F = Y(S);
    F[1].v = S.read_shift(2);
    var A = F[1].v >> 1;
    if (F[1].v & 1)
      switch (A & 7) {
        case 0:
          A = (A >> 3) * 5e3;
          break;
        case 1:
          A = (A >> 3) * 500;
          break;
        case 2:
          A = (A >> 3) / 20;
          break;
        case 3:
          A = (A >> 3) / 200;
          break;
        case 4:
          A = (A >> 3) / 2e3;
          break;
        case 5:
          A = (A >> 3) / 2e4;
          break;
        case 6:
          A = (A >> 3) / 16;
          break;
        case 7:
          A = (A >> 3) / 64;
          break;
      }
    return F[1].v = A, F;
  }
  function M(S, L) {
    var F = Y(S), A = S.read_shift(4), V = S.read_shift(4), ue = S.read_shift(2);
    if (ue == 65535)
      return A === 0 && V === 3221225472 ? (F[1].t = "e", F[1].v = 15) : A === 0 && V === 3489660928 ? (F[1].t = "e", F[1].v = 42) : F[1].v = 0, F;
    var he = ue & 32768;
    return ue = (ue & 32767) - 16446, F[1].v = (1 - he * 2) * (V * Math.pow(2, ue + 32) + A * Math.pow(2, ue)), F;
  }
  function X(S, L, F, A) {
    var V = U(14);
    if (V.write_shift(2, S), V.write_shift(1, F), V.write_shift(1, L), A == 0)
      return V.write_shift(4, 0), V.write_shift(4, 0), V.write_shift(2, 65535), V;
    var ue = 0, he = 0, ce = 0, ae = 0;
    return A < 0 && (ue = 1, A = -A), he = Math.log2(A) | 0, A /= Math.pow(2, he - 31), ae = A >>> 0, ae & 2147483648 || (A /= 2, ++he, ae = A >>> 0), A -= ae, ae |= 2147483648, ae >>>= 0, A *= Math.pow(2, 32), ce = A >>> 0, V.write_shift(4, ce), V.write_shift(4, ae), he += 16383 + (ue ? 32768 : 0), V.write_shift(2, he), V;
  }
  function K(S, L) {
    var F = M(S);
    return S.l += L - 14, F;
  }
  function j(S, L) {
    var F = Y(S), A = S.read_shift(4);
    return F[1].v = A >> 6, F;
  }
  function ne(S, L) {
    var F = Y(S), A = S.read_shift(8, "f");
    return F[1].v = A, F;
  }
  function Te(S, L) {
    var F = ne(S);
    return S.l += L - 10, F;
  }
  function xe(S, L) {
    return S[S.l + L - 1] == 0 ? S.read_shift(L, "cstr") : "";
  }
  function Re(S, L) {
    var F = S[S.l++];
    F > L - 1 && (F = L - 1);
    for (var A = ""; A.length < F; ) A += String.fromCharCode(S[S.l++]);
    return A;
  }
  function de(S, L, F) {
    if (!(!F.qpro || L < 21)) {
      var A = S.read_shift(1);
      S.l += 17, S.l += 1, S.l += 2;
      var V = S.read_shift(L - 21, "cstr");
      return [A, V];
    }
  }
  function vr(S, L) {
    for (var F = {}, A = S.l + L; S.l < A; ) {
      var V = S.read_shift(2);
      if (V == 14e3) {
        for (F[V] = [0, ""], F[V][0] = S.read_shift(2); S[S.l]; )
          F[V][1] += String.fromCharCode(S[S.l]), S.l++;
        S.l++;
      }
    }
    return F;
  }
  function He(S, L) {
    var F = U(5 + S.length);
    F.write_shift(2, 14e3), F.write_shift(2, L);
    for (var A = 0; A < S.length; ++A) {
      var V = S.charCodeAt(A);
      F[F.l++] = V > 127 ? 95 : V;
    }
    return F[F.l++] = 0, F;
  }
  var ur = {
    /*::[*/
    0: { n: "BOF", f: ui },
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
    14: { n: "NUMBER", f: g },
    /*::[*/
    15: { n: "LABEL", f: c },
    /*::[*/
    16: { n: "FORMULA", f: _ },
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
    204: { n: "SHEETNAMECS", f: xe },
    /*::[*/
    222: { n: "SHEETNAMELP", f: Re },
    /*::[*/
    65535: { n: "" }
  }, hr = {
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
    22: { n: "LABEL16", f: re },
    /*::[*/
    23: { n: "NUMBER17", f: M },
    /*::[*/
    24: { n: "NUMBER18", f: b },
    /*::[*/
    25: { n: "FORMULA19", f: K },
    /*::[*/
    26: { n: "FORMULA1A" },
    /*::[*/
    27: { n: "XFORMAT", f: vr },
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
    37: { n: "NUMBER25", f: j },
    /*::[*/
    38: { n: "??" },
    /*::[*/
    39: { n: "NUMBER27", f: ne },
    /*::[*/
    40: { n: "FORMULA28", f: Te },
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
    sheet_to_wk1: n,
    book_to_wk3: a,
    to_workbook: t
  };
}(), kl = /^\s|\s$|[\t\n\r]/;
function mi(e, t) {
  if (!t.bookSST) return "";
  var r = [$e];
  r[r.length] = Q("sst", null, {
    xmlns: Ot[0],
    count: e.Count,
    uniqueCount: e.Unique
  });
  for (var n = 0; n != e.length; ++n)
    if (e[n] != null) {
      var a = e[n], i = "<si>";
      a.r ? i += a.r : (i += "<t", a.t || (a.t = ""), a.t.match(kl) && (i += ' xml:space="preserve"'), i += ">" + Oe(a.t) + "</t>"), i += "</si>", r[r.length] = i;
    }
  return r.length > 2 && (r[r.length] = "</sst>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Dl(e) {
  return [e.read_shift(4), e.read_shift(4)];
}
function Rl(e, t) {
  return t || (t = U(8)), t.write_shift(4, e.Count), t.write_shift(4, e.Unique), t;
}
var Il = wf;
function Nl(e) {
  var t = Tr();
  H(t, 159, Rl(e));
  for (var r = 0; r < e.length; ++r) H(t, 19, Il(e[r]));
  return H(
    t,
    160
    /* BrtEndSst */
  ), t.end();
}
function Pl(e) {
  for (var t = [], r = e.split(""), n = 0; n < r.length; ++n) t[n] = r[n].charCodeAt(0);
  return t;
}
function gi(e) {
  var t = 0, r, n = Pl(e), a = n.length + 1, i, s, f, o, l;
  for (r = ct(a), r[0] = n.length, i = 1; i != a; ++i) r[i] = n[i - 1];
  for (i = a - 1; i >= 0; --i)
    s = r[i], f = t & 16384 ? 1 : 0, o = t << 1 & 32767, l = f | o, t = l ^ s;
  return t ^ 52811;
}
var Ll = /* @__PURE__ */ function() {
  function e(a, i) {
    switch (i.type) {
      case "base64":
        return t(Jr(a), i);
      case "binary":
        return t(a, i);
      case "buffer":
        return t(Se && Buffer.isBuffer(a) ? a.toString("binary") : an(a), i);
      case "array":
        return t(Hn(a), i);
    }
    throw new Error("Unrecognized type " + i.type);
  }
  function t(a, i) {
    var s = i || {}, f = s.dense ? [] : {}, o = a.match(/\\trowd.*?\\row\b/g);
    if (!o.length) throw new Error("RTF missing table");
    var l = { s: { c: 0, r: 0 }, e: { c: 0, r: o.length - 1 } };
    return o.forEach(function(c, d) {
      Array.isArray(f) && (f[d] = []);
      for (var x = /\\\w+\b/g, p = 0, g, u = -1; g = x.exec(c); ) {
        switch (g[0]) {
          case "\\cell":
            var _ = c.slice(p, x.lastIndex - g[0].length);
            if (_[0] == " " && (_ = _.slice(1)), ++u, _.length) {
              var k = { v: _, t: "s" };
              Array.isArray(f) ? f[d][u] = k : f[ke({ r: d, c: u })] = k;
            }
            break;
        }
        p = x.lastIndex;
      }
      u > l.e.c && (l.e.c = u);
    }), f["!ref"] = Xe(l), f;
  }
  function r(a, i) {
    return xt(e(a, i), i);
  }
  function n(a) {
    for (var i = ["{\\rtf1\\ansi"], s = Me(a["!ref"]), f, o = Array.isArray(a), l = s.s.r; l <= s.e.r; ++l) {
      i.push("\\trowd\\trautofit1");
      for (var c = s.s.c; c <= s.e.c; ++c) i.push("\\cellx" + (c + 1));
      for (i.push("\\pard\\intbl"), c = s.s.c; c <= s.e.c; ++c) {
        var d = ke({ r: l, c });
        f = o ? (a[l] || [])[c] : a[d], !(!f || f.v == null && (!f.f || f.F)) && (i.push(" " + (f.w || (Zr(f), f.w))), i.push("\\cell"));
      }
      i.push("\\pard\\intbl\\row");
    }
    return i.join("") + "}";
  }
  return {
    to_workbook: r,
    to_sheet: e,
    from_sheet: n
  };
}();
function oa(e) {
  for (var t = 0, r = 1; t != 3; ++t) r = r * 256 + (e[t] > 255 ? 255 : e[t] < 0 ? 0 : e[t]);
  return r.toString(16).toUpperCase().slice(1);
}
var Ml = 6, jr = Ml;
function Nn(e) {
  return Math.floor((e + Math.round(128 / jr) / 256) * jr);
}
function Pn(e) {
  return Math.floor((e - 5) / jr * 100 + 0.5) / 100;
}
function f0(e) {
  return Math.round((e * jr + 5) / jr * 256) / 256;
}
function S0(e) {
  e.width ? (e.wpx = Nn(e.width), e.wch = Pn(e.wpx), e.MDW = jr) : e.wpx ? (e.wch = Pn(e.wpx), e.width = f0(e.wch), e.MDW = jr) : typeof e.wch == "number" && (e.width = f0(e.wch), e.wpx = Nn(e.width), e.MDW = jr), e.customWidth && delete e.customWidth;
}
var Bl = 96, _i = Bl;
function Ln(e) {
  return e * 96 / _i;
}
function Ti(e) {
  return e * _i / 96;
}
function bl(e) {
  var t = ["<numFmts>"];
  return [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(r) {
    for (var n = r[0]; n <= r[1]; ++n) e[n] != null && (t[t.length] = Q("numFmt", null, { numFmtId: n, formatCode: Oe(e[n]) }));
  }), t.length === 1 ? "" : (t[t.length] = "</numFmts>", t[0] = Q("numFmts", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
function Ul(e) {
  var t = [];
  return t[t.length] = Q("cellXfs", null), e.forEach(function(r) {
    t[t.length] = Q("xf", null, r);
  }), t[t.length] = "</cellXfs>", t.length === 2 ? "" : (t[0] = Q("cellXfs", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
function Ei(e, t) {
  var r = [$e, Q("styleSheet", null, {
    xmlns: Ot[0],
    "xmlns:vt": Ze.vt
  })], n;
  return e.SSF && (n = bl(e.SSF)) != null && (r[r.length] = n), r[r.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>', r[r.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>', r[r.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>', r[r.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>', (n = Ul(t.cellXfs)) && (r[r.length] = n), r[r.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>', r[r.length] = '<dxfs count="0"/>', r[r.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>', r.length > 2 && (r[r.length] = "</styleSheet>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Wl(e, t) {
  var r = e.read_shift(2), n = cr(e);
  return [r, n];
}
function Vl(e, t, r) {
  r || (r = U(6 + 4 * t.length)), r.write_shift(2, e), Qe(t, r);
  var n = r.length > r.l ? r.slice(0, r.l) : r;
  return r.l == null && (r.l = r.length), n;
}
function Hl(e, t, r) {
  var n = {};
  n.sz = e.read_shift(2) / 20;
  var a = kf(e);
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
  var o = e.read_shift(1);
  switch (o > 0 && (n.charset = o), e.l++, n.color = Of(e), e.read_shift(1)) {
    case 1:
      n.scheme = "major";
      break;
    case 2:
      n.scheme = "minor";
      break;
  }
  return n.name = cr(e), n;
}
function Gl(e, t) {
  t || (t = U(25 + 4 * 32)), t.write_shift(2, e.sz * 20), Df(e, t), t.write_shift(2, e.bold ? 700 : 400);
  var r = 0;
  e.vertAlign == "superscript" ? r = 1 : e.vertAlign == "subscript" && (r = 2), t.write_shift(2, r), t.write_shift(1, e.underline || 0), t.write_shift(1, e.family || 0), t.write_shift(1, e.charset || 0), t.write_shift(1, 0), Rn(e.color, t);
  var n = 0;
  return n = 2, t.write_shift(1, n), Qe(e.name, t), t.length > t.l ? t.slice(0, t.l) : t;
}
var Xl = [
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
], Qn, $l = Gr;
function ca(e, t) {
  t || (t = U(4 * 3 + 8 * 7 + 16 * 1)), Qn || (Qn = u0(Xl));
  var r = Qn[e.patternType];
  r == null && (r = 40), t.write_shift(4, r);
  var n = 0;
  if (r != 40)
    for (Rn({ auto: 1 }, t), Rn({ auto: 1 }, t); n < 12; ++n) t.write_shift(4, 0);
  else {
    for (; n < 4; ++n) t.write_shift(4, 0);
    for (; n < 12; ++n) t.write_shift(4, 0);
  }
  return t.length > t.l ? t.slice(0, t.l) : t;
}
function zl(e, t) {
  var r = e.l + t, n = e.read_shift(2), a = e.read_shift(2);
  return e.l = r, { ixfe: n, numFmtId: a };
}
function wi(e, t, r) {
  r || (r = U(16)), r.write_shift(2, t || 0), r.write_shift(2, e.numFmtId || 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(1, 0), r.write_shift(1, 0);
  var n = 0;
  return r.write_shift(1, n), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(1, 0), r;
}
function Ht(e, t) {
  return t || (t = U(10)), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var Kl = Gr;
function Yl(e, t) {
  return t || (t = U(51)), t.write_shift(1, 0), Ht(null, t), Ht(null, t), Ht(null, t), Ht(null, t), Ht(null, t), t.length > t.l ? t.slice(0, t.l) : t;
}
function jl(e, t) {
  return t || (t = U(12 + 4 * 10)), t.write_shift(4, e.xfId), t.write_shift(2, 1), t.write_shift(1, 0), t.write_shift(1, 0), Dn(e.name || "", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Jl(e, t, r) {
  var n = U(2052);
  return n.write_shift(4, e), Dn(t, n), Dn(r, n), n.length > n.l ? n.slice(0, n.l) : n;
}
function Zl(e, t) {
  if (t) {
    var r = 0;
    [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a) t[a] != null && ++r;
    }), r != 0 && (H(e, 615, br(r)), [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a) t[a] != null && H(e, 44, Vl(a, t[a]));
    }), H(
      e,
      616
      /* BrtEndFmts */
    ));
  }
}
function ql(e) {
  var t = 1;
  H(e, 611, br(t)), H(e, 43, Gl({
    sz: 12,
    color: { theme: 1 },
    name: "Calibri",
    family: 2
  })), H(
    e,
    612
    /* BrtEndFonts */
  );
}
function Ql(e) {
  var t = 2;
  H(e, 603, br(t)), H(e, 45, ca({ patternType: "none" })), H(e, 45, ca({ patternType: "gray125" })), H(
    e,
    604
    /* BrtEndFills */
  );
}
function eo(e) {
  var t = 1;
  H(e, 613, br(t)), H(e, 46, Yl()), H(
    e,
    614
    /* BrtEndBorders */
  );
}
function ro(e) {
  var t = 1;
  H(e, 626, br(t)), H(e, 47, wi({
    numFmtId: 0
  }, 65535)), H(
    e,
    627
    /* BrtEndCellStyleXFs */
  );
}
function to(e, t) {
  H(e, 617, br(t.length)), t.forEach(function(r) {
    H(e, 47, wi(r, 0));
  }), H(
    e,
    618
    /* BrtEndCellXFs */
  );
}
function no(e) {
  var t = 1;
  H(e, 619, br(t)), H(e, 48, jl({
    xfId: 0,
    name: "Normal"
  })), H(
    e,
    620
    /* BrtEndStyles */
  );
}
function ao(e) {
  var t = 0;
  H(e, 505, br(t)), H(
    e,
    506
    /* BrtEndDXFs */
  );
}
function io(e) {
  var t = 0;
  H(e, 508, Jl(t, "TableStyleMedium9", "PivotStyleMedium4")), H(
    e,
    509
    /* BrtEndTableStyles */
  );
}
function so(e, t) {
  var r = Tr();
  return H(
    r,
    278
    /* BrtBeginStyleSheet */
  ), Zl(r, e.SSF), ql(r), Ql(r), eo(r), ro(r), to(r, t.cellXfs), no(r), ao(r), io(r), H(
    r,
    279
    /* BrtEndStyleSheet */
  ), r.end();
}
function Si(e, t) {
  if (t && t.themeXLSX) return t.themeXLSX;
  if (e && typeof e.raw == "string") return e.raw;
  var r = [$e];
  return r[r.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">', r[r.length] = "<a:themeElements>", r[r.length] = '<a:clrScheme name="Office">', r[r.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>', r[r.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>', r[r.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>', r[r.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>', r[r.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>', r[r.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>', r[r.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>', r[r.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>', r[r.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>', r[r.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>', r[r.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>', r[r.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>', r[r.length] = "</a:clrScheme>", r[r.length] = '<a:fontScheme name="Office">', r[r.length] = "<a:majorFont>", r[r.length] = '<a:latin typeface="Cambria"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Hebr" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="MoolBoran"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:majorFont>", r[r.length] = "<a:minorFont>", r[r.length] = '<a:latin typeface="Calibri"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Arial"/>', r[r.length] = '<a:font script="Hebr" typeface="Arial"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="DaunPenh"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Arial"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:minorFont>", r[r.length] = "</a:fontScheme>", r[r.length] = '<a:fmtScheme name="Office">', r[r.length] = "<a:fillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="1"/>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="0"/>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:fillStyleLst>", r[r.length] = "<a:lnStyleLst>", r[r.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = "</a:lnStyleLst>", r[r.length] = "<a:effectStyleLst>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>', r[r.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>', r[r.length] = "</a:effectStyle>", r[r.length] = "</a:effectStyleLst>", r[r.length] = "<a:bgFillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:bgFillStyleLst>", r[r.length] = "</a:fmtScheme>", r[r.length] = "</a:themeElements>", r[r.length] = "<a:objectDefaults>", r[r.length] = "<a:spDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>', r[r.length] = "</a:spDef>", r[r.length] = "<a:lnDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>', r[r.length] = "</a:lnDef>", r[r.length] = "</a:objectDefaults>", r[r.length] = "<a:extraClrSchemeLst/>", r[r.length] = "</a:theme>", r.join("");
}
function fo(e, t) {
  return {
    flags: e.read_shift(4),
    version: e.read_shift(4),
    name: cr(e)
  };
}
function lo(e) {
  var t = U(12 + 2 * e.name.length);
  return t.write_shift(4, e.flags), t.write_shift(4, e.version), Qe(e.name, t), t.slice(0, t.l);
}
function oo(e) {
  for (var t = [], r = e.read_shift(4); r-- > 0; )
    t.push([e.read_shift(4), e.read_shift(4)]);
  return t;
}
function co(e) {
  var t = U(4 + 8 * e.length);
  t.write_shift(4, e.length);
  for (var r = 0; r < e.length; ++r)
    t.write_shift(4, e[r][0]), t.write_shift(4, e[r][1]);
  return t;
}
function uo(e, t) {
  var r = U(8 + 2 * t.length);
  return r.write_shift(4, e), Qe(t, r), r.slice(0, r.l);
}
function ho(e) {
  return e.l += 4, e.read_shift(4) != 0;
}
function xo(e, t) {
  var r = U(8);
  return r.write_shift(4, e), r.write_shift(4, 1), r;
}
function po() {
  var e = Tr();
  return H(e, 332), H(e, 334, br(1)), H(e, 335, lo({
    name: "XLDAPR",
    version: 12e4,
    flags: 3496657072
  })), H(e, 336), H(e, 339, uo(1, "XLDAPR")), H(e, 52), H(e, 35, br(514)), H(e, 4096, br(0)), H(e, 4097, Rr(1)), H(e, 36), H(e, 53), H(e, 340), H(e, 337, xo(1)), H(e, 51, co([[1, 0]])), H(e, 338), H(e, 333), e.end();
}
function Ai() {
  var e = [$e];
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
function vo(e) {
  var t = {};
  t.i = e.read_shift(4);
  var r = {};
  r.r = e.read_shift(4), r.c = e.read_shift(4), t.r = ke(r);
  var n = e.read_shift(1);
  return n & 2 && (t.l = "1"), n & 8 && (t.a = "1"), t;
}
var wt = 1024;
function Fi(e, t) {
  for (var r = [21600, 21600], n = ["m0,0l0", r[1], r[0], r[1], r[0], "0xe"].join(","), a = [
    Q("xml", null, { "xmlns:v": Cr.v, "xmlns:o": Cr.o, "xmlns:x": Cr.x, "xmlns:mv": Cr.mv }).replace(/\/>/, ">"),
    Q("o:shapelayout", Q("o:idmap", null, { "v:ext": "edit", data: e }), { "v:ext": "edit" }),
    Q("v:shapetype", [
      Q("v:stroke", null, { joinstyle: "miter" }),
      Q("v:path", null, { gradientshapeok: "t", "o:connecttype": "rect" })
    ].join(""), { id: "_x0000_t202", "o:spt": 202, coordsize: r.join(","), path: n })
  ]; wt < e * 1e3; ) wt += 1e3;
  return t.forEach(function(i) {
    var s = qe(i[0]), f = (
      /*::(*/
      { color2: "#BEFF82", type: "gradient" }
    );
    f.type == "gradient" && (f.angle = "-180");
    var o = f.type == "gradient" ? Q("o:fill", null, { type: "gradientUnscaled", "v:ext": "view" }) : null, l = Q("v:fill", o, f), c = { on: "t", obscured: "t" };
    ++wt, a = a.concat([
      "<v:shape" + rn({
        id: "_x0000_s" + wt,
        type: "#_x0000_t202",
        style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" + (i[1].hidden ? ";visibility:hidden" : ""),
        fillcolor: "#ECFAD4",
        strokecolor: "#edeaa1"
      }) + ">",
      l,
      Q("v:shadow", null, c),
      Q("v:path", null, { "o:connecttype": "none" }),
      '<v:textbox><div style="text-align:left"></div></v:textbox>',
      '<x:ClientData ObjectType="Note">',
      "<x:MoveWithCells/>",
      "<x:SizeWithCells/>",
      /* Part 4 19.4.2.3 Anchor (Anchor) */
      nr("x:Anchor", [s.c + 1, 0, s.r + 1, 0, s.c + 3, 20, s.r + 5, 20].join(",")),
      nr("x:AutoFill", "False"),
      nr("x:Row", String(s.r)),
      nr("x:Column", String(s.c)),
      i[1].hidden ? "" : "<x:Visible/>",
      "</x:ClientData>",
      "</v:shape>"
    ]);
  }), a.push("</xml>"), a.join("");
}
function yi(e) {
  var t = [$e, Q("comments", null, { xmlns: Ot[0] })], r = [];
  return t.push("<authors>"), e.forEach(function(n) {
    n[1].forEach(function(a) {
      var i = Oe(a.a);
      r.indexOf(i) == -1 && (r.push(i), t.push("<author>" + i + "</author>")), a.T && a.ID && r.indexOf("tc=" + a.ID) == -1 && (r.push("tc=" + a.ID), t.push("<author>tc=" + a.ID + "</author>"));
    });
  }), r.length == 0 && (r.push("SheetJ5"), t.push("<author>SheetJ5</author>")), t.push("</authors>"), t.push("<commentList>"), e.forEach(function(n) {
    var a = 0, i = [];
    if (n[1][0] && n[1][0].T && n[1][0].ID ? a = r.indexOf("tc=" + n[1][0].ID) : n[1].forEach(function(o) {
      o.a && (a = r.indexOf(Oe(o.a))), i.push(o.t || "");
    }), t.push('<comment ref="' + n[0] + '" authorId="' + a + '"><text>'), i.length <= 1) t.push(nr("t", Oe(i[0] || "")));
    else {
      for (var s = `Comment:
    ` + i[0] + `
`, f = 1; f < i.length; ++f) s += `Reply:
    ` + i[f] + `
`;
      t.push(nr("t", Oe(s)));
    }
    t.push("</text></comment>");
  }), t.push("</commentList>"), t.length > 2 && (t[t.length] = "</comments>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function mo(e, t, r) {
  var n = [$e, Q("ThreadedComments", null, { xmlns: Ze.TCMNT }).replace(/[\/]>/, ">")];
  return e.forEach(function(a) {
    var i = "";
    (a[1] || []).forEach(function(s, f) {
      if (!s.T) {
        delete s.ID;
        return;
      }
      s.a && t.indexOf(s.a) == -1 && t.push(s.a);
      var o = {
        ref: a[0],
        id: "{54EE7951-7262-4200-6969-" + ("000000000000" + r.tcid++).slice(-12) + "}"
      };
      f == 0 ? i = o.id : o.parentId = i, s.ID = o.id, s.a && (o.personId = "{54EE7950-7262-4200-6969-" + ("000000000000" + t.indexOf(s.a)).slice(-12) + "}"), n.push(Q("threadedComment", nr("text", s.t || ""), o));
    });
  }), n.push("</ThreadedComments>"), n.join("");
}
function go(e) {
  var t = [$e, Q("personList", null, {
    xmlns: Ze.TCMNT,
    "xmlns:x": Ot[0]
  }).replace(/[\/]>/, ">")];
  return e.forEach(function(r, n) {
    t.push(Q("person", null, {
      displayName: r,
      id: "{54EE7950-7262-4200-6969-" + ("000000000000" + n).slice(-12) + "}",
      userId: r,
      providerId: "None"
    }));
  }), t.push("</personList>"), t.join("");
}
function _o(e) {
  var t = {};
  t.iauthor = e.read_shift(4);
  var r = mt(e);
  return t.rfx = r.s, t.ref = ke(r.s), e.l += 16, t;
}
function To(e, t) {
  return t == null && (t = U(36)), t.write_shift(4, e[1].iauthor), Dt(e[0], t), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var Eo = cr;
function wo(e) {
  return Qe(e.slice(0, 54));
}
function So(e) {
  var t = Tr(), r = [];
  return H(
    t,
    628
    /* BrtBeginComments */
  ), H(
    t,
    630
    /* BrtBeginCommentAuthors */
  ), e.forEach(function(n) {
    n[1].forEach(function(a) {
      r.indexOf(a.a) > -1 || (r.push(a.a.slice(0, 54)), H(t, 632, wo(a.a)));
    });
  }), H(
    t,
    631
    /* BrtEndCommentAuthors */
  ), H(
    t,
    633
    /* BrtBeginCommentList */
  ), e.forEach(function(n) {
    n[1].forEach(function(a) {
      a.iauthor = r.indexOf(a.a);
      var i = { s: qe(n[0]), e: qe(n[0]) };
      H(t, 635, To([i, a])), a.t && a.t.length > 0 && H(t, 637, Af(a)), H(
        t,
        636
        /* BrtEndComment */
      ), delete a.iauthor;
    });
  }), H(
    t,
    634
    /* BrtEndCommentList */
  ), H(
    t,
    629
    /* BrtEndComments */
  ), t.end();
}
function Ao(e, t) {
  t.FullPaths.forEach(function(r, n) {
    if (n != 0) {
      var a = r.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
      a.slice(-1) !== "/" && De.utils.cfb_add(e, a, t.FileIndex[n].content);
    }
  });
}
var Ci = ["xlsb", "xlsm", "xlam", "biff8", "xla"], Fo = /* @__PURE__ */ function() {
  var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g, t = { r: 0, c: 0 };
  function r(n, a, i, s) {
    var f = !1, o = !1;
    i.length == 0 ? o = !0 : i.charAt(0) == "[" && (o = !0, i = i.slice(1, -1)), s.length == 0 ? f = !0 : s.charAt(0) == "[" && (f = !0, s = s.slice(1, -1));
    var l = i.length > 0 ? parseInt(i, 10) | 0 : 0, c = s.length > 0 ? parseInt(s, 10) | 0 : 0;
    return f ? c += t.c : --c, o ? l += t.r : --l, a + (f ? "" : "$") + or(c) + (o ? "" : "$") + ar(l);
  }
  return function(a, i) {
    return t = i, a.replace(e, r);
  };
}(), A0 = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g, F0 = /* @__PURE__ */ function() {
  return function(t, r) {
    return t.replace(A0, function(n, a, i, s, f, o) {
      var l = g0(s) - (i ? 0 : r.c), c = m0(o) - (f ? 0 : r.r), d = c == 0 ? "" : f ? c + 1 : "[" + c + "]", x = l == 0 ? "" : i ? l + 1 : "[" + l + "]";
      return a + "R" + d + "C" + x;
    });
  };
}();
function yo(e, t) {
  return e.replace(A0, function(r, n, a, i, s, f) {
    return n + (a == "$" ? a + i : or(g0(i) + t.c)) + (s == "$" ? s + f : ar(m0(f) + t.r));
  });
}
function Co(e) {
  return e.length != 1;
}
function Ge(e) {
  e.l += 1;
}
function nt(e, t) {
  var r = e.read_shift(2);
  return [r & 16383, r >> 14 & 1, r >> 15 & 1];
}
function Oi(e, t, r) {
  var n = 2;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5) return ki(e);
    r.biff == 12 && (n = 4);
  }
  var a = e.read_shift(n), i = e.read_shift(n), s = nt(e), f = nt(e);
  return { s: { r: a, c: s[0], cRel: s[1], rRel: s[2] }, e: { r: i, c: f[0], cRel: f[1], rRel: f[2] } };
}
function ki(e) {
  var t = nt(e), r = nt(e), n = e.read_shift(1), a = e.read_shift(1);
  return { s: { r: t[0], c: n, cRel: t[1], rRel: t[2] }, e: { r: r[0], c: a, cRel: r[1], rRel: r[2] } };
}
function Oo(e, t, r) {
  if (r.biff < 8) return ki(e);
  var n = e.read_shift(r.biff == 12 ? 4 : 2), a = e.read_shift(r.biff == 12 ? 4 : 2), i = nt(e), s = nt(e);
  return { s: { r: n, c: i[0], cRel: i[1], rRel: i[2] }, e: { r: a, c: s[0], cRel: s[1], rRel: s[2] } };
}
function Di(e, t, r) {
  if (r && r.biff >= 2 && r.biff <= 5) return ko(e);
  var n = e.read_shift(r && r.biff == 12 ? 4 : 2), a = nt(e);
  return { r: n, c: a[0], cRel: a[1], rRel: a[2] };
}
function ko(e) {
  var t = nt(e), r = e.read_shift(1);
  return { r: t[0], c: r, cRel: t[1], rRel: t[2] };
}
function Do(e) {
  var t = e.read_shift(2), r = e.read_shift(2);
  return { r: t, c: r & 255, fQuoted: !!(r & 16384), cRel: r >> 15, rRel: r >> 15 };
}
function Ro(e, t, r) {
  var n = r && r.biff ? r.biff : 8;
  if (n >= 2 && n <= 5) return Io(e);
  var a = e.read_shift(n >= 12 ? 4 : 2), i = e.read_shift(2), s = (i & 16384) >> 14, f = (i & 32768) >> 15;
  if (i &= 16383, f == 1) for (; a > 524287; ) a -= 1048576;
  if (s == 1) for (; i > 8191; ) i = i - 16384;
  return { r: a, c: i, cRel: s, rRel: f };
}
function Io(e) {
  var t = e.read_shift(2), r = e.read_shift(1), n = (t & 32768) >> 15, a = (t & 16384) >> 14;
  return t &= 16383, n == 1 && t >= 8192 && (t = t - 16384), a == 1 && r >= 128 && (r = r - 256), { r: t, c: r, cRel: a, rRel: n };
}
function No(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = Oi(e, r.biff >= 2 && r.biff <= 5 ? 6 : 8, r);
  return [n, a];
}
function Po(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = e.read_shift(2, "i"), i = 8;
  if (r) switch (r.biff) {
    case 5:
      e.l += 12, i = 6;
      break;
    case 12:
      i = 12;
      break;
  }
  var s = Oi(e, i, r);
  return [n, a, s];
}
function Lo(e, t, r) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += r && r.biff > 8 ? 12 : r.biff < 8 ? 6 : 8, [n];
}
function Mo(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = e.read_shift(2), i = 8;
  if (r) switch (r.biff) {
    case 5:
      e.l += 12, i = 6;
      break;
    case 12:
      i = 12;
      break;
  }
  return e.l += i, [n, a];
}
function Bo(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = Oo(e, t - 1, r);
  return [n, a];
}
function bo(e, t, r) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += r.biff == 2 ? 6 : r.biff == 12 ? 14 : 7, [n];
}
function ua(e) {
  var t = e[e.l + 1] & 1, r = 1;
  return e.l += 4, [t, r];
}
function Uo(e, t, r) {
  e.l += 2;
  for (var n = e.read_shift(r && r.biff == 2 ? 1 : 2), a = [], i = 0; i <= n; ++i) a.push(e.read_shift(r && r.biff == 2 ? 1 : 2));
  return a;
}
function Wo(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function Vo(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function Ho(e) {
  var t = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [t, e.read_shift(2)];
}
function Go(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += r && r.biff == 2 ? 3 : 4, [n];
}
function Ri(e) {
  var t = e.read_shift(1), r = e.read_shift(1);
  return [t, r];
}
function Xo(e) {
  return e.read_shift(2), Ri(e);
}
function $o(e) {
  return e.read_shift(2), Ri(e);
}
function zo(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = Di(e, 0, r);
  return [n, a];
}
function Ko(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = Ro(e, 0, r);
  return [n, a];
}
function Yo(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(2);
  r && r.biff == 5 && (e.l += 12);
  var i = Di(e, 0, r);
  return [n, a, i];
}
function jo(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(r && r.biff <= 3 ? 1 : 2);
  return [jc[a], Pi[a], n];
}
function Jo(e, t, r) {
  var n = e[e.l++], a = e.read_shift(1), i = r && r.biff <= 3 ? [n == 88 ? -1 : 0, e.read_shift(1)] : Zo(e);
  return [a, (i[0] === 0 ? Pi : Yc)[i[1]]];
}
function Zo(e) {
  return [e[e.l + 1] >> 7, e.read_shift(2) & 32767];
}
function qo(e, t, r) {
  e.l += r && r.biff == 2 ? 3 : 4;
}
function Qo(e, t, r) {
  if (e.l++, r && r.biff == 12) return [e.read_shift(4, "i"), 0];
  var n = e.read_shift(2), a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function ec(e) {
  return e.l++, ln[e.read_shift(1)];
}
function rc(e) {
  return e.l++, e.read_shift(2);
}
function tc(e) {
  return e.l++, e.read_shift(1) !== 0;
}
function nc(e) {
  return e.l++, Rt(e);
}
function ac(e, t, r) {
  return e.l++, xi(e, t - 1, r);
}
function ic(e, t) {
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
      r[1] = Kf(e, 1) ? "TRUE" : "FALSE", t != 12 && (e.l += 7);
      break;
    case 37:
    case 16:
      r[1] = ln[e[e.l]], e.l += t == 12 ? 4 : 8;
      break;
    case 0:
      e.l += 8;
      break;
    case 1:
      r[1] = Rt(e);
      break;
    case 2:
      r[1] = Zf(e, 0, { biff: t > 0 && t < 8 ? 2 : t });
      break;
    default:
      throw new Error("Bad SerAr: " + r[0]);
  }
  return r;
}
function sc(e, t, r) {
  for (var n = e.read_shift(r.biff == 12 ? 4 : 2), a = [], i = 0; i != n; ++i) a.push((r.biff == 12 ? mt : el)(e));
  return a;
}
function fc(e, t, r) {
  var n = 0, a = 0;
  r.biff == 12 ? (n = e.read_shift(4), a = e.read_shift(4)) : (a = 1 + e.read_shift(1), n = 1 + e.read_shift(2)), r.biff >= 2 && r.biff < 8 && (--n, --a == 0 && (a = 256));
  for (var i = 0, s = []; i != n && (s[i] = []); ++i)
    for (var f = 0; f != a; ++f) s[i][f] = ic(e, r.biff);
  return s;
}
function lc(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3, a = !r || r.biff >= 8 ? 4 : 2, i = e.read_shift(a);
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
  return [n, 0, i];
}
function oc(e, t, r) {
  if (r.biff == 5) return cc(e);
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(2), i = e.read_shift(4);
  return [n, a, i];
}
function cc(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2, "i");
  e.l += 8;
  var n = e.read_shift(2);
  return e.l += 12, [t, r, n];
}
function uc(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3;
  e.l += r && r.biff == 2 ? 3 : 4;
  var a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function hc(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function xc(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3;
  return e.l += 4, r.biff < 8 && e.l--, r.biff == 12 && (e.l += 2), [n];
}
function dc(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = e.read_shift(2), i = 4;
  if (r) switch (r.biff) {
    case 5:
      i = 15;
      break;
    case 12:
      i = 6;
      break;
  }
  return e.l += i, [n, a];
}
var pc = Gr, vc = Gr, mc = Gr;
function on(e, t, r) {
  return e.l += 2, [Do(e)];
}
function y0(e) {
  return e.l += 6, [];
}
var gc = on, _c = y0, Tc = y0, Ec = on;
function Ii(e) {
  return e.l += 2, [ui(e), e.read_shift(2) & 1];
}
var wc = on, Sc = Ii, Ac = y0, Fc = on, yc = on, Cc = [
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
function Oc(e) {
  e.l += 2;
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(4), a = e.read_shift(2), i = e.read_shift(2), s = Cc[r >> 2 & 31];
  return { ixti: t, coltype: r & 3, rt: s, idx: n, c: a, C: i };
}
function kc(e) {
  return e.l += 2, [e.read_shift(4)];
}
function Dc(e, t, r) {
  return e.l += 5, e.l += 2, e.l += r.biff == 2 ? 1 : 4, ["PTGSHEET"];
}
function Rc(e, t, r) {
  return e.l += r.biff == 2 ? 4 : 5, ["PTGENDSHEET"];
}
function Ic(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function Nc(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function Pc(e) {
  return e.l += 4, [0, 0];
}
var ha = {
  /*::[*/
  1: { n: "PtgExp", f: Qo },
  /*::[*/
  2: { n: "PtgTbl", f: mc },
  /*::[*/
  3: { n: "PtgAdd", f: Ge },
  /*::[*/
  4: { n: "PtgSub", f: Ge },
  /*::[*/
  5: { n: "PtgMul", f: Ge },
  /*::[*/
  6: { n: "PtgDiv", f: Ge },
  /*::[*/
  7: { n: "PtgPower", f: Ge },
  /*::[*/
  8: { n: "PtgConcat", f: Ge },
  /*::[*/
  9: { n: "PtgLt", f: Ge },
  /*::[*/
  10: { n: "PtgLe", f: Ge },
  /*::[*/
  11: { n: "PtgEq", f: Ge },
  /*::[*/
  12: { n: "PtgGe", f: Ge },
  /*::[*/
  13: { n: "PtgGt", f: Ge },
  /*::[*/
  14: { n: "PtgNe", f: Ge },
  /*::[*/
  15: { n: "PtgIsect", f: Ge },
  /*::[*/
  16: { n: "PtgUnion", f: Ge },
  /*::[*/
  17: { n: "PtgRange", f: Ge },
  /*::[*/
  18: { n: "PtgUplus", f: Ge },
  /*::[*/
  19: { n: "PtgUminus", f: Ge },
  /*::[*/
  20: { n: "PtgPercent", f: Ge },
  /*::[*/
  21: { n: "PtgParen", f: Ge },
  /*::[*/
  22: { n: "PtgMissArg", f: Ge },
  /*::[*/
  23: { n: "PtgStr", f: ac },
  /*::[*/
  26: { n: "PtgSheet", f: Dc },
  /*::[*/
  27: { n: "PtgEndSheet", f: Rc },
  /*::[*/
  28: { n: "PtgErr", f: ec },
  /*::[*/
  29: { n: "PtgBool", f: tc },
  /*::[*/
  30: { n: "PtgInt", f: rc },
  /*::[*/
  31: { n: "PtgNum", f: nc },
  /*::[*/
  32: { n: "PtgArray", f: bo },
  /*::[*/
  33: { n: "PtgFunc", f: jo },
  /*::[*/
  34: { n: "PtgFuncVar", f: Jo },
  /*::[*/
  35: { n: "PtgName", f: lc },
  /*::[*/
  36: { n: "PtgRef", f: zo },
  /*::[*/
  37: { n: "PtgArea", f: No },
  /*::[*/
  38: { n: "PtgMemArea", f: uc },
  /*::[*/
  39: { n: "PtgMemErr", f: pc },
  /*::[*/
  40: { n: "PtgMemNoMem", f: vc },
  /*::[*/
  41: { n: "PtgMemFunc", f: hc },
  /*::[*/
  42: { n: "PtgRefErr", f: xc },
  /*::[*/
  43: { n: "PtgAreaErr", f: Lo },
  /*::[*/
  44: { n: "PtgRefN", f: Ko },
  /*::[*/
  45: { n: "PtgAreaN", f: Bo },
  /*::[*/
  46: { n: "PtgMemAreaN", f: Ic },
  /*::[*/
  47: { n: "PtgMemNoMemN", f: Nc },
  /*::[*/
  57: { n: "PtgNameX", f: oc },
  /*::[*/
  58: { n: "PtgRef3d", f: Yo },
  /*::[*/
  59: { n: "PtgArea3d", f: Po },
  /*::[*/
  60: { n: "PtgRefErr3d", f: dc },
  /*::[*/
  61: { n: "PtgAreaErr3d", f: Mo },
  /*::[*/
  255: {}
}, Lc = {
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
}, Mc = {
  /*::[*/
  1: { n: "PtgElfLel", f: Ii },
  /*::[*/
  2: { n: "PtgElfRw", f: Fc },
  /*::[*/
  3: { n: "PtgElfCol", f: gc },
  /*::[*/
  6: { n: "PtgElfRwV", f: yc },
  /*::[*/
  7: { n: "PtgElfColV", f: Ec },
  /*::[*/
  10: { n: "PtgElfRadical", f: wc },
  /*::[*/
  11: { n: "PtgElfRadicalS", f: Ac },
  /*::[*/
  13: { n: "PtgElfColS", f: _c },
  /*::[*/
  15: { n: "PtgElfColSV", f: Tc },
  /*::[*/
  16: { n: "PtgElfRadicalLel", f: Sc },
  /*::[*/
  25: { n: "PtgList", f: Oc },
  /*::[*/
  29: { n: "PtgSxName", f: kc },
  /*::[*/
  255: {}
}, Bc = {
  /*::[*/
  0: { n: "PtgAttrNoop", f: Pc },
  /*::[*/
  1: { n: "PtgAttrSemi", f: Go },
  /*::[*/
  2: { n: "PtgAttrIf", f: Vo },
  /*::[*/
  4: { n: "PtgAttrChoose", f: Uo },
  /*::[*/
  8: { n: "PtgAttrGoto", f: Wo },
  /*::[*/
  16: { n: "PtgAttrSum", f: qo },
  /*::[*/
  32: { n: "PtgAttrBaxcel", f: ua },
  /*::[*/
  33: { n: "PtgAttrBaxcel", f: ua },
  /*::[*/
  64: { n: "PtgAttrSpace", f: Xo },
  /*::[*/
  65: { n: "PtgAttrSpaceSemi", f: $o },
  /*::[*/
  128: { n: "PtgAttrIfError", f: Ho },
  /*::[*/
  255: {}
};
function bc(e, t, r, n) {
  if (n.biff < 8) return Gr(e, t);
  for (var a = e.l + t, i = [], s = 0; s !== r.length; ++s)
    switch (r[s][0]) {
      case "PtgArray":
        r[s][1] = fc(e, 0, n), i.push(r[s][1]);
        break;
      case "PtgMemArea":
        r[s][2] = sc(e, r[s][1], n), i.push(r[s][2]);
        break;
      case "PtgExp":
        n && n.biff == 12 && (r[s][1][1] = e.read_shift(4), i.push(r[s][1]));
        break;
      case "PtgList":
      case "PtgElfRadicalS":
      case "PtgElfColS":
      case "PtgElfColSV":
        throw "Unsupported " + r[s][0];
    }
  return t = a - e.l, t !== 0 && i.push(Gr(e, t)), i;
}
function Uc(e, t, r) {
  for (var n = e.l + t, a, i, s = []; n != e.l; )
    t = n - e.l, i = e[e.l], a = ha[i] || ha[Lc[i]], (i === 24 || i === 25) && (a = (i === 24 ? Mc : Bc)[e[e.l + 1]]), !a || !a.f ? Gr(e, t) : s.push([a.n, a.f(e, t, r)]);
  return s;
}
function Wc(e) {
  for (var t = [], r = 0; r < e.length; ++r) {
    for (var n = e[r], a = [], i = 0; i < n.length; ++i) {
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
    t.push(a.join(","));
  }
  return t.join(";");
}
var Vc = {
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
function Hc(e, t) {
  if (!e && !(t && t.biff <= 5 && t.biff >= 2)) throw new Error("empty sheet name");
  return /[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e) ? "'" + e + "'" : e;
}
function Ni(e, t, r) {
  if (!e) return "SH33TJSERR0";
  if (r.biff > 8 && (!e.XTI || !e.XTI[t])) return e.SheetNames[t];
  if (!e.XTI) return "SH33TJSERR6";
  var n = e.XTI[t];
  if (r.biff < 8)
    return t > 1e4 && (t -= 65536), t < 0 && (t = -t), t == 0 ? "" : e.XTI[t - 1];
  if (!n) return "SH33TJSERR1";
  var a = "";
  if (r.biff > 8) switch (e[n[0]][0]) {
    case 357:
      return a = n[1] == -1 ? "#REF" : e.SheetNames[n[1]], n[1] == n[2] ? a : a + ":" + e.SheetNames[n[2]];
    case 358:
      return r.SID != null ? e.SheetNames[r.SID] : "SH33TJSSAME" + e[n[0]][0];
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
function xa(e, t, r) {
  var n = Ni(e, t, r);
  return n == "#REF" ? n : Hc(n, r);
}
function Ct(e, t, r, n, a) {
  var i = a && a.biff || 8, s = (
    /*range != null ? range :*/
    { s: { c: 0, r: 0 } }
  ), f = [], o, l, c, d = 0, x = 0, p, g = "";
  if (!e[0] || !e[0][0]) return "";
  for (var u = -1, _ = "", k = 0, D = e[0].length; k < D; ++k) {
    var C = e[0][k];
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
        if (o = f.pop(), l = f.pop(), u >= 0) {
          switch (e[0][u][1][0]) {
            case 0:
              _ = We(" ", e[0][u][1][1]);
              break;
            case 1:
              _ = We("\r", e[0][u][1][1]);
              break;
            default:
              if (_ = "", a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][u][1][0]);
          }
          l = l + _, u = -1;
        }
        f.push(l + Vc[C[0]] + o);
        break;
      case "PtgIsect":
        o = f.pop(), l = f.pop(), f.push(l + " " + o);
        break;
      case "PtgUnion":
        o = f.pop(), l = f.pop(), f.push(l + "," + o);
        break;
      case "PtgRange":
        o = f.pop(), l = f.pop(), f.push(l + ":" + o);
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
        c = Yt(C[1][1], s, a), f.push(jt(c, i));
        break;
      case "PtgRefN":
        c = r ? Yt(C[1][1], r, a) : C[1][1], f.push(jt(c, i));
        break;
      case "PtgRef3d":
        d = /*::Number(*/
        C[1][1], c = Yt(C[1][2], s, a), g = xa(n, d, a), f.push(g + "!" + jt(c, i));
        break;
      case "PtgFunc":
      case "PtgFuncVar":
        var B = C[1][0], Y = C[1][1];
        B || (B = 0), B &= 127;
        var re = B == 0 ? [] : f.slice(-B);
        f.length -= B, Y === "User" && (Y = re.shift()), f.push(Y + "(" + re.join(",") + ")");
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
        p = Z0(C[1][1], r ? { s: r } : s, a), f.push(Zn(p, a));
        break;
      case "PtgArea":
        p = Z0(C[1][1], s, a), f.push(Zn(p, a));
        break;
      case "PtgArea3d":
        d = /*::Number(*/
        C[1][1], p = C[1][2], g = xa(n, d, a), f.push(g + "!" + Zn(p, a));
        break;
      case "PtgAttrSum":
        f.push("SUM(" + f.pop() + ")");
        break;
      case "PtgAttrBaxcel":
      case "PtgAttrSemi":
        break;
      case "PtgName":
        x = C[1][2];
        var O = (n.names || [])[x - 1] || (n[0] || [])[x], b = O ? O.Name : "SH33TJSNAME" + String(x);
        b && b.slice(0, 6) == "_xlfn." && !a.xlfn && (b = b.slice(6)), f.push(b);
        break;
      case "PtgNameX":
        var M = C[1][1];
        x = C[1][2];
        var X;
        if (a.biff <= 5)
          M < 0 && (M = -M), n[M] && (X = n[M][x]);
        else {
          var K = "";
          if (((n[M] || [])[0] || [])[0] == 14849 || (((n[M] || [])[0] || [])[0] == 1025 ? n[M][x] && n[M][x].itab > 0 && (K = n.SheetNames[n[M][x].itab - 1] + "!") : K = n.SheetNames[x - 1] + "!"), n[M] && n[M][x]) K += n[M][x].Name;
          else if (n[0] && n[0][x]) K += n[0][x].Name;
          else {
            var j = (Ni(n, M, a) || "").split(";;");
            j[x - 1] ? K = j[x - 1] : K += "SH33TJSERRX";
          }
          f.push(K);
          break;
        }
        X || (X = { Name: "SH33TJSERRY" }), f.push(X.Name);
        break;
      case "PtgParen":
        var ne = "(", Te = ")";
        if (u >= 0) {
          switch (_ = "", e[0][u][1][0]) {
            case 2:
              ne = We(" ", e[0][u][1][1]) + ne;
              break;
            case 3:
              ne = We("\r", e[0][u][1][1]) + ne;
              break;
            case 4:
              Te = We(" ", e[0][u][1][1]) + Te;
              break;
            case 5:
              Te = We("\r", e[0][u][1][1]) + Te;
              break;
            default:
              if (a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][u][1][0]);
          }
          u = -1;
        }
        f.push(ne + f.pop() + Te);
        break;
      case "PtgRefErr":
        f.push("#REF!");
        break;
      case "PtgRefErr3d":
        f.push("#REF!");
        break;
      case "PtgExp":
        c = { c: C[1][1], r: C[1][0] };
        var xe = { c: r.c, r: r.r };
        if (n.sharedf[ke(c)]) {
          var Re = n.sharedf[ke(c)];
          f.push(Ct(Re, s, xe, n, a));
        } else {
          var de = !1;
          for (o = 0; o != n.arrayf.length; ++o)
            if (l = n.arrayf[o], !(c.c < l[0].s.c || c.c > l[0].e.c) && !(c.r < l[0].s.r || c.r > l[0].e.r)) {
              f.push(Ct(l[1], s, xe, n, a)), de = !0;
              break;
            }
          de || f.push(
            /*::String(*/
            C[1]
            /*::)*/
          );
        }
        break;
      case "PtgArray":
        f.push("{" + Wc(
          /*::(*/
          C[1]
          /*:: :any)*/
        ) + "}");
        break;
      case "PtgMemArea":
        break;
      case "PtgAttrSpace":
      case "PtgAttrSpaceSemi":
        u = k;
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
    var vr = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
    if (a.biff != 3 && u >= 0 && vr.indexOf(e[0][k][0]) == -1) {
      C = e[0][u];
      var He = !0;
      switch (C[1][0]) {
        case 4:
          He = !1;
        case 0:
          _ = We(" ", C[1][1]);
          break;
        case 5:
          He = !1;
        case 1:
          _ = We("\r", C[1][1]);
          break;
        default:
          if (_ = "", a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + C[1][0]);
      }
      f.push((He ? _ : "") + f.pop() + (He ? "" : _)), u = -1;
    }
  }
  if (f.length > 1 && a.WTF) throw new Error("bad formula stack");
  return f[0];
}
function Gc(e) {
  if (e == null) {
    var t = U(8);
    return t.write_shift(1, 3), t.write_shift(1, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 65535), t;
  } else if (typeof e == "number") return ut(e);
  return ut(0);
}
function Xc(e, t, r, n, a) {
  var i = ht(t, r, a), s = Gc(e.v), f = U(6), o = 33;
  f.write_shift(2, o), f.write_shift(4, 0);
  for (var l = U(e.bf.length), c = 0; c < e.bf.length; ++c) l[c] = e.bf[c];
  var d = tr([i, s, f, l]);
  return d;
}
function Gn(e, t, r) {
  var n = e.read_shift(4), a = Uc(e, n, r), i = e.read_shift(4), s = i > 0 ? bc(e, i, a, r) : null;
  return [a, s];
}
var $c = Gn, Xn = Gn, zc = Gn, Kc = Gn, Yc = {
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
}, Pi = {
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
}, jc = {
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
function Jc(e) {
  var t = "of:=" + e.replace(A0, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
  return t.replace(/;/g, "|").replace(/,/g, ";");
}
function Zc(e) {
  return e.replace(/\./, "!");
}
var Jt = typeof Map < "u";
function C0(e, t, r) {
  var n = 0, a = e.length;
  if (r) {
    if (Jt ? r.has(t) : Object.prototype.hasOwnProperty.call(r, t)) {
      for (var i = Jt ? r.get(t) : r[t]; n < i.length; ++n)
        if (e[i[n]].t === t)
          return e.Count++, i[n];
    }
  } else for (; n < a; ++n)
    if (e[n].t === t)
      return e.Count++, n;
  return e[a] = { t }, e.Count++, e.Unique++, r && (Jt ? (r.has(t) || r.set(t, []), r.get(t).push(a)) : (Object.prototype.hasOwnProperty.call(r, t) || (r[t] = []), r[t].push(a))), a;
}
function $n(e, t) {
  var r = { min: e + 1, max: e + 1 }, n = -1;
  return t.MDW && (jr = t.MDW), t.width != null ? r.customWidth = 1 : t.wpx != null ? n = Pn(t.wpx) : t.wch != null && (n = t.wch), n > -1 ? (r.width = f0(n), r.customWidth = 1) : t.width != null && (r.width = t.width), t.hidden && (r.hidden = !0), t.level != null && (r.outlineLevel = r.level = t.level), r;
}
function Li(e, t) {
  if (e) {
    var r = [0.7, 0.7, 0.75, 0.75, 0.3, 0.3];
    e.left == null && (e.left = r[0]), e.right == null && (e.right = r[1]), e.top == null && (e.top = r[2]), e.bottom == null && (e.bottom = r[3]), e.header == null && (e.header = r[4]), e.footer == null && (e.footer = r[5]);
  }
}
function it(e, t, r) {
  var n = r.revssf[t.z != null ? t.z : "General"], a = 60, i = e.length;
  if (n == null && r.ssf) {
    for (; a < 392; ++a) if (r.ssf[a] == null) {
      Da(t.z, a), r.ssf[a] = t.z, r.revssf[t.z] = n = a;
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
function qc(e, t, r) {
  if (e && e["!ref"]) {
    var n = Me(e["!ref"]);
    if (n.e.c < n.s.c || n.e.r < n.s.r) throw new Error("Bad range (" + r + "): " + e["!ref"]);
  }
}
function Qc(e) {
  if (e.length === 0) return "";
  for (var t = '<mergeCells count="' + e.length + '">', r = 0; r != e.length; ++r) t += '<mergeCell ref="' + Xe(e[r]) + '"/>';
  return t + "</mergeCells>";
}
function eu(e, t, r, n, a) {
  var i = !1, s = {}, f = null;
  if (n.bookType !== "xlsx" && t.vbaraw) {
    var o = t.SheetNames[r];
    try {
      t.Workbook && (o = t.Workbook.Sheets[r].CodeName || o);
    } catch {
    }
    i = !0, s.codeName = en(Oe(o));
  }
  if (e && e["!outline"]) {
    var l = { summaryBelow: 1, summaryRight: 1 };
    e["!outline"].above && (l.summaryBelow = 0), e["!outline"].left && (l.summaryRight = 0), f = (f || "") + Q("outlinePr", null, l);
  }
  !i && !f || (a[a.length] = Q("sheetPr", f, s));
}
var ru = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"], tu = [
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
function nu(e) {
  var t = { sheet: 1 };
  return ru.forEach(function(r) {
    e[r] != null && e[r] && (t[r] = "1");
  }), tu.forEach(function(r) {
    e[r] != null && !e[r] && (t[r] = "0");
  }), e.password && (t.password = gi(e.password).toString(16).toUpperCase()), Q("sheetProtection", null, t);
}
function au(e) {
  return Li(e), Q("pageMargins", null, e);
}
function iu(e, t) {
  for (var r = ["<cols>"], n, a = 0; a != t.length; ++a)
    (n = t[a]) && (r[r.length] = Q("col", null, $n(a, n)));
  return r[r.length] = "</cols>", r.join("");
}
function su(e, t, r, n) {
  var a = typeof e.ref == "string" ? e.ref : Xe(e.ref);
  r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
  var i = r.Workbook.Names, s = kr(a);
  s.s.r == s.e.r && (s.e.r = kr(t["!ref"]).e.r, a = Xe(s));
  for (var f = 0; f < i.length; ++f) {
    var o = i[f];
    if (o.Name == "_xlnm._FilterDatabase" && o.Sheet == n) {
      o.Ref = "'" + r.SheetNames[n] + "'!" + a;
      break;
    }
  }
  return f == i.length && i.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + r.SheetNames[n] + "'!" + a }), Q("autoFilter", null, { ref: a });
}
function fu(e, t, r, n) {
  var a = { workbookViewId: "0" };
  return (((n || {}).Workbook || {}).Views || [])[0] && (a.rightToLeft = n.Workbook.Views[0].RTL ? "1" : "0"), Q("sheetViews", Q("sheetView", null, a), {});
}
function lu(e, t, r, n) {
  if (e.c && r["!comments"].push([t, e.c]), e.v === void 0 && typeof e.f != "string" || e.t === "z" && !e.f) return "";
  var a = "", i = e.t, s = e.v;
  if (e.t !== "z") switch (e.t) {
    case "b":
      a = e.v ? "1" : "0";
      break;
    case "n":
      a = "" + e.v;
      break;
    case "e":
      a = ln[e.v];
      break;
    case "d":
      n && n.cellDates ? a = pr(e.v, -1).toISOString() : (e = wr(e), e.t = "n", a = "" + (e.v = Er(pr(e.v)))), typeof e.z > "u" && (e.z = Ve[14]);
      break;
    default:
      a = e.v;
      break;
  }
  var f = nr("v", Oe(a)), o = { r: t }, l = it(n.cellXfs, e, n);
  switch (l !== 0 && (o.s = l), e.t) {
    case "n":
      break;
    case "d":
      o.t = "d";
      break;
    case "b":
      o.t = "b";
      break;
    case "e":
      o.t = "e";
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
        f = nr("v", "" + C0(n.Strings, e.v, n.revStrings)), o.t = "s";
        break;
      }
      o.t = "str";
      break;
  }
  if (e.t != i && (e.t = i, e.v = s), typeof e.f == "string" && e.f) {
    var c = e.F && e.F.slice(0, t.length) == t ? { t: "array", ref: e.F } : null;
    f = Q("f", Oe(e.f), c) + (e.v != null ? f : "");
  }
  return e.l && r["!links"].push([t, e.l]), e.D && (o.cm = 1), Q("c", f, o);
}
function ou(e, t, r, n) {
  var a = [], i = [], s = Me(e["!ref"]), f = "", o, l = "", c = [], d = 0, x = 0, p = e["!rows"], g = Array.isArray(e), u = { r: l }, _, k = -1;
  for (x = s.s.c; x <= s.e.c; ++x) c[x] = or(x);
  for (d = s.s.r; d <= s.e.r; ++d) {
    for (i = [], l = ar(d), x = s.s.c; x <= s.e.c; ++x) {
      o = c[x] + l;
      var D = g ? (e[d] || [])[x] : e[o];
      D !== void 0 && (f = lu(D, o, e, t)) != null && i.push(f);
    }
    (i.length > 0 || p && p[d]) && (u = { r: l }, p && p[d] && (_ = p[d], _.hidden && (u.hidden = 1), k = -1, _.hpx ? k = Ln(_.hpx) : _.hpt && (k = _.hpt), k > -1 && (u.ht = k, u.customHeight = 1), _.level && (u.outlineLevel = _.level)), a[a.length] = Q("row", i.join(""), u));
  }
  if (p) for (; d < p.length; ++d)
    p && p[d] && (u = { r: d + 1 }, _ = p[d], _.hidden && (u.hidden = 1), k = -1, _.hpx ? k = Ln(_.hpx) : _.hpt && (k = _.hpt), k > -1 && (u.ht = k, u.customHeight = 1), _.level && (u.outlineLevel = _.level), a[a.length] = Q("row", "", u));
  return a.join("");
}
function Mi(e, t, r, n) {
  var a = [$e, Q("worksheet", null, {
    xmlns: Ot[0],
    "xmlns:r": Ze.r
  })], i = r.SheetNames[e], s = 0, f = "", o = r.Sheets[i];
  o == null && (o = {});
  var l = o["!ref"] || "A1", c = Me(l);
  if (c.e.c > 16383 || c.e.r > 1048575) {
    if (t.WTF) throw new Error("Range " + l + " exceeds format limit A1:XFD1048576");
    c.e.c = Math.min(c.e.c, 16383), c.e.r = Math.min(c.e.c, 1048575), l = Xe(c);
  }
  n || (n = {}), o["!comments"] = [];
  var d = [];
  eu(o, r, e, t, a), a[a.length] = Q("dimension", null, { ref: l }), a[a.length] = fu(o, t, e, r), t.sheetFormat && (a[a.length] = Q("sheetFormatPr", null, {
    defaultRowHeight: t.sheetFormat.defaultRowHeight || "16",
    baseColWidth: t.sheetFormat.baseColWidth || "10",
    outlineLevelRow: t.sheetFormat.outlineLevelRow || "7"
  })), o["!cols"] != null && o["!cols"].length > 0 && (a[a.length] = iu(o, o["!cols"])), a[s = a.length] = "<sheetData/>", o["!links"] = [], o["!ref"] != null && (f = ou(o, t), f.length > 0 && (a[a.length] = f)), a.length > s + 1 && (a[a.length] = "</sheetData>", a[s] = a[s].replace("/>", ">")), o["!protect"] && (a[a.length] = nu(o["!protect"])), o["!autofilter"] != null && (a[a.length] = su(o["!autofilter"], o, r, e)), o["!merges"] != null && o["!merges"].length > 0 && (a[a.length] = Qc(o["!merges"]));
  var x = -1, p, g = -1;
  return (
    /*::(*/
    o["!links"].length > 0 && (a[a.length] = "<hyperlinks>", o["!links"].forEach(function(u) {
      u[1].Target && (p = { ref: u[0] }, u[1].Target.charAt(0) != "#" && (g = Ce(n, -1, Oe(u[1].Target).replace(/#.*$/, ""), we.HLINK), p["r:id"] = "rId" + g), (x = u[1].Target.indexOf("#")) > -1 && (p.location = Oe(u[1].Target.slice(x + 1))), u[1].Tooltip && (p.tooltip = Oe(u[1].Tooltip)), a[a.length] = Q("hyperlink", null, p));
    }), a[a.length] = "</hyperlinks>"), delete o["!links"], o["!margins"] != null && (a[a.length] = au(o["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && (a[a.length] = nr("ignoredErrors", Q("ignoredError", null, { numberStoredAsText: 1, sqref: l }))), d.length > 0 && (g = Ce(n, -1, "../drawings/drawing" + (e + 1) + ".xml", we.DRAW), a[a.length] = Q("drawing", null, { "r:id": "rId" + g }), o["!drawing"] = d), o["!comments"].length > 0 && (g = Ce(n, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", we.VML), a[a.length] = Q("legacyDrawing", null, { "r:id": "rId" + g }), o["!legacy"] = g), a.length > 1 && (a[a.length] = "</worksheet>", a[1] = a[1].replace("/>", ">")), a.join("")
  );
}
function cu(e, t) {
  var r = {}, n = e.l + t;
  r.r = e.read_shift(4), e.l += 4;
  var a = e.read_shift(2);
  e.l += 1;
  var i = e.read_shift(1);
  return e.l = n, i & 7 && (r.level = i & 7), i & 16 && (r.hidden = !0), i & 32 && (r.hpt = a / 20), r;
}
function uu(e, t, r) {
  var n = U(145), a = (r["!rows"] || [])[e] || {};
  n.write_shift(4, e), n.write_shift(4, 0);
  var i = 320;
  a.hpx ? i = Ln(a.hpx) * 20 : a.hpt && (i = a.hpt * 20), n.write_shift(2, i), n.write_shift(1, 0);
  var s = 0;
  a.level && (s |= a.level), a.hidden && (s |= 16), (a.hpx || a.hpt) && (s |= 32), n.write_shift(1, s), n.write_shift(1, 0);
  var f = 0, o = n.l;
  n.l += 4;
  for (var l = { r: e, c: 0 }, c = 0; c < 16; ++c)
    if (!(t.s.c > c + 1 << 10 || t.e.c < c << 10)) {
      for (var d = -1, x = -1, p = c << 10; p < c + 1 << 10; ++p) {
        l.c = p;
        var g = Array.isArray(r) ? (r[l.r] || [])[l.c] : r[ke(l)];
        g && (d < 0 && (d = p), x = p);
      }
      d < 0 || (++f, n.write_shift(4, d), n.write_shift(4, x));
    }
  var u = n.l;
  return n.l = o, n.write_shift(4, f), n.l = u, n.length > n.l ? n.slice(0, n.l) : n;
}
function hu(e, t, r, n) {
  var a = uu(n, r, t);
  (a.length > 17 || (t["!rows"] || [])[n]) && H(e, 0, a);
}
var xu = mt, du = Dt;
function pu() {
}
function vu(e, t) {
  var r = {}, n = e[e.l];
  return ++e.l, r.above = !(n & 64), r.left = !(n & 128), e.l += 18, r.name = Ff(e), r;
}
function mu(e, t, r) {
  r == null && (r = U(84 + 4 * e.length));
  var n = 192;
  t && (t.above && (n &= -65), t.left && (n &= -129)), r.write_shift(1, n);
  for (var a = 1; a < 3; ++a) r.write_shift(1, 0);
  return Rn({ auto: 1 }, r), r.write_shift(-4, -1), r.write_shift(-4, -1), Za(e, r), r.slice(0, r.l);
}
function gu(e) {
  var t = Ir(e);
  return [t];
}
function _u(e, t, r) {
  return r == null && (r = U(8)), dt(t, r);
}
function Tu(e) {
  var t = pt(e);
  return [t];
}
function Eu(e, t, r) {
  return r == null && (r = U(4)), vt(t, r);
}
function wu(e) {
  var t = Ir(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function Su(e, t, r) {
  return r == null && (r = U(9)), dt(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function Au(e) {
  var t = pt(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function Fu(e, t, r) {
  return r == null && (r = U(5)), vt(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function yu(e) {
  var t = Ir(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function Cu(e, t, r) {
  return r == null && (r = U(9)), dt(t, r), r.write_shift(1, e.v), r;
}
function Ou(e) {
  var t = pt(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function ku(e, t, r) {
  return r == null && (r = U(8)), vt(t, r), r.write_shift(1, e.v), r.write_shift(2, 0), r.write_shift(1, 0), r;
}
function Du(e) {
  var t = Ir(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function Ru(e, t, r) {
  return r == null && (r = U(12)), dt(t, r), r.write_shift(4, t.v), r;
}
function Iu(e) {
  var t = pt(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function Nu(e, t, r) {
  return r == null && (r = U(8)), vt(t, r), r.write_shift(4, t.v), r;
}
function Pu(e) {
  var t = Ir(e), r = Rt(e);
  return [t, r, "n"];
}
function Lu(e, t, r) {
  return r == null && (r = U(16)), dt(t, r), ut(e.v, r), r;
}
function Mu(e) {
  var t = pt(e), r = Rt(e);
  return [t, r, "n"];
}
function Bu(e, t, r) {
  return r == null && (r = U(12)), vt(t, r), ut(e.v, r), r;
}
function bu(e) {
  var t = Ir(e), r = qa(e);
  return [t, r, "n"];
}
function Uu(e, t, r) {
  return r == null && (r = U(12)), dt(t, r), Qa(e.v, r), r;
}
function Wu(e) {
  var t = pt(e), r = qa(e);
  return [t, r, "n"];
}
function Vu(e, t, r) {
  return r == null && (r = U(8)), vt(t, r), Qa(e.v, r), r;
}
function Hu(e) {
  var t = Ir(e), r = _0(e);
  return [t, r, "is"];
}
function Gu(e) {
  var t = Ir(e), r = cr(e);
  return [t, r, "str"];
}
function Xu(e, t, r) {
  return r == null && (r = U(12 + 4 * e.v.length)), dt(t, r), Qe(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function $u(e) {
  var t = pt(e), r = cr(e);
  return [t, r, "str"];
}
function zu(e, t, r) {
  return r == null && (r = U(8 + 4 * e.v.length)), vt(t, r), Qe(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function Ku(e, t, r) {
  var n = e.l + t, a = Ir(e);
  a.r = r["!row"];
  var i = e.read_shift(1), s = [a, i, "b"];
  if (r.cellFormula) {
    e.l += 2;
    var f = Xn(e, n - e.l, r);
    s[3] = Ct(f, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
function Yu(e, t, r) {
  var n = e.l + t, a = Ir(e);
  a.r = r["!row"];
  var i = e.read_shift(1), s = [a, i, "e"];
  if (r.cellFormula) {
    e.l += 2;
    var f = Xn(e, n - e.l, r);
    s[3] = Ct(f, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
function ju(e, t, r) {
  var n = e.l + t, a = Ir(e);
  a.r = r["!row"];
  var i = Rt(e), s = [a, i, "n"];
  if (r.cellFormula) {
    e.l += 2;
    var f = Xn(e, n - e.l, r);
    s[3] = Ct(f, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
function Ju(e, t, r) {
  var n = e.l + t, a = Ir(e);
  a.r = r["!row"];
  var i = cr(e), s = [a, i, "str"];
  if (r.cellFormula) {
    e.l += 2;
    var f = Xn(e, n - e.l, r);
    s[3] = Ct(f, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
var Zu = mt, qu = Dt;
function Qu(e, t) {
  return t == null && (t = U(4)), t.write_shift(4, e), t;
}
function e1(e, t) {
  var r = e.l + t, n = mt(e), a = T0(e), i = cr(e), s = cr(e), f = cr(e);
  e.l = r;
  var o = { rfx: n, relId: a, loc: i, display: f };
  return s && (o.Tooltip = s), o;
}
function r1(e, t) {
  var r = U(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
  Dt({ s: qe(e[0]), e: qe(e[0]) }, r), E0("rId" + t, r);
  var n = e[1].Target.indexOf("#"), a = n == -1 ? "" : e[1].Target.slice(n + 1);
  return Qe(a || "", r), Qe(e[1].Tooltip || "", r), Qe("", r), r.slice(0, r.l);
}
function t1() {
}
function n1(e, t, r) {
  var n = e.l + t, a = ei(e), i = e.read_shift(1), s = [a];
  if (s[2] = i, r.cellFormula) {
    var f = $c(e, n - e.l, r);
    s[1] = f;
  } else e.l = n;
  return s;
}
function a1(e, t, r) {
  var n = e.l + t, a = mt(e), i = [a];
  if (r.cellFormula) {
    var s = Kc(e, n - e.l, r);
    i[1] = s, e.l = n;
  } else e.l = n;
  return i;
}
function i1(e, t, r) {
  r == null && (r = U(18));
  var n = $n(e, t);
  r.write_shift(-4, e), r.write_shift(-4, e), r.write_shift(4, (n.width || 10) * 256), r.write_shift(
    4,
    0
    /*ixfe*/
  );
  var a = 0;
  return t.hidden && (a |= 1), typeof n.width == "number" && (a |= 2), t.level && (a |= t.level << 8), r.write_shift(2, a), r;
}
var Bi = ["left", "right", "top", "bottom", "header", "footer"];
function s1(e) {
  var t = {};
  return Bi.forEach(function(r) {
    t[r] = Rt(e);
  }), t;
}
function f1(e, t) {
  return t == null && (t = U(6 * 8)), Li(e), Bi.forEach(function(r) {
    ut(e[r], t);
  }), t;
}
function l1(e) {
  var t = e.read_shift(2);
  return e.l += 28, { RTL: t & 32 };
}
function o1(e, t, r) {
  r == null && (r = U(30));
  var n = 924;
  return (((t || {}).Views || [])[0] || {}).RTL && (n |= 32), r.write_shift(2, n), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(2, 0), r.write_shift(2, 100), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(4, 0), r;
}
function c1(e) {
  var t = U(24);
  return t.write_shift(4, 4), t.write_shift(4, 1), Dt(e, t), t;
}
function u1(e, t) {
  return t == null && (t = U(16 * 4 + 2)), t.write_shift(2, e.password ? gi(e.password) : 0), t.write_shift(4, 1), [
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
function h1() {
}
function x1() {
}
function d1(e, t, r, n, a, i, s) {
  if (t.v === void 0) return !1;
  var f = "";
  switch (t.t) {
    case "b":
      f = t.v ? "1" : "0";
      break;
    case "d":
      t = wr(t), t.z = t.z || Ve[14], t.v = Er(pr(t.v)), t.t = "n";
      break;
    case "n":
    case "e":
      f = "" + t.v;
      break;
    default:
      f = t.v;
      break;
  }
  var o = { r, c: n };
  switch (o.s = it(a.cellXfs, t, a), t.l && i["!links"].push([ke(o), t.l]), t.c && i["!comments"].push([ke(o), t.c]), t.t) {
    case "s":
    case "str":
      return a.bookSST ? (f = C0(a.Strings, t.v, a.revStrings), o.t = "s", o.v = f, s ? H(e, 18, Nu(t, o)) : H(e, 7, Ru(t, o))) : (o.t = "str", s ? H(e, 17, zu(t, o)) : H(e, 6, Xu(t, o))), !0;
    case "n":
      return t.v == (t.v | 0) && t.v > -1e3 && t.v < 1e3 ? s ? H(e, 13, Vu(t, o)) : H(e, 2, Uu(t, o)) : s ? H(e, 16, Bu(t, o)) : H(e, 5, Lu(t, o)), !0;
    case "b":
      return o.t = "b", s ? H(e, 15, Fu(t, o)) : H(e, 4, Su(t, o)), !0;
    case "e":
      return o.t = "e", s ? H(e, 14, ku(t, o)) : H(e, 3, Cu(t, o)), !0;
  }
  return s ? H(e, 12, Eu(t, o)) : H(e, 1, _u(t, o)), !0;
}
function p1(e, t, r, n) {
  var a = Me(t["!ref"] || "A1"), i, s = "", f = [];
  H(
    e,
    145
    /* BrtBeginSheetData */
  );
  var o = Array.isArray(t), l = a.e.r;
  t["!rows"] && (l = Math.max(a.e.r, t["!rows"].length - 1));
  for (var c = a.s.r; c <= l; ++c) {
    s = ar(c), hu(e, t, a, c);
    var d = !1;
    if (c <= a.e.r) for (var x = a.s.c; x <= a.e.c; ++x) {
      c === a.s.r && (f[x] = or(x)), i = f[x] + s;
      var p = o ? (t[c] || [])[x] : t[i];
      if (!p) {
        d = !1;
        continue;
      }
      d = d1(e, p, c, x, n, t, d);
    }
  }
  H(
    e,
    146
    /* BrtEndSheetData */
  );
}
function v1(e, t) {
  !t || !t["!merges"] || (H(e, 177, Qu(t["!merges"].length)), t["!merges"].forEach(function(r) {
    H(e, 176, qu(r));
  }), H(
    e,
    178
    /* BrtEndMergeCells */
  ));
}
function m1(e, t) {
  !t || !t["!cols"] || (H(
    e,
    390
    /* BrtBeginColInfos */
  ), t["!cols"].forEach(function(r, n) {
    r && H(e, 60, i1(n, r));
  }), H(
    e,
    391
    /* BrtEndColInfos */
  ));
}
function g1(e, t) {
  !t || !t["!ref"] || (H(
    e,
    648
    /* BrtBeginCellIgnoreECs */
  ), H(e, 649, c1(Me(t["!ref"]))), H(
    e,
    650
    /* BrtEndCellIgnoreECs */
  ));
}
function _1(e, t, r) {
  t["!links"].forEach(function(n) {
    if (n[1].Target) {
      var a = Ce(r, -1, n[1].Target.replace(/#.*$/, ""), we.HLINK);
      H(e, 494, r1(n, a));
    }
  }), delete t["!links"];
}
function T1(e, t, r, n) {
  if (t["!comments"].length > 0) {
    var a = Ce(n, -1, "../drawings/vmlDrawing" + (r + 1) + ".vml", we.VML);
    H(e, 551, E0("rId" + a)), t["!legacy"] = a;
  }
}
function E1(e, t, r, n) {
  if (t["!autofilter"]) {
    var a = t["!autofilter"], i = typeof a.ref == "string" ? a.ref : Xe(a.ref);
    r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
    var s = r.Workbook.Names, f = kr(i);
    f.s.r == f.e.r && (f.e.r = kr(t["!ref"]).e.r, i = Xe(f));
    for (var o = 0; o < s.length; ++o) {
      var l = s[o];
      if (l.Name == "_xlnm._FilterDatabase" && l.Sheet == n) {
        l.Ref = "'" + r.SheetNames[n] + "'!" + i;
        break;
      }
    }
    o == s.length && s.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + r.SheetNames[n] + "'!" + i }), H(e, 161, Dt(Me(i))), H(
      e,
      162
      /* BrtEndAFilter */
    );
  }
}
function w1(e, t, r) {
  H(
    e,
    133
    /* BrtBeginWsViews */
  ), H(e, 137, o1(t, r)), H(
    e,
    138
    /* BrtEndWsView */
  ), H(
    e,
    134
    /* BrtEndWsViews */
  );
}
function S1(e, t) {
  t["!protect"] && H(e, 535, u1(t["!protect"]));
}
function A1(e, t, r, n) {
  var a = Tr(), i = r.SheetNames[e], s = r.Sheets[i] || {}, f = i;
  try {
    r && r.Workbook && (f = r.Workbook.Sheets[e].CodeName || f);
  } catch {
  }
  var o = Me(s["!ref"] || "A1");
  if (o.e.c > 16383 || o.e.r > 1048575) {
    if (t.WTF) throw new Error("Range " + (s["!ref"] || "A1") + " exceeds format limit A1:XFD1048576");
    o.e.c = Math.min(o.e.c, 16383), o.e.r = Math.min(o.e.c, 1048575);
  }
  return s["!links"] = [], s["!comments"] = [], H(
    a,
    129
    /* BrtBeginSheet */
  ), (r.vbaraw || s["!outline"]) && H(a, 147, mu(f, s["!outline"])), H(a, 148, du(o)), w1(a, s, r.Workbook), m1(a, s), p1(a, s, e, t), S1(a, s), E1(a, s, r, e), v1(a, s), _1(a, s, n), s["!margins"] && H(a, 476, f1(s["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && g1(a, s), T1(a, s, e, n), H(
    a,
    130
    /* BrtEndSheet */
  ), a.end();
}
function F1(e, t) {
  e.l += 10;
  var r = cr(e);
  return { name: r };
}
var y1 = [
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
function C1(e) {
  return !e.Workbook || !e.Workbook.WBProps ? "false" : tf(e.Workbook.WBProps.date1904) ? "true" : "false";
}
var O1 = /* @__PURE__ */ "][*?/\\".split("");
function bi(e, t) {
  if (e.length > 31)
    throw new Error("Sheet names cannot exceed 31 chars");
  var r = !0;
  return O1.forEach(function(n) {
    if (e.indexOf(n) != -1)
      throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
  }), r;
}
function k1(e, t, r) {
  e.forEach(function(n, a) {
    bi(n);
    for (var i = 0; i < a; ++i) if (n == e[i]) throw new Error("Duplicate Sheet Name: " + n);
    if (r) {
      var s = t && t[a] && t[a].CodeName || n;
      if (s.charCodeAt(0) == 95 && s.length > 22) throw new Error("Bad Code Name: Worksheet" + s);
    }
  });
}
function D1(e) {
  if (!e || !e.SheetNames || !e.Sheets) throw new Error("Invalid Workbook");
  if (!e.SheetNames.length) throw new Error("Workbook is empty");
  var t = e.Workbook && e.Workbook.Sheets || [];
  k1(e.SheetNames, t, !!e.vbaraw);
  for (var r = 0; r < e.SheetNames.length; ++r) qc(e.Sheets[e.SheetNames[r]], e.SheetNames[r], r);
}
function Ui(e) {
  var t = [$e];
  t[t.length] = Q("workbook", null, {
    xmlns: Ot[0],
    //'xmlns:mx': XMLNS.mx,
    //'xmlns:s': XMLNS_main[0],
    "xmlns:r": Ze.r
  });
  var r = e.Workbook && (e.Workbook.Names || []).length > 0, n = { codeName: "ThisWorkbook" };
  e.Workbook && e.Workbook.WBProps && (y1.forEach(function(f) {
    e.Workbook.WBProps[f[0]] != null && e.Workbook.WBProps[f[0]] != f[1] && (n[f[0]] = e.Workbook.WBProps[f[0]]);
  }), e.Workbook.WBProps.CodeName && (n.codeName = e.Workbook.WBProps.CodeName, delete n.CodeName)), t[t.length] = Q("workbookPr", null, n);
  var a = e.Workbook && e.Workbook.Sheets || [], i = 0;
  if (a && a[0] && a[0].Hidden) {
    for (t[t.length] = "<bookViews>", i = 0; i != e.SheetNames.length && !(!a[i] || !a[i].Hidden); ++i)
      ;
    i == e.SheetNames.length && (i = 0), t[t.length] = '<workbookView firstSheet="' + i + '" activeTab="' + i + '"/>', t[t.length] = "</bookViews>";
  }
  for (t[t.length] = "<sheets>", i = 0; i != e.SheetNames.length; ++i) {
    var s = { name: Oe(e.SheetNames[i].slice(0, 31)) };
    if (s.sheetId = "" + (i + 1), s["r:id"] = "rId" + (i + 1), a[i]) switch (a[i].Hidden) {
      case 1:
        s.state = "hidden";
        break;
      case 2:
        s.state = "veryHidden";
        break;
    }
    t[t.length] = Q("sheet", null, s);
  }
  return t[t.length] = "</sheets>", r && (t[t.length] = "<definedNames>", e.Workbook && e.Workbook.Names && e.Workbook.Names.forEach(function(f) {
    var o = { name: f.Name };
    f.Comment && (o.comment = f.Comment), f.Sheet != null && (o.localSheetId = "" + f.Sheet), f.Hidden && (o.hidden = "1"), f.Ref && (t[t.length] = Q("definedName", Oe(f.Ref), o));
  }), t[t.length] = "</definedNames>"), t.length > 2 && (t[t.length] = "</workbook>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function R1(e, t) {
  var r = {};
  return r.Hidden = e.read_shift(4), r.iTabID = e.read_shift(4), r.strRelID = s0(e), r.name = cr(e), r;
}
function I1(e, t) {
  return t || (t = U(127)), t.write_shift(4, e.Hidden), t.write_shift(4, e.iTabID), E0(e.strRelID, t), Qe(e.name.slice(0, 31), t), t.length > t.l ? t.slice(0, t.l) : t;
}
function N1(e, t) {
  var r = {}, n = e.read_shift(4);
  r.defaultThemeVersion = e.read_shift(4);
  var a = t > 8 ? cr(e) : "";
  return a.length > 0 && (r.CodeName = a), r.autoCompressPictures = !!(n & 65536), r.backupFile = !!(n & 64), r.checkCompatibility = !!(n & 4096), r.date1904 = !!(n & 1), r.filterPrivacy = !!(n & 8), r.hidePivotFieldList = !!(n & 1024), r.promptedSolutions = !!(n & 16), r.publishItems = !!(n & 2048), r.refreshAllConnections = !!(n & 262144), r.saveExternalLinkValues = !!(n & 128), r.showBorderUnselectedTables = !!(n & 4), r.showInkAnnotation = !!(n & 32), r.showObjects = ["all", "placeholders", "none"][n >> 13 & 3], r.showPivotChartFilter = !!(n & 32768), r.updateLinks = ["userSet", "never", "always"][n >> 8 & 3], r;
}
function P1(e, t) {
  t || (t = U(72));
  var r = 0;
  return e && e.filterPrivacy && (r |= 8), t.write_shift(4, r), t.write_shift(4, 0), Za(e && e.CodeName || "ThisWorkbook", t), t.slice(0, t.l);
}
function L1(e, t, r) {
  var n = e.l + t;
  e.l += 4, e.l += 1;
  var a = e.read_shift(4), i = yf(e), s = zc(e, 0, r), f = T0(e);
  e.l = n;
  var o = { Name: i, Ptg: s };
  return a < 268435455 && (o.Sheet = a), f && (o.Comment = f), o;
}
function M1(e, t) {
  H(
    e,
    143
    /* BrtBeginBundleShs */
  );
  for (var r = 0; r != t.SheetNames.length; ++r) {
    var n = t.Workbook && t.Workbook.Sheets && t.Workbook.Sheets[r] && t.Workbook.Sheets[r].Hidden || 0, a = { Hidden: n, iTabID: r + 1, strRelID: "rId" + (r + 1), name: t.SheetNames[r] };
    H(e, 156, I1(a));
  }
  H(
    e,
    144
    /* BrtEndBundleShs */
  );
}
function B1(e, t) {
  t || (t = U(127));
  for (var r = 0; r != 4; ++r) t.write_shift(4, 0);
  return Qe("SheetJS", t), Qe(Sn.version, t), Qe(Sn.version, t), Qe("7262", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function b1(e, t) {
  t || (t = U(29)), t.write_shift(-4, 0), t.write_shift(-4, 460), t.write_shift(4, 28800), t.write_shift(4, 17600), t.write_shift(4, 500), t.write_shift(4, e), t.write_shift(4, e);
  var r = 120;
  return t.write_shift(1, r), t.length > t.l ? t.slice(0, t.l) : t;
}
function U1(e, t) {
  if (!(!t.Workbook || !t.Workbook.Sheets)) {
    for (var r = t.Workbook.Sheets, n = 0, a = -1, i = -1; n < r.length; ++n)
      !r[n] || !r[n].Hidden && a == -1 ? a = n : r[n].Hidden == 1 && i == -1 && (i = n);
    i > a || (H(
      e,
      135
      /* BrtBeginBookViews */
    ), H(e, 158, b1(a)), H(
      e,
      136
      /* BrtEndBookViews */
    ));
  }
}
function W1(e, t) {
  var r = Tr();
  return H(
    r,
    131
    /* BrtBeginBook */
  ), H(r, 128, B1()), H(r, 153, P1(e.Workbook && e.Workbook.WBProps || null)), U1(r, e), M1(r, e), H(
    r,
    132
    /* BrtEndBook */
  ), r.end();
}
function V1(e, t, r) {
  return (t.slice(-4) === ".bin" ? W1 : Ui)(e);
}
function H1(e, t, r, n, a) {
  return (t.slice(-4) === ".bin" ? A1 : Mi)(e, r, n, a);
}
function G1(e, t, r) {
  return (t.slice(-4) === ".bin" ? so : Ei)(e, r);
}
function X1(e, t, r) {
  return (t.slice(-4) === ".bin" ? Nl : mi)(e, r);
}
function $1(e, t, r) {
  return (t.slice(-4) === ".bin" ? So : yi)(e);
}
function z1(e) {
  return (e.slice(-4) === ".bin" ? po : Ai)();
}
function K1(e, t) {
  var r = [];
  return e.Props && r.push(Hf(e.Props, t)), e.Custprops && r.push(Gf(e.Props, e.Custprops)), r.join("");
}
function Y1() {
  return "";
}
function j1(e, t) {
  var r = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
  return t.cellXfs.forEach(function(n, a) {
    var i = [];
    i.push(Q("NumberFormat", null, { "ss:Format": Oe(Ve[n.numFmtId]) }));
    var s = (
      /*::(*/
      { "ss:ID": "s" + (21 + a) }
    );
    r.push(Q("Style", i.join(""), s));
  }), Q("Styles", r.join(""));
}
function Wi(e) {
  return Q("NamedRange", null, { "ss:Name": e.Name, "ss:RefersTo": "=" + F0(e.Ref, { r: 0, c: 0 }) });
}
function J1(e) {
  if (!((e || {}).Workbook || {}).Names) return "";
  for (var t = e.Workbook.Names, r = [], n = 0; n < t.length; ++n) {
    var a = t[n];
    a.Sheet == null && (a.Name.match(/^_xlfn\./) || r.push(Wi(a)));
  }
  return Q("Names", r.join(""));
}
function Z1(e, t, r, n) {
  if (!e || !((n || {}).Workbook || {}).Names) return "";
  for (var a = n.Workbook.Names, i = [], s = 0; s < a.length; ++s) {
    var f = a[s];
    f.Sheet == r && (f.Name.match(/^_xlfn\./) || i.push(Wi(f)));
  }
  return i.join("");
}
function q1(e, t, r, n) {
  if (!e) return "";
  var a = [];
  if (e["!margins"] && (a.push("<PageSetup>"), e["!margins"].header && a.push(Q("Header", null, { "x:Margin": e["!margins"].header })), e["!margins"].footer && a.push(Q("Footer", null, { "x:Margin": e["!margins"].footer })), a.push(Q("PageMargins", null, {
    "x:Bottom": e["!margins"].bottom || "0.75",
    "x:Left": e["!margins"].left || "0.7",
    "x:Right": e["!margins"].right || "0.7",
    "x:Top": e["!margins"].top || "0.75"
  })), a.push("</PageSetup>")), n && n.Workbook && n.Workbook.Sheets && n.Workbook.Sheets[r])
    if (n.Workbook.Sheets[r].Hidden) a.push(Q("Visible", n.Workbook.Sheets[r].Hidden == 1 ? "SheetHidden" : "SheetVeryHidden", {}));
    else {
      for (var i = 0; i < r && !(n.Workbook.Sheets[i] && !n.Workbook.Sheets[i].Hidden); ++i) ;
      i == r && a.push("<Selected/>");
    }
  return ((((n || {}).Workbook || {}).Views || [])[0] || {}).RTL && a.push("<DisplayRightToLeft/>"), e["!protect"] && (a.push(nr("ProtectContents", "True")), e["!protect"].objects && a.push(nr("ProtectObjects", "True")), e["!protect"].scenarios && a.push(nr("ProtectScenarios", "True")), e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells ? a.push(nr("EnableSelection", "NoSelection")) : e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells && a.push(nr("EnableSelection", "UnlockedCells")), [
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
  })), a.length == 0 ? "" : Q("WorksheetOptions", a.join(""), { xmlns: Cr.x });
}
function Q1(e) {
  return e.map(function(t) {
    var r = rf(t.t || ""), n = Q("ss:Data", r, { xmlns: "http://www.w3.org/TR/REC-html40" });
    return Q("Comment", n, { "ss:Author": t.a });
  }).join("");
}
function eh(e, t, r, n, a, i, s) {
  if (!e || e.v == null && e.f == null) return "";
  var f = {};
  if (e.f && (f["ss:Formula"] = "=" + Oe(F0(e.f, s))), e.F && e.F.slice(0, t.length) == t) {
    var o = qe(e.F.slice(t.length + 1));
    f["ss:ArrayRange"] = "RC:R" + (o.r == s.r ? "" : "[" + (o.r - s.r) + "]") + "C" + (o.c == s.c ? "" : "[" + (o.c - s.c) + "]");
  }
  if (e.l && e.l.Target && (f["ss:HRef"] = Oe(e.l.Target), e.l.Tooltip && (f["x:HRefScreenTip"] = Oe(e.l.Tooltip))), r["!merges"])
    for (var l = r["!merges"], c = 0; c != l.length; ++c)
      l[c].s.c != s.c || l[c].s.r != s.r || (l[c].e.c > l[c].s.c && (f["ss:MergeAcross"] = l[c].e.c - l[c].s.c), l[c].e.r > l[c].s.r && (f["ss:MergeDown"] = l[c].e.r - l[c].s.r));
  var d = "", x = "";
  switch (e.t) {
    case "z":
      if (!n.sheetStubs) return "";
      break;
    case "n":
      d = "Number", x = String(e.v);
      break;
    case "b":
      d = "Boolean", x = e.v ? "1" : "0";
      break;
    case "e":
      d = "Error", x = ln[e.v];
      break;
    case "d":
      d = "DateTime", x = new Date(e.v).toISOString(), e.z == null && (e.z = e.z || Ve[14]);
      break;
    case "s":
      d = "String", x = ef(e.v || "");
      break;
  }
  var p = it(n.cellXfs, e, n);
  f["ss:StyleID"] = "s" + (21 + p), f["ss:Index"] = s.c + 1;
  var g = e.v != null ? x : "", u = e.t == "z" ? "" : '<Data ss:Type="' + d + '">' + g + "</Data>";
  return (e.c || []).length > 0 && (u += Q1(e.c)), Q("Cell", u, f);
}
function rh(e, t) {
  var r = '<Row ss:Index="' + (e + 1) + '"';
  return t && (t.hpt && !t.hpx && (t.hpx = Ti(t.hpt)), t.hpx && (r += ' ss:AutoFitHeight="0" ss:Height="' + t.hpx + '"'), t.hidden && (r += ' ss:Hidden="1"')), r + ">";
}
function th(e, t, r, n) {
  if (!e["!ref"]) return "";
  var a = Me(e["!ref"]), i = e["!merges"] || [], s = 0, f = [];
  e["!cols"] && e["!cols"].forEach(function(_, k) {
    S0(_);
    var D = !!_.width, C = $n(k, _), B = { "ss:Index": k + 1 };
    D && (B["ss:Width"] = Nn(C.width)), _.hidden && (B["ss:Hidden"] = "1"), f.push(Q("Column", null, B));
  });
  for (var o = Array.isArray(e), l = a.s.r; l <= a.e.r; ++l) {
    for (var c = [rh(l, (e["!rows"] || [])[l])], d = a.s.c; d <= a.e.c; ++d) {
      var x = !1;
      for (s = 0; s != i.length; ++s)
        if (!(i[s].s.c > d) && !(i[s].s.r > l) && !(i[s].e.c < d) && !(i[s].e.r < l)) {
          (i[s].s.c != d || i[s].s.r != l) && (x = !0);
          break;
        }
      if (!x) {
        var p = { r: l, c: d }, g = ke(p), u = o ? (e[l] || [])[d] : e[g];
        c.push(eh(u, g, e, t, r, n, p));
      }
    }
    c.push("</Row>"), c.length > 2 && f.push(c.join(""));
  }
  return f.join("");
}
function nh(e, t, r) {
  var n = [], a = r.SheetNames[e], i = r.Sheets[a], s = i ? Z1(i, t, e, r) : "";
  return s.length > 0 && n.push("<Names>" + s + "</Names>"), s = i ? th(i, t, e, r) : "", s.length > 0 && n.push("<Table>" + s + "</Table>"), n.push(q1(i, t, e, r)), n.join("");
}
function ah(e, t) {
  t || (t = {}), e.SSF || (e.SSF = wr(Ve)), e.SSF && (Wn(), Un(e.SSF), t.revssf = Vn(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF, t.cellXfs = [], it(t.cellXfs, {}, { revssf: { General: 0 } }));
  var r = [];
  r.push(K1(e, t)), r.push(Y1()), r.push(""), r.push("");
  for (var n = 0; n < e.SheetNames.length; ++n)
    r.push(Q("Worksheet", nh(n, t, e), { "ss:Name": Oe(e.SheetNames[n]) }));
  return r[2] = j1(e, t), r[3] = J1(e), $e + Q("Workbook", r.join(""), {
    xmlns: Cr.ss,
    "xmlns:o": Cr.o,
    "xmlns:x": Cr.x,
    "xmlns:ss": Cr.ss,
    "xmlns:dt": Cr.dt,
    "xmlns:html": Cr.html
  });
}
var e0 = {
  SI: "e0859ff2f94f6810ab9108002b27b3d9",
  DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
  UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
};
function ih(e, t) {
  var r = [], n = [], a = [], i = 0, s, f = W0(Q0, "n"), o = W0(ea, "n");
  if (e.Props)
    for (s = ir(e.Props), i = 0; i < s.length; ++i) (Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(o, s[i]) ? n : a).push([s[i], e.Props[s[i]]]);
  if (e.Custprops)
    for (s = ir(e.Custprops), i = 0; i < s.length; ++i) Object.prototype.hasOwnProperty.call(e.Props || {}, s[i]) || (Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(o, s[i]) ? n : a).push([s[i], e.Custprops[s[i]]]);
  var l = [];
  for (i = 0; i < a.length; ++i)
    ci.indexOf(a[i][0]) > -1 || fi.indexOf(a[i][0]) > -1 || a[i][1] != null && l.push(a[i]);
  n.length && De.utils.cfb_add(t, "/SummaryInformation", ia(n, e0.SI, o, ea)), (r.length || l.length) && De.utils.cfb_add(t, "/DocumentSummaryInformation", ia(r, e0.DSI, f, Q0, l.length ? l : null, e0.UDI));
}
function sh(e, t) {
  var r = t || {}, n = De.utils.cfb_new({ root: "R" }), a = "/Workbook";
  switch (r.bookType || "xls") {
    case "xls":
      r.bookType = "biff8";
    case "xla":
      r.bookType || (r.bookType = "xla");
    case "biff8":
      a = "/Workbook", r.biff = 8;
      break;
    case "biff5":
      a = "/Book", r.biff = 5;
      break;
    default:
      throw new Error("invalid type " + r.bookType + " for XLS CFB");
  }
  return De.utils.cfb_add(n, a, Vi(e, r)), r.biff == 8 && (e.Props || e.Custprops) && ih(e, n), r.biff == 8 && e.vbaraw && Ao(n, De.read(e.vbaraw, { type: typeof e.vbaraw == "string" ? "binary" : "buffer" })), n;
}
var fh = {
  /*::[*/
  0: {
    /* n:"BrtRowHdr", */
    f: cu
  },
  /*::[*/
  1: {
    /* n:"BrtCellBlank", */
    f: gu
  },
  /*::[*/
  2: {
    /* n:"BrtCellRk", */
    f: bu
  },
  /*::[*/
  3: {
    /* n:"BrtCellError", */
    f: yu
  },
  /*::[*/
  4: {
    /* n:"BrtCellBool", */
    f: wu
  },
  /*::[*/
  5: {
    /* n:"BrtCellReal", */
    f: Pu
  },
  /*::[*/
  6: {
    /* n:"BrtCellSt", */
    f: Gu
  },
  /*::[*/
  7: {
    /* n:"BrtCellIsst", */
    f: Du
  },
  /*::[*/
  8: {
    /* n:"BrtFmlaString", */
    f: Ju
  },
  /*::[*/
  9: {
    /* n:"BrtFmlaNum", */
    f: ju
  },
  /*::[*/
  10: {
    /* n:"BrtFmlaBool", */
    f: Ku
  },
  /*::[*/
  11: {
    /* n:"BrtFmlaError", */
    f: Yu
  },
  /*::[*/
  12: {
    /* n:"BrtShortBlank", */
    f: Tu
  },
  /*::[*/
  13: {
    /* n:"BrtShortRk", */
    f: Wu
  },
  /*::[*/
  14: {
    /* n:"BrtShortError", */
    f: Ou
  },
  /*::[*/
  15: {
    /* n:"BrtShortBool", */
    f: Au
  },
  /*::[*/
  16: {
    /* n:"BrtShortReal", */
    f: Mu
  },
  /*::[*/
  17: {
    /* n:"BrtShortSt", */
    f: $u
  },
  /*::[*/
  18: {
    /* n:"BrtShortIsst", */
    f: Iu
  },
  /*::[*/
  19: {
    /* n:"BrtSSTItem", */
    f: _0
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
    f: L1
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
    f: Hl
  },
  /*::[*/
  44: {
    /* n:"BrtFmt", */
    f: Wl
  },
  /*::[*/
  45: {
    /* n:"BrtFill", */
    f: $l
  },
  /*::[*/
  46: {
    /* n:"BrtBorder", */
    f: Kl
  },
  /*::[*/
  47: {
    /* n:"BrtXF", */
    f: zl
  },
  /*::[*/
  48: {
    /* n:"BrtStyle" */
  },
  /*::[*/
  49: {
    /* n:"BrtCellMeta", */
    f: _f
  },
  /*::[*/
  50: {
    /* n:"BrtValueMeta" */
  },
  /*::[*/
  51: {
    /* n:"BrtMdb" */
    f: oo
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
    f: Tl
  },
  /*::[*/
  62: {
    /* n:"BrtCellRString", */
    f: Hu
  },
  /*::[*/
  63: {
    /* n:"BrtCalcChainItem$", */
    f: vo
  },
  /*::[*/
  64: {
    /* n:"BrtDVal", */
    f: h1
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
    f: Gr,
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
    f: l1
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
    f: vu
  },
  /*::[*/
  148: {
    /* n:"BrtWsDim", */
    f: xu,
    p: 16
  },
  /*::[*/
  151: {
    /* n:"BrtPane", */
    f: t1
  },
  /*::[*/
  152: {
    /* n:"BrtSel" */
  },
  /*::[*/
  153: {
    /* n:"BrtWbProp", */
    f: N1
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
    f: R1
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
    f: Dl
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
    f: mt
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
    f: Zu
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
    f: fo
  },
  /*::[*/
  336: {
    /* n:"BrtEndEsmdtinfo", */
    T: -1
  },
  /*::[*/
  337: {
    /* n:"BrtBeginEsmdb", */
    f: ho,
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
    f: s0
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
    f: dl
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
    f: n1
  },
  /*::[*/
  427: {
    /* n:"BrtShrFmla", */
    f: a1
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
    f: s1
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
    f: pu
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
    f: e1
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
    f: s0
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
    f: Eo
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
    f: _o
  },
  /*::[*/
  636: {
    /* n:"BrtEndComment", */
    T: -1
  },
  /*::[*/
  637: {
    /* n:"BrtCommentText", */
    f: Sf
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
    f: F1
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
    f: x1
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
function ee(e, t, r, n) {
  var a = t;
  if (!isNaN(a)) {
    var i = n || (r || []).length || 0, s = e.next(4);
    s.write_shift(2, a), s.write_shift(2, i), /*:: len != null &&*/
    i > 0 && v0(r) && e.push(r);
  }
}
function lh(e, t, r, n) {
  var a = (r || []).length || 0;
  if (a <= 8224) return ee(e, t, r, a);
  var i = t;
  if (!isNaN(i)) {
    for (var s = r.parts || [], f = 0, o = 0, l = 0; l + (s[f] || 8224) <= 8224; )
      l += s[f] || 8224, f++;
    var c = e.next(4);
    for (c.write_shift(2, i), c.write_shift(2, l), e.push(r.slice(o, o + l)), o += l; o < a; ) {
      for (c = e.next(4), c.write_shift(2, 60), l = 0; l + (s[f] || 8224) <= 8224; )
        l += s[f] || 8224, f++;
      c.write_shift(2, l), e.push(r.slice(o, o + l)), o += l;
    }
  }
}
function cn(e, t, r) {
  return e || (e = U(7)), e.write_shift(2, t), e.write_shift(2, r), e.write_shift(2, 0), e.write_shift(1, 0), e;
}
function oh(e, t, r, n) {
  var a = U(9);
  return cn(a, e, t), hi(r, n || "b", a), a;
}
function ch(e, t, r) {
  var n = U(8 + 2 * r.length);
  return cn(n, e, t), n.write_shift(1, r.length), n.write_shift(r.length, r, "sbcs"), n.l < n.length ? n.slice(0, n.l) : n;
}
function uh(e, t, r, n) {
  if (t.v != null) switch (t.t) {
    case "d":
    case "n":
      var a = t.t == "d" ? Er(pr(t.v)) : t.v;
      a == (a | 0) && a >= 0 && a < 65536 ? ee(e, 2, Al(r, n, a)) : ee(e, 3, Sl(r, n, a));
      return;
    case "b":
    case "e":
      ee(e, 5, oh(r, n, t.v, t.t));
      return;
    case "s":
    case "str":
      ee(e, 4, ch(r, n, (t.v || "").slice(0, 255)));
      return;
  }
  ee(e, 1, cn(null, r, n));
}
function hh(e, t, r, n) {
  var a = Array.isArray(t), i = Me(t["!ref"] || "A1"), s, f = "", o = [];
  if (i.e.c > 255 || i.e.r > 16383) {
    if (n.WTF) throw new Error("Range " + (t["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    i.e.c = Math.min(i.e.c, 255), i.e.r = Math.min(i.e.c, 16383), s = Xe(i);
  }
  for (var l = i.s.r; l <= i.e.r; ++l) {
    f = ar(l);
    for (var c = i.s.c; c <= i.e.c; ++c) {
      l === i.s.r && (o[c] = or(c)), s = o[c] + f;
      var d = a ? (t[l] || [])[c] : t[s];
      d && uh(e, d, l, c);
    }
  }
}
function xh(e, t) {
  for (var r = t || {}, n = Tr(), a = 0, i = 0; i < e.SheetNames.length; ++i) e.SheetNames[i] == r.sheet && (a = i);
  if (a == 0 && r.sheet && e.SheetNames[0] != r.sheet) throw new Error("Sheet not found: " + r.sheet);
  return ee(n, r.biff == 4 ? 1033 : r.biff == 3 ? 521 : 9, w0(e, 16, r)), hh(n, e.Sheets[e.SheetNames[a]], a, r), ee(n, 10), n.end();
}
function dh(e, t, r) {
  ee(e, 49, sl({
    sz: 12,
    name: "Arial"
  }, r));
}
function ph(e, t, r) {
  t && [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(n) {
    for (var a = n[0]; a <= n[1]; ++a) t[a] != null && ee(e, 1054, ol(a, t[a], r));
  });
}
function vh(e, t) {
  var r = U(19);
  r.write_shift(4, 2151), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 1), r.write_shift(4, 0), ee(e, 2151, r), r = U(39), r.write_shift(4, 2152), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 0), r.write_shift(4, 0), r.write_shift(2, 1), r.write_shift(4, 4), r.write_shift(2, 0), pi(Me(t["!ref"] || "A1"), r), r.write_shift(4, 4), ee(e, 2152, r);
}
function mh(e, t) {
  for (var r = 0; r < 16; ++r) ee(e, 224, fa({ numFmtId: 0, style: !0 }, 0, t));
  t.cellXfs.forEach(function(n) {
    ee(e, 224, fa(n, 0, t));
  });
}
function gh(e, t) {
  for (var r = 0; r < t["!links"].length; ++r) {
    var n = t["!links"][r];
    ee(e, 440, ml(n)), n[1].Tooltip && ee(e, 2048, gl(n));
  }
  delete t["!links"];
}
function _h(e, t) {
  if (t) {
    var r = 0;
    t.forEach(function(n, a) {
      ++r <= 256 && n && ee(e, 125, El($n(a, n), a));
    });
  }
}
function Th(e, t, r, n, a) {
  var i = 16 + it(a.cellXfs, t, a);
  if (t.v == null && !t.bf) {
    ee(e, 513, ht(r, n, i));
    return;
  }
  if (t.bf) ee(e, 6, Xc(t, r, n, a, i));
  else switch (t.t) {
    case "d":
    case "n":
      var s = t.t == "d" ? Er(pr(t.v)) : t.v;
      ee(e, 515, xl(r, n, s, i));
      break;
    case "b":
    case "e":
      ee(e, 517, hl(r, n, t.v, i, a, t.t));
      break;
    case "s":
    case "str":
      if (a.bookSST) {
        var f = C0(a.Strings, t.v, a.revStrings);
        ee(e, 253, fl(r, n, f, i));
      } else ee(e, 516, ll(r, n, (t.v || "").slice(0, 255), i, a));
      break;
    default:
      ee(e, 513, ht(r, n, i));
  }
}
function Eh(e, t, r) {
  var n = Tr(), a = r.SheetNames[e], i = r.Sheets[a] || {}, s = (r || {}).Workbook || {}, f = (s.Sheets || [])[e] || {}, o = Array.isArray(i), l = t.biff == 8, c, d = "", x = [], p = Me(i["!ref"] || "A1"), g = l ? 65536 : 16384;
  if (p.e.c > 255 || p.e.r >= g) {
    if (t.WTF) throw new Error("Range " + (i["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    p.e.c = Math.min(p.e.c, 255), p.e.r = Math.min(p.e.c, g - 1);
  }
  ee(n, 2057, w0(r, 16, t)), ee(n, 13, Rr(1)), ee(n, 12, Rr(100)), ee(n, 15, dr(!0)), ee(n, 17, dr(!1)), ee(n, 16, ut(1e-3)), ee(n, 95, dr(!0)), ee(n, 42, dr(!1)), ee(n, 43, dr(!1)), ee(n, 130, Rr(1)), ee(n, 128, ul()), ee(n, 131, dr(!1)), ee(n, 132, dr(!1)), l && _h(n, i["!cols"]), ee(n, 512, cl(p, t)), l && (i["!links"] = []);
  for (var u = p.s.r; u <= p.e.r; ++u) {
    d = ar(u);
    for (var _ = p.s.c; _ <= p.e.c; ++_) {
      u === p.s.r && (x[_] = or(_)), c = x[_] + d;
      var k = o ? (i[u] || [])[_] : i[c];
      k && (Th(n, k, u, _, t), l && k.l && i["!links"].push([c, k.l]));
    }
  }
  var D = f.CodeName || f.name || a;
  return l && ee(n, 574, il((s.Views || [])[0])), l && (i["!merges"] || []).length && ee(n, 229, vl(i["!merges"])), l && gh(n, i), ee(n, 442, di(D)), l && vh(n, i), ee(
    n,
    10
    /* EOF */
  ), n.end();
}
function wh(e, t, r) {
  var n = Tr(), a = (e || {}).Workbook || {}, i = a.Sheets || [], s = (
    /*::((*/
    a.WBProps || {
      /*::CodeName:"ThisWorkbook"*/
    }
  ), f = r.biff == 8, o = r.biff == 5;
  if (ee(n, 2057, w0(e, 5, r)), r.bookType == "xla" && ee(
    n,
    135
    /* Addin */
  ), ee(n, 225, f ? Rr(1200) : null), ee(n, 193, zf(2)), o && ee(
    n,
    191
    /* ToolbarHdr */
  ), o && ee(
    n,
    192
    /* ToolbarEnd */
  ), ee(
    n,
    226
    /* InterfaceEnd */
  ), ee(n, 92, rl("SheetJS", r)), ee(n, 66, Rr(f ? 1200 : 1252)), f && ee(n, 353, Rr(0)), f && ee(
    n,
    448
    /* Excel9File */
  ), ee(n, 317, wl(e.SheetNames.length)), f && e.vbaraw && ee(
    n,
    211
    /* ObProj */
  ), f && e.vbaraw) {
    var l = s.CodeName || "ThisWorkbook";
    ee(n, 442, di(l));
  }
  ee(n, 156, Rr(17)), ee(n, 25, dr(!1)), ee(n, 18, dr(!1)), ee(n, 19, Rr(0)), f && ee(n, 431, dr(!1)), f && ee(n, 444, Rr(0)), ee(n, 61, al()), ee(n, 64, dr(!1)), ee(n, 141, Rr(0)), ee(n, 34, dr(C1(e) == "true")), ee(n, 14, dr(!0)), f && ee(n, 439, dr(!1)), ee(n, 218, Rr(0)), dh(n, e, r), ph(n, e.SSF, r), mh(n, r), f && ee(n, 352, dr(!1));
  var c = n.end(), d = Tr();
  f && ee(d, 140, _l()), f && r.Strings && lh(d, 252, nl(r.Strings)), ee(
    d,
    10
    /* EOF */
  );
  var x = d.end(), p = Tr(), g = 0, u = 0;
  for (u = 0; u < e.SheetNames.length; ++u) g += (f ? 12 : 11) + (f ? 2 : 1) * e.SheetNames[u].length;
  var _ = c.length + g + x.length;
  for (u = 0; u < e.SheetNames.length; ++u) {
    var k = i[u] || {};
    ee(p, 133, tl({ pos: _, hs: k.Hidden || 0, dt: 0, name: e.SheetNames[u] }, r)), _ += t[u].length;
  }
  var D = p.end();
  if (g != D.length) throw new Error("BS8 " + g + " != " + D.length);
  var C = [];
  return c.length && C.push(c), D.length && C.push(D), x.length && C.push(x), tr(C);
}
function Sh(e, t) {
  var r = t || {}, n = [];
  e && !e.SSF && (e.SSF = wr(Ve)), e && e.SSF && (Wn(), Un(e.SSF), r.revssf = Vn(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF), r.Strings = /*::((*/
  [], r.Strings.Count = 0, r.Strings.Unique = 0, O0(r), r.cellXfs = [], it(r.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {});
  for (var a = 0; a < e.SheetNames.length; ++a) n[n.length] = Eh(a, r, e);
  return n.unshift(wh(e, n, r)), tr(n);
}
function Vi(e, t) {
  for (var r = 0; r <= e.SheetNames.length; ++r) {
    var n = e.Sheets[e.SheetNames[r]];
    if (!(!n || !n["!ref"])) {
      var a = kr(n["!ref"]);
      a.e.c > 255 && typeof console < "u" && console.error && console.error("Worksheet '" + e.SheetNames[r] + "' extends beyond column IV (255).  Data may be lost.");
    }
  }
  var i = t || {};
  switch (i.biff || 2) {
    case 8:
    case 5:
      return Sh(e, t);
    case 4:
    case 3:
    case 2:
      return xh(e, t);
  }
  throw new Error("invalid type " + i.bookType + " for BIFF");
}
function Ah(e, t, r, n) {
  for (var a = e["!merges"] || [], i = [], s = t.s.c; s <= t.e.c; ++s) {
    for (var f = 0, o = 0, l = 0; l < a.length; ++l)
      if (!(a[l].s.r > r || a[l].s.c > s) && !(a[l].e.r < r || a[l].e.c < s)) {
        if (a[l].s.r < r || a[l].s.c < s) {
          f = -1;
          break;
        }
        f = a[l].e.r - a[l].s.r + 1, o = a[l].e.c - a[l].s.c + 1;
        break;
      }
    if (!(f < 0)) {
      var c = ke({ r, c: s }), d = n.dense ? (e[r] || [])[s] : e[c], x = d && d.v != null && (d.h || Qs(d.w || (Zr(d), d.w) || "")) || "", p = {};
      f > 1 && (p.rowspan = f), o > 1 && (p.colspan = o), n.editable ? x = '<span contenteditable="true">' + x + "</span>" : d && (p["data-t"] = d && d.t || "z", d.v != null && (p["data-v"] = d.v), d.z != null && (p["data-z"] = d.z), d.l && (d.l.Target || "#").charAt(0) != "#" && (x = '<a href="' + d.l.Target + '">' + x + "</a>")), p.id = (n.id || "sjs") + "-" + c, i.push(Q("td", x, p));
    }
  }
  var g = "<tr>";
  return g + i.join("") + "</tr>";
}
var Fh = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>', yh = "</body></html>";
function Ch(e, t, r) {
  var n = [];
  return n.join("") + "<table" + (r && r.id ? ' id="' + r.id + '"' : "") + ">";
}
function Hi(e, t) {
  var r = t || {}, n = r.header != null ? r.header : Fh, a = r.footer != null ? r.footer : yh, i = [n], s = kr(e["!ref"]);
  r.dense = Array.isArray(e), i.push(Ch(e, s, r));
  for (var f = s.s.r; f <= s.e.r; ++f) i.push(Ah(e, s, f, r));
  return i.push("</table>" + a), i.join("");
}
function Gi(e, t, r) {
  var n = r || {}, a = 0, i = 0;
  if (n.origin != null)
    if (typeof n.origin == "number") a = n.origin;
    else {
      var s = typeof n.origin == "string" ? qe(n.origin) : n.origin;
      a = s.r, i = s.c;
    }
  var f = t.getElementsByTagName("tr"), o = Math.min(n.sheetRows || 1e7, f.length), l = { s: { r: 0, c: 0 }, e: { r: a, c: i } };
  if (e["!ref"]) {
    var c = kr(e["!ref"]);
    l.s.r = Math.min(l.s.r, c.s.r), l.s.c = Math.min(l.s.c, c.s.c), l.e.r = Math.max(l.e.r, c.e.r), l.e.c = Math.max(l.e.c, c.e.c), a == -1 && (l.e.r = a = c.e.r + 1);
  }
  var d = [], x = 0, p = e["!rows"] || (e["!rows"] = []), g = 0, u = 0, _ = 0, k = 0, D = 0, C = 0;
  for (e["!cols"] || (e["!cols"] = []); g < f.length && u < o; ++g) {
    var B = f[g];
    if (da(B)) {
      if (n.display) continue;
      p[u] = { hidden: !0 };
    }
    var Y = B.children;
    for (_ = k = 0; _ < Y.length; ++_) {
      var re = Y[_];
      if (!(n.display && da(re))) {
        var O = re.hasAttribute("data-v") ? re.getAttribute("data-v") : re.hasAttribute("v") ? re.getAttribute("v") : nf(re.innerHTML), b = re.getAttribute("data-z") || re.getAttribute("z");
        for (x = 0; x < d.length; ++x) {
          var M = d[x];
          M.s.c == k + i && M.s.r < u + a && u + a <= M.e.r && (k = M.e.c + 1 - i, x = -1);
        }
        C = +re.getAttribute("colspan") || 1, ((D = +re.getAttribute("rowspan") || 1) > 1 || C > 1) && d.push({ s: { r: u + a, c: k + i }, e: { r: u + a + (D || 1) - 1, c: k + i + (C || 1) - 1 } });
        var X = { t: "s", v: O }, K = re.getAttribute("data-t") || re.getAttribute("t") || "";
        O != null && (O.length == 0 ? X.t = K || "z" : n.raw || O.trim().length == 0 || K == "s" || (O === "TRUE" ? X = { t: "b", v: !0 } : O === "FALSE" ? X = { t: "b", v: !1 } : isNaN(Yr(O)) ? isNaN(Qt(O).getDate()) || (X = { t: "d", v: pr(O) }, n.cellDates || (X = { t: "n", v: Er(X.v) }), X.z = n.dateNF || Ve[14]) : X = { t: "n", v: Yr(O) })), X.z === void 0 && b != null && (X.z = b);
        var j = "", ne = re.getElementsByTagName("A");
        if (ne && ne.length) for (var Te = 0; Te < ne.length && !(ne[Te].hasAttribute("href") && (j = ne[Te].getAttribute("href"), j.charAt(0) != "#")); ++Te) ;
        j && j.charAt(0) != "#" && (X.l = { Target: j }), n.dense ? (e[u + a] || (e[u + a] = []), e[u + a][k + i] = X) : e[ke({ c: k + i, r: u + a })] = X, l.e.c < k + i && (l.e.c = k + i), k += C;
      }
    }
    ++u;
  }
  return d.length && (e["!merges"] = (e["!merges"] || []).concat(d)), l.e.r = Math.max(l.e.r, u - 1 + a), e["!ref"] = Xe(l), u >= o && (e["!fullref"] = Xe((l.e.r = f.length - g + u - 1 + a, l))), e;
}
function Xi(e, t) {
  var r = t || {}, n = r.dense ? [] : {};
  return Gi(n, e, t);
}
function Oh(e, t) {
  return xt(Xi(e, t), t);
}
function da(e) {
  var t = "", r = kh(e);
  return r && (t = r(e).getPropertyValue("display")), t || (t = e.style && e.style.display), t === "none";
}
function kh(e) {
  return e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle == "function" ? e.ownerDocument.defaultView.getComputedStyle : typeof getComputedStyle == "function" ? getComputedStyle : null;
}
var Dh = /* @__PURE__ */ function() {
  var e = [
    "<office:master-styles>",
    '<style:master-page style:name="mp1" style:page-layout-name="mp1">',
    "<style:header/>",
    '<style:header-left style:display="false"/>',
    "<style:footer/>",
    '<style:footer-left style:display="false"/>',
    "</style:master-page>",
    "</office:master-styles>"
  ].join(""), t = "<office:document-styles " + rn({
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
    return $e + t;
  };
}(), pa = /* @__PURE__ */ function() {
  var e = function(i) {
    return Oe(i).replace(/  +/g, function(s) {
      return '<text:s text:c="' + s.length + '"/>';
    }).replace(/\t/g, "<text:tab/>").replace(/\n/g, "</text:p><text:p>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>");
  }, t = `          <table:table-cell />
`, r = `          <table:covered-table-cell/>
`, n = function(i, s, f) {
    var o = [];
    o.push('      <table:table table:name="' + Oe(s.SheetNames[f]) + `" table:style-name="ta1">
`);
    var l = 0, c = 0, d = kr(i["!ref"] || "A1"), x = i["!merges"] || [], p = 0, g = Array.isArray(i);
    if (i["!cols"])
      for (c = 0; c <= d.e.c; ++c) o.push("        <table:table-column" + (i["!cols"][c] ? ' table:style-name="co' + i["!cols"][c].ods + '"' : "") + `></table:table-column>
`);
    var u = "", _ = i["!rows"] || [];
    for (l = 0; l < d.s.r; ++l)
      u = _[l] ? ' table:style-name="ro' + _[l].ods + '"' : "", o.push("        <table:table-row" + u + `></table:table-row>
`);
    for (; l <= d.e.r; ++l) {
      for (u = _[l] ? ' table:style-name="ro' + _[l].ods + '"' : "", o.push("        <table:table-row" + u + `>
`), c = 0; c < d.s.c; ++c) o.push(t);
      for (; c <= d.e.c; ++c) {
        var k = !1, D = {}, C = "";
        for (p = 0; p != x.length; ++p)
          if (!(x[p].s.c > c) && !(x[p].s.r > l) && !(x[p].e.c < c) && !(x[p].e.r < l)) {
            (x[p].s.c != c || x[p].s.r != l) && (k = !0), D["table:number-columns-spanned"] = x[p].e.c - x[p].s.c + 1, D["table:number-rows-spanned"] = x[p].e.r - x[p].s.r + 1;
            break;
          }
        if (k) {
          o.push(r);
          continue;
        }
        var B = ke({ r: l, c }), Y = g ? (i[l] || [])[c] : i[B];
        if (Y && Y.f && (D["table:formula"] = Oe(Jc(Y.f)), Y.F && Y.F.slice(0, B.length) == B)) {
          var re = kr(Y.F);
          D["table:number-matrix-columns-spanned"] = re.e.c - re.s.c + 1, D["table:number-matrix-rows-spanned"] = re.e.r - re.s.r + 1;
        }
        if (!Y) {
          o.push(t);
          continue;
        }
        switch (Y.t) {
          case "b":
            C = Y.v ? "TRUE" : "FALSE", D["office:value-type"] = "boolean", D["office:boolean-value"] = Y.v ? "true" : "false";
            break;
          case "n":
            C = Y.w || String(Y.v || 0), D["office:value-type"] = "float", D["office:value"] = Y.v || 0;
            break;
          case "s":
          case "str":
            C = Y.v == null ? "" : Y.v, D["office:value-type"] = "string";
            break;
          case "d":
            C = Y.w || pr(Y.v).toISOString(), D["office:value-type"] = "date", D["office:date-value"] = pr(Y.v).toISOString(), D["table:style-name"] = "ce1";
            break;
          default:
            o.push(t);
            continue;
        }
        var O = e(C);
        if (Y.l && Y.l.Target) {
          var b = Y.l.Target;
          b = b.charAt(0) == "#" ? "#" + Zc(b.slice(1)) : b, b.charAt(0) != "#" && !b.match(/^\w+:/) && (b = "../" + b), O = Q("text:a", O, { "xlink:href": b.replace(/&/g, "&amp;") });
        }
        o.push("          " + Q("table:table-cell", Q("text:p", O, {}), D) + `
`);
      }
      o.push(`        </table:table-row>
`);
    }
    return o.push(`      </table:table>
`), o.join("");
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
    s.SheetNames.map(function(l) {
      return s.Sheets[l];
    }).forEach(function(l) {
      if (l && l["!cols"]) {
        for (var c = 0; c < l["!cols"].length; ++c) if (l["!cols"][c]) {
          var d = l["!cols"][c];
          if (d.width == null && d.wpx == null && d.wch == null) continue;
          S0(d), d.ods = f;
          var x = l["!cols"][c].wpx + "px";
          i.push('  <style:style style:name="co' + f + `" style:family="table-column">
`), i.push('   <style:table-column-properties fo:break-before="auto" style:column-width="' + x + `"/>
`), i.push(`  </style:style>
`), ++f;
        }
      }
    });
    var o = 0;
    s.SheetNames.map(function(l) {
      return s.Sheets[l];
    }).forEach(function(l) {
      if (l && l["!rows"]) {
        for (var c = 0; c < l["!rows"].length; ++c) if (l["!rows"][c]) {
          l["!rows"][c].ods = o;
          var d = l["!rows"][c].hpx + "px";
          i.push('  <style:style style:name="ro' + o + `" style:family="table-row">
`), i.push('   <style:table-row-properties fo:break-before="auto" style:row-height="' + d + `"/>
`), i.push(`  </style:style>
`), ++o;
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
    var o = [$e], l = rn({
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
    }), c = rn({
      "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
      "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
    });
    f.bookType == "fods" ? (o.push("<office:document" + l + c + `>
`), o.push(ii().replace(/office:document-meta/g, "office:meta"))) : o.push("<office:document-content" + l + `>
`), a(o, s), o.push(`  <office:body>
`), o.push(`    <office:spreadsheet>
`);
    for (var d = 0; d != s.SheetNames.length; ++d) o.push(n(s.Sheets[s.SheetNames[d]], s, d));
    return o.push(`    </office:spreadsheet>
`), o.push(`  </office:body>
`), f.bookType == "fods" ? o.push("</office:document>") : o.push("</office:document-content>"), o.join("");
  };
}();
function $i(e, t) {
  if (t.bookType == "fods") return pa(e, t);
  var r = h0(), n = "", a = [], i = [];
  return n = "mimetype", ge(r, n, "application/vnd.oasis.opendocument.spreadsheet"), n = "content.xml", ge(r, n, pa(e, t)), a.push([n, "text/xml"]), i.push([n, "ContentFile"]), n = "styles.xml", ge(r, n, Dh(e, t)), a.push([n, "text/xml"]), i.push([n, "StylesFile"]), n = "meta.xml", ge(r, n, $e + ii(
    /*::wb, opts*/
  )), a.push([n, "text/xml"]), i.push([n, "MetadataFile"]), n = "manifest.rdf", ge(r, n, Vf(
    i
    /*, opts*/
  )), a.push([n, "application/rdf+xml"]), n = "META-INF/manifest.xml", ge(r, n, Uf(
    a
    /*, opts*/
  )), r;
}
/*! sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
function Mn(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function Rh(e) {
  return typeof TextEncoder < "u" ? new TextEncoder().encode(e) : Mr(en(e));
}
function Ih(e, t) {
  e:
    for (var r = 0; r <= e.length - t.length; ++r) {
      for (var n = 0; n < t.length; ++n)
        if (e[r + n] != t[n])
          continue e;
      return !0;
    }
  return !1;
}
function at(e) {
  var t = e.reduce(function(a, i) {
    return a + i.length;
  }, 0), r = new Uint8Array(t), n = 0;
  return e.forEach(function(a) {
    r.set(a, n), n += a.length;
  }), r;
}
function Nh(e, t, r) {
  var n = Math.floor(r == 0 ? 0 : Math.LOG10E * Math.log(Math.abs(r))) + 6176 - 20, a = r / Math.pow(10, n - 6176);
  e[t + 15] |= n >> 7, e[t + 14] |= (n & 127) << 1;
  for (var i = 0; a >= 1; ++i, a /= 256)
    e[t + i] = a & 255;
  e[t + 15] |= r >= 0 ? 0 : 128;
}
function tn(e, t) {
  var r = t ? t[0] : 0, n = e[r] & 127;
  e:
    if (e[r++] >= 128 && (n |= (e[r] & 127) << 7, e[r++] < 128 || (n |= (e[r] & 127) << 14, e[r++] < 128) || (n |= (e[r] & 127) << 21, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 28), ++r, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 35), ++r, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 42), ++r, e[r++] < 128)))
      break e;
  return t && (t[0] = r), n;
}
function ye(e) {
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
function yt(e) {
  var t = 0, r = e[t] & 127;
  e:
    if (e[t++] >= 128) {
      if (r |= (e[t] & 127) << 7, e[t++] < 128 || (r |= (e[t] & 127) << 14, e[t++] < 128) || (r |= (e[t] & 127) << 21, e[t++] < 128))
        break e;
      r |= (e[t] & 127) << 28;
    }
  return r;
}
function Ye(e) {
  for (var t = [], r = [0]; r[0] < e.length; ) {
    var n = r[0], a = tn(e, r), i = a & 7;
    a = Math.floor(a / 8);
    var s = 0, f;
    if (a == 0)
      break;
    switch (i) {
      case 0:
        {
          for (var o = r[0]; e[r[0]++] >= 128; )
            ;
          f = e.slice(o, r[0]);
        }
        break;
      case 5:
        s = 4, f = e.slice(r[0], r[0] + s), r[0] += s;
        break;
      case 1:
        s = 8, f = e.slice(r[0], r[0] + s), r[0] += s;
        break;
      case 2:
        s = tn(e, r), f = e.slice(r[0], r[0] + s), r[0] += s;
        break;
      case 3:
      case 4:
      default:
        throw new Error("PB Type ".concat(i, " for Field ").concat(a, " at offset ").concat(n));
    }
    var l = { data: f, type: i };
    t[a] == null ? t[a] = [l] : t[a].push(l);
  }
  return t;
}
function er(e) {
  var t = [];
  return e.forEach(function(r, n) {
    r.forEach(function(a) {
      a.data && (t.push(ye(n * 8 + a.type)), a.type == 2 && t.push(ye(a.data.length)), t.push(a.data));
    });
  }), at(t);
}
function Pr(e) {
  for (var t, r = [], n = [0]; n[0] < e.length; ) {
    var a = tn(e, n), i = Ye(e.slice(n[0], n[0] + a));
    n[0] += a;
    var s = {
      id: yt(i[1][0].data),
      messages: []
    };
    i[2].forEach(function(f) {
      var o = Ye(f.data), l = yt(o[3][0].data);
      s.messages.push({
        meta: o,
        data: e.slice(n[0], n[0] + l)
      }), n[0] += l;
    }), (t = i[3]) != null && t[0] && (s.merge = yt(i[3][0].data) >>> 0 > 0), r.push(s);
  }
  return r;
}
function _t(e) {
  var t = [];
  return e.forEach(function(r) {
    var n = [];
    n[1] = [{ data: ye(r.id), type: 0 }], n[2] = [], r.merge != null && (n[3] = [{ data: ye(+!!r.merge), type: 0 }]);
    var a = [];
    r.messages.forEach(function(s) {
      a.push(s.data), s.meta[3] = [{ type: 0, data: ye(s.data.length) }], n[2].push({ data: er(s.meta), type: 2 });
    });
    var i = er(n);
    t.push(ye(i.length)), t.push(i), a.forEach(function(s) {
      return t.push(s);
    });
  }), at(t);
}
function Ph(e, t) {
  if (e != 0)
    throw new Error("Unexpected Snappy chunk type ".concat(e));
  for (var r = [0], n = tn(t, r), a = []; r[0] < t.length; ) {
    var i = t[r[0]] & 3;
    if (i == 0) {
      var s = t[r[0]++] >> 2;
      if (s < 60)
        ++s;
      else {
        var f = s - 59;
        s = t[r[0]], f > 1 && (s |= t[r[0] + 1] << 8), f > 2 && (s |= t[r[0] + 2] << 16), f > 3 && (s |= t[r[0] + 3] << 24), s >>>= 0, s++, r[0] += f;
      }
      a.push(t.slice(r[0], r[0] + s)), r[0] += s;
      continue;
    } else {
      var o = 0, l = 0;
      if (i == 1 ? (l = (t[r[0]] >> 2 & 7) + 4, o = (t[r[0]++] & 224) << 3, o |= t[r[0]++]) : (l = (t[r[0]++] >> 2) + 1, i == 2 ? (o = t[r[0]] | t[r[0] + 1] << 8, r[0] += 2) : (o = (t[r[0]] | t[r[0] + 1] << 8 | t[r[0] + 2] << 16 | t[r[0] + 3] << 24) >>> 0, r[0] += 4)), a = [at(a)], o == 0)
        throw new Error("Invalid offset 0");
      if (o > a[0].length)
        throw new Error("Invalid offset beyond length");
      if (l >= o)
        for (a.push(a[0].slice(-o)), l -= o; l >= a[a.length - 1].length; )
          a.push(a[a.length - 1]), l -= a[a.length - 1].length;
      a.push(a[0].slice(-o, -o + l));
    }
  }
  var c = at(a);
  if (c.length != n)
    throw new Error("Unexpected length: ".concat(c.length, " != ").concat(n));
  return c;
}
function Lr(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var n = e[r++], a = e[r] | e[r + 1] << 8 | e[r + 2] << 16;
    r += 3, t.push(Ph(n, e.slice(r, r + a))), r += a;
  }
  if (r !== e.length)
    throw new Error("data is not a valid framed stream!");
  return at(t);
}
function Tt(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var n = Math.min(e.length - r, 268435455), a = new Uint8Array(4);
    t.push(a);
    var i = ye(n), s = i.length;
    t.push(i), n <= 60 ? (s++, t.push(new Uint8Array([n - 1 << 2]))) : n <= 256 ? (s += 2, t.push(new Uint8Array([240, n - 1 & 255]))) : n <= 65536 ? (s += 3, t.push(new Uint8Array([244, n - 1 & 255, n - 1 >> 8 & 255]))) : n <= 16777216 ? (s += 4, t.push(new Uint8Array([248, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255]))) : n <= 4294967296 && (s += 5, t.push(new Uint8Array([252, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255, n - 1 >>> 24 & 255]))), t.push(e.slice(r, r + n)), s += n, a[0] = 0, a[1] = s & 255, a[2] = s >> 8 & 255, a[3] = s >> 16 & 255, r += n;
  }
  return at(t);
}
function r0(e, t) {
  var r = new Uint8Array(32), n = Mn(r), a = 12, i = 0;
  switch (r[0] = 5, e.t) {
    case "n":
      r[1] = 2, Nh(r, a, e.v), i |= 1, a += 16;
      break;
    case "b":
      r[1] = 6, n.setFloat64(a, e.v ? 1 : 0, !0), i |= 2, a += 8;
      break;
    case "s":
      if (t.indexOf(e.v) == -1)
        throw new Error("Value ".concat(e.v, " missing from SST!"));
      r[1] = 3, n.setUint32(a, t.indexOf(e.v), !0), i |= 8, a += 4;
      break;
    default:
      throw "unsupported cell type " + e.t;
  }
  return n.setUint32(8, i, !0), r.slice(0, a);
}
function t0(e, t) {
  var r = new Uint8Array(32), n = Mn(r), a = 12, i = 0;
  switch (r[0] = 3, e.t) {
    case "n":
      r[2] = 2, n.setFloat64(a, e.v, !0), i |= 32, a += 8;
      break;
    case "b":
      r[2] = 6, n.setFloat64(a, e.v ? 1 : 0, !0), i |= 32, a += 8;
      break;
    case "s":
      if (t.indexOf(e.v) == -1)
        throw new Error("Value ".concat(e.v, " missing from SST!"));
      r[2] = 3, n.setUint32(a, t.indexOf(e.v), !0), i |= 16, a += 4;
      break;
    default:
      throw "unsupported cell type " + e.t;
  }
  return n.setUint32(4, i, !0), r.slice(0, a);
}
function Qr(e) {
  var t = Ye(e);
  return tn(t[1][0].data);
}
function Lh(e, t, r) {
  var n, a, i, s;
  if (!((n = e[6]) != null && n[0]) || !((a = e[7]) != null && a[0]))
    throw "Mutation only works on post-BNC storages!";
  var f = ((s = (i = e[8]) == null ? void 0 : i[0]) == null ? void 0 : s.data) && yt(e[8][0].data) > 0 || !1;
  if (f)
    throw "Math only works with normal offsets";
  for (var o = 0, l = Mn(e[7][0].data), c = 0, d = [], x = Mn(e[4][0].data), p = 0, g = [], u = 0; u < t.length; ++u) {
    if (t[u] == null) {
      l.setUint16(u * 2, 65535, !0), x.setUint16(u * 2, 65535);
      continue;
    }
    l.setUint16(u * 2, c, !0), x.setUint16(u * 2, p, !0);
    var _, k;
    switch (typeof t[u]) {
      case "string":
        _ = r0({ t: "s", v: t[u] }, r), k = t0({ t: "s", v: t[u] }, r);
        break;
      case "number":
        _ = r0({ t: "n", v: t[u] }, r), k = t0({ t: "n", v: t[u] }, r);
        break;
      case "boolean":
        _ = r0({ t: "b", v: t[u] }, r), k = t0({ t: "b", v: t[u] }, r);
        break;
      default:
        throw new Error("Unsupported value " + t[u]);
    }
    d.push(_), c += _.length, g.push(k), p += k.length, ++o;
  }
  for (e[2][0].data = ye(o); u < e[7][0].data.length / 2; ++u)
    l.setUint16(u * 2, 65535, !0), x.setUint16(u * 2, 65535, !0);
  return e[6][0].data = at(d), e[3][0].data = at(g), o;
}
function Mh(e, t) {
  if (!t || !t.numbers)
    throw new Error("Must pass a `numbers` option -- check the README");
  var r = e.Sheets[e.SheetNames[0]];
  e.SheetNames.length > 1 && console.error("The Numbers writer currently writes only the first table");
  var n = kr(r["!ref"]);
  n.s.r = n.s.c = 0;
  var a = !1;
  n.e.c > 9 && (a = !0, n.e.c = 9), n.e.r > 49 && (a = !0, n.e.r = 49), a && console.error("The Numbers writer is currently limited to ".concat(Xe(n)));
  var i = Bn(r, { range: n, header: 1 }), s = ["~Sh33tJ5~"];
  i.forEach(function(L) {
    return L.forEach(function(F) {
      typeof F == "string" && s.push(F);
    });
  });
  var f = {}, o = [], l = De.read(t.numbers, { type: "base64" });
  l.FileIndex.map(function(L, F) {
    return [L, l.FullPaths[F]];
  }).forEach(function(L) {
    var F = L[0], A = L[1];
    if (F.type == 2 && F.name.match(/\.iwa/)) {
      var V = F.content, ue = Lr(V), he = Pr(ue);
      he.forEach(function(ce) {
        o.push(ce.id), f[ce.id] = { deps: [], location: A, type: yt(ce.messages[0].meta[1][0].data) };
      });
    }
  }), o.sort(function(L, F) {
    return L - F;
  });
  var c = o.filter(function(L) {
    return L > 1;
  }).map(function(L) {
    return [L, ye(L)];
  });
  l.FileIndex.map(function(L, F) {
    return [L, l.FullPaths[F]];
  }).forEach(function(L) {
    var F = L[0];
    if (L[1], !!F.name.match(/\.iwa/)) {
      var A = Pr(Lr(F.content));
      A.forEach(function(V) {
        V.messages.forEach(function(ue) {
          c.forEach(function(he) {
            V.messages.some(function(ce) {
              return yt(ce.meta[1][0].data) != 11006 && Ih(ce.data, he[1]);
            }) && f[he[0]].deps.push(V.id);
          });
        });
      });
    }
  });
  for (var d = De.find(l, f[1].location), x = Pr(Lr(d.content)), p, g = 0; g < x.length; ++g) {
    var u = x[g];
    u.id == 1 && (p = u);
  }
  var _ = Qr(Ye(p.messages[0].data)[1][0].data);
  for (d = De.find(l, f[_].location), x = Pr(Lr(d.content)), g = 0; g < x.length; ++g)
    u = x[g], u.id == _ && (p = u);
  for (_ = Qr(Ye(p.messages[0].data)[2][0].data), d = De.find(l, f[_].location), x = Pr(Lr(d.content)), g = 0; g < x.length; ++g)
    u = x[g], u.id == _ && (p = u);
  for (_ = Qr(Ye(p.messages[0].data)[2][0].data), d = De.find(l, f[_].location), x = Pr(Lr(d.content)), g = 0; g < x.length; ++g)
    u = x[g], u.id == _ && (p = u);
  var k = Ye(p.messages[0].data);
  {
    k[6][0].data = ye(n.e.r + 1), k[7][0].data = ye(n.e.c + 1);
    var D = Qr(k[46][0].data), C = De.find(l, f[D].location), B = Pr(Lr(C.content));
    {
      for (var Y = 0; Y < B.length && B[Y].id != D; ++Y)
        ;
      if (B[Y].id != D)
        throw "Bad ColumnRowUIDMapArchive";
      var re = Ye(B[Y].messages[0].data);
      re[1] = [], re[2] = [], re[3] = [];
      for (var O = 0; O <= n.e.c; ++O) {
        var b = [];
        b[1] = b[2] = [{ type: 0, data: ye(O + 420690) }], re[1].push({ type: 2, data: er(b) }), re[2].push({ type: 0, data: ye(O) }), re[3].push({ type: 0, data: ye(O) });
      }
      re[4] = [], re[5] = [], re[6] = [];
      for (var M = 0; M <= n.e.r; ++M)
        b = [], b[1] = b[2] = [{ type: 0, data: ye(M + 726270) }], re[4].push({ type: 2, data: er(b) }), re[5].push({ type: 0, data: ye(M) }), re[6].push({ type: 0, data: ye(M) });
      B[Y].messages[0].data = er(re);
    }
    C.content = Tt(_t(B)), C.size = C.content.length, delete k[46];
    var X = Ye(k[4][0].data);
    {
      X[7][0].data = ye(n.e.r + 1);
      var K = Ye(X[1][0].data), j = Qr(K[2][0].data);
      C = De.find(l, f[j].location), B = Pr(Lr(C.content));
      {
        if (B[0].id != j)
          throw "Bad HeaderStorageBucket";
        var ne = Ye(B[0].messages[0].data);
        for (M = 0; M < i.length; ++M) {
          var Te = Ye(ne[2][0].data);
          Te[1][0].data = ye(M), Te[4][0].data = ye(i[M].length), ne[2][M] = { type: ne[2][0].type, data: er(Te) };
        }
        B[0].messages[0].data = er(ne);
      }
      C.content = Tt(_t(B)), C.size = C.content.length;
      var xe = Qr(X[2][0].data);
      C = De.find(l, f[xe].location), B = Pr(Lr(C.content));
      {
        if (B[0].id != xe)
          throw "Bad HeaderStorageBucket";
        for (ne = Ye(B[0].messages[0].data), O = 0; O <= n.e.c; ++O)
          Te = Ye(ne[2][0].data), Te[1][0].data = ye(O), Te[4][0].data = ye(n.e.r + 1), ne[2][O] = { type: ne[2][0].type, data: er(Te) };
        B[0].messages[0].data = er(ne);
      }
      C.content = Tt(_t(B)), C.size = C.content.length;
      var Re = Qr(X[4][0].data);
      (function() {
        for (var L = De.find(l, f[Re].location), F = Pr(Lr(L.content)), A, V = 0; V < F.length; ++V) {
          var ue = F[V];
          ue.id == Re && (A = ue);
        }
        var he = Ye(A.messages[0].data);
        {
          he[3] = [];
          var ce = [];
          s.forEach(function(_e, je) {
            ce[1] = [{ type: 0, data: ye(je) }], ce[2] = [{ type: 0, data: ye(1) }], ce[3] = [{ type: 2, data: Rh(_e) }], he[3].push({ type: 2, data: er(ce) });
          });
        }
        A.messages[0].data = er(he);
        var ae = _t(F), Ae = Tt(ae);
        L.content = Ae, L.size = L.content.length;
      })();
      var de = Ye(X[3][0].data);
      {
        var vr = de[1][0];
        delete de[2];
        var He = Ye(vr.data);
        {
          var ur = Qr(He[2][0].data);
          (function() {
            for (var L = De.find(l, f[ur].location), F = Pr(Lr(L.content)), A, V = 0; V < F.length; ++V) {
              var ue = F[V];
              ue.id == ur && (A = ue);
            }
            var he = Ye(A.messages[0].data);
            {
              delete he[6], delete de[7];
              var ce = new Uint8Array(he[5][0].data);
              he[5] = [];
              for (var ae = 0, Ae = 0; Ae <= n.e.r; ++Ae) {
                var _e = Ye(ce);
                ae += Lh(_e, i[Ae], s), _e[1][0].data = ye(Ae), he[5].push({ data: er(_e), type: 2 });
              }
              he[1] = [{ type: 0, data: ye(n.e.c + 1) }], he[2] = [{ type: 0, data: ye(n.e.r + 1) }], he[3] = [{ type: 0, data: ye(ae) }], he[4] = [{ type: 0, data: ye(n.e.r + 1) }];
            }
            A.messages[0].data = er(he);
            var je = _t(F), Ee = Tt(je);
            L.content = Ee, L.size = L.content.length;
          })();
        }
        vr.data = er(He);
      }
      X[3][0].data = er(de);
    }
    k[4][0].data = er(X);
  }
  p.messages[0].data = er(k);
  var hr = _t(x), S = Tt(hr);
  return d.content = S, d.size = d.content.length, l;
}
function Bh(e) {
  return function(r) {
    for (var n = 0; n != e.length; ++n) {
      var a = e[n];
      r[a[0]] === void 0 && (r[a[0]] = a[1]), a[2] === "n" && (r[a[0]] = Number(r[a[0]]));
    }
  };
}
function O0(e) {
  Bh([
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
function bh(e, t) {
  return t.bookType == "ods" ? $i(e, t) : t.bookType == "numbers" ? Mh(e, t) : t.bookType == "xlsb" ? Uh(e, t) : Wh(e, t);
}
function Uh(e, t) {
  wt = 1024, e && !e.SSF && (e.SSF = wr(Ve)), e && e.SSF && (Wn(), Un(e.SSF), t.revssf = Vn(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, Jt ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = t.bookType == "xlsb" ? "bin" : "xml", n = Ci.indexOf(t.bookType) > -1, a = ti();
  O0(t = t || {});
  var i = h0(), s = "", f = 0;
  if (t.cellXfs = [], it(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", ge(i, s, si(e.Props, t)), a.coreprops.push(s), Ce(t.rels, 2, s, we.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var o = [], l = 0; l < e.SheetNames.length; ++l)
      (e.Workbook.Sheets[l] || {}).Hidden != 2 && o.push(e.SheetNames[l]);
    e.Props.SheetNames = o;
  }
  for (e.Props.Worksheets = e.Props.SheetNames.length, ge(i, s, li(e.Props)), a.extprops.push(s), Ce(t.rels, 3, s, we.EXT_PROPS), e.Custprops !== e.Props && ir(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", ge(i, s, oi(e.Custprops)), a.custprops.push(s), Ce(t.rels, 4, s, we.CUST_PROPS)), f = 1; f <= e.SheetNames.length; ++f) {
    var c = { "!id": {} }, d = e.Sheets[e.SheetNames[f - 1]], x = (d || {})["!type"] || "sheet";
    switch (x) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + r, ge(i, s, H1(f - 1, s, t, e, c)), a.sheets.push(s), Ce(t.wbrels, -1, "worksheets/sheet" + f + "." + r, we.WS[0]);
    }
    if (d) {
      var p = d["!comments"], g = !1, u = "";
      p && p.length > 0 && (u = "xl/comments" + f + "." + r, ge(i, u, $1(p, u)), a.comments.push(u), Ce(c, -1, "../comments" + f + "." + r, we.CMNT), g = !0), d["!legacy"] && g && ge(i, "xl/drawings/vmlDrawing" + f + ".vml", Fi(f, d["!comments"])), delete d["!comments"], delete d["!legacy"];
    }
    c["!id"].rId1 && ge(i, ai(s), At(c));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, ge(i, s, X1(t.Strings, s, t)), a.strs.push(s), Ce(t.wbrels, -1, "sharedStrings." + r, we.SST)), s = "xl/workbook." + r, ge(i, s, V1(e, s)), a.workbooks.push(s), Ce(t.rels, 1, s, we.WB), s = "xl/theme/theme1.xml", ge(i, s, Si(e.Themes, t)), a.themes.push(s), Ce(t.wbrels, -1, "theme/theme1.xml", we.THEME), s = "xl/styles." + r, ge(i, s, G1(e, s, t)), a.styles.push(s), Ce(t.wbrels, -1, "styles." + r, we.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", ge(i, s, e.vbaraw), a.vba.push(s), Ce(t.wbrels, -1, "vbaProject.bin", we.VBA)), s = "xl/metadata." + r, ge(i, s, z1(s)), a.metadata.push(s), Ce(t.wbrels, -1, "metadata." + r, we.XLMETA), ge(i, "[Content_Types].xml", ni(a, t)), ge(i, "_rels/.rels", At(t.rels)), ge(i, "xl/_rels/workbook." + r + ".rels", At(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function Wh(e, t) {
  wt = 1024, e && !e.SSF && (e.SSF = wr(Ve)), e && e.SSF && (Wn(), Un(e.SSF), t.revssf = Vn(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, Jt ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = "xml", n = Ci.indexOf(t.bookType) > -1, a = ti();
  O0(t = t || {});
  var i = h0(), s = "", f = 0;
  if (t.cellXfs = [], it(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", ge(i, s, si(e.Props, t)), a.coreprops.push(s), Ce(t.rels, 2, s, we.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var o = [], l = 0; l < e.SheetNames.length; ++l)
      (e.Workbook.Sheets[l] || {}).Hidden != 2 && o.push(e.SheetNames[l]);
    e.Props.SheetNames = o;
  }
  e.Props.Worksheets = e.Props.SheetNames.length, ge(i, s, li(e.Props)), a.extprops.push(s), Ce(t.rels, 3, s, we.EXT_PROPS), e.Custprops !== e.Props && ir(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", ge(i, s, oi(e.Custprops)), a.custprops.push(s), Ce(t.rels, 4, s, we.CUST_PROPS));
  var c = ["SheetJ5"];
  for (t.tcid = 0, f = 1; f <= e.SheetNames.length; ++f) {
    var d = { "!id": {} }, x = e.Sheets[e.SheetNames[f - 1]], p = (x || {})["!type"] || "sheet";
    switch (p) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + r, ge(i, s, Mi(f - 1, t, e, d)), a.sheets.push(s), Ce(t.wbrels, -1, "worksheets/sheet" + f + "." + r, we.WS[0]);
    }
    if (x) {
      var g = x["!comments"], u = !1, _ = "";
      if (g && g.length > 0) {
        var k = !1;
        g.forEach(function(D) {
          D[1].forEach(function(C) {
            C.T == !0 && (k = !0);
          });
        }), k && (_ = "xl/threadedComments/threadedComment" + f + "." + r, ge(i, _, mo(g, c, t)), a.threadedcomments.push(_), Ce(d, -1, "../threadedComments/threadedComment" + f + "." + r, we.TCMNT)), _ = "xl/comments" + f + "." + r, ge(i, _, yi(g)), a.comments.push(_), Ce(d, -1, "../comments" + f + "." + r, we.CMNT), u = !0;
      }
      x["!legacy"] && u && ge(i, "xl/drawings/vmlDrawing" + f + ".vml", Fi(f, x["!comments"])), delete x["!comments"], delete x["!legacy"];
    }
    d["!id"].rId1 && ge(i, ai(s), At(d));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, ge(i, s, mi(t.Strings, t)), a.strs.push(s), Ce(t.wbrels, -1, "sharedStrings." + r, we.SST)), s = "xl/workbook." + r, ge(i, s, Ui(e)), a.workbooks.push(s), Ce(t.rels, 1, s, we.WB), s = "xl/theme/theme1.xml", ge(i, s, Si(e.Themes, t)), a.themes.push(s), Ce(t.wbrels, -1, "theme/theme1.xml", we.THEME), s = "xl/styles." + r, ge(i, s, Ei(e, t)), a.styles.push(s), Ce(t.wbrels, -1, "styles." + r, we.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", ge(i, s, e.vbaraw), a.vba.push(s), Ce(t.wbrels, -1, "vbaProject.bin", we.VBA)), s = "xl/metadata." + r, ge(i, s, Ai()), a.metadata.push(s), Ce(t.wbrels, -1, "metadata." + r, we.XLMETA), c.length > 1 && (s = "xl/persons/person.xml", ge(i, s, go(c)), a.people.push(s), Ce(t.wbrels, -1, "persons/person.xml", we.PEOPLE)), ge(i, "[Content_Types].xml", ni(a, t)), ge(i, "_rels/.rels", At(t.rels)), ge(i, "xl/_rels/workbook." + r + ".rels", At(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function Vh(e, t) {
  var r = "";
  switch ((t || {}).type || "base64") {
    case "buffer":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    case "base64":
      r = Jr(e.slice(0, 12));
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
function zi(e, t) {
  switch (t.type) {
    case "base64":
    case "binary":
      break;
    case "buffer":
    case "array":
      t.type = "";
      break;
    case "file":
      return sn(t.file, De.write(e, { type: Se ? "buffer" : "" }));
    case "string":
      throw new Error("'string' output type invalid for '" + t.bookType + "' files");
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  return De.write(e, t);
}
function Hh(e, t) {
  var r = wr(t || {}), n = bh(e, r);
  return Gh(n, r);
}
function Gh(e, t) {
  var r = {}, n = Se ? "nodebuffer" : typeof Uint8Array < "u" ? "array" : "string";
  if (t.compression && (r.compression = "DEFLATE"), t.password) r.type = n;
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
      r.type = n;
      break;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  var a = e.FullPaths ? De.write(e, { fileType: "zip", type: (
    /*::(*/
    { nodebuffer: "buffer", string: "binary" }[r.type] || r.type
  ), compression: !!t.compression }) : e.generate(r);
  if (typeof Deno < "u" && typeof a == "string") {
    if (t.type == "binary" || t.type == "base64") return a;
    a = new Uint8Array(bn(a));
  }
  return t.password && typeof encrypt_agile < "u" ? zi(encrypt_agile(a, t.password), t) : t.type === "file" ? sn(t.file, a) : t.type == "string" ? zt(
    /*::(*/
    a
    /*:: :any)*/
  ) : a;
}
function Xh(e, t) {
  var r = t || {}, n = sh(e, r);
  return zi(n, r);
}
function Hr(e, t, r) {
  r || (r = "");
  var n = r + e;
  switch (t.type) {
    case "base64":
      return qt(en(n));
    case "binary":
      return en(n);
    case "string":
      return e;
    case "file":
      return sn(t.file, n, "utf8");
    case "buffer":
      return Se ? qr(n, "utf8") : typeof TextEncoder < "u" ? new TextEncoder().encode(n) : Hr(n, { type: "binary" }).split("").map(function(a) {
        return a.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function $h(e, t) {
  switch (t.type) {
    case "base64":
      return qt(e);
    case "binary":
      return e;
    case "string":
      return e;
    case "file":
      return sn(t.file, e, "binary");
    case "buffer":
      return Se ? qr(e, "binary") : e.split("").map(function(r) {
        return r.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function wn(e, t) {
  switch (t.type) {
    case "string":
    case "base64":
    case "binary":
      for (var r = "", n = 0; n < e.length; ++n) r += String.fromCharCode(e[n]);
      return t.type == "base64" ? qt(r) : t.type == "string" ? zt(r) : r;
    case "file":
      return sn(t.file, e);
    case "buffer":
      return e;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
}
function Ki(e, t) {
  ms(), D1(e);
  var r = wr(t || {});
  if (r.cellStyles && (r.cellNF = !0, r.sheetStubs = !0), r.type == "array") {
    r.type = "binary";
    var n = Ki(e, r);
    return r.type = "array", bn(n);
  }
  var a = 0;
  if (r.sheet && (typeof r.sheet == "number" ? a = r.sheet : a = e.SheetNames.indexOf(r.sheet), !e.SheetNames[a]))
    throw new Error("Sheet not found: " + r.sheet + " : " + typeof r.sheet);
  switch (r.bookType || "xlsb") {
    case "xml":
    case "xlml":
      return Hr(ah(e, r), r);
    case "slk":
    case "sylk":
      return Hr(yl.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "htm":
    case "html":
      return Hr(Hi(e.Sheets[e.SheetNames[a]], r), r);
    case "txt":
      return $h(Yi(e.Sheets[e.SheetNames[a]], r), r);
    case "csv":
      return Hr(k0(e.Sheets[e.SheetNames[a]], r), r, "\uFEFF");
    case "dif":
      return Hr(Cl.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "dbf":
      return wn(Fl.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "prn":
      return Hr(Ol.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "rtf":
      return Hr(Ll.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "eth":
      return Hr(vi.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "fods":
      return Hr($i(e, r), r);
    case "wk1":
      return wn(la.sheet_to_wk1(e.Sheets[e.SheetNames[a]], r), r);
    case "wk3":
      return wn(la.book_to_wk3(e, r), r);
    case "biff2":
      r.biff || (r.biff = 2);
    case "biff3":
      r.biff || (r.biff = 3);
    case "biff4":
      return r.biff || (r.biff = 4), wn(Vi(e, r), r);
    case "biff5":
      r.biff || (r.biff = 5);
    case "biff8":
    case "xla":
    case "xls":
      return r.biff || (r.biff = 8), Xh(e, r);
    case "xlsx":
    case "xlsm":
    case "xlam":
    case "xlsb":
    case "numbers":
    case "ods":
      return Hh(e, r);
    default:
      throw new Error("Unrecognized bookType |" + r.bookType + "|");
  }
}
function zh(e) {
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
function Kh(e, t, r) {
  var n = {};
  return n.type = "file", n.file = t, zh(n), Ki(e, n);
}
function Yh(e, t, r, n, a, i, s, f) {
  var o = ar(r), l = f.defval, c = f.raw || !Object.prototype.hasOwnProperty.call(f, "raw"), d = !0, x = a === 1 ? [] : {};
  if (a !== 1)
    if (Object.defineProperty) try {
      Object.defineProperty(x, "__rowNum__", { value: r, enumerable: !1 });
    } catch {
      x.__rowNum__ = r;
    }
    else x.__rowNum__ = r;
  if (!s || e[r]) for (var p = t.s.c; p <= t.e.c; ++p) {
    var g = s ? e[r][p] : e[n[p] + o];
    if (g === void 0 || g.t === void 0) {
      if (l === void 0) continue;
      i[p] != null && (x[i[p]] = l);
      continue;
    }
    var u = g.v;
    switch (g.t) {
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
        throw new Error("unrecognized type " + g.t);
    }
    if (i[p] != null) {
      if (u == null)
        if (g.t == "e" && u === null) x[i[p]] = null;
        else if (l !== void 0) x[i[p]] = l;
        else if (c && u === null) x[i[p]] = null;
        else continue;
      else
        x[i[p]] = c && (g.t !== "n" || g.t === "n" && f.rawNumbers !== !1) ? u : Zr(g, u, f);
      u != null && (d = !1);
    }
  }
  return { row: x, isempty: d };
}
function Bn(e, t) {
  if (e == null || e["!ref"] == null) return [];
  var r = { t: "n", v: 0 }, n = 0, a = 1, i = [], s = 0, f = "", o = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, l = t || {}, c = l.range != null ? l.range : e["!ref"];
  switch (l.header === 1 ? n = 1 : l.header === "A" ? n = 2 : Array.isArray(l.header) ? n = 3 : l.header == null && (n = 0), typeof c) {
    case "string":
      o = Me(c);
      break;
    case "number":
      o = Me(e["!ref"]), o.s.r = c;
      break;
    default:
      o = c;
  }
  n > 0 && (a = 0);
  var d = ar(o.s.r), x = [], p = [], g = 0, u = 0, _ = Array.isArray(e), k = o.s.r, D = 0, C = {};
  _ && !e[k] && (e[k] = []);
  var B = l.skipHidden && e["!cols"] || [], Y = l.skipHidden && e["!rows"] || [];
  for (D = o.s.c; D <= o.e.c; ++D)
    if (!(B[D] || {}).hidden)
      switch (x[D] = or(D), r = _ ? e[k][D] : e[x[D] + d], n) {
        case 1:
          i[D] = D - o.s.c;
          break;
        case 2:
          i[D] = x[D];
          break;
        case 3:
          i[D] = l.header[D - o.s.c];
          break;
        default:
          if (r == null && (r = { w: "__EMPTY", t: "s" }), f = s = Zr(r, null, l), u = C[s] || 0, !u) C[s] = 1;
          else {
            do
              f = s + "_" + u++;
            while (C[f]);
            C[s] = u, C[f] = 1;
          }
          i[D] = f;
      }
  for (k = o.s.r + a; k <= o.e.r; ++k)
    if (!(Y[k] || {}).hidden) {
      var re = Yh(e, o, k, x, n, i, _, l);
      (re.isempty === !1 || (n === 1 ? l.blankrows !== !1 : l.blankrows)) && (p[g++] = re.row);
    }
  return p.length = g, p;
}
var va = /"/g;
function jh(e, t, r, n, a, i, s, f) {
  for (var o = !0, l = [], c = "", d = ar(r), x = t.s.c; x <= t.e.c; ++x)
    if (n[x]) {
      var p = f.dense ? (e[r] || [])[x] : e[n[x] + d];
      if (p == null) c = "";
      else if (p.v != null) {
        o = !1, c = "" + (f.rawNumbers && p.t == "n" ? p.v : Zr(p, null, f));
        for (var g = 0, u = 0; g !== c.length; ++g) if ((u = c.charCodeAt(g)) === a || u === i || u === 34 || f.forceQuotes) {
          c = '"' + c.replace(va, '""') + '"';
          break;
        }
        c == "ID" && (c = '"ID"');
      } else p.f != null && !p.F ? (o = !1, c = "=" + p.f, c.indexOf(",") >= 0 && (c = '"' + c.replace(va, '""') + '"')) : c = "";
      l.push(c);
    }
  return f.blankrows === !1 && o ? null : l.join(s);
}
function k0(e, t) {
  var r = [], n = t ?? {};
  if (e == null || e["!ref"] == null) return "";
  var a = Me(e["!ref"]), i = n.FS !== void 0 ? n.FS : ",", s = i.charCodeAt(0), f = n.RS !== void 0 ? n.RS : `
`, o = f.charCodeAt(0), l = new RegExp((i == "|" ? "\\|" : i) + "+$"), c = "", d = [];
  n.dense = Array.isArray(e);
  for (var x = n.skipHidden && e["!cols"] || [], p = n.skipHidden && e["!rows"] || [], g = a.s.c; g <= a.e.c; ++g) (x[g] || {}).hidden || (d[g] = or(g));
  for (var u = 0, _ = a.s.r; _ <= a.e.r; ++_)
    (p[_] || {}).hidden || (c = jh(e, a, _, d, s, o, i, n), c != null && (n.strip && (c = c.replace(l, "")), (c || n.blankrows !== !1) && r.push((u++ ? f : "") + c)));
  return delete n.dense, r.join("");
}
function Yi(e, t) {
  t || (t = {}), t.FS = "	", t.RS = `
`;
  var r = k0(e, t);
  return r;
}
function Jh(e) {
  var t = "", r, n = "";
  if (e == null || e["!ref"] == null) return [];
  var a = Me(e["!ref"]), i = "", s = [], f, o = [], l = Array.isArray(e);
  for (f = a.s.c; f <= a.e.c; ++f) s[f] = or(f);
  for (var c = a.s.r; c <= a.e.r; ++c)
    for (i = ar(c), f = a.s.c; f <= a.e.c; ++f)
      if (t = s[f] + i, r = l ? (e[c] || [])[f] : e[t], n = "", r !== void 0) {
        if (r.F != null) {
          if (t = r.F, !r.f) continue;
          n = r.f, t.indexOf(":") == -1 && (t = t + ":" + t);
        }
        if (r.f != null) n = r.f;
        else {
          if (r.t == "z") continue;
          if (r.t == "n" && r.v != null) n = "" + r.v;
          else if (r.t == "b") n = r.v ? "TRUE" : "FALSE";
          else if (r.w !== void 0) n = "'" + r.w;
          else {
            if (r.v === void 0) continue;
            r.t == "s" ? n = "'" + r.v : n = "" + r.v;
          }
        }
        o[o.length] = t + "=" + n;
      }
  return o;
}
function ji(e, t, r) {
  var n = r || {}, a = +!n.skipHeader, i = e || {}, s = 0, f = 0;
  if (i && n.origin != null)
    if (typeof n.origin == "number") s = n.origin;
    else {
      var o = typeof n.origin == "string" ? qe(n.origin) : n.origin;
      s = o.r, f = o.c;
    }
  var l, c = { s: { c: 0, r: 0 }, e: { c: f, r: s + t.length - 1 + a } };
  if (i["!ref"]) {
    var d = Me(i["!ref"]);
    c.e.c = Math.max(c.e.c, d.e.c), c.e.r = Math.max(c.e.r, d.e.r), s == -1 && (s = d.e.r + 1, c.e.r = s + t.length - 1 + a);
  } else
    s == -1 && (s = 0, c.e.r = t.length - 1 + a);
  var x = n.header || [], p = 0;
  t.forEach(function(u, _) {
    ir(u).forEach(function(k) {
      (p = x.indexOf(k)) == -1 && (x[p = x.length] = k);
      var D = u[k], C = "z", B = "", Y = ke({ c: f + p, r: s + _ + a });
      l = nn(i, Y), D && typeof D == "object" && !(D instanceof Date) ? i[Y] = D : (typeof D == "number" ? C = "n" : typeof D == "boolean" ? C = "b" : typeof D == "string" ? C = "s" : D instanceof Date ? (C = "d", n.cellDates || (C = "n", D = Er(D)), B = n.dateNF || Ve[14]) : D === null && n.nullError && (C = "e", D = 0), l ? (l.t = C, l.v = D, delete l.w, delete l.R, B && (l.z = B)) : i[Y] = l = { t: C, v: D }, B && (l.z = B));
    });
  }), c.e.c = Math.max(c.e.c, f + x.length - 1);
  var g = ar(s);
  if (a) for (p = 0; p < x.length; ++p) i[or(p + f) + g] = { t: "s", v: x[p] };
  return i["!ref"] = Xe(c), i;
}
function Zh(e, t) {
  return ji(null, e, t);
}
function nn(e, t, r) {
  if (typeof t == "string") {
    if (Array.isArray(e)) {
      var n = qe(t);
      return e[n.r] || (e[n.r] = []), e[n.r][n.c] || (e[n.r][n.c] = { t: "z" });
    }
    return e[t] || (e[t] = { t: "z" });
  }
  return typeof t != "number" ? nn(e, ke(t)) : nn(e, ke({ r: t, c: r || 0 }));
}
function qh(e, t) {
  if (typeof t == "number") {
    if (t >= 0 && e.SheetNames.length > t) return t;
    throw new Error("Cannot find sheet # " + t);
  } else if (typeof t == "string") {
    var r = e.SheetNames.indexOf(t);
    if (r > -1) return r;
    throw new Error("Cannot find sheet name |" + t + "|");
  } else throw new Error("Cannot find sheet |" + t + "|");
}
function Qh() {
  return { SheetNames: [], Sheets: {} };
}
function ex(e, t, r, n) {
  var a = 1;
  if (!r) for (; a <= 65535 && e.SheetNames.indexOf(r = "Sheet" + a) != -1; ++a, r = void 0) ;
  if (!r || e.SheetNames.length >= 65535) throw new Error("Too many worksheets");
  if (n && e.SheetNames.indexOf(r) >= 0) {
    var i = r.match(/(^.*?)(\d+)$/);
    a = i && +i[2] || 0;
    var s = i && i[1] || r;
    for (++a; a <= 65535 && e.SheetNames.indexOf(r = s + a) != -1; ++a) ;
  }
  if (bi(r), e.SheetNames.indexOf(r) >= 0) throw new Error("Worksheet with name |" + r + "| already exists!");
  return e.SheetNames.push(r), e.Sheets[r] = t, r;
}
function rx(e, t, r) {
  e.Workbook || (e.Workbook = {}), e.Workbook.Sheets || (e.Workbook.Sheets = []);
  var n = qh(e, t);
  switch (e.Workbook.Sheets[n] || (e.Workbook.Sheets[n] = {}), r) {
    case 0:
    case 1:
    case 2:
      break;
    default:
      throw new Error("Bad sheet visibility setting " + r);
  }
  e.Workbook.Sheets[n].Hidden = r;
}
function tx(e, t) {
  return e.z = t, e;
}
function Ji(e, t, r) {
  return t ? (e.l = { Target: t }, r && (e.l.Tooltip = r)) : delete e.l, e;
}
function nx(e, t, r) {
  return Ji(e, "#" + t, r);
}
function ax(e, t, r) {
  e.c || (e.c = []), e.c.push({ t, a: r || "SheetJS" });
}
function ix(e, t, r, n) {
  for (var a = typeof t != "string" ? t : Me(t), i = typeof t == "string" ? t : Xe(t), s = a.s.r; s <= a.e.r; ++s) for (var f = a.s.c; f <= a.e.c; ++f) {
    var o = nn(e, s, f);
    o.t = "n", o.F = i, delete o.v, s == a.s.r && f == a.s.c && (o.f = r, n && (o.D = !0));
  }
  return e;
}
var Gt = {
  encode_col: or,
  encode_row: ar,
  encode_cell: ke,
  encode_range: Xe,
  decode_col: g0,
  decode_row: m0,
  split_cell: gf,
  decode_cell: qe,
  decode_range: kr,
  format_cell: Zr,
  sheet_add_aoa: Ja,
  sheet_add_json: ji,
  sheet_add_dom: Gi,
  aoa_to_sheet: kt,
  json_to_sheet: Zh,
  table_to_sheet: Xi,
  table_to_book: Oh,
  sheet_to_csv: k0,
  sheet_to_txt: Yi,
  sheet_to_json: Bn,
  sheet_to_html: Hi,
  sheet_to_formulae: Jh,
  sheet_to_row_object_array: Bn,
  sheet_get_cell: nn,
  book_new: Qh,
  book_append_sheet: ex,
  book_set_sheet_visibility: rx,
  cell_set_number_format: tx,
  cell_set_hyperlink: Ji,
  cell_set_internal_link: nx,
  cell_add_comment: ax,
  sheet_set_array_formula: ix,
  consts: {
    SHEET_VISIBLE: 0,
    SHEET_HIDDEN: 1,
    SHEET_VERY_HIDDEN: 2
  }
};
const sx = { class: "ds-root" }, fx = { class: "ds-tab-bar" }, lx = ["onClick"], ox = { class: "ds-panel" }, cx = { class: "ds-panel-header" }, ux = { class: "ds-panel" }, hx = { class: "ds-panel-header" }, xx = {
  key: 0,
  style: { "margin-top": "8px" }
}, dx = { style: { display: "flex", "align-items": "center", "margin-bottom": "8px" } }, px = { class: "cv-editor" }, vx = ["onClick"], mx = {
  key: 0,
  style: { "margin-top": "8px" }
}, gx = { style: { display: "flex", "align-items": "center", "justify-content": "space-between", "margin-bottom": "8px" } }, _x = { class: "cv-check-list" }, Tx = ["onUpdate:modelValue"], Ex = { class: "cv-check-code" }, wx = {
  key: 0,
  class: "cv-check-label"
}, Sx = { key: 0 }, Ax = {
  key: 0,
  class: "graph-section"
}, Fx = { class: "graph-section-title" };
l0({
  name: "FieldDragLayout",
  props: {
    allFields: { type: Array, default: () => [] },
    inputItems: { type: Array, default: () => [] },
    outputItems: { type: Array, default: () => [] }
  },
  emits: ["update:inputItems", "update:outputItems"],
  setup(e, { emit: t }) {
    const r = Pe(""), n = n0(() => {
      const c = r.value.toLowerCase();
      return e.allFields.filter(
        (d) => !c || (d.name_en ?? "").toLowerCase().includes(c) || (d.name_cn ?? "").toLowerCase().includes(c) || (d.id ?? "").toLowerCase().includes(c)
      );
    });
    let a = null;
    function i(c, d) {
      a = { type: "pool", fieldId: d.id, list: "" }, c.dataTransfer.effectAllowed = "copy";
    }
    function s(c, d) {
      const x = c === "input" ? e.inputItems : e.outputItems;
      if (x.some((g) => g.field_id === d.id)) return;
      const p = [...x, { field_id: d.id, field_name: d.name_en || d.id }];
      t(c === "input" ? "update:inputItems" : "update:outputItems", p);
    }
    function f(c, d, x) {
      a = { type: "item", list: d, index: x }, c.dataTransfer.effectAllowed = "move";
    }
    function o(c, d) {
      if (c.preventDefault(), !a) return;
      const x = d === "input" ? [...e.inputItems] : [...e.outputItems];
      if (a.type === "pool") {
        const p = e.allFields.find((g) => g.id === a.fieldId);
        p && !x.some((g) => g.field_id === p.id) && (x.push({ field_id: p.id, field_name: p.name_en || p.id }), t(d === "input" ? "update:inputItems" : "update:outputItems", x));
      } else if (a.type === "item" && a.list === d && a.index !== void 0) {
        const [p] = x.splice(a.index, 1), g = c.target.closest("[data-index]"), u = g ? parseInt(g.getAttribute("data-index") ?? "99") : x.length;
        x.splice(u, 0, p), t(d === "input" ? "update:inputItems" : "update:outputItems", x);
      }
      a = null;
    }
    function l(c, d) {
      const x = c === "input" ? [...e.inputItems] : [...e.outputItems];
      x.splice(d, 1), t(c === "input" ? "update:inputItems" : "update:outputItems", x);
    }
    return { poolSearch: r, filteredPool: n, onPoolDragStart: i, addFieldToList: s, onItemDragStart: f, onDrop: o, removeItem: l };
  },
  template: `
    <div class="drag-layout">
      <div class="field-pool">
        <div class="pool-header">
          <span>📋 可用字段</span>
          <el-input v-model="poolSearch" placeholder="搜索..." size="small" style="width:100px;" />
        </div>
        <div class="pool-list">
          <div v-for="f in filteredPool" :key="f.id" class="pool-item"
               draggable="true" @dragstart="onPoolDragStart($event, f)"
               @dblclick="addFieldToList('input', f)">
            <span class="pool-item-text">{{ f.name_en }}<span v-if="f.name_cn" style="color:#909399;font-size:11px;"> ({{ f.name_cn }})</span></span>
            <span style="color:#409eff;font-weight:bold;">+</span>
          </div>
          <div v-if="!filteredPool.length" style="text-align:center;color:#909399;padding:16px;font-size:12px;">无可用字段</div>
        </div>
      </div>
      <div class="drag-sections">
        <div class="drag-section">
          <div class="drag-section-header">
            📥 输入字段
            <span class="count-badge">{{ inputItems.length }}</span>
          </div>
          <div class="drag-drop-zone" @dragover.prevent @drop="onDrop($event, 'input')">
            <div v-if="!inputItems.length" class="drop-hint">从左侧拖入或双击字段</div>
            <div v-for="(item, i) in inputItems" :key="item.field_id" class="drag-item"
                 draggable="true" :data-index="i" @dragstart="onItemDragStart($event, 'input', i)">
              <span class="drag-handle">☰</span>
              <span class="drag-item-text">{{ item.field_name || item.field_id }}</span>
              <button class="drag-remove" @click="removeItem('input', i)">×</button>
            </div>
          </div>
        </div>
        <div class="drag-section">
          <div class="drag-section-header">
            📤 输出字段
            <span class="count-badge">{{ outputItems.length }}</span>
          </div>
          <div class="drag-drop-zone" @dragover.prevent @drop="onDrop($event, 'output')">
            <div v-if="!outputItems.length" class="drop-hint">从左侧拖入或双击字段</div>
            <div v-for="(item, i) in outputItems" :key="item.field_id" class="drag-item"
                 draggable="true" :data-index="i" @dragstart="onItemDragStart($event, 'output', i)">
              <span class="drag-handle">☰</span>
              <span class="drag-item-text">{{ item.field_name || item.field_id }}</span>
              <button class="drag-remove" @click="removeItem('output', i)">×</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});
const yx = /* @__PURE__ */ l0({
  __name: "DataStandardView",
  props: {
    api: {},
    toolId: {}
  },
  setup(e) {
    const t = e, r = [
      { key: "roots", label: "📐 字根维护" },
      { key: "fields", label: "📋 标准字段维护" }
    ], n = Pe("roots"), a = Pe([]), i = Pe([]), s = Pe(!1), f = Pe(null), o = Pe(null), l = Pe([]), c = Pe([]);
    function d() {
      var Z, y;
      (Z = f.value) == null || Z.clearSelection(), (y = o.value) == null || y.clearSelection(), l.value = [], c.value = [];
    }
    function x(Z, y, fe = 5) {
      return Z.slice(0, fe).map((Fe) => Fe[y] || Fe.id).join("、") + (Z.length > fe ? ` 等 ${Z.length} 条` : "");
    }
    async function p() {
      const [Z, y] = await Promise.all([
        t.api.plugin.callSync("listRoots", {}),
        t.api.plugin.callSync("listFields", {})
      ]);
      a.value = Z.roots ?? [], i.value = y.fields ?? [];
    }
    cs(p);
    const g = Pe(""), u = Pe(""), _ = n0(() => D(a.value, g.value, ["id", "name", "meaning"])), k = n0(() => D(i.value, u.value, ["id", "name_en", "name_cn"]));
    function D(Z, y, fe) {
      if (!y) return Z;
      const me = y.toLowerCase();
      return Z.filter((Fe) => fe.some((pe) => (Fe[pe] ?? "").toLowerCase().includes(me)));
    }
    const C = Pe(!1), B = Pe(!0), Y = Pe(null), re = Pe([]), O = ["字符型", "数字型", "金额类型", "日期类型", "时间戳"], b = Pe({});
    function M(Z) {
      if (B.value = !Z, Z) {
        b.value = { ...Z };
        const y = Wr(Z.code_values);
        re.value = y.map((fe) => {
          const me = fe.indexOf("=");
          return me >= 0 ? { code: fe.slice(0, me), label: fe.slice(me + 1) } : { code: fe, label: "" };
        });
      } else
        b.value = { id: Ur("ROOT"), name: "", meaning: "", root_type: "字符型", length: "", remark: "" }, re.value = [];
      C.value = !0;
    }
    async function X() {
      var Z, y;
      if (!((Z = b.value.id) != null && Z.trim()) || !((y = b.value.name) != null && y.trim())) {
        Ke.warning("字根ID和字根名不能为空");
        return;
      }
      s.value = !0;
      try {
        const fe = re.value.filter((me) => me.code.trim()).map((me) => me.label ? `${me.code}=${me.label}` : me.code);
        await t.api.plugin.callSync("saveRoot", {
          ...b.value,
          code_values: fe.length ? JSON.stringify(fe) : null,
          _isNew: B.value
        }), C.value = !1, await p(), Ke.success("保存成功");
      } finally {
        s.value = !1;
      }
    }
    async function K(Z) {
      await dn.confirm("确认删除字根 " + Z + "？", "删除确认", { type: "warning" }), await t.api.plugin.callSync("deleteRoot", { id: Z }), Y.value === Z && (Y.value = null), d(), await p(), Ke.success("已删除");
    }
    async function j() {
      const Z = l.value;
      if (!Z.length) {
        Ke.warning("请先勾选要删除的字根");
        return;
      }
      try {
        await dn.confirm(
          `确认删除选中的 ${Z.length} 个字根？
${x(Z, "name")}
此操作不可撤销。`,
          "批量删除确认",
          { type: "warning", confirmButtonText: `删除 ${Z.length} 条`, cancelButtonText: "取消" }
        );
      } catch {
        return;
      }
      const y = Z.map((me) => me.id), fe = await t.api.plugin.callSync("deleteRoots", { ids: y });
      y.includes(Y.value) && (Y.value = null), d(), await p(), Ke.success(`已删除 ${fe.deleted} 个字根`);
    }
    const ne = Pe(!1), Te = Pe(!0), xe = Pe(null), Re = Pe([]), de = Pe({});
    function vr(Z) {
      Te.value = !Z, Z ? (de.value = { ...Z }, ur(Z.root_id, Z.code_values)) : (de.value = { id: Ur("FIELD"), name_en: "", name_cn: "", root_id: "", root_name: "", field_type: "", length: "", remark: "" }, Re.value = []), ne.value = !0;
    }
    function He(Z) {
      const y = a.value.find((fe) => fe.id === Z);
      y ? (de.value.root_name = y.name, de.value.field_type = y.root_type ?? "", de.value.length = y.length ?? "", ur(Z, null)) : (de.value.root_name = "", de.value.field_type = "", de.value.length = "", Re.value = []);
    }
    function ur(Z, y) {
      const fe = a.value.find((pe) => pe.id === Z);
      if (!fe || fe.root_type !== "字符型" || !fe.code_values) {
        Re.value = [];
        return;
      }
      const me = Wr(fe.code_values);
      let Fe = null;
      if (y)
        try {
          Fe = new Set(JSON.parse(y));
        } catch {
        }
      Re.value = me.map((pe) => {
        const Je = pe.indexOf("=");
        return {
          value: pe,
          code: Je >= 0 ? pe.slice(0, Je) : pe,
          label: Je >= 0 ? pe.slice(Je + 1) : "",
          checked: Fe ? Fe.has(pe) : !0
        };
      });
    }
    async function hr() {
      var Z, y;
      if (!((Z = de.value.id) != null && Z.trim()) || !((y = de.value.name_cn) != null && y.trim())) {
        Ke.warning("字段ID和字段中文名不能为空");
        return;
      }
      s.value = !0;
      try {
        const fe = Re.value.filter((me) => me.checked).map((me) => me.value);
        await t.api.plugin.callSync("saveField", {
          ...de.value,
          code_values: fe.length ? JSON.stringify(fe) : null,
          _isNew: Te.value
        }), ne.value = !1, await p(), Ke.success("保存成功");
      } finally {
        s.value = !1;
      }
    }
    async function S(Z) {
      await dn.confirm("确认删除字段 " + Z + "？", "删除确认", { type: "warning" }), await t.api.plugin.callSync("deleteField", { id: Z }), xe.value === Z && (xe.value = null), d(), await p(), Ke.success("已删除");
    }
    async function L() {
      const Z = c.value;
      if (!Z.length) {
        Ke.warning("请先勾选要删除的字段");
        return;
      }
      try {
        await dn.confirm(
          `确认删除选中的 ${Z.length} 个字段？
${x(Z, "name_cn")}
此操作不可撤销。`,
          "批量删除确认",
          { type: "warning", confirmButtonText: `删除 ${Z.length} 条`, cancelButtonText: "取消" }
        );
      } catch {
        return;
      }
      const y = Z.map((me) => me.id), fe = await t.api.plugin.callSync("deleteFields", { ids: y });
      y.includes(xe.value) && (xe.value = null), d(), await p(), Ke.success(`已删除 ${fe.deleted} 个字段`);
    }
    const F = Pe(!1), A = Pe(""), V = Pe(null);
    function ue() {
      if (!Y.value) {
        Ke.warning("请先选中一条字根记录");
        return;
      }
      const Z = a.value.find((fe) => fe.id === Y.value);
      if (!Z) return;
      const y = i.value.filter((fe) => fe.root_id === Z.id);
      A.value = `字根「${Z.name}」关联图谱`, V.value = { type: "字根", name: Z.name, usedFields: y }, F.value = !0;
    }
    function he() {
      if (!xe.value) {
        Ke.warning("请先选中一条字段记录");
        return;
      }
      const Z = i.value.find((y) => y.id === xe.value);
      Z && (A.value = `字段「${Z.name_en}」关联图谱`, V.value = { type: "字段", name: Z.name_en, usedFields: [] }, F.value = !0);
    }
    function ce() {
      var y;
      if (!V.value) return;
      const Z = Gt.book_new();
      (y = V.value.usedFields) != null && y.length && Gt.book_append_sheet(
        Z,
        Gt.json_to_sheet(V.value.usedFields.map((fe) => ({ 字段ID: fe.id, 英文名: fe.name_en, 中文名: fe.name_cn ?? "" }))),
        "关联字段"
      ), Z.SheetNames.length === 0 && Gt.book_append_sheet(Z, Gt.json_to_sheet([{ 结果: "暂无关联" }]), "关联图谱"), Kh(Z, `关联图谱_${V.value.name}.xlsx`), Ke.success("已导出");
    }
    async function ae() {
      const Z = await t.api.plugin.callSync("exportRootsCsv", {});
      Sr(Z.csv, "字根数据.csv", "text/csv;charset=utf-8");
    }
    async function Ae() {
      const Z = await t.api.plugin.callSync("exportFieldsCsv", {});
      Sr(Z.csv, "字段数据.csv", "text/csv;charset=utf-8");
    }
    const _e = Pe(null), je = Pe(null);
    let Ee = "";
    function Nr() {
      if (!re.value.length) {
        Ke.warning("当前无码值可导出");
        return;
      }
      const Z = ["code,label", ...re.value.map((y) => `${y.code},${y.label}`)];
      Sr(Z.join(`
`), `码值_${b.value.name || "export"}.csv`, "text/csv;charset=utf-8");
    }
    async function Be(Z) {
      var Je;
      const y = (Je = Z.target.files) == null ? void 0 : Je[0];
      if (!y) return;
      const fe = await y.text();
      Z.target.value = "";
      const me = fe.split(/\r?\n/).filter((Ie) => Ie.trim());
      if (!me.length) {
        Ke.error("文件为空");
        return;
      }
      const Fe = me[0].toLowerCase().startsWith("code") ? 1 : 0, pe = me.slice(Fe).map((Ie) => {
        const Xr = Ie.split(",");
        return { code: (Xr[0] ?? "").trim(), label: (Xr[1] ?? "").trim() };
      }).filter((Ie) => Ie.code);
      if (!pe.length) {
        Ke.error("未读取到有效码值");
        return;
      }
      re.value = pe, Ke.success(`已导入 ${pe.length} 条码值`);
    }
    function oe(Z) {
      var y;
      Ee = Z, (y = _e.value) == null || y.click();
    }
    async function mr(Z) {
      var me;
      const y = (me = Z.target.files) == null ? void 0 : me[0];
      if (!y) return;
      const fe = await y.text();
      Z.target.value = "";
      try {
        let Fe;
        Ee === "root" ? Fe = await t.api.plugin.callSync("importRootsCsv", { csv: fe }) : Fe = await t.api.plugin.callSync("importFieldsCsv", { csv: fe }), await p(), Ke.success(`导入完成：成功 ${Fe.success} 条，失败 ${Fe.errors} 条`);
      } catch (Fe) {
        Ke.error("导入失败：" + Fe.message);
      }
    }
    function Sr(Z, y, fe) {
      const me = new Blob(["\uFEFF" + Z], { type: fe }), Fe = URL.createObjectURL(me), pe = Object.assign(document.createElement("a"), { href: Fe, download: y });
      document.body.appendChild(pe), pe.click(), document.body.removeChild(pe), setTimeout(() => URL.revokeObjectURL(Fe), 100);
    }
    function Ur(Z) {
      return Z + "_" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase();
    }
    function Wr(Z) {
      if (!Z) return [];
      try {
        return JSON.parse(Z);
      } catch {
        return [];
      }
    }
    return (Z, y) => {
      const fe = gr("el-input"), me = gr("Download"), Fe = gr("el-icon"), pe = gr("el-button"), Je = gr("Upload"), Ie = gr("el-table-column"), Xr = gr("el-table"), sr = gr("el-form-item"), fr = gr("el-col"), It = gr("el-option"), Nt = gr("el-select"), Pt = gr("el-row"), un = gr("el-form"), Lt = gr("el-dialog");
      return _r(), Ar("div", sx, [
        Ne("div", fx, [
          (_r(), Ar(Ut, null, Wt(r, (z) => Ne("div", {
            key: z.key,
            class: us(["ds-tab-item", { active: n.value === z.key }]),
            onClick: (ze) => n.value = z.key
          }, zr(z.label), 11, lx)), 64))
        ]),
        Yn(Ne("div", ox, [
          Ne("div", cx, [
            G(fe, {
              modelValue: g.value,
              "onUpdate:modelValue": y[0] || (y[0] = (z) => g.value = z),
              placeholder: "搜索字根...",
              clearable: "",
              style: { width: "240px" }
            }, null, 8, ["modelValue"]),
            G(pe, { onClick: ae }, {
              default: ie(() => [
                G(Fe, null, {
                  default: ie(() => [
                    G(me)
                  ]),
                  _: 1
                }),
                y[33] || (y[33] = Le(" 导出CSV", -1))
              ]),
              _: 1
            }),
            G(pe, {
              onClick: y[1] || (y[1] = (z) => oe("root"))
            }, {
              default: ie(() => [
                G(Fe, null, {
                  default: ie(() => [
                    G(Je)
                  ]),
                  _: 1
                }),
                y[34] || (y[34] = Le(" 导入CSV", -1))
              ]),
              _: 1
            }),
            G(pe, {
              onClick: ue,
              disabled: !Y.value
            }, {
              default: ie(() => [...y[35] || (y[35] = [
                Le("📊 关联图谱", -1)
              ])]),
              _: 1
            }, 8, ["disabled"]),
            G(pe, {
              type: "danger",
              plain: "",
              disabled: !l.value.length,
              onClick: j
            }, {
              default: ie(() => [
                Le(" 批量删除" + zr(l.value.length ? ` (${l.value.length})` : ""), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            G(pe, {
              type: "primary",
              onClick: y[2] || (y[2] = (z) => M(null))
            }, {
              default: ie(() => [...y[36] || (y[36] = [
                Le("+ 新增字根", -1)
              ])]),
              _: 1
            })
          ]),
          G(Xr, {
            ref_key: "rootTableRef",
            ref: f,
            data: _.value,
            border: "",
            stripe: "",
            size: "small",
            "max-height": "560",
            "row-key": "id",
            "highlight-current-row": "",
            onCurrentChange: y[3] || (y[3] = (z) => Y.value = (z == null ? void 0 : z.id) ?? null),
            onSelectionChange: y[4] || (y[4] = (z) => l.value = z)
          }, {
            default: ie(() => [
              G(Ie, {
                type: "selection",
                width: "42",
                "reserve-selection": ""
              }),
              G(Ie, {
                prop: "id",
                label: "字根ID",
                width: "140"
              }),
              G(Ie, {
                prop: "name",
                label: "字根名",
                width: "140"
              }, {
                default: ie(({ row: z }) => [
                  Ne("strong", null, zr(z.name), 1)
                ]),
                _: 1
              }),
              G(Ie, {
                prop: "meaning",
                label: "字根含义",
                "min-width": "140",
                "show-overflow-tooltip": ""
              }),
              G(Ie, {
                prop: "root_type",
                label: "字根类型",
                width: "100"
              }),
              G(Ie, {
                prop: "length",
                label: "长度",
                width: "60"
              }),
              G(Ie, {
                label: "码值数",
                width: "70",
                align: "center"
              }, {
                default: ie(({ row: z }) => [
                  Le(zr(Wr(z.code_values).length || "—"), 1)
                ]),
                _: 1
              }),
              G(Ie, {
                label: "操作",
                width: "120",
                fixed: "right"
              }, {
                default: ie(({ row: z }) => [
                  G(pe, {
                    size: "small",
                    onClick: xn((ze) => M(z), ["stop"])
                  }, {
                    default: ie(() => [...y[37] || (y[37] = [
                      Le("编辑", -1)
                    ])]),
                    _: 1
                  }, 8, ["onClick"]),
                  G(pe, {
                    size: "small",
                    type: "danger",
                    onClick: xn((ze) => K(z.id), ["stop"])
                  }, {
                    default: ie(() => [...y[38] || (y[38] = [
                      Le("删除", -1)
                    ])]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])
        ], 512), [
          [D0, n.value === "roots"]
        ]),
        Yn(Ne("div", ux, [
          Ne("div", hx, [
            G(fe, {
              modelValue: u.value,
              "onUpdate:modelValue": y[5] || (y[5] = (z) => u.value = z),
              placeholder: "搜索字段...",
              clearable: "",
              style: { width: "240px" }
            }, null, 8, ["modelValue"]),
            G(pe, { onClick: Ae }, {
              default: ie(() => [
                G(Fe, null, {
                  default: ie(() => [
                    G(me)
                  ]),
                  _: 1
                }),
                y[39] || (y[39] = Le(" 导出CSV", -1))
              ]),
              _: 1
            }),
            G(pe, {
              onClick: y[6] || (y[6] = (z) => oe("field"))
            }, {
              default: ie(() => [
                G(Fe, null, {
                  default: ie(() => [
                    G(Je)
                  ]),
                  _: 1
                }),
                y[40] || (y[40] = Le(" 导入CSV", -1))
              ]),
              _: 1
            }),
            G(pe, {
              onClick: he,
              disabled: !xe.value
            }, {
              default: ie(() => [...y[41] || (y[41] = [
                Le("📊 关联图谱", -1)
              ])]),
              _: 1
            }, 8, ["disabled"]),
            G(pe, {
              type: "danger",
              plain: "",
              disabled: !c.value.length,
              onClick: L
            }, {
              default: ie(() => [
                Le(" 批量删除" + zr(c.value.length ? ` (${c.value.length})` : ""), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            G(pe, {
              type: "primary",
              onClick: y[7] || (y[7] = (z) => vr(null))
            }, {
              default: ie(() => [...y[42] || (y[42] = [
                Le("+ 新增字段", -1)
              ])]),
              _: 1
            })
          ]),
          G(Xr, {
            ref_key: "fieldTableRef",
            ref: o,
            data: k.value,
            border: "",
            stripe: "",
            size: "small",
            "max-height": "560",
            "row-key": "id",
            "highlight-current-row": "",
            onCurrentChange: y[8] || (y[8] = (z) => xe.value = (z == null ? void 0 : z.id) ?? null),
            onSelectionChange: y[9] || (y[9] = (z) => c.value = z)
          }, {
            default: ie(() => [
              G(Ie, {
                type: "selection",
                width: "42",
                "reserve-selection": ""
              }),
              G(Ie, {
                prop: "id",
                label: "字段ID",
                width: "140"
              }),
              G(Ie, {
                prop: "name_en",
                label: "字段英文名",
                width: "160"
              }, {
                default: ie(({ row: z }) => [
                  Ne("strong", null, zr(z.name_en), 1)
                ]),
                _: 1
              }),
              G(Ie, {
                prop: "name_cn",
                label: "字段中文名",
                "min-width": "130",
                "show-overflow-tooltip": ""
              }),
              G(Ie, {
                prop: "field_type",
                label: "字段类型",
                width: "100"
              }),
              G(Ie, {
                prop: "length",
                label: "长度",
                width: "60"
              }),
              G(Ie, {
                prop: "root_name",
                label: "引用字根",
                width: "120",
                "show-overflow-tooltip": ""
              }),
              G(Ie, {
                label: "操作",
                width: "120",
                fixed: "right"
              }, {
                default: ie(({ row: z }) => [
                  G(pe, {
                    size: "small",
                    onClick: xn((ze) => vr(z), ["stop"])
                  }, {
                    default: ie(() => [...y[43] || (y[43] = [
                      Le("编辑", -1)
                    ])]),
                    _: 1
                  }, 8, ["onClick"]),
                  G(pe, {
                    size: "small",
                    type: "danger",
                    onClick: xn((ze) => S(z.id), ["stop"])
                  }, {
                    default: ie(() => [...y[44] || (y[44] = [
                      Le("删除", -1)
                    ])]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])
        ], 512), [
          [D0, n.value === "fields"]
        ]),
        G(Lt, {
          modelValue: C.value,
          "onUpdate:modelValue": y[19] || (y[19] = (z) => C.value = z),
          title: b.value.id && !B.value ? "编辑字根" : "新增字根",
          width: "680px",
          "close-on-click-modal": !1,
          "destroy-on-close": ""
        }, {
          footer: ie(() => [
            G(pe, {
              onClick: y[18] || (y[18] = (z) => C.value = !1)
            }, {
              default: ie(() => [...y[49] || (y[49] = [
                Le("取消", -1)
              ])]),
              _: 1
            }),
            G(pe, {
              type: "primary",
              onClick: X,
              loading: s.value
            }, {
              default: ie(() => [...y[50] || (y[50] = [
                Le("保存", -1)
              ])]),
              _: 1
            }, 8, ["loading"])
          ]),
          default: ie(() => [
            G(un, {
              model: b.value,
              "label-width": "90px",
              size: "small"
            }, {
              default: ie(() => [
                G(Pt, { gutter: 16 }, {
                  default: ie(() => [
                    G(fr, { span: 12 }, {
                      default: ie(() => [
                        G(sr, { label: "字根ID *" }, {
                          default: ie(() => [
                            G(fe, {
                              modelValue: b.value.id,
                              "onUpdate:modelValue": y[10] || (y[10] = (z) => b.value.id = z),
                              disabled: !B.value,
                              placeholder: "如 ROOT_001"
                            }, null, 8, ["modelValue", "disabled"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    G(fr, { span: 12 }, {
                      default: ie(() => [
                        G(sr, { label: "字根名 *" }, {
                          default: ie(() => [
                            G(fe, {
                              modelValue: b.value.name,
                              "onUpdate:modelValue": y[11] || (y[11] = (z) => b.value.name = z)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    G(fr, { span: 12 }, {
                      default: ie(() => [
                        G(sr, { label: "字根含义" }, {
                          default: ie(() => [
                            G(fe, {
                              modelValue: b.value.meaning,
                              "onUpdate:modelValue": y[12] || (y[12] = (z) => b.value.meaning = z)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    G(fr, { span: 12 }, {
                      default: ie(() => [
                        G(sr, { label: "字根类型 *" }, {
                          default: ie(() => [
                            G(Nt, {
                              modelValue: b.value.root_type,
                              "onUpdate:modelValue": y[13] || (y[13] = (z) => b.value.root_type = z),
                              style: { width: "100%" }
                            }, {
                              default: ie(() => [
                                (_r(), Ar(Ut, null, Wt(O, (z) => G(It, {
                                  key: z,
                                  label: z,
                                  value: z
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
                    G(fr, { span: 12 }, {
                      default: ie(() => [
                        G(sr, { label: "字根长度" }, {
                          default: ie(() => [
                            G(fe, {
                              modelValue: b.value.length,
                              "onUpdate:modelValue": y[14] || (y[14] = (z) => b.value.length = z),
                              type: "number"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    G(fr, { span: 24 }, {
                      default: ie(() => [
                        G(sr, { label: "字根备注" }, {
                          default: ie(() => [
                            G(fe, {
                              modelValue: b.value.remark,
                              "onUpdate:modelValue": y[15] || (y[15] = (z) => b.value.remark = z),
                              type: "textarea",
                              rows: 2
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                b.value.root_type === "字符型" ? (_r(), Ar("div", xx, [
                  Ne("div", dx, [
                    y[47] || (y[47] = Ne("span", { style: { "font-size": "12px", "font-weight": "600", color: "#909399", flex: "1" } }, "码值序列", -1)),
                    G(pe, {
                      size: "small",
                      onClick: Nr
                    }, {
                      default: ie(() => [...y[45] || (y[45] = [
                        Le("导出码值", -1)
                      ])]),
                      _: 1
                    }),
                    G(pe, {
                      size: "small",
                      onClick: y[16] || (y[16] = (z) => {
                        var ze;
                        return (ze = je.value) == null ? void 0 : ze.click();
                      }),
                      style: { "margin-left": "6px" }
                    }, {
                      default: ie(() => [...y[46] || (y[46] = [
                        Le("导入码值", -1)
                      ])]),
                      _: 1
                    }),
                    Ne("input", {
                      ref_key: "cvImportRef",
                      ref: je,
                      type: "file",
                      accept: ".csv",
                      style: { display: "none" },
                      onChange: Be
                    }, null, 544)
                  ]),
                  Ne("div", px, [
                    y[48] || (y[48] = Ne("div", { class: "cv-header" }, [
                      Ne("span", null, "码值编码"),
                      Ne("span", null, "码值含义"),
                      Ne("span")
                    ], -1)),
                    (_r(!0), Ar(Ut, null, Wt(re.value, (z, ze) => (_r(), Ar("div", {
                      key: ze,
                      class: "cv-row"
                    }, [
                      G(fe, {
                        modelValue: z.code,
                        "onUpdate:modelValue": (st) => z.code = st,
                        placeholder: "码值",
                        size: "small",
                        style: { "border-radius": "0", "border-right": "1px solid #e4e7ed" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      G(fe, {
                        modelValue: z.label,
                        "onUpdate:modelValue": (st) => z.label = st,
                        placeholder: "含义",
                        size: "small",
                        style: { "border-radius": "0" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      Ne("button", {
                        class: "cv-del-btn",
                        onClick: (st) => re.value.splice(ze, 1)
                      }, "×", 8, vx)
                    ]))), 128)),
                    Ne("button", {
                      class: "cv-add-btn",
                      onClick: y[17] || (y[17] = (z) => re.value.push({ code: "", label: "" }))
                    }, "+ 添加码值")
                  ])
                ])) : Vt("", !0)
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        G(Lt, {
          modelValue: ne.value,
          "onUpdate:modelValue": y[30] || (y[30] = (z) => ne.value = z),
          title: Te.value ? "新增字段" : "编辑字段",
          width: "680px",
          "close-on-click-modal": !1,
          "destroy-on-close": ""
        }, {
          footer: ie(() => [
            G(pe, {
              onClick: y[29] || (y[29] = (z) => ne.value = !1)
            }, {
              default: ie(() => [...y[54] || (y[54] = [
                Le("取消", -1)
              ])]),
              _: 1
            }),
            G(pe, {
              type: "primary",
              onClick: hr,
              loading: s.value
            }, {
              default: ie(() => [...y[55] || (y[55] = [
                Le("保存", -1)
              ])]),
              _: 1
            }, 8, ["loading"])
          ]),
          default: ie(() => [
            G(un, {
              model: de.value,
              "label-width": "110px",
              size: "small"
            }, {
              default: ie(() => [
                G(Pt, { gutter: 16 }, {
                  default: ie(() => [
                    G(fr, { span: 12 }, {
                      default: ie(() => [
                        G(sr, { label: "字段ID *" }, {
                          default: ie(() => [
                            G(fe, {
                              modelValue: de.value.id,
                              "onUpdate:modelValue": y[20] || (y[20] = (z) => de.value.id = z),
                              disabled: !Te.value,
                              placeholder: "如 FIELD_001"
                            }, null, 8, ["modelValue", "disabled"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    G(fr, { span: 12 }, {
                      default: ie(() => [
                        G(sr, { label: "字段中文名 *" }, {
                          default: ie(() => [
                            G(fe, {
                              modelValue: de.value.name_cn,
                              "onUpdate:modelValue": y[21] || (y[21] = (z) => de.value.name_cn = z)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    G(fr, { span: 12 }, {
                      default: ie(() => [
                        G(sr, { label: "字段英文名" }, {
                          default: ie(() => [
                            G(fe, {
                              modelValue: de.value.name_en,
                              "onUpdate:modelValue": y[22] || (y[22] = (z) => de.value.name_en = z),
                              placeholder: "可手动填写"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    G(fr, { span: 12 }, {
                      default: ie(() => [
                        G(sr, { label: "引用字根" }, {
                          default: ie(() => [
                            G(Nt, {
                              modelValue: de.value.root_id,
                              "onUpdate:modelValue": y[23] || (y[23] = (z) => de.value.root_id = z),
                              clearable: "",
                              filterable: "",
                              style: { width: "100%" },
                              onChange: He
                            }, {
                              default: ie(() => [
                                (_r(!0), Ar(Ut, null, Wt(a.value, (z) => (_r(), hs(It, {
                                  key: z.id,
                                  label: z.name + " (" + z.id + ")",
                                  value: z.id
                                }, null, 8, ["label", "value"]))), 128))
                              ]),
                              _: 1
                            }, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    G(fr, { span: 12 }, {
                      default: ie(() => [
                        G(sr, { label: "字段类型" }, {
                          default: ie(() => [
                            G(fe, {
                              modelValue: de.value.field_type,
                              "onUpdate:modelValue": y[24] || (y[24] = (z) => de.value.field_type = z),
                              disabled: !!de.value.root_id,
                              placeholder: "引用字根后自动填充"
                            }, null, 8, ["modelValue", "disabled"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    G(fr, { span: 12 }, {
                      default: ie(() => [
                        G(sr, { label: "字段长度" }, {
                          default: ie(() => [
                            G(fe, {
                              modelValue: de.value.length,
                              "onUpdate:modelValue": y[25] || (y[25] = (z) => de.value.length = z),
                              disabled: !!de.value.root_id,
                              placeholder: "引用字根后自动填充",
                              type: "number"
                            }, null, 8, ["modelValue", "disabled"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    G(fr, { span: 24 }, {
                      default: ie(() => [
                        G(sr, { label: "字段备注" }, {
                          default: ie(() => [
                            G(fe, {
                              modelValue: de.value.remark,
                              "onUpdate:modelValue": y[26] || (y[26] = (z) => de.value.remark = z),
                              type: "textarea",
                              rows: 2
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                Re.value.length ? (_r(), Ar("div", mx, [
                  Ne("div", gx, [
                    y[53] || (y[53] = Ne("span", { style: { "font-size": "12px", "font-weight": "600", color: "#909399" } }, "字段码值（勾选需要保留的）", -1)),
                    Ne("span", null, [
                      G(pe, {
                        size: "small",
                        onClick: y[27] || (y[27] = (z) => Re.value.forEach((ze) => ze.checked = !0))
                      }, {
                        default: ie(() => [...y[51] || (y[51] = [
                          Le("全选", -1)
                        ])]),
                        _: 1
                      }),
                      G(pe, {
                        size: "small",
                        onClick: y[28] || (y[28] = (z) => Re.value.forEach((ze) => ze.checked = !1))
                      }, {
                        default: ie(() => [...y[52] || (y[52] = [
                          Le("全不选", -1)
                        ])]),
                        _: 1
                      })
                    ])
                  ]),
                  Ne("div", _x, [
                    (_r(!0), Ar(Ut, null, Wt(Re.value, (z) => (_r(), Ar("label", {
                      key: z.value,
                      class: "cv-check-item"
                    }, [
                      Yn(Ne("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": (ze) => z.checked = ze
                      }, null, 8, Tx), [
                        [xs, z.checked]
                      ]),
                      Ne("span", Ex, zr(z.code), 1),
                      z.label ? (_r(), Ar("span", wx, zr(z.label), 1)) : Vt("", !0)
                    ]))), 128))
                  ])
                ])) : Vt("", !0)
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        G(Lt, {
          modelValue: F.value,
          "onUpdate:modelValue": y[32] || (y[32] = (z) => F.value = z),
          title: A.value,
          width: "760px",
          "destroy-on-close": ""
        }, {
          footer: ie(() => [
            G(pe, {
              onClick: y[31] || (y[31] = (z) => F.value = !1)
            }, {
              default: ie(() => [...y[56] || (y[56] = [
                Le("关闭", -1)
              ])]),
              _: 1
            }),
            G(pe, {
              type: "success",
              onClick: ce
            }, {
              default: ie(() => [...y[57] || (y[57] = [
                Le("📥 导出Excel", -1)
              ])]),
              _: 1
            })
          ]),
          default: ie(() => {
            var z;
            return [
              V.value ? (_r(), Ar("div", Sx, [
                (z = V.value.usedFields) != null && z.length ? (_r(), Ar("div", Ax, [
                  Ne("div", Fx, "📋 引用字段（" + zr(V.value.usedFields.length) + "）", 1),
                  G(Xr, {
                    data: V.value.usedFields,
                    size: "small",
                    border: ""
                  }, {
                    default: ie(() => [
                      G(Ie, {
                        prop: "id",
                        label: "字段ID",
                        width: "140"
                      }),
                      G(Ie, {
                        prop: "name_en",
                        label: "英文名",
                        width: "140"
                      }),
                      G(Ie, {
                        prop: "name_cn",
                        label: "中文名"
                      })
                    ]),
                    _: 1
                  }, 8, ["data"])
                ])) : Vt("", !0)
              ])) : Vt("", !0)
            ];
          }),
          _: 1
        }, 8, ["modelValue", "title"]),
        Ne("input", {
          type: "file",
          ref_key: "importFileRef",
          ref: _e,
          accept: ".csv",
          style: { display: "none" },
          onChange: mr
        }, null, 544)
      ]);
    };
  }
}), Cx = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, a] of t)
    r[n] = a;
  return r;
}, Ox = /* @__PURE__ */ Cx(yx, [["__scopeId", "data-v-58b6c61c"]]);
function Rx(e, t) {
  return l0({
    render() {
      return ds(Ox, { api: e, toolId: t });
    }
  });
}
export {
  Rx as createView
};
