const asyncHandler = require("express-async-handler");
module.exports = asyncHandler(async (req, res, next) => {
  let apiKey = req.headers["APi"];
});
