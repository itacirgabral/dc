const test = require('ava')
const { mkClassifier } = require('./../src/mkClassifier')

const tree = {
  [Symbol.for('gain')]: 0.24674981977443905,
  [Symbol.for('gridsheet')]: [
    [
      "Perspectiva",
      9,
      5
    ],
    [
      [
        "Ensolarado",
        2,
        3
      ],
      [
        "Nublado",
        4,
        0
      ],
      [
        "Chuvoso",
        3,
        2
      ]
    ]
  ],
  'Perspectiva': {
    'Ensolarado': {
      [Symbol.for('gain')]: 0.9709505944546686,
      [Symbol.for('gridsheet')]: [
        [
          "Umidade",
          2,
          3
        ],
        [
          [
            "Alta",
            0,
            3
          ],
          [
            "Normal",
            2,
            0
          ]
        ]
      ],
      'Umidade': {
        'Alta': false,
        'Normal': true
      }
    },
    'Nublado': true,
    'Chuvoso': {
      [Symbol.for('gain')]: 0.9709505944546686,
      [Symbol.for('gridsheet')]: [
        [
          "Vento",
          3,
          2
        ],
        [
          [
            "Fraco",
            3,
            0
          ],
          [
            "Forte",
            0,
            2
          ]
        ]
      ],
      'Vento': {
        'Fraco': true,
        'Forte': false
      }
    }
  }
}

const classer = mkClassifier(tree)

const queries = {}
queries.true = [
  {"Perspectiva":"Chuvoso","Temperatura":"Fresca","Umidade":"Normal","Vento":"Fraco"},
  {"Perspectiva":"Chuvoso","Temperatura":"Moderada","Umidade":"Alta","Vento":"Fraco"},
  {"Perspectiva":"Chuvoso","Temperatura":"Moderada","Umidade":"Normal","Vento":"Fraco"},
  {"Perspectiva":"Ensolarado","Temperatura":"Fresca","Umidade":"Normal","Vento":"Fraco"},
  {"Perspectiva":"Ensolarado","Temperatura":"Moderada","Umidade":"Normal","Vento":"Forte"},
  {"Perspectiva":"Nublado","Temperatura":"Fresca","Umidade":"Normal","Vento":"Forte"},
  {"Perspectiva":"Nublado","Temperatura":"Moderada","Umidade":"Alta","Vento":"Forte"},
  {"Perspectiva":"Nublado","Temperatura":"Quente","Umidade":"Alta","Vento":"Fraco"},
  {"Perspectiva":"Nublado","Temperatura":"Quente","Umidade":"Normal","Vento":"Fraco"}
]

queries.false = [
  {"Perspectiva":"Chuvoso","Temperatura":"Fresca","Umidade":"Normal","Vento":"Forte"},
  {"Perspectiva":"Chuvoso","Temperatura":"Moderada","Umidade":"Alta","Vento":"Forte"},
  {"Perspectiva":"Ensolarado","Temperatura":"Moderada","Umidade":"Alta","Vento":"Fraco"},
  {"Perspectiva":"Ensolarado","Temperatura":"Quente","Umidade":"Alta","Vento":"Forte"},
  {"Perspectiva":"Ensolarado","Temperatura":"Quente","Umidade":"Alta","Vento":"Fraco"}
]

queries.untrained = [
  {"Perspectiva":"Chuvoso","Temperatura":"Fresca","Umidade":"Alta","Vento":"Forte"},
  {"Perspectiva":"Chuvoso","Temperatura":"Fresca","Umidade":"Alta","Vento":"Fraco"},
  {"Perspectiva":"Chuvoso","Temperatura":"Moderada","Umidade":"Normal","Vento":"Forte"},
  {"Perspectiva":"Chuvoso","Temperatura":"Quente","Umidade":"Alta","Vento":"Forte"},
  {"Perspectiva":"Chuvoso","Temperatura":"Quente","Umidade":"Alta","Vento":"Fraco"},
  {"Perspectiva":"Chuvoso","Temperatura":"Quente","Umidade":"Normal","Vento":"Forte"},
  {"Perspectiva":"Chuvoso","Temperatura":"Quente","Umidade":"Normal","Vento":"Fraco"},
  {"Perspectiva":"Ensolarado","Temperatura":"Fresca","Umidade":"Alta","Vento":"Forte"},
  {"Perspectiva":"Ensolarado","Temperatura":"Fresca","Umidade":"Alta","Vento":"Fraco"},
  {"Perspectiva":"Ensolarado","Temperatura":"Fresca","Umidade":"Normal","Vento":"Forte"},
  {"Perspectiva":"Ensolarado","Temperatura":"Moderada","Umidade":"Alta","Vento":"Forte"},
  {"Perspectiva":"Ensolarado","Temperatura":"Moderada","Umidade":"Normal","Vento":"Fraco"},
  {"Perspectiva":"Ensolarado","Temperatura":"Quente","Umidade":"Normal","Vento":"Forte"},
  {"Perspectiva":"Ensolarado","Temperatura":"Quente","Umidade":"Normal","Vento":"Fraco"},
  {"Perspectiva":"Nublado","Temperatura":"Fresca","Umidade":"Alta","Vento":"Forte"},
  {"Perspectiva":"Nublado","Temperatura":"Fresca","Umidade":"Alta","Vento":"Fraco"},
  {"Perspectiva":"Nublado","Temperatura":"Fresca","Umidade":"Normal","Vento":"Fraco"},
  {"Perspectiva":"Nublado","Temperatura":"Moderada","Umidade":"Alta","Vento":"Fraco"},
  {"Perspectiva":"Nublado","Temperatura":"Moderada","Umidade":"Normal","Vento":"Forte"},
  {"Perspectiva":"Nublado","Temperatura":"Moderada","Umidade":"Normal","Vento":"Fraco"},
  {"Perspectiva":"Nublado","Temperatura":"Quente","Umidade":"Alta","Vento":"Forte"},
  {"Perspectiva":"Nublado","Temperatura":"Quente","Umidade":"Normal","Vento":"Forte"}
]

test('classification test with trained true dataset', t => {
  t.plan(queries.true.length)
  for (let i = 0; i < queries.true.length; i++) {
    t.true(classer(queries.true[i]))
  }
})

test('classification test with trained false dataset', t => {
  t.plan(queries.false.length)
  for (let i = 0; i < queries.false.length; i++) {
    t.false(classer(queries.false[i]))
  }
})

test('classification all untrained combinations', t => {
  const types = [true, false]
  t.plan(queries.untrained.length)
  for (let i = 0; i < queries.untrained.length; i++) {
    t.true(types.includes(classer(queries.untrained[i])))
  }
})