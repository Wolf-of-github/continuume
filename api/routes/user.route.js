import express from 'express';
import {  deleteUser, test, updateUser } from '../controllers/user.controller.js';
// import { createInitialAdmin } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)

// Route to create initial admin user (accessible only during setup)
// router.post('/setup/admin', createInitialAdmin);

export default router;