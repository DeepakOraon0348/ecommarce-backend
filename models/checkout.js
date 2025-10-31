import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cartItems: Array,
  total: Number,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Checkout", checkoutSchema);
