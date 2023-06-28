const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// const FichaAnimal = require('./fichaAnimal.js');


const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  admin: {
    type: DataTypes.BOOLEAN,
  }
});

module.exports = User;
