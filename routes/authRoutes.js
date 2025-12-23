// server/routes/authRoutes.js
import express from 'express';
import { createUser, loginUser, getUser } from '../controllers/authcontroller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes 
router.post('/register', createUser); //when user in /api/auth/register, createUser function will be called
router.post('/login', loginUser); //when user in /api/auth/login, loginUser function will be called

// Protected route
router.get('/me', protect, getUser); //when user in /api/auth/me, protect middleware will be called and then getUser function will be called


export default router;
