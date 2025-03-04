const express = require("express");

const router = express.Router();
const {
    // adsController,
    // adsShowController,
    createAd,
    getAds,
    createImpression
   
  } = require("../controllers/adsController");
//   const adsController = require('../controllers/adsController');

// router.post("/create", adsController);
// router.get('/show',adsShowController);


router.post('/ads/create',createAd);
router.get('/ads/get', getAds);
router.post('/ads/impression',createImpression);

module.exports = router;