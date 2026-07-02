import axios from "axios"
import Image from "next/image"

export default function CategoryTable({categories , refresh}){

    async function deleteCategory(id){
        try {
         await axios.delete(`http://localhost:5000/api/categories/${id}`)
         console.log("Category Deleted Successfully")
         refresh()

        } catch (error) {
           console.log(error)
           alert("Failed to delete category")
            
        }
    }
    return(
        <>
        <div className="p-6">
            <table className="w-full border border-gray-300">
                <thead className=" text-white bg-admin-brand">
                    <tr>
                        <th className="p-4 border border-gray-300">S.No</th>
                        <th className=" border border-gray-300">Name </th>
                        <th className="p-4  border border-gray-300">Image</th>
                        
                        <th className="border border-gray-300"  >Actions</th>
                    </tr>
                </thead>
                <tbody >
                    {categories.map( (category,index) => (
                        <tr key = {category._id} className="border border-gray-300 text-center">
                            <td className="border border-gray-300 p-4 w-3">{index + 1}</td>
                            <td className="border border-gray-300">
                                {category.name}
                            </td>
                            <td className="flex justify-center p-4">
                                <img
                                src ={category.image}
                                width ={60}
                                height = {60}
                                className ="rounded"
                                alt = {category.name}
                                
                                />
                            </td>
                            <td className="border border-gray-300">
                                <button className="text-red-500 cursor-pointer"
                                onClick={() => deleteCategory(category._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}