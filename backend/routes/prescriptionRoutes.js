const express = require("express");
const { createPrescription } = require("../controllers/prescriptionController");
const authMiddleware = require("../middleware/authMiddleware"); // verify JWT
const router = express.Router();

// Vet creates prescription
router.post("/", authMiddleware, createPrescription);

module.exports = router;
