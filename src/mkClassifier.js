exports.mkClassifier = function mkClassifier (tree) {
  let sap
  let fork
  return function classifier (query) {
    while (typeof(tree) === 'object') {
      sap = Object.keys(tree)[0]
      fork = Object.keys(tree[sap])
      tree = tree[sap][query[sap]]
    }
    return tree
  }
}