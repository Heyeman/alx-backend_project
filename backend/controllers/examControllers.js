const asyncHandler = require("express-async-handler"),
  { prisma } = require("../config/dbConn");
const allSubs = (req, res) => {
  res.json({
    subjects: ["Physics", "chemistry", "biology"],
  });
};

module.exports = { allSubs };
