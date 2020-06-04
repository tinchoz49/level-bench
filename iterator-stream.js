var inherits = require('inherits')
var Readable = require('readable-stream').Readable
var extend = require('xtend')

module.exports = ReadStream
inherits(ReadStream, Readable)

function ReadStream (iterator, options) {
  if (!(this instanceof ReadStream)) return new ReadStream(iterator, options)
  options = options || {}
  Readable.call(this, extend(options, {
    objectMode: true
  }))
  this._iterator = iterator
  this._options = options
  this.on('end', this.destroy.bind(this, null, null))
}

ReadStream.prototype._read = function () {
  if (this.destroyed) return

  var self = this
  var options = this._options

  self._readableState.readingMore = false

  this._iterator.next(function (err, key, value) {
    if (self.destroyed) return
    if (err) return self.destroy(err)

    if (key === undefined && value === undefined) {
      return self.push(null)
    }

    self._reading = false

    var data = null
    if (options.keys !== false && options.values === false) {
      data = key
    } else if (options.keys === false && options.values !== false) {
      data = value
    } else {
      data = { key: key, value: value }
    }

    self._readableState.readingMore = true
    if (self.push(data)) self._read(self._readableState.highWaterMark)
  })
}

ReadStream.prototype._destroy = function (err, callback) {
  this._iterator.end(function (err2) {
    callback(err || err2)
  })
}
