'use strict'

const _key_ = Symbol('injectionSign')
function injection(_this, type, fn, sign) {
  if (typeof fn === 'function' && typeof type === 'string') {
    const tls = _this.dp[type] || (_this.dp[type] = [])
    if (tls.indexOf(fn) < 0) {
      fn[_key_] = sign
      tls.push(fn)
    }
  }
  return _this
}

////////////////////////////////////////////////

function EventBus(name) {
  this.dp = {}
  this.name = name
}

EventBus.prototype.on = function (type, fn) {
  return injection(this, type, fn, 'on')
}

EventBus.prototype.once = function (type, fn) {
  return injection(this, type, fn, 'once')
}

EventBus.prototype.emit = function (type, ...args) {
  const emitList = this.dp[type]
  if (!emitList) return this
  this.dp[type] = [...emitList].filter(item => {
    item.call(this, ...args)
    item['_key_'] === 'once' && delete item['_key_']
    return item['_key_'] === 'on'
  })
  return this
}

EventBus.prototype.off = function (type, fn) {
  let offs = this.dp[type]
  if (offs) {
    !fn ? delete this.dp[type] : (this.dp[type] = offs.filter(item => item !== fn))
  }
  return this
}

export default EventBus
