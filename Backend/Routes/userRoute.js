const express = require("express");
const { signUp, logIn } = require("../controller/userController");

const router = express.Router();

router.route("/user/signUp").post(signUp);
router.route("/user/logIn").post(logIn)

module.exports = router;
