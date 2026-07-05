const express = require("express");

const app = express();

app.use("/route", (req, res, next) => {
  console.log("This is first route handler !!");
  res.send("Response 1");
  next();
}, (req, res, next) => {
  console.log("This is the Second route handler !!");
  // res.send("Response 2");
  next();
}, (req, res, next) => {
  console.log("This is the third route handler !!");
  res.send("Response 3");
})



app.listen(7777, () => {
  console.log("App is successfully listening at port 7777");
});
