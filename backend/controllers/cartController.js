import * as cartService from "../services/cartService.js";


export const getCart = async (req, res) => {
  try {


    console.log("423423423423423423423423423423423")
    const cart = await cartService.getCart();

    console.log("cartcartcartcart ::::::::::::: ",cart)
    res.status(200).json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart", error: error.message });
  }
};


export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    const cart = await cartService.addToCart(productId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to add to cart", error: error.message });
  }
};


export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await cartService.removeFromCart(productId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to remove from cart", error: error.message });
  }
};


export const clearCart = async (req, res) => {
  try {
    const cart = await cartService.clearCart();
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to clear cart", error: error.message });
  }
};
