const pool = require("../config/db"); // match your folder name

// Insert a new user, returning safe fields (never the password hash)
const createUser = async (name, email, passwordHash) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, created_at`,
    [name, email, passwordHash]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0]; // undefined if not found
};

module.exports = { createUser, findUserByEmail };