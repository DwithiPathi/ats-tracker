require("dotenv").config();
const express = require("express");
const healthRoutes = require("./routes/healthRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Any request starting with /health is handled by healthRoutes
app.use("/health", healthRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});