const express = require("express");
const router = express.Router();
const entregas = require("../controllers/entregas.controller.js");

// Crear una nueva entrega
router.post("/", entregas.create);

// Obtener todas las entregas
router.get("/", entregas.findAll);

// Obtener todas las entregas por tarea
router.get("/:e_idtareas", entregas.findAllporTarea);

// Obtener una entrega por id
router.get("/:e_idtareas/:e_boleta", entregas.findOne);

// Actualizar una entrega por id
router.put("/:e_idtareas/:e_boleta", entregas.update);

// Eliminar una entrega por id
router.delete("/:e_idtareas/:e_boleta", entregas.delete);

module.exports = router;
