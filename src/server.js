const express = require('express');
const bodyParser = require('body-parser');
const imoveisRouter = require('./routes/imoveis');
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware para processar corpos de requisição JSON
app.use(bodyParser.json());

// Rotas
app.use('/api/imoveis', imoveisRouter);

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


module.exports = { app, PORT }; // Exporte app e PORT