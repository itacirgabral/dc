const { states } = require('./share/states')
const { convert: scaffold } = require('./src/mcgraw2scaffold')
const { normalize } = require('./src/normalize')
const { id3: train } = require('./src/id3')

const dataset = normalize(states.map(scaffold))
const tree = train({dataset})

//console.log(JSON.stringify(tree, null, 2))
