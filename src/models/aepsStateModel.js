const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aepsStateSchema = new Schema({
  aeps_state_id: {
    type: Number,
    required: true
  },
  stateId: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  stateCode: {
    type: String,
    required: true
  },
  panstate: {
    type: Number,
    required: true
  }
});

const AepsState = mongoose.model('aeps_state', aepsStateSchema);

module.exports = AepsState;
