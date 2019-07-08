
// function to submit form to add and delete comments
$(document).ready(function(){

    // Nav Bar Mobile Slider
    $(".button-collapse").sideNav();
  

    // Click Listener for submission
    $('.add-comment-button').on('click', function(){
  
      // Get _id of comment 
      var articleId = $(this).data("id");
  
      // URL root
      var baseURL = window.location.origin;
  
      // Get data by Id
      var frmName = "form-add-" + articleId;
      var frm = $('#' + frmName);
  
  
      // AJAX call
      $.ajax({
        url: baseURL + '/add/comment/' + articleId,
        type: 'POST',
        data: frm.serialize(),
      })
      .done(function() {
        // Refreshes window
        location.reload();
      });
      
      // Prevent Default
      return false;
  
    });
  
  
    // Delete comment with a click listener
    $('.delete-comment-button').on('click', function(){
  
      // Get the id of comment
      var commentId = $(this).data("id");
  
      var baseURL = window.location.origin;
  
      // AJAX call to delete comment
      $.ajax({
        url: baseURL + '/remove/comment/' + commentId,
        type: 'POST',
      })
      .done(function() {
        // Refreshes window
        location.reload();
      });
      
      // Prevent Default
      return false;
  
    });
    
});