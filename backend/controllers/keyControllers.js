const asyncHandler = require("express-async-handler"),
  bcrypt = require("bcrypt"),
  { genJwt, genKey } = require("../helpers/tokenGen"),
  { User } = require("../models/userModel"),
  { apiModel } = require("../models/apiKeyModel");

const changeKey = asyncHandler(async (req, res) => {
  const currKey = await apiModel.findOne({ owner: req.user._id });
  res.send("found");
});
module.exports = { changeKey };
