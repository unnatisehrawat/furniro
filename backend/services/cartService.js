import Cart from "../models/cart.js";

export const getCart = async () => {
  console.log("222222222222222")
  // return await Cart.findOne().populate("items.productId", "name price image");

    const result =  await Cart.findOne().populate("items.productId");
    console.log("thisis result ========================== ", result)
    return result

};




export const addToCart = async (productId) => {
  let cart = await Cart.findOne();

 
  if (!cart) {
    cart = new Cart({ items: [] });
  }

  // Check if product already exists in the cart
  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    
    cart.items.push({ productId, quantity: 1 });
  }

  return await cart.save();
};


export const removeFromCart = async (productId) => {
  const cart = await Cart.findOne();
  if (!cart) return null;

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  return await cart.save();
};


export const clearCart = async () => {
  const cart = await Cart.findOne();
  if (!cart) return null;

  cart.items = [];
  return await cart.save();
};
