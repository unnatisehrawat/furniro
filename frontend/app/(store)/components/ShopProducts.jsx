"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCart } from "../../context/CartContext";
import ShareModal from "./ShareModal";


export default function ShopProducts() {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const { refreshCartCount } = useCart();


    const searchParams = useSearchParams();
    const category = searchParams.get("category");

    const productsPerPage = 6;

    useEffect(() => {
        getProducts();
    }, [category]);

    async function getProducts() {
        try {
            const url = category
                ? `http://localhost:5000/api/products?category=${category}`
                : "http://localhost:5000/api/products";

            const { data } = await axios.get(url);
            setProducts(data);


            setPage(1);
        } catch (err) {
            console.log(err);
        }
    }

    async function handleAddToCart(productId) {
        try {
            await axios.post("http://localhost:5000/api/cart", { productId });
            refreshCartCount();
            alert("Added to cart!");
        } catch (error) {
            console.log(error);
            alert("Failed to add to cart");
        }
    }

    const last = page * productsPerPage;
    const first = last - productsPerPage;

    const currentProducts = products.slice(first, last);

    const totalPages = Math.ceil(products.length / productsPerPage);

    return (
        <section className="max-w-7xl mx-auto py-20">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-40">

                {currentProducts.map((product) => (

                    <div
                        key={product._id}
                        className="group bg-[#F4F5F7] overflow-hidden"
                    >

                        <div className="relative h-75 overflow-hidden">

                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition duration-300"
                            />

                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center">
                                <button
                                    onClick={() => handleAddToCart(product._id)}
                                    className="bg-white text-brand font-semibold px-8 py-3 cursor-pointer"
                                >
                                    Add to Cart
                                </button>

                                <div className="mt-6 flex justify-center w-full z-20 relative">
                                    <ShareModal productId={product._id} productName={product.name} />
                                </div>

                            </div>

                        </div>

                        <Link href={`/product/${product._id}`}>
                            <div className="p-5 cursor-pointer hover:bg-gray-50 transition-colors">

                                <h2 className="text-2xl font-semibold">
                                    {product.name}
                                </h2>

                                <p className="text-gray-500 mt-2">
                                    {product.description}
                                </p>

                                <p className="font-bold text-xl mt-3">
                                    ₹{product.price}
                                </p>

                            </div>
                        </Link>

                    </div>

                ))}

            </div>

            <div className="flex justify-center gap-4 mt-16">

                {[...Array(totalPages)].map((_, index) => (

                    <button
                        key={index}
                        onClick={() => setPage(index + 1)}
                        className={`w-12 h-12  cursor-pointer rounded ${page === index + 1
                            ? "bg-brand text-white"
                            : "bg-[#F9F1E7]"
                            }`}
                    >
                        {index + 1}
                    </button>

                ))}

            </div>

        </section>
    );
}
