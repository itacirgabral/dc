const test = require('ava')
const { plog2p: d } = require('./../src/plog2p')

test('plog2p of 0.5', t => {
  const expected = 0.5 * Math.log2(0.5)
  t.is(d(0.5), expected, `should be ${expected}`)
})

test('out of range', t => {
  t.plan(4)
  t.is(d(0), 0, 'by definition')
  t.is(d(1), 0, 'log2(1) = 0')
  t.is(d(-1), NaN, 'log(-1) is bad')
  t.is(d('x'), NaN, 'log(0) is bad')
})
