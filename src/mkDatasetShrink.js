exports.mkDatasetShrink = function mkDatasetShrink (dataset, field) {
  return function datasetShrink (value) {
    return dataset.filter(
      ([type, fields]) => fields.find(
        ([k, v]) => k === field && v === value
      )
    ).map(
      ([type, fields]) => [type, fields.filter(
        ([k, v]) => k !== field || v !== value
      )])
  }
}
