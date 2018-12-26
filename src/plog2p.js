exports.plog2p = function plog2p (p) {
  const isNumber = !isNaN(p)
  if (isNumber && p > 0) {
    return p * Math.log2(p)
  } else if (isNumber && p === 0) {
    return 0
  } else {
    return NaN
  }
}
