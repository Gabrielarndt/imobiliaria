const createServer = require('../config/serverConfig');
const app = createServer();
const express = require('express');
const router = express.Router();
const ImovelController = require('../controllers/ImovelController');

// Rotas para operações CRUD de imóveis
router.post('/', ImovelController.create); // Criar um novo imóvel
router.get('/', ImovelController.list); // Listar todos os imóveis
router.get('/:id', ImovelController.getById); // Obter detalhes de um imóvel específico
router.put('/:id', ImovelController.update); // Atualizar um imóvel existente
router.delete('/:id', ImovelController.delete); // Excluir um imóvel existente

module.exports = router;
