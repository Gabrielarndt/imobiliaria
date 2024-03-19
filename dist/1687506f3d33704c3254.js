//favorito.js
document.addEventListener('DOMContentLoaded', async () => {
  listFavorites();
});
async function listFavorites() {
  try {
    const response = await fetch('/api/favoritos', {
      headers: {
        Authorization: "Bearer ".concat(localStorage.getItem('token'))
      }
    });
    if (response.ok) {
      const favoritos = await response.json();
      const favoritosLista = document.getElementById('favoritos-lista');
      favoritos.forEach(imovel => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = "\n          <img src=\"http://localhost:3000/api/imoveis/imagens/".concat(imovel.id, "\" alt=\"Imagem do Im\xF3vel\">\n          <div class=\"card-body\">\n            <h5 class=\"card-title\">").concat(imovel.titulo, "</h5>\n            <p class=\"card-text\">").concat(imovel.descricao, "</p>\n            <p class=\"card-text\">").concat(imovel.tipo, "</p>\n            <p class=\"card-text\">").concat(imovel.preco, "</p>\n            <a href=\"detalhes.html?id=").concat(imovel.id, "\" class=\"btn btn-primary\">Detalhes</a>\n          </div>\n        ");
        favoritosLista.appendChild(card);
      });
    } else {
      console.error('Erro ao listar favoritos:', response.statusText);
    }
  } catch (error) {
    console.error('Erro ao listar favoritos:', error);
  }
}

// Função para adicionar/remover imóvel dos favoritos
async function toggleFavorite(userId, imovelId) {
  // Adicione userId como parâmetro
  console.log('ToggleFavorite está sendo chamado');
  try {
    const response = await fetch('/api/favoritos/add', {
      // Corrija a URL para '/api/favorites/add'
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer ".concat(localStorage.getItem('token'))
      },
      body: JSON.stringify({
        userId: userId,
        imovelId: imovelId
      })
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
window.toggleFavorite = async function (userId, imovelId) {
  try {
    const response = await fetch('/api/favoritos/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer ".concat(localStorage.getItem('token'))
      },
      body: JSON.stringify({
        userId: userId,
        imovelId: imovelId
      })
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
};