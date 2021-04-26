"use strict";
require("dotenv").config();
const mongoose = require("mongoose");
const log = require("../middleware/log.js");

const { MONGO_URL } = process.env;
const configOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

const connectMongoose = async () => {
  try {
    await mongoose.connect(MONGO_URL, configOptions);
    const message = {
      name: "MongoDB",
      message: "Successfully connected to database",
      where: "/models/index"
    }
    log.success(message);
  } catch (error) {
    const { name, message } = error;
    log.error({name, message, where: "/models/index"})
  }
}

// Connect to Mongoose database
connectMongoose();

module.exports = {
  User: require("./user"),
  Message: require("./message"),
  TransactionAccount: require("./TransactionAccount"),
  Transaction: require("./Transaction"),
  Currency: require("./Currency"),
  Stock: require("./Stock")
};
