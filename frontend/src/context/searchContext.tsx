import { createContext, useContext, useState  } from "react";

type searchContext={
    destination:string,
    checkIn:Date,
    checkOut:Date,
    adultCount:number,
    childCount:number,
    hotelId?:string,
    saveSearchValues:(destination:string,checkIn:Date,checkOut:Date,adultCount:number,childCount:number)=>void
}


const searchContext= createContext<searchContext|undefined>(undefined);

type searchContextProvider_Props={
    children:React.ReactNode,
}

export const SearchContextProvider=({children}:searchContextProvider_Props)=>{

    const [destination,setDestination]=useState<string>(()=>sessionStorage.getItem("destination")||"");
    const [checkIn,setCheckIn]=useState<Date>(()=>new Date(sessionStorage.getItem("checkIn")||new Date()))
    const [checkOut,setCheckOut]=useState<Date>(()=>new Date(sessionStorage.getItem("checkOut")||new Date()))
    const [adultCount,setAdultCount]=useState<number>(()=>parseInt(sessionStorage.getItem("adultCount")||"1"))
    const [childCount,setChildCount]=useState<number>(()=>parseInt(sessionStorage.getItem("childCount")||"1"))
    const [hotelId,setHotelId]=useState<string>(()=>(sessionStorage.getItem("hotelId")||""));

    const saveSearchValues = (
        destination: string,
        checkIn: Date,
        checkOut: Date,
        adultCount: number,
        childCount: number,
        hotelId?: string
      ) => {
        setDestination(destination);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setAdultCount(adultCount);
        setChildCount(childCount);
        if (hotelId) {
          setHotelId(hotelId);
        }
        sessionStorage.setItem("destination",destination);
        sessionStorage.setItem("checkIn",checkIn.toISOString());
        sessionStorage.setItem("checkOut",checkOut.toISOString());
        sessionStorage.setItem("adultCount",adultCount.toString());
        sessionStorage.setItem("childCount",childCount.toString());
        if(hotelId){
            sessionStorage.setItem("hotelId",hotelId);
        }
    }

    return (
        <searchContext.Provider value={{destination,checkIn,checkOut,childCount,adultCount,hotelId,saveSearchValues }}>
            {children}
        </searchContext.Provider>
    )
}

export const useSearchContext=()=>{
    const context=useContext(searchContext);
    return context as searchContext
}