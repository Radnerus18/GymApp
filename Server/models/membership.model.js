const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({

  plan: {
    type: String,
    enum: ['Basic', 'Standard', 'Premium'],
    
  },
  startDate: {
    type: Date,
    
  },
  endDate: {
    type: Date,
    
  },
  membershipStatus: {
    type: String,
    enum: ['Active', 'Expired', 'Paused', 'Cancelled'],
    default: 'Active'
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Due', 'Overdue'],
    default: 'Due'
  },
  paymentMethod: {
    type: String,
    enum: ['Card', 'UPI', 'Cash'],
    
  },
  autoRenew: {
    type: Boolean,
    default: false
  },
  totalAmountPaid: {
    type: Number,
    default: 0
  },
  status:{
    type:String
  }
});

module.exports = mongoose.model('Membership', membershipSchema);
