import { useFormContext } from "react-hook-form"
import { HotelFormData } from "../forms/HotelFormPage"


const ImageSection=()=>{
    const {register,formState:{errors}}=useFormContext<HotelFormData>();
    return (
        <>
            <h1 className="text-3xl font-bold">Images</h1>
            <div className="border border-1 p-5">
                <input type="file" min={1} multiple accept="image/*" {...register("images",{
                    validate:(imgs)=>{
                        if(imgs.length > 6) return "Delete Images (Max Images 6)"
                        else if(imgs.length<1) return "At Least 1 Images Required"
                    }
                })}/>
                {
                    errors.images&&(
                        <span className="text-red-500 font-bold">{errors.images.message}</span>
                    )
                }
            </div>
        </>
    )
}
export default ImageSection