const pool = require("../config/db");

const createApplication = async (userId, data) => {
  const { company_id, role, status, source, salary, applied_date } = data;
  const result = await pool.query(
    `INSERT INTO applications
       (user_id, company_id, role, status, source, salary, applied_date)
     VALUES ($1, $2, $3, COALESCE($4, 'Applied'), $5, $6, $7)
     RETURNING *`,
    [userId, company_id, role, status, source, salary, applied_date]
  );
  return result.rows[0];
};

const getApplicationsByUser = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM applications WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};

const getApplicationById = async (userId, id) => {
  const result = await pool.query(
    `SELECT * FROM applications WHERE id = $1 AND user_id = $2`,
    [id, userId]
  );
  return result.rows[0];
};

const updateApplication = async (userId, id, data) => {
  const { company_id, role, status, source, salary, applied_date } = data;
  const result = await pool.query(
    `UPDATE applications
     SET company_id = $1, role = $2, status = $3, source = $4,
         salary = $5, applied_date = $6, updated_at = current_timestamp
     WHERE id = $7 AND user_id = $8
     RETURNING *`,
    [company_id, role, status, source, salary, applied_date, id, userId]
  );
  return result.rows[0];
};

const deleteApplication = async (userId, id) => {
  const result = await pool.query(
    `DELETE FROM applications WHERE id = $1 AND user_id = $2 RETURNING *`,
    [id, userId]
  );
  return result.rows[0];
};

module.exports = {
  createApplication,
  getApplicationsByUser,
  getApplicationById,
  updateApplication,
  deleteApplication,
};