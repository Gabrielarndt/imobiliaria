// src/__tests__/imoveis.test.js

const request = require('supertest');
const app = require('../server');
const { Imovel } = require('../models');

beforeEach(async () => {
  // Limpa a tabela de imóveis antes de cada teste
  await Imovel.destroy({ where: {} });
});

describe('Testes de Imóveis', () => {
  test('Deve listar todos os imóveis', async () => {
    // Insere alguns imóveis fictícios no banco de dados para o teste
    await Imovel.bulkCreate([
      { titulo: 'Casa 1', descricao: 'Descrição da Casa 1', preco: 1500.00 },
      { titulo: 'Casa 2', descricao: 'Descrição da Casa 2', preco: 2000.00 }
    ]);

    // Realiza uma solicitação GET para listar todos os imóveis
    const response = await request(app).get('/api/imoveis');

    // Verifica se o código de status da resposta é 200 (OK)
    expect(response.status).toBe(200);
    // Verifica se o corpo da resposta contém uma lista de imóveis
    expect(response.body).toBeInstanceOf(Array);
    // Verifica se a lista contém os imóveis inseridos anteriormente
    expect(response.body).toHaveLength(2);
  });

  test('Deve criar um novo imóvel', async () => {
    const novoImovel = { titulo: 'Casa Nova', descricao: 'Nova descrição da Casa', preco: 1800.00 };

    // Realiza uma solicitação POST para criar um novo imóvel
    const response = await request(app).post('/api/imoveis').send(novoImovel);

    // Verifica se o código de status da resposta é 201 (Created)
    expect(response.status).toBe(201);
    // Verifica se o corpo da resposta contém os dados do imóvel criado
    expect(response.body).toHaveProperty('id');
    expect(response.body.titulo).toBe(novoImovel.titulo);
    expect(response.body.descricao).toBe(novoImovel.descricao);
    expect(response.body.preco).toBe(novoImovel.preco);
  });

  test('Deve obter detalhes de um imóvel específico', async () => {
    // Insere um imóvel fictício no banco de dados para o teste
    const novoImovel = { titulo: 'Casa Nova', descricao: 'Nova descrição da Casa', preco: 1800.00 };
    const createdImovel = await Imovel.create(novoImovel);

    // Realiza uma solicitação GET para obter detalhes do imóvel específico
    const response = await request(app).get(`/api/imoveis/${createdImovel.id}`);

    // Verifica se o código de status da resposta é 200 (OK)
    expect(response.status).toBe(200);
    // Verifica se o corpo da resposta contém os detalhes do imóvel criado
    expect(response.body).toHaveProperty('id', createdImovel.id);
    expect(response.body.titulo).toBe(novoImovel.titulo);
    expect(response.body.descricao).toBe(novoImovel.descricao);
    expect(response.body.preco).toBe(novoImovel.preco);
  });

  test('Deve atualizar um imóvel existente', async () => {
    // Insere um imóvel fictício no banco de dados para o teste
    const novoImovel = { titulo: 'Casa Nova', descricao: 'Nova descrição da Casa', preco: 1800.00 };
    const createdImovel = await Imovel.create(novoImovel);

    const dadosAtualizados = { titulo: 'Casa Atualizada', descricao: 'Descrição atualizada', preco: 2000.00 };

    // Realiza uma solicitação PUT para atualizar o imóvel existente
    const response = await request(app).put(`/api/imoveis/${createdImovel.id}`).send(dadosAtualizados);

    // Verifica se o código de status da resposta é 200 (OK)
    expect(response.status).toBe(200);
    // Verifica se o corpo da resposta contém os dados do imóvel atualizado
    expect(response.body).toHaveProperty('id', createdImovel.id);
    expect(response.body.titulo).toBe(dadosAtualizados.titulo);
    expect(response.body.descricao).toBe(dadosAtualizados.descricao);
    expect(response.body.preco).toBe(dadosAtualizados.preco);
  });

  test('Deve excluir um imóvel existente', async () => {
    // Insere um imóvel fictício no banco de dados para o teste
    const novoImovel = { titulo: 'Casa Nova', descricao: 'Nova descrição da Casa', preco: 1800.00 };
    const createdImovel = await Imovel.create(novoImovel);

    // Realiza uma solicitação DELETE para excluir o imóvel existente
    const response = await request(app).delete(`/api/imoveis/${createdImovel.id}`);

    // Verifica se o código de status da resposta é 204 (No Content)
    expect(response.status).toBe(204);
  });
});
