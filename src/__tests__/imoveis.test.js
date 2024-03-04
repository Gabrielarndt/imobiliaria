const request = require('supertest');
const app = require('../server');

describe('Testes de Imóveis', () => {
  let imovelId;

  test('Deve listar todos os imóveis', async () => {
    const response = await request(app).get('/api/imoveis');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('Deve criar um novo imóvel', async () => {
    const novoImovel = {
      titulo: 'Imóvel Teste',
      descricao: 'Descrição do imóvel de teste',
      tipo: 'aluguel',
      preco: 1000.00,
    };
    const response = await request(app).post('/api/imoveis').send(novoImovel);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    imovelId = response.body.id;
  });

  test('Deve obter detalhes de um imóvel específico', async () => {
    const response = await request(app).get(`/api/imoveis/${imovelId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', imovelId);
  });

  test('Deve atualizar um imóvel existente', async () => {
    const dadosAtualizados = {
      titulo: 'Imóvel Teste Atualizado',
      descricao: 'Nova descrição do imóvel de teste',
      tipo: 'venda',
      preco: 1500.00,
    };
    const response = await request(app).put(`/api/imoveis/${imovelId}`).send(dadosAtualizados);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('titulo', dadosAtualizados.titulo);
    expect(response.body).toHaveProperty('descricao', dadosAtualizados.descricao);
    expect(response.body).toHaveProperty('tipo', dadosAtualizados.tipo);
    expect(response.body).toHaveProperty('preco', dadosAtualizados.preco);
  });

  test('Deve excluir um imóvel existente', async () => {
    const response = await request(app).delete(`/api/imoveis/${imovelId}`);
    expect(response.status).toBe(204);
  });
});
