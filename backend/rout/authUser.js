import express from 'express';
import { userLogin, userlogout, userRegister } from '../routcontroller/userroutcontroller.js';
const router=express.Router();
router.post('/register',userRegister);

router.post('/login',userLogin);
router.post('/logout',userlogout);
export default router;
