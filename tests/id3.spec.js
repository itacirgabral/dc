const test = require('ava')
const { id3: train } = require('./../src/id3')

const dataset = {}
const expected = {}

test('id3 training terminal node', t => {
  dataset.terminal = [
    [[true],[['k1', 'v1']]],
    [[true],[['k1', 'v1']]],
    [[false],[['k1', 'v2']]],
    [[false],[['k1', 'v2']]]
  ]
  expected.terminal = {
    'k1': {
      'v1': true,
      'v2': false
    }
  }

  const {gain, gridsheet, ...value} = train({dataset: dataset.terminal})

  t.deepEqual(value, expected.terminal)

})

test.skip('id3 training binary', t => {
  // O.o it shoul fail!
  dataset.binary = [
    [[true],[['k1', 'v1'], ['k2', 'v1']]],
    [[true],[['k1', 'v1'], ['k2', 'v2']]],
    [[true],[['k1', 'v2'], ['k2', 'v1']]],
    [[false],[['k1', 'v2'], ['k2', 'v2']]]
  ]
  expected.binary = {
    'k1': {
      'v1': true,
      'v2': false
    }
  }

  const {gain, gridsheet, ...value} = train({dataset: dataset.binary})

  t.deepEqual(value, expected.binary)

})