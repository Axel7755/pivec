const express = require("express");
const router = express.Router();
const avisos = require("../controllers/avisos.controller.js");

// Crear un nuevo video
router.post("/", avisos.create);

// Obtener todos los videos
router.get("/", avisos.findAll);

// Obtener un video por id
router.get("/:idAviso/:av_idmaterias/:av_idgrupos", avisos.findOne);

// Obtener un video por grupo
router.get("/:av_idmaterias/:av_idgrupos", avisos.findAllAvGrupo);

// Actualizar un video por id
router.put("/:idAviso/:av_idmaterias/:av_idgrupos", avisos.update);

// Eliminar un video por id
router.delete("/:idAviso/:av_idmaterias/:av_idgrupos", avisos.delete);

module.exports = router;
