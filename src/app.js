import express from "express";
import cors from "cors";
import connectDB from "./configuration/mongodb.js";
import connectCloudinary from "./configuration/cloudinary.js";
import { apiRouter } from "./routers/index.js";

const {PORT} = process.env;

// connecter mongoose a la db
connectDB();
connectCloudinary();



// crée l'instance de l'application express.app est un conteneur qui centralise et gére toute la logique de l'application express.
const app = express();


// App middleware
app.use(express.json());
app.use(cors());

//le Routing
// app.use('/api', apiRouter);
app.use('/api',apiRouter);

app.get('/',(req,res)=>{
    res.send("api working")
})

// démarrage du serveur

app.listen(PORT,(error)=>{
    if(error){
        console.log('web api on error');
        console.log(error);
        return;
    }
    console.log(`web api is running on port:${PORT}`);
    
})