$(document).ready(function(){
    $("#editChoreButton").on("click", function(event){
        console.log("updating chore")
        event.preventDefault();
        var chore = {
            chore: $("#chore").val().trim(),
        };
        var choreId = $("#editChoreForm").data("choreid");
        var creatorId = $("#editChoreForm").data("chorecreator");
        console.log(choreId);
        $.ajax({
            method: "PUT",
            url: "/chore/edit/"+ creatorId+ "/" + choreId,
            data: {
                chore: chore.chore,
            }
        }).then(function(data){
            window.location.replace("/home");
        })

    });
    $("#removeChore").on("click", function(event){
        event.preventDefault();
        var choreId = $("#editChoreForm").data("choreid");
        $.ajax({
            method: "DELETE",
            url: "/chore/delete/" + choreId
        }).then(function (data) { 
            window.location.replace("/home");
        })
    });
})
