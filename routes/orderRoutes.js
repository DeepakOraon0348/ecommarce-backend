import express from "express";
import auth from "../auth/authmiddleware.js"
import { placeOrder, getOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", auth, placeOrder);
router.get("/:userId", auth, getOrders);

export default router;