const { createNote, getNotesByApplication } = require("../models/noteModel");

const create = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id: applicationId } = req.params;
    const { type, body } = req.body;
    const note = await createNote(userId, applicationId, type, body);
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listByApplication = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id: applicationId } = req.params;
    const notes = await getNotesByApplication(userId, applicationId);
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { create, listByApplication };