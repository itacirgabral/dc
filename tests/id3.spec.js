const test = require('ava')
const { id3: train } = require('./../src/id3')

const rmSymbol = e => JSON.parse(JSON.stringify(e))
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

  const result = train({ dataset: dataset.terminal })

  t.deepEqual(rmSymbol(result), expected.terminal)
})

test('id3 training binary', t => {
  dataset.binary = [
    [[true], [['k1', 'v1'], ['k2', 'v1']]],
    [[false], [['k1', 'v1'], ['k2', 'v2']]],
    [[false], [['k1', 'v2'], ['k2', 'v1']]],
    [[true], [['k1', 'v2'], ['k2', 'v2']]]
  ]
  expected.binary = {
    'k1': {
      'v1': {
        'k2': {
          'v1': true,
          'v2': false
        }
      },
      'v2': {
        'k2': {
          'v1': false,
          'v2': true
        }
      }
    }
  }

  const result = train({ dataset: dataset.binary })

  t.deepEqual(rmSymbol(result), expected.binary)
})
