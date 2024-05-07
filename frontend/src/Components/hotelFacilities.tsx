import { hotelFacilities } from "../config/hotel-data"

type Props={
    selectedFacilities:string[]
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void 
}
const HotelFacilitiesFilter=({selectedFacilities,onChange}:Props)=>{
    return(
        <div className="border-b border-slate-300 pb-5 ">
            <h1 className="text-md font-semibold mb-2">Hotel Facilities</h1>
            {
                hotelFacilities.map((facility)=>(
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" value={facility} checked={selectedFacilities.includes(facility)} onChange={onChange}/>
                        <span>{facility}</span>
                    </label>
                ))
            }
        </div>
    )
}
export default HotelFacilitiesFilter