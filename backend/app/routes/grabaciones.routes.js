const express = require("express");
const router = express.Router();
const grabaciones = require("../controllers/grabaciones.controller.js");

// Crear un nuevo video
router.post("/", grabaciones.create);

// Obtener todos los videos
router.get("/", grabaciones.findAll);

// Obtener un video por id
router.get("/:idgrabaciones/:gr_idmaterias/:gr_idgrupos", grabaciones.findOne);

// Actualizar un video por id
router.put("/:idgrabaciones/:gr_idmaterias/:gr_idgrupos", grabaciones.update);

// Eliminar un video por id
router.delete("/:idgrabaciones/:gr_idmaterias/:gr_idgrupos", grabaciones.delete);

module.exports = router;
