const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { all, add, remove, edit, products } = require("../controllers/products");

router.get("/", all);
router.get("/:id", auth, products);
router.post("/add", auth, add);
router.delete("/remove/:id", auth, remove);
router.put("/edit/:id", auth, edit);

module.exports = router;
