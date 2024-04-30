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