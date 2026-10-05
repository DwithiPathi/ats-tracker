const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const { create, list, getOne, update, remove } = require("../controllers/contactController");

router.use(requireAuth);

router.route("/").post(create).get(list);
router.route("/:id").get(getOne).put(update).delete(remove);

module.exports = router;