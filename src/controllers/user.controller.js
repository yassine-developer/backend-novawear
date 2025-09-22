import userModel from "../models/user.model.js";
import validator from "validator";
import argon2 from "argon2";
import jwt from "jsonwebtoken"


const createToken = (id) => {

    return jwt.sign({ id }, process.env.JWT_SECRET)
}


const userController = {

    loginUser: async (req, res) => {

        try {
            const { email, password } = req.body;

            const user = await userModel.findOne({ email });

            if (!user) {
                return res.json({ success: false, message: "user doesn't exists" })
            }

            if (await argon2.verify(user.password, password)) {
                const token = createToken(user._id);
                res.json({ success: true, token });
            } else {
                return res.json({ success: false, message: "credential invalid!" })
            }
        } catch (error) {

            console.log(error);
            res.json({ success: false, message: error.message })
        }

    },

    registerUser: async (req, res) => {
        // res.json({msg:"register api working"})
        try {
            const { name, email, password } = req.body;
            // verifier si l'utilisateur existe 

            const exist = await userModel.findOne({ email });
            if (exist) {
                return res.json({ success: false, message: "user already exists" })
            }
            // verifier l'email et le mot de passe
            if (!validator.isEmail(email)) {
                return res.json({ succes: false, message: "please enter a valid email" })
            }
            if (password.length < 8) {
                return res.json({ success: false, message: "please enter a strong password" })
            }

            // hascher le mot de passe
            const hashedPassword = await argon2.hash(password);

            //  on ajoute le nouveau utilisateur
            const newUser = userModel({
                name,
                email,
                password: hashedPassword
            })

            const user = await newUser.save();

            const token = createToken(user._id)

            res.json({ sucess: true, token })
        } catch (error) {
            console.log(error);
            res.json({ success: false, message: error.message });

        }
    }
}

export default userController;