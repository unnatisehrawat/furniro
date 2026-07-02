"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package, Grid2X2, User, Mail, LayoutDashboard } from "lucide-react"
import { TEXT } from "@/constants/text"



export default function Sidebar() {
    const pathname = usePathname()

    const menuItems = [
        {
            name: TEXT.ADMIN_SIDEBAR.LINKS.DASHBOARD,
            href: "/admin/dashboard",
            icon: <LayoutDashboard size={18} />
        },
        {
            name: TEXT.ADMIN_SIDEBAR.LINKS.CATEGORIES,
            href: "/admin/categories",
            icon: <Grid2X2 size={18} />
        },
        {

            name: TEXT.ADMIN_SIDEBAR.LINKS.PRODUCTS,
            href: "/admin/products",
            icon: <Package size={18} />

        },
        {
            name: TEXT.ADMIN_SIDEBAR.LINKS.LEADS,
            href: "/admin/leads",
            icon: <Mail size={18} />
        }
    ];

    return (
        <>
            <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col justify-between sticky top-0">
                <div>
                    <div className="px-8 py-6">
                        <h1 className="text-3xl font-bold tracking-wide text-admin-brand "> {TEXT.ADMIN_SIDEBAR.LOGO}</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {TEXT.ADMIN_SIDEBAR.SUBTITLE}
                        </p>
                    </div>
                    <nav className="px-4 flex flex-col space-y-2">
                        {menuItems.map((items) => {
                            const active = pathname === items.href;
                            return (
                                <Link
                                    key={items.name}
                                    href={items.href}
                                    className={` flex items-center gap-3 px-4 py-3 rounded-lg transition
                                ${active ? "bg-admin-brand text-white" :
                                            "text-gray-600 hover:bg-gray-200"
                                        }
                                `}
                                >
                                    {items.icon}
                                    <span className="font-medium">{items.name}</span>
                                </Link>
                            )
                        })}
                    </nav>
                </div>
                <div className="text-gray-600 font-semibold flex items-center  gap-6 border-t border-gray-200 p-6">
                    <div className=" w-10 h-10 flex items-center justify-center rounded-full bg-admin-brand text-white">
                        <User size={18} />
                    </div>

                    <h3> {TEXT.ADMIN_SIDEBAR.USER}</h3>
                </div>



            </aside>


        </>
    )
}