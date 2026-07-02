"use client";
import axios from "axios"
import { useRouter } from "next/navigation"

export default function LeadTable({ leads, refresh }) {
    const router = useRouter();

    async function deleteLead(id) {
        if (!window.confirm("Are you sure you want to delete this lead?")) return;
        
        try {
            await axios.delete(`http://localhost:5000/api/leads/${id}`)
            console.log("Lead Deleted Successfully")
            refresh()
        } catch (error) {
            console.log(error)
            alert("Failed to delete lead")
        }
    }

    return (
        <>
            <div className="p-6 overflow-x-auto">
                <table className="w-full border border-gray-300">
                    <thead className="text-white bg-admin-brand">
                        <tr>
                            <th className="p-4 border border-gray-300">S.No</th>
                            <th className="border border-gray-300">Date</th>
                            <th className="border border-gray-300 p-4">Name</th>
                            <th className="border border-gray-300 p-4">Email</th>
                            <th className="border border-gray-300 p-4">Subject</th>
                            <th className="border border-gray-300 p-4 max-w-xs">Message</th>
                            <th className="border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead, index) => (
                            <tr 
                                key={lead._id} 
                                onClick={() => router.push(`/admin/leads/${lead._id}`)}
                                className="border border-gray-300 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <td className="border border-gray-300 p-4 w-12">{index + 1}</td>
                                <td className="border border-gray-300 p-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(lead.createdAt).toLocaleDateString()}
                                </td>
                                <td className="border border-gray-300 p-4 font-medium">
                                    {lead.name}
                                </td>
                                <td className="border border-gray-300 p-4 text-blue-600">
                                    <a href={`mailto:${lead.email}`} onClick={(e) => e.stopPropagation()}>{lead.email}</a>
                                </td>
                                <td className="border border-gray-300 p-4 font-semibold text-gray-700">
                                    {lead.subject || "No Subject"}
                                </td>
                                <td className="border border-gray-300 p-4 text-left max-w-xs truncate" title={lead.message}>
                                    {lead.message}
                                </td>
                                <td className="border border-gray-300 p-4">
                                    <button 
                                        className="text-red-500 cursor-pointer font-medium hover:text-red-700 transition"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteLead(lead._id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        
                        {leads.length === 0 && (
                            <tr>
                                <td colSpan="7" className="p-8 text-gray-500 text-lg">No leads found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}
