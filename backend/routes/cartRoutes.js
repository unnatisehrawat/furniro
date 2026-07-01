import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
} from "../controllers/cartController.js";

const router = express.Router();


router.get("/", getCart);

router.post("/", addToCart);

router.delete("/clear", clearCart);

router.delete("/:productId", removeFromCart);



export default router;
