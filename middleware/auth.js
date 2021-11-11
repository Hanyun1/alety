const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // get the token from the header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    // unauthorized
    return res.status(401).json({ msg: "No token and authorization denied" });
  }

  try {
    // entire token payload that we want from the user
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
