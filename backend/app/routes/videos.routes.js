const express = require("express");
const router = express.Router();
const videos = require("../controllers/videos.controller.js");

// Crear un nuevo video
router.post("/", videos.create);

// Obtener todos los videos
router.get("/", videos.findAll);

// Obtener un video por id
router.get("/:v_idmaterias/:v_boleta/:idvideos", videos.findOne);

// Obtener tdos los videos por materia
router.get("/:v_idmaterias", videos.findAllVidMateria);

// Actualizar un video por id
router.put("/:v_idmaterias/:v_boleta/:idvideos", videos.update);

// Eliminar un video por id
router.delete("/:v_idmaterias/:v_boleta/:idvideos", videos.delete);

module.exports = router;
