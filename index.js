//index.js

const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const authRouter = require('./Back-End/back/controllers/authController');

const app = express();
const PORT = process.env.PORT || 3000; // Define a porta do servidor

app.use(cors());
app.use(express.static(path.join(__dirname, 'src')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages', 'login.html'));
});

app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages', 'cadastroCliente.html'));
});

app.get('/cadastroImovel', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages', 'cadastro.html'));
});

app.use('/auth', authRouter); // Use o authRouter para lidar com rotas de autenticação


app.get('/imoveis', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages', 'lista.html'));
});

app.post('/imoveis', async (req, res) => {
  try {
    const imovelData = req.body;

    // Adicione as fotos ao objeto imovelData, se estiverem presentes na requisição
    if (req.files && req.files.length > 0) {
      // Salvar as fotos no diretório de uploads e adicionar os nomes dos arquivos ao objeto imovelData
      const fotosNomes = req.files.map(file => {
        const novoNome = `${Date.now()}_${file.originalname}`;
        file.mv(`uploads/${novoNome}`);
        return novoNome;
      });
      imovelData.fotos = fotosNomes;
    }

    // Crie um novo imóvel com os dados recebidos do formulário
    const novoImovel = await Imovel.create(imovelData);

    res.status(201).json(novoImovel);
  } catch (error) {
    console.error('Erro ao cadastrar imóvel:', error);
    res.status(500).json({ error: 'Erro ao cadastrar imóvel' });
  }
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


const server = app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});

const imoveisRouter = require('./Back-End/back/routes/imoveis');
app.use(express.json());

// Rotas
app.use('/api/imoveis', imoveisRouter);

module.exports = { app, server };
