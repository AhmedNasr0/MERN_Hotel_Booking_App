import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./Components/DetailsSections";
import TypeSection from "./Components/TypeSection";
import FacilitiesSection from "./Components/FacilitiesSection";
import GuestSection from "./Components/GuestSection";
import ImageSection from "./Components/ImageSection";
import { useEffect } from "react";
export type HotelFormData = {
    _id:string;
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    images: FileList;
    imageUrls: string[];
    adultCount: number;
    childCount: number;
};
interface Iprops{
  saveForm: (FormData:FormData)=>void,
  type:'Update'|'Save'
  hotel?:HotelFormData|undefined,
  loading: boolean;
}
const HotelForm = (props:Iprops) => {
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit ,reset } = formMethods;

  useEffect(()=>{ // reset form with data
    reset(props.hotel)
  },[props.hotel,reset])

    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
      let formData;
      if(props.hotel)
        formData=createFormData(formDataJson,props.hotel)
      else formData=createFormData(formDataJson);
      props.saveForm(formData);
    });
    console.log(formMethods.watch());
    return (
      <FormProvider {...formMethods}>
        <form className="flex flex-col gap-10" onSubmit={onSubmit}>
          <DetailsSection />
          <TypeSection />
          <FacilitiesSection />
          <GuestSection />
          <ImageSection />
          <span className="flex justify-end">
            <button
              disabled={props.loading}
              type="submit"
              className="bg-blue-500 text-white p-2 font-bold hover:bg-blue-400 text-xl rounded-md disabled:bg-gray-500"
            >
              {props.loading ? 
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status">
                </div>
              : props.type}
            </button>
          </span>
        </form>
      </FormProvider>
    );
  };
  
  function createFormData(formDataJson:HotelFormData,hotel?:HotelFormData){
    const formData = new FormData();  
    if(hotel){
      formData.append("hotelId",hotel._id);
    }
      
      formData.append("name", formDataJson.name);
      formData.append("city", formDataJson.city);
      formData.append("country", formDataJson.country);
      formData.append("description", formDataJson.description);
      formData.append("type", formDataJson.type);
      formData.append("pricePerNight", formDataJson.pricePerNight.toString());
      formData.append("starRating", formDataJson.starRating.toString());
      formData.append("adultCount", formDataJson.adultCount.toString());
      formData.append("childCount", formDataJson.childCount.toString());
  
      formDataJson.facilities.forEach((facility, index) => {
        formData.append(`facilities[${index}]`, facility);
      });
  
      if (formDataJson.imageUrls) {
        formDataJson.imageUrls.forEach((url, index) => {
          formData.append(`imageUrls[${index}]`, url);
        });
      }
  
      Array.from(formDataJson.images).forEach((image) => {
        formData.append(`images`, image);
      });
    return formData 
  }

  export default HotelForm;