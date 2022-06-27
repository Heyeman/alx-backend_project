const asyncHandler = require("express-async-handler"),
  bcrypt = require("bcrypt"),
  { genJwt, genKey } = require("../helpers/tokenGen"),
  { User } = require("../models/userModel"),
  { apiModel } = require("../models/apiKeyModel");

const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  let errorString = "";
  if (!email) {
    errorString += "Email is empty. ";
  }
  if (!password) {
    errorString += "Password is empty. ";
  }
  if (errorString) {
    res.status(400);
    throw new Error(errorString);
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    res.status(400);
    throw new Error("User does not exist");
  } else if (
    existingUser &&
    !(await bcrypt.compare(password, existingUser.password))
  ) {
    res.status(401);
    throw new Error("Invalid credentials");
  } else {
    const accessToken = await genJwt(existingUser._id.toString());

    res.status(200).json({
      id: existingUser._id.toString(),
      name: existingUser.name,
      email: existingUser.email,
      accessToken,
    });
  }
});
const signupController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  let errorString = "";
  if (!name) {
    errorString += "Name is empty. ";
  }
  if (!email) {
    errorString += "Email is empty. ";
  }
  if (!password) {
    errorString += "Password is empty. ";
  }
  if (errorString) {
    res.status(400);
    throw new Error(errorString);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User with this email already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const passHash = await bcrypt.hash(password, salt);
  try {
    const newUser = await User.create({
        name,
        email,
        password: passHash,
      }),
      apiKey = await genKey(),
      userAPI = await apiModel.create({
        owner: newUser._id,
        apiKey,
      }),
      accessToken = await genJwt(newUser._id.toString());
    res.status(201).json({
      id: newUser._id.toString(),
      name,
      email,
      key: userAPI.apiKey,
      accessToken,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

const getMe = asyncHandler(async (req, res) => {
  let user = req.user;
  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
});

module.exports = { loginController, signupController, getMe };
