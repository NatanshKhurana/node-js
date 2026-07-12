const express = require("express");
const authRouter = express.Router();
const { validateUserData } = require("../utils/validate");
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    // validate user data
    validateUserData(req);

    // encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    // Creating an instance of the User model
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    allowedData = [
      "firstName",
      "lastName",
      "age",
      "email",
      "gender",
      "password",
      "photoUrl",
      "skills",
    ];

    const isAllowedData = Object.keys(req.body).every((k) => {
      return allowedData.includes(k);
    });
    if (!isAllowedData) {
      throw new Error("extra fields are not allowed...");
    }
    if (user?.skills.length > 10) {
      throw new Error("skills can't be more than 10");
    }
    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    res.status(500).send("Error posting : " + err);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isCorrectPassword = await user.verifyPassword(password);
    console.log(isCorrectPassword);

    if (isCorrectPassword) {
      // create a jwt token
      const token = await user.jwtToken();
      //   console.log(token);

      // add jwt token to cookie and send response back to the user...
      res.cookie("token", token, {
        expires: new Date(Date.now() + 60 * 60 * 1000),
      });

      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .send("User logged out successfully");
});

module.exports = authRouter;
