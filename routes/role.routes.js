const router = require("express").Router();
const role = require("../entity/role.entity");
const apiController = require("../utility/apiController");
let errorMsg;
router.post("", async (req, res) => {
  const response = await role.addRole(req.body);
  if (!response.success) {
    errorMsg = apiController.respondBad();
    res.status(errorMsg.code).send(errorMsg);
    return;
  } else {
    res.status(response.code).send(response);
    return;
  }
});

router.get("/", async (req, res) => {
  const response = await role.getRole(req.query);
  if (!response.success) {
    errorMsg = apiController.respondBad();
    res.status(errorMsg.code).send(errorMsg);
    return;
  } else {
    res.status(response.code).send(response);
    return;
  }
});

router.put("/", async (req, res) => {
  const response = await role.updateRole(req.body);
  if (!response.success) {
    errorMsg = apiController.respondBad();
    res.status(errorMsg.code).send(errorMsg);
    return;
  } else {
    res.status(response.code).send(response);
    return;
  }
});

router.delete("/", async (req, res) => {
  const response = await role.deleteRole(req.query);
  if (!response.success) {
    errorMsg = apiController.respondBad();
    res.status(errorMsg.code).send(errorMsg);
    return;
  } else {
    res.status(response.code).send(response);
    return;
  }
});

module.exports = router;
