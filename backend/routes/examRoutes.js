const express = require("express");
const router = express.Router(),
  protector = require("../middlewares/routeProtector");

const { allSubs } = require("../controllers/examControllers");

router.get("/", allSubs);
router.use(
  "/:subject",
  (req, res, next) => {
    let sub = req.params.subject.toLowerCase();
    if (!["physics", "chemistry", "biology"].includes(sub)) {
      res.status(400).send("subject not found");
    } else {
      req.subject = sub[0].toUpperCase() + sub.slice(1);
      next();
    }
  },
  require("./subjectRoutes")
);

// router.get("/:subject/year/:year", allQuestions);

module.exports = router;
/* 

year - return all questions  - done
left with others endpoints to deliver questions from a specific grade and specific chapter of the exam database
/year/grade/gr - return all questions from a specific grade
/grade/chapter - return questions from a specific chapter
/math   /year/2010/

*/
