//app.js

const {
  getImoveis
} = require('./services/utilitarios/api');

// Suponha que você tenha uma função para fazer login e obter o token
async function loginUser(email, password) {
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Erro ao fazer login');
    }
    return data.token;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
}

// Suponha que você tenha uma função para obter os detalhes do usuário após o login
async function getUserDetails(token) {
  try {
    const response = await fetch('http://localhost:3000/api/user/details', {
      method: 'GET',
      headers: {
        'Authorization': "Bearer ".concat(token)
      }
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Erro ao obter detalhes do usuário');
    }
    return data;
  } catch (error) {
    console.error('Erro ao obter detalhes do usuário:', error);
    throw error;
  }
}
function displayImoveis(imoveis) {
  // Suponha que você tenha um elemento HTML onde os imóveis serão exibidos
  const imoveisContainer = document.getElementById('imoveis-container');

  // Limpa o conteúdo atual antes de exibir os novos imóveis
  imoveisContainer.innerHTML = '';

  // Itera sobre os imóveis e cria elementos HTML para cada um
  imoveis.forEach(imovel => {
    const imovelElement = document.createElement('div');
    imovelElement.classList.add('imovel');

    // Suponha que o objeto de imóvel tenha propriedades como título, descrição, preço, etc.
    // Você pode acessar essas propriedades e exibi-las conforme necessário
    const tituloElement = document.createElement('h2');
    tituloElement.textContent = imovel.titulo;
    const descricaoElement = document.createElement('p');
    descricaoElement.textContent = imovel.descricao;
    const precoElement = document.createElement('p');
    precoElement.textContent = "Pre\xE7o: ".concat(imovel.preco);

    // Adicione os elementos criados ao contêiner de imóveis
    imovelElement.appendChild(tituloElement);
    imovelElement.appendChild(descricaoElement);
    imovelElement.appendChild(precoElement);
    imoveisContainer.appendChild(imovelElement);
  });
}

// Função para lidar com erros
function handleError(error) {
  // Suponha que você tenha um elemento HTML para exibir mensagens de erro
  const errorContainer = document.getElementById('error-container');
  errorContainer.textContent = "Erro: ".concat(error.message);
}

// Suponha que você tenha uma função para lidar com o sucesso do login
async function handleLoginSuccess() {
  // Suponha que você tenha campos de email e senha no seu formulário com os IDs 'email' e 'password'
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    const token = await loginUser(email, password);
    const imoveis = await getImoveis(token);
    displayImoveis(imoveis);
  } catch (error) {
    alert('Erro ao fazer login. Verifique seu e-mail e senha.');
    handleError(error);
  }
}

// Adicione um event listener para o formulário de login
document.getElementById('loginForm').addEventListener('submit', async event => {
  event.preventDefault(); // Impede o comportamento padrão de envio do formulário
  handleLoginSuccess();
});