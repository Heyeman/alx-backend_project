const { statusModel } = require("../models/resStatusModel");
module.exports = require("express-async-handler")(
  async (options, status = true) => {
    if (!status) {
      options.status = status;
    }
    try {
      const savedStatus = await statusModel.create(options);
      console.log("status saved");
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
