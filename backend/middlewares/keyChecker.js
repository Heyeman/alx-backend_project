const asyncHandler = require("express-async-handler"),
  { apiModel } = require("../models/apiKeyModel"),
  { ObjectId } = require("mongoose").Schema.Types;

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
    const requestOptions = {
      status: true,
      apiKey: key.apiKey,
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

    res.on("error", () => {
      console.log("finished with error");
    });
    res.on("successful", () => {
      console.log("Finished successfully");
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
