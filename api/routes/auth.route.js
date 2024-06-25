import express from "express";
import { getAllUsers, google, signin, signout, signup } from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
router.post('/signup',signup)
router.post('/signin',signin)
router.post('/google',google)
router.get('/signout', signout)
router.get('/users', verifyToken, getAllUsers);

export default router