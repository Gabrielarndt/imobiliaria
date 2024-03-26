//index.js

const express = require('express');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const authRouter = require('./Back-End/back/routes/authRoutes'); // Importe as suas rotas de autenticação
const imoveisRouter = require('./Back-End/back/routes/imoveis');
const bodyParser = require('body-parser');
const authController = require('./Back-End/back/controllers/authController'); // Importe o controlador de autenticação
const User = require('./Back-End/back/models/User');
const passport = require('./Back-End/back/passport');
const { verificarTokenEObterDetalhesUsuario } = require('./Back-End/back/middleware/authMiddleware')
const cookieParser = require('cookie-parser');
const usuarioRouter = require('./Back-End/back/routes/userRoutes')

const app = express();
const PORT = process.env.PORT || 3000; // Define a porta do servidor

app.use(passport.initialize());
app.use(cookieParser());

app.use(cors());
app.use(express.static(path.join(__dirname, 'src')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'pages'));

// Rotas de autenticação
app.use('/api', usuarioRouter);
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

app.get('/logout', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages', 'logout.html'));
});

// Rota protegida que requer autenticação
app.get('/usuario', verificarTokenEObterDetalhesUsuario, (req, res) => {
  res.render('usuario');
});

app.get('/api/usuario/:userId', async (req, res) => {
  try {
    // Recuperar o ID do usuário a partir dos parâmetros da URL
    const userId = req.params.userId;

    // Buscar as informações do usuário com base no ID
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Retornar as informações do usuário como JSON
    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar informações do usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.get('/editaUser', (req, res) => {
  res.render('editaUser'); // Renderiza a página de edição de informações
});

// Rota para editar informações do usuário
app.post('/api/editarUsuario', async (req, res) => {
  try {
    const userId = req.cookies.userId // Obtém o ID do usuário autenticado
    const { username, phone, password } = req.body; // Obtém os novos dados do usuário a serem atualizados

    // Verifica se o usuário existe no banco de dados
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verifica se a senha fornecida pelo usuário está correta
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Senha incorreta. Não é possível atualizar as informações do usuário.' });
    }

    // Verifica se o novo nome de usuário já está em uso por outro usuário
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername && existingUsername.id !== req.cookies.userId) {
      return res.status(400).json({ message: 'Nome de usuário já em uso. Escolha outro.' });
    }

    // Verifica se o novo número de telefone já está em uso por outro usuário
    const existingPhone = await User.findOne({ where: { phone } });
    if (existingPhone && existingPhone.id !== req.cookies.userId) {
      return res.status(400).json({ message: 'Número de telefone já em uso. Escolha outro.' });
    }

    // Atualiza as informações do usuário no banco de dados
    user.username = username;
    user.phone = phone;
    await user.save();

    // Retorna uma resposta de sucesso
    return res.status(200).json({ message: 'Informações do usuário atualizadas com sucesso!', user });
  } catch (error) {
    console.error('Erro ao atualizar informações do usuário:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.get('/editaSenha', (req, res) => {
  res.render('editaSenha'); // Renderiza a página de edição de senha
});

// Rota para atualizar a senha do usuário
app.post('/api/editarSenha', async (req, res) => {
  try {
      const userId = req.cookies.userId; // Obtém o ID do usuário autenticado
      const { oldPassword, newPassword, confirmPassword } = req.body; // Obtém as senhas fornecidas

      // Verifica se a nova senha e a confirmação são iguais
      if (newPassword !== confirmPassword) {
          return res.status(400).json({ message: 'A nova senha e a confirmação de senha não coincidem.' });
      }

      // Verifica se o usuário existe no banco de dados
      const user = await User.findByPk(userId);
      if (!user) {
          return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Verifica se a senha antiga fornecida pelo usuário está correta
      const passwordMatch = await bcrypt.compare(oldPassword, user.password);
      if (!passwordMatch) {
          return res.status(401).json({ message: 'Senha antiga incorreta. Não é possível atualizar a senha.' });
      }

      // Criptografa a nova senha
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Atualiza a senha do usuário no banco de dados
      user.password = hashedPassword;
      await user.save();

      // Retorna uma resposta de sucesso
      return res.status(200).json({ message: 'Senha atualizada com sucesso!' });
  } catch (error) {
      console.error('Erro ao atualizar a senha:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
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

module.exports = { app, server };