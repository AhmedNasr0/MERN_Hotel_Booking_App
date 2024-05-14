import { useFormContext } from "react-hook-form"
import { HotelFormData } from "../HotelFormPage";


const GuestSection=()=>{
    const {register,formState:{errors}}=useFormContext<HotelFormData>();
    return(
        <>
            <h1 className="text-3xl font-bold">Guests</h1>
            <div className="flex gap-3 rounded-l w-full p-5 items-center justify-center bg-gray-300">
                <div className="w-4/5 mx-auto flex flex-wrap gap-5">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Adults 
                    <input type="number" className='border rounded w-full py-1 px-2 font-normal' min={0} {...register("adultCount",{required:"Adult Number Required"})}/>
                {
                    errors.adultCount&&(
                        <span className="text-red-500">{errors.adultCount.message}</span>
                    )
                }
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Childs  
                    <input type="number" className='border rounded w-full py-1 px-2 font-normal' min={0} {...register("childCount",{required:"Child Number Required"})}/>
                {
                    errors.childCount&&(
                        <span className="text-red-500">{errors.childCount.message}</span>
                    )
                }
                </label>
                </div>
            </div>
        </>
    )
}
export default GuestSection