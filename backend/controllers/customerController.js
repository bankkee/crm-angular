// controllers/customerController.js
const Customer = require("../models/customer");

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const customer = new Customer({ name, email, phone });
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Implement updateCustomer, deleteCustomer, getCustomerById functions similarly
