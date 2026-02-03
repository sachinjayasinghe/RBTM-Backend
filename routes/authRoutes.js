// server/routes/authRoutes.js
import express from 'express';
import { createUser, loginUser, getUser, getAllUsers, deleteUser } from '../controllers/authcontroller.js';
import { protect } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Public routes 
router.post('/register', createUser); //when user in /api/auth/register, createUser function will be called
router.post('/login', loginUser); //when user in /api/auth/login, loginUser function will be called

// Protected route
router.get('/me', protect, getUser); //when user in /api/auth/me, protect middleware will be called and then getUser function will be called
// Admin only route - Get all users
router.get('/users', protect, isAdmin, getAllUsers);
router.delete('/users/:id', protect, isAdmin, deleteUser);


export default router;
