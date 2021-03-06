const { gain } = require('./gain')

exports.mkGerm = function mkgerm (endLeaf) {
  return function germination (gs) {
    const leaf = {}

    const field = gs[0][0]
    leaf[Symbol.for('gain')] = gain(gs)
    leaf[Symbol.for('gridsheet')] = gs

    leaf[field] = gs[1].reduce((a, b) => {
      if (endLeaf) {
        a[b[0]] = b[1] > b[2]
      } else if (b[1] === 0) {
        a[b[0]] = false
      } else if (b[2] === 0) {
        a[b[0]] = true
      } else {
        a[b[0]] = ''
      }
      return a
    }, {})

    return leaf
  }
}
