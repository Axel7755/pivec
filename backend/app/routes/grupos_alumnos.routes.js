const express = require("express");
const router = express.Router();
const grupos_alumnos = require("../controllers/grupos_alumnos.controller.js");

// Crear un nuevo grupo_alumno
router.post("/", grupos_alumnos.create);

// Obtener todos los grupos_alumnos
router.get("/", grupos_alumnos.findAll);

// Obtener un grupo_alumno por id
router.get("/:ga_idmaterias/:ga_idgrupos/:ga_boleta", grupos_alumnos.findOne);

// Actualizar un grupo_alumno por id
router.put("/:ga_idmaterias/:ga_idgrupos/:ga_boleta", grupos_alumnos.update);

// Eliminar un grupo_alumno por id
router.delete("/:ga_idmaterias/:ga_idgrupos/:ga_boleta", grupos_alumnos.delete);

module.exports = router;
