const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer xxx" -> "xxx"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info for downstream handlers
    next(); // token valid -> continue to the route
  } catch (err) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }
};

module.exports = requireAuth;