var express = require('express');
var router = express.Router();
var Gallery = require('../models/gallery');
var Watch = require('../models/watch');

router.get('/galleries/:id/watches/new', (req, res) => {
  // find gallery by id
  Gallery.findById(req.params.id, (err, gallery) => {
    if(err) {
      console.log(err);
    } else {
      res.render('watches/new', {gallery});
    }
  });
});

router.post('/galleries/:id/watches', (req, res) => {
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
router.get('/galleries/:id/watches/:watch_id', (req, res) => {
  // find the gallery with provided ID
    // console.log(req);
  Watch.findById(req.params.watch_id).populate("watches").exec((err, foundWatch) => {
    if(err) {
      console.log(err);
    } else {
        // console.log(foundWatch)
      // render show template with that gallery
      var gallery = req.params.id;
      var watch = req.params.watch_id;
      // console.log(req.params.watch_id)
      res.render('watches/show', {watch: foundWatch, galleryID: gallery, watchID: watch});
    }
  });
});

// EDIT
router.get("/galleries/:id/watches/:watch_id/edit", function (req, res) {
  var gallery = req.params.id;
  var watch = req.params.watch_id;
  Watch.findById(req.params.watch_id, (err, foundWatch) => {
    if(err) {
      res.redirect('/galleries/:id/watches/:watch_id')
    } else {
      res.render('watches/edit', {watch: foundWatch, galleryID: gallery, watchID: watch});
    }
  })
})

module.exports = router;