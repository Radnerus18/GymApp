const Booking = require('../models/booking');
const Class = require('../models/classes');


const CreateClass = async(req,res)=>{
  console.log('@@@',req.body)
  try {
    const { title, time, trainer, day, type,classType,adminId } = req.body;

    const newClass = await Class.create({ title, time, trainer, day, type,classType,adminId });

    res.status(201).json({ message: 'Class created successfully', class: newClass });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create class', details: error.message });
  }
}
const getClassesByAdminId = async (req, res) => {
  try {
    const { adminId } = req.query;
    const classes = await Class.find({ adminId });
    res.status(200).send(classes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch classes', details: error.message });
  }
};

const deleteClass = async (req, res) => {
  try {
    const { classId } = req.query;
    const deletedClass = await Class.findOneAndDelete({ _id: classId });
    console.log(deletedClass,classId)
    if (!deletedClass) {
      return res.status(404).json({ error: 'Class not found or unauthorized' });
    }
    res.status(200).json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete class', details: error.message });
  }
};
const updateClass = async (req, res) => {
  try {
    const { classId } = req.query;
    const updateData = req.body;
    console.log(classId,updateData)
    const updatedClass = await Class.findByIdAndUpdate(classId, updateData, { new: true });

    if (!updatedClass) {
      return res.status(404).json({ error: 'Class not found' });
    }

    res.status(200).json({ message: 'Class updated successfully', class: updatedClass });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update class', details: error.message });
  }
};
const bookClass = async (req, res) => {
  const { classId, userId } = req.body;

  const selectedClass = await Class.findById(classId);
  if (!selectedClass) return res.status(404).send("Class not found");

  const booking = await Booking.create({
    userId,
    classId,
    adminId: selectedClass.adminId,
  });

  res.status(201).json({ message: "Class booked", booking });
};
module.exports = {
  CreateClass,
  bookClass,
  getClassesByAdminId,
  deleteClass,
  updateClass
};