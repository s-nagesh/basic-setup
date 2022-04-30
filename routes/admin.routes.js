const router = require("express").Router();
const Admin = require("../entity/admin.entity");
const apiController = require("../utility/apiController");
const Auth = require("../middleware/auth");
const RoleEnum = require("../utility/roleEnum").RoleEnum();

router.post("/signup", async (req, res) => {
  const response = await Admin.signUp(req.body);
  if (!response.success) {
    errorMsg = apiController.respondBad(response);
    res.status(errorMsg.code).send(errorMsg);
    return;
  } else {
    res.status(response.code).send(response);
    return;
  }
});

router.post("/signin", async (req, res) => {
  const response = await Admin.signIn(req.body);
  if (!response.success) {
    errorMsg = apiController.respondBad(response);
    res.status(errorMsg.code).send(errorMsg);
    return;
  } else {
    res.status(response.code).send(response);
    return;
  }
});

router.put(
  "/updateprofile",
  Auth.AuthGuard([RoleEnum.Admin]),
  async (req, res) => {
    req.body.user = req.user;
    const response = await Admin.updateProfile(req.body);
    if (!response.success) {
      errorMsg = apiController.respondBad(response);
      res.status(errorMsg.code).send(errorMsg);
      return;
    } else {
      res.status(response.code).send(response);
      return;
    }
  }
);

module.exports = router;
