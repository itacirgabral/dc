const test = require('ava')
const { mkGerm } = require('./../src/mkGerm')
const rmSymbol = e => JSON.parse(JSON.stringify(e))

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
    'Perspectiva': {
      'Ensolarado': '',
      'Nublado': true,
      'Chuvoso': ''
    } }

  const endLeaf = false

  const result = mkGerm(endLeaf)(input)
  t.deepEqual(rmSymbol(result), expected, 'should build tree branch')
})

test('germinate Perspectiva at end leaf', t => {
  const expected = {
    'Perspectiva': {
      'Ensolarado': false,
      'Nublado': true,
      'Chuvoso': true
    } }

  const endLeaf = true

  const result = mkGerm(endLeaf)(input)
  t.deepEqual(rmSymbol(result), expected, 'should build terminal tree branch')
})
