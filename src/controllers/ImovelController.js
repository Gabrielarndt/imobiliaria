const Imovel = require('../models/Imovel');

const ImovelController = {
  async index(req, res) {
    try {
      const imoveis = await Imovel.findAll();
      return res.json(imoveis);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar os imóveis' });
    }
  },

  async show(req, res) {
    const { id } = req.params;
    try {
      const imovel = await Imovel.findByPk(id);
      if (!imovel) {
        return res.status(404).json({ error: 'Imóvel não encontrado' });
      }
      return res.json(imovel);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar o imóvel' });
    }
  },

  async store(req, res) {
    const { titulo, descricao, tipo, preco } = req.body;
    try {
      const imovel = await Imovel.create({ titulo, descricao, tipo, preco });
      return res.status(201).json(imovel);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar o imóvel' });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { titulo, descricao, tipo, preco } = req.body;
    try {
      const imovel = await Imovel.findByPk(id);
      if (!imovel) {
        return res.status(404).json({ error: 'Imóvel não encontrado' });
      }
      imovel.titulo = titulo;
      imovel.descricao = descricao;
      imovel.tipo = tipo;
      imovel.preco = preco;
      await imovel.save();
      return res.json(imovel);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar o imóvel' });
    }
  },

  async destroy(req, res) {
    const { id } = req.params;
    try {
      const imovel = await Imovel.findByPk(id);
      if (!imovel) {
        return res.status(404).json({ error: 'Imóvel não encontrado' });
      }
      await imovel.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao excluir o imóvel' });
    }
  },
};

module.exports = ImovelController;
