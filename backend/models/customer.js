// models/customer.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const customerSchema = new Schema({
  name: String,
  email: String,
  phone: String,
});

module.exports = mongoose.model("Customer", customerSchema);
