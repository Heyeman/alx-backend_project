const express = require("express");
const router = express.Router(),
  protector = require("../middlewares/routeProtector");

const {
  loginController,
  signupController,
  getMe,
} = require("../controllers/authControllers");

router.get("/me", protector, getMe);
router.post("/login", loginController);
router.post("/register", signupController);

module.exports = router;
