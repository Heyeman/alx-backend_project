const asyncHandler = require("express-async-handler"),
  bcrypt = require("bcrypt"),
  { ObjectId } = require("mongoose").Types,
  { genJwt, genKey } = require("../helpers/tokenGen"),
  { User } = require("../models/userModel"),
  { apiModel } = require("../models/apiKeyModel");

const changeKey = asyncHandler(async (req, res) => {
  const newApiKey = await genKey();
  try {
    const currKey = await apiModel.findOneAndUpdate(
      { owner: ObjectId(req.user._id) },
      { apiKey: newApiKey }
    );
    res.status(201).json({
      newApiKey,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const upgradeKey = asyncHandler(async (req, res) => {
  try {
    const currKey = await apiModel.findOneAndUpdate(
      { owner: ObjectId(req.user._id) },
      { type: "pro" }
    );
    res.status(201).json({
      apiKey: currKey.apiKey,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
module.exports = { changeKey, upgradeKey };
