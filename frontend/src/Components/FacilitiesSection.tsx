import { useFormContext } from "react-hook-form"
import { HotelFormData } from "../forms/HotelFormPage";
import { hotelFacilities } from "../config/hotel-data";


const FacilitiesSection=()=>{
    const {register , formState:{errors}}=useFormContext<HotelFormData>();
    return(
        <>
            <h2 className="text-2xl font-bold mb-3">Facilities</h2>
            <div className="grid grid-cols-5 gap-2">
                {
                    hotelFacilities.map((fac)=>(
                        <label>
                            <input type="checkbox" value={fac} {...register("facilities",{
                                validate:(facilites)=>{
                                    if(facilites.length>0 && facilites) return true 
                                    else return "At least one Facilite Required"
                                }
                            })} className="" />
                            <span>{fac}</span>
                        </label>
                    ))
                }
            </div>
            {
                errors.facilities&&(
                    <span className="font-bold text-red-500">{errors.facilities.message}</span>
                )
            }
        </>
    )
}
export default FacilitiesSection