const express = require("express");

const app = express();

require("../src/config/database");

app.listen(7777, () => {
  console.log("App is successfully listening at port 7777");
});
