import express from "express"
import { getAllHotels } from "../controllers/hotelControllers"

const router=express.Router()

router.get('/search',getAllHotels)

export default router