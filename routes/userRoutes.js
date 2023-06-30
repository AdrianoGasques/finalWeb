const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAdmin = require('../middlewares/adminMiddleware')
const authenticate = require('../middlewares/authMiddleware')
const authorizeUser = require('../middlewares/authUserMiddleware')

// Rota para criar um administrador
router.post('/admin', userController.createAdmin);

// Rota pública para criação de usuário
router.post('/create', userController.create);


// Rotas que exigem autenticação de administrador
router.get('/', userController.getAll);
router.get('/:id', userController.getById);

router.put('/:id', userController.update);
router.delete('/:id', isAdmin, userController.delete);
router.get('/search/nome/:nome', isAdmin, userController.getByNome);
router.get('/search/telefone/:telefone', isAdmin, userController.getByTelefone);

module.exports = router;
