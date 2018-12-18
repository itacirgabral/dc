const { datasetKeys } = require('./datasetKeys')
const { expandUndefined } = require('./expandUndefined')

exports.normalize = function normalize(dataset) {
  const keys = datasetKeys(dataset)
  const shape = expandUndefined(keys)
  return dataset.map(([type, fields]) => [type, shape(fields)])
}