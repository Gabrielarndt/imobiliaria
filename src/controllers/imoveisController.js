// controllers/imoveisController.js
const { Imovel } = require('../models/Imovel'); // Importe o modelo Imovel

const imoveisController = {
  // Função para listar todos os imóveis
  async getAll(req, res) {
    try {
      const imoveis = await Imovel.findAll();
      res.json(imoveis);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Função para criar um novo imóvel
  async create(req, res) {
    try {
      const novoImovel = await Imovel.create(req.body);
      res.status(201).json(novoImovel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Função para obter os detalhes de um imóvel específico
  async getById(req, res) {
    try {
      const imovel = await Imovel.findByPk(req.params.id);
      if (!imovel) {
        return res.status(404).json({ error: 'Imóvel não encontrado' });
      }
      res.json(imovel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Função para atualizar um imóvel existente
  async update(req, res) {
    try {
      const [updatedRows] = await Imovel.update(req.body, {
        where: { id: req.params.id },
      });
      if (updatedRows === 0) {
        return res.status(404).json({ error: 'Imóvel não encontrado' });
      }
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Função para excluir um imóvel existente
  async delete(req, res) {
    try {
      const deletedRows = await Imovel.destroy({
        where: { id: req.params.id },
      });
      if (deletedRows === 0) {
        return res.status(404).json({ error: 'Imóvel não encontrado' });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = imoveisController;
