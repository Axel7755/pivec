const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require("./app/models");
const app = express();

// Configuración de CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:8081",
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

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

// Ruta para manejar la carga de archivos
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se ha subido ningún archivo' });
  }
  res.json({ message: 'Archivo subido exitosamente', file: req.file });
});

// Función para conectar con la base de datos con reintentos
const connectWithRetry = () => {
  db.sequelize.sync()
    .then(() => {
      console.log("Database synchronized");
    })
    .catch((err) => {
      console.error("Failed to synchronize database: " + err.message);
      setTimeout(connectWithRetry, 5000);
    });
};

// Función para reiniciar la base de datos (si es necesario)
const resetDatabase = async () => {
  db.sequelize.sync({ force: true }).then(async () => {
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await db.Documentos.destroy({ where: {}, truncate: true });
    await db.DocumentosTareas.destroy({ where: {}, truncate: true });
    await db.AvisosDocumentos.destroy({ where: {}, truncate: true });
    await db.Comentarios.destroy({ where: {}, truncate: true });
    await db.Entregas.destroy({ where: {}, truncate: true });
    await db.Tareas.destroy({ where: {}, truncate: true });
    await db.Avisos.destroy({ where: {}, truncate: true });
    await db.Horarios.destroy({ where: {}, truncate: true });
    await db.Grabaciones.destroy({ where: {}, truncate: true });
    await db.GruposAlumnos.destroy({ where: {}, truncate: true });
    await db.Videos.destroy({ where: {}, truncate: true });
    await db.Grupos.destroy({ where: {}, truncate: true });
    await db.Alumnos.destroy({ where: {}, truncate: true });
    await db.Materias.destroy({ where: {}, truncate: true });
    await db.Docentes.destroy({ where: {}, truncate: true });
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    await sequelize.sync();
  })
};

//resetDatabase();
connectWithRetry();

// Importar rutas
const alumnosRouter = require("./app/routes/alumnos.routes.js");
const docentesRouter = require("./app/routes/docentes.routes.js");
const materiasRouter = require("./app/routes/materias.routes.js");
const videosRouter = require("./app/routes/videos.routes.js");
const gruposRouter = require("./app/routes/grupos.routes.js");
const gruposAlumnosRouter = require("./app/routes/grupos_alumnos.routes.js");
const avisosRouter = require("./app/routes/avisos.routes.js");
const grabacionesRouter = require("./app/routes/grabaciones.routes.js");
const horariosRouter = require("./app/routes/horarios.routes.js");
const tareasRouter = require("./app/routes/tareas.routes.js");
const entregasRouter = require("./app/routes/entregas.routes.js");
const documentosRouter = require("./app/routes/documentos.routes.js");
const comentariosRouter = require("./app/routes/comentarios.routes.js");
const documentosTareasRouter = require("./app/routes/documentosTareas.routes.js");
const documentosAvisosRouter = require("./app/routes/avisosDocumentos.routes.js");
const AuthRouter = require("./app/routes/auth.routes.js");

// Usar rutas
app.use("/api/alumnos", alumnosRouter);
app.use("/api/docentes", docentesRouter);
app.use("/api/materias", materiasRouter);
app.use("/api/videos", videosRouter);
app.use("/api/grupos", gruposRouter);
app.use("/api/gruposAlumnos", gruposAlumnosRouter);
app.use("/api/avisos", avisosRouter);
app.use("/api/grabaciones", grabacionesRouter);
app.use("/api/horarios", horariosRouter);
app.use("/api/tareas", tareasRouter);
app.use("/api/entregas", entregasRouter);
app.use("/api/documentos", documentosRouter);
app.use("/api/comentarios", comentariosRouter);
app.use("/api/documentosTareas", documentosTareasRouter);
app.use("/api/documentosAvisos", documentosAvisosRouter);
app.use("/api/auth", AuthRouter);

// Ruta base
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

// Iniciar servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
