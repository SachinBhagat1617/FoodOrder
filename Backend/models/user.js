const mongoose = require("mongoose");
const validator = require("validator");
const jwt=require("jsonwebtoken")
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a name"],
      maxLength: [40, "Name should be under 40 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      validate: [validator.isEmail, "Please Provide a Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please provide a password"],
      minLength: [6, "password should be atleast 6 char"],
      select: false,
    },
    cartData: [],
    createdAt: {
      type: String,
      default: Date.now,
    },
  },
  { minimize: false } // minimize false at end because It prevents Mongoose from removing empty objects (cartData) from your documents before saving them to the database.
);

userSchema.methods.getJwtToken = function () {
  return jwt.sign(
    { id: this._id }, //payload _id comes from db
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY }
  );
};

module.exports = mongoose.model("User", userSchema);
