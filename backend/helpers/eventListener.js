const { statusModel } = require("../models/resStatusModel");
module.exports = require("express-async-handler")(async () => {
  try {
    const savedStatus = await statusModel.create(options);
    console.log("status saved");
  } catch (error) {
    throw new Error(error.message);
  }
});
