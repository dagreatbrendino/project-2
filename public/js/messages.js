$(document).ready(function(){
    //if the user accepts a join request, we will hit the appropriate route to do so
    $(document).on("click", ".acceptJoinRequest", function(event){
        event.preventDefault();
        var messageId = $(this).data("messageid");

        $.ajax({
            method: "PUT",
            url: "request/join/accept",
            data: {id: messageId}
        }).then(function(dataReturned){
            $.ajax({
                method: "DELETE",
                url: "/message/delete/" + messageId
            }).then(function (data) { 
                window.location.reload();
            })

        })
    })
    //if the user ignores the join request, the route to delete the message will be hit
    $(document).on("click", ".ignoreJoinRequest", function(event){
        event.preventDefault();
        var messageId = $(this).data("messageid");
        $.ajax({
            method: "DELETE",
            url: "/message/delete/" + messageId
        }).then(function (data) { 
            window.location.reload();
        })
    })
})