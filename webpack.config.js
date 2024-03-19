const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  resolve: {
    modules: [
      path.resolve(__dirname, '../node_modules'),
      'node_modules'
    ],
    extensions: ['.js'],
    alias: {
      'timers': 'timers-promises'
    },
    fallback: {
      "path": require.resolve("path-browserify"),
      "fs": false,
      "os": false,
      "crypto": false,
      "util": require.resolve("util/"),
      "http": false,
      "buffer": false,
      "child_process": false,
      "dgram": false,
      "https": require.resolve("https-browserify"),
      assert: require.resolve('assert'),
      tls: require.resolve('tls'),
      dns: require.resolve('dns'),
      "stream": require.resolve('stream-browserify'),
      "zlib": require.resolve('browserify-zlib'),
      "querystring": require.resolve('querystring-es3'),
      "constants": require.resolve('constants-browserify'),
      "net": require.resolve('net-browserify'),
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
        loader: 'html-loader', // ou 'ignore-loader' se você deseja ignorar completamente os arquivos HTML
      },
      {
        test: /Find-VisualStudio\.cs$/,
        use: 'ignore-loader'
      }
    ]
  }
};
