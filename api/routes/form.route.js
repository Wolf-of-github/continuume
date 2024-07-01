import express from 'express';
import { createForm, deleteForm, readForm, updateForm  } from '../controllers/form.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const   router = express.Router();

router.post('/create/:id', verifyToken, createForm);
router.delete('/delete/:id', verifyToken, deleteForm);
router.put('/update/:id', verifyToken, updateForm);
router.get('/read/:id', verifyToken, readForm);

export default router;
