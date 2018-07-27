var express = require('express');
var router = express.Router();
var Gallery = require('../models/gallery');

// INDEX - show all galleries
router.get('/galleries', (req, res) => {
  Gallery.find({}, (err, allGalleries) => {
    if(err) {
      console.log(err);
    } else {
      res.render('galleries/index', {galleries: allGalleries});
    }
  });
});

// NEW - show form to create a new gallery
router.get("/galleries/new", (req, res) => {
  res.render("galleries/new");
});


// CREATE - add new gallery to DB
router.post('/galleries', (req, res) => {
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
router.get('/galleries/:id', (req, res) => {
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

// EDIT gallery route
router.get('/galleries/:id/edit', (req, res) => {
  Gallery.findById(req.params.id, (err, foundGallery) => {
    if(err) {
      res.redirect('/galleries')
    } else {
      res.render('galleries/edit', {gallery: foundGallery});
    }
  })
});

// UPDATE Route

router.put('/galleries/:id', (req, res) => {
  // find and update the correct Gallery
  Gallery.findByIdAndUpdate(req.params.id, req.body.gallery, (err, updatedGallery) => {
    if(err) {
      res.redirect('/galleries');
    } else {
      res.redirect('/galleries/' + req.params.id);
    }
  });
  // redirect somewhere(show page)
})

module.exports = router;