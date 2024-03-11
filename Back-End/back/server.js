const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; // Define a porta do servidor

app.use(cors());
// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'src')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages', 'index.html'));
});

app.get('/cadastroImovel', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages','cadastro.html'));
});

const server = app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});

const imoveisRouter = require('./Back-End/back/routes/imoveis');
app.use(express.json());

// Rotas
app.use('/api/imoveis', imoveisRouter);

module.exports = { app, server };
