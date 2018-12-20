const test = require('ava')
const { gain } = require('./../src/gain')

const expected = {}
const input = {}

input.Perspectiva = [
  ["Perspectiva", 9, 5],
  [
    ["Ensolarado", 2, 3],
    ["Nublado", 4, 0],
    ["Chuvoso", 3, 2]
  ]
]
input.Umidade = [
  ["Umidade", 9, 5],
  [
    ["Alta", 3, 4],
    ["Normal", 6, 1]
  ]
]
input.Vento =  [
  ["Vento", 9, 5],
  [
    ["Fraco", 6, 2],
    ["Forte", 3, 3]
  ]
]
input.Temperatura = [
  ["Temperatura", 9, 5],
  [
    ["Quente", 2, 2],
    ["Moderada", 4, 2],
    ["Fresca", 3, 1]
  ]
]

expected.Perspectiva = 0.246
expected.Umidade = 0.151
expected.Vento = 0.048
expected.Temperatura = 0.029

test('Gains made Perspectiva field', t => {
  const dif = gain(input.Perspectiva) - expected.Perspectiva
  t.true( -0.05 < dif && dif < 0.05, 'Should be close to 0.246')
})
test('Gains made Umidade field', t => {
  const dif = gain(input.Umidade) - expected.Umidade
  t.true( -0.05 < dif && dif < 0.05, 'Should be close to 0.151')
})
test('Gains made Vento field', t => {
  const dif = gain(input.Vento) - expected.Vento
  t.true( -0.05 < dif && dif < 0.05, 'Should be close to 0.048')
})
test('Gains made Temperatura field', t => {
  const dif = gain(input.Temperatura) - expected.Temperatura
  t.true( -0.05 < dif && dif < 0.05, 'Should be close to 0.029')
})
