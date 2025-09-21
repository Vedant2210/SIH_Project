const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");


// ✅ Farmer Signup
const farmerSignup = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // ✅ Only allow farmer role here
    if (role !== "farmer") {
      return res.status(403).json({ message: "Only farmers can signup here." });
    }

    // check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "farmer",
    });

    await newUser.save();

    res.status(201).json({ message: "Farmer signup successful!" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};





const farmerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // check role
    if (user.role !== "farmer") {
      return res.status(403).json({ message: "Access denied: Only farmers can login here" });
    }

    // verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // send cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({
      message: "Farmer login successful",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// module.exports = { farmerLogin };
module.exports = { farmerSignup, farmerLogin  };
