//dependency initializations
const express = require("express");
const dotenv = require("dotenv").config();

const app = express();
//app configurations

app.use("/auth", require("./routes/authRoutes"));
app.use("*", require("./helpers/404handler"));
module.exports = app;
