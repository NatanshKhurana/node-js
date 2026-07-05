const express = require("express");

const app = express();

const connectDB = require("../src/config/database");

connectDB()
  .then(() => {
    console.log("Database connection established !!");
    app.listen(7777, () => {
      console.log("App is successfully listening at port 7777");
    });
  })
  .catch((err) => {
    console.log("Database can't be connected");
  });
