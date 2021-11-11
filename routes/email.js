const express = require("express");
const router = express.Router();
const emailController = require("../controllers/EmailController");
const auth = require("../middleware/auth");

router.post("/", emailController.sendEmail);

module.exports = router;
