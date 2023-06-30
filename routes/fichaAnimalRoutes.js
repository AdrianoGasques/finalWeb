const express = require('express');
const router = express.Router();
const fichaAnimalController = require('../controllers/fichaAnimalController');
const isAdmin = require('../middlewares/adminMiddleware')
const authenticate = require('../middlewares/authMiddleware')


// Rotas para CRUD de fichas de animal
router.post('/',authenticate, fichaAnimalController.create);
router.get('/:id', authenticate, isAdmin,fichaAnimalController.getById);
router.put('/:id', authenticate, isAdmin,fichaAnimalController.update);
router.delete('/:id',authenticate, isAdmin, fichaAnimalController.delete);

module.exports = router;
