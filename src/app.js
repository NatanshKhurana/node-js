const express = require("express");

const app = express();

const connectDB = require("../src/config/database");
const User = require("./models/user");
const { validateUserData } = require("./utils/validate");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    // validate user data
    validateUserData(req);

    // encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (isCorrectPassword) {

      // create a jwt token



      // add jwt token to cookie and send response back to the user...

      res.cookie("token", "gghfcbcbhjcfbhjfvbhjfvbhjfvjvjgvjvjnfnrjenjierijrv");



      res.send("Login Successfull !!!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("error : " + err);
  }
});

app.get("/profile", (req, res) => {
  const cookie = req.cookies;
  console.log(cookie);
  res.send("Cookie sent");
});

// getting users by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;

  try {
    const user = await User.find({ email: userEmail });
    if (user.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// feed api
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// delete user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

// updating user info in the database
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  const allowedUpdates = [
    "firstName",
    "lastName",
    "age",
    "password",
    "photoUrl",
    "skills",
  ];
  try {
    const isAllowedUpdates = Object.keys(data).every((k) => {
      return allowedUpdates.includes(k);
    });
    console.log(isAllowedUpdates);

    if (!isAllowedUpdates) {
      throw new Error("Some fields can't be allowed to update");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills can't be more than 10");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send("something went wrong : " + err);
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
