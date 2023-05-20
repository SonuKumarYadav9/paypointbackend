const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      
      role: {
        type: String,
        enum: [ 'master', 'distributer', 'retailer'],
        required: true
      },
      parent_id: {
        type : mongoose.Schema.Types.ObjectId
      }
    },
  { timestamps: true }
);



module.exports = mongoose.model("user", userSchema);




