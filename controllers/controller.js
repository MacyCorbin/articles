// Node Dependencies
var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');

// Import models
var comments = require('../models/comment.js');
var articles = require('../models/article.js');

// Page Render 
router.get('/', function (req, res) {

    // Scrape articles
    res.redirect('/scrape');

});


// Articles Page Render
router.get('/articles', function (req, res) {


    Article.find().sort({ _id: -1 })

        // Populate all of the comments with the articles.
        .populate('comments')

        // Send to handleabars
        .exec(function (err, doc) {
            // log errors
            if (err) {
                console.log(err);
            }
            // or send the doc to the browser as a json object
            else {
                var hbsObject = { articles: doc }
                res.render('index', hbsObject);
                // res.json(hbsObject)
            }
        });

});

// Web Scrape Route
router.get('/scrape', function (req, res) {


    request('https://www.livescience.com/environment', function (error, response, html) {

        // Load html into cheerio
        var $ = cheerio.load(html);

        // Error handler 
        var titlesArray = [];


        $('li').each(function (i, element) {

            // Create an empty result object
            var result = {};

            // Find title
            result.title = $(element).find("h2").text().trim();

            // Find link to article
            result.link = 'https://www.livescience.com' + $(element).find("a").attr("href");

            // Find summary of article
            result.summary = $(element).find("p").text().trim();

            // Error handling to ensure there are no empty scrapes
            if (result.title !== "" && result.summary !== "") {

                // Checks for duplicate articles
                if (titlesArray.indexOf(result.title) == -1) {
                    titlesArray.push(result.title);

                    Article.count({ title: result.title }, function (err, test) {

                        if (test == 0) {

                            var entry = new Article(result);
                            entry.save(function (err, doc) {
                                // log any errors
                                if (err) {
                                    console.log(err);
                                }

                                else {
                                    console.log(doc);
                                }
                            });

                        }
                        // Log that scrape is working
                        else {
                            console.log('Repeating database data and was not saved to database.')
                        }

                    });
                }
                // Log that scrape is working and data is also missing
                else {
                    console.log('Repeated data was repeated and was not saved to database.')
                }

            }
            // Log that scrape is working and content missing sections
            else {
                console.log('Empty Content and was not saved to database.')
            }

        });

        // Redirect to the Articles Page
        res.redirect("/articles");

    });

});


// Add a Comment Route
router.post('/add/comment/:id', function (req, res) {

    // Collect article id
    var articleId = req.params.id;

    // Collect Author Name
    var commentAuthor = req.body.name;

    // Collect Comments
    var commentContent = req.body.comment;


    var result = {
        author: commentAuthor,
        content: commentContent
    };

    // Using the Comment model, create a new comment entry
    var entry = new comment(result);

    // Save to the database
    entry.save(function (err, doc) {
        // log errors

        if (err) {
            console.log(err);
        }

        else {
            // Push the new comment to comments section in article
            Article.findOneAndUpdate({ '_id': articleId }, { $push: { 'comments': doc._id } }, { new: true })

                .exec(function (err, doc) {

                    if (err) {
                        console.log(err);
                    } else {

                        res.sendStatus(200);
                    }
                }
            );
        }
    });

});


// Delete a Comment
router.post('/remove/comment/:id', function (req, res) {

    // Get comment id
    var commentId = req.params.id;

    // Find and delete comment
    Comment.findByIdAndRemove(commentId, function (err, todo) {

        if (err) {
            console.log(err);
        }
        else {
            res.sendStatus(200);
        }

    });

});


// Export to Server.js
module.exports = router;