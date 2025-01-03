const express = require("express");
const emailController = require("../controller/nodemailer.controller");
const router = express.Router();

router.get("/", emailController.sendEmails);

module.exports = router;
