// Função para obter o token JWT do localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Função para fazer solicitações à rota protegida '/usuario' com o token JWT
const getUserDetails = async () => {
  try {
      const token = getToken();
      if (!token) {
          throw new Error('Token de autenticação não encontrado');
      }

      const response = await fetch('/usuario', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`, // Adicione o token ao cabeçalho Authorization
          },
      });

      if (!response.ok) {
          throw new Error('Erro ao obter detalhes do usuário');
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Erro ao obter detalhes do usuário:', error);
      throw error;
  }
};

// Função para exibir detalhes do usuário na página
const displayUserDetails = async () => {
  try {
      const userDetails = await getUserDetails();
      // Atualiza o DOM com os detalhes do usuário
      document.getElementById('nomeUsuario').textContent = userDetails.username;
      document.getElementById('emailUsuario').textContent = userDetails.email;
  } catch (error) {
      console.error('Erro ao exibir detalhes do usuário:', error);
  }
};

// Adicione um event listener para atualizar os detalhes do usuário quando a página é carregada
window.addEventListener('DOMContentLoaded', () => {
  displayUserDetails();
});

// Event listener para fazer logout
document.getElementById('logoutButton').addEventListener('click', async () => {
  try {
      const token = getToken();
      if (!token) {
          throw new Error('Token de autenticação não encontrado');
      }

      const response = await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`, // Adicione o token ao cabeçalho Authorization
          },
      });

      if (!response.ok) {
          throw new Error('Erro ao fazer logout');
      }

      // Limpe o token do localStorage
      localStorage.removeItem('token');

      // Redirecione para a página de login
      window.location.href = '/login';
  } catch (error) {
      console.error('Erro ao fazer logout:', error);
  }
});
