const pool= require("../config/db"); // opens door to file 5
const createContact= async (userId, data) => {
  const result = await pool.query(
    `INSERT INTO contacts (user_id, company_id, name, role, email)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [userId, data.company_id, data.name, data.role, data.email]
  );
  return result.rows[0];
};

const getContactsByUser= async (userId) => {
  const result = await pool.query(
    `SELECT * FROM contacts WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};

const getContactById= async (userId, id) => {
  const result = await pool.query(
    `SELECT * FROM contacts WHERE id = $1 AND user_id = $2`,
    [id, userId]
  );
  return result.rows[0];
};

const updateContact= async (userId, id, data) => {
  const result = await pool.query(
    `UPDATE contacts SET name = $1, email = $2, role = $3 WHERE id = $4 AND user_id = $5 RETURNING *`,
    [data.name, data.email, data.role, id, userId]
  );
  return result.rows[0];
};

const deleteContact= async (userId, id) => {
  const result = await pool.query(
    `DELETE FROM contacts WHERE id = $1 AND user_id = $2 RETURNING *`,
    [id, userId]
  );
  return result.rows[0];
};

module.exports = {createContact, getContactsByUser, getContactById, updateContact, deleteContact}; // door out