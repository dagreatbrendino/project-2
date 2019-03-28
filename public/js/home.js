$(document).ready(function(){
    // $("#addBillButton").on("click", function(event){
    //     event.preventDefault();
    //     console.log("adding bill")
    //     var bill = {
    //         billName: $("#bill-name").val().trim(),
    //         amount: $("#bill-amount").val().trim()
    //     };

    //     $.post("/bill/add",{
    //         billName: bill.billName,
    //         amount: bill.amount
    //     }).then(function(){
    //         window.location.reload();
    //     });
    // });
    $("#addGroceryButton").on("click", function(event){
        event.preventDefault();
        console.log("adding grocery")
        var grocery = {
            groceryName: $("#grocery-name").val().trim(),
            quantity: $("#grocery-quantity").val().trim()
        };
        console.log(grocery);
        $.post("/grocery/add",{
            groceryName: grocery.groceryName,
            quantity: grocery.quantity
        }).then(function(){
            window.location.reload();
        });
    });
    $("#addChoreButton").on("click", function(event){
        event.preventDefault();
        console.log("adding chores")
        var chore = {
            choreName: $("#chore-name").val().trim(),
        };

        $.post("/chore/add",{
            chore: chore.choreName
        }).then(function(){
            window.location.reload();
        });
    });

});