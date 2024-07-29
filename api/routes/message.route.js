import express from 'express';
import { createMessage, getUsersForMessages, readMessages } from '../controllers/message.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const   router = express.Router();

router.post('/create', verifyToken, createMessage);
// router.put('/update/:id', verifyToken, updateForm);
// router.delete('/delete/:id', verifyToken, deleteForm);
router.post('/read', verifyToken, readMessages);
router.get('/userlist', verifyToken, getUsersForMessages);

export default router;
