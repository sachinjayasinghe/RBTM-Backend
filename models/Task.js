import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Task title is required"]
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ['Todo', 'In Progress', 'Done'],
    default: 'Todo'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId, // ObjectId is the unique id which given by mongodb for every document. it's field name is _id.
    ref: 'User', // References User model
    required: [true, "Task must be assigned to a user"]
  }
}, { timestamps: true });

// Export the model
export default mongoose.model('Task', taskSchema);
