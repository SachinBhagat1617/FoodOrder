const User = require("../models/user");

exports.addToCart = async (req, res, next) => {
  try {
    //console.log(req.user);
    let user = req.user;
    let cartData =await user.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await User.findByIdAndUpdate(req.user.id, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while Adding to Cart" });
  }
};

exports.removeFromCart = async (req, res, next) => {
    try {
        let user = req.user;
        let cartData =await user.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await User.findByIdAndUpdate(req.user.id, { cartData });
        res.json({ success: true, message: "Removed from Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error while removing from Cart" });
    }
};

exports.getCart = async (req, res, next) => {
    try {
        const cartData = req.user.cartData;
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error while fetching data from Cart" });
    }
};
