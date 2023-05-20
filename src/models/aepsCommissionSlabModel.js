const mongoose = require('mongoose');

const AEPsCommissionSlabSchema = new mongoose.Schema({
  aeps_comm_id: {
    type: Number,
    required: true,
  },
  slab: {
    type: String,
    required: true,
  },
  member_type: {
    type: String,
    required: true,
  },
  percent: {
    type: String,
    required: true,
  },
  maximum_comm: {
    type: String,
    required: true,
  },
  amount_min_range: {
    type: String,
    required: true,
  },
  amount_max_range: {
    type: String,
    required: true,
  },
  updated_time: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('aeps_commission_slab', AEPsCommissionSlabSchema);
