const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Imovel = sequelize.define('Imovel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('aluguel', 'venda'),
    allowNull: false,
  },
  quartos:{
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  garagens:{
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  suites:{
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
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
    type: DataTypes.JSON, // Ou DataTypes.ARRAY(DataTypes.STRING) se preferir armazenar as referências como strings
    allowNull: true,
  }
});

module.exports = Imovel;
