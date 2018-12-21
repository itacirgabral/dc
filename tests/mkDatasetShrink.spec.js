const test = require('ava')
const { mkDatasetShrink } = require('./../src/mkDatasetShrink')

const dataset = [[[false],[["Perspectiva","Ensolarado"],["Temperatura","Quente"],["Umidade","Alta"],["Vento","Fraco"]]],[[false],[["Perspectiva","Ensolarado"],["Temperatura","Quente"],["Umidade","Alta"],["Vento","Forte"]]],[[true],[["Perspectiva","Nublado"],["Temperatura","Quente"],["Umidade","Alta"],["Vento","Fraco"]]],[[true],[["Perspectiva","Chuvoso"],["Temperatura","Moderada"],["Umidade","Alta"],["Vento","Fraco"]]],[[true],[["Perspectiva","Chuvoso"],["Temperatura","Fresca"],["Umidade","Normal"],["Vento","Fraco"]]],[[false],[["Perspectiva","Chuvoso"],["Temperatura","Fresca"],["Umidade","Normal"],["Vento","Forte"]]],[[true],[["Perspectiva","Nublado"],["Temperatura","Fresca"],["Umidade","Normal"],["Vento","Forte"]]],[[false],[["Perspectiva","Ensolarado"],["Temperatura","Moderada"],["Umidade","Alta"],["Vento","Fraco"]]],[[true],[["Perspectiva","Ensolarado"],["Temperatura","Fresca"],["Umidade","Normal"],["Vento","Fraco"]]],[[true],[["Perspectiva","Chuvoso"],["Temperatura","Moderada"],["Umidade","Normal"],["Vento","Fraco"]]],[[true],[["Perspectiva","Ensolarado"],["Temperatura","Moderada"],["Umidade","Normal"],["Vento","Forte"]]],[[true],[["Perspectiva","Nublado"],["Temperatura","Moderada"],["Umidade","Alta"],["Vento","Forte"]]],[[true],[["Perspectiva","Nublado"],["Temperatura","Quente"],["Umidade","Normal"],["Vento","Fraco"]]],[[false],[["Perspectiva","Chuvoso"],["Temperatura","Moderada"],["Umidade","Alta"],["Vento","Forte"]]]]
const field = 'Perspectiva'
const datasetShrink = mkDatasetShrink(dataset, field)

const expected = {}
expected.Ensolarado = [[[false],[["Temperatura","Quente"],["Umidade","Alta"],["Vento","Fraco"]]],[[false],[["Temperatura","Quente"],["Umidade","Alta"],["Vento","Forte"]]],[[false],[["Temperatura","Moderada"],["Umidade","Alta"],["Vento","Fraco"]]],[[true],[["Temperatura","Fresca"],["Umidade","Normal"],["Vento","Fraco"]]],[[true],[["Temperatura","Moderada"],["Umidade","Normal"],["Vento","Forte"]]]]
expected.Chuvoso = [[[true],[["Temperatura","Moderada"],["Umidade","Alta"],["Vento","Fraco"]]],[[true],[["Temperatura","Fresca"],["Umidade","Normal"],["Vento","Fraco"]]],[[false],[["Temperatura","Fresca"],["Umidade","Normal"],["Vento","Forte"]]],[[true],[["Temperatura","Moderada"],["Umidade","Normal"],["Vento","Fraco"]]],[[false],[["Temperatura","Moderada"],["Umidade","Alta"],["Vento","Forte"]]]]

test('dataset shrink of Perspectiva.Ensolarado', t => {
  t.deepEqual(datasetShrink('Ensolarado'), expected.Ensolarado)
})

test('dataset shrink of Perspectiva.Chuvoso', t => {
  t.deepEqual(datasetShrink('Chuvoso'), expected.Chuvoso)
})