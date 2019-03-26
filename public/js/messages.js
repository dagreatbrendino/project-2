$(document).ready(function(){

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