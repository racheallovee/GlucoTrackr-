const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const dataRoutes = require("./routes/dataRoutes");
const rewardRoutes = require("./routes/rewardRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/reward", rewardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); // // Import required modules
// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// // Initialize Express app
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(bodyParser.json());

// // Connect to MongoDB (replace <your-db-uri> with your MongoDB URI)
// mongoose.connect("mongodb://localhost:27017/glucotrackr", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });

// // Define User Schema
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const User = mongoose.model("User", userSchema);

// // Define Glucose Data Schema
// const glucoseSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   glucoseLevel: { type: Number, required: true },
//   date: { type: Date, default: Date.now },
// });

// const Glucose = mongoose.model("Glucose", glucoseSchema);

// // User Registration Endpoint
// app.post("/api/register", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ username, password: hashedPassword });
//     await user.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error registering user" });
//   }
// });

// // User Login Endpoint
// app.post("/api/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }
//     const token = jwt.sign({ userId: user._id }, "your-secret-key", {
//       expiresIn: "1h",
//     });
//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).json({ error: "Error logging in" });
//   }
// });

// // Middleware to authenticate JWT
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ error: "Access denied" });
//   }
//   jwt.verify(token, "your-secret-key", (err, user) => {
//     if (err) {
//       return res.status(403).json({ error: "Invalid token" });
//     }
//     req.user = user;
//     next();
//   });
// };

// // Submit Glucose Data Endpoint
// app.post("/api/glucose", authenticateToken, async (req, res) => {
//   try {
//     const { glucoseLevel } = req.body;
//     const glucoseData = new Glucose({ userId: req.user.userId, glucoseLevel });
//     await glucoseData.save();
//     res.status(201).json({ message: "Glucose data submitted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error submitting glucose data" });
//   }
// });

// // Retrieve Glucose Data Endpoint
// app.get("/api/glucose", authenticateToken, async (req, res) => {
//   try {
//     const glucoseData = await Glucose.find({ userId: req.user.userId }).sort({
//       date: -1,
//     });
//     res.status(200).json(glucoseData);
//   } catch (error) {
//     res.status(500).json({ error: "Error retrieving glucose data" });
//   }
// });

// // Start the server
