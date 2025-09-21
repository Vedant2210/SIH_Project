const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token; // JWT from HTTP-only cookie
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user info to request
    const user = await User.findById(decoded.id).select("-password"); // exclude password
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
