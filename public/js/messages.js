$(document).ready(function(){

    $(document).on("click", ".acceptRequest", function(event){
        event.preventDefault();
        var messageId = $(this).data("messageid");

        $.ajax({
            method: "PUT",
            url: "request/join/accept",
            data: {id: messageId}
        }).then(function(dataReturned){
            window.location.reload();
        })
    })
})