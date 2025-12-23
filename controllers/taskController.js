// server/controllers/taskController.js
import Task from '../models/Task.js';
import { isAdmin } from '../middleware/roleMiddleware.js'; // or you can import from controller if you have a helper

// CREATE TASK
export async function createTask(req, res) {


  // Create new task using request body
  const task = new Task(req.body);

  try {
    // Wait until task is saved to database
    const response = await task.save();
    res.json({
      message: "Task created successfully",
      task: response,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ message: "Failed to create task" });
  }
}


export async function getTasks(req, res) {
    try {
      let tasks;
  
      if (req.user.role === 'admin') {
        // Admin can see all tasks
        tasks = await Task.find().populate('assignedTo', 'name email role');
      } else {
        // User sees only their assigned tasks
        tasks = await Task.find({ assignedTo: req.user.id }).populate('assignedTo', 'name email role');
      }
  
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return res.status(500).json({ message: "Failed to fetch tasks" });
    }
  }

  export async function updateTaskStatus(req, res) {
    try {
      const task = await Task.findById(req.params.id);
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      // Only assigned user can update their task
      if (req.user.role !== 'admin' && task.assignedTo.toString() !== req.user.id) {
        return res.status(403).json({ message: "Access denied. Not your task." });
      }
  
      const { status } = req.body;
      if (!['Todo', 'In Progress', 'Done'].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
  
      task.status = status;
      await task.save();
  
      res.json({
        message: "Task status updated successfully",
        task: task,
      });
    } catch (error) {
      console.error("Error updating task:", error);
      return res.status(500).json({ message: "Failed to update task status" });
    }
  }

  
  export async function deleteTask(req, res) {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
  
    try {
      const task = await Task.findById(req.params.id);
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      await Task.findByIdAndDelete(req.params.id);
  
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error deleting task:", error);
      return res.status(500).json({ message: "Failed to delete task" });
    }
  } 