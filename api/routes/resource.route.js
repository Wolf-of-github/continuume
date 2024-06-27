import express from 'express';
import { readResource, uploadResource, deleteResource, updateResource, downloadResource  } from '../controllers/resource.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.post('/upload', verifyToken, uploadResource);
router.get('/read', verifyToken, readResource);
router.delete('/delete/:id', verifyToken, deleteResource);
router.put('/update/:id', verifyToken, updateResource);
router.get('/download/:resourceId', verifyToken, downloadResource)

export default router;
