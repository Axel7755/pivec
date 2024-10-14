const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors()); // Habilitar CORS

// Configurar almacenamiento para Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
    },

    filename: function (req, file, cb) {
        const uploadDir = 'uploads/';
        const baseName = file.originalname.split('.')[0]; // Nombre base del archivo
        const extension = path.extname(file.originalname); // Extensión del archivo
        let newFileName = `${baseName}${extension}`; // Nombre original del archivo
        let filePath = path.join(uploadDir, newFileName); // Ruta completa del archivo

        let version = 1; // Comenzar con la versión 1

        // Si el archivo original ya existe, comenzar a agregar versiones
        while (fs.existsSync(filePath)) {
            version++;
            newFileName = `${baseName}-v${version}${extension}`;
            filePath = path.join(uploadDir, newFileName);
        }

        // Devolver el nombre final que no esté en uso
        cb(null, newFileName);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|pdf|docx|zip/; // Tipos permitidos
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        }
        cb('Error: El archivo no es un tipo permitido');
    }
});

// Ruta para subir archivos
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo' });
    }
    res.json({ message: 'Archivo subido exitosamente...xd', file: req.file });
});

app.listen(8080, () => {
    console.log('Servidor corriendo en http://localhost:8080');
});
