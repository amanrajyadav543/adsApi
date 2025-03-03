const mongoose = require("mongoose");

const impressionSchema = new mongoose.Schema({
  ad_unit: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Impression", impressionSchema);
