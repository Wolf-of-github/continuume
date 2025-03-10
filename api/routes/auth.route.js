import express from "express";
import { forgotPassword, getAllUsers, google, resetPassword, signin, signout, signup, verify } from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
router.post('/signup',signup)
router.post('/signin',signin)
router.post('/google',google)
router.get('/signout', signout)
router.get('/users', verifyToken, getAllUsers);
router.get('/verify', verify);
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword);


export default router