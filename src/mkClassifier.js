exports.mkClassifier = function mkClassifier (tree) {
  return function classifier (query) {
    let sap
    let fork
    let bud = tree
    let branch = tree
    while (typeof(branch) === 'object') {
      sap = Object.keys(branch)[0]
      fork = Object.keys(branch[sap])
      branch = branch[sap][query[sap]]
      if (typeof(branch) !== 'undefined') {
        bud = branch
      }
    }

    if (typeof(branch) === 'undefined') {
      const gs = bud[Symbol.for('gridsheet')][0]
      return gs[1] > gs[2] ? true : false
    } else {
      return branch
    }
  }
}