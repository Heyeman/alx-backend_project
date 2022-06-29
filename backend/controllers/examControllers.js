const asyncHandler = require("express-async-handler");

const allSubs = (req, res) => {
  res.json({
    subjects: ["Physics", "chemistry", "biology"],
  });
};

module.exports = { allSubs };
