import {v2 as cloudinary} from "cloudinary";

const {CLOUNDINARY_NAME,CLOUNDINARY_SECRET_KEY,CLOUNDINARY_API_KEY} = process.env;

const connectCloudinary = async () => {

    cloudinary.config({
        cloud_name :CLOUNDINARY_NAME,
        api_key:CLOUNDINARY_API_KEY,
        api_secret:CLOUNDINARY_SECRET_KEY
    })
}

export default connectCloudinary;