const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAdmin = require('../middlewares/adminMiddleware')
const authenticate = require('../middlewares/authMiddleware')
// Rota para criar um administrador
router.post('/admin', userController.createAdmin);

// Rota pública para criação de usuário
router.post('/create', userController.create);


// Rotas que exigem autenticação de administrador
router.get('/', userController.getAll);
router.get('/:id', authenticate, isAdmin, userController.getById);
router.put('/:id', userController.update);
router.delete('/:id', authenticate, isAdmin, userController.delete);
router.get('/search/nome/:nome',authenticate, isAdmin, userController.getByNome);
router.get('/search/telefone/:telefone',authenticate, isAdmin, userController.getByTelefone);

module.exports = router;
