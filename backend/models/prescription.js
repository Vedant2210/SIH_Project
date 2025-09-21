const mongoose = require("mongoose");

const PrescriptionSchema = new mongoose.Schema({
  animalId: { type: String, required: true },
  prescribedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // veterinarian
  drugName: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: String,
  reason: String, // disease or prevention
  startDate: { type: Date, required: true },
  endDate: Date,
  withdrawalPeriod: Number, // days before products (milk/meat/eggs) can be sold
}, { timestamps: true });

const Prescription = mongoose.model("Prescription", PrescriptionSchema);
module.exports = Prescription;
