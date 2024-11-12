const path = require('path');
const fs = require('fs');
const multer = require('multer');
const mime = require('mime-types');

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { idgrupos, g_idmaterias, idtarea } = req.params;
    const uploadDir = `uploads/tareasF/${g_idmaterias}/${idgrupos}/${idtarea}`;

    console.log('Destino de almacenamiento:', uploadDir);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Crear la carpeta si no existe
      console.log('Carpeta creada:', uploadDir);
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

    console.log('Nombre de archivo inicial:', newFileName);

    while (fs.existsSync(filePath)) {
      version++;
      newFileName = `${baseName}-v${version}${extension}`;
      filePath = path.join(`uploads/tareasF/${g_idmaterias}/${idgrupos}/${idtarea}`, newFileName);
    }

    console.log('Nombre de archivo final:', newFileName);
    cb(null, newFileName);
  }
});

const uploadT = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log('Procesando archivo:', file.originalname);
    const allowedTypes = /jpeg|jpg|png|gif|pdf|docx|xlsx|doc|xls|ppt|pptx|odt|ods|odp|rar|zip/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    console.log('Extname válido:', extname);
    console.log('Mimetype válido:', mimetype);

    if (extname && mimetype) {
      console.log('Archivo permitido:', file.originalname);
      return cb(null, true);
    }
    console.error('Tipo de archivo no permitido:', file.originalname);
    cb(new Error('Tipo de archivo no permitido'));
  }
});

const uploadFile = (req, res) => {
  console.log('Iniciando subida de archivo...');
  if (!req.file) {
    console.error('No se ha subido ningún archivo');
    return res.status(400).json({ message: 'No se ha subido ningún archivo' });
  }
  console.log('Archivo subido:', req.file);
  res.json({
    message: 'Archivo subido exitosamente',
    file: {
      lastModified: req.file.lastModified,
      lastModifiedDate: req.file.lastModifiedDate,
      name: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype,
      webkitRelativePath: req.file.webkitRelativePath || '',
      originalName: req.file.originalname,
      finalName: req.file.filename,
      path: req.file.path
    }
  });
};

// Controlador para obtener los archivos
const getFiles = (req, res) => {
  const { idgrupos, g_idmaterias, idtarea } = req.params;
  const uploadDir = path.join('uploads', 'tareasF', g_idmaterias, idgrupos, idtarea);

  console.log('Leyendo archivos del directorio:', uploadDir);

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error('Error al leer los archivos:', err);
      return res.status(500).json({ message: 'Error al leer los archivos', error: err });
    }
    const fileInfo = files.map(file => {
      const stats = fs.statSync(path.join(uploadDir, file));
      return {
        lastModified: stats.mtimeMs,
        lastModifiedDate: stats.mtime,
        name: file,
        size: stats.size,
        type: mime.lookup(file) || 'application/octet-stream',
        webkitRelativePath: '',
        originalName: file,
        path: path.join(uploadDir, file)
      };
    });

    console.log('Archivos encontrados:', fileInfo);
    res.json({ files: fileInfo });
  });
};

// Controlador para eliminar archivos
const deleteFile = (req, res) => {
  const { idgrupos, g_idmaterias, idtarea, filename } = req.params;
  const filePath = path.join('uploads', 'tareasF', g_idmaterias, idgrupos, idtarea, filename);

  console.log('Intentando eliminar archivo:', filePath);

  fs.unlink(filePath, err => {
    if (err) {
      console.error('Error al eliminar archivo:', err);
      return res.status(500).json({ message: 'Error al eliminar archivo', error: err });
    }

    console.log('Archivo eliminado:', filename);
    res.json({ message: 'Archivo eliminado exitosamente' });
  });
};

module.exports = {
  uploadT,
  uploadFile,
  getFiles,
  deleteFile
};
