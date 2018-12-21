exports.mkCollimer = function mkCollimer (dataset) {
  return function collimer (k) {
    return dataset.map(
      ([type, fields]) => [type, fields.filter(
        e => e[0] === k)[0]
    ])
  }
}