const express = require("express");
const router = express.Router();
const horarios = require("../controllers/horarios.controller.js");

// Crear un nuevo horario
router.post("/", horarios.create);

// Obtener todos los horarios
router.get("/", horarios.findAll);

// Obtener un horario por id
router.get("/:idHorarios/:ho_idmaterias/:ho_idgrupos", horarios.findOne);

// Obtener un horarios por grupo
router.get("/:ho_idmaterias/:ho_idgrupos", horarios.findAllGrupo);

// Actualizar un horario por id
router.put("/:idHorarios/:ho_idmaterias/:ho_idgrupos", horarios.update);

// Eliminar un horario por id
router.delete("/:idHorarios/:ho_idmaterias/:ho_idgrupos", horarios.delete);

module.exports = router;
