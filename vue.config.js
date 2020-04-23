module.exports = {
  publicPath: "./",
  outputDir: "docs",
	productionSourceMap: false,
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  },
	devServer: {
    port: 8010
    // proxy: 'http://test-cms.jetmobo.com'
    // proxy: 'http://cms.jetmobo.com'
    // proxy: 'http://192.168.220.26:2023',
	}
}