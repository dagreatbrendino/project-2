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

        $.post("/login", {
            email: user.email,
            password: user.password
        })
    })
})