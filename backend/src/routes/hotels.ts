import express from "express"
import { getAllHotels,getAllHotelsBySearch,confirmPaymentIntent, createPayment_Intent } from "../controllers/hotelControllers"
import { verifyToken } from "../middlewares/verifyToken"

const router=express.Router()
router.get('/',getAllHotels)
router.get('/search',getAllHotelsBySearch)
router.post('/:hotelId/bookings/payment-intent',verifyToken,createPayment_Intent);
router.post('/:hotelId/bookings',verifyToken,confirmPaymentIntent)
export default router
