const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  title: String,
  time: String,
  day:String,
  trainer: String,
  type:String,
  classType:String,
  adminId: String, // Admin who created this class
},{timestamps:true});

module.exports = mongoose.model("Class", ClassSchema);
