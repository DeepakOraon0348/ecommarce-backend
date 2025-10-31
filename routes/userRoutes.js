import express from "express";
import { registerUser, getProfile, loginUser } from "../controllers/userController.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser)
router.get("/:id", getProfile);

export default router;
