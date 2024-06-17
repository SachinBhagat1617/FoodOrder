const express = require("express");
const cookieParser=require("cookie-parser")
const cors = require("cors");
const fileUpload = require("express-fileupload");
//app config
const app = express();

//middleware
app.use(express.json()); // app.use to mount the routes
app.use(cors());
app.use(cookieParser()); // to access token from cookies
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

//import all the routes here
const FoodList = require("./Routes/FoodList");
const userRouter = require("./Routes/userRoute");
const CartRouter = require("./Routes/CartRoute");
//router for middleware
app.use("/api/v1/", FoodList);
app.use("/api/v1/", userRouter);
app.use("/api/v1", CartRouter);
//routes
app.get("/", (req, res) => {
  res.send("API is working");
});

module.exports = app;
