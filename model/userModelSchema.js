// const mongoose = require("mongoose");

// //schema
// const userSchema = new mongoose.Schema(
//   {
//     userName: {
//       type: String,
//       required: [true, "user name is required"],
//     },
//     email: {
//       type: String,
//       required: [true, "email is required"],
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: [true, "password is required"],
//     },

//     phone: {
//       type: String,
//       required: [true, "phone number is require"],
//     },
//     usertype: {
//       type: String,
//       required: [true, "user type is required"],
//       default: "clinet",
//       enum: ["clinet", "admin", , ],
//     },
//     profile: {
//       type: String,
//       default:
//         "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
//     },
//     answer: {
//       type: String,
//       required: [true, "Asnwer is required"],
//     },
//   },
//   { timestamps: true }
// );

// //export
// module.exports = mongoose.model("User", userSchema);


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    usertype: {
      type: String,
      required: true,
      default: "clinet",
      enum: ["clinet", "admin"], // Fixed extra comma
    },
    profile: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
