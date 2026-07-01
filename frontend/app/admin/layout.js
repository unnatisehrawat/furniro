"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { CartProvider } from "../context/CartContext";


export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const isAuthPage = pathname === "/admin";

    if (isAuthPage) {
        return <>{children}</>;
    }

    return(
        <div className="min-h-screen flex bg-[#F8F5F1]">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    )
}