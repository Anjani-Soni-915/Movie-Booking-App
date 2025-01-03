const paymentService = require('../services/razorpay.services');

const createOrder = async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await paymentService.createOrder(amount);
    res.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
};
