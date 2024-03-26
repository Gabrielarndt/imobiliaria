// listagemImoveis.js

document.addEventListener('DOMContentLoaded', async () => {
    const userId = getUserId(); // Obtenha o userId antes de usar na função toggleFavorite
    const response = await fetch('http://localhost:3000/api/imoveis');
    const data = await response.json();
    const imoveisLista = document.getElementById('imoveis-lista');
    
    console.log('UserId:', userId); // Verifica se userId está sendo obtido corretamente
  
    data.forEach(imovel => {
      const card = document.createElement('div');
      card.classList.add('col-md-4', 'mb-3');
  
      card.innerHTML = `
        <div class="card">
          <img src="http://localhost:3000/api/imoveis/imagens/${imovel.id}" alt="Imagem do Imóvel" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${imovel.titulo}</h5>
            <p class="card-text">${imovel.descricao}</p>
            <p class="card-text">${imovel.tipo}</p>
            <p class="card-text">${imovel.preco}</p>
            <a href="detalhes.html?id=${imovel.id}" class="btn btn-primary">Detalhes</a>
            <i class="fas fa-heart" onclick="toggleFavorite(${userId}, ${imovel.id})"></i>
          </div>
        </div>
      `;
  
      imoveisLista.appendChild(card);
    });
  });
  
  function getUserId() {
    return localStorage.getItem('userId');
  }
  