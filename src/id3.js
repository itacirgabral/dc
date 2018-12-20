const { datasetKeys } = require('./datasetKeys')
const { mkCollime } = require('./collime')
const { agglutinator } = require('./agglutinator')
const { gain } = require('./gain')
const { germinations } = require('./germination')

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
  const gainsEach = agglutined.map(e => {
    const leaf = {}
    leaf.gain = gain(e)
    leaf[e[0][0]] = e[1].reduce((a, b) => {
      if (keys.length === 1) {
        a[b[0]] = b[1] > b[2] ? true : false
      } else if (b[1] === 0) {
        a[b[0]] = false
      } else if (b[2] === 0) {
        a[b[0]] = true
      } else {
        a[b[0]] = {}
      }
      return a
    }, {})
    
    return leaf
  })

  const bestOf = gainsEach.slice(1).reduce((a, b) => {
    return a.gain > b.gain ? a : b
  }, gainsEach[0])

  return bestOf
}

/*
({
    "gain": gain(e),
    [e[0][0]]: e[1].reduce((a, b) => {
      a[b[0]] = {}
      return a
    }, {})
  })
  */