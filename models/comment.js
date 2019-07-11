// Mongoose
var mongoose = require('mongoose');

//Schema Created
var Schema = mongoose.Schema;

// Comment Schema
var CommentSchema = new Schema({

  // Author Name
  author: {
    type: String
  },

  // Comment
  content: {
    type: String
  }

});


var Comment = mongoose.model('Comment', CommentSchema);


module.exports = Comment;