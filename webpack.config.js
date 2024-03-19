const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "fs": false,
      "os": false,
      "crypto": false,
      "url": false,
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
      "timers": require.resolve('timers-browserify'), // Corrigido
    }
  },
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
      }
    ]
  }
};
