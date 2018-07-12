var mongoose = require('mongoose');

var gallerySchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  watches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Watch"
    }
  ]
});

var Gallery = mongoose.model("Gallery", gallerySchema);

module.exports = Gallery;