const { datasetKeys } = require('./datasetKeys')
const { mkCollimer } = require('./mkCollimer')
const { agglutinator } = require('./agglutinator')
const { mkGerm } = require('./mkGerm')

exports.id3 = function id3({ dataset, keys}) {
  const collimer = mkCollimer(dataset)

  if (!keys) {
    keys = datasetKeys(dataset)
  }
  const endLeaf = keys.length === 1

  const collimed = keys.map(collimer)
  const agglutined = collimed.map(agglutinator)

  const germination = mkGerm(endLeaf)
  const gainsEach = agglutined.map(germination)

  const bestGain = gainsEach.slice(1).reduce((a, b) => {
    return a.gain > b.gain ? a : b
  }, gainsEach[0])

  if (!endLeaf) {
    const field = bestGain.gridseet[0][0]
    const nextKeys = keys.filter(e => e !== field)
    const ungermined = Object.entries(bestGain[field]).filter(
      ([k, v]) => typeof(v) === 'undefined'
    )
    /*
    ** todo
    ** nextDataset
    /*

  }

  return bestGain
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