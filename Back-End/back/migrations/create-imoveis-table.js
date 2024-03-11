'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Imoveis', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      tipo: {
        type: Sequelize.ENUM('aluguel', 'venda'),
        allowNull: true,
      },
      quartos:{
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      garagens:{
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      suites:{
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      preco: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bairro: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rua: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('disponivel', 'vendido', 'alugado'),
        allowNull: true,
      },
      fotos: {
        type: Sequelize.JSON, 
        allowNull: true,
      },
      ordemFotos: {
        type: DataTypes.JSON, // Armazenar a ordem das fotos como um array de IDs
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Imoveis');
  }
};
