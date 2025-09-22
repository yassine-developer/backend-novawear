import {Router} from "express";
import productController from "../controllers/product.controller.js";
import upload from "../middlewares/uplodfile.middleware.js";
import adminAuth from "../middlewares/adminauth.middleware.js";


const productRouter = Router();

productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxcount:1},{name:'image2',maxcount:1},{name:'image3',maxcount:1},{name:'image4',maxcount:1}]),productController.addProduct);
productRouter.post('/remove',adminAuth,productController.removeProduct);
productRouter.post('/single',productController.displayInfoProduct);
productRouter.post('/list',productController.listProducts);

export default productRouter;
