module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/dev': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/dev': ''
        }
      },
      '/pro': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/pro': ''
        }
      }
    }
  },
  // outputDir: '../afar-backend/public',
}
