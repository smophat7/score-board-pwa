module.exports = {
  lintOnSave: false,
  transpileDependencies: ["vuetify"],
  devServer: {
    // proxy: {
      proxy: "http://localhost:3000",
    // "^api/": {
        // target: 'http://localhost:3000',
        // changeOrigin: true,
        // pathRewrite: {'^/api': '/api'},
        // logLevel: "debug",
      // }
    // }
    // proxy: 'http://localhost:3000',
    // disableHostCheck: true
  }
};