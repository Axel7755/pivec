const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const http = require('http');

const axios = require('axios');
const socketIO = require('socket.io');
const path = require('path');
const db = require("./app/models");

const { PeerServer } = require('peer');

const app = express();

//key google academico
const apiKey = '47a287ecd296e876b21d93e6a43fc822c22bb48eeffc1228d241f5cbe5408d17'; // Asegúrate de usar una clave válida


const server = http.createServer();

const io = socketIO(server, {
  cors: {
    origin: (callback) => { callback(null, true); }, // Especifica la URL exacta del origen permitido
    methods: ["GET", "POST"],
    credentials: false // Permite el envío de credenciales
  }
});

// Configuración de CORS
const corsOptions = {
  origin: "*", // Especifica la URL exacta del origen permitido
  credentials: false, // Permite el envío de credenciales
  optionsSuccessStatus: 200
};


const peerServer = PeerServer({
  port: 3001,
  path: '/',
});

peerServer.use(cors());

peerServer.on('connection', (client) => {
  console.log(`Cliente conectado: ${client.getId()}`);
});

peerServer.on('disconnect', (client) => {
  console.log(`Cliente desconectado: ${client.getId()}`);
});

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
  const transaction = await db.sequelize.transaction();

  try {
    await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { transaction });

    // Destruir datos en todas las tablas con truncate
    const tables = [
      db.Documentos,
      db.DocumentosTareas,
      db.AvisosDocumentos,
      db.Comentarios,
      db.Entregas,
      db.Tareas,
      db.Avisos,
      db.Horarios,
      db.Grabaciones,
      db.GruposAlumnos,
      db.Videos,
      db.Grupos,
      db.Alumnos,
      db.Materias,
      db.Docentes,
    ];

    for (const table of tables) {
      await table.destroy({ where: {}, truncate: true, cascade: true, transaction });
    }

    await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 1", { transaction });

    // Sincronizar modelos
    await db.sequelize.sync({ transaction });

    await transaction.commit();
    console.log("Base de datos reiniciada con éxito");
  } catch (error) {
    await transaction.rollback();
    console.error("Error al reiniciar la base de datos:", error.message);
    throw error; // Propagar el error para manejarlo a nivel superior si es necesario
  }
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
app.use('/uploads', express.static(path.join(__dirname, 'uploads'),{
  fallthrough: false // Esto evita que pase al siguiente middleware si ocurre un error
}));

app.use('/uploads', (err, req, res, next) => {
  console.error('Error al servir archivo estático:', err);
  res.status(500).json({
    message: 'Error al servir archivo estático',
    error: err.message
  });
});

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


//Google Academico middleware
// Endpoint para manejar solicitudes 
app.get('/search', async (req, res) => {
  const query = req.query.q;

  console.log(`Received search query: ${query}`);

  try {
    const response = await axios.get(`https://serpapi.com/search.json`, {
      params: {
        engine: 'google_scholar',
        q: query,
        api_key: apiKey,
      },
    });

    console.log('Response from SerpApi:', response.data);

    if (response.data.organic_results) {
      // Extrae y formatea los resultados si es necesario
      const formattedResults = response.data.organic_results.map(result => ({
        title: result.title,
        snippet: result.snippet,
        link: result.link,
      }));

      res.json({ results: formattedResults });
    } else {
      console.error('No organic results found in response:', response.data);
      throw new Error('No results found');
    }

  } catch (error) {
    console.error('Error fetching data:', error.response?.data || error.message);
    res.status(500).send(`Se produjo un error al buscar: ${error.message}`);
  }
});


// Iniciar servidor
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
