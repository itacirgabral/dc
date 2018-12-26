const { plog2p } = require('./plog2p')

exports.entropy = function entropy (...arr) {
  if (arr.every(x => Number.isInteger(x) && !(x < 0))) {
    const sum = arr.reduce((a, b) => a + b, 0)
    return arr.reduce((a, b) => {
      const r = b / sum
      return a - plog2p(r)
    }, 0)
  } else {
    return NaN
  }
}
