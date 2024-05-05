import {  useMutation, useQuery } from "react-query"
import { editHotel, getHotelById } from "../api-client"
import HotelForm from "../forms/HotelFormPage"
import { useParams } from "react-router-dom"
import { useAppContext } from "../context/appContext"


const EditHotelPage=()=>{
    const {hotelId}=useParams()
    const {data:hotel}=useQuery("gethotel",()=>getHotelById(hotelId as string),{ 
        onError:()=>{},
        onSuccess:()=>{}
    })
    const {showToast} = useAppContext();
    const {mutate,isLoading}=useMutation(editHotel,{
        onSuccess:()=>{
            showToast({message:"Hotel Upated Suuccessfully" , type:'success'})
        },
        onError:()=>{
            showToast({message:"Something Went Wrong ! ,Hotel Not Upated" , type:'error'})
        }
    })
    const handleSave=(formData:FormData)=>{
        mutate(formData);
    }
    return (
        <>
            <HotelForm saveForm={handleSave} type={"Update"}  hotel={hotel} loading={isLoading}/>
        </>
    )
}
export default EditHotelPage