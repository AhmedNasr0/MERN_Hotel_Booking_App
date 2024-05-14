import { useForm } from "react-hook-form";
import { BookingFormDataType, user } from "../shared";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../context/searchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from '../api-client'
import { useAppContext } from "../context/appContext";

interface Iprops{
    currentUser:user,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    paymentIntent:any
}
const BookingForm=({currentUser,paymentIntent}:Iprops)=>{
    const search=useSearchContext();
    const {hotelId}=useParams();
    const stripe=useStripe()
    const elements=useElements()
    const {showToast}=useAppContext()
    const {mutate:bookRoom,isLoading}=useMutation(apiClient.createRoomBooking,{
      onSuccess:()=>{
        showToast({message:"Booking Saved!",type:"success"})
      },
      onError:()=>{
        showToast({message:"Error Saving booking",type:'error'})
      }
    })

    const {register , handleSubmit }=useForm<BookingFormDataType>({
      defaultValues:{
        firstName:currentUser.firstName,
        lastName:currentUser.lastName,
        email:currentUser.email,
        adultCount:search.adultCount,
        childCount:search.childCount,
        checkIn:search.checkIn.toISOString(),
        checkOut:search.checkOut.toISOString(),
        hotelId:hotelId,
        totalCost:paymentIntent.totalCost ,
        paymentIntentId:paymentIntent.paymentIntentId 
      }
    });

    const onSubmit=async (formData:BookingFormDataType)=>{
      if(!stripe) return;
      const result=await stripe.confirmCardPayment(paymentIntent.clintSecret as string,{
        payment_method:{
          card:elements?.getElement(CardElement) as StripeCardElement
        }
      })
      if(result.paymentIntent?.status==="succeeded") {  
        bookRoom({...formData,paymentIntentId:result.paymentIntent.id});
      }
    }


    return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap flex-col gap-5 rounded-lg border border-slate-300 p-5"
    >
      <span className="text-xl md:text-3xl font-bold">Confirm Your Details</span>
      <div className="flex flex-wrap flex-col gap-6">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            value={currentUser.firstName}
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            value={currentUser.lastName}
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            value={currentUser.email}
            {...register("email")}
          />
        </label>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>
        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: £{paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold"> Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-500 text-white p-2 font-bold rounded-xl hover:bg-blue-400 text-md disabled:bg-gray-500"
        >
          { isLoading ? (
            <div className="flex items-center gap-2">
            <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            </div>
            <span>Booking...</span>
            </div>
          ):( "Confirm Booking" )
        }
        </button>
      </div>
    </form>
  );
};

export default BookingForm;