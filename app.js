var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Gallery = require('./models/gallery');
var seedDB = require('./seeds');

seedDB();


mongoose.connect('mongodb://localhost/watch_gallery');
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.get('/', (req, res) => {
  res.render("landing");
});

// INDEX - show all galleries
app.get('/galleries', (req, res) => {
  Gallery.find({}, (err, allGalleries) => {
    if(err) {
      console.log(err);
    } else {
      res.render('index', {galleries: allGalleries});
    }
  })
});

// CREATE - add new gallery to DB
app.post('/galleries', (req, res) => {
  // get data from form and add to galleries array
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newGallery = {name, image, description};
  // galleries.push(newGallery);
  // Create a new gallery and save to database
  Gallery.create(newGallery, (err, newlyCreated) => {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/galleries');
    }
  });
});

// NEW - show form to create a new gallery
app.get("/galleries/new", (req, res) => {
  res.render("new-gallery.ejs");
});

// SHOW - shows more info about one gallery
app.get('/galleries/:id', (req, res) => {
  // find the gallery with provided ID
  Gallery.findById(req.params.id).populate("watches").exec((err, foundGallery) => {
    if(err) {
      console.log(err);
    } else {
      console.log(foundGallery);
      // render show template with that campground
      res.render('show-gallery', {gallery: foundGallery});
    }
  });

});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});