// api.js

const API_URL = 'http://localhost:3000/api/imoveis';

async function getImoveis(token) {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao obter os imóveis');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na chamada de API:', error);
    throw error;
  }
}
module.exports = { getImoveis };