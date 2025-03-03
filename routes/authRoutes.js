const express = require("express");

const router = express.Router();

const {
  registerController,
  loginController

} = require("../controllers/authController");



//REGISTER || POST
router.post("/register", registerController);
router.post("/login", loginController);

// LOGIN || POST
// router.post("/login", loginController);

module.exports = router;
