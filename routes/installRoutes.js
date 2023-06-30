const express = require('express');
const router = express.Router();
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');
const User = require('../models/user');
const FichaAnimal = require('../models/fichaAnimal');
const FichaServico = require('../models/fichaServico');

router.get('/', async (req, res) => {
  // try {
  //   // Dados dos usuários predefinidos
  //   const predefinedUsers = [
  //     {
  //       nome: 'Usuário 1',
  //       email: 'usuariao1@example.com',
  //       senha: '1234',
  //       telefone: '123456789',
  //       admin : true
  //     },
  //     {
  //       nome: 'Usuário 2',
  //       email: 'usuarioa2@example.com',
  //       senha: 'senha2',
  //       telefone: '987654321'
  //     },
  //     // Adicione mais usuários predefinidos conforme necessário
  //   ];

  //   // Criação dos usuários predefinidos
  //   const createdUsers = await Promise.all(predefinedUsers.map(user => User.create(user)));

  //   res.json(createdUsers);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ mensagem: 'Erro ao criar usuários predefinidos' });
  // }

  try {
    // Criação das tabelas
    await sequelize.sync({ force: true });
    console.log('Tabelas criadas com sucesso.');

    const users = [
      { nome: 'adriano', email: 'adriano@example.com', senha: '123456', telefone: '111111111', admin: true },
      { nome: 'lucas', email: 'lucas@example.com', senha: '123456', telefone: '222222222' },
      { nome: 'samara', email: 'samara@example.com', senha: '123456', telefone: '333333333' },
      { nome: 'lara', email: 'lara@example.com', senha: '123456', telefone: '444444444' },
      { nome: 'fulano', email: 'fulano@example.com', senha: '123456', telefone: '555555555' }
    ];
    
    
      const createdUsers = await Promise.all(users.map(user => User.create(user)));
      console.log('Registros de Usuário inseridos com sucesso.');

    // Inserção de registros nos animais
    await FichaAnimal.bulkCreate([
      { nome: 'Animal 1', idade: 2, id_user: 1 },
      { nome: 'Animal 2', idade: 4, id_user: 2 },
      { nome: 'Animal 3', idade: 1, id_user: 3 },
      { nome: 'Animal 4', idade: 3, id_user: 4 },
      { nome: 'Animal 5', idade: 5, id_user: 5 }
    ]);
    console.log('Registros de Animal inseridos com sucesso.');

    // Inserção de registros nas fichas
    await FichaServico.bulkCreate([
      { problema: 'problema do animal 1', animal_id: 1, id_user: 1 },
      { problema: 'problema do animal 1', animal_id: 1, id_user: 2 },
      { problema: 'problema do ficha 3', animal_id: 3, id_user: 3 },
      { problema: 'problema do ficha 4', animal_id: 4, id_user: 4 },
      { problema: 'problema do ficha 5', animal_id: 5, id_user: 5 }
    ]);
    console.log('Registros de Ficha inseridos com sucesso.');

    res.json({ mensagem: 'Instalação do banco de dados concluída' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro na instalação do banco de dados' });
  }
});

module.exports = router;
