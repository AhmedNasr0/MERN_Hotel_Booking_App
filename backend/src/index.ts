import express,{Request,Response} from 'express'
import cors from 'cors'
import "dotenv/config"
import mongoose from 'mongoose'
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import cookieParser from 'cookie-parser'
import path from 'path'
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

app.listen(5000,()=>{console.log(" server running on localhost : 5000")})