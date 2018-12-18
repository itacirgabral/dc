const { states } = require('./share/states')
const { convert: scaffold } = require('./src/mcgraw2scaffold')
const dataset = states.map(scaffold)

console.log(JSON.stringify(dataset, null, 4))