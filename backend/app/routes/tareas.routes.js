const express = require("express");
const router = express.Router();
const tareas = require("../controllers/tareas.controller.js");

// Crear una nueva tarea
router.post("/", tareas.create);

// Obtener todas las tareas
router.get("/", tareas.findAll);

// Obtener una tarea por id
router.get("/:idtareas/:ta_idmaterias/:ta_idgrupos", tareas.findOne);

// Actualizar una tarea por id
router.put("/:idtareas/:ta_idmaterias/:ta_idgrupos", tareas.update);

// Eliminar una tarea por id
router.delete("/:idtareas/:ta_idmaterias/:ta_idgrupos", tareas.delete);

module.exports = router;