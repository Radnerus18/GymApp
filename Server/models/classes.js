const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  title: String,
  time: String,
  trainer: String,
//   adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Admin who created this class
});

module.exports = mongoose.model("Class", ClassSchema);
