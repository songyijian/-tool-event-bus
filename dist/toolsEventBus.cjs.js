
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
'use strict';

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function injection(_this, type, fn, sign) {
  if (typeof fn === 'function' && typeof type === 'string') {
    (_this.dp[type] || (_this.dp[type] = [])).push({
      func: fn,
      type: sign
    });
  }
} ////////////////////////////////////////////////


function EventBus(name) {
  this.dp = {};
  this.name = name;
}

EventBus.prototype.on = function (type, fn) {
  injection(this, type, fn, 'on');
  return this;
};

EventBus.prototype.once = function (type, fn) {
  injection(this, type, fn, 'once');
  return this;
};

EventBus.prototype.emit = function (type) {
  var _this2 = this;

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var emitList = this.dp[type];
  if (!emitList) return this;
  this.dp[type] = _toConsumableArray(emitList).filter(function (item) {
    var _item$func;

    (_item$func = item.func).call.apply(_item$func, [_this2].concat(args));

    return item.type === 'on';
  });
  return this;
};

EventBus.prototype.off = function (type, fn) {
  var offs = this.dp[type];

  if (offs) {
    !fn ? delete this.dp[type] : this.dp[type] = offs.filter(function (item) {
      return item.func !== fn;
    });
  }

  return this;
};

module.exports = EventBus;
