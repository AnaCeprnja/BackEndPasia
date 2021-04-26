"use strict";
const router = require("express").Router();
const ctrl = require("../controllers");
const passport = require("passport");

router.get("/test", ctrl.transactionAccount.test);
router.get("/", ctrl.transactionAccount.getAll);
router.get("/:id/transactions", ctrl.transactionAccount.getTransactionsByAccount);
router.get("/:id", ctrl.transactionAccount.getOne);
router.post("/:id", ctrl.transactionAccount.insertManyByAccount);
router.post("/", passport.authenticate("jwt", { session: false }), ctrl.transactionAccount.createOne);
router.put("/:id", ctrl.transactionAccount.updateOne);
router.delete("/delete-all", ctrl.transactionAccount.deleteAll);
router.delete("/:id", ctrl.transactionAccount.deleteOne);

module.exports = router;