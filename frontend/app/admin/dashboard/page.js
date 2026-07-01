"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard"

export default function AdminPage() {
    const [counts, setCounts] = useState({
        categories: 0,
        products: 0,
        leads: 0
    });

    useEffect(() => {
        async function fetchStats() {
            try {
                const [categoriesRes, productsRes, leadsRes] = await Promise.all([
                    axios.get("http://localhost:5000/api/categories"),
                    axios.get("http://localhost:5000/api/products"),
                    axios.get("http://localhost:5000/api/leads")
                ]);

                setCounts({
                    categories: categoriesRes.data.length || 0,
                    products: productsRes.data.length || 0,
                    leads: leadsRes.data.length || 0
                });
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            }
        }
        fetchStats();
    }, []);

    return (
        <>
            <div className="p-4">
                <p className="text-2xl font-semibold">Overview</p>
                <p className="text-3xl mt-10 font-semibold">Store Analytics</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                <StatsCard
                    title="Total Categories"
                    value={counts.categories}
                    link="/admin/categories"
                />

                <StatsCard
                    title="Total Products"
                    value={counts.products}
                    link="/admin/products"
                />
                
                <StatsCard
                    title="Total Leads"
                    value={counts.leads}
                    link="/admin/leads"
                />
            </div>
        </>
    )
}
