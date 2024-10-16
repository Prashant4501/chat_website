import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './DB/dbConnect.js';
import authRouter from './rout/authUser.js';
import messageRouter from './rout/messageRout.js';
import cookieParser from 'cookie-parser'; 
import userRouter from './rout/userRout.js';
dotenv.config();

const app=express();
app.use(express.json()); 
app.use(cookieParser());

app.use('/api/auth',authRouter)
app.use('/api/message',messageRouter)
app.use('/api/user',userRouter);

app.get('/',function(req,res){
    res.send("server is working")
})
const PORT=process.env.PORT||3000

app.listen(PORT,()=>{
    dbConnect();
    console.log(`hello server is running on port ${PORT}`);
});