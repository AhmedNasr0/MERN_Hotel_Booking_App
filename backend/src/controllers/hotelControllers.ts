import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../utils/errorHandling";
import cloudinary from 'cloudinary'
import Hotel, { HotelType } from "../models/hotel";
import { uploadImage } from "../Services/Cloudinary";

export const addHotel=catchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{
    const images = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    const imageUrls = await uploadImage(images);

    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    const hotel = new Hotel(newHotel);

    await hotel.save();

    res.status(201).json(hotel);
})
export const getMyHotels=catchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{
    const hotels=await Hotel.find({userId:req.userId});
    
    res.status(201).json({hotels})
})