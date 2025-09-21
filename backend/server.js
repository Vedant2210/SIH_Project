const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const connectDB = require('./config/db'); // Import DB connection
const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

const authRoutes = require("./routes/authRoutes");
const animalRoutes = require("./routes/animalRoutes");
app.use("/api/auth", authRoutes);


app.use("/api/animals", animalRoutes);
// Routes
//app.use('/api/auth', require('./routes/auth'));

// Connect to DB and start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
