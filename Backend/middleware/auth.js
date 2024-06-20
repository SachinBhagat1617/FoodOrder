const jwt = require("jsonwebtoken");
const User = require("../models/user");
exports.authMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.token || req.cookies.token;
    if (!token && req.header("Authorization")) {
      token = req.header("Authorization").replace("Bearer ", "");
    }
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorised to visit the page",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify the token and decode it now this decoded contains all the payload like id,option
    //console.log(decoded);
    req.user = await User.findById(decoded.id);
    console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in auth Middleware" });
  }
};
