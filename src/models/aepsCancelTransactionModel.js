const mongoose = require("mongoose");

const aepsCancelTransactionSchema = new mongoose.Schema({
  aepscan_id: {
    type: Number,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  device: {
    type: String,
    required: true
  },
  aadhar_number: {
    type: String,
    required: true
  },
  aeps_bank_id: {
    type: String,
    required: true
  },
  Remark: {
    type: String,
    required: true
  },
  apiclid: {
    type: String,
    required: true
  },
  through: {
    type: String,
    required: true
  },
  response: {
    type: Object,
    required: true
  },
  added_date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("aeps_cancel_transaction", aepsCancelTransactionSchema);