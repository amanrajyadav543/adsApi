const express = require("express");
const router = express.Router();
const { createImpression, getImpressions, getAds} = require("../controllers/impressionController");

// POST: Record Impression
router.post("/impression", createImpression);

// GET: Get All Impressions
router.get("/impression", getImpressions);
router.get("/impres",getAds);

module.exports = router;
