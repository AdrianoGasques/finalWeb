const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const FichaAnimal = sequelize.define('fichaAnimal', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  raca: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

FichaAnimal.belongsTo(User, {
  constraint: true,
  foreignKey: 'id_user'
});

User.hasMany(FichaAnimal, {
  foreignKey: 'id_user'
});

module.exports = FichaAnimal;