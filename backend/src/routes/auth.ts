
import routes, { Request, Response } from "express";
import { check } from "express-validator";
import { login, logout, verifyTokenController } from "../controllers/authControllers";
import { verifyToken } from "../middlewares/verifyToken";

const router=routes.Router()

router.post('/login',[
    check("email","Email is Required").isEmail(),
    check("password","Password with More Than 6 charchters Required").isString()
],login)
router.get("/verify-token",verifyToken,verifyTokenController)
router.post("/logout",logout)
export default router