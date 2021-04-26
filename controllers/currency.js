"use strict";

// Required Node.js Packages
//-----------------------------------------------------------------------------

require("dotenv").config(); // Environment Variable (.env)
const db = require("../models"); // Database
const log = require("../middleware/log"); // Console log formatter

// Controllers
//-----------------------------------------------------------------------------

// GET ROUTE: /currencies/test
// Confirm Currencies route is valid
const test = (req, res) => {
  const where = "GET /currencies/test";
  const successMessage = {
    name: "Endpoint Valid",
    message: "Currencies Route",
    where
  }
  log.success(successMessage);
  res.json(successMessage);
}

// GET ROUTE: /currencies
// Find all Currency documents
const getAll = async (req, res) => {
  const where = "GET /currencies";
  try {
    const currency = await db.Currency.find({});
    // Log success message and route location
    const successMessage = {
      name: `Found ${currency.length}`,
      message: "Currencies returned to requester as JSON",
      where
    }
    log.success(successMessage);
    
    // Return result as JSON Object
    res.json(currency);
    
  } catch (error) {
    // Log error message(s) and route location
    const errorList = log.mongooseErrors(error, where);
    
    // Return error message(s) as JSON Object
    res.status(400).json(errorList);
  }
}

// GET ROUTE: /currencies/:id
// Find a Currency document by ID
const getOne = async (req, res) => {
  const where = "GET /currencies/:id";
  try {
    const currency = await db.Currency.findById(req.params.id);
    // Log success message and route location
    const successMessage = {
      name: currency._id,
      message: `${currency.code}: ${currency.name}`,
      where
    }
    log.success(successMessage);
    
    // Return result as JSON Object
    res.json(currency);
    
  } catch (error) {
    // Log error message(s) and route location
    const errorList = log.mongooseErrors(error, where);
    
    // Return error message(s) as JSON Object
    res.status(400).json(errorList);
  }
};

// GET ROUTE: /currencies/usd
// Find a U.S. Dollar Currency document by code "USD"
const getUSD = async (req, res) => {
  const where = "GET /currencies/usd";
  try {
    const currency = await db.Currency.findOne({
      code: "USD"
    });
    // Log success message and route location
    const successMessage = {
      name: currency._id,
      message: `${currency.code}: ${currency.name}`,
      where
    }
    log.success(successMessage);
    
    // Return result as JSON Object
    res.json(currency);
    
  } catch (error) {
    // Log error message(s) and route location
    const errorList = log.mongooseErrors(error, where);
    
    // Return error message(s) as JSON Object
    res.status(400).json(errorList);
  }
};

// POST ROUTE: /currencies
// Create a Currency document from posted form body
const createOne = async (req, res) => {
  const where = "POST /currencies";
  try {
    const currency = await db.Currency.create(req.body);
    // Log success message and route location
    const successMessage = {
      name: currency._id,
      message: `${currency.code}: ${currency.name}`,
      where
    }
    log.success(successMessage);
    
    // Return result as JSON Object
    res.json(currency);
    
  } catch (error) {
    // Log error message(s) and route location
    const errorList = log.mongooseErrors(error, where);
    
    // Return error message(s) as JSON Object
    res.status(400).json(errorList);
  }
};

// PUT ROUTE: /currencies/:id
// Update a Currency document by ID
const updateOne = async (req, res) => {
  const where = "UPDATE /currencies/:id";
  try {
    const currency = await db.Currency.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // Log success message and route location
    const successMessage = {
      name: currency._id,
      message: `${currency.code}: Successfully updated`,
      where
    }
    log.success(successMessage);
    
    // Return result as JSON Object
    res.json(currency);
    
  } catch (error) {
    // Log error message(s) and route location
    const errorList = log.mongooseErrors(error, where);
    
    // Return error message(s) as JSON Object
    res.status(400).json(errorList);
  }
};

// DELETE ROUTE: /currencies/:id
// Delete a Currency document by ID
const deleteOne = async (req, res) => {
  const where = "DELETE /currencies/:id";
  try {
    const currency = await db.Currency.findByIdAndDelete(req.params.id);
    // Log success message and route location
    const successMessage = {
      name: currency._id,
      message: `${currency.code}: ${currency.name}`,
      where
    }
    log.success(successMessage);
    
    // Return result as JSON Object
    res.json(currency);
    
  } catch (error) {
    // Log error message(s) and route location
    const errorList = log.mongooseErrors(error, where);
    
    // Return error message(s) as JSON Object
    res.status(400).json(errorList);
  }
};

// DELETE ROUTE: /currencies/delete-all
// Delete all Currency documents
const deleteAll = async (req, res) => {
  const where = "DELETE /currencies/delete-all";
  try {
    const currency = await db.Currency.deleteMany({});
    // Log success message and route location
    const successMessage = {
      name: `Deleted ${currency.deletedCount}`,
      message: "Currency Collection is now empty",
      where
    }
    log.success(successMessage);
    res.json(currency);
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
  getUSD
}