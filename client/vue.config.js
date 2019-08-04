module.exports = {
  devServer: {
    proxy: {
    	'/api': {
    		target: process.env.VUE_APP_PROXY,
    		pathRewrite: {'^/api': ''},
    		changeOrigin: true
    	}
    }
  }
}
