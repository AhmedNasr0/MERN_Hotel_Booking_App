import { Request, NextFunction,Response } from "express"


const catchAsyncError= (fn:any)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        fn(req,res,next).catch(
            (err:any) =>{ 
                res.status(500)
                next(err)
            }
        )
    }
}

export default catchAsyncError