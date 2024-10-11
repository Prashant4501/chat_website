import express from "express"
import isLogin from "../middleware/isLogin.js";
import { getcurrentChatters, getUserBySearch } from "../routcontroller/userhandleController.js";

const router=express.Router();
router.get('/search',isLogin,getUserBySearch);
router.get('/currentchatters',isLogin,getcurrentChatters)

export default router;