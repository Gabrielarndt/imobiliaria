const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware para processar corpos de requisição JSON
app.use(bodyParser.json());

// Rotas
app.use('/api/imoveis', require('./routes/imoveis'));

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;