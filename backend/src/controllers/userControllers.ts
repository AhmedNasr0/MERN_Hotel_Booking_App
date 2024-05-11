import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../utils/errorHandling";
import User, { user as Iuser } from "../models/user"
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator";



export const register = catchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){ return res.status(400).json(errors)}''

    let user=await User.findOne({email:req.body.email})
    if(user!=null){ return res.status(400).json({message:"User Already Exist"})}
    user=new User(req.body);

    let token=jwt.sign({userId:user.id},process.env.JWT_SECRET_KEY as string,{expiresIn:"1d"});
    res.cookie("authToken",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV ==='production',
        maxAge:86400000
    })
    await user.save();
    return res.status(200).json({message:"Successfull Registration"})
})

export const getMyInfo=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    const userId=req.userId
    const user=await User.findById(userId).select("-password");
    if(!user) res.status(400).json({"message":"User Not Found"});
    res.status(201).json(user)
})
