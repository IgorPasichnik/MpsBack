const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  all,
  add,
  remove,
  edit,
  productions,
} = require("../controllers/productions");

router.get("/", all);
router.get("/:id", auth, productions);
router.post("/add", auth, add);
router.delete("/remove/:id", auth, remove);
router.put("/edit/:id", auth, edit);

module.exports = router;
