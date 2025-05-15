const Booking = require('../models/booking');
const Class = require('../models/classes');


const CreateClass = async(req,res)=>{
  console.log('@@@',req.body)
  try {
    const { title, time, trainer, day, type } = req.body;

    const newClass = await Class.create({ title, time, trainer, day, type });

    res.status(201).json({ message: 'Class created successfully', class: newClass });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create class', details: error.message });
  }
}

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
  bookClass
};