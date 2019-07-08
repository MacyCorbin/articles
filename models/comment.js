// Require Mongoose
var mongoose = require('mongoose');

// Create Schema Class in mongoose
var Schema = mongoose.Schema;

// Create Schema for comments
var CommentSchema = new Schema({

  // Name
  author: {
    type: String
  },
  // Comment
  content: {
    type: String
  }

});


// Create the Comment model with Mongoose
var Comment = mongoose.model('Comment', CommentSchema);

// Export Model
module.exports = Comment;