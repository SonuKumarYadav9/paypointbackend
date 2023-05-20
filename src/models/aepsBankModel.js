const mongoose = require("mongoose");

const aepsBankSchema = new mongoose.Schema({
  aeps_bank_id: {
    type: Number,
    required: true
  },
  bankName: {
    type: String,
    required: true
  },
  iinno: {
    type: String
  }
});

module.exports = mongoose.model("aeps_bank", aepsBankSchema);


 

