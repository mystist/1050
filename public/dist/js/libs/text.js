/**
 * @license RequireJS text 2.0.10 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */

define(["module"],function(e){var n,r,t,o,i,a=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],s=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,u=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,l="undefined"!=typeof location&&location.href,c=l&&location.protocol&&location.protocol.replace(/\:/,""),f=l&&location.hostname,p=l&&(location.port||void 0),d={},v=e.config&&e.config()||{};return n={version:"2.0.10",strip:function(e){if(e){e=e.replace(s,"");var n=e.match(u);n&&(e=n[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:v.createXhr||function(){var e,n,r;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(n=0;3>n;n+=1){r=a[n];try{e=new ActiveXObject(r)}catch(t){}if(e){a=[r];break}}return e},parseName:function(e){var n,r,t,o=!1,i=e.indexOf("."),a=0===e.indexOf("./")||0===e.indexOf("../");return-1!==i&&(!a||i>1)?(n=e.substring(0,i),r=e.substring(i+1,e.length)):n=e,t=r||n,i=t.indexOf("!"),-1!==i&&(o="strip"===t.substring(i+1),t=t.substring(0,i),r?r=t:n=t),{moduleName:n,ext:r,strip:o}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,r,t,o){var i,a,s,u=n.xdRegExp.exec(e);return u?(i=u[2],a=u[3],a=a.split(":"),s=a[1],a=a[0],!(i&&i!==r||a&&a.toLowerCase()!==t.toLowerCase()||(s||a)&&s!==o)):!0},finishLoad:function(e,r,t,o){t=r?n.strip(t):t,v.isBuild&&(d[e]=t),o(t)},load:function(e,r,t,o){if(o.isBuild&&!o.inlineText)return void t();v.isBuild=o.isBuild;var i=n.parseName(e),a=i.moduleName+(i.ext?"."+i.ext:""),s=r.toUrl(a),u=v.useXhr||n.useXhr;return 0===s.indexOf("empty:")?void t():void(!l||u(s,c,f,p)?n.get(s,function(r){n.finishLoad(e,i.strip,r,t)},function(e){t.error&&t.error(e)}):r([a],function(e){n.finishLoad(i.moduleName+"."+i.ext,i.strip,e,t)}))},write:function(e,r,t){if(d.hasOwnProperty(r)){var o=n.jsEscape(d[r]);t.asModule(e+"!"+r,"define(function () { return '"+o+"';});\n")}},writeFile:function(e,r,t,o,i){var a=n.parseName(r),s=a.ext?"."+a.ext:"",u=a.moduleName+s,l=t.toUrl(a.moduleName+s)+".js";n.load(u,t,function(){var r=function(e){return o(l,e)};r.asModule=function(e,n){return o.asModule(e,l,n)},n.write(e,u,r,i)},i)}},"node"===v.env||!v.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]?(r=require.nodeRequire("fs"),n.get=function(e,n,t){try{var o=r.readFileSync(e,"utf8");0===o.indexOf("﻿")&&(o=o.substring(1)),n(o)}catch(i){t(i)}}):"xhr"===v.env||!v.env&&n.createXhr()?n.get=function(e,r,t,o){var i,a=n.createXhr();if(a.open("GET",e,!0),o)for(i in o)o.hasOwnProperty(i)&&a.setRequestHeader(i.toLowerCase(),o[i]);v.onXhr&&v.onXhr(a,e),a.onreadystatechange=function(){var n,o;4===a.readyState&&(n=a.status,n>399&&600>n?(o=new Error(e+" HTTP status: "+n),o.xhr=a,t(o)):r(a.responseText),v.onXhrComplete&&v.onXhrComplete(a,e))},a.send(null)}:"rhino"===v.env||!v.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?n.get=function(e,n){var r,t,o="utf-8",i=new java.io.File(e),a=java.lang.System.getProperty("line.separator"),s=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(i),o)),u="";try{for(r=new java.lang.StringBuffer,t=s.readLine(),t&&t.length()&&65279===t.charAt(0)&&(t=t.substring(1)),null!==t&&r.append(t);null!==(t=s.readLine());)r.append(a),r.append(t);u=String(r.toString())}finally{s.close()}n(u)}:("xpconnect"===v.env||!v.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(t=Components.classes,o=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),i="@mozilla.org/windows-registry-key;1"in t,n.get=function(e,n){var r,a,s,u={};i&&(e=e.replace(/\//g,"\\")),s=new FileUtils.File(e);try{r=t["@mozilla.org/network/file-input-stream;1"].createInstance(o.nsIFileInputStream),r.init(s,1,0,!1),a=t["@mozilla.org/intl/converter-input-stream;1"].createInstance(o.nsIConverterInputStream),a.init(r,"utf-8",r.available(),o.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),a.readString(r.available(),u),a.close(),r.close(),n(u.value)}catch(l){throw new Error((s&&s.path||"")+": "+l)}}),n});