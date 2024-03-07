const express = require('express');
const app = express();
const imoveisRouter = require('./routes/imoveis');

app.use(express.json());

// Rotas
app.use('/api/imoveis', imoveisRouter);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = { app, server };
