// backend/controllers/orderController.js
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart is empty" });

    const items = cart.items.map(i => ({
      name: i.productId.name,
      price: i.productId.price,
      qty: i.qty,
      subtotal: i.qty * i.productId.price
    }));

    const total = items.reduce((sum, i) => sum + i.subtotal, 0);

    const order = await Order.create({
      userId: req.user._id,
      items,
      total,
      receiptId: `RCP-${Date.now()}`
    });

    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user._id });
  res.json(orders);
};
