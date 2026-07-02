"use client"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"
import { TEXT } from "@/constants/text"

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
                <div className="h-175 flex items-center justify-center"> {TEXT.COMMON.LOADING}</div>
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
                    <p className="tracking -[3px] uppercase text-sm font-semibold">{TEXT.HERO.BADGE}</p>
                    <h1 className="text-6xl font-bold text-brand leading-tight mt-3">{TEXT.HERO.TITLE_LINE1}
                        <br />
                        {TEXT.HERO.TITLE_LINE2}
                    </h1>

                    <p className="mt-6 text-gray-600"> {TEXT.HERO.SUBTITLE}</p>

                    <Link href="/shop" className="inline-block mt-8 bg-brand text-white px-10 py-4 font-semibold">
                        {TEXT.HERO.BUTTON}
                    </Link>
                </div>



            </section>


        </>
    )



}