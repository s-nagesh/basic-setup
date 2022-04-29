const router = require("express").Router();
const Registration = require("../entity/admin.entity");
const apiController = require("../utility/apiController");

router.post("/signup", async (req, res) => {
  const response = await Registration.signUp(req.body);
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
  const response = await Registration.signIn(req.body);
  if (!response.success) {
    errorMsg = apiController.respondBad(response);
    res.status(errorMsg.code).send(errorMsg);
    return;
  } else {
    res.status(response.code).send(response);
    return;
  }
});

module.exports = router;
