var express = require('express');
var app = express();

app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render("landing");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});