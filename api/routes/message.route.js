import express from 'express';
import { createMessage, readMessages } from '../controllers/message.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const   router = express.Router();

router.post('/create', verifyToken, createMessage);
// router.put('/update/:id', verifyToken, updateForm);
// router.delete('/delete/:id', verifyToken, deleteForm);
router.get('/read/', verifyToken, readMessages);

export default router;
