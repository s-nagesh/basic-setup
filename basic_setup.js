const express = require("express");
const app = express();
app.use(express.json());

require("./startup/routes")(app);

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./public/swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log("server running on port 3000");
});

module.exports = app;
