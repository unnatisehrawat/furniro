export default function AdminAuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#6E4C3A]">Admin Login</h1>
        <p className="text-gray-500 text-center mb-6">Please sign in to access the dashboard</p>
        
        {/* Placeholder for future auth form */}
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#B88E2F]"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#B88E2F]"
          />
          <button className="w-full bg-[#B88E2F] text-white py-3 rounded-lg font-medium hover:bg-[#9c7827] transition">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}