const Glucose = require("../models/Glucose");

exports.submitGlucoseData = async (req, res) => {
  try {
    const { glucoseLevel } = req.body;
    const glucoseData = new Glucose({ userId: req.user.userId, glucoseLevel });
    await glucoseData.save();
    res.status(201).json({ message: "Glucose data submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error submitting glucose data" });
  }
};

exports.getGlucoseData = async (req, res) => {
  try {
    const glucoseData = await Glucose.find({ userId: req.user.userId }).sort({
      date: -1,
    });
    res.status(200).json(glucoseData);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving glucose data" });
  }
};
