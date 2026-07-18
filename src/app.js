require('dotenv').config()
const express = require("express");
const app = express();
const connectDB = require("../src/config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const cors = require("cors");

require("./utils/cronjob");

app.use(cors({
  origin : "http://localhost:5173",
  credentials : true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connection established !!");
    app.listen(process.env.PORT, () => {
      console.log("App is successfully listening at port 7777");
    });
  })
  .catch((err) => {
    console.log("Database can't be connected");
  });
