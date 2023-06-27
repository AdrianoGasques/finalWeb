const express = require('express');
const router = express.Router();
const fichaServicoController = require('../controllers/fichaServicoController');

// Rotas para CRUD de fichas de serviço
router.post('/', fichaServicoController.create);
router.get('/:id', fichaServicoController.getById);
router.put('/:id', fichaServicoController.update);
router.delete('/:id', fichaServicoController.delete);

module.exports = router;
