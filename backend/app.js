const express = require("express");
const rewardRoutes = require("./routes/rewardRoutes");

const app = express();

// Use the reward routes
app.use("/api/rewards", rewardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  
});
