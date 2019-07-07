// Node Dependencies
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio'); 

//Initialize Express and body parsing
var app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended:false
}))

// Static Page
app.use(express.static(process.cwd() + '/public'));

//Express Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Import models
var comment = require('./models/articles.js');
var article = require('./models/comments.js');

// Import Routes
var router = require('./controllers/controller.js');
app.use('/', router);

// Launch App
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Running on port: ' + port);
});

