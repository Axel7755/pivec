const express = require("express");
const router = express.Router();
const grupos = require("../controllers/grupos.controller.js");

// Crear un nuevo grupo
router.post("/", grupos.create);

// Obtener todos los grupos
router.get("/", grupos.findAll);

// Obtener un grupo por id
router.get("/:g_idmaterias/:idgrupos", grupos.findOne);

// Actualizar un grupo por id
router.put("/:g_idmaterias/:idgrupos", grupos.update);

// Eliminar un grupo por id
router.delete("/:g_idmaterias/:idgrupos", grupos.delete);

module.exports = router;
