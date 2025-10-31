// backend/controllers/productController.js
import Product from "../models/Products.js";

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const addProduct = async (req, res) => {
  try {
    const { name, price, image, description, stock } = req.body;
    const product = await Product.create({ name, price, image, description, stock });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};


export const updatateProduct = async (req, res) => {
    try {
        const { name, price, image, description, stock } = req.body;
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, image, description, stock },
            { new: true }
        )
        if (!product) return res.status(404).json({ message: "Product not found" })
            res.json(product);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" })
            res.json({ message: "Product deleted successfully" });
    } 
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}