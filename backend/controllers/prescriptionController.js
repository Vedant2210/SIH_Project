const Prescription = require("../models/Prescription");

// Create Prescription
const createPrescription = async (req, res) => {
  try {
    const { animalId, drugName, dosage, frequency, reason, startDate, endDate, withdrawalPeriod } = req.body;

    // Prescribed by vet: get from logged-in user
    const prescribedBy = req.user.id; // assuming you have auth middleware

    const prescription = new Prescription({
      animalId,
      drugName,
      dosage,
      frequency,
      reason,
      startDate,
      endDate,
      withdrawalPeriod,
      prescribedBy,
    });

    await prescription.save();

    res.status(201).json({ message: "Prescription created successfully", prescription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createPrescription };
