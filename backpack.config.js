const path = require('path')

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = './server/index.js'
    config.resolve.alias = { '~': path.join(__dirname, './') }

    return config
  }
}
