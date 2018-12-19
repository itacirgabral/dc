exports.plog2p = function plog2p (p) {
  if (!isNaN(p) && p > 0 && p < 1) {
    return p * Math.log2(p)
  } else {
    return NaN
  }
}