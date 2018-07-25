var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Gallery = require('./models/gallery');
var Watch = require('./models/watch');
var seedDB = require('./seeds');

var watchRoutes = require('./routes/watches');
var galleryRoutes = require('./routes/galleries');
var indexRoutes = require('./routes/index');

seedDB();


mongoose.connect('mongodb://localhost/watch_gallery');
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use(indexRoutes);
app.use(watchRoutes);
app.use(galleryRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});