(() => {
  var e = {
      557: (e) => {
        e.exports = (function e(r, t, n) {
          function i(s, a) {
            if (!t[s]) {
              if (!r[s]) {
                if (o) return o(s, !0);
                var c = new Error("Cannot find module '" + s + "'");
                throw ((c.code = "MODULE_NOT_FOUND"), c);
              }
              var l = (t[s] = { exports: {} });
              r[s][0].call(
                l.exports,
                function (e) {
                  return i(r[s][1][e] || e);
                },
                l,
                l.exports,
                e,
                r,
                t,
                n,
              );
            }
            return t[s].exports;
          }
          for (var o = void 0, s = 0; s < n.length; s++) i(n[s]);
          return i;
        })(
          {
            1: [
              function (e, r, t) {
                "use strict";
                var n = e("fs"),
                  i = e("path"),
                  o = e("./utils"),
                  s = !1,
                  a = e("../package.json").version,
                  c = "locals",
                  l = [
                    "delimiter",
                    "scope",
                    "context",
                    "debug",
                    "compileDebug",
                    "client",
                    "_with",
                    "rmWhitespace",
                    "strict",
                    "filename",
                    "async",
                  ],
                  u = l.concat("cache"),
                  h = /^\uFEFF/,
                  p = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/;
                function d(e, r) {
                  var i;
                  if (
                    r.some(function (r) {
                      return (i = t.resolveInclude(e, r, !0)), n.existsSync(i);
                    })
                  )
                    return i;
                }
                function f(e, r) {
                  var n,
                    i = e.filename,
                    o = arguments.length > 1;
                  if (e.cache) {
                    if (!i) throw new Error("cache option requires a filename");
                    if ((n = t.cache.get(i))) return n;
                    o || (r = m(i).toString().replace(h, ""));
                  } else if (!o) {
                    if (!i) throw new Error("Internal EJS error: no file name or template provided");
                    r = m(i).toString().replace(h, "");
                  }
                  return (n = t.compile(r, e)), e.cache && t.cache.set(i, n), n;
                }
                function m(e) {
                  return t.fileLoader(e);
                }
                function g(e, r) {
                  var i = o.shallowCopy(o.createNullProtoObjWherePossible(), r);
                  if (
                    ((i.filename = (function (e, r) {
                      var i,
                        o,
                        s = r.views,
                        a = /^[A-Za-z]+:\\|^\//.exec(e);
                      if (a && a.length)
                        (e = e.replace(/^\/*/, "")),
                          (i = Array.isArray(r.root) ? d(e, r.root) : t.resolveInclude(e, r.root || "/", !0));
                      else if (
                        (r.filename && ((o = t.resolveInclude(e, r.filename)), n.existsSync(o) && (i = o)),
                        !i && Array.isArray(s) && (i = d(e, s)),
                        !i && "function" != typeof r.includer)
                      )
                        throw new Error('Could not find the include file "' + r.escapeFunction(e) + '"');
                      return i;
                    })(e, i)),
                    "function" == typeof r.includer)
                  ) {
                    var s = r.includer(e, i.filename);
                    if (s && (s.filename && (i.filename = s.filename), s.template)) return f(i, s.template);
                  }
                  return f(i);
                }
                function b(e, r, t, n, i) {
                  var o = r.split("\n"),
                    s = Math.max(n - 3, 0),
                    a = Math.min(o.length, n + 3),
                    c = i(t),
                    l = o
                      .slice(s, a)
                      .map(function (e, r) {
                        var t = r + s + 1;
                        return (t == n ? " >> " : "    ") + t + "| " + e;
                      })
                      .join("\n");
                  throw ((e.path = c), (e.message = (c || "ejs") + ":" + n + "\n" + l + "\n\n" + e.message), e);
                }
                function v(e) {
                  return e.replace(/;(\s*$)/, "$1");
                }
                function _(e, r) {
                  r = r || o.createNullProtoObjWherePossible();
                  var n = o.createNullProtoObjWherePossible();
                  (this.templateText = e),
                    (this.mode = null),
                    (this.truncate = !1),
                    (this.currentLine = 1),
                    (this.source = ""),
                    (n.client = r.client || !1),
                    (n.escapeFunction = r.escape || r.escapeFunction || o.escapeXML),
                    (n.compileDebug = !1 !== r.compileDebug),
                    (n.debug = !!r.debug),
                    (n.filename = r.filename),
                    (n.openDelimiter = r.openDelimiter || t.openDelimiter || "<"),
                    (n.closeDelimiter = r.closeDelimiter || t.closeDelimiter || ">"),
                    (n.delimiter = r.delimiter || t.delimiter || "%"),
                    (n.strict = r.strict || !1),
                    (n.context = r.context),
                    (n.cache = r.cache || !1),
                    (n.rmWhitespace = r.rmWhitespace),
                    (n.root = r.root),
                    (n.includer = r.includer),
                    (n.outputFunctionName = r.outputFunctionName),
                    (n.localsName = r.localsName || t.localsName || c),
                    (n.views = r.views),
                    (n.async = r.async),
                    (n.destructuredLocals = r.destructuredLocals),
                    (n.legacyInclude = void 0 === r.legacyInclude || !!r.legacyInclude),
                    n.strict ? (n._with = !1) : (n._with = void 0 === r._with || r._with),
                    (this.opts = n),
                    (this.regex = this.createRegex());
                }
                (t.cache = o.cache),
                  (t.fileLoader = n.readFileSync),
                  (t.localsName = c),
                  (t.promiseImpl = new Function("return this;")().Promise),
                  (t.resolveInclude = function (e, r, t) {
                    var n = i.dirname,
                      o = i.extname,
                      s = (0, i.resolve)(t ? r : n(r), e);
                    return o(e) || (s += ".ejs"), s;
                  }),
                  (t.compile = function (e, r) {
                    return (
                      r &&
                        r.scope &&
                        (s || (console.warn("`scope` option is deprecated and will be removed in EJS 3"), (s = !0)),
                        r.context || (r.context = r.scope),
                        delete r.scope),
                      new _(e, r).compile()
                    );
                  }),
                  (t.render = function (e, r, t) {
                    var n = r || o.createNullProtoObjWherePossible(),
                      i = t || o.createNullProtoObjWherePossible();
                    return 2 == arguments.length && o.shallowCopyFromList(i, n, l), f(i, e)(n);
                  }),
                  (t.renderFile = function () {
                    var e,
                      r,
                      n,
                      i = Array.prototype.slice.call(arguments),
                      s = i.shift(),
                      a = { filename: s };
                    return (
                      "function" == typeof arguments[arguments.length - 1] && (e = i.pop()),
                      i.length
                        ? ((r = i.shift()),
                          i.length
                            ? o.shallowCopy(a, i.pop())
                            : (r.settings &&
                                (r.settings.views && (a.views = r.settings.views),
                                r.settings["view cache"] && (a.cache = !0),
                                (n = r.settings["view options"]) && o.shallowCopy(a, n)),
                              o.shallowCopyFromList(a, r, u)),
                          (a.filename = s))
                        : (r = o.createNullProtoObjWherePossible()),
                      (function (e, r, n) {
                        var i;
                        if (!n) {
                          if ("function" == typeof t.promiseImpl)
                            return new t.promiseImpl(function (t, n) {
                              try {
                                t((i = f(e)(r)));
                              } catch (e) {
                                n(e);
                              }
                            });
                          throw new Error("Please provide a callback function");
                        }
                        try {
                          i = f(e)(r);
                        } catch (e) {
                          return n(e);
                        }
                        n(null, i);
                      })(a, r, e)
                    );
                  }),
                  (t.Template = _),
                  (t.clearCache = function () {
                    t.cache.reset();
                  }),
                  (_.modes = { EVAL: "eval", ESCAPED: "escaped", RAW: "raw", COMMENT: "comment", LITERAL: "literal" }),
                  (_.prototype = {
                    createRegex: function () {
                      var e = "(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)",
                        r = o.escapeRegExpChars(this.opts.delimiter),
                        t = o.escapeRegExpChars(this.opts.openDelimiter),
                        n = o.escapeRegExpChars(this.opts.closeDelimiter);
                      return (e = e.replace(/%/g, r).replace(/</g, t).replace(/>/g, n)), new RegExp(e);
                    },
                    compile: function () {
                      var e,
                        r,
                        t,
                        n = this.opts,
                        s = "",
                        a = "",
                        c = n.escapeFunction,
                        l = n.filename ? JSON.stringify(n.filename) : "undefined";
                      if (!this.source) {
                        if (
                          (this.generateSource(),
                          (s +=
                            '  var __output = "";\n  function __append(s) { if (s !== undefined && s !== null) __output += s }\n'),
                          n.outputFunctionName)
                        ) {
                          if (!p.test(n.outputFunctionName))
                            throw new Error("outputFunctionName is not a valid JS identifier.");
                          s += "  var " + n.outputFunctionName + " = __append;\n";
                        }
                        if (n.localsName && !p.test(n.localsName))
                          throw new Error("localsName is not a valid JS identifier.");
                        if (n.destructuredLocals && n.destructuredLocals.length) {
                          for (
                            var u = "  var __locals = (" + n.localsName + " || {}),\n", h = 0;
                            h < n.destructuredLocals.length;
                            h++
                          ) {
                            var d = n.destructuredLocals[h];
                            if (!p.test(d))
                              throw new Error("destructuredLocals[" + h + "] is not a valid JS identifier.");
                            h > 0 && (u += ",\n  "), (u += d + " = __locals." + d);
                          }
                          s += u + ";\n";
                        }
                        !1 !== n._with && ((s += "  with (" + n.localsName + " || {}) {\n"), (a += "  }\n")),
                          (a += "  return __output;\n"),
                          (this.source = s + this.source + a);
                      }
                      (e = n.compileDebug
                        ? "var __line = 1\n  , __lines = " +
                          JSON.stringify(this.templateText) +
                          "\n  , __filename = " +
                          l +
                          ";\ntry {\n" +
                          this.source +
                          "} catch (e) {\n  rethrow(e, __lines, __filename, __line, escapeFn);\n}\n"
                        : this.source),
                        n.client &&
                          ((e = "escapeFn = escapeFn || " + c.toString() + ";\n" + e),
                          n.compileDebug && (e = "rethrow = rethrow || " + b.toString() + ";\n" + e)),
                        n.strict && (e = '"use strict";\n' + e),
                        n.debug && console.log(e),
                        n.compileDebug && n.filename && (e = e + "\n//# sourceURL=" + l + "\n");
                      try {
                        if (n.async)
                          try {
                            t = new Function("return (async function(){}).constructor;")();
                          } catch (e) {
                            throw e instanceof SyntaxError
                              ? new Error("This environment does not support async/await")
                              : e;
                          }
                        else t = Function;
                        r = new t(n.localsName + ", escapeFn, include, rethrow", e);
                      } catch (e) {
                        throw (
                          (e instanceof SyntaxError &&
                            (n.filename && (e.message += " in " + n.filename),
                            (e.message += " while compiling ejs\n\n"),
                            (e.message += "If the above error is not helpful, you may want to try EJS-Lint:\n"),
                            (e.message += "https://github.com/RyanZim/EJS-Lint"),
                            n.async ||
                              ((e.message += "\n"),
                              (e.message +=
                                "Or, if you meant to create an async function, pass `async: true` as an option."))),
                          e)
                        );
                      }
                      var f = n.client
                        ? r
                        : function (e) {
                            return r.apply(n.context, [
                              e || o.createNullProtoObjWherePossible(),
                              c,
                              function (r, t) {
                                var i = o.shallowCopy(o.createNullProtoObjWherePossible(), e);
                                return t && (i = o.shallowCopy(i, t)), g(r, n)(i);
                              },
                              b,
                            ]);
                          };
                      if (n.filename && "function" == typeof Object.defineProperty) {
                        var m = n.filename,
                          v = i.basename(m, i.extname(m));
                        try {
                          Object.defineProperty(f, "name", {
                            value: v,
                            writable: !1,
                            enumerable: !1,
                            configurable: !0,
                          });
                        } catch (e) {}
                      }
                      return f;
                    },
                    generateSource: function () {
                      this.opts.rmWhitespace &&
                        (this.templateText = this.templateText.replace(/[\r\n]+/g, "\n").replace(/^\s+|\s+$/gm, "")),
                        (this.templateText = this.templateText
                          .replace(/[ \t]*<%_/gm, "<%_")
                          .replace(/_%>[ \t]*/gm, "_%>"));
                      var e = this,
                        r = this.parseTemplateText(),
                        t = this.opts.delimiter,
                        n = this.opts.openDelimiter,
                        i = this.opts.closeDelimiter;
                      r &&
                        r.length &&
                        r.forEach(function (o, s) {
                          var a;
                          if (
                            0 === o.indexOf(n + t) &&
                            0 !== o.indexOf(n + t + t) &&
                            (a = r[s + 2]) != t + i &&
                            a != "-" + t + i &&
                            a != "_" + t + i
                          )
                            throw new Error('Could not find matching close tag for "' + o + '".');
                          e.scanLine(o);
                        });
                    },
                    parseTemplateText: function () {
                      for (var e, r = this.templateText, t = this.regex, n = t.exec(r), i = []; n; )
                        0 !== (e = n.index) && (i.push(r.substring(0, e)), (r = r.slice(e))),
                          i.push(n[0]),
                          (r = r.slice(n[0].length)),
                          (n = t.exec(r));
                      return r && i.push(r), i;
                    },
                    _addOutput: function (e) {
                      if ((this.truncate && ((e = e.replace(/^(?:\r\n|\r|\n)/, "")), (this.truncate = !1)), !e))
                        return e;
                      (e = (e = (e = (e = e.replace(/\\/g, "\\\\")).replace(/\n/g, "\\n")).replace(
                        /\r/g,
                        "\\r",
                      )).replace(/"/g, '\\"')),
                        (this.source += '    ; __append("' + e + '")\n');
                    },
                    scanLine: function (e) {
                      var r,
                        t = this.opts.delimiter,
                        n = this.opts.openDelimiter,
                        i = this.opts.closeDelimiter;
                      switch (((r = e.split("\n").length - 1), e)) {
                        case n + t:
                        case n + t + "_":
                          this.mode = _.modes.EVAL;
                          break;
                        case n + t + "=":
                          this.mode = _.modes.ESCAPED;
                          break;
                        case n + t + "-":
                          this.mode = _.modes.RAW;
                          break;
                        case n + t + "#":
                          this.mode = _.modes.COMMENT;
                          break;
                        case n + t + t:
                          (this.mode = _.modes.LITERAL),
                            (this.source += '    ; __append("' + e.replace(n + t + t, n + t) + '")\n');
                          break;
                        case t + t + i:
                          (this.mode = _.modes.LITERAL),
                            (this.source += '    ; __append("' + e.replace(t + t + i, t + i) + '")\n');
                          break;
                        case t + i:
                        case "-" + t + i:
                        case "_" + t + i:
                          this.mode == _.modes.LITERAL && this._addOutput(e),
                            (this.mode = null),
                            (this.truncate = 0 === e.indexOf("-") || 0 === e.indexOf("_"));
                          break;
                        default:
                          if (this.mode) {
                            switch (this.mode) {
                              case _.modes.EVAL:
                              case _.modes.ESCAPED:
                              case _.modes.RAW:
                                e.lastIndexOf("//") > e.lastIndexOf("\n") && (e += "\n");
                            }
                            switch (this.mode) {
                              case _.modes.EVAL:
                                this.source += "    ; " + e + "\n";
                                break;
                              case _.modes.ESCAPED:
                                this.source += "    ; __append(escapeFn(" + v(e) + "))\n";
                                break;
                              case _.modes.RAW:
                                this.source += "    ; __append(" + v(e) + ")\n";
                                break;
                              case _.modes.COMMENT:
                                break;
                              case _.modes.LITERAL:
                                this._addOutput(e);
                            }
                          } else this._addOutput(e);
                      }
                      this.opts.compileDebug &&
                        r &&
                        ((this.currentLine += r), (this.source += "    ; __line = " + this.currentLine + "\n"));
                    },
                  }),
                  (t.escapeXML = o.escapeXML),
                  (t.__express = t.renderFile),
                  (t.VERSION = a),
                  (t.name = "ejs"),
                  "undefined" != typeof window && (window.ejs = t);
              },
              { "../package.json": 6, "./utils": 2, fs: 3, path: 4 },
            ],
            2: [
              function (e, r, t) {
                "use strict";
                var n = /[|\\{}()[\]^$+*?.]/g,
                  i = Object.prototype.hasOwnProperty,
                  o = function (e, r) {
                    return i.apply(e, [r]);
                  };
                t.escapeRegExpChars = function (e) {
                  return e ? String(e).replace(n, "\\$&") : "";
                };
                var s = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&#34;", "'": "&#39;" },
                  a = /[&<>'"]/g;
                function c(e) {
                  return s[e] || e;
                }
                function l() {
                  return (
                    Function.prototype.toString.call(this) +
                    ';\nvar _ENCODE_HTML_RULES = {\n      "&": "&amp;"\n    , "<": "&lt;"\n    , ">": "&gt;"\n    , \'"\': "&#34;"\n    , "\'": "&#39;"\n    }\n  , _MATCH_HTML = /[&<>\'"]/g;\nfunction encode_char(c) {\n  return _ENCODE_HTML_RULES[c] || c;\n};\n'
                  );
                }
                t.escapeXML = function (e) {
                  return null == e ? "" : String(e).replace(a, c);
                };
                try {
                  "function" == typeof Object.defineProperty
                    ? Object.defineProperty(t.escapeXML, "toString", { value: l })
                    : (t.escapeXML.toString = l);
                } catch (e) {
                  console.warn("Unable to set escapeXML.toString (is the Function prototype frozen?)");
                }
                (t.shallowCopy = function (e, r) {
                  if (((r = r || {}), null != e))
                    for (var t in r) o(r, t) && "__proto__" !== t && "constructor" !== t && (e[t] = r[t]);
                  return e;
                }),
                  (t.shallowCopyFromList = function (e, r, t) {
                    if (((t = t || []), (r = r || {}), null != e))
                      for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        if (void 0 !== r[i]) {
                          if (!o(r, i)) continue;
                          if ("__proto__" === i || "constructor" === i) continue;
                          e[i] = r[i];
                        }
                      }
                    return e;
                  }),
                  (t.cache = {
                    _data: {},
                    set: function (e, r) {
                      this._data[e] = r;
                    },
                    get: function (e) {
                      return this._data[e];
                    },
                    remove: function (e) {
                      delete this._data[e];
                    },
                    reset: function () {
                      this._data = {};
                    },
                  }),
                  (t.hyphenToCamel = function (e) {
                    return e.replace(/-[a-z]/g, function (e) {
                      return e[1].toUpperCase();
                    });
                  }),
                  (t.createNullProtoObjWherePossible =
                    "function" == typeof Object.create
                      ? function () {
                          return Object.create(null);
                        }
                      : { __proto__: null } instanceof Object
                        ? function () {
                            return {};
                          }
                        : function () {
                            return { __proto__: null };
                          });
              },
              {},
            ],
            3: [function (e, r, t) {}, {}],
            4: [
              function (e, r, t) {
                (function (e) {
                  function r(e, r) {
                    for (var t = 0, n = e.length - 1; n >= 0; n--) {
                      var i = e[n];
                      "." === i ? e.splice(n, 1) : ".." === i ? (e.splice(n, 1), t++) : t && (e.splice(n, 1), t--);
                    }
                    if (r) for (; t--; t) e.unshift("..");
                    return e;
                  }
                  function n(e, r) {
                    if (e.filter) return e.filter(r);
                    for (var t = [], n = 0; n < e.length; n++) r(e[n], n, e) && t.push(e[n]);
                    return t;
                  }
                  (t.resolve = function () {
                    for (var t = "", i = !1, o = arguments.length - 1; o >= -1 && !i; o--) {
                      var s = o >= 0 ? arguments[o] : e.cwd();
                      if ("string" != typeof s) throw new TypeError("Arguments to path.resolve must be strings");
                      s && ((t = s + "/" + t), (i = "/" === s.charAt(0)));
                    }
                    return (
                      (i ? "/" : "") +
                        (t = r(
                          n(t.split("/"), function (e) {
                            return !!e;
                          }),
                          !i,
                        ).join("/")) || "."
                    );
                  }),
                    (t.normalize = function (e) {
                      var o = t.isAbsolute(e),
                        s = "/" === i(e, -1);
                      return (
                        (e = r(
                          n(e.split("/"), function (e) {
                            return !!e;
                          }),
                          !o,
                        ).join("/")) ||
                          o ||
                          (e = "."),
                        e && s && (e += "/"),
                        (o ? "/" : "") + e
                      );
                    }),
                    (t.isAbsolute = function (e) {
                      return "/" === e.charAt(0);
                    }),
                    (t.join = function () {
                      var e = Array.prototype.slice.call(arguments, 0);
                      return t.normalize(
                        n(e, function (e, r) {
                          if ("string" != typeof e) throw new TypeError("Arguments to path.join must be strings");
                          return e;
                        }).join("/"),
                      );
                    }),
                    (t.relative = function (e, r) {
                      function n(e) {
                        for (var r = 0; r < e.length && "" === e[r]; r++);
                        for (var t = e.length - 1; t >= 0 && "" === e[t]; t--);
                        return r > t ? [] : e.slice(r, t - r + 1);
                      }
                      (e = t.resolve(e).substr(1)), (r = t.resolve(r).substr(1));
                      for (
                        var i = n(e.split("/")), o = n(r.split("/")), s = Math.min(i.length, o.length), a = s, c = 0;
                        c < s;
                        c++
                      )
                        if (i[c] !== o[c]) {
                          a = c;
                          break;
                        }
                      var l = [];
                      for (c = a; c < i.length; c++) l.push("..");
                      return (l = l.concat(o.slice(a))).join("/");
                    }),
                    (t.sep = "/"),
                    (t.delimiter = ":"),
                    (t.dirname = function (e) {
                      if (("string" != typeof e && (e += ""), 0 === e.length)) return ".";
                      for (var r = e.charCodeAt(0), t = 47 === r, n = -1, i = !0, o = e.length - 1; o >= 1; --o)
                        if (47 === (r = e.charCodeAt(o))) {
                          if (!i) {
                            n = o;
                            break;
                          }
                        } else i = !1;
                      return -1 === n ? (t ? "/" : ".") : t && 1 === n ? "/" : e.slice(0, n);
                    }),
                    (t.basename = function (e, r) {
                      var t = (function (e) {
                        "string" != typeof e && (e += "");
                        var r,
                          t = 0,
                          n = -1,
                          i = !0;
                        for (r = e.length - 1; r >= 0; --r)
                          if (47 === e.charCodeAt(r)) {
                            if (!i) {
                              t = r + 1;
                              break;
                            }
                          } else -1 === n && ((i = !1), (n = r + 1));
                        return -1 === n ? "" : e.slice(t, n);
                      })(e);
                      return r && t.substr(-1 * r.length) === r && (t = t.substr(0, t.length - r.length)), t;
                    }),
                    (t.extname = function (e) {
                      "string" != typeof e && (e += "");
                      for (var r = -1, t = 0, n = -1, i = !0, o = 0, s = e.length - 1; s >= 0; --s) {
                        var a = e.charCodeAt(s);
                        if (47 !== a)
                          -1 === n && ((i = !1), (n = s + 1)),
                            46 === a ? (-1 === r ? (r = s) : 1 !== o && (o = 1)) : -1 !== r && (o = -1);
                        else if (!i) {
                          t = s + 1;
                          break;
                        }
                      }
                      return -1 === r || -1 === n || 0 === o || (1 === o && r === n - 1 && r === t + 1)
                        ? ""
                        : e.slice(r, n);
                    });
                  var i = function (e, r, t) {
                    return e.substr(r, t);
                  };
                }).call(this, e("_process"));
              },
              { _process: 5 },
            ],
            5: [
              function (e, r, t) {
                var n,
                  i,
                  o = (r.exports = {});
                function s() {
                  throw new Error("setTimeout has not been defined");
                }
                function a() {
                  throw new Error("clearTimeout has not been defined");
                }
                function c(e) {
                  if (n === setTimeout) return setTimeout(e, 0);
                  if ((n === s || !n) && setTimeout) return (n = setTimeout), setTimeout(e, 0);
                  try {
                    return n(e, 0);
                  } catch (r) {
                    try {
                      return n.call(null, e, 0);
                    } catch (r) {
                      return n.call(this, e, 0);
                    }
                  }
                }
                !(function () {
                  try {
                    n = "function" == typeof setTimeout ? setTimeout : s;
                  } catch (e) {
                    n = s;
                  }
                  try {
                    i = "function" == typeof clearTimeout ? clearTimeout : a;
                  } catch (e) {
                    i = a;
                  }
                })();
                var l,
                  u = [],
                  h = !1,
                  p = -1;
                function d() {
                  h && l && ((h = !1), l.length ? (u = l.concat(u)) : (p = -1), u.length && f());
                }
                function f() {
                  if (!h) {
                    var e = c(d);
                    h = !0;
                    for (var r = u.length; r; ) {
                      for (l = u, u = []; ++p < r; ) l && l[p].run();
                      (p = -1), (r = u.length);
                    }
                    (l = null),
                      (h = !1),
                      (function (e) {
                        if (i === clearTimeout) return clearTimeout(e);
                        if ((i === a || !i) && clearTimeout) return (i = clearTimeout), clearTimeout(e);
                        try {
                          return i(e);
                        } catch (r) {
                          try {
                            return i.call(null, e);
                          } catch (r) {
                            return i.call(this, e);
                          }
                        }
                      })(e);
                  }
                }
                function m(e, r) {
                  (this.fun = e), (this.array = r);
                }
                function g() {}
                (o.nextTick = function (e) {
                  var r = new Array(arguments.length - 1);
                  if (arguments.length > 1) for (var t = 1; t < arguments.length; t++) r[t - 1] = arguments[t];
                  u.push(new m(e, r)), 1 !== u.length || h || c(f);
                }),
                  (m.prototype.run = function () {
                    this.fun.apply(null, this.array);
                  }),
                  (o.title = "browser"),
                  (o.browser = !0),
                  (o.env = {}),
                  (o.argv = []),
                  (o.version = ""),
                  (o.versions = {}),
                  (o.on = g),
                  (o.addListener = g),
                  (o.once = g),
                  (o.off = g),
                  (o.removeListener = g),
                  (o.removeAllListeners = g),
                  (o.emit = g),
                  (o.prependListener = g),
                  (o.prependOnceListener = g),
                  (o.listeners = function (e) {
                    return [];
                  }),
                  (o.binding = function (e) {
                    throw new Error("process.binding is not supported");
                  }),
                  (o.cwd = function () {
                    return "/";
                  }),
                  (o.chdir = function (e) {
                    throw new Error("process.chdir is not supported");
                  }),
                  (o.umask = function () {
                    return 0;
                  });
              },
              {},
            ],
            6: [
              function (e, r, t) {
                r.exports = {
                  name: "ejs",
                  description: "Embedded JavaScript templates",
                  keywords: ["template", "engine", "ejs"],
                  version: "3.1.8",
                  author: "Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",
                  license: "Apache-2.0",
                  bin: { ejs: "./bin/cli.js" },
                  main: "./lib/ejs.js",
                  jsdelivr: "ejs.min.js",
                  unpkg: "ejs.min.js",
                  repository: { type: "git", url: "git://github.com/mde/ejs.git" },
                  bugs: "https://github.com/mde/ejs/issues",
                  homepage: "https://github.com/mde/ejs",
                  dependencies: { jake: "^10.8.5" },
                  devDependencies: {
                    browserify: "^16.5.1",
                    eslint: "^6.8.0",
                    "git-directory-deploy": "^1.5.1",
                    jsdoc: "^4.0.2",
                    "lru-cache": "^4.0.1",
                    mocha: "^10.2.0",
                    "uglify-js": "^3.3.16",
                  },
                  engines: { node: ">=0.10.0" },
                  scripts: { test: "mocha -u tdd" },
                };
              },
              {},
            ],
          },
          {},
          [1],
        )(1);
      },
    },
    r = {};
  function t(n) {
    var i = r[n];
    if (void 0 !== i) return i.exports;
    var o = (r[n] = { exports: {} });
    return e[n](o, o.exports, t), o.exports;
  }
  (t.n = (e) => {
    var r = e && e.__esModule ? () => e.default : () => e;
    return t.d(r, { a: r }), r;
  }),
    (t.d = (e, r) => {
      for (var n in r) t.o(r, n) && !t.o(e, n) && Object.defineProperty(e, n, { enumerable: !0, get: r[n] });
    }),
    (t.o = (e, r) => Object.prototype.hasOwnProperty.call(e, r)),
    (t.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    });
  var n = {};
  (() => {
    "use strict";
    t.r(n), t.d(n, { htmlReport: () => s });
    var e = t(557),
      r = t.n(e);
    const i =
        '<!DOCTYPE html>\r\n<html lang="en">\r\n  <head> \r\n    <meta charset="UTF-8" />\r\n    <link rel="stylesheet" href="https://unpkg.com/purecss@2.0.3/build/pure-min.css" crossorigin="anonymous">\r\n\r\n    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css" crossorigin="anonymous">\r\n\r\n    <link rel="shortcut icon" href="https://raw.githubusercontent.com/benc-uk/k6-reporter/main/assets/icon.png" type="image/png">\r\n\r\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\r\n    <title>K6 API Tests: <%= title %></title>\r\n    <style>\r\n      body {\r\n        margin: 1rem;\r\n      }\r\n      footer { \r\n        float: right;\r\n        font-size: 0.8rem;\r\n        color: #777;\r\n      }\r\n      footer a {\r\n        text-decoration: none;\r\n        color: #777;\r\n      }\r\n      .failed {\r\n        background-color: #ff6666 !important;\r\n      }     \r\n      .good {\r\n        background-color: #3abe3a !important;\r\n      }   \r\n      td.failed {\r\n        font-weight: bold;\r\n      }\r\n      h2 {\r\n        padding-bottom: 4px;\r\n        border-bottom: solid 3px #cccccc;\r\n      }\r\n      .tabs {\r\n        display: flex;\r\n        flex-wrap: wrap; \r\n      }\r\n      .tabs label {\r\n        order: 1; \r\n        display: block;\r\n        padding: 1rem 2rem;\r\n        margin-right: 0.2rem;\r\n        cursor: pointer;\r\n        color: #666;\r\n        background: #ddd;\r\n        font-weight: bold;\r\n        font-size: 1.2rem;\r\n        flex: 1 1;\r\n        transition: background ease 0.2s;\r\n        border-top-left-radius: 0.3rem;\r\n        border-top-right-radius: 0.3rem;\r\n        border-color: #ccc;\r\n        border-style: solid;\r\n        border-width: 2px 2px 0px;\r\n        box-shadow: inset 0px -3px 7px -1px rgba(0,0,0,0.33);\r\n      }\r\n      .tabs .tab {\r\n        order: 99;\r\n        flex-grow: 1;\r\n        width: 100%;\r\n        display: none;\r\n        padding: 1rem;\r\n        background: #fff;\r\n      }\r\n      .tabs input[type="radio"] {\r\n        display: none;\r\n      }\r\n      .tabs input[type="radio"]:checked + label {\r\n        background: #fff;\r\n        box-shadow: none;\r\n        color: #000;\r\n      }\r\n      .tabs input[type="radio"]:checked + label + .tab {\r\n        display: block;\r\n      }\r\n      .box {\r\n        flex: 1 1;\r\n        border-radius: 0.3rem;\r\n        background-color: #3abe3a;\r\n        margin: 1rem;\r\n        padding: 0.5rem;\r\n        font-size: 2vw; \r\n        box-shadow: 0px 4px 7px -1px rgba(0,0,0,0.49);\r\n        color: white;\r\n        position: relative;\r\n        overflow: hidden;\r\n      }\r\n      .box h4 {\r\n        margin: 0;\r\n        padding-bottom: 0.5rem;\r\n        text-align: center;\r\n        position: relative;\r\n        z-index: 50;\r\n      }\r\n      .row {\r\n        display: flex;\r\n      }\r\n      .row div {\r\n        flex: 1 1;\r\n        text-align: center;\r\n        margin-bottom: 0.5rem;\r\n      }\r\n      .bignum {\r\n        position: relative;\r\n        font-size: min(6vw, 80px);\r\n        z-index: 20;\r\n      }\r\n      table {\r\n        font-size: min(2vw, 22px);\r\n        width: 100%;\r\n      }\r\n      .icon { \r\n        position: absolute;\r\n        top: 60%;\r\n        left: 50%;\r\n        transform: translate(-50%, -50%);\r\n        color: #0000002d;\r\n        font-size: 8vw;\r\n        z-index: 1;\r\n      }\r\n      .metricbox {\r\n        background-color: #5697e2;\r\n        font-size: 3vw;\r\n        height: auto;\r\n      }\r\n      .metricbox .row {\r\n        position: relative;\r\n        z-index: 20;\r\n      }\r\n      .totalbox {\r\n        background-color: #5697e2;\r\n        flex: 1 1;\r\n        border-radius: 0.3rem;\r\n        margin: 1rem;\r\n        padding: 0.5rem;\r\n        font-size: 2vw; \r\n        box-shadow: 0px 4px 7px -1px rgba(0,0,0,0.49);\r\n        color: white;\r\n        position: relative;\r\n        overflow: hidden;\r\n      }\r\n      .totalbox h4 {\r\n        margin: 0;\r\n        padding-bottom: 0.5rem;\r\n        text-align: center;\r\n        position: relative;\r\n        z-index: 50;\r\n      }\r\n    </style>\r\n  </head>\r\n\r\n  <body>\r\n    <h1>\r\n      <svg style="vertical-align:middle" width="50" height="45" viewBox="0 0 50 45" fill="none" class="footer-module--logo--_lkxx"><path d="M31.968 34.681a2.007 2.007 0 002.011-2.003c0-1.106-.9-2.003-2.011-2.003a2.007 2.007 0 00-2.012 2.003c0 1.106.9 2.003 2.012 2.003z" fill="#7D64FF"></path><path d="M39.575 0L27.154 16.883 16.729 9.31 0 45h50L39.575 0zM23.663 37.17l-2.97-4.072v4.072h-2.751V22.038l2.75 1.989v7.66l3.659-5.014 2.086 1.51-3.071 4.21 3.486 4.776h-3.189v.001zm8.305.17c-2.586 0-4.681-2.088-4.681-4.662 0-1.025.332-1.972.896-2.743l4.695-6.435 2.086 1.51-2.239 3.07a4.667 4.667 0 013.924 4.6c0 2.572-2.095 4.66-4.681 4.66z" fill="#7D64FF"></path></svg> \r\n      &nbsp; K6 API Tests: <%= title %>\r\n    </h1>\r\n\r\n    <div class="row">\r\n      <div class="totalbox">\r\n        <i class="fas fa-globe icon"></i>\r\n        <h4>Total Requests</h4>\r\n        <div class="bignum"><% if(data.metrics.http_reqs) { %><%= data.metrics.http_reqs.values.count %><% } %></div>\r\n        <div class="bignum"><% if(data.metrics.grpc_reqs) { %><%= data.metrics.grpc_reqs.values.count %><% } %></div>\r\n      </div>\r\n      <% if(data.metrics.http_req_failed && data.metrics.http_req_failed.values) { %>\r\n        <div class="box <% if(data.metrics.http_req_failed.values.passes > 0) { %> failed <% } %>">\r\n          <i class="far fa-times-circle icon"></i>\r\n          <h4>Failed Requests</h4>\r\n          <div class="bignum"><%= data.metrics.http_req_failed.values.passes %></div>\r\n        </div> \r\n      <% } %>     \r\n      <div class="totalbox">\r\n        <i class="fas fa-chart-bar icon"></i>\r\n        <h4>Total Checks</h4>\r\n        <div class="bignum"><%= totalChecks %></div>\r\n      </div>\r\n      <div class="box <% if(checkFailures > 0) { %> failed <% } %>">\r\n        <i class="far fa-times-circle icon"></i>\r\n        <h4>Failed Checks</h4>\r\n        <div class="bignum"><%= checkFailures %></div>\r\n      </div>\r\n    </div>\r\n\r\n    <br>\r\n    \r\n    <div class="tabs">\r\n      <input type="radio" name="tabs" id="tabthree" checked="checked">\r\n      <label for="tabthree"><i class="fas fa-tasks"></i> Checks & Groups</label>\r\n      <div class="tab">\r\n        <% for(group of data.root_group.groups) { %>\r\n          <% if(group.name.includes("setup")) {\r\n            continue\r\n          } %>\r\n          <h2>&bull; Group - <%= group.name %></h2>\r\n          <table class="pure-table pure-table-horizontal" style="width: 100%">\r\n            <thead>\r\n              <tr>\r\n                <th>Check Name</th>\r\n                <th>Passes</th>\r\n                <th>Failures</th>\r\n              </tr>\r\n            </thead>\r\n            <% for(check of group.checks) { %>\r\n              <tr class="checkDetails <% if(check.fails > 0) { %>failed<% } %>">\r\n                <td width="50%"><%= check.name %></td><td><%= check.passes %></td><td><%= check.fails %></td>\r\n              </tr>\r\n            <% } %>\r\n          </table>\r\n          <br>\r\n        <% } %>\r\n\r\n        <h2>&bull; Other Checks</h2>\r\n        <table class="pure-table pure-table-horizontal" style="width: 100%">\r\n          <thead>\r\n            <tr>\r\n              <th>Check Name</th>\r\n              <th>Passes</th>\r\n              <th>Failures</th>\r\n            </tr>\r\n          </thead>\r\n          <% for(check of data.root_group.checks) { %>\r\n            <tr class="checkDetails <% if(check.fails > 0) { %>failed<% } %>">\r\n              <td width="50%"><%= check.name %></td><td><%= check.passes %></td><td><%= check.fails %></td>\r\n            </tr>\r\n          <% } %>\r\n        </table>     \r\n      </div> \r\n      \x3c!-- ---- end tab ---- --\x3e\r\n\r\n      <input type="radio" name="tabs" id="tabfour">\r\n      <label for="tabfour"><i class="fas fa-exclamation-circle"></i> &nbsp; Failed Checks</label>\r\n      <div class="tab">\r\n        <% function renderFailedCheck(check) { %>\r\n          <thead>\r\n            <tr>\r\n              <th>\r\n                Check Name\r\n              </th>\r\n            </tr>\r\n          </thead>\r\n          <tr class="checkDetails failed">\r\n            <td><%= check.name %></td>\r\n          </tr>\r\n          <% if (check.checks) {\r\n            for (const subCheck of check.checks) {\r\n              renderFailedCheck(subCheck);\r\n            }\r\n          } %>\r\n        <% } %>\r\n        <% function renderGroup(group) { %>\r\n          <% let hasFailedChecks = false;\r\n          for (const check of group.checks) {\r\n            if (check.fails > 0) {\r\n              hasFailedChecks = true;\r\n              break;\r\n            }\r\n          }\r\n          if (hasFailedChecks) { %>\r\n            <h2>&bull; Group - <%= group.name %></h2>\r\n            <table class="pure-table pure-table-horizontal" style="width: 100%">\r\n              <% for (const check of group.checks) {\r\n                if (check.fails > 0) {\r\n                  renderFailedCheck(check);\r\n                }\r\n              } %>\r\n            </table>\r\n          <% } %>\r\n          <% for (const subGroup of group.groups) {\r\n            renderGroup(subGroup);\r\n          } %>\r\n        <% } %>\r\n        <% for (const group of data.root_group.groups) {\r\n          renderGroup(group);\r\n        } %>\r\n        <h2>&bull; Other Checks</h2>\r\n          <table class="pure-table pure-table-horizontal" style="width: 100%">\r\n              <% for (const check of data.root_group.checks) {\r\n                if (check.fails > 0) {\r\n                  renderFailedCheck(check);\r\n                }\r\n              } %>\r\n          </table> \r\n      </div>\r\n      \x3c!-- ---- end tab ---- --\x3e\r\n\r\n    </div>\r\n    <footer>K6 Reporter v<%= version %> - Walter Vargas 2023, <a href="https://github.com/waltervr/k6-reporter">[GitHub]</a></footer>\r\n  </body>\r\n</html>\r\n',
      o = "2.4.1";
    function s(e, t = {}) {
      t.title || (t.title = new Date().toISOString().slice(0, 16).replace("T", " ")),
        t.hasOwnProperty("debug") || (t.debug = !1),
        console.log(`[k6-reporter v${o}] Generating HTML summary report`),
        t.debug && console.log(JSON.stringify(e, null, 2));
      let n = 0,
        s = 0;
      if (e.root_group.checks) {
        let { passes: r, fails: t } = a(e.root_group.checks);
        (n += t), (s += r);
      }
      for (let r of e.root_group.groups)
        if (r.checks) {
          let { passes: e, fails: t } = a(r.checks);
          (n += t), (s += e);
        }
      return r().render(i, {
        data: e,
        title: t.title,
        standardMetrics: [
          "grpc_req_duration",
          "http_req_duration",
          "http_req_waiting",
          "http_req_connecting",
          "http_req_tls_handshaking",
          "http_req_sending",
          "http_req_receiving",
          "http_req_blocked",
          "iteration_duration",
          "group_duration",
          "ws_connecting",
          "ws_msgs_received",
          "ws_msgs_sent",
          "ws_sessions",
        ],
        otherMetrics: [
          "iterations",
          "data_sent",
          "checks",
          "http_reqs",
          "data_received",
          "vus_max",
          "vus",
          "http_req_failed",
          "http_req_duration{expected_response:true}",
        ],
        totalChecks: n + s,
        checkFailures: n,
        checkPasses: s,
        version: o,
      });
    }
    function a(e) {
      let r = 0,
        t = 0;
      for (let n of e) (r += parseInt(n.passes)), (t += parseInt(n.fails));
      return { passes: r, fails: t };
    }
  })();
  var i = exports;
  for (var o in n) i[o] = n[o];
  n.__esModule && Object.defineProperty(i, "__esModule", { value: !0 });
})();
