const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');

// Definir rutas para la gestión de plantas
router.get('/', appController.listar);
router.get('/:id', appController.buscar);
router.post('/', appController.agregar);
router.delete('/:id', appController.eliminar);
router.put('/:id', appController.editar);

module.exports = router;
