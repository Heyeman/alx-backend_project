const asyncHandler = require("express-async-handler"),
  jwt = require("jsonwebtoken"),
  { User } = require("../models/userModel");
module.exports = asyncHandler(async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (authToken && authToken.startsWith("Bearer")) {
    const token = authToken.split(" ")[1];
    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET),
        user = await User.findById(decode.id).select("-password");
      if (!user) {
        res.status(401);
        throw new Error("Unauthorized: no user found");
      } else {
        req.user = user;
        next();
      }
    } catch (error) {
      res.status(401);
      throw new Error("Unauthorized: invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized: no token");
  }
});
