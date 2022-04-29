const router = require("express").Router();
const user = require("../entity/user.entity");
const apiController = require("../utility/apiController");
const Auth = require("../middleware/auth");
const RoleEnum = require("../utility/roleEnum").RoleEnum();

router.get(
  "/getalluser",
  Auth.AuthGuard([RoleEnum.Admin]),
  async (req, res) => {
    req.query.user = req.user;
    const response = await user.getAllUser(req.query);
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

router.get(
  "/getdetails",
  Auth.AuthGuard([RoleEnum.Admin, RoleEnum.User]),
  async (req, res) => {
    req.query.user = req.user;
    const response = await user.getUserDetails(req.query);
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
  "/deleteuser",
  Auth.AuthGuard([RoleEnum.Admin]),
  async (req, res) => {
    req.query.user = req.user;
    const response = await user.deleteUser(req.query);
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
  "/updateprofile",
  Auth.AuthGuard([RoleEnum.Admin, RoleEnum.User]),
  async (req, res) => {
    req.body.user = req.user;
    const response = await user.updateProfile(req.body);
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
  "/updateuserbyadmin",
  Auth.AuthGuard([RoleEnum.Admin]),
  async (req, res) => {
    req.body.user = req.user;
    const response = await user.updateUserByAdmin(req.body);
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
