const express = require("express");
const router = express.Router();
const { createImpression, getImpressions } = require("../controllers/impressionController");

// POST: Record Impression
router.post("/impression", createImpression);

// GET: Get All Impressions
router.get("/impression", getImpressions);

module.exports = router;
