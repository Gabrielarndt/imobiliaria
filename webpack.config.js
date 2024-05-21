const path = require('path');

module.exports = {
    entry: './src/index.js', // Arquivo de entrada principal
    output: {
        path: path.resolve(__dirname, 'dist'), // Diretório de saída para os arquivos construídos
        filename: 'bundle.js' // Nome do arquivo de saída
    },
    module: {
        rules: [
            // Adicione regras para carregar diferentes tipos de arquivos, como JavaScript, CSS, etc.
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader' // Carrega arquivos JavaScript usando Babel
                }
            }
        ]
    },
    resolve: {
        fallback: {
          "path": require.resolve("path-browserify")
        }
      },    
    "scripts": {
        "build": "webpack --config webpack.config.js"
    }
};
