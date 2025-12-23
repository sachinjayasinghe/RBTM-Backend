import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import taskRoutes from './routes/taskRoutes.js';

dotenv.config()

const app = express() 

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to database"))
  .catch(() => console.log("Failed to connect database"))

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(5001, () => {
  console.log("Server started on port 5001")
})
