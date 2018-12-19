const test = require('ava')
const {plog2p: d} = require('./../src/plog2p')

test('plog2p of 0.5', t => {
  const expected = 0.5 * Math.log2(0.5)
  t.is(d(0.5), expected, `should be ${expected}`);
})

test('out of range', t => {
  t.plan(5)
  t.is(d(0), NaN, 'log(0) is bad')
  t.is(d(-1), NaN, 'log(-1) is bad')
  t.is(d(1), NaN, 'p = 1 -> q = 1 - p = 0 is bad')
  t.is(d(2), NaN, 'log(n > 1) is bad')
  t.is(d('x'), NaN, 'log(0) is bad');
})