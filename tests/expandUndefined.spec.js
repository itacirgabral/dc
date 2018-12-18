const test = require('ava')
const { expandUndefined } = require('./../src/expandUndefined')

const shape = expandUndefined(['k1', 'k2'])

test('already shaped', t => {
  const fields = [
    ['k1', 'v1'],
    ['k2', 'v2']
  ]
  const shaped = shape(fields)
  t.deepEqual(shaped, fields, 'should be the same')
})

test('remaining', t => {
  const fields = [
    ['k1', 'v1'],
    ['k2', 'v2'],
    ['k3', 'v3']
  ]
  const shaped = shape(fields)
  t.deepEqual(shaped, [['k1', 'v1'], ['k2', 'v2']], 'should scape k3')
})

test('doubled', t => {
  const fields = [
    ['k1', 'v1'],
    ['k2', 'v2'],
    ['k1', 'v3']
  ]
  const shaped = shape(fields)
  t.deepEqual(shaped, [['k1', 'v1'], ['k2', 'v2']], 'should scape second k1')
})

test('missing', t => {
  const fields = [
    ['k1', 'v1']
  ]
  const shaped = shape(fields)
  t.deepEqual(shaped, [['k1', 'v1'], ['k2', 'undefined']], 'should push k2')
})