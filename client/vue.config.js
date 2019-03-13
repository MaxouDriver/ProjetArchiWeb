module.exports = {
  devServer: {
      proxy: {
          '/api': {
            target: '',
            ws: true,
            changeOrigin: true
          }
        },
    port: 3000
  }
}
