"use client"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function Hero() {
    const [category, setCategory] = useState(null)

    useEffect(() => {
        getCategories();
    }, [])

    async function getCategories() {
        try {

            const { data } = await axios.get("http://localhost:5000/api/categories")
            setCategory(data[1])

        } catch (error) {
            console.log(error)

        }
    }

    if (!category) {
        return (
            <>
                <div className="h-175 flex items-center justify-center"> Loading....</div>
            </>
        )
    }
    return (
        <>
            <section className="relative h-150">
                <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-[#FFF3E3] max-w-xl p-12 rounded-md">
                    <p className="tracking -[3px] uppercase text-sm font-semibold">New Arrival</p>
                    <h1 className="text-6xl font-bold text-[#B88E2F] leading-tight mt-3">Discover Our
                        <br />
                        New Collection
                    </h1>

                    <p className="mt-6 text-gray-600"> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                    <Link href="/shop" className="inline-block mt-8 bg-[#B88E2F] text-white px-10 py-4 font-semibold">
                        BUY NOW
                    </Link>
                </div>



            </section>


        </>
    )



}