async function fetchAndDisplayImoveis() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const tipo = urlParams.get('tipo');
        const cidade = urlParams.get('cidade');
        const precoMinimo = urlParams.get('precoMinimo');
        const precoMaximo = urlParams.get('precoMaximo');
        const quartos = urlParams.get('quartos');
        const suites = urlParams.get('suites');
        const garagens = urlParams.get('garagens');
        const tipoImovel = urlParams.get('tipoImovel');

        // Construir a URL da rota de busca de imóveis com os parâmetros de busca
        const url = `/api/imoveis/buscar?tipo=${tipo}&cidade=${cidade}&precoMinimo=${precoMinimo}&precoMaximo=${precoMaximo}&quartos=${quartos}&suites=${suites}&garagens=${garagens}&tipoImovel=${tipoImovel}`;

        // Realizar uma solicitação GET para a rota de busca de imóveis
        const response = await fetch(url);
        const imoveis = await response.json();

        // Exibir os imóveis na página
        displayImoveis(imoveis);
    } catch (error) {
        console.error('Erro ao buscar imóveis:', error);
    }
}

// Função para exibir os imóveis na página
function displayImoveis(imoveis) {
    const searchResultsList = document.getElementById('search-results-list');

    // Limpa a lista de resultados
    searchResultsList.innerHTML = '';

    // Loop pelos imóveis e cria os elementos HTML correspondentes
    imoveis.forEach(imovel => {
        const imovelCard = document.createElement('div');
        imovelCard.classList.add('col-md-4');
        imovelCard.innerHTML = `
            <div class="card mb-4">
                <div class="card-body">
                    ${imovel.fotos.map(foto => `<img src="/api/imoveis/imagens/${foto}" alt="Imagem do imóvel" class="img-fluid">`).join('')}
                    <h5 class="card-title">${imovel.tipo}</h5>
                    <p class="card-text">Preço: R$ ${imovel.preco}</p>
                    <p class="card-text">Cidade: ${imovel.cidade}</p>
                    <p class="card-text">Quartos: ${imovel.quartos}</p>
                    <p class="card-text">Suítes: ${imovel.suites}</p>
                    <p class="card-text">Vagas de Garagem: ${imovel.garagens}</p>
                    <p class="card-text">Tipo Imovel: ${imovel.tipoImovel}</p>
                </div>
            </div>
        `;
        searchResultsList.appendChild(imovelCard);
    });
}
// Chama a função para buscar e exibir os imóveis quando a página é carregada
fetchAndDisplayImoveis();
