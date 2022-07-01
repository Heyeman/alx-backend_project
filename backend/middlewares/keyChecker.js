const asyncHandler = require("express-async-handler"),
  { apiModel } = require("../models/apiKeyModel"),
  { statusModel } = require("../models/resStatusModel");

module.exports = asyncHandler(async (req, res, next) => {
  let apiKey = req.headers["request-key"];
  if (!apiKey) {
    res.status(400);
    throw new Error("No API key provided");
  }
  const key = await apiModel.findOne({ apiKey });
  if (!key) {
    res.status(400);
    throw new Error("API request key not found");
  } else {
    const listener = require("../helpers/eventListener");
    const requestOptions = {
      status: true,
      apiKey,
      method: req.method === "GET" ? "Get" : "Check",
      resources: {
        subject: req.subject,
        grade: req.grade,
        year: req.year,
        chapter: req.params.chapter,
        requestType: req.params.chapter
          ? "By chapter"
          : req.grade
          ? "By grade"
          : "All",
      },
    };

    res.on("error", async (resources) => {
      try {
        requestOptions.status = false;
        requestOptions.resources = resources;
        const savedStatus = await statusModel.create(requestOptions);
        console.log("Error status saved");
      } catch (error) {
        throw new Error(error.message);
      }
    });
    res.on("successful", async (resources) => {
      try {
        requestOptions.resources = resources;
        const savedStatus = await statusModel.create(requestOptions);
        console.log("Successful status saved");
      } catch (error) {
        throw new Error(error.message);
      }
    });

    if (req.method == "POST" && key.type === "basic") {
      res.status(403);
      throw new Error(
        "Unauthorised to access this resource with this API request key"
      );
    }
    req.key = apiKey;
    next();
  }
});
