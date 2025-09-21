const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema(
  {
    tagId: {
      type: String,
      required: true,
      unique: true, // ensure no duplicate animal IDs
    },
    species: {
      type: String,
      required: true, // cow, buffalo, goat, poultry, etc.
    },
    age: {
      type: Number,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // link to farmer
      required: true,
    },
    treatments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Treatment", // can be Prescription or Treatment model
      },
    ],
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

// Create model
const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;
