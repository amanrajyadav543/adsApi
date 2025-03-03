const userModel = require("../model/userModelSchema");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, usertype, profile, answer } = req.body;

    // Check for required fields
    if (!userName || !email || !password || !phone || !answer) {
      return res.status(400).json({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    // Check if email already exists
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already registered, please login",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      phone,
      usertype: usertype || "clinet", // Default to 'clinet' if not provided
      profile: profile || "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
      answer,
    });

    res.status(201).json({
      success: true,
      message: "Successfully Registered",
      user,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({
      success: false,
      message: "Error In Register API",
      error: error.message || error, // Show error message properly
    });
  }
};


const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if email and password are provided
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Please Provide All Fields",
        });
      }
  
      // Check if user exists
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User Not Found",
        });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid Credentials",
        });
      }
  
      // Generate token
      const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
  
      // Remove password from user object before sending response
      const { password: _, ...userWithoutPassword } = user.toObject();
  
      res.status(200).json({
        success: true,
        message: "Login Successfully",
        token,
        user: userWithoutPassword,
      });
  
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({
        success: false,
        message: "Error In Login API",
        error: error.message || error,
      });
    }
  };
  
module.exports = { registerController,loginController };
