const test = require('ava')
const { entropy: E } = require('./../src/entropy')

test('entropy values', t => {
  t.true(E(9, 5) - 0.94 < 0.05, 'E(9, 4) should be 0.94')
})