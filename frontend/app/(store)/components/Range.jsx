"use client"

import axios from "axios";
import { useEffect, useState } from "react"
import Image from "next/image";
import Link from "next/link"; 

export default function Range(){
    const [categories , setCategories] = useState([]);

    useEffect(() => {
        getCategories()
    }, [])

    async function getCategories(){
        try {
            const {data } = await axios.get("http://localhost:5000/api/categories")
            setCategories(data)
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <>
        <section className="py-20  mx-auto bg-admin-bg">
            <h2 className="text-4xl font-bold text-center">Browse the Range</h2>
            <p className="text-gray-500 text-center mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14 p-20 ">
                {categories.map((category) =>(
                    
                    <Link href={`/shop?category=${category._id}`} key={category._id}>
                        <div className="flex flex-col items-center cursor-pointer">
                            <div className="relative w-full h-75">
                                <Image 
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover hover:scale-105 transition duration-300 rounded-2xl "
                                />
                            </div>
                            <h3 className="text-2xl font-semibold mt-6">{category.name}</h3>
                        </div>
                    </Link>

                ))}
            </div>
        </section>
        </>
    )
}
