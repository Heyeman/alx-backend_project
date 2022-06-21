const express = require("express");
const router = express.Router();

const {
  loginController,
  signupController,
} = require("../controllers/authControllers");

router.post("/login", loginController);
router.post("/register", signupController);

module.exports = router;
