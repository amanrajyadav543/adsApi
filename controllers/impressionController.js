const Impression = require("../model/impressionModelSchema");

// Create Impression
const createImpression = async (req, res) => {
  try {
    const { ad_unit, timestamp } = req.body;
    const impression = new Impression({
      ad_unit,
      timestamp: timestamp || Date.now(),
    });
    await impression.save();
    res.status(201).json({ message: "Impression recorded successfully", impression });
  } catch (error) {
    console.error("Error saving impression:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Impressions
const getImpressions = async (req, res) => {
  try {
    const impressions = await Impression.find().sort({ timestamp: -1 });
    res.status(200).json(impressions);
  } catch (error) {
    console.error("Error fetching impressions:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createImpression,
  getImpressions,
};
