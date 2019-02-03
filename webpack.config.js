const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  entry : {
    "safeguard" : './src/index.js',
    "safeguard.min" : './src/index.js'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js"
  },
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin({
      include: /\.min\.js$/
    })]
  },
  plugins : [
    new CleanWebpackPlugin(path.resolve(__dirname, 'dist'))
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
}