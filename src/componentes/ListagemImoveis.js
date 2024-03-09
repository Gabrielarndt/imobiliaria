// ListagemImoveis.js

import React, { useState, useEffect } from 'react';
import { getImoveis } from '../services/utilitarios/api'; // Importe a função getImoveis do arquivo api.js

function ListagemImoveis() {
  const [imoveis, setImoveis] = useState([]);

  useEffect(() => {
    async function fetchImoveis() {
      try {
        const data = await getImoveis();
        setImoveis(data);
      } catch (error) {
        console.error('Erro ao buscar imóveis:', error);
      }
    }

    fetchImoveis();
  }, []);

  return (
    <div>
      <h1>Listagem de Imóveis</h1>
      <ul>
        {imoveis.map(imovel => (
          <li key={imovel.id}>{imovel.titulo}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListagemImoveis;
