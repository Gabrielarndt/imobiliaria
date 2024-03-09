// api.js

const API_URL = 'http://localhost:3000/api/imoveis'; // Substitua pela URL da sua API

export async function getImoveis() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Erro ao obter os imóveis');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro na chamada de API:', error);
    throw error;
  }
}
