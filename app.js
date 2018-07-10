var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render("landing");
});

app.get('/galleries', (req, res) => {
  var galleries = [
    {name: 'Mike\'s watches', image: 'https://images.unsplash.com/photo-1494858723852-d3cc2477e12c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a66c81d6441ca061f1e4647df4f41e40&auto=format&fit=crop&w=1056&q=80'},
    {name: 'Vlad\'s watches', image: 'https://images.unsplash.com/photo-1526045431048-f857369baa09?ixlib=rb-0.3.5&s=f26461245bdc7f69ba2f6ea2ba94be54&auto=format&fit=crop&w=1050&q=80'},
    {name: 'Ilya\'s watches', image: 'https://images.unsplash.com/photo-1455651512878-0ddbb4c4d0a5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=32a7e4edd69408cfe6fce705c5c98592&auto=format&fit=crop&w=675&q=80'}
  ]

  res.render('galleries', {galleries});
});

app.post('/galleries', (req, res) => {
  res.send('This is the post route!');
});

app.get("/galleries/new", (req, res) => {
  res.render("new-gallery.ejs");
})



app.listen(3000, () => {
  console.log('Server running on port 3000');
});