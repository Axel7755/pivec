const express = require("express");
const router = express.Router();
const grabaciones = require("../controllers/grabaciones.controller.js");

// Crear una nueva grabación
router.post("/", grabaciones.create);

// Obtener todas las grabaciones
router.get("/", grabaciones.findAll);

// Obtener una grabación por id
router.get("/:idgrabaciones/:gr_idmaterias/:gr_idgrupos", grabaciones.findOne);

// Actualizar una grabación por id
router.put("/:idgrabaciones/:gr_idmaterias/:gr_idgrupos", grabaciones.update);

// Eliminar una grabación por id
router.delete("/:idgrabaciones/:gr_idmaterias/:gr_idgrupos", grabaciones.delete);

module.exports = router;
