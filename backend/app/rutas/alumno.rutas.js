// routes/alumno.routes.js
const express = require('express');
const router = express.Router();
const alumnoController = require('../controllers/alumno.controller');

// Crear un nuevo alumno
router.post('/', alumnoController.create);

// Obtener todos los alumnos
router.get('/', alumnoController.findAll);

// Obtener un alumno por ID
router.get('/:id', alumnoController.findOne);

// Actualizar un alumno por ID
router.put('/:id', alumnoController.update);

// Eliminar un alumno por ID
router.delete('/:id', alumnoController.delete);

module.exports = router;
