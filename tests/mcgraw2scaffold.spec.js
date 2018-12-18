const test = require('ava')
const {convert} = require('./../src/mcgraw2scaffold')

const mcgrawWay = { 
    "Instancia": {
      "k1": "v1",
      "k2": "v2"
      },
    "Classe": true
  }

test('convert to standad array', t => {
    t.deepEqual(convert(mcgrawWay), [[true],[['k1', 'v1'],['k2', 'v2']]], 'should flatten into entries');
})