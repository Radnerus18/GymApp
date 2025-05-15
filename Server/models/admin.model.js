const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  role: {
    type: String,
    default: 'client',
    enum: ['client', 'trainer', 'admin'] // Optional: restrict roles
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    
    trim: true,
    lowercase: true
  },
  phoneNumber: {
    type: Number,
    required: [true, 'Phone Number is required'],
    
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  joiningDate:{
    type:String
  },
  adminId: {
    type: String,
    
  },
}, {
  timestamps: true // Adds createdAt and updatedAt
});

module.exports = mongoose.model('Admin', adminSchema);
