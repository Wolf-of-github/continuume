import express from 'express';
import { createAndUpdateChats, readChats  } from '../controllers/chat.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.post('/create/:id', verifyToken, createAndUpdateChats);
router.get('/read/:id', verifyToken, readChats);

export default router;
