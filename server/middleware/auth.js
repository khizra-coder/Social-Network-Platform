const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.headers.token;

  if (!token) return res.status(401).json("Access denied");

  try {
    const verified = jwt.verify(token, "secret");
    req.user = verified;
    next();
  } catch {
    res.status(400).json("Invalid token");
  }
};