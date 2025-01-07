const express = require("express");
const router = express.Router();
const docentes = require("../controllers/docentes.controller.js");

// Crear un nuevo Docente
router.post("/", docentes.create);

// Obtener todos los Docentes
router.get("/", docentes.findAll);

// Obtener un Docente por id
router.get("/:id", docentes.findOne);

// Ruta para enviar el enlace de restablecimiento de contraseña 
router.post('/sendResetEmail', docentes.sendResetEmail);

// Ruta para manejar la actualización de la contraseña 
router.post('/resetPassword/:token', docentes.resetPassword);

// Actualizar un Docente por id
router.put("/:id", docentes.update);

// Eliminar un Docente por id
router.delete("/:id", docentes.delete);

module.exports = router;
