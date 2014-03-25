/**
 * @license almond 0.2.9 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

var requirejs,require,define;!function(e){function n(e,n){return j.call(e,n)}function r(e,n){var r,i,t,o,f,u,c,l,s,p,a,d=n&&n.split("/"),g=h.map,m=g&&g["*"]||{};if(e&&"."===e.charAt(0))if(n){for(d=d.slice(0,d.length-1),e=e.split("/"),f=e.length-1,h.nodeIdCompat&&y.test(e[f])&&(e[f]=e[f].replace(y,"")),e=d.concat(e),s=0;s<e.length;s+=1)if(a=e[s],"."===a)e.splice(s,1),s-=1;else if(".."===a){if(1===s&&(".."===e[2]||".."===e[0]))break;s>0&&(e.splice(s-1,2),s-=2)}e=e.join("/")}else 0===e.indexOf("./")&&(e=e.substring(2));if((d||m)&&g){for(r=e.split("/"),s=r.length;s>0;s-=1){if(i=r.slice(0,s).join("/"),d)for(p=d.length;p>0;p-=1)if(t=g[d.slice(0,p).join("/")],t&&(t=t[i])){o=t,u=s;break}if(o)break;!c&&m&&m[i]&&(c=m[i],l=s)}!o&&c&&(o=c,u=l),o&&(r.splice(0,u,o),e=r.join("/"))}return e}function i(n,r){return function(){return s.apply(e,x.call(arguments,0).concat([n,r]))}}function t(e){return function(n){return r(n,e)}}function o(e){return function(n){d[e]=n}}function f(r){if(n(g,r)){var i=g[r];delete g[r],m[r]=!0,l.apply(e,i)}if(!n(d,r)&&!n(m,r))throw new Error("No "+r);return d[r]}function u(e){var n,r=e?e.indexOf("!"):-1;return r>-1&&(n=e.substring(0,r),e=e.substring(r+1,e.length)),[n,e]}function c(e){return function(){return h&&h.config&&h.config[e]||{}}}var l,s,p,a,d={},g={},h={},m={},j=Object.prototype.hasOwnProperty,x=[].slice,y=/\.js$/;p=function(e,n){var i,o=u(e),c=o[0];return e=o[1],c&&(c=r(c,n),i=f(c)),c?e=i&&i.normalize?i.normalize(e,t(n)):r(e,n):(e=r(e,n),o=u(e),c=o[0],e=o[1],c&&(i=f(c))),{f:c?c+"!"+e:e,n:e,pr:c,p:i}},a={require:function(e){return i(e)},exports:function(e){var n=d[e];return"undefined"!=typeof n?n:d[e]={}},module:function(e){return{id:e,uri:"",exports:d[e],config:c(e)}}},l=function(r,t,u,c){var l,s,h,j,x,y,q=[],v=typeof u;if(c=c||r,"undefined"===v||"function"===v){for(t=!t.length&&u.length?["require","exports","module"]:t,x=0;x<t.length;x+=1)if(j=p(t[x],c),s=j.f,"require"===s)q[x]=a.require(r);else if("exports"===s)q[x]=a.exports(r),y=!0;else if("module"===s)l=q[x]=a.module(r);else if(n(d,s)||n(g,s)||n(m,s))q[x]=f(s);else{if(!j.p)throw new Error(r+" missing "+s);j.p.load(j.n,i(c,!0),o(s),{}),q[x]=d[s]}h=u?u.apply(d[r],q):void 0,r&&(l&&l.exports!==e&&l.exports!==d[r]?d[r]=l.exports:h===e&&y||(d[r]=h))}else r&&(d[r]=u)},requirejs=require=s=function(n,r,i,t,o){if("string"==typeof n)return a[n]?a[n](r):f(p(n,r).f);if(!n.splice){if(h=n,h.deps&&s(h.deps,h.callback),!r)return;r.splice?(n=r,r=i,i=null):n=e}return r=r||function(){},"function"==typeof i&&(i=t,t=o),t?l(e,n,r,i):setTimeout(function(){l(e,n,r,i)},4),s},s.config=function(e){return s(e)},requirejs._defined=d,define=function(e,r,i){r.splice||(i=r,r=[]),n(d,e)||n(g,e)||(g[e]=[e,r,i])},define.amd={jQuery:!0}}();