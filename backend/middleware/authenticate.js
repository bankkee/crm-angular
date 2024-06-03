// middleware/authenticate.js
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  jwt.verify(token, "secretKey", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded.user;
    next();
  });
};

module.exports = authenticate;
