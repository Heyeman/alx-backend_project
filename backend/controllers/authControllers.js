const asyncHandler = require("express-async-handler");
const loginController = asyncHandler(async (req, res) => {
  res.send("login");
});
const signupController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Name is empty");
  }
  if (!email) {
    res.status(400);
    throw new Error("Email is empty");
  }
  if (!password) {
    res.status(400);
    throw new Error("Password is empty");
  }
});

module.exports = { loginController, signupController };
