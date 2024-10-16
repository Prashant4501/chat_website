import jwt from "jsonwebtoken"
import User from "../Models/userModel.js"
import message from "../Models/messageschema.js"

const isLogin=(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        //console.log(token);
    if(!token) return res.status(500).send({
        success:false,
        message:"user unauthorize"
    })
    const decode=jwt.verify(token,process.env.JWT_SECRET);
    if(!decode) return res.status(500).send({
        success:false,
        message:"user unauthorize  Invalid Token"
    })
    const user=User.findById(decode.userId).select("-password");
    if(!user){
        return res.status(500).send({
            success:false,
            message:"User not found"
        })
    }
    req.user=user;
    next();
    } catch (error) {
        console.log(`Error in islogin middleware ${error.message}`);
        return res.status(500).send({
            success:false,
            message:error
        })
    }

}
export default isLogin