const { datasetKeys } = require('./datasetKeys')
const { mkCollimer } = require('./mkCollimer')
const { agglutinator } = require('./agglutinator')
const { mkGerm } = require('./mkGerm')
const { mkDatasetShrink } = require('./mkDatasetShrink')

exports.id3 = function id3 ({ dataset, keys }) {
  if (!keys) {
    keys = datasetKeys(dataset)
  }
  const endLeaf = keys.length === 1
  const germinator = mkGerm(endLeaf)
  const collimer = mkCollimer(dataset)

  const bestGain = keys.map(
    collimer
  ).map(
    agglutinator
  ).map(
    germinator
  ).reduce(
    (a, b) => a[Symbol.for('gain')] < b[Symbol.for('gain')] ? b : a
  )

  if (!endLeaf) {
    const field = bestGain[Symbol.for('gridsheet')][0][0]
    const nextKeys = keys.filter(e => e !== field)
    const mkDataset = mkDatasetShrink(dataset, field)

    return Object.entries(bestGain[field]).filter(
      ([k, v]) => v === ''
    ).map(
      ([k]) => [k, id3({ dataset: mkDataset(k), keys: nextKeys })]
    ).reduce((a, b) => {
      a[field][b[0]] = b[1]
      return a
    }, bestGain)
  } else {
    return bestGain
  }
}
