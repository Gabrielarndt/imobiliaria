// webpack.config.js

module.exports = {
    // outras configurações do webpack...
  
    resolve: {
      fallback: {
        "path": require.resolve("path-browserify")
      }
    }
  };
  