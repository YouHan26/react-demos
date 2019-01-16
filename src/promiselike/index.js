/**
 * delay run
 * pass through with then
 *
 *
 * instance leak
 *
 * @param fn
 * @returns {PromiseLike}
 * @constructor
 */
const PromiseLike = function (fn) {
  this._data = null
  this._status = 'pending'
  this._queue = []
  this._catchQueue = []

  function resolve(data) {
    this._data = data
    this._status = 'finish'
  }

  function reject(reason) {
    this._status = 'error'
    this._reason = reason
  }

  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
  return this
}


PromiseLike.prototype.then = function (fn) {
  this._queue.push(function () {
    const that = this
    try {
      this._data = fn(this._data)
    } catch (e) {
      return new PromiseLike(function (resolve, reject) {
        reject(e)
      })
    }

    return new PromiseLike(function (resolve) {
      resolve(that._data)
    })
  }.bind(this))
}


PromiseLike.prototype.catch = function (fn) {
}
