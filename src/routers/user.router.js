import {Router} from "express";
import userController from "../controllers/user.controller.js";



export const userRouter = Router();

userRouter.post('/login',userController.loginUser);
userRouter.post('/register',userController.registerUser);
