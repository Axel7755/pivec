const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const { PeerServer } = require('peer');
const db = require("./app/models");

const app = express();

const peerServer = PeerServer({
  port: 9000,    // Cambia el puerto a 9000
  path: '/peer'
});

app.use('/peer', peerServer);

peerServer.use(cors());

peerServer.on('connection', (client) => {
  console.log(`Cliente conectado: ${client.getId()}`);
});

peerServer.on('disconnect', (client) => {
  console.log(`Cliente desconectado: ${client.getId()}`);
});


const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: (origin, callback) => { callback(null, true); }, // Especifica la URL exacta del origen permitido
    methods: ["GET", "POST"],
    credentials: true // Permite el envío de credenciales
  }
});

// Configuración de CORS
const corsOptions = {
  origin: "*", // Especifica la URL exacta del origen permitido
  credentials: true, // Permite el envío de credenciales
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

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

connectWithRetry();

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
const UploadRouter = require("./app/routes/upload.routes.js");

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
app.use("/api/upload", UploadRouter);

// Configurar express para servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ruta base
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

// Configuración de Socket.IO
io.on('connection', (socket) => {
  socket.on('join', (data) => {
    const roomName = data.roomName;
    socket.join(roomName);
    // Emite el evento 'new-user' a todos en la sala excepto el que se une
    socket.to(roomName).emit('new-user', data);

    socket.on("messagesend", (message) => {
      console.log(message);
      io.to(roomName).emit("createMessage", message);
    });

    socket.on("tellName", (myname) => {
      console.log(myname);
      socket.to(roomName).emit("AddName", myname);
    });

    socket.on('disconnect', () => {
      // Emite el evento 'bye-user' a todos en la sala excepto el que se desconecta
      socket.to(roomName).emit('bye-user', data);
    });
  });
});


// Iniciar servidor
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
