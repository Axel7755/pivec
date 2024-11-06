const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { idgrupos, g_idmaterias } = req.params;
    const uploadDir = `uploads/tareasF/${g_idmaterias}/${idgrupos}`;
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Crear la carpeta si no existe
    }
    cb(null, uploadDir); // Carpeta de almacenamiento
  },
  filename: function (req, file, cb) {
    const { idgrupos, g_idmaterias } = req.params;
    const baseName = file.originalname.split('.')[0];
    const extension = path.extname(file.originalname);
    let newFileName = `${baseName}${extension}`;
    let filePath = path.join(`uploads/tareasF/${g_idmaterias}/${idgrupos}`, newFileName);
    let version = 1;

    while (fs.existsSync(filePath)) {
      version++;
      newFileName = `${baseName}-v${version}${extension}`;
      filePath = path.join(`uploads/tareasF/${g_idmaterias}/${idgrupos}`, newFileName);
    }
    cb(null, newFileName);
  }
});

const uploadT = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|docx|xlsx|doc|xls|ppt|pptx|odt|ods|odp|rar|zip/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Tipo de archivo no permitido'));
  }
});

const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se ha subido ningún archivo' });
  }
  res.json({ message: 'Archivo subido exitosamente', file: {
    originalName: req.file.originalname, // Nombre original del archivo
    finalName: nombreFinal,              // Nombre con el que se guardó
    path: rutaCompleta                   // Ruta completa del archivo guardado
  } });
};

module.exports = {
  uploadT,
  uploadFile
};
