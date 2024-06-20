const User = require("../models/user");

exports.addToCart = async (req, res, next) => {
  try {
    let user = req.user;
    let cartData = await user.cartData;

    // Check if item already exists in cart
    let existingItem = cartData.find((item) => item.id === req.body.id);

    if (!existingItem) {
      // If item does not exist in cart, add it
      const newItem = {
        id: req.body.id,
        quantity: 1,
        name: req.body.name,
        price: req.body.price,
      };
      cartData.push(newItem);
    } else {
      // If item exists, increment quantity and update price
      existingItem.quantity++;
      existingItem.price = req.body.price * existingItem.quantity;
    }

    // Update user's cartData in the database
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
    let cartData = await user.cartData;

    // Find the item in cartData
    let existingItem = cartData.find((item) => item.id === req.body.id);

    if (existingItem) {
      if (existingItem.quantity === 1) {
        // If quantity is 1, remove the item from cart
        cartData = cartData.filter((item) => item.id !== req.body.id);
      } else {
        // Decrease quantity and update price
        existingItem.quantity--;
        existingItem.price = req.body.price * existingItem.quantity;
      }

      // Update user's cartData in the database
     await User.findByIdAndUpdate(req.user.id, { cartData }); // Save the updated user object to the database

      res.json({ success: true, message: "Removed from Cart" });
    } else {
      res.json({ success: false, message: "Item not found in Cart" });
    }
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
    res.json({
      success: false,
      message: "Error while fetching data from Cart",
    });
  }
};
