document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('http://localhost:3000/api/imoveis');
  const data = await response.json();
  const imoveisLista = document.getElementById('imoveis-lista');

  data.forEach(imovel => {
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-3');

    card.innerHTML = `
          <div class="card">
          <img src="http://localhost:3000/endpoint-de-imagem/${imovel.id}" alt="Imagem do Imóvel" class="card-img-top">
              <div class="card-body">
                  <h5 class="card-title">${imovel.titulo}</h5>
                  <p class="card-text">${imovel.descricao}</p>
                  <p class="card-text">${imovel.tipo}</p>
                  <p class="card-text">${imovel.preco}</p>
                  <a href="detalhes.html?id=${imovel.id}" class="btn btn-primary">Detalhes</a>
              </div>
          </div>
      `;

    imoveisLista.appendChild(card);
  });
});
