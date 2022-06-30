const express = require("express");
const router = express.Router(),
  protector = require("../middlewares/routeProtector");

const { allSubs } = require("../controllers/examControllers");

router.get("/", allSubs);
router.use(
  "/:subject",
  (req, res, next) => {
    if (
      !["physics", "chemistry", "biology"].includes(
        req.params.subject.toLowerCase()
      )
    ) {
      res.status(400).send("subject not found");
    } else {
      req.subject = req.params.subject;
      next();
    }
  },
  require("./subjectRoutes")
);

// router.get("/:subject/year/:year", allQuestions);

module.exports = router;
/* 

year - return all questions
/year/grade/gr - return all questions from a specific grade
/grade/chapter - return questions from a specific chapter
/math   /year/2010/

*/
