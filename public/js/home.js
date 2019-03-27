$(document).ready(function(){
    $("#addBillButton").on("click", function(event){
        event.preventDefault();
        console.log("adding bill")
        var bill = {
            listItem: $("#bill-name").val().trim(),
            totalAmount: $("#bill-amount").val().trim()
        };

        $.post("/bill/add",{
            listItem: bill.listItem,
            totalAmount: bill.totalAmount
        }).then(function(){
            window.location.reload();
        });
    });
});