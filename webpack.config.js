const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js'],
    alias: {
      'timers': 'timers-promises'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'pages', 'index.html'),
      filename: 'index.html',
      chunks: ['main'], // Nome do chunk gerado pelo webpack
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'pages', 'favoritos.html'),
      filename: 'favoritos.html',
      chunks: ['main'], // Nome do chunk gerado pelo webpack
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'pages', 'cadastro.html'),
      filename: 'cadastro.html',
      chunks: ['main'], // Nome do chunk gerado pelo webpack
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'pages', 'cadastroCliente.html'),
      filename: 'cadastroCliente.html',
      chunks: ['main'], // Nome do chunk gerado pelo webpack
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'pages', 'lista.html'),
      filename: 'lista.html',
      chunks: ['main'], // Nome do chunk gerado pelo webpack
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'pages', 'login.html'),
      filename: 'login.html',
      chunks: ['main'], // Nome do chunk gerado pelo webpack
    }),
  ],
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /Find-VisualStudio\.cs$/,
        use: 'ignore-loader'
      }
    ]
  },
  target: 'web' // Definindo o alvo como ambiente web
};