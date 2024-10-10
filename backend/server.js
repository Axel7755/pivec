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
  db.sequelize.sync({ force: true })
    .then(() => {
      console.log("Database synchronized with force.");
    })
    .catch((err) => {
      console.error("Failed to synchronize database: " + err.message);

      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

const alumnosRouter = require("./app/routes/alumnos.routes.js");
const docentesRouter = require("./app/routes/docentes.routes.js");

app.use("/api/alumnos", alumnosRouter);
app.use("/api/docentes", docentesRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
