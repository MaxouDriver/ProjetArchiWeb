module.exports = {
  devServer: {
      proxy: {
          '/api': {
            target: 'http://localhost:4500',
            ws: true,
            changeOrigin: true
          }
        },
    port: 3000
  }
}
