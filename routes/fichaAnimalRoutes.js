const express = require('express');
const router = express.Router();
const fichaAnimalController = require('../controllers/fichaAnimalController');

// Rotas para CRUD de fichas de animal
router.post('/', fichaAnimalController.create);
router.get('/:id', fichaAnimalController.getById);
router.put('/:id', fichaAnimalController.update);
router.delete('/:id', fichaAnimalController.delete);

module.exports = router;
