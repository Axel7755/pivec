const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');

// Ruta para subir archivos
router.post('/tareas/:g_idmaterias/:idgrupos/:idtarea', uploadController.uploadT.single('file'), uploadController.uploadFile);

// Ruta para obtener archivos
router.get('/tareas/:g_idmaterias/:idgrupos/:idtarea', uploadController.getFiles);

// Ruta para obtener archivos
router.delete('/tareas/:g_idmaterias/:idgrupos/:idtarea/:filename', uploadController.deleteFile);

module.exports = router;
