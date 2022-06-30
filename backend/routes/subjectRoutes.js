const express = require("express");
const {
  allSubs,
  allQuestions,
  questionsByGrade,
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
router.get("/:year", allQuestions);
router.get("/:year/:grade", questionsByGrade);
module.exports = router;
