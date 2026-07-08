const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const {
  validateProfileEdit,
  validateProfilePasswordFields,
  verifyProfilePassword,
} = require("../utils/validate");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(404).send("Error : " + err);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEdit(req)) {
      throw new Error("some fields are not allowed to be edit..");
    }

    const loggedInUser = req.user;
    // console.log(loggedInUser);

    Object.keys(req.body).forEach(
      (field) => (loggedInUser[field] = req.body[field]),
    );

    await loggedInUser.save();
    res.send({
      message: `user ${loggedInUser.firstName} updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send(" " + err);
  }
});

profileRouter.patch("/profile/password/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfilePasswordFields(req)) {
      throw new Error("Please enter only old password and new password...");
    }
    if (!(await verifyProfilePassword(req))) {
      throw new Error("Your old password is wrong..");
    }

    const loggedInUser = req.user;
    // console.log(loggedInUser.password);
    const passwordHash = await bcrypt.hash(req.body.newPassword, 10);
    loggedInUser.password = passwordHash;
    // console.log(loggedInUser.password);
    await loggedInUser.save();
    res.send("Password changed successfully !");
  } catch (err) {
    res.status(400).send(" " + err);
  }
});

module.exports = profileRouter;
