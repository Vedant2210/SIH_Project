const express = require("express");
const { farmerSignup, farmerLogin } = require("../controllers/authController");

const router = express.Router();

// /auth/signup
router.post("/signup", farmerSignup);


router.post("/login", farmerLogin);

module.exports = router;
