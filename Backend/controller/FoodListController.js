const cloudinary = require("cloudinary").v2;
const FoodList = require("../models/foodList");

exports.addProduct = async (req, res, next) => {
  try {
    if (!req.files) {
      return next(Error("images are required", 401));
    }
    const photo = req.files.image;
    const { name, description, price, category } = req.body;
    const result = await cloudinary.uploader.upload(photo.tempFilePath, {
      folder: "FoodAppProducts",
    });
    const prod = {
      name,
      description,
      price,
      image: {
        id: result.public_id,
        secure_url: result.secure_url,
      },
      category,
    };
    const data = await FoodList.create(prod);
    res.status(200).send({
      sucess: true,
      prod,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.adminDeleteOneProduct = async (req, res, next) => {
  try {
    let product = await FoodList.findById(req.params.id);

    if (!product) {
      return next(Error("Product not found"));
    }
    await cloudinary.uploader.destroy(product.image.id);
    await FoodList.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product deleted !",
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.getAllProduct = async (req, res, next) => {
    try {
        const product = await FoodList.find({});
        res.send({
            success: true,
            data:product
        })
    } catch (error) {
        res.send(error);
        console.log(error);
    }
}
