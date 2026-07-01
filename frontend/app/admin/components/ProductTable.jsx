import axios from "axios"

export default function ProductTable({products, refresh}){

    async function deleteProduct(id){
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`)
            refresh()
        } catch (error) {
            console.log(error)
            alert("Failed to delete product")
        }
    }

    return(
        <>
        <div className="p-6">
            <table className="w-full border border-gray-300 rounded-xl ">
                <thead className="text-white bg-[#6E4C3A]">
                    <tr>
                        <th className="p-4 border border-gray-300">S.No</th>
                        <th className="p-4 border border-gray-300">Name</th>
                        <th className="p-4 border border-gray-300">Image</th>
                        <th className="p-4 border border-gray-300">Price</th>
                        <th className="p-4 border border-gray-300">Sizes</th>
                        <th className="p-4 border border-gray-300">Category</th>
                        <th className="p-4 border border-gray-300">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product._id} className="border border-gray-300 text-center">
                            <td className="border border-gray-300 p-4">{index + 1}</td>
                            <td className="border border-gray-300 p-4">{product.name}</td>
                            <td className="border border-gray-300 p-4">
                                <div className="flex justify-center">
                                    <img
                                        src={product.image}
                                        width={60}
                                        height={60}
                                        className="rounded"
                                        alt={product.name}
                                    />
                                </div>
                            </td>
                            <td className="border border-gray-300 p-4">₹{product.price}</td>
                            <td className="border border-gray-300 p-4">{product.size.join(", ")}</td>
                            <td className="border border-gray-300 p-4">{product.categoryId?.name || "N/A"}</td>
                            <td className="border border-gray-300 p-4">
                                <button className="text-red-500 cursor-pointer"
                                onClick={() => deleteProduct(product._id)}>
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