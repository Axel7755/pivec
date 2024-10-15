const express = require("express");
const router = express.Router();
const gruposAlumnos = require("../controllers/grupos_alumnos.controller.js");

// Crear una nueva relación grupo-alumno
router.post("/", gruposAlumnos.create);

// Obtener todas las relaciones grupo-alumno
router.get("/", gruposAlumnos.findAll);

// Obtener una relación grupo-alumno por id
router.get("/:ga_idmaterias/:ga_idgrupos/:ga_boleta", gruposAlumnos.findOne);

// Actualizar una relación grupo-alumno por id
router.put("/:ga_idmaterias/:ga_idgrupos/:ga_boleta", gruposAlumnos.update);

// Eliminar una relación grupo-alumno por id
router.delete("/:ga_idmaterias/:ga_idgrupos/:ga_boleta", gruposAlumnos.delete);

module.exports = router;
