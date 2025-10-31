// backend/models/Cart.js
import mongoose from "mongoose";
import Product  from "./Products.js";
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  qty: { type: Number, required: true, min: 1 }
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [cartItemSchema],
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Cart', cartSchema)
