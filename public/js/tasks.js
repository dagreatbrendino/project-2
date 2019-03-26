// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".deltask").on("click", function(event) {
      var id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/api/tasks/" + id, {
        type: "DELETE"
      }).then(
        function() {
          console.log("deleted id ", id);
          // Reload the page to get the updated task list
          location.reload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newtask = {
        author: $("#auth").val().trim(),
        task: $("#task").val().trim()
      };
  
      // Send the POST request.
      $.ajax("/api/tasks", {
        type: "POST",
        data: newtask
      }).then(
        function() {
          console.log("created new task");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".update-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var updatedtask = {
        author: $("#auth").val().trim(),
        task: $("#task").val().trim()
      };
  
      var id = $(this).data("id");
  
      // Send the POST request.
      $.ajax("/api/tasks/" + id, {
        type: "PUT",
        data: updatedtask
      }).then(
        function() {
          console.log("updated task");
          // Reload the page to get the updated list
          location.assign("/");
        }
      );
    });
  });
  