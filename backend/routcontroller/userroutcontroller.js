import User from "../Models/userModel.js";
import bcryptjs from 'bcryptjs'
import jwtToken from "../utils/jwtwebToken.js";
export const userRegister=async(req,res)=>{
    try{
       const{fullname, username, email,gender,password,profilepic}=req.body;
       const user=await User.findOne({$or:[{username},{email}]});
       if(user) return res.status(500).send({
        success:false,message:"Username or Email Already Exist"
       });
       const hashpassword=bcryptjs.hashSync(password,10);
       const profileBoy=profilepic||`https://avatar.iran.liara.run/public/boy?username=${username}`;
       const profileGirl=profilepic||`https://avatar.iran.liara.run/public/girl?username=${username}`;

       const newUser=new User({
        fullname,
        username,
        email,
        password:hashpassword,
        gender,
        profilepic:gender ==="male"? profileBoy :profileGirl 
       })
       if(newUser){
        await newUser.save();
        jwtToken(newUser._id,res)
       }else{
        res.status(500).send({
            success:false,message:"Failed to Create User"
        })
       }
       res.status(201).send({
        _id:newUser._id,
        fullname:newUser.fullname,
        username:newUser.username,
        profilepic:newUser.profilepic,
        email:newUser.email,

       })
    }catch(error){
        res.status(500).send({
            success:false,
            message:error.message
        });
        console.log(error);
    }
}
export const userLogin=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(500).send({
                message:"Email doesn't exist"
            })
        }
        const comparepass=bcryptjs.compareSync(password,user.password||"");
        if(!comparepass){
            return res.status(500).send({
                message:"Email doesn't exist"
            })
        }
        jwtToken(user._id,res);
        res.status(200).send({
            _id:user._id,
            fullname:user.fullname,
            username:user.username,
            profilepic:user.profilepic,
            email:user.email,
            message:"Succesfully login"
           })
    }catch(error){
        res.status(500).send({
            success:false,
            message:error.message
        });
        console.log(error);
    }
}
export const userlogout=(req,res)=>{
    try {
        res.cookie("jwt","",{
            maxAge:0
        })
        res.status(200).send({
            message:"Succesfully Logout"
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:error.message
        });
        console.log(error);
    }
}