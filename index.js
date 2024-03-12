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

const uploads = multer({ dest: 'uploads/' }); // Diretório onde as fotos serão salvas temporariamente
app.post('/api/imoveis/fotos', uploads.array('fotos'), (req, res) => {
  // req.files contém a lista de arquivos enviados
  // Faça o que for necessário para salvar ou processar as fotos
  console.log(req.files);

  // Envie uma resposta adequada
  res.status(200).send('Fotos recebidas com sucesso.');
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
