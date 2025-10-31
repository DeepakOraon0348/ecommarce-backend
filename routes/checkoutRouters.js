import express from "express";
import auth from "../auth/authmiddleware.js";
import { checkout } from "../controllers/checkoutController.js";

const router = express.Router();
router.post("/", auth, checkout);

export default router;
