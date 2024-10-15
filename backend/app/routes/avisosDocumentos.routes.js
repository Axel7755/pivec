const express = require("express");
const router = express.Router();
const avisosDocumentos = require("../controllers/avisosDocumentos.controller.js");

// Crear un nuevo documento de aviso
router.post("/", avisosDocumentos.create);

// Obtener todos los documentos de avisos
router.get("/", avisosDocumentos.findAll);

// Obtener un documento de aviso por id
router.get("/:idavisosDocumentos/:avD_idAviso/:avD_idmaterias/:avD_idgrupos", avisosDocumentos.findOne);

// Actualizar un documento de aviso por id
router.put("/:idavisosDocumentos/:avD_idAviso/:avD_idmaterias/:avD_idgrupos", avisosDocumentos.update);

// Eliminar un documento de aviso por id
router.delete("/:idavisosDocumentos/:avD_idAviso/:avD_idmaterias/:avD_idgrupos", avisosDocumentos.delete);

module.exports = router;
