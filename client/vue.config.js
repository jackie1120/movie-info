const path = require('path')

module.exports = {
  devServer: {
    proxy: process.env.VUE_APP_PROXY
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('services', path.resolve(__dirname, './src/services'))
  }
}
