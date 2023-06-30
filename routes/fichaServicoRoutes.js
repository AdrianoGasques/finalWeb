const express = require('express');
const router = express.Router();
const fichaServicoController = require('../controllers/fichaServicoController');
const isAdmin = require('../middlewares/adminMiddleware')
const authenticate = require('../middlewares/authMiddleware')
const authorizeUser = require('../middlewares/authUserMiddleware')
const { getUserById } = require('../middlewares/userMiddleware');


// Rotas para fichas de serviço

router.post('/:userId/:animalId', authenticate, fichaServicoController.create);

router.get('/:id', authenticate, fichaServicoController.getById);

router.get('admin/:id', isAdmin, fichaServicoController.getById);

router.put('admin/:id',  isAdmin,fichaServicoController.update);

router.delete('admin/:id', isAdmin, fichaServicoController.delete);

router.get('/:fichaId/animal', authenticate, fichaServicoController.getAnimalByFicha);

module.exports = router;
