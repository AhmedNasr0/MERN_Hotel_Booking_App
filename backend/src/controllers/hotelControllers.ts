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