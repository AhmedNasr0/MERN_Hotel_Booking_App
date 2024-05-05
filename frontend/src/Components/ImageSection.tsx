import { useFormContext } from "react-hook-form"
import { HotelFormData } from "../forms/HotelFormPage"


const ImageSection=()=>{
    const {watch,setValue,register,formState:{errors}}=useFormContext<HotelFormData>();
    const existingImageUrls=watch("imageUrls");
    const handleDelete=(event:React.MouseEvent<HTMLButtonElement,MouseEvent>,imageUrl:string)=>{
        event.preventDefault();
        setValue('imageUrls',existingImageUrls.filter((url)=>url!==imageUrl))
    }
    return (
        <>
            <h1 className="text-3xl font-bold">Images</h1>
            <div className="border rounded p-4 flex flex-col gap-4">
                {existingImageUrls && (
                    <div className="grid grid-cols-6 gap-4">
                        {existingImageUrls.map((url) => (
                        <div className="relative group">
                            <img src={url} className="min-h-full object-cover" />
                            <button
                            onClick={(event) => handleDelete(event, url)}
                            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                            >
                            Delete
                            </button>
                        </div>
                        ))}
                    </div>
                )}
                <input type="file" min={1} multiple accept="image/*" {...register("images",{
                    validate:(imgs)=>{
                        if(imgs.length + (existingImageUrls?.length || 0) > 6) return "Delete Images (Max Images 6)"
                        else if(imgs.length + (existingImageUrls?.length || 0) <1) return "At Least 1 Images Required"
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