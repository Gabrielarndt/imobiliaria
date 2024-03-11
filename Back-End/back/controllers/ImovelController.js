const { Imoveis } = require('../models/Imovel');

// Create (Criar um novo imóvel)
// Create (Criar um novo imóvel)
exports.create = async (req, res) => {
  try {
    console.log('Dados recebidos do formulário:', req.body); // Adicione esta linha

    const Imoveis = await Imoveis.create(req.body);
    res.status(201).json(imovel);
  } catch (error) {
    console.error('Erro ao cadastrar imóvel:', error);
    res.status(500).json({ message: 'Erro ao criar o imóvel' });
  }
  console.log("Dados do formulário:", req.body);

  // Tente criar um novo imóvel com os dados recebidos do formulário
  const Imoveis = await Imoveis.create(req.body);

  // Verifique se o imóvel foi criado com sucesso
  console.log("Novo imóvel criado:", Imoveis);
};


// Read (Listar todos os imóveis)
exports.list = async (req, res) => {
  try {
    const Imoveis = await Imovel.findAll();
    res.status(200).json(Imoveis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar os imóveis' });
  }
};

// Read (Obter detalhes de um imóvel específico)
exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const Imoveis = await Imoveis.findByPk(id);
    if (!Imoveis) {
      return res.status(404).json({ message: 'Imóvel não encontrado' });
    }
    res.status(200).json(Imoveis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter detalhes do imóvel' });
  }
};

// Update (Atualizar um imóvel existente)
exports.update = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Imoveis.update(req.body, {
      where: { id }
    });
    if (!updated) {
      return res.status(404).json({ message: 'Imóvel não encontrado' });
    }
    const Imoveis = await Imoveis.findByPk(id);
    res.status(200).json(Imoveis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar o imóvel' });
  }
};

// Delete (Excluir um imóvel existente)
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Imoveis.destroy({
      where: { id }
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Imóvel não encontrado' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir o imóvel' });
  }
};