module.exports = {
  devServer: {
      proxy: {
          '/api': {
            target: 'http://90.93.116.39:4000',
            ws: true,
            changeOrigin: true
          }
        },
    port: 3000
  }
}