"use strict";
const mongoose = require("mongoose");
const { Schema } = mongoose;

const CurrencySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_plural: {
    type: String,
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  symbol: {
    type: String,
    required: true
  },
  symbol_native: {
    type: String,
    required: true
  },
  decimal_digits: {
    type: Number,
    required: true
  },
  rounding: {
    type: Number,
    required: true
  },
  date_added: {
    type: Date,
    default: Date.now()
  }
});

const Currency = mongoose.model("Currency", CurrencySchema);

module.exports = Currency;