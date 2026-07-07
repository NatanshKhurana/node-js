const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");

requestRouter.post("/connectionRequest", userAuth, (req, res) => {
  try{
    const user = req.user;
    res.send(`${user.firstName} sent a connection request`);
  }catch(err){
    res.status(400).send("Something went wrong");
  }
});

module.exports = requestRouter;