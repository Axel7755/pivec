const express = require("express");
const router = express.Router();
const docentes = require("../controllers/docentes.controller.js");

// Crear un nuevo Docente
router.post("/", docentes.create);

// Obtener todos los Docentes
router.get("/", docentes.findAll);

// Obtener un Docente por id
router.get("/:id", docentes.findOne);

// Actualizar un Docente por id
router.put("/:id", docentes.update);

// Eliminar un Docente por id
router.delete("/:id", docentes.delete);

module.exports = router;
