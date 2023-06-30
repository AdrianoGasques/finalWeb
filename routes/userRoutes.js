const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAdmin = require('../middlewares/adminMiddleware')
const authenticate = require('../middlewares/authMiddleware')
const authorizeUser = require('../middlewares/authUserMiddleware')
const { getUserById } = require('../middlewares/userMiddleware');




// Rota pública para criação de usuário
router.post('/create', userController.create);

//rota para usuarios somente os mesmos
router.get('/:id', authenticate, authorizeUser, getUserById, userController.getById);
router.put('/:id', authenticate, authorizeUser, getUserById, userController.update);



// Rota para criar um administrador
router.post('/admin', isAdmin, userController.createAdmin);

// Rotas que exigem autenticação de administrador

router.get('/admin/', isAdmin,userController.getAll);
router.get('/admin/:id', isAdmin, getUserById, userController.getById);
router.delete('/admin/:id', isAdmin, userController.delete);
router.get('/admin/nome/:nome', isAdmin, userController.getByNome);
router.get('/admin/telefone/:telefone', isAdmin, userController.getByTelefone);
router.put('/admin/:id',isAdmin, getUserById, userController.update);

module.exports = router;
