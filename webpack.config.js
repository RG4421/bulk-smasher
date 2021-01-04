const HtmlWebpackPlugin = require('html-webpack-plugin')
 
module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/src',
    filename: 'index.js',
    publicPath: '/'
  },
  devServer: {
      historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}