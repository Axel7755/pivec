const express = require("express");
const router = express.Router();
const documentos = require("../controllers/documentos.controller.js");

// Crear un nuevo documento
router.post("/", documentos.create);

// Obtener todos los documentos
router.get("/", documentos.findAll);

// Obtener un documento por id
router.get("/:iddocumentos/:d_idtareas/:d_boleta", documentos.findOne);

// Actualizar un documento por id
router.put("/:iddocumentos/:d_idtareas/:d_boleta", documentos.update);

// Eliminar un documento por id
router.delete("/:iddocumentos/:d_idtareas/:d_boleta", documentos.delete);

module.exports = router;
