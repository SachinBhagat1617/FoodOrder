const User = require("../models/user");
const bcrypt = require("bcryptjs");
const cookieToken = require("../utils/cookieToken");

exports.signUp = async (req, res, next) => {
  try {
    let { name, password, email } = req.body;
    console.log(req.body);

    // Validate input
    if (!email || !name || !password) {
      return res.json({
        success: false,
        message: "Please enter name, email, and password",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // Check if user already exists
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Send a response to the client
    cookieToken(user, res);
  } catch (error) {
    console.error("Error during sign-up:", error); // Log the actual error
    res.json({
      success: false,
      message: "Error",
      error: error.message || error,
    });
  }
};

exports.logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(Error("Please Provide email and password"));
    }
    const user =await User.findOne({ email }).select("+password");
    if (!user) {
      return res.json({ success: false, message: "User Doesn't exist" });
    }
    const cmp = await bcrypt.compare(password, user.password);
    if (!cmp) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const token = cookieToken(user, res);
    //return res.json({ success: true, message: "Logged in successfully" });
  } catch (error) {
    res.json({
      success: false,
      message: "Error",
      error: error.message || error,
    });
  }
};
