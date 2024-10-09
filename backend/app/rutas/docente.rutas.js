// routes/docente.routes.js
const express = require('express');
const router = express.Router();
const docenteController = require('../controllers/docentes.controller');

// Crear un nuevo docente
router.post('/', docenteController.create);

// Obtener todos los docentes
router.get('/', docenteController.findAll);

// Obtener un docente por ID
router.get('/:id', docenteController.findOne);

// Actualizar un docente por ID
router.put('/:id', docenteController.update);

// Eliminar un docente por ID
router.delete('/:id', docenteController.delete);

module.exports = router;
