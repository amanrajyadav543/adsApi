
const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  id: Number,
  type: { type: String, enum: ['google', 'custom', 'applovin', 'facebook'], required: true },
  type_name: String,
  type_size: String,
  client_redirect_url: String,
  impression_url: String,
  ads_name: String,
  cdnlink: String,
  ads_position: String,
  ads_type: String,
  ad_unit_id: { type: String, required: true, unique: true },
  ads_status: Number,
  ads_rotation: Number,
  ads_description: String,
  ads_button_text: String,
  video_url: String,
  country: String,
  rotation_order: Number,
  adsense_text: String,
  company: Number,
  content_type: Number,

  // Add impression fields
  impressionCount: { type: Number, default: 0 },
  lastImpressionAt: { type: Date, default: null },
});

module.exports = mongoose.model('Ad', adSchema);
