const mongoose = require("mongoose");

const keySchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  apiKey: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["basic", "pro"],
    default: "basic",
    required: true,
  },
});

const apiModel = mongoose.model("keys", keySchema);

module.exports = { apiModel };
