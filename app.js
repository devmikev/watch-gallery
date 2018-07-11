var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/watch_gallery');
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var gallerySchema = new mongoose.Schema({
  name: String,
  image: String
});

var Gallery = mongoose.model("Gallery", gallerySchema);

// Gallery.create(
//   {
//     name: 'Vlad\'s watches',
//     image: 'https://images.unsplash.com/photo-1526045431048-f857369baa09?ixlib=rb-0.3.5&s=f26461245bdc7f69ba2f6ea2ba94be54&auto=format&fit=crop&w=1050&q=80'
//   }, (err, gallery) => {
//     if(err) {
//       console.log(err);
//     } else {
//       console.log('Newly created gallery: ');
//       console.log(gallery);
//     }
//   });



app.get('/', (req, res) => {
  res.render("landing");
});

app.get('/galleries', (req, res) => {
  Gallery.find({}, (err, allGalleries) => {
    if(err) {
      console.log(err);
    } else {
      res.render('galleries', {galleries: allGalleries});
    }
  })
});

app.post('/galleries', (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var newGallery = {name, image};
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

app.get("/galleries/new", (req, res) => {
  res.render("new-gallery.ejs");
})



app.listen(3000, () => {
  console.log('Server running on port 3000');
});