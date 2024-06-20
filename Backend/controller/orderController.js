require("dotenv").config();
const OrderModel = require("../models/orderModel");
const User = require("../models/user");

const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place order for frontend
exports.placeOrder = async (req, res, next) => {
  const frontend_url =
    "https://food-order12-sachin-bhagats-projects.vercel.app/";
  try {
    // Create a new order
    const newOrder = new OrderModel({
      userId: req.user.id,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();

    // Clear user's cart
    await User.findByIdAndUpdate(req.user.id, { cartData: [] });

    // Create a single line item for the total amount
    const line_item = {
      price_data: {
        currency: "inr",
        product_data: {
          name: "Total Order Amount",
        },
        unit_amount: req.body.amount, // Convert total amount to paise
      },
      quantity: 1,
    };

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: [line_item],
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    // Respond with the session URL
    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error placing order",
    });
  }
};


exports.verifyOrder = async (req, res, next) => {
  try {
    const { success, orderId } = req.body;
    console.log("hi" + req.body);
    if (success === "true") {
      await OrderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({
        success: true,
        message: "Payment Successful",
      });
    } else {
      await OrderModel.findByIdAndDelete(orderId);
      res.json({
        success: false,
        message: "Payment Unsuccessful",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

//user orders for frontend
exports.userOrders = async (req, res) => {
  try {
    //console.log(req.user.id);
    const orders = await OrderModel.find({ userId: req.user.id });
    console.log(orders);
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//listing orders for admin panel
exports.listOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//api updating order status

exports.updateStatus= async(req,res) => {
    try{
        await OrderModel.findByIdAndUpdate(req.body.orderId, {
          status: req.body.status,
        });
        res.json({
            success:true,
            message:"Status Updated"
        })
    }
    catch(error){
        console.log(error)
        res.json({
            success:false,
            message:"Error"
        })
    }
}