const express = require('express');
const router = express.Router();
const fichaServicoController = require('../controllers/fichaServicoController');
const isAdmin = require('../middlewares/adminMiddleware')
const authenticate = require('../middlewares/authMiddleware')


// Rotas para CRUD de fichas de serviço
router.post('/', fichaServicoController.create);
router.get('/:id', authenticate, isAdmin, fichaServicoController.getById);
router.put('/:id', authenticate, isAdmin,fichaServicoController.update);
router.delete('/:id',authenticate, isAdmin, fichaServicoController.delete);

module.exports = router;
