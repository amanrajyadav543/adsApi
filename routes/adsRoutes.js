const express = require("express");

const router = express.Router();
const {
    adsController,
    adsShowController
   
  } = require("../controllers/adsController");
  

router.post("/create", adsController);
router.get('/show',adsShowController);



module.exports = router;