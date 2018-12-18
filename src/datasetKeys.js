exports.datasetKeys = function datasetKeys (dataset) {
  return dataset.reduce((a, b) => {
    if (Array.isArray(b) && b.length === 2 && Array.isArray(b[1])) {
      const bkeys = b[1].map(e => e[0])
      bkeys.forEach(e => {
        if (!a.includes(e)) {
          a.push(e)
        }
      })
    }
    return a
  } ,[])
}