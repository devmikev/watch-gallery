var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Gallery = require('./models/gallery');
var methodOverride = require('method-override');
var Watch = require('./models/watch');
var seedDB = require('./seeds');

var watchRoutes = require('./routes/watches');
var galleryRoutes = require('./routes/galleries');
var indexRoutes = require('./routes/index');

// seedDB();


// mongoose.connect('mongodb://localhost/watch_gallery');
// mongoose.connect('mongodb://mishka:mlabspetka1@ds121624.mlab.com:21624/watchgallery');
mongoose.connect('mongodb://mike:voloshin2@ds121624.mlab.com:21624/watchgallery');
// mongodb://<mishka>:<mlabspetka1>@ds121624.mlab.com:21624/watchgallery
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride('_method'));

app.use(indexRoutes);
app.use(galleryRoutes);
app.use(watchRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Watch Gallery Server has started!");
});

// test