var toolsEventBus=function(){"use strict";function u(t){return function(t){if(Array.isArray(t))return e(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Map"===(r="Object"===r&&t.constructor?t.constructor.name:r)||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function e(t,n){(null==n||n>t.length)&&(n=t.length);for(var r=0,e=new Array(n);r<n;r++)e[r]=t[r];return e}function r(t,n,r,e){"function"==typeof r&&"string"==typeof n&&(t.dp[n]||(t.dp[n]=[])).push({func:r,type:e})}function t(t){this.dp={},this.name=t}return t.prototype.on=function(t,n){return r(this,t,n,"on"),this},t.prototype.once=function(t,n){return r(this,t,n,"once"),this},t.prototype.emit=function(t){for(var r=this,n=arguments.length,e=new Array(1<n?n-1:0),o=1;o<n;o++)e[o-1]=arguments[o];var i=this.dp[t];return i&&(this.dp[t]=u(i).filter(function(t){var n;return(n=t.func).call.apply(n,[r].concat(e)),"on"===t.type})),this},t.prototype.off=function(t,n){var r=this.dp[t];return r&&(n?this.dp[t]=r.filter(function(t){return t.func!==n}):delete this.dp[t]),this},t}();
