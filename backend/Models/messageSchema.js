import mongoose from "mongoose"
import conversationModel from "./conversationModel.js"

const messageSchema=mongoose.Schema({
    sendersId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    },
    conversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Conversation",
        required:true
    },
},{timestamps:true})

const Message=mongoose.model("Message",messageSchema);

export default Message;