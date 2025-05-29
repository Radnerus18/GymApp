const Trainer = require('../models/trainer.model'); // Adjust path as needed

// Add a new trainer
exports.addTrainer = async (req, res) => {
    try {
        const trainer = new Trainer(req.body);
        await trainer.save();
        res.status(201).json({ message: 'Trainer added successfully', trainer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Trainer login
exports.trainerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const trainer = await Trainer.findOne({ email });
        if (!trainer || !(await trainer.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Generate token logic here (e.g., JWT)
        res.json({ message: 'Login successful', trainer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all trainers
exports.getAllTrainer = async (req, res) => {
    try {
        const trainers = await Trainer.find();
        res.json(trainers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get trainer by ID
exports.getTrainerById = async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.id);
        if (!trainer) {
            return res.status(404).json({ error: 'Trainer not found' });
        }
        res.json(trainer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update trainer
exports.updateTrainer = async (req, res) => {
    try {
        const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!trainer) {
            return res.status(404).json({ error: 'Trainer not found' });
        }
        res.json({ message: 'Trainer updated', trainer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete trainer
exports.deleteTrainer = async (req, res) => {
    try {
        const trainer = await Trainer.findByIdAndDelete(req.params.id);
        if (!trainer) {
            return res.status(404).json({ error: 'Trainer not found' });
        }
        res.json({ message: 'Trainer deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};