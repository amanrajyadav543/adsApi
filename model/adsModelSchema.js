// const mongoose = require("mongoose");

// const adSchema = new mongoose.Schema({
//   class_name: String,
//   widget_name: String,
//   height: Number,
//   width: String,
//   ad_unit: String,
//   ad_type: String,
// }); 

// module.exports = mongoose.model("adsData", adSchema);


const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
  class_name: String,
  widget_name: String,
  height: Number,
  width: String,
  ad_unit: String,
  ad_type: String,
  impressionCount: { type: Number, default: 0 },
  lastImpressionAt: { type: Date },
});

module.exports = mongoose.model("adsData", adSchema);
