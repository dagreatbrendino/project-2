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
            $.ajax({
                method: "PUT",
                url: "/user",
                data: {GroupId: data.id}
            }).then(function(dataReturned){
                window.location.replace(dataReturned.url);
            }).catch(function(err) {
              });
          }).catch(function(err) {
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
            $("#groupResults").empty();
            for (i = 0; i < data.length; i++){
                $("#groupResults").append("<div>" + data[i].groupName + "<button class='groupJoinRequest btn btn-sm btn-primary btn-success mb-1 group-sign-btn' data-creatorId=" + data[i].creatorId +
                ">Request Join</button></div>");
            }
        })
    })

    $(document).on("click", ".groupJoinRequest", function(event){
        event.preventDefault()
        var groupCreatorId = $(this).data("creatorid");
        $.post("/messages", {
            subject: "New Group Join Request",
            type: "join_request",
            body: "some user is requsting to join the group",
            recepientId: groupCreatorId
        })
    })
});