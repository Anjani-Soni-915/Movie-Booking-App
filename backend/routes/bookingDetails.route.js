const express = require("express");
const OAuth = require("../config/token");
const BookingDetailsController = require("../controller/bookingDetails.controller");

const router = express.Router();

router.post("/", OAuth, BookingDetailsController.createBookingDetails);

router.get("/", BookingDetailsController.getBookingDetails);

router.get("/me", OAuth, BookingDetailsController.getBookingDetailsForUser);

router.get("/:id", OAuth, BookingDetailsController.getBookingDetailsById);

router.put("/:id", BookingDetailsController.updateBookingDetails);

router.delete("/:id", BookingDetailsController.deleteBookingDetails);

module.exports = router;
