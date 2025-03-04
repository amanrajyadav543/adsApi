const adsModel = require("../model/adsModelSchema");
const Impression = require("../model/impressionModelSchema")


  const createAd = async (req, res) => {
    try {
      const { type, ad_unit_id } = req.body;
  
      if (!['google', 'custom', 'applovin', 'facebook'].includes(type)) {
        return res.status(400).json({ message: 'Invalid ad platform type.' });
      }
  
      const existingAd = await adsModel.findOne({ ad_unit_id });
      if (existingAd) {
        return res.status(400).json({ message: 'Ad with this ad_unit already exists.' });
      }
  
      const ad = new adsModel(req.body);
      await ad.save();
  
      res.status(201).json({ message: 'Ad created successfully', ad });
    } catch (error) {
      console.error('Error creating ad:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Get All Ads
  const getAds = async (req, res) => {
    try {
      const { ad_unit } = req.query;
  
      if (ad_unit) {
        const ad = await adsModel.findOne({ ad_unit });
  
        if (!ad) {
          return res.status(404).json({ message: 'Ad not found.' });
        }
  
        return res.status(200).json({ message: 'Ad fetched successfully', ad });
      }
  
      const ads = await adsModel.find({});
      res.status(200).json({ message: 'All ads fetched successfully', totalAds: ads.length, ads });
    } catch (error) {
      console.error('Error fetching ads:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  
  // Record Impression


  const createImpression = async (req, res) => {
    try {
      const {
        ad_unit_id,
        firebase,
        ad_id,
        type,
        ads_name,
        ads_position,
        from,
        comapnyId,
        country
      } = req.query;
  
      if (!ad_unit_id) {
        return res.status(400).json({ message: "ad_unit is required in query params." });
      }
  
      const timestamp = Date.now();
  
      const impression = new Impression({
        ad_unit_id,
        firebase,
        ad_id: parseInt(ad_id),
        type,
        ads_name,
        ads_position,
        from,
        comapnyId,
        country: country?.toLowerCase(),
        timestamp,
      });
  
      await impression.save();
  
      const ad = await adsModel.findOneAndUpdate(
        { ad_unit_id },
        {
          $inc: { impressionCount: 1 },
          lastImpressionAt: timestamp,
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

module.exports = {
    // adsController,
    // adsShowController
    createAd,
    getAds,
    createImpression
  };
  