import express from 'express'
import multer from 'multer'
import { addHotel,getMyHotels } from '../controllers/hotelControllers'
import { verifyToken } from '../middlewares/verifyToken'
import { body } from 'express-validator'
const router=express.Router()

const storage=multer.memoryStorage();
const upload=multer({storage});


router.post('/',verifyToken,[
    body('name').notEmpty().withMessage("Name is required"),
    body('city').notEmpty().withMessage("City is Required"),
    body('country').notEmpty().withMessage("country is Required"),
    body('description').notEmpty().withMessage("Description is Required"),
    body('type').notEmpty().withMessage("Hotel Type is Required"),
    body('pricePerNight').notEmpty().isNumeric().withMessage("price is Required"),
    body('facilities').notEmpty().isArray().withMessage("facilities is Required"),

],upload.array("images",6),addHotel);

router.get('/',verifyToken,getMyHotels)

export default router