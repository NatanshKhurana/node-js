const express = require("express");

const app = express();



app.use("/hello",(req, res) => {
    res.send("Hello jiiiiii  !!");
});


app.use("/test", (req, res) => {
    res.send("This is test route");
});

app.use("/", (req, res) => {
    res.send("Namaste Natansh");
});



app.listen(7777, () => {
    console.log("App is successfully listening at port 7777");
})