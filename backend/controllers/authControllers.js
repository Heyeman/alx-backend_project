const asyncHandler = require("express-async-handler");
const loginController = asyncHandler(async (req, res) => {
  res.send("login");
});
const signupController = asyncHandler(async (req, res) => {
  res.send("register");
});

module.exports = { loginController, signupController };
