

const Footer=()=>{
    return(
        <div className="bg-blue-500 px-4 py-8 ">
            <div className="container mx-auto flex flex-col gap-3 sm:flex-row sm:justify-between items-center">
                <span className="text-2xl text-white font-bold tracking-tight">Holidays.com</span>
                <span className="text-white font-bold tracking-tight flex gap-4">
                    <p className="cursor-pointer">Privacy Policy</p>
                    <p className="cursor-pointer">Terms Of Service</p>
                </span>
            </div>  
        </div>
    )
}
export default Footer 