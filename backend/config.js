const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  port: process.env.PORT,
  mongo_url: process.env.MONGO_URI,
};
