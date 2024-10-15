const express = require("express");
const router = express.Router();
const documentosTareas = require("../controllers/documentosTareas.controller.js");

// Crear un nuevo documento de tarea
router.post("/", documentosTareas.create);

// Obtener todos los documentos de tareas
router.get("/", documentosTareas.findAll);

// Obtener un documento de tarea por id
router.get("/:iddocumentosTareas/:dt_idtareas", documentosTareas.findOne);

// Actualizar un documento de aviso por id
router.put("/:iddocumentosTareas/:dt_idtareas", documentosTareas.update);

// Eliminar un documento de aviso por id
router.delete("/:iddocumentosTareas/:dt_idtareas", documentosTareas.delete);

module.exports = router;