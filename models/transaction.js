"use strict";
const mongoose = require("mongoose");
const { Schema } = mongoose;

const TransactionSchema = new Schema({
  payee: {
    type: String,
    trim: true,
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Currency",
    required: false
  },
  exchange_rate: {
    type: Number,
    validate: {
      validator: function (exchange_rate) {
          return this.currency._id === this.account.currency._id
      },
      message: "Exchange Rate must be provided for transactions in a foreign currency."
    },
    required: false
  },
  type: {
    type: String,
    enum: ["income", "expense", "transfer"],
    required: true
  },
  image_url: {
    type: String
  },
  category: {
    type: String
  },
  memo: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TransactionAccount",
    required: false
  },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;