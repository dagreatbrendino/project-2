$(document).ready(function(){
    $("#editBillButton").on("click", function(event){
        event.preventDefault();
        var bill = {
            billName: $("#bill-name").val().trim(),
            amount: $("#bill-amount").val().trim()
        };
        var creatorId = $("#editBillForm").data("creatorid");
        var billId = $("#editBillForm").data("billid");
        $.ajax({
            method: "PUT",
            url: "/bill/edit/" + creatorId + "/" + billId,
            data: {
                billName: bill.billName,
                amount: bill.amount
            }
        }).then(function(data){
            window.location.replace("/home")
        })

    });
    $("#removeBill").on("click", function(event){
        event.preventDefault();
        var billId = $("#editBillForm").data("billid");
        $.ajax({
            method: "DELETE",
            url: "/bill/delete/" + billId
        }).then(function (data) { 
            window.location.replace("/home");
        })
    })
})
