const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check } = require("express-validator");
const signInController = require("../controllers/SignInController");

// @route           GET api/signin
// @description     user sign in
// @access          Private
router.get("/", auth, signInController.signInUser);

// @route           POST api/signin
// @description     signin user and get token
// @access          Public
router.post(
  "/",
  [
    check("emailAddress", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  signInController.validateUser
);

module.exports = router;
