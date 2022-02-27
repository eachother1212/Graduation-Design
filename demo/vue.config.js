module.exports = {
  productionSourceMap: false,
  // 关闭eslintrc 默认是开的
  lintOnSave: false,
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.98.123.211',
        ws: true,
        changeOrigin: true,
      },
    },
  },
}
