const express = require("express");
const showController = require("../controller/shows.controller");

const router = express.Router();

router.get("/search", showController.getSearch);

router.post("/", showController.createShow);

router.get("/", showController.getShow);

router.get("/:id", showController.getShowById);

router.get("/mapping/:id", showController.getShowAndTheatreById);

router.put("/:id", showController.updateShow);

module.exports = router;
