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
  return db.sequelize.sync()
    .then(() => {
      console.log("Synced db.");
    })
    .catch((err) => {
      console.error("Failed to sync db: " + err.message);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
