const adminRoute = require("../routes/admin.routes");
const userRoute = require("../routes/user.routes");
const roleRoute = require("../routes/role.routes");
const indexRoute = require("../routes/index.routes");
const productRoute = require("../routes/product.route");

module.exports = (app) => {
  app.use("/", indexRoute);
  app.use("/api/admin", adminRoute);
  app.use("/api/user", userRoute);
  app.use("/api/role", roleRoute);
  app.use("/api/product", productRoute);
};
