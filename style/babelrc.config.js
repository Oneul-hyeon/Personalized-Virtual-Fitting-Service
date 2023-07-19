module.exports = function (api) {
  // api.cache.forever()
  api.cache(true)
  return {
    plugins: ['macros'],
  }
}
