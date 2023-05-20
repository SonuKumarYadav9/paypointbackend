const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AEPS_TicketSchema = new Schema({
  aeps_ticket_id: { type: Number, required: true },
  aeps_txn_id: { type: String, required: true },
  issue: { type: String, required: true },
  status: { type: String, required: true },
  ticket_date: { type: Date, default: Date.now },
  cus_id: { type: String, required: true },
});

const AEPS_Ticket = mongoose.model("aeps_tickets", AEPS_TicketSchema);

module.exports = AEPS_Ticket;
