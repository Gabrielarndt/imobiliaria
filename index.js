const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const authRouter = require('./Back-End/back/routes/authRoutes'); // Importe as suas rotas de autenticação
const imoveisRouter = require('./Back-End/back/routes/imoveis');
const bodyParser = require('body-parser');
const authController = require('./Back-End/back/controllers/authController'); // Importe o controlador de autenticação

const app = express();
const PORT = process.env.PORT || 3000; // Define a porta do servidor

app.use(cors());
app.use(express.static(path.join(__dirname, 'src')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para verificar autenticação
function verificaAutenticacao(req, res, next) {
  // Extrai o token do cabeçalho Authorization
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido' });
  }

  try {
    // Verifica se o token é válido
    const decoded = jwt.verify(token, 'seu_segredo');
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token de autenticação inválido' });
  }
}

// Rotas de autenticação
app.use('/api/imoveis', imoveisRouter);
app.use('/api/auth', authRouter); // Use o authRouter para lidar com rotas de autenticação
app.post('/api/auth/login', authController.loginUser); // Rota para login de usuários
app.post('/api/auth/register', authController.registerUser); // Rota para registro de usuários
app.post('/api/auth/logout', authController.logoutUser); // Rota para logout de usuários

// Rotas para servir páginas HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages', 'index.html'));
});

app.get('/imoveis', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages', 'lista.html'));
});

app.get('/cadastroImovel', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages', 'cadastro.html'));
});

app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages', 'cadastroCliente.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages', 'login.html'));
});

// Rota protegida que requer autenticação
app.get('/usuario', verificarToken, async (req, res) => {
  try {
    // Se o token for válido, retorne os detalhes do usuário
    const usuario = await obterDetalhesUsuario(req.userId); // Supondo que você tenha uma função para obter os detalhes do usuário
    res.json(usuario);
  } catch (error) {
    console.error('Erro ao obter detalhes do usuário:', error);
    res.status(500).json({ message: 'Erro ao obter detalhes do usuário' });
  }
});

const User = require('./models/User');

async function obterDetalhesUsuario(userId) {
  try {
    // Consulta o banco de dados para obter o usuário com o ID fornecido
    const usuario = await User.findById(userId);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }
    // Retorna os detalhes do usuário
    return usuario;
  } catch (error) {
    console.error('Erro ao obter detalhes do usuário:', error);
    throw error;
  }
}

function verificarToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido' });
  }
  try {
    // Supondo que você tenha uma chave secreta para verificar o token
    const chaveSecreta = 'seu_segredo';
    const decodedToken = jwt.verify(token, chaveSecreta);
    // Se o token for válido, defina req.userId com o ID do usuário extraído do token
    req.userId = decodedToken.userId;
    // Chame next() para passar para o próximo middleware ou rota
    next();
  } catch (error) {
    // Se ocorrer um erro ao verificar o token, retorne uma resposta de erro 401
    return res.status(401).json({ message: 'Token de autenticação inválido' });
  }
}



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

module.exports = { app, server };
