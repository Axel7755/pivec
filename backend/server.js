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
  //db.sequelize.sync({ force: true })
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

const alumnosRouter = require("./app/routes/alumnos.routes.js");
const docentesRouter = require("./app/routes/docentes.routes.js");
const materiasRouter = require("./app/routes/materias.routes.js");
const videosRouter = require("./app/routes/videos.routes.js");
const gruposRouter = require("./app/routes/grupos.routes.js");
const gruposAlumnosRouter = require("./app/routes/grupos_alumnos.routes.js");

app.use("/api/alumnos", alumnosRouter);
app.use("/api/docentes", docentesRouter);
app.use("/api/videos", materiasRouter);
app.use("/api/videos", videosRouter);
app.use("/api/grupos", gruposRouter);
app.use("/api/gruposAlumnos", gruposAlumnosRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
