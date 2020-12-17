const HtmlWebpackPlugin = require('html-webpack-plugin')
 
module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  devServer: {
      historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}