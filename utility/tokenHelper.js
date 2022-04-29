const jwt = require("jsonwebtoken");
const config = require("../config/default.json");

module.exports.generateToken = (token) => {
  return jwt.sign(token, config.seceret_key);
};

module.exports.validateToken = (token) => {
  return jwt.verify(token, config.seceret_key);
};
