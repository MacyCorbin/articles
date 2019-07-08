// Node Dependencies
var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request'); 
var cheerio = require('cheerio'); 

// Import models
var comments = require('../models/Comment.js');
var articles = require('../models/Article.js');

// Index Page Render (first visit to the site)
router.get('/', function (req, res){

  // Scrape data
  res.redirect('/scrape');

});


// Articles Page Render
router.get('/articles', function (req, res){

  // Query MongoDB for all article entries (sort newest to top, assuming Ids increment)
  Article.find().sort({_id: -1})

    // But also populate all of the comments associated with the articles.
    .populate('comments')

    // Then, send them to the handlebars template to be rendered
    .exec(function(err, doc){
      // log any errors
      if (err){
        console.log(err);
      } 
      // or send the doc to the browser as a json object
      else {
        var hbsObject = {articles: doc}
        res.render('index', hbsObject);
        // res.json(hbsObject)
      }
    });

});

// Articles Page Render
router.get('/articles', function (req, res){

    // Query MongoDB for all article entries (sort newest to top, assuming Ids increment)
    Article.find().sort({_id: -1})
  
      // But also populate all of the comments associated with the articles.
      .populate('comments')
  
      // Then, send them to the handlebars template to be rendered
      .exec(function(err, doc){
        // log any errors
        if (err){
          console.log(err);
        } 
        // or send the doc to the browser as a json object
        else {
          var hbsObject = {articles: doc}
          res.render('index', hbsObject);
          // res.json(hbsObject)
        }
      });
  
  });