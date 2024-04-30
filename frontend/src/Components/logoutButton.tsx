import { useMutation, useQueryClient } from "react-query"
import * as apiClient from "../api-client"
import { useNavigate } from "react-router-dom"
import { useAppContext } from "../context/appContext";


const SignOutBtn=()=>{
    const navigate=useNavigate();
    const {showToast} = useAppContext();
    const queryClient =useQueryClient()
    
     const mutation =useMutation(apiClient.signOut,{
        onSuccess:async ()=>{
            await queryClient.invalidateQueries("validateToken")
            showToast({message:"SignOut Successfully",type:'success'})
            navigate("/login")
        },
        onError:(error:Error)=>{
            showToast({message:error.message,type:'error'})
        }
     }
     )
     function handleOnClickBtn(){
        mutation.mutate()
     }
    return(
        <button onClick={handleOnClickBtn} className="text-blue-600 rounded-md px-3 font-bold bg-white hover:bg-gray-100">
            SignOut
        </button>
    )
}
export default SignOutBtn