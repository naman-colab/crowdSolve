
import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js'
import { createProblem,getAllProblems } from '../controllers/problemController.js';
const router = express.Router();
console.log("data3");
// router.post
router.post('/createProblem', createProblem);
router.get('/problems', getAllProblems);
router.use('/auth', authRoutes);
router.use('/user',userRoutes)
export default router;
