const express = require("express");

const app = express();

// => middleware for authenticating admin route
app.use("/admin", (req, res, next) => {
  console.log("inside /admin auth middleware...");
  const token = "xyz";
  const isAdminAuthorised = token === "xyz";

  if(!isAdminAuthorised){
    res.status(401).send("Admin is not authorised !!");
  }else{
    next();
  }
});

app.get("/user", (req, res, next)=>{
  console.log("This is the response from user route");
  res.send("Response from /user route !!");
})


app.get("/admin/getData", (req, res, next) => {
  res.send("Getting the data from admin !");
});

app.delete("/admin/deleteData", (req, res, next)=>{
  res.send("Deleting the data from the admin !");
});



app.listen(7777, () => {
  console.log("App is successfully listening at port 7777");
});
