const Impression = require("../model/impressionModelSchema");
const adsModel = require("../model/adsModelSchema");
// Create Impression

const createImpression = async (req, res) => {
    try {
      const { ad_unit, timestamp } = req.body;
  
      // Create new impression
      const impression = new Impression({
        ad_unit,
        timestamp: timestamp || Date.now(),
      });
      await impression.save();
  
      // Update ad's impression count and last impression time
      const ad = await adsModel.findOneAndUpdate(
        { ad_unit },
        {
          $inc: { impressionCount: 1 },
          lastImpressionAt: Date.now(),
        },
        { new: true }
      );
  
      if (!ad) {
        return res.status(404).json({ message: "Ad not found for this ad_unit." });
      }
  
      res.status(201).json({
        message: "Impression recorded successfully",
        impression,
        updatedAd: ad,
      });
    } catch (error) {
      console.error("Error saving impression:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  

// const createImpression = async (req, res) => {
//   try {
//     const { ad_unit, timestamp } = req.body;
//     const impression = new Impression({
//       ad_unit,
//       timestamp: timestamp || Date.now(),
//     });
//     await impression.save();
//     res.status(201).json({ message: "Impression recorded successfully", impression });
//   } catch (error) {
//     console.error("Error saving impression:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };


const getImpressions = async (req, res) => {
    try {
      const ads = await adsModel.find({}, { 
        class_name: 1, 
        widget_name: 1, 
        height: 1, 
        width: 1, 
        ad_unit: 1, 
        ad_type: 1, 
        impressionCount: 1, 
        lastImpressionAt: 1,
        _id: 0 // optional, remove if you want `_id` in response
      });
  
      res.status(200).json({
        message: "All ads fetched successfully",
        totalAds: ads.length,
        ads,
      });
    } catch (error) {
      console.error("Error fetching ads:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  

  const getAds = async (req, res) => {
    try {
      const { ad_unit } = req.query; // get ad_unit from query params
  
      if (ad_unit) {
        // Find specific ad by ad_unit
        const ad = await adsModel.findOne(
          { ad_unit },
          {
            class_name: 1,
            widget_name: 1,
            height: 1,
            width: 1,
            ad_unit: 1,
            ad_type: 1,
            impressionCount: 1,
            lastImpressionAt: 1,
            _id: 0,
          }
        );
  
        if (!ad) {
          return res.status(404).json({ message: "Ad not found" });
        }
  
        return res.status(200).json({
          message: "Ad fetched successfully",
          ad,
        });
      } else {
        // Fetch all ads
        const ads = await adsModel.find(
          {},
          {
            class_name: 1,
            widget_name: 1,
            height: 1,
            width: 1,
            ad_unit: 1,
            ad_type: 1,
            impressionCount: 1,
            lastImpressionAt: 1,
            _id: 0,
          }
        );
  
        return res.status(200).json({
          message: "All ads fetched successfully",
          totalAds: ads.length,
          ads,
        });
      }
    } catch (error) {
      console.error("Error fetching ads:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  

module.exports = {
  createImpression,
  getImpressions,
  getAds
};
