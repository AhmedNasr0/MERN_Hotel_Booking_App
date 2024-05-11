
import routes from "express"
import { register , getMyInfo } from "../controllers/userControllers"
import {check} from "express-validator"
import { verifyToken } from "../middlewares/verifyToken"
const router=routes.Router()

router.post("/register",[
    check("firstName","First Name Is Required").isString(),
    check("lastName","Last Name Is Required").isString(),
    check("email","Email is Required").isEmail(),
    check("password","Password with More then 6 characters Required").isLength({min:6})
],register); 


router.get("/me",verifyToken,getMyInfo);

export default router