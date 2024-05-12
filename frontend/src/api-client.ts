import { HotelFormData } from "./forms/HotelFormPage";
import { loginFormData } from "./pages/loginPage";
import { registerFormData } from "./pages/registerPage";
import { BookingFormDataType, HotelType } from "./shared";

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL || ""

export interface ISearchParams{
    destination?:string,
    checkIn?:string,
    checkOut?:string,
    adultCount?:string,
    childCount?:string,
    page?:string,
    facilities?:string[],
    types?:string[],
    starRating?:string[],
    maxPrice?:string,
    minPrice?:string,
    sortOption?:string
}



export const register=async (formData:registerFormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/users/register`,{
        method:'POST',
        credentials:"include",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    })
    const responseBody=await response.json();
    if(!response.ok)    throw new Error(responseBody.message);
}

export const login= async ( formData:loginFormData ) => {
    const response=await fetch(`${API_BASE_URL}/api/auth/login`,{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    })
   const body=await response.json()
   if(!response.ok) throw new Error(body.message)
}

export const verifyToken=async ()=>{
    const response=await fetch(`${API_BASE_URL}/api/auth/verify-token`,{
        method:'get',
        credentials:"include"
    })
    if(!response.ok) throw new Error("Token Invalid");
    return response.json();
}

export const signOut=async()=>{
    const response=await fetch(`${API_BASE_URL}/api/auth/logout`,{
        method:'post',
        credentials:'include',
        headers:{
            "Content-Type":"application/json"
        }
    })
    if(!response.ok) throw new Error("Error Dusring Logout")
    
}

export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
      method: "POST",
      credentials: "include",
      body: hotelFormData,
    });
  
    if (!response.ok) {
      throw new Error("Failed to add hotel");
    }
  
    return response.json();
};
export const myHotels=async()=>{
    const response=await fetch(`${API_BASE_URL}/api/my-hotels`,{
        method:'GET',
        credentials:'include'
    })
    if(!response.ok) throw new Error("error while fetching hotels ")
    return response.json()
}
export const editHotel=async(hotelData:FormData)=>{
    const response=await fetch(`${API_BASE_URL}/api/my-hotels/${hotelData.get("hotelId")}`,{
        method:"put",
        credentials:'include',
        body:hotelData
    }) 
    if(!response.ok) throw new Error("error when updating")
    return response.json();
}

export const getHotelById=async(hotelId:string):Promise<HotelFormData>=>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`,{
        credentials:'include'
    })
    if(!response.ok) throw new Error("error when updating")
    return response.json();
}

export const FetchHotels=async(searchParams:ISearchParams)=>{
    const urlParams=new URLSearchParams();
    urlParams.append("destination",searchParams.destination||'');
    urlParams.append("checkIn",searchParams.checkIn?.toString()||"");
    urlParams.append("checkOut",searchParams.checkOut?.toString()||"");
    urlParams.append("adultCount",searchParams.adultCount?.toString()||"");
    urlParams.append("childCount",searchParams.childCount?.toString()||"");
    urlParams.append("page",searchParams.page||"");
    urlParams.append("starRating",searchParams.starRating?.toString()||"");
    urlParams.append("sortOption",searchParams.sortOption?.toString()||"");
    urlParams.append("minPrice",searchParams.minPrice?.toString()||"0")
    urlParams.append("maxPrice",searchParams.maxPrice?.toString()||"0")
    searchParams.facilities?.forEach((facility)=>{
        urlParams.append("facilities",facility);
    })
    searchParams.types?.forEach((type)=>urlParams.append("types",type))
    searchParams.starRating?.forEach((star)=>urlParams.append("starRating",star))

    const response=await fetch(`${API_BASE_URL}/api/hotels/search?${urlParams}`,{
    })
    if(!response.ok) throw new Error("error while fetching")
    return response.json()
}
export const fetchCurrentUser=async()=>{
    const user=await fetch(`${API_BASE_URL}/api/users/me`,{
        credentials:'include',
    })
    if(!user.ok) throw new Error("Error While Fetching User")
    return user.json();
}

export const createPaymentIntent=async (hotelId:string,numberOfNight:string)=>{
    const response=await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,{
        method:"POST",
        credentials:"include",
        body:JSON.stringify({numberOfNight}),
        headers:{
            "Content-Type":"application/json"
        }
    })
    if(!response.ok) throw new Error("Error While Fetching")
    return response.json()
}
export const createRoomBooking = async (formData: BookingFormDataType) => {
    const response = await fetch(
      `${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      }
    );
  
    if (!response.ok) {
      throw new Error("Error booking room");
    }
  };

  export const fetchMyHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Error fetching hotels");
    }
  
    return response.json();
  };
export const getMyBookings=async()=>{
    const result=await fetch(`${API_BASE_URL}/api/bookings/my-bookings`,{
        method:"GET",
        credentials:"include"
    });
    if(!result.ok) throw new Error("Error While Fetching")
    return result.json()
}