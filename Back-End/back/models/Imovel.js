// models/Imovel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Imoveis = sequelize.define('Imoveis', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tipo: {
    type: DataTypes.ENUM('aluguel', 'venda'),
    allowNull: true,
  },
  quartos: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  garagens: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  suites: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  preco: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rua: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('disponivel', 'vendido', 'alugado'),
    allowNull: true,
  },
  fotos: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  ordemFotos: {
    type: DataTypes.JSON, // Armazenar a ordem das fotos como um array de IDs
    allowNull: true,
  }
},
  {
    hooks: {
      // Hook para atualizar a ordem das fotos sempre que o imóvel for atualizado
      beforeUpdate: (imovel, options) => {
        if (imovel.changed('fotos')) {
          // Se as fotos foram alteradas, atualize a ordem das fotos
          imovel.ordemFotos = imovel.fotos.map((foto, index) => index);
        }
      }
    }
  });

module.exports = Imoveis;
