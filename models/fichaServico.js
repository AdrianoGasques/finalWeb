const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FichaServico = sequelize.define('FichaServico', {
  nomeAnimal: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dono: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dataEntrada: {
    type: DataTypes.DATE,
    allowNull: false
  },
  problema: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = FichaServico;
