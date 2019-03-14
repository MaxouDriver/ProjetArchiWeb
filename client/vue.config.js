var url = require('../serverInfos.json').nodeJServer

module.exports = {
  devServer: {
      proxy: {
          '/api': {
            target: url,
            ws: true,
            changeOrigin: true
          }
        },
    port: 3000
  }
};
