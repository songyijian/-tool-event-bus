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

  var _key_ = Symbol('injectionSign');

  function injection(_this, type, fn, sign) {
    if (typeof fn === 'function' && typeof type === 'string') {
      var tls = _this.dp[type] || (_this.dp[type] = []);

      if (tls.indexOf(fn) < 0) {
        fn[_key_] = sign;
        tls.push(fn);
      }
    }

    return _this;
  } ////////////////////////////////////////////////


  function EventBus(name) {
    this.dp = {};
    this.name = name;
  }

  EventBus.prototype.on = function (type, fn) {
    return injection(this, type, fn, 'on');
  };

  EventBus.prototype.once = function (type, fn) {
    return injection(this, type, fn, 'once');
  };

  EventBus.prototype.emit = function (type) {
    var _this2 = this;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var emitList = this.dp[type];
    if (!emitList) return this;
    this.dp[type] = _toConsumableArray(emitList).filter(function (item) {
      item.call.apply(item, [_this2].concat(args));
      item['_key_'] === 'once' && delete item['_key_'];
      return item['_key_'] === 'on';
    });
    return this;
  };

  EventBus.prototype.off = function (type, fn) {
    var offs = this.dp[type];

    if (offs) {
      !fn ? delete this.dp[type] : this.dp[type] = offs.filter(function (item) {
        return item !== fn;
      });
    }

    return this;
  };

  return EventBus;

}());
