import express,{Request,Response} from 'express'
import cors from 'cors'
import "dotenv/config"
import mongoose from 'mongoose'
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import cookieParser from 'cookie-parser'
import path from 'path'
import {v2 as cloudinary} from 'cloudinary'
import myhotelsRoutes from './routes/my-hotels';
import hotelsRoutes from './routes/hotels'
import bookingsRoutes from './routes/booking'
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})


mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>{
    console.log("DATABASE Connected to",process.env.MONGODB_CONNECTION_STRING as string)
})
const app=express();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const corsOptions={
    origin:'http://localhost:5173',
    credentials:true 
}

app.use(cors(corsOptions));


app.get("/api/test",async(req:Request,res:Response)=>{
    res.send("Hello")
})
app.use(express.static(path.join(__dirname,"../../frontend/dist")))
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use('/api/my-hotels',myhotelsRoutes);
app.use('/api/hotels',hotelsRoutes)
app.use('/api/bookings',bookingsRoutes)
app.get("*",(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,"../../frontend/dist/index.html"))
})
app.listen(5000,()=>{console.log(" server running on localhost : 5000")})