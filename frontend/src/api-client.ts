import { HotelFormData } from "./forms/HotelFormPage";
import { loginFormData } from "./pages/loginPage";
import { registerFormData } from "./pages/registerPage";

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL || ""

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