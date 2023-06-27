const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



// Rota para listagem de usuários com paginação
router.get('/', userController.getAll);

// Rotas para CRUD de usuários
router.post('/', userController.create);
router.get('/:id', userController.getById);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

// Rota para pesquisa de usuários por nome
router.get('/search/nome/:nome', userController.getByNome);

// Rota para pesquisa de usuários por telefone
router.get('/search/telefone/:telefone', userController.getByTelefone);

 
module.exports = router;
