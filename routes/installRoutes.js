const express = require('express');
const router = express.Router();
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('../models/user');
const FichaAnimal = require('../models/fichaAnimal');
const FichaServico = require('../models/fichaServico');

router.get('/', async (req, res) => {
  try {
    // Criação das tabelas
    await sequelize.sync({ force: true });
    console.log('Tabelas criadas com sucesso.');

    // Inserção de registros nos usuários
    await User.bulkCreate([
      { nome: 'adriano', email: 'adriano@example.com', senha: '123456', telefone: '111111111' },
      { nome: 'lucas', email: 'lucas@example.com', senha: '123456', telefone: '222222222' },
      { nome: 'samara', email: 'samara@example.com', senha: '123456', telefone: '333333333' },
      { nome: 'lara', email: 'lara@example.com', senha: '123456', telefone: '444444444' },
      { nome: 'fulano', email: 'fulano@example.com', senha: '123456', telefone: '555555555' }
    ]);
    console.log('Registros de Usuário inseridos com sucesso.');

    // Inserção de registros nos animais
    await Animal.bulkCreate([
      { nome: 'Animal 1', idade: 2 },
      { nome: 'Animal 2', idade: 4 },
      { nome: 'Animal 3', idade: 1 },
      { nome: 'Animal 4', idade: 3 },
      { nome: 'Animal 5', idade: 5 }
    ]);
    console.log('Registros de Animal inseridos com sucesso.');

    // Inserção de registros nas fichas
    await Ficha.bulkCreate([
      { nome: 'Ficha 1', historico: 'Histórico da ficha 1', AnimalId: 1 },
      { nome: 'Ficha 2', historico: 'Histórico da ficha 2', AnimalId: 2 },
      { nome: 'Ficha 3', historico: 'Histórico da ficha 3', AnimalId: 3 },
      { nome: 'Ficha 4', historico: 'Histórico da ficha 4', AnimalId: 4 },
      { nome: 'Ficha 5', historico: 'Histórico da ficha 5', AnimalId: 5 }
    ]);
    console.log('Registros de Ficha inseridos com sucesso.');

    res.json({ mensagem: 'Instalação do banco de dados concluída' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro na instalação do banco de dados' });
  }
});

module.exports = router;
