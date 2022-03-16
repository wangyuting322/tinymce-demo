/* eslint-disable global-require */
/**
 * [node] - 路径
 * ---
 * @doc http://nodejs.cn/api/path.html
 * ---
 */
const path = require('path')
/**
 * [webpack] - 资源压缩
 * ---
 * @doc https://webpack.js.org/plugins/terser-webpack-plugin/
 * --
 */
// eslint-disable-next-line import/no-extraneous-dependencies
const TerserPlugin = require('terser-webpack-plugin')

/**
 * [webpack] - 资源压缩
 * ---
 * @doc https://www.webpackjs.com/plugins/compression-webpack-plugin/
 * --
 */
// const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  devServer: {
    disableHostCheck: true,
    hot: true,
    // 终端报错也将输出在控制台
    clientLogLevel: 'warning',
    port: 8080,

    host: '0.0.0.0',

    https: false,

    // 自动启动浏览器

    open: false

  },
  /**
   * 默认情况下警告只记录在终端，不导致编译失败
   * ---
   * @doc https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-eslint/README.md#%E9%85%8D%E7%BD%AE
   * ---
   */
  lintOnSave: true,
  /**
   * 部署应用包时的基本 URL
   * ---
   * @doc https://cli.vuejs.org/zh/config/#publicpath
   * ---
   */
  publicPath: process.env.VUE_APP_BASE,
  /**
   * 去除 Source Map, 减小打包体积加速构建。
   * ---
   * @doc https://cli.vuejs.org/zh/config/#productionsourcemap
   * ---
   */
  productionSourceMap: false,
  /**
   * Webpack 配置
   */
  configureWebpack: () => ({
    /**
     * 插件
     */
    plugins: [
      /**
       * 资源压缩
       */
      //   new CompressionWebpackPlugin({
      //     /**
      //      * 处理所有匹配正则的资源
      //      */
      //     test: /\.js$|\.html$|.\css/
      //   })
    ],
    /**
     * 优化
     */
    optimization: {
      /**
       * 压缩策略
       * ---
       * @doc https://webpack.js.org/configuration/optimization/#optimizationminimizer
       * ---
       */
      minimizer: [
        new TerserPlugin({
          /**
           * 压缩方法
           * ---
           * @doc https://webpack.js.org/plugins/terser-webpack-plugin/#minify
           * ---
           */
          minify: (file, sourceMap) => {
            /**
             * 优化配置
             * ---
             * @doc https://github.com/mishoo/UglifyJS2#compress-options
             * ---
             */
            const uglifyJsOptions = {
              compress: {
                /**
                 * 移除 console.*
                 */
                drop_console: true,
                /**
                 * 移除 debugger
                 */
                drop_debugger: true
              }
            }
            if (sourceMap) {
              uglifyJsOptions.sourceMap = {
                content: sourceMap
              }
            }
            // eslint-disable-next-line import/no-extraneous-dependencies
            return require('uglify-js').minify(file, uglifyJsOptions)
          }
        })
      ]
    }
  }),

  css: {
    /**
     * 向预处理器中的 option 属性传递参数
     * ---
     * @doc https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
     * ---
     */
    loaderOptions: {
      sass: {
        /**
         * 全局混入
         * ---
         * @doc https://github.com/webpack-contrib/sass-loader#prependdata
         * ---
         */
        prependData: '@import "@/assets/style/global.scss";'
      }
    }
  }
}
