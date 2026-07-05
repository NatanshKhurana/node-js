const adminAuth = (req, res, next) => {
  console.log("inside /admin auth middleware...");
  const token = "xyz1";
  const isAdminAuthorised = token === "xyz";

  if (!isAdminAuthorised) {
    res.status(401).send("Admin is not authorised !!");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("Inside /user auth middleware");
  const token = "xyz1";
  const isUserAuthorised = token === "xyz";

  if (!isUserAuthorised) {
    res.status(401).send("User is not authorised !!");
  } else {
    next();
  }
};

module.exports = {
    adminAuth,
    userAuth
}
