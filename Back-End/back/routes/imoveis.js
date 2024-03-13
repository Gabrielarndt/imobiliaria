const express = require('express');
const router = express.Router();
const ImovelController = require('../controllers/ImovelController');
const Imovel = require('../models/Imovel');
const path = require('path');

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
                const fotoPath = path.join(__dirname, '../../../uploads', fotoName);
                // Salvar a foto no diretório de uploads
                await foto.mv(fotoPath);
                fotosNames.push(fotoName);
            }
            // Adicione os nomes das fotos ao objeto imovelData
            imovelData.fotos = fotosNames;
        }

        // Crie um novo imóvel com os dados recebidos do formulário
        const novoImovel = await Imovel.create(imovelData);
        res.status(201).json(novoImovel);
    } catch (error) {
        console.error('Erro ao cadastrar imóvel:', error);
        res.status(500).json({ error: 'Erro ao cadastrar imóvel' });
    }
});

// Rota para obter detalhes de um imóvel específico
router.get('/:id', async (req, res) => {
    try {
        const imovel = await Imovel.findByPk(req.params.id);
        if (!imovel) {
            return res.status(404).json({ message: 'Imóvel não encontrado' });
        }

        res.status(200).json(imovel);
    } catch (error) {
        console.error('Erro ao obter detalhes do imóvel:', error);
        res.status(500).json({ error: 'Erro ao obter detalhes do imóvel' });
    }
});

// Rotas adicionais para operações CRUD de imóveis utilizando ImovelController
router.get('/', ImovelController.list); // Listar todos os imóveis
router.put('/:id', ImovelController.update); // Atualizar um imóvel existente
router.delete('/:id', ImovelController.delete); // Excluir um imóvel existente

module.exports = router;
