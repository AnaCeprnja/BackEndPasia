const router = require("express").Router();
const ctrl = require("../controllers");


module.exports = {
  user: require("./user"),
  message: require("./message"),
  transactionAccount: require("./transactionAccount"),
  currency: require("./currency"),
  transaction: require("./transaction"),
  stock: require("./stock"),
  accountUpdater: require("./accountUpdateHandler")
}