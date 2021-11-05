'use strict'

const _flag_ = Symbol()

function EventBus(name) {
  this.dp = {}
  this.name = name
}

EventBus.prototype.on = function (type, fn) {
  if (typeof fn === 'function' && typeof type === 'string') {
    ;(this.dp[type] || (this.dp[type] = [])).push(fn)
  }
  return this
}

EventBus.prototype.once = function (type, fn) {
  const _this = this
  function onfn(...args) {
    _this.off(type, onfn)
    fn.call(_this, ...args)
  }
  Object.defineProperty(onfn, _flag_, {
    writable: false,
    numerable: false,
    value: fn
  })
  this.on(type, onfn)
  return this
}

EventBus.prototype.emit = function (type, ...args) {
  const emitList = this.dp[type]
  if (!emitList) return this
  ;[...emitList].forEach(item => item.call(this, ...args))
  return this
}

EventBus.prototype.off = function (type, fn) {
  if (!arguments.length) {
    this.db = {}
    return this
  }
  let offs = this.dp[type]
  if (offs) {
    !fn ? delete this.dp[type] : (this.dp[type] = offs.filter(item => !(item === fn || item[_flag_] === fn)))
  }
  return this
}

export default EventBus
