const test = require('ava')
const { agglutinator } = require('./../src/agglutinator')

const input = [
  [[true],    ["Perspectiva","Ensolarado" ]],
  [[true],    ["Perspectiva","Ensolarado" ]],
  [[true],    ["Perspectiva","Nublado"    ]],
  [[true],    ["Perspectiva","Nublado"    ]],
  [[true],    ["Perspectiva","Nublado"    ]],
  [[true],    ["Perspectiva","Nublado"    ]],
  [[true],    ["Perspectiva","Chuvoso"    ]],
  [[true],    ["Perspectiva","Chuvoso"    ]],
  [[true],    ["Perspectiva","Chuvoso"    ]],
  [[false],   ["Perspectiva","Ensolarado" ]],
  [[false],   ["Perspectiva","Ensolarado" ]],
  [[false],   ["Perspectiva","Ensolarado" ]],
  [[false],   ["Perspectiva","Chuvoso"    ]],
  [[false],   ["Perspectiva","Chuvoso"    ]]
]

const expected = [
  ['Perspectiva', 9, 5],
  [
    ['Ensolarado', 2, 3],
    ['Nublado', 4, 0],
    ['Chuvoso', 3, 2]
  ]
]

test("collapse fields into groups", t => {
  t.deepEqual(agglutinator(input), expected,);
})