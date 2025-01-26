const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Importing routes
const userRoutes = require("./routes/userRoutes");
const healthDataRoutes = require("./routes/healthDataRoutes");
const rewardsRoutes = require("./routes/rewardsRoutes");
const permissionsRoutes = require("./routes/permissionsRoutes");

// Initialize express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Registering routes
app.use("/api/users", userRoutes);
app.use("/api/health-data", healthDataRoutes);
app.use("/api/rewards", rewardsRoutes);
app.use("/api/permissions", permissionsRoutes);

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
