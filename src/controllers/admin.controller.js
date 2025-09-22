import jwt from "jsonwebtoken";

const adminController = {

    loginAdmin : (req,res) => {

        try {
            
            const {email,password} = req.body;
    
            if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
                const token = jwt.sign(email+password,process.env.JWT_SECRET);
                res.json({success:true,token});
            }else{
                res.json({success:false,message:"invalid credentials"});
                
            }

        } catch (error) {
            console.log(error);
            res.json({ success: false, message: error.message });
        }

    }

}

export default adminController;