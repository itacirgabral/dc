const test = require('ava')
const {normalize} = require('./../src/normalize')

test('already normalized', t => {
  const dataset = [
    [
      [true],
      [
        ['k1', 'v1'],
        ['k2', 'v2']
      ]
    ],
    [
      [true],
      [
        ['k1', 'v3'],
        ['k2', 'v4']
      ]
    ]
  ]
  const normalized = normalize(dataset)
  t.deepEqual(normalized, dataset, 'should be the same');
})

test('missing', t => {
  const dataset = [
    [
      [true],
      [
        ['k1', 'v1']
      ]
    ],
    [
      [true],
      [
      ]
    ]
  ]
  const expected = [
    [
      [true],
      [
        ['k1', 'v1']
      ]
    ],
    [
      [true],
      [
        ['k1', 'undefined']
      ]
    ]
  ]
  const normalized = normalize(dataset)
  t.deepEqual(normalized, expected, 'should be the same');
})