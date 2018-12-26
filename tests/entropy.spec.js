const test = require('ava')
const { entropy } = require('./../src/entropy')

test('entropy values', t => {
  t.plan(3)
  const dif1 = entropy(9, 5) - 0.94
  t.true(dif1 > -0.05 && dif1 < 0.05, 'E(9, 4) should be 0.94')

  const dif2 = entropy(9, 5, 0) - 0.94
  t.true(dif2 > -0.05 && dif2 < 0.05, 'E(9, 4, 0) should be 0.94')

  t.is(entropy(9, 0), 0, 'E(9, 0) should be 0')
})
