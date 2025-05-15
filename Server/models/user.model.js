const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
  clientId: {
    type: String,
    
  },
  
  // Reference to Membership
  membership: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Membership', // 💡 Use the model name, not the schema
  },
}, {
  timestamps: true // Adds createdAt and updatedAt
});

module.exports = mongoose.model('User', userSchema);
