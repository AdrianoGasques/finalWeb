const User = require('../models/user');
const { Op } = require('sequelize');
const { getUserById, getUsersByNome, getUsersByTelefone } = require('../middlewares/userMiddleware');

// Listagem de usuários com paginação
exports.getAll = async (req, res) => {
  try {
    const { limit_: limit_ = 10, offset_: offset_ = 1 } = req.query;
    const offset = (offset_ - 1) * limit_;
    const users = await User.findAll({
      limit: +limit_,
      offset,
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar usuários' });
  }
};

// Criação de um novo usuário
exports.create = async (req, res) => {
  try {
    const { nome, email, senha, telefone } = req.body;

    const newUser = await User.create({
      nome,
      email,
      senha,
      telefone,
      admin: false // Definir o campo admin como false por padrão
    });

    res.status(201).json({ mensagem: 'Usuário criado com sucesso', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao criar usuário' });
  }
};

// Criação de um novo administrador
exports.createAdmin = async (req, res) => {
  try {
    const { nome, email, senha, telefone } = req.body;

    // Verificar se o usuário que está fazendo a solicitação é um administrador
    const currentUser = await User.findByPk(req.userId);
    if (!currentUser || !currentUser.admin) {
      return res.status(403).json({ mensagem: 'Acesso não autorizado' });
    }

    const newAdmin = await User.create({
      nome,
      email,
      senha,
      telefone,
      admin: true // Definir o campo admin como true para criar um administrador
    });

    res.status(201).json({ mensagem: 'Administrador criado com sucesso', admin: newAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao criar administrador' });
  }
};

// Busca de um usuário pelo ID
exports.getById = async (req, res) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar usuário' });
  }
};

// Busca de usuários por nome
exports.getByNome = async (req, res) => {
  try {
    const users = req.users;
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar usuários' });
  }
};

// Busca de usuários por telefone
exports.getByTelefone = async (req, res) => {
  try {
    const users = req.users;
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar usuários' });
  }
};

// Atualização de um usuário
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha, telefone } = req.body;

    const user = req.user;
    
    // Verificar se o usuário que está fazendo a solicitação é um administrador
    const currentUser = await User.findByPk(req.userId);
    if (!currentUser || !currentUser.admin) {
      return res.status(403).json({ mensagem: 'Acesso não autorizado' });
    }

    user.nome = nome;
    user.email = email;
    user.senha = senha;
    user.telefone = telefone;

    await user.save();

    res.json({ mensagem: 'Usuário atualizado com sucesso', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao atualizar usuário' });
  }
};

// Exclusão de um usuário
exports.delete = async (req, res) => {
  try {
    const user = req.user;

    // Verificar se o usuário que está fazendo a solicitação é um administrador
    const currentUser = await User.findByPk(req.userId);
    if (!currentUser || !currentUser.admin) {
      return res.status(403).json({ mensagem: 'Acesso não autorizado' });
    }

    await user.destroy();

    res.json({ mensagem: 'Usuário excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao excluir usuário' });
  }
};
