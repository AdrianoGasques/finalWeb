const express = require('express');
const router = express.Router();

const fichaAnimalController = require('../controllers/fichaAnimalController');
const isAdmin = require('../middlewares/adminMiddleware')
const authenticate = require('../middlewares/authMiddleware')
const authorizeUser = require('../middlewares/authUserMiddleware')
const { getUserById } = require('../middlewares/userMiddleware');

// Rotas para fichas de animal

router.post('/:userId', authenticate, fichaAnimalController.create);

router.get('/:id/', authenticate, authorizeUser, getUserById ,fichaAnimalController.getAllByUser);

router.get('/', isAdmin,  fichaAnimalController.getAllByUserAdmin);

//router.get('/:id',  authenticate, fichaAnimalController.getById);

router.put('/:id', authenticate, isAdmin,fichaAnimalController.update);

router.delete('/:id',authenticate, isAdmin, fichaAnimalController.delete);

module.exports = router;
