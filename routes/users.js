const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { login, current } = require("../controllers/users");

router.post("/login", login);
router.get("/current", auth, current);

module.exports = router;
