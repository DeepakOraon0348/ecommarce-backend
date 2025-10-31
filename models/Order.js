// backend/models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      name: String,
      price: Number,
      qty: Number,
      subtotal: Number
    }
  ],
  total: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  receiptId: { type: String, required: true }
});

export default mongoose.model('Order', orderSchema);
