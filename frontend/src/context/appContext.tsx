import { ReactNode, createContext, useContext, useState } from "react"
import Toast from "../Components/toast"
import { useQuery } from "react-query"
import * as apiClient from '../api-client'
import { loadStripe,Stripe } from "@stripe/stripe-js"


const stripePubKey=import.meta.env.VITE_STRIPE_PUB_KEY
type ToastMessage={
    message:string,
    type:"success"|"error"
}

type AppContext={
    showToast:(ToastMessage:ToastMessage)=>void ,
    isLoggedIn:boolean,
    stripePromise:Promise<Stripe |null>
}
const AppContext=createContext<AppContext|undefined>(undefined)

const stripePromise=loadStripe(stripePubKey);

export const AppContextProvider=({children}:{children:ReactNode})=>{
    const [toast,setToast]=useState<ToastMessage|undefined>(undefined);
    const {isError}=useQuery("validateToken",apiClient.verifyToken,{
        retry:false
    })
    return(
        <AppContext.Provider value={{
            showToast:(toastmessage)=>{setToast(toastmessage)} ,
            isLoggedIn:!isError,
            stripePromise
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