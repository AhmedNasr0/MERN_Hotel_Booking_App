import { ReactNode, createContext, useContext, useState } from "react"
import Toast from "../Components/toast"
import { useQuery } from "react-query"
import * as apiClient from '../api-client'
type ToastMessage={
    message:string,
    type:"success"|"error"
}

type AppContext={
    showToast:(ToastMessage:ToastMessage)=>void ,
    isLoggedIn:boolean
}
const AppContext=createContext<AppContext|undefined>(undefined)


export const AppContextProvider=({children}:{children:ReactNode})=>{
    const [toast,setToast]=useState<ToastMessage|undefined>(undefined);
    const {isError}=useQuery("validateToken",apiClient.verifyToken,{
        retry:false
    })
    return(
        <AppContext.Provider value={{
            showToast:(toastmessage)=>{setToast(toastmessage)} ,
            isLoggedIn:!isError
        }}>
            {toast && (
                <Toast message={toast.message} type={toast.type} onClose={()=>setToast(undefined)}/>
            )}
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext=()=>{
    const context=useContext(AppContext);
    return context as AppContext
}