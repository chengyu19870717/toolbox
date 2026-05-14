import { defineComponent as Sa, ref as Fe, computed as rn, onMounted as xs, resolveComponent as wr, openBlock as tr, createElementBlock as vr, createElementVNode as Ae, Fragment as Jt, renderList as Zt, normalizeClass as ds, toDisplayString as mr, withDirectives as qt, createVNode as O, withCtx as G, createTextVNode as we, withModifiers as On, vShow as In, createCommentVNode as Qt, createBlock as ua, vModelCheckbox as ps, unref as za, h as vs } from "vue";
import { ElMessage as Ke, ElMessageBox as kn } from "element-plus";
/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var Un = {};
Un.version = "0.18.5";
var N0 = 1252, ms = [874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1e4], P0 = function(e) {
  ms.indexOf(e) != -1 && (N0 = e);
};
function gs() {
  P0(1252);
}
var un = function(e) {
  P0(e);
};
function _s() {
  un(1200), gs();
}
var Dn = function(t) {
  return String.fromCharCode(t);
}, $a = function(t) {
  return String.fromCharCode(t);
}, Vn, st = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function cn(e) {
  for (var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, f = 0, o = 0, l = 0; l < e.length; )
    r = e.charCodeAt(l++), i = r >> 2, n = e.charCodeAt(l++), s = (r & 3) << 4 | n >> 4, a = e.charCodeAt(l++), f = (n & 15) << 2 | a >> 6, o = a & 63, isNaN(n) ? f = o = 64 : isNaN(a) && (o = 64), t += st.charAt(i) + st.charAt(s) + st.charAt(f) + st.charAt(o);
  return t;
}
function rt(e) {
  var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, f = 0, o = 0;
  e = e.replace(/[^\w\+\/\=]/g, "");
  for (var l = 0; l < e.length; )
    i = st.indexOf(e.charAt(l++)), s = st.indexOf(e.charAt(l++)), r = i << 2 | s >> 4, t += String.fromCharCode(r), f = st.indexOf(e.charAt(l++)), n = (s & 15) << 4 | f >> 2, f !== 64 && (t += String.fromCharCode(n)), o = st.indexOf(e.charAt(l++)), a = (f & 3) << 6 | o, o !== 64 && (t += String.fromCharCode(a));
  return t;
}
var Ie = /* @__PURE__ */ function() {
  return typeof Buffer < "u" && typeof process < "u" && typeof process.versions < "u" && !!process.versions.node;
}(), nt = /* @__PURE__ */ function() {
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
function vt(e) {
  return Ie ? Buffer.alloc ? Buffer.alloc(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
function ja(e) {
  return Ie ? Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
var Wr = function(t) {
  return Ie ? nt(t, "binary") : t.split("").map(function(r) {
    return r.charCodeAt(0) & 255;
  });
};
function ea(e) {
  if (typeof ArrayBuffer > "u") return Wr(e);
  for (var t = new ArrayBuffer(e.length), r = new Uint8Array(t), n = 0; n != e.length; ++n) r[n] = e.charCodeAt(n) & 255;
  return t;
}
function mn(e) {
  if (Array.isArray(e)) return e.map(function(n) {
    return String.fromCharCode(n);
  }).join("");
  for (var t = [], r = 0; r < e.length; ++r) t[r] = String.fromCharCode(e[r]);
  return t.join("");
}
function Ts(e) {
  if (typeof Uint8Array > "u") throw new Error("Unsupported");
  return new Uint8Array(e);
}
var lr = Ie ? function(e) {
  return Buffer.concat(e.map(function(t) {
    return Buffer.isBuffer(t) ? t : nt(t);
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
function Es(e) {
  for (var t = [], r = 0, n = e.length + 250, a = vt(e.length + 255), i = 0; i < e.length; ++i) {
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
    r > n && (t.push(a.slice(0, r)), r = 0, a = vt(65535), n = 65530);
  }
  return t.push(a.slice(0, r)), lr(t);
}
var nn = /\u0000/g, Rn = /[\u0001-\u0006]/g;
function Mt(e) {
  for (var t = "", r = e.length - 1; r >= 0; ) t += e.charAt(r--);
  return t;
}
function Hr(e, t) {
  var r = "" + e;
  return r.length >= t ? r : He("0", t - r.length) + r;
}
function Aa(e, t) {
  var r = "" + e;
  return r.length >= t ? r : He(" ", t - r.length) + r;
}
function Wn(e, t) {
  var r = "" + e;
  return r.length >= t ? r : r + He(" ", t - r.length);
}
function ws(e, t) {
  var r = "" + Math.round(e);
  return r.length >= t ? r : He("0", t - r.length) + r;
}
function Ss(e, t) {
  var r = "" + e;
  return r.length >= t ? r : He("0", t - r.length) + r;
}
var Ka = /* @__PURE__ */ Math.pow(2, 32);
function Dt(e, t) {
  if (e > Ka || e < -Ka) return ws(e, t);
  var r = Math.round(e);
  return Ss(r, t);
}
function Hn(e, t) {
  return t = t || 0, e.length >= 7 + t && (e.charCodeAt(t) | 32) === 103 && (e.charCodeAt(t + 1) | 32) === 101 && (e.charCodeAt(t + 2) | 32) === 110 && (e.charCodeAt(t + 3) | 32) === 101 && (e.charCodeAt(t + 4) | 32) === 114 && (e.charCodeAt(t + 5) | 32) === 97 && (e.charCodeAt(t + 6) | 32) === 108;
}
var Ya = [
  ["Sun", "Sunday"],
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"]
], ca = [
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
function As(e) {
  return e || (e = {}), e[0] = "General", e[1] = "0", e[2] = "0.00", e[3] = "#,##0", e[4] = "#,##0.00", e[9] = "0%", e[10] = "0.00%", e[11] = "0.00E+00", e[12] = "# ?/?", e[13] = "# ??/??", e[14] = "m/d/yy", e[15] = "d-mmm-yy", e[16] = "d-mmm", e[17] = "mmm-yy", e[18] = "h:mm AM/PM", e[19] = "h:mm:ss AM/PM", e[20] = "h:mm", e[21] = "h:mm:ss", e[22] = "m/d/yy h:mm", e[37] = "#,##0 ;(#,##0)", e[38] = "#,##0 ;[Red](#,##0)", e[39] = "#,##0.00;(#,##0.00)", e[40] = "#,##0.00;[Red](#,##0.00)", e[45] = "mm:ss", e[46] = "[h]:mm:ss", e[47] = "mmss.0", e[48] = "##0.0E+0", e[49] = "@", e[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "', e;
}
var Ge = {
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
}, Ja = {
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
}, Fs = {
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
function Gn(e, t, r) {
  for (var n = e < 0 ? -1 : 1, a = e * n, i = 0, s = 1, f = 0, o = 1, l = 0, u = 0, d = Math.floor(a); l < t && (d = Math.floor(a), f = d * s + i, u = d * l + o, !(a - d < 5e-8)); )
    a = 1 / (a - d), i = s, s = f, o = l, l = u;
  if (u > t && (l > t ? (u = o, f = i) : (u = l, f = s)), !r) return [0, n * f, u];
  var x = Math.floor(n * f / u);
  return [x, n * f - x * u, u];
}
function Nn(e, t, r) {
  if (e > 2958465 || e < 0) return null;
  var n = e | 0, a = Math.floor(86400 * (e - n)), i = 0, s = [], f = { D: n, T: a, u: 86400 * (e - n) - a, y: 0, m: 0, d: 0, H: 0, M: 0, S: 0, q: 0 };
  if (Math.abs(f.u) < 1e-6 && (f.u = 0), t && t.date1904 && (n += 1462), f.u > 0.9999 && (f.u = 0, ++a == 86400 && (f.T = a = 0, ++n, ++f.D)), n === 60)
    s = r ? [1317, 10, 29] : [1900, 2, 29], i = 3;
  else if (n === 0)
    s = r ? [1317, 8, 29] : [1900, 1, 0], i = 6;
  else {
    n > 60 && --n;
    var o = new Date(1900, 0, 1);
    o.setDate(o.getDate() + n - 1), s = [o.getFullYear(), o.getMonth() + 1, o.getDate()], i = o.getDay(), n < 60 && (i = (i + 6) % 7), r && (i = Rs(o, s));
  }
  return f.y = s[0], f.m = s[1], f.d = s[2], f.S = a % 60, a = Math.floor(a / 60), f.M = a % 60, a = Math.floor(a / 60), f.H = a, f.q = i, f;
}
var L0 = /* @__PURE__ */ new Date(1899, 11, 31, 0, 0, 0), ys = /* @__PURE__ */ L0.getTime(), Cs = /* @__PURE__ */ new Date(1900, 2, 1, 0, 0, 0);
function M0(e, t) {
  var r = /* @__PURE__ */ e.getTime();
  return t ? r -= 1461 * 24 * 60 * 60 * 1e3 : e >= Cs && (r += 24 * 60 * 60 * 1e3), (r - (ys + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ L0.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3);
}
function Fa(e) {
  return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1");
}
function Os(e) {
  return e.indexOf("E") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/, "$10$2");
}
function Is(e) {
  var t = e < 0 ? 12 : 11, r = Fa(e.toFixed(12));
  return r.length <= t || (r = e.toPrecision(10), r.length <= t) ? r : e.toExponential(5);
}
function ks(e) {
  var t = Fa(e.toFixed(11));
  return t.length > (e < 0 ? 12 : 11) || t === "0" || t === "-0" ? e.toPrecision(6) : t;
}
function Ds(e) {
  var t = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E), r;
  return t >= -4 && t <= -1 ? r = e.toPrecision(10 + t) : Math.abs(t) <= 9 ? r = Is(e) : t === 10 ? r = e.toFixed(10).substr(0, 12) : r = ks(e), Fa(Os(r.toUpperCase()));
}
function _a(e, t) {
  switch (typeof e) {
    case "string":
      return e;
    case "boolean":
      return e ? "TRUE" : "FALSE";
    case "number":
      return (e | 0) === e ? e.toString(10) : Ds(e);
    case "undefined":
      return "";
    case "object":
      if (e == null) return "";
      if (e instanceof Date) return lt(14, M0(e, t && t.date1904), t);
  }
  throw new Error("unsupported value in General format: " + e);
}
function Rs(e, t) {
  t[0] -= 581;
  var r = e.getDay();
  return e < 60 && (r = (r + 6) % 7), r;
}
function Ns(e, t, r, n) {
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
          return ca[r.m - 1][1];
        case 5:
          return ca[r.m - 1][0];
        default:
          return ca[r.m - 1][2];
      }
      break;
    case 100:
      switch (t.length) {
        case 1:
        case 2:
          o = r.d, l = t.length;
          break;
        case 3:
          return Ya[r.q][0];
        default:
          return Ya[r.q][1];
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
      return r.u === 0 && (t == "s" || t == "ss") ? Hr(r.S, t.length) : (n >= 2 ? s = n === 3 ? 1e3 : 100 : s = n === 1 ? 10 : 1, i = Math.round(s * (r.S + r.u)), i >= 60 * s && (i = 0), t === "s" ? i === 0 ? "0" : "" + i / s : (a = Hr(i, 2 + n), t === "ss" ? a.substr(0, 2) : "." + a.substr(2, t.length - 1)));
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
  var u = l > 0 ? Hr(o, l) : "";
  return u;
}
function ft(e) {
  var t = 3;
  if (e.length <= t) return e;
  for (var r = e.length % t, n = e.substr(0, r); r != e.length; r += t) n += (n.length > 0 ? "," : "") + e.substr(r, t);
  return n;
}
var B0 = /%/g;
function Ps(e, t, r) {
  var n = t.replace(B0, ""), a = t.length - n.length;
  return qr(e, n, r * Math.pow(10, 2 * a)) + He("%", a);
}
function Ls(e, t, r) {
  for (var n = t.length - 1; t.charCodeAt(n - 1) === 44; ) --n;
  return qr(e, t.substr(0, n), r / Math.pow(10, 3 * (t.length - n)));
}
function b0(e, t) {
  var r, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0) return "0.0E+0";
    if (t < 0) return "-" + b0(e, -t);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(t) * Math.LOG10E) % a;
    if (i < 0 && (i += a), r = (t / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a), r.indexOf("e") === -1) {
      var s = Math.floor(Math.log(t) * Math.LOG10E);
      for (r.indexOf(".") === -1 ? r = r.charAt(0) + "." + r.substr(1) + "E+" + (s - r.length + i) : r += "E+" + (s - i); r.substr(0, 2) === "0."; )
        r = r.charAt(0) + r.substr(2, a) + "." + r.substr(2 + a), r = r.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.");
      r = r.replace(/\+-/, "-");
    }
    r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(f, o, l, u) {
      return o + l + u.substr(0, (a + i) % a) + "." + u.substr(i) + "E";
    });
  } else r = t.toExponential(n);
  return e.match(/E\+00$/) && r.match(/e[+-]\d$/) && (r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1)), e.match(/E\-/) && r.match(/e\+/) && (r = r.replace(/e\+/, "e")), r.replace("e", "E");
}
var U0 = /# (\?+)( ?)\/( ?)(\d+)/;
function Ms(e, t, r) {
  var n = parseInt(e[4], 10), a = Math.round(t * n), i = Math.floor(a / n), s = a - i * n, f = n;
  return r + (i === 0 ? "" : "" + i) + " " + (s === 0 ? He(" ", e[1].length + 1 + e[4].length) : Aa(s, e[1].length) + e[2] + "/" + e[3] + Hr(f, e[4].length));
}
function Bs(e, t, r) {
  return r + (t === 0 ? "" : "" + t) + He(" ", e[1].length + 2 + e[4].length);
}
var V0 = /^#*0*\.([0#]+)/, W0 = /\).*[0#]/, H0 = /\(###\) ###\\?-####/;
function gr(e) {
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
function Za(e, t) {
  var r = Math.pow(10, t);
  return "" + Math.round(e * r) / r;
}
function qa(e, t) {
  var r = e - Math.floor(e), n = Math.pow(10, t);
  return t < ("" + Math.round(r * n)).length ? 0 : Math.round(r * n);
}
function bs(e, t) {
  return t < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, t))).length ? 1 : 0;
}
function Us(e) {
  return e < 2147483647 && e > -2147483648 ? "" + (e >= 0 ? e | 0 : e - 1 | 0) : "" + Math.floor(e);
}
function Mr(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(W0)) {
    var n = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? Mr("n", n, r) : "(" + Mr("n", n, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44) return Ls(e, t, r);
  if (t.indexOf("%") !== -1) return Ps(e, t, r);
  if (t.indexOf("E") !== -1) return b0(t, r);
  if (t.charCodeAt(0) === 36) return "$" + Mr(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var a, i, s, f, o = Math.abs(r), l = r < 0 ? "-" : "";
  if (t.match(/^00+$/)) return l + Dt(o, t.length);
  if (t.match(/^[#?]+$/))
    return a = Dt(r, 0), a === "0" && (a = ""), a.length > t.length ? a : gr(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(U0)) return Ms(i, o, l);
  if (t.match(/^#+0+$/)) return l + Dt(o, t.length - t.indexOf("0"));
  if (i = t.match(V0))
    return a = Za(r, i[1].length).replace(/^([^\.]+)$/, "$1." + gr(i[1])).replace(/\.$/, "." + gr(i[1])).replace(/\.(\d*)$/, function(g, h) {
      return "." + h + He("0", gr(
        /*::(*/
        i[1]
      ).length - h.length);
    }), t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return l + Za(o, i[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/)) return l + ft(Dt(o, 0));
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + Mr(e, t, -r) : ft("" + (Math.floor(r) + bs(r, i[1].length))) + "." + Hr(qa(r, i[1].length), i[1].length);
  if (i = t.match(/^#,#*,#0/)) return Mr(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = Mt(Mr(e, t.replace(/[\\-]/g, ""), r)), s = 0, Mt(Mt(t.replace(/\\/g, "")).replace(/[0#]/g, function(g) {
      return s < a.length ? a.charAt(s++) : g === "0" ? "0" : "";
    }));
  if (t.match(H0))
    return a = Mr(e, "##########", r), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var u = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), f = Gn(o, Math.pow(10, s) - 1, !1), a = "" + l, u = qr(
      "n",
      /*::String(*/
      i[1],
      f[1]
    ), u.charAt(u.length - 1) == " " && (u = u.substr(0, u.length - 1) + "0"), a += u + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], u = Wn(f[2], s), u.length < i[4].length && (u = gr(i[4].substr(i[4].length - u.length)) + u), a += u, a;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = Gn(o, Math.pow(10, s) - 1, !0), l + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? Aa(f[1], s) + i[2] + "/" + i[3] + Wn(f[2], s) : He(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return a = Dt(r, 0), t.length <= a.length ? a : gr(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(/^([#0?]+)\.([#0]+)$/)) {
    a = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var d = t.indexOf(".") - s, x = t.length - a.length - d;
    return gr(t.substr(0, d) + a + t.substr(t.length - x));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return s = qa(r, i[1].length), r < 0 ? "-" + Mr(e, t, -r) : ft(Us(r)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(g) {
      return "00," + (g.length < 3 ? Hr(0, 3 - g.length) : "") + g;
    }) + "." + Hr(s, i[1].length);
  switch (t) {
    case "###,##0.00":
      return Mr(e, "#,##0.00", r);
    case "###,###":
    case "##,###":
    case "#,###":
      var p = ft(Dt(o, 0));
      return p !== "0" ? l + p : "";
    case "###,###.00":
      return Mr(e, "###,##0.00", r).replace(/^0\./, ".");
    case "#,###.00":
      return Mr(e, "#,##0.00", r).replace(/^0\./, ".");
  }
  throw new Error("unsupported format |" + t + "|");
}
function Vs(e, t, r) {
  for (var n = t.length - 1; t.charCodeAt(n - 1) === 44; ) --n;
  return qr(e, t.substr(0, n), r / Math.pow(10, 3 * (t.length - n)));
}
function Ws(e, t, r) {
  var n = t.replace(B0, ""), a = t.length - n.length;
  return qr(e, n, r * Math.pow(10, 2 * a)) + He("%", a);
}
function G0(e, t) {
  var r, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0) return "0.0E+0";
    if (t < 0) return "-" + G0(e, -t);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(t) * Math.LOG10E) % a;
    if (i < 0 && (i += a), r = (t / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a), !r.match(/[Ee]/)) {
      var s = Math.floor(Math.log(t) * Math.LOG10E);
      r.indexOf(".") === -1 ? r = r.charAt(0) + "." + r.substr(1) + "E+" + (s - r.length + i) : r += "E+" + (s - i), r = r.replace(/\+-/, "-");
    }
    r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(f, o, l, u) {
      return o + l + u.substr(0, (a + i) % a) + "." + u.substr(i) + "E";
    });
  } else r = t.toExponential(n);
  return e.match(/E\+00$/) && r.match(/e[+-]\d$/) && (r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1)), e.match(/E\-/) && r.match(/e\+/) && (r = r.replace(/e\+/, "e")), r.replace("e", "E");
}
function zr(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(W0)) {
    var n = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? zr("n", n, r) : "(" + zr("n", n, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44) return Vs(e, t, r);
  if (t.indexOf("%") !== -1) return Ws(e, t, r);
  if (t.indexOf("E") !== -1) return G0(t, r);
  if (t.charCodeAt(0) === 36) return "$" + zr(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var a, i, s, f, o = Math.abs(r), l = r < 0 ? "-" : "";
  if (t.match(/^00+$/)) return l + Hr(o, t.length);
  if (t.match(/^[#?]+$/))
    return a = "" + r, r === 0 && (a = ""), a.length > t.length ? a : gr(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(U0)) return Bs(i, o, l);
  if (t.match(/^#+0+$/)) return l + Hr(o, t.length - t.indexOf("0"));
  if (i = t.match(V0))
    return a = ("" + r).replace(/^([^\.]+)$/, "$1." + gr(i[1])).replace(/\.$/, "." + gr(i[1])), a = a.replace(/\.(\d*)$/, function(g, h) {
      return "." + h + He("0", gr(i[1]).length - h.length);
    }), t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return l + ("" + o).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/)) return l + ft("" + o);
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + zr(e, t, -r) : ft("" + r) + "." + He("0", i[1].length);
  if (i = t.match(/^#,#*,#0/)) return zr(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = Mt(zr(e, t.replace(/[\\-]/g, ""), r)), s = 0, Mt(Mt(t.replace(/\\/g, "")).replace(/[0#]/g, function(g) {
      return s < a.length ? a.charAt(s++) : g === "0" ? "0" : "";
    }));
  if (t.match(H0))
    return a = zr(e, "##########", r), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var u = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), f = Gn(o, Math.pow(10, s) - 1, !1), a = "" + l, u = qr(
      "n",
      /*::String(*/
      i[1],
      f[1]
    ), u.charAt(u.length - 1) == " " && (u = u.substr(0, u.length - 1) + "0"), a += u + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], u = Wn(f[2], s), u.length < i[4].length && (u = gr(i[4].substr(i[4].length - u.length)) + u), a += u, a;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = Gn(o, Math.pow(10, s) - 1, !0), l + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? Aa(f[1], s) + i[2] + "/" + i[3] + Wn(f[2], s) : He(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return a = "" + r, t.length <= a.length ? a : gr(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(/^([#0]+)\.([#0]+)$/)) {
    a = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var d = t.indexOf(".") - s, x = t.length - a.length - d;
    return gr(t.substr(0, d) + a + t.substr(t.length - x));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return r < 0 ? "-" + zr(e, t, -r) : ft("" + r).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(g) {
      return "00," + (g.length < 3 ? Hr(0, 3 - g.length) : "") + g;
    }) + "." + Hr(0, i[1].length);
  switch (t) {
    case "###,###":
    case "##,###":
    case "#,###":
      var p = ft("" + o);
      return p !== "0" ? l + p : "";
    default:
      if (t.match(/\.[0#?]*$/)) return zr(e, t.slice(0, t.lastIndexOf(".")), r) + gr(t.slice(t.lastIndexOf(".")));
  }
  throw new Error("unsupported format |" + t + "|");
}
function qr(e, t, r) {
  return (r | 0) === r ? zr(e, t, r) : Mr(e, t, r);
}
function Hs(e) {
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
var X0 = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
function z0(e) {
  for (var t = 0, r = "", n = ""; t < e.length; )
    switch (r = e.charAt(t)) {
      case "G":
        Hn(e, t) && (t += 6), t++;
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
        if (n.match(X0)) return !0;
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
function Gs(e, t, r, n) {
  for (var a = [], i = "", s = 0, f = "", o = "t", l, u, d, x = "H"; s < e.length; )
    switch (f = e.charAt(s)) {
      case "G":
        if (!Hn(e, s)) throw new Error("unrecognized character " + f + " in " + e);
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
          if (l == null && (l = Nn(t, r, e.charAt(s + 1) === "2"), l == null))
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
        if (t < 0 || l == null && (l = Nn(t, r), l == null))
          return "";
        for (i = f; ++s < e.length && e.charAt(s).toLowerCase() === f; ) i += f;
        f === "m" && o.toLowerCase() === "h" && (f = "M"), f === "h" && (f = x), a[a.length] = { t: f, v: i }, o = f;
        break;
      case "A":
      case "a":
      case "上":
        var h = { t: f, v: f };
        if (l == null && (l = Nn(t, r)), e.substr(s, 3).toUpperCase() === "A/P" ? (l != null && (h.v = l.H >= 12 ? "P" : "A"), h.t = "T", x = "h", s += 3) : e.substr(s, 5).toUpperCase() === "AM/PM" ? (l != null && (h.v = l.H >= 12 ? "PM" : "AM"), h.t = "T", s += 5, x = "h") : e.substr(s, 5).toUpperCase() === "上午/下午" ? (l != null && (h.v = l.H >= 12 ? "下午" : "上午"), h.t = "T", s += 5, x = "h") : (h.t = "t", ++s), l == null && h.t === "T") return "";
        a[a.length] = h, o = f;
        break;
      case "[":
        for (i = f; e.charAt(s++) !== "]" && s < e.length; ) i += e.charAt(s);
        if (i.slice(-1) !== "]") throw 'unterminated "[" block: |' + i + "|";
        if (i.match(X0)) {
          if (l == null && (l = Nn(t, r), l == null))
            return "";
          a[a.length] = { t: "Z", v: i.toLowerCase() }, o = i.charAt(1);
        } else i.indexOf("$") > -1 && (i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$", z0(e) || (a[a.length] = { t: "t", v: i }));
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
  var T = 0, D = 0, k;
  for (s = a.length - 1, o = "t"; s >= 0; --s)
    switch (a[s].t) {
      case "h":
      case "H":
        a[s].t = x, o = "h", T < 1 && (T = 1);
        break;
      case "s":
        (k = a[s].v.match(/\.0+$/)) && (D = Math.max(D, k[0].length - 1)), T < 3 && (T = 3);
      case "d":
      case "y":
      case "M":
      case "e":
        o = a[s].t;
        break;
      case "m":
        o === "s" && (a[s].t = "M", T < 2 && (T = 2));
        break;
      case "X":
        break;
      case "Z":
        T < 1 && a[s].v.match(/[Hh]/) && (T = 1), T < 2 && a[s].v.match(/[Mm]/) && (T = 2), T < 3 && a[s].v.match(/[Ss]/) && (T = 3);
    }
  switch (T) {
    case 0:
      break;
    case 1:
      l.u >= 0.5 && (l.u = 0, ++l.S), l.S >= 60 && (l.S = 0, ++l.M), l.M >= 60 && (l.M = 0, ++l.H);
      break;
    case 2:
      l.u >= 0.5 && (l.u = 0, ++l.S), l.S >= 60 && (l.S = 0, ++l.M);
      break;
  }
  var C = "", U;
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
        a[s].v = Ns(a[s].t.charCodeAt(0), a[s].v, l, D), a[s].t = "t";
        break;
      case "n":
      case "?":
        for (U = s + 1; a[U] != null && ((f = a[U].t) === "?" || f === "D" || (f === " " || f === "t") && a[U + 1] != null && (a[U + 1].t === "?" || a[U + 1].t === "t" && a[U + 1].v === "/") || a[s].t === "(" && (f === " " || f === "n" || f === ")") || f === "t" && (a[U].v === "/" || a[U].v === " " && a[U + 1] != null && a[U + 1].t == "?")); )
          a[s].v += a[U].v, a[U] = { v: "", t: ";" }, ++U;
        C += a[s].v, s = U - 1;
        break;
      case "G":
        a[s].t = "t", a[s].v = _a(t, r);
        break;
    }
  var q = "", te, I;
  if (C.length > 0) {
    C.charCodeAt(0) == 40 ? (te = t < 0 && C.charCodeAt(0) === 45 ? -t : t, I = qr("n", C, te)) : (te = t < 0 && n > 1 ? -t : t, I = qr("n", C, te), te < 0 && a[0] && a[0].t == "t" && (I = I.substr(1), a[0].v = "-" + a[0].v)), U = I.length - 1;
    var V = a.length;
    for (s = 0; s < a.length; ++s) if (a[s] != null && a[s].t != "t" && a[s].v.indexOf(".") > -1) {
      V = s;
      break;
    }
    var b = a.length;
    if (V === a.length && I.indexOf("E") === -1) {
      for (s = a.length - 1; s >= 0; --s)
        a[s] == null || "n?".indexOf(a[s].t) === -1 || (U >= a[s].v.length - 1 ? (U -= a[s].v.length, a[s].v = I.substr(U + 1, a[s].v.length)) : U < 0 ? a[s].v = "" : (a[s].v = I.substr(0, U + 1), U = -1), a[s].t = "t", b = s);
      U >= 0 && b < a.length && (a[b].v = I.substr(0, U + 1) + a[b].v);
    } else if (V !== a.length && I.indexOf("E") === -1) {
      for (U = I.indexOf(".") - 1, s = V; s >= 0; --s)
        if (!(a[s] == null || "n?".indexOf(a[s].t) === -1)) {
          for (u = a[s].v.indexOf(".") > -1 && s === V ? a[s].v.indexOf(".") - 1 : a[s].v.length - 1, q = a[s].v.substr(u + 1); u >= 0; --u)
            U >= 0 && (a[s].v.charAt(u) === "0" || a[s].v.charAt(u) === "#") && (q = I.charAt(U--) + q);
          a[s].v = q, a[s].t = "t", b = s;
        }
      for (U >= 0 && b < a.length && (a[b].v = I.substr(0, U + 1) + a[b].v), U = I.indexOf(".") + 1, s = V; s < a.length; ++s)
        if (!(a[s] == null || "n?(".indexOf(a[s].t) === -1 && s !== V)) {
          for (u = a[s].v.indexOf(".") > -1 && s === V ? a[s].v.indexOf(".") + 1 : 0, q = a[s].v.substr(0, u); u < a[s].v.length; ++u)
            U < I.length && (q += I.charAt(U++));
          a[s].v = q, a[s].t = "t", b = s;
        }
    }
  }
  for (s = 0; s < a.length; ++s) a[s] != null && "n?".indexOf(a[s].t) > -1 && (te = n > 1 && t < 0 && s > 0 && a[s - 1].v === "-" ? -t : t, a[s].v = qr(a[s].t, a[s].v, te), a[s].t = "t");
  var j = "";
  for (s = 0; s !== a.length; ++s) a[s] != null && (j += a[s].v);
  return j;
}
var Qa = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
function e0(e, t) {
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
function Xs(e, t) {
  var r = Hs(e), n = r.length, a = r[n - 1].indexOf("@");
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
    var s = r[0].match(Qa), f = r[1].match(Qa);
    return e0(t, s) ? [n, r[0]] : e0(t, f) ? [n, r[1]] : [n, r[s != null && f != null ? 2 : 1]];
  }
  return [n, i];
}
function lt(e, t, r) {
  r == null && (r = {});
  var n = "";
  switch (typeof e) {
    case "string":
      e == "m/d/yy" && r.dateNF ? n = r.dateNF : n = e;
      break;
    case "number":
      e == 14 && r.dateNF ? n = r.dateNF : n = (r.table != null ? r.table : Ge)[e], n == null && (n = r.table && r.table[Ja[e]] || Ge[Ja[e]]), n == null && (n = Fs[e] || "General");
      break;
  }
  if (Hn(n, 0)) return _a(t, r);
  t instanceof Date && (t = M0(t, r.date1904));
  var a = Xs(n, t);
  if (Hn(a[1])) return _a(t, r);
  if (t === !0) t = "TRUE";
  else if (t === !1) t = "FALSE";
  else if (t === "" || t == null) return "";
  return Gs(a[1], t, r, a[0]);
}
function $0(e, t) {
  if (typeof t != "number") {
    t = +t || -1;
    for (var r = 0; r < 392; ++r) {
      if (Ge[r] == null) {
        t < 0 && (t = r);
        continue;
      }
      if (Ge[r] == e) {
        t = r;
        break;
      }
    }
    t < 0 && (t = 391);
  }
  return Ge[t] = e, t;
}
function ra(e) {
  for (var t = 0; t != 392; ++t)
    e[t] !== void 0 && $0(e[t], t);
}
function ta() {
  Ge = As();
}
var j0 = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
function zs(e) {
  var t = typeof e == "number" ? Ge[e] : e;
  return t = t.replace(j0, "(\\d+)"), new RegExp("^" + t + "$");
}
function $s(e, t, r) {
  var n = -1, a = -1, i = -1, s = -1, f = -1, o = -1;
  (t.match(j0) || []).forEach(function(d, x) {
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
  var u = ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + ("00" + (f >= 0 ? f : 0)).slice(-2) + ":" + ("00" + (o >= 0 ? o : 0)).slice(-2);
  return s == -1 && f == -1 && o == -1 ? l : n == -1 && a == -1 && i == -1 ? u : l + "T" + u;
}
var js = /* @__PURE__ */ function() {
  var e = {};
  e.version = "1.2.0";
  function t() {
    for (var I = 0, V = new Array(256), b = 0; b != 256; ++b)
      I = b, I = I & 1 ? -306674912 ^ I >>> 1 : I >>> 1, I = I & 1 ? -306674912 ^ I >>> 1 : I >>> 1, I = I & 1 ? -306674912 ^ I >>> 1 : I >>> 1, I = I & 1 ? -306674912 ^ I >>> 1 : I >>> 1, I = I & 1 ? -306674912 ^ I >>> 1 : I >>> 1, I = I & 1 ? -306674912 ^ I >>> 1 : I >>> 1, I = I & 1 ? -306674912 ^ I >>> 1 : I >>> 1, I = I & 1 ? -306674912 ^ I >>> 1 : I >>> 1, V[b] = I;
    return typeof Int32Array < "u" ? new Int32Array(V) : V;
  }
  var r = t();
  function n(I) {
    var V = 0, b = 0, j = 0, Y = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
    for (j = 0; j != 256; ++j) Y[j] = I[j];
    for (j = 0; j != 256; ++j)
      for (b = I[j], V = 256 + j; V < 4096; V += 256) b = Y[V] = b >>> 8 ^ I[b & 255];
    var J = [];
    for (j = 1; j != 16; ++j) J[j - 1] = typeof Int32Array < "u" ? Y.subarray(j * 256, j * 256 + 256) : Y.slice(j * 256, j * 256 + 256);
    return J;
  }
  var a = n(r), i = a[0], s = a[1], f = a[2], o = a[3], l = a[4], u = a[5], d = a[6], x = a[7], p = a[8], g = a[9], h = a[10], T = a[11], D = a[12], k = a[13], C = a[14];
  function U(I, V) {
    for (var b = V ^ -1, j = 0, Y = I.length; j < Y; ) b = b >>> 8 ^ r[(b ^ I.charCodeAt(j++)) & 255];
    return ~b;
  }
  function q(I, V) {
    for (var b = V ^ -1, j = I.length - 15, Y = 0; Y < j; ) b = C[I[Y++] ^ b & 255] ^ k[I[Y++] ^ b >> 8 & 255] ^ D[I[Y++] ^ b >> 16 & 255] ^ T[I[Y++] ^ b >>> 24] ^ h[I[Y++]] ^ g[I[Y++]] ^ p[I[Y++]] ^ x[I[Y++]] ^ d[I[Y++]] ^ u[I[Y++]] ^ l[I[Y++]] ^ o[I[Y++]] ^ f[I[Y++]] ^ s[I[Y++]] ^ i[I[Y++]] ^ r[I[Y++]];
    for (j += 15; Y < j; ) b = b >>> 8 ^ r[(b ^ I[Y++]) & 255];
    return ~b;
  }
  function te(I, V) {
    for (var b = V ^ -1, j = 0, Y = I.length, J = 0, ie = 0; j < Y; )
      J = I.charCodeAt(j++), J < 128 ? b = b >>> 8 ^ r[(b ^ J) & 255] : J < 2048 ? (b = b >>> 8 ^ r[(b ^ (192 | J >> 6 & 31)) & 255], b = b >>> 8 ^ r[(b ^ (128 | J & 63)) & 255]) : J >= 55296 && J < 57344 ? (J = (J & 1023) + 64, ie = I.charCodeAt(j++) & 1023, b = b >>> 8 ^ r[(b ^ (240 | J >> 8 & 7)) & 255], b = b >>> 8 ^ r[(b ^ (128 | J >> 2 & 63)) & 255], b = b >>> 8 ^ r[(b ^ (128 | ie >> 6 & 15 | (J & 3) << 4)) & 255], b = b >>> 8 ^ r[(b ^ (128 | ie & 63)) & 255]) : (b = b >>> 8 ^ r[(b ^ (224 | J >> 12 & 15)) & 255], b = b >>> 8 ^ r[(b ^ (128 | J >> 6 & 63)) & 255], b = b >>> 8 ^ r[(b ^ (128 | J & 63)) & 255]);
    return ~b;
  }
  return e.table = r, e.bstr = U, e.buf = q, e.str = te, e;
}(), Le = /* @__PURE__ */ function() {
  var t = {};
  t.version = "1.2.1";
  function r(c, _) {
    for (var v = c.split("/"), m = _.split("/"), E = 0, w = 0, N = Math.min(v.length, m.length); E < N; ++E) {
      if (w = v[E].length - m[E].length) return w;
      if (v[E] != m[E]) return v[E] < m[E] ? -1 : 1;
    }
    return v.length - m.length;
  }
  function n(c) {
    if (c.charAt(c.length - 1) == "/") return c.slice(0, -1).indexOf("/") === -1 ? c : n(c.slice(0, -1));
    var _ = c.lastIndexOf("/");
    return _ === -1 ? c : c.slice(0, _ + 1);
  }
  function a(c) {
    if (c.charAt(c.length - 1) == "/") return a(c.slice(0, -1));
    var _ = c.lastIndexOf("/");
    return _ === -1 ? c : c.slice(_ + 1);
  }
  function i(c, _) {
    typeof _ == "string" && (_ = new Date(_));
    var v = _.getHours();
    v = v << 6 | _.getMinutes(), v = v << 5 | _.getSeconds() >>> 1, c.write_shift(2, v);
    var m = _.getFullYear() - 1980;
    m = m << 4 | _.getMonth() + 1, m = m << 5 | _.getDate(), c.write_shift(2, m);
  }
  function s(c) {
    var _ = c.read_shift(2) & 65535, v = c.read_shift(2) & 65535, m = /* @__PURE__ */ new Date(), E = v & 31;
    v >>>= 5;
    var w = v & 15;
    v >>>= 4, m.setMilliseconds(0), m.setFullYear(v + 1980), m.setMonth(w - 1), m.setDate(E);
    var N = _ & 31;
    _ >>>= 5;
    var H = _ & 63;
    return _ >>>= 6, m.setHours(_), m.setMinutes(H), m.setSeconds(N << 1), m;
  }
  function f(c) {
    Ir(c, 0);
    for (var _ = (
      /*::(*/
      {}
    ), v = 0; c.l <= c.length - 4; ) {
      var m = c.read_shift(2), E = c.read_shift(2), w = c.l + E, N = {};
      switch (m) {
        case 21589:
          v = c.read_shift(1), v & 1 && (N.mtime = c.read_shift(4)), E > 5 && (v & 2 && (N.atime = c.read_shift(4)), v & 4 && (N.ctime = c.read_shift(4))), N.mtime && (N.mt = new Date(N.mtime * 1e3));
          break;
      }
      c.l = w, _[m] = N;
    }
    return _;
  }
  var o;
  function l() {
    return o || (o = {});
  }
  function u(c, _) {
    if (c[0] == 80 && c[1] == 75) return pe(c, _);
    if ((c[0] | 32) == 109 && (c[1] | 32) == 105) return Cn(c, _);
    if (c.length < 512) throw new Error("CFB file size " + c.length + " < 512");
    var v = 3, m = 512, E = 0, w = 0, N = 0, H = 0, R = 0, P = [], B = (
      /*::(*/
      c.slice(0, 512)
    );
    Ir(B, 0);
    var Z = d(B);
    switch (v = Z[0], v) {
      case 3:
        m = 512;
        break;
      case 4:
        m = 4096;
        break;
      case 0:
        if (Z[1] == 0) return pe(c, _);
      default:
        throw new Error("Major Version: Expected 3 or 4 saw " + v);
    }
    m !== 512 && (B = /*::(*/
    c.slice(0, m), Ir(
      B,
      28
      /* blob.l */
    ));
    var ae = c.slice(0, m);
    x(B, v);
    var fe = B.read_shift(4, "i");
    if (v === 3 && fe !== 0) throw new Error("# Directory Sectors: Expected 0 saw " + fe);
    B.l += 4, N = B.read_shift(4, "i"), B.l += 4, B.chk("00100000", "Mini Stream Cutoff Size: "), H = B.read_shift(4, "i"), E = B.read_shift(4, "i"), R = B.read_shift(4, "i"), w = B.read_shift(4, "i");
    for (var Q = -1, se = 0; se < 109 && (Q = B.read_shift(4, "i"), !(Q < 0)); ++se)
      P[se] = Q;
    var _e = p(c, m);
    T(R, w, _e, m, P);
    var Ve = k(_e, N, P, m);
    Ve[N].name = "!Directory", E > 0 && H !== ie && (Ve[H].name = "!MiniFAT"), Ve[P[0]].name = "!FAT", Ve.fat_addrs = P, Ve.ssz = m;
    var We = {}, hr = [], jt = [], Kt = [];
    C(N, Ve, _e, hr, E, We, jt, H), g(jt, Kt, hr), hr.shift();
    var Yt = {
      FileIndex: jt,
      FullPaths: Kt
    };
    return _ && _.raw && (Yt.raw = { header: ae, sectors: _e }), Yt;
  }
  function d(c) {
    if (c[c.l] == 80 && c[c.l + 1] == 75) return [0, 0];
    c.chk(ye, "Header Signature: "), c.l += 16;
    var _ = c.read_shift(2, "u");
    return [c.read_shift(2, "u"), _];
  }
  function x(c, _) {
    var v = 9;
    switch (c.l += 2, v = c.read_shift(2)) {
      case 9:
        if (_ != 3) throw new Error("Sector Shift: Expected 9 saw " + v);
        break;
      case 12:
        if (_ != 4) throw new Error("Sector Shift: Expected 12 saw " + v);
        break;
      default:
        throw new Error("Sector Shift: Expected 9 or 12 saw " + v);
    }
    c.chk("0600", "Mini Sector Shift: "), c.chk("000000000000", "Reserved: ");
  }
  function p(c, _) {
    for (var v = Math.ceil(c.length / _) - 1, m = [], E = 1; E < v; ++E) m[E - 1] = c.slice(E * _, (E + 1) * _);
    return m[v - 1] = c.slice(v * _), m;
  }
  function g(c, _, v) {
    for (var m = 0, E = 0, w = 0, N = 0, H = 0, R = v.length, P = [], B = []; m < R; ++m)
      P[m] = B[m] = m, _[m] = v[m];
    for (; H < B.length; ++H)
      m = B[H], E = c[m].L, w = c[m].R, N = c[m].C, P[m] === m && (E !== -1 && P[E] !== E && (P[m] = P[E]), w !== -1 && P[w] !== w && (P[m] = P[w])), N !== -1 && (P[N] = m), E !== -1 && m != P[m] && (P[E] = P[m], B.lastIndexOf(E) < H && B.push(E)), w !== -1 && m != P[m] && (P[w] = P[m], B.lastIndexOf(w) < H && B.push(w));
    for (m = 1; m < R; ++m) P[m] === m && (w !== -1 && P[w] !== w ? P[m] = P[w] : E !== -1 && P[E] !== E && (P[m] = P[E]));
    for (m = 1; m < R; ++m)
      if (c[m].type !== 0) {
        if (H = m, H != P[H]) do
          H = P[H], _[m] = _[H] + "/" + _[m];
        while (H !== 0 && P[H] !== -1 && H != P[H]);
        P[m] = -1;
      }
    for (_[0] += "/", m = 1; m < R; ++m)
      c[m].type !== 2 && (_[m] += "/");
  }
  function h(c, _, v) {
    for (var m = c.start, E = c.size, w = [], N = m; v && E > 0 && N >= 0; )
      w.push(_.slice(N * J, N * J + J)), E -= J, N = dt(v, N * 4);
    return w.length === 0 ? W(0) : lr(w).slice(0, c.size);
  }
  function T(c, _, v, m, E) {
    var w = ie;
    if (c === ie) {
      if (_ !== 0) throw new Error("DIFAT chain shorter than expected");
    } else if (c !== -1) {
      var N = v[c], H = (m >>> 2) - 1;
      if (!N) return;
      for (var R = 0; R < H && (w = dt(N, R * 4)) !== ie; ++R)
        E.push(w);
      T(dt(N, m - 4), _ - 1, v, m, E);
    }
  }
  function D(c, _, v, m, E) {
    var w = [], N = [];
    E || (E = []);
    var H = m - 1, R = 0, P = 0;
    for (R = _; R >= 0; ) {
      E[R] = !0, w[w.length] = R, N.push(c[R]);
      var B = v[Math.floor(R * 4 / m)];
      if (P = R * 4 & H, m < 4 + P) throw new Error("FAT boundary crossed: " + R + " 4 " + m);
      if (!c[B]) break;
      R = dt(c[B], P);
    }
    return { nodes: w, data: l0([N]) };
  }
  function k(c, _, v, m) {
    var E = c.length, w = [], N = [], H = [], R = [], P = m - 1, B = 0, Z = 0, ae = 0, fe = 0;
    for (B = 0; B < E; ++B)
      if (H = [], ae = B + _, ae >= E && (ae -= E), !N[ae]) {
        R = [];
        var Q = [];
        for (Z = ae; Z >= 0; ) {
          Q[Z] = !0, N[Z] = !0, H[H.length] = Z, R.push(c[Z]);
          var se = v[Math.floor(Z * 4 / m)];
          if (fe = Z * 4 & P, m < 4 + fe) throw new Error("FAT boundary crossed: " + Z + " 4 " + m);
          if (!c[se] || (Z = dt(c[se], fe), Q[Z])) break;
        }
        w[ae] = { nodes: H, data: l0([R]) };
      }
    return w;
  }
  function C(c, _, v, m, E, w, N, H) {
    for (var R = 0, P = m.length ? 2 : 0, B = _[c].data, Z = 0, ae = 0, fe; Z < B.length; Z += 128) {
      var Q = (
        /*::(*/
        B.slice(Z, Z + 128)
      );
      Ir(Q, 64), ae = Q.read_shift(2), fe = ka(Q, 0, ae - P), m.push(fe);
      var se = {
        name: fe,
        type: Q.read_shift(1),
        color: Q.read_shift(1),
        L: Q.read_shift(4, "i"),
        R: Q.read_shift(4, "i"),
        C: Q.read_shift(4, "i"),
        clsid: Q.read_shift(16),
        state: Q.read_shift(4, "i"),
        start: 0,
        size: 0
      }, _e = Q.read_shift(2) + Q.read_shift(2) + Q.read_shift(2) + Q.read_shift(2);
      _e !== 0 && (se.ct = U(Q, Q.l - 8));
      var Ve = Q.read_shift(2) + Q.read_shift(2) + Q.read_shift(2) + Q.read_shift(2);
      Ve !== 0 && (se.mt = U(Q, Q.l - 8)), se.start = Q.read_shift(4, "i"), se.size = Q.read_shift(4, "i"), se.size < 0 && se.start < 0 && (se.size = se.type = 0, se.start = ie, se.name = ""), se.type === 5 ? (R = se.start, E > 0 && R !== ie && (_[R].name = "!StreamData")) : se.size >= 4096 ? (se.storage = "fat", _[se.start] === void 0 && (_[se.start] = D(v, se.start, _.fat_addrs, _.ssz)), _[se.start].name = se.name, se.content = _[se.start].data.slice(0, se.size)) : (se.storage = "minifat", se.size < 0 ? se.size = 0 : R !== ie && se.start !== ie && _[R] && (se.content = h(se, _[R].data, (_[H] || {}).data))), se.content && Ir(se.content, 0), w[fe] = se, N.push(se);
    }
  }
  function U(c, _) {
    return new Date((Dr(c, _ + 4) / 1e7 * Math.pow(2, 32) + Dr(c, _) / 1e7 - 11644473600) * 1e3);
  }
  function q(c, _) {
    return l(), u(o.readFileSync(c), _);
  }
  function te(c, _) {
    var v = _ && _.type;
    switch (v || Ie && Buffer.isBuffer(c) && (v = "buffer"), v || "base64") {
      case "file":
        return q(c, _);
      case "base64":
        return u(Wr(rt(c)), _);
      case "binary":
        return u(Wr(c), _);
    }
    return u(
      /*::typeof blob == 'string' ? new Buffer(blob, 'utf-8') : */
      c,
      _
    );
  }
  function I(c, _) {
    var v = _ || {}, m = v.root || "Root Entry";
    if (c.FullPaths || (c.FullPaths = []), c.FileIndex || (c.FileIndex = []), c.FullPaths.length !== c.FileIndex.length) throw new Error("inconsistent CFB structure");
    c.FullPaths.length === 0 && (c.FullPaths[0] = m + "/", c.FileIndex[0] = { name: m, type: 5 }), v.CLSID && (c.FileIndex[0].clsid = v.CLSID), V(c);
  }
  function V(c) {
    var _ = "Sh33tJ5";
    if (!Le.find(c, "/" + _)) {
      var v = W(4);
      v[0] = 55, v[1] = v[3] = 50, v[2] = 54, c.FileIndex.push({ name: _, type: 2, content: v, size: 4, L: 69, R: 69, C: 69 }), c.FullPaths.push(c.FullPaths[0] + _), b(c);
    }
  }
  function b(c, _) {
    I(c);
    for (var v = !1, m = !1, E = c.FullPaths.length - 1; E >= 0; --E) {
      var w = c.FileIndex[E];
      switch (w.type) {
        case 0:
          m ? v = !0 : (c.FileIndex.pop(), c.FullPaths.pop());
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
    if (!(!v && !_)) {
      var N = new Date(1987, 1, 19), H = 0, R = Object.create ? /* @__PURE__ */ Object.create(null) : {}, P = [];
      for (E = 0; E < c.FullPaths.length; ++E)
        R[c.FullPaths[E]] = !0, c.FileIndex[E].type !== 0 && P.push([c.FullPaths[E], c.FileIndex[E]]);
      for (E = 0; E < P.length; ++E) {
        var B = n(P[E][0]);
        m = R[B], m || (P.push([B, {
          name: a(B).replace("/", ""),
          type: 1,
          clsid: ve,
          ct: N,
          mt: N,
          content: null
        }]), R[B] = !0);
      }
      for (P.sort(function(fe, Q) {
        return r(fe[0], Q[0]);
      }), c.FullPaths = [], c.FileIndex = [], E = 0; E < P.length; ++E)
        c.FullPaths[E] = P[E][0], c.FileIndex[E] = P[E][1];
      for (E = 0; E < P.length; ++E) {
        var Z = c.FileIndex[E], ae = c.FullPaths[E];
        if (Z.name = a(ae).replace("/", ""), Z.L = Z.R = Z.C = -(Z.color = 1), Z.size = Z.content ? Z.content.length : 0, Z.start = 0, Z.clsid = Z.clsid || ve, E === 0)
          Z.C = P.length > 1 ? 1 : -1, Z.size = 0, Z.type = 5;
        else if (ae.slice(-1) == "/") {
          for (H = E + 1; H < P.length && n(c.FullPaths[H]) != ae; ++H) ;
          for (Z.C = H >= P.length ? -1 : H, H = E + 1; H < P.length && n(c.FullPaths[H]) != n(ae); ++H) ;
          Z.R = H >= P.length ? -1 : H, Z.type = 1;
        } else
          n(c.FullPaths[E + 1] || "") == n(ae) && (Z.R = E + 1), Z.type = 2;
      }
    }
  }
  function j(c, _) {
    var v = _ || {};
    if (v.fileType == "mad") return It(c, v);
    switch (b(c), v.fileType) {
      case "zip":
        return ce(c, v);
    }
    var m = function(fe) {
      for (var Q = 0, se = 0, _e = 0; _e < fe.FileIndex.length; ++_e) {
        var Ve = fe.FileIndex[_e];
        if (Ve.content) {
          var We = Ve.content.length;
          We > 0 && (We < 4096 ? Q += We + 63 >> 6 : se += We + 511 >> 9);
        }
      }
      for (var hr = fe.FullPaths.length + 3 >> 2, jt = Q + 7 >> 3, Kt = Q + 127 >> 7, Yt = jt + se + hr + Kt, xt = Yt + 127 >> 7, oa = xt <= 109 ? 0 : Math.ceil((xt - 109) / 127); Yt + xt + oa + 127 >> 7 > xt; ) oa = ++xt <= 109 ? 0 : Math.ceil((xt - 109) / 127);
      var Jr = [1, oa, xt, Kt, hr, se, Q, 0];
      return fe.FileIndex[0].size = Q << 6, Jr[7] = (fe.FileIndex[0].start = Jr[0] + Jr[1] + Jr[2] + Jr[3] + Jr[4] + Jr[5]) + (Jr[6] + 7 >> 3), Jr;
    }(c), E = W(m[7] << 9), w = 0, N = 0;
    {
      for (w = 0; w < 8; ++w) E.write_shift(1, de[w]);
      for (w = 0; w < 8; ++w) E.write_shift(2, 0);
      for (E.write_shift(2, 62), E.write_shift(2, 3), E.write_shift(2, 65534), E.write_shift(2, 9), E.write_shift(2, 6), w = 0; w < 3; ++w) E.write_shift(2, 0);
      for (E.write_shift(4, 0), E.write_shift(4, m[2]), E.write_shift(4, m[0] + m[1] + m[2] + m[3] - 1), E.write_shift(4, 0), E.write_shift(4, 4096), E.write_shift(4, m[3] ? m[0] + m[1] + m[2] - 1 : ie), E.write_shift(4, m[3]), E.write_shift(-4, m[1] ? m[0] - 1 : ie), E.write_shift(4, m[1]), w = 0; w < 109; ++w) E.write_shift(-4, w < m[2] ? m[1] + w : -1);
    }
    if (m[1])
      for (N = 0; N < m[1]; ++N) {
        for (; w < 236 + N * 127; ++w) E.write_shift(-4, w < m[2] ? m[1] + w : -1);
        E.write_shift(-4, N === m[1] - 1 ? ie : N + 1);
      }
    var H = function(fe) {
      for (N += fe; w < N - 1; ++w) E.write_shift(-4, w + 1);
      fe && (++w, E.write_shift(-4, ie));
    };
    for (N = w = 0, N += m[1]; w < N; ++w) E.write_shift(-4, be.DIFSECT);
    for (N += m[2]; w < N; ++w) E.write_shift(-4, be.FATSECT);
    H(m[3]), H(m[4]);
    for (var R = 0, P = 0, B = c.FileIndex[0]; R < c.FileIndex.length; ++R)
      B = c.FileIndex[R], B.content && (P = B.content.length, !(P < 4096) && (B.start = N, H(P + 511 >> 9)));
    for (H(m[6] + 7 >> 3); E.l & 511; ) E.write_shift(-4, be.ENDOFCHAIN);
    for (N = w = 0, R = 0; R < c.FileIndex.length; ++R)
      B = c.FileIndex[R], B.content && (P = B.content.length, !(!P || P >= 4096) && (B.start = N, H(P + 63 >> 6)));
    for (; E.l & 511; ) E.write_shift(-4, be.ENDOFCHAIN);
    for (w = 0; w < m[4] << 2; ++w) {
      var Z = c.FullPaths[w];
      if (!Z || Z.length === 0) {
        for (R = 0; R < 17; ++R) E.write_shift(4, 0);
        for (R = 0; R < 3; ++R) E.write_shift(4, -1);
        for (R = 0; R < 12; ++R) E.write_shift(4, 0);
        continue;
      }
      B = c.FileIndex[w], w === 0 && (B.start = B.size ? B.start - 1 : ie);
      var ae = w === 0 && v.root || B.name;
      if (P = 2 * (ae.length + 1), E.write_shift(64, ae, "utf16le"), E.write_shift(2, P), E.write_shift(1, B.type), E.write_shift(1, B.color), E.write_shift(-4, B.L), E.write_shift(-4, B.R), E.write_shift(-4, B.C), B.clsid) E.write_shift(16, B.clsid, "hex");
      else for (R = 0; R < 4; ++R) E.write_shift(4, 0);
      E.write_shift(4, B.state || 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, B.start), E.write_shift(4, B.size), E.write_shift(4, 0);
    }
    for (w = 1; w < c.FileIndex.length; ++w)
      if (B = c.FileIndex[w], B.size >= 4096)
        if (E.l = B.start + 1 << 9, Ie && Buffer.isBuffer(B.content))
          B.content.copy(E, E.l, 0, B.size), E.l += B.size + 511 & -512;
        else {
          for (R = 0; R < B.size; ++R) E.write_shift(1, B.content[R]);
          for (; R & 511; ++R) E.write_shift(1, 0);
        }
    for (w = 1; w < c.FileIndex.length; ++w)
      if (B = c.FileIndex[w], B.size > 0 && B.size < 4096)
        if (Ie && Buffer.isBuffer(B.content))
          B.content.copy(E, E.l, 0, B.size), E.l += B.size + 63 & -64;
        else {
          for (R = 0; R < B.size; ++R) E.write_shift(1, B.content[R]);
          for (; R & 63; ++R) E.write_shift(1, 0);
        }
    if (Ie)
      E.l = E.length;
    else
      for (; E.l < E.length; ) E.write_shift(1, 0);
    return E;
  }
  function Y(c, _) {
    var v = c.FullPaths.map(function(R) {
      return R.toUpperCase();
    }), m = v.map(function(R) {
      var P = R.split("/");
      return P[P.length - (R.slice(-1) == "/" ? 2 : 1)];
    }), E = !1;
    _.charCodeAt(0) === 47 ? (E = !0, _ = v[0].slice(0, -1) + _) : E = _.indexOf("/") !== -1;
    var w = _.toUpperCase(), N = E === !0 ? v.indexOf(w) : m.indexOf(w);
    if (N !== -1) return c.FileIndex[N];
    var H = !w.match(Rn);
    for (w = w.replace(nn, ""), H && (w = w.replace(Rn, "!")), N = 0; N < v.length; ++N)
      if ((H ? v[N].replace(Rn, "!") : v[N]).replace(nn, "") == w || (H ? m[N].replace(Rn, "!") : m[N]).replace(nn, "") == w) return c.FileIndex[N];
    return null;
  }
  var J = 64, ie = -2, ye = "d0cf11e0a1b11ae1", de = [208, 207, 17, 224, 161, 177, 26, 225], ve = "00000000000000000000000000000000", be = {
    /* 2.1 Compund File Sector Numbers and Types */
    MAXREGSECT: -6,
    DIFSECT: -4,
    FATSECT: -3,
    ENDOFCHAIN: ie,
    FREESECT: -1,
    /* 2.2 Compound File Header */
    HEADER_SIGNATURE: ye,
    HEADER_MINOR_VERSION: "3e00",
    MAXREGSID: -6,
    NOSTREAM: -1,
    HEADER_CLSID: ve,
    /* 2.6.1 Compound File Directory Entry */
    EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
  };
  function yr(c, _, v) {
    l();
    var m = j(c, v);
    o.writeFileSync(_, m);
  }
  function Xe(c) {
    for (var _ = new Array(c.length), v = 0; v < c.length; ++v) _[v] = String.fromCharCode(c[v]);
    return _.join("");
  }
  function Er(c, _) {
    var v = j(c, _);
    switch (_ && _.type || "buffer") {
      case "file":
        return l(), o.writeFileSync(_.filename, v), v;
      case "binary":
        return typeof v == "string" ? v : Xe(v);
      case "base64":
        return cn(typeof v == "string" ? v : Xe(v));
      case "buffer":
        if (Ie) return Buffer.isBuffer(v) ? v : nt(v);
      case "array":
        return typeof v == "string" ? Wr(v) : v;
    }
    return v;
  }
  var pr;
  function A(c) {
    try {
      var _ = c.InflateRaw, v = new _();
      if (v._processChunk(new Uint8Array([3, 0]), v._finishFlushFlag), v.bytesRead) pr = c;
      else throw new Error("zlib does not expose bytesRead");
    } catch (m) {
      console.error("cannot use native zlib: " + (m.message || m));
    }
  }
  function M(c, _) {
    if (!pr) return S(c, _);
    var v = pr.InflateRaw, m = new v(), E = m._processChunk(c.slice(c.l), m._finishFlushFlag);
    return c.l += m.bytesRead, E;
  }
  function F(c) {
    return pr ? pr.deflateRawSync(c) : An(c);
  }
  var y = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], X = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], he = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
  function xe(c) {
    var _ = (c << 1 | c << 11) & 139536 | (c << 5 | c << 15) & 558144;
    return (_ >> 16 | _ >> 8 | _) & 255;
  }
  for (var oe = typeof Uint8Array < "u", ne = oe ? new Uint8Array(256) : [], Ce = 0; Ce < 256; ++Ce) ne[Ce] = xe(Ce);
  function me(c, _) {
    var v = ne[c & 255];
    return _ <= 8 ? v >>> 8 - _ : (v = v << 8 | ne[c >> 8 & 255], _ <= 16 ? v >>> 16 - _ : (v = v << 8 | ne[c >> 16 & 255], v >>> 24 - _));
  }
  function ze(c, _) {
    var v = _ & 7, m = _ >>> 3;
    return (c[m] | (v <= 6 ? 0 : c[m + 1] << 8)) >>> v & 3;
  }
  function Se(c, _) {
    var v = _ & 7, m = _ >>> 3;
    return (c[m] | (v <= 5 ? 0 : c[m + 1] << 8)) >>> v & 7;
  }
  function Nr(c, _) {
    var v = _ & 7, m = _ >>> 3;
    return (c[m] | (v <= 4 ? 0 : c[m + 1] << 8)) >>> v & 15;
  }
  function Ue(c, _) {
    var v = _ & 7, m = _ >>> 3;
    return (c[m] | (v <= 3 ? 0 : c[m + 1] << 8)) >>> v & 31;
  }
  function le(c, _) {
    var v = _ & 7, m = _ >>> 3;
    return (c[m] | (v <= 1 ? 0 : c[m + 1] << 8)) >>> v & 127;
  }
  function er(c, _, v) {
    var m = _ & 7, E = _ >>> 3, w = (1 << v) - 1, N = c[E] >>> m;
    return v < 8 - m || (N |= c[E + 1] << 8 - m, v < 16 - m) || (N |= c[E + 2] << 16 - m, v < 24 - m) || (N |= c[E + 3] << 24 - m), N & w;
  }
  function Cr(c, _, v) {
    var m = _ & 7, E = _ >>> 3;
    return m <= 5 ? c[E] |= (v & 7) << m : (c[E] |= v << m & 255, c[E + 1] = (v & 7) >> 8 - m), _ + 3;
  }
  function Pe(c, _, v) {
    var m = _ & 7, E = _ >>> 3;
    return v = (v & 1) << m, c[E] |= v, _ + 1;
  }
  function at(c, _, v) {
    var m = _ & 7, E = _ >>> 3;
    return v <<= m, c[E] |= v & 255, v >>>= 8, c[E + 1] = v, _ + 8;
  }
  function Sn(c, _, v) {
    var m = _ & 7, E = _ >>> 3;
    return v <<= m, c[E] |= v & 255, v >>>= 8, c[E + 1] = v & 255, c[E + 2] = v >>> 8, _ + 16;
  }
  function zt(c, _) {
    var v = c.length, m = 2 * v > _ ? 2 * v : _ + 5, E = 0;
    if (v >= _) return c;
    if (Ie) {
      var w = ja(m);
      if (c.copy) c.copy(w);
      else for (; E < c.length; ++E) w[E] = c[E];
      return w;
    } else if (oe) {
      var N = new Uint8Array(m);
      if (N.set) N.set(c);
      else for (; E < v; ++E) N[E] = c[E];
      return N;
    }
    return c.length = m, c;
  }
  function Pr(c) {
    for (var _ = new Array(c), v = 0; v < c; ++v) _[v] = 0;
    return _;
  }
  function At(c, _, v) {
    var m = 1, E = 0, w = 0, N = 0, H = 0, R = c.length, P = oe ? new Uint16Array(32) : Pr(32);
    for (w = 0; w < 32; ++w) P[w] = 0;
    for (w = R; w < v; ++w) c[w] = 0;
    R = c.length;
    var B = oe ? new Uint16Array(R) : Pr(R);
    for (w = 0; w < R; ++w)
      P[E = c[w]]++, m < E && (m = E), B[w] = 0;
    for (P[0] = 0, w = 1; w <= m; ++w) P[w + 16] = H = H + P[w - 1] << 1;
    for (w = 0; w < R; ++w)
      H = c[w], H != 0 && (B[w] = P[H + 16]++);
    var Z = 0;
    for (w = 0; w < R; ++w)
      if (Z = c[w], Z != 0)
        for (H = me(B[w], m) >> m - Z, N = (1 << m + 4 - Z) - 1; N >= 0; --N)
          _[H | N << Z] = Z & 15 | w << 4;
    return m;
  }
  var Ft = oe ? new Uint16Array(512) : Pr(512), yt = oe ? new Uint16Array(32) : Pr(32);
  if (!oe) {
    for (var Xr = 0; Xr < 512; ++Xr) Ft[Xr] = 0;
    for (Xr = 0; Xr < 32; ++Xr) yt[Xr] = 0;
  }
  (function() {
    for (var c = [], _ = 0; _ < 32; _++) c.push(5);
    At(c, yt, 32);
    var v = [];
    for (_ = 0; _ <= 143; _++) v.push(8);
    for (; _ <= 255; _++) v.push(9);
    for (; _ <= 279; _++) v.push(7);
    for (; _ <= 287; _++) v.push(8);
    At(v, Ft, 288);
  })();
  var la = /* @__PURE__ */ function() {
    for (var _ = oe ? new Uint8Array(32768) : [], v = 0, m = 0; v < he.length - 1; ++v)
      for (; m < he[v + 1]; ++m) _[m] = v;
    for (; m < 32768; ++m) _[m] = 29;
    var E = oe ? new Uint8Array(259) : [];
    for (v = 0, m = 0; v < X.length - 1; ++v)
      for (; m < X[v + 1]; ++m) E[m] = v;
    function w(H, R) {
      for (var P = 0; P < H.length; ) {
        var B = Math.min(65535, H.length - P), Z = P + B == H.length;
        for (R.write_shift(1, +Z), R.write_shift(2, B), R.write_shift(2, ~B & 65535); B-- > 0; ) R[R.l++] = H[P++];
      }
      return R.l;
    }
    function N(H, R) {
      for (var P = 0, B = 0, Z = oe ? new Uint16Array(32768) : []; B < H.length; ) {
        var ae = (
          /* data.length - boff; */
          Math.min(65535, H.length - B)
        );
        if (ae < 10) {
          for (P = Cr(R, P, +(B + ae == H.length)), P & 7 && (P += 8 - (P & 7)), R.l = P / 8 | 0, R.write_shift(2, ae), R.write_shift(2, ~ae & 65535); ae-- > 0; ) R[R.l++] = H[B++];
          P = R.l * 8;
          continue;
        }
        P = Cr(R, P, +(B + ae == H.length) + 2);
        for (var fe = 0; ae-- > 0; ) {
          var Q = H[B];
          fe = (fe << 5 ^ Q) & 32767;
          var se = -1, _e = 0;
          if ((se = Z[fe]) && (se |= B & -32768, se > B && (se -= 32768), se < B))
            for (; H[se + _e] == H[B + _e] && _e < 250; ) ++_e;
          if (_e > 2) {
            Q = E[_e], Q <= 22 ? P = at(R, P, ne[Q + 1] >> 1) - 1 : (at(R, P, 3), P += 5, at(R, P, ne[Q - 23] >> 5), P += 3);
            var Ve = Q < 8 ? 0 : Q - 4 >> 2;
            Ve > 0 && (Sn(R, P, _e - X[Q]), P += Ve), Q = _[B - se], P = at(R, P, ne[Q] >> 3), P -= 3;
            var We = Q < 4 ? 0 : Q - 2 >> 1;
            We > 0 && (Sn(R, P, B - se - he[Q]), P += We);
            for (var hr = 0; hr < _e; ++hr)
              Z[fe] = B & 32767, fe = (fe << 5 ^ H[B]) & 32767, ++B;
            ae -= _e - 1;
          } else
            Q <= 143 ? Q = Q + 48 : P = Pe(R, P, 1), P = at(R, P, ne[Q]), Z[fe] = B & 32767, ++B;
        }
        P = at(R, P, 0) - 1;
      }
      return R.l = (P + 7) / 8 | 0, R.l;
    }
    return function(R, P) {
      return R.length < 8 ? w(R, P) : N(R, P);
    };
  }();
  function An(c) {
    var _ = W(50 + Math.floor(c.length * 1.1)), v = la(c, _);
    return _.slice(0, v);
  }
  var $t = oe ? new Uint16Array(32768) : Pr(32768), Fn = oe ? new Uint16Array(32768) : Pr(32768), Ct = oe ? new Uint16Array(128) : Pr(128), ht = 1, Ot = 1;
  function rr(c, _) {
    var v = Ue(c, _) + 257;
    _ += 5;
    var m = Ue(c, _) + 1;
    _ += 5;
    var E = Nr(c, _) + 4;
    _ += 4;
    for (var w = 0, N = oe ? new Uint8Array(19) : Pr(19), H = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], R = 1, P = oe ? new Uint8Array(8) : Pr(8), B = oe ? new Uint8Array(8) : Pr(8), Z = N.length, ae = 0; ae < E; ++ae)
      N[y[ae]] = w = Se(c, _), R < w && (R = w), P[w]++, _ += 3;
    var fe = 0;
    for (P[0] = 0, ae = 1; ae <= R; ++ae) B[ae] = fe = fe + P[ae - 1] << 1;
    for (ae = 0; ae < Z; ++ae) (fe = N[ae]) != 0 && (H[ae] = B[fe]++);
    var Q = 0;
    for (ae = 0; ae < Z; ++ae)
      if (Q = N[ae], Q != 0) {
        fe = ne[H[ae]] >> 8 - Q;
        for (var se = (1 << 7 - Q) - 1; se >= 0; --se) Ct[fe | se << Q] = Q & 7 | ae << 3;
      }
    var _e = [];
    for (R = 1; _e.length < v + m; )
      switch (fe = Ct[le(c, _)], _ += fe & 7, fe >>>= 3) {
        case 16:
          for (w = 3 + ze(c, _), _ += 2, fe = _e[_e.length - 1]; w-- > 0; ) _e.push(fe);
          break;
        case 17:
          for (w = 3 + Se(c, _), _ += 3; w-- > 0; ) _e.push(0);
          break;
        case 18:
          for (w = 11 + le(c, _), _ += 7; w-- > 0; ) _e.push(0);
          break;
        default:
          _e.push(fe), R < fe && (R = fe);
          break;
      }
    var Ve = _e.slice(0, v), We = _e.slice(v);
    for (ae = v; ae < 286; ++ae) Ve[ae] = 0;
    for (ae = m; ae < 30; ++ae) We[ae] = 0;
    return ht = At(Ve, $t, 286), Ot = At(We, Fn, 30), _;
  }
  function K(c, _) {
    if (c[0] == 3 && !(c[1] & 3))
      return [vt(_), 2];
    for (var v = 0, m = 0, E = ja(_ || 1 << 18), w = 0, N = E.length >>> 0, H = 0, R = 0; !(m & 1); ) {
      if (m = Se(c, v), v += 3, m >>> 1)
        m >> 1 == 1 ? (H = 9, R = 5) : (v = rr(c, v), H = ht, R = Ot);
      else {
        v & 7 && (v += 8 - (v & 7));
        var P = c[v >>> 3] | c[(v >>> 3) + 1] << 8;
        if (v += 32, P > 0)
          for (!_ && N < w + P && (E = zt(E, w + P), N = E.length); P-- > 0; )
            E[w++] = c[v >>> 3], v += 8;
        continue;
      }
      for (; ; ) {
        !_ && N < w + 32767 && (E = zt(E, w + 32767), N = E.length);
        var B = er(c, v, H), Z = m >>> 1 == 1 ? Ft[B] : $t[B];
        if (v += Z & 15, Z >>>= 4, !(Z >>> 8 & 255)) E[w++] = Z;
        else {
          if (Z == 256) break;
          Z -= 257;
          var ae = Z < 8 ? 0 : Z - 4 >> 2;
          ae > 5 && (ae = 0);
          var fe = w + X[Z];
          ae > 0 && (fe += er(c, v, ae), v += ae), B = er(c, v, R), Z = m >>> 1 == 1 ? yt[B] : Fn[B], v += Z & 15, Z >>>= 4;
          var Q = Z < 4 ? 0 : Z - 2 >> 1, se = he[Z];
          for (Q > 0 && (se += er(c, v, Q), v += Q), !_ && N < fe && (E = zt(E, fe + 100), N = E.length); w < fe; )
            E[w] = E[w - se], ++w;
        }
      }
    }
    return _ ? [E, v + 7 >>> 3] : [E.slice(0, w), v + 7 >>> 3];
  }
  function S(c, _) {
    var v = c.slice(c.l || 0), m = K(v, _);
    return c.l += m[1], m[0];
  }
  function ue(c, _) {
    if (c)
      typeof console < "u" && console.error(_);
    else throw new Error(_);
  }
  function pe(c, _) {
    var v = (
      /*::(*/
      c
    );
    Ir(v, 0);
    var m = [], E = [], w = {
      FileIndex: m,
      FullPaths: E
    };
    I(w, { root: _.root });
    for (var N = v.length - 4; (v[N] != 80 || v[N + 1] != 75 || v[N + 2] != 5 || v[N + 3] != 6) && N >= 0; ) --N;
    v.l = N + 4, v.l += 4;
    var H = v.read_shift(2);
    v.l += 6;
    var R = v.read_shift(4);
    for (v.l = R, N = 0; N < H; ++N) {
      v.l += 20;
      var P = v.read_shift(4), B = v.read_shift(4), Z = v.read_shift(2), ae = v.read_shift(2), fe = v.read_shift(2);
      v.l += 8;
      var Q = v.read_shift(4), se = f(
        /*::(*/
        v.slice(v.l + Z, v.l + Z + ae)
        /*:: :any)*/
      );
      v.l += Z + ae + fe;
      var _e = v.l;
      v.l = Q + 4, Te(v, P, B, w, se), v.l = _e;
    }
    return w;
  }
  function Te(c, _, v, m, E) {
    c.l += 2;
    var w = c.read_shift(2), N = c.read_shift(2), H = s(c);
    if (w & 8257) throw new Error("Unsupported ZIP encryption");
    for (var R = c.read_shift(4), P = c.read_shift(4), B = c.read_shift(4), Z = c.read_shift(2), ae = c.read_shift(2), fe = "", Q = 0; Q < Z; ++Q) fe += String.fromCharCode(c[c.l++]);
    if (ae) {
      var se = f(
        /*::(*/
        c.slice(c.l, c.l + ae)
        /*:: :any)*/
      );
      (se[21589] || {}).mt && (H = se[21589].mt), ((E || {})[21589] || {}).mt && (H = E[21589].mt);
    }
    c.l += ae;
    var _e = c.slice(c.l, c.l + P);
    switch (N) {
      case 8:
        _e = M(c, B);
        break;
      case 0:
        break;
      default:
        throw new Error("Unsupported ZIP Compression method " + N);
    }
    var Ve = !1;
    w & 8 && (R = c.read_shift(4), R == 134695760 && (R = c.read_shift(4), Ve = !0), P = c.read_shift(4), B = c.read_shift(4)), P != _ && ue(Ve, "Bad compressed size: " + _ + " != " + P), B != v && ue(Ve, "Bad uncompressed size: " + v + " != " + B), Kr(m, fe, _e, { unsafe: !0, mt: H });
  }
  function ce(c, _) {
    var v = _ || {}, m = [], E = [], w = W(1), N = v.compression ? 8 : 0, H = 0, R = 0, P = 0, B = 0, Z = 0, ae = c.FullPaths[0], fe = ae, Q = c.FileIndex[0], se = [], _e = 0;
    for (R = 1; R < c.FullPaths.length; ++R)
      if (fe = c.FullPaths[R].slice(ae.length), Q = c.FileIndex[R], !(!Q.size || !Q.content || fe == "Sh33tJ5")) {
        var Ve = B, We = W(fe.length);
        for (P = 0; P < fe.length; ++P) We.write_shift(1, fe.charCodeAt(P) & 127);
        We = We.slice(0, We.l), se[Z] = js.buf(
          /*::((*/
          Q.content,
          0
        );
        var hr = Q.content;
        N == 8 && (hr = F(hr)), w = W(30), w.write_shift(4, 67324752), w.write_shift(2, 20), w.write_shift(2, H), w.write_shift(2, N), Q.mt ? i(w, Q.mt) : w.write_shift(4, 0), w.write_shift(-4, se[Z]), w.write_shift(4, hr.length), w.write_shift(
          4,
          /*::(*/
          Q.content.length
        ), w.write_shift(2, We.length), w.write_shift(2, 0), B += w.length, m.push(w), B += We.length, m.push(We), B += hr.length, m.push(hr), w = W(46), w.write_shift(4, 33639248), w.write_shift(2, 0), w.write_shift(2, 20), w.write_shift(2, H), w.write_shift(2, N), w.write_shift(4, 0), w.write_shift(-4, se[Z]), w.write_shift(4, hr.length), w.write_shift(
          4,
          /*::(*/
          Q.content.length
        ), w.write_shift(2, We.length), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(4, 0), w.write_shift(4, Ve), _e += w.l, E.push(w), _e += We.length, E.push(We), ++Z;
      }
    return w = W(22), w.write_shift(4, 101010256), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(2, Z), w.write_shift(2, Z), w.write_shift(4, _e), w.write_shift(4, B), w.write_shift(2, 0), lr([lr(m), lr(E), w]);
  }
  var qe = {
    htm: "text/html",
    xml: "text/xml",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    mso: "application/x-mso",
    thmx: "application/vnd.ms-officetheme",
    sh33tj5: "application/octet-stream"
  };
  function ge(c, _) {
    if (c.ctype) return c.ctype;
    var v = c.name || "", m = v.match(/\.([^\.]+)$/);
    return m && qe[m[1]] || _ && (m = (v = _).match(/[\.\\]([^\.\\])+$/), m && qe[m[1]]) ? qe[m[1]] : "application/octet-stream";
  }
  function Lr(c) {
    for (var _ = cn(c), v = [], m = 0; m < _.length; m += 76) v.push(_.slice(m, m + 76));
    return v.join(`\r
`) + `\r
`;
  }
  function $e(c) {
    var _ = c.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function(P) {
      var B = P.charCodeAt(0).toString(16).toUpperCase();
      return "=" + (B.length == 1 ? "0" + B : B);
    });
    _ = _.replace(/ $/mg, "=20").replace(/\t$/mg, "=09"), _.charAt(0) == `
` && (_ = "=0D" + _.slice(1)), _ = _.replace(/\r(?!\n)/mg, "=0D").replace(/\n\n/mg, `
=0A`).replace(/([^\r\n])\n/mg, "$1=0A");
    for (var v = [], m = _.split(`\r
`), E = 0; E < m.length; ++E) {
      var w = m[E];
      if (w.length == 0) {
        v.push("");
        continue;
      }
      for (var N = 0; N < w.length; ) {
        var H = 76, R = w.slice(N, N + H);
        R.charAt(H - 1) == "=" ? H-- : R.charAt(H - 2) == "=" ? H -= 2 : R.charAt(H - 3) == "=" && (H -= 3), R = w.slice(N, N + H), N += H, N < w.length && (R += "="), v.push(R);
      }
    }
    return v.join(`\r
`);
  }
  function je(c) {
    for (var _ = [], v = 0; v < c.length; ++v) {
      for (var m = c[v]; v <= c.length && m.charAt(m.length - 1) == "="; ) m = m.slice(0, m.length - 1) + c[++v];
      _.push(m);
    }
    for (var E = 0; E < _.length; ++E) _[E] = _[E].replace(/[=][0-9A-Fa-f]{2}/g, function(w) {
      return String.fromCharCode(parseInt(w.slice(1), 16));
    });
    return Wr(_.join(`\r
`));
  }
  function yn(c, _, v) {
    for (var m = "", E = "", w = "", N, H = 0; H < 10; ++H) {
      var R = _[H];
      if (!R || R.match(/^\s*$/)) break;
      var P = R.match(/^(.*?):\s*([^\s].*)$/);
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
    switch (++H, E.toLowerCase()) {
      case "base64":
        N = Wr(rt(_.slice(H).join("")));
        break;
      case "quoted-printable":
        N = je(_.slice(H));
        break;
      default:
        throw new Error("Unsupported Content-Transfer-Encoding " + E);
    }
    var B = Kr(c, m.slice(v.length), N, { unsafe: !0 });
    w && (B.ctype = w);
  }
  function Cn(c, _) {
    if (Xe(c.slice(0, 13)).toLowerCase() != "mime-version:") throw new Error("Unsupported MAD header");
    var v = _ && _.root || "", m = (Ie && Buffer.isBuffer(c) ? c.toString("binary") : Xe(c)).split(`\r
`), E = 0, w = "";
    for (E = 0; E < m.length; ++E)
      if (w = m[E], !!/^Content-Location:/i.test(w) && (w = w.slice(w.indexOf("file")), v || (v = w.slice(0, w.lastIndexOf("/") + 1)), w.slice(0, v.length) != v))
        for (; v.length > 0 && (v = v.slice(0, v.length - 1), v = v.slice(0, v.lastIndexOf("/") + 1), w.slice(0, v.length) != v); )
          ;
    var N = (m[1] || "").match(/boundary="(.*?)"/);
    if (!N) throw new Error("MAD cannot find boundary");
    var H = "--" + (N[1] || ""), R = [], P = [], B = {
      FileIndex: R,
      FullPaths: P
    };
    I(B);
    var Z, ae = 0;
    for (E = 0; E < m.length; ++E) {
      var fe = m[E];
      fe !== H && fe !== H + "--" || (ae++ && yn(B, m.slice(Z, E), v), Z = E);
    }
    return B;
  }
  function It(c, _) {
    var v = _ || {}, m = v.boundary || "SheetJS";
    m = "------=" + m;
    for (var E = [
      "MIME-Version: 1.0",
      'Content-Type: multipart/related; boundary="' + m.slice(2) + '"',
      "",
      "",
      ""
    ], w = c.FullPaths[0], N = w, H = c.FileIndex[0], R = 1; R < c.FullPaths.length; ++R)
      if (N = c.FullPaths[R].slice(w.length), H = c.FileIndex[R], !(!H.size || !H.content || N == "Sh33tJ5")) {
        N = N.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function(_e) {
          return "_x" + _e.charCodeAt(0).toString(16) + "_";
        }).replace(/[\u0080-\uFFFF]/g, function(_e) {
          return "_u" + _e.charCodeAt(0).toString(16) + "_";
        });
        for (var P = H.content, B = Ie && Buffer.isBuffer(P) ? P.toString("binary") : Xe(P), Z = 0, ae = Math.min(1024, B.length), fe = 0, Q = 0; Q <= ae; ++Q) (fe = B.charCodeAt(Q)) >= 32 && fe < 128 && ++Z;
        var se = Z >= ae * 4 / 5;
        E.push(m), E.push("Content-Location: " + (v.root || "file:///C:/SheetJS/") + N), E.push("Content-Transfer-Encoding: " + (se ? "quoted-printable" : "base64")), E.push("Content-Type: " + ge(H, N)), E.push(""), E.push(se ? $e(B) : Lr(B));
      }
    return E.push(m + `--\r
`), E.join(`\r
`);
  }
  function kt(c) {
    var _ = {};
    return I(_, c), _;
  }
  function Kr(c, _, v, m) {
    var E = m && m.unsafe;
    E || I(c);
    var w = !E && Le.find(c, _);
    if (!w) {
      var N = c.FullPaths[0];
      _.slice(0, N.length) == N ? N = _ : (N.slice(-1) != "/" && (N += "/"), N = (N + _).replace("//", "/")), w = { name: a(_), type: 2 }, c.FileIndex.push(w), c.FullPaths.push(N), E || Le.utils.cfb_gc(c);
    }
    return w.content = v, w.size = v ? v.length : 0, m && (m.CLSID && (w.clsid = m.CLSID), m.mt && (w.mt = m.mt), m.ct && (w.ct = m.ct)), w;
  }
  function L(c, _) {
    I(c);
    var v = Le.find(c, _);
    if (v) {
      for (var m = 0; m < c.FileIndex.length; ++m) if (c.FileIndex[m] == v)
        return c.FileIndex.splice(m, 1), c.FullPaths.splice(m, 1), !0;
    }
    return !1;
  }
  function Me(c, _, v) {
    I(c);
    var m = Le.find(c, _);
    if (m) {
      for (var E = 0; E < c.FileIndex.length; ++E) if (c.FileIndex[E] == m)
        return c.FileIndex[E].name = a(v), c.FullPaths[E] = v, !0;
    }
    return !1;
  }
  function Yr(c) {
    b(c, !0);
  }
  return t.find = Y, t.read = te, t.parse = u, t.write = Er, t.writeFile = yr, t.utils = {
    cfb_new: kt,
    cfb_add: Kr,
    cfb_del: L,
    cfb_mov: Me,
    cfb_gc: Yr,
    ReadShift: sn,
    CheckField: ci,
    prep_blob: Ir,
    bconcat: lr,
    use_zlib: A,
    _deflateRaw: An,
    _inflateRaw: S,
    consts: be
  }, t;
}();
function Ks(e) {
  return typeof e == "string" ? ea(e) : Array.isArray(e) ? Ts(e) : e;
}
function gn(e, t, r) {
  if (typeof Deno < "u") {
    if (r && typeof t == "string") switch (r) {
      case "utf8":
        t = new TextEncoder(r).encode(t);
        break;
      case "binary":
        t = ea(t);
        break;
      default:
        throw new Error("Unsupported encoding " + r);
    }
    return Deno.writeFileSync(e, t);
  }
  var n = r == "utf8" ? xn(t) : t;
  if (typeof IE_SaveFile < "u") return IE_SaveFile(n, e);
  if (typeof Blob < "u") {
    var a = new Blob([Ks(n)], { type: "application/octet-stream" });
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
    return f.open("w"), f.encoding = "binary", Array.isArray(t) && (t = mn(t)), f.write(t), f.close(), t;
  } catch (o) {
    if (!o.message || !o.message.match(/onstruct/)) throw o;
  }
  throw new Error("cannot save file " + e);
}
function cr(e) {
  for (var t = Object.keys(e), r = [], n = 0; n < t.length; ++n) Object.prototype.hasOwnProperty.call(e, t[n]) && r.push(t[n]);
  return r;
}
function r0(e, t) {
  for (var r = [], n = cr(e), a = 0; a !== n.length; ++a) r[e[n[a]][t]] == null && (r[e[n[a]][t]] = n[a]);
  return r;
}
function ya(e) {
  for (var t = [], r = cr(e), n = 0; n !== r.length; ++n) t[e[r[n]]] = r[n];
  return t;
}
function na(e) {
  for (var t = [], r = cr(e), n = 0; n !== r.length; ++n) t[e[r[n]]] = parseInt(r[n], 10);
  return t;
}
function Ys(e) {
  for (var t = [], r = cr(e), n = 0; n !== r.length; ++n)
    t[e[r[n]]] == null && (t[e[r[n]]] = []), t[e[r[n]]].push(r[n]);
  return t;
}
var Xn = /* @__PURE__ */ new Date(1899, 11, 30, 0, 0, 0);
function Ar(e, t) {
  var r = /* @__PURE__ */ e.getTime(), n = /* @__PURE__ */ Xn.getTime() + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ Xn.getTimezoneOffset()) * 6e4;
  return (r - n) / (24 * 60 * 60 * 1e3);
}
var K0 = /* @__PURE__ */ new Date(), Js = /* @__PURE__ */ Xn.getTime() + (/* @__PURE__ */ K0.getTimezoneOffset() - /* @__PURE__ */ Xn.getTimezoneOffset()) * 6e4, t0 = /* @__PURE__ */ K0.getTimezoneOffset();
function Y0(e) {
  var t = /* @__PURE__ */ new Date();
  return t.setTime(e * 24 * 60 * 60 * 1e3 + Js), t.getTimezoneOffset() !== t0 && t.setTime(t.getTime() + (t.getTimezoneOffset() - t0) * 6e4), t;
}
var n0 = /* @__PURE__ */ new Date("2017-02-19T19:06:09.000Z"), J0 = /* @__PURE__ */ isNaN(/* @__PURE__ */ n0.getFullYear()) ? /* @__PURE__ */ new Date("2/19/17") : n0, Zs = /* @__PURE__ */ J0.getFullYear() == 2017;
function Tr(e, t) {
  var r = new Date(e);
  if (Zs)
    return t > 0 ? r.setTime(r.getTime() + r.getTimezoneOffset() * 60 * 1e3) : t < 0 && r.setTime(r.getTime() - r.getTimezoneOffset() * 60 * 1e3), r;
  if (e instanceof Date) return e;
  if (J0.getFullYear() == 1917 && !isNaN(r.getFullYear())) {
    var n = r.getFullYear();
    return e.indexOf("" + n) > -1 || r.setFullYear(r.getFullYear() + 100), r;
  }
  var a = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"], i = new Date(+a[0], +a[1] - 1, +a[2], +a[3] || 0, +a[4] || 0, +a[5] || 0);
  return e.indexOf("Z") > -1 && (i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3)), i;
}
function aa(e, t) {
  if (Ie && Buffer.isBuffer(e))
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
function Fr(e) {
  if (typeof JSON < "u" && !Array.isArray(e)) return JSON.parse(JSON.stringify(e));
  if (typeof e != "object" || e == null) return e;
  if (e instanceof Date) return new Date(e.getTime());
  var t = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = Fr(e[r]));
  return t;
}
function He(e, t) {
  for (var r = ""; r.length < t; ) r += e;
  return r;
}
function Qr(e) {
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
var qs = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
function hn(e) {
  var t = new Date(e), r = /* @__PURE__ */ new Date(NaN), n = t.getYear(), a = t.getMonth(), i = t.getDate();
  if (isNaN(i)) return r;
  var s = e.toLowerCase();
  if (s.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
    if (s = s.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, ""), s.length > 3 && qs.indexOf(s) == -1) return r;
  } else if (s.match(/[a-z]/)) return r;
  return n < 0 || n > 8099 ? r : (a > 0 || i > 1) && n != 101 ? t : e.match(/[^-0-9:,\/\\]/) ? r : t;
}
function Ee(e, t, r) {
  if (e.FullPaths) {
    if (typeof r == "string") {
      var n;
      return Ie ? n = nt(r) : n = Es(r), Le.utils.cfb_add(e, t, n);
    }
    Le.utils.cfb_add(e, t, r);
  } else e.file(t, r);
}
function Ca() {
  return Le.utils.cfb_new();
}
var Ze = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`, Qs = {
  "&quot;": '"',
  "&apos;": "'",
  "&gt;": ">",
  "&lt;": "<",
  "&amp;": "&"
}, Oa = /* @__PURE__ */ ya(Qs), Ia = /[&<>'"]/g, ef = /[\u0000-\u0008\u000b-\u001f]/g;
function Re(e) {
  var t = e + "";
  return t.replace(Ia, function(r) {
    return Oa[r];
  }).replace(ef, function(r) {
    return "_x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + "_";
  });
}
function a0(e) {
  return Re(e).replace(/ /g, "_x0020_");
}
var Z0 = /[\u0000-\u001f]/g;
function rf(e) {
  var t = e + "";
  return t.replace(Ia, function(r) {
    return Oa[r];
  }).replace(/\n/g, "<br/>").replace(Z0, function(r) {
    return "&#x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + ";";
  });
}
function tf(e) {
  var t = e + "";
  return t.replace(Ia, function(r) {
    return Oa[r];
  }).replace(Z0, function(r) {
    return "&#x" + r.charCodeAt(0).toString(16).toUpperCase() + ";";
  });
}
function nf(e) {
  return e.replace(/(\r\n|[\r\n])/g, "&#10;");
}
function af(e) {
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
function ha(e) {
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
function i0(e) {
  var t = vt(2 * e.length), r, n, a = 1, i = 0, s = 0, f;
  for (n = 0; n < e.length; n += a)
    a = 1, (f = e.charCodeAt(n)) < 128 ? r = f : f < 224 ? (r = (f & 31) * 64 + (e.charCodeAt(n + 1) & 63), a = 2) : f < 240 ? (r = (f & 15) * 4096 + (e.charCodeAt(n + 1) & 63) * 64 + (e.charCodeAt(n + 2) & 63), a = 3) : (a = 4, r = (f & 7) * 262144 + (e.charCodeAt(n + 1) & 63) * 4096 + (e.charCodeAt(n + 2) & 63) * 64 + (e.charCodeAt(n + 3) & 63), r -= 65536, s = 55296 + (r >>> 10 & 1023), r = 56320 + (r & 1023)), s !== 0 && (t[i++] = s & 255, t[i++] = s >>> 8, s = 0), t[i++] = r % 256, t[i++] = r >>> 8;
  return t.slice(0, i).toString("ucs2");
}
function s0(e) {
  return nt(e, "binary").toString("utf8");
}
var Pn = "foo bar bazâð£", an = Ie && (/* @__PURE__ */ s0(Pn) == /* @__PURE__ */ ha(Pn) && s0 || /* @__PURE__ */ i0(Pn) == /* @__PURE__ */ ha(Pn) && i0) || ha, xn = Ie ? function(e) {
  return nt(e, "utf8").toString("binary");
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
}, sf = /* @__PURE__ */ function() {
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
}(), q0 = /(^\s|\s$|\n)/;
function or(e, t) {
  return "<" + e + (t.match(q0) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e + ">";
}
function dn(e) {
  return cr(e).map(function(t) {
    return " " + t + '="' + e[t] + '"';
  }).join("");
}
function ee(e, t, r) {
  return "<" + e + (r != null ? dn(r) : "") + (t != null ? (t.match(q0) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e : "/") + ">";
}
function Ta(e, t) {
  try {
    return e.toISOString().replace(/\.\d*/, "");
  } catch (r) {
    if (t) throw r;
  }
  return "";
}
function ff(e, t) {
  switch (typeof e) {
    case "string":
      var r = ee("vt:lpwstr", Re(e));
      return r = r.replace(/&quot;/g, "_x0022_"), r;
    case "number":
      return ee((e | 0) == e ? "vt:i4" : "vt:r8", Re(String(e)));
    case "boolean":
      return ee("vt:bool", e ? "true" : "false");
  }
  if (e instanceof Date) return ee("vt:filetime", Ta(e));
  throw new Error("Unable to serialize " + e);
}
var nr = {
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
}, Wt = [
  "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  "http://purl.oclc.org/ooxml/spreadsheetml/main",
  "http://schemas.microsoft.com/office/excel/2006/main",
  "http://schemas.microsoft.com/office/excel/2006/2"
], kr = {
  o: "urn:schemas-microsoft-com:office:office",
  x: "urn:schemas-microsoft-com:office:excel",
  ss: "urn:schemas-microsoft-com:office:spreadsheet",
  dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
  mv: "http://macVmlSchemaUri",
  v: "urn:schemas-microsoft-com:vml",
  html: "http://www.w3.org/TR/REC-html40"
};
function lf(e, t) {
  for (var r = 1 - 2 * (e[t + 7] >>> 7), n = ((e[t + 7] & 127) << 4) + (e[t + 6] >>> 4 & 15), a = e[t + 6] & 15, i = 5; i >= 0; --i) a = a * 256 + e[t + i];
  return n == 2047 ? a == 0 ? r * (1 / 0) : NaN : (n == 0 ? n = -1022 : (n -= 1023, a += Math.pow(2, 52)), r * Math.pow(2, n - 52) * a);
}
function of(e, t, r) {
  var n = (t < 0 || 1 / t == -1 / 0 ? 1 : 0) << 7, a = 0, i = 0, s = n ? -t : t;
  isFinite(s) ? s == 0 ? a = i = 0 : (a = Math.floor(Math.log(s) / Math.LN2), i = s * Math.pow(2, 52 - a), a <= -1023 && (!isFinite(i) || i < Math.pow(2, 52)) ? a = -1022 : (i -= Math.pow(2, 52), a += 1023)) : (a = 2047, i = isNaN(t) ? 26985 : 0);
  for (var f = 0; f <= 5; ++f, i /= 256) e[r + f] = i & 255;
  e[r + 6] = (a & 15) << 4 | i & 15, e[r + 7] = a >> 4 | n;
}
var f0 = function(e) {
  for (var t = [], r = 10240, n = 0; n < e[0].length; ++n) if (e[0][n]) for (var a = 0, i = e[0][n].length; a < i; a += r) t.push.apply(t, e[0][n].slice(a, a + r));
  return t;
}, l0 = Ie ? function(e) {
  return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0].map(function(t) {
    return Buffer.isBuffer(t) ? t : nt(t);
  })) : f0(e);
} : f0, o0 = function(e, t, r) {
  for (var n = [], a = t; a < r; a += 2) n.push(String.fromCharCode(tn(e, a)));
  return n.join("").replace(nn, "");
}, ka = Ie ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("utf16le", t, r).replace(nn, "") : o0(e, t, r);
} : o0, u0 = function(e, t, r) {
  for (var n = [], a = t; a < t + r; ++a) n.push(("0" + e[a].toString(16)).slice(-2));
  return n.join("");
}, Q0 = Ie ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("hex", t, t + r) : u0(e, t, r);
} : u0, c0 = function(e, t, r) {
  for (var n = [], a = t; a < r; a++) n.push(String.fromCharCode(Pt(e, a)));
  return n.join("");
}, _n = Ie ? function(t, r, n) {
  return Buffer.isBuffer(t) ? t.toString("utf8", r, n) : c0(t, r, n);
} : c0, ei = function(e, t) {
  var r = Dr(e, t);
  return r > 0 ? _n(e, t + 4, t + 4 + r - 1) : "";
}, ri = ei, ti = function(e, t) {
  var r = Dr(e, t);
  return r > 0 ? _n(e, t + 4, t + 4 + r - 1) : "";
}, ni = ti, ai = function(e, t) {
  var r = 2 * Dr(e, t);
  return r > 0 ? _n(e, t + 4, t + 4 + r - 1) : "";
}, ii = ai, si = function(t, r) {
  var n = Dr(t, r);
  return n > 0 ? ka(t, r + 4, r + 4 + n) : "";
}, fi = si, li = function(e, t) {
  var r = Dr(e, t);
  return r > 0 ? _n(e, t + 4, t + 4 + r) : "";
}, oi = li, ui = function(e, t) {
  return lf(e, t);
}, zn = ui, Da = function(t) {
  return Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
};
Ie && (ri = function(t, r) {
  if (!Buffer.isBuffer(t)) return ei(t, r);
  var n = t.readUInt32LE(r);
  return n > 0 ? t.toString("utf8", r + 4, r + 4 + n - 1) : "";
}, ni = function(t, r) {
  if (!Buffer.isBuffer(t)) return ti(t, r);
  var n = t.readUInt32LE(r);
  return n > 0 ? t.toString("utf8", r + 4, r + 4 + n - 1) : "";
}, ii = function(t, r) {
  if (!Buffer.isBuffer(t)) return ai(t, r);
  var n = 2 * t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + n - 1);
}, fi = function(t, r) {
  if (!Buffer.isBuffer(t)) return si(t, r);
  var n = t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + n);
}, oi = function(t, r) {
  if (!Buffer.isBuffer(t)) return li(t, r);
  var n = t.readUInt32LE(r);
  return t.toString("utf8", r + 4, r + 4 + n);
}, zn = function(t, r) {
  return Buffer.isBuffer(t) ? t.readDoubleLE(r) : ui(t, r);
}, Da = function(t) {
  return Buffer.isBuffer(t) || Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
});
var Pt = function(e, t) {
  return e[t];
}, tn = function(e, t) {
  return e[t + 1] * 256 + e[t];
}, uf = function(e, t) {
  var r = e[t + 1] * 256 + e[t];
  return r < 32768 ? r : (65535 - r + 1) * -1;
}, Dr = function(e, t) {
  return e[t + 3] * (1 << 24) + (e[t + 2] << 16) + (e[t + 1] << 8) + e[t];
}, dt = function(e, t) {
  return e[t + 3] << 24 | e[t + 2] << 16 | e[t + 1] << 8 | e[t];
}, cf = function(e, t) {
  return e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3];
};
function sn(e, t) {
  var r = "", n, a, i = [], s, f, o, l;
  switch (t) {
    case "dbcs":
      if (l = this.l, Ie && Buffer.isBuffer(this)) r = this.slice(this.l, this.l + 2 * e).toString("utf16le");
      else for (o = 0; o < e; ++o)
        r += String.fromCharCode(tn(this, l)), l += 2;
      e *= 2;
      break;
    case "utf8":
      r = _n(this, this.l, this.l + e);
      break;
    case "utf16le":
      e *= 2, r = ka(this, this.l, this.l + e);
      break;
    case "wstr":
      return sn.call(this, e, "dbcs");
    case "lpstr-ansi":
      r = ri(this, this.l), e = 4 + Dr(this, this.l);
      break;
    case "lpstr-cp":
      r = ni(this, this.l), e = 4 + Dr(this, this.l);
      break;
    case "lpwstr":
      r = ii(this, this.l), e = 4 + 2 * Dr(this, this.l);
      break;
    case "lpp4":
      e = 4 + Dr(this, this.l), r = fi(this, this.l), e & 2 && (e += 2);
      break;
    case "8lpp4":
      e = 4 + Dr(this, this.l), r = oi(this, this.l), e & 3 && (e += 4 - (e & 3));
      break;
    case "cstr":
      for (e = 0, r = ""; (s = Pt(this, this.l + e++)) !== 0; ) i.push(Dn(s));
      r = i.join("");
      break;
    case "_wstr":
      for (e = 0, r = ""; (s = tn(this, this.l + e)) !== 0; )
        i.push(Dn(s)), e += 2;
      e += 2, r = i.join("");
      break;
    case "dbcs-cont":
      for (r = "", l = this.l, o = 0; o < e; ++o) {
        if (this.lens && this.lens.indexOf(l) !== -1)
          return s = Pt(this, l), this.l = l + 1, f = sn.call(this, e - o, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(Dn(tn(this, l))), l += 2;
      }
      r = i.join(""), e *= 2;
      break;
    case "cpstr":
    case "sbcs-cont":
      for (r = "", l = this.l, o = 0; o != e; ++o) {
        if (this.lens && this.lens.indexOf(l) !== -1)
          return s = Pt(this, l), this.l = l + 1, f = sn.call(this, e - o, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(Dn(Pt(this, l))), l += 1;
      }
      r = i.join("");
      break;
    default:
      switch (e) {
        case 1:
          return n = Pt(this, this.l), this.l++, n;
        case 2:
          return n = (t === "i" ? uf : tn)(this, this.l), this.l += 2, n;
        case 4:
        case -4:
          return t === "i" || !(this[this.l + 3] & 128) ? (n = (e > 0 ? dt : cf)(this, this.l), this.l += 4, n) : (a = Dr(this, this.l), this.l += 4, a);
        case 8:
        case -8:
          if (t === "f")
            return e == 8 ? a = zn(this, this.l) : a = zn([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0), this.l += 8, a;
          e = 8;
        case 16:
          r = Q0(this, this.l, e);
          break;
      }
  }
  return this.l += e, r;
}
var hf = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255, e[r + 2] = t >>> 16 & 255, e[r + 3] = t >>> 24 & 255;
}, xf = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >> 8 & 255, e[r + 2] = t >> 16 & 255, e[r + 3] = t >> 24 & 255;
}, df = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255;
};
function pf(e, t, r) {
  var n = 0, a = 0;
  if (r === "dbcs") {
    for (a = 0; a != t.length; ++a) df(this, t.charCodeAt(a), this.l + 2 * a);
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
      n = 4, hf(this, t, this.l);
      break;
    case 8:
      if (n = 8, r === "f") {
        of(this, t, this.l);
        break;
      }
    case 16:
      break;
    case -4:
      n = 4, xf(this, t, this.l);
      break;
  }
  return this.l += n, this;
}
function ci(e, t) {
  var r = Q0(this, this.l, e.length >> 1);
  if (r !== e) throw new Error(t + "Expected " + e + " saw " + r);
  this.l += e.length >> 1;
}
function Ir(e, t) {
  e.l = t, e.read_shift = /*::(*/
  sn, e.chk = ci, e.write_shift = pf;
}
function jr(e, t) {
  e.l += t;
}
function W(e) {
  var t = vt(e);
  return Ir(t, 0), t;
}
function Sr() {
  var e = [], t = Ie ? 256 : 2048, r = function(l) {
    var u = W(l);
    return Ir(u, 0), u;
  }, n = r(t), a = function() {
    n && (n.length > n.l && (n = n.slice(0, n.l), n.l = n.length), n.length > 0 && e.push(n), n = null);
  }, i = function(l) {
    return n && l < n.length - n.l ? n : (a(), n = r(Math.max(l + 1, t)));
  }, s = function() {
    return a(), lr(e);
  }, f = function(l) {
    a(), n = l, n.l == null && (n.l = n.length), i(t);
  };
  return { next: i, push: f, end: s, _bufs: e };
}
function z(e, t, r, n) {
  var a = +t, i;
  if (!isNaN(a)) {
    n || (n = oh[a].p || (r || []).length || 0), i = 1 + (a >= 128 ? 1 : 0) + 1, n >= 128 && ++i, n >= 16384 && ++i, n >= 2097152 && ++i;
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
    n > 0 && Da(r) && e.push(r);
  }
}
function fn(e, t, r) {
  var n = Fr(e);
  if (t.s ? (n.cRel && (n.c += t.s.c), n.rRel && (n.r += t.s.r)) : (n.cRel && (n.c += t.c), n.rRel && (n.r += t.r)), !r || r.biff < 12) {
    for (; n.c >= 256; ) n.c -= 256;
    for (; n.r >= 65536; ) n.r -= 65536;
  }
  return n;
}
function h0(e, t, r) {
  var n = Fr(e);
  return n.s = fn(n.s, t.s, r), n.e = fn(n.e, t.s, r), n;
}
function ln(e, t) {
  if (e.cRel && e.c < 0)
    for (e = Fr(e); e.c < 0; ) e.c += t > 8 ? 16384 : 256;
  if (e.rRel && e.r < 0)
    for (e = Fr(e); e.r < 0; ) e.r += t > 8 ? 1048576 : t > 5 ? 65536 : 16384;
  var r = Ne(e);
  return !e.cRel && e.cRel != null && (r = gf(r)), !e.rRel && e.rRel != null && (r = vf(r)), r;
}
function xa(e, t) {
  return e.s.r == 0 && !e.s.rRel && e.e.r == (t.biff >= 12 ? 1048575 : t.biff >= 8 ? 65536 : 16384) && !e.e.rRel ? (e.s.cRel ? "" : "$") + xr(e.s.c) + ":" + (e.e.cRel ? "" : "$") + xr(e.e.c) : e.s.c == 0 && !e.s.cRel && e.e.c == (t.biff >= 12 ? 16383 : 255) && !e.e.cRel ? (e.s.rRel ? "" : "$") + ur(e.s.r) + ":" + (e.e.rRel ? "" : "$") + ur(e.e.r) : ln(e.s, t.biff) + ":" + ln(e.e, t.biff);
}
function Ra(e) {
  return parseInt(mf(e), 10) - 1;
}
function ur(e) {
  return "" + (e + 1);
}
function vf(e) {
  return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2");
}
function mf(e) {
  return e.replace(/\$(\d+)$/, "$1");
}
function Na(e) {
  for (var t = _f(e), r = 0, n = 0; n !== t.length; ++n) r = 26 * r + t.charCodeAt(n) - 64;
  return r - 1;
}
function xr(e) {
  if (e < 0) throw new Error("invalid column " + e);
  var t = "";
  for (++e; e; e = Math.floor((e - 1) / 26)) t = String.fromCharCode((e - 1) % 26 + 65) + t;
  return t;
}
function gf(e) {
  return e.replace(/^([A-Z])/, "$$$1");
}
function _f(e) {
  return e.replace(/^\$([A-Z])/, "$1");
}
function Tf(e) {
  return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",");
}
function ar(e) {
  for (var t = 0, r = 0, n = 0; n < e.length; ++n) {
    var a = e.charCodeAt(n);
    a >= 48 && a <= 57 ? t = 10 * t + (a - 48) : a >= 65 && a <= 90 && (r = 26 * r + (a - 64));
  }
  return { c: r - 1, r: t - 1 };
}
function Ne(e) {
  for (var t = e.c + 1, r = ""; t; t = (t - 1) / 26 | 0) r = String.fromCharCode((t - 1) % 26 + 65) + r;
  return r + (e.r + 1);
}
function Rr(e) {
  var t = e.indexOf(":");
  return t == -1 ? { s: ar(e), e: ar(e) } : { s: ar(e.slice(0, t)), e: ar(e.slice(t + 1)) };
}
function Je(e, t) {
  return typeof t > "u" || typeof t == "number" ? Je(e.s, e.e) : (typeof e != "string" && (e = Ne(e)), typeof t != "string" && (t = Ne(t)), e == t ? e : e + ":" + t);
}
function Be(e) {
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
function x0(e, t) {
  var r = e.t == "d" && t instanceof Date;
  if (e.z != null) try {
    return e.w = lt(e.z, r ? Ar(t) : t);
  } catch {
  }
  try {
    return e.w = lt((e.XF || {}).numFmtId || (r ? 14 : 0), r ? Ar(t) : t);
  } catch {
    return "" + t;
  }
}
function tt(e, t, r) {
  return e == null || e.t == null || e.t == "z" ? "" : e.w !== void 0 ? e.w : (e.t == "d" && !e.z && r && r.dateNF && (e.z = r.dateNF), e.t == "e" ? Tn[e.v] || e.v : t == null ? x0(e, e.v) : x0(e, t));
}
function _t(e, t) {
  var r = t && t.sheet ? t.sheet : "Sheet1", n = {};
  return n[r] = e, { SheetNames: [r], Sheets: n };
}
function hi(e, t, r) {
  var n = r || {}, a = e ? Array.isArray(e) : n.dense, i = e || (a ? [] : {}), s = 0, f = 0;
  if (i && n.origin != null) {
    if (typeof n.origin == "number") s = n.origin;
    else {
      var o = typeof n.origin == "string" ? ar(n.origin) : n.origin;
      s = o.r, f = o.c;
    }
    i["!ref"] || (i["!ref"] = "A1:A1");
  }
  var l = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } };
  if (i["!ref"]) {
    var u = Be(i["!ref"]);
    l.s.c = u.s.c, l.s.r = u.s.r, l.e.c = Math.max(l.e.c, u.e.c), l.e.r = Math.max(l.e.r, u.e.r), s == -1 && (l.e.r = s = u.e.r + 1);
  }
  for (var d = 0; d != t.length; ++d)
    if (t[d]) {
      if (!Array.isArray(t[d])) throw new Error("aoa_to_sheet expects an array of arrays");
      for (var x = 0; x != t[d].length; ++x)
        if (!(typeof t[d][x] > "u")) {
          var p = { v: t[d][x] }, g = s + d, h = f + x;
          if (l.s.r > g && (l.s.r = g), l.s.c > h && (l.s.c = h), l.e.r < g && (l.e.r = g), l.e.c < h && (l.e.c = h), t[d][x] && typeof t[d][x] == "object" && !Array.isArray(t[d][x]) && !(t[d][x] instanceof Date)) p = t[d][x];
          else if (Array.isArray(p.v) && (p.f = t[d][x][1], p.v = p.v[0]), p.v === null)
            if (p.f) p.t = "n";
            else if (n.nullError)
              p.t = "e", p.v = 0;
            else if (n.sheetStubs) p.t = "z";
            else continue;
          else typeof p.v == "number" ? p.t = "n" : typeof p.v == "boolean" ? p.t = "b" : p.v instanceof Date ? (p.z = n.dateNF || Ge[14], n.cellDates ? (p.t = "d", p.w = lt(p.z, Ar(p.v))) : (p.t = "n", p.v = Ar(p.v), p.w = lt(p.z, p.v))) : p.t = "s";
          if (a)
            i[g] || (i[g] = []), i[g][h] && i[g][h].z && (p.z = i[g][h].z), i[g][h] = p;
          else {
            var T = Ne({ c: h, r: g });
            i[T] && i[T].z && (p.z = i[T].z), i[T] = p;
          }
        }
    }
  return l.s.c < 1e7 && (i["!ref"] = Je(l)), i;
}
function Ht(e, t) {
  return hi(null, e, t);
}
function Ef(e) {
  return e.read_shift(4, "i");
}
function Gr(e, t) {
  return t || (t = W(4)), t.write_shift(4, e), t;
}
function dr(e) {
  var t = e.read_shift(4);
  return t === 0 ? "" : e.read_shift(t, "dbcs");
}
function ir(e, t) {
  var r = !1;
  return t == null && (r = !0, t = W(4 + 2 * e.length)), t.write_shift(4, e.length), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
function wf(e) {
  return { ich: e.read_shift(2), ifnt: e.read_shift(2) };
}
function Sf(e, t) {
  return t || (t = W(4)), t.write_shift(2, 0), t.write_shift(2, 0), t;
}
function Pa(e, t) {
  var r = e.l, n = e.read_shift(1), a = dr(e), i = [], s = { t: a, h: a };
  if (n & 1) {
    for (var f = e.read_shift(4), o = 0; o != f; ++o) i.push(wf(e));
    s.r = i;
  } else s.r = [{ ich: 0, ifnt: 0 }];
  return e.l = r + t, s;
}
function Af(e, t) {
  var r = !1;
  return t == null && (r = !0, t = W(15 + 4 * e.t.length)), t.write_shift(1, 0), ir(e.t, t), r ? t.slice(0, t.l) : t;
}
var Ff = Pa;
function yf(e, t) {
  var r = !1;
  return t == null && (r = !0, t = W(23 + 4 * e.t.length)), t.write_shift(1, 1), ir(e.t, t), t.write_shift(4, 1), Sf({}, t), r ? t.slice(0, t.l) : t;
}
function br(e) {
  var t = e.read_shift(4), r = e.read_shift(2);
  return r += e.read_shift(1) << 16, e.l++, { c: t, iStyleRef: r };
}
function Tt(e, t) {
  return t == null && (t = W(8)), t.write_shift(-4, e.c), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
function Et(e) {
  var t = e.read_shift(2);
  return t += e.read_shift(1) << 16, e.l++, { c: -1, iStyleRef: t };
}
function wt(e, t) {
  return t == null && (t = W(4)), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
var Cf = dr, xi = ir;
function La(e) {
  var t = e.read_shift(4);
  return t === 0 || t === 4294967295 ? "" : e.read_shift(t, "dbcs");
}
function $n(e, t) {
  var r = !1;
  return t == null && (r = !0, t = W(127)), t.write_shift(4, e.length > 0 ? e.length : 4294967295), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
var Of = dr, Ea = La, Ma = $n;
function di(e) {
  var t = e.slice(e.l, e.l + 4), r = t[0] & 1, n = t[0] & 2;
  e.l += 4;
  var a = n === 0 ? zn([0, 0, 0, 0, t[0] & 252, t[1], t[2], t[3]], 0) : dt(t, 0) >> 2;
  return r ? a / 100 : a;
}
function pi(e, t) {
  t == null && (t = W(4));
  var r = 0, n = 0, a = e * 100;
  if (e == (e | 0) && e >= -536870912 && e < 1 << 29 ? n = 1 : a == (a | 0) && a >= -536870912 && a < 1 << 29 && (n = 1, r = 1), n) t.write_shift(-4, ((r ? a : e) << 2) + (r + 2));
  else throw new Error("unsupported RkNumber " + e);
}
function vi(e) {
  var t = { s: {}, e: {} };
  return t.s.r = e.read_shift(4), t.e.r = e.read_shift(4), t.s.c = e.read_shift(4), t.e.c = e.read_shift(4), t;
}
function If(e, t) {
  return t || (t = W(16)), t.write_shift(4, e.s.r), t.write_shift(4, e.e.r), t.write_shift(4, e.s.c), t.write_shift(4, e.e.c), t;
}
var St = vi, Gt = If;
function Xt(e) {
  if (e.length - e.l < 8) throw "XLS Xnum Buffer underflow";
  return e.read_shift(8, "f");
}
function mt(e, t) {
  return (t || W(8)).write_shift(8, e, "f");
}
function kf(e) {
  var t = {}, r = e.read_shift(1), n = r >>> 1, a = e.read_shift(1), i = e.read_shift(2, "i"), s = e.read_shift(1), f = e.read_shift(1), o = e.read_shift(1);
  switch (e.l++, n) {
    case 0:
      t.auto = 1;
      break;
    case 1:
      t.index = a;
      var l = Uf[a];
      l && (t.rgb = A0(l));
      break;
    case 2:
      t.rgb = A0([s, f, o]);
      break;
    case 3:
      t.theme = a;
      break;
  }
  return i != 0 && (t.tint = i > 0 ? i / 32767 : i / 32768), t;
}
function jn(e, t) {
  if (t || (t = W(8)), !e || e.auto)
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
function Df(e) {
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
function Rf(e, t) {
  t || (t = W(2));
  var r = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 : 0);
  return t.write_shift(1, r), t.write_shift(1, 0), t;
}
var mi = 2, Or = 3, Ln = 11, Kn = 19, Mn = 64, Nf = 65, Pf = 71, Lf = 4108, Mf = 4126, fr = 80, d0 = {
  /*::[*/
  1: { n: "CodePage", t: mi },
  /*::[*/
  2: { n: "Category", t: fr },
  /*::[*/
  3: { n: "PresentationFormat", t: fr },
  /*::[*/
  4: { n: "ByteCount", t: Or },
  /*::[*/
  5: { n: "LineCount", t: Or },
  /*::[*/
  6: { n: "ParagraphCount", t: Or },
  /*::[*/
  7: { n: "SlideCount", t: Or },
  /*::[*/
  8: { n: "NoteCount", t: Or },
  /*::[*/
  9: { n: "HiddenCount", t: Or },
  /*::[*/
  10: { n: "MultimediaClipCount", t: Or },
  /*::[*/
  11: { n: "ScaleCrop", t: Ln },
  /*::[*/
  12: {
    n: "HeadingPairs",
    t: Lf
    /* VT_VECTOR | VT_VARIANT */
  },
  /*::[*/
  13: {
    n: "TitlesOfParts",
    t: Mf
    /* VT_VECTOR | VT_LPSTR */
  },
  /*::[*/
  14: { n: "Manager", t: fr },
  /*::[*/
  15: { n: "Company", t: fr },
  /*::[*/
  16: { n: "LinksUpToDate", t: Ln },
  /*::[*/
  17: { n: "CharacterCount", t: Or },
  /*::[*/
  19: { n: "SharedDoc", t: Ln },
  /*::[*/
  22: { n: "HyperlinksChanged", t: Ln },
  /*::[*/
  23: { n: "AppVersion", t: Or, p: "version" },
  /*::[*/
  24: { n: "DigSig", t: Nf },
  /*::[*/
  26: { n: "ContentType", t: fr },
  /*::[*/
  27: { n: "ContentStatus", t: fr },
  /*::[*/
  28: { n: "Language", t: fr },
  /*::[*/
  29: { n: "Version", t: fr },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: Kn },
  /*::[*/
  2147483651: { n: "Behavior", t: Kn },
  /*::[*/
  1919054434: {}
}, p0 = {
  /*::[*/
  1: { n: "CodePage", t: mi },
  /*::[*/
  2: { n: "Title", t: fr },
  /*::[*/
  3: { n: "Subject", t: fr },
  /*::[*/
  4: { n: "Author", t: fr },
  /*::[*/
  5: { n: "Keywords", t: fr },
  /*::[*/
  6: { n: "Comments", t: fr },
  /*::[*/
  7: { n: "Template", t: fr },
  /*::[*/
  8: { n: "LastAuthor", t: fr },
  /*::[*/
  9: { n: "RevNumber", t: fr },
  /*::[*/
  10: { n: "EditTime", t: Mn },
  /*::[*/
  11: { n: "LastPrinted", t: Mn },
  /*::[*/
  12: { n: "CreatedDate", t: Mn },
  /*::[*/
  13: { n: "ModifiedDate", t: Mn },
  /*::[*/
  14: { n: "PageCount", t: Or },
  /*::[*/
  15: { n: "WordCount", t: Or },
  /*::[*/
  16: { n: "CharCount", t: Or },
  /*::[*/
  17: { n: "Thumbnail", t: Pf },
  /*::[*/
  18: { n: "Application", t: fr },
  /*::[*/
  19: { n: "DocSecurity", t: Or },
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
function Bf(e) {
  return e.map(function(t) {
    return [t >> 16 & 255, t >> 8 & 255, t & 255];
  });
}
var bf = /* @__PURE__ */ Bf([
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
]), Uf = /* @__PURE__ */ Fr(bf), Tn = {
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
}, Vf = {
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
function gi() {
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
function _i(e, t) {
  var r = Ys(Vf), n = [], a;
  n[n.length] = Ze, n[n.length] = ee("Types", null, {
    xmlns: nr.CT,
    "xmlns:xsd": nr.xsd,
    "xmlns:xsi": nr.xsi
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
      ContentType: Bn[o][t.bookType] || Bn[o].xlsx
    }));
  }, s = function(o) {
    (e[o] || []).forEach(function(l) {
      n[n.length] = ee("Override", null, {
        PartName: (l[0] == "/" ? "" : "/") + l,
        ContentType: Bn[o][t.bookType] || Bn[o].xlsx
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
function Ti(e) {
  var t = e.lastIndexOf("/");
  return e.slice(0, t + 1) + "_rels/" + e.slice(t + 1) + ".rels";
}
function Bt(e) {
  var t = [Ze, ee("Relationships", null, {
    //'xmlns:ns0': XMLNS.RELS,
    xmlns: nr.RELS
  })];
  return cr(e["!id"]).forEach(function(r) {
    t[t.length] = ee("Relationship", null, e["!id"][r]);
  }), t.length > 2 && (t[t.length] = "</Relationships>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function De(e, t, r, n, a, i) {
  if (a || (a = {}), e["!id"] || (e["!id"] = {}), e["!idx"] || (e["!idx"] = 1), t < 0) for (t = e["!idx"]; e["!id"]["rId" + t]; ++t)
    ;
  if (e["!idx"] = t + 1, a.Id = "rId" + t, a.Type = n, a.Target = r, [Oe.HLINK, Oe.XPATH, Oe.XMISS].indexOf(a.Type) > -1 && (a.TargetMode = "External"), e["!id"][a.Id]) throw new Error("Cannot rewrite rId " + t);
  return e["!id"][a.Id] = a, e[("/" + a.Target).replace("//", "/")] = a, t;
}
function Wf(e) {
  var t = [Ze];
  t.push(`<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
`), t.push(`  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
`);
  for (var r = 0; r < e.length; ++r) t.push('  <manifest:file-entry manifest:full-path="' + e[r][0] + '" manifest:media-type="' + e[r][1] + `"/>
`);
  return t.push("</manifest:manifest>"), t.join("");
}
function v0(e, t, r) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (r || "odf") + "#" + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function Hf(e, t) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function Gf(e) {
  var t = [Ze];
  t.push(`<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
`);
  for (var r = 0; r != e.length; ++r)
    t.push(v0(e[r][0], e[r][1])), t.push(Hf("", e[r][0]));
  return t.push(v0("", "Document", "pkg")), t.push("</rdf:RDF>"), t.join("");
}
function Ei() {
  return '<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS ' + Un.version + "</meta:generator></office:meta></office:document-meta>";
}
var pt = [
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
function da(e, t, r, n, a) {
  a[e] != null || t == null || t === "" || (a[e] = t, t = Re(t), n[n.length] = r ? ee(e, t, r) : or(e, t));
}
function wi(e, t) {
  var r = t || {}, n = [Ze, ee("cp:coreProperties", null, {
    //'xmlns': XMLNS.CORE_PROPS,
    "xmlns:cp": nr.CORE_PROPS,
    "xmlns:dc": nr.dc,
    "xmlns:dcterms": nr.dcterms,
    "xmlns:dcmitype": nr.dcmitype,
    "xmlns:xsi": nr.xsi
  })], a = {};
  if (!e && !r.Props) return n.join("");
  e && (e.CreatedDate != null && da("dcterms:created", typeof e.CreatedDate == "string" ? e.CreatedDate : Ta(e.CreatedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a), e.ModifiedDate != null && da("dcterms:modified", typeof e.ModifiedDate == "string" ? e.ModifiedDate : Ta(e.ModifiedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a));
  for (var i = 0; i != pt.length; ++i) {
    var s = pt[i], f = r.Props && r.Props[s[1]] != null ? r.Props[s[1]] : e ? e[s[1]] : null;
    f === !0 ? f = "1" : f === !1 ? f = "0" : typeof f == "number" && (f = String(f)), f != null && da(s[0], f, null, n, a);
  }
  return n.length > 2 && (n[n.length] = "</cp:coreProperties>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var bt = [
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
], Si = [
  "Worksheets",
  "SheetNames",
  "NamedRanges",
  "DefinedNames",
  "Chartsheets",
  "ChartNames"
];
function Ai(e) {
  var t = [], r = ee;
  return e || (e = {}), e.Application = "SheetJS", t[t.length] = Ze, t[t.length] = ee("Properties", null, {
    xmlns: nr.EXT_PROPS,
    "xmlns:vt": nr.vt
  }), bt.forEach(function(n) {
    if (e[n[1]] !== void 0) {
      var a;
      switch (n[2]) {
        case "string":
          a = Re(String(e[n[1]]));
          break;
        case "bool":
          a = e[n[1]] ? "true" : "false";
          break;
      }
      a !== void 0 && (t[t.length] = r(n[0], a));
    }
  }), t[t.length] = r("HeadingPairs", r("vt:vector", r("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + r("vt:variant", r("vt:i4", String(e.Worksheets))), { size: 2, baseType: "variant" })), t[t.length] = r("TitlesOfParts", r("vt:vector", e.SheetNames.map(function(n) {
    return "<vt:lpstr>" + Re(n) + "</vt:lpstr>";
  }).join(""), { size: e.Worksheets, baseType: "lpstr" })), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function Fi(e) {
  var t = [Ze, ee("Properties", null, {
    xmlns: nr.CUST_PROPS,
    "xmlns:vt": nr.vt
  })];
  if (!e) return t.join("");
  var r = 1;
  return cr(e).forEach(function(a) {
    ++r, t[t.length] = ee("property", ff(e[a]), {
      fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: r,
      name: Re(a)
    });
  }), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
var m0 = {
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
function Xf(e, t) {
  var r = [];
  return cr(m0).map(function(n) {
    for (var a = 0; a < pt.length; ++a) if (pt[a][1] == n) return pt[a];
    for (a = 0; a < bt.length; ++a) if (bt[a][1] == n) return bt[a];
    throw n;
  }).forEach(function(n) {
    if (e[n[1]] != null) {
      var a = t && t.Props && t.Props[n[1]] != null ? t.Props[n[1]] : e[n[1]];
      switch (n[2]) {
        case "date":
          a = new Date(a).toISOString().replace(/\.\d*Z/, "Z");
          break;
      }
      typeof a == "number" ? a = String(a) : a === !0 || a === !1 ? a = a ? "1" : "0" : a instanceof Date && (a = new Date(a).toISOString().replace(/\.\d*Z/, "")), r.push(or(m0[n[1]] || n[1], a));
    }
  }), ee("DocumentProperties", r.join(""), { xmlns: kr.o });
}
function zf(e, t) {
  var r = ["Worksheets", "SheetNames"], n = "CustomDocumentProperties", a = [];
  return e && cr(e).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(e, i)) {
      for (var s = 0; s < pt.length; ++s) if (i == pt[s][1]) return;
      for (s = 0; s < bt.length; ++s) if (i == bt[s][1]) return;
      for (s = 0; s < r.length; ++s) if (i == r[s]) return;
      var f = e[i], o = "string";
      typeof f == "number" ? (o = "float", f = String(f)) : f === !0 || f === !1 ? (o = "boolean", f = f ? "1" : "0") : f = String(f), a.push(ee(a0(i), f, { "dt:dt": o }));
    }
  }), t && cr(t).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(t, i) && !(e && Object.prototype.hasOwnProperty.call(e, i))) {
      var s = t[i], f = "string";
      typeof s == "number" ? (f = "float", s = String(s)) : s === !0 || s === !1 ? (f = "boolean", s = s ? "1" : "0") : s instanceof Date ? (f = "dateTime.tz", s = s.toISOString()) : s = String(s), a.push(ee(a0(i), s, { "dt:dt": f }));
    }
  }), "<" + n + ' xmlns="' + kr.o + '">' + a.join("") + "</" + n + ">";
}
function $f(e) {
  var t = typeof e == "string" ? new Date(Date.parse(e)) : e, r = t.getTime() / 1e3 + 11644473600, n = r % Math.pow(2, 32), a = (r - n) / Math.pow(2, 32);
  n *= 1e7, a *= 1e7;
  var i = n / Math.pow(2, 32) | 0;
  i > 0 && (n = n % Math.pow(2, 32), a += i);
  var s = W(8);
  return s.write_shift(4, n), s.write_shift(4, a), s;
}
function g0(e, t) {
  var r = W(4), n = W(4);
  switch (r.write_shift(4, e == 80 ? 31 : e), e) {
    case 3:
      n.write_shift(-4, t);
      break;
    case 5:
      n = W(8), n.write_shift(8, t, "f");
      break;
    case 11:
      n.write_shift(4, t ? 1 : 0);
      break;
    case 64:
      n = $f(t);
      break;
    case 31:
    case 80:
      for (n = W(4 + 2 * (t.length + 1) + (t.length % 2 ? 0 : 2)), n.write_shift(4, t.length + 1), n.write_shift(0, t, "dbcs"); n.l != n.length; ) n.write_shift(1, 0);
      break;
    default:
      throw new Error("TypedPropertyValue unrecognized type " + e + " " + t);
  }
  return lr([r, n]);
}
var yi = ["CodePage", "Thumbnail", "_PID_LINKBASE", "_PID_HLINKS", "SystemIdentifier", "FMTID"];
function jf(e) {
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
function _0(e, t, r) {
  var n = W(8), a = [], i = [], s = 8, f = 0, o = W(8), l = W(8);
  if (o.write_shift(4, 2), o.write_shift(4, 1200), l.write_shift(4, 1), i.push(o), a.push(l), s += 8 + o.length, !t) {
    l = W(8), l.write_shift(4, 0), a.unshift(l);
    var u = [W(4)];
    for (u[0].write_shift(4, e.length), f = 0; f < e.length; ++f) {
      var d = e[f][0];
      for (o = W(8 + 2 * (d.length + 1) + (d.length % 2 ? 0 : 2)), o.write_shift(4, f + 2), o.write_shift(4, d.length + 1), o.write_shift(0, d, "dbcs"); o.l != o.length; ) o.write_shift(1, 0);
      u.push(o);
    }
    o = lr(u), i.unshift(o), s += 8 + o.length;
  }
  for (f = 0; f < e.length; ++f)
    if (!(t && !t[e[f][0]]) && !(yi.indexOf(e[f][0]) > -1 || Si.indexOf(e[f][0]) > -1) && e[f][1] != null) {
      var x = e[f][1], p = 0;
      if (t) {
        p = +t[e[f][0]];
        var g = r[p];
        if (g.p == "version" && typeof x == "string") {
          var h = x.split(".");
          x = (+h[0] << 16) + (+h[1] || 0);
        }
        o = g0(g.t, x);
      } else {
        var T = jf(x);
        T == -1 && (T = 31, x = String(x)), o = g0(T, x);
      }
      i.push(o), l = W(8), l.write_shift(4, t ? p : 2 + f), a.push(l), s += 8 + o.length;
    }
  var D = 8 * (i.length + 1);
  for (f = 0; f < i.length; ++f)
    a[f].write_shift(4, D), D += i[f].length;
  return n.write_shift(4, s), n.write_shift(4, i.length), lr([n].concat(a).concat(i));
}
function T0(e, t, r, n, a, i) {
  var s = W(a ? 68 : 48), f = [s];
  s.write_shift(2, 65534), s.write_shift(2, 0), s.write_shift(4, 842412599), s.write_shift(16, Le.utils.consts.HEADER_CLSID, "hex"), s.write_shift(4, a ? 2 : 1), s.write_shift(16, t, "hex"), s.write_shift(4, a ? 68 : 48);
  var o = _0(e, r, n);
  if (f.push(o), a) {
    var l = _0(a, null, null);
    s.write_shift(16, i, "hex"), s.write_shift(4, 68 + o.length), f.push(l);
  }
  return lr(f);
}
function Kf(e, t) {
  t || (t = W(e));
  for (var r = 0; r < e; ++r) t.write_shift(1, 0);
  return t;
}
function Yf(e, t) {
  return e.read_shift(t) === 1;
}
function _r(e, t) {
  return t || (t = W(2)), t.write_shift(2, +!!e), t;
}
function Ci(e) {
  return e.read_shift(2, "u");
}
function Br(e, t) {
  return t || (t = W(2)), t.write_shift(2, e), t;
}
function Oi(e, t, r) {
  return r || (r = W(2)), r.write_shift(1, t == "e" ? +e : +!!e), r.write_shift(1, t == "e" ? 1 : 0), r;
}
function Ii(e, t, r) {
  var n = e.read_shift(r && r.biff >= 12 ? 2 : 1), a = "sbcs-cont";
  if (r && r.biff >= 8, !r || r.biff == 8) {
    var i = e.read_shift(1);
    i && (a = "dbcs-cont");
  } else r.biff == 12 && (a = "wstr");
  r.biff >= 2 && r.biff <= 5 && (a = "cpstr");
  var s = n ? e.read_shift(n, a) : "";
  return s;
}
function Jf(e) {
  var t = e.t || "", r = W(3);
  r.write_shift(2, t.length), r.write_shift(1, 1);
  var n = W(2 * t.length);
  n.write_shift(2 * t.length, t, "utf16le");
  var a = [r, n];
  return lr(a);
}
function Zf(e, t, r) {
  var n;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5) return e.read_shift(t, "cpstr");
    if (r.biff >= 12) return e.read_shift(t, "dbcs-cont");
  }
  var a = e.read_shift(1);
  return a === 0 ? n = e.read_shift(t, "sbcs-cont") : n = e.read_shift(t, "dbcs-cont"), n;
}
function qf(e, t, r) {
  var n = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return n === 0 ? (e.l++, "") : Zf(e, n, r);
}
function Qf(e, t, r) {
  if (r.biff > 5) return qf(e, t, r);
  var n = e.read_shift(1);
  return n === 0 ? (e.l++, "") : e.read_shift(n, r.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont");
}
function ki(e, t, r) {
  return r || (r = W(3 + 2 * e.length)), r.write_shift(2, e.length), r.write_shift(1, 1), r.write_shift(31, e, "utf16le"), r;
}
function E0(e, t) {
  t || (t = W(6 + e.length * 2)), t.write_shift(4, 1 + e.length);
  for (var r = 0; r < e.length; ++r) t.write_shift(2, e.charCodeAt(r));
  return t.write_shift(2, 0), t;
}
function el(e) {
  var t = W(512), r = 0, n = e.Target;
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
    n = n.slice(1), E0(n, t);
  else if (i & 2) {
    for (s = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), r = 0; r < s.length; ++r) t.write_shift(1, parseInt(s[r], 16));
    var f = a > -1 ? n.slice(0, a) : n;
    for (t.write_shift(4, 2 * (f.length + 1)), r = 0; r < f.length; ++r) t.write_shift(2, f.charCodeAt(r));
    t.write_shift(2, 0), i & 8 && E0(a > -1 ? n.slice(a + 1) : "", t);
  } else {
    for (s = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" "), r = 0; r < s.length; ++r) t.write_shift(1, parseInt(s[r], 16));
    for (var o = 0; n.slice(o * 3, o * 3 + 3) == "../" || n.slice(o * 3, o * 3 + 3) == "..\\"; ) ++o;
    for (t.write_shift(2, o), t.write_shift(4, n.length - 3 * o + 1), r = 0; r < n.length - 3 * o; ++r) t.write_shift(1, n.charCodeAt(r + 3 * o) & 255);
    for (t.write_shift(1, 0), t.write_shift(2, 65535), t.write_shift(2, 57005), r = 0; r < 6; ++r) t.write_shift(4, 0);
  }
  return t.slice(0, t.l);
}
function gt(e, t, r, n) {
  return n || (n = W(6)), n.write_shift(2, e), n.write_shift(2, t), n.write_shift(2, r || 0), n;
}
function rl(e, t, r) {
  var n = r.biff > 8 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n, "i"), s = e.read_shift(n, "i");
  return [a, i, s];
}
function tl(e) {
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(2), a = e.read_shift(2);
  return { s: { c: n, r: t }, e: { c: a, r } };
}
function Di(e, t) {
  return t || (t = W(8)), t.write_shift(2, e.s.r), t.write_shift(2, e.e.r), t.write_shift(2, e.s.c), t.write_shift(2, e.e.c), t;
}
function Ba(e, t, r) {
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
  var i = W(a);
  return i.write_shift(2, n), i.write_shift(2, t), a > 4 && i.write_shift(2, 29282), a > 6 && i.write_shift(2, 1997), a > 8 && (i.write_shift(2, 49161), i.write_shift(2, 1), i.write_shift(2, 1798), i.write_shift(2, 0)), i;
}
function nl(e, t) {
  var r = !t || t.biff == 8, n = W(r ? 112 : 54);
  for (n.write_shift(t.biff == 8 ? 2 : 1, 7), r && n.write_shift(1, 0), n.write_shift(4, 859007059), n.write_shift(4, 5458548 | (r ? 0 : 536870912)); n.l < n.length; ) n.write_shift(1, r ? 0 : 32);
  return n;
}
function al(e, t) {
  var r = !t || t.biff >= 8 ? 2 : 1, n = W(8 + r * e.name.length);
  n.write_shift(4, e.pos), n.write_shift(1, e.hs || 0), n.write_shift(1, e.dt), n.write_shift(1, e.name.length), t.biff >= 8 && n.write_shift(1, 1), n.write_shift(r * e.name.length, e.name, t.biff < 8 ? "sbcs" : "utf16le");
  var a = n.slice(0, n.l);
  return a.l = n.l, a;
}
function il(e, t) {
  var r = W(8);
  r.write_shift(4, e.Count), r.write_shift(4, e.Unique);
  for (var n = [], a = 0; a < e.length; ++a) n[a] = Jf(e[a]);
  var i = lr([r].concat(n));
  return i.parts = [r.length].concat(n.map(function(s) {
    return s.length;
  })), i;
}
function sl() {
  var e = W(18);
  return e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 29280), e.write_shift(2, 17600), e.write_shift(2, 56), e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 1), e.write_shift(2, 500), e;
}
function fl(e) {
  var t = W(18), r = 1718;
  return e && e.RTL && (r |= 64), t.write_shift(2, r), t.write_shift(4, 0), t.write_shift(4, 64), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
function ll(e, t) {
  var r = e.name || "Arial", n = t && t.biff == 5, a = n ? 15 + r.length : 16 + 2 * r.length, i = W(a);
  return i.write_shift(2, e.sz * 20), i.write_shift(4, 0), i.write_shift(2, 400), i.write_shift(4, 0), i.write_shift(2, 0), i.write_shift(1, r.length), n || i.write_shift(1, 1), i.write_shift((n ? 1 : 2) * r.length, r, n ? "sbcs" : "utf16le"), i;
}
function ol(e, t, r, n) {
  var a = W(10);
  return gt(e, t, n, a), a.write_shift(4, r), a;
}
function ul(e, t, r, n, a) {
  var i = !a || a.biff == 8, s = W(8 + +i + (1 + i) * r.length);
  return gt(e, t, n, s), s.write_shift(2, r.length), i && s.write_shift(1, 1), s.write_shift((1 + i) * r.length, r, i ? "utf16le" : "sbcs"), s;
}
function cl(e, t, r, n) {
  var a = r && r.biff == 5;
  n || (n = W(a ? 3 + t.length : 5 + 2 * t.length)), n.write_shift(2, e), n.write_shift(a ? 1 : 2, t.length), a || n.write_shift(1, 1), n.write_shift((a ? 1 : 2) * t.length, t, a ? "sbcs" : "utf16le");
  var i = n.length > n.l ? n.slice(0, n.l) : n;
  return i.l == null && (i.l = i.length), i;
}
function hl(e, t) {
  var r = t.biff == 8 || !t.biff ? 4 : 2, n = W(2 * r + 6);
  return n.write_shift(r, e.s.r), n.write_shift(r, e.e.r + 1), n.write_shift(2, e.s.c), n.write_shift(2, e.e.c + 1), n.write_shift(2, 0), n;
}
function w0(e, t, r, n) {
  var a = r && r.biff == 5;
  n || (n = W(a ? 16 : 20)), n.write_shift(2, 0), e.style ? (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, 65524)) : (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, t << 4));
  var i = 0;
  return e.numFmtId > 0 && a && (i |= 1024), n.write_shift(4, i), n.write_shift(4, 0), a || n.write_shift(4, 0), n.write_shift(2, 0), n;
}
function xl(e) {
  var t = W(8);
  return t.write_shift(4, 0), t.write_shift(2, 0), t.write_shift(2, 0), t;
}
function dl(e, t, r, n, a, i) {
  var s = W(8);
  return gt(e, t, n, s), Oi(r, i, s), s;
}
function pl(e, t, r, n) {
  var a = W(14);
  return gt(e, t, n, a), mt(r, a), a;
}
function vl(e, t, r) {
  if (r.biff < 8) return ml(e, t, r);
  for (var n = [], a = e.l + t, i = e.read_shift(r.biff > 8 ? 4 : 2); i-- !== 0; ) n.push(rl(e, r.biff > 8 ? 12 : 6, r));
  if (e.l != a) throw new Error("Bad ExternSheet: " + e.l + " != " + a);
  return n;
}
function ml(e, t, r) {
  e[e.l + 1] == 3 && e[e.l]++;
  var n = Ii(e, t, r);
  return n.charCodeAt(0) == 3 ? n.slice(1) : n;
}
function gl(e) {
  var t = W(2 + e.length * 8);
  t.write_shift(2, e.length);
  for (var r = 0; r < e.length; ++r) Di(e[r], t);
  return t;
}
function _l(e) {
  var t = W(24), r = ar(e[0]);
  t.write_shift(2, r.r), t.write_shift(2, r.r), t.write_shift(2, r.c), t.write_shift(2, r.c);
  for (var n = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), a = 0; a < 16; ++a) t.write_shift(1, parseInt(n[a], 16));
  return lr([t, el(e[1])]);
}
function Tl(e) {
  var t = e[1].Tooltip, r = W(10 + 2 * (t.length + 1));
  r.write_shift(2, 2048);
  var n = ar(e[0]);
  r.write_shift(2, n.r), r.write_shift(2, n.r), r.write_shift(2, n.c), r.write_shift(2, n.c);
  for (var a = 0; a < t.length; ++a) r.write_shift(2, t.charCodeAt(a));
  return r.write_shift(2, 0), r;
}
function El(e) {
  return e || (e = W(4)), e.write_shift(2, 1), e.write_shift(2, 1), e;
}
function wl(e, t, r) {
  if (!r.cellStyles) return jr(e, t);
  var n = r && r.biff >= 12 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n), s = e.read_shift(n), f = e.read_shift(n), o = e.read_shift(2);
  n == 2 && (e.l += 2);
  var l = { s: a, e: i, w: s, ixfe: f, flags: o };
  return (r.biff >= 5 || !r.biff) && (l.level = o >> 8 & 7), l;
}
function Sl(e, t) {
  var r = W(12);
  r.write_shift(2, t), r.write_shift(2, t), r.write_shift(2, e.width * 256), r.write_shift(2, 0);
  var n = 0;
  return e.hidden && (n |= 1), r.write_shift(1, n), n = e.level || 0, r.write_shift(1, n), r.write_shift(2, 0), r;
}
function Al(e) {
  for (var t = W(2 * e), r = 0; r < e; ++r) t.write_shift(2, r + 1);
  return t;
}
function Fl(e, t, r) {
  var n = W(15);
  return wn(n, e, t), n.write_shift(8, r, "f"), n;
}
function yl(e, t, r) {
  var n = W(9);
  return wn(n, e, t), n.write_shift(2, r), n;
}
var Cl = /* @__PURE__ */ function() {
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
  }, t = ya({
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
    var l = [], u = vt(1);
    switch (o.type) {
      case "base64":
        u = Wr(rt(f));
        break;
      case "binary":
        u = Wr(f);
        break;
      case "buffer":
      case "array":
        u = f;
        break;
    }
    Ir(u, 0);
    var d = u.read_shift(1), x = !!(d & 136), p = !1, g = !1;
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
    var h = 0, T = 521;
    d == 2 && (h = u.read_shift(2)), u.l += 3, d != 2 && (h = u.read_shift(4)), h > 1048576 && (h = 1e6), d != 2 && (T = u.read_shift(2));
    var D = u.read_shift(2), k = o.codepage || 1252;
    d != 2 && (u.l += 16, u.read_shift(1), u[u.l] !== 0 && (k = e[u[u.l]]), u.l += 1, u.l += 2), g && (u.l += 36);
    for (var C = [], U = {}, q = Math.min(u.length, d == 2 ? 521 : T - 10 - (p ? 264 : 0)), te = g ? 32 : 11; u.l < q && u[u.l] != 13; )
      switch (U = {}, U.name = Vn.utils.decode(k, u.slice(u.l, u.l + te)).replace(/[\u0000\r\n].*$/g, ""), u.l += te, U.type = String.fromCharCode(u.read_shift(1)), d != 2 && !g && (U.offset = u.read_shift(4)), U.len = u.read_shift(1), d == 2 && (U.offset = u.read_shift(2)), U.dec = u.read_shift(1), U.name.length && C.push(U), d != 2 && (u.l += g ? 13 : 14), U.type) {
        case "B":
          (!p || U.len != 8) && o.WTF && console.log("Skipping " + U.name + ":" + U.type);
          break;
        case "G":
        case "P":
          o.WTF && console.log("Skipping " + U.name + ":" + U.type);
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
          throw new Error("Unknown Field Type: " + U.type);
      }
    if (u[u.l] !== 13 && (u.l = T - 1), u.read_shift(1) !== 13) throw new Error("DBF Terminator not found " + u.l + " " + u[u.l]);
    u.l = T;
    var I = 0, V = 0;
    for (l[0] = [], V = 0; V != C.length; ++V) l[0][V] = C[V].name;
    for (; h-- > 0; ) {
      if (u[u.l] === 42) {
        u.l += D;
        continue;
      }
      for (++u.l, l[++I] = [], V = 0, V = 0; V != C.length; ++V) {
        var b = u.slice(u.l, u.l + C[V].len);
        u.l += C[V].len, Ir(b, 0);
        var j = Vn.utils.decode(k, b);
        switch (C[V].type) {
          case "C":
            j.trim().length && (l[I][V] = j.replace(/\s+$/, ""));
            break;
          case "D":
            j.length === 8 ? l[I][V] = new Date(+j.slice(0, 4), +j.slice(4, 6) - 1, +j.slice(6, 8)) : l[I][V] = j;
            break;
          case "F":
            l[I][V] = parseFloat(j.trim());
            break;
          case "+":
          case "I":
            l[I][V] = g ? b.read_shift(-4, "i") ^ 2147483648 : b.read_shift(4, "i");
            break;
          case "L":
            switch (j.trim().toUpperCase()) {
              case "Y":
              case "T":
                l[I][V] = !0;
                break;
              case "N":
              case "F":
                l[I][V] = !1;
                break;
              case "":
              case "?":
                break;
              default:
                throw new Error("DBF Unrecognized L:|" + j + "|");
            }
            break;
          case "M":
            if (!x) throw new Error("DBF Unexpected MEMO for type " + d.toString(16));
            l[I][V] = "##MEMO##" + (g ? parseInt(j.trim(), 10) : b.read_shift(4));
            break;
          case "N":
            j = j.replace(/\u0000/g, "").trim(), j && j != "." && (l[I][V] = +j || 0);
            break;
          case "@":
            l[I][V] = new Date(b.read_shift(-8, "f") - 621356832e5);
            break;
          case "T":
            l[I][V] = new Date((b.read_shift(4) - 2440588) * 864e5 + b.read_shift(4));
            break;
          case "Y":
            l[I][V] = b.read_shift(4, "i") / 1e4 + b.read_shift(4, "i") / 1e4 * Math.pow(2, 32);
            break;
          case "O":
            l[I][V] = -b.read_shift(-8, "f");
            break;
          case "B":
            if (p && C[V].len == 8) {
              l[I][V] = b.read_shift(8, "f");
              break;
            }
          case "G":
          case "P":
            b.l += C[V].len;
            break;
          case "0":
            if (C[V].name === "_NullFlags") break;
          default:
            throw new Error("DBF Unsupported data type " + C[V].type);
        }
      }
    }
    if (d != 2 && u.l < u.length && u[u.l++] != 26) throw new Error("DBF EOF Marker missing " + (u.l - 1) + " of " + u.length + " " + u[u.l - 1].toString(16));
    return o && o.sheetRows && (l = l.slice(0, o.sheetRows)), o.DBF = C, l;
  }
  function n(f, o) {
    var l = o || {};
    l.dateNF || (l.dateNF = "yyyymmdd");
    var u = Ht(r(f, l), l);
    return u["!cols"] = l.DBF.map(function(d) {
      return {
        wch: d.len,
        DBF: d
      };
    }), delete l.DBF, u;
  }
  function a(f, o) {
    try {
      return _t(n(f, o), o);
    } catch (l) {
      if (o && o.WTF) throw l;
    }
    return { SheetNames: [], Sheets: {} };
  }
  var i = { B: 8, C: 250, L: 1, D: 8, "?": 0, "": 0 };
  function s(f, o) {
    var l = o || {};
    if (+l.codepage >= 0 && un(+l.codepage), l.type == "string") throw new Error("Cannot write DBF to JS string");
    var u = Sr(), d = Qn(f, { header: 1, raw: !0, cellDates: !0 }), x = d[0], p = d.slice(1), g = f["!cols"] || [], h = 0, T = 0, D = 0, k = 1;
    for (h = 0; h < x.length; ++h) {
      if (((g[h] || {}).DBF || {}).name) {
        x[h] = g[h].DBF.name, ++D;
        continue;
      }
      if (x[h] != null) {
        if (++D, typeof x[h] == "number" && (x[h] = x[h].toString(10)), typeof x[h] != "string") throw new Error("DBF Invalid column name " + x[h] + " |" + typeof x[h] + "|");
        if (x.indexOf(x[h]) !== h) {
          for (T = 0; T < 1024; ++T)
            if (x.indexOf(x[h] + "_" + T) == -1) {
              x[h] += "_" + T;
              break;
            }
        }
      }
    }
    var C = Be(f["!ref"]), U = [], q = [], te = [];
    for (h = 0; h <= C.e.c - C.s.c; ++h) {
      var I = "", V = "", b = 0, j = [];
      for (T = 0; T < p.length; ++T)
        p[T][h] != null && j.push(p[T][h]);
      if (j.length == 0 || x[h] == null) {
        U[h] = "?";
        continue;
      }
      for (T = 0; T < j.length; ++T) {
        switch (typeof j[T]) {
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
            V = j[T] instanceof Date ? "D" : "C";
            break;
          default:
            V = "C";
        }
        b = Math.max(b, String(j[T]).length), I = I && I != V ? "C" : V;
      }
      b > 250 && (b = 250), V = ((g[h] || {}).DBF || {}).type, V == "C" && g[h].DBF.len > b && (b = g[h].DBF.len), I == "B" && V == "N" && (I = "N", te[h] = g[h].DBF.dec, b = g[h].DBF.len), q[h] = I == "C" || V == "N" ? b : i[I] || 0, k += q[h], U[h] = I;
    }
    var Y = u.next(32);
    for (Y.write_shift(4, 318902576), Y.write_shift(4, p.length), Y.write_shift(2, 296 + 32 * D), Y.write_shift(2, k), h = 0; h < 4; ++h) Y.write_shift(4, 0);
    for (Y.write_shift(4, 0 | (+t[
      /*::String(*/
      N0
      /*::)*/
    ] || 3) << 8), h = 0, T = 0; h < x.length; ++h)
      if (x[h] != null) {
        var J = u.next(32), ie = (x[h].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
        J.write_shift(1, ie, "sbcs"), J.write_shift(1, U[h] == "?" ? "C" : U[h], "sbcs"), J.write_shift(4, T), J.write_shift(1, q[h] || i[U[h]] || 0), J.write_shift(1, te[h] || 0), J.write_shift(1, 2), J.write_shift(4, 0), J.write_shift(1, 0), J.write_shift(4, 0), J.write_shift(4, 0), T += q[h] || i[U[h]] || 0;
      }
    var ye = u.next(264);
    for (ye.write_shift(4, 13), h = 0; h < 65; ++h) ye.write_shift(4, 0);
    for (h = 0; h < p.length; ++h) {
      var de = u.next(k);
      for (de.write_shift(1, 0), T = 0; T < x.length; ++T)
        if (x[T] != null)
          switch (U[T]) {
            case "L":
              de.write_shift(1, p[h][T] == null ? 63 : p[h][T] ? 84 : 70);
              break;
            case "B":
              de.write_shift(8, p[h][T] || 0, "f");
              break;
            case "N":
              var ve = "0";
              for (typeof p[h][T] == "number" && (ve = p[h][T].toFixed(te[T] || 0)), D = 0; D < q[T] - ve.length; ++D) de.write_shift(1, 32);
              de.write_shift(1, ve, "sbcs");
              break;
            case "D":
              p[h][T] ? (de.write_shift(4, ("0000" + p[h][T].getFullYear()).slice(-4), "sbcs"), de.write_shift(2, ("00" + (p[h][T].getMonth() + 1)).slice(-2), "sbcs"), de.write_shift(2, ("00" + p[h][T].getDate()).slice(-2), "sbcs")) : de.write_shift(8, "00000000", "sbcs");
              break;
            case "C":
              var be = String(p[h][T] != null ? p[h][T] : "").slice(0, q[T]);
              for (de.write_shift(1, be, "sbcs"), D = 0; D < q[T] - be.length; ++D) de.write_shift(1, 32);
              break;
          }
    }
    return u.next(1).write_shift(1, 26), u.end();
  }
  return {
    to_workbook: a,
    to_sheet: n,
    from_sheet: s
  };
}(), Ol = /* @__PURE__ */ function() {
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
  }, t = new RegExp("\x1BN(" + cr(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm"), r = function(x, p) {
    var g = e[p];
    return typeof g == "number" ? $a(g) : g;
  }, n = function(x, p, g) {
    var h = p.charCodeAt(0) - 32 << 4 | g.charCodeAt(0) - 48;
    return h == 59 ? x : $a(h);
  };
  e["|"] = 254;
  function a(x, p) {
    switch (p.type) {
      case "base64":
        return i(rt(x), p);
      case "binary":
        return i(x, p);
      case "buffer":
        return i(Ie && Buffer.isBuffer(x) ? x.toString("binary") : mn(x), p);
      case "array":
        return i(aa(x), p);
    }
    throw new Error("Unrecognized type " + p.type);
  }
  function i(x, p) {
    var g = x.split(/[\n\r]+/), h = -1, T = -1, D = 0, k = 0, C = [], U = [], q = null, te = {}, I = [], V = [], b = [], j = 0, Y;
    for (+p.codepage >= 0 && un(+p.codepage); D !== g.length; ++D) {
      j = 0;
      var J = g[D].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, n).replace(t, r), ie = J.replace(/;;/g, "\0").split(";").map(function(y) {
        return y.replace(/\u0000/g, ";");
      }), ye = ie[0], de;
      if (J.length > 0) switch (ye) {
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
          ie[1].charAt(0) == "P" && U.push(J.slice(3).replace(/;;/g, ";"));
          break;
        case "C":
          var ve = !1, be = !1, yr = !1, Xe = !1, Er = -1, pr = -1;
          for (k = 1; k < ie.length; ++k) switch (ie[k].charAt(0)) {
            case "A":
              break;
            case "X":
              T = parseInt(ie[k].slice(1)) - 1, be = !0;
              break;
            case "Y":
              for (h = parseInt(ie[k].slice(1)) - 1, be || (T = 0), Y = C.length; Y <= h; ++Y) C[Y] = [];
              break;
            case "K":
              de = ie[k].slice(1), de.charAt(0) === '"' ? de = de.slice(1, de.length - 1) : de === "TRUE" ? de = !0 : de === "FALSE" ? de = !1 : isNaN(Qr(de)) ? isNaN(hn(de).getDate()) || (de = Tr(de)) : (de = Qr(de), q !== null && z0(q) && (de = Y0(de))), ve = !0;
              break;
            case "E":
              Xe = !0;
              var A = Co(ie[k].slice(1), { r: h, c: T });
              C[h][T] = [C[h][T], A];
              break;
            case "S":
              yr = !0, C[h][T] = [C[h][T], "S5S"];
              break;
            case "G":
              break;
            case "R":
              Er = parseInt(ie[k].slice(1)) - 1;
              break;
            case "C":
              pr = parseInt(ie[k].slice(1)) - 1;
              break;
            default:
              if (p && p.WTF) throw new Error("SYLK bad record " + J);
          }
          if (ve && (C[h][T] && C[h][T].length == 2 ? C[h][T][0] = de : C[h][T] = de, q = null), yr) {
            if (Xe) throw new Error("SYLK shared formula cannot have own formula");
            var M = Er > -1 && C[Er][pr];
            if (!M || !M[1]) throw new Error("SYLK shared formula cannot find base");
            C[h][T][1] = Oo(M[1], { r: h - Er, c: T - pr });
          }
          break;
        case "F":
          var F = 0;
          for (k = 1; k < ie.length; ++k) switch (ie[k].charAt(0)) {
            case "X":
              T = parseInt(ie[k].slice(1)) - 1, ++F;
              break;
            case "Y":
              for (h = parseInt(ie[k].slice(1)) - 1, Y = C.length; Y <= h; ++Y) C[Y] = [];
              break;
            case "M":
              j = parseInt(ie[k].slice(1)) / 20;
              break;
            case "F":
              break;
            case "G":
              break;
            case "P":
              q = U[parseInt(ie[k].slice(1))];
              break;
            case "S":
              break;
            case "D":
              break;
            case "N":
              break;
            case "W":
              for (b = ie[k].slice(1).split(" "), Y = parseInt(b[0], 10); Y <= parseInt(b[1], 10); ++Y)
                j = parseInt(b[2], 10), V[Y - 1] = j === 0 ? { hidden: !0 } : { wch: j }, ba(V[Y - 1]);
              break;
            case "C":
              T = parseInt(ie[k].slice(1)) - 1, V[T] || (V[T] = {});
              break;
            case "R":
              h = parseInt(ie[k].slice(1)) - 1, I[h] || (I[h] = {}), j > 0 ? (I[h].hpt = j, I[h].hpx = Mi(j)) : j === 0 && (I[h].hidden = !0);
              break;
            default:
              if (p && p.WTF) throw new Error("SYLK bad record " + J);
          }
          F < 1 && (q = null);
          break;
        default:
          if (p && p.WTF) throw new Error("SYLK bad record " + J);
      }
    }
    return I.length > 0 && (te["!rows"] = I), V.length > 0 && (te["!cols"] = V), p && p.sheetRows && (C = C.slice(0, p.sheetRows)), [C, te];
  }
  function s(x, p) {
    var g = a(x, p), h = g[0], T = g[1], D = Ht(h, p);
    return cr(T).forEach(function(k) {
      D[k] = T[k];
    }), D;
  }
  function f(x, p) {
    return _t(s(x, p), p);
  }
  function o(x, p, g, h) {
    var T = "C;Y" + (g + 1) + ";X" + (h + 1) + ";K";
    switch (x.t) {
      case "n":
        T += x.v || 0, x.f && !x.F && (T += ";E" + Va(x.f, { r: g, c: h }));
        break;
      case "b":
        T += x.v ? "TRUE" : "FALSE";
        break;
      case "e":
        T += x.w || x.v;
        break;
      case "d":
        T += '"' + (x.w || x.v) + '"';
        break;
      case "s":
        T += '"' + x.v.replace(/"/g, "").replace(/;/g, ";;") + '"';
        break;
    }
    return T;
  }
  function l(x, p) {
    p.forEach(function(g, h) {
      var T = "F;W" + (h + 1) + " " + (h + 1) + " ";
      g.hidden ? T += "0" : (typeof g.width == "number" && !g.wpx && (g.wpx = Yn(g.width)), typeof g.wpx == "number" && !g.wch && (g.wch = Jn(g.wpx)), typeof g.wch == "number" && (T += Math.round(g.wch))), T.charAt(T.length - 1) != " " && x.push(T);
    });
  }
  function u(x, p) {
    p.forEach(function(g, h) {
      var T = "F;";
      g.hidden ? T += "M0;" : g.hpt ? T += "M" + 20 * g.hpt + ";" : g.hpx && (T += "M" + 20 * Zn(g.hpx) + ";"), T.length > 2 && x.push(T + "R" + (h + 1));
    });
  }
  function d(x, p) {
    var g = ["ID;PWXL;N;E"], h = [], T = Be(x["!ref"]), D, k = Array.isArray(x), C = `\r
`;
    g.push("P;PGeneral"), g.push("F;P0;DG0G8;M255"), x["!cols"] && l(g, x["!cols"]), x["!rows"] && u(g, x["!rows"]), g.push("B;Y" + (T.e.r - T.s.r + 1) + ";X" + (T.e.c - T.s.c + 1) + ";D" + [T.s.c, T.s.r, T.e.c, T.e.r].join(" "));
    for (var U = T.s.r; U <= T.e.r; ++U)
      for (var q = T.s.c; q <= T.e.c; ++q) {
        var te = Ne({ r: U, c: q });
        D = k ? (x[U] || [])[q] : x[te], !(!D || D.v == null && (!D.f || D.F)) && h.push(o(D, x, U, q));
      }
    return g.join(C) + C + h.join(C) + C + "E" + C;
  }
  return {
    to_workbook: f,
    to_sheet: s,
    from_sheet: d
  };
}(), Il = /* @__PURE__ */ function() {
  function e(i, s) {
    switch (s.type) {
      case "base64":
        return t(rt(i), s);
      case "binary":
        return t(i, s);
      case "buffer":
        return t(Ie && Buffer.isBuffer(i) ? i.toString("binary") : mn(i), s);
      case "array":
        return t(aa(i), s);
    }
    throw new Error("Unrecognized type " + s.type);
  }
  function t(i, s) {
    for (var f = i.split(`
`), o = -1, l = -1, u = 0, d = []; u !== f.length; ++u) {
      if (f[u].trim() === "BOT") {
        d[++o] = [], l = 0;
        continue;
      }
      if (!(o < 0)) {
        var x = f[u].trim().split(","), p = x[0], g = x[1];
        ++u;
        for (var h = f[u] || ""; (h.match(/["]/g) || []).length & 1 && u < f.length - 1; ) h += `
` + f[++u];
        switch (h = h.trim(), +p) {
          case -1:
            if (h === "BOT") {
              d[++o] = [], l = 0;
              continue;
            } else if (h !== "EOD") throw new Error("Unrecognized DIF special command " + h);
            break;
          case 0:
            h === "TRUE" ? d[o][l] = !0 : h === "FALSE" ? d[o][l] = !1 : isNaN(Qr(g)) ? isNaN(hn(g).getDate()) ? d[o][l] = g : d[o][l] = Tr(g) : d[o][l] = Qr(g), ++l;
            break;
          case 1:
            h = h.slice(1, h.length - 1), h = h.replace(/""/g, '"'), h && h.match(/^=".*"$/) && (h = h.slice(2, -1)), d[o][l++] = h !== "" ? h : null;
            break;
        }
        if (h === "EOD") break;
      }
    }
    return s && s.sheetRows && (d = d.slice(0, s.sheetRows)), d;
  }
  function r(i, s) {
    return Ht(e(i, s), s);
  }
  function n(i, s) {
    return _t(r(i, s), s);
  }
  var a = /* @__PURE__ */ function() {
    var i = function(o, l, u, d, x) {
      o.push(l), o.push(u + "," + d), o.push('"' + x.replace(/"/g, '""') + '"');
    }, s = function(o, l, u, d) {
      o.push(l + "," + u), o.push(l == 1 ? '"' + d.replace(/"/g, '""') + '"' : d);
    };
    return function(o) {
      var l = [], u = Be(o["!ref"]), d, x = Array.isArray(o);
      i(l, "TABLE", 0, 1, "sheetjs"), i(l, "VECTORS", 0, u.e.r - u.s.r + 1, ""), i(l, "TUPLES", 0, u.e.c - u.s.c + 1, ""), i(l, "DATA", 0, 0, "");
      for (var p = u.s.r; p <= u.e.r; ++p) {
        s(l, -1, 0, "BOT");
        for (var g = u.s.c; g <= u.e.c; ++g) {
          var h = Ne({ r: p, c: g });
          if (d = x ? (o[p] || [])[g] : o[h], !d) {
            s(l, 1, 0, "");
            continue;
          }
          switch (d.t) {
            case "n":
              var T = d.w;
              !T && d.v != null && (T = d.v), T == null ? d.f && !d.F ? s(l, 1, 0, "=" + d.f) : s(l, 1, 0, "") : s(l, 0, T, "V");
              break;
            case "b":
              s(l, 0, d.v ? 1 : 0, d.v ? "TRUE" : "FALSE");
              break;
            case "s":
              s(l, 1, 0, isNaN(d.v) ? d.v : '="' + d.v + '"');
              break;
            case "d":
              d.w || (d.w = lt(d.z || Ge[14], Ar(Tr(d.v)))), s(l, 0, d.w, "V");
              break;
            default:
              s(l, 1, 0, "");
          }
        }
      }
      s(l, -1, 0, "EOD");
      var D = `\r
`, k = l.join(D);
      return k;
    };
  }();
  return {
    to_workbook: n,
    to_sheet: r,
    from_sheet: a
  };
}(), Ri = /* @__PURE__ */ function() {
  function e(d) {
    return d.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, `
`);
  }
  function t(d) {
    return d.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n");
  }
  function r(d, x) {
    for (var p = d.split(`
`), g = -1, h = -1, T = 0, D = []; T !== p.length; ++T) {
      var k = p[T].trim().split(":");
      if (k[0] === "cell") {
        var C = ar(k[1]);
        if (D.length <= C.r) for (g = D.length; g <= C.r; ++g) D[g] || (D[g] = []);
        switch (g = C.r, h = C.c, k[2]) {
          case "t":
            D[g][h] = e(k[3]);
            break;
          case "v":
            D[g][h] = +k[3];
            break;
          case "vtf":
            var U = k[k.length - 1];
          case "vtc":
            switch (k[3]) {
              case "nl":
                D[g][h] = !!+k[4];
                break;
              default:
                D[g][h] = +k[4];
                break;
            }
            k[2] == "vtf" && (D[g][h] = [D[g][h], U]);
        }
      }
    }
    return x && x.sheetRows && (D = D.slice(0, x.sheetRows)), D;
  }
  function n(d, x) {
    return Ht(r(d, x), x);
  }
  function a(d, x) {
    return _t(n(d, x), x);
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
    for (var x = [], p = [], g, h = "", T = Rr(d["!ref"]), D = Array.isArray(d), k = T.s.r; k <= T.e.r; ++k)
      for (var C = T.s.c; C <= T.e.c; ++C)
        if (h = Ne({ r: k, c: C }), g = D ? (d[k] || [])[C] : d[h], !(!g || g.v == null || g.t === "z")) {
          switch (p = ["cell", h, "t"], g.t) {
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
              var U = Ar(Tr(g.v));
              p[2] = "vtc", p[3] = "nd", p[4] = "" + U, p[5] = g.w || lt(g.z || Ge[14], U);
              break;
            case "e":
              continue;
          }
          x.push(p.join(":"));
        }
    return x.push("sheet:c:" + (T.e.c - T.s.c + 1) + ":r:" + (T.e.r - T.s.r + 1) + ":tvf:1"), x.push("valueformat:1:text-wiki"), x.join(`
`);
  }
  function u(d) {
    return [i, s, f, s, l(d), o].join(`
`);
  }
  return {
    to_workbook: a,
    to_sheet: n,
    from_sheet: u
  };
}(), kl = /* @__PURE__ */ function() {
  function e(u, d, x, p, g) {
    g.raw ? d[x][p] = u : u === "" || (u === "TRUE" ? d[x][p] = !0 : u === "FALSE" ? d[x][p] = !1 : isNaN(Qr(u)) ? isNaN(hn(u).getDate()) ? d[x][p] = u : d[x][p] = Tr(u) : d[x][p] = Qr(u));
  }
  function t(u, d) {
    var x = d || {}, p = [];
    if (!u || u.length === 0) return p;
    for (var g = u.split(/[\r\n]/), h = g.length - 1; h >= 0 && g[h].length === 0; ) --h;
    for (var T = 10, D = 0, k = 0; k <= h; ++k)
      D = g[k].indexOf(" "), D == -1 ? D = g[k].length : D++, T = Math.max(T, D);
    for (k = 0; k <= h; ++k) {
      p[k] = [];
      var C = 0;
      for (e(g[k].slice(0, T).trim(), p, k, C, x), C = 1; C <= (g[k].length - T) / 10 + 1; ++C)
        e(g[k].slice(T + (C - 1) * 10, T + C * 10).trim(), p, k, C, x);
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
  function a(u) {
    for (var d = {}, x = !1, p = 0, g = 0; p < u.length; ++p)
      (g = u.charCodeAt(p)) == 34 ? x = !x : !x && g in r && (d[g] = (d[g] || 0) + 1);
    g = [];
    for (p in d) Object.prototype.hasOwnProperty.call(d, p) && g.push([d[p], p]);
    if (!g.length) {
      d = n;
      for (p in d) Object.prototype.hasOwnProperty.call(d, p) && g.push([d[p], p]);
    }
    return g.sort(function(h, T) {
      return h[0] - T[0] || n[h[1]] - n[T[1]];
    }), r[g.pop()[1]] || 44;
  }
  function i(u, d) {
    var x = d || {}, p = "", g = x.dense ? [] : {}, h = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    u.slice(0, 4) == "sep=" ? u.charCodeAt(5) == 13 && u.charCodeAt(6) == 10 ? (p = u.charAt(4), u = u.slice(7)) : u.charCodeAt(5) == 13 || u.charCodeAt(5) == 10 ? (p = u.charAt(4), u = u.slice(6)) : p = a(u.slice(0, 1024)) : x && x.FS ? p = x.FS : p = a(u.slice(0, 1024));
    var T = 0, D = 0, k = 0, C = 0, U = 0, q = p.charCodeAt(0), te = !1, I = 0, V = u.charCodeAt(0);
    u = u.replace(/\r\n/mg, `
`);
    var b = x.dateNF != null ? zs(x.dateNF) : null;
    function j() {
      var Y = u.slice(C, U), J = {};
      if (Y.charAt(0) == '"' && Y.charAt(Y.length - 1) == '"' && (Y = Y.slice(1, -1).replace(/""/g, '"')), Y.length === 0) J.t = "z";
      else if (x.raw)
        J.t = "s", J.v = Y;
      else if (Y.trim().length === 0)
        J.t = "s", J.v = Y;
      else if (Y.charCodeAt(0) == 61)
        Y.charCodeAt(1) == 34 && Y.charCodeAt(Y.length - 1) == 34 ? (J.t = "s", J.v = Y.slice(2, -1).replace(/""/g, '"')) : Io(Y) ? (J.t = "n", J.f = Y.slice(1)) : (J.t = "s", J.v = Y);
      else if (Y == "TRUE")
        J.t = "b", J.v = !0;
      else if (Y == "FALSE")
        J.t = "b", J.v = !1;
      else if (!isNaN(k = Qr(Y)))
        J.t = "n", x.cellText !== !1 && (J.w = Y), J.v = k;
      else if (!isNaN(hn(Y).getDate()) || b && Y.match(b)) {
        J.z = x.dateNF || Ge[14];
        var ie = 0;
        b && Y.match(b) && (Y = $s(Y, x.dateNF, Y.match(b) || []), ie = 1), x.cellDates ? (J.t = "d", J.v = Tr(Y, ie)) : (J.t = "n", J.v = Ar(Tr(Y, ie))), x.cellText !== !1 && (J.w = lt(J.z, J.v instanceof Date ? Ar(J.v) : J.v)), x.cellNF || delete J.z;
      } else
        J.t = "s", J.v = Y;
      if (J.t == "z" || (x.dense ? (g[T] || (g[T] = []), g[T][D] = J) : g[Ne({ c: D, r: T })] = J), C = U + 1, V = u.charCodeAt(C), h.e.c < D && (h.e.c = D), h.e.r < T && (h.e.r = T), I == q) ++D;
      else if (D = 0, ++T, x.sheetRows && x.sheetRows <= T) return !0;
    }
    e: for (; U < u.length; ++U) switch (I = u.charCodeAt(U)) {
      case 34:
        V === 34 && (te = !te);
        break;
      case q:
      case 10:
      case 13:
        if (!te && j()) break e;
        break;
    }
    return U - C > 0 && j(), g["!ref"] = Je(h), g;
  }
  function s(u, d) {
    return !(d && d.PRN) || d.FS || u.slice(0, 4) == "sep=" || u.indexOf("	") >= 0 || u.indexOf(",") >= 0 || u.indexOf(";") >= 0 ? i(u, d) : Ht(t(u, d), d);
  }
  function f(u, d) {
    var x = "", p = d.type == "string" ? [0, 0, 0, 0] : Gh(u, d);
    switch (d.type) {
      case "base64":
        x = rt(u);
        break;
      case "binary":
        x = u;
        break;
      case "buffer":
        d.codepage == 65001 ? x = u.toString("utf8") : d.codepage && typeof Vn < "u" || (x = Ie && Buffer.isBuffer(u) ? u.toString("binary") : mn(u));
        break;
      case "array":
        x = aa(u);
        break;
      case "string":
        x = u;
        break;
      default:
        throw new Error("Unrecognized type " + d.type);
    }
    return p[0] == 239 && p[1] == 187 && p[2] == 191 ? x = an(x.slice(3)) : d.type != "string" && d.type != "buffer" && d.codepage == 65001 ? x = an(x) : d.type == "binary" && typeof Vn < "u", x.slice(0, 19) == "socialcalc:version:" ? Ri.to_sheet(d.type == "string" ? x : an(x), d) : s(x, d);
  }
  function o(u, d) {
    return _t(f(u, d), d);
  }
  function l(u) {
    for (var d = [], x = Be(u["!ref"]), p, g = Array.isArray(u), h = x.s.r; h <= x.e.r; ++h) {
      for (var T = [], D = x.s.c; D <= x.e.c; ++D) {
        var k = Ne({ r: h, c: D });
        if (p = g ? (u[h] || [])[D] : u[k], !p || p.v == null) {
          T.push("          ");
          continue;
        }
        for (var C = (p.w || (tt(p), p.w) || "").slice(0, 10); C.length < 10; ) C += " ";
        T.push(C + (D === 0 ? " " : ""));
      }
      d.push(T.join(""));
    }
    return d.join(`
`);
  }
  return {
    to_workbook: o,
    to_sheet: f,
    from_sheet: l
  };
}(), S0 = /* @__PURE__ */ function() {
  function e(A, M, F) {
    if (A) {
      Ir(A, A.l || 0);
      for (var y = F.Enum || Er; A.l < A.length; ) {
        var X = A.read_shift(2), he = y[X] || y[65535], xe = A.read_shift(2), oe = A.l + xe, ne = he.f && he.f(A, xe, F);
        if (A.l = oe, M(ne, he, X)) return;
      }
    }
  }
  function t(A, M) {
    switch (M.type) {
      case "base64":
        return r(Wr(rt(A)), M);
      case "binary":
        return r(Wr(A), M);
      case "buffer":
      case "array":
        return r(A, M);
    }
    throw "Unsupported type " + M.type;
  }
  function r(A, M) {
    if (!A) return A;
    var F = M || {}, y = F.dense ? [] : {}, X = "Sheet1", he = "", xe = 0, oe = {}, ne = [], Ce = [], me = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, ze = F.sheetRows || 0;
    if (A[2] == 0 && (A[3] == 8 || A[3] == 9) && A.length >= 16 && A[14] == 5 && A[15] === 108)
      throw new Error("Unsupported Works 3 for Mac file");
    if (A[2] == 2)
      F.Enum = Er, e(A, function(le, er, Cr) {
        switch (Cr) {
          case 0:
            F.vers = le, le >= 4096 && (F.qpro = !0);
            break;
          case 6:
            me = le;
            break;
          case 204:
            le && (he = le);
            break;
          case 222:
            he = le;
            break;
          case 15:
          case 51:
            F.qpro || (le[1].v = le[1].v.slice(1));
          case 13:
          case 14:
          case 16:
            Cr == 14 && (le[2] & 112) == 112 && (le[2] & 15) > 1 && (le[2] & 15) < 15 && (le[1].z = F.dateNF || Ge[14], F.cellDates && (le[1].t = "d", le[1].v = Y0(le[1].v))), F.qpro && le[3] > xe && (y["!ref"] = Je(me), oe[X] = y, ne.push(X), y = F.dense ? [] : {}, me = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, xe = le[3], X = he || "Sheet" + (xe + 1), he = "");
            var Pe = F.dense ? (y[le[0].r] || [])[le[0].c] : y[Ne(le[0])];
            if (Pe) {
              Pe.t = le[1].t, Pe.v = le[1].v, le[1].z != null && (Pe.z = le[1].z), le[1].f != null && (Pe.f = le[1].f);
              break;
            }
            F.dense ? (y[le[0].r] || (y[le[0].r] = []), y[le[0].r][le[0].c] = le[1]) : y[Ne(le[0])] = le[1];
            break;
        }
      }, F);
    else if (A[2] == 26 || A[2] == 14)
      F.Enum = pr, A[2] == 14 && (F.qpro = !0, A.l = 0), e(A, function(le, er, Cr) {
        switch (Cr) {
          case 204:
            X = le;
            break;
          case 22:
            le[1].v = le[1].v.slice(1);
          case 23:
          case 24:
          case 25:
          case 37:
          case 39:
          case 40:
            if (le[3] > xe && (y["!ref"] = Je(me), oe[X] = y, ne.push(X), y = F.dense ? [] : {}, me = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, xe = le[3], X = "Sheet" + (xe + 1)), ze > 0 && le[0].r >= ze) break;
            F.dense ? (y[le[0].r] || (y[le[0].r] = []), y[le[0].r][le[0].c] = le[1]) : y[Ne(le[0])] = le[1], me.e.c < le[0].c && (me.e.c = le[0].c), me.e.r < le[0].r && (me.e.r = le[0].r);
            break;
          case 27:
            le[14e3] && (Ce[le[14e3][0]] = le[14e3][1]);
            break;
          case 1537:
            Ce[le[0]] = le[1], le[0] == xe && (X = le[1]);
            break;
        }
      }, F);
    else throw new Error("Unrecognized LOTUS BOF " + A[2]);
    if (y["!ref"] = Je(me), oe[he || X] = y, ne.push(he || X), !Ce.length) return { SheetNames: ne, Sheets: oe };
    for (var Se = {}, Nr = [], Ue = 0; Ue < Ce.length; ++Ue) oe[ne[Ue]] ? (Nr.push(Ce[Ue] || ne[Ue]), Se[Ce[Ue]] = oe[Ce[Ue]] || oe[ne[Ue]]) : (Nr.push(Ce[Ue]), Se[Ce[Ue]] = { "!ref": "A1" });
    return { SheetNames: Nr, Sheets: Se };
  }
  function n(A, M) {
    var F = M || {};
    if (+F.codepage >= 0 && un(+F.codepage), F.type == "string") throw new Error("Cannot write WK1 to JS string");
    var y = Sr(), X = Be(A["!ref"]), he = Array.isArray(A), xe = [];
    re(y, 0, i(1030)), re(y, 6, o(X));
    for (var oe = Math.min(X.e.r, 8191), ne = X.s.r; ne <= oe; ++ne)
      for (var Ce = ur(ne), me = X.s.c; me <= X.e.c; ++me) {
        ne === X.s.r && (xe[me] = xr(me));
        var ze = xe[me] + Ce, Se = he ? (A[ne] || [])[me] : A[ze];
        if (!(!Se || Se.t == "z"))
          if (Se.t == "n")
            (Se.v | 0) == Se.v && Se.v >= -32768 && Se.v <= 32767 ? re(y, 13, p(ne, me, Se.v)) : re(y, 14, h(ne, me, Se.v));
          else {
            var Nr = tt(Se);
            re(y, 15, d(ne, me, Nr.slice(0, 239)));
          }
      }
    return re(y, 1), y.end();
  }
  function a(A, M) {
    var F = M || {};
    if (+F.codepage >= 0 && un(+F.codepage), F.type == "string") throw new Error("Cannot write WK3 to JS string");
    var y = Sr();
    re(y, 0, s(A));
    for (var X = 0, he = 0; X < A.SheetNames.length; ++X) (A.Sheets[A.SheetNames[X]] || {})["!ref"] && re(y, 27, Xe(A.SheetNames[X], he++));
    var xe = 0;
    for (X = 0; X < A.SheetNames.length; ++X) {
      var oe = A.Sheets[A.SheetNames[X]];
      if (!(!oe || !oe["!ref"])) {
        for (var ne = Be(oe["!ref"]), Ce = Array.isArray(oe), me = [], ze = Math.min(ne.e.r, 8191), Se = ne.s.r; Se <= ze; ++Se)
          for (var Nr = ur(Se), Ue = ne.s.c; Ue <= ne.e.c; ++Ue) {
            Se === ne.s.r && (me[Ue] = xr(Ue));
            var le = me[Ue] + Nr, er = Ce ? (oe[Se] || [])[Ue] : oe[le];
            if (!(!er || er.t == "z"))
              if (er.t == "n")
                re(y, 23, j(Se, Ue, xe, er.v));
              else {
                var Cr = tt(er);
                re(y, 22, I(Se, Ue, xe, Cr.slice(0, 239)));
              }
          }
        ++xe;
      }
    }
    return re(y, 1), y.end();
  }
  function i(A) {
    var M = W(2);
    return M.write_shift(2, A), M;
  }
  function s(A) {
    var M = W(26);
    M.write_shift(2, 4096), M.write_shift(2, 4), M.write_shift(4, 0);
    for (var F = 0, y = 0, X = 0, he = 0; he < A.SheetNames.length; ++he) {
      var xe = A.SheetNames[he], oe = A.Sheets[xe];
      if (!(!oe || !oe["!ref"])) {
        ++X;
        var ne = Rr(oe["!ref"]);
        F < ne.e.r && (F = ne.e.r), y < ne.e.c && (y = ne.e.c);
      }
    }
    return F > 8191 && (F = 8191), M.write_shift(2, F), M.write_shift(1, X), M.write_shift(1, y), M.write_shift(2, 0), M.write_shift(2, 0), M.write_shift(1, 1), M.write_shift(1, 2), M.write_shift(4, 0), M.write_shift(4, 0), M;
  }
  function f(A, M, F) {
    var y = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    return M == 8 && F.qpro ? (y.s.c = A.read_shift(1), A.l++, y.s.r = A.read_shift(2), y.e.c = A.read_shift(1), A.l++, y.e.r = A.read_shift(2), y) : (y.s.c = A.read_shift(2), y.s.r = A.read_shift(2), M == 12 && F.qpro && (A.l += 2), y.e.c = A.read_shift(2), y.e.r = A.read_shift(2), M == 12 && F.qpro && (A.l += 2), y.s.c == 65535 && (y.s.c = y.e.c = y.s.r = y.e.r = 0), y);
  }
  function o(A) {
    var M = W(8);
    return M.write_shift(2, A.s.c), M.write_shift(2, A.s.r), M.write_shift(2, A.e.c), M.write_shift(2, A.e.r), M;
  }
  function l(A, M, F) {
    var y = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0, 0];
    return F.qpro && F.vers != 20768 ? (y[0].c = A.read_shift(1), y[3] = A.read_shift(1), y[0].r = A.read_shift(2), A.l += 2) : (y[2] = A.read_shift(1), y[0].c = A.read_shift(2), y[0].r = A.read_shift(2)), y;
  }
  function u(A, M, F) {
    var y = A.l + M, X = l(A, M, F);
    if (X[1].t = "s", F.vers == 20768) {
      A.l++;
      var he = A.read_shift(1);
      return X[1].v = A.read_shift(he, "utf8"), X;
    }
    return F.qpro && A.l++, X[1].v = A.read_shift(y - A.l, "cstr"), X;
  }
  function d(A, M, F) {
    var y = W(7 + F.length);
    y.write_shift(1, 255), y.write_shift(2, M), y.write_shift(2, A), y.write_shift(1, 39);
    for (var X = 0; X < y.length; ++X) {
      var he = F.charCodeAt(X);
      y.write_shift(1, he >= 128 ? 95 : he);
    }
    return y.write_shift(1, 0), y;
  }
  function x(A, M, F) {
    var y = l(A, M, F);
    return y[1].v = A.read_shift(2, "i"), y;
  }
  function p(A, M, F) {
    var y = W(7);
    return y.write_shift(1, 255), y.write_shift(2, M), y.write_shift(2, A), y.write_shift(2, F, "i"), y;
  }
  function g(A, M, F) {
    var y = l(A, M, F);
    return y[1].v = A.read_shift(8, "f"), y;
  }
  function h(A, M, F) {
    var y = W(13);
    return y.write_shift(1, 255), y.write_shift(2, M), y.write_shift(2, A), y.write_shift(8, F, "f"), y;
  }
  function T(A, M, F) {
    var y = A.l + M, X = l(A, M, F);
    if (X[1].v = A.read_shift(8, "f"), F.qpro) A.l = y;
    else {
      var he = A.read_shift(2);
      U(A.slice(A.l, A.l + he), X), A.l += he;
    }
    return X;
  }
  function D(A, M, F) {
    var y = M & 32768;
    return M &= -32769, M = (y ? A : 0) + (M >= 8192 ? M - 16384 : M), (y ? "" : "$") + (F ? xr(M) : ur(M));
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
  function U(A, M) {
    Ir(A, 0);
    for (var F = [], y = 0, X = "", he = "", xe = "", oe = ""; A.l < A.length; ) {
      var ne = A[A.l++];
      switch (ne) {
        case 0:
          F.push(A.read_shift(8, "f"));
          break;
        case 1:
          he = D(M[0].c, A.read_shift(2), !0), X = D(M[0].r, A.read_shift(2), !1), F.push(he + X);
          break;
        case 2:
          {
            var Ce = D(M[0].c, A.read_shift(2), !0), me = D(M[0].r, A.read_shift(2), !1);
            he = D(M[0].c, A.read_shift(2), !0), X = D(M[0].r, A.read_shift(2), !1), F.push(Ce + me + ":" + he + X);
          }
          break;
        case 3:
          if (A.l < A.length) {
            console.error("WK1 premature formula end");
            return;
          }
          break;
        case 4:
          F.push("(" + F.pop() + ")");
          break;
        case 5:
          F.push(A.read_shift(2));
          break;
        case 6:
          {
            for (var ze = ""; ne = A[A.l++]; ) ze += String.fromCharCode(ne);
            F.push('"' + ze.replace(/"/g, '""') + '"');
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
          oe = F.pop(), xe = F.pop(), F.push(["AND", "OR"][ne - 20] + "(" + xe + "," + oe + ")");
          break;
        default:
          if (ne < 32 && C[ne])
            oe = F.pop(), xe = F.pop(), F.push(xe + C[ne] + oe);
          else if (k[ne]) {
            if (y = k[ne][1], y == 69 && (y = A[A.l++]), y > F.length) {
              console.error("WK1 bad formula parse 0x" + ne.toString(16) + ":|" + F.join("|") + "|");
              return;
            }
            var Se = F.slice(-y);
            F.length -= y, F.push(k[ne][0] + "(" + Se.join(",") + ")");
          } else return ne <= 7 ? console.error("WK1 invalid opcode " + ne.toString(16)) : ne <= 24 ? console.error("WK1 unsupported op " + ne.toString(16)) : ne <= 30 ? console.error("WK1 invalid opcode " + ne.toString(16)) : ne <= 115 ? console.error("WK1 unsupported function opcode " + ne.toString(16)) : console.error("WK1 unrecognized opcode " + ne.toString(16));
      }
    }
    F.length == 1 ? M[1].f = "" + F[0] : console.error("WK1 bad formula parse |" + F.join("|") + "|");
  }
  function q(A) {
    var M = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0];
    return M[0].r = A.read_shift(2), M[3] = A[A.l++], M[0].c = A[A.l++], M;
  }
  function te(A, M) {
    var F = q(A);
    return F[1].t = "s", F[1].v = A.read_shift(M - 4, "cstr"), F;
  }
  function I(A, M, F, y) {
    var X = W(6 + y.length);
    X.write_shift(2, A), X.write_shift(1, F), X.write_shift(1, M), X.write_shift(1, 39);
    for (var he = 0; he < y.length; ++he) {
      var xe = y.charCodeAt(he);
      X.write_shift(1, xe >= 128 ? 95 : xe);
    }
    return X.write_shift(1, 0), X;
  }
  function V(A, M) {
    var F = q(A);
    F[1].v = A.read_shift(2);
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
  function b(A, M) {
    var F = q(A), y = A.read_shift(4), X = A.read_shift(4), he = A.read_shift(2);
    if (he == 65535)
      return y === 0 && X === 3221225472 ? (F[1].t = "e", F[1].v = 15) : y === 0 && X === 3489660928 ? (F[1].t = "e", F[1].v = 42) : F[1].v = 0, F;
    var xe = he & 32768;
    return he = (he & 32767) - 16446, F[1].v = (1 - xe * 2) * (X * Math.pow(2, he + 32) + y * Math.pow(2, he)), F;
  }
  function j(A, M, F, y) {
    var X = W(14);
    if (X.write_shift(2, A), X.write_shift(1, F), X.write_shift(1, M), y == 0)
      return X.write_shift(4, 0), X.write_shift(4, 0), X.write_shift(2, 65535), X;
    var he = 0, xe = 0, oe = 0, ne = 0;
    return y < 0 && (he = 1, y = -y), xe = Math.log2(y) | 0, y /= Math.pow(2, xe - 31), ne = y >>> 0, ne & 2147483648 || (y /= 2, ++xe, ne = y >>> 0), y -= ne, ne |= 2147483648, ne >>>= 0, y *= Math.pow(2, 32), oe = y >>> 0, X.write_shift(4, oe), X.write_shift(4, ne), xe += 16383 + (he ? 32768 : 0), X.write_shift(2, xe), X;
  }
  function Y(A, M) {
    var F = b(A);
    return A.l += M - 14, F;
  }
  function J(A, M) {
    var F = q(A), y = A.read_shift(4);
    return F[1].v = y >> 6, F;
  }
  function ie(A, M) {
    var F = q(A), y = A.read_shift(8, "f");
    return F[1].v = y, F;
  }
  function ye(A, M) {
    var F = ie(A);
    return A.l += M - 10, F;
  }
  function de(A, M) {
    return A[A.l + M - 1] == 0 ? A.read_shift(M, "cstr") : "";
  }
  function ve(A, M) {
    var F = A[A.l++];
    F > M - 1 && (F = M - 1);
    for (var y = ""; y.length < F; ) y += String.fromCharCode(A[A.l++]);
    return y;
  }
  function be(A, M, F) {
    if (!(!F.qpro || M < 21)) {
      var y = A.read_shift(1);
      A.l += 17, A.l += 1, A.l += 2;
      var X = A.read_shift(M - 21, "cstr");
      return [y, X];
    }
  }
  function yr(A, M) {
    for (var F = {}, y = A.l + M; A.l < y; ) {
      var X = A.read_shift(2);
      if (X == 14e3) {
        for (F[X] = [0, ""], F[X][0] = A.read_shift(2); A[A.l]; )
          F[X][1] += String.fromCharCode(A[A.l]), A.l++;
        A.l++;
      }
    }
    return F;
  }
  function Xe(A, M) {
    var F = W(5 + A.length);
    F.write_shift(2, 14e3), F.write_shift(2, M);
    for (var y = 0; y < A.length; ++y) {
      var X = A.charCodeAt(y);
      F[F.l++] = X > 127 ? 95 : X;
    }
    return F[F.l++] = 0, F;
  }
  var Er = {
    /*::[*/
    0: { n: "BOF", f: Ci },
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
    15: { n: "LABEL", f: u },
    /*::[*/
    16: { n: "FORMULA", f: T },
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
    51: { n: "STRING", f: u },
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
    222: { n: "SHEETNAMELP", f: ve },
    /*::[*/
    65535: { n: "" }
  }, pr = {
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
    22: { n: "LABEL16", f: te },
    /*::[*/
    23: { n: "NUMBER17", f: b },
    /*::[*/
    24: { n: "NUMBER18", f: V },
    /*::[*/
    25: { n: "FORMULA19", f: Y },
    /*::[*/
    26: { n: "FORMULA1A" },
    /*::[*/
    27: { n: "XFORMAT", f: yr },
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
    39: { n: "NUMBER27", f: ie },
    /*::[*/
    40: { n: "FORMULA28", f: ye },
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
    1537: { n: "SHEETINFOQP", f: be },
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
}(), Dl = /^\s|\s$|[\t\n\r]/;
function Ni(e, t) {
  if (!t.bookSST) return "";
  var r = [Ze];
  r[r.length] = ee("sst", null, {
    xmlns: Wt[0],
    count: e.Count,
    uniqueCount: e.Unique
  });
  for (var n = 0; n != e.length; ++n)
    if (e[n] != null) {
      var a = e[n], i = "<si>";
      a.r ? i += a.r : (i += "<t", a.t || (a.t = ""), a.t.match(Dl) && (i += ' xml:space="preserve"'), i += ">" + Re(a.t) + "</t>"), i += "</si>", r[r.length] = i;
    }
  return r.length > 2 && (r[r.length] = "</sst>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Rl(e) {
  return [e.read_shift(4), e.read_shift(4)];
}
function Nl(e, t) {
  return t || (t = W(8)), t.write_shift(4, e.Count), t.write_shift(4, e.Unique), t;
}
var Pl = Af;
function Ll(e) {
  var t = Sr();
  z(t, 159, Nl(e));
  for (var r = 0; r < e.length; ++r) z(t, 19, Pl(e[r]));
  return z(
    t,
    160
    /* BrtEndSst */
  ), t.end();
}
function Ml(e) {
  for (var t = [], r = e.split(""), n = 0; n < r.length; ++n) t[n] = r[n].charCodeAt(0);
  return t;
}
function Pi(e) {
  var t = 0, r, n = Ml(e), a = n.length + 1, i, s, f, o, l;
  for (r = vt(a), r[0] = n.length, i = 1; i != a; ++i) r[i] = n[i - 1];
  for (i = a - 1; i >= 0; --i)
    s = r[i], f = t & 16384 ? 1 : 0, o = t << 1 & 32767, l = f | o, t = l ^ s;
  return t ^ 52811;
}
var Bl = /* @__PURE__ */ function() {
  function e(a, i) {
    switch (i.type) {
      case "base64":
        return t(rt(a), i);
      case "binary":
        return t(a, i);
      case "buffer":
        return t(Ie && Buffer.isBuffer(a) ? a.toString("binary") : mn(a), i);
      case "array":
        return t(aa(a), i);
    }
    throw new Error("Unrecognized type " + i.type);
  }
  function t(a, i) {
    var s = i || {}, f = s.dense ? [] : {}, o = a.match(/\\trowd.*?\\row\b/g);
    if (!o.length) throw new Error("RTF missing table");
    var l = { s: { c: 0, r: 0 }, e: { c: 0, r: o.length - 1 } };
    return o.forEach(function(u, d) {
      Array.isArray(f) && (f[d] = []);
      for (var x = /\\\w+\b/g, p = 0, g, h = -1; g = x.exec(u); ) {
        switch (g[0]) {
          case "\\cell":
            var T = u.slice(p, x.lastIndex - g[0].length);
            if (T[0] == " " && (T = T.slice(1)), ++h, T.length) {
              var D = { v: T, t: "s" };
              Array.isArray(f) ? f[d][h] = D : f[Ne({ r: d, c: h })] = D;
            }
            break;
        }
        p = x.lastIndex;
      }
      h > l.e.c && (l.e.c = h);
    }), f["!ref"] = Je(l), f;
  }
  function r(a, i) {
    return _t(e(a, i), i);
  }
  function n(a) {
    for (var i = ["{\\rtf1\\ansi"], s = Be(a["!ref"]), f, o = Array.isArray(a), l = s.s.r; l <= s.e.r; ++l) {
      i.push("\\trowd\\trautofit1");
      for (var u = s.s.c; u <= s.e.c; ++u) i.push("\\cellx" + (u + 1));
      for (i.push("\\pard\\intbl"), u = s.s.c; u <= s.e.c; ++u) {
        var d = Ne({ r: l, c: u });
        f = o ? (a[l] || [])[u] : a[d], !(!f || f.v == null && (!f.f || f.F)) && (i.push(" " + (f.w || (tt(f), f.w))), i.push("\\cell"));
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
function A0(e) {
  for (var t = 0, r = 1; t != 3; ++t) r = r * 256 + (e[t] > 255 ? 255 : e[t] < 0 ? 0 : e[t]);
  return r.toString(16).toUpperCase().slice(1);
}
var bl = 6, et = bl;
function Yn(e) {
  return Math.floor((e + Math.round(128 / et) / 256) * et);
}
function Jn(e) {
  return Math.floor((e - 5) / et * 100 + 0.5) / 100;
}
function wa(e) {
  return Math.round((e * et + 5) / et * 256) / 256;
}
function ba(e) {
  e.width ? (e.wpx = Yn(e.width), e.wch = Jn(e.wpx), e.MDW = et) : e.wpx ? (e.wch = Jn(e.wpx), e.width = wa(e.wch), e.MDW = et) : typeof e.wch == "number" && (e.width = wa(e.wch), e.wpx = Yn(e.width), e.MDW = et), e.customWidth && delete e.customWidth;
}
var Ul = 96, Li = Ul;
function Zn(e) {
  return e * 96 / Li;
}
function Mi(e) {
  return e * Li / 96;
}
function Vl(e) {
  var t = ["<numFmts>"];
  return [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(r) {
    for (var n = r[0]; n <= r[1]; ++n) e[n] != null && (t[t.length] = ee("numFmt", null, { numFmtId: n, formatCode: Re(e[n]) }));
  }), t.length === 1 ? "" : (t[t.length] = "</numFmts>", t[0] = ee("numFmts", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
function Wl(e) {
  var t = [];
  return t[t.length] = ee("cellXfs", null), e.forEach(function(r) {
    t[t.length] = ee("xf", null, r);
  }), t[t.length] = "</cellXfs>", t.length === 2 ? "" : (t[0] = ee("cellXfs", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
function Bi(e, t) {
  var r = [Ze, ee("styleSheet", null, {
    xmlns: Wt[0],
    "xmlns:vt": nr.vt
  })], n;
  return e.SSF && (n = Vl(e.SSF)) != null && (r[r.length] = n), r[r.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>', r[r.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>', r[r.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>', r[r.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>', (n = Wl(t.cellXfs)) && (r[r.length] = n), r[r.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>', r[r.length] = '<dxfs count="0"/>', r[r.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>', r.length > 2 && (r[r.length] = "</styleSheet>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Hl(e, t) {
  var r = e.read_shift(2), n = dr(e);
  return [r, n];
}
function Gl(e, t, r) {
  r || (r = W(6 + 4 * t.length)), r.write_shift(2, e), ir(t, r);
  var n = r.length > r.l ? r.slice(0, r.l) : r;
  return r.l == null && (r.l = r.length), n;
}
function Xl(e, t, r) {
  var n = {};
  n.sz = e.read_shift(2) / 20;
  var a = Df(e);
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
  switch (o > 0 && (n.charset = o), e.l++, n.color = kf(e), e.read_shift(1)) {
    case 1:
      n.scheme = "major";
      break;
    case 2:
      n.scheme = "minor";
      break;
  }
  return n.name = dr(e), n;
}
function zl(e, t) {
  t || (t = W(25 + 4 * 32)), t.write_shift(2, e.sz * 20), Rf(e, t), t.write_shift(2, e.bold ? 700 : 400);
  var r = 0;
  e.vertAlign == "superscript" ? r = 1 : e.vertAlign == "subscript" && (r = 2), t.write_shift(2, r), t.write_shift(1, e.underline || 0), t.write_shift(1, e.family || 0), t.write_shift(1, e.charset || 0), t.write_shift(1, 0), jn(e.color, t);
  var n = 0;
  return n = 2, t.write_shift(1, n), ir(e.name, t), t.length > t.l ? t.slice(0, t.l) : t;
}
var $l = [
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
], pa, jl = jr;
function F0(e, t) {
  t || (t = W(4 * 3 + 8 * 7 + 16 * 1)), pa || (pa = ya($l));
  var r = pa[e.patternType];
  r == null && (r = 40), t.write_shift(4, r);
  var n = 0;
  if (r != 40)
    for (jn({ auto: 1 }, t), jn({ auto: 1 }, t); n < 12; ++n) t.write_shift(4, 0);
  else {
    for (; n < 4; ++n) t.write_shift(4, 0);
    for (; n < 12; ++n) t.write_shift(4, 0);
  }
  return t.length > t.l ? t.slice(0, t.l) : t;
}
function Kl(e, t) {
  var r = e.l + t, n = e.read_shift(2), a = e.read_shift(2);
  return e.l = r, { ixfe: n, numFmtId: a };
}
function bi(e, t, r) {
  r || (r = W(16)), r.write_shift(2, t || 0), r.write_shift(2, e.numFmtId || 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(1, 0), r.write_shift(1, 0);
  var n = 0;
  return r.write_shift(1, n), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(1, 0), r;
}
function en(e, t) {
  return t || (t = W(10)), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var Yl = jr;
function Jl(e, t) {
  return t || (t = W(51)), t.write_shift(1, 0), en(null, t), en(null, t), en(null, t), en(null, t), en(null, t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Zl(e, t) {
  return t || (t = W(12 + 4 * 10)), t.write_shift(4, e.xfId), t.write_shift(2, 1), t.write_shift(1, 0), t.write_shift(1, 0), $n(e.name || "", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function ql(e, t, r) {
  var n = W(2052);
  return n.write_shift(4, e), $n(t, n), $n(r, n), n.length > n.l ? n.slice(0, n.l) : n;
}
function Ql(e, t) {
  if (t) {
    var r = 0;
    [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a) t[a] != null && ++r;
    }), r != 0 && (z(e, 615, Gr(r)), [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a) t[a] != null && z(e, 44, Gl(a, t[a]));
    }), z(
      e,
      616
      /* BrtEndFmts */
    ));
  }
}
function eo(e) {
  var t = 1;
  z(e, 611, Gr(t)), z(e, 43, zl({
    sz: 12,
    color: { theme: 1 },
    name: "Calibri",
    family: 2
  })), z(
    e,
    612
    /* BrtEndFonts */
  );
}
function ro(e) {
  var t = 2;
  z(e, 603, Gr(t)), z(e, 45, F0({ patternType: "none" })), z(e, 45, F0({ patternType: "gray125" })), z(
    e,
    604
    /* BrtEndFills */
  );
}
function to(e) {
  var t = 1;
  z(e, 613, Gr(t)), z(e, 46, Jl()), z(
    e,
    614
    /* BrtEndBorders */
  );
}
function no(e) {
  var t = 1;
  z(e, 626, Gr(t)), z(e, 47, bi({
    numFmtId: 0
  }, 65535)), z(
    e,
    627
    /* BrtEndCellStyleXFs */
  );
}
function ao(e, t) {
  z(e, 617, Gr(t.length)), t.forEach(function(r) {
    z(e, 47, bi(r, 0));
  }), z(
    e,
    618
    /* BrtEndCellXFs */
  );
}
function io(e) {
  var t = 1;
  z(e, 619, Gr(t)), z(e, 48, Zl({
    xfId: 0,
    name: "Normal"
  })), z(
    e,
    620
    /* BrtEndStyles */
  );
}
function so(e) {
  var t = 0;
  z(e, 505, Gr(t)), z(
    e,
    506
    /* BrtEndDXFs */
  );
}
function fo(e) {
  var t = 0;
  z(e, 508, ql(t, "TableStyleMedium9", "PivotStyleMedium4")), z(
    e,
    509
    /* BrtEndTableStyles */
  );
}
function lo(e, t) {
  var r = Sr();
  return z(
    r,
    278
    /* BrtBeginStyleSheet */
  ), Ql(r, e.SSF), eo(r), ro(r), to(r), no(r), ao(r, t.cellXfs), io(r), so(r), fo(r), z(
    r,
    279
    /* BrtEndStyleSheet */
  ), r.end();
}
function Ui(e, t) {
  if (t && t.themeXLSX) return t.themeXLSX;
  if (e && typeof e.raw == "string") return e.raw;
  var r = [Ze];
  return r[r.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">', r[r.length] = "<a:themeElements>", r[r.length] = '<a:clrScheme name="Office">', r[r.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>', r[r.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>', r[r.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>', r[r.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>', r[r.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>', r[r.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>', r[r.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>', r[r.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>', r[r.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>', r[r.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>', r[r.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>', r[r.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>', r[r.length] = "</a:clrScheme>", r[r.length] = '<a:fontScheme name="Office">', r[r.length] = "<a:majorFont>", r[r.length] = '<a:latin typeface="Cambria"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Hebr" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="MoolBoran"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:majorFont>", r[r.length] = "<a:minorFont>", r[r.length] = '<a:latin typeface="Calibri"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Arial"/>', r[r.length] = '<a:font script="Hebr" typeface="Arial"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="DaunPenh"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Arial"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:minorFont>", r[r.length] = "</a:fontScheme>", r[r.length] = '<a:fmtScheme name="Office">', r[r.length] = "<a:fillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="1"/>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="0"/>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:fillStyleLst>", r[r.length] = "<a:lnStyleLst>", r[r.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = "</a:lnStyleLst>", r[r.length] = "<a:effectStyleLst>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>', r[r.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>', r[r.length] = "</a:effectStyle>", r[r.length] = "</a:effectStyleLst>", r[r.length] = "<a:bgFillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:bgFillStyleLst>", r[r.length] = "</a:fmtScheme>", r[r.length] = "</a:themeElements>", r[r.length] = "<a:objectDefaults>", r[r.length] = "<a:spDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>', r[r.length] = "</a:spDef>", r[r.length] = "<a:lnDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>', r[r.length] = "</a:lnDef>", r[r.length] = "</a:objectDefaults>", r[r.length] = "<a:extraClrSchemeLst/>", r[r.length] = "</a:theme>", r.join("");
}
function oo(e, t) {
  return {
    flags: e.read_shift(4),
    version: e.read_shift(4),
    name: dr(e)
  };
}
function uo(e) {
  var t = W(12 + 2 * e.name.length);
  return t.write_shift(4, e.flags), t.write_shift(4, e.version), ir(e.name, t), t.slice(0, t.l);
}
function co(e) {
  for (var t = [], r = e.read_shift(4); r-- > 0; )
    t.push([e.read_shift(4), e.read_shift(4)]);
  return t;
}
function ho(e) {
  var t = W(4 + 8 * e.length);
  t.write_shift(4, e.length);
  for (var r = 0; r < e.length; ++r)
    t.write_shift(4, e[r][0]), t.write_shift(4, e[r][1]);
  return t;
}
function xo(e, t) {
  var r = W(8 + 2 * t.length);
  return r.write_shift(4, e), ir(t, r), r.slice(0, r.l);
}
function po(e) {
  return e.l += 4, e.read_shift(4) != 0;
}
function vo(e, t) {
  var r = W(8);
  return r.write_shift(4, e), r.write_shift(4, 1), r;
}
function mo() {
  var e = Sr();
  return z(e, 332), z(e, 334, Gr(1)), z(e, 335, uo({
    name: "XLDAPR",
    version: 12e4,
    flags: 3496657072
  })), z(e, 336), z(e, 339, xo(1, "XLDAPR")), z(e, 52), z(e, 35, Gr(514)), z(e, 4096, Gr(0)), z(e, 4097, Br(1)), z(e, 36), z(e, 53), z(e, 340), z(e, 337, vo(1)), z(e, 51, ho([[1, 0]])), z(e, 338), z(e, 333), e.end();
}
function Vi() {
  var e = [Ze];
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
function go(e) {
  var t = {};
  t.i = e.read_shift(4);
  var r = {};
  r.r = e.read_shift(4), r.c = e.read_shift(4), t.r = Ne(r);
  var n = e.read_shift(1);
  return n & 2 && (t.l = "1"), n & 8 && (t.a = "1"), t;
}
var Lt = 1024;
function Wi(e, t) {
  for (var r = [21600, 21600], n = ["m0,0l0", r[1], r[0], r[1], r[0], "0xe"].join(","), a = [
    ee("xml", null, { "xmlns:v": kr.v, "xmlns:o": kr.o, "xmlns:x": kr.x, "xmlns:mv": kr.mv }).replace(/\/>/, ">"),
    ee("o:shapelayout", ee("o:idmap", null, { "v:ext": "edit", data: e }), { "v:ext": "edit" }),
    ee("v:shapetype", [
      ee("v:stroke", null, { joinstyle: "miter" }),
      ee("v:path", null, { gradientshapeok: "t", "o:connecttype": "rect" })
    ].join(""), { id: "_x0000_t202", "o:spt": 202, coordsize: r.join(","), path: n })
  ]; Lt < e * 1e3; ) Lt += 1e3;
  return t.forEach(function(i) {
    var s = ar(i[0]), f = (
      /*::(*/
      { color2: "#BEFF82", type: "gradient" }
    );
    f.type == "gradient" && (f.angle = "-180");
    var o = f.type == "gradient" ? ee("o:fill", null, { type: "gradientUnscaled", "v:ext": "view" }) : null, l = ee("v:fill", o, f), u = { on: "t", obscured: "t" };
    ++Lt, a = a.concat([
      "<v:shape" + dn({
        id: "_x0000_s" + Lt,
        type: "#_x0000_t202",
        style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" + (i[1].hidden ? ";visibility:hidden" : ""),
        fillcolor: "#ECFAD4",
        strokecolor: "#edeaa1"
      }) + ">",
      l,
      ee("v:shadow", null, u),
      ee("v:path", null, { "o:connecttype": "none" }),
      '<v:textbox><div style="text-align:left"></div></v:textbox>',
      '<x:ClientData ObjectType="Note">',
      "<x:MoveWithCells/>",
      "<x:SizeWithCells/>",
      /* Part 4 19.4.2.3 Anchor (Anchor) */
      or("x:Anchor", [s.c + 1, 0, s.r + 1, 0, s.c + 3, 20, s.r + 5, 20].join(",")),
      or("x:AutoFill", "False"),
      or("x:Row", String(s.r)),
      or("x:Column", String(s.c)),
      i[1].hidden ? "" : "<x:Visible/>",
      "</x:ClientData>",
      "</v:shape>"
    ]);
  }), a.push("</xml>"), a.join("");
}
function Hi(e) {
  var t = [Ze, ee("comments", null, { xmlns: Wt[0] })], r = [];
  return t.push("<authors>"), e.forEach(function(n) {
    n[1].forEach(function(a) {
      var i = Re(a.a);
      r.indexOf(i) == -1 && (r.push(i), t.push("<author>" + i + "</author>")), a.T && a.ID && r.indexOf("tc=" + a.ID) == -1 && (r.push("tc=" + a.ID), t.push("<author>tc=" + a.ID + "</author>"));
    });
  }), r.length == 0 && (r.push("SheetJ5"), t.push("<author>SheetJ5</author>")), t.push("</authors>"), t.push("<commentList>"), e.forEach(function(n) {
    var a = 0, i = [];
    if (n[1][0] && n[1][0].T && n[1][0].ID ? a = r.indexOf("tc=" + n[1][0].ID) : n[1].forEach(function(o) {
      o.a && (a = r.indexOf(Re(o.a))), i.push(o.t || "");
    }), t.push('<comment ref="' + n[0] + '" authorId="' + a + '"><text>'), i.length <= 1) t.push(or("t", Re(i[0] || "")));
    else {
      for (var s = `Comment:
    ` + i[0] + `
`, f = 1; f < i.length; ++f) s += `Reply:
    ` + i[f] + `
`;
      t.push(or("t", Re(s)));
    }
    t.push("</text></comment>");
  }), t.push("</commentList>"), t.length > 2 && (t[t.length] = "</comments>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function _o(e, t, r) {
  var n = [Ze, ee("ThreadedComments", null, { xmlns: nr.TCMNT }).replace(/[\/]>/, ">")];
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
      f == 0 ? i = o.id : o.parentId = i, s.ID = o.id, s.a && (o.personId = "{54EE7950-7262-4200-6969-" + ("000000000000" + t.indexOf(s.a)).slice(-12) + "}"), n.push(ee("threadedComment", or("text", s.t || ""), o));
    });
  }), n.push("</ThreadedComments>"), n.join("");
}
function To(e) {
  var t = [Ze, ee("personList", null, {
    xmlns: nr.TCMNT,
    "xmlns:x": Wt[0]
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
function Eo(e) {
  var t = {};
  t.iauthor = e.read_shift(4);
  var r = St(e);
  return t.rfx = r.s, t.ref = Ne(r.s), e.l += 16, t;
}
function wo(e, t) {
  return t == null && (t = W(36)), t.write_shift(4, e[1].iauthor), Gt(e[0], t), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var So = dr;
function Ao(e) {
  return ir(e.slice(0, 54));
}
function Fo(e) {
  var t = Sr(), r = [];
  return z(
    t,
    628
    /* BrtBeginComments */
  ), z(
    t,
    630
    /* BrtBeginCommentAuthors */
  ), e.forEach(function(n) {
    n[1].forEach(function(a) {
      r.indexOf(a.a) > -1 || (r.push(a.a.slice(0, 54)), z(t, 632, Ao(a.a)));
    });
  }), z(
    t,
    631
    /* BrtEndCommentAuthors */
  ), z(
    t,
    633
    /* BrtBeginCommentList */
  ), e.forEach(function(n) {
    n[1].forEach(function(a) {
      a.iauthor = r.indexOf(a.a);
      var i = { s: ar(n[0]), e: ar(n[0]) };
      z(t, 635, wo([i, a])), a.t && a.t.length > 0 && z(t, 637, yf(a)), z(
        t,
        636
        /* BrtEndComment */
      ), delete a.iauthor;
    });
  }), z(
    t,
    634
    /* BrtEndCommentList */
  ), z(
    t,
    629
    /* BrtEndComments */
  ), t.end();
}
function yo(e, t) {
  t.FullPaths.forEach(function(r, n) {
    if (n != 0) {
      var a = r.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
      a.slice(-1) !== "/" && Le.utils.cfb_add(e, a, t.FileIndex[n].content);
    }
  });
}
var Gi = ["xlsb", "xlsm", "xlam", "biff8", "xla"], Co = /* @__PURE__ */ function() {
  var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g, t = { r: 0, c: 0 };
  function r(n, a, i, s) {
    var f = !1, o = !1;
    i.length == 0 ? o = !0 : i.charAt(0) == "[" && (o = !0, i = i.slice(1, -1)), s.length == 0 ? f = !0 : s.charAt(0) == "[" && (f = !0, s = s.slice(1, -1));
    var l = i.length > 0 ? parseInt(i, 10) | 0 : 0, u = s.length > 0 ? parseInt(s, 10) | 0 : 0;
    return f ? u += t.c : --u, o ? l += t.r : --l, a + (f ? "" : "$") + xr(u) + (o ? "" : "$") + ur(l);
  }
  return function(a, i) {
    return t = i, a.replace(e, r);
  };
}(), Ua = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g, Va = /* @__PURE__ */ function() {
  return function(t, r) {
    return t.replace(Ua, function(n, a, i, s, f, o) {
      var l = Na(s) - (i ? 0 : r.c), u = Ra(o) - (f ? 0 : r.r), d = u == 0 ? "" : f ? u + 1 : "[" + u + "]", x = l == 0 ? "" : i ? l + 1 : "[" + l + "]";
      return a + "R" + d + "C" + x;
    });
  };
}();
function Oo(e, t) {
  return e.replace(Ua, function(r, n, a, i, s, f) {
    return n + (a == "$" ? a + i : xr(Na(i) + t.c)) + (s == "$" ? s + f : ur(Ra(f) + t.r));
  });
}
function Io(e) {
  return e.length != 1;
}
function Ye(e) {
  e.l += 1;
}
function ot(e, t) {
  var r = e.read_shift(2);
  return [r & 16383, r >> 14 & 1, r >> 15 & 1];
}
function Xi(e, t, r) {
  var n = 2;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5) return zi(e);
    r.biff == 12 && (n = 4);
  }
  var a = e.read_shift(n), i = e.read_shift(n), s = ot(e), f = ot(e);
  return { s: { r: a, c: s[0], cRel: s[1], rRel: s[2] }, e: { r: i, c: f[0], cRel: f[1], rRel: f[2] } };
}
function zi(e) {
  var t = ot(e), r = ot(e), n = e.read_shift(1), a = e.read_shift(1);
  return { s: { r: t[0], c: n, cRel: t[1], rRel: t[2] }, e: { r: r[0], c: a, cRel: r[1], rRel: r[2] } };
}
function ko(e, t, r) {
  if (r.biff < 8) return zi(e);
  var n = e.read_shift(r.biff == 12 ? 4 : 2), a = e.read_shift(r.biff == 12 ? 4 : 2), i = ot(e), s = ot(e);
  return { s: { r: n, c: i[0], cRel: i[1], rRel: i[2] }, e: { r: a, c: s[0], cRel: s[1], rRel: s[2] } };
}
function $i(e, t, r) {
  if (r && r.biff >= 2 && r.biff <= 5) return Do(e);
  var n = e.read_shift(r && r.biff == 12 ? 4 : 2), a = ot(e);
  return { r: n, c: a[0], cRel: a[1], rRel: a[2] };
}
function Do(e) {
  var t = ot(e), r = e.read_shift(1);
  return { r: t[0], c: r, cRel: t[1], rRel: t[2] };
}
function Ro(e) {
  var t = e.read_shift(2), r = e.read_shift(2);
  return { r: t, c: r & 255, fQuoted: !!(r & 16384), cRel: r >> 15, rRel: r >> 15 };
}
function No(e, t, r) {
  var n = r && r.biff ? r.biff : 8;
  if (n >= 2 && n <= 5) return Po(e);
  var a = e.read_shift(n >= 12 ? 4 : 2), i = e.read_shift(2), s = (i & 16384) >> 14, f = (i & 32768) >> 15;
  if (i &= 16383, f == 1) for (; a > 524287; ) a -= 1048576;
  if (s == 1) for (; i > 8191; ) i = i - 16384;
  return { r: a, c: i, cRel: s, rRel: f };
}
function Po(e) {
  var t = e.read_shift(2), r = e.read_shift(1), n = (t & 32768) >> 15, a = (t & 16384) >> 14;
  return t &= 16383, n == 1 && t >= 8192 && (t = t - 16384), a == 1 && r >= 128 && (r = r - 256), { r: t, c: r, cRel: a, rRel: n };
}
function Lo(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = Xi(e, r.biff >= 2 && r.biff <= 5 ? 6 : 8, r);
  return [n, a];
}
function Mo(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = e.read_shift(2, "i"), i = 8;
  if (r) switch (r.biff) {
    case 5:
      e.l += 12, i = 6;
      break;
    case 12:
      i = 12;
      break;
  }
  var s = Xi(e, i, r);
  return [n, a, s];
}
function Bo(e, t, r) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += r && r.biff > 8 ? 12 : r.biff < 8 ? 6 : 8, [n];
}
function bo(e, t, r) {
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
function Uo(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = ko(e, t - 1, r);
  return [n, a];
}
function Vo(e, t, r) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += r.biff == 2 ? 6 : r.biff == 12 ? 14 : 7, [n];
}
function y0(e) {
  var t = e[e.l + 1] & 1, r = 1;
  return e.l += 4, [t, r];
}
function Wo(e, t, r) {
  e.l += 2;
  for (var n = e.read_shift(r && r.biff == 2 ? 1 : 2), a = [], i = 0; i <= n; ++i) a.push(e.read_shift(r && r.biff == 2 ? 1 : 2));
  return a;
}
function Ho(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function Go(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function Xo(e) {
  var t = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [t, e.read_shift(2)];
}
function zo(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += r && r.biff == 2 ? 3 : 4, [n];
}
function ji(e) {
  var t = e.read_shift(1), r = e.read_shift(1);
  return [t, r];
}
function $o(e) {
  return e.read_shift(2), ji(e);
}
function jo(e) {
  return e.read_shift(2), ji(e);
}
function Ko(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = $i(e, 0, r);
  return [n, a];
}
function Yo(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = No(e, 0, r);
  return [n, a];
}
function Jo(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(2);
  r && r.biff == 5 && (e.l += 12);
  var i = $i(e, 0, r);
  return [n, a, i];
}
function Zo(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(r && r.biff <= 3 ? 1 : 2);
  return [Zu[a], Ji[a], n];
}
function qo(e, t, r) {
  var n = e[e.l++], a = e.read_shift(1), i = r && r.biff <= 3 ? [n == 88 ? -1 : 0, e.read_shift(1)] : Qo(e);
  return [a, (i[0] === 0 ? Ji : Ju)[i[1]]];
}
function Qo(e) {
  return [e[e.l + 1] >> 7, e.read_shift(2) & 32767];
}
function eu(e, t, r) {
  e.l += r && r.biff == 2 ? 3 : 4;
}
function ru(e, t, r) {
  if (e.l++, r && r.biff == 12) return [e.read_shift(4, "i"), 0];
  var n = e.read_shift(2), a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function tu(e) {
  return e.l++, Tn[e.read_shift(1)];
}
function nu(e) {
  return e.l++, e.read_shift(2);
}
function au(e) {
  return e.l++, e.read_shift(1) !== 0;
}
function iu(e) {
  return e.l++, Xt(e);
}
function su(e, t, r) {
  return e.l++, Ii(e, t - 1, r);
}
function fu(e, t) {
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
      r[1] = Yf(e, 1) ? "TRUE" : "FALSE", t != 12 && (e.l += 7);
      break;
    case 37:
    case 16:
      r[1] = Tn[e[e.l]], e.l += t == 12 ? 4 : 8;
      break;
    case 0:
      e.l += 8;
      break;
    case 1:
      r[1] = Xt(e);
      break;
    case 2:
      r[1] = Qf(e, 0, { biff: t > 0 && t < 8 ? 2 : t });
      break;
    default:
      throw new Error("Bad SerAr: " + r[0]);
  }
  return r;
}
function lu(e, t, r) {
  for (var n = e.read_shift(r.biff == 12 ? 4 : 2), a = [], i = 0; i != n; ++i) a.push((r.biff == 12 ? St : tl)(e));
  return a;
}
function ou(e, t, r) {
  var n = 0, a = 0;
  r.biff == 12 ? (n = e.read_shift(4), a = e.read_shift(4)) : (a = 1 + e.read_shift(1), n = 1 + e.read_shift(2)), r.biff >= 2 && r.biff < 8 && (--n, --a == 0 && (a = 256));
  for (var i = 0, s = []; i != n && (s[i] = []); ++i)
    for (var f = 0; f != a; ++f) s[i][f] = fu(e, r.biff);
  return s;
}
function uu(e, t, r) {
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
function cu(e, t, r) {
  if (r.biff == 5) return hu(e);
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(2), i = e.read_shift(4);
  return [n, a, i];
}
function hu(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2, "i");
  e.l += 8;
  var n = e.read_shift(2);
  return e.l += 12, [t, r, n];
}
function xu(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3;
  e.l += r && r.biff == 2 ? 3 : 4;
  var a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function du(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function pu(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3;
  return e.l += 4, r.biff < 8 && e.l--, r.biff == 12 && (e.l += 2), [n];
}
function vu(e, t, r) {
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
var mu = jr, gu = jr, _u = jr;
function En(e, t, r) {
  return e.l += 2, [Ro(e)];
}
function Wa(e) {
  return e.l += 6, [];
}
var Tu = En, Eu = Wa, wu = Wa, Su = En;
function Ki(e) {
  return e.l += 2, [Ci(e), e.read_shift(2) & 1];
}
var Au = En, Fu = Ki, yu = Wa, Cu = En, Ou = En, Iu = [
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
function ku(e) {
  e.l += 2;
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(4), a = e.read_shift(2), i = e.read_shift(2), s = Iu[r >> 2 & 31];
  return { ixti: t, coltype: r & 3, rt: s, idx: n, c: a, C: i };
}
function Du(e) {
  return e.l += 2, [e.read_shift(4)];
}
function Ru(e, t, r) {
  return e.l += 5, e.l += 2, e.l += r.biff == 2 ? 1 : 4, ["PTGSHEET"];
}
function Nu(e, t, r) {
  return e.l += r.biff == 2 ? 4 : 5, ["PTGENDSHEET"];
}
function Pu(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function Lu(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function Mu(e) {
  return e.l += 4, [0, 0];
}
var C0 = {
  /*::[*/
  1: { n: "PtgExp", f: ru },
  /*::[*/
  2: { n: "PtgTbl", f: _u },
  /*::[*/
  3: { n: "PtgAdd", f: Ye },
  /*::[*/
  4: { n: "PtgSub", f: Ye },
  /*::[*/
  5: { n: "PtgMul", f: Ye },
  /*::[*/
  6: { n: "PtgDiv", f: Ye },
  /*::[*/
  7: { n: "PtgPower", f: Ye },
  /*::[*/
  8: { n: "PtgConcat", f: Ye },
  /*::[*/
  9: { n: "PtgLt", f: Ye },
  /*::[*/
  10: { n: "PtgLe", f: Ye },
  /*::[*/
  11: { n: "PtgEq", f: Ye },
  /*::[*/
  12: { n: "PtgGe", f: Ye },
  /*::[*/
  13: { n: "PtgGt", f: Ye },
  /*::[*/
  14: { n: "PtgNe", f: Ye },
  /*::[*/
  15: { n: "PtgIsect", f: Ye },
  /*::[*/
  16: { n: "PtgUnion", f: Ye },
  /*::[*/
  17: { n: "PtgRange", f: Ye },
  /*::[*/
  18: { n: "PtgUplus", f: Ye },
  /*::[*/
  19: { n: "PtgUminus", f: Ye },
  /*::[*/
  20: { n: "PtgPercent", f: Ye },
  /*::[*/
  21: { n: "PtgParen", f: Ye },
  /*::[*/
  22: { n: "PtgMissArg", f: Ye },
  /*::[*/
  23: { n: "PtgStr", f: su },
  /*::[*/
  26: { n: "PtgSheet", f: Ru },
  /*::[*/
  27: { n: "PtgEndSheet", f: Nu },
  /*::[*/
  28: { n: "PtgErr", f: tu },
  /*::[*/
  29: { n: "PtgBool", f: au },
  /*::[*/
  30: { n: "PtgInt", f: nu },
  /*::[*/
  31: { n: "PtgNum", f: iu },
  /*::[*/
  32: { n: "PtgArray", f: Vo },
  /*::[*/
  33: { n: "PtgFunc", f: Zo },
  /*::[*/
  34: { n: "PtgFuncVar", f: qo },
  /*::[*/
  35: { n: "PtgName", f: uu },
  /*::[*/
  36: { n: "PtgRef", f: Ko },
  /*::[*/
  37: { n: "PtgArea", f: Lo },
  /*::[*/
  38: { n: "PtgMemArea", f: xu },
  /*::[*/
  39: { n: "PtgMemErr", f: mu },
  /*::[*/
  40: { n: "PtgMemNoMem", f: gu },
  /*::[*/
  41: { n: "PtgMemFunc", f: du },
  /*::[*/
  42: { n: "PtgRefErr", f: pu },
  /*::[*/
  43: { n: "PtgAreaErr", f: Bo },
  /*::[*/
  44: { n: "PtgRefN", f: Yo },
  /*::[*/
  45: { n: "PtgAreaN", f: Uo },
  /*::[*/
  46: { n: "PtgMemAreaN", f: Pu },
  /*::[*/
  47: { n: "PtgMemNoMemN", f: Lu },
  /*::[*/
  57: { n: "PtgNameX", f: cu },
  /*::[*/
  58: { n: "PtgRef3d", f: Jo },
  /*::[*/
  59: { n: "PtgArea3d", f: Mo },
  /*::[*/
  60: { n: "PtgRefErr3d", f: vu },
  /*::[*/
  61: { n: "PtgAreaErr3d", f: bo },
  /*::[*/
  255: {}
}, Bu = {
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
}, bu = {
  /*::[*/
  1: { n: "PtgElfLel", f: Ki },
  /*::[*/
  2: { n: "PtgElfRw", f: Cu },
  /*::[*/
  3: { n: "PtgElfCol", f: Tu },
  /*::[*/
  6: { n: "PtgElfRwV", f: Ou },
  /*::[*/
  7: { n: "PtgElfColV", f: Su },
  /*::[*/
  10: { n: "PtgElfRadical", f: Au },
  /*::[*/
  11: { n: "PtgElfRadicalS", f: yu },
  /*::[*/
  13: { n: "PtgElfColS", f: Eu },
  /*::[*/
  15: { n: "PtgElfColSV", f: wu },
  /*::[*/
  16: { n: "PtgElfRadicalLel", f: Fu },
  /*::[*/
  25: { n: "PtgList", f: ku },
  /*::[*/
  29: { n: "PtgSxName", f: Du },
  /*::[*/
  255: {}
}, Uu = {
  /*::[*/
  0: { n: "PtgAttrNoop", f: Mu },
  /*::[*/
  1: { n: "PtgAttrSemi", f: zo },
  /*::[*/
  2: { n: "PtgAttrIf", f: Go },
  /*::[*/
  4: { n: "PtgAttrChoose", f: Wo },
  /*::[*/
  8: { n: "PtgAttrGoto", f: Ho },
  /*::[*/
  16: { n: "PtgAttrSum", f: eu },
  /*::[*/
  32: { n: "PtgAttrBaxcel", f: y0 },
  /*::[*/
  33: { n: "PtgAttrBaxcel", f: y0 },
  /*::[*/
  64: { n: "PtgAttrSpace", f: $o },
  /*::[*/
  65: { n: "PtgAttrSpaceSemi", f: jo },
  /*::[*/
  128: { n: "PtgAttrIfError", f: Xo },
  /*::[*/
  255: {}
};
function Vu(e, t, r, n) {
  if (n.biff < 8) return jr(e, t);
  for (var a = e.l + t, i = [], s = 0; s !== r.length; ++s)
    switch (r[s][0]) {
      case "PtgArray":
        r[s][1] = ou(e, 0, n), i.push(r[s][1]);
        break;
      case "PtgMemArea":
        r[s][2] = lu(e, r[s][1], n), i.push(r[s][2]);
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
  return t = a - e.l, t !== 0 && i.push(jr(e, t)), i;
}
function Wu(e, t, r) {
  for (var n = e.l + t, a, i, s = []; n != e.l; )
    t = n - e.l, i = e[e.l], a = C0[i] || C0[Bu[i]], (i === 24 || i === 25) && (a = (i === 24 ? bu : Uu)[e[e.l + 1]]), !a || !a.f ? jr(e, t) : s.push([a.n, a.f(e, t, r)]);
  return s;
}
function Hu(e) {
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
var Gu = {
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
function Xu(e, t) {
  if (!e && !(t && t.biff <= 5 && t.biff >= 2)) throw new Error("empty sheet name");
  return /[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e) ? "'" + e + "'" : e;
}
function Yi(e, t, r) {
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
function O0(e, t, r) {
  var n = Yi(e, t, r);
  return n == "#REF" ? n : Xu(n, r);
}
function Vt(e, t, r, n, a) {
  var i = a && a.biff || 8, s = (
    /*range != null ? range :*/
    { s: { c: 0, r: 0 } }
  ), f = [], o, l, u, d = 0, x = 0, p, g = "";
  if (!e[0] || !e[0][0]) return "";
  for (var h = -1, T = "", D = 0, k = e[0].length; D < k; ++D) {
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
        if (o = f.pop(), l = f.pop(), h >= 0) {
          switch (e[0][h][1][0]) {
            case 0:
              T = He(" ", e[0][h][1][1]);
              break;
            case 1:
              T = He("\r", e[0][h][1][1]);
              break;
            default:
              if (T = "", a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][h][1][0]);
          }
          l = l + T, h = -1;
        }
        f.push(l + Gu[C[0]] + o);
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
        u = fn(C[1][1], s, a), f.push(ln(u, i));
        break;
      case "PtgRefN":
        u = r ? fn(C[1][1], r, a) : C[1][1], f.push(ln(u, i));
        break;
      case "PtgRef3d":
        d = /*::Number(*/
        C[1][1], u = fn(C[1][2], s, a), g = O0(n, d, a), f.push(g + "!" + ln(u, i));
        break;
      case "PtgFunc":
      case "PtgFuncVar":
        var U = C[1][0], q = C[1][1];
        U || (U = 0), U &= 127;
        var te = U == 0 ? [] : f.slice(-U);
        f.length -= U, q === "User" && (q = te.shift()), f.push(q + "(" + te.join(",") + ")");
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
        p = h0(C[1][1], r ? { s: r } : s, a), f.push(xa(p, a));
        break;
      case "PtgArea":
        p = h0(C[1][1], s, a), f.push(xa(p, a));
        break;
      case "PtgArea3d":
        d = /*::Number(*/
        C[1][1], p = C[1][2], g = O0(n, d, a), f.push(g + "!" + xa(p, a));
        break;
      case "PtgAttrSum":
        f.push("SUM(" + f.pop() + ")");
        break;
      case "PtgAttrBaxcel":
      case "PtgAttrSemi":
        break;
      case "PtgName":
        x = C[1][2];
        var I = (n.names || [])[x - 1] || (n[0] || [])[x], V = I ? I.Name : "SH33TJSNAME" + String(x);
        V && V.slice(0, 6) == "_xlfn." && !a.xlfn && (V = V.slice(6)), f.push(V);
        break;
      case "PtgNameX":
        var b = C[1][1];
        x = C[1][2];
        var j;
        if (a.biff <= 5)
          b < 0 && (b = -b), n[b] && (j = n[b][x]);
        else {
          var Y = "";
          if (((n[b] || [])[0] || [])[0] == 14849 || (((n[b] || [])[0] || [])[0] == 1025 ? n[b][x] && n[b][x].itab > 0 && (Y = n.SheetNames[n[b][x].itab - 1] + "!") : Y = n.SheetNames[x - 1] + "!"), n[b] && n[b][x]) Y += n[b][x].Name;
          else if (n[0] && n[0][x]) Y += n[0][x].Name;
          else {
            var J = (Yi(n, b, a) || "").split(";;");
            J[x - 1] ? Y = J[x - 1] : Y += "SH33TJSERRX";
          }
          f.push(Y);
          break;
        }
        j || (j = { Name: "SH33TJSERRY" }), f.push(j.Name);
        break;
      case "PtgParen":
        var ie = "(", ye = ")";
        if (h >= 0) {
          switch (T = "", e[0][h][1][0]) {
            case 2:
              ie = He(" ", e[0][h][1][1]) + ie;
              break;
            case 3:
              ie = He("\r", e[0][h][1][1]) + ie;
              break;
            case 4:
              ye = He(" ", e[0][h][1][1]) + ye;
              break;
            case 5:
              ye = He("\r", e[0][h][1][1]) + ye;
              break;
            default:
              if (a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][h][1][0]);
          }
          h = -1;
        }
        f.push(ie + f.pop() + ye);
        break;
      case "PtgRefErr":
        f.push("#REF!");
        break;
      case "PtgRefErr3d":
        f.push("#REF!");
        break;
      case "PtgExp":
        u = { c: C[1][1], r: C[1][0] };
        var de = { c: r.c, r: r.r };
        if (n.sharedf[Ne(u)]) {
          var ve = n.sharedf[Ne(u)];
          f.push(Vt(ve, s, de, n, a));
        } else {
          var be = !1;
          for (o = 0; o != n.arrayf.length; ++o)
            if (l = n.arrayf[o], !(u.c < l[0].s.c || u.c > l[0].e.c) && !(u.r < l[0].s.r || u.r > l[0].e.r)) {
              f.push(Vt(l[1], s, de, n, a)), be = !0;
              break;
            }
          be || f.push(
            /*::String(*/
            C[1]
            /*::)*/
          );
        }
        break;
      case "PtgArray":
        f.push("{" + Hu(
          /*::(*/
          C[1]
          /*:: :any)*/
        ) + "}");
        break;
      case "PtgMemArea":
        break;
      case "PtgAttrSpace":
      case "PtgAttrSpaceSemi":
        h = D;
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
    var yr = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
    if (a.biff != 3 && h >= 0 && yr.indexOf(e[0][D][0]) == -1) {
      C = e[0][h];
      var Xe = !0;
      switch (C[1][0]) {
        case 4:
          Xe = !1;
        case 0:
          T = He(" ", C[1][1]);
          break;
        case 5:
          Xe = !1;
        case 1:
          T = He("\r", C[1][1]);
          break;
        default:
          if (T = "", a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + C[1][0]);
      }
      f.push((Xe ? T : "") + f.pop() + (Xe ? "" : T)), h = -1;
    }
  }
  if (f.length > 1 && a.WTF) throw new Error("bad formula stack");
  return f[0];
}
function zu(e) {
  if (e == null) {
    var t = W(8);
    return t.write_shift(1, 3), t.write_shift(1, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 65535), t;
  } else if (typeof e == "number") return mt(e);
  return mt(0);
}
function $u(e, t, r, n, a) {
  var i = gt(t, r, a), s = zu(e.v), f = W(6), o = 33;
  f.write_shift(2, o), f.write_shift(4, 0);
  for (var l = W(e.bf.length), u = 0; u < e.bf.length; ++u) l[u] = e.bf[u];
  var d = lr([i, s, f, l]);
  return d;
}
function ia(e, t, r) {
  var n = e.read_shift(4), a = Wu(e, n, r), i = e.read_shift(4), s = i > 0 ? Vu(e, i, a, r) : null;
  return [a, s];
}
var ju = ia, sa = ia, Ku = ia, Yu = ia, Ju = {
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
}, Ji = {
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
}, Zu = {
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
function qu(e) {
  var t = "of:=" + e.replace(Ua, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
  return t.replace(/;/g, "|").replace(/,/g, ";");
}
function Qu(e) {
  return e.replace(/\./, "!");
}
var on = typeof Map < "u";
function Ha(e, t, r) {
  var n = 0, a = e.length;
  if (r) {
    if (on ? r.has(t) : Object.prototype.hasOwnProperty.call(r, t)) {
      for (var i = on ? r.get(t) : r[t]; n < i.length; ++n)
        if (e[i[n]].t === t)
          return e.Count++, i[n];
    }
  } else for (; n < a; ++n)
    if (e[n].t === t)
      return e.Count++, n;
  return e[a] = { t }, e.Count++, e.Unique++, r && (on ? (r.has(t) || r.set(t, []), r.get(t).push(a)) : (Object.prototype.hasOwnProperty.call(r, t) || (r[t] = []), r[t].push(a))), a;
}
function fa(e, t) {
  var r = { min: e + 1, max: e + 1 }, n = -1;
  return t.MDW && (et = t.MDW), t.width != null ? r.customWidth = 1 : t.wpx != null ? n = Jn(t.wpx) : t.wch != null && (n = t.wch), n > -1 ? (r.width = wa(n), r.customWidth = 1) : t.width != null && (r.width = t.width), t.hidden && (r.hidden = !0), t.level != null && (r.outlineLevel = r.level = t.level), r;
}
function Zi(e, t) {
  if (e) {
    var r = [0.7, 0.7, 0.75, 0.75, 0.3, 0.3];
    e.left == null && (e.left = r[0]), e.right == null && (e.right = r[1]), e.top == null && (e.top = r[2]), e.bottom == null && (e.bottom = r[3]), e.header == null && (e.header = r[4]), e.footer == null && (e.footer = r[5]);
  }
}
function ct(e, t, r) {
  var n = r.revssf[t.z != null ? t.z : "General"], a = 60, i = e.length;
  if (n == null && r.ssf) {
    for (; a < 392; ++a) if (r.ssf[a] == null) {
      $0(t.z, a), r.ssf[a] = t.z, r.revssf[t.z] = n = a;
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
function ec(e, t, r) {
  if (e && e["!ref"]) {
    var n = Be(e["!ref"]);
    if (n.e.c < n.s.c || n.e.r < n.s.r) throw new Error("Bad range (" + r + "): " + e["!ref"]);
  }
}
function rc(e) {
  if (e.length === 0) return "";
  for (var t = '<mergeCells count="' + e.length + '">', r = 0; r != e.length; ++r) t += '<mergeCell ref="' + Je(e[r]) + '"/>';
  return t + "</mergeCells>";
}
function tc(e, t, r, n, a) {
  var i = !1, s = {}, f = null;
  if (n.bookType !== "xlsx" && t.vbaraw) {
    var o = t.SheetNames[r];
    try {
      t.Workbook && (o = t.Workbook.Sheets[r].CodeName || o);
    } catch {
    }
    i = !0, s.codeName = xn(Re(o));
  }
  if (e && e["!outline"]) {
    var l = { summaryBelow: 1, summaryRight: 1 };
    e["!outline"].above && (l.summaryBelow = 0), e["!outline"].left && (l.summaryRight = 0), f = (f || "") + ee("outlinePr", null, l);
  }
  !i && !f || (a[a.length] = ee("sheetPr", f, s));
}
var nc = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"], ac = [
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
function ic(e) {
  var t = { sheet: 1 };
  return nc.forEach(function(r) {
    e[r] != null && e[r] && (t[r] = "1");
  }), ac.forEach(function(r) {
    e[r] != null && !e[r] && (t[r] = "0");
  }), e.password && (t.password = Pi(e.password).toString(16).toUpperCase()), ee("sheetProtection", null, t);
}
function sc(e) {
  return Zi(e), ee("pageMargins", null, e);
}
function fc(e, t) {
  for (var r = ["<cols>"], n, a = 0; a != t.length; ++a)
    (n = t[a]) && (r[r.length] = ee("col", null, fa(a, n)));
  return r[r.length] = "</cols>", r.join("");
}
function lc(e, t, r, n) {
  var a = typeof e.ref == "string" ? e.ref : Je(e.ref);
  r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
  var i = r.Workbook.Names, s = Rr(a);
  s.s.r == s.e.r && (s.e.r = Rr(t["!ref"]).e.r, a = Je(s));
  for (var f = 0; f < i.length; ++f) {
    var o = i[f];
    if (o.Name == "_xlnm._FilterDatabase" && o.Sheet == n) {
      o.Ref = "'" + r.SheetNames[n] + "'!" + a;
      break;
    }
  }
  return f == i.length && i.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + r.SheetNames[n] + "'!" + a }), ee("autoFilter", null, { ref: a });
}
function oc(e, t, r, n) {
  var a = { workbookViewId: "0" };
  return (((n || {}).Workbook || {}).Views || [])[0] && (a.rightToLeft = n.Workbook.Views[0].RTL ? "1" : "0"), ee("sheetViews", ee("sheetView", null, a), {});
}
function uc(e, t, r, n) {
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
      a = Tn[e.v];
      break;
    case "d":
      n && n.cellDates ? a = Tr(e.v, -1).toISOString() : (e = Fr(e), e.t = "n", a = "" + (e.v = Ar(Tr(e.v)))), typeof e.z > "u" && (e.z = Ge[14]);
      break;
    default:
      a = e.v;
      break;
  }
  var f = or("v", Re(a)), o = { r: t }, l = ct(n.cellXfs, e, n);
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
        f = or("v", "" + Ha(n.Strings, e.v, n.revStrings)), o.t = "s";
        break;
      }
      o.t = "str";
      break;
  }
  if (e.t != i && (e.t = i, e.v = s), typeof e.f == "string" && e.f) {
    var u = e.F && e.F.slice(0, t.length) == t ? { t: "array", ref: e.F } : null;
    f = ee("f", Re(e.f), u) + (e.v != null ? f : "");
  }
  return e.l && r["!links"].push([t, e.l]), e.D && (o.cm = 1), ee("c", f, o);
}
function cc(e, t, r, n) {
  var a = [], i = [], s = Be(e["!ref"]), f = "", o, l = "", u = [], d = 0, x = 0, p = e["!rows"], g = Array.isArray(e), h = { r: l }, T, D = -1;
  for (x = s.s.c; x <= s.e.c; ++x) u[x] = xr(x);
  for (d = s.s.r; d <= s.e.r; ++d) {
    for (i = [], l = ur(d), x = s.s.c; x <= s.e.c; ++x) {
      o = u[x] + l;
      var k = g ? (e[d] || [])[x] : e[o];
      k !== void 0 && (f = uc(k, o, e, t)) != null && i.push(f);
    }
    (i.length > 0 || p && p[d]) && (h = { r: l }, p && p[d] && (T = p[d], T.hidden && (h.hidden = 1), D = -1, T.hpx ? D = Zn(T.hpx) : T.hpt && (D = T.hpt), D > -1 && (h.ht = D, h.customHeight = 1), T.level && (h.outlineLevel = T.level)), a[a.length] = ee("row", i.join(""), h));
  }
  if (p) for (; d < p.length; ++d)
    p && p[d] && (h = { r: d + 1 }, T = p[d], T.hidden && (h.hidden = 1), D = -1, T.hpx ? D = Zn(T.hpx) : T.hpt && (D = T.hpt), D > -1 && (h.ht = D, h.customHeight = 1), T.level && (h.outlineLevel = T.level), a[a.length] = ee("row", "", h));
  return a.join("");
}
function qi(e, t, r, n) {
  var a = [Ze, ee("worksheet", null, {
    xmlns: Wt[0],
    "xmlns:r": nr.r
  })], i = r.SheetNames[e], s = 0, f = "", o = r.Sheets[i];
  o == null && (o = {});
  var l = o["!ref"] || "A1", u = Be(l);
  if (u.e.c > 16383 || u.e.r > 1048575) {
    if (t.WTF) throw new Error("Range " + l + " exceeds format limit A1:XFD1048576");
    u.e.c = Math.min(u.e.c, 16383), u.e.r = Math.min(u.e.c, 1048575), l = Je(u);
  }
  n || (n = {}), o["!comments"] = [];
  var d = [];
  tc(o, r, e, t, a), a[a.length] = ee("dimension", null, { ref: l }), a[a.length] = oc(o, t, e, r), t.sheetFormat && (a[a.length] = ee("sheetFormatPr", null, {
    defaultRowHeight: t.sheetFormat.defaultRowHeight || "16",
    baseColWidth: t.sheetFormat.baseColWidth || "10",
    outlineLevelRow: t.sheetFormat.outlineLevelRow || "7"
  })), o["!cols"] != null && o["!cols"].length > 0 && (a[a.length] = fc(o, o["!cols"])), a[s = a.length] = "<sheetData/>", o["!links"] = [], o["!ref"] != null && (f = cc(o, t), f.length > 0 && (a[a.length] = f)), a.length > s + 1 && (a[a.length] = "</sheetData>", a[s] = a[s].replace("/>", ">")), o["!protect"] && (a[a.length] = ic(o["!protect"])), o["!autofilter"] != null && (a[a.length] = lc(o["!autofilter"], o, r, e)), o["!merges"] != null && o["!merges"].length > 0 && (a[a.length] = rc(o["!merges"]));
  var x = -1, p, g = -1;
  return (
    /*::(*/
    o["!links"].length > 0 && (a[a.length] = "<hyperlinks>", o["!links"].forEach(function(h) {
      h[1].Target && (p = { ref: h[0] }, h[1].Target.charAt(0) != "#" && (g = De(n, -1, Re(h[1].Target).replace(/#.*$/, ""), Oe.HLINK), p["r:id"] = "rId" + g), (x = h[1].Target.indexOf("#")) > -1 && (p.location = Re(h[1].Target.slice(x + 1))), h[1].Tooltip && (p.tooltip = Re(h[1].Tooltip)), a[a.length] = ee("hyperlink", null, p));
    }), a[a.length] = "</hyperlinks>"), delete o["!links"], o["!margins"] != null && (a[a.length] = sc(o["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && (a[a.length] = or("ignoredErrors", ee("ignoredError", null, { numberStoredAsText: 1, sqref: l }))), d.length > 0 && (g = De(n, -1, "../drawings/drawing" + (e + 1) + ".xml", Oe.DRAW), a[a.length] = ee("drawing", null, { "r:id": "rId" + g }), o["!drawing"] = d), o["!comments"].length > 0 && (g = De(n, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", Oe.VML), a[a.length] = ee("legacyDrawing", null, { "r:id": "rId" + g }), o["!legacy"] = g), a.length > 1 && (a[a.length] = "</worksheet>", a[1] = a[1].replace("/>", ">")), a.join("")
  );
}
function hc(e, t) {
  var r = {}, n = e.l + t;
  r.r = e.read_shift(4), e.l += 4;
  var a = e.read_shift(2);
  e.l += 1;
  var i = e.read_shift(1);
  return e.l = n, i & 7 && (r.level = i & 7), i & 16 && (r.hidden = !0), i & 32 && (r.hpt = a / 20), r;
}
function xc(e, t, r) {
  var n = W(145), a = (r["!rows"] || [])[e] || {};
  n.write_shift(4, e), n.write_shift(4, 0);
  var i = 320;
  a.hpx ? i = Zn(a.hpx) * 20 : a.hpt && (i = a.hpt * 20), n.write_shift(2, i), n.write_shift(1, 0);
  var s = 0;
  a.level && (s |= a.level), a.hidden && (s |= 16), (a.hpx || a.hpt) && (s |= 32), n.write_shift(1, s), n.write_shift(1, 0);
  var f = 0, o = n.l;
  n.l += 4;
  for (var l = { r: e, c: 0 }, u = 0; u < 16; ++u)
    if (!(t.s.c > u + 1 << 10 || t.e.c < u << 10)) {
      for (var d = -1, x = -1, p = u << 10; p < u + 1 << 10; ++p) {
        l.c = p;
        var g = Array.isArray(r) ? (r[l.r] || [])[l.c] : r[Ne(l)];
        g && (d < 0 && (d = p), x = p);
      }
      d < 0 || (++f, n.write_shift(4, d), n.write_shift(4, x));
    }
  var h = n.l;
  return n.l = o, n.write_shift(4, f), n.l = h, n.length > n.l ? n.slice(0, n.l) : n;
}
function dc(e, t, r, n) {
  var a = xc(n, r, t);
  (a.length > 17 || (t["!rows"] || [])[n]) && z(e, 0, a);
}
var pc = St, vc = Gt;
function mc() {
}
function gc(e, t) {
  var r = {}, n = e[e.l];
  return ++e.l, r.above = !(n & 64), r.left = !(n & 128), e.l += 18, r.name = Cf(e), r;
}
function _c(e, t, r) {
  r == null && (r = W(84 + 4 * e.length));
  var n = 192;
  t && (t.above && (n &= -65), t.left && (n &= -129)), r.write_shift(1, n);
  for (var a = 1; a < 3; ++a) r.write_shift(1, 0);
  return jn({ auto: 1 }, r), r.write_shift(-4, -1), r.write_shift(-4, -1), xi(e, r), r.slice(0, r.l);
}
function Tc(e) {
  var t = br(e);
  return [t];
}
function Ec(e, t, r) {
  return r == null && (r = W(8)), Tt(t, r);
}
function wc(e) {
  var t = Et(e);
  return [t];
}
function Sc(e, t, r) {
  return r == null && (r = W(4)), wt(t, r);
}
function Ac(e) {
  var t = br(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function Fc(e, t, r) {
  return r == null && (r = W(9)), Tt(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function yc(e) {
  var t = Et(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function Cc(e, t, r) {
  return r == null && (r = W(5)), wt(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function Oc(e) {
  var t = br(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function Ic(e, t, r) {
  return r == null && (r = W(9)), Tt(t, r), r.write_shift(1, e.v), r;
}
function kc(e) {
  var t = Et(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function Dc(e, t, r) {
  return r == null && (r = W(8)), wt(t, r), r.write_shift(1, e.v), r.write_shift(2, 0), r.write_shift(1, 0), r;
}
function Rc(e) {
  var t = br(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function Nc(e, t, r) {
  return r == null && (r = W(12)), Tt(t, r), r.write_shift(4, t.v), r;
}
function Pc(e) {
  var t = Et(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function Lc(e, t, r) {
  return r == null && (r = W(8)), wt(t, r), r.write_shift(4, t.v), r;
}
function Mc(e) {
  var t = br(e), r = Xt(e);
  return [t, r, "n"];
}
function Bc(e, t, r) {
  return r == null && (r = W(16)), Tt(t, r), mt(e.v, r), r;
}
function bc(e) {
  var t = Et(e), r = Xt(e);
  return [t, r, "n"];
}
function Uc(e, t, r) {
  return r == null && (r = W(12)), wt(t, r), mt(e.v, r), r;
}
function Vc(e) {
  var t = br(e), r = di(e);
  return [t, r, "n"];
}
function Wc(e, t, r) {
  return r == null && (r = W(12)), Tt(t, r), pi(e.v, r), r;
}
function Hc(e) {
  var t = Et(e), r = di(e);
  return [t, r, "n"];
}
function Gc(e, t, r) {
  return r == null && (r = W(8)), wt(t, r), pi(e.v, r), r;
}
function Xc(e) {
  var t = br(e), r = Pa(e);
  return [t, r, "is"];
}
function zc(e) {
  var t = br(e), r = dr(e);
  return [t, r, "str"];
}
function $c(e, t, r) {
  return r == null && (r = W(12 + 4 * e.v.length)), Tt(t, r), ir(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function jc(e) {
  var t = Et(e), r = dr(e);
  return [t, r, "str"];
}
function Kc(e, t, r) {
  return r == null && (r = W(8 + 4 * e.v.length)), wt(t, r), ir(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function Yc(e, t, r) {
  var n = e.l + t, a = br(e);
  a.r = r["!row"];
  var i = e.read_shift(1), s = [a, i, "b"];
  if (r.cellFormula) {
    e.l += 2;
    var f = sa(e, n - e.l, r);
    s[3] = Vt(f, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
function Jc(e, t, r) {
  var n = e.l + t, a = br(e);
  a.r = r["!row"];
  var i = e.read_shift(1), s = [a, i, "e"];
  if (r.cellFormula) {
    e.l += 2;
    var f = sa(e, n - e.l, r);
    s[3] = Vt(f, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
function Zc(e, t, r) {
  var n = e.l + t, a = br(e);
  a.r = r["!row"];
  var i = Xt(e), s = [a, i, "n"];
  if (r.cellFormula) {
    e.l += 2;
    var f = sa(e, n - e.l, r);
    s[3] = Vt(f, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
function qc(e, t, r) {
  var n = e.l + t, a = br(e);
  a.r = r["!row"];
  var i = dr(e), s = [a, i, "str"];
  if (r.cellFormula) {
    e.l += 2;
    var f = sa(e, n - e.l, r);
    s[3] = Vt(f, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
var Qc = St, e1 = Gt;
function r1(e, t) {
  return t == null && (t = W(4)), t.write_shift(4, e), t;
}
function t1(e, t) {
  var r = e.l + t, n = St(e), a = La(e), i = dr(e), s = dr(e), f = dr(e);
  e.l = r;
  var o = { rfx: n, relId: a, loc: i, display: f };
  return s && (o.Tooltip = s), o;
}
function n1(e, t) {
  var r = W(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
  Gt({ s: ar(e[0]), e: ar(e[0]) }, r), Ma("rId" + t, r);
  var n = e[1].Target.indexOf("#"), a = n == -1 ? "" : e[1].Target.slice(n + 1);
  return ir(a || "", r), ir(e[1].Tooltip || "", r), ir("", r), r.slice(0, r.l);
}
function a1() {
}
function i1(e, t, r) {
  var n = e.l + t, a = vi(e), i = e.read_shift(1), s = [a];
  if (s[2] = i, r.cellFormula) {
    var f = ju(e, n - e.l, r);
    s[1] = f;
  } else e.l = n;
  return s;
}
function s1(e, t, r) {
  var n = e.l + t, a = St(e), i = [a];
  if (r.cellFormula) {
    var s = Yu(e, n - e.l, r);
    i[1] = s, e.l = n;
  } else e.l = n;
  return i;
}
function f1(e, t, r) {
  r == null && (r = W(18));
  var n = fa(e, t);
  r.write_shift(-4, e), r.write_shift(-4, e), r.write_shift(4, (n.width || 10) * 256), r.write_shift(
    4,
    0
    /*ixfe*/
  );
  var a = 0;
  return t.hidden && (a |= 1), typeof n.width == "number" && (a |= 2), t.level && (a |= t.level << 8), r.write_shift(2, a), r;
}
var Qi = ["left", "right", "top", "bottom", "header", "footer"];
function l1(e) {
  var t = {};
  return Qi.forEach(function(r) {
    t[r] = Xt(e);
  }), t;
}
function o1(e, t) {
  return t == null && (t = W(6 * 8)), Zi(e), Qi.forEach(function(r) {
    mt(e[r], t);
  }), t;
}
function u1(e) {
  var t = e.read_shift(2);
  return e.l += 28, { RTL: t & 32 };
}
function c1(e, t, r) {
  r == null && (r = W(30));
  var n = 924;
  return (((t || {}).Views || [])[0] || {}).RTL && (n |= 32), r.write_shift(2, n), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(2, 0), r.write_shift(2, 100), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(4, 0), r;
}
function h1(e) {
  var t = W(24);
  return t.write_shift(4, 4), t.write_shift(4, 1), Gt(e, t), t;
}
function x1(e, t) {
  return t == null && (t = W(16 * 4 + 2)), t.write_shift(2, e.password ? Pi(e.password) : 0), t.write_shift(4, 1), [
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
function d1() {
}
function p1() {
}
function v1(e, t, r, n, a, i, s) {
  if (t.v === void 0) return !1;
  var f = "";
  switch (t.t) {
    case "b":
      f = t.v ? "1" : "0";
      break;
    case "d":
      t = Fr(t), t.z = t.z || Ge[14], t.v = Ar(Tr(t.v)), t.t = "n";
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
  switch (o.s = ct(a.cellXfs, t, a), t.l && i["!links"].push([Ne(o), t.l]), t.c && i["!comments"].push([Ne(o), t.c]), t.t) {
    case "s":
    case "str":
      return a.bookSST ? (f = Ha(a.Strings, t.v, a.revStrings), o.t = "s", o.v = f, s ? z(e, 18, Lc(t, o)) : z(e, 7, Nc(t, o))) : (o.t = "str", s ? z(e, 17, Kc(t, o)) : z(e, 6, $c(t, o))), !0;
    case "n":
      return t.v == (t.v | 0) && t.v > -1e3 && t.v < 1e3 ? s ? z(e, 13, Gc(t, o)) : z(e, 2, Wc(t, o)) : s ? z(e, 16, Uc(t, o)) : z(e, 5, Bc(t, o)), !0;
    case "b":
      return o.t = "b", s ? z(e, 15, Cc(t, o)) : z(e, 4, Fc(t, o)), !0;
    case "e":
      return o.t = "e", s ? z(e, 14, Dc(t, o)) : z(e, 3, Ic(t, o)), !0;
  }
  return s ? z(e, 12, Sc(t, o)) : z(e, 1, Ec(t, o)), !0;
}
function m1(e, t, r, n) {
  var a = Be(t["!ref"] || "A1"), i, s = "", f = [];
  z(
    e,
    145
    /* BrtBeginSheetData */
  );
  var o = Array.isArray(t), l = a.e.r;
  t["!rows"] && (l = Math.max(a.e.r, t["!rows"].length - 1));
  for (var u = a.s.r; u <= l; ++u) {
    s = ur(u), dc(e, t, a, u);
    var d = !1;
    if (u <= a.e.r) for (var x = a.s.c; x <= a.e.c; ++x) {
      u === a.s.r && (f[x] = xr(x)), i = f[x] + s;
      var p = o ? (t[u] || [])[x] : t[i];
      if (!p) {
        d = !1;
        continue;
      }
      d = v1(e, p, u, x, n, t, d);
    }
  }
  z(
    e,
    146
    /* BrtEndSheetData */
  );
}
function g1(e, t) {
  !t || !t["!merges"] || (z(e, 177, r1(t["!merges"].length)), t["!merges"].forEach(function(r) {
    z(e, 176, e1(r));
  }), z(
    e,
    178
    /* BrtEndMergeCells */
  ));
}
function _1(e, t) {
  !t || !t["!cols"] || (z(
    e,
    390
    /* BrtBeginColInfos */
  ), t["!cols"].forEach(function(r, n) {
    r && z(e, 60, f1(n, r));
  }), z(
    e,
    391
    /* BrtEndColInfos */
  ));
}
function T1(e, t) {
  !t || !t["!ref"] || (z(
    e,
    648
    /* BrtBeginCellIgnoreECs */
  ), z(e, 649, h1(Be(t["!ref"]))), z(
    e,
    650
    /* BrtEndCellIgnoreECs */
  ));
}
function E1(e, t, r) {
  t["!links"].forEach(function(n) {
    if (n[1].Target) {
      var a = De(r, -1, n[1].Target.replace(/#.*$/, ""), Oe.HLINK);
      z(e, 494, n1(n, a));
    }
  }), delete t["!links"];
}
function w1(e, t, r, n) {
  if (t["!comments"].length > 0) {
    var a = De(n, -1, "../drawings/vmlDrawing" + (r + 1) + ".vml", Oe.VML);
    z(e, 551, Ma("rId" + a)), t["!legacy"] = a;
  }
}
function S1(e, t, r, n) {
  if (t["!autofilter"]) {
    var a = t["!autofilter"], i = typeof a.ref == "string" ? a.ref : Je(a.ref);
    r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
    var s = r.Workbook.Names, f = Rr(i);
    f.s.r == f.e.r && (f.e.r = Rr(t["!ref"]).e.r, i = Je(f));
    for (var o = 0; o < s.length; ++o) {
      var l = s[o];
      if (l.Name == "_xlnm._FilterDatabase" && l.Sheet == n) {
        l.Ref = "'" + r.SheetNames[n] + "'!" + i;
        break;
      }
    }
    o == s.length && s.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + r.SheetNames[n] + "'!" + i }), z(e, 161, Gt(Be(i))), z(
      e,
      162
      /* BrtEndAFilter */
    );
  }
}
function A1(e, t, r) {
  z(
    e,
    133
    /* BrtBeginWsViews */
  ), z(e, 137, c1(t, r)), z(
    e,
    138
    /* BrtEndWsView */
  ), z(
    e,
    134
    /* BrtEndWsViews */
  );
}
function F1(e, t) {
  t["!protect"] && z(e, 535, x1(t["!protect"]));
}
function y1(e, t, r, n) {
  var a = Sr(), i = r.SheetNames[e], s = r.Sheets[i] || {}, f = i;
  try {
    r && r.Workbook && (f = r.Workbook.Sheets[e].CodeName || f);
  } catch {
  }
  var o = Be(s["!ref"] || "A1");
  if (o.e.c > 16383 || o.e.r > 1048575) {
    if (t.WTF) throw new Error("Range " + (s["!ref"] || "A1") + " exceeds format limit A1:XFD1048576");
    o.e.c = Math.min(o.e.c, 16383), o.e.r = Math.min(o.e.c, 1048575);
  }
  return s["!links"] = [], s["!comments"] = [], z(
    a,
    129
    /* BrtBeginSheet */
  ), (r.vbaraw || s["!outline"]) && z(a, 147, _c(f, s["!outline"])), z(a, 148, vc(o)), A1(a, s, r.Workbook), _1(a, s), m1(a, s, e, t), F1(a, s), S1(a, s, r, e), g1(a, s), E1(a, s, n), s["!margins"] && z(a, 476, o1(s["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && T1(a, s), w1(a, s, e, n), z(
    a,
    130
    /* BrtEndSheet */
  ), a.end();
}
function C1(e, t) {
  e.l += 10;
  var r = dr(e);
  return { name: r };
}
var O1 = [
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
function I1(e) {
  return !e.Workbook || !e.Workbook.WBProps ? "false" : af(e.Workbook.WBProps.date1904) ? "true" : "false";
}
var k1 = /* @__PURE__ */ "][*?/\\".split("");
function es(e, t) {
  if (e.length > 31)
    throw new Error("Sheet names cannot exceed 31 chars");
  var r = !0;
  return k1.forEach(function(n) {
    if (e.indexOf(n) != -1)
      throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
  }), r;
}
function D1(e, t, r) {
  e.forEach(function(n, a) {
    es(n);
    for (var i = 0; i < a; ++i) if (n == e[i]) throw new Error("Duplicate Sheet Name: " + n);
    if (r) {
      var s = t && t[a] && t[a].CodeName || n;
      if (s.charCodeAt(0) == 95 && s.length > 22) throw new Error("Bad Code Name: Worksheet" + s);
    }
  });
}
function R1(e) {
  if (!e || !e.SheetNames || !e.Sheets) throw new Error("Invalid Workbook");
  if (!e.SheetNames.length) throw new Error("Workbook is empty");
  var t = e.Workbook && e.Workbook.Sheets || [];
  D1(e.SheetNames, t, !!e.vbaraw);
  for (var r = 0; r < e.SheetNames.length; ++r) ec(e.Sheets[e.SheetNames[r]], e.SheetNames[r], r);
}
function rs(e) {
  var t = [Ze];
  t[t.length] = ee("workbook", null, {
    xmlns: Wt[0],
    //'xmlns:mx': XMLNS.mx,
    //'xmlns:s': XMLNS_main[0],
    "xmlns:r": nr.r
  });
  var r = e.Workbook && (e.Workbook.Names || []).length > 0, n = { codeName: "ThisWorkbook" };
  e.Workbook && e.Workbook.WBProps && (O1.forEach(function(f) {
    e.Workbook.WBProps[f[0]] != null && e.Workbook.WBProps[f[0]] != f[1] && (n[f[0]] = e.Workbook.WBProps[f[0]]);
  }), e.Workbook.WBProps.CodeName && (n.codeName = e.Workbook.WBProps.CodeName, delete n.CodeName)), t[t.length] = ee("workbookPr", null, n);
  var a = e.Workbook && e.Workbook.Sheets || [], i = 0;
  if (a && a[0] && a[0].Hidden) {
    for (t[t.length] = "<bookViews>", i = 0; i != e.SheetNames.length && !(!a[i] || !a[i].Hidden); ++i)
      ;
    i == e.SheetNames.length && (i = 0), t[t.length] = '<workbookView firstSheet="' + i + '" activeTab="' + i + '"/>', t[t.length] = "</bookViews>";
  }
  for (t[t.length] = "<sheets>", i = 0; i != e.SheetNames.length; ++i) {
    var s = { name: Re(e.SheetNames[i].slice(0, 31)) };
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
    f.Comment && (o.comment = f.Comment), f.Sheet != null && (o.localSheetId = "" + f.Sheet), f.Hidden && (o.hidden = "1"), f.Ref && (t[t.length] = ee("definedName", Re(f.Ref), o));
  }), t[t.length] = "</definedNames>"), t.length > 2 && (t[t.length] = "</workbook>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function N1(e, t) {
  var r = {};
  return r.Hidden = e.read_shift(4), r.iTabID = e.read_shift(4), r.strRelID = Ea(e), r.name = dr(e), r;
}
function P1(e, t) {
  return t || (t = W(127)), t.write_shift(4, e.Hidden), t.write_shift(4, e.iTabID), Ma(e.strRelID, t), ir(e.name.slice(0, 31), t), t.length > t.l ? t.slice(0, t.l) : t;
}
function L1(e, t) {
  var r = {}, n = e.read_shift(4);
  r.defaultThemeVersion = e.read_shift(4);
  var a = t > 8 ? dr(e) : "";
  return a.length > 0 && (r.CodeName = a), r.autoCompressPictures = !!(n & 65536), r.backupFile = !!(n & 64), r.checkCompatibility = !!(n & 4096), r.date1904 = !!(n & 1), r.filterPrivacy = !!(n & 8), r.hidePivotFieldList = !!(n & 1024), r.promptedSolutions = !!(n & 16), r.publishItems = !!(n & 2048), r.refreshAllConnections = !!(n & 262144), r.saveExternalLinkValues = !!(n & 128), r.showBorderUnselectedTables = !!(n & 4), r.showInkAnnotation = !!(n & 32), r.showObjects = ["all", "placeholders", "none"][n >> 13 & 3], r.showPivotChartFilter = !!(n & 32768), r.updateLinks = ["userSet", "never", "always"][n >> 8 & 3], r;
}
function M1(e, t) {
  t || (t = W(72));
  var r = 0;
  return e && e.filterPrivacy && (r |= 8), t.write_shift(4, r), t.write_shift(4, 0), xi(e && e.CodeName || "ThisWorkbook", t), t.slice(0, t.l);
}
function B1(e, t, r) {
  var n = e.l + t;
  e.l += 4, e.l += 1;
  var a = e.read_shift(4), i = Of(e), s = Ku(e, 0, r), f = La(e);
  e.l = n;
  var o = { Name: i, Ptg: s };
  return a < 268435455 && (o.Sheet = a), f && (o.Comment = f), o;
}
function b1(e, t) {
  z(
    e,
    143
    /* BrtBeginBundleShs */
  );
  for (var r = 0; r != t.SheetNames.length; ++r) {
    var n = t.Workbook && t.Workbook.Sheets && t.Workbook.Sheets[r] && t.Workbook.Sheets[r].Hidden || 0, a = { Hidden: n, iTabID: r + 1, strRelID: "rId" + (r + 1), name: t.SheetNames[r] };
    z(e, 156, P1(a));
  }
  z(
    e,
    144
    /* BrtEndBundleShs */
  );
}
function U1(e, t) {
  t || (t = W(127));
  for (var r = 0; r != 4; ++r) t.write_shift(4, 0);
  return ir("SheetJS", t), ir(Un.version, t), ir(Un.version, t), ir("7262", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function V1(e, t) {
  t || (t = W(29)), t.write_shift(-4, 0), t.write_shift(-4, 460), t.write_shift(4, 28800), t.write_shift(4, 17600), t.write_shift(4, 500), t.write_shift(4, e), t.write_shift(4, e);
  var r = 120;
  return t.write_shift(1, r), t.length > t.l ? t.slice(0, t.l) : t;
}
function W1(e, t) {
  if (!(!t.Workbook || !t.Workbook.Sheets)) {
    for (var r = t.Workbook.Sheets, n = 0, a = -1, i = -1; n < r.length; ++n)
      !r[n] || !r[n].Hidden && a == -1 ? a = n : r[n].Hidden == 1 && i == -1 && (i = n);
    i > a || (z(
      e,
      135
      /* BrtBeginBookViews */
    ), z(e, 158, V1(a)), z(
      e,
      136
      /* BrtEndBookViews */
    ));
  }
}
function H1(e, t) {
  var r = Sr();
  return z(
    r,
    131
    /* BrtBeginBook */
  ), z(r, 128, U1()), z(r, 153, M1(e.Workbook && e.Workbook.WBProps || null)), W1(r, e), b1(r, e), z(
    r,
    132
    /* BrtEndBook */
  ), r.end();
}
function G1(e, t, r) {
  return (t.slice(-4) === ".bin" ? H1 : rs)(e);
}
function X1(e, t, r, n, a) {
  return (t.slice(-4) === ".bin" ? y1 : qi)(e, r, n, a);
}
function z1(e, t, r) {
  return (t.slice(-4) === ".bin" ? lo : Bi)(e, r);
}
function $1(e, t, r) {
  return (t.slice(-4) === ".bin" ? Ll : Ni)(e, r);
}
function j1(e, t, r) {
  return (t.slice(-4) === ".bin" ? Fo : Hi)(e);
}
function K1(e) {
  return (e.slice(-4) === ".bin" ? mo : Vi)();
}
function Y1(e, t) {
  var r = [];
  return e.Props && r.push(Xf(e.Props, t)), e.Custprops && r.push(zf(e.Props, e.Custprops)), r.join("");
}
function J1() {
  return "";
}
function Z1(e, t) {
  var r = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
  return t.cellXfs.forEach(function(n, a) {
    var i = [];
    i.push(ee("NumberFormat", null, { "ss:Format": Re(Ge[n.numFmtId]) }));
    var s = (
      /*::(*/
      { "ss:ID": "s" + (21 + a) }
    );
    r.push(ee("Style", i.join(""), s));
  }), ee("Styles", r.join(""));
}
function ts(e) {
  return ee("NamedRange", null, { "ss:Name": e.Name, "ss:RefersTo": "=" + Va(e.Ref, { r: 0, c: 0 }) });
}
function q1(e) {
  if (!((e || {}).Workbook || {}).Names) return "";
  for (var t = e.Workbook.Names, r = [], n = 0; n < t.length; ++n) {
    var a = t[n];
    a.Sheet == null && (a.Name.match(/^_xlfn\./) || r.push(ts(a)));
  }
  return ee("Names", r.join(""));
}
function Q1(e, t, r, n) {
  if (!e || !((n || {}).Workbook || {}).Names) return "";
  for (var a = n.Workbook.Names, i = [], s = 0; s < a.length; ++s) {
    var f = a[s];
    f.Sheet == r && (f.Name.match(/^_xlfn\./) || i.push(ts(f)));
  }
  return i.join("");
}
function eh(e, t, r, n) {
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
  return ((((n || {}).Workbook || {}).Views || [])[0] || {}).RTL && a.push("<DisplayRightToLeft/>"), e["!protect"] && (a.push(or("ProtectContents", "True")), e["!protect"].objects && a.push(or("ProtectObjects", "True")), e["!protect"].scenarios && a.push(or("ProtectScenarios", "True")), e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells ? a.push(or("EnableSelection", "NoSelection")) : e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells && a.push(or("EnableSelection", "UnlockedCells")), [
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
  })), a.length == 0 ? "" : ee("WorksheetOptions", a.join(""), { xmlns: kr.x });
}
function rh(e) {
  return e.map(function(t) {
    var r = nf(t.t || ""), n = ee("ss:Data", r, { xmlns: "http://www.w3.org/TR/REC-html40" });
    return ee("Comment", n, { "ss:Author": t.a });
  }).join("");
}
function th(e, t, r, n, a, i, s) {
  if (!e || e.v == null && e.f == null) return "";
  var f = {};
  if (e.f && (f["ss:Formula"] = "=" + Re(Va(e.f, s))), e.F && e.F.slice(0, t.length) == t) {
    var o = ar(e.F.slice(t.length + 1));
    f["ss:ArrayRange"] = "RC:R" + (o.r == s.r ? "" : "[" + (o.r - s.r) + "]") + "C" + (o.c == s.c ? "" : "[" + (o.c - s.c) + "]");
  }
  if (e.l && e.l.Target && (f["ss:HRef"] = Re(e.l.Target), e.l.Tooltip && (f["x:HRefScreenTip"] = Re(e.l.Tooltip))), r["!merges"])
    for (var l = r["!merges"], u = 0; u != l.length; ++u)
      l[u].s.c != s.c || l[u].s.r != s.r || (l[u].e.c > l[u].s.c && (f["ss:MergeAcross"] = l[u].e.c - l[u].s.c), l[u].e.r > l[u].s.r && (f["ss:MergeDown"] = l[u].e.r - l[u].s.r));
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
      d = "Error", x = Tn[e.v];
      break;
    case "d":
      d = "DateTime", x = new Date(e.v).toISOString(), e.z == null && (e.z = e.z || Ge[14]);
      break;
    case "s":
      d = "String", x = tf(e.v || "");
      break;
  }
  var p = ct(n.cellXfs, e, n);
  f["ss:StyleID"] = "s" + (21 + p), f["ss:Index"] = s.c + 1;
  var g = e.v != null ? x : "", h = e.t == "z" ? "" : '<Data ss:Type="' + d + '">' + g + "</Data>";
  return (e.c || []).length > 0 && (h += rh(e.c)), ee("Cell", h, f);
}
function nh(e, t) {
  var r = '<Row ss:Index="' + (e + 1) + '"';
  return t && (t.hpt && !t.hpx && (t.hpx = Mi(t.hpt)), t.hpx && (r += ' ss:AutoFitHeight="0" ss:Height="' + t.hpx + '"'), t.hidden && (r += ' ss:Hidden="1"')), r + ">";
}
function ah(e, t, r, n) {
  if (!e["!ref"]) return "";
  var a = Be(e["!ref"]), i = e["!merges"] || [], s = 0, f = [];
  e["!cols"] && e["!cols"].forEach(function(T, D) {
    ba(T);
    var k = !!T.width, C = fa(D, T), U = { "ss:Index": D + 1 };
    k && (U["ss:Width"] = Yn(C.width)), T.hidden && (U["ss:Hidden"] = "1"), f.push(ee("Column", null, U));
  });
  for (var o = Array.isArray(e), l = a.s.r; l <= a.e.r; ++l) {
    for (var u = [nh(l, (e["!rows"] || [])[l])], d = a.s.c; d <= a.e.c; ++d) {
      var x = !1;
      for (s = 0; s != i.length; ++s)
        if (!(i[s].s.c > d) && !(i[s].s.r > l) && !(i[s].e.c < d) && !(i[s].e.r < l)) {
          (i[s].s.c != d || i[s].s.r != l) && (x = !0);
          break;
        }
      if (!x) {
        var p = { r: l, c: d }, g = Ne(p), h = o ? (e[l] || [])[d] : e[g];
        u.push(th(h, g, e, t, r, n, p));
      }
    }
    u.push("</Row>"), u.length > 2 && f.push(u.join(""));
  }
  return f.join("");
}
function ih(e, t, r) {
  var n = [], a = r.SheetNames[e], i = r.Sheets[a], s = i ? Q1(i, t, e, r) : "";
  return s.length > 0 && n.push("<Names>" + s + "</Names>"), s = i ? ah(i, t, e, r) : "", s.length > 0 && n.push("<Table>" + s + "</Table>"), n.push(eh(i, t, e, r)), n.join("");
}
function sh(e, t) {
  t || (t = {}), e.SSF || (e.SSF = Fr(Ge)), e.SSF && (ta(), ra(e.SSF), t.revssf = na(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF, t.cellXfs = [], ct(t.cellXfs, {}, { revssf: { General: 0 } }));
  var r = [];
  r.push(Y1(e, t)), r.push(J1()), r.push(""), r.push("");
  for (var n = 0; n < e.SheetNames.length; ++n)
    r.push(ee("Worksheet", ih(n, t, e), { "ss:Name": Re(e.SheetNames[n]) }));
  return r[2] = Z1(e, t), r[3] = q1(e), Ze + ee("Workbook", r.join(""), {
    xmlns: kr.ss,
    "xmlns:o": kr.o,
    "xmlns:x": kr.x,
    "xmlns:ss": kr.ss,
    "xmlns:dt": kr.dt,
    "xmlns:html": kr.html
  });
}
var va = {
  SI: "e0859ff2f94f6810ab9108002b27b3d9",
  DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
  UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
};
function fh(e, t) {
  var r = [], n = [], a = [], i = 0, s, f = r0(d0, "n"), o = r0(p0, "n");
  if (e.Props)
    for (s = cr(e.Props), i = 0; i < s.length; ++i) (Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(o, s[i]) ? n : a).push([s[i], e.Props[s[i]]]);
  if (e.Custprops)
    for (s = cr(e.Custprops), i = 0; i < s.length; ++i) Object.prototype.hasOwnProperty.call(e.Props || {}, s[i]) || (Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(o, s[i]) ? n : a).push([s[i], e.Custprops[s[i]]]);
  var l = [];
  for (i = 0; i < a.length; ++i)
    yi.indexOf(a[i][0]) > -1 || Si.indexOf(a[i][0]) > -1 || a[i][1] != null && l.push(a[i]);
  n.length && Le.utils.cfb_add(t, "/SummaryInformation", T0(n, va.SI, o, p0)), (r.length || l.length) && Le.utils.cfb_add(t, "/DocumentSummaryInformation", T0(r, va.DSI, f, d0, l.length ? l : null, va.UDI));
}
function lh(e, t) {
  var r = t || {}, n = Le.utils.cfb_new({ root: "R" }), a = "/Workbook";
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
  return Le.utils.cfb_add(n, a, ns(e, r)), r.biff == 8 && (e.Props || e.Custprops) && fh(e, n), r.biff == 8 && e.vbaraw && yo(n, Le.read(e.vbaraw, { type: typeof e.vbaraw == "string" ? "binary" : "buffer" })), n;
}
var oh = {
  /*::[*/
  0: {
    /* n:"BrtRowHdr", */
    f: hc
  },
  /*::[*/
  1: {
    /* n:"BrtCellBlank", */
    f: Tc
  },
  /*::[*/
  2: {
    /* n:"BrtCellRk", */
    f: Vc
  },
  /*::[*/
  3: {
    /* n:"BrtCellError", */
    f: Oc
  },
  /*::[*/
  4: {
    /* n:"BrtCellBool", */
    f: Ac
  },
  /*::[*/
  5: {
    /* n:"BrtCellReal", */
    f: Mc
  },
  /*::[*/
  6: {
    /* n:"BrtCellSt", */
    f: zc
  },
  /*::[*/
  7: {
    /* n:"BrtCellIsst", */
    f: Rc
  },
  /*::[*/
  8: {
    /* n:"BrtFmlaString", */
    f: qc
  },
  /*::[*/
  9: {
    /* n:"BrtFmlaNum", */
    f: Zc
  },
  /*::[*/
  10: {
    /* n:"BrtFmlaBool", */
    f: Yc
  },
  /*::[*/
  11: {
    /* n:"BrtFmlaError", */
    f: Jc
  },
  /*::[*/
  12: {
    /* n:"BrtShortBlank", */
    f: wc
  },
  /*::[*/
  13: {
    /* n:"BrtShortRk", */
    f: Hc
  },
  /*::[*/
  14: {
    /* n:"BrtShortError", */
    f: kc
  },
  /*::[*/
  15: {
    /* n:"BrtShortBool", */
    f: yc
  },
  /*::[*/
  16: {
    /* n:"BrtShortReal", */
    f: bc
  },
  /*::[*/
  17: {
    /* n:"BrtShortSt", */
    f: jc
  },
  /*::[*/
  18: {
    /* n:"BrtShortIsst", */
    f: Pc
  },
  /*::[*/
  19: {
    /* n:"BrtSSTItem", */
    f: Pa
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
    f: B1
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
    f: Xl
  },
  /*::[*/
  44: {
    /* n:"BrtFmt", */
    f: Hl
  },
  /*::[*/
  45: {
    /* n:"BrtFill", */
    f: jl
  },
  /*::[*/
  46: {
    /* n:"BrtBorder", */
    f: Yl
  },
  /*::[*/
  47: {
    /* n:"BrtXF", */
    f: Kl
  },
  /*::[*/
  48: {
    /* n:"BrtStyle" */
  },
  /*::[*/
  49: {
    /* n:"BrtCellMeta", */
    f: Ef
  },
  /*::[*/
  50: {
    /* n:"BrtValueMeta" */
  },
  /*::[*/
  51: {
    /* n:"BrtMdb" */
    f: co
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
    f: wl
  },
  /*::[*/
  62: {
    /* n:"BrtCellRString", */
    f: Xc
  },
  /*::[*/
  63: {
    /* n:"BrtCalcChainItem$", */
    f: go
  },
  /*::[*/
  64: {
    /* n:"BrtDVal", */
    f: d1
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
    f: jr,
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
    f: u1
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
    f: gc
  },
  /*::[*/
  148: {
    /* n:"BrtWsDim", */
    f: pc,
    p: 16
  },
  /*::[*/
  151: {
    /* n:"BrtPane", */
    f: a1
  },
  /*::[*/
  152: {
    /* n:"BrtSel" */
  },
  /*::[*/
  153: {
    /* n:"BrtWbProp", */
    f: L1
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
    f: N1
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
    f: Rl
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
    f: St
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
    f: Qc
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
    f: oo
  },
  /*::[*/
  336: {
    /* n:"BrtEndEsmdtinfo", */
    T: -1
  },
  /*::[*/
  337: {
    /* n:"BrtBeginEsmdb", */
    f: po,
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
    f: Ea
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
    f: vl
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
    f: i1
  },
  /*::[*/
  427: {
    /* n:"BrtShrFmla", */
    f: s1
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
    f: l1
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
    f: mc
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
    f: t1
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
    f: Ea
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
    f: So
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
    f: Eo
  },
  /*::[*/
  636: {
    /* n:"BrtEndComment", */
    T: -1
  },
  /*::[*/
  637: {
    /* n:"BrtCommentText", */
    f: Ff
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
    f: C1
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
    f: p1
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
    i > 0 && Da(r) && e.push(r);
  }
}
function uh(e, t, r, n) {
  var a = (r || []).length || 0;
  if (a <= 8224) return re(e, t, r, a);
  var i = t;
  if (!isNaN(i)) {
    for (var s = r.parts || [], f = 0, o = 0, l = 0; l + (s[f] || 8224) <= 8224; )
      l += s[f] || 8224, f++;
    var u = e.next(4);
    for (u.write_shift(2, i), u.write_shift(2, l), e.push(r.slice(o, o + l)), o += l; o < a; ) {
      for (u = e.next(4), u.write_shift(2, 60), l = 0; l + (s[f] || 8224) <= 8224; )
        l += s[f] || 8224, f++;
      u.write_shift(2, l), e.push(r.slice(o, o + l)), o += l;
    }
  }
}
function wn(e, t, r) {
  return e || (e = W(7)), e.write_shift(2, t), e.write_shift(2, r), e.write_shift(2, 0), e.write_shift(1, 0), e;
}
function ch(e, t, r, n) {
  var a = W(9);
  return wn(a, e, t), Oi(r, n || "b", a), a;
}
function hh(e, t, r) {
  var n = W(8 + 2 * r.length);
  return wn(n, e, t), n.write_shift(1, r.length), n.write_shift(r.length, r, "sbcs"), n.l < n.length ? n.slice(0, n.l) : n;
}
function xh(e, t, r, n) {
  if (t.v != null) switch (t.t) {
    case "d":
    case "n":
      var a = t.t == "d" ? Ar(Tr(t.v)) : t.v;
      a == (a | 0) && a >= 0 && a < 65536 ? re(e, 2, yl(r, n, a)) : re(e, 3, Fl(r, n, a));
      return;
    case "b":
    case "e":
      re(e, 5, ch(r, n, t.v, t.t));
      return;
    case "s":
    case "str":
      re(e, 4, hh(r, n, (t.v || "").slice(0, 255)));
      return;
  }
  re(e, 1, wn(null, r, n));
}
function dh(e, t, r, n) {
  var a = Array.isArray(t), i = Be(t["!ref"] || "A1"), s, f = "", o = [];
  if (i.e.c > 255 || i.e.r > 16383) {
    if (n.WTF) throw new Error("Range " + (t["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    i.e.c = Math.min(i.e.c, 255), i.e.r = Math.min(i.e.c, 16383), s = Je(i);
  }
  for (var l = i.s.r; l <= i.e.r; ++l) {
    f = ur(l);
    for (var u = i.s.c; u <= i.e.c; ++u) {
      l === i.s.r && (o[u] = xr(u)), s = o[u] + f;
      var d = a ? (t[l] || [])[u] : t[s];
      d && xh(e, d, l, u);
    }
  }
}
function ph(e, t) {
  for (var r = t || {}, n = Sr(), a = 0, i = 0; i < e.SheetNames.length; ++i) e.SheetNames[i] == r.sheet && (a = i);
  if (a == 0 && r.sheet && e.SheetNames[0] != r.sheet) throw new Error("Sheet not found: " + r.sheet);
  return re(n, r.biff == 4 ? 1033 : r.biff == 3 ? 521 : 9, Ba(e, 16, r)), dh(n, e.Sheets[e.SheetNames[a]], a, r), re(n, 10), n.end();
}
function vh(e, t, r) {
  re(e, 49, ll({
    sz: 12,
    name: "Arial"
  }, r));
}
function mh(e, t, r) {
  t && [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(n) {
    for (var a = n[0]; a <= n[1]; ++a) t[a] != null && re(e, 1054, cl(a, t[a], r));
  });
}
function gh(e, t) {
  var r = W(19);
  r.write_shift(4, 2151), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 1), r.write_shift(4, 0), re(e, 2151, r), r = W(39), r.write_shift(4, 2152), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 0), r.write_shift(4, 0), r.write_shift(2, 1), r.write_shift(4, 4), r.write_shift(2, 0), Di(Be(t["!ref"] || "A1"), r), r.write_shift(4, 4), re(e, 2152, r);
}
function _h(e, t) {
  for (var r = 0; r < 16; ++r) re(e, 224, w0({ numFmtId: 0, style: !0 }, 0, t));
  t.cellXfs.forEach(function(n) {
    re(e, 224, w0(n, 0, t));
  });
}
function Th(e, t) {
  for (var r = 0; r < t["!links"].length; ++r) {
    var n = t["!links"][r];
    re(e, 440, _l(n)), n[1].Tooltip && re(e, 2048, Tl(n));
  }
  delete t["!links"];
}
function Eh(e, t) {
  if (t) {
    var r = 0;
    t.forEach(function(n, a) {
      ++r <= 256 && n && re(e, 125, Sl(fa(a, n), a));
    });
  }
}
function wh(e, t, r, n, a) {
  var i = 16 + ct(a.cellXfs, t, a);
  if (t.v == null && !t.bf) {
    re(e, 513, gt(r, n, i));
    return;
  }
  if (t.bf) re(e, 6, $u(t, r, n, a, i));
  else switch (t.t) {
    case "d":
    case "n":
      var s = t.t == "d" ? Ar(Tr(t.v)) : t.v;
      re(e, 515, pl(r, n, s, i));
      break;
    case "b":
    case "e":
      re(e, 517, dl(r, n, t.v, i, a, t.t));
      break;
    case "s":
    case "str":
      if (a.bookSST) {
        var f = Ha(a.Strings, t.v, a.revStrings);
        re(e, 253, ol(r, n, f, i));
      } else re(e, 516, ul(r, n, (t.v || "").slice(0, 255), i, a));
      break;
    default:
      re(e, 513, gt(r, n, i));
  }
}
function Sh(e, t, r) {
  var n = Sr(), a = r.SheetNames[e], i = r.Sheets[a] || {}, s = (r || {}).Workbook || {}, f = (s.Sheets || [])[e] || {}, o = Array.isArray(i), l = t.biff == 8, u, d = "", x = [], p = Be(i["!ref"] || "A1"), g = l ? 65536 : 16384;
  if (p.e.c > 255 || p.e.r >= g) {
    if (t.WTF) throw new Error("Range " + (i["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    p.e.c = Math.min(p.e.c, 255), p.e.r = Math.min(p.e.c, g - 1);
  }
  re(n, 2057, Ba(r, 16, t)), re(n, 13, Br(1)), re(n, 12, Br(100)), re(n, 15, _r(!0)), re(n, 17, _r(!1)), re(n, 16, mt(1e-3)), re(n, 95, _r(!0)), re(n, 42, _r(!1)), re(n, 43, _r(!1)), re(n, 130, Br(1)), re(n, 128, xl()), re(n, 131, _r(!1)), re(n, 132, _r(!1)), l && Eh(n, i["!cols"]), re(n, 512, hl(p, t)), l && (i["!links"] = []);
  for (var h = p.s.r; h <= p.e.r; ++h) {
    d = ur(h);
    for (var T = p.s.c; T <= p.e.c; ++T) {
      h === p.s.r && (x[T] = xr(T)), u = x[T] + d;
      var D = o ? (i[h] || [])[T] : i[u];
      D && (wh(n, D, h, T, t), l && D.l && i["!links"].push([u, D.l]));
    }
  }
  var k = f.CodeName || f.name || a;
  return l && re(n, 574, fl((s.Views || [])[0])), l && (i["!merges"] || []).length && re(n, 229, gl(i["!merges"])), l && Th(n, i), re(n, 442, ki(k)), l && gh(n, i), re(
    n,
    10
    /* EOF */
  ), n.end();
}
function Ah(e, t, r) {
  var n = Sr(), a = (e || {}).Workbook || {}, i = a.Sheets || [], s = (
    /*::((*/
    a.WBProps || {
      /*::CodeName:"ThisWorkbook"*/
    }
  ), f = r.biff == 8, o = r.biff == 5;
  if (re(n, 2057, Ba(e, 5, r)), r.bookType == "xla" && re(
    n,
    135
    /* Addin */
  ), re(n, 225, f ? Br(1200) : null), re(n, 193, Kf(2)), o && re(
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
  ), re(n, 92, nl("SheetJS", r)), re(n, 66, Br(f ? 1200 : 1252)), f && re(n, 353, Br(0)), f && re(
    n,
    448
    /* Excel9File */
  ), re(n, 317, Al(e.SheetNames.length)), f && e.vbaraw && re(
    n,
    211
    /* ObProj */
  ), f && e.vbaraw) {
    var l = s.CodeName || "ThisWorkbook";
    re(n, 442, ki(l));
  }
  re(n, 156, Br(17)), re(n, 25, _r(!1)), re(n, 18, _r(!1)), re(n, 19, Br(0)), f && re(n, 431, _r(!1)), f && re(n, 444, Br(0)), re(n, 61, sl()), re(n, 64, _r(!1)), re(n, 141, Br(0)), re(n, 34, _r(I1(e) == "true")), re(n, 14, _r(!0)), f && re(n, 439, _r(!1)), re(n, 218, Br(0)), vh(n, e, r), mh(n, e.SSF, r), _h(n, r), f && re(n, 352, _r(!1));
  var u = n.end(), d = Sr();
  f && re(d, 140, El()), f && r.Strings && uh(d, 252, il(r.Strings)), re(
    d,
    10
    /* EOF */
  );
  var x = d.end(), p = Sr(), g = 0, h = 0;
  for (h = 0; h < e.SheetNames.length; ++h) g += (f ? 12 : 11) + (f ? 2 : 1) * e.SheetNames[h].length;
  var T = u.length + g + x.length;
  for (h = 0; h < e.SheetNames.length; ++h) {
    var D = i[h] || {};
    re(p, 133, al({ pos: T, hs: D.Hidden || 0, dt: 0, name: e.SheetNames[h] }, r)), T += t[h].length;
  }
  var k = p.end();
  if (g != k.length) throw new Error("BS8 " + g + " != " + k.length);
  var C = [];
  return u.length && C.push(u), k.length && C.push(k), x.length && C.push(x), lr(C);
}
function Fh(e, t) {
  var r = t || {}, n = [];
  e && !e.SSF && (e.SSF = Fr(Ge)), e && e.SSF && (ta(), ra(e.SSF), r.revssf = na(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF), r.Strings = /*::((*/
  [], r.Strings.Count = 0, r.Strings.Unique = 0, Ga(r), r.cellXfs = [], ct(r.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {});
  for (var a = 0; a < e.SheetNames.length; ++a) n[n.length] = Sh(a, r, e);
  return n.unshift(Ah(e, n, r)), lr(n);
}
function ns(e, t) {
  for (var r = 0; r <= e.SheetNames.length; ++r) {
    var n = e.Sheets[e.SheetNames[r]];
    if (!(!n || !n["!ref"])) {
      var a = Rr(n["!ref"]);
      a.e.c > 255 && typeof console < "u" && console.error && console.error("Worksheet '" + e.SheetNames[r] + "' extends beyond column IV (255).  Data may be lost.");
    }
  }
  var i = t || {};
  switch (i.biff || 2) {
    case 8:
    case 5:
      return Fh(e, t);
    case 4:
    case 3:
    case 2:
      return ph(e, t);
  }
  throw new Error("invalid type " + i.bookType + " for BIFF");
}
function yh(e, t, r, n) {
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
      var u = Ne({ r, c: s }), d = n.dense ? (e[r] || [])[s] : e[u], x = d && d.v != null && (d.h || rf(d.w || (tt(d), d.w) || "")) || "", p = {};
      f > 1 && (p.rowspan = f), o > 1 && (p.colspan = o), n.editable ? x = '<span contenteditable="true">' + x + "</span>" : d && (p["data-t"] = d && d.t || "z", d.v != null && (p["data-v"] = d.v), d.z != null && (p["data-z"] = d.z), d.l && (d.l.Target || "#").charAt(0) != "#" && (x = '<a href="' + d.l.Target + '">' + x + "</a>")), p.id = (n.id || "sjs") + "-" + u, i.push(ee("td", x, p));
    }
  }
  var g = "<tr>";
  return g + i.join("") + "</tr>";
}
var Ch = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>', Oh = "</body></html>";
function Ih(e, t, r) {
  var n = [];
  return n.join("") + "<table" + (r && r.id ? ' id="' + r.id + '"' : "") + ">";
}
function as(e, t) {
  var r = t || {}, n = r.header != null ? r.header : Ch, a = r.footer != null ? r.footer : Oh, i = [n], s = Rr(e["!ref"]);
  r.dense = Array.isArray(e), i.push(Ih(e, s, r));
  for (var f = s.s.r; f <= s.e.r; ++f) i.push(yh(e, s, f, r));
  return i.push("</table>" + a), i.join("");
}
function is(e, t, r) {
  var n = r || {}, a = 0, i = 0;
  if (n.origin != null)
    if (typeof n.origin == "number") a = n.origin;
    else {
      var s = typeof n.origin == "string" ? ar(n.origin) : n.origin;
      a = s.r, i = s.c;
    }
  var f = t.getElementsByTagName("tr"), o = Math.min(n.sheetRows || 1e7, f.length), l = { s: { r: 0, c: 0 }, e: { r: a, c: i } };
  if (e["!ref"]) {
    var u = Rr(e["!ref"]);
    l.s.r = Math.min(l.s.r, u.s.r), l.s.c = Math.min(l.s.c, u.s.c), l.e.r = Math.max(l.e.r, u.e.r), l.e.c = Math.max(l.e.c, u.e.c), a == -1 && (l.e.r = a = u.e.r + 1);
  }
  var d = [], x = 0, p = e["!rows"] || (e["!rows"] = []), g = 0, h = 0, T = 0, D = 0, k = 0, C = 0;
  for (e["!cols"] || (e["!cols"] = []); g < f.length && h < o; ++g) {
    var U = f[g];
    if (I0(U)) {
      if (n.display) continue;
      p[h] = { hidden: !0 };
    }
    var q = U.children;
    for (T = D = 0; T < q.length; ++T) {
      var te = q[T];
      if (!(n.display && I0(te))) {
        var I = te.hasAttribute("data-v") ? te.getAttribute("data-v") : te.hasAttribute("v") ? te.getAttribute("v") : sf(te.innerHTML), V = te.getAttribute("data-z") || te.getAttribute("z");
        for (x = 0; x < d.length; ++x) {
          var b = d[x];
          b.s.c == D + i && b.s.r < h + a && h + a <= b.e.r && (D = b.e.c + 1 - i, x = -1);
        }
        C = +te.getAttribute("colspan") || 1, ((k = +te.getAttribute("rowspan") || 1) > 1 || C > 1) && d.push({ s: { r: h + a, c: D + i }, e: { r: h + a + (k || 1) - 1, c: D + i + (C || 1) - 1 } });
        var j = { t: "s", v: I }, Y = te.getAttribute("data-t") || te.getAttribute("t") || "";
        I != null && (I.length == 0 ? j.t = Y || "z" : n.raw || I.trim().length == 0 || Y == "s" || (I === "TRUE" ? j = { t: "b", v: !0 } : I === "FALSE" ? j = { t: "b", v: !1 } : isNaN(Qr(I)) ? isNaN(hn(I).getDate()) || (j = { t: "d", v: Tr(I) }, n.cellDates || (j = { t: "n", v: Ar(j.v) }), j.z = n.dateNF || Ge[14]) : j = { t: "n", v: Qr(I) })), j.z === void 0 && V != null && (j.z = V);
        var J = "", ie = te.getElementsByTagName("A");
        if (ie && ie.length) for (var ye = 0; ye < ie.length && !(ie[ye].hasAttribute("href") && (J = ie[ye].getAttribute("href"), J.charAt(0) != "#")); ++ye) ;
        J && J.charAt(0) != "#" && (j.l = { Target: J }), n.dense ? (e[h + a] || (e[h + a] = []), e[h + a][D + i] = j) : e[Ne({ c: D + i, r: h + a })] = j, l.e.c < D + i && (l.e.c = D + i), D += C;
      }
    }
    ++h;
  }
  return d.length && (e["!merges"] = (e["!merges"] || []).concat(d)), l.e.r = Math.max(l.e.r, h - 1 + a), e["!ref"] = Je(l), h >= o && (e["!fullref"] = Je((l.e.r = f.length - g + h - 1 + a, l))), e;
}
function ss(e, t) {
  var r = t || {}, n = r.dense ? [] : {};
  return is(n, e, t);
}
function kh(e, t) {
  return _t(ss(e, t), t);
}
function I0(e) {
  var t = "", r = Dh(e);
  return r && (t = r(e).getPropertyValue("display")), t || (t = e.style && e.style.display), t === "none";
}
function Dh(e) {
  return e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle == "function" ? e.ownerDocument.defaultView.getComputedStyle : typeof getComputedStyle == "function" ? getComputedStyle : null;
}
var Rh = /* @__PURE__ */ function() {
  var e = [
    "<office:master-styles>",
    '<style:master-page style:name="mp1" style:page-layout-name="mp1">',
    "<style:header/>",
    '<style:header-left style:display="false"/>',
    "<style:footer/>",
    '<style:footer-left style:display="false"/>',
    "</style:master-page>",
    "</office:master-styles>"
  ].join(""), t = "<office:document-styles " + dn({
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
    return Ze + t;
  };
}(), k0 = /* @__PURE__ */ function() {
  var e = function(i) {
    return Re(i).replace(/  +/g, function(s) {
      return '<text:s text:c="' + s.length + '"/>';
    }).replace(/\t/g, "<text:tab/>").replace(/\n/g, "</text:p><text:p>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>");
  }, t = `          <table:table-cell />
`, r = `          <table:covered-table-cell/>
`, n = function(i, s, f) {
    var o = [];
    o.push('      <table:table table:name="' + Re(s.SheetNames[f]) + `" table:style-name="ta1">
`);
    var l = 0, u = 0, d = Rr(i["!ref"] || "A1"), x = i["!merges"] || [], p = 0, g = Array.isArray(i);
    if (i["!cols"])
      for (u = 0; u <= d.e.c; ++u) o.push("        <table:table-column" + (i["!cols"][u] ? ' table:style-name="co' + i["!cols"][u].ods + '"' : "") + `></table:table-column>
`);
    var h = "", T = i["!rows"] || [];
    for (l = 0; l < d.s.r; ++l)
      h = T[l] ? ' table:style-name="ro' + T[l].ods + '"' : "", o.push("        <table:table-row" + h + `></table:table-row>
`);
    for (; l <= d.e.r; ++l) {
      for (h = T[l] ? ' table:style-name="ro' + T[l].ods + '"' : "", o.push("        <table:table-row" + h + `>
`), u = 0; u < d.s.c; ++u) o.push(t);
      for (; u <= d.e.c; ++u) {
        var D = !1, k = {}, C = "";
        for (p = 0; p != x.length; ++p)
          if (!(x[p].s.c > u) && !(x[p].s.r > l) && !(x[p].e.c < u) && !(x[p].e.r < l)) {
            (x[p].s.c != u || x[p].s.r != l) && (D = !0), k["table:number-columns-spanned"] = x[p].e.c - x[p].s.c + 1, k["table:number-rows-spanned"] = x[p].e.r - x[p].s.r + 1;
            break;
          }
        if (D) {
          o.push(r);
          continue;
        }
        var U = Ne({ r: l, c: u }), q = g ? (i[l] || [])[u] : i[U];
        if (q && q.f && (k["table:formula"] = Re(qu(q.f)), q.F && q.F.slice(0, U.length) == U)) {
          var te = Rr(q.F);
          k["table:number-matrix-columns-spanned"] = te.e.c - te.s.c + 1, k["table:number-matrix-rows-spanned"] = te.e.r - te.s.r + 1;
        }
        if (!q) {
          o.push(t);
          continue;
        }
        switch (q.t) {
          case "b":
            C = q.v ? "TRUE" : "FALSE", k["office:value-type"] = "boolean", k["office:boolean-value"] = q.v ? "true" : "false";
            break;
          case "n":
            C = q.w || String(q.v || 0), k["office:value-type"] = "float", k["office:value"] = q.v || 0;
            break;
          case "s":
          case "str":
            C = q.v == null ? "" : q.v, k["office:value-type"] = "string";
            break;
          case "d":
            C = q.w || Tr(q.v).toISOString(), k["office:value-type"] = "date", k["office:date-value"] = Tr(q.v).toISOString(), k["table:style-name"] = "ce1";
            break;
          default:
            o.push(t);
            continue;
        }
        var I = e(C);
        if (q.l && q.l.Target) {
          var V = q.l.Target;
          V = V.charAt(0) == "#" ? "#" + Qu(V.slice(1)) : V, V.charAt(0) != "#" && !V.match(/^\w+:/) && (V = "../" + V), I = ee("text:a", I, { "xlink:href": V.replace(/&/g, "&amp;") });
        }
        o.push("          " + ee("table:table-cell", ee("text:p", I, {}), k) + `
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
        for (var u = 0; u < l["!cols"].length; ++u) if (l["!cols"][u]) {
          var d = l["!cols"][u];
          if (d.width == null && d.wpx == null && d.wch == null) continue;
          ba(d), d.ods = f;
          var x = l["!cols"][u].wpx + "px";
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
        for (var u = 0; u < l["!rows"].length; ++u) if (l["!rows"][u]) {
          l["!rows"][u].ods = o;
          var d = l["!rows"][u].hpx + "px";
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
    var o = [Ze], l = dn({
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
    }), u = dn({
      "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
      "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
    });
    f.bookType == "fods" ? (o.push("<office:document" + l + u + `>
`), o.push(Ei().replace(/office:document-meta/g, "office:meta"))) : o.push("<office:document-content" + l + `>
`), a(o, s), o.push(`  <office:body>
`), o.push(`    <office:spreadsheet>
`);
    for (var d = 0; d != s.SheetNames.length; ++d) o.push(n(s.Sheets[s.SheetNames[d]], s, d));
    return o.push(`    </office:spreadsheet>
`), o.push(`  </office:body>
`), f.bookType == "fods" ? o.push("</office:document>") : o.push("</office:document-content>"), o.join("");
  };
}();
function fs(e, t) {
  if (t.bookType == "fods") return k0(e, t);
  var r = Ca(), n = "", a = [], i = [];
  return n = "mimetype", Ee(r, n, "application/vnd.oasis.opendocument.spreadsheet"), n = "content.xml", Ee(r, n, k0(e, t)), a.push([n, "text/xml"]), i.push([n, "ContentFile"]), n = "styles.xml", Ee(r, n, Rh(e, t)), a.push([n, "text/xml"]), i.push([n, "StylesFile"]), n = "meta.xml", Ee(r, n, Ze + Ei(
    /*::wb, opts*/
  )), a.push([n, "text/xml"]), i.push([n, "MetadataFile"]), n = "manifest.rdf", Ee(r, n, Gf(
    i
    /*, opts*/
  )), a.push([n, "application/rdf+xml"]), n = "META-INF/manifest.xml", Ee(r, n, Wf(
    a
    /*, opts*/
  )), r;
}
/*! sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
function qn(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function Nh(e) {
  return typeof TextEncoder < "u" ? new TextEncoder().encode(e) : Wr(xn(e));
}
function Ph(e, t) {
  e:
    for (var r = 0; r <= e.length - t.length; ++r) {
      for (var n = 0; n < t.length; ++n)
        if (e[r + n] != t[n])
          continue e;
      return !0;
    }
  return !1;
}
function ut(e) {
  var t = e.reduce(function(a, i) {
    return a + i.length;
  }, 0), r = new Uint8Array(t), n = 0;
  return e.forEach(function(a) {
    r.set(a, n), n += a.length;
  }), r;
}
function Lh(e, t, r) {
  var n = Math.floor(r == 0 ? 0 : Math.LOG10E * Math.log(Math.abs(r))) + 6176 - 20, a = r / Math.pow(10, n - 6176);
  e[t + 15] |= n >> 7, e[t + 14] |= (n & 127) << 1;
  for (var i = 0; a >= 1; ++i, a /= 256)
    e[t + i] = a & 255;
  e[t + 15] |= r >= 0 ? 0 : 128;
}
function pn(e, t) {
  var r = t ? t[0] : 0, n = e[r] & 127;
  e:
    if (e[r++] >= 128 && (n |= (e[r] & 127) << 7, e[r++] < 128 || (n |= (e[r] & 127) << 14, e[r++] < 128) || (n |= (e[r] & 127) << 21, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 28), ++r, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 35), ++r, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 42), ++r, e[r++] < 128)))
      break e;
  return t && (t[0] = r), n;
}
function ke(e) {
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
function Ut(e) {
  var t = 0, r = e[t] & 127;
  e:
    if (e[t++] >= 128) {
      if (r |= (e[t] & 127) << 7, e[t++] < 128 || (r |= (e[t] & 127) << 14, e[t++] < 128) || (r |= (e[t] & 127) << 21, e[t++] < 128))
        break e;
      r |= (e[t] & 127) << 28;
    }
  return r;
}
function Qe(e) {
  for (var t = [], r = [0]; r[0] < e.length; ) {
    var n = r[0], a = pn(e, r), i = a & 7;
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
        s = pn(e, r), f = e.slice(r[0], r[0] + s), r[0] += s;
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
function sr(e) {
  var t = [];
  return e.forEach(function(r, n) {
    r.forEach(function(a) {
      a.data && (t.push(ke(n * 8 + a.type)), a.type == 2 && t.push(ke(a.data.length)), t.push(a.data));
    });
  }), ut(t);
}
function Ur(e) {
  for (var t, r = [], n = [0]; n[0] < e.length; ) {
    var a = pn(e, n), i = Qe(e.slice(n[0], n[0] + a));
    n[0] += a;
    var s = {
      id: Ut(i[1][0].data),
      messages: []
    };
    i[2].forEach(function(f) {
      var o = Qe(f.data), l = Ut(o[3][0].data);
      s.messages.push({
        meta: o,
        data: e.slice(n[0], n[0] + l)
      }), n[0] += l;
    }), (t = i[3]) != null && t[0] && (s.merge = Ut(i[3][0].data) >>> 0 > 0), r.push(s);
  }
  return r;
}
function Rt(e) {
  var t = [];
  return e.forEach(function(r) {
    var n = [];
    n[1] = [{ data: ke(r.id), type: 0 }], n[2] = [], r.merge != null && (n[3] = [{ data: ke(+!!r.merge), type: 0 }]);
    var a = [];
    r.messages.forEach(function(s) {
      a.push(s.data), s.meta[3] = [{ type: 0, data: ke(s.data.length) }], n[2].push({ data: sr(s.meta), type: 2 });
    });
    var i = sr(n);
    t.push(ke(i.length)), t.push(i), a.forEach(function(s) {
      return t.push(s);
    });
  }), ut(t);
}
function Mh(e, t) {
  if (e != 0)
    throw new Error("Unexpected Snappy chunk type ".concat(e));
  for (var r = [0], n = pn(t, r), a = []; r[0] < t.length; ) {
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
      if (i == 1 ? (l = (t[r[0]] >> 2 & 7) + 4, o = (t[r[0]++] & 224) << 3, o |= t[r[0]++]) : (l = (t[r[0]++] >> 2) + 1, i == 2 ? (o = t[r[0]] | t[r[0] + 1] << 8, r[0] += 2) : (o = (t[r[0]] | t[r[0] + 1] << 8 | t[r[0] + 2] << 16 | t[r[0] + 3] << 24) >>> 0, r[0] += 4)), a = [ut(a)], o == 0)
        throw new Error("Invalid offset 0");
      if (o > a[0].length)
        throw new Error("Invalid offset beyond length");
      if (l >= o)
        for (a.push(a[0].slice(-o)), l -= o; l >= a[a.length - 1].length; )
          a.push(a[a.length - 1]), l -= a[a.length - 1].length;
      a.push(a[0].slice(-o, -o + l));
    }
  }
  var u = ut(a);
  if (u.length != n)
    throw new Error("Unexpected length: ".concat(u.length, " != ").concat(n));
  return u;
}
function Vr(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var n = e[r++], a = e[r] | e[r + 1] << 8 | e[r + 2] << 16;
    r += 3, t.push(Mh(n, e.slice(r, r + a))), r += a;
  }
  if (r !== e.length)
    throw new Error("data is not a valid framed stream!");
  return ut(t);
}
function Nt(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var n = Math.min(e.length - r, 268435455), a = new Uint8Array(4);
    t.push(a);
    var i = ke(n), s = i.length;
    t.push(i), n <= 60 ? (s++, t.push(new Uint8Array([n - 1 << 2]))) : n <= 256 ? (s += 2, t.push(new Uint8Array([240, n - 1 & 255]))) : n <= 65536 ? (s += 3, t.push(new Uint8Array([244, n - 1 & 255, n - 1 >> 8 & 255]))) : n <= 16777216 ? (s += 4, t.push(new Uint8Array([248, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255]))) : n <= 4294967296 && (s += 5, t.push(new Uint8Array([252, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255, n - 1 >>> 24 & 255]))), t.push(e.slice(r, r + n)), s += n, a[0] = 0, a[1] = s & 255, a[2] = s >> 8 & 255, a[3] = s >> 16 & 255, r += n;
  }
  return ut(t);
}
function ma(e, t) {
  var r = new Uint8Array(32), n = qn(r), a = 12, i = 0;
  switch (r[0] = 5, e.t) {
    case "n":
      r[1] = 2, Lh(r, a, e.v), i |= 1, a += 16;
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
function ga(e, t) {
  var r = new Uint8Array(32), n = qn(r), a = 12, i = 0;
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
function it(e) {
  var t = Qe(e);
  return pn(t[1][0].data);
}
function Bh(e, t, r) {
  var n, a, i, s;
  if (!((n = e[6]) != null && n[0]) || !((a = e[7]) != null && a[0]))
    throw "Mutation only works on post-BNC storages!";
  var f = ((s = (i = e[8]) == null ? void 0 : i[0]) == null ? void 0 : s.data) && Ut(e[8][0].data) > 0 || !1;
  if (f)
    throw "Math only works with normal offsets";
  for (var o = 0, l = qn(e[7][0].data), u = 0, d = [], x = qn(e[4][0].data), p = 0, g = [], h = 0; h < t.length; ++h) {
    if (t[h] == null) {
      l.setUint16(h * 2, 65535, !0), x.setUint16(h * 2, 65535);
      continue;
    }
    l.setUint16(h * 2, u, !0), x.setUint16(h * 2, p, !0);
    var T, D;
    switch (typeof t[h]) {
      case "string":
        T = ma({ t: "s", v: t[h] }, r), D = ga({ t: "s", v: t[h] }, r);
        break;
      case "number":
        T = ma({ t: "n", v: t[h] }, r), D = ga({ t: "n", v: t[h] }, r);
        break;
      case "boolean":
        T = ma({ t: "b", v: t[h] }, r), D = ga({ t: "b", v: t[h] }, r);
        break;
      default:
        throw new Error("Unsupported value " + t[h]);
    }
    d.push(T), u += T.length, g.push(D), p += D.length, ++o;
  }
  for (e[2][0].data = ke(o); h < e[7][0].data.length / 2; ++h)
    l.setUint16(h * 2, 65535, !0), x.setUint16(h * 2, 65535, !0);
  return e[6][0].data = ut(d), e[3][0].data = ut(g), o;
}
function bh(e, t) {
  if (!t || !t.numbers)
    throw new Error("Must pass a `numbers` option -- check the README");
  var r = e.Sheets[e.SheetNames[0]];
  e.SheetNames.length > 1 && console.error("The Numbers writer currently writes only the first table");
  var n = Rr(r["!ref"]);
  n.s.r = n.s.c = 0;
  var a = !1;
  n.e.c > 9 && (a = !0, n.e.c = 9), n.e.r > 49 && (a = !0, n.e.r = 49), a && console.error("The Numbers writer is currently limited to ".concat(Je(n)));
  var i = Qn(r, { range: n, header: 1 }), s = ["~Sh33tJ5~"];
  i.forEach(function(M) {
    return M.forEach(function(F) {
      typeof F == "string" && s.push(F);
    });
  });
  var f = {}, o = [], l = Le.read(t.numbers, { type: "base64" });
  l.FileIndex.map(function(M, F) {
    return [M, l.FullPaths[F]];
  }).forEach(function(M) {
    var F = M[0], y = M[1];
    if (F.type == 2 && F.name.match(/\.iwa/)) {
      var X = F.content, he = Vr(X), xe = Ur(he);
      xe.forEach(function(oe) {
        o.push(oe.id), f[oe.id] = { deps: [], location: y, type: Ut(oe.messages[0].meta[1][0].data) };
      });
    }
  }), o.sort(function(M, F) {
    return M - F;
  });
  var u = o.filter(function(M) {
    return M > 1;
  }).map(function(M) {
    return [M, ke(M)];
  });
  l.FileIndex.map(function(M, F) {
    return [M, l.FullPaths[F]];
  }).forEach(function(M) {
    var F = M[0];
    if (M[1], !!F.name.match(/\.iwa/)) {
      var y = Ur(Vr(F.content));
      y.forEach(function(X) {
        X.messages.forEach(function(he) {
          u.forEach(function(xe) {
            X.messages.some(function(oe) {
              return Ut(oe.meta[1][0].data) != 11006 && Ph(oe.data, xe[1]);
            }) && f[xe[0]].deps.push(X.id);
          });
        });
      });
    }
  });
  for (var d = Le.find(l, f[1].location), x = Ur(Vr(d.content)), p, g = 0; g < x.length; ++g) {
    var h = x[g];
    h.id == 1 && (p = h);
  }
  var T = it(Qe(p.messages[0].data)[1][0].data);
  for (d = Le.find(l, f[T].location), x = Ur(Vr(d.content)), g = 0; g < x.length; ++g)
    h = x[g], h.id == T && (p = h);
  for (T = it(Qe(p.messages[0].data)[2][0].data), d = Le.find(l, f[T].location), x = Ur(Vr(d.content)), g = 0; g < x.length; ++g)
    h = x[g], h.id == T && (p = h);
  for (T = it(Qe(p.messages[0].data)[2][0].data), d = Le.find(l, f[T].location), x = Ur(Vr(d.content)), g = 0; g < x.length; ++g)
    h = x[g], h.id == T && (p = h);
  var D = Qe(p.messages[0].data);
  {
    D[6][0].data = ke(n.e.r + 1), D[7][0].data = ke(n.e.c + 1);
    var k = it(D[46][0].data), C = Le.find(l, f[k].location), U = Ur(Vr(C.content));
    {
      for (var q = 0; q < U.length && U[q].id != k; ++q)
        ;
      if (U[q].id != k)
        throw "Bad ColumnRowUIDMapArchive";
      var te = Qe(U[q].messages[0].data);
      te[1] = [], te[2] = [], te[3] = [];
      for (var I = 0; I <= n.e.c; ++I) {
        var V = [];
        V[1] = V[2] = [{ type: 0, data: ke(I + 420690) }], te[1].push({ type: 2, data: sr(V) }), te[2].push({ type: 0, data: ke(I) }), te[3].push({ type: 0, data: ke(I) });
      }
      te[4] = [], te[5] = [], te[6] = [];
      for (var b = 0; b <= n.e.r; ++b)
        V = [], V[1] = V[2] = [{ type: 0, data: ke(b + 726270) }], te[4].push({ type: 2, data: sr(V) }), te[5].push({ type: 0, data: ke(b) }), te[6].push({ type: 0, data: ke(b) });
      U[q].messages[0].data = sr(te);
    }
    C.content = Nt(Rt(U)), C.size = C.content.length, delete D[46];
    var j = Qe(D[4][0].data);
    {
      j[7][0].data = ke(n.e.r + 1);
      var Y = Qe(j[1][0].data), J = it(Y[2][0].data);
      C = Le.find(l, f[J].location), U = Ur(Vr(C.content));
      {
        if (U[0].id != J)
          throw "Bad HeaderStorageBucket";
        var ie = Qe(U[0].messages[0].data);
        for (b = 0; b < i.length; ++b) {
          var ye = Qe(ie[2][0].data);
          ye[1][0].data = ke(b), ye[4][0].data = ke(i[b].length), ie[2][b] = { type: ie[2][0].type, data: sr(ye) };
        }
        U[0].messages[0].data = sr(ie);
      }
      C.content = Nt(Rt(U)), C.size = C.content.length;
      var de = it(j[2][0].data);
      C = Le.find(l, f[de].location), U = Ur(Vr(C.content));
      {
        if (U[0].id != de)
          throw "Bad HeaderStorageBucket";
        for (ie = Qe(U[0].messages[0].data), I = 0; I <= n.e.c; ++I)
          ye = Qe(ie[2][0].data), ye[1][0].data = ke(I), ye[4][0].data = ke(n.e.r + 1), ie[2][I] = { type: ie[2][0].type, data: sr(ye) };
        U[0].messages[0].data = sr(ie);
      }
      C.content = Nt(Rt(U)), C.size = C.content.length;
      var ve = it(j[4][0].data);
      (function() {
        for (var M = Le.find(l, f[ve].location), F = Ur(Vr(M.content)), y, X = 0; X < F.length; ++X) {
          var he = F[X];
          he.id == ve && (y = he);
        }
        var xe = Qe(y.messages[0].data);
        {
          xe[3] = [];
          var oe = [];
          s.forEach(function(me, ze) {
            oe[1] = [{ type: 0, data: ke(ze) }], oe[2] = [{ type: 0, data: ke(1) }], oe[3] = [{ type: 2, data: Nh(me) }], xe[3].push({ type: 2, data: sr(oe) });
          });
        }
        y.messages[0].data = sr(xe);
        var ne = Rt(F), Ce = Nt(ne);
        M.content = Ce, M.size = M.content.length;
      })();
      var be = Qe(j[3][0].data);
      {
        var yr = be[1][0];
        delete be[2];
        var Xe = Qe(yr.data);
        {
          var Er = it(Xe[2][0].data);
          (function() {
            for (var M = Le.find(l, f[Er].location), F = Ur(Vr(M.content)), y, X = 0; X < F.length; ++X) {
              var he = F[X];
              he.id == Er && (y = he);
            }
            var xe = Qe(y.messages[0].data);
            {
              delete xe[6], delete be[7];
              var oe = new Uint8Array(xe[5][0].data);
              xe[5] = [];
              for (var ne = 0, Ce = 0; Ce <= n.e.r; ++Ce) {
                var me = Qe(oe);
                ne += Bh(me, i[Ce], s), me[1][0].data = ke(Ce), xe[5].push({ data: sr(me), type: 2 });
              }
              xe[1] = [{ type: 0, data: ke(n.e.c + 1) }], xe[2] = [{ type: 0, data: ke(n.e.r + 1) }], xe[3] = [{ type: 0, data: ke(ne) }], xe[4] = [{ type: 0, data: ke(n.e.r + 1) }];
            }
            y.messages[0].data = sr(xe);
            var ze = Rt(F), Se = Nt(ze);
            M.content = Se, M.size = M.content.length;
          })();
        }
        yr.data = sr(Xe);
      }
      j[3][0].data = sr(be);
    }
    D[4][0].data = sr(j);
  }
  p.messages[0].data = sr(D);
  var pr = Rt(x), A = Nt(pr);
  return d.content = A, d.size = d.content.length, l;
}
function Uh(e) {
  return function(r) {
    for (var n = 0; n != e.length; ++n) {
      var a = e[n];
      r[a[0]] === void 0 && (r[a[0]] = a[1]), a[2] === "n" && (r[a[0]] = Number(r[a[0]]));
    }
  };
}
function Ga(e) {
  Uh([
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
function Vh(e, t) {
  return t.bookType == "ods" ? fs(e, t) : t.bookType == "numbers" ? bh(e, t) : t.bookType == "xlsb" ? Wh(e, t) : Hh(e, t);
}
function Wh(e, t) {
  Lt = 1024, e && !e.SSF && (e.SSF = Fr(Ge)), e && e.SSF && (ta(), ra(e.SSF), t.revssf = na(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, on ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = t.bookType == "xlsb" ? "bin" : "xml", n = Gi.indexOf(t.bookType) > -1, a = gi();
  Ga(t = t || {});
  var i = Ca(), s = "", f = 0;
  if (t.cellXfs = [], ct(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", Ee(i, s, wi(e.Props, t)), a.coreprops.push(s), De(t.rels, 2, s, Oe.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var o = [], l = 0; l < e.SheetNames.length; ++l)
      (e.Workbook.Sheets[l] || {}).Hidden != 2 && o.push(e.SheetNames[l]);
    e.Props.SheetNames = o;
  }
  for (e.Props.Worksheets = e.Props.SheetNames.length, Ee(i, s, Ai(e.Props)), a.extprops.push(s), De(t.rels, 3, s, Oe.EXT_PROPS), e.Custprops !== e.Props && cr(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", Ee(i, s, Fi(e.Custprops)), a.custprops.push(s), De(t.rels, 4, s, Oe.CUST_PROPS)), f = 1; f <= e.SheetNames.length; ++f) {
    var u = { "!id": {} }, d = e.Sheets[e.SheetNames[f - 1]], x = (d || {})["!type"] || "sheet";
    switch (x) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + r, Ee(i, s, X1(f - 1, s, t, e, u)), a.sheets.push(s), De(t.wbrels, -1, "worksheets/sheet" + f + "." + r, Oe.WS[0]);
    }
    if (d) {
      var p = d["!comments"], g = !1, h = "";
      p && p.length > 0 && (h = "xl/comments" + f + "." + r, Ee(i, h, j1(p, h)), a.comments.push(h), De(u, -1, "../comments" + f + "." + r, Oe.CMNT), g = !0), d["!legacy"] && g && Ee(i, "xl/drawings/vmlDrawing" + f + ".vml", Wi(f, d["!comments"])), delete d["!comments"], delete d["!legacy"];
    }
    u["!id"].rId1 && Ee(i, Ti(s), Bt(u));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, Ee(i, s, $1(t.Strings, s, t)), a.strs.push(s), De(t.wbrels, -1, "sharedStrings." + r, Oe.SST)), s = "xl/workbook." + r, Ee(i, s, G1(e, s)), a.workbooks.push(s), De(t.rels, 1, s, Oe.WB), s = "xl/theme/theme1.xml", Ee(i, s, Ui(e.Themes, t)), a.themes.push(s), De(t.wbrels, -1, "theme/theme1.xml", Oe.THEME), s = "xl/styles." + r, Ee(i, s, z1(e, s, t)), a.styles.push(s), De(t.wbrels, -1, "styles." + r, Oe.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", Ee(i, s, e.vbaraw), a.vba.push(s), De(t.wbrels, -1, "vbaProject.bin", Oe.VBA)), s = "xl/metadata." + r, Ee(i, s, K1(s)), a.metadata.push(s), De(t.wbrels, -1, "metadata." + r, Oe.XLMETA), Ee(i, "[Content_Types].xml", _i(a, t)), Ee(i, "_rels/.rels", Bt(t.rels)), Ee(i, "xl/_rels/workbook." + r + ".rels", Bt(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function Hh(e, t) {
  Lt = 1024, e && !e.SSF && (e.SSF = Fr(Ge)), e && e.SSF && (ta(), ra(e.SSF), t.revssf = na(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, on ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = "xml", n = Gi.indexOf(t.bookType) > -1, a = gi();
  Ga(t = t || {});
  var i = Ca(), s = "", f = 0;
  if (t.cellXfs = [], ct(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", Ee(i, s, wi(e.Props, t)), a.coreprops.push(s), De(t.rels, 2, s, Oe.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var o = [], l = 0; l < e.SheetNames.length; ++l)
      (e.Workbook.Sheets[l] || {}).Hidden != 2 && o.push(e.SheetNames[l]);
    e.Props.SheetNames = o;
  }
  e.Props.Worksheets = e.Props.SheetNames.length, Ee(i, s, Ai(e.Props)), a.extprops.push(s), De(t.rels, 3, s, Oe.EXT_PROPS), e.Custprops !== e.Props && cr(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", Ee(i, s, Fi(e.Custprops)), a.custprops.push(s), De(t.rels, 4, s, Oe.CUST_PROPS));
  var u = ["SheetJ5"];
  for (t.tcid = 0, f = 1; f <= e.SheetNames.length; ++f) {
    var d = { "!id": {} }, x = e.Sheets[e.SheetNames[f - 1]], p = (x || {})["!type"] || "sheet";
    switch (p) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + r, Ee(i, s, qi(f - 1, t, e, d)), a.sheets.push(s), De(t.wbrels, -1, "worksheets/sheet" + f + "." + r, Oe.WS[0]);
    }
    if (x) {
      var g = x["!comments"], h = !1, T = "";
      if (g && g.length > 0) {
        var D = !1;
        g.forEach(function(k) {
          k[1].forEach(function(C) {
            C.T == !0 && (D = !0);
          });
        }), D && (T = "xl/threadedComments/threadedComment" + f + "." + r, Ee(i, T, _o(g, u, t)), a.threadedcomments.push(T), De(d, -1, "../threadedComments/threadedComment" + f + "." + r, Oe.TCMNT)), T = "xl/comments" + f + "." + r, Ee(i, T, Hi(g)), a.comments.push(T), De(d, -1, "../comments" + f + "." + r, Oe.CMNT), h = !0;
      }
      x["!legacy"] && h && Ee(i, "xl/drawings/vmlDrawing" + f + ".vml", Wi(f, x["!comments"])), delete x["!comments"], delete x["!legacy"];
    }
    d["!id"].rId1 && Ee(i, Ti(s), Bt(d));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, Ee(i, s, Ni(t.Strings, t)), a.strs.push(s), De(t.wbrels, -1, "sharedStrings." + r, Oe.SST)), s = "xl/workbook." + r, Ee(i, s, rs(e)), a.workbooks.push(s), De(t.rels, 1, s, Oe.WB), s = "xl/theme/theme1.xml", Ee(i, s, Ui(e.Themes, t)), a.themes.push(s), De(t.wbrels, -1, "theme/theme1.xml", Oe.THEME), s = "xl/styles." + r, Ee(i, s, Bi(e, t)), a.styles.push(s), De(t.wbrels, -1, "styles." + r, Oe.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", Ee(i, s, e.vbaraw), a.vba.push(s), De(t.wbrels, -1, "vbaProject.bin", Oe.VBA)), s = "xl/metadata." + r, Ee(i, s, Vi()), a.metadata.push(s), De(t.wbrels, -1, "metadata." + r, Oe.XLMETA), u.length > 1 && (s = "xl/persons/person.xml", Ee(i, s, To(u)), a.people.push(s), De(t.wbrels, -1, "persons/person.xml", Oe.PEOPLE)), Ee(i, "[Content_Types].xml", _i(a, t)), Ee(i, "_rels/.rels", Bt(t.rels)), Ee(i, "xl/_rels/workbook." + r + ".rels", Bt(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function Gh(e, t) {
  var r = "";
  switch ((t || {}).type || "base64") {
    case "buffer":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    case "base64":
      r = rt(e.slice(0, 12));
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
function ls(e, t) {
  switch (t.type) {
    case "base64":
    case "binary":
      break;
    case "buffer":
    case "array":
      t.type = "";
      break;
    case "file":
      return gn(t.file, Le.write(e, { type: Ie ? "buffer" : "" }));
    case "string":
      throw new Error("'string' output type invalid for '" + t.bookType + "' files");
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  return Le.write(e, t);
}
function Xh(e, t) {
  var r = Fr(t || {}), n = Vh(e, r);
  return zh(n, r);
}
function zh(e, t) {
  var r = {}, n = Ie ? "nodebuffer" : typeof Uint8Array < "u" ? "array" : "string";
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
  var a = e.FullPaths ? Le.write(e, { fileType: "zip", type: (
    /*::(*/
    { nodebuffer: "buffer", string: "binary" }[r.type] || r.type
  ), compression: !!t.compression }) : e.generate(r);
  if (typeof Deno < "u" && typeof a == "string") {
    if (t.type == "binary" || t.type == "base64") return a;
    a = new Uint8Array(ea(a));
  }
  return t.password && typeof encrypt_agile < "u" ? ls(encrypt_agile(a, t.password), t) : t.type === "file" ? gn(t.file, a) : t.type == "string" ? an(
    /*::(*/
    a
    /*:: :any)*/
  ) : a;
}
function $h(e, t) {
  var r = t || {}, n = lh(e, r);
  return ls(n, r);
}
function $r(e, t, r) {
  r || (r = "");
  var n = r + e;
  switch (t.type) {
    case "base64":
      return cn(xn(n));
    case "binary":
      return xn(n);
    case "string":
      return e;
    case "file":
      return gn(t.file, n, "utf8");
    case "buffer":
      return Ie ? nt(n, "utf8") : typeof TextEncoder < "u" ? new TextEncoder().encode(n) : $r(n, { type: "binary" }).split("").map(function(a) {
        return a.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function jh(e, t) {
  switch (t.type) {
    case "base64":
      return cn(e);
    case "binary":
      return e;
    case "string":
      return e;
    case "file":
      return gn(t.file, e, "binary");
    case "buffer":
      return Ie ? nt(e, "binary") : e.split("").map(function(r) {
        return r.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function bn(e, t) {
  switch (t.type) {
    case "string":
    case "base64":
    case "binary":
      for (var r = "", n = 0; n < e.length; ++n) r += String.fromCharCode(e[n]);
      return t.type == "base64" ? cn(r) : t.type == "string" ? an(r) : r;
    case "file":
      return gn(t.file, e);
    case "buffer":
      return e;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
}
function os(e, t) {
  _s(), R1(e);
  var r = Fr(t || {});
  if (r.cellStyles && (r.cellNF = !0, r.sheetStubs = !0), r.type == "array") {
    r.type = "binary";
    var n = os(e, r);
    return r.type = "array", ea(n);
  }
  var a = 0;
  if (r.sheet && (typeof r.sheet == "number" ? a = r.sheet : a = e.SheetNames.indexOf(r.sheet), !e.SheetNames[a]))
    throw new Error("Sheet not found: " + r.sheet + " : " + typeof r.sheet);
  switch (r.bookType || "xlsb") {
    case "xml":
    case "xlml":
      return $r(sh(e, r), r);
    case "slk":
    case "sylk":
      return $r(Ol.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "htm":
    case "html":
      return $r(as(e.Sheets[e.SheetNames[a]], r), r);
    case "txt":
      return jh(us(e.Sheets[e.SheetNames[a]], r), r);
    case "csv":
      return $r(Xa(e.Sheets[e.SheetNames[a]], r), r, "\uFEFF");
    case "dif":
      return $r(Il.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "dbf":
      return bn(Cl.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "prn":
      return $r(kl.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "rtf":
      return $r(Bl.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "eth":
      return $r(Ri.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "fods":
      return $r(fs(e, r), r);
    case "wk1":
      return bn(S0.sheet_to_wk1(e.Sheets[e.SheetNames[a]], r), r);
    case "wk3":
      return bn(S0.book_to_wk3(e, r), r);
    case "biff2":
      r.biff || (r.biff = 2);
    case "biff3":
      r.biff || (r.biff = 3);
    case "biff4":
      return r.biff || (r.biff = 4), bn(ns(e, r), r);
    case "biff5":
      r.biff || (r.biff = 5);
    case "biff8":
    case "xla":
    case "xls":
      return r.biff || (r.biff = 8), $h(e, r);
    case "xlsx":
    case "xlsm":
    case "xlam":
    case "xlsb":
    case "numbers":
    case "ods":
      return Xh(e, r);
    default:
      throw new Error("Unrecognized bookType |" + r.bookType + "|");
  }
}
function Kh(e) {
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
function Yh(e, t, r) {
  var n = {};
  return n.type = "file", n.file = t, Kh(n), os(e, n);
}
function Jh(e, t, r, n, a, i, s, f) {
  var o = ur(r), l = f.defval, u = f.raw || !Object.prototype.hasOwnProperty.call(f, "raw"), d = !0, x = a === 1 ? [] : {};
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
    var h = g.v;
    switch (g.t) {
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
        throw new Error("unrecognized type " + g.t);
    }
    if (i[p] != null) {
      if (h == null)
        if (g.t == "e" && h === null) x[i[p]] = null;
        else if (l !== void 0) x[i[p]] = l;
        else if (u && h === null) x[i[p]] = null;
        else continue;
      else
        x[i[p]] = u && (g.t !== "n" || g.t === "n" && f.rawNumbers !== !1) ? h : tt(g, h, f);
      h != null && (d = !1);
    }
  }
  return { row: x, isempty: d };
}
function Qn(e, t) {
  if (e == null || e["!ref"] == null) return [];
  var r = { t: "n", v: 0 }, n = 0, a = 1, i = [], s = 0, f = "", o = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, l = t || {}, u = l.range != null ? l.range : e["!ref"];
  switch (l.header === 1 ? n = 1 : l.header === "A" ? n = 2 : Array.isArray(l.header) ? n = 3 : l.header == null && (n = 0), typeof u) {
    case "string":
      o = Be(u);
      break;
    case "number":
      o = Be(e["!ref"]), o.s.r = u;
      break;
    default:
      o = u;
  }
  n > 0 && (a = 0);
  var d = ur(o.s.r), x = [], p = [], g = 0, h = 0, T = Array.isArray(e), D = o.s.r, k = 0, C = {};
  T && !e[D] && (e[D] = []);
  var U = l.skipHidden && e["!cols"] || [], q = l.skipHidden && e["!rows"] || [];
  for (k = o.s.c; k <= o.e.c; ++k)
    if (!(U[k] || {}).hidden)
      switch (x[k] = xr(k), r = T ? e[D][k] : e[x[k] + d], n) {
        case 1:
          i[k] = k - o.s.c;
          break;
        case 2:
          i[k] = x[k];
          break;
        case 3:
          i[k] = l.header[k - o.s.c];
          break;
        default:
          if (r == null && (r = { w: "__EMPTY", t: "s" }), f = s = tt(r, null, l), h = C[s] || 0, !h) C[s] = 1;
          else {
            do
              f = s + "_" + h++;
            while (C[f]);
            C[s] = h, C[f] = 1;
          }
          i[k] = f;
      }
  for (D = o.s.r + a; D <= o.e.r; ++D)
    if (!(q[D] || {}).hidden) {
      var te = Jh(e, o, D, x, n, i, T, l);
      (te.isempty === !1 || (n === 1 ? l.blankrows !== !1 : l.blankrows)) && (p[g++] = te.row);
    }
  return p.length = g, p;
}
var D0 = /"/g;
function Zh(e, t, r, n, a, i, s, f) {
  for (var o = !0, l = [], u = "", d = ur(r), x = t.s.c; x <= t.e.c; ++x)
    if (n[x]) {
      var p = f.dense ? (e[r] || [])[x] : e[n[x] + d];
      if (p == null) u = "";
      else if (p.v != null) {
        o = !1, u = "" + (f.rawNumbers && p.t == "n" ? p.v : tt(p, null, f));
        for (var g = 0, h = 0; g !== u.length; ++g) if ((h = u.charCodeAt(g)) === a || h === i || h === 34 || f.forceQuotes) {
          u = '"' + u.replace(D0, '""') + '"';
          break;
        }
        u == "ID" && (u = '"ID"');
      } else p.f != null && !p.F ? (o = !1, u = "=" + p.f, u.indexOf(",") >= 0 && (u = '"' + u.replace(D0, '""') + '"')) : u = "";
      l.push(u);
    }
  return f.blankrows === !1 && o ? null : l.join(s);
}
function Xa(e, t) {
  var r = [], n = t ?? {};
  if (e == null || e["!ref"] == null) return "";
  var a = Be(e["!ref"]), i = n.FS !== void 0 ? n.FS : ",", s = i.charCodeAt(0), f = n.RS !== void 0 ? n.RS : `
`, o = f.charCodeAt(0), l = new RegExp((i == "|" ? "\\|" : i) + "+$"), u = "", d = [];
  n.dense = Array.isArray(e);
  for (var x = n.skipHidden && e["!cols"] || [], p = n.skipHidden && e["!rows"] || [], g = a.s.c; g <= a.e.c; ++g) (x[g] || {}).hidden || (d[g] = xr(g));
  for (var h = 0, T = a.s.r; T <= a.e.r; ++T)
    (p[T] || {}).hidden || (u = Zh(e, a, T, d, s, o, i, n), u != null && (n.strip && (u = u.replace(l, "")), (u || n.blankrows !== !1) && r.push((h++ ? f : "") + u)));
  return delete n.dense, r.join("");
}
function us(e, t) {
  t || (t = {}), t.FS = "	", t.RS = `
`;
  var r = Xa(e, t);
  return r;
}
function qh(e) {
  var t = "", r, n = "";
  if (e == null || e["!ref"] == null) return [];
  var a = Be(e["!ref"]), i = "", s = [], f, o = [], l = Array.isArray(e);
  for (f = a.s.c; f <= a.e.c; ++f) s[f] = xr(f);
  for (var u = a.s.r; u <= a.e.r; ++u)
    for (i = ur(u), f = a.s.c; f <= a.e.c; ++f)
      if (t = s[f] + i, r = l ? (e[u] || [])[f] : e[t], n = "", r !== void 0) {
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
function cs(e, t, r) {
  var n = r || {}, a = +!n.skipHeader, i = e || {}, s = 0, f = 0;
  if (i && n.origin != null)
    if (typeof n.origin == "number") s = n.origin;
    else {
      var o = typeof n.origin == "string" ? ar(n.origin) : n.origin;
      s = o.r, f = o.c;
    }
  var l, u = { s: { c: 0, r: 0 }, e: { c: f, r: s + t.length - 1 + a } };
  if (i["!ref"]) {
    var d = Be(i["!ref"]);
    u.e.c = Math.max(u.e.c, d.e.c), u.e.r = Math.max(u.e.r, d.e.r), s == -1 && (s = d.e.r + 1, u.e.r = s + t.length - 1 + a);
  } else
    s == -1 && (s = 0, u.e.r = t.length - 1 + a);
  var x = n.header || [], p = 0;
  t.forEach(function(h, T) {
    cr(h).forEach(function(D) {
      (p = x.indexOf(D)) == -1 && (x[p = x.length] = D);
      var k = h[D], C = "z", U = "", q = Ne({ c: f + p, r: s + T + a });
      l = vn(i, q), k && typeof k == "object" && !(k instanceof Date) ? i[q] = k : (typeof k == "number" ? C = "n" : typeof k == "boolean" ? C = "b" : typeof k == "string" ? C = "s" : k instanceof Date ? (C = "d", n.cellDates || (C = "n", k = Ar(k)), U = n.dateNF || Ge[14]) : k === null && n.nullError && (C = "e", k = 0), l ? (l.t = C, l.v = k, delete l.w, delete l.R, U && (l.z = U)) : i[q] = l = { t: C, v: k }, U && (l.z = U));
    });
  }), u.e.c = Math.max(u.e.c, f + x.length - 1);
  var g = ur(s);
  if (a) for (p = 0; p < x.length; ++p) i[xr(p + f) + g] = { t: "s", v: x[p] };
  return i["!ref"] = Je(u), i;
}
function Qh(e, t) {
  return cs(null, e, t);
}
function vn(e, t, r) {
  if (typeof t == "string") {
    if (Array.isArray(e)) {
      var n = ar(t);
      return e[n.r] || (e[n.r] = []), e[n.r][n.c] || (e[n.r][n.c] = { t: "z" });
    }
    return e[t] || (e[t] = { t: "z" });
  }
  return typeof t != "number" ? vn(e, Ne(t)) : vn(e, Ne({ r: t, c: r || 0 }));
}
function ex(e, t) {
  if (typeof t == "number") {
    if (t >= 0 && e.SheetNames.length > t) return t;
    throw new Error("Cannot find sheet # " + t);
  } else if (typeof t == "string") {
    var r = e.SheetNames.indexOf(t);
    if (r > -1) return r;
    throw new Error("Cannot find sheet name |" + t + "|");
  } else throw new Error("Cannot find sheet |" + t + "|");
}
function rx() {
  return { SheetNames: [], Sheets: {} };
}
function tx(e, t, r, n) {
  var a = 1;
  if (!r) for (; a <= 65535 && e.SheetNames.indexOf(r = "Sheet" + a) != -1; ++a, r = void 0) ;
  if (!r || e.SheetNames.length >= 65535) throw new Error("Too many worksheets");
  if (n && e.SheetNames.indexOf(r) >= 0) {
    var i = r.match(/(^.*?)(\d+)$/);
    a = i && +i[2] || 0;
    var s = i && i[1] || r;
    for (++a; a <= 65535 && e.SheetNames.indexOf(r = s + a) != -1; ++a) ;
  }
  if (es(r), e.SheetNames.indexOf(r) >= 0) throw new Error("Worksheet with name |" + r + "| already exists!");
  return e.SheetNames.push(r), e.Sheets[r] = t, r;
}
function nx(e, t, r) {
  e.Workbook || (e.Workbook = {}), e.Workbook.Sheets || (e.Workbook.Sheets = []);
  var n = ex(e, t);
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
function ax(e, t) {
  return e.z = t, e;
}
function hs(e, t, r) {
  return t ? (e.l = { Target: t }, r && (e.l.Tooltip = r)) : delete e.l, e;
}
function ix(e, t, r) {
  return hs(e, "#" + t, r);
}
function sx(e, t, r) {
  e.c || (e.c = []), e.c.push({ t, a: r || "SheetJS" });
}
function fx(e, t, r, n) {
  for (var a = typeof t != "string" ? t : Be(t), i = typeof t == "string" ? t : Je(t), s = a.s.r; s <= a.e.r; ++s) for (var f = a.s.c; f <= a.e.c; ++f) {
    var o = vn(e, s, f);
    o.t = "n", o.F = i, delete o.v, s == a.s.r && f == a.s.c && (o.f = r, n && (o.D = !0));
  }
  return e;
}
var Zr = {
  encode_col: xr,
  encode_row: ur,
  encode_cell: Ne,
  encode_range: Je,
  decode_col: Na,
  decode_row: Ra,
  split_cell: Tf,
  decode_cell: ar,
  decode_range: Rr,
  format_cell: tt,
  sheet_add_aoa: hi,
  sheet_add_json: cs,
  sheet_add_dom: is,
  aoa_to_sheet: Ht,
  json_to_sheet: Qh,
  table_to_sheet: ss,
  table_to_book: kh,
  sheet_to_csv: Xa,
  sheet_to_txt: us,
  sheet_to_json: Qn,
  sheet_to_html: as,
  sheet_to_formulae: qh,
  sheet_to_row_object_array: Qn,
  sheet_get_cell: vn,
  book_new: rx,
  book_append_sheet: tx,
  book_set_sheet_visibility: nx,
  cell_set_number_format: ax,
  cell_set_hyperlink: hs,
  cell_set_internal_link: ix,
  cell_add_comment: sx,
  sheet_set_array_formula: fx,
  consts: {
    SHEET_VISIBLE: 0,
    SHEET_HIDDEN: 1,
    SHEET_VERY_HIDDEN: 2
  }
};
const lx = { class: "ds-root" }, ox = { class: "ds-tab-bar" }, ux = ["onClick"], cx = { class: "ds-panel" }, hx = { class: "ds-panel-header" }, xx = { class: "ds-panel" }, dx = { class: "ds-panel-header" }, px = { class: "ds-panel" }, vx = { class: "ds-panel-header" }, mx = { class: "ds-panel" }, gx = { class: "ds-panel-header" }, _x = {
  key: 0,
  style: { "margin-top": "8px" }
}, Tx = { style: { display: "flex", "align-items": "center", "margin-bottom": "8px" } }, Ex = { class: "cv-editor" }, wx = ["onClick"], Sx = {
  key: 0,
  style: { "margin-top": "8px" }
}, Ax = { style: { display: "flex", "align-items": "center", "justify-content": "space-between", "margin-bottom": "8px" } }, Fx = { class: "cv-check-list" }, yx = ["onUpdate:modelValue"], Cx = { class: "cv-check-code" }, Ox = {
  key: 0,
  class: "cv-check-label"
}, Ix = { key: 0 }, kx = {
  key: 0,
  class: "graph-section"
}, Dx = { class: "graph-section-title" }, Rx = { class: "graph-section" }, Nx = { class: "graph-section-title" }, Px = {
  key: 1,
  class: "graph-empty"
}, Lx = { class: "graph-section" }, Mx = { class: "graph-section-title" }, Bx = {
  key: 1,
  class: "graph-empty"
}, R0 = Sa({
  name: "FieldDragLayout",
  props: {
    allFields: { type: Array, default: () => [] },
    inputItems: { type: Array, default: () => [] },
    outputItems: { type: Array, default: () => [] }
  },
  emits: ["update:inputItems", "update:outputItems"],
  setup(e, { emit: t }) {
    const r = Fe(""), n = rn(() => {
      const u = r.value.toLowerCase();
      return e.allFields.filter(
        (d) => !u || (d.name_en ?? "").toLowerCase().includes(u) || (d.name_cn ?? "").toLowerCase().includes(u) || (d.id ?? "").toLowerCase().includes(u)
      );
    });
    let a = null;
    function i(u, d) {
      a = { type: "pool", fieldId: d.id, list: "" }, u.dataTransfer.effectAllowed = "copy";
    }
    function s(u, d) {
      const x = u === "input" ? e.inputItems : e.outputItems;
      if (x.some((g) => g.field_id === d.id)) return;
      const p = [...x, { field_id: d.id, field_name: d.name_en || d.id }];
      t(u === "input" ? "update:inputItems" : "update:outputItems", p);
    }
    function f(u, d, x) {
      a = { type: "item", list: d, index: x }, u.dataTransfer.effectAllowed = "move";
    }
    function o(u, d) {
      if (u.preventDefault(), !a) return;
      const x = d === "input" ? [...e.inputItems] : [...e.outputItems];
      if (a.type === "pool") {
        const p = e.allFields.find((g) => g.id === a.fieldId);
        p && !x.some((g) => g.field_id === p.id) && (x.push({ field_id: p.id, field_name: p.name_en || p.id }), t(d === "input" ? "update:inputItems" : "update:outputItems", x));
      } else if (a.type === "item" && a.list === d && a.index !== void 0) {
        const [p] = x.splice(a.index, 1), g = u.target.closest("[data-index]"), h = g ? parseInt(g.getAttribute("data-index") ?? "99") : x.length;
        x.splice(h, 0, p), t(d === "input" ? "update:inputItems" : "update:outputItems", x);
      }
      a = null;
    }
    function l(u, d) {
      const x = u === "input" ? [...e.inputItems] : [...e.outputItems];
      x.splice(d, 1), t(u === "input" ? "update:inputItems" : "update:outputItems", x);
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
}), bx = /* @__PURE__ */ Sa({
  __name: "DataStandardView",
  props: {
    api: {},
    toolId: {}
  },
  setup(e) {
    const t = e, r = [
      { key: "roots", label: "📐 字根维护" },
      { key: "fields", label: "📋 标准字段维护" },
      { key: "interfaces", label: "🔗 接口维护" },
      { key: "rules", label: "⚙️ 规则维护" }
    ], n = Fe("roots"), a = Fe([]), i = Fe([]), s = Fe([]), f = Fe([]), o = Fe(!1);
    async function l() {
      const [K, S, ue, pe] = await Promise.all([
        t.api.plugin.callSync("listRoots", {}),
        t.api.plugin.callSync("listFields", {}),
        t.api.plugin.callSync("listInterfaces", {}),
        t.api.plugin.callSync("listRules", {})
      ]);
      a.value = K.roots ?? [], i.value = S.fields ?? [], s.value = ue.interfaces ?? [], f.value = pe.rules ?? [];
    }
    xs(l);
    const u = Fe(""), d = Fe(""), x = Fe(""), p = Fe(""), g = rn(() => k(a.value, u.value, ["id", "name", "meaning"])), h = rn(() => k(i.value, d.value, ["id", "name_en", "name_cn"])), T = rn(() => k(s.value, x.value, ["id", "name", "description"])), D = rn(() => k(f.value, p.value, ["id", "name", "description"]));
    function k(K, S, ue) {
      if (!S) return K;
      const pe = S.toLowerCase();
      return K.filter((Te) => ue.some((ce) => (Te[ce] ?? "").toLowerCase().includes(pe)));
    }
    const C = Fe(!1), U = Fe(!0), q = Fe(null), te = Fe([]), I = ["字符型", "数字型", "金额类型", "日期类型", "时间戳"], V = Fe({});
    function b(K) {
      if (U.value = !K, K) {
        V.value = { ...K };
        const S = Ot(K.code_values);
        te.value = S.map((ue) => {
          const pe = ue.indexOf("=");
          return pe >= 0 ? { code: ue.slice(0, pe), label: ue.slice(pe + 1) } : { code: ue, label: "" };
        });
      } else
        V.value = { id: ht("ROOT"), name: "", meaning: "", root_type: "字符型", length: "", remark: "" }, te.value = [];
      C.value = !0;
    }
    async function j() {
      var K, S;
      if (!((K = V.value.id) != null && K.trim()) || !((S = V.value.name) != null && S.trim())) {
        Ke.warning("字根ID和字根名不能为空");
        return;
      }
      o.value = !0;
      try {
        const ue = te.value.filter((pe) => pe.code.trim()).map((pe) => pe.label ? `${pe.code}=${pe.label}` : pe.code);
        await t.api.plugin.callSync("saveRoot", {
          ...V.value,
          code_values: ue.length ? JSON.stringify(ue) : null,
          _isNew: U.value
        }), C.value = !1, await l(), Ke.success("保存成功");
      } finally {
        o.value = !1;
      }
    }
    async function Y(K) {
      await kn.confirm("确认删除字根 " + K + "？", "删除确认", { type: "warning" }), await t.api.plugin.callSync("deleteRoot", { id: K }), q.value === K && (q.value = null), await l(), Ke.success("已删除");
    }
    const J = Fe(!1), ie = Fe(!0), ye = Fe(null), de = Fe([]), ve = Fe({});
    function be(K) {
      ie.value = !K, K ? (ve.value = { ...K }, Xe(K.root_id, K.code_values)) : (ve.value = { id: ht("FIELD"), name_en: "", name_cn: "", root_id: "", root_name: "", field_type: "", length: "", remark: "" }, de.value = []), J.value = !0;
    }
    function yr(K) {
      const S = a.value.find((ue) => ue.id === K);
      S ? (ve.value.root_name = S.name, ve.value.field_type = S.root_type ?? "", ve.value.length = S.length ?? "", Xe(K, null)) : (ve.value.root_name = "", ve.value.field_type = "", ve.value.length = "", de.value = []);
    }
    function Xe(K, S) {
      const ue = a.value.find((ce) => ce.id === K);
      if (!ue || ue.root_type !== "字符型" || !ue.code_values) {
        de.value = [];
        return;
      }
      const pe = Ot(ue.code_values);
      let Te = null;
      if (S)
        try {
          Te = new Set(JSON.parse(S));
        } catch {
        }
      de.value = pe.map((ce) => {
        const qe = ce.indexOf("=");
        return {
          value: ce,
          code: qe >= 0 ? ce.slice(0, qe) : ce,
          label: qe >= 0 ? ce.slice(qe + 1) : "",
          checked: Te ? Te.has(ce) : !0
        };
      });
    }
    async function Er() {
      var K, S;
      if (!((K = ve.value.id) != null && K.trim()) || !((S = ve.value.name_cn) != null && S.trim())) {
        Ke.warning("字段ID和字段中文名不能为空");
        return;
      }
      o.value = !0;
      try {
        const ue = de.value.filter((pe) => pe.checked).map((pe) => pe.value);
        await t.api.plugin.callSync("saveField", {
          ...ve.value,
          code_values: ue.length ? JSON.stringify(ue) : null,
          _isNew: ie.value
        }), J.value = !1, await l(), Ke.success("保存成功");
      } finally {
        o.value = !1;
      }
    }
    async function pr(K) {
      await kn.confirm("确认删除字段 " + K + "？", "删除确认", { type: "warning" }), await t.api.plugin.callSync("deleteField", { id: K }), ye.value === K && (ye.value = null), await l(), Ke.success("已删除");
    }
    const A = Fe(!1), M = Fe(!0), F = Fe({}), y = Fe([]), X = Fe([]);
    function he(K) {
      M.value = !K, K ? (F.value = { ...K }, y.value = rr(K.input_json), X.value = rr(K.output_json)) : (F.value = { id: ht("IFACE"), name: "", description: "" }, y.value = [], X.value = []), A.value = !0;
    }
    async function xe() {
      var K, S;
      if (!((K = F.value.id) != null && K.trim()) || !((S = F.value.name) != null && S.trim())) {
        Ke.warning("接口ID和接口名称不能为空");
        return;
      }
      o.value = !0;
      try {
        await t.api.plugin.callSync("saveInterface", {
          ...F.value,
          input_json: JSON.stringify(y.value),
          output_json: JSON.stringify(X.value),
          _isNew: M.value
        }), A.value = !1, await l(), Ke.success("保存成功");
      } finally {
        o.value = !1;
      }
    }
    async function oe(K) {
      await kn.confirm("确认删除接口 " + K + "？", "删除确认", { type: "warning" }), await t.api.plugin.callSync("deleteInterface", { id: K }), await l(), Ke.success("已删除");
    }
    const ne = Fe(!1), Ce = Fe(!0), me = Fe({}), ze = Fe([]), Se = Fe([]);
    function Nr(K) {
      Ce.value = !K, K ? (me.value = { ...K }, ze.value = rr(K.input_json), Se.value = rr(K.output_json)) : (me.value = { id: ht("RULE"), name: "", description: "" }, ze.value = [], Se.value = []), ne.value = !0;
    }
    async function Ue() {
      var K, S;
      if (!((K = me.value.id) != null && K.trim()) || !((S = me.value.name) != null && S.trim())) {
        Ke.warning("规则ID和规则名称不能为空");
        return;
      }
      o.value = !0;
      try {
        await t.api.plugin.callSync("saveRule", {
          ...me.value,
          input_json: JSON.stringify(ze.value),
          output_json: JSON.stringify(Se.value),
          _isNew: Ce.value
        }), ne.value = !1, await l(), Ke.success("保存成功");
      } finally {
        o.value = !1;
      }
    }
    async function le(K) {
      await kn.confirm("确认删除规则 " + K + "？", "删除确认", { type: "warning" }), await t.api.plugin.callSync("deleteRule", { id: K }), await l(), Ke.success("已删除");
    }
    const er = Fe(!1), Cr = Fe(""), Pe = Fe(null);
    function at() {
      if (!q.value) {
        Ke.warning("请先选中一条字根记录");
        return;
      }
      const K = a.value.find((ce) => ce.id === q.value);
      if (!K) return;
      const S = i.value.filter((ce) => ce.root_id === K.id), ue = new Set(S.map((ce) => ce.id)), pe = s.value.filter((ce) => [...rr(ce.input_json), ...rr(ce.output_json)].some((qe) => ue.has(qe.field_id))), Te = f.value.filter((ce) => [...rr(ce.input_json), ...rr(ce.output_json)].some((qe) => ue.has(qe.field_id)));
      Cr.value = `字根「${K.name}」关联图谱`, Pe.value = { type: "字根", name: K.name, usedFields: S, usedByIfaces: pe, usedByRules: Te }, er.value = !0;
    }
    function Sn() {
      if (!ye.value) {
        Ke.warning("请先选中一条字段记录");
        return;
      }
      const K = i.value.find((pe) => pe.id === ye.value);
      if (!K) return;
      const S = s.value.filter((pe) => [...rr(pe.input_json), ...rr(pe.output_json)].some((Te) => Te.field_id === K.id)), ue = f.value.filter((pe) => [...rr(pe.input_json), ...rr(pe.output_json)].some((Te) => Te.field_id === K.id));
      Cr.value = `字段「${K.name_en}」关联图谱`, Pe.value = { type: "字段", name: K.name_en, usedFields: [], usedByIfaces: S, usedByRules: ue }, er.value = !0;
    }
    function zt() {
      var S, ue, pe;
      if (!Pe.value) return;
      const K = Zr.book_new();
      (S = Pe.value.usedFields) != null && S.length && Zr.book_append_sheet(
        K,
        Zr.json_to_sheet(Pe.value.usedFields.map((Te) => ({ 字段ID: Te.id, 英文名: Te.name_en, 中文名: Te.name_cn ?? "" }))),
        "关联字段"
      ), (ue = Pe.value.usedByIfaces) != null && ue.length && Zr.book_append_sheet(
        K,
        Zr.json_to_sheet(Pe.value.usedByIfaces.map((Te) => ({ 接口ID: Te.id, 接口名称: Te.name, 描述: Te.description ?? "" }))),
        "被接口引用"
      ), (pe = Pe.value.usedByRules) != null && pe.length && Zr.book_append_sheet(
        K,
        Zr.json_to_sheet(Pe.value.usedByRules.map((Te) => ({ 规则ID: Te.id, 规则名称: Te.name, 描述: Te.description ?? "" }))),
        "被规则引用"
      ), K.SheetNames.length === 0 && Zr.book_append_sheet(K, Zr.json_to_sheet([{ 结果: "暂无关联" }]), "关联图谱"), Yh(K, `关联图谱_${Pe.value.name}.xlsx`), Ke.success("已导出");
    }
    async function Pr() {
      const K = await t.api.plugin.callSync("exportRootsCsv", {});
      Ct(K.csv, "字根数据.csv", "text/csv;charset=utf-8");
    }
    async function At() {
      const K = await t.api.plugin.callSync("exportFieldsCsv", {});
      Ct(K.csv, "字段数据.csv", "text/csv;charset=utf-8");
    }
    const Ft = Fe(null), yt = Fe(null);
    let Xr = "";
    function la() {
      if (!te.value.length) {
        Ke.warning("当前无码值可导出");
        return;
      }
      const K = ["code,label", ...te.value.map((S) => `${S.code},${S.label}`)];
      Ct(K.join(`
`), `码值_${V.value.name || "export"}.csv`, "text/csv;charset=utf-8");
    }
    async function An(K) {
      var qe;
      const S = (qe = K.target.files) == null ? void 0 : qe[0];
      if (!S) return;
      const ue = await S.text();
      K.target.value = "";
      const pe = ue.split(/\r?\n/).filter((ge) => ge.trim());
      if (!pe.length) {
        Ke.error("文件为空");
        return;
      }
      const Te = pe[0].toLowerCase().startsWith("code") ? 1 : 0, ce = pe.slice(Te).map((ge) => {
        const Lr = ge.split(",");
        return { code: (Lr[0] ?? "").trim(), label: (Lr[1] ?? "").trim() };
      }).filter((ge) => ge.code);
      if (!ce.length) {
        Ke.error("未读取到有效码值");
        return;
      }
      te.value = ce, Ke.success(`已导入 ${ce.length} 条码值`);
    }
    function $t(K) {
      var S;
      Xr = K, (S = Ft.value) == null || S.click();
    }
    async function Fn(K) {
      var pe;
      const S = (pe = K.target.files) == null ? void 0 : pe[0];
      if (!S) return;
      const ue = await S.text();
      K.target.value = "";
      try {
        let Te;
        Xr === "root" ? Te = await t.api.plugin.callSync("importRootsCsv", { csv: ue }) : Te = await t.api.plugin.callSync("importFieldsCsv", { csv: ue }), await l(), Ke.success(`导入完成：成功 ${Te.success} 条，失败 ${Te.errors} 条`);
      } catch (Te) {
        Ke.error("导入失败：" + Te.message);
      }
    }
    function Ct(K, S, ue) {
      const pe = new Blob(["\uFEFF" + K], { type: ue }), Te = URL.createObjectURL(pe);
      Object.assign(document.createElement("a"), { href: Te, download: S }).click(), URL.revokeObjectURL(Te);
    }
    function ht(K) {
      return K + "_" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase();
    }
    function Ot(K) {
      if (!K) return [];
      try {
        return JSON.parse(K);
      } catch {
        return [];
      }
    }
    function rr(K) {
      if (!K) return [];
      try {
        return JSON.parse(K) ?? [];
      } catch {
        return [];
      }
    }
    return (K, S) => {
      const ue = wr("el-input"), pe = wr("Download"), Te = wr("el-icon"), ce = wr("el-button"), qe = wr("Upload"), ge = wr("el-table-column"), Lr = wr("el-table"), $e = wr("el-form-item"), je = wr("el-col"), yn = wr("el-option"), Cn = wr("el-select"), It = wr("el-row"), kt = wr("el-form"), Kr = wr("el-dialog");
      return tr(), vr("div", lx, [
        Ae("div", ox, [
          (tr(), vr(Jt, null, Zt(r, (L) => Ae("div", {
            key: L.key,
            class: ds(["ds-tab-item", { active: n.value === L.key }]),
            onClick: (Me) => n.value = L.key
          }, mr(L.label), 11, ux)), 64))
        ]),
        qt(Ae("div", cx, [
          Ae("div", hx, [
            O(ue, {
              modelValue: u.value,
              "onUpdate:modelValue": S[0] || (S[0] = (L) => u.value = L),
              placeholder: "搜索字根...",
              clearable: "",
              style: { width: "240px" }
            }, null, 8, ["modelValue"]),
            O(ce, { onClick: Pr }, {
              default: G(() => [
                O(Te, null, {
                  default: G(() => [
                    O(pe)
                  ]),
                  _: 1
                }),
                S[49] || (S[49] = we(" 导出CSV", -1))
              ]),
              _: 1
            }),
            O(ce, {
              onClick: S[1] || (S[1] = (L) => $t("root"))
            }, {
              default: G(() => [
                O(Te, null, {
                  default: G(() => [
                    O(qe)
                  ]),
                  _: 1
                }),
                S[50] || (S[50] = we(" 导入CSV", -1))
              ]),
              _: 1
            }),
            O(ce, {
              onClick: at,
              disabled: !q.value
            }, {
              default: G(() => [...S[51] || (S[51] = [
                we("📊 关联图谱", -1)
              ])]),
              _: 1
            }, 8, ["disabled"]),
            O(ce, {
              type: "primary",
              onClick: S[2] || (S[2] = (L) => b(null))
            }, {
              default: G(() => [...S[52] || (S[52] = [
                we("+ 新增字根", -1)
              ])]),
              _: 1
            })
          ]),
          O(Lr, {
            data: g.value,
            border: "",
            stripe: "",
            size: "small",
            "max-height": "560",
            "highlight-current-row": "",
            onCurrentChange: S[3] || (S[3] = (L) => q.value = (L == null ? void 0 : L.id) ?? null)
          }, {
            default: G(() => [
              O(ge, {
                prop: "id",
                label: "字根ID",
                width: "140"
              }),
              O(ge, {
                prop: "name",
                label: "字根名",
                width: "140"
              }, {
                default: G(({ row: L }) => [
                  Ae("strong", null, mr(L.name), 1)
                ]),
                _: 1
              }),
              O(ge, {
                prop: "meaning",
                label: "字根含义",
                "min-width": "140",
                "show-overflow-tooltip": ""
              }),
              O(ge, {
                prop: "root_type",
                label: "字根类型",
                width: "100"
              }),
              O(ge, {
                prop: "length",
                label: "长度",
                width: "60"
              }),
              O(ge, {
                label: "码值数",
                width: "70",
                align: "center"
              }, {
                default: G(({ row: L }) => [
                  we(mr(Ot(L.code_values).length || "—"), 1)
                ]),
                _: 1
              }),
              O(ge, {
                label: "操作",
                width: "120",
                fixed: "right"
              }, {
                default: G(({ row: L }) => [
                  O(ce, {
                    size: "small",
                    onClick: On((Me) => b(L), ["stop"])
                  }, {
                    default: G(() => [...S[53] || (S[53] = [
                      we("编辑", -1)
                    ])]),
                    _: 1
                  }, 8, ["onClick"]),
                  O(ce, {
                    size: "small",
                    type: "danger",
                    onClick: On((Me) => Y(L.id), ["stop"])
                  }, {
                    default: G(() => [...S[54] || (S[54] = [
                      we("删除", -1)
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
          [In, n.value === "roots"]
        ]),
        qt(Ae("div", xx, [
          Ae("div", dx, [
            O(ue, {
              modelValue: d.value,
              "onUpdate:modelValue": S[4] || (S[4] = (L) => d.value = L),
              placeholder: "搜索字段...",
              clearable: "",
              style: { width: "240px" }
            }, null, 8, ["modelValue"]),
            O(ce, { onClick: At }, {
              default: G(() => [
                O(Te, null, {
                  default: G(() => [
                    O(pe)
                  ]),
                  _: 1
                }),
                S[55] || (S[55] = we(" 导出CSV", -1))
              ]),
              _: 1
            }),
            O(ce, {
              onClick: S[5] || (S[5] = (L) => $t("field"))
            }, {
              default: G(() => [
                O(Te, null, {
                  default: G(() => [
                    O(qe)
                  ]),
                  _: 1
                }),
                S[56] || (S[56] = we(" 导入CSV", -1))
              ]),
              _: 1
            }),
            O(ce, {
              onClick: Sn,
              disabled: !ye.value
            }, {
              default: G(() => [...S[57] || (S[57] = [
                we("📊 关联图谱", -1)
              ])]),
              _: 1
            }, 8, ["disabled"]),
            O(ce, {
              type: "primary",
              onClick: S[6] || (S[6] = (L) => be(null))
            }, {
              default: G(() => [...S[58] || (S[58] = [
                we("+ 新增字段", -1)
              ])]),
              _: 1
            })
          ]),
          O(Lr, {
            data: h.value,
            border: "",
            stripe: "",
            size: "small",
            "max-height": "560",
            "highlight-current-row": "",
            onCurrentChange: S[7] || (S[7] = (L) => ye.value = (L == null ? void 0 : L.id) ?? null)
          }, {
            default: G(() => [
              O(ge, {
                prop: "id",
                label: "字段ID",
                width: "140"
              }),
              O(ge, {
                prop: "name_en",
                label: "字段英文名",
                width: "160"
              }, {
                default: G(({ row: L }) => [
                  Ae("strong", null, mr(L.name_en), 1)
                ]),
                _: 1
              }),
              O(ge, {
                prop: "name_cn",
                label: "字段中文名",
                "min-width": "130",
                "show-overflow-tooltip": ""
              }),
              O(ge, {
                prop: "field_type",
                label: "字段类型",
                width: "100"
              }),
              O(ge, {
                prop: "length",
                label: "长度",
                width: "60"
              }),
              O(ge, {
                prop: "root_name",
                label: "引用字根",
                width: "120",
                "show-overflow-tooltip": ""
              }),
              O(ge, {
                label: "操作",
                width: "120",
                fixed: "right"
              }, {
                default: G(({ row: L }) => [
                  O(ce, {
                    size: "small",
                    onClick: On((Me) => be(L), ["stop"])
                  }, {
                    default: G(() => [...S[59] || (S[59] = [
                      we("编辑", -1)
                    ])]),
                    _: 1
                  }, 8, ["onClick"]),
                  O(ce, {
                    size: "small",
                    type: "danger",
                    onClick: On((Me) => pr(L.id), ["stop"])
                  }, {
                    default: G(() => [...S[60] || (S[60] = [
                      we("删除", -1)
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
          [In, n.value === "fields"]
        ]),
        qt(Ae("div", px, [
          Ae("div", vx, [
            O(ue, {
              modelValue: x.value,
              "onUpdate:modelValue": S[8] || (S[8] = (L) => x.value = L),
              placeholder: "搜索接口...",
              clearable: "",
              style: { width: "240px" }
            }, null, 8, ["modelValue"]),
            O(ce, {
              type: "primary",
              onClick: S[9] || (S[9] = (L) => he(null))
            }, {
              default: G(() => [...S[61] || (S[61] = [
                we("+ 新增接口", -1)
              ])]),
              _: 1
            })
          ]),
          O(Lr, {
            data: T.value,
            border: "",
            stripe: "",
            size: "small",
            "max-height": "560"
          }, {
            default: G(() => [
              O(ge, {
                prop: "id",
                label: "接口ID",
                width: "160"
              }),
              O(ge, {
                prop: "name",
                label: "接口名称",
                width: "180"
              }, {
                default: G(({ row: L }) => [
                  Ae("strong", null, mr(L.name), 1)
                ]),
                _: 1
              }),
              O(ge, {
                prop: "description",
                label: "接口描述",
                "min-width": "180",
                "show-overflow-tooltip": ""
              }),
              O(ge, {
                label: "输入字段数",
                width: "90",
                align: "center"
              }, {
                default: G(({ row: L }) => [
                  we(mr(rr(L.input_json).length), 1)
                ]),
                _: 1
              }),
              O(ge, {
                label: "输出字段数",
                width: "90",
                align: "center"
              }, {
                default: G(({ row: L }) => [
                  we(mr(rr(L.output_json).length), 1)
                ]),
                _: 1
              }),
              O(ge, {
                label: "操作",
                width: "120",
                fixed: "right"
              }, {
                default: G(({ row: L }) => [
                  O(ce, {
                    size: "small",
                    onClick: (Me) => he(L)
                  }, {
                    default: G(() => [...S[62] || (S[62] = [
                      we("编辑", -1)
                    ])]),
                    _: 1
                  }, 8, ["onClick"]),
                  O(ce, {
                    size: "small",
                    type: "danger",
                    onClick: (Me) => oe(L.id)
                  }, {
                    default: G(() => [...S[63] || (S[63] = [
                      we("删除", -1)
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
          [In, n.value === "interfaces"]
        ]),
        qt(Ae("div", mx, [
          Ae("div", gx, [
            O(ue, {
              modelValue: p.value,
              "onUpdate:modelValue": S[10] || (S[10] = (L) => p.value = L),
              placeholder: "搜索规则...",
              clearable: "",
              style: { width: "240px" }
            }, null, 8, ["modelValue"]),
            O(ce, {
              type: "primary",
              onClick: S[11] || (S[11] = (L) => Nr(null))
            }, {
              default: G(() => [...S[64] || (S[64] = [
                we("+ 新增规则", -1)
              ])]),
              _: 1
            })
          ]),
          O(Lr, {
            data: D.value,
            border: "",
            stripe: "",
            size: "small",
            "max-height": "560"
          }, {
            default: G(() => [
              O(ge, {
                prop: "id",
                label: "规则ID",
                width: "160"
              }),
              O(ge, {
                prop: "name",
                label: "规则名称",
                width: "180"
              }, {
                default: G(({ row: L }) => [
                  Ae("strong", null, mr(L.name), 1)
                ]),
                _: 1
              }),
              O(ge, {
                prop: "description",
                label: "规则描述",
                "min-width": "180",
                "show-overflow-tooltip": ""
              }),
              O(ge, {
                label: "输入字段数",
                width: "90",
                align: "center"
              }, {
                default: G(({ row: L }) => [
                  we(mr(rr(L.input_json).length), 1)
                ]),
                _: 1
              }),
              O(ge, {
                label: "输出字段数",
                width: "90",
                align: "center"
              }, {
                default: G(({ row: L }) => [
                  we(mr(rr(L.output_json).length), 1)
                ]),
                _: 1
              }),
              O(ge, {
                label: "操作",
                width: "120",
                fixed: "right"
              }, {
                default: G(({ row: L }) => [
                  O(ce, {
                    size: "small",
                    onClick: (Me) => Nr(L)
                  }, {
                    default: G(() => [...S[65] || (S[65] = [
                      we("编辑", -1)
                    ])]),
                    _: 1
                  }, 8, ["onClick"]),
                  O(ce, {
                    size: "small",
                    type: "danger",
                    onClick: (Me) => le(L.id)
                  }, {
                    default: G(() => [...S[66] || (S[66] = [
                      we("删除", -1)
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
          [In, n.value === "rules"]
        ]),
        O(Kr, {
          modelValue: C.value,
          "onUpdate:modelValue": S[21] || (S[21] = (L) => C.value = L),
          title: V.value.id && !U.value ? "编辑字根" : "新增字根",
          width: "680px",
          "close-on-click-modal": !1,
          "destroy-on-close": ""
        }, {
          footer: G(() => [
            O(ce, {
              onClick: S[20] || (S[20] = (L) => C.value = !1)
            }, {
              default: G(() => [...S[71] || (S[71] = [
                we("取消", -1)
              ])]),
              _: 1
            }),
            O(ce, {
              type: "primary",
              onClick: j,
              loading: o.value
            }, {
              default: G(() => [...S[72] || (S[72] = [
                we("保存", -1)
              ])]),
              _: 1
            }, 8, ["loading"])
          ]),
          default: G(() => [
            O(kt, {
              model: V.value,
              "label-width": "90px",
              size: "small"
            }, {
              default: G(() => [
                O(It, { gutter: 16 }, {
                  default: G(() => [
                    O(je, { span: 12 }, {
                      default: G(() => [
                        O($e, { label: "字根ID *" }, {
                          default: G(() => [
                            O(ue, {
                              modelValue: V.value.id,
                              "onUpdate:modelValue": S[12] || (S[12] = (L) => V.value.id = L),
                              disabled: !U.value,
                              placeholder: "如 ROOT_001"
                            }, null, 8, ["modelValue", "disabled"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    O(je, { span: 12 }, {
                      default: G(() => [
                        O($e, { label: "字根名 *" }, {
                          default: G(() => [
                            O(ue, {
                              modelValue: V.value.name,
                              "onUpdate:modelValue": S[13] || (S[13] = (L) => V.value.name = L)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    O(je, { span: 12 }, {
                      default: G(() => [
                        O($e, { label: "字根含义" }, {
                          default: G(() => [
                            O(ue, {
                              modelValue: V.value.meaning,
                              "onUpdate:modelValue": S[14] || (S[14] = (L) => V.value.meaning = L)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    O(je, { span: 12 }, {
                      default: G(() => [
                        O($e, { label: "字根类型 *" }, {
                          default: G(() => [
                            O(Cn, {
                              modelValue: V.value.root_type,
                              "onUpdate:modelValue": S[15] || (S[15] = (L) => V.value.root_type = L),
                              style: { width: "100%" }
                            }, {
                              default: G(() => [
                                (tr(), vr(Jt, null, Zt(I, (L) => O(yn, {
                                  key: L,
                                  label: L,
                                  value: L
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
                    O(je, { span: 12 }, {
                      default: G(() => [
                        O($e, { label: "字根长度" }, {
                          default: G(() => [
                            O(ue, {
                              modelValue: V.value.length,
                              "onUpdate:modelValue": S[16] || (S[16] = (L) => V.value.length = L),
                              type: "number"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    O(je, { span: 24 }, {
                      default: G(() => [
                        O($e, { label: "字根备注" }, {
                          default: G(() => [
                            O(ue, {
                              modelValue: V.value.remark,
                              "onUpdate:modelValue": S[17] || (S[17] = (L) => V.value.remark = L),
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
                V.value.root_type === "字符型" ? (tr(), vr("div", _x, [
                  Ae("div", Tx, [
                    S[69] || (S[69] = Ae("span", { style: { "font-size": "12px", "font-weight": "600", color: "#909399", flex: "1" } }, "码值序列", -1)),
                    O(ce, {
                      size: "small",
                      onClick: la
                    }, {
                      default: G(() => [...S[67] || (S[67] = [
                        we("导出码值", -1)
                      ])]),
                      _: 1
                    }),
                    O(ce, {
                      size: "small",
                      onClick: S[18] || (S[18] = (L) => {
                        var Me;
                        return (Me = yt.value) == null ? void 0 : Me.click();
                      }),
                      style: { "margin-left": "6px" }
                    }, {
                      default: G(() => [...S[68] || (S[68] = [
                        we("导入码值", -1)
                      ])]),
                      _: 1
                    }),
                    Ae("input", {
                      ref_key: "cvImportRef",
                      ref: yt,
                      type: "file",
                      accept: ".csv",
                      style: { display: "none" },
                      onChange: An
                    }, null, 544)
                  ]),
                  Ae("div", Ex, [
                    S[70] || (S[70] = Ae("div", { class: "cv-header" }, [
                      Ae("span", null, "码值编码"),
                      Ae("span", null, "码值含义"),
                      Ae("span")
                    ], -1)),
                    (tr(!0), vr(Jt, null, Zt(te.value, (L, Me) => (tr(), vr("div", {
                      key: Me,
                      class: "cv-row"
                    }, [
                      O(ue, {
                        modelValue: L.code,
                        "onUpdate:modelValue": (Yr) => L.code = Yr,
                        placeholder: "码值",
                        size: "small",
                        style: { "border-radius": "0", "border-right": "1px solid #e4e7ed" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      O(ue, {
                        modelValue: L.label,
                        "onUpdate:modelValue": (Yr) => L.label = Yr,
                        placeholder: "含义",
                        size: "small",
                        style: { "border-radius": "0" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      Ae("button", {
                        class: "cv-del-btn",
                        onClick: (Yr) => te.value.splice(Me, 1)
                      }, "×", 8, wx)
                    ]))), 128)),
                    Ae("button", {
                      class: "cv-add-btn",
                      onClick: S[19] || (S[19] = (L) => te.value.push({ code: "", label: "" }))
                    }, "+ 添加码值")
                  ])
                ])) : Qt("", !0)
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        O(Kr, {
          modelValue: J.value,
          "onUpdate:modelValue": S[32] || (S[32] = (L) => J.value = L),
          title: ie.value ? "新增字段" : "编辑字段",
          width: "680px",
          "close-on-click-modal": !1,
          "destroy-on-close": ""
        }, {
          footer: G(() => [
            O(ce, {
              onClick: S[31] || (S[31] = (L) => J.value = !1)
            }, {
              default: G(() => [...S[76] || (S[76] = [
                we("取消", -1)
              ])]),
              _: 1
            }),
            O(ce, {
              type: "primary",
              onClick: Er,
              loading: o.value
            }, {
              default: G(() => [...S[77] || (S[77] = [
                we("保存", -1)
              ])]),
              _: 1
            }, 8, ["loading"])
          ]),
          default: G(() => [
            O(kt, {
              model: ve.value,
              "label-width": "110px",
              size: "small"
            }, {
              default: G(() => [
                O(It, { gutter: 16 }, {
                  default: G(() => [
                    O(je, { span: 12 }, {
                      default: G(() => [
                        O($e, { label: "字段ID *" }, {
                          default: G(() => [
                            O(ue, {
                              modelValue: ve.value.id,
                              "onUpdate:modelValue": S[22] || (S[22] = (L) => ve.value.id = L),
                              disabled: !ie.value,
                              placeholder: "如 FIELD_001"
                            }, null, 8, ["modelValue", "disabled"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    O(je, { span: 12 }, {
                      default: G(() => [
                        O($e, { label: "字段中文名 *" }, {
                          default: G(() => [
                            O(ue, {
                              modelValue: ve.value.name_cn,
                              "onUpdate:modelValue": S[23] || (S[23] = (L) => ve.value.name_cn = L)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    O(je, { span: 12 }, {
                      default: G(() => [
                        O($e, { label: "字段英文名" }, {
                          default: G(() => [
                            O(ue, {
                              modelValue: ve.value.name_en,
                              "onUpdate:modelValue": S[24] || (S[24] = (L) => ve.value.name_en = L),
                              placeholder: "可手动填写"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    O(je, { span: 12 }, {
                      default: G(() => [
                        O($e, { label: "引用字根" }, {
                          default: G(() => [
                            O(Cn, {
                              modelValue: ve.value.root_id,
                              "onUpdate:modelValue": S[25] || (S[25] = (L) => ve.value.root_id = L),
                              clearable: "",
                              filterable: "",
                              style: { width: "100%" },
                              onChange: yr
                            }, {
                              default: G(() => [
                                (tr(!0), vr(Jt, null, Zt(a.value, (L) => (tr(), ua(yn, {
                                  key: L.id,
                                  label: L.name + " (" + L.id + ")",
                                  value: L.id
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
                    O(je, { span: 12 }, {
                      default: G(() => [
                        O($e, { label: "字段类型" }, {
                          default: G(() => [
                            O(ue, {
                              modelValue: ve.value.field_type,
                              "onUpdate:modelValue": S[26] || (S[26] = (L) => ve.value.field_type = L),
                              disabled: !!ve.value.root_id,
                              placeholder: "引用字根后自动填充"
                            }, null, 8, ["modelValue", "disabled"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    O(je, { span: 12 }, {
                      default: G(() => [
                        O($e, { label: "字段长度" }, {
                          default: G(() => [
                            O(ue, {
                              modelValue: ve.value.length,
                              "onUpdate:modelValue": S[27] || (S[27] = (L) => ve.value.length = L),
                              disabled: !!ve.value.root_id,
                              placeholder: "引用字根后自动填充",
                              type: "number"
                            }, null, 8, ["modelValue", "disabled"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    O(je, { span: 24 }, {
                      default: G(() => [
                        O($e, { label: "字段备注" }, {
                          default: G(() => [
                            O(ue, {
                              modelValue: ve.value.remark,
                              "onUpdate:modelValue": S[28] || (S[28] = (L) => ve.value.remark = L),
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
                de.value.length ? (tr(), vr("div", Sx, [
                  Ae("div", Ax, [
                    S[75] || (S[75] = Ae("span", { style: { "font-size": "12px", "font-weight": "600", color: "#909399" } }, "字段码值（勾选需要保留的）", -1)),
                    Ae("span", null, [
                      O(ce, {
                        size: "small",
                        onClick: S[29] || (S[29] = (L) => de.value.forEach((Me) => Me.checked = !0))
                      }, {
                        default: G(() => [...S[73] || (S[73] = [
                          we("全选", -1)
                        ])]),
                        _: 1
                      }),
                      O(ce, {
                        size: "small",
                        onClick: S[30] || (S[30] = (L) => de.value.forEach((Me) => Me.checked = !1))
                      }, {
                        default: G(() => [...S[74] || (S[74] = [
                          we("全不选", -1)
                        ])]),
                        _: 1
                      })
                    ])
                  ]),
                  Ae("div", Fx, [
                    (tr(!0), vr(Jt, null, Zt(de.value, (L) => (tr(), vr("label", {
                      key: L.value,
                      class: "cv-check-item"
                    }, [
                      qt(Ae("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": (Me) => L.checked = Me
                      }, null, 8, yx), [
                        [ps, L.checked]
                      ]),
                      Ae("span", Cx, mr(L.code), 1),
                      L.label ? (tr(), vr("span", Ox, mr(L.label), 1)) : Qt("", !0)
                    ]))), 128))
                  ])
                ])) : Qt("", !0)
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        O(Kr, {
          modelValue: A.value,
          "onUpdate:modelValue": S[39] || (S[39] = (L) => A.value = L),
          title: M.value ? "新增接口" : "编辑接口",
          width: "900px",
          "close-on-click-modal": !1,
          "destroy-on-close": ""
        }, {
          footer: G(() => [
            O(ce, {
              onClick: S[38] || (S[38] = (L) => A.value = !1)
            }, {
              default: G(() => [...S[78] || (S[78] = [
                we("取消", -1)
              ])]),
              _: 1
            }),
            O(ce, {
              type: "primary",
              onClick: xe,
              loading: o.value
            }, {
              default: G(() => [...S[79] || (S[79] = [
                we("保存", -1)
              ])]),
              _: 1
            }, 8, ["loading"])
          ]),
          default: G(() => [
            O(kt, {
              model: F.value,
              "label-width": "90px",
              size: "small"
            }, {
              default: G(() => [
                O(It, { gutter: 16 }, {
                  default: G(() => [
                    O(je, { span: 12 }, {
                      default: G(() => [
                        O($e, { label: "接口ID *" }, {
                          default: G(() => [
                            O(ue, {
                              modelValue: F.value.id,
                              "onUpdate:modelValue": S[33] || (S[33] = (L) => F.value.id = L),
                              disabled: !M.value,
                              placeholder: "如 IFACE_001"
                            }, null, 8, ["modelValue", "disabled"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    O(je, { span: 12 }, {
                      default: G(() => [
                        O($e, { label: "接口名称 *" }, {
                          default: G(() => [
                            O(ue, {
                              modelValue: F.value.name,
                              "onUpdate:modelValue": S[34] || (S[34] = (L) => F.value.name = L)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    O(je, { span: 24 }, {
                      default: G(() => [
                        O($e, { label: "接口描述" }, {
                          default: G(() => [
                            O(ue, {
                              modelValue: F.value.description,
                              "onUpdate:modelValue": S[35] || (S[35] = (L) => F.value.description = L)
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
            }, 8, ["model"]),
            O(za(R0), {
              "all-fields": i.value,
              "input-items": y.value,
              "onUpdate:inputItems": S[36] || (S[36] = (L) => y.value = L),
              "output-items": X.value,
              "onUpdate:outputItems": S[37] || (S[37] = (L) => X.value = L)
            }, null, 8, ["all-fields", "input-items", "output-items"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        O(Kr, {
          modelValue: ne.value,
          "onUpdate:modelValue": S[46] || (S[46] = (L) => ne.value = L),
          title: Ce.value ? "新增规则" : "编辑规则",
          width: "900px",
          "close-on-click-modal": !1,
          "destroy-on-close": ""
        }, {
          footer: G(() => [
            O(ce, {
              onClick: S[45] || (S[45] = (L) => ne.value = !1)
            }, {
              default: G(() => [...S[80] || (S[80] = [
                we("取消", -1)
              ])]),
              _: 1
            }),
            O(ce, {
              type: "primary",
              onClick: Ue,
              loading: o.value
            }, {
              default: G(() => [...S[81] || (S[81] = [
                we("保存", -1)
              ])]),
              _: 1
            }, 8, ["loading"])
          ]),
          default: G(() => [
            O(kt, {
              model: me.value,
              "label-width": "90px",
              size: "small"
            }, {
              default: G(() => [
                O(It, { gutter: 16 }, {
                  default: G(() => [
                    O(je, { span: 12 }, {
                      default: G(() => [
                        O($e, { label: "规则ID *" }, {
                          default: G(() => [
                            O(ue, {
                              modelValue: me.value.id,
                              "onUpdate:modelValue": S[40] || (S[40] = (L) => me.value.id = L),
                              disabled: !Ce.value,
                              placeholder: "如 RULE_001"
                            }, null, 8, ["modelValue", "disabled"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    O(je, { span: 12 }, {
                      default: G(() => [
                        O($e, { label: "规则名称 *" }, {
                          default: G(() => [
                            O(ue, {
                              modelValue: me.value.name,
                              "onUpdate:modelValue": S[41] || (S[41] = (L) => me.value.name = L)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    O(je, { span: 24 }, {
                      default: G(() => [
                        O($e, { label: "规则描述" }, {
                          default: G(() => [
                            O(ue, {
                              modelValue: me.value.description,
                              "onUpdate:modelValue": S[42] || (S[42] = (L) => me.value.description = L)
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
            }, 8, ["model"]),
            O(za(R0), {
              "all-fields": i.value,
              "input-items": ze.value,
              "onUpdate:inputItems": S[43] || (S[43] = (L) => ze.value = L),
              "output-items": Se.value,
              "onUpdate:outputItems": S[44] || (S[44] = (L) => Se.value = L)
            }, null, 8, ["all-fields", "input-items", "output-items"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        O(Kr, {
          modelValue: er.value,
          "onUpdate:modelValue": S[48] || (S[48] = (L) => er.value = L),
          title: Cr.value,
          width: "760px",
          "destroy-on-close": ""
        }, {
          footer: G(() => [
            O(ce, {
              onClick: S[47] || (S[47] = (L) => er.value = !1)
            }, {
              default: G(() => [...S[82] || (S[82] = [
                we("关闭", -1)
              ])]),
              _: 1
            }),
            O(ce, {
              type: "success",
              onClick: zt
            }, {
              default: G(() => [...S[83] || (S[83] = [
                we("📥 导出Excel", -1)
              ])]),
              _: 1
            })
          ]),
          default: G(() => {
            var L, Me, Yr, c, _;
            return [
              Pe.value ? (tr(), vr("div", Ix, [
                (L = Pe.value.usedFields) != null && L.length ? (tr(), vr("div", kx, [
                  Ae("div", Dx, "📋 引用字段（" + mr(Pe.value.usedFields.length) + "）", 1),
                  O(Lr, {
                    data: Pe.value.usedFields,
                    size: "small",
                    border: ""
                  }, {
                    default: G(() => [
                      O(ge, {
                        prop: "id",
                        label: "字段ID",
                        width: "140"
                      }),
                      O(ge, {
                        prop: "name_en",
                        label: "英文名",
                        width: "140"
                      }),
                      O(ge, {
                        prop: "name_cn",
                        label: "中文名"
                      })
                    ]),
                    _: 1
                  }, 8, ["data"])
                ])) : Qt("", !0),
                Ae("div", Rx, [
                  Ae("div", Nx, "🔗 被接口引用（" + mr(((Me = Pe.value.usedByIfaces) == null ? void 0 : Me.length) ?? 0) + "）", 1),
                  (Yr = Pe.value.usedByIfaces) != null && Yr.length ? (tr(), ua(Lr, {
                    key: 0,
                    data: Pe.value.usedByIfaces,
                    size: "small",
                    border: ""
                  }, {
                    default: G(() => [
                      O(ge, {
                        prop: "id",
                        label: "接口ID",
                        width: "160"
                      }),
                      O(ge, {
                        prop: "name",
                        label: "接口名称",
                        width: "160"
                      }),
                      O(ge, {
                        prop: "description",
                        label: "描述"
                      })
                    ]),
                    _: 1
                  }, 8, ["data"])) : (tr(), vr("div", Px, "无接口引用"))
                ]),
                Ae("div", Lx, [
                  Ae("div", Mx, "⚙️ 被规则引用（" + mr(((c = Pe.value.usedByRules) == null ? void 0 : c.length) ?? 0) + "）", 1),
                  (_ = Pe.value.usedByRules) != null && _.length ? (tr(), ua(Lr, {
                    key: 0,
                    data: Pe.value.usedByRules,
                    size: "small",
                    border: ""
                  }, {
                    default: G(() => [
                      O(ge, {
                        prop: "id",
                        label: "规则ID",
                        width: "160"
                      }),
                      O(ge, {
                        prop: "name",
                        label: "规则名称",
                        width: "160"
                      }),
                      O(ge, {
                        prop: "description",
                        label: "描述"
                      })
                    ]),
                    _: 1
                  }, 8, ["data"])) : (tr(), vr("div", Bx, "无规则引用"))
                ])
              ])) : Qt("", !0)
            ];
          }),
          _: 1
        }, 8, ["modelValue", "title"]),
        Ae("input", {
          type: "file",
          ref_key: "importFileRef",
          ref: Ft,
          accept: ".csv",
          style: { display: "none" },
          onChange: Fn
        }, null, 544)
      ]);
    };
  }
}), Ux = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, a] of t)
    r[n] = a;
  return r;
}, Vx = /* @__PURE__ */ Ux(bx, [["__scopeId", "data-v-477d6a40"]]);
function Gx(e, t) {
  return Sa({
    render() {
      return vs(Vx, { api: e, toolId: t });
    }
  });
}
export {
  Gx as createView
};
