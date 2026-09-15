// Handles the logic for health-related requests
const getHealth = (req, res) => {
  res.json({ status: "ok" });
};

module.exports = { getHealth };