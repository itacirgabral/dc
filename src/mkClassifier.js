exports.mkClassifier = function mkClassifier (tree) {
  return function classifier (query) {
    let sap
    let fork
    let branch = tree
    while (typeof(branch) === 'object') {
      sap = Object.keys(branch)[0]
      fork = Object.keys(branch[sap])
      branch = branch[sap][query[sap]]
    }
    return branch
  }
}