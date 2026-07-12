const validator = require("validator");
const bcrypt = require("bcrypt");

const validateUserData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name info is not sufficient...");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email id is not valid, please enter a valid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

const validateProfileEdit = (req) => {
  const allowedUpdates = ["firstName", "lastName", "age", "photoUrl", "about", "gender"];

  const isUpdateAllowed = Object.keys(req.body).every((key) =>
    allowedUpdates.includes(key),
  );

  return isUpdateAllowed;
};

const validateProfilePasswordFields = (req) => {
  const allowedFields = ["oldPassword", "newPassword"];

  const isAllowedFields = Object.keys(req.body).every((key) =>
    allowedFields.includes(key),
  );

  return isAllowedFields;
};

const verifyProfilePassword = async (req) => {
  const isPasswordVerified = await bcrypt.compare(
    req.body.oldPassword,
    req.user.password,
  );

  return isPasswordVerified;
};

module.exports = { validateUserData, validateProfileEdit, validateProfilePasswordFields, verifyProfilePassword };
