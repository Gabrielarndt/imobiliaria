const express = require('express');
const router = express.Router();
const ImovelController = require('../controllers/ImovelController');
const Imovel = require('../models/Imovel');

// Rota para lidar com o envio de dados do formulário e criar um novo imóvel
router.post('/', async (req, res) => {
  try {
      const imovelData = req.body;

      // Verifique se há fotos enviadas
      const fotos = req.files;
      if (fotos && fotos.length > 0) {
          // Adicione as fotos ao objeto imovelData
          imovelData.fotos = fotos.map(foto => foto.filename);
      }

      // Crie um novo imóvel com os dados recebidos do formulário
      const Imoveis = await Imovel.create(imovelData);
      res.status(201).json(Imoveis);
  } catch (error) {
      console.error('Erro ao cadastrar imóvel:', error);
      res.status(500).json({ error: 'Erro ao cadastrar imóvel' });
  }
});

router.get('/imagens/:id', async (req, res) => {
    try {
        const imovel = await Imovel.findById(req.params.id);
        if (!imovel || !imovel.fotos) {
            return res.status(404).json({ message: 'Imagem não encontrada' });
        }
        // Envie a imagem como resposta
        res.sendFile(imovel.fotos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao recuperar a imagem do imóvel' });
    }
});


// Rotas adicionais para operações CRUD de imóveis utilizando ImovelController
router.get('/', ImovelController.list); // Listar todos os imóveis
router.get('/:id', ImovelController.getById); // Obter detalhes de um imóvel específico
router.put('/:id', ImovelController.update); // Atualizar um imóvel existente
router.delete('/:id', ImovelController.delete); // Excluir um imóvel existente

module.exports = router;
