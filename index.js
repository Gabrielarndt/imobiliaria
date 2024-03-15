const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const passport = require('./Back-End/back/passport'); // Importe o seu arquivo passport.js
const authRouter = require('./Back-End/back/routes/authRoutes'); // Importe as suas rotas de autenticação
const imoveisRouter = require('./Back-End/back/routes/imoveis');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000; // Define a porta do servidor

app.use(cors());
app.use(express.static(path.join(__dirname, 'src')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

// Defina as rotas
app.use('/api/auth', authRouter); // Use o authRouter para lidar com rotas de autenticação
app.use('/api/imoveis', imoveisRouter);

// Rotas para servir páginas HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages', 'index.html'));
});

app.get('/cadastroImovel', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages', 'cadastro.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages', 'login.html'));
});

app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages', 'cadastroCliente.html'));
});

app.get('/imoveis', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages', 'lista.html'));
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

// Rota para lidar com o upload de imagens de imóveis
app.post('/api/imoveis/fotos', upload.array('fotos'), async (req, res) => {
  try {
    // Verifica se há arquivos enviados na requisição
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Nenhuma imagem foi enviada.' });
    }

    // Extrai os nomes dos arquivos enviados
    const fotosNomes = req.files.map(file => file.filename);

    // Retorna os nomes das imagens para o cliente
    res.status(200).json({ fotos: fotosNomes });
  } catch (error) {
    console.error('Erro ao fazer upload de imagens:', error);
    res.status(500).json({ error: 'Erro ao fazer upload de imagens.' });
  }
});

// Inicie o servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});

module.exports = { app, server };
