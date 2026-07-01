"use client"
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartCount, setCartCount] = useState(0);

    async function refreshCartCount() {
        try {
            const { data } = await axios.get("http://localhost:5000/api/cart");
            const totalItems = data.items.length;
            setCartCount(totalItems);

            setCartCount(totalItems);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        refreshCartCount();
    }, []);

    return (
        <CartContext.Provider value={{ cartCount, refreshCartCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}