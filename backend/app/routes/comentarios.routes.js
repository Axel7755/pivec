const express = require("express");
const router = express.Router();
const comentarios = require("../controllers/comentarios.controller.js");

// Crear un nuevo comentario
router.post("/", comentarios.create);

// Obtener todos los comentarios
router.get("/", comentarios.findAll);

// Obtener un comentario por id
router.get("/:idComentarios/:c_idtareas/:c_boleta", comentarios.findOne);

// Obtener lista de comentarios por entrega
router.get("/:c_idtareas/:c_boleta", comentarios.findEntrega);

// Actualizar un comentario por id
router.put("/:idComentarios/:c_idtareas/:c_boleta", comentarios.update);

// Eliminar un comentario por id
router.delete("/:idComentarios/:c_idtareas/:c_boleta", comentarios.delete);

module.exports = router;
