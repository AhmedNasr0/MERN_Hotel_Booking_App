import {  useFormContext } from "react-hook-form"
import { hotelTypes } from "../../config/hotel-data"
import { HotelFormData } from "../HotelFormPage"


const TypeSection=()=>{
    const {register,watch,formState:{errors}}=useFormContext<HotelFormData>();
    const typeWatch=watch("type")
    return(
        <div className="">
            <h2 className="text-2xl font-bold mb-3">Type</h2>
            <div className="grid grid-cols-5 gap-2">
                {
                    hotelTypes.map((type)=>(
                        <label className={
                            typeWatch===type 
                            ? "cursor-pointer p-2 bg-blue-300 rounded-full flex items-center justify-center font-semibold hover:bg-blue-300"
                            : " p-2 bg-gray-300 rounded-full flex items-center justify-center hover:bg-blue-300 cursor-pointer font-semibold"}>
                            <input type="radio" value={type} {...register("type",{"required":"Type Required"})} className="hidden" />
                            <span>{type}</span>
                        </label>
                    ))
                }
            </div>
            {
                errors.type&&(
                    <span className="font-bold text-red-500">{errors.type.message}</span>
                )
            }
        </div>
    )
}
export default TypeSection