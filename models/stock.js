"use strict";
const mongoose = require('mongoose');
// Schema class from mongoose
const { Schema } = mongoose;

// Model
const CategorySchema = new Schema({
    ticker: {
      type: String,
      required: true,
      unique: false
    },
    name: {
      type: String,
      required: true
    },
    date_added: {
    type: Date,
    default: Date.now()
    },
    price: Number,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: false
    }
});

CategorySchema.index({ ticker: 1, userId: 1 }, { unique: true })

// Model
const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;