const express = require("express");
const router = express.Router();
const paymentController = require("../controller/razorpay.controller");

router.post("/", paymentController.createOrder);

module.exports = router;
