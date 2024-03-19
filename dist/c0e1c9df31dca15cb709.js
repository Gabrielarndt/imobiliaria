// Aguarda até que o DOM esteja completamente carregado
document.addEventListener("DOMContentLoaded", function () {
  // Seleciona os elementos do formulário
  const selectCidade = document.querySelector("#cidade");
  const selectbairro = document.querySelector("#bairro");

  // Função para carregar os bairros de acordo com a cidade selecionada
  function loadbairros() {
    // Verifica se uma cidade foi selecionada
    if (selectCidade.value) {
      // Simula uma chamada assíncrona para obter os bairros da cidade selecionada
      // Neste exemplo, usamos um array fixo, mas na prática, você buscaria os bairros no servidor
      const bairros = getbairrosByCidade(selectCidade.value);

      // Limpa as opções atuais
      selectbairro.innerHTML = "";

      // Adiciona as novas opções de bairro ao elemento select
      bairros.forEach(bairro => {
        const option = document.createElement("option");
        option.value = bairro;
        option.textContent = bairro;
        selectbairro.appendChild(option);
      });
    }
  }

  // Adiciona um ouvinte de evento ao formulário para lidar com a mudança na seleção da cidade
  selectCidade.addEventListener("change", loadbairros);

  // Função simulada para obter os bairros da cidade selecionada
  function getbairrosByCidade(cidade) {
    // Simula uma busca no servidor para obter os bairros da cidade selecionada
    // Aqui, retornamos um array fixo, mas na prática, você buscaria os bairros no banco de dados
    if (cidade === "itajai") {
      return ["Bairro", "Bairro Fazenda", "Centro", "Praia Brava", "Vila Operária", "São João", "Cabeçudas", "Cordeiros"];
    } else if (cidade === "balneario-camboriu") {
      return ["Bairro", "Centro", "Ariribá", "Barra", "Pioneiros", "Praia dos Amores", "Santa Regina"];
    } else if (cidade === "itapema") {
      return ["Bairro", "Meia Praia", "Morretes"];
    } else {
      return ["Bairro"]; // Retornar um array vazio se nenhuma cidade corresponder
    }
  }
});