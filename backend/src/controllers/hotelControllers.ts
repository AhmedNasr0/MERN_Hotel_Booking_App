import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../utils/errorHandling";
import cloudinary from 'cloudinary'
import Hotel, { HotelType } from "../models/hotel";
import { uploadImage } from "../Services/Cloudinary";
import { Stripe } from 'stripe'

const stripe=new Stripe(process.env.SECKRET_STRIPE_API_KEY as string);


type PaymentIntentType={
    payment_Intent_Id:string,
    totalCost:number,
    clintSecret:string 
}
export type BookingType={
    _id:string,
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    adultCount: number;
    childCount: number;
    checkIn:Date,
    checkOut:Date,
    totalCost:number 
}
export const createPayment_Intent=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    const {numberOfNight}=req.body
    const hotelId=req.params.hotelId
    const hotel=await Hotel.findById(hotelId)
    if(!hotel){
        return res.status(404).json({"message":"Hotel Not Found"})
    }
    const totalCost=hotel.pricePerNight* numberOfNight
    const payment=await stripe.paymentIntents.create({
        amount:totalCost*100,
        currency:"EUR",
        metadata:{
            hotelId,
            userId:req.userId
        }
    })
    
    if(!payment.client_secret) return res.status(500).json({"message":"Error While creating payment intent"})
    const response:PaymentIntentType={
        payment_Intent_Id:payment.id,
        totalCost,
        clintSecret:payment.client_secret.toString()
    }
    res.status(200).json(response)
   
})

export const confirmPaymentIntent=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    const paymentintent_Id=req.body.paymentIntentId
    const paymentIntent=await stripe.paymentIntents.retrieve(paymentintent_Id as string) 

    // make some checks of retrived payment
    if(!paymentIntent) return res.status(400).json({"message":"payment intent not found"}) 
    if(paymentIntent.metadata.hotelId !=req.params.hotelId || paymentIntent.metadata.userId!=req.userId){
        return res.status(400).json({"message":"payment intent mismatch"})
    }
    if(paymentIntent.status!="succeeded") return res.status(400).json({"message":"payment intent not Succeded"})
    // save and update hotel and booking
    const book:BookingType={...req.body , userId:req.userId}
    const hotel=await Hotel.findOneAndUpdate({_id:req.body.hotelId} ,{$push:{bookings:book}})
    if(!hotel ) return res.status(400).json({"message":"Hotel not found"})
    await hotel.save();
    res.status(200).json({"message":"payment intent success"})
})



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
export const editHotel=catchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{
    let {hotelId}=req.params 
    let imageFiles=req.files as Express.Multer.File[]
    let updatedHotel:HotelType=req.body 
    updatedHotel.lastUpdated=new Date();
    const uploadedImages=await uploadImage(imageFiles);
    
    const hotel=await Hotel.findByIdAndUpdate({_id:hotelId, userId:req.userId},updatedHotel, {new:true});
    if(!hotel) res.status(404).json({"message":"hote Not Found"});

    else hotel.imageUrls=[...uploadedImages,...updatedHotel?.imageUrls||[]];
    await hotel?.save();
    res.status(201).json(hotel);
})
export const getHotelById=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    const hotel = await Hotel.findById({
        _id:req.params.hotelId.toString(),
        userId:req.userId
    })
    res.json(hotel)
})

export const getAllHotels=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    const query=contructSearchQuery(req.query);
    let sortOption=SortOption(req.query.sortOption);
    const pageSize=5
    const pageNumber=parseInt(req.query.page? req.query.page.toString():"1")
    const skip=(pageNumber-1)*pageSize
    const hotels=await Hotel.find(query).sort(sortOption).skip(skip).limit(pageSize);
    const total=await Hotel.countDocuments();
    res.status(201).json({
        data:hotels,
        totalPages:Math.ceil(total/pageSize),
        pageNumber,
        totalAllHotels:total,
        totalReturnedHotels:hotels.length
    })
})

const contructSearchQuery=(queryParams:any)=>{
    let contructQuery:any={}
    if(queryParams.destination){
        contructQuery.$or=[
            {city:new RegExp(queryParams.destination,"i")},
            {country:new RegExp(queryParams.destination,"i")}
        ]
    }
    if(queryParams.adultCount){
        contructQuery.adultCount={
            $gte:parseInt(queryParams.adultCount)
        }
    }
    if(queryParams.childCount){
        contructQuery.childCount={
            $gte:parseInt(queryParams.childCount)
        }
    }
    if(queryParams.facilities){
        contructQuery.facilities={
            $all:Array.isArray(queryParams.facilities)?queryParams.facilities:[queryParams.facilities]
        }
    }
    if(queryParams.types){
        contructQuery.type={
            $in:Array.isArray(queryParams.types)?queryParams.types:[queryParams.types]
        }
    }
    if(queryParams.starRating){
        contructQuery.starRating={
            $eq:parseInt(queryParams.starRating)
        }
    }
    if(queryParams.maxPrice ||queryParams.minPrice){
        contructQuery.pricePerNight={
                $lte:parseInt(queryParams.maxPrice),
                $gte:parseInt(queryParams.minPrice) 
        }
    }

    return contructQuery
}

function SortOption(sortOption:any){
    var option={}
    switch(sortOption){
        case "starRating":
            option={starRating:-1}
            break
        case "pricePerNightAsc":
            option={pricePerNight:1}
            break;
        case "pricePerNightDesc":
            option={pricePerNight:-1}
            break;
        default:
            break;
    }
    return option
}