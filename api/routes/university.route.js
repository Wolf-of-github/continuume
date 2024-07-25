import express from 'express';
import { searchUniversities, addUniversities } from '../controllers/university.controller.js';

const router = express.Router();

// Route to search universities
router.get('/search', searchUniversities);
router.post('/add', addUniversities);

export default router;
