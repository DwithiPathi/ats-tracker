const pool = require("../config/db");

const createCompany = async (userId, data) => {
  const { name, website, industry, location } = data;
  const result = await pool.query(
    `INSERT INTO companies (user_id, name, website, industry, location)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [userId, name, website, industry, location]
  );
  return result.rows[0];
};

const getCompaniesByUser = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM companies WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};

const getCompanyById = async (userId, id) => {
  const result = await pool.query(
    `SELECT * FROM companies WHERE id = $1 AND user_id = $2`,
    [id, userId]
  );
  return result.rows[0];
};

const updateCompany = async (userId, id, data) => {
  const { name, website, industry, location } = data;
  const result = await pool.query(
    `UPDATE companies
     SET name = $1, website = $2, industry = $3, location = $4
     WHERE id = $5 AND user_id = $6
     RETURNING *`,
    [name, website, industry, location, id, userId]
  );
  return result.rows[0];
};

const deleteCompany = async (userId, id) => {
  const result = await pool.query(
    `DELETE FROM companies WHERE id = $1 AND user_id = $2 RETURNING *`,
    [id, userId]
  );
  return result.rows[0];
};

module.exports = {
  createCompany,
  getCompaniesByUser,
  getCompanyById,
  updateCompany,
  deleteCompany,
};