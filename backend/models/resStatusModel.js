const mongoose = require("mongoose");

const statusSchema = mongoose.Schema({
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  apiKey: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  method: {
    type: String,
    default: "Get",
    required: true,
  },
  resources: {
    type: Object,
    required: true,
  },
});

const statusModel = mongoose.model("requests", statusSchema);

module.exports = { statusModel };
