const { datasetKeys } = require('./datasetKeys')
const { mkCollimer } = require('./mkCollimer')
const { agglutinator } = require('./agglutinator')
const { mkGerm } = require('./mkGerm')
const { mkDatasetShrink } = require('./mkDatasetShrink')

function id3({ dataset, keys}) {
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
    console.log(`!endLeaf: ${!endLeaf}`)

    const field = bestGain.gridsheet[0][0]
    const nextKeys = keys.filter(e => e !== field)
    const ungermined = Object.entries(bestGain[field]).filter(
      ([k, v]) => v === ''
    )
    
    const mkDataset = mkDatasetShrink(dataset, field)

    ungermined.map(([k]) => { 
      console.log(`${field}.${k}`)
      console.log(`##########`)
      const dataset = mkDataset(k)
      console.log(JSON.stringify(dataset, null, 2))
      console.log(`##########`)
      return [k, 
        id3({
          dataset, 
          keys: nextKeys
        })
      ]}
    )


    return ungermined.reduce((a, b) => {
      
      a[field][b[0]] = b[1]

      return a

    }, bestGain)
  } else {
    console.log(`!endLeaf: ${!endLeaf}`)
    return bestGain
  }
}

exports.id3 = id3