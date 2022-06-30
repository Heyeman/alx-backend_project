const express = require("express");
const router = express.Router(),
  protector = require("../middlewares/routeProtector");

const { allSubs } = require("../controllers/examControllers");

router.get("/", allSubs);
router.use(
  "/:subject",
  (req, res, next) => {
    let sub = req.params.subject.toLowerCase();
    if (
      ![
        "physics",
        "chemistry",
        "biology",
        "mathematics",
        "civics",
        "english",
        "economics",
        "geography",
        "history",
      ].includes(sub)
    ) {
      res.status(400);
      throw new Error("Invalid subject");
    } else {
      req.subject = sub[0].toUpperCase() + sub.slice(1);
      if (["physics", "chemistry", "biology", "mathematics"].includes(sub)) {
        req.stream = "Natural";
      } else if (["economics", "geography", "history"].includes(sub)) {
        req.stream = "Social";
      } else {
        req.stream = "uni";
      }
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
