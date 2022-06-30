const express = require("express");
const {
  allSubs,
  getAllQuestions,
  getQuestionsByGrade,
  getQuestionsByChapter,
  checkAnswers,
} = require("../controllers/examControllers");
const router = express.Router(),
  protector = require("../middlewares/routeProtector");

router.get("/", (req, res) => {
  res.send("Please specify exam years from 2005-2010" + req.subject);
});
router.use("/:year", (req, res, next) => {
  if (!(2004 < parseInt(req.params.year) && parseInt(req.params.year) < 2011)) {
    res.status(400);
    throw new Error("Year should be between 2005-2010");
  } else {
    req.year = req.params.year;
    next();
  }
});
router.get("/:year", getAllQuestions);
router.post("/:year", checkAnswers);
router.use("/:year/:grade", (req, res, next) => {
  let grade = req.params.grade;
  if (!(grade == 12 || grade == 11)) {
    res.status(400);
    throw new Error("Invalid grade. Grade should be 11 or 12.");
  } else {
    req.grade = grade;
    next();
  }
});
router.get("/:year/:grade", getQuestionsByGrade);
router.post("/:year/:grade", checkAnswers);
router.get("/:year/:grade/:chapter", getQuestionsByChapter);
router.post("/:year/:grade/:chapter", checkAnswers);
module.exports = router;
