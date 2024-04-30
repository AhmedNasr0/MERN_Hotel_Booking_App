import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../utils/errorHandling";
import { validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

function checkIfErrors(req:Request,res:Response){
    const errors=validationResult(req);
    if(!errors.isEmpty()) res.status(400).json(errors);
}

export const login=catchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{

    checkIfErrors(req,res);
    const {email,password}=req.body 
    //check if User Exist
    const user=await User.findOne({email})
    if(!user) res.status(400).json({message:"Invalid Credentials"})
    // check password matched
    const isMatch=await bcrypt.compare(password,user?.password as string);
    if(!isMatch) res.status(400).json({message:"Invalid Credentials"})

    const token = jwt.sign({userId:user?.id},process.env.JWT_SECRET_KEY as string,{
        expiresIn:"1d"
    })
    res.cookie("authToken",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        maxAge:86400000
    })
    res.status(200).json({userId:user?._id})
    next()
})

export const verifyTokenController=catchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{
    res.status(200).send({userId:req.userId})
})

export const logout=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    res.cookie("authToken","",{
        expires:new Date(0)
    })
    res.send();
})