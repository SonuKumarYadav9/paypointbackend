
const mongoose = require('mongoose');

const AepsCustomerSchema = new mongoose.Schema({
  aeps_cus_id: {
    type: Number,
    required: true
  },
  cus_id: {
    type: Number,
    required: true
  },
  comm_package_id: {
    type: String,
    required: true
  },
  prefix: {
    type: String,
    required: true
  },
  cus_first_name: {
    type: String,
    required: true
  },
  cus_last_name: {
    type: String,
    required: true
  },
  cus_type: {
    type: String,
    required: true
  },
  cus_email: {
    type: String,
    required: true
  },
  cus_company_name: {
    type: String,
    required: true
  },
  profile_img: {
    type: String,
    required: true
  },
  cus_address_line_1: {
    type: String,
    required: true
  },
  cus_address_line_2: {
    type: String,
    required: true
  },
  cus_mobile: {
    type: String,
    required: true
  },
  call_back: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  cus_status: {
    type: String,
    required: true
  },
  aeps_permission: {
    type: String,
    required: true,
    default: 'no'
  },
  cus_added_date: {
    type: Date,
    required: true,
    default: Date.now
  },
  cus_ip: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: String,
    required: true
  },
  pan_number: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  account_holder_name: {
    type: String,
    required: true
  },
  bank_name: {
    type: String,
    required: true
  },
  account_number: {
    type: String,
    required: true
  },
  ifsc_code: {
    type: String,
    required: true
  },
  id_proof: {
    type: String,
    required: true
  },
  aeps_cus_insert_id: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('aeps_customer', AepsCustomerSchema);



