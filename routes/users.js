const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check } = require("express-validator");
const signupController = require("../controllers/SignUpController");
const UserController = require("../controllers/UserController.js");

// @route           POST api/users
// @description     Register a user
// @access          Public
// 1) signup 
router.post(
  "/signup",
  [
    check("username", "Please enter a username").not().isEmpty(),
    check("emailAddress", "Please include a valid email address").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  signupController.signupUser
);

// 2)edit user information
router.put("/", auth, UserController.editUserInfo);
// 3) get user detail
router.get("/:emailAddress", UserController.getUser);
// 4) get user event by user id
router.get("/events/:emailAddress", UserController.getAllEvents);
// 5) get user contact by user email
router.get("/contact/:emailAddress", UserController.getUserContacts);
// 6) delete user's account
router.delete("/", auth, UserController.deleteUser);

module.exports = router;
