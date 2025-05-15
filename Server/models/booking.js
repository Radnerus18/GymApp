const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },   // client
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" }, // class they booked
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  // owner of the class
  bookingTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", BookingSchema);
