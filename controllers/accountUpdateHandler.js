require("dotenv").config(); // Environment Variable (.env)
const db = require("../models"); // Database
const log = require("../middleware/log"); // Console log formatter



// POST ROUTE: /transactions
// Create a Transaction document from posted form body
const updateAccount = async ( req, res ) => {

    console.log("update account!");
    console.log(req.body);
    console.log(req.params);


    db.Transaction.create({
            payee : req.body.payee,
            amount : req.body.amount,
            // currency: req.body.currency,
            exchange_rate: req.body.exchange_rate,
            type: req.body.type,
            category : req.body.category,
            memo : req.body.memo,
            transactionDate : req.body.date,
            //account: req.body.account
          });
            
    res.json({ message: "Endpoint Valid: Update Account" });
    
    
}

module.exports = {
    updateAccount
  }