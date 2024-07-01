import express from 'express';
import { createEvent, deleteEvent, readEvent, updateEvent } from '../controllers/events.controller.js'; 
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.post('/create', verifyToken, createEvent);
router.put('/update/:id', verifyToken, updateEvent);
router.get('/read/', verifyToken, readEvent);
router.delete('/delete/:id', verifyToken, deleteEvent);

export default router;
