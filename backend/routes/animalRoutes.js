const express = require("express");
const router = express.Router();
const { registerAnimal } = require("../controllers/animalController");

// POST /api/animals/register
router.post("/register", registerAnimal);

module.exports = router;
