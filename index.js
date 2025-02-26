const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json()); // Use express.json() instead of bodyParser

// Connect to MongoDB
// mongoose.connect("mongodb+srv://bit20it37@bit.ac.in:7524@clg@ads.mongodb.net/ad_database?retryWrites=true&w=majority")

mongoose.connect(process.env.MONGO_URI)

  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));

// Define Schema
const adSchema = new mongoose.Schema({
  class_name: String,
  widget_name: String,
  height: Number,
  width: String,
  ad_unit: String,
  ad_type: String,
});

const Ad = mongoose.model("Ad", adSchema);

// Store ads
app.post("/ads", async (req, res) => {
  try {
    if (!req.body.ads || !Array.isArray(req.body.ads)) {
      return res.status(400).json({ message: "Invalid request format" });
    }
    
    const ads = await Ad.insertMany(req.body.ads);
    res.status(201).json({ message: "Ads saved successfully", ads });
  } catch (error) {
    res.status(500).json({ message: "Error saving ads", error: error.message });
  }
});

// Fetch all ads
app.get("/ads", async (req, res) => {
  try {
    const ads = await Ad.find();
    res.json({ads});
  } catch (error) {
    res.status(500).json({ message: "Error fetching ads", error: error.message });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
