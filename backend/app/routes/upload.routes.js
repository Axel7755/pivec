const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller.js');

// Ruta para manejar la carga de archivos
router.post('/', uploadController.upload.single('file'), uploadController.uploadFile);

module.exports = router;
