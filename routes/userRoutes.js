const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAdmin = require('../middlewares/adminMiddleware')
const authenticate = require('../middlewares/authMiddleware')
const authorizeUser = require('../middlewares/authUserMiddleware')
const { getUserById } = require('../middlewares/userMiddleware');


// Rota para criar um administrador
router.post('/admin', isAdmin, userController.createAdmin);



// Rota pública para criação de usuário
router.post('/create', userController.create);



//rota para usuarios somente os mesmos
router.get('/:id', authenticate, authorizeUser, getUserById, userController.getById);
router.put('/:id', authenticate, authorizeUser, getUserById, userController.update);


// Rotas que exigem autenticação de administrador
router.get('/', isAdmin,userController.getAll);
router.get('/:id', isAdmin, getUserById, userController.getById);
router.delete('/:id', isAdmin, userController.delete);
router.get('/nome/:nome', isAdmin, userController.getByNome);
router.get('/telefone/:telefone', isAdmin, userController.getByTelefone);


module.exports = router;
