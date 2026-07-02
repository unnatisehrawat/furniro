"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { TEXT } from "@/constants/text";

export default function AdminAuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      
      
      router.push("/admin/dashboard");
      
    } catch (err) {
      setError(err.response?.data?.message || TEXT.ADMIN_LOGIN.ERROR_DEFAULT);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-admin-brand">{TEXT.ADMIN_LOGIN.TITLE}</h1>
        
        
        {error && <p className="text-red-500 text-center mb-4 font-medium">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder={TEXT.ADMIN_LOGIN.EMAIL_PLACEHOLDER} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-brand"
          />
          <input 
            type="password" 
            placeholder={TEXT.ADMIN_LOGIN.PASSWORD_PLACEHOLDER}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-brand"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-brand text-white py-3 rounded-lg font-medium hover:bg-[#9c7827] transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? TEXT.ADMIN_LOGIN.BUTTON_LOGGING_IN : TEXT.ADMIN_LOGIN.BUTTON_LOGIN}
          </button>
        </form>
      </div>
    </div>
  );
}
