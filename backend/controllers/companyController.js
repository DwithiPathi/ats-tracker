const {
  createCompany,
  getCompaniesByUser,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require("../models/companyModel");

const create = async (req, res) => {
  try {
    if (!req.body.name) return res.status(400).json({ error: "name is required" });
    const company = await createCompany(req.user.userId, req.body);
    res.status(201).json({ company });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const list = async (req, res) => {
  try {
    const companies = await getCompaniesByUser(req.user.userId);
    res.json({ companies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getOne = async (req, res) => {
  try {
    const company = await getCompanyById(req.user.userId, req.params.id);
    if (!company) return res.status(404).json({ error: "Company not found" });
    res.json({ company });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const update = async (req, res) => {
  try {
    const company = await updateCompany(req.user.userId, req.params.id, req.body);
    if (!company) return res.status(404).json({ error: "Company not found" });
    res.json({ company });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const remove = async (req, res) => {
  try {
    const company = await deleteCompany(req.user.userId, req.params.id);
    if (!company) return res.status(404).json({ error: "Company not found" });
    res.json({ message: "Company deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { create, list, getOne, update, remove };