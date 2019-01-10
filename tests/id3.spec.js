const test = require('ava')
const { id3: train } = require('./../src/id3')

const dataset = {}
const expected = {}

test('id3 training terminal node', t => {
  dataset.terminal = [
    [[true], [['k1', 'v1']]],
    [[false], [['k1', 'v2']]]
  ]
  expected.terminal = {
    'k1': {
      'v1': true,
      'v2': false
    }
  }

  const { [Symbol.for('gain')]: gain, [Symbol.for('gridsheet')]:gridsheet, ...value } = train({ dataset: dataset.terminal })

  t.deepEqual(value, expected.terminal)
})

test('id3 training binary', t => {
  dataset.binary = [
    [[true], [['k1', 'v1'], ['k2', 'v1']]],
    [[false], [['k1', 'v1'], ['k2', 'v2']]],
    [[false], [['k1', 'v2'], ['k2', 'v1']]],
    [[true], [['k1', 'v2'], ['k2', 'v2']]]
  ]
  expected.binary = { [Symbol.for('gain')]: 0, [Symbol.for('gridsheet')]: [['k1', 2, 2], [['v1', 1, 1], ['v2', 1, 1]]], 'k1': { 'v1': { [Symbol.for('gain')]: 1, [Symbol.for('gridsheet')]: [['k2', 1, 1], [['v1', 1, 0], ['v2', 0, 1]]], 'k2': { 'v1': true, 'v2': false } }, 'v2': { [Symbol.for('gain')]: 1, [Symbol.for('gridsheet')]: [['k2', 1, 1], [['v1', 0, 1], ['v2', 1, 0]]], 'k2': { 'v1': false, 'v2': true } } } }

  const value = train({ dataset: dataset.binary })

  t.deepEqual(value, expected.binary)
})
