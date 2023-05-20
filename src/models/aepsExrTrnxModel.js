const mongoose = require('mongoose');

const aepsExrTrnxSchema = new mongoose.Schema({
  aeps_txn_id: {
    type: Number,
    required: true
  },
  aeps_txn_agentid: {
    type: String,
    required: true
  },
  aeps_txn_recrefid: {
    type: String,
    required: true,
    default: '0'
  },
  microatm_recrefid: {
    type: String,
    required: true,
    default: '0'
  },
  aeps_txn_opbal: {
    type: String,
    required: true
  },
  aeps_txn_crdt: {
    type: String,
    required: true
  },
  aeps_txn_dbdt: {
    type: String,
    required: true
  },
  aeps_txn_clbal: {
    type: String,
    required: true
  },
  aeps_txn_type: {
    type: String,
    required: true
  },
  aeps_txn_date: {
    type: Date,
    required: true,
    default: Date.now
  },
  aeps_txn_comment: {
    type: String,
    required: true
  }
});

const AepsExrTrnx = mongoose.model('aeps_exr_trnx', aepsExrTrnxSchema);

module.exports = AepsExrTrnx;
