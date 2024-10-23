const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");

router.post("/", authController.login);

module.exports = router;
