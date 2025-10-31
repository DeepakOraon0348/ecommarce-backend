import Checkout from "../models/checkout.js";

export const checkout = async (req, res) => {
  const { userId, cartItems, total } = req.body;

  const newCheckout = new Checkout({
    userId,
    cartItems,
    total,
    timestamp: new Date(),
  });

  await newCheckout.save();

  res.json({
    message: "Checkout successful",
    receipt: {
      total,
      timestamp: newCheckout.timestamp,
    },
  });
};
