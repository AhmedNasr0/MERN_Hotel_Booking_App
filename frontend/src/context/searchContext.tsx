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

    const [destination,setDestination]=useState<string>("");
    const [checkIn,setCheckIn]=useState<Date>(new Date());
    const [checkOut,setCheckOut]=useState<Date>(new Date());
    const [adultCount,setAdultCount]=useState<number>(1)
    const [childCount,setChildCount]=useState<number>(0)
    const [hotelId,setHotelId]=useState<string>('');

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