const router = require("express").Router();
const ctrl = require("../controllers");

// routes
router.post("/update-account", ctrl.accountUpdater.updateAccount);

module.exports = router;




