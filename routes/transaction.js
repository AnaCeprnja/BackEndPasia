"use strict";
const router = require("express").Router();
const ctrl = require("../controllers");
const passport = require("passport");

router.get("/test", ctrl.transaction.test);
router.get("/", ctrl.transaction.getAll);
router.get("/:id", ctrl.transaction.getOne);
router.post("/", ctrl.transaction.createOne);
router.put("/:id", ctrl.transaction.updateOne);
router.delete("/delete-all", ctrl.transaction.deleteAll);
router.delete("/:id", ctrl.transaction.deleteOne);
router.post("/:id/update-account", ctrl.accountUpdater.updateAccount)

module.exports = router;