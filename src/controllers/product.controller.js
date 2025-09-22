import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/product.model.js";

const productController = {

    addProduct: async (req, res) => {
        try {

            const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
            const image1 = req.files.image1 && req.files.image1[0];
            const image2 = req.files.image2 && req.files.image2[0];
            const image3 = req.files.image3 && req.files.image3[0];
            const image4 = req.files.image4 && req.files.image4[0];

            const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

            let imageurl = await Promise.all(
                images.map(async (item) => {
                    let result = await cloudinary.uploader.upload(item.path, { ressource_type: 'image' });
                    return result.secure_url;
                })
            )

            const productData = {
                name,
                description,
                price: Number(price),
                category,
                subCategory,
                sizes: JSON.parse(sizes),
                bestseller: bestseller === 'true' ? true : false,
                image: imageurl,
                date: Date.now()
            }

            // console.log(name,description,price,category,subCategory,sizes,bestseller);
            // console.log(imageurl);

            const product = new productModel(productData);
            await product.save();

            res.json({ success: true, message: "product added" });

        } catch (error) {
            console.log(error);

            res.json({ success: false, message: error.message })
        }
    },

    listProducts: async (req, res) => {

        try {

            const products = await productModel.find({});
            res.json({ success: true, products })

        } catch (error) {
            console.log(error);
            res.json({ success: false, message: error.message })
        }

    },

    removeProduct: async (req, res) => {

        try {

            await productModel.findByIdAndDelete(req.body.id);

            res.json({ success: true, message: "product removed" });

        } catch (error) {
            console.log(error);
            res.json({ success: false, message: error.message })
        }
    },

    displayInfoProduct: async (req, res) => {

        try {

            const { productId } = req.body;
            const product = await productModel.findById(productId);
            res.json({ success: false, product });

        } catch (error) {

            console.log(error);

            res.json({ success: false, message: error.message })
        }
    },
}



export default productController;