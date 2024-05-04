import { useMutation } from "react-query";
import { useAppContext } from "../context/appContext";
import HotelForm, {  } from "../forms/HotelFormPage"
import * as apiClient from '../api-client'
const AddHotel = () => {
    const { showToast } = useAppContext();
  
    const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
      onSuccess: () => {
        showToast({ message: "Hotel Saved!", type:"success" });
      },
      onError: () => {
        showToast({ message: "Error Saving Hotel", type: "error" });
      },
    });
  
    const handleSave:(data:FormData)=>void = (hotelFormData: FormData) => {
      mutate(hotelFormData);
    };
  
    return (
        <HotelForm saveForm={handleSave} loading={isLoading} />
    );
  };
  
  export default AddHotel;