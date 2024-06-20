const app = require("./app");
const connectwithDb = require("./config/db");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const cors = require("cors");

// connection with db
connectwithDb();

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
app.use(cors(corsOptions));

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT} `);
});
