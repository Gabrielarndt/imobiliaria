document.addEventListener('DOMContentLoaded', async () => {
  const userId = getUserId(); // Obtenha o userId antes de usar na função toggleFavorite
  const response = await fetch('http://localhost:3000/api/imoveis');
  const data = await response.json();
  const imoveisLista = document.getElementById('imoveis-lista');
  console.log('UserId:', userId); // Verifica se userId está sendo obtido corretamente

  data.forEach(imovel => {
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-3');
    card.innerHTML = "\n        <div class=\"card\">\n          <img src=\"http://localhost:3000/api/imoveis/imagens/".concat(imovel.id, "\" alt=\"Imagem do Im\xF3vel\" class=\"card-img-top\">\n          <div class=\"card-body\">\n            <h5 class=\"card-title\">").concat(imovel.titulo, "</h5>\n            <p class=\"card-text\">").concat(imovel.descricao, "</p>\n            <p class=\"card-text\">").concat(imovel.tipo, "</p>\n            <p class=\"card-text\">").concat(imovel.preco, "</p>\n            <a href=\"detalhes.html?id=").concat(imovel.id, "\" class=\"btn btn-primary\">Detalhes</a>\n            <i class=\"fas fa-heart\" onclick=\"toggleFavorite(").concat(userId, ", ").concat(imovel.id, ")\"></i>\n          </div>\n        </div>\n      ");
    imoveisLista.appendChild(card);
  });
});
function getUserId() {
  return localStorage.getItem('userId');
}