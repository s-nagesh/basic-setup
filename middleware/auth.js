const tokenhelper = require("../utility/tokenhelper");
const apiController = require("../utility/apiController");
let errorMsg = null;

module.exports.AuthGuard = function (role) {
  return async function (req, res, next) {
    console.log("role", role);
    let token = req.headers["x-access-token"];

    if (!token) {
      errorMsg = apiController.respondUnauthorized();
      res.status(errorMsg.code).send(errorMsg);
    }
    var decryptedToken = tokenhelper.validateToken(token);
    console.log("decryptedToken", decryptedToken);
    if (!decryptedToken || !decryptedToken) {
      errorMsg = apiController.respondUnauthorized("Invalid Token");
      res.status(errorMsg.code).send(errorMsg);
    }

    if (role.indexOf(decryptedToken.role) == -1 && role.length > 0) {
      errorMsg = apiController.respondUnauthorized("Unathorized Access");
      res.status(errorMsg.code).send(errorMsg);
    }
    req.user = decryptedToken;
    console.log("req.user", req.user);
    next();
  };
};
