import express from "express";
import { 
  getProducts, 
  addProduct, 
  getProductById, 
  updatateProduct, 
  deleteProduct 
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", addProduct);
router.put("/:id", updatateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getProductById);

export default router;
