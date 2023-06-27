const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FichaAnimal = sequelize.define('FichaAnimal', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  historico: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = FichaAnimal;
