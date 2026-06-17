import { defineComponent as Qn, ref as be, computed as Yn, onMounted as cs, resolveComponent as dr, openBlock as pr, createElementBlock as _r, createElementVNode as ke, Fragment as Rt, renderList as Nt, normalizeClass as us, toDisplayString as rt, withDirectives as Un, createVNode as z, withCtx as fe, createTextVNode as Me, withModifiers as an, vShow as C0, createCommentVNode as Pt, createBlock as hs, vModelCheckbox as xs, h as ds } from "vue";
import { ElMessage as or, ElMessageBox as O0 } from "element-plus";
/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var dn = {};
dn.version = "0.18.5";
var pa = 1252, ps = [874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1e4], va = function(e) {
  ps.indexOf(e) != -1 && (pa = e);
};
function vs() {
  va(1252);
}
var Xt = function(e) {
  va(e);
};
function ms() {
  Xt(1200), vs();
}
var sn = function(t) {
  return String.fromCharCode(t);
}, k0 = function(t) {
  return String.fromCharCode(t);
}, pn, zr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function $t(e) {
  for (var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, f = 0, o = 0, l = 0; l < e.length; )
    r = e.charCodeAt(l++), i = r >> 2, n = e.charCodeAt(l++), s = (r & 3) << 4 | n >> 4, a = e.charCodeAt(l++), f = (n & 15) << 2 | a >> 6, o = a & 63, isNaN(n) ? f = o = 64 : isNaN(a) && (o = 64), t += zr.charAt(i) + zr.charAt(s) + zr.charAt(f) + zr.charAt(o);
  return t;
}
function Hr(e) {
  var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, f = 0, o = 0;
  e = e.replace(/[^\w\+\/\=]/g, "");
  for (var l = 0; l < e.length; )
    i = zr.indexOf(e.charAt(l++)), s = zr.indexOf(e.charAt(l++)), r = i << 2 | s >> 4, t += String.fromCharCode(r), f = zr.indexOf(e.charAt(l++)), n = (s & 15) << 4 | f >> 2, f !== 64 && (t += String.fromCharCode(n)), o = zr.indexOf(e.charAt(l++)), a = (f & 3) << 6 | o, o !== 64 && (t += String.fromCharCode(a));
  return t;
}
var Ee = /* @__PURE__ */ function() {
  return typeof Buffer < "u" && typeof process < "u" && typeof process.versions < "u" && !!process.versions.node;
}(), Xr = /* @__PURE__ */ function() {
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
function at(e) {
  return Ee ? Buffer.alloc ? Buffer.alloc(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
function D0(e) {
  return Ee ? Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
var Dr = function(t) {
  return Ee ? Xr(t, "binary") : t.split("").map(function(r) {
    return r.charCodeAt(0) & 255;
  });
};
function kn(e) {
  if (typeof ArrayBuffer > "u") return Dr(e);
  for (var t = new ArrayBuffer(e.length), r = new Uint8Array(t), n = 0; n != e.length; ++n) r[n] = e.charCodeAt(n) & 255;
  return t;
}
function Zt(e) {
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
var rr = Ee ? function(e) {
  return Buffer.concat(e.map(function(t) {
    return Buffer.isBuffer(t) ? t : Xr(t);
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
  for (var t = [], r = 0, n = e.length + 250, a = at(e.length + 255), i = 0; i < e.length; ++i) {
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
    r > n && (t.push(a.slice(0, r)), r = 0, a = at(65535), n = 65530);
  }
  return t.push(a.slice(0, r)), rr(t);
}
var bt = /\u0000/g, fn = /[\u0001-\u0006]/g;
function _t(e) {
  for (var t = "", r = e.length - 1; r >= 0; ) t += e.charAt(r--);
  return t;
}
function Ir(e, t) {
  var r = "" + e;
  return r.length >= t ? r : Ue("0", t - r.length) + r;
}
function e0(e, t) {
  var r = "" + e;
  return r.length >= t ? r : Ue(" ", t - r.length) + r;
}
function vn(e, t) {
  var r = "" + e;
  return r.length >= t ? r : r + Ue(" ", t - r.length);
}
function Ts(e, t) {
  var r = "" + Math.round(e);
  return r.length >= t ? r : Ue("0", t - r.length) + r;
}
function Es(e, t) {
  var r = "" + e;
  return r.length >= t ? r : Ue("0", t - r.length) + r;
}
var I0 = /* @__PURE__ */ Math.pow(2, 32);
function dt(e, t) {
  if (e > I0 || e < -I0) return Ts(e, t);
  var r = Math.round(e);
  return Es(r, t);
}
function mn(e, t) {
  return t = t || 0, e.length >= 7 + t && (e.charCodeAt(t) | 32) === 103 && (e.charCodeAt(t + 1) | 32) === 101 && (e.charCodeAt(t + 2) | 32) === 110 && (e.charCodeAt(t + 3) | 32) === 101 && (e.charCodeAt(t + 4) | 32) === 114 && (e.charCodeAt(t + 5) | 32) === 97 && (e.charCodeAt(t + 6) | 32) === 108;
}
var R0 = [
  ["Sun", "Sunday"],
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"]
], Wn = [
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
var We = {
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
}, N0 = {
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
function gn(e, t, r) {
  for (var n = e < 0 ? -1 : 1, a = e * n, i = 0, s = 1, f = 0, o = 1, l = 0, c = 0, d = Math.floor(a); l < t && (d = Math.floor(a), f = d * s + i, c = d * l + o, !(a - d < 5e-8)); )
    a = 1 / (a - d), i = s, s = f, o = l, l = c;
  if (c > t && (l > t ? (c = o, f = i) : (c = l, f = s)), !r) return [0, n * f, c];
  var x = Math.floor(n * f / c);
  return [x, n * f - x * c, c];
}
function ln(e, t, r) {
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
var ma = /* @__PURE__ */ new Date(1899, 11, 31, 0, 0, 0), As = /* @__PURE__ */ ma.getTime(), Fs = /* @__PURE__ */ new Date(1900, 2, 1, 0, 0, 0);
function ga(e, t) {
  var r = /* @__PURE__ */ e.getTime();
  return t ? r -= 1461 * 24 * 60 * 60 * 1e3 : e >= Fs && (r += 24 * 60 * 60 * 1e3), (r - (As + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ ma.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3);
}
function r0(e) {
  return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1");
}
function ys(e) {
  return e.indexOf("E") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/, "$10$2");
}
function Cs(e) {
  var t = e < 0 ? 12 : 11, r = r0(e.toFixed(12));
  return r.length <= t || (r = e.toPrecision(10), r.length <= t) ? r : e.toExponential(5);
}
function Os(e) {
  var t = r0(e.toFixed(11));
  return t.length > (e < 0 ? 12 : 11) || t === "0" || t === "-0" ? e.toPrecision(6) : t;
}
function ks(e) {
  var t = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E), r;
  return t >= -4 && t <= -1 ? r = e.toPrecision(10 + t) : Math.abs(t) <= 9 ? r = Cs(e) : t === 10 ? r = e.toFixed(10).substr(0, 12) : r = Os(e), r0(ys(r.toUpperCase()));
}
function jn(e, t) {
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
      if (e instanceof Date) return Yr(14, ga(e, t && t.date1904), t);
  }
  throw new Error("unsupported value in General format: " + e);
}
function Ds(e, t) {
  t[0] -= 581;
  var r = e.getDay();
  return e < 60 && (r = (r + 6) % 7), r;
}
function Is(e, t, r, n) {
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
          return Wn[r.m - 1][1];
        case 5:
          return Wn[r.m - 1][0];
        default:
          return Wn[r.m - 1][2];
      }
      break;
    case 100:
      switch (t.length) {
        case 1:
        case 2:
          o = r.d, l = t.length;
          break;
        case 3:
          return R0[r.q][0];
        default:
          return R0[r.q][1];
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
      return r.u === 0 && (t == "s" || t == "ss") ? Ir(r.S, t.length) : (n >= 2 ? s = n === 3 ? 1e3 : 100 : s = n === 1 ? 10 : 1, i = Math.round(s * (r.S + r.u)), i >= 60 * s && (i = 0), t === "s" ? i === 0 ? "0" : "" + i / s : (a = Ir(i, 2 + n), t === "ss" ? a.substr(0, 2) : "." + a.substr(2, t.length - 1)));
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
  var c = l > 0 ? Ir(o, l) : "";
  return c;
}
function Kr(e) {
  var t = 3;
  if (e.length <= t) return e;
  for (var r = e.length % t, n = e.substr(0, r); r != e.length; r += t) n += (n.length > 0 ? "," : "") + e.substr(r, t);
  return n;
}
var _a = /%/g;
function Rs(e, t, r) {
  var n = t.replace(_a, ""), a = t.length - n.length;
  return Ur(e, n, r * Math.pow(10, 2 * a)) + Ue("%", a);
}
function Ns(e, t, r) {
  for (var n = t.length - 1; t.charCodeAt(n - 1) === 44; ) --n;
  return Ur(e, t.substr(0, n), r / Math.pow(10, 3 * (t.length - n)));
}
function Ta(e, t) {
  var r, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0) return "0.0E+0";
    if (t < 0) return "-" + Ta(e, -t);
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
var Ea = /# (\?+)( ?)\/( ?)(\d+)/;
function Ps(e, t, r) {
  var n = parseInt(e[4], 10), a = Math.round(t * n), i = Math.floor(a / n), s = a - i * n, f = n;
  return r + (i === 0 ? "" : "" + i) + " " + (s === 0 ? Ue(" ", e[1].length + 1 + e[4].length) : e0(s, e[1].length) + e[2] + "/" + e[3] + Ir(f, e[4].length));
}
function Ls(e, t, r) {
  return r + (t === 0 ? "" : "" + t) + Ue(" ", e[1].length + 2 + e[4].length);
}
var wa = /^#*0*\.([0#]+)/, Sa = /\).*[0#]/, Aa = /\(###\) ###\\?-####/;
function cr(e) {
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
function P0(e, t) {
  var r = Math.pow(10, t);
  return "" + Math.round(e * r) / r;
}
function L0(e, t) {
  var r = e - Math.floor(e), n = Math.pow(10, t);
  return t < ("" + Math.round(r * n)).length ? 0 : Math.round(r * n);
}
function Ms(e, t) {
  return t < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, t))).length ? 1 : 0;
}
function Bs(e) {
  return e < 2147483647 && e > -2147483648 ? "" + (e >= 0 ? e | 0 : e - 1 | 0) : "" + Math.floor(e);
}
function Fr(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(Sa)) {
    var n = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? Fr("n", n, r) : "(" + Fr("n", n, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44) return Ns(e, t, r);
  if (t.indexOf("%") !== -1) return Rs(e, t, r);
  if (t.indexOf("E") !== -1) return Ta(t, r);
  if (t.charCodeAt(0) === 36) return "$" + Fr(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var a, i, s, f, o = Math.abs(r), l = r < 0 ? "-" : "";
  if (t.match(/^00+$/)) return l + dt(o, t.length);
  if (t.match(/^[#?]+$/))
    return a = dt(r, 0), a === "0" && (a = ""), a.length > t.length ? a : cr(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(Ea)) return Ps(i, o, l);
  if (t.match(/^#+0+$/)) return l + dt(o, t.length - t.indexOf("0"));
  if (i = t.match(wa))
    return a = P0(r, i[1].length).replace(/^([^\.]+)$/, "$1." + cr(i[1])).replace(/\.$/, "." + cr(i[1])).replace(/\.(\d*)$/, function(g, u) {
      return "." + u + Ue("0", cr(
        /*::(*/
        i[1]
      ).length - u.length);
    }), t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return l + P0(o, i[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/)) return l + Kr(dt(o, 0));
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + Fr(e, t, -r) : Kr("" + (Math.floor(r) + Ms(r, i[1].length))) + "." + Ir(L0(r, i[1].length), i[1].length);
  if (i = t.match(/^#,#*,#0/)) return Fr(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = _t(Fr(e, t.replace(/[\\-]/g, ""), r)), s = 0, _t(_t(t.replace(/\\/g, "")).replace(/[0#]/g, function(g) {
      return s < a.length ? a.charAt(s++) : g === "0" ? "0" : "";
    }));
  if (t.match(Aa))
    return a = Fr(e, "##########", r), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var c = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), f = gn(o, Math.pow(10, s) - 1, !1), a = "" + l, c = Ur(
      "n",
      /*::String(*/
      i[1],
      f[1]
    ), c.charAt(c.length - 1) == " " && (c = c.substr(0, c.length - 1) + "0"), a += c + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], c = vn(f[2], s), c.length < i[4].length && (c = cr(i[4].substr(i[4].length - c.length)) + c), a += c, a;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = gn(o, Math.pow(10, s) - 1, !0), l + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? e0(f[1], s) + i[2] + "/" + i[3] + vn(f[2], s) : Ue(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return a = dt(r, 0), t.length <= a.length ? a : cr(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(/^([#0?]+)\.([#0]+)$/)) {
    a = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var d = t.indexOf(".") - s, x = t.length - a.length - d;
    return cr(t.substr(0, d) + a + t.substr(t.length - x));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return s = L0(r, i[1].length), r < 0 ? "-" + Fr(e, t, -r) : Kr(Bs(r)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(g) {
      return "00," + (g.length < 3 ? Ir(0, 3 - g.length) : "") + g;
    }) + "." + Ir(s, i[1].length);
  switch (t) {
    case "###,##0.00":
      return Fr(e, "#,##0.00", r);
    case "###,###":
    case "##,###":
    case "#,###":
      var p = Kr(dt(o, 0));
      return p !== "0" ? l + p : "";
    case "###,###.00":
      return Fr(e, "###,##0.00", r).replace(/^0\./, ".");
    case "#,###.00":
      return Fr(e, "#,##0.00", r).replace(/^0\./, ".");
  }
  throw new Error("unsupported format |" + t + "|");
}
function bs(e, t, r) {
  for (var n = t.length - 1; t.charCodeAt(n - 1) === 44; ) --n;
  return Ur(e, t.substr(0, n), r / Math.pow(10, 3 * (t.length - n)));
}
function Us(e, t, r) {
  var n = t.replace(_a, ""), a = t.length - n.length;
  return Ur(e, n, r * Math.pow(10, 2 * a)) + Ue("%", a);
}
function Fa(e, t) {
  var r, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0) return "0.0E+0";
    if (t < 0) return "-" + Fa(e, -t);
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
function Pr(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(Sa)) {
    var n = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? Pr("n", n, r) : "(" + Pr("n", n, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44) return bs(e, t, r);
  if (t.indexOf("%") !== -1) return Us(e, t, r);
  if (t.indexOf("E") !== -1) return Fa(t, r);
  if (t.charCodeAt(0) === 36) return "$" + Pr(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var a, i, s, f, o = Math.abs(r), l = r < 0 ? "-" : "";
  if (t.match(/^00+$/)) return l + Ir(o, t.length);
  if (t.match(/^[#?]+$/))
    return a = "" + r, r === 0 && (a = ""), a.length > t.length ? a : cr(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(Ea)) return Ls(i, o, l);
  if (t.match(/^#+0+$/)) return l + Ir(o, t.length - t.indexOf("0"));
  if (i = t.match(wa))
    return a = ("" + r).replace(/^([^\.]+)$/, "$1." + cr(i[1])).replace(/\.$/, "." + cr(i[1])), a = a.replace(/\.(\d*)$/, function(g, u) {
      return "." + u + Ue("0", cr(i[1]).length - u.length);
    }), t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return l + ("" + o).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/)) return l + Kr("" + o);
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + Pr(e, t, -r) : Kr("" + r) + "." + Ue("0", i[1].length);
  if (i = t.match(/^#,#*,#0/)) return Pr(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = _t(Pr(e, t.replace(/[\\-]/g, ""), r)), s = 0, _t(_t(t.replace(/\\/g, "")).replace(/[0#]/g, function(g) {
      return s < a.length ? a.charAt(s++) : g === "0" ? "0" : "";
    }));
  if (t.match(Aa))
    return a = Pr(e, "##########", r), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var c = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), f = gn(o, Math.pow(10, s) - 1, !1), a = "" + l, c = Ur(
      "n",
      /*::String(*/
      i[1],
      f[1]
    ), c.charAt(c.length - 1) == " " && (c = c.substr(0, c.length - 1) + "0"), a += c + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], c = vn(f[2], s), c.length < i[4].length && (c = cr(i[4].substr(i[4].length - c.length)) + c), a += c, a;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = gn(o, Math.pow(10, s) - 1, !0), l + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? e0(f[1], s) + i[2] + "/" + i[3] + vn(f[2], s) : Ue(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return a = "" + r, t.length <= a.length ? a : cr(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(/^([#0]+)\.([#0]+)$/)) {
    a = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var d = t.indexOf(".") - s, x = t.length - a.length - d;
    return cr(t.substr(0, d) + a + t.substr(t.length - x));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return r < 0 ? "-" + Pr(e, t, -r) : Kr("" + r).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(g) {
      return "00," + (g.length < 3 ? Ir(0, 3 - g.length) : "") + g;
    }) + "." + Ir(0, i[1].length);
  switch (t) {
    case "###,###":
    case "##,###":
    case "#,###":
      var p = Kr("" + o);
      return p !== "0" ? l + p : "";
    default:
      if (t.match(/\.[0#?]*$/)) return Pr(e, t.slice(0, t.lastIndexOf(".")), r) + cr(t.slice(t.lastIndexOf(".")));
  }
  throw new Error("unsupported format |" + t + "|");
}
function Ur(e, t, r) {
  return (r | 0) === r ? Pr(e, t, r) : Fr(e, t, r);
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
var ya = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
function Ca(e) {
  for (var t = 0, r = "", n = ""; t < e.length; )
    switch (r = e.charAt(t)) {
      case "G":
        mn(e, t) && (t += 6), t++;
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
        if (n.match(ya)) return !0;
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
        if (!mn(e, s)) throw new Error("unrecognized character " + f + " in " + e);
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
          if (l == null && (l = ln(t, r, e.charAt(s + 1) === "2"), l == null))
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
        if (t < 0 || l == null && (l = ln(t, r), l == null))
          return "";
        for (i = f; ++s < e.length && e.charAt(s).toLowerCase() === f; ) i += f;
        f === "m" && o.toLowerCase() === "h" && (f = "M"), f === "h" && (f = x), a[a.length] = { t: f, v: i }, o = f;
        break;
      case "A":
      case "a":
      case "上":
        var u = { t: f, v: f };
        if (l == null && (l = ln(t, r)), e.substr(s, 3).toUpperCase() === "A/P" ? (l != null && (u.v = l.H >= 12 ? "P" : "A"), u.t = "T", x = "h", s += 3) : e.substr(s, 5).toUpperCase() === "AM/PM" ? (l != null && (u.v = l.H >= 12 ? "PM" : "AM"), u.t = "T", s += 5, x = "h") : e.substr(s, 5).toUpperCase() === "上午/下午" ? (l != null && (u.v = l.H >= 12 ? "下午" : "上午"), u.t = "T", s += 5, x = "h") : (u.t = "t", ++s), l == null && u.t === "T") return "";
        a[a.length] = u, o = f;
        break;
      case "[":
        for (i = f; e.charAt(s++) !== "]" && s < e.length; ) i += e.charAt(s);
        if (i.slice(-1) !== "]") throw 'unterminated "[" block: |' + i + "|";
        if (i.match(ya)) {
          if (l == null && (l = ln(t, r), l == null))
            return "";
          a[a.length] = { t: "Z", v: i.toLowerCase() }, o = i.charAt(1);
        } else i.indexOf("$") > -1 && (i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$", Ca(e) || (a[a.length] = { t: "t", v: i }));
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
  var _ = 0, D = 0, F;
  for (s = a.length - 1, o = "t"; s >= 0; --s)
    switch (a[s].t) {
      case "h":
      case "H":
        a[s].t = x, o = "h", _ < 1 && (_ = 1);
        break;
      case "s":
        (F = a[s].v.match(/\.0+$/)) && (D = Math.max(D, F[0].length - 1)), _ < 3 && (_ = 3);
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
        a[s].v = Is(a[s].t.charCodeAt(0), a[s].v, l, D), a[s].t = "t";
        break;
      case "n":
      case "?":
        for (B = s + 1; a[B] != null && ((f = a[B].t) === "?" || f === "D" || (f === " " || f === "t") && a[B + 1] != null && (a[B + 1].t === "?" || a[B + 1].t === "t" && a[B + 1].v === "/") || a[s].t === "(" && (f === " " || f === "n" || f === ")") || f === "t" && (a[B].v === "/" || a[B].v === " " && a[B + 1] != null && a[B + 1].t == "?")); )
          a[s].v += a[B].v, a[B] = { v: "", t: ";" }, ++B;
        C += a[s].v, s = B - 1;
        break;
      case "G":
        a[s].t = "t", a[s].v = jn(t, r);
        break;
    }
  var Q = "", ne, k;
  if (C.length > 0) {
    C.charCodeAt(0) == 40 ? (ne = t < 0 && C.charCodeAt(0) === 45 ? -t : t, k = Ur("n", C, ne)) : (ne = t < 0 && n > 1 ? -t : t, k = Ur("n", C, ne), ne < 0 && a[0] && a[0].t == "t" && (k = k.substr(1), a[0].v = "-" + a[0].v)), B = k.length - 1;
    var V = a.length;
    for (s = 0; s < a.length; ++s) if (a[s] != null && a[s].t != "t" && a[s].v.indexOf(".") > -1) {
      V = s;
      break;
    }
    var N = a.length;
    if (V === a.length && k.indexOf("E") === -1) {
      for (s = a.length - 1; s >= 0; --s)
        a[s] == null || "n?".indexOf(a[s].t) === -1 || (B >= a[s].v.length - 1 ? (B -= a[s].v.length, a[s].v = k.substr(B + 1, a[s].v.length)) : B < 0 ? a[s].v = "" : (a[s].v = k.substr(0, B + 1), B = -1), a[s].t = "t", N = s);
      B >= 0 && N < a.length && (a[N].v = k.substr(0, B + 1) + a[N].v);
    } else if (V !== a.length && k.indexOf("E") === -1) {
      for (B = k.indexOf(".") - 1, s = V; s >= 0; --s)
        if (!(a[s] == null || "n?".indexOf(a[s].t) === -1)) {
          for (c = a[s].v.indexOf(".") > -1 && s === V ? a[s].v.indexOf(".") - 1 : a[s].v.length - 1, Q = a[s].v.substr(c + 1); c >= 0; --c)
            B >= 0 && (a[s].v.charAt(c) === "0" || a[s].v.charAt(c) === "#") && (Q = k.charAt(B--) + Q);
          a[s].v = Q, a[s].t = "t", N = s;
        }
      for (B >= 0 && N < a.length && (a[N].v = k.substr(0, B + 1) + a[N].v), B = k.indexOf(".") + 1, s = V; s < a.length; ++s)
        if (!(a[s] == null || "n?(".indexOf(a[s].t) === -1 && s !== V)) {
          for (c = a[s].v.indexOf(".") > -1 && s === V ? a[s].v.indexOf(".") + 1 : 0, Q = a[s].v.substr(0, c); c < a[s].v.length; ++c)
            B < k.length && (Q += k.charAt(B++));
          a[s].v = Q, a[s].t = "t", N = s;
        }
    }
  }
  for (s = 0; s < a.length; ++s) a[s] != null && "n?".indexOf(a[s].t) > -1 && (ne = n > 1 && t < 0 && s > 0 && a[s - 1].v === "-" ? -t : t, a[s].v = Ur(a[s].t, a[s].v, ne), a[s].t = "t");
  var b = "";
  for (s = 0; s !== a.length; ++s) a[s] != null && (b += a[s].v);
  return b;
}
var M0 = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
function B0(e, t) {
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
    var s = r[0].match(M0), f = r[1].match(M0);
    return B0(t, s) ? [n, r[0]] : B0(t, f) ? [n, r[1]] : [n, r[s != null && f != null ? 2 : 1]];
  }
  return [n, i];
}
function Yr(e, t, r) {
  r == null && (r = {});
  var n = "";
  switch (typeof e) {
    case "string":
      e == "m/d/yy" && r.dateNF ? n = r.dateNF : n = e;
      break;
    case "number":
      e == 14 && r.dateNF ? n = r.dateNF : n = (r.table != null ? r.table : We)[e], n == null && (n = r.table && r.table[N0[e]] || We[N0[e]]), n == null && (n = Ss[e] || "General");
      break;
  }
  if (mn(n, 0)) return jn(t, r);
  t instanceof Date && (t = ga(t, r.date1904));
  var a = Hs(n, t);
  if (mn(a[1])) return jn(t, r);
  if (t === !0) t = "TRUE";
  else if (t === !1) t = "FALSE";
  else if (t === "" || t == null) return "";
  return Vs(a[1], t, r, a[0]);
}
function Oa(e, t) {
  if (typeof t != "number") {
    t = +t || -1;
    for (var r = 0; r < 392; ++r) {
      if (We[r] == null) {
        t < 0 && (t = r);
        continue;
      }
      if (We[r] == e) {
        t = r;
        break;
      }
    }
    t < 0 && (t = 391);
  }
  return We[t] = e, t;
}
function Dn(e) {
  for (var t = 0; t != 392; ++t)
    e[t] !== void 0 && Oa(e[t], t);
}
function In() {
  We = ws();
}
var ka = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
function Gs(e) {
  var t = typeof e == "number" ? We[e] : e;
  return t = t.replace(ka, "(\\d+)"), new RegExp("^" + t + "$");
}
function Xs(e, t, r) {
  var n = -1, a = -1, i = -1, s = -1, f = -1, o = -1;
  (t.match(ka) || []).forEach(function(d, x) {
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
    for (var k = 0, V = new Array(256), N = 0; N != 256; ++N)
      k = N, k = k & 1 ? -306674912 ^ k >>> 1 : k >>> 1, k = k & 1 ? -306674912 ^ k >>> 1 : k >>> 1, k = k & 1 ? -306674912 ^ k >>> 1 : k >>> 1, k = k & 1 ? -306674912 ^ k >>> 1 : k >>> 1, k = k & 1 ? -306674912 ^ k >>> 1 : k >>> 1, k = k & 1 ? -306674912 ^ k >>> 1 : k >>> 1, k = k & 1 ? -306674912 ^ k >>> 1 : k >>> 1, k = k & 1 ? -306674912 ^ k >>> 1 : k >>> 1, V[N] = k;
    return typeof Int32Array < "u" ? new Int32Array(V) : V;
  }
  var r = t();
  function n(k) {
    var V = 0, N = 0, b = 0, K = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
    for (b = 0; b != 256; ++b) K[b] = k[b];
    for (b = 0; b != 256; ++b)
      for (N = k[b], V = 256 + b; V < 4096; V += 256) N = K[V] = N >>> 8 ^ k[N & 255];
    var J = [];
    for (b = 1; b != 16; ++b) J[b - 1] = typeof Int32Array < "u" ? K.subarray(b * 256, b * 256 + 256) : K.slice(b * 256, b * 256 + 256);
    return J;
  }
  var a = n(r), i = a[0], s = a[1], f = a[2], o = a[3], l = a[4], c = a[5], d = a[6], x = a[7], p = a[8], g = a[9], u = a[10], _ = a[11], D = a[12], F = a[13], C = a[14];
  function B(k, V) {
    for (var N = V ^ -1, b = 0, K = k.length; b < K; ) N = N >>> 8 ^ r[(N ^ k.charCodeAt(b++)) & 255];
    return ~N;
  }
  function Q(k, V) {
    for (var N = V ^ -1, b = k.length - 15, K = 0; K < b; ) N = C[k[K++] ^ N & 255] ^ F[k[K++] ^ N >> 8 & 255] ^ D[k[K++] ^ N >> 16 & 255] ^ _[k[K++] ^ N >>> 24] ^ u[k[K++]] ^ g[k[K++]] ^ p[k[K++]] ^ x[k[K++]] ^ d[k[K++]] ^ c[k[K++]] ^ l[k[K++]] ^ o[k[K++]] ^ f[k[K++]] ^ s[k[K++]] ^ i[k[K++]] ^ r[k[K++]];
    for (b += 15; K < b; ) N = N >>> 8 ^ r[(N ^ k[K++]) & 255];
    return ~N;
  }
  function ne(k, V) {
    for (var N = V ^ -1, b = 0, K = k.length, J = 0, se = 0; b < K; )
      J = k.charCodeAt(b++), J < 128 ? N = N >>> 8 ^ r[(N ^ J) & 255] : J < 2048 ? (N = N >>> 8 ^ r[(N ^ (192 | J >> 6 & 31)) & 255], N = N >>> 8 ^ r[(N ^ (128 | J & 63)) & 255]) : J >= 55296 && J < 57344 ? (J = (J & 1023) + 64, se = k.charCodeAt(b++) & 1023, N = N >>> 8 ^ r[(N ^ (240 | J >> 8 & 7)) & 255], N = N >>> 8 ^ r[(N ^ (128 | J >> 2 & 63)) & 255], N = N >>> 8 ^ r[(N ^ (128 | se >> 6 & 15 | (J & 3) << 4)) & 255], N = N >>> 8 ^ r[(N ^ (128 | se & 63)) & 255]) : (N = N >>> 8 ^ r[(N ^ (224 | J >> 12 & 15)) & 255], N = N >>> 8 ^ r[(N ^ (128 | J >> 6 & 63)) & 255], N = N >>> 8 ^ r[(N ^ (128 | J & 63)) & 255]);
    return ~N;
  }
  return e.table = r, e.bstr = B, e.buf = Q, e.str = ne, e;
}(), Oe = /* @__PURE__ */ function() {
  var t = {};
  t.version = "1.2.1";
  function r(h, T) {
    for (var v = h.split("/"), m = T.split("/"), E = 0, w = 0, R = Math.min(v.length, m.length); E < R; ++E) {
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
    var R = T & 31;
    T >>>= 5;
    var W = T & 63;
    return T >>>= 6, m.setHours(T), m.setMinutes(W), m.setSeconds(R << 1), m;
  }
  function f(h) {
    Er(h, 0);
    for (var T = (
      /*::(*/
      {}
    ), v = 0; h.l <= h.length - 4; ) {
      var m = h.read_shift(2), E = h.read_shift(2), w = h.l + E, R = {};
      switch (m) {
        case 21589:
          v = h.read_shift(1), v & 1 && (R.mtime = h.read_shift(4)), E > 5 && (v & 2 && (R.atime = h.read_shift(4)), v & 4 && (R.ctime = h.read_shift(4))), R.mtime && (R.mt = new Date(R.mtime * 1e3));
          break;
      }
      h.l = w, T[m] = R;
    }
    return T;
  }
  var o;
  function l() {
    return o || (o = {});
  }
  function c(h, T) {
    if (h[0] == 80 && h[1] == 75) return y0(h, T);
    if ((h[0] | 32) == 109 && (h[1] | 32) == 105) return as(h, T);
    if (h.length < 512) throw new Error("CFB file size " + h.length + " < 512");
    var v = 3, m = 512, E = 0, w = 0, R = 0, W = 0, I = 0, P = [], L = (
      /*::(*/
      h.slice(0, 512)
    );
    Er(L, 0);
    var Z = d(L);
    switch (v = Z[0], v) {
      case 3:
        m = 512;
        break;
      case 4:
        m = 4096;
        break;
      case 0:
        if (Z[1] == 0) return y0(h, T);
      default:
        throw new Error("Major Version: Expected 3 or 4 saw " + v);
    }
    m !== 512 && (L = /*::(*/
    h.slice(0, m), Er(
      L,
      28
      /* blob.l */
    ));
    var te = h.slice(0, m);
    x(L, v);
    var oe = L.read_shift(4, "i");
    if (v === 3 && oe !== 0) throw new Error("# Directory Sectors: Expected 0 saw " + oe);
    L.l += 4, R = L.read_shift(4, "i"), L.l += 4, L.chk("00100000", "Mini Stream Cutoff Size: "), W = L.read_shift(4, "i"), E = L.read_shift(4, "i"), I = L.read_shift(4, "i"), w = L.read_shift(4, "i");
    for (var q = -1, le = 0; le < 109 && (q = L.read_shift(4, "i"), !(q < 0)); ++le)
      P[le] = q;
    var pe = p(h, m);
    _(I, w, pe, m, P);
    var Pe = F(pe, R, P, m);
    Pe[R].name = "!Directory", E > 0 && W !== se && (Pe[W].name = "!MiniFAT"), Pe[P[0]].name = "!FAT", Pe.fat_addrs = P, Pe.ssz = m;
    var Le = {}, ir = [], kt = [], Dt = [];
    C(R, Pe, pe, ir, E, Le, kt, W), g(kt, Dt, ir), ir.shift();
    var It = {
      FileIndex: kt,
      FullPaths: Dt
    };
    return T && T.raw && (It.raw = { header: te, sectors: pe }), It;
  }
  function d(h) {
    if (h[h.l] == 80 && h[h.l + 1] == 75) return [0, 0];
    h.chk(we, "Header Signature: "), h.l += 16;
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
    for (var m = 0, E = 0, w = 0, R = 0, W = 0, I = v.length, P = [], L = []; m < I; ++m)
      P[m] = L[m] = m, T[m] = v[m];
    for (; W < L.length; ++W)
      m = L[W], E = h[m].L, w = h[m].R, R = h[m].C, P[m] === m && (E !== -1 && P[E] !== E && (P[m] = P[E]), w !== -1 && P[w] !== w && (P[m] = P[w])), R !== -1 && (P[R] = m), E !== -1 && m != P[m] && (P[E] = P[m], L.lastIndexOf(E) < W && L.push(E)), w !== -1 && m != P[m] && (P[w] = P[m], L.lastIndexOf(w) < W && L.push(w));
    for (m = 1; m < I; ++m) P[m] === m && (w !== -1 && P[w] !== w ? P[m] = P[w] : E !== -1 && P[E] !== E && (P[m] = P[E]));
    for (m = 1; m < I; ++m)
      if (h[m].type !== 0) {
        if (W = m, W != P[W]) do
          W = P[W], T[m] = T[W] + "/" + T[m];
        while (W !== 0 && P[W] !== -1 && W != P[W]);
        P[m] = -1;
      }
    for (T[0] += "/", m = 1; m < I; ++m)
      h[m].type !== 2 && (T[m] += "/");
  }
  function u(h, T, v) {
    for (var m = h.start, E = h.size, w = [], R = m; v && E > 0 && R >= 0; )
      w.push(T.slice(R * J, R * J + J)), E -= J, R = tt(v, R * 4);
    return w.length === 0 ? U(0) : rr(w).slice(0, h.size);
  }
  function _(h, T, v, m, E) {
    var w = se;
    if (h === se) {
      if (T !== 0) throw new Error("DIFAT chain shorter than expected");
    } else if (h !== -1) {
      var R = v[h], W = (m >>> 2) - 1;
      if (!R) return;
      for (var I = 0; I < W && (w = tt(R, I * 4)) !== se; ++I)
        E.push(w);
      _(tt(R, m - 4), T - 1, v, m, E);
    }
  }
  function D(h, T, v, m, E) {
    var w = [], R = [];
    E || (E = []);
    var W = m - 1, I = 0, P = 0;
    for (I = T; I >= 0; ) {
      E[I] = !0, w[w.length] = I, R.push(h[I]);
      var L = v[Math.floor(I * 4 / m)];
      if (P = I * 4 & W, m < 4 + P) throw new Error("FAT boundary crossed: " + I + " 4 " + m);
      if (!h[L]) break;
      I = tt(h[L], P);
    }
    return { nodes: w, data: $0([R]) };
  }
  function F(h, T, v, m) {
    var E = h.length, w = [], R = [], W = [], I = [], P = m - 1, L = 0, Z = 0, te = 0, oe = 0;
    for (L = 0; L < E; ++L)
      if (W = [], te = L + T, te >= E && (te -= E), !R[te]) {
        I = [];
        var q = [];
        for (Z = te; Z >= 0; ) {
          q[Z] = !0, R[Z] = !0, W[W.length] = Z, I.push(h[Z]);
          var le = v[Math.floor(Z * 4 / m)];
          if (oe = Z * 4 & P, m < 4 + oe) throw new Error("FAT boundary crossed: " + Z + " 4 " + m);
          if (!h[le] || (Z = tt(h[le], oe), q[Z])) break;
        }
        w[te] = { nodes: W, data: $0([I]) };
      }
    return w;
  }
  function C(h, T, v, m, E, w, R, W) {
    for (var I = 0, P = m.length ? 2 : 0, L = T[h].data, Z = 0, te = 0, oe; Z < L.length; Z += 128) {
      var q = (
        /*::(*/
        L.slice(Z, Z + 128)
      );
      Er(q, 64), te = q.read_shift(2), oe = s0(q, 0, te - P), m.push(oe);
      var le = {
        name: oe,
        type: q.read_shift(1),
        color: q.read_shift(1),
        L: q.read_shift(4, "i"),
        R: q.read_shift(4, "i"),
        C: q.read_shift(4, "i"),
        clsid: q.read_shift(16),
        state: q.read_shift(4, "i"),
        start: 0,
        size: 0
      }, pe = q.read_shift(2) + q.read_shift(2) + q.read_shift(2) + q.read_shift(2);
      pe !== 0 && (le.ct = B(q, q.l - 8));
      var Pe = q.read_shift(2) + q.read_shift(2) + q.read_shift(2) + q.read_shift(2);
      Pe !== 0 && (le.mt = B(q, q.l - 8)), le.start = q.read_shift(4, "i"), le.size = q.read_shift(4, "i"), le.size < 0 && le.start < 0 && (le.size = le.type = 0, le.start = se, le.name = ""), le.type === 5 ? (I = le.start, E > 0 && I !== se && (T[I].name = "!StreamData")) : le.size >= 4096 ? (le.storage = "fat", T[le.start] === void 0 && (T[le.start] = D(v, le.start, T.fat_addrs, T.ssz)), T[le.start].name = le.name, le.content = T[le.start].data.slice(0, le.size)) : (le.storage = "minifat", le.size < 0 ? le.size = 0 : I !== se && le.start !== se && T[I] && (le.content = u(le, T[I].data, (T[W] || {}).data))), le.content && Er(le.content, 0), w[oe] = le, R.push(le);
    }
  }
  function B(h, T) {
    return new Date((Sr(h, T + 4) / 1e7 * Math.pow(2, 32) + Sr(h, T) / 1e7 - 11644473600) * 1e3);
  }
  function Q(h, T) {
    return l(), c(o.readFileSync(h), T);
  }
  function ne(h, T) {
    var v = T && T.type;
    switch (v || Ee && Buffer.isBuffer(h) && (v = "buffer"), v || "base64") {
      case "file":
        return Q(h, T);
      case "base64":
        return c(Dr(Hr(h)), T);
      case "binary":
        return c(Dr(h), T);
    }
    return c(
      /*::typeof blob == 'string' ? new Buffer(blob, 'utf-8') : */
      h,
      T
    );
  }
  function k(h, T) {
    var v = T || {}, m = v.root || "Root Entry";
    if (h.FullPaths || (h.FullPaths = []), h.FileIndex || (h.FileIndex = []), h.FullPaths.length !== h.FileIndex.length) throw new Error("inconsistent CFB structure");
    h.FullPaths.length === 0 && (h.FullPaths[0] = m + "/", h.FileIndex[0] = { name: m, type: 5 }), v.CLSID && (h.FileIndex[0].clsid = v.CLSID), V(h);
  }
  function V(h) {
    var T = "Sh33tJ5";
    if (!Oe.find(h, "/" + T)) {
      var v = U(4);
      v[0] = 55, v[1] = v[3] = 50, v[2] = 54, h.FileIndex.push({ name: T, type: 2, content: v, size: 4, L: 69, R: 69, C: 69 }), h.FullPaths.push(h.FullPaths[0] + T), N(h);
    }
  }
  function N(h, T) {
    k(h);
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
      var R = new Date(1987, 1, 19), W = 0, I = Object.create ? /* @__PURE__ */ Object.create(null) : {}, P = [];
      for (E = 0; E < h.FullPaths.length; ++E)
        I[h.FullPaths[E]] = !0, h.FileIndex[E].type !== 0 && P.push([h.FullPaths[E], h.FileIndex[E]]);
      for (E = 0; E < P.length; ++E) {
        var L = n(P[E][0]);
        m = I[L], m || (P.push([L, {
          name: a(L).replace("/", ""),
          type: 1,
          clsid: Ne,
          ct: R,
          mt: R,
          content: null
        }]), I[L] = !0);
      }
      for (P.sort(function(oe, q) {
        return r(oe[0], q[0]);
      }), h.FullPaths = [], h.FileIndex = [], E = 0; E < P.length; ++E)
        h.FullPaths[E] = P[E][0], h.FileIndex[E] = P[E][1];
      for (E = 0; E < P.length; ++E) {
        var Z = h.FileIndex[E], te = h.FullPaths[E];
        if (Z.name = a(te).replace("/", ""), Z.L = Z.R = Z.C = -(Z.color = 1), Z.size = Z.content ? Z.content.length : 0, Z.start = 0, Z.clsid = Z.clsid || Ne, E === 0)
          Z.C = P.length > 1 ? 1 : -1, Z.size = 0, Z.type = 5;
        else if (te.slice(-1) == "/") {
          for (W = E + 1; W < P.length && n(h.FullPaths[W]) != te; ++W) ;
          for (Z.C = W >= P.length ? -1 : W, W = E + 1; W < P.length && n(h.FullPaths[W]) != n(te); ++W) ;
          Z.R = W >= P.length ? -1 : W, Z.type = 1;
        } else
          n(h.FullPaths[E + 1] || "") == n(te) && (Z.R = E + 1), Z.type = 2;
      }
    }
  }
  function b(h, T) {
    var v = T || {};
    if (v.fileType == "mad") return is(h, v);
    switch (N(h), v.fileType) {
      case "zip":
        return qi(h, v);
    }
    var m = function(oe) {
      for (var q = 0, le = 0, pe = 0; pe < oe.FileIndex.length; ++pe) {
        var Pe = oe.FileIndex[pe];
        if (Pe.content) {
          var Le = Pe.content.length;
          Le > 0 && (Le < 4096 ? q += Le + 63 >> 6 : le += Le + 511 >> 9);
        }
      }
      for (var ir = oe.FullPaths.length + 3 >> 2, kt = q + 7 >> 3, Dt = q + 127 >> 7, It = kt + le + ir + Dt, et = It + 127 >> 7, bn = et <= 109 ? 0 : Math.ceil((et - 109) / 127); It + et + bn + 127 >> 7 > et; ) bn = ++et <= 109 ? 0 : Math.ceil((et - 109) / 127);
      var br = [1, bn, et, Dt, ir, le, q, 0];
      return oe.FileIndex[0].size = q << 6, br[7] = (oe.FileIndex[0].start = br[0] + br[1] + br[2] + br[3] + br[4] + br[5]) + (br[6] + 7 >> 3), br;
    }(h), E = U(m[7] << 9), w = 0, R = 0;
    {
      for (w = 0; w < 8; ++w) E.write_shift(1, de[w]);
      for (w = 0; w < 8; ++w) E.write_shift(2, 0);
      for (E.write_shift(2, 62), E.write_shift(2, 3), E.write_shift(2, 65534), E.write_shift(2, 9), E.write_shift(2, 6), w = 0; w < 3; ++w) E.write_shift(2, 0);
      for (E.write_shift(4, 0), E.write_shift(4, m[2]), E.write_shift(4, m[0] + m[1] + m[2] + m[3] - 1), E.write_shift(4, 0), E.write_shift(4, 4096), E.write_shift(4, m[3] ? m[0] + m[1] + m[2] - 1 : se), E.write_shift(4, m[3]), E.write_shift(-4, m[1] ? m[0] - 1 : se), E.write_shift(4, m[1]), w = 0; w < 109; ++w) E.write_shift(-4, w < m[2] ? m[1] + w : -1);
    }
    if (m[1])
      for (R = 0; R < m[1]; ++R) {
        for (; w < 236 + R * 127; ++w) E.write_shift(-4, w < m[2] ? m[1] + w : -1);
        E.write_shift(-4, R === m[1] - 1 ? se : R + 1);
      }
    var W = function(oe) {
      for (R += oe; w < R - 1; ++w) E.write_shift(-4, w + 1);
      oe && (++w, E.write_shift(-4, se));
    };
    for (R = w = 0, R += m[1]; w < R; ++w) E.write_shift(-4, De.DIFSECT);
    for (R += m[2]; w < R; ++w) E.write_shift(-4, De.FATSECT);
    W(m[3]), W(m[4]);
    for (var I = 0, P = 0, L = h.FileIndex[0]; I < h.FileIndex.length; ++I)
      L = h.FileIndex[I], L.content && (P = L.content.length, !(P < 4096) && (L.start = R, W(P + 511 >> 9)));
    for (W(m[6] + 7 >> 3); E.l & 511; ) E.write_shift(-4, De.ENDOFCHAIN);
    for (R = w = 0, I = 0; I < h.FileIndex.length; ++I)
      L = h.FileIndex[I], L.content && (P = L.content.length, !(!P || P >= 4096) && (L.start = R, W(P + 63 >> 6)));
    for (; E.l & 511; ) E.write_shift(-4, De.ENDOFCHAIN);
    for (w = 0; w < m[4] << 2; ++w) {
      var Z = h.FullPaths[w];
      if (!Z || Z.length === 0) {
        for (I = 0; I < 17; ++I) E.write_shift(4, 0);
        for (I = 0; I < 3; ++I) E.write_shift(4, -1);
        for (I = 0; I < 12; ++I) E.write_shift(4, 0);
        continue;
      }
      L = h.FileIndex[w], w === 0 && (L.start = L.size ? L.start - 1 : se);
      var te = w === 0 && v.root || L.name;
      if (P = 2 * (te.length + 1), E.write_shift(64, te, "utf16le"), E.write_shift(2, P), E.write_shift(1, L.type), E.write_shift(1, L.color), E.write_shift(-4, L.L), E.write_shift(-4, L.R), E.write_shift(-4, L.C), L.clsid) E.write_shift(16, L.clsid, "hex");
      else for (I = 0; I < 4; ++I) E.write_shift(4, 0);
      E.write_shift(4, L.state || 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, L.start), E.write_shift(4, L.size), E.write_shift(4, 0);
    }
    for (w = 1; w < h.FileIndex.length; ++w)
      if (L = h.FileIndex[w], L.size >= 4096)
        if (E.l = L.start + 1 << 9, Ee && Buffer.isBuffer(L.content))
          L.content.copy(E, E.l, 0, L.size), E.l += L.size + 511 & -512;
        else {
          for (I = 0; I < L.size; ++I) E.write_shift(1, L.content[I]);
          for (; I & 511; ++I) E.write_shift(1, 0);
        }
    for (w = 1; w < h.FileIndex.length; ++w)
      if (L = h.FileIndex[w], L.size > 0 && L.size < 4096)
        if (Ee && Buffer.isBuffer(L.content))
          L.content.copy(E, E.l, 0, L.size), E.l += L.size + 63 & -64;
        else {
          for (I = 0; I < L.size; ++I) E.write_shift(1, L.content[I]);
          for (; I & 63; ++I) E.write_shift(1, 0);
        }
    if (Ee)
      E.l = E.length;
    else
      for (; E.l < E.length; ) E.write_shift(1, 0);
    return E;
  }
  function K(h, T) {
    var v = h.FullPaths.map(function(I) {
      return I.toUpperCase();
    }), m = v.map(function(I) {
      var P = I.split("/");
      return P[P.length - (I.slice(-1) == "/" ? 2 : 1)];
    }), E = !1;
    T.charCodeAt(0) === 47 ? (E = !0, T = v[0].slice(0, -1) + T) : E = T.indexOf("/") !== -1;
    var w = T.toUpperCase(), R = E === !0 ? v.indexOf(w) : m.indexOf(w);
    if (R !== -1) return h.FileIndex[R];
    var W = !w.match(fn);
    for (w = w.replace(bt, ""), W && (w = w.replace(fn, "!")), R = 0; R < v.length; ++R)
      if ((W ? v[R].replace(fn, "!") : v[R]).replace(bt, "") == w || (W ? m[R].replace(fn, "!") : m[R]).replace(bt, "") == w) return h.FileIndex[R];
    return null;
  }
  var J = 64, se = -2, we = "d0cf11e0a1b11ae1", de = [208, 207, 17, 224, 161, 177, 26, 225], Ne = "00000000000000000000000000000000", De = {
    /* 2.1 Compund File Sector Numbers and Types */
    MAXREGSECT: -6,
    DIFSECT: -4,
    FATSECT: -3,
    ENDOFCHAIN: se,
    FREESECT: -1,
    /* 2.2 Compound File Header */
    HEADER_SIGNATURE: we,
    HEADER_MINOR_VERSION: "3e00",
    MAXREGSID: -6,
    NOSTREAM: -1,
    HEADER_CLSID: Ne,
    /* 2.6.1 Compound File Directory Entry */
    EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
  };
  function Be(h, T, v) {
    l();
    var m = b(h, v);
    o.writeFileSync(T, m);
  }
  function Ve(h) {
    for (var T = new Array(h.length), v = 0; v < h.length; ++v) T[v] = String.fromCharCode(h[v]);
    return T.join("");
  }
  function xr(h, T) {
    var v = b(h, T);
    switch (T && T.type || "buffer") {
      case "file":
        return l(), o.writeFileSync(T.filename, v), v;
      case "binary":
        return typeof v == "string" ? v : Ve(v);
      case "base64":
        return $t(typeof v == "string" ? v : Ve(v));
      case "buffer":
        if (Ee) return Buffer.isBuffer(v) ? v : Xr(v);
      case "array":
        return typeof v == "string" ? Dr(v) : v;
    }
    return v;
  }
  var lr;
  function S(h) {
    try {
      var T = h.InflateRaw, v = new T();
      if (v._processChunk(new Uint8Array([3, 0]), v._finishFlushFlag), v.bytesRead) lr = h;
      else throw new Error("zlib does not expose bytesRead");
    } catch (m) {
      console.error("cannot use native zlib: " + (m.message || m));
    }
  }
  function M(h, T) {
    if (!lr) return A0(h, T);
    var v = lr.InflateRaw, m = new v(), E = m._processChunk(h.slice(h.l), m._finishFlushFlag);
    return h.l += m.bytesRead, E;
  }
  function y(h) {
    return lr ? lr.deflateRawSync(h) : Y(h);
  }
  var A = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], H = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], ue = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
  function he(h) {
    var T = (h << 1 | h << 11) & 139536 | (h << 5 | h << 15) & 558144;
    return (T >> 16 | T >> 8 | T) & 255;
  }
  for (var ce = typeof Uint8Array < "u", ae = ce ? new Uint8Array(256) : [], Te = 0; Te < 256; ++Te) ae[Te] = he(Te);
  function me(h, T) {
    var v = ae[h & 255];
    return T <= 8 ? v >>> 8 - T : (v = v << 8 | ae[h >> 8 & 255], T <= 16 ? v >>> 16 - T : (v = v << 8 | ae[h >> 16 & 255], v >>> 24 - T));
  }
  function $e(h, T) {
    var v = T & 7, m = T >>> 3;
    return (h[m] | (v <= 6 ? 0 : h[m + 1] << 8)) >>> v & 3;
  }
  function X(h, T) {
    var v = T & 7, m = T >>> 3;
    return (h[m] | (v <= 5 ? 0 : h[m + 1] << 8)) >>> v & 7;
  }
  function O(h, T) {
    var v = T & 7, m = T >>> 3;
    return (h[m] | (v <= 4 ? 0 : h[m + 1] << 8)) >>> v & 15;
  }
  function ie(h, T) {
    var v = T & 7, m = T >>> 3;
    return (h[m] | (v <= 3 ? 0 : h[m + 1] << 8)) >>> v & 31;
  }
  function j(h, T) {
    var v = T & 7, m = T >>> 3;
    return (h[m] | (v <= 1 ? 0 : h[m + 1] << 8)) >>> v & 127;
  }
  function ge(h, T, v) {
    var m = T & 7, E = T >>> 3, w = (1 << v) - 1, R = h[E] >>> m;
    return v < 8 - m || (R |= h[E + 1] << 8 - m, v < 16 - m) || (R |= h[E + 2] << 16 - m, v < 24 - m) || (R |= h[E + 3] << 24 - m), R & w;
  }
  function xe(h, T, v) {
    var m = T & 7, E = T >>> 3;
    return m <= 5 ? h[E] |= (v & 7) << m : (h[E] |= v << m & 255, h[E + 1] = (v & 7) >> 8 - m), T + 3;
  }
  function Ye(h, T, v) {
    var m = T & 7, E = T >>> 3;
    return v = (v & 1) << m, h[E] |= v, T + 1;
  }
  function Se(h, T, v) {
    var m = T & 7, E = T >>> 3;
    return v <<= m, h[E] |= v & 255, v >>>= 8, h[E + 1] = v, T + 8;
  }
  function Br(h, T, v) {
    var m = T & 7, E = T >>> 3;
    return v <<= m, h[E] |= v & 255, v >>>= 8, h[E + 1] = v & 255, h[E + 2] = v >>> 8, T + 16;
  }
  function qe(h, T) {
    var v = h.length, m = 2 * v > T ? 2 * v : T + 5, E = 0;
    if (v >= T) return h;
    if (Ee) {
      var w = D0(m);
      if (h.copy) h.copy(w);
      else for (; E < h.length; ++E) w[E] = h[E];
      return w;
    } else if (ce) {
      var R = new Uint8Array(m);
      if (R.set) R.set(h);
      else for (; E < v; ++E) R[E] = h[E];
      return R;
    }
    return h.length = m, h;
  }
  function Re(h) {
    for (var T = new Array(h), v = 0; v < h; ++v) T[v] = 0;
    return T;
  }
  function qr(h, T, v) {
    var m = 1, E = 0, w = 0, R = 0, W = 0, I = h.length, P = ce ? new Uint16Array(32) : Re(32);
    for (w = 0; w < 32; ++w) P[w] = 0;
    for (w = I; w < v; ++w) h[w] = 0;
    I = h.length;
    var L = ce ? new Uint16Array(I) : Re(I);
    for (w = 0; w < I; ++w)
      P[E = h[w]]++, m < E && (m = E), L[w] = 0;
    for (P[0] = 0, w = 1; w <= m; ++w) P[w + 16] = W = W + P[w - 1] << 1;
    for (w = 0; w < I; ++w)
      W = h[w], W != 0 && (L[w] = P[W + 16]++);
    var Z = 0;
    for (w = 0; w < I; ++w)
      if (Z = h[w], Z != 0)
        for (W = me(L[w], m) >> m - Z, R = (1 << m + 4 - Z) - 1; R >= 0; --R)
          T[W | R << Z] = Z & 15 | w << 4;
    return m;
  }
  var ht = ce ? new Uint16Array(512) : Re(512), xt = ce ? new Uint16Array(32) : Re(32);
  if (!ce) {
    for (var Nr = 0; Nr < 512; ++Nr) ht[Nr] = 0;
    for (Nr = 0; Nr < 32; ++Nr) xt[Nr] = 0;
  }
  (function() {
    for (var h = [], T = 0; T < 32; T++) h.push(5);
    qr(h, xt, 32);
    var v = [];
    for (T = 0; T <= 143; T++) v.push(8);
    for (; T <= 255; T++) v.push(9);
    for (; T <= 279; T++) v.push(7);
    for (; T <= 287; T++) v.push(8);
    qr(v, ht, 288);
  })();
  var Ot = /* @__PURE__ */ function() {
    for (var T = ce ? new Uint8Array(32768) : [], v = 0, m = 0; v < ue.length - 1; ++v)
      for (; m < ue[v + 1]; ++m) T[m] = v;
    for (; m < 32768; ++m) T[m] = 29;
    var E = ce ? new Uint8Array(259) : [];
    for (v = 0, m = 0; v < H.length - 1; ++v)
      for (; m < H[v + 1]; ++m) E[m] = v;
    function w(W, I) {
      for (var P = 0; P < W.length; ) {
        var L = Math.min(65535, W.length - P), Z = P + L == W.length;
        for (I.write_shift(1, +Z), I.write_shift(2, L), I.write_shift(2, ~L & 65535); L-- > 0; ) I[I.l++] = W[P++];
      }
      return I.l;
    }
    function R(W, I) {
      for (var P = 0, L = 0, Z = ce ? new Uint16Array(32768) : []; L < W.length; ) {
        var te = (
          /* data.length - boff; */
          Math.min(65535, W.length - L)
        );
        if (te < 10) {
          for (P = xe(I, P, +(L + te == W.length)), P & 7 && (P += 8 - (P & 7)), I.l = P / 8 | 0, I.write_shift(2, te), I.write_shift(2, ~te & 65535); te-- > 0; ) I[I.l++] = W[L++];
          P = I.l * 8;
          continue;
        }
        P = xe(I, P, +(L + te == W.length) + 2);
        for (var oe = 0; te-- > 0; ) {
          var q = W[L];
          oe = (oe << 5 ^ q) & 32767;
          var le = -1, pe = 0;
          if ((le = Z[oe]) && (le |= L & -32768, le > L && (le -= 32768), le < L))
            for (; W[le + pe] == W[L + pe] && pe < 250; ) ++pe;
          if (pe > 2) {
            q = E[pe], q <= 22 ? P = Se(I, P, ae[q + 1] >> 1) - 1 : (Se(I, P, 3), P += 5, Se(I, P, ae[q - 23] >> 5), P += 3);
            var Pe = q < 8 ? 0 : q - 4 >> 2;
            Pe > 0 && (Br(I, P, pe - H[q]), P += Pe), q = T[L - le], P = Se(I, P, ae[q] >> 3), P -= 3;
            var Le = q < 4 ? 0 : q - 2 >> 1;
            Le > 0 && (Br(I, P, L - le - ue[q]), P += Le);
            for (var ir = 0; ir < pe; ++ir)
              Z[oe] = L & 32767, oe = (oe << 5 ^ W[L]) & 32767, ++L;
            te -= pe - 1;
          } else
            q <= 143 ? q = q + 48 : P = Ye(I, P, 1), P = Se(I, P, ae[q]), Z[oe] = L & 32767, ++L;
        }
        P = Se(I, P, 0) - 1;
      }
      return I.l = (P + 7) / 8 | 0, I.l;
    }
    return function(I, P) {
      return I.length < 8 ? w(I, P) : R(I, P);
    };
  }();
  function Y(h) {
    var T = U(50 + Math.floor(h.length * 1.1)), v = Ot(h, T);
    return T.slice(0, v);
  }
  var ze = ce ? new Uint16Array(32768) : Re(32768), Qr = ce ? new Uint16Array(32768) : Re(32768), E0 = ce ? new Uint16Array(128) : Re(128), w0 = 1, S0 = 1;
  function ji(h, T) {
    var v = ie(h, T) + 257;
    T += 5;
    var m = ie(h, T) + 1;
    T += 5;
    var E = O(h, T) + 4;
    T += 4;
    for (var w = 0, R = ce ? new Uint8Array(19) : Re(19), W = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], I = 1, P = ce ? new Uint8Array(8) : Re(8), L = ce ? new Uint8Array(8) : Re(8), Z = R.length, te = 0; te < E; ++te)
      R[A[te]] = w = X(h, T), I < w && (I = w), P[w]++, T += 3;
    var oe = 0;
    for (P[0] = 0, te = 1; te <= I; ++te) L[te] = oe = oe + P[te - 1] << 1;
    for (te = 0; te < Z; ++te) (oe = R[te]) != 0 && (W[te] = L[oe]++);
    var q = 0;
    for (te = 0; te < Z; ++te)
      if (q = R[te], q != 0) {
        oe = ae[W[te]] >> 8 - q;
        for (var le = (1 << 7 - q) - 1; le >= 0; --le) E0[oe | le << q] = q & 7 | te << 3;
      }
    var pe = [];
    for (I = 1; pe.length < v + m; )
      switch (oe = E0[j(h, T)], T += oe & 7, oe >>>= 3) {
        case 16:
          for (w = 3 + $e(h, T), T += 2, oe = pe[pe.length - 1]; w-- > 0; ) pe.push(oe);
          break;
        case 17:
          for (w = 3 + X(h, T), T += 3; w-- > 0; ) pe.push(0);
          break;
        case 18:
          for (w = 11 + j(h, T), T += 7; w-- > 0; ) pe.push(0);
          break;
        default:
          pe.push(oe), I < oe && (I = oe);
          break;
      }
    var Pe = pe.slice(0, v), Le = pe.slice(v);
    for (te = v; te < 286; ++te) Pe[te] = 0;
    for (te = m; te < 30; ++te) Le[te] = 0;
    return w0 = qr(Pe, ze, 286), S0 = qr(Le, Qr, 30), T;
  }
  function Ji(h, T) {
    if (h[0] == 3 && !(h[1] & 3))
      return [at(T), 2];
    for (var v = 0, m = 0, E = D0(T || 1 << 18), w = 0, R = E.length >>> 0, W = 0, I = 0; !(m & 1); ) {
      if (m = X(h, v), v += 3, m >>> 1)
        m >> 1 == 1 ? (W = 9, I = 5) : (v = ji(h, v), W = w0, I = S0);
      else {
        v & 7 && (v += 8 - (v & 7));
        var P = h[v >>> 3] | h[(v >>> 3) + 1] << 8;
        if (v += 32, P > 0)
          for (!T && R < w + P && (E = qe(E, w + P), R = E.length); P-- > 0; )
            E[w++] = h[v >>> 3], v += 8;
        continue;
      }
      for (; ; ) {
        !T && R < w + 32767 && (E = qe(E, w + 32767), R = E.length);
        var L = ge(h, v, W), Z = m >>> 1 == 1 ? ht[L] : ze[L];
        if (v += Z & 15, Z >>>= 4, !(Z >>> 8 & 255)) E[w++] = Z;
        else {
          if (Z == 256) break;
          Z -= 257;
          var te = Z < 8 ? 0 : Z - 4 >> 2;
          te > 5 && (te = 0);
          var oe = w + H[Z];
          te > 0 && (oe += ge(h, v, te), v += te), L = ge(h, v, I), Z = m >>> 1 == 1 ? xt[L] : Qr[L], v += Z & 15, Z >>>= 4;
          var q = Z < 4 ? 0 : Z - 2 >> 1, le = ue[Z];
          for (q > 0 && (le += ge(h, v, q), v += q), !T && R < oe && (E = qe(E, oe + 100), R = E.length); w < oe; )
            E[w] = E[w - le], ++w;
        }
      }
    }
    return T ? [E, v + 7 >>> 3] : [E.slice(0, w), v + 7 >>> 3];
  }
  function A0(h, T) {
    var v = h.slice(h.l || 0), m = Ji(v, T);
    return h.l += m[1], m[0];
  }
  function F0(h, T) {
    if (h)
      typeof console < "u" && console.error(T);
    else throw new Error(T);
  }
  function y0(h, T) {
    var v = (
      /*::(*/
      h
    );
    Er(v, 0);
    var m = [], E = [], w = {
      FileIndex: m,
      FullPaths: E
    };
    k(w, { root: T.root });
    for (var R = v.length - 4; (v[R] != 80 || v[R + 1] != 75 || v[R + 2] != 5 || v[R + 3] != 6) && R >= 0; ) --R;
    v.l = R + 4, v.l += 4;
    var W = v.read_shift(2);
    v.l += 6;
    var I = v.read_shift(4);
    for (v.l = I, R = 0; R < W; ++R) {
      v.l += 20;
      var P = v.read_shift(4), L = v.read_shift(4), Z = v.read_shift(2), te = v.read_shift(2), oe = v.read_shift(2);
      v.l += 8;
      var q = v.read_shift(4), le = f(
        /*::(*/
        v.slice(v.l + Z, v.l + Z + te)
        /*:: :any)*/
      );
      v.l += Z + te + oe;
      var pe = v.l;
      v.l = q + 4, Zi(v, P, L, w, le), v.l = pe;
    }
    return w;
  }
  function Zi(h, T, v, m, E) {
    h.l += 2;
    var w = h.read_shift(2), R = h.read_shift(2), W = s(h);
    if (w & 8257) throw new Error("Unsupported ZIP encryption");
    for (var I = h.read_shift(4), P = h.read_shift(4), L = h.read_shift(4), Z = h.read_shift(2), te = h.read_shift(2), oe = "", q = 0; q < Z; ++q) oe += String.fromCharCode(h[h.l++]);
    if (te) {
      var le = f(
        /*::(*/
        h.slice(h.l, h.l + te)
        /*:: :any)*/
      );
      (le[21589] || {}).mt && (W = le[21589].mt), ((E || {})[21589] || {}).mt && (W = E[21589].mt);
    }
    h.l += te;
    var pe = h.slice(h.l, h.l + P);
    switch (R) {
      case 8:
        pe = M(h, L);
        break;
      case 0:
        break;
      default:
        throw new Error("Unsupported ZIP Compression method " + R);
    }
    var Pe = !1;
    w & 8 && (I = h.read_shift(4), I == 134695760 && (I = h.read_shift(4), Pe = !0), P = h.read_shift(4), L = h.read_shift(4)), P != T && F0(Pe, "Bad compressed size: " + T + " != " + P), L != v && F0(Pe, "Bad uncompressed size: " + v + " != " + L), Bn(m, oe, pe, { unsafe: !0, mt: W });
  }
  function qi(h, T) {
    var v = T || {}, m = [], E = [], w = U(1), R = v.compression ? 8 : 0, W = 0, I = 0, P = 0, L = 0, Z = 0, te = h.FullPaths[0], oe = te, q = h.FileIndex[0], le = [], pe = 0;
    for (I = 1; I < h.FullPaths.length; ++I)
      if (oe = h.FullPaths[I].slice(te.length), q = h.FileIndex[I], !(!q.size || !q.content || oe == "Sh33tJ5")) {
        var Pe = L, Le = U(oe.length);
        for (P = 0; P < oe.length; ++P) Le.write_shift(1, oe.charCodeAt(P) & 127);
        Le = Le.slice(0, Le.l), le[Z] = $s.buf(
          /*::((*/
          q.content,
          0
        );
        var ir = q.content;
        R == 8 && (ir = y(ir)), w = U(30), w.write_shift(4, 67324752), w.write_shift(2, 20), w.write_shift(2, W), w.write_shift(2, R), q.mt ? i(w, q.mt) : w.write_shift(4, 0), w.write_shift(-4, le[Z]), w.write_shift(4, ir.length), w.write_shift(
          4,
          /*::(*/
          q.content.length
        ), w.write_shift(2, Le.length), w.write_shift(2, 0), L += w.length, m.push(w), L += Le.length, m.push(Le), L += ir.length, m.push(ir), w = U(46), w.write_shift(4, 33639248), w.write_shift(2, 0), w.write_shift(2, 20), w.write_shift(2, W), w.write_shift(2, R), w.write_shift(4, 0), w.write_shift(-4, le[Z]), w.write_shift(4, ir.length), w.write_shift(
          4,
          /*::(*/
          q.content.length
        ), w.write_shift(2, Le.length), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(4, 0), w.write_shift(4, Pe), pe += w.l, E.push(w), pe += Le.length, E.push(Le), ++Z;
      }
    return w = U(22), w.write_shift(4, 101010256), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(2, Z), w.write_shift(2, Z), w.write_shift(4, pe), w.write_shift(4, L), w.write_shift(2, 0), rr([rr(m), rr(E), w]);
  }
  var nn = {
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
    return m && nn[m[1]] || T && (m = (v = T).match(/[\.\\]([^\.\\])+$/), m && nn[m[1]]) ? nn[m[1]] : "application/octet-stream";
  }
  function es(h) {
    for (var T = $t(h), v = [], m = 0; m < T.length; m += 76) v.push(T.slice(m, m + 76));
    return v.join(`\r
`) + `\r
`;
  }
  function rs(h) {
    var T = h.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function(P) {
      var L = P.charCodeAt(0).toString(16).toUpperCase();
      return "=" + (L.length == 1 ? "0" + L : L);
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
      for (var R = 0; R < w.length; ) {
        var W = 76, I = w.slice(R, R + W);
        I.charAt(W - 1) == "=" ? W-- : I.charAt(W - 2) == "=" ? W -= 2 : I.charAt(W - 3) == "=" && (W -= 3), I = w.slice(R, R + W), R += W, R < w.length && (I += "="), v.push(I);
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
    return Dr(T.join(`\r
`));
  }
  function ns(h, T, v) {
    for (var m = "", E = "", w = "", R, W = 0; W < 10; ++W) {
      var I = T[W];
      if (!I || I.match(/^\s*$/)) break;
      var P = I.match(/^(.*?):\s*([^\s].*)$/);
      if (P) switch (P[1].toLowerCase()) {
        case "content-location":
          m = P[2].trim();
          break;
        case "content-type":
          w = P[2].trim();
          break;
        case "content-transfer-encoding":
          E = P[2].trim();
          break;
      }
    }
    switch (++W, E.toLowerCase()) {
      case "base64":
        R = Dr(Hr(T.slice(W).join("")));
        break;
      case "quoted-printable":
        R = ts(T.slice(W));
        break;
      default:
        throw new Error("Unsupported Content-Transfer-Encoding " + E);
    }
    var L = Bn(h, m.slice(v.length), R, { unsafe: !0 });
    w && (L.ctype = w);
  }
  function as(h, T) {
    if (Ve(h.slice(0, 13)).toLowerCase() != "mime-version:") throw new Error("Unsupported MAD header");
    var v = T && T.root || "", m = (Ee && Buffer.isBuffer(h) ? h.toString("binary") : Ve(h)).split(`\r
`), E = 0, w = "";
    for (E = 0; E < m.length; ++E)
      if (w = m[E], !!/^Content-Location:/i.test(w) && (w = w.slice(w.indexOf("file")), v || (v = w.slice(0, w.lastIndexOf("/") + 1)), w.slice(0, v.length) != v))
        for (; v.length > 0 && (v = v.slice(0, v.length - 1), v = v.slice(0, v.lastIndexOf("/") + 1), w.slice(0, v.length) != v); )
          ;
    var R = (m[1] || "").match(/boundary="(.*?)"/);
    if (!R) throw new Error("MAD cannot find boundary");
    var W = "--" + (R[1] || ""), I = [], P = [], L = {
      FileIndex: I,
      FullPaths: P
    };
    k(L);
    var Z, te = 0;
    for (E = 0; E < m.length; ++E) {
      var oe = m[E];
      oe !== W && oe !== W + "--" || (te++ && ns(L, m.slice(Z, E), v), Z = E);
    }
    return L;
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
    ], w = h.FullPaths[0], R = w, W = h.FileIndex[0], I = 1; I < h.FullPaths.length; ++I)
      if (R = h.FullPaths[I].slice(w.length), W = h.FileIndex[I], !(!W.size || !W.content || R == "Sh33tJ5")) {
        R = R.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function(pe) {
          return "_x" + pe.charCodeAt(0).toString(16) + "_";
        }).replace(/[\u0080-\uFFFF]/g, function(pe) {
          return "_u" + pe.charCodeAt(0).toString(16) + "_";
        });
        for (var P = W.content, L = Ee && Buffer.isBuffer(P) ? P.toString("binary") : Ve(P), Z = 0, te = Math.min(1024, L.length), oe = 0, q = 0; q <= te; ++q) (oe = L.charCodeAt(q)) >= 32 && oe < 128 && ++Z;
        var le = Z >= te * 4 / 5;
        E.push(m), E.push("Content-Location: " + (v.root || "file:///C:/SheetJS/") + R), E.push("Content-Transfer-Encoding: " + (le ? "quoted-printable" : "base64")), E.push("Content-Type: " + Qi(W, R)), E.push(""), E.push(le ? rs(L) : es(L));
      }
    return E.push(m + `--\r
`), E.join(`\r
`);
  }
  function ss(h) {
    var T = {};
    return k(T, h), T;
  }
  function Bn(h, T, v, m) {
    var E = m && m.unsafe;
    E || k(h);
    var w = !E && Oe.find(h, T);
    if (!w) {
      var R = h.FullPaths[0];
      T.slice(0, R.length) == R ? R = T : (R.slice(-1) != "/" && (R += "/"), R = (R + T).replace("//", "/")), w = { name: a(T), type: 2 }, h.FileIndex.push(w), h.FullPaths.push(R), E || Oe.utils.cfb_gc(h);
    }
    return w.content = v, w.size = v ? v.length : 0, m && (m.CLSID && (w.clsid = m.CLSID), m.mt && (w.mt = m.mt), m.ct && (w.ct = m.ct)), w;
  }
  function fs(h, T) {
    k(h);
    var v = Oe.find(h, T);
    if (v) {
      for (var m = 0; m < h.FileIndex.length; ++m) if (h.FileIndex[m] == v)
        return h.FileIndex.splice(m, 1), h.FullPaths.splice(m, 1), !0;
    }
    return !1;
  }
  function ls(h, T, v) {
    k(h);
    var m = Oe.find(h, T);
    if (m) {
      for (var E = 0; E < h.FileIndex.length; ++E) if (h.FileIndex[E] == m)
        return h.FileIndex[E].name = a(v), h.FullPaths[E] = v, !0;
    }
    return !1;
  }
  function os(h) {
    N(h, !0);
  }
  return t.find = K, t.read = ne, t.parse = c, t.write = xr, t.writeFile = Be, t.utils = {
    cfb_new: ss,
    cfb_add: Bn,
    cfb_del: fs,
    cfb_mov: ls,
    cfb_gc: os,
    ReadShift: Wt,
    CheckField: Ka,
    prep_blob: Er,
    bconcat: rr,
    use_zlib: S,
    _deflateRaw: Y,
    _inflateRaw: A0,
    consts: De
  }, t;
}();
function zs(e) {
  return typeof e == "string" ? kn(e) : Array.isArray(e) ? gs(e) : e;
}
function qt(e, t, r) {
  if (typeof Deno < "u") {
    if (r && typeof t == "string") switch (r) {
      case "utf8":
        t = new TextEncoder(r).encode(t);
        break;
      case "binary":
        t = kn(t);
        break;
      default:
        throw new Error("Unsupported encoding " + r);
    }
    return Deno.writeFileSync(e, t);
  }
  var n = r == "utf8" ? Kt(t) : t;
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
    return f.open("w"), f.encoding = "binary", Array.isArray(t) && (t = Zt(t)), f.write(t), f.close(), t;
  } catch (o) {
    if (!o.message || !o.message.match(/onstruct/)) throw o;
  }
  throw new Error("cannot save file " + e);
}
function ar(e) {
  for (var t = Object.keys(e), r = [], n = 0; n < t.length; ++n) Object.prototype.hasOwnProperty.call(e, t[n]) && r.push(t[n]);
  return r;
}
function b0(e, t) {
  for (var r = [], n = ar(e), a = 0; a !== n.length; ++a) r[e[n[a]][t]] == null && (r[e[n[a]][t]] = n[a]);
  return r;
}
function t0(e) {
  for (var t = [], r = ar(e), n = 0; n !== r.length; ++n) t[e[r[n]]] = r[n];
  return t;
}
function Rn(e) {
  for (var t = [], r = ar(e), n = 0; n !== r.length; ++n) t[e[r[n]]] = parseInt(r[n], 10);
  return t;
}
function Ks(e) {
  for (var t = [], r = ar(e), n = 0; n !== r.length; ++n)
    t[e[r[n]]] == null && (t[e[r[n]]] = []), t[e[r[n]]].push(r[n]);
  return t;
}
var _n = /* @__PURE__ */ new Date(1899, 11, 30, 0, 0, 0);
function mr(e, t) {
  var r = /* @__PURE__ */ e.getTime(), n = /* @__PURE__ */ _n.getTime() + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ _n.getTimezoneOffset()) * 6e4;
  return (r - n) / (24 * 60 * 60 * 1e3);
}
var Da = /* @__PURE__ */ new Date(), Ys = /* @__PURE__ */ _n.getTime() + (/* @__PURE__ */ Da.getTimezoneOffset() - /* @__PURE__ */ _n.getTimezoneOffset()) * 6e4, U0 = /* @__PURE__ */ Da.getTimezoneOffset();
function Ia(e) {
  var t = /* @__PURE__ */ new Date();
  return t.setTime(e * 24 * 60 * 60 * 1e3 + Ys), t.getTimezoneOffset() !== U0 && t.setTime(t.getTime() + (t.getTimezoneOffset() - U0) * 6e4), t;
}
var W0 = /* @__PURE__ */ new Date("2017-02-19T19:06:09.000Z"), Ra = /* @__PURE__ */ isNaN(/* @__PURE__ */ W0.getFullYear()) ? /* @__PURE__ */ new Date("2/19/17") : W0, js = /* @__PURE__ */ Ra.getFullYear() == 2017;
function hr(e, t) {
  var r = new Date(e);
  if (js)
    return t > 0 ? r.setTime(r.getTime() + r.getTimezoneOffset() * 60 * 1e3) : t < 0 && r.setTime(r.getTime() - r.getTimezoneOffset() * 60 * 1e3), r;
  if (e instanceof Date) return e;
  if (Ra.getFullYear() == 1917 && !isNaN(r.getFullYear())) {
    var n = r.getFullYear();
    return e.indexOf("" + n) > -1 || r.setFullYear(r.getFullYear() + 100), r;
  }
  var a = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"], i = new Date(+a[0], +a[1] - 1, +a[2], +a[3] || 0, +a[4] || 0, +a[5] || 0);
  return e.indexOf("Z") > -1 && (i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3)), i;
}
function Nn(e, t) {
  if (Ee && Buffer.isBuffer(e))
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
function gr(e) {
  if (typeof JSON < "u" && !Array.isArray(e)) return JSON.parse(JSON.stringify(e));
  if (typeof e != "object" || e == null) return e;
  if (e instanceof Date) return new Date(e.getTime());
  var t = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = gr(e[r]));
  return t;
}
function Ue(e, t) {
  for (var r = ""; r.length < t; ) r += e;
  return r;
}
function Wr(e) {
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
function zt(e) {
  var t = new Date(e), r = /* @__PURE__ */ new Date(NaN), n = t.getYear(), a = t.getMonth(), i = t.getDate();
  if (isNaN(i)) return r;
  var s = e.toLowerCase();
  if (s.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
    if (s = s.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, ""), s.length > 3 && Js.indexOf(s) == -1) return r;
  } else if (s.match(/[a-z]/)) return r;
  return n < 0 || n > 8099 ? r : (a > 0 || i > 1) && n != 101 ? t : e.match(/[^-0-9:,\/\\]/) ? r : t;
}
function ve(e, t, r) {
  if (e.FullPaths) {
    if (typeof r == "string") {
      var n;
      return Ee ? n = Xr(r) : n = _s(r), Oe.utils.cfb_add(e, t, n);
    }
    Oe.utils.cfb_add(e, t, r);
  } else e.file(t, r);
}
function n0() {
  return Oe.utils.cfb_new();
}
var Xe = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`, Zs = {
  "&quot;": '"',
  "&apos;": "'",
  "&gt;": ">",
  "&lt;": "<",
  "&amp;": "&"
}, a0 = /* @__PURE__ */ t0(Zs), i0 = /[&<>'"]/g, qs = /[\u0000-\u0008\u000b-\u001f]/g;
function ye(e) {
  var t = e + "";
  return t.replace(i0, function(r) {
    return a0[r];
  }).replace(qs, function(r) {
    return "_x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + "_";
  });
}
function V0(e) {
  return ye(e).replace(/ /g, "_x0020_");
}
var Na = /[\u0000-\u001f]/g;
function Qs(e) {
  var t = e + "";
  return t.replace(i0, function(r) {
    return a0[r];
  }).replace(/\n/g, "<br/>").replace(Na, function(r) {
    return "&#x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + ";";
  });
}
function ef(e) {
  var t = e + "";
  return t.replace(i0, function(r) {
    return a0[r];
  }).replace(Na, function(r) {
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
function Vn(e) {
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
function H0(e) {
  var t = at(2 * e.length), r, n, a = 1, i = 0, s = 0, f;
  for (n = 0; n < e.length; n += a)
    a = 1, (f = e.charCodeAt(n)) < 128 ? r = f : f < 224 ? (r = (f & 31) * 64 + (e.charCodeAt(n + 1) & 63), a = 2) : f < 240 ? (r = (f & 15) * 4096 + (e.charCodeAt(n + 1) & 63) * 64 + (e.charCodeAt(n + 2) & 63), a = 3) : (a = 4, r = (f & 7) * 262144 + (e.charCodeAt(n + 1) & 63) * 4096 + (e.charCodeAt(n + 2) & 63) * 64 + (e.charCodeAt(n + 3) & 63), r -= 65536, s = 55296 + (r >>> 10 & 1023), r = 56320 + (r & 1023)), s !== 0 && (t[i++] = s & 255, t[i++] = s >>> 8, s = 0), t[i++] = r % 256, t[i++] = r >>> 8;
  return t.slice(0, i).toString("ucs2");
}
function G0(e) {
  return Xr(e, "binary").toString("utf8");
}
var on = "foo bar bazâð£", Ut = Ee && (/* @__PURE__ */ G0(on) == /* @__PURE__ */ Vn(on) && G0 || /* @__PURE__ */ H0(on) == /* @__PURE__ */ Vn(on) && H0) || Vn, Kt = Ee ? function(e) {
  return Xr(e, "utf8").toString("binary");
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
}(), Pa = /(^\s|\s$|\n)/;
function tr(e, t) {
  return "<" + e + (t.match(Pa) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e + ">";
}
function Yt(e) {
  return ar(e).map(function(t) {
    return " " + t + '="' + e[t] + '"';
  }).join("");
}
function ee(e, t, r) {
  return "<" + e + (r != null ? Yt(r) : "") + (t != null ? (t.match(Pa) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e : "/") + ">";
}
function Jn(e, t) {
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
      var r = ee("vt:lpwstr", ye(e));
      return r = r.replace(/&quot;/g, "_x0022_"), r;
    case "number":
      return ee((e | 0) == e ? "vt:i4" : "vt:r8", ye(String(e)));
    case "boolean":
      return ee("vt:bool", e ? "true" : "false");
  }
  if (e instanceof Date) return ee("vt:filetime", Jn(e));
  throw new Error("Unable to serialize " + e);
}
var je = {
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
}, At = [
  "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  "http://purl.oclc.org/ooxml/spreadsheetml/main",
  "http://schemas.microsoft.com/office/excel/2006/main",
  "http://schemas.microsoft.com/office/excel/2006/2"
], wr = {
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
var X0 = function(e) {
  for (var t = [], r = 10240, n = 0; n < e[0].length; ++n) if (e[0][n]) for (var a = 0, i = e[0][n].length; a < i; a += r) t.push.apply(t, e[0][n].slice(a, a + r));
  return t;
}, $0 = Ee ? function(e) {
  return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0].map(function(t) {
    return Buffer.isBuffer(t) ? t : Xr(t);
  })) : X0(e);
} : X0, z0 = function(e, t, r) {
  for (var n = [], a = t; a < r; a += 2) n.push(String.fromCharCode(Bt(e, a)));
  return n.join("").replace(bt, "");
}, s0 = Ee ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("utf16le", t, r).replace(bt, "") : z0(e, t, r);
} : z0, K0 = function(e, t, r) {
  for (var n = [], a = t; a < t + r; ++a) n.push(("0" + e[a].toString(16)).slice(-2));
  return n.join("");
}, La = Ee ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("hex", t, t + r) : K0(e, t, r);
} : K0, Y0 = function(e, t, r) {
  for (var n = [], a = t; a < r; a++) n.push(String.fromCharCode(mt(e, a)));
  return n.join("");
}, Qt = Ee ? function(t, r, n) {
  return Buffer.isBuffer(t) ? t.toString("utf8", r, n) : Y0(t, r, n);
} : Y0, Ma = function(e, t) {
  var r = Sr(e, t);
  return r > 0 ? Qt(e, t + 4, t + 4 + r - 1) : "";
}, Ba = Ma, ba = function(e, t) {
  var r = Sr(e, t);
  return r > 0 ? Qt(e, t + 4, t + 4 + r - 1) : "";
}, Ua = ba, Wa = function(e, t) {
  var r = 2 * Sr(e, t);
  return r > 0 ? Qt(e, t + 4, t + 4 + r - 1) : "";
}, Va = Wa, Ha = function(t, r) {
  var n = Sr(t, r);
  return n > 0 ? s0(t, r + 4, r + 4 + n) : "";
}, Ga = Ha, Xa = function(e, t) {
  var r = Sr(e, t);
  return r > 0 ? Qt(e, t + 4, t + 4 + r) : "";
}, $a = Xa, za = function(e, t) {
  return sf(e, t);
}, Tn = za, f0 = function(t) {
  return Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
};
Ee && (Ba = function(t, r) {
  if (!Buffer.isBuffer(t)) return Ma(t, r);
  var n = t.readUInt32LE(r);
  return n > 0 ? t.toString("utf8", r + 4, r + 4 + n - 1) : "";
}, Ua = function(t, r) {
  if (!Buffer.isBuffer(t)) return ba(t, r);
  var n = t.readUInt32LE(r);
  return n > 0 ? t.toString("utf8", r + 4, r + 4 + n - 1) : "";
}, Va = function(t, r) {
  if (!Buffer.isBuffer(t)) return Wa(t, r);
  var n = 2 * t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + n - 1);
}, Ga = function(t, r) {
  if (!Buffer.isBuffer(t)) return Ha(t, r);
  var n = t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + n);
}, $a = function(t, r) {
  if (!Buffer.isBuffer(t)) return Xa(t, r);
  var n = t.readUInt32LE(r);
  return t.toString("utf8", r + 4, r + 4 + n);
}, Tn = function(t, r) {
  return Buffer.isBuffer(t) ? t.readDoubleLE(r) : za(t, r);
}, f0 = function(t) {
  return Buffer.isBuffer(t) || Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
});
var mt = function(e, t) {
  return e[t];
}, Bt = function(e, t) {
  return e[t + 1] * 256 + e[t];
}, lf = function(e, t) {
  var r = e[t + 1] * 256 + e[t];
  return r < 32768 ? r : (65535 - r + 1) * -1;
}, Sr = function(e, t) {
  return e[t + 3] * (1 << 24) + (e[t + 2] << 16) + (e[t + 1] << 8) + e[t];
}, tt = function(e, t) {
  return e[t + 3] << 24 | e[t + 2] << 16 | e[t + 1] << 8 | e[t];
}, of = function(e, t) {
  return e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3];
};
function Wt(e, t) {
  var r = "", n, a, i = [], s, f, o, l;
  switch (t) {
    case "dbcs":
      if (l = this.l, Ee && Buffer.isBuffer(this)) r = this.slice(this.l, this.l + 2 * e).toString("utf16le");
      else for (o = 0; o < e; ++o)
        r += String.fromCharCode(Bt(this, l)), l += 2;
      e *= 2;
      break;
    case "utf8":
      r = Qt(this, this.l, this.l + e);
      break;
    case "utf16le":
      e *= 2, r = s0(this, this.l, this.l + e);
      break;
    case "wstr":
      return Wt.call(this, e, "dbcs");
    case "lpstr-ansi":
      r = Ba(this, this.l), e = 4 + Sr(this, this.l);
      break;
    case "lpstr-cp":
      r = Ua(this, this.l), e = 4 + Sr(this, this.l);
      break;
    case "lpwstr":
      r = Va(this, this.l), e = 4 + 2 * Sr(this, this.l);
      break;
    case "lpp4":
      e = 4 + Sr(this, this.l), r = Ga(this, this.l), e & 2 && (e += 2);
      break;
    case "8lpp4":
      e = 4 + Sr(this, this.l), r = $a(this, this.l), e & 3 && (e += 4 - (e & 3));
      break;
    case "cstr":
      for (e = 0, r = ""; (s = mt(this, this.l + e++)) !== 0; ) i.push(sn(s));
      r = i.join("");
      break;
    case "_wstr":
      for (e = 0, r = ""; (s = Bt(this, this.l + e)) !== 0; )
        i.push(sn(s)), e += 2;
      e += 2, r = i.join("");
      break;
    case "dbcs-cont":
      for (r = "", l = this.l, o = 0; o < e; ++o) {
        if (this.lens && this.lens.indexOf(l) !== -1)
          return s = mt(this, l), this.l = l + 1, f = Wt.call(this, e - o, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(sn(Bt(this, l))), l += 2;
      }
      r = i.join(""), e *= 2;
      break;
    case "cpstr":
    case "sbcs-cont":
      for (r = "", l = this.l, o = 0; o != e; ++o) {
        if (this.lens && this.lens.indexOf(l) !== -1)
          return s = mt(this, l), this.l = l + 1, f = Wt.call(this, e - o, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(sn(mt(this, l))), l += 1;
      }
      r = i.join("");
      break;
    default:
      switch (e) {
        case 1:
          return n = mt(this, this.l), this.l++, n;
        case 2:
          return n = (t === "i" ? lf : Bt)(this, this.l), this.l += 2, n;
        case 4:
        case -4:
          return t === "i" || !(this[this.l + 3] & 128) ? (n = (e > 0 ? tt : of)(this, this.l), this.l += 4, n) : (a = Sr(this, this.l), this.l += 4, a);
        case 8:
        case -8:
          if (t === "f")
            return e == 8 ? a = Tn(this, this.l) : a = Tn([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0), this.l += 8, a;
          e = 8;
        case 16:
          r = La(this, this.l, e);
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
function Ka(e, t) {
  var r = La(this, this.l, e.length >> 1);
  if (r !== e) throw new Error(t + "Expected " + e + " saw " + r);
  this.l += e.length >> 1;
}
function Er(e, t) {
  e.l = t, e.read_shift = /*::(*/
  Wt, e.chk = Ka, e.write_shift = xf;
}
function Mr(e, t) {
  e.l += t;
}
function U(e) {
  var t = at(e);
  return Er(t, 0), t;
}
function vr() {
  var e = [], t = Ee ? 256 : 2048, r = function(l) {
    var c = U(l);
    return Er(c, 0), c;
  }, n = r(t), a = function() {
    n && (n.length > n.l && (n = n.slice(0, n.l), n.l = n.length), n.length > 0 && e.push(n), n = null);
  }, i = function(l) {
    return n && l < n.length - n.l ? n : (a(), n = r(Math.max(l + 1, t)));
  }, s = function() {
    return a(), rr(e);
  }, f = function(l) {
    a(), n = l, n.l == null && (n.l = n.length), i(t);
  };
  return { next: i, push: f, end: s, _bufs: e };
}
function G(e, t, r, n) {
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
    n > 0 && f0(r) && e.push(r);
  }
}
function Vt(e, t, r) {
  var n = gr(e);
  if (t.s ? (n.cRel && (n.c += t.s.c), n.rRel && (n.r += t.s.r)) : (n.cRel && (n.c += t.c), n.rRel && (n.r += t.r)), !r || r.biff < 12) {
    for (; n.c >= 256; ) n.c -= 256;
    for (; n.r >= 65536; ) n.r -= 65536;
  }
  return n;
}
function j0(e, t, r) {
  var n = gr(e);
  return n.s = Vt(n.s, t.s, r), n.e = Vt(n.e, t.s, r), n;
}
function Ht(e, t) {
  if (e.cRel && e.c < 0)
    for (e = gr(e); e.c < 0; ) e.c += t > 8 ? 16384 : 256;
  if (e.rRel && e.r < 0)
    for (e = gr(e); e.r < 0; ) e.r += t > 8 ? 1048576 : t > 5 ? 65536 : 16384;
  var r = Ce(e);
  return !e.cRel && e.cRel != null && (r = vf(r)), !e.rRel && e.rRel != null && (r = df(r)), r;
}
function Hn(e, t) {
  return e.s.r == 0 && !e.s.rRel && e.e.r == (t.biff >= 12 ? 1048575 : t.biff >= 8 ? 65536 : 16384) && !e.e.rRel ? (e.s.cRel ? "" : "$") + sr(e.s.c) + ":" + (e.e.cRel ? "" : "$") + sr(e.e.c) : e.s.c == 0 && !e.s.cRel && e.e.c == (t.biff >= 12 ? 16383 : 255) && !e.e.cRel ? (e.s.rRel ? "" : "$") + nr(e.s.r) + ":" + (e.e.rRel ? "" : "$") + nr(e.e.r) : Ht(e.s, t.biff) + ":" + Ht(e.e, t.biff);
}
function l0(e) {
  return parseInt(pf(e), 10) - 1;
}
function nr(e) {
  return "" + (e + 1);
}
function df(e) {
  return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2");
}
function pf(e) {
  return e.replace(/\$(\d+)$/, "$1");
}
function o0(e) {
  for (var t = mf(e), r = 0, n = 0; n !== t.length; ++n) r = 26 * r + t.charCodeAt(n) - 64;
  return r - 1;
}
function sr(e) {
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
function Je(e) {
  for (var t = 0, r = 0, n = 0; n < e.length; ++n) {
    var a = e.charCodeAt(n);
    a >= 48 && a <= 57 ? t = 10 * t + (a - 48) : a >= 65 && a <= 90 && (r = 26 * r + (a - 64));
  }
  return { c: r - 1, r: t - 1 };
}
function Ce(e) {
  for (var t = e.c + 1, r = ""; t; t = (t - 1) / 26 | 0) r = String.fromCharCode((t - 1) % 26 + 65) + r;
  return r + (e.r + 1);
}
function Ar(e) {
  var t = e.indexOf(":");
  return t == -1 ? { s: Je(e), e: Je(e) } : { s: Je(e.slice(0, t)), e: Je(e.slice(t + 1)) };
}
function Ge(e, t) {
  return typeof t > "u" || typeof t == "number" ? Ge(e.s, e.e) : (typeof e != "string" && (e = Ce(e)), typeof t != "string" && (t = Ce(t)), e == t ? e : e + ":" + t);
}
function Ie(e) {
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
function J0(e, t) {
  var r = e.t == "d" && t instanceof Date;
  if (e.z != null) try {
    return e.w = Yr(e.z, r ? mr(t) : t);
  } catch {
  }
  try {
    return e.w = Yr((e.XF || {}).numFmtId || (r ? 14 : 0), r ? mr(t) : t);
  } catch {
    return "" + t;
  }
}
function Gr(e, t, r) {
  return e == null || e.t == null || e.t == "z" ? "" : e.w !== void 0 ? e.w : (e.t == "d" && !e.z && r && r.dateNF && (e.z = r.dateNF), e.t == "e" ? en[e.v] || e.v : t == null ? J0(e, e.v) : J0(e, t));
}
function ft(e, t) {
  var r = t && t.sheet ? t.sheet : "Sheet1", n = {};
  return n[r] = e, { SheetNames: [r], Sheets: n };
}
function Ya(e, t, r) {
  var n = r || {}, a = e ? Array.isArray(e) : n.dense, i = e || (a ? [] : {}), s = 0, f = 0;
  if (i && n.origin != null) {
    if (typeof n.origin == "number") s = n.origin;
    else {
      var o = typeof n.origin == "string" ? Je(n.origin) : n.origin;
      s = o.r, f = o.c;
    }
    i["!ref"] || (i["!ref"] = "A1:A1");
  }
  var l = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } };
  if (i["!ref"]) {
    var c = Ie(i["!ref"]);
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
          else typeof p.v == "number" ? p.t = "n" : typeof p.v == "boolean" ? p.t = "b" : p.v instanceof Date ? (p.z = n.dateNF || We[14], n.cellDates ? (p.t = "d", p.w = Yr(p.z, mr(p.v))) : (p.t = "n", p.v = mr(p.v), p.w = Yr(p.z, p.v))) : p.t = "s";
          if (a)
            i[g] || (i[g] = []), i[g][u] && i[g][u].z && (p.z = i[g][u].z), i[g][u] = p;
          else {
            var _ = Ce({ c: u, r: g });
            i[_] && i[_].z && (p.z = i[_].z), i[_] = p;
          }
        }
    }
  return l.s.c < 1e7 && (i["!ref"] = Ge(l)), i;
}
function Ft(e, t) {
  return Ya(null, e, t);
}
function _f(e) {
  return e.read_shift(4, "i");
}
function Rr(e, t) {
  return t || (t = U(4)), t.write_shift(4, e), t;
}
function fr(e) {
  var t = e.read_shift(4);
  return t === 0 ? "" : e.read_shift(t, "dbcs");
}
function Ze(e, t) {
  var r = !1;
  return t == null && (r = !0, t = U(4 + 2 * e.length)), t.write_shift(4, e.length), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
function Tf(e) {
  return { ich: e.read_shift(2), ifnt: e.read_shift(2) };
}
function Ef(e, t) {
  return t || (t = U(4)), t.write_shift(2, 0), t.write_shift(2, 0), t;
}
function c0(e, t) {
  var r = e.l, n = e.read_shift(1), a = fr(e), i = [], s = { t: a, h: a };
  if (n & 1) {
    for (var f = e.read_shift(4), o = 0; o != f; ++o) i.push(Tf(e));
    s.r = i;
  } else s.r = [{ ich: 0, ifnt: 0 }];
  return e.l = r + t, s;
}
function wf(e, t) {
  var r = !1;
  return t == null && (r = !0, t = U(15 + 4 * e.t.length)), t.write_shift(1, 0), Ze(e.t, t), r ? t.slice(0, t.l) : t;
}
var Sf = c0;
function Af(e, t) {
  var r = !1;
  return t == null && (r = !0, t = U(23 + 4 * e.t.length)), t.write_shift(1, 1), Ze(e.t, t), t.write_shift(4, 1), Ef({}, t), r ? t.slice(0, t.l) : t;
}
function Cr(e) {
  var t = e.read_shift(4), r = e.read_shift(2);
  return r += e.read_shift(1) << 16, e.l++, { c: t, iStyleRef: r };
}
function lt(e, t) {
  return t == null && (t = U(8)), t.write_shift(-4, e.c), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
function ot(e) {
  var t = e.read_shift(2);
  return t += e.read_shift(1) << 16, e.l++, { c: -1, iStyleRef: t };
}
function ct(e, t) {
  return t == null && (t = U(4)), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
var Ff = fr, ja = Ze;
function u0(e) {
  var t = e.read_shift(4);
  return t === 0 || t === 4294967295 ? "" : e.read_shift(t, "dbcs");
}
function En(e, t) {
  var r = !1;
  return t == null && (r = !0, t = U(127)), t.write_shift(4, e.length > 0 ? e.length : 4294967295), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
var yf = fr, Zn = u0, h0 = En;
function Ja(e) {
  var t = e.slice(e.l, e.l + 4), r = t[0] & 1, n = t[0] & 2;
  e.l += 4;
  var a = n === 0 ? Tn([0, 0, 0, 0, t[0] & 252, t[1], t[2], t[3]], 0) : tt(t, 0) >> 2;
  return r ? a / 100 : a;
}
function Za(e, t) {
  t == null && (t = U(4));
  var r = 0, n = 0, a = e * 100;
  if (e == (e | 0) && e >= -536870912 && e < 1 << 29 ? n = 1 : a == (a | 0) && a >= -536870912 && a < 1 << 29 && (n = 1, r = 1), n) t.write_shift(-4, ((r ? a : e) << 2) + (r + 2));
  else throw new Error("unsupported RkNumber " + e);
}
function qa(e) {
  var t = { s: {}, e: {} };
  return t.s.r = e.read_shift(4), t.e.r = e.read_shift(4), t.s.c = e.read_shift(4), t.e.c = e.read_shift(4), t;
}
function Cf(e, t) {
  return t || (t = U(16)), t.write_shift(4, e.s.r), t.write_shift(4, e.e.r), t.write_shift(4, e.s.c), t.write_shift(4, e.e.c), t;
}
var ut = qa, yt = Cf;
function Ct(e) {
  if (e.length - e.l < 8) throw "XLS Xnum Buffer underflow";
  return e.read_shift(8, "f");
}
function it(e, t) {
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
      l && (t.rgb = fa(l));
      break;
    case 2:
      t.rgb = fa([s, f, o]);
      break;
    case 3:
      t.theme = a;
      break;
  }
  return i != 0 && (t.tint = i > 0 ? i / 32767 : i / 32768), t;
}
function wn(e, t) {
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
var Qa = 2, Tr = 3, cn = 11, Sn = 19, un = 64, If = 65, Rf = 71, Nf = 4108, Pf = 4126, er = 80, Z0 = {
  /*::[*/
  1: { n: "CodePage", t: Qa },
  /*::[*/
  2: { n: "Category", t: er },
  /*::[*/
  3: { n: "PresentationFormat", t: er },
  /*::[*/
  4: { n: "ByteCount", t: Tr },
  /*::[*/
  5: { n: "LineCount", t: Tr },
  /*::[*/
  6: { n: "ParagraphCount", t: Tr },
  /*::[*/
  7: { n: "SlideCount", t: Tr },
  /*::[*/
  8: { n: "NoteCount", t: Tr },
  /*::[*/
  9: { n: "HiddenCount", t: Tr },
  /*::[*/
  10: { n: "MultimediaClipCount", t: Tr },
  /*::[*/
  11: { n: "ScaleCrop", t: cn },
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
  14: { n: "Manager", t: er },
  /*::[*/
  15: { n: "Company", t: er },
  /*::[*/
  16: { n: "LinksUpToDate", t: cn },
  /*::[*/
  17: { n: "CharacterCount", t: Tr },
  /*::[*/
  19: { n: "SharedDoc", t: cn },
  /*::[*/
  22: { n: "HyperlinksChanged", t: cn },
  /*::[*/
  23: { n: "AppVersion", t: Tr, p: "version" },
  /*::[*/
  24: { n: "DigSig", t: If },
  /*::[*/
  26: { n: "ContentType", t: er },
  /*::[*/
  27: { n: "ContentStatus", t: er },
  /*::[*/
  28: { n: "Language", t: er },
  /*::[*/
  29: { n: "Version", t: er },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: Sn },
  /*::[*/
  2147483651: { n: "Behavior", t: Sn },
  /*::[*/
  1919054434: {}
}, q0 = {
  /*::[*/
  1: { n: "CodePage", t: Qa },
  /*::[*/
  2: { n: "Title", t: er },
  /*::[*/
  3: { n: "Subject", t: er },
  /*::[*/
  4: { n: "Author", t: er },
  /*::[*/
  5: { n: "Keywords", t: er },
  /*::[*/
  6: { n: "Comments", t: er },
  /*::[*/
  7: { n: "Template", t: er },
  /*::[*/
  8: { n: "LastAuthor", t: er },
  /*::[*/
  9: { n: "RevNumber", t: er },
  /*::[*/
  10: { n: "EditTime", t: un },
  /*::[*/
  11: { n: "LastPrinted", t: un },
  /*::[*/
  12: { n: "CreatedDate", t: un },
  /*::[*/
  13: { n: "ModifiedDate", t: un },
  /*::[*/
  14: { n: "PageCount", t: Tr },
  /*::[*/
  15: { n: "WordCount", t: Tr },
  /*::[*/
  16: { n: "CharCount", t: Tr },
  /*::[*/
  17: { n: "Thumbnail", t: Rf },
  /*::[*/
  18: { n: "Application", t: er },
  /*::[*/
  19: { n: "DocSecurity", t: Tr },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: Sn },
  /*::[*/
  2147483651: { n: "Behavior", t: Sn },
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
]), Bf = /* @__PURE__ */ gr(Mf), en = {
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
}, hn = {
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
function ei() {
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
function ri(e, t) {
  var r = Ks(bf), n = [], a;
  n[n.length] = Xe, n[n.length] = ee("Types", null, {
    xmlns: je.CT,
    "xmlns:xsd": je.xsd,
    "xmlns:xsi": je.xsi
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
    return ee("Default", null, { Extension: o[0], ContentType: o[1] });
  }));
  var i = function(o) {
    e[o] && e[o].length > 0 && (a = e[o][0], n[n.length] = ee("Override", null, {
      PartName: (a[0] == "/" ? "" : "/") + a,
      ContentType: hn[o][t.bookType] || hn[o].xlsx
    }));
  }, s = function(o) {
    (e[o] || []).forEach(function(l) {
      n[n.length] = ee("Override", null, {
        PartName: (l[0] == "/" ? "" : "/") + l,
        ContentType: hn[o][t.bookType] || hn[o].xlsx
      });
    });
  }, f = function(o) {
    (e[o] || []).forEach(function(l) {
      n[n.length] = ee("Override", null, {
        PartName: (l[0] == "/" ? "" : "/") + l,
        ContentType: r[o][0]
      });
    });
  };
  return i("workbooks"), s("sheets"), s("charts"), f("themes"), ["strs", "styles"].forEach(i), ["coreprops", "extprops", "custprops"].forEach(f), f("vba"), f("comments"), f("threadedcomments"), f("drawings"), s("metadata"), f("people"), n.length > 2 && (n[n.length] = "</Types>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var _e = {
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
function ti(e) {
  var t = e.lastIndexOf("/");
  return e.slice(0, t + 1) + "_rels/" + e.slice(t + 1) + ".rels";
}
function Tt(e) {
  var t = [Xe, ee("Relationships", null, {
    //'xmlns:ns0': XMLNS.RELS,
    xmlns: je.RELS
  })];
  return ar(e["!id"]).forEach(function(r) {
    t[t.length] = ee("Relationship", null, e["!id"][r]);
  }), t.length > 2 && (t[t.length] = "</Relationships>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function Fe(e, t, r, n, a, i) {
  if (a || (a = {}), e["!id"] || (e["!id"] = {}), e["!idx"] || (e["!idx"] = 1), t < 0) for (t = e["!idx"]; e["!id"]["rId" + t]; ++t)
    ;
  if (e["!idx"] = t + 1, a.Id = "rId" + t, a.Type = n, a.Target = r, [_e.HLINK, _e.XPATH, _e.XMISS].indexOf(a.Type) > -1 && (a.TargetMode = "External"), e["!id"][a.Id]) throw new Error("Cannot rewrite rId " + t);
  return e["!id"][a.Id] = a, e[("/" + a.Target).replace("//", "/")] = a, t;
}
function Uf(e) {
  var t = [Xe];
  t.push(`<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
`), t.push(`  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
`);
  for (var r = 0; r < e.length; ++r) t.push('  <manifest:file-entry manifest:full-path="' + e[r][0] + '" manifest:media-type="' + e[r][1] + `"/>
`);
  return t.push("</manifest:manifest>"), t.join("");
}
function Q0(e, t, r) {
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
  var t = [Xe];
  t.push(`<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
`);
  for (var r = 0; r != e.length; ++r)
    t.push(Q0(e[r][0], e[r][1])), t.push(Wf("", e[r][0]));
  return t.push(Q0("", "Document", "pkg")), t.push("</rdf:RDF>"), t.join("");
}
function ni() {
  return '<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS ' + dn.version + "</meta:generator></office:meta></office:document-meta>";
}
var nt = [
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
function Gn(e, t, r, n, a) {
  a[e] != null || t == null || t === "" || (a[e] = t, t = ye(t), n[n.length] = r ? ee(e, t, r) : tr(e, t));
}
function ai(e, t) {
  var r = t || {}, n = [Xe, ee("cp:coreProperties", null, {
    //'xmlns': XMLNS.CORE_PROPS,
    "xmlns:cp": je.CORE_PROPS,
    "xmlns:dc": je.dc,
    "xmlns:dcterms": je.dcterms,
    "xmlns:dcmitype": je.dcmitype,
    "xmlns:xsi": je.xsi
  })], a = {};
  if (!e && !r.Props) return n.join("");
  e && (e.CreatedDate != null && Gn("dcterms:created", typeof e.CreatedDate == "string" ? e.CreatedDate : Jn(e.CreatedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a), e.ModifiedDate != null && Gn("dcterms:modified", typeof e.ModifiedDate == "string" ? e.ModifiedDate : Jn(e.ModifiedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a));
  for (var i = 0; i != nt.length; ++i) {
    var s = nt[i], f = r.Props && r.Props[s[1]] != null ? r.Props[s[1]] : e ? e[s[1]] : null;
    f === !0 ? f = "1" : f === !1 ? f = "0" : typeof f == "number" && (f = String(f)), f != null && Gn(s[0], f, null, n, a);
  }
  return n.length > 2 && (n[n.length] = "</cp:coreProperties>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var Et = [
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
], ii = [
  "Worksheets",
  "SheetNames",
  "NamedRanges",
  "DefinedNames",
  "Chartsheets",
  "ChartNames"
];
function si(e) {
  var t = [], r = ee;
  return e || (e = {}), e.Application = "SheetJS", t[t.length] = Xe, t[t.length] = ee("Properties", null, {
    xmlns: je.EXT_PROPS,
    "xmlns:vt": je.vt
  }), Et.forEach(function(n) {
    if (e[n[1]] !== void 0) {
      var a;
      switch (n[2]) {
        case "string":
          a = ye(String(e[n[1]]));
          break;
        case "bool":
          a = e[n[1]] ? "true" : "false";
          break;
      }
      a !== void 0 && (t[t.length] = r(n[0], a));
    }
  }), t[t.length] = r("HeadingPairs", r("vt:vector", r("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + r("vt:variant", r("vt:i4", String(e.Worksheets))), { size: 2, baseType: "variant" })), t[t.length] = r("TitlesOfParts", r("vt:vector", e.SheetNames.map(function(n) {
    return "<vt:lpstr>" + ye(n) + "</vt:lpstr>";
  }).join(""), { size: e.Worksheets, baseType: "lpstr" })), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function fi(e) {
  var t = [Xe, ee("Properties", null, {
    xmlns: je.CUST_PROPS,
    "xmlns:vt": je.vt
  })];
  if (!e) return t.join("");
  var r = 1;
  return ar(e).forEach(function(a) {
    ++r, t[t.length] = ee("property", af(e[a]), {
      fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: r,
      name: ye(a)
    });
  }), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
var ea = {
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
  return ar(ea).map(function(n) {
    for (var a = 0; a < nt.length; ++a) if (nt[a][1] == n) return nt[a];
    for (a = 0; a < Et.length; ++a) if (Et[a][1] == n) return Et[a];
    throw n;
  }).forEach(function(n) {
    if (e[n[1]] != null) {
      var a = t && t.Props && t.Props[n[1]] != null ? t.Props[n[1]] : e[n[1]];
      switch (n[2]) {
        case "date":
          a = new Date(a).toISOString().replace(/\.\d*Z/, "Z");
          break;
      }
      typeof a == "number" ? a = String(a) : a === !0 || a === !1 ? a = a ? "1" : "0" : a instanceof Date && (a = new Date(a).toISOString().replace(/\.\d*Z/, "")), r.push(tr(ea[n[1]] || n[1], a));
    }
  }), ee("DocumentProperties", r.join(""), { xmlns: wr.o });
}
function Gf(e, t) {
  var r = ["Worksheets", "SheetNames"], n = "CustomDocumentProperties", a = [];
  return e && ar(e).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(e, i)) {
      for (var s = 0; s < nt.length; ++s) if (i == nt[s][1]) return;
      for (s = 0; s < Et.length; ++s) if (i == Et[s][1]) return;
      for (s = 0; s < r.length; ++s) if (i == r[s]) return;
      var f = e[i], o = "string";
      typeof f == "number" ? (o = "float", f = String(f)) : f === !0 || f === !1 ? (o = "boolean", f = f ? "1" : "0") : f = String(f), a.push(ee(V0(i), f, { "dt:dt": o }));
    }
  }), t && ar(t).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(t, i) && !(e && Object.prototype.hasOwnProperty.call(e, i))) {
      var s = t[i], f = "string";
      typeof s == "number" ? (f = "float", s = String(s)) : s === !0 || s === !1 ? (f = "boolean", s = s ? "1" : "0") : s instanceof Date ? (f = "dateTime.tz", s = s.toISOString()) : s = String(s), a.push(ee(V0(i), s, { "dt:dt": f }));
    }
  }), "<" + n + ' xmlns="' + wr.o + '">' + a.join("") + "</" + n + ">";
}
function Xf(e) {
  var t = typeof e == "string" ? new Date(Date.parse(e)) : e, r = t.getTime() / 1e3 + 11644473600, n = r % Math.pow(2, 32), a = (r - n) / Math.pow(2, 32);
  n *= 1e7, a *= 1e7;
  var i = n / Math.pow(2, 32) | 0;
  i > 0 && (n = n % Math.pow(2, 32), a += i);
  var s = U(8);
  return s.write_shift(4, n), s.write_shift(4, a), s;
}
function ra(e, t) {
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
  return rr([r, n]);
}
var li = ["CodePage", "Thumbnail", "_PID_LINKBASE", "_PID_HLINKS", "SystemIdentifier", "FMTID"];
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
function ta(e, t, r) {
  var n = U(8), a = [], i = [], s = 8, f = 0, o = U(8), l = U(8);
  if (o.write_shift(4, 2), o.write_shift(4, 1200), l.write_shift(4, 1), i.push(o), a.push(l), s += 8 + o.length, !t) {
    l = U(8), l.write_shift(4, 0), a.unshift(l);
    var c = [U(4)];
    for (c[0].write_shift(4, e.length), f = 0; f < e.length; ++f) {
      var d = e[f][0];
      for (o = U(8 + 2 * (d.length + 1) + (d.length % 2 ? 0 : 2)), o.write_shift(4, f + 2), o.write_shift(4, d.length + 1), o.write_shift(0, d, "dbcs"); o.l != o.length; ) o.write_shift(1, 0);
      c.push(o);
    }
    o = rr(c), i.unshift(o), s += 8 + o.length;
  }
  for (f = 0; f < e.length; ++f)
    if (!(t && !t[e[f][0]]) && !(li.indexOf(e[f][0]) > -1 || ii.indexOf(e[f][0]) > -1) && e[f][1] != null) {
      var x = e[f][1], p = 0;
      if (t) {
        p = +t[e[f][0]];
        var g = r[p];
        if (g.p == "version" && typeof x == "string") {
          var u = x.split(".");
          x = (+u[0] << 16) + (+u[1] || 0);
        }
        o = ra(g.t, x);
      } else {
        var _ = $f(x);
        _ == -1 && (_ = 31, x = String(x)), o = ra(_, x);
      }
      i.push(o), l = U(8), l.write_shift(4, t ? p : 2 + f), a.push(l), s += 8 + o.length;
    }
  var D = 8 * (i.length + 1);
  for (f = 0; f < i.length; ++f)
    a[f].write_shift(4, D), D += i[f].length;
  return n.write_shift(4, s), n.write_shift(4, i.length), rr([n].concat(a).concat(i));
}
function na(e, t, r, n, a, i) {
  var s = U(a ? 68 : 48), f = [s];
  s.write_shift(2, 65534), s.write_shift(2, 0), s.write_shift(4, 842412599), s.write_shift(16, Oe.utils.consts.HEADER_CLSID, "hex"), s.write_shift(4, a ? 2 : 1), s.write_shift(16, t, "hex"), s.write_shift(4, a ? 68 : 48);
  var o = ta(e, r, n);
  if (f.push(o), a) {
    var l = ta(a, null, null);
    s.write_shift(16, i, "hex"), s.write_shift(4, 68 + o.length), f.push(l);
  }
  return rr(f);
}
function zf(e, t) {
  t || (t = U(e));
  for (var r = 0; r < e; ++r) t.write_shift(1, 0);
  return t;
}
function Kf(e, t) {
  return e.read_shift(t) === 1;
}
function ur(e, t) {
  return t || (t = U(2)), t.write_shift(2, +!!e), t;
}
function oi(e) {
  return e.read_shift(2, "u");
}
function yr(e, t) {
  return t || (t = U(2)), t.write_shift(2, e), t;
}
function ci(e, t, r) {
  return r || (r = U(2)), r.write_shift(1, t == "e" ? +e : +!!e), r.write_shift(1, t == "e" ? 1 : 0), r;
}
function ui(e, t, r) {
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
  return rr(a);
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
function hi(e, t, r) {
  return r || (r = U(3 + 2 * e.length)), r.write_shift(2, e.length), r.write_shift(1, 1), r.write_shift(31, e, "utf16le"), r;
}
function aa(e, t) {
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
    n = n.slice(1), aa(n, t);
  else if (i & 2) {
    for (s = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), r = 0; r < s.length; ++r) t.write_shift(1, parseInt(s[r], 16));
    var f = a > -1 ? n.slice(0, a) : n;
    for (t.write_shift(4, 2 * (f.length + 1)), r = 0; r < f.length; ++r) t.write_shift(2, f.charCodeAt(r));
    t.write_shift(2, 0), i & 8 && aa(a > -1 ? n.slice(a + 1) : "", t);
  } else {
    for (s = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" "), r = 0; r < s.length; ++r) t.write_shift(1, parseInt(s[r], 16));
    for (var o = 0; n.slice(o * 3, o * 3 + 3) == "../" || n.slice(o * 3, o * 3 + 3) == "..\\"; ) ++o;
    for (t.write_shift(2, o), t.write_shift(4, n.length - 3 * o + 1), r = 0; r < n.length - 3 * o; ++r) t.write_shift(1, n.charCodeAt(r + 3 * o) & 255);
    for (t.write_shift(1, 0), t.write_shift(2, 65535), t.write_shift(2, 57005), r = 0; r < 6; ++r) t.write_shift(4, 0);
  }
  return t.slice(0, t.l);
}
function st(e, t, r, n) {
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
function xi(e, t) {
  return t || (t = U(8)), t.write_shift(2, e.s.r), t.write_shift(2, e.e.r), t.write_shift(2, e.s.c), t.write_shift(2, e.e.c), t;
}
function x0(e, t, r) {
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
  var i = rr([r].concat(n));
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
  return st(e, t, n, a), a.write_shift(4, r), a;
}
function ll(e, t, r, n, a) {
  var i = !a || a.biff == 8, s = U(8 + +i + (1 + i) * r.length);
  return st(e, t, n, s), s.write_shift(2, r.length), i && s.write_shift(1, 1), s.write_shift((1 + i) * r.length, r, i ? "utf16le" : "sbcs"), s;
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
function ia(e, t, r, n) {
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
  return st(e, t, n, s), ci(r, i, s), s;
}
function xl(e, t, r, n) {
  var a = U(14);
  return st(e, t, n, a), it(r, a), a;
}
function dl(e, t, r) {
  if (r.biff < 8) return pl(e, t, r);
  for (var n = [], a = e.l + t, i = e.read_shift(r.biff > 8 ? 4 : 2); i-- !== 0; ) n.push(Qf(e, r.biff > 8 ? 12 : 6, r));
  if (e.l != a) throw new Error("Bad ExternSheet: " + e.l + " != " + a);
  return n;
}
function pl(e, t, r) {
  e[e.l + 1] == 3 && e[e.l]++;
  var n = ui(e, t, r);
  return n.charCodeAt(0) == 3 ? n.slice(1) : n;
}
function vl(e) {
  var t = U(2 + e.length * 8);
  t.write_shift(2, e.length);
  for (var r = 0; r < e.length; ++r) xi(e[r], t);
  return t;
}
function ml(e) {
  var t = U(24), r = Je(e[0]);
  t.write_shift(2, r.r), t.write_shift(2, r.r), t.write_shift(2, r.c), t.write_shift(2, r.c);
  for (var n = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), a = 0; a < 16; ++a) t.write_shift(1, parseInt(n[a], 16));
  return rr([t, qf(e[1])]);
}
function gl(e) {
  var t = e[1].Tooltip, r = U(10 + 2 * (t.length + 1));
  r.write_shift(2, 2048);
  var n = Je(e[0]);
  r.write_shift(2, n.r), r.write_shift(2, n.r), r.write_shift(2, n.c), r.write_shift(2, n.c);
  for (var a = 0; a < t.length; ++a) r.write_shift(2, t.charCodeAt(a));
  return r.write_shift(2, 0), r;
}
function _l(e) {
  return e || (e = U(4)), e.write_shift(2, 1), e.write_shift(2, 1), e;
}
function Tl(e, t, r) {
  if (!r.cellStyles) return Mr(e, t);
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
  return tn(n, e, t), n.write_shift(8, r, "f"), n;
}
function Al(e, t, r) {
  var n = U(9);
  return tn(n, e, t), n.write_shift(2, r), n;
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
  }, t = t0({
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
    var l = [], c = at(1);
    switch (o.type) {
      case "base64":
        c = Dr(Hr(f));
        break;
      case "binary":
        c = Dr(f);
        break;
      case "buffer":
      case "array":
        c = f;
        break;
    }
    Er(c, 0);
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
    var D = c.read_shift(2), F = o.codepage || 1252;
    d != 2 && (c.l += 16, c.read_shift(1), c[c.l] !== 0 && (F = e[c[c.l]]), c.l += 1, c.l += 2), g && (c.l += 36);
    for (var C = [], B = {}, Q = Math.min(c.length, d == 2 ? 521 : _ - 10 - (p ? 264 : 0)), ne = g ? 32 : 11; c.l < Q && c[c.l] != 13; )
      switch (B = {}, B.name = pn.utils.decode(F, c.slice(c.l, c.l + ne)).replace(/[\u0000\r\n].*$/g, ""), c.l += ne, B.type = String.fromCharCode(c.read_shift(1)), d != 2 && !g && (B.offset = c.read_shift(4)), B.len = c.read_shift(1), d == 2 && (B.offset = c.read_shift(2)), B.dec = c.read_shift(1), B.name.length && C.push(B), d != 2 && (c.l += g ? 13 : 14), B.type) {
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
    var k = 0, V = 0;
    for (l[0] = [], V = 0; V != C.length; ++V) l[0][V] = C[V].name;
    for (; u-- > 0; ) {
      if (c[c.l] === 42) {
        c.l += D;
        continue;
      }
      for (++c.l, l[++k] = [], V = 0, V = 0; V != C.length; ++V) {
        var N = c.slice(c.l, c.l + C[V].len);
        c.l += C[V].len, Er(N, 0);
        var b = pn.utils.decode(F, N);
        switch (C[V].type) {
          case "C":
            b.trim().length && (l[k][V] = b.replace(/\s+$/, ""));
            break;
          case "D":
            b.length === 8 ? l[k][V] = new Date(+b.slice(0, 4), +b.slice(4, 6) - 1, +b.slice(6, 8)) : l[k][V] = b;
            break;
          case "F":
            l[k][V] = parseFloat(b.trim());
            break;
          case "+":
          case "I":
            l[k][V] = g ? N.read_shift(-4, "i") ^ 2147483648 : N.read_shift(4, "i");
            break;
          case "L":
            switch (b.trim().toUpperCase()) {
              case "Y":
              case "T":
                l[k][V] = !0;
                break;
              case "N":
              case "F":
                l[k][V] = !1;
                break;
              case "":
              case "?":
                break;
              default:
                throw new Error("DBF Unrecognized L:|" + b + "|");
            }
            break;
          case "M":
            if (!x) throw new Error("DBF Unexpected MEMO for type " + d.toString(16));
            l[k][V] = "##MEMO##" + (g ? parseInt(b.trim(), 10) : N.read_shift(4));
            break;
          case "N":
            b = b.replace(/\u0000/g, "").trim(), b && b != "." && (l[k][V] = +b || 0);
            break;
          case "@":
            l[k][V] = new Date(N.read_shift(-8, "f") - 621356832e5);
            break;
          case "T":
            l[k][V] = new Date((N.read_shift(4) - 2440588) * 864e5 + N.read_shift(4));
            break;
          case "Y":
            l[k][V] = N.read_shift(4, "i") / 1e4 + N.read_shift(4, "i") / 1e4 * Math.pow(2, 32);
            break;
          case "O":
            l[k][V] = -N.read_shift(-8, "f");
            break;
          case "B":
            if (p && C[V].len == 8) {
              l[k][V] = N.read_shift(8, "f");
              break;
            }
          case "G":
          case "P":
            N.l += C[V].len;
            break;
          case "0":
            if (C[V].name === "_NullFlags") break;
          default:
            throw new Error("DBF Unsupported data type " + C[V].type);
        }
      }
    }
    if (d != 2 && c.l < c.length && c[c.l++] != 26) throw new Error("DBF EOF Marker missing " + (c.l - 1) + " of " + c.length + " " + c[c.l - 1].toString(16));
    return o && o.sheetRows && (l = l.slice(0, o.sheetRows)), o.DBF = C, l;
  }
  function n(f, o) {
    var l = o || {};
    l.dateNF || (l.dateNF = "yyyymmdd");
    var c = Ft(r(f, l), l);
    return c["!cols"] = l.DBF.map(function(d) {
      return {
        wch: d.len,
        DBF: d
      };
    }), delete l.DBF, c;
  }
  function a(f, o) {
    try {
      return ft(n(f, o), o);
    } catch (l) {
      if (o && o.WTF) throw l;
    }
    return { SheetNames: [], Sheets: {} };
  }
  var i = { B: 8, C: 250, L: 1, D: 8, "?": 0, "": 0 };
  function s(f, o) {
    var l = o || {};
    if (+l.codepage >= 0 && Xt(+l.codepage), l.type == "string") throw new Error("Cannot write DBF to JS string");
    var c = vr(), d = On(f, { header: 1, raw: !0, cellDates: !0 }), x = d[0], p = d.slice(1), g = f["!cols"] || [], u = 0, _ = 0, D = 0, F = 1;
    for (u = 0; u < x.length; ++u) {
      if (((g[u] || {}).DBF || {}).name) {
        x[u] = g[u].DBF.name, ++D;
        continue;
      }
      if (x[u] != null) {
        if (++D, typeof x[u] == "number" && (x[u] = x[u].toString(10)), typeof x[u] != "string") throw new Error("DBF Invalid column name " + x[u] + " |" + typeof x[u] + "|");
        if (x.indexOf(x[u]) !== u) {
          for (_ = 0; _ < 1024; ++_)
            if (x.indexOf(x[u] + "_" + _) == -1) {
              x[u] += "_" + _;
              break;
            }
        }
      }
    }
    var C = Ie(f["!ref"]), B = [], Q = [], ne = [];
    for (u = 0; u <= C.e.c - C.s.c; ++u) {
      var k = "", V = "", N = 0, b = [];
      for (_ = 0; _ < p.length; ++_)
        p[_][u] != null && b.push(p[_][u]);
      if (b.length == 0 || x[u] == null) {
        B[u] = "?";
        continue;
      }
      for (_ = 0; _ < b.length; ++_) {
        switch (typeof b[_]) {
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
            V = b[_] instanceof Date ? "D" : "C";
            break;
          default:
            V = "C";
        }
        N = Math.max(N, String(b[_]).length), k = k && k != V ? "C" : V;
      }
      N > 250 && (N = 250), V = ((g[u] || {}).DBF || {}).type, V == "C" && g[u].DBF.len > N && (N = g[u].DBF.len), k == "B" && V == "N" && (k = "N", ne[u] = g[u].DBF.dec, N = g[u].DBF.len), Q[u] = k == "C" || V == "N" ? N : i[k] || 0, F += Q[u], B[u] = k;
    }
    var K = c.next(32);
    for (K.write_shift(4, 318902576), K.write_shift(4, p.length), K.write_shift(2, 296 + 32 * D), K.write_shift(2, F), u = 0; u < 4; ++u) K.write_shift(4, 0);
    for (K.write_shift(4, 0 | (+t[
      /*::String(*/
      pa
      /*::)*/
    ] || 3) << 8), u = 0, _ = 0; u < x.length; ++u)
      if (x[u] != null) {
        var J = c.next(32), se = (x[u].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
        J.write_shift(1, se, "sbcs"), J.write_shift(1, B[u] == "?" ? "C" : B[u], "sbcs"), J.write_shift(4, _), J.write_shift(1, Q[u] || i[B[u]] || 0), J.write_shift(1, ne[u] || 0), J.write_shift(1, 2), J.write_shift(4, 0), J.write_shift(1, 0), J.write_shift(4, 0), J.write_shift(4, 0), _ += Q[u] || i[B[u]] || 0;
      }
    var we = c.next(264);
    for (we.write_shift(4, 13), u = 0; u < 65; ++u) we.write_shift(4, 0);
    for (u = 0; u < p.length; ++u) {
      var de = c.next(F);
      for (de.write_shift(1, 0), _ = 0; _ < x.length; ++_)
        if (x[_] != null)
          switch (B[_]) {
            case "L":
              de.write_shift(1, p[u][_] == null ? 63 : p[u][_] ? 84 : 70);
              break;
            case "B":
              de.write_shift(8, p[u][_] || 0, "f");
              break;
            case "N":
              var Ne = "0";
              for (typeof p[u][_] == "number" && (Ne = p[u][_].toFixed(ne[_] || 0)), D = 0; D < Q[_] - Ne.length; ++D) de.write_shift(1, 32);
              de.write_shift(1, Ne, "sbcs");
              break;
            case "D":
              p[u][_] ? (de.write_shift(4, ("0000" + p[u][_].getFullYear()).slice(-4), "sbcs"), de.write_shift(2, ("00" + (p[u][_].getMonth() + 1)).slice(-2), "sbcs"), de.write_shift(2, ("00" + p[u][_].getDate()).slice(-2), "sbcs")) : de.write_shift(8, "00000000", "sbcs");
              break;
            case "C":
              var De = String(p[u][_] != null ? p[u][_] : "").slice(0, Q[_]);
              for (de.write_shift(1, De, "sbcs"), D = 0; D < Q[_] - De.length; ++D) de.write_shift(1, 32);
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
  }, t = new RegExp("\x1BN(" + ar(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm"), r = function(x, p) {
    var g = e[p];
    return typeof g == "number" ? k0(g) : g;
  }, n = function(x, p, g) {
    var u = p.charCodeAt(0) - 32 << 4 | g.charCodeAt(0) - 48;
    return u == 59 ? x : k0(u);
  };
  e["|"] = 254;
  function a(x, p) {
    switch (p.type) {
      case "base64":
        return i(Hr(x), p);
      case "binary":
        return i(x, p);
      case "buffer":
        return i(Ee && Buffer.isBuffer(x) ? x.toString("binary") : Zt(x), p);
      case "array":
        return i(Nn(x), p);
    }
    throw new Error("Unrecognized type " + p.type);
  }
  function i(x, p) {
    var g = x.split(/[\n\r]+/), u = -1, _ = -1, D = 0, F = 0, C = [], B = [], Q = null, ne = {}, k = [], V = [], N = [], b = 0, K;
    for (+p.codepage >= 0 && Xt(+p.codepage); D !== g.length; ++D) {
      b = 0;
      var J = g[D].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, n).replace(t, r), se = J.replace(/;;/g, "\0").split(";").map(function(A) {
        return A.replace(/\u0000/g, ";");
      }), we = se[0], de;
      if (J.length > 0) switch (we) {
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
          se[1].charAt(0) == "P" && B.push(J.slice(3).replace(/;;/g, ";"));
          break;
        case "C":
          var Ne = !1, De = !1, Be = !1, Ve = !1, xr = -1, lr = -1;
          for (F = 1; F < se.length; ++F) switch (se[F].charAt(0)) {
            case "A":
              break;
            case "X":
              _ = parseInt(se[F].slice(1)) - 1, De = !0;
              break;
            case "Y":
              for (u = parseInt(se[F].slice(1)) - 1, De || (_ = 0), K = C.length; K <= u; ++K) C[K] = [];
              break;
            case "K":
              de = se[F].slice(1), de.charAt(0) === '"' ? de = de.slice(1, de.length - 1) : de === "TRUE" ? de = !0 : de === "FALSE" ? de = !1 : isNaN(Wr(de)) ? isNaN(zt(de).getDate()) || (de = hr(de)) : (de = Wr(de), Q !== null && Ca(Q) && (de = Ia(de))), Ne = !0;
              break;
            case "E":
              Ve = !0;
              var S = Fo(se[F].slice(1), { r: u, c: _ });
              C[u][_] = [C[u][_], S];
              break;
            case "S":
              Be = !0, C[u][_] = [C[u][_], "S5S"];
              break;
            case "G":
              break;
            case "R":
              xr = parseInt(se[F].slice(1)) - 1;
              break;
            case "C":
              lr = parseInt(se[F].slice(1)) - 1;
              break;
            default:
              if (p && p.WTF) throw new Error("SYLK bad record " + J);
          }
          if (Ne && (C[u][_] && C[u][_].length == 2 ? C[u][_][0] = de : C[u][_] = de, Q = null), Be) {
            if (Ve) throw new Error("SYLK shared formula cannot have own formula");
            var M = xr > -1 && C[xr][lr];
            if (!M || !M[1]) throw new Error("SYLK shared formula cannot find base");
            C[u][_][1] = yo(M[1], { r: u - xr, c: _ - lr });
          }
          break;
        case "F":
          var y = 0;
          for (F = 1; F < se.length; ++F) switch (se[F].charAt(0)) {
            case "X":
              _ = parseInt(se[F].slice(1)) - 1, ++y;
              break;
            case "Y":
              for (u = parseInt(se[F].slice(1)) - 1, K = C.length; K <= u; ++K) C[K] = [];
              break;
            case "M":
              b = parseInt(se[F].slice(1)) / 20;
              break;
            case "F":
              break;
            case "G":
              break;
            case "P":
              Q = B[parseInt(se[F].slice(1))];
              break;
            case "S":
              break;
            case "D":
              break;
            case "N":
              break;
            case "W":
              for (N = se[F].slice(1).split(" "), K = parseInt(N[0], 10); K <= parseInt(N[1], 10); ++K)
                b = parseInt(N[2], 10), V[K - 1] = b === 0 ? { hidden: !0 } : { wch: b }, d0(V[K - 1]);
              break;
            case "C":
              _ = parseInt(se[F].slice(1)) - 1, V[_] || (V[_] = {});
              break;
            case "R":
              u = parseInt(se[F].slice(1)) - 1, k[u] || (k[u] = {}), b > 0 ? (k[u].hpt = b, k[u].hpx = gi(b)) : b === 0 && (k[u].hidden = !0);
              break;
            default:
              if (p && p.WTF) throw new Error("SYLK bad record " + J);
          }
          y < 1 && (Q = null);
          break;
        default:
          if (p && p.WTF) throw new Error("SYLK bad record " + J);
      }
    }
    return k.length > 0 && (ne["!rows"] = k), V.length > 0 && (ne["!cols"] = V), p && p.sheetRows && (C = C.slice(0, p.sheetRows)), [C, ne];
  }
  function s(x, p) {
    var g = a(x, p), u = g[0], _ = g[1], D = Ft(u, p);
    return ar(_).forEach(function(F) {
      D[F] = _[F];
    }), D;
  }
  function f(x, p) {
    return ft(s(x, p), p);
  }
  function o(x, p, g, u) {
    var _ = "C;Y" + (g + 1) + ";X" + (u + 1) + ";K";
    switch (x.t) {
      case "n":
        _ += x.v || 0, x.f && !x.F && (_ += ";E" + v0(x.f, { r: g, c: u }));
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
      g.hidden ? _ += "0" : (typeof g.width == "number" && !g.wpx && (g.wpx = An(g.width)), typeof g.wpx == "number" && !g.wch && (g.wch = Fn(g.wpx)), typeof g.wch == "number" && (_ += Math.round(g.wch))), _.charAt(_.length - 1) != " " && x.push(_);
    });
  }
  function c(x, p) {
    p.forEach(function(g, u) {
      var _ = "F;";
      g.hidden ? _ += "M0;" : g.hpt ? _ += "M" + 20 * g.hpt + ";" : g.hpx && (_ += "M" + 20 * yn(g.hpx) + ";"), _.length > 2 && x.push(_ + "R" + (u + 1));
    });
  }
  function d(x, p) {
    var g = ["ID;PWXL;N;E"], u = [], _ = Ie(x["!ref"]), D, F = Array.isArray(x), C = `\r
`;
    g.push("P;PGeneral"), g.push("F;P0;DG0G8;M255"), x["!cols"] && l(g, x["!cols"]), x["!rows"] && c(g, x["!rows"]), g.push("B;Y" + (_.e.r - _.s.r + 1) + ";X" + (_.e.c - _.s.c + 1) + ";D" + [_.s.c, _.s.r, _.e.c, _.e.r].join(" "));
    for (var B = _.s.r; B <= _.e.r; ++B)
      for (var Q = _.s.c; Q <= _.e.c; ++Q) {
        var ne = Ce({ r: B, c: Q });
        D = F ? (x[B] || [])[Q] : x[ne], !(!D || D.v == null && (!D.f || D.F)) && u.push(o(D, x, B, Q));
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
        return t(Hr(i), s);
      case "binary":
        return t(i, s);
      case "buffer":
        return t(Ee && Buffer.isBuffer(i) ? i.toString("binary") : Zt(i), s);
      case "array":
        return t(Nn(i), s);
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
            u === "TRUE" ? d[o][l] = !0 : u === "FALSE" ? d[o][l] = !1 : isNaN(Wr(g)) ? isNaN(zt(g).getDate()) ? d[o][l] = g : d[o][l] = hr(g) : d[o][l] = Wr(g), ++l;
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
    return Ft(e(i, s), s);
  }
  function n(i, s) {
    return ft(r(i, s), s);
  }
  var a = /* @__PURE__ */ function() {
    var i = function(o, l, c, d, x) {
      o.push(l), o.push(c + "," + d), o.push('"' + x.replace(/"/g, '""') + '"');
    }, s = function(o, l, c, d) {
      o.push(l + "," + c), o.push(l == 1 ? '"' + d.replace(/"/g, '""') + '"' : d);
    };
    return function(o) {
      var l = [], c = Ie(o["!ref"]), d, x = Array.isArray(o);
      i(l, "TABLE", 0, 1, "sheetjs"), i(l, "VECTORS", 0, c.e.r - c.s.r + 1, ""), i(l, "TUPLES", 0, c.e.c - c.s.c + 1, ""), i(l, "DATA", 0, 0, "");
      for (var p = c.s.r; p <= c.e.r; ++p) {
        s(l, -1, 0, "BOT");
        for (var g = c.s.c; g <= c.e.c; ++g) {
          var u = Ce({ r: p, c: g });
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
              d.w || (d.w = Yr(d.z || We[14], mr(hr(d.v)))), s(l, 0, d.w, "V");
              break;
            default:
              s(l, 1, 0, "");
          }
        }
      }
      s(l, -1, 0, "EOD");
      var D = `\r
`, F = l.join(D);
      return F;
    };
  }();
  return {
    to_workbook: n,
    to_sheet: r,
    from_sheet: a
  };
}(), di = /* @__PURE__ */ function() {
  function e(d) {
    return d.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, `
`);
  }
  function t(d) {
    return d.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n");
  }
  function r(d, x) {
    for (var p = d.split(`
`), g = -1, u = -1, _ = 0, D = []; _ !== p.length; ++_) {
      var F = p[_].trim().split(":");
      if (F[0] === "cell") {
        var C = Je(F[1]);
        if (D.length <= C.r) for (g = D.length; g <= C.r; ++g) D[g] || (D[g] = []);
        switch (g = C.r, u = C.c, F[2]) {
          case "t":
            D[g][u] = e(F[3]);
            break;
          case "v":
            D[g][u] = +F[3];
            break;
          case "vtf":
            var B = F[F.length - 1];
          case "vtc":
            switch (F[3]) {
              case "nl":
                D[g][u] = !!+F[4];
                break;
              default:
                D[g][u] = +F[4];
                break;
            }
            F[2] == "vtf" && (D[g][u] = [D[g][u], B]);
        }
      }
    }
    return x && x.sheetRows && (D = D.slice(0, x.sheetRows)), D;
  }
  function n(d, x) {
    return Ft(r(d, x), x);
  }
  function a(d, x) {
    return ft(n(d, x), x);
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
    for (var x = [], p = [], g, u = "", _ = Ar(d["!ref"]), D = Array.isArray(d), F = _.s.r; F <= _.e.r; ++F)
      for (var C = _.s.c; C <= _.e.c; ++C)
        if (u = Ce({ r: F, c: C }), g = D ? (d[F] || [])[C] : d[u], !(!g || g.v == null || g.t === "z")) {
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
              var B = mr(hr(g.v));
              p[2] = "vtc", p[3] = "nd", p[4] = "" + B, p[5] = g.w || Yr(g.z || We[14], B);
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
    g.raw ? d[x][p] = c : c === "" || (c === "TRUE" ? d[x][p] = !0 : c === "FALSE" ? d[x][p] = !1 : isNaN(Wr(c)) ? isNaN(zt(c).getDate()) ? d[x][p] = c : d[x][p] = hr(c) : d[x][p] = Wr(c));
  }
  function t(c, d) {
    var x = d || {}, p = [];
    if (!c || c.length === 0) return p;
    for (var g = c.split(/[\r\n]/), u = g.length - 1; u >= 0 && g[u].length === 0; ) --u;
    for (var _ = 10, D = 0, F = 0; F <= u; ++F)
      D = g[F].indexOf(" "), D == -1 ? D = g[F].length : D++, _ = Math.max(_, D);
    for (F = 0; F <= u; ++F) {
      p[F] = [];
      var C = 0;
      for (e(g[F].slice(0, _).trim(), p, F, C, x), C = 1; C <= (g[F].length - _) / 10 + 1; ++C)
        e(g[F].slice(_ + (C - 1) * 10, _ + C * 10).trim(), p, F, C, x);
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
    var _ = 0, D = 0, F = 0, C = 0, B = 0, Q = p.charCodeAt(0), ne = !1, k = 0, V = c.charCodeAt(0);
    c = c.replace(/\r\n/mg, `
`);
    var N = x.dateNF != null ? Gs(x.dateNF) : null;
    function b() {
      var K = c.slice(C, B), J = {};
      if (K.charAt(0) == '"' && K.charAt(K.length - 1) == '"' && (K = K.slice(1, -1).replace(/""/g, '"')), K.length === 0) J.t = "z";
      else if (x.raw)
        J.t = "s", J.v = K;
      else if (K.trim().length === 0)
        J.t = "s", J.v = K;
      else if (K.charCodeAt(0) == 61)
        K.charCodeAt(1) == 34 && K.charCodeAt(K.length - 1) == 34 ? (J.t = "s", J.v = K.slice(2, -1).replace(/""/g, '"')) : Co(K) ? (J.t = "n", J.f = K.slice(1)) : (J.t = "s", J.v = K);
      else if (K == "TRUE")
        J.t = "b", J.v = !0;
      else if (K == "FALSE")
        J.t = "b", J.v = !1;
      else if (!isNaN(F = Wr(K)))
        J.t = "n", x.cellText !== !1 && (J.w = K), J.v = F;
      else if (!isNaN(zt(K).getDate()) || N && K.match(N)) {
        J.z = x.dateNF || We[14];
        var se = 0;
        N && K.match(N) && (K = Xs(K, x.dateNF, K.match(N) || []), se = 1), x.cellDates ? (J.t = "d", J.v = hr(K, se)) : (J.t = "n", J.v = mr(hr(K, se))), x.cellText !== !1 && (J.w = Yr(J.z, J.v instanceof Date ? mr(J.v) : J.v)), x.cellNF || delete J.z;
      } else
        J.t = "s", J.v = K;
      if (J.t == "z" || (x.dense ? (g[_] || (g[_] = []), g[_][D] = J) : g[Ce({ c: D, r: _ })] = J), C = B + 1, V = c.charCodeAt(C), u.e.c < D && (u.e.c = D), u.e.r < _ && (u.e.r = _), k == Q) ++D;
      else if (D = 0, ++_, x.sheetRows && x.sheetRows <= _) return !0;
    }
    e: for (; B < c.length; ++B) switch (k = c.charCodeAt(B)) {
      case 34:
        V === 34 && (ne = !ne);
        break;
      case Q:
      case 10:
      case 13:
        if (!ne && b()) break e;
        break;
    }
    return B - C > 0 && b(), g["!ref"] = Ge(u), g;
  }
  function s(c, d) {
    return !(d && d.PRN) || d.FS || c.slice(0, 4) == "sep=" || c.indexOf("	") >= 0 || c.indexOf(",") >= 0 || c.indexOf(";") >= 0 ? i(c, d) : Ft(t(c, d), d);
  }
  function f(c, d) {
    var x = "", p = d.type == "string" ? [0, 0, 0, 0] : Vh(c, d);
    switch (d.type) {
      case "base64":
        x = Hr(c);
        break;
      case "binary":
        x = c;
        break;
      case "buffer":
        d.codepage == 65001 ? x = c.toString("utf8") : d.codepage && typeof pn < "u" || (x = Ee && Buffer.isBuffer(c) ? c.toString("binary") : Zt(c));
        break;
      case "array":
        x = Nn(c);
        break;
      case "string":
        x = c;
        break;
      default:
        throw new Error("Unrecognized type " + d.type);
    }
    return p[0] == 239 && p[1] == 187 && p[2] == 191 ? x = Ut(x.slice(3)) : d.type != "string" && d.type != "buffer" && d.codepage == 65001 ? x = Ut(x) : d.type == "binary" && typeof pn < "u", x.slice(0, 19) == "socialcalc:version:" ? di.to_sheet(d.type == "string" ? x : Ut(x), d) : s(x, d);
  }
  function o(c, d) {
    return ft(f(c, d), d);
  }
  function l(c) {
    for (var d = [], x = Ie(c["!ref"]), p, g = Array.isArray(c), u = x.s.r; u <= x.e.r; ++u) {
      for (var _ = [], D = x.s.c; D <= x.e.c; ++D) {
        var F = Ce({ r: u, c: D });
        if (p = g ? (c[u] || [])[D] : c[F], !p || p.v == null) {
          _.push("          ");
          continue;
        }
        for (var C = (p.w || (Gr(p), p.w) || "").slice(0, 10); C.length < 10; ) C += " ";
        _.push(C + (D === 0 ? " " : ""));
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
}(), sa = /* @__PURE__ */ function() {
  function e(S, M, y) {
    if (S) {
      Er(S, S.l || 0);
      for (var A = y.Enum || xr; S.l < S.length; ) {
        var H = S.read_shift(2), ue = A[H] || A[65535], he = S.read_shift(2), ce = S.l + he, ae = ue.f && ue.f(S, he, y);
        if (S.l = ce, M(ae, ue, H)) return;
      }
    }
  }
  function t(S, M) {
    switch (M.type) {
      case "base64":
        return r(Dr(Hr(S)), M);
      case "binary":
        return r(Dr(S), M);
      case "buffer":
      case "array":
        return r(S, M);
    }
    throw "Unsupported type " + M.type;
  }
  function r(S, M) {
    if (!S) return S;
    var y = M || {}, A = y.dense ? [] : {}, H = "Sheet1", ue = "", he = 0, ce = {}, ae = [], Te = [], me = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, $e = y.sheetRows || 0;
    if (S[2] == 0 && (S[3] == 8 || S[3] == 9) && S.length >= 16 && S[14] == 5 && S[15] === 108)
      throw new Error("Unsupported Works 3 for Mac file");
    if (S[2] == 2)
      y.Enum = xr, e(S, function(j, ge, xe) {
        switch (xe) {
          case 0:
            y.vers = j, j >= 4096 && (y.qpro = !0);
            break;
          case 6:
            me = j;
            break;
          case 204:
            j && (ue = j);
            break;
          case 222:
            ue = j;
            break;
          case 15:
          case 51:
            y.qpro || (j[1].v = j[1].v.slice(1));
          case 13:
          case 14:
          case 16:
            xe == 14 && (j[2] & 112) == 112 && (j[2] & 15) > 1 && (j[2] & 15) < 15 && (j[1].z = y.dateNF || We[14], y.cellDates && (j[1].t = "d", j[1].v = Ia(j[1].v))), y.qpro && j[3] > he && (A["!ref"] = Ge(me), ce[H] = A, ae.push(H), A = y.dense ? [] : {}, me = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, he = j[3], H = ue || "Sheet" + (he + 1), ue = "");
            var Ye = y.dense ? (A[j[0].r] || [])[j[0].c] : A[Ce(j[0])];
            if (Ye) {
              Ye.t = j[1].t, Ye.v = j[1].v, j[1].z != null && (Ye.z = j[1].z), j[1].f != null && (Ye.f = j[1].f);
              break;
            }
            y.dense ? (A[j[0].r] || (A[j[0].r] = []), A[j[0].r][j[0].c] = j[1]) : A[Ce(j[0])] = j[1];
            break;
        }
      }, y);
    else if (S[2] == 26 || S[2] == 14)
      y.Enum = lr, S[2] == 14 && (y.qpro = !0, S.l = 0), e(S, function(j, ge, xe) {
        switch (xe) {
          case 204:
            H = j;
            break;
          case 22:
            j[1].v = j[1].v.slice(1);
          case 23:
          case 24:
          case 25:
          case 37:
          case 39:
          case 40:
            if (j[3] > he && (A["!ref"] = Ge(me), ce[H] = A, ae.push(H), A = y.dense ? [] : {}, me = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, he = j[3], H = "Sheet" + (he + 1)), $e > 0 && j[0].r >= $e) break;
            y.dense ? (A[j[0].r] || (A[j[0].r] = []), A[j[0].r][j[0].c] = j[1]) : A[Ce(j[0])] = j[1], me.e.c < j[0].c && (me.e.c = j[0].c), me.e.r < j[0].r && (me.e.r = j[0].r);
            break;
          case 27:
            j[14e3] && (Te[j[14e3][0]] = j[14e3][1]);
            break;
          case 1537:
            Te[j[0]] = j[1], j[0] == he && (H = j[1]);
            break;
        }
      }, y);
    else throw new Error("Unrecognized LOTUS BOF " + S[2]);
    if (A["!ref"] = Ge(me), ce[ue || H] = A, ae.push(ue || H), !Te.length) return { SheetNames: ae, Sheets: ce };
    for (var X = {}, O = [], ie = 0; ie < Te.length; ++ie) ce[ae[ie]] ? (O.push(Te[ie] || ae[ie]), X[Te[ie]] = ce[Te[ie]] || ce[ae[ie]]) : (O.push(Te[ie]), X[Te[ie]] = { "!ref": "A1" });
    return { SheetNames: O, Sheets: X };
  }
  function n(S, M) {
    var y = M || {};
    if (+y.codepage >= 0 && Xt(+y.codepage), y.type == "string") throw new Error("Cannot write WK1 to JS string");
    var A = vr(), H = Ie(S["!ref"]), ue = Array.isArray(S), he = [];
    re(A, 0, i(1030)), re(A, 6, o(H));
    for (var ce = Math.min(H.e.r, 8191), ae = H.s.r; ae <= ce; ++ae)
      for (var Te = nr(ae), me = H.s.c; me <= H.e.c; ++me) {
        ae === H.s.r && (he[me] = sr(me));
        var $e = he[me] + Te, X = ue ? (S[ae] || [])[me] : S[$e];
        if (!(!X || X.t == "z"))
          if (X.t == "n")
            (X.v | 0) == X.v && X.v >= -32768 && X.v <= 32767 ? re(A, 13, p(ae, me, X.v)) : re(A, 14, u(ae, me, X.v));
          else {
            var O = Gr(X);
            re(A, 15, d(ae, me, O.slice(0, 239)));
          }
      }
    return re(A, 1), A.end();
  }
  function a(S, M) {
    var y = M || {};
    if (+y.codepage >= 0 && Xt(+y.codepage), y.type == "string") throw new Error("Cannot write WK3 to JS string");
    var A = vr();
    re(A, 0, s(S));
    for (var H = 0, ue = 0; H < S.SheetNames.length; ++H) (S.Sheets[S.SheetNames[H]] || {})["!ref"] && re(A, 27, Ve(S.SheetNames[H], ue++));
    var he = 0;
    for (H = 0; H < S.SheetNames.length; ++H) {
      var ce = S.Sheets[S.SheetNames[H]];
      if (!(!ce || !ce["!ref"])) {
        for (var ae = Ie(ce["!ref"]), Te = Array.isArray(ce), me = [], $e = Math.min(ae.e.r, 8191), X = ae.s.r; X <= $e; ++X)
          for (var O = nr(X), ie = ae.s.c; ie <= ae.e.c; ++ie) {
            X === ae.s.r && (me[ie] = sr(ie));
            var j = me[ie] + O, ge = Te ? (ce[X] || [])[ie] : ce[j];
            if (!(!ge || ge.t == "z"))
              if (ge.t == "n")
                re(A, 23, b(X, ie, he, ge.v));
              else {
                var xe = Gr(ge);
                re(A, 22, k(X, ie, he, xe.slice(0, 239)));
              }
          }
        ++he;
      }
    }
    return re(A, 1), A.end();
  }
  function i(S) {
    var M = U(2);
    return M.write_shift(2, S), M;
  }
  function s(S) {
    var M = U(26);
    M.write_shift(2, 4096), M.write_shift(2, 4), M.write_shift(4, 0);
    for (var y = 0, A = 0, H = 0, ue = 0; ue < S.SheetNames.length; ++ue) {
      var he = S.SheetNames[ue], ce = S.Sheets[he];
      if (!(!ce || !ce["!ref"])) {
        ++H;
        var ae = Ar(ce["!ref"]);
        y < ae.e.r && (y = ae.e.r), A < ae.e.c && (A = ae.e.c);
      }
    }
    return y > 8191 && (y = 8191), M.write_shift(2, y), M.write_shift(1, H), M.write_shift(1, A), M.write_shift(2, 0), M.write_shift(2, 0), M.write_shift(1, 1), M.write_shift(1, 2), M.write_shift(4, 0), M.write_shift(4, 0), M;
  }
  function f(S, M, y) {
    var A = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    return M == 8 && y.qpro ? (A.s.c = S.read_shift(1), S.l++, A.s.r = S.read_shift(2), A.e.c = S.read_shift(1), S.l++, A.e.r = S.read_shift(2), A) : (A.s.c = S.read_shift(2), A.s.r = S.read_shift(2), M == 12 && y.qpro && (S.l += 2), A.e.c = S.read_shift(2), A.e.r = S.read_shift(2), M == 12 && y.qpro && (S.l += 2), A.s.c == 65535 && (A.s.c = A.e.c = A.s.r = A.e.r = 0), A);
  }
  function o(S) {
    var M = U(8);
    return M.write_shift(2, S.s.c), M.write_shift(2, S.s.r), M.write_shift(2, S.e.c), M.write_shift(2, S.e.r), M;
  }
  function l(S, M, y) {
    var A = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0, 0];
    return y.qpro && y.vers != 20768 ? (A[0].c = S.read_shift(1), A[3] = S.read_shift(1), A[0].r = S.read_shift(2), S.l += 2) : (A[2] = S.read_shift(1), A[0].c = S.read_shift(2), A[0].r = S.read_shift(2)), A;
  }
  function c(S, M, y) {
    var A = S.l + M, H = l(S, M, y);
    if (H[1].t = "s", y.vers == 20768) {
      S.l++;
      var ue = S.read_shift(1);
      return H[1].v = S.read_shift(ue, "utf8"), H;
    }
    return y.qpro && S.l++, H[1].v = S.read_shift(A - S.l, "cstr"), H;
  }
  function d(S, M, y) {
    var A = U(7 + y.length);
    A.write_shift(1, 255), A.write_shift(2, M), A.write_shift(2, S), A.write_shift(1, 39);
    for (var H = 0; H < A.length; ++H) {
      var ue = y.charCodeAt(H);
      A.write_shift(1, ue >= 128 ? 95 : ue);
    }
    return A.write_shift(1, 0), A;
  }
  function x(S, M, y) {
    var A = l(S, M, y);
    return A[1].v = S.read_shift(2, "i"), A;
  }
  function p(S, M, y) {
    var A = U(7);
    return A.write_shift(1, 255), A.write_shift(2, M), A.write_shift(2, S), A.write_shift(2, y, "i"), A;
  }
  function g(S, M, y) {
    var A = l(S, M, y);
    return A[1].v = S.read_shift(8, "f"), A;
  }
  function u(S, M, y) {
    var A = U(13);
    return A.write_shift(1, 255), A.write_shift(2, M), A.write_shift(2, S), A.write_shift(8, y, "f"), A;
  }
  function _(S, M, y) {
    var A = S.l + M, H = l(S, M, y);
    if (H[1].v = S.read_shift(8, "f"), y.qpro) S.l = A;
    else {
      var ue = S.read_shift(2);
      B(S.slice(S.l, S.l + ue), H), S.l += ue;
    }
    return H;
  }
  function D(S, M, y) {
    var A = M & 32768;
    return M &= -32769, M = (A ? S : 0) + (M >= 8192 ? M - 16384 : M), (A ? "" : "$") + (y ? sr(M) : nr(M));
  }
  var F = {
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
  function B(S, M) {
    Er(S, 0);
    for (var y = [], A = 0, H = "", ue = "", he = "", ce = ""; S.l < S.length; ) {
      var ae = S[S.l++];
      switch (ae) {
        case 0:
          y.push(S.read_shift(8, "f"));
          break;
        case 1:
          ue = D(M[0].c, S.read_shift(2), !0), H = D(M[0].r, S.read_shift(2), !1), y.push(ue + H);
          break;
        case 2:
          {
            var Te = D(M[0].c, S.read_shift(2), !0), me = D(M[0].r, S.read_shift(2), !1);
            ue = D(M[0].c, S.read_shift(2), !0), H = D(M[0].r, S.read_shift(2), !1), y.push(Te + me + ":" + ue + H);
          }
          break;
        case 3:
          if (S.l < S.length) {
            console.error("WK1 premature formula end");
            return;
          }
          break;
        case 4:
          y.push("(" + y.pop() + ")");
          break;
        case 5:
          y.push(S.read_shift(2));
          break;
        case 6:
          {
            for (var $e = ""; ae = S[S.l++]; ) $e += String.fromCharCode(ae);
            y.push('"' + $e.replace(/"/g, '""') + '"');
          }
          break;
        case 8:
          y.push("-" + y.pop());
          break;
        case 23:
          y.push("+" + y.pop());
          break;
        case 22:
          y.push("NOT(" + y.pop() + ")");
          break;
        case 20:
        case 21:
          ce = y.pop(), he = y.pop(), y.push(["AND", "OR"][ae - 20] + "(" + he + "," + ce + ")");
          break;
        default:
          if (ae < 32 && C[ae])
            ce = y.pop(), he = y.pop(), y.push(he + C[ae] + ce);
          else if (F[ae]) {
            if (A = F[ae][1], A == 69 && (A = S[S.l++]), A > y.length) {
              console.error("WK1 bad formula parse 0x" + ae.toString(16) + ":|" + y.join("|") + "|");
              return;
            }
            var X = y.slice(-A);
            y.length -= A, y.push(F[ae][0] + "(" + X.join(",") + ")");
          } else return ae <= 7 ? console.error("WK1 invalid opcode " + ae.toString(16)) : ae <= 24 ? console.error("WK1 unsupported op " + ae.toString(16)) : ae <= 30 ? console.error("WK1 invalid opcode " + ae.toString(16)) : ae <= 115 ? console.error("WK1 unsupported function opcode " + ae.toString(16)) : console.error("WK1 unrecognized opcode " + ae.toString(16));
      }
    }
    y.length == 1 ? M[1].f = "" + y[0] : console.error("WK1 bad formula parse |" + y.join("|") + "|");
  }
  function Q(S) {
    var M = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0];
    return M[0].r = S.read_shift(2), M[3] = S[S.l++], M[0].c = S[S.l++], M;
  }
  function ne(S, M) {
    var y = Q(S);
    return y[1].t = "s", y[1].v = S.read_shift(M - 4, "cstr"), y;
  }
  function k(S, M, y, A) {
    var H = U(6 + A.length);
    H.write_shift(2, S), H.write_shift(1, y), H.write_shift(1, M), H.write_shift(1, 39);
    for (var ue = 0; ue < A.length; ++ue) {
      var he = A.charCodeAt(ue);
      H.write_shift(1, he >= 128 ? 95 : he);
    }
    return H.write_shift(1, 0), H;
  }
  function V(S, M) {
    var y = Q(S);
    y[1].v = S.read_shift(2);
    var A = y[1].v >> 1;
    if (y[1].v & 1)
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
    return y[1].v = A, y;
  }
  function N(S, M) {
    var y = Q(S), A = S.read_shift(4), H = S.read_shift(4), ue = S.read_shift(2);
    if (ue == 65535)
      return A === 0 && H === 3221225472 ? (y[1].t = "e", y[1].v = 15) : A === 0 && H === 3489660928 ? (y[1].t = "e", y[1].v = 42) : y[1].v = 0, y;
    var he = ue & 32768;
    return ue = (ue & 32767) - 16446, y[1].v = (1 - he * 2) * (H * Math.pow(2, ue + 32) + A * Math.pow(2, ue)), y;
  }
  function b(S, M, y, A) {
    var H = U(14);
    if (H.write_shift(2, S), H.write_shift(1, y), H.write_shift(1, M), A == 0)
      return H.write_shift(4, 0), H.write_shift(4, 0), H.write_shift(2, 65535), H;
    var ue = 0, he = 0, ce = 0, ae = 0;
    return A < 0 && (ue = 1, A = -A), he = Math.log2(A) | 0, A /= Math.pow(2, he - 31), ae = A >>> 0, ae & 2147483648 || (A /= 2, ++he, ae = A >>> 0), A -= ae, ae |= 2147483648, ae >>>= 0, A *= Math.pow(2, 32), ce = A >>> 0, H.write_shift(4, ce), H.write_shift(4, ae), he += 16383 + (ue ? 32768 : 0), H.write_shift(2, he), H;
  }
  function K(S, M) {
    var y = N(S);
    return S.l += M - 14, y;
  }
  function J(S, M) {
    var y = Q(S), A = S.read_shift(4);
    return y[1].v = A >> 6, y;
  }
  function se(S, M) {
    var y = Q(S), A = S.read_shift(8, "f");
    return y[1].v = A, y;
  }
  function we(S, M) {
    var y = se(S);
    return S.l += M - 10, y;
  }
  function de(S, M) {
    return S[S.l + M - 1] == 0 ? S.read_shift(M, "cstr") : "";
  }
  function Ne(S, M) {
    var y = S[S.l++];
    y > M - 1 && (y = M - 1);
    for (var A = ""; A.length < y; ) A += String.fromCharCode(S[S.l++]);
    return A;
  }
  function De(S, M, y) {
    if (!(!y.qpro || M < 21)) {
      var A = S.read_shift(1);
      S.l += 17, S.l += 1, S.l += 2;
      var H = S.read_shift(M - 21, "cstr");
      return [A, H];
    }
  }
  function Be(S, M) {
    for (var y = {}, A = S.l + M; S.l < A; ) {
      var H = S.read_shift(2);
      if (H == 14e3) {
        for (y[H] = [0, ""], y[H][0] = S.read_shift(2); S[S.l]; )
          y[H][1] += String.fromCharCode(S[S.l]), S.l++;
        S.l++;
      }
    }
    return y;
  }
  function Ve(S, M) {
    var y = U(5 + S.length);
    y.write_shift(2, 14e3), y.write_shift(2, M);
    for (var A = 0; A < S.length; ++A) {
      var H = S.charCodeAt(A);
      y[y.l++] = H > 127 ? 95 : H;
    }
    return y[y.l++] = 0, y;
  }
  var xr = {
    /*::[*/
    0: { n: "BOF", f: oi },
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
    204: { n: "SHEETNAMECS", f: de },
    /*::[*/
    222: { n: "SHEETNAMELP", f: Ne },
    /*::[*/
    65535: { n: "" }
  }, lr = {
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
    22: { n: "LABEL16", f: ne },
    /*::[*/
    23: { n: "NUMBER17", f: N },
    /*::[*/
    24: { n: "NUMBER18", f: V },
    /*::[*/
    25: { n: "FORMULA19", f: K },
    /*::[*/
    26: { n: "FORMULA1A" },
    /*::[*/
    27: { n: "XFORMAT", f: Be },
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
    37: { n: "NUMBER25", f: J },
    /*::[*/
    38: { n: "??" },
    /*::[*/
    39: { n: "NUMBER27", f: se },
    /*::[*/
    40: { n: "FORMULA28", f: we },
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
    204: { n: "SHEETNAMECS", f: de },
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
    1537: { n: "SHEETINFOQP", f: De },
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
function pi(e, t) {
  if (!t.bookSST) return "";
  var r = [Xe];
  r[r.length] = ee("sst", null, {
    xmlns: At[0],
    count: e.Count,
    uniqueCount: e.Unique
  });
  for (var n = 0; n != e.length; ++n)
    if (e[n] != null) {
      var a = e[n], i = "<si>";
      a.r ? i += a.r : (i += "<t", a.t || (a.t = ""), a.t.match(kl) && (i += ' xml:space="preserve"'), i += ">" + ye(a.t) + "</t>"), i += "</si>", r[r.length] = i;
    }
  return r.length > 2 && (r[r.length] = "</sst>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Dl(e) {
  return [e.read_shift(4), e.read_shift(4)];
}
function Il(e, t) {
  return t || (t = U(8)), t.write_shift(4, e.Count), t.write_shift(4, e.Unique), t;
}
var Rl = wf;
function Nl(e) {
  var t = vr();
  G(t, 159, Il(e));
  for (var r = 0; r < e.length; ++r) G(t, 19, Rl(e[r]));
  return G(
    t,
    160
    /* BrtEndSst */
  ), t.end();
}
function Pl(e) {
  for (var t = [], r = e.split(""), n = 0; n < r.length; ++n) t[n] = r[n].charCodeAt(0);
  return t;
}
function vi(e) {
  var t = 0, r, n = Pl(e), a = n.length + 1, i, s, f, o, l;
  for (r = at(a), r[0] = n.length, i = 1; i != a; ++i) r[i] = n[i - 1];
  for (i = a - 1; i >= 0; --i)
    s = r[i], f = t & 16384 ? 1 : 0, o = t << 1 & 32767, l = f | o, t = l ^ s;
  return t ^ 52811;
}
var Ll = /* @__PURE__ */ function() {
  function e(a, i) {
    switch (i.type) {
      case "base64":
        return t(Hr(a), i);
      case "binary":
        return t(a, i);
      case "buffer":
        return t(Ee && Buffer.isBuffer(a) ? a.toString("binary") : Zt(a), i);
      case "array":
        return t(Nn(a), i);
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
              var D = { v: _, t: "s" };
              Array.isArray(f) ? f[d][u] = D : f[Ce({ r: d, c: u })] = D;
            }
            break;
        }
        p = x.lastIndex;
      }
      u > l.e.c && (l.e.c = u);
    }), f["!ref"] = Ge(l), f;
  }
  function r(a, i) {
    return ft(e(a, i), i);
  }
  function n(a) {
    for (var i = ["{\\rtf1\\ansi"], s = Ie(a["!ref"]), f, o = Array.isArray(a), l = s.s.r; l <= s.e.r; ++l) {
      i.push("\\trowd\\trautofit1");
      for (var c = s.s.c; c <= s.e.c; ++c) i.push("\\cellx" + (c + 1));
      for (i.push("\\pard\\intbl"), c = s.s.c; c <= s.e.c; ++c) {
        var d = Ce({ r: l, c });
        f = o ? (a[l] || [])[c] : a[d], !(!f || f.v == null && (!f.f || f.F)) && (i.push(" " + (f.w || (Gr(f), f.w))), i.push("\\cell"));
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
function fa(e) {
  for (var t = 0, r = 1; t != 3; ++t) r = r * 256 + (e[t] > 255 ? 255 : e[t] < 0 ? 0 : e[t]);
  return r.toString(16).toUpperCase().slice(1);
}
var Ml = 6, Vr = Ml;
function An(e) {
  return Math.floor((e + Math.round(128 / Vr) / 256) * Vr);
}
function Fn(e) {
  return Math.floor((e - 5) / Vr * 100 + 0.5) / 100;
}
function qn(e) {
  return Math.round((e * Vr + 5) / Vr * 256) / 256;
}
function d0(e) {
  e.width ? (e.wpx = An(e.width), e.wch = Fn(e.wpx), e.MDW = Vr) : e.wpx ? (e.wch = Fn(e.wpx), e.width = qn(e.wch), e.MDW = Vr) : typeof e.wch == "number" && (e.width = qn(e.wch), e.wpx = An(e.width), e.MDW = Vr), e.customWidth && delete e.customWidth;
}
var Bl = 96, mi = Bl;
function yn(e) {
  return e * 96 / mi;
}
function gi(e) {
  return e * mi / 96;
}
function bl(e) {
  var t = ["<numFmts>"];
  return [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(r) {
    for (var n = r[0]; n <= r[1]; ++n) e[n] != null && (t[t.length] = ee("numFmt", null, { numFmtId: n, formatCode: ye(e[n]) }));
  }), t.length === 1 ? "" : (t[t.length] = "</numFmts>", t[0] = ee("numFmts", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
function Ul(e) {
  var t = [];
  return t[t.length] = ee("cellXfs", null), e.forEach(function(r) {
    t[t.length] = ee("xf", null, r);
  }), t[t.length] = "</cellXfs>", t.length === 2 ? "" : (t[0] = ee("cellXfs", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
function _i(e, t) {
  var r = [Xe, ee("styleSheet", null, {
    xmlns: At[0],
    "xmlns:vt": je.vt
  })], n;
  return e.SSF && (n = bl(e.SSF)) != null && (r[r.length] = n), r[r.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>', r[r.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>', r[r.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>', r[r.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>', (n = Ul(t.cellXfs)) && (r[r.length] = n), r[r.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>', r[r.length] = '<dxfs count="0"/>', r[r.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>', r.length > 2 && (r[r.length] = "</styleSheet>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Wl(e, t) {
  var r = e.read_shift(2), n = fr(e);
  return [r, n];
}
function Vl(e, t, r) {
  r || (r = U(6 + 4 * t.length)), r.write_shift(2, e), Ze(t, r);
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
  return n.name = fr(e), n;
}
function Gl(e, t) {
  t || (t = U(25 + 4 * 32)), t.write_shift(2, e.sz * 20), Df(e, t), t.write_shift(2, e.bold ? 700 : 400);
  var r = 0;
  e.vertAlign == "superscript" ? r = 1 : e.vertAlign == "subscript" && (r = 2), t.write_shift(2, r), t.write_shift(1, e.underline || 0), t.write_shift(1, e.family || 0), t.write_shift(1, e.charset || 0), t.write_shift(1, 0), wn(e.color, t);
  var n = 0;
  return n = 2, t.write_shift(1, n), Ze(e.name, t), t.length > t.l ? t.slice(0, t.l) : t;
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
], Xn, $l = Mr;
function la(e, t) {
  t || (t = U(4 * 3 + 8 * 7 + 16 * 1)), Xn || (Xn = t0(Xl));
  var r = Xn[e.patternType];
  r == null && (r = 40), t.write_shift(4, r);
  var n = 0;
  if (r != 40)
    for (wn({ auto: 1 }, t), wn({ auto: 1 }, t); n < 12; ++n) t.write_shift(4, 0);
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
function Ti(e, t, r) {
  r || (r = U(16)), r.write_shift(2, t || 0), r.write_shift(2, e.numFmtId || 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(1, 0), r.write_shift(1, 0);
  var n = 0;
  return r.write_shift(1, n), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(1, 0), r;
}
function Lt(e, t) {
  return t || (t = U(10)), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var Kl = Mr;
function Yl(e, t) {
  return t || (t = U(51)), t.write_shift(1, 0), Lt(null, t), Lt(null, t), Lt(null, t), Lt(null, t), Lt(null, t), t.length > t.l ? t.slice(0, t.l) : t;
}
function jl(e, t) {
  return t || (t = U(12 + 4 * 10)), t.write_shift(4, e.xfId), t.write_shift(2, 1), t.write_shift(1, 0), t.write_shift(1, 0), En(e.name || "", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Jl(e, t, r) {
  var n = U(2052);
  return n.write_shift(4, e), En(t, n), En(r, n), n.length > n.l ? n.slice(0, n.l) : n;
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
    }), r != 0 && (G(e, 615, Rr(r)), [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a) t[a] != null && G(e, 44, Vl(a, t[a]));
    }), G(
      e,
      616
      /* BrtEndFmts */
    ));
  }
}
function ql(e) {
  var t = 1;
  G(e, 611, Rr(t)), G(e, 43, Gl({
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
function Ql(e) {
  var t = 2;
  G(e, 603, Rr(t)), G(e, 45, la({ patternType: "none" })), G(e, 45, la({ patternType: "gray125" })), G(
    e,
    604
    /* BrtEndFills */
  );
}
function eo(e) {
  var t = 1;
  G(e, 613, Rr(t)), G(e, 46, Yl()), G(
    e,
    614
    /* BrtEndBorders */
  );
}
function ro(e) {
  var t = 1;
  G(e, 626, Rr(t)), G(e, 47, Ti({
    numFmtId: 0
  }, 65535)), G(
    e,
    627
    /* BrtEndCellStyleXFs */
  );
}
function to(e, t) {
  G(e, 617, Rr(t.length)), t.forEach(function(r) {
    G(e, 47, Ti(r, 0));
  }), G(
    e,
    618
    /* BrtEndCellXFs */
  );
}
function no(e) {
  var t = 1;
  G(e, 619, Rr(t)), G(e, 48, jl({
    xfId: 0,
    name: "Normal"
  })), G(
    e,
    620
    /* BrtEndStyles */
  );
}
function ao(e) {
  var t = 0;
  G(e, 505, Rr(t)), G(
    e,
    506
    /* BrtEndDXFs */
  );
}
function io(e) {
  var t = 0;
  G(e, 508, Jl(t, "TableStyleMedium9", "PivotStyleMedium4")), G(
    e,
    509
    /* BrtEndTableStyles */
  );
}
function so(e, t) {
  var r = vr();
  return G(
    r,
    278
    /* BrtBeginStyleSheet */
  ), Zl(r, e.SSF), ql(r), Ql(r), eo(r), ro(r), to(r, t.cellXfs), no(r), ao(r), io(r), G(
    r,
    279
    /* BrtEndStyleSheet */
  ), r.end();
}
function Ei(e, t) {
  if (t && t.themeXLSX) return t.themeXLSX;
  if (e && typeof e.raw == "string") return e.raw;
  var r = [Xe];
  return r[r.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">', r[r.length] = "<a:themeElements>", r[r.length] = '<a:clrScheme name="Office">', r[r.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>', r[r.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>', r[r.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>', r[r.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>', r[r.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>', r[r.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>', r[r.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>', r[r.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>', r[r.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>', r[r.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>', r[r.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>', r[r.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>', r[r.length] = "</a:clrScheme>", r[r.length] = '<a:fontScheme name="Office">', r[r.length] = "<a:majorFont>", r[r.length] = '<a:latin typeface="Cambria"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Hebr" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="MoolBoran"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:majorFont>", r[r.length] = "<a:minorFont>", r[r.length] = '<a:latin typeface="Calibri"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Arial"/>', r[r.length] = '<a:font script="Hebr" typeface="Arial"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="DaunPenh"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Arial"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:minorFont>", r[r.length] = "</a:fontScheme>", r[r.length] = '<a:fmtScheme name="Office">', r[r.length] = "<a:fillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="1"/>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="0"/>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:fillStyleLst>", r[r.length] = "<a:lnStyleLst>", r[r.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = "</a:lnStyleLst>", r[r.length] = "<a:effectStyleLst>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>', r[r.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>', r[r.length] = "</a:effectStyle>", r[r.length] = "</a:effectStyleLst>", r[r.length] = "<a:bgFillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:bgFillStyleLst>", r[r.length] = "</a:fmtScheme>", r[r.length] = "</a:themeElements>", r[r.length] = "<a:objectDefaults>", r[r.length] = "<a:spDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>', r[r.length] = "</a:spDef>", r[r.length] = "<a:lnDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>', r[r.length] = "</a:lnDef>", r[r.length] = "</a:objectDefaults>", r[r.length] = "<a:extraClrSchemeLst/>", r[r.length] = "</a:theme>", r.join("");
}
function fo(e, t) {
  return {
    flags: e.read_shift(4),
    version: e.read_shift(4),
    name: fr(e)
  };
}
function lo(e) {
  var t = U(12 + 2 * e.name.length);
  return t.write_shift(4, e.flags), t.write_shift(4, e.version), Ze(e.name, t), t.slice(0, t.l);
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
  return r.write_shift(4, e), Ze(t, r), r.slice(0, r.l);
}
function ho(e) {
  return e.l += 4, e.read_shift(4) != 0;
}
function xo(e, t) {
  var r = U(8);
  return r.write_shift(4, e), r.write_shift(4, 1), r;
}
function po() {
  var e = vr();
  return G(e, 332), G(e, 334, Rr(1)), G(e, 335, lo({
    name: "XLDAPR",
    version: 12e4,
    flags: 3496657072
  })), G(e, 336), G(e, 339, uo(1, "XLDAPR")), G(e, 52), G(e, 35, Rr(514)), G(e, 4096, Rr(0)), G(e, 4097, yr(1)), G(e, 36), G(e, 53), G(e, 340), G(e, 337, xo(1)), G(e, 51, co([[1, 0]])), G(e, 338), G(e, 333), e.end();
}
function wi() {
  var e = [Xe];
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
  r.r = e.read_shift(4), r.c = e.read_shift(4), t.r = Ce(r);
  var n = e.read_shift(1);
  return n & 2 && (t.l = "1"), n & 8 && (t.a = "1"), t;
}
var gt = 1024;
function Si(e, t) {
  for (var r = [21600, 21600], n = ["m0,0l0", r[1], r[0], r[1], r[0], "0xe"].join(","), a = [
    ee("xml", null, { "xmlns:v": wr.v, "xmlns:o": wr.o, "xmlns:x": wr.x, "xmlns:mv": wr.mv }).replace(/\/>/, ">"),
    ee("o:shapelayout", ee("o:idmap", null, { "v:ext": "edit", data: e }), { "v:ext": "edit" }),
    ee("v:shapetype", [
      ee("v:stroke", null, { joinstyle: "miter" }),
      ee("v:path", null, { gradientshapeok: "t", "o:connecttype": "rect" })
    ].join(""), { id: "_x0000_t202", "o:spt": 202, coordsize: r.join(","), path: n })
  ]; gt < e * 1e3; ) gt += 1e3;
  return t.forEach(function(i) {
    var s = Je(i[0]), f = (
      /*::(*/
      { color2: "#BEFF82", type: "gradient" }
    );
    f.type == "gradient" && (f.angle = "-180");
    var o = f.type == "gradient" ? ee("o:fill", null, { type: "gradientUnscaled", "v:ext": "view" }) : null, l = ee("v:fill", o, f), c = { on: "t", obscured: "t" };
    ++gt, a = a.concat([
      "<v:shape" + Yt({
        id: "_x0000_s" + gt,
        type: "#_x0000_t202",
        style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" + (i[1].hidden ? ";visibility:hidden" : ""),
        fillcolor: "#ECFAD4",
        strokecolor: "#edeaa1"
      }) + ">",
      l,
      ee("v:shadow", null, c),
      ee("v:path", null, { "o:connecttype": "none" }),
      '<v:textbox><div style="text-align:left"></div></v:textbox>',
      '<x:ClientData ObjectType="Note">',
      "<x:MoveWithCells/>",
      "<x:SizeWithCells/>",
      /* Part 4 19.4.2.3 Anchor (Anchor) */
      tr("x:Anchor", [s.c + 1, 0, s.r + 1, 0, s.c + 3, 20, s.r + 5, 20].join(",")),
      tr("x:AutoFill", "False"),
      tr("x:Row", String(s.r)),
      tr("x:Column", String(s.c)),
      i[1].hidden ? "" : "<x:Visible/>",
      "</x:ClientData>",
      "</v:shape>"
    ]);
  }), a.push("</xml>"), a.join("");
}
function Ai(e) {
  var t = [Xe, ee("comments", null, { xmlns: At[0] })], r = [];
  return t.push("<authors>"), e.forEach(function(n) {
    n[1].forEach(function(a) {
      var i = ye(a.a);
      r.indexOf(i) == -1 && (r.push(i), t.push("<author>" + i + "</author>")), a.T && a.ID && r.indexOf("tc=" + a.ID) == -1 && (r.push("tc=" + a.ID), t.push("<author>tc=" + a.ID + "</author>"));
    });
  }), r.length == 0 && (r.push("SheetJ5"), t.push("<author>SheetJ5</author>")), t.push("</authors>"), t.push("<commentList>"), e.forEach(function(n) {
    var a = 0, i = [];
    if (n[1][0] && n[1][0].T && n[1][0].ID ? a = r.indexOf("tc=" + n[1][0].ID) : n[1].forEach(function(o) {
      o.a && (a = r.indexOf(ye(o.a))), i.push(o.t || "");
    }), t.push('<comment ref="' + n[0] + '" authorId="' + a + '"><text>'), i.length <= 1) t.push(tr("t", ye(i[0] || "")));
    else {
      for (var s = `Comment:
    ` + i[0] + `
`, f = 1; f < i.length; ++f) s += `Reply:
    ` + i[f] + `
`;
      t.push(tr("t", ye(s)));
    }
    t.push("</text></comment>");
  }), t.push("</commentList>"), t.length > 2 && (t[t.length] = "</comments>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function mo(e, t, r) {
  var n = [Xe, ee("ThreadedComments", null, { xmlns: je.TCMNT }).replace(/[\/]>/, ">")];
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
      f == 0 ? i = o.id : o.parentId = i, s.ID = o.id, s.a && (o.personId = "{54EE7950-7262-4200-6969-" + ("000000000000" + t.indexOf(s.a)).slice(-12) + "}"), n.push(ee("threadedComment", tr("text", s.t || ""), o));
    });
  }), n.push("</ThreadedComments>"), n.join("");
}
function go(e) {
  var t = [Xe, ee("personList", null, {
    xmlns: je.TCMNT,
    "xmlns:x": At[0]
  }).replace(/[\/]>/, ">")];
  return e.forEach(function(r, n) {
    t.push(ee("person", null, {
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
  var r = ut(e);
  return t.rfx = r.s, t.ref = Ce(r.s), e.l += 16, t;
}
function To(e, t) {
  return t == null && (t = U(36)), t.write_shift(4, e[1].iauthor), yt(e[0], t), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var Eo = fr;
function wo(e) {
  return Ze(e.slice(0, 54));
}
function So(e) {
  var t = vr(), r = [];
  return G(
    t,
    628
    /* BrtBeginComments */
  ), G(
    t,
    630
    /* BrtBeginCommentAuthors */
  ), e.forEach(function(n) {
    n[1].forEach(function(a) {
      r.indexOf(a.a) > -1 || (r.push(a.a.slice(0, 54)), G(t, 632, wo(a.a)));
    });
  }), G(
    t,
    631
    /* BrtEndCommentAuthors */
  ), G(
    t,
    633
    /* BrtBeginCommentList */
  ), e.forEach(function(n) {
    n[1].forEach(function(a) {
      a.iauthor = r.indexOf(a.a);
      var i = { s: Je(n[0]), e: Je(n[0]) };
      G(t, 635, To([i, a])), a.t && a.t.length > 0 && G(t, 637, Af(a)), G(
        t,
        636
        /* BrtEndComment */
      ), delete a.iauthor;
    });
  }), G(
    t,
    634
    /* BrtEndCommentList */
  ), G(
    t,
    629
    /* BrtEndComments */
  ), t.end();
}
function Ao(e, t) {
  t.FullPaths.forEach(function(r, n) {
    if (n != 0) {
      var a = r.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
      a.slice(-1) !== "/" && Oe.utils.cfb_add(e, a, t.FileIndex[n].content);
    }
  });
}
var Fi = ["xlsb", "xlsm", "xlam", "biff8", "xla"], Fo = /* @__PURE__ */ function() {
  var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g, t = { r: 0, c: 0 };
  function r(n, a, i, s) {
    var f = !1, o = !1;
    i.length == 0 ? o = !0 : i.charAt(0) == "[" && (o = !0, i = i.slice(1, -1)), s.length == 0 ? f = !0 : s.charAt(0) == "[" && (f = !0, s = s.slice(1, -1));
    var l = i.length > 0 ? parseInt(i, 10) | 0 : 0, c = s.length > 0 ? parseInt(s, 10) | 0 : 0;
    return f ? c += t.c : --c, o ? l += t.r : --l, a + (f ? "" : "$") + sr(c) + (o ? "" : "$") + nr(l);
  }
  return function(a, i) {
    return t = i, a.replace(e, r);
  };
}(), p0 = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g, v0 = /* @__PURE__ */ function() {
  return function(t, r) {
    return t.replace(p0, function(n, a, i, s, f, o) {
      var l = o0(s) - (i ? 0 : r.c), c = l0(o) - (f ? 0 : r.r), d = c == 0 ? "" : f ? c + 1 : "[" + c + "]", x = l == 0 ? "" : i ? l + 1 : "[" + l + "]";
      return a + "R" + d + "C" + x;
    });
  };
}();
function yo(e, t) {
  return e.replace(p0, function(r, n, a, i, s, f) {
    return n + (a == "$" ? a + i : sr(o0(i) + t.c)) + (s == "$" ? s + f : nr(l0(f) + t.r));
  });
}
function Co(e) {
  return e.length != 1;
}
function He(e) {
  e.l += 1;
}
function jr(e, t) {
  var r = e.read_shift(2);
  return [r & 16383, r >> 14 & 1, r >> 15 & 1];
}
function yi(e, t, r) {
  var n = 2;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5) return Ci(e);
    r.biff == 12 && (n = 4);
  }
  var a = e.read_shift(n), i = e.read_shift(n), s = jr(e), f = jr(e);
  return { s: { r: a, c: s[0], cRel: s[1], rRel: s[2] }, e: { r: i, c: f[0], cRel: f[1], rRel: f[2] } };
}
function Ci(e) {
  var t = jr(e), r = jr(e), n = e.read_shift(1), a = e.read_shift(1);
  return { s: { r: t[0], c: n, cRel: t[1], rRel: t[2] }, e: { r: r[0], c: a, cRel: r[1], rRel: r[2] } };
}
function Oo(e, t, r) {
  if (r.biff < 8) return Ci(e);
  var n = e.read_shift(r.biff == 12 ? 4 : 2), a = e.read_shift(r.biff == 12 ? 4 : 2), i = jr(e), s = jr(e);
  return { s: { r: n, c: i[0], cRel: i[1], rRel: i[2] }, e: { r: a, c: s[0], cRel: s[1], rRel: s[2] } };
}
function Oi(e, t, r) {
  if (r && r.biff >= 2 && r.biff <= 5) return ko(e);
  var n = e.read_shift(r && r.biff == 12 ? 4 : 2), a = jr(e);
  return { r: n, c: a[0], cRel: a[1], rRel: a[2] };
}
function ko(e) {
  var t = jr(e), r = e.read_shift(1);
  return { r: t[0], c: r, cRel: t[1], rRel: t[2] };
}
function Do(e) {
  var t = e.read_shift(2), r = e.read_shift(2);
  return { r: t, c: r & 255, fQuoted: !!(r & 16384), cRel: r >> 15, rRel: r >> 15 };
}
function Io(e, t, r) {
  var n = r && r.biff ? r.biff : 8;
  if (n >= 2 && n <= 5) return Ro(e);
  var a = e.read_shift(n >= 12 ? 4 : 2), i = e.read_shift(2), s = (i & 16384) >> 14, f = (i & 32768) >> 15;
  if (i &= 16383, f == 1) for (; a > 524287; ) a -= 1048576;
  if (s == 1) for (; i > 8191; ) i = i - 16384;
  return { r: a, c: i, cRel: s, rRel: f };
}
function Ro(e) {
  var t = e.read_shift(2), r = e.read_shift(1), n = (t & 32768) >> 15, a = (t & 16384) >> 14;
  return t &= 16383, n == 1 && t >= 8192 && (t = t - 16384), a == 1 && r >= 128 && (r = r - 256), { r: t, c: r, cRel: a, rRel: n };
}
function No(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = yi(e, r.biff >= 2 && r.biff <= 5 ? 6 : 8, r);
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
  var s = yi(e, i, r);
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
function oa(e) {
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
function ki(e) {
  var t = e.read_shift(1), r = e.read_shift(1);
  return [t, r];
}
function Xo(e) {
  return e.read_shift(2), ki(e);
}
function $o(e) {
  return e.read_shift(2), ki(e);
}
function zo(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = Oi(e, 0, r);
  return [n, a];
}
function Ko(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = Io(e, 0, r);
  return [n, a];
}
function Yo(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(2);
  r && r.biff == 5 && (e.l += 12);
  var i = Oi(e, 0, r);
  return [n, a, i];
}
function jo(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(r && r.biff <= 3 ? 1 : 2);
  return [jc[a], Ri[a], n];
}
function Jo(e, t, r) {
  var n = e[e.l++], a = e.read_shift(1), i = r && r.biff <= 3 ? [n == 88 ? -1 : 0, e.read_shift(1)] : Zo(e);
  return [a, (i[0] === 0 ? Ri : Yc)[i[1]]];
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
  return e.l++, en[e.read_shift(1)];
}
function rc(e) {
  return e.l++, e.read_shift(2);
}
function tc(e) {
  return e.l++, e.read_shift(1) !== 0;
}
function nc(e) {
  return e.l++, Ct(e);
}
function ac(e, t, r) {
  return e.l++, ui(e, t - 1, r);
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
      r[1] = en[e[e.l]], e.l += t == 12 ? 4 : 8;
      break;
    case 0:
      e.l += 8;
      break;
    case 1:
      r[1] = Ct(e);
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
  for (var n = e.read_shift(r.biff == 12 ? 4 : 2), a = [], i = 0; i != n; ++i) a.push((r.biff == 12 ? ut : el)(e));
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
var pc = Mr, vc = Mr, mc = Mr;
function rn(e, t, r) {
  return e.l += 2, [Do(e)];
}
function m0(e) {
  return e.l += 6, [];
}
var gc = rn, _c = m0, Tc = m0, Ec = rn;
function Di(e) {
  return e.l += 2, [oi(e), e.read_shift(2) & 1];
}
var wc = rn, Sc = Di, Ac = m0, Fc = rn, yc = rn, Cc = [
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
function Ic(e, t, r) {
  return e.l += r.biff == 2 ? 4 : 5, ["PTGENDSHEET"];
}
function Rc(e) {
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
var ca = {
  /*::[*/
  1: { n: "PtgExp", f: Qo },
  /*::[*/
  2: { n: "PtgTbl", f: mc },
  /*::[*/
  3: { n: "PtgAdd", f: He },
  /*::[*/
  4: { n: "PtgSub", f: He },
  /*::[*/
  5: { n: "PtgMul", f: He },
  /*::[*/
  6: { n: "PtgDiv", f: He },
  /*::[*/
  7: { n: "PtgPower", f: He },
  /*::[*/
  8: { n: "PtgConcat", f: He },
  /*::[*/
  9: { n: "PtgLt", f: He },
  /*::[*/
  10: { n: "PtgLe", f: He },
  /*::[*/
  11: { n: "PtgEq", f: He },
  /*::[*/
  12: { n: "PtgGe", f: He },
  /*::[*/
  13: { n: "PtgGt", f: He },
  /*::[*/
  14: { n: "PtgNe", f: He },
  /*::[*/
  15: { n: "PtgIsect", f: He },
  /*::[*/
  16: { n: "PtgUnion", f: He },
  /*::[*/
  17: { n: "PtgRange", f: He },
  /*::[*/
  18: { n: "PtgUplus", f: He },
  /*::[*/
  19: { n: "PtgUminus", f: He },
  /*::[*/
  20: { n: "PtgPercent", f: He },
  /*::[*/
  21: { n: "PtgParen", f: He },
  /*::[*/
  22: { n: "PtgMissArg", f: He },
  /*::[*/
  23: { n: "PtgStr", f: ac },
  /*::[*/
  26: { n: "PtgSheet", f: Dc },
  /*::[*/
  27: { n: "PtgEndSheet", f: Ic },
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
  46: { n: "PtgMemAreaN", f: Rc },
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
  1: { n: "PtgElfLel", f: Di },
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
  32: { n: "PtgAttrBaxcel", f: oa },
  /*::[*/
  33: { n: "PtgAttrBaxcel", f: oa },
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
  if (n.biff < 8) return Mr(e, t);
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
  return t = a - e.l, t !== 0 && i.push(Mr(e, t)), i;
}
function Uc(e, t, r) {
  for (var n = e.l + t, a, i, s = []; n != e.l; )
    t = n - e.l, i = e[e.l], a = ca[i] || ca[Lc[i]], (i === 24 || i === 25) && (a = (i === 24 ? Mc : Bc)[e[e.l + 1]]), !a || !a.f ? Mr(e, t) : s.push([a.n, a.f(e, t, r)]);
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
function Ii(e, t, r) {
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
function ua(e, t, r) {
  var n = Ii(e, t, r);
  return n == "#REF" ? n : Hc(n, r);
}
function St(e, t, r, n, a) {
  var i = a && a.biff || 8, s = (
    /*range != null ? range :*/
    { s: { c: 0, r: 0 } }
  ), f = [], o, l, c, d = 0, x = 0, p, g = "";
  if (!e[0] || !e[0][0]) return "";
  for (var u = -1, _ = "", D = 0, F = e[0].length; D < F; ++D) {
    var C = e[0][D];
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
              _ = Ue(" ", e[0][u][1][1]);
              break;
            case 1:
              _ = Ue("\r", e[0][u][1][1]);
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
        c = Vt(C[1][1], s, a), f.push(Ht(c, i));
        break;
      case "PtgRefN":
        c = r ? Vt(C[1][1], r, a) : C[1][1], f.push(Ht(c, i));
        break;
      case "PtgRef3d":
        d = /*::Number(*/
        C[1][1], c = Vt(C[1][2], s, a), g = ua(n, d, a), f.push(g + "!" + Ht(c, i));
        break;
      case "PtgFunc":
      case "PtgFuncVar":
        var B = C[1][0], Q = C[1][1];
        B || (B = 0), B &= 127;
        var ne = B == 0 ? [] : f.slice(-B);
        f.length -= B, Q === "User" && (Q = ne.shift()), f.push(Q + "(" + ne.join(",") + ")");
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
        p = j0(C[1][1], r ? { s: r } : s, a), f.push(Hn(p, a));
        break;
      case "PtgArea":
        p = j0(C[1][1], s, a), f.push(Hn(p, a));
        break;
      case "PtgArea3d":
        d = /*::Number(*/
        C[1][1], p = C[1][2], g = ua(n, d, a), f.push(g + "!" + Hn(p, a));
        break;
      case "PtgAttrSum":
        f.push("SUM(" + f.pop() + ")");
        break;
      case "PtgAttrBaxcel":
      case "PtgAttrSemi":
        break;
      case "PtgName":
        x = C[1][2];
        var k = (n.names || [])[x - 1] || (n[0] || [])[x], V = k ? k.Name : "SH33TJSNAME" + String(x);
        V && V.slice(0, 6) == "_xlfn." && !a.xlfn && (V = V.slice(6)), f.push(V);
        break;
      case "PtgNameX":
        var N = C[1][1];
        x = C[1][2];
        var b;
        if (a.biff <= 5)
          N < 0 && (N = -N), n[N] && (b = n[N][x]);
        else {
          var K = "";
          if (((n[N] || [])[0] || [])[0] == 14849 || (((n[N] || [])[0] || [])[0] == 1025 ? n[N][x] && n[N][x].itab > 0 && (K = n.SheetNames[n[N][x].itab - 1] + "!") : K = n.SheetNames[x - 1] + "!"), n[N] && n[N][x]) K += n[N][x].Name;
          else if (n[0] && n[0][x]) K += n[0][x].Name;
          else {
            var J = (Ii(n, N, a) || "").split(";;");
            J[x - 1] ? K = J[x - 1] : K += "SH33TJSERRX";
          }
          f.push(K);
          break;
        }
        b || (b = { Name: "SH33TJSERRY" }), f.push(b.Name);
        break;
      case "PtgParen":
        var se = "(", we = ")";
        if (u >= 0) {
          switch (_ = "", e[0][u][1][0]) {
            case 2:
              se = Ue(" ", e[0][u][1][1]) + se;
              break;
            case 3:
              se = Ue("\r", e[0][u][1][1]) + se;
              break;
            case 4:
              we = Ue(" ", e[0][u][1][1]) + we;
              break;
            case 5:
              we = Ue("\r", e[0][u][1][1]) + we;
              break;
            default:
              if (a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][u][1][0]);
          }
          u = -1;
        }
        f.push(se + f.pop() + we);
        break;
      case "PtgRefErr":
        f.push("#REF!");
        break;
      case "PtgRefErr3d":
        f.push("#REF!");
        break;
      case "PtgExp":
        c = { c: C[1][1], r: C[1][0] };
        var de = { c: r.c, r: r.r };
        if (n.sharedf[Ce(c)]) {
          var Ne = n.sharedf[Ce(c)];
          f.push(St(Ne, s, de, n, a));
        } else {
          var De = !1;
          for (o = 0; o != n.arrayf.length; ++o)
            if (l = n.arrayf[o], !(c.c < l[0].s.c || c.c > l[0].e.c) && !(c.r < l[0].s.r || c.r > l[0].e.r)) {
              f.push(St(l[1], s, de, n, a)), De = !0;
              break;
            }
          De || f.push(
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
        u = D;
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
    var Be = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
    if (a.biff != 3 && u >= 0 && Be.indexOf(e[0][D][0]) == -1) {
      C = e[0][u];
      var Ve = !0;
      switch (C[1][0]) {
        case 4:
          Ve = !1;
        case 0:
          _ = Ue(" ", C[1][1]);
          break;
        case 5:
          Ve = !1;
        case 1:
          _ = Ue("\r", C[1][1]);
          break;
        default:
          if (_ = "", a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + C[1][0]);
      }
      f.push((Ve ? _ : "") + f.pop() + (Ve ? "" : _)), u = -1;
    }
  }
  if (f.length > 1 && a.WTF) throw new Error("bad formula stack");
  return f[0];
}
function Gc(e) {
  if (e == null) {
    var t = U(8);
    return t.write_shift(1, 3), t.write_shift(1, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 65535), t;
  } else if (typeof e == "number") return it(e);
  return it(0);
}
function Xc(e, t, r, n, a) {
  var i = st(t, r, a), s = Gc(e.v), f = U(6), o = 33;
  f.write_shift(2, o), f.write_shift(4, 0);
  for (var l = U(e.bf.length), c = 0; c < e.bf.length; ++c) l[c] = e.bf[c];
  var d = rr([i, s, f, l]);
  return d;
}
function Pn(e, t, r) {
  var n = e.read_shift(4), a = Uc(e, n, r), i = e.read_shift(4), s = i > 0 ? bc(e, i, a, r) : null;
  return [a, s];
}
var $c = Pn, Ln = Pn, zc = Pn, Kc = Pn, Yc = {
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
}, Ri = {
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
  var t = "of:=" + e.replace(p0, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
  return t.replace(/;/g, "|").replace(/,/g, ";");
}
function Zc(e) {
  return e.replace(/\./, "!");
}
var Gt = typeof Map < "u";
function g0(e, t, r) {
  var n = 0, a = e.length;
  if (r) {
    if (Gt ? r.has(t) : Object.prototype.hasOwnProperty.call(r, t)) {
      for (var i = Gt ? r.get(t) : r[t]; n < i.length; ++n)
        if (e[i[n]].t === t)
          return e.Count++, i[n];
    }
  } else for (; n < a; ++n)
    if (e[n].t === t)
      return e.Count++, n;
  return e[a] = { t }, e.Count++, e.Unique++, r && (Gt ? (r.has(t) || r.set(t, []), r.get(t).push(a)) : (Object.prototype.hasOwnProperty.call(r, t) || (r[t] = []), r[t].push(a))), a;
}
function Mn(e, t) {
  var r = { min: e + 1, max: e + 1 }, n = -1;
  return t.MDW && (Vr = t.MDW), t.width != null ? r.customWidth = 1 : t.wpx != null ? n = Fn(t.wpx) : t.wch != null && (n = t.wch), n > -1 ? (r.width = qn(n), r.customWidth = 1) : t.width != null && (r.width = t.width), t.hidden && (r.hidden = !0), t.level != null && (r.outlineLevel = r.level = t.level), r;
}
function Ni(e, t) {
  if (e) {
    var r = [0.7, 0.7, 0.75, 0.75, 0.3, 0.3];
    e.left == null && (e.left = r[0]), e.right == null && (e.right = r[1]), e.top == null && (e.top = r[2]), e.bottom == null && (e.bottom = r[3]), e.header == null && (e.header = r[4]), e.footer == null && (e.footer = r[5]);
  }
}
function Zr(e, t, r) {
  var n = r.revssf[t.z != null ? t.z : "General"], a = 60, i = e.length;
  if (n == null && r.ssf) {
    for (; a < 392; ++a) if (r.ssf[a] == null) {
      Oa(t.z, a), r.ssf[a] = t.z, r.revssf[t.z] = n = a;
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
    var n = Ie(e["!ref"]);
    if (n.e.c < n.s.c || n.e.r < n.s.r) throw new Error("Bad range (" + r + "): " + e["!ref"]);
  }
}
function Qc(e) {
  if (e.length === 0) return "";
  for (var t = '<mergeCells count="' + e.length + '">', r = 0; r != e.length; ++r) t += '<mergeCell ref="' + Ge(e[r]) + '"/>';
  return t + "</mergeCells>";
}
function e1(e, t, r, n, a) {
  var i = !1, s = {}, f = null;
  if (n.bookType !== "xlsx" && t.vbaraw) {
    var o = t.SheetNames[r];
    try {
      t.Workbook && (o = t.Workbook.Sheets[r].CodeName || o);
    } catch {
    }
    i = !0, s.codeName = Kt(ye(o));
  }
  if (e && e["!outline"]) {
    var l = { summaryBelow: 1, summaryRight: 1 };
    e["!outline"].above && (l.summaryBelow = 0), e["!outline"].left && (l.summaryRight = 0), f = (f || "") + ee("outlinePr", null, l);
  }
  !i && !f || (a[a.length] = ee("sheetPr", f, s));
}
var r1 = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"], t1 = [
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
function n1(e) {
  var t = { sheet: 1 };
  return r1.forEach(function(r) {
    e[r] != null && e[r] && (t[r] = "1");
  }), t1.forEach(function(r) {
    e[r] != null && !e[r] && (t[r] = "0");
  }), e.password && (t.password = vi(e.password).toString(16).toUpperCase()), ee("sheetProtection", null, t);
}
function a1(e) {
  return Ni(e), ee("pageMargins", null, e);
}
function i1(e, t) {
  for (var r = ["<cols>"], n, a = 0; a != t.length; ++a)
    (n = t[a]) && (r[r.length] = ee("col", null, Mn(a, n)));
  return r[r.length] = "</cols>", r.join("");
}
function s1(e, t, r, n) {
  var a = typeof e.ref == "string" ? e.ref : Ge(e.ref);
  r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
  var i = r.Workbook.Names, s = Ar(a);
  s.s.r == s.e.r && (s.e.r = Ar(t["!ref"]).e.r, a = Ge(s));
  for (var f = 0; f < i.length; ++f) {
    var o = i[f];
    if (o.Name == "_xlnm._FilterDatabase" && o.Sheet == n) {
      o.Ref = "'" + r.SheetNames[n] + "'!" + a;
      break;
    }
  }
  return f == i.length && i.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + r.SheetNames[n] + "'!" + a }), ee("autoFilter", null, { ref: a });
}
function f1(e, t, r, n) {
  var a = { workbookViewId: "0" };
  return (((n || {}).Workbook || {}).Views || [])[0] && (a.rightToLeft = n.Workbook.Views[0].RTL ? "1" : "0"), ee("sheetViews", ee("sheetView", null, a), {});
}
function l1(e, t, r, n) {
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
      a = en[e.v];
      break;
    case "d":
      n && n.cellDates ? a = hr(e.v, -1).toISOString() : (e = gr(e), e.t = "n", a = "" + (e.v = mr(hr(e.v)))), typeof e.z > "u" && (e.z = We[14]);
      break;
    default:
      a = e.v;
      break;
  }
  var f = tr("v", ye(a)), o = { r: t }, l = Zr(n.cellXfs, e, n);
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
        f = tr("v", "" + g0(n.Strings, e.v, n.revStrings)), o.t = "s";
        break;
      }
      o.t = "str";
      break;
  }
  if (e.t != i && (e.t = i, e.v = s), typeof e.f == "string" && e.f) {
    var c = e.F && e.F.slice(0, t.length) == t ? { t: "array", ref: e.F } : null;
    f = ee("f", ye(e.f), c) + (e.v != null ? f : "");
  }
  return e.l && r["!links"].push([t, e.l]), e.D && (o.cm = 1), ee("c", f, o);
}
function o1(e, t, r, n) {
  var a = [], i = [], s = Ie(e["!ref"]), f = "", o, l = "", c = [], d = 0, x = 0, p = e["!rows"], g = Array.isArray(e), u = { r: l }, _, D = -1;
  for (x = s.s.c; x <= s.e.c; ++x) c[x] = sr(x);
  for (d = s.s.r; d <= s.e.r; ++d) {
    for (i = [], l = nr(d), x = s.s.c; x <= s.e.c; ++x) {
      o = c[x] + l;
      var F = g ? (e[d] || [])[x] : e[o];
      F !== void 0 && (f = l1(F, o, e, t)) != null && i.push(f);
    }
    (i.length > 0 || p && p[d]) && (u = { r: l }, p && p[d] && (_ = p[d], _.hidden && (u.hidden = 1), D = -1, _.hpx ? D = yn(_.hpx) : _.hpt && (D = _.hpt), D > -1 && (u.ht = D, u.customHeight = 1), _.level && (u.outlineLevel = _.level)), a[a.length] = ee("row", i.join(""), u));
  }
  if (p) for (; d < p.length; ++d)
    p && p[d] && (u = { r: d + 1 }, _ = p[d], _.hidden && (u.hidden = 1), D = -1, _.hpx ? D = yn(_.hpx) : _.hpt && (D = _.hpt), D > -1 && (u.ht = D, u.customHeight = 1), _.level && (u.outlineLevel = _.level), a[a.length] = ee("row", "", u));
  return a.join("");
}
function Pi(e, t, r, n) {
  var a = [Xe, ee("worksheet", null, {
    xmlns: At[0],
    "xmlns:r": je.r
  })], i = r.SheetNames[e], s = 0, f = "", o = r.Sheets[i];
  o == null && (o = {});
  var l = o["!ref"] || "A1", c = Ie(l);
  if (c.e.c > 16383 || c.e.r > 1048575) {
    if (t.WTF) throw new Error("Range " + l + " exceeds format limit A1:XFD1048576");
    c.e.c = Math.min(c.e.c, 16383), c.e.r = Math.min(c.e.c, 1048575), l = Ge(c);
  }
  n || (n = {}), o["!comments"] = [];
  var d = [];
  e1(o, r, e, t, a), a[a.length] = ee("dimension", null, { ref: l }), a[a.length] = f1(o, t, e, r), t.sheetFormat && (a[a.length] = ee("sheetFormatPr", null, {
    defaultRowHeight: t.sheetFormat.defaultRowHeight || "16",
    baseColWidth: t.sheetFormat.baseColWidth || "10",
    outlineLevelRow: t.sheetFormat.outlineLevelRow || "7"
  })), o["!cols"] != null && o["!cols"].length > 0 && (a[a.length] = i1(o, o["!cols"])), a[s = a.length] = "<sheetData/>", o["!links"] = [], o["!ref"] != null && (f = o1(o, t), f.length > 0 && (a[a.length] = f)), a.length > s + 1 && (a[a.length] = "</sheetData>", a[s] = a[s].replace("/>", ">")), o["!protect"] && (a[a.length] = n1(o["!protect"])), o["!autofilter"] != null && (a[a.length] = s1(o["!autofilter"], o, r, e)), o["!merges"] != null && o["!merges"].length > 0 && (a[a.length] = Qc(o["!merges"]));
  var x = -1, p, g = -1;
  return (
    /*::(*/
    o["!links"].length > 0 && (a[a.length] = "<hyperlinks>", o["!links"].forEach(function(u) {
      u[1].Target && (p = { ref: u[0] }, u[1].Target.charAt(0) != "#" && (g = Fe(n, -1, ye(u[1].Target).replace(/#.*$/, ""), _e.HLINK), p["r:id"] = "rId" + g), (x = u[1].Target.indexOf("#")) > -1 && (p.location = ye(u[1].Target.slice(x + 1))), u[1].Tooltip && (p.tooltip = ye(u[1].Tooltip)), a[a.length] = ee("hyperlink", null, p));
    }), a[a.length] = "</hyperlinks>"), delete o["!links"], o["!margins"] != null && (a[a.length] = a1(o["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && (a[a.length] = tr("ignoredErrors", ee("ignoredError", null, { numberStoredAsText: 1, sqref: l }))), d.length > 0 && (g = Fe(n, -1, "../drawings/drawing" + (e + 1) + ".xml", _e.DRAW), a[a.length] = ee("drawing", null, { "r:id": "rId" + g }), o["!drawing"] = d), o["!comments"].length > 0 && (g = Fe(n, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", _e.VML), a[a.length] = ee("legacyDrawing", null, { "r:id": "rId" + g }), o["!legacy"] = g), a.length > 1 && (a[a.length] = "</worksheet>", a[1] = a[1].replace("/>", ">")), a.join("")
  );
}
function c1(e, t) {
  var r = {}, n = e.l + t;
  r.r = e.read_shift(4), e.l += 4;
  var a = e.read_shift(2);
  e.l += 1;
  var i = e.read_shift(1);
  return e.l = n, i & 7 && (r.level = i & 7), i & 16 && (r.hidden = !0), i & 32 && (r.hpt = a / 20), r;
}
function u1(e, t, r) {
  var n = U(145), a = (r["!rows"] || [])[e] || {};
  n.write_shift(4, e), n.write_shift(4, 0);
  var i = 320;
  a.hpx ? i = yn(a.hpx) * 20 : a.hpt && (i = a.hpt * 20), n.write_shift(2, i), n.write_shift(1, 0);
  var s = 0;
  a.level && (s |= a.level), a.hidden && (s |= 16), (a.hpx || a.hpt) && (s |= 32), n.write_shift(1, s), n.write_shift(1, 0);
  var f = 0, o = n.l;
  n.l += 4;
  for (var l = { r: e, c: 0 }, c = 0; c < 16; ++c)
    if (!(t.s.c > c + 1 << 10 || t.e.c < c << 10)) {
      for (var d = -1, x = -1, p = c << 10; p < c + 1 << 10; ++p) {
        l.c = p;
        var g = Array.isArray(r) ? (r[l.r] || [])[l.c] : r[Ce(l)];
        g && (d < 0 && (d = p), x = p);
      }
      d < 0 || (++f, n.write_shift(4, d), n.write_shift(4, x));
    }
  var u = n.l;
  return n.l = o, n.write_shift(4, f), n.l = u, n.length > n.l ? n.slice(0, n.l) : n;
}
function h1(e, t, r, n) {
  var a = u1(n, r, t);
  (a.length > 17 || (t["!rows"] || [])[n]) && G(e, 0, a);
}
var x1 = ut, d1 = yt;
function p1() {
}
function v1(e, t) {
  var r = {}, n = e[e.l];
  return ++e.l, r.above = !(n & 64), r.left = !(n & 128), e.l += 18, r.name = Ff(e), r;
}
function m1(e, t, r) {
  r == null && (r = U(84 + 4 * e.length));
  var n = 192;
  t && (t.above && (n &= -65), t.left && (n &= -129)), r.write_shift(1, n);
  for (var a = 1; a < 3; ++a) r.write_shift(1, 0);
  return wn({ auto: 1 }, r), r.write_shift(-4, -1), r.write_shift(-4, -1), ja(e, r), r.slice(0, r.l);
}
function g1(e) {
  var t = Cr(e);
  return [t];
}
function _1(e, t, r) {
  return r == null && (r = U(8)), lt(t, r);
}
function T1(e) {
  var t = ot(e);
  return [t];
}
function E1(e, t, r) {
  return r == null && (r = U(4)), ct(t, r);
}
function w1(e) {
  var t = Cr(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function S1(e, t, r) {
  return r == null && (r = U(9)), lt(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function A1(e) {
  var t = ot(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function F1(e, t, r) {
  return r == null && (r = U(5)), ct(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function y1(e) {
  var t = Cr(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function C1(e, t, r) {
  return r == null && (r = U(9)), lt(t, r), r.write_shift(1, e.v), r;
}
function O1(e) {
  var t = ot(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function k1(e, t, r) {
  return r == null && (r = U(8)), ct(t, r), r.write_shift(1, e.v), r.write_shift(2, 0), r.write_shift(1, 0), r;
}
function D1(e) {
  var t = Cr(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function I1(e, t, r) {
  return r == null && (r = U(12)), lt(t, r), r.write_shift(4, t.v), r;
}
function R1(e) {
  var t = ot(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function N1(e, t, r) {
  return r == null && (r = U(8)), ct(t, r), r.write_shift(4, t.v), r;
}
function P1(e) {
  var t = Cr(e), r = Ct(e);
  return [t, r, "n"];
}
function L1(e, t, r) {
  return r == null && (r = U(16)), lt(t, r), it(e.v, r), r;
}
function M1(e) {
  var t = ot(e), r = Ct(e);
  return [t, r, "n"];
}
function B1(e, t, r) {
  return r == null && (r = U(12)), ct(t, r), it(e.v, r), r;
}
function b1(e) {
  var t = Cr(e), r = Ja(e);
  return [t, r, "n"];
}
function U1(e, t, r) {
  return r == null && (r = U(12)), lt(t, r), Za(e.v, r), r;
}
function W1(e) {
  var t = ot(e), r = Ja(e);
  return [t, r, "n"];
}
function V1(e, t, r) {
  return r == null && (r = U(8)), ct(t, r), Za(e.v, r), r;
}
function H1(e) {
  var t = Cr(e), r = c0(e);
  return [t, r, "is"];
}
function G1(e) {
  var t = Cr(e), r = fr(e);
  return [t, r, "str"];
}
function X1(e, t, r) {
  return r == null && (r = U(12 + 4 * e.v.length)), lt(t, r), Ze(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function $1(e) {
  var t = ot(e), r = fr(e);
  return [t, r, "str"];
}
function z1(e, t, r) {
  return r == null && (r = U(8 + 4 * e.v.length)), ct(t, r), Ze(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function K1(e, t, r) {
  var n = e.l + t, a = Cr(e);
  a.r = r["!row"];
  var i = e.read_shift(1), s = [a, i, "b"];
  if (r.cellFormula) {
    e.l += 2;
    var f = Ln(e, n - e.l, r);
    s[3] = St(f, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
function Y1(e, t, r) {
  var n = e.l + t, a = Cr(e);
  a.r = r["!row"];
  var i = e.read_shift(1), s = [a, i, "e"];
  if (r.cellFormula) {
    e.l += 2;
    var f = Ln(e, n - e.l, r);
    s[3] = St(f, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
function j1(e, t, r) {
  var n = e.l + t, a = Cr(e);
  a.r = r["!row"];
  var i = Ct(e), s = [a, i, "n"];
  if (r.cellFormula) {
    e.l += 2;
    var f = Ln(e, n - e.l, r);
    s[3] = St(f, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
function J1(e, t, r) {
  var n = e.l + t, a = Cr(e);
  a.r = r["!row"];
  var i = fr(e), s = [a, i, "str"];
  if (r.cellFormula) {
    e.l += 2;
    var f = Ln(e, n - e.l, r);
    s[3] = St(f, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
var Z1 = ut, q1 = yt;
function Q1(e, t) {
  return t == null && (t = U(4)), t.write_shift(4, e), t;
}
function eu(e, t) {
  var r = e.l + t, n = ut(e), a = u0(e), i = fr(e), s = fr(e), f = fr(e);
  e.l = r;
  var o = { rfx: n, relId: a, loc: i, display: f };
  return s && (o.Tooltip = s), o;
}
function ru(e, t) {
  var r = U(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
  yt({ s: Je(e[0]), e: Je(e[0]) }, r), h0("rId" + t, r);
  var n = e[1].Target.indexOf("#"), a = n == -1 ? "" : e[1].Target.slice(n + 1);
  return Ze(a || "", r), Ze(e[1].Tooltip || "", r), Ze("", r), r.slice(0, r.l);
}
function tu() {
}
function nu(e, t, r) {
  var n = e.l + t, a = qa(e), i = e.read_shift(1), s = [a];
  if (s[2] = i, r.cellFormula) {
    var f = $c(e, n - e.l, r);
    s[1] = f;
  } else e.l = n;
  return s;
}
function au(e, t, r) {
  var n = e.l + t, a = ut(e), i = [a];
  if (r.cellFormula) {
    var s = Kc(e, n - e.l, r);
    i[1] = s, e.l = n;
  } else e.l = n;
  return i;
}
function iu(e, t, r) {
  r == null && (r = U(18));
  var n = Mn(e, t);
  r.write_shift(-4, e), r.write_shift(-4, e), r.write_shift(4, (n.width || 10) * 256), r.write_shift(
    4,
    0
    /*ixfe*/
  );
  var a = 0;
  return t.hidden && (a |= 1), typeof n.width == "number" && (a |= 2), t.level && (a |= t.level << 8), r.write_shift(2, a), r;
}
var Li = ["left", "right", "top", "bottom", "header", "footer"];
function su(e) {
  var t = {};
  return Li.forEach(function(r) {
    t[r] = Ct(e);
  }), t;
}
function fu(e, t) {
  return t == null && (t = U(6 * 8)), Ni(e), Li.forEach(function(r) {
    it(e[r], t);
  }), t;
}
function lu(e) {
  var t = e.read_shift(2);
  return e.l += 28, { RTL: t & 32 };
}
function ou(e, t, r) {
  r == null && (r = U(30));
  var n = 924;
  return (((t || {}).Views || [])[0] || {}).RTL && (n |= 32), r.write_shift(2, n), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(2, 0), r.write_shift(2, 100), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(4, 0), r;
}
function cu(e) {
  var t = U(24);
  return t.write_shift(4, 4), t.write_shift(4, 1), yt(e, t), t;
}
function uu(e, t) {
  return t == null && (t = U(16 * 4 + 2)), t.write_shift(2, e.password ? vi(e.password) : 0), t.write_shift(4, 1), [
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
function hu() {
}
function xu() {
}
function du(e, t, r, n, a, i, s) {
  if (t.v === void 0) return !1;
  var f = "";
  switch (t.t) {
    case "b":
      f = t.v ? "1" : "0";
      break;
    case "d":
      t = gr(t), t.z = t.z || We[14], t.v = mr(hr(t.v)), t.t = "n";
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
  switch (o.s = Zr(a.cellXfs, t, a), t.l && i["!links"].push([Ce(o), t.l]), t.c && i["!comments"].push([Ce(o), t.c]), t.t) {
    case "s":
    case "str":
      return a.bookSST ? (f = g0(a.Strings, t.v, a.revStrings), o.t = "s", o.v = f, s ? G(e, 18, N1(t, o)) : G(e, 7, I1(t, o))) : (o.t = "str", s ? G(e, 17, z1(t, o)) : G(e, 6, X1(t, o))), !0;
    case "n":
      return t.v == (t.v | 0) && t.v > -1e3 && t.v < 1e3 ? s ? G(e, 13, V1(t, o)) : G(e, 2, U1(t, o)) : s ? G(e, 16, B1(t, o)) : G(e, 5, L1(t, o)), !0;
    case "b":
      return o.t = "b", s ? G(e, 15, F1(t, o)) : G(e, 4, S1(t, o)), !0;
    case "e":
      return o.t = "e", s ? G(e, 14, k1(t, o)) : G(e, 3, C1(t, o)), !0;
  }
  return s ? G(e, 12, E1(t, o)) : G(e, 1, _1(t, o)), !0;
}
function pu(e, t, r, n) {
  var a = Ie(t["!ref"] || "A1"), i, s = "", f = [];
  G(
    e,
    145
    /* BrtBeginSheetData */
  );
  var o = Array.isArray(t), l = a.e.r;
  t["!rows"] && (l = Math.max(a.e.r, t["!rows"].length - 1));
  for (var c = a.s.r; c <= l; ++c) {
    s = nr(c), h1(e, t, a, c);
    var d = !1;
    if (c <= a.e.r) for (var x = a.s.c; x <= a.e.c; ++x) {
      c === a.s.r && (f[x] = sr(x)), i = f[x] + s;
      var p = o ? (t[c] || [])[x] : t[i];
      if (!p) {
        d = !1;
        continue;
      }
      d = du(e, p, c, x, n, t, d);
    }
  }
  G(
    e,
    146
    /* BrtEndSheetData */
  );
}
function vu(e, t) {
  !t || !t["!merges"] || (G(e, 177, Q1(t["!merges"].length)), t["!merges"].forEach(function(r) {
    G(e, 176, q1(r));
  }), G(
    e,
    178
    /* BrtEndMergeCells */
  ));
}
function mu(e, t) {
  !t || !t["!cols"] || (G(
    e,
    390
    /* BrtBeginColInfos */
  ), t["!cols"].forEach(function(r, n) {
    r && G(e, 60, iu(n, r));
  }), G(
    e,
    391
    /* BrtEndColInfos */
  ));
}
function gu(e, t) {
  !t || !t["!ref"] || (G(
    e,
    648
    /* BrtBeginCellIgnoreECs */
  ), G(e, 649, cu(Ie(t["!ref"]))), G(
    e,
    650
    /* BrtEndCellIgnoreECs */
  ));
}
function _u(e, t, r) {
  t["!links"].forEach(function(n) {
    if (n[1].Target) {
      var a = Fe(r, -1, n[1].Target.replace(/#.*$/, ""), _e.HLINK);
      G(e, 494, ru(n, a));
    }
  }), delete t["!links"];
}
function Tu(e, t, r, n) {
  if (t["!comments"].length > 0) {
    var a = Fe(n, -1, "../drawings/vmlDrawing" + (r + 1) + ".vml", _e.VML);
    G(e, 551, h0("rId" + a)), t["!legacy"] = a;
  }
}
function Eu(e, t, r, n) {
  if (t["!autofilter"]) {
    var a = t["!autofilter"], i = typeof a.ref == "string" ? a.ref : Ge(a.ref);
    r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
    var s = r.Workbook.Names, f = Ar(i);
    f.s.r == f.e.r && (f.e.r = Ar(t["!ref"]).e.r, i = Ge(f));
    for (var o = 0; o < s.length; ++o) {
      var l = s[o];
      if (l.Name == "_xlnm._FilterDatabase" && l.Sheet == n) {
        l.Ref = "'" + r.SheetNames[n] + "'!" + i;
        break;
      }
    }
    o == s.length && s.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + r.SheetNames[n] + "'!" + i }), G(e, 161, yt(Ie(i))), G(
      e,
      162
      /* BrtEndAFilter */
    );
  }
}
function wu(e, t, r) {
  G(
    e,
    133
    /* BrtBeginWsViews */
  ), G(e, 137, ou(t, r)), G(
    e,
    138
    /* BrtEndWsView */
  ), G(
    e,
    134
    /* BrtEndWsViews */
  );
}
function Su(e, t) {
  t["!protect"] && G(e, 535, uu(t["!protect"]));
}
function Au(e, t, r, n) {
  var a = vr(), i = r.SheetNames[e], s = r.Sheets[i] || {}, f = i;
  try {
    r && r.Workbook && (f = r.Workbook.Sheets[e].CodeName || f);
  } catch {
  }
  var o = Ie(s["!ref"] || "A1");
  if (o.e.c > 16383 || o.e.r > 1048575) {
    if (t.WTF) throw new Error("Range " + (s["!ref"] || "A1") + " exceeds format limit A1:XFD1048576");
    o.e.c = Math.min(o.e.c, 16383), o.e.r = Math.min(o.e.c, 1048575);
  }
  return s["!links"] = [], s["!comments"] = [], G(
    a,
    129
    /* BrtBeginSheet */
  ), (r.vbaraw || s["!outline"]) && G(a, 147, m1(f, s["!outline"])), G(a, 148, d1(o)), wu(a, s, r.Workbook), mu(a, s), pu(a, s, e, t), Su(a, s), Eu(a, s, r, e), vu(a, s), _u(a, s, n), s["!margins"] && G(a, 476, fu(s["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && gu(a, s), Tu(a, s, e, n), G(
    a,
    130
    /* BrtEndSheet */
  ), a.end();
}
function Fu(e, t) {
  e.l += 10;
  var r = fr(e);
  return { name: r };
}
var yu = [
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
function Cu(e) {
  return !e.Workbook || !e.Workbook.WBProps ? "false" : tf(e.Workbook.WBProps.date1904) ? "true" : "false";
}
var Ou = /* @__PURE__ */ "][*?/\\".split("");
function Mi(e, t) {
  if (e.length > 31)
    throw new Error("Sheet names cannot exceed 31 chars");
  var r = !0;
  return Ou.forEach(function(n) {
    if (e.indexOf(n) != -1)
      throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
  }), r;
}
function ku(e, t, r) {
  e.forEach(function(n, a) {
    Mi(n);
    for (var i = 0; i < a; ++i) if (n == e[i]) throw new Error("Duplicate Sheet Name: " + n);
    if (r) {
      var s = t && t[a] && t[a].CodeName || n;
      if (s.charCodeAt(0) == 95 && s.length > 22) throw new Error("Bad Code Name: Worksheet" + s);
    }
  });
}
function Du(e) {
  if (!e || !e.SheetNames || !e.Sheets) throw new Error("Invalid Workbook");
  if (!e.SheetNames.length) throw new Error("Workbook is empty");
  var t = e.Workbook && e.Workbook.Sheets || [];
  ku(e.SheetNames, t, !!e.vbaraw);
  for (var r = 0; r < e.SheetNames.length; ++r) qc(e.Sheets[e.SheetNames[r]], e.SheetNames[r], r);
}
function Bi(e) {
  var t = [Xe];
  t[t.length] = ee("workbook", null, {
    xmlns: At[0],
    //'xmlns:mx': XMLNS.mx,
    //'xmlns:s': XMLNS_main[0],
    "xmlns:r": je.r
  });
  var r = e.Workbook && (e.Workbook.Names || []).length > 0, n = { codeName: "ThisWorkbook" };
  e.Workbook && e.Workbook.WBProps && (yu.forEach(function(f) {
    e.Workbook.WBProps[f[0]] != null && e.Workbook.WBProps[f[0]] != f[1] && (n[f[0]] = e.Workbook.WBProps[f[0]]);
  }), e.Workbook.WBProps.CodeName && (n.codeName = e.Workbook.WBProps.CodeName, delete n.CodeName)), t[t.length] = ee("workbookPr", null, n);
  var a = e.Workbook && e.Workbook.Sheets || [], i = 0;
  if (a && a[0] && a[0].Hidden) {
    for (t[t.length] = "<bookViews>", i = 0; i != e.SheetNames.length && !(!a[i] || !a[i].Hidden); ++i)
      ;
    i == e.SheetNames.length && (i = 0), t[t.length] = '<workbookView firstSheet="' + i + '" activeTab="' + i + '"/>', t[t.length] = "</bookViews>";
  }
  for (t[t.length] = "<sheets>", i = 0; i != e.SheetNames.length; ++i) {
    var s = { name: ye(e.SheetNames[i].slice(0, 31)) };
    if (s.sheetId = "" + (i + 1), s["r:id"] = "rId" + (i + 1), a[i]) switch (a[i].Hidden) {
      case 1:
        s.state = "hidden";
        break;
      case 2:
        s.state = "veryHidden";
        break;
    }
    t[t.length] = ee("sheet", null, s);
  }
  return t[t.length] = "</sheets>", r && (t[t.length] = "<definedNames>", e.Workbook && e.Workbook.Names && e.Workbook.Names.forEach(function(f) {
    var o = { name: f.Name };
    f.Comment && (o.comment = f.Comment), f.Sheet != null && (o.localSheetId = "" + f.Sheet), f.Hidden && (o.hidden = "1"), f.Ref && (t[t.length] = ee("definedName", ye(f.Ref), o));
  }), t[t.length] = "</definedNames>"), t.length > 2 && (t[t.length] = "</workbook>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function Iu(e, t) {
  var r = {};
  return r.Hidden = e.read_shift(4), r.iTabID = e.read_shift(4), r.strRelID = Zn(e), r.name = fr(e), r;
}
function Ru(e, t) {
  return t || (t = U(127)), t.write_shift(4, e.Hidden), t.write_shift(4, e.iTabID), h0(e.strRelID, t), Ze(e.name.slice(0, 31), t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Nu(e, t) {
  var r = {}, n = e.read_shift(4);
  r.defaultThemeVersion = e.read_shift(4);
  var a = t > 8 ? fr(e) : "";
  return a.length > 0 && (r.CodeName = a), r.autoCompressPictures = !!(n & 65536), r.backupFile = !!(n & 64), r.checkCompatibility = !!(n & 4096), r.date1904 = !!(n & 1), r.filterPrivacy = !!(n & 8), r.hidePivotFieldList = !!(n & 1024), r.promptedSolutions = !!(n & 16), r.publishItems = !!(n & 2048), r.refreshAllConnections = !!(n & 262144), r.saveExternalLinkValues = !!(n & 128), r.showBorderUnselectedTables = !!(n & 4), r.showInkAnnotation = !!(n & 32), r.showObjects = ["all", "placeholders", "none"][n >> 13 & 3], r.showPivotChartFilter = !!(n & 32768), r.updateLinks = ["userSet", "never", "always"][n >> 8 & 3], r;
}
function Pu(e, t) {
  t || (t = U(72));
  var r = 0;
  return e && e.filterPrivacy && (r |= 8), t.write_shift(4, r), t.write_shift(4, 0), ja(e && e.CodeName || "ThisWorkbook", t), t.slice(0, t.l);
}
function Lu(e, t, r) {
  var n = e.l + t;
  e.l += 4, e.l += 1;
  var a = e.read_shift(4), i = yf(e), s = zc(e, 0, r), f = u0(e);
  e.l = n;
  var o = { Name: i, Ptg: s };
  return a < 268435455 && (o.Sheet = a), f && (o.Comment = f), o;
}
function Mu(e, t) {
  G(
    e,
    143
    /* BrtBeginBundleShs */
  );
  for (var r = 0; r != t.SheetNames.length; ++r) {
    var n = t.Workbook && t.Workbook.Sheets && t.Workbook.Sheets[r] && t.Workbook.Sheets[r].Hidden || 0, a = { Hidden: n, iTabID: r + 1, strRelID: "rId" + (r + 1), name: t.SheetNames[r] };
    G(e, 156, Ru(a));
  }
  G(
    e,
    144
    /* BrtEndBundleShs */
  );
}
function Bu(e, t) {
  t || (t = U(127));
  for (var r = 0; r != 4; ++r) t.write_shift(4, 0);
  return Ze("SheetJS", t), Ze(dn.version, t), Ze(dn.version, t), Ze("7262", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function bu(e, t) {
  t || (t = U(29)), t.write_shift(-4, 0), t.write_shift(-4, 460), t.write_shift(4, 28800), t.write_shift(4, 17600), t.write_shift(4, 500), t.write_shift(4, e), t.write_shift(4, e);
  var r = 120;
  return t.write_shift(1, r), t.length > t.l ? t.slice(0, t.l) : t;
}
function Uu(e, t) {
  if (!(!t.Workbook || !t.Workbook.Sheets)) {
    for (var r = t.Workbook.Sheets, n = 0, a = -1, i = -1; n < r.length; ++n)
      !r[n] || !r[n].Hidden && a == -1 ? a = n : r[n].Hidden == 1 && i == -1 && (i = n);
    i > a || (G(
      e,
      135
      /* BrtBeginBookViews */
    ), G(e, 158, bu(a)), G(
      e,
      136
      /* BrtEndBookViews */
    ));
  }
}
function Wu(e, t) {
  var r = vr();
  return G(
    r,
    131
    /* BrtBeginBook */
  ), G(r, 128, Bu()), G(r, 153, Pu(e.Workbook && e.Workbook.WBProps || null)), Uu(r, e), Mu(r, e), G(
    r,
    132
    /* BrtEndBook */
  ), r.end();
}
function Vu(e, t, r) {
  return (t.slice(-4) === ".bin" ? Wu : Bi)(e);
}
function Hu(e, t, r, n, a) {
  return (t.slice(-4) === ".bin" ? Au : Pi)(e, r, n, a);
}
function Gu(e, t, r) {
  return (t.slice(-4) === ".bin" ? so : _i)(e, r);
}
function Xu(e, t, r) {
  return (t.slice(-4) === ".bin" ? Nl : pi)(e, r);
}
function $u(e, t, r) {
  return (t.slice(-4) === ".bin" ? So : Ai)(e);
}
function zu(e) {
  return (e.slice(-4) === ".bin" ? po : wi)();
}
function Ku(e, t) {
  var r = [];
  return e.Props && r.push(Hf(e.Props, t)), e.Custprops && r.push(Gf(e.Props, e.Custprops)), r.join("");
}
function Yu() {
  return "";
}
function ju(e, t) {
  var r = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
  return t.cellXfs.forEach(function(n, a) {
    var i = [];
    i.push(ee("NumberFormat", null, { "ss:Format": ye(We[n.numFmtId]) }));
    var s = (
      /*::(*/
      { "ss:ID": "s" + (21 + a) }
    );
    r.push(ee("Style", i.join(""), s));
  }), ee("Styles", r.join(""));
}
function bi(e) {
  return ee("NamedRange", null, { "ss:Name": e.Name, "ss:RefersTo": "=" + v0(e.Ref, { r: 0, c: 0 }) });
}
function Ju(e) {
  if (!((e || {}).Workbook || {}).Names) return "";
  for (var t = e.Workbook.Names, r = [], n = 0; n < t.length; ++n) {
    var a = t[n];
    a.Sheet == null && (a.Name.match(/^_xlfn\./) || r.push(bi(a)));
  }
  return ee("Names", r.join(""));
}
function Zu(e, t, r, n) {
  if (!e || !((n || {}).Workbook || {}).Names) return "";
  for (var a = n.Workbook.Names, i = [], s = 0; s < a.length; ++s) {
    var f = a[s];
    f.Sheet == r && (f.Name.match(/^_xlfn\./) || i.push(bi(f)));
  }
  return i.join("");
}
function qu(e, t, r, n) {
  if (!e) return "";
  var a = [];
  if (e["!margins"] && (a.push("<PageSetup>"), e["!margins"].header && a.push(ee("Header", null, { "x:Margin": e["!margins"].header })), e["!margins"].footer && a.push(ee("Footer", null, { "x:Margin": e["!margins"].footer })), a.push(ee("PageMargins", null, {
    "x:Bottom": e["!margins"].bottom || "0.75",
    "x:Left": e["!margins"].left || "0.7",
    "x:Right": e["!margins"].right || "0.7",
    "x:Top": e["!margins"].top || "0.75"
  })), a.push("</PageSetup>")), n && n.Workbook && n.Workbook.Sheets && n.Workbook.Sheets[r])
    if (n.Workbook.Sheets[r].Hidden) a.push(ee("Visible", n.Workbook.Sheets[r].Hidden == 1 ? "SheetHidden" : "SheetVeryHidden", {}));
    else {
      for (var i = 0; i < r && !(n.Workbook.Sheets[i] && !n.Workbook.Sheets[i].Hidden); ++i) ;
      i == r && a.push("<Selected/>");
    }
  return ((((n || {}).Workbook || {}).Views || [])[0] || {}).RTL && a.push("<DisplayRightToLeft/>"), e["!protect"] && (a.push(tr("ProtectContents", "True")), e["!protect"].objects && a.push(tr("ProtectObjects", "True")), e["!protect"].scenarios && a.push(tr("ProtectScenarios", "True")), e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells ? a.push(tr("EnableSelection", "NoSelection")) : e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells && a.push(tr("EnableSelection", "UnlockedCells")), [
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
  })), a.length == 0 ? "" : ee("WorksheetOptions", a.join(""), { xmlns: wr.x });
}
function Qu(e) {
  return e.map(function(t) {
    var r = rf(t.t || ""), n = ee("ss:Data", r, { xmlns: "http://www.w3.org/TR/REC-html40" });
    return ee("Comment", n, { "ss:Author": t.a });
  }).join("");
}
function eh(e, t, r, n, a, i, s) {
  if (!e || e.v == null && e.f == null) return "";
  var f = {};
  if (e.f && (f["ss:Formula"] = "=" + ye(v0(e.f, s))), e.F && e.F.slice(0, t.length) == t) {
    var o = Je(e.F.slice(t.length + 1));
    f["ss:ArrayRange"] = "RC:R" + (o.r == s.r ? "" : "[" + (o.r - s.r) + "]") + "C" + (o.c == s.c ? "" : "[" + (o.c - s.c) + "]");
  }
  if (e.l && e.l.Target && (f["ss:HRef"] = ye(e.l.Target), e.l.Tooltip && (f["x:HRefScreenTip"] = ye(e.l.Tooltip))), r["!merges"])
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
      d = "Error", x = en[e.v];
      break;
    case "d":
      d = "DateTime", x = new Date(e.v).toISOString(), e.z == null && (e.z = e.z || We[14]);
      break;
    case "s":
      d = "String", x = ef(e.v || "");
      break;
  }
  var p = Zr(n.cellXfs, e, n);
  f["ss:StyleID"] = "s" + (21 + p), f["ss:Index"] = s.c + 1;
  var g = e.v != null ? x : "", u = e.t == "z" ? "" : '<Data ss:Type="' + d + '">' + g + "</Data>";
  return (e.c || []).length > 0 && (u += Qu(e.c)), ee("Cell", u, f);
}
function rh(e, t) {
  var r = '<Row ss:Index="' + (e + 1) + '"';
  return t && (t.hpt && !t.hpx && (t.hpx = gi(t.hpt)), t.hpx && (r += ' ss:AutoFitHeight="0" ss:Height="' + t.hpx + '"'), t.hidden && (r += ' ss:Hidden="1"')), r + ">";
}
function th(e, t, r, n) {
  if (!e["!ref"]) return "";
  var a = Ie(e["!ref"]), i = e["!merges"] || [], s = 0, f = [];
  e["!cols"] && e["!cols"].forEach(function(_, D) {
    d0(_);
    var F = !!_.width, C = Mn(D, _), B = { "ss:Index": D + 1 };
    F && (B["ss:Width"] = An(C.width)), _.hidden && (B["ss:Hidden"] = "1"), f.push(ee("Column", null, B));
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
        var p = { r: l, c: d }, g = Ce(p), u = o ? (e[l] || [])[d] : e[g];
        c.push(eh(u, g, e, t, r, n, p));
      }
    }
    c.push("</Row>"), c.length > 2 && f.push(c.join(""));
  }
  return f.join("");
}
function nh(e, t, r) {
  var n = [], a = r.SheetNames[e], i = r.Sheets[a], s = i ? Zu(i, t, e, r) : "";
  return s.length > 0 && n.push("<Names>" + s + "</Names>"), s = i ? th(i, t, e, r) : "", s.length > 0 && n.push("<Table>" + s + "</Table>"), n.push(qu(i, t, e, r)), n.join("");
}
function ah(e, t) {
  t || (t = {}), e.SSF || (e.SSF = gr(We)), e.SSF && (In(), Dn(e.SSF), t.revssf = Rn(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF, t.cellXfs = [], Zr(t.cellXfs, {}, { revssf: { General: 0 } }));
  var r = [];
  r.push(Ku(e, t)), r.push(Yu()), r.push(""), r.push("");
  for (var n = 0; n < e.SheetNames.length; ++n)
    r.push(ee("Worksheet", nh(n, t, e), { "ss:Name": ye(e.SheetNames[n]) }));
  return r[2] = ju(e, t), r[3] = Ju(e), Xe + ee("Workbook", r.join(""), {
    xmlns: wr.ss,
    "xmlns:o": wr.o,
    "xmlns:x": wr.x,
    "xmlns:ss": wr.ss,
    "xmlns:dt": wr.dt,
    "xmlns:html": wr.html
  });
}
var $n = {
  SI: "e0859ff2f94f6810ab9108002b27b3d9",
  DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
  UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
};
function ih(e, t) {
  var r = [], n = [], a = [], i = 0, s, f = b0(Z0, "n"), o = b0(q0, "n");
  if (e.Props)
    for (s = ar(e.Props), i = 0; i < s.length; ++i) (Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(o, s[i]) ? n : a).push([s[i], e.Props[s[i]]]);
  if (e.Custprops)
    for (s = ar(e.Custprops), i = 0; i < s.length; ++i) Object.prototype.hasOwnProperty.call(e.Props || {}, s[i]) || (Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(o, s[i]) ? n : a).push([s[i], e.Custprops[s[i]]]);
  var l = [];
  for (i = 0; i < a.length; ++i)
    li.indexOf(a[i][0]) > -1 || ii.indexOf(a[i][0]) > -1 || a[i][1] != null && l.push(a[i]);
  n.length && Oe.utils.cfb_add(t, "/SummaryInformation", na(n, $n.SI, o, q0)), (r.length || l.length) && Oe.utils.cfb_add(t, "/DocumentSummaryInformation", na(r, $n.DSI, f, Z0, l.length ? l : null, $n.UDI));
}
function sh(e, t) {
  var r = t || {}, n = Oe.utils.cfb_new({ root: "R" }), a = "/Workbook";
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
  return Oe.utils.cfb_add(n, a, Ui(e, r)), r.biff == 8 && (e.Props || e.Custprops) && ih(e, n), r.biff == 8 && e.vbaraw && Ao(n, Oe.read(e.vbaraw, { type: typeof e.vbaraw == "string" ? "binary" : "buffer" })), n;
}
var fh = {
  /*::[*/
  0: {
    /* n:"BrtRowHdr", */
    f: c1
  },
  /*::[*/
  1: {
    /* n:"BrtCellBlank", */
    f: g1
  },
  /*::[*/
  2: {
    /* n:"BrtCellRk", */
    f: b1
  },
  /*::[*/
  3: {
    /* n:"BrtCellError", */
    f: y1
  },
  /*::[*/
  4: {
    /* n:"BrtCellBool", */
    f: w1
  },
  /*::[*/
  5: {
    /* n:"BrtCellReal", */
    f: P1
  },
  /*::[*/
  6: {
    /* n:"BrtCellSt", */
    f: G1
  },
  /*::[*/
  7: {
    /* n:"BrtCellIsst", */
    f: D1
  },
  /*::[*/
  8: {
    /* n:"BrtFmlaString", */
    f: J1
  },
  /*::[*/
  9: {
    /* n:"BrtFmlaNum", */
    f: j1
  },
  /*::[*/
  10: {
    /* n:"BrtFmlaBool", */
    f: K1
  },
  /*::[*/
  11: {
    /* n:"BrtFmlaError", */
    f: Y1
  },
  /*::[*/
  12: {
    /* n:"BrtShortBlank", */
    f: T1
  },
  /*::[*/
  13: {
    /* n:"BrtShortRk", */
    f: W1
  },
  /*::[*/
  14: {
    /* n:"BrtShortError", */
    f: O1
  },
  /*::[*/
  15: {
    /* n:"BrtShortBool", */
    f: A1
  },
  /*::[*/
  16: {
    /* n:"BrtShortReal", */
    f: M1
  },
  /*::[*/
  17: {
    /* n:"BrtShortSt", */
    f: $1
  },
  /*::[*/
  18: {
    /* n:"BrtShortIsst", */
    f: R1
  },
  /*::[*/
  19: {
    /* n:"BrtSSTItem", */
    f: c0
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
    f: Lu
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
    f: H1
  },
  /*::[*/
  63: {
    /* n:"BrtCalcChainItem$", */
    f: vo
  },
  /*::[*/
  64: {
    /* n:"BrtDVal", */
    f: hu
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
    f: Mr,
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
    f: lu
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
    f: v1
  },
  /*::[*/
  148: {
    /* n:"BrtWsDim", */
    f: x1,
    p: 16
  },
  /*::[*/
  151: {
    /* n:"BrtPane", */
    f: tu
  },
  /*::[*/
  152: {
    /* n:"BrtSel" */
  },
  /*::[*/
  153: {
    /* n:"BrtWbProp", */
    f: Nu
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
    f: Iu
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
    f: ut
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
    f: Z1
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
    f: Zn
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
    f: nu
  },
  /*::[*/
  427: {
    /* n:"BrtShrFmla", */
    f: au
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
    f: su
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
    f: p1
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
    f: eu
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
    f: Zn
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
    f: Fu
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
    f: xu
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
function re(e, t, r, n) {
  var a = t;
  if (!isNaN(a)) {
    var i = n || (r || []).length || 0, s = e.next(4);
    s.write_shift(2, a), s.write_shift(2, i), /*:: len != null &&*/
    i > 0 && f0(r) && e.push(r);
  }
}
function lh(e, t, r, n) {
  var a = (r || []).length || 0;
  if (a <= 8224) return re(e, t, r, a);
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
function tn(e, t, r) {
  return e || (e = U(7)), e.write_shift(2, t), e.write_shift(2, r), e.write_shift(2, 0), e.write_shift(1, 0), e;
}
function oh(e, t, r, n) {
  var a = U(9);
  return tn(a, e, t), ci(r, n || "b", a), a;
}
function ch(e, t, r) {
  var n = U(8 + 2 * r.length);
  return tn(n, e, t), n.write_shift(1, r.length), n.write_shift(r.length, r, "sbcs"), n.l < n.length ? n.slice(0, n.l) : n;
}
function uh(e, t, r, n) {
  if (t.v != null) switch (t.t) {
    case "d":
    case "n":
      var a = t.t == "d" ? mr(hr(t.v)) : t.v;
      a == (a | 0) && a >= 0 && a < 65536 ? re(e, 2, Al(r, n, a)) : re(e, 3, Sl(r, n, a));
      return;
    case "b":
    case "e":
      re(e, 5, oh(r, n, t.v, t.t));
      return;
    case "s":
    case "str":
      re(e, 4, ch(r, n, (t.v || "").slice(0, 255)));
      return;
  }
  re(e, 1, tn(null, r, n));
}
function hh(e, t, r, n) {
  var a = Array.isArray(t), i = Ie(t["!ref"] || "A1"), s, f = "", o = [];
  if (i.e.c > 255 || i.e.r > 16383) {
    if (n.WTF) throw new Error("Range " + (t["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    i.e.c = Math.min(i.e.c, 255), i.e.r = Math.min(i.e.c, 16383), s = Ge(i);
  }
  for (var l = i.s.r; l <= i.e.r; ++l) {
    f = nr(l);
    for (var c = i.s.c; c <= i.e.c; ++c) {
      l === i.s.r && (o[c] = sr(c)), s = o[c] + f;
      var d = a ? (t[l] || [])[c] : t[s];
      d && uh(e, d, l, c);
    }
  }
}
function xh(e, t) {
  for (var r = t || {}, n = vr(), a = 0, i = 0; i < e.SheetNames.length; ++i) e.SheetNames[i] == r.sheet && (a = i);
  if (a == 0 && r.sheet && e.SheetNames[0] != r.sheet) throw new Error("Sheet not found: " + r.sheet);
  return re(n, r.biff == 4 ? 1033 : r.biff == 3 ? 521 : 9, x0(e, 16, r)), hh(n, e.Sheets[e.SheetNames[a]], a, r), re(n, 10), n.end();
}
function dh(e, t, r) {
  re(e, 49, sl({
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
    for (var a = n[0]; a <= n[1]; ++a) t[a] != null && re(e, 1054, ol(a, t[a], r));
  });
}
function vh(e, t) {
  var r = U(19);
  r.write_shift(4, 2151), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 1), r.write_shift(4, 0), re(e, 2151, r), r = U(39), r.write_shift(4, 2152), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 0), r.write_shift(4, 0), r.write_shift(2, 1), r.write_shift(4, 4), r.write_shift(2, 0), xi(Ie(t["!ref"] || "A1"), r), r.write_shift(4, 4), re(e, 2152, r);
}
function mh(e, t) {
  for (var r = 0; r < 16; ++r) re(e, 224, ia({ numFmtId: 0, style: !0 }, 0, t));
  t.cellXfs.forEach(function(n) {
    re(e, 224, ia(n, 0, t));
  });
}
function gh(e, t) {
  for (var r = 0; r < t["!links"].length; ++r) {
    var n = t["!links"][r];
    re(e, 440, ml(n)), n[1].Tooltip && re(e, 2048, gl(n));
  }
  delete t["!links"];
}
function _h(e, t) {
  if (t) {
    var r = 0;
    t.forEach(function(n, a) {
      ++r <= 256 && n && re(e, 125, El(Mn(a, n), a));
    });
  }
}
function Th(e, t, r, n, a) {
  var i = 16 + Zr(a.cellXfs, t, a);
  if (t.v == null && !t.bf) {
    re(e, 513, st(r, n, i));
    return;
  }
  if (t.bf) re(e, 6, Xc(t, r, n, a, i));
  else switch (t.t) {
    case "d":
    case "n":
      var s = t.t == "d" ? mr(hr(t.v)) : t.v;
      re(e, 515, xl(r, n, s, i));
      break;
    case "b":
    case "e":
      re(e, 517, hl(r, n, t.v, i, a, t.t));
      break;
    case "s":
    case "str":
      if (a.bookSST) {
        var f = g0(a.Strings, t.v, a.revStrings);
        re(e, 253, fl(r, n, f, i));
      } else re(e, 516, ll(r, n, (t.v || "").slice(0, 255), i, a));
      break;
    default:
      re(e, 513, st(r, n, i));
  }
}
function Eh(e, t, r) {
  var n = vr(), a = r.SheetNames[e], i = r.Sheets[a] || {}, s = (r || {}).Workbook || {}, f = (s.Sheets || [])[e] || {}, o = Array.isArray(i), l = t.biff == 8, c, d = "", x = [], p = Ie(i["!ref"] || "A1"), g = l ? 65536 : 16384;
  if (p.e.c > 255 || p.e.r >= g) {
    if (t.WTF) throw new Error("Range " + (i["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    p.e.c = Math.min(p.e.c, 255), p.e.r = Math.min(p.e.c, g - 1);
  }
  re(n, 2057, x0(r, 16, t)), re(n, 13, yr(1)), re(n, 12, yr(100)), re(n, 15, ur(!0)), re(n, 17, ur(!1)), re(n, 16, it(1e-3)), re(n, 95, ur(!0)), re(n, 42, ur(!1)), re(n, 43, ur(!1)), re(n, 130, yr(1)), re(n, 128, ul()), re(n, 131, ur(!1)), re(n, 132, ur(!1)), l && _h(n, i["!cols"]), re(n, 512, cl(p, t)), l && (i["!links"] = []);
  for (var u = p.s.r; u <= p.e.r; ++u) {
    d = nr(u);
    for (var _ = p.s.c; _ <= p.e.c; ++_) {
      u === p.s.r && (x[_] = sr(_)), c = x[_] + d;
      var D = o ? (i[u] || [])[_] : i[c];
      D && (Th(n, D, u, _, t), l && D.l && i["!links"].push([c, D.l]));
    }
  }
  var F = f.CodeName || f.name || a;
  return l && re(n, 574, il((s.Views || [])[0])), l && (i["!merges"] || []).length && re(n, 229, vl(i["!merges"])), l && gh(n, i), re(n, 442, hi(F)), l && vh(n, i), re(
    n,
    10
    /* EOF */
  ), n.end();
}
function wh(e, t, r) {
  var n = vr(), a = (e || {}).Workbook || {}, i = a.Sheets || [], s = (
    /*::((*/
    a.WBProps || {
      /*::CodeName:"ThisWorkbook"*/
    }
  ), f = r.biff == 8, o = r.biff == 5;
  if (re(n, 2057, x0(e, 5, r)), r.bookType == "xla" && re(
    n,
    135
    /* Addin */
  ), re(n, 225, f ? yr(1200) : null), re(n, 193, zf(2)), o && re(
    n,
    191
    /* ToolbarHdr */
  ), o && re(
    n,
    192
    /* ToolbarEnd */
  ), re(
    n,
    226
    /* InterfaceEnd */
  ), re(n, 92, rl("SheetJS", r)), re(n, 66, yr(f ? 1200 : 1252)), f && re(n, 353, yr(0)), f && re(
    n,
    448
    /* Excel9File */
  ), re(n, 317, wl(e.SheetNames.length)), f && e.vbaraw && re(
    n,
    211
    /* ObProj */
  ), f && e.vbaraw) {
    var l = s.CodeName || "ThisWorkbook";
    re(n, 442, hi(l));
  }
  re(n, 156, yr(17)), re(n, 25, ur(!1)), re(n, 18, ur(!1)), re(n, 19, yr(0)), f && re(n, 431, ur(!1)), f && re(n, 444, yr(0)), re(n, 61, al()), re(n, 64, ur(!1)), re(n, 141, yr(0)), re(n, 34, ur(Cu(e) == "true")), re(n, 14, ur(!0)), f && re(n, 439, ur(!1)), re(n, 218, yr(0)), dh(n, e, r), ph(n, e.SSF, r), mh(n, r), f && re(n, 352, ur(!1));
  var c = n.end(), d = vr();
  f && re(d, 140, _l()), f && r.Strings && lh(d, 252, nl(r.Strings)), re(
    d,
    10
    /* EOF */
  );
  var x = d.end(), p = vr(), g = 0, u = 0;
  for (u = 0; u < e.SheetNames.length; ++u) g += (f ? 12 : 11) + (f ? 2 : 1) * e.SheetNames[u].length;
  var _ = c.length + g + x.length;
  for (u = 0; u < e.SheetNames.length; ++u) {
    var D = i[u] || {};
    re(p, 133, tl({ pos: _, hs: D.Hidden || 0, dt: 0, name: e.SheetNames[u] }, r)), _ += t[u].length;
  }
  var F = p.end();
  if (g != F.length) throw new Error("BS8 " + g + " != " + F.length);
  var C = [];
  return c.length && C.push(c), F.length && C.push(F), x.length && C.push(x), rr(C);
}
function Sh(e, t) {
  var r = t || {}, n = [];
  e && !e.SSF && (e.SSF = gr(We)), e && e.SSF && (In(), Dn(e.SSF), r.revssf = Rn(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF), r.Strings = /*::((*/
  [], r.Strings.Count = 0, r.Strings.Unique = 0, _0(r), r.cellXfs = [], Zr(r.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {});
  for (var a = 0; a < e.SheetNames.length; ++a) n[n.length] = Eh(a, r, e);
  return n.unshift(wh(e, n, r)), rr(n);
}
function Ui(e, t) {
  for (var r = 0; r <= e.SheetNames.length; ++r) {
    var n = e.Sheets[e.SheetNames[r]];
    if (!(!n || !n["!ref"])) {
      var a = Ar(n["!ref"]);
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
      var c = Ce({ r, c: s }), d = n.dense ? (e[r] || [])[s] : e[c], x = d && d.v != null && (d.h || Qs(d.w || (Gr(d), d.w) || "")) || "", p = {};
      f > 1 && (p.rowspan = f), o > 1 && (p.colspan = o), n.editable ? x = '<span contenteditable="true">' + x + "</span>" : d && (p["data-t"] = d && d.t || "z", d.v != null && (p["data-v"] = d.v), d.z != null && (p["data-z"] = d.z), d.l && (d.l.Target || "#").charAt(0) != "#" && (x = '<a href="' + d.l.Target + '">' + x + "</a>")), p.id = (n.id || "sjs") + "-" + c, i.push(ee("td", x, p));
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
function Wi(e, t) {
  var r = t || {}, n = r.header != null ? r.header : Fh, a = r.footer != null ? r.footer : yh, i = [n], s = Ar(e["!ref"]);
  r.dense = Array.isArray(e), i.push(Ch(e, s, r));
  for (var f = s.s.r; f <= s.e.r; ++f) i.push(Ah(e, s, f, r));
  return i.push("</table>" + a), i.join("");
}
function Vi(e, t, r) {
  var n = r || {}, a = 0, i = 0;
  if (n.origin != null)
    if (typeof n.origin == "number") a = n.origin;
    else {
      var s = typeof n.origin == "string" ? Je(n.origin) : n.origin;
      a = s.r, i = s.c;
    }
  var f = t.getElementsByTagName("tr"), o = Math.min(n.sheetRows || 1e7, f.length), l = { s: { r: 0, c: 0 }, e: { r: a, c: i } };
  if (e["!ref"]) {
    var c = Ar(e["!ref"]);
    l.s.r = Math.min(l.s.r, c.s.r), l.s.c = Math.min(l.s.c, c.s.c), l.e.r = Math.max(l.e.r, c.e.r), l.e.c = Math.max(l.e.c, c.e.c), a == -1 && (l.e.r = a = c.e.r + 1);
  }
  var d = [], x = 0, p = e["!rows"] || (e["!rows"] = []), g = 0, u = 0, _ = 0, D = 0, F = 0, C = 0;
  for (e["!cols"] || (e["!cols"] = []); g < f.length && u < o; ++g) {
    var B = f[g];
    if (ha(B)) {
      if (n.display) continue;
      p[u] = { hidden: !0 };
    }
    var Q = B.children;
    for (_ = D = 0; _ < Q.length; ++_) {
      var ne = Q[_];
      if (!(n.display && ha(ne))) {
        var k = ne.hasAttribute("data-v") ? ne.getAttribute("data-v") : ne.hasAttribute("v") ? ne.getAttribute("v") : nf(ne.innerHTML), V = ne.getAttribute("data-z") || ne.getAttribute("z");
        for (x = 0; x < d.length; ++x) {
          var N = d[x];
          N.s.c == D + i && N.s.r < u + a && u + a <= N.e.r && (D = N.e.c + 1 - i, x = -1);
        }
        C = +ne.getAttribute("colspan") || 1, ((F = +ne.getAttribute("rowspan") || 1) > 1 || C > 1) && d.push({ s: { r: u + a, c: D + i }, e: { r: u + a + (F || 1) - 1, c: D + i + (C || 1) - 1 } });
        var b = { t: "s", v: k }, K = ne.getAttribute("data-t") || ne.getAttribute("t") || "";
        k != null && (k.length == 0 ? b.t = K || "z" : n.raw || k.trim().length == 0 || K == "s" || (k === "TRUE" ? b = { t: "b", v: !0 } : k === "FALSE" ? b = { t: "b", v: !1 } : isNaN(Wr(k)) ? isNaN(zt(k).getDate()) || (b = { t: "d", v: hr(k) }, n.cellDates || (b = { t: "n", v: mr(b.v) }), b.z = n.dateNF || We[14]) : b = { t: "n", v: Wr(k) })), b.z === void 0 && V != null && (b.z = V);
        var J = "", se = ne.getElementsByTagName("A");
        if (se && se.length) for (var we = 0; we < se.length && !(se[we].hasAttribute("href") && (J = se[we].getAttribute("href"), J.charAt(0) != "#")); ++we) ;
        J && J.charAt(0) != "#" && (b.l = { Target: J }), n.dense ? (e[u + a] || (e[u + a] = []), e[u + a][D + i] = b) : e[Ce({ c: D + i, r: u + a })] = b, l.e.c < D + i && (l.e.c = D + i), D += C;
      }
    }
    ++u;
  }
  return d.length && (e["!merges"] = (e["!merges"] || []).concat(d)), l.e.r = Math.max(l.e.r, u - 1 + a), e["!ref"] = Ge(l), u >= o && (e["!fullref"] = Ge((l.e.r = f.length - g + u - 1 + a, l))), e;
}
function Hi(e, t) {
  var r = t || {}, n = r.dense ? [] : {};
  return Vi(n, e, t);
}
function Oh(e, t) {
  return ft(Hi(e, t), t);
}
function ha(e) {
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
  ].join(""), t = "<office:document-styles " + Yt({
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
    return Xe + t;
  };
}(), xa = /* @__PURE__ */ function() {
  var e = function(i) {
    return ye(i).replace(/  +/g, function(s) {
      return '<text:s text:c="' + s.length + '"/>';
    }).replace(/\t/g, "<text:tab/>").replace(/\n/g, "</text:p><text:p>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>");
  }, t = `          <table:table-cell />
`, r = `          <table:covered-table-cell/>
`, n = function(i, s, f) {
    var o = [];
    o.push('      <table:table table:name="' + ye(s.SheetNames[f]) + `" table:style-name="ta1">
`);
    var l = 0, c = 0, d = Ar(i["!ref"] || "A1"), x = i["!merges"] || [], p = 0, g = Array.isArray(i);
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
        var D = !1, F = {}, C = "";
        for (p = 0; p != x.length; ++p)
          if (!(x[p].s.c > c) && !(x[p].s.r > l) && !(x[p].e.c < c) && !(x[p].e.r < l)) {
            (x[p].s.c != c || x[p].s.r != l) && (D = !0), F["table:number-columns-spanned"] = x[p].e.c - x[p].s.c + 1, F["table:number-rows-spanned"] = x[p].e.r - x[p].s.r + 1;
            break;
          }
        if (D) {
          o.push(r);
          continue;
        }
        var B = Ce({ r: l, c }), Q = g ? (i[l] || [])[c] : i[B];
        if (Q && Q.f && (F["table:formula"] = ye(Jc(Q.f)), Q.F && Q.F.slice(0, B.length) == B)) {
          var ne = Ar(Q.F);
          F["table:number-matrix-columns-spanned"] = ne.e.c - ne.s.c + 1, F["table:number-matrix-rows-spanned"] = ne.e.r - ne.s.r + 1;
        }
        if (!Q) {
          o.push(t);
          continue;
        }
        switch (Q.t) {
          case "b":
            C = Q.v ? "TRUE" : "FALSE", F["office:value-type"] = "boolean", F["office:boolean-value"] = Q.v ? "true" : "false";
            break;
          case "n":
            C = Q.w || String(Q.v || 0), F["office:value-type"] = "float", F["office:value"] = Q.v || 0;
            break;
          case "s":
          case "str":
            C = Q.v == null ? "" : Q.v, F["office:value-type"] = "string";
            break;
          case "d":
            C = Q.w || hr(Q.v).toISOString(), F["office:value-type"] = "date", F["office:date-value"] = hr(Q.v).toISOString(), F["table:style-name"] = "ce1";
            break;
          default:
            o.push(t);
            continue;
        }
        var k = e(C);
        if (Q.l && Q.l.Target) {
          var V = Q.l.Target;
          V = V.charAt(0) == "#" ? "#" + Zc(V.slice(1)) : V, V.charAt(0) != "#" && !V.match(/^\w+:/) && (V = "../" + V), k = ee("text:a", k, { "xlink:href": V.replace(/&/g, "&amp;") });
        }
        o.push("          " + ee("table:table-cell", ee("text:p", k, {}), F) + `
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
          d0(d), d.ods = f;
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
    var o = [Xe], l = Yt({
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
    }), c = Yt({
      "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
      "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
    });
    f.bookType == "fods" ? (o.push("<office:document" + l + c + `>
`), o.push(ni().replace(/office:document-meta/g, "office:meta"))) : o.push("<office:document-content" + l + `>
`), a(o, s), o.push(`  <office:body>
`), o.push(`    <office:spreadsheet>
`);
    for (var d = 0; d != s.SheetNames.length; ++d) o.push(n(s.Sheets[s.SheetNames[d]], s, d));
    return o.push(`    </office:spreadsheet>
`), o.push(`  </office:body>
`), f.bookType == "fods" ? o.push("</office:document>") : o.push("</office:document-content>"), o.join("");
  };
}();
function Gi(e, t) {
  if (t.bookType == "fods") return xa(e, t);
  var r = n0(), n = "", a = [], i = [];
  return n = "mimetype", ve(r, n, "application/vnd.oasis.opendocument.spreadsheet"), n = "content.xml", ve(r, n, xa(e, t)), a.push([n, "text/xml"]), i.push([n, "ContentFile"]), n = "styles.xml", ve(r, n, Dh(e, t)), a.push([n, "text/xml"]), i.push([n, "StylesFile"]), n = "meta.xml", ve(r, n, Xe + ni(
    /*::wb, opts*/
  )), a.push([n, "text/xml"]), i.push([n, "MetadataFile"]), n = "manifest.rdf", ve(r, n, Vf(
    i
    /*, opts*/
  )), a.push([n, "application/rdf+xml"]), n = "META-INF/manifest.xml", ve(r, n, Uf(
    a
    /*, opts*/
  )), r;
}
/*! sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
function Cn(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function Ih(e) {
  return typeof TextEncoder < "u" ? new TextEncoder().encode(e) : Dr(Kt(e));
}
function Rh(e, t) {
  e:
    for (var r = 0; r <= e.length - t.length; ++r) {
      for (var n = 0; n < t.length; ++n)
        if (e[r + n] != t[n])
          continue e;
      return !0;
    }
  return !1;
}
function Jr(e) {
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
function jt(e, t) {
  var r = t ? t[0] : 0, n = e[r] & 127;
  e:
    if (e[r++] >= 128 && (n |= (e[r] & 127) << 7, e[r++] < 128 || (n |= (e[r] & 127) << 14, e[r++] < 128) || (n |= (e[r] & 127) << 21, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 28), ++r, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 35), ++r, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 42), ++r, e[r++] < 128)))
      break e;
  return t && (t[0] = r), n;
}
function Ae(e) {
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
function wt(e) {
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
    var n = r[0], a = jt(e, r), i = a & 7;
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
        s = jt(e, r), f = e.slice(r[0], r[0] + s), r[0] += s;
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
function Qe(e) {
  var t = [];
  return e.forEach(function(r, n) {
    r.forEach(function(a) {
      a.data && (t.push(Ae(n * 8 + a.type)), a.type == 2 && t.push(Ae(a.data.length)), t.push(a.data));
    });
  }), Jr(t);
}
function Or(e) {
  for (var t, r = [], n = [0]; n[0] < e.length; ) {
    var a = jt(e, n), i = Ke(e.slice(n[0], n[0] + a));
    n[0] += a;
    var s = {
      id: wt(i[1][0].data),
      messages: []
    };
    i[2].forEach(function(f) {
      var o = Ke(f.data), l = wt(o[3][0].data);
      s.messages.push({
        meta: o,
        data: e.slice(n[0], n[0] + l)
      }), n[0] += l;
    }), (t = i[3]) != null && t[0] && (s.merge = wt(i[3][0].data) >>> 0 > 0), r.push(s);
  }
  return r;
}
function pt(e) {
  var t = [];
  return e.forEach(function(r) {
    var n = [];
    n[1] = [{ data: Ae(r.id), type: 0 }], n[2] = [], r.merge != null && (n[3] = [{ data: Ae(+!!r.merge), type: 0 }]);
    var a = [];
    r.messages.forEach(function(s) {
      a.push(s.data), s.meta[3] = [{ type: 0, data: Ae(s.data.length) }], n[2].push({ data: Qe(s.meta), type: 2 });
    });
    var i = Qe(n);
    t.push(Ae(i.length)), t.push(i), a.forEach(function(s) {
      return t.push(s);
    });
  }), Jr(t);
}
function Ph(e, t) {
  if (e != 0)
    throw new Error("Unexpected Snappy chunk type ".concat(e));
  for (var r = [0], n = jt(t, r), a = []; r[0] < t.length; ) {
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
      if (i == 1 ? (l = (t[r[0]] >> 2 & 7) + 4, o = (t[r[0]++] & 224) << 3, o |= t[r[0]++]) : (l = (t[r[0]++] >> 2) + 1, i == 2 ? (o = t[r[0]] | t[r[0] + 1] << 8, r[0] += 2) : (o = (t[r[0]] | t[r[0] + 1] << 8 | t[r[0] + 2] << 16 | t[r[0] + 3] << 24) >>> 0, r[0] += 4)), a = [Jr(a)], o == 0)
        throw new Error("Invalid offset 0");
      if (o > a[0].length)
        throw new Error("Invalid offset beyond length");
      if (l >= o)
        for (a.push(a[0].slice(-o)), l -= o; l >= a[a.length - 1].length; )
          a.push(a[a.length - 1]), l -= a[a.length - 1].length;
      a.push(a[0].slice(-o, -o + l));
    }
  }
  var c = Jr(a);
  if (c.length != n)
    throw new Error("Unexpected length: ".concat(c.length, " != ").concat(n));
  return c;
}
function kr(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var n = e[r++], a = e[r] | e[r + 1] << 8 | e[r + 2] << 16;
    r += 3, t.push(Ph(n, e.slice(r, r + a))), r += a;
  }
  if (r !== e.length)
    throw new Error("data is not a valid framed stream!");
  return Jr(t);
}
function vt(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var n = Math.min(e.length - r, 268435455), a = new Uint8Array(4);
    t.push(a);
    var i = Ae(n), s = i.length;
    t.push(i), n <= 60 ? (s++, t.push(new Uint8Array([n - 1 << 2]))) : n <= 256 ? (s += 2, t.push(new Uint8Array([240, n - 1 & 255]))) : n <= 65536 ? (s += 3, t.push(new Uint8Array([244, n - 1 & 255, n - 1 >> 8 & 255]))) : n <= 16777216 ? (s += 4, t.push(new Uint8Array([248, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255]))) : n <= 4294967296 && (s += 5, t.push(new Uint8Array([252, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255, n - 1 >>> 24 & 255]))), t.push(e.slice(r, r + n)), s += n, a[0] = 0, a[1] = s & 255, a[2] = s >> 8 & 255, a[3] = s >> 16 & 255, r += n;
  }
  return Jr(t);
}
function zn(e, t) {
  var r = new Uint8Array(32), n = Cn(r), a = 12, i = 0;
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
function Kn(e, t) {
  var r = new Uint8Array(32), n = Cn(r), a = 12, i = 0;
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
function $r(e) {
  var t = Ke(e);
  return jt(t[1][0].data);
}
function Lh(e, t, r) {
  var n, a, i, s;
  if (!((n = e[6]) != null && n[0]) || !((a = e[7]) != null && a[0]))
    throw "Mutation only works on post-BNC storages!";
  var f = ((s = (i = e[8]) == null ? void 0 : i[0]) == null ? void 0 : s.data) && wt(e[8][0].data) > 0 || !1;
  if (f)
    throw "Math only works with normal offsets";
  for (var o = 0, l = Cn(e[7][0].data), c = 0, d = [], x = Cn(e[4][0].data), p = 0, g = [], u = 0; u < t.length; ++u) {
    if (t[u] == null) {
      l.setUint16(u * 2, 65535, !0), x.setUint16(u * 2, 65535);
      continue;
    }
    l.setUint16(u * 2, c, !0), x.setUint16(u * 2, p, !0);
    var _, D;
    switch (typeof t[u]) {
      case "string":
        _ = zn({ t: "s", v: t[u] }, r), D = Kn({ t: "s", v: t[u] }, r);
        break;
      case "number":
        _ = zn({ t: "n", v: t[u] }, r), D = Kn({ t: "n", v: t[u] }, r);
        break;
      case "boolean":
        _ = zn({ t: "b", v: t[u] }, r), D = Kn({ t: "b", v: t[u] }, r);
        break;
      default:
        throw new Error("Unsupported value " + t[u]);
    }
    d.push(_), c += _.length, g.push(D), p += D.length, ++o;
  }
  for (e[2][0].data = Ae(o); u < e[7][0].data.length / 2; ++u)
    l.setUint16(u * 2, 65535, !0), x.setUint16(u * 2, 65535, !0);
  return e[6][0].data = Jr(d), e[3][0].data = Jr(g), o;
}
function Mh(e, t) {
  if (!t || !t.numbers)
    throw new Error("Must pass a `numbers` option -- check the README");
  var r = e.Sheets[e.SheetNames[0]];
  e.SheetNames.length > 1 && console.error("The Numbers writer currently writes only the first table");
  var n = Ar(r["!ref"]);
  n.s.r = n.s.c = 0;
  var a = !1;
  n.e.c > 9 && (a = !0, n.e.c = 9), n.e.r > 49 && (a = !0, n.e.r = 49), a && console.error("The Numbers writer is currently limited to ".concat(Ge(n)));
  var i = On(r, { range: n, header: 1 }), s = ["~Sh33tJ5~"];
  i.forEach(function(M) {
    return M.forEach(function(y) {
      typeof y == "string" && s.push(y);
    });
  });
  var f = {}, o = [], l = Oe.read(t.numbers, { type: "base64" });
  l.FileIndex.map(function(M, y) {
    return [M, l.FullPaths[y]];
  }).forEach(function(M) {
    var y = M[0], A = M[1];
    if (y.type == 2 && y.name.match(/\.iwa/)) {
      var H = y.content, ue = kr(H), he = Or(ue);
      he.forEach(function(ce) {
        o.push(ce.id), f[ce.id] = { deps: [], location: A, type: wt(ce.messages[0].meta[1][0].data) };
      });
    }
  }), o.sort(function(M, y) {
    return M - y;
  });
  var c = o.filter(function(M) {
    return M > 1;
  }).map(function(M) {
    return [M, Ae(M)];
  });
  l.FileIndex.map(function(M, y) {
    return [M, l.FullPaths[y]];
  }).forEach(function(M) {
    var y = M[0];
    if (M[1], !!y.name.match(/\.iwa/)) {
      var A = Or(kr(y.content));
      A.forEach(function(H) {
        H.messages.forEach(function(ue) {
          c.forEach(function(he) {
            H.messages.some(function(ce) {
              return wt(ce.meta[1][0].data) != 11006 && Rh(ce.data, he[1]);
            }) && f[he[0]].deps.push(H.id);
          });
        });
      });
    }
  });
  for (var d = Oe.find(l, f[1].location), x = Or(kr(d.content)), p, g = 0; g < x.length; ++g) {
    var u = x[g];
    u.id == 1 && (p = u);
  }
  var _ = $r(Ke(p.messages[0].data)[1][0].data);
  for (d = Oe.find(l, f[_].location), x = Or(kr(d.content)), g = 0; g < x.length; ++g)
    u = x[g], u.id == _ && (p = u);
  for (_ = $r(Ke(p.messages[0].data)[2][0].data), d = Oe.find(l, f[_].location), x = Or(kr(d.content)), g = 0; g < x.length; ++g)
    u = x[g], u.id == _ && (p = u);
  for (_ = $r(Ke(p.messages[0].data)[2][0].data), d = Oe.find(l, f[_].location), x = Or(kr(d.content)), g = 0; g < x.length; ++g)
    u = x[g], u.id == _ && (p = u);
  var D = Ke(p.messages[0].data);
  {
    D[6][0].data = Ae(n.e.r + 1), D[7][0].data = Ae(n.e.c + 1);
    var F = $r(D[46][0].data), C = Oe.find(l, f[F].location), B = Or(kr(C.content));
    {
      for (var Q = 0; Q < B.length && B[Q].id != F; ++Q)
        ;
      if (B[Q].id != F)
        throw "Bad ColumnRowUIDMapArchive";
      var ne = Ke(B[Q].messages[0].data);
      ne[1] = [], ne[2] = [], ne[3] = [];
      for (var k = 0; k <= n.e.c; ++k) {
        var V = [];
        V[1] = V[2] = [{ type: 0, data: Ae(k + 420690) }], ne[1].push({ type: 2, data: Qe(V) }), ne[2].push({ type: 0, data: Ae(k) }), ne[3].push({ type: 0, data: Ae(k) });
      }
      ne[4] = [], ne[5] = [], ne[6] = [];
      for (var N = 0; N <= n.e.r; ++N)
        V = [], V[1] = V[2] = [{ type: 0, data: Ae(N + 726270) }], ne[4].push({ type: 2, data: Qe(V) }), ne[5].push({ type: 0, data: Ae(N) }), ne[6].push({ type: 0, data: Ae(N) });
      B[Q].messages[0].data = Qe(ne);
    }
    C.content = vt(pt(B)), C.size = C.content.length, delete D[46];
    var b = Ke(D[4][0].data);
    {
      b[7][0].data = Ae(n.e.r + 1);
      var K = Ke(b[1][0].data), J = $r(K[2][0].data);
      C = Oe.find(l, f[J].location), B = Or(kr(C.content));
      {
        if (B[0].id != J)
          throw "Bad HeaderStorageBucket";
        var se = Ke(B[0].messages[0].data);
        for (N = 0; N < i.length; ++N) {
          var we = Ke(se[2][0].data);
          we[1][0].data = Ae(N), we[4][0].data = Ae(i[N].length), se[2][N] = { type: se[2][0].type, data: Qe(we) };
        }
        B[0].messages[0].data = Qe(se);
      }
      C.content = vt(pt(B)), C.size = C.content.length;
      var de = $r(b[2][0].data);
      C = Oe.find(l, f[de].location), B = Or(kr(C.content));
      {
        if (B[0].id != de)
          throw "Bad HeaderStorageBucket";
        for (se = Ke(B[0].messages[0].data), k = 0; k <= n.e.c; ++k)
          we = Ke(se[2][0].data), we[1][0].data = Ae(k), we[4][0].data = Ae(n.e.r + 1), se[2][k] = { type: se[2][0].type, data: Qe(we) };
        B[0].messages[0].data = Qe(se);
      }
      C.content = vt(pt(B)), C.size = C.content.length;
      var Ne = $r(b[4][0].data);
      (function() {
        for (var M = Oe.find(l, f[Ne].location), y = Or(kr(M.content)), A, H = 0; H < y.length; ++H) {
          var ue = y[H];
          ue.id == Ne && (A = ue);
        }
        var he = Ke(A.messages[0].data);
        {
          he[3] = [];
          var ce = [];
          s.forEach(function(me, $e) {
            ce[1] = [{ type: 0, data: Ae($e) }], ce[2] = [{ type: 0, data: Ae(1) }], ce[3] = [{ type: 2, data: Ih(me) }], he[3].push({ type: 2, data: Qe(ce) });
          });
        }
        A.messages[0].data = Qe(he);
        var ae = pt(y), Te = vt(ae);
        M.content = Te, M.size = M.content.length;
      })();
      var De = Ke(b[3][0].data);
      {
        var Be = De[1][0];
        delete De[2];
        var Ve = Ke(Be.data);
        {
          var xr = $r(Ve[2][0].data);
          (function() {
            for (var M = Oe.find(l, f[xr].location), y = Or(kr(M.content)), A, H = 0; H < y.length; ++H) {
              var ue = y[H];
              ue.id == xr && (A = ue);
            }
            var he = Ke(A.messages[0].data);
            {
              delete he[6], delete De[7];
              var ce = new Uint8Array(he[5][0].data);
              he[5] = [];
              for (var ae = 0, Te = 0; Te <= n.e.r; ++Te) {
                var me = Ke(ce);
                ae += Lh(me, i[Te], s), me[1][0].data = Ae(Te), he[5].push({ data: Qe(me), type: 2 });
              }
              he[1] = [{ type: 0, data: Ae(n.e.c + 1) }], he[2] = [{ type: 0, data: Ae(n.e.r + 1) }], he[3] = [{ type: 0, data: Ae(ae) }], he[4] = [{ type: 0, data: Ae(n.e.r + 1) }];
            }
            A.messages[0].data = Qe(he);
            var $e = pt(y), X = vt($e);
            M.content = X, M.size = M.content.length;
          })();
        }
        Be.data = Qe(Ve);
      }
      b[3][0].data = Qe(De);
    }
    D[4][0].data = Qe(b);
  }
  p.messages[0].data = Qe(D);
  var lr = pt(x), S = vt(lr);
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
function _0(e) {
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
  return t.bookType == "ods" ? Gi(e, t) : t.bookType == "numbers" ? Mh(e, t) : t.bookType == "xlsb" ? Uh(e, t) : Wh(e, t);
}
function Uh(e, t) {
  gt = 1024, e && !e.SSF && (e.SSF = gr(We)), e && e.SSF && (In(), Dn(e.SSF), t.revssf = Rn(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, Gt ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = t.bookType == "xlsb" ? "bin" : "xml", n = Fi.indexOf(t.bookType) > -1, a = ei();
  _0(t = t || {});
  var i = n0(), s = "", f = 0;
  if (t.cellXfs = [], Zr(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", ve(i, s, ai(e.Props, t)), a.coreprops.push(s), Fe(t.rels, 2, s, _e.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var o = [], l = 0; l < e.SheetNames.length; ++l)
      (e.Workbook.Sheets[l] || {}).Hidden != 2 && o.push(e.SheetNames[l]);
    e.Props.SheetNames = o;
  }
  for (e.Props.Worksheets = e.Props.SheetNames.length, ve(i, s, si(e.Props)), a.extprops.push(s), Fe(t.rels, 3, s, _e.EXT_PROPS), e.Custprops !== e.Props && ar(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", ve(i, s, fi(e.Custprops)), a.custprops.push(s), Fe(t.rels, 4, s, _e.CUST_PROPS)), f = 1; f <= e.SheetNames.length; ++f) {
    var c = { "!id": {} }, d = e.Sheets[e.SheetNames[f - 1]], x = (d || {})["!type"] || "sheet";
    switch (x) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + r, ve(i, s, Hu(f - 1, s, t, e, c)), a.sheets.push(s), Fe(t.wbrels, -1, "worksheets/sheet" + f + "." + r, _e.WS[0]);
    }
    if (d) {
      var p = d["!comments"], g = !1, u = "";
      p && p.length > 0 && (u = "xl/comments" + f + "." + r, ve(i, u, $u(p, u)), a.comments.push(u), Fe(c, -1, "../comments" + f + "." + r, _e.CMNT), g = !0), d["!legacy"] && g && ve(i, "xl/drawings/vmlDrawing" + f + ".vml", Si(f, d["!comments"])), delete d["!comments"], delete d["!legacy"];
    }
    c["!id"].rId1 && ve(i, ti(s), Tt(c));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, ve(i, s, Xu(t.Strings, s, t)), a.strs.push(s), Fe(t.wbrels, -1, "sharedStrings." + r, _e.SST)), s = "xl/workbook." + r, ve(i, s, Vu(e, s)), a.workbooks.push(s), Fe(t.rels, 1, s, _e.WB), s = "xl/theme/theme1.xml", ve(i, s, Ei(e.Themes, t)), a.themes.push(s), Fe(t.wbrels, -1, "theme/theme1.xml", _e.THEME), s = "xl/styles." + r, ve(i, s, Gu(e, s, t)), a.styles.push(s), Fe(t.wbrels, -1, "styles." + r, _e.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", ve(i, s, e.vbaraw), a.vba.push(s), Fe(t.wbrels, -1, "vbaProject.bin", _e.VBA)), s = "xl/metadata." + r, ve(i, s, zu(s)), a.metadata.push(s), Fe(t.wbrels, -1, "metadata." + r, _e.XLMETA), ve(i, "[Content_Types].xml", ri(a, t)), ve(i, "_rels/.rels", Tt(t.rels)), ve(i, "xl/_rels/workbook." + r + ".rels", Tt(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function Wh(e, t) {
  gt = 1024, e && !e.SSF && (e.SSF = gr(We)), e && e.SSF && (In(), Dn(e.SSF), t.revssf = Rn(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, Gt ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = "xml", n = Fi.indexOf(t.bookType) > -1, a = ei();
  _0(t = t || {});
  var i = n0(), s = "", f = 0;
  if (t.cellXfs = [], Zr(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", ve(i, s, ai(e.Props, t)), a.coreprops.push(s), Fe(t.rels, 2, s, _e.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var o = [], l = 0; l < e.SheetNames.length; ++l)
      (e.Workbook.Sheets[l] || {}).Hidden != 2 && o.push(e.SheetNames[l]);
    e.Props.SheetNames = o;
  }
  e.Props.Worksheets = e.Props.SheetNames.length, ve(i, s, si(e.Props)), a.extprops.push(s), Fe(t.rels, 3, s, _e.EXT_PROPS), e.Custprops !== e.Props && ar(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", ve(i, s, fi(e.Custprops)), a.custprops.push(s), Fe(t.rels, 4, s, _e.CUST_PROPS));
  var c = ["SheetJ5"];
  for (t.tcid = 0, f = 1; f <= e.SheetNames.length; ++f) {
    var d = { "!id": {} }, x = e.Sheets[e.SheetNames[f - 1]], p = (x || {})["!type"] || "sheet";
    switch (p) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + r, ve(i, s, Pi(f - 1, t, e, d)), a.sheets.push(s), Fe(t.wbrels, -1, "worksheets/sheet" + f + "." + r, _e.WS[0]);
    }
    if (x) {
      var g = x["!comments"], u = !1, _ = "";
      if (g && g.length > 0) {
        var D = !1;
        g.forEach(function(F) {
          F[1].forEach(function(C) {
            C.T == !0 && (D = !0);
          });
        }), D && (_ = "xl/threadedComments/threadedComment" + f + "." + r, ve(i, _, mo(g, c, t)), a.threadedcomments.push(_), Fe(d, -1, "../threadedComments/threadedComment" + f + "." + r, _e.TCMNT)), _ = "xl/comments" + f + "." + r, ve(i, _, Ai(g)), a.comments.push(_), Fe(d, -1, "../comments" + f + "." + r, _e.CMNT), u = !0;
      }
      x["!legacy"] && u && ve(i, "xl/drawings/vmlDrawing" + f + ".vml", Si(f, x["!comments"])), delete x["!comments"], delete x["!legacy"];
    }
    d["!id"].rId1 && ve(i, ti(s), Tt(d));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, ve(i, s, pi(t.Strings, t)), a.strs.push(s), Fe(t.wbrels, -1, "sharedStrings." + r, _e.SST)), s = "xl/workbook." + r, ve(i, s, Bi(e)), a.workbooks.push(s), Fe(t.rels, 1, s, _e.WB), s = "xl/theme/theme1.xml", ve(i, s, Ei(e.Themes, t)), a.themes.push(s), Fe(t.wbrels, -1, "theme/theme1.xml", _e.THEME), s = "xl/styles." + r, ve(i, s, _i(e, t)), a.styles.push(s), Fe(t.wbrels, -1, "styles." + r, _e.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", ve(i, s, e.vbaraw), a.vba.push(s), Fe(t.wbrels, -1, "vbaProject.bin", _e.VBA)), s = "xl/metadata." + r, ve(i, s, wi()), a.metadata.push(s), Fe(t.wbrels, -1, "metadata." + r, _e.XLMETA), c.length > 1 && (s = "xl/persons/person.xml", ve(i, s, go(c)), a.people.push(s), Fe(t.wbrels, -1, "persons/person.xml", _e.PEOPLE)), ve(i, "[Content_Types].xml", ri(a, t)), ve(i, "_rels/.rels", Tt(t.rels)), ve(i, "xl/_rels/workbook." + r + ".rels", Tt(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function Vh(e, t) {
  var r = "";
  switch ((t || {}).type || "base64") {
    case "buffer":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    case "base64":
      r = Hr(e.slice(0, 12));
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
function Xi(e, t) {
  switch (t.type) {
    case "base64":
    case "binary":
      break;
    case "buffer":
    case "array":
      t.type = "";
      break;
    case "file":
      return qt(t.file, Oe.write(e, { type: Ee ? "buffer" : "" }));
    case "string":
      throw new Error("'string' output type invalid for '" + t.bookType + "' files");
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  return Oe.write(e, t);
}
function Hh(e, t) {
  var r = gr(t || {}), n = bh(e, r);
  return Gh(n, r);
}
function Gh(e, t) {
  var r = {}, n = Ee ? "nodebuffer" : typeof Uint8Array < "u" ? "array" : "string";
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
  var a = e.FullPaths ? Oe.write(e, { fileType: "zip", type: (
    /*::(*/
    { nodebuffer: "buffer", string: "binary" }[r.type] || r.type
  ), compression: !!t.compression }) : e.generate(r);
  if (typeof Deno < "u" && typeof a == "string") {
    if (t.type == "binary" || t.type == "base64") return a;
    a = new Uint8Array(kn(a));
  }
  return t.password && typeof encrypt_agile < "u" ? Xi(encrypt_agile(a, t.password), t) : t.type === "file" ? qt(t.file, a) : t.type == "string" ? Ut(
    /*::(*/
    a
    /*:: :any)*/
  ) : a;
}
function Xh(e, t) {
  var r = t || {}, n = sh(e, r);
  return Xi(n, r);
}
function Lr(e, t, r) {
  r || (r = "");
  var n = r + e;
  switch (t.type) {
    case "base64":
      return $t(Kt(n));
    case "binary":
      return Kt(n);
    case "string":
      return e;
    case "file":
      return qt(t.file, n, "utf8");
    case "buffer":
      return Ee ? Xr(n, "utf8") : typeof TextEncoder < "u" ? new TextEncoder().encode(n) : Lr(n, { type: "binary" }).split("").map(function(a) {
        return a.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function $h(e, t) {
  switch (t.type) {
    case "base64":
      return $t(e);
    case "binary":
      return e;
    case "string":
      return e;
    case "file":
      return qt(t.file, e, "binary");
    case "buffer":
      return Ee ? Xr(e, "binary") : e.split("").map(function(r) {
        return r.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function xn(e, t) {
  switch (t.type) {
    case "string":
    case "base64":
    case "binary":
      for (var r = "", n = 0; n < e.length; ++n) r += String.fromCharCode(e[n]);
      return t.type == "base64" ? $t(r) : t.type == "string" ? Ut(r) : r;
    case "file":
      return qt(t.file, e);
    case "buffer":
      return e;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
}
function $i(e, t) {
  ms(), Du(e);
  var r = gr(t || {});
  if (r.cellStyles && (r.cellNF = !0, r.sheetStubs = !0), r.type == "array") {
    r.type = "binary";
    var n = $i(e, r);
    return r.type = "array", kn(n);
  }
  var a = 0;
  if (r.sheet && (typeof r.sheet == "number" ? a = r.sheet : a = e.SheetNames.indexOf(r.sheet), !e.SheetNames[a]))
    throw new Error("Sheet not found: " + r.sheet + " : " + typeof r.sheet);
  switch (r.bookType || "xlsb") {
    case "xml":
    case "xlml":
      return Lr(ah(e, r), r);
    case "slk":
    case "sylk":
      return Lr(yl.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "htm":
    case "html":
      return Lr(Wi(e.Sheets[e.SheetNames[a]], r), r);
    case "txt":
      return $h(zi(e.Sheets[e.SheetNames[a]], r), r);
    case "csv":
      return Lr(T0(e.Sheets[e.SheetNames[a]], r), r, "\uFEFF");
    case "dif":
      return Lr(Cl.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "dbf":
      return xn(Fl.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "prn":
      return Lr(Ol.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "rtf":
      return Lr(Ll.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "eth":
      return Lr(di.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "fods":
      return Lr(Gi(e, r), r);
    case "wk1":
      return xn(sa.sheet_to_wk1(e.Sheets[e.SheetNames[a]], r), r);
    case "wk3":
      return xn(sa.book_to_wk3(e, r), r);
    case "biff2":
      r.biff || (r.biff = 2);
    case "biff3":
      r.biff || (r.biff = 3);
    case "biff4":
      return r.biff || (r.biff = 4), xn(Ui(e, r), r);
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
  return n.type = "file", n.file = t, zh(n), $i(e, n);
}
function Yh(e, t, r, n, a, i, s, f) {
  var o = nr(r), l = f.defval, c = f.raw || !Object.prototype.hasOwnProperty.call(f, "raw"), d = !0, x = a === 1 ? [] : {};
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
        x[i[p]] = c && (g.t !== "n" || g.t === "n" && f.rawNumbers !== !1) ? u : Gr(g, u, f);
      u != null && (d = !1);
    }
  }
  return { row: x, isempty: d };
}
function On(e, t) {
  if (e == null || e["!ref"] == null) return [];
  var r = { t: "n", v: 0 }, n = 0, a = 1, i = [], s = 0, f = "", o = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, l = t || {}, c = l.range != null ? l.range : e["!ref"];
  switch (l.header === 1 ? n = 1 : l.header === "A" ? n = 2 : Array.isArray(l.header) ? n = 3 : l.header == null && (n = 0), typeof c) {
    case "string":
      o = Ie(c);
      break;
    case "number":
      o = Ie(e["!ref"]), o.s.r = c;
      break;
    default:
      o = c;
  }
  n > 0 && (a = 0);
  var d = nr(o.s.r), x = [], p = [], g = 0, u = 0, _ = Array.isArray(e), D = o.s.r, F = 0, C = {};
  _ && !e[D] && (e[D] = []);
  var B = l.skipHidden && e["!cols"] || [], Q = l.skipHidden && e["!rows"] || [];
  for (F = o.s.c; F <= o.e.c; ++F)
    if (!(B[F] || {}).hidden)
      switch (x[F] = sr(F), r = _ ? e[D][F] : e[x[F] + d], n) {
        case 1:
          i[F] = F - o.s.c;
          break;
        case 2:
          i[F] = x[F];
          break;
        case 3:
          i[F] = l.header[F - o.s.c];
          break;
        default:
          if (r == null && (r = { w: "__EMPTY", t: "s" }), f = s = Gr(r, null, l), u = C[s] || 0, !u) C[s] = 1;
          else {
            do
              f = s + "_" + u++;
            while (C[f]);
            C[s] = u, C[f] = 1;
          }
          i[F] = f;
      }
  for (D = o.s.r + a; D <= o.e.r; ++D)
    if (!(Q[D] || {}).hidden) {
      var ne = Yh(e, o, D, x, n, i, _, l);
      (ne.isempty === !1 || (n === 1 ? l.blankrows !== !1 : l.blankrows)) && (p[g++] = ne.row);
    }
  return p.length = g, p;
}
var da = /"/g;
function jh(e, t, r, n, a, i, s, f) {
  for (var o = !0, l = [], c = "", d = nr(r), x = t.s.c; x <= t.e.c; ++x)
    if (n[x]) {
      var p = f.dense ? (e[r] || [])[x] : e[n[x] + d];
      if (p == null) c = "";
      else if (p.v != null) {
        o = !1, c = "" + (f.rawNumbers && p.t == "n" ? p.v : Gr(p, null, f));
        for (var g = 0, u = 0; g !== c.length; ++g) if ((u = c.charCodeAt(g)) === a || u === i || u === 34 || f.forceQuotes) {
          c = '"' + c.replace(da, '""') + '"';
          break;
        }
        c == "ID" && (c = '"ID"');
      } else p.f != null && !p.F ? (o = !1, c = "=" + p.f, c.indexOf(",") >= 0 && (c = '"' + c.replace(da, '""') + '"')) : c = "";
      l.push(c);
    }
  return f.blankrows === !1 && o ? null : l.join(s);
}
function T0(e, t) {
  var r = [], n = t ?? {};
  if (e == null || e["!ref"] == null) return "";
  var a = Ie(e["!ref"]), i = n.FS !== void 0 ? n.FS : ",", s = i.charCodeAt(0), f = n.RS !== void 0 ? n.RS : `
`, o = f.charCodeAt(0), l = new RegExp((i == "|" ? "\\|" : i) + "+$"), c = "", d = [];
  n.dense = Array.isArray(e);
  for (var x = n.skipHidden && e["!cols"] || [], p = n.skipHidden && e["!rows"] || [], g = a.s.c; g <= a.e.c; ++g) (x[g] || {}).hidden || (d[g] = sr(g));
  for (var u = 0, _ = a.s.r; _ <= a.e.r; ++_)
    (p[_] || {}).hidden || (c = jh(e, a, _, d, s, o, i, n), c != null && (n.strip && (c = c.replace(l, "")), (c || n.blankrows !== !1) && r.push((u++ ? f : "") + c)));
  return delete n.dense, r.join("");
}
function zi(e, t) {
  t || (t = {}), t.FS = "	", t.RS = `
`;
  var r = T0(e, t);
  return r;
}
function Jh(e) {
  var t = "", r, n = "";
  if (e == null || e["!ref"] == null) return [];
  var a = Ie(e["!ref"]), i = "", s = [], f, o = [], l = Array.isArray(e);
  for (f = a.s.c; f <= a.e.c; ++f) s[f] = sr(f);
  for (var c = a.s.r; c <= a.e.r; ++c)
    for (i = nr(c), f = a.s.c; f <= a.e.c; ++f)
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
function Ki(e, t, r) {
  var n = r || {}, a = +!n.skipHeader, i = e || {}, s = 0, f = 0;
  if (i && n.origin != null)
    if (typeof n.origin == "number") s = n.origin;
    else {
      var o = typeof n.origin == "string" ? Je(n.origin) : n.origin;
      s = o.r, f = o.c;
    }
  var l, c = { s: { c: 0, r: 0 }, e: { c: f, r: s + t.length - 1 + a } };
  if (i["!ref"]) {
    var d = Ie(i["!ref"]);
    c.e.c = Math.max(c.e.c, d.e.c), c.e.r = Math.max(c.e.r, d.e.r), s == -1 && (s = d.e.r + 1, c.e.r = s + t.length - 1 + a);
  } else
    s == -1 && (s = 0, c.e.r = t.length - 1 + a);
  var x = n.header || [], p = 0;
  t.forEach(function(u, _) {
    ar(u).forEach(function(D) {
      (p = x.indexOf(D)) == -1 && (x[p = x.length] = D);
      var F = u[D], C = "z", B = "", Q = Ce({ c: f + p, r: s + _ + a });
      l = Jt(i, Q), F && typeof F == "object" && !(F instanceof Date) ? i[Q] = F : (typeof F == "number" ? C = "n" : typeof F == "boolean" ? C = "b" : typeof F == "string" ? C = "s" : F instanceof Date ? (C = "d", n.cellDates || (C = "n", F = mr(F)), B = n.dateNF || We[14]) : F === null && n.nullError && (C = "e", F = 0), l ? (l.t = C, l.v = F, delete l.w, delete l.R, B && (l.z = B)) : i[Q] = l = { t: C, v: F }, B && (l.z = B));
    });
  }), c.e.c = Math.max(c.e.c, f + x.length - 1);
  var g = nr(s);
  if (a) for (p = 0; p < x.length; ++p) i[sr(p + f) + g] = { t: "s", v: x[p] };
  return i["!ref"] = Ge(c), i;
}
function Zh(e, t) {
  return Ki(null, e, t);
}
function Jt(e, t, r) {
  if (typeof t == "string") {
    if (Array.isArray(e)) {
      var n = Je(t);
      return e[n.r] || (e[n.r] = []), e[n.r][n.c] || (e[n.r][n.c] = { t: "z" });
    }
    return e[t] || (e[t] = { t: "z" });
  }
  return typeof t != "number" ? Jt(e, Ce(t)) : Jt(e, Ce({ r: t, c: r || 0 }));
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
  if (Mi(r), e.SheetNames.indexOf(r) >= 0) throw new Error("Worksheet with name |" + r + "| already exists!");
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
function Yi(e, t, r) {
  return t ? (e.l = { Target: t }, r && (e.l.Tooltip = r)) : delete e.l, e;
}
function nx(e, t, r) {
  return Yi(e, "#" + t, r);
}
function ax(e, t, r) {
  e.c || (e.c = []), e.c.push({ t, a: r || "SheetJS" });
}
function ix(e, t, r, n) {
  for (var a = typeof t != "string" ? t : Ie(t), i = typeof t == "string" ? t : Ge(t), s = a.s.r; s <= a.e.r; ++s) for (var f = a.s.c; f <= a.e.c; ++f) {
    var o = Jt(e, s, f);
    o.t = "n", o.F = i, delete o.v, s == a.s.r && f == a.s.c && (o.f = r, n && (o.D = !0));
  }
  return e;
}
var Mt = {
  encode_col: sr,
  encode_row: nr,
  encode_cell: Ce,
  encode_range: Ge,
  decode_col: o0,
  decode_row: l0,
  split_cell: gf,
  decode_cell: Je,
  decode_range: Ar,
  format_cell: Gr,
  sheet_add_aoa: Ya,
  sheet_add_json: Ki,
  sheet_add_dom: Vi,
  aoa_to_sheet: Ft,
  json_to_sheet: Zh,
  table_to_sheet: Hi,
  table_to_book: Oh,
  sheet_to_csv: T0,
  sheet_to_txt: zi,
  sheet_to_json: On,
  sheet_to_html: Wi,
  sheet_to_formulae: Jh,
  sheet_to_row_object_array: On,
  sheet_get_cell: Jt,
  book_new: Qh,
  book_append_sheet: ex,
  book_set_sheet_visibility: rx,
  cell_set_number_format: tx,
  cell_set_hyperlink: Yi,
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
Qn({
  name: "FieldDragLayout",
  props: {
    allFields: { type: Array, default: () => [] },
    inputItems: { type: Array, default: () => [] },
    outputItems: { type: Array, default: () => [] }
  },
  emits: ["update:inputItems", "update:outputItems"],
  setup(e, { emit: t }) {
    const r = be(""), n = Yn(() => {
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
const yx = /* @__PURE__ */ Qn({
  __name: "DataStandardView",
  props: {
    api: {},
    toolId: {}
  },
  setup(e) {
    const t = e, r = [
      { key: "roots", label: "📐 字根维护" },
      { key: "fields", label: "📋 标准字段维护" }
    ], n = be("roots"), a = be([]), i = be([]), s = be(!1);
    async function f() {
      const [X, O] = await Promise.all([
        t.api.plugin.callSync("listRoots", {}),
        t.api.plugin.callSync("listFields", {})
      ]);
      a.value = X.roots ?? [], i.value = O.fields ?? [];
    }
    cs(f);
    const o = be(""), l = be(""), c = Yn(() => x(a.value, o.value, ["id", "name", "meaning"])), d = Yn(() => x(i.value, l.value, ["id", "name_en", "name_cn"]));
    function x(X, O, ie) {
      if (!O) return X;
      const j = O.toLowerCase();
      return X.filter((ge) => ie.some((xe) => (ge[xe] ?? "").toLowerCase().includes(j)));
    }
    const p = be(!1), g = be(!0), u = be(null), _ = be([]), D = ["字符型", "数字型", "金额类型", "日期类型", "时间戳"], F = be({});
    function C(X) {
      if (g.value = !X, X) {
        F.value = { ...X };
        const O = $e(X.code_values);
        _.value = O.map((ie) => {
          const j = ie.indexOf("=");
          return j >= 0 ? { code: ie.slice(0, j), label: ie.slice(j + 1) } : { code: ie, label: "" };
        });
      } else
        F.value = { id: me("ROOT"), name: "", meaning: "", root_type: "字符型", length: "", remark: "" }, _.value = [];
      p.value = !0;
    }
    async function B() {
      var X, O;
      if (!((X = F.value.id) != null && X.trim()) || !((O = F.value.name) != null && O.trim())) {
        or.warning("字根ID和字根名不能为空");
        return;
      }
      s.value = !0;
      try {
        const ie = _.value.filter((j) => j.code.trim()).map((j) => j.label ? `${j.code}=${j.label}` : j.code);
        await t.api.plugin.callSync("saveRoot", {
          ...F.value,
          code_values: ie.length ? JSON.stringify(ie) : null,
          _isNew: g.value
        }), p.value = !1, await f(), or.success("保存成功");
      } finally {
        s.value = !1;
      }
    }
    async function Q(X) {
      await O0.confirm("确认删除字根 " + X + "？", "删除确认", { type: "warning" }), await t.api.plugin.callSync("deleteRoot", { id: X }), u.value === X && (u.value = null), await f(), or.success("已删除");
    }
    const ne = be(!1), k = be(!0), V = be(null), N = be([]), b = be({});
    function K(X) {
      k.value = !X, X ? (b.value = { ...X }, se(X.root_id, X.code_values)) : (b.value = { id: me("FIELD"), name_en: "", name_cn: "", root_id: "", root_name: "", field_type: "", length: "", remark: "" }, N.value = []), ne.value = !0;
    }
    function J(X) {
      const O = a.value.find((ie) => ie.id === X);
      O ? (b.value.root_name = O.name, b.value.field_type = O.root_type ?? "", b.value.length = O.length ?? "", se(X, null)) : (b.value.root_name = "", b.value.field_type = "", b.value.length = "", N.value = []);
    }
    function se(X, O) {
      const ie = a.value.find((xe) => xe.id === X);
      if (!ie || ie.root_type !== "字符型" || !ie.code_values) {
        N.value = [];
        return;
      }
      const j = $e(ie.code_values);
      let ge = null;
      if (O)
        try {
          ge = new Set(JSON.parse(O));
        } catch {
        }
      N.value = j.map((xe) => {
        const Ye = xe.indexOf("=");
        return {
          value: xe,
          code: Ye >= 0 ? xe.slice(0, Ye) : xe,
          label: Ye >= 0 ? xe.slice(Ye + 1) : "",
          checked: ge ? ge.has(xe) : !0
        };
      });
    }
    async function we() {
      var X, O;
      if (!((X = b.value.id) != null && X.trim()) || !((O = b.value.name_cn) != null && O.trim())) {
        or.warning("字段ID和字段中文名不能为空");
        return;
      }
      s.value = !0;
      try {
        const ie = N.value.filter((j) => j.checked).map((j) => j.value);
        await t.api.plugin.callSync("saveField", {
          ...b.value,
          code_values: ie.length ? JSON.stringify(ie) : null,
          _isNew: k.value
        }), ne.value = !1, await f(), or.success("保存成功");
      } finally {
        s.value = !1;
      }
    }
    async function de(X) {
      await O0.confirm("确认删除字段 " + X + "？", "删除确认", { type: "warning" }), await t.api.plugin.callSync("deleteField", { id: X }), V.value === X && (V.value = null), await f(), or.success("已删除");
    }
    const Ne = be(!1), De = be(""), Be = be(null);
    function Ve() {
      if (!u.value) {
        or.warning("请先选中一条字根记录");
        return;
      }
      const X = a.value.find((ie) => ie.id === u.value);
      if (!X) return;
      const O = i.value.filter((ie) => ie.root_id === X.id);
      De.value = `字根「${X.name}」关联图谱`, Be.value = { type: "字根", name: X.name, usedFields: O }, Ne.value = !0;
    }
    function xr() {
      if (!V.value) {
        or.warning("请先选中一条字段记录");
        return;
      }
      const X = i.value.find((O) => O.id === V.value);
      X && (De.value = `字段「${X.name_en}」关联图谱`, Be.value = { type: "字段", name: X.name_en, usedFields: [] }, Ne.value = !0);
    }
    function lr() {
      var O;
      if (!Be.value) return;
      const X = Mt.book_new();
      (O = Be.value.usedFields) != null && O.length && Mt.book_append_sheet(
        X,
        Mt.json_to_sheet(Be.value.usedFields.map((ie) => ({ 字段ID: ie.id, 英文名: ie.name_en, 中文名: ie.name_cn ?? "" }))),
        "关联字段"
      ), X.SheetNames.length === 0 && Mt.book_append_sheet(X, Mt.json_to_sheet([{ 结果: "暂无关联" }]), "关联图谱"), Kh(X, `关联图谱_${Be.value.name}.xlsx`), or.success("已导出");
    }
    async function S() {
      const X = await t.api.plugin.callSync("exportRootsCsv", {});
      Te(X.csv, "字根数据.csv", "text/csv;charset=utf-8");
    }
    async function M() {
      const X = await t.api.plugin.callSync("exportFieldsCsv", {});
      Te(X.csv, "字段数据.csv", "text/csv;charset=utf-8");
    }
    const y = be(null), A = be(null);
    let H = "";
    function ue() {
      if (!_.value.length) {
        or.warning("当前无码值可导出");
        return;
      }
      const X = ["code,label", ..._.value.map((O) => `${O.code},${O.label}`)];
      Te(X.join(`
`), `码值_${F.value.name || "export"}.csv`, "text/csv;charset=utf-8");
    }
    async function he(X) {
      var Ye;
      const O = (Ye = X.target.files) == null ? void 0 : Ye[0];
      if (!O) return;
      const ie = await O.text();
      X.target.value = "";
      const j = ie.split(/\r?\n/).filter((Se) => Se.trim());
      if (!j.length) {
        or.error("文件为空");
        return;
      }
      const ge = j[0].toLowerCase().startsWith("code") ? 1 : 0, xe = j.slice(ge).map((Se) => {
        const Br = Se.split(",");
        return { code: (Br[0] ?? "").trim(), label: (Br[1] ?? "").trim() };
      }).filter((Se) => Se.code);
      if (!xe.length) {
        or.error("未读取到有效码值");
        return;
      }
      _.value = xe, or.success(`已导入 ${xe.length} 条码值`);
    }
    function ce(X) {
      var O;
      H = X, (O = y.value) == null || O.click();
    }
    async function ae(X) {
      var j;
      const O = (j = X.target.files) == null ? void 0 : j[0];
      if (!O) return;
      const ie = await O.text();
      X.target.value = "";
      try {
        let ge;
        H === "root" ? ge = await t.api.plugin.callSync("importRootsCsv", { csv: ie }) : ge = await t.api.plugin.callSync("importFieldsCsv", { csv: ie }), await f(), or.success(`导入完成：成功 ${ge.success} 条，失败 ${ge.errors} 条`);
      } catch (ge) {
        or.error("导入失败：" + ge.message);
      }
    }
    function Te(X, O, ie) {
      const j = new Blob(["\uFEFF" + X], { type: ie }), ge = URL.createObjectURL(j), xe = Object.assign(document.createElement("a"), { href: ge, download: O });
      document.body.appendChild(xe), xe.click(), document.body.removeChild(xe), setTimeout(() => URL.revokeObjectURL(ge), 100);
    }
    function me(X) {
      return X + "_" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase();
    }
    function $e(X) {
      if (!X) return [];
      try {
        return JSON.parse(X);
      } catch {
        return [];
      }
    }
    return (X, O) => {
      const ie = dr("el-input"), j = dr("Download"), ge = dr("el-icon"), xe = dr("el-button"), Ye = dr("Upload"), Se = dr("el-table-column"), Br = dr("el-table"), qe = dr("el-form-item"), Re = dr("el-col"), qr = dr("el-option"), ht = dr("el-select"), xt = dr("el-row"), Nr = dr("el-form"), Ot = dr("el-dialog");
      return pr(), _r("div", sx, [
        ke("div", fx, [
          (pr(), _r(Rt, null, Nt(r, (Y) => ke("div", {
            key: Y.key,
            class: us(["ds-tab-item", { active: n.value === Y.key }]),
            onClick: (ze) => n.value = Y.key
          }, rt(Y.label), 11, lx)), 64))
        ]),
        Un(ke("div", ox, [
          ke("div", cx, [
            z(ie, {
              modelValue: o.value,
              "onUpdate:modelValue": O[0] || (O[0] = (Y) => o.value = Y),
              placeholder: "搜索字根...",
              clearable: "",
              style: { width: "240px" }
            }, null, 8, ["modelValue"]),
            z(xe, { onClick: S }, {
              default: fe(() => [
                z(ge, null, {
                  default: fe(() => [
                    z(j)
                  ]),
                  _: 1
                }),
                O[31] || (O[31] = Me(" 导出CSV", -1))
              ]),
              _: 1
            }),
            z(xe, {
              onClick: O[1] || (O[1] = (Y) => ce("root"))
            }, {
              default: fe(() => [
                z(ge, null, {
                  default: fe(() => [
                    z(Ye)
                  ]),
                  _: 1
                }),
                O[32] || (O[32] = Me(" 导入CSV", -1))
              ]),
              _: 1
            }),
            z(xe, {
              onClick: Ve,
              disabled: !u.value
            }, {
              default: fe(() => [...O[33] || (O[33] = [
                Me("📊 关联图谱", -1)
              ])]),
              _: 1
            }, 8, ["disabled"]),
            z(xe, {
              type: "primary",
              onClick: O[2] || (O[2] = (Y) => C(null))
            }, {
              default: fe(() => [...O[34] || (O[34] = [
                Me("+ 新增字根", -1)
              ])]),
              _: 1
            })
          ]),
          z(Br, {
            data: c.value,
            border: "",
            stripe: "",
            size: "small",
            "max-height": "560",
            "highlight-current-row": "",
            onCurrentChange: O[3] || (O[3] = (Y) => u.value = (Y == null ? void 0 : Y.id) ?? null)
          }, {
            default: fe(() => [
              z(Se, {
                prop: "id",
                label: "字根ID",
                width: "140"
              }),
              z(Se, {
                prop: "name",
                label: "字根名",
                width: "140"
              }, {
                default: fe(({ row: Y }) => [
                  ke("strong", null, rt(Y.name), 1)
                ]),
                _: 1
              }),
              z(Se, {
                prop: "meaning",
                label: "字根含义",
                "min-width": "140",
                "show-overflow-tooltip": ""
              }),
              z(Se, {
                prop: "root_type",
                label: "字根类型",
                width: "100"
              }),
              z(Se, {
                prop: "length",
                label: "长度",
                width: "60"
              }),
              z(Se, {
                label: "码值数",
                width: "70",
                align: "center"
              }, {
                default: fe(({ row: Y }) => [
                  Me(rt($e(Y.code_values).length || "—"), 1)
                ]),
                _: 1
              }),
              z(Se, {
                label: "操作",
                width: "120",
                fixed: "right"
              }, {
                default: fe(({ row: Y }) => [
                  z(xe, {
                    size: "small",
                    onClick: an((ze) => C(Y), ["stop"])
                  }, {
                    default: fe(() => [...O[35] || (O[35] = [
                      Me("编辑", -1)
                    ])]),
                    _: 1
                  }, 8, ["onClick"]),
                  z(xe, {
                    size: "small",
                    type: "danger",
                    onClick: an((ze) => Q(Y.id), ["stop"])
                  }, {
                    default: fe(() => [...O[36] || (O[36] = [
                      Me("删除", -1)
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
          [C0, n.value === "roots"]
        ]),
        Un(ke("div", ux, [
          ke("div", hx, [
            z(ie, {
              modelValue: l.value,
              "onUpdate:modelValue": O[4] || (O[4] = (Y) => l.value = Y),
              placeholder: "搜索字段...",
              clearable: "",
              style: { width: "240px" }
            }, null, 8, ["modelValue"]),
            z(xe, { onClick: M }, {
              default: fe(() => [
                z(ge, null, {
                  default: fe(() => [
                    z(j)
                  ]),
                  _: 1
                }),
                O[37] || (O[37] = Me(" 导出CSV", -1))
              ]),
              _: 1
            }),
            z(xe, {
              onClick: O[5] || (O[5] = (Y) => ce("field"))
            }, {
              default: fe(() => [
                z(ge, null, {
                  default: fe(() => [
                    z(Ye)
                  ]),
                  _: 1
                }),
                O[38] || (O[38] = Me(" 导入CSV", -1))
              ]),
              _: 1
            }),
            z(xe, {
              onClick: xr,
              disabled: !V.value
            }, {
              default: fe(() => [...O[39] || (O[39] = [
                Me("📊 关联图谱", -1)
              ])]),
              _: 1
            }, 8, ["disabled"]),
            z(xe, {
              type: "primary",
              onClick: O[6] || (O[6] = (Y) => K(null))
            }, {
              default: fe(() => [...O[40] || (O[40] = [
                Me("+ 新增字段", -1)
              ])]),
              _: 1
            })
          ]),
          z(Br, {
            data: d.value,
            border: "",
            stripe: "",
            size: "small",
            "max-height": "560",
            "highlight-current-row": "",
            onCurrentChange: O[7] || (O[7] = (Y) => V.value = (Y == null ? void 0 : Y.id) ?? null)
          }, {
            default: fe(() => [
              z(Se, {
                prop: "id",
                label: "字段ID",
                width: "140"
              }),
              z(Se, {
                prop: "name_en",
                label: "字段英文名",
                width: "160"
              }, {
                default: fe(({ row: Y }) => [
                  ke("strong", null, rt(Y.name_en), 1)
                ]),
                _: 1
              }),
              z(Se, {
                prop: "name_cn",
                label: "字段中文名",
                "min-width": "130",
                "show-overflow-tooltip": ""
              }),
              z(Se, {
                prop: "field_type",
                label: "字段类型",
                width: "100"
              }),
              z(Se, {
                prop: "length",
                label: "长度",
                width: "60"
              }),
              z(Se, {
                prop: "root_name",
                label: "引用字根",
                width: "120",
                "show-overflow-tooltip": ""
              }),
              z(Se, {
                label: "操作",
                width: "120",
                fixed: "right"
              }, {
                default: fe(({ row: Y }) => [
                  z(xe, {
                    size: "small",
                    onClick: an((ze) => K(Y), ["stop"])
                  }, {
                    default: fe(() => [...O[41] || (O[41] = [
                      Me("编辑", -1)
                    ])]),
                    _: 1
                  }, 8, ["onClick"]),
                  z(xe, {
                    size: "small",
                    type: "danger",
                    onClick: an((ze) => de(Y.id), ["stop"])
                  }, {
                    default: fe(() => [...O[42] || (O[42] = [
                      Me("删除", -1)
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
          [C0, n.value === "fields"]
        ]),
        z(Ot, {
          modelValue: p.value,
          "onUpdate:modelValue": O[17] || (O[17] = (Y) => p.value = Y),
          title: F.value.id && !g.value ? "编辑字根" : "新增字根",
          width: "680px",
          "close-on-click-modal": !1,
          "destroy-on-close": ""
        }, {
          footer: fe(() => [
            z(xe, {
              onClick: O[16] || (O[16] = (Y) => p.value = !1)
            }, {
              default: fe(() => [...O[47] || (O[47] = [
                Me("取消", -1)
              ])]),
              _: 1
            }),
            z(xe, {
              type: "primary",
              onClick: B,
              loading: s.value
            }, {
              default: fe(() => [...O[48] || (O[48] = [
                Me("保存", -1)
              ])]),
              _: 1
            }, 8, ["loading"])
          ]),
          default: fe(() => [
            z(Nr, {
              model: F.value,
              "label-width": "90px",
              size: "small"
            }, {
              default: fe(() => [
                z(xt, { gutter: 16 }, {
                  default: fe(() => [
                    z(Re, { span: 12 }, {
                      default: fe(() => [
                        z(qe, { label: "字根ID *" }, {
                          default: fe(() => [
                            z(ie, {
                              modelValue: F.value.id,
                              "onUpdate:modelValue": O[8] || (O[8] = (Y) => F.value.id = Y),
                              disabled: !g.value,
                              placeholder: "如 ROOT_001"
                            }, null, 8, ["modelValue", "disabled"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    z(Re, { span: 12 }, {
                      default: fe(() => [
                        z(qe, { label: "字根名 *" }, {
                          default: fe(() => [
                            z(ie, {
                              modelValue: F.value.name,
                              "onUpdate:modelValue": O[9] || (O[9] = (Y) => F.value.name = Y)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    z(Re, { span: 12 }, {
                      default: fe(() => [
                        z(qe, { label: "字根含义" }, {
                          default: fe(() => [
                            z(ie, {
                              modelValue: F.value.meaning,
                              "onUpdate:modelValue": O[10] || (O[10] = (Y) => F.value.meaning = Y)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    z(Re, { span: 12 }, {
                      default: fe(() => [
                        z(qe, { label: "字根类型 *" }, {
                          default: fe(() => [
                            z(ht, {
                              modelValue: F.value.root_type,
                              "onUpdate:modelValue": O[11] || (O[11] = (Y) => F.value.root_type = Y),
                              style: { width: "100%" }
                            }, {
                              default: fe(() => [
                                (pr(), _r(Rt, null, Nt(D, (Y) => z(qr, {
                                  key: Y,
                                  label: Y,
                                  value: Y
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
                    z(Re, { span: 12 }, {
                      default: fe(() => [
                        z(qe, { label: "字根长度" }, {
                          default: fe(() => [
                            z(ie, {
                              modelValue: F.value.length,
                              "onUpdate:modelValue": O[12] || (O[12] = (Y) => F.value.length = Y),
                              type: "number"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    z(Re, { span: 24 }, {
                      default: fe(() => [
                        z(qe, { label: "字根备注" }, {
                          default: fe(() => [
                            z(ie, {
                              modelValue: F.value.remark,
                              "onUpdate:modelValue": O[13] || (O[13] = (Y) => F.value.remark = Y),
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
                F.value.root_type === "字符型" ? (pr(), _r("div", xx, [
                  ke("div", dx, [
                    O[45] || (O[45] = ke("span", { style: { "font-size": "12px", "font-weight": "600", color: "#909399", flex: "1" } }, "码值序列", -1)),
                    z(xe, {
                      size: "small",
                      onClick: ue
                    }, {
                      default: fe(() => [...O[43] || (O[43] = [
                        Me("导出码值", -1)
                      ])]),
                      _: 1
                    }),
                    z(xe, {
                      size: "small",
                      onClick: O[14] || (O[14] = (Y) => {
                        var ze;
                        return (ze = A.value) == null ? void 0 : ze.click();
                      }),
                      style: { "margin-left": "6px" }
                    }, {
                      default: fe(() => [...O[44] || (O[44] = [
                        Me("导入码值", -1)
                      ])]),
                      _: 1
                    }),
                    ke("input", {
                      ref_key: "cvImportRef",
                      ref: A,
                      type: "file",
                      accept: ".csv",
                      style: { display: "none" },
                      onChange: he
                    }, null, 544)
                  ]),
                  ke("div", px, [
                    O[46] || (O[46] = ke("div", { class: "cv-header" }, [
                      ke("span", null, "码值编码"),
                      ke("span", null, "码值含义"),
                      ke("span")
                    ], -1)),
                    (pr(!0), _r(Rt, null, Nt(_.value, (Y, ze) => (pr(), _r("div", {
                      key: ze,
                      class: "cv-row"
                    }, [
                      z(ie, {
                        modelValue: Y.code,
                        "onUpdate:modelValue": (Qr) => Y.code = Qr,
                        placeholder: "码值",
                        size: "small",
                        style: { "border-radius": "0", "border-right": "1px solid #e4e7ed" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      z(ie, {
                        modelValue: Y.label,
                        "onUpdate:modelValue": (Qr) => Y.label = Qr,
                        placeholder: "含义",
                        size: "small",
                        style: { "border-radius": "0" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      ke("button", {
                        class: "cv-del-btn",
                        onClick: (Qr) => _.value.splice(ze, 1)
                      }, "×", 8, vx)
                    ]))), 128)),
                    ke("button", {
                      class: "cv-add-btn",
                      onClick: O[15] || (O[15] = (Y) => _.value.push({ code: "", label: "" }))
                    }, "+ 添加码值")
                  ])
                ])) : Pt("", !0)
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        z(Ot, {
          modelValue: ne.value,
          "onUpdate:modelValue": O[28] || (O[28] = (Y) => ne.value = Y),
          title: k.value ? "新增字段" : "编辑字段",
          width: "680px",
          "close-on-click-modal": !1,
          "destroy-on-close": ""
        }, {
          footer: fe(() => [
            z(xe, {
              onClick: O[27] || (O[27] = (Y) => ne.value = !1)
            }, {
              default: fe(() => [...O[52] || (O[52] = [
                Me("取消", -1)
              ])]),
              _: 1
            }),
            z(xe, {
              type: "primary",
              onClick: we,
              loading: s.value
            }, {
              default: fe(() => [...O[53] || (O[53] = [
                Me("保存", -1)
              ])]),
              _: 1
            }, 8, ["loading"])
          ]),
          default: fe(() => [
            z(Nr, {
              model: b.value,
              "label-width": "110px",
              size: "small"
            }, {
              default: fe(() => [
                z(xt, { gutter: 16 }, {
                  default: fe(() => [
                    z(Re, { span: 12 }, {
                      default: fe(() => [
                        z(qe, { label: "字段ID *" }, {
                          default: fe(() => [
                            z(ie, {
                              modelValue: b.value.id,
                              "onUpdate:modelValue": O[18] || (O[18] = (Y) => b.value.id = Y),
                              disabled: !k.value,
                              placeholder: "如 FIELD_001"
                            }, null, 8, ["modelValue", "disabled"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    z(Re, { span: 12 }, {
                      default: fe(() => [
                        z(qe, { label: "字段中文名 *" }, {
                          default: fe(() => [
                            z(ie, {
                              modelValue: b.value.name_cn,
                              "onUpdate:modelValue": O[19] || (O[19] = (Y) => b.value.name_cn = Y)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    z(Re, { span: 12 }, {
                      default: fe(() => [
                        z(qe, { label: "字段英文名" }, {
                          default: fe(() => [
                            z(ie, {
                              modelValue: b.value.name_en,
                              "onUpdate:modelValue": O[20] || (O[20] = (Y) => b.value.name_en = Y),
                              placeholder: "可手动填写"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    z(Re, { span: 12 }, {
                      default: fe(() => [
                        z(qe, { label: "引用字根" }, {
                          default: fe(() => [
                            z(ht, {
                              modelValue: b.value.root_id,
                              "onUpdate:modelValue": O[21] || (O[21] = (Y) => b.value.root_id = Y),
                              clearable: "",
                              filterable: "",
                              style: { width: "100%" },
                              onChange: J
                            }, {
                              default: fe(() => [
                                (pr(!0), _r(Rt, null, Nt(a.value, (Y) => (pr(), hs(qr, {
                                  key: Y.id,
                                  label: Y.name + " (" + Y.id + ")",
                                  value: Y.id
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
                    z(Re, { span: 12 }, {
                      default: fe(() => [
                        z(qe, { label: "字段类型" }, {
                          default: fe(() => [
                            z(ie, {
                              modelValue: b.value.field_type,
                              "onUpdate:modelValue": O[22] || (O[22] = (Y) => b.value.field_type = Y),
                              disabled: !!b.value.root_id,
                              placeholder: "引用字根后自动填充"
                            }, null, 8, ["modelValue", "disabled"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    z(Re, { span: 12 }, {
                      default: fe(() => [
                        z(qe, { label: "字段长度" }, {
                          default: fe(() => [
                            z(ie, {
                              modelValue: b.value.length,
                              "onUpdate:modelValue": O[23] || (O[23] = (Y) => b.value.length = Y),
                              disabled: !!b.value.root_id,
                              placeholder: "引用字根后自动填充",
                              type: "number"
                            }, null, 8, ["modelValue", "disabled"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    z(Re, { span: 24 }, {
                      default: fe(() => [
                        z(qe, { label: "字段备注" }, {
                          default: fe(() => [
                            z(ie, {
                              modelValue: b.value.remark,
                              "onUpdate:modelValue": O[24] || (O[24] = (Y) => b.value.remark = Y),
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
                N.value.length ? (pr(), _r("div", mx, [
                  ke("div", gx, [
                    O[51] || (O[51] = ke("span", { style: { "font-size": "12px", "font-weight": "600", color: "#909399" } }, "字段码值（勾选需要保留的）", -1)),
                    ke("span", null, [
                      z(xe, {
                        size: "small",
                        onClick: O[25] || (O[25] = (Y) => N.value.forEach((ze) => ze.checked = !0))
                      }, {
                        default: fe(() => [...O[49] || (O[49] = [
                          Me("全选", -1)
                        ])]),
                        _: 1
                      }),
                      z(xe, {
                        size: "small",
                        onClick: O[26] || (O[26] = (Y) => N.value.forEach((ze) => ze.checked = !1))
                      }, {
                        default: fe(() => [...O[50] || (O[50] = [
                          Me("全不选", -1)
                        ])]),
                        _: 1
                      })
                    ])
                  ]),
                  ke("div", _x, [
                    (pr(!0), _r(Rt, null, Nt(N.value, (Y) => (pr(), _r("label", {
                      key: Y.value,
                      class: "cv-check-item"
                    }, [
                      Un(ke("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": (ze) => Y.checked = ze
                      }, null, 8, Tx), [
                        [xs, Y.checked]
                      ]),
                      ke("span", Ex, rt(Y.code), 1),
                      Y.label ? (pr(), _r("span", wx, rt(Y.label), 1)) : Pt("", !0)
                    ]))), 128))
                  ])
                ])) : Pt("", !0)
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        z(Ot, {
          modelValue: Ne.value,
          "onUpdate:modelValue": O[30] || (O[30] = (Y) => Ne.value = Y),
          title: De.value,
          width: "760px",
          "destroy-on-close": ""
        }, {
          footer: fe(() => [
            z(xe, {
              onClick: O[29] || (O[29] = (Y) => Ne.value = !1)
            }, {
              default: fe(() => [...O[54] || (O[54] = [
                Me("关闭", -1)
              ])]),
              _: 1
            }),
            z(xe, {
              type: "success",
              onClick: lr
            }, {
              default: fe(() => [...O[55] || (O[55] = [
                Me("📥 导出Excel", -1)
              ])]),
              _: 1
            })
          ]),
          default: fe(() => {
            var Y;
            return [
              Be.value ? (pr(), _r("div", Sx, [
                (Y = Be.value.usedFields) != null && Y.length ? (pr(), _r("div", Ax, [
                  ke("div", Fx, "📋 引用字段（" + rt(Be.value.usedFields.length) + "）", 1),
                  z(Br, {
                    data: Be.value.usedFields,
                    size: "small",
                    border: ""
                  }, {
                    default: fe(() => [
                      z(Se, {
                        prop: "id",
                        label: "字段ID",
                        width: "140"
                      }),
                      z(Se, {
                        prop: "name_en",
                        label: "英文名",
                        width: "140"
                      }),
                      z(Se, {
                        prop: "name_cn",
                        label: "中文名"
                      })
                    ]),
                    _: 1
                  }, 8, ["data"])
                ])) : Pt("", !0)
              ])) : Pt("", !0)
            ];
          }),
          _: 1
        }, 8, ["modelValue", "title"]),
        ke("input", {
          type: "file",
          ref_key: "importFileRef",
          ref: y,
          accept: ".csv",
          style: { display: "none" },
          onChange: ae
        }, null, 544)
      ]);
    };
  }
}), Cx = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, a] of t)
    r[n] = a;
  return r;
}, Ox = /* @__PURE__ */ Cx(yx, [["__scopeId", "data-v-877c1255"]]);
function Ix(e, t) {
  return Qn({
    render() {
      return ds(Ox, { api: e, toolId: t });
    }
  });
}
export {
  Ix as createView
};
