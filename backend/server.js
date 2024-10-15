const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const db = require("./app/models");

const app = express();

var corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:8081",
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

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
    await db.Grupos.destroy({ where: {}, truncate: true });
    await db.Alumnos.destroy({ where: {}, truncate: true });
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    await sequelize.sync();
})};

//resetDatabase();


connectWithRetry();

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

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
