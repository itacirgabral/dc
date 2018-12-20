const { entropy } = require('./entropy')

exports.gain = function gain ([[undefined, sa, sb], fields]) {
  const total = sa + sb
  const e = entropy(sa, sb)
  return fields.reduce(
    (a, [undefined, sa, sb], i) => {
      const e = entropy(sa, sb)
      return a - e * (sa + sb) / total
    }
  , e)
}