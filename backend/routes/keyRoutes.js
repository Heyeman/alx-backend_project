const express = require("express");
const router = express.Router(),
  protector = require("../middlewares/routeProtector");

const { changeKey } = require("../controllers/keyControllers");

router.get("/change", protector, changeKey);

module.exports = router;
