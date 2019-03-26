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
    $("#searchGroupButton").on("click", function(event){
        event.preventDefault();

        var group = {
            groupName: $("#group-name-search").val().trim()
        }

        if (!group.groupName){
            group.groupName = ""
        }

        $.get("/groups/" + group.groupName).then(function(data){
            console.log(data);
            for (i = 0; i < data.length; i++){
                $("#groupResults").append("<div>" + data[i].groupName + "<button class='groupJoinRequest' data-creatorId=" + data[i].creatorId +
                ">Request Join</button></div>");
            }
        })
    })

    $(document).on("click", ".groupJoinRequest", function(event){
        console.log($(this));
        event.preventDefault()
        console.log("submitting request for ", $(this).data("creatorid"));
    })
});