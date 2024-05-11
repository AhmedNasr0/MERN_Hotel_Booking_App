import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useSearchContext } from "../context/searchContext";
import { useParams } from "react-router-dom";
import BookingDetailsSummary from "../Components/BookingDetailsSummary";
import BookingForm from "../forms/BookingForm";
import { HotelFormData } from "../forms/HotelFormPage";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { Elements } from "@stripe/react-stripe-js";


const Booking = () => {
  const {stripePromise}=useAppContext()
  const search = useSearchContext();
  const { hotelId } = useParams();
  const [numberOfNight,setNumberOfNight]=useState<number>(0);


useEffect(()=>{
        if(search.checkIn&&search.checkOut){
            const nights=Math.abs(search.checkOut.getTime()-search.checkIn.getTime()) / (1000 *60 *60 *24);
            setNumberOfNight(Math.ceil(nights));
        }
    },[search.checkIn,search.checkOut])

const {data:paymentIntentData}=useQuery("createPaymentIntent",()=>apiClient.createPaymentIntent(hotelId as string,numberOfNight.toString()),{
    enabled: !hotelId || numberOfNight >0
  })
    

  const { data: hotelData } = useQuery(
    "fetchHotelByID",
    () => apiClient.getHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  if (!hotelData) {
    return <></>;
  }
  const hotel:HotelFormData =hotelData as HotelFormData
  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-5">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNight}
        hotel={hotel}
      />
      {
        currentUser&&paymentIntentData&&(
          <Elements stripe={stripePromise} options={{
            clientSecret:paymentIntentData.clientSecret
          }}>
              <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData}/>
          </Elements>
        )
      }
    </div>
  );
};

export default Booking;