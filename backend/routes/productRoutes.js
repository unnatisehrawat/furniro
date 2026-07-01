import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct
} from "../controllers/productController.js";
import { uploadProduct } from "../config/multer.js";

const router = express.Router();

// GET all products
router.get("/", getProducts);

// GET a single product by ID
router.get("/:id", getProductById);

// POST a new product (file upload middleware)
router.post("/", uploadProduct.single("image"), createProduct);

// DELETE a product
router.delete("/:id", deleteProduct);

export default router;
