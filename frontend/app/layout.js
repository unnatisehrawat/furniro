import { CartProvider } from "./context/CartContext";
import "./globals.css";  // 

export const metadata = {
  title: "Furniro",
  description: "Furniro e-commerce store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}