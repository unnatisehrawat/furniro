"use client"
import axios from "axios"
import { useState } from "react"
export default function AddCategoryModal({close , refresh}){
    const [name , setName] = useState("")
    const[image, setImage] = useState(null);

    async function handleSubmit(e){
        e.preventDefault();
        try {
        const formData = new FormData();  
        formData.append("name", name);
        formData.append("image", image); 

        await axios.post("http://localhost:5000/api/categories", formData)
        
        close()
        refresh()
        } catch (error) {
            console.log(error)
            alert("Failed to add category")
            
        }

    }

    return(
        <>
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
        <div className="bg-white w-125 rounded-xl p-8">
        <div className="flex  justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Add New Category</h2>
            <button onClick={close} className="cursor-pointer"> x </button>
        </div>
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input 
            value={name}
            onChange={(e) =>setName (e.target.value)}
            className="border w-full p-3 rounded mt-2 mb-5"
            />

            <label>Image URL</label>
            <input type="file"
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
                type ="button"
                onClick={close}
                className="border px-5 py-2 rounded cursor-pointer"
                
                >
                  Cancel
                </button>
                <button className=" bg-[#6B4A3A] text-white px-5 py-2 rounded cursor-pointer">
                Submit Category 
                </button>
            </div>

        </form>
        </div>
        </div>
        </>
    )
}