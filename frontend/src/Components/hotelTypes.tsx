import { hotelTypes } from "../config/hotel-data"

type Props={
    selectedTypes:string[]
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void 
}
const HotelTypesFilter=({selectedTypes,onChange}:Props)=>{
    return(
        <div className="border-b border-slate-300 pb-5 ">
            <h1 className="text-md font-semibold mb-2">Hotel Types</h1>
            {
                hotelTypes.map((type)=>(
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" value={type} checked={selectedTypes.includes(type)} onChange={onChange}/>
                        <span>{type}</span>
                    </label>
                ))
            }
        </div>
    )
}
export default HotelTypesFilter