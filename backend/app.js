const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const { port, mongo_url } = require("./config");
var cors = require("cors");
// routes
const customerRoutes = require("./routes/customerRoutes");
const authRoutes = require("./routes/authRoutes");

mongoose.Promise = global.Promise;

mongoose
  .connect(mongo_url, {})
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

global.loggedIn = null;

const app = express();
app.set("port", port);

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/customers", customerRoutes);
app.use("/api/auth", authRoutes);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

module.exports = app;
