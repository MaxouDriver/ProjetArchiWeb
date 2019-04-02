const serverInfos = require('../serverInfos.json');
var nodeJServerUrl = serverInfos.nodeJServer;
var clientPort = serverInfos.clientPort;
var serverPort = serverInfos.serverPort;

module.exports = {
  devServer: {
      proxy: {
          '/api': {
            target: nodeJServerUrl + serverPort,
            ws: true,
            changeOrigin: true
          }
        },
    port: clientPort,
    disableHostCheck: true
  }
};
