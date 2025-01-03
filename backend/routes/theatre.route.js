const express = require("express");
const theatreController = require("../controller/theatre.controller");

const router = express.Router();

router.post("/", theatreController.createTheatre);

router.get("/", theatreController.getTheatre);

router.get("/:id", theatreController.getTheatreById);

router.put("/:id", theatreController.updateTheatre);

router.delete("/:id", theatreController.deleteTheatre);

module.exports = router;
