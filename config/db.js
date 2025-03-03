const mongoose = require("mongoose");
const colors = require("colors");
require("dotenv").config();
//function mmongodb dfatabase connection
const connectDb = async () => {
  // try {
  //   await mongoose.connect(process.env.MONGO_URL);
  //   console.log(`Connected To Database ${mongoose.connection.host} `.bgWhite);
  // } catch (error) {
  //   console.log("DB Error", error);
  // }

  await   mongoose.connect(process.env.MONGO_URI)

  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
};
module.exports = connectDb;
