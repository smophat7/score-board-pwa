module.exports = {
  lintOnSave: false,
  transpileDependencies: ["vuetify"],

  pwa: {
    name: "ScoreBoard",
    themeColor: '#3949ab',
    msTileColor: '#3949ab',
    display: "fullscreen",
    manifestOptions: {
      background_color: '#3949ab',
      icons: [{
          src: "img/icons/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "img/icons/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "img/icons/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png"
        },
        {
          src: "img/icons/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png"
        }
      ]
    }
  },
  devServer: {
    proxy: 'http://localhost:3000',
    disableHostCheck: true
  }
};