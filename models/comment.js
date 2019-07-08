// Require Mongoose
var mongoose = require('mongoose');

// Create a Schema 
var Schema = mongoose.Schema;

// Create Comment Schema
var CommentSchema = new Schema({

  // Author's Name
  author: {
    type: String
  },
  // Comment 
  content: {
    type: String
  }
  
});


// Create the Comment model with Mongoose
var Comment = mongoose.model('comment', CommentSchema);

// Export the Model
module.exports = comment;