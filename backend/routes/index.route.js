const express = require("express");
const user = require("./user.route");
const shows = require("./shows.route");
const theatre = require("./theatre.route");
const bookingDetails = require("./bookingDetails.route");
const paymentRoutes = require("./razorpay.route");
const nodemailer = require("./nodemailer.route");

const router = express.Router();
router.use("/api/users", user);
router.use("/api/show", shows);
router.use("/api/theatre", theatre);
router.use("/api/bookingDetails", bookingDetails);
router.use("/api/razorpay", paymentRoutes);
router.use("/api/mail", nodemailer);

module.exports = router;
