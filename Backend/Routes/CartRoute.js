const express = require("express");
const { addToCart, removeFromCart, getCart } = require("../controller/CartController");
const { authMiddleware } = require("../middleware/auth");
const router = express.Router();

router.route("/add").post(authMiddleware, addToCart);
router.route("/remove").post(authMiddleware,removeFromCart);
router.route("/get").post(authMiddleware,getCart);

module.exports = router;
