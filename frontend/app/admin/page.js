import StatsCard from "./components/StatsCard"

export default function AdminPage() {
  return(
    <>
    <div className="p-4">
        <p className="text-2xl font-semibold">Overview</p>
        <p className="text-3xl mt-10 font-semibold">Store Analytics</p>
    </div>
    <div className="grid grid-cols-2 gap-6">
        <StatsCard
        title="Total Categories"
        value ="3"
        />

         <StatsCard
        title="Total Products"
        value ="40"
        />
        
    </div>
    </>
  )
  
}