const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionAccountSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: false
  },
  institution_name: {
    type: String,
    trim: true,
  },
  account_type: {
    type: String,
    enum: ["checking", "savings", "cash"],
    trim: true,
    required: true
  },
  account_number: {
    type: String
  },
  currency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Currency",
    required: true
  },
  balance: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  belongs_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: false
  },
});

transactionAccountSchema.index({ name: 1, belongs_to: 1 }, { unique: true })

const TransactionAccount = mongoose.model('TransactionAccount', transactionAccountSchema);

module.exports = TransactionAccount;