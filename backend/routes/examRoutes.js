const express = require("express");
const router = express.Router(),
  protector = require("../middlewares/routeProtector");

const { allSubs } = require("../controllers/examControllers");

router.get("/", allSubs);
router.get("/:subject", (req, res) => {
  res.send("Please specify exam years from 2005-2010");
});

// router.get("/:subject/year/:year", allQuestions);

module.exports = router;
/* 

year - return all questions
/year/grade/gr - return all questions from a specific grade
/grade/chapter - return questions from a specific chapter
/math   /year/2010/

*/
