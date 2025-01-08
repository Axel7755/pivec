const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");

router.post("/", authController.login);

// Ruta para enviar el enlace de restablecimiento de contraseña 
router.post('/sendResetEmail', authController.sendResetEmail);

// Ruta para manejar la actualización de la contraseña 
router.post('/resetPassword/:ident/:token', authController.resetPassword);

module.exports = router;
