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

// Middleware para buscar usuários por nome
exports.getUsersByNome = async (req, res, next) => {
  try {
    const { nome } = req.params;
    const users = await User.findAll({
      where: {
        nome: {
          [Op.like]: `%${nome}%` // Pesquisa por correspondência parcial
        }
      }
    });

    if (users.length === 0) {
      return res.status(404).json({ mensagem: 'Nenhum usuário encontrado' });
    }
    req.users = users;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar usuários' });
  }
};

// Middleware para buscar usuários por telefone
exports.getUsersByTelefone = async (req, res, next) => {
  try {
    const { telefone } = req.params;
    const users = await User.findAll({
      where: {
        telefone: telefone
      }
    });
    if (users.length === 0) {
      return res.status(404).json({ mensagem: 'Nenhum usuário encontrado' });
    }
    req.users = users;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar usuários' });
  }
};
