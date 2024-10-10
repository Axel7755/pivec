const express = require("express");
const router = express.Router();
const materias = require("../controllers/materias.controller.js");

// Crear una nueva Materia
router.post("/", materias.create);

// Obtener todos los materias
router.get("/", materias.findAll);

// Obtener una Materia por id
router.get("/:id", materias.findOne);

// Actualizar una Materia por id
router.put("/:id", materias.update);

// Eliminar una Materia por id
router.delete("/:id", materias.delete);

module.exports = router;
