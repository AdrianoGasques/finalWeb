const User = require('../models/user');
const { Op } = require('sequelize');

// Middleware para buscar um usuário pelo ID
exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar usuário' });
  }
};


