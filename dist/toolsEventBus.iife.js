var toolsEventBus = (function () {
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

  var _flag_ = Symbol();

  function EventBus(name) {
    this.dp = {};
    this.name = name;
  }

  EventBus.prototype.on = function (type, fn) {
    if (typeof fn === 'function' && typeof type === 'string') {
      (this.dp[type] || (this.dp[type] = [])).push(fn);
    }

    return this;
  };

  EventBus.prototype.once = function (type, fn) {
    var _this = this;

    function onfn() {
      _this.off(type, onfn);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      fn.call.apply(fn, [_this].concat(args));
    }

    Object.defineProperty(onfn, _flag_, {
      writable: false,
      numerable: false,
      value: fn
    });
    this.on(type, onfn);
    return this;
  };

  EventBus.prototype.emit = function (type) {
    var _this2 = this;

    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    var emitList = this.dp[type];
    if (!emitList) return this;

    _toConsumableArray(emitList).forEach(function (item) {
      return item.call.apply(item, [_this2].concat(args));
    });

    return this;
  };

  EventBus.prototype.off = function (type, fn) {
    if (!arguments.length) {
      this.db = {};
      return this;
    }

    var offs = this.dp[type];

    if (offs) {
      !fn ? delete this.dp[type] : this.dp[type] = offs.filter(function (item) {
        return !(item === fn || item[_flag_] === fn);
      });
    }

    return this;
  };

  return EventBus;

}());
