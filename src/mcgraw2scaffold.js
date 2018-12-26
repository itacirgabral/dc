exports.convert = function mcgraw2scaffold ({ Instancia: fields, Classe: type }) {
  return [[type], Object.entries(fields)]
}
