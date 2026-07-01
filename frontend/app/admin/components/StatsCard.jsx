export default function StatsCard({
    title,
    value
}){
    return(
        <>
        <div className="bg-white border border-gray-200 shadow-sm p-6 hover:shadow-md  hover:border-black transition cursor-pointer flex flex-col justify-between h-50 mx-2">

            <div className="flex justify-between text-2xl font-serif">
                <p className="uppercase text-xl">{title}</p>
                <h2>{value}</h2>
            </div>
            <div>
                <p className="underline">Explore {title}</p>
            </div>

        </div>
        </>
    )
}