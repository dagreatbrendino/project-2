$(document).ready(function() {

    $("#log-in").on("submit", function(event){
        event.preventDefault();

        var user = {
            email: $("#email").val().trim(),
            password: $("#password").val().trim()
        }

        if (!user.email || !user.password){
            return;
        }

        $.post("/user/login", {
            email: user.email,
            password: user.password
        }).then(function(data) {
            window.location.replace(data);
            // If there's an error, log the error
          }).catch(function(err) {
          });
    })
})