exports.expandUndefined = function mkExpand (keys) {
  return function keyedExpand (fields) {
    return keys.map(k => {
      const match = fields.find(e => e[0] === k)
      return match || [k, 'undefined']
    })
  }
}
