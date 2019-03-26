$(document).ready(function() {

    $("#createGroup").on("submit", function(event){
        event.preventDefault();

        var group = {
            groupName: $("#group-name").val().trim()
        }

        if (!group.groupName){
            return;
        }

        $.post("/groups/create", {
            groupName: group.groupName
        }).then(function(data) {
            console.log("firing user route", data);
            $.ajax({
                method: "PUT",
                url: "/user",
                data: {GroupId: data.id}
            }).then(function(dataReturned){
                console.log(dataReturned);
                window.location.replace(dataReturned.url);
            }).catch(function(err) {
                console.log(err);
              });
          }).catch(function(err) {
            console.log(err);
          });
    });
});