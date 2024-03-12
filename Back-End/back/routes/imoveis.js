const express = require('express');
const router = express.Router();
const ImovelController = require('../controllers/ImovelController');
const Imovel = require('../models/Imovel');
const fs = require('fs');

// Rota para lidar com o envio de dados do formulário e criar um novo imóvel
router.post('/', async (req, res) => {
    try {
      const imovelData = req.body;
  
      // Verifique se há fotos enviadas
      const fotos = req.files;
      if (fotos && fotos.length > 0) {
        const fotosNames = [];
        // Iterar sobre as fotos e salvá-las no diretório de uploads
        for (const foto of fotos) {
          const fotoName = `${Date.now()}_${foto.name}`;
          const fotoPath = path.join(__dirname, '../uploads', fotoName);
          // Salvar a foto no diretório de uploads
          await foto.mv(fotoPath);
          fotosNames.push(fotoName);
        }
        // Adicione os nomes das fotos ao objeto imovelData
        imovelData.fotos = fotosNames;
      }
  
      // Crie um novo imóvel com os dados recebidos do formulário
      const Imoveis = await Imovel.create(imovelData);
      res.status(201).json(Imoveis);
    } catch (error) {
      console.error('Erro ao cadastrar imóvel:', error);
      res.status(500).json({ error: 'Erro ao cadastrar imóvel' });
    }
  });

router.get('/:id', async (req, res) => {
    try {
        const imovel = await Imovel.findByPk(req.params.id);
        if (!imovel) {
            return res.status(404).json({ message: 'Imóvel não encontrado' });
        }

        // Verifica se há fotos associadas ao imóvel
        if (!imovel.fotos || imovel.fotos.length === 0) {
            // Se não houver fotos, ainda retornamos os detalhes do imóvel sem URLs de imagem
            return res.status(200).json(imovel);
        }
        
        // Converter as fotos do formato JSON para URLs de imagens
        const fotosUrls = imovel.fotos.map(foto => {
            // Supondo que você tenha um endpoint para servir as imagens
            const base64Data = Buffer.from(foto.file.data).toString('base64');
            return `data:${foto.type};base64,${base64Data}`;
        });

        // Atualizar o objeto do imóvel com as URLs das imagens
        const imovelComUrls = { ...imovel.toJSON(), fotos: fotosUrls };

        // Enviar os dados atualizados como resposta
        res.status(200).json(imovelComUrls);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter detalhes do imóvel' });
    }
});




// Rotas adicionais para operações CRUD de imóveis utilizando ImovelController
router.get('/', ImovelController.list); // Listar todos os imóveis
router.get('/:id', ImovelController.getById); // Obter detalhes de um imóvel específico
router.put('/:id', ImovelController.update); // Atualizar um imóvel existente
router.delete('/:id', ImovelController.delete); // Excluir um imóvel existente

module.exports = router;
