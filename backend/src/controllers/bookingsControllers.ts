import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../utils/errorHandling";
import Hotel, { HotelType } from "../models/hotel";
import { BookingType } from "./hotelControllers";


export const getMyBookings=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    console.log(req.userId);
    const HotelsBookings=await Hotel.find( { bookings:{ $elemMatch:{userId:req.userId as string} } })
    const results=HotelsBookings.map((hotel)=>{
        const userBookings=hotel.bookings.filter((booking)=>booking.userId ==req.userId)
        const hotelwithUserBookings:HotelType={...hotel.toObject(),bookings:userBookings};
        return hotelwithUserBookings
    })
    console.log(results)
    res.status(200).json(results);
})