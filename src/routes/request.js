const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        throw new Error("This status is not allowed..");
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).send("user not found");
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      console.log(existingConnectionRequest);
      
      if (existingConnectionRequest) {
        throw new Error("Connection request already exists");
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.send({
        message: `${req.user.firstName} sent a connection request`,
        data,
      });
    } catch (err) {
      res.status(400).send("Error : " + err.message);
    }
  },
);

requestRouter.patch(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      const loggedInUserId = loggedInUser._id;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Please enter a valid status..");
      }
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        status: "interested",
        toUserId: loggedInUserId,
      });
    //   console.log(connectionRequest);
      
      if (!connectionRequest) {
        throw new Error("Connection request not found !");
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.send({ message: `request ${status}`, data });
    } catch (err) {
      res.status(400).send("Error : " + err.message);
    }
  },
);

module.exports = requestRouter;
