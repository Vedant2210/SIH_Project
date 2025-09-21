const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["farmer", "vet", "regulator"],
      required: true,
    },
    farm: { type: mongoose.Schema.Types.ObjectId, ref: "Farm" }, // link farmer to farm later
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
