"use strict";

// Required Node.js Packages
//-----------------------------------------------------------------------------

require("dotenv").config(); // Environment Variable (.env)
const db = require("../models"); // Database
const log = require("../middleware/log"); // Console log formatter

// Controllers
//-----------------------------------------------------------------------------

// GET ROUTE: /transactions/test
// Confirm Transaction route is valid
const test = (req, res) => {
  const where = "GET /transactions/test";
  const successMessage = {
    name: "Endpoint Valid",
    message: "Transaction",
    where
  }
  log.success(successMessage);
  res.json(successMessage);
}

// GET ROUTE: /transactions
// Find all transaction documents
const getAll = async (req, res) => {
  const where = "GET /transactions";
  try {
    const transaction = await db.Transaction.find({});
    // Log success message and route location
    const successMessage = {
      name: `Found ${transaction.length}`,
      message: "Transaction returned to requester as JSON",
      where
    }
    log.success(successMessage);
    
    // Return result as JSON Object
    res.json(transaction);
    
  } catch (error) {
    // Log error message(s) and route location
    const errorList = log.mongooseErrors(error, where);
    
    // Return error message(s) as JSON Object
    res.status(400).json(errorList);
  }
}

// GET ROUTE: /transactions/:id
// Find a Transaction document by ID
const getOne = async (req, res) => {
  const where = "GET /transactions/:id";
  try {
    const transaction = await db.Transaction.findById(req.params.id);
    // Log success message and route location
    const successMessage = {
      name: transaction._id,
      message: `${transaction.type} Transaction in Account: ${transaction.account.name}`,
      where
    }
    log.success(successMessage);
    
    // Return result as JSON Object
    res.json(transaction);
    
  } catch (error) {
    // Log error message(s) and route location
    const errorList = log.mongooseErrors(error, where);
    
    // Return error message(s) as JSON Object
    res.status(400).json(errorList);
  }
};

// POST ROUTE: /transactions
// Create a Transaction document from posted form body
const createOne = async ( req, res ) => {
  const where = "POST /transactions"
  console.log(req.body)
  try {
    const transaction = await db.Transaction.create(req.body);
    // Log success message and route location
    const successMessage = {
      name: transaction._id,
      message: `${transaction.type} Transaction in Account: ${transaction.account.name}`,
      where
    }
    log.success(successMessage);
    
    // Return result as JSON Object
    res.json(transaction);
    
  } catch (error) {
    // Log error message(s) and route location
    const errorList = log.mongooseErrors(error, where);
    
    // Return error message(s) as JSON Object
    res.status(400).json(errorList);
  }
}

// PUT ROUTE: /transactions/:id
// Update a Transaction document by ID
const updateOne = async (req, res) => {
  const where = "UPDATE /transactions/:id";
  try {
    const transaction = await db.Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // Log success message and route location
    const successMessage = {
      name: transaction._id,
      message: `${transaction.type} Transaction: Successfully updated`,
      where
    }
    log.success(successMessage);
    
    // Return result as JSON Object
    res.json(transaction);
    
  } catch (error) {
    // Log error message(s) and route location
    const errorList = log.mongooseErrors(error, where);
    
    // Return error message(s) as JSON Object
    res.status(400).json(errorList);
  }
};

// DELETE ROUTE: /transactions/:id
// Delete a Transaction document by ID
const deleteOne = async (req, res) => {
  const where = "DELETE /transactions/:id";
  try {
    const transaction = await db.Transaction.findByIdAndDelete(req.params.id);
    // Log success message and route location
    const successMessage = {
      name: transaction._id,
      message: `${transaction.type} Transaction in account: ${transaction.account.name}`,
      where
    }
    log.success(successMessage);
    
    // Return result as JSON Object
    res.json(transaction);
    
  } catch (error) {
    // Log error message(s) and route location
    const errorList = log.mongooseErrors(error, where);
    
    // Return error message(s) as JSON Object
    res.status(400).json(errorList);
  }
};

// DELETE ROUTE: /transactions/delete-all
// Delete all Transaction documents
const deleteAll = async (req, res) => {
  const where = "DELETE /transactions/delete-all";
  try {
    const transaction = await db.Transaction.deleteMany({});
    // Log success message and route location
    const successMessage = {
      name: `Deleted ${transaction.deletedCount}`,
      message: "Transaction Collection is now empty",
      where
    }
    log.success(successMessage);
    res.json(transaction);
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
  updateOne
}