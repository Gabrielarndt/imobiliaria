//favorito.js

// Função para adicionar/remover imóvel dos favoritos
async function toggleFavorite(userId, imovelId) { // Adicione userId como parâmetro
  try {
    const response = await fetch('/api/favorites/add', { // Corrija a URL para '/api/favorites/add'
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ userId: userId, imovelId: imovelId })
    });
    const data = await response.json();
    if (response.ok) {
      // Imóvel adicionado/removido com sucesso
      // Atualizar a aparência do ícone de coração conforme necessário
    } else {
      console.error('Error:', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function listFavorites() {
  try {
    const response = await fetch('/api/favoritos', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.ok) {
      const favoritos = await response.json();
      // Faça algo com a lista de imóveis favoritos, como exibir na interface do usuário
    } else {
      console.error('Erro ao listar favoritos:', response.statusText);
    }
  } catch (error) {
    console.error('Erro ao listar favoritos:', error);
  }
}
