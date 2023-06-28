const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const FichaAnimal = require('./fichaAnimal.js');
const User = require('./user.js');

const FichaServico = sequelize.define('FichaServico', {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement:true,
    allowNull: false,
    primaryKey:true
  },
  problema: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

FichaServico.belongsTo(FichaAnimal, { foreignKey: 'animal_id' });
FichaAnimal.hasMany(FichaServico, { foreignKey: 'animal_id' });

FichaServico.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(FichaServico, { foreignKey: 'user_id' });

module.exports = FichaServico;