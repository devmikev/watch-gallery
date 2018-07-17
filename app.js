var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Gallery = require('./models/gallery');
var Watch = require('./models/watch');
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
      res.render('galleries/index', {galleries: allGalleries});
    }
  });
});

// NEW - show form to create a new gallery
app.get("/galleries/new", (req, res) => {
  res.render("galleries/new");
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

// SHOW - shows more info about one gallery
app.get('/galleries/:id', (req, res) => {
  // find the gallery with provided ID
  Gallery.findById(req.params.id).populate("watches").exec((err, foundGallery) => {
    if(err) {
      console.log(err);
    } else {
      // console.log(foundGallery);
      // render show template with that gallery
      res.render('galleries/show', {gallery: foundGallery});
    }
  });
});

//  =================
//  WATCH ROUTES
//  =================

app.get('/galleries/:id/watches/new', (req, res) => {
  // find gallery by id
  Gallery.findById(req.params.id, (err, gallery) => {
    if(err) {
      console.log(err);
    } else {
      res.render('watches/new', {gallery});
    }
  });
});

app.post('/galleries/:id/watches', (req, res) => {
  // lookup gallery using ID
  Gallery.findById(req.params.id, (err, gallery) => {
    if(err) {
      console.log(err);
      res.redirect('/galleries');
    } else {
      // console.log(req.body.watch);
      // create new watch
      Watch.create(req.body.watch, (err, watch) => {
        if(err) {
          console.log(err);
        } else {
          // connect new watch to gallery
          gallery.watches.push(watch);
          gallery.save();
          // redirect gallery show page
          res.redirect('/galleries/' + gallery._id);
        }
      });
    }
  });
});

// SHOW
app.get('/galleries/:id/watches/:id', (req, res) => {
  // find the gallery with provided ID
  Watch.findById(req.params.id).populate("watches").exec((err, foundWatch) => {
    if(err) {
      console.log(err);
    } else {
      // console.log(foundWatch);
      // render show template with that gallery
      res.render('watches/show', {watch: foundWatch});
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});