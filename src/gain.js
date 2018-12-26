const { entropy } = require('./entropy')

exports.gain = function gain ([[_, sa, sb], fields]) {
  const total = sa + sb
  const e = entropy(sa, sb)
  return fields.reduce(
    (a, [_, sa, sb], i) => {
      const e = entropy(sa, sb)
      return a - e * (sa + sb) / total
    }
    , e)
}
