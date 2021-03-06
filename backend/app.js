//dependency initializations
const express = require("express");
const dotenv = require("dotenv").config();

const app = express();
app.on("connection", () => {
  console.log("listening");
});
//app configurations
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//route configs
app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/keyRoutes"));
app.use(
  "/exam",
  require("./middlewares/keyChecker"),
  require("./routes/examRoutes")
);
app.use("*", require("./helpers/404handler"));

//error handler
app.use(require("./middlewares/errorHandler"));

module.exports = app;
