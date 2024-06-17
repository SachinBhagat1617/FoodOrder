const express = require("express")
const { addProduct, adminDeleteOneProduct, getAllProduct } = require("../controller/FoodListController")
const router = express.Router()


router.route("/admin/addProduct").post(addProduct)
router.route("/admin/deleteProduct/:id").delete(adminDeleteOneProduct)
router.route("/admin/getAllProduct").get(getAllProduct);


module.exports = router;
