"use client"
import Link from "next/link"
import { User , Search , ShoppingCart } from "lucide-react"
import { usePathname } from "next/navigation"
import { useCart } from "@/app/context/CartContext"
import { TEXT } from "@/constants/text"

export default function NavBar(){
    const { cartCount } = useCart()
    const pathname = usePathname()
    return(
        <>
        <nav className="h-20 px-12 flex items-center justify-between bg-white shadow-sm sticky top-0 z-50">
            <div className="flex-1">
                <h1 className="text-3xl font-bold">{TEXT.NAVBAR.LOGO}</h1>

            </div>
            <div className="flex-1 flex justify-center">
                <ul className="flex items-center gap-12 font-medium">
                    <li><Link href = "/"  className={pathname === "/" ? "underline" : ""} >{TEXT.NAVBAR.LINKS.HOME}</Link> </li>
                    <li><Link href = "/shop"  className={pathname === "/shop" ? "underline" : ""} >{TEXT.NAVBAR.LINKS.SHOP}</Link> </li>
                  <li><Link href = "/contact"   className={pathname === "/contact" ? "underline" : ""} >{TEXT.NAVBAR.LINKS.CONTACT}</Link> </li>
                </ul>

            </div>
            
            
            <div className="flex-1 flex justify-end items-center">
                <div className="relative">
                    <Link href="/cart" className="relative flex items-center">
                        <ShoppingCart size={22} />
                        
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-3 bg-brand text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
        </>
    )
}