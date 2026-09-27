const {
  createApplication,
  getApplicationsByUser,
  getApplicationById,
  updateApplication,
  deleteApplication,
} = require("../models/applicationModel");

const ALLOWED_STATUS = ["Applied", "Interviewing", "Offer", "Rejected", "Withdrawn"];

const create = async (req, res) => {
  try {
    const { company_id, role, status } = req.body;
    if (!company_id || !role) {
      return res.status(400).json({ error: "company_id and role are required" });
    }
    if (status && !ALLOWED_STATUS.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }
    const application = await createApplication(req.user.userId, req.body);
    res.status(201).json({ application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const list = async (req, res) => {
  try {
    const applications = await getApplicationsByUser(req.user.userId);
    res.json({ applications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getOne = async (req, res) => {
  try {
    const application = await getApplicationById(req.user.userId, req.params.id);
    if (!application) return res.status(404).json({ error: "Application not found" });
    res.json({ application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const update = async (req, res) => {
  try {
    if (req.body.status && !ALLOWED_STATUS.includes(req.body.status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }
    const application = await updateApplication(req.user.userId, req.params.id, req.body);
    if (!application) return res.status(404).json({ error: "Application not found" });
    res.json({ application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const remove = async (req, res) => {
  try {
    const application = await deleteApplication(req.user.userId, req.params.id);
    if (!application) return res.status(404).json({ error: "Application not found" });
    res.json({ message: "Application deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { create, list, getOne, update, remove };