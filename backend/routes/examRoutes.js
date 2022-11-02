const express = require("express");
const router = express.Router(),
  protector = require("../middlewares/routeProtector");

const { allSubs } = require("../controllers/examControllers");

router.get("/", allSubs);
router.use(
  "/:subject",
  (req, res, next) => {
    let sub = req.params.subject.toLowerCase(),
        subjectArray = [
        "physics",        "chemistry",  "biology",        "mathematics",
        "civics",        "english",        "economics", "geography",        "history"];
    if (
      !subjectArray.includes(sub)
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

module.exports = router;
