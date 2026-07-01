import express from "express"
import { uploadCategory } from "../config/multer.js";
import {
  getCategories,
  createCategory,
  deleteCategory,
  getCategoryById
} from "../controllers/categoryController.js";


const router = express.Router();

router.get("/", getCategories)
router.get("/:id", getCategoryById)
router.post("/", uploadCategory.single("image"), createCategory)
router.delete("/:id", deleteCategory)

export default router