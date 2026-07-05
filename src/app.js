const express = require("express");

const app = express();

const connectDB = require("../src/config/database");
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  // Creating an instance of the User model
  const user = new User({
    firstName: "Dushyant",
    lastName: "Sharma",
    age: 22,
    email: "dushyant@sharma.com",
    password: "hii@123",
  });

  try {
    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    res.status(500).send("Something went wrong while posting data to database");
  }
});

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
