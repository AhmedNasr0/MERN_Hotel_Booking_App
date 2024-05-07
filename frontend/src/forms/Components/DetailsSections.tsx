import { useFormContext } from "react-hook-form"
import { HotelFormData } from "../HotelFormPage";



const DetailsSection=()=>{
    const {register, formState:{errors}} = useFormContext<HotelFormData>();
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Add Hotel</h1>
            <label className="text-gray-700 text-sm font-bold flex-1">
                    Name
                    <input type="text" className='border rounded w-full py-1 px-2 font-normal' 
                     {...register("name",{required:"Name Is Required"})}
                     />
                     {
                        errors.name&&(
                            <span className="text-red-500">{errors.name.message}</span>
                        )
                     }
            </label>
            <div className="flex gap-3">
                     <label className="text-gray-700 text-sm font-bold flex-1">
                            City
                            <input type="text" className='border rounded w-full py-1 px-2 font-normal' {...register('city',{required:"City Required"})} />
                            {
                                errors.city&&(
                                    <span className="text-red-500" >{errors.city.message}</span>
                                )
                            }
                     </label>
                     <label className="text-gray-700 text-sm font-bold flex-1">
                            Country 
                            <input type="text" className='border rounded w-full py-1 px-2 font-normal' {...register('country',{required:"Country Required"})} />
                            {
                                errors.country&&(
                                    <span className="text-red-500" >{errors.country.message}</span>
                                )
                            }
                     </label>
            </div>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Description
                <textarea rows={5} className='border rounded w-full py-1 px-2 font-normal' {...register('description',{required:"Description Required"})} />
                            {
                                errors.description&&(
                                    <span className="text-red-500" >{errors.description.message}</span>
                                )
                            }
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                            Price Per Night 
                            <input type="number" className='border rounded w-full py-1 px-2 font-normal' {...register('pricePerNight',{required:"Price Per Night Required"})} min={1}/>
                            {
                                errors.pricePerNight&&(
                                    <span className="text-red-500" >{errors.pricePerNight.message}</span>
                                )
                            }
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Star Rating 
                <select className='border rounded w-full py-1 px-2 font-normal' {...register('starRating',{required:"Star Rating Required"})}>
                    <option value="" disabled selected>Select Rating</option>
                    {
                        [1,2,3,4,5].map((num)=>(
                            <option value={num}>{num}</option>
                        ))
                    }
                </select>
                {
                    errors.starRating&&(
                    <span className="text-red-500" >{errors.starRating.message}</span>
                    )
                }
            </label>
        </div>
    )
}
export default DetailsSection