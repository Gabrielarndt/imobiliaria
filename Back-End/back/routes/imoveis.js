const express = require('express');
const router = express.Router();
const ImovelController = require('../controllers/ImovelController');
const Imovel = require('../models/Imovel');

// Rota para lidar com o envio de dados do formulário e criar um novo imóvel
router.post('/', async (req, res) => {
  try {
    // Criar um novo imóvel com os dados recebidos do formulário
    const imovel = await Imovel.create(req.body);
    res.status(201).json(imovel);
  } catch (error) {
    console.error('Erro ao cadastrar imóvel:', error);
    res.status(500).json({ error: 'Erro ao cadastrar imóvel' });
  }
});

// Rotas adicionais para operações CRUD de imóveis utilizando ImovelController
router.get('/', ImovelController.list); // Listar todos os imóveis
router.get('/:id', ImovelController.getById); // Obter detalhes de um imóvel específico
router.put('/:id', ImovelController.update); // Atualizar um imóvel existente
router.delete('/:id', ImovelController.delete); // Excluir um imóvel existente

module.exports = router;
