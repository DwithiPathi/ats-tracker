const db = require("../config/db");
const createNote = async (userId, applicationId, type, body) => {
  const note = await db.query(
    "INSERT INTO notes (user_id, application_id, type, body) VALUES ($1, $2, $3, $4) RETURNING *",
    [userId, applicationId, type, body]
  );
  return note.rows[0];
};

const getNotesByUser = async (userId) => {
  const notes = await db.query("SELECT * FROM notes WHERE user_id = $1", [userId]);
  return notes.rows;
};

const getNoteById = async (userId, noteId) => {
  const note = await db.query("SELECT * FROM notes WHERE id = $1 AND user_id = $2", [noteId, userId]);
  return note.rows[0];
};

const updateNote = async (userId, noteId, type, body) => {
  const note = await db.query(
    "UPDATE notes SET type = $3, body = $4 WHERE id = $1 AND user_id = $2 RETURNING *",
    [noteId, userId, type, body]
  );
  return note.rows[0];
};

const deleteNote = async (userId, noteId) => {
  const note = await db.query("DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *", [noteId, userId]);
  return note.rows[0];
};

const getNotesByApplication = async (userId, applicationId) => {
  const notes = await db.query(
    "SELECT * FROM notes WHERE application_id = $1 AND user_id = $2 ORDER BY created_at ASC",
    [applicationId, userId]
  );
  return notes.rows;
};

module.exports = {
  createNote,
  getNotesByApplication,
  getNotesByUser,
  getNoteById,
  updateNote,
  deleteNote
};