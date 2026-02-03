// server/routes/taskRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { isAdmin, isUser } from '../middleware/roleMiddleware.js';
import { createTask, getTasks, updateTaskStatus, deleteTask, updateTask} from '../controllers/taskController.js';

const router = express.Router();

// ----------------------
// Admin-only routes
// ----------------------
router.post('/', protect, isAdmin, createTask);       // Create a new task
router.delete('/:id', protect, isAdmin, deleteTask); // Delete a task
router.put('/:id', protect, isAdmin, updateTask); // Update a task
// ----------------------
// Admin & User routes
// ----------------------
router.get('/', protect, getTasks);                  // Get all tasks (admin) or assigned tasks (user)

// ----------------------
// User-only routes
// ----------------------
router.patch('/:id', protect, isUser, updateTaskStatus); // Update task status

export default router;
