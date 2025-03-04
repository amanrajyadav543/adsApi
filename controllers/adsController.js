const adsModel = require("../model/adsModelSchema");
// const Ad = mongoose.model("Ad", adSchema);
  // const adsController = async (req, res) => {
  //   try {
  //       const {
  //           class_name,
  //           widget_name,
  //           height,
  //           width,
  //           ad_unit,
  //           ad_type,
        
  //         } = req.body;
  //     if (!req.body.ads || !Array.isArray(req.body.ads)) {
  //       return res.status(400).json({ message: "Invalid request format" });
  //     }  

  //    const newadsModel= new adsModel({
  //          class_name,
  //           widget_name,
  //           height,
  //           width,
  //           ad_unit,
  //           ad_type,
  //     });
  //     await newadsModel.save();
      
  //     const ads = await adsModel.insertMany(req.body.ads);
  //     res.status(201).json({ message: "Ads saved successfully", ads });
  //   } catch (error) {
  //     res.status(500).json({ message: "Error saving ads", error: error.message });
  //   }
  // };

  const adsController = async (req, res) => {
    try {
      const {
        class_name,
        widget_name,
        height,
        width,
        ad_unit,
        ad_type,
      } = req.body;
  
      if (!class_name || !widget_name || !height || !width || !ad_unit || !ad_type) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const newAd = new adsModel({
        class_name,
        widget_name,
        height,
        width,
        ad_unit,
        ad_type,
      });
  
      await newAd.save();
  
      res.status(201).json({ message: "Ad saved successfully", ad: newAd });
    } catch (error) {
      res.status(500).json({ message: "Error saving ad", error: error.message });
    }
  };
  

const adsShowController=async(req, res)=>{

    try {
      const ads = await adsModel.find();
      res.json({ads});
    } catch (error) {
      res.status(500).json({ message: "Error fetching ads", error: error.message });
    }

}


module.exports = {
    adsController,
    adsShowController
  };
  