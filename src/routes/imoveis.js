const express = require('express');
const router = express.Router();
const ImovelController = require('../controllers/ImovelController');

// Rota para listar todos os imóveis
router.get('/', ImovelController.index);

// Rota para obter detalhes de um imóvel específico
router.get('/:id', ImovelController.show);

// Rota para criar um novo imóvel
router.post('/', ImovelController.store);

// Rota para atualizar um imóvel existente
router.put('/:id', ImovelController.update);

// Rota para excluir um imóvel
router.delete('/:id', ImovelController.destroy);

module.exports = router;
