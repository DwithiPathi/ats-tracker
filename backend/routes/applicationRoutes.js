const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const { create: createNote, listByApplication } = require("../controllers/noteController");
const {
  create,
  list,
  getOne,
  update,
  remove,
} = require("../controllers/applicationController");

router.use(requireAuth);
router.post("/", create);
router.get("/", list);
router.get("/:id", getOne);
router.put("/:id", update);
router.delete("/:id", remove);
router.post("/:id/notes", createNote);           // POST /applications/:id/notes
router.get("/:id/notes", listByApplication);     // GET  /applications/:id/notes 

module.exports = router;