const { datasetKeys } = require('./datasetKeys')
const { mkCollimer } = require('./mkCollimer')
const { agglutinator } = require('./agglutinator')
const { mkGerm } = require('./mkGerm')
const { mkDatasetShrink } = require('./mkDatasetShrink')

exports.id3 = function id3({ dataset, keys }) {
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
    const field = bestGain.gridsheet[0][0]
    const nextKeys = keys.filter(e => e !== field)
    const mkDataset = mkDatasetShrink(dataset, field)

    return Object.entries(bestGain[field]).filter(
      ([k, v]) => v === ''
    ).map(
      ([k]) => [k, id3({dataset: mkDataset(k), keys: nextKeys})]
    ).reduce((a, b) => {
      a[field][b[0]] = b[1]
      return a
    }, bestGain)

  } else {
    return bestGain
  }
}