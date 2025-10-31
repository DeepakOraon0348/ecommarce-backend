import express from "express";
import auth from "../auth/authmiddleware.js";
import { getCart, addToCart, updateCartItem, removeFromCart } from "../controllers/cardController.js";

const router = express.Router();

router.get("/:userId", auth, getCart);
router.post("/", auth,addToCart);
router.put("/:itemId",auth, updateCartItem);
router.delete("/:itemId",auth, removeFromCart );

export default router;
