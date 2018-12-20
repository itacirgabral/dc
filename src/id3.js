const { datasetKeys } = require('./datasetKeys')
const { mkCollime } = require('./collime')
const { agglutinator } = require('./agglutinator')

exports.id3 = function id3({ dataset, tree, keys,  doubt}) {
  const collimer = mkCollime(dataset)

  if (!keys) {
    keys = datasetKeys(dataset)
  }
  if (!doubt) {
    doubt = 0
  }
  const collimed = keys.map(collimer)
  const agglutined = collimed.map(agglutinator)

  // return agglutined
}

