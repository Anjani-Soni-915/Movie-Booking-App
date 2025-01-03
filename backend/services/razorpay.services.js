const Razorpay = require("razorpay");
const { RAZORPAY_KEY_ID, RAZORPAY_SECRET_KEY } = require("../config/razorpay");

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_SECRET_KEY,
});

const createOrder = async (amount) => {
  try {
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      payment_capture: "1",
    });
    return order;
  } catch (error) {
    throw new Error("Failed to create Razorpay order");
  }
};

module.exports = {
  createOrder,
};
