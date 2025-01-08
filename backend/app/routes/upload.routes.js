const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');

// Ruta para subir archivos de tareas
router.post('/tareas/:g_idmaterias/:idgrupos/:idtarea', uploadController.destinoOriginal, uploadController.uploadT.single('file'), uploadController.uploadFile);

// Ruta para subir archivos de entregas
router.post('/entregas/:g_idmaterias/:idgrupos/:idtarea/:boletaAl', uploadController.destinoOriginal,uploadController.uploadT.single('file'), uploadController.uploadFile);

// Ruta para subir archivos de avisos
router.post('/avisos/:g_idmaterias/:idgrupos/:idtarea', uploadController.destinoAvisos,uploadController.uploadT.single('file'), uploadController.uploadFile);

// Ruta para subir archivos de videos
router.post('/videos/:g_idmaterias/', uploadController.destinoVideos,uploadController.uploadT.single('file'), uploadController.uploadFile);

// Ruta para obtener archivos
router.get('/tareas/:g_idmaterias/:idgrupos/:idtarea', uploadController.getFiles);

// Ruta para obtener archivos de entregas
router.get('/entregas/:g_idmaterias/:idgrupos/:idtarea/:boleta', uploadController.getFilesEntregas);

// Ruta para obtener archivos de avisos
router.get('/avisos/:g_idmaterias/:idgrupos/:idtarea', uploadController.getFilesAvisos);

// Ruta para eliminar archivos
router.delete('/tareas/:g_idmaterias/:idgrupos/:idtarea/:filename', uploadController.deleteFile);

// Ruta para eliminar entregas
router.delete('/entregas/:g_idmaterias/:idgrupos/:idtarea/:boletaAl/:filename', uploadController.deleteFileEntrega);

module.exports = router;
