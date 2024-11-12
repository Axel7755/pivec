const path = require('path');
const fs = require('fs');
const multer = require('multer');
const mime = require('mime-types');

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { idgrupos, g_idmaterias, idtarea } = req.params;
    const uploadDir = `uploads/tareasF/${g_idmaterias}/${idgrupos}/${idtarea}`;

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Crear la carpeta si no existe
    }
    cb(null, uploadDir); // Carpeta de almacenamiento
  },
  filename: function (req, file, cb) {
    const { idgrupos, g_idmaterias, idtarea } = req.params;
    const baseName = file.originalname.split('.')[0];
    const extension = path.extname(file.originalname);
    let newFileName = `${baseName}${extension}`;
    let filePath = path.join(`uploads/tareasF/${g_idmaterias}/${idgrupos}/${idtarea}`, newFileName);
    let version = 1;

    while (fs.existsSync(filePath)) {
      version++;
      newFileName = `${baseName}-v${version}${extension}`;
      filePath = path.join(`uploads/tareasF/${g_idmaterias}/${idgrupos}/${idtarea}`, newFileName);
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
  res.json({
    message: 'Archivo subido exitosamente', file: {
      originalName: req.file.originalname, // Nombre original del archivo
      finalName: req.file.filename,        // Nombre con el que se guardó
      path: req.file.path                  // Ruta completa del archivo guardado
    }
  });
};

// Controlador para obtener los archivos
const getFiles = (req, res) => {
  const { idgrupos, g_idmaterias, idtarea } = req.params;
  const uploadDir = path.join('uploads', 'tareasF', g_idmaterias, idgrupos, idtarea);

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error al leer los archivos', error: err });
    }
    const fileInfo = files.map(file => ({
      name: file,
      path: path.join(uploadDir, file),
      type: mime.lookup(file) || 'application/octet-stream' // Asigna un tipo MIME por defecto si no se encuentra
    }));
    res.json({ files: fileInfo });
  });
};

module.exports = {
  uploadT,
  uploadFile,
  getFiles
};
