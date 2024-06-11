(()=>{var e={557:e=>{e.exports=function e(t,n,r){function i(s,a){if(!n[s]){if(!t[s]){if(o)return o(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[s]={exports:{}};t[s][0].call(l.exports,(function(e){return i(t[s][1][e]||e)}),l,l.exports,e,t,n,r)}return n[s].exports}for(var o=void 0,s=0;s<r.length;s++)i(r[s]);return i}({1:[function(e,t,n){"use strict";var r=e("fs"),i=e("path"),o=e("./utils"),s=!1,a=e("../package.json").version,c="locals",l=["delimiter","scope","context","debug","compileDebug","client","_with","rmWhitespace","strict","filename","async"],u=l.concat("cache"),h=/^\uFEFF/,p=/^[a-zA-Z_$][0-9a-zA-Z_$]*$/;function d(e,t){var i;if(t.some((function(t){return i=n.resolveInclude(e,t,!0),r.existsSync(i)})))return i}function f(e,t){var r,i=e.filename,o=arguments.length>1;if(e.cache){if(!i)throw new Error("cache option requires a filename");if(r=n.cache.get(i))return r;o||(t=m(i).toString().replace(h,""))}else if(!o){if(!i)throw new Error("Internal EJS error: no file name or template provided");t=m(i).toString().replace(h,"")}return r=n.compile(t,e),e.cache&&n.cache.set(i,r),r}function m(e){return n.fileLoader(e)}function g(e,t){var i=o.shallowCopy(o.createNullProtoObjWherePossible(),t);if(i.filename=function(e,t){var i,o,s=t.views,a=/^[A-Za-z]+:\\|^\//.exec(e);if(a&&a.length)e=e.replace(/^\/*/,""),i=Array.isArray(t.root)?d(e,t.root):n.resolveInclude(e,t.root||"/",!0);else if(t.filename&&(o=n.resolveInclude(e,t.filename),r.existsSync(o)&&(i=o)),!i&&Array.isArray(s)&&(i=d(e,s)),!i&&"function"!=typeof t.includer)throw new Error('Could not find the include file "'+t.escapeFunction(e)+'"');return i}(e,i),"function"==typeof t.includer){var s=t.includer(e,i.filename);if(s&&(s.filename&&(i.filename=s.filename),s.template))return f(i,s.template)}return f(i)}function b(e,t,n,r,i){var o=t.split("\n"),s=Math.max(r-3,0),a=Math.min(o.length,r+3),c=i(n),l=o.slice(s,a).map((function(e,t){var n=t+s+1;return(n==r?" >> ":"    ")+n+"| "+e})).join("\n");throw e.path=c,e.message=(c||"ejs")+":"+r+"\n"+l+"\n\n"+e.message,e}function v(e){return e.replace(/;(\s*$)/,"$1")}function _(e,t){var r=o.hasOwnOnlyObject(t),i=o.createNullProtoObjWherePossible();this.templateText=e,this.mode=null,this.truncate=!1,this.currentLine=1,this.source="",i.client=r.client||!1,i.escapeFunction=r.escape||r.escapeFunction||o.escapeXML,i.compileDebug=!1!==r.compileDebug,i.debug=!!r.debug,i.filename=r.filename,i.openDelimiter=r.openDelimiter||n.openDelimiter||"<",i.closeDelimiter=r.closeDelimiter||n.closeDelimiter||">",i.delimiter=r.delimiter||n.delimiter||"%",i.strict=r.strict||!1,i.context=r.context,i.cache=r.cache||!1,i.rmWhitespace=r.rmWhitespace,i.root=r.root,i.includer=r.includer,i.outputFunctionName=r.outputFunctionName,i.localsName=r.localsName||n.localsName||c,i.views=r.views,i.async=r.async,i.destructuredLocals=r.destructuredLocals,i.legacyInclude=void 0===r.legacyInclude||!!r.legacyInclude,i.strict?i._with=!1:i._with=void 0===r._with||r._with,this.opts=i,this.regex=this.createRegex()}n.cache=o.cache,n.fileLoader=r.readFileSync,n.localsName=c,n.promiseImpl=new Function("return this;")().Promise,n.resolveInclude=function(e,t,n){var r=i.dirname,o=i.extname,s=(0,i.resolve)(n?t:r(t),e);return o(e)||(s+=".ejs"),s},n.compile=function(e,t){return t&&t.scope&&(s||(console.warn("`scope` option is deprecated and will be removed in EJS 3"),s=!0),t.context||(t.context=t.scope),delete t.scope),new _(e,t).compile()},n.render=function(e,t,n){var r=t||o.createNullProtoObjWherePossible(),i=n||o.createNullProtoObjWherePossible();return 2==arguments.length&&o.shallowCopyFromList(i,r,l),f(i,e)(r)},n.renderFile=function(){var e,t,r,i=Array.prototype.slice.call(arguments),s=i.shift(),a={filename:s};return"function"==typeof arguments[arguments.length-1]&&(e=i.pop()),i.length?(t=i.shift(),i.length?o.shallowCopy(a,i.pop()):(t.settings&&(t.settings.views&&(a.views=t.settings.views),t.settings["view cache"]&&(a.cache=!0),(r=t.settings["view options"])&&o.shallowCopy(a,r)),o.shallowCopyFromList(a,t,u)),a.filename=s):t=o.createNullProtoObjWherePossible(),function(e,t,r){var i;if(!r){if("function"==typeof n.promiseImpl)return new n.promiseImpl((function(n,r){try{n(i=f(e)(t))}catch(e){r(e)}}));throw new Error("Please provide a callback function")}try{i=f(e)(t)}catch(e){return r(e)}r(null,i)}(a,t,e)},n.Template=_,n.clearCache=function(){n.cache.reset()},_.modes={EVAL:"eval",ESCAPED:"escaped",RAW:"raw",COMMENT:"comment",LITERAL:"literal"},_.prototype={createRegex:function(){var e="(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)",t=o.escapeRegExpChars(this.opts.delimiter),n=o.escapeRegExpChars(this.opts.openDelimiter),r=o.escapeRegExpChars(this.opts.closeDelimiter);return e=e.replace(/%/g,t).replace(/</g,n).replace(/>/g,r),new RegExp(e)},compile:function(){var e,t,n,r=this.opts,s="",a="",c=r.escapeFunction,l=r.filename?JSON.stringify(r.filename):"undefined";if(!this.source){if(this.generateSource(),s+='  var __output = "";\n  function __append(s) { if (s !== undefined && s !== null) __output += s }\n',r.outputFunctionName){if(!p.test(r.outputFunctionName))throw new Error("outputFunctionName is not a valid JS identifier.");s+="  var "+r.outputFunctionName+" = __append;\n"}if(r.localsName&&!p.test(r.localsName))throw new Error("localsName is not a valid JS identifier.");if(r.destructuredLocals&&r.destructuredLocals.length){for(var u="  var __locals = ("+r.localsName+" || {}),\n",h=0;h<r.destructuredLocals.length;h++){var d=r.destructuredLocals[h];if(!p.test(d))throw new Error("destructuredLocals["+h+"] is not a valid JS identifier.");h>0&&(u+=",\n  "),u+=d+" = __locals."+d}s+=u+";\n"}!1!==r._with&&(s+="  with ("+r.localsName+" || {}) {\n",a+="  }\n"),a+="  return __output;\n",this.source=s+this.source+a}e=r.compileDebug?"var __line = 1\n  , __lines = "+JSON.stringify(this.templateText)+"\n  , __filename = "+l+";\ntry {\n"+this.source+"} catch (e) {\n  rethrow(e, __lines, __filename, __line, escapeFn);\n}\n":this.source,r.client&&(e="escapeFn = escapeFn || "+c.toString()+";\n"+e,r.compileDebug&&(e="rethrow = rethrow || "+b.toString()+";\n"+e)),r.strict&&(e='"use strict";\n'+e),r.debug&&console.log(e),r.compileDebug&&r.filename&&(e=e+"\n//# sourceURL="+l+"\n");try{if(r.async)try{n=new Function("return (async function(){}).constructor;")()}catch(e){throw e instanceof SyntaxError?new Error("This environment does not support async/await"):e}else n=Function;t=new n(r.localsName+", escapeFn, include, rethrow",e)}catch(e){throw e instanceof SyntaxError&&(r.filename&&(e.message+=" in "+r.filename),e.message+=" while compiling ejs\n\n",e.message+="If the above error is not helpful, you may want to try EJS-Lint:\n",e.message+="https://github.com/RyanZim/EJS-Lint",r.async||(e.message+="\n",e.message+="Or, if you meant to create an async function, pass `async: true` as an option.")),e}var f=r.client?t:function(e){return t.apply(r.context,[e||o.createNullProtoObjWherePossible(),c,function(t,n){var i=o.shallowCopy(o.createNullProtoObjWherePossible(),e);return n&&(i=o.shallowCopy(i,n)),g(t,r)(i)},b])};if(r.filename&&"function"==typeof Object.defineProperty){var m=r.filename,v=i.basename(m,i.extname(m));try{Object.defineProperty(f,"name",{value:v,writable:!1,enumerable:!1,configurable:!0})}catch(e){}}return f},generateSource:function(){this.opts.rmWhitespace&&(this.templateText=this.templateText.replace(/[\r\n]+/g,"\n").replace(/^\s+|\s+$/gm,"")),this.templateText=this.templateText.replace(/[ \t]*<%_/gm,"<%_").replace(/_%>[ \t]*/gm,"_%>");var e=this,t=this.parseTemplateText(),n=this.opts.delimiter,r=this.opts.openDelimiter,i=this.opts.closeDelimiter;t&&t.length&&t.forEach((function(o,s){var a;if(0===o.indexOf(r+n)&&0!==o.indexOf(r+n+n)&&(a=t[s+2])!=n+i&&a!="-"+n+i&&a!="_"+n+i)throw new Error('Could not find matching close tag for "'+o+'".');e.scanLine(o)}))},parseTemplateText:function(){for(var e,t=this.templateText,n=this.regex,r=n.exec(t),i=[];r;)0!==(e=r.index)&&(i.push(t.substring(0,e)),t=t.slice(e)),i.push(r[0]),t=t.slice(r[0].length),r=n.exec(t);return t&&i.push(t),i},_addOutput:function(e){if(this.truncate&&(e=e.replace(/^(?:\r\n|\r|\n)/,""),this.truncate=!1),!e)return e;e=(e=(e=(e=e.replace(/\\/g,"\\\\")).replace(/\n/g,"\\n")).replace(/\r/g,"\\r")).replace(/"/g,'\\"'),this.source+='    ; __append("'+e+'")\n'},scanLine:function(e){var t,n=this.opts.delimiter,r=this.opts.openDelimiter,i=this.opts.closeDelimiter;switch(t=e.split("\n").length-1,e){case r+n:case r+n+"_":this.mode=_.modes.EVAL;break;case r+n+"=":this.mode=_.modes.ESCAPED;break;case r+n+"-":this.mode=_.modes.RAW;break;case r+n+"#":this.mode=_.modes.COMMENT;break;case r+n+n:this.mode=_.modes.LITERAL,this.source+='    ; __append("'+e.replace(r+n+n,r+n)+'")\n';break;case n+n+i:this.mode=_.modes.LITERAL,this.source+='    ; __append("'+e.replace(n+n+i,n+i)+'")\n';break;case n+i:case"-"+n+i:case"_"+n+i:this.mode==_.modes.LITERAL&&this._addOutput(e),this.mode=null,this.truncate=0===e.indexOf("-")||0===e.indexOf("_");break;default:if(this.mode){switch(this.mode){case _.modes.EVAL:case _.modes.ESCAPED:case _.modes.RAW:e.lastIndexOf("//")>e.lastIndexOf("\n")&&(e+="\n")}switch(this.mode){case _.modes.EVAL:this.source+="    ; "+e+"\n";break;case _.modes.ESCAPED:this.source+="    ; __append(escapeFn("+v(e)+"))\n";break;case _.modes.RAW:this.source+="    ; __append("+v(e)+")\n";break;case _.modes.COMMENT:break;case _.modes.LITERAL:this._addOutput(e)}}else this._addOutput(e)}this.opts.compileDebug&&t&&(this.currentLine+=t,this.source+="    ; __line = "+this.currentLine+"\n")}},n.escapeXML=o.escapeXML,n.__express=n.renderFile,n.VERSION=a,n.name="ejs","undefined"!=typeof window&&(window.ejs=n)},{"../package.json":6,"./utils":2,fs:3,path:4}],2:[function(e,t,n){"use strict";var r=/[|\\{}()[\]^$+*?.]/g,i=Object.prototype.hasOwnProperty,o=function(e,t){return i.apply(e,[t])};n.escapeRegExpChars=function(e){return e?String(e).replace(r,"\\$&"):""};var s={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"},a=/[&<>'"]/g;function c(e){return s[e]||e}function l(){return Function.prototype.toString.call(this)+';\nvar _ENCODE_HTML_RULES = {\n      "&": "&amp;"\n    , "<": "&lt;"\n    , ">": "&gt;"\n    , \'"\': "&#34;"\n    , "\'": "&#39;"\n    }\n  , _MATCH_HTML = /[&<>\'"]/g;\nfunction encode_char(c) {\n  return _ENCODE_HTML_RULES[c] || c;\n};\n'}n.escapeXML=function(e){return null==e?"":String(e).replace(a,c)};try{"function"==typeof Object.defineProperty?Object.defineProperty(n.escapeXML,"toString",{value:l}):n.escapeXML.toString=l}catch(e){console.warn("Unable to set escapeXML.toString (is the Function prototype frozen?)")}n.shallowCopy=function(e,t){if(t=t||{},null!=e)for(var n in t)o(t,n)&&"__proto__"!==n&&"constructor"!==n&&(e[n]=t[n]);return e},n.shallowCopyFromList=function(e,t,n){if(n=n||[],t=t||{},null!=e)for(var r=0;r<n.length;r++){var i=n[r];if(void 0!==t[i]){if(!o(t,i))continue;if("__proto__"===i||"constructor"===i)continue;e[i]=t[i]}}return e},n.cache={_data:{},set:function(e,t){this._data[e]=t},get:function(e){return this._data[e]},remove:function(e){delete this._data[e]},reset:function(){this._data={}}},n.hyphenToCamel=function(e){return e.replace(/-[a-z]/g,(function(e){return e[1].toUpperCase()}))},n.createNullProtoObjWherePossible="function"==typeof Object.create?function(){return Object.create(null)}:{__proto__:null}instanceof Object?function(){return{}}:function(){return{__proto__:null}},n.hasOwnOnlyObject=function(e){var t=n.createNullProtoObjWherePossible();for(var r in e)o(e,r)&&(t[r]=e[r]);return t}},{}],3:[function(e,t,n){},{}],4:[function(e,t,n){(function(e){function t(e,t){for(var n=0,r=e.length-1;r>=0;r--){var i=e[r];"."===i?e.splice(r,1):".."===i?(e.splice(r,1),n++):n&&(e.splice(r,1),n--)}if(t)for(;n--;n)e.unshift("..");return e}function r(e,t){if(e.filter)return e.filter(t);for(var n=[],r=0;r<e.length;r++)t(e[r],r,e)&&n.push(e[r]);return n}n.resolve=function(){for(var n="",i=!1,o=arguments.length-1;o>=-1&&!i;o--){var s=o>=0?arguments[o]:e.cwd();if("string"!=typeof s)throw new TypeError("Arguments to path.resolve must be strings");s&&(n=s+"/"+n,i="/"===s.charAt(0))}return(i?"/":"")+(n=t(r(n.split("/"),(function(e){return!!e})),!i).join("/"))||"."},n.normalize=function(e){var o=n.isAbsolute(e),s="/"===i(e,-1);return(e=t(r(e.split("/"),(function(e){return!!e})),!o).join("/"))||o||(e="."),e&&s&&(e+="/"),(o?"/":"")+e},n.isAbsolute=function(e){return"/"===e.charAt(0)},n.join=function(){var e=Array.prototype.slice.call(arguments,0);return n.normalize(r(e,(function(e,t){if("string"!=typeof e)throw new TypeError("Arguments to path.join must be strings");return e})).join("/"))},n.relative=function(e,t){function r(e){for(var t=0;t<e.length&&""===e[t];t++);for(var n=e.length-1;n>=0&&""===e[n];n--);return t>n?[]:e.slice(t,n-t+1)}e=n.resolve(e).substr(1),t=n.resolve(t).substr(1);for(var i=r(e.split("/")),o=r(t.split("/")),s=Math.min(i.length,o.length),a=s,c=0;c<s;c++)if(i[c]!==o[c]){a=c;break}var l=[];for(c=a;c<i.length;c++)l.push("..");return(l=l.concat(o.slice(a))).join("/")},n.sep="/",n.delimiter=":",n.dirname=function(e){if("string"!=typeof e&&(e+=""),0===e.length)return".";for(var t=e.charCodeAt(0),n=47===t,r=-1,i=!0,o=e.length-1;o>=1;--o)if(47===(t=e.charCodeAt(o))){if(!i){r=o;break}}else i=!1;return-1===r?n?"/":".":n&&1===r?"/":e.slice(0,r)},n.basename=function(e,t){var n=function(e){"string"!=typeof e&&(e+="");var t,n=0,r=-1,i=!0;for(t=e.length-1;t>=0;--t)if(47===e.charCodeAt(t)){if(!i){n=t+1;break}}else-1===r&&(i=!1,r=t+1);return-1===r?"":e.slice(n,r)}(e);return t&&n.substr(-1*t.length)===t&&(n=n.substr(0,n.length-t.length)),n},n.extname=function(e){"string"!=typeof e&&(e+="");for(var t=-1,n=0,r=-1,i=!0,o=0,s=e.length-1;s>=0;--s){var a=e.charCodeAt(s);if(47!==a)-1===r&&(i=!1,r=s+1),46===a?-1===t?t=s:1!==o&&(o=1):-1!==t&&(o=-1);else if(!i){n=s+1;break}}return-1===t||-1===r||0===o||1===o&&t===r-1&&t===n+1?"":e.slice(t,r)};var i=function(e,t,n){return e.substr(t,n)}}).call(this,e("_process"))},{_process:5}],5:[function(e,t,n){var r,i,o=t.exports={};function s(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function c(e){if(r===setTimeout)return setTimeout(e,0);if((r===s||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:s}catch(e){r=s}try{i="function"==typeof clearTimeout?clearTimeout:a}catch(e){i=a}}();var l,u=[],h=!1,p=-1;function d(){h&&l&&(h=!1,l.length?u=l.concat(u):p=-1,u.length&&f())}function f(){if(!h){var e=c(d);h=!0;for(var t=u.length;t;){for(l=u,u=[];++p<t;)l&&l[p].run();p=-1,t=u.length}l=null,h=!1,function(e){if(i===clearTimeout)return clearTimeout(e);if((i===a||!i)&&clearTimeout)return i=clearTimeout,clearTimeout(e);try{return i(e)}catch(t){try{return i.call(null,e)}catch(t){return i.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function g(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new m(e,t)),1!==u.length||h||c(f)},m.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=g,o.addListener=g,o.once=g,o.off=g,o.removeListener=g,o.removeAllListeners=g,o.emit=g,o.prependListener=g,o.prependOnceListener=g,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},{}],6:[function(e,t,n){t.exports={name:"ejs",description:"Embedded JavaScript templates",keywords:["template","engine","ejs"],version:"3.1.9",author:"Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",license:"Apache-2.0",bin:{ejs:"./bin/cli.js"},main:"./lib/ejs.js",jsdelivr:"ejs.min.js",unpkg:"ejs.min.js",repository:{type:"git",url:"git://github.com/mde/ejs.git"},bugs:"https://github.com/mde/ejs/issues",homepage:"https://github.com/mde/ejs",dependencies:{jake:"^10.8.5"},devDependencies:{browserify:"^16.5.1",eslint:"^6.8.0","git-directory-deploy":"^1.5.1",jsdoc:"^4.0.2","lru-cache":"^4.0.1",mocha:"^10.2.0","uglify-js":"^3.3.16"},engines:{node:">=0.10.0"},scripts:{test:"npx jake test"}}},{}]},{},[1])(1)}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{"use strict";n.r(r),n.d(r,{htmlReport:()=>s});var e=n(557),t=n.n(e);const i='<!DOCTYPE html>\n<html lang="en">\n  <head> \n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="https://unpkg.com/purecss@2.0.3/build/pure-min.css" crossorigin="anonymous">\n\n    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css" crossorigin="anonymous">\n\n    <link rel="shortcut icon" href="https://raw.githubusercontent.com/benc-uk/k6-reporter/main/assets/icon.png" type="image/png">\n\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>K6 API Tests: <%= title %></title>\n    <style>\n      body {\n        margin: 1rem;\n      }\n      footer { \n        float: right;\n        font-size: 0.8rem;\n        color: #777;\n      }\n      footer a {\n        text-decoration: none;\n        color: #777;\n      }\n      .failed {\n        background-color: #ff6666 !important;\n      }     \n      .good {\n        background-color: #3abe3a !important;\n      }   \n      td.failed {\n        font-weight: bold;\n      }\n      h2 {\n        padding-bottom: 4px;\n        border-bottom: solid 3px #cccccc;\n      }\n      .tabs {\n        display: flex;\n        flex-wrap: wrap; \n      }\n      .tabs label {\n        order: 1; \n        display: block;\n        padding: 1rem 2rem;\n        margin-right: 0.2rem;\n        cursor: pointer;\n        color: #666;\n        background: #ddd;\n        font-weight: bold;\n        font-size: 1.2rem;\n        flex: 1 1;\n        transition: background ease 0.2s;\n        border-top-left-radius: 0.3rem;\n        border-top-right-radius: 0.3rem;\n        border-color: #ccc;\n        border-style: solid;\n        border-width: 2px 2px 0px;\n        box-shadow: inset 0px -3px 7px -1px rgba(0,0,0,0.33);\n      }\n      .tabs .tab {\n        order: 99;\n        flex-grow: 1;\n        width: 100%;\n        display: none;\n        padding: 1rem;\n        background: #fff;\n      }\n      .tabs input[type="radio"] {\n        display: none;\n      }\n      .tabs input[type="radio"]:checked + label {\n        background: #fff;\n        box-shadow: none;\n        color: #000;\n      }\n      .tabs input[type="radio"]:checked + label + .tab {\n        display: block;\n      }\n      .box {\n        flex: 1 1;\n        border-radius: 0.3rem;\n        background-color: #3abe3a;\n        margin: 1rem;\n        padding: 0.5rem;\n        font-size: 2vw; \n        box-shadow: 0px 4px 7px -1px rgba(0,0,0,0.49);\n        color: white;\n        position: relative;\n        overflow: hidden;\n      }\n      .box h4 {\n        margin: 0;\n        padding-bottom: 0.5rem;\n        text-align: center;\n        position: relative;\n        z-index: 50;\n      }\n      .row {\n        display: flex;\n      }\n      .row div {\n        flex: 1 1;\n        text-align: center;\n        margin-bottom: 0.5rem;\n      }\n      .bignum {\n        position: relative;\n        font-size: min(6vw, 80px);\n        z-index: 20;\n      }\n      table {\n        font-size: min(2vw, 22px);\n        width: 100%;\n      }\n      .icon { \n        position: absolute;\n        top: 60%;\n        left: 50%;\n        transform: translate(-50%, -50%);\n        color: #0000002d;\n        font-size: 8vw;\n        z-index: 1;\n      }\n      .metricbox {\n        background-color: #5697e2;\n        font-size: 3vw;\n        height: auto;\n      }\n      .metricbox .row {\n        position: relative;\n        z-index: 20;\n      }\n      .totalbox {\n        background-color: #5697e2;\n        flex: 1 1;\n        border-radius: 0.3rem;\n        margin: 1rem;\n        padding: 0.5rem;\n        font-size: 2vw; \n        box-shadow: 0px 4px 7px -1px rgba(0,0,0,0.49);\n        color: white;\n        position: relative;\n        overflow: hidden;\n      }\n      .totalbox h4 {\n        margin: 0;\n        padding-bottom: 0.5rem;\n        text-align: center;\n        position: relative;\n        z-index: 50;\n      }\n    </style>\n  </head>\n\n  <body>\n    <h1>\n      <svg style="vertical-align:middle" width="50" height="45" viewBox="0 0 50 45" fill="none" class="footer-module--logo--_lkxx"><path d="M31.968 34.681a2.007 2.007 0 002.011-2.003c0-1.106-.9-2.003-2.011-2.003a2.007 2.007 0 00-2.012 2.003c0 1.106.9 2.003 2.012 2.003z" fill="#7D64FF"></path><path d="M39.575 0L27.154 16.883 16.729 9.31 0 45h50L39.575 0zM23.663 37.17l-2.97-4.072v4.072h-2.751V22.038l2.75 1.989v7.66l3.659-5.014 2.086 1.51-3.071 4.21 3.486 4.776h-3.189v.001zm8.305.17c-2.586 0-4.681-2.088-4.681-4.662 0-1.025.332-1.972.896-2.743l4.695-6.435 2.086 1.51-2.239 3.07a4.667 4.667 0 013.924 4.6c0 2.572-2.095 4.66-4.681 4.66z" fill="#7D64FF"></path></svg> \n      &nbsp; K6 API Tests: <%= title %>\n    </h1>\n\n    <div class="row">\n      <div class="totalbox">\n        <i class="fas fa-globe icon"></i>\n        <h4>Total Requests</h4>\n        <div class="bignum"><% if(data.metrics.http_reqs) { %><%= data.metrics.http_reqs.values.count %><% } %></div>\n        <div class="bignum"><% if(data.metrics.grpc_reqs) { %><%= data.metrics.grpc_reqs.values.count %><% } %></div>\n      </div>\n      <% if(data.metrics.http_req_failed && data.metrics.http_req_failed.values) { %>\n        <div class="box <% if(data.metrics.http_req_failed.values.passes > 0) { %> failed <% } %>">\n          <i class="far fa-times-circle icon"></i>\n          <h4>Failed Requests</h4>\n          <div class="bignum"><%= data.metrics.http_req_failed.values.passes %></div>\n        </div> \n      <% } %>     \n      <div class="totalbox">\n        <i class="fas fa-chart-bar icon"></i>\n        <h4>Total Checks</h4>\n        <div class="bignum"><%= totalChecks %></div>\n      </div>\n      <div class="box <% if(checkFailures > 0) { %> failed <% } %>">\n        <i class="far fa-times-circle icon"></i>\n        <h4>Failed Checks</h4>\n        <div class="bignum"><%= checkFailures %></div>\n      </div>\n    </div>\n\n    <br>\n    \n    <div class="tabs">\n      <input type="radio" name="tabs" id="tabthree" checked="checked">\n      <label for="tabthree"><i class="fas fa-tasks"></i> Checks & Groups</label>\n      <div class="tab">\n        <% for(group of data.root_group.groups) { %>\n          <% if(group.name.includes("setup")) {\n            continue\n          } %>\n          <h2>&bull; Group - <%= group.name %></h2>\n          <table class="pure-table pure-table-horizontal" style="width: 100%">\n            <thead>\n              <tr>\n                <th>Check Name</th>\n                <th>Passes</th>\n                <th>Failures</th>\n              </tr>\n            </thead>\n            <% for(check of group.checks) { %>\n              <tr class="checkDetails <% if(check.fails > 0) { %>failed<% } %>">\n                <td width="50%"><%= check.name %></td><td><%= check.passes %></td><td><%= check.fails %></td>\n              </tr>\n            <% } %>\n          </table>\n          <br>\n        <% } %>\n\n        <h2>&bull; Other Checks</h2>\n        <table class="pure-table pure-table-horizontal" style="width: 100%">\n          <thead>\n            <tr>\n              <th>Check Name</th>\n              <th>Passes</th>\n              <th>Failures</th>\n            </tr>\n          </thead>\n          <% for(check of data.root_group.checks) { %>\n            <tr class="checkDetails <% if(check.fails > 0) { %>failed<% } %>">\n              <td width="50%"><%= check.name %></td><td><%= check.passes %></td><td><%= check.fails %></td>\n            </tr>\n          <% } %>\n        </table>     \n      </div> \n      \x3c!-- ---- end tab ---- --\x3e\n\n      <input type="radio" name="tabs" id="tabfour">\n      <label for="tabfour"><i class="fas fa-exclamation-circle"></i> &nbsp; Failed Checks</label>\n      <div class="tab">\n        <% function renderFailedCheck(check) { %>\n          <thead>\n            <tr>\n              <th>\n                Check Name\n              </th>\n            </tr>\n          </thead>\n          <tr class="checkDetails failed">\n            <td><%= check.name %></td>\n          </tr>\n          <% if (check.checks) {\n            for (const subCheck of check.checks) {\n              renderFailedCheck(subCheck);\n            }\n          } %>\n        <% } %>\n        <% function renderGroup(group) { %>\n          <% let hasFailedChecks = false;\n          for (const check of group.checks) {\n            if (check.fails > 0) {\n              hasFailedChecks = true;\n              break;\n            }\n          }\n          if (hasFailedChecks) { %>\n            <h2>&bull; Group - <%= group.name %></h2>\n            <table class="pure-table pure-table-horizontal" style="width: 100%">\n              <% for (const check of group.checks) {\n                if (check.fails > 0) {\n                  renderFailedCheck(check);\n                }\n              } %>\n            </table>\n          <% } %>\n          <% for (const subGroup of group.groups) {\n            renderGroup(subGroup);\n          } %>\n        <% } %>\n        <% for (const group of data.root_group.groups) {\n          renderGroup(group);\n        } %>\n        <h2>&bull; Other Checks</h2>\n          <table class="pure-table pure-table-horizontal" style="width: 100%">\n              <% for (const check of data.root_group.checks) {\n                if (check.fails > 0) {\n                  renderFailedCheck(check);\n                }\n              } %>\n          </table> \n      </div>\n      \x3c!-- ---- end tab ---- --\x3e\n\n    </div>\n    <footer>K6 Reporter v<%= version %> - Walter Vargas 2023, <a href="https://github.com/waltervr/k6-reporter">[GitHub]</a></footer>\n  </body>\n</html>\n',o="2.4.1";function s(e,n={}){n.title||(n.title=(new Date).toISOString().slice(0,16).replace("T"," ")),n.hasOwnProperty("debug")||(n.debug=!1),console.log(`[k6-reporter v${o}] Generating HTML summary report`),n.debug&&console.log(JSON.stringify(e,null,2));let r=0,s=0;if(e.root_group.checks){let{passes:t,fails:n}=a(e.root_group.checks);r+=n,s+=t}for(let t of e.root_group.groups)if(t.checks){let{passes:e,fails:n}=a(t.checks);r+=n,s+=e}return t().render(i,{data:e,title:n.title,standardMetrics:["grpc_req_duration","http_req_duration","http_req_waiting","http_req_connecting","http_req_tls_handshaking","http_req_sending","http_req_receiving","http_req_blocked","iteration_duration","group_duration","ws_connecting","ws_msgs_received","ws_msgs_sent","ws_sessions"],otherMetrics:["iterations","data_sent","checks","http_reqs","data_received","vus_max","vus","http_req_failed","http_req_duration{expected_response:true}"],totalChecks:r+s,checkFailures:r,checkPasses:s,version:o})}function a(e){let t=0,n=0;for(let r of e)t+=parseInt(r.passes),n+=parseInt(r.fails);return{passes:t,fails:n}}})();var i=exports;for(var o in r)i[o]=r[o];r.__esModule&&Object.defineProperty(i,"__esModule",{value:!0})})();