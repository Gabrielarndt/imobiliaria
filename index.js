const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

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

app.get('/imoveis', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages','lista.html'));
});

// Configuração do multer para lidar com o upload de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Define o diretório onde os arquivos serão salvos
  },
  filename: function (req, file, cb) {
      // Define o nome do arquivo no diretório de destino
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Rota para lidar com o upload de arquivos
app.post('/upload', upload.array('fotos'), (req, res) => {
  console.log('Arquivos recebidos:', req.files); // Exibe os arquivos recebidos no console
  res.send('Arquivos recebidos com sucesso!');
});


const server = app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});

const imoveisRouter = require('./Back-End/back/routes/imoveis');
app.use(express.json());

// Rotas
app.use('/api/imoveis', imoveisRouter);

module.exports = { app, server };
