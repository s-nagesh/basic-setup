let router = require("express").Router();

router.get("/", (req, res, next) => {
  res.send("This is dummy page.");
});

module.exports = router;
