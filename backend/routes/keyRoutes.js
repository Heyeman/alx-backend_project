const express = require("express");
const router = express.Router(),
  protector = require("../middlewares/routeProtector");

const { changeKey, upgradeKey } = require("../controllers/keyControllers");

router.put("/change", protector, changeKey);
router.put("/upgrade", protector, upgradeKey);

module.exports = router;
