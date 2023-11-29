import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoutes from './routes/users.js'
import commentRoutes from './routes/comment.js'
import videoRoutes from './routes/video.js'
import authRoutes from './routes/auth.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'


const app = express();
dotenv.config();
const PORT = 8000;


const connect = ()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{

        console.log("Database Connected");
        
    }).catch(err=>{
        throw err
    })
}
app.use(cors());
app.use(cookieParser())
app.use(express.json())


// app.use(cors({
//     origin: ['http://localhost:3000', 'http://localhost:8000'],
//     credentials: true, // Enable credentials (cookies, authorization headers, etc.)
//   }));

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/comment", commentRoutes)
app.use("/api/videos", videoRoutes)


app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "something went wrong" 
    return res.status(status).json({
        success: false,
        status,
        message,
    })
})

app.listen(PORT,()=>{
    connect()
    console.log("Server is running...")
})


