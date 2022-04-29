const router = require("express").Router();
const product = require("../entity/product.entity");
const apiController = require("../utility/apiController");
const Auth = require("../middleware/auth");
const RoleEnum = require("../utility/roleEnum").RoleEnum();

let errorMsg;
router.post("/", Auth.AuthGuard([RoleEnum.User]), async (req, res) => {
  req.body.user = req.user;
  const response = await product.addProduct(req.body);
  if (!response.success) {
    errorMsg = apiController.respondBad(response);
    res.status(errorMsg.code).send(errorMsg);
    return;
  } else {
    res.status(response.code).send(response);
    return;
  }
});

router.get(
  "/",
  Auth.AuthGuard([RoleEnum.Admin, RoleEnum.User]),
  async (req, res) => {
    req.query.user = req.user;
    const response = await product.getProductList(req.query);
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

router.put(
  "/",
  Auth.AuthGuard([RoleEnum.Admin, RoleEnum.User]),
  async (req, res) => {
    req.body.user = req.user;
    const response = await product.updateProduct(req.body);
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
router.delete(
  "/",
  Auth.AuthGuard([RoleEnum.Admin, RoleEnum.User]),
  async (req, res) => {
    req.query.user = req.user;
    const response = await product.deleteProduct(req.query);
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
