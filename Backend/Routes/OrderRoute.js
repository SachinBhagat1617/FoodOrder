const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
} = require("../controller/orderController");

const Router = express.Router();

Router.route("/order/place").post(authMiddleware, placeOrder);
Router.route("/order/verify").post(verifyOrder);
Router.route("/order/userorders").post(authMiddleware, userOrders);
Router.route("/list").get(listOrders);
Router.route("/status").post(updateStatus);

module.exports = Router;
