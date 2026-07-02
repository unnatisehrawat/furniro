"use client"
import axios from "axios"
import { useState } from "react"

export default function AddProductModal({close, refresh, categories}){
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [rating, setRating] = useState("")
    const [sizes, setSizes] = useState([])
    const [categoryId, setCategoryId] = useState("")
    const [image, setImage] = useState(null)

    const availableSizes = ["S", "M", "L"]

    function toggleSize(size){
        setSizes(prev => 
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        )
    }

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("price", price);
            formData.append("description", description);
            formData.append("rating", rating);
            formData.append("categoryId", categoryId);
            formData.append("image", image);
            sizes.forEach(size => formData.append("size", size));  // 👈 append each size separately

            const res = await axios.post("http://localhost:5000/api/products", formData)
            console.log("product added:", res.data)
            close()
            refresh()
            alert("Product Added Successfully")
        } catch (error) {
            console.log(error)
            alert("Failed to add product")
        }
    }

    return(
        <>
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
        <div className="bg-white w-125 rounded-xl p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Add New Product</h2>
                <button onClick={close} className="cursor-pointer">x</button>
            </div>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border w-full p-3 rounded mt-2 mb-5"
                />

                <label>Price</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border w-full p-3 rounded mt-2 mb-5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />

                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border w-full p-3 rounded mt-2 mb-5"
                    rows={3}
                />

                <label>Rating 0-5 </label>
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="border w-full p-3 rounded mt-2 mb-5"
                    min={0} max={5} step="0.1"
                />

                <label>Category</label>
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="border w-full p-3 rounded mt-2 mb-5"
                >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>

                <label>Sizes</label>
                <div className="flex gap-2 mt-2 mb-5">
                    {availableSizes.map(size => (
                        <button
                            type="button"
                            key={size}
                            onClick={() => toggleSize(size)}
                            className={`px-3 py-1 rounded border cursor-pointer ${
                                sizes.includes(size) 
                                ? "bg-admin-brand text-white" 
                                : "bg-white text-black"
                            }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>

                <label>Image</label>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="border w-full p-3 rounded mt-2 mb-6 cursor-pointer"
                />

                {image && (
                    <img
                        src={URL.createObjectURL(image)}
                        className="h-40 object-cover rounded mb-5"
                    />
                )}

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={close}
                        className="border px-5 py-2 rounded cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button className="bg-[#6B4A3A] text-white px-5 py-2 rounded cursor-pointer">
                        Submit Product
                    </button>
                </div>
            </form>
        </div>
        </div>
        </>
    )
}