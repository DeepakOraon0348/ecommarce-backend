// backend/controllers/cartController.js
import Cart from "../models/Cart.js";
import Product from "../models/Products.js"

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");

    // 🧠 If no cart exists, create an empty one
    if (!cart) {
      cart = await Cart.create({
        userId: req.user._id,
        items: [],
      });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    res.status(500).json({ message: "Server error while fetching cart" });
  }
};

export const addToCart = async (req, res) => {
  const { productId, qty } = req.body;
  let cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    cart = await Cart.create({ userId: req.user._id, items: [{ productId, qty }] });
  } else {
    const item = cart.items.find(i => i.productId.toString() === productId);
    if (item) item.qty += qty;
    else cart.items.push({ productId, qty });
    cart.updatedAt = Date.now();
    await cart.save();
  }
  res.json(cart);
};

// backend/controllers/cartController.js
export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params; // 🔹 here itemId = productId
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // 🔥 Remove by productId
    const initialLength = cart.items.length;
    cart.items = cart.items.filter(
      (i) => i.productId.toString() !== itemId
    );

    if (cart.items.length === initialLength)
      return res.status(404).json({ message: "Product not found in cart" });

    await cart.save();
    res.json({ message: "Product removed successfully", items: cart.items });
  } catch (error) {
    console.error("❌ Error removing from cart:", error.message);
    res.status(500).json({ message: "Error removing from cart" });
  }
};



export const updateCartItem = async (req, res) => {
  try {
    const productId = req.params.productId || req.body.productId;
    const { qty } = req.body;

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(i => i.productId.toString() === productId);
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    item.qty = qty;
    cart.updatedAt = new Date();
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error("Error updating cart:", error.message);
    res.status(500).json({ message: "Error updating cart" });
  }
};
