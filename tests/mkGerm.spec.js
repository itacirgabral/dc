const test = require('ava')
const { mkGerm } = require('./../src/mkGerm')
const { gain } = require('./../src/gain')

const input = [
  ['Perspectiva', 9, 5],
  [
    ['Ensolarado', 2, 3],
    ['Nublado', 4, 0],
    ['Chuvoso', 3, 2]
  ]
]

test('germinate Perspectiva', t => {
  const expected = {
    [Symbol.for('gain')]: gain(input),
    [Symbol.for('gridsheet')]: input,
    'Perspectiva': {
      'Ensolarado': '',
      'Nublado': true,
      'Chuvoso': ''
    } }

  const endLeaf = false

  t.deepEqual(mkGerm(endLeaf)(input), expected, 'should build tree branch')
})

test('germinate Perspectiva at end leaf', t => {
  const expected = {
    [Symbol.for('gain')]: gain(input),
    [Symbol.for('gridsheet')]: input,
    'Perspectiva': {
      'Ensolarado': false,
      'Nublado': true,
      'Chuvoso': true
    } }

  const endLeaf = true

  t.deepEqual(mkGerm(endLeaf)(input), expected, 'should build terminal tree branch')
})
