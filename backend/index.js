require("dotenv").config();
const express = require("express");
const healthRoutes = require("./routes/healthRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

// Test the database connection on startup
pool.query("SELECT NOW()")
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ DB connection error:", err.message));

app.use(express.json());
// ...
app.use("/auth", authRoutes);
// Any request starting with /health is handled by healthRoutes
app.use("/health", healthRoutes);

// ...
app.use("/applications", applicationRoutes);

// ...
app.use("/companies", companyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});