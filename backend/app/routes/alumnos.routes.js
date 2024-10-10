const express = require("express");
const router = express.Router();
const alumnos = require("../controllers/alumnos.controller.js");

// Crear un nuevo Alumno
router.post("/", alumnos.create);

// Obtener todos los Alumnos
router.get("/", alumnos.findAll);

// Obtener un Alumno por id
router.get("/:id", alumnos.findOne);

// Actualizar un Alumno por id
router.put("/:id", alumnos.update);

// Eliminar un Alumno por id
router.delete("/:id", alumnos.delete);

module.exports = router;
