const path = require('path');
const os = require('os');
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
// const PrerenderSPAPlugin = require('prerender-spa-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

const productionGzipExtensions = ['js', 'css', 'html'];

const resolve = dir => path.join(__dirname, dir);

const name = 'vue-template-H5';

const modifyLessUrl = resolve('src/styles/vant-var.less');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: process.env.outputDir,
  assetsDir: '',
  filenameHashing: true,
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,

  devServer: {
    port: 3001,
    open: false,
    https: false,
    // proxy: {
    //   '/': {
    //     target: 'http://localhost:8311/',
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/': '/',
    //     },
    //   },
    // },
  },

  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "${modifyLessUrl}";`,
        },
      },
    },
  },

  parallel: os.cpus().length > 1,

  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      /* 预渲染 */
      // config.plugins.push(new PrerenderSPAPlugin({
      //   staticDir: path.join(__dirname, 'dist'),
      //   routes: [
      //     '/company/index',
      //     '/department',
      //     '/department/detail',
      //     '/team',
      //     '/team/detail',
      //     '/team/call'
      //   ],
      //   renderer: new Renderer({
      //     // inject: {
      //     //   foo: 'bar',
      //     // },
      //     // maxConcurrentRoutes: 2,
      //     // headless: false,
      //     // renderAfterDocumentEvent: 'render-event',
      //     // renderAfterTime: 5000,
      //     // renderAfterElementExists: 'app',
      //     executablePath: 'C:/Users/180496/AppData/Local/Google/Chrome/Application/chrome.exe',
      //   }),
      // }));
      /* Gzip 压缩开启 */
      config.plugins.push(new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`), // 匹配文件名
        threshold: 10240, // 对10K以上的数据进行压缩
        minRatio: 0.8,
        deleteOriginalAssets: false, // 是否删除源文件
      }));
    }
    /* 骨架屏加载 */
    config.plugins.push(new SkeletonWebpackPlugin({
      webpackConfig: {
        entry: {
          app: resolve('src/skeleton-entry.js'), // 骨架屏入口
        },
      },
      insertAfter: '<div id="app">', // 骨架屏渲染DOM后插入的位置
      minimize: true, // spa下压缩注入html和js代码
      quiet: true, // 服务端渲染时需要输出信息到控制台
      router: {
        mode: 'history',
        routes: [
          {
            path: '/company/index',
            skeletonId: 'skeleton-index',
          },
          {
            path: '/department/index/list',
            skeletonId: 'skeleton-index',
          },
          {
            path: '/department/detail',
            skeletonId: 'skeleton-index',
          },
          {
            path: '/team/index/list',
            skeletonId: 'skeleton-index',
          },
          {
            path: '/team/detail',
            skeletonId: 'skeleton-index',
          },
          {
            path: '/team/call',
            skeletonId: 'skeleton-index',
          },
          {
            path: '/team/assign',
            skeletonId: 'skeleton-index',
          },
        ],
      },
    }));
    Object.assign(config, {
      name,
      resolve: {
        alias: {
          '@': resolve('src'),
          Api: resolve('src/api/'),
          Components: resolve('src/components/'),
          Utils: resolve('src/utils/'),
          Views: resolve('src/views/'),
        },
        extensions: ['.vue', '.js', '.less', '.json'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      },
    });
  },

  chainWebpack: (config) => {
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');

    /* 修改默认配置 让url-loader 只处理除 src/icons 文件夹之外的 svg  */
    config.module
      .rule('svg')
      .exclude
      .add(resolve('src/icons'))
      .end();

    /* 让svg-sprite-loader 只处理 src/icons 文件夹下面的 svg 避免冲突 */
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end()
      .use('style-vw-loader')
      .loader('style-vw-loader')
      .options({
        viewportWidth: 375,
        unitPrecision: 5,
        viewportUnit: 'vw',
        fontViewportUnit: 'vw',
        minPixelValue: 1,
      })
      .end();

    config
    // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map'));

    config
      .when(process.env.NODE_ENV !== 'development',
        (config) => {
          if (process.env.npm_config_report) {
            config
              .plugin('webpack-bundle-analyzer')
              .use(BundleAnalyzerPlugin)
              .end();
            config.plugins.delete('prefetch');
          }
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/,
            }])
            .end();

          config
            .optimization.minimizer('terser').tap((args) => {
              args[0].terserOptions.compress.warnings = false;
              args[0].terserOptions.compress.drop_console = true;
              args[0].terserOptions.compress.drop_debugger = true;
              args[0].terserOptions.compress.pure_funcs = ['console.*'];
              return args;
            })
            .end();

          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial',
                },
                vue: {
                  name: 'chunk-vue',
                  priority: 12,
                  test: /[\\/]node_modules[\\/]_?vue(.*)/,
                },
                vant: {
                  name: 'chunk-vant',
                  priority: 20,
                  test: /[\\/]node_modules[\\/]_?vant(.*)/,
                },
                echarts: {
                  name: 'chunk-echarts',
                  priority: 19,
                  test: /[\\/]node_modules[\\/]_?echarts(.*)/,
                },
                zrender: {
                  name: 'chunk-zrender',
                  priority: 18,
                  test: /[\\/]node_modules[\\/]_?zrender(.*)/,
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'),
                  minChunks: 3,
                  priority: 5,
                  reuseExistingChunk: true,
                },
              },
            });
          config.optimization.runtimeChunk('single');
        });
  },
};
