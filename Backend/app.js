const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
//app config
const app = express();
app.use(express.json()); // app.use to mount the routes
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: [
    "http://localhost:5174",
    "http://localhost:5173",
    "https://food-order12.vercel.app",
    "https://food-order-admin-two.vercel.app",
    "https://food-order12-git-main-sachin-bhagats-projects.vercel.app",
    "https://food-order12-sachin-bhagats-projects.vercel.app",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

//middleware

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'none'"],
      fontSrc: ["'self'", "data:"],
    },
  })
);

app.use(cors(corsOptions));
app.use(morgan("tiny"));

app.use(cookieParser()); // to access token from cookies
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join("/tmp"),
  })
);

//import all the routes here
const FoodList = require("./Routes/FoodList");
const userRouter = require("./Routes/userRoute");
const CartRouter = require("./Routes/CartRoute");
const OrderRouter = require("./Routes/OrderRoute");
//router for middleware
app.use("/api/v1", FoodList);
app.use("/api/v1", userRouter);
app.use("/api/v1", CartRouter);
app.use("/api/v1", OrderRouter);
//routes
app.get("/", (req, res) => {
  res.send("API is working");
});

module.exports = app;
