const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller.js');

// Ruta para manejar la carga de archivos con parámetros de ruta
router.post('/tareas/:g_idmaterias/:idgrupos', uploadController.uploadT.single('file'), uploadController.uploadFile);

module.exports = router;
