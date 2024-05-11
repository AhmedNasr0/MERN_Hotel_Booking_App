import express from "express"
import { getMyBookings } from "../controllers/bookingsControllers"
import { verifyToken } from "../middlewares/verifyToken"

const router=express.Router()

router.get("/my-bookings",verifyToken,getMyBookings)


export default router 