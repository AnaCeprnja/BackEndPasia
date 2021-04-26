const router = require("express").Router();
const ctrl = require("../controllers");

router.get("/test", ctrl.currency.test);
router.get("/", ctrl.currency.getAll);
router.get("/usd", ctrl.currency.getUSD);
router.get("/:id", ctrl.currency.getOne);
router.post("/", ctrl.currency.createOne);
router.put("/:id", ctrl.currency.updateOne);
router.delete("/delete-all", ctrl.currency.deleteAll);
router.delete("/:id", ctrl.currency.deleteOne);

module.exports = router;