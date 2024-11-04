const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/tareasF';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Crear la carpeta si no existe
    }
    cb(null, uploadDir); // Carpeta de almacenamiento
  },
  filename: function (req, file, cb) {
    const baseName = file.originalname.split('.')[0];
    const extension = path.extname(file.originalname);
    let newFileName = `${baseName}${extension}`;
    let filePath = path.join('uploads/tareasF', newFileName);
    let version = 1;
    while (fs.existsSync(filePath)) {
      version++;
      newFileName = `${baseName}-v${version}${extension}`;
      filePath = path.join('uploads/tareasF', newFileName);
    }
    cb(null, newFileName);
  }
});

const upload = multer({
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

// Controlador para manejar la subida de archivos
exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se ha subido ningún archivo' });
  }
  res.json({ message: 'Archivo subido exitosamente', file: req.file });
};

exports.upload = upload;
