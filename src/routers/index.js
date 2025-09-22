import { Router } from "express";
import { userRouter } from "./user.router.js";
import { adminRouter } from "./admin.router.js";
import productRouter from "./product.router.js";


export const apiRouter = Router();

apiRouter.use('/user',userRouter);
apiRouter.use('/admin',adminRouter);
apiRouter.use('/product',productRouter);