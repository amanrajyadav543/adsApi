const mongoose = require("mongoose");


const impressionSchema = new mongoose.Schema({
  ad_unit_id: String,
  firebase: String,
  ad_id: Number,
  type: String,
  ads_name: String,
  ads_position: String,
  from: String,
  comapnyId: String,
  country: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Impression', impressionSchema);
