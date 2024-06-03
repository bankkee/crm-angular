// routes/customerRoutes.js
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const customerController = require("../controllers/customerController");

router.get("/", authenticate, customerController.getCustomers);
router.post("/", authenticate, customerController.createCustomer);
// Implement routes for update, delete, and getById

module.exports = router;
