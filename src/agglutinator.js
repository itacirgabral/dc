exports.agglutinator = function agglutinator (arr) {
  const init = {
    'keys': {
      'list': [],
      'links': {}
    },
    'output': [
      [arr[0][1][0], 0, 0],
      []
    ]
  }

  return arr.reduce((a, [[type], [_, value]]) => {
    if (!a.keys.list.includes(value)) {
      a.keys.list.push(value)
      a.output[1].push([value, 0, 0])
      a.keys.links[value] = a.output[1].slice(-1)[0]
    }

    if (type) {
      a.output[0][1]++
      a.keys.links[value][1]++
    } else {
      a.output[0][2]++
      a.keys.links[value][2]++
    }

    return a
  }, init).output
}
