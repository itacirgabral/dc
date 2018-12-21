const { datasetKeys } = require('./datasetKeys')
const { mkCollimer } = require('./mkCollimer')
const { agglutinator } = require('./agglutinator')
const { mkGerm } = require('./mkGerm')
const { mkDatasetShrink } = require('./mkDatasetShrink')

exports.id3 = function id3({ dataset, keys}) {
  const collimer = mkCollimer(dataset)

  if (!keys) {
    console.log('not keys, generating...')
    keys = datasetKeys(dataset)
  } else {
    console.log('have keys')
  }
  console.log(`keys: ${JSON.stringify(keys)}`)
  const endLeaf = keys.length === 1

  const collimed = keys.map(collimer)
  const agglutined = collimed.map(agglutinator)
  
  const germination = mkGerm(endLeaf)
  const gainsEach = agglutined.map(germination)

  const bestGain = gainsEach.slice(1).reduce((a, b) => {
    return a.gain > b.gain ? a : b
  }, gainsEach[0])
  const field = bestGain.gridsheet[0][0]

  if (!endLeaf) {
    const nextKeys = keys.filter(e => e !== field)
    const ungermined = Object.entries(bestGain[field]).filter(
      ([k, v]) => v === ''
    )
    
    const mkDataset = mkDatasetShrink(dataset, field)

    ungermined.map(
      ([k]) => {
        const dataset = mkDataset(k)
        const nextLeaf = id3({dataset, keys: nextKeys})
        return [k, nextLeaf]
      }
      )

    return ungermined.reduce((a, b) => {
      a[field][b[0]] = b[1]
      return a
    }, bestGain)

  } else {
    return bestGain
  }
}