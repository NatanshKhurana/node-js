const express = require("express");

const app = express();

const connectDB = require("../src/config/database");
const User = require("./models/user");
app.use(express.json());

app.post("/signup", async (req, res) => {
  
  // Creating an instance of the User model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    res.status(500).send("Error posting : " + err);
  }
});


// getting users by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;

  try{
    const user = await User.find({email : userEmail});
    if(user.length === 0){
      res.status(404).send("user not found");
    }else{
      res.send(user);
    }
  }catch(err){
    res.status(400).send("Something went wrong");
  }
})

// feed api
app.get("/feed", async (req, res) => {

  try{
    const users = await User.find({});
    res.send(users);
  }catch(err){
    res.status(400).send("Something went wrong");
  }
})

// delete user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try{
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  }catch(err){
    res.status(400).send("something went wrong");
  }
})

// updating user info in the database
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try{
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument : "after",
      runValidators : true,
    });
    console.log(user);
    res.send("user updated successfully");
  }catch(err){
    res.status(400).send("something went wrong : " + err);
  }
})

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
