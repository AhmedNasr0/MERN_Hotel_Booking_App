import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "../Components/DetailsSections";
import TypeSection from "../Components/TypeSection";
import FacilitiesSection from "../Components/FacilitiesSection";
import GuestSection from "../Components/GuestSection";
import ImageSection from "../Components/ImageSection";
export type HotelFormData = {
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
  saveForm: (hotelFormData: FormData) => void;
  loading: boolean;
}
const HotelForm = (props:Iprops) => {
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit } = formMethods;
    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
      
      const formData=createFormData(formDataJson);
      props.saveForm(formData);
    });
  
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
              className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
            >
              {props.loading ? "Saving..." : "Save"}
            </button>
          </span>
        </form>
      </FormProvider>
    );
  };
  
  function createFormData(formDataJson:HotelFormData){
      const formData = new FormData();
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