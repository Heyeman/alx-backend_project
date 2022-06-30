const express = require("express");
const router = express.Router(),
  protector = require("../middlewares/routeProtector");

router.get("/", (req, res) => {
  res.send("Please specify exam years from 2005-2010" + req.subject);
});
router.use("/:year", (req, res, next) => {
  if (!(2004 < parseInt(req.params.year) && parseInt(req.params.year) < 2011)) {
    res.send("invalid year");
  } else {
    req.year = parseInt(req.params.year);
    next();
  }
});
router.get("/:year", (req, res) => {
  res.send("some year");
});
module.exports = router;
