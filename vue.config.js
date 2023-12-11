const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  publicPath: './',
  outputDir: process.env.outputDir,
  assetsDir: 'static',
  productionSourceMap: false,
  parallel: require('os').cpus().length > 1,
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '中电兴发科技有限公司'
      return args
    })

    config.resolve.alias
      .set('@', resolve('src'))
      .set('@c', resolve('src/components'))
      .set('@v', resolve('src/views'))
  },
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 8005,
    https: false,
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      '/': {
        target: 'http://192.168.10.57:9880/', // 开发环境 同步修改base地址  否则视频无法正常上传与播放
        // target: 'http://192.168.5.90:9880/', // 本地
        // target: 'http://www.ichinae.com:9080/', // 正式环境
        ws: true,
        changeOrigin: true // 设置同源
      }
    }
  }
}
