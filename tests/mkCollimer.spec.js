const test = require('ava')
const { mkCollimer } = require('./../src/mkCollimer')
const dataset = [
  [
    [false],
    [
      ['Dia', 'D1'],
      ['Perspectiva', 'Ensolarado'],
      ['Temperatura', 'Quente'],
      ['Umidade', 'Alta'],
      ['Vento', 'Fraco']
    ]
  ],
  [
    [false],
    [
      ['Dia', 'D2'],
      ['Perspectiva', 'Ensolarado'],
      ['Temperatura', 'Quente'],
      ['Umidade', 'Alta'],
      ['Vento', 'Forte']
    ]
  ]
]

const collimer = mkCollimer(dataset)

test('slice one field of dataset', t => {
  t.plan(5)

  const exp1 = [[[false], ['Dia', 'D1']], [[false], ['Dia', 'D2']]]
  t.deepEqual(collimer('Dia'), exp1, 'shoul just slice Dia field')

  const exp2 = [[[false], ['Perspectiva', 'Ensolarado']], [[false], ['Perspectiva', 'Ensolarado']]]
  t.deepEqual(collimer('Perspectiva'), exp2, 'shoul just slice Perspectiva field')

  const exp3 = [[[false], ['Temperatura', 'Quente']], [[false], ['Temperatura', 'Quente']]]
  t.deepEqual(collimer('Temperatura'), exp3, 'shoul just slice Temperatura field')

  const exp4 = [[[false], ['Umidade', 'Alta']], [[false], ['Umidade', 'Alta']]]
  t.deepEqual(collimer('Umidade'), exp4, 'shoul just slice Umidade field')

  const exp5 = [[[false], ['Vento', 'Fraco']], [[false], ['Vento', 'Forte']]]
  t.deepEqual(collimer('Vento'), exp5, 'shoul just slice Vento field')
})
