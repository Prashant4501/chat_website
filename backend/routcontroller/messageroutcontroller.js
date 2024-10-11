import Conversation from "../Models/conversationModel.js"
import Message from "../Models/messageschema.js";
export const sendMessage=async(req,res)=>{
    try {
       const {message: messageText}=req.body;
       const {id:receiverId}=req.params;
       const sendersId=req.user._conditions._id;
       let chats=await Conversation.findOne({
        participants:{$all:[sendersId,receiverId]}
       })
       if(!chats){
        chats=await Conversation.create({
            participants:[sendersId,receiverId],
        
        });
       }

       const newMessage=new Message({
        sendersId,
        receiverId,
        message:messageText,
        conversationId:chats._id
       })

       if (!chats.messages) {
        chats.messages = []; // Initialize as an empty array if it doesn't exist
    }

    if (newMessage) {
        chats.messages.push(newMessage._id); // Use the correct field name
    }
       //SOCKET IO FUNCTION\
       await Promise.all([chats.save(),newMessage.save()]);
       res.status(201).send(newMessage);
    } catch (error) {
        res.status(500).send({
            success:false,
            message:error.message
        });
        console.log(error);
        }
}
export const getMessage=async(req,res)=>{
    try {
        const {id:receiverId}=req.params;
        const sendersId=req.user._conditions._id;

        const chats=await Conversation.findOne({
            participants:{$all:[sendersId,receiverId]}
        }).populate("messages")

        if(!chats){
            return res.status(200).send([]);
        }
        const message=chats.messages;
        res.status(200).send(message)
    } catch (error) {
        res.status(500).send({
            success:false,
            message:error.message
        });
        console.log(error);
    }
}