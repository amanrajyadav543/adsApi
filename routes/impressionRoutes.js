const express = require("express");
const router = express.Router();
const { createImpressionI, getImpressions, getAds} = require("../controllers/impressionController");

// POST: Record Impression
router.post("/impression", createImpressionI);

// GET: Get All Impressions
router.get("/impression", getImpressions);
router.get("/impres",getAds);

module.exports = router;
