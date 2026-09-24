const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  create,
  list,
  getOne,
  update,
  remove,
} = require("../controllers/companyController");

router.use(requireAuth); // ALL company routes require a valid token

router.post("/", create);       // POST   /companies
router.get("/", list);          // GET    /companies
router.get("/:id", getOne);     // GET    /companies/:id
router.put("/:id", update);     // PUT    /companies/:id
router.delete("/:id", remove);  // DELETE /companies/:id

module.exports = router;