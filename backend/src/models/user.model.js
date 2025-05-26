import mongoose from "mongoose";

// Define the user schema

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['User', 'Verifier', 'Admin'],
    default: 'User',
  },
  profilePic: {
    type: String,
    default: "",
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;