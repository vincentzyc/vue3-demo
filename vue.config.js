// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = {
  publicPath: "./",
  outputDir: "docs",
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugins.delete('prefetch')
    config.module
      .rule("ts")
      .use("ts-loader")
      .tap(options => {
        options = Object.assign(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: "vant",
                libraryDirectory: "es",
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: "es2015"
          }
        });
        return options;
      });
  },
  devServer: {
    port: 8010
  }
}