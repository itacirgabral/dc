const test = require('ava')
const { datasetKeys } = require('./../src/datasetKeys')

test('regular dataset', t => {
  const keys = datasetKeys([
    [[true],[['k1', 'v1'],['k2', 'v2']]],
    [[false],[['k1', 'v3'],['k2', 'v4']]]
  ])
  t.deepEqual(keys, ['k1', 'k2'], 'should return array with k1 and k2')
})

test('composed dataset', t => {
  const keys = datasetKeys([
    [[true],[['k1', 'v1']]],
    [[false],[['k2', 'v2']]]
  ])
  t.deepEqual(keys, ['k1', 'k2'], 'should return array with k1 and k2')
})

test('repeted dataset key', t => {
  const keys = datasetKeys([
    [[true],[['k1', 'v1']]],
    [[true],[['k1', 'v1']]],
    [[false],[['k1', 'v2']]],
    [[false],[['k1', 'v2']]]
  ])
  t.deepEqual(keys, ['k1'], 'should return array with k1')
})