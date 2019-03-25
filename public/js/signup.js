$(document).ready(function(){
    
    $("#sign-up").on("submit", function(event){
        event.preventDefault();
        var newUser = {
            email: $("#email").val().trim(),
            password: $("#password").val().trim(),
            name: $("#name").val().trim()
        };
        //if the the email or password are null terminate this function
        if( !newUser.email || !newUser.password || !newUser.name) {
            return;
        }
        //if there is a valid email and password, sign up the user 
        console.log(newUser.email);
        $.post("/new-user/signup", {
            email: newUser.email,
            password: newUser.password,
            name: newUser.name
        })
        .then(function(data){
            console.log("changing location")
            window.location.assign("/home");
        }).catch(handleLoginErr)
    });

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});