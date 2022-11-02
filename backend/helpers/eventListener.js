const { statusModel } = require("../models/resStatusModel");
module.exports = require("express-async-handler")(async () => {
  try {
    const savedStatus = await statusModel.create(options);
  } catch (error) {
    throw new Error(error.message);
  }
});
