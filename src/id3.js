const { datasetKeys } = require('./datasetKeys')
const { mkCollime } = require('./collime')
const { agglutinator } = require('./agglutinator')
const { gain } = require('./gain')

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
  const gainsEach = agglutined.map(e => ({
    "gain": gain(e),
    [e[0][0]]: e[1].reduce((a, b) => {
      a[b[0]] = {}
      return a
    }, {})
  }))

  const bestOf = gainsEach.slice(1).reduce((a, b) => {
    return a.gain > b.gain ? a : b
  }, gainsEach[0])

  return bestOf
}

