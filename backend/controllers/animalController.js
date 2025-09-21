const Animal = require("../models/Animal");

// Register a new animal
const registerAnimal = async (req, res) => {
  try {
    const { tagId, species, age, userId } = req.body;

    // Check if tagId already exists
    const existingAnimal = await Animal.findOne({ tagId });
    if (existingAnimal) {
      return res.status(400).json({ message: "Animal tag ID already exists" });
    }

    const newAnimal = new Animal({
      tagId,
      species,
      age,
      userId,
    });

    await newAnimal.save();

    res.status(201).json({ message: "Animal registered successfully", animal: newAnimal });
  } catch (err) {
    console.error("Register Animal Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerAnimal };
