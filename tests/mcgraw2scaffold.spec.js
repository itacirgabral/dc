const test = require('ava')
const { convert } = require('./../src/mcgraw2scaffold')

const mcgrawWay = {
  'Instancia': {
    'k1': 'v1',
    'k2': 'v2'
  },
  'Classe': true
}

test('return an array', t => {
  const converted = convert(mcgrawWay)
  t.true(Array.isArray(converted), 'should be an array')
})

test('Length aways 2', t => {
  const converted = convert(mcgrawWay)
  if (Array.isArray(converted)) {
    t.is(converted.length, 2, 'should have 2 places')
  } else {
    t.fail('Should be an Array')
  }
})

test('index 0 aways [bool]', t => {
  const converted = convert(mcgrawWay)
  if (!Array.isArray(converted)) {
    t.fail('Should be an Array')
  } else if (Array.isArray(converted[0]) && converted[0].length === 1) {
    const bool = typeof (converted[0][0]) === 'boolean'
    t.true(bool, 'index 0 should be a boolean')
  } else {
    t.fail('index 0 should be an array of one element')
  }
})

test('index 1 aways [string, string]', t => {
  const converted = convert(mcgrawWay)
  if (!Array.isArray(converted)) {
    t.fail('Should be an Array')
  } else if (Array.isArray(converted[1]) && converted[1].length > 1) {
    const strings = converted[1].every(e => typeof (e[0]) === 'string' && typeof (e[1]) === 'string')
    t.true(strings, 'index 1 should be an array of [key, value]')
  } else {
    t.fail('index 1 should be an array of more than one element')
  }
})

test('convert to standad array', t => {
  t.deepEqual(convert(mcgrawWay), [[true], [['k1', 'v1'], ['k2', 'v2']]], 'should flatten into entries')
})
