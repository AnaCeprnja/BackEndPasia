"use strict";

// Required Node.js Packages
//-----------------------------------------------------------------------------

require("dotenv").config(); // Environment Variable (.env)
const db = require("../models"); // Database
const log = require("../middleware/log"); // Console log formatter

// Controllers
//-----------------------------------------------------------------------------

// GET ROUTE: /transaction-accounts/test
// Confirm Transaction Accounts route is valid
const test = (req, res) => {
  const where = "GET /transaction-accounts/test";
  const successMessage = {
    name: "Endpoint Valid",
    message: "Transaction Accounts",
    where
  }
  log.success(successMessage);
  res.json(successMessage);
}

// GET ROUTE: /transaction-accounts
// Find all transactionAccount documents
const getAll = async (req, res) => {
  const where = "GET /transaction-accounts";
  try {
    const transactionAccount = await db.TransactionAccount.find({});
    // Log success message and route location
    const successMessage = {
      name: `Found ${transactionAccount.length}`,
      message: "Transaction Accounts returned to requester as JSON",
      where
    }
    log.success(successMessage);
    
    // Return result as JSON Object
    res.json(transactionAccount);
    
  } catch (error) {
    // Log error message(s) and route location
    const errorList = log.mongooseErrors(error, where);
    
    // Return error message(s) as JSON Object
    res.status(400).json(errorList);
  }
}

// GET ROUTE: /transaction-accounts/:id/transactions
// Find all Transaction documents by Transaction Account
const getTransactionsByAccount = async (req, res) => {
  const where = "GET /transaction-accounts/:id/transactions";
  const { id } = req.params;
  try {
    console.log(id)
    // Get transactions
    const transactions = await db.Transaction.find({
      account: id
    }).populate("currency");
    
    // Get Transaction Account
    // Alternative to populating from transactions,
    // (If there are no matching transactions; an empty array is returned,
    // and no account information is available)
    const account = await db.TransactionAccount.findById(id).populate("currency");
    
    // Log success message and route location
    const successMessage = {
      name: `Found ${transactions.length} Transactions`,
      message: `Account: ${account.name}`,
      where
    }
    log.success(successMessage);
    
    // Return results as JSON Object
    res.status(200).json({transactions, account});
    
  } catch (error) {
    // Log error message(s) and route location
    const errorList = log.mongooseErrors(error, where);
    
    // Return error message(s) as JSON Object
    res.status(400).json(errorList);
  }
}

// GET ROUTE: /transaction-accounts/:id
// Find a Transaction Account document by ID
const getOne = async (req, res) => {
  const where = "GET /transaction-accounts/:id";
  try {
    const transactionAccount = await db.TransactionAccount.findById(req.params.id);
    // Log success message and route location
    const successMessage = {
      name: transactionAccount._id,
      message: `${transactionAccount.account_type} Account: ${transactionAccount.name}`,
      where
    }
    log.success(successMessage);
    
    // Return result as JSON Object
    res.json(transactionAccount);
    
  } catch (error) {
    // Log error message(s) and route location
    const errorList = log.mongooseErrors(error, where);
    
    // Return error message(s) as JSON Object
    res.status(400).json(errorList);
  }
};

// POST ROUTE: /transaction-accounts
// Create a Transaction Accounts document from posted form body
const createOne = async ( req, res ) => {
  const where = "POST /transaction-accounts"
  console.log(req.body)
  try {
    const transactionAccount = await db.TransactionAccount.create({
      ...req.body,
      belongs_to: req.user._id
    });
    // Log success message and route location
    const successMessage = {
      name: transactionAccount._id,
      message: `${transactionAccount.account_type} Account: ${transactionAccount.name}`,
      where
    }
    log.success(successMessage);
    
    // Return result as JSON Object
    res.json(transactionAccount);
    
  } catch (error) {
    // Log error message(s) and route location
    const errorList = log.mongooseErrors(error, where);
    
    // Return error message(s) as JSON Object
    res.status(400).json(errorList);
  }
}

// POST ROUTE: /transaction-accounts/:id
// Create a Transaction Accounts document from posted form body
const insertManyByAccount = async ( req, res ) => {
  const where = "POST /transaction-accounts/:id"
  console.log(req.body)
  try {
    const transactionAccount = await db.TransactionAccount.insertMany(req.body);
    // Log success message and route location
    const successMessage = {
      name: transactionAccount._id,
      message: `Inserted ${transactionAccount.length} ${transactionAccount.length === 1 ? "transaction" : "transactions"} to Account: ${transactionAccount.name}`,
      where
    }
    log.success(successMessage);
    
    // Return result as JSON Object
    res.json(transactionAccount);
    
  } catch (error) {
    // Log error message(s) and route location
    const errorList = log.mongooseErrors(error, where);
    
    // Return error message(s) as JSON Object
    res.status(400).json(errorList);
  }
}

// PUT ROUTE: /transaction-accounts/:id
// Update a Transaction Account document by ID
const updateOne = async (req, res) => {
  const where = "UPDATE /transaction-accounts/:id";
  try {
    const transactionAccount = await db.TransactionAccount.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // Log success message and route location
    const successMessage = {
      name: transactionAccount._id,
      message: `${transactionAccount.name}: Successfully updated`,
      where
    }
    log.success(successMessage);
    
    // Return result as JSON Object
    res.json(transactionAccount);
    
  } catch (error) {
    // Log error message(s) and route location
    const errorList = log.mongooseErrors(error, where);
    
    // Return error message(s) as JSON Object
    res.status(400).json(errorList);
  }
};

// DELETE ROUTE: /transaction-accounts/:id
// Delete a Transaction Account document by ID
const deleteOne = async (req, res) => {
  const where = "DELETE /transaction-accounts/:id";
  try {
    const transactionAccount = await db.TransactionAccount.findByIdAndDelete(req.params.id);
    // Log success message and route location
    const successMessage = {
      name: transactionAccount._id,
      message: `${transactionAccount.name}`,
      where
    }
    log.success(successMessage);
    
    // Return result as JSON Object
    res.json(transactionAccount);
    
  } catch (error) {
    // Log error message(s) and route location
    const errorList = log.mongooseErrors(error, where);
    
    // Return error message(s) as JSON Object
    res.status(400).json(errorList);
  }
};

// DELETE ROUTE: /transaction-accounts/delete-all
// Delete all Transaction Account documents
const deleteAll = async (req, res) => {
  const where = "DELETE /transaction-accounts/delete-all";
  try {
    const transactionAccount = await db.TransactionAccount.deleteMany({});
    // Log success message and route location
    const successMessage = {
      name: `Deleted ${transactionAccount.deletedCount}`,
      message: "Transaction Account Collection is now empty",
      where
    }
    log.success(successMessage);
    res.json(transactionAccount);
  } catch (error) {
    // Log error message(s) and route location
    const errorList = log.mongooseErrors(error, where);
    
    // Return error message(s) as JSON Object
    res.status(400).json(errorList);
  }
}

module.exports = {
  test,
  getAll,
  deleteAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
  getTransactionsByAccount,
  insertManyByAccount
}