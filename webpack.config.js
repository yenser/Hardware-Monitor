const path = require('path');
const webpack = require('webpack');
const { spawn } = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { merge } = require('webpack-merge');

const developmentModules = {
  rules: [
    {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        "style-loader", // creates style nodes from JS strings
        "css-loader", // translates CSS into CommonJS
        "sass-loader" // compiles Sass to CSS, using Node Sass by default
      ]
    },
    {
      test: /\.(png|jpg|svg|gif|ico)$/,
      use: [
        'file-loader'
      ]
    },
    {
      test: /\.(ttf|eot|woff|woff2)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]",
        },
      },
    },
  ]
};

const productionModule = {
  rules: [
    {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(sa|sc|c)ss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader, // inject CSS to page
      }, {
        loader: 'css-loader', // translates CSS into CommonJS modules
      }, {
        loader: 'postcss-loader', // Run postcss actions
        options: {
          plugins: function () { // postcss plugins, can be exported to postcss.config.js
            return [
              require('autoprefixer')
            ];
          }
        }
      }, {
        loader: 'sass-loader' // compiles Sass to CSS
      }]
    },
    {
      test: /\.(png|jpg|svg|gif|ico)$/,
      use: [
        'file-loader'
      ]
    },
    {
      test: /\.(ttf|eot|woff|woff2)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]",
        },
      },
    },
  ]
};

const productionPlugins = [
  new CopyWebpackPlugin({
    patterns: [
      { from: './src/assets/img/favicon.png' },
      // { from: './public/manifest.json' },
      { from: './public/robots.txt' }
    ]
  }),
  new CompressionPlugin(),
  new WorkboxPlugin.GenerateSW({
    swDest: 'service-worker.js',
    // these options encourage the ServiceWorkers to get in there fast
    // and not allow any straggling "old" SWs to hang around
    clientsClaim: true,
    skipWaiting: true
  }),
  new ManifestPlugin({
    fileName: 'asset-manifest.json', // Not to confuse with manifest.json 
  }),
  new FaviconsWebpackPlugin({
    logo: './src/assets/img/favicon.png',
    favicons: {
      appName: 'Jigs Up',
      appDescription: 'Jigs Up',
      developerName: 'Jens Streck',
      orientation: 'omit',
      developerURL: null, // prevent retrieving from the nearest package.json
      background: '#e4e5e6',
      theme_color: '#e4e5e6',
      display: 'standalone',
      start_url: 'index.html',
      icons: {
        coast: false,
        yandex: false
      }
    }
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // all options are optional
    filename: '[name].css',
    chunkFilename: '[id].css',
    ignoreOrder: false, // Enable to remove warnings about conflicting order
  })
]

const commonConfig = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: '[id].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/public/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.ExternalsPlugin('commonjs', [
      'electron'
    ])
  ]
};

const developmentConfig = {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    port: 3000,
    hot: true,
    before() {
      spawn(
        'electron',
        ['.'],
        { shell: true, env: process.env, stdio: 'inherit' }
      )
        .on('close', code => process.exit(0))
        .on('error', spawnError => console.error(spawnError))
    }
  },
  module: developmentModules,
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

const productionConfig = {
  module: productionModule,
  plugins: [
    ...productionPlugins
  ]
}

module.exports = env => {
  switch (env) {
    case 'production':
      return merge(commonConfig, productionConfig);
    case 'development':
      return merge(commonConfig, developmentConfig);
    default:
      throw new Error('No matching configuration was found!');
  }
}