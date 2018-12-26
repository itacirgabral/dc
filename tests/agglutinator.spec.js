const test = require('ava')
const { agglutinator } = require('./../src/agglutinator')

const input = {}
const expected = {}

input.Perspectiva = [
  [
    [true],
    ['Perspectiva', 'Ensolarado']
  ],
  [
    [true],
    ['Perspectiva', 'Ensolarado']
  ],
  [
    [true],
    ['Perspectiva', 'Nublado']
  ],
  [
    [true],
    ['Perspectiva', 'Nublado']
  ],
  [
    [true],
    ['Perspectiva', 'Nublado']
  ],
  [
    [true],
    ['Perspectiva', 'Nublado']
  ],
  [
    [true],
    ['Perspectiva', 'Chuvoso']
  ],
  [
    [true],
    ['Perspectiva', 'Chuvoso']
  ],
  [
    [true],
    ['Perspectiva', 'Chuvoso']
  ],
  [
    [false],
    ['Perspectiva', 'Ensolarado']
  ],
  [
    [false],
    ['Perspectiva', 'Ensolarado']
  ],
  [
    [false],
    ['Perspectiva', 'Ensolarado']
  ],
  [
    [false],
    ['Perspectiva', 'Chuvoso']
  ],
  [
    [false],
    ['Perspectiva', 'Chuvoso']
  ]
]

input.Vento = [
  [
    [true],
    ['Vento', 'Fraco']
  ],
  [
    [true],
    ['Vento', 'Fraco']
  ],
  [
    [true],
    ['Vento', 'Fraco']
  ],
  [
    [true],
    ['Vento', 'Fraco']
  ],
  [
    [true],
    ['Vento', 'Fraco']
  ],
  [
    [true],
    ['Vento', 'Fraco']
  ],
  [
    [true],
    ['Vento', 'Forte']
  ],
  [
    [true],
    ['Vento', 'Forte']
  ],
  [
    [true],
    ['Vento', 'Forte']
  ],
  [
    [false],
    ['Vento', 'Fraco']
  ],
  [
    [false],
    ['Vento', 'Fraco']
  ],
  [
    [false],
    ['Vento', 'Forte']
  ],
  [
    [false],
    ['Vento', 'Forte']
  ],
  [
    [false],
    ['Vento', 'Forte']
  ]
]

expected.Perspectiva = [
  ['Perspectiva', 9, 5],
  [
    ['Ensolarado', 2, 3],
    ['Nublado', 4, 0],
    ['Chuvoso', 3, 2]
  ]
]

expected.Vento = [
  ['Vento', 9, 5],
  [
    ['Fraco', 6, 2],
    ['Forte', 3, 3]
  ]
]

test('collapse Perspectiva fields into groups', t => {
  t.deepEqual(agglutinator(input.Perspectiva), expected.Perspectiva)
})

test('collapse Vento fields into groups', t => {
  t.deepEqual(agglutinator(input.Vento), expected.Vento)
})
