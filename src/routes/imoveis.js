// routes/imoveis.js
const express = require('express');
const router = express.Router();
const ImovelController = require('../controllers/imoveisController'); // Importe o controlador de imóveis

// Defina as rotas para os imóveis
router.get('/', ImovelController.getAll);
router.post('/', ImovelController.create);
router.get('/:id', ImovelController.getById);
router.put('/:id', ImovelController.update);
router.delete('/:id', ImovelController.delete);

module.exports = router;
