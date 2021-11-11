const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const EventController = require("../controllers/EventController.js");

router.get("/", auth,EventController.GetallEvent);
router.post("/create", auth,EventController.create);
router.put("/update/:id",auth, EventController.updateEvent);
router.delete("/delete/:email/:id", auth,EventController.deleteEvent);
router.get("/:id",auth, EventController.getOneEvent);

router.post('/starevent/:id', EventController.setStar);

module.exports = router;
