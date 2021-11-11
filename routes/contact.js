const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const contactController = require("../controllers/ContactsController.js");

//get 1 contact by id
router.get("/:id",  contactController.getOneContactById);

//get all contact
router.get("/",auth, contactController.getUserContacts);

//create new contact
router.post("/create", 
    [   auth,
        [check("fullname", "Please enter contact's fullname").not().isEmpty(),
        check("emailAddress", "Please include a valid email address").isEmail(),]
    ],
    contactController.createContact
  );

///////delete contact
router.delete("/:id", auth, contactController.deleteContact);

//////star or unstar contact
router.put("/star/:id", auth, contactController.starContact);

//edit contact
router.put("/:id", auth,
    [
        check("fullname", "contact's fullname cannot change to null").not().isEmpty(),
        check("emailAddress", "Please include a valid email address").isEmail(),
    ],
 contactController.editContact);

module.exports = router;