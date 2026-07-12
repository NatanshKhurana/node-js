const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const receivedRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName");
    if (!receivedRequests.length) {
      throw new Error("No requests for now !");
    }

    res.json({ message: `requests retrived successfully`, receivedRequests });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const userConnections = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", "firstName lastName")
      .populate("toUserId", "firstName lastName");

    if (!userConnections.length) {
      throw new Error("No Connections !!");
    }

    const data = userConnections.map((field) => {
      if (field.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return field.toUserId;
      }
      return field.fromUserId;
    });

    res.send(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page-1)*limit;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    })
      .select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach(connection => {
        hideUsersFromFeed.add(connection.fromUserId.toString());
        hideUsersFromFeed.add(connection.toUserId.toString());
    });
    // console.log(hideUsersFromFeed);

    const userFeed = await User.find({
        $and : [
            {_id : {$nin : Array.from(hideUsersFromFeed)}},
            {_id : {$ne : loggedInUser._id}}
        ]
    }).skip(skip).limit(limit);
    
    res.send(userFeed);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = userRouter;
