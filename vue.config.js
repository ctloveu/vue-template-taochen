'use strict'
// 引入依赖包
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 去掉注释
const CompressionWebpackPlugin = require('compression-webpack-plugin'); // 开启压缩
const { HashedModuleIdsPlugin } = require('webpack');

// 引入配置文件
const { login, subproject, devIp, devPort, proxy, title, isProduction } = require('./src/settings.js');

function resolve(dir) {
  return path.join(__dirname, dir);
}

var alias = {};
/*
 * 注入登录页、入口页、和模块的别名
 */
if (login) {
  alias['@' + login.name] = resolve('src/views/' + login.name);
  alias['@' + login.name + 'P'] = resolve('src/views/' + login.name + '/page');
}

for (var i = 0; i < subproject.length; i++) {
  alias['@' + subproject[i].name] = resolve('src/views/' + subproject[i].name);
  alias['@' + subproject[i].name + 'P'] = resolve('src/views/' + subproject[i].name + '/page');
}


//所有配置项说明都可以在https://cli.vuejs.org/config/中找到
module.exports = {
  /* 如果您计划在子路径下部署站点，则需要设置publicPath
   * 详情：https：//cli.vuejs.org/config/#publicpath*/
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: isProduction ? true : false, //配合打包压缩使用
  devServer: {
    host: devIp || '',
    port: devPort,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    // detail: https://cli.vuejs.org/config/#devserver-proxy
    proxy: proxy,
    //  proxyTable: defaultSettings.proxy,
  },

  //'uglifyjs-webpack-plugin'  默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  transpileDependencies: [],

  configureWebpack: config => {
    // provide the app's title in webpack's name field, so that
    // 可以在index.html中访问它以注入正确的标题。
    config.name = title

    // 注入各个大模块的别名
    Object.assign(config.resolve, {
      alias: {
        '@': resolve('src'),
        '@utils': resolve('src/utils'),
        '@views': resolve('src/views'),
        '@globalComponent': resolve('src/globalComponent'),
        '@public': resolve('public'),
        '@pubImg': resolve('public/image'),
        '@pubCommJs': resolve('public/commonJs'),
        ...alias
      }
    })

    var plugins = [];

    // 开启分离js
    config.optimization = {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 1000 * 60,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // 排除node_modules 然后吧 @ 替换为空 ,考虑到服务器的兼容
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              return `npm.${packageName.replace('@', '')}`
            }
          }
        }
      }
    };

    // 只打包改变的文件
    plugins.push(
      new HashedModuleIdsPlugin()
    );

    // 生产环境时
    if (isProduction) {

      plugins.push(

        // 最好使用uglifyjs-webpack-plugin@beta版本解决该插件不支持es6的问题
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              // 根据开发环境设置是否使用hash命名
              // filename: isProduction ? '[name].js' : '[name].[contenthash].js',
              comments: true, // 去掉注释
            },
            warnings: true, //  忽略警告
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console']//移除console  .log
            }
          },
          parallel: true,//使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
        })
      );

      // 服务器也要相应开启gzip,一般不需要开启此项
      // plugins.push(
      //   new CompressionWebpackPlugin({
      //     filename: '[path].gz[query]',
      //     algorithm: 'gzip',
      //     test: /\.(js|css|json|ttf|TTF|html)$/,// 匹配文件名
      //     threshold: 10240, // 对超过10k的数据压缩
      //     deleteOriginalAssets: false, // 被压缩的源文件是否保留，一般可以删除
      //     minRatio: 0.8 // 压缩比
      //   })
      // )

      // 取消webpack警告的性能提示
      config.performance = {
        hints: 'warning',
        // 入口起点的最大体积
        maxEntrypointSize: 1000 * 500,
        // 生成文件的最大体积
        maxAssetSize: 1000 * 1000,
        // 只给出js文件的性能提示
        assetFilter: function (assetFilename) {
          return assetFilename.endsWith('.js');
        }
      };

    } else { }

    return { plugins }

  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    // config.module
    //   .rule('svg')
    //   .exclude.add(resolve('src/components/icons'))
    //   .end()
    // config.module
    //   .rule('icons')
    //   .test(/\.svg$/)
    //   .include.add(resolve('src/components/icons'))
    //   .end()
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'icon-[name]'
    //   })
    //   .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          // 压缩图片
          config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({ bypassOnDebug: true })

          // webpack 会默认给commonChunk打进chunk - vendors，所以需要对webpack的配置进行delete
          config.optimization.delete('splitChunks')

          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()

          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}

// 清除dist文件夹
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// module.exports = {
//  plugins: [
//    new CleanWebpackPlugin()
//  ],
//   module:{
//     rules: [{
//       test: /\.css$/,
//       //对同一个模块使用多个loader，执行加载顺序是从后往前
//       use: ['style-loader', 'css-loader']
//     }]
//   }
// }
