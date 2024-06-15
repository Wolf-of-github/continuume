import express from 'express';
import { createForm, deleteForm  } from '../controllers/form.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.post('/create/:id', verifyToken, createForm);
router.delete('/delete/:id', verifyToken, deleteForm);

export default router;
