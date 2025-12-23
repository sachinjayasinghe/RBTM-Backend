import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,       // email validation
      "Please fill a valid email address"
    ]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"]
  },
  role: {
    type: String,
    enum: ['admin', 'user'],    // Only these 2 choices allowed
    default: 'user'
  }
}, { timestamps: true });

// Export the model
export default mongoose.model('User', userSchema); // User is the model name, users is the collection name which automatically created by mongoose


/*  timestamps: true automatically adds two date fields to every document: 

createdAt — when the document was created
updatedAt — when the document was last updated

No automatic creation date
You can't tell when a user registered
Hard to answer: "How many users joined this month?"
No automatic update tracking
You can't tell when a user's data was last changed
Hard to debug: "When did this user change their email?"


*/