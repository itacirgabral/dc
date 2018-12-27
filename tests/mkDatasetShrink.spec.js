const test = require('ava')
const { mkDatasetShrink } = require('./../src/mkDatasetShrink')

const dataset = {}
const expected = {}
const datasetShrink = {}
const field = {}

dataset.clima = [
  [[false], [['Perspectiva', 'Ensolarado'], ['Temperatura', 'Quente'], ['Umidade', 'Alta'], ['Vento', 'Fraco']]],
  [[false], [['Perspectiva', 'Ensolarado'], ['Temperatura', 'Quente'], ['Umidade', 'Alta'], ['Vento', 'Forte']]],
  [[false], [['Perspectiva', 'Ensolarado'], ['Temperatura', 'Moderada'], ['Umidade', 'Alta'], ['Vento', 'Fraco']]],
  [[true], [['Perspectiva', 'Ensolarado'], ['Temperatura', 'Moderada'], ['Umidade', 'Normal'], ['Vento', 'Forte']]],
  [[true], [['Perspectiva', 'Ensolarado'], ['Temperatura', 'Fresca'], ['Umidade', 'Normal'], ['Vento', 'Fraco']]],
  [[true], [['Perspectiva', 'Nublado'], ['Temperatura', 'Quente'], ['Umidade', 'Alta'], ['Vento', 'Fraco']]],
  [[true], [['Perspectiva', 'Nublado'], ['Temperatura', 'Fresca'], ['Umidade', 'Normal'], ['Vento', 'Forte']]],
  [[true], [['Perspectiva', 'Nublado'], ['Temperatura', 'Moderada'], ['Umidade', 'Alta'], ['Vento', 'Forte']]],
  [[true], [['Perspectiva', 'Nublado'], ['Temperatura', 'Quente'], ['Umidade', 'Normal'], ['Vento', 'Fraco']]],
  [[true], [['Perspectiva', 'Chuvoso'], ['Temperatura', 'Moderada'], ['Umidade', 'Normal'], ['Vento', 'Fraco']]],
  [[true], [['Perspectiva', 'Chuvoso'], ['Temperatura', 'Moderada'], ['Umidade', 'Alta'], ['Vento', 'Fraco']]],
  [[true], [['Perspectiva', 'Chuvoso'], ['Temperatura', 'Fresca'], ['Umidade', 'Normal'], ['Vento', 'Fraco']]],
  [[false], [['Perspectiva', 'Chuvoso'], ['Temperatura', 'Fresca'], ['Umidade', 'Normal'], ['Vento', 'Forte']]],
  [[false], [['Perspectiva', 'Chuvoso'], ['Temperatura', 'Moderada'], ['Umidade', 'Alta'], ['Vento', 'Forte']]]
]

field.clima = 'Perspectiva'
datasetShrink.clima = mkDatasetShrink(dataset.clima, field.clima)

expected.Ensolarado = [
  [[false], [['Temperatura', 'Quente'], ['Umidade', 'Alta'], ['Vento', 'Fraco']]],
  [[false], [['Temperatura', 'Quente'], ['Umidade', 'Alta'], ['Vento', 'Forte']]],
  [[false], [['Temperatura', 'Moderada'], ['Umidade', 'Alta'], ['Vento', 'Fraco']]],
  [[true], [['Temperatura', 'Moderada'], ['Umidade', 'Normal'], ['Vento', 'Forte']]],
  [[true], [['Temperatura', 'Fresca'], ['Umidade', 'Normal'], ['Vento', 'Fraco']]]

]
expected.Chuvoso = [
  [[true], [['Temperatura', 'Moderada'], ['Umidade', 'Normal'], ['Vento', 'Fraco']]],
  [[true], [['Temperatura', 'Moderada'], ['Umidade', 'Alta'], ['Vento', 'Fraco']]],
  [[true], [['Temperatura', 'Fresca'], ['Umidade', 'Normal'], ['Vento', 'Fraco']]],
  [[false], [['Temperatura', 'Fresca'], ['Umidade', 'Normal'], ['Vento', 'Forte']]],
  [[false], [['Temperatura', 'Moderada'], ['Umidade', 'Alta'], ['Vento', 'Forte']]]]

test('dataset shrink of Perspectiva.Ensolarado', t => {
  t.deepEqual(datasetShrink.clima('Ensolarado'), expected.Ensolarado)
})

test('dataset shrink of Perspectiva.Chuvoso', t => {
  t.deepEqual(datasetShrink.clima('Chuvoso'), expected.Chuvoso)
})

dataset.kk = [
  [[true],[["k1","v1"],["k2","v1"]]],
  [[false],[["k1","v1"],["k2","v2"]]],
  [[false],[["k1","v2"],["k2","v1"]]],
  [[false],[["k1","v2"],["k2","v2"]]]
]

field.kk = 'k1'
datasetShrink.kk = mkDatasetShrink(dataset.kk, field.kk)

expected.k1v1 = [
  [[true],[["k2","v1"]]],
  [[false],[["k2","v2"]]]
]
expected.k1v2 = [
  [[false],[["k2","v1"]]],
  [[false],[["k2","v2"]]]
]

test('edge case', t => {
  t.plan(2)
  t.deepEqual(datasetShrink.kk('v1'), expected.k1v1)
  t.deepEqual(datasetShrink.kk('v2'), expected.k1v2)
})