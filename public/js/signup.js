$(document).ready(function(){
    
    $("sign-up").on("submit", function(event){
        event.preventDefault();
        var newUser = {
            email: $("#email").val().trim(),
            password: $("#password").val().trim()
        };
        //if the the email or password are null terminate this function
        if( !newUser.email || !newUser.password) {
            return;
        }
        //if there is a valid email and password, sign up the user 
        console.log(newUser.email);
        $.post("/signup", {
            email: newUser.email,
            password: newUser.password
        }).then(function(data){
            window.location.replace(data);
        }).catch(handleLoginErr)
    });
});