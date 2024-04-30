
import routes,{NextFunction, Request,Response} from "express"
import catchAsyncError from "../utils/errorHandling"
import { register } from "../controllers/userControllers"
import {check} from "express-validator"
const router=routes.Router()

router.post("/register",[
    check("firstName","First Name Is Required").isString(),
    check("lastName","Last Name Is Required").isString(),
    check("email","Email is Required").isEmail(),
    check("password","Password with More then 6 characters Required").isLength({min:6})
],register); 

export default router